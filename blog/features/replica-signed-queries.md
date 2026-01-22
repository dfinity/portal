---
title: "Announcing replica-signed queries"
description: To enhance the trustworthiness of queries by providing better guarantees against attacks, we're excited to announce the release of replica-signed queries!
tags: [New features]
image: /img/blog/dev-blog-replica-signed-queries.jpg
---

When an update call is made to a canister on the Internet Computer, the response to it includes a subnet signature that proves the data sent within the request is trustworthy. Query calls, however, are handled by single replicas and don't bear any information that validates their response is trustworthy, since their data could be tampered with by a malicious replica or malicious boundary node. As a workaround, certified data and certified variables can be used, which are embedded in responses to query calls that provide a layer of validation. However, using certified data and variables requires extra work for developers and sometimes does not fit into a developer's workflow seamlessly.

To enhance the trustworthiness of queries by providing better guarantees against attacks, we're excited to announce the release of replica-signed queries!

## What are replica-signed queries?

Replica-signed queries are a new feature that introduces replica signatures in query responses. Every response to query call will contain a signature that signs specific parts of the response using the replica's private key. Then, query responses can be validated by fetching the replica's public key from the subnet's state tree, reading the public key of the signing replica, then verifying the signature.

This new feature includes two primary changes: first, the subnet state tree now exposes the public keys of the replicas, then query responses will now contain a signature.

Having a single replica signature in a query response doesn't completely solve the problem that query responses cannot be trusted, however, replica-signed queries do help improve the security of queries since the recipient can validate that the response came from a replica on the correct subnet. The primary goal of this feature is to provide better guarantees against malicious boundary nodes, since replica-signed queries make it impossible for a malicious boundary node to return false data.

## How do replica-signed queries work?

First, a list of node IDs and their corresponding public keys is put into the subnet's state tree so that they can be certified by the subnet. Users can obtain the certificate to validate the node's keys through an HTTPS `read_state` call that includes a timestamp value.

To support replica-signed queries, the query response format has been changed. The response to a query call adds a list with one signature for the returned response produced by the ICP node that evaluated the query call.

If the call is replied to, the `reply` field is included. If the call is rejected, the `error_code`, `reject_code`, and `reject_message` fields will be included in the response.

If the query call resulted in a reply, the response is a CBOR (see [CBOR](/references/ic-interface-spec#cbor)) map with the following fields:

- `status (text)`: "replied".

- `reply`: a CBOR map with the field arg (blob) which contains the reply data.

- `signatures ([+ node-signature])`: a list containing one node signature for the returned query response.

If the call resulted in a reject, the response is a CBOR map with the following fields:

- `status (text)`: "rejected".

- `reject_code (nat)`: The reject code (see Reject codes: /references/ic-interface-spec#reject-codes).

- `reject_message (text)`: a textual diagnostic message.

- `error_code (text)`: an optional implementation-specific textual error code (see Error codes: /references/ic-interface-spec#error-codes).

- `signatures ([+ node-signature])`: a list containing one node signature for the returned query response.

The query's signature (whose type is denoted as node-signature) is a [CBOR](/references/ic-interface-spec#cbor) (see CBOR) map with the following fields:

- `timestamp (nat)`: the timestamp of the signature.

- `signature (blob)`: the actual signature.

- `identity (principal)`: the principal of the node producing the signature.

The actual parts that are signed include the query response from the execution layer, the timestamp and the request ID of the query, which is a SHA256 hash of the query's contents. With this `request_id` value, signatures for one query cannot be confused or exchanged for another.

Query response verification is done via agents, such as the [ICP Rust agent](https://docs.rs/ic-agent/latest/ic_agent/) and [ICP JavaScript agent](https://www.npmjs.com/package/@dfinity/agent), and other agents developed by members of the ICP community. Agents now introduce a new `AgentError` type that indicates a verification failure.

replica-signed queries are supported in the [ICP Rust agent](https://docs.rs/ic-agent/latest/ic_agent/) [versions v0.30.0](https://github.com/dfinity/agent-rs/releases) and newer.

replica-signed queries are supported in the [ICP JavaScript agent](https://www.npmjs.com/package/@dfinity/agent) [versions v0.20.0](https://github.com/dfinity/agent-js/releases) and newer.

## How are query responses verified?

To verify a replica-signed query, first the agent requests the path `/subnet` in a read state call that is separate to `/api/v2/canister/<effective_canister_id>/read_state` to get the certificate. A boundary node routes this call to the subnet that hosts the canister. A subnet's state tree only contains the keys of its own nodes. All node keys are cached.

Then, to verify the certificate, the timestamp stored at `/time` of the node keys will be checked to assure that the nodes are still within the subnet. The agent can look up the key of the node that is present in the query response signature, either from the cache or the `read_state` response. Once the node's public key is obtained, the client can verify the signature against the hash of the response's relevant fields.

## How to use replica-signed queries

On ICP, the replica has already begun producing signatures on query responses.

To use the [ICP Rust agent](https://docs.rs/ic-agent/latest/ic_agent/), signature verification on query responses is enabled by default on versions v0.30.0 and newer. Tools such as dfx will be updated to use the latest version of the [ICP Rust agent](https://docs.rs/ic-agent/latest/ic_agent/) in the next release (v0.15.2).

To use the [ICP JavaScript agent](https://www.npmjs.com/package/@dfinity/agent), existing applications will need to update their [ICP JavaScript agent](https://www.npmjs.com/package/@dfinity/agent) version to v0.20.0 and newer. dfx always uses the `@latest` version of the [ICP JavaScript agent](https://www.npmjs.com/package/@dfinity/agent), meaning new applications will automatically have signature verification enabled on query responses.

Older versions of the agents will automatically ignore the `signature` field.

## Conclusion

In conclusion, replica-signed queries are a new feature that aims to provide a level of trustworthiness to query calls by preventing attacks that may alter the response of a query call.

Replica-signed queries are available in the [ICP JavaScript agent](https://www.npmjs.com/package/@dfinity/agent) [versions v0.20.0](https://github.com/dfinity/agent-js/releases) and newer, the [ICP Rust agent](https://docs.rs/ic-agent/latest/ic_agent/) [versions v0.30.0](https://github.com/dfinity/agent-rs/releases) and newer, and dfx [versions v0.15.2](https://github.com/dfinity/sdk/releases) and newer.







