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
of an SNS: If the SNS governance or SNS ledger canister run out of cycles
and get deleted, this is of course critical as users loose their
liquid and staked tokens and as the dapp canisters cannot be governed
anymore.
Also, as the SNS canisters are owned by a community, some
coordination might be needed to ensure that some individuals
feel responsible for these steps.

### Cycles in the archive canisters
The SNS community should be aware of most SNS and associated dapp 
canisters are either installed when the SNS is initiated or they are
explicitly added to the SNS by a proposal.
One exception are the _archive canisters_ of the ledger canister.
Due to limited storage, the ledger cannot keep all blocks forever and
thus it spawns separate archive canisters to do so.
The ledger spawning a new archive affects the cycles as follows:
The ledger takes a predefined number _X_ of cycles from its current
cycle balance and creates the archive with these _X_ cycles as the
initial balance. The number _X_ is set when the SNS ledger canister is 
first initialized.

This specifically means that SNS communities should be aware of the
following:
:::danger
The SNS ledger canister automatically spawns new archive
canisters.
When this happens, the cycles balance of these new canisters has
to be managed. The ledger's cycles balance decreases by a 
significat amount if a new archive is spawned.
If an archive canister runs out of cycles,
ledger blocks might be lost.
:::

To help SNS communities manage cycles, the SNS is initiated as follows:
* SNS canisters are started with already a large number of cycles,
  namely 180T
* the SNS ledger is started with 60T (2*30T) cycles such
  that when the first archive is spawn,
  both should have roughly 30T cycles (as have all other SNS
  canisters when they are installed).


## How to observe and manage the canisters' cycles
We next describe in more detail how you can monitor and manage the
cycles of the SNS and dapp canisters.

### 1. Find all SNS and governed dapp canisters and their cycle balance.
SNS root knows about all these canisters and their cycles. 
You can get all the SNS and associated dapp canisters' status,
which includes the cycles, by using the SNS root canister's method
`get_sns_canisters_summary`.
<!-- dfx, dashboard?-->

### 2. Send new cycles to a given canister
If the first step shows that one of SNS or dapp canisters runs 
low on cycles, you can top up the canister's cycles.
<!-- as follows
dfx,
dashboard?-->

To do this, you need a wallet with sufficient cycles.
In an SNS, can look for people who donate cycles in this way.
Otherwise, you can make a proposal that transfers some ICP
from the SNS treasury to an individual who is 
trusted to convert these to cycles and make such payments.
<!--You can create such a proposal as follows TODO-->

<!--## Helpful community tools
- Is referring to community tools sth that we do? (think it would be nice)
Ask authors of tools for permission
-->

## The (possible) future of cycles management
As this page shows, the current management of cycles is 
quite some work.
Therefore the community is thinking about some enhancements
might be added in the future. Some examples are:

1) Canister groups: Canister groups would allow to manage
   the cycles for groups of canisters rather than for
   individual cansiters. If all SNS and SNS-governed dapp
   canister could be in the same group, this might considerably
   simplify SNS cycles management.  
   
2) SNS enhancements to automate some cycle management: It is 
conceivable that the task of taking ICP from the SNS's treasury,
   converting them to cycles, and sending those cycles to the 
   SNS canisters can be automated at least to some extent.