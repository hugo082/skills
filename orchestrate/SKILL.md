---
name: orchestrate
description: Deliver a detailed input end to end as a long-running Orca coordinator. Researches the system, discovers a roadmap DAG of tasks, and grows it as tasks settle; runs each task in its own Orca session, one PR per implementation session; publishes the roadmap and documents to the project's tracker.
disable-model-invocation: true
---

**Done is every acceptance criterion in the input covered by a merged
change task, and every task in the roadmap done.**

**This session decides and talks to the user.** It writes no
document, reads no code, and runs no build, test, or CI watch. Read a
worker's `worker_done` summary and, for an approval, only the
sections the decision needs. Never read whole documents, diffs, or
transcripts.

**State lives in the tracker and at the document destination**, never
only in this session.

## Read the input

A document, issue identifier or link, or inline prompt. Read it and
every work item or document it references.

**Stop gate.** The input states:

- **Outcome** — what changes for whom.
- **Acceptance criteria** — externally observable, each testable.
- **Exclusions** — what is out of scope.
- **Constraints** — systems, contracts, data, and environments to
  respect.

Any item missing → reply with the missing items, create nothing (no
Run, issue, worktree, or document), and end the turn. Do not
interview the user to fill them.

**Settings.** Take each from the input; otherwise the default:

| Setting         | Default                                                         |
| --------------- | --------------------------------------------------------------- |
| Merge policy    | the user merges every PR                                        |
| Concurrency cap | none                                                            |
| Model, effort   | none passed                                                     |
| Roadmap grouping | milestones by outcome, tasks as issues, sub-tasks as sub-issues |

## Set up

1. Run `orca skills list` and load the Orca skills this workflow
   needs: orchestration, worktrees and terminals, and the project's
   issue tracker.
2. Tracker → the one the input's issue lives in, otherwise the
   repository's.
3. Document destination for research and design documents → the
   input or the repo convention; otherwise an Artifact per document,
   or the tracker for a worker that cannot publish Artifacts.
4. Tracking issue → the input's issue, or one created titled after
   the outcome with the input as its body. Its body holds the
   roadmap.
5. Create one Run for the input.

## Resume

Before starting any task, inventory:

- Pending worker `ask` messages → answer them first.
- The Run's tasks and live workers → adopt or settle them, never
  duplicate them.
- Documents at the destination.
- The tracking issue's roadmap and decision comments; every task
  issue's state, **Next action**, and **Design handoff**.
- Task worktrees, their PRs, and which are merged to the default
  branch.

A document at the destination whose Dispatch did not settle
succeeded → reopen its task with that document as input.

## Build the roadmap

**The roadmap is a DAG.** Nodes are tasks; an edge from A to B means
B waits on A. No cycles. Every task is an issue; every edge is a
blocking relation. Group tasks in the tracker per the roadmap
grouping setting.

Each task states:

- **Kind** — change, research, monitor, or operation.
- **Goal** and **done signal** — the observable result that settles
  it.
- **Parts** — the modules, contracts, data, and environments it
  changes or observes.
- **Dependencies** and **unlocks** — the tasks and decisions it waits
  on, and those it informs.

**You discover the roadmap** from the input and research, and grow it
from every settled task's results and follow-ups. The user does not
approve it.

**Size rule.** A change task is one PR from one worktree, implemented
in one `work` session, with one design approval. Needs more → a
Roadmap step splits it before work starts.

## Run tasks

One fresh session per step. Planning steps run in the current
worktree (the planning worktree). A change task runs in its own
worktree: a child of the planning worktree in Orca lineage, git-based
on its base branch (see Stacking), named after the task, display name
`<task id> - <goal>`, linked to the task issue.

| Step               | Skill                | Placement                          | Title                          |
| ------------------ | -------------------- | ---------------------------------- | ------------------------------ |
| Research questions | `research-questions` | planning worktree                  | `<topic> - Research questions` |
| Research           | `research`           | planning worktree                  | `Research <n>`                 |
| Roadmap            | `v-slices`           | planning worktree                  | `Roadmap`                      |
| Design             | `program-design`     | new task worktree                  | `<task id> - Design`           |
| Work               | `work`               | same task worktree, fresh terminal | `<task id> - Implementation`   |
| Restack            | `work`               | same task worktree, fresh terminal | `<task id> - Restack`          |
| Monitor, operation | none                 | planning worktree                  | `<task id> - <goal>`           |

**Start.**

1. Research questions, then Research, on the input.
2. Roadmap: discover the DAG.
3. Planning gate: destination inside the repository → the planning PR
   is merged to the default branch before any task worktree is
   created. Otherwise forward links.

**Per task kind.**

- **Change** → Design, Work, merge per the merge policy. Shipped
  when its PR is open with green CI. Done when its PR is merged and
  its issue is closed.
- **Research** → Research questions, then Research. Done when the
  research is published.
- **Monitor** → observe the named signal until the done signal holds
  or its deadline passes. Done when the observation is recorded on
  the issue.
- **Operation** → run the named action. Done when its done signal is
  recorded on the issue.

**Ready and parallel.** A task is ready when every dependency is done,
or shipped for a change task depending on a change task, and no
in-flight task changes a part it changes or observes. Start
every ready task, up to the concurrency cap.

**Stacking.** A change task's base branch:

- Every change dependency merged → the default branch.
- One change dependency shipped, not merged → that dependency's
  branch.
- Two or more change dependencies shipped, not merged → not ready
  until at most one remains unmerged.

A base PR merges → Restack each PR stacked on it onto the default
branch. A base PR gets new commits → Restack each PR stacked on it
onto the new head. The user merges stacks bottom-up.

**Roadmap updates.** Run a Roadmap step after:

- A change task's Work settles with follow-ups.
- A research, monitor, or operation task settles.
- A Design settles failed because the task is obsolete or exceeds
  the size rule.

One Roadmap step at a time, batching the results that arrived
meanwhile.

**Waiting on merges.** No task ready and only merges unblock the
rest → report the
waiting PRs to the user and check their merge state every 10
minutes. Do not end the turn unless a question awaits the user.

## Brief workers

Follow the Orca Task-spec contract. Each spec is self-contained and
includes:

- **Skill** — the skill to invoke, with its process and exit
  criteria.
- **Context** — absolute paths or links to every upstream document
  and issue the step consumes, except for Research.
- **Destination** — the exact path, Artifact, or issue for the
  output. Write there directly.
- **Decisions** — take every decision yourself, following
  established best practice, current standards, or the pragmatic
  option, and record each with its basis in the output. `ask` the
  coordinator only for a decision that changes the input's outcome,
  acceptance criteria, exclusions, or constraints, or that is
  irreversible. Where the skill requires user approval, `ask` the
  coordinator; its reply is that approval.
- **Completion** — `worker_done` succeeded once the output is
  published and, where the skill requires approval, approved;
  otherwise failed, with the reason in the body. The summary names
  the output location, the decisions taken, follow-ups, and any open
  blocker.

Per step:

- **Research questions** — the input or the research task's
  question; the tracking issue.
- **Research** — the research questions path only. Name no other
  document, issue, or description of the change in the spec or the
  title.
- **Roadmap** — the input as the confirmed requirements; research
  paths; the tracking issue; the size rule; the settled results and
  follow-ups since the last update. Change tasks follow the v-slices
  slicing rules; research, monitor, and operation tasks name their
  question, signal, or action and what they unlock. Add, split,
  merge, rewire, and close tasks; refresh the briefs of tasks about
  to start. Write the DAG in the tracking issue body and publish each
  task as an issue in its group with its blocking relations. No
  approval. First run with the destination inside the repository →
  commit the planning documents on the planning branch and open a PR
  to the default branch, reporting its link in `worker_done`.
- **Design** — the input as the confirmed requirements, with no
  confirmation round; research, roadmap, and the task issue; the
  size rule. The architecture is explicitly waived. First compare the
  brief's boundary, dependencies, and prerequisites against its base
  branch; obsolete or over the size rule → settle
  failed naming what changed or the split. Otherwise write the design
  at the destination and, after approval, update the task issue's
  Design handoff and Next action. Change no repository file and
  commit nothing.
- **Work** — the approved design, the task issue, and the base
  branch. Commit on the task branch, open a PR targeting the base
  branch, name the PR it stacks on in the description, attach it to
  the task issue with a completion comment, and move the issue to
  review. Merge only when the merge policy says so. Out-of-scope
  findings and deferred work go in the follow-ups, never in the PR.
- **Restack** — the task's PR, its new base, and the base PR.
  Rebase the task branch onto the new base, retarget the PR to it,
  and keep CI green. Change nothing else.
- **Monitor and operation** — the task issue; the signal or action,
  the done signal, and the deadline. Record the result on the task
  issue.

## Answer workers

Each `ask`:

- **Approval request** → check the output against its skill's exit
  criteria, the input, and the recorded decisions. Reply approved,
  or reply with the required changes.
- **Decision** → take it on the same basis as workers; reply with
  the decision and its basis.
- **Decision that changes the input's outcome, acceptance criteria,
  exclusions, or constraints, or that is irreversible** → ask the
  user in this session, numbered, each with your recommended answer,
  batching every pending question. Reply to the worker with the
  user's answer.

Record every decision as a comment on the tracking issue before
replying.

## After each settlement

- Output missing at its destination or in the tracker → reopen the
  step with the same inputs. Otherwise release the worker.
- Check open PRs' merge state.
- Update the planning worktree comment.

## Report

Before ending a turn: every Dispatch in the Run settled and released,
no reclaimable terminal, every output at its destination, every task
an issue in the tracker.

Final message:

```
## <outcome>

**State:** complete | running | waiting on merge | waiting on user | blocked

### Tasks
| Task | Kind | State | Issue | PR |
<one row per task reached>

### Merge order
<open PRs, bottom-up per stack, or "none">

### Waiting on the user
<questions, or "none">

### Blockers
<each unresolved blocker, or "none">
```

**States:**
- **complete** — every task done, every acceptance criterion covered
  by a merged change task, no follow-up outside the roadmap.
- **running** — tasks in flight.
- **waiting on merge** — no task ready; only merges unblock the
  rest.
- **waiting on user** — a question awaits the user.
- **blocked** — no task can progress without an unresolved blocker.
