# SNS launch steps

## Overview
At a high level, the stages for launching an SNS in production are explained [here](../launching/launch-summary.md).

This article lists the technical commands and steps a developer needs to complete the stages for an SNS launch.

At a low level, the [SNS local testing repository](../testing/testing-locally.md) guides you through the same, with the difference that the commands target the canisters on the mainnet.

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

#### Quill command

```bash
quill sns \
   --canister-ids-file ./sns_canister_ids.json \
   --pem-file "${PEM_FILE}" \
   make-proposal \
   --proposal \
      "(record { \
         title=\"${REGISTER_DAPP_PROPOSAL_TITLE}\"; \
         url=\"${REGISTER_DAPP_PROPOSAL_URL}\"; \
         summary=\"${REGISTER_DAPP_PROPOSAL_SUMMARY}\"; \
         action=opt variant {RegisterDappCanisters = record {canister_ids=${DAPP_CANISTER_IDS}}}})" \
   "${DEVELOPER_NEURON_ID}"
```

Where the parameters are:

* `sns_canister_ids.json` is a file with the IDs of this SNS’s canisters

* `PEM_FILE`="$(dfx cache show)/../../${IDENTITY_NAME}/identity.pem"

* `IDENTITY_NAME`=`<current-dapp-controller-identity-name>`

* `REGISTER_DAPP_PROPOSAL_TITLE`="Register test dapp"

* `REGISTER_DAPP_PROPOSAL_URL`="https://example.com/"

* `REGISTER_DAPP_PROPOSAL_SUMMARY`="This proposal registers test dapp with SNS"

* `DAPP_CANISTER_IDS`="vec { \
 principal\"$CID1\"; \
 principal\"$CID2\"; \
 principal\"$CID3\" \
} where we assume your dapp’s canister principals are encoded as strings and set into variables named `CID2`, `CID2`, `CID3`

* `DEVELOPER_NEURON_ID`=`<your-developer-neuron-ID>`

### 6. Proposal #2 (of 3) is passed or rejected

Dapp developers vote with their initial SNS neurons. Depending on the
initial neuron distribution, this also includes community votes.

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
