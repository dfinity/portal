# Text

Text values

This type represents human-readable text as sequences of characters of type `Char`. If `t` is a value of type `Text`, then:

-   `t.chars()` returns an *iterator* of type `Iter<Char>` enumerating its characters from first to last.

-   `t.size()` returns the *size* (or length) of `t` (and `t.chars()`) as a `Nat`.

-   `t1 # t2` concatenates texts `t1` and `t2`.

Represented as ropes of UTF-8 character sequences with O(1) concatenation.

This module defines additional operations on `Text` values.

## Text

``` motoko
type Text = Prim.Types.Text
```

Text values.

## fromChar

``` motoko
let fromChar : (c : Char) -> Text
```

Conversion. Returns the text value of size 1 containing the single character `c`.

## toIter

``` motoko
func toIter(t : Text) : Iter.Iter<Char>
```

Conversion. Creates an iterator that traverses the characters of the text `t`.

## fromIter

``` motoko
func fromIter(cs : Iter.Iter<Char>) : Text
```

Conversion. Returns the text value containing the sequence of characters in `cs`.

## size

``` motoko
func size(t : Text) : Nat
```

Returns `t.size()`, the number of characters in `t` (and `t.chars()`).

## hash

``` motoko
func hash(t : Text) : Hash.Hash
```

Returns a hash obtained by using the `djb2` algorithm from <http://www.cse.yorku.ca/~oz/hash.html>

This function is *good enough* for use in a hash-table but it’s not a cryptographic hash function!

## concat

``` motoko
func concat(t1 : Text, t2 : Text) : Text
```

Returns the concatenation of `t1` and `t2`, `t1 # t2`.

## equal

``` motoko
func equal(t1 : Text, t2 : Text) : Bool
```

Returns `t1 == t2`.

## notEqual

``` motoko
func notEqual(t1 : Text, t2 : Text) : Bool
```

Returns `t1 != t2`.

## less

``` motoko
func less(t1 : Text, t2 : Text) : Bool
```

Returns `t1 < t2`.

## lessOrEqual

``` motoko
func lessOrEqual(t1 : Text, t2 : Text) : Bool
```

Returns `t1 ⇐ t2`.

## greater

``` motoko
func greater(t1 : Text, t2 : Text) : Bool
```

Returns `t1 > t2`.

## greaterOrEqual

``` motoko
func greaterOrEqual(t1 : Text, t2 : Text) : Bool
```

Returns `t1 >= t2`.

## compare

``` motoko
func compare(t1 : Text, t2 : Text) : {#less; #equal; #greater}
```

Returns the order of `t1` and `t1`.

## join

``` motoko
func join(sep : Text, ts : Iter.Iter<Text>) : Text
```

Returns the concatenation of text values in `ts`, separated by `sep`.

## map

``` motoko
func map(t : Text, f : Char -> Char) : Text
```

Returns the result of applying `f` to each character in `ts`, concatenating the intermediate single-character text values.

## translate

``` motoko
func translate(t : Text, f : Char -> Text) : Text
```

Returns the result of applying `f` to each character in `ts`, concatenating the intermediate text values.

## Pattern

``` motoko
type Pattern = {#char : Char; #text : Text; #predicate : (Char -> Bool)}
```

A pattern `p` describes a sequence of characters. A pattern has one of the following forms:

-   `#char c` matches the single character sequence, `c`.

-   `#predicate p` matches any single character sequence `c` satisfying predicate `p(c)`.

-   `#text t` matches multi-character text sequence `t`.

A *match* for `p` is any sequence of characters matching the pattern `p`.

## split

``` motoko
func split(t : Text, p : Pattern) : Iter.Iter<Text>
```

Returns the sequence of fields in `t`, derived from start to end, separated by text matching pattern `p`. Two fields are separated by exactly one match.

## tokens

``` motoko
func tokens(t : Text, p : Pattern) : Iter.Iter<Text>
```

Returns the sequence of tokens in `t`, derived from start to end. A *token* is a non-empty maximal subsequence of `t` not containing a match for pattern `p`. Two tokens may be separated by one or more matches of `p`.

## contains

``` motoko
func contains(t : Text, p : Pattern) : Bool
```

Returns true if `t` contains a match for pattern `p`.

## startsWith

``` motoko
func startsWith(t : Text, p : Pattern) : Bool
```

Returns `true` if `t` starts with a prefix matching pattern `p`, otherwise returns `false`.

## endsWith

``` motoko
func endsWith(t : Text, p : Pattern) : Bool
```

Returns `true` if `t` ends with a suffix matching pattern `p`, otherwise returns `false`.

## replace

``` motoko
func replace(t : Text, p : Pattern, r : Text) : Text
```

Returns `t` with all matches of pattern `p` replaced by text `r`.

## stripStart

``` motoko
func stripStart(t : Text, p : Pattern) : ?Text
```

Returns the optioned suffix of `t` obtained by eliding exactly one leading match of pattern `p`, otherwise `null`.

## stripEnd

``` motoko
func stripEnd(t : Text, p : Pattern) : ?Text
```

Returns the optioned prefix of `t` obtained by eliding exactly one trailing match of pattern `p`, otherwise `null`.

## trimStart

``` motoko
func trimStart(t : Text, p : Pattern) : Text
```

Returns the suffix of `t` obtained by eliding all leading matches of pattern `p`.

## trimEnd

``` motoko
func trimEnd(t : Text, p : Pattern) : Text
```

Returns the prefix of `t` obtained by eliding all trailing matches of pattern `p`.

## trim

``` motoko
func trim(t : Text, p : Pattern) : Text
```

Returns the subtext of `t` obtained by eliding all leading and trailing matches of pattern `p`.

## compareWith

``` motoko
func compareWith(t1 : Text, t2 : Text, cmp : (Char, Char) -> {#less; #equal; #greater}) : {#less; #equal; #greater}
```

Returns the lexicographic comparison of `t1` and `t2`, using the given character ordering `cmp`.

## encodeUtf8

``` motoko
let encodeUtf8 : Text -> Blob
```

Returns the UTF-8 encoding of the given text

## decodeUtf8

``` motoko
let decodeUtf8 : Blob -> ?Text
```

Tries to decode the given `Blob` as UTF-8. Returns `null` if the blob is *not* valid UTF-8.
