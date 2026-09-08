# 题库贡献指南

## 目录结构

```
questions/
├── llm-interview/          # 题库 ID（英文，短横线分隔）
│   ├── 01-transformer.yaml  # 章节文件（按数字排序）
│   └── 02-pretrain-sft.yaml
└── frontend-basics/
    └── 01-js-css-react.yaml
```

每个子目录 = 一个题库，子目录名即题库 ID。

## 题目格式（YAML）

```yaml
- id: trans-001           # 唯一 ID，建议前缀+编号
  difficulty: easy        # easy / medium / hard
  type: single            # single / multiple / judge / open
  question: 题目内容
  options:                # 选择题必填，A. B. C. D. 格式
  - A. 选项 A
  - B. 选项 B
  - C. 选项 C
  - D. 选项 D
  answer: B               # 正确答案（单选: 字母，多选: 字母串如 "AC"，判断: A/B，开放题: 参考答案）
  explanation: |          # 解析，Markdown 兼容纯文本
    详细解释...
    
    可以有多段。
  tags:                   # 标签（用于分类/检索）
  - transformer
  - attention
  floor: 1                # 楼层（可选，构建器会自动推断）
```

### 题型说明

| type | 说明 | 特有字段 |
|------|------|---------|
| `single` | 单选题 | options (4个) + answer (单个字母) |
| `multiple` | 多选题 | options + answer (字母串，如 "ABD") |
| `judge` | 判断题 | options (2个，A.正确 B.错误) + answer (A/B) |
| `open` | 开放题 | answer (参考答案字符串，用于 Boss 战) |

## 构建命令

```bash
# 构建所有题库
python3 scripts/build-questions.py

# 只构建指定题库
python3 scripts/build-questions.py --bank llm-interview

# 严格模式（有验证错误则失败退出）
python3 scripts/build-questions.py --strict
```

输出文件：`src/js/data/questions.js`

## 楼层分配规则

- 如果题目里写了 `floor` 字段，用题目里的
- 否则根据 YAML 文件顺序 + difficulty 自动推断：
  - easy → 低层
  - medium → 中层  
  - hard → 高层
- 共 4 层地牢

## 贡献新题库

1. 在 `questions/` 下新建子目录（题库 ID）
2. 按章节建 YAML 文件
3. 在 `scripts/build-questions.py` 的 `BANK_META` 里加题库元数据（名称、emoji、描述）
4. 运行构建脚本验证
5. 提交 PR
