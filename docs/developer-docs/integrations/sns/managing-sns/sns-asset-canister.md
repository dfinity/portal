# SNS asset canisters

## Overview

The [asset canister](https://github.com/dfinity/sdk/tree/master/src/canisters/frontend/ic-frontend-canister) provides users with a way to store and retrieve static assets from a canister deployed on the IC. Generally, asset canisters are used to serve HTML, CSS, or JavaScript assets, which are typically part of a dapp's frontend. For this reason, the asset canister is also referred to as the frontend canister. For purposes of this guide, we'll refer to it as the asset canister. 

In the context of the SNS, a dapp's associated asset canister serves the frontend assets related to dapp and may also include a frontend to the SNS DAO, e.g., through which users can vote on governance proposals.  

The contents of the asset canister must be configured prior to the launch of the SNS, and any changes afterwards must be made by a submitting a proposal by a principal with the permission to do so. Once changes are proposed, they can be voted on by the SNS DAO. If approved, the SNS governance canister is the only one that can commit the approved changes.  This configuration assures that changes to the asset canister are only made by approved proposals. These changes are referred to as 'upgrades' to the asset canister in the remainder of this document. 

This section is relevant if your project contains an asset canister and describes how you can test handing over control of an asset canister to an SNS.

## Deploying an asset canister

An asset canister must first be deployed before control of it can be handed over to an SNS. When a dapp's control is handed over to an SNS, this is also true for the associated asset canister.

The general overview of deploying an asset canister during an SNS launch is as follows:
- First, the asset canister must be created with or upgraded to a Wasm file from [dfx 0.14.1+](https://github.com/dfinity/sdk/blob/release-0.14.1/src/distributed/assetstorage.wasm.gz).
- Then, the dapp should hand control of the asset canister over to the SNS by setting the following permissions:
    - The SNS governance canister is given `Commit` permissions. This is done by the previous developer using the `grant_permissions` command (see the granting permissions section below), otherwise the SNS must grant this permission once it is a controller.
    - A whitelist of principals with `Prepare` permissions used to submit proposals is created.
    - The user or developer creating the SNS should remove their own personal permissions. 
- Lastly, the SNS's function should be registered to commit the configuration.

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

Alternatively, any canister in the `dfx.json` file can be set as `"type": "assets"`, and dfx will automatically perform the above steps. 

### Deploying locally for testing

To deploy your asset canister locally for testing purposes, the following command can be used:

```
dfx deploy assets --network "local" --no-wallet
```

The asset canister should be deployed and have permissions configured before the dapp is handed over to an SNS. 

### Deploying on the mainnet

:::info 
To deploy to the mainnet, you will need a wallet that contains cycles. For more information on cycles wallets, please see [here](../../../setup/cycles/cycles-wallet.md).
:::

To deploy your asset canister to the mainnet, the following command can be used:

```
dfx deploy assets --network "ic" --wallet <principal>
```

The asset canister should be deployed and have permissions configured before the dapp is handed over to an SNS. 

## Configuring an asset canister's permissions

When configuring an asset canister, a set of permissions that contains a whitelist of principals must be created. This whitelist details who is allowed submit proposals that update assets in the asset canister. This whitelist must be configured prior to the SNS launch. Principals that are allowed to submit proposals are given the `Prepare` permission.

Before the SNS can be launched, control of the asset canister must be handed over to the SNS. The SNS' governance canister should be added to the whitelist as a principal with `Commit` rights. Only principals with `Commit` rights may apply proposed changes. 

Once the asset canister has been handed over to the SNS, only the governance canister should have `Commit` rights, and principals in the whitelist should have `Prepare` rights. The developer who configured and deployed the SNS should have their permissions removed prior to launching the SNS. 

If the whitelist needs to be adapted or changed, the SNS can call `take_ownership` via a proposal, which must be added as a custom proposal type. This will clear all permissions, and give only the SNS governance canister `Commit` permissions. 

### Granting permissions

To grant a principal permission within an asset canister, the following command can be used:

```
dfx canister call --network ic <canister-id> grant_permission <principal>
```

### Revoking permissions

To revoke a principal's permission within an asset canister, the following command can be used:

```
dfx canister call --network ic <canister-id>  revoke_permission <principal>
```

### Listing permissions

To list permissions for an asset canister, the following command can be used:

```
dfx canister call --network ic <canister-id> list_permitted '(record {permission = variant {<Permission>}})'
```

For example, to list all principals with the `Commit` permission:

```
dfx canister call --network ic oa7fk-maaaa-aaaam-abgka-cai list_permitted '(record {permission = variant {Commit}})'
```

To list all principals with the `Prepare` permission:

```
dfx canister call --network ic oa7fk-maaaa-aaaam-abgka-cai list_permitted '(record {permission = variant {Commit}})'
```

Once the asset canister has been deployed and permissions have been configured, the SNS can be launched. You can learn more about launching an SNS [here](../launch-sns/launch-sns.md)

## SNS GenericNervousSystemFunctions

To submit a new `AddGenericNervousSystemFunction` SNS Proposal to support the `commit_proposed_batch` API, the target canister id should be the asset canister (that is upgraded in the upgrade steps below) and the target function is `commit_proposed_batch`. The validate function should be `validate_commit_proposed_batch`. 

To submit an `ExecuteNervousSystemFunction` SNS Proposal with the output from `dfx deploy <frontend canister name> --network ic --by-proposal` see upgrade steps below.

## Submitting an SNS proposal and upgrading an asset canister

Once an asset canister is under the control of the SNS, any changes must be done via an SNS proposal. 

Before submitting an SNS proposal to upgrade an asset canister, assure that the asset canister has been upgraded (by proposal) to use the Wasm bundled with [dfx 0.14.1+](https://github.com/dfinity/sdk/blob/release-0.14.1/src/distributed/assetstorage.wasm.gz).

- #### Step 1: To submit an SNS proposal, first have a principal with `Prepare` permission run:

```
dfx deploy <frontend canister name> --network ic --by-proposal
```

The output will contain something like this:

```
Proposed commit of batch 2 with evidence e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855. Either commit it by proposal, or delete it.
```

- #### Step 2: Save the batch number and the evidence value for use with the asset canister API.

- #### Step 3: To ensure that others would be able to verify the evidence in the proposal, have someone else clone the dapp repo and run:

```
dfx deploy <frontend canister name> --network ic --compute-evidence
```

The computed evidence should match the evidence from step 2.

- #### Step 4: Submit a new proposal to commit the batch, using the APIs below:

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


## Asset canister example

An example of an SNS asset canister is canister `sqbzf-5aaaa-aaaam-aavya-cai`, which is an asset canister part of the [Dragginz Dapp SNS](https://dashboard.internetcomputer.org/canister/sqbzf-5aaaa-aaaam-aavya-cai).

