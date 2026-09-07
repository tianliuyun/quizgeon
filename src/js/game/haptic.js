// 触感反馈 — 振动 API
const Haptic = {
  enabled: true,

  // 初始化（检查支持）
  init() {
    const saved = localStorage.getItem('quizgeon_haptic');
    if (saved === '0') this.enabled = false;
    return this.isSupported();
  },

  // 是否支持
  isSupported() {
    return 'vibrate' in navigator;
  },

  // 轻触（按钮反馈）
  tap() {
    if (!this.enabled || !this.isSupported()) return;
    try { navigator.vibrate(10); } catch (e) {}
  },

  // 错误/受伤
  error() {
    if (!this.enabled || !this.isSupported()) return;
    try { navigator.vibrate([30, 20, 30]); } catch (e) {}
  },

  // 成功/答对
  success() {
    if (!this.enabled || !this.isSupported()) return;
    try { navigator.vibrate([10, 10, 20]); } catch (e) {}
  },

  // 成就/特殊
  heavy() {
    if (!this.enabled || !this.isSupported()) return;
    try { navigator.vibrate([50, 30, 50, 30, 100]); } catch (e) {}
  },

  // 开关
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('quizgeon_haptic', this.enabled ? '1' : '0');
    return this.enabled;
  }
};
