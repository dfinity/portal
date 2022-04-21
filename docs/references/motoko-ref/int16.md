# Int16

16-bit signed integers with checked arithmetic

Most operations are available as built-in operators (e.g. `1 + 1`).

## Int16

``` motoko
type Int16 = Prim.Types.Int16
```

16-bit signed integers

## toInt

``` motoko
let toInt : Int16 -> Int
```

Conversion.

## fromInt

``` motoko
let fromInt : Int -> Int16
```

Conversion. Traps on overflow/underflow.

## fromIntWrap

``` motoko
let fromIntWrap : Int -> Int16
```

Conversion. Wraps on overflow/underflow.

## fromNat16

``` motoko
let fromNat16 : Nat16 -> Int16
```

Conversion. Wraps on overflow/underflow.

## toNat16

``` motoko
let toNat16 : Int16 -> Nat16
```

Conversion. Wraps on overflow/underflow.

## toText

``` motoko
func toText(x : Int16) : Text
```

Returns the Text representation of `x`.

## abs

``` motoko
func abs(x : Int16) : Int16
```

Returns the absolute value of `x`. Traps when `x = -2^15`.

## min

``` motoko
func min(x : Int16, y : Int16) : Int16
```

Returns the minimum of `x` and `y`.

## max

``` motoko
func max(x : Int16, y : Int16) : Int16
```

Returns the maximum of `x` and `y`.

## equal

``` motoko
func equal(x : Int16, y : Int16) : Bool
```

Returns `x == y`.

## notEqual

``` motoko
func notEqual(x : Int16, y : Int16) : Bool
```

Returns `x != y`.

## less

``` motoko
func less(x : Int16, y : Int16) : Bool
```

Returns `x < y`.

## lessOrEqual

``` motoko
func lessOrEqual(x : Int16, y : Int16) : Bool
```

Returns `x ⇐ y`.

## greater

``` motoko
func greater(x : Int16, y : Int16) : Bool
```

Returns `x > y`.

## greaterOrEqual

``` motoko
func greaterOrEqual(x : Int16, y : Int16) : Bool
```

Returns `x >= y`.

## compare

``` motoko
func compare(x : Int16, y : Int16) : {#less; #equal; #greater}
```

Returns the order of `x` and `y`.

## neg

``` motoko
func neg(x : Int16) : Int16
```

Returns the negation of `x`, `-x`. Traps on overflow.

## add

``` motoko
func add(x : Int16, y : Int16) : Int16
```

Returns the sum of `x` and `y`, `x + y`. Traps on overflow.

## sub

``` motoko
func sub(x : Int16, y : Int16) : Int16
```

Returns the difference of `x` and `y`, `x - y`. Traps on underflow.

## mul

``` motoko
func mul(x : Int16, y : Int16) : Int16
```

Returns the product of `x` and `y`, `x * y`. Traps on overflow.

## div

``` motoko
func div(x : Int16, y : Int16) : Int16
```

Returns the division of `x by y`, `x / y`. Traps when `y` is zero.

## rem

``` motoko
func rem(x : Int16, y : Int16) : Int16
```

Returns the remainder of `x` divided by `y`, `x % y`. Traps when `y` is zero.

## pow

``` motoko
func pow(x : Int16, y : Int16) : Int16
```

Returns `x` to the power of `y`, `x ** y`. Traps on overflow.

## bitnot

``` motoko
func bitnot(x : Int16, y : Int16) : Int16
```

Returns the bitwise negation of `x`, `^x`.

## bitand

``` motoko
func bitand(x : Int16, y : Int16) : Int16
```

Returns the bitwise and of `x` and `y`, `x & y`.

## bitor

``` motoko
func bitor(x : Int16, y : Int16) : Int16
```

Returns the bitwise or of `x` and `y`, `x \| y`.

## bitxor

``` motoko
func bitxor(x : Int16, y : Int16) : Int16
```

Returns the bitwise exclusive or of `x` and `y`, `x ^ y`.

## bitshiftLeft

``` motoko
func bitshiftLeft(x : Int16, y : Int16) : Int16
```

Returns the bitwise shift left of `x` by `y`, `x << y`.

## bitshiftRight

``` motoko
func bitshiftRight(x : Int16, y : Int16) : Int16
```

Returns the bitwise shift right of `x` by `y`, `x >> y`.

## bitrotLeft

``` motoko
func bitrotLeft(x : Int16, y : Int16) : Int16
```

Returns the bitwise rotate left of `x` by `y`, `x <<> y`.

## bitrotRight

``` motoko
func bitrotRight(x : Int16, y : Int16) : Int16
```

Returns the bitwise rotate right of `x` by `y`, `x <>> y`.

## bittest

``` motoko
func bittest(x : Int16, p : Nat) : Bool
```

Returns the value of bit `p mod 16` in `x`, `(x & 2^(p mod 16)) == 2^(p mod 16)`.

## bitset

``` motoko
func bitset(x : Int16, p : Nat) : Int16
```

Returns the value of setting bit `p mod 16` in `x` to `1`.

## bitclear

``` motoko
func bitclear(x : Int16, p : Nat) : Int16
```

Returns the value of clearing bit `p mod 16` in `x` to `0`.

## bitflip

``` motoko
func bitflip(x : Int16, p : Nat) : Int16
```

Returns the value of flipping bit `p mod 16` in `x`.

## bitcountNonZero

``` motoko
let bitcountNonZero : (x : Int16) -> Int16
```

Returns the count of non-zero bits in `x`.

## bitcountLeadingZero

``` motoko
let bitcountLeadingZero : (x : Int16) -> Int16
```

Returns the count of leading zero bits in `x`.

## bitcountTrailingZero

``` motoko
let bitcountTrailingZero : (x : Int16) -> Int16
```

Returns the count of trailing zero bits in `x`.

## addWrap

``` motoko
func addWrap(x : Int16, y : Int16) : Int16
```

Returns the sum of `x` and `y`, `x +% y`. Wraps on overflow.

## subWrap

``` motoko
func subWrap(x : Int16, y : Int16) : Int16
```

Returns the difference of `x` and `y`, `x -% y`. Wraps on underflow.

## mulWrap

``` motoko
func mulWrap(x : Int16, y : Int16) : Int16
```

Returns the product of `x` and `y`, `x *% y`. Wraps on overflow.

## powWrap

``` motoko
func powWrap(x : Int16, y : Int16) : Int16
```

Returns `x` to the power of `y`, `x **% y`. Wraps on overflow. Traps if `y < 0`.
