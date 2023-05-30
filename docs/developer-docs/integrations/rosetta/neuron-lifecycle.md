# Neuron lifecycle

## Overview

A neuron is a type of asset managed by the Internet Computer governance canister. Neurons allow their controllers to participate in the governance of the network by submitting and voting on proposals.

## Creating a neuron

Creating a neuron involves 2 steps:

-   Transfering some **amount** of ICPs from any ledger account to the neuron’s address. Neuron address on the ledger that belongs to the Governance canister. The caller computes the neuron address from two parts:

    -   The principal of the governance canister.

    -   The **subaccount** that is itself a hash of the controller’s principal with an integer nonce. One principal can control multiple neurons by picking different integer nonces for the subaccount computation.

-   Calling the `claim_or_refresh_neuron_from_account` method of the governance canister. If the call is successful, the payload contains the **neuron ID**, a numeric identifier of the newly created neuron. The governance canister maintains a mapping between neuron IDs and subaccounts. Most management operations can be performed using either the neuron ID or the subaccount address.

## Neuron attributes

A neuron has the following attributes that control its lifecycle and rewards distribution:

### Dissolve Delay  
is how long it will take a neuron to become "liquid" once it starts dissolving. If the neuron is already dissolving, the delay indicates the amount of time left before the neuron transitions to the **DISSOLVED** state. The dissolve delay of a newly created neuron is 0. Only neurons with a dissolve delay of at least 15778800 seconds (approx 6 months) can be used to vote on proposals (as of 2021-07-27, the exact delay requirements are subject to change). Once set, the dissolve delay cannot be reduced via management commands.

### Dissolve State  
#### NOT_DISSOLVING  
Neuron has a fixed dissolve delay and accrues **age**. This is the default state of a newly created neuron.

#### DISSOLVING  
Neuron’s dissolve delay is decreasing with the passage of time. Once the dissolve delay becomes 0, the neuron transitions to the **DISSOLVED** state and the staked ICPs can be disbursed.

#### DISSOLVED  
Neuron’s dissolve delay is 0. The neuron holder is free to either disburse the staked ICPs or increase the dissolve delay, which will cause a transition to the **NOT_DISSOLVING** state.

### Age  
Age is the amount of time that passed since the last time the neuron transitioned to the **NOT_DISSOLVING** state. If the neuron is **DISSOLVING**, its age is 0.

### Maturity  
Maturity is the total amount of unspent rewards accrued by this neuron. Neuron’s controller can spend maturity in two ways:

- **Spawn** a new neuron with a dissolve delay of seven days and stake equal to the maturity.

- **Merge** maturity into the stake, increasing voting power.

### Voting power  
Voting power is proportional to the **amount** of staked ICPs. Age and dissolve delay multiplicative bonuses increase the voting power if the neuron is in the **NOT_DISSOLVING** state.

## Rewards

Once a proposal is accepted, all the neurons that voted on that proposal receive rewards in form of a maturity increase. The governance canister distributes rewards daily. The rewards are proportional to the voting power.

For more information on neuron state transitions and rewards, see [understanding the Internet Computer’s Network Nervous System, neurons, and ICP utility tokens](https://medium.com/dfinity/understanding-the-internet-computers-network-nervous-system-neurons-and-icp-utility-tokens-730dab65cae8).

## State transitions

    stateDiagram-v2
        state "Non-dissolving Neuron" as non_dissolving
        state "Dissolving Reward Neuron" as dissolving
        state "Dissolved Reward Neuron" as dissolved
        [*] --> non_dissolving : transfer + claim_or_refresh_neuron_from_account
        non_dissolving --> non_dissolving : increase_dissolve_delay
        non_dissolving --> dissolving : start_dissolving
        dissolving --> non_dissolving : stop_dissolving
        dissolving --> dissolved : passage of time
        dissolved --> non_dissolving: increase_dissolve_delay
        dissolved --> [*] : disburse
