# Testing SNS Locally after Choosing Parameters


After having
[chosen the initial SNS parameters in a .yaml file](preparation.md)
and before requesting an SNS launch in production,
you might want to test the SNS launch locally.
You might also want to do this with different SNS parameters to compare different behaviors.

We next describe how you can test the SNS launch with your chosen parameters.
The necessary steps are very similar to the [process of getting an SNS
in production](get-sns-production.md).
The main difference is that you will first bring up an NNS in your local testing
environment to then be able to test the process as closely as possible to the
process in production.

#### 1. Prepare your principals and tools

<!-- TODO-content & TODO-CLI/dfx: 
Open terminal with dfx, ready for commands when we say "use `dfx` identity 
`identityDevDfx`.
For things to do with `sns-quill` will say "use `sns-quill` principal `identityDevNeuron`"
For production, we recommend that message are signed on air-gapped computer and
sent to IC on connected computer. For testing this does not matter that much.
But in that case, we recommend that you use a different principal for testing and
in production (to protect the relevant key).

Might want to set up fake principals for some testing rounds as you want to reach majority in
voting decisions.

Set up NNS in such a way that can vote through proposals. Maybe one huge neuron `identityMajority`?
Have principal w/ NNS neuron NNS identity `identityNNS`.
-->

#### 2. Install an NNS on your local testing environment.
As a first step, you will bring up an NNS in your local testing environment. 
This will allow you to test the calls to NNS that are needed to request an SNS
launch.
To do so, use your `dfx` identity `identityDevDfx` and
the command as described 'here'. <!--TODO-CLI/dfx-Link: -->

<!--TODO-CLI/dfx: After we have the dfx tool, clarify whether there are other
steps needed here! -->

#### 3. Ask the SNS wasm modules canister to install an SNS.
Make a call to the SNS wasm modules canister on the local NNS 
to request that an SNS is installed.
To make this call, use your `dfx` identity `identityDevDfx` and
the command as described 'here'. <!--TODO-CLI/dfx-Link: -->
Upon receiving this call, the SNS wasm modules canister will install
an SNS with your chosen initial parameters.
<!--TODO-CLI/dfx-Link: once tooling is clear, make sure that here automatically
the .yaml file is used. If this is not the case, add the information how this 
can be ensured.-->

#### 4. Add the SNS root canister as a controller to your dapp canister(s).
To do so, use your `dfx` identity `identityDevDfx` and
the command described 'here'.
<!-- TODO: add this to CLI/dfx tool as need to learn SNS canisters -->

#### 5. Remove all controllers other than the SNS from the dapp canister(s)
Remove yourself, as well as any other developers,
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
To test this, make an SNS proposal to register your dapp canister(s).
Then, vote with sufficiently many initial neurons (developer and airdrop
neurons) vote on the proposal so that it is adopted.

To submit an SNS proposal, use your `sns-quill` principal `identityDevNeuron`
and learn what command to use [here](https://github.com/dfinity/sns-quill#submit-a-proposal).
To vote on an SNS proposal use your `sns-quill` principal `identityDevNeuron`
and use the command explained [here](https://github.com/dfinity/sns-quill#vote-on-a-proposal).
<!-- TODO: SNS quill documentation to make proposal and link to it-->

:::info
As explained [on the next page](get-sns-production.md), in production this is one of the reasons
why you must ensure that you can reach a majority of the initial neurons and that the initial
neurons are able to vote already before the decentralization sale.
:::

### 7. Test upgrading the dapp canister(s) by SNS proposal. 
At this point, the dapp canister(s) are under control of the SNS.
You might want to test that already at this stage, before the decentralization sale,
it is still possible to upgrade the dapp.
To test this, make an SNS proposal to upgrade one of the dapp canisters to
a new wasm version.
Then, ensure that sufficiently many initial neurons (developer and airdrop
neurons) vote on the proposal so that it is adopted.
Then, confirm that the proposal has been executed by checking that the dapp has been
upgraded.

To submit an SNS proposal to upgrade a dapp canister,
use your `sns-quill` principal `identityDevNeuron`
and learn what command to use [here](https://github.com/dfinity/sns-quill#submit-a-proposal).
To vote on an SNS proposal use your `sns-quill` principal `identityDevNeuron`
and use the command explained [here](https://github.com/dfinity/sns-quill#vote-on-a-proposal).
<!-- TODO: SNS quill documentation to make proposal and link to it-->


#### 8. Submit an NNS proposal to start the decentralization sale.
Note that in production at this point your dapp's control is handed over to the IC and everyone
can make the following proposal.
For testing this, submit an NNS proposal using your NNS identity `identityNNS`
and the following command
```
<!--TODO-code: --> 
``` 
#### 9. Adopt / reject the NNS proposal
You probably want to test both the case where the NNS proposal is adopted and where it is rejected
in two different test runs. 
To do so, vote on the NNS proposal and ensure that you reach a majority for yes or no votes
<!-- e.g., with `identityMajority` -->

If the proposal is adopted, the SNS decentralization sale will be
started with the configurations that you have defined in the
[initialization file](preparation.md).
If the proposal is rejected, the dapp canisters' controllers are automatically set
back to the developer principals that you
have defined in the [initialization file](preparation.md).

#### 10. Repeatedly test upgrading the dapp canister(s) and adding more canisters.
You might want to repeatedly test that you can upgrade the dapp at all stages.
As already explained in [Step7](#7-test-upgrading-the-dapp-canisters-by-sns-proposal),
you might want to test this before the decentralization sale and you might also want to test this
during and after the decentralization sale.
To do so, you can repeat the instructions from
[Step 7](#7-test-upgrading-the-dapp-canisters-by-sns-proposal).

You can also test adding new dapp canisters under the SNS control at different stages,
by additional SNS proposals as explained in [Step 6](#6-register-the-dapp-in-the-sns).

#### 11. Test launched SNS.
If the sale has been successful, you can test if the SNS is now fully functional.
For example, if some initial neurons were set up with dissolve delay zero, you can dissolve them.
To do so, use your `sns-quill` principal `identityDevNeuron`
and learn what command to use `here` <!-- TODO: SNS quill documentation to use this neuron mnmt
command.-->

Also, you may now test other SNS proposal types that did not work while the SNS was still
in pre-decentralization-sale mode.
For example, you can submit and vote for a proposal to change some of the SNS parameters
by following the instructions in [Step](#7-test-upgrading-the-dapp-canisters-by-sns-proposal).

#### 12. Test user-experience.
In all different stages, you should also test the user experience, e.g., how the users would
interact with the SNS and NNS to complete the different steps and also how they can
interact with the SNS after it has been successfully launched.
In particular, if you [chose to integrate some of the SNS or NNS functionality in your dapp
frontend](frontend-integration.md), you should test this user experience. 
You might also want to test what the interaction would look like on the NNS frontend dapp.
<!-- TODO: Add explanation if this comes for free in the new testing env. or if you need
to do something extra to test this.-->

<!--TODO-code: Would be good to test, but I think would require a dfx call to add new wasm
to SNS-W, otherwise this is complicated?
#### 10. Repeatedly test upgrading the SNS canister(s)
Finally, if there are new blessed deployments of the SNS canisters, you can
upgrade the SNS canisters by an SNS proposal.
To make such a proposal, you can use the following dfx command:
-->

