# ICP-index local setup

## Overview
If you are working in a local development environment, i.e with a local replica instead of the public Internet Computer, you can't access the ICP ledger nor the ICP index canister. If your application is using the ICP index canister and you want to test it, you can setup the ICP index and ICP ledger locally. Neither of the two canisters will have any information about the state of the ICP ledger on the mainnet. You will have to create your own transactions on the ICP ledger so that the ICP index can serve them through its endpoints. 

### Step 1: Deploy a local ICP ledger.
If you have not done so already, follow the guide to [setup an ICP ledger locally](./ledger-local-setup.md) and then continue with this guide. It is assumed that you have followed the steps required to set up a local ledger and that all prerequisites are fulfilled. 

### Step 2 [Optional]: Create a new project folder
It is advised you use the same project folder that you created during the local ledger setup. Alternatively you can create a new one for the icp index canister using the following command.

```
dfx new index_canister
cd index_canister
``` 

[OPTIONAL]
If you created a new project folder, you will either have to make sure the dfx.json file contains the correct data on the icp ledger (as described in the [local ledger setup guide](./ledger-local-setup.md)) or you communicate with the ICP ledger from its project folder that contains the correct dfx.json file. If you try to communicate with the ICP ledger from a new project folder where the dfx.json file does not contain information on the ICP ledger canister, you will not be able to create transactions. 


### Step 3:  Fetch the ICP index wasm and candid files

Go to the [releases overview](https://dashboard.internetcomputer.org/releases) and copy the latest replica binary revision (IC_VERSION). At the time of writing, this is `d87954601e4b22972899e9957e800406a0a6b929`.

The URL for the IPC index Wasm module is `curl -o index.wasm.gz "https://download.dfinity.systems/ic/$IC_VERSION/canisters/ic-icp-index-canister.wasm.gz"`, so with the above revision it would be `https://download.dfinity.systems/ic/d87954601e4b22972899e9957e800406a0a6b929/canisters/ic-icp-index-canister.wasm.gz`.

The URL for the ICP index .did file is `curl -o index.did "https://raw.githubusercontent.com/dfinity/ic/$IC_VERSION/rs/rosetta-api/icp_ledger/index/index.did"`, so with the above revision it would be `curl -o index.did "https://raw.githubusercontent.com/dfinity/ic/d87954601e4b22972899e9957e800406a0a6b929/rs/rosetta-api/icp_ledger/index/index.did"`.

### Step 4: Configuring the `dfx.json` file
 Open the `dfx.json` file in your project's directory. Add the icp_index canister data and insert the canister data for your ICP ledger. If you followed the guide on local ledger setup and you used the same project folder for both the ICP ledger and ICP index, your dfx.json file should look like this:

``` json
{
  "canisters": {
    "icp_index": {
      "type": "custom",
      "candid": "https://raw.githubusercontent.com/dfinity/ic/d87954601e4b22972899e9957e800406a0a6b929/rs/rosetta-api/icp_ledger/index/index.did",
      "wasm": "https://download.dfinity.systems/ic/d87954601e4b22972899e9957e800406a0a6b929/canisters/ic-icp-index-canister.wasm.gz",
            "remote": {
        "id": {
          "ic": "qhbym-qaaaa-aaaaa-aaafq-cai"
        }
      }
    },
    "ledger_canister": {
      "type": "custom",
      "candid": "https://raw.githubusercontent.com/dfinity/ic/d87954601e4b22972899e9957e800406a0a6b929/rs/rosetta-api/icp_ledger/ledger.did",
      "wasm": "https://download.dfinity.systems/ic/d87954601e4b22972899e9957e800406a0a6b929/canisters/ledger-canister.wasm.gz",
      "remote": {
        "id": {
          "ic": "ryjl3-tyaaa-aaaaa-aaaba-cai"
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

In an existing project you would only need to add the `icp_index` and `ledger_canister` canisters to the `canisters` section.

### Step 5 [Optional]:  Start a local replica.
This step can be skipped if you already have a local replica up and running. 
``` sh
dfx start --background --clean
```

### Step 6:  Use your default identity to deploy the index canister.

``` sh
dfx identity use default
export DEFAULT_ACCOUNT_ID=$(dfx ledger account-id)
```

### Step 7: Deploy the ICP index canister:
Here it is assumed that the canister id of your local ICP ledger is `ryjl3-tyaaa-aaaaa-aaaba-cai`, otherwise replace it with your ICP ledger canister id. 

```
dfx deploy icp_index --specified-id qhbym-qaaaa-aaaaa-aaafq-cai --argument '(record {ledger_id = principal "ryjl3-tyaaa-aaaaa-aaaba-cai"})'
```

The ICP index canister will start synching right away and will automatically try to fetch new blocks from the ICP ledger every few seconds. 

### Step 8: Check the status and ICP ledger id on the ICP index canister.
You can check that the correct ledger id was set but runnig the following command.
```
dfx canister call qhbym-qaaaa-aaaaa-aaafq-cai ledger_id '()'
```
The result is the ledger canister id that the index canister is using to sync.
```
(principal "ryjl3-tyaaa-aaaaa-aaaba-cai")
```

```
dfx canister call qhbym-qaaaa-aaaaa-aaafq-cai status '()'
```
It should return something like this:
```
(record { num_blocks_synced = 1 : nat64 })
```
Depending on how many mint operations you created while setting up your ICP ledger the number of synched blocks here will be 0 if no initial balances were parsed or `X` if `X` initial balances were parsed. In the case of this tutorial the guide on setting up a local ledger was used and there only one initial balance was parsed as an initialization argument. Hence, the number of blocks synched at this stage is 1. 

### Step 9: Create some new blocks to sync.

You can check that the synchronization of the index is working by creating some transaction on the ICP ledger and then checking the status.
If you followed the guide on setting up an ICP ledger locally your default identity should have some ICP to be send. 
Send some ICP to any prinicpal.
```
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai icrc1_transfer '(record { to = record { owner = principal "npki3-wdfh4-siaeq-orwh4-bh5of-r7mxr-i35lm-6f2eh-rtmwp-dmzmn-tae";};  amount = 100000:nat;})'
```

```
dfx canister call qhbym-qaaaa-aaaaa-aaafq-cai status '()'
```
It should now indicate that an additional block was synced compared to the last time we called the status endpoint. You may have to wait a couple of seconds for the index canister to sync. 
```
(record { num_blocks_synced = 2 : nat64 })
```

### Step 10: Fetch some blocks
You can use the ICP index canister to fetch blocks like so.
You have to specify the block at which you want to start fetching from (i.e. the lowest index you want to fetch). If you want to start from the beginning you have to set start to 0. Similarly, the length parameter indicates the number of blocks you would like to fetch. Since the last status call indicated that there are two blocks that were synced you can set this to 2. Note that if you specify more than 2 blocks it will simply return the maximum number of blocks the index contains (The limit of blocks per call is usually set to 2000 blocks).
```
dfx canister call qhbym-qaaaa-aaaaa-aaafq-cai get_blocks '(record{start=0:nat;length=2:nat})'
```
Which will return a vector the encoded blocks.
```
(
  record {
    blocks = vec {
      blob "\12\0a\08\90\83\a6\c6\c7\b8\a6\c3\17\1a=\12-\12\22\0a \0amCu\816\9bTj\fd\efa<\a9\c0\81\a2R\ca,F\e7\ec)\e5\10\bc\10\b2\13\fa\27\1a\07\08\80\d0\db\c3\f4\02\22\002\0a\08\90\83\a6\c6\c7\b8\a6\c3\17";
      blob "\0a\22\0a \912w)\02\f3a\9e\bc+\eax\e8D\b9\c9\09\14\12\cc%ZNRJ\06\c7?\a8\d1\97/\12\0a\08\a8\cd\b5\fb\a6\ba\a6\c3\17\1aW\1aS\0a\22\0a \0amCu\816\9bTj\fd\efa<\a9\c0\81\a2R\ca,F\e7\ec)\e5\10\bc\10\b2\13\fa\27\12\22\0a \930\d6\d8\cd\8ar\a5\a9Z\b7\d6@P\18\c4\ca^\bd\0cN\c1o6\eb\91\dbu\14\bd\86#\1a\04\08\a0\8d\06\22\03\08\90N\22\00";
    };
    chain_length = 2 : nat64;
  },
)
```

To fetch a vector of all transactions your default account was involved in you can use the following commands.
Find out the principal of your default account.
```
dfx identity get-principal
```
In the case of this tutorial this returns

```
hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe
```

Then you can query the transactions for this principal with the default subaccount set by calling. 
```
dfx canister call qhbym-qaaaa-aaaaa-aaafq-cai get_account_transactions '(record{account=record {owner = principal "hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe"}; max_results=2:nat})'
```

The result will include the intial mint operation as well as the transfer that we made.

```
(
  variant {
    Ok = record {
      balance = 99_999_890_000 : nat64;
      transactions = vec {
        record {
          id = 1 : nat64;
          transaction = record {
            memo = 0 : nat64;
            icrc1_memo = null;
            operation = variant {
              Transfer = record {
                to = "9330d6d8cd8a72a5a95ab7d6405018c4ca5ebd0c4ec16f36eb91db7514bd8623";
                fee = record { e8s = 10_000 : nat64 };
                from = "0a6d437581369b546afdef613ca9c081a252ca2c46e7ec29e510bc10b213fa27";
                amount = record { e8s = 100_000 : nat64 };
              }
            };
            created_at_time = null;
          };
        };
        record {
          id = 0 : nat64;
          transaction = record {
            memo = 0 : nat64;
            icrc1_memo = null;
            operation = variant {
              Mint = record {
                to = "0a6d437581369b546afdef613ca9c081a252ca2c46e7ec29e510bc10b213fa27";
                amount = record { e8s = 100_000_000_000 : nat64 };
              }
            };
            created_at_time = opt record {
              timestamp_nanos = 1_695_211_378_870_682_000 : nat64;
            };
          };
        };
      };
      oldest_tx_id = opt (0 : nat64);
    }
  },
)
```
The ICP ledger uses AccountIdentifier which are a hashed version of Account (Principal and Subaccount) for privacy. This also means that the returned transactions will show accounts as the hash in bytes rather than the actual Accounts.
For example the default principal `hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe` with no subaccount set results in the hash `0a6d437581369b546afdef613ca9c081a252ca2c46e7ec29e510bc10b213fa27`.
You can check a principals AccountIdentifier by running:
```
dfx ledger account-id --of-principal hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe
```
It will return the AccountIdentifier.
```
0a6d437581369b546afdef613ca9c081a252ca2c46e7ec29e510bc10b213fa27
```
Alternatively, you can also add a subaccount. This will change the AccountIdentifier although the principal is the same

```
dfx ledger account-id --of-principal hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe --subaccount 0000000000000000000000000000000000000000000000000000000000000001
```
```
bd719f30834fe34f420904cde95a2cef6404ef7a8489cde57056b4daddab28b1
```

You can also always check the current balance of an account by calling:
```
dfx canister call qhbym-qaaaa-aaaaa-aaafq-cai icrc1_balance_of '(record{owner = principal "hdq6b-ncywm-yajd5-4inc6-hgpzp-55xnp-py7d5-uqt6o-cv5c6-rrhwa-zqe"})'
```
```
(99_999_890_000 : nat64)
```