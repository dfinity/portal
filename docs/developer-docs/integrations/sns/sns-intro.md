# SNS

A Decentralized Autonomous Organization, or DAO for short, is a system that allows
many parties to jointly control an entity.
Similarly to how the Network Nervous System (NNS) is the open tokenized DAO that controls
the Internet Computer blockchain (IC), service nervous systems 
(SNSs) are algorithmic DAOs that allow developers to create decentralized, 
token-based governance systems for their dapps.
This means, each dapp that would like to be under decentralized control will have a 
separate SNS.

## What is a DAO?
DAO stands for _Decentralized Autonomous Organization_.

Let's first clarify what we mean by _decentralized_ in this
context.
First, an application can run on a _decentralized platform_. This means that
the platform itself is controlled by many different parties and, in particular,
that even if some of these parties fail or turn malicious, the application
will still keep running successfully. The IC is such a platform as it is
run by many nodes that are owned by independent node providers. Therefore,
we call applications that run on the IC
_decentralized applications_ or _dapps_.

A second kind of decentralized denotes who is in control of changing a dapp,
or a smart contract more generally.
In general, dapps running on the IC or smart contracts on other
decentralized platforms can still be controlled by a single, central entity
and thus still be under centralized control. 
As we will motivate below, it is often beneficial if a dapp is also under
_decentralized control_. This means that no single party can decide how the 
dapp is evolved. Instead, the dapp can only be changed according to decisions
that many parties jointly make. 
This decentralized control of a dapp is what a DAO achieves.

## Motivation: why a DAO? 
We next discuss the main motivations for DAOs from the point of view of two
main actors on the IC: the dapp developers, who build dapps on the IC, and
the end-users, who interact with and invest in dapps.

### Dapp users
Dapps on the IC are realized as a set of canister smart contracts.
Canisters define a _controller_ specifying which principals can
modify them.
Most dapp canisters are either controlled by some developers or
have no controller at all.
Both situations are undesirable for a dapp's users.
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
developer's interest to build the features users want.

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
The fact that tokens can then be staked and then be used for governance
participation ensures that investors can contribute to the decisions
on how the dapp will be evolved.
Voting rewards might further incentivize investors to participate in governance. 
Finally, the positive network effects that tokenomics can have are of course
also in the interest of the investors whose tokens have an increased value if
the project is successful.

<!--
### How this fits with the Web3 vision [todo: Ais might have a go on this]
=> SNS introduced decentralization and tokenization
* dapps are on chain end-to-end
* dapps are user-owned
* dapps are user-controlled
-->

## How to deploy and maintain a DAO - different options

There are at least the following options on how to get and maintain a DAO for
your dapp.

1) **Deploy an SNS that is provided as a _system functionality_ by the IC.**
   An SNS is realized by a set of canisters. Deploying and maintaining them is
   not a simple task. If one of the SNS canisters is upgraded, it has to be guaranteed
   that the new version of this canister is still compatible with the other SNS
   canisters. Moreover, not all canister versions can be upgraded to all other 
   canister versions without breaking some functionality, e.g., due to incompatibility
   during state migration.
   To help them with these challenges, projects can choose an SNS that
   is automatically maintained by the IC. This means that upgrades from one deployment
   to another deployment are provided, thoroughly tested, and then approved by the IC
   community (through NNS proposals). We denote this by saying that the IC community
   _blesses_ a new SNS deployment. 
   All the SNS communities have to do is to vote
   to upgrade the SNS according to the blessed upgrade path. This will automatically
   fetch the right canister versions that have previously been "blessed" and
   upgrade the SNS canisters to them. 
   SNS communities can nevertheless customize their SNS by choosing a variety
   of parameters.
   Such SNSs are hosted on an _SNS subnet_ that exclusively hosts blessed SNSs.
   This simplifies the verification for end users who can simply verify that an SNS
   is running on the SNS subnet and infer that the canisters run blessed versions
   rather than possibly altered code.
   
2) **_Self-deploy_ an SNS and manually upgrade it.**
   A community can choose to deploy the SNS code, which is open source and 
   available [here](https://github.com/dfinity/ic/tree/master/rs/sns), on an 
   application subnet. They can then choose to follow the blessed upgrade path or deviate 
   from this path, e.g., leaving out some versions, or even modify the canisters’ code 
   in a completely different way. In this option, canister upgrades require more 
   actions of the SNS community (i.e., compiling new wasms and make upgrade proposals)
   and the SNS community has to ensure that the upgrades are secure. This includes 
   ensuring that alternative canister versions are compatible and that upgrades to 
   newer versions do not break any functionality.

3) **Build your own DAO or use frameworks provided by others to build your DAO.**
   While this is conceptually similar to the second option, we would like to emphasize
   that there are of course other design than the SNS that also realize a DAO.
   For most of these, the implications for the communities will be similar to the
   second option: The DAO communities will have to maintain the DAO versions, or trust
   a third party to do so and such DAOs can be deployed on a higher-replication 
   application subnet. 
   

These possibilities allow communities to choose between using DAOs that are provided
as a service by the IC, where maintenance is as automated as possible, and DAOs
that have full flexibility of how they can evolve. Because the possibilities for
Options 2 and 3 are unbounded, we focus here on explaining the SNS in Option 1 in
more detail.

## SNS canisters
The SNS consists of the following canisters: the governance canister, 
the ledger canister and archive canisters,
the index canister, 
the root canister, and 
the decentralization sale canister that is explained in the next
section.

The _governance canister_ enables decentralized decision making.
It stores _proposals_ that are suggestions on how to
evolve the dapp that the SNS governs and _neurons_ that define who the governance
participants are. Neurons facilitate stake-based voting as they contain staked SNS tokens.
Everyone can become a government participant by staking SNS tokens in a neuron.

The _ledger canister_ implements the 
[ICRC-1 standard](https://github.com/dfinity/ICRC-1)
and contains SNS tokens, which are unique tokens for each SNS.
It stores which accounts own how many SNS tokens and the history of transactions 
between the principals. 
As we want to keep the full ledger history forever but a cansiter has limited
memory, the ledger canister spwans _archive canisters_ that store the block history. 
Morevoer, wallets and other frontends will need to show all transactions that are
relevant for a given account.
To facilitate this and ensure that not every frontend has to implement such a filter,
the _index canister_ provides a map of which transactions are relevant for a given account.

The _root canister_ is responsible for upgrading the other SNS canisters
and the dapp canisters that the SNS controls.

## SNS lifecycle 

### SNS launch
As already described above, SNS canisters are maintained and blessed by the IC community.
In more detail, the blessed SNS versions and upgrade paths are stored on an NNS canister
called the _SNS wasm modules canister_.
Anyone can set up SNS canisters. To do so, they can make a call to the SNS wasm modules
canister, who takes the latest versions of the SNS canisters, initializes them with
the parameters given by the user, and installs them on the SNS subnet.
This call is not permissioned and anyone can set up an SNS in this way if they
provide sufficient cycles for the SNS canisters.

A crucial part of launching an SNS is how it can be decentralized. 
That is, the newly created tokens must be distributed to a large community to ensure
proper decentralization of voting power. There are of course many ways to do so.
The first SNS version provides one simple way to achieve this:
a developer can hand over the control of the dapp to a newly installed SNS, that has
at that stage limited capabilities as it may not be fully decentralized yet, and
ask the Internet Computer to launch this SNS by starting a decentralization sale
for it.
In this the decentralization sale, initial SNS tokens are sold for ICP tokens.
In the end of a successful decentralization sale, SNS tokens are owned by a large
community and therefore the SNS governance control is decentralized.
Moreover, the ICP that were collected in the decentralization sale provide initial
funding for the SNS project.
It is conceivable that alternative ways to launch and decentralize a dapp are
added in later SNS versions.

The decentralization sale and the steps to conclude an SNS launch including this
<<<<<<< HEAD:docs/developer-docs/functionality/sns/sns.md
decentralization sale are described in more detail [here](./deployment/launch-intro.md).
=======
decentralization sale are described in more detail [here](./deployment/deployment.md).
>>>>>>> master:docs/developer-docs/functionality/sns/sns-intro.md

### SNS maintenance
As mentioned, this SNS option is provided as a system function and the SNS canister
versions are maintained by the IC.
This eliminates much of the maintenance burden from the SNS community.
However, there are still some maintenance tasks that have to be performed by an
SNS community, such as deciding and voting on when an SNS should be upgraded
to a new blessed version, adjusting the SNS parameters when needed, and making
sure that the SNS canisters do not run out of cycles.
We especially want to emphasise the last point: 

:::warning
The SNS communities are responsible for individually topping up the cycles of
all SNS canisters as well as all dapp canisters that are controlled by the SNS.
Special care must be taken that cycles are also monitored for canisters that
are automatically created. In particular, this includes the archive canisters
that are spawn by the ledger canister.
**If the archive canisters are not provided
with sufficient cycles, the ledger block history may be lost.**
:::
In the future, cycles management will be simplified in a new feature that 
allows canister groups, where cycles can be managed across different canisters.

There are separate pages where you can fine more details regarding [how 
to upgrade SNS canister](./managing-sns/upgradeSNS.md),
[set SNS parameters](./managing-sns/nervous-system-parameters.md),
and [manage cycles](./managing-sns/cycles-usage.md).