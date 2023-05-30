# SNS introduction

## Overview
We assume that if you are reading this page you know what a 
decentralized autonomous organization (DAO) is, 
you know that a service nervous system (SNS) is a kind of DAO that is
provided on the IC, and that you want to learn how you can get a DAO
for your dapp. 
If this is not (yet) the case, you can learn more about DAOs and SNSs
[here](./tokenomics/index.md),
including what advantages such decentralized governance systems have.

## How to get and maintain a DAO _{#gettingDAOoptions}_

There are at least the following options on how to get and maintain a DAO for
your dapp.

- **Get a system-provided SNS, an SNS that is provided as a system functionality by the IC.**
   In this option, developers can get an SNS DAO for their dapp by handing over their dapp to the
   IC. The IC, or rather the NNS community, will maintain the SNS code and can
   continuously approve new improved SNS versions. The SNS community can then simply decide
   to adopt those new versions in their SNS instance.
   Individual SNSs can nevertheless be customized by choosing parameters that
   can be configured to realise different forms of voting and tokenomics.
   In this option, SNSs are hosted on an SNS subnet. Since this subnet exclusively hosts
   system-provided SNSs, this simplifies the verification
   for end users: users can simply verify that an SNS
   is running on the SNS subnet and infer that the underlying code has been approved
   by the NNS community.

- **Self-deploy a DAO by reusing the publicly available SNS code and manually upgrade it.**
   A developer or a community can choose to deploy the SNS code, which is
   [open source](https://github.com/dfinity/ic/tree/master/rs/sns), on a normal 
   application subnet. They can then choose to follow the same SNS versions than
   system-provided SNSs follow or they can choose to deviate from this path.
   In this option, the DAO community has to be more active in 
   implementing, testing and approving code versions.

- **Build your own DAO or use frameworks provided by others to build your DAO.**
   While this is conceptually similar to the second option, we would like to emphasize
   that there are of course other designs than what the SNS code implements
   that also realize a DAO.
   For most of these, the implications for the communities will be similar to the
   second option: The DAO communities will have to maintain the DAO versions or trust
   a third party to do so.

These possibilities allow communities to choose between using DAOs that are provided
as a service by the IC, where maintenance is as automated as possible, and DAOs
that have full flexibility of how they can evolve. 

We explain here the SNS DAOs from the first option in more detail.

## SNS canisters
The SNS consists of the following canisters: 
* The governance canister.
* The ledger canister and archive canisters.
* The index canister.
* The root canister.
* The decentralization swap canister that is explained in the next
section.

The **governance canister** enables decentralized decision making.
It stores **proposals** that are suggestions on how to
evolve the dapp that the SNS governs and **neurons** that define who the governance
participants are. Neurons facilitate stake-based voting as they contain staked SNS tokens.
Anyone can be a participant in governance by staking SNS tokens in a neuron.

The **ledger canister** implements the 
[ICRC-1 standard](https://github.com/dfinity/ICRC-1)
and contains a unique token that is different for each SNS. We call this kind of tokens
**SNS tokens**.
In each SNS, this SNS's ledger stores which accounts own how many SNS tokens and 
the history of transactions between them. 
As we want to keep the full ledger history but a canister has limited
memory, the ledger canister spawns **archive canisters** that store the ledger block history. 
Moreover, wallets and other frontends will need to show all transactions that are
relevant for a given account.
To facilitate this and ensure that not every frontend has to implement this themselves,
the **index canister** provides a map of which transactions are relevant for a given account.

The **root canister** is responsible for upgrading the other SNS canisters
and the dapp canisters that the SNS governs.

## SNS lifecycle
### SNS launch
As already described above, the SNS canister code is maintained and approved by the IC community.
In more detail, the approved SNS versions and upgrade paths are stored on an NNS canister
called the **SNS Wasm modules canister (SNS-W)**.
If a developer wants to get an SNS for their dapp, this proceeds in the following high level steps:
- #### Step 1: The SNS canisters are created and their initial parameters are set by a manual call to SNS-W.
   The SNS canister are in **pre-decentralization-sale state** with limited capabilities.
   In this state, there are some initial neurons that can
   upgrade the dapp canisters through the SNS already.
   To ensure that malicious parties cannot simply perform this step and fill the SNS subnet 
   with non-approved canisters, SNS-W contains a list of principals that are 
   allowed to install an SNS. 
   A principal can be added to this list by NNS proposal, 
   which will allow the principal to install exactly one SNS. 
   After this one call, SNS-W automatically removes the principal from the list again,
   so this can only be done once.
- #### Step 2: The dapp’s control is handed over to the SNS canisters by the dapp developers.
- #### Step 3: An NNS proposal is submitted. If the proposal is adopted, a decentralization swap is started for the SNS (see next). 
   When voting on this proposal, the NNS voters can verify the parameters in the already
   existing SNS canisters as well as the sale parameters that are set in the proposal.
   If the proposal is rejected, the SNS launch fails and the dapp is handed back to the
   developers.

### SNS decentralization swap
A crucial part of launching an SNS is how it can be decentralized. 
That is, new tokens must be distributed to a large community to ensure
proper decentralization of the voting power. There are of course many ways to do so.
The first SNS version provides one simple way to achieve this:
a developer can hand over their dapp to the ICP and ask it to start a decentralization 
sale for the newly created SNS.

In the decentralization swap, a fixed number of newly created SNS tokens sold for ICP tokens. 
The sale these ICP tokens and, in the end of the sale, the conversion rate is computed
as the ratio of ICP collected by the number of sold SNS tokens.
After a successful decentralization swap, SNS tokens are owned by a large
community and therefore the SNS governance control is decentralized.
Moreover, the ICP that were collected in the decentralization swap provide initial
funding for the SNS project in a SNS-owned treasury.

The decentralization swap and how to get an SNS including such a sale
are described in more detail [here](./get-sns/get-sns-intro.md).

### SNS management
As mentioned, these system-provided SNSs are maintained by the IC.
This eliminates much of the maintenance burden from the SNS communities.
However, there are still some maintenance tasks that have to be performed by an
SNS community, such as deciding and voting on _when_ an SNS should be upgraded
to a new version, adjusting the SNS parameters when needed, and making
sure that the SNS canisters do not run out of cycles.
We especially want to emphasise the last point: 

:::caution
The SNS communities are responsible for individually topping up the cycles of
all SNS canisters as well as all dapp canisters that are controlled by the SNS.
Special care must be taken that cycles are also monitored for canisters that
are automatically created. In particular, this includes the archive canisters
that are automatically spawned by the ledger canister.
**If the archive canisters are not provided with sufficient cycles, the ledger block history may be lost.**
:::

In the future, cycles management will be simplified in a new feature that 
allows canister groups, where cycles can be managed across different canisters.

We plan to create separate pages where you will be able to
find more details regarding <!--how to upgrade SNS canisters(./managing-sns/upgradeSNS.md), set SNS parameters(./managing-sns/nervous-system-parameters.md),-->
how to upgrade SNS canisters, set SNS parameters,
and [manage cycles](./managing-sns/cycles-usage.md).


