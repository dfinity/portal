# Topping up & Refilling a Canister with Cycles

A common pattern for developer workflow is to refill canisters with cycles so they can continue to operate as intended.

## Basic Rules 

1. Anyone can top up any canister deployed to the Internet Computer (does not need to be the author or controller).
2. One can top up a canister via `dfx`, [NNS Frontend dapp](https://nns.ic0.app), or third-party service (e.g. https://cycleops.dev). All one needs is the canister's principal.
3. There are a few ways to top up canisters so this article goes through each one.


## Topping up a canister with `dfx`

In the following examples, we will try to top up canister `jqylk-byaaa-aaaal-qbymq-cai` from the [first tutorial](../../tutorials/deploy_sample_app.md) with a million cycles (1000000). These instructions can work for any canister principal or any cycles amount.


### Number of cycles
For ease of use, you can copy/paste the cycles amounts below:

| Cycles            | Number        |
| -----------       | -----------   |
| 1 million         | 1000000         |
| 10 million        | 10000000         |
| 100 million       | 100000000         |
| 1 billion         | 1000000000         |
| 10 billion        | 1000000000         |
| 100 billion        | 10000000000         |
| 1 trillion         | 100000000000         |
| 10 trillion        | 1000000000000         |
| 100 trillion        | 10000000000000         |

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

If you have ICP on the account associated with a `dfx` identity, you can tell the Ledger Canister to take some of that ICP, convert it to cycles, and give it to a canister of your choice: `dfx ledger [OPTIONS] top-up --amount <AMOUNT> <DESTINATION>`

`dfx ledger --network ic top-up --amount 0.1 jqylk-byaaa-aaaal-qbymq-cai`

```bash
dfx ledger account-id
dfx ledger --network ic balance
dfx ledger --network ic top-up --amount 0.1 jqylk-byaaa-aaaal-qbymq-cai
```

-   The `dfx ledger account-id` returns the `account` id of the current `dfx` identity used
-   `--network ic` tells `dfx` to use the mainnet IC as the network (not anything local for example)
-   The `dfx ledger --network ic balance` command checks how much balance is on the `account` associated with the current `dfx` identity used
-   `top-up --amount 0.1 jqylk-byaaa-aaaal-qbymq-cai` command converts 0.1 ICP into cycles and uses them to refill canister `jqylk-byaaa-aaaal-qbymq-cai`.


### Option 2: If you have cycles on your cycles wallet

If you have a cycles wallet you control via dfx, you can send cycles from your cycles wallet to a canister of your choice: `dfx canister deposit-cycles <AMOUNT> <DESTINATION>`.

```bash
dfx wallet --network ic balance
dfx canister deposit-cycles 1000000 jqylk-byaaa-aaaal-qbymq-cai 
```

-   The `wallet --network ic balance` checks the cycles balance of your cycles wallet on mainnet
-   The `canister deposit-cycles` takes cycles from your cycles wallet and gives them to the canister of your choice


I want top up canister `jqylk-byaaa-aaaal-qbymq-cai` with a million cycles (1000000).

### Special Case: topping up another cycles wallet

Cycles wallets are canisters like any other, so you can top them up as well. If you have a cycles wallet you control via dfx, there is another option as well for sending cycles from your cycles wallet to a canister of your choice: `dfx wallet send [OPTIONS] <DESTINATION> <AMOUNT>`.

```bash
dfx wallet --network ic balance
dfx wallet --network ic send 1000000 jqylk-byaaa-aaaal-qbymq-cai 
```

-   The `wallet --network ic balance` checks the cycles balance of your cycles wallet on mainnet
-   The `canister deposit-cycles` takes cycles from your cycles wallet and gives them to the canister of your choice


I want top up canister `jqylk-byaaa-aaaal-qbymq-cai` with a million cycles (1000000).

## Topping up a canister with the NNS Frontend dapp

You can also top up any canister via the [NNS Frontend dapp](https://nns.ic0.app):

1. Navigate to the "My Canisters" section of the dapp
2. Click "Link Canister" 
3. Add a canister principal (It is not necessary for the user to actually control said canister)
4. Once canister is added, click on that canister
5. Click `add cycles` to add cycles using the ICP in your NNS frontend dapp