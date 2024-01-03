# 15: Using multiple actors

## Overview
In this guide, you are going to create a project with multiple actors. Currently, you can only define one actor in a Motoko file and a single actor is always compiled to a single canister. You can, however, create **projects** that have multiple actors and can build multiple canisters from the same `dfx.json` configuration file.

For this guide, you are going to create separate program files for three actors in the same project. This project defines the following unrelated actors:

-   The `assistant` actor provides functions to add and show tasks in a to-do list.

    For simplicity, the code sample for this guide only includes the functions to add to-do items and to show the current list of to-do items that have been added. A more complete version of this canister—with additional functions for marking items as complete and removing items from the list—is available in the [examples](https://github.com/dfinity/examples/) repository as [simple to-do checklist](https://github.com/dfinity/examples/tree/master/motoko/simple-to-do).

-   The `rock_paper_scissors` actor provides a function for determining a winner in a hard-coded rock-paper-scissors contest.

    This code sample illustrates the basic use of `switch` and `case` in a Motoko program with hard-coded players and choices.

-   The `daemon` actor provides mock functions for starting and stopping a daemon.

    This code sample simply assigns a variable and prints messages for demonstration purposes.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./dev-env.md).

## Create a new project

Open a terminal shell on your local computer, if you don’t already have one open.

Create a new project by running the following command:

```
dfx new multiple_actors
```

Change to your project directory by running the following command:

```
cd multiple_actors
```

## Modify the default configuration

You have already seen that creating a new project adds a default `dfx.json` configuration file to your project directory. For this guide, you need to add sections to this file to specify the location of each canister that defines an actor you want to build.

Open the `dfx.json` configuration file in a text editor, then change the default `multiple_actors_backend` canister name and source directory to `assistant`.

For example, under the `canisters` key:

```
"assistant": {
  "main": "src/assistant/main.mo",
  "type": "motoko"
},
```

Because you are going to add settings to this `canisters` section of the configuration file, you must also add a **comma** after the curly brace that encloses the location of the `assistant` main source code file and the canister type.

Remove the `multiple_actors_frontend` section from the file.

Add a new canister name, source code location, and canister type for the `rock_paper_scissors` canister and a new canister name, source code location, and canister type for the `daemon` program files below the `assistant` canister definition.

After making the changes, the `canisters` section of the `dfx.json` file should look similar to this:

```
{
  "canisters": {
    "assistant": {
      "main": "src/assistant/main.mo",
      "type": "motoko"
    },
    "rock_paper_scissors": {
      "main": "src/rock_paper_scissors/main.mo",
      "type": "motoko"
    },
    "daemon": {
      "main": "src/daemon/main.mo",
      "type": "motoko"
    }
  },
  "defaults": {
    "build": {
      "packtool": ""
    }
  },
  "version": 1
}
```

Save your changes and close the `dfx.json` file to continue.

Change the name of the default source file directory to match the name specified in the `dfx.json` configuration file by running the following command:

```
cp -r src/multiple_actors_backend/ src/assistant/
```

Copy the `assistant` source file directory to create the main canister file for the `rock_paper_scissors` actor by running the following command:

```
cp -r src/assistant/ src/rock_paper_scissors/
```

Copy the `assistant` source file directory to create the main canister file for the `daemon` actor by running the following command:

```
cp -r src/assistant/ src/daemon/
```

## Modify the default canisters

You now have three separate directories in the `src` directory, each with a template `main.mo` file. For this guide, you will replace the content in each template `main.mo` file with a different actor.

Open the `src/assistant/main.mo` file in a text editor and delete the existing content.

Copy and paste this code into the file:

```
import Array "mo:base/Array";
import Nat "mo:base/Nat";

// Define the actor
actor Assistant {

  stable var todos : [ToDo] = [];
  stable var nextId : Nat = 1;

  // Define to-do item properties
  type ToDo = {
    id : Nat;
    description : Text;
    completed : Bool;
  };

  // Add to-do item utility
  func add(todos : [ToDo], description : Text, id : Nat) : [ToDo] {
    let todo : ToDo = {
      id = id;
      description = description;
      completed = false;
    };
    Array.append(todos, [todo])
};

  // Show to-do item utility
  func show(todos : [ToDo]) : Text {
    var output : Text = "\n___TO-DOs___";
    for (todo : ToDo in todos.vals()) {
      output #= "\n(" # Nat.toText(todo.id) # ") " # todo.description;
      if (todo.completed) { output #= " ✔"; };
    };
    output
  };

  public func addTodo (description : Text) : async () {
    todos := add(todos, description, nextId);
    nextId += 1;
  };

  public query func showTodos () : async Text {
    show(todos)
  };

};
```

Save your changes and close the `main.mo` file to continue.

Open the `src/rock_paper_scissors/main.mo` file in a text editor and delete the existing content.

Copy and paste this code into the file:

```
import I "mo:base/Iter"; 

actor RockPaperScissors {

  stable var alice_score : Nat = 0;
  stable var bob_score : Nat = 0;
  stable var alice_last : Choice = #scissors;
  stable var bob_last : Choice = #rock;

  type Choice = {
    #rock;
    #paper;
    #scissors;
  };

  public func contest() : async Text {
    for (i in I.range(0, 99)) {
      battle_round();
    };
    var winner = "The contest was a draw";
    if (alice_score > bob_score) winner := "Alice won" 
    else if (alice_score < bob_score) winner := "Bob won";
    return (winner);
  };

  func battle_round() : () {
    let a = alice(bob_last);
    let b = bob(alice_last);

    switch (a, b) {
      case (#rock, #scissors) alice_score += 1;
      case (#rock, #paper) bob_score += 1;
      case (#paper, #scissors) alice_score += 1;
      case (#paper, #rock) bob_score += 1;
      case (#scissors, #paper) alice_score += 1;
      case (#scissors, #rock) bob_score += 1;
      case (#rock, #rock) alice_score += 0;
      case (#paper, #paper) bob_score += 0;
      case (#scissors, #scissors) alice_score += 0;
    };

    alice_last := a;
    bob_last := b;

    return ();
  };
  
  // Hard-coded players and choices
  func bob(last : Choice) : Choice {
    return #paper;
  };

  func alice(last : Choice) : Choice {
    return #rock;
  };
};
```

Save your changes and close the `main.mo` file to continue.

Open the `src/daemon/main.mo` file in a text editor and delete the existing content.

Copy and paste this code into the file:

```
actor Daemon {
  stable var running = false;

  public func launch() : async Text {
    running := true;
    debug_show "The daemon process is running";
  };

  public func stop(): async Text {
    running := false;
    debug_show "The daemon is stopped";
  };
};
```

Save your changes and close the `main.mo` file to continue.

## Start the local canister execution environment

Before you can install the `multiple_actors` project locally, you need to start your local canister execution environment. If you intend to deploy it to the Internet Computer blockchain mainnet, then you can skip this section.

Open a new terminal window or tab on your local computer.

Navigate to the root directory for your project, if necessary.

Start the local canister execution environment by running the following command:

```
dfx start --clean
```

This guide uses the `--clean` option to start the local canister execution environment in a clean state.

This option removes any orphan background processes or canister identifiers that might disrupt normal operations. For example, if you forgot to issue a `dfx stop` when moving between projects, you might have a process running in the background or in another terminal. The `--clean` option ensures that you can start the local canister execution environment and continue to the next step without manually finding and terminating any running processes.

Leave the terminal that displays canister execution operations open and switch your focus to your original terminal where you created your new project.

## Deploy your multi-canister dapp

To deploy the multi-canister dapp you need to register, build, and install the canisters either to the local canister execution environment or to the Internet Computer blockchain mainnet.

Register, build, and deploy the application by running the following command in your project's directory:

```
dfx deploy
```

To deploy the dapp on the Internet Computer blockchain mainnet, run `dfx deploy` command specifying the `--network` option and the network alias configured in the `dfx.json` file. For example, if you are connecting to the Internet Computer mainnet using to the URL specified by the network alias `ic` you would run a command similar the following:

```
dfx deploy --network ic
```

The `dfx deploy` command output displays information about the operations it performs. For example, the command displays the specific canister identifiers for the three canisters defined in the `dfx.json` configuration file.

```
Deployed canisters.
URLs:
Backend canister via Candid interface:
assistant: http://127.0.0.1:8080/?canisterId=c2lt4-zmaaa-aaaaa-qaaiq-cai&id=ahw5u-keaaa-aaaaa-qaaha-cai
daemon: http://127.0.0.1:8080/?canisterId=c2lt4-zmaaa-aaaaa-qaaiq-cai&id=aax3a-h4aaa-aaaaa-qaahq-cai
rock_paper_scissors: http://127.0.0.1:8080/?canisterId=c2lt4-zmaaa-aaaaa-qaaiq-cai&id=c5kvi-uuaaa-aaaaa-qaaia-cai
```

## Verify deployment by calling the canisters

You now have three **canisters** smart contracts deployed, either on your local canister execution environment or on the Internet Computer blockchain mainnet, and can test them by using `dfx canister call` commands.

Use the `dfx canister call` command to call the canister `assistant` using the `addTodo` function and pass it the task you want to add by running the following command:

```
dfx canister call assistant addTodo '("Schedule monthly demos")'
```

Verify that the command returns the to-do list item using the `showTodos` function by running the following command:

```
dfx canister call assistant showTodos
```

The command returns output similar to the following:

```
("
___TO-DOs___
(1) Schedule monthly demos")
```

Use the `dfx canister call` command to call the canister `rock_paper_scissors` using the `contest` function by running the following command:

```
dfx canister call rock_paper_scissors contest
```

The command returns the result of the hard-coded contest similar to the following:

```
("Bob won")
```

Use the `dfx canister call` command to call the canister `daemon` using the `launch` function by running the following command:

```
dfx canister call daemon launch
```

Verify the mock `launch` function returns "The daemon process is running" message:

```
(""The daemon process is running"")
```

To test your canisters running on the Internet Computer blockchain mainnet use the same command as above, specifying the `--network` option and the network alias configured in the `dfx.json` file.

## Next steps

In the next guide, let's discuss [access control using identities](./access-control.md)