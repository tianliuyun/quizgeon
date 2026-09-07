// 商店系统
const Shop = {
  // 所有道具定义
  getItems() {
    return {
      potion: {
        id: 'potion',
        name: '小血瓶',
        emoji: '🧪',
        price: CONFIG.shop.items.potion.price,
        desc: `回复 ${CONFIG.shop.items.potion.heal} HP`,
        type: 'consumable',  // consumable / use-in-battle
        use(player) {
          Player.heal(player, CONFIG.shop.items.potion.heal);
          return `回复了 ${CONFIG.shop.items.potion.heal} HP`;
        }
      },
      bigPotion: {
        id: 'bigPotion',
        name: '大血瓶',
        emoji: '🍷',
        price: CONFIG.shop.items.bigPotion.price,
        desc: `回复 ${CONFIG.shop.items.bigPotion.heal} HP`,
        type: 'consumable',
        use(player) {
          Player.heal(player, CONFIG.shop.items.bigPotion.heal);
          return `回复了 ${CONFIG.shop.items.bigPotion.heal} HP`;
        }
      },
      skip: {
        id: 'skip',
        name: '跳过符',
        emoji: '⏭️',
        price: CONFIG.shop.items.skip.price,
        desc: '跳过当前题，不算答对也不算错',
        type: 'battle',  // 战斗中使用
        use(player) { return { type: 'skip' }; }
      },
      fiftyFifty: {
        id: 'fiftyFifty',
        name: '50/50 排除',
        emoji: '🎯',
        price: CONFIG.shop.items.fiftyFifty.price,
        desc: '排除两个错误选项（单选题）',
        type: 'battle',
        use(player) { return { type: 'fiftyFifty' }; }
      }
    };
  },

  // 生成商店物品（每次随机 3~4 个）
  generateShopItems() {
    const items = Object.values(this.getItems());
    const shuffled = Utils.shuffle(items);
    const count = Utils.randInt(CONFIG.shop.itemsPerShop[0], CONFIG.shop.itemsPerShop[1]);
    return shuffled.slice(0, count);
  },

  // 买东西
  buy(player, itemId) {
    const items = this.getItems();
    const item = items[itemId];
    if (!item) return { success: false, msg: '物品不存在' };
    if (player.gold < item.price) return { success: false, msg: '金币不足' };

    player.gold -= item.price;

    if (item.type === 'battle') {
      // 战斗用道具进入背包
      if (!player.items[itemId]) player.items[itemId] = 0;
      player.items[itemId]++;
      return { success: true, msg: `获得 ${item.name} ×1` };
    } else {
      // 消耗品直接使用
      const msg = item.use(player);
      return { success: true, msg };
    }
  },

  // 使用战斗道具
  useBattleItem(player, itemId, combatCtx) {
    const items = this.getItems();
    const item = items[itemId];
    if (!item || item.type !== 'battle') return false;
    if (!player.items[itemId] || player.items[itemId] <= 0) return false;

    player.items[itemId]--;
    return item.use(player);
  },

  // 获取道具显示信息
  getItemDisplay(itemId) {
    const items = this.getItems();
    return items[itemId] || null;
  }
};
