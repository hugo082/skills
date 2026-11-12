---
name: orchestrate
description: Deliver a detailed input end to end as the Orca coordinator of one Run. Researches the system, discovers a roadmap DAG of tasks, and grows it as tasks settle; runs each task in its own Orca worker, one PR per implementation worker; the roadmap lives only as the tracker's state.
disable-model-invocation: true
---

**Done is every acceptance criterion in the input covered by a merged
change task, and every task in the roadmap done.**

**The roadmap (its tasks, their dependencies, and their states) exists
only as the tracker's state.** No document, report, comment, or log row
restates it.

This session writes nothing but Run decision log rows, reads no code,
and runs no build, test, or CI watch. For an approval, read only the
sections the decision needs.

## Start

1. Run `<skill dir>/scripts/overlay.sh orchestrate <planning worktree>`; the planning worktree is the current worktree. Exit 1
   → reply with its error, create nothing, and end the turn.
   Precedence, highest first: the user's prompt and the input; changes
   a human made in the tracker; the overlay; this skill.
2. **Stop gate.** The input (a document, issue, or prompt) states:
   - **Outcome** — what changes for whom.
   - **Acceptance criteria** — externally observable, each testable.
   - **Exclusions** — what is out of scope.
   - **Constraints** — systems, contracts, data, and environments to
     respect.

   Any item missing → reply with the missing items, create nothing (no
   Run, item, worktree, or document), and end the turn. Do not
   interview the user to fill them.

3. **Settings**, from the input, else the default:
   - **Merge policy** — who merges PRs. Default: the user.
   - **Grouping** — how tasks are grouped in the tracker. Default:
     none.
4. Prompt `/orchestrate resume <run id>` → `orca orchestration run-use --id <run id>`, then handle a `resume` event. Any other prompt →
   `orca orchestration run-create --objective "<outcome>"`, then:
   1. Run `orca skills list` and load the Orca skills for
      orchestration, worktrees and terminals, and the project's
      tracker.
   2. Resolve the **tracking entity**: the one the input gives, else a new item titled after the
      outcome.
   3. Resolve the **document destination**: the input, else the repo
      convention. None found → ask the user as an input decision.
   4. Log `overlay: <path | none>`, `tracking entity: <entity>`, and
      `document destination: <destination>` in the Run decision log.
   5. Start the First tasks.

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

## Documents <TODO: on veut pas limiter les documents, juste le decision log, pas sur que ce soit enought pour une section>

| Level | Document          | Written by                   | Location                                                                                                                               |
| ----- | ----------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Run   | Input, research   | user, Research workers       | destination                                                                                                                            |
| Run   | Roadmap proposal  | Roadmap worker               | `<planning worktree>/roadmap-<run id>.md`, overwritten by each Roadmap worker, never committed or published                            |
| Run   | Run decision log  | this session, Roadmap worker | `<planning worktree>/decisions-<run id>.tsv`, published at the destination                                                             |
| Task  | Design            | Design worker                | destination                                                                                                                            |
| Task  | Task decision log | the task's workers           | `<planning worktree>/tasks/<task id>/decisions.tsv`, published at the destination beside the task's documents and linked from its item |

A task-level document never contradicts a Run-level one; a decision
that would is an input decision.

Every decision is one row appended with `scripts/log-decision.sh`, in
the log of its level: scope, task splits, out of scope, user answers
to input decisions, and escalated failures in the Run log; how to
achieve a task in its task log. `references/run-decisions.tsv` and
`references/task-decisions.tsv` show the rows.

**Out of scope.** Work outside the input's outcome or inside its
exclusions: log `out of scope: <work>` in the Run log with the reason
as why.

## Workers <TODO: on est trop strict sur les types de workers & placement. La seule regle sur le placement c'est task code changes est always isolated dans son propre task worktree>

One fresh session per worker. Each task worktree is a child of the
planning worktree in Orca lineage, git-based on the task's base,
named after the task, display name `<task id> - <goal>`, linked to
the task's item, and declared with `scripts/note.sh declare path:<worktree> '<task declaration>'` before its first worker starts
(`references/declaration.json`).

| Worker             | Skill                | Model              | Placement                          | Title                                      |
| ------------------ | -------------------- | ------------------ | ---------------------------------- | ------------------------------------------ |
| Research questions | `research-questions` | `opus`             | planning worktree                  | `<task id> - <topic> - Research questions` |
| Research           | `research`           | `sonnet`           | planning worktree                  | `Research <n>`                             |
| Roadmap            | `v-slices`           | `opus`             | planning worktree                  | `<tracking entity id> - Roadmap`           |
| Design             | `program-design`     | `opus`             | task worktree, created if none     | `<task id> - Design`                       |
| Work               | `work`               | `sonnet`           | same task worktree, fresh terminal | `<task id> - Implementation`               |
| Monitor, operation | none                 | `opus` or `sonnet` | planning worktree                  | `<task id> - <goal>`                       |

- **First tasks** — Research questions, then Research, on the input;
  then Roadmap. `<task id>` is the tracking entity's id, and their
  decision log is the Run log.
- **Change** — Design, then Work.
- **Research** — Research questions, then Research. A Research spec
  and title name only the research questions path, nothing about the
  change.
- **Monitor** — observe the signal until the done signal holds or the
  deadline passes.
- **Operation** — run the action.

Start every ready task.

### Every spec

Write these into the spec as values, addressed to the worker:

- **Precedence** — this spec overrides the project overlay, which
  overrides your skill.
- **Destination** — the exact path, or item for the output.
  Writing it there is an allowed repository change.
- **Decisions** — take every decision yourself and log each with
  `<absolute path of scripts/log-decision.sh> <absolute path of your decision log>`; appending to it is an allowed change outside your
  worktree. Answers to your `ask` are already logged. `ask` the
  coordinator only for an **input decision**: one that changes the
  input's outcome, acceptance criteria, exclusions, or constraints,
  contradicts a Run-level document, or is irreversible. A required
  step that cannot run is an input decision: `ask` for what it needs;
  never skip it.
- **Approval** — where your skill requires user approval, `ask` the
  coordinator; its reply is that approval.
- **Turns** — wait for CI and other checks inside your turn; end a
  turn only after `ask` or `worker_done`.
- **Completion** — `worker_done` succeeded once the output and your
  task decision log are published and, where required, approved;
  otherwise failed, with the reason in the body. The summary names
  the output location, follow-ups, and any open blocker.
- **Settings** and the **size rule**.

### Per worker

- **Roadmap** — inputs: the input, the published research, the
  results since the last Roadmap worker, and the tracker's current
  roadmap. Items, relations, and states in the tracker are fixed;
  change an existing one only when a new result requires it, and log
  why. Run `v-slices` without a confirmation round, writing the
  roadmap proposal to its location.

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

Orca wakes this session with every message to the Run. Use
`scripts/send.sh to|reply` instead of `orca orchestration send|reply`; exit 3 means the recipient was not woken: handle it as
an `undelivered` line. Call every other Orca command directly.

| Event                                                                 | Action                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `question`                                                            | Answer the `ask`.                                                                                                                                                                                                                                         |
| `worker_done`                                                         | Settlement.                                                                                                                                                                                                                                               |
| `escalation` with `stopReason`                                        | As a `stopped` line.                                                                                                                                                                                                                                      |
| `tick`                                                                | Its mail-doctor lines, then the PR rules.                                                                                                                                                                                                                 |
| `resume`                                                              | Handle the Run's unread messages and the lines of `scripts/mail-doctor.sh <run id>`; adopt the live workers in `worker-list` (never duplicate them); read the Run decision log, the tracker's roadmap, and every task PR and its base; then the PR rules. |
| User message, or a line `<item id>: <answer>` of an `answers` message | An answer → log it, then `scripts/send.sh reply <item id> "<answer>"` when the item is an `ask`. A merge item's new PR state → the PR rules. Any other instruction → log it; an input change goes to a Roadmap worker.                                    |

Then start every ready task, and end the turn per End of turn.

**Mail-doctor lines** (`scripts/mail-doctor.sh <run id>`):

- `undelivered` to `run:` → `orca orchestration run-use --id <run id>`.
- `undelivered` to a Dispatch, or `terminal-worker` → `orca orchestration worker-stop` it, then `worker-start --retry-of <dispatch id>` with the same spec.
- `unanswered` → answer it, unless it is in Waiting on the user.
- `stopped` → send the worker its next step.
- `stale` → resend it the Run's latest message to it.

**Answer an `ask`.** Log the answer in the asking worker's task log
before replying.

- **Approval request** → check it against the input's acceptance
  criteria, exclusions, and constraints, and the Run decision log.
  Reply approved, or with the required changes.
- **Input decision** → add it to Waiting on the user with a number,
  its `ask` message id, a link to what it decides when there is one,
  and the choices, your recommended answer first. Reply once the
  user's answer arrives, and log that answer in the Run log too.

**Settlement.**

- Output missing at its destination → dispatch a fresh worker once
  with the same inputs; missing again → failed.
- A Roadmap worker fails, or a task fails again after a Roadmap
  worker handled its earlier failure → record the blocker on the
  task's item and ask the user as an input decision.
- Release the worker.

**PR rules.**

- Check open PRs' merge state.
- On merge: close the task's item, and retarget PRs based on its
  branch to the default branch.
- A task's branch merges or gets new commits → a fresh Work session
  for every open task PR that depends on it, directly or
  transitively. New review comments on an open task PR → a fresh
  Work session in its task worktree.

## End of turn

Before ending a turn in a Run:

- Every settled worker released; no reclaimable terminal.
- Every closed task item with no live worker has its PR merged or
  closed and its task worktree removed.
- Every acceptance criterion covered by a change task.
- The Run decision log published at the destination with every row.
- State complete → `scripts/tick.sh stop <run id>`; otherwise
  `scripts/tick.sh start <run id> <planning worktree>` and
  `scripts/compact.sh <run id> 8`.

Write the report with `scripts/note.sh text path:<planning worktree> "<report>"`, and declare the planning worktree with `scripts/note.sh declare` and the report's State, Waiting on the user, and Blockers
(`references/declaration.json`). One of these three differs from the
previous planning declaration → end the turn with the report;
otherwise with one line naming what changed.

```
## <outcome>

**State:** complete | running | waiting on user | blocked
**Roadmap:** <link to the tracking entity>

### Waiting on the user
<questions, and PRs to merge, bases first, or "none">

### Blockers
<each unresolved blocker, or "none">
```

**States:**

- **complete** — done holds, no not specified item is open, and every
  follow-up is in the roadmap or logged out of scope.
- **running** — tasks in flight.
- **waiting on user** — progress needs an item in Waiting on the user:
  an answer or a merge.
- **blocked** — no task can progress without an unresolved blocker.
