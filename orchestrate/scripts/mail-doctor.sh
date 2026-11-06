#!/usr/bin/env bash
# Report a Run's communication problems, one line each; read-only, never takes mail.
# Usage: mail-doctor.sh <run id>
# Lines:
#   undelivered <msg> <type> <from> -> <to> since <time>   unread and not pushed for 2 min
#   unanswered <msg> from <dispatch> since <time>           a question with no reply
#   stopped <dispatch> since <time>                         ended its turn without worker_done,
#                                                           with no message since
#   terminal-worker <dispatch>                              Orca never pushes mail to it
#   stale <dispatch>                                        stale, and the Run's latest message
#                                                           to it is newer than its own latest
# Exit 1 when it prints a line. Uses $ORCA, or `orca` on PATH.
set -euo pipefail

[ "$#" -eq 1 ] && [ -n "$1" ] || {
	printf 'usage: mail-doctor.sh <run id>\n' >&2
	exit 2
}
run=$1
orca=${ORCA:-orca}

mail=$("$orca" orchestration inbox --limit 500 --full --json |
	jq -c --arg run "$run" '[.result.messages[] | select(.run_id == $run and .type != "heartbeat")]')
workers=$("$orca" orchestration worker-list --run "$run" --limit 100 --json |
	jq -c '[.result.workers[] | select(.dispatchStatus == "dispatched")]')

report=$(jq -r --argjson w "$workers" --argjson now "$(date +%s)" '
	def age: $now - (.created_at | fromdateiso8601);
	def dispatch: (.payload | try fromjson catch {}) .dispatchId // (.from_handle | sub("^dispatch:"; ""));
	. as $m
	| ($w | map(.dispatchId)) as $live
	| ($m[] | select(.delivered_at == null and .read == 0 and age > 120)
		| "undelivered \(.id) \(.type) \(.from_handle) -> \(.to_handle) since \(.created_at)"),
	  ($m[] | select(.type == "question") as $q
		| select([$m[] | select(.thread_id == $q.id and .id != $q.id)] | length == 0)
		| "unanswered \($q.id) from \($q | dispatch) since \($q.created_at)"),
	  ($m[] | select(.type == "escalation" and ((.payload | try fromjson catch {}) .stopReason) == "finished") as $e
		| ($e | dispatch) as $d
		| select($live | index($d))
		| select([$m[] | select(.sequence > $e.sequence and ((. | dispatch) == $d or .to_handle == "dispatch:\($d)"))] | length == 0)
		| "stopped \($d) since \($e.created_at)"),
	  ($w[] | select(.agentTerminalHandle | startswith("term_")) | "terminal-worker \(.dispatchId)"),
	  ($w[] | select((.projection.attention.categories // []) | index("stale")) | .dispatchId as $d
		| ([$m[] | select(.to_handle == "dispatch:\($d)")] | max_by(.sequence)) as $out
		| ([$m[] | select((. | dispatch) == $d)] | max_by(.sequence)) as $in
		| select($out != null and ($in == null or $out.sequence > $in.sequence))
		| "stale \($d)")
' <<<"$mail" | sort -u)

[ -z "$report" ] && exit 0
printf '%s\n' "$report"
exit 1
