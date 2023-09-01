# Encrypted note-taking dapp

## Overview

[Encrypted notes](https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp) is an experimental dapp for authoring and storing confidential information in the form of short pieces of text. The user can access their notes via any number of automatically synchronized devices authenticated via [Internet Identity](https://internetcomputer.org/internet-identity). Thanks to the end-to-end encryption performed by the dapp’s frontend, the user does not need to trust the dapp’s backend.

You can play around with the [dapp deployed on the IC](https://cvhrw-2yaaa-aaaaj-aaiqa-cai.icp0.io/) and see a quick introduction on [YouTube](https://youtu.be/DZQmtPSxvbs).

We wanted to build an example of a simple (but not too simple) dapp running purely on the IC. This example relies upon the **web-serving** and **storage capabilities** of the IC. We focused on the following two key features for our example dapp: 
1. Client-side **end-to-end encryption**. 
2. **Multi-user** and **multi-device** support.

To demonstrate the potential of the IC as a platform for developing such dapps, we implemented this example using two distinct canister development kits (CDKs). The Motoko CDK allows developers to implement actor-based dapps using the [Motoko](/motoko/main/motoko.md) language. The Rust CDK allows implementing dapps in [Rust](/developer-docs/backend/rust/index.md). In both cases, canisters are compiled into WebAssembly files that are then deployed onto the IC.

## Architecture

The basic functionality of the encrypted notes consists of two main components.

First, we re-used the code of a non-encrypted dapp called [IC Notes](https://github.com/pattad/ic_notes). In particular IC Notes relies on the Internet Identity (II) canister for user authentication, an approach that is also inherited by the encrypted notes dapp. For development purposes, we deploy a local instance of the II canister, along with a local instance of encrypted notes. When deploying the encrypted notes dapp onto the mainnet, the real-world instance of II is used for authentication.

Second, we enabled client-side, end-to-end encryption for the note contents, borrowing the solution from another existing dapp called [IC Vault](https://github.com/timohanke/icvault). Our encrypted notes dapp follows the approach of IC Vault to support managing multiple devices.

In the context of the canisters discussed in this document, a device is not necessarily a separate physical device but a logical instance device, e.g., a web browser, with its own local data storage. For example, we consider two web browsers running on the same laptop as two independent devices, since these browsers generate their own encryption keys. In contrast, the II canister relies on hardware-generated encryption keys, distinguishing only hardware devices.

To support multiple devices per user, IC Vault employs a device manager; a canister that securely synchronizes device-specific keys across all the devices that are associated with a user. The remainder of this document focuses on the encrypted notes dapp canister that implements a device manager in a similar way but as part of its main canister.

For further details and user stories, please refer to the [README file](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/README.md).

![High-level architecture overview diagram of the Encrypted Notes dapp](_attachments/encrypted-notes-arch.png)

## Note management

-   Users are linked to II in the frontend, getting the user a principal that can be used for calling API queries and updates.

-   Internally, we store the map of the form `Principal → [Notes]` and a `counter`.

-   `counter` stores the number of notes the canister has created across all principals.

-   Method `create` adds a note to its principal’s entry (if it exists), or adds the principal to the map with the `note_id == counter`, and then increments `counter`.

-   Method `update` pulls a note, for the caller’s principal and for the provided `note_id` and replaces it with the provided `text` (this `text` is assumed to be encrypted by the frontend).

-   Method `delete` finds the note with the given `note_id` in the map and removes it. To ensure that note IDs are always globally unique, we do not decrease `counter`.

## Cryptography

Encryption of notes is entirely client-side. However, our example dapp is still not protected against potentially data-revealing attacks by a possibly malicious node provider. For example, the attacker can infer how many notes a particular user has, user activity statistics, etc. Therefore, please carefully read the [disclaimer](https://github.com/dfinity/examples/blob/master/motoko/encrypted-notes-dapp/README.md#disclaimer-please-read-carefully) before using any of the code or patterns from this dapp.

Recall that, in our definition, a device is not necessarily a separate physical device but simply a web browser instance with an independent local storage.

This dapp uses three different kinds of keys:

-   **Symmetric AES-GCM secret key**: Used to encrypt the notes of a given principal. The notes of a principal are stored in the encrypted notes dapp canister encrypted with this secret key. Thus, the frontend of the dapp needs to know this secret key to decrypt notes from this user and to send encrypted notes to be stored in the Encrypted Notes canister.

-   **Device RSA-OAEP public key**: used to encrypt the symmetric AES **secret key** of the principal. The encrypted secret key is stored in the canister for each device registered to the principal. The same key is used for different principals using that device.

-   **Device RSA-OAEP private key**: used to decrypt the symmetric AES **secret key** stored in the encrypted notes canister for a given principal. Once the frontend decrypts the secret key, it can use this key for decrypting the notes stored in the encrypted notes canister.

We store a map of the form:

        Principal → (DeviceAlias → PublicKey,
                     DeviceAlias → CipherText)

This map is used for managing user devices, as explained next. To register a device, the frontend generates a device alias, a public key, and a private key (held in its local storage).

Adding a device:

-   **Device registration:** if this identity is already known, a new device will remain unsynced at first; at this time, only the `alias` and `publickey` of this device will be added to the Encrypted Notes canister.

-   **Device synchronization:** once an unsynced device obtains the list of all unsynced devices for this II, it will encrypt the symmetric AES **secret key** under each unsynced device’s public key. Afterwards, the unsynced device obtains the encrypted symmetric AES **secret key**, decrypts it, and then uses it to decrypt the existing notes stored in the encrypted notes canister.

Once authenticated with II:

-   If this identity is not known, then the frontend generates a symmetric AES **secret key** and encrypts it with its own public key. Then the frontend calls `seed(publickey, ciphertext)`, adding that `ciphertext` and its associated `publickey` to the map.

-   If a user wants to register a subsequent device, the frontend calls `register_device`, passing in the `alias` and `publickey` of that device. The frontend then calls `submit_ciphertexts([publickey, ciphertext])` for all the devices it needs to register. This allows the registered devices to pull and decrypt the AES key to encrypt and decrypt the user notes.

## Sequence diagrams

### Adding a new device

![UML sequence diagram showing device registration and synchronization](_attachments/encrypted-notes-seq.png)

## Encrypted note taking dapp tutorial

Follow the steps below to deploy this sample project.

## Prerequisites
- [x] Install the [IC SDK](../developer-docs/setup/install).
- [x] Download and install [Docker](https://docs.docker.com/get-docker/) if using the Docker option. 
- [x] Download the GitHub repo containing this project's files: https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp.

### Step 1. Navigate inside of the project's folder:

```
cd examples/motoko/encrypted-notes-dapp
```

:::info 
This project folder contains the files for both Motoko and Rust development
:::

### Step 2: Set an environmental variable reflecting which backend canister you'll be using:

For Motoko deployment run:

```
export BUILD_ENV=motoko
```

For Rust deployment run:

```
export BUILD_ENV=rust
```

:::info
Building the Rust canister requires either the Rust toolchain installed on your system or Docker-backed deployment (see below).
:::
 
### Step 3: Deploy locally. 

### Option 1: Docker deployment

:::info
This option does not yet work on Apple M1; the combination of dfx and Docker do not currently support the required architecture.
:::

- #### Step 1: Install and start Docker by following the instructions.
- #### Step 2: For Motoko build/deployment set environmental variable:
        
```
export BUILD_ENV=motoko
```

- #### Step 3: Run the following Bash script that builds a Docker image, compiles the canister, and deploys this dapp (all inside the Docker instance). 

Execution can take a few minutes:

```
sh ./deploy_locally.sh
```

:::caution
If this fails with "No such container", please ensure that the Docker daemon is running on your system.
:::

- #### Step 4: To open the frontend, go to `http://localhost:3000/`.

- #### Step 5: To stop the docker instance:
   - Hit **Ctrl+C** on your keyboard to abort the running process.
   - Run `docker ps` and find the <CONTAINER ID'\'> of encrypted_notes.
   - Run `docker rm -f <CONTAINER ID'\'>`.

### Option 2: Manual deployment
- #### Step 1: For Motoko deployment set environmental variable:

```
export BUILD_ENV=motoko
```

- #### Step 2: To generate $BUILD_ENV-specific files run:

```
sh ./pre_deploy.sh
```

- #### Step 3: Install `npm` packages from the project root:

```
npm install
```

- #### Step 4: Start `dfx`:

```
dfx start
```

:::caution
If you see an error "Failed to set socket of tcp builder to 0.0.0.0:8000", make sure that the port 8000 is not occupied, e.g., by the previously run Docker command (you might want to stop the Docker daemon whatsoever for this step).
:::

- #### Step 5: Install a local Internet Identity (II) canister.

:::info
If you have multiple dfx identities set up, ensure you are using the identity you intend to use with the `--identity` flag.
:::

To install and deploy a canister run:

```
dfx deploy internet_identity --argument '(null)'
```

- #### Step 6: To print the Internet Identity URL, run:

```
npm run print-dfx-ii
```

Visit the URL from above and create at least one local Internet Identity.

- #### Step 7: Deploy the encrypted notes backend canister:

```
dfx deploy "encrypted_notes_$BUILD_ENV"
```

:::caution
If you are deploying the Rust canister, you should first run `rustup target add wasm32-unknown-unknown`.
:::

- #### Step 8: Update the generated canister interface bindings:

```
dfx generate "encrypted_notes_$BUILD_ENV"
```

- #### Step 9: Deploy the frontend canister.
To install and deploy the canister run:

```
dfx deploy www
```

- #### Step 10: To print the frontend canister's URL, run:

```
npm run print-dfx-www
```

Visit the URL from above in a web browser. To run the frontend with hot-reloading on `http://localhost:3000/`, run:

```
npm run dev
```

:::caution
If you have opened this page previously, please remove all local store data for this page from your web browser, and hard-reload the page. For example in Chrome, go to Inspect → Application → Local Storage → http://localhost:3000/ → Clear All, and then reload.
:::
 

### Mainnet deployment

:::info
Prior to starting the mainnet deployment process, ensure you have your identities and wallets set up for controlling the canisters correctly. This guide assumes that this work has been done in advance.
:::

- #### Step 1: Create the canisters:

```
dfx canister --network ic create "encrypted_notes_${BUILD_ENV}"
dfx canister --network ic create www
```

:::info
`encrypted_notes_rust` will only work if you have the Rust toolchain installed.
:::

- #### Step 2: Build the canisters:

```
dfx build "encrypted_notes_${BUILD_ENV}" --network ic
dfx build www --network ic
```

- #### Step 3: Deploy to mainnet:

:::info
In the commands below, --mode could also be reinstall to reset the stable memory.
:::

```
dfx canister --network ic install "encrypted_notes_${BUILD_ENV}" --mode=upgrade
dfx canister --network ic install www --mode=upgrade
```

## User interaction with "Encrypted Notes" dapp

### Scenario I: Basic single-device usage

![Single device usage](./_attachments/single_user.png)

- #### Step 1: Open the main page of the `Encrypted Notes` dapp. You will see a **Login** button.

   - If deployed locally, visit the following link: http://localhost:4943?canisterId=rkp4c-7iaaa-aaaaa-aaaca-cai
   - If deployed to the mainnet IC, visit the corresponding canister URL.

   At this moment, only one `deviceAlias` variable is stored in the local storage. 

   :::info
    See [Troubleshooting](#troubleshooting) in case of problems.
   :::

- #### Step 2: Click the **Login** button. You will be redirected to the **Internet Identity** canister.

   - If you already have an `anchor`, you may continue with it. Click **Authenticate**, then verify your identity and finally click **Proceed**.
   - If you do not have an anchor yet, you should [create one](https://smartcontracts.org/docs/ic-identity-guide/auth-how-to.html). Once an `anchor` is created, you may continue with it. Click **Authenticate**, then verify your identity and finally click **Proceed**. 

- #### Step 3: Once logged in for the first time, your notes list should be empty. 
At this moment, your **local storage** should be populated with additional variables: **ic-identity**, **ic-delegation**. 

These variables are used for storing/retrieving notes from the backend canister. In addition, another two variables are generated in the **IndexedDB**: **PrivateKey**, **PublicKey**. These two variable are used for encrypting/decrypting the shared secret key.

- #### Step 4: Create/edit/delete notes and observe changes in the resulting notes list.

### Scenario II: User is accessing notes from multiple devices

In this scenario, a user accesses the dapp using the same _Internet Identity_ anchor from multiple devices. From our dapp's perspective, each web browser instance can be viewed as a separate device.

![Multiple devices](./_attachments/multiple_devices.png)

- #### Step 1: Perform steps 1-3 of Scenario I on Device A.
- #### Step 2: Perform steps 1-3 of Scenario I on Device B. 

One subtle difference that you might observe on Device B is that the message "Synchronizing..." appears for a short period of time. As Device A was the first to login, it was also the first one to generate a shared secret. Device B has to retrieve it. In order to do that, Device B first uploads its public key (pub B) to the backend canister. Device A retrieves pub B by means of periodic polling. Device A then re-encrypts the shared secret with pub B and uploads it to the backend. Afterwards, Device B can retrieve the encrypted shared secret and decrypt it with its private key.

- #### Step 3: Observe that the list of notes is now empty for both devices.
- #### Step 4: Create a Note, e.g. "Note from Device A" on Device A, and observe it on Device B.
- #### Step 5: Analogously, create a different note, e.g. "Note from Device B" on Device B.
- #### Step 6: Confirm that the notes are synchronized between the two devices.

### Scenario III: Device management

![Device management](./_attachments/registered_devices.png)

- #### Step 1: Login into the dapp with the same anchor on two or more devices.
- #### Step 2: On each device, navigate to "Devices" item in the menu.
- #### Step 3: Observe that the list of registered devices contains as many entries as the number of logged in devices.
- #### Step 4: Assuming we are using Device A, click "remove" for some other device, say, Device B.
- #### Step 5: While still on Device A, observe that Device B is deleted from the list of devices. 

:::info
A device cannot remove itself. That is why you do not see a "remove" button for your current device.
:::

- #### Step 6: Switch to Device B and observe that it has been logged out.
- #### Step 7: Login with Device B again and observe in "Device" tab both devices again.

## Unit testing

This project also demonstrates how one can write unit tests for Motoko and Rust canisters.

### Motoko unit tests

The unit tests are implemented in `src/encrypted_notes_motoko/test/test.mo` using the [Motoko matchers](https://kritzcreek.github.io/motoko-matchers/) library. 

The easiest way to run all tests involves the following steps:

- #### Step 1: Follow the [above instructions](#option-1-docker-deployment) for deployment via Docker with `BUILD_ENV=motoko`.
- #### Step 2: Open a new console, type `docker ps`, and copy the _`<CONTAINER ID>`_ of the `encrypted_notes` image.
- #### Step 3: Run: `docker exec `_`<CONTAINER ID>`_` sh src/encrypted_notes_motoko/test/run_tests.sh`
- #### Step 4: Observer `All tests passed.` at the end of the output.

Alternatively, one can also run unit tests after a local deployment via:
```sh
src/encrypted_notes_motoko/test/run_tests.sh
```
However, this requires installing [`wasmtime`](https://wasmtime.dev/) and [`motoko-matchers`](https://github.com/kritzcreek/motoko-matchers):

```sh
git clone https://github.com/kritzcreek/motoko-matchers $(dfx cache show)/motoko-matchers
chmod +x src/encrypted_notes_motoko/test/run_tests.sh
src/encrypted_notes_motoko/test/run_tests.sh
```

Observer `All tests passed.` at the end of the output.

### Rust unit tests

The unit tests are implemented in `src/encrypted_notes_rust/src/lib.rs` at the bottom.

The easiest way to run all tests involves the following steps:

- #### Step 1: Follow the [above instructions](#option-1-docker-deployment) for deployment via Docker with `BUILD_ENV=rust`.
- #### Step 2: Open a new console, type `docker ps`, and copy the _`<CONTAINER ID>`_ of the `encrypted_notes` image.
- #### Step 3: Run: `docker exec `_`<CONTAINER ID>`_` cargo test`
- #### Step 4: Observer `test result: ok.` at the end of the output.

Alternatively, one can also run unit tests after a local deployment via:
```sh
cargo test
```

## Troubleshooting resources

### Building/deployment problems
Error `ERR_OSSL_EVP_UNSUPPORTED`.
Version 17+ of node.js introduces changes to the way Node handles OpenSSL.
This can cause conflicts with certain dependencies that require the old behavior.

Possible Remedies:
1. `export NODE_OPTIONS=--openssl-legacy-provider` (tested with node 17+)
2. Regress node version to 16.13.2 LTS (untested)

### Login problems
Some errors like `Could not initialize crypto service` might occur due to browser caching issues. Redeployment of the dapp can cause such problems. In this case clear browser's **local storage** and **IndexedDB**.

### SSL certificate problems

Some browsers may block local resources based on invalid SSL certificates. If while testing a locally deployed version of the encrypted notes dapp you observe certificate issues in your browser's console, please change the browser settings to **ignore certificates for resources loaded from localhost**. For example, this can be done in Google Chrome via [chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost).

## dfx.json file structure
`dfx.json` is the configuration of the project when deploying to either the local replica or to the IC, it assists in the creation of the `.dfx` directory (which contains `canister_ids.json` — which merely maps canister by name to their id on both local replica and the IC). There are various configuration options here and this is not exhaustive. This will primarily discuss target types for canisters (which all exist under the `canisters` key).

```sh
{
    "canisters": {
        "encrypted_notes_motoko": {
            "main": "src/encrypted_notes_motoko/main.mo",
            "type": "motoko"
        },
        "encrypted_notes_rust": {
            "type": "custom",
            "build": "cargo build --target wasm32-unknown-unknown --package encrypted_notes_rust --release",
            "wasm": "target/wasm32-unknown-unknown/release/encrypted_notes_rust.wasm",
            "candid": "src/encrypted_notes_rust/src/encrypted_notes_rust.did"
        },
        "www": {
            "dependencies": ["encrypted_notes_motoko"],
            "frontend": {
                "entrypoint": "src/frontend/public/index.html"
            },
            "source": ["src/frontend/public/"],
            "type": "assets"
        },
        "internet_identity": {
            "candid": "internet_identity.did",
            "type": "custom",
            "wasm": "internet_identity.wasm"
        }
    },
    "networks": {
        "local": {
            "bind": "0.0.0.0:8000",
            "type": "ephemeral"
        }
    },
    "version": 1
}
```

#### **encrypted_notes_motoko**:
Motoko is the IC-specific language for building and deploying canisters. Two keys are necessary:
`main`: The directory location of the entrypoint file of your canister.
`type`: needs to be "motoko", informing dfx of how to properly build the canister.

#### **encrypted_notes_rust**:
Rust natively supports WebAssembly — the binary format of the Internet Computer, and there is a crate ic_cdk which allows hooks into the IC. Unlike motoko, dfx does not yet have a native Rust target that infers as much as motoko canisters. So the keys that need to be provided are:
`type`: custom (letting dfx know that it's going to need to do some user-defined work)
`build`: whatever command needed to turn your project into a wasm binary. In this repo it's:

```sh
cargo build --package encrypted_notes_rust --target wasm32-unknown-unknown --release
```

`wasm`: wherever the wasm binary ends up at the end of the "build" command.
`candid`: There is not yet Rust autogeneration for candid IDL built into dfx, so DFX needs to know where you candid file for the canister built by "build" resides.


#### **www**:
frontend www canister (an "asset" canister) is the way we describe a set of files or a static website that we are deploying to the IC. Our project frontend is built in [Svelte](https://svelte.dev/). The keys we used are as follows:
`dependencies`: an array of whatever canisters are being used to serve your app, to ensure that dfx builds and deploys them before your app.
`frontend: { entrypoint: ""}`: This set of keys tells dfx to build it as a frontend canister, and entrypoint is wherever your app entrypoint winds up residing at the end of an npm build
`source`: where the rest of your app resides at the end of npm build
`type`: "assets" for an assets or static canister.  

#### **Binary targets**:
You can also just deploy arbitrary binary targets as long as they're wasm binaries. For that we use the keys:
`wasm`: a wasm file.
`candid`: a candidfile representing all interfaces in the wasm file.

:::info
If there is a mismatch between "wasm" and "candid" interface definitions, your canister will not deploy.
:::


## Local memory model

:::info
This dapp uses the web browser's **local storage** and **IndexedDB** for storing the following data:

- Device name.
- User identity info.
- A private/public key pair.

A symmetric key for encrypting/decrypting the notes is stored in RAM (this key is shared between multiple devices). For a better understanding of the mechanics of the dapp, please see the local storage/IndexedDB windows in your web browser. In Chrome, go to: **Developer Tools→Application→Local Storage/IndexedDB**.


## Acknowledgments
We thank the author of [IC Notes](https://github.com/pattad/ic_notes) whose code was the starting point for the frontend component used in this project.

We thank the authors of [IC Vault](https://github.com/timohanke/icvault) whose code was the starting point for this project's backend, browser-based encryption, and device management.
