# Level 1: Space cadet 

- [1.1: Exploring a live demo](1.1-live-demo.md): Before we begin developing our own dapps, let's explore a live, deployed canister that utilizes the Motoko playground through the `dfx deploy --playground` command. This module covers:
    - Overview of Motoko Playground.
    - An overview of the `dfx deploy --playground` command.
    - Deploying a canister to Motoko Playground using `dfx`.
    - Interacting with the canister via the CLI.
    - Interacting with the canister via the Candid interface.

- [1.2: Motoko level 1](1.2-motoko-lvl1.md): To develop our own dapp, we first need to cover the fundamentals of writing Motoko code. This module covers:
    - Basic concepts and terms.
    - Motoko syntax.
    - Using the base library.
    - Declarations and expressions.
    - Defining an actor.
    - Values and evaluation:
        - Primitive values.
        - Non-primitive values.
    - Printing values.
    - Passing text arguments.

- [1.3: Developing your first dapp](1.3-first-dapp.md): 
    - Creating a new project.
    - Reviewing the project's file structure.
    - Writing the backend canister code.
        - Creating an actor.
        - Defining the `getQuestion` method.
        - Query calls vs. update calls.
        - Creating a data structure to store the data.
        - Importing additional dependencies.
        - Declaring the `votes` variable.
        - Declaring the `getVotes` method.
        - Declaring the `votes` method.
        - Declaring the `resetVotes`  method.
        - Final code.
    - Deploying the dapp locally.
    - Adding pre-developed frontend code.
    - Re-deploying the dapp.

- [1.4: Acquiring and using cycles](1.4-using-cycles.md): 
    - Overview of cycles.
    - Creating a developer identity.
    - Acquiring cycles using a cycles coupon.
    - Converting ICP tokens to cycles.

- [1.5: Deploying canisters](1.5-deploying-canisters.md): 
    - Deploying to the mainnet.

- [1.6: Managing canisters](1.6-managing-canisters.md): 
    - Obtaining a canister's ID.
    - Obtaining canister information.
    - Adding an identity as a controller of a canister.
    - Managing the running state of a canister.
    - Checking the cycles balance of a canister.
    - Topping up a canister.
    - Getting cycles back from a canister.
    - Setting the canister's freezing threshold.
    - Deleting a canister.