---
sidebar_position: 1
---
# Hello, World! Rust CDK Quick Start

The DFINITY Canister Development Kit (CDK) for Rust provides tools, sample code, and documentation to help you create dapps to run on the decentralized Internet Computer blockchain mainnet. This *Hello, World! Rust CDK Quick Start* assumes that you are installing the DFINITY Rust CDK for the first time.

To help you get started, this tutorial illustrates how to modify the traditional "Hello World" first dapp to use the DFINITY Rust CDK. This simple dapp has just one function that prints text to a terminal, but it provides a good model for understanding the workflow when writing dapps in Rust that you want to deploy on the Internet Computer blockchain.

## Before you begin

Before you start your project, verify the following:

-   You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

-   You have downloaded and installed the Rust programming language and Cargo as described in the [Rust installation instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for your operating system.

    ``` bash
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```

    The Rust tool chain must be at version 1.46.0, or later.

-   You have downloaded and installed the DFINITY Canister Software Development Kit (SDK) package as described in [Installing the SDK](./../../setup/install-upgrade-remove.mdx).

-   You have `cmake` installed. For example, use Homebrew with the following command:

    ``` bash
    brew install cmake
    ```

    For instructions on how to install Homebrew, see the [Homebrew Documentation](https://docs.brew.sh/Installation).
    
-   You have stopped any local execution environment processes running on your computer.

## Create a new project

Applications for the Internet Computer blockchain start as **projects**. You can create new projects for the Internet Computer blockchain using the DFINITY Canister SDK. Because you are building this project to be deployed on the Internet Computer blockchain, this tutorial focuses on how to create, build, and deploy a Rust program by using the `dfx` parent command and its subcommands.

To create a new project using the DFINITY Canister SDK:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Create a new project with rust canister named `rust_hello` by running the following command:

    ``` bash
    dfx new --type=rust rust_hello
    ```

    The `dfx new --type=rust rust_hello` command creates a new `rust_hello` project directory, template files, and a new `rust_hello` Git repository for your project.

3.  Change to your project directory by running the following command:

    ``` bash
    cd rust_hello
    ```

## Take a look at the project

The project is ready to be compiled and deployed to the Internet Computer blockchain. Before that, let’s go through the project files.

### `dfx.json`

One of the template files included in your project directory is a default `dfx.json` configuration file. This file contains settings required to build a project for the Internet Computer blockchain much like the `Cargo.toml` file provides build and package management configuration details for Rust programs.

The configuration file should look like [this](../../_attachments/rust-quickstart-dfx.json).

Notice that under the `canisters` key, you have some default settings for the `rust_hello_backend` canister.

1.  `"type": "rust"` specifies that `rust_hello_backend` is a `rust` type canister.

2.  `"candid": "src/rust_hello_backend/rust_hello_backend.did""` specifies the location of the Candid interface description file to use for the canister.

3.  `"package": "rust_hello_backend"` specifies the package name of the Rust crate. It should be the same as in the crate `Cargo.toml` file.

### `Cargo.toml`

In the root directory, there is a `Cargo.toml` file.

It defines a Rust workspace by specifying paths to each Rust crate. A Rust type canister is just a Rust crate compiled to WebAssembly. Here we have one member at `src/rust_hello_backend` which is the only Rust canister.

``` toml
[workspace]
members = [
    "src/rust_hello_backend",
]
```

### `src/rust_hello_backend/`

Now we are in the Rust canister. As any standard Rust crate, it has a `Cargo.toml` file which configures the details to build the Rust crate.

#### `src/rust_hello_backend/Cargo.toml`

``` toml
[package]
name = "rust_hello_backend"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
crate-type = ["cdylib"]

[dependencies]
candid = "0.8.2"
ic-cdk = "0.6.0"
ic-cdk-macros = "0.6.0"

```

Notice the `crate-type = ["cdylib"]` line which is necessary to compile this Rust program into WebAssembly module.

#### `src/rust_hello_backend/src/lib.rs`

The default project has a simple `greet` function that uses the DFINITY Rust CDK `query` macro.

``` rust
#[ic_cdk_macros::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

```

#### `src/rust_hello_backend/rust_hello_backend.did`

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer. Candid files provide a language-independent description of a canister’s interfaces including the names, parameters, and result formats and data types for each function a canister defines.

By adding Candid files to your project, you can ensure that data is properly converted from its definition in Rust to run safely on the Internet Computer blockchain.

To see details about the Candid interface description language syntax, see the [*Candid Guide*](./../candid/candid-intro.md) or the [Candid crate documentation](https://docs.rs/candid/).

``` did
service : {
    "greet": (text) -> (text) query;
}

```

This definition specifies that the `greet` function is a `query` method which takes `text` data as input and returns `text` data.

## Start the local execution environment

Before you can build your project, you need to connect to the local execution environment running in your development environment or the decentralized Internet Computer blockchain mainnet.

To start the local execution environment:

1.  Check that you are still in the root directory for your project, if needed.

2.  Start the local execution environment on your computer in the background by running the following command:

    ``` bash
    dfx start --background
    ```

    Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

## Register, build, and deploy your project

After you connect to the local execution environment running in your development environment, you can register, build, and deploy your project locally.

To register, build, and deploy:

1.  Check that you are still in root directory for your project directory, if needed.

2.  Make sure you have `wasm32-unknown-unknown` installed by running the command:

    ``` bash
    rustup target add wasm32-unknown-unknown
    ```

3.  Register, build, and deploy the canisters specified in the `dfx.json` file by running the following command:

    ``` bash
    dfx deploy
    ```

    The `dfx deploy` command output displays information about each of the operations it performs similar to the following excerpt:

    ``` bash
    Creating a wallet canister on the local network.
    The wallet canister on the "local" network for user "default" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
    Deploying all canisters.
    Creating canisters...
    Creating canister rust_hello_backend...
    rust_hello_backend canister created with canister id: rrkah-fqaaa-aaaaa-aaaaq-cai
    Creating canister rust_hello_frontend...
    rust_hello_frontend canister created with canister id: ryjl3-tyaaa-aaaaa-aaaba-cai
    Building canisters...

    ...

    Deployed canisters.
    URLs:
      Frontend canister via browser
        rust_hello_frontend: http://127.0.0.1:4943/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai
      Backend canister via Candid interface:
        rust_hello_backend: http://127.0.0.1:4943/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai
    ```


## Test the dapp

There are several ways to interact with your canisters. Let's talk about access from the browser first. 

To access the frontend canister (`rust_hello_frontend`) you can simply follow the link that was printed in the terminal in the previous step.
```
    Frontend canister via browser
        rust_hello_frontend: http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai
```

Frontend canisters, also called `asset canisters`, allow to access web content directly from a smart contract. This enables you to deploy your entire dapp, not just the backend, on the Internet Computer.

To access the backend canister (`rust_hello_backend`) you can again open the URL printed to your terminal in the previous step.
```
Backend canister via Candid interface:
        rust_hello_backend: http://127.0.0.1:8000/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai
```
Using this method, we open the so called [`Candid UI` canister](https://github.com/dfinity/candid/tree/master/tools/ui) that is automatically deployed to our local replica when you first run `dfx deploy`. The `Candid UI` canister fetches the interface from your backend canister and allows you to test and browse your canister's API with a visual web interface.

To test the deployed `rust_hello_backend` locally from your command line using dfx, try the following:

1.  Check that you are still in root directory for your project directory, if needed.

2.  Call the `greet` function in the dapp by running the following command:

    ``` bash
    dfx canister call rust_hello_backend greet world
    ```

3.  Verify that the call to the `rust_hello_backend` canister `greet` function returns a text message `("Hello, world!")`.

## Stop the local execution environment

After testing the application, you can stop the local execution environment so that it doesn’t continue running in the background.

To stop the local execution environment running on your computer, run the following command:

```bash
dfx stop
```
