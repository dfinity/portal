# 6: Upgrading canisters

## Overview
Upgrading a canister allows you to preserve the existing state of a deployed canister while making changes to the code. This functionality is part of a key feature of the Internet Computer which allows canister smart contract states to persist using Wasm memory and globals instead of a traditional database. This state of preservation is referred to as **orthogonal persistence**.

Motoko provides high-level support for preserving a canister's state using the Internet Computer's stable memory through a feature known as stable storage. This feature is designed to accommodate changes to both the Motoko compiler and the application data. 

Stable storage is a Motoko-specific feature that uses the IC's stable memory data persistence feature. Stable memory is used to store data that persists across canister upgrades. The maximum data storage size of stable memory is 96GiB if the subnet can accomodate it. In comparison, heap storage refers to the regular Wasm data storage for a canister. Heap storage is not persisted across canister upgrades and is limited to 4GiB. 

Consider the following example: you have a dapp that manages professional profiles and social connections. To add a new feature to the dapp, you need to be able to update the canister code without losing any of the previously stored data. A canister upgrade enables you to update existing canister identifiers with program changes without losing the program state.

To preserve state when you are upgrading a canister written in Motoko, be sure to use the stable keyword to identify the variables you want to preserve. For more information about preserving variable state in Motoko, see [stable variables and upgrade methods](https://internetcomputer.org/docs/current/motoko/main/upgrades). 

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./dev-env.md).

## Verify upgrade compatibility

To verify the upgrade compatibility of your canister prior to upgrading, please review [this documentation](../../../motoko/main/compatibility).

## Upgrading a canister

To upgrade a canister, first open a new terminal and navigate to your project directory.

Then, start the local canister execution environment with the command:

```
dfx start --clean --background
```

:::info
If you were registering canisters to run on a remote execution environment, e.g. the IC blockchain, you would include the --network command-line option to perform tasks on the environment specified under this parameter.
:::


Next, obtain the canister identifier of the canister(s) you'd like to upgrade. To do so, the following command can be used:

```
dfx canister id [canister-name]
```

Then, make any changes to the canister's code that you'd like to be included in the update.

:::info
Note that your program must identify the variables for which to maintain state by using the stable keyword in the variable declaration.

For more information about declaring stable variables, see the [declaring stable variables section](https://internetcomputer.org/docs/current/motoko/main/upgrades#declaring-stable-variables).
:::


To upgrade all canisters, the following command can be used:

```
dfx canister install --all --mode upgrade
```

To upgrade a single canister, use the command:

```
dfx canister install [canister-id] --mode upgrade
```

## Next steps

Next, let's take a look at [inter-canister calls](intercanister-calls.md).
