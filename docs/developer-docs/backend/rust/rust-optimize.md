# 6: Optimizing a Rust program

# Overview
Compiling Rust to WebAssembly often increases the file size significantly. The [DFINITY Rust CDK](../../../developer-docs/backend/rust/index.md) includes a helper library—`ic-wasm`—that you can use to reduce the size of Rust-based canisters before deploying them on the Internet Computer blockchain mainnet.

## Prerequisites

Before you optimize your program, verify the following:

- [x]   You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

- [x]   You have downloaded and installed the Rust programming language and Cargo as described in the [Rust installation instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for your operating system.

    ``` bash
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```

    The Rust tool chain must be at version 1.46.0, or later.

- [x]   You have downloaded and installed the IC SDK package as described in the [installing the IC SDK](/developer-docs/setup/install/index.mdx) page.

- [x]   You have `cmake` installed. For example, use Homebrew with the following command:

    ``` bash
    brew install cmake
    ```

    For instructions on how to install Homebrew, see the [Homebrew documentation](https://docs.brew.sh/Installation).

- [x]   You have successfully compiled your dapp to a WebAssembly module (Wasm) and deployed it on the local canister execution environment.

## Install and run the optimizer

To optimize a canister that resulted from compiling a Rust dapp:

- #### Step 1:  Check that you are still in root directory for your project directory, if needed.

- #### Step 2:  Install the `ic-wasm` crate, if you have not previously installed it, by running the following command:

    ``` bash
    cargo install ic-wasm
    ```

    This package optimizes your Rust code to reduce the size of the WebAssembly output to ensure your dapp can be uploaded to the Internet Computer blockchain mainnet as a canister.

- #### Step 3:  Create a release directory within the `src` directory for your program by running a command similar to the following:

    ``` bash
    mkdir -p src/rust-canister/target/wasm32-unknown-unknown/release/
    ```

- #### Step 4:  Optimize the code within the `target` directory by running a command similar to the following:

    ``` bash
    ic-wasm shrink target/wasm32-unknown-unknown/release/_rust_canister_.wasm -o target/wasm32-unknown-unknown/release/_rust_canister_-opt.wasm
    ```
