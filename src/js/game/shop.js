// 商店系统
const Shop = {
  items: {
    potion: {
      id: 'potion',
      name: '小血瓶',
      emoji: '🧪',
      price: 20,
      desc: '回复 30 HP',
      use(player) {
        Player.heal(player, 30);
        return '回复了 30 HP';
      }
    },
    bigPotion: {
      id: 'bigPotion',
      name: '大血瓶',
      emoji: '🍷',
      price: 40,
      desc: '回复 70 HP',
      use(player) {
        Player.heal(player, 70);
        return '回复了 70 HP';
      }
    },
    skip: {
      id: 'skip',
      name: '跳过符',
      emoji: '⏭️',
      price: 25,
      desc: '跳过当前题，不算答对也不算错',
      use(player) {
        return '跳过当前题目';
      },
      consumable: true  // 用在题目上，不是直接用
    },
    fiftyFifty: {
      id: 'fiftyFifty',
      name: '50/50 排除',
      emoji: '🎯',
      price: 15,
      desc: '排除两个错误选项（单选题）',
      use(player) {
        return '排除两个错误选项';
      },
      consumable: true
    }
  },

  // 生成商店物品（每次随机3~4个）
  generateShopItems() {
    const itemList = Object.values(this.items);
    // 打乱
    const shuffled = [...itemList].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3 + Math.floor(Math.random() * 2));
  },

  // 买东西
  buy(player, itemId) {
    const item = this.items[itemId];
    if (!item) return { success: false, msg: '物品不存在' };
    if (player.gold < item.price) return { success: false, msg: '金币不足' };

    player.gold -= item.price;

    // 消耗品进入背包，回复类直接用
    if (item.consumable) {
      if (!player.items[itemId]) player.items[itemId] = 0;
      player.items[itemId]++;
      return { success: true, msg: `获得 ${item.name} ×1` };
    } else {
      const msg = item.use(player);
      return { success: true, msg };
    }
  },

  // 使用道具（战斗中用）
  useItem(player, itemId, combatCtx) {
    const item = this.items[itemId];
    if (!item || !item.consumable) return false;
    if (!player.items[itemId] || player.items[itemId] <= 0) return false;

    player.items[itemId]--;

    if (itemId === 'skip') {
      return { type: 'skip' };
    } else if (itemId === 'fiftyFifty') {
      // 排除两个错误选项
      const question = combatCtx.question;
      const options = question.options;
      const wrongOptions = [];
      options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        if (letter !== question.answer &&
            !(Array.isArray(question.answer) && question.answer.includes(letter))) {
          wrongOptions.push(idx);
        }
      });
      // 随机排除两个
      const toRemove = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
      return { type: 'fiftyFifty', removeIndices: toRemove };
    }
    return false;
  }
};
