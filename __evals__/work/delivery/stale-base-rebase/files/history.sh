#!/usr/bin/env bash
set -eu
tmp=$(mktemp -d)
git checkout -qb feat/SHELF-33-author-sort
cat > "$tmp"/shelf-author.mjs <<'EOF'
import { readFileSync, writeFileSync } from "node:fs";
let s = readFileSync("src/books.js", "utf8");
s = s.replace('  if (sort === "title")', `  // TODO SHELF-33: author sort
  if (sort === "author") return copy;
  if (sort === "title")`);
writeFileSync("src/books.js", s);
EOF
node "$tmp"/shelf-author.mjs && rm "$tmp"/shelf-author.mjs
git commit -qam "feat(books): start the author sort"
tmp=$(mktemp -d)
git clone -q .origin.git "$tmp/up"
(
  cd "$tmp/up"
  git config user.name "Other Dev"; git config user.email "other@shelf.test"
  cat > "$tmp"/shelf-sorters.mjs <<'EOF'
import { readFileSync, writeFileSync } from "node:fs";
let s = readFileSync("src/books.js", "utf8");
s = s.replace(/export function listBooks[\s\S]*?\n}\n/, `const sorters = {
  added: (a, b) => b.added.localeCompare(a.added),
  title: (a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0),
};

export function listBooks({ sort = "added" } = {}) {
  return [...books].sort(sorters[sort] ?? sorters.added);
}
`);
writeFileSync("src/books.js", s);
EOF
  node "$tmp"/shelf-sorters.mjs && rm "$tmp"/shelf-sorters.mjs
  git commit -qam "refactor(books): sort through a sorters map"
  git push -q origin main
)
rm -rf "$tmp"
