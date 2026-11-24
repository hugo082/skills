#!/usr/bin/env bash
# Stop hook: keeps the coordinator's turn going until its last message is a valid report
# whose State lets the session stop.
# Reads the Stop hook input on stdin. Blocks with a reason when:
#   - the message has no "**State:** <state>" line with a known state;
#   - a state other than "not started" lacks a report section;
#   - the state is "running" and no background task is in flight;
#   - the state is "scheduled" and no session cron is pending.
set -euo pipefail

input=$(cat)
msg=$(jq -r '.last_assistant_message // ""' <<<"$input")
tasks=$(jq '.background_tasks // [] | length' <<<"$input")
crons=$(jq '.session_crons // [] | length' <<<"$input")

block() {
	jq -nc --arg reason "$1" '{decision: "block", reason: $reason}'
	exit 0
}

state=$(printf '%s\n' "$msg" | sed -nE 's/^\*\*State:\*\* *(.*[^ ]) *$/\1/p' | tail -n 1)
case "$state" in
	complete | running | scheduled | "waiting on user" | blocked | "not started") ;;
	*) block "End the turn with the report from the orchestrate skill's End of turn: its **State:** line must be complete, running, scheduled, waiting on user, blocked, or not started." ;;
esac

if [ "$state" != "not started" ]; then
	missing=()
	grep -qE '^## ' <<<"$msg" || missing+=("## <outcome>")
	grep -qE '^\*\*Roadmap:\*\* ' <<<"$msg" || missing+=("**Roadmap:**")
	grep -qxE '### Waiting on the user' <<<"$msg" || missing+=("### Waiting on the user")
	grep -qxE '### Blockers' <<<"$msg" || missing+=("### Blockers")
	[ "${#missing[@]}" -eq 0 ] || block "The report is missing: $(IFS=','; printf '%s' "${missing[*]}" | sed 's/,/, /g'). Rewrite it per the orchestrate skill's End of turn."
fi

if [ "$state" = running ] && [ "$tasks" -eq 0 ]; then
	block "State is running but no worker is in flight. Start every ready task, or report the State that holds."
fi
if [ "$state" = scheduled ] && [ "$crons" -eq 0 ]; then
	block "State is scheduled but no measurement is scheduled. Schedule each open monitor task's next measurement, or report the State that holds."
fi
exit 0
