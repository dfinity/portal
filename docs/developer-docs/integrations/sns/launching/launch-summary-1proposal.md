# Stages of an SNS launch
## Overview
During an SNS launch, a dapp is handed over to the NNS and the NNS both
creates the SNS canisters and starts a decentralization swap to decentralize the SNS and
thereby the dapp (see [here](../introduction/sns-launch.md)).

## SNS launch Stages
Handing over a dapp's control to a newly created SNS proceeds in the following high
level stages.
Note that only the first two stages require manual action from the dapp's developer
team and the NNS community. All other stages are exectued fully automatically.
The NNS community's approval is relevant in Stage 3. 

### 1. Dapp developers choose the initial parameters of the SNS for a dapp.
  These parameters define all the initial parameters of the SNS, including
  * The token name, token symbol, ledger transaction fee.
  * The tokenomics and how governance will work.
  * The initial token distribution.
  * The conditions for the decentralization swap, including the swap's start date and
    how many ICP tokens should at least and at most be collected.
    
  Therefore defining these parameters usually requires a lot of preparation and
  community engagement already (see [here](../tokenomics/sns-checklist.md) for
  more information).

:::info 
These parameters also define the initial neurons with which the SNS governance canister will be installed.
Before being fully launched, the SNS governance canister is in a pre-decentralization-swap mode and only few proposals are allowed (see Step 7).
However, some SNS proposals might already be used during this time, for example upgrades to the dapp canister(s) while the launch is ongoing or
registering custom proposals for that DAO.
Note that such operations require submitting and adopting an SNS proposal during the launch process, and thus before the SNS is fully launched. 
Some frontends, for example the NNS frontend dapp, do not show neurons of SNSs that are not fully launched and thus neurons controlled by NNS 
frontend dapp principals will only be visible after a successful launch. 
Therefore, the initial neurons must be carefully setup in a way so that enough of them can be operated already during the launch process.
:::

  What we have at this stage:

#### Table 1: Canisters

<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>dapp canister(s)</td>
    <td>application subnet</td>
    <td>dapp developer principal</td>
    <td>operational</td>
  </tr>
</table>


### 2. Dapp developers add NNS root as co-controller of dapp.
Shortly before Step 3, the dapp developers hand over the dapp to the NNS by adding the NNS root canister as an additional controller for the dapp canister(s).
This is necessary in order for the rest of the steps to work automatically.
As any eligible NNS neuron can submit the proposal in Stage 3, this is an important step
where the dapp developers explicity express their intent to hand over their dapp to a DAO.

If successful, at the end of stage, the following has changed:

#### Table 1: Canisters
<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>dapp canister(s)</td>
    <td>application subnet</td>
    <td class="light-orange-text">dapp developer principal, NNS root</td>
    <td>operational</td>
  </tr>
</table>

### 3. Submit NNS proposal to create SNS.

This proposal presents all the initial parameters for the SNS as defined in the first Stage to the NNS community. 
It also defines which dapp canister(s) should be handed over to the SNS.

:::info
Note that there can only be one such proposal at a time in the NNS. This means that the time when this proposal can be submitted might depend on other SNS' launch.
:::

If successful, at the end of this stage, the following has changed:

#### Table 1: Canisters

<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>dapp canister(s)</td>
    <td>application subnet</td>
    <td>dapp developer principal, NNS root</td>
    <td>operational</td>
  </tr>
</table>

#### Table 2: NNS Proposals
 <table>
  <tr>
    <th>NNS Proposal</th>
    <th>State</th>
  </tr>
  <tr>
    <td class="light-green-text">SNS creation proposal</td>
    <td class="light-green-text">Open</td>
  </tr>
</table>


### 4. The NNS proposal is decided.
If the NNS proposal from Stage 3 is adopted, 
then the NNS automatically triggers the remaining stages and thus the creation of
the SNS.

If the proposal is rejected, then the dapp canister(s)' control is given back exclusively
to the original dapp developers.

For the proposal's execution to be successful, the following conditions must also be met:
* NNS root has been added as a co-controller of the dapp to be decentralized (Stage 2
was executed succesfully)
* The SNS-W canister has sufficient cycles.

If these conditions are not met, the proposal will fail immediately and the control is 
given back exclusively to the original dapp developers.

If successful, at the end of this stage the proposal is adopted and the conditions are met.
This means that we are in the following situation:

#### Table 2: NNS Proposals
 <table>
  <tr>
    <th>NNS Proposal</th>
    <th>State</th>
  </tr>
  <tr>
    <td>SNS creation proposal</td>
    <td class="light-orange-text">Adopted</td>
  </tr>
</table>


### 5. (Automatically) SNS-W deploys SNS canisters.
As a first step of the automatically triggered
SNS creation, [SNS-W](../introduction/sns-architecture.md#SNS-W)
creates SNS canisters on the SNS subnet.
At this stage the SNS canisters are not yet initialized with any meaningful values.

This results in the following situation:

#### Table 1: Canisters
<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>dapp canister(s)</td>
    <td>application subnet</td>
    <td>dapp developer principal, NNS root</td>
    <td>operational</td>
  </tr>
  <tr>
    <td class="light-green-text">SNS swap</td>
    <td class="light-green-text">SNS subnet</td>
    <td class="light-green-text">NNS root</td>
    <td class="light-green-text">not initialized</td>
  </tr>
 <tr>
    <td class="light-green-text">SNS governance</td>
    <td class="light-green-text">SNS subnet</td>
    <td class="light-green-text">SNS root</td>
    <td class="light-green-text">not initialized</td>
  </tr>
 <tr>
    <td class="light-green-text">SNS ledger</td>
    <td class="light-green-text">SNS subnet</td>
    <td class="light-green-text">SNS root</td>
    <td class="light-green-text">not initialized</td>
  </tr>
 <tr>
    <td class="light-green-text">SNS root</td>
    <td class="light-green-text">SNS subnet</td>
    <td class="light-green-text">SNS governance</td>
    <td class="light-green-text">not initialized</td>
  </tr>
</table>


### 6. (Automatically) SNS-W sets SNS root as sole controller of dapp.
Once the SNS canisters are deployed, [SNS-W](../introduction/sns-architecture.md#SNS-W)
sets the SNS root as the sole controller of the dapp canister(s).

For technical reasons, the NNS root canister was added as the co-controller of the dapp
in Stage 2.
Therefore, the SNS-W orchestrates the necessary updates involving NNS root for 
making the appropriate changes.

In detail, this includes two steps:
* First, SNS-W removes the original dapp developers from controlling the
  dapp canister(s). 
  Next, SNS-W adds the newly created SNS root canister as the dapp canister(s)
  controller.
  This is done via a call to NNS root who is the co-controller of the dapp
  canister(s) and thus has the necessary permissions.
* If this transition worked successfully, SNS-W asks the NNS root canister to 
  remove itself as controller.
  
A succesful stage results in the following situation:

#### Table 1: Canisters
<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>dapp canister(s)</td>
    <td>application subnet</td>
    <td class="light-orange-text">SNS root</td>
    <td>operational</td>
  </tr>
  <tr>
    <td>SNS swap</td>
    <td>SNS subnet</td>
    <td>NNS root</td>
    <td>not initialized</td>
  </tr>
 <tr>
    <td>SNS governance</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td>not initialized</td>
  </tr>
 <tr>
    <td>SNS ledger</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td>not initialized</td>
  </tr>
 <tr>
    <td>SNS root</td>
    <td>SNS subnet</td>
    <td>SNS governance</td>
    <td>not initialized</td>
  </tr>
</table>

### 7. (Automatically) SNS-W initializes SNS canisters according to settings from Step 1.
Next, SNS-W initializes the SNS canisters with the appropriate initial payloads as proposed
in Stage 3 and approved by the NNS community in Stage 4. 

**The SNS canisters are initialized in pre-decentralization-swap mode.**

After the SNS canister creation, the canisters exist but are not yet fully functional 
- the SNS is in **pre-decentralization-swap mode**.

At this point, the SNS ledger has two accounts:

* The **treasury** that is owned by the SNS governance canister and which can be used in the future according
  to the SNS community's wishes.
* Some pre-allocated tokens to be used in the decentralization swap.

To ensure that no one can transfer tokens and distribute them, or start token markets 
prematurely, all remaining initial tokens are locked in neurons.
Moreover, in pre-decentralization-swap mode, the initial neurons cannot modify the 
SNS or transfer the treasury tokens.

If successful, at the end of stage, the following has changed:
#### Table 1: Canisters
<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>dapp canister(s)</td>
    <td>application subnet</td>
    <td>SNS root</td>
    <td>operational</td>
  </tr>
 <tr>
    <td>SNS swap</td>
    <td>SNS subnet</td>
    <td>NNS root</td>
    <td class="light-orange-text">Waiting to be started</td>
  </tr>
 <tr>
    <td>SNS governance</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td class="light-orange-text">pre-decentralization swap mode</td>
  </tr>
 <tr>
    <td>SNS ledger</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td class="light-orange-text">pre-decentralization swap mode</td>
  </tr>
 <tr>
    <td>SNS root</td>
    <td>SNS subnet</td>
    <td>SNS governance</td>
    <td class="light-orange-text">pre-decentralization swap mode</td>
  </tr>
</table>

### 8. (Automatically) SNS swap starts.
The swap was initialized with a defined start time. 
Once this start time is reached,
the swap will automatically be started and is open for participations.

End users can participate in the decentralization swap by transferring ICP tokens to the
swap canister.

This means, we will have the following situation:
#### Table 1: Canisters

<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>dapp canister(s)</td>
    <td>application subnet</td>
    <td>SNS root</td>
    <td>operational</td>
  </tr>
 <tr>
    <td>SNS swap</td>
    <td>SNS subnet</td>
    <td>NNS root</td>
    <td class="light-orange-text">Open</td>
  </tr>
 <tr>
    <td>SNS governance</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td>pre-decentralization swap mode</td>
  </tr>
 <tr>
    <td>SNS ledger</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td>pre-decentralization swap mode</td>
  </tr>
 <tr>
    <td>SNS root</td>
    <td>SNS subnet</td>
    <td>SNS governance</td>
    <td>pre-decentralization swap mode</td>
  </tr>
</table>

### 9. (Automatically) SNS swap ends.
The swap was also initialized with a defined end time.
When this time is reached, the swap automatically ends.
The swap can also end earlier if the maximum ICP participation is reached before the end 
time.

This means, we will have the following situation:
#### Table 1: Canisters

<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>dapp canister(s)</td>
    <td>application subnet</td>
    <td>SNS root</td>
    <td>operational</td>
  </tr>
 <tr>
    <td>SNS swap</td>
    <td>SNS subnet</td>
    <td>NNS root</td>
    <td class="light-orange-text">Ended</td>
  </tr>
 <tr>
    <td>SNS governance</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td>pre-decentralization swap mode</td>
  </tr>
 <tr>
    <td>SNS ledger</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td>pre-decentralization swap mode</td>
  </tr>
 <tr>
    <td>SNS root</td>
    <td>SNS subnet</td>
    <td>SNS governance</td>
    <td>pre-decentralization swap mode</td>
  </tr>
</table>


### 10. (Automatically) SNS swap finalizes.
When the decentralization swap ends, it is first established whether
it was successful, e.g., enough ICP have been collected. 
If the swap was successful,
the exchange rate is determined and all SNS tokens are given to the swap participants in
neurons.

Once all neurons are created, the SNS should be under decentralized control
and the pre-decentralization-swap mode is reverted.
Thus, the governance canister is set to be fully functional.

If the swap is not successful, the decentralization attempt failed and everything
is reverted to the state before the SNS launch attempt, including that the dapp’s control
is handed back to the original developers of the dapp, and the
collected ICP are refunded to the swap participants.

If successful, at the end of stage, we have:

#### Table 1: Canisters

<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>dapp canister(s)</td>
    <td>application subnet</td>
    <td>SNS root</td>
    <td>operational</td>
  </tr>
 <tr>
    <td>SNS swap</td>
    <td>SNS subnet</td>
    <td>NNS root</td>
    <td class="light-orange-text">Finalized</td>
  </tr>
 <tr>
    <td>SNS governance</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td class="light-orange-text">normal mode</td>
  </tr>
 <tr>
    <td>SNS ledger</td>
    <td>SNS subnet</td>
    <td>SNS root</td>
    <td class="light-orange-text">normal mode</td>
  </tr>
 <tr>
    <td>SNS root</td>
    <td>SNS subnet</td>
    <td>SNS governance</td>
    <td class="light-orange-text">normal mode</td>
  </tr>
</table>
