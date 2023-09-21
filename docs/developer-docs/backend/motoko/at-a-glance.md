# 4: Motoko quick start

## Overview

The [1.3: Deploying your first dapp](/docs/tutorials/developer-journey/level-1/1.3-first-dapp.md) developer journey tutorial provides a fast path to deploying a simple default application without stopping to admire the scenery along the way. Individual tutorials in this section walk through specific scenarios, pointing out details about what you’re doing in each step.

If the quick start and tutorials are not quite your style, this at-a-glance cheat sheet summarizes the steps to follow for quick reference.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./dev-env.md).

## Creating a new project

Open a terminal window on your local computer, if you don’t already have one open.

Create a new project and change to the project directory.

```
dfx new <project_name> && cd <project_name>>
```

## Editing the default files

Edit the `src/<project_name>_backend` files to define your service or application.

Edit the `src/<project_name>_frontend` files with HTML, JavaScript, and CSS that provides the frontend for your service or application.

## Starting the deployment environment

Start the Internet Computer for local development or check your connection to the Internet Computer for network deployment:
- [Local deployment](../../setup/deploy-locally.md).
- [Mainnet deployment](../../setup/deploy-mainnet.md).

## Register, build, and deploy locally or on the mainnet 

For the mainnet, use: `--network ic`.

```
dfx deploy --network <network>
```

## View your service or application in a browser, using the URLS in the output of the `dfx deploy` command:

```
...
Committing batch.
Committing batch with 18 operations.
Deployed canisters.
URLs:
Frontend canister via browser
        access_hello_frontend: http://127.0.0.1:8080/?canisterId=cuj6u-c4aaa-aaaaa-qaajq-cai
Backend canister via Candid interface:
        access_hello_backend: http://127.0.0.1:8080/?canisterId=cbopz-duaaa-aaaaa-qaaka-cai&id=ctiya-peaaa-aaaaa-qaaja-cai
```

## Next steps

For a more detailed look at writing and deploying canisters, move onto the [writing and deploying canisters page](deploying.md).