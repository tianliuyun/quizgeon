#!/usr/bin/env python3
"""题库构建工具验证函数测试（零依赖，直接运行）"""

import sys
import os
import importlib.util

# 动态加载 build-questions.py（文件名有连字符，不能直接 import）
script_path = os.path.join(os.path.dirname(__file__), '..', 'scripts', 'build-questions.py')
spec = importlib.util.spec_from_file_location('build_questions', script_path)
bq = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bq)
validate_question = bq.validate_question

passed = 0
failed = 0
failures = []


def test(name, fn):
    global passed, failed
    try:
        fn()
        print(f"  ✅ {name}")
        passed += 1
    except AssertionError as e:
        print(f"  ❌ {name}: {e}")
        failed += 1
        failures.append((name, str(e)))
    except Exception as e:
        print(f"  ❌ {name}: 异常 - {e}")
        failed += 1
        failures.append((name, str(e)))


def make_q(**overrides):
    base = {
        'id': 'test-001',
        'difficulty': 'easy',
        'type': 'single',
        'question': '测试题目？',
        'options': ['A. 选项A', 'B. 选项B', 'C. 选项C', 'D. 选项D'],
        'answer': 'A',
        'explanation': '这是解析',
        'tags': ['test'],
    }
    base.update(overrides)
    return base


print('\n📁 validate_question 测试')

# ========== 必填字段 ==========

def test_valid_single():
    ok, errs = validate_question(make_q(), 'test', '')
    assert ok, f"应该通过，错误: {errs}"
test('合法单选题通过验证', test_valid_single)

def test_missing_id():
    q = make_q()
    q.pop('id')
    ok, _ = validate_question(q, 'test', '')
    assert not ok, "缺少 id 应该失败"
test('缺少 id 字段失败', test_missing_id)

def test_missing_answer():
    q = make_q(answer=None)
    ok, _ = validate_question(q, 'test', '')
    assert not ok, "缺少 answer 应该失败"
test('缺少 answer 失败', test_missing_answer)

def test_missing_explanation():
    q = make_q(explanation=None)
    ok, _ = validate_question(q, 'test', '')
    assert not ok, "缺少 explanation 应该失败"
test('缺少 explanation 失败', test_missing_explanation)

# ========== difficulty ==========

def test_diff_easy():
    ok, _ = validate_question(make_q(difficulty='easy'), 'test', '')
    assert ok
test('difficulty=easy 合法', test_diff_easy)

def test_diff_medium():
    ok, _ = validate_question(make_q(difficulty='medium'), 'test', '')
    assert ok
test('difficulty=medium 合法', test_diff_medium)

def test_diff_hard():
    ok, _ = validate_question(make_q(difficulty='hard'), 'test', '')
    assert ok
test('difficulty=hard 合法', test_diff_hard)

def test_diff_invalid():
    ok, _ = validate_question(make_q(difficulty='invalid'), 'test', '')
    assert not ok
test('difficulty=invalid 失败', test_diff_invalid)

# ========== type ==========

def test_type_single():
    ok, _ = validate_question(make_q(type='single'), 'test', '')
    assert ok
test('type=single 合法', test_type_single)

def test_type_open():
    q = make_q(type='open', answer='参考答案', options=None)
    ok, errs = validate_question(q, 'test', '')
    assert ok, f"开放题应该通过，错误: {errs}"
test('type=open 合法（无需 options）', test_type_open)

def test_type_open_no_answer():
    q = make_q(type='open', answer=None, options=None)
    ok, _ = validate_question(q, 'test', '')
    assert not ok, "开放题缺参考答案应该失败"
test('type=open 缺 answer 失败', test_type_open_no_answer)

def test_type_invalid():
    ok, _ = validate_question(make_q(type='essay'), 'test', '')
    assert not ok
test('type=invalid 失败', test_type_invalid)

# ========== 选项格式 ==========

def test_too_few_options():
    ok, _ = validate_question(make_q(options=['A. 只有一个']), 'test', '')
    assert not ok
test('选项少于 2 个失败', test_too_few_options)

def test_bad_option_format():
    q = make_q(options=['错误格式', 'B. 选项B', 'C. 选项C', 'D. 选项D'])
    ok, _ = validate_question(q, 'test', '')
    assert not ok
test('选项格式不对（缺少 A. 前缀）失败', test_bad_option_format)

# ========== 答案验证 ==========

def test_answer_a():
    ok, _ = validate_question(make_q(answer='A'), 'test', '')
    assert ok
test('答案 A 合法', test_answer_a)

def test_answer_d():
    ok, _ = validate_question(make_q(answer='D'), 'test', '')
    assert ok
test('答案 D 合法', test_answer_d)

def test_answer_out_of_range():
    ok, _ = validate_question(make_q(answer='E'), 'test', '')
    assert not ok
test('答案 E 超出范围失败', test_answer_out_of_range)

# ========== tags ==========

def test_tags_list():
    ok, _ = validate_question(make_q(tags=['a', 'b']), 'test', '')
    assert ok
test('tags 为列表合法', test_tags_list)

def test_tags_empty():
    ok, _ = validate_question(make_q(tags=[]), 'test', '')
    assert ok
test('tags 为空列表合法', test_tags_empty)

def test_tags_none():
    ok, _ = validate_question(make_q(tags=None), 'test', '')
    assert ok
test('tags 为 null 合法（有默认值）', test_tags_none)


# ========== 汇总 ==========

print(f'\n══════════════════════════════════')
print(f'  通过: {passed}  |  失败: {failed}  |  总计: {passed + failed}')
print(f'══════════════════════════════════')

if failures:
    print('\n❌ 失败详情:')
    for name, err in failures:
        print(f'  - {name}: {err}')
    sys.exit(1)
else:
    print('\n🎉 全部通过！')
    sys.exit(0)
