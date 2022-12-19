# Step 5 - Using collections

In this step we will add new variable `options` to the actor that will hold a list of the choices that users can vote for in the poll.


## Creating a "map"

Each option is a string, what describes what the users are voting for. However, since we have multiple options in the poll we will need to store them in some data structure. We will use a collection called [`RBTree`](/motoko/main/base/RBTree.md) which is similar to "maps" or "dictionaries" in other languages.

The collection will "map" option identifier (an natural number) to the option value (text). For example, we may have this list of options if we want to vote for our favorite programming language:

| id  | option |
| --- | ------ |
| 1   | Motoko |
| 2   | Rust   |
| 3   | Swift  |
| 4   | F#     |


To use RBTree we need to import it. In addition, we will need to import the standard type [`Nat`](/motoko/main/base/Nat.md) to use some of the module's functions. So first let's add an import statement to the beginning of our file `main.mo`:
```motoko
import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
```

Next we need to declare the variable of this type inside the actor:
```motoko
    var options: RBTree.RBTree<Nat, Text> = RBTree.RBTree(Nat.compare);
```

In this snippet we create a variable `options`, whose type is `RBTree.RBTree<Nat, Text>`.

:::note
The current version of Motoko makes collections declarations a bit verbose and difficut to understand for beginners. We are working to create a more elegant syntax.
:::

## `addOption` method

We need a method to create a new option. Since the data will be altered, the method should be an update.

Here's the code with comments inline:

```motoko
// new variable `optionCounter` to store value of the next option id
var optionCounter = 0; 

// the parameter newOption defined the string value of the new option
// the method returns a value of the new option that was just added
public func addOption(newOption : Text) : async Nat { 
    optionCounter += 1;
    
    // we use the method RBTree.put() to add a value to the map
    options.put(optionCounter, newOption); 
    
    // the last value in the function closure is the result
    // this line could also be "return optionCounter;"
    optionCounter
};
```

## `deleteOption` and `updateOption` methods

We need delete and update methods to be able to edit the list of options. Here's the code:
```motoko
public func deleteOption(optionId : Nat) {
    // RBTree.delete() removes the element from the map
    options.delete(optionId); 
};

public func updateOption(optionId : Nat, option : Text) {
    // RBTree.put() replaces the element with a new value
    options.put(optionId, option);
};
```

## `getOptions`  method
Stricly speaking, the method for listing options is not necessary because it will be superceded by `getOptionsAndVotes()` from the next chapter. However, it's a good exercise to code a simpler version first.

Here's the code:
```motoko
// the method returns an array of tuples (Nat, Text)
public query func getOptions() : async [(Nat, Text)] {
    Iter.toArray(options.entries())
};
```

Comments about the implementation:
- The method is a query since we are not saving any data
- The method returns an array. Array is a simple container that can hold multiple values.
- The array element is a tuple, another container of fixed length that has a typed value on each of the position. For example, a tuple `(Nat, Text)` represents all potential values where the first elements is a antural number and the second element is a string.
- We use a class Iter that represents an iterator, a pointer-like data structure that allows the developer to move over another data stucture and see values one by one in a sequential manner.
-  The  statement `Iter.toArray(options.entries())` is executed in this sequence:
    1. `options.entries()` method produces an iterator of tuples `(Nat, Text)` that represent the map's values
    2. `Iter.toArray()` is a standard function that convers `Iter<(Net,Text)>` to array of `(Nat,Text)`





To make this method work, we also need to add a new import statement to the beginnign of the file:
```motoko
import Iter "mo:base/Iter";
```

## Final code
Once you completed all the changes your code should look like this:
```motoko
import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

actor {
    var question: Text = "enter your question";

    public query func getQuestion() : async Text { 
      question 
    };
    
    public func setQuestion(q: Text) { 
      question := q 
    };

        // OPTIONS
    var options: RBTree.RBTree<Nat, Text> = RBTree.RBTree(Nat.compare);
    var optionCounter = 0;

    public func addOption(newOption : Text) : async Nat {
      optionCounter += 1;
      options.put(optionCounter, newOption);
      optionCounter
    };

    public func deleteOption(oid : Nat) {
      options.delete(oid);
    };

    public func updateOption(oid : Nat, option : Text) {
      options.put(oid, option);
    };

    public query func getOptions() : async [(Nat, Text)] {
        Iter.toArray(options.entries())
    };    
}

```

## Deploying and testing

You will need to deploy the updated code by typing in the terminal:
```bash
$ dfx deploy
```

After the deployment process is completed, click on the link in the "Backend canister" section of the deploy command output:
![dfx deploy output with a link](__attachments/dfx%20deploy%20with%20link.png)

After that you can open Candid UI and explore the new methods:
![collections candid ui animation](__attachments/collections%20candid%20ui%20animation.gif)
