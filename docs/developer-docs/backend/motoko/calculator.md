# 10: Using integers in calculator functions

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

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./dev-env.md).

## Create a new project

Open a terminal shell on your local computer, if you don’t already have one open.

To create a new project, run the following command:

```
dfx new calc
```

Change into your project directory by running the following command:

```
cd calc
```

## Modify the default configuration

For this guide, let’s modify the default `dfx.json` configuration file to use a more specific name for its main program.

Open the `dfx.json` configuration file in a text editor. Then, change the `main` key setting from the default `main.mo` program name to `calc_main.mo`.

For example:

```
"main": "src/calc_backend/calc_main.mo",
```

For this guide, changing the name of the source file from `main.mo` to `calc_main.mo` simply illustrates how the setting in the `dfx.json` configuration file determines the source file to be compiled.

In a more complex dapp, you might have multiple source files instead of a single `main` program file. More complex applications might also have specific dependencies between multiple source files that you need to manage using settings in the `dfx.json` configuration file. 

In a scenario like that, with multiple canisters and programs defined in your `dfx.json` file, having multiple files all named `main.mo` might make navigating your workspace more difficult. The name you choose for each program isn’t significant, but it is important that the name you set in the `dfx.json` file matches the name of your program in the file system.

Save your changes and close the file to continue.

## Modify the default program

For this guide, you need to replace the default program with a program that performs basic arithmetic operations.

To replace the default program, copy the template `main.mo` file to create a new file named `calc_main.mo` by running the following command:

```
cp src/calc_backend/main.mo src/calc_backend/calc_main.mo
```

Then, open the `src/calc_backend/calc_main.mo` file in a text editor and delete the existing content.

Copy and paste this code into the `calc_main.mo` file:

```
// This single-cell calculator defines one calculator instruction per
// public entry point (add, sub, mul, div).

// Create a simple Calc actor.
actor Calc {
  var cell : Int = 0;

  // Define functions to add, subtract, multiply, and divide
  public func add(n:Int) : async Int { cell += n; cell };
  public func sub(n:Int) : async Int { cell -= n; cell };
  public func mul(n:Int) : async Int { cell *= n; cell };
  public func div(n:Int) : async ?Int {
    if ( n == 0 ) {
      return null // null indicates div-by-zero error
    } else {
      cell /= n; ?cell
    }
  };

  // Clear the calculator and reset to zero
  public func clearall() : async Int {
    if (cell : Int != 0)
      cell -= cell;
    return cell
  };
 };
```

You might notice that this sample code uses integer (`Int`) data types, enabling you to use positive or negative numbers. If you wanted to restrict the functions in this calculator code to only use positive numbers, you could change the data type to only allow natural (`Nat`) data.

Save your changes and close the file to continue.

## Start the local canister execution environment

Before you can build the `calc` project, you need to connect to the canister execution environment running locally in your development environment, or you need to connect to a subnet that you can access.

Starting the network locally requires a `dfx.json` file, so you should be sure you are in your project’s root directory. For this guide, you should have two separate terminal shells, so that you can start and see network operations in one terminal and manage your project in another.

To start the local canister execution environment:

Open a new terminal window or tab on your local computer.

:::info
-   You should now have **two terminals** open.
-   You should have the **project directory** as your **current working directory**.
:::

Then, start the local canister execution environment on your machine by running the following command:

```
dfx start
```

After you start the local network, the terminal displays messages about network operations. Leave the terminal that displays network operations open and switch your focus to your original terminal where you created your new project.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment, you can register, build, and deploy your dapp locally.

Register, build, and deploy your dapp by running the following command in your project's directory:

```
dfx deploy
```

The `dfx deploy` command output displays information about the operations it performs.

## Testing canister functionality

You now have a program deployed as a **canister** on your local canister execution environment. You can test the program by using `dfx canister call` commands.

Use the `dfx canister call` command to call the `calc_backend` canister `add` function and pass it the input argument `10` by running the following command:

```
dfx canister call calc_backend add '(10)'
```

When you pass an argument enclosed by the single quotation marks and parentheses,the interface description language (IDL) parses the argument type, so you don’t need to specify the argument type manually.

Verify that the command returns the value expected for the `add` function. For example, the program displays output similar to the following:

```
(10 : int)
```

Call the `mul` function and pass it the input argument `3` by running the following command:

```
dfx canister call calc_backend mul '(3)'
```

Verify that the command returns the value expected for the `mul` function. For example, the program displays output similar to the following:

```
(30 : int)
```

Call the `sub` function and pass it the input argument `5` of type `number` by running the following command:

```
dfx canister call calc_backend sub '(5)'
```

Verify that the command returns the value expected for the `sub` function. For example, the program displays output similar to the following:

```
(25 : int)
```

Call the `div` function and pass it the input argument `5` by running the following command:

```
dfx canister call calc_backend div '(5)'
```

Verify that the command returns the value expected for the `div` function. For example, the program displays output similar to the following:

```
(opt (5 : int))
```

You might notice that the `div` function returns an optional result. The program makes the result optional to enable the `div` function to return `null` in the case of a division-by-zero error.

Because the cell variable in this program is an integer, you can also call its functions and specify negative input values. For example, you might run the following command:

```
dfx canister call calc_backend mul '(-4)'
```

which returns:

(-20 : int)

Call the `clearall` function and verify it resets the `cell` value to zero:

```
dfx canister call calc_backend clearall
```

For example, the program displays output similar to the following:

```
(0 : int)
```

## Next steps

In the next guide, let's look at [incrementing natural numbers](counter-tutorial.md)