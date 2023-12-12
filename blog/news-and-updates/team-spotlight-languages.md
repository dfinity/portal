---
title: Team spotlight - Languages
description:  In this issue, we're excited to dive into all things Motoko by sitting down with the DFINITY languages team, who are the primary contributors to the development of Motoko.
tags: [Team spotlight]
image: /img/blog/dev-update-blog-languages.jpg
---

![Languages team spotlight](../../static/img/blog/dev-update-blog-languages.jpg)

**Hello developers and welcome to this edition of team spotlight! In this issue, we're excited to dive into all things Motoko by sitting down with the DFINITY languages team, who are the primary contributors to the development of Motoko. Motoko is a programming language developers specifically for deploying canisters on ICP. It supports the unique features and workflows of ICP, while providing a syntax that is approachable for entry level developers. Let's get started!**

**What is the purpose of the Languages team?** 

*The Languages team is primarily responsible for the development of the Motoko programming language. In addition, the team builds and maintains several tools that help developers write Motoko programs and build and interact with their canisters on ICP. Some examples include the Motoko VSCode extension, Prettier plugin, ic-wasm, ic-repl, and the canister profiling suite.*
 
**What is the composition of the Languages team?**

*The Languages team is composed of 5 engineers and researchers from various technical backgrounds, ranging from low-level compiler experts, to language designers, to library and tools experts.*

**The Languages team is responsible for creating and developing Motoko. How would you describe Motoko as a programming language? Is there a language it is similar to?**

*In a nut-shell, Motoko is an actor-oriented, eager, impure functional language with strong static typing, subtyping and generics and automatic memory management. Actor orientation is a perfect fit for the ICP’s isolated canisters, communicating by shared-nothing, asynchronous message passing. Its correctness-oriented support for statically checked pattern matching on values is familiar from languages in the ML family (Haskell, OCaml and SML). Subtyping is usually associated with object-oriented languages such as C# and Java as well as the module system of SML. Most mainstream languages adopt nominal typing, which  is hard to maintain across distributed actors. Instead, Motoko, like TypeScript, uses structural typing, with the notable difference that the Motoko type system offers the standard safety guarantees of types, which TypeScript does not.*

*Andreas Rossberg wrote a very nice article on the design of Motoko [here.](https://stackoverflow.blog/2020/08/24/motoko-the-language-that-turns-the-web-into-a-computer)*

**What kind of developer is Motoko aimed at?**

*If you’ve used a high-level programming language such as TypeScript, Java, C#, or Python, you’ll see a lot of familiar syntax in Motoko. The benefit of using Motoko over these languages is the modern algebraic type system, which is important for writing secure canister smart contracts.*

*For those trying to decide between using Motoko and Rust for their next project, the best reason to use Motoko is its excellent support for ICP features such as stable memory, native Candid encoding/decoding, and calling other canisters. Motoko is also a lot more approachable for beginners, and all third-party libraries work on the IC (compared to a small fraction of the Rust crate ecosystem). When in doubt, try Motoko first!*

**What are some of the challenges that the team faces when developing a programming language?**

*It’s no longer enough to just design the language and implement a compiler. Nowadays, developers expect IDE support, a rich standard library, package manager and package ecosystem, debuggers, profilers, code formatters, documentation tools, testing frameworks, you name it! Actually gaining adoption requires patience and hard work on all these fronts.*

**What is something important about Motoko that new developers should know when they start learning the language?**

*We value your feedback! If you have a bug report or feature request, please feel free to [open a GitHub issue](https://github.com/dfinity/motoko/issues/new) or contact us on the [DFINITY developer forum](https://forum.dfinity.org/). You can also ask for help on the [ICP developer Discord](https://discord.com/invite/rB96MMn) or even use the AI chatbot on [internetcomputer.org](https://internetcomputer.org/) to speed up the learning process.*

**Since the team is known as the Languages team, other than Motoko, what else does the team work on or contribute to?**

*A bunch! The team also develops tools that help you benchmark canister performance – you can find that repo [here](https://github.com/dfinity/canister-profiling). We also develop tools like [ic-repl](https://github.com/dfinity/ic-repl) which is sort of like a simple IDL for sending commands to your canister. It’s neat, give it a go!*

**How does the Languages team work with other teams?**

*The Languages team is a bit different from other teams at DFINITY since we do our work mostly out in the open, on GitHub. When we do work with other teams, it is often to distill requirements from some hot new protocol feature and flesh out the design. That process can take many iterations to get right, as there could be subtle nuances that aren’t obvious during the first pass.*

**Speaking of new protocol features, is the languages team currently working on a project that implements a new feature? What's the primary focus of the team currently?**

*The Languages team is currently focused on making the need for serialization during upgrades mostly obsolete. The goal is to make the process of upgrading a canister completely seamless, which would result in “true” orthogonal persistence becoming a reality!*

**What are the primary components of this project?**

*The compiler and Motoko runtime system, as well as the underlying replica runtime system.*

**What are the primary benefits of this project?**

*The primary benefit is never needing to think about serialization to and deserialization from stable memory for most ordinary data structures – data can essentially live forever and continue to be represented in the same way after an upgrade as it was before. Stable memory could then be used for more specialized scenarios where a large amount of storage is necessary.*

**When can developers expect the project to be completed?**

*The project will take several months to complete; however, you can follow our progress on GitHub and get regular updates through our monthly Motoko Developer Working Group meetings as well as Global R&D.*

**Where should developers look for the latest Motoko updates?**

*If you are not already engaged with other ICP developers in the [forum](https://forum.dfinity.org/), this would be a good time to sign up. We often provide updates through the forum and the dev blog. We also do all of our work out in the open, so GitHub is a great place to keep up with the latest developments. Furthermore, you can attend the Motoko Working Group which takes place the second Thursday of every month at 10AM PST.*

**What is one feature or aspect of Motoko that the team is the most proud of?****

*I think one feature that is largely taken for granted but is actually quite novel is the seamless integration of Candid and Motoko. Motoko users never have to generate stubs or implement skeletons to consume or produce a service and Candid interface. All of this is done behind the scenes by the compiler.*

*Another feature which is unique is the support for static (and soon dynamic) checking of stable variable compatibility, giving users some degree of confidence that upgrades will not lose data.*

*We are also very proud of the new incremental GC which is our first GC that actually meets the novel requirements of the IC and, moreover, is able to scale beyond 32-bit main memory to 64-bit main memory, when that time comes.*

**To wrap things up, what makes the Languages team unique compared to some of the other teams at DFINITY?**

*The fact that we implement against the public spec, like external teams would need to, not to the replica implementation.*

Thank you to the Languages team for sitting down with us today and providing such educational and insightful information! I hope everyone reading has enjoyed this interview as much as we have; it was great to learn so much about Motoko!

Until next time!

-DFINITY

