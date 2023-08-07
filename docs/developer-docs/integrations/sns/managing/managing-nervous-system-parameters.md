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
