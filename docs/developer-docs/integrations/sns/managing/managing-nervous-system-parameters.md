# Managing nervous system parameters

## Overview

The nervous system parameters define the settings of a particular SNS.

Since all SNSs are upgraded along the same upgrade path [refer to architecture part], this is what allows SNSs to nevertheless customise the rules of their governance, the tokenomics, etc to meet their needs.

## The `ManageNervousSystemParameters` proposal

The proposal `ManageNervousSystemParameters` allows the SNS community to adjust these parameters at any time.

### Relevant type signatures

```candid
    type ManageNervousSystemParameters : NervousSystemParameters;

    type NervousSystemParameters = record {
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
    };

    type DefaultFollowees = record { 
        followees : vec record { 
            nat64; 
            Followees 
        } 
    };

    type Followees = record { followees : vec NeuronId };

    type NeuronId = record { id : vec nat8 };

    type NeuronPermissionList = record { permissions : vec int32 };

    type VotingRewardsParameters = record {
        final_reward_rate_basis_points : opt nat64;
        initial_reward_rate_basis_points : opt nat64;
        reward_rate_transition_duration_seconds : opt nat64;
        round_duration_seconds : opt nat64;
    };
```

### Putting it together

```candid
    type ManageNervousSystemParameters: record {
        default_followees : opt record { 
            followees : vec record { 
                        nat64; 
                        record { followees : vec record { id : vec nat8 } } 
            } 
        };
        max_dissolve_delay_seconds : opt nat64;
        max_dissolve_delay_bonus_percentage : opt nat64;
        max_followees_per_function : opt nat64;
        neuron_claimer_permissions : opt record { permissions : vec int32 };
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
        neuron_grantable_permissions : opt record { permissions : vec int32 };
        voting_rewards_parameters : opt record {
            final_reward_rate_basis_points : opt nat64;
            initial_reward_rate_basis_points : opt nat64;
            reward_rate_transition_duration_seconds : opt nat64;
            round_duration_seconds : opt nat64;
        };
        maturity_modulation_disabled : opt bool;
        max_number_of_principals_per_neuron : opt nat64;
    }
```


```bash
# helpful definitions (only need to set these once). This is a sample neuron ID.
export PROPOSAL_NEURON_ID="594fd5d8dce3e793c3e421e1b87d55247627f8a63473047671f7f5ccc48eda63"
# example path for the PEM file. This is a sample PEM file path.
export PEM_FILE="/home/user/.config/dfx/identity/$(dfx identity whoami)/identity.pem"


quill sns  --canister-ids-file ./sns_canister_ids.json  --pem-file $PEM_FILE  make-proposal $DEVELOPER_NEURON_ID --proposal '(
    record {
        title = "Extend voting period to 5 days";
        url = "lorem ipsum";
        summary = "This proposal extends the 24 hour voting period to 5 days";
        action = opt variant {
            ManageNervousSystemParameters: record {

                default_followees = null;
                
                max_dissolve_delay_seconds = null;
                
                max_dissolve_delay_bonus_percentage = null;
                
                max_followees_per_function = null;
                
                neuron_claimer_permissions = null;
                
                neuron_minimum_stake_e8s = null;
                
                max_neuron_age_for_age_bonus = null;
                
                initial_voting_period_seconds = opt (432_000 : nat64);
                
                neuron_minimum_dissolve_delay_to_vote_seconds = null;
                
                reject_cost_e8s = null;
                
                max_proposals_to_keep_per_action = null;
                
                wait_for_quiet_deadline_increase_seconds = opt (86_400 : nat64);
                
                max_number_of_neurons = null;
                
                transaction_fee_e8s = null;
                
                max_number_of_proposals_with_ballots = null;
                
                max_age_bonus_percentage = null;
                
                neuron_grantable_permissions = null;
                
                voting_rewards_parameters = null;
                
                maturity_modulation_disabled = null;
                
                max_number_of_principals_per_neuron = null;
            };
    }
)' > msg.json

quill send message.json
```

See example [proposal of an active SNS](https://dashboard.internetcomputer.org/sns/7jkta-eyaaa-aaaaq-aaarq-cai/proposal/6).

## The parameters

### `default_followees`

The set of default followees that every newly created neuron will follow per function. This is specified as a mapping of proposal functions to followees. If unset, neurons will have no followees by default. The number of followees for each function can be at most `max_followees_per_function`.

### `max_dissolve_delay_seconds`
  
The maximum dissolve delay that a neuron can have, given in seconds. That is, the maximum
that a neuron's dissolve delay can be increased to. The maximum is also enforced
when saturating the dissolve delay bonus in the voting power computation.

### `max_dissolve_delay_bonus_percentage`

E.g. if a large dissolve delay can double the voting power of a neuron,
then this field would have a value of 100, indicating a maximum of
100% additional voting power.

For no bonus, this should be set to 0.

To achieve functionality equivalent to NNS, this should be set to 100.

### `max_followees_per_function`

The maximum number of followees each neuron can have for each nervous system function.

This number can be at most as large as the defined ceiling
`MAX_FOLLOWEES_PER_FUNCTION_CEILING` (15 at time of writing).

### `neuron_claimer_permissions`

The default set of neuron permissions granted to the principal claiming a neuron.

### `neuron_minimum_stake_e8s`

The minimum number of e8s (10E-8 of a token) that can be staked in a neuron.

To ensure that staking and disbursing of the neuron work, the chosen value
must be larger than the `transaction_fee_e8s` set in the SNS ledger canister.

### `max_neuron_age_for_age_bonus`

The maximum age of a neuron, defined in seconds, that saturates the age bonus for the voting power computation.

### `initial_voting_period_seconds`

The initial voting period of a proposal, given in seconds. Changing this parameter will not affect existing proposals.

### `neuron_minimum_dissolve_delay_to_vote_seconds`

The minimum dissolve delay, defined in seconds, that a neuron must have to be eligible to vote.

The chosen value must be smaller than `max_dissolve_delay_seconds`.

## `reject_cost_e8s`

The number of e8s (10E-8 of a token) that a rejected
proposal costs the proposer.

### `max_proposals_to_keep_per_action`

The maximum number of proposals to keep, per action (i.e., proposal type). When the
total number of proposals for a given action is greater than this
number, the oldest proposals that have reached final decision state
(rejected, executed, or failed) and final rewards status state
(settled) may be deleted.

The number must be larger than zero and at most be as large as the
defined ceiling `MAX_PROPOSALS_TO_KEEP_PER_ACTION_CEILING` (700 at time of writing).

### `wait_for_quiet_deadline_increase_seconds`

A parameter of the wait-for-quiet algorithm that increases the voting period of a proposal if it is controversial and changes the voting outcome. 
A proposal's voting period starts with `initial_voting_period_seconds` seconds and will be incresed at most by two twice the seconds defined in `wait_for_quiet_deadline_increase_seconds`.
Changing this parameter does not affect existing proposals.

### `max_number_of_neurons`

The maximum number of allowed neurons. When this maximum is reached, no new
neurons will be created until some are removed.

This number must be larger than zero and at most as large as the defined
ceiling `MAX_NUMBER_OF_NEURONS_CEILING` (200_000 at time of writing).

### `transaction_fee_e8s`

The transaction fee, in 10E-8 of an SNS token, that must be paid for ledger transactions (except
minting and burning governance tokens).

### `max_number_of_proposals_with_ballots`

The max number of proposals for which ballots are still stored, i.e.,
unsettled proposals. If this number of proposals is reached, new proposals
can only be added in exceptional cases (for few proposals it is defined
that they are allowed even if resources are low to guarantee that the relevant
canisters can be upgraded).

This number must be larger than zero and at most as large as the defined
ceiling `MAX_NUMBER_OF_PROPOSALS_WITH_BALLOTS_CEILING` (700 at time of writing).

### `max_age_bonus_percentage`

Analogous to `max_dissolve_delay_bonus_percentage`,
but this one relates to neuron age instead of dissolve delay.

To achieve functionality equivalent to NNS, this should be set to 25.

### `neuron_grantable_permissions`

The superset of neuron permissions a principal with permission
`NeuronPermissionType::ManagePrincipals` for a given neuron can grant to another
principal for this same neuron. If this set changes via a `ManageNervousSystemParameters` proposal, previous neurons' permissions will be unchanged and only newly granted permissions will be affected.

### `voting_rewards_parameters`

When this field is not populated, voting rewards are "disabled". Changing this should be evaluated carefully as it might be hard to understand rewards if they change.

The reward parameters are:

```bash
final_reward_rate_basis_points : opt nat64;
initial_reward_rate_basis_points : opt nat64;
reward_rate_transition_duration_seconds : opt nat64;
round_duration_seconds : opt nat64;
```

### `maturity_modulation_disabled`

By default, [maturity modulation](https://wiki.internetcomputer.org/wiki/Maturity_modulation) is enabled; however, an SNS can use this
field to disable it. When disabled, this canister will still poll the
Cycles Minting Canister (CMC), and store the value received therefrom.
However, the fetched value does not get used when this is set to true.

The reason we call this "disabled" instead of (positive) "enabled" is so
that the protobuf default (bool fields are false) and our application default
(enabled) agree.

### `max_number_of_principals_per_neuron`

The maximum number of principals that can have permissions for a neuron.
