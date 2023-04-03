# Clang-Supported Languages

Because the IC supports dapps compiled to standard WebAssembly modules, you can use standard compilers and toolchains to build applications in languages such as C, C++, Objective-C, and Objective-C++ programming languages and the `Clang` compiler.

## Using C

To illustrate how to migrate dapps written in C to run on the IC, let’s look at the simple `reverse.c` program in the [examples](https://github.com/dfinity/examples/tree/master/c) repository. The `reverse.c` program contains one function—named `go`—that reverses a string in place.

### Set up the development environment

To compile the `reverse.c` program into WebAssembly, you need to have the `clang` compiler and standard libraries installed. You can check whether you have `clang` installed on your local computer by running the following command:

    clang --version

If `clang` is installed, the command displays information similar to the following:

    clang version 10.0.0
    Target: x86_64-apple-darwin19.5.0
    Thread model: posix
    InstalledDir: /usr/local/opt/llvm/bin

If the command doesn’t return version information, install `clang` before continuing. The steps to install `clang` vary depending on the operating system you are using. On Debian Linux, for example, run the following command:

    sudo apt-get install clang lld gcc-multilib

On macOS, you can install `clang` by installing the Developer Command-Line Tools or by installing LLVM using Homebrew. For example, if `clang` is not installed, run the following command:

    brew install llvm

### Compile the program into WebAssembly

You can compile a C program to run as a WebAssembly module by first compiling using `clang`, then linking using `wasm-ld`. Depending on the operating system and version of `clang` you are using, you might use a different version of the WebAssembly linker, such as `wasm-ld` on macOS or `wasm-ld-8` on Debian.

To compile to WebAssembly on macOS:

1.  Compile the program by running the following clang command:

        clang --target=wasm32 -c -O3 reverse.c

2.  Run the linker to create the WebAssembly module by running the following `wasm-ld` command:

        wasm-ld --no-entry --export-dynamic --allow-undefined reverse.o -o reverse.wasm

### Create a minimal configuration file

Next, you need to prepare a simple configuration file that identifies the `reverse` dapp binary as a package that can be installed on the IC and a `build` directory so that you can use the `dfx` command-line interface to install and run the package as a canister.

To prepare a configuration file and build directory:

1.  Create a `dfx.json` file with a canisters key by running the following command:

        echo '{"canisters":{"reverse":{"main":"reverse"}}}' > dfx.json

2.  Create a `build` directory for the dapp by running the following command:

        mkdir build

3.  Create a `reverse` directory for the dapp by running the following command:

        mkdir build/reverse

4.  Copy the WebAssembly modules to the new `build/reverse` directory by running the following command:

        cp reverse.wasm build/reverse/

### Create a minimal interface description file

In a standard development workflow, running the `dfx build` command creates several files in the `canisters` output directory, including one or more Candid interface description (`.did`) files that handle type matching for the data types associated with a program’s functions.

For details about the syntax to use for different data types, see the [*Candid Guide*](/developer-docs/backend/candid/index.md) and [Candid specification](https://github.com/dfinity/candid/tree/master/spec).

To create a Candid interface description file for this program:

1.  Open a terminal in the `build` directory you created for the `reverse.c` program source

2.  Create a new text file named `reverse.did`.

3.  Add a description of the `go` function.

    For example:

        service : {
          "go": (text) -> (text);
        }

4.  Save your changes and close the file to continue.

### Deploy and test the dapp

Before you can deploy and test your dapp, you need to do the following:

-   Connect to either the local canister execution environment, or to the IC blockchain mainnet.

-   Register a network-specific identifier for the application.

To deploy and test the dapp locally:

1.  Open a new terminal window or tab on your local computer.

    For example, if running Terminal on macOS,click **Shell**, then select **New Tab** to open a new terminal in your current working directory.

2.  Start the local canister execution environment in your second terminal by running the following command:

        dfx start

3.  Register a unique canister identifier for the `reverse` application by running the following command:

        dfx canister create --all

4.  Deploy the default dapp on the local canister execution environment by running the following command:

        dfx canister install --all

5.  Call the `go` function in the dapp by running the following command:

        dfx canister call reverse go reward
        ("drawer")

You can find additional examples of C dapps in the [examples](https://github.com/dfinity/examples/tree/master/c) repository.
