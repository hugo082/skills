#!/usr/bin/env bash
# Builds the Shelf repo in the current directory, with a local bare repo as `origin`.
# Usage: setup.sh <case-files-dir>. Runs <case-files-dir>/history.sh afterwards when present.
set -eu
fixture=$(cd "$(dirname "$0")" && pwd)
case_files=$(cd "$1" && pwd)

cp -R "$fixture/base/." .
git init -q -b main
git config user.name "Shelf Dev"
git config user.email "dev@shelf.test"
git add -A
git commit -qm "chore: start the shelf app"

git init -q --bare .origin.git
echo ".origin.git/" >> .git/info/exclude
git remote add origin "$PWD/.origin.git"
git push -q -u origin main

if [ -d "$case_files/repo" ]; then
  cp -R "$case_files/repo/." .
  git add -A
  git commit -qm "docs: add the case's issue files"
  git push -q origin main
fi

if [ -f "$case_files/history.sh" ]; then
  bash "$case_files/history.sh"
fi
git remote set-head origin main >/dev/null 2>&1 || true
