# Index Canister

The index canister keeps track of each transaction stored by the 
[ledger canister](ledger-integration.md).

At each heartbeat, the index canister will query the transactions from
the ledger canister, then build the index
of known transaction per account.

## Initialisation

The index canister initialisation requires the principal
of the ledger canister to index:

```
type InitArgs = record {
ledger_id : principal;
};
```

Example with `dfx`:

```shell
dfx deploy icrc1-index --argument "(record {
      ledger_id = principal \"rrkah-fqaaa-aaaaa-aaaaq-cai\"
    }
)"
```

## Usage

The provided methods are:

```
get_account_transactions : (GetAccountTransactionsArgs) -> (GetTransactionsResult);
```
Return the transactions for a given account.

```
ledger_id : () -> (principal) query;
```
Return the principal of the ledger canister being indexed.

```
list_subaccounts : (ListSubaccountsArgs) -> (vec SubAccount) query;
```
List all indexed subaccounts for a principal.

## Candid reference file

Please check the [Candid file](https://gitlab.com/dfinity-lab/public/ic/-/blob/master/rs/rosetta-api/icrc1/index/index.did) of the index canister for the interface details.
