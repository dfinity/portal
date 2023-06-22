# SNS launch steps

## Overview
An SNS can be launched in production by following the steps explained on a 
high level [here](../launching/launch-summary.md).

Technically, these are the same steps that the
[SNS local testing repository](../testing/local-testing.md) guides you through,
with the difference that the commands target the canisters on the mainnet.

To make the most important commands and what they need to look like for 
mainnet more accessible, they are listed below.

## Requirememts

1. IC SDK

2. `ic-admin`

3. `sns` CLI

:::note
The version of the sns CLI that is bundled with your dfx version may not have the latest commands described in the Usage section. If needed, it is recommended to build and use the sns CLI tool yourself.
:::

```bash
git clone git@github.com:dfinity/ic.git
cd ic
bazel build //rs/sns/cli:sns
ls bazel-bin/rs/sns/cli/sns 
```

## Steps

- #### Step 1: Dapp developers choose the initial parameters of the SNS for a dapp

- #### Step 2: Dapp developers submit NNS proposal so they can deploy to the SNS subnet

Anyone who owns and NNS neuron with enough stake can submit a proposal
that lists a principal wallet in [SNS-W](../introduction/sns-architecture.md#SNS-W) who can then deploy the SNS canisters.

To create such a proposal, a common path is to [download the `ic-admin` tool](../../../setup/ic-admin.md) and run the following:

```bash 
ic-admin  \
   --nns-url "${NETWORK_URL}" propose-to-update-sns-deploy-whitelist  \
   --added-principals "${WALLET}"  \
   --proposal-title "Let me SNS!"  \
   --summary "This proposal whitelists developer's principal to deploy SNS"
``` 

* One can substitute `WALLET` with the principal in question 
* One can substitute `NETWORK_URL` with `https://nns.ic0.app`

- #### Step 3: NNS DAO accepts or rejects the NNS proposal

  This is the **first of three** proposals that need to successfully pass.
  
  :::info
  If this NNS proposal passes and the developer's principal is added the list of principals that can deploy to the SNS subnet, it does **not** guarantee the rest of the steps will complete.
  :::

- #### Step 4: Dapp developers trigger the SNS canisters to be created on SNS subnet

After the wallet canister is listed in SNS-W, 
the [SNS canisters are created triggered by a manual call to SNS-W](../launching/launch-steps.md/#SNS-launch-step-deployment).

The command tp trigger the creation of SNS canisters on the SNS subnet: 

```bash
sns deploy --network "${NETWORK}" --init-config-file "${CONFIG}" --save-to "sns_canister_ids.json" 
```

## Submitting an NNS proposal to start the SNS swap {#SNS-launch-command-NNSproposal2}
After the SNS canisters are deployed and the dapp's control is handed over to
the SNS, an [NNS proposal starts the swap](../launching/launch-steps.md/#SNS-launch-step-startSwap). 
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


## Finalizing the SNS swap {#SNS-launch-command-finalizingswap}
When the swap ends, either because its dealine is reached or because the maximum
ICP have been collected, its finalization has to be triggered by a manual call
to the SNS swap that can be done by anyone.
You can find this command with more context in the SNS local testing repository
[here](https://github.com/dfinity/sns-testing/blob/main/finalize_sns_sale.sh#L8).

```
dfx canister --network "${NETWORK}" call <SWAP_CANISTER_ID> finalize_swap '(record {})'
```
