import { keywords } from "motoko/lib/keywords";

Prism.languages.motoko = Prism.languages.extend("clike", {
  keyword: new RegExp(
    `\\b(?:${keywords.filter((k) => k !== "async").join("|")})\\b`
  ),
  boolean: /\b(?:_|true|false|null)\b/,
  number: [
    /[+-]?\\b0[xX]([A-Fa-f0-9_]+)/,
    /[+-]?\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)/,
  ],
  builtin: /\b(?:async|[A-Z][a-z0-9_]*)\b/
});

Prism.languages.mo = Prism.languages.motoko;
