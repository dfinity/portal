# 3: Importing library modules

## Overview

In this guide, you are going to write a simple dapp that enables you to store and look up telephone numbers. This guide illustrates how to import and use a few basic Motoko library functions.

For this guide, the Motoko base library functions are defined in the `List` and `AssocList` modules and enable you to work with lists as linked key-value pairs. In this example, the **key** is a `name` and the **value** is the `phone` text string associated with that name.

This dapp supports the following function calls:

-   The `insert` function accepts the `name` and `phone` key-value pair as input stored in the `book` variable.

-   The `lookup` function is a query that uses the specified `name` key as input to find the associated phone number.

## Prerequisites

Before following this guide, assure that you have the necessary dependencies in your environment:

-   [x] Download and install the IC SDK package as described in the [download and install](/developer-docs/setup/install/index.mdx) page.

-   [x] Stop any local canister execution environments running on the computer.

## Create a new project

To create a new project for this guide:

- #### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

- #### Step 2:  Change to the folder you are using for your Internet Computer projects, if you are using one.

- #### Step 3:  Create a new project by running the following command:

        dfx new phonebook

- #### Step 4:  Change to your project directory by running the following command:

        cd phonebook

## Modify the default dapp

For this guide, let’s create a new `main.mo` file for the simple phone number lookup dapp.

To modify the default template:

- #### Step 1:  Open the `src/phonebook_backend/main.mo` file in a text editor and delete the existing content.

- #### Step 2:  Copy and paste this code into the `main.mo` file:

```
// Import standard library functions for lists

import L "mo:base/List";
import A "mo:base/AssocList";

// The PhoneBook actor.
actor {

    // Type aliases make the rest of the code easier to read.
    public type Name = Text;
    public type Phone = Text;

    // The actor maps names to phone numbers.
    flexible var book: A.AssocList<Name, Phone> = L.nil<(Name, Phone)>();

    // An auxiliary function checks whether two names are equal.
    func nameEq(l: Name, r: Name): Bool {
        return l == r;
    };

    // A shared invokable function that inserts a new entry
    // into the phone book or replaces the previous one.
    public func insert(name: Name, phone: Phone): async () {
        let (newBook, _) = A.replace<Name, Phone>(book, name, nameEq, ?phone);
        book := newBook;
    };

    // A shared read-only query function that returns the (optional)
    // phone number corresponding to the person with the given name.
    public query func lookup(name: Name): async ?Phone {
        return A.find<Name, Phone>(book, name, nameEq);
    };
};
```

    In looking at this sample dapp, you might notice the following key elements:

    -   The code defines `Name` and `Phone` as custom text types. Creating user-defined types improves the readability of the code.

    -   The `insert` function is an update call and the `lookup` function is a query call.

    -   The `Phone` type is identified as an optional value by using the `?Phone` syntax.

## Start the local canister execution environment

For development purposes `dfx` provides a local canister execution environment. This requires a `dfx.json` file, so you should be sure you are in your project’s root directory. For this guide, you should have two separate terminal shells, so that you can start and see the output of the local canister execution environment in one terminal and manage your project in another.

To start the local canister execution environment:

- #### Step 1:  Open a new terminal window or tab on your local computer.

- #### Step 2:  Navigate to the root directory for your project, if necessary.

    -   You should now have **two terminals** open.

    -   You should have the **project directory** as your **current working directory**.

- #### Step 3:  Start the local canister execution environment on your local computer by running the following command:

        dfx start --clean

    For this guide, we’re using the `--clean` option to start the local canister execution environment in a clean state.

    This option removes any orphan background processes or canister identifiers that might disrupt normal operations. For example, if you forgot to issue a `dfx stop` when moving between projects, you might have a process running in the background or in another terminal. The `--clean` option ensures that you can start the local canister execution environment and continue to the next step without manually finding and terminating any running processes.

- #### Step 4:  Leave the terminal that displays the output of the local canister execution environment open and switch your focus to your original terminal where you created your new project.

## Register, build, and deploy the dapp

Once the local canister execution environment is up and running in your development environment, you can register, build, and deploy your dapp onto it.

To deploy the dapp locally:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Register, build, and deploy your dapp locally by running the following command:

        dfx deploy

    The `dfx.json` file provides default settings for creating a dapp backend canister and a frontend canister.

    In previous guides, we deleted the entries for the frontend canister because we were not adding a frontend for the sample dapp. That change kept our project workspace tidy by eliminating files that would go unused. There is no requirement to do this, however, and there is no harm in leaving the frontend canister description in the `dfx.json` file. For example, you might want to use it as a placeholder if you intend to add frontend assets later.

    For this guide, you can deploy just the phonebook_backend canister using the `dfx deploy phonebook_backend` command because the project doesn’t include any frontend assets and you will interact with it via the terminal.

    Although this guide illustrates how to skip compiling a frontend canister, you can add a simple user interface to this dapp later by exploring the [phonebook](https://github.com/dfinity/examples/tree/master/motoko/phone-book) project in the [examples](https://github.com/dfinity/examples) repository.

## Add names and numbers using the insert function

You now have a dapp deployed as a **canister** on your local canister execution environment and can test your dapp by using `dfx canister call` commands.

To test the dapp you have deployed:

- #### Step 1:  Use the `dfx canister call` command to call the canister `phonebook` using the `insert` function and pass it a name and phone number by running the following command:

        dfx canister call phonebook_backend insert '("Chris Lynn", "01 415 792 1333")'

- #### Step 2:  Add a second name and number pair by running the following command:

        dfx canister call phonebook_backend insert '("Maya Garcia", "01 408 395 7276")'

- #### Step 3:  Verify that the command returns the number associated with "Chris Lynn" using the `lookup` function by running the following command:

        dfx canister call phonebook_backend lookup '("Chris Lynn")'

    The command returns output similar to the following:

        (opt "01 415 792 1333")

- #### Step 4:  Try to call the `lookup` function with the number associated with "Maya Garcia" by running the following command:

        dfx canister call phonebook_backend lookup '("01 408 395 7276")'

    Note that, in this case, the command returns `(null)` because the phone number is not a key associated with the "Maya Garcia" name entry.

- #### Step 5:  Try to call the `lookup` function again to return the phone numbers for both "Maya Garcia" and "Chris Lynn" by running the following command:

        dfx canister call phonebook_backend lookup '("Maya Garcia","Chris Lynn")'

    Because the dapp is written to return one value for one key, the command only returns information associated with the first key, in this example the phone number for `Maya Garcia`.

- #### Step 6:  Test your code using the Candid UI.

    To test your code, follow the instructions [here](candid-ui.md).
![Phonebook functions](_attachments/candid-phonebook.png)

## Revise the source code in your dapp

To extend what you have learned in this guide, you might want to try modifying the source code to return different results.

For example, you might want to change the source code so that instead of a dapp that inserts and looks up a current key-value (name-phone) pair to create a dapp that stores contact information similar to a database "record" in which a primary key is associated with multiple fields. In this example, your dapp might enable users or another dapp to add information, such as a home phone number, a cell phone number, an email address, and a street address—and selectively return all or specific field values.

## Stop the local canister execution environment

After you finish experimenting with your dapp, you can stop the local canister execution environment so that it does not continue running in the background.

To stop the local canister execution environment:

- #### Step 1:  In the terminal that displays network operations, press Control-C to interrupt the local network process.

- #### Step 2:  Stop the local canister execution environment by running the following command:

        dfx stop
