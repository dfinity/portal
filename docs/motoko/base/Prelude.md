# Prelude
General utilities

This prelude file proposes standard library features that _may_
belong in the _language_ (compiler-internal) prelude sometime, after
some further experience and discussion.  Until then, they live here.

## Function `nyi`
``` motoko no-repl
func nyi() : None
```

Not yet implemented

Mark incomplete code with the `nyi` and `xxx` functions.

Each have calls are well-typed in all typing contexts, which
trap in all execution contexts.

## Function `xxx`
``` motoko no-repl
func xxx() : None
```


## Function `unreachable`
``` motoko no-repl
func unreachable() : None
```

Mark unreachable code with the `unreachable` function.

Calls are well-typed in all typing contexts, and they
trap in all execution contexts.
