// 地牢生成 + 出题系统
const Dungeon = {
  // 生成一层地牢的题目序列
  generateFloor(floorNum) {
    const floorQuestions = window.QUESTION_BANK.filter(q => q.floor === floorNum);
    if (floorQuestions.length === 0) {
      // 没有对应层的题，用全部题
      floorQuestions = [...window.QUESTION_BANK];
    }

    const wrongPool = SaveSystem.getWrongPool();
    const save = SaveSystem.load();
    const wrongReduce = save.permanent.upgrades.wrongReduce * 0.15;

    // 生成 10 个房间的题目
    const rooms = [];
    const usedIds = new Set();

    // 找 Boss 题（type=open 的题）
    const bossQuestions = floorQuestions.filter(q => q.type === 'open');

    // 第5个房间 = 商店（每层中间回血补给）
    for (let i = 0; i < 10; i++) {
      if (i === 4) {
        // 商店房
        rooms.push({
          type: 'shop',
          question: null,
          monster: { emoji: '🏪', name: '神秘商人', type: '商店' },
          shopItems: Dungeon.generateShopItems()
        });
        continue;
      }

      if (i === 9 && bossQuestions.length > 0) {
        // Boss 房：用开放题
        const bossQ = bossQuestions[Math.floor(Math.random() * bossQuestions.length)];
        usedIds.add(bossQ.id);
        rooms.push({
          type: 'boss',
          question: bossQ,
          monster: {
            emoji: floorNum === 1 ? '🐙' : '💀',
            name: floorNum === 1 ? '维度章鱼' : '局部最优骷髅王',
            type: 'BOSS',
            hp: 2  // 两阶段
          }
        });
        continue;
      }

      // 普通题：过滤掉开放题
      const normalQs = floorQuestions.filter(q => q.type !== 'open');
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

    // 如果题不够，打乱重复用
    if (rooms.length < 10) {
      const remaining = floorQuestions.filter(q => !usedIds.has(q.id));
      const shuffled = this.shuffle([...remaining, ...floorQuestions]);
      while (rooms.length < 10 && shuffled.length > 0) {
        const q = shuffled.pop();
        rooms.push({
          type: rooms.length === 9 ? 'boss' : 'normal',
          question: q,
          monster: this.generateMonster(q, rooms.length)
        });
      }
    }

    return rooms;
  },

  // 加权选题：错题权重更高
  pickQuestion(pool, wrongPool, usedIds, wrongReduce) {
    const available = pool.filter(q => !usedIds.has(q.id));
    if (available.length === 0) return null;

    // 计算每题权重
    const weights = available.map(q => {
      let w = 1;
      if (wrongPool[q.id]) {
        w = 3 * (1 - wrongReduce);  // 错题权重 ×3（永久升级可降低）
      }
      return w;
    });

    // 加权随机
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * totalWeight;
    for (let i = 0; i < available.length; i++) {
      rand -= weights[i];
      if (rand <= 0) return available[i];
    }
    return available[available.length - 1];
  },

  // 生成怪物（纯视觉 + 难度）
  generateMonster(question, roomIndex) {
    const difficulty = question.difficulty;
    const types = {
      easy: [
        { emoji: '👾', name: '数据小怪', type: '普通' },
        { emoji: '🦠', name: '病毒史莱姆', type: '普通' },
        { emoji: '🐛', name: 'Bug 幼虫', type: '普通' }
      ],
      medium: [
        { emoji: '👻', name: '梯度幽灵', type: '精英' },
        { emoji: '🐉', name: '过拟合龙', type: '精英' },
        { emoji: '🧟', name: '梯度消失僵尸', type: '精英' }
      ],
      hard: [
        { emoji: '🐙', name: '维度章鱼', type: 'Boss' },
        { emoji: '💀', name: '局部最优骷髅', type: 'Boss' },
        { emoji: '🔥', name: '梯度爆炸魔', type: 'Boss' }
      ]
    };

    const list = types[difficulty] || types.easy;
    return list[Math.floor(Math.random() * list.length)];
  },

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // 生成商店物品
  generateShopItems() {
    if (typeof Shop === 'undefined') return [];
    return Shop.generateShopItems();
  }
};
