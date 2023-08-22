---
sidebar_position: 2
---
# Testing SNS locally

## Overview

To help developers, DFINITY has created the `sns-testing` repo which has scripts that help developers test the SNS process. Developers can run a local version of the Internet Computer on their local machine, deploy their dapp locally and run through [the stages](../launching/launch-summary.md) of decentralizing their dapp. 

After having [chosen the initial SNS parameters in a .yaml file](../tokenomics/preparation.md) and before requesting an SNS launch in production, the SNS launch should be tested locally.

**The main intent of `sns-testing` repo is for a developer to test the actual process of decentralizing their dapp.**

Among other things, developers can use `sns-testing` repo to: 
* Initiate proposals.
* Pass proposals.
* Start decentralization swaps.
* Upgrade dapp via DAO voting.

:::info
`sns-testing` is just one form of testing SNS process locally. Developers should feel free to use others, fork/modify `sns-testing` or create their own.
:::

## Using the `sns-testing` repo

These scripts have been most tested with a stack that looks like this:

* A single canister that is being decentralized.
* A canister that can be deployed to local replica via `dfx deploy`.

## Testing via `sns-testing` repo

:::info
To use the `sns-testing` commands and their arguments properly, please consult the `sns-testing` [README](https://github.com/dfinity/sns-testing#sns-lifecycle).
:::


### Testing stages of the SNS launch process

For simplicity, we next map the stages introduced in the [SNS launch stages documentation](../launching/launch-summary-1proposal.md) and in the documentation [Commands & actions to go through SNS launch](../launching/launch-steps-1proposal.md) to the relevant scripts in the `sns-testing` repo so you can learn what part of the launch is tested in which script.
Note that some developers have dapps that do not match the narrow cases of `sns-testing` so the table also includes a column for what other developers have experienced.

<table border="1">
    <tr>
        <th>Stage Number</th>
        <th>Stage</th>
        <th>Example in `sns-testing`</th>
        <th>Notes</th>
    </tr>
    <tr>
        <td>0</td>
        <td>Developers deploy a dapp to the Internet Computer</td>
        <td>[./deploy_test_canister.sh](https://github.com/dfinity/sns-testing/blob/main/deploy_test_canister.sh)</td>
        <td>Custom scripts used to deploy dapps (e.g. multi-canister dapps, use nix, etc...)</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Dapp developers choose the initial parameters of the SNS for a dapp</td>
        <td>[example_sns_init.yaml](https://github.com/dfinity/sns-testing/blob/main/example_sns_init.yaml)</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Dapp developers add NNS root as co-controller of dapp</td>
        <td>[./let_nns_control_dapp.sh](https://github.com/dfinity/sns-testing/blob/main/let_nns_control_dapp.sh)</td>
        <td><code></code></td>
    </tr>
    <tr>
        <td>3</td>
        <td>Submit NNS proposal to create SNS</td>
        <td rowspan="1">[./propose_sns.sh](https://github.com/dfinity/sns-testing/blob/main/propose_sns.sh)</td>
    </tr>
    <tr>
        <td>4</td>
        <td>The NNS proposal is decided</td>
        <td rowspan="5"><code>(No commands required)</code></td>
        <td rowspan="5"><code> </code></td>
    </tr>
    <tr>
        <td>5</td>
        <td>(Automated) SNS-W deploys SNS canisters</td>
    </tr>
        <tr>
        <td>6</td>
        <td>(Automated) SNS-W sets SNS root as sole controller of dapp</td>
    </tr>
    <tr>
        <td>7</td>
        <td>(Automated) SNS-W initializes SNS canisters according to settings from Step 1</td>
    </tr>
    <tr>
        <td>8</td>
        <td>(Automated) SNS swap starts</td>
    </tr>
    <tr>
        <td> </td>
        <td>Users participate in the swap</td>
        <td rowspan="1">[./participate_in_sns_swap.sh](https://github.com/dfinity/sns-testing/blob/main/participate_sns_swap.sh)</td>
        <td rowspan="1"></td>
    </tr>
    <tr>
        <td>9</td>
        <td>(Automated) SNS swap ends</td>
        <td rowspan="2"><code>(No commands required)</code></td>
    </tr>
    <tr>
        <td>10</td>
        <td>(Automated) SNS swap finalizes</td>
    </tr>
</table>

### Testing the upgrading and managing of an SNS

Once a canister or dapp has been handed over to an SNS, it will be updated via proposals and voting. Developers can test this flow by [using commands from `sns-testing`](https://github.com/dfinity/sns-testing#sns-lifecycle).


<table border="1">
    <tr>
        <th>Action</th>
        <th>Example in `sns-testing`</th>
    </tr>
    <tr>
        <td>Upgrade a yet-to-be-decentralized canister by submitting an SNS proposal that can be voted on using the SNS developer neuron.</td>
        <td>[./upgrade_test_canister.sh](https://github.com/dfinity/sns-testing/blob/main/upgrade_test_canister.sh)</td>
    </tr>
    <tr>
        <td>Submit proposal to upgrade a decentralized canister</td>
        <td>[./upgrade_test_canister.sh](https://github.com/dfinity/sns-testing/blob/main/upgrade_test_canister.sh)</td>
    </tr>
     <tr>
        <td>Vote on a proposal that upgrades a decentralized canister</td>
        <td>[./vote_on_sns_proposal.sh](https://github.com/dfinity/sns-testing/blob/main/vote_on_sns_proposal.sh)</td>
    </tr>
</table>

You might also want to test integrations and basic SNS functionality. 
For this purpose you can use the above instructions after the test SNS is 
launched or use the [SNS testflight on mainnet](testing-on-mainnet.md).