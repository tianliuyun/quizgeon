// SaveSystem 模块测试
// 运行: node tests/run.js save

// 先加载依赖模块
loadJS('src/js/config.js');
loadJS('src/js/utils.js');
loadJS('src/js/data/saveSystem.js');


// 每个测试前清空 localStorage
function resetSave() {
  localStorage.clear();
}


// ========== 基础读写 ==========

test('SaveSystem.load: 默认存档结构完整', () => {
  resetSave();
  const save = SaveSystem.load();
  assert.ok(save.permanent);
  assert.equal(save.permanent.totalCorrect, 0);
  assert.equal(save.permanent.totalWrong, 0);
  assert.equal(save.permanent.totalRuns, 0);
  assert.equal(save.permanent.maxFloor, 0);
  assert.equal(save.permanent.soulShards, 0);
  assert.equal(typeof save.permanent.codex, 'object');
  assert.equal(typeof save.permanent.upgrades, 'object');
  assert.equal(save.current, null);
});

test('SaveSystem.save: 保存后能读取', () => {
  resetSave();
  const save = SaveSystem.load();
  save.permanent.totalCorrect = 42;
  save.permanent.soulShards = 100;
  SaveSystem.save(save);

  const loaded = SaveSystem.load();
  assert.equal(loaded.permanent.totalCorrect, 42);
  assert.equal(loaded.permanent.soulShards, 100);
});


// ========== 图鉴 (codex) ==========

test('SaveSystem.updateCodex: 首次见题创建条目', () => {
  resetSave();
  SaveSystem.updateCodex('test-001', true);
  const save = SaveSystem.load();
  assert.ok(save.permanent.codex['test-001']);
  assert.equal(save.permanent.codex['test-001'].rightCount, 1);
  assert.equal(save.permanent.codex['test-001'].wrongCount, 0);
  assert.ok(save.permanent.codex['test-001'].firstSeen > 0);
});

test('SaveSystem.updateCodex: 答对累计 rightCount', () => {
  resetSave();
  SaveSystem.updateCodex('test-001', true);
  SaveSystem.updateCodex('test-001', true);
  SaveSystem.updateCodex('test-001', true);
  const save = SaveSystem.load();
  assert.equal(save.permanent.codex['test-001'].rightCount, 3);
  assert.equal(save.permanent.codex['test-001'].wrongCount, 0);
  assert.equal(save.permanent.totalCorrect, 3);
});

test('SaveSystem.updateCodex: 答错累计 wrongCount', () => {
  resetSave();
  SaveSystem.updateCodex('test-001', false);
  SaveSystem.updateCodex('test-001', false);
  const save = SaveSystem.load();
  assert.equal(save.permanent.codex['test-001'].rightCount, 0);
  assert.equal(save.permanent.codex['test-001'].wrongCount, 2);
  assert.equal(save.permanent.totalWrong, 2);
});

test('SaveSystem.updateCodex: 答对足够次数会掌握', () => {
  resetSave();
  for (let i = 0; i < 6; i++) {
    SaveSystem.updateCodex('test-001', true);
  }
  const save = SaveSystem.load();
  assert.equal(save.permanent.codex['test-001'].mastered, true);
});

test('SaveSystem.updateCodex: 答错会取消掌握', () => {
  resetSave();
  // 先掌握
  for (let i = 0; i < 6; i++) {
    SaveSystem.updateCodex('test-001', true);
  }
  let save = SaveSystem.load();
  assert.equal(save.permanent.codex['test-001'].mastered, true);
  // 答错一次
  SaveSystem.updateCodex('test-001', false);
  save = SaveSystem.load();
  assert.equal(save.permanent.codex['test-001'].mastered, false);
});


// ========== 错题池 ==========

test('SaveSystem.getWrongPool: 没有错题时空对象', () => {
  resetSave();
  const pool = SaveSystem.getWrongPool();
  assert.deepEqual(pool, {});
});

test('SaveSystem.getWrongPool: 有错题时返回加权', () => {
  resetSave();
  SaveSystem.updateCodex('easy-1', true); // 答对的不算
  SaveSystem.updateCodex('hard-1', false);
  SaveSystem.updateCodex('hard-1', false);
  SaveSystem.updateCodex('hard-1', true); // 错 2 对 1 = 权重 1
  const pool = SaveSystem.getWrongPool();
  assert.equal(typeof pool['hard-1'], 'number');
  assert.ok(pool['hard-1'] >= 1);
  assert.equal(pool['easy-1'], undefined);
});


// ========== 升级系统 ==========

test('SaveSystem.buyUpgrade: 碎片不足时失败', () => {
  resetSave();
  const result = SaveSystem.buyUpgrade('maxHp');
  assert.equal(result.success, false);
  assert.ok(result.msg);
});

test('SaveSystem.buyUpgrade: 碎片足够时成功', () => {
  resetSave();
  const save = SaveSystem.load();
  save.permanent.soulShards = 100;
  SaveSystem.save(save);

  const result = SaveSystem.buyUpgrade('maxHp');
  assert.equal(result.success, true);
  assert.equal(result.newLevel, 1);

  const loaded = SaveSystem.load();
  assert.equal(loaded.permanent.upgrades.maxHp, 1);
  assert.equal(loaded.permanent.soulShards, 100 - CONFIG.upgrades.maxHp.cost);
});

test('SaveSystem.buyUpgrade: 满级后无法继续升级', () => {
  resetSave();
  const save = SaveSystem.load();
  save.permanent.soulShards = 9999;
  save.permanent.upgrades.maxHp = CONFIG.upgrades.maxHp.maxLevel;
  SaveSystem.save(save);

  const result = SaveSystem.buyUpgrade('maxHp');
  assert.equal(result.success, false);
  assert.ok(result.msg.includes('满级'));
});

test('SaveSystem.buyUpgrade: 不存在的升级失败', () => {
  resetSave();
  const result = SaveSystem.buyUpgrade('nonexistent');
  assert.equal(result.success, false);
});


// ========== 当前局存档 ==========

test('SaveSystem.saveCurrent / loadCurrent: 存取当前进度', () => {
  resetSave();
  const player = {
    maxHp: 100, hp: 80, gold: 50, floor: 2, room: 3, totalRooms: 10,
    relics: ['r1'], items: { potion: 2 },
    correctThisRun: 5, wrongThisRun: 2
  };
  const dungeon = [{ question: { id: 'q1' } }, { type: 'shop' }];
  const roomIndex = 1;

  SaveSystem.saveCurrent(player, dungeon, roomIndex);
  const loaded = SaveSystem.loadCurrent();
  assert.ok(loaded);
  assert.equal(loaded.player.hp, 80);
  assert.equal(loaded.player.floor, 2);
  assert.equal(loaded.roomIndex, 1);
  assert.equal(loaded.dungeonRoomIds.length, 2);
});

test('SaveSystem.clearCurrent: 清除当前进度', () => {
  resetSave();
  SaveSystem.saveCurrent({ hp: 100, floor: 1, room: 0 }, [], 0);
  assert.ok(SaveSystem.loadCurrent());
  SaveSystem.clearCurrent();
  assert.equal(SaveSystem.loadCurrent(), null);
});


// ========== 统计数据 ==========

test('SaveSystem.incrementRuns: 增加游戏次数', () => {
  resetSave();
  SaveSystem.incrementRuns();
  SaveSystem.incrementRuns();
  const save = SaveSystem.load();
  assert.equal(save.permanent.totalRuns, 2);
});

test('SaveSystem.updateMaxFloor: 创新高时更新', () => {
  resetSave();
  assert.equal(SaveSystem.updateMaxFloor(3), true);
  let save = SaveSystem.load();
  assert.equal(save.permanent.maxFloor, 3);
  // 更低的不更新
  assert.equal(SaveSystem.updateMaxFloor(2), false);
  save = SaveSystem.load();
  assert.equal(save.permanent.maxFloor, 3);
  // 更高的更新
  assert.equal(SaveSystem.updateMaxFloor(5), true);
  save = SaveSystem.load();
  assert.equal(save.permanent.maxFloor, 5);
});

test('SaveSystem.addSoulShards: 增加灵魂碎片', () => {
  resetSave();
  SaveSystem.addSoulShards(10);
  SaveSystem.addSoulShards(5);
  const save = SaveSystem.load();
  assert.equal(save.permanent.soulShards, 15);
});
