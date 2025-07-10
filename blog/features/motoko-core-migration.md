---
title: "Migrate from the Motoko `base` to `core` package"
description: 
tags: [Motoko, New features, Technology]
image: /img/blog/new-motoko-base.jpg
---

# Migrate from the Motoko base library to `core` package

[![Motoko core package](/img/blog/new-motoko-base.jpg)](https://github.com/dfinity/motoko-core)

* [GitHub repository](https://github.com/dfinity/motoko-core)
* [Documentation](https://internetcomputer.org/docs/motoko/core/)

> ### We are excited to release the new Motoko `core` package as an evolution from the original `base` library.

## Introduction to `core`

The `core` package is a new and improved standard library for Motoko, focusing on:
* AI-friendly design patterns
* Familiarity coming from languages such as JavaScript, Python, Java, and Rust
* Simplified usage of data structures in stable memory
* Consistent naming conventions and parameter ordering

This page provides a comprehensive guide for migrating from the `base` Motoko package to the new `core` package.

### Project configuration

Add the following to your `mops.toml` file to begin using the `core` package:

```toml
[dependencies]
core = "0.0.0" # Check the latest version: https://mops.one/core
```

If you are migrating an existing project, you can keep the `base` import and gradually transition to using the new API.

### Important considerations

When updating to the `core` package:

- All data structures can now be stored in stable memory without the need for pre-upgrade/post-upgrade hooks.
- `range()` functions in the `core` library are now exclusive rather than inclusive! Keep this in mind when replacing `Iter.range()` with `Nat.range()`.
- Functions previously named `vals()` are renamed to `values()`. This also applies to fields. For example, `array.vals()` can be replaced with `array.values()`.
- Hash-based data structures are no longer included in the standard library. We now encourage using ordered maps and sets for improved security.
In some cases, it won't be possible to fully migrate to `core` due to removal of some features in `base`. In these cases, you can continue using both packages side-by-side or search for [Mops packages](https://mops.one/) built by the community.

For details on function signatures, please refer to the official [documentation](https://internetcomputer.org/docs/motoko/core/).

Also, feel free to ask for help by posting on the [ICP developer forum](https://forum.dfinity.org/c/developers) or opening a GitHub issue on the [`dfinity/motoko-core`](https://github.com/dfinity/motoko-core/issues) repository.

## Module changes

### 1. New modules

The following modules are **new** in the core package:

- `List` - Mutable list
- `Map` - Mutable map
- `Queue` - Mutable double-ended queue
- `Set` - Mutable set
- `Runtime` - Runtime utilities and assertions
- `Tuples` - Tuple utilities
- `Types` - Common type definitions
- `VarArray` - Mutable array operations
- `pure/List` - Immutable list (originally `mo:base/List`)
- `pure/Map` - Immutable map (originally `mo:base/OrderedMap`)
- `pure/RealTimeQueue` - Queue implementation with performance tradeoffs
- `pure/Set` - Immutable set (originally `mo:base/OrderedSet`)

### 2. Renamed modules

| Base Module | Core Module | Notes |
|-------------|-------------|-------|
| `ExperimentalCycles` | `Cycles` | Stabilized module for cycle management |
| `ExperimentalInternetComputer` | `InternetComputer` | Stabilized low-level ICP interface |
| `Deque` | `pure/Queue` | Enhanced double-ended queue becomes mutable queue |
| `List` | `pure/List` | Original immutable list moved to `pure/` namespace |
| `OrderedMap` | `pure/Map` | Ordered map moved to `pure/` namespace |
| `OrderedSet` | `pure/Set` | Ordered set moved to `pure/` namespace |

**Note**: The last three entries represent the migration of immutable data structures to the `pure/` namespace. The `core` package introduces a clear separation between mutable data structures (root namespace) and purely functional data structures (`pure/` namespace).

### 3. Removed modules

The following modules have been **removed** in the core package:

- `AssocList` - Use `Map` or `pure/Map` instead
- `Buffer` - Use `List` or `VarArray` instead
- `ExperimentalStableMemory` - Deprecated
- `Hash` - Vulnerable to hash collision attacks
- `HashMap` - Use `Map` or `pure/Map`
- `Heap`
- `IterType` - Merged into `Types` module
- `None`
- `Prelude` - Merged into `Debug` and `Runtime`
- `RBTree`
- `Trie`
- `TrieMap` - Use `Map` or `pure/Map` instead
- `TrieSet` - Use `Set` or `pure/Set` instead

**Note**: Modules like `Random`, `Region`, `Time`, `Timer`, and `Stack` still exist in core but with modified APIs.

## Data structure improvements

The core package introduces a fundamental reorganization of data structures with a clear separation between mutable and immutable (purely functional) APIs. All data structures are now usable in stable memory.

| Structure | Module | Description |
|-----------|--------|-------------|
| **List** | `List` | Mutable list |
| **Map** | `Map` | Mutable map |
| **Queue** | `Queue` | Mutable queue (evolved from `mo:base/Deque`) |
| **Set** | `Set` | Mutable set |
| **Array** | `Array` | Immutable array |
| **VarArray** | `VarArray` | Mutable array |
| **List** | `pure/List` | Immutable list (originally `mo:base/List`) |
| **Map** | `pure/Map` | Immutable map (originally `mo:base/OrderedMap`) |
| **Set** | `pure/Set` | Immutable set (originally `mo:base/OrderedSet`) |
| **Queue** | `pure/Queue` | Immutable queue |
| **RealTimeQueue** | `pure/RealTimeQueue` | Real-time queue with [constant-time operations](https://drops.dagstuhl.de/storage/00lipics/lipics-vol268-itp2023/LIPIcs.ITP.2023.29/LIPIcs.ITP.2023.29.pdf) |

## Function changes by module

### Array

#### Renamed functions
- `append()` → `concat()`
- `chain()` → `flatMap()`
- `freeze()` → `fromVarArray()`
- `init()` → `repeat()` (combines with `tabulate()` for different use cases)
- `make()` → `singleton()`
- `mapFilter()` → `filterMap()`
- `slice()` → `range()`
- `subArray()` → `sliceToArray()`
- `thaw()` → `toVarArray()`
- `vals()` → `values()`

#### New functions
- `all()` - Check if all elements satisfy predicate
- `any()` - Check if any element satisfies predicate
- `compare()` - Compare two arrays
- `empty()` - Create empty array
- `enumerate()` - Get indexed iterator
- `findIndex()` - Find index of first matching element
- `forEach()` - Apply function to each element
- `fromIter()` - Create array from iterator
- `isEmpty()` - Check if array is empty
- `join()` - Join arrays from iterator
- `toText()` - Convert array to text representation

#### Removed functions
- `take()` - Use `sliceToArray()` or `subArray()` instead
- `sortInPlace()` - Use `VarArray.sortInPlace()` instead
- `tabulateVar()` - Use `VarArray.tabulate()` instead

### Blob

#### Modified functions
- `fromArrayMut()` → `fromVarArray()`
- `hash()` - Return type changed from `Nat32` to `Types.Hash`
- `toArrayMut()` → `toVarArray()`

#### New functions
- `empty()` - Create an empty blob (`"" : Blob`)
- `isEmpty()` - Check if blob is empty
- `size()` - Get number of bytes in a blob (equivalent to `blob.size()`)

### Bool

#### Renamed functions
- `logand()` → `logicalAnd()`
- `lognot()` → `logicalNot()`
- `logor()` → `logicalOr()`
- `logxor()` → `logicalXor()`

#### New functions
- `allValues()` - Iterator over all boolean values

### Char

#### Renamed functions
- `isLowercase()` → `isLower()`
- `isUppercase()` → `isUpper()`

### Debug

#### Added functions
- `todo()` - Replaces `Prelude.nyi()`

#### Removed functions
- `trap()` - Moved to `Runtime.trap()`

### Float

#### Modified functions
- `equal()` - Now requires epsilon parameter
- `notEqual()` - Now requires epsilon parameter

#### Removed functions
- `equalWithin()`, `notEqualWithin()` - Use `equal()` and `notEqual()` with epsilon

### Iter

`Iter.range()` has been removed in favor of type-specific range functions such as `Nat.range()`, `Int.range()`, `Nat32.range()`, etc. These functions have an **exclusive upper bound**, in contrast to the original inclusive upper bound of `Iter.range()`. 

```motoko no-repl
import Int "mo:base/Int";
import Debug "mo:base/Debug";

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

### Int

#### New functions
- `fromNat()` - Convert Nat to Int
- `fromText()` - Parse Int from text
- `range()` - Create iterator over range
- `rangeBy()` - Create iterator with step
- `rangeByInclusive()` - Inclusive range with step
- `rangeInclusive()` - Inclusive range
- `toNat()` - Convert Int to Nat (safe conversion)

#### Removed functions
- `hash()`
- `hashAcc()` 

### Nat

#### New functions
- `allValues()` - Iterator over all natural numbers
- `bitshiftLeft()` / `bitshiftRight()` - Bit shifting operations
- `fromInt()` - Safe conversion from Int
- `fromText()` - Parse Nat from text
- `range()`, `rangeInclusive()` - Range iterators
- `rangeBy()`, `rangeByInclusive()` - Range with step
- `toInt()` - Convert to Int

### Int8, Int16, Int32, Int64, Nat8, Nat16, Nat32, Nat64

### Renamed fields

- `maximumValue` → `maxValue`
- `minimumValue` → `minValue`

#### New functions
- `allValues()` - Iterator over all values in range
- `range()`, `rangeInclusive()` - Range iterators (replaces `Iter.range()`)

### Option

#### Renamed functions
- `make()` → `some()` - Create option from value
- `iterate()` → `forEach()` - Apply function to option value

#### New functions
- `compare()` - Compare two options
- `toText()` - Convert option to text representation

#### Removed functions
- `assertNull()` - Removed in favor of pattern matching
- `assertSome()` - Removed in favor of pattern matching

### Order

#### New functions
- `allValues()` - Iterator over all order values (`#less`, `#equal`, `#greater`)

### Random

The `Random` module has been completely redesigned in the core package with a new API that provides better control over random number generation and supports both pseudo-random and cryptographic random number generation.

```motoko
import Random "mo:base/Random";

actor {
  let random = Random.crypto();

  public func coinFlip() : async Bool {
    await* random.bool()
  };

  public func randomItem(items : [Text]) : async Text {
    items[await* random.natRange(0, items.size())]
  };
}
```

#### New classes
- `Random` - Synchronous pseudo-random number generator for simulations and testing
- `AsyncRandom` - Asynchronous cryptographic random number generator using ICP entropy

#### Class methods
- `bool()` - Random choice between `true` and `false`
- `nat8()` - Random `Nat8` value in range `[0, 256)`
- `nat64()` - Random `Nat64` value in range `[0, 2^64)`
- `nat64Range(from, to)` - Random `Nat64` in range `[from, to)`
- `natRange(from, to)` - Random `Nat` in range `[from, to)`
- `intRange(from, to)` - Random `Int` in range `[from, to)`

#### New functions
- `emptyState()` - Initialize empty random number generator state
- `seedState()` - Initialize pseudo-random state with 64-bit seed
- `seed()` - Create pseudo-random generator from seed
- `seedFromState()` - Create pseudo-random generator from state
- `crypto()` - Create cryptographic random generator using ICP entropy
- `cryptoFromState()` - Create cryptographic generator from state

### Result

#### New functions
- `all()` - Check all results in iterator
- `any()` - Check any result satisfies predicate
- `forOk()` - Apply function to `#ok` value
- `forErr()` - Apply function to `#err` value
- `fromBool()` - Create Result from boolean

### Text

#### Renamed functions
- `toLowercase()` → `toLower()`
- `toUppercase()` → `toUpper()`
- `translate()` → `flatMap()`

#### New functions
- `isEmpty()` - Check if text is empty
- `toText()` - Identity function

#### Removed functions
- `hash()`
- `fromList()` - Use `fromIter()` with list iterator instead
- `toList()` - Use `toIter()` and convert to list if needed
