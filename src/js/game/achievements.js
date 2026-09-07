// 成就系统
const Achievements = {
  all: {
    firstBlood: {
      id: 'firstBlood',
      name: '初出茅庐',
      emoji: '⚔️',
      desc: '完成第一局游戏',
      check: (save) => save.permanent.totalRuns >= 1
    },
    floor2: {
      id: 'floor2',
      name: '深入险境',
      emoji: '🏰',
      desc: '到达第 2 层',
      check: (save) => save.permanent.maxFloor >= 2
    },
    floor3: {
      id: 'floor3',
      name: '勇往直前',
      emoji: '🗼',
      desc: '到达第 3 层',
      check: (save) => save.permanent.maxFloor >= 3
    },
    floor4: {
      id: 'floor4',
      name: '地牢征服者',
      emoji: '👑',
      desc: '到达第 4 层',
      check: (save) => save.permanent.maxFloor >= 4
    },
    scholar: {
      id: 'scholar',
      name: '勤学者',
      emoji: '📚',
      desc: '累计答对 50 道题',
      check: (save) => save.permanent.totalCorrect >= 50
    },
    master: {
      id: 'master',
      name: '知识大师',
      emoji: '🎓',
      desc: '累计答对 200 道题',
      check: (save) => save.permanent.totalCorrect >= 200
    },
    streak10: {
      id: 'streak10',
      name: '连珠妙语',
      emoji: '🔥',
      desc: '单局连胜 10 题',
      check: (save) => (save.permanent.stats?.bestStreak || 0) >= 10
    },
    perfect: {
      id: 'perfect',
      name: '完美主义',
      emoji: '💯',
      desc: '单局答对 20 题且答错不超过 2 题',
      check: (save) => {
        const s = save.permanent.stats?.bestRun;
        if (!s) return false;
        return s.correct >= 20 && s.wrong <= 2;
      }
    },
    bossSlayer: {
      id: 'bossSlayer',
      name: '屠龙勇士',
      emoji: '🐉',
      desc: '击败第一个 Boss',
      check: (save) => (save.permanent.stats?.bossesKilled || 0) >= 1
    },
    rich: {
      id: 'rich',
      name: '富可敌国',
      emoji: '💰',
      desc: '单局获得 200 金币',
      check: (save) => (save.permanent.stats?.mostGold || 0) >= 200
    },
    collector: {
      id: 'collector',
      name: '收藏家',
      emoji: '🎒',
      desc: '获得 5 个不同遗物',
      check: (save) => {
        const relics = save.permanent.stats?.relicsCollected || {};
        return Object.keys(relics).length >= 5;
      }
    },
    survivor: {
      id: 'survivor',
      name: '九死一生',
      emoji: '💀',
      desc: '以 10 HP 以下存活一局',
      check: (save) => (save.permanent.stats?.nearDeathSaves || 0) >= 1
    },
    phoenix: {
      id: 'phoenix',
      name: '凤凰涅槃',
      emoji: '🔥',
      desc: '被凤凰羽毛复活过',
      check: (save) => (save.permanent.stats?.phoenixRevives || 0) >= 1
    },
    dailyWinner: {
      id: 'dailyWinner',
      name: '每日挑战',
      emoji: '📅',
      desc: '完成一次每日挑战',
      check: (save) => save.permanent.dailyBest != null
    },
    codexComplete: {
      id: 'codexComplete',
      name: '全知全能',
      emoji: '📖',
      desc: '图鉴完成率达到 80%',
      check: (save) => {
        const codex = save.permanent.codex || {};
        const total = window.QUESTION_BANK?.length || 1;
        const known = Object.values(codex).filter(s => s.correct > 0).length;
        return known / total >= 0.8;
      }
    },
    hardMode: {
      id: 'hardMode',
      name: '硬核玩家',
      emoji: '💪',
      desc: '在困难难度下通关第 2 层',
      check: (save) => (save.permanent.stats?.hardMaxFloor || 0) >= 2
    }
  },

  // 检查并解锁新成就
  checkAll() {
    const save = SaveSystem.load();
    const unlocked = save.permanent.achievements || {};
    const newlyUnlocked = [];

    for (const [id, ach] of Object.entries(this.all)) {
      if (unlocked[id]) continue;
      try {
        if (ach.check(save)) {
          unlocked[id] = { unlockedAt: Date.now() };
          newlyUnlocked.push(ach);
        }
      } catch (e) { /* ignore */ }
    }

    if (newlyUnlocked.length > 0) {
      save.permanent.achievements = unlocked;
      SaveSystem.save(save);
    }

    return newlyUnlocked;
  },

  // 显示成就解锁弹窗
  showUnlock(achievement) {
    const el = document.createElement('div');
    el.className = 'achievement-toast';
    el.innerHTML = `
      <div class="ach-icon">${achievement.emoji}</div>
      <div class="ach-info">
        <div class="ach-title">成就解锁！</div>
        <div class="ach-name">${achievement.name}</div>
        <div class="ach-desc">${achievement.desc}</div>
      </div>
    `;
    document.body.appendChild(el);

    // 播放音效
    if (typeof Sound !== 'undefined') Sound.victory();

    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
    }, 3000);
    setTimeout(() => el.remove(), 3500);
  },

  // 获取总成就数
  getTotalCount() {
    return Object.keys(this.all).length;
  },

  // 获取已解锁数
  getUnlockedCount() {
    const save = SaveSystem.load();
    const unlocked = save.permanent.achievements || {};
    return Object.keys(unlocked).length;
  }
};
