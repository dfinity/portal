---
title: Asset certification
abstract:
shareImage: /img/how-it-works/response-certification.600.jpg
slug: asset-certification
---

![](/img/how-it-works/response-certification.600x300.jpg)

# Asset certification

A user interacting with the Internet Computer needs to be able to confirm that the responses they receive are actually coming from the Internet Computer and have not been tampered with. 

Traditionally, on the Internet, a web browser can verify content received from a server using the public key infrastructure and the TLS protocol. With the public key infrastructure, the server has a public key that is certified by a trusted authority like Verisign. When the web browser initiates communication with the server, the server sends its public key and its certificate. The server signs its further messages with its private key. The web browser verifies the server’s signature on the messages using the server’s public key. This public key infrastructure plays a crucial role in securing our traditional web infrastructure. 

Unfortunately, the TLS protocol cannot be used to verify content received from blockchains in general. For the TLS protocol to work, the server should maintain a secret key. As any node can join and leave a blockchain network, it’s hard to maintain a secret key that is known only to the nodes in the blockchain network. Therefore, blockchains use a different mechanism. To verify the data received from a blockchain, one needs to store/maintain some state related to the blockchain. For example, to verify that a transaction is part of the Bitcoin blockchain, one needs to store the list of all Bitcoin headers and need to verify a Merkle proof of the transaction. 

Web browsers however do not maintain the state of any blockchain. This means if a blockchain is used to deliver HTML, CSS and Javascript to the browser, it has no way of verifying the authenticity of the delivered content. Blockchain apps (such as NFT exchanges, DeFi exchanges, blockchain games, etc.) built on other blockchains circumvent this restriction using the following mechanisms. 
* The apps host their frontend on cloud instead of blockchain. In this case, the traditional web infrastructure is used to deliver the HTML, CSS and Javascript pages to the web browser. 
* For apps such as wallets, one needs to install a plugin in their browser. 
* The apps interact with third-party APIs such as Tatum and OpenNode instead of directly interacting with the blockchain. These third-party tools are hosted on cloud and act as a middlemen between web browsers and the blockchain. In this case, the third-party APIs maintain the blockchain state, verify messages received from blockchain, and supply the verified content to the blockchain apps. 
In summary, blockchain apps generally choose a hybrid architecture when building on other blockchains. In other words, part of the app is hosted on a regular cloud service. 

The Internet Computer is the only blockchain that solves this problem. In a nutshell, just like a web server maintains a public key-secret key pair, the Internet Computer blockchain as a whole maintains a public key-secret key pair. However, each node on the internet computer shares only a piece of the secret key. As a result, each node is incapable of signing a message by itself. But if at least 2/3rd of the nodes of a subnet agree on a message, they together can combine their secret key pieces to sign the message. The signed message can be verified easily using the public key. 

In other words, whenever a canister sends back a response, it includes a certificate (signature) to prove its authenticity. The client can then verify the certificate using the Internet Computer’s public key before it processes the response. If the verification succeeds, it means that at least 2/3rd of the blockchain nodes running the canister agreed to deliver that content. 

The technology used by the Internet Computer to generate and maintain the secret key shares is called [Chain Key Cryptography](https://internetcomputer.org/how-it-works/chain-key-technology/). This technology alone puts every other blockchain in the world miles behind the Internet Computer.

The HTTP gateway protocol is used to verify the certificates received from the Internet Computer. A HTTP Gateway is a software that sits in between the client and the Internet Computer. The HTTP Gateway stores the public key of the Internet Computer and verifies the messages received from the Internet Computer before forwarding it to the client. 

The HTTP Gateway can be implemented in many ways. One example of such an application is the service worker, which enables users to verify the authenticity of the IC’s responses directly in the browser. It is also implemented in the boundary node such that clients that do not support the service worker can still access the IC. In the future, the HTTP gateway protocol can be integrated into an IC-native browser or a web-extension.



For more information on certification, check [Certified Variables](/how-it-works/response-certification/).
