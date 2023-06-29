---
sidebar_position: 2
---
# Testing SNS locally

## Overview

To help developers, DFINITY has created the `sns-testing` repo which has scripts that help developers test the SNS process. Developers can run a local version of the Internet Computer on their local machine, deploy their dapp locally and run through [the stages](../launching/launch-summary.md) of decentralizing their dapp. 

After having [chosen the initial SNS parameters in a .yaml file](../tokenomics/preparation.md)and before requesting an SNS launch in production, the SNS launch should be tested locally.

**The main intent of `sns-testing` repo is for a developer to test the actual process of decentralizing their dapp.**

Among other things, developers can use `sns-testing` repo to: 
* Initiate proposals.
* Pass proposals.
* start decentralization swaps
* upgrade dapp via DAO voting

:::info
`sns-testing` is just one form of testing SNS process locally. Developers should feel free to use others, fork/modify `sns-testing` or create their own.
:::

## Using the `sns-testing` repo

These scripts have been most tested with a stack that looks like this:

* A single canister that is being decentralized.
* Canister can be deployed to local replica via `dfx deploy`

## Testing via `sns-testing` repo

A common way to test an SNS locally is to use the `sns-testing` [repo](https://github.com/dfinity/sns-testing#readme).

### Examples of what it tests

The `sns-testing` repo can help with testing the lifecycle of launching an SNS, by running the commands listed [here](https://github.com/dfinity/sns-testing#sns-lifecycle).

For simplicity, you can see the stages of decentralization and how they line up with the CLI commands. 

:::info
To use the `sns-testing` commands and their arguments properly, please consult the `sns-testing` [README](https://github.com/dfinity/sns-testing#sns-lifecycle).
:::

### Testing stages of decentralization

Below, we match the stages of decentralization to the commands that the `sns-testing` repo has. Some developers have dapps that do not match the narrow cases of `sns-testing` so the table also includes a column for what other developers have experienced.

<table border="1">
    <tr>
        <th>Stage Number</th>
        <th>Stage</th>
        <th>Example `sns-testing` command</th>
        <th>For other developers</th>
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
        <td rowspan="4"><code>./deploy_sns.sh</code></td>
    </tr>
    <tr>
        <td>2</td>
        <td>Dapp developers submit NNS proposal so they can deploy to the SNS subnet</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Proposal #1 (of 3) is passed or rejected</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Dapp developers trigger the SNS canisters to be created on SNS subnet</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Dapp developers submit an SNS proposal to handover control of their dapp to the SNS</td>
        <td rowspan="2"><code>./register_dapp.sh</code></td>
        <td rowspan="2"> Potentially many proposals if one's dapp has many canisters</td>
    </tr>
        <tr>
        <td>6</td>
        <td>Proposal #2 (of 3) is passed or rejected</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Proposal to start the decentralization swap</td>
        <td rowspan="2"><code>./open_sns_swap.sh</code></td>
    </tr>
    <tr>
        <td>8</td>
        <td>Proposal #3 (of 3) is passed or rejected</td>
    </tr>
    <tr>
        <td>9</td>
        <td>SNS participants participate in the decentralization swap</td>
        <td><code>./participate_sns_swap.sh</code></td>
    </tr>
    <tr>
        <td>10</td>
        <td>SNS canisters become SNS DAO</td>
        <td><code>./finalize_sns_swap.sh</code></td>
    </tr>
</table>

### Testing the upgrading and managing of an SNS

Once a canister or dapp has been decentralized, it will be updated via proposals and voting. Developers can test this flow by [using commands from `sns-testing`](https://github.com/dfinity/sns-testing#sns-lifecycle).


<table border="1">
    <tr>
        <th>Stage Number</th>
        <th>Stage</th>
        <th>Command</th>
    </tr>
    <tr>
        <td>0</td>
        <td>Upgrade a  yet-to-be-decentralized canister by submitting an SNS proposal that can be voted on using the SNS developer neuron.</td>
        <td>./upgrade_test_canister.sh</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Submit proposal to upgrade a decentralized canister</td>
        <td>./upgrade_test_canister.sh</td>
    </tr>
     <tr>
        <td>1</td>
        <td>Vote on a proposal that upgrades a decentralized canister</td>
        <td>./vote_on_sns_proposal.sh </td>
    </tr>
</table>

You might also want to test integrations and basic SNS functionality. 
For this purpose you can use the above instructions after the test SNS is 
launched or use the [SNS testflight on mainnet](testing-on-mainnet.md).