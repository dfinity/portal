---
sidebar_position: 3
---
# SNS launch
## Overview

A crucial purpose of an SNS launch is to decentralize the control of the SNS and thereby of
the dapp that the SNS governs.
Thereby, new tokens must be distributed to a large community to ensure
proper decentralization of the voting power. There are of course many ways to do so.
The current SNS version provides one simple way to achieve this:
a developer can hand over their dapp to the ICP and ask it to start a decentralization
swap for the newly created SNS.

We first explain the decentralization swap and then the steps included in an SNS launch.

## Decentralization swap

The launch of each SNS includes a separate **decentralization swap canister** that 
is owned by the IC which will run the swap.
In more detail, it is controlled by the NNS root canister.

* The swap canister is set up at the start with a defined amount of SNS tokens to be
  distributed publicly.

* During the decentralization swap, participants can send ICP to the swap canister
  to contribute to the dapp’s funding.

* At the swap's end the collected ICP are “swapped” for the SNS tokens; the
  participants get staked SNS tokens in the form of SNS neurons and the SNS gets the
  collected ICP. Each swap participant will receive their portion of the pool of SNS
  tokens, pro-rated by their share of the overall number of ICP contributed. 
  For example, if the swap canister initially held 1000 SNS tokens and 500 ICP tokens
  were collected during the decentralization swap, then the exchange rate would be 2:1
  and each participant would get 2 SNS tokens for each ICP token they contributed.

After a successful decentralization swap, SNS tokens are owned by a large
community and therefore the SNS governance control is decentralized.
Moreover, the decentralization swap sets a market price for the SNS token and
every swap participant receives SNS tokens at that price.
The ICP that were collected in the decentralization swap provide initial
funding for the SNS project in a SNS-owned treasury.


## SNS launch process
Handing over a dapp's control to a newly created SNS proceeds in the following high level steps.
Note that the NNS community's approvals is relevant in two steps (Step XX and XX).

- #### Step 1: Preparation.{#SNS-launch-step-preparation}
  Technically, the first step to initialize an SNS is to choose the initial parameters of the SNS.
  As these parameters define not only the token name but also the tokenomics and how the governance
  will work, this usually requires a lot of preparation and community engagement already
  (see [here](../tokenomics/sns-checklist.md) for more information).

- #### Step 2: A NNS proposal approves the creation of the SNS{#SNS-launch-step-NNSapproval}
  To ensure that malicious parties cannot simply fill the SNS subnet with non-approved SNSs, the
  canister which is responsible for deploying SNSs, [SNS-W](sns-architecture.md#SNS-W), 
  contains a list of principals that are allowed to do so.
  The first step in launching an SNS is asking the NNS community for approval to be added to
  this list. 
  If the proposal is adopted, the defined principal is allowed to install exactly one SNS.

- #### Step 3: The SNS canisters are created by a manual call to SNS-W.{#SNS-launch-step-deployment} 
  When all initial parameters are specified and the NNS approved the SNS launch,
  the SNS canisters can be created by a manual call to [SNS-W](sns-architecture.md#SNS-W).
  This will initiate the creation of the SNS canisters and set their initial parameters as
  chosen in [Step 1](#SNS-launch-step-preparation).

- #### Step 3: Pre-decentralization-swap mode.
  After the SNS canister creation, the canisters exist but are not yet
  fully functional - the SNS is in **pre-decentralization-swap mode**.
  At this point, the SNS ledger only has two accounts with
  liquid tokens, the **treasury**
  that is owned by the SNS governance canister and which
  can be used in the future according
  to the SNS community's wishes, and some pre-allocated tokens to be used in the initial
  decentralization swap.
  To ensure that no one can transfer tokens, and distribute
  them or start token markets
  prematurely, all remaining inital tokens are locked in neurons.
  Moreover, in pre-decentralization-swap mode,
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
  pre-decentralization-swap mode.

- #### Step 5: A NNS proposal starts the decentralization swap.{#SNS-launch-step-startSwap}
  The decentralization swap
  is started by an NNS proposal that can be submitted by
  anyone and defines the conditions for the
  decentralization swap, for example
  how many ICP tokens should at least and at most be collected.

  When voting on this proposal, the NNS voters can verify the parameters in the already
  existing SNS canisters as well as the swap parameters that are set in the proposal.
  If the proposal is rejected, the SNS launch fails and the dapp is handed back to the
  developers.
  
  If the NNS proposal is adopted, the swap is started after a specified delay. 
  If the NNS proposal is rejected, the SNS launch is aborted and the dapp’s control is handed
  back to the original developers of the dapp.
  
- #### Step 6: Decentralization swap.
  When the swap starts, the swap canister holds the number
  of SNS tokens that were specified. End users can
  participate in the decentralization swap by transferring ICP tokens to the
  swap canister.

- #### Step 7: SNS genesis.{#SNS-launch-step-genesis}
  When the decentralization swap ends, it is first established whether
  it was successful, e.g., enough ICP have been collected. If the swap was successful,
  the exchange rate is determined and all SNS tokens are given to the swap participants in
  neurons. 
  Currently, this process needs to be triggered by a call to the swap cansiter that anyone
  can make.
  Once all neurons are created, the SNS should be under decentralized control
  and the pre-decentralization-swap mode is reverted.
  Thus, the governance canister is set to be fully functional.
  If the swap is not successful, the decentralization attempt failed and everything
  is reverted to the state before the SNS launch attempt, including that the dapp’s control
  is handed back to the original developers of the dapp, and the
  collected ICP are refunded to the swap participants.




