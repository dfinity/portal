# ICRC-1 index local setup

## Overview
This guide will show you how do deploy an ICRC-1 index canister locally and on the mainnet, how to connect it to the ICRC-1 of your choice, and how to interact with the ICRC-1 index canister.

### Step 1: Read the guide on deploying a local ICRC-1 ledger.
If you have not done so already, read this guide to [setup an ICRC-1 ledger](./icrc1-ledger-setup.md) and then continue with this guide. It is assumed that you have read the steps described in the guide on setting up a local ICRC-1 ledger and that all prerequisites are fulfilled. For this guide most steps will assume that there is an ICRC-1 ledger running with ledger ID ´mxzaz-hqaaa-aaaar-qaada-cai´. If you are deploying on the mainnet and you followed the guide on [setting up an ICRC-1 ledger](./icrc1-ledger-setup.md) you will have to replace the ledger ID with that which you received upon deployment. 

### Step 2 [Optional]: Create a new project folder.
It is advised you use the same project folder that you created during the ICRC-1 ledger setup. Alternatively, you can create a new one for the ICRC-1 index canister using the following command:

```
dfx new icrc1_index_canister
cd icrc1_index_canister
``` 

**OPTIONAL:**
If you created a new project folder, you will either have to make sure the `dfx.json` file contains the correct data on the ICRC-1 ledger (as described in the [ICRC-1 ledger setup guide](./icrc1-ledger-setup.md) or you communicate with the ICRC-1 ledger from its project folder that contains the correct `dfx.json file`. If you try to communicate with the ICRC-1 ledger from a new project folder where the `dfx.json` file does not contain information on the ICRC-1 ledger canister, you will not be able to create transactions. 

### Step 3:  Fetch the ICRC-1 index Wasm and Candid files.

Go to the [releases overview](https://dashboard.internetcomputer.org/releases) and copy the latest replica binary revision (IC_VERSION). At the time of writing, this is `d87954601e4b22972899e9957e800406a0a6b929`.

The URL for the IPC index Wasm module is `curl -o index.wasm.gz "https://download.dfinity.systems/ic/$IC_VERSION/canisters/ic-icrc1-index-ng.wasm.gz"`, so with the above revision it would be `https://download.dfinity.systems/ic/d87954601e4b22972899e9957e800406a0a6b929/canisters/ic-icrc1-index-ng.wasm.gz`.

The URL for the ICRC-1 index .did file is `curl -o index.did "https://raw.githubusercontent.com/dfinity/ic/$IC_VERSION/rs/rosetta-api/icrc1/index-ng/index-ng.did"`, so with the above revision it would be `curl -o index.did "https://raw.githubusercontent.com/dfinity/ic/d87954601e4b22972899e9957e800406a0a6b929/rs/rosetta-api/icrc1/index-ng/index-ng.did"`.

### Step 4: Configure the `dfx.json` file.
Open the `dfx.json` file in your project's directory. Add the ICRC-1 index canister data and insert the canister data for your ICRC-1 ledger. If you followed the guide on local ICRC-1 ledger setup and you used the same project folder for both the ICRC-1 ledger and ICRC-1 index, your `dfx.json` file should look like this:

``` json
{
  "canisters": {
    "icrc1_index_canister": {
      "type": "custom",
      "candid": "https://raw.githubusercontent.com/dfinity/ic/d87954601e4b22972899e9957e800406a0a6b929/rs/rosetta-api/icrc1/index-ng/index-ng.did",
      "wasm": "https://download.dfinity.systems/ic/d87954601e4b22972899e9957e800406a0a6b929/canisters/ic-icrc1-index-ng.wasm.gz",
    },
    "icrc1_ledger_canister": {
      "type": "custom",
      "candid": "https://raw.githubusercontent.com/dfinity/ic/d87954601e4b22972899e9957e800406a0a6b929/rs/rosetta-api/icrc1/ledger/ledger.did",
      "wasm": "https://download.dfinity.systems/ic/d87954601e4b22972899e9957e800406a0a6b929/canisters/ic-icrc1-ledger.wasm.gz",
    }
  },
  "output_env_file": ".env",
  "version": 1
}
```
The data for the ICRC-1 ledger was also added. You can look at the [ICRC-1 ledger deployment guide](./icrc1-ledger-setup.md) to see why.
In an existing project you would only need to add the `icrc1_index_canister` and `icrc1_ledger_canister` canisters to the `canisters` section.

### Step 5 [Optional]:  Start a local replica.
This step can be skipped if you already have a local replica up and running. 
``` sh
dfx start --background --clean
```

### Step 6: Deploy the ICRC-1 index canister:
Here it is assumed that the canister ID of your local ICRC-1 ledger is `mxzaz-hqaaa-aaaar-qaada-cai`, otherwise replace it with your ICRC-1 ledger canister ID. 

```
dfx deploy icrc1_index_canister --argument '(opt variant{Init = record {ledger_id = principal "mxzaz-hqaaa-aaaar-qaada-cai"}})'
```

The ICRC-1 index canister will start synching right away and will automatically try to fetch new blocks from the ICRC-1 ledger every few seconds. 

### Step 7: Check the status and ICRC-1 ledger ID on the ICRC-1 index canister.
You can check that the correct ledger ID was set by running the following command.
```
dfx canister call icrc1_index_canister ledger_id '()'
```
The result is the ledger canister ID that the index canister is using to sync.
```
(principal "mxzaz-hqaaa-aaaar-qaada-cai")
```

To check how many blocks have been synched call: 
```
dfx canister call icrc1_index_canister status '()'
```
It should return something like this:
```
(record { num_blocks_synced = 1 : nat64 })
```
Depending on how many mint operations you created while setting up your ICRC-1 ledger, the number of synched blocks here will be 0 if no initial balances were parsed, or `X` if `X` initial balances were parsed. In the case of this tutorial, the guide on setting up a local ledger was used and there only one initial balance was parsed as an initialization argument. Hence, the number of blocks synched at this stage is 1. 

### Step 8: Create some new blocks to sync.

You can check that the synchronization of the index is working by creating a transaction on the ICRC-1 ledger and then checking the status of that transaction.
If you followed the guide on setting up an ICRC-1 ledger locally, your default identity should have some ICRC-1 to be send. 
Send some ICRC-1 to any principal.
```
dfx canister call icrc1_ledger_canister icrc1_transfer '(record { to = record { owner = principal "npki3-wdfh4-siaeq-orwh4-bh5of-r7mxr-i35lm-6f2eh-rtmwp-dmzmn-tae";};  amount = 100000:nat;})'
```

```
dfx canister call icrc1_index_canister status '()'
```
It should now indicate that an additional block was synced compared to the last time we called the status endpoint.
```
(record { num_blocks_synced = 2 : nat64 })
```

### Step 9: Fetch some blocks.
You can use the ICRC-1 index canister to fetch blocks like so.
You have to specify the block at which you want to start fetching from (i.e. the lowest index you want to fetch). If you want to start from the beginning you have to set start to 0. Similarly, the length parameter indicates the number of blocks you would like to fetch. Since the last status call indicated that there are two blocks that were synced you can set this to 2. Note that if you specify more than 2 blocks it will simply return the maximum number of blocks the index contains (The limit of blocks per call is usually set to 2000 blocks).
```
dfx canister call icrc1_index_canister get_blocks '(record{start=0:nat;length=2:nat})'
```
Which will return a vector the encoded blocks:
```
(
  record {
    blocks = vec {
      variant {
        Map = vec {
          record { "ts"; variant { Int = 1_695_375_155_855_058_000 : int } };
          record {
            "tx";
            variant {
              Map = vec {
                record { "amt"; variant { Int = 10_000_000_000 : int } };
                record { "op"; variant { Text = "mint" } };
                record {
                  "to";
                  variant {
                    Array = vec {
                      variant { Blob = blob "X\b30\04\8f\bcCE\e3\99\f9\7f{v\bd\f8\f8\fbHO\ce\15z/F\27\b03\02" };
                    }
                  };
                };
                record {
                  "ts";
                  variant { Int = 1_695_375_155_855_058_000 : int };
                };
              }
            };
          };
        }
      };
      variant {
        Map = vec {
          record {
            "phash";
            variant {
              Blob = blob "6\f0\02\d0\b0?3x\0b!\18e2\a6)h\b2z\82\cfz\0f\d5\ec>C\e4\05\a3\e0{\e6"
            };
          };
          record { "ts"; variant { Int = 1_695_375_453_656_274_000 : int } };
          record {
            "tx";
            variant {
              Map = vec {
                record { "amt"; variant { Int = 100_000 : int } };
                record { "op"; variant { Text = "mint" } };
                record {
                  "to";
                  variant {
                    Array = vec {
                      variant { Blob = blob "e?$\80\12\0e\8d\8f\c0\9f\ae,~\cb\c5\1b\ea\d9\e2\e8\87\8c\d9g\8d\99cf\02" };
                    }
                  };
                };
              }
            };
          };
        }
      };
    };
    chain_length = 2 : nat64;
  },
)
```

To fetch a vector of all transactions your default account was involved in you can use the following commands.
To find out the principal of your default account:
```
dfx identity get-principal
```
In the case of this tutorial, this command returns:

```
hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe
```

Then you can query the transactions for this principal with the default subaccount set by calling:
```
dfx canister call icrc1_index_canister get_account_transactions '(record{account=record {owner = principal "hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe"}; max_results=2:nat})'
```

The result will include the initial mint operation as well as the transfer that we made:

```
(
  variant {
    Ok = record {
      balance = 10_000_000_000 : nat;
      transactions = vec {
        record {
          id = 0 : nat;
          transaction = record {
            burn = null;
            kind = "mint";
            mint = opt record {
              to = record {
                owner = principal "hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe";
                subaccount = null;
              };
              memo = null;
              created_at_time = opt (1_695_375_155_855_058_000 : nat64);
              amount = 10_000_000_000 : nat;
            };
            approve = null;
            timestamp = 1_695_375_155_855_058_000 : nat64;
            transfer = null;
          };
        };
      };
      oldest_tx_id = opt (0 : nat);
    }
  },
)
```
The ICRC-1 ledger uses `AccountIdentifier` which are a hashed version of `Account` (`Principal` and `Subaccount`) for privacy. This also means that the returned transactions will show accounts as the hash in bytes rather than the actual `Accounts`.
For example the default `Principal` `hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe` with no `Subaccount` set results in the hash `0a6d437581369b546afdef613ca9c081a252ca2c46e7ec29e510bc10b213fa27`.
```
dfx ledger account-id --of-principal hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe 
```
```
0a6d437581369b546afdef613ca9c081a252ca2c46e7ec29e510bc10b213fa27
```
If one adds a `Subaccount` but keeps the `Principal`, the `AccountIdentifier` still changes. 
```
dfx ledger account-id --of-principal hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe --subaccount 0000000000000000000000000000000000000000000000000000000000000001
```
```
bd719f30834fe34f420904cde95a2cef6404ef7a8489cde57056b4daddab28b1
```

You can also always check the current balance of an account by calling:
```
dfx canister call icrc1_index_canister icrc1_balance_of '(record{owner = principal "hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe"})'
```
```
(99_989_880_000 : nat64)
```
