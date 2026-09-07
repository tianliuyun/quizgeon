// 战斗系统 — 答题核心逻辑
const Combat = {
  // 检查答案
  checkAnswer(question, userAnswer) {
    const correct = question.answer;
    const type = question.type;

    if (type === 'single') {
      return userAnswer === correct;
    } else if (type === 'multiple') {
      const sortedUser = [...userAnswer].sort();
      const sortedCorrect = [...correct].sort();
      return sortedUser.length === sortedCorrect.length &&
             sortedUser.every((v, i) => v === sortedCorrect[i]);
    } else if (type === 'boolean') {
      return userAnswer === correct;
    } else if (type === 'fill' || type === 'open') {
      // 填空/开放题用关键词判分（不在这处理，用 gradeOpenAnswer）
      return false;
    }
    return false;
  },

  // 计算伤害（玩家答错时受到的伤害）
  calcDamage(question) {
    const base = CONFIG.combat.damage;
    const diff = question.difficulty || 'easy';
    const base_dmg = base[diff] || base.easy;
    return Utils.randVariance(base_dmg, CONFIG.combat.variance);
  },

  // 计算金币奖励
  calcGold(question) {
    const base = CONFIG.combat.gold;
    const diff = question.difficulty || 'easy';
    const base_g = base[diff] || base.easy;
    return Utils.randVariance(base_g, CONFIG.combat.variance);
  },

  // 开放题关键词判分
  gradeOpenAnswer(question, userAnswer) {
    const keywords = question.answer || [];
    const answerLower = (userAnswer || '').toLowerCase().trim();
    const matched = [];
    const missed = [];

    keywords.forEach(kw => {
      const kwLower = String(kw).toLowerCase();
      if (answerLower.includes(kwLower)) {
        matched.push(kw);
      } else {
        missed.push(kw);
      }
    });

    const minKeywords = question.min_keywords || CONFIG.openQuestion.defaultMinKeywords;
    const score = keywords.length > 0 ? matched.length / keywords.length : 0;
    const passed = matched.length >= minKeywords;

    return {
      passed,
      score,
      matched,
      missed,
      matchCount: matched.length,
      totalKeywords: keywords.length
    };
  },

  // 渲染题目 + 选项
  renderQuestion(question, container, onAnswer) {
    const qText = container.querySelector('#question-text');
    const optionsContainer = container.querySelector('#options-container');
    const monsterEmoji = container.querySelector('#monster-emoji');
    const monsterName = container.querySelector('#monster-name');
    const monsterType = container.querySelector('#monster-type');

    // 安全渲染题目文本
    qText.textContent = question.question;
    optionsContainer.innerHTML = '';

    // 怪物信息
    if (question._monster) {
      monsterEmoji.textContent = question._monster.emoji;
      monsterName.textContent = question._monster.name;
      monsterType.textContent = question._monster.type;
    }

    if (question.type === 'single' || question.type === 'multiple') {
      question.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.letter = letter;

        // 去掉选项前的 A./B. 前缀（如果有的话）
        const optText = opt.replace(/^[A-D]\.\s*/, '');

        btn.innerHTML = `
          <span class="opt-letter">${letter}</span>
          <span class="opt-text">${Utils.escapeHtml(optText)}</span>
        `;
        btn.addEventListener('click', () => {
          if (question.type === 'single') {
            onAnswer(letter);
          } else {
            // 多选：切换选中状态
            btn.classList.toggle('selected');
          }
        });
        optionsContainer.appendChild(btn);
      });

      if (question.type === 'multiple') {
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn-primary submit-multi';
        submitBtn.textContent = '确认答案';
        submitBtn.addEventListener('click', () => {
          const selected = [...optionsContainer.querySelectorAll('.option-btn.selected')]
            .map(b => b.dataset.letter).sort();
          if (selected.length > 0) onAnswer(selected);
        });
        optionsContainer.appendChild(submitBtn);
      }
    } else if (question.type === 'boolean') {
      const opts = [
        { letter: 'A', text: '✅ 正确', value: true },
        { letter: 'B', text: '❌ 错误', value: false }
      ];
      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.letter = opt.letter;
        btn.innerHTML = `<span class="opt-letter">${opt.letter}</span><span class="opt-text">${opt.text}</span>`;
        btn.addEventListener('click', () => onAnswer(opt.value));
        optionsContainer.appendChild(btn);
      });
    } else if (question.type === 'open') {
      const textarea = document.createElement('textarea');
      textarea.className = 'open-answer-input';
      textarea.placeholder = '请输入你的答案...（尽量用自己的话完整解释）';
      textarea.rows = 6;
      optionsContainer.appendChild(textarea);
      textarea.focus();

      const submitBtn = document.createElement('button');
      submitBtn.className = 'btn-primary submit-open';
      submitBtn.textContent = '提交答案';
      submitBtn.addEventListener('click', () => {
        const answer = textarea.value.trim();
        if (answer.length < 10) {
          alert('答案太短了，请详细解释一下～');
          return;
        }
        onAnswer(answer);
      });
      optionsContainer.appendChild(submitBtn);

      // Ctrl/Cmd + Enter 提交
      textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          submitBtn.click();
        }
      });
    }
  },

  // 显示答题反馈
  showFeedback(container, question, isCorrect, onNext) {
    const feedbackBox = container.querySelector('#feedback-box');
    const feedbackTitle = container.querySelector('#feedback-title');
    const feedbackExp = container.querySelector('#feedback-explanation');
    const optionsContainer = container.querySelector('#options-container');

    // 高亮正确/错误选项（选择题）
    if (question.type !== 'open') {
      const optionBtns = optionsContainer.querySelectorAll('.option-btn');
      optionBtns.forEach(btn => {
        btn.disabled = true;
        const letter = btn.dataset.letter;
        const isCorrectOption = letter === question.answer ||
          (Array.isArray(question.answer) && question.answer.includes(letter));
        const isUserSelected = btn.classList.contains('selected') ||
          btn.dataset.userSelected === 'true';

        if (isCorrectOption) {
          btn.classList.add('correct');
        } else if (isUserSelected) {
          btn.classList.add('wrong');
        }
      });
    }

    feedbackBox.style.display = 'block';
    if (isCorrect) {
      feedbackTitle.innerHTML = '✅ 答对了！';
      feedbackTitle.className = 'feedback-title correct';
    } else {
      feedbackTitle.innerHTML = '❌ 答错了...';
      feedbackTitle.className = 'feedback-title wrong';
    }
    feedbackExp.textContent = question.explanation || '';

    const nextBtn = container.querySelector('#btn-next');
    nextBtn.onclick = onNext;
  },

  // 50/50 排除两个错误选项
  applyFiftyFifty(question, container) {
    const optionsContainer = container.querySelector('#options-container');
    const btns = optionsContainer.querySelectorAll('.option-btn');
    if (!btns.length) return;

    const wrongIndices = [];
    btns.forEach((btn, idx) => {
      const letter = btn.dataset.letter;
      if (letter !== question.answer &&
          !(Array.isArray(question.answer) && question.answer.includes(letter))) {
        wrongIndices.push(idx);
      }
    });

    // 随机排除 2 个
    const toRemove = Utils.shuffle(wrongIndices).slice(0, 2);
    toRemove.forEach(idx => {
      const btn = btns[idx];
      btn.style.opacity = '0.3';
      btn.style.pointerEvents = 'none';
      btn.querySelector('.opt-text').textContent = '---';
    });
  }
};
