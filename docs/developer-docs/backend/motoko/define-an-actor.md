# 14: Querying using an actor

## Overview

In the [1.3: Deploying your first dapp](/docs/tutorials/developer-journey/level-1/1.3-first-dapp.md) developer journey tutorial, you had your first look at a simple canister for the Internet Computer involving an actor object and asynchronous messaging. As the next step in learning to write canisters that take advantage of actor-based messaging, this guide illustrates how to modify a traditional `Hello, World!` canister to define an actor, then deploy and test your canister on a local canister execution environment.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./dev-env.md).

## Create a new project

Open a terminal shell on your local computer, if you don’t already have one open.

Create a new project by running the following command:

```
dfx new actor_hello
```

Change to your project directory by running the following command:

```
cd actor_hello
```

## Modify the default configuration

In the [exploring the default project](explore-templates) tutorial, you saw that creating a new project adds a default `dfx.json` configuration file to your project directory. In this guide, you need to modify a few of the default settings to reflect your project.

Open the `dfx.json` configuration file in a text editor. Check the default settings for the `actor_hello` project.

Notice that the names and paths to source and output files all use the `actor_hello` project name.

For example, the default canister name is `actor_hello_backend` and the default path to the main code file is `src/actor_hello_backend/main.mo`.

You can rename any of these files or directories. If you make any changes, however, be sure that the names you use for your files and directories on the file system match the names you specify in the `dfx.json` configuration file. If you plan to use the default directory and file names, no changes are necessary.

Remove all of the `actor_hello_assets` configuration settings from the file.

The sample canister for this guide doesn’t use any frontend assets, so you can remove those settings from the configuration file.

For example, if you remove the `actor_hello_assets` section, the configuration file looks like this:


```
    {
    "canisters": {
        "actor_hello": {
        "main": "src/actor_hello/main.mo",
        "type": "motoko"
        }
    },
    "defaults": {
        "build": {
        "packtool": ""
        }
    },
    "version": 1
    }
```

Save your changes and close the file to continue.

## Modify the default canister

In the [exploring the default project](explore-templates) tutorial, you saw that creating a new project creates a default `src` directory with a template `main.mo` file. In this guide, you modify the template code to create a simple "Hello, World!" canister. by defining an actor in Motoko. In Motoko, an ICP canister is represented as a Motoko actor.

Change to the source code directory for your project by running the following command:

```
cd src/actor_hello_backend
```

Open the template `main.mo` file in a text editor and delete the existing content.

The next step is to write a canister that prints a statement like the traditional "Hello, World!" sample canister. To compile the canister for the Internet Computer, however, your Motoko code must define an `actor`.

Copy and paste this code into the `main.mo` file:

```
import Debug "mo:base/Debug";
actor HelloActor {
   public query func hello() : async () {
      Debug.print ("Hello, World from DFINITY \n");
   }
};
```

Let’s take a closer look at this Motoko actor defining our canister:

-   The code imports a `Debug` module to provide the `print` functionality.

-   The actor uses the `public query func` declaration to define an Internet Computer *query* method. Our method doesn’t need to make any permanent changes to the state of the actor. Declaring it as a query means that any changes it does make are transient and discarded after the query completes.

For more information about using a query call, see [query calls](/concepts/canisters-code.md#query-update) in [canisters include both program and state](/concepts/canisters-code.md#canister-state).

Save your changes and close the `main.mo` file.

## Checking that the canister builds

Usually, in order to build a canister, it’s necessary to first reserve a unique canister identifier on the Internet Computer blockchain mainnet.

However, it’s also possible to compile your program without connecting to the Internet Computer blockchain mainnet at all. The `dfx build --check` command uses a temporary, hard-coded canister identifier to accomplish this.

Navigate back to the root of your project directory.

Build the canister executable with a temporary, hard-coded identifier by running the following command:

```
dfx build --check
```

The `--check` option enables you to build a project locally to verify that it compiles and to inspect the files produced. Because the `dfx build --check` command only uses a temporary identifier, you should see output similar to the following:

```
WARN: Building canisters to check they build ok. Canister IDs might be hard coded.
Building canisters...
Building frontend...
WARN: Building canisters before generate for Motoko
Generating type declarations for canister actor_hello_frontend:
src/declarations/actor_hello_frontend/actor_hello_frontend.did.d.ts
src/declarations/actor_hello_frontend/actor_hello_frontend.did.js
src/declarations/actor_hello_frontend/actor_hello_frontend.did
Generating type declarations for canister actor_hello_backend:
src/declarations/actor_hello_backend/actor_hello_backend.did.d.ts
src/declarations/actor_hello_backend/actor_hello_backend.did.js
src/declarations/actor_hello_backend/actor_hello_backend.did
```

If the canister compiles successfully, you can inspect the output in the default `.dfx/local/canisters` directory and `.dfx/local/canisters/actor_hello_backend/` subdirectory.

For example, you might use the `tree` command to review the files created:

```
tree .dfx/local/canisters
```

The command displays output similar to the following:

```
.dfx/local/canisters
├── actor_hello_backend
│   ├── actor_hello_backend.did
│   ├── actor_hello_backend.most
│   ├── actor_hello_backend.wasm
│   ├── constructor.did
│   ├── index.js
│   ├── init_args.txt
│   ├── service.did
│   ├── service.did.d.ts
│   └── service.did.js
├── actor_hello_frontend
│   ├── actor_hello_frontend.wasm.gz
│   ├── assetstorage.did
│   ├── assetstorage.wasm.gz
│   ├── constructor.did
│   ├── index.js
│   ├── init_args.txt
│   ├── service.did
│   ├── service.did.d.ts
│   └── service.did.js
└── idl
    └── 6m2n7-okd37-knyui-nvnda.did

    4 directories, 19 files
```

## Deploy the project

You cannot deploy the output from the `dfx build --check` command to a local canister execution environment or the Internet Computer mainnet. If you wanted to deploy this project, you would need to do the following:

-   Connect to the either the local canister execution environment or the Internet Computer mainnet.

-   Register a connection-specific canister identifier.

-   Deploy the canister.

Let’s consider these steps in a bit more detail. Before you can deploy this project, you must connect to either your local canister execution environment, provided by `dfx`, or to the Internet Computer blockchain mainnet. After you connect to a local canister execution environment or the mainnet, you must also generate a unique, **connection-specific** canister identifier to replace your locally-defined identifier. To see the steps involved for yourself, let’s deploy the project locally.

To deploy this project locally, open a terminal and navigate to your project directory, if needed.

Start the local canister execution environment on your local computer by running the following command:

```
dfx start --background
```

For this guide, you can use the `--background` option to start the local canister execution environment as background processes. With this option, you can continue to the next step without opening another terminal shell on your local computer.

Generate a new canister identifier for your project on the local canister execution environment by running the following command in your project's directory:

```
dfx canister create actor_hello_backend
```

You should see output similar to the following:

```
Creating canister actor_hello_backend...
actor_hello_backend canister created with canister id: dzh22-nuaaa-aaaaa-qaaoa-cai
```

The `dfx canister create` command also stores the connection-specific canister identifier in a `canister_ids.json` file in the `.dfx/local` directory.

For example:

```
{
"actor_hello_backend": {
    "local": "dzh22-nuaaa-aaaaa-qaaoa-cai"
    }
}
```

Deploy your `actor_hello_backend` project on the local canister execution environment by running the following command:

```
dfx deploy
```

The command displays output similar to the following:

```
Committing batch.
Committing batch with 18 operations.
Deployed canisters.
URLs:
Frontend canister via browser
    actor_hello_frontend: http://127.0.0.1:8080/?canisterId=d6g4o-amaaa-aaaaa-qaaoq-cai
Backend canister via Candid interface:
    actor_hello_backend: http://127.0.0.1:8080/?canisterId=dxfxs-weaaa-aaaaa-qaapa-cai&id=dzh22-nuaaa-aaaaa-qaaoa-cai
```

## Query the canister

You now have a canister deployed on your local canister execution environment and can test your canister by using the `dfx canister call` command.

Use `dfx canister call` to call the `hello` function by running the following command:

```
dfx canister call actor_hello_backend hello
```

Verify that the command returns the text specified for the `hello` function along with a checkpoint message in the terminal running the local canister execution environment.

For example, the canister displays "Hello, World from DFINITY" in output similar to the following:

```
2023-06-14 20:19:25.379721 UTC: [Canister bkyz2-fmaaa-aaaaa-qaaaq-cai] Hello, World from DFINITY 
```

:::info
Note that if you are running the Internet Computer mainnet in a separate terminal instead of in the background, the "Hello, World from DFINITY" message is displayed in the terminal that displays the mainnet activity.
:::

## Next steps
Next, let's take a look at using [multiple-actors](multiple-actors.md).