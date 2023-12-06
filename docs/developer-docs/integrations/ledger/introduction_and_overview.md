# Introduction and overview

## Overview
Ledgers are used to record transactions in a chain of blocks. One block references its parent block forming a blockchain that is immutable without changing all previous blocks in the chain. 
The Internet Computer Protocol utilizes two different types of ledgers. The first ledger is the ICP ledger. It is part of the [NNS](/tokenomics/nns/nns-intro.md) and the canister that implements
the ICP ledger is running on the NNS subnet. The second type of ledger are the ICRC-1 ledgers. In this overview, both ledger types
will be explained and their differences will be highlighted. 

## ICP ledger
The main purpose of the ICP ledger is to record `burn`, `mint` and most commonly `transfer` transactions with regards to ICP's native [token](/docs/concepts/tokens-cycles.md) `ICP`.
The ICP ledger canister services transaction requests and offers a variety of endpoints to fetch data and information about the state of the ICP ledger.
There is only one ICP ledger on the Internet Computer. 

## ICRC-1 ledgers

ICRC stands for `Internet Computer request for comments` and is a working group for various topics on the Internet Computer. The documentation of ICRC can be found [here](https://github.com/dfinity/ICRC).
The working group has released a standard for new tokens on the Internet Computer Protocol. To create a new token, one requires a ledger to record all transactions made with this token. This is where the ICRC-1 standard comes in. 
ICRC-1 is a standard created by the Internet Computer Protocol working group that defines the general functionalities of ledgers. All tokens and their corresponding ledgers that wish to support this standard have to fulfill all requirements
specified in the standard. You can find a detailed description of the ICRC-1 standard [here](https://github.com/dfinity/ICRC-1/blob/main/standards/ICRC-1/README.md).

In addition to the ICRC-1 standard, there have been discussions around further specifications and functionalities. As the result of these discussions,  an extension of the ICRC-1 standard called [ICRC-2](https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-2) has been created. It deals with `approve` and `transfer_from` transactions, which is a concept that has seen wide adoption among other token standards. 
There may be further standards that serve as extensions to the ICRC-1 standard, however, not all ICRC standards necessarily have to be extensions of ICRC-1. 

The purpose of the ICRC-1 ledger is to create a universally accepted standard for making and recording transactions for tokens on the Internet Computer Protocol. 

## The difference between the ICP ledger and ICRC-1 ledgers
The biggest difference between the ICP and ICRC-1 ledgers is that the ICP ledger is a specific implementation of a ledger, which at first followed no official standard. It had existed before ICRC-1 had been discussed or created. 
ICRC-1 on the other hand is a standard, not a specific implementation of some ledger. There is a [reference implementation](https://github.com/dfinity/ic/tree/master/rs/rosetta-api/icrc1/ledger) created by the DFINITY Foundation, but there may be different ICRC-1 ledgers with different implementations that
all follow the same standard. The ICRC-1 reference implementation and the ICP ledger share a lot of similarities. However, they do have different endpoints, different transaction and block objects and quite a few other, more subtle, differences. 


## `Account`s vs `AccountIdentifier`s

The biggest and most important difference between the ICP ledger and the ICRC-1 standard (and thus its reference implementation) is how they define accounts. Both are account-based but the ICRC-1 standard [specifies](https://github.com/dfinity/ICRC-1/blob/main/standards/ICRC-1/README.md#account) `Accounts` as a struct that contains a `principal` and an optional `subaccount`.
The ICP ledger uses `AccountIdentifiers` as its account representation. You can find a detailed description of `AccountIdentifier` [here](https://mmapped.blog/posts/13-icp-ledger#account-id). An `AccountIdentifier` essentially is a hash of the ICRC-1 `Account`. An `Account` can thus be converted into an `AccountIdentifier` but not the other
way around. This provides the benefit of providing a certain degree of anonymity to the ICP ledger, but it also means that the ICP ledger can never have the same internal representation as ICRC-1 ledgers. 

In an attempt to comply with the ICRC-1 standard, the ICP ledger implements all endpoints defined in the ICRC-1 standard. However, this does not mean that the ICP ledger is an ICRC-1 ledger. The ICRC-1 standard clearly defines how accounts should be represented.
The ICP ledger, due to its use of `AccountIdentifiers`, cannot fulfill this requirement. The ICP ledger successfully implements all ICRC-1 endpoints and they can be used for any other ICRC-1 endpoint. 
Should a future ICRC-1 extension standard or the use of index canisters result in the exposure of the internal representation of accounts, any ICRC-1 ledger will deviate from the ICP ledger. 

## Index canisters
The ICP ledger lets you query created blocks through various endpoints. See the documentation on [how to interact with the ICP ledger for more info](./interact-with-ledger.md). If your ICRC-1 ledger supports the extension standard ICRC-3, then your ICRC-1 ledger will have an endpoint to serve transactions. 

However, if you want to fetch transactions for a specific `Account` or `AccountIdentifier` you would have to first query all blocks/transactions from the ICP or an ICRC-1 compatible ledger and then search through them for transactions in which an `Account` or `AccountIdentifier` was involved in. To solve this issue index canisters exist. The index canisters allow for querying of transaction lists for a specific account. Furthermore, they offer endpoints for querying the current balance of an account and you can also fetch blocks from one of their endpoints. 

There are two different types of index canisters, one for the [ICP ledger](./icp-index-local-setup.md) and one for [ICRC-1 compatible ledgers](/docs/developer-docs/integrations/icrc-1/icrc1-index-setup.md). Due to the previously mentioned difference between the ICP ledger and ICRC-1 ledgers, these two index canisters do not use identical endpoints. Since one uses `Account` and the other uses `AccountIdentifier` as an internal representation of accounts, the returned transactions will differ in this regard. 

The ICP index canister is running on the NNS subnet with the canister ID [qhbym-qaaaa-aaaaa-aaafq-cai](https://dashboard.internetcomputer.org/canister/qhbym-qaaaa-aaaaa-aaafq-cai). As there are multiple ICRC-1 compatible ledgers, there will also be multiple ICRC-1 index canisters. For example, the ICRC-1 ledger recording ckBTC transactions is running under the canister ID [n5wcd-faaaa-aaaar-qaaea-cai](https://dashboard.internetcomputer.org/canister/n5wcd-faaaa-aaaar-qaaea-cai). 

