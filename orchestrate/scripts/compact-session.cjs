// Ask Orca to compact one agent session's conversation.
// Usage: node compact-session.cjs <orca app out dir> <session id>
// Prints Orca's result as JSON; exit 1 on a transport error. A refusal with
// reason turnActive means the session's turn is still running.
const [out, sessionId] = process.argv.slice(2);
const { RuntimeClient } = require(`${out}/cli/runtime/client.js`);
const {
	computeAgentSessionPayloadFingerprint
} = require(`${out}/shared/agent-session/lifecycle/agent-session-mutation-envelope.js`);
const { randomUUID } = require('node:crypto');

const method = 'agentSession.conversationCommand';
const fields = { command: 'compact' };

new RuntimeClient()
	.call(
		method,
		{
			envelope: {
				sessionId,
				clientOperationId: `${Date.now()}-${randomUUID().replaceAll('-', '')}`,
				expectedRuntimeFence: 1,
				payloadFingerprint: computeAgentSessionPayloadFingerprint({ method, sessionId, fields })
			},
			...fields
		},
		{ timeoutMs: 300_000 }
	)
	.then((res) => console.log(JSON.stringify(res)))
	.catch((error) => {
		console.log(JSON.stringify({ error: error?.message ?? String(error), response: error?.response ?? null }));
		process.exitCode = 1;
	});
