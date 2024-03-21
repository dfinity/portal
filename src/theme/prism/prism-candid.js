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
    /\b(?:opt|vec|record|variant|func|blob|principal|(?:int|nat)(?:|8|16|32|64)|float(?:32|64)|bool|text|null|reserved|empty|oneway|query')\b/,
  boolean: /\b(?:_|false|true)\b/,
  number: [
    /[+-]?\\b0[xX]([A-Fa-f0-9_]+)/,
    /[+-]?\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)/
  ],
  builtin: /\b(?:import|service|type)\b/
};

Prism.languages.did = Prism.languages.candid;
