#!/usr/bin/env bash
# Precheck of the orchestrate round automation: exit 0 when a round is due.
# Usage: round-due.sh <orca executable> <run id> <automation id> <wait seconds> <idle minutes>
# Due: unread mail in the Run's inbox, or no round for <idle minutes>.
# Waits while another round of the automation runs. Not due: <wait seconds>
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

round_running() {
	local since=$((($(date +%s) - 3 * 3600) * 1000))
	[ "$("$orca" automations runs --id "$automation" --limit 20 --json |
		jq --argjson since "$since" \
			'[.result.runs[] | select(.status == "running" and (.startedAt // 0) > $since)] | length')" -gt 0 ]
}

deadline=$(($(date +%s) + wait))
while [ "$(date +%s)" -lt "$deadline" ]; do
	if ! round_running; then
		unread=$("$orca" orchestration inbox --terminal "run:$run" --limit 50 --json |
			jq '[.result.messages[] | select(.handled == false and .type != "heartbeat")] | length')
		[ "$unread" -eq 0 ] || due
		[ -n "$(find "$stamp" -mmin -"$idle" 2>/dev/null)" ] || due
	fi
	sleep 5
done
exit 1
