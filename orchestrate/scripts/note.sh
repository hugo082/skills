#!/usr/bin/env bash
# Write one part of an orchestrate worktree's Orca comment, keeping the other part.
# The comment is the report text followed by one declaration line:
#   <!-- orchestrate {"v":1,...} -->
# Usage:
#   note.sh declare <worktree selector> <declaration json>   replace the declaration
#   note.sh text <worktree selector> <text>                  replace the report text
# The worktree selector is any `orca worktree set --worktree` selector, e.g. path:<path>.
# Uses $ORCA, or `orca` on PATH.
set -euo pipefail

usage() {
	printf 'usage: note.sh declare|text <worktree selector> <declaration json|text>\n' >&2
	exit 1
}

[ "$#" -eq 3 ] && [ -n "$2" ] || usage
mode=$1 worktree=$2 value=$3
orca=${ORCA:-orca}

current=$("$orca" worktree show --worktree "$worktree" --json | jq -r '.result.worktree.comment // ""')

# Splits the comment into the report text and the last declaration; one written by hand
# may span several lines.
text=$(printf '%s' "$current" | perl -0pe 's/<!-- orchestrate .*? -->\n?//gs')
block=$(printf '%s' "$current" | perl -0ne 'my @all = /(<!-- orchestrate .*? -->)/gs; print $all[-1] if @all')

case "$mode" in
	declare)
		declaration=$(printf '%s' "$value" | jq -ce 'if type == "object" and .v == 1 and (.role == "planning" or .role == "task") and (.runId | type) == "string" then . else error("a declaration needs v 1, role planning or task, and runId") end') ||
			usage
		# Escapes > so a value holding --> cannot end the HTML comment early.
		block="<!-- orchestrate ${declaration//>/\\u003e} -->"
		;;
	text) text=$value ;;
	*) usage ;;
esac

# Trailing newlines of the text are dropped so repeated writes stay identical.
text=$(printf '%s' "$text")
if [ -n "$text" ] && [ -n "$block" ]; then
	next=$(printf '%s\n\n%s' "$text" "$block")
else
	next="$text$block"
fi

[ "$next" != "$current" ] || exit 0
"$orca" worktree set --worktree "$worktree" --comment "$next" --json >/dev/null
