# Technology Overview -- How It Works

We give a high-level outline of threshold ECDSA on the IC. Some of the information in this section is not required to use the feature, but may be of interest to the technically inclined reader for obtaining background information on the technology. The IC implements the threshold ECDSA protocol by Groth and Shoup as described in their [Eurocrypt 2022 paper](https://eprint.iacr.org/2021/1330). Groth and Shoup have also published a comprehensive [design and analysis](https://eprint.iacr.org/2022/506) of this distributed signing protocol. The threshold ECDSA implementation on the IC features multiple protocols:
-   Key generation: This protocol is executed on a specified subnet; it generates a threshold ECDSA key such that the private key is secret shared over the replicas of this subnet.
-   Key re-sharing: This protocol re-shares an ECDSA key from a source subnet to a target subnet. It results in the same key being secret shared over the replicas of the target subnet using a different random secret sharing (potentially over a different number of replicas than the sharing in the source subnet uses).
-   Signing: This protocol computes a signature with the secret-shared private key. Signing is done by precomputing the vast majority of the steps of the signing protocol and storing the precomputation result as a set of quadruples. Upon a signing request, one of the precomputed quadruples is consumed to efficiently compute a signature.

It is crucial to note that the private key never exists in reconstructed, but only in secret-shared form during its whole lifetime, be it during its generation, the re-sharing of the key from one subnet to another, and computing signatures.

Various NNS proposals have been implemented to perform key management, i.e., initial key generation and key re-sharing. Those proposals are used to define on which subnet to generate an ECDSA master key, to which subnet to re-share the key to have it available for better availability, and which subnet to enable for answering signing requests.

## ECDSA Keys

ECDSA-enabled subnets hold what we call threshold ECDSA *master keys*, generated with the key generation process on selected subnets of the IC. A master ECDSA key is a key from which canister ECDSA keys can be derived. I.e., a single master key for a given elliptic curve suffices to allow for the derivation of an ECDSA key for each canister on the IC (*canister root key*) using the canister\'s principal and a BIP-32-like key derivation mechanism that is executed transparently by the protocol as part of the signing and public key retrieval APIs. See the level-0 key derivation in the below Figure for the derivation of canister root keys from a master key.

From a canister root key, an unlimited number of further ECDSA keys can be derived for the canister using a backward-compatible extension of the BIP-32 key derivation mechanism. The extension allows not only 32-bit integers, but arbitrary-length byte arrays, to be used as input for each level of the key derivation function. See the levels 1 and greater in the below figure illustrating the derivation of further canister keys based on the canister root key.

The derivation of further ECDSA keys from a canister root key can be done without involvement of the IC to facilitate certain use cases.

![Threshold ECDSA Key derivation](../_attachments/key_derivation.png)

Threshold ECDSA master keys are always referred to through *key identifiers* in the threshold ECDSA API (as well as in the NNS proposals for managing the rollout). The key identifiers comprise an elliptic curve name and an identifier, e.g., an example key identifier is the 2-tuple `(secp256k1, key_1)`. Those key identifiers are used by the system to refer to the correct key, e.g., for selecting the key share when computing a signature or in the implementation of the XNet routing of API calls and responses to/from the ECDSA-enabled subnet holding the key with the corresponding identifier.

## Deployment

We next outline the deployment for the Chromium (Beta) release available now and the GA release coming later in 2022.

### Chromium Release

Currently, as part of the Chromium release, only a test key for curve `secp256k1` is deployed on one subnet with a replication factor of 13. This key may be deleted with an according NNS proposal some time after the GA release and therefore should not be used for anything that has value, but only for development and testing purposes. More concretely, it is, for example, strongly advised against holding real bitcoin with the test key. The test key is rather intended to facilitate development of Bitcoin smart contracts and hold Testnet bitcoin as preparation for the GA release. The test key has the id `(secp256k1, test_key_1)` for referring to it in API calls.

### General Availability Release (Coming Later in 2022)

A single threshold ECDSA production key for the `secp256k1` elliptic curve will be deployed on the IC for the upcoming GA release. The key will be maintained in secret-shared form on two different subnets with high replication factor (\>=34). The key will be initially generated on the NNS and maintained there and also re-shared to a new 34-node subnet. The latter will be activated to act as the active signing subnet for this key. The NNS will hold the key in secret-shared form for backup purposes, but will not respond to signing requests. In case of the unlikely event of one of the subnets getting destroyed beyond recoverability, the approach of key replication improves key availability by allowing for the key to be re-shared to a different subnet, should this be ever required in case of a disaster.

### Further Aspects

For both the current Chromium deployment with a test key and the future GA release with a production key, requests to the threshold ECDSA API are always XNet requests because the ECDSA-enabled subnets do not host user\'s canisters, thus some seconds of extra latency is incurred due to Xnet communications from the calling canister\'s subnet to the threshold-ECDSA-enabled subnet holding the respective key.

Support for further elliptic curves and additional corresponding master keys may be added in the future. The curve `secp256r1` is interesting for supporting use cases such as decentralized certification authorities (CAs) and is the premier candidate group to be added to facilitate use cases like the mentioned one.

## API

We next give an overview of the API for threshold ECDSA. For a detailed specification, the reader is referred to the corresponding part of the [Internet Computer Interface Specification](../../../references/ic-interface-spec.md#ic-ecdsa_public_key). The API comprises two methods, `ecdsa_public_key` for retrieving threshold ECDSA public keys, and `create_ecdsa_signature` for requesting threshold ECDSA signatures to be computed from the subnet holding the secret-shared private threshold ECDSA key.

Each API call refers to a threshold ECDSA master key by virtue of a 2-part identifier comprising a curve and a key id as outlined above. Derivation paths are used to refer to keys below a canister\'s root key in the key derivation hierarchy. The key derivation from the master key to the canister root key is implicit in the API.

-   `ecdsa_public_key`: This method returns a SEC1-encoded ECDSA public key for the given canister using the given derivation path. If the `canister_id` is unspecified, it will default to the canister id of the caller. The `derivation_path` is a vector of variable length byte strings. The `key_id` is a struct specifying both a curve and a name. The availability of a particular `key_id` depends on implementation.<br/>
For `curve secp256k1`, the public key is derived using a generalization of BIP32 (see ia.cr/2021/1330, Appendix D). To derive (non-hardened) BIP-0032-compatible public keys, each byte string (blob) in the `derivation_path` must be a 4-byte big-endian encoding of an unsigned integer less than 2<sup>31</sup>.<br/>
The return result is an extended public key consisting of an ECDSA `public_key`, encoded in SEC1 compressed form, and a `chain_code`, which can be used to deterministically derive child keys of the `public_key`.\
This call requires that the ECDSA feature is enabled, and the `canister_id` meets the requirement of a canister id. Otherwise it will be rejected.
-   `sign_with_ecdsa`: This method returns a new ECDSA signature of the given message_hash that can be separately verified against a derived ECDSA public key. This public key can be obtained by calling `ecdsa_public_key` with the caller\'s `canister_id`, and the same `derivation_path` and `key_id` used here.<br/>
The signatures are encoded as the concatenation of the SEC1 encodings of the two values `r` and `s`. For curve `secp256k1`, this corresponds to 32-byte big-endian encoding.<br/>
This call requires that the ECDSA feature is enabled, the caller is a canister, and `message_hash` is 32 bytes long. Otherwise it will be rejected.

## Environments

In order to facilitate developers throughout the canister development life cycle on the IC, the feature is available in both the SDK for local development and testing as well as on IC mainnet for pre-production testing and production operation of canisters.

### SDK

The development of canisters is typically done in the local environment of the developer, facilitated by use of the SDK. The SDK has been extended such that the management canister API for threshold ECDSA is available in the local canister execution environment. Thus, canisters using the threshold ECDSA API can be run locally for development and testing purposes. The feature is always enabled in the SDK, so no further user action is required in order to make use of the API.

When the replica of the SDK environment is first started up, a new ECDSA key is generated. This key is then stored in non-volatile memory so that it does not change with every restart of the replica.

For the technically interested readers we want to note that the SDK uses the exact same implementation of threshold ECDSA as mainnet, but only runs a single replica. Thus, the protocol is operating with the special case of a single replica, which means it degenerates to a special case and incurs only little overhead, e.g., for key generation, and can thus remain enabled by default in the SDK without noticeably affecting performance of the SDK. Also note that the signing throughput and latency in the local SDK environment is not representative for the throughput on mainnet.

### IC Mainnet

Any canister on any subnet of IC mainnet can call the threshold ECDSA API exposed by the management canister. The calls are routed via XNet communication to the ECDSA-enabled subnet that holds the key referred to in the API call (only one such signing subnet holding a test key exists for testing purposes in the initial Chromium release). Note that this test key is hosted on a subnet with a replication factor of only 13 and may be deleted in the future, thus it should not be used for anything of value, but rather solely for development and testing purposes. The main intended purpose is to facilitate the development and testing of Bitcoin-enabled dApps using Bitcoin testnet.

Later in 2022, as part of the General Availability (GA) release of the feature, a production ECDSA key on the `secp256k1` elliptic curve will be deployed to be used for integration with Bitcoin mainnet and other use cases of interest.