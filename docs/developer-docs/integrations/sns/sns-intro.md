# Service Nervous System

A service nervous system (SNS) is a decentralized autonomous organization
(DAO).
We assume that if you are reading this page you know what a DAO is, you
know that an SNS is a kind of DAO that is provided on the IC, and that
you want to learn how you can get a DAO for your dapp. 
If this is not (yet) the case, you can learn all about DAOs and SNSs
[here](../../../tokenomics/sns/sns-intro-tokens.md),
including what advantages such decentralized governance systems have.

<!-- What I assume to be on the other intro page
Comparison of NNS to SNS
What is a DAO?
Motivation: why a DAO? 
-->

## How to get and maintain a DAO - different options

There are at least the following options on how to get and maintain a DAO for
your dapp.

1) **Get an SNS that is provided as a _system functionality_ by the IC.**
   In this option, developers can get an SNS DAO for their dapp by a simple call
   to the IC. The IC, or rather the NNS community, will maintain the SNS code and can
   continuously approve new improved versions of the SNS.
   Individual SNSs can nevertheless be customized by choosing a variety of parameters that
   allow choosing different forms of voting and tokenomics.
   These SNSs are hosted on an _SNS subnet_. Since this subnet exclusively hosts
   SNSs that are provided as a system function, this simplifies the verification
   for end users: users can simply verify that an SNS
   is running on the SNS subnet and infer that the underlying code has been approved
   by the NNS community.
   
   <!-- Remove? :
   An SNS is a DAO that is realized by a set of 
   [canister smart contracts](../../../references/ic-interface-spec.md#overview_of_the_internet_computer).
   In general, installing and maintaining multiple canisters that must be compatible with
   each other is not a simple task.
   On upgrading each of the canisters one has to be careful not to break any functionality
   and it has to be guaranteed that a new, upgraded version of one canister is still
   compatible with the other SNS canisters.
   Therefore, to reduce the work for projects, projects can get an SNS that is provided and 
   automatically maintained by the IC.
   Concretely, upgrades from one SNS deployment to the next are provided, tested, 
   and approved, called _blessed_, by the IC community (through NNS proposals).
   The individual projects then simply have to trigger an upgrade of their SNS to the
   next blessed version.-->

   
2) **_Self-deploy_ an SNS and manually upgrade it.**
   A developer or a community can choose to deploy the SNS code, which is
   [open source](https://github.com/dfinity/ic/tree/master/rs/sns), on an 
   application subnet. They can then choose to follow the upgrade path that is approved
   by the NNS community or they can choose to deviate from this path. In this option,
   testing and upgrading the SNS code requires more actions of the SNS community 
   and the SNS
   community has to ensure that the upgrades are secure. This includes 
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

The decentralization sale and how to get an SNS including such a sale
are described in more detail [here](./get-sns/get-sns-intro.md).

### SNS management
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