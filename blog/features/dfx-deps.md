---
title: Introducing dfx deps!
description: Previously known as the `dfx pull` command, `dfx deps` is a new set of subcommands designed to provide a consistent developer workflow for integrating and testing third-party canisters within local developer environments.
tags: [New features]
image: /img/blog/infinity-symbol.png
---

# Introducing dfx deps!

[!dfx deps](/img/blog/infinity-symbol.png)

Today we're excited to announce a new dfx feature: dfx deps!

## What is `dfx deps`?

`dfx deps` is a new set of subcommands designed to provide a consistent developer workflow for integrating and testing third-party canisters within local environments. Third-party canisters can be canisters created by DFINITY, such as the Internet Identity or NNS canisters, or they can be canisters created by members of the ICP community that provide a public service at a *static canister ID*.

Testing third-party canister integrations locally is important to verify the third-party canister's integration functionality without paying cycles or using production environments.

The `dfx deps` command includes the following subcommands:

- `dfx deps pull`: Pulls the dependencies from the mainnet and generates `deps/pulled.json`. The Candid files of direct dependencies will also be put into `deps/candid/`.
- `dfx deps init`: Sets the `init` arguments for the pulled dependencies and saves the data in `deps/init.json`.
- `dfx deps deploy`: Deploys the pulled dependencies on the local replica with the `init` arguments recorded in `deps/init.json`.

## Workflow overview

Let's take a look at how the `dfx deps` workflow operates. There are two roles: the **service provider** and the **service consumer**.

### Service provider

The **service provider** is responsible for configuring a canister to be `pullable`.

For a canister to be `pullable`, the following should be true:
- The canister provides a public service at a static canister ID.
- The wasm module of a `pullable` canister must be hosted via a URL so that service consumers can download it when pulling the dependency.

Canisters that do not use a static canister ID, or do not provide a public service that can be utilized by other developers, should not be configured to be `pullable`.

A canister is configured to be `pullable` by editing the `dfx.json` file to include the following information:

```
{
  "canisters": {
    "service": {
      "type": "motoko",
      "main": "src/pullable/main.mo",
      "pullable": {
        "dependencies": [],
        "wasm_url": "https://github.com/lwshang/pullable/releases/latest/download/service.wasm",
        "init_guide": "A natural number, e.g. 1"
      }
    }
  }
}
```

- `wasm_url`: A URL used to download the canister wasm module which will be deployed locally.
- `wasm_hash`: A SHA256 hash of the wasm module located at `wasm_url`. This field is optional. In most cases, the wasm module at `wasm_url` will be the same as the onchain wasm module.
- `dependencies`: An array of Canister IDs (Principal) of direct dependencies.
- `init_guide`: A message to guide consumers how to initialize the canister.

### Service consumer

Once a canister is `pullable`, a **service consumer** can pull the canister as a dependency directly from the mainnet and then deploy the dependency on a local replica.

To pull the dependencies from the mainnet, the `dfx.json` file must include the dependencies configuration for the canister.

For example, the following `dfx.json` file configures two dependencies for the canister `dapp`. Both of these dependencies have static canister IDs of:

- "dep_b" has canister ID of yhgn4-myaaa-aaaaa-aabta-cai on the mainnet.
- "dep_c" has canister ID of yahli-baaaa-aaaaa-aabtq-cai on the mainnet.

```
{
    "canisters": {
        "dapp": {
            "type": "motoko",
            "main": "src/main.mo",
            "dependencies": [
                "dep_b", "dep_c"
            ]
        },
        "dep_b": {
            "type": "pull",
            "id": "yhgn4-myaaa-aaaaa-aabta-cai"
        },
        "dep_c": {
            "type": "pull",
            "id": "yahli-baaaa-aaaaa-aabtq-cai"
        }
    }
}
```

Then, these dependencies can be pulled using the `dfx deps pull` command. By default, the `dfx deps pull` connects to the mainnet. To deploy locally, the `--network local` flag can be used.

When this command is called, several things happen in the background, including:

- The dependency graph is resolved by fetching the dependencies field in the `dfx` metadata recursively.
- The wasm of all direct and indirect dependencies is downloaded from the `wasm_url` into the shared cache.
- The hash of the downloaded wasm is verified against `wasm_hash` metadata or the hash of the canister deployed on the mainnet.
- The `candid:args`, `candid:service`, and `dfx metadata` will be extracted from the downloaded wasm.
- The `deps/` folder is created in the project root.
- The `candid:service` of direct dependencies is saved as `deps/candid/<CANISTER_ID>.did`.
- The `deps/pulled.json` file is saved, which contains major info of all direct and indirect dependencies.

Once the `dfx deps pull` command has been run, the init arguments can be set with the `dfx deps init` command. This command will iterate over all dependencies in the `pulled.json` file and set an empty argument for any that do not need an init argument. Then, it will print the list of dependencies that do require an init argument.

Running the command `dfx deps init <CANISTER> --argument <ARGUMENT>` will set the init argument for an individual dependency. The init arguments will be recorded in `deps/init.json`.

Below are examples of running the `dfx deps init` command with init arguments:

```
dfx deps init yofga-2qaaa-aaaaa-aabsq-cai --argument 10
dfx deps init deps_c --argument 20
```

After this step, the pulled dependencies can be deployed on a local replica using the `dfx deps deploy` command. This command will create the dependencies on the local replica with the same mainnet canister ID. Then, it will install the downloaded wasm with the init arguments in the `init.json` file.

`dfx deps deploy` always creates the canister with the anonymous identity so that dependencies and application canisters will have different controllers. It also will always install the canister in "reinstall" mode so that the canister status will be discarded.

## Conclusion

The `dfx deps` feature is available in dfx versions `0.14.1` and newer. You can learn more from our [developer documentation](/building-apps/advanced/using-third-party-canisters), which includes an interactive example you can use to test the feature for yourself.

As always, please let us know if you have any feedback either through our [forum](https://forum.dfinity.org/) or [Discord server](https://discord.com/invite/5PJMmmETQB).

-DFINITY
