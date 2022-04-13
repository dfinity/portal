---
title: Hello World
---

# How to Deploy a "Hello World" Smart Contract in 20 Minutes

This is a fast and minimalist tutorial for deploying a "hello world"
canister smart contract to the IC in 20 minutes or less. All that is
necessary to run this tutorial is basic knowledge of using a terminal. No code editing is required.

## Introduction

In this tutorial, we will deploy a simple `Hello` canister smart
contract that has just one function called `greet`. The `greet` function
accepts one text argument and returns the result with a greeting. For
example, if you call the `greet` method with the text argument `Alice`.

* If you call it via the command-line, dapp will return `Hello, Alice!` in a terminal

* If you access the dapp in a browser, it will alert pop-up window reading `Hello, Alice!`

While the code comes ready out of the box for you, this dapp consists of
back-end code written in Motoko, a programming language specifically
designed for interacting with the Internet Computer (IC), and a simple
webpack-based front-end.

### Concepts necessary for this tutorial

* **Canister smart contract:** A *canister smart contract*, or *canister* for short, is a type of smart contract that bundles code and state. A canister is deployed to the IC, where it gets executed and can be accessed over the Internet. A *dapp* is a distributed application, composed of one or more canisters.

* **Cycles:** A *cycle* is the unit of measurement for
resources consumed on the IC in the form of processing, memory, storage, and
network bandwidth. Every canister has a cycles account to which
resources consumed by the canister are charged. The IC’s
utility token (ICP) can be converted to cycles and transferred to a
canister. ICP can always be converted to cycles using the current price
of ICP measured in \[SDR\] using the convention that one trillion cycles
correspond to one SDR.

In this tutorial, you will get free cycles from the cycles faucet.

## Supported operating systems

This tutorial, requires one of the following operating systems
-   Linux
-   macOS (12.\* Monterey)

Instructions for Windows, using the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install), follow soon.


## Installing tools (5 min)

To build and deploy a canister, users need to install the following:

### Node.js

There are many ways of installing node.js. On Linux, we recommend using your system's package manager. On macOS, we recommend [Homebrew](https://brew.sh). Alternatively, you find instructions on the [nodejs.org website](https://nodejs.org/en/download).

This tutorial works best with a node.js version higher than `16.*.*`.

### DFX

In this tutorial, we use a Canister SDK called `dfx`, which is the default SDK maintained by the DFINITY foundation. There are many other SDK’s so this is
just one.

To install, run:

    $ sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

To verify that `dfx` is properly installed, run:

    $ dfx --version

The terminal should look like this (at least version 0.9.2):

![dfx version](_attachments/dfx-version.png)

## Create a project (2 min)

A `dfx` project is a set of artifacts, including source code and configuration files, that can be compiled to a canister. By running 

    $ dfx new hello

`dfx` creates a new project directory called `hello`. The terminal output should look like this:

![dfx new](_attachments/dfx-new-hello-1.png)

![dfx new](_attachments/dfx-new-hello-2.png)


The `hello` project directory includes the artifacts required for a "hello world" canister and a new `hello` Git repository. Your directory should look like this:

![cd new](_attachments/cd-hello.png)


## Run your canister locally (3 min)

Now that the code is there, the next step is to spin up a local execution environment that allows you to run your canister locally. For this, we recommend using two terminals:

-   **Terminal A** shows the output of the execution environment. This is analogous to starting a local server in a web2 project, e.g. node.js’s Express, python’s Django, or Ruby’s Rails.

-   **Terminal B** is used to interact with the canister running in the execution environment. This is analogous to sending HTTP API messages to
        servers running locally, e.g. Postman or Panic.

To distinguish the two terminals in this tutorial, terminal A has a dark blue background... 

![dfx new](_attachments/dfx-new-hello-2.png)

... and terminal B has a black background. 

![terminal b ls](_attachments/terminal-b-ls.png)

### Start the execution environment

In terminal A, navigate to the root directory `hello` of our project and run

    $ dfx start

![dfx start](_attachments/terminal-a-dfx-start.png)

Note: Depending on your platform and local security settings, you might
see a warning displayed. If you are prompted to allow or deny incoming
network connections, click Allow.

That's it, there is now a local canister execution environment running on your
machine. Leave terminal A open and running while you continue. If you
close the terminal, the execution environment will stop the rest of the tutorial will fail.

### Deploy the canister locally

Note: since this is only a canister execution environment, this deployment has fewer steps than a deployment to mainnet, which requires cycles.

In terminal B, navigate to the root directory `hello` of our project. Install all the necessary node modules by running

    $ npm install

![npm install](_attachments/terminal-b-npm-install.png)

Register, build, and deploy the `hello` canister to the local execution environment by running

    $ dfx deploy

![dfx deploy](_attachments/terminal-b-dfx-deploy.png)

### Test the canister locally via the command line

Now that the canister is deployed to the local execution environment, you can interact with the canister by sending and receiving messages. Since the canister has a method called `greet` (which accepts a string as a parameter), we will send it a message. In terminal B, run

    $ dfx canister call hello greet everyone

-   The `dfx canister call` command requires you to specify a canister
    name and a function to call.

-   `hello` specifies the name of the canister you call.

-   `greet` specifies the function name.

-   `everyone` is the argument that you pass to the `greet` function.

### Test the canister locally via the browser

Now that you have verified that your dapp has been deployed and tested
its operation using the command line, let’s verify that you can access
the front-end using your web browser.

In terminal B, start the development server by running

    $ npm start

Open a browser and navigate to <http://localhost:8080/>.

You should see a simple HTML page with a sample asset
image file, an input field, and a button.

![Sample HTML page](_attachments/front-end-prompt.png)

Type a greeting, then click **Click Me** to return the greeting.

![Hello](_attachments/front-end-result.png)

## Stop the local canister execution environment

After testing the application in the browser, you can stop the local
canister execution environment so that it does not continue running in
the background.

To stop the local deployment:

1.  In the terminal A, press Control-C to interrupt the local network
    process.

2.  In the terminal B, press Control-C to interrupt the development
    server process.

3.  Stop the local canister execution environment running on your local
    computer by running the following command:

        dfx stop

## Deploying on-chain (10 min)

### Important note about cycles

In order to run on-chain,ICdapps require cycles to pay for compute and
storage. This means that the developer needs to acquire cycles and fill
their canister with them. Cycles can be converted from ICP token.

This flow may be surprising to people familiar with Web2 software where
they can add a credit card to a hosting provider, deploy their apps, and
get charged later. In Web3, blockchains require their smart contracts
consume **something** (whether it is Ethereum’s gas or the IC’s cycles).
The next steps will likely be familiar to those in crypto, but new
entrants may be confused as to why first step of deploying a dapp is
often "go get tokens."

### Acquiring cycles and adding them to your canister (Terminal B)

For the purposes of this tutorial, you can acquire free cycles for your
"hello world" dapp from the cycles faucet. Follow the instructions here:
[Claim your free cycles](cycles-faucet.md).

Few notes about cycles:

-   Cycles pay for computation and storage

-   Cycles faucet will grant developers 15 trillion cycles

-   It takes 4 trillion cycles to deploy a canister.

-   You can see a table of compute and storage costs here: [Computation
    and storage
    costs](../good-to-know/computation-and-storage-costs.md).

### Check the connection to the Internet Computer blockchain mainnet (Terminal B)

As sanity check, it is good practice to check your connection to the IC
is stable:

Check the current status of the Internet Computer blockchain and your
ability to connect to it by running the following command for the
network alias ic:

    $ dfx ping ic

If successful you should see output similar to the following:

    $ {
      "ic_api_version": "0.18.0"  "impl_hash": "d639545e0f38e075ad240fd4ec45d4eeeb11e1f67a52cdd449cd664d825e7fec"  "impl_version": "8dc1a28b4fb9605558c03121811c9af9701a6142"  "replica_health_status": "healthy"  "root_key": [48, 129, 130, 48, 29, 6, 13, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 1, 2, 1, 6, 12, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 2, 1, 3, 97, 0, 129, 76, 14, 110, 199, 31, 171, 88, 59, 8, 189, 129, 55, 60, 37, 92, 60, 55, 27, 46, 132, 134, 60, 152, 164, 241, 224, 139, 116, 35, 93, 20, 251, 93, 156, 12, 213, 70, 217, 104, 95, 145, 58, 12, 11, 44, 197, 52, 21, 131, 191, 75, 67, 146, 228, 103, 219, 150, 214, 91, 155, 180, 203, 113, 113, 18, 248, 71, 46, 13, 90, 77, 20, 80, 95, 253, 116, 132, 176, 18, 145, 9, 28, 95, 135, 185, 136, 131, 70, 63, 152, 9, 26, 11, 170, 174]
    }

### Deploying on-chain (Terminal B)

You are now ready to deploy your dapp on-chain.

    $ npm install

    $ dfx deploy --network ic

The `--network` option specifies the network alias or URL for deploying
the dapp. This option is required to install on the Internet Computer
blockchain mainnet.

If succesful, your terminal should look like this:

    Deploying all canisters.
    Creating canisters...
    Creating canister "hello"...
    "hello" canister created on network "ic" with canister id: "5o6tz-saaaa-aaaaa-qaacq-cai"
    Creating canister "hello_assets"...
    "hello_assets" canister created on network "ic" with canister id: "5h5yf-eiaaa-aaaaa-qaada-cai"
    Building canisters...
    Building frontend...
    Installing canisters...
    Installing code for canister hello, with canister_id 5o6tz-saaaa-aaaaa-qaacq-cai
    Installing code for canister hello_assets, with canister_id 5h5yf-eiaaa-aaaaa-qaada-cai
    Authorizing our identity (default) to the asset canister...
    Uploading assets to asset canister...
      /index.html 1/1 (472 bytes)
      /index.html (gzip) 1/1 (314 bytes)
      /index.js 1/1 (260215 bytes)
      /index.js (gzip) 1/1 (87776 bytes)
      /main.css 1/1 (484 bytes)
      /main.css (gzip) 1/1 (263 bytes)
      /sample-asset.txt 1/1 (24 bytes)
      /logo.png 1/1 (25397 bytes)
      /index.js.map 1/1 (842511 bytes)
      /index.js.map (gzip) 1/1 (228404 bytes)
      /index.js.LICENSE.txt 1/1 (499 bytes)
      /index.js.LICENSE.txt (gzip) 1/1 (285 bytes)
    Deployed canisters.

Note, a common error one may get in section 4.4:
`Error: The replica returned an HTTP Error: Http Error: status 403 Forbidden`.
This error means that the canister does not have enough cycles to
deploy.

### Testing the on-chain dapp via command line (Terminal B)

Now that the canister is deployed on-chain, you can send it a message.
Since the canister has a method called `greet` (which accepts a string
as a parameter), we will send it a message.

    $ dfx canister --networkiccall hello greet '("everyone": text)'

Note the way the message is constructed: \*
`dfx canister --networkiccall` is setup for calling a canister on the
IC \* `hello greet` means we are sending a message to a canister named
`hello` and evoking its `greet` method \* `'("everyone": text)'` is the
parameter we are sending to `greet` (which accepts `Text` as its only
input).

## Troubleshooting

### Resources

-   Developers who hit any blockers are encouraged to search or post in
    [IC developer forum](https://forum.dfinity.org).
