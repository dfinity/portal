# Threshold ECDSA Signing Code Walkthrough

We present a minimal example canister for showcasing the threshold ECDSA API. The canister is a signing oracle that creates signatures with keys derived from an input string. That is, a request provides a message and a key derivation string and the canister hashes the message and requests a signature from the threshold ECDSA subnet using the key derivation string for the derivation path. We attempt to give a complete overview of the development, starting with downloading of the SDK, up to the deployment and trying out of the code on mainnet.

## Getting Started

Sample code for `threshold-ecdsa` is provided in the [examples repository](https://github.com/dfinity/examples), under either [`motoko`](https://github.com/dfinity/examples/tree/master/motoko/threshold-ecdsa) or [`rust`](https://github.com/dfinity/examples/tree/master/rust/threshold-ecdsa) sub-directories. It requires at least dfx version 0.11.0 for local development.

-   Download and install the SDK if you do not already have it.
-   Check out the examples repository.
-   Change directory to `motoko/threshold_ecdsa` subdirectory.
-   Run `dfx deploy`.

## Deploying it on Mainnet

The same code used in the SDK environment for local testing works on the IC mainnet. Keep in mind that the master key in the SDK environment is different to the master test key on mainnet and the future master production key.

Before deploying to mainnet, you should modify the code to use the right name of the `key_id` for the key on mainnet.

## Obtaining Public Keys

The following motoko code demonstrates how to obtain a public key by calling the `ecdsa_public_key` method of the IC management canister (`aaaaa-aa`). When the `canister_id` argument is left as unspecified (`null`), it defaults to getting the public key of the canister that makes this call.

```
  let ic : IC = actor("aaaaa-aa");

  public shared (msg) func public_key() : async { #Ok : { public_key: Blob }; #Err : Text } {
    let caller = Principal.toBlob(msg.caller);
    try {
      let { public_key } = await ic.ecdsa_public_key({
          canister_id = null;
          derivation_path = [ caller ];
          key_id = { curve = #secp256k1; name = "dfx_test_key" };
      });
      #Ok({ public_key })
    } catch (err) {
      #Err(Error.message(err))
    }
  };
```

### Canister Root Public Key

For obtaining the canister's root public key, the derivation path in the API can be simply left empty.

### Key Derivation

-   For obtaining a canister's public key below its root key in the BIP-32 key derivation hierarchy, a derivation path needs to be specified. As explained in the general documentation, each element in the array of the derivation path is either a 32-bit integer encoded as 4 bytes in big endian or a byte array of arbitrary length. The element is used to derive the key in the corresponding level at the derivation hierarchy.
-   In the example code above, we use the bytes extracted from the `msg.caller` principal in the `derivation_path`, so that different callers of `public_key()` method of our canister will be able to get their own public keys.

## Signing

Computing threshold ECDSA signatures is the core functionality of this feature. Canisters do not hold ECDSA keys themselves, but keys are derived from a master key held by dedicated subnets. A canister can request the computation of a signature through the management canister API. The request is then routed to a subnet holding the specified key and the subnet computes the requested signature using threshold cryptography. Thereby, it derives the canister root key or a key obtained through further derivation, as part of the signature protocol, from a shared secret and the requesting canister's principal identifier. Thus, a canister can only request signatures to be created for their canister root key or a key derived from it. This means, canisters "control" their private ECDSA keys in that they decide when signatures are to be created with them, but don't hold a private key themselves.

```
  public shared (msg) func sign(message_hash: Blob) : async { #Ok : { signature: Blob };  #Err : Text } {
    assert(message_hash.size() == 32);
    let caller = Principal.toBlob(msg.caller);
    try {
      Cycles.add(10_000_000_000);
      let { signature } = await ic.sign_with_ecdsa({
          message_hash;
          derivation_path = [ caller ];
          key_id = { curve = #secp256k1; name = "dfx_test_key" };
      });
      #Ok({ signature })
    } catch (err) {
      #Err(Error.message(err))
    }
  };
```

## Signature Verification

For completeness of the example, we show that the created signatures can be verified with the public key corresponding to the same canister and derivation path.

The following shows how this verification can be done in Javascript, with the [secp256k1](https://www.npmjs.com/package/secp256k1) npm package:

```javascript
let { ecdsaVerify } = require("secp256k1")

let public_key = ... // Uint8Array type, the result of calling the above canister "public_key" function.
let hash = ...       // 32-byte Uint8Array representing a binary hash (e.g. sha256).
let signature = ...  // Uint8Array type, the result of calling the above canister "sign" function on `hash`.

let verified = ecdsaVerify(signature, hash, public_key)
```

The call to `ecdsaVerify` function should always return `true`.

Similar verifications can be done in many other languages with the help of cryptographic libraries support the `secp256k1` curve.
