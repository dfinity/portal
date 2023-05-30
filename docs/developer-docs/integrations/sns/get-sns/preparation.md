---
sidebar_position: 1
---
# Technical preparations for an SNS

After some 
[non-technical preparations](../tokenomics/predeployment-considerations.md)
that define the goals for the SNS, in a next step you can 
choose the initial parameters that the SNS should be set up with, 
such as who should get how many SNS tokens in the beginning.

Before going into the details on how these parameters can be set, 
let us first understand on a high level how an SNS is launched with a 
decentralization swap.<!--Then, let us understand how you can get the right tools and generate
the right principals in order to set the SNS parameters.-->
Finally, we will cover which parameters can be set and how this
is done.

As mentioned in [the overview](get-sns-intro.md), another technical
preparation is that you might want to integrate parts of the
interaction with the SNS decentralization swap, with SNS governance,
or with the ledger and index canister in your dapp.
As this is work independent of preparing the launch, find more
information on separate pages for the 
[ledger canister integration](../integrate-sns/ledger-integration.md)
and the
[index canister integration](../integrate-sns/index-integration.md)
(swap and governance frontend integration to follow).

We refer to the following pages for learning the detailed actions that are
required [to test the SNS launch locally](./local-testing.md) and to use the 
[SNS testflight to test the DAO operations in production](./testflight.md).


## Understanding the SNS launch process {#understand-launch}

For each SNS, the decentralization swap is realized in a separate
**decentralization swap canister** that exists during the SNS's launch,
and is owned by the IC which will run the swap. In more detail, 
it is controlled by the NNS root canister.

* The swap canister is set up at the start with a defined amount of SNS tokens to be
  distributed publicly.

* During the decentralization swap, participants can send ICP to the swap canister
  to contribute to the dapp’s funding.

* At the swap's end the collected ICP are “swapped” for the SNS tokens; the
  participants get SNS tokens and the SNS gets the collected ICP. Each swap 
  participant will receive their portion of the pool of SNS tokens, pro-rated
  by their share of the overall number of ICP contributed. For example, if the
  sale canister initially held 1000 SNS tokens and 500 ICP tokens were collected
  during the decentralization swap, then the exchange rate would be 2:1 and each
  participant would get 2 SNS tokens for each ICP token they contributed.

Apart from distributing the tokens to many participants, the decentralization swap 
sets a market price for the SNS token and every swap participant receives SNS 
tokens at that price.

An SNS is launched in the following stages:

- #### Step 1: **Set the initial parameters**.
   For initializing an SNS for 
   your dapp, you first choose the initial parameters of the SNS.
   This includes both initial parameters of the governance 
   and ledger (e.g., token name). 
   
- #### Step 2: A NNS proposal approves the creation of the SNS and a principal executes this by calling SNS-W.
   When all parameters are specified, the SNS canisters can be created by a manual
   call to the SNS wasm modules canister **SNS-W** (a canister on the NNS).
   To ensure that malicious parties cannot simply perform this step and fill the SNS
   subnet with non-approved SNS canisters, SNS-W contains a list of principals
   that are allowed to install an SNS. A principal can only be added to this list by
   an NNS proposal, which will allow the principal to install exactly one SNS. Thus as part 
   of this step there is an NNS proposal which expresses that the NNS community gives their OK
   that the SNS launch process is started. 
   
- #### Step 3: Pre-decentralization-sale mode.
   After the SNS canister creation, the canisters exist but are not yet
   fully functional - the SNS is in **pre-decentralization-sale mode**.
   At this point, the SNS ledger only has two accounts with
   liquid tokens, the **treasury**
   that is owned by the SNS governance canister and which 
   can be used in the future according
   to the SNS community's wishes, and some pre-allocated tokens to be used in the initial 
   decentralization swap.
   To ensure that no one can transfer tokens, and distribute
   them or start token markets
   prematurely, all remaining inital tokens are locked in neurons. 
   Moreover, in pre-decentralization-sale mode, 
   the initial neurons cannot modify the SNS or 
   transfer the treasury tokens.
  
- #### Step 4: Dapp control handover. 
   Before the decentralization swap,
   the developers hand over the control of the dapp to the SNS.
   This includes adding the SNS root canister as the controller of the dapp and removing
   yourself (and possibly other developers) from the list of
   controllers. Also, this 
   includes "registering" the dapp with the SNS so that SNS 
   root is aware that it controls
   these canisters.
   The registration is done by SNS proposal.
   As there are already initial neurons (from Step 2), this,
   as well as potential upgrades
   to the dapp, can be realized by SNS proposals and by the 
   majority of
   initial neurons voting in favor of them.
   The initial neurons cannot do other things, such as changing
   the SNS  parameters, as the SNS governance canister is still in
   pre-decentralization-sale mode.

- #### Step 5: A NNS proposal starts the decentralization swap. 
   The decentralization swap
   is started by an NNS proposal that can be submitted by 
   anyone and is decided on by the
   IC community. This means that effectively you hand over 
   the control of your dapp
   to the IC and ask the IC to decentralize and launch the SNS by
   starting a decentralization swap.
   The NNS proposal defines the conditions for the
   decentralization swap, for example
   how many ICP tokens should at least and at most be collected.
   When voting on the proposal, the NNS neurons can check
   the swap parameters and whether the dapp’s control has been
   handed over to the SNS. The voters can also check all parameters that have been
   set up in step 1. and with which the canisters have been initialized in Step 2.
   The NNS proposal thus also serves as a safeguard where 
   the wisdom of the crowd can
   detect potentially malicious SNSs before they trick 
   users into investing in them.
   If the NNS proposal is adopted, the swap is started. If the NNS proposal is rejected,
   the SNS launch is aborted and the dapp’s control is handed back to you, i.e., to the 
   original developers of the dapp.
   
- #### Step 6: Decentralization swap. 
   When the swap starts, the swap canister holds the number
   of SNS tokens that were specified. End users can
   participate in the decentralization swap by transferring ICP tokens to the 
   swap canister.

- #### Step 7: SNS genesis.
   When the decentralization swap ends, it is first established whether
   it was successful, e.g., enough ICP have been collected. If the swap was successful,
   the exchange rate is determined and all SNS tokens are given to the swap participants in
   neurons. Once all neurons are created, the SNS should be under decentralized control
   and the pre-decentralization-sale mode is reverted. 
   Thus, the governance canister is set to be fully functional.
   If the swap is not successful, the decentralization attempt failed and everything
   is reverted to the state before the SNS launch attempt, including that the dapp’s control
   is handed back to you (i.e., the original developers of the dapp), and the 
   collected ICP are refunded to the swap participants.
   
## Setting the SNS parameters {#setting-parameters}
As mentioned above, the first step in getting an SNS is to set the parameters that
your SNS will be launched with.
This lets you choose many SNS settings and also lets you choose the initial 
token distribution.

### Initial parameters
Apart from the decentralization swap parameters
(see next section), 
all SNS parameters are set in a **.yaml** file that can 
then be passed as an argument
when installing the SNS, both for testing and in production.
There are some parameters that have to be set and others that are set to a
default value but that can also be changed.
To make sure that all parameters are set to valid values, that are also consistent
with each other, there is a tool to validate this input file. 

**To create the SNS parameter yaml file and validate it, follow the steps
'Deployment Arguments' in the
[SNS CLI tool](https://github.com/dfinity/ic/tree/master/rs/sns/cli).
The tool is also available through the dfx cache like this: `$(dfx cache show)/sns`**

To give you an overview, these are the categories of parameters that you can set:
- **Parameters of the SNS governance canister**: these are parameters of the governance
that can, in contrast to the other parameters listed here, be changed later 
   by SNS proposals. They include parameters such as the
   minimum stake that a neuron must have, or the cost (in SNS tokens) of submitting
   a proposal that is rejected.
   
- **Configurations in the SNS ledger canister:** this includes configurations of the SNS 
ledger canister such as the token name, token symbol, and the ledger transaction fee.

- **The initial token distribution**: this allows specifying which portion 
   of tokens are allocated to whom. In the initial design, one can distribute tokens to
   the following four buckets:
   - **Developer tokens** that are appointed to the original developers of the dapp and 
      seed investors,
   - **Airdrop tokens** that can be given to any other predefined principals that
      should have tokens at genesis, for example to existing users
      of the dapp,
   - **Treasury tokens** that are owned by the SNS governance canister which can be
      spent by the SNS community according to their needs, and
   - **Sale tokens** which are owned by the SNS and sold in exchange for ICP tokens.
      Initially, parts of the SNS swap tokens are sold in exchange for ICP tokens
      in an initial decentralization swap. If the swap is successful, the participants
      will receive SNS tokens in a basket of neurons. 
      If not all of the swap tokens are sold in the initial swap, the rest of the
      swap tokens are reserved for future swaps (separate from the treasury). 
      Note that future swap are not yet designed, but having the tokens reserved
      makes SNSs forward compatible to such a feature if it is added in the future.
      
All developer and airdrop tokens are distributed to neurons.
We call them **developer neurons** and **airdrop neurons**,
respectively, and refer to all these neurons as the **initial neurons**.

:::caution

The developer and airdrop neurons are the only neurons that exist when
the dapp's control is handed over to the SNS and during the
decentralization swap.
At this point, the dapp canister(s) are already controlled by the SNS.
Therefore, **if you want to ensure that the dapp can be upgraded 
at any time, 
you must make sure that you, or someone you trust, owns at least
one developer or airdrop neuron as they provide the only way to 
submit a proposal
to upgrade the dapp during the swap.**

:::

All developers, airdrop principals, and the swap participants receive
their neurons as a _basket of neurons_.
This means that rather than one neuron, they can get many neurons 
with different dissolve delays. The details of these neurons can
be set in the initialization.

If only parts of the swap tokens are sold in the initial decentralization swap,
the developer neurons' voting power is restricted by a multiplier. This multiplier 
is proportional to the portion of swap tokens that are sold in the initial 
decentralization swap. As more of the swap tokens are sold in the future, the
voting power multiplier increases until it is 1 when all swap tokens have been
sold.

### SNS decentralization swap parameters
As mentioned, the parameters of the decentralization swap are 
set in the NNS proposal that starts the swap.

They include configurations such as the minimum number of 
ICP tokens that the swap must collect to be successful and the
   maximum number of ICP tokens that it will collect.
   Another important parameter is the set of fallback controllers of the dapp.
   If a decentralization swap fails, for example because the targeted minimum number
   of ICP tokens could not be collected, the control of the dapp canister(s) is
   handed back to the principals defined in these parameters.
   Normally, this will be set to principals owned by the developers that controlled the dapp
   before the attempt to decentralize it.
