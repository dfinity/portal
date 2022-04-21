# Nat

Natural numbers

Most operations on natural numbers (e.g. addition) are available as built-in operators (e.g. `1 + 1`). This module provides equivalent functions and `Text` conversion.

## Nat

``` motoko
type Nat = Prim.Types.Nat
```

Infinite precision natural numbers.

## toText

``` motoko
let toText : Nat -> Text
```

Conversion.

## min

``` motoko
func min(x : Nat, y : Nat) : Nat
```

Returns the minimum of `x` and `y`.

## max

``` motoko
func max(x : Nat, y : Nat) : Nat
```

Returns the maximum of `x` and `y`.

## equal

``` motoko
func equal(x : Nat, y : Nat) : Bool
```

Returns `x == y`.

## notEqual

``` motoko
func notEqual(x : Nat, y : Nat) : Bool
```

Returns `x != y`.

## less

``` motoko
func less(x : Nat, y : Nat) : Bool
```

Returns `x < y`.

## lessOrEqual

``` motoko
func lessOrEqual(x : Nat, y : Nat) : Bool
```

Returns `x ⇐ y`.

## greater

``` motoko
func greater(x : Nat, y : Nat) : Bool
```

Returns `x > y`.

## greaterOrEqual

``` motoko
func greaterOrEqual(x : Nat, y : Nat) : Bool
```

Returns `x >= y`.

## compare

``` motoko
func compare(x : Nat, y : Nat) : {#less; #equal; #greater}
```

Returns the order of `x` and `y`.

## add

``` motoko
func add(x : Nat, y : Nat) : Nat
```

Returns the sum of `x` and `y`, `x + y`.

## sub

``` motoko
func sub(x : Nat, y : Nat) : Nat
```

Returns the difference of `x` and `y`, `x - y`. Traps on underflow.

## mul

``` motoko
func mul(x : Nat, y : Nat) : Nat
```

Returns the product of `x` and `y`, `x * y`.

## div

``` motoko
func div(x : Nat, y : Nat) : Nat
```

Returns the division of `x` by `y`, `x / y`. Traps when `y` is zero.

## rem

``` motoko
func rem(x : Nat, y : Nat) : Nat
```

Returns the remainder of `x` divided by `y`, `x % y`. Traps when `y` is zero.

## pow

``` motoko
func pow(x : Nat, y : Nat) : Nat
```

Returns `x` to the power of `y`, `x ** y`.
