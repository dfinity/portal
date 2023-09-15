# vetKeys API demo

## Overview

This demo provides a canister (`src/system_api`) that offers the vetKD system API proposed in https://github.com/dfinity/interface-spec/pull/158, implemented in an unsafe manner for demonstration purposes.

This demo uses files found in [this repository](https://github.com/dfinity/examples/tree/master/rust/vetkd).

## Prerequisites

- [x] Download and install the IC SDK package as described in the [installing the IC SDK](./../../setup/install/) page.
- [x] Download and install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- [x] Download and install [git](https://git-scm.com/downloads).


### Step 1: Begin by cloning the Github repository containing this project:

```
git clone https://github.com/dfinity/examples/
```

Then navigate into the directory specifically for this project:

For Motoko deployment:

```
cd examples/motoko/vetkd
```

For Rust deployment:

```
cd examples/rust/vetkd
```

### Step 2: Then, start a local instance of the Internet Computer:

```sh
dfx start --clean --background
```

### Step 3: Ensure the Canister SDK (dfx) uses the canister IDs that are hard-coded in the Rust source code:

```sh
dfx canister create system_api --specified-id s55qq-oqaaa-aaaaa-aaakq-cai
```

Without this, the Canister SDK (dfx) may use different canister IDs for the `system_api` and `app_backend` canisters in your local environment.

### Step 4: Ensure that the required node modules are available in your project directory, if needed, by running the following command:

```sh
npm install
```

### Step 5: Register, build and deploy the project:

```sh
dfx deploy
```

This command should finish successfully with output similar to the following one:

```sh
Deployed canisters.
URLs:
Frontend canister via browser
 app_frontend_js: http://127.0.0.1:4943/?canisterId=by6od-j4aaa-aaaaa-qaadq-cai
Backend canister via Candid interface:
 app_backend: http://127.0.0.1:4943/?canisterId=avqkn-guaaa-aaaaa-qaaea-cai&id=tcvdh-niaaa-aaaaa-aaaoa-cai
 app_frontend: http://127.0.0.1:4943/?canisterId=avqkn-guaaa-aaaaa-qaaea-cai&id=b77ix-eeaaa-aaaaa-qaada-cai
 system_api: http://127.0.0.1:4943/?canisterId=avqkn-guaaa-aaaaa-qaaea-cai&id=s55qq-oqaaa-aaaaa-aaakq-cai
```

### Step 6: Open the printed URL for the `app_frontend_js` in your browser.
