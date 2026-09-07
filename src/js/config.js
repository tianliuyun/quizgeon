// 游戏配置 — 所有可调参数集中在这里
const CONFIG = {
  // 玩家
  player: {
    baseHp: 100,
    startGold: 0,
    roomsPerFloor: 10,
    shopRoomIndex: 4,  // 第5个房间是商店（0-indexed）
    bossRoomIndex: 9   // 第10个房间是Boss
  },

  // 难度系数
  difficulty: {
    easy: { hpMult: 1.2, goldMult: 0.8, wrongWeightMult: 0.7, label: '简单' },
    normal: { hpMult: 1.0, goldMult: 1.0, wrongWeightMult: 1.0, label: '普通' },
    hard: { hpMult: 0.8, goldMult: 1.2, wrongWeightMult: 1.5, label: '困难' }
  },

  // 伤害/金币计算
  combat: {
    // 各难度基础伤害（答错受到的伤害）
    damage: { easy: 10, medium: 18, hard: 28 },
    // 各难度基础金币奖励
    gold: { easy: 6, medium: 12, hard: 20 },
    // 浮动范围（±百分比）
    variance: 0.2,
    // Boss 阶段1伤害
    bossPhase1Damage: 15,
    // Boss 阶段2失败伤害
    bossPhase2Damage: 30,
    // Boss 击败金币奖励基数
    bossGoldBase: 50,
    BossGoldVariance: 30
  },

  // 商店
  shop: {
    itemsPerShop: [3, 4],  // 商品数量范围
    items: {
      potion: { price: 20, heal: 30 },
      bigPotion: { price: 40, heal: 70 },
      skip: { price: 25 },
      fiftyFifty: { price: 15 }
    }
  },

  // 永久升级
  upgrades: {
    maxHp: { maxLevel: 3, cost: 20, perLevel: 10, desc: '最大HP +10', label: '生命上限' },
    startGold: { maxLevel: 2, cost: 15, perLevel: 10, desc: '起始金币 +10', label: '起始金币' },
    wrongReduce: { maxLevel: 2, cost: 30, perLevel: 0.15, desc: '错题复现率 -15%', label: '错题抗性' }
  },

  // 存档
  save: {
    key: 'quizgeon_save_v1',
    modeKey: 'quizgeon_mode',
    soundKey: 'quizgeon_sound',
    difficultyKey: 'quizgeon_difficulty'
  },

  // 开放题判分
  openQuestion: {
    defaultMinKeywords: 3
  },

  // 题目类型
  questionTypes: ['single', 'multiple', 'boolean', 'open'],

  // 难度等级
  difficultyLevels: ['easy', 'medium', 'hard']
};
