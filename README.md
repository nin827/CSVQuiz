# CSVQuiz

A lightweight, client-side practice-quiz web app driven by CSV files. Pick a premade
quiz from the catalog or upload your own CSV, configure a Standard or Survival run, and
get instant per-question feedback and a per-domain score breakdown. No backend — just
static files, and it even runs straight from `file://` (no server needed).

## Project layout

```
index.html            # markup (the SPA screens)
styles.css            # all styling
app.js                # all logic (CSV parsing, i18n, quiz engine)
data.js               # offline bundle of data/ (do not edit by hand)
dev_server.py         # local dev server with /verify and /void endpoints for debug mode
vendor/katex/         # vendored KaTeX (math typesetting), works offline
data/
  _manifest.csv       # catalog: which quizzes to show (name,file)
  _localization.csv   # all user-facing text (key,en)
  math_01.csv         # Math quiz, split by difficulty tier (beginner)
  math_02.csv         # easy
  math_03.csv         # medium
  math_04.csv         # hard
  math_05.csv         # expert
  statistics_01.csv   # Statistics quiz, same 5 difficulty tiers
  statistics_02.csv
  statistics_03.csv
  statistics_04.csv
  statistics_05.csv
```

Questions are filtered in the config screen by **difficulty only** — the quiz you pick
already determines the domain, so there is no separate domain filter.

> Files prefixed with `_` (`_manifest.csv`, `_localization.csv`) are app
> configuration, not quiz content. All CSVs are plain ASCII so they display
> correctly in any editor or spreadsheet tool.

## Running locally

There are two ways to run it:

- **Just open `index.html`** (double-click, `file://`). Premade quizzes and all UI text
  work offline because they're embedded in `data.js`. Custom upload works too.
- **Serve over HTTP** for development, so edits to the CSVs show up immediately without
  rebuilding the bundle:

  ```bash
  python -m http.server 8000
  # then open http://localhost:8000
  ```

The app always tries to `fetch()` the real files in `data/` first (HTTP), and falls
back to the `data.js` bundle when `fetch` is blocked (`file://`).

## Debug / verify mode (local only)

When the site is served from **localhost**, a faint `debug` link appears at the bottom
of the home screen (it is hidden on any public host such as GitHub Pages). It steps
through every **unverified** question across all banks, showing the correct answer and
explanation so you can check each one, with a running count of how many are left and no
lives or timer. Click **Verify & next** to mark a question reviewed.

Saving the `verified=true` flag requires the small dev server (a plain static server
can't accept writes), so run it instead of `http.server` while reviewing:

```bash
python dev_server.py        # serves on http://localhost:8000 and accepts /verify
```

It writes `verified=true` into the matching question's row in `data/`. Note that
re-running the `gen_*.py` generators overwrites the banks (clearing the `verified`
column), so verify after you're done generating.

## Hosting on GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the `main`
   branch and the `/ (root)` folder, and save.
4. Your quiz will be live at `https://<user>.github.io/<repo>/`.

All paths are relative, so it works from any sub-path.

## CSV format

Each quiz CSV uses this header (only `domain`, `description`, `correct`, and `choice0`
are strictly required):

| Column | Meaning |
|--------|---------|
| `domain` | Top-level category (used for filtering + the score breakdown) |
| `subdomain` | Optional finer category, shown as a badge |
| `difficulty` | `beginner` / `easy` / `medium` / `hard` / `expert` |
| `description` | The question text |
| `explanation` | Shown in feedback after answering |
| `hint` | Optional hint / formula reminder; adds a **Show hint** button on the question |
| `calculator` | Optional; set to `true` to show an in-question calculator (see below) |
| `verified` | Optional; managed by debug mode (`true` once a question has been reviewed) |
| `correct` | Index(es) of the correct choice(s) as digits, e.g. `0` or `013` (multi-answer) |
| `point` | Points awarded for a fully-correct answer (default `10`) |
| `choice0` … `choice9` | Answer choices (at least two non-empty) |

A `correct` value with more than one digit (e.g. `013`) turns the question into a
"select all that apply" multi-answer question.

### Math (LaTeX)

Any text in `description`, `explanation`, `hint`, or the choices can contain LaTeX
between `$...$` (inline) or `$$...$$` (display). It's typeset by **KaTeX**, which is
vendored under `vendor/katex/` so math renders fully offline. Examples:
`$\frac{1}{2}$`, `$x^2$`, `$\sqrt{a^2+b^2}$`, `$\int 2x\,dx$`. Wrapping fractions in
`$...$` also avoids the spreadsheet date problem (no bare `1/2` cells).

### Calculator (opt-in)

Set the `calculator` column to `true` on a question to show a live, Excel-like
scratchpad calculator beneath the choices. It evaluates as you type and supports
`+ - * / ^`, parentheses, the constants `e` and `pi`, and the functions `ln(x)`,
`log(x)` (base 10) and `log(x, b)` (base `b`) — e.g. `(2 + 3) * 4^2`, `log(1000)`,
`ln(e)`, `2*pi`. It's a safe parser (no `eval`). In the built-in banks it's enabled on
the **hard** and **expert** tiers.

### Adding a new quiz

1. Drop a new CSV into `data/` (same columns as above), e.g. `data/math.csv`.
2. Add one line to `data/_manifest.csv` (header `name,file`):
   ```csv
   Math,math.csv
   ```
   It will appear in the catalog automatically.
3. Rebuild `data.js` (the offline bundle) so the new quiz works from `file://` and GitHub Pages — see the note in the project layout section above.

### Splitting one quiz across multiple files

A single quiz can be spread over several CSVs — handy for large banks. List each file
under the **same `name`**; they are fetched and merged into one pool:

```csv
name,file
Math,math.csv
Math,math_00.csv
Math,math_01.csv
```

This produces a single "Math" entry in the catalog combining all three files.

## Localization

All UI text lives in `data/_localization.csv` as `key,en` rows. Today only English is
provided; the same English strings are embedded in `app.js` as a fallback. To add or
tweak wording, edit the `en` column. (Support for additional language columns can be
layered on later by extending the loader in `app.js`.)

Keep CSV content **plain ASCII** — fancy punctuation (`…`, `—`, curly quotes) shows up
as mojibake (`â€¦`) in editors that assume Windows-1252. Use `...`, `-`, and straight
quotes instead.

**Fractions and spreadsheets:** a choice whose whole value is a bare fraction (e.g.
`1/2`) gets auto-converted to a date (`2-Jan`) if you *open* the CSV in Excel or Google
Sheets. The app itself reads `1/2` fine, but to stay spreadsheet-safe these choices are
written with spaces around the slash (`1 / 2`), which spreadsheets leave as text. Edit
CSVs in a plain text editor when you can, and avoid saving over them from Excel.
