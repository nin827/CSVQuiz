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
  help_example_heading: 'Example',
  // Theme
  theme_dark: 'Dark mode',
  theme_light: 'Light',
  // Stats / progress
  stats_button: 'My progress',
  stats_title: 'Your progress',
  stats_sub: 'Scores are saved on this device only.',
  stats_empty: 'No attempts yet. Finish a quiz to see your progress here.',
  stats_best: 'Best',
  stats_attempts: 'Attempts',
  stats_last: 'Last attempt',
  stats_recent: 'Recent',
  stats_export: 'Export data',
  stats_import: 'Import data',
  stats_clear: 'Clear all',
  stats_clear_confirm: 'Delete all saved progress on this device?',
  stats_import_ok: 'Progress imported successfully.',
  stats_import_err: 'Could not import that file. Make sure it is a valid progress export.',
  stats_storage_warn: 'Progress cannot be saved in this browser (private mode or storage disabled).',
  stats_back: 'Back',
  subject_custom: 'Custom quiz',
  subject_sample: 'Sample quiz',
  subject_unknown: 'Quiz',
  // Preset mode config
  preset_standard: 'Standard',
  preset_custom: 'Custom',
  std_type_quiz: 'Quiz - 20 questions, 20 min',
  std_type_survival: 'Survival - 5 lives, 20 min',
  std_note: 'One subject - One difficulty - No question navigation - Labeled "Standard" in records',
  diff_single_hint: 'Standard mode uses one difficulty.',
  // Notes widget
  notes_label: 'Notes',
  notes_placeholder: 'Write notes to plan things out...',
  notes_help: 'Notes are cleared when you leave the quiz.'
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

/* ============================================================
   Storage helpers (private-mode safe)
   ============================================================ */
function storageGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function storageSet(key, val) {
  try { localStorage.setItem(key, val); return true; } catch (e) { return false; }
}
function storageRemove(key) {
  try { localStorage.removeItem(key); return true; } catch (e) { return false; }
}

/* ============================================================
   Theme
   ============================================================ */
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.checked = (theme === 'dark');
}

function initTheme() {
  const stored = storageGet('csvquiz_theme');
  const theme = stored || (window.matchMedia && matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  applyTheme(theme);
}

/* ============================================================
   Stats / progress persistence
   ============================================================ */
const STATS_KEY = 'csvquiz_stats';
const STATS_VERSION = 1;

function loadStats() {
  try {
    const raw = storageGet(STATS_KEY);
    if (!raw) return { version: STATS_VERSION, attempts: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.attempts)) return { version: STATS_VERSION, attempts: [] };
    return parsed;
  } catch (e) {
    return { version: STATS_VERSION, attempts: [] };
  }
}

function saveStats(stats) {
  const ok = storageSet(STATS_KEY, JSON.stringify(stats));
  if (!ok) showStatsMsg(t('stats_storage_warn'), 'warn');
  return ok;
}

function saveAttempt(record) {
  const stats = loadStats();
  // De-dupe by id — re-import is idempotent
  if (!stats.attempts.find(a => a.id === record.id)) {
    stats.attempts.push(record);
    // Cap at 200 total attempts to bound storage size
    if (stats.attempts.length > 200) stats.attempts = stats.attempts.slice(-200);
  }
  saveStats(stats);
}

function computeSubjectSummaries(stats) {
  const map = {};
  for (const a of stats.attempts) {
    const key = a.subject || t('subject_unknown');
    if (!map[key]) map[key] = { count: 0, bestPct: 0, lastDate: '', lastPct: 0, recent: [] };
    const s = map[key];
    s.count++;
    if (a.pct > s.bestPct) s.bestPct = a.pct;
    s.lastDate = a.date;
    s.lastPct = a.pct;
    s.recent.unshift(a);
    if (s.recent.length > 5) s.recent.pop();
  }
  return map;
}

function exportStats() {
  const stats = loadStats();
  if (!stats.attempts.length) { showStatsMsg(t('stats_empty'), 'warn'); return; }
  try {
    const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url; a.download = `csvquiz-stats-${date}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } catch (e) {
    showStatsMsg(t('stats_storage_warn'), 'err');
  }
}

function validateStats(obj) {
  return obj && typeof obj === 'object' && Array.isArray(obj.attempts) &&
    obj.attempts.every(a => a && typeof a.subject === 'string' && typeof a.date === 'string');
}

function importStats(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!validateStats(parsed)) throw new Error('invalid');
      const existing = loadStats();
      const existingIds = new Set(existing.attempts.map(a => a.id));
      for (const a of parsed.attempts) {
        if (a.id && !existingIds.has(a.id)) {
          existing.attempts.push(a);
          existingIds.add(a.id);
        }
      }
      if (existing.attempts.length > 200) existing.attempts = existing.attempts.slice(-200);
      saveStats(existing);
      showStatsMsg(t('stats_import_ok'), 'ok');
      renderStats();
    } catch (err) {
      showStatsMsg(t('stats_import_err'), 'err');
    }
  };
  reader.readAsText(file);
}

function showStatsMsg(msg, type) {
  const el = document.getElementById('statsMsg');
  if (!el) return;
  el.textContent = msg;
  el.className = `stats-msg ${type}`;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function renderStats() {
  const body = document.getElementById('statsBody');
  if (!body) return;
  const stats = loadStats();
  if (!stats.attempts.length) {
    body.innerHTML = `<p style="font-size:14px;color:var(--color-text-secondary)">${t('stats_empty')}</p>`;
    return;
  }
  const summaries = computeSubjectSummaries(stats);
  let html = '';
  for (const [subject, s] of Object.entries(summaries)) {
    const modeTag = a => {
      const isCustom = a.preset === 'custom';
      if (a.mode === 'survival') return isCustom ? 'Survival (custom)' : 'Survival';
      return isCustom ? 'Normal (custom)' : 'Normal';
    };
    const diffTag = a => (a.diffs && a.diffs.length) ? a.diffs.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ') : null;
    const recentHtml = s.recent.slice(0, 5).map(a => {
      const date = new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const diff = diffTag(a);
      const mode = modeTag(a);
      const tags = [diff, mode].filter(Boolean).join(' · ');
      const correct = a.correct != null ? a.correct : '?';
      const answered = a.answered != null ? a.answered : '?';
      const score = a.score != null ? a.score : 0;
      const pct = a.pct != null ? a.pct : 0;
      return `<div class="stats-attempt-row">
        <div class="stats-attempt-meta">${date}${tags ? ' &middot; <span class="stats-attempt-tags">' + tags + '</span>' : ''}</div>
        <div class="stats-attempt-detail">${correct}/${answered} correct &middot; ${score} pts &middot; ${pct}%</div>
      </div>`;
    }).join('');
    html += `<div class="stats-subject-row">
      <div style="flex:1;min-width:0">
        <div class="stats-subject-name">${subject}</div>
        <div class="stats-subject-meta">${s.count} ${t('stats_attempts')}</div>
        <div class="stats-recent">${recentHtml}</div>
      </div>
      <div class="stats-subject-score">
        <div class="stats-subject-pct">${s.bestPct}%</div>
        <div class="stats-subject-attempts">${t('stats_best')}</div>
      </div>
    </div>`;
  }
  body.innerHTML = html;
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
let selectedDiffs = new Set(['beginner']);
let survivalRunning = false;
let quizSource = 'builtin'; // 'builtin' shows the quiz picker on the config screen; 'custom' hides it
let currentSubject = '';
let preset = 'standard'; // 'standard' (fixed 20q/30min preset) | 'custom' (fully configurable)
let standardType = 'quiz'; // 'quiz' | 'survival' (sub-type for Standard preset)
let activePanel = null; // 'calc' | 'notes' | null
let maxReached = 0; // highest question index reached (nav boundary)
let questionStates = []; // per-question: null | { selected, allRight, partialCredit }

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
      currentSubject = g.name;
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
  if (name !== 'quiz') closePanel();
}

function buildConfig() {
  const isBuiltin = quizSource === 'builtin';
  document.getElementById('quizPickCard').style.display = isBuiltin ? '' : 'none';
  // For premade quizzes show only the top Start button; for custom uploads show the bottom one
  document.getElementById('btnStartQuiz').style.display = isBuiltin ? 'none' : '';
  document.getElementById('cfgSub').textContent = t('questions_loaded', { n: allQuestions.length });
  // Sync preset UI
  const isStdPreset = preset === 'standard';
  document.getElementById('std-preset-opts').style.display = isStdPreset ? 'block' : 'none';
  document.getElementById('cust-preset-opts').style.display = isStdPreset ? 'none' : 'block';
  document.getElementById('diffSingleHint').style.display = isStdPreset ? 'block' : 'none';
  document.querySelectorAll('#presetTabs .mode-tab').forEach(t => t.classList.toggle('active', t.dataset.preset === preset));
  showScreen('config');
}

function getFilteredQuestions() {
  return allQuestions.filter(q =>
    selectedDiffs.size === 0 || selectedDiffs.has(q.difficulty)
  );
}

function startStandard() {
  const count = preset === 'standard' ? 20 : Math.max(1, parseInt(document.getElementById('cfgCount').value) || 10);
  const mins = preset === 'standard' ? 20 : Math.max(1, parseInt(document.getElementById('cfgTime').value) || 10);
  const pool = shuffle(getFilteredQuestions());
  if (pool.length === 0) { showWarning(t('no_match_filter')); return; }
  sessionQuestions = pool.slice(0, Math.min(count, pool.length));
  mode = 'standard';
  initSession(mins * 60);
}

function startSurvival() {
  if (preset === 'standard') {
    // Standard survival preset: fixed 5 lives, 15 min
    const pool = shuffle(getFilteredQuestions());
    if (pool.length === 0) { showWarning(t('no_match_filter')); return; }
    sessionQuestions = [...pool];
    mode = 'survival'; survType = 'lives';
    lives = 5; startingLives = 5;
    initSession(20 * 60);
    return;
  }
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
  maxReached = 0;
  questionStates = new Array(sessionQuestions.length).fill(null);
  // Clear notes between sessions
  const notesEl = document.getElementById('notesInput');
  if (notesEl) notesEl.value = '';
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
  const savedState = questionStates[current]; // non-null means already answered (review mode)

  // Restore or reset interaction state
  answered = savedState !== null;
  selected = savedState ? new Set(savedState.selected) : new Set();

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

  if (savedState) {
    // Restore answered state — read-only view of an already-answered question
    const btns = document.querySelectorAll('.choice-btn');
    const correctPositions = new Set();
    q.choices.forEach((ch, i) => { if (q.correctSet.has(ch.origIdx)) correctPositions.add(i); });
    btns.forEach((btn, i) => {
      btn.disabled = true;
      if (correctPositions.has(i) && savedState.selected.has(i)) btn.className = 'choice-btn correct';
      else if (savedState.selected.has(i) && !correctPositions.has(i)) btn.className = 'choice-btn wrong';
      else if (correctPositions.has(i) && !savedState.selected.has(i)) btn.className = 'choice-btn missed';
    });
    showFeedback(q, savedState.allRight, savedState.partialCredit);
    const submitBtn = document.getElementById('btnSubmit');
    submitBtn.disabled = false;
    submitBtn.textContent = (current + 1 >= sessionQuestions.length) ? t('see_results') : t('next_question');
  } else {
    const fb = document.getElementById('feedback');
    fb.style.display = 'none'; fb.className = 'feedback'; fb.innerHTML = '';
    document.getElementById('btnSubmit').disabled = true;
    document.getElementById('btnSubmit').textContent = t('check_answer');
  }

  // Question navigation bar — all non-survival quiz modes
  const qNav = document.getElementById('qNav');
  if (mode === 'standard') {
    renderQNav();
  } else {
    qNav.innerHTML = '';
    qNav.style.display = 'none';
  }

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
  // Save state for question navigation (review mode)
  questionStates[current] = { selected: new Set(selected), allRight, partialCredit };
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
  if (mode === 'standard') renderQNav();
}

function renderQNav() {
  const nav = document.getElementById('qNav');
  if (!nav) return;
  const total = sessionQuestions.length;
  if (total <= 1) { nav.innerHTML = ''; nav.style.display = 'none'; return; }
  let html = '';
  for (let i = 0; i < total; i++) {
    const st = questionStates[i];
    let cls = 'q-nav-btn';
    let dis = '';
    if (i === current) cls += ' q-nav-current';
    else if (st !== null) cls += st.allRight ? ' q-nav-correct' : ' q-nav-wrong';
    else if (i > maxReached) { cls += ' q-nav-future'; dis = ' disabled'; }
    html += `<button class="${cls}"${dis} data-qi="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`;
  }
  nav.innerHTML = html;
  nav.style.display = 'flex';
  nav.querySelectorAll('.q-nav-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      current = parseInt(btn.dataset.qi);
      renderQuestion();
    });
  });
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
  saveAttempt({
    id: Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    subject: currentSubject || (quizSource === 'custom' ? t('subject_custom') : t('subject_unknown')),
    source: quizSource,
    date: new Date().toISOString(),
    preset, mode, survType: mode === 'survival' ? survType : null,
    diffs: [...selectedDiffs],
    score: earnedPoints, maxPoints: totalPoints,
    correct, answered: answered_count, pct,
    reason,
    domainStats: JSON.parse(JSON.stringify(domainStats))
  });
  showScreen('summary');
}

/* ============================================================
   Panel helpers (calculator / notes side panels)
   ============================================================ */
function closePanel() {
  const panelCalc = document.getElementById('panelCalc');
  const panelNotes = document.getElementById('panelNotes');
  if (panelCalc) panelCalc.classList.remove('open');
  if (panelNotes) panelNotes.classList.remove('open');
  const tabCalc = document.getElementById('tabBtnCalc');
  const tabNotes = document.getElementById('tabBtnNotes');
  if (tabCalc) tabCalc.classList.remove('active');
  if (tabNotes) tabNotes.classList.remove('active');
  activePanel = null;
}

function togglePanel(name) {
  if (activePanel === name) { closePanel(); return; }
  closePanel();
  if (!name) return;
  const panel = document.getElementById(name === 'calc' ? 'panelCalc' : 'panelNotes');
  const tab = document.getElementById(name === 'calc' ? 'tabBtnCalc' : 'tabBtnNotes');
  if (panel) panel.classList.add('open');
  if (tab) tab.classList.add('active');
  activePanel = name;
}

/* ============================================================
   Difficulty button helper
   ============================================================ */
function updateDiffBtns() {
  const styles = { beginner: ['#E1F5EE', '#0F6E56', '#085041'], easy: ['#EAF3DE', '#3B6D11', '#27500A'], medium: ['#FAEEDA', '#854F0B', '#633806'], hard: ['#FCEBEB', '#A32D2D', '#791F1F'], expert: ['#EEEDFE', '#534AB7', '#3C3489'] };
  document.querySelectorAll('#diffBtns button').forEach(btn => {
    const d = btn.dataset.diff;
    if (selectedDiffs.has(d)) {
      btn.classList.add('active');
      const s = styles[d] || styles.medium;
      btn.style.background = s[0]; btn.style.borderColor = s[1]; btn.style.color = s[2];
    } else {
      btn.classList.remove('active');
      btn.style.background = ''; btn.style.borderColor = ''; btn.style.color = '';
    }
  });
}

/* ============================================================
   Quiz start dispatcher
   ============================================================ */
function doStartQuiz() {
  document.getElementById('cfgWarning').style.display = 'none';
  if (preset === 'standard') {
    if (standardType === 'quiz') startStandard(); else startSurvival();
  } else {
    if (mode === 'standard') startStandard(); else startSurvival();
  }
}

/* ============================================================
   Event wiring
   ============================================================ */
// Top-level preset tabs: Standard | Custom
document.querySelectorAll('#presetTabs .mode-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#presetTabs .mode-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    preset = tab.dataset.preset;
    const isStdPreset = preset === 'standard';
    document.getElementById('std-preset-opts').style.display = isStdPreset ? 'block' : 'none';
    document.getElementById('cust-preset-opts').style.display = isStdPreset ? 'none' : 'block';
    document.getElementById('diffSingleHint').style.display = isStdPreset ? 'block' : 'none';
    if (isStdPreset) {
      // Collapse to single difficulty
      const first = [...selectedDiffs][0] || 'beginner';
      selectedDiffs.clear(); selectedDiffs.add(first);
      updateDiffBtns();
    }
  });
});

// Inner Custom mode tabs: Quiz (Standard) | Survival
document.querySelectorAll('#cust-preset-opts .mode-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#cust-preset-opts .mode-tab').forEach(t => t.classList.remove('active'));
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
    if (preset === 'standard') {
      // Single-select for Standard preset
      selectedDiffs.clear(); selectedDiffs.add(d);
      updateDiffBtns();
    } else {
      // Multi-select for Custom preset
      if (selectedDiffs.has(d)) { if (selectedDiffs.size === 1) return; selectedDiffs.delete(d); }
      else { selectedDiffs.add(d); }
      updateDiffBtns();
    }
  });
});

document.getElementById('btnSubmit').addEventListener('click', () => {
  if (!answered) { checkAnswer(); }
  else {
    if (mode === 'survival' && survType === 'lives' && lives <= 0) { endSession('lives'); return; }
    const nextIdx = current + 1;
    if (nextIdx >= sessionQuestions.length) { endSession('complete'); return; }
    current = nextIdx;
    if (current > maxReached) maxReached = current;
    renderQuestion();
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

// Standard preset type selection (Quiz vs Survival)
document.querySelectorAll('input[name=stdType]').forEach(r => {
  r.addEventListener('change', () => { standardType = r.value; });
});

// Side panel toggle buttons
document.getElementById('tabBtnCalc').addEventListener('click', () => togglePanel('calc'));
document.getElementById('tabBtnNotes').addEventListener('click', () => togglePanel('notes'));
document.getElementById('closePanelCalc').addEventListener('click', () => closePanel());
document.getElementById('closePanelNotes').addEventListener('click', () => closePanel());

document.getElementById('btnStartQuiz').addEventListener('click', doStartQuiz);
document.getElementById('btnStartQuizTop').addEventListener('click', doStartQuiz);
document.getElementById('btnBackToUpload').addEventListener('click', () => showScreen('upload'));
document.getElementById('btnPlayAgain').addEventListener('click', doStartQuiz);
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
      currentSubject = file.name.replace(/\.csv$/i, '') || t('subject_custom');
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
  try { allQuestions = parseCSV(SAMPLE_CSV); quizSource = 'custom'; currentSubject = t('subject_sample'); buildConfig(); } catch (e) { console.error(e); }
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

/* ============================================================
   Theme toggle
   ============================================================ */
document.getElementById('themeToggle').addEventListener('change', e => {
  const theme = e.target.checked ? 'dark' : 'light';
  applyTheme(theme);
  storageSet('csvquiz_theme', theme);
});

/* ============================================================
   Stats screen buttons
   ============================================================ */
document.getElementById('btnStats').addEventListener('click', () => {
  renderStats();
  showScreen('stats');
});
document.getElementById('btnStatsBack').addEventListener('click', () => showScreen('upload'));
document.getElementById('btnStatsExport').addEventListener('click', exportStats);
document.getElementById('btnStatsImport').addEventListener('click', () => document.getElementById('statsImportInput').click());
document.getElementById('statsImportInput').addEventListener('change', e => {
  if (e.target.files[0]) { importStats(e.target.files[0]); e.target.value = ''; }
});
document.getElementById('btnStatsClear').addEventListener('click', () => {
  if (!confirm(t('stats_clear_confirm'))) return;
  storageRemove(STATS_KEY);
  renderStats();
  showStatsMsg(t('stats_empty'), 'warn');
});
document.getElementById('btnDbgVerify').addEventListener('click', () => markCurrent('/verify', true));
document.getElementById('btnDbgVoid').addEventListener('click', () => markCurrent('/void', false));
document.getElementById('btnDbgSkip').addEventListener('click', () => { debugPos++; renderDebug(); });

/* ============================================================
   Init
   ============================================================ */
initTheme();
applyStaticText();
loadLocalization();
loadCatalog();
if (isLocalHost()) document.getElementById('btnDebug').style.display = 'block';
