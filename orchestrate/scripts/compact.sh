#!/usr/bin/env bash
# Count this session's wakes for a Run and compact its context every <every> wakes.
# Usage: compact.sh <run id> <every>
# Below the count: prints "wake <n>/<every>". At the count: starts a detached compact of
# $ORCA_AGENT_SESSION_ID that waits for the current turn to end, then mails the Run a
# "resume" message, and prints "compact scheduled". Without $ORCA_AGENT_SESSION_ID:
# prints "compact unavailable".
set -euo pipefail

[ "$#" -eq 2 ] && [ -n "$1" ] && [ "$2" -gt 0 ] 2>/dev/null || {
	printf 'usage: compact.sh <run id> <every>\n' >&2
	exit 2
}
run=$1 every=$2
orca=${ORCA:-orca}
here=$(cd "$(dirname "$0")" && pwd)
state="${XDG_STATE_HOME:-$HOME/.local/state}/orchestrate"
mkdir -p "$state"
count_file="$state/$run.wakes" log="$state/$run.compact.log"

n=$(($(cat "$count_file" 2>/dev/null || echo 0) + 1))
if [ "$n" -lt "$every" ]; then
	echo "$n" >"$count_file"
	printf 'wake %s/%s\n' "$n" "$every"
	exit 0
fi
echo 0 >"$count_file"

session=${ORCA_AGENT_SESSION_ID:-}
if [ -z "$session" ]; then
	echo "compact unavailable"
	exit 0
fi
bin=${ORCA_CLI_BIN_DIR:-$(dirname "$(command -v "$orca")")}
out="$bin/../app.asar.unpacked/out"

# Retries every 3 s for 10 min while the turn is active.
nohup bash -c '
	for _ in $(seq 1 200); do
		res=$(node "$1/compact-session.cjs" "$2" "$3")
		case "$res" in *turnActive*) sleep 3; continue ;; esac
		printf "%s %s\n" "$(date -u +%FT%TZ)" "$res" >>"$4"
		if printf "%s" "$res" | grep -q "\"state\":\"completed\""; then
			"$5" orchestration send --to "run:$6" --subject resume \
				--body "Your context was compacted. Resume." --json >>"$4" 2>&1
		fi
		exit 0
	done
	printf "%s gave up: turn still active after 10 min\n" "$(date -u +%FT%TZ)" >>"$4"
' _ "$here" "$out" "$session" "$log" "$orca" "$run" >/dev/null 2>&1 &
echo "compact scheduled"
