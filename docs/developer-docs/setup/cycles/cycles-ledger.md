# Cycles ledger

## Overview

When developing and deploying canisters on the Internet Computer, developers need to have **cycles** to pay for the resources used by their canisters. The **cycles ledger** canister has been developed as an alternative to the **cycles wallet** canister for cycles management. 

The biggest difference between the cycles ledger and cycles wallet is that the cycles ledger is a single global ledger canister, whereas the cycles wallet canister must be deployed locally to be used. Additionally, the cycles wallet has some downsides that the cycles ledger remedies. Some of these are:

- Cycles wallets are a complex solution to associate cycles with principal IDs.
- Cycles wallets consume cycles themselves, meaning developers need to pay cycles to store cycles.
- Since the cycles wallet canister must be deployed locally, if a cycles wallet canister ID is lost, the cycles in that cycles wallet canister are also lost. 

In short, the cycles ledger simplifies cycle management by providing the ability for principal IDs to hold cycles. 

The cycles ledger complies with the ICRC-2 standard. In addition to standard ledger functionality, the cycles ledger also interacts with the NNS canisters and user canisters to provide cycles ledger-specific functions, such as:

- Accepting incoming cycles sent from other canisters.
- Sending cycles to other canisters.
- Creating new canisters using cycles.

:::caution
It is important to note that the cycles ledger does not provide the ability to make arbitrary calls to other canisters with cycles, while the cycles wallet can. This is because open call contexts may cause complications with the cycles ledger. 

If you need to make arbitrary calls to other canisters with cycles, a cycles wallet can be used as before. The cycles ledger can be used to load the cycles wallet with cycles.
:::

## Obtaining ICP

To use the cycles ledger, first you need ICP tokens. There are a few different ways to obtain ICP tokens, such as:

- Purchasing ICP tokens directly through an exchange that lists ICP tokens available for trade. To see all available places to purchase ICP tokens, check out this [page](https://coinmarketcap.com/currencies/internet-computer/markets/).
- Trading other tokens for ICP on a decentralized exchange.
- Receiving tokens as rewards for participating in the governance of the Internet Computer.
- Receiving a grant of tokens through the Internet Computer Association (ICA) or the DFINITY Foundation.
- Receiving tokens as remuneration for providing computing capacity as a node provider.

To obtain ICP, you also need to have an account to transfer those tokens into. To get your account ID, first determine which dfx identity you are using with the command:

```
dfx identity whoami
```

If you're using the default identity, you should create a new identity with the command:

```
dfx identity new IDENTITY_NAME
```

Replace `IDENTITY_NAME` with the an identity name of your choice, such as 'MyIdentity`.

Your identity's seed phrase will be returned. Be sure to save this in a secure location. Then, set this identity to be used by the current session:

```
dfx identity use IDENTITY_NAME
```

Then, to get the account ID for this identity, use the command:

```
dfx ledger account-id
```

This will display your account number on the ICP ledger. It looks similar to this:

```
e213184a548871a47fb526f3cba24e2ee2fbbc8129c4ab497ef2ce535130a0a4
```

Then, to return the principal ID associated with your identity, run the command:

```
dfx identity get-principal
```

This principal ID will be used when others want to send you cycles using the cycles ledger. 

## Using the cycles ledger

### Checking your cycles balance

To check the cycles balance of your user principal ID, use the command:

```
dfx cycles balance
```

### Converting ICP to cycles

To convert ICP into cycles using the cycles ledger, use the command:

```
dfx cycles convert AMOUNT
```

Replace `AMOUNT` with the number of ICP to convert into cycles, such as `2.7`. Alternatively, the amount can be specified in terms of ICP and e8s (where `100,000,000 e8s = 1 ICP`) using the options `--icp` and `--e8s`. For example, `2.7` would be expressed as `--icp 2 --e8s 70_000_000`.

### Transferring cycles to a principal

To transfer cycles to another principal ID, use the command:

```
dfx cycles transfer AMOUNT PRINCIPAL_ID (--subaccount [SUBACCOUNT])
```

Replace `AMOUNT` with the number of cycles, such as `34000000`, and `PRINCIPAL_ID` with the principal ID you'd like to transfer the cycles to, such as `tsqwz-udeik-5migd-ehrev-pvoqv-szx2g-akh5s-fkyqc-zy6q7-snav6-uqe`.

### Topping up a canister

To transfer cycles into a canister to top it up, use the command:

```
dfx cycles transfer `AMOUNT` --top-up `CANISTER_ID`
```

Replace `AMOUNT` with the number of cycles, such as `34000000`, and `CANISTER_ID` with the canister ID you'd like to transfer the cycles to, such as `gastn-uqaaa-aaaae-aaafq-cai`.

### Creating a canister using cycles

New canisters can be created using the cycles ledger by using the `dfx canister create` and `dfx deploy` commands.

Both of these commands have the following options and syntax to create a new canister:

```
dfx canister create CANISTER_NAME
dfx deploy CANISTER_NAME
```

Replace `CANISTER_NAME` with a name for the new canister.

With these two commands, there are two **optional** flags that can be used:

- `dfx create canister CANISTER_NAME --next-to CANISTER_ID:` The new canister will be installed on the same subnet as the canister provided.
- `dfx create canister CANISTER_NAME --subnet SUBNET_ID`: The new canister will be installed on the given subnet.

If neither flag is used, the canister will be created on a random subnet using the user principal’s cycles.

### Using ICP instead of cycles for canister creation

Alternatively, if you want to use ICP instead of cycles for creating a canister, you can use the flag `--using-icp`, which will charge your principal ICP instead of cycles such as:

```
dfx create canister CANISTER_NAME --using-icp
```

Or you can set a specific amount of ICP with the option `--using-icp-amount AMOUNT`, such as:

```
dfx create canister CANISTER_NAME --using-icp-amount 2.7
```


## Fees

Certain functions of the cycle ledger incur a fee. The full breakdown of fees can be found below:

- To transfer cycles between different principal IDs using the cycles ledger, the transfer fee is 100m cycles per transaction.
- To send cycles from the cycles ledger to another canister, the fee is 100m cycles.  
- To create a canister, the fee is the transfer fee (100m cycles), plus the canister creation fee, which scales [linearly with the size of the subnet](https://internetcomputer.org/docs/current/developer-docs/gas-cost) that the canister is created on. For example, if the canister is created on a 13-node subnet, the fee is 100B cycles. This means the total fee will be 100,100,000,000 cycles. 
