---
title: Asset certification
abstract:
shareImage: /img/how-it-works/response-certification.600.jpg
slug: asset-certification
---

![](/img/how-it-works/response-certification.600x300.jpg)

# Asset certification

A user interacting with the Internet Computer needs to be able to confirm that
the responses they receive are actually coming from the Internet Computer and
have not been tampered with.

Traditionally, on the Internet, this problem is solved using public key cryptography.
The server running the service has a secret key and uses that to sign all its
responses. A user can then verify the signature on the response using the
server’s public key.

On the Internet Computer, this is done very similarly using the HTTP gateway
protocol. Whenever a canister sends back a response, it includes a certificate
to prove its authenticity. The client can then verify the signatures before it
processes the response.

The HTTP gateway protocol and verification of the certificate can be implemented
in any application. Currently, it is implemented in the service worker, which is
served with every dapp and enables users to verify the authenticity of the IC’s
responses directly in the browser. It is also implemented in the boundary node
such that clients that do not support the service worker can still access the IC.
In the future, the HTTP gateway protocol can be integrated into a
IC-native browser or a web-extension.


For more information on certification, check [Certified Variables](/how-it-works/response-certification/).

[Asset Certification Wiki Article](https://wiki.internetcomputer.org/wiki/HTTP_asset_certification)

[Rust Canister Development Security Best Practices](https://internetcomputer.org/docs/current/references/security/rust-canister-development-security-best-practices#asset-certification)