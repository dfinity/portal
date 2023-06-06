# Deploy a new ICRC-1 token

## Overview

This guide will provide you a step-by-step walkthrough to deploy your own [ICRC-1](https://github.com/dfinity/ICRC-1/blob/main/standards/ICRC-1/README.md) token to the Internet Computer.

## Deploy your ICRC-1 Ledger

### Step 1:  First, you need to download the icrc-1 ledger image (.wasm file) and the icrc-1 ledger interface (.did file). 

``` sh
export IC_VERSION=1612a202d030faa496e1694eed98be4179fca856
curl -o icrc1-ledger.wasm.gz "https://download.dfinity.systems/ic/$IC_VERSION/canisters/ic-icrc1-ledger.wasm.gz"
curl -o icrc1-ledger.did "https://raw.githubusercontent.com/dfinity/ic/$IC_VERSION/rs/rosetta-api/icrc1/ledger/icrc1.did"
gunzip icrc1-ledger.wasm.gz
```

:::info

The `IC_VERSION` variable is a commit hash from the <http://github.com/dfinity/ic> repository. To get the latest version, take the commit hash from the last blessed version from the [releases dashboard](https://dashboard.internetcomputer.org/releases). For newer releases, the deploy arguments for the ICRC1 ledger might change. To make sure that this guide works, please use the same `IC_VERSION` as specified in the above example.

:::

### Step 2:  Make sure you use a recent version of the [IC SDK](/developer-docs/setup/install/index.mdx). 
If you don’t have the IC SDK installed, follow instructions on the [installing the IC SDK](/developer-docs/setup/install/index.mdx) section to install it.

### Step 3:  Add the following canister definition to the `dfx.json` file in your project:

``` json
{
  "canisters": {
    "icrc1-ledger": {
      "type": "custom",
      "wasm": "icrc1-ledger.wasm",
      "candid": "icrc1-ledger.did"
    }
  }
}
```

### Step 4:  Deploy the ledger canister to the IC:

``` bash
# Change the variable to "ic" to deploy the ledger on the mainnet.
export NETWORK=local

# Change the variable to the principal that can mint and burn tokens.
export MINTER_PRINCIPAL=$(dfx identity get-principal)

# Change the variable to the principal that controls archive canisters.
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)

export TOKEN_NAME="My Token"
export TOKEN_SYMBOL=XMTK

dfx deploy --network ${NETWORK} icrc1-ledger --argument '(variant { Init = 
      record {
        token_name = "'${TOKEN_NAME}'";
        token_symbol = "'${TOKEN_SYMBOL}'";
        minting_account = record { owner = principal "'${MINTER_PRINCIPAL}'";};
        initial_balances = vec {};
        metadata = vec {};
        transfer_fee = 10;
        archive_options = record {
          trigger_threshold = 2000;
          num_blocks_to_archive = 1000;
          controller_id = principal "'${ARCHIVE_CONTROLLER}'";
        }
}})'
```

Replace these variables with the following values:

-   the `NETWORK` is the url or name of the replica where you want to deploy the ledger (e.g. use ic for the mainnet).

-   the `TOKEN_NAME` is the human-readable name of your new token.

-   the `TOKEN_SYMBOL` is the ticker symbol of your new token.

-   the `MINTER_PRINCIPAL` is the Principal responsible for minting and burning tokens.

-   the `ARCHIVE_CONTROLLER` is the [controller principal](../../setup/cycles/cycles-wallet.md#controller-and-custodian-roles) of the archive canisters.

:::info
When you deploy to the mainnet:

-   Make sure that the ledger canister has plenty of cycles. The canister will need cycles to spawn new archives. The exact number of cycles attached to `create_canister` messages is controlled by the `cycles_for_archive_creation` option.
:::

### Step 5:  Check that the Ledger canister is healthy. Execute the following command:

``` sh
dfx canister --network ${NETWORK} call icrc1-ledger icrc1_symbol
```

The output should look like the following:

    (record { symbol = "XMTK" })

Your new token is deployed and ready to be used.
