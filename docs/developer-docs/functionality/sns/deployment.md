# Launching the SNS in production
This describes the detailed steps for launching an SNS.

:::caution

In the following steps we assume that you have already
[collected the developer and airdrop principals and chosen
the initial SNS parameters in a .yaml file](predeployment.md).
We assume that you have one developer principal that is compatible
with both dfx and SNS quill <!-- TODO: explain what this means and link to where
explained--> that you will use for the following steps.
We also recommend that before following these steps and launching an
SNS in production, you have [tested the SNS](local-testing.md).

:::

You are now ready to launch your SNS. There are some steps that are needed
for launching an SNS and some steps that we recommend as intermediate
sanity checks that up to this point everything works fine.
We mark the latter by the keyword _(Recommended)_.

#### 1. Make a call to the SNS wasm modules canister on the NNS subnet.
To make this call, use the command as described 'here'. <!-- TODO: add link -->
Upon receiving this call, the SNS wasm modules cansiter will deploy
an SNS with your chosen initial parameters.


#### 2. Add the SNS root canister as a controller to your dapp canister(s).
To do so, use the command as described 'here'.
<!-- TODO: add this to CLI/dfx tool as need to learn SNS canisters -->


#### 3. _(Recommended)_ Test upgrading the dapp canister(s) by SNS proposal. {#step3}
To test this, make an SNS proposal to upgrade one of the dapp canisters to
a new wasm version.
Then, ensure that sufficiently many initial neurons (developer and airdrop
neurons) vote on the proposal so that it is adopted.
In this way, confirm that the proposal has been upgraded. 

You can learn what command to use to make an SNS proposal 'here' 
<!-- TODO: SNS quill documentation to make proposal and link to it-->
and how to vote on an SNS proposal 'here'. 
<!-- TODO: SNS quill - link to a page & paragraph that explains how to vote on SNS proposal.)-->

:::info

This step is one of the reasons why you should ensure that you can
reach and get buy in from a majority of the inital neurons. Also, these
neurons have to be able to vote on SNS proposals, which might require
them to vote on a command line tool as frontends might only show SNS
proposals after the decentralization sale.
<!-- TODO: make more precise the warning in the launch / choosing parameters part; to also specify that the initial neurons might need to vote on a CLI)-->

:::

#### 4. Remove all other controllers from the dapp canister(s)
Once you convinced yourself that the dapp canister(s) can be upgraded by
the SNS, you should remove yourself, as well as any other developers,
from the list of controllers that the dapp canister(s) have.
Note that without this, the next step will fail.

To do this, you can use the command 'here' where you specify as the principals
to be removed all existing controller principals except for the SNS root
that you have already added.
<!-- TODO:add link, should already exist in DFX-->

#### 5. Register the dapp to the SNS
Next, you will register the dapp canisters that are now controlled by the SNS
in the SNS root canister. This is to make sure that the SNS root canister
is aware of the canisters that it officially governs. 
This ensures, for example, that if you request a canister summary from the
SNS root canister, then the dapp canisters are included in this summary and 
you can learn how many cycles they still have and other information.

Registering a dapp under an SNS is again done by an SNS proposal.
To make such a proposal, you can use the following dfx command:
``` 
TODO after NNS1-1633
```  
To vote on the proposal, follow the instructions from
[Step 3](#step3)
to vote on the proposal.
As in [Step 3](#step3),
sufficient initial neurons have to vote to reach a majority.

<!-- TODO:IN CASE THIS IS NEEDED: Repeat these steps for all canisters that you would like to register.-->

#### 6. _(Recommended)_ Test upgrading the dapp canister(s) by SNS proposal.
To make sure that you can still upgrade the dapp canister(s) by SNS proposal,
you can repeat
[Step 3](#step3) 
at this point.

#### 7. Submit an NNS proposal to start the decentralization sale.
At this point, you have handed over the control of your dapp to the Internet
Computer. 
To make sure that the Internet Computer starts the SNS decentralization sale,
you can ask the NNS community to start the sale.
To do so you submit an NNS proposal as described 'here' <!-- TODO: add link -->

Note that anyone can send such a proposal, but as the original developer
of the dapp you probably want to make sure that such a proposal is set.

#### 8. Wait for the NNS to approve the sale & continue evolving the dapp! 
After the last step, there is nothing more to do for you as the orginal dapp 
developer to launch the SNS!
The dapp has been handed over to the IC and the NNS is voting on whether 
the SNS should be launched.
If the proposal is adopted, the SNS decentralization sale will be 
started with the configurations that you have defined in the
[initialization file](predeployment.md).
If the proposal is rejected, the dapp canisters' controllers are automatically set
back to the developer principals that you
have defined in the [initialization file](predeployment.md).

During this time you can further upgrade your dapp canister(s), for
example to add new features or fix bugs, by sending additional
SNS proposals as explained in
[Step 3](#step3).
You can also add new dapp canisters under the SNS control, if required, 
by additional SNS proposals as explained in
[Step 5](#5-register-the-dapp-to-the-sns).
Finally, if there are new blessed deployments of the SNS canisters, you can
upgrade the SNS canisters by an SNS proposal. 
To make such a proposal, you can use the following dfx command:
``` 
TODO 
```  









