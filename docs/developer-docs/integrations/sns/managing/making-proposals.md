# SNS proposals

## Overview

To manage an SNS, the SNS community needs to understand how proposals work, how they can be submitted, voted on, and what effect they have. This article explains the different types of proposals and how to work with them.

## Background

### Native proposals

An SNS comes with built-in proposals called “native proposals”.

There are the following types:

* `Motion`
* `ManageNervousSystemParameters`
* `AddGenericNervousSystemFunction`
* `RemoveGenericNervousSystemFunction`
* `UpgradeSnsToNextVersion`
* `RegisterDappCanisters`
* `TransferSnsTreasuryFunds`
* `UpgradeSnsControlledCanister`
* `DeregisterDappCanisters`
* `Unspecified`
* `ManageSnsMetadata`
* `ManageSnsMetadata`

:::info
See the types in the code [here](https://sourcegraph.com/github.com/dfinity/ic@4732d8281404c0a7c1e0a91937ffd0e54f2beced/-/blob/rs/sns/governance/proto/ic_sns_governance/pb/v1/governance.proto?L405) - they are called “action” in the code.
:::

### Generic proposals

Each SNS community might have dapp-specific needs.

Some examples:

* A dapp may have a very complicated procedure to upgrade dapp canisters. For example, they may have a canister for each user, in which case they orchestrate over a “user root canister”. For this workflow, they would have to tell this canister what the user-canisters should be upgraded to and then trigger this upgrade. In a DAO-governed dapp this should happen via proposal.
* Many dapps have an asset canister. Updating the assets cannot be done via a normal canister upgrade as the content is larger than a proposal can be. Therefore we need a custom way to update the assets 
* Developers might want the DAO to be the only entity that can elect moderators, call certain methods, make certain payments etc…

For these cases, SNSs have so called 'generic proposals'. These are custom proposals that each SNS community can define itself.

Here we make use of an elegant aspect of our SNS architecture design: a proposal is just a call to a method on a canister. This means that one can do arbitrary things with a proposal as long as one can tell the SNS governance canister which method it has to call.

## Using Quill to make proposals

### Submitting via `sns make-proposal` command

`sns make-proposal` signs a `ManageNeuron` message to [submit a proposal](https://github.com/dfinity/quill/blob/master/docs/cli-reference/sns/quill-sns-make-proposal.md). With this command, neuron holders can submit proposals (such as a Motion Proposal) to be voted on by other neuron holders. The structure:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal <PROPOSAL> [option]
```

where `<PROPOSAL>` is a formatted a candid record. 

```candid
(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            <METHOD_NAME_OF_PROPOSAL_TYPE> = record {
                //parameters of the proposal
            }
        };
    }
)
```

For example, we use the candid record for a proposal of type `Motion`, the candid record is:

```candid
(
    record {
        title = "SNS Launch";
        url = "https://dfinity.org";
        summary = "A motion to start the SNS";
        action = opt variant {
            Motion = record {
                motion_text = "I hereby raise the motion that the use of the SNS shall commence";
            }
        };
    }
)
```

Putting it all together, the command to submit a motion proposal is:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "SNS Launch";
        url = "https://dfinity.org\";
        summary = "A motion to start the SNS";
        action = opt variant {
            Motion = record {
                motion_text = "I hereby raise the motion that doesnt the use of the SNS shall commence";
            }
        };
    }
)'
```

## `Motion` proposals

The method associated for `motion` proposals is `Motion`. The record and parameters for a `Motion` method are:

```candid
    Motion: record {
        motion_text : text;
    }
```

Example:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal (
    record {
        title = "SNS Launch";
        url = "https://dfinity.org";
        summary = "A motion to start the SNS";
        action = opt variant {
            Motion = record {
                motion_text = "I hereby raise the motion that the use of the SNS shall commence";
            }
        };
    }
)
```

## `ManageNervousSystemParameters` proposals

The type signature `ManageNervousSystemParameters`:

```candid
    ManageNervousSystemParameters: record {
        default_followees : opt DefaultFollowees;
        max_dissolve_delay_seconds : opt nat64;
        max_dissolve_delay_bonus_percentage : opt nat64;
        max_followees_per_function : opt nat64;
        neuron_claimer_permissions : opt NeuronPermissionList;
        neuron_minimum_stake_e8s : opt nat64;
        max_neuron_age_for_age_bonus : opt nat64;
        initial_voting_period_seconds : opt nat64;
        neuron_minimum_dissolve_delay_to_vote_seconds : opt nat64;
        reject_cost_e8s : opt nat64;
        max_proposals_to_keep_per_action : opt nat32;
        wait_for_quiet_deadline_increase_seconds : opt nat64;
        max_number_of_neurons : opt nat64;
        transaction_fee_e8s : opt nat64;
        max_number_of_proposals_with_ballots : opt nat64;
        max_age_bonus_percentage : opt nat64;
        neuron_grantable_permissions : opt NeuronPermissionList;
        voting_rewards_parameters : opt VotingRewardsParameters;
        maturity_modulation_disabled : opt bool;
        max_number_of_principals_per_neuron : opt nat64;
    }
```


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