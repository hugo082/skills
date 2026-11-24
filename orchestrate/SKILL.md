---
name: orchestrate
description: Deliver a detailed input end to end as the coordinator of one Run. Researches the system, discovers a roadmap DAG of tasks, and grows it as tasks settle; runs each task in a background subagent working in the task's own worktree, one PR per implementation task; the roadmap lives only as the tracker's state.
disable-model-invocation: true
hooks:
  Stop:
    - hooks:
        - type: command
          command: '"${CLAUDE_SKILL_DIR:-$HOME/.claude/skills/orchestrate}"/scripts/stop-check.sh'
  PreCompact:
    - hooks:
        - type: command
          command: "echo 'Keep verbatim: the last orchestrate report; the planning worktree, tracking entity, document destination, and Run log; every live worker with its subagent ID, task id, role, and worktree; every needs-input awaiting a reply, with the ID of the worker that asked.'"
---

**Done is every acceptance criterion in the input covered by a merged
change task, and every task in the roadmap done.**

**The roadmap (its tasks, their dependencies, and their states) exists
only as the tracker's state.** No document, report, comment, or log row
restates it.

Every decision is one row appended with `scripts/log-decision.sh` to
the decision log of the context it was taken in
(`references/decisions.tsv`): the **Run log**,
`<planning worktree>/decisions-<tracking entity id>.tsv`, for this
session, the First tasks, and Roadmap workers; a **task log**,
`<planning worktree>/tasks/<task id>/decisions.tsv`, for a task's
workers. A task decision never contradicts the Run log; one that
would is an input decision.

`log-decision.sh` prints `rows: <n>`. Run log over 50 rows, with no
First-task or Roadmap worker live → a `haiku` worker rewrites it with
one row per decision still in force and appends every removed row to
`<planning worktree>/decisions-<tracking entity id>.archive.tsv`.

This session changes no repository file other than the Run log. It
may read code and run commands and operations.

## Start

1. Run `<skill dir>/scripts/overlay.sh orchestrate <planning worktree>`; the planning worktree is the current worktree. Exit 1
   → reply with its error and `**State:** not started`, create
   nothing, and end the turn.
   Precedence, highest first: the user's prompt and the input; changes
   a human made in the tracker; the overlay; this skill.
2. **Stop gate.** The input (a document, issue, or prompt) states:
   - **Outcome** — what changes for whom.
   - **Acceptance criteria** — externally observable, each testable.
   - **Exclusions** — what is out of scope.
   - **Constraints** — systems, contracts, data, and environments to
     respect.

   Any item missing → reply with the missing items and
   `**State:** not started`, create nothing (no item, worktree, or
   document), and end the turn. Do not interview the user to fill them.

3. **Settings**, from the input, else the default:
   - **Merge policy** — who merges PRs. Default: the user.
   - **Grouping** — how tasks are grouped in the tracker. Default:
     none.
4. Prompt `/orchestrate resume <tracking entity>` → Resume. Any other
   prompt:
   1. Resolve the **tracking entity**: the one the input gives, else a new item titled after the
      outcome.
   2. Resolve the **document destination**: the input, else the repo
      convention. None found → ask the user as an input decision.
   3. Log `overlay: <path | none>`, `tracking entity: <entity>`, and
      `document destination: <destination>` in the Run log.
   4. Start the First tasks.

**Resume.** Read the Run log, the tracker's roadmap, every task
worktree, and every task PR and its base. Start a fresh worker for
every task whose worker was live, in its existing worktree.

## Roadmap

A **task** is one tracker item, a descendant of the tracking entity,
grouped per the grouping setting. Its item states:

- **Kind** — change, research, monitor, or operation.
- **Goal** and **done signal** — the observable result that settles
  it.
- **Covers** — change: the acceptance criteria it covers. Research,
  monitor, operation: the question, signal, or action.
- **Deadline** — monitor only.

A dependency of B on A is a relation "A blocks B" in the tracker, and
nothing else.

**Not specified.** An item with a goal but no done signal yet,
blocked by the tasks whose results will specify it. It is never
ready.

**Out of scope.** Work outside the input's outcome or inside its
exclusions: log `out of scope: <work>` in the Run log with the reason
as why.

**Size rule.** A change task is one PR from one worktree, implemented
in one `work` session, with one design approval. Its real-app
verification and evidence belong to that PR, never to another task.

**Done.**

- **Change** — its PR is merged into the default branch and its item
  closed.
- **Research** — the research is published.
- **Monitor** — the done signal is recorded on the item before the
  deadline; deadline passed → failed with the last observation.
- **Operation** — the done signal is recorded on the item. All scripts are attached to its item.

**Ready.** Every task blocking it is done and, destination inside the
repository, the planning PR holding the documents it depends on is
merged. For a change task with a base, a change dependency whose Work
settled succeeded counts as done.

**Base.** No unmerged dependency → the default branch. Otherwise the
branch of the unmerged dependency that contains every other
dependency; no such branch → no base yet.

## Workers

A worker is a background subagent, described `<task id> - <role>`,
started on the model below with a spec that names its skill. A task's
code changes are always made in its own task worktree,
`<planning worktree>/.worktrees/<task id>`, ignored by git, on a branch
named after the task and based on the task's base, created before its
first worker starts.

Default skill and model per need; use another when the task needs it:

| Need               | Skill                | Model              |
| ------------------ | -------------------- | ------------------ |
| Research questions | `research-questions` | `opus`             |
| Research           | `research`           | `sonnet`           |
| Roadmap            | `v-slices`           | `opus`             |
| Design             | `program-design`     | `opus`             |
| Work               | `work`               | `sonnet`           |
| Monitor, operation | none                 | `opus` or `sonnet` |

- **First tasks** — Research questions, then Research, on the input;
  then Roadmap. `<task id>` is the tracking entity's id.
- **Change** — Design, then Work.
- **Research** — Research questions, then Research. A Research spec
  names only the research questions path, nothing about the change.
- **Monitor** — observe the signal until the done signal holds or the
  deadline passes.
- **Operation** — run the action.

Start every ready task.

### Every spec

Write these into the spec as values, addressed to the worker:

- **Skill** — invoke `<skill>`.
- **Worktree** — the task worktree's absolute path; work only there.
- **Precedence** — this spec overrides the project overlay, which
  overrides your skill.
- **Destination** — the exact path, or item for the output.
  Writing it there is an allowed repository change.
- **Decisions** — take every decision yourself and log each with
  `<absolute path of scripts/log-decision.sh> <absolute path of your context's decision log>`; appending to it is an allowed change outside your
  worktree. Answers to your `needs-input` are already logged. Ask
  only for an **input decision**: one that changes the input's
  outcome, acceptance criteria, exclusions, or constraints,
  contradicts the Run log, or is irreversible. A required step that
  cannot run is an input decision: ask for what it needs; never skip
  it.
- **Asking** — end your turn with a final message whose first line is
  `needs-input: <question>`; the reply resumes you.
- **Approval** — where your skill requires user approval, ask for it;
  the reply is that approval.
- **Turns** — wait for CI and other checks inside your turn.
- **Completion** — end with a final message whose first line is
  `done` once the output is published with its task log, the log
  linked from the task's item, and, where required, approved;
  otherwise `failed: <reason>`. The rest names the output location,
  follow-ups, and any open blocker.

### Per worker

- **Roadmap** — inputs: the input, the published research, the
  results since the last Roadmap worker, and the tracker's current
  roadmap. Items, relations, and states in the tracker are fixed;
  change an existing one only when a new result requires it, and log
  why. Run `v-slices` without a confirmation round; its roadmap and
  slices go to the tracker as tasks, and nowhere else.

- **Design** — the input is the confirmed requirements, with no
  confirmation round; the architecture is explicitly waived. Obsolete
  against the task's base or over the size rule → settle failed
  naming what changed or the split.
- **Work** — rebase on the task's base, not the default branch, and
  target the PR at it; link the PR to the task's item. Merge only
  when the merge policy says so and the base is the default branch.
- **Monitor, operation** — record the result on the task's item.

Run a Roadmap worker, one at a time, with every result that arrived
meanwhile, after:

- A change task's Work settles with follow-ups.
- A research, monitor, or operation task settles.
- Any other worker settles failed.
- Every task blocking a not specified item is done.

## Events

- A worker's final message:
  - `needs-input` → answer it.
  - `done` or `failed` → Settlement.
- A user message, or a line `<n>: <answer>` answering item `<n>` of
  Waiting on the user:
  - an answer → log it, then reply to the worker that asked;
  - any other instruction → log it; an input change goes to a Roadmap
    worker.

Then start every ready task, and end the turn per End of turn.

**Answer a `needs-input`.** Log the answer in the asking worker's task
log, then reply with `SendMessage` to that worker.

- **Approval request** → check it against the input's acceptance
  criteria, exclusions, and constraints, and the Run log.
  Reply approved, or with the required changes.
- **Input decision** → add it to Waiting on the user. Reply once the
  user's answer arrives, and log that answer in the Run log too.

**Settlement.**

- Output missing at its destination → start a fresh worker once
  with the same inputs; missing again → failed.
- A Roadmap worker fails, or a task fails again after a Roadmap
  worker handled its earlier failure → record the blocker on the
  task's item and ask the user as an input decision.

## End of turn

Before ending a turn in a Run:

- Every closed task item with no live worker has its PR merged or
  closed and its task worktree removed.
- Every acceptance criterion covered by a change task.
- The Run log published at the destination with every row.

End every turn with the report:

```
## <outcome>

**State:** complete | running | waiting on user | blocked
**Roadmap:** <link to the tracking entity>

### Waiting on the user
<numbered questions, and PRs to merge, bases first; an item keeps its number across reports; or "none">

### Blockers
<each unresolved blocker, or "none">
```

**States:**

- **complete** — done holds, no not specified item is open, and every
  follow-up is in the roadmap or logged out of scope.
- **running** — workers in flight.
- **waiting on user** — progress needs an item in Waiting on the user:
  an answer or a merge.
- **blocked** — no task can progress without an unresolved blocker.
