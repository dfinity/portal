<!--# Testing SNS Locally after Choosing Parameters-->


After having
[chosen the initial SNS parameters in a .yaml file](preparation.md)
and before requesting an SNS launch in production,
you might want to test the SNS launch locally.
You might also want to do this with different SNS parameters to compare different behaviors.

We next describe how you can test the SNS launch with your chosen parameters.
The necessary steps are very similar to the [process of getting an SNS in production](get-sns-production.md).
The main difference is that you will first bring up an NNS in your local testing
environment to then be able to test the process as closely as possible to the
process in production.

:::warning
This guide is very new and many parts of both the guide and the tools are still getting updated. It is likely to contain some errors.
If you run into any problems, please report them over at [portal](https://github.com/dfinity/portal/issues)
or propose a fix directly through the `edit this page` link at the very bottom of the page.
:::

#### 1. Prepare your principals and tools

To deploy and test a local SNS, you will need the following tools:

- [dfx](../../../build/install-upgrade-remove.mdx)
- [sns-quill](https://github.com/dfinity/sns-quill)

To install an NNS locally (which is needed to obtain an SNS), you have to run your local replica as a
node in of a `system` subnet (as opposed to `application`, which is what all other dapps run as).
To set your local replica to subnet type `system`, add the following definition to your `networks.json`:

``` json
{
  "local": {
      "bind": "127.0.0.1:8080",
      "type": "ephemeral",
      "replica": {
        "subnet_type": "system"
      }
    }
}
```
If you are unsure where `networks.json` is located, `dfx info networks-json-path` will tell you.

To test the whole process properly, you also need a handful of identities.
For local testing, we recommend you use unencrypted/plaintext .pem files to make everything a little bit easier.
To do so, use the `--disable-encryption` flag when importing/creating an identity in dfx.
`dfx nns install` is currently hard-coded to give a certain account ICP to start.
Because of that, make sure you also include this identity in your testing identities so you get access to those funds:
```
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEICJxApEbuZznKFpV+VKACRK30i6+7u5Z13/DOl18cIC+oAcGBSuBBAAK
oUQDQgAEPas6Iag4TUx+Uop+3NhE6s3FlayFtbwdhRVjvOar0kPTfE/N8N6btRnd
74ly5xXEBNSXiENyxhEuzOZrIWMCNQ==
-----END EC PRIVATE KEY-----
```
This identity will be referred to as the `nns-ledger-default-identity` for the rest of this guide.

#### 2. Set up an NNS on your local testing environment.
As a first step, you will bring up an NNS in your local testing environment. 
This will allow you to test the calls to NNS that are needed to request an SNS
launch.

1. Run `dfx start --clean --background`
2. Run `dfx nns install`
    1. This command will print two URLs at the end: One for local Internet Identity and one for the local NNS dapp. Open the NNS dapp one in your browser for later.
3. Run `dfx nns import`
4. Run `dfx sns import`
5. Check that the `nns-ledger-default-identity` has ICP available.
    1. Run `dfx identity use nns-ledger-default-identity` (or substitute the identity name with whatever name you decided to use for the pem file above)
    2. Run `dfx ledger balance`. This should return a non-zero amount of ICP.
6. To be able to make decisions in your local testnet you will need a neuron with hefty voting power. In the real world, neuron ownership is distributed but in the testnet, if you make yourself a neuron with 500 million ICP and an 8 year dissolve delay you will be able to vote through proposals under almost any circumstances. Make such a large neuron. We will refer to it as the community neuron.
    1. Log in to the NNS dapp that you opened in the browser previously. You will have to create a new anchor for this. On local instances the captcha is always `a`.
    2. Make sure that you have a large number of ICP in your main account; Recommended are at least 500_000_000 but less is fine if you are not planning to make lots of neurons. If you need more ICP, use the "Get ICP" menu entry.
    3. Go to the neurons tab and create a neuron. Give it a lot of ICP (e.g. 500_000_000) and an 8 year dissolve delay.
7. You will also need a small neuron to represent yourself, the developer. 5 ICP should suffice. You will also need to add your principal as a hotkey to this developer neuron.
    1. Log into the NNS dapp with a different new anchor (a private browser window or a different browser can be used to log into two different anchors at the same time).
    2. Make sure that you have at least 5 ICP in your main account; if not get more with the "Get ICP" menu entry.
    3. Go to the neurons tab and create a neuron. Give it 5 ICP and an 8 year dissolve delay.
    4. Make a note of your neuron ID. The rest of this guide will refer to it as `DEVELOPER_NEURON_ID`.
    5. Add one of the dfx identities as a hotkey to the neuron. This dfx identity will be referred to as `developer-identity`. To get the principal of this identity, run `dfx --identity developer-identity identity get-principal`.


#### 3. Ask the SNS wasm modules canister to install an SNS.
Make a call to the SNS wasm modules canister on the local NNS to request that an SNS is installed.
Installing the SNS has some preconditions:

1. The SNS configuration (created in the [previous step](./preparation.md)) has to be named `sns.yml`.
2. Your wallet has to be added to the whitelist of principals that are allowed to create SNSes.
3. Your wallet contains enough cycles to create an SNS.

The SNS is new and may still have significant bugs.
To prevent huge numbers of developers giving control of their dapps to SNSs before the SNS has been tested in production, 
access to the SNS is limited. Who gets to be one of the brave first developers is decided by the community by proposal.
Later, when the SNS has a solid track record in production, this whitelist will be dropped.
For local development, you can add your wallet to the whitelist using the following command:

``` bash
# This command assumes that you are using an unencrypted identity and that you are using the identity you want to deploy the SNS with.
$(dfx cache show)/ic-admin --secret-key-pem ~/.config/dfx/identity/$(dfx identity whoami)/identity.pem --nns-url "https://localhost:$(dfx info replica-port)" propose-to-update-sns-deploy-whitelist --added-principals "$(dfx identity get-wallet)" --proposer "$DEVELOPER_NEURON_ID" --proposal-title "Let me SNS!" --summary "I am friendly."
```

Creating an SNS currently costs 50T cycles, and your wallet needs to supply those.
On a local deployment, you can add any number of cycles to any canister.
To add, say, 145T cycles to your wallet, run the following command:

``` bash
dfx ledger fabricate-cycles --canister $(dfx identity get-wallet) --t 145
```

And to check the new balance, run `dfx wallet balance`.

Now that everything is set up, you can deploy the sns using `dfx sns deploy`.
This will deploy the SNS and print some canister IDs.
Add the printed canister IDs manually to the file `.dfx/local/canister_ids.json`.
Then make sure you can access them with:

```bash
dfx canister id sns_root
dfx canister id sns_governance
dfx canister id sns_ledger
dfx canister id sns_swap
```

And to see how many cycles the deployment cost, run `dfx wallet balance` again.

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

#### 7. Test upgrading the dapp canister(s) by SNS proposal. 
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

#### 10. Test sale participation
After the sale has been started by the NNS, test that you can participate in the sale
as expected.
To do so, use your `sns-quill` principal `identityDevNeuron`
and learn what command to use `here` <!-- TODO: SNS quill must allow sale participation.-->

To finish the sale and proceed with other testing, you can either wait for the sale 
deadline to exceed or you can participate in the sale repeatedly until you hit the
maximum ICP that the sale accepts.

#### 11. Repeatedly test upgrading the dapp canister(s) and adding more canisters.
You might want to repeatedly test that you can upgrade the dapp at all stages.
As already explained in [Step7](#7-test-upgrading-the-dapp-canisters-by-sns-proposal),
you might want to test this before the decentralization sale and you might also want to test this
during and after the decentralization sale.
To do so, you can repeat the instructions from
[Step 7](#7-test-upgrading-the-dapp-canisters-by-sns-proposal).

You can also test adding new dapp canisters under the SNS control at different stages,
by additional SNS proposals as explained in [Step 6](#6-register-the-dapp-in-the-sns).

#### 12. Test launched SNS.
If the sale has been successful, you can test if the SNS is now fully functional.
For example, if some initial neurons were set up with dissolve delay zero, you can dissolve them.
To do so, use your `sns-quill` principal `identityDevNeuron`
and learn what command to use `here` <!-- TODO: SNS quill documentation to use this neuron mnmt
command.-->

Also, you may now test other SNS proposal types that did not work while the SNS was still
in pre-decentralization-sale mode.
For example, you can submit and vote for a proposal to change some of the SNS parameters
by following the instructions in [Step](#7-test-upgrading-the-dapp-canisters-by-sns-proposal).

#### 13. Test user-experience.
In all different stages, you should also test the user experience, e.g., how the users would
interact with the SNS and NNS to complete the different steps and also how they can
interact with the SNS after it has been successfully launched.
In particular, if you [chose to integrate some of the SNS or NNS functionality in your dapp
frontend](../integrate-sns/frontend-integration.md), you should test this user experience. 
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

