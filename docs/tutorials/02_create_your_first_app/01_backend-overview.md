---
sidebar_position: 1
title: '1: Smart contracts as a backend'
---

# 1: Smart contracts as a backend

First, we will create a backend for our application that will be implemented as an ICP 
[canister smart contract](https://internetcomputer.org/how-it-works/architecture-of-the-internet-computer/#canister-smart-contracts). You can see a preview of the dapp [here](index.md).

## Interfacing with the backend

Analogous to how servers have HTTP endpoints for API calls or objects have methods, any ICP canister can expose its public methods. 

For example, in this small canister written in Motoko, there is a public method called `sayHello` (as noted by the keyword `public`).

```motoko
actor {
  public query func sayHello() : async Text {
    return "Hello!";
  };
}
```

Backend canisters come with a default user interface called Candid UI that will allow you to interact with the canister methods without
writing any frontend code. Here's how Candid UI for our project will look like at the end of this tutorial (once we add the `getQuestions`, `getVotes`, `resetVotes`, and `vote` methods):


![Candid UI screenshot (final)](./_attachments/simple_voting_app_candid.png)


