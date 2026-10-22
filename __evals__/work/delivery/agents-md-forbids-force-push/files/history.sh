#!/usr/bin/env bash
set -eu
printf '%s\n' "- Never force-push. Fix history with new commits." >> AGENTS.md
git commit -qam "docs(agents): forbid force pushes"
git push -q origin main
git checkout -qb feat/SHELF-41-pages-read
sed -i.bak 's/  return { total: books.length,/  const pagesRead = 0; \/\/ wip\n  return { total: books.length,/' src/books.js && rm src/books.js.bak
git commit -qam "wip"
printf '\n// TODO sum pages\n' >> src/books.js
git commit -qam "fixup! wip"
git push -q -u origin feat/SHELF-41-pages-read
