# VETKD Primer

One thing less discussed about the VETKD feature is how we got here in terms of cryptography. The goal of this post is to lay some crypto background so that you can better understand the VETKD talks, paper, and future posts. Let’s start at the start. 

**Crypto primitives.** In cryptography, a ‘primitive’ is a kind of foundational building block that can be used solely for its given functionality, or to build other more complex cryptographic tools and protocols. Block ciphers, hash functions, signature schemes, encryption schemes… are all examples of primitives. VETKD is a new primitive that we are introducing. VETKD extends an earlier primitive called identity based encryption, which itself is an extension of public key encryption.

**Identity based encryption (IBE).** In 2001, Dan Boneh and Matthew Franklin introduced an IBE scheme, which we will refer to as [BF01].

The standard practice in public key cryptography is to generate a secret key, and from that, derive a public key. This gives little control over how the public key ‘looks’ and results in us relying on a public key infrastructure to manage a mapping between users (usernames, email addresses, or other identifiers) and their public keys. This can get complicated very quickly (have you ever tried to send an encrypted email?) and discourages use of crypto tools in practical applications.
IBE turns the problem around. It allows to take an arbitrary string as the public key (say “alice@gmail.com” or “@alicetweets”) and derive the secret key from that. 
On a high level, the protocol is as follows:

