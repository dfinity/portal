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
to prove its authenticity. However, as canisters do not just run on a single
server, but on an entire subnet (collection of nodes), this certificate is signed by
that subnet. The client can then verify the signature using the subnet's public
key before it processes the response.

The HTTP gateway protocol and verification of the certificate can be implemented
in any application. One example of such an application is the service worker,
which enables users to verify the authenticity of the IC’s responses directly in
the browser. It is also implemented in the boundary node such that clients that
do not support the service worker can still access the IC. In the future, the
HTTP gateway protocol can be integrated into an IC-native browser or a
web-extension.


To use asset certification in a dapp as explained here, developers can rely on
[Certified Variables](/how-it-works/response-certification/).
