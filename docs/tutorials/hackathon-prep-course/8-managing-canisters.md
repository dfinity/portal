# 8: Managing canisters

## Overview

Now that you have canisters deployed on the mainnet, it's important to learn how to manage and maintain those canisters. Basic canister management includes obtaining information about a canister, adding an identity as a controller of a canister, topping up a canister, starting and stopping a canister, and deleting a canister. 

## Obtaining a canister's ID

Each canister has a unique identifier that can be used to interact with the canister. These unique IDs can be used to access the canister's frontend or Candid UI in a web browser, such as when you accessed the frontend of your dapp in the previous tutorial. Having a canister's ID is also important for executing management functions of the canister, such as setting ownership for the canister.

To get the canister ID of the `backend` canister that's been deployed on the mainnet, use the command:

```sh
dfx canister id backend --network ic
```
If you want to get the canister ID for a locally deployed canister, simply omit the `--network ic` flag, such as:

```sh
dfx canister id backend
```
 
## Obtaining canister information

To obtain information about the canister, such as the canister's controller(s) and the Wasm module hash, use the command:

```sh
dfx canister info backend
```

## Adding an identity as a controller of a canister

To add another identity as an additional controller of the canister, first, create a new identity:

```sh
dfx identity new ControllerExample
```

Then, get the principal value for this new identity with the command:

```sh
dfx identity use ControllerExample
dfx identity get-principal
```

Then, use the `dfx canister update-settings` command to add the returned principal to be a controller of your `backend` canister, but first, you need to switch back to your previously created identity, since only existing controllers can add new controllers:

```sh
dfx identity use MyIdentity
```

Then, use the `dfx canister update-settings` command:

```sh
dfx canister update-settings backend --add-controller PRINCIPAL_ID
```


## Removing an identity as a controller of a canister

You can remove this principal with the command:

```sh
dfx canister update-settings backend --remove-controller PRINCIPAL_ID
```

Alternatively, you can use the `--set-controller` flag instead of the `--add-controller` flag. If any controllers are set using the `--set-controller` flag, any other existing controllers will be removed. For example, re-run the command above, but use the `--set-controller` flag instead:

```sh
dfx canister update-settings backend --set-controller PRINCIPAL_ID
```


## Viewing the running state of a canister

Once a canister has been deployed, it can receive and process requests from other canisters or end-users. When a canister is able to send requests and receive replies, the canister is in a **Running** state, which is the default state of a canister. If a canister needs to be temporarily or permanently stopped, such as before a canister is upgraded, it may be stopped to ensure proper message handling. Stopping a canister is also a requirement if the canister is going to be deleted. 

To check the current state of all canisters, you can use the command:

```sh
dfx canister status --network ic --all
```

Or, you can check the status of a single canister by specifying it's name, such as:

```sh
dfx canister status backend --network ic 
```

The output of the command will resemble the following:

```
Canister status call result for backend.
Status: Running
Controllers: lalyb-uhvmt-p7ubs-u5t7l-hce6v-lp7c5-dlmj5-wi2gc-depab-wtgi3-pae
Memory allocation: 0
Compute allocation: 0
Freezing threshold: 2_592_000
Memory Size: Nat(2363181)
Balance: 3_100_000_000_000 Cycles
Module hash: 0xf8680eb74022a1079012b7e9c644d1156580002a6126305791811533d3fd6f17
```

## Stopping a canister 

To stop a single canister, run the command:

```sh
dfx canister stop backend --network ic 
```

Or, to stop all canisters, use the command:

```sh
dfx canister stop --network ic --all
```


## Starting a canister

Then to start the canister again, run the command:

```sh
dfx canister start --network ic --all
```


## Checking the cycles balance of a canister

To check a canister's cycles balance, you must be the controller of the canister. The cycles balance can be seen in the output of the `dfx canister status` command, such as:

```sh
dfx canister status backend --network ic
```

The output will resemble the following, where the value `Balance` refers to the cycles balance:

```
Canister status call result for backend.
Status: Stopped
Controllers: lalyb-uhvmt-p7ubs-u5t7l-hce6v-lp7c5-dlmj5-wi2gc-depab-wtgi3-pae
Memory allocation: 0
Compute allocation: 0
Freezing threshold: 2_592_000
Memory Size: Nat(2363181)
Balance: 3_100_000_000_000 Cycles
Module hash: 0xf8680eb74022a1079012b7e9c644d1156580002a6126305791811533d3fd6f17
```


## Topping up a canister with cycles

Depositing cycles into a canister's cycles balance is known as 'topping up' the canister's balance. For production canisters, which are consistently using cycles over time to pay for the canister's resources, topping up the canister is required, routine maintenance. 

While you must be a canister's controller in order to view the cycles balance of the canister, anyone can top up a canister. 

There are a few ways to top up a canister:

- Using ICP in your account.
- Using cycles in your cycles wallet.
- Using the NNS dapp web UI. 
- Using a fiat option through [Cycle.express](https://cycle.express/).
- Using a third-party service such as CycleOps. For more information on using a third-party service for cycles management, please see [here](/docs/current/developer-docs/setup/cycles/cycles_management_services).

### Using ICP

If you currently have a balance of ICP tokens within your dfx ledger account ID, you can use the `dfx ledger top-up` command to automatically convert that ICP into cycles and deposit it into the specified canister, for example:

```sh
dfx ledger top-up backend --amount 2.7 --network ic
```

### Using a cycles wallet

If you already have converted some ICP into cycles and filled a cycles wallet, you can send cycles from that wallet to the canister with the `dfx canister deposit-cycles` command, such as:

```sh
dfx canister deposit-cycles 1000000 backend --network ic
```

## Getting cycles back from a canister

To withdraw cycles from a canister, the canister must be deleted. The cycles will be returned to the cycles wallet associated with the canister's controller principal. 

You can stop and delete the canister with the commands:

```sh
dfx canister stop backend --network ic
dfx canister delete backend --network ic
```

The output of the `dfx canister delete` command will return information regarding the cycles withdraw:

```
Beginning withdrawal of cycles to canister backend; on failure try --no-wallet --no-withdrawal.
Setting the controller to identity principal.
Installing temporary wallet in canister backend to enable transfer of cycles.
Attempting to transfer 3089393970000 cycles to canister jqylk-byaaa-aaaal-qbymq-cai.
Successfully withdrew 3089393970000 cycles.
Deleting canister backend, with canister_id jqylk-byaaa-aaaal-qbymq-cai
```

To confirm that the cycles were withdrawn properly, check your cycles wallet balance with `dfx wallet balance`. 


## Setting the canister's freezing threshold

A canister's freezing threshold is a value defined in seconds, which is used to calculate how many cycles a canister must retain in its cycles balance. This calculation is based off of the canister's memory consumption. The default freezing threshold value is `2_592_000s`, which corresponds to 30 days. 

The freezing threshold is important because if a canister runs out of cycles, it will be uninstalled. The freezing threshold protects it from deletion, since if the cycles balance dips below the threshold, the canister will stop processing any new requests; however, it will continue to reply to existing requests. 

To set a freezing threshold for the 'backend` canister, use the command:

```sh
dfx canister update-settings backend --freezing-threshold 3472000 
```

Then, you can confirm that this threshold has been set by running the `dfx canister status backend --network ic ` command again:

```
Canister status call result for backend.
Status: Stopped
Controllers: lalyb-uhvmt-p7ubs-u5t7l-hce6v-lp7c5-dlmj5-wi2gc-depab-wtgi3-pae
Memory allocation: 0
Compute allocation: 0
Freezing threshold: 3_472_000
Memory Size: Nat(2363181)
Balance: 3_100_000_000_000 Cycles
Module hash: 0xf8680eb74022a1079012b7e9c644d1156580002a6126305791811533d3fd6f17
```

The values returned in this output refer to the following:

- Status: The canister's [current status](https://github.com/dfinity/interface-spec/blob/master/spec/index.md#canister-lifecycle-canister-lifecycle), such as `Running`, `Stopping` or `Stopped`. 
- [Controllers](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#adding-an-identity-as-a-controller-of-a-canister): The principal IDs of the canister's configured controllers. Controllers are able to perform operations such as deploying or stopping a canister. 
- [Memory allocation](/docs/current/developer-docs/gas-cost): The current amount of memory allocated by the canister.
- [Compute allocation](/docs/current/developer-docs/gas-cost): The current amount of compute resources allocated by the canister.
- [Freezing threshold](/docs/current/tutorials/developer-journey/level-1/1.6-managing-canisters#setting-the-canisters-freezing-threshold): The cycles freezing threshold, defined in seconds, indicates when the IC estimates that the canister would be depleted of cycles before `freezing_threshold` seconds pass. This is estimated using the canister's current cost for storage and the canister's current size. 
- Memory size: The size of the memory used by the canister.
- Balance: The canister's current cycles balance. 
- Module hash: The canister's Wasm module hash. 

## Deleting a canister

To delete a single canister, first you need to stop the canister with the command:

```sh
dfx canister frontend --network ic stop 
```

Then you can run the command:

```sh
dfx canister delete frontend --network ic 
```

When a canister is deleted, the canister's code, state, and canister ID are removed. Canisters must be stopped before they can be deleted. Alternatively, all canisters for a project can be deleted with the commands:

```sh
dfx canister --network ic stop --all
dfx canister --network ic delete --all
```


## Next steps

- [9: Sample starter projects](9-sample-starter-projects.md).
