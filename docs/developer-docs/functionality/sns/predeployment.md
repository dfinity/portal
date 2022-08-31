# Technical preparations for launch

After some 
[non-technical preparations](../../../tokenomics/sns/not-blind/predeployment-considerations.md)
that define the goals for the SNS, in a next step you can 
choose the initial parameters that the SNS should be set up with, 
such as who should get how many SNS tokens in the beginning.

Before going into the details on how these parameters can be set, 
let us first understand on a high level how an SNS is launched with a 
decentralization sale.
Then, let us understand how you can get the right tools and generate
the right principals in order to set the SNS parameters.
Finally, we will cover which parameters can be set and how this
is done.

We refer to the next pages for learning the detailed actions that are
required 
[to test the SNS launch](./local-testing.md) and to 
[initiate an SNS launch in production](./deployment.md).


## Understanding the SNS Launch process {#understand-launch}

For each SNS, the decentralization sale is realized in a separate
_decentralization sale canister_ that exists during the SNS's launch,
and is owned by the IC which will run the sale. In more detail, 
it is controlled by the NNS root canister.

* The sale canister is set up at the start with a defined amount of SNS tokens to be
  distributed publicly.

* During the decentralization sale, participants can send ICP to the sale canister
  to contribute to the dapp’s funding.

* At the sale’s end the collected ICP are “swapped” for the SNS tokens; the
  participants get SNS tokens and the SNS gets the collected ICP. Each sale 
  participant will receive their portion of the pool of SNS tokens, pro-rated
  by their share of the overall number of ICP contributed. For example, if the
  sale canister initially held 1000 SNS tokens and 500 ICP tokens were collected
  during the decentralization sale, then the exchange rate would be 2:1 and each
  participant would get 2 SNS tokens for each ICP token they contributed.

Apart from distributing the tokens to many participants, the decentralization sale 
sets a market price for the SNS token and every sale participant receives SNS 
tokens at that price.

An SNS is launched in the following stages:

1) **Set the initial parameters**: For initializing an SNS for your dapp,
   you first choose the initial parameters of the SNS.
   This includes both initial parameters of the governance and ledger (e.g., token name)
   as well as the initial token distribution. 
   You can also define the conditions for the decentralization sale, for example
   how many ICP tokens should at least and at most be collected.
   
2) **Ask the SNS-W to install the SNS canisters**:
   When all parameters are specified, you make a call to the SNS wasm modules canister
   (a canister on the NNS) to install an SNS with the specified parameters.
   At this point, the SNS ledger only has two accounts with liquid tokens, the _treasury_
   that is owned by the SNS governance canister and which can be used in the future according
   to the SNS community's wishes, and some pre-allocated tokens to be used in the initial 
   decentralization sale.
   To ensure that no one can transfer tokens, and distribute them or start token markets
   prematurely, all remaining inital tokens are locked in neurons. 
   Moreover, to ensure that these initial neurons cannot modify the SNS before
   or during the decentralization sale and cannot transfer the treasury tokens,
   the SNS governance is installed in a _pre-decentralization-sale mode_ with
   limited functionality.

3) **Dapp control handover**: Between the SNS installation and the start of the 
   decentralization sale, you hand over the control of your dapp to the SNS.
   This includes adding the SNS root canister as the controller of the dapp and removing
   yourself (and possible other developers) from the list of controllers. Also, this 
   includes "registering" the dapp with the SNS so that SNS root is aware that it controls
   these canisters.
   The registration is done by SNS proposal.
   As there are already initial neurons (from Step 2), this, as well as potential upgrades
   to the dapp, can be realized by SNS proposals and by the majority of
   initial neurons voting in favor of them.
   The initial neurons cannot do other things, such as changing the SNS
   parameters, as the SNS governance canister is still in
   pre-decentralization-sale mode.

4) **Ask the IC to start the decentralization sale**: The decentralization sale
   is started by an NNS proposal that can be submitted by anyone and is decided on by the
   IC community. This means that effectively you hand over the control of your dapp
   to the IC and ask the IC to decentralize and unlock the functionality of the SNS by
   starting a decentralization sale.
   When voting on an NNS proposal to start a decentralization sale, the NNS neurons can check
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
   the exchange rate is determined and all SNS tokens are given to the sale participants in
   neurons. Once all neurons are created, the SNS should be under decentralized control
   and the pre-decentralization-sale mode is reverted.
   <!-- QUESTION: should we add here that this is subject to checks of the community? --> 
   Thus, the governance canister is set to be fully functional.
   If the sale is not successful, the decentralization attempt failed and everything
   is reverted to the state before the SNS launch, including that the dapp’s control
   is handed back to you (i.e., the original developers of the dapp), and the 
   collected ICP are refunded to the sale participants.

## Getting the tools for launching an SNS {#tools}
<!--TODO-CLI/dfx: update wrt whether you need SNS CLI at all --> 
To set the initial parameters for your SNS, but also to test and initiate the launch
of an SNS afterwards, you require some tools.
Let us next learn which tools there are and how you can install them.
You will need to install two tools, `SNS CLI` which is the tool for developer tasks
and `sns-quill` which is the tool for SNS users and which you will need, for example,
to vote.

`SNS CLI` is the command line tool that will help you initialize and deploy
the SNS. You can learn how to deploy it
[here](https://gitlab.com/dfinity-lab/public/ic/-/tree/master/rs/sns/cli#deployment).
<!--TODO-CLI/dfx: adjust in case we have the dfx tool ready -->

`sns-quill` is another command line tool for interacting with the SNS canisters. 
`sns-quill` supports _cold wallets_ and therefore is more secure
than other options to interact with the SNS canisters.
Please follow the steps [here](https://github.com/dfinity/sns-quill#download) to download
and build the tool.
:::info
A cold wallet allows you to store the private key of your principal in a secure place,
for example a so called _air-gapped computer_ that is not connected to any network, and 
still use the key to sign messages that can then be sent via another computer.
Usually, for tasks that are not as security critical and that you have to do more often,
it is more practical to also have a _hot key_ or _hot wallet_ which stores a principal
whose private key is not on an air-gapped computer but has less priviledges (so it is more
likely that something happens to the key but the consequences would not be that severe).
:::


## Preparing the principals needed in the initial parameters {#principals}
There are two kinds of principals that you need to generate or collect in preparation
for the SNS launch: the principals that control the initial neurons and
(at least) one principal that controls the dapp and is used to perform all the steps
required to launch an SNS.

### Principals for initial neurons {#principal-initial-neurons}
As explained more in the next section, you can define initial neurons that exist
right when the SNS is deployed. This includes developer neurons that are for the
developers as well as airdrop neurons for initial investors and users.
<!--TODO-update-after-change: adjust language: are investors part of dev neurons or airdrop
neurons and do we still call them airdrop neurons?-->
Each of these neurons has to be initialised with a principal that controls the neuron.
Thus, to specify these initial neurons, you need to generate principals for the neurons
that you own in the beginning. You also have to ask other initial neuron holders to do 
so and collect their principals.

As the initial version of the SNS does not support hardware wallets, it is advisable
that the initial neurons use principals generated by `sns-quill`. As argued [above](#tools),
`sns-quill` is more secure than other options as it supports cold wallets.

To get the initial neurons' principals:
1. Ask all initial neuron holders to create an `sns-quill` principal by following the
instructions [here](https://github.com/dfinity/sns-quill#generating-identities).

2. Ask all initial neuron holders to get their generated principal ID and account ID
      as explained [here](https://github.com/dfinity/sns-quill#generating-identities) and to
      forward this information to you.
:::warning

In this step it is advisable to be careful to only send the public information of your
principal, i.e., the principal and account ID as stated above, to others.
In particular, you should **not** share the `.pem` file  where your principal is stored,
as this includes the private key and allows anyone to impersonate your principal.

:::

3. Also perform the first step yourself to create a principal for your neuron.
   
:::danger

**You must ensure that you, or someone you trust, control one of the principals
associated with an initial SNS neurons** as otherwise you cannot send the proposals
necessary to complete all steps required during the SNS's launch.

:::

Let us denote the principal that you set up for your neuron and which you control
`identityDevNeuron`. 

### Principal to launch the SNS

In addition to the principals above, you will need (at least) one principal to perform
all the steps required to deploy an SNS. Let us assume you use just one and let us denote
it by `identityDevDeploy`.
Make sure that you set up this principal such that it satisfies the following requirements:
1. This principal needs to be compatible with `dfx`.
   We refer to
   [this page](https://internetcomputer.org/docs/current/references/cli-reference/dfx-identity)
   for more information on how to setup and manage dfx identities.
2. This principal must be a controller of the dapp that you would like to get an SNS for. 

::: info
Note that this means that you will have two principals, one to control your initial
neurons and whose key can securely be kept in cold storage and a separate one
for the deployment, whose key can be kept in dfx which is more efficient.
:::


## Setting the SNS parameters {#setting-parameters}
As mentioned above, the first step in getting an SNS is to set the parameters that
your SNS will be launched with.
This lets you choose many SNS settings and also lets you choose the initial 
token distribution.

You can set all these parameters in a _.yaml_ file that can then be passed as an argument
when installing the SNS, both for testing and in production.
There are some parameters that you have to actively set and others that are set to a
default value but that you can also change if you like.
To make sure that all parameters are set to valid values, that are also consistent
with each other, you can use a tool that validates your input file. 

**To create the SNS parameter yaml file and validate it, follow the steps
'Defining the initial parameters for the SNS'.** <!--TODO-CLI/dfx-Link: -->
<!-- QUESTION: is it important which ID is used to do this? -->

To give you an overview, these are the categories of parameters that you can set:
1. Parameters of the _SNS governance canister_. These are parameters of the governance
that can, in contrast to the other parameters listed here, be changed later 
   by SNS proposals. They include parameters such as the
   minimum stake that a neuron must have, or the cost (in SNS tokens) of submitting
   a proposal that is not adopted.
   
2. Configurations in the _SNS ledger canister_. This includes configurations of the SNS 
ledger canister such as the token name, token symbol, and the ledger transaction fee.
   
3. Configurations of the _SNS decentralization sale_. This includes configurations such
as the minimum number of ICP tokens that the sale must collect to be successful and the
   maximum number of ICP tokens that it will collect.
   Another important parameter is the set of fallback controllers of the dapp.
   If a decentralization sale fails, for example because the targeted minimum number
   of ICP tokens could not be collected, the control of the dapp canister(s) is
   handed back to the principals defined in these parameters. 
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
      in an initial decentralization sale. If the sale is successful, the participants
      will receive SNS tokens in a basket of neurons. 
      If not all of the sale tokens are sold in the initial sale, the rest of the
      sale tokens are reserved for future sales (separate from the treasury). 
      Note that future sales are not yet designed, but having the tokens reserved
      makes SNSs forward compatible to such a feature that is planned to be added in
      the future.
      
All developer and airdrop tokens are distributed to the [defined principals](#principals) at
genesis in neurons. We call them _developer neurons_ and the _airdrop neurons_,
respectively, and refer to all these neurons as the _initial neurons_.
We recommend to set up the principals as explained [here](#principals), especially
to make sure that you set up developer neurons for a principal `identityDevNeuron` that you
control.

:::danger

The developer and airdrop neurons are the only neurons that exist when the dapp's
control is handed over to the SNS and during the decentralization sale.
At this point, the dapp canister(s) are already controlled by the SNS.
Therefore, **if you want to ensure that the dapp can be upgraded at any time, 
you must make sure that you, or someone you trust, owns at least
one developer or airdrop neuron as they provide the only way to submit a proposal
to upgrade the dapp during the sale.**

:::

All developers, airdrop principals, and the sale participants receive
their neurons as a _basket of neurons_.
This means that rather than one neuron, they will get many neurons with different
dissolve delays.  
<!--TODO-update-after-change: add more infor wrt these baskets once this is fixed.
Explain neuron locks if this becomes a thing.-->


If only parts of the sale tokens are sold in the initial decentralization sale,
the developer neurons' voting power is restricted by a multiplier. This multiplier 
is proportional to the portion of sale tokens that are sold in the initial 
decentralization sale. As more of the sale tokens are sold in the future, the
voting power multiplier increases until it is 1 when all sale tokens have been
sold. 



