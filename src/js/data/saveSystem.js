// 存档系统 — localStorage 持久化
const SaveSystem = {
  KEY: 'quizgeon_save_v1',

  // 读取存档
  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this.defaultSave();
      return JSON.parse(raw);
    } catch (e) {
      console.warn('读取存档失败:', e);
      return this.defaultSave();
    }
  },

  // 保存
  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('保存失败:', e);
    }
  },

  // 默认存档
  defaultSave() {
    return {
      // 永久进度（跨局继承）
      permanent: {
        soulShards: 0,      // 灵魂碎片（永久升级货币）
        maxFloor: 0,         // 最高层数
        totalCorrect: 0,     // 累计答对
        totalWrong: 0,       // 累计答错
        totalRuns: 0,        // 总游戏次数
        codex: {},           // 知识点图鉴：{ questionId: { mastered, wrongCount, rightCount } }
        upgrades: {          // 永久升级
          maxHp: 0,          // 等级 0/1/2/3 → +0/+10/+20/+30 HP
          startGold: 0,      // 等级 0/1/2 → +0/+10/+20 金币
          shopDiscount: 0,   // 等级 0/1/2 → 0%/10%/20%
          wrongReduce: 0,    // 等级 0/1/2 → 0%/15%/30% 错题复现率降低
        }
      },
      // 当前局进度（死亡重置）
      current: null
    };
  },

  // 保存当前局进度
  saveCurrent(player, dungeon, roomIndex) {
    const save = this.load();
    save.current = {
      player: {
        maxHp: player.maxHp,
        hp: player.hp,
        gold: player.gold,
        floor: player.floor,
        room: player.room,
        totalRooms: player.totalRooms,
        relics: player.relics,
        items: player.items,
        correctThisRun: player.correctThisRun,
        wrongThisRun: player.wrongThisRun
      },
      dungeonRoomIds: dungeon.map(r => r.question.id),
      roomIndex: roomIndex,
      savedAt: Date.now()
    };
    this.save(save);
  },

  // 读取当前局进度
  loadCurrent() {
    const save = this.load();
    return save.current;
  },

  // 清除当前局进度
  clearCurrent() {
    const save = this.load();
    save.current = null;
    this.save(save);
  },

  // 重置当前局
  resetCurrent() {
    const save = this.load();
    save.current = null;
    this.save(save);
  },

  // 更新图鉴（答对/答错后调用）
  updateCodex(questionId, isCorrect) {
    const save = this.load();
    if (!save.permanent.codex[questionId]) {
      save.permanent.codex[questionId] = {
        firstSeen: Date.now(),
        rightCount: 0,
        wrongCount: 0,
        mastered: false
      };
    }
    const entry = save.permanent.codex[questionId];
    if (isCorrect) {
      entry.rightCount++;
      // 连续答对5次标记为已掌握
      if (entry.rightCount >= 5 && entry.wrongCount <= entry.rightCount / 4) {
        entry.mastered = true;
      }
    } else {
      entry.wrongCount++;
      entry.mastered = false;
    }
    save.permanent.totalCorrect += isCorrect ? 1 : 0;
    save.permanent.totalWrong += isCorrect ? 0 : 1;
    this.save(save);
  },

  // 获取错题池（用于加权出题）
  getWrongPool() {
    const save = this.load();
    const wrong = {};
    for (const [id, entry] of Object.entries(save.permanent.codex)) {
      if (entry.wrongCount > 0 && !entry.mastered) {
        // 权重 = 答错次数 - 答对次数，最小为 1
        wrong[id] = Math.max(1, entry.wrongCount - entry.rightCount);
      }
    }
    return wrong;
  }
};
