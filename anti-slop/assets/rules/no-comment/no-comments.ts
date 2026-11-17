import { defineRule } from "@oxlint/plugins";

import type { Fixer, SourceCode } from "@oxlint/plugins";

import { classifyComments, parseOptions } from "./classify.ts";
import type { CommentGroup, CommentKind } from "./classify.ts";

const MESSAGE_BY_KIND: Partial<Record<CommentKind, string>> = {
  "in-body": "inBody",
  module: "module",
  banner: "banner",
  "jsdoc-private": "jsdocPrivate",
  "jsdoc-oversized": "jsdocOversized",
};

function removalRange(sourceCode: SourceCode, group: CommentGroup): [number, number] {
  const text = sourceCode.text;
  const lineStart = text.lastIndexOf("\n", group.start - 1) + 1;
  const newline = text.indexOf("\n", group.end);
  const lineEnd = newline === -1 ? text.length : newline;
  const aloneOnLines =
    text.slice(lineStart, group.start).trim() === "" &&
    text.slice(group.end, lineEnd).trim() === "";
  if (aloneOnLines) return [lineStart, newline === -1 ? lineEnd : newline + 1];
  let start = group.start;
  while (start > lineStart && /[ \t]/u.test(text[start - 1] ?? "")) start--;
  return [start, group.end];
}

/** Reject comments outside a small keep list: directives, markers, license headers and short public JSDoc. */
export const noCommentsRule = defineRule({
  meta: {
    type: "suggestion",
    hasSuggestions: true,
    docs: {
      description:
        "Reject comments except directives, marker comments, license headers and short JSDoc on the public API.",
    },
    messages: {
      inBody:
        "Delete this comment. Make the code say it: rename, extract a function, or add a type. The reason for a change goes in the commit or PR.",
      module:
        "Delete this comment. Make the code say it, or move the reason to the commit, PR or design docs. Name an external constraint with a marker ({{markers}}).",
      banner: "Delete this banner. Split the file or name the parts instead.",
      jsdocPrivate:
        "Delete this JSDoc: only the public API carries JSDoc. Make `{{owner}}` read without prose: rename it or give it a type.",
      jsdocOversized:
        "Shorten this JSDoc to {{max}} lines of contract (what `{{owner}}` takes, returns, throws). Move rationale and history to the commit, PR or design docs.",
      inventory: "{{kind}}\t{{owner}}\t{{lines}}\t{{span}}\t{{text}}",
      remove: "Delete the comment.",
    },
    schema: [
      {
        type: "object",
        properties: {
          markers: { type: "array", items: { type: "string", minLength: 1 }, uniqueItems: true },
          jsdoc: { enum: ["public", "none"] },
          maxJsdocLines: { type: "integer", minimum: 0 },
          inventory: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
  },
  createOnce(context) {
    return {
      Program() {
        const option = context.options?.[0];
        const options = parseOptions(option);
        const inventory =
          typeof option === "object" &&
          option !== null &&
          "inventory" in option &&
          option.inventory === true;
        const sourceCode = context.sourceCode;

        for (const group of classifyComments(sourceCode, options)) {
          const loc = {
            start: sourceCode.getLocFromIndex(group.start),
            end: sourceCode.getLocFromIndex(group.end),
          };
          if (inventory) {
            context.report({
              loc,
              messageId: "inventory",
              data: {
                kind: group.kind,
                owner: group.owner,
                lines: String(group.lines),
                span: String(loc.end.line - loc.start.line),
                text: group.text,
              },
            });
            continue;
          }
          const messageId = MESSAGE_BY_KIND[group.kind];
          if (group.allowed || messageId === undefined) continue;
          const range = removalRange(sourceCode, group);
          context.report({
            loc,
            messageId,
            data: {
              owner: group.owner,
              max: String(options.maxJsdocLines),
              markers: options.markers.join(", "),
            },
            suggest: [{ messageId: "remove", fix: (fixer: Fixer) => fixer.removeRange(range) }],
          });
        }
      },
    };
  },
});
