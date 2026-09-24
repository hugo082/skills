# <Scope name> — Program Design

## Scope
- **Outcome:** [What this unit of work makes possible.]
- **Included behavior and acceptance criteria:** [Write out the relevant criteria
  and observable behavior, not just their upstream IDs.]
- **Explicitly excluded:** [Behavior outside this design's scope.]
- **Prerequisites:** [What must already exist in the repository or environment.]

## Constraints and shared contracts
[Write out the constraints and contracts needed to implement this scope:
payloads, data ownership, error semantics, consistency, compatibility, and
security requirements as applicable. Upstream documents inform this section,
but the reader must not need them. Omit irrelevant details.]

## File layout
[The tree of new and modified files, one line each stating the module's
single responsibility. Respect existing workspace/package boundaries.]

[Show file responsibility or a broad refactor as a shallow file tree diff]
```diff
 src/
 ├── commands/
+│   └── show-me.ts       # expands the slash command
 ├── sessions/
-└── transport.ts
+└── transport/
+    ├── client.ts
+    └── stream.ts
```

## Dependency direction
[Who imports whom. Which dependencies are injected vs constructed. Map the
boundaries and shared contracts stated above to concrete modules, identifying
which module owns each contract side.]

## Key types & signatures
[Reference concrete stub files in the repository rather than duplicating them;
include definitions here if they are not in the repository. Call out the
load-bearing types and the reasoning behind non-obvious shapes. The design and
repository together must contain every required signature and contract.]

## Call stacks
[Describe each flow covered by this scope and the acceptance criteria it
satisfies, then map it to handler → validator → service → repository using
actual names from the stubs. Every scoped flow must map to a call stack;
out-of-scope flows need no design. Do not rely on upstream flow IDs or prose.]

[Show a call-tree or call-stack change diff]
```diff
 on(save)
-  write content
+  if content is unchanged
+    return cached result
+  write new content
+  invalidate cache
```

## Error strategy
[Per layer: thrown vs returned, where errors translate between layers,
which errors cross the contract boundary and as what.]

## Test surface
[Which units get tested at which boundary, what gets mocked, what gets
integration-tested. Name the seams.]

## Verification
[For the acceptance criteria stated above, give executable verification commands
and their expected results, including required setup. Make the expected behavior
explicit without referring the implementer to another document.]

## Deviations
[Anywhere this design deviates from the architecture doc, state the original
constraint, the departure, and why. Silent deviation is the failure mode;
flagged deviation is normal.]
