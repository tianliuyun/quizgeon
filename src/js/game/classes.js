// 职业/流派系统
const Classes = {
  all: {
    warrior: {
      id: 'warrior',
      name: '战士',
      emoji: '⚔️',
      desc: '高血量，伤害减免，适合新手',
      startItems: { potion: 2, skip: 0, fiftyFifty: 0 },
      bonuses: {
        maxHp: 1.3,        // +30% 最大HP
        damageReduce: 0.2,  // -20% 受到伤害
        goldMult: 0.8       // 金币 -20%
      },
      flavor: '我来，我见，我征服。'
    },
    mage: {
      id: 'mage',
      name: '法师',
      emoji: '🔮',
      desc: '高金币，Boss 更容易，适合老手',
      startItems: { potion: 1, skip: 1, fiftyFifty: 1 },
      bonuses: {
        maxHp: 0.85,       // -15% HP
        goldMult: 1.4,     // +40% 金币
        bossEasier: 1,     // Boss 关键词 -1
        startRelic: 'wisdomOrb'
      },
      flavor: '知识就是力量。'
    },
    rogue: {
      id: 'rogue',
      name: '盗贼',
      emoji: '🗡️',
      desc: '高风险高回报，连击有奖励',
      startItems: { potion: 1, skip: 2, fiftyFifty: 0 },
      bonuses: {
        maxHp: 0.9,        // -10% HP
        goldMult: 1.0,
        streakBonus: 0.1,  // 每连胜 +10% 金币
        startRelic: 'luckyCharm'
      },
      flavor: '运气是实力的一部分。'
    },
    scholar: {
      id: 'scholar',
      name: '学者',
      emoji: '📚',
      desc: '学习模式专属，学得快记得牢',
      startItems: { potion: 2, skip: 1, fiftyFifty: 1 },
      bonuses: {
        maxHp: 1.0,
        goldMult: 1.2,
        learningBonus: 1.5, // 学习模式金币 +50%
        startRelic: 'scholarsRobe'
      },
      flavor: '学而时习之，不亦说乎。'
    }
  },

  // 获取职业
  get(classId) {
    return this.all[classId] || this.all.warrior;
  },

  // 应用职业加成到玩家
  apply(player, classId) {
    const cls = this.get(classId);
    player.classId = classId;
    player.className = cls.name;
    player.classEmoji = cls.emoji;

    // 应用 HP 加成
    player.maxHp = Math.floor(player.maxHp * (cls.bonuses.maxHp || 1));
    player.hp = player.maxHp;

    // 初始道具
    if (cls.startItems) {
      Object.assign(player.items, cls.startItems);
    }

    // 初始遗物
    if (cls.bonuses.startRelic && typeof Relics !== 'undefined') {
      const relic = Relics.all[cls.bonuses.startRelic];
      if (relic) {
        Relics.applyRelic(player, relic);
      }
    }

    return player;
  },

  // 计算职业加成（战斗中调用）
  getBonus(player, bonusType) {
    if (!player.classId) return 0;
    const cls = this.get(player.classId);
    return cls.bonuses[bonusType] || 0;
  }
};
