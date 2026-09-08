# 贡献指南

感谢你考虑为 Quizgeon 做贡献！无论你是加题目、修 bug、提建议还是写文档，都非常欢迎。

## 📋 目录

- [贡献方式](#贡献方式)
- [开发环境](#开发环境)
- [提交规范](#提交规范)
- [题目贡献指南](#题目贡献指南)
- [代码贡献指南](#代码贡献指南)
- [Issue 规范](#issue-规范)
- [PR 流程](#pr-流程)

## 贡献方式

| 方式 | 说明 | 难度 |
|------|------|------|
| ➕ 加题目 | 最欢迎！按格式加 YAML | ⭐ |
| 🐛 修 Bug | 提 Issue 或直接 PR | ⭐⭐ |
| 💡 新功能 | 先开 Issue 讨论 | ⭐⭐⭐ |
| 📝 文档 | 修复错别字、补充说明 | ⭐ |
| 🌐 翻译 | 多语言支持 | ⭐⭐ |

## 开发环境

### 前置要求

- 浏览器（Chrome / Firefox / Safari 都行）
- Python 3.8+（运行构建脚本和测试）
- Node.js 18+（运行 JS 测试）

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/yourname/quizgeon.git
cd quizgeon

# 启动本地服务器（任选一种）
python3 -m http.server 8080
# 或
npx serve .
```

然后访问 `http://localhost:8080`。

### 运行测试

```bash
# JS 模块测试
node tests/run.js

# 题库构建测试
python3 tests/test_build_questions.py

# 构建题库
python3 scripts/build-questions.py
```

## 提交规范

### Git 提交信息

使用以下格式：

```
<类型>: <简短描述>

<详细描述（可选）>
```

类型：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 格式调整（不影响代码运行）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具/杂项

### 分支命名

- `feature/xxx` — 新功能
- `fix/xxx` — Bug 修复
- `docs/xxx` — 文档
- `question/xxx` — 题目添加/修改题目

## 题目贡献指南

### 在哪里加

1. 在 `questions/` 下找到对应题库目录
2. 按章节添加到对应的 YAML 文件（或新建文件）
3. 运行构建脚本验证：`python3 scripts/build-questions.py`

### 题目格式

```yaml
- id: trans-099           # 唯一 ID，前缀+编号
  difficulty: medium        # easy / medium / hard
  type: single               # single / multiple / judge / open
  question: 题目内容
  options:                  # 选择题必填
  - A. 选项 A
  - B. 选项 B
  - C. 选项 C
  - D. 选项 D
  answer: B                 # 单选: 字母，多选: 字母串如 "AC"
  explanation: |            # 解析
    详细解释...
  tags:                     # 标签
  - transformer
  - attention
  floor: 2                  # 楼层（可选，自动推断）
```

### 好题目标准

- ✅ 清晰：题目描述清晰，没有歧义
- ✅ 准确：答案正确，解析有依据
- ✅ 实用：考察真正重要的知识点，不是偏题怪题
- ✅ 有深度：解析不仅说答案，还要讲清楚为什么
- ❌ 不要：脑筋急转弯、文字游戏、过时知识点

## 代码贡献指南

### 架构原则

- **零依赖**：不引入前端框架，保持纯 HTML/CSS/JS
- **纯前端**：不依赖后端服务器
- **离线可用**：PWA 支持，断网也能玩
- **移动端优先**：小屏体验优先
- **性能优先**：首屏加载 < 50KB

### 代码风格

- 2 空格缩进
- 字符串用单引号
- 函数名用驼峰，模块名大驼峰
- 注释用中文（项目语言中文注释）

### 加新模块

1. 在 `src/js/game/` 或 `src/js/data/` 下新建 JS 文件
2. 在 `index.html` 中用 `<script>` 引入（注意顺序）
3. 挂载到全局（`window`）
4. 写对应的测试

## Issue 规范

### Bug 报告

请包含以下信息：

- **复现步骤
- **预期行为**
- **实际行为**
- **浏览器和版本
- **截图（如果适用）**

### 功能建议

请说明：

- 你想要什么功能？
- 为什么需要这个功能？
- 你认为应该怎么实现？（可选）

## PR 流程

1. Fork 本仓库
2. 创建功能分支
3. 提交修改
4. 确保测试通过
5. 提交 PR
6. 等待 Code Review
7. 合并！

### PR 模板

PR 描述请包含：

- **做了什么？**
- **为什么这么做？**
- **怎么验证的？**
- **有没有副作用？**

---

再次感谢你的贡献！🎉
