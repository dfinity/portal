# Interact with the ICP ledger

## Overview

## Interact with ICP ledger from the command line

`dfx` provides a convenience command to interact with the ICP ledger canister and related functionality. You can find the documentation [here](https://internetcomputer.org/docs/current/references/cli-reference/dfx-ledger.md) or just enter the following command into your console:

``` bash
dfx ledger --help
```

It's worth checking out the `--help` flag of the subcommands as well.

Currently, `dfx` exposes only a subset of the ICP ledger functionality, namely `balance` and `transfer`.
Both commands provide a flag to specify a ledger canister id (`--ledger-canister-id`). This simplifies interacting with a local ledger deployment or other tokens that provide the same interface.

### Balance

Get the ICP balance of a specific account:

``` bash
dfx ledger --network ic balance <account-id>
```

The `<account-id>` is encoded as a hex string. You can print the account id of the current `dfx` identity by running:

```bash
dfx ledger account-id
```

In many cases you want to check the main account balance of a specific principal. You can combine the `balance` command with the `account-id` command, while specifying an `--of-principal` argument to yield this helpful command:

``` bash
dfx ledger --network ic balance $(dfx ledger account-id --of-principal <principal-id>)
```

### Transfer

The transfer function can be used to transfer ICP from your account to another. 

``` bash
dfx ledger --network ic transfer --amount <amount> --memo <memo> <receiver-account-id>
```

<!-- ## Interact with ICP using Candid UI -->

## Interact with ICP ledger from your web application

In order to simplify working with ICP ledger from JavaScript applications, you can use the [nns-js library](https://github.com/dfinity/nns-js).

## Interact with ICP from a canister

The [ICP transfer example](/docs/current/samples/token-transfer) provides a good starting point for interacting with ICP  ledger from a canister. The example showcases the usage of `balance` and `transfer` in Motoko and Rust.

### Receiving ICP

If you want a canister to receive payment in ICP you need to make sure that the canister knows about the payment, because a transfer only involves the sender and the ledger canister.

There are currently two main patterns to achieve this. Furthermore, there is a [chartered working group](https://forum.dfinity.org/t/announcing-technical-working-groups/11781) on Ledger & Tokenization which is focused on defining a standard ledger/token interface as well payment flows.

#### Direct notification by sender

In this pattern the sender notifies the receiver about the payment. However, the receiver needs to verify the payment by using the [`query_blocks` interface](/docs/current/references/ledger#_getting_ledger_blocks) of the ledger.
The following diagram shows a simplified illustration of this pattern:

```plantuml
    participant Sender
    participant "ICP Ledger"
    participant Receiver
    
    Sender -> "ICP Ledger": transfer()
    "ICP Ledger" --> Sender: blockNumber
    Sender -> Receiver: notify(blockNumber)
    Receiver -> "ICP Ledger": query_blocks(blockNumber)
    "ICP Ledger" --> Receiver: block
    Receiver -> Receiver: verify payment
```


#### Notification by ICP ledger (currently disabled)

In this pattern the ledger itself notifies the receiver. Thereby, the receiver can trust the notification immediately. However, this flow is currently disabled because the call to the receiver is not yet implemented as a one-way call. 

```plantuml
    participant Sender
    participant "ICP Ledger"
    participant Receiver
    
    Sender -> "ICP Ledger": transfer()
    "ICP Ledger" --> Sender: blockNumber
    Sender -> "ICP Ledger": notify(blockNumber, receiver)
    "ICP Ledger" -> "Receiver": transaction_notification(details)
```
