# 13: Accepting cycles from a wallet

## Overview

When you are doing local development, you can use the default wallet in your project to send cycles and check your cycle balance. But what about the canisters that need to receive and use those cycles, e.g. to execute their functions and provide services to users?

This guide provides a simple example to illustrate how you might add the functions to receive cycles and check your cycle balance to the default template program.

This example consists of the following:

-   The `wallet_balance` function enables you to check the current cycle balance for the canister.

-   The `wallet_receive` function enables the program to accept cycles that are sent to the canister.

-   The `greet` function accepts a text argument and displays a greeting in a terminal.

-   The `owner` function returns the principal used by the message caller.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./dev-env.md).

## Create a new project

To create a new project directory for testing access control and switching user identities, open a terminal shell on your local computer, if you don’t already have one open.

Create a new project by running the following command:

```
dfx new cycles_hello
```

Navigate into your project directory by running the following command:

```
cd cycles_hello
```

## Modify the default program

For this guide, you are going to modify the template source code to include new functions for accepting cycles and checking the cycle balance.

Open the `src/cycles_hello_backend/main.mo` file in a text editor and delete the existing content.

Copy and paste this code into the file:

```
import Nat64 "mo:base/Nat64";
import Cycles "mo:base/ExperimentalCycles";

shared(msg) actor class HelloCycles (
   capacity: Nat
  ) {

  var balance = 0;

  // Return the current cycle balance
  public shared(msg) func wallet_balance() : async Nat {
    return balance;
  };

  // Return the cycles received up to the capacity allowed
  public func wallet_receive() : async { accepted: Nat64 } {
    let amount = Cycles.available();
    let limit : Nat = capacity - balance;
    let accepted =
      if (amount <= limit) amount
      else limit;
    let deposit = Cycles.accept(accepted);
    assert (deposit == accepted);
    balance += accepted;
    { accepted = Nat64.fromNat(accepted) };
  };

  // Return the greeting
  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  // Return the principal of the caller/user identity
  public shared(msg) func owner() : async Principal {
    let currentOwner = msg.caller;
    return currentOwner;
  };

};
```

Let’s take a look at a few key elements of this program:

-   The program imports a Motoko base library—`ExperimentalCycles`—that provides basic functions for working with cycles.

-   The program uses an `actor class` instead of a single actor so that it can have multiple actor instances to accept different cycle amounts up to a `capacity` for all instances.

-   The `capacity` is passed as an argument to the actor class.

-   The `msg.caller` identifies the principal associated with the call.

Save your changes and close the `main.mo` file to continue.

## Start the local canister execution environment

Before you can build the `cycles_hello` project, you need to connect to the canister execution environment running locally in your development environment, or you need to connect to a subnet that you can access.

To start the local canister execution environment, open a new terminal window or tab on your local computer.

Start the local canister execution environment on your machine by running the following command:

```
dfx start --clean --background
```

For this guide, we’re using the `--clean` option to start the local canister execution environment in a clean state.

This option removes any orphan background processes or canister identifiers that might disrupt normal operations. For example, if you forgot to issue a `dfx stop` when moving between projects, you might have a process running in the background or in another terminal. The `--clean` option ensures that you can start the local canister execution environment and continue to the next step without manually finding and terminating any running processes.

After the local canister execution environment completes its startup operations, you can continue to the next step.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment, you can register, build, and deploy your dapp locally.

Register, build, and deploy your dapp by running the following command in your project's directory:

```
dfx deploy --argument '(360000000000)' cycles_hello_backend
```

This example sets the `capacity` for the canister to 360_000_000_000 cycles. The `dfx deploy` command output then displays information about the operations it performs, including the identity associated with the wallet canister created for this local project and the wallet canister identifier.

For example:

```
Deploying: cycles_hello_backend
Creating a wallet canister on the local network.
The wallet canister on the "local" network for user "ic_admin" is "bnz7o-iuaaa-aaaaa-qaaaa-cai"
Creating canisters...
Creating canister cycles_hello_backend...
cycles_hello_backend canister created with canister id: bkyz2-fmaaa-aaaaa-qaaaq-cai
Building canisters...
Installing canisters...
Creating UI canister on the local network.
The UI canister on the "local" network is "bd3sg-teaaa-aaaaa-qaaba-cai"
Installing code for canister cycles_Hello_backend, with canister ID bkyz2-fmaaa-aaaaa-qaaaq-cai
Deployed canisters.
URLs:
Backend canister via Candid interface:
cycles_hello_backend: http://127.0.0.1:8080/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
```

## Test the dapp

After you have deployed the dapp on your local canister execution environment, you can experiment with the wallet functions and test your program by using `dfx canister call` commands.

Check the principal for the `default` user identity by running the following command:

```
dfx canister call cycles_hello_backend owner
```

The command displays output similar to the following for the current identity:

```
(principal "g3jww-sbmtm-gxsag-4mecu-72yc4-kef5v-euixq-og2kd-sav2v-p2sb3-pae")
```

If you haven’t made changes to the identity you were using to run the `dfx deploy` command, you should get the same principal by running the `dfx identity get-principal` command. This is important because you must be the owner of the wallet canister to perform certain tasks such as sending cycles or granting other **custodian** identities permission to send cycles.

Check the initial wallet cycle balance by running the following command:

```
dfx canister call cycles_hello_backend wallet_balance
```

You haven’t sent any cycles to the canister, so the command displays the following balance:

```
(0 : nat)
```

Send some cycles from your default wallet canister to the `cycles_hello_backend` canister using the canister principal by running a command similar to the following:

```
dfx canister call rwlgt-iiaaa-aaaaa-aaaaa-cai wallet_send '(record { canister = principal "rrkah-fqaaa-aaaaa-aaaaq-cai"; amount = (256000000000:nat64); } )'
```

Call the `wallet_balance` function to see that the `cycles_hello_backend` canister has the number of cycles you transferred, if you specified an amount under the allowed capacity, or the `capacity` you specified when you ran the `dfx deploy` command.

```
dfx canister call cycles_hello_backend wallet_balance
```

The command displays output similar to the following:

```
(256_000_000_000)
```

Call the `wallet_balance` function to see the number of cycles in your default wallet by running a command similar to the following:

```
dfx canister call rwlgt-iiaaa-aaaaa-aaaaa-cai wallet_balance
```

The command returns the balance for the wallet canister identifier you specified as a record using Candid format. For example, the command might display a record with an `amount` field (represented by the hash `3_573_748_184`) and a balance of 97,738,624,621,042 cycles like this:

```
(record { 3_573_748_184 = 97_738_624_621_042 })
```

For this simple guide, cycles are only consumed from the balance in the default wallet canister, not from the `cycles_hello` canister.

Call the `greet` function by running a command similar to the following:

```
dfx canister call cycles_hello_backend greet '("from DFINITY")'
```

Rerun the call to the `wallet_balance` function to see the number of cycles deducted from your default wallet:

```
dfx canister call rwlgt-iiaaa-aaaaa-aaaaa-cai wallet_balance
```

For example, you might a result similar to this:

```
(record { 3_573_748_184 = 97_638_622_179_500 })
```

## Resources

If you are looking for more information about working with cycles, check out the following related resources:

-   [dfx identity (command reference)](/references/cli-reference/dfx-identity.md).
-   [ExperimentalCycles (base module)](/motoko/main/base/ExperimentalCycles.md).
-   [Managing cycles (Motoko language reference)](/motoko/main/cycles.md).
-   [Tokens and cycles (overview)](/concepts/tokens-cycles.md).

## Next steps

In the next step, we'll cover [querying using an actor](define-an-actor.md).