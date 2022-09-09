<!--# Service Nervous System-->

We assume that if you are reading this page you know what a 
decentralized autonomous organization (DAO) is, 
you know that a service nervous system (SNS) is a kind of DAO that is
provided on the IC, and that you want to learn how you can get a DAO
for your dapp. 
If this is not (yet) the case, you can learn all about DAOs and SNSs
[here](../../../tokenomics/sns/sns-intro-tokens.md),
including what advantages such decentralized governance systems have.

<!-- What I assume to be on the other intro page
Comparison of NNS to SNS
What is a DAO?
Motivation: why a DAO? 
-->

## How to get and maintain a DAO - different options _{#gettingDAOoptions}_

There are at least the following options on how to get and maintain a DAO for
your dapp.

1) **Get a _system-provided_ SNS, an SNS that is provided as a _system functionality_ by the IC.**
   In this option, developers can get an SNS DAO for their dapp by a simple call
   to the IC. The IC, or rather the NNS community, will maintain the SNS code and can
   continuously approve new improved SNS versions.
   Individual SNSs can nevertheless be customized by choosing parameters that
   can be configured to realise different forms of voting and tokenomics.
   In this option, SNSs are hosted on an _SNS subnet_. Since this subnet exclusively hosts
   system-provided SNSs, this simplifies the verification
   for end users: users can simply verify that an SNS
   is running on the SNS subnet and infer that the underlying code has been approved
   by the NNS community.
   
<!-- An SNS is a DAO that is realized by a set of  [canister smart contracts](../../../references/ic-interface-spec.md#overview_of_the_internet_computer).
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
next blessed version. -->

2) **_Self-deploy_ an SNS and manually upgrade it.**
   A developer or a community can choose to deploy the SNS code, which is
   [open source](https://github.com/dfinity/ic/tree/master/rs/sns), on an 
   application subnet. They can then choose to follow the same SNS versions than
   system-provided SNSs follow or they can choose to deviate from this path.
   In this option, the SNS community has to be more active in 
   implementing, testing and approving SNS code versions.

3) **Build your own DAO or use frameworks provided by others to build your DAO.**
   While this is conceptually similar to the second option, we would like to emphasize
   that there are of course other designs than the SNS that also realize a DAO.
   For most of these, the implications for the communities will be similar to the
   second option: The DAO communities will have to maintain the DAO versions or trust
   a third party to do so.

These possibilities allow communities to choose between using DAOs that are provided
as a service by the IC, where maintenance is as automated as possible, and DAOs
that have full flexibility of how they can evolve. Because the possibilities for
Options 2 and 3 are unbounded, we focus on explaining the SNS in Option 1 in
more detail.

<!--## SNS canisters-->
The SNS consists of the following canisters: 
the governance canister, 
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
between them. 
As we want to keep the full ledger history but a cansiter has limited
memory, the ledger canister spawns _archive canisters_ that store the block history. 
Morevoer, wallets and other frontends will need to show all transactions that are
relevant for a given account.
To facilitate this and ensure that not every frontend has to implement such a filter,
the _index canister_ provides a map of which transactions are relevant for a given account.

The _root canister_ is responsible for upgrading the other SNS canisters
and the dapp canisters that the SNS governs.

<!--## SNS lifecycle
### SNS launch-->
As already described above, the SNS canister code is maintained and approved by the IC community.
In more detail, the approved SNS versions and upgrade paths are stored on an NNS canister
called the _SNS wasm modules canister (SNS-W)_.
A user can set up an SNS by making a call to the SNS wasm modules canister, who takes the
latest versions of the SNS canisters, initializes them with
the parameters given by the user, and installs them on the SNS subnet.
For this to work, the user has to provide sufficient initial cycles for the SNS canisters.
Moreover, to allow for beta testing and to ensure that the SNS subnet is not
overloaded, in the beginning this call to SNS-W is authorized.
Concretely, SNS-W will have a whitelist of principals that are allowed to set up an SNS and this
list can be updated by NNS proposals. This way, everyone can make an NNS proposal and
register their principal in the list, but the NNS community has means of controlling how many SNSs
should be set up how quickly in the beginning.

A crucial part of launching an SNS is how it can be decentralized. 
That is, the newly created tokens must be distributed to a large community to ensure
proper decentralization of the voting power. There are of course many ways to do so.
The first SNS version provides one simple way to achieve this:
a developer can hand over the control of the dapp to a newly installed SNS, that has
at that stage limited capabilities as it may not be fully decentralized yet, and
ask the Internet Computer to launch this SNS by starting a decentralization sale
for it.
In this decentralization sale, initial SNS tokens are sold for ICP tokens.
In the end of a successful decentralization sale, SNS tokens are owned by a large
community and therefore the SNS governance control is decentralized.
Moreover, the ICP that were collected in the decentralization sale provide initial
funding for the SNS project.
It is conceivable that alternative ways to launch and decentralize a dapp are
added in later SNS versions.

The decentralization sale and how to get an SNS including such a sale
are described in more detail [here](./get-sns/get-sns-intro.md).

<!--### SNS management-->
As mentioned, these system-provided SNSs are maintained by the IC.
This eliminates much of the maintenance burden from the SNS communities.
However, there are still some maintenance tasks that have to be performed by an
SNS community, such as deciding and voting on _when_ an SNS should be upgraded
to a new version, adjusting the SNS parameters when needed, and making
sure that the SNS canisters do not run out of cycles.
We especially want to emphasise the last point: 

:::warning
The SNS communities are responsible for individually topping up the cycles of
all SNS canisters as well as all dapp canisters that are controlled by the SNS.
Special care must be taken that cycles are also monitored for canisters that
are automatically created. In particular, this includes the archive canisters
that are automatically spawned by the ledger canister.
**If the archive canisters are not provided
with sufficient cycles, the ledger block history may be lost.**
:::
In the future, cycles management will be simplified in a new feature that 
allows canister groups, where cycles can be managed across different canisters.

There are separate pages where you can find more details regarding [how 
to upgrade SNS canister](./managing-sns/upgradeSNS.md),
[set SNS parameters](./managing-sns/nervous-system-parameters.md),
and [manage cycles](./managing-sns/cycles-usage.md).