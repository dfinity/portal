# Char

Characters

## Char

``` motoko
type Char = Prim.Types.Char
```

Characters represented as Unicode code points.

## toNat32

``` motoko
let toNat32 : (c : Char) -> Nat32
```

Convert character `c` to a word containing its Unicode scalar value.

## fromNat32

``` motoko
let fromNat32 : (w : Nat32) -> Char
```

Convert `w` to a character. Traps if `w` is not a valid Unicode scalar value. Value `w` is valid if, and only if, `w < 0xD800 or (0xE000 ⇐ w and w ⇐ 0x10FFFF)`.

## toText

``` motoko
let toText : (c : Char) -> Text
```

Convert character `c` to single character text.

## isDigit

``` motoko
func isDigit(c : Char) : Bool
```

Returns `true` when `c` is a decimal digit between `0` and `9`, otherwise `false`.

## isWhitespace

``` motoko
let isWhitespace : (c : Char) -> Bool
```

Returns the Unicode *White_Space* property of `c`.

## isLowercase

``` motoko
let isLowercase : (c : Char) -> Bool
```

Returns the Unicode *Lowercase* property of `c`.

## isUppercase

``` motoko
let isUppercase : (c : Char) -> Bool
```

Returns the Unicode *Uppercase* property of `c`.

## isAlphabetic

``` motoko
let isAlphabetic : (c : Char) -> Bool
```

Returns the Unicode *Alphabetic* property of `c`.

## equal

``` motoko
func equal(x : Char, y : Char) : Bool
```

Returns `x == y`.

## notEqual

``` motoko
func notEqual(x : Char, y : Char) : Bool
```

Returns `x != y`.

## less

``` motoko
func less(x : Char, y : Char) : Bool
```

Returns `x < y`.

## lessOrEqual

``` motoko
func lessOrEqual(x : Char, y : Char) : Bool
```

Returns `x ⇐ y`.

## greater

``` motoko
func greater(x : Char, y : Char) : Bool
```

Returns `x > y`.

## greaterOrEqual

``` motoko
func greaterOrEqual(x : Char, y : Char) : Bool
```

Returns `x >= y`.

## compare

``` motoko
func compare(x : Char, y : Char) : {#less; #equal; #greater}
```

Returns the order of `x` and `y`.
