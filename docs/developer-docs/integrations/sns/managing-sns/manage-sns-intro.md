# Manage an SNS

## Overview
SNSs are system-provided DAOs on the IC that are to some extent maintainted by the
NNS community, who for example approve new upgrades of SNS canister code.
This eliminates much of the maintenance burden from the SNS communities.
However, there are still some maintenance tasks that have to be performed by an
SNS community, such as deciding and voting on _when_ an SNS should be upgraded
to a new version, adjusting the SNS parameters when needed, and making
sure that the SNS canisters do not run out of cycles.


## SNS community

Once an
[SNS is launched](../get-sns/get-sns-intro.md),
neither the dapp that the SNS controls, nor the SNS canisters
are under the control of a singe entity such as a developer.
This means that the dapp and to the SNS
canisters, as well as which changes can be made to them,
are **controlled by the SNS community**.
Anyone with an SNS neuron can make a proposal to suggest
a change in the dapp or to modify a parameter in the SNS
governance and, if the majority agrees, the proposal is
automatically executed on-chain.
For this reason, the following pages are not only relevant
for developers but for any member of an SNS community
who would like to actively help managing the SNS.

## Managing an SNS

On this page we will introduce a 
few aspects that are relevant for **managing** an SNS.
As we complete more detailed pages for these different 
topics, we will link to them here.

* As every piece of software, after an
SNS is launched is has to be **maintained**.
This includes ensuring that the SNS canisters are
running the latest version and that they have enough
cycles to continue operating.
You can find more information on<!--how SNS canisters can be  upgraded to new versions on this page (./upgradeSNS.md)
and about--> 
cycle management [on this page](./cycles-usage.md).
  We especially want to emphasise the following:

:::caution
The SNS communities are responsible for individually topping up the cycles of
all SNS canisters as well as all dapp canisters that are controlled by the SNS.
Special care must be taken that cycles are also monitored for canisters that
are automatically created. In particular, this includes the archive canisters
that are automatically spawned by the ledger canister.
**If the archive canisters are not provided with sufficient cycles, the ledger block
history may be lost.**
:::

* While 
[SNSs that are provided as a system function](../sns-intro.md#gettingDAOoptions) 
can only be upgraded to canister versions approved by the 
NNS, each SNS community can configure their SNS according
to their needs.
Most chosen configurations can also be adjusted over time,
for example to adopt to new situations or to experiment with
different governance and tokenomic models.
Therefore, managing an SNS also means that the community
should regularly consider and adjust these configurations,
which are defined by the SNS's **nervous system parameters**.


<!--We describe on
this page(./nervous-system-parameters.md)
which parameters can be chosen and how they can be adjusted 
by proposal.-->

<!-- * Each SNS community might need to have different
kinds of proposals to ensure that the SNS DAO can
manage the
specific dapp and its operatiosn effectively.
This page(./proposal-guide.md) provides some guidelines 
regarding
how proposals can be used and how an SNS community can define
their own kinds of proposals.-->
