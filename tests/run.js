// 轻量测试运行器（零依赖，Node 直接跑）
// 用法: node tests/run.js [pattern]

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const projectRoot = path.join(__dirname, '..');
const testsDir = __dirname;

// 全局 mock 环境
function setupGlobals() {
  global.CONFIG = {
    player: {
      maxHp: 100,
      startGold: 30,
      baseDamage: 15,
      correctGold: 10,
      wrongDamage: 20,
      floorHpBonus: 10,
      bossDamage: 35,
    },
    dungeon: {
      roomsPerFloor: 10,
      bossEvery: 10,
      shopEvery: 5,
      wrongWeightMultiplier: 3,
    },
    save: { key: 'quizgeon_test' },
    upgrades: {
      maxHp: { label: '生命上限', desc: '+20 最大生命', cost: 20, maxLevel: 3, bonus: 20 },
      startGold: { label: '起始金币', desc: '+15 起始金币', cost: 15, maxLevel: 2, bonus: 15 },
      wrongReduce: { label: '错题抗性', desc: '错题伤害 -20%', cost: 30, maxLevel: 2, bonus: 0.2 },
    },
    achievements: {},
  };

  global.window = global;

  // localStorage mock
  const storage = {};
  global.localStorage = {
    getItem: (k) => (k in storage ? storage[k] : null),
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; },
    clear: () => { for (const k of Object.keys(storage)) delete storage[k]; },
  };

  // DOM mock（最小化）
  global.document = {
    getElementById: () => ({ innerHTML: '', addEventListener: () => {}, classList: { add: () => {}, remove: () => {}, toggle: () => {} }, style: {} }),
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ classList: { add: () => {}, remove: () => {} }, style: {}, appendChild: () => {}, innerHTML: '', textContent: '' }),
    addEventListener: () => {},
  };

  // 游戏模块 mock
  global.Sound = { play: () => {}, hit: () => {}, coin: () => {}, levelUp: () => {}, gameOver: () => {}, correct: () => {}, wrong: () => {} };
  global.Achievements = { check: () => {}, getUnlockedCount: () => 0, getTotalCount: () => 16, unlock: () => {} };
}

// 加载 JS 模块（挂到全局，带缓存）
const loadedModules = new Set();
function loadJS(relPath) {
  if (loadedModules.has(relPath)) return;
  loadedModules.add(relPath);
  const fullPath = path.join(projectRoot, relPath);
  const code = fs.readFileSync(fullPath, 'utf-8');
  // 在全局作用域执行
  const script = require('vm').runInThisContext;
  script(code, { filename: fullPath });
}
global.loadJS = loadJS;

// 测试收集器
const tests = [];
function test(name, fn) {
  tests.push({ name, fn });
}

// 运行测试
function runTests(pattern) {
  setupGlobals();

  // 查找测试文件
  const files = fs.readdirSync(testsDir)
    .filter(f => f.endsWith('.test.js'))
    .filter(f => !pattern || f.includes(pattern));

  let totalPass = 0;
  let totalFail = 0;
  const failures = [];

  for (const file of files) {
    console.log(`\n📁 ${file}`);
    tests.length = 0;

    // 加载测试文件
    const testCode = fs.readFileSync(path.join(testsDir, file), 'utf-8');
    // 注入 test/assert 到全局
    global.test = test;
    global.assert = assert;

    try {
      require('vm').runInThisContext(testCode, { filename: file });
    } catch (e) {
      console.log(`  ❌ 测试文件加载失败: ${e.message}`);
      totalFail++;
      failures.push({ file, error: e.message });
      continue;
    }

    // 运行每个测试
    for (const t of tests) {
      try {
        t.fn();
        console.log(`  ✅ ${t.name}`);
        totalPass++;
      } catch (e) {
        console.log(`  ❌ ${t.name}`);
        console.log(`     ${e.message}`);
        totalFail++;
        failures.push({ file, test: t.name, error: e.message, stack: e.stack });
      }
    }
  }

  // 汇总
  console.log('\n' + '═'.repeat(50));
  console.log(`  通过: ${totalPass}  |  失败: ${totalFail}  |  总计: ${totalPass + totalFail}`);
  console.log('═'.repeat(50));

  if (failures.length > 0) {
    console.log('\n❌ 失败详情:');
    for (const f of failures) {
      console.log(`  - [${f.file}] ${f.test || '加载'}: ${f.error}`);
    }
    process.exit(1);
  } else {
    console.log('\n🎉 全部通过！');
    process.exit(0);
  }
}

const pattern = process.argv[2];
runTests(pattern);
