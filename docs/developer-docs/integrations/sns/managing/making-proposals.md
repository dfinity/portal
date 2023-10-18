# SNS proposals

## Overview

To manage an SNS, the SNS community needs to understand how proposals work, how they can be submitted, voted on, and what effect they have.

This article explains the different kinds of proposals and provides an example quill command that can be used to submit each.

## Background

On a high level, a proposal is defined by a particular method on a particular canister that is called if the proposal is adopted by the SNS.
When the proposal is adopted, this method is called and executed fully on chain.

In some cases, this method is on the SNS governance itself and in other cases, the method that is called can be defined in another canister.

## Using quill to submit proposals

### Prerequisites

* [x] Install [`quill`](https://github.com/dfinity/quill).
* [x] Have a principal that owns an SNS neuron that can make proposals for an SNS.

### Submitting via `sns make-proposal` command

Any eligible neuron can submit a proposal. Therefore, the command to [submit a proposal](https://github.com/dfinity/quill/blob/master/docs/cli-reference/sns/quill-sns-make-proposal.md)
`sns make-proposal` is a `ManageNeuron` message. With this command, neuron holders can submit proposals (such as a `Motion` proposal) to be voted on by other neuron holders.

The structure of the commands is as follows:

```bash
# create and sign the proposal, store it in a message.json file
quill sns --canister-ids-file <PATH_TO_CANISTER_IDS_JSON_FILE> --pem-file <PATH_TO_PEM_FILE> make-proposal <PROPOSAL_NEURON_ID> --proposal '(
    record {
        title = "lorem ipsum";
        url = "lorem ipsum";
        summary = "lorem ipsum";
        action = opt variant {
            <PROPOSAL_TYPE> = <PARAMETERS_OF_PROPOSAL_TYPE>
        };
    }
)' > message.json

# send the proposal (stored in message.json) to the network
quill send message.json
```

* `<PATH_TO_CANISTER_IDS_JSON_FILE>` is the file path to a canister IDs JSON file. See example [sns_canister_ids.json](https://github.com/dfinity/quill/blob/master/e2e/assets/sns_canister_ids.json).
* `PROPOSAL_NEURON_ID` is the neuron ID of the neuron that is submitting the proposal.
* `<PATH_TO_PEM_FILE>` is the path to the PEM file of the identity that owns the neuron that is submitting the proposal. To generate a PEM file, see [here](https://internetcomputer.org/docs/current/references/quill-cli-reference/quill-generate).
* `title` is a short description of the proposal.
* `url` is a link to a document that describes the proposal in more detail.
* `summary` is a short summary of the proposal.
* `action` defines what the proposal does. Depending on the kind of proposal we require to provide different parameters that are defined in this part. As a proposal is just a call to a method, these parameters define with which arguments the target method will be called.

#### Concrete example

For example, if we use the candid record for <PROPOSAL_TYPE> `Motion`, the CLI-friendly command to submit a `Motion` proposal is:

```bash
# helpful definitions (only need to set these once). This is a sample neuron ID.
export PROPOSAL_NEURON_ID="594fd5d8dce3e793c3e421e1b87d55247627f8a63473047671f7f5ccc48eda63"
# example path for the PEM file. This is a sample PEM file path.
export PEM_FILE="/home/user/.config/dfx/identity/$(dfx identity whoami)/identity.pem"

# Note: <PROPOSAL_TYPE> is replaced with "Motion" and <PARAMETERS_OF_PROPOSAL_TYPE> with the parameters for the Motion proposal
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal $PROPOSAL_NEURON_ID --proposal '(
    record {
        title = "SNS is great";
        url = "https://sns-examples.com/proposal/42";
        summary = "This is a motion proposal to see if people agree on the fact that the SNS is great.";
        action = opt variant {
            Motion = record {

                motion_text = "I hereby raise the motion that the use of the SNS shall commence";

            }        
        };
    }
)' > message.json

quill send message.json
```

:::warning
In this article, we will not repeat the `export PROPOSAL_NEURON_ID` and `export PEM_FILE` lines for each example proposal, but it is recommended you set these variables in your terminal before submitting proposals.
:::

## Proposal types

This article describes the different kinds of proposals that can be submitted to an SNS: [Native propoposals](#native-proposals) and [generic proposals](#generic-proposals).

## Native proposals

An SNS comes with built-in proposals called “native proposals”.

There are the following types:

* [`Motion`](#motion).
* [`UpgradeSnsToNextVersion`](#upgradesnstonextversion).
* [`RegisterDappCanisters`](#registerdappcanisters).
* [`DeregisterDappCanisters`](#deregisterdappcanisters).
* [`TransferSnsTreasuryFunds`](#transfersnstreasuryfunds).
* [`UpgradeSnsControlledCanister`](#upgradesnscontrolledcanister).
* [`ManageSnsMetadata`](#managesnsmetadata).

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

:::info
See the types in the code [here](https://sourcegraph.com/github.com/dfinity/ic@4732d8281404c0a7c1e0a91937ffd0e54f2beced/-/blob/rs/sns/governance/proto/ic_sns_governance/pb/v1/governance.proto?L405) - they are called “action” in the code.
:::

### `Motion`

A motion proposal is the only kind of proposal that does not have any immediate effect, i.e., it does not trigger the execution of a method as other proposals do. For example, it can be used for opinion polls before even starting certain features.  

#### Relevant type signature

```candid
    Motion: record {
        motion_text : text;
    }
```

#### Putting it together

```bash
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal $PROPOSAL_NEURON_ID --proposal '(
    record {
        title = "SNS is great";
        url = "https://sns-examples.com/proposal/42";
        summary = "This is a motion proposal to see if people agree on the fact that the SNS is great.";
        action = opt variant {
            Motion = record {

                motion_text = "I hereby raise the motion that the use of the SNS shall commence";

            }        
        };
    }
)' > message.json

quill send message.json
```


### `UpgradeSnsToNextVersion`

Recall that all approved SNS canister versions are stored on the NNS canister [SNS-W](../introduction/sns-architecture).
New SNS canister wasm codes are approved by NNS proposals and then added to SNS-W.
Each SNS community can then simply decide if and when they want to upgrade their SNS instance to the next SNS version that is available on SNS-W.

To do so, they can use an `UpgradeSnsToNextVersion`proposal. If this proposal is adopted, it will trigger a call to SNS root that will ask SNS-W which new wasm version is available and then upgrade to this new version.

#### Relevant type signatures

```candid
    type UpgradeSnsToNextVersion : record {};
```

#### Putting it together

Example in bash:

```bash
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal $PROPOSAL_NEURON_ID --proposal '(
    record {
        title = "Upgrade SNS to next available version";
        url = "https://sns-examples.com/proposal/42";
        summary = "A proposal to upgrade the SNS DAO to the next available version on SNS-W";
        action = opt variant {
            UpgradeSnsToNextVersion = record {};
        };
    }
)' > message.json

quill send message.json
```

### `RegisterDappCanisters`

An SNS controls a set of dapp cansiters. An SNS community can decide that new dapps should be added to the SNS' control.
The proposal `RegisterDappCanisters` allows the SNS to accept the control of a set of new dapp canisters. The new canisters that should be registered are identified by their canister ID and it is allowed to register a list of canisters (not just a single one).

#### Relevant type signatures

```candid
    type RegisterDappCanisters : RegisterDappCanisters;

    type RegisterDappCanisters = record { canister_ids : vec principal };
```

#### Putting it together

```candid
    type RegisterDappCanisters: record {
        canister_ids : vec principal
    };
```

Example in bash:

```bash
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal $PROPOSAL_NEURON_ID --proposal '(
    record {
        title = "Register new dapp canisters";
        url = "https://sns-examples.com/proposal/42";
        summary = "Proposal to register two new dapp canisters, with ID ltyfs-qiaaa-aaaak-aan3a-cai and ltyfs-qiaaa-aaaak-aan3a-cai to the SNS.";
        action = opt variant {
            RegisterDappCanisters = record {

                canister_ids = vec {principal "ltyfs-qiaaa-aaaak-aan3a-cai", principal "ltyfs-qiaaa-aaaak-aan3a-cai"};
                
            };
        };
    }
)' > message.json

quill send message.json
```

### `DeregisterDappCanisters`

The proposal `DeregisterDappCanisters` is the counterpart of `RegisterDappCanisters`.
If an SNS community decides that they would like to give up the control of a given dapp canister, they can use this proposal to do so.
To this end, the proposal defines the canister ID of the dapp canister to be deregistered and a principal to whom the canister will be handed over to (i.e., this principal will be set as the new controller of the specified dapp canister).

#### Relevant type signatures

```candid
    type DeregisterDappCanisters : DeregisterDappCanisters;

    type DeregisterDappCanisters = record {
        canister_ids : vec principal;
        new_controllers : vec principal;
    };
```

#### Putting it together

Example in bash:

```bash
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal $PROPOSAL_NEURON_ID --proposal '(
    record {
        title = deregister dapp canisters";
        url = "https://sns-examples.com/proposal/42";
        summary = "This proposal gives up the control of a canister";
        action = opt variant {
            DeregisterDappCanisters = record {
                
                canister_ids = vec {principal "ltyfs-qiaaa-aaaak-aan3a-cai", principal "ltyfs-qiaaa-aaaak-aan3a-cai"};
                
                new_controllers = vec {principal "rymrc-piaaa-aaaao-aaljq-cai", principal "suaf3-hqaaa-aaaaf-bfyob-cai"};
            };
        };
    };
)' > message.json

quill send message.json
```

### `TransferSnsTreasuryFunds`

The SNS DAO has control over a treasury from which funds can be sent to other accounts by `TransferSnsTreasuryFunds` proposals.
To do so, one has to define the following arguments.

#### Relevant type signatures

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

#### Putting it together

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
        title = "Transfer 41100 ICP to Foo Labs";
        url = "https://sns-examples.com/proposal/42";
        summary = "Transfer 411 ICP to Foo Labs";
        action = opt variant {
            TransferSnsTreasuryFunds = record {

                from_treasury = 1 : int32;
                
                to_principal = opt principal "ozcnp-xcxhg-inakz-sg3bi-nczm3-jhg6y-idt46-cdygl-ebztx-iq4ft-vae";
                
                to_subaccount = null;
                
                memo = null;
                
                amount_e8s = 4_110_000_000_000 : nat64;
            };
        };
    };
)' > message.json

quill send message.json
```

See example [proposal of an active SNS](https://dashboard.internetcomputer.org/sns/3e3x2-xyaaa-aaaaq-aaalq-cai/proposal/202).

### `UpgradeSnsControlledCanister` 

The proposal `UpgradeSnsControlledCanister` is to upgrade a dapp canister that is controlled by the SNS DAO to a new wasm. 

#### Relevant type signatures

```candid
    type UpgradeSnsControlledCanister : UpgradeSnsControlledCanister;

    type UpgradeSnsControlledCanister = record {
        new_canister_wasm : vec nat8;
        mode : opt int32;
        canister_id : opt principal;
        canister_upgrade_arg : opt vec nat8;
    };
```

:::warning
Because this proposal requires passing wasm, which is unwieldy to copy/paste into the command line as binary, it is recommended that developers use the specially-made [`make-upgrade-canister-proposal`](https://github.com/dfinity/quill/blob/master/docs/cli-reference/sns/quill-sns-make-upgrade-canister-proposal.md) command in `quill sns`.


```bash
quill sns make-upgrade-canister-proposal <PROPOSER_NEURON_ID> --target-canister-id <TARGET_CANISTER_ID> --wasm-path <WASM_PATH> [option]
```

```bash
export $WASM_PATH="/home/user/new_wasm.wasm"
quill sns make-upgrade-canister-proposal --target-canister-id "4ijyc-kiaaa-aaaaf-aaaja-cai" --wasm-path $WASM_PATH $PROPOSAL_NEURON_ID > message.json
quill send message.json
```

:::

### `ManageSnsMetadata`

Each SNS has metadata that defines the SNS project and includes a URL, e.g., under which the main dapp canister can be found, a logo, a name, and a description summarizing the purpose of the projects. This metadata can be updated at any time, for example if there is a rebranding for the associated project. To do so, the SNS DAO can use the proposal  `ManageSnsMetadata` which defines all of the below attributes.

#### Relevant type signatures

```candid
    type  ManageSnsMetadata : ManageSnsMetadata;

    type ManageSnsMetadata = record {
        url : opt text;
        logo : opt text;
        name : opt text;
        description : opt text;
    };
```

#### Putting it together

Sometimes a user wants to change only part of the metadata. Suppose the metadata currently looks like this, but we want to change the `description` field only:

```
    url = "https://sns-examples.com/proposal/42";
    logo : "https://sns-examples.com/logo/img.jpg";
    name : "SNS Example #42";
    description : "Sample SNS used for educational purposes";
```

To update the `description` field, we can use the following command (where untouched fields get marked `null`).

Example in bash:

```bash
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal $PROPOSAL_NEURON_ID --proposal '(
    record {
        title = "lorem ipsum";
        url = "https://sns-examples.com/proposal/42";
        summary = "lorem ipsum";
        action = opt variant {
            ManageSnsMetadata = record {
                
                url = null;
                
                logo = null;
                
                name = null;
                
                description = "UPDATED Sample SNS used for educational purposes";
            };
        };
    }
)' > message.json

quill send message.json
```

Then the resulting metadata will end like this where only the `description` field changed:

```
    url = "https://sns-examples.com/proposal/42";
    logo : "https://sns-examples.com/logo/img.jpg";
    name : "SNS Example #42";
    description : "UPDATED Sample SNS used for educational purposes";
```

## Generic proposals

Each SNS community might have functions that they would like to only execute if the SNS DAO agrees on it but that might be very dapp-specific. Generic proposals, also called generic functions or generic nervous system functions, allow a flexible way for SNS communities to define such functions.

Some examples:

* A dapp may have a very complicated procedure to upgrade dapp canisters. For example, they may have a canister for each user, in which case they orchestrate over a “user root canister”. For this workflow, they would have to tell this canister what the user-canisters should be upgraded to and then trigger this upgrade. In a DAO-governed dapp this should happen via proposal.
* Many dapps have an asset canister. Updating the assets cannot be done via a normal canister upgrade as the content is larger than a proposal can be. Therefore we need a custom way to update the assets.
* Developers might want the DAO to be the only entity that can elect moderators, call certain methods, make certain payments etc…

For these cases, SNSs have so called "generic proposals". These are custom proposals that each SNS community can define itself.

Here we make use of an elegant aspect of our SNS architecture design: a proposal is just a call to a method on a canister. This means that one can do arbitrary things with a proposal as long as one can tell the SNS governance canister which method it has to call.

Typically a generic proposal will have the following structure: a developer send a proposal to add/execute/remove (e.g. `AddGenericNervousSystemFunction`) a "generic" nervous system function. So even though the proposal types below are technically "native proposal types", they are used to manage generic proposals.

* [`AddGenericNervousSystemFunction`](#addgenericnervoussystemfunction).
* [`RemoveGenericNervousSystemFunction`](#removegenericnervoussystemfunction).
* [`ExecuteGenericNervousSystemFunction`](#executegenericnervoussystemfunction).

### Defining a generic proposal

A generic proposal is defined by two parts:

1. **A target method and canister** (respectively called `target_method_name` and `target_canister_id` in the code): This is the method that will be called if this generic proposal is adopted. A community can implement any behavior in a proposal by writing within a target method on a canister, then registering that target method in a generic proposal.

2. **A validator method and canister** (respectively called `validator_method_name` and `validator_canister_id` in the code): Since the governance canister is not aware of what a generic proposal does or in which context it will be applied, it cannot validate the proposal’s payload. Therefore, to check whether a proposal’s payload is valid at proposal submission time, the SNS community must implement this validation in a separate method (this can be on the same canister as the target method or on a different one). This method is then called whenever such a generic proposal is submitted. If the validator method fails, the proposal will not put to vote in the SNS.

Putting this together, this is how generic proposals work. When a generic proposal is submitted to SNS governance, SNS governance calls the validator method on the validator canister to see if the payload makes sense. If this is the case, the proposal is created and can be voted on. If the proposal is adopted, then the SNS governance canister will execute the proposal by calling the target method on the target canister.

Together, this is the type of a generic proposal in the code:

```candid
  type GenericNervousSystemFunction = record {
        validator_canister_id : opt principal;
        target_canister_id : opt principal;
        validator_method_name : opt text;
        target_method_name : opt text;
    };
```

### Security considerations when designing generic proposals

There are a few important, security-critical considerations to make when adding a generic proposal. We list a few recommendations here:

* **The canisters where the target and validator methods are defined should be controlled by the SNS DAO.** Otherwise, such a method could change the behavior or not be available without the SNS’s control. If you need to call another method, consider the next point.
* **Make sure that the target and validator methods always return an answer.** If this is not the case, there is a risk that the SNS governance canister has some open call contexts, which in turn means that it cannot be stopped and therefore cannot be upgraded. This is very risky, e.g., if an urgent upgrade of governance is needed. Therefore it is recommended to only call trusted code.
* **Validate everything that your code relies on again during the execution time.** Even though one method is “validator”, its main purpose is to disregard proposal contents that are obviously wrong. However, due to the fact that a proposal is voted on for multiple days, any validation that you did when the proposal was submitted might have become incorrect by the time the proposal is executed. Therefore it is of utmost importance to repeat any validation in the target method, which is important for the validation of the proposal.
* **Avoid asynchronous inter-canister calls in the validator and target method to minimize the risk for re-entrancy bugs.** During the execution of inter-canister calls, other execution can happen (thus interleaving with your method) and change the state of the system. The easiest way to avoid this risk is to avoid inter-canister calls.
* **If inter-canister calls cannot be avoided, try to limit them to the last operation of your validator and target methods.** A prominent source of bugs with inter-canister calls is to check a condition, then apply an inter-canister call, and then execute code that relies on this condition. This is called TOCTOU-bug: the status of the system has changed between the time of check and time of use of a condition. One way to avoid that a checking and using of a condition are separated by an inter-canister call is to defer all inter-canister calls to the very end of the method.
* **If the above is also not possible, implement a lock to avoid re-entrancy bugs.** If the above two recommendations cannot be applied, implement a lock to ensures that no method that would change a relevant condition can be executing during the validator and target method.

See more [general security best practices](https://github.com/dfinity/portal/blob/master/docs/developer-docs/security/general-security-best-practices.md).

### Adding/removing generic proposals

**To use a generic proposal, it first needs to be added to the SNS governance system.** This means that the SNS DAO needs to approve that this is a proposal that should be supported going forward. As we have seen that generic proposals also have security implications it is important to have this explicit approval.

Generic proposals can then also be removed again from SNS governance if they are not needed anymore.

To use a generic proposal, i.e., submit such a proposal, one uses the “execute generic nervous system function” proposal type and specifies which of the registered generic proposals should be used. We next explain how to submit each of these proposals.

### `AddGenericNervousSystemFunction`

This *native proposal* type is used to **add** a *generic functions* as *generic proposals* to the SNS governance system. Proposers must select and `id` to be used to identify this generic proposal, and this id is then used to follow other neurons on this proposal. Ids 0-999 are reserved for native proposal types that may be added in the future, all other ids are valid.

#### Relevant type signatures

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

#### Putting it together

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
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal $PROPOSAL_NEURON_ID --proposal '(
    record {
        title = "Add a new custom SNS function to \"Import proposals group into community\"";          
        url = "https://github.com/open-chat-labs/open-chat/blob/252b85a1877240dfea17512647ac42ac36e969db/backend/canisters/proposals_bot/impl/src/updates/import_proposals_group_into_community.rs";        
        summary = "Adding a new generic proposal that allows to change the background colour of the dapp. Specifically, proposals of this kind will trigger a call to the method change_colour on canister dapp_canister.";
        action = opt variant {
            AddGenericNervousSystemFunction = record {
                id = 4_003 : nat64;
                name = "Import proposals group into community";
                description = opt "Import the specified proposals group into the specified community.";
                function_type = opt variant { 
                    GenericNervousSystemFunction = record { 

                        validator_canister_id = opt principal "iywa7-ayaaa-aaaaf-aemga-cai"; 

                        target_canister_id = opt principal "iywa7-ayaaa-aaaaf-aemga-cai"; 
                        
                        validator_method_name = opt "import_proposals_group_into_community_validate"; 
                        
                        target_method_name = opt "import_proposals_group_into_community";
                    } 
                };
            }
        };
    }
)' > message.json

quill send message.json
```

See example [proposal of an active SNS](https://dashboard.internetcomputer.org/sns/3e3x2-xyaaa-aaaaq-aaalq-cai/proposal/177).

### `ExecuteGenericNervousSystemFunction`

This *native proposal* type is used to **execute** a *generic functions* as *generic proposals* to the SNS governance system.


After a generic proposal has been registered with a `AddGenericNervousSystemFunction` proposal, such a proposal can be submitted with a `ExecuteGenericNervousSystemFunction` proposal.
The proposal identifies the previously added generic proposal by an ID (so called `function_id`) and, in addition, defines a payload.
Upon submission of such a proposal, the defined validation method is called, which checks that the given payload is valid for this kind of proposal (the method that will be called for this is the method `validator_method_name` on the canister `validator_canister_id` as it was defined when the generic proposal was added. If this validation is successful, the proposal will be created.

Later, if the proposal is adopted, the SNS governance canister will call the method `target_method_name` on the canister `target_canister_id` (as also define in the generic proposal) with the payload defined here.

#### Relevant type signatures

```candid
    type ExecuteGenericNervousSystemFunction : ExecuteGenericNervousSystemFunction;

    type ExecuteGenericNervousSystemFunction = record {
        function_id : nat64;
        payload : vec nat8;
    };
```

#### Putting it together

Example in bash:

```bash
# sample payload by constructing a blob by using didc tool
export TEXT="${1:-Hoi}"
export BLOB="$(didc encode --format blob "(hello)" )"

quill sns  --canister-ids-file ./sns_canister_ids.json  --pem-file $PEM_FILE  make-proposal $DEVELOPER_NEURON_ID --proposal '(
    record { 
        title = "Execute generic functions for test canister."; 
        url = "https://example.com"; 
        summary = "This proposal executes generic functions for test canister."; 
        action = opt variant {
            ExecuteGenericNervousSystemFunction = record {

                function_id = 2000:nat64; 
                
                payload = ${BLOB}
            }
        }    
    }
)' > msg.json

quill send message.json
```

### `RemoveGenericNervousSystemFunction`

This *native proposal* type is used to **remove** a *generic functions* as *generic proposals* to the SNS governance system.

#### Relevant type signatures

```candid
    type RemoveGenericNervousSystemFunction : nat64;
```

#### Putting it together

Example in bash:

```bash
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal $PROPOSAL_NEURON_ID --proposal '(
    record {
        title = "Remove the generic proposal ...";
        url = "https://sns-examples.com/proposal/42";
        summary = "Proposal to remove the generic nervous system function with ID 1006 that changed the dapp background colour as this is no longer needed.";
        action = opt variant {
            RemoveGenericNervousSystemFunction = 1_006:nat64;
        };
    }
)' > message.json

quill send message.json
```

### Case study: Adding a generic proposal

The [SNS asset canister](https://internetcomputer.org/docs/current/developer-docs/integrations/sns/managing/sns-asset-canister) is a canister used to store and retrieve static assets. A dapp controlled by an SNS may have its own associated asset canister. 

The problem: To commit changes to the asset canister associated with a dapp under SNS control, we need to use generic proposals.

To do this, the SNS governance needed to add a new proposal type, one that would execute the custom [`commit_proposed_batch` function](https://internetcomputer.org/docs/current/developer-docs/integrations/sns/managing/sns-asset-canister/#sns-genericnervoussystemfunctions).

See the code for the `commit_proposed_batch` function [here](https://github.com/dfinity/sdk/blob/987d384cb4939e7b3dba0c820ff576cff0d41af8/src/canisters/frontend/ic-certified-assets/src/lib.rs#L264):

```rust
#[update]
#[candid_method(update)]
fn validate_commit_proposed_batch(arg: CommitProposedBatchArguments) -> Result<String, String> {
    STATE.with(|s| s.borrow_mut().validate_commit_proposed_batch(arg))
}
```

where `validate_commit_proposed_batch` is [here](https://github.com/dfinity/sdk/blob/f227ac05ea3b2c7f6d10025ee255e222b34b6e3e/src/canisters/frontend/ic-certified-assets/src/state_machine.rs#L650):

```rust
    pub fn validate_commit_proposed_batch(
        &self,
        arg: CommitProposedBatchArguments,
    ) -> Result<String, String> {
        self.validate_commit_proposed_batch_args(&arg)?;
        Ok(format!(
            "commit proposed batch {} with evidence {}",
            arg.batch_id,
            hex::encode(arg.evidence)
        ))
    }
```

Following the steps to add this proposal, the first thing needed is to to submit a new `AddGenericNervousSystemFunction` SNS Proposal to support the `commit_proposed_batch` API. In our case:

* validator_canister_id : opt principal = asset canister principal
* target_canister_id : opt principal = asset canister principal
* validator_method_name : opt text = "commit_proposed_batch"
* target_method_name : opt text = "validate_commit_proposed_batch"

If we assume the principal of a particular asset canister for an SNS is, `iywa7-ayaaa-aaaaf-aemga-cai`, the command line call would be:

```bash
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal $PROPOSAL_NEURON_ID --proposal '(
    record {
        title = "Add a new custom SNS function to the asset canister";          
        url = "https://github.com/dfinity/sdk/blob/987d384cb4939e7b3dba0c820ff576cff0d41af8/src/canisters/frontend/ic-certified-assets/src/lib.rs#L264";        
        summary = "Adding custom function to the asset canister of SNS foo";
        action = opt variant {
            AddGenericNervousSystemFunction = record {
                id = 4_003 : nat64;
                name = "Add a new custom SNS function to the asset canistery";
                description = opt "Add a new custom SNS function to the asset canister";
                function_type = opt variant { 
                    GenericNervousSystemFunction = record { 

                        validator_canister_id = opt principal "iywa7-ayaaa-aaaaf-aemga-cai"; 

                        target_canister_id = opt principal "iywa7-ayaaa-aaaaf-aemga-cai"; 
                        
                        validator_method_name = opt "validate_commit_proposed_batch"; 
                        
                        target_method_name = opt "commit_proposed_batch";
                    } 
                };
            }
        };
    }
)' > message.json

quill send message.json
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