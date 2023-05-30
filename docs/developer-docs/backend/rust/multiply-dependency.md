# 2: Deploying a basic canister

## Overview

One common approach to dapp design is to calculate or store data in one canister smart contract – or canister for short – that you can then use in another canister. This ability to share and use functions defined in different canisters, even if the underlying smart contracts are written in different languages, is an important strategy for building dapps to run on the Internet Computer blockchain. This guide provides a basic introduction to how you can write functions in one language—in the example, Motoko—then use the data in another—in this case, Rust.

For this guide, both canisters are in the same project.

-   The Motoko canister creates an actor with a `cell` variable to contain the current value that results from an operation.

-   The `mul` function takes a natural number as input, multiplies the input value by three and stores the result in the `cell` variable.

-   The Rust canister provides a simple `read` function that returns the current value of the `cell` variable. Notice that the function making inter-canister call should be a `update` method even though the method to be called is `query`.

## Prerequisites

Before you start your project, verify the following:

- [x]   You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

- [x]   You have downloaded and installed the Rust programming language and Cargo as described in the [Rust installation instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for your operating system.

    ``` bash
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```

:::info
The Rust tool chain must be at version 1.46.0, or later.
:::

- [x]   You have downloaded and installed the IC SDK package as described in the [download and install](/developer-docs/setup/deploy-locally.md#download-and-install) page.

- [x]   You have `cmake` installed. For example, use Homebrew with the following command:

    ``` bash
    brew install cmake
    ```

    For instructions on how to install Homebrew, see the [Homebrew documentation](https://docs.brew.sh/Installation).

- [x]   You have stopped any local canister execution environment processes running on your computer.

## Create a new project

To create a new project directory for this guide:

- #### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

- #### Step 2:  Create a new project by running the following command:

    ``` bash
    dfx new --type=rust rust_deps
    ```

- #### Step 3:  Change to your project directory by running the following command:

    ``` bash
    cd rust_deps
    ```

## Modify the default project

### Edit the default canister settings

Because this sample project is going to consist of two canisters-the Motoko canister and the Rust canister—you need to modify the default `dfx.json` configuration file to include information for building both the Motoko canister and a Rust canister.

To modify the `dfx.json` configuration file:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Open the `dfx.json` configuration file in a text editor.

- #### Step 3:  Insert a new section before the `canisters.rust_deps_backend` settings with settings for building a Motoko program.

    For example, in the `canisters` section, add a new `multiply_deps` key with settings like these:

    ``` json
    "multiply_deps": {
      "main": "src/multiply_deps/main.mo",
      "type": "motoko"
    }
    ```

- #### Step 4:  Add a `dependencies` setting to the `rust_deps_backend`.

    The `dependencies` setting enables you to import functions from one canisters for use in another canister. For this guide, we want to import a function from the `multiply_deps` canister—written in Motoko—and use it from the `rust_deps` canister written in Rust. Then the `rust_deps_backend` field will look like:

    ``` json
    "rust_deps_backend": {
      "candid": "src/rust_deps_backend/rust_deps_backend.did",
      "package": "rust_deps_backend",
      "type": "rust",
      "dependencies": [
        "multiply_deps"
      ]
    },
    ```
- #### Step 5:  Remove all of the `rust_deps_frontend` configuration settings from the file.

    The sample dapp for this guide doesn’t use any frontend assets, so you can remove those settings from the configuration file.

    You can also remove the `defaults` settings.

    For example, your configuration file might look like this after you modify the settings.

```json
{
  "version": 1,
  "canisters": {
    "multiply_deps": {
      "main": "src/multiply_deps/main.mo",
      "type": "motoko"
    },
    "rust_deps_backend": {
      "type": "rust",
      "package": "rust_deps_backend",
      "candid": "src/rust_deps_backend/rust_deps_backend.did",
      "dependencies": [
        "multiply_deps"
      ]
    }
  }
}
```

- #### Step 6:  Save your change and close the `dfx.json` file to continue.

### Implement Motoko canister

The next step is to create a file at `src/multiply_deps/main.mo` with code that implements the `mul` and `read` functions.

To write the Motoko source code:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Create the directory for the Motoko canister.

    ``` bash
    mkdir src/multiply_deps
    ```

- #### Step 3:  Create and open the `src/multiply_deps/main.mo` file in a text editor.

- #### Step 4:  Copy and paste this code into the `main.mo` file.

```motoko
actor Multiply {

    var cell : Nat = 1;

    public func mul(n : Nat) : async Nat { cell *= n * 3; cell };

    public query func read() : async Nat {
        cell;
    };
};
```

- #### Step 5:  Save your changes and close the file to continue.

### Replace the default Rust canister

Now that we have the Motoko canister that the Rust canister depends upon, let’s add the Rust canister to the project.

To replace the default Rust canister:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Open the template `src/rust_deps_backend/src/lib.rs` file in a text editor and delete the existing content.

    The next step is to write a Rust program that imports the Motoko canister and implements the `read` function.

- #### Step 3:  Copy and paste this code into the `lib.rs` file.

    ```rust
    use ic_cdk_macros::*;
    use ic_cdk::export::candid;

    #[import(canister = "multiply_deps")]
    struct CounterCanister;

    #[update]
    async fn read() -> candid::Nat {
        CounterCanister::read().await.0
    }
    ```

- #### Step 4:  Save your changes and close the `src/rust_deps_backend/src/lib.rs` file to continue.

### Update interface description file

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer blockchain. Candid files provide a language-independent description of a canister’s interfaces including the names, parameters, and result formats and data types for each function a canister defines.

By adding Candid files to your project, you can ensure that data is properly converted from its definition in Rust to run safely on the Internet Computer blockchain.

To see details about the Candid interface description language syntax, see the [**Candid guide**](../candid/index.md) or the [Candid crate documentation](https://docs.rs/candid/).

To update the Candid file for this guide:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Open the `src/rust_deps_backend/rust_deps_backend.did` file in a text editor.

- #### Step 3:  Copy and paste the following `service` definition for the `read` function:

    ``` did
    service : {
      "read": () -> (nat);
    }
    ```

- #### Step 4:  Save your changes and close the `rust_deps_backend.did` file to continue.

## Start the local canister execution environment

Before you can build the project, you need to connect to the local canister execution environment in your development environment or the Internet Computer blockchain mainnet.

To start the network locally:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Start the local canister execution environment on your computer in the background by running the following command:

    ``` bash
    dfx start --clean --background
    ```

    Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

## Register, build, and deploy your project

After you connect to the local canister execution environment running in your development environment, you can register, build, and deploy your project locally.

To register, build, and deploy:

- #### Step 1:  Check that you are still in root directory for your project directory, if needed.

- #### Step 2:  Register, build, and deploy the canisters specified in the `dfx.json` file by running the following command:

    ``` bash
    dfx deploy
    ```

    The `dfx deploy` command output displays information about each of the operations it performs similar to the following excerpt:

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "default" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Deploying all canisters.
        Creating canisters...
        Creating canister multiply_deps...
        multiply_deps canister created with canister id: rrkah-fqaaa-aaaaa-aaaaq-cai
        Creating canister rust_deps_backend...
        rust_deps_backend canister created with canister id: ryjl3-tyaaa-aaaaa-aaaba-cai
        Building canisters...
        Checking for vulnerabilities in rust canisters.
            Fetching advisory database from `https://github.com/RustSec/advisory-db.git`
              Loaded 469 security advisories (from /Users/moritz/.cargo/advisory-db)
            Updating crates.io index
            Scanning Cargo.lock for vulnerabilities (110 crate dependencies)
        Audit found no vulnerabilities.
        Shrink WASM module size.
        Executing: cargo build --target wasm32-unknown-unknown --release -p rust_deps_backend --locked
            Finished release [optimized] target(s) in 0.07s
        Shrink WASM module size.
        Installing canisters...
        Creating UI canister on the local network.
        The UI canister on the "local" network is "r7inp-6aaaa-aaaaa-aaabq-cai"
        Installing code for canister multiply_deps, with canister ID rrkah-fqaaa-aaaaa-aaaaq-cai
        Installing code for canister rust_deps_backend, with canister ID ryjl3-tyaaa-aaaaa-aaaba-cai
        Deployed canisters.
        URLs:
          Backend canister via Candid interface:
            multiply_deps: http://127.0.0.1:4943/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai
            rust_deps_backend: http://127.0.0.1:4943/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=ryjl3-tyaaa-aaaaa-aaaba-cai

## Call functions on the deployed canister

After successfully deploying the canister, you can test the canister by invoking the functions it provides.

For this guide:

-   Call the `mul` function to multiply the value of the `cell` variable by three each time it is called.

-   Call the `read` function to return the current value of the `cell` variable.

To test the deployed canister:

- #### Step 1:  Call the `read` function from the Motoko canister, which reads the current value of the `cell` variable on the deployed canister:

    ``` bash
    dfx canister call multiply_deps read
    ```

    The command returns the current value of the `cell` variable as one:

        (1 : nat)

- #### Step 2:  Call the `mul` function to multiply the input argument by three by running the following command:

    ``` bash
    dfx canister call multiply_deps mul '(3)'
    ```

    The command returns the new value of the `cell` variable:

        (9 : nat)

- #### Step 3:  Call the `read` function using the `rust_deps` canister that imports functions from the `multiply_deps` canister:

    ``` bash
    dfx canister call rust_deps_backend read
    ```

    The command returns the current value of the `cell` variable:

        (9 : nat)

## Stop the local canister execution environment

After you finish experimenting with your dapp, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local execution environment running on your computer, run the following command:

``` bash
dfx stop
```
