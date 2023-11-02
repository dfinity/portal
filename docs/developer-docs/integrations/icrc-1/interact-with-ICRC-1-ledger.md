# Interacting with a ICRC-1 ledger

## Overview
There are two main ways to interact with an ICRC-1 ledger.
- `dfx canister`: the generic canister call from `dfx`.
- `ic-cdk`: inter-canister calls for the ICRC-1 ledger.
- `ledger-icrc-js`: a library for interfacing with ICRC-1 ledger on the Internet Computer.
## ICRC-1 and ICRC-1 extension endpoints

Whether your ICRC-1 ledger will have all the endpoints discussed in this tutorial will depend on whether you support any of the extensions of ICRC-1 (ICRC-2, ICRC-3,...). 
This tutorial will go through the endpoints for ICRC-1 and the extension ICRC-2. If you have deployed an ICRC-1 ledger according to the [guide](./icrc1-ledger-setup.md) you have to make sure that you have enabled ICRC-2 standard. Otherwise these calls will not work. 

You can always check which standards are supported by a certain ICRC-1 ledger by calling:

```
dfx canister call icrc1_ledger_canister icrc1_supported_standards '()' 
```

The ICRC-1 ledger used in this guide also supports the extension ICRC-2:

```

(
  vec {
    record {
      url = "https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-1";
      name = "ICRC-1";
    };
    record {
      url = "https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-2";
      name = "ICRC-2";
    };
  },
)
```

The return values as well as the canister name `icrc1_ledger_canister` in this tutorial are specific to the deployed ICRC-1 ledger and thus may differ to your return values, depending on which values you chose during your [ICRC-1 ledger setup](./icrc1-ledger-setup.md). 

### ICRC-1 endpoints

To fetch the symbol of the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_symbol '()' 
```

This command returns:

```
("XMTK")
```

To fetch the decimals of the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_decimals '()' 
```

This command returns:

```
(8 : nat8)
```

To fetch the metadata of the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_metadata '()' 
```

This command returns:

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

To fetch the total supply of the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_total_supply '()' 
```

This command returns:

```
(10_000_000_000 : nat)
```

To fetch the fee of the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_fee '()' 
```

This command returns:

```
(10_000 : nat)
```

To fetch the minting account of the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_minting_account '()' 
```

This command returns:

```
(
  opt record {
    owner = principal "rrd6e-uoar3-ehz42-jxkun-ymmmv-jw4rn-re7se-5hymk-aoizl-bfb3j-uqe";
    subaccount = null;
  },
)
```

To fetch the balance of an account (DEFAULT account in this case, with no subaccount set) on the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {owner = principal \"${DEFAULT}\"; })"  
```

This command returns:

```
(10_000_000_000 : nat)
```

Transferring of tokens (from `DEFAULT` to the arbitrary principal `sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe`) on the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_transfer "(record { to = record { owner = principal \"sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe\";};  amount = 10_000;})"
```

This command returns:

```
(variant { Ok = 1 : nat })
```

### ICRC-2 endpoints

To approve tokens to a certain spender (this guide uses the principal `sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe`) you can call:
```
dfx canister call icrc1_ledger_canister icrc2_approve "(record { amount = 100_000; spender = record{owner = principal \"sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe\";} })"  
```

This command returns the block index of the transaction. Since this is the second transaction the index will be 2:

```
(variant { Ok = 2 : nat })
```

To check the allowance of the spender `sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe` from the previous command you can call:
```
dfx canister call icrc1_ledger_canister icrc2_transfer_from "(record { account = record{owner = principal \"${DEFAULT}\";}; spender = record{owner = principal \"sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe\";} })"  
```

This command will return the allowance of `sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe` for tokens approved by the `DEFAULT` principal. You should expect this to be the `100_000` tokens you approved earlier:
```
(record { allowance = 100_000 : nat; expires_at = null })
```
Alternatively, you can also set the expiration date for an approval. For specifics on see the [ICRC-2 standard](https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-2#icrc2_approve).

If the spender now wants to transfer tokens that were previously approve for the spender to a certain principal (in this case, use the arbitrary principal `7tmcj-ukheu-y6dvi-fhmxv-7qs5t-lwgh2-qzojr-vzt6m-maqv4-hvzlg-5qe`) you can call: 
```
dfx canister call icrc1_ledger_canister icrc2_transfer_from "(record { amount = 90_000; from = record{owner = principal \"${DEFAULT}\"}; to= record{owner = principal \"${DEFAULT}\"}; })"  
```
Note that you cannot transfer the entire allowance as the fee for making a transfer has to be substracted from the transferred amount. For the reference implementation the fee is `10_000` tokens. Thus, the maximum amount that can be transferred from `DEFAULT` to `7tmcj-ukheu-y6dvi-fhmxv-7qs5t-lwgh2-qzojr-vzt6m-maqv4-hvzlg-5qe` with the spender `sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe` is `90_000`.
The principal making this call has to be the spender, since they are the once that received the approval. 
You will receive the block index as a return value:
```
(variant { Ok = 3 : nat })
```

## Interacting with an ICRC-1 ledger from another canister (inter-canister calls via `ic-cdk`)
You can look at the documentation of [inter-canister calls](/docs/current/developer-docs/backend/rust/intercanister) to see how you can interact with the another canister from inside a canister. This guide will give you a couple of examples on how to make such a call in the case of the ICRC-1 ledger.

Here is an example on how fetch the name from the ICRC-1 ledger using Rust and the `ic-cdk` [library](https://github.com/dfinity/cdk-rs) from withing a canister:
You will need the principal of the ICRC-1 ledger. For this guide,  take the canister ID that was used in the previous guide on [deploying an ICRC-1 ledger](./icrc1-ledger-setup.md), which was `mxzaz-hqaaa-aaaar-qaada-cai`.
```
let ledger_id = Principal::from_text("mxzaz-hqaaa-aaaar-qaada-cai").unwrap();
// The request object of the `icrc1_name` endpoint is empty.
    let req = ();
    let (res,): (String,) =
        ic_cdk::call(ledger_id, "icrc1_name", (req,))
            .await.unwrap();
```

For all other endpoints you can use the request and response structure from the `ledger.did` Candid file. How to retrieve the Candid file is explained in [the guide on deploying an ICRC-1 ledger locally](./icrc1-ledger-setup.md). 

### `icrc-ledger-types` Rust crate
To interact with ICRC-1 and ICRC-2 endpoints, the Rust crate [icrc-ledger-types](https://crates.io/crates/icrc-ledger-types) can be used. I provides data types, request types and response types as well as error types needed for interacting with ICRC-1 endpoints.
This is true for any canister that supports ICRC-1 or any of the ICRC-1 extension standards (i.e ICRC-2, ICRC-3,...). 
The crate can be installed with the command:

```
cargo add icrc-ledger-types
```

Or, it can be added to the `Cargo.toml` file:

```
icrc-ledger-types = "0.1.1"
```

The documentation for this crate can be found [here](https://docs.rs/icrc-ledger-types/0.1.1/icrc_ledger_types/). 

## Interacting with an ICRC-1 ledger from your web application (`ledger-icrc-js`)
You will find specifications and examples on how to use the library to interact with ICRC-1 ledgers [here](https://github.com/dfinity/ic-js/tree/main/packages/ledger-icrc).
