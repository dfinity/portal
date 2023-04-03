# SNS Index Canister

The index canister fetches transactions from the [ledger canister](ledger-integration.md) and indexes them by Account. 
It allows to query the transactions of an Account in descending order from the ledger chain, and the list of Account that belongs to a Principal. 
An index canister is always deployed as part of the SNS canisters.

This canister is useful for applications that want to show the transactions of a specific account.

Regularly (at each heartbeat), the index canister will query the transactions from
the ledger canister and then build the index of known transaction per account.

## Initialisation

This sections explains how to deploy an index canister in isolation.
You can also deploy a full SNS, which will be deployed with an SNS index canister.

The index canister initialisation requires the principal
of the ICRC-1 ledger canister to index:

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
Transactions are returned in descending id order.
Optionally, the user can specify a starting transaction id allowing to only query for transactions before this id. If no start is specified, the last transaction is used.

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
