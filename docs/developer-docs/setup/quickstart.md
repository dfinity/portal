# Developer quick start

## Overview

This guide is designed as a minimal quick start tutorial for creating a project on the Internet Computer. Other developer documentation pages provide additional supporting context to the concepts and workflows used within this page, and they will be linked for reference accordingly. 

## Prerequisites

To follow this quick start guide, you will need to have the following:

- A connection to the internet.
- A command line interface.
- [Node.js](https://nodejs.org/en) downloaded and installed.

## Install the IC SDK

The IC SDK includes `dfx`, which is a CLI tool used to create projects on ICP. It can be downloaded with the command:

```
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

For more information on installing the IC SDK, please see [here](./install/index.mdx)

## Start the local replica

To start a local instance of local replica, use the command:

```
dfx start --background
```

The `--background` flag will start the replica in the background.

## Create and deploy the template project

To create a new project with `dfx`, run the command:

```
dfx new hello_world
```

This project is a simple 'Hello, world!' project that includes a simple frontend UI. You can see a more detailed look into this project in the guide [here](/docs/current/developer-docs/setup/deploy-locally#test-the-dapp-frontend).

Then, to create, build, and deploy the project, use the `dfx deploy` command in the new project directory:

```
cd hello_world
dfx deploy
```

This command will deploy the project **locally**. To learn more about local development, including how to interact with your canister once deployed, please see [here](deploy-locally.md).

The project's local URLs will be returned in the output of this command:

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

If you want to deploy your project to the mainnet, you can use the `--network ic` flag, such as:

```
dfx deploy --network ic
```

Deploying to the mainnet will cost **cycles**. To learn more about cycles, please see [here](./cycles/index.md).

To learn more about mainnet deployment, please see [here](deploy-mainnet.md).

To deploy your project to the [Motoko playground](playground.md), which simulates the mainnet network without having to use cycles, use the `--network playground` flag, such as:

```
dfx deploy --playground
```

### Default project structure

By default, projects created with `dfx` have the following structure:

```
hello_world/
├── README.md      # Default project documentation
├── dfx.json       # Project configuration file
├── node_modules   # Libraries for frontend development
├── package-lock.json
├── package.json
├── src            # Source files directory
│   ├── hello_world_backend
│   │   └── main.mo
│   ├── hello_world_frontend
│       ├── assets
│       │   ├── logo.png
│       │   ├── main.css
│       │   └── sample-asset.txt
│       └── src
│           ├── index.html
│           └── index.js
└── webpack.config.js
```

In all new projects, the following files and directories are created:

- `README.md`: The default README file to be used for documenting your project.
- `dfx.json`: The default configuration file used to set configurable options for your project.
- `src/`: The source directory that contains all of your dapp's source files.
- `hello_world_backend`: The source directory that contains your dapp's backend code files.
- `hello_world_frontend`: The source directory that contains your dapp's frontend code files.
- `hello_world_backend/main.mo`: The default template Motoko file that can be modified or replaced to include your dapp's core programming logic. 

## Developing an app

To develop your own custom application from this point, you will need to determine which programming language to use and determine what your app's functionalities will be. 

- [Choosing a programming language](../backend/choosing-language.md).
  
- [Designing a dapp](../backend/design-dapps.md).

### Developing with Motoko

- [Motoko quick start.](../backend/motoko/at-a-glance.md).

### Developing with Rust

- [Rust quick start](../backend/rust/4-quickstart.md).

### Using Candid

- [Candid](../backend/candid/index.md).

### Developing with agents

- [Agents](../agents/index.md).

### Developing with frontend frameworks

- React.
- Svelte.
- Vue.

### Developing with tokens and ledgers

- [ICP ledger local setup](../integrations/ledger/ledger-local-setup.md).

- [ICP index local setup](../integrations/ledger/icp-index-local-setup.md).

- [ICRC-1 ledger setup](../integrations/icrc-1/icrc1-ledger-setup.md).

- [ICRC-1 index local setup](../integrations/icrc-1/icrc1-index-setup.md).

### Integrating with Internet Identity

- [Integrating with Internet Identity](../integrations/internet-identity/integrate-identity.md).

## Resources

For a more comprehensive series of tutorials on developing on ICP, check out the [developer journey series](../../tutorials/developer-journey/index.md).


