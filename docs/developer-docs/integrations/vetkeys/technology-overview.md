# vetKeys: technology overview

## Overview
vetKeys on the Internet Computer allow developers to more easily perform encryption, threshold decryption, and signing when building dapps on the IC. It is powered by a protocol called **vetKey (Verifiably Encrypted Threshold Key Derivation)** that allows to derive decryption keys on demand.

## Key derivation on demand
Blockchains are not known for their privacy capabilities. The goal of vetKeys is to ease the burden of using security and privacy tools on the Internet Computer. 
Encrypting information locally on a device and storing it on a blockchain is easy as the secret key material always remains on the local device and is not exposed.
The difficulty arises when a user may want to retrieve the encrypted information from a different device, or share with a different user as there is no straightforward way to pass secret key material across public channels in a privacy-friendly way. 

vetKeys leverages the fact that BLS signatures, the native signature scheme on the IC, are unique, and therefore ideally suited (under the right conditions) to be used as cryptographic decryption keys. As BLS signatures are computed in a distributed way on the IC, there is no central authority deriving keys for users. Furthermore, following standard practices in [IBE schemes](https://internetcomputer.org/blog/features/vetkey-primer#identity-based-encryption-ibe) the derived key can be transported to the user in an encrypted manner. As such, nodes and the network never have access to a user’s keys.

The availability of vetKeys allows for a series of applications including but not limited to those covered in the following sections.

## End-to-end encryption

The main use case is to enable a blockchain to host threshold-encrypted data in a way that scales to millions of users and billions of secrets, using just a single threshold-shared secret key. BLS signatures are unique, making them immediately useful as symmetric keys.

Think for example of a secure file storage dapp: a user could use the BLS signature on their identity as the root secret under which they encrypt their files before storing them in the dapp.
The dapp enforces that only the authenticated user is allowed to recover the root key, and hence decrypt the files.
The nodes in the blockchain assist a user in recovering their root key, but never see that key or the content of the files.

## More sophisticated access policies can also be expressed
In a secure messaging dapp, the conversation between two users can be encrypted using the BLS signature on their pair of identities, to which only those users are given access by the dapp.
A secure decentralized social network could let users encrypt posts using a key that is related to the post, e.g., the BLS signature on a unique identifier for the post.
The SocialFi dapp then ensures that only the author and the users that the post is shared with get access to that key.

## Blockchain-issued signatures and cross-chain bridges
The key derivation of an IBE automatically yields a signature scheme, the resulting decryption keys can also be used as signatures issued by the blockchain.
This is especially useful for blockchains that don't have a built-in certification feature enabling dapps to sign statements.
It can also be used to efficiently bridge blockchains, e.g., to swap assets in DeFi application: a dapp on a first blockchain can verify signed statements issued by a second blockchain, without having to implement a complete light client of that second chain.

## Verifiable randomness
Because of their uniqueness, BLS signatures can also act as a verifiable random function (VRF). 
Trusted, verifiable randomness is important for applications such as trustless online lotteries and casinos, fair decentralized games (GameFi), and selecting random features for non-fungible tokens (NFTs). 

## "Dead man's switch"
Journalists or whistleblowers could ensure that compromising information in their possession is automatically published if they were to become incapacitated. 
They can store the information in a dapp, encrypted under a BLS signature that the dapp automatically and publicly recovers when a certain amount of time passes after it has received an authenticated ping from its owner.

## Secret-bid auctions and MEV protection
A vetKey-equipped blockchain can also cover use cases where many ciphertexts needs to be decrypted at the same time.
In a secret-bid auction dapp, users can submit bids that are IBE-encrypted under an identifier of the auction, so that at the end of the auction, the dapp can decrypt all bids with a single vetKey evaluation. A similar technique can be used to prevent front-running, also known as miner-extracted value (MEV), on a decentralized exchange (DEX). Users submit their transactions IBE-encrypted under a predictable batch identifier. The DeX orders the transactions in encrypted form and, when all transactions for a particular batch have been ordered, triggers the recovery of the decryption key for that batch and executes the decrypted transactions in the fixed order. Note that all of the symmetric-encryption use cases listed above can be modified to encrypt using an IBE instead of a symmetric-key encryption, thereby eliminating the need to perform a vetKey derivation for encryption. Decryption, of course, still requires a vetKey evaluation.

## Time-lock encryption
Time-lock encryption enables a sender to encrypt a message to the future, ensuring that it will get decrypted at a given time, but no earlier than that time. Existing solutions rely on centralized trusted parties, witness encryption (see next paragraph), or gradual release through puzzle solving. Time-lock encryption can be achieved via IBE by letting a centralized authority release IBE decryption keys corresponding to the current time at regular intervals, and letting the sender IBE-encrypt its message using the desired decryption time as identity.The authority's functionality can be run in a dapp on a vetKey-equipped blockchain, eliminating the need for a trusted central party.

## Witness encryption
A witness encryption scheme for a language (L) with witness relationship (R) lets a sender encrypt a message to an instance (x) in L that can only be decrypted using a witness (w) such that R(x,w). The only current implementations are based on indistinguishability obfuscation, of which few instantiations are known based on well-founded assumptions. Witness encryption is almost trivial to implement on a vetKey-enabled blockchain: anyone can IBE-encrypt their message using the instance x as identity, while a witness-verifying dapp lets anyone who provides a valid witness w for x (or a valid zero-knowledge proof of knowledge of w, if it should remain private) to obtain the decryption key for x. The primitive may sound rather theoretical at first, but it actually covers quite practical use cases as it enables one to encrypt to any verifiable future event, e.g., the price of a stock going above or below a certain level, information escrow, or break-the-glass policies.

## One-time programs
Another cryptographic primitive with few instantiations is one-time programs that can be executed only once on a single input, and that don't leak anything about the program other than the result of the computation. Their only currently known instances rely on trusted hardware or on witness encryption on a blockchain. Given that witness encryption is easy to build on a vetKey-enabled blockchain, it should not come as a surprise that one-time programs are as well. The creator of the program garbles the circuit and IBE-encrypts the input wire keys, using the wire index and the value as the identity. A dapp assists users in recovering the IBE decryption corresponding to their input, making sure that only a single value for each wire is ever recovered.

## Proposed system API
In ongoing development of the vetKeys feature, there is an API descriptions in this [draft MR to extend the Interface Spec](https://github.com/dfinity/interface-spec/pull/158), which contains API descriptions for the two new methods:
* `vetkd_public_key`.
* `vetkd_encrypted_key`.


Below is an example of the proposed API methods:

```
  // Threshold key derivation
  vetkd_public_key : (record {
    canister_id : opt canister_id;
    derivation_path : vec blob;
    key_id : record { curve : vetkd_curve; name : text };
  }) -> (record { public_key : blob; });
  vetkd_encrypted_key : (record {
    public_key_derivation_path : vec blob;
    derivation_id : blob;
    key_id : record { curve : vetkd_curve; name : text };
    encryption_public_key : blob;
  }) -> (record { encrypted_key : blob; });
```

## References
- [Forum post](https://forum.dfinity.org/t/threshold-key-derivation-privacy-on-the-ic/16560).
- [The first Community Conversation](https://youtu.be/baM6jHnmMq8).
- [vetKeys primer to understand the crypto background](https://internetcomputer.org/blog/features/vetkey-primer).
- [Research paper](https://eprint.iacr.org/2023/616.pdf).
