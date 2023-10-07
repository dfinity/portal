---
sidebar_position: 2
---
# Testing SNS locally

## Overview

To help developers, DFINITY has created the [sns-testing repo](https://github.com/dfinity/sns-testing) which has scripts that help developers test the SNS process. Developers can run a local version of the Internet Computer on their local machine, deploy their dapp locally and run through [the stages](../launching/launch-summary.md) of decentralizing their dapp.

:::info
`sns-testing` repo might not work for any dapp. It is intended to showcase one example dapp and so one can tweak for their own dapp.
:::

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

## Getting started

To use the `sns-testing` commands and their arguments properly, you need to first set up the `sns-testing` repo properly. Please see [README](https://github.com/dfinity/sns-testing#sns-lifecycle).

:::info
* All of the commands in this article require `sns-testing` to be set up properly. 
* If you have started using `sns-testing` before August 2023 and are using the old legacy flow of launching an SNS (please see [here](../launching/index.md) for more context), please continue your work with the legacy documentation on [this old README](https://github.com/dfinity/sns-testing/blob/v1-legacy/README.md). In particular, 
* If you were following the Apple silicon-only instructions, please switch to the `v1-legacy` Git tag.
* If you were using the Docker-based deployment approach, please use the docker image: `docker pull ghcr.io/dfinity/sns-testing:v1-legacy`.

:::

### Testing stages of the SNS launch process

For simplicity, next we map the stages introduced in the [SNS launch stages documentation](../launching/launch-summary-1proposal.md) and in the documentation [commands and actions to go through SNS launch](../launching/launch-steps-1proposal.md) to the relevant scripts in the `sns-testing` repo so you can learn what part of the launch is tested in which script.
Note that some developers have dapps that do not match the narrow cases of `sns-testing` so the table also includes a column for what other developers have experienced.

## Stages

### 0. Deploy a dapp to the local replica.

#### Option 1: Testing a pre-packaged dapp created in `sns-testing` just for purposes of testing

```bash
./deploy_test_canister.sh
```

#### Option 2: Deploying your own single-canister dapp

```bash
dfx deploy
```

#### Option 3: Deploying your own multi-canister dapp

In this case, you should use whatever scripts or set up you have to deploy your dapp.

### 1. Dapp developers add NNS root as co-controller of dapp.

They can do so by running the following command:

Option 1: You have one canister

```bash
dfx sns prepare-canisters add-nns-root $CANISTER_ID
```

Option 3: You have many canisters, run it for each canister ID

```bash
dfx sns prepare-canisters add-nns-root $CANISTER_ID_1
dfx sns prepare-canisters add-nns-root $CANISTER_ID_2
...
dfx sns prepare-canisters add-nns-root $CANISTER_ID_N
```

### 2. Dapp developers choose the initial parameters of the SNS for a dapp.

Typically, dapp developers choose initial parameters that will be used in subsequent proposals.

Fill out this file:

```bash
example_sns_init.yaml
```

### 3. Submit NNS proposal to create SNS.

Submit an NNS proposal that ingests the `example_sns_init.yaml` file from stage #2

```bash
dfx sns propose --network local --neuron $NEURON_ID example_sns_init.yaml
```

- `$NEURON_ID` comes from the `sns-testing` setup

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

```bash
./participate_in_sns_swap.sh
```

### 9. (Automated) SNS swap ends.

Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 10. (Automated) SNS swap finalizes.

Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

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