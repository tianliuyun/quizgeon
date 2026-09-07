// 主入口 — 状态机 + UI 控制
const Game = {
  state: 'menu',  // menu / playing / gameover / codex / stats
  player: null,
  dungeon: [],     // 当前层房间数组
  roomIndex: 0,
  save: null,
  mode: 'standard',  // standard / learning（学习模式：先看解析再答题）

  init() {
    this.save = SaveSystem.load();
    Sound.init();
    Sound.loadSetting();
    this.bindEvents();
    this.loadMode();
    this.loadSoundIcon();
    this.updateContinueButton();
    this.showScreen('start-screen');

    // 页面关闭前自动存档
    window.addEventListener('beforeunload', () => {
      if (this.state === 'playing') {
        this.autoSave();
      }
    });
  },

  bindEvents() {
    // 主菜单
    document.getElementById('btn-continue').addEventListener('click', () => this.continueRun());
    document.getElementById('btn-start').addEventListener('click', () => this.startRun());
    document.getElementById('btn-codex').addEventListener('click', () => this.showCodex());
    document.getElementById('btn-stats').addEventListener('click', () => this.showStats());

    // 模式选择
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        this.setMode(mode);
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
    document.getElementById('btn-back-menu').addEventListener('click', () => this.showScreen('start-screen'));
  },

  // 更新"继续游戏"按钮显示
  updateContinueButton() {
    const btn = document.getElementById('btn-continue');
    const current = SaveSystem.loadCurrent();
    if (current && current.player && current.player.hp > 0) {
      btn.style.display = 'block';
      const d = new Date(current.savedAt);
      btn.title = `上次存档：${d.toLocaleString()}\n第 ${current.player.floor} 层 第 ${current.roomIndex + 1 || current.player.room} 间`;
    } else {
      btn.style.display = 'none';
    }
  },

  // 继续游戏
  continueRun() {
    const current = SaveSystem.loadCurrent();
    if (!current) {
      this.startRun();
      return;
    }

    // 重建 player
    this.player = current.player;
    this.roomIndex = current.roomIndex || 0;

    // 重建 dungeon（从题库中按 id 找题，重生成怪物）
    this.dungeon = [];
    const allQ = window.QUESTION_BANK;
    for (const qid of current.dungeonRoomIds) {
      const q = allQ.find(x => x.id === qid);
      if (q) {
        const roomIdx = this.dungeon.length;
        const isBoss = roomIdx === current.dungeonRoomIds.length - 1;
        const monster = Dungeon.generateMonster(q, roomIdx);
        if (isBoss) monster.type = 'Boss';
        this.dungeon.push({
          type: isBoss ? 'boss' : 'normal',
          question: q,
          monster: monster
        });
      }
    }

    this.state = 'playing';
    this.showScreen('game-screen');
    this.autoSave();  // 开局就存一次
    this.enterRoom();
  },

  // 自动存档
  autoSave() {
    if (this.state !== 'playing' || !this.player) return;
    SaveSystem.saveCurrent(this.player, this.dungeon, this.roomIndex);
    this.updateContinueButton();
  },

  // 设置模式
  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    localStorage.setItem('quizgeon_mode', mode);
  },

  // 加载模式设置
  loadMode() {
    const saved = localStorage.getItem('quizgeon_mode') || 'standard';
    this.setMode(saved);
  },

  // 加载音效图标状态
  loadSoundIcon() {
    const saved = localStorage.getItem('quizgeon_sound');
    document.getElementById('btn-sound').textContent = saved === '0' ? '🔇' : '🔊';
  },

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  },

  // 开始新一局
  startRun() {
    this.player = Player.create(1);
    this.roomIndex = 0;
    this.dungeon = Dungeon.generateFloor(1);
    this.save.permanent.totalRuns++;
    SaveSystem.save(this.save);

    this.state = 'playing';
    this.showScreen('game-screen');
    this.autoSave();  // 继续游戏也存一次
    this.enterRoom();
  },

  // 进入房间
  enterRoom() {
    if (this.roomIndex >= this.dungeon.length) {
      // 本层通关 → 下一层
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

    // 重置选项样式
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // 商店房
    if (room.type === 'shop') {
      this.renderShop(room);
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

    // 更新怪物显示
    if (question._monster) {
      document.getElementById('monster-emoji').textContent = question._monster.emoji;
      document.getElementById('monster-name').textContent = question._monster.name;
      document.getElementById('monster-type').textContent = question._monster.type;
    }
  },

  // 渲染商店
  renderShop(room) {
    const qText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    // 怪物区显示商人
    document.getElementById('monster-emoji').textContent = '🏪';
    document.getElementById('monster-name').textContent = '神秘商人';
    document.getElementById('monster-type').textContent = '商店';

    qText.innerHTML = `
      <div style="text-align: center; margin-bottom: 12px;">
        <strong style="color: var(--accent);">🛒 欢迎来到地牢商店！</strong>
      </div>
      <div style="text-align: center; color: var(--text-muted); font-size: 14px;">
        当前金币：💰 <strong style="color: var(--accent); font-size: 18px;">${this.player.gold}</strong>
      </div>
    `;

    optionsContainer.innerHTML = '';

    // 商品列表
    room.shopItems.forEach(item => {
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
          // 显示购买结果
          const msg = result.success
            ? `✅ ${result.msg}（剩余 ${this.player.gold} 金币）`
            : `❌ ${result.msg}`;
          btn.disabled = true;
          // 更新价格显示
          btn.querySelector('span:last-child').textContent = msg;
          btn.querySelector('span:last-child').style.color = result.success ? 'var(--success)' : 'var(--danger)';
          // 金币变化后重算能不能买
          room.shopItems.forEach((si, idx) => {
            const b = optionsContainer.children[idx];
            if (b && si.id !== item.id) {
              b.disabled = this.player.gold < si.price;
              const priceSpan = b.querySelector('span:last-child');
              if (priceSpan && priceSpan.textContent.startsWith('💰')) {
                priceSpan.style.color = this.player.gold < si.price ? 'var(--text-muted)' : 'var(--accent)';
              }
            }
          });
        });
      }
      optionsContainer.appendChild(btn);
    });

    // 离开商店按钮
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
    // 遗物
    if (this.player.relics && this.player.relics.length > 0) {
      this.player.relics.forEach(r => parts.push(r.emoji + r.name));
    }

    relicsList.textContent = parts.length > 0 ? parts.join('  ') : '无';
  },

  // Boss 战 — 两阶段
  enterBossRoom(room) {
    const question = room.question;
    const monster = room.monster;
    this.player.currentQuestion = question;
    this.bossPhase = 1;  // 1: 选择题阶段  2: 开放题阶段
    this.bossHp = monster.hp || 2;

    Sound.boss();  // Boss 出场音效

    // 更新怪物显示
    document.getElementById('monster-emoji').textContent = monster.emoji;
    document.getElementById('monster-name').textContent = monster.name;
    document.getElementById('monster-type').textContent = `${monster.type} 阶段 1/${this.bossHp}`;

    const gameScreen = document.getElementById('game-screen');
    const optionsContainer = document.getElementById('options-container');
    const qText = document.getElementById('question-text');

    // 阶段 1：选择题热身（从同层普通题里抽一道，打掉 Boss 第一条命）
    const floorQs = window.QUESTION_BANK.filter(q => q.floor === this.player.floor && q.type === 'single');
    const phase1Q = floorQs[Math.floor(Math.random() * floorQs.length)];
    this.bossPhase1Question = phase1Q;

    qText.innerHTML = `
      <div style="color: var(--danger); font-size: 14px; margin-bottom: 8px; text-align: center;">
        ⚠️ BOSS 战 · 阶段 1 / ${this.bossHp}
      </div>
      <div style="margin-bottom: 12px;">${phase1Q.question}</div>
      <div style="font-size: 13px; color: var(--text-muted);">
        打败 Boss 需要两个阶段：先答对一道选择题（热身），再完整回答一道开放题（致命一击）。
      </div>
    `;

    // 渲染阶段 1 选择题
    const tempQ = { ...phase1Q, _monster: monster };
    Combat.renderQuestion(tempQ, gameScreen, (answer) => {
      const correct = Combat.checkAnswer(phase1Q, answer);
      this.handleBossPhase1(phase1Q, correct, question, monster);
    });
  },

  // Boss 阶段 1 结果
  handleBossPhase1(phase1Q, correct, bossQ, monster) {
    const gameScreen = document.getElementById('game-screen');
    const optionsContainer = document.getElementById('options-container');
    const qText = document.getElementById('question-text');

    // 高亮答案
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

    // 阶段 1 答错 = 掉血，但 Boss 战继续（给机会）
    if (!correct) {
      const damage = 15;
      Player.takeDamage(this.player, damage);
      this.updateStatusBar();
      if (!Player.isAlive(this.player)) {
        this.gameOver();
        return;
      }
    } else {
      const gold = Combat.calcGold(phase1Q);
      Player.addGold(this.player, gold);
      this.player.correctThisRun++;
    }

    // 进入阶段 2 之前给反馈
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-box ' + (correct ? 'correct' : 'wrong');
    feedbackDiv.innerHTML = `
      <div class="feedback-title ${correct ? 'correct' : 'wrong'}">
        ${correct ? '✅ 第一阶段通过！' : '❌ 答错了，受到 15 点伤害...'}
      </div>
      <div class="feedback-explanation">
        ${phase1Q.explanation || ''}
      </div>
      <button class="btn-primary" id="boss-phase2-btn">
        ${correct ? '进入第二阶段 →' : '继续，进入第二阶段 →'}
      </button>
    `;
    optionsContainer.appendChild(feedbackDiv);

    document.getElementById('boss-phase2-btn').addEventListener('click', () => {
      this.startBossPhase2(bossQ, monster);
    });
  },

  // Boss 阶段 2：开放题
  startBossPhase2(bossQ, monster) {
    const gameScreen = document.getElementById('game-screen');
    const optionsContainer = document.getElementById('options-container');
    const qText = document.getElementById('question-text');

    this.bossPhase = 2;
    document.getElementById('monster-type').textContent = `${monster.type} 阶段 2/${this.bossHp}`;

    qText.innerHTML = `
      <div style="color: var(--danger); font-size: 14px; margin-bottom: 8px; text-align: center;">
        ⚠️ BOSS 战 · 最终阶段
      </div>
      <div style="margin-bottom: 12px;">${bossQ.question}</div>
      <div style="font-size: 13px; color: var(--text-muted);">
        用自己的话完整回答。答对关键知识点就能击败 Boss！
      </div>
    `;

    optionsContainer.innerHTML = '';

    // 渲染开放题
    const tempQ = { ...bossQ, type: 'open' };
    Combat.renderQuestion(tempQ, gameScreen, (answer) => {
      this.handleBossPhase2(bossQ, answer, monster);
    });
  },

  // Boss 阶段 2 结果
  handleBossPhase2(bossQ, userAnswer, monster) {
    const result = Combat.gradeOpenAnswer(bossQ, userAnswer);
    const gameScreen = document.getElementById('game-screen');
    const feedbackBox = document.getElementById('feedback-box');

    // 更新图鉴
    SaveSystem.updateCodex(bossQ.id, result.passed);
    this.save = SaveSystem.load();

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-box ' + (result.passed ? 'correct' : 'wrong');

    const matchedList = result.matched.map(k => `<span style="color: var(--success);">✅ ${k}</span>`).join('<br>');
    const missedList = result.missed.map(k => `<span style="color: var(--danger);">❌ ${k}</span>`).join('<br>');

    feedbackDiv.innerHTML = `
      <div class="feedback-title ${result.passed ? 'correct' : 'wrong'}">
        ${result.passed ? '🎉 BOSS 击败！' : '💀 BOSS 还没被打败...'}
      </div>
      <div class="feedback-explanation">
        <p><strong>得分：${result.matchCount}/${result.totalKeywords} 个关键知识点</strong></p>
        <p style="margin-top: 8px;">已答出的要点：<br>${matchedList || '（无）'}</p>
        <p style="margin-top: 8px;">遗漏的要点：<br>${missedList || '（全部答出！）'}</p>
        <p style="margin-top: 12px;"><strong>标准答案参考：</strong><br>${bossQ.explanation || ''}</p>
      </div>
      <button class="btn-primary" id="boss-continue-btn">
        ${result.passed ? '继续冒险 →' : '继续 →'}
      </button>
    `;
    optionsContainer.appendChild(feedbackDiv);

    // 处理结果
    if (result.passed) {
      // 击败 Boss：大量金币 + 下一层
      const gold = 50 + Math.floor(Math.random() * 30);
      Player.addGold(this.player, gold);
      this.player.correctThisRun++;
      Sound.victory();

      document.getElementById('boss-continue-btn').addEventListener('click', () => {
        this.roomIndex++;
        this.autoSave();
        this.enterRoom();  // 会走到层底 → nextFloor
      });
    } else {
      // 没打过：掉血，但继续（Boss 战一次机会，打不过就死了重来）
      const damage = 30;
      const dead = Player.takeDamage(this.player, damage);
      this.player.wrongThisRun++;
      this.updateStatusBar();

      document.getElementById('boss-continue-btn').addEventListener('click', () => {
        if (dead) {
          this.gameOver();
        } else {
          // 没死也算过了（给个惩罚），不然玩家卡关
          this.roomIndex++;
          this.autoSave();
          this.enterRoom();
        }
      });
    }
  },

  // 学习模式：先显示知识点解析
  showLearningIntro(question, gameScreen, optionsContainer) {
    const qText = document.getElementById('question-text');
    qText.innerHTML = `
      <div style="color: var(--accent); font-size: 14px; margin-bottom: 8px;">📚 学习模式 - 先看知识点</div>
      <div style="margin-bottom: 12px;">${question.question}</div>
      <div style="background: var(--bg-darker); padding: 12px; border-radius: 6px; border-left: 3px solid var(--primary); font-size: 14px; line-height: 1.8;">
        <strong>💡 知识点：</strong><br>
        ${question.explanation || '暂无解析'}
      </div>
    `;

    const startBtn = document.createElement('button');
    startBtn.className = 'btn-primary';
    startBtn.textContent = '我懂了，开始答题 →';
    startBtn.style.marginTop = '16px';
    startBtn.style.width = '100%';
    startBtn.addEventListener('click', () => {
      // 切换到答题模式
      qText.textContent = question.question;
      optionsContainer.innerHTML = '';
      Combat.renderQuestion(question, gameScreen, (answer) => {
        this.handleAnswer(question, answer);
      });
    });
    optionsContainer.appendChild(startBtn);
  },

  // 处理答题
  handleAnswer(question, answer) {
    let isCorrect;
    if (question.type === 'open') {
      const result = Combat.gradeOpenAnswer(question, answer);
      isCorrect = result.passed;
    } else {
      isCorrect = Combat.checkAnswer(question, answer);
    }
    const gameScreen = document.getElementById('game-screen');

    // 更新图鉴
    SaveSystem.updateCodex(question.id, isCorrect);
    this.save = SaveSystem.load();

    if (isCorrect) {
      const gold = Combat.calcGold(question);
      Player.addGold(this.player, gold);
      this.player.correctThisRun++;
      Sound.correct();
    } else {
      const damage = Combat.calcDamage(question);
      const dead = Player.takeDamage(this.player, damage);
      this.player.wrongThisRun++;
      Sound.hurt();
    }

    this.updateStatusBar();

    Combat.showFeedback(gameScreen, question, isCorrect, () => {
      if (!Player.isAlive(this.player)) {
        this.gameOver();
      } else {
        this.roomIndex++;
        this.autoSave();  // 自动存档
        this.enterRoom();
      }
    });
  },

  // 进入下一层
  nextFloor() {
    this.player.floor++;
    this.roomIndex = 0;
    this.dungeon = Dungeon.generateFloor(this.player.floor);

    // 层通关奖励：回 20% 血
    const heal = Math.floor(this.player.maxHp * 0.2);
    Player.heal(this.player, heal);

    // 更新最高层记录
    if (this.player.floor - 1 > this.save.permanent.maxFloor) {
      this.save.permanent.maxFloor = this.player.floor - 1;
      SaveSystem.save(this.save);
    }

    // 显示层通关提示（简单用 alert 顶一下，以后做动画）
    alert(`🎉 第 ${this.player.floor - 1} 层通关！\n回复 ${heal} HP，进入下一层...`);

    this.updateStatusBar();
    this.autoSave();  // 自动存档
    this.enterRoom();
  },

  // 游戏结束
  gameOver() {
    this.state = 'gameover';
    SaveSystem.clearCurrent();  // 清除存档

    // 计算灵魂碎片奖励
    const shards = this.player.correctThisRun * 1 + Math.floor(this.player.floor * 2);
    this.save.permanent.soulShards += shards;
    if (this.player.floor - 1 > this.save.permanent.maxFloor) {
      this.save.permanent.maxFloor = this.player.floor - 1;
    }
    SaveSystem.save(this.save);

    // 填充结算界面
    document.getElementById('gameover-title').textContent =
      `你倒在了第 ${this.player.floor} 层第 ${this.player.room} 间...`;

    document.getElementById('gameover-stats').innerHTML = `
      <p>本局答对：<strong>${this.player.correctThisRun}</strong> 题</p>
      <p>本局答错：<strong>${this.player.wrongThisRun}</strong> 题</p>
      <p>到达层数：<strong>第 ${this.player.floor} 层</strong></p>
      <p>获得金币：<strong>💰 ${this.player.gold}</strong></p>
    `;

    document.getElementById('gameover-rewards').innerHTML = `
      <p>获得灵魂碎片：<strong>✨ ${shards}</strong>（可用于永久升级）</p>
      <p>历史最高层：<strong>第 ${this.save.permanent.maxFloor} 层</strong></p>
    `;

    this.showScreen('gameover-screen');
  },

  // 更新状态栏
  updateStatusBar() {
    const hpPct = (this.player.hp / this.player.maxHp) * 100;
    document.getElementById('hp-fill').style.width = hpPct + '%';
    document.getElementById('hp-text').textContent = `${this.player.hp}/${this.player.maxHp}`;
    document.getElementById('gold-text').textContent = this.player.gold;
    document.getElementById('floor-text').textContent = this.player.floor;
    document.getElementById('room-text').textContent = this.player.room;
  },

  // 显示图鉴
  showCodex() {
    const codex = this.save.permanent.codex;
    const allQuestions = window.QUESTION_BANK;
    const container = document.getElementById('codex-content');

    const unlocked = Object.keys(codex).length;
    const total = allQuestions.length;

    let html = `<p class="codex-progress">已解锁：<strong>${unlocked}/${total}</strong> 题</p>`;

    if (unlocked === 0) {
      html += '<p class="empty-tip">还没有解锁任何知识点，去地牢里打怪吧！</p>';
    } else {
      html += '<div class="codex-list">';
      for (const q of allQuestions) {
        const entry = codex[q.id];
        if (!entry) continue;
        const status = entry.mastered ? '✅ 已掌握' :
                       entry.wrongCount > entry.rightCount ? '⚠️ 薄弱' : '📖 学习中';
        const statusClass = entry.mastered ? 'mastered' :
                           entry.wrongCount > entry.rightCount ? 'weak' : 'learning';
        html += `
          <div class="codex-item ${statusClass}">
            <div class="codex-question">${q.question}</div>
            <div class="codex-meta">
              <span class="codex-status">${status}</span>
              <span>答对 ${entry.rightCount} 次</span>
              <span>答错 ${entry.wrongCount} 次</span>
            </div>
          </div>
        `;
      }
      html += '</div>';
    }

    container.innerHTML = html;
    this.showScreen('codex-screen');
  },

  // 显示统计
  showStats() {
    const perm = this.save.permanent;
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
        <div class="upgrade-item">
          <div>
            <strong>生命上限</strong>（等级 ${perm.upgrades.maxHp}/3）
            <div class="upgrade-desc">每级 +10 最大 HP</div>
          </div>
          <button class="btn-secondary" onclick="Game.buyUpgrade('maxHp', 20)"
            ${perm.upgrades.maxHp >= 3 ? 'disabled' : ''}>
            ${perm.upgrades.maxHp >= 3 ? '已满级' : '20 ✨ 升级'}
          </button>
        </div>
        <div class="upgrade-item">
          <div>
            <strong>起始金币</strong>（等级 ${perm.upgrades.startGold}/2）
            <div class="upgrade-desc">每级 +10 起始金币</div>
          </div>
          <button class="btn-secondary" onclick="Game.buyUpgrade('startGold', 15)"
            ${perm.upgrades.startGold >= 2 ? 'disabled' : ''}>
            ${perm.upgrades.startGold >= 2 ? '已满级' : '15 ✨ 升级'}
          </button>
        </div>
        <div class="upgrade-item">
          <div>
            <strong>错题抗性</strong>（等级 ${perm.upgrades.wrongReduce}/2）
            <div class="upgrade-desc">每级降低 15% 错题复现率</div>
          </div>
          <button class="btn-secondary" onclick="Game.buyUpgrade('wrongReduce', 30)"
            ${perm.upgrades.wrongReduce >= 2 ? 'disabled' : ''}>
            ${perm.upgrades.wrongReduce >= 2 ? '已满级' : '30 ✨ 升级'}
          </button>
        </div>
      </div>
    `;

    this.showScreen('stats-screen');
  },

  // 购买永久升级
  buyUpgrade(type, cost) {
    const perm = this.save.permanent;
    const maxLevels = { maxHp: 3, startGold: 2, shopDiscount: 2, wrongReduce: 2 };

    if (perm.upgrades[type] >= maxLevels[type]) return;
    if (perm.soulShards < cost) {
      alert('灵魂碎片不足！');
      return;
    }

    perm.soulShards -= cost;
    perm.upgrades[type]++;
    SaveSystem.save(this.save);
    this.showStats();  // 刷新
  }
};

// 启动
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
