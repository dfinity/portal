# SNS Ledger Canister

The SNS ledger canister keeps track of the transactions between accounts,
as well as the account balances at the last block of the chain.
A ledger canister is always deployed as part of the SNS canisters. 
The ledger canister follows the [ICRC-1](https://github.com/dfinity/ICRC-1) specification.

## Initialisation

This sections explains how to deploy a ledger canister in isolation.
You can also deploy a full SNS, which will be deployed with a ledger canister.

The index canister initialisation requires the following parameters to be initialized:

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
```
Returns the name of the token (e.g., MyToken).

```
icrc1_symbol : () -> (text) query;
```
Returns the symbol of the token (e.g., ICP).

```
icrc1_decimals : () -> (nat8) query;
```
Returns the number of decimals the token uses (e.g., 8 means to divide the token amount by 100000000 to get its user representation).

```
icrc1_metadata : () -> (vec record { text; Value }) query;
```
Returns the list of metadata entries for this ledger. 

```
icrc1_total_supply : () -> (Tokens) query;
```
Returns the total number of tokens on all accounts except for the minting account.

```
icrc1_fee : () -> (Tokens) query;
```
Returns the default transfer fee.

```
icrc1_minting_account : () -> (opt Account) query;
```
Returns the minting account if this ledger supports minting and burning tokens.

```
icrc1_balance_of : (Account) -> (Tokens) query;
```
Returns the balance of the account given as an argument.

```
icrc1_transfer : (TransferArg) -> (TransferResult);
```
Transfers some tokens between two accounts. The caller pays the fees for the transfer.

```
icrc1_supported_standards : () -> (vec record { name : text; url : text }) query;
```
Returns the list of standards this ledger implements.

## Candid reference file

Please check the [Candid file](https://gitlab.com/dfinity-lab/public/ic/-/blob/master/rs/rosetta-api/icrc1/ledger/icrc1.did) of the ledger canister for the interface details.


