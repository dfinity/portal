# 4: Using integers in calculator functions

## Overview 
In this guide, you are going to write a simple calculator program that creates a single actor with several public entry-point functions to perform basic arithmetic operations.

For this guide, the actor is named `Calc`. The program uses the `cell` variable to contain an integer number that represents the current result of a calculator operation.

This program supports the following function calls:

-   The `add` function call accepts input and performs addition.

-   The `sub` function call accepts input and performs subtraction.

-   The `mul` function call accepts input and performs multiplication.

-   The `div` function call accepts input and performs division.

-   The `clearall` function clears the `cell` value stored as the result of previous operations, resetting the `cell` value to zero.

The `div` function also includes code to prevent the program from attempting to divide by zero.

## Prerequisites

Before starting the guide, verify the following:

-   [x] You have downloaded and installed the IC SDK package as described in the [download and install](/developer-docs/setup/install/index.mdx) page.

-   [x] You have stopped any canister execution environment running on the local computer.

## Create a new project

To create a new project for this guide:

- #### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

- #### Step 2:  Change to the folder you are using for your Internet Computer projects, if you are using one.

- #### Step 3:  Create a new project by running the following command:

        dfx new calc

- #### Step 4:  Change to your project directory by running the following command:

        cd calc

## Modify the default configuration

For this guide, let’s modify the default `dfx.json` configuration file to use a more specific name for its main program.

To modify the default `dfx.json` configuration file:

- #### Step 1:  Open the `dfx.json` configuration file in a text editor.

- #### Step 2:  Change the `main` key setting from the default `main.mo` program name to `calc_main.mo`.

    For example:

        "main": "src/calc/calc_main.mo",

    For this guide, changing the name of the source file from `main.mo` to `calc_main.mo` simply illustrates how the setting in the `dfx.json` configuration file determines the source file to be compiled.

    In a more complex dapp, you might have multiple source files instead of a single `main` program file. More complex applications might also have specific dependencies between multiple source files that you need to manage using settings in the `dfx.json` configuration file. 
    
    In a scenario like that—with multiple canisters and programs defined in your `dfx.json` file—having multiple files all named `main.mo` might make navigating your workspace more difficult. The name you choose for each program isn’t significant, but it is important that the name you set in the `dfx.json` file matches the name of your program in the file system.

- #### Step 3:  Save your changes and close the file to continue.

## Modify the default program

For this guide, you need to replace the default program with a program that performs basic arithmetic operations.

To replace the default program:

- #### Step 1:  Check that you are still in your project directory, if needed.

- #### Step 2:  Copy the template `main.mo` file to create a new file named `calc_main.mo` by running the following command:

        cp src/calc/main.mo src/calc/calc_main.mo

- #### Step 3:  Open the `src/calc/calc_main.mo` file in a text editor and delete the existing content.

- #### Step 4:  Copy and paste [this code](./_attachments/calc_main.mo) into the `calc_main.mo` file.

    You might notice that this sample code uses integer (`Int`) data types, enabling you to use positive or negative numbers. If you wanted to restrict the functions in this calculator code to only use positive numbers, you could change the data type to only allow natural (`Nat`) data.

- #### Step 5:  Save your changes and close the file to continue.

## Start the local canister execution environment

Before you can build the `calc` project, you need to connect to the canister execution environment running locally in your development environment, or you need to connect toa subnet that you can access.

Starting the network locally requires a `dfx.json` file, so you should be sure you are in your project’s root directory. For this guide, you should have two separate terminal shells, so that you can start and see network operations in one terminal and manage your project in another.

To start the local canister execution environment:

- #### Step 1:  Open a new terminal window or tab on your local computer.

- #### Step 2:  Navigate to the root directory for your project, if necessary.

    -   You should now have **two terminals** open.

    -   You should have the **project directory** as your **current working directory**.

- #### Step 3:  Start the local canister execution environment on your machine by running the following command:

        dfx start

    After you start the local network, the terminal displays messages about network operations.

- #### Step 4:  Leave the terminal that displays network operations open and switch your focus to your original terminal where you created your new project.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment, you can register, build, and deploy your dapp locally.

To deploy the dapp locally:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Register, build, and deploy your dapp by running the following command:

        dfx deploy

    The `dfx deploy` command output displays information about the operations it performs.

## Verify calculator functions on the canister

You now have a program deployed as a **canister** on your local canister execution environment. You can test the program by using `dfx canister call` commands.

To test the program you have deployed:

- #### Step 1:  Use the `dfx canister call` command to call the `calc` canister `add` function and pass it the input argument `10` by running the following command:

        dfx canister call calc add '(10)'

    When you pass an argument enclosed by the single quotation marks and parentheses,the interface description language (IDL) parses the argument type, so you don’t need to specify the argument type manually.

    Verify that the command returns the value expected for the `add` function. For example, the program displays output similar to the following:

        (10)

- #### Step 2:  Call the `mul` function and pass it the input argument `3` by running the following command:

        dfx canister call calc mul '(3)'

    Verify that the command returns the value expected for the `mul` function. For example, the program displays output similar to the following:

        (30)

- #### Step 3:  Call the `sub` function and pass it the input argument `5` of type `number` by running the following command:

        dfx canister call calc sub '(5)'

    Verify that the command returns the value expected for the `sub` function. For example, the program displays output similar to the following:

        (25)

- #### Step 4:  Call the `div` function and pass it the input argument `5` by running the following command:

        dfx canister call calc div '(5)'

    Verify that the command returns the value expected for the `div` function. For example, the program displays output similar to the following:

        (opt 5)

    You might notice that the `div` function returns an optional result. The program makes the result optional to enable the `div` function to return `null` in the case of a division-by-zero error.

    Because the cell variable in this program is an integer, you can also call its functions and specify negative input values. For example, you might run the following command:

        dfx canister call calc mul '(-4)'

    which returns:

        (-20)

- #### Step 5:  Call the `clearall` function and verify it resets the `cell` value to zero:

        dfx canister call calc clearall

    For example, the program displays output similar to the following:

        (0)


## Stop the local canister execution environment

After you finish experimenting with the dapp, you can stop the local canister execution environment so that it does not continue running in the background.

To stop the local canister execution environment:

- #### Step 1:  In the terminal that displays the operations, press Control-C to interrupt the process.

- #### Step 2:  Stop the local canister execution environment by running the following command:

        dfx stop
