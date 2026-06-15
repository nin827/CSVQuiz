# CSVQuiz — Developer & Contributor Manual

This document covers the technical details of the project: running it locally, adding question banks, rebuilding the offline bundle, hosting, and the debug/verify workflow.

For a general overview and how to upload your own CSV, see [README.md](README.md).

## Project layout

```
index.html            # markup (the SPA screens)
styles.css            # all styling (CSS custom properties for theming)
app.js                # all logic: CSV parsing, quiz engine, i18n, stats, theme
data.js               # offline bundle of data/ — do NOT edit by hand
build_data.py         # regenerates data.js from all files in data/
dev_server.py         # local dev server with /verify and /void endpoints
vendor/katex/         # vendored KaTeX (math typesetting), works offline
data/
  _manifest.csv       # catalog: which quizzes to show in the picker (name,file)
  _localization.csv   # all user-facing strings (key,en)
  math_01.csv         # beginner questions for Math
  math_02.csv         # easy
  math_03.csv         # medium
  math_04.csv         # hard
  math_05.csv         # expert
  statistics_01.csv   # … same five tiers for Statistics
  …                   # Economics, Marketing, Finance, Accounting, Management (tiers 01–03)
```

Files prefixed `_` are app configuration, not quiz content. All CSVs are plain ASCII.

## How the dual loading model works

The app must run both over HTTP **and** when `index.html` is opened directly from `file://`, where browsers block `fetch()`. This is handled by two layers:

- `build_data.py` embeds every file in `data/` as a JS string in `data.js` (`window.CSVQUIZ_DATA`), which is included via a `<script>` tag and loads under `file://`.
- `loadText(path)` in `app.js` tries `fetch()` first (HTTP), and falls back to `window.CSVQUIZ_DATA` when fetch fails.

**Consequence:** `data.js` is auto-generated — never edit it by hand. After adding or editing any file in `data/`, regenerate it:

```bash
python build_data.py
```

## Running locally

Two options:

**Option 1 — static server** (for general use or testing):
```bash
python -m http.server 8000
# open http://localhost:8000
```
Edits to CSV files show up immediately on page reload (no rebuild needed in HTTP mode).

**Option 2 — dev server** (required for debug/verify mode):
```bash
python dev_server.py        # http://localhost:8000
python dev_server.py 8001   # custom port
```
This accepts `POST /verify` and `POST /void` to write `verified=true/false` back into the source CSV. Without it, the debug screen won't be able to save flags.

## Adding a new quiz to the catalog

1. Create a CSV in `data/` with the standard header (see README for columns).
2. Add a row (or rows) to `data/_manifest.csv`:
   ```csv
   My Subject,mysubject_01.csv
   ```
   Any rows sharing the same `name` are merged into one quiz pool — handy for splitting by difficulty tier:
   ```csv
   name,file
   My Subject,mysubject_01.csv
   My Subject,mysubject_02.csv
   My Subject,mysubject_03.csv
   ```
3. Regenerate `data.js`:
   ```bash
   python build_data.py
   ```

The subject will now appear in the quiz picker.

## CSV authoring conventions

- **Plain ASCII only.** Curly quotes (`""`), em-dashes (`—`), and ellipsis (`…`) become mojibake in Windows-1252 editors. Use `"`, `-`, and `...` instead.
- **No bare fractions.** A cell whose only value is `1/2` is silently turned into a date by Excel/Sheets. Write `1 / 2` or `$\frac{1}{2}$` (KaTeX) instead.
- **`correct` is a digit index** (not the answer text). `0` = first choice, `2` = third choice. Multiple digits (e.g. `013`) make it a "select all that apply" question.
- **`verified` tri-state:** blank = unreviewed, `true` = verified, `false` = voided. Managed by debug mode via `dev_server.py`. Leave blank when authoring new questions.
- **Point conventions used in the built-in banks:** beginner = 5 pts, easy = 10 pts, medium = 15 pts, hard = 20–25 pts, expert = 25–30 pts.
- **Calculator:** set `calculator=true` on a question to make the scratchpad visible. The calculator is shown on every question by default in the current version; the column is kept for backward compatibility.

## Debug / verify mode

A faint `debug` link appears at the bottom of the home screen **only on localhost** (hidden on any public host). It steps through all unreviewed questions (`verified` = blank), showing the correct answer and explanation, with a running count and no timer or lives.

- **Verify & next** — writes `verified=true` to the source CSV (requires `dev_server.py`).
- **Void & next** — writes `verified=false` (marks the question for removal/fix).
- **Skip** — moves to the next question without marking it.

The server matches the target row by `description` + choice values, so the question text must be stable before verifying. Regenerating question banks will clear the `verified` column (start from a blank slate).

## Localization

All UI text is in `data/_localization.csv` (`key,en` rows). The same strings are embedded in `app.js` as `STRINGS_EN` so the app renders correctly even when the CSV cannot be fetched (e.g. `file://` before `data.js` is built). When adding a new UI string, add it in **both** places with identical keys.

Only English is provided today. Additional language columns can be added by extending `loadLocalization()` in `app.js`.

## Stats and progress persistence

Session history is stored in `localStorage` under the key `csvquiz_stats` as:
```json
{ "version": 1, "attempts": [ { "id": "…", "subject": "…", "date": "…", "score": 0, "pct": 0, … } ] }
```
The "My progress" screen lets users export this as a JSON file and re-import it (import is idempotent — duplicate IDs are ignored). All storage access is wrapped in try/catch so private-mode browsers degrade gracefully.

## Hosting on GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. The quiz will be live at `https://<user>.github.io/<repo>/`.

All asset paths are relative, so it works from any sub-path without configuration. Make sure `data.js` is committed and up to date before pushing.

## Dark mode

CSS custom properties are declared in `:root` (light defaults) and overridden in `[data-theme="dark"]`. The `data-theme` attribute is applied to `<html>` by a tiny synchronous script in `<head>` (before stylesheets load) to prevent a flash of light on dark-mode users reloading. `initTheme()` in `app.js` syncs the toggle state on every load and responds to `prefers-color-scheme` when no explicit preference is stored.
