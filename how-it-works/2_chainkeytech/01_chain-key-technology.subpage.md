---
title: Chain-Key Cryptography
abstract: 
shareImage: /img/how-it-works/chain-key-technology.600.jpg
slug: chain-key-technology
---

# Chain-Key Cryptography

A *digital signature scheme* is a very traditional type of public-key cryptosystem, in which a secret key (held only by the signer) is used to generate a digital signature on a message, and a public key (available to everyone) may be used to efficiently verify a digital signature on a message. The basic security property achieved by such a scheme is that a valid signature on a message cannot be created without explicitly invoking the signing algorithm with the corresponding secret key.

A *threshold signature scheme* is a digital signature scheme where the secret signing key is never stored in one location (which would become a single point of failure). Rather, the secret key is effectively split up into *secret shares*, and each secret share is stored on a different machine. To sign a message, these machines must agree to sign the message and coordinate with one another to generate a digital signature in a distributed fashion (importantly, without ever reconstructing the secret signing key in one location).

While threshold signature schemes is a technology have been around for a long time, the IC is the first blockchain to fully integrate this technology in the core of its design. As described above, the technology enables *chain-key cryptography* and all of its benefits (including efficient verification of blockchain outputs, autonomous evolution of the IC topology, a source of unpredictable and unbiasable pseudo-random numbers for canisters). 

The threshold signature scheme implemented by the IC is a threshold version of the well-known [BLS signature scheme](https://en.wikipedia.org/wiki/BLS_digital_signature).  One reason for using the BLS signature scheme is that it is the only one that yields a threshold signing protocol that is very simple and efficient. Indeed, a machine holding a share of the secret signing key can very easily generate a share of a signature on a message, and these signature shares can be combined to form a BLS signature on a message – no further interaction between these machines is required. 

Another reason for using the BLS signature scheme is that signatures are *unique*, meaning that for a given public key and message, there is only one valid signature on that message. This unique-signature property is essential for the application to generating unpredictable and unbiased pseudo-random numbers for smart contracts: after a smart contract requests a pseudo-random number (and not before!), a signature on a special message is generated, and this signature is passed through a hash function to derive a seed from which the required pseudo-random numbers are generated. By the security property of the signature scheme, neither this seed nor the derived pseudo-random numbers can be predicted or biased.

While signing with threshold BLS is quite straightforward, designing a secure, decentralized protocol for generating and distribution the shares of the secret signing key  – that is, a DKG, or Distributed Key Generation protocol – remains a challenge. While there has been quite a bit of research on DKG design, the vast majority of DKG protocols in the literature do not meet the demanding requirements of the Internet Computer, in that they either assume a *synchronous network* (meaning that the protocols will fail or become insecure if messages are unexpectedly delayed) or provide *no robustness* (meaning that the ability to produce signatures is completely lost if a *single* node should crash) or *both*. Neither of these assumptions are acceptable on the IC: security and liveness must hold even an an *asynchronous network* with many faulty nodes.

DFINITY has designed, analyzed, and implemented [a new DKG protocol](https://eprint.iacr.org/2021/339) that works over an *asynchronous network* and is quite *robust* (it will still produce succeed if up to a third of the nodes in a subnet are crashed or corrupt) while still delivering acceptable performance. In addition to generating a new key, this protocol can also be used to reshare an existing key. This functionality is essential to enable autonomous evolution of the IC topology as subnet membership changes over time.


[Chain Key Cryptography: The Scientific Breakthrough Behind the Internet Computer](https://medium.com/dfinity/chain-key-technology-one-public-key-for-the-internet-computer-6a3644901e28)

[Integrating The Internet Computer and Bitcoin Networks](https://www.youtube.com/watch?v=TtVo3krjARI)

[Video on non-interactive distributed key generation](https://www.youtube.com/watch?v=gKUi-2T7tdc)

[Applied Crypto: Introducing Noninteractive Distributed Key Generation](https://medium.com/dfinity/applied-crypto-one-public-key-for-the-internet-computer-ni-dkg-4af800db869d)

[NIDKG White Paper](https://eprint.iacr.org/2021/339)

[![Watch youtube video](https://i.ytimg.com/vi/vUcDRFC09J0/maxresdefault.jpg)](https://www.youtube.com/watch?v=vUcDRFC09J0)

