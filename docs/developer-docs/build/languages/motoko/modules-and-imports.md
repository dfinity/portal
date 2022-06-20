# Modules and imports

This section provides examples of different scenarios for using the `module` and `import` keywords.

To illustrate how these keywords are used, let’s step through some sample code.

## Importing from the Motoko base library

One of the most common import scenarios is one that you see illustrated in the examples in this guide, in the Motoko projects in the examples repository, and in the tutorials involves importing modules from the Motoko base library. Importing modules from the base library enables you to re-use the values, functions and types defined in those modules rather than writing similar ones from scratch.

The following two lines import functions from the `Array` and `Result` modules:

``` motoko
import Array "mo:base/Array";
import Result "mo:base/Result";
```

Notice that the import declaration includes the `mo:` prefix to identify the module as a Motoko module and that the declaration does not include the `.mo` file type extension.

Above example uses an identifier pattern to import modules wholesale, but you can also selectively import a subset of symbols from a module by resorting to the object pattern syntax:

``` motoko
import { map, find, foldLeft = fold } = "mo:base/Array";
```

In this example, the functions `map` and `find` are imported unaltered, while the `foldLeft` function is renamed to `fold`.

## Importing local files

Another common approach to writing programs in Motoko involves splitting up the source code into different modules. For example, you might design an application to use the following model:

-   a `main.mo` file to contain the actor and functions that change state.

-   a `types.mo` file for all of your custom type definitions.

-   a `utils.mo` file for functions that do work outside of the actor.

In this scenario, you might place all three files in the same directory and use a local import to make the functions available where they are needed.

For example, the `main.mo` contains the following lines to reference the modules in the same directory:

``` motoko no-repl
import Types "types";
import Utils "utils";
```

Because these lines import modules from the local project instead of the Motoko library, these import declarations don’t use the `mo:` prefix.

In this example, both the `types.mo` and `utils.mo` files are in the same directory as the `main.mo` file. Once again, import does not use the `.mo` file suffix.

## Importing from another package or directory

You can also import modules from other packages or from directories other than the local directory.

For example, the following lines import modules from a `redraw` package that is defined as a dependency:

``` motoko no-repl
import Render "mo:redraw/Render";
import Mono5x5 "mo:redraw/glyph/Mono5x5";
```

You can define dependencies for a project using the Vessel package manager or in the project `dfx.json` configuration file.

In this example, the `Render` module is in the default location for source code in the `redraw` package and the `Mono5x5` module is in a `redraw` package subdirectory called `glyph`.

## Importing actor classes

While module imports are typically used to import libraries of local functions and values, they can also be used to import actor classes. When an imported file consists of a named actor class, the client of the imported field sees a module containing the actor class.

This module has two components, both named after the actor class:

-   a type definition, describing the interface of the class, and

-   an asynchronous function, that takes the class parameters as arguments an asynchronously returns a fresh instance of the class.

For example, a Motoko actor can import and instantiate the `Counter` class described in [Actors and async data](actors-async.md#actor-classes-generalize-actors) as follows:

`Counters.mo`:

``` motoko name=Counters
actor class Counter(init : Nat) {
  var count = init;

  public func inc() : async () { count += 1 };

  public func read() : async Nat { count };

  public func bump() : async Nat {
    count += 1;
    count;
  };
};
```

`CountToTen.mo`:

``` motoko include=Counters
import Counters "Counters";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

actor CountToTen {
  public func countToTen() : async () {
    let C : Counters.Counter = await Counters.Counter(1);
    while ((await C.read()) < 10) {
      Debug.print(Nat.toText(await C.read()));
      await C.inc();
    };
  }
};
await CountToTen.countToTen()
```

The call to `Counters.Counter(1)` installs a fresh counter on the network. Installation is asynchronous, so the caller must `await` the result.

The type annotation `: Counters.Counter` is redundant here. It’s included only to illustrate that the type of the actor class is available when required.

## Importing from another canister smart contract

In addition to the examples above that import Motoko modules, you can also import actors (and their shared functions) from canister smart constracts by using the `canister:` prefix in place of the `mo:` prefix.

:::note

Unlike a Motoko library, an imported canister can be implemented in any other Internet Computer language that emits Candid interfaces for its canister smart contracts (for instance Rust). It could even be an older or newer version of Motoko.

:::

For example, you might have a project that produces the following three canisters:

-   BigMap (implemented in Rust)

-   Connectd (implemented in Motoko)

-   LinkedUp (implemented in Motoko)

These three canisters are declared in the project’s `dfx.json` configuration file and compiled by running `dfx build`.

You can then use the following lines to import the `BigMap` and `Connectd` canisters as actors in the Motoko LinkedUp actor:

``` motoko no-repl
import BigMap "canister:BigMap";
import Connectd "canister:connectd";
```

When importing canisters, it is important to note that the type for the imported canister corresponds to a **Motoko actor** instead of a **Motoko module**. This distinction can affect how some data structures are typed.

For the imported canister actor, types are derived from the Candid file — the *project-name*.did file — for the canister rather than from Motoko itself.

The translation from Motoko actor type to Candid service type is mostly, but not entirely, one-to-one, and there are some distinct Motoko types that map to the same Candid type. For example, the Motoko `Nat32` and `Char` types both exported as Candid type `nat32`, but `nat32` is canonically imported as Motoko `Nat32`, not `Char`.

The type of an imported canister function, therefore, might differ from the type of the original Motoko code that implements it. For example, if the Motoko function had type `shared Nat32 -> async Char` in the implementation, its exported Candid type would be `(nat32) -> (nat32)` but the Motoko type imported from this Candid type will actually be the correct—but perhaps unexpected—type `shared Nat32 -> async Nat32`.

## Naming imported modules

Although the most common convention is to identify imported modules by the module name as illustrated in the examples above, there’s no requirement for you to do so. For example, you might want to use different names to avoid naming conflicts or to simplify the naming scheme.

The following examples illustrate different names you might use when importing the `List` base library module, avoiding a clash with another `List` library from a fictional `collections` package.

``` motoko no-repl
import List "mo:base/List:";
import Sequence "mo:collections/List";
import L "mo:base/List";
```
