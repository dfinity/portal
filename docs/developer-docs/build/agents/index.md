# Agents

In the Internet Computer ecosystem, a library that is used to make calls to the IC public interface is called an agent.
An agent has a few key responsibilities, which make it convenient to work with in your language of choice.
If you have a canister running, either on your local machine or live on the Internet Computer, you will have two main ways to interact with your canister smart contract.
You can talk to the canister using the v2 API using an `agent` that follows the interface specification, or you can use the canister's HTTP interface.

## Available Agents

This section of the docs covers the following agents, ordered by languages:

- JavaScript / TypeScript
  - [JavaScript/TypeScript Agent by DFINITY](./javascript/javascript-intro.md)
- Rust
  - [Rust Agent by DFINITY](./ic-agent-dfinity.md)

In addition to those, there are a lot of other community-supported agents:

- .NET
  - [`ICP.NET` by Gekctek](https://github.com/Gekctek/ICP.NET)
- Dart
  - [`agent_dart` by AstroX](https://github.com/AstroxNetwork/agent_dart) (supports mobile development with Flutter)
  - [`ic_dart_tools` by Levi Feldman](https://github.com/levifeldman/ic_tools_dart)
- Go
  - [`IC-Go` by MixLabs](https://github.com/mix-labs/IC-Go)
- Java
  - [`ic4j-agent` by IC4J](https://github.com/ic4j/ic4j-agent) (supports Android)
- Python
  - [`ic-py` by Rocklabs](https://github.com/rocklabs-io/ic-py)

If you're interested in building an agent in another language please reach out to us via [https://dfinity.org/grants](https://dfinity.org/grants).

## What an agent does

### 1. Structuring Data

A `call` to the Internet Computer can take two common forms - an `update` or a `query`. The `agent` submits a POST request to `/api/v2/canister/<effective_canister_id>/call`, and includes the following components:

- `request_type`
- Authentication
  - `sender`, `nonce`, and `ingress_expiry`
- `canister_id`
- `method_name`
- `request_id` - required for `update` request type calls
- `arg` - the rest of the payload

By knowing the Candid interface of the canister, the `agent` will assemble the `"arg"` with data from the client application, ensuring it matches the Candid interface for the method it will be calling. All of the above components are then assembled into a certificate, which is transformed into a CBOR-encoded buffer.

For update requests, the agent also hashes the rest of the fields, and passes it in as a unique `request_id`. That `request_id` is used for polling while the IC reaches consensus on the update.

The `agent` takes the CBOR-encoded certificate and attaches it to the body of the POST request. The canister will work on that request asynchronously, and then the `agent` can begin polling with `read_state` requests, until the canister response is ready.

### 2. Decoding Data

Once the data has been returned from the IC, the `agent` takes the certificate from the payload and verifies it. The certificate can be verified as genuine using the public `rootKey` of the NNS subnet. The network will respond with a CBOR-encoded buffer, which the `agent` can then decode, and transform into a useful structure using semantic language-specific types. For example, if the type returned from the canister is `text`, that will get turned into a JavaScript `string`, and so on.

### 3. Managing Authentication

Calls to the Internet Computer always need to have a cryptographic identity attached. That identity will either be Anonymous or Authenticated, using a cryptographic signature. Since identities are required, canisters can use the identity attached to a call to decide how to respond to that call. This enables contracts to use those identities for other purposes.

#### Accepted Identities

The IC accepts calls using the following types of signatures in identities:

- Ed25519 and ECDSA signatures
  - Plain signatures are supported for the schemes
- Ed25519 or ECDSA on curve P-256 (also known as secp256r1)
  - using SHA-256 as a hash function
  - using the Koblitz curve in secp256k1.

When encoding these identities as a `principal`, agents attach a suffix byte, indicating whether the identity is self-authenticating or anonymous.

A self-authenticating identity using one of the above curves will have a suffix of 2.

While the anonymous identity is a single byte 4. It resolves to `"2vxsx-fae"`, in its textual encoding.
