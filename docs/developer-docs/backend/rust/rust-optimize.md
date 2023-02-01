# Optimize a Rust program

Compiling Rust to WebAssembly often increases the file size significantly. The DFINITY Rust CDK includes a helper library—`ic-cdk-optimizer`—that you can use to reduce the size of Rust-based canisters before deploying them on the Internet Computer blockchain mainnet.

## Before you begin

Before you optimize your program, verify the following:

-   You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

-   You have downloaded and installed the Rust programming language and Cargo as described in the [Rust installation instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for your operating system.

    ``` bash
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```

    The Rust tool chain must be at version 1.46.0, or later.

-   You have downloaded and installed the DFINITY Canister Software Development Kit (SDK) package as described in [Installing the SDK](/developer-docs/setup/install/index.mdx).

-   You have `cmake` installed. For example, use Homebrew with the following command:

    ``` bash
    brew install cmake
    ```

    For instructions on how to install Homebrew, see the [Homebrew Documentation](https://docs.brew.sh/Installation).

-   You have successfully compiled your dapp to a WebAssembly module (WASM) and deployed it on the local canister execution environment.

## Install and run the optimizer

To optimize a canister that resulted from compiling a Rust dapp:

1.  Check that you are still in root directory for your project directory, if needed.

2.  Install the `ic-cdk-optimizer` crate, if you have not previously installed it, by running the following command:

    ``` bash
    cargo install ic-cdk-optimizer
    ```

    This package optimizes your Rust code to reduce the size of the WebAssembly output to ensure your dapp can be uploaded to the Internet Computer blockchain mainnet as a canister.

3.  Create a release directory within the `src` directory for your program by running a command similar to the following:

    ``` bash
    mkdir -p src/rust-canister/target/wasm32-unknown-unknown/release/
    ```

4.  Optimize the code within the `target` directory by running a command similar to the following:

    ``` bash
    ic-cdk-optimizer target/wasm32-unknown-unknown/release/_rust_canister_.wasm -o target/wasm32-unknown-unknown/release/_rust_canister_-opt.wasm
    ```
