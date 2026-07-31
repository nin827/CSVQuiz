*Built with [Claude](https://claude.ai) (Anthropic), some questions personally reviewed by myself, but it is not meant to be serious project/endeavor to stress out to begin with.*

---

# CSVQuiz

A lightweight, no-install practice quiz app that runs entirely in your browser — no account, no backend, no tracking. Open the file and start quizzing.

## Included quizzes

| Subject | Difficulty tiers available |
|---------|---------------------------|
| Math | Beginner, Easy, Medium, Hard, Expert |
| Statistics | Beginner, Easy, Medium, Hard, Expert |
| Data Literacy | Beginner, Easy, Medium, Hard, Expert |
| Data Systems | Beginner, Easy, Medium, Hard, Expert |
| Data Querying | Beginner, Easy, Medium, Hard, Expert |
| Economics | Beginner, Easy, Medium |
| Marketing | Beginner, Easy, Medium |
| Finance | Beginner, Easy, Medium |
| Accounting | Beginner, Easy, Medium |
| Management | Beginner, Easy, Medium |

Each subject has 50 questions per difficulty tier. Questions are shuffled every session.

## How to use

**Quickest way — just open the file:**

Double-click `index.html`. Everything runs offline; no server needed.

**Or visit the hosted version** on GitHub Pages (if deployed).

### Quiz modes

- **Standard** — set a question count and optional time limit.
- **Survival** — go until you run out of lives (wrong answers cost a life) or time runs out.

Filter by difficulty tier on the config screen before starting.

### Features

- **Dark mode** — toggle in the top-right corner of the home screen. Your choice is remembered.
- **Calculator** — available on every question as a scratch pad (supports `+ - * / ^`, parentheses, `log`, `ln`, `e`, `pi`).
- **My progress** — tracks your scores across sessions per subject. You can export your history as a JSON file and import it back on any device.
- **Math rendering** — questions and answers can include LaTeX (e.g. `$\frac{1}{2}$`, `$x^2$`) typeset by KaTeX, which is bundled so it works offline.

## Upload your own CSV

Click **Load your own CSV** on the home screen to quiz yourself from any CSV you create. The file needs this header row (only the four starred columns are required):

| Column | Required | Meaning |
|--------|----------|---------|
| `domain` | ★ | Top-level category (shown in score breakdown) |
| `subdomain` | | Optional finer category, shown as a badge |
| `difficulty` | | `beginner` / `easy` / `medium` / `hard` / `expert` |
| `description` | ★ | The question text |
| `explanation` | | Shown in feedback after answering |
| `hint` | | Optional hint; adds a **Show hint** button |
| `calculator` | | Set to `true` to make the calculator visible on this question |
| `verified` | | Managed by debug mode — leave blank when authoring |
| `correct` | ★ | Digit index(es) of the correct choice(s), e.g. `0` or `013` |
| `point` | | Points for a fully correct answer (default `10`) |
| `choice0` … `choice9` | ★ (min 2) | Answer choices |

A `correct` value with more than one digit (e.g. `013`) makes it a "select all that apply" question.

**Tips:**
- Wrap math in `$...$` or `$$...$$` and it will be typeset automatically.
- Keep content plain ASCII — avoid curly quotes, em-dashes, or ellipsis characters.
- Never put a bare fraction (`1/2`) in a cell on its own — write `1 / 2` or `$\frac{1}{2}$` instead (spreadsheets silently convert bare fractions to dates).

For details on adding quizzes to the catalog, splitting banks across files, hosting, and development setup, see [manual.md](manual.md).
