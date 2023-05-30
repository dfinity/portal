# 7: Accepting cycles from a wallet

## Overview

When you are doing local development, you can use the default wallet in your project to send cycles and check your cycle balance. But what about the canisters that need to receive and use those cycles, e.g. to execute their functions and provide services to users?

This guide provides a simple example to illustrate how you might add the functions to receive cycles and check your cycle balance to the default template program.

This example consists of the following:

-   The `wallet_balance` function enables you to check the current cycle balance for the canister.

-   The `wallet_receive` function enables the program to accept cycles that are sent to the canister.

-   The `greet` function accepts a text argument and displays a greeting in a terminal.

-   The `owner` function returns the principal used by the message caller.

## Prerequisites

Before starting the guide, verify the following:

-   [x] You have downloaded and installed the SDK package as described in the [download and install](/developer-docs/setup/install/index.mdx) page.

-   [x] You have installed the Visual Studio Code plugin for Motoko as described in [install the language editor plug-in](/developer-docs/setup/deploy-locally.md#install-vscode) if you are using Visual Studio Code as your IDE.

-   [x] You have stopped any local canister execution environment running on the local computer.

## Create a new project

To create a new project directory for testing access control and switching user identities:

- #### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

- #### Step 2:  Change to the folder you are using for your Internet Computer projects, if you are using one.

- #### Step 3:  Create a new project by running the following command:

        dfx new cycles_hello

- #### Step 4:  Change to your project directory by running the following command:

        cd cycles_hello

## Modify the default program

For this guide, you are going to modify the template source code to include new functions for accepting cycles and checking the cycle balance.

To modify the default program:

- #### Step 1:  Open the `src/cycles_hello/main.mo` file in a text editor and delete the existing content.

- #### Step 2:  Copy and paste [this code](./_attachments/cycles-main.mo) into the file.

    Let’s take a look at a few key elements of this program:

    -   The program imports a Motoko base library—`ExperimentalCycles`—that provides basic functions for working with cycles.

    -   The program uses an `actor class` instead of a single actor so that it can have multiple actor instances to accept different cycle amounts up to a `capacity` for all instances.

    -   The `capacity` is passed as an argument to the actor class.

    -   The `msg.caller` identifies the principal associated with the call.

- #### Step 3:  Save your changes and close the `main.mo` file to continue.

## Start the local canister execution environment

Before you can build the `access_hello` project, you need to connect to the canister execution environment running locally in your development environment, or you need to connect to a subnet that you can access.

To start the local canister execution environment:

- #### Step 1: Open a new terminal window or tab on your local computer.

- #### Step 2:  Navigate to the root directory for your project, if necessary.

- #### Step 3:  Start the local canister execution environment on your machine by running the following command:

        dfx start --clean --background

    After the local canister execution environment completes its startup operations, you can continue to the next step.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment, you can register, build, and deploy your dapp locally.

To deploy the dapp locally:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Register, build, and deploy your dapp by running the following command:

        dfx deploy --argument '(360000000000)'

    This example sets the `capacity` for the canister to 360,000,000,000 cycles. The `dfx deploy` command output then displays information about the operations it performs, including the identity associated with the wallet canister created for this local project and the wallet canister identifier.

    For example:

        Deploying all canisters.
        Creating canisters...
        Creating canister "cycles_hello"...
        Creating the canister using the wallet canister...
        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "default" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        "cycles_hello" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"
        Creating canister "cycles_hello_assets"...
        Creating the canister using the wallet canister...
        "cycles_hello_assets" canister created with canister id: "ryjl3-tyaaa-aaaaa-aaaba-cai"
        Building canisters...
        Building frontend...
        Installing canisters...
        Installing code for canister cycles_hello, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
        Installing code for canister cycles_hello_assets, with canister_id ryjl3-tyaaa-aaaaa-aaaba-cai
        Authorizing our identity (default) to the asset canister...
        Uploading assets to asset canister...
        Deployed canisters.

## Test the dapp

After you have deployed the dapp on your local canister execution environment, you can experiment with the wallet functions and test your program by using `dfx canister call` commands.

To test the dapp:

- #### Step 1:  Check the principal for the `default` user identity by running the following command:

        dfx canister call cycles_hello owner

    The command displays output similar to the following for the current identity:

        (principal "g3jww-sbmtm-gxsag-4mecu-72yc4-kef5v-euixq-og2kd-sav2v-p2sb3-pae")

    If you haven’t made changes to the identity you were using to run the `dfx deploy` command, you should get the same principal by running the `dfx identity get-principal` command. This is important because you must be the owner of the wallet canister to perform certain tasks such as sending cycles or granting other **custodian** identities permission to send cycles.

- #### Step 2:  Check the initial wallet cycle balance by running the following command:

        dfx canister call cycles_hello wallet_balance

    You haven’t sent any cycles to the canister, so the command displays the following balance:

        (0)

- #### Step 3:  Send some cycles from your default wallet canister to the `cycles_hello` canister using the canister principal by running a command similar to the following:

        dfx canister call rwlgt-iiaaa-aaaaa-aaaaa-cai wallet_send '(record { canister = principal "rrkah-fqaaa-aaaaa-aaaaq-cai"; amount = (256000000000:nat64); } )'

- #### Step 4:  Call the `wallet_balance` function to see that the `cycles_hello` canister has the number of cycles you transferred, if you specified an amount under the allowed capacity, or the `capacity` you specified when you ran the `dfx deploy` command.

        dfx canister call cycles_hello wallet_balance

    The command displays output similar to the following:

        (256_000_000_000)

- #### Step 5:  Call the `wallet_balance` function to see the number of cycles in your default wallet by running a command similar to the following:

        dfx canister call rwlgt-iiaaa-aaaaa-aaaaa-cai wallet_balance

    The command returns the balance for the wallet canister identifier you specified as a record using Candid format. For example, the command might display a record with an `amount` field (represented by the hash `3_573_748_184`) and a balance of 97,738,624,621,042 cycles like this:

        (record { 3_573_748_184 = 97_738_624_621_042 })

    For this simple guide, cycles are only consumed from the balance in the default wallet canister, not from the `cycles_hello` canister.

- #### Step 6:  Call the `greet` function by running a command similar to the following:

        dfx canister call cycles_hello greet '("from DFINITY")'

- #### Step 7:  Rerun the call to the `wallet_balance` function to see the number of cycles deducted from your default wallet:

        dfx canister call rwlgt-iiaaa-aaaaa-aaaaa-cai wallet_balance

    For example, you might a result similar to this:

        (record { 3_573_748_184 = 97_638_622_179_500 })

## Stop the local canister execution environment

After you finish experimenting with the program, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local canister execution environment:

- #### Step 1:  In the terminal that displays the operations, press Control-C to interrupt the process.

- #### Step 2:  Stop the local canister execution environment by running the following command:

        dfx stop

## Resources

If you are looking for more information about working with cycles, check out the following related resources:

-   [dfx identity (Command reference)](/references/cli-reference/dfx-identity.md).
-   [ExperimentalCycles (Base module)](/motoko/main/base/ExperimentalCycles.md).
-   [Managing cycles (Motoko language reference)](/motoko/main/cycles.md).
-   [Tokens and cycles (Overview)](/concepts/tokens-cycles.md).
