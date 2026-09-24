// 题牢 · 考核模式逻辑（V1）
// 依赖：window.QUESTION_BANKS（questions.js）+ 本地 judge 服务（http://127.0.0.1:8787/judge）
(function () {
  'use strict';

  // judge 地址跟随页面 host（本机 127.0.0.1 / Tailscale 100.x.x.x 自动适配）
  const JUDGE_PORT = 8787;
  const JUDGE_URL = `http://${location.hostname || '127.0.0.1'}:${JUDGE_PORT}/judge`;
  const STORE_KEY = 'quizgeon_exam_history';

  const $ = (id) => document.getElementById(id);
  const state = {
    bankId: null,
    questions: [],       // 本次考核题目（含变式后题干）
    idx: 0,
    timer: null,
    timeLeft: 0,
    results: [],         // {q, ok(0/1/partial), pointsScore, pointsMax, userAnswer, weakTags, judged}
    startedAt: 0,
    selectedOpt: null,
  };

  // ---------- 初始化题库选择 ----------
  function initBankSelect() {
    const sel = $('bank-select');
    sel.innerHTML = '';
    const banks = window.QUESTION_BANKS || {};
    Object.keys(banks).forEach((id) => {
      const b = banks[id];
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = `${b.emoji || ''} ${b.name}（${b.questionCount || b.questions.length}题）`;
      sel.appendChild(opt);
    });
    if (!banks['llm-interview']) {
      $('config-info').textContent = '⚠️ 未找到 llm-interview 题库，请先运行 build 脚本生成 questions.js';
    }
    // 默认选中「大模型面试」题库
    if (banks['llm-interview']) {
      sel.value = 'llm-interview';
    }
    updateConfigInfo();
  }

  function updateConfigInfo() {
    const banks = window.QUESTION_BANKS || {};
    const b = banks[$('bank-select').value];
    if (!b) return;
    const counts = { single: 0, boolean: 0, open: 0, multiple: 0, fill: 0 };
    b.questions.forEach((q) => { counts[q.type] = (counts[q.type] || 0) + 1; });
    $('config-info').textContent = `${b.description || ''} ｜ 题型构成：单选 ${counts.single} / 判断 ${counts.boolean} / 简答 ${counts.open}`;
  }

  // ---------- 开始考核 ----------
  function startExam() {
    const banks = window.QUESTION_BANKS || {};
    const b = banks[$('bank-select').value];
    if (!b) return;
    const count = parseInt($('count-select').value, 10);
    const useVariant = $('variant-select').value === '1';

    let pool = b.questions.slice();
    // 随机打乱
    pool.sort(() => Math.random() - 0.5);
    if (count > 0) pool = pool.slice(0, count);

    state.bankId = b.id;
    state.questions = pool.map((q) => {
      const copy = JSON.parse(JSON.stringify(q));
      if (useVariant && Array.isArray(q.variants) && q.variants.length > 0) {
        copy.question = q.variants[Math.floor(Math.random() * q.variants.length)];
        copy._variant = true;
      }
      return copy;
    });
    state.idx = 0;
    state.results = [];
    state.startedAt = Date.now();

    const secs = parseInt($('time-select').value, 10);
    state.timeLeft = secs;

    $('config').classList.add('hidden');
    $('quiz').classList.remove('hidden');
    $('report').style.display = 'none';

    if (secs > 0) {
      state.timer = setInterval(() => {
        state.timeLeft -= 1;
        if (state.timeLeft <= 0) {
          clearInterval(state.timer);
          finishExam(true);
        } else {
          $('timer').textContent = fmtTime(state.timeLeft);
        }
      }, 1000);
    } else {
      $('timer').textContent = '';
    }
    renderQuestion();
  }

  function fmtTime(s) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, '0')}`;
  }

  // ---------- 渲染题目 ----------
  function renderQuestion() {
    const q = state.questions[state.idx];
    const total = state.questions.length;
    $('q-progress').textContent = `第 ${state.idx + 1} / ${total} 题`;
    $('q-type').textContent = typeName(q.type) + (q._variant ? '（变式）' : '');
    $('q-text').textContent = q.question;
    $('judge-status').textContent = '';
    $('judge-result').innerHTML = '';
    state.selectedOpt = null;

    renderAnswerCard();
    renderTags(q);

    const optBox = $('q-options');
    const openBox = $('q-open');
    optBox.innerHTML = '';
    openBox.classList.add('hidden');
    $('btn-skip').classList.remove('hidden');

    if (q.type === 'single' || q.type === 'multiple') {
      const options = q.options || [];
      options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'opt';
        div.textContent = opt;
        div.addEventListener('click', () => {
          if (q.type === 'single') {
            optBox.querySelectorAll('.opt').forEach((el) => el.classList.remove('selected'));
            div.classList.add('selected');
            state.selectedOpt = String.fromCharCode(65 + i); // A/B/C/D
          } else {
            div.classList.toggle('selected');
          }
        });
        optBox.appendChild(div);
      });
    } else if (q.type === 'boolean') {
      ['正确', '错误'].forEach((txt, i) => {
        const div = document.createElement('div');
        div.className = 'opt';
        div.textContent = txt;
        div.addEventListener('click', () => {
          optBox.querySelectorAll('.opt').forEach((el) => el.classList.remove('selected'));
          div.classList.add('selected');
          state.selectedOpt = i === 0 ? 'true' : 'false';
        });
        optBox.appendChild(div);
      });
    } else {
      // open：文本框
      openBox.classList.remove('hidden');
      $('open-answer').value = '';
    }

    $('btn-submit').disabled = false;
    $('btn-submit').textContent = '提交';
  }

  function typeName(t) {
    return { single: '单选', multiple: '多选', boolean: '判断', open: '简答', fill: '填空' }[t] || t;
  }

  // ---------- 答题卡 ----------
  function renderAnswerCard() {
    const box = $('answer-card');
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    const typeMark = { single: '单', multiple: '多', boolean: '判', open: '简' };
    state.questions.forEach((q, i) => {
      const cell = document.createElement('div');
      cell.className = 'card-cell';
      cell.textContent = String(i + 1);
      const mk = document.createElement('span');
      mk.className = 'type-mark';
      mk.textContent = typeMark[q.type] || '?';
      cell.appendChild(mk);
      if (i === state.idx) cell.classList.add('current');
      const res = state.results[i];
      if (res) {
        if (res.ok === 1) cell.classList.add('done-correct');
        else if (res.userAnswer === '(跳过)') cell.classList.add('skipped');
        else cell.classList.add('done-wrong');
      }
      cell.addEventListener('click', () => jumpTo(i));
      grid.appendChild(cell);
    });
    box.innerHTML = '';
    box.appendChild(grid);
  }

  function jumpTo(i) {
    if (i < 0 || i >= state.questions.length) return;
    state.idx = i;
    renderQuestion();
  }

  // ---------- 标签展示 ----------
  function renderTags(q) {
    const box = $('q-tags');
    let html = '';
    if (q.week) html += `<span class="tag-badge tag-week">📅 ${q.week}</span>`;
    if (q.project && q.project !== 'none') html += `<span class="tag-badge tag-project">📦 ${q.project}</span>`;
    if (q.stack) html += `<span class="tag-badge tag-stack">⚙️ ${q.stack}</span>`;
    box.innerHTML = html;
  }

  // ---------- 提交 ----------
  function submitAnswer() {
    const q = state.questions[state.idx];
    const r = { q, ok: 0, pointsScore: 0, pointsMax: q.points ? q.points.length : 0, userAnswer: '', weakTags: q.tags || [], judged: false };

    if (q.type === 'single' || q.type === 'boolean') {
      if (state.selectedOpt === null) { alert('请先作答'); return; }
      r.userAnswer = state.selectedOpt;
      const correct = String(q.answer);
      r.ok = (state.selectedOpt === correct) ? 1 : 0;
      showResult(r, false);
      next(r);
    } else {
      // open：LLM 判分
      const ans = $('open-answer').value.trim();
      if (!ans) { alert('请输入答案'); return; }
      r.userAnswer = ans;
      r.judged = true;
      $('btn-submit').disabled = true;
      $('judge-status').textContent = '⏳ LLM 判分中…（需本地 judge 服务 127.0.0.1:8787）';
      fetch(JUDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q.question, points: q.points || [], user_answer: ans }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          r.pointsScore = data.score || 0;
          const max = data.max_score || r.pointsMax || 1;
          r.pointsMax = max;
          r.ok = r.pointsScore / Math.max(max, 1) >= 0.8 ? 1 : 0;
          renderJudgeResult(data);
          next(r);
        })
        .catch((err) => {
          $('judge-status').textContent = `❌ 判分失败：${err.message}（请启动 judge 服务）`;
          // 降级：无法判分时算未判，继续流程
          r.judged = false;
          r.ok = 0;
          showResult(r, true);
          $('btn-submit').disabled = false;
          $('btn-skip').classList.remove('hidden');
        });
    }
  }

  function renderJudgeResult(data) {
    const box = $('judge-result');
    let html = `<div class="points-box"><strong>得分：${data.score} / ${data.max_score}</strong><br>`;
    (data.per_point || []).forEach((p) => {
      html += `<div class="${p.hit ? 'hit' : 'miss'}">${p.hit ? '✅' : '❌'} ${p.point}${p.comment ? ' — ' + p.comment : ''}</div>`;
    });
    if (data.overall_comment) html += `<div style="margin-top:6px;color:#94a3b8;">${data.overall_comment}</div>`;
    html += '</div>';
    box.innerHTML = html;
  }

  function showResult(r, isOpen) {
    // 客观题即时显示对错
    if (!isOpen && (r.q.type === 'single' || r.q.type === 'boolean')) {
      const correct = String(r.q.answer);
      document.querySelectorAll('#q-options .opt').forEach((el, i) => {
        const letter = String.fromCharCode(65 + i);
        if (letter === correct) el.classList.add('correct');
        else if (state.selectedOpt === letter) el.classList.add('wrong');
      });
    }
  }

  function next(r) {
    state.results.push(r);
    state.idx += 1;
    if (state.idx >= state.questions.length) {
      if (state.timer) clearInterval(state.timer);
      finishExam(false);
    } else {
      renderQuestion();
    }
  }

  function skipCurrent() {
    const q = state.questions[state.idx];
    next({ q, ok: 0, pointsScore: 0, pointsMax: q.points ? q.points.length : 0, userAnswer: '(跳过)', weakTags: q.tags || [], judged: false });
  }

  // ---------- 报告 ----------
  function finishExam(timedOut) {
    $('quiz').classList.add('hidden');
    const rep = $('report');
    rep.style.display = 'block';

    const total = state.results.length;
    const objQs = state.results.filter((r) => r.q.type === 'single' || r.q.type === 'boolean');
    const openQs = state.results.filter((r) => r.q.type === 'open');
    const objCorrect = objQs.filter((r) => r.ok === 1).length;
    const pointSum = openQs.reduce((s, r) => s + r.pointsScore, 0);
    const pointMax = openQs.reduce((s, r) => s + r.pointsMax, 0);

    $('r-correct').textContent = objQs.length ? `${Math.round((objCorrect / objQs.length) * 100)}%` : '—';
    $('r-points').textContent = pointMax ? `${pointSum}/${pointMax}` : '—';
    const usedSec = Math.round((Date.now() - state.startedAt) / 1000);
    $('r-time').textContent = fmtTime(usedSec) + (timedOut ? '（超时）' : '');

    // 综合分：客观题 70% + 开放题得分点 30%（开放题未判时只看客观）
    let comp = 0;
    if (objQs.length > 0) comp += 0.7 * (objCorrect / objQs.length);
    if (pointMax > 0) comp += 0.3 * (pointSum / pointMax);
    else comp = comp / 0.7;
    $('r-score').textContent = `${Math.round(comp * 100)}`;

    // 薄弱知识点（错题 tags）
    const wrong = state.results.filter((r) => r.ok !== 1);
    const tagCount = {};
    wrong.forEach((r) => (r.weakTags || []).forEach((t) => { tagCount[t] = (tagCount[t] || 0) + 1; }));
    const weakTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 8);
    $('r-weak').innerHTML = weakTags.length
      ? weakTags.map(([t, c]) => `<span class="tag">${t} ×${c}</span>`).join('')
      : '无（本次全对 🎉）';

    // 按三类标签聚合薄弱点
    const agg = (field, label) => {
      const m = {};
      wrong.forEach((r) => {
        const v = r.q[field];
        if (v && v !== 'none') m[v] = (m[v] || 0) + 1;
      });
      const arr = Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 10);
      $('r-weak-' + label).innerHTML = arr.length
        ? arr.map(([v, c]) => `<span class="tag">${v} ×${c}</span>`).join('')
        : '—';
    };
    agg('week', 'week');
    agg('project', 'project');
    agg('stack', 'stack');

    // 错题回顾
    const wrongBox = $('r-wrong');
    wrongBox.innerHTML = '';
    wrong.forEach((r) => {
      const div = document.createElement('div');
      div.className = 'wrong-item';
      let html = `<div class="q"><strong>${r.q.question}</strong></div>`;
      if (r.q.type === 'single' || r.q.type === 'boolean') {
        const ans = r.q.answer === 'true' ? '正确' : r.q.answer === 'false' ? '错误' : r.q.answer;
        html += `<div class="a">正确答案：${ans}${r.q.explanation ? ' ｜ ' + r.q.explanation.split('\n')[0] : ''}</div>`;
      } else if (r.q.type === 'open') {
        html += `<div class="a">得分点：${(r.pointsScore || 0)}/${(r.pointsMax || 0)}</div>`;
      }
      div.innerHTML = html;
      wrongBox.appendChild(div);
    });

    // 存历史（分数曲线数据）
    saveHistory({ ts: Date.now(), bank: state.bankId, total, correct: total - wrong.length, comp: Math.round(comp * 100) });
  }

  function saveHistory(rec) {
    try {
      const hist = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
      hist.push(rec);
      if (hist.length > 100) hist.splice(0, hist.length - 100);
      localStorage.setItem(STORE_KEY, JSON.stringify(hist));
    } catch (e) { /* ignore */ }
  }

  // ---------- 事件绑定 ----------
  $('btn-start').addEventListener('click', startExam);
  $('btn-submit').addEventListener('click', submitAnswer);
  $('btn-skip').addEventListener('click', skipCurrent);
  $('btn-again').addEventListener('click', () => {
    $('report').style.display = 'none';
    $('config').classList.remove('hidden');
  });
  $('btn-back').addEventListener('click', () => {
    $('report').style.display = 'none';
    $('config').classList.remove('hidden');
  });
  $('bank-select').addEventListener('change', updateConfigInfo);

  initBankSelect();
})();
