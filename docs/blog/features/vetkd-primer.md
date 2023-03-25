# VETKD Primer

**VETKD** is a feature in ongoing development on the Internet Computer. It stands for ‘verifiably encrypted threshold key derivation’ and we read it as ‘vet-kay-dee.’ One thing less discussed about the VETKD feature is how we got here in terms of cryptography. The goal of this post is to lay some crypto background so that you can better understand the VETKD talks, paper, and future posts. Let’s start at the start. 

## Crypto primitives
In cryptography, a ‘primitive’ is a kind of foundational building block that can be used solely for its given functionality, or to build other, more complex, cryptographic tools and protocols. Block ciphers, hash functions, signature schemes, encryption schemes… are all examples of primitives. VETKD is a new primitive that we are introducing. VETKD extends an earlier primitive called identity based encryption, which itself is an extension of public key encryption.

## Identity based encryption (IBE)
As many things in cryptography, IBE was introduced by Adi Shamir [Shamir84]. Providing a concrete instantiation remained an open problem from 1984 to 2001, when two were proposed, based on differnet hard problems. Here we will focus on the IBE introduced by Dan Boneh and Matthew Franklin which we will refer to as [BF01].￼

![BF IBE](../_assets/BF01.png)

The standard practice in public key cryptography is to generate a secret key, and from that, derive a public key. This gives little control over how the public key ‘looks’ and results in us needing to rely on a public key infrastructure (PKI) to manage mappings between users and their public keys. This can get complicated very quickly (have you ever tried to send an encrypted email?) and discourages use of crypto in practical applications.

IBE turns the problem around. It allows to take an arbitrary string as the public key (say “alice@email.com” or “@alicetweets”) and derive the secret key from that.

To see how an IBE scheme can work, let's consider the following scenario. Suppose Alice wants to encrypt a message to Bob using $\mathit{id_{bob}}$. The typical scenario requires that there is a trusted Key Deriver (KD), and runs as follows:

* KD runs the IBE key generation algorithm to generate a master (public and private) key pair ($\mathit{msk, mpk}$).
* Alice runs the IBE encryption algorithm to encrypt a message to Bob using $\mathit{id_{bob}}$ and KD’s $\mathit{mpk}$ and sends the resulting ciphertext to Bob.
* Bob authenticates $\mathit{id_{bob}}$ to KD and requests a corresponding decryption (private) key ($\mathit{sk_{bob}}$). 
* KD derives $\mathit{sk_{bob}}$ from $\mathit{id_{bob}}$ using $\mathit{msk}$ and then sends it to Bob.
* Bob uses $\mathit{sk_{bob}}$ and $\mathit{id_{bob}}$ to decrypt the ciphertext from Alice to retrieve the message.

![IBE Example](../_assets/ibe.png)

There is a crucial point to note about this type of IBE scheme; A central authority derives (decryption) keys. As we find ourselves in the blockchain world, naturally we are not keen to work with a trusted third party, so one core goal is to decentralise the key derivation procedure of IBE.

## VETKD
Considering that blockchains are very public places where transparency has been a crucial factor in gaining integrity and availability, it has not immediately obvious how one would achieve confidentiality or privacy in a non-competing way. This is the mission of VETKD.

### The threshold setting
Note that we care most about the secret *key derivation* here as that is the most sensitive part which we want to protect from one central (potentially untrusted, unauthorised, or compromised) party, and hence the **KD** in VETKD. To deal with the centralisation point, we need to move into the distributed setting.  Assuming there is no one trusted party, we distribute trust amongst multiple parties, and require that some *threshold* of them collaborate on shares of the master secret key to derive decryption keys.

How do parties **get shares** of the master secret key? This is done by leveraging a distributed key generation (DKG) protocol, where a threshold of honest parties (or nodes) work together to obtain a set of master key shares. Assuming no collusion between nodes, at no point does any one node hold the full private key.
Click around to learn more about [threshold cryptography]( https://en.wikipedia.org/wiki/Threshold_cryptosystem), [DKG](https://en.wikipedia.org/wiki/Distributed_key_generation) and chapter 22 in the [Boneh Shoup book](http://toc.cryptobook.us/).

It’s clear from above that we don't want a centralised key derivation process and this is why we need the **T** for the KD process, but what about **V** and **E**? Perhaps this is best highlighted by a scenario.

### Syntax
Suppose Alice wants to send an encrypted message (across a public blockchain) to Bob. We know that key management is hard, especially in the Web3 setting, so it’s desirable to be able to *derive keys on demand*. The scenario runs as follows:

* Nodes in the network participate in the $\mathsf{DKG protocol}$ to obtain shares of a master secret key ($\mathit{msk}$) and a master public key ($\mathit{mpk}$). This results in each node $i$ holding key shares $(\mathit{msk_i, mpk_i})$.
* Alice encrypts a message under Bob's identity $\mathit{id_{bob}}$ and the master public key $\mathit{mpk}$ and sends the resulting ciphertext to Bob.
* Bob wants to decrypt and authenticates $\mathit{id_{bob}}$ to the IC and requests to derive a decryption key. Stop! 

Note that if we continue in this scenario, the nodes will derive a decryption key and send the shares to Bob.. but, in a public network, those shares can be seen and can be combined by an observer. We require that derived key shares are encrypted for transport so that any observer or malicious nodes cannot combine them to obtain $\mathit{sk_{bob}}$. So, let’s continue.

* Bob wants to decrypt and authenticates $\mathit{id_{bob}}$ to the IC. He uses a transport key generation algorithm $\mathsf{TKG}$ to generate and send a transport public key $\mathit{tpk}$ and requests to derive a decryption key. By sending $\mathit{tpk}$ Bob gives the nodes a way to encrypt their responses to him.
* If Bob’s authentication to $\mathit{id_{bob}}$ passes (likely performed by a dapp), nodes in the network use an $\mathsf{EKDerive}$ algorithm derive decryption key shares using $\mathit{msk}$ and $\mathit{id_{bob}}$ and encrypt them under $\mathit{tpk_{bob}}$. Note, this is the **E** requirement in VETKD.

In a threshold system, sufficiently many key shares are required to produce a valid key. In this case it is useful to know when or if we have sufficiently many valid key shares so that the process can stop.

* Anyone can use an $\mathsf{EKSVerify}$ algorithm to verify that the encrypted keys shares do indeed contain a legitimate decryption key share, and thus can know when 'enough' valid shares exist. This explains the **V** requirement in VETKD.
* Nodes can also combine encrypted shares to produce the full encrypted derived key $\mathit{ek}$ using a $\mathsf{Combine}$ algorithm. 
* An $\mathsf{EKVerify}$ algorithm allows anyone to verify that $\mathit{ek}$ does indeed contain a legitimate derived key for $\mathit{id_{bob}}$ under $\mathit{mpk}$ encrypted under $\mathit{tpk_{bob}}$. 
* Finally, a recovery algorithm $\mathsf{Recover}$ enables Bob to decrypt the derived key corresponding to $\mathit{id_{bob}}$ under $\mathit{msk}$ using Bob’s TSK.
* Bob can now decrypt.

This picture is taken directly from the paper, where you can read the full scenario.
![VETKD Example](../_assets/vetkdscene.png)

All algorithms mentioned ($\mathsf{DKG, TKG, EKDerive, EKSVerify, Combine, EKVerify, Recover}$) form the *syntax* that describes the VETKD primitive. To describe a primitive fully, it's needed also to note the correctness (a description of the primitive's intended behavior), security (under what kinds of attacks from which kinds of adversaries will the primitive remain secure), and a construction (a description of how we can construct a protocol that captures the desired syntax, correctness and security).

### Construction
We see now what the aim is for VETKD, and how it can be described. The next natural question is to ask how we can build such a primitive. Which building blocks do we need? 

Well, at a first glance, we could guess that we will need a distributed key generation scheme to generate master secret key shares among the nodes. We could also guess that we'll need a public key encryption scheme to encrypt derived key shares under the transport key of the user. The main question that remains is how to derive decryption keys.  

Crucially, An observation buried in [BF01] gives us the answer. Moni Naor noted that an IBE scheme can be directly converted into a signature scheme. Considering the key derivation of Boneh Franklin IBE specifically, the resulting signature scheme happens to be BLS.

### BLS signatures
Digital signatures are used everywhere in cryptography, and in the blockchain world, to attest to the authenticity of a message, transaction, or other pieces of information. As they are so prevalent, it’s really worth spending time getting to know them. You can get a high level view on wikipedia ([Digital Signatures](https://en.wikipedia.org/wiki/Digital_signature) and [BLS](https://en.wikipedia.org/wiki/BLS_digital_signature)), and dive into the [Boneh Shoup book](http://toc.cryptobook.us/) when you want more formal details.

BLS signatures are a particular type of digital signature introduced in by Dan Boneh, Ben Lynn, and Hovav Shacham in 2001. 

![BLS Signatures Abstract](../_assets/BLS01.png)

The main feature of BLS signatures is that they’re very short, fast to compute, aggregatable, and easy to port to the distributed setting (relative to other signature schemes at least..). This makes them a great candidate signature scheme for the blockchain setting. 
As with any signature scheme, BLS comprises three algorithms; a (potentially distributed) key generation algorithm ((D)KG), a signing algorithm (Sign) and a verification algorithm (Verify). In the threshold setting, this is extended to include a fourth combination algorithm (Combine).
Threshold BLS signatures are used a lot on the Internet Computer, so let’s used that as the motivating example for the scenario. Suppose nodes in a subnet want to convince Alice that a particular message is being sent from the IC. At a very high level, the scenario will run as follows:
* Nodes in the network participate in the DKG process and obtain (private) key shares.
* Each node computes a signature share on a message $m$ using its share of the signing key. 
* Nodes participate in a $\mathsf{Combine}$ process to combine signature shares and produce a single signature which is then sent to Alice.
* Alice uses a verification algorithm $\mathsf{Verify}$ to check whether the signature sent from the nodes verifies under the public key of the Internet Computer.

We noted above that IBE implies signatures. From the [BF01] paper the intuitive construction is to set the private key for the signature scheme to be the master key of the IBE. Then set the public key for the signature scheme to be the system parameters of the IBE. Then the signature on a message M is the IBE Decryption key for ID = M. In the VETKD scenario, the master key of the IBE scheme is a BLS signature key secret shared over the nodes. The derivation identity will be threshold signed, resulting in a signature that can act as a symmetric encryption key, but also as a Boneh Franklin decryption key.

### Putting everything together
VETKD is a new primitive that extends identity based encryption in a decentralised setting. The main tools needed to build VETKD are a secret sharing scheme (we use Shamir), a PKE (we use ElGamal), and threshold BLS signatures.
A construction that gives the basic functionality works as follows: 

* Master key - BLS signing key, Shamir secret shared over nodes
* Transport keys - ElGamal key pair
* Encrypted key share - BLS signature on the identity, encrypted under ElGamal public key
* Combined encrypted key - A threshold of valid encrypted key shares are combined (in the blockchain scenario likely by a blockmaker) to give the encrypted derived key
* Decryption key - ElGamal decryption of combined encrypted derived key

## Remarks
This page contains a high level view and description of VETKD and its building blocks. The goal of this page is to build intuition for developers building on the IC, who are interested to know more about the technical choices, but who may lack the cryptographic background necessary to read research papers (for now). 
It also shows one possible way of building VETKD, there are others, some with fancy features, that are described more in the paper. There are many use cases and motivations for building VETKD, these are discussed in [the video](https://youtu.be/baM6jHnmMq8) and can be written up if you like. Note that this page is hosted onchain.

## References
* [BS23](http://toc.cryptobook.us/) - The Boneh Shoup Book.
* [BF01](https://crypto.stanford.edu/~dabo/papers/bfibe.pdf) - The IBE paper.
* [BLS01](https://www.iacr.org/archive/asiacrypt2001/22480516.pdf) - The BLS paper.
* [VETKD Youtube](https://youtu.be/baM6jHnmMq8) - The VETKD Community Conversation intro.

## Participate
There is only so much we can do in terms of producing nice crypto tools. It’s up to you to pick them up and use them to address real world privacy issues faced in Web3. The best way to succeed in this industry is to engage. So! Let us know what you’re building and if you think VETKD could be useful for your project. We’re happy to hear feedback and to explain more things if you need them. Currently the easiest way to engage is to join the discussion on the [forum](https://forum.dfinity.org/t/threshold-key-derivation-privacy-on-the-ic/16560). Also, like, share, subscribe, and all the rest.