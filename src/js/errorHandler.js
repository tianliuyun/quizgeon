// 错误处理 + 全局防御
(function () {
  // 全局错误捕获
  window.addEventListener('error', function (e) {
    console.error('Quizgeon 错误:', e.error || e.message);
    // 不打断用户，静默记录
    if (window.Game && window.Game.state === 'playing') {
      // 尝试保存当前进度
      try {
        if (window.SaveSystem && window.SaveSystem.saveCurrent) {
          // 已在 autoSave 里处理，这里不重复
        }
      } catch (_) { /* ignore */ }
    }
    return false;
  });

  // localStorage 不可用时的降级方案
  const _origSetItem = localStorage.setItem;
  try {
    localStorage.setItem('_test_', '1');
    localStorage.removeItem('_test_');
  } catch (e) {
    console.warn('localStorage 不可用，使用内存存储');
    const memStore = {};
    const memLocalStorage = {
      getItem: function (k) { return memStore[k] || null; },
      setItem: function (k, v) { memStore[k] = String(v); },
      removeItem: function (k) { delete memStore[k]; },
      clear: function () { for (const k in memStore) delete memStore[k]; }
    };
    // 替换 SaveSystem 的存储方式
    window._memStorage = memLocalStorage;
  }

  // 防止意外关闭提示（游戏中）
  window.addEventListener('beforeunload', function (e) {
    if (window.Game && window.Game.state === 'playing') {
      // 大部分浏览器不显示自定义文本，但触发确认
      e.preventDefault();
      e.returnValue = '';
    }
  });
})();
