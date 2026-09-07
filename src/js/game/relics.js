// 遗物系统 — 每局内的永久增益
const Relics = {
  // 所有遗物定义
  all: {
    ironHeart: {
      id: 'ironHeart',
      name: '钢铁之心',
      emoji: '❤️',
      rarity: 'common',
      desc: '最大 HP +20',
      effect: { type: 'maxHp', value: 20 }
    },
    goldenTouch: {
      id: 'goldenTouch',
      name: '点金术',
      emoji: '✨',
      rarity: 'common',
      desc: '金币奖励 +50%',
      effect: { type: 'goldMult', value: 1.5 }
    },
    thickSkin: {
      id: 'thickSkin',
      name: '厚皮术',
      emoji: '🛡️',
      rarity: 'common',
      desc: '受到伤害 -25%',
      effect: { type: 'damageReduce', value: 0.25 }
    },
    luckyCharm: {
      id: 'luckyCharm',
      name: '幸运符',
      emoji: '🍀',
      rarity: 'uncommon',
      desc: '错题出现概率 -40%',
      effect: { type: 'wrongReduce', value: 0.4 }
    },
    vampireFangs: {
      id: 'vampireFangs',
      name: '吸血獠牙',
      emoji: '🧛',
      rarity: 'uncommon',
      desc: '答对回复 5 HP',
      effect: { type: 'lifesteal', value: 5 }
    },
    scholarsRobe: {
      id: 'scholarsRobe',
      name: '学者长袍',
      emoji: '📚',
      rarity: 'uncommon',
      desc: '学习模式额外奖励（金币+30%）',
      effect: { type: 'learningBonus', value: 1.3 }
    },
    phoenixFeather: {
      id: 'phoenixFeather',
      name: '凤凰羽毛',
      emoji: '🔥',
      rarity: 'rare',
      desc: 'HP 归零时复活一次，回复 50% HP',
      effect: { type: 'revive', value: 0.5 }
    },
    wisdomOrb: {
      id: 'wisdomOrb',
      name: '智慧宝珠',
      emoji: '🔮',
      rarity: 'rare',
      desc: 'Boss 战开放题关键词要求 -1',
      effect: { type: 'bossEasier', value: 1 }
    }
  },

  // 稀有度颜色
  rarityColors: {
    common: '#9ca3af',
    uncommon: '#10b981',
    rare: '#f59e0b'
  },

  // 按稀有度权重随机获取一个遗物
  getRandomRelic(excludeIds = []) {
    const relics = Object.values(this.all).filter(r => !excludeIds.includes(r.id));
    if (relics.length === 0) return null;

    const weights = relics.map(r => {
      switch (r.rarity) {
        case 'common': return 10;
        case 'uncommon': return 5;
        case 'rare': return 2;
        default: return 1;
      }
    });

    return Utils.weightedPick(relics, weights);
  },

  // 应用遗物效果到玩家
  applyRelic(player, relic) {
    const eff = relic.effect;
    switch (eff.type) {
      case 'maxHp':
        player.maxHp += eff.value;
        player.hp += eff.value;  // 同时回血
        break;
      // 其他效果在战斗/金币计算时查 player.relics
    }
    if (!player.relics) player.relics = [];
    player.relics.push(relic);
    return true;
  },

  // 计算金币乘数
  getGoldMultiplier(player) {
    let mult = 1;
    (player.relics || []).forEach(r => {
      if (r.effect.type === 'goldMult') mult *= r.effect.value;
    });
    return mult;
  },

  // 计算伤害减免
  getDamageMultiplier(player) {
    let mult = 1;
    (player.relics || []).forEach(r => {
      if (r.effect.type === 'damageReduce') mult *= (1 - r.effect.value);
    });
    return mult;
  },

  // 检查是否有某种遗物
  hasRelic(player, relicId) {
    return (player.relics || []).some(r => r.id === relicId);
  },

  // 检查是否可以复活
  canRevive(player) {
    return this.hasRelic(player, 'phoenixFeather') && !player._revived;
  },

  // 触发复活
  doRevive(player) {
    const relic = (player.relics || []).find(r => r.id === 'phoenixFeather');
    if (!relic || player._revived) return false;
    player._revived = true;
    player.hp = Math.floor(player.maxHp * relic.effect.value);
    return true;
  },

  // 检查 Boss 是否降难度
  getBossKeywordReduction(player) {
    let reduction = 0;
    (player.relics || []).forEach(r => {
      if (r.effect.type === 'bossEasier') reduction += r.effect.value;
    });
    return reduction;
  }
};
