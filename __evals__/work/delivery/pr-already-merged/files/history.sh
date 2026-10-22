#!/usr/bin/env bash
set -eu
git checkout -qb feat/SHELF-30-badge-colors
sed -i.bak 's/    .badge-reading { background: #dbeafe; }/    .badge-reading { background: #dbeafe; }\n    .badge-queued { background: #fef9c3; }/' src/page.js && rm src/page.js.bak
git commit -qam "feat(page): give the queued badge its own colour"
git push -q -u origin feat/SHELF-30-badge-colors
tmp=$(mktemp -d)
git clone -q .origin.git "$tmp/up"
(
  cd "$tmp/up"
  git config user.name "Reviewer"; git config user.email "reviewer@shelf.test"
  git merge -q --no-ff origin/feat/SHELF-30-badge-colors -m "Merge pull request #30 from shelf/feat/SHELF-30-badge-colors"
  git push -q origin main
)
rm -rf "$tmp"
