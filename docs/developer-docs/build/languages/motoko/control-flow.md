# Imperative control flow

There are two key categories of control flow:

-   *declarative*, when the structure of some value guides control and the selection of the next expression to evaluate, like in `if` and `switch` expressions;

-   *imperative* where control changes abruptly according to a programmer’s command, abondoning regular control flow; examples are `break` and `continue`, but also `return` and `throw`.

Imperative control flow often goes hand-in-hand with state changes and other flavors of side-effects, such as error handling and input/output.

## Early `return` from `func`

Normally, the result of a function is the value of its body. Sometimes, during evaluation of the body, the result is available before the end of evaluation. In such situations the `return <exp>` construct can be used to abandon the rest of the computation and immediately exit the function with a result. Similarly, where permitted, `throw` may be used to abandon a computation with an error.

When a function has unit result type, the shorthand `return` may be used instead of the equivalent `return ()`.

## Loops and labels

Motoko provides several kinds of repetition constructs, including:

-   `for` expressions for iterating over members of structured data.

-   `loop` expressions for programmatic repetition (optionally with termination condition).

-   `while` loops for programmatic repetition with entry condition.

Any of these can be prefixed with a `label <name>` qualifier to give the loop a symbolic name. Named loops are useful for imperatively changing control flow to continue from the entry or exit of the named loop.

-   re-entering the loop with `continue <name>`, or

-   exiting the loop altogether with `break <name>`.

In the following example, the `for` expression loops over characters of some text and abandons iteration as soon as an exclamation sign is encountered.

``` motoko
import Debug "mo:base/Debug";
label letters for (c in "ran!!dom".chars()) {
  Debug.print(debug_show(c));
  if (c == '!') { break letters };
  // ...
}
```

### Labeled expressions

There are two other facets to `label`​s that are less mainstream, but come in handy in certain situations:

-   `label`​s can be typed

-   *any* expression (not just loops) can be named by prefixing it with a label; `break` allows one to short-circuit the expression’s evaluation by providing an immediate value for its result. (This is similar to exiting a function early using `return`, but without the overhead of declaring and calling a function.)

The syntax for type-annotated labels is `label <name> : <type> <expr>`, signifying that any expression can be exited using a `break <name> <alt-expr>` construct that returns the value of `<alt-expr>` as the value of `<expr>`, short-circuiting evaluation of `<expr>`.

Judicious use of these constructs allows the programmer to focus on the primary program logic and handle exceptional case via `break`

``` motoko
import Text "mo:base/Text";
import Iter "mo:base/Iter";

type Host = Text;
let formInput = "us@dfn";

let address = label exit : ?(Text, Host) {
  let splitted = Text.split(formInput, #char '@');
  let array = Iter.toArray<Text>(splitted);
  if (array.size() != 2) { break exit(null) };
  let account = array[0];
  let host = array[1];
  // if (not (parseHost(host))) { break exit(null) };
  ?(account, host)
}
```

Naturally, labeled common expressions don’t allow `continue`. In terms of typing, both `<expr>` and `<alt-expr>`​'s types must conform with the label’s declared `<type>`. If a label is only given a `<name>`, then its `<type>` defaults to unit (`()`). Similarly a `break` without an `<alt-expr>` is shorthand for the value unit (`()`).

## Option blocks and null breaks

Like many other high-level languages, Motoko lets you opt in to `null` values, tracking possible occurences of `null` values using option types of the form `?T`. This is to both to encourage you to avoid using `null` values when possible, and to consider the possibility of `null` values when necessary.

The latter could be cumbersome, if the only way to test a value for `null` were with a verbose `switch` expression, but Motoko simplifies the handling of option types with some dedicated syntax: *option blocks* and *null breaks*.

The option block, `do ? <block>`, produces a value of type `?T`, when block `<block>` has type `T` and, importantly, introduces the possibility of a break from `<block>`. Within a `do ? <block>`, the null break `<exp> !`, tests whether the result of the expression, `<exp>`, of unrelated option type, `?U`, is `null`. If the result `<exp>` is `null`, control immediately exits the `do ? <block>` with value `null`. Otherwise, the result of `<exp>` must be an option value `?v`, and evaluation of `<exp> !` proceeds with its contents, `v` (of type `U`).

As realistic example, we give the definition of a simple function `eval`uating numeric `Exp`ressions built from natural numbers, division and a zero test, encoded as a variant type:

``` motoko
type Exp = {
  #Lit : Nat;
  #Div : (Exp, Exp);
  #IfZero : (Exp, Exp, Exp);
};

func eval(e : Exp) : ? Nat {
  do ? {
    switch e {
      case (#Lit n) { n };
      case (#Div (e1, e2)) {
        let v1 = eval e1 !;
        let v2 = eval e2 !;
        if (v2 == 0)
          null !
        else v1 / v2
      };
      case (#IfZero (e1, e2, e3)) {
        if (eval e1 ! == 0)
          eval e2 !
        else
          eval e3 !
      };
    };
  };
}
```

To guard against division by `0` without trapping, the `eval` function returns an option result, using `null` to indicate failure.

Each recursive call is checked for `null` using `!`, immediately exiting the outer `do ? block`, and thus the function itself, with `null`, when a result is `null`.

(As an exercise that illustrates the concision of option blocks, you might want to try rewriting `eval` using a labeled expression and explicit switches for each null break.)

## Repetition with `loop`

The simplest way to indefinitely repeat a sequence of imperative expressions is by using a `loop` construct

``` motoko no-repl
loop { <expr1>; <expr2>; ... }
```

The loop can only be abandoned with a `return` or `break` construct.

A re-entry condition can be affixed to allow a conditional repetition of the loop with `loop <body> while <cond>`.

The body of such a loop is always executed at least once.

## `while` loops with precondition

Sometimes an entry condition is needed to guard the first execution of a loop. For this kind of repetition the `while <cond> <body>`-flavor is available

``` motoko no-repl
while (earned < need) { earned += earn() };
```

Unlike a `loop`, the body of a `while` loop may never be executed.

## `for` loops for iteration

An iteration over elements of some homogeneous collection can be performed using a `for` loop. The values are drawn from an iterator and bound to the loop pattern in turn.

``` motoko
let carsInStock = [
  ("Buick", 2020, 23.000),
  ("Toyota", 2019, 17.500),
  ("Audi", 2020, 34.900)
];
var inventory : { var value : Float } = { var value = 0.0 };
for ((model, year, price) in carsInStock.vals()) {
  inventory.value += price;
};
inventory
```

## Using `range` with a `for` loop

The `range` function produces an iterator (of type `Iter<Nat>`) with the given lower and upper bound, inclusive.

The following loop example prints the numbers `0` through `10` over its *eleven* iterations:

``` motoko
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
var i = 0;
for (j in Iter.range(0, 10)) {
  Debug.print(debug_show(j));
  assert(j == i);
  i += 1;
};
assert(i == 11);
```

More generally, the function `range` is a `class` that constructs iterators over sequences of natural numbers. Each such iterator has type `Iter<Nat>`.

As a constructor function, `range` has a function type:

``` motoko no-repl
(lower : Nat, upper : Int) -> Iter<Nat>
```

Where `Iter<Nat>` is an iterator object type with a `next` method that produces optional elements, each of type `?Nat`:

``` motoko no-repl
type Iter<A> = {next : () -> ?A};
```

For each invocation, `next` returns an optional element (of type `?Nat`).

The value `null` indicates that the iteration sequence has terminated.

Until reaching `null`, each non-`null` value, of the form `?`*n* for some number *n*, contains the next successive element in the iteration sequence.

## Using `revRange`

Like `range`, the function `revRange` is a `class` that constructs iterators (each of type `Iter<Int>`). As a constructor function, it has a function type:

``` motoko no-repl
(upper : Int, lower : Int) -> Iter<Int>
```

Unlike `range`, the `revRange` function *descends* in its iteration sequence, from an initial *upper* bound to a final *lower* bound.

## Using iterators of specific data structures

Many built-in data structures come with pre-defined iterators. Below table lists them

| Type      | Name                  | Iterator | Elements                  | Element type |
|-----------|-----------------------|----------|---------------------------|--------------|
| `[T]`     | array of `T`​s         | `vals`   | the array’s members       | `T`          |
| `[T]`     | array of `T`​s         | `keys`   | the array’s valid indices | `Nat`        |
| `[var T]` | mutable array of `T`​s | `vals`   | the array’s members       | `T`          |
| `[var T]` | mutable array of `T`​s | `keys`   | the array’s valid indices | `Nat`        |
| `Text`    | text                  | `chars`  | the text’s characters     | `Char`       |
| `Blob`    | blob                  | `vals`   | the blob’s bytes          | `Nat8`       |

Iterators for data structures

User-defined data structures can define their own iterators. As long they conform with the `Iter<A>` type for some element type `A`, these behave like the built-in ones and can be consumed with ordinary `for`-loops.
