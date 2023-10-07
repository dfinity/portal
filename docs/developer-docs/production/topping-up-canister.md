# Topping up & refilling a canister with cycles

## Overview 

When a canister needs to have additional cycles deposited into it to pay for the canister's used resources, this process is known as 'topping up' the canister. Topping up canisters, especially production canisters that consistently use cycles, is routine maintenance. 

## Basic rules 

Anyone can top up any canister deployed to the Internet Computer; you do not need to be the author or controller of the canister.

There are a few different ways to top up canisters, such as via `dfx`, [NNS frontend dapp](https://nns.ic0.app), or [third-party service](/docs/developer-docs/setup/cycles/cycles_management_services.md)(e.g. https://cycleops.dev). All one needs is the canister's principal.

In the following examples, we will try to top up canister `jqylk-byaaa-aaaal-qbymq-cai`  with a million cycles (1000000). These instructions can work for any canister principal or any cycles amount.

### Number of cycles
For ease of use, you can copy/paste the cycles amounts below:

| Cycles            | Number        |
| -----------       | -----------   |
| 1 million         | 1000000         |
| 10 million        | 10000000         |
| 100 million       | 100000000         |
| 1 billion         | 1000000000         |
| 10 billion        | 10000000000         |
| 100 billion       | 100000000000         |
| 1 trillion        | 1000000000000         |
| 10 trillion       | 10000000000000         |
| 100 trillion      | 100000000000000         |

### Checking the cycles balance of a canister

Canister cycles balances are not exposed publicly by default; you can only see them if you are the controller of a canister. Using `jqylk-byaaa-aaaal-qbymq-cai` as an example, you can query it by calling:

```bash
dfx canister --network ic status jqylk-byaaa-aaaal-qbymq-cai
```

Output will look like this:

```bash
Canister status call result for jqylk-byaaa-aaaal-qbymq-cai.
Status: Running
Controllers: mto6d-zfnut-rlsxr-ogdeg-apo53-evpob-ljgnp-ma2x3-6yf3b-t4rd5-qqe t5j57-vyaaa-aaaal-qatsq-cai
Memory allocation: 0
Compute allocation: 0
Freezing threshold: 2_592_000
Memory Size: Nat(2471918)
Balance: 9_811_813_913_485 Cycles
Module hash: 0xe7866e1949e3688a78d8d29bd63e1c13cd6bfb8fbe29444fa606a20e0b1e33f0
```

### Option 1: If you have ICP on your account

If you have ICP on the account associated with a `dfx` identity, you can tell the ledger canister to take some of that ICP, convert it to cycles, and give it to a canister of your choice: `dfx ledger [OPTIONS] top-up --amount <AMOUNT> <DESTINATION>`

```
dfx ledger --network ic top-up --amount 0.1 jqylk-byaaa-aaaal-qbymq-cai
```

```bash
dfx ledger account-id
dfx ledger --network ic balance
dfx ledger --network ic top-up --amount 0.1 jqylk-byaaa-aaaal-qbymq-cai
```

-   The `dfx ledger account-id` returns the ledger account id of the current `dfx` identity used.
-   `--network ic` tells `dfx` to use the mainnet IC as the network (not anything local for example).
-   The `dfx ledger --network ic balance` command checks how much balance is on the `account` associated with the current `dfx` identity used.
-   `top-up --amount 0.1 jqylk-byaaa-aaaal-qbymq-cai` command converts 0.1 ICP into cycles and uses them to refill canister `jqylk-byaaa-aaaal-qbymq-cai`.


### Option 2: If you have cycles on your cycles wallet

If you have a cycles wallet you control via dfx, you can send cycles from your cycles wallet to a canister of your choice: `dfx canister deposit-cycles <AMOUNT> <DESTINATION>`.

```bash
dfx wallet --network ic balance
dfx canister --network ic deposit-cycles 1000000 jqylk-byaaa-aaaal-qbymq-cai 
```

-   The `wallet --network ic balance` checks the cycles balance of your cycles wallet on the mainnet.
-   The `canister deposit-cycles` takes cycles from your cycles wallet and gives them to the canister of your choice.

### Special case: topping up another cycles wallet

Cycles wallets are canisters like any other, so you can top them up as well. If you have a cycles wallet you control via dfx, there is another option as well for sending cycles from your cycles wallet to a canister of your choice: `dfx wallet send [OPTIONS] <DESTINATION> <AMOUNT>`.

In this example, we assume we are sending cycles to a cycles wallet with principal `dfds-sddds-aaaal-qbsms-cai`.

```bash
dfx wallet --network ic balance
dfx wallet --network ic send 1000000 dfds-sddds-aaaal-qbsms-cai 
```

-   The `wallet --network ic balance` checks the cycles balance of your cycles wallet on the mainnet.
-   The `wallet --network ic send 1000000 dfds-sddds-aaaal-qbsms-cai` takes 1000000 cycles from your cycles wallet and sends them to cycles wallet `dfds-sddds-aaaal-qbsms-cai`.

## Topping up a canister with the NNS frontend dapp

You can also top up any canister via the [NNS frontend dapp](https://nns.ic0.app):

- #### Step 1: Navigate to the **My Canisters** section of the dapp.
- #### Step 2: Click **Link Canister**.
- #### Step 3: Add a canister principal (it is not necessary for the user to actually control said canister).
- #### Step 4: Once canister is added, click on that canister.
- #### Step 5: Click `add cycles` to add cycles using the ICP in your NNS frontend dapp.
