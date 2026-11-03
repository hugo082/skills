#!/usr/bin/env bash
# Precheck of the orchestrate round automation: exit 0 when a round is due.
# Usage: round-due.sh <orca executable> <run id> <automation id> <wait seconds> <idle minutes>
# Due: unread mail in the Run's inbox, or no round for <idle minutes>.
# Waits while another round of the automation runs. Not due: <wait seconds>
# pass with neither. Closes the tabs of completed rounds.
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

# Closes the tab of every completed round still open.
reap() {
	local workspace ptys
	workspace=$(jq -r '.result.runs[0].workspaceId // empty' <<<"$1")
	ptys=$(jq -c '[.result.runs[] | select(.status == "completed" and .terminalPtyId != null) | .terminalPtyId]' <<<"$1")
	[ -n "$workspace" ] && [ "$ptys" != "[]" ] || return 0
	"$orca" terminal list --worktree "id:$workspace" --json |
		jq -r --argjson ptys "$ptys" '.result.terminals[] | select(.ptyId as $p | $ptys | index($p)) | .handle' |
		while read -r handle; do
			"$orca" terminal close --terminal "$handle" --tab --json >/dev/null || true
		done
}

deadline=$(($(date +%s) + wait))
while [ "$(date +%s)" -lt "$deadline" ]; do
	runs=$("$orca" automations runs --id "$automation" --limit 20 --json)
	reap "$runs"
	since=$((($(date +%s) - 3 * 3600) * 1000))
	running=$(jq --argjson since "$since" \
		'[.result.runs[] | select(.status == "running" and (.startedAt // 0) > $since)] | length' <<<"$runs")
	if [ "$running" -eq 0 ]; then
		unread=$("$orca" orchestration inbox --terminal "run:$run" --limit 50 --json |
			jq '[.result.messages[] | select(.handled == false and .type != "heartbeat")] | length')
		[ "$unread" -eq 0 ] || due
		[ -n "$(find "$stamp" -mmin -"$idle" 2>/dev/null)" ] || due
	fi
	sleep 5
done
exit 1
