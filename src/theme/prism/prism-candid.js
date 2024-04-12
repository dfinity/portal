Prism.languages.candid = Prism.languages.extend("clike", {
  boolean: /\b(?:_|true|false|null)\b/,
  builtin: /\b(?:import|service|type)\b/,
  function: null,
  keyword:
    /\b(?:opt|vec|record|variant|func|blob|principal|(?:nat|int)(?:|8|16|32|64)|float(?:32|64)|bool|text|reserved|empty|oneway|query|composite_query')\b/,
  number: [
    /[+-]?\\b0[xX]([A-Fa-f0-9_]+)/,
    /[+-]?\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)/,
  ],
});

Prism.languages.did = Prism.languages.candid;
