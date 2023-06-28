# SNS launch steps

## Overview
At a high level, the stages for launching an SNS in production are explained [here](../launching/launch-summary.md).

This article lists the technical commands and steps a developer needs to complete the stages for an SNS launch.

At a low level, the [SNS local testing repository](../testing/local-testing.md) guides you through the same,
with the difference that the commands target the canisters on the mainnet.

## Requirements

### 1. IC SDK

See: [installing the IC SDK](../../../setup/install).

### 2. `ic-admin`

See: [installing the `ic-admin`](../../../setup/ic-admin.md).

### 3. `sns` CLI

:::note
The version of the sns CLI that is bundled with your dfx version may not have the latest commands described in the Usage section. If needed, it is recommended to build and use the sns CLI tool yourself.
:::

```bash
git clone git@github.com:dfinity/ic.git
cd ic
bazel build //rs/sns/cli:sns
ls bazel-bin/rs/sns/cli/sns 
```
## Stages

### 1. Dapp developers choose the initial parameters of the SNS for a dapp

Typically, dapp developers typically choose initial parameters that will be used in subsequent proposals.

### 2. Dapp developers submit NNS proposal so they can deploy to the SNS subnet

Anyone who owns an NNS neuron with enough stake can submit a proposal
that lists a principal wallet in [SNS-W](../introduction/sns-architecture.md#SNS-W) who can then deploy the SNS canisters.

To create such a proposal, a common path is to use `ic-admin` and run the following:

```bash 
ic-admin  \
   --nns-url "${NETWORK_URL}" propose-to-update-sns-deploy-whitelist  \
   --added-principals "${WALLET}"  \
   --proposal-title "Let me SNS!"  \
   --summary "This proposal whitelists developer's principal to deploy SNS"
``` 

* One can substitute `WALLET` with the principal in question.
* One can substitute `NETWORK_URL` with `https://nns.ic0.app`.

### 3. Proposal #1 (of 3) is passed or rejected

### 4. Dapp developers trigger the SNS canisters to be created on SNS subnet

After the wallet canister is listed in SNS-W, 
the SNS canisters are created triggered by a manual call to SNS-W.

The `sns CLI` command to trigger the creation of SNS canisters on the SNS subnet: 

```bash
sns deploy --network "${NETWORK}" --init-config-file "${CONFIG}" --save-to "sns_canister_ids.json" 
```

### 5. Dapp developers submit an SNS proposal to handover control of their dapp to the SNS

After the SNS canisters are deployed and the dapp's control is handed over to
the SNS, an NNS proposal starts the swap. 

Again, anyone who owns an NNS neuron with enough stake can submit this proposal.
Of course it is crucial to set the right parameters in this proposal.
You can also find an example how this command is used in the SNS local testing
[here](https://github.com/dfinity/sns-testing/blob/main/open_sns_sale.sh#L11-L26).
```
ic-admin   \
   --nns-url "${NETWORK_URL}" propose-to-open-sns-token-swap  \
   --min-participants 3  \
   --min-icp-e8s 5000000000  \
   --max-icp-e8s 50000000000  \
   --min-participant-icp-e8s 100000000  \
   --max-participant-icp-e8s 20000000000  \
   --swap-due-timestamp-seconds "${DEADLINE}"  \
   --sns-token-e8s 500000000000  \
   --target-swap-canister-id "${SNS_SWAP_ID}"  \
   --community-fund-investment-e8s 5000000000  \
   --neuron-basket-count 3  \
   --neuron-basket-dissolve-delay-interval-seconds 31536000  \
   --proposal-title "Decentralize this SNS"  \
   --summary "Decentralize this SNS"
```

### 6. Proposal #2 (of 3) is passed or rejected

Nothing technical for dapp developers to do. Community votes.

### 7. Proposal to start the decentralization swap

### 8. Proposal #3 (of 3) is passed or rejected

Nothing technical for dapp developers to do. Community votes.

### 9. SNS participants participate in the decentralization swap

Nothing technical for dapp developers to do. Community participates in the swap.

### 10. SNS canisters become SNS DAO

When the swap ends, either because its deadline is reached or because the maximum
ICP have been collected, its finalization has to be triggered by a manual call
to the SNS swap that can be done by anyone.
You can find this command with more context in the SNS local testing repository
[here](https://github.com/dfinity/sns-testing/blob/main/finalize_sns_sale.sh#L8).

```
dfx canister --network "${NETWORK}" call <SWAP_CANISTER_ID> finalize_swap '(record {})'
```
