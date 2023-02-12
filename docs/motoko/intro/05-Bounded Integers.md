# 05 - Bounded integers 
Motoko supports integer types with fixed precision called "Bounded types". 

You may want to use bounded types for these reasons:
- **Memory efficiency:** You want to be sure how much memory your data will occupy
- **Exact sizing:** If you know that some API returns exact number
- **Execution efficiency:** If you know that your numbers require 64-bit arithmetic, using Nat64 is more efficient than just Nat
- **Bitwise aithmerics:** If you want to do bitwise operations like `<<` or `XOR` it's much easier when you work with the exact representation of binary data

## Nat8, Nat16, Nat32 and Nat64
Natural types include Nat8, Nat16, Nat32 and Nat64. Bounded types need to be declared manually. Otherwise numeric literals will default to Int or Nat.

The number that is a part of type name specifies the number of bits in the type representation. For example, Nat32 represents a 32-bit natural number.

Declaring a bounded variable:
```motoko
let a : Nat32 = 1 // 1 : Nat32
```

To declare a bounded value you have to specify the type explicitly 
to avoid it resolving to a regular Nat:
```motoko
2 : Nat32 // 2: Nat32
```


## Int8, Int16, Int32, and Int64 
Integer types include Int8, Int16, Int32, and Int64. Bounded Int types behave very similarly to Nat types with a difference that they support negative values.
The number that is a part of type name specifies the number of bits in the type representation. For example, Int32 represents a 32-bit integer.

```motoko
// A variable of type Int32
let a : Int32 = 1 // +1 : Int32
```
```motoko
// A literal of type Int32
-2 : Int8 // -2: Int8
```
## Modular arithmetics

Bounded types support "modular arithmetic" (`+%`, `-%`, `*%` and `**%` ) where the number will never go out of bounds.

Example 1: Normal arithmetic operators go out of bounds:
```motoko
let a = 255 : Nat8;
let b = 1 : Nat8;
a + b // execution error, arithmetic overflow
```

Example 2: Modular arithmetic operators go out of bounds:
```motoko
let a = 255 : Nat8;
let b = 1 : Nat8;
a +% b // 0 : Nat8
```

Bounded integers also support modual arithmetics:
```motoko
let a = 127 : Int8;
let b = 1 : Int8;
a +% b // -128 : Int8
```

## Bitwise arithmetics
Bounded types support bitwise arithmetics
```motoko
// Binary AND "&"
let a = 64 : Nat8; // binary 1000000
let b = 65 : Nat8; // binary 1000001
a & b // 64 : Nat8 == binary 1000000 
```

```motoko
// Binary OR "|"
let a = 64 : Nat8; // binary 1000000
let b = 65 : Nat8; // binary 1000001
a | b // 65 : Nat8 == binary 1000001 
```

```motoko
// Binary XOR "^"
let a = 64 : Nat8; // binary 1000000
let b = 65 : Nat8; // binary 1000001
a ^ b // 1 : Nat8  == binary 0000001
```

```motoko
// Binary shift left "<<"
let a = 64 : Nat8; //    binary  1000000
a << 1 // 128 : Nat8  == binary 10000000
```
```motoko
// Binary shift right ">>"
let a = 64 : Nat8; //   binary 1000000
a >> 1 // 32 : Nat8  == binary  100000
```

```motoko
// Binary rotation left "<<>"
let a = 255 : Nat8; //    binary 11111111
a <<> 1 // 255 : Nat8  == binary 11111111
```
```motoko
// Binary rotation right "<>>"
let a = 64 : Nat8; //   binary 1000000
a <>> 1 // 32 : Nat8 == binary  100000
```

## Bounded and arithmetics types interop

Bounded integer types are not in subtype relationship with each other or with other arithmetic types.

Unbounded literals need type annotation if the type cannot be inferred from context, e.g. `(-42 : Int16)`:
```motoko
// A literal of type Int32
-2 : Int8 // -2: Int8
```

You need to use conversion functions to produce regular unbounded values.
```motoko
// Generating an unbound type from a bound value
import Nat8 "mo:base/Nat8";
let a = 64 : Nat8;
let b : Nat = Nat8.toNat(a);
b
```
```motoko
// Generating a bound type from an unbound value
import Nat8 "mo:base/Nat8";
let b = 64 : Nat;
let c : Nat8 = Nat8.fromNat(b);
c
```
