// 地牢生成系统
const Dungeon = {
  // 生成一层地牢
  generateFloor(floorNum, wrongPool = {}, difficulty = 'normal') {
    return this._generateFloor(floorNum, wrongPool, difficulty, Math.random);
  },

  // 种子版地牢（用于每日挑战）
  generateFloorSeeded(floorNum, wrongPool = {}, difficulty = 'normal', seed = 0) {
    let s = seed;
    const rand = function() {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return this._generateFloor(floorNum, wrongPool, difficulty, rand);
  },

  _generateFloor(floorNum, wrongPool, difficulty, randFn) {
    const floorQuestions = this.getFloorQuestions(floorNum);
    if (floorQuestions.length === 0) {
      floorQuestions = this.getAllQuestions();
    }

    const wrongReduce = SaveSystem.getUpgradeLevel('wrongReduce');
    const rooms = [];
    const usedIds = new Set();
    const bossQuestions = floorQuestions.filter(q => q.type === 'open');

    for (let i = 0; i < CONFIG.player.roomsPerFloor; i++) {
      // 商店房
      if (i === CONFIG.player.shopRoomIndex) {
        rooms.push({
          type: 'shop',
          question: null,
          monster: { emoji: '🏪', name: '神秘商人', type: '商店' },
          shopItems: Shop.generateShopItems()
        });
        continue;
      }

      // 宝箱房（第 7 间，60% 概率）
      if (i === 6 && randFn() < 0.6 && typeof Relics !== 'undefined') {
        const ownedIds = rooms.filter(r => r.type === 'relic').map(r => r.relic.id);
        const relic = Relics.getRandomRelic(ownedIds);
        if (relic) {
          rooms.push({
            type: 'relic',
            question: null,
            monster: { emoji: '📦', name: '神秘宝箱', type: '宝箱' },
            relic: relic
          });
          continue;
        }
      }

      // Boss 房（最后一间）
      if (i === CONFIG.player.bossRoomIndex && bossQuestions.length > 0) {
        const boss = bossQuestions[Math.floor(randFn() * bossQuestions.length)];
        usedIds.add(boss.id);
        rooms.push({
          type: 'boss',
          question: boss,
          monster: this.generateBossMonster(floorNum)
        });
        continue;
      }

      // 普通怪物房
      const q = this.pickQuestion(floorQuestions, wrongPool, usedIds, wrongReduce, randFn);
      if (!q) {
        // 没题了，找个用过的重复
        const fallback = floorQuestions.filter(qq => qq.type !== 'open');
        if (fallback.length === 0) continue;
        const q2 = fallback[Math.floor(randFn() * fallback.length)];
        rooms.push({
          type: 'normal',
          question: q2,
          monster: this.generateMonster(q2, i)
        });
      } else {
        usedIds.add(q.id);
        rooms.push({
          type: 'normal',
          question: q,
          monster: this.generateMonster(q, i)
        });
      }
    }

    return rooms;
  },

  // 加权选题：错题权重更高
  pickQuestion(pool, wrongPool, usedIds, wrongReduceLevel, randFn) {
    const candidates = pool.filter(q =>
      q.type !== 'open' && !usedIds.has(q.id)
    );
    if (candidates.length === 0) return null;

    const weights = candidates.map(q => {
      const wrongCount = wrongPool[q.id] || 0;
      const baseWeight = 1;
      const wrongWeight = wrongCount * CONFIG.combat.wrongWeightMult * (1 - wrongReduceLevel * 0.15);
      return baseWeight + Math.max(0, wrongWeight);
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = randFn() * totalWeight;

    for (let i = 0; i < candidates.length; i++) {
      random -= weights[i];
      if (random <= 0) return candidates[i];
    }
    return candidates[candidates.length - 1];
  },

  // 生成普通怪物
  generateMonster(question, roomIndex) {
    const difficulty = question.difficulty || 'easy';
    const types = {
      easy: [
        { emoji: '👾', name: '小怪' },
        { emoji: '🦇', name: '蝙蝠' },
        { emoji: '🐀', name: '巨鼠' },
        { emoji: '🕷️', name: '蜘蛛' }
      ],
      medium: [
        { emoji: '👹', name: '恶魔兵' },
        { emoji: '🧟', name: '尸巫' },
        { emoji: '🐉', name: '幼龙' },
        { emoji: '👻', name: '怨灵' }
      ],
      hard: [
        { emoji: '🧙', name: '黑法师' },
        { emoji: '💀', name: '骷髅王' },
        { emoji: '🐙', name: '维度章鱼' }
      ]
    };
    const pool = types[difficulty] || types.easy;
    const base = pool[Math.floor(Math.random() * pool.length)];
    return {
      emoji: base.emoji,
      name: `${base.name} Lv.${roomIndex + 1}`,
      type: difficulty
    };
  },

  // 生成 Boss
  generateBossMonster(floorNum) {
    const bosses = [
      { emoji: '🐉', name: '遗忘之龙', type: 'BOSS' },
      { emoji: '👹', name: '梯度魔王', type: 'BOSS' },
      { emoji: '🧙', name: '过拟合法师', type: 'BOSS' },
      { emoji: '🐙', name: '维度章鱼', type: 'BOSS' },
      { emoji: '💀', name: '梯度死亡', type: 'BOSS' }
    ];
    const boss = bosses[(floorNum - 1) % bosses.length];
    return { ...boss, floor: floorNum };
  },

  // 获取某层的题目
  getFloorQuestions(floorNum) {
    const all = this.getAllQuestions();
    return all.filter(q => q.floor === floorNum);
  },

  // 获取全部题目
  getAllQuestions() {
    if (!window.QUESTION_BANK || !Array.isArray(window.QUESTION_BANK)) {
      console.warn('题库未加载');
      return [];
    }
    return window.QUESTION_BANK.filter(q => Utils.validateQuestion(q).valid);
  },

  // 获取总层数
  getTotalFloors() {
    const all = this.getAllQuestions();
    const floors = new Set(all.map(q => q.floor));
    return floors.size;
  },

  // Fisher-Yates 洗牌
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // 生成商店物品
  generateShopItems() {
    return Shop.generateShopItems();
  }
};
