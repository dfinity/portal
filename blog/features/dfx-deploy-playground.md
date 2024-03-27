---
title: Introducing `dfx deploy --playground`!
description: Today we're excited to announce a new dfx subcommand — `dfx deploy --playground`!
tags: [New features]
image: /img/blog/deploy-playground.jpg
date: October 4, 2023
---

# Introducing `dfx deploy --playground`

Today we're excited to announce a new `dfx` subcommand: `dfx deploy --playground`!

`--playground` (or `--network playground`) is a new network flag for the `dfx deploy` command that deploys the project's canister(s) to the Motoko playground's canister pool instead of deploying them to the local replica (`--network local`) or the mainnet network (`--network ic`). 

When this flag is used, the canisters are deployed in a manner where they borrow resources from the Motoko playground's canister pool. The Motoko playground provides developers with an environment where canisters can be deployed and tested quickly without needing to manage cycles.

`dfx deploy --playground` is available in `dfx` versions v0.15.1 and above.

## What this means for developers

Since the `dfx deploy --playground` feature doesn't require additional configuration, developers can get up and running with very few prerequisites, making the on-boarding of new developers more seamless than before. For existing developers, this provides a new way for canisters to be tested, since canisters deployed to the playground are deployed on the mainnet, but do not cost cycles that the developer must pay. This means developers can run short tests using mainnet resources, without actually having to set up a well-funded and permanent identity. 

## Using `dfx deploy --playground`

To deploy a canister to the Motoko playground, first create a new `dfx` project with the command, or navigate into an existing project's directory. For the sake of this example, we'll create a new project:

```
dfx new hello_world
```

This command will create a new default `dfx` project, which contains a simple 'Hello, world!' sample.

Then, to deploy this canister to the playground, run the command:

```
dfx deploy --playground
```

Once deployed, the canister can be interacted with using a command such as:

```
dfx canister --network playground call hello_world_backend greet '("everyone")'
```

This command calls the `hello_world_backend` canister that has been deployed to the playground using the `--network` flag, since the playground is classified as a deployment network. 

*Any commands that intend to target a canister deployed to the playground must use the `--playground` or `--network playground` flag in order to target the borrowed canister(s).*

Since the canister has been deployed to the playground, it is important to know the limitations that canisters deployed with the `--playground` flag will be subject to. These restrictions are:

- Cycle transfer instructions are silently ignored by the Motoko playground.
- Wasm files can't be gzipped.
- Wasm files will be analyzed to remove any potentially expensive/malicious operations.
- Canisters can use at most 1GB of memory.
- Canisters can call the management canister to manage itself without being the controller.
- Deployed canisters expire after 20 minutes.

As always, we'd love to hear your thoughts and feedback on this new feature, so please feel free to let us know through our [community forum](https://forum.dfinity.org/) or [Discord](https://discord.gg/jnjVVQaE2C) server. 

-DFINITY
