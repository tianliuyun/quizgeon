# SNAPSHOT.md — Quizgeon（题牢）进度快照

> 更新：2026-09-24（考核体系 V1 上线）

## 当前阶段

**考核体系 V1 已完成**：在游戏本体之外新增独立考核模式（exam.html），打通"题库→答题→LLM 判分→报告"最小闭环。V1.1（题库补全+间隔复测）和 V1.2（分数曲线+模拟面试）迭代中。

## 本轮完成（2026-09-24）

- ✅ **题库扩展**：llm-interview 从 44 题 → 47 题（transformer 11 / pretrain-sft 11 / rag-agent 14 / distributed 11），题型 single 29 + boolean 8 + open 10；open 题带 points 得分点 + variants 变式（36 个变式）
- ✅ **LLM 判分服务**：`judge-server/judge-server.py`（FastAPI 8787），调火山方舟 deepseek-v4-flash（~/.hermes/.env 的 ARK_API_KEY），按得分点逐条判分，实测好答案 4/4、模糊答案 0/4（严格）
- ✅ **考核模式**：`exam.html` + `exam.js`——题库/题数/限时选择、随机抽题、变式防背题、single/boolean 即时判分、open 题 LLM 判分、考核报告（正确率/得分点/薄弱点 tags/错题回顾）、localStorage 存历史
- ✅ **build 脚本**：支持 boolean 题型、判断题无需 options、跳过 `_` 开头归档目录
- ✅ **入口**：index.html 菜单新增「📝 考核模式」按钮
- ✅ 旧 03-rag-agent-inference.yaml 归档到 `questions/_archive/`（与新 rag-agent 题库 ID 冲突）

## 项目状态清单（全量）

- ✅ v0.1~v0.18 游戏本体（地牢/错题池/图鉴/统计/每日挑战/PWA 等）
- ✅ v0.19/v0.20 待做（性能/可访问性/最终打磨）
- ✅ **考核体系 V1**（exam.html + judge-server + 47 题混合题库）
- 📌 V1.1：题库补全到 9 模块 ~150 题（NLP 基础/系统设计/项目深挖追问链）、间隔复测高危清单、不预告全量抽
- 📌 V1.2：分数曲线（历史考核记录可视化）、模拟面试模式、每日小测包接入 100h 计划

## 考核体系使用

1. 启动 judge 服务：`~/.hermes/hermes-agent/venv/bin/python3 judge-server/judge-server.py --port 8787`
2. 打开 http://127.0.0.1:8899/exam.html（或 index.html → 📝 考核模式）
3. 选择题库/题数/限时 → 开始 → 答题（open 题需要 judge 服务判分）
4. 报告自动出正确率/得分点/薄弱点，历史存 localStorage

## 待办（下次开工）

- [ ] V1.1：补 NLP 基础/系统设计/三项目追问链题库（从 30 道题 + 项目深挖复习计划转）
- [ ] V1.1：间隔复测（错题 2-3 天复现）+ 高危清单
- [ ] V1.2：历史分数曲线图表 + 模拟面试模式（40min 全真）
- [ ] 浏览器交互完整回归（browser_exec 环境依赖下载失败，V1 仅验证了题库加载/单点判分）

## 关键约定

- LLM 判分统一走火山方舟 deepseek-v4-flash（与 Hermes 对话同模型），key 从 ~/.hermes/.env 读 ARK_API_KEY
- 题库格式：boolean 判断题 answer=true/false；open 题必填 points + 建议 variants（规范已更新）
- build 命令：`~/.hermes/hermes-agent/venv/bin/python3 scripts/build-questions.py`
- 归档目录 `questions/_archive/` 不被 build 收录
