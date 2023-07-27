---
sidebar_position: 3
title: '3: Adding variables and methods'
---

# 3: Adding variables and methods

Now let's start adding some code to our backend!

We will use [Motoko programming language.](../motoko/main/)

In this tutorial, we will edit file `src/poll_backend/main.mo`, but if you want to play and iterate with Motoko, the [Motoko playground](https://m7sm4-2iaaa-aaaab-qabra-cai.ic0.app) is a good web-based option.

## Creating an actor

Backend logic on the Internet Computer is implemented as [canister smart contracts](https://internetcomputer.org/how-it-works/architecture-of-the-internet-computer/#canister-smart-contracts). In Motoko, canisters are represented as "actors".

:::info
[Actor](https://en.wikipedia.org/wiki/Actor_model) is a computer science concept of a component that:

- Includes both code and data.
- Executes everything in a single thread, so that the developer doesn't have to deal with concurrency problems.
- Communicates with the external world by sending and receiving messages.

:::

To create an actor, delete everything from `main.mo` file and add the following code:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```motoko
actor {

    //actor code goes here
    
}
```

As you can see this actor is empty and doesn't receive or send any messages. Also, it doesn't define any data
structures; we will edit this next.

## Add the question data structure

For our poll dapp, we want to the poll to have the main question. For example, "What is your favorite programming language?"

To add the question, include the following code **inside** the actor code in the `main.mo` file:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```motoko
    var question: Text = "What is your favorite programming language?";
```

This new statement does the following:

- Creates a new actor's variable `question`.
- Declares the type of this variable Text, which is the standard type for strings in Motoko. Because of this, we need to add an import statement at the top of the file to use the `Text` type: `import Text "mo:base/Text";`.

After these changes, `main.mo` file should look like this:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```motoko
import Text "mo:base/Text";


actor {
    var question: Text = "enter your question";

}
```

The code above has an actor that has no methods, but contains one fixed variable.


## Adding access methods

To do any useful work, actors needs to be able to communicate with the external world. Actors communicate by sending and receiving "messages".

For our poll actor, we want to be able to:

- Get the current main question.
- Get the list of available options to vote on.
- Vote on an option and save it in the backend.
- Reset the vote counts for each option.


To start, we will create the `getQuestion` method:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own. To view the full code file that should be run, please see [final code](#final-code).
:::

```motoko
public query func getQuestion() : async Text { 
    question 
};
```

This first method `getQuestion` takes the value of the `question` variable and return it to the caller. Some important
observations:

- All methods that return values on the Internet Computer have to be declared `async` to allow asynchronous execution.
- Because the `getQuestion` method doesn't change any data, it can be declared as a `query` [call](../../references/glossary#query).
- Since the method uses `Text` type, we will have to import it at the top of the file via `import Text "mo:base/Text"`.

### Queries vs updates

**Updates** are executed on all machines of the subnet and the result will have to pass through a cryptographic
consensus algorithm. 

**Queries** are executed only on one node of a subnet. Because the consensus is required to change
data, it's not possible to change data in queries.

|                      | Queries                    | Updates                |
|----------------------|----------------------------|------------------------|
| Resource consumption | Low                        | High                   |
| Response times       | Fast (300ms-900ms)         | Slow (2s-10s)          |
| Cost                 | Free                       | Cost cycles            |
| Data change         | Not allowed to change data | Allowed to change data |


## Final code

After all the changes, `main.mo` file should look like this:

```motoko
import Text "mo:base/Text";


actor {
    var question: Text = "enter your question";

    public query func getQuestion() : async Text { 
      question 
    };
}
```

## Summary

During this step we learned:

- Internet Computer backend code consists of actors.
- Actors are components that interact with the external world via messages.
- Actors can have data as variables.
- Query methods are fast and free, but they can't change the data.
- Update methods are slower, but they can change the data.

## Next steps
In the next step we will see how to deploy the dapp locally and play with it using Candid UI.
[4: Deploying locally using Candid UI](04_deploying-locally-using-candid-ui.md)
