# SNAPSHOT.md — Quizgeon（题牢）进度快照

> 更新：2026-09-08（当日收工）
> 仓库：https://github.com/tianliuyun/quizgeon
> 在线玩：https://tianliuyun.github.io/quizgeon/

## 当前阶段

v0.18 已完成，项目已开源上线到 GitHub。v0.19（性能优化+可访问性）和 v0.20（最终打磨）待做。

## 本轮完成（本次会话）

- ✅ v0.18 收尾：Issue 模板（3个） + PR 模板 + README 补充（测试/构建/PWA/贡献/统计）
- ✅ 开源上线：GitHub 仓库创建 + 推送（18 个 commit，v0.1 ~ v0.18）
- ✅ GitHub Pages 启用（首次构建需等待）
- ✅ 仓库设置：topics（10个标签）、主页链接、关闭 Wiki
- ✅ SNAPSHOT.md + AGENTS.md 更新

## 项目状态清单（全量）

- ✅ v0.1：MVP 基线，核心答题循环 + 2层20题
- ✅ v0.2：架构重构，集中配置 + 工具函数
- ✅ v0.3：错误处理 + 边界加固
- ✅ v0.4：遗物系统（8个）
- ✅ v0.5：职业系统（4个）
- ✅ v0.6：动画效果（飘字/震动/受击）
- ✅ v0.7：第4层题库（分布式训练+推理）
- ✅ v0.8：难度选择 + 每日挑战
- ✅ v0.9：键盘快捷键
- ✅ v0.10：成就系统（16个）
- ✅ v0.11：多题库系统（2套题库）
- ✅ v0.12：移动端优化 + 触感反馈
- ✅ v0.13：主题系统（4个主题）
- ✅ v0.14：统计增强 + 学习进度 + 学习建议
- ✅ v0.15：PWA 支持（离线可用）
- ✅ v0.16：题库构建工具脚本
- ✅ v0.17：单元测试（42 JS + 20 Python）
- ✅ v0.18：开源准备（LICENSE + 贡献指南 + Issue/PR 模板 + README）
- 📌 v0.19：性能优化 + 可访问性
- 📌 v0.20：最终打磨 + 正式发布

## 待老师拍板

- 无

## 关键约定/红线

- **技术栈**：纯 HTML/CSS/JS，零依赖、零构建
- **版本管理**：每个版本一个 commit，可随时回退
- **部署**：
  - 本地服务 `http://100.122.77.116:8765`（systemd 托管）
  - GitHub Pages: https://tianliuyun.github.io/quizgeon/
- **开源仓库**：https://github.com/tianliuyun/quizgeon
- **题库规范**：YAML 源文件 → 构建脚本生成 JS
- **测试纪律**：核心模块必须有单元测试，零依赖 test runner
- **共 62 个测试，全部通过**

## 下次开工入口

1. 读 AGENTS.md + SNAPSHOT.md
2. 第一步动作：v0.19 性能优化 + 可访问性
   - 首屏加载优化（精简 CSS、延迟加载非核心 JS）
   - 可访问性（ARIA 标签、键盘导航完善、对比度检查）
   - 性能指标测量（Lighthouse 跑分）
3. 然后 v0.20 最终打磨 + 正式发版
4. 项目路径：`~/.hermes/workspace/tasks/quizgeon/`
