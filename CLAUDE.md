# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

CSVQuiz is a dependency-free, client-side quiz SPA driven by CSV files. There is **no build step for the app itself** and **no backend** — `index.html` + `styles.css` + `app.js` are served as static files. The only "compilation" is regenerating data artifacts (the offline bundle and the procedurally-generated question banks) with Python scripts.

## Commands

```bash
# Validate every bank after editing data/ (exit 1 on any problem)
python check_data.py

# Regenerate the offline bundle after editing data/
python build_data.py

# Run for development (reads data/ live; edits show up on reload)
python -m http.server 8000          # then open http://localhost:8000

# Run WITH debug/verify persistence (needed to save verified/void flags)
python dev_server.py                 # http://localhost:8000, also accepts POST /verify and /void
python dev_server.py 8001            # custom port (this is what .claude/launch.json uses)
```

There are no automated tests, linters, or package manager. Verification is manual (load in a browser, run a quiz).

## The dual loading model (most important architectural fact)

The app must work both over HTTP **and** when `index.html` is double-clicked from `file://`, where browsers block `fetch()` of local files. This drives the whole data layer:

- `build_data.py` embeds every file in `data/` into `data.js` as `window.CSVQUIZ_DATA` (a `{filename: contents}` map).
- `loadText(path)` in `app.js` is the single choke point: it tries `fetch()` first (live HTTP), and falls back to `window.CSVQUIZ_DATA` when fetch fails.
- `data.js` is **not** a `<script>` tag — it is ~800 KB and unused over HTTP. `ensureBundle()` injects it lazily the first time a `fetch()` fails (the `file://` case).

**Consequence:** `data.js` is auto-generated; never edit it by hand. After adding or editing anything in `data/` (including `_localization.csv`), run `python build_data.py` to keep the `file://` path correct.

## Data model

- **`data/_manifest.csv`** (`name,file`) is the quiz catalog. Multiple rows sharing the same `name` are **merged into one quiz pool** — that's how a subject is split across `math_01.csv`...`math_05.csv` (one file per difficulty tier). `parseManifest()` groups by name; `loadQuizFromFiles()` concatenates.
- **`data/_localization.csv`** (`key,en`) holds all UI strings. `STRINGS_EN` in `app.js` embeds the same English defaults as a fallback, so the app renders even if the CSV can't load. **When you add a UI string, add it in BOTH places** (the `STRINGS_EN` object and the CSV), keyed identically; `t(key, params)` does `{param}` substitution.
- Files prefixed with `_` are app config, not quiz content. All other `data/*.csv` are question banks sharing one header (see README for the column list).
- The `verified` column is **tri-state**: blank = unreviewed, `true` = verified, `false` = voided. In `app.js` this parses to `null` / `true` / `false` respectively. Debug mode only queues `verified === null`.

## CSV conventions that will bite you

- **Keep all CSV content pure ASCII.** Fancy punctuation (`…`, `—`, curly quotes) becomes mojibake (`â€¦`) in Windows-1252 editors. Use `...`, `-`, straight quotes.
- **Write a literal `$` as `\$`.** `$...$` is a KaTeX delimiter, so unescaped currency (`costs $80 and $90`) renders as mangled math. `renderMath()` restores `\$` to `$` after typesetting. Only `math` and `statistics` use bare `$` for real LaTeX; `check_data.py` enforces that split.
- **Never write a bare fraction as a whole cell value** (e.g. `1/2`) — Excel/Sheets silently converts it to a date. Either wrap math in `$...$` LaTeX (`$\frac{1}{2}$`, typeset by KaTeX) or add spaces (`1 / 2`).
- `correct` is digit indices, e.g. `0` or `013`; more than one digit makes it a "select all" multi-answer question.

## Frontend structure

- Single SPA: screens are `<section id="s-*">` elements; `showScreen(name)` toggles the `.active` class. No router, no framework.
- `quizSource` (`'builtin'` | `'custom'`) controls whether the in-config quiz picker (`#quizPickCard`) shows — a custom upload IS its own quiz, so the picker is hidden.
- `renderMath(el)` wraps KaTeX's `renderMathInElement` over `$...$`/`$$...$$`; KaTeX is vendored under `vendor/katex/` so math works fully offline. It degrades to raw text if KaTeX isn't loaded.
- **Nothing is fetched from the network.** Icons are inline `<symbol>`s in the `#icon-sprite` block of `index.html` (`icon(name)` in `app.js` emits `<use>` markup); KaTeX is vendored. Do not reintroduce a CDN link — it breaks `file://` and offline use.
- `parseRows()` is the one CSV tokenizer (RFC 4180: quoted commas/newlines, `""` escapes) used by question banks, the manifest and the localization table.
- **Anything from a CSV that reaches `innerHTML` must go through `esc()`.** Several views build markup as strings.
- The calculator (opt-in via the `calculator` column) uses a safe recursive-descent parser (`calcEval`), **not** `eval()`.

## Debug / verify mode

A faint `debug` link appears on the home screen **only on localhost** (`isLocalHost()`); it's hidden on any public host. It steps through unreviewed questions (no lives/timer), showing the correct answer + explanation. **Verify & next** POSTs `/verify` (sets `verified=true`); **Void & next** POSTs `/void` (sets `verified=false`); both route through `markCurrent()` and need `dev_server.py` running (a plain static server can't write). The server matches the target row by `description` + the list of choice values.

## Hosting

GitHub Pages from `main` / root. All paths are relative, so it works from any sub-path. Only `index.html`, `styles.css`, `app.js`, `data.js`, and `vendor/` are needed at runtime; the Python scripts and `data/` are dev-time sources (though harmless to deploy).
