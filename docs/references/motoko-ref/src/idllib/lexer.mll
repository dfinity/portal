{
open Parser
module Utf8 = Wasm.Utf8

let convert_pos pos =
  { Source.file = pos.Lexing.pos_fname;
    Source.line = pos.Lexing.pos_lnum;
    Source.column = pos.Lexing.pos_cnum - pos.Lexing.pos_bol
  }

let region lexbuf =
  let left = convert_pos (Lexing.lexeme_start_p lexbuf) in
  let right = convert_pos (Lexing.lexeme_end_p lexbuf) in
  {Source.left = left; Source.right = right}

let error lexbuf msg = raise (Source.ParseError (region lexbuf, msg))
let error_nest start lexbuf msg =
  lexbuf.Lexing.lex_start_p <- start;
  error lexbuf msg


let utf8 s i =
  let len = if s.[!i] < '\xe0' then 1 else if s.[!i] < '\xf0' then 2 else 3 in
  i := !i + len;
  List.hd (Utf8.decode (String.sub s (!i - len) (1 + len)))

let codepoint lexbuf s i =
  let u =
    if s.[!i] >= '\x80' then Utf8.encode [utf8 s i] else
    if s.[!i] <> '\\' then Utf8.encode [Char.code s.[!i]] else
    match (incr i; s.[!i]) with
    | 'n' -> Utf8.encode [Char.code '\n']
    | 'r' -> Utf8.encode [Char.code '\r']
    | 't' -> Utf8.encode [Char.code '\t']
    | '\\' -> Utf8.encode [Char.code '\\']
    | '\'' -> Utf8.encode [Char.code '\'']
    | '\"' -> Utf8.encode [Char.code '\"']
    | 'u' ->
      let j = !i + 2 in
      i := String.index_from s j '}';
      Utf8.encode [
        try
          let n = int_of_string ("0x" ^ String.sub s j (!i - j)) in
          if 0 <= n && n < 0xD800 || 0xE000 <= n && n < 0x110000 then n else raise (Failure "")
        with Failure _ -> error lexbuf "unicode escape out of range"
      ]
    | h ->
      incr i;
      let b = int_of_string ("0x" ^ String.make 1 h ^ String.make 1 s.[!i]) in
      String.of_seq (Seq.return (Char.chr b))
  in incr i; u

let text lexbuf s =
  let b = Buffer.create (String.length s) in
  let i = ref 1 in
  while !i < String.length s - 1 do
    let bs = codepoint lexbuf s i in
    Buffer.add_substring b bs 0 (String.length bs)
  done;
  Buffer.contents b
}

let sign = '+' | '-'
let digit = ['0'-'9']
let hexdigit = ['0'-'9''a'-'f''A'-'F']
let num = digit ('_'? digit)*
let hexnum = hexdigit ('_'? hexdigit)*

let letter = ['a'-'z''A'-'Z']
let symbol =
  ['+''-''*''/''\\''^''~''=''<''>''!''?''@''#''$''%''&''|'':''`''.''\'']

let space = [' ''\t''\n''\r']
let ascii = ['\x00'-'\x7f']
let ascii_no_nl = ['\x00'-'\x09''\x0b'-'\x7f']
let utf8cont = ['\x80'-'\xbf']
let utf8enc =
    ['\xc2'-'\xdf'] utf8cont
  | ['\xe0'] ['\xa0'-'\xbf'] utf8cont
  | ['\xed'] ['\x80'-'\x9f'] utf8cont
  | ['\xe1'-'\xec''\xee'-'\xef'] utf8cont utf8cont
  | ['\xf0'] ['\x90'-'\xbf'] utf8cont utf8cont
  | ['\xf4'] ['\x80'-'\x8f'] utf8cont utf8cont
  | ['\xf1'-'\xf3'] utf8cont utf8cont utf8cont
let utf8 = ascii | utf8enc
let utf8_no_nl = ascii_no_nl | utf8enc

let byte = '\\'hexdigit hexdigit
let escape = ['n''r''t''\\''\'''\"']
let character =
    [^'"''\\''\x00'-'\x1f''\x7f'-'\xff']
  | utf8enc
  | byte
  | '\\'escape
  | "\\u{" hexnum '}'

let nat = num | "0x" hexnum
let text = '"' character* '"'
let id = (letter | '_') ((letter | digit | '_')*)

let reserved = ([^'\"''('')'';'] # space)+  (* hack for table size *)

rule token = parse
  | "(" { LPAR }
  | ")" { RPAR }
  | "{" { LCURLY }
  | "}" { RCURLY }
  | ";" { SEMICOLON }
  | "," { COMMA }
  | "." { PERIOD }
  | ":" { COLON }
  | "=" { EQ }
  | "==" { EQQ }
  | "!:" { NOTCOLON }
  | "!=" { NOTEQ }
  | "->" { ARROW }
  | "-" { MINUS }

  | nat as s { NAT s }
  | text as s { TEXT (text lexbuf s) }
  | '"'character*('\n'|eof)
    { error lexbuf "unclosed text literal" }
  | '"'character*['\x00'-'\x09''\x0b'-'\x1f''\x7f']
    { error lexbuf "illegal control character in text literal" }
  | '"'character*'\\'_
    { error_nest (Lexing.lexeme_end_p lexbuf) lexbuf "illegal escape" }

  | "import" { IMPORT }
  | "service" { SERVICE }
  | "func" { FUNC }
  | "type" { TYPE }
  | "opt" { OPT }
  | "vec" { VEC }
  | "record" { RECORD }
  | "variant" { VARIANT }
  | "blob" { BLOB }
  | "principal" { PRINCIPAL }
  | "oneway" { ONEWAY }
  | "query" { QUERY }

  | id as s { ID s }

  | "//"utf8_no_nl*eof { EOF }
  | "//"utf8_no_nl*'\n' { Lexing.new_line lexbuf; token lexbuf }
  | "//"utf8_no_nl* { token lexbuf (* causes error on following position *) }
  | "/*" { comment (Lexing.lexeme_start_p lexbuf) lexbuf; token lexbuf }
  | space#'\n' { token lexbuf }
  | '\n' { Lexing.new_line lexbuf; token lexbuf }
  | eof { EOF }

  | utf8 { error lexbuf "malformed operator" }
  | _ { error lexbuf "malformed UTF-8 encoding" }

and comment start = parse
  | "*/" { () }
  | "/*" { comment (Lexing.lexeme_start_p lexbuf) lexbuf; comment start lexbuf }
  | '\n' { Lexing.new_line lexbuf; comment start lexbuf }
  | eof { error_nest start lexbuf "unclosed comment" }
  | utf8 { comment start lexbuf }
  | _ { error lexbuf "malformed UTF-8 encoding" }
