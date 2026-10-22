# work skill evals

Two datasets of test cases in the skill-creator / `claude plugin eval` case
format (`prompt.md`, `case.yaml`, `graders/`, `place-files.sh`, `files/`).

| Dataset | Tests | Cases |
|---|---|---|
| `requests/` | The kinds of request the skill receives: tracker issue, inline bug, ambiguous term, missing input, docs-only change, diagnostic hand-off | 6 |
| `delivery/` | Deliver, Finish and Report under real git conditions: merged PR, stale base, conflicting repo rule, messy history, review round, change outside the repo | 6 |

## Fixture

Every case builds the same small Node app, **Shelf**, in the run's working
directory. Its `place-files.sh` calls `fixture/setup.sh`, which:

1. copies `fixture/base/` and commits it on `main`;
2. creates a bare repo `.origin.git/` (git-excluded) and sets it as `origin`;
3. commits the case's `files/repo/` overlay (issues, diagnostics) to `main`;
4. runs the case's `files/history.sh` (branches, upstream commits, merges).

`npm run check` (lint + `node --test`) passes at the start of every case. Needs
Node ≥ 20 and git. `requests/issue-ui-progress-badge` also needs a headless
browser and `uv` (for `scripts/evidence`); without them its graders accept a
**Not run** entry instead.

`requests/ambiguous-finished-this-year` depends on the date: its two readings
give different counts only until 2026-12-28 (book 4's `finishedAt` + 1 year).

`origin` is a local path, not GitHub: `gh pr create`, CI and `scripts/evidence
push` cannot succeed. Every case expects the run to say so under **Not run**
instead of claiming a PR or green CI. Push, rebase, force-push and branch choice
remain observable on `.origin.git`.

## Cases and the sessions behind them

Sessions are under `~/.claude/projects/`, 2026-10-20 → 2026-10-22. They ran an
older SKILL.md; the cases target the current one.

| Case | Source sessions | What it checks |
|---|---|---|
| `requests/issue-ui-progress-badge` | GG-5755, GG-5759, override picker, GG-5602 | The verify / UX / evidence steps the user used to paste into every prompt, now without the paste: before shots, sub-agent verify, hover + focus, after shots, one evidence image |
| `requests/inline-bug-title-sort` | blog reactions 503 (kittiwake) | Failing test first; an adjacent advertised-but-missing feature is left alone |
| `requests/ambiguous-finished-this-year` | Bluesky footer icon ("which secondary" stated only in the final reply) | The reading of an ambiguous term is stated in the first reply |
| `requests/issue-missing-attachment` | arion-agents #35, #36 (credentials supplied mid-task) | Missing input → ask, no invented data |
| `requests/docs-only-statuses-page` | arion #1434 (`public` label, full check skipped) | Full check still runs on a docs-only change |
| `requests/diagnostic-handoff-server-fix` | arion #1422 (`/root-cause` → `/work`), Orca slice dispatch | Stays inside the scope given with a diagnostic |
| `delivery/pr-already-merged` | override picker (PR 15668 merged mid-work) | Detect the merge, never push to the merged branch, new branch from latest `origin/main` |
| `delivery/stale-base-rebase` | year-recap rebase after go-links | Fetch, rebase onto moved `origin/main`, resolve, re-check |
| `delivery/agents-md-forbids-force-push` | year-recap (`--force-with-lease` against "Never force a push") | Repo rule vs the skill's history rewrite: no silent force push, conflict named |
| `delivery/messy-history-rewrite` | — (new Finish rule) | Rewrite in a sub-agent, no WIP / fixup commits, check on the rewritten head |
| `delivery/review-comments-pasted` | GG-5755 (Copilot review round) | Every comment gets a fix or a reply; no review-round commits |
| `delivery/outside-repo-staging-flag` | GG-5755 (AppConfig + prod QA data), arion-agents #32 (PostHog write, push to `main`), GSC MCP (Pi install) | Changes outside the repo are reported with an undo, or left with the command to run |

Four graders repeat across cases: full `npm run check` run, pushed to a
non-`main` branch after a rebase, no PR / CI claim, and the report template.

## Running

Not run yet. With the skill-creator loop, run each case folder as usual and
point the baseline at `work-workspace/skill-snapshot/`.

`claude plugin eval` reads a flat `evals/<case>/` folder. Link the cases into
one; `place-files.sh` resolves symlinks, so the fixture path still works:

```bash
mkdir -p work/evals
for c in __evals__/work/requests/* __evals__/work/delivery/*; do ln -s "$PWD/$c" work/evals/; done
```
