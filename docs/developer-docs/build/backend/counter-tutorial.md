# Increment a natural number

In this tutorial, you are going to write a program that creates a single actor and provides a few basic functions to increment a counter and illustrate persistence of a value.

For this tutorial, the actor is named `Counter`. The program uses the `currentValue` variable to contain a natural number that represents the current value of the counter. This program supports the following function calls:

-   The `increment` function call updates the current value, incrementing it by 1 (no return value).

-   The `get` function call queries and returns the current value of the counter.

-   The `set` function call updates the current value to an arbitrary numeric value you specify as an argument.

This tutorial provides a simple example of how you can increment a counter by calling functions on a deployed canister. By calling the functions to increment and query the counter value multiple times, you can verify that the variable state—that is, the value of the variable between calls—persists.

## Before you begin

Before starting the tutorial, verify the following:

-   You have downloaded and installed the SDK package as described in [Download and install](../../quickstart/local-quickstart#download-and-install).

-   You have stopped any local canister execution environments running on the computer.

This tutorial takes approximately 20 minutes to complete.

## Create a new project

To create a new project directory for this tutorial:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Change to the folder you are using for your Internet Computer projects, if you are using one.

3.  Create a new project by running the following command:

        dfx new my_counter

    The command creates a new `my_counter` project for your project.

4.  Change to your project directory by running the following command:

        cd my_counter

## Modify the default configuration

You have already seen that creating a new project adds a default `dfx.json` configuration file to your project directory. In this tutorial, you will modify the default settings to use a different name for the main program in your project.

To modify the `dfx.json` configuration file:

1.  Open the `dfx.json` configuration file in a text editor and change the default `main` setting from `main.mo` to `increment_counter.mo`.

    For example:

        "main": "src/my_counter/increment_counter.mo",

    For this tutorial, changing the name of the source file from `main.mo` to `increment_counter.mo` simply illustrates how the setting in the `dfx.json` configuration file determines the source file to be compiled.

    In a more complex dapp, you might have multiple source files with dependencies that you need to manage using settings in the `dfx.json` configuration file. In a scenario like that—with multiple canisters and programs defined in your `dfx.json` file—having multiple files all named `main.mo` might be confusing.

    You can leave the rest of the default settings as they are.

2.  Save your change and close the `dfx.json` file to continue.

3.  Change the name of the main program file in the source code directory `src` to match the name specified in the `dfx.json` configuration file by running the following command

        mv src/my_counter/main.mo src/my_counter/increment_counter.mo

## Modify the default program

So far, you have only changed the name of the main program for your project. The next step is to modify the code in the `src/my_counter/increment_counter.mo` file to define an actor named `Counter` and implement the `increment`, `get`, and `set` functions.

To modify the default template source code:

1.  Check that you are still in your project directory, if needed.

2.  Open the `src/my_counter/increment_counter.mo` file in a text editor and delete the existing content.

3.  Copy and paste [this code](../_attachments/counter.mo) into the `increment_counter.mo` file.

    Let's take a closer look at this sample program:

    -   You can see that the `currentValue` variable declaration in this example includes the `stable` keyword to indicate the state—the value that can be set, incremented, and retrieved—persists.

        This keyword ensures that the value for the variable is unchanged when the program is upgraded.

    -   The declaration for the `currentValue` variable also specifies that its type is a natural number (`Nat`).

    -   The program includes two public update methods—the `increment` and `set` functions—and one a query method-the `get` function.

    For more information about stable and flexible variables, see [Stable variables and upgrade methods](../cdks/motoko-dfinity/upgrades) in the [*Motoko Programming Language Guide*](../cdks/motoko-dfinity/about-this-guide.md).

    For more information about the differences between a query and an update, see [Query and update methods](../../../concepts/canisters-code#query-update) in [Canisters include both program and state](../../../concepts/canisters-code#canister-state).

4.  Save your changes and close the file to continue.

## Start the local canister execution environment

Before you can build the `my_counter` project, you need to either connect to a local canister execution environment simulating the Internet Computer blockchain or to the Internet Computer blockchain mainnet.

Starting the local canister execution environment requires a `dfx.json` file, so you should be sure you are in your project’s root directory. For this tutorial, you should have two separate terminal shells, so that you can start and see network operations in one terminal and manage your project in another.

To start the local canister execution environment:

1.  Open a new terminal window or tab on your local computer.

2.  Navigate to the root directory for your project, if necessary.

    -   You should now have **two terminals** open.

    -   You should have the **project directory** as your **current working directory**.

3.  Start the local canister execution environment on your computer by running the following command:

        dfx start

    After you start the local canister execution environment, the terminal displays messages about network operations.

4.  Leave the terminal that displays network operations open and switch your focus to your original terminal where you created your new project.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment running in your development environment, you can register, build, and deploy your dapp locally.

To deploy the dapp locally:

1.  Check that you are still in the root directory for your project, if needed.

2.  Register, build, and deploy your dapp by running the following command:

        dfx deploy

    The `dfx deploy` command output displays information about the operations it performs.

## Invoke methods on the deployed canister

After successfully deploying the canister, you can simulate an end-user invoking the methods provided by the canister. For this tutorial, you invoke the `get` method to query the value of a counter, the `increment` method that increments the counter each time it is called, and the `set` method to pass an argument to update the counter to an arbitrary value you specify.

To test invoking methods on the deployed canister:

1.  Run the following command to invoke the `get` function, which reads the current value of the `currentValue` variable on the deployed canister:

        dfx canister call my_counter get

    The command returns the current value of the `currentValue` variable as zero:

        (0 : nat)

2.  Run the following command to invoke the `increment` function to increment the value of the `currentValue` variable on the deployed canister by one:

        dfx canister call my_counter increment

    This command increments the value of the variable—changing its state—but does not return the result.

3.  Rerun the following command to get the current value of the `currentValue` variable on the deployed canister:

        dfx canister call my_counter get

    The command returns the updated value of the `currentValue` variable as one:

        (1 : nat)

4.  Run additional commands to experiment with invoking other methods and using different values.

    For example, try commands similar to the following to set and return the counter value:

        dfx canister call my_counter set '(987)'
        dfx canister call my_counter get

    This returns the updated value of the `currentValue` to be 987. Running the additional commands

        dfx canister call my_counter increment
        dfx canister call my_counter get

    returns the incremented `currentValue` of 988.

5.  Test your code using the candid ui.

    To test your code, follow the instructions [here](candid-ui.md).

## Stop the local canister execution environment

After you finish experimenting with your dapp, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local canister execution environment:

1.  In the terminal that displays network operations, press Control-C to interrupt the local canister execution environment.

2.  Stop the local canister execution environment by running the following command:

        dfx stop
