---
sidebar_position: 3
---
# SNS testflight
## Overview
Before requesting an SNS launch in production,
you are encouraged to test your mainnet dapp's operation (e.g., upgrading the dapp's canisters)
via SNS proposals.

We next describe how you can test SNS proposals by deploying testflight SNS
and submitting SNS proposals to it.
The main differences to production SNS deployment are summarized here:
- Testflight SNS is deployed by the developer instead of NNS; in particular, no NNS proposals are involved.
- No decentralization swap is performed; in particular, the developer has full control over the SNS for the entire duration of the testflight.
- The developer can also keep direct control over the dapp's canisters registered with testflight SNS.
- When deployed on the mainnet, testflight SNS is deployed to a regular application subnet instead of a dedicated SNS subnet.

## Prerequisites

To perform SNS testflight, you will need the following tools:

- [x] [dfx](https://github.com/dfinity/sdk)
- [x] [sns-cli](https://github.com/dfinity/ic)
- [x] [quill](https://github.com/dfinity/quill)
- [x] [didc](https://github.com/dfinity/candid) (for advanced tests)

Instead of building `sns-cli` locally, you can download pre-compiled binaries for [Linux](https://download.dfinity.systems/ic/82a53257ed63af4f602afdccddadc684df3d24de/openssl-static-binaries/x86_64-linux/sns.gz) and [macOS](https://download.dfinity.systems/ic/82a53257ed63af4f602afdccddadc684df3d24de/openssl-static-binaries/x86_64-darwin/sns.gz). You can replace the commit hash in the links by the most recent one obtained via running the command:
```
./gitlab-ci/src/artifacts/newest_sha_with_disk_image.sh origin/master
```
from the root directory of the [IC monorepo](https://github.com/dfinity/ic).

You can download pre-compiled binaries for quill [here](https://github.com/dfinity/quill/releases).

You can download pre-compiled binaries for didc [here](https://github.com/dfinity/candid/releases).

This guide has been tested with the following version of the tools:
- **dfx: 0.13.1**
- **sns-cli: 82a53257ed63af4f602afdccddadc684df3d24de**
- **quill: v0.4.0**
- **didc: 0.3.0 (2022-11-17)**

## Import and download SNS canisters

To import the SNS canisters in the `dfx.json` file of your project and download their WASM binaries, run
```
DFX_IC_COMMIT=82a53257ed63af4f602afdccddadc684df3d24de dfx sns import
DFX_IC_COMMIT=82a53257ed63af4f602afdccddadc684df3d24de dfx sns download
```
in the root directory of your project.

## Deploy testflight SNS and store the developer neuron ID

To deploy the testflight SNS, run
```
sns-cli deploy-testflight
```
To deploy on the mainnet, pass `--network ic` as an additional argument.

After the deployment finishes, make sure to store the developer neuron ID
which you will use to submit SNS proposals.
The testflight SNS parameters are configured so that this developer neuron ID
has full control over the testflight SNS.
The developer neuron ID is the last part of the testflight deployment output, e.g.:
```
Developer neuron IDs:
594fd5d8dce3e793c3e421e1b87d55247627f8a63473047671f7f5ccc48eda63
```

## Add SNS root as an additional controller of all SNS managed dapp canisters

Add the SNS root canister as an **additional** controller of all the canisters
that you want to manage by the testflight SNS.
For a canister called `test`, you can do so as follows:
```
dfx canister update-settings --add-controller $(dfx canister id sns_root) test
```
When running the testflight on the mainnet, pass `--network ic` as an additional argument
to **both** invocations of `dfx canister`.

## Register dapp canisters with SNS root

Register all canisters that are supposed to be managed by the testflight SNS
by submitting an SNS proposal via `quill`.

When running the testflight locally, export the environment variable `IC_URL`
to point to your local IC instance, e.g.,
```
export IC_URL="http://localhost:8080/"
```

Determine the **absolute** path to the PEM file of your identity.
Typically, this file is located at
`.config/dfx/identity/$(dfx identity whoami)/identity.pem`
under your home directory.

Finally, prepare and send the SNS proposal via `quill`:
```
export DEVELOPER_NEURON_ID="594fd5d8dce3e793c3e421e1b87d55247627f8a63473047671f7f5ccc48eda63"
export PEM_FILE="/home/martin/.config/dfx/identity/$(dfx identity whoami)/identity.pem"
export CID="$(dfx canister id test)"
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal --proposal "(record { title=\"Register dapp's canisters with SNS.\"; url=\"https://example.com/\"; summary=\"This proposal registers dapp's canisters with SNS.\"; action=opt variant {RegisterDappCanisters = record {canister_ids=vec {principal\"$CID\"}}}})" $DEVELOPER_NEURON_ID > register.json
quill send register.json
```
When running the testflight on the mainnet, pass `--network ic` as an additional argument to `dfx canister`
when obtaining the dapp's canister IDs.
Otherwise, pass `--insecure-local-dev-mode` as an additional argument to `quill send`.

You can also register multiple canisters via a single SNS proposals by adjusting `RegisterDappCanisters`
in the `--proposal` argument above to, e.g.,
```
RegisterDappCanisters = record {canister_ids=vec {principal\"$CID1\"; principal\"$CID2\";}}
```

Once the SNS proposal is executed, you should see all the registered dapp's canisters listed as dapps in
```
dfx canister call sns_root list_sns_canisters '(record {})'
```
When running the testflight on the mainnet, pass `--network ic` as an additional argument to `dfx canister` above.

## Test upgrading canisters via SNS proposals

Determine the path to the new wasm binary that you want to upgrade the canister to.
For projects build with `dfx`, this binary is typically located at
`.dfx/<network>/canisters/<canister-name>/<canister-name>.wasm`
under the root directory of your project,
where `<network>` is the network (e.g., `local` or `ic`) and `<canister-name>` is the name
of the canister according to `dfx.json`.

Now you can prepare and send the SNS proposal via `quill`:
```
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-upgrade-canister-proposal --summary "This proposal upgrades test canister." --title "Upgrade test canister." --url "https://example.com/" --target-canister-id $CID --wasm-path "./.dfx/local/canisters/test/test.wasm" $DEVELOPER_NEURON_ID > upgrade.json
quill send upgrade.json | grep -v "^ *new_canister_wasm"
```
Unless you run the testflight against the mainnet, pass `--insecure-local-dev-mode` as an additional argument to `quill send`.

You can omit `grep -v "^ *new_canister_wasm"` above to see the new WASM binary in the output. Note that the output then contains the entire WASM binary and can be huge!

## Test executing code on SNS managed canisters via SNS proposals

To execute code on SNS managed canisters via SNS proposals,
the canisters must expose a pair of public
functions (referred to as **generic** functions in the following):
- a validation function to validate and render the proposal payload;
- an execution function to perform an action given the proposal payload.

The validation function must return a value of the Candid type
`variant { Ok: text; Err: text; }`, e.g., `Result<String, String>` in Rust.
If the validation function returns `Ok(rendering)`, then
the proposal is submitted and the `rendering` string is included
into the proposal.
Otherwise, the proposal submission fails.

The execution function gets the same binary payload as passed to the validation function
and its code gets executed if the proposal is accepted.
It should not return any value because this return value is ignored.

To use generic functions, you must first
submit an SNS proposal to register these functions
with SNS governance:
```
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal --proposal "(record { title=\"Register generic functions.\"; url=\"https://example.com/\"; summary=\"This proposals registers generic functions.\"; action=opt variant {AddGenericNervousSystemFunction = record {id=1000:nat64; name=\"MyGenericFunctions\"; description=null; function_type=opt variant {GenericNervousSystemFunction=record{validator_canister_id=opt principal\"$CID\"; target_canister_id=opt principal\"$CID\"; validator_method_name=opt\"validate\"; target_method_name=opt\"execute\"}}}}})" $DEVELOPER_NEURON_ID > register-generic-functions.json
quill send register-generic-functions.json
```
You have to assign a distinct numeric identifier to all generic functions registered with SNS governance.
Note that this identifier has to be at least 1000.
You also have to provide a name and an optional description of the generic functions
that are rendered in the proposal, but do not directly relate to the functions' names
in the canister code (the name is `MyGenericFunctions` and the description omitted in the sample code above).

Once the proposal to register generic functions is accepted, you can submit proposals to execute them
with a given binary payload:
```
quill sns --canister-ids-file ./sns_canister_ids.json --pem-file $PEM_FILE make-proposal --proposal "(record { title=\"Execute generic functions.\"; url=\"https://example.com/\"; summary=\"This proposal executes generic functions.\"; action=opt variant {ExecuteGenericNervousSystemFunction = record {function_id=1000:nat64; payload=blob \"DIDL\01l\02\b9\fa\ee\18y\b5\f6\a1Cy\01\00\02\00\00\00\03\00\00\00\"}}})" $DEVELOPER_NEURON_ID > execute-generic-functions.json
quill send execute-generic-functions.json
```
The generic functions to be executed are specified by their numeric identifier defined in their registration proposal.
The payload is a blob that is passed to both generic functions.
The above sample payload `blob \"DIDL\01l\02\b9\fa\ee\18y\b5\f6\a1Cy\01\00\02\00\00\00\03\00\00\00\"` was obtained via
```
$ didc encode '(record {major=2:nat32; minor=3:nat32;})' --format blob
blob "DIDL\01l\02\b9\fa\ee\18y\b5\f6\a1Cy\01\00\02\00\00\00\03\00\00\00"
```
and can be decoded as Candid payload (a record with two fields) in the canister Rust code
```
#[derive(CandidType, Debug, Deserialize)]
struct Version {
  major: u32,
  minor: u32,
}

#[ic_cdk::update]
fn validate(x: Version) -> Result<String, String> {
  // ...
}
```

## Check the proposals of the testflight SNS

You can list all proposals in the testflight SNS as follows:
```
dfx canister call sns_governance list_proposals '(record {include_reward_status = vec {}; limit = 0; exclude_type = vec {}; include_status = vec {};})'
```
When running the testflight on the mainnet, pass `--network ic` as an additional argument to `dfx canister`.
You can also provide a limit and thus only obtain the last few proposals.

## Aborting the testflight

As the developer keeps direct control over the registered dapp's canisters during the testflight,
you can directly manage your dapp's canisters during the testflight if needed.
However, we strongly encourage you to make sure you can also perform all required operations
only via SNS proposals (possibly after upgrading your dapp).

Once you are done with testing all kinds of SNS proposals needed to operate your dapp,
you can finish the testflight.
Make sure that you are a controller of all the canisters registered with the testflight SNS, e.g.,
by invoking
```
dfx canister status test
```
When running the testflight on the mainnet, pass `--network ic` as an additional argument to `dfx canister`.

If this is the case, you can safely delete the SNS testflight canisters.
Otherwise, you can restore control over your dapp's canisters by reinstalling
the SNS root canister with the following code (make sure to paste the developer principal ID
and your dapp's canister ID into the code):
```
use candid::{CandidType, Principal};

#[derive(Default, Clone, CandidType, Debug)]
pub struct CanisterSettingsArgs {
    pub controllers: Option<Vec<candid::Principal>>,
    pub compute_allocation: Option<candid::Nat>,
    pub memory_allocation: Option<candid::Nat>,
    pub freezing_threshold: Option<candid::Nat>,
}

#[derive(CandidType)]
pub struct UpdateSettingsArgs {
    pub canister_id: candid::Principal,
    pub settings: CanisterSettingsArgs,
    pub sender_canister_version: Option<u64>,
}

#[ic_cdk::update]
async fn recover() {
    // put your developer principal here:
    let developer_principal = Principal::from_text("").unwrap();
    let can_settings = CanisterSettingsArgs {
        controllers: Some(vec![developer_principal]),
        compute_allocation: None,
        memory_allocation: None,
        freezing_threshold: None,
    };
    // put the registered canister ID here:
    let canister_id = Principal::from_text("").unwrap();
    let settings = UpdateSettingsArgs {
        canister_id,
        settings: can_settings,
        sender_canister_version: None,
    };
    ic_cdk::api::call::call::<_, ()>(Principal::from_text("aaaaa-aa").unwrap(), "update_settings", (settings,)).await.unwrap();
}
```
and invoking:
```
dfx canister call sns_root recover '()'
```
When running the testflight on the mainnet, pass `--network ic` as an additional argument to `dfx canister`.
