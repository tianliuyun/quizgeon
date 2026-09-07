// 键盘快捷键系统
const KeyboardShortcuts = {
  enabled: true,

  init() {
    document.addEventListener('keydown', (e) => this.handleKey(e));
  },

  handleKey(e) {
    // 输入框里不触发快捷键
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (!this.enabled) return;

    const key = e.key.toUpperCase();

    // 数字键 1-9 选择对应选项
    if (/^[1-9]$/.test(key)) {
      const index = parseInt(key) - 1;
      const options = document.querySelectorAll('.option-btn');
      if (options[index]) {
        e.preventDefault();
        options[index].click();
      }
      return;
    }

    // A/B/C/D 键选答案
    if (['A', 'B', 'C', 'D'].includes(key)) {
      const options = document.querySelectorAll('.option-btn');
      for (const opt of options) {
        const letter = opt.querySelector('.option-letter');
        if (letter && letter.textContent.trim() === key) {
          e.preventDefault();
          opt.click();
          return;
        }
      }
    }

    // Enter 确认（继续按钮 / 下一题）
    if (key === 'ENTER') {
      // 先找反馈继续按钮
      const continueBtn = document.querySelector('.btn-continue');
      if (continueBtn && continueBtn.offsetParent !== null) {
        e.preventDefault();
        continueBtn.click();
        return;
      }
      // 提交多选
      const submitBtn = document.querySelector('.submit-multi');
      if (submitBtn && submitBtn.offsetParent !== null) {
        e.preventDefault();
        submitBtn.click();
        return;
      }
      // 提交开放题
      const openSubmit = document.querySelector('.open-submit-btn');
      if (openSubmit && openSubmit.offsetParent !== null) {
        e.preventDefault();
        openSubmit.click();
        return;
      }
      // 学习模式的"我懂了"
      const gotIt = document.querySelector('.btn-gotit');
      if (gotIt && gotIt.offsetParent !== null) {
        e.preventDefault();
        gotIt.click();
        return;
      }
    }

    // S 音效开关
    if (key === 'S') {
      const btn = document.getElementById('btn-sound');
      if (btn) { e.preventDefault(); btn.click(); }
    }

    // ESC 返回主菜单 / 退出
    if (key === 'ESCAPE') {
      const menuBtn = document.getElementById('btn-menu');
      if (menuBtn && menuBtn.offsetParent !== null) {
        e.preventDefault();
        if (confirm('确定要返回主菜单吗？进度会自动保存。')) {
          Game.returnToMenu();
        }
      }
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
};
