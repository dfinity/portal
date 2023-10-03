# Independently verifying Internet Computer signatures

## Overview

Calls on the IC require that a cryptographic `signature` and `principal` are attached, usually in the form of an identity, be attached to the call. This identity can be anonymous or authenticated using a cryptographic signature. Canisters can use this attached identity to respond to a call, which enables contracts to use those identities for other workflows and purposes. 

An identity includes both the private and public keys. Because the private key needs to say private, the public key is sent along with a signature signed by the identity encoded as a `Principal`. When a delegation is sent the same workflow is used, except the Delegation Chain is provided as well. 

Sometimes, it is beneficial to verify the identity's signature independently from the automatic verification done on the IC as an additional layer of validation. 

When a canister call is made via the HTTPS interface, the following fields are present in the content map for all cases:

- `nonce` (`blob`, optional): Randomly generated user-provided data; can be used to create distinct calls with otherwise identical fields.

- `ingress_expiry` (`nat`, required): An upper limit on the calls's validity; expressed in nanoseconds, which avoids replay attacks since the IC will not accept calls or transition calls if their expiry date is in the past. Additionally, calls may be refused with an ingress expiry date too far in the future. 

- `sender` (`Principal`, required): The user who issued the call.

The overall request, referred to as the authentication envelope, has the following keys:

- `content` (`record`): The call's content. 

- `sender_pubkey` (`blob`, optional): The public key used to authenticate the call.

- `sender_delegation` (`array of maps`, optional): A chain of delegations that begins with one signed by the `sender_pubkey` and ending with the delegation to the key relating to the `sender_sig`; every public key should appear exactly once. 

- `sender_sig` (`blob`, optional): The signature used to authenticate the call. 

The public key must authenticated the sender principal if the principal is a self-authenticating ID that is derived from that public key. 

The fields `sender_pubkey`, `sender_sig`, and `sender_delegation` should be omitted if the sender is an anonymous principal. If the sender is authenticated, the `sender_pubkey` and `sender_sig` must be set. 

The call's is calculated using the content record, which allows the signature to be based on the request ID. 

## Transaction delegation

A transaction's signature can be delegated from one key to another. If delegation is used, the `sender_delegation` field contains an array of delegations with the following fields:

- `delegation` (`map`): A map containing the fields: 

    - `pubkey` (`blob`): A public key.
    
    - `expiration` (`nat`): The delegation's expiration, defined in nanoseconds analogously to the `ingress_expiry`. 
    
    - `targets` (`array` of `CanisterId`, optional): Sets the delegation to apply only for requests sent to the canisters within the canister list; has a maximum of 1000 canisters.

    - `senders` (`array` of `Principal`, optional): Sets the delegation to only apply for requests originating from the principals in the list.
    
    - `signature` (`blob`): The signature on the `32-byte` delegation field map, using the 27 bytes `\x1Aic-request-auth-delegation` as the domain separator.

The first delegation in the array has a signature created using the public key corresponding with the `sender_pubkey` field. All subsequent delegations are signed with the public key corresponding to the key contained in the preceding delegation.

The `sender_sig` field is calculated by signing concatenating the domain separator, `\x0Aic-request`, which is 11 bytes, with the 32 byte request ID, using the secret key that belongs to the key specified in the last delegation. If no delegations are present, the public key specified in `sender_pubkey` is used.  If the delegation field is present, it should contain no more than 20 delegations.

When a canister call is executed on the IC, the signature of the call is validated automatically. As an additional layer of validation, these calls can be verified independently through a Rust crate. 

## Verifying signatures with agent

To verify a signature with an agent, an accepted identity is required. The following are the accepted types of signatures in identities:

- Ed25519 and ECDSA signatures.

    - Plain signatures are supported for the schemes.

- Ed25519 or ECDSA on curve P-256 (also known as secp256r1).

    - Using SHA-256 as a hash function.

    - Using the Koblitz curve in secp256k1.

When these identities are encoded as a principal, an agent will attach a suffix byte which indicates whether the identity is anonymous or self-authenticating. 

Self-authenticating identities using an Ed25519 or ECDSA curve will have a suffix of `2`, while an anonymous identity has a single byte of `4`. 


## Verifying signatures with the Rust `ic-validator-ingress-message` crate

The Rust [ic-validator-ingress-message](https://github.com/dfinity/ic/tree/master/rs/validator) crate has been developed specifically for validating message signatures. Within this crate, the `IngressMessageVerifier` class can be used. Within the class, the `InternetIdentityAuthResponse` can be validated as a whole using the Delegation chain. 

The following example displays an example verifier for ingress messages. This example uses a hard-coded root of trust that is set to be the NNS root public key and uses system time to derive the current time. 

```rust
use ic_types::messages::{HttpCallContent, HttpRequest, SignedIngressContent};
use ic_types::Time;
use ic_validator_ingress_message::{RequestValidationError, HttpRequestVerifier, IngressMessageVerifier, TimeProvider};
fn anonymous_http_request_with_ingress_expiry(
    ingress_expiry: u64,
) -> HttpRequest<SignedIngressContent> {
    use ic_types::messages::Blob;
    use ic_types::messages::HttpCanisterUpdate;
    use ic_types::messages::HttpRequestEnvelope;
    HttpRequest::try_from(HttpRequestEnvelope::<HttpCallContent> {
        content: HttpCallContent::Call {
            update: HttpCanisterUpdate {
                canister_id: Blob(vec![42; 8]),
                method_name: "some_method".to_string(),
                arg: Blob(b"".to_vec()),
                sender: Blob(vec![0x04]),
                nonce: None,
                ingress_expiry,
            },
        },
        sender_pubkey: None,
        sender_sig: None,
        sender_delegation: None,
    })
        .expect("invalid http envelope")
}
let current_time = Time::from_nanos_since_unix_epoch(1_000);
let request = anonymous_http_request_with_ingress_expiry(current_time.as_nanos_since_unix_epoch());
let verifier = IngressMessageVerifier::default();

let result = verifier.validate_request(&request);

match result {
    Err(RequestValidationError::InvalidIngressExpiry(_)) => {}
     _ => panic!("unexpected result type {:?}", result)
}
```

You can reference the crate's implementation logic [here](https://sourcegraph.com/github.com/dfinity/ic/-/blob/rs/validator/src/ingress_validation.rs?L605) for additional context.

## Resources

- Rust [ic-validator-ingress-message](https://github.com/dfinity/ic/tree/master/rs/validator) crate.
- [IC specification](/docs/current/references/ic-interface-spec).
- [Using agents](https://internetcomputer.org/docs/current/developer-docs/agents/).
