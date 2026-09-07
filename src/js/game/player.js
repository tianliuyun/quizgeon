// 玩家系统
const Player = {
  create(floor = 1) {
    const save = SaveSystem.load();
    const upgrades = save.permanent.upgrades;

    return {
      maxHp: 100 + upgrades.maxHp * 10,
      hp: 100 + upgrades.maxHp * 10,
      gold: upgrades.startGold * 10,
      floor: floor,
      room: 0,
      totalRooms: 10,
      relics: [],       // 本局获得的遗物
      items: {          // 消耗品
        potions: 1,     // 小血瓶
        skip: 0         // 跳过符
      },
      currentQuestion: null,
      correctThisRun: 0,
      wrongThisRun: 0
    };
  },

  takeDamage(player, amount) {
    player.hp = Math.max(0, player.hp - amount);
    return player.hp <= 0;
  },

  heal(player, amount) {
    player.hp = Math.min(player.maxHp, player.hp + amount);
  },

  addGold(player, amount) {
    player.gold += amount;
  },

  isAlive(player) {
    return player.hp > 0;
  }
};
