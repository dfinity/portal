# Prelude

General utilities

This prelude file proposes standard library features that *may* belong in the *language* (compiler-internal) prelude sometime, after some further experience and discussion. Until then, they live here.

## nyi

``` motoko
func nyi() : None
```

Not yet implemented

Mark incomplete code with the `nyi` and `xxx` functions.

Each have calls are well-typed in all typing contexts, which trap in all execution contexts.

## xxx

``` motoko
func xxx() : None
```

## unreachable

``` motoko
func unreachable() : None
```

Mark unreachable code with the `unreachable` function.

Calls are well-typed in all typing contexts, and they trap in all execution contexts.
