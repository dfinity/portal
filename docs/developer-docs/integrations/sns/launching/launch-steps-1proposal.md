# SNS launch steps

## Overview
At a high level, the stages for launching an SNS in production are explained [here](../launching/launch-summary-1proposal.md).

This article lists the technical commands and steps a developer needs to complete the stages for an SNS launch.

At a low level, the [SNS local testing repository](../testing/testing-locally.md) guides you
through the same, with the difference that the commands here target the canisters on the mainnet.

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

Typically, dapp developers choose initial parameters that will be used in subsequent proposals.

### 2. Dapp developers submit NNS proposal to create SNS

Anyone who owns an eligible NNS neuron with enough stake can submit an NNS proposal to create an
SNS for a given dapp.
Of course it is crucial to set the right parameters in this proposal.
You can also find an example how this command is used in the SNS local testing
[here](https://github.com/dfinity/sns-testing/blob/main/open_sns_sale.sh#L11-L26).

To create such a proposal, a common path is to use `ic-admin` and run the following:
[TODO: update command]
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

* One can substitute `NETWORK_URL` with `https://nns.ic0.app`.

### 3. Dapp developers add NNS root as co-controller of dapp

[TODO: add command]

### 4. The NNS proposal is decided
Nothing technical for dapp developers to do. Community votes.


### 5. (Automatically) SNS-W deploys SNS canisters
Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 6. (Automatically) SNS-W sets SNS root as single controller of dapp
Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 7. (Automatically) SNS-W initializes SNS canisters according to settings from Step 1
Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 8. (Automatically) SNS swap starts
Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 9. (Automatically) SNS swap ends
Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.

### 10. (Automatically) SNS swap finalizes
Nothing technical for dapp developers to do. This is triggered automatically as a result
of an adopted proposal in Stage 4.
