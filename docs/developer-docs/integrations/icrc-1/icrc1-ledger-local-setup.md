# ICRC-1 Ledger local setup

## Overview
This guide will show you how to deploy an ICRC-1 ledger locally and on mainnet, how to interact with the ICRC-1 ledger and how to test it. ICRC-1 is a token standard which you can read up on [here](https://github.com/dfinity/ICRC-1). 
The ICRC-1 ledger used in this guide is a reference implementation. This guide aims at showing you how to setup an existing ICRC-1 ledger implementation rather than how to build an ICRC-1 ledger yourself. 

### Step 1:  Make sure you use a recent version of the [IC SDK](/developer-docs/setup/install/index.mdx).
If you don’t have the IC SDK installed, follow instructions on the [installing the IC SDK](/developer-docs/setup/install/index.mdx) section to install it.

### Step 2: Create a new dfx project with the command:

```
dfx new icrc1_ledger_canister
cd icrc1_ledger_canister
```

### Step 3:  Determine ledger file locations

Go to the [releases overview](https://dashboard.internetcomputer.org/releases) and copy the latest replica binary revision. At the time of writing, this is `d87954601e4b22972899e9957e800406a0a6b929`.

The URL for the ledger Wasm module is `https://download.dfinity.systems/ic/<REVISION>/canisters/ic-icrc1-ledger.wasm.gz`, so with the above revision it would be `https://download.dfinity.systems/ic/d87954601e4b22972899e9957e800406a0a6b929/canisters/ic-icrc1-ledger.wasm.gz`.

The URL for the ledger .did file is `https://raw.githubusercontent.com/dfinity/ic/<REVISION>/rs/rosetta-api/icrc1/ledger/ledger.did`, so with the above revision it would be `https://raw.githubusercontent.com/dfinity/ic/d87954601e4b22972899e9957e800406a0a6b929/rs/rosetta-api/icrc1/ledger/ledger.did`.

### Step 4:  Open the `dfx.json` file in your project's directory. Replace the existing content with the following:

``` json
{
  "canisters": {
    "icrc1_ledger_canister": {
      "type": "custom",
      "candid": "https://raw.githubusercontent.com/dfinity/ic/d87954601e4b22972899e9957e800406a0a6b929/rs/rosetta-api/icrc1/ledger/ledger.did",
      "wasm": "https://download.dfinity.systems/ic/d87954601e4b22972899e9957e800406a0a6b929/canisters/ic-icrc1-ledger.wasm.gz",
      "remote": {
        "id": {
          "ic": "mxzaz-hqaaa-aaaar-qaada-cai"
        }
      }
    }
  },
  "defaults": {
    "build": {
      "args": "",
      "packtool": ""
    }
  },
  "output_env_file": ".env",
  "version": 1
}
```
Specifying the canister id `mxzaz-hqaaa-aaaar-qaada-cai` is optional. It is set in this tutorial, so that we can be sure what we mean when referencing the deployed canister later in this tutorial.

In an existing project you would only need to add the `icrc1_ledger_canister` canister to the `canisters` section.

### Step 5:  Start a local replica.

``` sh
dfx start --background --clean
```

### Step 6:  Create the required identities and export initialization arguments:

``` sh
dfx identity new minter
dfx identity use minter
export MINTER=$(dfx identity get-principal)
```
Transfers from the minting account will create `Mint` transactions. Transfers to the minting account will create `Burn` transactions.

Specify the token name and symbol of your choice:

``` sh
export TOKEN_NAME="My Token"
export TOKEN_SYMBOL="XMTK"
```

Set the default identity or the identity with which you want to deploy the ledger.
``` sh
dfx identity use default
export DEFAULT=$(dfx identity get-principal)
```

[OPTIONAL]
To be able to interact and send some tokens you may want to mint some tokens when you deploy the ledger. 
We will mint some tokens for the default identity.
You can also specify the transfer fee for transfering tokens. 
``` sh
export PRE_MINTED_TOKENS=10_000_000_000
export TRANSFER_FEE=10_000
```

The values set for archiving are the recommended values. You may change them to fit your ICRC-1 ledger's needs. 
``` sh
dfx identity new archive_controller
dfx identity use archive_controller
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
export TRIGGER_THRESHOLD=2000
export NUM_OF_BLOCK_TO_ARCHIVE=1000
export CYCLE_FOR_ARCHIVE_CREATION=10000000000000
```

Check the set variables:

For each variable, the exported environment variable will be used unless otherwise specified:
-   the `TOKEN_NAME` is the human-readable name of your new token.
-   the `TOKEN_SYMBOL` is the ticker symbol of your new token.
-   the `MINTER` is the account of the Principal responsible for minting and burning tokens (see the [icrc-1 ledger documentation](https://github.com/dfinity/ICRC-1)).
-   Minting 100 tokens to the `DEFAULT` (1 token is by default equal to 10^8 e8s, hence the name).
-   Setting the transfer fee to 0.0001 tokens.
### Step 8:  Deploy the ICRC-1 ledger canister locally:


``` sh
dfx deploy icrc1_ledger_canister --specified-id mxzaz-hqaaa-aaaar-qaada-cai --argument "(variant {Init = 
record {
     token_symbol = \"${TOKEN_SYMBOL}\";
     token_name = \"${TOKEN_NAME}\";
     minting_account = record { owner = principal \"${MINTER}\" };
     transfer_fee = ${TRANSFER_FEE};
     metadata = vec {};
     initial_balances = vec { record { record { owner = principal \"${DEFAULT}\"; }; ${PRE_MINTED_TOKENS}; }; };
     archive_options = record {
         num_blocks_to_archive = ${NUM_OF_BLOCK_TO_ARCHIVE};
         trigger_threshold = ${TRIGGER_THRESHOLD};
         controller_id = principal \"${ARCHIVE_CONTROLLER}\";
         cycles_for_archive_creation = opt ${CYCLE_FOR_ARCHIVE_CREATION};
     };
 }
})"
```

::: info
If you want to deploy your ICRC-1 ledger on the mainnet you will have to complete the following steps. 
-   You may want to specify further the intitially minted tokens by setting `initial_values = vec {<INITIAL_VALUES>}`. See the ledger.did file for the details of the argument.
-   You will have to set the network option to `ic` -> `dfx deploy --network ic ...` before specifying the rest of the dfx command.
-   the `ARCHIVE_CONTROLLER` is the [controller principal](/developer-docs/setup/cycles/cycles-wallet.md#controller-and-custodian-roles) of the archive canisters.
-   Always set the `archive_options` field. If the archiving is disabled, the capacity of your ledger is limited to the memory of a single canister.
-   Make sure that the ledger canister has plenty of cycles. The canister will need cycles to spawn new instances of the archive canister on demand. The exact number of cycles attached to `create_canister` messages is controlled by the `cycles_for_archive_creation` option.
:::


### Step 9: Interact with the canister.

You can interact with the canister by running CLI commands, such as:

```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_name '()' 
```

This command will return the token's name, such as:

```
("My Token")
```

Or, you can interact with it using the Candid UI by navigating to the URL provided when the canister was deployed, such as:

```
http://127.0.0.1:4943/?canisterId=bnz7o-iuaaa-aaaaa-qaaaa-cai&id=mxzaz-hqaaa-aaaar-qaada-cai
```

After navigating to this URL in a web browser, the Candid UI will resemble the following:

![Candid UI](../_attachments/CandidUI.png)

Your local ICRC-1 ledger canister is up and running. You can now deploy other canisters that need to communicate with the ledger canister.

### Step 10: Example commands for the ICRC-1 endpoints
ICRC-1 is the token standard of the ledger (With ICRC standing for "Internet Computer Request for Comments", you can find documentation on the working group [here](https://github.com/dfinity/ICRC) ). The ICRC-1 standard is defined [here](https://github.com/dfinity/ICRC-1/blob/main/standards/ICRC-1/README.md). This means that any ICRC-1 ledger has to implement at least the specifications that are defined there. 

However, there are extensions to this standard. One of them being ICRC-2, which you can read up on [here](https://github.com/dfinity/ICRC-1/blob/main/standards/ICRC-2/README.md). Further, officially supported standards by the reference implementation can be found [here](https://github.com/dfinity/ICRC-1/tree/main/standards). 

Whether your ICRC-1 ledger will have all the endpoints discussed in this tutorial will depend on whether you support any of the extensions. 
This tutorial will go through the endpoints for ICRC-1. 
You can always check which standards are supported by a certain ICRC-1 ledger by calling:

```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_supported_standards '()' 
```
returns:
```
(
  vec {
    record {
      url = "https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-1";
      name = "ICRC-1";
    };
  },
)
```

The endpoints that are supported by the reference implementation can be found in the `ledger.did`file. The return values are specific to the deployed ICRC-1 ledger and thus may differ to your return values, depending on which values you chose. 

Fetching the symbol of the ICRC-1 ledger:
```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_symbol '()' 
```
returns:
```
("XMTK")
```

Fetching the decimals of the ICRC-1 ledger:
```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_decimals '()' 
```
returns:
```
(8 : nat8)
```

Fetching the decimals of the ICRC-1 ledger:
```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_decimals '()' 
```
returns:
```
(8 : nat8)
```

Fetching the metadata of the ICRC-1 ledger:
```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_metadata '()' 
```
returns:
```
(
  vec {
    record { "icrc1:decimals"; variant { Nat = 8 : nat } };
    record { "icrc1:name"; variant { Text = "My Token" } };
    record { "icrc1:symbol"; variant { Text = "XMTK" } };
    record { "icrc1:fee"; variant { Nat = 10_000 : nat } };
    record { "icrc1:max_memo_length"; variant { Nat = 32 : nat } };
  },
)
```

Fetching the total supply of the ICRC-1 ledger:
```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_total_supply '()' 
```
returns:
```
(10_000_000_000 : nat)
```

Fetching the fee of the ICRC-1 ledger:
```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_fee '()' 
```
returns:
```
(10_000 : nat)
```

Fetching the minting account of the ICRC-1 ledger:
```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_minting_account '()' 
```
returns:
```
(
  opt record {
    owner = principal "rrd6e-uoar3-ehz42-jxkun-ymmmv-jw4rn-re7se-5hymk-aoizl-bfb3j-uqe";
    subaccount = null;
  },
)
```

Fetching the of a account (DEFAULT account in this case, with no subaccount set) on the ICRC-1 ledger:
```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_transfer "(record {owner = principal \"${DEFAULT}\"; })"  
```
returns:
```
(10_000_000_000 : nat)
```

Transfering of tokens (From DEFAULT to the arbitrary principal `sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe`) on the ICRC-1 ledger:
```
dfx canister call mxzaz-hqaaa-aaaar-qaada-cai icrc1_transfer "(record { to = record { owner = principal \"sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe\";};  amount = 10_000;})"
```
returns:
```
(variant { Ok = 1 : nat })
```



### Step 11: Testing your ICRC-1 implementation
There is a test suite available to test ICRC-1 ledgers. You can find the repository for it [here](https://github.com/dfinity/ICRC-1/tree/main/test). If you are building your own ICRC-1 repository, it might be helpful to run this test suite against your locally deployed ICRC-1 ledger, or import the test suite directly through a rust crate and add the tests to your repository. You can find a reference implementation of integrating the test suite to your repo [here](https://github.com/dfinity/ICRC-1/tree/main/test/ref).
