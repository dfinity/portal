---
title: "Try the new Motoko base library: feedback requested!"
description: The new Motoko base library makes it easier for both humans and AI to read and write Motoko canisters.
tags: [Motoko, New features, Technology]
image: /img/blog/new-motoko-base.jpg
---

# Try the new Motoko core library: feedback requested!

[![Motoko core library](/img/blog/motoko-core.jpg)](https://github.com/dfinity/motoko-core)

* [Developer forum topic](https://forum.dfinity.org/t/motoko-base-library-changes/39766)
* [GitHub repository](https://github.com/dfinity/motoko-core)
* [Online starter project](https://icp.ninja/s/kwKkw)

The Motoko team is excited to announce a major overhaul of the Motoko base library! Our goal is to improve the consistency and usability of Motoko’s standard library, making it easier for both humans and AI to read and write Motoko canisters.

Here is a quick summary of the biggest features and improvements:

* New imperative and functional data structures.
* Simplified type conversions.
* Data structures no longer rely on hashing.
* `range()` functions for each numeric type, with an exclusive upper bound.
* `VarArray` module for more conveniently working with mutable arrays.
* `Random` module with a cleaner API and optional pseudo-random number generation.
* Many other changes for consistency, clarity, and convenience.

## Try it yourself

Last week, we released a preview of the new core library with a few different options for trying it out. One is through the [`core`](https://mops.one/core) Mops package. Add the following to your `mops.toml` config file:

```toml
core = "0.0.0" # Check https://mops.one/core for the latest version
```

Alternatively, you can directly replace the `mo:base` imports in an existing project:

```toml
base = "https://github.com/dfinity/motoko-core"
```

Let us know if you run into anything unexpected by opening a [GitHub issue](https://github.com/dfinity/motoko-core/issues).

## What's changed?

Below is a detailed overview of the most notable changes and additions.

### Persistent data structures

The base library now includes both imperative (mutable) and purely functional (immutable) data structures which can all be used in stable memory. Because Motoko is a multi-paradigm language, we wanted to reflect this in the base library by providing data structures similar to those in imperative languages (JS, Java, C#, C++) and functional languages (Haskell, Elixir, OCaml, F#).

Check out [this article](https://learn.microsoft.com/en-us/dotnet/standard/linq/functional-vs-imperative-programming) for a refresher on the differences between imperative vs. functional programming, both of which are supported in Motoko.

We chose implementations with good all-round performance, deferring specialized implementations to the [Mops](https://mops.one/) package ecosystem. We also updated function names for consistency and familiarity from other languages such as JS, Python, Java, and Rust.

Below is an example of using the new imperative `List` module, derived from the [`vector`](https://mops.one/vector) Mops package (big thanks to [Andrii Stepanov and Timo Hanke](https://github.com/research-ag)):

```motoko no-repl
import List "mo:core/List";
import Nat "mo:core/Nat";

actor {
  stable let list = List.empty<Nat>(); // Persistent data structure
  List.add(list, 5);
  assert List.toText(list, Nat.toText) == "[5]";
}
```

The above code snippet can be rewritten as a new `persistent` actor:

```motoko no-repl
import List "mo:core/List";

persistent actor {
  let list = List.empty<Nat>(); // Persistent data structure
  ...
}
```

You can also use the purely functional `List` module:

```motoko no-repl
import PureList "mo:core/pure/List";

persistent actor {
  var list = PureList.empty<Text>(); // Persistent data structure
  list := PureList.pushFront(list, "Hi");
  assert PureList.size(list) == 1;
  assert PureList.all<Text>(list, func(n) { n == "Hi" });
}
```

We also included an efficient [stable BTree map implementation](https://github.com/canscale/StableHeapBTreeMap) (big thanks to [Byron Becker](https://github.com/ByronBecker)):

```motoko no-repl
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";

persistent actor {
  let map = Map.empty<Text, Nat>();
  Map.add(map, Text.compare, "key", 123);
  assert Map.size(map) == 1;
  Array.fromIter(Map.entries(map)) == [("key", 123)];
}
```

Here's the complete list of data structures in the new base library:

* `List` (adapted from [`vector`](https://mops.one/vector) Mops package)
* `Map` (adapted from [`StableHeapBTreeMap`](https://mops.one/stableheapbtreemap) Mops package)
* `Queue`
* `Set`
* `Stack`
* `pure/List`
* `pure/Map`
* `pure/Queue`
* `pure/Set`

### New type conversions

Since the new base library includes imperative and functional data structures,
we made it easy to convert between them:

```motoko no-repl
import List "mo:core/List";
import PureList "mo:core/pure/List";
import Text "mo:core/Text";

persistent actor {
  let list = List.singleton<Text>("A");

  let pureList = List.toPure<Text>(list);
  assert PureList.toArray(pureList) == ["A"];
  assert List.equal<Text>(List.fromPure(pureList), list, Text.equal);
}
```

We also added missing primitive type conversions such as those between `Int` and `Nat`:

```motoko no-repl
import Int "mo:core/Int";
import Nat "mo:core/Nat";

persistent actor {
  let number = -5;
  
  assert Int.toNat(-number) == 5; // Nat.fromInt() also exists
  assert -Nat.toInt(5 : Nat) == number; // Int.fromNat() also exists
}
```

### Hashing

We removed 32-bit hashing from the base library in favor of comparison-based data structures. This solves a number of problems such as hash-collision attacks which can rapidly drain cycles from a canister. The idea is for Mops packages to supply hashing functions which are best suited for a particular use case. 

### Range functions

`Iter.range()` has been removed in favor of type-specific range functions such as `Nat.range()`, `Int.range()`, `Nat32.range()`, etc. These functions have an **exclusive upper bound**, in contrast to the original inclusive upper bound of `Iter.range()`. 

```motoko no-repl
import Int "mo:core/Int";
import Debug "mo:core/Debug";

persistent actor {
  // Iterate through -3, -2, -1, 0, 1, 2 (exclusive upper bound)
  for (number in Int.range(-3, 3)) {
    Debug.print(debug_show number);
  };

  // Iterate through -3, -2, -1, 0, 1, 2, 3
  for (number in Int.rangeInclusive(-3, 3)) {
    Debug.print(debug_show number);
  };
}
```

We also included `rangeInclusive()` for use cases with an inclusive upper bound. The original `Iter.range()` corresponds to `Nat.rangeInclusive()`.

Helper functions have been added, such as `allValues()`, for each finite type in the base library. 

### VarArray module

For convenience, we created a separate `mo:core/VarArray` module with the same API as `mo:core/Array` but for mutable arrays. This reduces the need to convert back and forth between mutable and immutable arrays:

```motoko no-repl
import Array "mo:core/Array";
import VarArray "mo:core/VarArray";
import Char "mo:core/Char";
import Nat "mo:core/Nat";

persistent actor {
  let array = Array.repeat<Char>('A', 3);
  assert array == ['A', 'A', 'A'];

  let varArray = VarArray.repeat<Char>('B', 5);
  assert VarArray.equal(varArray, [var 'B', 'B', 'B', 'B', 'B'], Char.equal);

  let numbers = VarArray.fromIter<Nat>(Nat.range(0, 4));
  VarArray.mapInPlace<Nat>(numbers, func(i) = i * 3);
  assert VarArray.equal(numbers, [var 0, 3, 6, 9], Nat.equal);
}
```

It's now possible to use `.values()` as an alias for `.vals()`. Each data structure has a corresponding `values()` function, e.g. `List.values(list)`.

We also fixed naming inconsistencies in functions by replacing `ArrayMut` with `VarArray` across the base library.

### Random module

We completely redesigned the `Random` module, which is now a lot simpler to use:

```motoko no-repl
import Random "mo:core/Random";

actor {
  let random = Random.crypto(); // Cryptographic random numbers from ICP runtime

  public func coinFlip() : async Bool {
    await* random.bool()
  };

  public func randomItem(items : [Text]) : async Text {
    items[await* random.natRange(0, items.size())]
  };
}
```

Now, you can use pseudo-random number generation, adapted from the [`prng`](https://mops.one/prng) Mops package (big thanks to [Andrii Stepanov and Timo Hanke](https://github.com/research-ag)):

```motoko no-repl
import Random "mo:core/Random";

actor {
  let seed : Nat64 = 12345;
  let random = Random.fast(seed); // Pseudo-random number generator from a seed

  public func coinFlip() : async Bool {
    random.bool()
  };

  public func randomItem(items : [Text]) : async Text {
    items[random.natRange(0, items.size())]
  };
}
```

It's worth mentioning that the `Random` module is likely to see more changes in the future, such as adding a way to persist the state of pseudo-random number generation.

## What's next?

Before replacing the current Motoko base library, we have a list of follow-up improvements:

* Creating a migration guide for a smooth transition from the original base library.
* Updating the documentation with more examples and detailed explanations.
* Improving test coverage of new functionality.
* Adding new language capabilities for more convenient design patterns.

## Contributions and feedback

We want to give a huge thanks to the community members who provided high-quality code contributions to the new base library repository:

* [MR Research AG (A. Stepanov, T. Hanke)](https://github.com/research-ag): [`vector`](https://github.com/research-ag/vector), [`prng`](https://github.com/research-ag/prng)
* [Byron Becker](https://github.com/ByronBecker): [`StableHeapBTreeMap`](https://github.com/canscale/StableHeapBTreeMap)
* [Zen Voich](https://github.com/ZenVoich): [`test`](https://github.com/ZenVoich/test)

Please consider providing feedback on the [developer forum topic](https://forum.dfinity.org/t/motoko-base-library-changes/39766) or [GitHub discussions page](https://github.com/dfinity/motoko-core/discussions). This is the best time to voice your opinion, since we have the most flexibility now before we lock in the final design. 

Thank you for reading, and we look forward to hearing your feedback on the new base library!
