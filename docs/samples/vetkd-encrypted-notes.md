# VetKD encrypted notes dapp

## Overview

This example dapp is a new version of the [encrypted notes dapp](./encrypted-notes.md) that has been altered to use the new [proposed vetKD feature](https://github.com/dfinity/interface-spec/pull/158).

Particularly, the dapp has been altered where instead of creating a principal-specific AES key and syncing it across devices (by means of device-specific RSA keys), the notes are encrypted with an AES key that is derived (directly in the browser) from a principal-specific vetKey obtained from the backend canister. This key is obtained in an encrypted form, using an ephemeral transport key, which obtains itself from the vetKD system API. This way, there is no need for any device management in the dapp.

The difference between the original encrypted-notes-dapp and the this new vetKD example can be seen in https://github.com/dfinity/examples/pull/561.

Currently, the only way to use this dapp is via manual local deployment, as detailed below.

Please see the [README of the original encrypted-notes-dapp](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/README.md) for further details.

## Disclaimer

This example uses an [**insecure** implementation](https://github.com/dfinity/examples/tree/master/rust/vetkd/src/system_api) of [the proposed vetKD system API](https://github.com/dfinity/interface-spec/pull/158) in a pre-compiled form via the [vetkd_system_api.wasm](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp-vetkd/vetkd_system_api.wasm). **Do not use this in production or for sensitive data**! This example is solely provided **for demonstration purposes** to collect feedback on the mentioned vetKD system API.

## Prerequisites
This example requires an installation of:

- [x] Install the [IC SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install).
- [x] Install `node.js` to build the web frontend.
- [x] Download the following profile files from GitHub: https://github.com/dfinity/examples/
- [x] Set environmental variable: `export BUILD_ENV=motoko` for Motoko or `export BUILD_ENV=rust` for Rust. 
- [x] If deploying in Rust, run `rustup target add wasm32-unknown-unknown` before getting started.

### Step 1: Navigate into the folder containing the project's files:

```
cd examples/motoko/encrypted-notes-dapp-vetkd
```

:::info 
This project folder contains both Motoko and Rust code.
:::

### Step 2: To generate `$BUILD_ENV`-specific files (i.e., Motoko or Rust) run:

```sh
sh ./pre_deploy.sh
```

### Step 3: Install npm packages from the project root:

```sh
npm install
```

### Step 4: If dfx was already started before, run the following:

```sh
dfx stop
rm -rf .dfx
```

Then, start dfx with the command:

```sh
dfx start --clean --background
```

:::info
If you see an error `Failed to set socket of tcp builder to 0.0.0.0:8000`, make sure that the port `8000` is not occupied, e.g., by the previously run Docker command (you might want to stop the Docker daemon whatsoever for this step).
:::

### Step 5: Install a local [Internet Identity (II)](https://wiki.internetcomputer.org/wiki/What_is_Internet_Identity) canister:

:::info
If you have multiple dfx identities set up, ensure you are using the identity you intend to use with the `--identity` flag.
:::

To install and deploy a canister run:

```sh
dfx deploy internet_identity --argument '(null)'
```

Then, to print the Internet Identity URL, run:

```sh
npm run print-dfx-ii
```

Visit the URL from the output of the command above and create at least one local Internet Identity.

### Step 6: Install the vetKD system API canister:

Ensure the Canister SDK (dfx) uses the canister ID that is hard-coded in the backend canister source code:

```sh
dfx canister create vetkd_system_api --specified-id s55qq-oqaaa-aaaaa-aaakq-cai
```

Install and deploy the canister:

```sh
dfx deploy vetkd_system_api
```

Deploy the encrypted notes backend canister:

```sh
dfx deploy "encrypted_notes_$BUILD_ENV"
```

Update the generated canister interface bindings: 

```sh
dfx generate "encrypted_notes_$BUILD_ENV"
```

Deploy the frontend canister:

```sh
dfx deploy www
```

You can check its URL with `npm run print-dfx-www`.

### Step 7: Open the frontend:

Start the local development server, which also supports hot-reloading:

```sh
npm run dev
```

Open the URL that is printed in the console output. Usually, this is [http://localhost:3000/](http://localhost:3000/).

:::info
If you have opened this page previously, please remove all local store data for this page from your web browser, and hard-reload the page. For example in Chrome, go to Inspect → Application → Local Storage → `http://localhost:3000/` → Clear All, and then reload.
:::
