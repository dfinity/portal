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

### Step 4:  Open the `dfx.json` file in your project's directory. Replace the existing content with the following:

``` json
{
  "canisters": {
    "ledger": {
      "type": "custom",
      "wasm": "ledger_canister.wasm",
      "candid": "ledger.did"
    }
  },
  "defaults":{
    "replica": {
      "subnet_type":"system"
    }
  }
}
```

### Step 5:  Start a local replica.

``` sh
dfx start --background --clean
```

### Step 6:  Create a new identity that will work as a minting account:

``` sh
dfx identity new minter
dfx identity use minter
export MINT_ACC=$(dfx identity get-principal)
```

Transfers from the minting account will create `Mint` transactions. Transfers to the minting account will create `Burn` transactions.

### Step 7:  Switch back to your default identity and record its ledger account identifier.

``` sh
dfx identity use default
export LEDGER_ACC=$(dfx identity get-principal)
```

### Step 8: Obtain the principal of the identity you use for development. This principal will be the controller of archive canisters.

``` sh
dfx identity use default
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
```

### Step 9: Deploy the ledger canister with archiving options:

```
dfx deploy ledger --argument "(variant {Init = record {minting_account = record { owner = principal \"$MINT_ACC\" };transfer_fee = 0;token_symbol = \"TOK\";token_name = \"Token Name\";metadata = vec {};initial_balances = vec {};archive_options = record {num_blocks_to_archive = 10_000;trigger_threshold = 20_000;cycles_for_archive_creation = opt 4_000_000_000_000;controller_id = principal \"$LEDGER_ACC\";};}})"
```

The output of this command will resemble the following:

```
Installing code for canister ledger, with canister ID bkyz2-fmaaa-aaaaa-qaaaq-cai
Deployed canisters.
URLs:
  Backend canister via Candid interface:
    ledger: http://127.0.0.1:8080/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
```

Take note of the canister ID.

You may want to set `trigger_threshold` and `num_blocks_to_archive` options to low values (e.g., 10 and 5) to trigger archivation after only a few blocks.

### Step 10: Update the canister ID definition in the `dfx.json` file to specify a remote ID for the ledger. 
This will be the canister ID value you took note of in the last step. 

This will prevent dfx from deploying your own ledger in case you decide to deploy your project to the Internet Computer:

```
{
  "canisters": {
    "ledger": {
      "type": "custom",
      "wasm": "ledger_canister.wasm",
      "candid": "ledger.did",
      "remote": {
        "candid": "ledger.did",
        "id": {
          "ic": "bkyz2-fmaaa-aaaaa-qaaaq-cai"
    }
  }
  }
  },
  "defaults":{
    "replica": {
      "subnet_type":"system"
    }
  }
}
```

### Step 11: Interact with the canister.

You can interact with the canister by running CLI commands, such as:

```
dfx canister call ledger icrc1_name 
```

This command will return the token's name, such as:

```
("Token Name")
```

Or, you can interact with it using the Candid UI by navigating to the URL provided when the canister was deployed, such as:

```
http://127.0.0.1:8080/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
```

After navigating to this URL in a web browser, the Candid UI will resemble the following:

![Candid UI](../_attachments/CandidUI_ledger.png)

Your local ICP ledger canister is up and running. You can now deploy other canisters that need to communicate with the ledger canister.
