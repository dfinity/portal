# Account trimming

## Overview
Even if the ledger can index a large number of accounts, it has a finite capacity.
To avoid saturation and maintain good performance,
some accounts are trimmed if the ledger capacity is reaching a threshold.
This mechanism prevents dust (i.e. accounts with balance too small to be spent) from accumulating in the ledger.

## Trimming mechanism

While inserting a transaction, if the number of indexed accounts exceeds a given threshold,
a fixed number of accounts with the lowest balance will be trimmed from the ledger.
The balance of each of these trimmed accounts will also be deleted
(a burn transaction block will be added to the chain for each of these accounts).

## Example

For the SNS ledger, the threshold is currently set a 28 million accounts for the ledger, plus 100_000 for the
trim quantity.
Therefore, if adding a transaction lead to index more than 28.1 M accounts, the 100_000 accounts with the lowest
balance will be trimmed and their balance burned.
