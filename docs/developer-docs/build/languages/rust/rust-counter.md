# Incrementing a counter

In this tutorial, you are going to write a dapp that provides a few basic functions to increment a counter and illustrates the persistence of a value.

For this tutorial, the dapp declares a `COUNTER` as a mutable variable to contain a natural number that represents the current value of the counter. This dapp supports the following functions:

-   The `increment` function updates the current value, incrementing by 1 with no return value.

-   The `get` function is a simple query that returns the current value of the counter.

-   The `set` function updates the current value to the numeric value you specify as an argument.

This tutorial provides a simple example of how you can increment a counter by calling functions on a deployed canister. By calling the function to increment a value multiple times, you can verify that the variable state—that is, the value of the variable between calls—persists.

Like the other sample dapps, this tutorial demonstrates a simple, but realistic, workflow in which you perform the following steps:

-   Create a new project.

-   Write a dapp that compiles into a WebAssembly module.

-   Deploy the canister on the local canister execution environment.

-   Invoke the canister methods to increment then read the value of a counter.

## Before you begin

Before you start your project, verify the following:

-   You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

-   You have downloaded and installed the Rust programming language and Cargo as described in the [Rust installation instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for your operating system.

    ``` bash
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```

    The Rust tool chain must be at version 1.46.0, or later.

-   You have downloaded and installed the DFINITY Canister Software Development Kit (SDK) package as described in [Download and install](../../../quickstart/local-quickstart#download-and-install).

-   You have `cmake` installed. For example, use Homebrew with the following command:

    ``` bash
    brew install cmake
    ```

    For instructions on how to install Homebrew, see the [Homebrew Documentation](https://docs.brew.sh/Installation).

-   You have stopped any local canister execution environment processes running on your computer.

This tutorial takes approximately 20 minutes to complete.

## Create a new project

To create a new project directory for this tutorial:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Create a new project by running the following command:

    ``` bash
    dfx new --type=rust rust_counter
    ```

3.  Change to your project directory by running the following command:

    ``` bash
    cd rust_counter
    ```

## Modify the default project

In the [Hello, World! Rust CDK Quick Start](rust-quickstart), you went through the files in a default project with Rust type canister.

To complete this tutorial, you’ll need to complete the following steps:

-   [Replace the default dapp](#_replace_the_default_dapp)

-   [Update interface description file](#_update_interface_description_file)

### Replace the default dapp

Now that you have the files in place for your Rust dapp, we can replace the template `lib.rs` dapp with the Rust dapp we want to deploy on the Internet Computer blockchain.

To replace the default dapp:

1.  Check that you are still in the root directory for your project, if needed.

2.  Open the template `src/rust_counter/lib.rs` file in a text editor and delete the existing content.

    The next step is to write a Rust dapp that declares the `COUNTER` variable and implements the `increment`, `get`, and `set` functions.

3.  Copy and paste the following sample code into the `lib.rs` file:

    ``` motoko
    Unresolved directive in rust-counter.adoc - include::example$counter-tutorial/counter.rs[]
    ```

4.  Save your changes and close the `lib.rs` file to continue.

### Update interface description file

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer. Candid files provide a language-independent description of a canister’s interfaces including the names, parameters, and result formats and data types for each function a canister defines.

By adding Candid files to your project, you can ensure that data is properly converted from its definition in Rust to run safely on the Internet Computer blockchain.

To see details about the Candid interface description language syntax, see the [*Candid Guide*](../candid/candid-intro) or the [Candid crate documentation](https://docs.rs/candid/).

To update the Candid file for this tutorial:

1.  Check that you are still in the root directory for your project, if needed.

2.  Open the `src/rust_counter/rust_counter.did` file in a text editor, then copy and paste the following `service` definition for the `increment`, `get`, and `set` functions:

    ``` did
    service : {
      "increment": () -> ();
      "get": () -> (nat) query;
      "set": (nat) -> ();
    }
    ```

3.  Save your changes and close the `rust_counter.did` file to continue.

## Start the local canister execution environment

Before you can build the `rust_counter` project, you need to connect to the local canister execution environment running in your development environment or the decentralized Internet Computer blockchain mainnet.

To start the local canister execution environment:

1.  Check that you are still in the root directory for your project, if needed.

2.  Start the local canister execution environment on your computer in the background by running the following command:

    ``` bash
    dfx start --background
    ```

    Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

## Register, build, and deploy your project

After you connect to the local canister execution environment running in your development environment, you can register, build, and deploy your project locally.

To register, build, and deploy:

1.  Check that you are still in root directory for your project directory, if needed.

2.  Register, build, and deploy the canisters specified in the `dfx.json` file by running the following command:

    ``` bash
    dfx deploy
    ```

    The `dfx deploy` command output displays information about each of the operations it performs similar to the following excerpt:

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "default" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Deploying all canisters.
        Creating canisters...
        Creating canister "rust_counter"...
        "rust_counter" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"
        Creating canister "rust_counter_assets"...
        "rust_counter_assets" canister created with canister id: "ryjl3-tyaaa-aaaaa-aaaba-cai"
        Building canisters...
        Executing: "cargo" "build" "--target" "wasm32-unknown-unknown" "--release" "-p" "rust_counter"
        ...
            Finished release [optimized] target(s) in 53.36s
        Building frontend...
        Installing canisters...
        Creating UI canister on the local network.
        The UI canister on the "local" network is "r7inp-6aaaa-aaaaa-aaabq-cai"
        Installing code for canister rust_counter, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
        ...
        Deployed canisters.

## Call functions and test the dapp

After successfully deploying the canister, you can test the canister by invoking the functions it provides. For this tutorial:

-   Call the `get` function to query the value of the counter.

-   Call the `increment` function to increment the counter each time it is called.

-   Call the `set` function to pass an argument to update the counter to an arbitrary value you specify.

To test the dapp:

1.  Call the `get` function to read the current value of the `COUNTER` variable by running the following command:

    ``` bash
    dfx canister call rust_counter get
    ```

    The command returns the current value of the `COUNTER` variable as zero:

        (0 : nat)

2.  Call the `increment` function to increment the value of the `COUNTER` variable by one:

    ``` bash
    dfx canister call rust_counter increment
    ```

    This command increments the value of the variable—changing its state—but does not return the result.

3.  Rerun the command to call the `get` function to see the current value of the `COUNTER` variable:

    ``` bash
    dfx canister call rust_counter get
    ```

    The command returns the updated value of the `COUNTER` variable as one:

        (1 : nat)

4.  Run additional commands to experiment with call the functions and using different values.

    For example, try commands similar to the following to set and return the counter value:

    ``` bash
    dfx canister call rust_counter set '(987)'
    dfx canister call rust_counter get
    ```

    Returns the current value of 987.

    ``` bash
    dfx canister call rust_counter increment
    dfx canister call rust_counter get
    ```

    Returns the incremented value of 988.

## Stop the local canister execution environment

After you finish experimenting with your dapp, you can stop the local Internet Computer network so that it doesn’t continue running in the background.

To stop the local canister execution environment:

1.  In the terminal that displays network operations, press Control-C to interrupt the local canister execution environment process.

2.  Stop the local canister execution environment by running the following command:

    ``` bash
    dfx stop
    ```
