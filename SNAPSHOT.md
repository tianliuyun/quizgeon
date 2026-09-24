# SNAPSHOT.md — Quizgeon（题牢）进度快照

> 更新：2026-09-24（考核体系 V1.1 收工，117 题全覆盖）

## 当前阶段

**考核体系 V1.1 定稿**：答题卡 + 三级标签 + 117 题题库（18 周全覆盖 + 3 简历项目 + 7 技术栈），已 push GitHub。V1.2（分数曲线图表 + 模拟面试模式 + 间隔复测高危清单）待做，不影响当前使用。

## 本轮完成（2026-09-24）

- ✅ **V1 基线**：考核模式（exam.html）+ 火山 LLM 判分（judge-server）+ 47 题混合题库
- ✅ **V1.1 答题卡**：题号网格 + 状态色（绿对/红错/灰跳过）+ 题型角标 + 点击自由跳转 + 当前高亮
- ✅ **V1.1 三级标签**：week（课程周）/ project（简历项目）/ stack（技术栈）独立字段，题顶徽章，报告按三类分别聚合薄弱点
- ✅ **V1.1 题库 117 题**：17/18 周 + 3 项目（ticket 5/rag 6/lora 3）+ 7 技术栈（rag 31/agent 23/pretrain-sft 18/transformer 14/inference 14/nlp 13/rl 4）；题型 single 60 / boolean 25 / open 32
- ✅ 默认题库改为大模型面试；build 脚本支持 boolean + 跳过归档目录
- ✅ 已 push GitHub（c0586e6..6734042）

## 项目状态清单（全量）

- ✅ v0.1~v0.18 游戏本体（地牢/错题池/图鉴/统计/每日挑战/PWA 等）
- ✅ **考核体系 V1 + V1.1**（exam.html + judge-server + 117 题）
- 📌 V1.2：分数曲线图表（历史考核记录可视化）、模拟面试模式（40min 全真）、间隔复测高危清单
- 📌 week18 面试指导题（可选，2-3 题，需老师确认是否要）

## 考核体系使用

1. **本地完整模式**（含 LLM 判分）：http://100.122.77.116:8765/exam.html （Tailscale 内网；手机同网络可访问）
2. 服务启动命令：
   - 页面：`cd ~/.hermes/workspace/tasks/quizgeon && python3 -m http.server 8765 --bind 0.0.0.0`
   - 判分：`~/.hermes/hermes-agent/venv/bin/python3 judge-server/judge-server.py --host 0.0.0.0 --port 8787`
3. **网页版**（客观题）：https://tianliuyun.github.io/quizgeon/exam.html （open 判分受 https 混合内容限制）
4. 新题/改题：改 `questions/llm-interview/*.yaml` → `~/.hermes/hermes-agent/venv/bin/python3 scripts/build-questions.py` → 刷新页面

## 待办（下次开工）

- [ ] V1.2：分数曲线 + 模拟面试模式 + 间隔复测高危清单
- [ ] 是否补 week18 面试技巧题（2-3 题）
- [ ] 浏览器交互完整回归（browser_exec 依赖下载失败，仅验证了题库加载/单点判分）

## 关键约定

- LLM 判分：火山方舟 deepseek-v4-flash（~/.hermes/.env 的 ARK_API_KEY），judge 绑定 0.0.0.0 供 Tailscale 访问，无鉴权（仅限信任设备）
- 题库格式：single/boolean/open 三型；open 必填 points + variants；week/project/stack 三级标签（规范见 docs/题库格式规范.md）
- build：`~/.hermes/hermes-agent/venv/bin/python3 scripts/build-questions.py`；归档目录 `questions/_archive/` 不收录
- 题目数字口径与 v16 简历一致（项目题可扛 3 层追问）
