# Defining the parameters (technical preparation)

After some 
[non-technical preparations](../../../tokenomics/sns/not-blind/predeployment-considerations.md),
that define the goals for the SNS, in a next step you can 
choose the initial parameters that the SNS will be launched with, such as who 
will get how many SNS tokens in the beginning.

To understand this better, let’s first understand here how an SNS
with a decentralization sale is launched on a high level and which 
parameters can be set.
We refer to the next pages for learning the detailed actions that are required 
[to test the SNS launch](./local-testing.md) and to 
[initiate an SNS launch in production](./deployment.md).

## Understanding the SNS Launch process

For each SNS, the decentralization sale is realized in a separate _decentralization
sale canister_ that exists during the SNS's launch, and is owned by the IC which will
run the sale. In more detail, it is controlled by the NNS root canister.

* The sale canister is set up at the start with a defined amount of SNS tokens to be
  distributed publicly.

* During the decentralization sale, participants can send ICP to the sale canister
  to contribute to the dapp’s funding.

* At the sale’s end the collected ICP are “swapped” for the SNS tokens; the
  participants get SNS tokens and the SNS gets the collected ICP. Each user will
  receive their portion of the pool of SNS tokens, pro-rated by their % of the overall
  number of ICP contributed. For example, if the sale canister initially held 1000 SNS
  tokens and 500 ICP tokens were collected during the decentralization sale, then 
  the exchange rate would
  be 2:1 and each participant would get 2 SNS tokens for each ICP token they
  contributed.

Apart from distributing the tokens to many participants, the decentralization sale
concludes that a) a market price for the SNS token is set and b) every sale
participant receives SNS tokens at that price.

An SNS is launched in the following stages:

1) **Choose the initial parameters**: For initializing an SNS for your dapp,
   you first choose the initial parameters of the SNS.
   This includes both initial parameters of the governance and ledger (e.g., token name etc)
   as well as the initial token distribution. 
   You can also define the conditions for the decentralization sale, for example
   how many ICP tokens should at least and at most be collected.
   
2) **Deploy the SNS canisters**: When all parameters are specified, you make a
   call to the SNS wasm modules canister (a canister on the NNS) to deploy an SNS with 
   the specified parameters.
   At this point, the SNS ledger only has two accounts with liquid tokens, the _treasury_
   that is owned by the SNS governance canister which can be used in the future according to the
   SNS community's wishes, and some pre-allocated tokens to be used in the initial 
   decentralization sale.
   To ensure that no one can transfer tokens, and distribute them or start token markets
   prematurely, all remaining inital tokens are locked in neurons. 
   Moreover, to ensure that these initial neurons cannot modify the SNS before
   or during the decentralization sale and cannot transfer the treasury tokens,
   the SNS governance is deployed in a _pre-genesis mode_ with limited functionality.

3) **Dapp control handover**: Between the SNS initialization and the start of the 
   decentralization sale, you hand over the control of your dapp to the SNS.
   This includes adding the SNS root canister as the controller of the dapp and removing
   yourself (and possible other developers) from the list of controllers. Also, this 
   includes "registering" the dapp with the SNS so that SNS root is aware that it controls
   these canisters.
   The registration is done by SNS proposal.
   As there are already initial neurons (from Step 2), this proposal, as well as potential
   proposals to upgrade the dapp can be realized by an SNS proposal and by the majority of
   initial neurons voting in favor of this proposal.
   The initial neurons cannot do other things, such as changing the SNS
   parameters, as the SNS governance canister is still in pre-genesis mode.

4) **Ask the IC to start the decentralization sale**: The decentralization sale
   is started by an NNS proposal that can be submitted by anyone and is decided on by the
   IC community. This means that effectively you hand over the control of your dapp
   to the SNS and ask the IC to decentralize the SNS in a decentralization sale.
   When voting on a NNS proposal to start a decentralization sale, the NNS neurons can check
   the sale parameters and whether the dapp’s control has been handed over to the SNS.
   The NNS proposal thus also serves as a safeguard where the wisdom of the crowd can
   detect potentially malicious SNSs before they trick users into investing in them.
   If the NNS proposal is adopted, the sale is started. If the NNS proposal is rejected,
   the SNS launch is aborted and the dapp’s control is handed back to you, i.e., to the 
   original developers of the dapp.

5) **Decentralization sale**: When the sale starts, the sale canister holds the number
   of SNS tokens that were specified at initialization (see Step 1). End users can
   participate in the decentralization sale by transferring ICP tokens to the 
   sale canister.

6) **SNS genesis**: When the decentralization sale ends, it is first established whether
   it was successful, e.g., enough ICP have been collected. If the sale was successful,
   the exchange rate is determined and all tokens are given to the sale participants in
   neurons. Once all neurons are created, the SNS is under decentralized control
   and the governance canister is set to be fully functional.
   If the sale is not successful, the decentralization attempt failed and everything
   is reverted to the state before the SNS launch, including that the dapp’s control
   is handed back to you (i.e., the original developers of the dapp), and the 
   collected ICP are refunded to the sale participants.
   
:::note
Hi lara - I just added an example where you can link to [Setting the SNS parameters](#setting-parameters) using a custom anchor. You can also link to a section by just putting dashes between the words in the heading eg, here's a link to [Understanding the SNS Launch process](#understanding-the-sns-launch-process)
:::

## Setting the SNS parameters (#setting-parameters)
As mentioned above, the first step in launching an SNS is to choose the parameters that
your SNS will be launched with.
This lets you choose many SNS settings and also lets you choose the initial 
token distribution.

You can set all these parameters in a _yaml_ file that can then be passed as an argument
when creating the SNS, both for testing and in production.
There are some parameters that you have to actively set and others that are set to a
default value but that you can also change if you like.
To make sure that all parameters are set to valid values, that are also consistent
with each other, you can use a tool that validates your input file. 

**To create the SNS parameter yaml file and validate it, follow the steps
[Defining the initial parameters for the SNS]**
// todo : add link

To give you an overview, these are the categories of parameters that you can set:
1. Parameters of the _SNS governance canister_. These are parameters of the governance
that can later be changed by SNS proposals. They include parameters such as the
   minimum stake that a neuron must have, or the cost of submitting a proposal that is not
   adopted in SNS tokens.
   
2. Configurations in the _SNS ledger canister_. This includes configurations of the SNS 
ledger canister such as the token name, token symbol, and the ledger transaction fee.
   
3. Configurations of the _SNS decentralization sale_. This includes configurations such
as the minimum number of ICP tokens that the sale must collect to be successful and the
   maximum number of ICP tokens that it will collect.
   Another important parameter is the set of fallback controllers of the dapp.
   If a decentralization sale fails, for example because the targeted minimum number
   of ICP tokens could not be collected, the control of the dapp canister(s) is
   handed back to the principals defined in this parameters. 
   Normally, you will want to set this to be the principals that controlled the dapp
   before the attempt to decentralize it (e.g., the principal of you and other
   developers who worked on the dapp).

4. The _initial token distribution_. This allows you to specify which portion 
   of tokens are allocated to whom. In the initial design, one can distribute tokens to
   the following four buckets:
   1. _developer tokens_ that are appointed to the original developers of the dapp,
   2. _airdrop tokens_ that can be given to any other predefined principals that
      should have tokens at genesis, for example to initial investors or existing users
      of the dapp,
   3. _treasury tokens_ that are owned by the SNS governance canister which can be
      spent by the SNS community according to their needs, and
   4. _sale tokens_ which are owned by the SNS and sold in exchange for other tokens.
      Initially, parts of the SNS sale tokens are sold in exchange for ICP tokens
      in an initial decentralization sale. If the sale is successful the participants
      will receive SNS tokens in a basket of neurons. 
      If not all of the sale tokens are sold in the initial sale, the rest of the
      sale tokens are reserved for future sales. 
      
All developer and airdrop tokens are distributed to the defined principals at
genesis in neurons called the developer neurons and the airdrop neurons,
respectively. All developers, airdrop principals, and the sale participants receive
their neurons as a basket of neurons with different dissolve delays.
The neurons of all these parties have the same distribution of dissolve
delays.

If only parts of the sale tokens are sold in the initial decentralization sale,
the developer neurons' voting power is restricted by a multiplier. This multiplier 
is proportional to the portion of sale tokens that are sold in the initial 
decentralization sale. As more of the sale tokens are sold in the future, the
voting power multiplier increases until it is 1 when all sale tokens have been
sold. 

:::danger 

The developer and airdrop neurons are the only neurons that exist when the dapp's
control is handed over to the SNS and during the decentralization sale. 
Therefore, 

At this point, the dapp canister(s) are already controlled by the SNS.
Therefore, **you must make sure that you define at least one developer or 
airdrop neuron as they provide the only way how to upgrade the dapp during
the sale.**

:::

