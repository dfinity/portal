open Mo_def.Trivia

type token =
  | EOF
  | DISALLOWED
  | LET
  | VAR
  | LPAR
  | RPAR
  | LBRACKET
  | RBRACKET
  | LCURLY
  | RCURLY
  | AWAIT
  | ASYNC
  | BREAK
  | CASE
  | CATCH
  | CONTINUE
  | LABEL
  | DEBUG
  | DO
  | FLEXIBLE
  | IF
  | IGNORE
  | IN
  | ELSE
  | SWITCH
  | LOOP
  | WHILE
  | FOR
  | RETURN
  | SYSTEM
  | STABLE
  | TRY
  | THROW
  | ARROW
  | ASSIGN
  | FUNC
  | TYPE
  | OBJECT
  | ACTOR
  | CLASS
  | PUBLIC
  | PRIVATE
  | SHARED
  | QUERY
  | SEMICOLON
  | COMMA
  | COLON
  | SUB
  | DOT
  | QUEST
  | BANG
  | AND
  | OR
  | NOT
  | IMPORT
  | MODULE
  | DEBUG_SHOW
  | ASSERT
  | ADDOP
  | SUBOP
  | MULOP
  | DIVOP
  | MODOP
  | POWOP
  | WRAPADDOP
  | WRAPSUBOP
  | WRAPMULOP
  | WRAPPOWOP
  | WRAPADDASSIGN
  | WRAPSUBASSIGN
  | WRAPMULASSIGN
  | WRAPPOWASSIGN
  | ANDOP
  | OROP
  | XOROP
  | SHLOP
  | ROTLOP
  | ROTROP
  | EQOP
  | NEQOP
  | LEOP
  | GEOP
  | HASH
  | EQ
  | LT
  | GT
  | PLUSASSIGN
  | MINUSASSIGN
  | MULASSIGN
  | DIVASSIGN
  | MODASSIGN
  | POWASSIGN
  | CATASSIGN
  | ANDASSIGN
  | ORASSIGN
  | XORASSIGN
  | SHLASSIGN
  | SHRASSIGN
  | ROTLASSIGN
  | ROTRASSIGN
  | NULL
  | DOT_NUM of string
  | NAT of string
  | FLOAT of string
  | CHAR of Mo_values.Value.unicode
  | BOOL of bool
  | ID of string
  | TEXT of string
  | PRIM
  | UNDERSCORE
  (* Trivia *)
  | LINEFEED of line_feed
  | SINGLESPACE
  | SPACE of int
  | TAB of int (* shudders *)
  | COMMENT of string

let to_parser_token :
    token -> (Parser.token, line_feed trivia) result = function
  | EOF -> Ok Parser.EOF
  | DISALLOWED -> Ok Parser.DISALLOWED
  | LET -> Ok Parser.LET
  | VAR -> Ok Parser.VAR
  | LPAR -> Ok Parser.LPAR
  | RPAR -> Ok Parser.RPAR
  | LBRACKET -> Ok Parser.LBRACKET
  | RBRACKET -> Ok Parser.RBRACKET
  | LCURLY -> Ok Parser.LCURLY
  | RCURLY -> Ok Parser.RCURLY
  | AWAIT -> Ok Parser.AWAIT
  | ASYNC -> Ok Parser.ASYNC
  | BREAK -> Ok Parser.BREAK
  | CASE -> Ok Parser.CASE
  | CATCH -> Ok Parser.CATCH
  | CONTINUE -> Ok Parser.CONTINUE
  | LABEL -> Ok Parser.LABEL
  | DO -> Ok Parser.DO
  | DEBUG -> Ok Parser.DEBUG
  | FLEXIBLE -> Ok Parser.FLEXIBLE
  | IF -> Ok Parser.IF
  | IGNORE -> Ok Parser.IGNORE
  | IN -> Ok Parser.IN
  | ELSE -> Ok Parser.ELSE
  | SWITCH -> Ok Parser.SWITCH
  | LOOP -> Ok Parser.LOOP
  | WHILE -> Ok Parser.WHILE
  | FOR -> Ok Parser.FOR
  | RETURN -> Ok Parser.RETURN
  | TRY -> Ok Parser.TRY
  | THROW -> Ok Parser.THROW
  | ARROW -> Ok Parser.ARROW
  | ASSIGN -> Ok Parser.ASSIGN
  | FUNC -> Ok Parser.FUNC
  | TYPE -> Ok Parser.TYPE
  | OBJECT -> Ok Parser.OBJECT
  | ACTOR -> Ok Parser.ACTOR
  | CLASS -> Ok Parser.CLASS
  | PUBLIC -> Ok Parser.PUBLIC
  | PRIVATE -> Ok Parser.PRIVATE
  | SHARED -> Ok Parser.SHARED
  | STABLE -> Ok Parser.STABLE
  | SYSTEM -> Ok Parser.SYSTEM
  | QUERY -> Ok Parser.QUERY
  | SEMICOLON -> Ok Parser.SEMICOLON
  | COMMA -> Ok Parser.COMMA
  | COLON -> Ok Parser.COLON
  | SUB -> Ok Parser.SUB
  | DOT -> Ok Parser.DOT
  | QUEST -> Ok Parser.QUEST
  | BANG -> Ok Parser.BANG
  | AND -> Ok Parser.AND
  | OR -> Ok Parser.OR
  | NOT -> Ok Parser.NOT
  | IMPORT -> Ok Parser.IMPORT
  | MODULE -> Ok Parser.MODULE
  | DEBUG_SHOW -> Ok Parser.DEBUG_SHOW
  | ASSERT -> Ok Parser.ASSERT
  | ADDOP -> Ok Parser.ADDOP
  | SUBOP -> Ok Parser.SUBOP
  | MULOP -> Ok Parser.MULOP
  | DIVOP -> Ok Parser.DIVOP
  | MODOP -> Ok Parser.MODOP
  | POWOP -> Ok Parser.POWOP
  | WRAPADDOP -> Ok Parser.WRAPADDOP
  | WRAPSUBOP -> Ok Parser.WRAPSUBOP
  | WRAPMULOP -> Ok Parser.WRAPMULOP
  | WRAPPOWOP -> Ok Parser.WRAPPOWOP
  | WRAPADDASSIGN -> Ok Parser.WRAPADDASSIGN
  | WRAPSUBASSIGN -> Ok Parser.WRAPSUBASSIGN
  | WRAPMULASSIGN -> Ok Parser.WRAPMULASSIGN
  | WRAPPOWASSIGN -> Ok Parser.WRAPPOWASSIGN
  | ANDOP -> Ok Parser.ANDOP
  | OROP -> Ok Parser.OROP
  | XOROP -> Ok Parser.XOROP
  | SHLOP -> Ok Parser.SHLOP
  | ROTLOP -> Ok Parser.ROTLOP
  | ROTROP -> Ok Parser.ROTROP
  | EQOP -> Ok Parser.EQOP
  | NEQOP -> Ok Parser.NEQOP
  | LEOP -> Ok Parser.LEOP
  | GEOP -> Ok Parser.GEOP
  | HASH -> Ok Parser.HASH
  | EQ -> Ok Parser.EQ
  | LT -> Ok Parser.LT
  | GT -> Ok Parser.GT
  | PLUSASSIGN -> Ok Parser.PLUSASSIGN
  | MINUSASSIGN -> Ok Parser.MINUSASSIGN
  | MULASSIGN -> Ok Parser.MULASSIGN
  | DIVASSIGN -> Ok Parser.DIVASSIGN
  | MODASSIGN -> Ok Parser.MODASSIGN
  | POWASSIGN -> Ok Parser.POWASSIGN
  | CATASSIGN -> Ok Parser.CATASSIGN
  | ANDASSIGN -> Ok Parser.ANDASSIGN
  | ORASSIGN -> Ok Parser.ORASSIGN
  | XORASSIGN -> Ok Parser.XORASSIGN
  | SHLASSIGN -> Ok Parser.SHLASSIGN
  | SHRASSIGN -> Ok Parser.SHRASSIGN
  | ROTLASSIGN -> Ok Parser.ROTLASSIGN
  | ROTRASSIGN -> Ok Parser.ROTRASSIGN
  | NULL -> Ok Parser.NULL
  | DOT_NUM s -> Ok (Parser.DOT_NUM s)
  | NAT s -> Ok (Parser.NAT s)
  | FLOAT s -> Ok (Parser.FLOAT s)
  | CHAR u -> Ok (Parser.CHAR u)
  | BOOL b -> Ok (Parser.BOOL b)
  | ID s -> Ok (Parser.ID s)
  | TEXT s -> Ok (Parser.TEXT s)
  | PRIM -> Ok Parser.PRIM
  | UNDERSCORE -> Ok Parser.UNDERSCORE
  (*Trivia *)
  | SINGLESPACE -> Error (Space 1)
  | SPACE n -> Error (Space n)
  | LINEFEED lf -> Error (Line lf)
  | TAB n -> Error (Tab n)
  | COMMENT c -> Error (Comment c)

let string_of_parser_token = function
  | Parser.EOF -> "EOF"
  | Parser.DISALLOWED -> "DISALLOWED"
  | Parser.LET -> "LET"
  | Parser.VAR -> "VAR"
  | Parser.LPAR -> "LPAR"
  | Parser.RPAR -> "RPAR"
  | Parser.LBRACKET -> "LBRACKET"
  | Parser.RBRACKET -> "RBRACKET"
  | Parser.LCURLY -> "LCURLY"
  | Parser.RCURLY -> "RCURLY"
  | Parser.AWAIT -> "AWAIT"
  | Parser.ASYNC -> "ASYNC"
  | Parser.BREAK -> "BREAK"
  | Parser.CASE -> "CASE"
  | Parser.CATCH -> "CATCH"
  | Parser.CONTINUE -> "CONTINUE"
  | Parser.LABEL -> "LABEL"
  | Parser.DEBUG -> "DEBUG"
  | Parser.DO -> "DO"
  | Parser.FLEXIBLE -> "FLEXIBLE"
  | Parser.IF -> "IF"
  | Parser.IGNORE -> "IGNORE"
  | Parser.IN -> "IN"
  | Parser.ELSE -> "ELSE"
  | Parser.SWITCH -> "SWITCH"
  | Parser.LOOP -> "LOOP"
  | Parser.WHILE -> "WHILE"
  | Parser.FOR -> "FOR"
  | Parser.RETURN -> "RETURN"
  | Parser.TRY -> "TRY"
  | Parser.THROW -> "THROW"
  | Parser.ARROW -> "ARROW"
  | Parser.ASSIGN -> "ASSIGN"
  | Parser.FUNC -> "FUNC"
  | Parser.TYPE -> "TYPE"
  | Parser.OBJECT -> "OBJECT"
  | Parser.ACTOR -> "ACTOR"
  | Parser.CLASS -> "CLASS"
  | Parser.PUBLIC -> "PUBLIC"
  | Parser.PRIVATE -> "PRIVATE"
  | Parser.SHARED -> "SHARED"
  | Parser.STABLE -> "STABLE"
  | Parser.SYSTEM -> "SYSTEM"
  | Parser.QUERY -> "QUERY"
  | Parser.SEMICOLON -> "SEMICOLON"
  | Parser.SEMICOLON_EOL -> "SEMICOLON_EOL"
  | Parser.COMMA -> "COMMA"
  | Parser.COLON -> "COLON"
  | Parser.SUB -> "SUB"
  | Parser.DOT -> "DOT"
  | Parser.QUEST -> "QUEST"
  | Parser.BANG -> "BANG"
  | Parser.AND -> "AND"
  | Parser.OR -> "OR"
  | Parser.NOT -> "NOT"
  | Parser.IMPORT -> "IMPORT"
  | Parser.MODULE -> "MODULE"
  | Parser.DEBUG_SHOW -> "DEBUG_SHOW"
  | Parser.ASSERT -> "ASSERT"
  | Parser.ADDOP -> "ADDOP"
  | Parser.SUBOP -> "SUBOP"
  | Parser.MULOP -> "MULOP"
  | Parser.DIVOP -> "DIVOP"
  | Parser.MODOP -> "MODOP"
  | Parser.POWOP -> "POWOP"
  | Parser.WRAPADDOP -> "WRAPADDOP"
  | Parser.WRAPSUBOP -> "WRAPSUBOP"
  | Parser.WRAPMULOP -> "WRAPMULOP"
  | Parser.WRAPPOWOP -> "WRAPPOWOP"
  | Parser.WRAPADDASSIGN -> "WRAPADDASSIGN"
  | Parser.WRAPSUBASSIGN -> "WRAPSUBASSIGN"
  | Parser.WRAPMULASSIGN -> "WRAPMULASSIGN"
  | Parser.WRAPPOWASSIGN -> "WRAPPOWASSIGN"
  | Parser.ANDOP -> "ANDOP"
  | Parser.OROP -> "OROP"
  | Parser.XOROP -> "XOROP"
  | Parser.SHLOP -> "SHLOP"
  | Parser.SHROP -> "SHROP"
  | Parser.ROTLOP -> "ROTLOP"
  | Parser.ROTROP -> "ROTROP"
  | Parser.EQOP -> "EQOP"
  | Parser.NEQOP -> "NEQOP"
  | Parser.LEOP -> "LEOP"
  | Parser.LTOP -> "LTOP"
  | Parser.GTOP -> "GTOP"
  | Parser.GEOP -> "GEOP"
  | Parser.HASH -> "HASH"
  | Parser.EQ -> "EQ"
  | Parser.LT -> "LT"
  | Parser.GT -> "GT"
  | Parser.PLUSASSIGN -> "PLUSASSIGN"
  | Parser.MINUSASSIGN -> "MINUSASSIGN"
  | Parser.MULASSIGN -> "MULASSIGN"
  | Parser.DIVASSIGN -> "DIVASSIGN"
  | Parser.MODASSIGN -> "MODASSIGN"
  | Parser.POWASSIGN -> "POWASSIGN"
  | Parser.CATASSIGN -> "CATASSIGN"
  | Parser.ANDASSIGN -> "ANDASSIGN"
  | Parser.ORASSIGN -> "ORASSIGN"
  | Parser.XORASSIGN -> "XORASSIGN"
  | Parser.SHLASSIGN -> "SHLASSIGN"
  | Parser.SHRASSIGN -> "SHRASSIGN"
  | Parser.ROTLASSIGN -> "ROTLASSIGN"
  | Parser.ROTRASSIGN -> "ROTRASSIGN"
  | Parser.NULL -> "NULL"
  | Parser.DOT_NUM _ -> "DOT_NUM of string"
  | Parser.NAT _ -> "NAT of string"
  | Parser.FLOAT _ -> "FLOAT of string"
  | Parser.CHAR _ -> "CHAR of Mo_values.Value.unicode"
  | Parser.BOOL _ -> "BOOL of bool"
  | Parser.ID _ -> "ID of string"
  | Parser.TEXT _ -> "TEXT of string"
  | Parser.PRIM -> "PRIM"
  | Parser.UNDERSCORE -> "UNDERSCORE"

let is_lineless_trivia : token -> void trivia option = function
  | SINGLESPACE -> Some (Space 1)
  | SPACE n -> Some (Space n)
  | TAB n -> Some (Tab n)
  | COMMENT c -> Some (Comment c)
  | _ -> None

let is_trivia : token -> line_feed trivia option = function
  | LINEFEED lf -> Some (Line lf)
  | t -> Option.map (map_trivia absurd) (is_lineless_trivia t)

let is_whitespace : 'a trivia -> bool = function
  | Space _ | Tab _ | Line _ -> true
  | Comment _ -> false

let is_line_feed : token -> bool = function
  | LINEFEED _ -> true
  | _ -> false

type annotation = {
  range : Lexing.position * Lexing.position;
  leading_trivia : line_feed trivia list;
  trailing_trivia : void trivia list;
}

let dummy_annotation = {
   range = Lexing.dummy_pos, Lexing.dummy_pos;
   leading_trivia = [];
   trailing_trivia = [];
}
