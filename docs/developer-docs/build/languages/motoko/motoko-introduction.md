# Introduction

Motoko is a modern, general-purpose programming language you can use specifically to author [Internet Computer](../../../../concepts/what-is-IC.md) canister smart contracts. Although aimed squarely at the Internet Computer, its design is general enough to support future compilation to other targets.

## Approachability

Motoko is a modern language designed to be approachable for programmers who have some basic familiarity with modern object-oriented and/or functional programming idioms in either JavaScript, or another modern programming language, such as Rust, Swift, TypeScript, C#, or Java.

## Asynchronous messaging and type sound execution

Motoko permits modern programming idioms, including special programming abstractions for distributed applications (dapps). Each dapp consists of one or more *actors* that communicate solely by *asynchronous message passing*. The state of an actor is isolated from all other actors, supporting distribution. There is no way to share state between several actors. The actor-based programming abstractions of Motoko permit human-readable message-passing patterns, and they enforce that each network interaction obeys certain rules and avoids certain common mistakes.

Specifically, Motoko programs are *type sound* since Motoko includes a practical, modern type system that checks each one before it executes. The Motoko type system statically checks that each Motoko program will execute safely, without dynamic type errors, on all possible inputs. Consequently, entire classes of common programming pitfalls that are common in other languages, and web programming languages in particular, are ruled out. This includes null reference errors, mis-matched argument or result types, missing field errors and many others.

To execute, Motoko statically compiles to [WebAssembly](about-this-guide.md#webassembly), a portable binary format that abstracts cleanly over modern computer hardware, and thus permits its execution broadly on the Internet, and the [Internet Computer](../../../../concepts/what-is-IC.md).

## Each canister smart contract as an *actor*

Motoko provides an **actor-based** programming model to developers to express *services*, including those of canister smart contracts on the [Internet Computer](../../../../concepts/what-is-IC.md).

An actor is similar to an object, but is special in that its state is completely isolated, and all its interactions with the world are by *asynchronous* messaging.

All communication with and between actors involves passing messages asynchronously over the network using the Internet Computer’s messaging protocol. An actor’s messages are processed in sequence, so state modifications never admit race conditions (unless explicitly allowed by punctuating `await` expressions).

The Internet Computer ensures that each message that is sent receives a response. The response is either success with some value, or an error. An error can be the explicit rejection of the message by the receiving canister, a trap due to an illegal instruction such as division by zero, or a system error due to distribution or resource constraints. For example, a system error might be the transient or permanent unavailability of the receiver (either because the receiving actor is oversubscribed or has been deleted).

### Asynchronous actors

Like other *modern* programming languages, Motoko permits an ergonomic syntax for *asynchronous* communication among components.

In the case of Motoko, each communicating component is an actor.

As an example of *using* actors, perhaps as an actor ourselves, consider this three-line program:

``` motoko no-repl
let result1 = service1.computeAnswer(params);
let result2 = service2.computeAnswer(params);
finalStep(await result1, await result2)
```

We can summarize the program’s behavior with three steps:

1.  The program makes two requests (lines 1 and 2) to two distinct services, each implemented as a Motoko actor or canister smart contract implemented in some other language.

2.  The program waits for each result to be ready (line 3) using the keyword `await` on each result value.

3.  The program uses both results in the final step (line 3) by calling the `finalStep` function.

Generally-speaking, the services *interleave* their executions rather than wait for one another, since doing so reduces overall latency. However, if we try to reduce latency this way *without* special language support, such interleaving will quickly sacrifice clarity and simplicity.

Even in cases where there are *no* interleaving executions (for example, if there were only one call above, not two), the programming abstractions still permit clarity and simplicity, for the same reason. Namely, they signal to the compiler where to transform the program, freeing the programmer from contorting the program’s logic in order to interleave its execution with the underlying system’s message-passing loop.

Here, the program uses `await` in line 3 to express that interleaving behavior in a simple fashion, with human-readable syntax that is provided by Motoko.

In language settings that lack these abstractions, developers would not merely call these two functions directly, but would instead employ very advanced programming patterns, possibly registering developer-provided “callback functions” within system-provided “event handlers”. Each callback would handle an asynchronous event that arises when an answer is ready. This kind of systems-level programming is powerful, but very error-prone, since it decomposes a high-level data flow into low-level system events that communicate through shared state. Sometimes this style is necessary, but here it is not.

Our program instead eschews that more cumbersome programming style for this more natural, *direct* style, where each request resembles an ordinary function call. This simpler, stylized programming form has become increasingly popular for expressing practical systems that interact with an *external environment*, as most modern software does today. However, it requires special compiler and type-system support, as we discuss in more detail below.

### Support for *asynchronous* behavior

In an *asynchronous* computing setting, a program and its running environment are permitted to perform *internal computations* that occur *concurrently* with one another.

Specifically, asynchronous programs are ones where the program’s requests of its environment do not (necessarily) require the program to wait for the environment. In the meantime, the program is permitted to make internal progress within this environment while the environment proceeds to complete the request. In the example, above, the program issues the second request before waiting for the first request to complete.

Symmetrically, the environment’s requests of the program do not (necessarily) require the environment to wait for the program’s answer: the environment can make external progress while the answer is produced.

We do not show an example of this “notify” pattern above, since it uses callbacks (and *higher-order* functions and control flow) and is thus more complex.

### Syntactic forms `async` and `await`

To address the need for clarity and simplicity, Motoko adopts the increasingly-common program constructs `async` and `await`, which afford the programmer a *structured* language for describing potentially-complex asynchronous dependency graphs.

The [async](language-manual.md#async) syntax introduces futures. A future value represents a *promise* of a result *that will be delivered, asynchronously, sometime in the future* (not shown in the first example above). You’ll learn more about futures when we introduce actors in [Actors and async data](actors-async.md).

Here, we merely use the ones that arise from calling `service1.computeAnswer(params)` and `service2.computeAnswer(params)`.

The syntax `await` synchronizes on a future, and suspends computation until the future is completed by its producer. We see two uses of `await` in the example above, to obtain the results from two calls to services.

When the developer uses these keywords, the compiler transforms the program as necessary, often doing complex transformations to the program’s control- and data-flow that would be tedious to perform by hand in a purely synchronous language. Meanwhile, the type system of Motoko enforces certain correct usage patterns for these constructs, including that types flowing between consumers and producers always agree, and that the types of data sent among services are permitted to flow there, and do not (for example) contain [private mutable state](mutable-state.md).

### Types are static

Like other modern programming languages, Motoko permits each variable to carry the value of a function, object, or a primitive datum (for example, a string, word, or integer). Other [types of values](basic-concepts.md#intro-values) exist too, including records, tuples, and “tagged data” called *variants*.

Motoko enjoys the formal property of type safety, also known as *type soundness*. We often summarize this idea with the phrase: [Well-typed Motoko programs don’t go wrong](basic-concepts.md#type-soundness), meaning that the only operations that will be performed on data are those permitted by its static type.

For example, each variable in a Motoko program carries an associated *type*, and this type is known *statically*, before the program executes. Each use of each variable is checked by the compiler to prevent runtime type errors, including null reference errors, invalid field access and the like.

In this sense, Motoko types provide a form of *trustworthy, **compiler-verified** documentation* in the program source code.

As usual, dynamic testing can check properties that are beyond the reach of the Motoko type system. While modern, the Motoko type system is intentionally *not* “advanced” or particularly exotic. Rather, the type system of Motoko integrates standard concepts from modern, but well-understood, [modern type systems](about-this-guide.md#modern-type-systems) to provide an approachable, expressive yet safe language for programming general-purpose, distributed applications.
