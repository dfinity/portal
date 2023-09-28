# Interacting with a ICRC-1 ledger

## Overview
There are two main ways to interact with an ICRC-1 ledger.
- `dfx canister`: the generic canister call from `dfx`.
- `ic-cdk`: inter-canister calls for the ICRC-1 ledger.
- `ledger-js`: a library for interfacing with ICRC-1 ledger on the Internet Computer.
## Example commands for the ICRC-1 endpoints

Whether your ICRC-1 ledger will have all the endpoints discussed in this tutorial will depend on whether you support any of the extensions of ICRC-1(ICRC-2, ICRC-3,...). 
This tutorial will go through the endpoints for ICRC-1. 

You can always check which standards are supported by a certain ICRC-1 ledger by calling:

```
dfx canister call icrc1_ledger_canister icrc1_supported_standards '()' 
```

If your ICRC-1 ledger only supports ICRC-1, the return value will be:

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

The return values in this tutorial are specific to the deployed ICRC-1 ledger and thus may differ to your return values, depending on which values you chose during your [ICRC-1 ledger setup](./icrc1-ledger-setup.md). 

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

To fetch the of a account (DEFAULT account in this case, with no subaccount set) on the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_transfer "(record {owner = principal \"${DEFAULT}\"; })"  
```

This command returns:

```
(10_000_000_000 : nat)
```

Transfering of tokens (from `DEFAULT` to the arbitrary principal `sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe`) on the ICRC-1 ledger:

```
dfx canister call icrc1_ledger_canister icrc1_transfer "(record { to = record { owner = principal \"sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe\";};  amount = 10_000;})"
```

This command returns:

```
(variant { Ok = 1 : nat })
```

## Interacting with an ICRC-1 ledger from another canister (inter-canister calls via `ic-cdk`)
You can look at the documentation of [inter-canister calls] (/docs/developer-docs/backend/rust/intercanister) to see how you can interact with the another canister from inside a canister. This guide will give you a couple of examples on how to make such a call in the case of the ICRC-1 ledger.

Here is an example on how fetch the name from the ICRC-1 ledger using Rust and the `ic-cdk` [library](https://github.com/dfinity/cdk-rs) from withing a canister:
You will need the principal of the ICRC-1 ledger. For this guide we will take the canister ID that was used in the previous guide on [deploying an ICRC-1 ledger](./icrc1-ledger-setup.md), which was `mxzaz-hqaaa-aaaar-qaada-cai`.
```
let ledger_id = Principal::from_text("mxzaz-hqaaa-aaaar-qaada-cai").unwrap();
// The request object of the `icrc1_name` endpoint is empty.
    let req = ();
    let (res,): (String,) =
        ic_cdk::call(ledger_id, "icrc1_name", (req,))
            .await.unwrap();
```

For all other endpoints you can use the request and response structure from the `ledger.did` Candid file. How to retrieve the Candid file is explained in [the guide on deploying an ICP ledger locally](./ledger-local-setup.md). 

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

## Interacting with an ICRC-1 ledger from you web application (`ledger-js`)
You will find specifications and examples on how to use the library to interact with ICRC-1 ledgers [here](https://github.com/dfinity/ic-js/tree/main/packages/ledger).
