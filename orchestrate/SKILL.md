---
name: orchestrate
description: Deliver a detailed input end to end as an Orca coordinator that runs in rounds, each a fresh session. Researches the system, discovers a roadmap DAG of tasks, and grows it as tasks settle; runs each task in its own Orca session, one PR per implementation session; publishes the roadmap and documents to the project's tracker.
disable-model-invocation: true
---

**Done is every acceptance criterion in the input covered by a merged
change task, and every task in the roadmap done.**

This session writes no document other than decision log rows, reads
no code, and runs no build, test, or CI watch. For an approval, read
only the sections the decision needs. Never read whole documents,
diffs, or transcripts.

## Project context

Before anything else, run `<skill dir>/scripts/overlay.sh orchestrate`.
Its output, when not empty, overrides this skill's generic tool
choices.

## Read the input

**Stop gate.** The input (a document, issue, or prompt) states:

- **Outcome** — what changes for whom.
- **Acceptance criteria** — externally observable, each testable.
- **Exclusions** — what is out of scope.
- **Constraints** — systems, contracts, data, and environments to
  respect.

Any item missing → reply with the missing items, create nothing (no
Run, automation, issue, worktree, or document), and end the turn. Do not
interview the user to fill them.

**Settings.** From the input; otherwise the default:

- **Merge policy** — who merges PRs. Default: the user.
- **Grouping** — how tasks are grouped in the tracker. Default:
  milestones by outcome, tasks as issues.

## Rounds

Prompt `/orchestrate round <run id> <front pane> <input>` → a
round; it skips the stop gate. In the front, prompts follow Front.
Any other prompt → bootstrap. No `$ORCA_TERMINAL_HANDLE` → reply "run
from an Orca terminal" and end the turn. Otherwise run the stop gate,
then the commands below, front pane = `<tabId>:<leafId>` of the row
whose `handle` is `$ORCA_TERMINAL_HANDLE` in `orca terminal list
--worktree path:<planning worktree> --json`,
skipping `run-create` when a Run with objective `<outcome>` exists,
and `automations create` when the automation `orchestrate -
<outcome>` exists:

```
orca orchestration run-create --objective "<outcome>"
orca automations create --name "orchestrate - <outcome>" --provider claude \
  --workspace path:<planning worktree> --fresh-session --disabled \
  --trigger "*/10 * * * *" \
  --prompt "/orchestrate round <run id> <front pane> <input>"
orca automations edit <automation id> --enabled --precheck-timeout 600 \
  --prompt "/orchestrate round <run id> <front pane> <input>" \
  --precheck "<skill dir>/scripts/round-due.sh <absolute orca path> <run id> <automation id> 590 60"
orca automations run <automation id>
```

Reply with the Run and automation ids, and end the turn.

## Front

After bootstrap, this session is the front. It never dispatches or
coordinates.

- Prompt starting `[round]` → relay it to the user; send nothing.
- User answer or instruction → `orca orchestration send --to
  run:<run id> --subject user --body "<message>"`, naming the question
  number it answers.

## Resume

At the start of each round, run `orca orchestration run-use --id
<run id>` and `orca orchestration check`, then inventory pending
`ask` messages (answer them first), messages with subject `user`
(log each; an answer → reply to its `ask` or apply it; any other
instruction → an input change, applied through a Roadmap worker),
workers `stale` in `worker-list` whose latest message from the Run is
newer than their own (resend it with `orca orchestration send --to
dispatch:<id>`), the
Run's live workers (adopt
them, never duplicate), documents at the destination, the decision
log, the tracking issue's roadmap, every task issue's state, and
every task PR and its base. Then apply After each settlement's PR
rules.

## Set up

1. Run `orca skills list` and load the Orca skills this workflow
   needs: orchestration, worktrees and terminals, and the project's
   issue tracker.
2. Resolve the tracking issue: the one found in Resume or given in
   the input; otherwise create one in the project's tracker titled
   after the outcome.
3. Resolve the document destination: the input or the repo
   convention. None found → ask the user as an input decision and
   end the round.
4. Decision log: `<planning worktree>/decisions-<run id>.tsv`. Every
   decision in the Run, by you or a worker, including each user
   answer, is one row appended only with `scripts/log-decision.sh`;
   `references/decision-log.tsv` shows the rows. Publish it at the
   document destination like the other documents.
5. Declare the Run on its worktrees, every round:
   `scripts/note.sh declare path:<worktree> '<declaration>'` for the
   planning worktree and every task worktree of the Run.
   `references/declaration.json` shows both declarations; tracking is
   the tracking issue.

## Continuous discovery

**The roadmap is a DAG.** Nodes are tasks; an edge from A to B means
B waits on A. Every edge is a blocking relation in the
tracker.

Each task states:

- **Kind** — change, research, monitor, or operation.
- **Goal** and **done signal** — the observable result that settles
  it.
- **Dependencies** and **unlocks** — the tasks it waits on, and the
  tasks and decisions it informs.
- **Deadline** — monitor tasks only.

**Size rule.** A change task is one PR from one worktree, implemented
in one `work` session, with one design approval.

Each change to the roadmap goes through a Roadmap worker; the user
does not approve it.

Run a Roadmap worker after:

- A change task's Work settles with follow-ups.
- A research, monitor, or operation task settles.
- Any worker other than Roadmap settles failed.

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
  constraints, or that is irreversible.
- **Approval** — where the skill requires user approval, `ask` the
  coordinator; its reply is that approval.
- **Completion** — `worker_done` succeeded once the output is
  published and, where required, approved; otherwise failed, with
  the reason in the body. The summary names the output location,
  follow-ups, and any open blocker.

Answer each `ask`:

- **Approval request** → check against the input's acceptance
  criteria, exclusions, and constraints, and the decision log.
  Reply approved, or with the required changes.
- **Input decision** → add it to Waiting on the user with a number,
  your recommended answer, and its `ask` message id. Reply to the
  `ask` once the user's answer arrives.

Log the answer under the asking worker's task before replying.

## Run tasks

One fresh session per worker. The planning worktree is the current
worktree. Each task worktree is a child of the planning worktree in
Orca lineage, git-based on the task's base, named after the task,
display name `<task id> - <goal>`, linked to the task issue, and
declared with `scripts/note.sh declare` (task declaration) before its
first worker starts.

| Worker             | Skill                | Placement                          | Title                          |
| ------------------ | -------------------- | ---------------------------------- | ------------------------------ |
| Research questions | `research-questions` | planning worktree                  | `<topic> - Research questions` |
| Research           | `research`           | planning worktree                  | `Research <n>`                 |
| Roadmap            | `v-slices`           | planning worktree                  | `Roadmap`                      |
| Design             | `program-design`     | task worktree, created if none     | `<task id> - Design`           |
| Work               | `work`               | same task worktree, fresh terminal | `<task id> - Implementation`   |
| Monitor, operation | none                 | planning worktree                  | `<task id> - <goal>`           |

A Research spec and title name only the research questions path,
nothing about the change.

**Start.** Research questions, then Research, on the input; then
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
destination inside the repository, the planning PR that added it is
merged. For a change task with a base, a change dependency whose
Work settled succeeded counts as done. Start every ready task.

**Base.** No unmerged dependency → the default branch. Otherwise the
branch of the unmerged dependency that contains every other
dependency; no such branch → no base yet.

**Worker constraints.** Write the size rule, settings, and the
absolute paths of the decision log and `scripts/log-decision.sh` into
the spec as values.

- **Roadmap** — publish without confirmation: the DAG in the
  tracking issue body, mapping each acceptance criterion to the
  change tasks that cover it; one issue per task, grouped per the
  grouping setting. Research, monitor, and operation tasks name
  their question, signal, or action. Destination inside the
  repository → commit the documents produced since the last
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
- Check open PRs' merge state.
- On merge: close the task issue, and retarget PRs based on its
  branch to the default branch.
- A task's branch merges or gets new commits → a fresh Work session
  for every open task PR that depends on it, directly or
  transitively. New review comments on an open task PR → a fresh
  Work session in its task worktree.
- Update the planning worktree comment with `scripts/note.sh text`.

## Report

Before ending a round:

- Every settled worker released; no reclaimable terminal.
- Every closed task issue with no live worker has its PR merged or
  closed and its task worktree removed.
- Every task an issue in the tracker.
- The decision log published at the destination with every row.
- State complete → the round automation disabled.

Write the report to the planning worktree's Orca comment with
`scripts/note.sh text path:<planning worktree> "<report>"`. Then
deliver to the front: its State, Waiting on the user, and Blockers
sections differ from the content of
`${XDG_STATE_HOME:-$HOME/.local/state}/orchestrate/<run id>.front`
(missing file → they differ) →

1. Front handle = the `handle` of the row whose `<tabId>:<leafId>`
   is the front pane in `orca terminal list --worktree
   path:<planning worktree> --json`. No such row → skip delivery.
2. `orca terminal send --terminal <front handle> --text "[round]
   <sections>" --enter --json`.
3. Receipt `accepted: true` → overwrite that file with the three
   sections. Send failed → leave the file unchanged.

Leave the round's terminal open.

```
## <outcome>

**State:** complete | running | waiting on user | blocked

### Tasks
| Task | Kind | State | Issue | PR |
<one row per task reached>

### Waiting on the user
<questions, and PRs to merge, bases first, or "none">

### Blockers
<each unresolved blocker, or "none">
```

**States:**
- **complete** — done holds and no follow-up is outside the roadmap.
- **running** — tasks in flight.
- **waiting on user** — a question awaits the user.
- **blocked** — no task can progress without an unresolved blocker.
