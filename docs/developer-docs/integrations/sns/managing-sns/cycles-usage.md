# SNS cycle management

## The need to observe the canisters' cycles
:::danger
An SNS community must ensure that all SNS and dapp canisters
have sufficient cycles by manually sending cycles when necessary to
**each individual SNS canister**.
:::

1. _Manually_ means that someone has to monitor the cycles of the
   canisters and actively make calls to send additional cycles to them
   when the canisters' cycles balance get low.
   
2. This process has to be repeated for _each indiviudal SNS canister_ 
and also for _each dapp canister_.
   
At least the latter is not new to developers who built a dapp on the IC.
Nevertheless, we want to underline the importance of this in the context
of an SNS: If the SNS goverannce or SNS ledger canister run out of cycles
and get deleted, this is of course catastrophic as users loose their
liquid and staked tokens and as the dapp canisters cannot be goverend
anymore.

### Cycles in the archive canisters
The SNS community should be aware of most SNS and associated dapp 
canisters as either the SNS is initiated with them or as they are
explicitly added.
One exception are the _archive canisters_ of the ledger canister.
Due to limited storage, the ledger cannot keep all blocks forever and
thus it spawns separate archive canisters to do so.
The ledger spawning a new archive affects the cycles as follows:
The ledger takes a predefined number _X_ of cycles from its current
cycle balance and creates the archive with these _X_ cycles as the
initial balance. The number _X_ is set when the SNS ledger canister is 
first initialized.<!--(TODO: verify)-->

This specifically means that SNS communities should be aware of the
following:
:::danger
The SNS ledger canister automatically spawns new archive
canisters.
When this happens, the cycles balance of these canisters also have
to be managed and
the ledger cycles balance decreases by a significat amount.
If an archive canister is spawn and runs out of cycles,
ledger blocks might be lost.
:::

To help SNS communities manage cycles, the SNS is initiated as follows:
* SNS canisters are started with already a large number of cycles,
  namely XX <!-- TODO-->
* the SNS ledger is started with 2*XX cycles such that when the first 
archive is spawn, both should have roughtly X cycles.


## How to observe and manage the canisters' cycles
We next describe in more detail how you acn monitor and manage the
cycles of the SNS and dapp canisters.

### 1. Find all SNS and governed dapp canisters and their cycle balance.
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