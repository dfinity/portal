# SNS cycle management

## Why you need to observe the SNS canister's cycles
In first version of SNS, cycles have to be maintained 
  1) manually = someone has to actively send cycles to the 
     canister
  2) for each individual SNS canister = this has to be repeated
for each individual canister in the SNS
3) also for dapp canistesr (But this is nothing new)

If governance or ledger un out of cycles, might lose canisters and
thus DAO.

:::danger
An SNS community must ensure that all SNS and dapp canisters
have sufficient
cycles by manually sending cycles when necessary to
**each individual SNS canister**.
:::


For most canisters, you know they exist as the SNS is already 
initiated with them or has explicitly added them.
One exception are archive canisters of the ledger canister.
The purpose of archive canisters is to store blocks of ledger
    want to keep all blocks
    canister has limited storage
    => do in separate canister
This means that at some point ledger will create archive
When this happens, the ledger takes XX cycles from its current
cycle balance and creates the archive with these XX cycles.
XX is set by the SNS-W when the ledger canister is first 
initialized (TODO: verify).
This specifically means that when an archive is created then
1) there is a new canister whose cycle balance has to be managed
2) the ledger cycles balance decreases by a lot at once

:::danger
SNS communities should be aware that there are SNS canisters
that are automatically created by the SNS, notably the archive
canisters that are spawn by the ledger canister.
The cycles balance of these canister also have to be managed.
If an archive canister is spawn and runs out of cycles,
ledger blocks might be lost.
:::

Good news is that 
* at least SNS canisters are started with already a good number
of cycles (namely XX)
  
* the SNS ledger is started with 2*XX such that when the first 
archive is spawn, both should have enough cycles for a while

In more detail to learn about current canister and their cycles
balance, and to top the cycle up if needed, you can follow
these steps.

## How you can observe and manage the SNS canister's cycles

### 1. Find all SNS and governed dapp canisters and their cycle balance
SNS root knows about all the SNS canisters.
   Make a call
   I think principal does not matter (TODO: verify)
   
How to intepret the result

### 2. Send new cycles to a given canister
If learn that one of SNS or dapp canisters runs low on cycles,
can top up the canisters as described here 
(TODO)

To do this, you need a wallet with sufficient cycles.
In an SNS, can look for people who donate cycles in this way.
Otherwise, can make a proposal that transfers
treasury payment to an individual who is 
trusted to do this with the funds that SNS has already collected.
To make such a proposal, you can do the following
TODO

## Helpful community tools
- Is referring to community tools sth that we do? (think it would be nice)
Ask authors of tools for permission

## The (possible) future of cycles management
As mentioned, this is just first version.
two enhancements that wil probably be done in the future

1) canister groups to facilitate managing cycles of groups of
canisters rather than of individual cansiters
   
2) SNS enhancements that automate some cycle management:
e.g., take ICP from treasury, automatically convert it to cycles
   and top up,