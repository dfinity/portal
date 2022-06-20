# Managing cycles

Usage of the Internet Computer is measured, and paid for, in *cycles*. The Internet Computer maintains a balance of cycles per canister smart contract. In addition, cycles can be transferred between canisters.

In Motoko programs targeting the Internet Computer, each actor represents an Internet Computer canister, and has an associated balance of cycles. The ownership of cycles can be transferred between actors. Cycles are selectively sent and received through messages, that is, shared function calls. A caller can choose to transfer cycles with a call, and a callee can choose to accept cycles that are made available by the caller. Unless explicitly instructed, no cycles are transferred by callers or accepted by callees.

Callees can accept all, some or none of the available cycles up to limit determined by their actor’s current balance. Any remaining cycles are refunded to the caller. If a call traps, all its accompanying cycles are automatically refunded to the caller, without loss.

In future, we may see Motoko adopt dedicated syntax and types to support safer programming with cycles. For now, we provide a temporary way to manage cycles through a low-level imperative API provided by the [ExperimentalCycles](../../../../references/motoko-ref/experimentalcycles.md) library in package `base`.

:::note

This library is subject to change and likely to be replaced by more high-level support for cycles in later versions of Motoko.

:::

## The `ExperimentalCycles` Library

The `ExperimentalCycles` library provides imperative operations for observing an actor’s current balance of cycles, transferring cycles and observing refunds.

The library provides the following operations:

``` motoko no-repl
func balance() : (amount : Nat)

func available() : (amount : Nat)

func accept(amount : Nat) : (accepted : Nat)

func add(amount : Nat) : ()

func refunded() : (amount : Nat)
```

Function `balance()` returns the actor’s current balance of cycles as `amount`. Function `balance()` is stateful and may return different values after calls to `accept(n)`, calling a function after `add`ing cycles, or resuming from await (reflecting a refund).

:::danger

Since cycles measure computational resources spent, the value of `balance()` generally decreases from one shared function call to the next.

:::

Function `available()`, returns the currently available `amount` of cycles. This is the amount received from the current caller, minus the cumulative amount `accept`ed so far by this call. On exit from the current shared function or `async` expression via `return` or `throw` any remaining available amount is automatically refunded to the caller.

Function `accept` transfers `amount` from `available()` to `balance()`. It returns the amount actually transferred, which may be less than requested, for example, if less is available, or if canister balance limits are reached.

Function `add(amount)` indicates the additional amount of cycles to be transferred in the next remote call, i.e. evaluation of a shared function call or `async` expression. Upon the call, but not before, the total amount of units `add`ed since the last call is deducted from `balance()`. If this total exceeds `balance()`, the caller traps, aborting the call.

:::note

the implicit register of added amounts, incremented on each `add`, is reset to zero on entry to a shared function, and after each shared function call or on resume from an await.

:::

Function `refunded()` reports the `amount` of cycles refunded in the last `await` of the current context, or zero if no await has occurred yet. Calling `refunded()` is solely informational and does not affect `balance()`. Instead, refunds are automatically added to the current balance, whether or not `refunded` is used to observe them.

### Example

To illustrate, we will now use the `ExperimentalCycles` library to implement a toy *piggy bank* for saving cycles.

Our piggy bank has an implicit owner, a `benefit` callback and a fixed `capacity`, all supplied at time of construction. The callback is used to transfer *withdrawn* amounts.

``` motoko name=PiggyBank
import Cycles "mo:base/ExperimentalCycles";

shared(msg) actor class PiggyBank(
  benefit : shared () -> async (),
  capacity: Nat
  ) {

  let owner = msg.caller;

  var savings = 0;

  public shared(msg) func getSavings() : async Nat {
    assert (msg.caller == owner);
    return savings;
  };

  public func deposit() : async () {
    let amount = Cycles.available();
    let limit : Nat = capacity - savings;
    let acceptable =
      if (amount <= limit) amount
      else limit;
    let accepted = Cycles.accept(acceptable);
    assert (accepted == acceptable);
    savings += acceptable;
  };

  public shared(msg) func withdraw(amount : Nat)
    : async () {
    assert (msg.caller == owner);
    assert (amount <= savings);
    Cycles.add(amount);
    await benefit();
    let refund = Cycles.refunded();
    savings -= amount - refund;
  };

}
```

The owner of the bank is identified with the (implicit) caller of constructor `PiggyBank()`, using the shared pattern, `shared(msg)`. Field `msg.caller` is a `Principal` and is stored in private variable `owner` (for future reference). See [Principals and caller identification](caller-id.md) for more explanation of this syntax.

The piggy bank is initially empty, with zero current `savings`.

Only calls from `owner` may:

-   query the current `savings` of the piggy bank (function `getSavings()`), or

-   withdraw amounts from the savings (function `withdraw(amount)`).

The restriction on the caller is enforced by the statements `assert (msg.caller ==
owner)`, whose failure causes the enclosing function to trap, without revealing the balance or moving any cycles.

Any caller may `deposit` an amount of cycles, provided the savings will not exceed `capacity`, breaking the piggy bank. Because the deposit function only accepts a portion of the available amount, a caller whose deposit exceeds the limit will receive an implicit refund of any unaccepted cycles. Refunds are automatic and ensured by the Internet Computer infrastructure.

Since transfer of cycles is one-directional (from caller to callee), retrieving cycles requires the use of an explicit callback (the `benefit` function, taken by the constructor as an argument). Here, `benefit` is called by the `withdraw` function, but only after authenticating the caller as `owner`. Invoking `benefit` in `withdraw` inverts the caller/caller relationship, allowing cycles to flow "upstream".

Note that the owner of the `PiggyBank` could, in fact, supply a callback that rewards a beneficiary distinct from `owner`.

Here’s how an owner, `Alice`, might use an instance of `PiggyBank`:

``` motoko include=PiggyBank
import Cycles = "mo:base/ExperimentalCycles";
import Lib = "PiggyBank";

actor Alice {

  public func test() : async () {

    Cycles.add(10_000_000_000_000);
    let porky = await Lib.PiggyBank(Alice.credit, 1_000_000_000);

    assert (0 == (await porky.getSavings()));

    Cycles.add(1_000_000);
    await porky.deposit();
    assert (1_000_000 == (await porky.getSavings()));

    await porky.withdraw(500_000);
    assert (500_000 == (await porky.getSavings()));

    await porky.withdraw(500_000);
    assert (0 == (await porky.getSavings()));

    Cycles.add(2_000_000_000);
    await porky.deposit();
    let refund = Cycles.refunded();
    assert (1_000_000_000 == refund);
    assert (1_000_000_000 == (await porky.getSavings()));

  };

  // Callback for accepting cycles from PiggyBank
  public func credit() : async () {
    let available = Cycles.available();
    let accepted = Cycles.accept(available);
    assert (accepted == available);
  }

}
```

Let’s dissect `Alice`'s code.

`Alice` imports the `PiggyBank` actor class as a library, so she can create a new `PiggyBank` actor on demand.

Most of the action occurs in `Alice`'s `test()` function:

Alice dedicates `10_000_000_000_000` of her own cycles for running the piggy bank, by calling `Cycles.add(10_000_000_000_000)` just before creating a new instance, `porky`, of the `PiggyBank`, passing callback `Alice.credit` and capacity (`1_000_000_000`). Passing `Alice.credit` nominates `Alice` as the beneficiary of withdrawals. The `10_000_000_000_000` cycles, minus a small installation fee, are credited to `porky`'s balance without any further action by `porky` initialization code. You can think of this as an electric piggy bank, that consumes its own resources as its used. Since constructing a `PiggyBank` is asynchronous, `Alice` needs to `await` the result.

After creating `porky`, she first verifies that the `porky.getSavings()` is zero using an `assert`.

`Alice` dedicates `1_000_000` of her cycles (`Cycles.add(1_000_000)`) to transfer to `porky` with the next call to `porky.deposit()`. The cycles are only consumed from Alice’s balance if the call to `porky.deposit()` succeeds (which it should).

`Alice` now withdraws half the amount, `500_000`, and verifies that `porky`'s savings have halved. `Alice` eventually receives the cycles via a callback to `Alice.credit()`, initiated in `porky.withdraw()`. Note the received cycles are precisely the cycles `add`ed in `porky.withdraw()`, before it invokes its `benefit` callback, that is, `Alice.credit`.

`Alice` withdraws another `500_000` cycles to wipe out her savings.

`Alice` vainly tries to deposit `2_000_000_000` cycles into `porky` but this exceeds `porky`'s capacity by half, so `porky` accepts `1_000_000_000` and refunds the remaining `1_000_000_000` to `Alice`. `Alice` verifies the refund amount (`Cycles.refunded()`), which has (already) been automatically restored to her balance. She also verifies `porky`'s adjusted savings.

`Alice`'s `credit()` function simply accepts all available cycles by calling `Cycles.accept(available)`, checking the actually `accepted` amount with an assert.

:::note

For this example, Alice is using her (readily available) cycles, that she already owns.

:::

:::danger

Because `porky` consumes cycles in its operation, it is possible for `porky` to spend some or even all of Alice’s cycle savings before she has a chance to retrieve them.

:::
