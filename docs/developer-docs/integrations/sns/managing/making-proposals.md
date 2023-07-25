# SNS proposals

## Overview

To manage an SNS, the SNS community needs to understand how proposals work, how they can be submitted, voted on, and what effect they have. This article explains the different types of proposals and how to work with them.

## Background

### Native proposals

An SNS comes with built-in proposals called “native proposals”.

There are the following types:

* `motion`
* `manage_nervous_system_parameters`
* `upgrade_sns_controlled_canister`
* `add_generic_nervous_system_function`
* `remove_generic_nervous_system_function`
* `execute_generic_nervous_system_function`
* `upgrade_sns_to_next_version`
* `manage_sns_metadata`
* `transfer_sns_treasury_funds`
* `register_dapp_canisters`
* `deregister_dapp_canisters`

:::info
See the types in the code [here](https://sourcegraph.com/github.com/dfinity/ic/-/blob/rs/sns/governance/proto/ic_sns_governance/pb/v1/governance.proto?L405) - they are called “action” in the code.
:::

### Generic proposals

Each SNS community might have dapp-specific needs.

Some examples:

* A dapp has a very complicated procedure to upgrade dapp canisters (as they have a canister for each user) which they orchestrate over a “user root canister”. For this they have to tell this canister what the user-canisters should be upgraded to and then trigger this upgrade. In a DAO-governed dapp this should happen via proposal.
* many dapps have an asset canister. Updating the assets cannot be done via a normal canister upgrade as the content is larger than a proposal can be. Therefore we need a custom way to update the assets 
* Developers might want the DAO to be the only entity that can elect moderators, call certain methods, make certain payments etc…

For all these cases SNSs have so called generic proposals. Basically those are custom proposals that each SNS community can define itself.

Here we make use of an elegant cool aspect of our SNS architecture design: a proposal is just a call to a method on a canister. This means that one can do arbitrary things with a proposal as long as one can tell the SNS governance canister which method it has to call.

<!-- ## SNS Proposal lifecycle


(not only how generic ones are added but also how a normal proposal works (who can submit it, what they 
have to pay, when is it adopted and under which conditions etc): "At any time (even if the deadline has
not been reached), a proposal is adopted if strictly more than half of the votes are ‘yes’ and rejected 
if at least half of the votes are ‘no’. The idea is that at this point the result cannot be turned around,
so there is no reason for waiting.” "
if the voting deadline is reached, there are more yes than no votes, and at least a minimum number of 
votes have been sent (This minimum of votes is expressed as a ratio of the used voting power in favor 
of the proposal divided by the total available voting power and is a constant that is now set to 0.03)”

When voting:
WARNING
Overall careful w/ calls to unknown canisters   (for generic proposals, registering dapp etc)?

If SNSs can upgrade dapp canisters that are not registered, we might want to say that those canisters 
not necessarily trusted, also we might want to make a recommendation “to the SNS” that calling untrusted
canisters is dangerous, so they might want to verify it first (which could then be done by registering it)




## Native SNS proposals

### Dapp canister upgrades
how to upgrade dapp

SNS Governance checks this when trying to execute - if the dapp is not registered when the proposal is executed, it will fail async fn perform_upgrade_sns_controlled_canister in SNS Governance has the associated logic.


### SNS canister upgrades
Upgrading SNS canisters will be very simple as the SNS version are blessed and the deployment paths are managed by the NNS. Nevertheless, an SNS community still has to decide when to upgrade to the next version by proposal. So we should describe how such a proposal can be made.


## Generic proposals

Some notes: for generic proposals: only call things that you trust (anyways true for SNSs),
could be immutable canister / SNS controlled / controlled by s.b. you trust not to change things arbitraty. this must be verified on adding new proposal type.

They consist of verification canister & method and of target canister & method
why we need both: governance cannot interpret meaning of the proposals 

the “Verification” method is just about filtering out 
proposals that cannot be valid anyways/ rendering => cannot put security check in the validate (just checks 
that the input is “valid proposal at the time of proposal not at the time of the execution”); for actual
validation at the time of execution: you have to add those checks to the target method called by the proposal

should include how to add and remove them.

 

### Register a new generic proposal
### Submit a generic proposal  -->