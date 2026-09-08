// Player 模块测试
// 运行: node tests/run.js player

// 先加载依赖模块
loadJS('src/js/config.js');
loadJS('src/js/utils.js');
loadJS('src/js/data/saveSystem.js');
loadJS('src/js/game/player.js');
loadJS('src/js/game/classes.js');


// ========== 基础创建 ==========

test('Player.create: 默认属性正确', () => {
  const p = Player.create(1);
  assert.equal(p.hp, p.maxHp);
  assert.equal(p.floor, 1);
  assert.equal(p.room, 0);
  assert.equal(p.gold, CONFIG.player.startGold);
  assert.ok(Array.isArray(p.relics));
  assert.equal(typeof p.items, 'object');
  assert.ok(p.items.potion >= 0);
  assert.equal(p.correctThisRun, 0);
  assert.equal(p.wrongThisRun, 0);
  assert.equal(p.streak, 0);
  assert.equal(p.bestStreak, 0);
});

test('Player.create: 指定起始楼层', () => {
  const p = Player.create(3);
  assert.equal(p.floor, 3);
});

test('Player.restore: 从存档恢复', () => {
  const saved = {
    maxHp: 80,
    hp: 50,
    gold: 100,
    floor: 2,
    room: 5,
    relics: ['test-relic'],
  };
  const p = Player.restore(saved);
  assert.equal(p.hp, 50);
  assert.equal(p.gold, 100);
  assert.equal(p.floor, 2);
  assert.equal(p.room, 5);
  assert.deepEqual(p.relics, ['test-relic']);
  // items 应该有默认值
  assert.equal(typeof p.items, 'object');
  assert.ok('potion' in p.items);
});

test('Player.restore: items 缺字段时有默认值', () => {
  const p = Player.restore({ floor: 1, items: { potion: 3 } });
  assert.equal(p.items.potion, 3);
  assert.equal(p.items.skip, 0);
  assert.equal(p.items.fiftyFifty, 0);
});


// ========== 生命值 ==========

test('Player.takeDamage: 正常掉血', () => {
  const p = Player.create(1);
  const hpBefore = p.hp;
  const died = Player.takeDamage(p, 20);
  assert.equal(p.hp, hpBefore - 20);
  assert.equal(died, false);
});

test('Player.takeDamage: 不会掉成负数', () => {
  const p = Player.create(1);
  const died = Player.takeDamage(p, 9999);
  assert.equal(p.hp, 0);
  assert.equal(died, true);
});

test('Player.takeDamage: 0 伤害不变', () => {
  const p = Player.create(1);
  const hpBefore = p.hp;
  Player.takeDamage(p, 0);
  assert.equal(p.hp, hpBefore);
});

test('Player.takeDamage: 重置连胜', () => {
  const p = Player.create(1);
  p.streak = 5;
  Player.takeDamage(p, 10);
  assert.equal(p.streak, 0);
});

test('Player.heal: 正常回血', () => {
  const p = Player.create(1);
  Player.takeDamage(p, 30);
  const hpBefore = p.hp;
  const healed = Player.heal(p, 10);
  assert.equal(p.hp, hpBefore + 10);
  assert.equal(healed, 10);
});

test('Player.heal: 不会超过最大生命值', () => {
  const p = Player.create(1);
  const healed = Player.heal(p, 9999);
  assert.equal(p.hp, p.maxHp);
  assert.ok(healed >= 0);
});

test('Player.isAlive: 满生命时存活', () => {
  const p = Player.create(1);
  assert.equal(Player.isAlive(p), true);
});

test('Player.isAlive: 生命值为 0 时死亡', () => {
  const p = Player.create(1);
  Player.takeDamage(p, p.maxHp);
  assert.equal(Player.isAlive(p), false);
});

test('Player.isAlive: 1 滴血也存活', () => {
  const p = Player.create(1);
  Player.takeDamage(p, p.maxHp - 1);
  assert.equal(Player.isAlive(p), true);
});


// ========== 金币 ==========

test('Player.addGold: 加金币', () => {
  const p = Player.create(1);
  const before = p.gold;
  Player.addGold(p, 50);
  assert.equal(p.gold, before + 50);
});

test('Player.addGold: 加 0 金币不变', () => {
  const p = Player.create(1);
  const before = p.gold;
  Player.addGold(p, 0);
  assert.equal(p.gold, before);
});

test('Player.spendGold: 金币足够时成功', () => {
  const p = Player.create(1);
  p.gold = 20;
  const result = Player.spendGold(p, 5);
  assert.equal(result, true);
  assert.equal(p.gold, 15);
});

test('Player.spendGold: 金币不足时失败且金额不变', () => {
  const p = Player.create(1);
  p.gold = 5;
  const result = Player.spendGold(p, 10);
  assert.equal(result, false);
  assert.equal(p.gold, 5);
});

test('Player.spendGold: 刚好花完', () => {
  const p = Player.create(1);
  p.gold = 10;
  const result = Player.spendGold(p, 10);
  assert.equal(result, true);
  assert.equal(p.gold, 0);
});


// ========== 答题统计 ==========

test('Player.onCorrect: 增加正确数和连胜', () => {
  const p = Player.create(1);
  Player.onCorrect(p);
  assert.equal(p.correctThisRun, 1);
  assert.equal(p.streak, 1);
  assert.equal(p.bestStreak, 1);
});

test('Player.onCorrect: 连胜超过最高时更新 bestStreak', () => {
  const p = Player.create(1);
  Player.onCorrect(p);
  Player.onCorrect(p);
  Player.onCorrect(p);
  assert.equal(p.streak, 3);
  assert.equal(p.bestStreak, 3);
  // 答错中断连胜
  Player.onWrong(p);
  assert.equal(p.streak, 0);
  assert.equal(p.bestStreak, 3); // bestStreak 保留
});

test('Player.onWrong: 增加错误数，重置连胜', () => {
  const p = Player.create(1);
  p.streak = 5;
  Player.onWrong(p);
  assert.equal(p.wrongThisRun, 1);
  assert.equal(p.streak, 0);
});


// ========== 道具 ==========

test('Player.useItem: 有道具时成功', () => {
  const p = Player.create(1);
  p.items.potion = 3;
  const result = Player.useItem(p, 'potion');
  assert.equal(result, true);
  assert.equal(p.items.potion, 2);
});

test('Player.useItem: 没道具时失败', () => {
  const p = Player.create(1);
  p.items.potion = 0;
  const result = Player.useItem(p, 'potion');
  assert.equal(result, false);
});

test('Player.useItem: 不存在的道具失败', () => {
  const p = Player.create(1);
  const result = Player.useItem(p, 'nonexistent');
  assert.equal(result, false);
});
