# SNS proposals

## Overview

## SNS Proposal lifecycle


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

SNS Governance checks this when trying to execute - if the dapp is not registered when the proposal is 
executed, it will fail async fn perform_upgrade_sns_controlled_canister in SNS Governance has the 
associated logic.


### SNS canister upgrades
Upgrading SNS canisters will be very simple as the SNS version are blessed and the deployment paths
are managed by the NNS.
Nevertheless, an SNS community still has to decide when to upgrade to the next version by proposal.
So we should describe how such a proposal can be made.


## Generic proposals


Some notes: for generic proposals: only call things that you trust (anyways true for SNSs),
could be immutable canister / SNS controlled / controlled by s.b. you trust not to change things arbitraty. 
this must be verified on adding new proposal type. 

They consist of verification canister & method and of target canister & method
why we need both: governance cannot interpret meaning of the proposals 

the “Verification” method is just about filtering out 
proposals that cannot be valid anyways/ rendering => cannot put security check in the validate (just checks 
that the input is “valid proposal at the time of proposal not at the time of the execution”); for actual
validation at the time of execution: you have to add those checks to the target method called by the proposal

should include how to add and remove them.

 

### Register a new generic proposal
### Submit a generic proposal 