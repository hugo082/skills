---
name: qrspi
description: QRSPI workflow — Question → Research → Design → Structure → Plan → Worktree → Implement → PR
argument-hint: "<step> <issue?> [arguments...]  (steps: question, research, design, structure, plan, worktree, implement, pr)"
disable-model-invocation: true
---

# QRSPI Workflow Router

You are the router for the **QRSPI workflow** — a structured, multi-step process for going from a task description to a fully implemented feature.

**User input**: `$ARGUMENTS`

## Step 1: Parse the subcommand

Extract the **first word** (case-insensitive) and match it against the eight QRSPI steps:

| Token (+ aliases)            | Step | Reference file to load         |
| ---------------------------- | ---- | ------------------------------ |
| `question`, `q`, `1`        | 1    | `references/question.md`       |
| `research`, `r`, `2`        | 2    | `references/research.md`       |
| `design`, `d`, `3`          | 3    | `references/design.md`         |
| `structure`, `s`, `4`       | 4    | `references/structure.md`      |
| `plan`, `p`, `5`            | 5    | `references/plan.md`           |
| `worktree`, `w`, `6`        | 6    | `references/worktree.md`       |
| `implement`, `i`, `7`       | 7    | `references/implement.md`      |
| `pr`, `pull-request`, `8`   | 8    | `references/pull-request.md`   |

**Everything after the first word** is the step-specific arguments (e.g. a file path, an issue URL, inline text). Pass them through verbatim.

## Step 2: Handle unrecognized or missing subcommand

If the first word does **not** match any token above — or if `$ARGUMENTS` is empty — do **NOT** guess. Instead, reply with the following message exactly and then **stop**:

```
I couldn't determine which QRSPI step you want to run.

Usage:
  /qrspi <step> <issue?> [arguments...]

Available steps (in order):
  1. question     (q)  — Detangle the ticket into targeted research questions
  2. research     (r)  — Objectively research the codebase using the generated questions
  3. design       (d)  — Interactive design discussion: where are we going?
  4. structure    (s)  — Map development phases and validation strategy: how do we get there?
  5. plan         (p)  — Write the detailed technical implementation plan
  6. worktree     (w)  — Set up a git worktree for isolated implementation
  7. implement    (i)  — Orchestrate implementation by dispatching phases to sub-agents
  8. pr           (8)  — Create the pull request with summary and artifacts

Example:
  /qrspi question Add a recovery-week generator to periodization
  /qrspi question #839
  /qrspi research .qrspi/25-07-14-recovery-week
  /qrspi design .qrspi/25-07-14-recovery-week
  /qrspi structure .qrspi/25-07-14-recovery-week
  /qrspi plan .qrspi/25-07-14-recovery-week
  /qrspi worktree .qrspi/25-07-14-recovery-week
  /qrspi implement .qrspi/25-07-14-recovery-week
  /qrspi pr .qrspi/25-07-14-recovery-week
```

## Step 3: Load the references and execute

Once the step is identified:

1. **Infer the context** from the issue number or the provided prompt.
   ```
   gh issue view <issue-number>
   mkdir -p .qrspi/YY-MM-DD-<short-description>
   ```
2. **Read the matching reference file** listed in the table above. That file contains the complete instructions, rules, and output format for the step.
3. **Follow those instructions exactly.** The reference file is your sole source of truth for this step.

### Important constraints

- **Load only the one reference file for the matched step.** Do not read reference files for other steps. Each step is designed to be self-contained; loading extra context wastes tokens and risks confusion.
- **All QRSPI artifacts go in `.qrspi/YY-MM-DD-<short-description>/`.** This is defined by project rules in `AGENTS.md` and reinforced in every reference file.

## The process is not linear

The step order below is the *typical* forward flow, but the process loops. When research reveals the questions missed something, go back to `question`. When design surfaces unknowns, run `research` again. When structuring exposes a flaw in the design, revise the design.

Common loop-backs:
- **research → question**: research answers expose a gap in the questions → write a new question file
- **design → research**: design needs facts not covered → run research again with new questions
- **structure → design**: phase breakdown reveals a design flaw → revise `design.md`

How loops are preserved:
- **`questions/` and `research/` are directories** that accumulate files (`01-initial.md`, `02-<slug>.md`, …). Never overwrite — always add a new numbered file when looping back.
- **`design.md`, `structure.md`, `plan.md` are single files** that may be revised in place. Git is the revision history; add a short "Revision note" at the top of the file when you rewrite it.
- **`task.md` is immutable** after the first `question` run — it captures the original intent.

## Quick reference — typical full workflow

```
/qrspi question <task or issue description>
  ↓ agent detangles ticket into targeted research questions
  ↓ produces .qrspi/.../questions/NN-<slug>.md  (+ task.md on first run)
  ↓ [HUMAN reviews questions, adjusts if needed]
/qrspi research .qrspi/.../
  ↓ agent researches codebase objectively using questions (no ticket context)
  ↓ produces .qrspi/.../research/NN-<slug>.md
  ↓ [HUMAN reviews research — may loop back to /qrspi question]
/qrspi design .qrspi/.../
  ↓ interactive design discussion with human
  ↓ produces/revises .qrspi/.../design.md
  ↓ [HUMAN reviews design — may loop back to /qrspi research]
/qrspi structure .qrspi/.../
  ↓ produces/revises .qrspi/.../structure.md
  ↓ [HUMAN reviews structure — may loop back to /qrspi design]
/qrspi plan .qrspi/.../
  ↓ produces/revises .qrspi/.../plan.md (autonomous)
  ↓ [HUMAN spot-checks plan]
  ↓ [OPTIONAL] /qrspi worktree .qrspi/.../  — run only if you want an isolated worktree
/qrspi implement .qrspi/.../
  ↓ implements phases, commits along the way
/qrspi pr .qrspi/.../
  ↓ creates PR with summary linking to artifacts
```

### Example plan directory after a loop

```
.qrspi/26-04-18-recovery-week/
├── task.md                        # immutable, written once by /qrspi question
├── questions/
│   ├── 01-initial.md              # first pass
│   └── 02-periodization-edges.md  # added when research exposed a gap
├── research/
│   ├── 01-initial.md              # answers 01-initial.md
│   └── 02-periodization-edges.md  # answers 02-periodization-edges.md
├── design.md                      # revised in place; git tracks history
├── structure.md
└── plan.md
```
