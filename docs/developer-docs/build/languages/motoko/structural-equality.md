# Structural equality

Equality (`==`) — and by extension inequality (`!=`) — is **structural**: two values `a` and `b` are equal, `a == b`, whenever they have equal contents, regardless of the physical representation, or identity, of those values in memory.

For example, the strings `"hello world"` and `"hello " #  "world"` are equal, even though they are most likely represented by different objects in memory.

Equality is defined only on `shared` types or on types that don’t contain mutable fields, mutable arrays, non-shared functions, or components of generic type.

For example, we can compare arrays of objects.

``` motoko run
let a = [ { x = 10 }, { x = 20 } ];
let b = [ { x = 10 }, { x = 20 } ];
a == b;
```

Importantly, this does *not* compare by reference, but by value.

## Subtyping

Equality respects subtyping so `{ x = 10 } == { x = 10; y = 20 }` returns `true`.

To accommodate subtyping, two values of different types are equal if they are equal at their most specific, common supertype, meaning they agree on their common structure. The compiler will warn in cases where this might lead to subtle unwanted behaviour. For example: `{ x = 10 } == { y = 20 }` will return `true` because the two values get compared at the empty record type. That’s unlikely the intention, so the compiler will emit a warning here.

``` motoko run
{ x = 10 } == { y = 20 };
```

## Generic types

It is not possible to declare that a generic type variable is `shared`, so equality can only be used on non-generic types. For example, the following expression generates a warning like this:

``` motoko run
func eq<A>(a : A, b : A) : Bool = a == b;
```

Comparing these two at the `Any` type means this comparison will return `true` no matter its arguments, so this doesn’t work as one might hope.

If you run into this limitation in your code, you should accept a comparison function of type `(A, A) -> Bool` as an argument, and use that to compare the values instead.

Let’s look at a list membership test for example. This first implementation *does not* work:

``` motoko run
import List "mo:base/List";

func contains<A>(element : A, list : List.List<A>) : Bool {
  switch list {
    case (?(head, tail))
      element == head or contains(element, tail);
    case null false;
  }
};

assert(not contains(1, ?(0, null)));
```

This assertion will trap because the compiler compares the type `A` at `Any` which is always `true`. So as long as the list has at least one element, this version of `contains` will always return true.

This second implementation shows how to accept the comparison function explicitly instead:

``` motoko run
import List "mo:base/List";
import Nat "mo:base/Nat";

func contains<A>(eqA : (A, A) -> Bool, element : A, list : List.List<A>) : Bool {
  switch list {
    case (?(head, tail))
      eqA(element, head) or contains(eqA, element, tail);
    case null false;
  }
};

assert(not contains(Nat.equal, 1, ?(0, null)));
```
