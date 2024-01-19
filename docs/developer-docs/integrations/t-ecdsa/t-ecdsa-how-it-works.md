# Threshold ECDSA: technology overview

## Overview

The threshold ECDSA implementation on ICP features multiple protocols that are crucial for a secure system setup and operation.These protocols go beyond just threshold ECDSA signing, which is the reason for calling this a protocol suite for **chain-key ECDSA signatures**.

-   **Key generation:** Generates a new threshold ECDSA key such that the private key is secret shared over the replicas of this subnet. It is executed on a specified subnet.
-   **XNet key re-sharing:** Re-shares an ECDSA key from a source subnet to a target subnet. This results in the same key being secret shared over the replicas of the target subnet using a different random secret sharing.
-   **Periodic key re-sharing:** Re-shares an ECDSA key within the subnet it is secret shared on. This helps protect against an adaptive attacker that attempts to compromise replicas over time as every key resharing makes the previously-obtained key shares worthless.
-   **Computing pre-signatures, signing:** Compute signatures with the secret-shared private key. A **protocol for computing pre signatures**, i.e., quadruples that are used in the actual signing protocol, is run asynchronously to signing requests to precompute pre-signatures. This precomputation protocol computes the vast majority of the steps of creating threshold ECDSA signatures. A **signing protocol** is triggered by a signing request of a canister. A signing protocol consumes one precomputed quadruple to efficiently compute a threshold ECDSA signature.
-   **Public key retrieval:** Allows for retrieving a public key of a canister, including potential BIP-32-like key derivation based on a canister-provided derivation path.

It is crucial to note that the private key never exists in a reconstructed form. It only in secret-shared form during its whole lifetime.

## ECDSA keys

ECDSA-enabled subnets hold threshold ECDSA **master keys** that are generated with the key generation protocol. A master ECDSA key is a key from which canister ECDSA keys can be derived, such that a single master key for a given elliptic curve suffices for the derivation of an ECDSA key for each canister on ICP. This *canister root key* uses an extension of the BIP-32 key derivation mechanism with the canister's principal as input. The key derivation is executed transparently by the protocol as part of the signing and public key retrieval APIs. 

An unlimited number of ECDSA keys can be derived from the canister's root key using a backward-compatible extension of the BIP-32 key derivation mechanism. The extension allows 32-bit integers and arbitrary-length byte arrays to be used as input for each level of the key derivation function. This derivation is supported by the ECDSA API through the `ecdsa_public_key` method.

The derivation of further ECDSA keys from a canister root key can be done without the involvement of ICP to facilitate certain use cases.

![Threshold ECDSA Key derivation](../_attachments/key_derivation.png)

Threshold ECDSA master keys are referred to through **key identifiers** in the threshold ECDSA API. The key identifiers comprise an elliptic curve name and an identifier. An example key identifier is the 2-tuple `(secp256k1, test_key_1)`. These key identifiers are used by the system to refer to the correct key in instances such as selecting the key share when computing a signature or in the implementation of the XNet routing of API calls and responses to/from the ECDSA-enabled subnet.

There are currently two master keys deployed: a test and a production key.

- `(secp256k1, test_key_1)`: The test key deployed on a single 13-node subnet.
- `(secp256k1, key_1)` The production key deployed on two high-replication subnets, one activated for signing, and the other one for backing up the key.

## API

For the authoritative specification, refer to the [Internet Computer interface specification](/references/ic-interface-spec.md#ic-ecdsa_public_key). 

The API comprises two methods: 

- `ecdsa_public_key` for retrieving threshold ECDSA public keys.
- `sign_with_ecdsa` for requesting threshold ECDSA signatures to be computed from the subnet holding the secret-shared private threshold ECDSA key.

Each API call refers to a threshold ECDSA master key by virtue of a 2-part identifier comprising a curve and a key id. Derivation paths are used to refer to keys below a canister's root key in the key derivation hierarchy. The key derivation from the master key to the canister root key is implicit in the API.

-   [`ecdsa_public_key`](/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key): Returns a SEC1-encoded ECDSA public key for the given canister using the given derivation path. If the `canister_id` is unspecified, it will default to the canister id of the caller. The `derivation_path` is a vector of variable length byte strings. The `key_id` is a struct specifying both a curve and a name. The availability of a particular `key_id` depends on implementation.
    - For curve `secp256k1`, the public key is derived using a generalization of BIP32 ([ia.cr/2021/1330](https://eprint.iacr.org/2021/1330), Appendix D). To derive (non-hardened) BIP-0032-compatible public keys, each byte string (blob) in the `derivation_path` must be a 4-byte big-endian encoding of an unsigned integer less than 2<sup>31</sup>.
    - The return result is an extended public key consisting of an ECDSA `public_key`, encoded in SEC1 compressed form, and a `chain_code`, which can be used to deterministically derive child keys of the `public_key`.
    - This call requires that the ECDSA feature is enabled and the `canister_id` meets the requirement of a canister id. Otherwise it will be rejected.
-   [`sign_with_ecdsa`](/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key): Returns a new ECDSA signature of the given `message_hash` that can be separately verified against a derived ECDSA public key. This public key can be obtained by calling `ecdsa_public_key` with the caller's `canister_id`, and the same `derivation_path` and `key_id` used here.
    - The signatures are encoded as the concatenation of the SEC1 encodings of the two values `r` and `s`. For curve `secp256k1`, this corresponds to 32-byte big-endian encoding.
    - This call requires that the ECDSA feature is enabled, the caller is a canister, and `message_hash` is 32 bytes long. Otherwise it will be rejected.

An example of the API can be found below:

```
  ecdsa_public_key : (record {
    canister_id : opt canister_id;
    derivation_path : vec blob;
    key_id : record { curve: ecdsa_curve; name: text };
  }) -> (record { public_key : blob; chain_code : blob; });
  sign_with_ecdsa : (record {
    message_hash : blob;
    derivation_path : vec blob;
    key_id : record { curve: ecdsa_curve; name: text };
  }) -> (record { signature : blob });
```

In case of high system load, a request to compute an ECDSA signature may time out. In this case, retry the request later.

## API fees

Fees for the ECDSA signing API are as defined below. The threshold ECDSA test key resides on a 13-node subnet, while the threshold ECDSA production key resides on a 34 node subnet. The subnet size where the threshold signature key resides and the signatures are computed define the resulting cost. The calling canister's subnet size does not matter for the fees. For costs in USD, the [USD/XDR exchange rate](/docs/current/developer-docs/gas-cost) as of of November 23, 2022 has been used.

:::note
If a canister using this feature is intended to be blackholed it is recommended to send more cycles with the call. Any cycles not charged in a call are refunded.
:::

### Fees for the t-ECDSA test key

| Transaction                          | Description                                                                                                    | Cycles (test key)                     | USD                         |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------|
| Threshold ECDSA signing              | For computing one threshold ECDSA signature (`sign_with_ecdsa`)                                                | 10_000_000_000              | $0.0130886                  |

### Fees for the t-ECDSA production key

| Transaction                          | Description                                                                                                    | Cycles (production key)                     | USD                         |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------|
| Threshold ECDSA signing              | For computing one threshold ECDSA signature (`sign_with_ecdsa`)                                                | 26_153_846_153              | $0.0342317                  |

## Environments

This feature is available in both the SDK for local development and on ICP for production operation of canisters.

### Local development

The development of canisters is typically done in the developer's local environment, facilitated by use of the [IC SDK](../../setup/install/index.mdx). The SDK supports the management canister API for threshold ECDSA in the local canister execution environment. 

When the replica of the SDK environment is first started, a new ECDSA key is generated. This key is stored in non-volatile memory so that it does not change with every restart of the replica.

The SDK uses the exact same implementation of threshold ECDSA as the mainnet, but only runs a single replica. This means it degenerates to a special case and incurs only little overhead for key generation and signing. It can remain enabled by default in the SDK without noticeably affecting performance of the local environment. 

### Production development

Any canister on any subnet of ICP can call the threshold ECDSA API exposed by the management canister. The calls are routed via XNet communication to the ECDSA-enabled subnet that holds the key referred to in the API call. The test key is hosted on a subnet with a replication factor of 13 and should solely be used for development and testing purposes. The main intended purpose is to facilitate the development and testing of Bitcoin-enabled dapps using Bitcoin testnet.

The production ECDSA key on the `secp256k1` elliptic curve has been deployed to be used for integration with the Bitcoin Mainnet and other use cases.

## Further reading

- [Eurocrypt 2022 paper](https://eprint.iacr.org/2021/1330).

- [Sample code for `threshold-ecdsa`](https://github.com/dfinity/examples/tree/master/motoko/threshold-ecdsa).

