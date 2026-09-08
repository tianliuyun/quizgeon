#!/usr/bin/env python3
"""
Quizgeon 题库构建工具
读取 questions/ 目录下的 YAML 题库，验证格式，输出为 JS 文件。

用法:
    python3 scripts/build-questions.py [--watch]
    python3 scripts/build-questions.py --bank llm-interview
"""

import sys
import os
import json
import argparse
from pathlib import Path

# 允许 PyYAML 缺失时降级（用纯 Python 解析简化版 YAML）
try:
    import yaml
    HAS_YAML = True
except ImportError:
    HAS_YAML = False
    print("⚠️  PyYAML 未安装，使用内置简化 YAML 解析器（仅支持本项目格式）")
    print("   建议: pip install pyyaml")


# ---------- 简化版 YAML 解析器（仅支持本项目题库格式） ----------
def simple_yaml_load(text):
    """极简 YAML 解析：只支持 - 开头的列表 + 2 空格缩进 + 标量值。"""
    lines = text.split('\n')
    result = []
    current = None
    current_key = None
    current_list = None
    list_indent = -1

    i = 0
    while i < len(lines):
        line = lines[i]
        # 跳过空行和注释
        stripped = line.strip()
        if not stripped or stripped.startswith('#'):
            i += 1
            continue

        indent = len(line) - len(line.lstrip(' '))

        # 新条目（- 开头的顶级项）
        if indent == 0 and line.startswith('- '):
            if current is not None:
                result.append(current)
            current = {}
            # 解析第一个键值对
            content = line[2:].strip()
            if ':' in content:
                key, val = content.split(':', 1)
                current[key.strip()] = _parse_scalar(val.strip())
            i += 1
            continue

        # 字段行（2 或 4 空格缩进）
        if current is not None and indent >= 2:
            # 列表项（- 开头）
            if stripped.startswith('- '):
                if current_key and current.get(current_key) is None:
                    current[current_key] = []
                if isinstance(current.get(current_key), list):
                    current[current_key].append(stripped[2:].strip())
                i += 1
                continue

            # 键值对
            if ':' in stripped:
                key, val = stripped.split(':', 1)
                key = key.strip()
                val = val.strip()
                if val == '':
                    # 值可能在下一行（列表或多行字符串）
                    current_key = key
                    current[key] = None
                    # 检查下一行是不是多行字符串（| 或 >）
                    i += 1
                    if i < len(lines):
                        next_line = lines[i].strip()
                        if next_line in ('|', '>'):
                            # 多行字符串：读取后续缩进行
                            i += 1
                            multiline = []
                            while i < len(lines):
                                ml = lines[i]
                                ml_stripped = ml.strip()
                                if not ml_stripped:
                                    multiline.append('')
                                    i += 1
                                    continue
                                ml_indent = len(ml) - len(ml.lstrip(' '))
                                if ml_indent > indent:
                                    multiline.append(ml_stripped)
                                    i += 1
                                else:
                                    break
                            current[key] = '\n'.join(multiline).strip()
                            continue
                        # 否则就是 None（后续的列表项会填充）
                        continue
                else:
                    current[key] = _parse_scalar(val)
                i += 1
                continue

        i += 1

    if current is not None:
        result.append(current)

    return result


def _parse_scalar(val):
    """解析标量值：数字、布尔、字符串。"""
    if val.lower() in ('true', 'yes'):
        return True
    if val.lower() in ('false', 'no'):
        return False
    if val.lower() in ('null', '~', ''):
        return None
    # 尝试数字
    try:
        if '.' in val:
            return float(val)
        return int(val)
    except (ValueError, TypeError):
        pass
    # 去掉引号
    if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
        return val[1:-1]
    return val


# ---------- 题库元数据 ----------
BANK_META = {
    'llm-interview': {
        'name': '大模型面试',
        'emoji': '🧠',
        'description': '大模型工程师面试题库，覆盖 Transformer / 预训练 / SFT / RAG / Agent / 推理优化',
    },
    'frontend-basics': {
        'name': '前端基础',
        'emoji': '🎨',
        'description': '前端入门基础题，适合新手热身',
    },
}


# ---------- 验证 ----------
def validate_question(q, bank_id, filepath):
    """验证单道题，返回 (is_valid, errors)。"""
    errors = []
    # 所有题型通用必填字段
    base_required = ['id', 'difficulty', 'type', 'question', 'answer', 'explanation']
    # 选择题特有必填字段
    choice_required = ['options']

    for field in base_required:
        if field not in q or q[field] is None:
            errors.append(f"缺少必填字段: {field}")

    if 'difficulty' in q and q['difficulty'] not in ('easy', 'medium', 'hard'):
        errors.append(f"difficulty 非法: {q['difficulty']} (应为 easy/medium/hard)")

    if 'type' in q and q['type'] not in ('single', 'multiple', 'judge', 'open'):
        errors.append(f"type 非法: {q['type']} (应为 single/multiple/judge/open)")

    # 开放题不需要 options，提前返回
    if q.get('type') == 'open':
        return len(errors) == 0, errors

    # 选择题需要 options
    for field in choice_required:
        if field not in q or q[field] is None:
            errors.append(f"缺少必填字段: {field}")

    if 'options' in q and isinstance(q['options'], list):
        if len(q['options']) < 2:
            errors.append("options 少于 2 个")
        # 检查选项格式（A. / B. / C. / D.）
        for idx, opt in enumerate(q['options']):
            expected = chr(ord('A') + idx)
            if not str(opt).startswith(f"{expected}.") and not str(opt).startswith(f"{expected}、"):
                errors.append(f"选项 {expected} 格式不对，应以 '{expected}.' 开头: {opt[:30]}")

    if 'answer' in q and 'options' in q and isinstance(q['options'], list):
        valid_answers = [chr(ord('A') + i) for i in range(len(q['options']))]
        ans = q['answer']
        if q.get('type') == 'multiple':
            for c in ans:
                if c not in valid_answers:
                    errors.append(f"答案 '{ans}' 中的 '{c}' 不在有效选项范围内")
        else:
            if ans not in valid_answers:
                errors.append(f"答案 '{ans}' 不在有效选项范围内 (A-{chr(ord('A')+len(q['options'])-1)})")

    if 'tags' in q and q['tags'] is not None and not isinstance(q['tags'], list):
        errors.append("tags 应为列表")

    return len(errors) == 0, errors


# ---------- 构建 ----------
def build_questions(questions_dir, output_path, target_bank=None):
    """读取 YAML 题库，构建 JS 输出文件。"""
    questions_dir = Path(questions_dir)
    if not questions_dir.exists():
        print(f"❌ 题库目录不存在: {questions_dir}")
        return False

    banks = {}
    total_questions = 0
    all_errors = []

    # 遍历每个题库子目录
    for bank_dir in sorted(questions_dir.iterdir()):
        if not bank_dir.is_dir():
            continue
        bank_id = bank_dir.name

        if target_bank and bank_id != target_bank:
            continue

        meta = BANK_META.get(bank_id, {'name': bank_id, 'emoji': '📚', 'description': ''})

        # 收集 YAML 文件
        yaml_files = sorted(bank_dir.glob('*.yaml')) + sorted(bank_dir.glob('*.yml'))
        if not yaml_files:
            print(f"⚠️  题库 {bank_id} 没有 YAML 文件，跳过")
            continue

        all_questions = []
        seen_ids = set()
        floor_map = {}

        for yf in yaml_files:
            text = yf.read_text(encoding='utf-8')
            if HAS_YAML:
                qs = yaml.safe_load(text)
            else:
                qs = simple_yaml_load(text)

            if not qs:
                print(f"⚠️  {yf.name} 为空或解析失败，跳过")
                continue

            for idx, q in enumerate(qs):
                # 验证
                valid, errors = validate_question(q, bank_id, str(yf))
                if not valid:
                    for e in errors:
                        all_errors.append(f"[{bank_id}/{yf.name}#{idx}] {e}")
                    continue

                # 检查 ID 重复
                qid = q['id']
                if qid in seen_ids:
                    all_errors.append(f"[{bank_id}/{yf.name}] ID 重复: {qid}")
                    continue
                seen_ids.add(qid)

                # 推断楼层（按 YAML 文件顺序 + 难度）
                floor = q.get('floor')
                if floor is None:
                    # 根据难度和文件顺序推断
                    file_idx = yaml_files.index(yf)
                    difficulty_order = {'easy': 1, 'medium': 2, 'hard': 3}
                    diff_floor = difficulty_order.get(q['difficulty'], 1)
                    floor = min(4, file_idx + diff_floor)
                    q['floor'] = floor

                floor_map[floor] = floor_map.get(floor, 0) + 1

                # 确保 tags 存在
                if 'tags' not in q or q['tags'] is None:
                    q['tags'] = []

                all_questions.append(q)

        banks[bank_id] = {
            'id': bank_id,
            'name': meta['name'],
            'emoji': meta['emoji'],
            'description': meta['description'],
            'questionCount': len(all_questions),
            'questions': all_questions,
        }
        total_questions += len(all_questions)
        print(f"✅ {bank_id}: {len(all_questions)} 题 (楼层分布: {dict(sorted(floor_map.items()))})")

    if not banks:
        print("❌ 没有找到任何题库")
        return False

    if all_errors:
        print(f"\n⚠️  发现 {len(all_errors)} 个验证错误:")
        for e in all_errors[:20]:
            print(f"   - {e}")
        if len(all_errors) > 20:
            print(f"   ... 还有 {len(all_errors) - 20} 个错误")

    # 输出 JS 文件
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)

    # 生成与现有格式一致的 JS
    js_content = (
        "// 题库注册中心（由 build 脚本自动生成）\n"
        "// 请不要手动修改此文件，修改 questions/ 下的 YAML 源文件后重新构建\n"
        "window.QUESTION_BANKS = "
        + json.dumps(banks, ensure_ascii=False, indent=2)
        + ";\n\n"
        + "// 兼容旧接口：默认题库 = 第一个\n"
        + "window.QUESTION_BANK = window.QUESTION_BANKS[Object.keys(window.QUESTION_BANKS)[0]].questions;\n"
    )

    output.write_text(js_content, encoding='utf-8')

    print(f"\n📦 构建完成！共 {len(banks)} 个题库，{total_questions} 道题")
    print(f"   输出: {output}")

    return len(all_errors) == 0


def main():
    parser = argparse.ArgumentParser(description='Quizgeon 题库构建工具')
    parser.add_argument('--bank', help='只构建指定题库')
    parser.add_argument('--questions-dir', default='questions', help='题库目录 (默认: questions)')
    parser.add_argument('--output', default='src/js/data/questions.js', help='输出文件路径')
    parser.add_argument('--strict', action='store_true', help='严格模式：有验证错误则失败退出')
    args = parser.parse_args()

    # 以项目根目录为基准
    script_dir = Path(__file__).parent.resolve()
    project_root = script_dir.parent
    os.chdir(project_root)

    success = build_questions(args.questions_dir, args.output, args.bank)

    if args.strict and not success:
        sys.exit(1)

    sys.exit(0 if success else 0)  # 警告不阻止构建


if __name__ == '__main__':
    main()
