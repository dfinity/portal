const keywords = [
  "actor",
  "and",
  "async",
  "assert",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "continue",
  "debug",
  "debug_show",
  "do",
  "else",
  "false",
  "flexible",
  "for",
  "from_candid",
  "func",
  "if",
  "ignore",
  "in",
  "import",
  "label",
  "let",
  "loop",
  "module",
  "not",
  "null",
  "object",
  "or",
  "private",
  "public",
  "query",
  "return",
  "shared",
  "stable",
  "switch",
  "system",
  "throw",
  "to_candid",
  "true",
  "try",
  "type",
  "var",
  "while",
  "with"
];

const typeKeywords = [
  "Any",
  "None",
  "Null",
  "Bool",
  "Int",
  "Int8",
  "Int16",
  "Int32",
  "Int64",
  "Nat",
  "Nat8",
  "Nat16",
  "Nat32",
  "Nat64",
  "Float",
  "Char",
  "Text",
  "Blob",
  "Error",
  "Principal"
];

Prism.languages.motoko = {
  string: [
    {
      pattern: /r(#*)"(.|\n)*?"\1(?!#)/,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/,
      lookbehind: true,
      greedy: true
    }
  ],
  keyword: new RegExp(keywords.filter((k) => k !== "async").join("|")),
  boolean: /\b(?:_|true|false|null)\b/,
  number: [
    /[+-]?\\b0[xX]([A-Fa-f0-9_]+)/,
    /[+-]?\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)/
  ],
  operator:
    /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  builtin: new RegExp(`async ${typeKeywords.join("|")}`)
};

Prism.languages.mo = Prism.languages.motoko;
