# Getting an SNS in production
This describes the detailed steps for getting an SNS on
the Internet Computer.

:::caution

In the following steps we assume that you have already
[collected the developer and airdrop principals](preparation.md/#principals)
and [chosen the initial SNS parameters in a .yaml file](preparation.md).
We assume that you control one principal `identityDevNeuron` that owns a developer neuron.
Moreover, you control one principal `identityDevDfx` that is a `dfx` identity and 
a controller of the dapp canister(s) that you would like to hand over to the SNS.
We also recommend that before following these steps and requesting an SNS launch
in production, you have [tested the SNS](local-testing.md).

:::


You are now ready to get an SNS for your dapp.
There are some steps that are needed for completing this and some steps that we
recommend as intermediate sanity checks that up to this point everything works fine.
We mark the latter by the keyword _(Recommended)_.

#### 1. Prepare your principals and tools

<!-- TODO-content & TODO-CLI/dfx: 
Open terminal with dfx, ready for commands when we say "use `dfx` identity 
`identityDevDeploy`.
For things to do with `sns-quill` will say "use `sns-quill` principal `identityDevNeuron`"
We recommend that message are signed on air-gapped computer and sent to IC
on connected computer. 
To follow this recommendation, should open one terminal on
air-gapped computer and have another one to just forward sns-quill commands
on the connected computer.
-->

#### 2. Ask the SNS wasm modules canister to install an SNS.
Make a call to the SNS wasm modules canister on the NNS subnet to requrest that an SNS 
is installed.
To make this call, use your `dfx` identity `identityDevDfx` and 
the command as described 'here'. <!--TODO-CLI/dfx-Link: -->
Upon receiving this call, the SNS wasm modules canister will install
an SNS with your chosen initial parameters.
<!--TODO-CLI/dfx-Link: once tooling is clear, make sure that here automatically the .yaml
file is used. If this is not the case, add the information how this can be ensured.-->

#### 3. Add the SNS root canister as a controller to your dapp canister(s).
To do so, use your `dfx` identity `identityDevDfx` and 
the command described 'here'.
<!-- TODO: add this to CLI/dfx tool as need to learn SNS canisters -->


#### 4. _(Recommended)_ Test upgrading the dapp canister(s) by SNS proposal. _{#step4}_
To test this, make an SNS proposal to upgrade one of the dapp canisters to
a new wasm version.
Then, ensure that sufficiently many initial neurons (developer and airdrop
neurons) vote on the proposal so that it is adopted.
Then, confirm that the proposal has been executed by checking that the dapp has been
upgraded. 

To submit an SNS proposal, use your `sns-quill` principal `identityDevNeuron`
and learn what command to use [here](https://github.com/dfinity/sns-quill#submit-a-proposal).

<!-- TODO: SNS quill documentation to make proposal and link to it -->

To vote on an SNS proposal use your `sns-quill` principal `identityDevNeuron`
and use the command explained [here](https://github.com/dfinity/sns-quill#vote-on-a-proposal).

:::info

This step is one of the reasons why you should ensure that you can
reach a majority of the initial neurons. Also, as we 
recommend `sns-quill` principals for initial neurons and as they have to be
able to vote on SNS proposals even before the decentralization sales,
this requires that initial neuron holders are comfortable
using a command line tool for voting.

:::

#### 5. Remove all controllers other than the SNS from the dapp canister(s)
Once you convinced yourself that the dapp canister(s) can be upgraded by
the SNS, you should remove yourself, as well as any other developers,
from the list of controllers that the dapp canister(s) have.
Note that without this, the next step will fail.

To do this, use your `dfx` identity `identityDevDfx` and the command 'here'
where you specify as the principals to be removed all existing controller principals
except for the SNS root that you have already added.
<!--TODO-CLI/dfx-Link: should already exist in DFX -->

#### 6. Register the dapp in the SNS
Next, you will register the dapp canister(s) that are now controlled by the SNS
in the SNS root canister. This is to make sure that the SNS root canister
is aware of the canisters that it officially governs and accepts the responsibility
to control them going forward. 
This ensures, for example, that if you request a canister summary from the
SNS root canister, then the dapp canisters are included in this summary and 
you can learn how many cycles they still have and other information.

Registering a dapp under an SNS is done by an SNS proposal.
To make such a proposal and vote on it, use your `sns-quill` principal
`identityDevNeuron` and follow the instructions from [Step 4](#step4).
As in [Step 4](#step4),
sufficient initial neurons have to vote to reach a majority.

#### 7. _(Recommended)_ Test upgrading the dapp canister(s) by SNS proposal.
To make sure that you can still upgrade the dapp canister(s) by SNS proposal,
you can repeat [Step 4](#step4) at this point.

#### 8. Submit an NNS proposal to start the decentralization sale.
At this point, you have handed over the control of your dapp to the Internet
Computer. 
For the Internet Computer to start the SNS decentralization sale,
anyone with an eligible NNS neuron can now submit an NNS proposal
that asks the NNS community to do so.
To submit an NNS proposal with dfx, they can use the following command
```
<!--TODO-code: -->
```
Note that anyone can send such a proposal, but as the original developer
of the dapp you probably want to make sure that such a proposal is submitted.
<!--TODO-update-after-change: Add here CF explanation once it is clear.-->

#### 9. Wait for the NNS to launch the SNS & continue evolving the dapp! 
After the last step, there is nothing more to do for you as the original dapp 
developer to finalize the SNS launch!
The dapp has been handed over to the IC and the NNS is voting on whether 
the SNS should be launched.
If the proposal is adopted, the SNS decentralization sale will be 
started with the configurations that you have defined in the
[initialization file](preparation.md).
If the proposal is rejected, the dapp canisters' controllers are automatically set
back to the developer principals that you
have defined in the [initialization file](preparation.md).

During this time you can further upgrade your dapp canister(s), for
example to add new features or fix bugs, by sending additional
SNS proposals as explained in
[Step 4](#step4).
You can also add new dapp canisters under the SNS control, if required, 
by additional SNS proposals as explained in
[Step 6](#6-register-the-dapp-in-the-sns).
Finally, if there are new blessed deployments of the SNS canisters, you can
upgrade the SNS canisters by an SNS proposal. 
To make such a proposal, you can use the following dfx command:
``` 
<!--TODO-code: --> 
```  
