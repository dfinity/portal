# Tutorial 2 - Create your first app

## About this tutorial

This tutorial is a follow up to the [Deploy your first ICP dapp in 5 minutes](../deploy_sample_app.md) tutorial. 

## Introduction

This tutorial guide you through creating a fully functioning dapp called "Poll" that allows you to host a voting poll of multiple choices and share it with other people. Both the backend and frontend will be hosted in ICP [canister smart contracts](https://internetcomputer.org/how-it-works/architecture-of-the-internet-computer/#canister-smart-contracts). The backend will be built in the [Motoko programming language](../../developer-docs/backend/choosing-language.md). To make the dapp simple to learn, this tutorial uses vanilla JavaScript for the frontend.

You application will look similar to this:
![picture 1](./_attachments/simple_voting_app.png)  

## Requirements
It's good to define what you are building in advance.

The app allow you to host only one poll and share it with other people. Some additional requirements:
- Users will be able to vote
- Users can reset the poll to start from scratch

## Prerequisites
To successfully complete this tutorial you will need to:
- Have Internet Computer SDK installed. Look at Tutorial 1 for more information.
- Learn basics of the Motoko programming language. I will explain some of Motoko constructs here. However, it would not hurt to have a general feel of the language before we start here.
- This tutorial will use Visual Studio Code to edit code


## Next steps
Ready to stat coding? Let's go!