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
To keep up to date with new NNS release proposals from DFINITY, you can subscribe to [this forum thread](https://forum.dfinity.org/t/nns-updates-aggregation-thread/23551). 

## Neuron attributes
Before explaining how to modify a neuron, it is important to understand the most important parts of a neuron.
Every user can stake ICP utility tokens into a neuron and pariticipate in the NNS DAO with this neuron.  

* **Neuron ID**: Each neuron has an identity selected by NNS governance at neuron creation.
* **Account**: Each neuron has an associated account on the ICP ledger where the locked ICP balance resides. This account is owned by the NNS governance canister and therefore a user cannot move staked tokens.
* **Controller**: The principal that controls the neuron. The principal must identify a public key pair, which acts as a “master key,” such that the corresponding secret key should be kept very secure. A principal can control many neurons.

* **Dissolve delay & dissolve state**: The tokens in a neuron are locked for a specified time, called the _dissolve delay_. This can be thought of like a kitchen timer that can only be turned in one direction. It can be arbitrarily increased, but only reduced by turning on the countdown and waiting for the time to pass. A neuron is eligible to vote if it has a dissolve delay of at least 6 months.
  * A neuron can be _non-dissolving_ which means that the timer is stopped and the neuron's dissolve delay remains the same. 
  * A neuron can be _dissolving_ which means that the timer is decreasing the neuron's dissolve delay as time passes. 
  * Once the timer has counted down, a neuron is _dissolved_ and the ICP tokens can be unstaked again.
* **Age**: Every non-dissolving neuron has an age, which denotes how long it has been in the non-dissolving state. 
A neuron's dissolve delay and age increases the neuron's voting power. 

* **Maturity**:  When neurons vote, over time the NNS increases their maturity to reward them. Maturity can be converted into ICP by spawning (see below).

## Interacting with neurons
All interactions with a neuron go through the following API on the NNS governance canister. This includes everything in a neuron's lifetime such as the neuron's creation, modifications and voting, and unstaking the ICP tokens.
```
type ManageNeuron = record {
  id : opt NeuronId;
  command : opt Command;
  neuron_id_or_subaccount : opt NeuronIdOrSubaccount;
};
```

### Creating a neuron and topping it up
Staking ICP utility tokens in a neuron involves three steps:
1. Compute the neuron's address on the ledger, where the staked tokens will be held. This corresponds to a subaccount of the NNS governance canister.
2. Send ICP utility tokens to the neuron's address computed in (1).
3. Claim the neuron on the NNS governance canister, which tells the governance canister that the transfer in (2) happened, upon which the NNS governance will create a new neuron.

Let us go through these steps in more detail.

**Compute the neuron's address**

To compute the neuron's address in the first Step, proceed as follows.

a) Learn the principal that should control the neuron and choose a nonce.
 
b) Computed the subaccount based on the two inputs from (a). View for example the method [`compute_neuron_staking_subaccount_bytes`](https://github.com/dfinity/ic/blob/master/rs/nervous_system/common/src/ledger.rs) which computes the subaccount given a controller principal and a nonce.
 
c) Compute the final account identifier on the ledger (that gives you the address) using the computed subaccount from (b) and the principal ID of the NNS governance canister. View for example the method [`neuron_subaccount`](https://github.com/dfinity/ic/blob/master/rs/nns/governance/src/governance.rs) which computes the account based on a given subaccount and with the NNS governance principal ID `GOVERNANCE_CANISTER_ID`.


 For the above steps, make sure you are using an up-to-date version of this code in your application.

:::info
It is of utmost importance to ensure that the address is computed correctly in the first step and remembered so that it can be reused in the second step.
If this fails, funds could be sent to a dead account and be unrecoverable.
It is recommended to test the corresponding code thoroughly. 

:::

**Send ICP to the neuron's account**

After having computed the neuron's address, make a transfer to this address. For this, view the [relevant `candid` interface of the ICP ledger](https://github.com/dfinity/ic/blob/master/rs/rosetta-api/icp_ledger/ledger.did#L25) which contains the following details for a transaction.
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
To make a transfer to the correct account, choose the `memo` equal your chosen nonce (from Step (1a)) and `operation` to be a transfer. You can make the transfer from any `from` account that you control. For the `to` account, use the account that you have computed in Step (1).
To later stake a neuron, the `amount` must be at least 1 ICP. Set the `fee` to the standard fee of the ICP ledger canister.

**Claim the neuron**

As a third step, claim the neuron using the following `ManageNeuron` command.
```
type ClaimOrRefreshNeuronFromAccount = record {
  controller : opt principal;
  memo : nat64;
};
```
The `controller` is the principal controller chosen in Step (1a) that will control the neuron and the `memo` is again the chosen nonce. 

_Required permissions:_ Anyone can make this call and claim a neuron for the specified controller.

**Topping up a neuron**
Topping up an existing neuron with more tokens is called _refreshing_ a neuron and works similarly to claiming a neuron.
1. Send additional ICP utility tokens to the (existing) neuron's address.
2. Refresh the neuron on the NNS governance canister, which tells the governance canister that the transfer in (1) happened, upon which the NNS governance will update the neuron's stake. 

:::info
Note that refreshing of a neuron will also update the neuron's age to account for the fact that the newly added tokens have no age.

:::

These steps happen analogously to the claiming of neurons above.
Again, care is advised to makes sure that the right account is computed and used.
When `ClaimOrRefreshNeuronFromAccount` is used, the NNS governance canister will automatically either claim the neuron if it doesn't exist yet or top it up if it exists.

_Required permissions:_ Anyone can make this call and top up a neuron, even if they do not have any permissions on the neuron. No matter who makes the call to the governance canister, its controller is set by the arguments as mentioned above.

### Modifying a neuron's state
Recall from the section _Neuron attributes_, that a neuron has a dissolve delay and can be non-dissolving, dissolving, or dissolved.
To switch between the diffent dissolve states or to increase the dissolve delay, use the `ManageNeuron` command `Configure`. 
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

To move a neuron from non-dissovling into dissovling state, and start the timer, use `StartDissolving`. No additional argument are required.

To move a neuron from dissolving into non-dissolving state, and stop the timer at the dissolve state that the neuron has, use `StopDissolving`.

No matter in which dissolve state a neuron is, its dissolve delay can be increased up to a maximum of eight years.
To do so, there are two options.
You can use `IncreaseDissolveDelay` and specify by the argument `additional_dissolve_delay_seconds` by how many seconds the current remaining dissolve delay should be increased. For example, if a neuron has 6 months dissolve delay, choosing the argument 2 months (in seconds) for `IncreaseDissolveDelay`, would result in a neuron with 8 months dissolve delay. 
Alternatively, you can specify how much dissolve delay a neuron should have after the operation by using `SetDissolveTimestamp` and setting a target time stamp `dissolve_timestamp_seconds` in seconds from the Unix epoch.
To achieve the same as above, compute the timestamp of now plus 8 months and provide this as the input `dissolve_timestamp_seconds`. 
In both cases, the dissolve delay can only be increased but never decreased.

_Required permissions:_
Only a neuron's controller can start or stop dissolving a neuron or increase its dissolve delay.


### Spwaning a neuron's rewards
When a neuron's maturity has risen above a threshold, one can spawn a portion of the maturity. In a first step, this creates a new neuron in a special spawning state containing the spawned maturity. After 7 days, the maturity is replaced with newly minted ICP, taking some [maturity modulation function](https://wiki.internetcomputer.org/wiki/Maturity_modulation#:~:text=The%20maturity%20modulation%20function%20introduces,NNS%20neurons%20and%20SNS%20neurons.) into account. In the end, the new neuron will be dissolved and have these ICP as stake - which can then be disbursed to any account.
The new neuron can remain controlled by the same principal as the parent neuron, or be assigned to a new principal.

The following command spawns a neuron.
```
type Spawn = record {
  percentage_to_spawn : opt nat32;
  new_controller : opt principal;
  nonce : opt nat64;
};
```
Specify by `perpercentage_to_spawn` the portion of the maturity that should be spawn into a neuron in percentage. This should be a value between 1 and 100 (inclusive). 
If the spawned neurons should have a different controller than the parent neuron (from which you spawn the maturity), you can optionally define a different controlling principal by `new_controller`. Otherwise, the spawned neuron will have the same controller as the parent neuron. 
Similarly to claiming a neuron (see above), you need to specify the new neuron's ledger address and choose a nonce for this in the last argument `nonce`.
Based on this nonce and the controlling principal, the neuron's address is uniquely defined (see section _Compute the neuron's address_).

_Required permissions:_
Only a neuron's controller can spawn maturity from a neuron.

### Disbursing / unstaking a neuron
When a neuron is dissolved, i.e., its dissolve delay is zero, the neuron's controlling principal can instruct it to _disburse_ the neuron’s stake. 
This means that the staked ICP balance is transferred to a specified new ledger account and is liquid again.
The following command can be used to disburse a neuron. 
```
type Disburse = record {
  to_account : opt AccountIdentifier;
  amount : opt Amount;
};
```
The command takes as argument the ledger account `to_account` to which the ICP tokens should be transferred to and the amount `amount` that should be disbursed. The latter allows to only disburse a portion of a neuron's stake.

_Required permissions:_
Only a neuron's controller can disburse a neuron.


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

_Required permissions:_

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

_Required permissions:_
