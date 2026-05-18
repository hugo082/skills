---
name: qrdsi-implement
description: |
  Autonomous implementer + PR manager. Opens draft PR @ start, pushes every atomic conventional commit, monitors CI green, flips PR to ready-for-review when done. Works WITHOUT pausing.
  Triggers: "/qrdsi:implement .qrdsi/<folder>/".
argument-hint: ".qrdsi/<folder>/"
disable-model-invocation: false
---

# qrdsi-implement — execute + ship

Caveman tone. Code/commits/PR body → write normal English. Preserve identifiers verbatim.

## §G GOAL

Execute approved design + structure end-to-end autonomously. Atomic conventional commits. Draft PR open from commit 1 → push every commit → CI monitored green → flip ready-for-review on success.

## §I INPUTS

- `.qrdsi/<folder>/design.md` (domain locked)
- `.qrdsi/<folder>/structure.md` (phases, file tree)
- `.qrdsi/<folder>/research/*.md` (file:line refs, all)
- Load `domain-driven-design-for-typescript` skill if available

## §C CONSTRAINTS

- Branch ! `qrdsi/<short-slug>` (create if absent)
- PR opens **draft** before commit 1 (empty branch OK; push empty initial commit if needed | open after commit 1 if gh requires diff)
- ∀ commit → atomic, single coherent change, builds + tests pass standalone
- ∀ commit → Conventional Commits: `<type>(<scope>)?: <subject>` (subject imperative ≤72 chars)
- types ∈ {feat, fix, refactor, docs, test, chore, perf, build, ci, style}
- Body when "why" ⊥ obvious from diff
- Push after EVERY commit → `git push origin HEAD`
- ⊥ `--no-verify`, ⊥ skip hooks
- ⊥ pause between phases (autonomous)
- Working tree ! clean between commits (`git status` empty)
- CI red → diagnose root cause, fix, new commit (⊥ amend pushed work)
- All phases done + CI green → `gh pr ready <N>` → flip to ready-for-review

## §V INVARIANTS

V1: PR draft exists before any code commit (or immediately after first push)
V2: ∀ pushed commit → conventional + atomic + green build standalone
V3: ⊥ force-push to shared branch (only safe rebase pre-first-push)
V4: ⊥ amend already-pushed commits
V5: CI red ∴ stop new feature commits, fix-first commit lands
V6: PR body cites design.md + structure.md + Closes #<issue>
V7: Scope strictly from structure.md phases. ⊥ scope creep
V8: ⊥ flip PR ready until all phases checked + CI green on tip

## §T STEPS

```
id|status|task
T1|.|read design.md, structure.md, all research/*.md
T2|.|resolve source issue#: task.md Source field | scan for #N | ask if missing
T3|.|create/switch branch qrdsi/<slug>
T4|.|push branch + open draft PR w/ initial body (template below)
T5|.|loop ∀ phase in structure.md:
T5.1|.|  read all files this phase touches (full reads)
T5.2|.|  implement atomic change 1 (smallest coherent unit) → run automated checks → commit → push
T5.6|.|  phase validation pass → check off structure.md phase
T6|.|all phases done → run full test suite locally
T7|.|monitor CI: `gh pr checks <N> --watch` until green | red
T7.1|.|  red → diagnose root, fix-commit (Conventional `fix:`), push, re-monitor
T8|.|update PR body w/ final phase summary + verification result
T9|.|`gh pr ready <N>` → flip to ready-for-review
T10|.|emit handoff
```

## §A ATOMIC COMMIT POLICY

Split each phase into the smallest coherent commits:

- `refactor:` move/rename before behavior change
- `feat:` add new capability (one capability per commit)
- `test:` tests for a feature land separately or in same commit, ⊥ bundled across features
- `fix:` only for bugs introduced earlier in this PR or pre-existing
- `chore:` deps, config bumps
- `docs:` docs-only

Examples:

```
feat(orders): add Order aggregate w/ place invariant
test(orders): cover Order.place invariant edge cases
feat(orders): add CreateOrderUseCase orchestration
feat(infra/persistence): add PostgresOrderRepository
build(db): add 042_orders migration
feat(infra/http): POST /v1/orders endpoint
chore(di): bind OrderRepository → Postgres impl
```

⊥ `chore: phase 2 stuff` (bundle).

## §P PR LIFECYCLE

### Open draft (before/after first push)

```bash
gh pr create --draft \
  --title "<type>(<scope>): <imperative summary>" \
  --body "$(cat <<'EOF'
## Summary
[2–3 sentences from design.md Executive Summary]

## Status
🚧 Work in progress — phases landing as atomic commits.

## Design Decisions
[brief bullets from design.md Resolved Decisions]

## Phases
- [ ] Phase 1: [name from structure.md]
- [ ] Phase 2: [name]
- [ ] Phase 3: [name]

## Testing
[from structure.md Testing Strategy]

## QRDSI Artifacts
- Design: `.qrdsi/<folder>/design.md`
- Structure: `.qrdsi/<folder>/structure.md`
- Research: `.qrdsi/<folder>/research/` (<N> files)
- Questions: `.qrdsi/<folder>/questions/` (<N> files)

Closes #<issue-number>
EOF
)"
```

### Per-commit push + monitor

```bash
git push origin HEAD
gh pr checks <N> --watch          # blocks until checks settle
```

CI red → read failing job logs (`gh run view --log-failed`) → fix-commit → push → re-watch.

### Flip ready

```bash
gh pr ready <N>
```

Update PR body: check off all phase boxes, replace "🚧 Work in progress" w/ "✅ Ready for review", append final verification summary.

## §M MISMATCH HANDLING

Sub-step finds plan ⊥ match reality:

- Minor (file moved, fn renamed) → adapt + commit + continue
- Fundamental (approach broken, missing dep, design assumption false) → STOP, escalate:

```
⚠️ Implementation blocked at Phase N, step <X>:
Expected: [what structure.md says]
Found: [actual situation]
Attempted: [what was tried]
Decision needed before proceeding.
```

⊥ flip PR ready until resolved.

## §A ANTI-PATTERNS

- ❌ Pause between phases for approval → autonomous mandate
- ❌ One giant `chore: implement feature` commit → ⊥ atomic
- ❌ Push first, monitor never → CI red goes undetected
- ❌ `--amend` after push → rewrites shared history
- ❌ `--no-verify` to bypass hooks → V invariant violation
- ❌ Flip ready-for-review w/ red CI → ⊥ allowed
- ❌ Scope creep beyond structure.md → out of scope
- ✅ Lean atomic commits, each green, pushed, watched, then next
- ✅ Draft PR from start so reviewers can subscribe early

## §H HANDOFF

```
Artifact: <PR URL>
Summary: <N phases shipped, M commits, CI green, ready-for-review> — closes #<issue>
```

Escalated blocker → add `Next:` w/ blocker description + leave PR in draft.
