# SNS proposals

## Overview

To manage an SNS, the SNS community needs to understand how proposals work, how they can be submitted, voted on, and what effect they have. This article explains the different types of proposals and how to work with them.

## Background

On a high level, a proposal is defined by a particular method on a particular canister that is called if the proposal is adopted by the SNS.
When the proposal is adopted, this method is called and executed fully on chain.

In some cases, this method is on the SNS governance itself and in other cases, the method that is called can be defined in another canister.

### Native proposals

An SNS comes with built-in proposals called “native proposals”.

There are the following types:

* `Motion`
* `AddGenericNervousSystemFunction`
* `RemoveGenericNervousSystemFunction`
* `UpgradeSnsToNextVersion`
* `RegisterDappCanisters`
* `DeregisterDappCanisters`
* `TransferSnsTreasuryFunds`
* `UpgradeSnsControlledCanister`
* `ManageSnsMetadata`
* `ExecuteGenericNervousSystemFunction`

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

## Governance canister interface

All of the proposals used to manage an SNS are executed on the SNS governance canister so it helps to have for reference, what the [interface for the governance canister](https://sourcegraph.com/github.com/dfinity/ic@4732d8281404c0a7c1e0a91937ffd0e54f2beced/-/blob/rs/sns/governance/canister/governance.did) is.

Below are the most important types for the purpose of this article:

```candid
    type Account = record { 
        owner : opt principal; 
        subaccount : opt Subaccount 
    };

    //proposals types for managing an SNS
    type Action = variant {
        ManageNervousSystemParameters : NervousSystemParameters;
        AddGenericNervousSystemFunction : NervousSystemFunction;
        RemoveGenericNervousSystemFunction : nat64;
        UpgradeSnsToNextVersion : record {};
        RegisterDappCanisters : RegisterDappCanisters;
        TransferSnsTreasuryFunds : TransferSnsTreasuryFunds;
        UpgradeSnsControlledCanister : UpgradeSnsControlledCanister;
        DeregisterDappCanisters : DeregisterDappCanisters;
        Unspecified : record {};
        ManageSnsMetadata : ManageSnsMetadata;
        ExecuteGenericNervousSystemFunction : ExecuteGenericNervousSystemFunction;
        Motion : Motion;
    };
```

## Using quill to submit proposals

### Submitting via `sns make-proposal` command

Any eligible neuron can submit a proposal. Therefore, the command to [submit a proposal](https://github.com/dfinity/quill/blob/master/docs/cli-reference/sns/quill-sns-make-proposal.md)
`sns make-proposal` is a `ManageNeuron` message. With this command, neuron holders can submit proposals (such as a Motion Proposal) to be voted on by other neuron holders. The structure:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal <PROPOSAL> [option]
```

where `<PROPOSAL>` is a formatted candid record:

```candid
(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            <PROPOSAL_TYPE> = <PARAMETERS_OF_PROPOSAL_TYPE>
            }
        };
    }
)
```

The CLI command structure is

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            <PROPOSAL_TYPE> = <PARAMETERS_OF_PROPOSAL_TYPE>
        };
    }
)'
```

For example, if we use the candid record for <PROPOSAL_TYPE> `Motion`, the CLI-friendly command to submit a `Motion` proposal is:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "SNS is great";
        url = "https://dfinity.org\";
        summary = "This is a motion proposal to see if people agree on the fact that the SNS is great.";
        action = opt variant {
            Motion = record {
                motion_text = "I hereby raise the motion that the use of the SNS shall commence";
            }
        };
    }
)'
```

## References for proposals
This article explains the different kinds of proposals and provides for each of them a concrete example of the quill command to submit it.
### `Motion`
A motion proposal is the only kind of proposal that does not have any immediate effect, i.e., it does not trigger the execution of a method as other proposals do. It can be used, for example for opinion polls before even starting certain features.  
### Relevant Type signature

```candid
    Motion: record {
        motion_text : text;
    }
```

### Putting it together

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            Motion = record {
                motion_text = "I hereby raise the motion that the use of the SNS shall commence";
            }
        };
    }
)'
```

## `AddGenericNervousSystemFunction`

### Relevant type signatures

```candid
    type AddGenericNervousSystemFunction : NervousSystemFunction;

    type NervousSystemFunction = record {
        id : nat64;
        name : text;
        description : opt text;
        function_type : opt FunctionType;
    };

    type FunctionType = variant {
        NativeNervousSystemFunction : record {};
        GenericNervousSystemFunction : GenericNervousSystemFunction;
    };

    type GenericNervousSystemFunction = record {
        validator_canister_id : opt principal;
        target_canister_id : opt principal;
        validator_method_name : opt text;
        target_method_name : opt text;
    };
```

### Putting it together

```candid
    type AddGenericNervousSystemFunction: record {
        id : nat64;
        name : text;
        description : opt text;
        function_type : opt variant {
            GenericNervousSystemFunction : record {
                validator_canister_id : opt principal;
                target_canister_id : opt principal;
                validator_method_name : opt text;
                target_method_name : opt text;
            }
        };
    };
```

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "Adding a new generic proposal";
        url = "https://dfinity.org";
        summary = "Adding a new generic proposal that allows to change the background colour of the dapp. Specifically, proposals of this kind will trigger a call to the method change_colour on canister dapp_canister.";
        action = opt variant {
            AddGenericNervousSystemFunction = record {
                id = 42:nat64;
                name = "lorem ipsum":text;
                description = opt "lorem ipsum":text;
                function_type : opt variant {
                    GenericNervousSystemFunction = record {
                        validator_canister_id = opt principal "ltyfs-qiaab-aaaak-aan3a-cai";
                        target_canister_id = opt principal "ltyfs-qiaab-aaaak-aan3a-cai";
                        validator_method_name = opt "lorem ipsum":text;
                        target_method_name = opt "lorem ipsum":text;
                    }
                };
            }
        };
    }
)'
```

## `RemoveGenericNervousSystemFunction`
Similarly to how generic proposal are added, they can also be removed again if the SNS DAO thinks that they should no longer be supported. 
To do so, they can use the proposal  `AddGenericNervousSystemFunction` which specifies the ID of the generic nervous system function to be removed.
### Relevant type signatures

```candid
    type RemoveGenericNervousSystemFunction : nat64;
```

### Putting it together

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "Remove the generic proposal ...";
        url = "https://dfinity.org";
        summary = "Proposal to remove the generic nervous system function with ID 123456789 that changed the dapp's background colour as this is no longer needed.";
        action = opt variant {
            RemoveGenericNervousSystemFunction = 123456789:nat64;
        };
    }
)'
```

## `UpgradeSnsToNextVersion`
Recall that all approved SNS canister versions are stored on the NNS canister [SNS-W](introduction/sns-architecture). 
New SNS canister wasm codes are approved by NNS proposals and then added to SNS-W. 
Each SNS community can then simply decide if and when they want to upgrade their SNS instance to the next SNS version that is available on SNS-W. 
To do so, they can use an `UpgradeSnsToNextVersion`proposal. 
If this proposal is adopted, it will trigger a call to SNS root that will ask SNS-W which new wasm version is available and then upgrade to this new version. 
### Relevant type signatures

```candid
    type UpgradeSnsToNextVersion : record {};
```

### Putting it together

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "Upgrade SNS to next available version";
        url = "https://dfinity.org";
        summary = "A proposal to upgrade the SNS DAO to the next available version on SNS-W";
        action = opt variant {
            UpgradeSnsToNextVersion = record {};
        };
    }
)'
```

## `RegisterDappCanisters`
An SNS controls a set of dapp cansiters. 
An SNS community can decide that new dapps should be added to the SNS' control. 
The proposal `RegisterDappCanisters`allows the SNS to accept the control of a set of new dapp canisters. The new canisters that should be registered are identified by their canister ID and it is allowed to register a list of canisters (not just a single one).
### Relevant type signatures

```candid
    type RegisterDappCanisters : RegisterDappCanisters;

    type RegisterDappCanisters = record { canister_ids : vec principal };
```

### Putting it together

```candid
    type RegisterDappCanisters: record {
        canister_ids : vec principal
    };
```

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "Register new dapp canisters";
        url = "https://dfinity.org";
        summary = "Proposal to register two new dapp canisters, with ID ltyfs-qiaaa-aaaak-aan3a-cai and ltyfs-qiaaa-aaaak-aan3a-cai to the SNS.";
        action = opt variant {
            RegisterDappCanisters = record {
                canister_ids = vec {principal "ltyfs-qiaaa-aaaak-aan3a-cai", principal "ltyfs-qiaaa-aaaak-aan3a-cai"};
            };
        };
    }
)'
```

## `DeregisterDappCanisters` 

### Relevant type signatures

```candid
    type DeregisterDappCanisters : DeregisterDappCanisters;

    type DeregisterDappCanisters = record {
        canister_ids : vec principal;
        new_controllers : vec principal;
    };
```

### Putting it together

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            DeregisterDappCanisters = record {
                canister_ids = vec principal;
                new_controllers = vec principal;
            };
        };
    };
)'
```

## `TransferSnsTreasuryFunds`
The SNS DAO has control over a treasury from which funds can be sent to other accounts by `TransferSnsTreasuryFunds` proposals. 
To do so, one has to define the following arguments... 
### Relevant type signatures

```candid
    type TransferSnsTreasuryFunds = record {
        from_treasury : int32;
        to_principal : opt principal;
        to_subaccount : opt Subaccount;
        memo : opt nat64;
        amount_e8s : nat64;
    };

    type Subaccount = record { subaccount : vec nat8 };
```

### Putting it together

```candid
    type TransferSnsTreasuryFunds = record {
        from_treasury : int32;
        to_principal : opt principal;
        to_subaccount : opt record { subaccount : vec nat8 };
        memo : opt nat64;
        amount_e8s : nat64;
    };
```

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "Lorem ipsum";
        url = "Lorem ipsum";
        summary = "Lorem ipsum";
        action = opt variant {
            TransferSnsTreasuryFunds = record {
                from_treasury = int32;
                to_principal = opt principal;
                to_subaccount = opt record { subaccount = vec nat8 };
                memo = opt nat64;
                amount_e8s = nat64;
               
            };
        };
    };
)'
```

## `UpgradeSnsControlledCanister` 
The proposal `UpgradeSnsControlledCanister` is to upgrade a dapp canister that is controlled by the SNS DAO to a new wasm. 
### Relevant type signatures

```candid
    type UpgradeSnsControlledCanister : UpgradeSnsControlledCanister;

    type UpgradeSnsControlledCanister = record {
        new_canister_wasm : vec nat8;
        mode : opt int32;
        canister_id : opt principal;
        canister_upgrade_arg : opt vec nat8;
    };
```

### Putting it together

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            UpgradeSnsControlledCanister = record {
                new_canister_wasm = vec nat8;
                mode = opt int32;
                canister_id = opt principal;
                canister_upgrade_arg = opt vec nat8;
            };
        };
    };
)'
```

## `DeregisterDappCanisters` 
The proposal `DeregisterDappCanisters` is the counterpart of `RegisterDappCanisters`.
If an SNS community decides that they would like to give up the control of a given dapp canister, they can use this proposal to do so. 
To this end, the proposal defines the canister ID of the dapp canister to be deregistered and a principal to whom the canister will be handed over to (i.e., this principal will be set as the new controller of the specified dapp canister).
### Relevant type signatures

```candid
    type DeregisterDappCanisters : DeregisterDappCanisters;

    type DeregisterDappCanisters = record {
        canister_ids : vec principal;
        new_controllers : vec principal;
    };
```

### Putting it together

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            DeregisterDappCanisters = record {
                canister_ids = vec principal;
                new_controllers = vec principal;
            };
        };
    };
)'
```


## `ManageSnsMetadata` 
Each SNS has a metadata that defines the SNS project and which includes a URL, e.g., under which the main dapp canister can be found, a logo, a name, and a description summarizing the purpose of the projects.
This metadata can be updated at any time, for example if there is a rebranding for the associated project.
To do so, the SNS DAO can use the proposal  `ManageSnsMetadata` which defines all of the above attributes.
### Relevant type signatures

```candid
    type  ManageSnsMetadata : ManageSnsMetadata;

    type ManageSnsMetadata = record {
        url : opt text;
        logo : opt text;
        name : opt text;
        description : opt text;
    };
```

### Putting it together

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            <PROPOSAL_TYPE> = <PARAMETERS_OF_PROPOSAL_TYPE>
        };
    }
)'
```

## `ExecuteGenericNervousSystemFunction` 
After a generic proposal has been registered with a  `AddGenericNervousSystemFunction` proposal, such a proposal can be submitted with a `ExecuteGenericNervousSystemFunction` proposal.
The proposal identifies the previously added generic proposal by an ID (so called `function_id`) and, in addition, defines a payload.
Upon submission of such a proposal, the defined validation method is called, which checks that the given payload is valid for this kind of proposal (the method that will be called for this is the method `validator_method_name` on the canister `validator_canister_id` as it was defined when the generic proposal was added. If this validation is successful, the proposal will be created.

Later, if the proposal is adopted, the SNS governance canister will call the method `target_method_name ` on the canister `target_canister_id` (as also define in the generic proposal) with the payload defined here.
### Relevant type signatures

```candid
    type ExecuteGenericNervousSystemFunction : ExecuteGenericNervousSystemFunction;

    type ExecuteGenericNervousSystemFunction = record {
        function_id : nat64;
        payload : vec nat8;
    };
```

### Putting it together

Example in bash:

```bash
quill sns make-proposal <PROPOSER_NEURON_ID> --proposal '(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            ExecuteGenericNervousSystemFunction = record {
                function_id = nat64;
                payload = vec nat8;
            }
        };
    }
)'
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