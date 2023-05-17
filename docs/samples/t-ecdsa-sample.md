# Threshold ECDSA Signing Code Walkthrough

We present a minimal example canister smart contract for showcasing the [threshold ECDSA](../developer-docs/integrations/t-ecdsa) API. 

The example canister is a **signing oracle that creates ECDSA signatures with keys derived from an input string.** 

More specifically:

1. The sample canister receives a request that provides *a message* and a *key derivation string*.
2. The sample canister hashes the *message* and uses the *key derivation string* for the derivation path. 
3. The sample canister uses the above to request a signature from the threshold ECDSA [subnet](https://wiki.internetcomputer.org/wiki/Subnet_blockchain) (the threshold ECDSA is a subnet specializing in generating threshold ECDSA signatures).

We give a complete overview of the development, starting with downloading of the [IC SDK](../developer-docs/setup/index.md), up to the deployment and trying out of the code on the IC mainnet.

:::note 
This walkthrough focuses on the version of the sample canister code written in [Motoko](../developer-docs/backend/motoko/index.md) programming language, but no specific knowledge of Motoko is needed to follow along. There is also a [Rust](https://github.com/dfinity/examples/tree/master/rust/threshold-ecdsa) version available in the same repo and follows the same commands for deploying.
:::

## Getting Started

Sample code for `threshold-ecdsa` is provided in the [examples repository](https://github.com/dfinity/examples), under either [`/motoko`](https://github.com/dfinity/examples/tree/master/motoko/threshold-ecdsa) or [`/rust`](https://github.com/dfinity/examples/tree/master/rust/threshold-ecdsa) sub-directories. It requires at least [IC SDK](../developer-docs/setup/index.md) version 0.11.0 for local development.

### Setup
-   Download and [install the SDK](../developer-docs/setup/index.md) if you do not already have it.
-   Check out the [examples repository](https://github.com/dfinity/examples).

### Deploy the canister locally

```bash
cd motoko/threshold_ecdsa
dfx start --background
dfx deploy
```

- `dfx start --background` starts a local instance of the IC via the IC SDK
- `dfx deploy` deploys the code in the user's directory as a canister on the local version of the IC

If successful, you should see something like this:


```bash
Deployed canisters.
URLs:
  Backend canister via Candid interface:
    ecdsa_example_motoko: http://127.0.0.1:4943/?canisterId=t6rzw-2iaaa-aaaaa-aaama-cai&id=st75y-vaaaa-aaaaa-aaalq-cai
```

If you go to the URL, you will see a web UI that shows the public methods the canister exposes. Since the canister exposes `public_key` and `sign` methods, those are rendered in the web UI:

 ![Candid UI](./_attachments/tecdsa-candid-ui.png)


## Deploying the canister on IC mainnet

To deploy the sample code, the canister needs the right key for the right environment. Specifically, one needs to replace the value of the `key_id` in the `src/ecdsa_example_motoko/main.mo` file of the sample code. Before deploying to mainnet, one should modify the code to use the right name of the `key_id`.

There are three options:

* `dfx_test_key`: a default key that is used in deploying to a local version of IC (via IC SDK)
* `test_key_1`: a master *test* key that is used in mainnet
* `key_1`: a master *production* key that is used in mainnet

For example, the default code in `src/ecdsa_example_motoko/main.mo` includes the lines and can be deployed locally:


```motoko
let { public_key } = await ic.ecdsa_public_key({
          canister_id = null;
          derivation_path = [ caller ];
          key_id = { curve = #secp256k1; name = "dfx_test_key" };
      });
```

```motoko
      let { signature } = await ic.sign_with_ecdsa({
          message_hash;
          derivation_path = [ caller ];
          key_id = { curve = #secp256k1; name = "dfx_test_key" };
      });
```

To deploy to IC mainnet, one needs to replace the value in `key_id` fields with the values `"dfx_test_key"` to instead have either `"test_key_1"` or `"key_1"` depending on the desired intent.


## Obtaining Public Keys

The following Motoko code demonstrates how to obtain a public key by calling the `ecdsa_public_key` method of the IC management canister (`aaaaa-aa`). When the `canister_id` argument is left as unspecified (`null`), it defaults to getting the public key of the canister that makes this call.

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

Computing threshold ECDSA signatures is the core functionality of this feature. **Canisters do not hold ECDSA keys themselves**, but keys are derived from a master key held by dedicated subnets. A canister can request the computation of a signature through the management canister API. The request is then routed to a subnet holding the specified key and the subnet computes the requested signature using threshold cryptography. Thereby, it derives the canister root key or a key obtained through further derivation, as part of the signature protocol, from a shared secret and the requesting canister's principal identifier. Thus, a canister can only request signatures to be created for their canister root key or a key derived from it. This means, canisters "control" their private ECDSA keys in that they decide when signatures are to be created with them, but don't hold a private key themselves.

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
