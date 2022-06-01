# Deploy a "Hello World" Dapp in 10 Minutes

This is a quick tutorial to deploy a "Hello World" dapp to the Internet Computer (IC) in 10 minutes or less. Deployment of the dapp only requires basic knowledge of using a terminal. 
<!-- Code editing knowledge is not necessary. -->

Before starting, take a look at a version of this dapp running on-chain: <https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/>

In this tutorial, you will learn how to:

1.  Install the Canister SDK
2.  Build and deploy a dapp locally
3.  Collect free cycles to power your dapp
4.  Create a "cycles wallet" from which you can transfer cycles to any other dapps you want to power
5.  Deploy a dapp on-chain

This simple `Hello` dapp is composed of two [canister smart contracts](https://wiki.internetcomputer.org/wiki/Glossary#C) (one for backend and one for frontend). The dapp accepts a text argument as input and returns a greeting. For example, if you call the `greet` method with the text argument `Everyone` on the command-line via the canister SDK (see instructions below on how to install the canister SDK), the dapp will return `Hello, Everyone!` either in your terminal:

``` bash
$ dfx canister call hello greet Everyone
$ "Hello, Everyone"
```

Or via the dapp in a browser, a pop-up window will appear with the message: `Hello, Everyone!`

![Hello](_attachments/frontend-result.png)

Note that the "Hello World" dapp consists of backend code written in [Motoko](../build/languages/motoko/), a programming language specifically designed for interacting with the IC, and a simple webpack-based frontend.

This tutorial requires Linux, macOS 12.\* Monterey or later, or Windows with a [Windows Subsystem for Linux (WSL)](windows-wsl) installation.

## Topics Covered in this Tutorial

-   **Canisters** are the smart contracts installed on the IC. They contain the code to be run and a state, which is produced as a result of running the code. As is the case of the "Hello World" dapp, it is common for dapps to be composed of multiple canisters.

-   **[Cycles](../../concepts/tokens-cycles)** refer to a unit of measurement for resource consumption, typically for processing, memory, storage, and network bandwidth consumed on the IC. For the sake of this tutorial, cycles are analogous to Ethereum’s gas: cycles are needed to run dapps, but unlike gas they are stable and less expensive. Every canister has a cycles account from which the resources consumed by the canister are charged. The IC’s utility token (ICP) can be converted to cycles and transferred to a canister. ICP can always be converted to cycles using the current price of ICP measured in [SDR](https://en.wikipedia.org/wiki/Special_drawing_rights) (a basket of currencies) using the convention that one trillion cycles correspond to one SDR. **Get free cycles from the cycles faucet.**

-   A **[cycles wallet](../build/project-setup/default-wallet)** is a canister that holds cycles and powers up dapps.

## 1. Installing Tools

To build and deploy the `Hello` dapp, you need to install the following tools.

### DFX

In this tutorial, we use a Canister SDK called `dfx`, which is the default SDK maintained by the DFINITY foundation. 

To install `dfx`, run:

``` bash
sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"
```

To verify that `dfx` properly installed, run:

``` bash
dfx --version
```

The terminal should show you the most recent version ([See SDK release notes](../updates/release-notes/release-notes.md)).

More installation options and instructions for uninstalling `dfx` are covered in [Installing the SDK](../build/install-upgrade-remove.mdx).

### Node.js

Node.js is necessary for rendering the frontend assets and so is necessary to complete this tutorial. Note however that Node.js is not needed for canister development in general.

We support all stable versions of Node.js starting with 12. You can install 12, 14, or 16. Please note that Node 17 does not support Webpack’s api proxy tool, so `npm start` may not work correctly.

There are many ways of installing node.js. On Linux, we recommend using your system's package manager. On macOS, we recommend [Homebrew](https://brew.sh). Alternatively, you find instructions on the [nodejs.org website](https://nodejs.org/en/download).

This tutorial works best with a node.js version higher than `16.*.*`.

<!-- Besides installing node.js, users need to also install: 
* Node Package Manager (NPM). (This comes packaged with Node, but you may want to upgrade with `npm i -g npm`) 
* Node Version Manager (NVM), see [installing NVM](https://github.com/nvm-sh/nvm#installing-and-updating).
* Once you have NVM, install the latest stable build with `nvm install --lts` -->

## 2. Create a project (1 min)

<!-- After the SDK is installed, create the default "Hello World" project with two canisters (backend and frontend).

The SDK comes with a starter default project that has a backend in Motoko and frontend code in HTML, CSS, and JS. Developers can use this default project to start their own dapps. In this tutorial, we will build and deploy this bundled project, so there is no need to download any other dapp code. -->

<!-- The `dfx new hello` command uses the template code to create a new project directory named `hello`, template files, and a new `hello` Git repository for your project. You can create many projects with many names. -->

<!-- This is roughly analogous in Web2 to Rail’s `rails new`, React.js’s `create-react-app`, or Rust’s `cargo new`. -->

<!-- To create a new project for your first application: -->

<!-- ### 2.1 Open a Terminal and Create a new project named "hello" -->

A `dfx` project is a set of artifacts, including source code and configuration files, that can be compiled to a canister. By running 

``` bash
dfx new hello
```

`dfx` creates a new project directory called `hello`. The terminal output should look like this:

![dfx new](_attachments/dfx-new-hello-1.png)

![dfx new](_attachments/dfx-new-hello-2.png)

<!-- ### 2.2 Move to your project directory

``` bash
cd hello
```

Your directory should look like this: -->

The `hello` project directory includes the artifacts required for a "hello world" canister and a new `hello` Git repository. Your directory should look like this:

![cd new](_attachments/cd-hello.png)

<!-- ### 2.3 Understanding your dapp project -->

The `hello` project is composed of two canisters:

-   `hello` canister, which contains the template backend logic
-   `hello_assets` canister, which contains the dapp assets (images, html files, etc)

![hello Dapp](_attachments/2-canisters-hello-dapp.png)

You may wonder "why two canisters?" Two canisters are created to help you organize your project. It could be that assets and backend logic live in one canister, but IC developers have found that it's useful to create two canisters (one for backend and one for frontend).

## 3. Run your dapp locally (3 min)

Now that your `hello` project is created, the next step is to deploy it locally. To deploy locally, `dfx` can start a local instance of the execution environment. This environment is not a full IC replica, nor does it download any of the state of an IC replica. It is a lightweight environment designed exclusively for deploying dapps.

For this, we recommend using two terminals:

-   **Terminal A** shows the output of the execution environment. This is analogous to starting a local server in a web2 project, e.g. node.js’s Express, python’s Django, or Ruby’s Rails.

-   **Terminal B** is used to interact with the canister running in the execution environment. This is analogous to sending HTTP API messages to servers running locally, e.g. Postman or Panic.

To distinguish the two terminals in this tutorial, terminal A has a dark blue background...

![dfx new](_attachments/dfx-new-hello-2.png)

... and terminal B has a black background.

![terminal b ls](_attachments/terminal-b-ls.png)

### Start the execution environment

<!-- Navigate to the root directory for your project, if necessary. In this tutorial, you should be in the folder `hello` because that is the name of the project created in section 2 above.

Start the local canister execution environment in Terminal A: -->

In terminal A, navigate to the root directory `hello` of our project and run

``` bash
dfx start
```

![dfx start](_attachments/terminal-a-dfx-start.png) 

:::note

-   Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click "Allow."
-   Check no other network process is running that would create a port conflict on 8000.

:::

**Congratulations - there is now a local Instance of the execution environment of the IC running on your machine! Leave this window/tab open and running while you continue.** If the window/tab is closed, the local instance of the execution environment of the IC will not be running and the rest of the tutorial will fail.

### Deploy the dapp locally

:::note
Since this is only a canister execution environment, this deployment has fewer steps than a deployment to mainnet, which requires [cycles](../../concepts/tokens-cycles)).
:::

<!-- To deploy your first dapp locally:

#### 3.2.1 Check that you are still in the root directory for your project, if needed.

Ensure that node modules are available in your project directory, if needed, by running the following command (it does not hurt to run this many times): -->

In terminal B, navigate to the root directory `hello` of our project. Install all the necessary node modules by running

``` bash
npm install
```

![npm install](_attachments/terminal-b-npm-install.png)

Register, build, and deploy the `hello` canister to the local execution environment by running

``` bash
dfx deploy
```

![dfx deploy](_attachments/terminal-b-dfx-deploy.png) 

Your dapp is now composed of two canisters as you can see in the copy below (from terminal B):

``` bash
Installing code for canister hello, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
Installing code for canister hello_assets, with canister_id ryjl3-tyaaa-aaaaa-aaaba-cai
```

1.  `hello` canister `rrkah-fqaaa-aaaaa-aaaaq-cai` which contains the backend logic.

2.  `hello_assets` canister `yjl3-tyaaa-aaaaa-aaaba-cai` which contains the frontend assets (e.g. HTML, JS, CSS).

### Test the dapp locally via the command line

Now that the canister is deployed to the local execution environment, you can interact with the canister by sending and receiving messages. Since the canister has a method called `greet` (which accepts a string as a parameter), we will send it a message. In terminal B, run

``` bash
dfx canister call hello greet everyone
```

-   The `dfx canister call` command requires you to specify a canister name and function to call.
-   `hello` specifies the name of the canister you call.
-   `greet` specifies the function name.
-   `everyone` is the argument that you pass to the `greet` function.

### Test the dapp locally via the browser

Now that you have verified that your dapp has been deployed and tested its operation using the command line, let’s verify that you can access the frontend using your web browser.

In terminal B, start the development server by running:

``` bash
npm start
```

<!-- ### 3.4.2 Test the dapp locally in the browser

To see your dapp running locally in the browser on http://localhost:8080. -->

Open a browser and navigate to <http://localhost:8080/>.

You should see a simple HTML page with a sample asset
image file, an input field, and a button.

![Sample HTML page](_attachments/frontend-prompt.png)

Type a greeting, then click **Click Me** to return the greeting.

![Hello](_attachments/frontend-result.png)

### Stop the local canister execution environment

After testing the application in the browser, you can stop the local canister execution environment so that it does not continue running in the background. We will not need it running to deploy on-chain.

To stop the local deployment:

1.  In terminal A, press Control-C to interrupt the local network process.
2.  In terminal B, press Control-C to interrupt the development server process.
3.  Stop the local canister execution environment running on your local computer:

    ``` bash
    dfx stop
    ```

### Troubleshooting

### Node.js is not properly installed

If your dapp does not show in the browser, it is possible that Node.js is not installed. Confirm it is installed by running:

``` bash
node --version
```

### Prior installations of dfx

If you have previously created IC dapps before February 2022, you may need to do a clean install. You can delete the SDK and associated profiles and re-install it. Follow the instructions here: [Install, upgrade, or remove software](../build/install-upgrade-remove).

## 4. Acquiring cycles to deploy on-chain (5 min)

In order to run on-chain, IC dapps require cycles to pay for computation and storage. This means that the developer needs to acquire cycles and fill their canister with them. Cycles are created from ICP tokens.

This flow may be surprising to people familiar with Web2 software where they can add a credit card to a hosting provider, deploy their apps, and get charged later. In Web3, blockchains require their smart contracts consume **something** (whether it is Ethereum’s gas or the IC’s cycles). The next steps will likely be familiar to those in crypto or blockchain, who grow used to the first step of deploying a dapp being "go get tokens."

You may further wonder why dapps run on cycles rather than ICP tokens. The reason is that the cost of ICP tokens fluctuate with the crypto market, but cycles are predictable and relatively stable tokens which are pegged to [SDR](https://en.wikipedia.org/wiki/Special_drawing_rights). One trillion cycles will always cost one SDR, regardless of the price of ICP.

Practical notes about cycles:

-   There is a [free cycles faucet](cycles-faucet) that grants new developers 15 trillion cycles
-   It takes 100 billion cycles to deploy a canister, but in order to load up the canister with sufficient cycles, `dfx` injects 3 trillion cycles for any canister created (this is a parameter that can be changed).
-   You can see a table of compute and storage costs here: [Computation and storage costs](../updates/computation-and-storage-costs).
-   You can learn more about acquiring and managing ICP in [Acquiring and managing ICP tokens](https://wiki.internetcomputer.org/wiki/Tutorials_for_acquiring,_managing,_and_staking_ICP).

In this tutorial, we present two ways of acquiring cycles:

-   **Option 1:** [Acquiring cycles via the free cycles faucet](#option-1-acquiring-cycles-via-the-free-cycles-faucet-2-min) shows one how to get cycles via the cycles faucet (most common for new developers).
-   **Option 2:** [Converting ICP tokens into cycles](#option-2-converting-icp-tokens-into-cycles-5-min) shows one how to get cycles via ICP tokens (most common for developers who want more cycles).

By the end of this section, you will now have three canisters:

-   `hello` canister (not yet deployed to the IC)
-   `hello_assets` canister in your project (not yet deployed to the IC)
-   Your cycles wallet canister that holds your cycles (deployed on the IC)

![hello dapp and cycles wallet](_attachments/3-canisters-hello-dapp.png)

<!-- ### 4.2 Check the connection to the Internet Computer (terminal B) -->

As a sanity check, it is good practice to check if your connection to the IC is stable by verifying the current status of the Internet Computer blockchain and your ability to connect to it:

``` bash
dfx ping ic
```

If successful you will see an output resembling the following:

``` bash
$ {
  "ic_api_version": "0.18.0"  "impl_hash": "d639545e0f38e075ad240fd4ec45d4eeeb11e1f67a52cdd449cd664d825e7fec"  "impl_version": "8dc1a28b4fb9605558c03121811c9af9701a6142"  "replica_health_status": "healthy"  "root_key": [48, 129, 130, 48, 29, 6, 13, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 1, 2, 1, 6, 12, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 2, 1, 3, 97, 0, 129, 76, 14, 110, 199, 31, 171, 88, 59, 8, 189, 129, 55, 60, 37, 92, 60, 55, 27, 46, 132, 134, 60, 152, 164, 241, 224, 139, 116, 35, 93, 20, 251, 93, 156, 12, 213, 70, 217, 104, 95, 145, 58, 12, 11, 44, 197, 52, 21, 131, 191, 75, 67, 146, 228, 103, 219, 150, 214, 91, 155, 180, 203, 113, 113, 18, 248, 71, 46, 13, 90, 77, 20, 80, 95, 253, 116, 132, 176, 18, 145, 9, 28, 95, 135, 185, 136, 131, 70, 63, 152, 9, 26, 11, 170, 174]
}
```

### Option 1: Acquiring cycles via the free cycles faucet (2 min)

This option is best for people who want minimal time investment and have never used cycles faucet (faucet can be used only once).

For the purposes of this tutorial, you can acquire free cycles for your `Hello` dapp from the cycles faucet. Follow the instructions here: [Claim your free cycles](cycles-faucet).

#### Check your cycles balance

Now that you have used the cycles faucet, in terminal B you can check your cycles balance:

``` bash
dfx wallet --network ic balance
```

You should see around 15 trillion cycles if you run this after using the cycles wallet. If so, skip to section [5. Deploying on-chain](#5deploy-on-chain-1-min).

If you do not see any cycles, deploying on-chain in the rest of the tutorial will not work. You should try [Option 2: Converting ICP token into cycles](#option-2-converting-icp-tokens-into-cycles-5-min).

### Option 2: Converting ICP tokens into cycles (5 min)

This option is best for people who have already exhausted the cycles wallet or who want to set up their environment to add more cycles in the future.

## 5. Deploy on-chain (1 min)

Now that you have your [cycles](../../concepts/tokens-cycles) and your `dfx` is configured to transfer cycles, you are now ready to deploy your `Hello` dapp on-chain. In terminal B, run:

``` bash
npm install
```

``` bash
dfx deploy --network ic --with-cycles 1000000000000
```

The `--network` option specifies the network alias or URL for deploying the dapp. This option is required to install on the Internet Computer blockchain mainnet. `--with-cycles` explicitly tells `dfx` how many cycles to use, otherwise it will use the default of 3 trillion.

If successful, your terminal should look like this:

``` bash
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
URLs:
  Frontend:
    hello_assets: https://5h5yf-eiaaa-aaaaa-qaada-cai.ic0.app/
  Candid:
    hello: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/?id=5o6tz-saaaa-aaaaa-qaacq-cai
```

Note the bottom of the message which returns the URL where you can see your canister’s frontend deployed on-chain: <https://5h5yf-eiaaa-aaaaa-qaada-cai.ic0.app/>

In the example above, we created a `hello` dapp that is composed of:

1.  `hello` canister `5o6tz-saaaa-aaaaa-qaacq-cai` which contains the backend logic.

2.  `hello_assets` canister `5h5yf-eiaaa-aaaaa-qaada-cai` which contains the frontend assets (e.g. HTML, JS, CSS).

### See your dapp live on-chain via a browser

Navigate to and enter a name: <https://5h5yf-eiaaa-aaaaa-qaada-cai.ic0.app/>

Before your dapp loads, your browser will quickly show a message that reads: Installing "Internet Computer Validating Service Worker". This [service worker](https://developer.chrome.com/docs/workbox/service-worker-overview/) comes from the IC and it is used to make sure the web app the user sees is the correct, untampered frontend. Once loaded, your browser will cache the service worker and your web app will load much quicker.

![Hello](_attachments/service-worker.png)

After loading the service worker, your dapp will load:

![Hello](_attachments/frontend-result.png)

### Testing the on-chain dapp via the command line

Since the canister has a method called `greet` (which accepts a string as a parameter), we can send it a message via `dfx`.

``` bash
dfx canister --network ic call hello greet '("everyone": text)'
```

Note the way the message is constructed:

-   `dfx canister --network ic call` is the setup for calling a canister on the IC.

-   `hello greet` means we are sending a message to a canister named `hello` and evoking its `greet` method. `dfx` knows which `hello` canister (out of the many in the IC), one refers to because a mapping of `hello` to a canister id is stored locally in `.dfx/local/canister_ids.json`.

-   `'("everyone": text)'` is the parameter we are sending to `greet` (which accepts `Text` as its only input).

### Troubleshooting

#### 403 Error

If you receive a 403 error, it is possible the identity you are using does not have enough cycles. You should try the following to debug:

#### 1. Confirm you are using the identity you assume are using

``` bash
dfx identity whoami
```

#### 2. Confirm the identity you are using has enough cycles on-chain

``` bash
dfx wallet --network ic balance
```

#### 3. Try proxying through your wallet

Sometimes (especially when you created the canisters with `dfx` versions before 0.9.0) your wallet is set as your canister’s controller. To have your wallet be the source of the deployment instruction, add the flag `--wallet <insert-your-wallet-id-here>` to the deploy or call command.

If this works and you would like to add your own principal as a controller of the canister (so you don’t have to use the `--wallet` option anymore), you can run this:

``` bash
dfx canister --wallet "$(dfx identity get-wallet)" update-settings --all --add-controller "$(dfx identity get-principal)"
```

## Wrap-up

Congratulations! You have built a dapp fully on-chain (both backend and frontend) within 10 minutes.

Tutorial takeaways:
-   Dapps can be composed of multiple canisters
-   Dapps can be deployed locally and on-chain
-   Cycles are needed power dapps
-   Get free cycles from the cycles wallet
-   Free cycles can be used to power additional dapps

### Starting from scratch

If you wish to start from scratch, delete the SDK and associated profiles and re-install it. Follow the instructions here: [Install, upgrade, or remove software](../build/install-upgrade-remove).

**Be sure to save any identities linked to dapps or ICP.**

### Getting Stuck?

If you get stuck or run into problems search for solutions or post questions in the [Developer forum](https://forum.dfinity.org) or [DISCORD](https://discord.com/invite/cA7y6ezyE2).

### Ready for the next challenge?

Build DAOs, NFTs and more [here](https://smartcontracts.org/samples).

### Want to learn more?

If you are looking for more information before getting started or want to view a demonstration of how to deploy before you try it for yourself, check out the following related resources:

-   [How you can use ICP tokens (overview)](../../concepts/tokens-cycles#using-tokens)

-   [Building on the Internet Computer: Fundamentals (video)](https://www.youtube.com/watch?v=jduSMHxdYD8)

-   [What is the DFINITY Canister SDK (video)](https://www.youtube.com/watch?v=60uHQfoA8Dk)

-   [Deploying your first dapp (video)](https://www.youtube.com/watch?v=yqIoiyuGYNA)
