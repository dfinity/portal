# Ledger local setup

## Overview
If you are working in a local development environment, i.e with a local replica instead of the public Internet Computer, you can't access the ICP ledger. In order to test your application that integrates with the ICP ledger locally, you need to deploy a local ledger canister. However, this local ledger canister won't have the history and balances of the live ICP ledger.

Follow the steps below to deploy your copy of the ledger canister to a local replica.

### Step 1:  Make sure you use a recent version of the [IC SDK](/developer-docs/setup/install/index.mdx).
If you don’t have the IC SDK installed, follow instructions on the [installing the IC SDK](/developer-docs/setup/install/index.mdx) section to install it.

### Step 2: Create a new dfx project with the command:

```
dfx new ledger-canister
cd ledger-canister
```

### Step 3:  Determine ledger file locations

Go to the [releases overview](https://dashboard.internetcomputer.org/releases) and copy the latest replica binary revision. At the time of writing, this is `a17247bd86c7aa4e87742bf74d108614580f216d`.

The URL for the ledger Wasm module is `https://download.dfinity.systems/ic/<REVISION>/canisters/ledger-canister.wasm.gz`, so with the above revision it would be `https://download.dfinity.systems/ic/a17247bd86c7aa4e87742bf74d108614580f216d/canisters/ledger-canister.wasm.gz`.

The URL for the ledger .did file is `https://raw.githubusercontent.com/dfinity/ic/<REVISION>/rs/rosetta-api/icp_ledger/ledger.did`, so with the above revision it would be `https://raw.githubusercontent.com/dfinity/ic/a17247bd86c7aa4e87742bf74d108614580f216d/rs/rosetta-api/icp_ledger/ledger.did`.

### Step 4:  Open the `dfx.json` file in your project's directory. Replace the existing content with the following:

``` json
{
  "canisters": {
  "ledger-canister": {
    "type": "custom",
    "candid": "https://raw.githubusercontent.com/dfinity/ic/a17247bd86c7aa4e87742bf74d108614580f216d/rs/rosetta-api/icp_ledger/ledger.did",
    "wasm": "https://download.dfinity.systems/ic/a17247bd86c7aa4e87742bf74d108614580f216d/canisters/ledger-canister.wasm.gz",
    "remote": {
      "id": {
        "ic": "ryjl3-tyaaa-aaaaa-aaaba-cai"
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

### Step 5:  Start a local replica.

``` sh
dfx start --background --clean
```

### Step 6:  Create a new identity that will work as a minting account:

``` sh
dfx identity new minter
dfx identity use minter
export MINT_ACC=$(dfx identity get-principal)
dfx identity get-principal
```

You will also need the account ID of this principal. To get this value, navigate to the URL `https://icscan.io/principal/PRINCIPAL`, where PRINCIPAL is the value returned from the previous command, `dfx identity get-principal`. Then, copy the 'Accounts' value, and run the command:

```
export ACCOUNT_ID=ACCOUNTS_VALUE
````

Replace `ACCOUNTS_VALUE` with the value you just copied from icscan.io. 

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
dfx canister create ledger-canister
dfx canister install ledger-canister --argument "(variant {
  Init = record {
    minting_account = $ACCOUNT_ID;
    icrc1_minting_account = opt record {
      owner = principal $MINT_ACC;
      subaccount = null;
    };
    initial_values = vec {
      record {
        $ACCOUNT_ID;
        record {
          e8s = 100000000 : nat64;
        };
      };
    };
    max_message_size_bytes = opt(2560000 : nat64);
    transaction_window = opt record {
      secs = 10 : nat64;
      nanos = 0 : nat32;
    };
    archive_options = opt record {
      trigger_threshold = 1000000 : nat64;
      num_blocks_to_archive = 1000000 : nat64;
      node_max_memory_size_bytes = null;
      max_message_size_bytes = null;
      controller_id = principal $ARCHIVE_CONTROLLER;
      cycles_for_archive_creation = null;
    };
    send_whitelist = vec {
      principal $LEDGER_ACC;
    };
    transfer_fee = opt record {
      e8s = 1000000 : nat64;
    };
    token_symbol = opt \"SYB\";
    token_name = opt \"NAME\";
  }})";
```

:::info 
If you get the following error:

```
Error: Failed to install wasm module to canister 'ledger-canister'.
Caused by: Failed to install wasm module to canister 'ledger-canister'.
  Failed to read /Users/username/ledger/.dfx/local/canisters/ledger-canister/ledger-canister.wasm.gz.
    No such file or directory (os error 2)
```

You can manually download the `ledger-canister.wasm.gz` file from the URL above, then move it into the file path `/Users/username/ledger/.dfx/local/canisters/ledger-canister/`.
:::

The output of this command will resemble the following:

```
Installing code for canister ledger-canister, with canister ID bkyz2-fmaaa-aaaaa-qaaaq-cai
2023-08-24 14:56:33.610532 UTC: [Canister bkyz2-fmaaa-aaaaa-qaaaq-cai] [ledger] init(): minting account is c8a8d79abce38016657a51824ca978dc34f3366db4c46abec0589ee3cc40c65d
2023-08-24 14:56:33.610532 UTC: [Canister bkyz2-fmaaa-aaaaa-qaaaq-cai] [ledger] init(): using maximum message size: 2560000
```

Take note of the canister ID.

You may want to set `trigger_threshold` and `num_blocks_to_archive` options to low values (e.g., 10 and 5) to trigger archivation after only a few blocks.

### Step 10: Deploy the canister.

To deploy the canister, run the command:

```
dfx deploy
```

The output of this command will resemble the following:

```
Deployed canisters.
URLs:
  Backend canister via Candid interface:
    ledger-canister: http://127.0.0.1:8080/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
```

### Step 11: Interact with the canister.

You can interact with the canister by running CLI commands, such as:

```
dfx canister call ledger-canister icrc1_name 
```

This command will return the token's name, such as:

```
("NAME")
```

Or, you can interact with it using the Candid UI by navigating to the URL provided when the canister was deployed, such as:

```
http://127.0.0.1:8080/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
```

After navigating to this URL in a web browser, the Candid UI will resemble the following:

![Candid UI](../_attachments/CandidUI.png)

Your local ICP ledger canister is up and running. You can now deploy other canisters that need to communicate with the ledger canister.
