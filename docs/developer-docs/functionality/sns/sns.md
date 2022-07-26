# SNS

A decentralized autonomous organization, or DAO for short, is a system that allows
many parties to jointly control an entity.
Similarly to how the Network Nervous System (NNS) is the open tokenized DAO that controls
the Internet Computer blockchain (IC), service nervous systems 
(SNSs) are algorithmic DAOs that allow developers to create decentralized, 
token-based governance systems for their dapps.
Thsi means, each dapp that would like to be under decentalized control will have a 
separate SNS.

### Decentralization notions
Before further motivating SNSs, let's first clarify what we mean by
_decentralized_ in this context.
First, an application can run on a _decentralized platform_. This means that
the platform itself is controlled by many different parties and, in particular,
that even if some of these parties fail or turn malicious, the application
will still keep running successfully. The IC is such a platform as it is
run by many nodes that are owned by independent node providers. Therefore,
we call applications that run on the IC
_decentralized applications_ or _dapps_.
A second kind of decentralized denotes who is in control of changing a dapp.
That is, dapps running on the IC can still be controlled by a single, central
entity. 
As we will motivate below, it is often beneficial if a dapp is also under
_decentralized control_. This means that no single party can decide how the 
dapp is evolved. Instead, the dapp can only be changed according to decisions
that many parties jointly make in a DAO.
The latter kind of decentralization is what the SNS helps with: it allows 
to decentralize the control of a dapp.


## Motivation: why getting an SNS? 
We next discuss the main motivations for DAOs from the point of view of two
main actors on the IC: the dapp developers, who build dapps on the IC, and
the end-users, who interact with and invest in dapps.

### Dapp users
Dapps on the IC are realised as a set of canister smart contracts.
Canisters define a _controller_ specifying which principals can
modify them.
Most dapp canisters are either controlled by some developers or
have no controller at all.
Both situations are undesirable for a dapps' users.
In the case where a dapp is controlled by a centralized group of developers,
users of the dapp must trust these developers not to stop the application and
not to modify the application in an undesirable way, e.g., that favors the 
developers.
In the case where the canister has no controller, it cannot be upgraded at
all. This not only prevents evolving the dapp regarding new requirements but
might also be a problem when it is necessary to fix security bugs.

DAOs provide a third option, namely to hand over the control over a dapp
to a community that can jointly decide how to evolve a dapp in an open 
governance system, i.e., to _decentralize a dapp's control_. This protects
users as the control is now in the
hand of a community rather than in the hand of a few parties. Moreover, 
dapp users can join the open governance themselves and thereby directly
impact how the dapp is evolved.

### Dapp developers
Decentralizing a dapp's control is not only an advantage for the dapp's users
but can also be an advantage for the dapp's developers. After all, it is in the
developer's interest to build those features that the users want.

Apart from this, another motivation for dapp developers to adopt
a DAO such as the SNS is that it allows to _tokenize the dapp_ which can
help to get _initial funding_ and _initial adoption_.

For a dapp that has an assigned SNS, everyone can purchase
SNS tokens and participate in SNS governance.
Thereby, anyone in the world can contribute to the funding of the project.
This is fundamental for developers as this allows the SNS to decide to
spend some of these funds, for example to pay for the dapp’s cycles or to
pay developers.

The SNS can also decide to use different tokenomics models to create new
incentive systems.
For example, the SNS can decide to introduce voting rewards to motivate active
governance participation.
Moreover, rewards can be given to early adopters of the
dapp and active users, which will help attract users.
Furthermore, those who then possess SNS tokens are motivated to help
increase the value of the tokens by attracting even more users. Therefore,
such incentive systems can have positive network effects that are critical
for the success of some dapps.

### Dapp investors
Apart from active dapp users and dapp developers a third user group are
those who would like to invest in a dapp.
As already mentioned above, investors too profit both from the tokenization
and decentralization that a DAO such as the SNS can provide.
First, tokenization allows investors to get SNS tokens and invest in a dapp.
The fact that tokens can then be staked in neurons and thus allow for governance
participation, ensures that investors can contribute to the decisions on how the
dapp will be evolved.
Voting rewards might further incentivize investors to participate in governance. 
Finally, the positive network effects that tokenomics can have are of course
also in the interest of the investors whose tokens have an increased value if
the project is successful.

### How this fits with the Web3 vision
=> SNS introduced decentralization and tokenization
[todo: Ais might have a go on this]
* dapps are on chain end-to-end
* dapps are user-owned
* dapps are user-controlled


## How to deploy and maintain a DAO

There are at least the following options how to get and maintain a DAO for your dapp.

1) **Deploy an SNS that is provided as a _system functionality_ by the IC.**
   An SNS will be realized by a set of canisters. Deploying and maintaining them is
   not a simple task. If one of the SNS canisters is upgraded, it has to be guaranteed
   that the new version of this canister is still compatible with the other SNS
   canisters. Moreover, not all canister versions can be upgraded to all other 
   canister versions without breaking some functionality, e.g., due to incompatibility
   during state migration.
   To help them with these challenges, projects can choose an SNS that
   is automatically maintained by the IC. This means that upgrades from one deployment
   to another deployment are provided, thoroughly tested, and _blessed_ by the IC
   community (through NNS proposals). All the SNS communities have to do is to vote
   to upgrade the SNS according to the blessed upgrade path. This will automatically
   fetch the right canister versions that have previously been "blessed" and
   upgrade the SNS canisters to them. 
   SNS communities can nevertheless customize their SNS by setting choosing a variety
   of parameters.
   Such SNSs are hosted on an _SNS subnet_ that exclusively hosts blessed SNSs.
   This simplifies the verification for end users who can simply verify that an SNS
   is running on the SNS subnet and infer that the canisters run blessed versions
   rather than possibly altered code.
   
2) **_Self-deploy_ an SNS and manually upgrade it.**
   Any SNS community can choose to deploy the SNS code, which is open source, on an 
   application subnet. They can then choose to follow the blessed upgrade path or deviate 
   from this path, e.g., leaving out some versions, or even modify the canisters’ code 
   in a completely different way. In this option, canister upgrades require more 
   actions of the SNS community (i.e., compiling new wasms and make upgrade proposals)
   and the SNS community has to ensure that the upgrades are secure. This includes 
   ensuring that alternative canister versions are compatible and that upgrades to 
   newer versions do not break any functionality. 
   In order to provide better security for such SNSs and other security-sensitive
   canisters, an application subnet with higher replication will soon be available.

3) **Build your own DAO or use frameworks provided by others to build your DAO.**
   While this is conceptually similar to the second option, we would like to emphasise
   that there are of course other design than the SNS that also build a DAO.
   For most of these, the implications for the communities will be similar to the
   second option: The DAO communities will have to maintain the DAO versions, or trust
   a third party to do so and such DAOs can be deployed on a higher-replication 
   application subnet that will soon be available. 
   

These possibilities allow communities to choose between using DAOs that are provided
as a service by the IC, where maintenance is as automated as possible, and DAOs
that have full flexibility of how they can evolve. Because the possibilities for
Options 2 and 3 are unbounded, we focus here on explaining the SNS in Option 1 in
more detail.

    * I AM HERE
    





## SNS canister overview
We propose that in this initial design an SNS consists of three canisters:

the governance canister which enables decentralized decision making,
the ledger canister which determines for a SNS-specific governance token the balances and transactions, and
the root canister which is responsible for upgrading the other SNS canisters and the dapp that the SNS controls.
==
A SNS consists of a set of canisters, including the governance canister and the ledger
canister. The ledger canister contains SNS tokens, which are unique tokens for each SNS.
It stores which accounts own how many SNS tokens and the history of transactions between
the principals. The governance canister stores proposals that are suggestions on how to
evolve the dapp that the SNS governs and of neurons that define who are the governance
participants. Neurons contain staked SNS tokens and everyone can become a participant
of the open governance process by staking SNS tokens in a neuron.
==
Goernance
reuse the concepts of
* neurons, which facilitate stake-based voting that guarantees that voters are invested
  in the respective governance token and therefore incentivized to vote in the best
  interest of the system.
* proposals as the SNS should allow users to make suggestions, e.g., how to evolve the
  associated dapp, and for others to vote on these decisions.
  As with the NNS governance, it is expected that the governance canister is deployed
  with an associated ledger canister
  , where it is determined how much stake each neuron has.

## SNS launch / lifecycle 
Out of box: call to SNS-W giving inputs

Many ways to decentralize. 
Propose with an decentralisation sale (+CF). as everything, might evolve.
===
Each SNS will have a separate swap canister that only exists for the duration of the SNS’s launch.

The swap canister is set up at start with a defined amount of SNS tokens to be 
distributed publicly.

During the swap, participants can send ICP to the swap canister to contribute to the 
dapp’s funding.

At the swap’s end the collected ICP are “swapped” for the SNS tokens: the swap 
participants get SNS tokens and the SNS gets the collected ICP. Each user will 
receive their portion of the pool of SNS tokens, pro-rated by their % of the overall
number of ICP contributed. For example, if the swap canister initially held 1000 SNS 
tokens and 500 ICP tokens were collected during the swap, then the exchange rate would 
be 2:1 and each swap participant would get 2 SNS tokens for each ICP token they 
contributed.
The exchange rate is thus set similarly to decentralized exchanges (DEXs) based on
automated market makers (AMM), where the assumption is that two pools of tokens are
of equal value.

The swap achieves that a) a market price for the SNS token is set and b) every swap 
participant receives SNS tokens at that price.


SNS launch goes through the following stages.

**Initializing the SNS**: When developers initialize a SNS to which they want to hand over the control of their dapp, they choose a portion of tokens that are allocated to the developers, to the initial token swap, and to a treasury, which is an account that will be owned by the SNS governance canister and can be spent by the SNS community according to their needs. Possibly they can also specify a portion of tokens that are allocated to other predefined parties, for example to “airdrop” some tokens to known dapp users. The developers can also define the conditions for the swap, for example how many ICP tokens should at least and at most be collected (see details above).
As the SNS is not yet decentralized, the swap canister is controlled by the NNS.
There are only two ledger accounts with liquid tokens during the SNS launch, the treasury that is owned by the governance canister and preallocated tokens owned by the swap canister. To ensure that no one can transfer tokens, and distribute them or start token markets prematurely, all initial tokens from developers or ‘airdrop participants’ are locked in neurons. Moreover, to ensure that these initial neurons cannot modify the SNS before or during the swap and cannot transfer the treasury tokens, the SNS is deployed in a pre-genesis mode with limited functionality.
**Similarly to most canisters on the IC, but unlike the NNS canisters,
SNS canisters burn cycles. => need cycles management**

**Dapp control handover**: Between the SNS initialization and the start of the swap, the developers hand over the control of their dapp to the SNS. As there are already initial neurons (from Step 1), the dapp can now be upgraded via SNS proposals. The initial neurons can not do other things, such as changing the SNS parameters, as the SNS governance canister is still in pre-genesis mode. As the developers were already controlling the dapp before the SNS initialization, they effectively do not have any additional privileges compared to the state before the SNS initialization.

**Starting the swap**: The swap is started by an NNS proposal. This means that during the launch, the developers that originally controlled the dapp hand over the control of their dapp to the NNS that then initializes the swap for them. When voting on a NNS proposal to start a swap, the NNS neurons should consider whether the swap parameters make sense and, most importantly, whether the dapp’s control has been handed over to the SNS already (that is Step 2 was completed successfully). The NNS proposal thus also serves as a safeguard where the wisdom of the crowd can detect potentially malicious SNSs before they trick users into investing in them.
If the NNS proposal is adopted, the swap is started by the NNS. If the NNS proposal is rejected, the SNS launch is aborted and the dapp’s control is handed back to the developers.

**Initial swap**: When the swap starts, the swap canister holds the number of SNS tokens that were specified at initialization (see Step 1). End users can participate in the initial token swap by transferring ICP tokens to the swap canister.

**SNS genesis**: When the swap ends, it is first established whether the swap was successful, e.g., enough ICP have been collected.
If the swap was successful, the exchange rate is determined as explained above and all tokens will be given to the swap participants in neurons staked for three months. Once all neurons are created, the SNS is under decentralized control and the governance canister is set to be fully functional.
If the swap was not successful, the decentralization attempt failed. Thus, everything will be reverted to the state before the SNS launch, including that the dapp’s control is handed back to the developers and all collected ICP are refunded to the swap participants.


