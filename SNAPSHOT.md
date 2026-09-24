# SNAPSHOT.md — Quizgeon（题牢）进度快照

> 更新：2026-09-24（考核体系 V1.1 完成）

## 当前阶段

**考核体系 V1.1 已完成**：答题卡 + 三级标签 + 73 题题库（覆盖 11 周 + 3 项目 + 7 技术栈）。V1.2（分数曲线+模拟面试+间隔复测）待做。

## 本轮完成（2026-09-24 V1.1）

- ✅ **答题卡**：题号网格 + 状态色（绿对/红错/灰跳过）+ 题型角标 + 点击自由跳转 + 当前题高亮
- ✅ **三级标签**：每题 week（课程周）/ project（简历项目）/ stack（技术栈）独立字段，题目顶部徽章展示，报告按三类分别聚合薄弱点
- ✅ **题库 73 题**：新增 05-nlp-basics（week6-8 NLP 基础 12 题）+ 07-project-deepdive（三项目 L1/L2/L3 追问 14 题，数字口径与简历一致）；现有 47 题补齐三级标签
- ✅ **默认题库**改为大模型面试；格式规范更新（week/project/stack 字段）
- ✅ 已 push GitHub（6577f96..b440953）

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
