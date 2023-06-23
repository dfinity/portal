# SNS launch summary

## Overview

A crucial purpose of an SNS launch is to decentralize the control of an SNS and thereby of
the dapp that the SNS governs.

Thereby, new tokens must be distributed to a large community to ensure
proper decentralization of the voting power. There are of course many ways to do so.

The current SNS version provides one simple way to achieve this: a developer can hand over their dapp to the NNS DAO and ask it to start a decentralization
swap for the newly created SNS.

We first explain the decentralization swap and then the steps included in an SNS launch.

## Decentralization swap

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

After a successful decentralization swap, SNS tokens are owned by a large
community and therefore the SNS governance control is decentralized.
Moreover, the decentralization swap sets a market price for the SNS token and
every swap participant receives SNS tokens at that price.
The ICP that were collected in the decentralization swap provide initial
funding for the SNS project in a SNS-owned treasury.


## SNS launch process summary
Handing over a dapp's control to a newly created SNS proceeds in the following high level steps.
Note that the NNS community's approval is relevant in two steps (Step XX and XX).

- #### Step 1: Dapp developers choose the initial parameters of the SNS for a dapp
  As these parameters define not only the token name but also the tokenomics and how the governance
  will work, this usually requires a lot of preparation and community engagement already
  (see [here](../tokenomics/sns-checklist.md) for more information).

  What we have at this stage:

|  Canisters                                    | State                               |  Controlled by  |
|-------------------                            | ----------------                    | ----------------|
| A dapp                                        | Operational                         | Dapp developer principal |

- #### Step 2: Dapp developers submit NNS proposal so they can deploy to the SNS subnet
  To ensure that malicious parties cannot simply fill the SNS subnet with un-approved SNSs, the
  canister which is responsible for deploying SNSs, [SNS-W](../introduction/sns-architecture.md#SNS-W), 
  contains a list of principals that are allowed to do so. Therefore, a developer launching an SNS needs to ask the NNS community for approval to be added to this list. If the proposal is adopted, the defined principal is allowed to install exactly one SNS. 

  What we have at this stage:

|  Objects in an app subnet                                     | State                               |  Controlled by  |
|-------------------                            | ----------------                    | ----------------|
| A dapp                                        | Operational                         | Dapp developer principal |
| A wallet canister principal that can deploy to SNS subnet     | Pending NNS approval      | Dapp developer principal                        |

- #### Step 3: NNS DAO accepts or rejects the NNS proposal

  This is the **first of three** proposals that need to successfully pass.
  
  :::info
  If this NNS proposal passes and the developer's principal is added the list of principals that can deploy to the SNS subnet, it does **not** guarantee the rest of the steps will complete.
  :::|

  What we have at this stage:

    If the proposal is adopted successfully, at the end of this step, we have:


|  Objects in an app subnet                                      | State                    |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| A dapp                                            | Operational                           | Dapp developer principal | 

|  Objects in the SNS subnet                        | State                     |  Controlled by |
|-------------------                                | ----------------          | ----------------|
| A principal that can deploy to SNS subnet         | Ready for 1-time use      | Dapp developer principal                        |

- #### Step 4: Dapp developers trigger the SNS canisters to be created on SNS subnet

  When all initial parameters are specified and the NNS approved the SNS launch,
  the SNS canisters can be created by a manual call to [SNS-W](../introduction/sns-architecture.md#SNS-W).
  This will initiate the creation of the SNS canisters and set their initial parameters as
  chosen in [Step 1](#SNS-launch-step-preparation).

    If successful, at the end of stage, we have:


|  Decentralization swap state                      | PENDING                               |  
|-------------------                                | ----------------                      |


|  Objects in an app subnet                                      | State                    |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| A dapp                                            | Operational                           | Dapp developer principal | 

|  Objects in the SNS subnet                                       | State                  |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| ~~A principal that can deploy to SNS subnet~~     | Revoked because it is 1-time use      | NA                        |
| Newly-created SNS canisters on the SNS subnet     | Pre-decentralization swap mode        | Initial developer neurons |  
| Initial developer neurons                         | Pre-decentralization swap mode        | Dapp developer principal  |
| Treasury account on the SNS Ledger                | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |
| Swap account on the SNS Ledger                    | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |

  

  **The SNS canisters are created in pre-decentralization-swap mode.**
  
  After the SNS canister creation, the canisters exist but are not yet fully functional - the SNS is in **pre-decentralization-swap mode**.

  At this point, the SNS ledger only has two accounts: 
  
  * the **treasury** that is owned by the SNS governance canister and which can be used in the future according to the SNS community's wishes
  * some pre-allocated tokens to be used in the initial decentralization swap
  
  To ensure that no one can transfer tokens, and distribute them or start token markets prematurely, all remaining initial tokens are locked in neurons.
  Moreover, in pre-decentralization-swap mode, the initial neurons cannot modify the SNS or transfer the treasury tokens.


  If successful, at the end of stage, we have:


|  Decentralization swap state                      | PENDING                               |  
|-------------------                                | ----------------                      |


|  Objects in an app subnet                                      | State                    |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| A dapp                                            | Operational                           | Dapp developer principal | 

|  Objects in the SNS subnet                                       | State                  |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| ~~A principal that can deploy to SNS subnet~~     | Revoked because it is 1-time use      | NA                        |
| Newly-created SNS canisters on the SNS subnet     | Pre-decentralization swap mode        | Initial developer neurons |  
| Initial developer neurons                         | Pre-decentralization swap mode        | Dapp developer principal  |
| Treasury account on the SNS Ledger                | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |
| Swap account on the SNS Ledger                    | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |


- #### Step 6: Dapp developers submit an SNS proposal to handover control of their dapp to the SNS.
  Before the decentralization swap, the developers hand over the control of the dapp to the SNS.

  This includes adding the SNS root canister as the controller of the dapp and removing
  yourself (and possibly other developers) from the list of
  controllers. Also, this includes "registering" the dapp with the SNS so that SNS
  root is aware that it controls these canisters.

  The registration is done by **SNS proposal**.
  
  As there are already initial neurons (from Step 3), this,
  as well as potential upgrades to the dapp, can be realized by SNS proposals and by the
  majority of initial neurons voting in favor of them.
  The initial neurons cannot do other things, such as changing
  the SNS  parameters, as the SNS governance canister is still in
  pre-decentralization-swap mode.

  :::info
  Note that this is an *SNS* proposal, not an NNS proposal, even though many users would vote on it within [the NNS frontend dapp](nns.ic0.app).
  :::

  If successful, at the end of stage, we have:


|  Decentralization swap state                      | PENDING                                    |  
|-------------------                                | ----------------                        |


|  Objects in an app subnet                                      | State                    |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| A dapp                                            | Operational                           | Dapp developer principal | 

|  Objects in the SNS subnet                                       | State                  |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| ~~A principal that can deploy to SNS subnet~~     | Revoked because it is 1-time use      | NA                        |
| Newly-created SNS canisters on the SNS subnet     | Pre-decentralization swap mode        | Initial developer neurons |  
| Initial developer neurons                         | Pre-decentralization swap mode        | Dapp developer principal  |
| Treasury account on the SNS Ledger                | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |
| Swap account on the SNS Ledger                    | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |


- #### Step 7: The initial SNS developer neurons accepts or rejects the SNS proposal

  The initial SNS developer neurons are declared in the initial parameters and available at SNS installation.

  This is the **second of three** proposals that need to successfully pass for the process to continue.

  Since this proposal is passed by the SNS DAO. When one owns SNS neurons or votes on SNS proposals, one is are part of the SNS DAO. It is common for people to vote on both NNS and SNS proposals from within the [NNS Frontend dapp](nns.ic0.app), but they are two separate DAOs.

  :::info
  If this SNS proposal passes, it does **not** guarantee the rest of the steps will complete.
  :::


If successful, at the end of stage, we have:

|  Decentralization swap state                      | PENDING                               |  
|-------------------                                | ----------------                      |


|  Objects in an app subnet                                      | State                    |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| A dapp                                            | Operational                           | ~~Dapp developer principal~~ Newly-created SNS canisters | 

|  Objects in the SNS subnet                                       | State                  |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| ~~A principal that can deploy to SNS subnet~~     | Revoked because it is 1-time use      | NA                        |
| Newly-created SNS canisters on the SNS subnet     | Pre-decentralization swap mode        | Initial developer neurons |  
| Initial developer neurons                         | Pre-decentralization swap mode        | Dapp developer principal  |
| Treasury account on the SNS Ledger                | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |
| Swap account on the SNS Ledger                    | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |



- #### Step 8: Anyone in the community submits an NNS proposal to start the decentralization swap.{#SNS-launch-step-startSwap}
  
  Once the control of the dapp has been handed over to the SNS, anyone in the community can send an NNS proposal to trigger the decentralization swap. This proposal defines the conditions for the decentralization swap (e.g. how many ICP tokens should at least and at most be collected).

If successful, at the end of stage, we have:

|  Decentralization swap state                      | PENDING                                    |  
|-------------------                                | ----------------                        |


|  Objects in an app subnet                                      | State                    |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| A dapp                                            | Operational                           | ~~Dapp developer principal~~ Newly-created SNS canisters | 

|  Objects in the SNS subnet                                       | State                  |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| ~~A principal that can deploy to SNS subnet~~     | Revoked because it is 1-time use      | NA                        |
| Newly-created SNS canisters on the SNS subnet     | Pre-decentralization swap mode        | Initial developer neurons |  
| Initial developer neurons                         | Pre-decentralization swap mode        | Dapp developer principal  |
| Treasury account on the SNS Ledger                | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |
| Swap account on the SNS Ledger                    | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |

- #### Step 9: NNS DAO accepts or rejects the proposal

  This is the **last of three** proposals that need to successfully pass for the process to continue. 

  When voting on this proposal, the NNS voters can verify the parameters in the already
  existing SNS canisters as well as the swap parameters that are set in the proposal.
   
  * If the NNS proposal is adopted, the swap is started after a specified delay. 
  * If the NNS proposal is rejected, the SNS launch is aborted and the dapp’s control is handed
  back to the original developers of the dapp.

  :::info
  Once this NNS proposal passes, the rest of the process should complete.
  :::

    If successful, at the end of stage, we have:

|  Decentralization swap state                      | OPEN                                    |  
|-------------------                                | ----------------                        |


|  Objects in an app subnet                                      | State                    |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| A dapp                                            | Operational                           | ~~Dapp developer principal~~ Newly-created SNS canisters | 

|  Objects in the SNS subnet                                       | State                  |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| ~~A principal that can deploy to SNS subnet~~     | Revoked because it is 1-time use      | NA                        |
| Newly-created SNS canisters on the SNS subnet     | Pre-decentralization swap mode        | Initial developer neurons |  
| Initial developer neurons                         | Pre-decentralization swap mode        | Dapp developer principal  |
| Treasury account on the SNS Ledger                | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |
| Swap account on the SNS Ledger                    | Pre-decentralization swap mode        | Newly-created SNS canisters on the SNS subnet   |


- #### Step 10: SNS participants participate in the decentralization swap.

  When the swap starts, the swap canister holds the number
  of SNS tokens that were specified. End users can
  participate in the decentralization swap by transferring ICP tokens to the
  swap canister.

  

- #### Step 11: SNS canisters become SNS DAO.{#SNS-launch-step-genesis}
  
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

|  Decentralization swap state                      | COMMITTED                               |  
|-------------------                                | ----------------                        |


|  Objects in an app subnet                                      | State                    |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| A dapp                                            | Operational                           | ~~Dapp developer principal~~ ~~Newly-created SNS canisters~~ SNS DAO | 

|  Objects in the SNS subnet                                       | State                  |  Controlled by |
|-------------------                                | ----------------                      | ----------------|
| ~~A principal that can deploy to SNS subnet~~     | Revoked because it is 1-time use      | NA                        |
| Newly-created SNS canisters on the SNS subnet     | Normal mode                           | ~~Initial developer neurons~~ SNS DAO |  
| Initial developer neurons                         | Normal mode                           | Dapp developer principal  |
| Treasury account on the SNS Ledger                | Normal mode                           | ~~Newly-created SNS canisters on the SNS subnet~~ SNS DAO   |
| Swap account on the SNS Ledger                    | Empty                                 | ~~Newly-created SNS canisters on the SNS subnet~~ SNS DAO   |
| SNS neurons                                       | Normal mode                           | Swap participant principals   |




