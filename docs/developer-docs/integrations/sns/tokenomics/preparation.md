---
sidebar_position: 6
---
# SNS initial parameters {#setting-parameters}
## Overview
Typically, one would first decide on tokenomics and other configurations, 
for examples using the
[SNS tokenomics training & tools](https://wiki.internetcomputer.org/wiki/How-To:_SNS_tokenomics_configuration)
as described in [this section](./tokenomics-intro.md).
After deciding on these configurations, the next step is to
translate them into initial parameters that the SNS will be initialized 
as the [first step of the SNS launch process](../launching/launch-steps-1proposal.md).


This section explains on a technical, but high level, how initial parameters are set and how they affect different canisters.
The [SNS CLI tool](https://github.com/dfinity/ic/tree/master/rs/sns/cli)
allows you to set these parameters and includes detailed descriptions of all parameters.

### Initial parameters
All SNS parameters are set in a **.yaml** file that can then be passed as an argument to the NNS proposal that triggers the SNS launch, both for testing and in production. 
To make sure that all parameters make sense and are also consistent with each other, it is recommended to test the proposal locally.

**To create the SNS parameter yaml file, copy the template file found [here](https://github.com/dfinity/ic/blob/master/rs/sns/cli/sns_init_template.yaml) and fill in the fields with the desired values. An example configuration file with filled out fields can be found in [sns-testing](https://github.com/dfinity/sns-testing/blob/main/example_sns_init.yaml).**

These are the categories of parameters that can be set:
- **Parameters of the SNS governance canister**: these are parameters of the governance
that can, in contrast to the other parameters listed here, be changed later by SNS proposals. They include parameters such as the minimum stake that a neuron must have, or the cost (in the native SNS governance token) of submitting a proposal that is rejected.
   
- **Configurations in the SNS ledger canister:** this includes configurations of the SNS ledger canister such as the token name, token symbol, and the ledger transaction fee.

- **The initial token distribution**: this allows specifying which portion of tokens are allocated to whom. Tokens can be distributed to the following buckets:
   - **Developer tokens** that are appointed to the original developers of the dapp and 
      seed funders.
   - **Treasury tokens** that are owned by the SNS governance canister which can be
      spent by the SNS community according to their needs.
   - **Swap tokens** which are owned by the SNS swapped in exchange for ICP tokens
      in the decentralization swap. If the swap is successful, the participants
      will receive SNS tokens in a basket of neurons.
- **Decentralization swap parameters**: this defines the parameters of the decentralization swap: 
  - **Rules of the swap** such as the minimum number of ICP tokens that the swap must collect to be successful and the maximum number of ICP tokens that it will collect. 
  - **Conditions of swap participation** such as the definition of a text that must be confirmed by users when participating in the swap and the possibility to define countries from which users cannot participate (by IP addresses).
  
- **Fallback controllers of the dapp**: if a decentralization swap fails, for example because the targeted minimum number of ICP tokens could not be collected, the control of the dapp canister(s) is handed back to the principals defined in these parameters. Normally, this will be set to principals owned by the developers that controlled the dapp before the attempt to decentralize it.
      
All developer and airdrop tokens are distributed to neurons.
We call them **developer neurons** and **airdrop neurons**,
respectively, and refer to all these neurons as the **initial neurons**.

:::caution

The developer and airdrop neurons are the only neurons that exist when
the dapp's control is handed over to the SNS and during the
decentralization swap.
At this point, the dapp canister(s) are already controlled by the SNS.
Even though the governance canister is in a special pre-decentralization mode, some proposals can already be used, for example to upgrade the dapp canister(s) or to register new kinds of proposals. 
Therefore, **if you want to use SNS proposals at this stage, for example to ensure that the dapp can be upgraded at any time, you must make sure that enough of the initial neurons can vote to reach a decison.**
See [stage 1 of the launch](../launching/launch-summary-1proposal.md) for more details of this. 
:::

All initial contributors (developers, seed funders etc) and the swap participants receive their neurons as a *basket of neurons*.
This means that rather than one neuron, they can get many neurons 
with different dissolve delays. The details of these neurons can
be set in the initialization.

If only parts of the swap tokens are sold in the initial decentralization swap,
the developer neurons' voting power is restricted by a multiplier. This multiplier 
is proportional to the portion of swap tokens that are sold in the initial 
decentralization swap. As more of the swap tokens are sold in the future, the
voting power multiplier increases until it is 1 when all swap tokens have been
sold.

