# Overview

In the Internet Computer ecosystem, a library that is used to make calls to the ICP public interface is called an **agent**. An agent has a few key responsibilities, which make it convenient to work with in your language of choice.

If you have a canister running, either on your local machine or live on the Internet Computer, you will have two main ways to interact with your canister smart contract.
You can talk to the canister using the v2 API using an **agent** that follows the interface specification, or you can use the canister's HTTP interface.

Smart contracts are able to define their own API's using the Candid Interface Declaration Language (IDL), and they will respond to calls through the public API.

ICP supports two types of calls - `queries` and `updates`. Queries are fast and cannot change state. Updates go through consensus, and will take around 2-4 seconds to complete. 

As a result of the latency for updates, best practices around modeling your application's performance will have you make updates asynchronously and early. If you can make an update ahead of time and have it already "cached" in your canister's memory, your users will have a better experience requesting that data. Similarly, if your application needs to make an update, it is best to avoid blocking interaction while your update is taking place. Use **optimistic rendering** wherever practical, and proceed with your application as if the call has already succeeded.

## Available agents

This section of the docs covers the following agents, ordered by languages:

- JavaScript / TypeScript
  - [JavaScript/TypeScript agent by DFINITY](./javascript-intro.md)
- Rust
  - [Rust agent by DFINITY](./ic-agent-dfinity.md)

In addition to those, there are several other community-supported agents:

- .NET
  - [`ICP.NET` by Gekctek](https://github.com/Gekctek/ICP.NET)
- Dart
  - [`agent_dart` by AstroX](https://github.com/AstroxNetwork/agent_dart) (supports mobile development with Flutter)
  - [`ic_dart_tools` by Levi Feldman](https://github.com/levifeldman/ic_tools_dart)
- Go
  - [`IC-Go` by MixLabs](https://github.com/mix-labs/IC-Go)
  - [`agent-go` by Aviate Labs](https://github.com/aviate-labs/agent-go)
- Java
  - [`ic4j-agent` by IC4J](https://github.com/ic4j/ic4j-agent) (supports Android)
- Python
  - [`ic-py` by Rocklabs](https://github.com/rocklabs-io/ic-py)
- C
  - [`agent-c` by Zondax](https://github.com/Zondax/icp-client-cpp) (C Wrapper for IC Rust Agent)
- Ruby
  - [`ic_agent` by Terry.Tu](https://github.com/tuminfei/ic_agent)

If you're interested in building an agent in another language please reach out to us via [https://dfinity.org/grants](https://dfinity.org/grants).

## What an agent does

### Structuring data

A `call` to the Internet Computer can take two common forms - an `update` or a `query`. The **agent** submits a `POST` request to `/api/v2/canister/<effective_canister_id>/call`, and includes the following components:

- `request_type`
- Authentication
  - `sender`, `nonce`, and `ingress_expiry`
- `canister_id`
- `method_name`
- `request_id` - required for `update` request type calls
- `arg` - the rest of the payload

By knowing the Candid interface of the canister, the **agent** will assemble the `"arg"` with data from the client application, ensuring it matches the Candid interface for the method it will be calling. All of the above components are then assembled into a certificate, which is transformed into a CBOR-encoded buffer.

For update requests, the agent also hashes the rest of the fields, and passes it in as a unique `request_id`. That `request_id` is used for polling while ICP reaches consensus on the update.

The **agent** takes the CBOR-encoded certificate and attaches it to the body of the `POST` request. The canister will work on that request asynchronously, and then the **agent** can begin polling with `read_state` requests, until the canister response is ready.

### Decoding data

Once the data has been returned from ICP, the **agent** takes the certificate from the payload and verifies it. The certificate can be verified as genuine using the public `rootKey` of the NNS subnet. The network will respond with a CBOR-encoded buffer, which the **agent** can then decode, and transform into a useful structure using semantic language-specific types. For example, if the type returned from the canister is `text`, that will get turned into a JavaScript `string`, and so on.

### Managing authentication

Calls to the Internet Computer always need to have a cryptographic identity attached. That identity will either be **anonymous** or **authenticated**, using a cryptographic signature. Since identities are required, canisters can use the identity attached to a call to decide how to respond to that call. This enables contracts to use those identities for other purposes.

#### Accepted identities

ICP accepts calls using the following types of signatures in identities:

- Ed25519 and ECDSA signatures.
  - Plain signatures are supported for the schemes.
- Ed25519 or ECDSA on curve P-256 (also known as secp256r1).
  - using SHA-256 as a hash function.
  - using the Koblitz curve in secp256k1.

When encoding these identities as a `principal`, agents attach a suffix byte, indicating whether the identity is self-authenticating or anonymous.

A self-authenticating identity using one of the above curves will have a suffix of 2.

While the anonymous identity is a single byte 4. It resolves to `"2vxsx-fae"`, in its textual encoding.
