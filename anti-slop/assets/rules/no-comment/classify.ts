import type { Comment, ESTree, SourceCode } from "@oxlint/plugins";

export type CommentKind =
  | "banner"
  | "directive"
  | "in-body"
  | "jsdoc-oversized"
  | "jsdoc-private"
  | "jsdoc-public"
  | "license"
  | "marker"
  | "module";

export interface NoCommentsOptions {
  readonly markers: readonly string[];
  readonly jsdoc: "none" | "public";
  readonly maxJsdocLines: number;
}

export interface CommentGroup {
  readonly start: number;
  readonly end: number;
  readonly kind: CommentKind;
  readonly allowed: boolean;
  readonly owner: string;
  readonly lines: number;
  readonly text: string;
}

export const DEFAULT_OPTIONS: NoCommentsOptions = {
  markers: ["SAFETY", "EXTERNAL"],
  jsdoc: "public",
  maxJsdocLines: 3,
};

const ALLOWED_KINDS = new Set<CommentKind>(["directive", "jsdoc-public", "license", "marker"]);

const DIRECTIVE =
  /^\s*(?:eslint[\s-]|eslint$|oxlint-|@ts-|prettier-ignore|biome-ignore|istanbul\s|c8\s|v8\s|@vite-ignore|webpack[A-Z]|[#@]__(?:PURE|NO_SIDE_EFFECTS)__|global\s|globals\s|@jsx|@vitest-environment|@jest-environment|#?region\b|#?endregion\b|\/\s*<(?:reference|amd-module))/u;

const LICENSE = /copyright|licen[cs]e|spdx-license-identifier/iu;

const BANNER_LINE = /^[\s\-=_*#~─━═+/|]{3,}$|^\s*[\-=_*#~─━═+]{3,}.*[\-=_*#~─━═+]{3,}\s*$/u;

const CONTRACT_TAG = /^@(?:param|returns?|throws|typeParam|template|deprecated|see)\b/u;

const MEMBER_TYPES = new Set([
  "AccessorProperty",
  "MethodDefinition",
  "Property",
  "PropertyDefinition",
  "TSCallSignatureDeclaration",
  "TSConstructSignatureDeclaration",
  "TSEnumMember",
  "TSIndexSignature",
  "TSMethodSignature",
  "TSPropertySignature",
]);

const FUNCTION_TYPES = new Set([
  "ArrowFunctionExpression",
  "FunctionDeclaration",
  "FunctionExpression",
  "StaticBlock",
]);

const VUE_MACROS = new Set(["defineEmits", "defineModel", "defineProps", "defineSlots"]);

export function parseOptions(option: unknown): NoCommentsOptions {
  if (typeof option !== "object" || option === null) return DEFAULT_OPTIONS;
  const markers =
    "markers" in option && Array.isArray(option.markers)
      ? option.markers.filter(
          (marker): marker is string => typeof marker === "string" && marker.trim() !== "",
        )
      : DEFAULT_OPTIONS.markers;
  const jsdoc = "jsdoc" in option && option.jsdoc === "none" ? "none" : "public";
  const maxJsdocLines =
    "maxJsdocLines" in option && typeof option.maxJsdocLines === "number"
      ? option.maxJsdocLines
      : DEFAULT_OPTIONS.maxJsdocLines;
  return { markers, jsdoc, maxJsdocLines };
}

function markerPattern(markers: readonly string[]): RegExp | null {
  if (markers.length === 0) return null;
  const alternation = markers
    .map((marker) => marker.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`))
    .join("|");
  return new RegExp(String.raw`(?:^|[^\p{L}\p{N}_])(?:${alternation})\s*:\s*\S`, "u");
}

function isJsdoc(comment: Comment): boolean {
  return comment.type === "Block" && comment.value.startsWith("*") && comment.value !== "*";
}

function isDirective(comment: Comment, text: string): boolean {
  return text.startsWith("#!", comment.start) || DIRECTIVE.test(comment.value);
}

function proseOf(comment: Comment): string {
  if (comment.type === "Line") return comment.value.trim();
  return comment.value
    .split("\n")
    .map((line) => line.replace(/^\s*\*+\s?/u, "").trim())
    .join("\n")
    .trim();
}

function onlyWhitespaceBetween(text: string, from: number, to: number): boolean {
  return text.slice(from, to).trim() === "";
}

function groupComments(sourceCode: SourceCode): Comment[][] {
  const groups: Comment[][] = [];
  let current: Comment[] = [];
  for (const comment of sourceCode.getAllComments()) {
    const previous = current.at(-1);
    const joins =
      previous !== undefined &&
      previous.type === "Line" &&
      comment.type === "Line" &&
      !isDirective(previous, sourceCode.text) &&
      !isDirective(comment, sourceCode.text) &&
      comment.loc.start.line === previous.loc.end.line + 1 &&
      comment.loc.start.column === previous.loc.start.column &&
      onlyWhitespaceBetween(sourceCode.text, previous.end, comment.start);
    if (joins) {
      current.push(comment);
      continue;
    }
    if (current.length > 0) groups.push(current);
    current = [comment];
  }
  if (current.length > 0) groups.push(current);
  return groups;
}

function nameOf(node: ESTree.Node | null | undefined): string {
  if (!node) return "";
  switch (node.type) {
    case "Identifier":
    case "PrivateIdentifier":
      return node.name;
    case "Literal":
      return String(node.value);
    case "ExportNamedDeclaration":
      return nameOf(node.declaration);
    case "ExportDefaultDeclaration":
      return nameOf(node.declaration) || "default";
    case "VariableDeclaration":
      return node.declarations.map((declarator) => nameOf(declarator.id)).join(",");
    case "VariableDeclarator":
      return nameOf(node.id);
    case "FunctionDeclaration":
    case "ClassDeclaration":
    case "TSInterfaceDeclaration":
    case "TSTypeAliasDeclaration":
    case "TSEnumDeclaration":
    case "TSModuleDeclaration":
      return nameOf(node.id);
    case "MethodDefinition":
    case "Property":
    case "PropertyDefinition":
    case "AccessorProperty":
    case "TSPropertySignature":
    case "TSMethodSignature":
      return nameOf(node.key);
    case "TSEnumMember":
      return nameOf(node.id);
    default:
      return "";
  }
}

function declaredNames(node: ESTree.Node): string[] {
  if (node.type === "VariableDeclaration")
    return node.declarations.map((declarator) => nameOf(declarator.id));
  const name = nameOf(node);
  return name === "" ? [] : [name];
}

function localExportNames(program: ESTree.Program): Set<string> {
  const names = new Set<string>();
  for (const statement of program.body) {
    if (
      statement.type === "ExportNamedDeclaration" &&
      statement.source === null &&
      statement.declaration === null
    ) {
      for (const specifier of statement.specifiers) names.add(nameOf(specifier.local));
    }
    if (
      statement.type === "ExportDefaultDeclaration" &&
      statement.declaration.type === "Identifier"
    ) {
      names.add(statement.declaration.name);
    }
    if (statement.type === "TSExportAssignment" && statement.expression.type === "Identifier") {
      names.add(statement.expression.name);
    }
  }
  return names;
}

function documentedNode(sourceCode: SourceCode, comment: Comment): ESTree.Node | null {
  const text = sourceCode.text;
  let index = comment.end;
  while (index < text.length && /\s/u.test(text[index] ?? "")) index++;
  let node = sourceCode.getNodeByRangeIndex(index);
  if (!node || node.start !== index) return null;
  while (node.parent && node.parent.type !== "Program" && node.parent.start === index)
    node = node.parent;
  return node.type === "Program" ? null : node;
}

function isUnderVueMacro(node: ESTree.Node): boolean {
  for (let current: ESTree.Node | null = node.parent; current; current = current.parent) {
    if (
      current.type === "CallExpression" &&
      current.callee.type === "Identifier" &&
      VUE_MACROS.has(current.callee.name)
    ) {
      return true;
    }
  }
  return false;
}

function isPublic(node: ESTree.Node, exported: Set<string>): boolean {
  let topLevel: ESTree.Node = node;
  for (let current: ESTree.Node | null = node; current; current = current.parent) {
    if (current.type === "ExportNamedDeclaration" || current.type === "ExportDefaultDeclaration")
      return true;
    if (current.parent?.type === "Program") topLevel = current;
  }
  if (node !== topLevel && !MEMBER_TYPES.has(node.type)) return false;
  if (MEMBER_TYPES.has(node.type) && isUnderVueMacro(node)) return true;
  return declaredNames(topLevel).some((name) => exported.has(name));
}

function enclosingFunction(sourceCode: SourceCode, comment: Comment): ESTree.Node | null {
  for (
    let current = sourceCode.getNodeByRangeIndex(comment.start);
    current;
    current = current.parent
  ) {
    if (FUNCTION_TYPES.has(current.type) && current.start < comment.start) return current;
  }
  return null;
}

function functionName(node: ESTree.Node): string {
  if (node.type === "FunctionDeclaration" || node.type === "FunctionExpression") {
    const own = nameOf(node.id);
    if (own !== "") return own;
  }
  const parent = node.parent;
  if (!parent) return "";
  if (
    parent.type === "VariableDeclarator" ||
    parent.type === "MethodDefinition" ||
    parent.type === "Property" ||
    parent.type === "PropertyDefinition"
  ) {
    return nameOf(parent);
  }
  return "";
}

function countProseLines(prose: string, jsdoc: boolean): number {
  return prose
    .split("\n")
    .filter((line) => line.trim() !== "")
    .filter((line) => !jsdoc || !CONTRACT_TAG.test(line.trim())).length;
}

export function classifyComments(
  sourceCode: SourceCode,
  options: NoCommentsOptions,
): CommentGroup[] {
  const program = sourceCode.ast;
  const exported = localExportNames(program);
  const marker = markerPattern(options.markers);
  const firstCodeIndex = program.body[0]?.start ?? sourceCode.text.length;
  const groups = groupComments(sourceCode);

  return groups.map((comments, position) => {
    const first = comments[0];
    const last = comments.at(-1) ?? first;
    if (!first || !last) throw new Error("empty comment group");
    const prose = comments.map(proseOf).join("\n");
    const jsdoc = comments.length === 1 && isJsdoc(first);
    const lines = countProseLines(prose, jsdoc);
    const base = {
      start: first.start,
      end: last.end,
      lines,
      text: prose.replaceAll(/\s+/gu, " ").trim(),
    };

    const classify = (kind: CommentKind, owner: string): CommentGroup => ({
      ...base,
      kind,
      owner,
      allowed: ALLOWED_KINDS.has(kind),
    });

    if (comments.length === 1 && isDirective(first, sourceCode.text))
      return classify("directive", "");
    if (position === 0 && last.end <= firstCodeIndex && LICENSE.test(prose))
      return classify("license", "");
    if (marker?.test(comments.map((comment) => comment.value).join("\n"))) {
      const fn = enclosingFunction(sourceCode, first);
      return classify("marker", fn ? functionName(fn) : "");
    }
    if (jsdoc) {
      const node = documentedNode(sourceCode, first);
      const owner = nameOf(node);
      if (options.jsdoc === "none" || !node || !isPublic(node, exported))
        return classify("jsdoc-private", owner);
      return classify(lines > options.maxJsdocLines ? "jsdoc-oversized" : "jsdoc-public", owner);
    }
    if (prose.split("\n").some((line) => BANNER_LINE.test(line))) return classify("banner", "");
    const fn = enclosingFunction(sourceCode, first);
    return fn
      ? classify("in-body", functionName(fn))
      : classify("module", nameOf(documentedNode(sourceCode, last)));
  });
}
