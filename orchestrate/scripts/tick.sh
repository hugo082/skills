#!/usr/bin/env bash
# Wake a Run's coordinator when something changed that sends no mail.
# Usage:
#   tick.sh start <run id> <planning worktree>   start the ticker unless it runs
#   tick.sh stop <run id>                         stop it
# Every 10 min the ticker mails the Run a "tick" when one of the Run's pull requests
# changed (state, commits, reviews, comments), the mail-doctor.sh report changed, or
# 60 min passed since the last tick. The body names the reasons and holds the report.
# Run's pull requests: those of the worktrees declaring the Run.
set -euo pipefail

usage() {
	printf 'usage: tick.sh start <run id> <planning worktree> | tick.sh stop <run id>\n' >&2
	exit 2
}

orca=${ORCA:-orca}
here=$(cd "$(dirname "$0")" && pwd)
state="${XDG_STATE_HOME:-$HOME/.local/state}/orchestrate"
mkdir -p "$state"

case "${1:-}" in
	start) [ "$#" -eq 3 ] && [ -n "$2" ] && [ -d "$3" ] || usage ;;
	stop) [ "$#" -eq 2 ] && [ -n "$2" ] || usage ;;
	loop) ;;
	*) usage ;;
esac
run=$2
pid_file="$state/$run.tick.pid"

running() { [ -f "$pid_file" ] && kill -0 "$(cat "$pid_file")" 2>/dev/null; }

case "$1" in
	start)
		if running; then
			echo "ticker running"
			exit 0
		fi
		nohup "$0" loop "$run" "$3" >>"$state/$run.tick.log" 2>&1 &
		echo $! >"$pid_file"
		echo "ticker started"
		exit 0
		;;
	stop)
		if running; then kill "$(cat "$pid_file")"; fi
		rm -f "$pid_file"
		echo "ticker stopped"
		exit 0
		;;
esac

# loop; TICK_INTERVAL overrides the 10 min, in seconds.
worktree=$3
last=$(date +%s)

# Prints the Run's pull requests as a JSON array; fails when GitHub cannot be read.
run_prs() {
	local branch view
	"$orca" worktree list --limit 500 --json |
		jq -r --arg run "$run" '.result.worktrees[]
			| select((.comment // "") | [scan("<!-- orchestrate ([\\s\\S]*?) -->")] | last
				| (.[0] // "{}") | try fromjson catch {} | .runId == $run)
			| .branch // empty | select(. != "") | sub("^refs/heads/"; "")' |
		while read -r branch; do
			view=$(cd "$worktree" && gh pr view "$branch" --json number,state,updatedAt 2>&1 </dev/null) || {
				case "$view" in *"no pull requests found"*) continue ;; esac
				return 1
			}
			printf '%s\n' "$view"
		done | jq -sc 'sort_by(.number)'
}

while sleep "${TICK_INTERVAL:-600}"; do
	reasons=()
	prs=$(run_prs) || prs=""
	if [ -n "$prs" ] && [ "$prs" != "$(cat "$state/$run.tick.prs" 2>/dev/null)" ]; then
		if [ -f "$state/$run.tick.prs" ]; then
			changed=$(jq -nr --argjson new "$prs" --argjson old "$(cat "$state/$run.tick.prs")" \
				'$new - $old | map("#\(.number)") | join(" ")')
			[ -z "$changed" ] || reasons+=("pull requests changed: $changed")
		fi
		printf '%s' "$prs" >"$state/$run.tick.prs"
	fi
	report=$("$here/mail-doctor.sh" "$run" 2>&1) || true
	if [ "$report" != "$(cat "$state/$run.tick.doctor" 2>/dev/null)" ]; then
		[ -n "$report" ] && reasons+=("mail-doctor report changed")
		printf '%s' "$report" >"$state/$run.tick.doctor"
	fi
	[ $(($(date +%s) - last)) -lt 3600 ] || reasons+=("60 min without a tick")
	[ "${#reasons[@]}" -gt 0 ] || continue
	body="$(IFS=';'; printf '%s' "${reasons[*]}")"
	[ -z "$report" ] || body="$body
mail-doctor.sh:
$report"
	"$orca" orchestration send --to "run:$run" --subject tick --body "$body" --json >/dev/null &&
		last=$(date +%s)
done
