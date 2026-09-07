// 工具函数 + 防御性编程
const Utils = {
  // 安全取值，带默认值
  safeGet(obj, path, defaultValue = null) {
    try {
      const keys = path.split('.');
      let result = obj;
      for (const key of keys) {
        if (result == null) return defaultValue;
        result = result[key];
      }
      return result !== undefined ? result : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  // 随机整数 [min, max]
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // 随机浮动（base * (1 ± variance)）
  randVariance(base, variance = 0.2) {
    return Math.round(base * (1 - variance + Math.random() * variance * 2));
  },

  // Fisher-Yates 洗牌
  shuffle(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  },

  // 加权随机选择 { item: weight }
  weightedPick(items, weights) {
    const total = weights.reduce((a, b) => a + b, 0);
    if (total <= 0) return items[0];
    let rand = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      rand -= weights[i];
      if (rand <= 0) return items[i];
    }
    return items[items.length - 1];
  },

  // 验证题目格式
  validateQuestion(q) {
    if (!q || typeof q !== 'object') return { valid: false, error: '不是对象' };
    if (!q.id) return { valid: false, error: '缺少 id' };
    if (!q.question) return { valid: false, error: '缺少 question' };
    if (!q.type) return { valid: false, error: '缺少 type' };
    if (!CONFIG.questionTypes.includes(q.type)) {
      return { valid: false, error: `未知题型: ${q.type}` };
    }
    if (q.answer === undefined || q.answer === null) {
      return { valid: false, error: '缺少 answer' };
    }
    return { valid: true };
  },

  // 转义 HTML（防止 XSS）
  escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },

  // 格式化日期
  formatDate(ts) {
    const d = new Date(ts);
    return d.toLocaleString('zh-CN', {
      month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  },

  // 节流
  throttle(fn, delay = 100) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn.apply(this, args);
      }
    };
  },

  // 防抖
  debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
};
