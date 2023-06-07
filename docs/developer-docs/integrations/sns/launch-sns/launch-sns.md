# SNS launch
## Overview
An SNS can be launched in production by following the steps explained on a 
high level [here](/lifecycle-sns/sns-launch.md).
Technically, these are the same steps that the
[SNS local testing repository](/get-sns/local-testing.md) guides you through,
with the difference that the commands target the canisters on the mainnet.

To make the most important commands and what they need to look like for 
mainnet more accesible, they are listed below.

## Submitting an NNS proposal to approve the SNS
After preparations and choosing the parameters
([Step 1: Preparation](#SNS-launch-step-preparation)), 
an [NNS proposal approves the creation of the SNS](#SNS-launch-step-NNSapproval).
Anyone who owns and NNS neuron with enough stake can submit such a proposal
that lists a principal wallet in SNS-W who can then deploy the SNS canisters.
For the larger context, you can consider how this command is used in the SNS
local testing repository
[here](https://github.com/dfinity/sns-testing/blob/main/deploy_sns.sh#L18-L23).
``` 
ic-admin  \
   --nns-url "${NETWORK_URL}" propose-to-update-sns-deploy-whitelist  \
   --added-principals "${WALLET}"  \
   --proposal-title "Let me SNS!"  \
   --summary "This proposal whitelists developer's principal to deploy SNS"
``` 



## SNS canister creation calling SNS-W
After the wallet canister is listed in SNS-W, 
the [SNS canisters are created triggered by a manual call to SNS-W](/lifecycle-sns/sns-launch.md/#SNS-launch-step-deployment).
You can find this command in an example in the SNS local testing repository [here](https://github.com/dfinity/sns-testing/blob/main/deploy_sns.sh#L33)
```
sns deploy --network "${NETWORK}" --init-config-file "${CONFIG}" --save-to "sns_canister_ids.json" 
```

## Submitting an NNS proposal to start the SNS swap
After the SNS canisters are deployed and the dapp's control is handed over to
the SNS, an [NNS proposal starts the swap](/lifecycle-sns/sns-launch.md/#SNS-launch-step-startSwap). 
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


## Finalizing the SNS swap
When the swap ends, either because its dealine is reached or because the maximum
ICP have been collected, its finalization has to be triggered by a manual call
to the SNS swap that can be done by anyone.
You can find this command with more context in the SNS local testing repository
[here](https://github.com/dfinity/sns-testing/blob/main/finalize_sns_sale.sh#L8).

```
dfx canister --network "${NETWORK}" call <SWAP_CANISTER_ID> finalize_swap '(record {})'
```
