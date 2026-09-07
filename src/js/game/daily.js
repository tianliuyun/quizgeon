// 每日挑战系统 — 用日期做种子，所有人玩同一个地牢
const DailyChallenge = {
  // 获取今天的日期字符串（YYYY-MM-DD）
  getToday() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  // 从日期生成种子（简单哈希）
  getSeed(dateStr) {
    let hash = 0;
    const s = dateStr || this.getToday();
    for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  },

  // 用种子生成伪随机数
  seededRandom(seed) {
    let s = seed;
    return function() {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  },

  // 检查今天是否已完成
  isTodayCompleted() {
    const save = SaveSystem.load();
    const today = this.getToday();
    return save.permanent.dailyBest?.date === today;
  },

  // 获取今日最佳成绩
  getTodayBest() {
    const save = SaveSystem.load();
    const best = save.permanent.dailyBest;
    if (!best || best.date !== this.getToday()) return null;
    return best;
  },

  // 记录今日成绩
  recordScore(floor, room, gold, correct) {
    const today = this.getToday();
    const save = SaveSystem.load();
    const score = floor * 100 + room * 10 + gold + correct * 5;

    const currentBest = save.permanent.dailyBest;
    if (!currentBest || currentBest.date !== today || score > currentBest.score) {
      save.permanent.dailyBest = {
        date: today,
        floor,
        room,
        gold,
        correct,
        score
      };
      SaveSystem.save(save);
      return true; // 新纪录
    }
    return false;
  },

  // 获取历史最佳（每日挑战最高分）
  getHistoryBest() {
    const save = SaveSystem.load();
    return save.permanent.dailyHistory || [];
  },

  // 添加到历史
  addToHistory(floor, room, gold, correct, score) {
    const save = SaveSystem.load();
    if (!save.permanent.dailyHistory) save.permanent.dailyHistory = [];
    save.permanent.dailyHistory.push({
      date: this.getToday(),
      floor, room, gold, correct, score
    });
    // 只保留最近 30 条
    save.permanent.dailyHistory = save.permanent.dailyHistory.slice(-30);
    SaveSystem.save(save);
  },

  // 获取今日题目种子（用于地牢生成）
  getTodaySeed() {
    return this.getSeed(this.getToday());
  }
};
