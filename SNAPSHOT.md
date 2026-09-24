# SNAPSHOT.md — Quizgeon（题牢）进度快照

> 更新：2026-09-24（考核体系 V1.2 部分完成：分数曲线已上线）

## 当前阶段

**考核体系 V1.1 定稿 + V1.2 进行中**：117 题题库（18 周全覆盖 + 3 简历项目 + 7 技术栈），已 push GitHub。V1.2 已完成分数曲线，模拟面试模式 + 间隔复测高危清单待做。

## 本轮完成（2026-09-24）

- ✅ **V1 基线**：考核模式（exam.html）+ 火山 LLM 判分（judge-server）+ 47 题混合题库
- ✅ **V1.1 答题卡**：题号网格 + 状态色（绿对/红错/灰跳过）+ 题型角标 + 点击自由跳转 + 当前高亮
- ✅ **V1.1 三级标签**：week（课程周）/ project（简历项目）/ stack（技术栈）独立字段，题顶徽章，报告按三类分别聚合薄弱点
- ✅ **V1.1 题库 117 题**：17/18 周 + 3 项目（ticket 5/rag 6/lora 3）+ 7 技术栈（rag 31/agent 23/pretrain-sft 18/transformer 14/inference 14/nlp 13/rl 4）；题型 single 60 / boolean 25 / open 32
- ✅ 默认题库改为大模型面试；build 脚本支持 boolean + 跳过归档目录
- ✅ 已 push GitHub（c0586e6..6734042）
- ✅ **浏览器完整回归（09-24 晚）**：答题卡跳转/状态色、三级标签、客观判分、报告三类聚合、历史存储、open 题 LLM 判分全流程真实走通（fetch 2.2s 正常，判分质量合理）
- ✅ **judge 服务守护修复（09-24 晚）**：原 judge 进程无 systemd 守护（页面 8765 有 quizgeon.service，判分 8787 无）→ 磁盘满/重启后静默消失 → 新增 `quizgeon-judge.service`（Restart=always + enable），健康检查通过
- ✅ **超时补题修复（09-24 晚）**：限时超时后未答题原来不计入总数 → 正确率虚高 → 现在补齐为「未答」计入
- ✅ **V1.2 分数曲线（09-24 晚）**：报告区新增「历史成绩曲线」SVG 折线（最近 20 次、网格线 0-100、数据点 tooltip、日期标签），历史数据已存 localStorage（最多 100 条）

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

- [ ] V1.2 剩余：模拟面试模式（40min 全真）+ 间隔复测高危清单
- [ ] 是否补 week18 面试技巧题（2-3 题）
- [ ] 浏览器交互完整回归（browser_exec 依赖下载失败，仅验证了题库加载/单点判分）

## 关键约定

- LLM 判分：火山方舟 deepseek-v4-flash（~/.hermes/.env 的 ARK_API_KEY），judge 绑定 0.0.0.0 供 Tailscale 访问，无鉴权（仅限信任设备）
- **服务守护**：页面 `quizgeon.service` + 判分 `quizgeon-judge.service`（均 systemd user 级，enable + Restart=always）
- 题库格式：single/boolean/open 三型；open 必填 points + variants；week/project/stack 三级标签（规范见 docs/题库格式规范.md）
- build：`~/.hermes/hermes-agent/venv/bin/python3 scripts/build-questions.py`；归档目录 `questions/_archive/` 不收录
- 题目数字口径与 v16 简历一致（项目题可扛 3 层追问）
- **前端缓存**：改 exam.js/exam.html 后浏览器可能拿旧缓存 → script 已带 `?v=` 版本参数，大改后递增；本地验证用 `?v=YYYYMMDDx` 强刷
