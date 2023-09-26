---
sidebar_position: 3
---
# SNS index canister
## Overview
The index canister fetches transactions from the [ledger canister](ledger-integration.md) and indexes them by **account**. 
It allows to query the transactions of an account in descending order from the ledger chain, and the list of accounts that belongs to a **principal**. 
An index canister is always deployed as part of an SNS project.

This canister is useful for applications that want to show the transactions of a specific account.

Regularly (at each heartbeat), the index canister will query the transactions from
the ledger canister and then build the index of known transaction per account.

<!-- TODO: Update Link to ICRC-1 index canister -->
