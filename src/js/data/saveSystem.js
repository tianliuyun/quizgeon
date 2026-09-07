// 存档系统 — localStorage 持久化
const SaveSystem = {
  // 读取存档
  load() {
    try {
      const raw = localStorage.getItem(CONFIG.save.key);
      if (!raw) return this.defaultSave();
      const data = JSON.parse(raw);
      return { ...this.defaultSave(), ...data };
    } catch (e) {
      console.warn('读取存档失败:', e);
      return this.defaultSave();
    }
  },

  // 保存
  save(data) {
    try {
      localStorage.setItem(CONFIG.save.key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('保存失败:', e);
      return false;
    }
  },

  // 默认存档结构
  defaultSave() {
    return {
      permanent: {
        soulShards: 0,
        maxFloor: 0,
        totalCorrect: 0,
        totalWrong: 0,
        totalRuns: 0,
        codex: {},
        upgrades: {
          maxHp: 0,
          startGold: 0,
          shopDiscount: 0,
          wrongReduce: 0
        },
        achievements: {},
        stats: {
          bestRun: null,
          daily: {}
        }
      },
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
        relics: player.relics || [],
        items: player.items || {},
        correctThisRun: player.correctThisRun || 0,
        wrongThisRun: player.wrongThisRun || 0
      },
      dungeonRoomIds: dungeon.map(r => r.question ? r.question.id : null),
      dungeonTypes: dungeon.map(r => r.type),
      roomIndex: roomIndex,
      savedAt: Date.now()
    };
    return this.save(save);
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
    return this.save(save);
  },

  // 重置当前局（兼容旧接口）
  resetCurrent() {
    return this.clearCurrent();
  },

  // 更新图鉴
  updateCodex(questionId, isCorrect) {
    const save = this.load();
    if (!save.permanent.codex[questionId]) {
      save.permanent.codex[questionId] = {
        firstSeen: Date.now(),
        rightCount: 0,
        wrongCount: 0,
        mastered: false,
        lastSeen: null
      };
    }
    const entry = save.permanent.codex[questionId];
    entry.lastSeen = Date.now();
    if (isCorrect) {
      entry.rightCount++;
      if (entry.rightCount >= 5 && entry.wrongCount <= Math.floor(entry.rightCount / 4)) {
        entry.mastered = true;
      }
    } else {
      entry.wrongCount++;
      entry.mastered = false;
    }
    save.permanent.totalCorrect += isCorrect ? 1 : 0;
    save.permanent.totalWrong += isCorrect ? 0 : 1;
    return this.save(save);
  },

  // 获取错题池（用于加权出题）
  getWrongPool() {
    const save = this.load();
    const wrong = {};
    for (const [id, entry] of Object.entries(save.permanent.codex)) {
      if (entry.wrongCount > 0 && !entry.mastered) {
        wrong[id] = Math.max(1, entry.wrongCount - entry.rightCount);
      }
    }
    return wrong;
  },

  // 增加游戏次数
  incrementRuns() {
    const save = this.load();
    save.permanent.totalRuns++;
    return this.save(save);
  },

  // 更新最高层
  updateMaxFloor(floor) {
    const save = this.load();
    if (floor > save.permanent.maxFloor) {
      save.permanent.maxFloor = floor;
      return this.save(save);
    }
    return false;
  },

  // 增加灵魂碎片
  addSoulShards(amount) {
    const save = this.load();
    save.permanent.soulShards += amount;
    return this.save(save);
  },

  // 购买升级
  buyUpgrade(type) {
    const save = this.load();
    const upgradeConfig = CONFIG.upgrades[type];
    if (!upgradeConfig) return { success: false, msg: '升级不存在' };

    const currentLevel = save.permanent.upgrades[type] || 0;
    if (currentLevel >= upgradeConfig.maxLevel) {
      return { success: false, msg: '已满级' };
    }
    if (save.permanent.soulShards < upgradeConfig.cost) {
      return { success: false, msg: '灵魂碎片不足' };
    }

    save.permanent.soulShards -= upgradeConfig.cost;
    save.permanent.upgrades[type] = currentLevel + 1;
    this.save(save);
    return { success: true, newLevel: currentLevel + 1 };
  }
};
