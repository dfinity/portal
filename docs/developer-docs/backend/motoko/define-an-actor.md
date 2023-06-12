# 8: Querying using an actor

## Overview

In the [deploy your first dapp in 5 minutes](/tutorials/deploy_sample_app.md), you had your first look at a simple canister for the Internet Computer involving an actor object and asynchronous messaging. As the next step in learning to write canisters that take advantage of actor-based messaging, this guide illustrates how to modify a traditional `Hello, World!` canister to define an actor, then deploy and test your canister on a local canister execution environment.

## Prerequisites

Before starting the guide, verify the following:

-   [x] You have downloaded and installed the IC SDK package as described in the [download and install](/developer-docs/setup/install/index.mdx) page.

-   [x] You have stopped any local canister execution environment processes

## Create a new project

To create a new project for this guide:

- #### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

- #### Step 2:  Change to the folder you are using for your Internet Computer projects, if you are using one.

- #### Step 3:  Create a new project by running the following command:

        dfx new actor_hello

- #### Step 4:  Change to your project directory by running the following command:

        cd actor_hello

## Modify the default configuration

In the [exploring the default project](explore-templates) tutorial, you saw that creating a new project adds a default `dfx.json` configuration file to your project directory. In this guide, you need to modify a few of the default settings to reflect your project.

To modify the `dfx.json` configuration file:

- #### Step 1:  Open the `dfx.json` configuration file in a text editor.

- #### Step 2:  Check the default settings for the `actor_hello` project.

- #### Step 3:  Notice that the names and paths to source and output files all use the `actor_hello` project name.

    For example, the default canister name is `actor_hello` and the default path to the main code file is `src/actor_hello/main.mo`.

    You can rename any of these files or directories. If you make any changes, however, be sure that the names you use for your files and directories on the file system match the names you specify in the `dfx.json` configuration file. If you plan to use the default directory and file names, no changes are necessary.

- #### Step 4:  Remove all of the `actor_hello_assets` configuration settings from the file.

    The sample canister for this guide doesn’t use any frontend assets, so you can remove those settings from the configuration file.

    For example, the configuration file looks like [this](./_attachments/define-actor-dfx.json) after you remove the `actor_hello_assets` section.

- #### Step 5:  Save your changes and close the file to continue.

## Modify the default canister

In the [exploring the default project](explore-templates) tutorial, you saw that creating a new project creates a default `src` directory with a template `main.mo` file. In this guide, you modify the template code to create a simple "Hello, World!" canister. by defining an actor in Motoko. In Motoko, an ICP canister is represented as a Motoko actor.

To modify the default template source code:

- #### Step 1:  Change to the source code directory for your project by running the following command:

        cd src/actor_hello

- #### Step 2:  Open the template `main.mo` file in a text editor and delete the existing content.

    The next step is to write a canister that prints a statement like the traditional "Hello, World!" sample canister. To compile the canister for the Internet Computer, however, your Motoko code must define an `actor`.

- #### Step 3:  Copy and paste [this code](./_attachments/actor_hello.mo) into the `main.mo` file.

    Let’s take a closer look at this Motoko actor defining our canister:

    -   The code imports a `Debug` module to provide the `print` functionality.

    -   The actor uses the `public query func` declaration to define an Internet Computer *query* method. Our method doesn’t need to make any permanent changes to the state of the actor. Declaring it as a query means that any changes it does make are transient and discarded after the query completes.

    For more information about using a query call, see [query calls](/concepts/canisters-code.md#query-update) in [Canisters include both program and state](/concepts/canisters-code.md#canister-state).

- #### Step 4:  Save your changes and close the `main.mo` file.

## Checking that the canister builds

Usually, in order to build a canister, it’s necessary to first reserve a unique canister identifier on the Internet Computer blockchain mainnet.

However, it’s also possible to compile your program without connecting to the Internet Computer blockchain mainnet at all. The `dfx build --check` command uses a temporary, hard-coded canister identifier to accomplish this.

To check that the canister builds:

- #### Step 1:  Navigate back to the root of your project directory.

- #### Step 2:  Build the canister executable with a temporary, hard-coded identifier by running the following command:

        dfx build --check

    The `--check` option enables you to build a project locally to verify that it compiles and to inspect the files produced. Because the `dfx build --check` command only uses a temporary identifier, you should see output similar to the following:

        Building canisters to check they build ok. Canister IDs might be hard coded.
        Building canisters...

    If the canister compiles successfully, you can inspect the output in the default `.dfx/local/canisters` directory and `.dfx/local/canisters/actor_hello/` subdirectory.

    For example, you might use the `tree` command to review the files created:

        tree .dfx/local/canisters

    The command displays output similar to the following

```
    .dfx/local/canisters
    ├── actor_hello
    │   ├── actor_hello.d.ts
    │   ├── actor_hello.did
    │   ├── actor_hello.did.js
    │   ├── actor_hello.js
    │   └── actor_hello.wasm
    └── idl

    2 directories, 5 files
```

## Deploy the project

You cannot deploy the output from the `dfx build --check` command to a local canister execution environment or the Internet Computer mainnet. If you wanted to deploy this project, you would need to do the following:

-   Connect to the either the local canister execution environment or the Internet Computer mainnet.

-   Register a connection-specific canister identifier.

-   Deploy the canister.

Let’s consider these steps in a bit more detail. Before you can deploy this project, you must connect to either your local canister execution environment, provided by `dfx`, or to the Internet Computer blockchain mainnet. After you connect to a local canister execution environment or the mainnet, you must also generate a unique, **connection-specific** canister identifier to replace your locally-defined identifier. To see the steps involved for yourself, let’s deploy the project locally.

To deploy this project locally:

- #### Step 1:  Open a terminal and navigate to your project directory, if needed.

- #### Step 2:  Start the local canister execution environment on your local computer by running the following command:

        dfx start --background

    For this guide, you can use the `--background` option to start the local canister execution environment as background processes. With this option, you can continue to the next step without opening another terminal shell on your local computer.

- #### Step 3:  Generate a new canister identifier for your project on the local canister execution environment by running the following command:

        dfx canister create actor_hello

    You should see output similar to the following:

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "pubs-id" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Creating canister "actor_hello"...
        "actor_hello" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"

    The `dfx canister create` command also stores the connection-specific canister identifier in a `canister_ids.json` file in the `.dfx/local` directory.

    For example:

        {
          "actor_hello": {
            "local": "rrkah-fqaaa-aaaaa-aaaaq-cai"
          }
        }

- #### Step 4:  Build the canister by running the following command:

        dfx build

    The command displays output similar to the following:

        Building canisters...

- #### Step 5:  Deploy your `actor_hello` project on the local canister execution environment by running the following command:

        dfx canister install actor_hello

    The command displays output similar to the following:

        Installing code for canister actor_hello, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai

## Query the canister

You now have a canister deployed on your local canister execution environment and can test your canister by using the `dfx canister call` command.

To test the canister you have deployed on the local canister execution environment:

- #### Step 1:  Use `dfx canister call` to call the `hello` function by running the following command:

        dfx canister call actor_hello hello

- #### Step 2:  Verify that the command returns the text specified for the `hello` function along with a checkpoint message in the terminal running the local canister execution environment.

    For example, the canister displays "Hello, World from DFINITY" in output similar to the following:

        [Canister rrkah-fqaaa-aaaaa-aaaaq-cai] Hello, World from DFINITY

:::info
Note that if you are running the Internet Computer mainnet in a separate terminal instead of in the background, the "Hello, World from DFINITY" message is displayed in the terminal that displays the mainnet activity.
:::

## Stop the local canister execution environment

After you finish experimenting with your canister, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local canister execution environment, you can:

- #### Step 1:  In the terminal used to interact with your canister, issue the command `dfx stop`; or

- #### Step 2:  In the terminal that displays operations from the local canister execution environment, press Control-C to interrupt that process; or

- #### Step 3:  Kill the `replica` process using commands or tools of your operating system.

- #### Step 4:  Stop the local canister execution environment by running the following command:

        dfx stop
