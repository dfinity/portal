# Managing Nervous System Parameters

## The `ManageNervousSystemParameters` proposal

The nervous system parameters define the settings of a particular SNS.

Since all SNSs are upgraded along the same upgrade path [refer to architecture part], this is what allows SNSs to nevertheless customise the rules of their governance, the tokenomics, etc to meet their needs.

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

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "Increase the maximum dissolve delay";
        url = "lorem ipsum";
        summary = "Proposal to adjust the SNS nervous system parameters so that newly the maximum dissolve delay that a neuron can have it set to 10 years. All other nervous system parameters should remain as they are now.";
        action = opt variant {
            ManageNervousSystemParameters: record {
                default_followees : opt record { 
                    followees : vec record { 
                                nat64; 
                                record { followees : vec record { id : vec {1:nat8, 2:nat8} } }  
                    } 
                };
                max_dissolve_delay_seconds = opt 42:nat64;
                max_dissolve_delay_bonus_percentage = opt 42:nat64;
                max_followees_per_function = opt 42:nat64;
                neuron_claimer_permissions = opt record { permissions = vec {1:int32, 2:int32} };
                neuron_minimum_stake_e8s = opt 42:nat64;
                max_neuron_age_for_age_bonus = opt 42:nat64;
                initial_voting_period_seconds = opt 42:nat64;
                neuron_minimum_dissolve_delay_to_vote_seconds = opt 42:nat64;
                reject_cost_e8s = opt 42:nat64;
                max_proposals_to_keep_per_action = opt 42:nat32;
                wait_for_quiet_deadline_increase_seconds = opt 42:nat64;
                max_number_of_neurons = opt 42:nat64;
                transaction_fee_e8s = opt 42:nat64;
                max_number_of_proposals_with_ballots = opt 42:nat64;
                max_age_bonus_percentage = opt 42:nat64;
                neuron_grantable_permissions = opt record { permissions : vec {1:int32, 2:int32} };
                voting_rewards_parameters = opt record {
                    final_reward_rate_basis_points = opt 42:nat64;
                    initial_reward_rate_basis_points = opt 42:nat64;
                    reward_rate_transition_duration_seconds = opt 42:nat64;
                    round_duration_seconds = opt 42:nat64;
                };
                maturity_modulation_disabled = opt true:bool;
                max_number_of_principals_per_neuron = opt 42:nat64;
            };
    }
)'
```