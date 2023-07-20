# 11: Incrementing a natural number

## Overview

In this guide, you are going to write a program that creates a single actor and provides a few basic functions to increment a counter and illustrate persistence of a value.

For this example, the actor is named `Counter`. The program uses the `currentValue` variable to contain a natural number that represents the current value of the counter. This program supports the following function calls:

-   The `increment` function call updates the current value, incrementing it by 1 (no return value).

-   The `get` function call queries and returns the current value of the counter.

-   The `set` function call updates the current value to an arbitrary numeric value you specify as an argument.

This guide provides a simple example of how you can increment a counter by calling functions on a deployed canister. By calling the functions to increment and query the counter value multiple times, you can verify that the variable state; that is, the value of the variable between calls—persists.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./dev-env.md).

## Create a new project

Open a terminal shell on your local computer, if you don’t already have one open.

Create a new project by running the following command:

```
dfx new my_counter
```

The command creates a new `my_counter` project for your project.

Then change into your project directory by running the following command:

```
cd my_counter
```

## Modify the default configuration

You have already seen that creating a new project adds a default `dfx.json` configuration file to your project directory. In this guide, you will modify the default settings to use a different name for the main program in your project.

To modify the `dfx.json` configuration file, open the `dfx.json` configuration file in a text editor and change the default `main` setting from `main.mo` to `increment_counter.mo`.

For example:

```
"main": "src/my_counter_backend/increment_counter.mo",
```

For this guide, changing the name of the source file from `main.mo` to `increment_counter.mo` simply illustrates how the setting in the `dfx.json` configuration file determines the source file to be compiled.

In a more complex dapp, you might have multiple source files with dependencies that you need to manage using settings in the `dfx.json` configuration file. In a scenario like that—with multiple canisters and programs defined in your `dfx.json` file—having multiple files all named `main.mo` might be confusing.

You can leave the rest of the default settings as they are.

Save your change and close the `dfx.json` file to continue.

Change the name of the main program file in the source code directory `src` to match the name specified in the `dfx.json` configuration file by running the following command:

```
mv src/my_counter_backend/main.mo src/my_counter_backend/increment_counter.mo
```

## Modify the default program

So far, you have only changed the name of the main program for your project. The next step is to modify the code in the `src/my_counter_backend/increment_counter.mo` file to define an actor named `Counter` and implement the `increment`, `get`, and `set` functions.

To modify the default template source code, open the `src/my_counter_backend/increment_counter.mo` file in a text editor and delete the existing content.

Copy and paste this code into the `increment_counter.mo` file:

```
// Create a simple Counter actor.
actor Counter {
stable var currentValue : Nat = 0;

// Increment the counter with the increment function.
public func increment() : async () {
currentValue += 1;
};

// Read the counter value with a get function.
public query func get() : async Nat {
currentValue
};

// Write an arbitrary value with a set function.
public func set(n: Nat) : async () {
currentValue := n;
};
}
```

Let's take a closer look at this sample program:

-   You can see that the `currentValue` variable declaration in this example includes the `stable` keyword to indicate the state—the value that can be set, incremented, and retrieved—persists.

This keyword ensures that the value for the variable is unchanged when the program is upgraded.

-   The declaration for the `currentValue` variable also specifies that its type is a natural number (`Nat`).

-   The program includes two public update methods—the `increment` and `set` functions—and one a query method-the `get` function.

For more information about stable and flexible variables, see [stable variables and upgrade methods](/motoko/main/upgrades.md) in the [**Motoko programming language guide**](/motoko/main/about-this-guide.md).

For more information about the differences between a query and an update, see [query and update methods](/concepts/canisters-code.md#query-update) in [canisters include both program and state](/concepts/canisters-code.md#canister-state).

Save your changes and close the file to continue.

## Start the local canister execution environment

Before you can build the `my_counter` project, you need to either connect to a local canister execution environment simulating the Internet Computer blockchain or to the Internet Computer blockchain mainnet.

Starting the local canister execution environment requires a `dfx.json` file, so you should be sure you are in your project’s root directory. For this guide, you should have two separate terminal shells, so that you can start and see network operations in one terminal and manage your project in another.

To start the local canister execution environment, open a new terminal window or tab on your local computer.

:::info
-   You should now have **two terminals** open.
-   You should have the **project directory** as your **current working directory**.
:::

Start the local canister execution environment on your computer by running the following command:

```
dfx start
```

After you start the local canister execution environment, the terminal displays messages about network operations.

Leave the terminal that displays network operations open and switch your focus to your original terminal where you created your new project.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment running in your development environment, you can register, build, and deploy your dapp locally.

Register, build, and deploy your dapp by running the following command in your project's directory:

```
dfx deploy
```

The `dfx deploy` command output displays information about the operations it performs.

## Invoke methods on the deployed canister

After successfully deploying the canister, you can simulate an end-user invoking the methods provided by the canister. For this guide, you invoke the `get` method to query the value of a counter, the `increment` method that increments the counter each time it is called, and the `set` method to pass an argument to update the counter to an arbitrary value you specify.

Run the following command to invoke the `get` function, which reads the current value of the `currentValue` variable on the deployed canister:

```
dfx canister call my_counter_backend get
```

The command returns the current value of the `currentValue` variable as zero:

```
(0 : nat)
```

Run the following command to invoke the `increment` function to increment the value of the `currentValue` variable on the deployed canister by one:

```
dfx canister call my_counter_backend increment
```

This command increments the value of the variable, changing its state, but does not return the result.

Rerun the following command to get the current value of the `currentValue` variable on the deployed canister:

```
dfx canister call my_counter_backend get
```

The command returns the updated value of the `currentValue` variable as one:

```
(1 : nat)
```

Run additional commands to experiment with invoking other methods and using different values. For example, try commands similar to the following to set and return the counter value:

```
dfx canister call my_counter_backend set '(987)'
dfx canister call my_counter_backend get
```

This returns the updated value of the `currentValue` to be 987. Running the additional commands

```
dfx canister call my_counter_backend increment
dfx canister call my_counter_backend get
```

returns the incremented `currentValue` of 988.

## Test your code using the Candid UI.

To test your code, follow the instructions [here](candid-ui.md).

## Next steps

In the next guide, we'll cover [passing text arguments to a canister](hello-location.md).