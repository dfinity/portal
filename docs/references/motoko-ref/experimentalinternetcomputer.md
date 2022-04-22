# ExperimentalInternetComputer

Low-level interface to the Internet Computer.

**WARNING:** This low-level API is **experimental** and likely to change or even disappear.

## call

``` motoko
let call : (canister : Principal, name : Text, data : Blob) -> async (reply : Blob)
```

Calls `canister`'s update or query function, `name`, with the binary contents of `data` as IC argument. Returns the response to the call, an IC *reply* or *reject*, as a Motoko future:

-   The message data of an IC reply determines the binary contents of `reply`.

-   The error code and textual message data of an IC reject determines the future’s `Error` value.

Note: `call` is an asynchronous function and can only be applied in an asynchronous context.
