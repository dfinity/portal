---
keywords: [intermediate, governance, concept, nns]
---

import { MarkdownChipRow } from "/src/components/Chip/MarkdownChipRow";

# Neuron management

<MarkdownChipRow labels={["Intermediate", "Governance", "Concept"]} />

## Overview 
This page describes the technical APIs used to manage neurons on the NNS.
If you are building a project that offers neuron staking or custody support, this page is particularly useful.

View the most up-to-date [`candid` definition for the NNS governance canister](https://github.com/dfinity/ic/blob/master/rs/nns/governance/canister/governance.did).
This page will focus on the neuron interactions and explain some of the relevant definitions from this Candid file.

## Neuron attributes
Before explaining how to modify a neuron, it is important to understand the most important parts of a neuron.
Every user can stake ICP utility tokens into a neuron and pariticipate in the NNS DAO with this neuron.  

* **Neuron ID**: Each neuron has an identity selected by NNS governance at neuron creation.
* **Account**: Each neuron has an associated account on the ICP ledger where the locked ICP balance resides. This account is owned by the NNS governance canister and therefore a user cannot move staked tokens.
* **Controller**: The principal that controls the neuron. The principal must identify a public key pair, which acts as a “master key,” such that the corresponding secret key should be kept very secure. A principal can control many neurons.

* **Dissolve delay & dissolve state**: The tokens in a neuron are locked for a specified time, called the _dissolve delay_. This can be thought of like a timer.
  * A neuron can be _non-dissolving_ which means that the timer is stopped and the neuron's dissolve delay remains the same. 
  * A neuron can be _dissolving_ which means that the timer is decreasing the neuron's dissolve delay as time passes. 
  * Once the timer has counted down, a neuron is _dissolved_ and the ICP tokens can be unstaked again.
* **Age**: Every non-dissolving neuron has an age, which denotes how long it has been in the non-dissolving state. 
A neuron's dissolve delay and age increases the neuron's voting power. 

* **Maturity (positive number – percent)**:  When neurons vote, over time the NNS increases their maturity to reward them. Maturity can be converted into ICP by spawning (see below).

### Interacting with neurons
All interactions with a neuron go through the following API on the NNS governance canister. This includes everything in a neuron's lifetime such as the neuron's creation, modifications and voting, and unstaking the ICP tokens.
```
type ManageNeuron = record {
  id : opt NeuronId;
  command : opt Command;
  neuron_id_or_subaccount : opt NeuronIdOrSubaccount;
};
```

### Creating a neuron and topping it up
Staking ICP utility tokens in a neuron involves two commands:
1. Sending ICP utility tokens to the neuron's subaccount.
2. Claiming the neuron on the NNS governance canister, which tells the governance canister that the transfer in (1) happened, upon which the NNS governance will create a new neuron.

To follow these steps, you first need to know the principal that should control the neuron and you need to choose a nonce. Based on these two inputs you can compute the required subaccount.
View for example the method [`compute_neuron_staking_subaccount_bytes`](https://github.com/dfinity/ic/blob/master/rs/nervous_system/common/src/ledger.rs) which computes the subaccount given a controller principal and a nonce. Make sure you are using an up-to-date version of this code in your application.

:::info
It is of utmost importance to ensure that the subaccount is computed correctly in the first step and remembered so that it can be reused in the second step.
If this fails, funds could be sent to a dead account and be unrecoverable.

:::

First learn the controller principal and choose a nonce.
Then, for the ledger transfer, view the [relevant `candid` interface](https://github.com/dfinity/ic/blob/master/rs/rosetta-api/icp_ledger/ledger.did#L25) which contains the following details for a transaction.
```
type Transaction = record {
    memo : Memo;
    icrc1_memo: opt blob;
    operation : opt Operation;
    created_at_time : TimeStamp;
}; 
type Operation = variant {
    ...
    Transfer : record {
        from : AccountIdentifier;
        to : AccountIdentifier;
        amount : Tokens;
        fee : Tokens;
        spender : opt vec nat8;
    };
    ...
};
```
To make a transfer to the correct subaccount, choose the `memo` equal your chosen nonce and `operation` to be a transfer. You can make the transfer from any `from` account that you control. The `to` account should be the computed subaccount for the neuron. To later stake a neuron, the `amount` must be at least 1 ICP. Set the `fee` to the standard fee of the ICP ledger canister.

To complete the second step, claim the neuron using the following command. 


To claim the neuron, use the following command:
TODO: WHICH WAY IS RECOMMENDED? ADD ARGUMENT EXPLANATION
```
type ClaimOrRefresh = record { by : opt By };
type By = variant {
  NeuronIdOrSubaccount : record {};
  MemoAndController : ClaimOrRefreshNeuronFromAccount;
  Memo : nat64;
};
type ClaimOrRefreshNeuronFromAccount = record {
  controller : opt principal;
  memo : nat64;
};
```
Topping up an existing neuron with more tokens is called _refreshing_ a neuron and works in the same way.

First, additional tokens are sent to the neuron's account. 
Then, the NNS governance canister is informed so that it can update the neuron's stake after confirming with the ledger that there are new tokens.

:::info
Note that refreshing of a neuron will also update the neuron's age to account for the fact that the newly added tokens have no age.

:::

TODO: ADD ARGUMENT EXPLANATION AND WHAT TO DO DIFFERENTLY FOR THE REFRESHING

### Modifying a neuron's state

* **Start dissolving**: The neuron dissolve delay is like a kitchen timer that can only be turned in one direction. It can be arbitrarily increased, but only reduced by turning on dissolve mode and counting down. When the neuron is dissolving, its dissolve delay falls over time until it is either stopped or reaches zero. A neuron cannot vote (or earn rewards for voting) when its dissolve delay falls below six months. Once the dissolve delay reaches zero, it stops falling and the controlling principal can instruct the neuron to disburse.

* **Stop dissolving**: A neuron that is dissolving can be instructed to stop, whereupon its dissolve delay stops falling with time.
* **Increase dissolve delay**: The dissolve delay of a neuron can be increased up to a maximum of eight years.
```
type Configure = record { operation : opt Operation };
type Operation = variant {
  ...
  StopDissolving : record {};
  StartDissolving : record {};
  IncreaseDissolveDelay : IncreaseDissolveDelay;
  ...
  SetDissolveTimestamp : SetDissolveTimestamp;
};
type IncreaseDissolveDelay = record {
  additional_dissolve_delay_seconds : nat32;
};
type SetDissolveTimestamp = record { dissolve_timestamp_seconds : nat64 };
```

### Managing permissions of a neuron
* **Hot Keys (list of principal ID)**: Keys that can be used to perform actions with limited privileges, such as voting, without exposing the secret key corresponding to the principal (e.g., could be a WebAuthn key).

* **Add hot key**: Add a new hot key that can be used to manage the neuron. This provides an alternative to using the principal’s cold key to manage the neuron, which might be onerous and difficult to keep secure, especially if it is used regularly. A hot key might be a WebAuthn key that is maintained inside a user device, such as a smartphone.

* **Remove hot key**: Remove a hot key that has been previously assigned to the neuron.

```
type Configure = record { operation : opt Operation };
type Operation = variant {
  RemoveHotKey : RemoveHotKey;
  AddHotKey : AddHotKey;
  ...
};
type AddHotKey = record { new_hot_key : opt principal };
type RemoveHotKey = record { hot_key_to_remove : opt principal };
```

### Voting with a neuron
* **Follow relationships (mapping from topic to list of followers)**: A neuron can be configured to vote automatically by following other neurons on a topic-by-topic basis. For any valid topic, a list of followers can be specified, and the neuron will follow the vote of a majority of the followers on a proposal with a type belonging to that topic. If a null topic is specified, this acts as a catch-all that enables the neuron to follow the vote of followees where a rule has not been specified.

* **Recent votes**: A record of recent votes is maintained. This can provide a guide for those wishing to evaluate whether to follow a neuron or how their followers are voting.

* **Vote**: Have the neuron vote to either adopt or reject a proposal with a specified ID.
* **Follow**: Add a rule that enables the neuron to vote automatically on proposals that belong to a specific topic, by specifying a group of followee neurons whose majority vote is followed. The configuration of such follow rules can be used to:
    - Distribute control over voting power amongst multiple entities.
    - Have a neuron vote automatically when its owner lacks time to evaluate newly submitted proposals.
    - Have a neuron vote automatically when its owner lacks the expertise to evaluate newly submitted proposals.
    - For other purposes.

A follow rule specifies a set of followers. Once a majority of the followers vote to adopt or reject a proposal belonging to the specified topic, the neuron votes the same way. If it becomes impossible for a majority of the followers to adopt (for example, because they are split 50–50 between adopt and reject), then the neuron votes to reject. If a rule is specified where the proposal topic is null, then it becomes a catch-all-follow rule, which will be used to vote automatically on proposals belonging to topics for which no specific rule has been specified. If the list of followers is empty, this effectively removes the following rule.

TODO: HOW TO GET THE ID OF TOPICS BEFORE DOING THIS?

```
type RegisterVote = record { vote : int32; proposal : opt NeuronId };
type Follow = record { topic : int32; followees : vec NeuronId };
```


### Spwaning a neuron's rewards
* **Spawn**: When the maturity of a neuron has risen above a threshold, it can be instructed to spawn a new neuron. This creates a new neuron that locks a new balance of ICP on the ledger. The new neuron can remain controlled by the same principal as its parent, or be assigned to a new principal. When a neuron spawns a new neuron, its maturity falls to zero.

```
type Spawn = record {
  percentage_to_spawn : opt nat32;
  new_controller : opt principal;
  nonce : opt nat64;
};
```
### Disbursing / unstaking a neuron
* **Disburse**: When the dissolve delay of the neuron is 0, its controlling principal can instruct it to disburse the neuron’s stake. Its locked ICP balance is transferred to a specified new ledger account, and the neuron and its own ledger account disappear.
```
type Disburse = record {
  to_account : opt AccountIdentifier;
  amount : opt Amount;
};
```