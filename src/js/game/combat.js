// 战斗系统 — 答题核心
const Combat = {
  // 检查答案
  checkAnswer(question, userAnswer) {
    const correct = question.answer;
    const type = question.type;

    if (type === 'single') {
      return userAnswer === correct;
    } else if (type === 'multiple') {
      // 多选：排序后比较
      const sortedUser = [...userAnswer].sort();
      const sortedCorrect = [...correct].sort();
      return sortedUser.length === sortedCorrect.length &&
             sortedUser.every((v, i) => v === sortedCorrect[i]);
    } else if (type === 'boolean') {
      return userAnswer === correct;
    } else if (type === 'fill') {
      // 填空：忽略大小写和首尾空格
      return userAnswer.trim().toLowerCase() === correct.trim().toLowerCase();
    }
    return false;
  },

  // 计算伤害（玩家答错时受到的伤害）
  calcDamage(question) {
    const base = { easy: 12, medium: 20, hard: 30 };
    const diff = question.difficulty || 'easy';
    // 随机浮动 ±20%
    const base_dmg = base[diff] || 12;
    return Math.round(base_dmg * (0.8 + Math.random() * 0.4));
  },

  // 计算金币奖励
  calcGold(question) {
    const base = { easy: 8, medium: 15, hard: 25 };
    const diff = question.difficulty || 'easy';
    const base_g = base[diff] || 8;
    return Math.round(base_g * (0.8 + Math.random() * 0.4));
  },

  // 渲染题目 + 选项
  renderQuestion(question, container, onAnswer) {
    const qText = container.querySelector('#question-text');
    const optionsContainer = container.querySelector('#options-container');
    const monsterEmoji = container.querySelector('#monster-emoji');
    const monsterName = container.querySelector('#monster-name');
    const monsterType = container.querySelector('#monster-type');

    qText.textContent = question.question;
    optionsContainer.innerHTML = '';

    // 怪物信息从外部设置
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
        btn.innerHTML = `<span class="opt-letter">${letter}</span><span class="opt-text">${opt.replace(/^[A-D]\.\s*/, '')}</span>`;
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
      // 开放题：文本输入框
      const textarea = document.createElement('textarea');
      textarea.className = 'open-answer-input';
      textarea.placeholder = '请输入你的答案...（尽量用自己的话完整解释）';
      textarea.rows = 6;
      optionsContainer.appendChild(textarea);

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
    }
  },

  // 开放题关键词判分
  gradeOpenAnswer(question, userAnswer) {
    const keywords = question.answer || [];
    const answerLower = userAnswer.toLowerCase();
    let matched = [];
    let missed = [];

    keywords.forEach(kw => {
      // 关键词转小写，检查是否出现在答案中
      const kwLower = kw.toLowerCase();
      // 简单匹配：检查关键词的核心词
      if (answerLower.includes(kwLower)) {
        matched.push(kw);
      } else {
        missed.push(kw);
      }
    });

    const minKeywords = question.min_keywords || 3;
    const score = matched.length / keywords.length;
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

  // 显示答题反馈
  showFeedback(container, question, isCorrect, onNext) {
    const feedbackBox = container.querySelector('#feedback-box');
    const feedbackTitle = container.querySelector('#feedback-title');
    const feedbackExp = container.querySelector('#feedback-explanation');
    const optionsContainer = container.querySelector('#options-container');

    // 高亮正确/错误选项
    const optionBtns = optionsContainer.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
      btn.disabled = true;
      const letter = btn.dataset.letter;
      if (letter === question.answer ||
          (Array.isArray(question.answer) && question.answer.includes(letter))) {
        btn.classList.add('correct');
      } else if (btn.classList.contains('selected') ||
                 (btn.dataset.userSelected && letter === btn.dataset.userSelected)) {
        btn.classList.add('wrong');
      }
    });

    feedbackBox.style.display = 'block';
    if (isCorrect) {
      feedbackTitle.innerHTML = '✅ 答对了！';
      feedbackTitle.className = 'feedback-title correct';
    } else {
      feedbackTitle.innerHTML = '❌ 答错了...';
      feedbackTitle.className = 'feedback-title wrong';
    }
    feedbackExp.innerHTML = question.explanation || '';

    const nextBtn = container.querySelector('#btn-next');
    nextBtn.onclick = onNext;
  }
};
