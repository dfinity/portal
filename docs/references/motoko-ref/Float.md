# Float

64-bit Floating-point numbers

## Float

``` motoko
type Float = Prim.Types.Float
```

64-bit floating point numbers.

## pi

``` motoko
let pi : Float
```

Ratio of the circumference of a circle to its diameter.

## e

``` motoko
let e : Float
```

Base of the natural logarithm.

## abs

``` motoko
let abs : (x : Float) -> Float
```

Returns the absolute value of `x`.

## sqrt

``` motoko
let sqrt : (x : Float) -> Float
```

Returns the square root of `x`.

## ceil

``` motoko
let ceil : (x : Float) -> Float
```

Returns the smallest integral float greater than or equal to `x`.

## floor

``` motoko
let floor : (x : Float) -> Float
```

Returns the largest integral float less than or equal to `x`.

## trunc

``` motoko
let trunc : (x : Float) -> Float
```

Returns the nearest integral float not greater in magnitude than `x`.

## nearest

``` motoko
let nearest : (x : Float) -> Float
```

Returns the nearest integral float to `x`.

## copySign

``` motoko
let copySign : (x : Float, y : Float) -> Float
```

Returns `x` if `x` and `y` have same sign, otherwise `x` with negated sign.

## min

``` motoko
let min : (x : Float, y : Float) -> Float
```

Returns the smaller value of `x` and `y`.

## max

``` motoko
let max : (x : Float, y : Float) -> Float
```

Returns the larger value of `x` and `y`.

## sin

``` motoko
let sin : (x : Float) -> Float
```

Returns the sine of the radian angle `x`.

## cos

``` motoko
let cos : (x : Float) -> Float
```

Returns the cosine of the radian angle `x`.

## tan

``` motoko
let tan : (x : Float) -> Float
```

Returns the tangent of the radian angle `x`.

## arcsin

``` motoko
let arcsin : (x : Float) -> Float
```

Returns the arc sine of `x` in radians.

## arccos

``` motoko
let arccos : (x : Float) -> Float
```

Returns the arc cosine of `x` in radians.

## arctan

``` motoko
let arctan : (x : Float) -> Float
```

Returns the arc tangent of `x` in radians.

## arctan2

``` motoko
let arctan2 : (y : Float, x : Float) -> Float
```

Given `(y,x)`, returns the arc tangent in radians of `y/x` based on the signs of both values to determine the correct quadrant.

## exp

``` motoko
let exp : (x : Float) -> Float
```

Returns the value of `e` raised to the `x`-th power.

## log

``` motoko
let log : (x : Float) -> Float
```

Returns the natural logarithm (base-`e`) of `x`.

## format

``` motoko
func format(fmt : {#fix : Nat8; #exp : Nat8; #gen : Nat8; #hex : Nat8; #exact}, x : Float) : Text
```

Formatting. `format(fmt, x)` formats `x` to `Text` according to the formatting directive `fmt`, which can take one of the following forms:

-   `#fix prec` as fixed-point format with `prec` digits

-   `#exp prec` as exponential format with `prec` digits

-   `#gen prec` as generic format with `prec` digits

-   `#hex prec` as hexadecimal format with `prec` digits

-   `#exact` as exact format that can be decoded without loss.

## toText

``` motoko
let toText : Float -> Text
```

Conversion to Text. Use `format(fmt, x)` for more detailed control.

## toInt64

``` motoko
let toInt64 : Float -> Int64
```

Conversion to Int64 by truncating Float, equivalent to `toInt64(trunc(f))`

## fromInt64

``` motoko
let fromInt64 : Int64 -> Float
```

Conversion from Int64.

## toInt

``` motoko
let toInt : Float -> Int
```

Conversion to Int.

## fromInt

``` motoko
let fromInt : Int -> Float
```

Conversion from Int. May result in `Inf`.

## equal

``` motoko
func equal(x : Float, y : Float) : Bool
```

Returns `x == y`.

## notEqual

``` motoko
func notEqual(x : Float, y : Float) : Bool
```

Returns `x != y`.

## less

``` motoko
func less(x : Float, y : Float) : Bool
```

Returns `x < y`.

## lessOrEqual

``` motoko
func lessOrEqual(x : Float, y : Float) : Bool
```

Returns `x ⇐ y`.

## greater

``` motoko
func greater(x : Float, y : Float) : Bool
```

Returns `x > y`.

## greaterOrEqual

``` motoko
func greaterOrEqual(x : Float, y : Float) : Bool
```

Returns `x >= y`.

## compare

``` motoko
func compare(x : Float, y : Float) : {#less; #equal; #greater}
```

Returns the order of `x` and `y`.

## neq

``` motoko
func neq(x : Float) : Float
```

Returns the negation of `x`, `-x` .

## add

``` motoko
func add(x : Float, y : Float) : Float
```

Returns the sum of `x` and `y`, `x + y`.

## sub

``` motoko
func sub(x : Float, y : Float) : Float
```

Returns the difference of `x` and `y`, `x - y`.

## mul

``` motoko
func mul(x : Float, y : Float) : Float
```

Returns the product of `x` and `y`, `x * y`.

## div

``` motoko
func div(x : Float, y : Float) : Float
```

Returns the division of `x` by `y`, `x / y`.

## rem

``` motoko
func rem(x : Float, y : Float) : Float
```

Returns the remainder of `x` divided by `y`, `x % y`.

## pow

``` motoko
func pow(x : Float, y : Float) : Float
```

Returns `x` to the power of `y`, `x ** y`.
