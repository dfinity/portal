# Adding and searching simple records

In this tutorial, you are going to write a dapp that provides a few basic functions to add and retrieve simple profile records that consist of a name, description, and an array of keywords.

This program supports the following functions:

-   The `update` function enables you to add a profile that consists of a `name`, a `description`, and `keywords`.

-   The `getSelf` function returns the profile for the principal associated with the function caller.

-   The `get` function performs a simple query to return the profile matching the `name` value passed to it. For this function, the name specified must match the `name` field exactly to return the record.

-   The `search` function performs a more complex query to return the profile matching all or part of the text specified in any profile field. For example, the `search` function can return a profile containing a specific keyword or that matches only part of a name or description.

This tutorial provides a simple example of how you can use the Rust CDK interfaces and macros to simplify writing dapps in Rust for the Internet Computer blockchain.

This tutorial demonstrates: \* How to represent slightly more complex data—in the form of a profile as a `record` and an `array` of keywords—using the Candid interface description language. \* How to write a simple search function with partial string matching. \* How profiles are associated with a specific principal.

## Before you begin

Before you start your project, verify the following:

-   You have an internet connection and access to a shell terminal on your local macOS or Linux computer.

-   You have downloaded and installed the Rust programming language and Cargo as described in the [Rust installation instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for your operating system.

    ``` bash
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```

    The Rust tool chain must be at version 1.46.0, or later.

-   You have downloaded and installed the DFINITY Canister Software Development Kit (SDK) package as described in [Download and install](../../../quickstart/hello10mins.md).

-   You have `cmake` installed. For example, use Homebrew with the following command:

    ``` bash
    brew install cmake
    ```

    For instructions on how to install Homebrew, see the [Homebrew Documentation](https://docs.brew.sh/Installation).

-   You have stopped any local execution environment processes running on your computer.

This tutorial takes approximately 20 minutes to complete.

## Create a new project

To create a new project directory for this tutorial:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Create a new project by running the following command:

    ``` bash
    dfx new --type=rust rust_profile
    ```

3.  Change to your project directory by running the following command:

    ``` bash
    cd rust_profile
    ```

## Modify the default project

In the [Hello, World! Rust CDK Quick Start](rust-quickstart), you went through the files in a default project with Rust type canister.

To complete this tutorial, you’ll need to complete the following steps:

-   [Replace the default dapp](#_replace_the_default_dapp)

-   [Update interface description file](#_update_interface_description_file)

### Replace the default dapp

Now that you have the files in place for your Rust dapp, we can replace the template `lib.rs` dapp with the Rust dapp we want to deploy on the Internet Computer blockchain.

To replace the default program:

1.  Check that you are still in the root directory for your project, if needed.

2.  Open the `src/rust_profile/Cargo.toml` file in a text editor and add `serde` to dependencies.

    ``` toml
    [dependencies]
    ic-cdk = "0.5"
    ic-cdk-macros = "0.5"
    serde = "1.0"
    ```

3.  Open the template `src/rust_profile/lib.rs` file in a text editor and delete the existing content.

    The next step is to add a Rust program that implements the `getSelf`, `update`, `get`, and `search` functions.

4.  Copy and paste [this code](../../_attachments/profile.rs) into the `profile.rs` file.

5.  Save your changes and close the file to continue.

## Update interface description file

Candid is an interface description language (IDL) for interacting with canisters running on the Internet Computer. Candid files provide a language-independent description of a canister’s interfaces including the names, parameters, and result formats and data types for each function a canister defines.

By adding Candid files to your project, you can ensure that data is properly converted from its definition in Rust to run safely on the Internet Computer blockchain.

To see details about the Candid interface description language syntax, see the [*Candid Guide*](../candid/candid-intro) or the [Candid crate documentation](https://docs.rs/candid/).

To update Candid file for this tutorial:

1.  Check that you are still in the root directory for your project, if needed.

2.  Open the \`src/rust_profile/rust_profile.did\`file in a text editor.

3.  Copy and paste [these](../../_attachments/profile.did) `type` declaration and `service` definition for the `getSelf`, `update`, `get`, and `search` functions.

4.  Save your changes and close the file to continue.

## Start the local execution environment

Before you can build the `rust_profile` project, you need to connect to the local execution environment running in your development environment or the decentralized Internet Computer blockchain mainnet.

To start local execution environment:

1.  Check that you are still in the root directory for your project, if needed.

2.  Start the local execution environment on your computer in the background by running the following command:

    ``` bash
    dfx start --background --clean
    ```

    Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

## Register, build, and deploy your project

After you connect to the local execution environment running in your development environment, you can register, build, and deploy your project locally.

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
        Creating canister "rust_profile"...
        "rust_profile" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"
        Creating canister "rust_profile_assets"...
        "rust_profile_assets" canister created with canister id: "ryjl3-tyaaa-aaaaa-aaaba-cai"
        Building canisters...
        Executing: "cargo" "build" "--target" "wasm32-unknown-unknown" "--release" "-p" "rust_profile"
        ...
            Finished release [optimized] target(s) in 6.31s
        Building frontend...
        Installing canisters...
        Creating UI canister on the local network.
        The UI canister on the "local" network is "r7inp-6aaaa-aaaaa-aaabq-cai"
        Installing code for canister rust_profile, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
        ...
        Deployed canisters.

## Call functions on the deployed canister

After successfully deploying the canister, you can test the canister by calling the functions it provides.

For this tutorial:

-   Call the `update` function to add a profile.

-   Call the `getSelf` function to display the profile for the principal identity.

-   Call the `search` function to look up the profile using a keyword.

To test the deployed canister:

1.  Call the `update` function to create a profile record by running the following command:

    ``` bash
    dfx canister call rust_profile update '(record {name = "Luxi"; description = "mountain dog"; keywords = vec {"scars"; "toast"}})'
    ```

2.  Call the `getSelf` function to retrieve a profile record by running the following command:

    ``` bash
    dfx canister call rust_profile getSelf
    ```

    The command returns the profile you used the `update` function to add. For example:

        (  record {
            name = "Luxi";
            description = "mountain dog";
            keywords = vec { "scars"; "toast" };
          },
        )

    In its current form, the dapp only stores and returns one profile. If you run the following command to add a second profile using the `update` function, the command replaces the `Luxi` profile with the `Dupree` profile:

    ``` bash
    dfx canister call rust_profile update '(record {name = "Dupree"; description = "black dog"; keywords = vec {"funny tail"; "white nose"}})'
    ```

    You can use the `get`, `getSelf`, and `search` functions, but they will only return results for the `Dupree` profile.

3.  Run the following command to call the `search` function:

    ``` bash
    dfx canister call rust_profile search '("black")';
    ```

    This command finds the matching profile using the `description` and returns the profile:

        (
          opt record {
            name = "Dupree";
            description = "black dog";
            keywords = vec { "funny tail"; "white nose" };
          },

## Adding profiles for new identities

In its current form, the dapp only stores one profile—the one associated with the principal invoking the commands. To test that the `get`, `getSelf`, and `search` functions do what we want them to, we need to add some new identities that can have different profiles.

To add identities for testing:

1.  Create a new user identity by running the following command:

    ``` bash
    dfx identity new Miles
    ```

        Creating identity: "Miles".
        Created identity: "Miles".

2.  Call the `update` function to add a profile for the new identity.

    ``` bash
    dfx canister call --identity Miles rust_profile update '(record {name = "Miles"; description = "Great Dane"; keywords = vec {"Boston"; "mantle"; "three-legged"}})'
    ```

3.  Call the `getSelf` function to view the profile associated with the `default` user identity.

    ``` bash
    dfx canister call rust_profile getSelf
    ```

    The command displays the profile currently associated with the default identity, in this example, the Dupree profile:

        (
          record {
            name = "Dupree";
            description = "black dog";
            keywords = vec { "funny tail"; "white nose" };
          },
        )

4.  Call the `getSelf` function using the `Miles` user identity by running the following command:

    ``` bash
    dfx canister call --identity Miles rust_profile getSelf
    ```

    The command displays the profile currently associated with the Miles identity, in this example:

        (
          record {
            name = "Miles";
            description = "Great Dane";
            keywords = vec { "Boston"; "mantle"; "three-legged" };
          },
        )

5.  Call the `search` function using part of the description or a keyword to further test the whether the correct profile is returned.

    For example, to verify the `Miles` profile is returned, you might run the following command:

    ``` bash
    dfx canister call rust_profile search '("Great")'
    ```

    The command returns the `Miles` profile:

        (
          opt record {
            name = "Miles";
            description = "Great Dane";
            keywords = vec { "Boston"; "mantle"; "three-legged" };
          },
        )

6.  Call the `search` function to further test the whether the correct profile is returned.

    For example, to verify the `Dupree` profile is returned, you might run the following command:

    ``` bash
    dfx canister call rust_profile search '("black")'
    ```

    The command returns the `Dupree` profile:

        (
          opt record {
            name = "Dupree";
            description = "black dog";
            keywords = vec { "funny tail"; "white nose" };
          },
        )

## Extending the sample dapp

This sample dapp only stores one profile for each unique user identity. If you were to extend this dapp by adding a second method for linking social connections to each users profile, you would be well on your way to recreating the LinkedUp sample application using Rust.

## Stop the local execution environment

After you finish experimenting with your program, you can stop the local execution environment so that it doesn’t continue running in the background.

To stop the local execution environment:

1.  In the terminal that displays network operations, press Control-C to interrupt the local execution environment process.

2.  Stop the local execution environment by running the following command:

    ``` bash
    dfx stop
    ```
