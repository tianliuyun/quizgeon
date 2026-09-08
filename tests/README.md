# 测试

Quizgeon 使用零依赖测试框架，直接用 Node.js / Python 运行。

## 运行所有测试

```bash
# 前端 JS 模块测试
node tests/run.js

# 题库构建脚本测试
python3 tests/test_build_questions.py
```

## 运行单个测试文件

```bash
# 按文件名过滤
node tests/run.js player
node tests/run.js saveSystem
```

## 测试文件结构

| 文件 | 测试内容 | 运行方式 |
|------|---------|---------|
| `player.test.js` | Player 模块（生命值/金币/道具/答题统计） | `node tests/run.js player` |
| `saveSystem.test.js` | SaveSystem 存档系统 | `node tests/run.js saveSystem` |
| `test_build_questions.py` | 题库构建验证函数 | `python3 tests/test_build_questions.py` |

## 添加新测试

### JS 测试

1. 在 `tests/` 下新建 `xxx.test.js`
2. 用 `loadJS('path/to/module.js')` 加载依赖
3. 用 `test('描述', () => { ... })` 写测试
4. 用 `assert.equal/ok/deepEqual/...` 断言

```javascript
loadJS('src/js/your-module.js');

test('测试描述', () => {
  const result = YourModule.someFunction();
  assert.equal(result, expected);
});
```

### Python 测试

直接写脚本，用 `assert` 断言即可。
