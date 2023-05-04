---
sidebar_position: 3
title: Step 3 - Adding variables and methods
---

# Step 3 - Adding variables and methods

Now let's start adding some code to our backend!

We will use Motoko programming language. You can get a quick overview of Motoko at
the [Motoko Language Tour](/motoko/intro/index.md).

We will edit file `src/poll_backend/main.mo`.

## Creating an actor

Backend logic on the Internet Computer is implemented as  [canister smart contracts](https://internetcomputer.org/how-it-works/architecture-of-the-internet-computer/#canister-smart-contracts). In Motoko, canisters are represented as "Actors".

:::note
[Actor](https://en.wikipedia.org/wiki/Actor_model) is a computer science concept of a component that:

- Includes both code and data
- Executes everything in a single thread, so that the developer doesn't have to deal with concurrency problems
- Communicates with external world by sending and receiving messages

:::note

  

To create an actor, delete everything from `main.mo` file and add the following code:

```motoko
actor {

}
```

As you can see this actor is empty - it doesn't receive or send any messages. Also it doesn't define any data
structures. We will change in the next section.

## Add the question data structure

For our poll app, we want to the poll to have the main question. For example, "What is your favorite programming language?"

To add the question, include the following code inside the actor:

```motoko
    var question: Text = "What is your favorite programming language?";
```

The new statement does the following:

- Creates a new actor's variable `question`
- Declares the type of this variable Text, which is the standard type for strings in Motoko

## Adding access methods

To do any useful work, actors needs to be able to communicate with the external world. Actors communicate by sending and receiving "messages".

For our poll actor, we want to be able to:

- Get the current main question
- Get the list of available options to vote on
- Vote on an option and save it in the backend
- Reset the vote counts for each option


To start, we will create the `getQuestion` method:
```motoko
public query func getQuestion() : async Text { 
    question 
};
```

This first method `getQuestion` takes the value of the `question` variable and return it to the caller. Some important
observations:

- All methods that return values on the Internet Computer have to be declared `async` to allow asynchronous execution.
- Because the `getQuestion` method doesn't change any data, it can be declared as `query` [call](../../references/glossary#query).
- Since the method uses `Text` type, we will have to import it at the top of the file via `import Text "mo:base/Text"`.

### Queries vs Updates

**Updates** are executed on all machines of the subnet and the result will have to pass through a cryptographic
consensus algorithm. **Queries** are executed only on one node of a subnet. Because the consensus is required to change
data, it's not possible to change data in queries.

|                      | Queries                    | Updates                |
|----------------------|----------------------------|------------------------|
| Resource consumption | Low                        | High                   |
| Response times       | Fast (300ms-900ms)         | Slow (2s-10s)          |
| Cost                 | Free                       | Cost cycles            |
| Data change         | Not allowed to change data | Allowed to change data |


## Full code

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

- Internet Computer backend code consists of actors
- Actors are components that interact with the external world via messages
- Actors can have data as variables
- Query methods are fast and free, but they can't change the data
- Update methods are slower, but they can change the data

In the next article we will see how to deploy the app locally and play with it using Candid UI.