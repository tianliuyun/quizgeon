// 玩家系统
const Player = {
  // 创建新角色
  create(floor = 1) {
    const save = SaveSystem.load();
    const upgrades = save.permanent.upgrades;

    const baseHp = CONFIG.player.baseHp + upgrades.maxHp * CONFIG.upgrades.maxHp.perLevel;
    const startGold = CONFIG.player.startGold + upgrades.startGold * CONFIG.upgrades.startGold.perLevel;

    return {
      maxHp: baseHp,
      hp: baseHp,
      gold: startGold,
      floor: floor,
      room: 0,
      totalRooms: CONFIG.player.roomsPerFloor,
      relics: [],
      items: {
        potion: 1,  // 起始送 1 个小血瓶
        skip: 0,
        fiftyFifty: 0
      },
      currentQuestion: null,
      correctThisRun: 0,
      wrongThisRun: 0,
      streak: 0,  // 连续答对
      bestStreak: 0
    };
  },

  // 从存档重建玩家
  restore(savedPlayer) {
    const player = this.create(savedPlayer.floor || 1);
    Object.assign(player, savedPlayer);
    // 确保 items 有默认值
    player.items = {
      potion: 0, skip: 0, fiftyFifty: 0,
      ...(savedPlayer.items || {})
    };
    return player;
  },

  // 受伤，返回是否死亡
  takeDamage(player, amount) {
    player.hp = Math.max(0, player.hp - amount);
    player.streak = 0;
    return player.hp <= 0;
  },

  // 治疗
  heal(player, amount) {
    const oldHp = player.hp;
    player.hp = Math.min(player.maxHp, player.hp + amount);
    return player.hp - oldHp;
  },

  // 增加金币
  addGold(player, amount) {
    player.gold += amount;
  },

  // 消费金币，返回是否成功
  spendGold(player, amount) {
    if (player.gold < amount) return false;
    player.gold -= amount;
    return true;
  },

  // 是否存活
  isAlive(player) {
    return player.hp > 0;
  },

  // 答对（增加连胜）
  onCorrect(player) {
    player.correctThisRun++;
    player.streak++;
    if (player.streak > player.bestStreak) {
      player.bestStreak = player.streak;
    }
  },

  // 答错（重置连胜）
  onWrong(player) {
    player.wrongThisRun++;
    player.streak = 0;
  },

  // 使用道具
  useItem(player, itemId) {
    if (!player.items[itemId] || player.items[itemId] <= 0) return false;
    player.items[itemId]--;
    return true;
  }
};
