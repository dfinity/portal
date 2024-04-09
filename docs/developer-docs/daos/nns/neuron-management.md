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
* **Controller**: The principal that controls the neuron and which cannot be changed. A principal corresponds to the public key of a public-private key pair and anyone with possession of the corresponding private key will have full control of the neuron. Therefore, the private key of the controller principal should be kept very secure. A principal can control many neurons.
* **Hot Keys**: In addition to the controller, a neuron can have hot keys. Hot keys are defined by a list of principal ID and can be used to perform actions with limited privileges, namely voting, following (see below), and reading the full information about the neuron.

* **Dissolve delay & dissolve state**: The tokens in a neuron are locked for a specified duration, called the _dissolve delay_. This can be thought of like a kitchen timer that can only be turned in one direction. It can be arbitrarily increased, but only reduced by turning on the countdown and waiting for the time to pass. A neuron must have a dissolve delay of at least 6 months to be eligible to vote.
  * A neuron can be _non-dissolving_ which means that the timer is stopped and the neuron's dissolve delay remains the same. 
  * A neuron can be _dissolving_ which means that the timer is decreasing the neuron's dissolve delay as time passes. 
  * Once the timer has counted down, a neuron is _dissolved_ and the ICP tokens can be unstaked again.
* **Age**: Every non-dissolving neuron has an age, which denotes how long it has been in the non-dissolving state. 
A neuron's voting power increases as its age increases. A neuron's voting power also increases if its controller increases its dissolv delay.

* **Maturity**:  When neurons vote, over time the NNS increases their maturity to reward them. Maturity can be converted into ICP by spawning (see below).

### Getting information about a neuron
Before diving deeper into how a neuron can be created and modified, let's first understand how to get information about a user's existing neurons.
This can be done by using the following API on the NNS governance canister.

```
list_neurons : (ListNeurons) -> (ListNeuronsResponse) query;

type ListNeurons = record {
  neuron_ids : vec nat64;
  include_neurons_readable_by_caller : bool;
};

type ListNeuronsResponse = record {
  neuron_infos : vec record { nat64; NeuronInfo };
  full_neurons : vec Neuron;
};
```
By using this API, a user can request information about a list of neurons. 
The user can define which neurons to get information from by defining a list of neuron IDs in the argument `neuron_ids`. 
In addition, if the argument `include_neurons_readable_by_caller` is set to true, the neurons who the user is authorized to read are also included (i.e., the neurons for which the user is a controller or hot key).

The answer to such a query is defined by `ListNeuronsResponse`. First, it contains a map that points for each neuron that was requested to the corresponding `NeuronInfo` (assuming the neuron exists). This is the public information about a neuron and the exact definition can be found [here](https://github.com/dfinity/ic/blob/7184d168d44f3ba27f750285a0fba43a0c56190a/rs/nns/governance/src/gen/ic_nns_governance.pb.v1.rs#L50).
In addition, for each requested neuron that exists and for which the calling user is authorized to read the full neuron (controller or hot key), the full neuron is returned.

## Interacting with neurons
All neuron modifications go through the following API on the NNS governance canister. This includes everything in a neuron's lifetime such as the neuron's creation, modifications and voting, and unstaking the ICP tokens.
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

To compute the neuron's address in the first step, proceed as follows.

a) Learn the principal that should control the neuron and choose a nonce. The nonce is used to allow the same principal to control multiple neurons and does not need to be kept secret.
 
b) Computed the subaccount based on the two inputs from (a). View for example the method [`compute_neuron_staking_subaccount_bytes`](https://github.com/dfinity/ic/blob/master/rs/nervous_system/common/src/ledger.rs) which computes the subaccount given a controller principal and a nonce.
 
c) Compute the final account identifier on the ledger (that gives you the address) using the computed subaccount from (b) and the principal ID of the NNS governance canister. View for example the method [`neuron_subaccount`](https://github.com/dfinity/ic/blob/master/rs/nns/governance/src/governance.rs) which computes the account based on a given subaccount and with the NNS governance principal ID `GOVERNANCE_CANISTER_ID`.


 For the above steps, make sure you are using an up-to-date version of this code in your application.

:::info
It is of utmost importance to ensure that the address is computed correctly in the first step and remembered so that it can be reused in the second step.
If this fails, funds could be sent to a dead account and be unrecoverable.
It is recommended to test the corresponding code thoroughly. 

:::

**Send ICP to the neuron's account**

After having computed the neuron's address, make a transfer to this address. For this, view the [relevant `candid` interface of the ICP ledger](https://github.com/dfinity/ic/blob/846886223adf11f86b70b5f19c345b3fe6f33fed/rs/rosetta-api/icp_ledger/ledger.did#L432C5-L432C13) which contains the following details for a transfer.
```
service: (LedgerCanisterPayload) -> {
  transfer : (TransferArgs) -> (TransferResult);
  ...
}    
type TransferArgs = record {
  memo: Memo;
  amount: Tokens;
  fee: Tokens;
  from_subaccount: opt SubAccount;
  to: AccountIdentifier;
  created_at_time: opt TimeStamp;
};

};
```
To make a transfer to the correct account, choose the `memo` equal to your chosen nonce (from Step (1a)).
To stake a neuron, the `amount` must be at least 1 ICP. Set the `fee` to the standard fee of the ICP ledger canister, which is 10000 e8s.
You can make the transfer from any `from_subaccount` account that you control. For the `to` account, use the account that you have computed in Step (1).

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
Note that refreshing of a neuron will also reduce the neuron's age to account for the fact that the newly added tokens have no age.

:::

These steps happen analogously to the claiming of neurons above.
Again, care is advised to makes sure that the right account is computed and used.
When `ClaimOrRefreshNeuronFromAccount` is used, the NNS governance canister will automatically either claim the neuron if it doesn't exist yet or top it up if it exists.

_Required permissions:_ Anyone can make this call and top up a neuron, even if they do not have any permissions on the neuron. No matter who makes the call to the governance canister, its controller is set by the arguments as mentioned above.


### Managing permissions of a neuron
Every neuron has a controller that cannot be changed and may have hot keys. Hot keys are defined by a list of principal ID and can be used to perform actions with limited privileges, namely voting and following.
To manage these permissions, a neuron's controller can add and remove hot keys using the neuron command `Configure` with the `Operation` `AddHotKey` and `RemoveHotKey`, respectively.

```
type Configure = record { operation : opt Operation };
type Operation = variant {
  RemoveHotKey : RemoveHotKey;
  AddHotKey : AddHotKey;
  ...
};
type AddHotKey = record { 
  new_hot_key : opt principal 
};
type RemoveHotKey = record { 
  hot_key_to_remove : opt principal 
};
```
For adding a hot key, the principal `new_hot_key` to add needs to be provided and for removing an existing hot key principal, the principal `hot_key_to_remove` to be removed from the hot key list needs to be provided.

_Required permissions:_
Only a neuron's controller can add and remove hot keys.


### Modifying a neuron's state
Recall from the section _Neuron attributes_, that a neuron has a dissolve delay and can be non-dissolving, dissolving, or dissolved.
To switch between the different dissolve states or to increase the dissolve delay, use the `ManageNeuron` command `Configure`. 
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
If no nonce is provided, the governance canister chooses a random one.

_Required permissions:_
Only a neuron's controller can spawn maturity from a neuron.

### Disbursing / unstaking a neuron
When a neuron is dissolved, i.e., its dissolve delay is zero, the neuron's controlling principal can instruct it to _disburse_ the neuron’s stake. 
This means that the staked ICP balance is transferred to a specified ledger account and is liquid again.
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
A neuron represents a participant of the NNS DAO and can participate in governance. Concretely, a neuron can submit proposals or vote on them if its dissolve delay is at least 6 months. 
A neuron can either directly vote to adopt or reject a given proposal or it can _follow_ other neurons for certain decisions - which will automatically cast a ballot for the neuron if enough of the followees voted.

**Vote directly**
To vote directly, first find out what proposals can be voted on and then find the ID of the proposal you want to vote on.
The following are the relevant NNS governance API and record that can also be found in the candid file.
```
service : (Governance) -> {
  get_pending_proposals : () -> (vec ProposalInfo) query;
};
type ProposalInfo = record {
  id : opt NeuronId;
  ...
};
 ```
First use the `get_pending_proposals` API to get the `ProposalInfo` of all proposals that are still pending. 
Then, as part of this proposal information you can find a proposal's id `id`.

Using this, you can now vote on a proposal using the following neuron command.
```
type RegisterVote = record { 
  vote : int32; 
  proposal : opt NeuronId 
};
```
The `vote` represents if the neuron should adopt or reject the proposal.
As can be found [here](https://github.com/dfinity/ic/blob/720c78843f20246bf4e5c15f703923bd316c19de/rs/nns/governance/proto/ic_nns_governance/pb/v1/governance.proto#L427), 1 corresponds to a yes-vote and hence to adopt the proposal and 2 corresponds to a no-vote and thus to reject the proposal.
`proposal` is the proposal ID of the proposal that the neuron votes on.

**Set a neuron's following**

In case that a neuron's owner lacks the time or expertise to vote on some proposals, a neuron can be configured to vote automatically by following other neurons on a topic-by-topic basis.
For any valid topic, a list of followees can be specified, and the neuron will follow the vote of a majority of the followers on a proposal with a type belonging to that topic. If a null topic is specified, this acts as a catch-all that enables the neuron to follow the vote of followees for all topics where no explicit rule has been specified. 
There are two topics that are excluded from the catch-all: `Governance` and `SNS & Neuron's Fund`. 

:::info
It is important to understand that a neuron's vote is only cast if the majority of the follwed neurons agree on a decision. Find [here](https://internetcomputer.org/docs/current/developer-docs/daos/nns/nns-app-quickstart#neuron-following) more information and examples regarding the following-rules.

:::

To define a follow rule, use the following neuron command
 ```
type Follow = record {
  topic : int32; 
  followees : vec NeuronId 
};
```
The argument `topic` defines for which proposal topic this following rule should be applied. 
Each topic is defined by a number which you can find [here](https://github.com/dfinity/ic/blob/7184d168d44f3ba27f750285a0fba43a0c56190a/rs/nns/governance/src/gen/ic_nns_governance.pb.v1.rs#L3142).
If the topic is `null`, then this rule is applied for the catch-all and will be applied for all topics where no other explicit rule is defined except for`Governance` and `SNS & Neuron's Fund`.
The second argument `followees` defines a list of neuron IDs whose decision will be followed. There can be up to 15 followees for each topic (but more followees is not necessarily better - see the rules linked above).

_Required permissions:_
Voting and setting following can be done by a neuron's controller or a neuron's hot key.

