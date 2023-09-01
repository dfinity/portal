---
title: The Internet Computer - Weed Out the Bugs with TLA+ Models
description: Today, DFINITY is open-sourcing all of its TLA+ models. To top it off, the Foundation is also publishing a comprehensive technical tutorial to help devs apply TLA+ to canister smart contracts.
tags: [Technology]
author: Ognjen Maric
image: /img/blog/tla-models.webp
---


Earlier this year, we highlighted the benefits of applying TLA+ to canister smart contracts on the Internet Computer. The TLDR: (1) the potential for immediate monetary loss makes security and correctness critical for smart contracts, (2) formal methods such as TLA+ increase systems’ correctness and security in general, and (3) TLA+ is in particular good at weeding out a very frequent class of bugs, called reentrancy bugs, from canisters.

After some cleanup work, we’re excited to announce that we’ve just open sourced all of our TLA+ models. You’ll find models of the following canisters on GitHub:

- NNS and SNS governance (focusing on interactions with the ledger canister)

- ICP ledger (focusing on block archival)

- ckBTC minter

- SNS swap canister


We hope that these models provide you with real-life examples to draw from and help you create your own canister models. Additionally we’re sharing a companion in-depth technical tutorial to guide you through this process. The tutorial provides a general strategy of how to model the idiosyncrasies of canisters in TLA+.

Since TLA+ is a general modeling language and isn’t specific to canisters, we have also applied it to parts of the underlying Internet Computer stack. For example, TLA+ helped ensure that the Internet Computer could smoothly migrate the Internet Identity canister. TLA+ first detected corner cases in an early version of the migration design, which could have rendered Internet Identity client canisters unable to cleanly upgrade, and later helped verify the fixes. The repository also includes models of:

- Connection establishment subprotocol for the people parties dapp.

- The Internet Computer consensus algorithm’s safety properties.

- The Internet Identity migration procedure.

- The subnet splitting procedure.


That’s it! We hope you find these resources useful. We look forward to seeing new TLA+ models for community-created canisters and dapps. If you create some, be sure to let the wider ICP community know in the developer forum. Next up, we will soon start working on some tooling to link the TLA+ models to actual Rust code, to address the problem of models and the code diverging as code is modified over time. Of course, these tools will also be open sourced as soon as they are production-ready, so stay tuned!

Get the open-source code for TLA+ models [here](https://github.com/dfinity/tla-models).

Check out the technical tutorial [here](https://mynosefroze.com/blog/2023-08-09-tla_for_canisters).

Learn more about the Internet Computer: internetcomputer.org
Follow the tech on Twitter: @DFINITYDev

Start building on the Internet Computer: [Developer Docs](https://internetcomputer.org/docs/current/home).
