# Random
A module for obtaining randomness on the Internet Computer (IC).

This module provides the fundamentals for user abstractions to build on.

Dealing with randomness on a deterministic computing platform, such
as the IC, is intricate. Some basic rules need to be followed by the
user of this module to obtain (and maintain) the benefits of crypto-
graphic randomness:

- cryptographic entropy (randomness source) is only obtainable
  asyncronously in discrete chunks of 256 bits (32-byte sized `Blob`s)
- all bets must be closed *before* entropy is being asked for in
  order to decide them
- this implies that the same entropy (i.e. `Blob`) - or surplus entropy
  not utilised yet - cannot be used for a new round of bets without
  losing the cryptographic guarantees.

Concretely, the below class `Finite`, as well as the
`*From` methods risk the carrying-over of state from previous rounds.
These are provided for performance (and convenience) reasons, and need
special care when used. Similar caveats apply for user-defined (pseudo)
random number generators.

Usage:
```motoko no-repl
import Random "mo:base/Random";
```

## Function `blob`
``` motoko no-repl
func blob() : async Blob
```

Obtains a full blob (32 bytes) worth of fresh entropy.

Example:
```motoko no-repl
let random = Random.Finite(await Random.blob());
```

## Class `Finite`

``` motoko no-repl
class Finite(entropy : Blob)
```

Drawing from a finite supply of entropy, `Finite` provides
methods to obtain random values. When the entropy is used up,
`null` is returned. Otherwise the outcomes' distributions are
stated for each method. The uniformity of outcomes is
guaranteed only when the supplied entropy is originally obtained
by the `blob()` call, and is never reused.

Example:
```motoko no-repl
import Random "mo:base/Random";

let random = Random.Finite(await Random.blob());

let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
let seedRandom = Random.Finite(seed);
```

### Function `byte`
``` motoko no-repl
func byte() : ?Nat8
```

Uniformly distributes outcomes in the numeric range [0 .. 255].
Consumes 1 byte of entropy.

Example:
```motoko no-repl
let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
let random = Random.Finite(seed);
random.byte() // => ?20
```


### Function `coin`
``` motoko no-repl
func coin() : ?Bool
```

Simulates a coin toss. Both outcomes have equal probability.
Consumes 1 bit of entropy (amortised).

Example:
```motoko no-repl
let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
let random = Random.Finite(seed);
random.coin() // => ?false
```


### Function `range`
``` motoko no-repl
func range(p : Nat8) : ?Nat
```

Uniformly distributes outcomes in the numeric range [0 .. 2^p - 1].
Consumes ⌈p/8⌉ bytes of entropy.

Example:
```motoko no-repl
let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
let random = Random.Finite(seed);
random.range(32) // => ?348746249
```


### Function `binomial`
``` motoko no-repl
func binomial(n : Nat8) : ?Nat8
```

Counts the number of heads in `n` fair coin tosses.
Consumes ⌈n/8⌉ bytes of entropy.

Example:
```motoko no-repl
let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
let random = Random.Finite(seed);
random.binomial(5) // => ?1
```

## Function `byteFrom`
``` motoko no-repl
func byteFrom(seed : Blob) : Nat8
```

Distributes outcomes in the numeric range [0 .. 255].
Seed blob must contain at least a byte.

Example:
```motoko no-repl
let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
Random.byteFrom(seed) // => 20
```

## Function `coinFrom`
``` motoko no-repl
func coinFrom(seed : Blob) : Bool
```

Simulates a coin toss.
Seed blob must contain at least a byte.

Example:
```motoko no-repl
let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
Random.coinFrom(seed) // => false
```

## Function `rangeFrom`
``` motoko no-repl
func rangeFrom(p : Nat8, seed : Blob) : Nat
```

Distributes outcomes in the numeric range [0 .. 2^p - 1].
Seed blob must contain at least ((p+7) / 8) bytes.

Example:
```motoko no-repl
let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
Random.rangeFrom(32, seed) // => 348746249
```

## Function `binomialFrom`
``` motoko no-repl
func binomialFrom(n : Nat8, seed : Blob) : Nat8
```

Counts the number of heads in `n` coin tosses.
Seed blob must contain at least ((n+7) / 8) bytes.

Example:
```motoko no-repl
let seed : Blob = "\14\C9\72\09\03\D4\D5\72\82\95\E5\43\AF\FA\A9\44\49\2F\25\56\13\F3\6E\C7\B0\87\DC\76\08\69\14\CF";
Random.binomialFrom(5, seed) // => 1
```
