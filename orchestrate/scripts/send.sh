#!/usr/bin/env bash
# Send an orchestration message or reply, and confirm Orca delivered it.
# Usage:
#   send.sh to <run:id|dispatch:id> <subject> <body>
#   send.sh reply <message id> <body>
# Prints one line: "<message id> delivered", "follow-up <json>" when Orca reopened a
# finished worker as a follow-up Task, or "queued <message id>" for a connected server;
# all three count as delivered.
# Exit 3: not delivered within 30 s; the recipient has no live chat session to wake.
# Uses $ORCA, or `orca` on PATH.
set -euo pipefail

usage() {
	printf 'usage: send.sh to <recipient> <subject> <body> | send.sh reply <message id> <body>\n' >&2
	exit 2
}

orca=${ORCA:-orca}
case "${1:-}" in
	to)
		[ "$#" -eq 4 ] && [ -n "$2" ] && [ -n "$3" ] || usage
		receipt=$("$orca" orchestration send --to "$2" --subject "$3" --body "$4" --full --json)
		;;
	reply)
		[ "$#" -eq 3 ] && [ -n "$2" ] && [ -n "$3" ] || usage
		receipt=$("$orca" orchestration reply --id "$2" --body "$3" --full --json)
		;;
	*) usage ;;
esac

jq -e '.ok' <<<"$receipt" >/dev/null || {
	printf '%s\n' "$receipt" >&2
	exit 1
}
if jq -e '.result.delivery' <<<"$receipt" >/dev/null; then
	printf 'follow-up %s\n' "$(jq -c '.result | {delivery, followUpOf, dispatchId: (.dispatchId // .dispatch.id // null)}' <<<"$receipt")"
	exit 0
fi
if jq -e '.result.relay' <<<"$receipt" >/dev/null; then
	printf 'queued %s\n' "$(jq -r '.result.relay.messageId' <<<"$receipt")"
	exit 0
fi

id=$(jq -er '.result.message.id' <<<"$receipt")
for _ in $(seq 1 15); do
	at=$("$orca" orchestration inbox --limit 200 --full --json |
		jq -r --arg id "$id" '.result.messages[] | select(.id == $id) | .delivered_at // empty')
	if [ -n "$at" ]; then
		printf '%s delivered\n' "$id"
		exit 0
	fi
	sleep 2
done
printf '%s not delivered after 30 s\n' "$id" >&2
exit 3
