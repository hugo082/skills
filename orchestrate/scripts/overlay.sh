#!/usr/bin/env bash
# Print the overlay path and content for a skill in a repository.
# The overlay is ~/.claude/skill-overlays/<owner>-<repo>/<skill>/SKILL.md, where
# <owner>/<repo> comes from the origin remote of <repo path>.
# Output: first line `overlay: <file>` then its content, or `overlay: none (<file>)`.
# Exits 1 when <repo path> is not a git repository with an origin remote.
# Usage: overlay.sh <skill> <repo path>
set -euo pipefail

[ "$#" -eq 2 ] && [ -n "$1" ] && [ -n "$2" ] || {
	printf 'usage: overlay.sh <skill> <repo path>\n' >&2
	exit 1
}

url=$(git -C "$2" remote get-url origin 2>/dev/null) || {
	printf 'overlay.sh: %s is not a git repository with an origin remote\n' "$2" >&2
	exit 1
}
key=$(printf '%s' "$url" | sed -E 's#/+$##; s#\.git$##; s#^.*[:/]([^/:]+)/([^/:]+)$#\1-\2#')
file="$HOME/.claude/skill-overlays/$key/$1/SKILL.md"

if [ -f "$file" ]; then
	printf 'overlay: %s\n\n' "$file"
	cat "$file"
else
	printf 'overlay: none (%s)\n' "$file"
fi
