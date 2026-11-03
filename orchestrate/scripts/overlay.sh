#!/usr/bin/env bash
# Print this project's overlay for a skill, or nothing when there is none.
# The overlay is ~/.claude/skill-overlays/<owner>-<repo>/<skill>/SKILL.md, where
# <owner>/<repo> comes from the origin remote of the current repository.
# Usage: overlay.sh <skill>
set -euo pipefail

[ "$#" -eq 1 ] && [ -n "$1" ] || {
	printf 'usage: overlay.sh <skill>\n' >&2
	exit 1
}

url=$(git remote get-url origin 2>/dev/null) || exit 0
key=$(printf '%s' "$url" | sed -E 's#/+$##; s#\.git$##; s#^.*[:/]([^/:]+)/([^/:]+)$#\1-\2#')
file="$HOME/.claude/skill-overlays/$key/$1/SKILL.md"

[ -f "$file" ] || exit 0
cat "$file"
