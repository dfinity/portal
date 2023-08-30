# 3: Developer environment 

## Setting up your environment 

Before you start your project, verify the following:

- [x] You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

- [x] You have a command line interface (CLI) window open. This window is also referred to as the 'terminal' window.

- [x] You have stopped any local execution environment processes running on your computer.

- [x] You have installed [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

- [x] You have downloaded and installed the Rust programming language and Cargo as described in the [Rust installation instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for your operating system.

    ``` bash
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```

- [x] You have installed the `wasm32-unknown-unknown` target:

    ``` bash
    rustup target add wasm32-unknown-unknown
    ```

- [x]  You have downloaded and installed the IC SDK package as described in the [installing the IC SDK](./../../setup/install/index.mdx) page.

    The [IC SDK setup guide](../../setup/install/index.mdx) provides tools, sample code, and documentation to help you create [Rust smart contracts](../choosing-language.md) and dapps to run on the Internet Computer mainnet. The setup guide assumes that you are installing the IC SDK for the first time.

    To support Rust development, the IC SDK includes the [Rust canister development kit (Rust CDK)](https://github.com/dfinity/cdk-rs). 

    **While using the IC SDK is the typical path for most developers, experienced Rust developers may choose to circumvent IC SDK entirely and use the [Rust CDK](https://github.com/dfinity/cdk-rs) directly.**

- [x] You have a code editor installed. The [VS Code IDE](https://code.visualstudio.com/download) is a popular choice for Rust.

- [x] You have downloaded and installed [git](https://git-scm.com/downloads).

- [x] Assure that all packages and tools above are updated to the latest release versions. 

## Next steps

After following the steps above, you're ready to get started developing backend canisters with Rust! To get started, check out the [Rust quick start guide](./4-quickstart.md).
