# Step 3 - Adding variables and methods


Now let's start adding some code to our backend!

We will use Motoko programming language. You can get a quick overview of Motoko at the [Motoko Language Tour](/motoko/intro/index.md).

We will edit file `src/poll_backend/main.mo`.

## Creating an actor
Backend logic on the Internet Computer is implemented as canisters. In Motoko, canisters are represented as "Actors".

:::note
[Actor](https://en.wikipedia.org/wiki/Actor_model) is a computer science concept of a component that:
- Includes both code and data
- Executes everything in a single thread, so that the developer doesn't have to deal with concurrency problems
- Communicates with external world by sending and receiving messages
:::

To create an actor, delete everything from `main.mo` file and add the following code:

```motoko
actor {

}
```

As you can see this actor is empty - it doesn't receive or send any messages. Also it doesn't define any data structures. We will change in the next section.

## Add the question data struture

For our poll app, we want to the poll to have the main question. For example, "What is the best blockchain?"

To add the question, include the following code inside the actor:
```motoko
    var question: Text = "enter your question";
```

The new statement does the following:
- Creates a new actor's variable `question`
- Declares the type of this variable Text, which is the standard type for strings in Motoko
- Sets the default value for the variable to the value "enter your question"

## Adding access methods

To do any useful work, actors needs to be able to communicate with the external world. Actors communicate using "messages" that are represented as functions.

For our poll actor, we want to be able to:
- Get the current main question
- Set the current main qquestion

So, we will add these two methods to our actor:

```motoko
public query func getQuestion() : async Text { 
    question 
};

public func setQuestion(q: Text) { 
    question := q 
};
```

The first method `getQuestion` takes the value of the `question` variable and return it to the caller. Some important observations:
- All methods that return values on the Internet Computer have to be declared `async` to allow asynchronous execution. 
- Because the `getQuestion` method doesn't change any data, it can be declared as `query` to improve performance. 


The second method `setQuestion` receives the value `q` and assigns it to the our variable `question`. Since `setQuestion` changes the actor's data, it is NOT declared as `query` that makes it an "update method".

:::note
### Queries vs Updates
**Updates** are executed on all machines of the subnet and the result will have to pass through a cryptographic consensus algorithm. **Queries** are executed only on one node of a subnet. Because the consensus is required to change data, it's not possible to change data in queries.

|                      | Queries                    | Updates                |
| -------------------- | -------------------------- | ---------------------- |
| Resource consumption | Low                        | High                   |
| Response times       | Fast (300ms-900ms)         | Slow (3s-10s)          |
| Cost                 | Free                       | Cost cycles            |
| Datat change         | Not allowed to change data | Allowed to change data |


:::

## Full code

After all the changes the code should look like this:
```motoko
actor {
    var question: Text = "enter your question";

    public query func getQuestion() : async Text { 
      question 
    };
    
    public func setQuestion(q: Text) { 
      question := q 
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