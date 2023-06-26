# Stages of an SNS launch

## Overview

A crucial purpose of an SNS launch is to decentralize the control of an SNS and thereby of
the dapp that the SNS governs.

Thereby, new tokens must be distributed to a large community to ensure
proper decentralization of the voting power. There are of course many ways to do so.

The current SNS version provides one simple way to achieve this: a developer can hand over their dapp to the NNS and ask it to start a decentralization
swap for the newly created SNS.

We first explain the decentralization swap and then the steps included in an SNS launch.

## Key concepts

### Decentralization swap

The launch of each SNS includes a separate **decentralization swap canister** that 
is owned and run by the IC.
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

## Stages
Handing over a dapp's control to a newly created SNS proceeds in the following high level steps.
Note that the NNS community's approval is relevant in two steps (stages 3, 7, and 9).

### 1. Dapp developers choose the initial parameters of the SNS for a dapp
  As these parameters define not only the token name but also the tokenomics and how the governance
  will work, this usually requires a lot of preparation and community engagement already
  (see [here](../tokenomics/sns-checklist.md) for more information).

  What we have at this stage:

#### Table 1

  <table>
  <tr>
    <th>SNS Process</th>
    <th>State</th>
  </tr>
  <tr>
    <td class="light-green-text">Decentralization swap state</td>
    <td class="light-green-text">Pending</td>
  </tr>
   <tr>
    <td class="light-green-text">NNS Proposal #1</td>
    <td class="light-green-text">Pending</td>
  </tr>
   <tr>
    <td class="light-green-text">SNS Proposal #1</td>
    <td class="light-green-text">Pending</td>
  </tr>
   <tr>
    <td class="light-green-text">NNS Proposal #2</td>
    <td class="light-green-text">Pending</td>
  </tr>
</table>

#### Table 2

<table>
  <tr>
    <th>Canisters</th>
    <th>State</th>
    <th>Controlled by</th>
  </tr>
  <tr>
    <td>a dapp</td>
    <td>operational</td>
    <td>dapp developer principal</td>
  </tr>
</table>

### 2. Dapp developers submit NNS proposal so they can deploy to the SNS subnet

To ensure that malicious parties cannot simply fill the SNS subnet with un-approved SNSs, the
canister which is responsible for deploying SNSs, [SNS-W](../introduction/sns-architecture.md#SNS-W), 
contains a list of principals that are allowed to do so. Therefore, a developer launching an SNS needs to ask the NNS community for approval to be added to this list. If the proposal is adopted, the defined principal is allowed to install exactly one SNS. 

What we have at this stage:

#### Table 1

<table>
  <tr>
    <th>SNS Process</th>
    <th>State</th>
  </tr>
  <tr>
    <td>Decentralization swap state</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td>NNS Proposal #1</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td>SNS Proposal #1</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td>NNS Proposal #2</td>
    <td>Pending</td>
  </tr>
</table>

#### Table 2

<table>
  <tr>
    <th>Objects in an app subnet</th>
    <th>State</th>
    <th>Controlled by</th>
  </tr>
  <tr>
    <td>a dapp</td>
    <td>operational</td>
    <td>dapp developer principal</td>
  </tr>
  <tr>
    <td class="light-green-text">a principal that can deploy to SNS subnet</td>
    <td class="light-green-text">pending NNS approval</td>
    <td class="light-green-text">dapp developer principal</td>
  </tr>
</table>


### 3. Proposal #1 (of 3) is passed or rejected

This is the **first of three** proposals that need to successfully pass.

If this NNS proposal passes and the developer's principal is added the list of principals that can deploy to the SNS subnet, it does **not** guarantee the rest of the steps will complete.

If the proposal is adopted successfully, at the end of this step, we have:

#### Table 1

<table>
  <tr>
    <th>SNS Process</th>
    <th>State</th>
  </tr>
  <tr>
    <td>Decentralization swap state</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td>NNS Proposal #1</td>
    <td class="light-orange-text">Approved</td>
  </tr>
   <tr>
    <td>SNS Proposal #1</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td>NNS Proposal #2</td>
    <td>Pending</td>
  </tr>
</table>

#### Table 2

<table>
  <tr>
    <th>Objects in an app subnet</th>
    <th>State</th>
    <th>Controlled by</th>
  </tr>
  <tr>
    <td>a dapp</td>
    <td>operational</td>
    <td>dapp developer principal</td>
  </tr>
</table>

#### Table 3

<table>
  <tr>
    <th>Objects in the SNS subnet</th>
    <th>State</th>
    <th>Controlled by</th>
  </tr>
  <tr>
    <td>a principal that can deploy to SNS subnet</td>
    <td class="light-orange-text">ready for 1-time use</td>
    <td>dapp developer principal</td>
  </tr>
</table>
  

### 4. Dapp developers trigger the SNS canisters to be created on SNS subnet

When all initial parameters are specified and the NNS approved the SNS launch,
the SNS canisters can be created by a manual call to [SNS-W](../introduction/sns-architecture.md#SNS-W).
This will initiate the creation of the SNS canisters and set their initial parameters as
chosen in [Step 1](#SNS-launch-step-preparation).

**The SNS canisters are created in pre-decentralization-swap mode.**

After the SNS canister creation, the canisters exist but are not yet fully functional - the SNS is in **pre-decentralization-swap mode**.

At this point, the SNS ledger only has two accounts: 

* the **treasury** that is owned by the SNS governance canister and which can be used in the future according to the SNS community's wishes
* some pre-allocated tokens to be used in the initial decentralization swap

To ensure that no one can transfer tokens, and distribute them or start token markets prematurely, all remaining initial tokens are locked in neurons.
Moreover, in pre-decentralization-swap mode, the initial neurons cannot modify the SNS or transfer the treasury tokens.

If successful, at the end of stage, we the following has changed:

#### Table 3

<table>
  <tr>
    <th>Objects in the SNS subnet</th>
    <th>State</th>
    <th>Controlled by</th>
  </tr>
  <tr>
    <td>a principal that can deploy to SNS subnet</td>
    <td class="light-orange-text">revoked because it is 1-time use</td>
    <td>NA</td>
  </tr>
  <tr>
    <td class="light-green-text">SNS root on the SNS subnet</td>
    <td class="light-green-text">pre-decentralization swap mode</td>
    <td class="light-green-text">initial developer neurons</td>
  </tr>
  <tr>
    <td class="light-green-text">initial developer neurons</td>
    <td class="light-green-text">pre-decentralization swap mode</td>
    <td class="light-green-text">dapp developer principal</td>
  </tr>
  <tr>
    <td class="light-green-text">treasury account on the SNS Ledger</td>
    <td class="light-green-text">pre-decentralization swap mode</td>
    <td class="light-green-text">SNS root</td>
  </tr>
  <tr>
    <td class="light-green-text">swap account on the SNS Ledger</td>
    <td class="light-green-text">pre-decentralization swap mode</td>
    <td class="light-green-text">SNS root</td>
  </tr>
</table>

### 5. Dapp developers submit an SNS proposal to handover control of their dapp to the SNS.
  Before the decentralization swap, the developers hand over the control of the dapp to the SNS.

  This includes adding the SNS root canister as the controller of the dapp and removing
  yourself (and possibly other developers) from the list of
  controllers. Also, this includes "registering" the dapp with the SNS so that SNS
  root is aware that it controls these canisters.

  The registration is done by **SNS proposal**.
  
  As there are already initial neurons, this,
  as well as potential upgrades to the dapp, can be realized by SNS proposals and by the
  majority of initial neurons voting in favor of them.
  The initial neurons cannot do other things, such as changing
  the SNS  parameters, as the SNS governance canister is still in
  pre-decentralization-swap mode.

If successful, at the end of stage, we the following has changed:

#### Table 1

<table>
  <tr>
    <th>SNS Process</th>
    <th>State</th>
  </tr>
  <tr>
    <td>Decentralization swap state</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td >NNS Proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>SNS Proposal #1</td>
    <td class="light-orange-text">Submitted</td>
  </tr>
   <tr>
    <td>NNS Proposal #2</td>
    <td>Pending</td>
  </tr>
</table>

### 6. Proposal #2 (of 3) is passed or rejected

The initial SNS developer neurons are declared in the initial parameters and available at SNS installation.

Since this proposal is passed by the SNS DAO. When one owns SNS neurons or votes on SNS proposals, one is are part of the SNS DAO. It is common for people to vote on both NNS and SNS proposals from within the [NNS Frontend dapp](https://nns.ic0.app), but they are two separate DAOs.

If successful, at the end of stage, we the following has changed:

#### Table 1

<table>
  <tr>
    <th>SNS Process</th>
    <th>State</th>
  </tr>
  <tr>
    <td>Decentralization swap state</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td>NNS Proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>SNS Proposal #1</td>
    <td class="light-orange-text">Approved</td>
  </tr>
   <tr>
    <td>NNS Proposal #2</td>
    <td>Pending</td>
  </tr>
</table>

#### Table 2

<table>
  <tr>
    <th>Objects in an app subnet</th>
    <th>State</th>
    <th>Controlled by</th>
  </tr>
  <tr>
    <td>a dapp</td>
    <td>operational</td>
    <td class="light-orange-text">SNS root</td>
  </tr>
</table>

### 7. Proposal to start the decentralization swap.{#SNS-launch-step-startSwap}
  
This proposal defines the conditions for the decentralization swap (e.g. how many ICP tokens should at least and at most be collected).

If successful, at the end of stage, we the following has changed:

#### Table 1

<table>
  <tr>
    <th>SNS Process</th>
    <th>State</th>
  </tr>
  <tr>
    <td>Decentralization swap state</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td>NNS Proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>SNS Proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>NNS Proposal #2</td>
    <td class="light-orange-text">Submitted</td>
  </tr>
</table>

### 8. Proposal #3 (of 3) is passed or rejected

This is the **last of three** proposals that need to successfully pass for the process to continue. 

When voting on this proposal, the NNS voters can verify the parameters in the already
existing SNS canisters as well as the swap parameters that are set in the proposal.
  
* If the NNS proposal is adopted, the swap is started after a specified delay. 
* If the NNS proposal is rejected, the SNS launch is aborted and the dapp’s control is handed
back to the original developers of the dapp.

If successful, at the end of stage, we the following has changed:


#### Table 1

<table>
  <tr>
    <th>SNS Process</th>
    <th>State</th>
  </tr>
  <tr>
    <td>Decentralization swap state</td>
    <td class="light-orange-text">Open</td>
  </tr>
   <tr>
    <td>NNS Proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>SNS Proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>NNS Proposal #2</td>
    <td class="light-orange-text">Approved</td>
  </tr>
</table>

### 9. SNS participants participate in the decentralization swap.

  When the swap starts, the swap canister holds the number
  of SNS tokens that were specified. End users can
  participate in the decentralization swap by transferring ICP tokens to the
  swap canister.
  

### 10. SNS canisters become SNS DAO.{#SNS-launch-step-genesis}
  
  When the decentralization swap ends, it is first established whether
  it was successful, e.g., enough ICP have been collected. If the swap was successful,
  the exchange rate is determined and all SNS tokens are given to the swap participants in
  neurons. 
  
  Currently, this process needs to be triggered by a call to the swap canister that anyone
  can make.
  
  Once all neurons are created, the SNS should be under decentralized control
  and the pre-decentralization-swap mode is reverted.
  Thus, the governance canister is set to be fully functional.
  If the swap is not successful, the decentralization attempt failed and everything
  is reverted to the state before the SNS launch attempt, including that the dapp’s control
  is handed back to the original developers of the dapp, and the
  collected ICP are refunded to the swap participants.


If successful, at the end of stage, we have:

#### Table 1

<table>
  <tr>
    <th>SNS Process</th>
    <th>State</th>
  </tr>
  <tr>
    <td>Decentralization swap state</td>
    <td class="light-orange-text">Committed</td>
  </tr>
   <tr>
    <td>NNS Proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>SNS Proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>NNS Proposal #2</td>
    <td >Approved</td>
  </tr>
</table>

#### Table 2

<table>
  <tr>
    <th>Objects in an app subnet</th>
    <th>State</th>
    <th>Controlled by</th>
  </tr>
  <tr>
    <td>A dapp</td>
    <td>operational</td>
    <td class="light-orange-text">SNS DAO</td>
  </tr>
</table>

#### Table 3

<table>
  <tr>
    <th>Objects in the SNS subnet</th>
    <th>State</th>
    <th>Controlled by</th>
  </tr>
  <tr>
    <td>a principal that can deploy to SNS subnet</td>
    <td>revoked because it is 1-time use</td>
    <td>NA</td>
  </tr>
  <tr>
    <td>SNS root</td>
    <td>normal mode</td>
    <td class="light-orange-text">SNS DAO</td>
  </tr>
  <tr>
    <td>initial developer neurons</td>
    <td>normal mode</td>
    <td>dapp developer principal</td>
  </tr>
  <tr>
    <td>treasury account on the SNS Ledger</td>
    <td>normal mode</td>
    <td class="light-orange-text">SNS DAO</td>
  </tr>
  <tr>
    <td>swap account on the SNS Ledger</td>
    <td>empty</td>
    <td class="light-orange-text">SNS DAO</td>
  </tr>
  <tr>
    <td class="light-green-text">SNS neurons</td>
    <td class="light-green-text">normal mode</td>
    <td class="light-green-text">swap participant principals</td>
  </tr>
</table>
