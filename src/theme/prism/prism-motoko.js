import { keywords, typeKeywords } from "motoko/lib/keywords";

Prism.languages.motoko = {
  string: [
    {
      pattern: /r(#*)"(.|\n)*?"\1(?!#)/,
      lookbehind: true,
      greedy: true,
    },
    {
      pattern: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/,
      lookbehind: true,
      greedy: true,
    },
  ],
  keyword: new RegExp(
    `\\b(?:${keywords.filter((k) => k !== "async").join("|")})\\b`
  ),
  boolean: /\b(?:_|true|false|null)\b/,
  number: [
    /[+-]?\\b0[xX]([A-Fa-f0-9_]+)/,
    /[+-]?\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)/,
  ],
  builtin: /\b(?:[A-Z][a-z0-9_]*)\b/
};

Prism.languages.mo = Prism.languages.motoko;
