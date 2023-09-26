# 5: Writing and deploying canisters

## Overview

This guide covers the basics of writing and deploying Motoko canisters. For detailed information about Motoko's fundamentals, check out the [Motoko fundamentals](infrastructure.md) page.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./dev-env.md).

## Create a new project

Open a terminal window on your local computer, if you don’t already have one open.

To create a new project, run the command:

```
dfx new explore_hello
```

Then, navigate into the project with the command:

```
cd explore_hello
```

## Review the default configuration

By default, creating a new project adds some template files to your project directory. You can edit these template files to customize the configuration settings for your project and to include your own code to speed up the development cycle.

Open the `dfx.json` configuration file in a text editor to review the default settings.

It may look like this:

```
{
"canisters": {
    "explore_hello_backend": {
    "main": "src/explore_hello_backend/main.mo",
    "type": "motoko"
    },
    "explore_hello_frontend": {
    "dependencies": [
        "explore_hello_backend"
    ],
    "frontend": {
        "entrypoint": "src/explore_hello_frontend/src/index.html"
    },
    "source": [
        "src/explore_hello_frontend/assets",
        "dist/explore_hello_frontend/"
    ],
    "type": "assets"
    }
},
"defaults": {
    "build": {
    "args": "",
    "packtool": ""
    }
},
"output_env_file": ".env",
"version": 1
}
```

Let’s take a look at a few of the default settings.

-   The `settings` section specifies the name of the WebAssembly module for your `explore_hello` project is `explore_hello`.

-   The `canisters.explore_hello` key specifies that the main program to be compiled is located in the path specified by the `main` setting, in this case, `src/explore_hello/main.mo` and the `type` setting indicates that this is a `motoko` program.

-   The `canisters.explore_hello_assets` key specifies configuration details about frontend assets for this project. Let’s skip those for now.

-   The `dfx` setting is used to identify the version of the software used to create the project.

-   The `networks` section specifies information about the networks to which you connect. The default settings bind the local canister execution environment to the local host address `127.0.0.1` and port `4943`.

If you have access to other Internet Computer network providers, the `networks` section can include network aliases and URLs for connecting to those providers.

You can leave the default settings as they are.

Close the `dfx.json` file to continue.

## Writing canister code

New projects always include a template `main.mo` source code file. You can edit this file to include your own code to speed up the development cycle.

Let’s take a look at the sample program in the default `main.mo` template file as a starting point for creating simple dapp using the Motoko programming language.

Open the `src/explore_hello_backend/main.mo` file in a text editor and review the code in the template:

```
actor {
    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };
};
```

Let’s take a look at a few key elements of this program:

-   You might notice that this sample code defines an `actor` instead of a `main` function, which some programming languages require. For Motoko, the `main` function is implicit in the file itself.

-   Although the traditional "Hello, World!" program illustrates how you can print a string using a `print` or `println` function, that traditional program would not represent a typical use case for Motoko dapps that run on the Internet Computer.

-   Instead of a print function, this sample program defines an `actor` with a public `greet` function that takes a `name` argument with a type of `Text`.

-   The program then uses the `async` keyword to indicate that the program returns an asynchronous message consisting of a concatenated text string constructed using `"Hello, "`, the `#` operator, the `name` argument, and `"!"`.

We’ll explore code that uses `actor` objects and asynchronous message handling more a little later. For now, you can continue to the next section.

Close the `main.mo` file to continue.

## Start the local canister execution environment

Before you can deploy the default project, you need to connect to either the local canister execution environment, or to the Internet Computer blockchain mainnet.

Starting the local canister execution environment requires a `dfx.json` file, so you should be sure you are in your project’s root directory. For this guide, you should have two separate terminal shells, so that you can start and see network operations in one terminal and manage your project in another.

To start the local canister execution environment, first open a new terminal window or a new terminal tab on your local computer.

:::info
    -   You should now have **two terminals** open.
    -   You should have the **project directory** as your **current working directory**.
:::

Start the local canister execution environment by running the following command:

```
dfx start
```

Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

After you start the local canister execution environment, you have one terminal that displays messages about network operations and another for performing project-related tasks.

Leave the terminal that displays network operations open and switch your focus to the terminal where you created your new project.

## Register canister identifiers

After you connect to the local canister execution environment, you can register with the network to generate unique, network-specific **canister identifiers** for your project.

In the [1.3: Deploying your first dapp](/docs/tutorials/developer-journey/level-1/1.3-first-dapp.md) developer journey tutorial, this step was performed as part of the `dfx deploy` command work flow. This guide demonstrates how to perform each of the operations independently.

To register canister identifiers for the local network, register unique canister identifiers for the canisters in the project by running the following command:

```
dfx canister create --all
```

The command displays the network-specific canister identifiers for the canisters defined in the `dfx.json` configuration file.

```
Creating canister explore_hello_backend...
explore_hello_backend canister created with canister id: br5f7-7uaaa-aaaaa-qaaca-cai
Creating canister explore_hello_frontend...
explore_hello_frontend canister created with canister id: bw4dl-smaaa-aaaaa-qaacq-cai
```

Because you are connected to the local canister execution environment, these canister identifiers are only valid locally and are stored for the project in the `.dfx/local/canister_ids.json` file.

For example:

```
{
"explore_hello_backend": {
    "local": "br5f7-7uaaa-aaaaa-qaaca-cai"
},
"explore_hello_frontend": {
    "local": "bw4dl-smaaa-aaaaa-qaacq-cai"
}
}
```

## Build the dapp

Now that you have explored the default configuration settings and program code and have started the local canister execution environment, let’s compile the default program into an executable WebAssembly module.

In the terminal window on your local computer, navigate to your `explore_hello` project directory.

Build the executable canister by running the following command:

```
dfx build
```

You should see output similar to the following:

```
Building canisters...
Building frontend...
WARN: Building canisters before generate for Motoko
Generating type declarations for canister explore_hello_frontend:
src/declarations/explore_hello_frontend/explore_hello_frontend.did.d.ts
src/declarations/explore_hello_frontend/explore_hello_frontend.did.js
src/declarations/explore_hello_frontend/explore_hello_frontend.did
Generating type declarations for canister explore_hello_backend:
src/declarations/explore_hello_backend/explore_hello_backend.did.d.ts
src/declarations/explore_hello_backend/explore_hello_backend.did.js
src/declarations/explore_hello_backend/explore_hello_backend.did
```

Because you are connected to the local canister execution environment, the `dfx build` command adds the `canisters` directory under the `.dfx/local/` directory for the project.

Verify that the `.dfx/local/canisters/explore_hello_backend` directory created by the `dfx build` command contains the WebAssembly and related application files by running the following command.

```
ls -l .dfx/local/canisters/explore_hello_backend/
```

For example, the command returns output similar to the following:

```
-rw-rw-rw-  1 pubs  staff      47 Jun 14 15:43 constructor.did
-rw-r--r--  1 pubs  staff      47 Jun 14 15:43 explore_hello_backend.did
-rw-r--r--  1 pubs  staff      32 Jun 14 15:43 explore_hello_backend.most
-rw-r--r--  1 pubs  staff  134640 Jun 14 15:43 explore_hello_backend.wasm
-rw-r--r--  1 pubs  staff    2057 Jun 14 15:43 index.js
-rw-rw-rw-  1 pubs  staff       2 Jun 14 15:43 init_args.txt
-rw-rw-rw-  1 pubs  staff      47 Jun 14 15:43 service.did
-rw-r--r--  1 pubs  staff     175 Jun 14 15:43 service.did.d.ts
-rw-r--r--  1 pubs  staff     174 Jun 14 15:43 service.did.js
```

The `canisters/explore_hello_backend` directory contains the following key files:

-   The `explore_hello_backend.did` file contains an interface description for your main dapp.

-   The `index.js` file contains a JavaScript representation of the canister interface for the functions in your dapp.

-   The `explore_hello_backend.wasm` file contains the compiled WebAssembly for the assets used in your project.

The `canisters/explore_hello_frontend` directory contains similar files to describe the frontend assets associated with your project.

In addition to the files in the `canisters/explore_hello_backend` and the `canisters/explore_hello_frontend` directories, the `dfx build` command creates an `idl` directory.

Verify that a new folder has been created, `src/declarations`. This folder will include copies of the folders from `.dfx/local`, except for the wasm. They do not contain any secrets, and we recommend committing these files along with the rest of your source code.

## Deploy the project locally

You’ve seen that the `dfx build` command creates several artifacts in a `canisters` directory for your project. The WebAssembly modules and the `canister_manifest.json` file are required for your dapp to be deployed on the Internet Computer network.

In a terminal shell on your local computer, navigate to your `explore_hello` project directory.

Deploy your `explore_hello` project on the local network by running the following command:

```
dfx canister install --all
```

The command displays output similar to the following:

```
Installing code for canister explore_hello_backend, with canister ID br5f7-7uaaa-aaaaa-qaaca-cai
Installing code for canister explore_hello_frontend, with canister ID bw4dl-smaaa-aaaaa-qaacq-cai
Uploading assets to asset canister...
Fetching properties for all assets in the canister.
Starting batch.
```

Run the `dfx canister call` command and specify the dapp and function to call by running the following command:

```
dfx canister call explore_hello_backend greet '("everyone": text)'
```

This command specifies:

-   `explore_hello` as the name of the **canister** or dapp you want to call.

-   `greet` as the specific **method** or function you want to call.

-   `everyone` as the argument to pass to the `greet` function.

Verify the command displays the return value of the `greet` function.

For example:

```
("Hello, everyone!")
```

## View the default frontend

If you have `node.js` installed in your development environment, your project includes a simple frontend example that uses a template `index.js` JavaScript file for accessing the `explore_hello` dapp in a browser.

Open a terminal window on your local computer, if you don’t already have one open, and navigate to your `explore_hello` project directory.

Open the `src/explore_hello_frontend/src/index.js` file in a text editor and review the code in the template script:

```
import { explore_hello } from "../../declarations/explore_hello_backend";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value.toString();
    // Interact with explore_hello actor, calling the greet method
    const greeting = await explore_hello_backend.greet(name);

    document.getElementById("greeting").innerText = greeting;
});
```

The template `index.js` imports an `explore_hello` agent from our newly created `declarations` directory. The agent is automatically configured to interact with the interface we created in `Main.mo`, and makes calls to our canister using an `AnonymousIdentity` when the user clicks the `greeting` button.

This file works in conjunction with the template `index.html` file to display an HTML page with an image asset, input field, and button for the `greet` function.

Close the `index.js` file to continue.

View the frontend assets created for the project by running following command:

```
ls -l .dfx/local/canisters/explore_hello_frontend/
```

The command displays output similar to the following:

```
-rw-r--r--  1 pubs  staff    6269 Dec 31  1969 assetstorage.did
-rw-r--r--  1 pubs  staff  432762 Jun 14 15:47 assetstorage.wasm.gz
-rw-rw-rw-  1 pubs  staff    6269 Dec 31  1969 constructor.did
-rw-r--r--  1 pubs  staff  432762 Jun 14 15:47 explore_hello_frontend.wasm.gz
-rw-r--r--  1 pubs  staff    2064 Jun 14 15:47 index.js
-rw-rw-rw-  1 pubs  staff       2 Jun 14 15:47 init_args.txt
-rw-rw-rw-  1 pubs  staff    6269 Jun 14 15:47 service.did
-rw-r--r--  1 pubs  staff    6582 Jun 14 15:47 service.did.d.ts
-rw-r--r--  1 pubs  staff    7918 Jun 14 15:47 service.did.js
```

These files were generated automatically by the `dfx build` command using node modules and the template `index.js` file.

Then, start a development server with `npm start`.

The output should resemble the following:

```
> explore_hello_frontend@0.2.0 start
> webpack serve --mode development --env development

<i> [webpack-dev-server] [HPM] Proxy created: /api  -> http://127.0.0.1:4943
<i> [webpack-dev-server] [HPM] Proxy rewrite rule created: "^/api" ~> "/api"
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8083/
<i> [webpack-dev-server] On Your Network (IPv4): http://192.168.0.144:8083/
<i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:8083/
```

Open a browser and navigate to the "Loopback" or "On Your Network (IPv4)" URL address in a web browser.

Verify that you see the HTML page for the sample application.

For example:

![Sample HTML entry page](_attachments/explore-hello.png)

Type a greeting, then click **Click Me** to return the greeting.

For example:

![Return the name argument](_attachments/greeting.png)

## Next steps

For more information on deploying, deleting or managing canisters, view the [managing canisters documentation](https://internetcomputer.org/docs/current/developer-docs/setup/manage-canisters).

For the next step in this guide, check out the [upgrading canisters guide](upgrading.md)