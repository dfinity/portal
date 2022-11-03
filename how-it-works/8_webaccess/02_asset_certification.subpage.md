---
title: Asset certification
abstract:
shareImage: /img/how-it-works/response-certification.600.jpg
slug: asset-certification
---

![](/img/how-it-works/response-certification.600x300.jpg)

# Asset certification

A user interacting with the Internet Computer needs to be able to confirm that the responses are actually coming from the Internet Computer and that these responses are correct.

Traditionally, on the Internet, this problem is solved using public key cryptography. The server running the service has a secret key and uses that to sign all its responses. A user can then verify the signature on the response using the server’s public key.

On the Internet Computer, things are at a high-level very similar, but slightly different. Canister smart contracts do not just run on a single server, but on a collection of nodes, on a subnet. Single nodes within such a subnet cannot sign a response on their own. Only the subnet as a whole can create the signature as long as a supermajority of the nodes agree.

Therefore, responses from the Internet Computer are accompanied by a certificate proving the authenticity of the response. The certificate is signed by the subnet.

[Certified Variables](/how-it-works/response-certification/)
