# Ledger local setup


## Overview
If you are working in a local development environment, i.e with a local replica instead of the public Internet Computer, you can't access the ICP ledger. In order to test your application that integrates with the ICP ledger locally, you need to deploy a local ledger canister. However, this local ledger canister won't have the history and balances of the live ICP ledger.

Follow the steps below to deploy your copy of the ledger canister to a local replica.

### Step 1:  Make sure you use a recent version of the [IC SDK](/developer-docs/setup/install/index.mdx).
If you don’t have the IC SDK installed, follow instructions on the [installing the IC SDK](/developer-docs/setup/install/index.mdx) section to install it.

### Step 2: Create a new dfx project with the command:

```
dfx new ledger
cd ledger
```

### Step 3:  Get a pre-built ledger canister module and Candid interface files.

``` sh
export IC_VERSION=1612a202d030faa496e1694eed98be4179fca856
curl -o ledger_canister.wasm.gz "https://download.dfinity.systems/ic/$IC_VERSION/canisters/ic-icrc1-ledger.wasm.gz"
curl -o ledger.did "https://raw.githubusercontent.com/dfinity/ic/$IC_VERSION/rs/rosetta-api/icrc1/ledger/icrc1.did"
gunzip ledger_canister.wasm.gz
```

If you plan to work with Ledger archives, also download the `ledger_archive.did` file:
    
``` sh
curl -o ledger_archive.did "https://raw.githubusercontent.com/dfinity/ic/$IC_VERSION/rs/rosetta-api/icp_ledger/ledger_archive.did"
```

:::info

The `IC_VERSION` variable is a commit hash from the <http://github.com/dfinity/ic> repository. To get the latest version, take the commit hash from the last blessed version from the [releases dashboard](https://dashboard.internetcomputer.org/releases).

:::

### Step 4:  Add the following canister definition to the `dfx.json` file in your project:

``` json
{
  "canisters": {
    "ledger": {
      "type": "custom",
      "wasm": "ledger.wasm",
      "candid": "ledger.private.did"
    }
  }
}
```
    
### Step 5: Configure your replica to run a `System` subnet. 
Modify `dfx.json` to include:

```json
{
  "defaults":{
    "replica": {
      "subnet_type":"system"
    }
  }
}
```

### Step 6:  Start a local replica.

``` sh
dfx start --background --clean
```

### Step 7:  Create a new identity that will work as a minting account:

``` sh
dfx identity new minter
dfx identity use minter
export MINT_ACC=$(dfx ledger account-id)
```

Transfers from the minting account will create `Mint` transactions. Transfers to the minting account will create `Burn` transactions.

### Step 8:  Switch back to your default identity and record its ledger account identifier.

``` sh
dfx identity use default
export LEDGER_ACC=$(dfx ledger account-id)
```

### Step 9:  Deploy the ledger canister to your network.

``` sh
dfx deploy ledger --argument "(variant {Init = record {minting_account = \"${MINT_ACC}\"; initial_values = vec { record { \"${LEDGER_ACC}\"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}}})"
```

If you want to setup the ledger in a way that matches the production deployment, you should deploy it with archiving enabled. In this setup, the ledger canister dynamically creates new canisters to store old blocks. We recommend using this setup if you are planning to exercise the interface for fetching blocks.

Obtain the principal of the identity you use for development. This principal will be the controller of archive canisters.

``` sh
dfx identity use default
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
```

Deploy the ledger canister with archiving options:

``` sh
dfx deploy ledger --argument "(variant {Init = record {minting_account = \"${MINT_ACC}\"; initial_values = vec { record { \"${LEDGER_ACC}\"; record { e8s=100_000_000_000 } }; }; send_whitelist = vec {}; archive_options = opt record { trigger_threshold = 2000; num_blocks_to_archive = 1000; controller_id = principal \"${ARCHIVE_CONTROLLER}\" }})"
```

You may want to set `trigger_threshold` and `num_blocks_to_archive` options to low values (e.g., 10 and 5) to trigger archivation after only a few blocks.

### Step 10: Update the canister definition in the `dfx.json` file to use the public Candid interface:

``` diff
{
  "canisters": {
    "ledger": {
      "type": "custom",
      "wasm": "ledger.wasm",
-       "candid": "ledger.private.did"
+       "candid": "ledger.public.did"
    }
  }
}
```

### Step 11: Update the canister definition in the `dfx.json` file to specify a remote id for the ledger. 
This will prevent dfx from deploying your own ledger in case you decide to deploy your project to the Internet Computer:

```
"ledger": {
  "type": "custom",
  "candid": "ledger.public.did",
  "wasm": "ledger.wasm",
  "remote": {
    "candid": "ledger.public.did",
    "id": {
      "ic": "ryjl3-tyaaa-aaaaa-aaaba-cai"
    }
  }
}
```

### Step 12: Check that the Ledger canister is healthy. Execute the following command:

``` sh
dfx canister call ledger account_balance '(record { account = '$(python3 -c 'print("vec{" + ";".join([str(b) for b in bytes.fromhex("'$LEDGER_ACC'")]) + "}")')' })'
```

The output should look like the following:

    (record { e8s = 100_000_000_000 : nat64 })

Your local ICP ledger canister is up and running now. You can now deploy other canisters that need to communicate with the ledger canister.
