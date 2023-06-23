# SNS asset canisters

## Overview

The [asset canister](https://github.com/dfinity/sdk/tree/master/src/canisters/frontend/ic-frontend-canister) provides users with a way to store and retrieve static assets from a canister deployed on the IC. Generally, asset canisters are used to serve HTML, CSS, or JavaScript assets, which are typically part of a dapp's frontend. For this reason, the asset canister is also referred to as the frontend canister. For purposes of this guide, we'll refer to it as the asset canister. 

In the context of the SNS, a dapp's associated asset canister serves the frontend assets related to dapp and may also include a frontend to the SNS DAO, e.g., through which users can vote on governance proposals.  

The contents of the asset canister must be configured prior to the launch of the SNS, and any changes afterwards must be made by a principal with the permission to do so. The SNS is the only one that can update the list of approved principals that have this permission, and any additions to this list approved on via an SNS proposal. This configuration assures that changes to the asset canister are only made by authorized principals that the SNS has agreed on through proposals. These changes are referred to as 'upgrades' to the asset canister in the remainder of this document. 

When a dapp's control is handed over to an SNS, this is also true for the associated asset canister.

This section is relevant if your project contains an asset canister and describes how you can test handing over control of an asset canister to an SNS.

## Deploying an asset canister

To deploy an asset canister, first you will need an `assets.wasm.gz` file and a `candid/assets.did` file. Examples of these files can be downloaded with the commands:

```
curl -L "https://github.com/dfinity/sdk/raw/${DX_COMMIT}/src/distributed/assetstorage.wasm.gz" -o assets.wasm.gz
curl -L "https://raw.githubusercontent.com/dfinity/sdk/${DX_COMMIT}/src/distributed/assetstorage.did" -o candid/assets.did
```

Next, you will need to configure your `dfx.json` file to specify your asset canister. An example `dfx.json` file can be found below:

```
{
  "canisters": {
    "nns-dapp": {
      "type": "custom",
      "candid": "",
      "wasm": "nns-dapp.wasm"
    },
    "internet_identity": {
      "type": "custom",
      "candid": "",
      "wasm": "internet_identity.wasm"
    },
    "sns_aggregator": {
      "type": "custom",
      "candid": "candid/sns_aggregator.did",
      "wasm": "sns_aggregator.wasm"
    },
    "test": {
      "candid": "candid/test.did",
      "type": "rust",
      "package": "test"
    },
    "assets": {
      "build": "",
      "candid": "candid/assets.did",
      "type": "custom",
      "wasm": "./assets.wasm.gz"
    }
  }
}
```

### Deploying locally

To deploy your asset canister locally for testing purposes, the following command can be used:

```
dfx deploy assets --network "local" --no-wallet
```

Once the asset canister has been deployed, the SNS can be launched. You can learn more about launching an SNS [here](../launch-sns/launch-sns.md).

### Deploying on the mainnet

:::info 
To deploy to the mainnet network, you will need a wallet that contains cycles. For more information on cycles wallets, please see [here](../../../setup/cycles/cycles-wallet.md).
:::

To deploy your asset canister to the mainnet, the following command can be used:

```
dfx deploy assets --network "ic" --wallet <principal>
```

Once the asset canister has been deployed, the SNS can be launched. You can learn more about launching an SNS [here](../launch-sns/launch-sns.md)

## Submitting an SNS proposal and upgrading an asset canister

- #### Step 1: First, upgrade the asset canister (by proposal, as with any other canister) to the asset canister wasm bundled with dfx 0.14.1, available [here](https://github.com/dfinity/sdk/blob/release-0.14.1/src/distributed/assetstorage.wasm.gz).

- #### Step 2: After upgrading the asset canister by proposal, have someone with `Prepare` permission run:

```
dfx deploy <frontend canister name> --network ic --by-proposal
```

The output will contain something like this:

```
Proposed commit of batch 2 with evidence e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855. Either commit it by proposal, or delete it.
```

- #### Step 3: Save the batch number and the evidence value for use with the asset canister API.

- #### Step 4: To ensure that others would be able to verify the evidence in the proposal, have someone else clone the dapp repo and run:

```
dfx deploy <frontend canister name> --network ic --compute-evidence
```

The computed evidence should match the evidence from step 2.

- #### Step 5: Submit a new proposal to commit the batch, using the APIs below:

Use these asset canister APIs in the proposal:

```
   type CommitProposedBatchArguments = record {
   batch_id: BatchId;
   evidence: blob;
  };
  type ValidationResult = variant { Ok : text; Err : text };


    validate_commit_proposed_batch: (CommitProposedBatchArguments) -> (ValidationResult);
  commit_proposed_batch: (CommitProposedBatchArguments) -> ();

```

An example can be found [here](https://github.com/dfinity/sdk/blob/master/e2e/tests-dfx/assetscanister.bash#L133).

If the proposal is rejected, the preparer should use this new asset canister API:

```
  type DeleteBatchArguments = record {
    batch_id: BatchId;
  };
  delete_batch: (DeleteBatchArguments) -> ();
```


## Asset canister examples

An example of an SNS asset canister is canister `sqbzf-5aaaa-aaaam-aavya-cai`, which is an asset canister part of the [Dragginz Dapp SNS](https://dashboard.internetcomputer.org/canister/sqbzf-5aaaa-aaaam-aavya-cai).

## SNS GenericNervousSystemFunctions

To submit a new `AddGenericNervouSystemFunction` SNS Proposal to support the `commit_proposed_batch` API, the target canister id should be the asset canister (that is upgraded in upgrade steps) and the target function is `commit_proposed_batch`. The validate function should be `validate_commit_proposed_batch`. 

To submit an `ExecuteNervousSystemFunction` SNS Proposal with the output from `dfx deploy <frontend canister name> --network ic --by-proposal` see upgrade steps above.
