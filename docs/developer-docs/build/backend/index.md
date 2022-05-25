# Tutorials

The [Quick start](../../quickstart/hello10mins.md) provided a simplified introduction to the basic work flow for creating and deploying a new project without exploring the contents of the project directory or sample code.

Next, we’ll explore writing a few simple programs to give you hands-on experience creating programs that run on the IC.

Most of these tutorials illustrate how to write dapps using the Motoko programming language. For additional examples of dapps written in other languages, see the {company-id} [examples](https://github.com/dfinity/examples) repository.

The following tutorials introduce the basics for writing dapps that run on the IC:

-   [Explore the default project](./explore-templates.md) takes a closer look at the work flow for creating projects by exploring the default files and folders that are added to your workspace when you create a new project.

-   [Query using an actor](./define-an-actor.md) highlights how to replace the typical `print` function usually defined in a "Hello, World!" canister by defining an actor (object) with a `hello` function.

-   [Pass text arguments](./hello-location.md) introduces different ways you can pass arguments to a function using the command-line in a terminal shell.

-   [Increment a natural number](./counter-tutorial.md) guides you through the process of writing a dapp that creates an actor with functions to increment and return the value of a counter.

-   [Use integers in calculator functions](./calculator.md) shows you how to write a simple calculator dapp for more practice working with Motoko and to learn more about how you can customize your project environment.

-   [Import library modules](./phonebook.md) illustrates how to import and use a few basic Motoko base library functions for working with key-value pairs in a list.

-   [Use multiple actors](./multiple-actors.md) describes how to include multiple unrelated actors in a single project to illustrate how you can compile multiple canisters for the same project.

-   [Customize the frontend](../frontend/custom-frontend.md) illustrates using a simple React framework to create a new frontend for the default sample canister and guides you through some basic modifications to customize the interface displayed. If you already know how to use CSS, HTML, JavaScript, and React or other frameworks to build your user interface, you can skip this tutorial.

-   [Add a stylesheet](../frontend/my-contacts.md) illustrates how to add a stylesheet when you use React to create a new frontend for your project. If you already know how to add stylesheets to React, you can skip this tutorial.

-   [Make inter-canister calls](./intercanister-calls.md) illustrates how to make simple calls to functions defined in one canister from another canister in the same project.

-   [Create scalable apps](./scalability-cancan.md) describes using multiple canisters to create applications that scale.

-   [Add access control with identities](./access-control.md) describes how to create and switch between multiple user identities.

-   [Accept cycles from a wallet](./simple-cycles.md) illustrates how to accept cycles sent from the default wallet canister.

Additional tutorials covering more advanced dapps and more detailed examples of how to use the basic building blocks are available in the [examples](https://github.com/dfinity/examples) repository and [*Motoko Programming Language Guide*](../languages/motoko/about-this-guide.md).
