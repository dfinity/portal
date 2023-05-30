---
sidebar_position: 5
title: '5: Storing data'
---

# 5: Storing data

In this step, we will solve a problem: our actor needs to keep a list and track of how many votes each programming language (e.g. "Rust") has.

## Creating a data structure to store the data

In order to store the potential choices and how many votes each has, we need a collection. We will use a Motoko data structure called [`RBTree`](/motoko/main/base/RBTree.md) which is similar to "maps" or "dictionaries" in other languages; essentially a key-value store.

`RBTree` will "map" an *entry* of type `Text` (e.g. `"Rust"`) to the a *vote count* of type `Nat` (e.g. `5`).

For example, the data structure for our "Favorite programming language" poll may look like this:

| id  | Vote Count |
| --- | ------ |
| "Motoko"   | 0 |
| "Rust"   |   0 |
| "TypeScript"   |  0 |
| "Python"   | 0     |


### Necessary Imports

We need to import a few things in order to store and query the data:

* To use `RBTree` we need to import `RBTree`. 
* We need to import the standard type [`Nat`](/motoko/main/base/Nat.md) in order to use some of `RBTree`'s functions.
* We also import `Iter` because we will use it later in this tutorial.

So we add an import statement to the beginning of our file `main.mo`:

```motoko
import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
```

### Creating an instance of the data

Next we need to declare the variable of this type inside the actor:

```motoko
    var votes: RBTree.RBTree<Text, Nat> = RBTree.RBTree(Text.compare);
```

In this snippet we create a variable `votes`, whose type is the collection `RBTree.RBTree<Text, Nat>`.

:::info
Future versions of Motoko will introduce usability enhancements in collections declarations so they are not as verbose for beginners. 
:::

## Accessing the data

### `getVotes` method

We need a method to query vote counts per entry. Since the data will not be altered, the method can be a query call.

Here's the code with comments inline:

```motoko
// query the list of entries and votes for each one
// Example: 
//      * JSON that the frontend will receive using the values above: 
//      * [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]

    public query func getVotes() : async [(Text, Nat)] {
    
        Iter.toArray(votes.entries())
    
    };

```
### What this does
- The `getVotes` method returns an `Array`. [`Array`](../../motoko/main/base/Array.md) is a simple container that can hold multiple values.
- In this particular case, the array holds elements that is a tuple. The tuples in this case are of type `(Text, Nat)`
- We use a class `Iter` that represents an iterator, a pointer-like data structure that allows the developer to move over another data structure and see values one by one in a sequential manner.
-  The  statement `Iter.toArray(votes.entries())` is executed in this sequence:
    1. `votes.entries()` method produces an iterator of tuples `(Text, Nat)` that represent the `RBTree`'s values.
    2. `Iter.toArray()` is a standard function that converts `Iter<(Text,Nat)>` to *array* of `(Text, Nat)`. We do this so the frontend receives an array, instead of an iterator.


## `vote` method

We need a method to vote for a programming language entry. This should be an update call since it alters the state. 

Here's the code:
```motoko
 // This method takes an entry to vote for, updates the data and returns the updated hashmap
// Example input: vote("Motoko")
// Example: 
//      * JSON that the frontend will receive using the values above: 
//      * [["Motoko","1"],["Python","0"],["Rust","0"],["TypeScript","0"]]
    
  public func vote(entry: Text) : async [(Text, Nat)] {

    //Check if the entry already has votes.
    //Note that "votes_for_entry" is of type ?Nat. This is because: 
    // * If the entry is in the RBTree, the RBTree returns a number.
    // * If the entry is not in the RBTree, the RBTree returns `null` for the new entry.
    let votes_for_entry :?Nat = votes.get(entry);
    
    //Need to be explicit about what to do when it is null or a number so every case is taken care of
    let current_votes_for_entry : Nat = switch votes_for_entry {
      case null 0;
      case (?Nat) Nat;
    };

    //once we have the number of votes, update the votes for the entry
    votes.put(entry, current_votes_for_entry + 1);

    //Return the number of votes as an array (so frontend can display it)
    Iter.toArray(votes.entries())
  };
```
### What this does
- `?Nat` is an [Motoko Optional](../../motoko/main/base/Option.md) that may be a `Nat` or a `null`. 
- If an entry is queried for the `RBTree` titled `votes`, and the entry is not present, it will return `null`. That is why we use a Motoko Optional in line 11.


## `resetVotes`  method
This method resets the state of the votes so every option goes back to 0. Here's the code:


```motoko
//This method resets the vote count for each option and returns the updated hashmap
// Example JSON that the frontend will get using the values above
// [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
    
    public func resetVotes() : async [(Text, Nat)] {

      votes.put("Motoko", 0);
      votes.put("Rust", 0);
      votes.put("TypeScript", 0);
      votes.put("Python", 0);
      Iter.toArray(votes.entries())

    };
```

### What this does
- The method is an update call since it updates the state. All Motoko functions are update calls by default. They are only query calls when they have the `query` keyword before the `func` keyword.

## Final code

Once you completed all the changes your code should look like this:

```motoko
import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Iter "mo:base/Iter";


actor {

  var question: Text = "What is your favorite programming language?";
  var votes: RBTree.RBTree<Text, Nat> = RBTree.RBTree(Text.compare);


  public query func getQuestion() : async Text { 
    question 
  };

// query the list of entries and votes for each one
// Example: 
//      * JSON that the frontend will receive using the values above: 
//      * [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]

    public query func getVotes() : async [(Text, Nat)] {
    
        Iter.toArray(votes.entries())
    
    };



 // This method takes an entry to vote for, updates the data and returns the updated hashmap
// Example input: vote("Motoko")
// Example: 
//      * JSON that the frontend will receive using the values above: 
//      * [["Motoko","1"],["Python","0"],["Rust","0"],["TypeScript","0"]]
    
  public func vote(entry: Text) : async [(Text, Nat)] {

    //Check if the entry already has votes.
    //Note that "votes_for_entry" is of type ?Nat. This is because: 
    // * If the entry is in the RBTree, the RBTree returns a number.
    // * If the entry is not in the RBTree, the RBTree returns `null` for the new entry.
    let votes_for_entry :?Nat = votes.get(entry);
    
    //Need to be explicit about what to do when it is null or a number so every case is taken care of
    let current_votes_for_entry : Nat = switch votes_for_entry {
      case null 0;
      case (?Nat) Nat;
    };

    //once we have the number of votes, update the votes for the entry
    votes.put(entry, current_votes_for_entry + 1);

    //Return the number of votes as an array (so frontend can display it)
    Iter.toArray(votes.entries())
  };

  public func resetVotes() : async [(Text, Nat)] {
      votes.put("Motoko", 0);
      votes.put("Rust", 0);
      votes.put("TypeScript", 0);
      votes.put("Python", 0);
      Iter.toArray(votes.entries())
  };

};
```

## Deploying and testing

You will need to deploy the updated code by typing in the terminal:

```bash
$ dfx deploy
```

After the deployment process is completed, click on the link in the "Backend canister" section of the deploy command output:

```shell
URLs:
  Frontend canister via browser
    poll_frontend: http://127.0.0.1:4943/?canisterId=qsgjb-riaaa-aaaaa-aaaga-cai
  Backend canister via Candid interface:
    poll_backend: http://127.0.0.1:4943/?canisterId=qvhpv-4qaaa-aaaaa-aaagq-cai&id=qhbym-qaaaa-aaaaa-aaafq-cai
```

After that you can open Candid UI and explore the new methods:
![collections candid ui animation](./_attachments/simple_voting_app_candid.png)
