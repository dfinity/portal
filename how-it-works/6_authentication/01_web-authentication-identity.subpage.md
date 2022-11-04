---
title: "Internet Identity: Anonymizing Blockchain Authentication System"
abstract: 
shareImage: /img/how-it-works/web-authentication-identity.600.jpg
slug: web-authentication-identity
---

# Internet Identity

In order to access and interact with applications running on the Internet Computer, it is often necessary for users to authenticate. One of the most commonly used methods to authenticate on the Internet Computer is Internet Identity.

[Internet Identity](https://identity.ic0.app/) is a blockchain authentication framework supported by the Internet Computer. Users begin the process by creating identity "anchors" to which they assign compatible cryptographically enabled devices, such as the fingerprint sensor on a laptop, the face ID system on a phone, or a portable HSM, such as a YubiKey or Ledger wallet. Thereafter, they can signup and authenticate to dapps running on the Internet Computer using any of the devices they have assigned to their anchor.

This provides a high level of convenience, allowing users to authenticate to dapps with a very low level of friction, yet, while also benefiting from a high level of security and without the need to directly manage or handle cryptographic key material themselves. The system offers some degree of privacy for users, by ensuring that whenever an anchor is used to interact with a dapp, the dapp sees a specially generated pseudonym for that dapp, which prevents the dapp from tracking users across the various dapps they use. 

A user can register as many identity anchors as they want for redundancy, or different purposes. For example, a user may create an anchor for use with SocialFi or GameFi, and another for use with pure DeFi. They may only feel comfortable adding facial recognition to their SocialFi and GameFi anchor, say, and only use more secure portable HSM devices like YubiKeys and Ledger wallets with their pure DeFi anchor.

Unlike most authentication methods, users are not required to set and manage passwords or provide any personal identifying information to dapps or to the Internet Identity.

[Internet Identity App](https://identity.ic0.app/)

[Internet Identity Wiki](https://wiki.internetcomputer.org/wiki/Internet_Computer_wiki#Internet_Identity_Introduction)

[Internet Identity Specification](https://internetcomputer.org/docs/current/references/ii-spec/)

[Open Source - Internet Identity](https://github.com/dfinity/internet-identity)

[Web Authentication and Identity on the Internet Computer](https://medium.com/dfinity/web-authentication-and-identity-on-the-internet-computer-a9bd5754c547)

[Internet Identity: Easy Web3 Authentication](https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7)

[Verifying the Internet Identity Code: A Walkthrough](https://medium.com/dfinity/verifying-the-internet-identity-code-a-walkthrough-c1dd7a53f883)

[IC internals: Internet Identity storage](https://pr-17--infallible-khorana-f0cacc.netlify.app/posts/11-ii-stable-memory.html)

[![Watch youtube video](https://i.ytimg.com/vi/9eUTcCP_ELM/maxresdefault.jpg)](https://www.youtube.com/watch?v=9eUTcCP_ELM)

