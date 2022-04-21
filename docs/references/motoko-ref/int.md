# Int

Integer numbers

Most operations on integers (e.g. addition) are available as built-in operators (e.g. `1 + 1`). This module provides equivalent functions and `Text` conversion.

## Int

``` motoko
type Int = Prim.Types.Int
```

Infinite precision signed integers.

## abs

``` motoko
let abs : Int -> Nat
```

Returns the absolute value of the number

## toText

``` motoko
let toText : Int -> Text
```

Conversion.

## min

``` motoko
func min(x : Int, y : Int) : Int
```

Returns the minimum of `x` and `y`.

## max

``` motoko
func max(x : Int, y : Int) : Int
```

Returns the maximum of `x` and `y`.

## hash

``` motoko
func hash(i : Int) : Hash.Hash
```

## hashAcc

``` motoko
func hashAcc(h1 : Hash.Hash, i : Int) : Hash.Hash
```

<div class="warning">

May go away (?)

</div>

## equal

``` motoko
func equal(x : Int, y : Int) : Bool
```

Returns `x == y`.

## notEqual

``` motoko
func notEqual(x : Int, y : Int) : Bool
```

Returns `x != y`.

## less

``` motoko
func less(x : Int, y : Int) : Bool
```

Returns `x < y`.

## lessOrEqual

``` motoko
func lessOrEqual(x : Int, y : Int) : Bool
```

Returns `x ⇐ y`.

## greater

``` motoko
func greater(x : Int, y : Int) : Bool
```

Returns `x > y`.

## greaterOrEqual

``` motoko
func greaterOrEqual(x : Int, y : Int) : Bool
```

Returns `x >= y`.

## compare

``` motoko
func compare(x : Int, y : Int) : {#less; #equal; #greater}
```

Returns the order of `x` and `y`.

## neq

``` motoko
func neq(x : Int) : Int
```

Returns the negation of `x`, `-x` .

## add

``` motoko
func add(x : Int, y : Int) : Int
```

Returns the sum of `x` and `y`, `x + y`.

## sub

``` motoko
func sub(x : Int, y : Int) : Int
```

Returns the difference of `x` and `y`, `x - y`.

## mul

``` motoko
func mul(x : Int, y : Int) : Int
```

Returns the product of `x` and `y`, `x * y`.

## div

``` motoko
func div(x : Int, y : Int) : Int
```

Returns the division of `x` by `y`, `x / y`. Traps when `y` is zero.

## rem

``` motoko
func rem(x : Int, y : Int) : Int
```

Returns the remainder of `x` divided by `y`, `x % y`. Traps when `y` is zero.

## pow

``` motoko
func pow(x : Int, y : Int) : Int
```

Returns `x` to the power of `y`, `x ** y`.
