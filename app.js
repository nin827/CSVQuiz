'use strict';

/* ============================================================
   Localization (i18n)
   English defaults are embedded so the app still renders when
   data/_localization.csv cannot be fetched (e.g. opened via file://).
   When served over HTTP the CSV is fetched and overlaid on top.
   ============================================================ */
const STRINGS_EN = {
  app_title: 'Practice quiz',
  upload_sub: 'Load a CSV to get started. Questions are shuffled every session.',
  catalog_heading: 'Choose a quiz',
  catalog_loading: 'Loading quizzes...',
  divider_or: 'or',
  drop_hint: 'Drop your CSV here or click to browse',
  columns_hint: 'Columns: domain, subdomain, difficulty, description, explanation, correct, point, choice0 ... choice9',
  load_sample: 'Load sample CSV to try it out',
  error_prefix: 'Error: ',
  config_title: 'Configure quiz',
  questions_loaded: '{n} questions loaded',
  mode_standard: 'Standard',
  mode_survival: 'Survival',
  standard_mode_label: 'Standard mode',
  survival_mode_label: 'Survival mode - goes until questions run out or limit is hit',
  num_questions: 'Number of questions',
  time_limit_min: 'Time limit (minutes)',
  surv_lives: 'Lives',
  surv_time: 'Time',
  starting_lives: 'Starting lives',
  difficulty: 'Difficulty',
  diff_beginner: 'Beginner',
  diff_easy: 'Easy',
  diff_medium: 'Medium',
  diff_hard: 'Hard',
  diff_expert: 'Expert',
  domains: 'Domains',
  select_all: 'Select all',
  clear: 'Clear',
  load_different: '<- Load different file',
  start_quiz: 'Start quiz',
  no_match_filter: 'No questions match the selected filters.',
  quit: 'Quit',
  multi_hint: 'Select all that apply',
  show_hint: 'Show hint',
  calc_label: 'Calculator',
  calc_placeholder: 'e.g. (2 + 3) * 4^2',
  calc_help: 'Supports + - * / ^ ( ) and log, ln, e, pi',
  calc_error: 'Invalid expression',
  debug_button: 'debug',
  debug_title: 'Verify questions',
  debug_remaining: '{n} unverified left',
  debug_verify: 'Verify & next',
  debug_void: 'Void & next',
  debug_skip: 'Skip',
  debug_exit: 'Exit',
  debug_done: 'All questions reviewed!',
  debug_save_error: 'Could not save - is dev_server.py running?',
  debug_answer: 'Correct answer',
  check_answer: 'Check answer',
  question_n_of_total: 'Question {n} of {total}',
  question_n: 'Question {n}',
  next_question: 'Next question ->',
  see_results: 'See results ->',
  next_short: 'Next ->',
  pts_suffix: 'pts',
  no_limit: 'No limit',
  survival_label: 'Survival',
  fb_correct: 'Correct!',
  fb_partial: 'Partially correct.',
  fb_incorrect: 'Incorrect.',
  summary_complete: 'Quiz complete',
  summary_times_up: "Time's up!",
  summary_no_lives: 'No lives left!',
  summary_quit: 'Quiz ended',
  summary_line: '{correct}/{answered} correct ({pct}%) - {label}',
  label_excellent: 'Excellent work!',
  label_good: 'Good job!',
  label_keep: 'Keep practicing.',
  label_review: 'More review needed.',
  results_by_domain: 'Results by domain',
  play_again: 'Play again (reshuffled)',
  change_settings: 'Change settings',
  load_new_csv: 'Load new CSV',
  err_missing_column: 'Missing required column: {col}',
  err_no_questions: 'No valid questions found.',
  err_load_failed: 'Could not load that quiz.',
  home_builtin_title: 'Use premade quiz',
  home_builtin_desc: 'Pick from ready-made question sets',
  home_builtin_unavailable: 'Run on a web server to use these',
  home_custom_title: 'Load your own CSV',
  home_custom_desc: 'Upload a CSV of your own questions',
  catalog_sub: 'Pick one of the built-in question sets.',
  back: 'Back',
  help_link: 'How should my CSV look?',
  help_title: 'How to format your CSV',
  help_intro: 'Each row is one question. Only domain, description, correct and choice0 are required.',
  help_col_header: 'Column',
  help_meaning_header: 'Meaning',
  help_domain: 'Top-level category (used for filtering and the score breakdown)',
  help_subdomain: 'Optional finer category shown as a badge',
  help_difficulty: 'beginner / easy / medium / hard / expert',
  help_description: 'The question text',
  help_explanation: 'Shown in feedback after answering',
  help_hint: "Optional hint or formula reminder; a 'Show hint' button appears",
  help_calculator: "Set to 'true' to show a calculator on the question (+ - * / ^ ( ), log, ln, e, pi)",
  help_latex_note: 'Wrap math in dollar signs to typeset it, e.g. $\\frac{1}{2}$ or $x^2$.',
  help_correct: 'Index(es) of the correct choice(s), e.g. 0 or 013 for multi-answer',
  help_point: 'Points for a fully-correct answer (default 10)',
  help_choices: 'Answer choices choice0 ... choice9 (at least two)',
  help_multi_note: "A correct value with more than one digit (like 013) becomes a 'select all that apply' question.",
  help_example_heading: 'Example'
};

let STRINGS = Object.assign({}, STRINGS_EN);

function t(key, params) {
  let s = (STRINGS[key] != null) ? STRINGS[key] : (STRINGS_EN[key] != null ? STRINGS_EN[key] : key);
  if (params) {
    for (const k in params) s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
  }
  return s;
}

// Apply translations to all elements carrying a data-i18n attribute.
function applyStaticText() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.title = t('app_title');
}

// Typeset any $...$ / $$...$$ LaTeX inside an element using KaTeX, if loaded.
// Falls back to the raw text (unchanged) when KaTeX is unavailable.
function renderMath(el) {
  if (!el || typeof window.renderMathInElement !== 'function') return;
  try {
    window.renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  } catch (e) { /* leave raw text on failure */ }
}

/* ============================================================
   Calculator — a tiny safe expression evaluator (no eval()).
   Supports + - * / ^ ( ) , the constants e and pi, and the
   functions ln(x), log(x) [base 10], log(x, b) [base b].
   ============================================================ */
function calcEval(expr) {
  const s = expr;
  const toks = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === ' ' || c === '\t') { i++; continue; }
    if ('+-*/^(),'.includes(c)) { toks.push({ t: 'op', v: c }); i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      toks.push({ t: 'num', v: parseFloat(s.slice(i, j)) }); i = j; continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
      toks.push({ t: 'id', v: s.slice(i, j).toLowerCase() }); i = j; continue;
    }
    throw new Error('bad character');
  }
  let p = 0;
  const peek = () => toks[p];
  const eat = (v) => { const tk = toks[p]; if (!tk || (v !== undefined && tk.v !== v)) throw new Error('syntax'); p++; return tk; };
  function parseExpr() {
    let v = parseTerm();
    while (peek() && (peek().v === '+' || peek().v === '-')) { const op = eat().v; const r = parseTerm(); v = op === '+' ? v + r : v - r; }
    return v;
  }
  function parseTerm() {
    let v = parseUnary();
    while (peek() && (peek().v === '*' || peek().v === '/')) { const op = eat().v; const r = parseUnary(); v = op === '*' ? v * r : v / r; }
    return v;
  }
  function parseUnary() {
    const tk = peek();
    if (tk && (tk.v === '+' || tk.v === '-')) { eat(); const r = parseUnary(); return tk.v === '-' ? -r : r; }
    return parsePower();
  }
  function parsePower() {
    const base = parseAtom();
    if (peek() && peek().v === '^') { eat('^'); const exp = parseUnary(); return Math.pow(base, exp); }
    return base;
  }
  function parseAtom() {
    const tk = peek();
    if (!tk) throw new Error('unexpected end');
    if (tk.t === 'num') { eat(); return tk.v; }
    if (tk.v === '(') { eat('('); const v = parseExpr(); eat(')'); return v; }
    if (tk.t === 'id') {
      eat();
      if (tk.v === 'pi') return Math.PI;
      if (tk.v === 'e') return Math.E;
      if (tk.v === 'ln' || tk.v === 'log') {
        eat('(');
        const a = parseExpr();
        let res;
        if (peek() && peek().v === ',') { eat(','); const b = parseExpr(); res = Math.log(a) / Math.log(b); }
        else res = tk.v === 'ln' ? Math.log(a) : Math.log10(a);
        eat(')');
        return res;
      }
      throw new Error('unknown name: ' + tk.v);
    }
    throw new Error('syntax');
  }
  const result = parseExpr();
  if (p !== toks.length) throw new Error('trailing input');
  if (!isFinite(result)) throw new Error('not a finite number');
  return result;
}

function fmtCalc(x) {
  if (Number.isInteger(x)) return String(x);
  return String(parseFloat(x.toPrecision(10)));
}

/* ============================================================
   Embedded sample (file:// fallback only — over HTTP the catalog
   provides the same content as one of the bundled CSVs).
   ============================================================ */
const SAMPLE_CSV = `domain,subdomain,difficulty,description,explanation,correct,point,choice0,choice1,choice2,choice3
Science,Biology,Easy,The powerhouse of the cell is responsible for producing ATP through cellular respiration.,Mitochondria generate ATP through oxidative phosphorylation during cellular respiration.,0,10,Mitochondria,Nucleus,Ribosome,Golgi apparatus
Science,Physics,Medium,Which of the following are Newton's laws of motion? Select all that apply.,Newton's three laws are: inertia (1st), F=ma (2nd), and equal/opposite reactions (3rd).,013,20,An object in motion stays in motion unless acted upon by a force,Objects attract each other proportionally to mass,For every action there is an equal and opposite reaction,F = ma
History,World,Easy,The Renaissance period is commonly considered to have begun in which country.,"The Renaissance (meaning 'rebirth') began in Italian city-states like Florence and Venice in the 14th century.",2,10,France,England,Italy,Spain
Science,Chemistry,Hard,Which particles are found in the nucleus of an atom? Select all that apply.,The nucleus contains protons (positive) and neutrons (neutral). Electrons orbit outside the nucleus.,01,30,Protons,Neutrons,Electrons,Photons
Geography,World,Medium,What is the longest river in the world?,The Nile River stretches approximately 6650 km through northeastern Africa.,1,15,Amazon,Nile,Yangtze,Mississippi`;

/* ============================================================
   State
   ============================================================ */
let allQuestions = [], sessionQuestions = [], current = 0, totalPoints = 0, earnedPoints = 0;
let answered = false, selected = new Set(), domainStats = {};
let mode = 'standard', survType = 'lives', lives = 5, startingLives = 5, timerSec = 0, timerInterval = null;
let selectedDiffs = new Set(['beginner', 'easy']);
let survivalRunning = false;
let quizSource = 'builtin'; // 'builtin' shows the quiz picker on the config screen; 'custom' hides it

function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a }

/* ============================================================
   CSV parsing
   ============================================================ */
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const req = ['domain', 'description', 'correct', 'choice0'];
  for (const r of req) if (!headers.includes(r)) throw new Error(t('err_missing_column', { col: r }));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cols = parseLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => obj[h] = (cols[idx] || '').trim());
    const choices = [];
    for (let c = 0; c <= 9; c++) {
      const v = obj[`choice${c}`];
      if (v && v.length > 0) choices.push({ text: v, origIdx: String(c) });
    }
    if (choices.length < 2) continue;
    const correctSet = new Set((obj.correct || '').split('').filter(x => /[0-9]/.test(x)));
    const p = parseInt(obj.point, 10);
    rows.push({
      domain: (obj.domain || '').toLowerCase(),
      subdomain: (obj.subdomain || '').toLowerCase(),
      difficulty: (obj.difficulty || 'easy').toLowerCase(),
      description: obj.description || '',
      explanation: obj.explanation || '',
      hint: obj.hint || '',
      calculator: /^(true|1|yes)$/i.test(obj.calculator || ''),
      verified: (v => v === '' ? null : /^(true|1|yes)$/i.test(v))((obj.verified || '').trim()),
      correctSet, choices,
      point: Number.isFinite(p) ? p : 10
    });
  }
  if (rows.length === 0) throw new Error(t('err_no_questions'));
  return rows;
}

function parseLine(line) {
  const result = []; let cur = ''; let inQ = false;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') { inQ = !inQ; }
    else if (line[i] === ',' && !inQ) { result.push(cur); cur = ''; }
    else cur += line[i];
  }
  result.push(cur); return result;
}

/* ============================================================
   Data loading (localization + catalog)

   Read a file from data/ by HTTP fetch when possible (so live edits show
   up on a server), and fall back to the offline bundle in data.js (built by
   build_data.py) so premade quizzes also work when index.html is opened
   directly from file://, where browsers block fetch().
   ============================================================ */
async function loadText(path) {
  try {
    const res = await fetch(path);
    if (res.ok) return await res.text();
  } catch (e) { /* fetch blocked (file://) or network error — use the bundle */ }
  const name = path.replace(/^data\//, '');
  const bundle = window.CSVQUIZ_DATA;
  if (bundle && bundle[name] != null) return bundle[name];
  return null;
}

async function loadLocalization() {
  const text = await loadText('data/_localization.csv');
  if (text == null) return; // keep embedded English
  const lines = text.trim().split(/\r?\n/);
  const overlay = {};
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cols = parseLine(lines[i]);
    const key = (cols[0] || '').trim();
    if (key) overlay[key] = (cols[1] !== undefined ? cols[1] : ''); // value not trimmed — trailing spaces can be significant
  }
  STRINGS = Object.assign({}, STRINGS_EN, overlay);
  applyStaticText();
}

async function loadCatalog() {
  const builtinBtn = document.getElementById('btnUseBuiltin');
  const text = await loadText('data/_manifest.csv');
  const groups = text != null ? parseManifest(text) : [];
  if (groups.length === 0) {
    // No catalog at all (data.js missing and no server) — only custom upload works.
    builtinBtn.disabled = true;
    document.getElementById('builtinDesc').textContent = t('home_builtin_unavailable');
    return;
  }
  renderCatalog(groups);
  builtinBtn.disabled = false;
}

// Parse the manifest CSV (header: name,file) into one entry per quiz name.
// Rows sharing a name are merged, so a domain can be split across several files
// (e.g. math.csv, math_00.csv, math_01.csv all listed as "Math").
function parseManifest(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0].split(',').map(h => h.trim().toLowerCase());
  const ni = header.indexOf('name'), fi = header.indexOf('file');
  const order = [];
  const byName = new Map();
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cols = parseLine(lines[i]);
    const file = (cols[fi] || '').trim();
    if (!file) continue;
    const name = (cols[ni] || '').trim() || file;
    if (!byName.has(name)) { byName.set(name, []); order.push(name); }
    byName.get(name).push(file);
  }
  return order.map(name => ({ name, files: byName.get(name) }));
}

function renderCatalog(groups) {
  const box = document.getElementById('catalog');
  box.innerHTML = '';
  groups.forEach(g => {
    const btn = document.createElement('button');
    btn.className = 'catalog-btn';
    btn.innerHTML = `<i class="ti ti-cards" aria-hidden="true"></i><span>${g.name}</span>`;
    btn.addEventListener('click', () => {
      box.querySelectorAll('.catalog-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizSource = 'builtin';
      loadQuizFromFiles(g.files);
    });
    box.appendChild(btn);
  });
}

// Fetch every file for a quiz and merge their questions into one pool.
async function loadQuizFromFiles(files) {
  try {
    let merged = [];
    for (const f of files) {
      const text = await loadText('data/' + f);
      if (text == null) throw new Error('missing ' + f);
      merged = merged.concat(parseCSV(text));
    }
    allQuestions = merged;
    buildConfig();
  } catch (err) {
    showParseError(t('err_load_failed'));
  }
}

function showParseError(msg) {
  const el = document.getElementById('parseError');
  el.textContent = msg;
  el.style.display = 'block';
}

/* ============================================================
   Screens / config
   ============================================================ */
function showScreen(name) {
  document.querySelectorAll('section').forEach(el => { el.classList.remove('active') });
  document.getElementById(`s-${name}`).classList.add('active');
}

function buildConfig() {
  // The quiz picker lives on this screen for premade quizzes; for a custom
  // upload the file itself is the quiz, so the picker is hidden.
  document.getElementById('quizPickCard').style.display = quizSource === 'builtin' ? '' : 'none';
  // Domain is already determined by the quiz, so questions are filtered by
  // difficulty only — there is no domain filter.
  document.getElementById('cfgSub').textContent = t('questions_loaded', { n: allQuestions.length });
  showScreen('config');
}

function getFilteredQuestions() {
  return allQuestions.filter(q =>
    selectedDiffs.size === 0 || selectedDiffs.has(q.difficulty)
  );
}

function startStandard() {
  const count = Math.max(1, parseInt(document.getElementById('cfgCount').value) || 10);
  const mins = Math.max(1, parseInt(document.getElementById('cfgTime').value) || 10);
  const pool = shuffle(getFilteredQuestions());
  if (pool.length === 0) { showWarning(t('no_match_filter')); return; }
  sessionQuestions = pool.slice(0, Math.min(count, pool.length));
  mode = 'standard';
  initSession(mins * 60);
}

function startSurvival() {
  survType = document.querySelector('input[name=survType]:checked').value;
  const pool = shuffle(getFilteredQuestions());
  if (pool.length === 0) { showWarning(t('no_match_filter')); return; }
  sessionQuestions = [...pool];
  mode = 'survival';
  if (survType === 'lives') {
    lives = Math.max(1, parseInt(document.getElementById('cfgLives').value) || 5);
    startingLives = lives;
    initSession(0);
  } else {
    const mins = Math.max(1, parseInt(document.getElementById('cfgSurvTime').value) || 5);
    initSession(mins * 60);
  }
}

function showWarning(msg) {
  const el = document.getElementById('cfgWarning');
  el.textContent = msg; el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 3000);
}

function initSession(secs) {
  current = 0; earnedPoints = 0; totalPoints = sessionQuestions.reduce((a, q) => a + q.point, 0);
  domainStats = {}; answered = false; selected = new Set(); survivalRunning = true;
  timerSec = secs;
  clearInterval(timerInterval);
  if (timerSec > 0) {
    timerInterval = setInterval(() => {
      timerSec--;
      renderHUD();
      if (timerSec <= 0) { clearInterval(timerInterval); endSession('time'); }
    }, 1000);
  }
  showScreen('quiz');
  renderQuestion();
}

function fmtTime(s) {
  const m = Math.floor(s / 60); const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, '0')}`;
}

function renderHUD() {
  const hud = document.getElementById('hud');
  let html = '';
  if (mode === 'survival' && survType === 'lives') {
    const full = '♥'.repeat(Math.max(0, lives));
    const empty = '♡'.repeat(Math.max(0, startingLives - lives));
    html += `<div class="hud-item"><i class="ti ti-heart" aria-hidden="true"></i> <strong class="hearts">${full}${empty}</strong></div>`;
  }
  if (timerSec > 0 || mode === 'standard') {
    const warn = timerSec > 0 && timerSec <= 60;
    html += `<div class="hud-item hud-timer${warn ? ' warning' : ''}"><i class="ti ti-clock" aria-hidden="true"></i> <strong>${timerSec > 0 ? fmtTime(timerSec) : t('no_limit')}</strong></div>`;
  }
  html += `<div class="hud-item"><i class="ti ti-star" aria-hidden="true"></i> <strong>${earnedPoints} ${t('pts_suffix')}</strong></div>`;
  if (mode === 'survival') {
    html += `<div class="hud-item"><i class="ti ti-infinity" aria-hidden="true"></i> <strong>${t('survival_label')}</strong></div>`;
  }
  hud.innerHTML = html;
}

function diffClass(d) {
  if (d === 'beginner') return 'diff-beginner';
  if (d === 'easy') return 'diff-easy';
  if (d === 'hard') return 'diff-hard';
  if (d === 'expert') return 'diff-expert';
  return 'diff-medium';
}

function renderQuestion() {
  if (current >= sessionQuestions.length) { endSession('complete'); return; }
  const q = sessionQuestions[current];
  answered = false; selected = new Set();
  const isMulti = q.correctSet.size > 1;
  const total = sessionQuestions.length;
  const pct = mode === 'survival' ? ((current / Math.max(1, total)) * 100) : ((current / total) * 100);
  document.getElementById('progressFill').style.width = `${pct}%`;
  document.getElementById('qCount').textContent = mode === 'survival'
    ? t('question_n', { n: current + 1 })
    : t('question_n_of_total', { n: current + 1, total });
  document.getElementById('qMeta').innerHTML =
    `<span class="badge domain">${q.domain}</span>` +
    (q.subdomain ? `<span class="badge sub">${q.subdomain}</span>` : '') +
    (q.difficulty ? `<span class="badge ${diffClass(q.difficulty)}">${q.difficulty}</span>` : '') +
    `<span class="badge pts"><i class="ti ti-star" style="font-size:11px" aria-hidden="true"></i>${q.point} ${t('pts_suffix')}</span>`;
  const qText = document.getElementById('qText');
  qText.textContent = q.description;
  renderMath(qText);
  document.getElementById('multiHint').style.display = isMulti ? 'block' : 'none';
  // Hint: show the toggle only when this question has one; collapse it each time.
  const hintBtn = document.getElementById('btnHint');
  const hintBox = document.getElementById('hintBox');
  hintBox.style.display = 'none';
  if (q.hint) {
    hintBtn.style.display = '';
    hintBox.textContent = q.hint;
  } else {
    hintBtn.style.display = 'none';
    hintBox.textContent = '';
  }
  // Calculator: show the scratchpad only when this question opts in.
  const calcBox = document.getElementById('calcBox');
  calcBox.style.display = q.calculator ? 'block' : 'none';
  if (q.calculator) {
    document.getElementById('calcInput').value = '';
    document.getElementById('calcResult').textContent = '';
    document.getElementById('calcResult').className = 'calc-result';
  }
  const labels = 'ABCDEFGHIJ';
  const container = document.getElementById('choices');
  container.innerHTML = '';
  q.choices.forEach((ch, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    const label = document.createElement('span');
    label.className = 'choice-label';
    label.textContent = labels[idx];
    const txt = document.createElement('span');
    txt.textContent = ch.text;
    btn.append(label, txt);
    btn.addEventListener('click', () => toggleChoice(idx, isMulti));
    container.appendChild(btn);
  });
  renderMath(container);
  const fb = document.getElementById('feedback');
  fb.style.display = 'none'; fb.className = 'feedback'; fb.innerHTML = '';
  document.getElementById('btnSubmit').disabled = true;
  document.getElementById('btnSubmit').textContent = t('check_answer');
  renderHUD();
}

function toggleChoice(idx, isMulti) {
  if (answered) return;
  if (!isMulti) { selected.clear(); selected.add(idx); document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected')); }
  else { if (selected.has(idx)) selected.delete(idx); else selected.add(idx); }
  document.querySelectorAll('.choice-btn').forEach((b, i) => b.classList.toggle('selected', selected.has(i)));
  document.getElementById('btnSubmit').disabled = selected.size === 0;
}

function checkAnswer() {
  if (answered || selected.size === 0) return;
  answered = true;
  const q = sessionQuestions[current];
  const btns = document.querySelectorAll('.choice-btn');
  const correctPositions = new Set();
  q.choices.forEach((ch, i) => { if (q.correctSet.has(ch.origIdx)) correctPositions.add(i); });
  let allRight = true;
  selected.forEach(i => { if (!correctPositions.has(i)) allRight = false; });
  correctPositions.forEach(i => { if (!selected.has(i)) allRight = false; });
  const partialCredit = [...selected].some(i => correctPositions.has(i)) && !allRight;
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (correctPositions.has(i) && selected.has(i)) btn.className = 'choice-btn correct';
    else if (selected.has(i) && !correctPositions.has(i)) btn.className = 'choice-btn wrong';
    else if (correctPositions.has(i) && !selected.has(i)) btn.className = 'choice-btn missed';
    else btn.className = 'choice-btn';
  });
  if (!domainStats[q.domain]) domainStats[q.domain] = { correct: 0, total: 0, points: 0, maxPoints: 0 };
  domainStats[q.domain].total++;
  domainStats[q.domain].maxPoints += q.point;
  if (allRight) {
    earnedPoints += q.point;
    domainStats[q.domain].correct++;
    domainStats[q.domain].points += q.point;
  } else if (mode === 'survival' && survType === 'lives') {
    lives--;
    if (lives <= 0) {
      renderHUD();
      showFeedback(q, allRight, partialCredit);
      document.getElementById('btnSubmit').textContent = t('next_short');
      document.getElementById('btnSubmit').disabled = false;
      return;
    }
  }
  renderHUD();
  showFeedback(q, allRight, partialCredit);
  document.getElementById('btnSubmit').textContent = current + 1 >= sessionQuestions.length ? t('see_results') : t('next_question');
  document.getElementById('btnSubmit').disabled = false;
}

function showFeedback(q, allRight, partial) {
  const fb = document.getElementById('feedback');
  fb.style.display = 'block';
  let cls = allRight ? 'correct' : (partial ? 'partial' : 'wrong');
  let heading = allRight ? t('fb_correct') : (partial ? t('fb_partial') : t('fb_incorrect'));
  let body = '';
  if (!allRight && q.explanation) {
    body = `<br><span style="opacity:.85">${q.explanation}</span>`;
  } else if (allRight && q.explanation) {
    body = `<span style="opacity:.75"> — ${q.explanation}</span>`;
  }
  const pts = allRight ? `<span style="float:right;font-weight:500">+${q.point} ${t('pts_suffix')}</span>` : '';
  fb.className = `feedback ${cls}`;
  fb.innerHTML = `${pts}<strong>${heading}</strong>${body}`;
  renderMath(fb);
}

function endSession(reason) {
  clearInterval(timerInterval); survivalRunning = false;
  const total = sessionQuestions.length;
  const answered_count = Math.min(current + (answered ? 1 : 0), total);
  const correct = Object.values(domainStats).reduce((a, d) => a + d.correct, 0);
  const pct = answered_count > 0 ? Math.round((correct / answered_count) * 100) : 0;
  let title = t('summary_complete');
  if (reason === 'time') title = t('summary_times_up');
  else if (reason === 'lives') title = t('summary_no_lives');
  else if (reason === 'quit') title = t('summary_quit');
  document.getElementById('summaryTitle').textContent = title;
  document.getElementById('summaryDate').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('finalScore').textContent = `${earnedPoints} ${t('pts_suffix')}`;
  let label = '';
  if (pct >= 90) label = t('label_excellent');
  else if (pct >= 70) label = t('label_good');
  else if (pct >= 50) label = t('label_keep');
  else label = t('label_review');
  document.getElementById('finalLabel').textContent = t('summary_line', { correct, answered: answered_count, pct, label });
  const bd = document.getElementById('domainBreakdown');
  bd.innerHTML = `<div style="font-size:13px;font-weight:500;color:var(--color-text-secondary);margin-bottom:.5rem">${t('results_by_domain')}</div>`;
  Object.entries(domainStats).forEach(([domain, { correct, total, points, maxPoints }]) => {
    const p = total > 0 ? Math.round((correct / total) * 100) : 0;
    bd.innerHTML += `<div class="domain-row"><span style="min-width:120px">${domain}</span><div class="domain-bar-wrap"><div class="domain-bar" style="width:${p}%"></div></div><span style="min-width:80px;text-align:right;font-size:13px">${correct}/${total} · ${points}${t('pts_suffix')}</span></div>`;
  });
  showScreen('summary');
}

/* ============================================================
   Event wiring
   ============================================================ */
document.querySelectorAll('.mode-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    mode = tab.dataset.mode;
    document.getElementById('standard-opts').style.display = mode === 'standard' ? 'block' : 'none';
    document.getElementById('survival-opts').style.display = mode === 'survival' ? 'block' : 'none';
  });
});

document.querySelectorAll('input[name=survType]').forEach(r => {
  r.addEventListener('change', () => {
    survType = r.value;
    document.getElementById('survLivesField').style.display = survType === 'lives' ? 'block' : 'none';
    document.getElementById('survTimeField').style.display = survType === 'time' ? 'block' : 'none';
  });
});

document.querySelectorAll('#diffBtns button').forEach(btn => {
  btn.addEventListener('click', () => {
    const d = btn.dataset.diff;
    if (selectedDiffs.has(d)) { if (selectedDiffs.size === 1) return; selectedDiffs.delete(d); btn.classList.remove('active'); btn.style.background = ''; btn.style.borderColor = ''; btn.style.color = ''; }
    else {
      selectedDiffs.add(d); btn.classList.add('active');
      const styles = { beginner: ['#E1F5EE', '#0F6E56', '#085041'], easy: ['#EAF3DE', '#3B6D11', '#27500A'], medium: ['#FAEEDA', '#854F0B', '#633806'], hard: ['#FCEBEB', '#A32D2D', '#791F1F'], expert: ['#EEEDFE', '#534AB7', '#3C3489'] };
      const s = styles[d] || styles.medium; btn.style.background = s[0]; btn.style.borderColor = s[1]; btn.style.color = s[2];
    }
  });
});

document.getElementById('btnSubmit').addEventListener('click', () => {
  if (!answered) { checkAnswer(); }
  else {
    if (mode === 'survival' && survType === 'lives' && lives <= 0) { endSession('lives'); return; }
    current++; renderQuestion();
  }
});

document.getElementById('btnQuit').addEventListener('click', () => { clearInterval(timerInterval); endSession('quit'); });

document.getElementById('btnHint').addEventListener('click', () => {
  const box = document.getElementById('hintBox');
  box.style.display = 'block';
  renderMath(box);
  document.getElementById('btnHint').style.display = 'none';
});

document.getElementById('calcInput').addEventListener('input', e => {
  const v = e.target.value.trim();
  const out = document.getElementById('calcResult');
  if (!v) { out.textContent = ''; out.className = 'calc-result'; return; }
  try {
    out.textContent = '= ' + fmtCalc(calcEval(v));
    out.className = 'calc-result';
  } catch (err) {
    out.textContent = t('calc_error');
    out.className = 'calc-result error';
  }
});

document.getElementById('btnStartQuiz').addEventListener('click', () => {
  document.getElementById('cfgWarning').style.display = 'none';
  if (mode === 'standard') startStandard(); else startSurvival();
});
document.getElementById('btnBackToUpload').addEventListener('click', () => showScreen('upload'));
document.getElementById('btnPlayAgain').addEventListener('click', () => {
  if (mode === 'standard') startStandard(); else startSurvival();
});
document.getElementById('btnReconfigure').addEventListener('click', () => buildConfig());
document.getElementById('btnNewFile').addEventListener('click', () => { showScreen('upload'); document.getElementById('parseError').style.display = 'none'; });

// Home / navigation between entry screens
document.getElementById('btnUseBuiltin').addEventListener('click', () => {
  // The quiz picker lives on the config screen; load the first quiz and go there.
  quizSource = 'builtin';
  const first = document.querySelector('#catalog .catalog-btn');
  if (first) first.click();
});
document.getElementById('btnUseCustom').addEventListener('click', () => showScreen('custom'));
document.getElementById('btnCustomBack').addEventListener('click', () => { document.getElementById('parseError').style.display = 'none'; showScreen('upload'); });
document.getElementById('btnShowHelp').addEventListener('click', () => showScreen('help'));
document.getElementById('btnHelpBack').addEventListener('click', () => showScreen('custom'));

/* ============================================================
   File handling (upload)
   ============================================================ */
function handleFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      allQuestions = parseCSV(e.target.result);
      quizSource = 'custom';
      buildConfig();
    } catch (err) {
      showParseError(t('error_prefix') + err.message);
    }
  };
  reader.readAsText(file);
}
document.getElementById('dropZone').addEventListener('click', () => document.getElementById('fileInput').click());
document.getElementById('fileInput').addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });
document.getElementById('dropZone').addEventListener('dragover', e => { e.preventDefault(); document.getElementById('dropZone').style.background = 'var(--color-background-secondary)' });
document.getElementById('dropZone').addEventListener('dragleave', () => { document.getElementById('dropZone').style.background = '' });
document.getElementById('dropZone').addEventListener('drop', e => { e.preventDefault(); document.getElementById('dropZone').style.background = ''; if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
document.getElementById('loadSample').addEventListener('click', () => {
  try { allQuestions = parseCSV(SAMPLE_CSV); quizSource = 'custom'; buildConfig(); } catch (e) { console.error(e); }
});

/* ============================================================
   Debug / verify mode (local only)

   Steps through every unverified question across all quiz files, shows the
   correct answer + explanation so you can check it, and POSTs to dev_server.py
   to write verified=true into the source CSV. No lives or timer.
   ============================================================ */
function isLocalHost() {
  const h = location.hostname;
  return h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '[::1]';
}

let debugQueue = [], debugPos = 0;

async function loadAllForDebug() {
  const manifestText = await loadText('data/_manifest.csv');
  const groups = manifestText ? parseManifest(manifestText) : [];
  const files = [...new Set(groups.flatMap(g => g.files))];
  const all = [];
  for (const f of files) {
    const text = await loadText('data/' + f);
    if (text == null) continue;
    let qs;
    try { qs = parseCSV(text); } catch (e) { continue; }
    qs.forEach(q => { q.file = f; all.push(q); });
  }
  return all;
}

async function enterDebug() {
  const all = await loadAllForDebug();
  debugQueue = all.filter(q => q.verified === null);
  debugPos = 0;
  showScreen('debug');
  renderDebug();
}

function renderDebug() {
  document.getElementById('debugRemaining').textContent = t('debug_remaining', { n: debugQueue.length });
  document.getElementById('dbgError').style.display = 'none';
  const card = document.querySelector('#s-debug .card');
  if (debugQueue.length === 0) {
    document.getElementById('dbgMeta').innerHTML = '';
    document.getElementById('dbgText').textContent = t('debug_done');
    document.getElementById('dbgHint').style.display = 'none';
    document.getElementById('dbgChoices').innerHTML = '';
    document.getElementById('dbgExpl').style.display = 'none';
    document.getElementById('btnDbgVerify').style.display = 'none';
    document.getElementById('btnDbgSkip').style.display = 'none';
    return;
  }
  document.getElementById('btnDbgVerify').style.display = '';
  document.getElementById('btnDbgSkip').style.display = '';
  const q = debugQueue[debugPos % debugQueue.length];
  document.getElementById('dbgMeta').innerHTML =
    `<span class="badge domain">${q.domain}</span>` +
    (q.subdomain ? `<span class="badge sub">${q.subdomain}</span>` : '') +
    `<span class="badge ${diffClass(q.difficulty)}">${q.difficulty}</span>` +
    `<span class="badge">${q.file}</span>`;
  const qt = document.getElementById('dbgText');
  qt.textContent = q.description;
  renderMath(qt);
  const hint = document.getElementById('dbgHint');
  if (q.hint) { hint.textContent = q.hint; hint.style.display = 'block'; renderMath(hint); }
  else hint.style.display = 'none';
  const labels = 'ABCDEFGHIJ';
  const box = document.getElementById('dbgChoices');
  box.innerHTML = '';
  q.choices.forEach((ch, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn' + (q.correctSet.has(ch.origIdx) ? ' correct' : '');
    btn.disabled = true;
    const label = document.createElement('span'); label.className = 'choice-label'; label.textContent = labels[idx];
    const txt = document.createElement('span'); txt.textContent = ch.text;
    btn.append(label, txt);
    box.appendChild(btn);
  });
  renderMath(box);
  const expl = document.getElementById('dbgExpl');
  expl.style.display = 'block';
  expl.innerHTML = `<strong>${t('debug_answer')}.</strong> ${q.explanation || ''}`;
  renderMath(expl);
}

async function markCurrent(endpoint, value) {
  if (debugQueue.length === 0) return;
  const q = debugQueue[debugPos % debugQueue.length];
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: q.file, description: q.description, choices: q.choices.map(c => c.text) })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    q.verified = value;
    debugQueue.splice(debugPos % debugQueue.length, 1);
    if (debugPos >= debugQueue.length) debugPos = 0;
    renderDebug();
  } catch (err) {
    const e = document.getElementById('dbgError');
    e.textContent = t('debug_save_error');
    e.style.display = 'block';
  }
}

document.getElementById('btnDebug').addEventListener('click', enterDebug);
document.getElementById('btnDebugExit').addEventListener('click', () => showScreen('upload'));
document.getElementById('btnDbgVerify').addEventListener('click', () => markCurrent('/verify', true));
document.getElementById('btnDbgVoid').addEventListener('click', () => markCurrent('/void', false));
document.getElementById('btnDbgSkip').addEventListener('click', () => { debugPos++; renderDebug(); });

/* ============================================================
   Init
   ============================================================ */
applyStaticText();
loadLocalization();
loadCatalog();
if (isLocalHost()) document.getElementById('btnDebug').style.display = 'block';
