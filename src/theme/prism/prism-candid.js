Prism.languages.candid = {
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
  keyword:
    /\b(?:opt|vec|record|variant|func|blob|principal|nat|nat8|nat16|nat32|nat64|int|int8|int16|int32|int64|float32|float64|bool|text|null|reserved|empty|oneway|query|composite_query')\b/,
  boolean: /\b(?:_|false|true)\b/,
  number: [
    /[+-]?\\b0[xX]([A-Fa-f0-9_]+)/,
    /[+-]?\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)/
  ],
  operator:
    /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  builtin: /\b(?:import|service|type)\b/
};

Prism.languages.did = Prism.languages.candid;
