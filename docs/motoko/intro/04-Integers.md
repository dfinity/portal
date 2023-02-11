# 04 - Integers

Motoko's main number types are Int, Nat and Float.


## Nat

Nats are "whole" positive numbers. By default positive whole nunbers are casted to type `Nat`.

```motoko
1 // 1 : Nat
```
```motoko
2 // 2: Nat
```

Large `Nat` numbers could be written with underscore as divider:
```motoko
123_456_789 // 123_456_789 : Nat
```

Even when you write a large number without underscores, Motoko will add them during the print out.
```motoko
123456789 // 123_456_789 : Nat
```

Hexadecimal numbers begin with `0x`:
```motoko
0xF // 15 : Nat
```

## Ints
Integers represent whole numbers that could be either positive or negative.

```motoko
+3 // 3 : Int
```

```motoko
-3 // -3 : Int
```

Every positive number literal is treated as `Nat`. However, it doesn't cause a problem in arithmetic operations since `Nat` is **subtype** of `Int`.

## Arithmetic operations
Motoko has several operators that work with numeric values.

```motoko
1 + 1 // => 2 : Nat
```

```motoko
+2 - 5 // => -3 : Int
```

```motoko
3 * 3 // => 9 : Nat
```

Integer division produces integer results:

```motoko
5 / 2 // => 2 : Nat
```

`%` operator performs [modular divsion](https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/what-is-modular-arithmetic):

```motoko
5 % 2 // => 1 : Nat
```

Integers support comparison:

```motoko
2 > 1  // => true
```
```motoko
2 < 1  // => false
```
```motoko
2 >= 1 // => true
```
```motoko
2 <= 1 // => false
```

