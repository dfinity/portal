# Principals and caller identification

Motoko’s shared functions support a simple form of caller identification that allows you to inspect the Internet Computer **principal** associated with the caller of a function. The principal associated with a call is a value that identifies a unique user or canister smart contract.

You can use the **principal** associated with the caller of a function to implement a basic form of *access-control* in your program.

In Motoko, the `shared` keyword is used to declare a shared function. The shared function can also declare an optional parameter of type `{caller : Principal}`.

To illustrate how to access the caller of a shared function, consider the following:

``` motoko
shared(msg) func inc() : async () {
  // ... msg.caller ...
}
```

In this example, the shared function `inc()` specifies a `msg` parameter, a record, and the `msg.caller` accesses the principal field of `msg`.

The calls to the `inc()` function do not change — at each call site, the caller’s principal is provided by the system, not the user — so the principal cannot be forged or spoofed by a malicious user.

To access the caller of an actor class constructor, you use the same (optional) syntax on the actor class declaration. For example:

``` motoko
shared(msg) actor class Counter(init : Nat) {
  // ... msg.caller ...
}
```

To extend this example, assume you want to restrict the `Counter` actor so it can only be modified by the installer of the `Counter`. To do this, you can record the principal that installed the actor by binding it to an `owner` variable. You can then check that the caller of each method is equal to `owner` like this:

``` motoko
shared(msg) actor class Counter(init : Nat) {

  let owner = msg.caller;

  var count = init;

  public shared(msg) func inc() : async () {
    assert (owner == msg.caller);
    count += 1;
  };

  public func read() : async Nat {
    count
  };

  public shared(msg) func bump() : async Nat {
    assert (owner == msg.caller);
    count := 1;
    count;
  };
}
```

In this example, the `assert (owner == msg.caller)` expression causes the functions `inc()` and `bump()` to trap if the call is unauthorized, preventing any modification of the `count` variable while the `read()` function permits any caller.

The argument to `shared` is just a pattern, so, if you prefer, you can also rewrite the above to use pattern matching:

``` motoko
shared({caller = owner}) actor class Counter(init : Nat) {

  var count : Nat = init;

  public shared({caller}) func inc() : async () {
    assert (owner == caller);
    count += 1;
  };

  // ...
}
```

:::note

Simple actor declarations do not let you access their installer. If you need access to the installer of an actor, rewrite the actor declaration as a zero-argument actor class instead.

:::

Principals support equality, ordering, and hashing, so you can efficiently store principals in containers, for example, to maintain an allow or deny list. More operations on principals are available in [Principal](../../../../references/motoko-ref/principal.md) base library.
