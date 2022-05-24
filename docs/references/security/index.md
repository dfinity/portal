# Introduction

This document provides security best practices for developing Rust canisters and web apps served by canisters on the Internet Computer. These best practices are mostly inspired by issues found in security reviews.

We would like to advertise these best practices to developers so that potential issues can be addressed early during the development of new dapps, and not only in the end when (if at all) a security review is done. Ideally, this will make the development of secure dapps more efficient.

Some excellent canister best practices linked here are from [Effective Rust Canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html) and [How to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister). The relevant sections are linked in the individual best practices.

## Best Practices Overview

We provide the following security best practices in the subsequent pages:

-   [General Security Best Practices](./general-security-best-practices.md)

-   [Web App Specific Security Best Practices](./web-app-development-security-best-practices.md),

-   [Rust Canister Development Security Best Practices](./rust-canister-development-security-best-practices.md)

## Target Audience

This document was initially intended for internal use at DFINITY. However, we now publish this to the community so every developer can benefit. The target audience are any developers working on canisters or web apps for the Internet Computer. This is also of interest anyone doing reviews of such code.

## Disclaimers and Limitations

We provide a collection of best practices that may grow over time. While we think this is useful to improve security of dapps on the Internet Computer, we’d like to point out that such a list will never be complete and will never cover all potential security concerns. For example, there will always be attack vectors very specific to a dapps use cases that cannot be covered by general best practices. Thus, following the best practices can complement, but not replace security reviews. Especially for security critical dapps we recommend performing security reviews/audits. Furthermore, please not that the best practices are currently not ordered according to risk or priority.

Currently, the canister best practices focus on Rust. We will work towards including best practices specific to Motoko as well.
