// 地牢生成系统
const Dungeon = {
  // 生成一层地牢
  generateFloor(floorNum, wrongPool = {}) {
    const floorQuestions = this.getFloorQuestions(floorNum);
    if (floorQuestions.length === 0) {
      floorQuestions = this.getAllQuestions();
    }

    const save = SaveSystem.load();
    const wrongReduceLvl = save.permanent.upgrades.wrongReduce || 0;
    const wrongReduce = wrongReduceLvl * (CONFIG.upgrades.wrongReduce.perLevel || 0.15);

    const rooms = [];
    const usedIds = new Set();
    const bossQuestions = floorQuestions.filter(q => q.type === 'open');
    const normalQs = floorQuestions.filter(q => q.type !== 'open');

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

      // 宝箱房（第 2 间房之后随机出现，每层 1 个）
      if (i === 6 && Math.random() < 0.6) {
        const relic = Relics ? Relics.getRandomRelic(
          (rooms.filter(r => r.type === 'relic').map(r => r.relic.id))
        ) : null;
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

      // Boss 房
      if (i === CONFIG.player.bossRoomIndex && bossQuestions.length > 0) {
        const bossQ = bossQuestions[Math.floor(Math.random() * bossQuestions.length)];
        usedIds.add(bossQ.id);
        rooms.push({
          type: 'boss',
          question: bossQ,
          monster: this.generateBossMonster(floorNum)
        });
        continue;
      }

      // 普通战斗房
      const q = this.pickQuestion(normalQs, wrongPool, usedIds, wrongReduce);
      if (q) {
        usedIds.add(q.id);
        rooms.push({
          type: 'normal',
          question: q,
          monster: this.generateMonster(q, i)
        });
      }
    }

    // 题不够时，重复用题（打乱顺序）
    if (rooms.length < CONFIG.player.roomsPerFloor) {
      const remaining = normalQs.filter(q => !usedIds.has(q.id));
      const pool = Utils.shuffle([...remaining, ...normalQs]);
      let idx = 0;
      while (rooms.length < CONFIG.player.roomsPerFloor && idx < pool.length) {
        const q = pool[idx++];
        const roomIdx = rooms.length;
        if (roomIdx === CONFIG.player.shopRoomIndex ||
            roomIdx === CONFIG.player.bossRoomIndex) continue;
        rooms.push({
          type: 'normal',
          question: q,
          monster: this.generateMonster(q, roomIdx)
        });
      }
    }

    return rooms;
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

  // 加权选题：错题权重更高
  pickQuestion(pool, wrongPool, usedIds, wrongReduce = 0) {
    const available = pool.filter(q => !usedIds.has(q.id));
    if (available.length === 0) return null;

    const weights = available.map(q => {
      let w = 1;
      if (wrongPool[q.id]) {
        w = 3 * (1 - wrongReduce);
      }
      return w;
    });

    return Utils.weightedPick(available, weights);
  },

  // 生成普通怪物
  generateMonster(question, roomIndex) {
    const difficulty = question.difficulty || 'easy';
    const types = {
      easy: [
        { emoji: '👾', name: '数据小怪', type: '普通' },
        { emoji: '🦠', name: '病毒史莱姆', type: '普通' },
        { emoji: '🐛', name: 'Bug 幼虫', type: '普通' },
        { emoji: '🪲', name: '甲虫', type: '普通' }
      ],
      medium: [
        { emoji: '👻', name: '梯度幽灵', type: '精英' },
        { emoji: '🐉', name: '过拟合龙', type: '精英' },
        { emoji: '🧟', name: '梯度消失僵尸', type: '精英' },
        { emoji: '🦇', name: '反向传播蝠', type: '精英' }
      ],
      hard: [
        { emoji: '🐙', name: '维度章鱼', type: '精英' },
        { emoji: '💀', name: '局部最优骷髅', type: '精英' },
        { emoji: '🔥', name: '梯度爆炸魔', type: '精英' }
      ]
    };

    const list = types[difficulty] || types.easy;
    return { ...list[Math.floor(Math.random() * list.length)] };
  },

  // 生成 Boss 怪物
  generateBossMonster(floorNum) {
    const bosses = [
      { emoji: '🐙', name: '维度章鱼', type: 'BOSS', hp: 2 },
      { emoji: '💀', name: '局部最优骷髅王', type: 'BOSS', hp: 2 },
      { emoji: '🐲', name: '过拟合巨龙', type: 'BOSS', hp: 2 },
      { emoji: '🦑', name: '梯度巨妖', type: 'BOSS', hp: 2 },
      { emoji: '👹', name: '损失函数魔王', type: 'BOSS', hp: 2 },
      { emoji: '🧙', name: '黑暗调参师', type: 'BOSS', hp: 2 }
    ];
    const idx = (floorNum - 1) % bosses.length;
    return { ...bosses[idx] };
  },

  // 生成商店物品
  generateShopItems() {
    if (typeof Shop === 'undefined' || !Shop.generateShopItems) return [];
    return Shop.generateShopItems();
  },

  // 获取总层数
  getTotalFloors() {
    const all = window.QUESTION_BANK || [];
    const floors = new Set(all.map(q => q.floor));
    return Math.max(...floors, 1);
  }
};
