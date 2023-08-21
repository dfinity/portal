# Using a cycles management service

## Overview

Once deployed to the Internet Computer, developers need to pay in cycles for the compute and storage utilized by their canisters. The process of burning cycles and transferring them to a canister is referred to as "topping-up" a canister.

Cycles management services provide canister monitoring and automated cycles top-ups to ensure canisters applications remain up and running and do not run out of cycles.

Instead of manually topping up a canister via `dfx` or scripting a custom solution, cycles management services provide tested top-up automation and and canister metric insights.

## Popular cycles management services
Popular cycles management services include:

* [CycleOps](https://cycleops.dev) - On-chain, proactive, no-code canister monitoring with historical trend graphs, topup email notifications & downloadable transaction history.
* [TipJar](https://k25co-pqaaa-aaaab-aaakq-cai.ic0.app/) - Donate cycles to your favorite canisters on the Internet Computer and keep them live and healthy!

## Cycles management libraries

### Motoko

* [cycles-manager](https://github.com/CycleOperators/cycles-manager) - Provides a simplified, permissioned cycles management framework for multi-canister applications (sponsored by CycleOps).
