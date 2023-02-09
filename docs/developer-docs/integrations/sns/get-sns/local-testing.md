---
sidebar_position: 2
---
# Testing SNS Locally after Choosing Parameters


After having [chosen the initial SNS parameters in a .yaml file](preparation.md)
and before requesting an SNS launch in production,
you might want to test the SNS launch locally.
You might also want to do this with different SNS parameters to compare different behaviors.

We next describe how you can test the SNS launch with your chosen parameters.
The necessary steps are very similar to the process of getting an SNS in production.
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

- [dfx](../../../setup/install/index.mdx)
- [sns-quill](https://github.com/dfinity/sns-quill)

To install an NNS locally (which is needed to obtain an SNS in the same way that you would get it in production), you have to run your local replica as a
node of a `system` subnet (as opposed to `application`, which is what all other dapps run on).
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

The most important identity you will use is the identity we call `developer-identity`.
Make sure that you can use it both with `dfx` and `sns-quill`, and that it will receive an initial developer neuron with a majority stake in the initial SNS parameters.
If it doesn't receive a majority stake, you will not be able to test the upgrade proposals during the decentralization sale.

`dfx nns install` is currently hard-coded to give a certain account ICP to test with tokens.
Because of that, make sure you also [import](/references/cli-reference/dfx-identity.md#dfx-identity-import) the following identity so you get access to those funds:

```
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEICJxApEbuZznKFpV+VKACRK30i6+7u5Z13/DOl18cIC+oAcGBSuBBAAK
oUQDQgAEPas6Iag4TUx+Uop+3NhE6s3FlayFtbwdhRVjvOar0kPTfE/N8N6btRnd
74ly5xXEBNSXiENyxhEuzOZrIWMCNQ==
-----END EC PRIVATE KEY-----
```

This identity will be referred to as the `nns-ledger-default-identity` for the rest of this guide.

#### 2. Set up an NNS in your local testing environment.
As a first step, you will bring up an NNS in your local testing environment. 
This will allow you to test the calls to NNS that are needed to request an SNS
launch.

1. Run `dfx start --clean --background`
2. Run `dfx nns install`
    1. This command will print two URLs at the end: One for the local Internet Identity and one for the local NNS dapp. Open the NNS dapp URL in your browser for later.
3. Run `dfx nns import`, which actually creates and sets up all the NNS canisters.
4. Run `dfx sns import`, which imports the NNS canisters into your dfx.json so you can easily refer to them.
5. Check that the `nns-ledger-default-identity` has ICP available.
    1. Run `dfx identity use nns-ledger-default-identity`
    2. Run `dfx ledger balance`. This should return a non-zero amount of ICP.
6. To be able to make decisions in your local testnet you will need a neuron with hefty voting power. In the real world, neuron ownership is distributed but in the testnet, if you make yourself a neuron with 500 million ICP and an 8 year dissolve delay, you will be able to vote through proposals under almost any circumstances. Make such a large neuron. We will refer to it as the `community neuron`.
    1. Log in to the NNS dapp that you opened in the browser previously. You will have to create a new Internet Identity anchor for this. On local instances the captcha is always `a`.
    2. Make sure that you have a large number of ICP in your main account; Recommended are at least 500_000_000 but less is fine if you are not planning to make lots of neurons. If you need more ICP, use the "Get ICP" menu entry.
    3. Go to the neurons tab and create a neuron. Give it a lot of ICP (e.g. 500_000_000) and an 8 year dissolve delay.
7. You will also need a small neuron to represent yourself, the developer. 5 ICP should suffice. You will also need to add your principal as a hotkey to this developer neuron.
    1. Log into the NNS dapp with a different new anchor (a private browser window or a different browser can be used to log into two different anchors at the same time).
    2. Make sure that you have at least 5 ICP in your main account; if not get more with the "Get ICP" menu entry.
    3. Go to the neurons tab and create a neuron. Give it 5 ICP and an 8 year dissolve delay.
    4. Make a note of your neuron ID. The rest of this guide will refer to it as `DEVELOPER_NEURON_ID`. The commands below assume you run `export DEVELOPER_NEURON_ID=<neuron id>` in your shell.
    5. Add one of the dfx identities as a hotkey to the neuron. This dfx identity will be referred to as `developer-identity`. To get the principal of this identity, run `dfx --identity developer-identity identity get-principal`.

#### 3. Ask the SNS wasm modules canister to install an SNS.
Make a call to the SNS wasm modules canister on the local NNS to request that an SNS is installed.
Installing the SNS has some preconditions:

1. The SNS configuration (created in the [previous step](./preparation.md)) has to be named `sns.yml` and has to be placed in your project's root directory.
2. Your [cycles wallet](../../../setup/cycles/cycles-wallet.md) has to be added to the whitelist of principals that are allowed to create SNSes. This is a temporary measure to make sure that no one launches an SNS before the code is ready. In the long-term, this condition will be removed. 
3. Your cycles wallet contains enough cycles to create an SNS. Currently, this cost is 180T cycles.

The SNS is new and may still have significant bugs.
To prevent huge numbers of projects giving control of their dapps to SNSs before the SNS has been tested in production, 
access to the SNS is limited. The decision who gets to be one of the brave first projects to launch an SNS and be added to this whitelist is decided by the NNS community by proposal.
Later, when the SNS has a solid track record in production, this whitelist will be dropped.
For local development, you can add your wallet to the whitelist using the following command and identity `developer-identity`:

``` bash
# This command assumes that you are using an unencrypted identity and that you are using the identity you want to deploy the SNS with.
$(dfx cache show)/ic-admin --secret-key-pem ~/.config/dfx/identity/$(dfx identity whoami)/identity.pem --nns-url "http://localhost:$(dfx info replica-port)" propose-to-update-sns-deploy-whitelist --added-principals "$(dfx identity get-wallet)" --proposer "$DEVELOPER_NEURON_ID" --proposal-title "Let me SNS!" --summary "I am friendly."
```

Creating an SNS currently uses up to 180T cycles, and your wallet needs to supply those.
On a local deployment, you can add any number of cycles to any canister.
To add 2345T cycles to your wallet, run the following command:

``` bash
dfx ledger fabricate-cycles --canister $(dfx identity get-wallet) --t 2345
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

#### 4. Remove all controllers other than the SNS from the dapp canister(s)
Remove yourself, as well as any other developers, from the list of controllers that the dapp canister(s) have and add the SNS root canister as their controllers.
Note that without this, the next step will fail.

Using the identity `developer-identity`, run this command for every canister that is part of your dapp:

```bash
dfx canister update-settings --set-controller $(dfx canister id sns_root) <canister name>
```

After that, your canisters' controller should only be the sns_root canister, and nothing else.
You can check this with the command `dfx canister info <canister name>`.

#### 5. Register the dapp in the SNS
Next, you will register the dapp canister(s) that are now controlled by the SNS
in the SNS root canister. This is to make sure that the SNS root canister
is aware of the canisters that it officially governs and accepts the responsibility
to control them going forward.
This ensures, for example, that if you request a canister summary from the
SNS root canister, then the dapp canisters are included in this summary and
you can learn how many cycles they still have and other information.

Registering a dapp under an SNS is done by an SNS proposal.
To test this, make an SNS proposal to register your dapp canister(s).
To submit an SNS proposal, use your `developer-identity` identity and use the following command for each canister:

``` bash
dfx canister call sns_root register_dapp_canister "(record {canister_id = opt principal \"$(dfx canister id <CANISTER NAME>)\" } )"
```

After registering your canisters you can check if everything worked with the following command:

``` bash
sns-quill --canister-ids-file ./canister_ids.json --pem-file ~/.config/dfx/identity/$(dfx identity whoami)/identity.pem status
```

:::info
In production this is one of the reasons
why you must ensure that you can reach a majority of the initial neurons and that the initial
neurons are able to vote already before the decentralization sale.
:::

#### 6. Test upgrading the dapp canister(s) by SNS proposal. 
At this point, the dapp canister(s) are under control of the SNS.
You might want to test that already at this stage, before the decentralization sale,
it is still possible to upgrade the dapp.
To test this, make an SNS proposal to upgrade one of the dapp canisters to
a new wasm version.
Then, ensure that sufficiently many initial neurons (developer and airdrop
neurons) vote on the proposal so that it is adopted.
Then, confirm that the proposal has been executed by checking that the dapp has been
upgraded.

To submit an SNS proposal to upgrade a dapp canister, use `sns-quill` with your `developer-identity` identity
and learn what command to use [here](https://github.com/dfinity/sns-quill#submit-a-proposal).
To vote on an SNS proposal use your `sns-quill` principal `identityDevNeuron`
and use the command explained [here](https://github.com/dfinity/sns-quill#vote-on-a-proposal).

The base command structure to make an upgrade-canister proposal looks like this:

``` bash
sns-quill --canister-ids-file <PATH-TO-CANISTER-IDS-OF-SNS> --pem-file <PATH-TO-PEM-FILE> make-upgrade-canister-proposal --summary "<SUMMARY>" --title "<TITLE>" --url "<URL>" --target-canister-id <TARGET-DAPP-CONTROLLED-BY-SNS> --wasm-path <PATH-TO-WASM-FILE> <HEX-NEURON-ID> > msg.json && sns-quill send msg.json
```

Filling in as much as possible, the command will look like this:

``` bash
sns-quill --canister-ids-file .dfx/local/canister_ids.json --pem-file ~/.config/dfx/identity/$(dfx identity whoami)/identity.pem make-upgrade-canister-proposal --summary "<SUMMARY>" --title "<TITLE>" --url "<URL>" --target-canister-id <TARGET-DAPP-CONTROLLED-BY-SNS> --wasm-path .dfx/local/canisters/<CANISTER NAME>/<CANISTER NAME>.wasm $DEVELOPER_NEURON_ID > msg.json && sns-quill send msg.json
```

#### 7. Submit an NNS proposal to start the decentralization sale.
Note that in production at this point your dapp's control is handed over to the IC and everyone can make the following proposal.

To create the proposal template, run `$(dfx cache show)/sns dsale create`.
This will create a file called `dsale.yml`. Edit the file with your preferred parameters.
As with the sns config, you can perform a basic sanity check of the parameters with:

``` bash
"$(dfx cache show)/sns" dsale validate
```

Now you can propose the decentralisation sale:

``` bash
"$(dfx cache show)/sns" dsale propose
```

In the NNS dapp UI, go to the launchpad. There, you should see the proposal.
You may need to refresh the page until it shows up.

#### 8. Adopt / reject the NNS proposal
You probably want to test both the case where the NNS proposal is adopted and where it is rejected
in two different test runs. 
To do so, vote on the NNS proposal and ensure that you reach a majority for yes or no votes.
As you have a huge neuron - your private network is not decentralized - your vote with the `community neuron` should be enough to pass the proposal.
If you watch the top of the proposal's status in the NNS dapp UI, it should change to "Executed" after no more than 30 seconds.

Check the state of the canister that implements the decentralization sale, called the swap canister:

``` bash
dfx canister call sns_swap get_state '(record {})'
```

If the proposal is adopted, the SNS decentralization sale will be
started with the configurations that you have defined in the
[initialization file](preparation.md).
If the proposal is rejected, the dapp canisters' controllers are automatically set
back to the developer principals that you
have defined in the [initialization](preparation.md).

#### 9. Test sale participation
After the sale has been started by the NNS, test that you can participate in the sale as expected.
Return to the launchpad section in the NNS dapp and hit refresh.
You should now see the SNS move into the "Current Launches" section.
If you click on it, you will be able to read details about the project.

Note the sale start time. Wait until then, then hit refresh. You should now see an interface to buy SNS tokens.
Buy some tokens. The sale will be complete when either the maximum investment has been reached or the sale end time is reached.
If you use the default SNS configuration you can buy all 50 ICP.
This is convenient for testing but in a real SNS you may wish to limit the stake so that no investor has excessive influence over the project.

You can then check the neurons of the SNS:

``` bash
dfx canister call sns_governance list_neurons '(record {limit= 20})'
```

#### 10. Repeatedly test upgrading the dapp canister(s) and adding more canisters.
You might want to repeatedly test that you can upgrade the dapp at all stages.
As already explained in [Step 6](#6-test-upgrading-the-dapp-canisters-by-sns-proposal),
you might want to test this before the decentralization sale and you might also want to test this
during and after the decentralization sale.
To do so, you can repeat the instructions from
[Step 6](#6-test-upgrading-the-dapp-canisters-by-sns-proposal).

You can also test adding new dapp canisters under the SNS control at different stages
by additional SNS proposals as explained in [Step 5](#5-register-the-dapp-in-the-sns).

#### 11. Test launched SNS.
If the sale has been successful, you can test if the SNS is now fully functional.
For example, if some initial neurons were set up with dissolve delay zero, you can dissolve them.
You can do that in the NNS dapp.

Also, you may now test other SNS proposal types that did not work while the SNS was still
in pre-decentralization-sale mode.
For example, you could make a proposal to set the minimum neuron stake like this:

``` bash
$ sns-quill --pem-file ~/.config/dfx/identity/$(dfx identity whoami)/identity.pem --canister-ids-file canister_ids.json make-proposal $DEVELOPER_NEURON_ID --proposal '(record { title="Smaller minimal neuron stake limit"; url=""; summary="update minimum neuron stake limit"; action=opt variant{ NervousSystemParameters=record{neuron_minimum_stake_e8s=opt 100000 : opt nat64; } }})'
```

#### 12. Test user experience.
In all different stages, you should also test the user experience, e.g., how the users would
interact with the SNS and NNS to complete the different steps and also how they can
interact with the SNS after it has been successfully launched.
In particular, if you 
chose to integrate some of the SNS or NNS functionality in your dapp frontend,
you should test this user experience. 
As already suggested in some steps, you might also want to test what the interaction would look like on the NNS frontend dapp.

