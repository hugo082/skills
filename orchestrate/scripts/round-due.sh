#!/usr/bin/env bash
# Precheck of the orchestrate round automation: exit 0 when a round is due.
# Usage: round-due.sh <orca executable> <run id> <automation id> <wait seconds> <idle minutes>
# Due: unread mail in the Run's inbox, or no round for <idle minutes>.
# Not due: another round of the automation is running, or <wait seconds>
# pass with neither.
set -euo pipefail

usage() {
	printf 'usage: round-due.sh <orca> <run id> <automation id> <wait seconds> <idle minutes>\n' >&2
	exit 2
}

[ "$#" -eq 5 ] || usage
orca=$1 run=$2 automation=$3 wait=$4 idle=$5

stamp="${XDG_STATE_HOME:-$HOME/.local/state}/orchestrate/$run.last-round"
mkdir -p "$(dirname "$stamp")"

due() {
	touch "$stamp"
	exit 0
}

# A running round started within the last 3 hours blocks a second one.
now_ms=$(($(date +%s) * 1000))
running=$("$orca" automations runs --id "$automation" --limit 20 --json |
	jq --argjson since $((now_ms - 3 * 3600 * 1000)) \
		'[.result.runs[] | select(.status == "running" and (.startedAt // 0) > $since)] | length')
[ "$running" -eq 0 ] || exit 1

deadline=$(($(date +%s) + wait))
while [ "$(date +%s)" -lt "$deadline" ]; do
	unread=$("$orca" orchestration inbox --terminal "run:$run" --limit 50 --json |
		jq '[.result.messages[] | select(.handled == false and .type != "heartbeat")] | length')
	[ "$unread" -eq 0 ] || due
	[ -n "$(find "$stamp" -mmin -"$idle" 2>/dev/null)" ] || due
	sleep 5
done
exit 1
