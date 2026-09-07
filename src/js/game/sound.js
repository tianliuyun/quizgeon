// 音效系统 — 用 Web Audio API 生成简单音效，零外部依赖
const Sound = {
  ctx: null,
  enabled: true,

  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    } catch (e) {
      console.warn('Web Audio API 不支持，音效已禁用');
      this.enabled = false;
    }
  },

  // 播放一个音调
  beep(freq, duration, type = 'sine', volume = 0.1) {
    if (!this.enabled || !this.ctx) return;
    // 用户交互后才能播放，确保 context 已恢复
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration);
  },

  // 答对：上升音
  correct() {
    this.beep(523.25, 0.1, 'sine', 0.08);  // C5
    setTimeout(() => this.beep(659.25, 0.1, 'sine', 0.08), 80);  // E5
    setTimeout(() => this.beep(783.99, 0.15, 'sine', 0.08), 160);  // G5
  },

  // 答错：下降音
  wrong() {
    this.beep(392, 0.1, 'square', 0.06);  // G4
    setTimeout(() => this.beep(311.13, 0.15, 'square', 0.06), 100);  // Eb4
  },

  // 按钮点击
  click() {
    this.beep(800, 0.03, 'sine', 0.04);
  },

  // Boss 出场
  boss() {
    this.beep(100, 0.3, 'sawtooth', 0.06);
    setTimeout(() => this.beep(80, 0.4, 'sawtooth', 0.06), 200);
  },

  // 胜利/过关
  victory() {
    const notes = [523.25, 659.25, 783.99, 1046.50];  // C E G C
    notes.forEach((freq, i) => {
      setTimeout(() => this.beep(freq, 0.15, 'sine', 0.08), i * 100);
    });
  },

  // 受伤
  hurt() {
    this.beep(200, 0.15, 'sawtooth', 0.08);
  },

  // 金币
  coin() {
    this.beep(987.77, 0.05, 'square', 0.05);
    setTimeout(() => this.beep(1318.51, 0.1, 'square', 0.05), 50);
  },

  // 切换开关
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('quizgeon_sound', this.enabled ? '1' : '0');
    return this.enabled;
  },

  // 加载设置
  loadSetting() {
    const saved = localStorage.getItem('quizgeon_sound');
    if (saved === '0') this.enabled = false;
  }
};
