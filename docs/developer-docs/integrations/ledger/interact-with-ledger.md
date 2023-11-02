# Interacting with the ICP ledger

## Overview
There are multiple ways to interact with the ICP ledger. They depend on whether you want to interact with the ICP ledger on mainnet, the `dfx ledger` default ICP ledger on a local network, or whether you have deployed your own local ledger version. Also, how you interact with the ICP ledger is dependent on whether you want to interact with it from the command line, from your web app, or from another canister. 

This guide will discuss the different ways to interact with the ICP ledger. In this guide, the following workflows will be covered:
- `dfx ledger`: the built in `dfx` shortcut for interacting with the ICP ledger.
- `dfx canister`: the generic canister call from `dfx`.
- `nns-js`: interact with the ICP ledger from your web app.
- `ic-cdk`: inter-canister calls for the ICP ledger.

## Interacting with ICP ledger via `dfx ledger`

`dfx` provides a convenience command to interact with the ICP ledger canister and related functionality. You can find the documentation [here](https://internetcomputer.org/docs/current/references/cli-reference/dfx-ledger.md) or just enter the following command into your console:

``` bash
dfx ledger --help
```

It's worth checking out the `--help` flag of the subcommands as well.
`dfx` does not come with an ICP ledger instance installed by default. To be able to use this command you will need to install the ICP ledger locally. You can do that by following this [guide](./ledger-local-setup.md) or by installing the NNS locally:
``` bash
dfx extension install nns
dfx nns install
```
The ICP ledger will then run locally with the canister ID `ryjl3-tyaaa-aaaaa-aaaba-cai`.
Currently, `dfx` exposes only a subset of the ICP ledger functionality, namely `balance` and `transfer`.
Both commands provide a flag to specify a ledger canister id (`--ledger-canister-id`). This simplifies interacting with a local ledger deployment or other tokens that provide the same interface. If you do not specify the canister ID `dfx ledger` will assume you want to interact with a ICP ledger that has a canister ID of `ryjl3-tyaaa-aaaaa-aaaba-cai` or with the ICP ledger on the mainnet. For the latter, you need to specify the mainnet as the network of choice using the flag `--network ic`. 

:::info
Summary of different `dfx ledger` commands:
- `dfx ledger ...`: interact with the ICP ledger on your local network with canister ID `ryjl3-tyaaa-aaaaa-aaaba-cai`.
- `dfx ledger --network ic ...`: interact with the ICP ledger on the mainnet.
- `dfx ledger --ledger-canister-id <CANISTER_ID> ...`: interact with the [locally deployed](./ledger-local-setup.md) ICP ledger on your local network.
:::

### Balance

Get the ICP balance of a specific account:

``` bash
dfx ledger --network ic balance <account-id>
```

The `<account-id>` is encoded as a hex string. You can print the account id of the current `dfx` identity by running:

```bash
dfx ledger account-id
```

In many cases you want to check the main account balance of a specific principal. You can combine the `balance` command with the `account-id` command, while specifying an `--of-principal` argument to yield this helpful command:

``` bash
dfx ledger --network ic balance $(dfx ledger account-id --of-principal <principal-id>)
```

### Transfer

The transfer function can be used to transfer ICP from your account to another. 

``` bash
dfx ledger --network ic transfer --amount <amount> --memo <memo> <receiver-account-id>
```

## Interacting with ICP ledger via `dfx canister`
For this subsection it is assumed that you have deployed an ICP ledger either locally or you want to communicate with the mainnet ICP ledger using `dfx canister`. The ICP ledger canister ID is assumed to be `ryjl3-tyaaa-aaaaa-aaaba-cai`, if your locally deployed ICP ledger's canister ID is different you will need to replace `ryjl3-tyaaa-aaaaa-aaaba-cai` with it. You can find all endpoints that can be called in the `icp_ledger.did` file. How to retrieve it is discussed in the [ICP local deployment guide](./ledger-local-setup.md).

This guide will only go into the ICP ledger specific endpoints. To call the ICRC-1 endpoints you can have a look at [the ICRC-1 setup guide](/docs/developer-docs/integrations/icrc-1/interact-with-ICRC-1-ledger.md). To find a more detailed description of the data types used in these commands you can have a look at [this guide](/docs/current/references/ledger#_getting_ledger_blocks).

To fetch the symbol of the ICP ledger:
```
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai symbol '()' 
```
This command returns the ICP symbol:
```
(record { symbol = "ICP" })
```
To fetch the name of the ICP ledger:

```
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai name '()' 
```
This command returns the ICP name:
```
(record { name = "Internet Computer" })
```

To fetch the decimals of the ICP ledger:
```
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai decimals '()' 
```
This command returns the ICP decimals:
```
(record { decimals = 8 : nat32 })
```

To fetch the archives of the ICP ledger:
```
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai archives '()' 
```
This command returns the ICP archives. In this case no archives have been created so far:
```
(record { archives = vec {} })
```

To send tokens to the `AccountIdentifier` `d52f7f2b7277f025bcaa5c90b10d122274faba289` you can use the following commands. You will need to derive the `AccountIdentifier` by getting the principal first:
```
dfx ledger account-id --of-principal <PRINCIPAL>
```
You can get the principal of an identity by calling:
```
dfx identity get-principal --identity <IDENTITY>
```
If you have an identity called `default2` and you want to send ICP to this principals default `AccountIdentifier` you would call:
 ```
dfx identity get-principal --identity default2
```
This command will return:
```
sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe
```
If you plug this response value into the `account-id` command:
```
dfx ledger account-id --of-principal sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe
```
The following response will be returned:
```
d52f7f2b7277f025bcaa5c90b10d122274faba289
```
You can bring all of these commands together to form a transfer transaction:
```
export TO_ACCOUNT = "d52f7f2b7277f025bcaa5c90b10d122274faba2891bea519105309ae1f0af91d"
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai transfer '(record { to = $(python3 -c 'print("vec{" + ";".join([str(b) for b in bytes.fromhex("'$TO_ACCOUNT'")]) + "}")'); memo = 1:nat64; amount = record {e8s = 200_000_000 }; fee = record { e8s = 10_000 }; })'
```

This command returns the block index in which this transaction took place. In this example, it was the first block:
```
(variant { Ok = 1 : nat64 })
```
To get the balance of an `AccountIdentifier` you can call:
```
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai account_balance '(record { account = '$(python3 -c 'print("vec{" + ";".join([str(b) for b in bytes.fromhex("'$TO_ACCOUNT'")]) + "}")')' })'
```
It returns the the balance in e8s of the `AccountIdentifier` `d52f7f2b7277f025bcaa5c90b10d122274faba2891bea519105309ae1f0af91d`. It should have a balance of 200 million as thats the amount you sent earlier:
```
(record { e8s = 200_000_000 : nat64 })
```

To query the created blocks from the ICP ledger you can call:
```
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai query_blocks '(record {start = 1:nat64; length = 1:nat64})'
```

You will have to specify the first block to fetch and the number of blocks to fetch. 
This command will return output that resembles the following:

```
(
  record {
    certificate = opt blob "\d9\d9\f7\a2dtree\83\01\83\01\83\01\83\02Hcanister\83\01\83\01\82\04X \05\8f\12\83V\ad(\b6q\e6\0b\60\d2\90\97<\a0\8c~\ea\a9\18\13j\fe<\bbH\1a^n1\83\02J\80\00\00\00\00\10\00\01\01\01\83\01\83\01\83\01\83\02Ncertified_data\82\03X \f5}\c2M\a6\87\fe\03N9H/4?\bd\a8\1c\ad\ba\0b\86,\98\8dx)\11\b9=*\b7\eb\82\04X \83\c5k\f1M\de=(\def\c6\92\b5\fc\9d\97\e9\dd\98[j\d7+\0f\e6\f8N\8a\8d\f3\dc\b2\82\04X l\96\c1\d2D\fe\c00\d5S\f6N\0b4q]\9do\d7\a00\90\a0\8e\c03K\f6\f2hT\fe\82\04X \99i\83\c5\0b\0ec\02\dd\d9{r\a8\cb\7f?\f5\03\04\88\b1QC\d0\15\9eR\87\da(\d6\08\82\04X \97\c3\ef\e5\dc\efyN\1b\cd\d3\a1\c2\bbE\84y@\fc(\ec\87\cb5yk\ef\d74\b5\ef\cf\82\04X S\ebWak\00\b4#\a3\94I+\b0\9a\dc\11\b5\ff\1a\96\b0\a7\cede8\1b\b8\16\1d\14\dd\82\04X \13\c86\94\98\d9\ae)\a7\e4\f3\19\97\08\a2\dc\a5\a5(v\90\f8a\19rL\aa\09\0c\1b\d5\d5\83\01\82\04X \17+O\f52\a3\22\7f\87S\9bop\a6\18\b1\16\e1\1f\19\c2\9e\1f\ea:\df-\e47/\1d\e0\83\02Dtime\82\03I\90\f9\8e\d7\a0\88\b6\c4\17isignatureX0\aa6/\f2b\9a\c1%\98\f6\e32\e0\de\11\0e(\fe\f9=\b09z\be\a3\e7\8aG\d0:\18k\e0o\ed\f3\ba\d2\84\17yAAx\9cm\bf\06";
    blocks = vec {
      record {
        transaction = record {
          memo = 1 : nat64;
          icrc1_memo = null;
          operation = opt variant {
            Transfer = record {
              to = blob "\08.\cf.?dz\c6\00\f4?8\a6\83B\fb\a5\b8\e6\8b\08_\02Y+w\f3\98\08\a8\d2\b5";
              fee = record { e8s = 10_000 : nat64 };
              from = blob "\0amCu\816\9bTj\fd\efa<\a9\c0\81\a2R\ca,F\e7\ec)\e5\10\bc\10\b2\13\fa\27";
              amount = record { e8s = 200_000_000 : nat64 };
            }
          };
          created_at_time = record {
            timestamp_nanos = 1_695_815_275_230_210_000 : nat64;
          };
        };
        timestamp = record {
          timestamp_nanos = 1_695_815_275_230_210_000 : nat64;
        };
        parent_hash = opt blob "\e6{0\db\a6\a5)1\17@\9d\e7h\ee\85\b0\91h>l\a2\fdxi\d3;x\85\bf\e7\d0a";
      };
    };
    chain_length = 6 : nat64;
    first_block_index = 1 : nat64;
    archived_blocks = vec {};
  },
)
```

To only query the encoded blocks from the ICP ledger you can call:
```
dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai query_encoded_blocks '(record {start = 1:nat64; length = 1:nat64})'
```
It is a similar format but you will only receive the CBOR encoded block:
```
(
  record {
    certificate = opt blob "\d9\d9\f7\a2dtree\83\01\83\01\83\01\83\02Hcanister\83\01\83\01\82\04X \05\8f\12\83V\ad(\b6q\e6\0b\60\d2\90\97<\a0\8c~\ea\a9\18\13j\fe<\bbH\1a^n1\83\02J\80\00\00\00\00\10\00\01\01\01\83\01\83\01\83\01\83\02Ncertified_data\82\03X \f5}\c2M\a6\87\fe\03N9H/4?\bd\a8\1c\ad\ba\0b\86,\98\8dx)\11\b9=*\b7\eb\82\04X \83\c5k\f1M\de=(\def\c6\92\b5\fc\9d\97\e9\dd\98[j\d7+\0f\e6\f8N\8a\8d\f3\dc\b2\82\04X l\96\c1\d2D\fe\c00\d5S\f6N\0b4q]\9do\d7\a00\90\a0\8e\c03K\f6\f2hT\fe\82\04X \99i\83\c5\0b\0ec\02\dd\d9{r\a8\cb\7f?\f5\03\04\88\b1QC\d0\15\9eR\87\da(\d6\08\82\04X \97\c3\ef\e5\dc\efyN\1b\cd\d3\a1\c2\bbE\84y@\fc(\ec\87\cb5yk\ef\d74\b5\ef\cf\82\04X \aao\e5\85L\f7\0b\e3V\07\ed\27\88k\a5z\bd\abQ\aa=\dcc>m\0b\b1\88\ea\c8\f4\b7\82\04X \13\c86\94\98\d9\ae)\a7\e4\f3\19\97\08\a2\dc\a5\a5(v\90\f8a\19rL\aa\09\0c\1b\d5\d5\83\01\82\04X \17+O\f52\a3\22\7f\87S\9bop\a6\18\b1\16\e1\1f\19\c2\9e\1f\ea:\df-\e47/\1d\e0\83\02Dtime\82\03I\b8\c7\d9\f5\9a\8a\b6\c4\17isignatureX0\af\9e\c3\d1\e3\95\c8\1b\0c\b8\5cC\b0\fb\f9E\e0\eeJ\88\1f\e7%G\06\b8\ac\a4\14{\e1k\97\15\8d\8a0\c6\9d\86\a1\03\ef\02\b7\82A\f9";
    blocks = vec {
      blob "\0a\22\0a \e6{0\db\a6\a5)1\17@\9d\e7h\ee\85\b0\91h>l\a2\fdxi\d3;x\85\bf\e7\d0a\12\0a\08\d0\cf\9c\e6\a0\e0\af\c4\17\1af\1aT\0a\22\0a \0amCu\816\9bTj\fd\efa<\a9\c0\81\a2R\ca,F\e7\ec)\e5\10\bc\10\b2\13\fa\27\12\22\0a \08.\cf.?dz\c6\00\f4?8\a6\83B\fb\a5\b8\e6\8b\08_\02Y+w\f3\98\08\a8\d2\b5\1a\05\08\80\84\af_\22\03\08\90N\22\02\08\012\0a\08\d0\cf\9c\e6\a0\e0\af\c4\17";
    };
    chain_length = 6 : nat64;
    first_block_index = 1 : nat64;
    archived_blocks = vec {};
  },
)
```

## Interact with ICP ledger from your web application

In order to simplify working with ICP ledger from JavaScript applications, you can use the [nns-js library](https://github.com/dfinity/nns-js).
To interact with the ICRC-1 endpoints of the ICP ledger you can have a look at the guide on [interacting with an ICRC-1 ledger](/docs/developer-docs/integrations/icrc-1/interact-with-ICRC-1-ledger.md).
## Interacting with ICP from a canister (inter-canister calls via `ic-cdk`)
You can look at the documentation of [inter-canister calls] (/docs/developer-docs/backend/rust/intercanister) to see how you can interact with the another canister from inside a canister. This guide will give you a couple of examples on how to make such a call in the case of the ICP ledger.

Here is an example on how fetch the name from the ICP ledger using Rust and the `ic-cdk` [library](https://github.com/dfinity/cdk-rs) from withing a canister:
```
// You will need the principal of the ICP ledger. The canister id of the ICP ledger on mainnet and the dfx default ICP ledger locally is `ryjl3-tyaaa-aaaaa-aaaba-cai`. 
let ledger_id = Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap();
// The request object of the `icrc1_name` endpoint is empty.
    let req = ();
    let (res,): (String,) =
        ic_cdk::call(ledger_id, "icrc1_name", (req,))
            .await.unwrap();
```

For all other endpoints you can use the request and response structure from the `ledger.did` Candid file. How to retrieve the Candid file is explained in [the guide on deploying an ICP ledger locally](./ledger-local-setup.md). 

### `icrc-ledger-types` Rust crate
As explained in the introduction of the [ledgers and tokens section](./introduction_and_overview.md), the ICP ledger supports all ICRC-1 endpoints. You will need to define the structures used for these endpoints. 
To interact with ICRC-1 and ICRC-2 endpoints, the Rust crate [icrc-ledger-types](https://crates.io/crates/icrc-ledger-types) can be used. 
This is true for the ICP ledger as well as any other canister that supports ICRC-1 or any of the ICRC-1 extension standards (i.e ICRC-2, ICRC-3,...). 
The crate can be installed with the command:

```
cargo add icrc-ledger-types
```

Or, it can be added to the `Cargo.toml` file:

```
icrc-ledger-types = "0.1.1"
```

The documentation for this crate can be found [here](https://docs.rs/icrc-ledger-types/0.1.1/icrc_ledger_types/). 


### Receiving ICP

If you want a canister to receive payment in ICP you need to make sure that the canister knows about the payment, because a transfer only involves the sender and the ledger canister.

There are currently two main patterns to achieve this. Furthermore, there is a [chartered working group](https://forum.dfinity.org/t/announcing-technical-working-groups/11781) on Ledger & Tokenization which is focused on defining a standard ledger/token interface as well payment flows.

#### Direct notification by sender

In this pattern the sender notifies the receiver about the payment. However, the receiver needs to verify the payment by using the [`query_blocks` interface](/docs/current/references/ledger#_getting_ledger_blocks) of the ledger.
The following diagram shows a simplified illustration of this pattern:

```plantuml
    participant Sender
    participant "ICP Ledger"
    participant Receiver
    
    Sender -> "ICP Ledger": transfer()
    "ICP Ledger" --> Sender: blockNumber
    Sender -> Receiver: notify(blockNumber)
    Receiver -> "ICP Ledger": query_blocks(blockNumber)
    "ICP Ledger" --> Receiver: block
    Receiver -> Receiver: verify payment
```


#### Notification by ICP ledger (currently disabled)

In this pattern the ledger itself notifies the receiver. Thereby, the receiver can trust the notification immediately. However, this flow is currently disabled because the call to the receiver is not yet implemented as a one-way call. 

```plantuml
    participant Sender
    participant "ICP Ledger"
    participant Receiver
    
    Sender -> "ICP Ledger": transfer()
    "ICP Ledger" --> Sender: blockNumber
    Sender -> "ICP Ledger": notify(blockNumber, receiver)
    "ICP Ledger" -> "Receiver": transaction_notification(details)
```
