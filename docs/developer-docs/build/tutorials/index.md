# Tutorials

The [Quick start](../quickstart/quickstart-intro) provided a simplified introduction to the basic work flow for creating and deploying a new project without exploring the contents of the project directory or sample code.

Next, we’ll explore writing a few simple programs to give you hands-on experience creating programs that run on the ic.

Most of these tutorials illustrate how to write dapps using the Motoko programming language. For additional examples of dapps written in other languages, see the {company-id} [examples](https://github.com/dfinity/examples) repository.

The following tutorials introduce the basics for writing dapps that run on the ic:

-   [Explore the default project](tutorials/explore-templates) takes a closer look at the work flow for creating projects by exploring the default files and folders that are added to your workspace when you create a new project.

-   [Query using an actor](tutorials/define-an-actor) highlights how to replace the typical `print` function usually defined in a "Hello, World!" canister by defining an actor (object) with a `hello` function.

-   [Pass text arguments](tutorials/hello-location) introduces different ways you can pass arguments to a function using the command-line in a terminal shell.

-   [Increment a natural number](tutorials/counter-tutorial) guides you through the process of writing a dapp that creates an actor with functions to increment and return the value of a counter.

-   [Use integers in calculator functions](tutorials/calculator) shows you how to write a simple calculator dapp for more practice working with Motoko and to learn more about how you can customize your project environment.

-   [Import library modules](tutorials/phonebook) illustrates how to import and use a few basic Motoko base library functions for working with key-value pairs in a list.

-   [Use multiple actors](tutorials/multiple-actors) describes how to include multiple unrelated actors in a single project to illustrate how you can compile multiple canisters for the same project.

-   [Customize the front-end](tutorials/custom-frontend) illustrates using a simple React framework to create a new front-end for the default sample canister and guides you through some basic modifications to customize the interface displayed. If you already know how to use CSS, HTML, JavaScript, and React or other frameworks to build your user interface, you can skip this tutorial.

-   [Add a stylesheet](tutorials/my-contacts) illustrates how to add a stylesheet when you use React to create a new front-end for your project. If you already know how to add stylesheets to React, you can skip this tutorial.

-   [Make inter-canister calls](tutorials/intercanister-calls) illustrates how to make simple calls to functions defined in one canister from another canister in the same project.

-   [Create scalable apps](tutorials/scalability-cancan) describes using multiple canisters to create applications that scale.

-   [Add access control with identities](tutorials/access-control) describes how to create and switch between multiple user identities.

-   [Accept cycles from a wallet](tutorials/simple-cycles) illustrates how to accept cycles sent from the default wallet canister.

Additional tutorials covering more advanced dapps and more detailed examples of how to use the basic building blocks are available in the [examples](https://github.com/dfinity/examples) repository and [*Motoko Programming Language Guide*](../language-guide/motoko).
