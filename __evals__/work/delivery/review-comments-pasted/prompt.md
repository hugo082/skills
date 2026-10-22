---
tags: [work, delivery]
max_turns: 150
timeout_seconds: 2700
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash, Agent]
---

PR #47 got a review, address it:

1. src/page.js — don't show "Finished" for books that aren't done
2. src/format.js — formatDate crashes on null, guard it
3. nit: rename `fd` to `finished`
4. could we also show the author's photo next to each book?
