# The European subnet

## Overview

The 'European' type subnet indicates that the subnet is comprised of only node machines located in the European geographic region. This type of subnet allows for developers and enterprises to build applications that require a GDPR-aligned infrastructure and leverage blockchain decentralization with regional data sovereignty needs.

:::caution
The European subnet enables applications to be GDPR-compliant, but developers and enterprises must take further measures to ensure that their applications meet all GDPR requirements.
:::

## Using a European subnet

To find a list of all subnet types using dfx, the `dfx ledger` command can be used with the `show-subnet-types` argument:

```
dfx ledger --network ic show-subnet-types
```

This should return the output:

```
["european", "fiduciary"]
```

## Creating developer identity for the European subnet

This is an optional step; it is not required to create a new separate identity in order to use the European subnet.

To create a new identity, use the `dfx identity new` command:

```
dfx identity new ic-european
```

Then, to use this identity, run the `dfx identity use` command:

```
dfx identity use ic-european
```

## Using a developer identity on the European subnet

To use this identity as a controller of a canister, get the identity's principal with the command:

```
dfx identity get-principal
```

Save this principal ID to be used as the `CONTROLLER` value in a future step.

You can check the current balance for that principal by running the command:

```
dfx ledger --network=ic balance
```

To top up your principal's balance, you can send cycles to the principal using the [NNS dapp](https://nns.ic0.app/wallet/), or convert ICP tokens into cycles using the steps outlined [here](/docs/current/tutorials/developer-journey/level-1/1.4-using-cycles#converting-icp-tokens-to-cycles).

Then, to create a new wallet on the European subnet, run the following `dfx ledger` command:

```
dfx ledger --network ic create-canister --amount 0.5 --subnet-type european CONTROLLER
```

Replace `CONTROLLER` with the prinicpal ID that you took note of earlier after running the `dfx identity get-principal` command.

Adjust the `--amount 0.5` to the number of ICP tokens that you want to send the new canister. More information can be found in the [documentation](/docs/current/references/cli-reference/dfx-ledger/#options). 

This command will return a canister ID. Using that canister ID, you can deploy the wallet canister code to the new canister with the command:

```
dfx identity --network ic deploy-wallet <WALLET_CANISTER_ID>
```

For example:

```
❯ dfx identity --network ic deploy-wallet nanx4-baaaa-aaaap-qb4sq-cai
Creating a wallet canister on the ic network.
The wallet canister on the "ic" network for user "ic-european" is "nanx4-baaaa-aaaap-qb4sq-cai"
```

Then, whenever you create new canisters using that `WALLET_CANISTER_ID`, the new canisters will be created on the same European subnet.

You can check the wallet balance of the wallet canister with the command:

```
dfx wallet --network=ic balance
```

The current wallet settings are stored in your local file system in the file `$HOME/.config/dfx/identity/<identity_name>/wallets.json`. The file's contents will resemble the following:

```json
{
    "identities": {
        "ic-european": {
            "ic": "nanx4-baaaa-aaaap-qb4sq-cai"
        }
    }
}
```

## Important notes about deploying to the European subnet

When deploying a project to the mainnet using dfx:

- If your canisters have already been created, dfx will continue to deploy the canisters on the same subnet that they are already located on.

- If your canisters do not exist yet, when they are created dfx will create them on the same subnet as your wallet canister. It is recommended to consistently use the same wallet on the European subnet. 

- If your canisters do not exist yet, you can specify the wallet canister that should be used to create them by using the `dfx deploy --wallet <WALLET_CANISTER_ID>`. This will create the new canisters on the same subnet where the specified `<WALLET_CANISTER_ID>` is located.
