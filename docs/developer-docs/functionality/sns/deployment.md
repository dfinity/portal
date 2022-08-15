# Launching the SNS in production
This describes the detailed steps for launching an SNS.

:::caution

In the following steps we assume that you have already
[collected the developer and airdrop principals and chosen
the initial SNS parameters in a .yaml file](predeployment.md).
We also recommend that before following these steps and launch an
SNS in production, you have [tested the SNS](local-testing.md).

:::

You are now ready to launch your SNS. There are some steps that are needed
for launching an SNS and some steps that we recommend as intermediate
sanity checks that up to this point everything works fine.
We mark the latter by the keyword _(Recommended)_.

#### 1. Make a call to the SNS wasm modules canister on the NNS subnet.
To make this call, use the command as described 'here'.

[comment]: <> (TODO: add link)

Upon receiving this call, the SNS wasm modules cansiter will deploy
an SNS with your chosen initial parameters.


#### 2. Add the SNS root canister as a controller to your dapp canister(s).
To do so, use the command as described 'here'.

[comment]: <> (TODO: add this to CLI/dfx tool as need to learn SNS canisters)

#### 3. _(Recommended)_ Test upgrading the dapp canister(s) by SNS proposal.
To test this, make an SNS proposal to upgrade one of the dapp canisters to
a new wasm version.
Then, ensure that sufficiently many initial neurons (deveoper and airdrop
neurons) vote on the proposal so that it is adopted.
In this way, confirm that the proposal has been upgraded. 

You can learn what command to use to make an SNS proposal 'here' and

[comment]: <> (TODO: SNS quill documentation to make proposal and link to it)
how to vote on an SNS proposal 'here'.

[comment]: <> (TODO: SNS quill - link to a page & paragraph that explains how to vote on SNS proposal.)

:::info

This step is one of the reasons why you should ensure that you can
reach and get buy in from a majority of the inital neurons. Also, these
neurons have to be able to vote on SNS proposals, which might require
the to vote on a command line tool as frontends might only show SNS
proposals after the decentralization sale.

[comment]: <> (&#40;TODO: make more precise the warning in the launch / choosing parameters part&#41; to also specify that the initial neurons might need to vote on a CLI)

:::

#### 4. Remove all other controllers from the dapp cansiter(s)
Once you convinced yourself that the dapp canister(s) can be upgraded by
the SNS, you should remove yourself, as well as any other developers,
from the list of controllers that the dapp canister(s) have.
Note that without this, the next step will fail.

To do this, you can use the command 'here' where you specify as the principals
to be removed all existing controller principals except for the SNS root
that you have already added.

[comment]: <> (add link, should already exist in DFX)

#### 5. Register the dapp to the SNS
Next, you will register the dapp canisters that are now controlled by the SNS
in the SNS root canister. This is to make sure that the SNS root canister
is aware of the canisters that it officially governs. 
This ensures, for example, that if you request a canister summary from the
SNS root canister, then the dapp canisters are included in this summary and 
you can learn how many cycles they still have and other information.

Registering a dapp under an SNS is again done by an SNS proposal.
You can learn how to make the proposal to register a dapp canister under 
the SNS 'here' and follow the instructions from Step 3. to vote on the proposal.
As in Step 3., sufficient initial neurons have to vote to reach a majority.

[comment]: <> (IN CASE THIS IS NEEDED: Repeat these steps for all cansiters that you would like to register.)

#### 6. _(Recommended)_ Test upgrading the dapp canister(s) by SNS proposal.
To make sure that you can still upgrade the dapp canister(s) by SNS proposal,
you can repeat Step 3. at this point.

#### 7. Make a NNS proposal to start the decentralisation sale.
At this point, you have handed over the control of your dapp to the Internet
Computer. 
To make sure that the Internet Computer starts the SNS decentralization sale,
you can ask the NNS community to start the sale.
To do so you send submit an NNS proposal as described 'here'

[comment]: <> (TODO: add link)

Note that anyone can send such a proposal, but as the original developer
of the dapp you probably want to make sure that such a proposal is set.



