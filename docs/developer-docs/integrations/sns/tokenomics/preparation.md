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
translate them into 
[initial parameters](../launching/launch-steps.md/#SNS-launch-step-preparation) <!-- NEW: UPDATE LINK --> that the SNS will be initialized with during the SNS launch.


This section explains on a technical, but high level, how initial parameters are set and how they affect different canisters.
The [SNS CLI tool](https://github.com/dfinity/ic/tree/master/rs/sns/cli)
allows you to set these parameters and includes detailed descriptions of all parameters.

### Initial parameters
<!-- NEW: All SNS parameters are set in a **.yaml** file that can then be passed as an argument to the NNS proposal that triggers the SNS launch, both for testing and in production.
There are some parameters that have to be set and others that are set to a default value but that can also be changed. To make sure that all parameters are set to valid values, that are also consistent
with each other, there is a tool to validate a given input file. -->
Apart from the decentralization swap parameters
(see next section), all SNS parameters are set in a **.yaml** file that can 
then be passed as an argument
when installing the SNS, both for testing and in production.
There are some parameters that have to be set and others that are set to a
default value but that can also be changed.
To make sure that all parameters are set to valid values, that are also consistent
with each other, there is a tool to validate this input file. 

**To create the SNS parameter yaml file and validate it, follow the steps
['Creating the configuration file'](https://github.com/dfinity/ic/tree/master/rs/sns/cli#creating-the-configuration-file)
in the SNS CLI tool.
The tool is also available through the dfx cache like this: `$(dfx cache show)/sns`**

These are the categories of parameters that can be set:
- **Parameters of the SNS governance canister**: these are parameters of the governance
that can, in contrast to the other parameters listed here, be changed later 
   by SNS proposals. They include parameters such as the
   minimum stake that a neuron must have, or the cost (in the native SNS governance
  token) of submitting a proposal that is rejected.
   
- **Configurations in the SNS ledger canister:** this includes configurations of the SNS 
ledger canister such as the token name, token symbol, and the ledger transaction fee.

- **The initial token distribution**: this allows specifying which portion 
   of tokens are allocated to whom. Tokens can be distributed to the following buckets:
   - **Developer tokens** that are appointed to the original developers of the dapp and 
      seed funders.
   - **Treasury tokens** that are owned by the SNS governance canister which can be
      spent by the SNS community according to their needs.
   - **Swap tokens** which are owned by the SNS and swapped for ICP tokens.
      Initially, parts of the SNS swap tokens are swapped in exchange for ICP tokens
      in an initial decentralization swap. If the swap is successful, the participants
      will receive SNS tokens in a basket of neurons. 
      If not all of the swap tokens are sold in the initial swap, the rest of the
      swap tokens are reserved for future swaps (separate from the treasury). 
      Note that future swap are not yet designed, but having the tokens reserved
      makes SNSs forward compatible to such a feature if it is added in the future.

<!-- NEW BULLET POINT:
**Decentralization swap parameters**: this defines the parameters of the decentralization swap. MAKE SUB-BULLETS
**Rules of the swap** such as the minimum number of ICP tokens that the swap must collect to be successful and the maximum number of ICP tokens that it will collect. 
**Conditions of swap participation** such as the definition of a text that must be confirmed by users when participating in the swap and the possibility to define countries from which users cannot participate (by IP addresses).
**Fallback controllers of the dapp:** Another important parameter is the set of fallback controllers of the dapp.
   If a decentralization swap fails, for example because the targeted minimum number
   of ICP tokens could not be collected, the control of the dapp canister(s) is
   handed back to the principals defined in these parameters.
   Normally, this will be set to principals owned by the developers that controlled the dapp
   before the attempt to decentralize it. 
-->
      
All developer and airdrop tokens are distributed to neurons.
We call them **developer neurons** and **airdrop neurons**,
respectively, and refer to all these neurons as the **initial neurons**.

:::caution

The developer and airdrop neurons are the only neurons that exist when
the dapp's control is handed over to the SNS and during the
decentralization swap.
At this point, the dapp canister(s) are already controlled by the SNS.
Even though the governance canister is in a special pre-decentralization mode, some proposals can already be used, for example to upgrade the dapp canister(s) or to register new kinds of proposals. 
Therefore, **if you want to use SNS proposals at this stage, for example to ensure that the dapp can be upgraded 
at any time, you must make sure that enough of the initial neurons can vote to reach a decison.**
See [Stage 1 of the launch](../launching/launch-summary.md) for more details of this. 
:::



<!---
NEW: change link above 
-->

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

### SNS decentralization swap parameters
<!---

NEW: REMOVE THIS PARAGRAPH 

-->
As mentioned, the parameters of the decentralization swap are 
set in the NNS proposal that starts the swap.

They include configurations such as the minimum number of 
ICP tokens that the swap must collect to be successful and the
   maximum number of ICP tokens that it will collect.

They also allow to define who can participate in a swap, by defining a text that must be confirmed by users when participating in the swap and the possibility to define countries from which users cannot participate (by IP addresses).

   Another important parameter is the set of fallback controllers of the dapp.
   If a decentralization swap fails, for example because the targeted minimum number
   of ICP tokens could not be collected, the control of the dapp canister(s) is
   handed back to the principals defined in these parameters.
   Normally, this will be set to principals owned by the developers that controlled the dapp
   before the attempt to decentralize it.



