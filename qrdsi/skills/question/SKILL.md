---
name: qrdsi-question
description: |
  Detangle ticket → targeted, objective research questions. Writes questions/NN-slug.md. Triggers:
  "ask questions for...", "qrdsi question", "/qrdsi:question <issue|text>".
  Loop-back run when questions/ already populated → append new file.
argument-hint: "<issue#|url|file|inline text>"
disable-model-invocation: true
---

# qrdsi-question — ticket → questions

Caveman tone. Preserve code/paths/URLs/identifiers verbatim.

## §G GOAL

Translate *what to build* → *what to understand*. Zero implementation opinion. Zero intent leak.

## §I INPUTS

- `$ARGUMENTS` ∈ {inline text, `#N`, GH URL, file path}
- If `#N` or URL → `gh issue view <N> --comments`
- If file path → read full
- Vague input ∴ tell user run `/ticket` first, stop

## §C CONSTRAINTS

- Folder: `.qrdsi/YY-MM-DD-<short-slug>/`
- `questions/NN-<slug>.md` ! append-only, monotonic NN
- Pre-exploration bounded ⊥ deep reads, ⊥ logic traces, ⊥ persistent notes

## §V INVARIANTS

V1: ∀ question → objective (how does X work?), ⊥ "should we"
V2: ⊥ reveal planned change in question text
V3: ∀ question → vertical slice, ⊥ overlap with siblings
V4: ∃ location hint ∈ each question when known
V5: first run → 3–7 Q; loop-back → 2–4 Q targeting gap only
V6: ⊥ overwrite existing `questions/*.md`
V7: pre-exploration skim-only ∴ stop @ first sign of design thought

## §T STEPS

```
id|status|task
T1|.|detect run mode (first vs loop-back: ls questions/)
T2|.|fetch input (gh issue | file | inline)
T3|.|light pre-explore: glob/grep nouns, ls zones, skim 1–2 entry, git log -20
T4|.|cluster zones touched
T5|.|draft NN questions targeting vertical slices
T6|.|write questions/<NN>-<slug>.md
T7|.|emit handoff block
```

## §F FILES

### `questions/<NN>-<slug>.md`

```markdown
---
id: <slug>
status: questioning
created: YYYY-MM-DD
---

# Research Questions — <NN>: <slug>

<!-- loop-back only -->
## Loop-back Context
[which prior research file triggered loop; 1–2 sentences]

## Area Under Exploration
[modules only. ⊥ verbs of change, ⊥ goals. Omit if can't write without leak.]

## Questions

### Q1: [title]
[objective question + location hint]

### Q2: [title]
...

## Scope Boundaries
- Likely relevant: [dirs/modules]
- Out of scope: [dirs/modules]
```

## §A ANTI-PATTERNS

- ❌ "How should we implement X?" → leaks intent
- ❌ "What's wrong with Y?" → critique
- ❌ "Research module Z" → too broad
- ✅ "How does Y handle Z today? Trace entry → storage."
- ✅ "What patterns does codebase use for X? Find 2–3 examples."

## §H HANDOFF

```
Artifact: .qrdsi/<folder>/questions/<NN>-<slug>.md
Summary: <neutral 1–2 sentence summary, ⊥ reveal planned change>
Next: /qrdsi:research .qrdsi/<folder>/
```
