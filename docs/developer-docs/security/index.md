# Security best practices

## Overview

This document provides security best practices for developing canisters and web apps served by canisters on the Internet Computer. These best practices are mostly inspired by issues found in security reviews.

The goal of these best practices is to enable developers to identify and address potential issues early during development of new dapps, and not only in the end when (if at all) a security review is done. Ideally, this will make the development of secure dapps more efficient.

Some excellent canister best practices linked here are from [effective Rust canisters](https://mmapped.blog/posts/01-effective-rust-canisters.html) and [how to audit an Internet Computer canister](https://www.joachim-breitner.de/blog/788-How_to_audit_an_Internet_Computer_canister). The relevant sections are linked in the individual best practices.

## Best Practices Overview

The following security best practices are provided in the subsequent pages:

-   [General security best practices](./general-security-best-practices.md).

-   [Web app specific security best practices](./web-app-development-security-best-practices.md).

-   [Canister development security best practices](./rust-canister-development-security-best-practices.md).

## Target Audience

This document was initially intended for internal use at DFINITY. However, it has now been published to the community so every developer can benefit. The target audience are any developers working on canisters or web apps for the Internet Computer. This is also of interest to anyone doing reviews of such code.

## Disclaimers and Limitations

The collection of best practices may grow over time. While it is useful to improve security of dapps on the Internet Computer, such a list will never be complete and will never cover all potential security concerns. For example, there will always be attack vectors very specific to a dapps use cases that cannot be covered by general best practices. Thus, following the best practices can complement, but not replace security reviews. Especially for security critical dapps it is recommended to perform security reviews/audits. Furthermore, please note that the best practices are currently not ordered according to risk or priority.
