---
sidebar_position: 2
---
# Testing SNS locally

## Overview

To help developers, DFINITY has created the [sns-testing repo](https://github.com/dfinity/sns-testing) which has scripts that help developers test the SNS process. Developers can run a local version of the Internet Computer on their local machine, deploy their dapp locally and run through [the stages](../launching/launch-summary.md) of decentralizing their dapp. 

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
To use the `sns-testing` commands and their arguments properly, please consult the `sns-testing` [README](https://github.com/dfinity/sns-testing#sns-lifecycle).

:::info
If you have started using `sns-testing` before August 2023 and are using the old legacy flow of launching an SNS (please see [here](../launching/index.md) for more context), please continue your work with the legacy documentation on [this old README](https://github.com/dfinity/sns-testing/blob/v1-legacy/README.md). In particular, 
* If you were following the Apple silicon-only instructions, please switch to the `v1-legacy` Git tag.
* If you were using the Docker-based deployment approach, please use the docker image: `docker pull ghcr.io/dfinity/sns-testing:v1-legacy`.

:::

### Testing stages of the SNS launch process

For simplicity, next we map the stages introduced in the [SNS launch stages documentation](../launching/launch-summary-1proposal.md) and in the documentation [commands and actions to go through SNS launch](../launching/launch-steps-1proposal.md) to the relevant scripts in the `sns-testing` repo so you can learn what part of the launch is tested in which script.
Note that some developers have dapps that do not match the narrow cases of `sns-testing` so the table also includes a column for what other developers have experienced.

## Stages

### 1. Dapp developers choose the initial parameters of the SNS for a dapp.

Typically, dapp developers choose initial parameters that will be used in subsequent proposals.


### 2. Dapp developers add NNS root as co-controller of dapp.

They can do so by running the following command:

```bash
TBD
```

### 3. Submit NNS proposal to create SNS.

Anyone who owns an eligible NNS neuron with enough stake can submit an NNS proposal to create an SNS for a given dapp.
Of course it is crucial to set the right parameters in this proposal.
You can also find an example of how this command is used [here](https://github.com/dfinity/sns-testing/blob/main/propose_sns.sh).

:::info
Note that there can only be one such proposal at a time in the NNS. This means that the time when this proposal can be submitted might depend on other SNS' launch.
:::

To create such a proposal, a common path is to use `sns-cli` and run the following:

```bash
TBD
```

### 4. The NNS proposal is decided.

Nothing technical for dapp developers to do. Community votes.


### 5. (Automated) SNS-W deploys SNS canisters.

Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 6. (Automated) SNS-W sets SNS root as sole controller of dapp.

Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 7. (Automated) SNS-W initializes SNS canisters according to settings from Step 1.

Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 8. (Automated) SNS swap starts.

Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 9. (Automated) SNS swap ends.

Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 10. (Automated) SNS swap finalizes.

Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.


## OLD

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
        <td><code>./deploy_test_canister.sh</code></td>
        <td>Custom scripts used to deploy dapps (e.g. multi-canister dapps, use nix, etc...)</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Dapp developers choose the initial parameters of the SNS for a dapp</td>
        <td><code>example_sns_init.yaml</code></td>
    </tr>
    <tr>
        <td>2</td>
        <td>Dapp developers add NNS root as co-controller of dapp</td>
        <td><code>./let_nns_control_dapp.sh</code></td>
        <td><code></code></td>
    </tr>
    <tr>
        <td>3</td>
        <td>Submit NNS proposal to create SNS</td>
        <td rowspan="1"><code>./propose_sns.sh</code></td>
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
        <td rowspan="1"><code>./participate_in_sns_swap.sh</code></td>
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
        <td><code>./upgrade_test_canister.sh</code></td>
    </tr>
    <tr>
        <td>Submit proposal to upgrade a decentralized canister</td>
        <td><code>./upgrade_test_canister.sh]</code></td>
    </tr>
     <tr>
        <td>Vote on a proposal that upgrades a decentralized canister</td>
        <td><code>./vote_on_sns_proposal.sh</code></td>
    </tr>
</table>

You might also want to test integrations and basic SNS functionality. 
For this purpose you can use the above instructions after the test SNS is 
launched or use the [SNS testflight on mainnet](testing-on-mainnet.md).