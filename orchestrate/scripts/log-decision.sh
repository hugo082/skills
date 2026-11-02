#!/usr/bin/env bash
# Append a row to the orchestrate decision log (TSV).
# Usage: log-decision.sh <logfile> <task> <decision> <why> <evidence>
set -euo pipefail

usage() {
	printf 'usage: log-decision.sh <logfile> <task> <decision> <why> <evidence>\n' >&2
	exit 1
}

[ "$#" -eq 5 ] || usage
for a; do [ -n "$a" ] || usage; done

logfile="$1"
shift

mkdir -p "$(dirname "$logfile")"
# noclobber makes the create exclusive, so concurrent first appends write
# one header.
(set -C; printf 'ts\ttask\tdecision\twhy\tevidence\n' > "$logfile") 2>/dev/null || true

# Keep each cell on one line, and quote cells a spreadsheet would read as
# a formula.
clean() {
	local v
	v=$(printf '%s' "$1" | tr '\t\n\r' '   ')
	case "$v" in
		=*|+*|-*|@*) printf "'%s" "$v" ;;
		*) printf '%s' "$v" ;;
	esac
}

printf '%s\t%s\t%s\t%s\t%s\n' \
	"$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
	"$(clean "$1")" "$(clean "$2")" "$(clean "$3")" "$(clean "$4")" \
	>> "$logfile"
