# Interact with the ICP ledger




## Interact with ICP from the command line

Dfx provides a convenience command to interact with the ICP ledger canister and related functionality. You can find the documentation [here](https://internetcomputer.org/docs/current/references/cli-reference/dfx-ledger/) or just enter the following command into your console:

``` bash
dfx ledger --help
```

It's worth checking out the `--help` flag of the subcommands as well.

Currently, dfx exposes only a subset of the ICP ledger functionality, namely `balance` and `transfer`.
Both commands provide a flag to specify a ledger canister id (`--ledger-canister-id`). This simplifies interacting with a local ledger deployment or other tokens that provide the same interface.

#### Balance

Get the ICP balance of a specific account:
``` bash
dfx ledger --network ic balance <account-id>
```
The `<account-id>` is encoded as a hex string.
In many cases you want to check the main account balance of a specific principal. You can use the following command for this:

``` bash
dfx ledger --network ic balance $(dfx ledger account-id --of-principal <principal-id>)
```

The balance command 

#### Transfer

The transfer function can be used to transfer ICP from your account to another. 

``` bash
dfx ledger --network ic transfer --amount <amount> --memo <memo> <receiver-account-id>
```


<!-- ## Interact with ICP using Candid UI -->

## Interact with ICP from your web application

## Interact with ICP from a canister

The ICP transfer example provides a good starting point for interacting with ICP from a canister.

