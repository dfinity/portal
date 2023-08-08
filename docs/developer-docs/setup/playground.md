# Motoko playground

## Overview

Motoko playground is a development environment that can be used to build and deploy Motoko canisters directly in the web browser using the Motoko playground canister. Motoko playground can also be run locally, or it can be utilized through the `dfx deploy --playground` command via the CLI. Canisters deployed to the playground use resources that are borrowed from a canister pool. All canisters deployed to the playground will time out after 20 minutes, and new canisters will need to be borrowed for further deployments past the timer. 

Motoko playground canisters provide the same functionality of a canister deployed to the mainnet network. This can be useful for quickly testing canisters and their workflows. 

The Motoko playground is comprised of:
- The playground's frontend asset canister, which contains:
    - A Motoko compiler produced by `js-of-ocaml`. 
    - A Monaco editor that includes support for Motoko syntax validation.
    - A Vessel package manager that loads libraries from the vessel package set.
    - A deploy module which integrates the canister's actor class, Candid UI, and upgrade process. 
- The playground's backend canister that controls all canisters deployed by users on the playground. 

Each canister has an initial amount of 0.5T cycles and can be used for 20 minutes once the canister has been deployed. To avoid wasting cycles, canisters cannot transfer cycles, and the cycles transfer instructions have been removed.

To ensure resources are used fairly by users, proof of work when a user makes a request for a canister ID is required. 

Since Motoko playground is designed for short, small-scale testing, there are limitations and restrictions imposed on canisters deployed to the playground. These limitations are:

- Cycle transfer instructions are silently ignored by the system.
- Canisters can use at most 1GB of stable memory.
- Canisters can call the management canister to manage itself without being the controller.
- Deployed canisters expire after 20 minutes. Upgrades to canisters reset this timer. When the timer runs out, the canister(s) will be uninstalled. 

## `dfx deploy --playground`

Through `dfx`, canisters can be deployed directly from the CLI to the Motoko playground using the `--playground` flag. When this flag is used, the canisters in the `dfx` project will be deployed to the IC mainnet using borrowed resources from the Motoko playground canister pool, and a canister URL will be returned to the developer. This enables developers to test canister functionality or workflow without needing to set up a cycles wallet, obtain cycles, or configure other parameters that are required for deployment to the mainnet. 

### Prerequisites

Before you start, verify the following:

- [x] You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

- [x] You have a command line interface (CLI) window open. This window is also referred to as the 'terminal' window.

- [x] You have downloaded and installed the IC SDK package as described in the [installing the IC SDK](./install/index.mdx) page.


:::info
`dfx deploy --playground` is available in `dfx` versions v0.15.1 and above.
:::

To deploy a canister to the Motoko playground, first create a new `dfx` project with the command:

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
dfx canister --network playground call hello__world_backend greet '("everyone": text)'
```

This command calls the `hello_world_backend` canister that has been deployed to the playground using the `--network` flag, since the playground is classified as a deployment network. 

:::info
Any commands that intend to target a canister deployed to the playground must use the `--playground` or `--network playground` flag in order to target the borrowed canister(s). 
:::

### Defining custom playground networks

Custom playground networks can be defined in the project's `dfx.json` file in the `network` definition section, such as:

```
"<network name>": {
  "playground": {
    "playground_canister": "<canister pool id>",
    "timeout_seconds": <amount of seconds after which a canister is returned to the pool>
  }
}
```

## Motoko playground in the web browser

Motoko playground is also available through the Motoko playground frontend canister, which can be accessed at the following public URL:

https://m7sm4-2iaaa-aaaab-qabra-cai.ic0.app/

In this portion of the guide, we'll explore the frontend canister's UI functionality and how to use it. 

When this URL is opened in a web browser, you will see the following welcome screen:

![Motoko playground welcome](./_attachments/motoko-playground1.png)

From this welcome menu, you can choose an example project from the 'Example Projects' tab, which will automatically install the required files and packages for the example, or you can import another project from a Github repo.

![Examples](./_attachments/motoko-playground2.png)

![Import from Github](./_attachments/motoko-playground3.png)

For this example, we'll select the 'Hello, world' example from the 'Example Projects' tab.

Once opened, you will see the following screen. Take note of the project's files in the left side bar menu under 'FILES', and the installed packages under the 'PACKAGES' menu.

To deploy the project, select the 'Deploy' button from the upper right corner of the screen.

![Deploy](./_attachments/motoko-playground4.png)

After selecting 'Deploy', you will be prompted to give your canister a name, then enable additional options such as profiling and the canister's garbage collection strategy. You'll also be reminded of the restrictions imposed by Motoko playground, such as a time limit of 20 minutes. 

![Canister options](./_attachments/motoko-playground5.png)

When ready, select 'Install'. Once the canister has been successfully deployed, the log at the bottom of the window will display the canister's ID. 

![Canister output](./_attachments/motoko-playground6.png)

In addition to this log output, there will also be a new UI that opens on the right side of the window. This displays the canister's Candid UI. The Candid UI can be used to interact with canister's different defined methods, such as submitting queries to the methods.

![Candid UI 1](./_attachments/motoko-playground7.png)

For this 'Hello, world' canister, there is one method within the canister's code that can be used. This method is a simple 'say' method, which returns any text inputted by the user.  Other canisters may have several different methods; it will vary based on the canister's code. 

![Candid UI 2](./_attachments/motoko-playground8.png)

To test this method, enter the text 'Welcome to Motoko playground!' in the input box, then select the 'QUERY' button.

![Candid UI 3](./_attachments/motoko-playground9.png)

In the output log, you will see that the canister returns this string of text to you.

![Candid UI 4](./_attachments/motoko-playground10.png)

Next, let's take a closer look at the left side bar menu in the window. This menu has three categories: files, packages, and canisters.

![Left menu](./_attachments/motoko-playground11.png)

To add new files to the Motoko playground workspace, select the `+` button next to the 'FILES' option.

![Add files](./_attachments/motoko-playground12.png)

Then give the new file a file name.

![Create file name](./_attachments/motoko-playground13.png)

To add new packages to the Motoko playground workspace, select the `+` button next to the 'PACKAGES' option.

![Add packages](./_attachments/motoko-playground14.png)

From this menu, you can select from the list of pre-imported Vessel packages, or you can input your own from Github.

![Packages](./_attachments/motoko-playground15.png)

Lastly, the 'CANISTERS' portion of the menu showcases your currently running canister(s) and shows the time remaining for the canister's deployment. When this timer runs out, the canister is automatically uninstalled.

To add another canister, select the `+` button next to the 'CANISTERS' option.

![Add canisters](./_attachments/motoko-playground16.png)

From the 'Add a canister' menu, you can import a canister using the canister's ID, as shown below.

![Import by ID](./_attachments/motoko-playground17.png)

Alternatively, you can deploy a canister using the canister's wasm and .did files. 

![Import by wasm](./_attachments/motoko-playground18.png)

Lastly, let's take a look at the two buttons in the top right corner of the Motoko playground UI: the 'Save and & Share' button and the 'Open Example' button.

The 'Save and Share' button can be used to save your canister's code and share it using a live canister URL. Select this button to demonstrate this workflow.

![Save and share](./_attachments/motoko-playground19.png)

In the log, your canister's URL will be returned for you to share with others:

![Canister URL](./_attachments/motoko-playground20.png)

Then, the 'Open Example' button can be used to open another pre-configured example, or import your own from Github.

![Open example](./_attachments/motoko-playground21.png)

This menu will have the same examples and options that the initial welcome menu contained.

![Examples](./_attachments/motoko-playground22.png)

## Running Motoko playground locally

Alternatively, the a version of the Motoko playground can be deployed locally. 

### Prerequisites

- [x] You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

- [x] You have a command line interface (CLI) window open. This window is also referred to as the 'terminal' window.

- [x] You have downloaded and installed the IC SDK package as described in the [installing the IC SDK](./install/index.mdx) page.

- [x] Clone the [Motoko playground repository](https://github.com/dfinity/motoko-playground.git).

- [x] Download and install [npm](https://nodejs.org/en/download/).

- [x] Install `mops` with the command `npm i -g ic-mops`.

- [x] Install [Rust](https://www.rust-lang.org/tools/install).

- [x] Add wasm32 target to Rust with the command `rustup target add wasm32-unknown-unknown`.

Then, run the following commands to deploy the Motoko playground to your local replica:

```
npm install # Install `npm` dependencies
npm start # Run the local development server
dfx deploy
```

### Creating editor integrations

The Motoko playground has limited support for cross-origin communication. For developers building custom smart contract editors or similar applications, the following code snippet can open the project in Motoko playground:

```
const PLAYGROUND_ORIGIN = 'https://play.motoko.org'
const APP_ID = 'MyEditor'
// Workplace files for a project
const userFiles = {
  'Main.mo': 'actor { public func hello() : async Text { "Hello World" } }'
}
// GitHub package dependencies for a project
const userPackages = [{
  name: 'quicksort',
  repo: 'https://github.com/dfinity/examples.git',
  version: 'master',
  dir: 'motoko/quicksort/src'
}]
// Open the Motoko Playground in a new window
const playground = window.open(`${PLAYGROUND_ORIGIN}?post=${APP_ID}`, 'playground')
// Call repeatedly until loaded (interval ID used for acknowledgement)
const ack = setInterval(() => {
  const request = {
    type: 'workplace',
    acknowledge: ack,
    packages: userPackages,
    actions: [{
      type: 'loadProject',
      payload: {
        files: userFiles
      }
    }],
    deploy: true
  }
  // Concatenate APP_ID and request JSON
  const data = APP_ID + JSON.stringify(request)
  console.log('Request data:', data)
  playground.postMessage(data, PLAYGROUND_ORIGIN)
}, 1000)
// Listen for acknowledgement
const responseListener = ({source, origin, data}) => {
  if(
          typeof data === 'string' &&
          data.startsWith(APP_ID) &&
          source === playground &&
          origin === PLAYGROUND_ORIGIN
  ) {
    console.log('Response data:', data)
    // Parse JSON part of message (prefixed by APP_ID)
    const response = JSON.parse(data.substring(APP_ID.length))
    if(response.acknowledge === ack) {
      clearInterval(ack)
      window.removeEventListener('message', responseListener)
    }
  }
}
window.addEventListener('message', responseListener)
```

:::info
This example works for `localhost` out of the box. To use this feature in production, please submit a PR to the [Motoko playground](https://github.com/dfinity/motoko-playground.git) repository that adds your application's public URL to the file `src/integrations/allowedOrigins.js`.
:::
