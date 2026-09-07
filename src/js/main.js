// 主入口 — UI 控制器 + 游戏状态机
const Game = {
  state: 'menu',  // menu / playing / gameover / codex / stats
  player: null,
  dungeon: [],
  roomIndex: 0,
  mode: 'standard',  // standard / learning
  difficulty: 'normal',

  init() {
    Sound.init();
    Sound.loadSetting();
    this.loadPrefs();
    this.bindEvents();
    this.updateContinueButton();
    this.showScreen('start-screen');

    // 页面关闭前自动存档（errorHandler.js 里有防关闭提示，这里只负责存档）
    const _this = this;
    window.addEventListener('beforeunload', function () {
      if (_this.state === 'playing') {
        try { _this.autoSave(); } catch (e) { /* ignore */ }
      }
    });
  },

  // 加载用户偏好
  loadPrefs() {
    const mode = localStorage.getItem(CONFIG.save.modeKey) || 'standard';
    this.mode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    const sound = localStorage.getItem(CONFIG.save.soundKey);
    document.getElementById('btn-sound').textContent = sound === '0' ? '🔇' : '🔊';
  },

  // 绑定事件
  bindEvents() {
    // 主菜单
    document.getElementById('btn-continue').addEventListener('click', () => this.continueRun());
    document.getElementById('btn-start').addEventListener('click', () => this.startRun());
    document.getElementById('btn-codex').addEventListener('click', () => this.showCodex());
    document.getElementById('btn-stats').addEventListener('click', () => this.showStats());

    // 模式选择
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setMode(btn.dataset.mode);
      });
    });

    // 音效开关
    document.getElementById('btn-sound').addEventListener('click', () => {
      const enabled = Sound.toggle();
      document.getElementById('btn-sound').textContent = enabled ? '🔊' : '🔇';
      if (enabled) Sound.click();
    });

    // 返回主菜单
    document.getElementById('btn-menu').addEventListener('click', () => {
      if (confirm('返回主菜单？当前进度会自动保存。')) {
        this.autoSave();
        this.state = 'menu';
        this.updateContinueButton();
        this.showScreen('start-screen');
      }
    });

    // 图鉴/统计返回
    document.getElementById('btn-codex-back').addEventListener('click', () => this.showScreen('start-screen'));
    document.getElementById('btn-stats-back').addEventListener('click', () => this.showScreen('start-screen'));

    // 游戏结束
    document.getElementById('btn-retry').addEventListener('click', () => this.startRun());
    document.getElementById('btn-back-menu').addEventListener('click', () => {
      this.updateContinueButton();
      this.showScreen('start-screen');
    });
  },

  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    localStorage.setItem(CONFIG.save.modeKey, mode);
  },

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  },

  // 更新"继续游戏"按钮
  updateContinueButton() {
    const btn = document.getElementById('btn-continue');
    const current = SaveSystem.loadCurrent();
    if (current && current.player && current.player.hp > 0) {
      btn.style.display = 'block';
      const d = new Date(current.savedAt);
      btn.title = `上次存档：${d.toLocaleString()}\n第 ${current.player.floor} 层`;
    } else {
      btn.style.display = 'none';
    }
  },

  // 开始新游戏
  startRun() {
    const totalFloors = Dungeon.getTotalFloors();
    if (totalFloors === 0) {
      alert('题库未加载，请检查网络或刷新页面。');
      return;
    }

    this.player = Player.create(1);
    this.roomIndex = 0;
    SaveSystem.clearCurrent();
    SaveSystem.incrementRuns();

    const wrongPool = SaveSystem.getWrongPool();
    this.dungeon = Dungeon.generateFloor(1, wrongPool);

    if (this.dungeon.length === 0) {
      alert('地牢生成失败，没有可用的题目。');
      return;
    }

    this.state = 'playing';
    this.showScreen('game-screen');
    this.autoSave();
    this.enterRoom();
  },

  // 继续游戏
  continueRun() {
    const current = SaveSystem.loadCurrent();
    if (!current) {
      this.startRun();
      return;
    }

    this.player = Player.restore(current.player);
    this.roomIndex = current.roomIndex || 0;

    // 重建地牢
    this.dungeon = this.rebuildDungeon(current);

    this.state = 'playing';
    this.showScreen('game-screen');
    this.autoSave();
    this.enterRoom();
  },

  // 从存档重建地牢
  rebuildDungeon(current) {
    const dungeon = [];
    const allQ = window.QUESTION_BANK || [];
    const roomIds = current.dungeonRoomIds || [];
    const roomTypes = current.dungeonTypes || [];

    for (let i = 0; i < roomIds.length; i++) {
      const qid = roomIds[i];
      const type = roomTypes[i] || 'normal';

      if (type === 'shop') {
        dungeon.push({
          type: 'shop',
          question: null,
          monster: { emoji: '🏪', name: '神秘商人', type: '商店' },
          shopItems: Shop.generateShopItems()
        });
        continue;
      }

      const q = allQ.find(x => x.id === qid);
      if (!q) continue;

      if (type === 'boss') {
        dungeon.push({
          type: 'boss',
          question: q,
          monster: Dungeon.generateBossMonster(q.floor || 1)
        });
      } else {
        dungeon.push({
          type: 'normal',
          question: q,
          monster: Dungeon.generateMonster(q, i)
        });
      }
    }

    return dungeon;
  },

  // 自动存档
  autoSave() {
    if (this.state !== 'playing' || !this.player) return;
    SaveSystem.saveCurrent(this.player, this.dungeon, this.roomIndex);
    this.updateContinueButton();
  },

  // 进入房间
  enterRoom() {
    if (this.roomIndex >= this.dungeon.length) {
      this.nextFloor();
      return;
    }

    const room = this.dungeon[this.roomIndex];
    this.player.room = this.roomIndex + 1;

    this.updateStatusBar();
    this.updateItemBar();

    const gameScreen = document.getElementById('game-screen');
    const feedbackBox = document.getElementById('feedback-box');
    feedbackBox.style.display = 'none';

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // 商店房
    if (room.type === 'shop') {
      this.renderShop(room);
      return;
    }

    // 宝箱房（遗物）
    if (room.type === 'relic') {
      this.renderRelicRoom(room);
      return;
    }

    // Boss 房
    if (room.type === 'boss') {
      this.enterBossRoom(room);
      return;
    }

    // 普通战斗房
    const question = room.question;
    question._monster = room.monster;
    this.player.currentQuestion = question;

    if (this.mode === 'learning') {
      this.showLearningIntro(question, gameScreen, optionsContainer);
    } else {
      Combat.renderQuestion(question, gameScreen, (answer) => {
        this.handleAnswer(question, answer);
      });
    }

    this.updateMonsterDisplay(question._monster);
  },

  // 更新怪物显示
  updateMonsterDisplay(monster) {
    if (!monster) return;
    document.getElementById('monster-emoji').textContent = monster.emoji;
    document.getElementById('monster-name').textContent = monster.name;
    document.getElementById('monster-type').textContent = monster.type;
  },

  // 学习模式：先解析再答题
  showLearningIntro(question, gameScreen, optionsContainer) {
    const qText = document.getElementById('question-text');
    qText.innerHTML = `
      <div style="color: var(--accent); font-size: 14px; margin-bottom: 8px;">📚 学习模式 - 先看知识点</div>
      <div style="margin-bottom: 12px;">${Utils.escapeHtml(question.question)}</div>
      <div style="background: var(--bg-darker); padding: 12px; border-radius: 6px; border-left: 3px solid var(--primary); font-size: 14px; line-height: 1.8;">
        <strong>💡 知识点：</strong><br>
        ${Utils.escapeHtml(question.explanation || '暂无解析')}
      </div>
    `;

    const startBtn = document.createElement('button');
    startBtn.className = 'btn-primary';
    startBtn.textContent = '我懂了，开始答题 →';
    startBtn.style.marginTop = '16px';
    startBtn.style.width = '100%';
    startBtn.addEventListener('click', () => {
      qText.textContent = question.question;
      optionsContainer.innerHTML = '';
      Combat.renderQuestion(question, gameScreen, (answer) => {
        this.handleAnswer(question, answer);
      });
    });
    optionsContainer.appendChild(startBtn);
  },

  // 处理答题结果
  handleAnswer(question, answer) {
    let isCorrect;
    if (question.type === 'open') {
      const result = Combat.gradeOpenAnswer(question, answer);
      isCorrect = result.passed;
    } else {
      isCorrect = Combat.checkAnswer(question, answer);
    }

    const gameScreen = document.getElementById('game-screen');

    SaveSystem.updateCodex(question.id, isCorrect);

    if (isCorrect) {
      let gold = Combat.calcGold(question, this.player);
      Player.addGold(this.player, gold);
      Player.onCorrect(this.player);
      Sound.correct();
      // 吸血遗物
      if (typeof Relics !== 'undefined') {
        const vampire = this.player.relics?.find(r => r.id === 'vampireFangs');
        if (vampire) {
          Player.heal(this.player, vampire.effect.value);
        }
      }
    } else {
      let damage = Combat.calcDamage(question);
      // 伤害减免遗物
      if (typeof Relics !== 'undefined') {
        damage = Math.floor(damage * Relics.getDamageMultiplier(this.player));
      }
      const dead = Player.takeDamage(this.player, damage);
      // 凤凰羽毛复活
      if (dead && typeof Relics !== 'undefined' && Relics.canRevive(this.player)) {
        Relics.doRevive(this.player);
        Sound.victory();
      }
      Player.onWrong(this.player);
      Sound.hurt();
    }

    this.updateStatusBar();

    Combat.showFeedback(gameScreen, question, isCorrect, () => {
      if (!Player.isAlive(this.player)) {
        this.gameOver();
      } else {
        this.roomIndex++;
        this.autoSave();
        this.enterRoom();
      }
    });
  },

  // 渲染商店
  renderShop(room) {
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    this.updateMonsterDisplay({ emoji: '🏪', name: '神秘商人', type: '商店' });

    qText.innerHTML = `
      <div style="text-align: center; margin-bottom: 12px;">
        <strong style="color: var(--accent);">🛒 欢迎来到地牢商店！</strong>
      </div>
      <div style="text-align: center; color: var(--text-muted); font-size: 14px;">
        当前金币：💰 <strong style="color: var(--accent); font-size: 18px;">${this.player.gold}</strong>
      </div>
    `;

    optionsContainer.innerHTML = '';

    room.shopItems.forEach((item, idx) => {
      const canAfford = this.player.gold >= item.price;
      const btn = document.createElement('button');
      btn.className = 'option-btn shop-item';
      btn.style.flexDirection = 'row';
      btn.style.justifyContent = 'space-between';
      btn.disabled = !canAfford;
      btn.innerHTML = `
        <span>${item.emoji} <strong>${item.name}</strong> — ${item.desc}</span>
        <span style="color: ${canAfford ? 'var(--accent)' : 'var(--text-muted)'}; font-weight: bold;">💰 ${item.price}</span>
      `;

      if (canAfford) {
        btn.addEventListener('click', () => {
          const result = Shop.buy(this.player, item.id);
          this.updateStatusBar();
          this.updateItemBar();
          Sound.coin();

          btn.disabled = true;
          const msg = result.success
            ? `✅ ${result.msg}（剩 ${this.player.gold}）`
            : `❌ ${result.msg}`;
          btn.querySelector('span:last-child').textContent = msg;
          btn.querySelector('span:last-child').style.color =
            result.success ? 'var(--success)' : 'var(--danger)';

          // 更新其他商品的可买状态
          room.shopItems.forEach((si, i) => {
            if (i === idx) return;
            const b = optionsContainer.children[i];
            if (b && b.tagName === 'BUTTON') {
              const afford = this.player.gold >= si.price;
              b.disabled = !afford;
              const priceSpan = b.querySelector('span:last-child');
              if (priceSpan && priceSpan.textContent.startsWith('💰')) {
                priceSpan.style.color = afford ? 'var(--accent)' : 'var(--text-muted)';
              }
            }
          });
        });
      }
      optionsContainer.appendChild(btn);
    });

    const leaveBtn = document.createElement('button');
    leaveBtn.className = 'btn-primary';
    leaveBtn.textContent = '离开商店，继续冒险 →';
    leaveBtn.style.marginTop = '12px';
    leaveBtn.style.width = '100%';
    leaveBtn.addEventListener('click', () => {
      this.roomIndex++;
      this.autoSave();
      this.enterRoom();
    });
    optionsContainer.appendChild(leaveBtn);
  },

  // 宝箱房（遗物）
  renderRelicRoom(room) {
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const relic = room.relic;

    this.updateMonsterDisplay({ emoji: '📦', name: '神秘宝箱', type: '宝箱' });

    const color = Relics.rarityColors[relic.rarity] || '#fff';
    qText.innerHTML = `
      <div style="text-align: center; margin-bottom: 16px;">
        <div style="font-size: 64px; margin-bottom: 8px;">${relic.emoji}</div>
        <div style="font-size: 20px; font-weight: bold; color: ${color};">${relic.name}</div>
        <div style="font-size: 12px; color: ${color}; margin-top: 4px;">
          ${relic.rarity === 'common' ? '普通' : relic.rarity === 'uncommon' ? '稀有' : '史诗'}
        </div>
        <div style="margin-top: 12px; padding: 12px; background: var(--bg-darker); border-radius: 6px;">
          ${relic.desc}
        </div>
      </div>
    `;

    optionsContainer.innerHTML = '';
    const takeBtn = document.createElement('button');
    takeBtn.className = 'btn-primary';
    takeBtn.textContent = '✨ 拾取遗物，继续冒险 →';
    takeBtn.style.width = '100%';
    takeBtn.addEventListener('click', () => {
      Relics.applyRelic(this.player, relic);
      Sound.coin();
      this.updateStatusBar();
      this.updateItemBar();
      this.roomIndex++;
      this.autoSave();
      this.enterRoom();
    });
    optionsContainer.appendChild(takeBtn);
  },

  // 更新道具栏
  updateItemBar() {
    const relicsList = document.getElementById('relics-list');
    const items = this.player.items || {};
    const itemNames = {
      potion: '🧪小血瓶',
      bigPotion: '🍷大血瓶',
      skip: '⏭️跳过符',
      fiftyFifty: '🎯50/50'
    };

    const parts = [];
    for (const [key, count] of Object.entries(items)) {
      if (count > 0 && itemNames[key]) {
        parts.push(`${itemNames[key]}×${count}`);
      }
    }
    if (this.player.relics && this.player.relics.length > 0) {
      this.player.relics.forEach(r => parts.push(r.emoji + r.name));
    }

    relicsList.textContent = parts.length > 0 ? parts.join('  ') : '无';
  },

  // Boss 战
  enterBossRoom(room) {
    const question = room.question;
    const monster = room.monster;
    this.player.currentQuestion = question;
    this.bossPhase = 1;
    this.bossHp = monster.hp || 2;

    Sound.boss();
    this.updateMonsterDisplay({
      ...monster,
      type: `${monster.type} 阶段 1/${this.bossHp}`
    });

    const gameScreen = document.getElementById('game-screen');
    const optionsContainer = document.getElementById('options-container');
    const qText = document.getElementById('question-text');

    // 阶段 1：选择题热身
    const floorQs = (window.QUESTION_BANK || [])
      .filter(q => q.floor === this.player.floor && q.type === 'single');
    const phase1Q = floorQs[Math.floor(Math.random() * floorQs.length)];
    this.bossPhase1Question = phase1Q;

    qText.innerHTML = `
      <div style="color: var(--danger); font-size: 14px; margin-bottom: 8px; text-align: center;">
        ⚠️ BOSS 战 · 阶段 1 / ${this.bossHp}
      </div>
      <div style="margin-bottom: 12px;">${Utils.escapeHtml(phase1Q.question)}</div>
      <div style="font-size: 13px; color: var(--text-muted);">
        打败 Boss 需要两个阶段：先答对一道选择题（热身），再完整回答一道开放题（致命一击）。
      </div>
    `;

    const tempQ = { ...phase1Q, _monster: monster };
    Combat.renderQuestion(tempQ, gameScreen, (answer) => {
      const correct = Combat.checkAnswer(phase1Q, answer);
      this.handleBossPhase1(phase1Q, correct, question, monster);
    });
  },

  handleBossPhase1(phase1Q, correct, bossQ, monster) {
    const optionsContainer = document.getElementById('options-container');

    const optionBtns = optionsContainer.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
      btn.disabled = true;
      const letter = btn.dataset.letter;
      if (letter === phase1Q.answer) {
        btn.classList.add('correct');
      } else if (btn.classList.contains('selected')) {
        btn.classList.add('wrong');
      }
    });

    if (!correct) {
      Player.takeDamage(this.player, CONFIG.combat.bossPhase1Damage);
      Player.onWrong(this.player);
      Sound.hurt();
      this.updateStatusBar();
      if (!Player.isAlive(this.player)) {
        this.gameOver();
        return;
      }
    } else {
      const gold = Combat.calcGold(phase1Q);
      Player.addGold(this.player, gold);
      Player.onCorrect(this.player);
      Sound.correct();
    }

    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-box ' + (correct ? 'correct' : 'wrong');
    feedbackDiv.innerHTML = `
      <div class="feedback-title ${correct ? 'correct' : 'wrong'}">
        ${correct ? '✅ 第一阶段通过！' : `❌ 答错了，受到 ${CONFIG.combat.bossPhase1Damage} 点伤害...`}
      </div>
      <div class="feedback-explanation">${phase1Q.explanation || ''}</div>
      <button class="btn-primary" id="boss-phase2-btn">
        进入第二阶段 →
      </button>
    `;
    optionsContainer.appendChild(feedbackDiv);

    document.getElementById('boss-phase2-btn').addEventListener('click', () => {
      this.startBossPhase2(bossQ, monster);
    });
  },

  startBossPhase2(bossQ, monster) {
    const gameScreen = document.getElementById('game-screen');
    const optionsContainer = document.getElementById('options-container');
    const qText = document.getElementById('question-text');

    this.bossPhase = 2;
    this.updateMonsterDisplay({
      ...monster,
      type: `${monster.type} 阶段 2/${this.bossHp}`
    });

    qText.innerHTML = `
      <div style="color: var(--danger); font-size: 14px; margin-bottom: 8px; text-align: center;">
        ⚠️ BOSS 战 · 最终阶段
      </div>
      <div style="margin-bottom: 12px;">${Utils.escapeHtml(bossQ.question)}</div>
      <div style="font-size: 13px; color: var(--text-muted);">
        用自己的话完整回答。答对关键知识点就能击败 Boss！
      </div>
    `;

    optionsContainer.innerHTML = '';

    const tempQ = { ...bossQ, type: 'open' };
    Combat.renderQuestion(tempQ, gameScreen, (answer) => {
      this.handleBossPhase2(bossQ, answer, monster);
    });
  },

  handleBossPhase2(bossQ, userAnswer, monster) {
    // 智慧宝珠降低关键词要求
    let adjustedQ = { ...bossQ };
    if (typeof Relics !== 'undefined') {
      const reduction = Relics.getBossKeywordReduction(this.player);
      if (reduction > 0) {
        adjustedQ.min_keywords = Math.max(1, (bossQ.min_keywords || CONFIG.openQuestion.defaultMinKeywords) - reduction);
      }
    }

    const result = Combat.gradeOpenAnswer(adjustedQ, userAnswer);
    const optionsContainer = document.getElementById('options-container');

    SaveSystem.updateCodex(bossQ.id, result.passed);

    optionsContainer.innerHTML = '';

    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-box ' + (result.passed ? 'correct' : 'wrong');

    const matchedList = result.matched.map(k =>
      `<span style="color: var(--success);">✅ ${Utils.escapeHtml(k)}</span>`
    ).join('<br>') || '（无）';
    const missedList = result.missed.map(k =>
      `<span style="color: var(--danger);">❌ ${Utils.escapeHtml(k)}</span>`
    ).join('<br>') || '（全部答出！）';

    feedbackDiv.innerHTML = `
      <div class="feedback-title ${result.passed ? 'correct' : 'wrong'}">
        ${result.passed ? '🎉 BOSS 击败！' : '💀 BOSS 还没被打败...'}
      </div>
      <div class="feedback-explanation">
        <p><strong>得分：${result.matchCount}/${result.totalKeywords} 个关键知识点</strong></p>
        <p style="margin-top: 8px;">已答出的要点：<br>${matchedList}</p>
        <p style="margin-top: 8px;">遗漏的要点：<br>${missedList}</p>
        <p style="margin-top: 12px;"><strong>标准答案参考：</strong><br>${Utils.escapeHtml(bossQ.explanation || '')}</p>
      </div>
      <button class="btn-primary" id="boss-continue-btn">
        ${result.passed ? '继续冒险 →' : '继续 →'}
      </button>
    `;
    optionsContainer.appendChild(feedbackDiv);

    if (result.passed) {
      const gold = CONFIG.combat.bossGoldBase +
        Math.floor(Math.random() * CONFIG.combat.BossGoldVariance);
      Player.addGold(this.player, gold);
      Player.onCorrect(this.player);
      Sound.victory();
      SaveSystem.updateMaxFloor(this.player.floor);
    } else {
      const dead = Player.takeDamage(this.player, CONFIG.combat.bossPhase2Damage);
      Player.onWrong(this.player);
      Sound.hurt();
      this.updateStatusBar();
    }

    document.getElementById('boss-continue-btn').addEventListener('click', () => {
      if (!Player.isAlive(this.player)) {
        this.gameOver();
      } else {
        this.roomIndex++;
        this.autoSave();
        this.enterRoom();
      }
    });
  },

  // 下一层
  nextFloor() {
    const nextFloorNum = this.player.floor + 1;
    const totalFloors = Dungeon.getTotalFloors();

    // 没有更多层了 = 通关
    if (nextFloorNum > totalFloors) {
      this.victory();
      return;
    }

    this.player.floor = nextFloorNum;
    this.roomIndex = 0;

    const heal = Math.floor(this.player.maxHp * 0.2);
    Player.heal(this.player, heal);

    const wrongPool = SaveSystem.getWrongPool();
    this.dungeon = Dungeon.generateFloor(nextFloorNum, wrongPool);

    SaveSystem.updateMaxFloor(this.player.floor - 1);

    alert(`🎉 第 ${this.player.floor - 1} 层通关！\n回复 ${heal} HP，进入下一层...`);

    this.updateStatusBar();
    this.autoSave();
    this.enterRoom();
  },

  // 通关胜利
  victory() {
    this.state = 'gameover';

    const shards = this.player.correctThisRun * 2 + this.player.floor * 5;
    SaveSystem.addSoulShards(shards);
    SaveSystem.updateMaxFloor(this.player.floor);
    SaveSystem.clearCurrent();

    document.getElementById('gameover-title').textContent = '🏆 恭喜通关！';
    document.getElementById('gameover-stats').innerHTML = `
      <p>本局答对：<strong>${this.player.correctThisRun}</strong> 题</p>
      <p>本局答错：<strong>${this.player.wrongThisRun}</strong> 题</p>
      <p>通关层数：<strong>第 ${this.player.floor} 层</strong></p>
      <p>最高连胜：<strong>${this.player.bestStreak}</strong> 题</p>
      <p>剩余金币：<strong>💰 ${this.player.gold}</strong></p>
    `;
    document.getElementById('gameover-rewards').innerHTML = `
      <p>获得灵魂碎片：<strong>✨ ${shards}</strong></p>
      <p style="color: var(--success);"><strong>你击败了所有 BOSS，成为了地牢之王！</strong></p>
    `;

    Sound.victory();
    this.updateContinueButton();
    this.showScreen('gameover-screen');
  },

  // 游戏结束
  gameOver() {
    this.state = 'gameover';

    const shards = this.player.correctThisRun * 1 + Math.floor(this.player.floor * 2);
    SaveSystem.addSoulShards(shards);
    SaveSystem.updateMaxFloor(this.player.floor - 1);
    SaveSystem.clearCurrent();

    document.getElementById('gameover-title').textContent =
      `你倒在了第 ${this.player.floor} 层第 ${this.player.room} 间...`;

    document.getElementById('gameover-stats').innerHTML = `
      <p>本局答对：<strong>${this.player.correctThisRun}</strong> 题</p>
      <p>本局答错：<strong>${this.player.wrongThisRun}</strong> 题</p>
      <p>最高连胜：<strong>${this.player.bestStreak}</strong> 题</p>
      <p>到达层数：<strong>第 ${this.player.floor} 层</strong></p>
      <p>获得金币：<strong>💰 ${this.player.gold}</strong></p>
    `;

    document.getElementById('gameover-rewards').innerHTML = `
      <p>获得灵魂碎片：<strong>✨ ${shards}</strong>（可用于永久升级）</p>
      <p>历史最高层：<strong>第 ${SaveSystem.load().permanent.maxFloor} 层</strong></p>
    `;

    this.updateContinueButton();
    this.showScreen('gameover-screen');
  },

  // 更新状态栏
  updateStatusBar() {
    if (!this.player) return;
    const hpPct = (this.player.hp / this.player.maxHp) * 100;
    document.getElementById('hp-fill').style.width = hpPct + '%';
    document.getElementById('hp-text').textContent = `${this.player.hp}/${this.player.maxHp}`;
    document.getElementById('gold-text').textContent = this.player.gold;
    document.getElementById('floor-text').textContent = this.player.floor;
    document.getElementById('room-text').textContent = this.player.room;
  },

  // 显示图鉴
  showCodex() {
    const save = SaveSystem.load();
    const codex = save.permanent.codex;
    const allQuestions = window.QUESTION_BANK || [];
    const container = document.getElementById('codex-content');

    const unlocked = Object.keys(codex).length;
    const total = allQuestions.length;

    let html = `<p class="codex-progress">已解锁：<strong>${unlocked}/${total}</strong> 题</p>`;

    if (unlocked === 0) {
      html += '<p class="empty-tip">还没有解锁任何知识点，去地牢里打怪吧！</p>';
    } else {
      // 按层分组
      const byFloor = {};
      for (const q of allQuestions) {
        const entry = codex[q.id];
        if (!entry) continue;
        const floor = q.floor || 1;
        if (!byFloor[floor]) byFloor[floor] = [];
        byFloor[floor].push({ q, entry });
      }

      html += '<div class="codex-list">';
      for (const floor of Object.keys(byFloor).sort((a, b) => a - b)) {
        html += `<div class="codex-floor-title">第 ${floor} 层</div>`;
        for (const { q, entry } of byFloor[floor]) {
          const status = entry.mastered ? '✅ 已掌握' :
            entry.wrongCount > entry.rightCount ? '⚠️ 薄弱' : '📖 学习中';
          const statusClass = entry.mastered ? 'mastered' :
            entry.wrongCount > entry.rightCount ? 'weak' : 'learning';
          html += `
            <div class="codex-item ${statusClass}">
              <div class="codex-question">${Utils.escapeHtml(q.question)}</div>
              <div class="codex-meta">
                <span class="codex-status">${status}</span>
                <span>答对 ${entry.rightCount} 次</span>
                <span>答错 ${entry.wrongCount} 次</span>
              </div>
            </div>
          `;
        }
      }
      html += '</div>';
    }

    container.innerHTML = html;
    this.showScreen('codex-screen');
  },

  // 显示统计
  showStats() {
    const perm = SaveSystem.load().permanent;
    const total = perm.totalCorrect + perm.totalWrong;
    const accuracy = total > 0 ? (perm.totalCorrect / total * 100).toFixed(1) : 0;

    const container = document.getElementById('stats-content');
    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${perm.totalRuns}</div>
          <div class="stat-label">游戏局数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${perm.maxFloor}</div>
          <div class="stat-label">最高层数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${perm.totalCorrect}</div>
          <div class="stat-label">累计答对</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${accuracy}%</div>
          <div class="stat-label">正确率</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">✨ ${perm.soulShards}</div>
          <div class="stat-label">灵魂碎片</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${Object.keys(perm.codex).length}</div>
          <div class="stat-label">知识点解锁</div>
        </div>
      </div>

      <h3>永久升级（灵魂碎片兑换）</h3>
      <div class="upgrade-list">
        ${Object.entries(CONFIG.upgrades).map(([key, cfg]) => {
          const level = perm.upgrades[key] || 0;
          const maxed = level >= cfg.maxLevel;
          return `
            <div class="upgrade-item">
              <div>
                <strong>${cfg.label || key}</strong>（等级 ${level}/${cfg.maxLevel}）
                <div class="upgrade-desc">${cfg.desc}</div>
              </div>
              <button class="btn-secondary" onclick="Game.buyUpgrade('${key}')"
                ${maxed ? 'disabled' : ''}>
                ${maxed ? '已满级' : `${cfg.cost} ✨ 升级`}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.showScreen('stats-screen');
  },

  // 购买永久升级
  buyUpgrade(type) {
    const result = SaveSystem.buyUpgrade(type);
    if (!result.success) {
      alert(result.msg);
      return;
    }
    Sound.coin();
    this.showStats();  // 刷新
  }
};

// 启动
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
