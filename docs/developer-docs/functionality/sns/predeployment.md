# Technical preparations

After some 
[non-technical preparations](../../../tokenomics/sns/not-blind/predeployment-considerations.md)
that define the goals for the SNS, in a next step you can 
choose the initial parameters that the SNS will be launched with, such as who 
will get how many SNS tokens in the beginning.

Before going into the details on how these parameters can be set, let us first 
understand how an SNS with a decentralization sale is launched on a high level.
Then, let us understand how to get the right tools and generate the right
principals to set the parameters.
Finally, we will then cover which parameters can be set and how this is done.

We refer to the next pages for learning the detailed actions that are required 
[to test the SNS launch](./local-testing.md) and to 
[initiate an SNS launch in production](./deployment.md).


## Understanding the SNS Launch process {#understand-launch}

For each SNS, the decentralization sale is realized in a separate _decentralization
sale canister_ that exists during the SNS's launch, and is owned by the IC which will
run the sale. In more detail, it is controlled by the NNS root canister.

* The sale canister is set up at the start with a defined amount of SNS tokens to be
  distributed publicly.

* During the decentralization sale, participants can send ICP to the sale canister
  to contribute to the dapp’s funding.

* At the sale’s end the collected ICP are “swapped” for the SNS tokens; the
  participants get SNS tokens and the SNS gets the collected ICP. Each user will
  receive their portion of the pool of SNS tokens, pro-rated by their share of the overall
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
   This includes both initial parameters of the governance and ledger (e.g., token name)
   as well as the initial token distribution. 
   You can also define the conditions for the decentralization sale, for example
   how many ICP tokens should at least and at most be collected.
   
2) **Deploy the SNS canisters**: When all parameters are specified, you make a
   call to the SNS wasm modules canister (a canister on the NNS) to deploy an SNS with 
   the specified parameters.
   At this point, the SNS ledger only has two accounts with liquid tokens, the _treasury_
   that is owned by the SNS governance canister and which can be used in the future according to the
   SNS community's wishes, and some pre-allocated tokens to be used in the initial 
   decentralization sale.
   To ensure that no one can transfer tokens, and distribute them or start token markets
   prematurely, all remaining inital tokens are locked in neurons. 
   Moreover, to ensure that these initial neurons cannot modify the SNS before
   or during the decentralization sale and cannot transfer the treasury tokens,
   the SNS governance is deployed in a _pre-decentralization-sale mode_ with limited functionality.

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
   parameters, as the SNS governance canister is still in
   pre-decentralization-sale mode.

4) **Ask the IC to start the decentralization sale**: The decentralization sale
   is started by an NNS proposal that can be submitted by anyone and is decided on by the
   IC community. This means that effectively you hand over the control of your dapp
   to the SNS and ask the IC to decentralize the SNS in a decentralization sale.
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
   the exchange rate is determined and all tokens are given to the sale participants in
   neurons. Once all neurons are created, the SNS is under decentralized control
   and the pre-decentralization-sale mode is reverted. Thus, the 
   governance canister is set to be fully functional.
   If the sale is not successful, the decentralization attempt failed and everything
   is reverted to the state before the SNS launch, including that the dapp’s control
   is handed back to you (i.e., the original developers of the dapp), and the 
   collected ICP are refunded to the sale participants.

## Getting the tools for launching an SNS {#tools}
To set the initial parameters for your SNS, but also to test and launch the SNS
afterwards, you require some tools.
Let us next learn which tools there are and how you can install them.

First, you will need a command line tool that will help you initialize and deploy
the SNS.
This tool is called _SNS CLI_ and you can learn how to deploy it
[here](https://gitlab.com/dfinity-lab/public/ic/-/tree/master/rs/sns/cli#deployment).
<!--TODO-CLI/dfx: adjust in case we have the dfx tool ready -->

Second, you will need `sns-quill`, another command line tool that allows you to
interact with the SNS canisters.
`sns-quill` supports cold wallets (e.g., air-gapped computers) and therefore allows for a 
more secure interaction with the SNS canisters than other options.
Please follow the steps [here](https://github.com/dfinity/sns-quill#download) to download
and build the tool.

## Preparing the principals needed in the initial parameters {#principals}
There are two kinds of principals that are needed in the SNS launch: principals that 
control the initial neurons and (at least) one principals to perform all the steps required
to launch an SNS.

### Principals for initial neurons
As explained more in the next section, you can define initial neurons that exist
right when the SNS is deployed. This includes developer neurons for the developers of
the dapp as well as airdrop neurons for other investors.
Each of these neurons has to be initialised with a principal that controls the neuron.
Thus, to specify these initial neurons, you need to generate principals for the neurons
that you own in the beginning. You also have to ask other initial neuron holders to do 
so and collect their principals.

As the initial version of the SNS does not support hardware wallets, we recommend that
the initial neurons use principals generated by `sns-quill`. As `sns-quill` supports
cold wallets, this allows to generate principals in such a way that the secret key is
stored on a machine that never has to be connected to the internet (have an "air-gapped
computer"). This option is more secure than using principals for which the secret key is
stored e.g. in the browser.

To get these principals:
1. Ask all initial neuron holders to create an `sns-quill` principal by following the
instructions [here](https://github.com/dfinity/sns-quill#generating-identities).
2. Ask all initial neuron holders to get their generated principal ID and account ID
as explained [here](https://github.com/dfinity/sns-quill#generating-identities) and to
   forward this information to you.

### Principal to launch the SNS
In addition to the principals above, you will need (at least) one principal to perform
all the steps required to deploy an SNS. Let us assume you use just one.
This principal needs to satisfy the following requirements:
1. With the current set of tools, this principal needs to be compatible with both
`dfx` and `sns-quill`.
2. For some steps in the launch process, this principal must be allowed to submit
   and vote on NNS and SNS proposals. 

The former means that the principal's secret key will have to be stored in dfx.
The latter means that the principal requires some permissions on one of the initial
neurons and an NNS neuron.
As we argued above, we recommend using `sns-quill`-principals for the initial neurons
and make sure that their secret keys never have to leave the air-gapped machine.
Therefore, we propose that a separate principal is generated for the deployment, for
which we port the secret key to dfx and which has only limited permissions on neurons.
To set up this principal: 
1. Create an `sns-quill` principal as follows (also see
   [here](https://github.com/dfinity/sns-quill#generating-identities)).
   
   ```
   $ sns-quill generate --pem-file devIdentity.pem --seed-file seed.txt
   ```
   The identity of your principal (including the secret key) is now stored in 
   `devIdentity.pem`.
   
2. Copy the `devIdentity.pem` file to `dfx`, specifically to the directory
   `.config/dfx/identity`. This will allow you to use the same principal in dfx. 
   You can then, in dfx, change to this identity as follows:
      ```
   $ dfx identity use devIdentity
   ```
   We refer to [this page](https://internetcomputer.org/docs/current/references/cli-reference/dfx-identity)
   for more information on dfx identities.
   
3. 




## Setting the SNS parameters {#setting-parameters}
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
'Defining the initial parameters for the SNS'.** <!-- TODO: add link -->

To give you an overview, these are the categories of parameters that you can set:
1. Parameters of the _SNS governance canister_. These are parameters of the governance
that can, in contrast to the other parameters listed here, be changed later 
   by SNS proposals. They include parameters such as the
   minimum stake that a neuron must have, or the cost (in SNS tokens) of submitting a proposal that is not adopted.
   
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
      in an initial decentralization sale. If the sale is successful the participants
      will receive SNS tokens in a basket of neurons. 
      If not all of the sale tokens are sold in the initial sale, the rest of the
      sale tokens are reserved for future sales (separate from the treasury). 
      Note that future sales are not yet designed, but having the tokens reserved
      makes SNSs forward compatible to such a future that is planned to be added in
      the future.
      
All developer and airdrop tokens are distributed to the defined principals at
genesis in neurons. We call them _developer neurons_ and the _airdrop neurons_,
respectively, and refer to all these neurons as the _initial neurons_.
All developers, airdrop principals, and the sale participants receive
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
At this point, the dapp canister(s) are already controlled by the SNS.
Therefore, **you must make sure that you define at least one developer or 
airdrop neuron as they provide the only way to upgrade the dapp during
the sale.**

:::

