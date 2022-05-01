# Motoko at-a-glance

This summary provides a simple but comprehensive overview of Motoko with examples of key features to help you identify operations and patterns that you might know in other languages and what they look like in Motoko.

## Motoko motivation and goals

A simple, useful language for DFINITY and the {platform}.

-   Familiar syntax

-   Safe by default

-   Incorporates smart contracts using the **canister** model

-   Provides seamless integration of DFINITY and the {platform} features

-   Makes the most of present and future WebAssembly

## Key design points

Motoko takes inspiration from several programming languages, including Java, JavaScript, C#, Swift, Pony, ML, Haskell.

-   Object-oriented, functional, and imperative

-   Objects as records of members

-   `async`/`await` for sequential programming of asynchronous messaging

-   Structural typing with simple generics and subtyping

-   Safe arithmetic (unbounded and checked)

-   Non-nullable types by default

-   JavaScript-like syntax but statically typed and sane

## Semantics

-   call-by-value (like Java, C, JS, and ML; unlike Haskell and Nix)

-   declarations are locally mutually recursive

-   parametric, bounded polymorphism

-   subtyping as subsumption, not coercion

-   no dynamic casts

-   no inheritance

## Implementations

-   implemented in OCaml (leverages `wasm` library)

-   simple reference interpreter

-   less simple compiler to WebAssembly

-   multipass with typed IR in each pass

-   uniform representation, unboxed arithmetic

-   two-space gc, gc between messages

-   polymorphism by erasure

## Language features

The next sections highlight Motoko programming language features in simplified form. For additional information about using these and other features, see the [Language quick reference](./language-manual.md).
### Expressions

-   identifiers such as `x`, `foo_bar`, `test'`, `List`, `Map`

-   parentheses for grouping

-   type annotations to help type inference, for example `(42 : Int)`

### Blocks and declarations

-   semi-colons are required after each declaration

-   mutually recursive

-   mutable variables marked explicitly

<!-- -->

    type Delta = Nat;
    func print() {
      Debug.print(Int.toText(counter));
    };
    let d : Delta = 42;
    var counter = 1;
    counter := counter + tmp;
    print();

### Control flow

if and if - else

    if (b) …
    if (b) … else …

switch and case

    switch x { case (pat1) e1; …; case _ en }

while and loop

    while (b) …

    loop …
    loop … while (b)`

for

    for (pat in e) …

## Primitive types

The next sections highlight the primitive types in the Motoko programming language.

### Unbounded integers

`Int`

-   inferred by default for negative literals

-   literals: `13`, `0xf4`, `-20`, `+1`, `1_000_000`

### Unbounded naturals

`Nat`

-   non-negative numbers, trap upon underflow

-   inferred by default for non-negative literals

-   literals: `13`, `0xf4`, `1_000_000`

### Bounded numbers (trapping)

`Nat8`, `Nat16`, `Nat32`, `Nat64`, `Int8`, `Int16`, `Int32`, `Int64`

-   trap on over- and underflow

-   need type annotations specified

-   literals: `13`, `0xf4`, `-20`, `1_000_000`

### Floating point numbers

`Float`

-   IEEE 754 double precision (64 bit) semantics, normalized NaN

-   inferred for fractional literals

-   literals: `0`, `-10`, `2.71`, `-0.3e+15`, `3.141_592_653_589_793_12`

### Numeric operations

operators behave as you would expect (no surprises)

    a - b
    a + b
    a & b

### Characters and text

`Char`, `Text`

Unicode, no random access

    'x', '\u{\6a}', '☃'
    "boo", "foo \u{\62}ar ☃"
    "Concat" # "enation"

### Booleans

`Bool`

literals: `true`, `false`

    a or b
    a and b
    not b
    if (b) e1 else e2

## Functions

The next sections provide examples for working with functions in the Motoko programming language.

### Function types

simple functions

    Int.toText : Int -> Text

multiple arguments and return values

    divRem : (Int, Int) -> (Int, Int)

can be generic/polymorphic

    Option.unwrapOr : <T>(?T, default : T) -> T

first-class (can be passed around, stored)

    map : <A, B>(f : A -> B, xs : [A]) -> [B]
    let funcs : [<T>(T) -> T] = …

### Function declarations and use

`func() { … }` short for `func() : () = { … }`

parametric functions

type instantiations may sometimes be omitted

anonymous functions (a.k.a. lambdas)

    func add(x : Int, y : Int) : Int = x + y;

    func applyNTimes<T>(n : Nat, x : T, f : T -> ()) {
      if (n == 0) return;
      f(x);
      applyNTimes(n-1, x, f);
    }

    applyNTimes<Text>(10, "Hello!", func(x) = { Debug.print(x) } );

## Composite types

The next sections provide examples for working with composite types in the Motoko programming language.

### Tuples

`(Bool, Float, Text)`

immutable, heterogeneous, fixed size

    let tuple = (true, 1.2, "foo");
    tuple.1 > 0.0;
    let (_,_,t) = tuple;

### Options

`?Text`

is either a value of that type, or `null`

    func foo(x : ?Text) : Text {
      switch x {
        case (null) { "No value" };
        case (?y) { "Value: " # y };
      };
    };
    foo(null);
    foo(?"Test");

### Arrays (immutable)

`[Text]`

    let days = ["Monday", "Tuesday", … ];
    assert(days.len() == 7);
    assert(days[1] == "Tuesday");
    // days[7] will trap (fixed size)
    for (d in days.vals()) { Debug.print(d) };

### Arrays (mutable)

`[var Nat]`

    let counters = [var 1, 2, 3];
    assert(counters.len() == 3);
    counters[1] := counters[1] + 1;
    // counters[3] will trap (fixed size)

### Records

`{name : Text; points : var Int}`

    let player = { name = "Joachim";  var points = 0 };
    Debug.print(
      player.name # " has " #
      Int.toText(player.points) # " points."
    );
    player.points += 1;

### Objects

`{ get : () → Int; add : Int → () }`

different syntax, same type as records

    object self {
      var points = 0; // private by default
      public func get() = points;
      public func add(p : Int) { points += p };
    }

### Variants

`{ #invincible; #alive : Int; #dead }`

similar to enumerated types

    type Health = { #invincible; #alive : Nat; #dead };
    func takeDamage(h : Health, p : Nat) : Health {
      switch (h) {
        case (#invincible) #invincible;
        case (#alive hp) {
          if (hp > p) (#alive (hp-p)) else #dead
        };
        case (#dead) #dead;
      }
    }

## Packages and modules

The next sections provide examples for working with packages and modules in the Motoko programming language.

### Modules

-   types and values like objects

-   restricted to *static* content (pure, no state, …)

<!-- -->

    // the type of base/Int.mo
    module {
      toText : Int -> Text;
      abs : Int -> Nat;
      …
    }

### Module imports

-   `base` package provides basic features

-   additional libraries evolving with community support

<!-- -->

    import Debug "mo:base/Debug";
    import Int "mo:base/Int";

## Platform features

The next sections provide examples of the Motoko programming language platform-specific features.

### Actor types

-   like object types, but marked as `actor`:

-   *sharable* arguments and *no* or *async* result type.

-   “canister” ≈ “actor”

<!-- -->

    type Receiver = actor { recv : Text -> async Nat };
    type Broadcast = actor {
      register : Receiver -> ();
      send : Text -> async Nat;
    }

### Sharable ≈ serializable

-   all primitive types

-   records, tuples, arrays, variants, options with immutable sharable components

-   `actor` types

-   `shared` function type

The following are **not sharable:**

-   mutable things

-   local functions

-   objects (with methods)

### Complete actor example

typical canister main file

    import Array "mo:base/Array";
    actor {
      var r : [Receiver] = [];
      public func register(a : Receiver) {
        r := Array.append(r, [a]);
      };
      public func send(t : Text) : async Nat {
        var sum := 0;
        for (a in r.values()) {
          sum += await a.recv(t);
        };
        return sum;
      };
    }

### Async/await

`async T`

-   asynchronous future or promise

-   introduced by `async { … }` (implicit in async function declaration)

-   `await e` suspends computation pending \`e’s result

### Actor import

    import Broadcast "ic:ABCDEF23";
    actor Self {
      public func go() {
        Broadcast.register(Self);
      };
      public func recv(msg : Text) : async Nat {
        …
      }
    }

### Principal and caller

a `Principal` type represents the identity of a user or canister/actor

    actor Self {
      let myself : Principal = Principal.fromActor(Self);
      public shared(context) func hello() : async Text {
        if (context.caller == myself) {
          "Talking to yourself is the first sign of madness";
        } else {
          "Hello, nice to see you";
        };
      };
    }

## Type system

The next sections highlight details about type system used in the Motoko programming language.

### Structural

type definitions do not create types, but name existing types

    type Health1 = { #invincible; #alive : Nat; #dead };
    type Health2 = { #invincible; #alive : Nat; #dead };

    let takeDamage : (Health1, Nat) -> Health1 = …;
    let h : Health2 = #invincible;
    let h' = takeDamage(h, 100); // works

### Subtyping

`Mortal <: Health`

    type Health = { #invincible; #alive : Nat; #dead };
    type Mortal = { #alive : Nat; #dead };

    let takeDamage : (Health, Nat) -> Health = …;
    let h : Mortal = #alive 1000;
    let h' = takeDamage(h, 100); // also works

`t1 <: t2`: `t1` can be used wherever `t2` is expected

### Generic types

    type List<T> = ?{head : T; tail : List<T>};

    let l : List<Nat> = ?{head = 0; tail = ?{head = 1 ; tail = null }};

## Error handling

    try … catch …

    throw …

<!-- ## Class declaration example

The following table compares class declarations in Motoko with class declarations in JavaScript and TypeScript. -->

<!-- <table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Motoko</th>
<th style="text-align: left;">JavaScript/TypeScript</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><pre><code>class Counter(initValue:Nat) {
  var _value = initValue;
  public func get() : Nat {
    _value
  };
  func f(x: Nat) {};
}</code></pre></td>
<td style="text-align: left;"><pre><code>class Counter {
  private _value;
  constructor(initValue) { _value = initValue }
  public get() { return _value }
  private f(x) {}
}</code></pre></td>
</tr>
<tr class="even">
<td style="text-align: left;"><pre><code>class Foo() = Self {
  func f() : Foo = Self
}</code></pre></td>
<td style="text-align: left;"></td>
</tr>
</tbody>
</table> -->
