# Trust in canisters

## Overview

A key aspect of DeFi and related applications in canisters is the ability to transfer value, e.g. ICP or Bitcoin. Such functionality makes trust in canisters essential. How can one ensure that it is safe to entrust ICPs to a canister?

The answer to this question has two separate dimensions:

1.  Confidence that the canister does what it is supposed to do.

2.  Confidence that the canister behavior will not unexpectedly change.

## Confidence that the canister does what it is supposed to do

The correct behavior of a canister can be checked in two steps. First, inspect the source code used to generate the Wasm code deployed in a canister to ensure that it implements the expected/claimed functionality, and only this functionality. 

Second, ensure that the Wasm module the canister runs, has indeed been generated from the claimed source code. Here, reproducibility of the build is crucial: the developer should have constructed the Wasm module so that precisely the same Wasm can be rebuilt from scratch. The user can then compare the hash of the rebuilt Wasm module with the module hash reported by the IC. Developers and users can find guidance on ensuring reproducibility in [reproducible canisters](/developer-docs/backend/reproducible-builds.md).

Additionally, developers can utilize the [canister history](/docs/current/developer-docs/production/canister-history) feature to track changes to the canister's Wasm module hash. 

## Confidence that the canister behavior will not unexpectedly change

Canister smart contracts are deployed and managed by controllers. A controller's level of decentralization can range from being managed by a single person, or team of people up to being managed by the NNS or another kind of on-chain DAO. Among other capabilities, the controllers can change the code for the canisters which they control so canister code is **mutable**, unlike smart contracts on other blockchains. The controllers have complete control over the assets like ICP tokens or Bitcoins held by the canister they manage. This feature brings canisters closer to typical software and makes them suitable for a broad range of applications where software logic can be changed on an as-needed basis.

For critical applications like those used in DeFi, centralized mutability can be dangerous; the controller could change a benign canister into a canister that steals assets. Below are some options available to developers on how to verifiably decentralize the control of a canister's mutations.

:::info
Canister controllers, if not voluntarily decentralized, have complete control over the user assets held by the canister, for example, any ICP Tokens or Bitcoin held by the canister on the user's behalf. The controller, if malicious, can steal all the assets. In other words, as a user, if you interact with a canister that deals with your assets, inspect the canister to know how it handles them. If you determine that the canister is storing the assets in its subaccounts, ensure that the canister controller is decentralized.
:::

## Sole control by the Network Nervous System (NNS)

The simplest option is to remove a canister's controller. Without a controller, the canister can only be mutated by the NNS via NNS proposal, assuming the integrity of the platform is maintained.

A user can verify the list of controllers for a canister using dfx. For example:

    dfx canister --network ic info ryjl3-tyaaa-aaaaa-aaaba-cai

This will return the list of controllers for the canister with principal `ryjl3-tyaaa-aaaaa-aaaba-cai` (in this example, the ledger canister).

A user can also obtain the list of controllers of another canister via a [`read_state` request](/references/ic-interface-spec.md/#http-read-state) to get the relevant [canister information](/references/ic-interface-spec.md#state-tree-canister-information) which includes the list of controllers. NB: currently a canister cannot obtain this information.

A similar effect can also be achieved by setting the controller of a canister to be itself. In this case, however, you need to carefully verify that the canister cannot somehow submit a request to upgrade itself, e.g. by issuing a reinstall request. Here, code inspection and reproducible builds are crucial.

Finally, a somewhat more useful solution is to pass control of the canister to a so-called [“black hole” canister](https://github.com/ninegua/ic-blackhole). This canister has only itself as a controller but allows third parties to obtain useful information about the canisters the black hole controls, such as the available cycles balance of a black-holed canister. An instance of a black hole canister is [e3mmv-5qaaa-aaaah-aadma-cai](https://icscan.io/canister/e3mmv-5qaaa-aaaah-aadma-cai) which is thoroughly documented [here](https://github.com/ninegua/ic-blackhole). Note that the repository linked here mentions canister immutability, but this is red herring. The NNS is still capable of making changes to a canister that is controlled by a 'black holed' canister, or the black hole canister itself.

## Sole control by NNS and other governance

A more complex, but powerful approach, is to set the sole controller of the canister to a distributed governance mechanism. In this case, the NNS still has ultimate control over the canister, even though it is not explicitly in the controller list. The advantage is that the more specific governance mechanism can be more focused on the canister. One can imagine different levels of complexity and control that such a governance mechanism may implement. An example is the (upcoming) [SNS feature](https://medium.com/dfinity/how-the-service-nervous-system-sns-will-bring-tokenized-governance-to-on-chain-dapps-b74fb8364a5c) which allows developers to set the controller of their canister to some governing canister.

Needless to say, the trust requirements are moved to the SNS controlling the canister where all of the considerations regarding code inspection and reproducibility apply.
