---
title: "Announcing replica signed queries"
description: To enhance the trustworthiness of queries by providing better guarantees against malicious attacks, we're excited to announce the release of replica signed queries!
tags: [New features]
image: /img/blog/replica-signed-queries.jpg
---

When an update call is made to a canister on the Internet Computer, the response to includes a subnet signature that proves the data sent within the request is trustworthy. Query calls, however, are handled by single replicas and don't bear any information that validates their response is trustworthy, since their data could be tampered with by a malicious replica or malicious boundary node. As a workaround, certified data and certified variables can be used, which are embedded in responses to query calls that provide a layer of validation. However, using certified data and variables requires extra work for developers and sometimes does not fit into a developer's workflow seamlessly. 

To enhance the trustworthiness of queries by providing better guarantees against malicious attacks, we're excited to announce the release of replica signed queries! 

## What are replica signed queries?

Replica signed queries are a new feature that introduces replica signatures in query responses. Every response to query call will contain a signature that signs specific parts of the response using the replica's private key. Then, query responses can be validated by fetching the replica's public key from the subnet's state tree, reading the public key of the signing replica, then verifying the signature.

This new feature includes two primary changes: first, the subnet state tree now exposes the public keys of the replicas, then query responses will now contain a signature. 

Having a single replica signature in a query response doesn't completely solve the problem that query responses cannot be trusted, however, replica signed queries do help improve the security of queries since the recipient can validate that the response came from a replica on the correct subnet. The primary goal of this feature is to provide better guarantees against malicious boundary nodes, since replica signed queries make it impossible for a malicious boundary node to return false data. 

## How do replica signed queries work?

First, a list of node IDs and their corresponding public keys is put into the subnet's state tree. The `node_signing_public_key` value is used for signing query replies. This value is stored in the registry, then populated into the ReplicatedState field `NodePublicKeys` through a `get_crypto_key_for_node` call to the registry that returns the public keys for the subnet's nodes. 

Users can obtain the certificate to validate the node's keys through an HTTP `read_state` call that includes a timestamp value. 

To support replica signed queries, the query response format has been changed. Previously, query responses used the following format:

```
pub enum HttpQueryResponse {
    Replied {
        reply: HttpQueryResponseReply,
    },
    Rejected {
        error_code: String,
        reject_code: u64,
        reject_message: String,
    },
}
```

The actual portion of the call that is signed is the HttpQueryResponse from the execution of the call. If the call is replied to, the `reply` field is included. If the call is rejected, the `error_code`, `reject_code`, and `reject_message` fields will be included in the response. 

Queries also include a request ID, which is a SHA256 hash of the query's contents. With this `request_id` value, signatures for one query cannot be confused or exchanged for another.  Query responses will also include a timestamp value. 

Query responses will now use the following format:

```
struct  NodeSignature {
    // the batch time
    timestamp: Time,
    // the actual signature
    signature: Blob,
    // the ID of the node that created the signature
    identity: NodeId
    }
pub enum HttpQueryResponse {
Replied {
    reply: HttpQueryResponseReply,
    signatures: Vec<NodeSignature>,
},
Rejected {
    error_code: String,
    reject_code: u64,
    signatures: Vec<NodeSignature>,
},
}
```

Query response verification is one via agents, such as agent-rs and agent-js, and other agents developed by members of the IC community. Agents now introduce a new `AgentError` type that indicates a verification failure. 

In agent-rs, query response is defined in the file `ic-agent/src/agent/replica_api.rs` as follows:

```
pub struct CallReply {
   #[serde(with = "serde_bytes")]
   pub arg: Vec<u8>,
   pub signatures: Vec<NodeSignature>,
}
#[derive(Debug, Clone, Serialize, Deserialize, Ord, PartialOrd, Eq, PartialEq)]
pub struct RejectResponse {
    /// The [reject code] returned by the replica.
    pub reject_code: RejectCode,
    /// The rejection message.
    pub reject_message: String,
    /// The optional [error code]returned by the replica.
    #[serde(default)]
    pub error_code: Option<String>,
    pub signatures: Vec<NodeSignature>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(tag = "status")]
pub enum QueryResponse {
   #[serde(rename = "replied")]
   Replied { reply: CallReply },
   #[serde(rename = "rejected")]
   Rejected(RejectResponse),
}
```

Replica signed queries are supported in agent-rs [versions v0.30.0](https://github.com/dfinity/agent-rs/releases) and newer.

In agent-js, query response is defined in the file `agent-js/packages/agent/src/agent/api.ts` as follows:

```
export type QueryResponse = QueryResponseReplied | QueryResponseRejected;
	
	export const enum QueryResponseStatus {
	 Replied = 'replied',
	 Rejected = 'rejected',
	}
	
	export interface QueryResponseBase {
	 	status: QueryResponseStatus;
               signatures: Array<NodeSignature>;
	}
	
	export interface QueryResponseReplied extends QueryResponseBase {
	 status: QueryResponseStatus.Replied;
	 reply: { arg: ArrayBuffer };
	}
	
	export interface QueryResponseRejected extends QueryResponseBase {
	 status: QueryResponseStatus.Rejected;
	 reject_code: ReplicaRejectCode;
	 reject_message: string;
	}
```

Replica signed queries are supported in agent-js [versions v0.20.0](https://github.com/dfinity/agent-js/releases) and newer.

## How are query responses verified? 

To verify a replica signed query, first the agent requests the path `/subnet` in a read state call that is separate to `/api/v2/canister/<effective_canister_id>/read_state` to get the certificate. A boundary node routes this call to the subnet that hosts the canister. A subnet's state tree only contains the keys of its own nodes. All node keys are cached.

Then, to verify the certificate, the timestamp stored at `/time` of the node keys will be checked to assure that the nodes are still within the subnet. The agent can look up the key of the node that is present in the query response signature, either from the cache or the `read_state` response. Once the node's public key is obtained, the client can verify the signature against the hash of the response's relevant fields. 

## Conclusion

In conclusion, replica signed queries are a new feature that aims to provide a level of trustworthiness to query calls by preventing malicious attacks that may alter the response of a query call. 

Replica signed queries are available in agent-js [versions v0.20.0](https://github.com/dfinity/agent-js/releases) and newer, agent-rs [versions v0.30.0](https://github.com/dfinity/agent-rs/releases) and newer, and dfx [versions v0.15.2](https://github.com/dfinity/sdk/releases) and newer. 







