# Stages of an SNS launch - legacy flow

:::caution
This page refers to a legacy flow of how an SNS is launched. This is still supported at the moment but might be deprecated going forward. It is recommended to use the new SNS launch flow which can be found [here](./launch-summary-1proposal.md). Please find more context on this [here](./index.md).
:::


## Overview
During an SNS launch, a dapp is handed over to the NNS and the NNS both
creates the SNS canisters and starts a decentralization swap to decentralize the SNS and 
thereby the dapp (see [here](../introduction/sns-launch.md)).

## SNS launch Stages
Handing over a dapp's control to a newly created SNS proceeds in the following high level
stages.
Note that the NNS community's approval is relevant in two stages (stages 3, 7, and 9).

### 1. Dapp developers choose the initial parameters of the SNS for a dapp.
  As these parameters define not only the token name but also the tokenomics and how the governance
  will work, this usually requires a lot of preparation and community engagement already
  (see [here](../tokenomics/sns-checklist.md) for more information).

:::info 
These parameters also define the initial neurons with which the SNS governance canister will
be installed.
The launch stages 5 and 6 require submitting and adopting an _SNS proposal
during the launch process_, and thus before the SNS is fully launched. 
Note that some frontends, for example the NNS frontend dapp, do not show neurons of SNSs that are not 
fully launched. Neurons that are controlled by NNS frontend dapp principals will only be
visible after a successful launch. 
Therefore, the initial neurons must be carefully setup in a way so that enough of them can be 
operated already during the launch process.
This is also relevant for other SNS proposals that can already be used during the launch, for example to
upgrade the dapp canister(s) or registering custom proposals for that DAO.
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
    <td>a dapp canister(s)</td>
    <td>application subnet</td>
    <td>dapp developer principal</td>
    <td>operational</td>
  </tr>
</table>

#### Table 2: NNS Proposals

<table>
  <tr>
    <th>NNS proposal</th>
    <th>State</th>
  </tr>
   <tr>
    <td class="light-green-text">NNS proposal #1</td>
    <td class="light-green-text">Not created yet</td>
  </tr>
   <tr>
    <td class="light-green-text">SNS Proposal #1</td>
    <td class="light-green-text">Not created yet</td>
  </tr>
   <tr>
    <td class="light-green-text">NNS Proposal #2</td>
    <td class="light-green-text">Not created yet</td>
  </tr>
</table>



### 2. Dapp developers submit NNS proposal so they can deploy to the SNS subnet.

To ensure that malicious parties cannot simply fill the SNS subnet with un-approved SNSs, the
canister which is responsible for deploying SNSs, [SNS-W](../introduction/sns-architecture.md#SNS-W), 
contains a list of principals that are allowed to do so. Therefore, a developer launching an SNS needs to ask the NNS community for approval to be added to this list. If the proposal is adopted, the defined principal is allowed to install exactly one SNS. 

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
    <td>dapp canisters</td>
    <td>application subnet</td>
    <td>dapp developer principal</td>
    <td>operational</td>
  </tr>
</table>

#### Table 2: NNS Proposals

<table>
  <tr>
    <th>NNS proposals</th>
    <th>State</th>
  </tr>
   <tr>
    <td>NNS proposal #1</td>
    <td class="light-orange-text">Submitted</td>
  </tr>
   <tr>
    <td>SNS Proposal #1</td>
    <td>Not created yet</td>
  </tr>
   <tr>
    <td>NNS Proposal #2</td>
    <td>Not created yet</td>
  </tr>
</table>



### 3. Proposal #1 (of 3) is adopted or rejected.

This is the **first of three** proposals that need to successfully pass.

If this NNS proposal passes and the developer's principal is added the list of principals that can deploy to the SNS 
subnet, it does **not** guarantee the rest of the next stages will complete.

If the proposal is adopted successfully, at the end of this step, we have:

#### Table 1: Canisters

<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>

  <tr>
    <td>a dapp canister(s)</td>
    <td>application subnet</td>
    <td>dapp developer principal</td>
    <td>operational</td>
  </tr>
</table>

#### Table 2: NNS proposals

<table>
  <tr>
    <th>NNS proposals</th>
    <th>State</th>
  </tr>
   <tr>
    <td>NNS proposal #1</td>
    <td class="light-orange-text">Adopted</td>
  </tr>
   <tr>
    <td>SNS proposal #1</td>
    <td>Not created yet</td>
  </tr>
   <tr>
    <td>NNS proposal #2</td>
    <td>Not created yet</td>
  </tr>
</table>



#### Table 3: Objects

<table>
  <tr>
    <th>Objects in the SNS subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>a principal that can deploy to SNS subnet</td>
    <td>dapp developer principal</td>
    <td class="light-orange-text">ready for 1-time use</td>
  </tr>
</table>
  

### 4. Dapp developers trigger the SNS canisters to be created on SNS subnet.

When all initial parameters are specified and the NNS adopted the SNS launch,
the SNS canisters can be created by a manual call to [SNS-W](../introduction/sns-architecture.md#SNS-W).
This will initiate the creation of the SNS canisters and set their initial parameters as
chosen in [Step 1](#SNS-launch-step-preparation).

**The SNS canisters are created in pre-decentralization-swap mode.**

After the SNS canister creation, the canisters exist but are not yet fully functional - the SNS is in **pre-decentralization-swap mode**.

At this point, the SNS ledger has two accounts: 

* The **treasury** that is owned by the SNS governance canister and which can be used in the future according to the SNS community's wishes.
* Some pre-allocated tokens to be used in the initial decentralization swap.

To ensure that no one can transfer tokens and distribute them, or start token markets prematurely, all remaining initial tokens are locked in neurons.
Moreover, in pre-decentralization-swap mode, the initial neurons cannot modify the SNS or transfer the treasury tokens.

If successful, at the end of stage, we the following has changed:


#### Table 3: Objects


<table>
  <tr>
    <th>Objects in the SNS subnet</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>a principal that can deploy to SNS subnet</td>
    <th>SNS subnet</th>
    <td>NA</td>
    <td class="light-orange-text">revoked because it is 1-time use</td>
  </tr>
  <tr>
    <td class="light-green-text">SNS root on the SNS subnet</td>
    <th>SNS subnet</th>
    <td class="light-green-text">initial developer neurons</td>
    <td class="light-green-text">pre-decentralization swap mode</td>

  </tr>
  <tr>
    <td class="light-green-text">initial developer neurons</td>
    <th>SNS subnet</th>
    <td class="light-green-text">dapp developer principal</td>
    <td class="light-green-text">pre-decentralization swap mode</td>
  </tr>
  <tr>
    <td class="light-green-text">treasury account on the SNS Ledger</td>
    <th>SNS subnet</th>
    <td class="light-green-text">SNS governance</td>
    <td class="light-green-text">pre-decentralization swap mode</td>
  </tr>
  <tr>
    <td class="light-green-text">swap account on the SNS Ledger</td>
    <th>SNS subnet</th>
    <td class="light-green-text">SNS swap</td>
    <td class="light-green-text">pre-decentralization swap mode</td>
  </tr>
</table>

### 5. Dapp developers submit an SNS proposal to handover control of their dapp to the SNS.
  Before the decentralization swap, the developers hand over the control of the dapp to the SNS.

  This includes adding the SNS root canister as the controller of the dapp and
  "registering" the dapp with the SNS so that SNS
  root is aware that it controls these canisters.

  The registration is done by an **SNS proposal**.
  
  As there are already initial neurons, this,
  as well as potential upgrades to the dapp, can be realized by SNS proposals and by the
  majority of initial neurons voting in favor of them.
  The initial neurons cannot do other things, such as changing
  the SNS parameters, as the SNS governance canister is still in
  pre-decentralization-swap mode.

If successful, at the end of stage, we the following has changed:

#### Table 1: NNS proposals

<table>
  <tr>
    <th>NNS proposals</th>
    <th>State</th>
  </tr>
  <tr>
  </tr>
   <tr>
    <td >NNS proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>SNS Proposal #1</td>
    <td class="light-orange-text">Submitted</td>
  </tr>
   <tr>
    <td>NNS proposal #2</td>
    <td>Not created yet</td>
  </tr>
</table>

### 6. Proposal #2 (of 3) is adopter or rejected.

The initial SNS developer neurons are declared in the initial parameters and available at SNS installation.

If successful, at the end of stage, we the following has changed:

#### Table 1: Canisters

<table>
  <tr>
    <th>Canisters</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>

  </tr>
  <tr>
    <td>dapp canisters</td>
    <th>application Subnet</th>
    <td>operational</td>
    <td class="light-orange-text">SNS root</td>
  </tr>
</table>

#### Table 2: NNS Proposals

<table>
  <tr>
    <th>NNS proposals</th>
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
    <td>NNS proposal #2</td>
    <td>Not created yet</td>
  </tr>
</table>

### 7. Proposal to start the decentralization swap.
  
This proposal defines the conditions for the decentralization swap (e.g. how many ICP tokens should at least and at most be collected).

:::info

Note that there can only be one such proposal at a time in the NNS. This means that the time when this proposal can be submitted might depend on other SNS' launch. 
:::

If successful, at the end of stage, we the following has changed:

#### Table 1: NNS proposals

<table>
  <tr>
    <th>NNS proposals</th>
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

### 8. Proposal #3 (of 3) is adopted or rejected.

This is the **last of three** proposals that need to successfully pass for the process to continue. 

When voting on this proposal, the NNS voters can verify the parameters in the already
existing SNS canisters as well as the swap parameters that are set in the proposal.
  
* If the NNS proposal is adopted, the swap is started after a specified delay. 
* If the NNS proposal is rejected, the SNS launch is aborted and the dapp’s control is handed
back to the original developers of the dapp.

If successful, at the end of stage, the following has changed:


#### Table 1

#### Table 1: NNS Proposals

<table>
  <tr>
    <th>NNS proposals</th>
    <th>State</th>
  </tr>
  <tr>
    <td>Decentralization swap state</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td>NNS proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>SNS proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>NNS proposal #2</td>
    <td class="light-orange-text">Adopted</td>
  </tr>
</table>

### 9. SNS participants participate in the decentralization swap.

  When the swap starts, the swap canister holds the number
  of SNS tokens that were specified. End users can
  participate in the decentralization swap by transferring ICP tokens to the
  swap canister.
  

### 10. SNS canisters become SNS DAO.
  
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

#### Table 1: Objects

<table>
  <tr>
    <th>Objects in the SNS subnet</th>
    <th>Subnet</th>
    <th>Controlled by</th>
    <th>State</th>
  </tr>
  <tr>
    <td>a principal that can deploy to SNS subnet</td>
    <td>NA</td>
    <td>NA</td>
    <td>revoked because it is 1-time use</td>
  </tr>
  <tr>
    <td>SNS root</td>
    <td>NA</td>
    <td class="light-orange-text">SNS DAO</td>
    <td>normal mode</td>
  </tr>
  <tr>
    <td>initial developer neurons</td>
    <td>SNS subnet</td>
    <td>dapp developer principal</td>
    <td>normal mode</td>

  </tr>
  <tr>
    <td>treasury account on the SNS Ledger</td>
    <td>SNS subnet</td>
    <td class="light-orange-text">SNS DAO</td>
    <td>normal mode</td>

  </tr>
  <tr>
    <td>swap account on the SNS Ledger</td>
    <td>SNS subnet</td>
    <td class="light-orange-text">SNS DAO</td>
    <td>empty</td>
  </tr>
  <tr>
    <td class="light-green-text">SNS neurons</td>
    <td>SNS subnet</td>
    <td class="light-green-text">swap participant principals</td>
    <td class="light-green-text">normal mode</td>

  </tr>
</table>


#### Table 2: NNS proposals

<table>
  <tr>
    <th>NNS proposals</th>
    <th>State</th>
  </tr>
  <tr>
    <td>Decentralization swap state</td>
    <td>Pending</td>
  </tr>
   <tr>
    <td>NNS proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>SNS proposal #1</td>
    <td>Approved</td>
  </tr>
   <tr>
    <td>NNS proposal #2</td>
    <td >Approved</td>
  </tr>
</table>
