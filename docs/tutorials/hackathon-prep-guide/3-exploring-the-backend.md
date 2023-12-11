# 3: Exploring the backend code

## Exploring the `vite-motoko-react` backend code

In the previous tutorial, you deployed a sample full-stack dapp built using Vite, React, and Motoko. This tutorial builds off of the previous tutorial, so if you haven't followed [2: Deploying your first fullstack dapp](2-deploying-first-fullstack-dapp.md), it is recommended that you complete it prior to starting this tutorial.


In the sample fullstack dapp, you learned that the frontend UI interacts with the backend canister's method `counter`. When the UI button is clicked, the backend canister's method `counter` increases the value of `count` by an increment of 1. In this tutorial, you'll explore the backend code to learn more about the `counter` method.

Recall that the `vite-motoko-react` project includes the following files and subdirectories:

```
├── README.md
├── backend
│   ├── Backend.mo
│   └── tests
│       ├── Backend.add.test.mo
│       ├── Backend.get.test.mo
│       └── Backend.inc.test.mo
├── dfx.json
├── mops.toml
├── package-lock.json
├── package.json
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   ├── favicon.ico
│   │   ├── motoko.png
│   │   ├── motoko_moving.png
│   │   ├── motoko_shadow.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── index.html
│   ├── index.scss
│   ├── main.tsx
│   ├── setupTests.ts
│   ├── tests
│   │   └── App.test.tsx
│   └── vite-env.d.ts
├── tsconfig.json
└── vite.config.ts
```

The backend canister's code, stored at `backend/Backend.mo`, contains the following:

```motoko
actor class Backend() {
  stable var counter = 0;
  // Get the current count
  public query func get() : async Nat {
    counter;
  };
  // Increment the count by one
  public func inc() : async () {
    counter += 1;
  };
  // Add `n` to the current count
  public func add(n : Nat) : async () {
    counter += n;
  };
};
```

Let's breakdown each portion of this code.

First, the code defines an actor called `Backend`. In Motoko, programs consist of an actor expression that is introduced using the keyword `actor`. An actor is a process with encapsulated state that communicates with other running actors. Each canister can only contain one actor. You can learn more about Motoko actors [here](/docs/current/tutorials/developer-journey/level-1/1.2-motoko-lvl1).

```motoko
actor class Backend() {
```

Next, the code defines a variable (`var`) called `counter` with a value of `0`. This variable is defined with the word `stable`, which indicates it is a **stable variable**. A stable variable is a variable defined within an actor which uses the `stable` keyword in the variable's declaration. This indicates that the data stored in the variable should be stored using stable storage. This tutorial will go further into stable storage in the section [stable memory](#stable-memory) If this stable keyword is not used, the variable is defined as flexible by default.

```motoko
stable var counter = 0;
```

Next, the code defines a public function called `get()`. The function is modified with the keyword `query`, which defines that calls to this function will use a query call. A query call is used for querying information from a canister's method. This tutorial will go into further detail on query calls in the section [query and update calls](#query-and-update-calls). This function simply returns the value of the `counter` variable. 

```motoko
public query func get() : async Nat {
    counter;
};
```

In the next portion of the code, a public function called `inc()` is defined. This function increases the value of the `counter` variable by `1` every time the function is called.

```motoko
public func inc() : async () {
    counter += 1;
};
```

Lastly, the `add(n : Nat)` function is defined. This function adds `n` to the current count, where `n` is a numerical value passed to the function when it is called. In the frontend UI, the button used to increase the counter value does not used this function, however it can be called manually from the CLI or Candid interface of the backend canister. This tutorial will go into further detail on Candid in the section [Candid](#candid).

```motoko
public func add(n : Nat) : async () {
    counter += n;
};
```

You can learn more about Motoko in the following resources:

- [Motoko level 1](/docs/current/tutorials/developer-journey/level-1/1.2-motoko-lvl1).

- [Motoko level 2](/docs/current/tutorials/developer-journey/level-2/2.6-motoko-lvl2).

- [Motoko level 3](/docs/current/tutorials/developer-journey/level-3/3.6-motoko-lvl3).

- [Motoko level 4](/docs/current/tutorials/developer-journey/level-4/4.6-motoko-lvl4).

- [Motoko bootcamp](https://github.com/motoko-bootcamp/bootcamp-2022), a week-long crash course to learning all things Motoko. 

- [Motoko documentation](/docs/current/motoko/main/motoko).


## Single versus multi-canister projects

When you design a dapp to be deployed on ICP, one of the first decisions you will make is how your dapp should be structured. Dapps can consist of a single canister, such as only the backend canister, they can consist of a single backend canister and a single frontend canister, as this sample `vite-react-motoko` starter project does, or they can consist of several canisters. 

Typically, service-based dapps that don't include a frontend UI work well as single canister projects, while projects that involve several reusable services can work well as a multi-canister project. 

## Query and update calls

When calls are made on ICP, there are two primary types: query calls and update calls. 

**Query calls** are calls that do not alter the state of a canister, making them 'read-only' operations. Query calls are used to query the current state of a canister or make a call to a method that operates on the canister's state. They are executed synchronously and answered immediately once received. Query calls are executed on a single node within a subnet. The backend canister in this example uses the following query call, defined by the keyword `query` as seen above:

```motoko
public query func get() : async Nat {
    counter;
};
```

**Update calls** are able to alter the canister's state. Any changes made with an update call are persisted. They are executed on all nodes of a subnet, since the result must go through the subnet's consensus process. Update calls are submitted and answered asynchronously. This is because update calls must go through consensus on the subnet to return the result of the call. Update calls are not defined with a function modifier as query calls are. Below is a simple update call example that provides a method counting the number of characters within a given string, then updates the canister's state. If the string is divisible by 2, the function returns a value of 'true'. 

```motoko
actor countCharacters {
    public func test(text : Text) : async Bool {
        let size = Text.size(text);
        return size % 2 == 0;
    };
};
```

Additionally, there are several other terms regarding calls that you will come across as an ICP developer, such as:

**Composite queries** are query calls that can call other queries (on the same subnet). They can only be invoked via ingress messages using dfx or through an agent such as a browser front-end, and not by other canisters.

**Certified variables** are verifiable pieces of data that have an associated certificate that proves the data's authenticity. Certified variables are set using an update call, then read using a query call.

**Inter-canister calls** are used to make calls between different canisters.

You can learn more about canister calls in the documentation [here](/docs/current/tutorials/developer-journey/level-2/2.2-advanced-canister-calls).

## Candid

Candid is an interface description language that is used to describe the public interface of a service. On ICP, a service an application deployed as a canister. Public interfaces of canisters are used to interact with the canister. Candid supports interactions through the IC SDK via the terminal, through a web browser, or through the use of agents. It also provides a way to specify input argument values and display return values from different canister methods, regardless of the manner used to interact with the canister. Candid is used on ICP since it supports the unique features and functions of the protocol. 

For example, a simple service description that defines a service without any public methods would look like this:

```
service : {}
```

A service description that does not have any pubic methods is not very useful. To add a public method, you can add a simple `ping` method:

```
service : {
  ping : () -> ();
}
```

In this `ping` method, there are no arguments passed to the method and there are no results returned, so the empty sequence of () is used for both the arguments and the results.

You can learn more about Candid in the documentation [here](/docs/current/tutorials/developer-journey/level-2/2.4-intro-candid).

## Canister upgrades

Once a canister has been deployed and is running, there may need to be changes made to the canister's code to fix bugs or introduce new features. To make these changes, the canister must be upgraded.

The ability to upgrade a canister is a key feature of ICP, since it allows canister smart contracts to persist using Wasm memory that utilizes ICP's stable memory feature. When a canister is upgraded, the existing state of the canister is preserved the canister's code is changed.

You can learn more about upgrading canisters in the documentation [here](/docs/current/tutorials/developer-journey/level-2/2.1-storage-persistence#upgrading-canisters).

## Stable memory

Stable memory refers to the Internet Computer's long-term data storage feature. Stable memory is not language specific, and can be utilized by canisters written in Motoko, Rust, or any other language. Stable memory can hold up to 96GiB if the subnet can accommodate it. When a canister is upgraded, stable memory is not cleared, and anything stored in the canister's stable memory is persisted across the upgrade. 

In contrast to stable memory, there is heap storage. Heap storage refers to the regular Wasm memory data store for each canister. This storage is temporary and is not persisted across canister upgrades. Data stored in heap storage is removed when the canister is upgraded or reinstalled. Heap storage is limited to 4GiB.

Stable storage is a Motoko-specific term that refers to the Motoko stable storage feature. Stable storage uses ICP's stable memory to persist data across canister upgrades.

Stable variables are a Motoko-specific feature that refers to variables defined in Motoko that use the stable modifier which indicates that the value of the variable should be persisted across canister upgrades. An example of this was shown earlier in this tutorial, with the stable variable defined in the backend canister code, `stable var counter = 0;`. 

Motoko supports preserving a canister's state using ICP's stable memory through a Motoko-specific feature known as stable storage, which is designed to accommodate changes to both the application data and the Motoko compiler. Stable storage utilizes ICP's stable memory feature that was discussed previously.

Upgrading canisters written in Rust and other languages use a different workflow which incorporates serialization of the canister's data. For more information on Rust upgrades, see the documentation [here](/docs/current/developer-docs/backend/rust/upgrading).

You can learn more about storage and data persistence in the documentation [here](/docs/current/tutorials/developer-journey/level-2/2.1-storage-persistence)

## Importing external canisters

Third-party canisters include canisters created by DFINITY, such as NNS, ledger, II, and others, but also include canisters that have been created by developers in ICP community. Developers depend on third-party canisters to integrate with and typically need a way to develop and test the integrations locally for things such as:

Testing the accuracy of the integration and other canister code.
Performing tests without paying cycles.
Performing tests using non-production data and environments.
Performing tests with faster completion time when run locally.
To pull these canisters from the mainnet to be developed and tested using a local replica, the dfx deps command and workflow can be used.

In this workflow, a service provider configures a canister to be pullable, then deploys the canister to the mainnet. A service provider can be any community developer creating a public, third-party canister.

Then, a service consumer can pull the canister as a dependency directly from the mainnet and then deploy the dependency on a local replica.

This guide will further describe this workflow and how to use it.

Determining if a canister should be pullable
To pull a canister that's been configured as pullable, the service consumer only requires the canister ID.

Before pulling a canister, first the canister must be configured to be pullable. Additionally, you must ask yourself question whether the canister should be pullable?

Pullable examples:
If a canister is providing a public service at a static canister ID, then it makes sense for the canister to be pullable.

If a service canister also depends on other canisters, those dependencies should also be pullable.

Non-pullable examples:
If the canister is meant for personal use and not intended for others to use, it does not make sense for the canister to be pullable.

If a canister Wasm is published for other developers to use for deploying their own instance, it does not make sense for the canister to be pullable since the canister ID of the instance is not static; users can test integrations locally and deploy them directly. An example of this canister type is the asset canister generated by dfx.

Pullable dfx.json example
For a canister to be pullable, the dfx.json file must include a pullable definition. Below is an example:

{
  "canisters": {
    "service": {
      "type": "motoko",
      "main": "src/pullable/main.mo",
      "pullable": {
        "dependencies": [],
        "wasm_url": "https://github.com/lwshang/pullable/releases/latest/download/service.wasm",
        "init_guide": "A natural number, e.g. 1"
      }
    }
  }
}



## MOPS

A package manager is a collection of tools that automates installing, upgrading, configuring, and removing software packages or libraries. They help efficiently manage the dependencies of a project. In relation to Motoko, Mops and Vessel provide workflows for libraries to be downloaded, upgraded, and imported into Motoko code files. Mops supports over 60 libraries for Motoko, spanning several different functionalities such as utility, encoding, cryptography, data structure libraries, and more.



Using Mops
Creating a new project
To get started, create a new project in your working directory. Open a terminal window, navigate into your working directory (developer_journey), then use the commands:

dfx start --clean --background
dfx new mops_example
cd mops_example
Configuring your project to use Mops
Then, open the dfx.json file within your project. Add Mops as a packtool in the file by adding the following line:

{
  "defaults": {
    "build": {
      "packtool": "mops sources"
    }
  }
}
Initializing Mops
Then, initialize the Mops configuration with the command:

mops init
You'll be prompted to choose whether you plan to use Mops to pull packages or publish packages:

? Select type: › - Use arrow-keys. Return to submit.
❯   Project (I just want to use mops packages in my project)
    Package (I plan to publish this package on mops)
In this case, select 'Project'. For more information about publishing packages, see the publishing a package section.

You will also be prompted to choose if you'd like to use a GitHub workflow. This is optional.

Adding packages to mops.toml.
To install a package with Mops, you need to specify the package in the mops.toml file within your project. To add a package to this file, you can use the command maps add then the package name:

mops add base
Or, you can add packages directly from GitHub by specifying the repository's URL:

mops add https://github.com/dfinity/motoko-base
You can also specify the branch, commit hash, or tag by adding #<branch/tag/hash>:

mops add https://github.com/dfinity/motoko-base#moc-0.9.1
If you have a locally stored package, you can put the source files inside your project's directory, then add them by specifying the path:

mops add ./local-package
Using any of these workflows will add the package to the mops.toml file.

Then, to install all packages specified in this file, use the command:

mops install


## Next steps

- [4: Exploring the frontend](4-exploring-the-frontend.md).