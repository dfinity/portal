# Pass text arguments

This tutorial provides a simple variation on the default program that lets you pass a single text argument to a single actor, compile the code to create a canister, then retrieve the argument. Throughout this document, the terms canister and canister are considered synonymous.

This tutorial illustrates how to pass arguments on the command-line in a terminal using the Candid interface description language (IDL) and how to modify the program to allow it to accept more than one value for the text argument.

## Before you begin

Before you start this tutorial, verify the following:

-   You have downloaded and installed the SDK package as described in [Download and install](../../quickstart/local-quickstart#download-and-install).

-   You have stopped any canister execution environments running on the local computer.

This tutorial takes approximately 20 minutes to complete.

## Create a new project

To create a new project for this tutorial:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Change to the folder you are using for your Internet Computer projects, if you are using one.

3.  Create a new project by running the following command:

        dfx new location_hello

4.  Change to your project directory by running the following command:

        cd location_hello

## Modify the default configuration

In the [Explore the default project](explore-templates) tutorial, you saw that creating a new project adds a default `dfx.json` configuration file to your project directory. You should always review the default settings in the file to verify the information accurately reflects the project settings you want to use. For this tutorial, you’ll modify the default configuration to remove settings that aren’t used.

To modify settings in the `dfx.json` configuration file:

1.  Open the `dfx.json` configuration file in a text editor.

2.  Check the default settings for the `location_hello` project.

3.  Remove all of the unnecessary configuration settings.

    Because this tutorial does not involve creating any frontend assets, you can remove all of the `location_hello_assets` configuration settings from the file.

4.  Save your changes and close the file to continue.

## Modify the default program

In the [Explore the default project](explore-templates) tutorial, you saw that creating a new project creates a default `src` directory with a template `main.mo` file.

To modify the default template source code:

1.  Open the `src/location_hello/main.mo` source code file in a text editor.

2.  Modify the default source code to replace the `greet` function with a `location` function and the `name` argument with a `city` argument.

    For example like [this](../_attachments/location_hello.mo).

3.  Save your changes and close the file to continue.

## Start the local canister execution environment

Before you can build your project, you need to connect to a local canister execution environment or the Internet Computer blockchain mainnet.

Starting a canister execution environment locally requires a `dfx.json` file, so you should be sure you are in your project’s root directory. For this tutorial, you should have two separate terminal shells, so that you can start and see network operations in one terminal and manage your project in another.

To start the local canister execution environment:

1.  Open a new terminal window or tab on your local computer.

2.  Navigate to the root directory for your project, if necessary.

    -   You should now have **two terminals** open.

    -   You should have the **project directory** as your **current working directory**.

3.  Start the canister execution environment on your local computer by running the following command:

        dfx start

    If you are prompted to allow or deny incoming network connections, click **Allow**.

4.  Leave the terminal that displays network operations open and switch your focus to your original terminal where you created your project.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment, you can register, build, and deploy your dapp locally.

To deploy the dapp locally:

1.  Check that you are still in the root directory for your project, if needed.

2.  Register, build, and deploy your application by running the following command:

        dfx deploy

    The `dfx deploy` command output displays information about the operations it performs.

## Pass a text argument

You now have a program deployed as a **canister** in your local canister execution environment and can test your program by using `dfx canister call` commands.

To test the program you have deployed locally:

1.  Call the `location` method in the program and pass your `city` argument of type `text` by running the following command:

        dfx canister call location_hello location "San Francisco"

    Because the argument in this case includes a space between `San` and `Francisco`, you need to enclose the argument in quotes. The command displays output similar to the following:

        ("Hello, San Francisco!")

    If the argument did not contain a space that required enclosing the text inside of quotation marks, you could allow the Candid interface description language to infer the data type like this:

        dfx canister call location_hello location Paris

    Candid infers the data type as `Text` and returns the output from your program as text like this:

        ("Hello, Paris!")

2.  Call the `location` method in the program and pass your `city` argument explicitly using the Candid interface description language syntax for Text arguments:

        dfx canister call location_hello location '("San Francisco and Paris")'

    The command displays output similar to the following:

        ("Hello, San Francisco and Paris!")

    Because your program only accepts a single text argument, specifying multiple strings returns only the first argument.

    For example, if you try this command:

        dfx canister call location_hello location '("San Francisco","Paris","Rome")'

    Only the first argument—`("Hello, San Francisco!")`—is returned.

## Revise the source code in your program

To extend what you have learned in this tutorial, you might want to try modifying the source code to return different results. For example, you might want to modify the `location` function to return multiple city names.

To experiment with modifying the source code for this tutorial:

1.  Open the `dfx.json` configuration file in a text editor and change the default `location_hello` settings to `favorite_cities`.

    For this step, you should modify both the canister name and the path to the main program for the canister to use `favorite_cities`.

2.  Save your changes and close the `dfx.json` file to continue.

3.  Copy the `location_hello` source file directory to match the name specified in the `dfx.json` configuration file by running the following command:

        cp -r src/location_hello src/favorite_cities

4.  Open the `src/favorite_cities/main.mo` file in a text editor.

5.  Copy and paste the following code sample to replace the `location` function with two new functions.

    For example like [this](../_attachments/favorite_cities.mo).

    You might notice that `Text` in this code example is enclosed by square (`[ ]`) brackets. By itself, `Text` represents a collection of UTF-8 characters. The square brackets around a type indicate that it is an **array** of that type. In this context, therefore, `[Text]` indicates an array of a collection of UTF-8 characters, enabling the program to accept and return multiple text strings.

    The code sample also uses the basic format of an `apply` operation for the array, which can be abstracted as:

        public func apply<A, B>(fs : [A -> B], xs : [A]) : [B] {
            var ys : [B] = [];
            for (f in fs.vals()) {
                ys := append<B>(ys, map<A, B>(f, xs));
            };
            ys;
        };

    For information about the functions that perform operations on arrays, see the description of the Array module in the Motoko base library or the *Motoko Programming Language Reference*. For another example focused on the use of arrays, see [Quicksort](https://github.com/dfinity/examples/tree/master/motoko/quicksort) in the [examples](https://github.com/dfinity/examples/) repository.

6.  Register, build, and deploy the dapp by running the following command:

        dfx deploy

7.  Call the `location` method in the program and pass your `city` argument using the Candid interface description syntax by running the following command:

        dfx canister call favorite_cities location '(vec {"San Francisco";"Paris";"Rome"})'

    The command uses the Candid interface description syntax `(vec { val1; val2; val3; })` to return a vector of values. For more information about the Candid interface description language, see the [Candid](../languages/candid/candid-intro.md) language guide.

    This command displays output similar to the following:

        ("Hello, from ["San Francisco", "Paris", "Rome"]!")

8.  Call the `location_pretty` method in the program and pass your `city` argument using the interface description syntax by running the following command:

        dfx canister call favorite_cities location_pretty '(vec {"San Francisco";"Paris";"Rome"})'

    The command displays output similar to the following:

        ("Hello from San Francisco, Paris, Rome, bon voyage!")

9.  Test your code using the candid ui.

    To test your code, follow the instructions [here](candid-ui.md).
    In this example, each function accepts an array of text strings. Therefore, you first select the length of the array, then set values for each item before clicking **Call**.

    ![Specifying an array](../_attachments/candid-favorite-cities-result.png)

## Stop the local canister execution environment

After you finish experimenting with your program, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local canister execution environment:

1.  In the terminal that displays network operations, press Control-C to interrupt the local process.

2.  Stop the canister execution environment by running the following command:

        dfx stop
