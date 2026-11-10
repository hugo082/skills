---
name: orchestrate
description: Deliver a detailed input end to end as the Orca coordinator of one Run. Researches the system, discovers a roadmap DAG of tasks, and grows it as tasks settle; runs each task in its own Orca worker, one PR per implementation worker; the roadmap lives only as the tracker's state.
disable-model-invocation: true
---

**Done is every acceptance criterion in the input covered by a merged
change task, and every task in the roadmap done.**

This session writes no document other than decision log rows, reads
no code, and runs no build, test, or CI watch. For an approval, read
only the sections the decision needs. Never read whole documents,
diffs, or transcripts.

## Project context

Before anything else, run `<skill dir>/scripts/overlay.sh orchestrate
<planning worktree>`. The overlay it prints overrides this skill's
generic tool choices. Exit 1 → reply with its error, create nothing,
and end the turn. Else log `overlay: <path>` or `overlay: none`,
`tracking entity: <entity>`, and
`document destination: <destination>`.

## Read the input

**Stop gate.** The input (a document, issue, or prompt) states:

- **Outcome** — what changes for whom.
- **Acceptance criteria** — externally observable, each testable.
- **Exclusions** — what is out of scope.
- **Constraints** — systems, contracts, data, and environments to
  respect.

Any item missing → reply with the missing items, create nothing (no
Run, issue, worktree, or document), and end the turn. Do not
interview the user to fill them.

**Settings.** From the input; otherwise the default:

- **Merge policy** — who merges PRs. Default: the user.
- **Grouping** — how tasks are grouped in the tracker. Default:
  milestones by outcome, unless a milestone tracks the Run; tasks as
  issues.

## Invocation

This session is the Run's coordinator: Orca wakes it with every
message to the Run. The planning worktree is the current worktree.

- Prompt `/orchestrate resume <run id>` → `orca orchestration run-use
--id <run id>`, then Resume.
- Any other prompt → the stop gate, then `orca orchestration
run-create --objective "<outcome>"`, then Set up.

## Messages

- `question` → Answer each `ask`.
- `worker_done` → After each settlement.
- `escalation` with `stopReason` → as a `stopped` line.
- `tick` → its mail-doctor lines and the PR rules.
- `resume` → Resume.
- A user message, or a line `<item id>: <answer>` of an `answers`
  message:
  - an answer → log it, then `scripts/send.sh reply <item id>
"<answer>"` when the item is an `ask`;
  - a merge item's new PR state → the PR rules;
  - any other instruction → log it; an input change, applied through
    a Roadmap worker.

Use `scripts/send.sh to|reply` instead of `orca orchestration
send|reply`; call every other Orca command directly. `send.sh` exit 3
→ the recipient was not woken; handle it as an `undelivered` line.

**Mail-doctor lines** (`scripts/mail-doctor.sh <run id>`):

- `undelivered` to `run:` → `orca orchestration run-use --id <run
id>`.
- `undelivered` to a Dispatch, or `terminal-worker` → `orca
orchestration worker-stop` it, then `worker-start --retry-of
<dispatch id>` with the same spec.
- `unanswered` → answer it, unless it is in Waiting on the user.
- `stopped` → send the worker its next step.
- `stale` → resend it the Run's latest message to it.

## Resume

Handle the Run's unread messages per Messages and the lines of
`scripts/mail-doctor.sh <run id>`, then inventory the Run's live
workers in `worker-list` (adopt them, never duplicate), documents at
the destination, the decision log, the roadmap in the tracker (every
task issue, its state, and its blocking relations), and every task
PR and its base. Then apply the PR rules.

## Set up

1. Run `orca skills list` and load the Orca skills this workflow
   needs: orchestration, worktrees and terminals, and the project's
   issue tracker.
2. Resolve what tracks the Run (issue, project, or milestone): the one
   given in the input; otherwise a new tracking issue in the
   project's tracker titled after the outcome.
3. Resolve the document destination: the input or the repo
   convention. None found → ask the user as an input decision.
4. Decision log: `<planning worktree>/decisions-<run id>.tsv`. Every
   decision in the Run, by you or a worker, including each user
   answer, is one row appended only with `scripts/log-decision.sh`;
   `references/decision-log.tsv` shows the rows.
5. Declare the Run on its worktrees with `scripts/note.sh declare
path:<worktree> '<declaration>'`: the planning worktree in every
   Report, each task worktree before its first worker starts.
   `references/declaration.json` describes both declarations, with
   examples.

## Continuous discovery

**The roadmap is a DAG.** Nodes are tasks; an edge from A to B means
B waits on A. Tasks and edges exist only as the tracker's state: one
issue per task, a sub-issue of the tracking entity, grouped per the grouping setting; every edge a
blocking relation. Work not yet specified exists only as decision log
rows.

Each task states:

- **Kind** — change, research, monitor, or operation.
- **Goal** and **done signal** — the observable result that settles
  it.
- **Dependencies** and **unlocks** — the tasks it waits on, and the
  tasks and decisions it informs.
- **Deadline** — monitor tasks only.

**Size rule.** A change task is one PR from one worktree, implemented
in one `work` session, with one design approval. Its real-app
verification and evidence belong to that PR, never to another task.

**Not yet specified.** Work toward the outcome whose goal or done
signal cannot be stated yet gets no task: log it with decision `not
yet specified: <work>` and the tasks it waits on as evidence. Once
every task it waits on is done, log `specified: <work>` naming the new
tasks, or `out of scope: <work>`, with `<work>` repeated verbatim. A
`not yet specified` row is open while no later row repeats its
`<work>`.

**Out of scope.** Log work outside the input's outcome or inside its
exclusions with decision `out of scope: <work>` and the reason as why.

Each change to the roadmap goes through a Roadmap worker; the user
does not approve it.

Run a Roadmap worker after:

- A change task's Work settles with follow-ups.
- A research, monitor, or operation task settles.
- Any worker other than Roadmap settles failed.
- Every task an open `not yet specified` row waits on is done.

One Roadmap worker at a time, batching the results that arrived
meanwhile.

## Coordination contract

Every task spec carries this contract, addressed to the worker:

- **Destination** — the exact path, Artifact, or issue for the
  output. Writing it there is an allowed repository change.
- **Decisions** — take every decision yourself and log each with the
  log script; appending to the decision log is an allowed change
  outside your worktree. Answers to your `ask` are already logged.
  `ask` the coordinator only for an **input decision**: one that
  changes the input's outcome, acceptance criteria, exclusions, or
  constraints, or that is irreversible. A step the skill requires that
  cannot run is an input decision: `ask` for what it needs; never
  skip it.
- **Approval** — where the skill requires user approval, `ask` the
  coordinator; its reply is that approval.
- **Turns** — wait for CI and other checks inside your turn; end a
  turn only after `ask` or `worker_done`.
- **Completion** — `worker_done` succeeded once the output is
  published and, where required, approved; otherwise failed, with
  the reason in the body. The summary names the output location,
  follow-ups, and any open blocker.

Answer each `ask`:

- **Approval request** → check against the input's acceptance
  criteria, exclusions, and constraints, and the decision log.
  Reply approved, or with the required changes.
- **Input decision** → add it to Waiting on the user with a number,
  its `ask` message id, a link to what it decides when there is one,
  and the choices, your recommended answer first. Reply to the
  `ask` once the user's answer arrives.

Log the answer under the asking worker's task before replying.

## Run tasks

One fresh session per worker. Each task worktree is a child of the
planning worktree in Orca lineage, git-based on the task's base,
named after the task, display name `<task id> - <goal>`, linked to
the task issue, and declared before its first worker starts.

| Worker             | Skill                | Model              | Placement                          | Title                                      |
| ------------------ | -------------------- | ------------------ | ---------------------------------- | ------------------------------------------ |
| Research questions | `research-questions` | `opus`             | planning worktree                  | `<task id> - <topic> - Research questions` |
| Research           | `research`           | `sonnet`           | planning worktree                  | `Research <n>`                             |
| Roadmap            | `v-slices`           | `opus`             | planning worktree                  | `<tracking issue id> - Roadmap`            |
| Design             | `program-design`     | `opus`             | task worktree, created if none     | `<task id> - Design`                       |
| Work               | `work`               | `sonnet`           | same task worktree, fresh terminal | `<task id> - Implementation`               |
| Monitor, operation | none                 | `opus` or `sonnet` | planning worktree                  | `<task id> - <goal>`                       |

For First tasks, `<task id>` is the tracking issue's id. A Research
spec and title name only the research questions path, nothing about
the change.

**First tasks.** Research questions, then Research, on the input; then
Roadmap.

**Per task kind.**

- **Change** → Design, then Work. Done when its PR is merged and its
  issue is closed. Merged always means merged into the default branch.
- **Research** → Research questions, then Research. Done when the
  research is published.
- **Monitor** → observe the signal until the done signal holds or the
  deadline passes. Done when the done signal is recorded on the
  issue; deadline passed → failed with the last observation.
- **Operation** → run the action. Done when the done signal is
  recorded on the issue.

**Ready.** A task is ready when every dependency is done and,
destination inside the repository, the planning PR holding the
documents it depends on is merged. For a change task with a base, a change dependency whose
Work settled succeeded counts as done. Start every ready task.

**Base.** No unmerged dependency → the default branch. Otherwise the
branch of the unmerged dependency that contains every other
dependency; no such branch → no base yet.

**Worker constraints.** Write the size rule, settings, and the
absolute paths of the decision log and `scripts/log-decision.sh` into
the spec as values. A Roadmap spec also carries the not yet specified
and out of scope rules and the open `not yet specified` rows.

- **Roadmap** — without confirmation, make the tracker match the
  roadmap. Each issue states its task's kind, goal, done signal, and
  deadline for a monitor; a change task issue also names the
  acceptance criteria it covers; research, monitor, and operation
  task issues name their question, signal, or action. A task found
  out of scope → close its issue as canceled with the reason, remove
  its blocking relations, and log `out of scope: <task>`. Write the
  roadmap nowhere else: no roadmap document, no tracking issue
  description, no comment. Destination inside the repository → commit the documents produced since the last
  planning PR and open a planning PR.
- **Design** — the input is the confirmed requirements, with no
  confirmation round; the architecture is explicitly waived. Obsolete
  against the task's base or over the size rule → settle failed
  naming what changed or the split.
- **Work** — rebase on the task's base, not the default branch, and
  target the PR at it; link the PR to the task issue. Merge only when
  the merge policy says so and the base is the default branch.
- **Monitor, operation** — record the result on the task issue.

## After each settlement

- Output missing at its destination → dispatch a fresh worker once
  with the same inputs; missing again → failed.
- A Roadmap worker fails, or a task fails again after a Roadmap
  worker handled its earlier failure → record the blocker on the task
  issue and ask the user as an input decision.
- Release the worker.

**PR rules.**

- Check open PRs' merge state.
- On merge: close the task issue, and retarget PRs based on its
  branch to the default branch.
- A task's branch merges or gets new commits → a fresh Work session
  for every open task PR that depends on it, directly or
  transitively. New review comments on an open task PR → a fresh
  Work session in its task worktree.

## Report

Before ending a turn in a Run:

- Every settled worker released; no reclaimable terminal.
- Every closed task issue with no live worker has its PR merged or
  closed and its task worktree removed.
- Every acceptance criterion named by a change task issue.
- The decision log published at the destination with every row.
- State complete → `scripts/tick.sh stop <run id>`; otherwise
  `scripts/tick.sh start <run id> <planning worktree>` and
  `scripts/compact.sh <run id> 8` ran.

Write the report to the planning worktree's Orca comment with
`scripts/note.sh text path:<planning worktree> "<report>"`, and
declare the planning worktree with the report's State, Waiting on
the user, and Blockers. One of these three differs from the
planning declaration before this write → end the turn with the
report; otherwise with one line naming what changed.

```
## <outcome>

**State:** complete | running | waiting on user | blocked

### Tasks
| Task | Kind | State | PR |
<one row per task non-completed; group completed ones on the same row; tasks and PRs show "and X others" after 5 items.>

### Not yet specified
<each open `not yet specified` work and the tasks it waits on, or "none">

### Waiting on the user
<questions, and PRs to merge, bases first, or "none">

### Blockers
<each unresolved blocker, or "none">
```

**States:**

- **complete** — done holds, no `not yet specified` row is open, and
  every follow-up is in the roadmap or logged out of scope.
- **running** — tasks in flight.
- **waiting on user** — progress needs an item in Waiting on the user:
  an answer or a merge.
- **blocked** — no task can progress without an unresolved blocker.
