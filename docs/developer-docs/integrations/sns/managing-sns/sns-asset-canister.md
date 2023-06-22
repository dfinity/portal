# SNS asset canisters

## Overview

The [asset canister](https://github.com/dfinity/sdk/tree/master/src/canisters/frontend/ic-frontend-canister) provides users with a way to store and retrieve static assets from a canister deployed on the IC. Generally, asset canisters are used to serve HTML, CSS, or JavaScript assets, which are typically part of an application's frontend. For this reason, the asset canister is also referred to as the frontend canister. For purposes of this guide, we'll refer to it as the asset canister. 

The asset canister of an SNS serves the frontend assets related to the SNS. The contents of the asset canister must be configured prior to the launch of the SNS, and any changes afterwards must be approved on via an SNS proposal. These changes are referred to as 'upgrades' to the asset canister in the remainder of this document. 


/// Explain how the asset canister interacts with the SNS, including how it must be change before launch and how it can be adjusted after the launch (set permissions)
/// Link to into how the relevant proposals can be sent / how the assets can be updated

This section is relevant if your project contains an asset canister and describes how you can test handing over control of an asset canister to an SNS.

:::info
Note that you can interleave the steps for the asset canister from this section and the steps for the test canister (and also your own canister) within the SNS lifecycle. We list additional constraints in between the steps below.
:::

## Deploying an asset canister

To deploy an asset canister, the `./deploy_assets.sh` script found in the [SNS testing repo](https://github.com/dfinity/sns-testing) can be used.

Then, the SNS can be deployed using the `./deploy_sns.sh <config-path>` script. After the SNS has been deployed, the following steps can be used to prepare the SNS canister for being handed off to the SNS:

:::info
These steps should be run before the `open_sns_swap.sh` script is run according to the SNS lifecycle section.
:::

- #### Step 1: To prepare the asset canister, run the following script:

```
./prepare_assets.sh
```

This grants the SNS governance canister the necessary permissions to manage access to the asset canister. 

- #### Step 2: Next, register the asset canister with the SNS by running the following script:

```
./register_dapp.sh <canister-id>
```

where <canister-id> is the canister ID of the asset canister.

- #### Step 3: Then, register the SNS's managing permissions. 
To test managing permissions in the asset canister via SNS proposals, you need to register the asset canister's functions to manage permissions with the SNS as generic functions. This is accomplished by running the following script:

```
./register_permission_assets.sh.
```

Now you can add or revoke a permission to the asset canister via SNS proposals. To this end, run the script:

```
./add_permission_assets.sh <dfx-identity> <permission>
```

or 

```
./revoke_permission_assets.sh <dfx-identity> <permission>
```

respectively, where <dfx-identity> is the name of an identity to manage permissions for and <permission> is one of Commit, Prepare, and ManagePermissions. You can check the actual permissions by running:

```
dfx canister --network ${NETWORK} call assets list_permitted '(record {permission = variant {<permission>}})'
```

or by running the script:

```
./get_permission_assets.sh.
```

- #### Step 4: Make sure that you can still commit assets by running the script:

```
./commit_assets.sh <path> <content>
```

where <path> is the HTTP path of the asset, e.g., `/myasset.txt` and <content> is the ASCII-encoded content of the asset.


- #### Step 5: Testing all possible SNS launch scenarios includes testing a failed swap (e.g., if not enough funds have been raised) where the control of the asset canister is given back to your principal.

You should run the following step after `finalize_sns_swap.sh` for an unsuccessful swap:

   - After a failed swap, you can run the script:
   
   ```
   ./take_ownership_assets.sh
   ```
   
   to reset the permissions of the asset canister back to only your principal having the Commit permission (in particular, with the SNS governance having no permission anymore).




## Submitting a proposal 

Imagine a scenario where you'd like to upload a frontend file to the SNS's asset canister. To do this, the governance canister must call the asset canister to upload the file. 

- #### Step 1: To get the governance canister to call the asset canister, we first make the proposal to `AddGenericNervousSystemFunction`, which is like adding a new proposal type that uploads files to the asset canister.

- #### Step 2: Next, we can make an ExecuteGenericNervousSystemFunction proposal that will make the governance-canister call the asset-canister’s store method with a payload of the frontend asset Candid parameter for the ‘store’ method.

- #### Step 3: Then, submit a new AddGenericNervousSystemFunction SNS Proposal to support the `commit_proposed_batch` API. 

The target canister id should be the asset canister (that is upgraded in the below upgrade steps) and the target function is `commit_proposed_batch`. The validate function should be `validate_commit_proposed_batch`.

Submit an ExecuteNervousSystemFunction SNS Proposal with the output from:

```
dfx deploy <frontend canister name> --network ic --by-proposal
```

See the below upgrade steps for more information.

## Upgrade steps

- #### Step 1: Upgrade the asset canister (by proposal, as with any other canister) to the asset canister wasm bundled with dfx 0.14.1, available [here](https://github.com/dfinity/sdk/blob/release-0.14.1/src/distributed/assetstorage.wasm.gz).

- #### Step 2: After upgrading the asset canister by proposal, have someone with Prepare permission run:

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

- #### Step 5: Submit a new proposal to commit the batch, using the ‘New Canister APIs’ above.

## Asset canister examples

An example of an SNS asset canister is canister `sqbzf-5aaaa-aaaam-aavya-cai`, which is an asset canister part of the [Dragginz Dapp SNS](https://dashboard.internetcomputer.org/canister/sqbzf-5aaaa-aaaam-aavya-cai).

By viewing the above asset canister, you can view example method that can be used to add, remove, or change assets.

The following is an example of a simple 'store' method:

```
// Single call to create an asset with content for a single content encoding that
// fits within the message ingress limit.
  store: (record {
    key: Key;
    content_type: text;
    content_encoding: text;
    content: blob;
    sha256: opt blob
  }) -> ();
```
