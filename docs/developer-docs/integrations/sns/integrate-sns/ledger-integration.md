# Ledger canister

The ledger canister keeps track of the transactions between accounts.

## Initialisation

The index canister initialisation requires the following 
parameters to be initialized:

```
type InitArgs = record {
    minting_account : Account;
    transfer_fee : nat64;
    token_symbol : text;
    token_name : text;
    metadata : vec record { text; Value };
    initial_balances : vec record { Account; nat64 };
    archive_options : record {
        num_blocks_to_archive : nat64;
        trigger_threshold : nat64;
        max_message_size_bytes : opt nat64;
        cycles_for_archive_creation : opt nat64;
        node_max_memory_size_bytes : opt nat64;
        controller_id : principal;
    };
};
```

Example with `dfx`:

```shell
dfx deploy icrc1-ledger --argument "(record {
    token_symbol = \"ABC\";
    token_name = \"My example token\";
    minting_account = record { owner = principal \"rrkah-fqaaa-aaaaa-aaaaq-cai\" };
    transfer_fee = 10_000;
    metadata = vec {};
    initial_balances = vec {};
    archive_options = record {
        num_blocks_to_archive = 10_000;
        trigger_threshold = 20_000;
        controller_id = principal \"rrkah-fqaaa-aaaaa-aaaaq-cai\";
        cycles_for_archive_creation = opt 4_000_000_000_000;
    };
})"
```

## Usage

Here are the supported methods from the ledger canister:

```
icrc1_name : () -> (text) query;
icrc1_symbol : () -> (text) query;
icrc1_decimals : () -> (nat8) query;
icrc1_metadata : () -> (vec record { text; Value }) query;
icrc1_total_supply : () -> (Tokens) query;
icrc1_fee : () -> (Tokens) query;
icrc1_minting_account : () -> (opt Account) query;
icrc1_balance_of : (Account) -> (Tokens) query;
icrc1_transfer : (TransferArg) -> (TransferResult);
icrc1_supported_standards : () -> (vec record { name : text; url : text }) query;
```

## Candid reference file

Please check the [Candid file](https://gitlab.com/dfinity-lab/public/ic/-/blob/master/rs/rosetta-api/icrc1/ledger/icrc1.did) of the ledger canister for the interface details.


