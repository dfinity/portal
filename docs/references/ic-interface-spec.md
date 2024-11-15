import Changelog from './_attachments/interface-spec-changelog.md';

# The Internet Computer Interface Specification


## Introduction

Welcome to *the Internet Computer*! We speak of "the" Internet Computer, because although under the hood a large number of physical computers are working together in a blockchain protocol, in the end we have the appearance of a single, shared, secure and world-wide accessible computer. Developers who want to build decentralized applications (or *dapps* for short) that run on the Internet Computer blockchain and end-users who want to use those dapps need to know very little, if anything, about the underlying protocol. However, knowing some details about the interfaces that the Internet Computer exposes can allow interested developers and architects to take fuller advantages of the unique features that the Internet Computer provides.

### Target audience

This document describes this *external* view of the Internet Computer, i.e. the low-level interfaces it provides to dapp developers and users, and what will happen when they use these interfaces.

:::note

While this document describes the external interface and behavior of the Internet Computer, it is not intended as end-user or end-developer documentation. Most developers will interact with the Internet Computer through additional tooling like the SDK, Canister Development Kits and Motoko. Please see the [developer docs](https://internetcomputer.org/docs/current/home) for suitable documentation.

:::

The target audience of this document are

-   those who use these low-level interfaces (e.g. implement agents, canister developments kits, emulators, other tooling).

-   those who implement these low-level interfaces (e.g. developers of the Internet Computer implementation)

-   those who want to understand the intricacies of the Internet Computer's behavior in great detail (e.g. to do a security analysis)

:::note

This document is a rigorous, technically dense reference. It is not an introduction to the Internet Computer, and as such most useful to those who understand the high-level concepts. Please see more high-level documentation first.

:::

### Scope of this document

If you think of the Internet Computer as a distributed engine that executes WebAssembly-based dapps, then this document describes exclusively the aspect of executing those dapps. To the extent possible, this document will *not* talk about consensus protocols, nodes, subnets, orthogonal persistence or governance.

This document tries to be implementation agnostic: It would apply just as well to a (hypothetical) compatible reimplementation of the Internet Computer. This implies that this document does not cover interfaces towards those running the Internet Computer (e.g. data center operators, protocol developers, governance users), as topics like node update, monitoring, logging are inherently tied to the actual *implementation* and its architecture.

### Overview of the Internet Computer

Dapps on the Internet Computer, or *IC* for short, are implemented as *canister smart contracts*, or *canisters* for short. If you want to build on the Internet Computer as a dapp developer, you first create a *canister module* that contains the WebAssembly code and configuration for your dapp, and deploy it using the [HTTPS interface](#http-interface). You can create canister modules using the Motoko language and the SDK, which is more convenient. If you want to use your own tooling, however, then this document describes [what a canister module looks like](#canister-module-format) and how the [WebAssembly code can interact with the IC](#system-api).

Once your dapp is running on the Internet Computer, it is a canister smart contract, and users can interact with it. They can use the [HTTPS interface](#http-interface) to interact with the canister according to the [System API](#system-api).

The user can also use the HTTPS interface to issue read-only queries, which are faster, but cannot change the state of a canister.

```plantuml
    actor Developer
    actor User
    participant "Internet Computer" as IC
    participant "Canister 1" as Can1
    Developer -> IC : /submit create canister
    create Can1
    IC -> Can1 : create
    Developer <-- IC : canister-id=1
    Developer -> IC : /submit install module
    IC -> Can1 : initialize
    |||
    User -> IC : /submit call "hello"
    IC -> Can1 : hello
    return "Hello world!"
    User <-- IC : "Hello World!"
```
**A typical use of the Internet Computer. (This is a simplified view; some of the arrows represent multiple interaction steps or polling.)**

Sections "[HTTPS Interface](#http-interface)" and "[Canister interface (System API)](#system-api)" describe these interfaces, together with a brief description of what they do. Afterwards, you will find a [more formal description](#abstract-behavior) of the Internet Computer that describes its abstract behavior with more rigor.

### Nomenclature

To get some consistency in this document, we try to use the following terms with precision:

We avoid the term "client", as it could be the client of the Internet Computer or the client inside the distributed network that makes up the Internet Computer. Instead, we use the term *user* to denote the external entity interacting with the Internet Computer, even if in most cases it will be some code (sometimes called "agent") acting on behalf of a (human) user.

The public entry points of canisters are called *methods*. Methods can be declared to be either *update methods* (state mutation is preserved, can call update and query methods of arbitrary canisters), *query methods* (state mutation is discarded, no further calls can be made), or *composite query* methods (state mutation is discarded, can call query and composite query methods of canisters on the same subnet).

Methods can be *called*, from *caller* to *callee*, and will eventually incur a *response* which is either a *reply* or a *reject*. A method may have *parameters*, which are provided with concrete *arguments* in a method call.

External calls can be update calls, which can *only* call update and query methods, and query calls, which can *only* call query and composite query methods. Inter-canister calls issued while evaluating an update call can call update and query methods (just like update calls). Inter-canister calls issued while evaluating a query call (to a composite query method) can call query and composite query methods (just like query calls). Note that calls from a canister to itself also count as "inter-canister". Update and query call offer a security/efficiency trade-off.
Update calls are executed in *replicated* mode, i.e. execution takes place in parallel on multiple replicas who need to arrive at a consensus on what the result of the call is. Query calls are fast but offer less guarantees since they are executed in *non-replicated* mode, by a single replica.

Internally, a call or a response is transmitted as a *message* from a *sender* to a *receiver*. Messages do not have a response.

WebAssembly *functions* are exported by the WebAssembly module or provided by the System API. These are *invoked* and can either *trap* or *return*, possibly with a return value. Functions, too, have parameters and take arguments.

External *users* interact with the Internet Computer by issuing *requests* on the HTTPS interface. Requests have responses which can either be replies or rejects. Some requests cause internal messages to be created.

Canisters and users are identified by a *principal*, sometimes also called an *id*.

## Pervasive concepts

Before going into the details of the four public interfaces described in this document (namely the agent-facing [HTTPS interface](#http-interface), the canister-facing [System API](#system-api), the [virtual Management canister](#ic-management-canister) and the [System State Tree](#state-tree)), this section introduces some concepts that transcend multiple interfaces.

### Unspecified constants and limits

This specification may refer to certain constants and limits without specifying their concrete value (yet), i.e. they are implementation defined. Many are resource limits which are relevant only to specify the error-handling behavior of the IC (which, as mentioned above, is also not yet precisely described in this document). This list is not complete.

-   `MAX_CYCLES_PER_MESSAGE`

    Amount of cycles that a canister has to have before a message is attempted to be executed, which is deducted from the canister balance before message execution. See [Message execution](#rule-message-execution).

-   `MAX_CYCLES_PER_RESPONSE`

    Amount of cycles that the IC sets aside when a canister performs a call. This is used to pay for processing the response message, and unused cycles after the execution of the response are refunded. See [Message execution](#rule-message-execution).

-   `MAX_CYCLES_PER_QUERY`

    Maximum amount of cycles that can be used in total (across all calls to query and composite query methods and their callbacks) during evaluation of a query call.

-   `CHUNK_STORE_SIZE`

    Maximum number of chunks that can be stored within the chunk store of a canister.

-   `MAX_CHUNKS_IN_LARGE_WASM`

    Maximum number of chunks that can comprise a large Wasm module.

-   `DEFAULT_PROVISIONAL_CYCLES_BALANCE`

    Amount of cycles allocated to a new canister by default, if not explicitly specified. See [IC method](#ic-provisional_create_canister_with_cycles).

-   `MAX_CALL_DEPTH_COMPOSITE_QUERY`

    Maximum nesting level of calls during evaluation of a query call to a composite query method.

-   `MAX_WALL_CLOCK_TIME_COMPOSITE_QUERY`

    Maximum wall clock time spent on evaluation of a query call.

### Principals {#principal}

Principals are generic identifiers for canisters, users and possibly other concepts in the future. As far as most uses of the IC are concerned they are *opaque* binary blobs with a length between 0 and 29 bytes, and there is intentionally no mechanism to tell canister ids and user ids apart.

There is, however, some structure to them to encode specific authentication and authorization behavior.

#### Special forms of Principals {#id-classes}

In this section, `H` denotes SHA-224, `·` denotes blob concatenation and `|p|` denotes the length of `p` in bytes, encoded as a single byte.

There are several classes of ids:

1.  *Opaque ids*.

    These are always generated by the IC and have no structure of interest outside of it.

:::note

Typically, these end with the byte `0x01`, but users of the IC should not need to care about that.

:::

2.  *Self-authenticating ids*.

    These have the form `H(public_key) · 0x02` (29 bytes).

    An external user can use these ids as the `sender` of a request if they own the corresponding private key. The public key uses one of the encodings described in [Signatures](#signatures).

3.  *Derived ids*

    These have the form `H(|registering_principal| · registering_principal · derivation_nonce) · 0x03` (29 bytes).

    These ids are treated specially when an id needs to be registered. In such a request, whoever requests an id can provide a `derivation_nonce`. By hashing that together with the principal of the caller, every principal has a space of ids that only they can register ids from.

:::note

Derived IDs are currently not explicitly used in this document, but they may be used internally or in the future.

:::

4.  *Anonymous id*

    This has the form `0x04`, and is used for the anonymous caller. It can be used in call and query requests without a signature.

5.  *Reserved ids*

    These have the form of `blob · 0x7f`, `0 ≤ |blob| < 29`.

    These ids can be useful for applications that want to re-use the [Textual representation of principals](#textual-ids) but want to indicate explicitly that the blob does not address any canisters or a user.

When the IC creates a *fresh* id, it never creates a self-authenticating id, reserved id, an anonymous id or an id derived from what could be a canister or user.

#### Textual representation of principals {#textual-ids}

We specify a *canonical textual format* that is recommended whenever principals need to be printed or read in textual format, e.g. in log messages, transactions browser, command line tools, source code.

The textual representation of a blob `b` is `Grouped(Base32(CRC32(b) · b))` where

-   `CRC32` is a four byte check sequence, calculated as defined by ISO 3309, ITU-T V.42, and [elsewhere](https://www.w3.org/TR/2003/REC-PNG-20031110/#5CRC-algorithm), and stored as big-endian, i.e., the most significant byte comes first and then the less significant bytes come in descending order of significance (MSB B2 B1 LSB).

-   `Base32` is the Base32 encoding as defined in [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-6), with no padding character added.

-   The middle dot denotes concatenation.

-   `Grouped` takes an ASCII string and inserts the separator `-` (dash) every 5 characters. The last group may contain less than 5 characters. A separator never appears at the beginning or end.

The textual representation is conventionally printed with *lower case letters*, but parsed case-insensitively.

Because the maximum size of a principal is 29 bytes, the textual representation will be no longer than 63 characters (10 times 5 plus 3 characters with 10 separators in between them).

:::tip

The canister with id `0xABCD01` has check sequence `0x233FF206` ([online calculator](https://crccalc.com/?crc=ABCD01&method=crc32&datatype=hex&outtype=hex)); the final id is thus `em77e-bvlzu-aq`.

Example encoding from hex, and decoding to hex, in bash (the following can be pasted into a terminal as is):
```
function textual_encode() {
  ( echo "$1" | xxd -r -p | /usr/bin/crc32 /dev/stdin; echo -n "$1" ) |
  xxd -r -p | base32 | tr A-Z a-z |
  tr -d = | fold -w5 | paste -sd'-' -
}

function textual_decode() {
  echo -n "$1" | tr -d - | tr a-z A-Z |
  fold -w 8 | xargs -n1 printf '%-8s' | tr ' ' = |
  base32 -d | xxd -p | tr -d '\n' | cut -b9- | tr a-z A-Z
}
```

:::

### Canister lifecycle {#canister-lifecycle}

Dapps on the Internet Computer are called *canisters*. Conceptually, they consist of the following pieces of state:

-   A canister id (a [principal](#principal))

-   Their *controllers* (a possibly empty list of [principal](#principal))

-   A cycle balance

-   A reserved cycles balance, which are cycles set aside from the main cycle balance for resource payments.

-   The *canister status*, which is one of `running`, `stopping` or `stopped`.

-   Resource reservations

A canister can be *empty* (e.g. directly after creation) or *non-empty*. A non-empty canister also has

-   code, in the form of a canister module

-   state (memories, globals etc.)

-   possibly further data that is specific to the implementation of the IC (e.g. queues)

Canisters are empty after creation and uninstallation, and become non-empty through [code installation](#ic-install_code).

If an empty canister receives a response, that response is dropped, as if the canister trapped when processing the response. The cycles set aside for its processing and the cycles carried on the responses are added to the canister's *cycles* balance.

#### Canister cycles {#canister-cycles}

The IC relies on *cycles*, a utility token, to manage its resources. A canister pays for the resources it uses from its *cycle balances*. A *cycle\_balance* is stored as 128-bit unsigned integers and operations on them are saturating. In particular, if *cycles* are added to a canister that would bring its main cycle balance beyond 2<sup>128</sup>-1, then the balance will be capped at 2<sup>128</sup>-1 and any additional cycles will be lost.

When both the main and the reserved cycles balances of a canister fall to zero, the canister is *deallocated*. This has the same effect as

-   uninstalling the canister (as described in [IC method](#ic-uninstall_code))

-   setting all resource reservations to zero

Afterwards the canister is empty. It can be reinstalled after topping up its main balance.

:::note

Once the IC frees the resources of a canister, its id, *cycle* balances, *controllers*, canister *version*, and the total number of canister changes are preserved on the IC for a minimum of 10 years. What happens to the canister after this period is currently unspecified.

:::

#### Canister status {#canister-status}

The canister status can be used to control whether the canister is processing calls:

-   In status `running`, calls to the canister are processed as normal.

-   In status `stopping`, calls to the canister are rejected by the IC with reject code `CANISTER_ERROR` (5), but responses to the canister are processed as normal.

-   In status `stopped`, calls to the canister are rejected by the IC with reject code `CANISTER_ERROR` (5), and there are no outstanding responses.

In all cases, calls to the [management canister](#ic-management-canister) are processed, regardless of the state of the managed canister.

The controllers of the canister can initiate transitions between these states using [`stop_canister`](#ic-stop_canister) and [`start_canister`](#ic-start_canister), and query the state using [`canister_status`](#ic-canister_status) (NB: this call returns additional information, such as the cycle balance of the canister). The canister itself can also query its state using [`ic0.canister_status`](#system-api-canister-status).

:::note

This status is orthogonal to whether a canister is empty or not: an empty canister can be in status `running`. Calls to such a canister are still rejected by the IC, but because the canister is empty.

:::

:::note

This status is orthogonal to whether a canister is frozen or not: a frozen canister can be in status `running`. Calls to such a canister are still rejected by the IC, but because the canister is frozen, the returned reject code is `SYS_TRANSIENT`.

:::

### Signatures {#signatures}

Digital signature schemes are used for authenticating messages in various parts of the IC infrastructure. Signatures are domain separated, which means that every message is prefixed with a byte string that is unique to the purpose of the signature.

The IC supports multiple signature schemes, with details given in the following subsections. For each scheme, we specify the data encoded in the public key (which is always DER-encoded, and indicates the scheme to use) as well as the form of the signatures (which are opaque blobs for the purposes of the rest of this specification).

In all cases, the signed *payload* is the concatenation of the domain separator and the message. All uses of signatures in this specification indicate a domain separator, to uniquely identify the purpose of the signature. The domain separators are prefix-free by construction, as their first byte indicates their length.

#### Ed25519 and ECDSA signatures {#ecdsa}

Plain signatures are supported for the schemes

-   [**Ed25519**](https://ed25519.cr.yp.to/index.html) or

-   [**ECDSA**](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-4.pdf) on curve P-256 (also known as `secp256r1`), using SHA-256 as hash function, as well as on the Koblitz curve `secp256k1`.

-   Public keys must be valid for signature schemes Ed25519 or ECDSA and are encoded as DER.

    -   See [RFC 8410](https://datatracker.ietf.org/doc/html/rfc8410) for DER encoding of Ed25519 public keys.

    -   See [RFC 5480](https://datatracker.ietf.org/doc/html/rfc5480) for DER encoding of ECDSA public keys; the DER encoding must not specify a hash function. For curve `secp256k1`, the OID 1.3.132.0.10 is used. The points must be specified in uncompressed form (i.e. `0x04` followed by the big-endian 32-byte encodings of `x` and `y`).

-   The signatures are encoded as the concatenation of the 32-byte big endian encodings of the two values *r* and *s*.

#### Web Authentication {#webauthn}

The allowed signature schemes for web authentication are

-   [**ECDSA**](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-4.pdf) on curve P-256 (also known as `secp256r1`), using SHA-256 as hash function.

-   [**RSA PKCS\#1v1.5 (RSASSA-PKCS1-v1\_5)**](https://datatracker.ietf.org/doc/html/rfc8017#section-8.2), using SHA-256 as hash function.

The signature is calculated by using the payload as the challenge in the web authentication assertion.

The signature is checked by verifying that the `challenge` field contains the [base64url encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-5) of the payload, and that `signature` verifies on `authenticatorData · SHA-256(utf8(clientDataJSON))`, as specified in the [WebAuthn w3c recommendation](https://www.w3.org/TR/webauthn/#op-get-assertion).

-   The public key is encoded as a DER-wrapped COSE key.

    It uses the `SubjectPublicKeyInfo` type used for other types of public keys (see, e.g., [RFC 8410, Section 4](https://datatracker.ietf.org/doc/html/rfc8410#section-4)), with OID 1.3.6.1.4.1.56387.1.1 (iso.org.dod.internet.private.enterprise.dfinity.mechanisms.der-wrapped-cose). The `BIT STRING` field `subjectPublicKey` contains the COSE encoding. See [WebAuthn w3c recommendation](https://www.w3.org/TR/webauthn/#sctn-encoded-credPubKey-examples) or [RFC 8152](https://datatracker.ietf.org/doc/html/rfc8152#section-13.1) for details on the COSE encoding.

:::tip

A DER wrapping of a COSE key is shown below. It can be parsed via the command `sed "s/#.*//" | xxd -r -p | openssl asn1parse -inform der`.

    30 5E                                       # SEQUENCE of length 94 bytes
      30 0C                                     # SEQUENCE of length 12 bytes
        06 0A 2B 06 01 04 01 83 B8 43 01 01     # OID 1.3.6.1.4.1.56387.1.1
      03 4E 00                                  # BIT STRING encoding of length 78,
        A501 0203 2620 0121 5820 7FFD 8363 2072 #    length is at byte boundary
        FD1B FEAF 3FBA A431 46E0 EF95 C3F5 5E39 #    contents is a valid COSE key
        94A4 1BBF 2B51 74D7 71DA 2258 2032 497E #    with ECDSA on curve P-256
        ED0A 7F6F 0009 2876 5B83 1816 2CFD 80A9
        4E52 5A6A 368C 2363 063D 04E6 ED

You can also view the wrapping in [an online ASN.1 JavaScript decoder](https://lapo.it/asn1js/#MF4wDAYKKwYBBAGDuEMBAQNOAKUBAgMmIAEhWCB__YNjIHL9G_6vP7qkMUbg75XD9V45lKQbvytRdNdx2iJYIDJJfu0Kf28ACSh2W4MYFiz9gKlOUlpqNowjYwY9BObt).

:::

-   The signature is a CBOR (see [CBOR](#cbor)) value consisting of a data item with major type 6 ("Semantic tag") and tag value `55799`, followed by a map with three mandatory fields:

    -   `authenticator_data` (`blob`): WebAuthn authenticator data.

    -   `client_data_json` (`text`): WebAuthn client data in JSON representation.

    -   `signature` (`blob`): Signature as specified in the [WebAuthn w3c recommendation](https://www.w3.org/TR/webauthn/#signature-attestation-types), which means DER encoding in the case of an ECDSA signature.

#### Canister signatures {#canister-signatures}

The IC also supports a scheme where a canister can sign a payload by declaring a special "certified variable".

This section makes forward references to other concepts in this document, in particular the section [Certification](#certification).

-   The public key is a DER-wrapped structure that indicates the *signing canister*, and includes a freely choosable seed. Each choice of seed yields a distinct public key for the canister, and the canister can choose to encode information, such as a user id, in the seed.

    More concretely, it uses the `SubjectPublicKeyInfo` type used for other types of public keys (see, e.g., [RFC 8410, Section 4](https://datatracker.ietf.org/doc/html/rfc8410#section-4)), with OID 1.3.6.1.4.1.56387.1.2 (iso.org.dod.internet.private.enterprise.dfinity.mechanisms.canister-signature).

    The `BIT STRING` field `subjectPublicKey` is the blob `|signing_canister_id| · signing_canister_id · seed`, where `|signing_canister_id|` is the one-byte encoding of the the length of the `signing_canister_id` and `·` denotes blob concatenation.

-   The signature is a CBOR (see [CBOR](#cbor)) value consisting of a data item with major type 6 ("Semantic tag") and tag value `55799`, followed by a map with two mandatory fields:

    -   `certificate` (`blob`): A CBOR-encoded certificate as per [Encoding of certificates](#certification-encoding).

    -   `tree` (`hash-tree`): A hash tree as per [Encoding of certificates](#certification-encoding).

-   Given a payload together with public key and signature in the format described above the signature can be verified by checking the following two conditions:

    -   The `certificate` must be a valid certificate as described in [Certification](#certification), with
        ```
        lookup_path(["canister", <signing_canister_id>, "certified_data"], certificate.tree) = Found (reconstruct(tree))
        ```

    where `signing_canister_id` is the id of the signing canister and `reconstruct` is a function that computes a root-hash for the tree.

    -   If the `certificate` includes a subnet delegation, then the `signing_canister_id` must be included in the delegation's canister id range (see [Delegation](#certification-delegation)).

    -   The `tree` must be a `well_formed` tree with
        ```
        lookup_path(["sig", <s>, <m>], tree) = Found ""
        ```

    where `s` is the SHA-256 hash of the `seed` used in the public key and `m` is the SHA-256 hash of the payload.

### Supplementary Technologies {#supplementary-technologies}

#### CBOR {#cbor}

[Concise Binary Object Representation (CBOR)](https://www.rfc-editor.org/rfc/rfc8949) is a data format with a small code footprint, small message size and an extensible interface. CBOR is used extensively throughout the Internet Computer as the primary format for data exchange between components within the system.

[cbor.io](https://cbor.io) and [wikipedia.org](https://en.wikipedia.org/wiki/CBOR) contain a lot of helpful background information and relevant tools. [cbor.me](https://cbor.me) in particular, is very helpful for converting between CBOR hex and diagnostic information.

For example, the following CBOR hex:
```
82 61 61 a1 61 62 61 63
```

Can be converted into the following CBOR diagnostic format:
```
["a", {"b": "c"}]
```

Particular concepts to note from the spec are:

-   [Specification of the CBOR Encoding](https://www.rfc-editor.org/rfc/rfc8949#name-specification-of-the-cbor-e)

-   [CBOR Major Types](https://www.rfc-editor.org/rfc/rfc8949#name-major-types)

-   [CBOR Self-Describe](https://www.rfc-editor.org/rfc/rfc8949#self-describe)

#### CDDL {#cddl}

The [Concise Data Definition Language (CDDL)](https://datatracker.ietf.org/doc/html/rfc8610) is a data description language for CBOR. It is used at various points throughout this document to describe how certain data structures are encoded with CBOR.

## The system state tree {#state-tree}

Parts of the IC state are publicly exposed (e.g. via [Request: Read state](#http-read-state) or [Certified data](#system-api-certified-data)) in a verified way (see [Certification](#certification) for the machinery for certifying). This section describes the content of this system state abstractly.

Conceptually, the system state is a tree with labeled children, and values in the leaves. Equivalently, the system state is a mapping from paths (sequences of labels) to values, where the domain is prefix-free.

Labels are always blobs (but often with a human readable representation). In this document, paths are written suggestively with slashes as separators; the actual encoding is not actually using slashes as delimiters, and labels may contain the 0x2F byte (ASCII `/`) just fine. Values are either natural numbers, text values or blob values.

This section specifies the publicly relevant paths in the tree.

### Time {#state-tree-time}

-   `/time` (natural):

    All partial state trees include a timestamp, expressed in nanoseconds since 1970-01-01, indicating the time at which the state is current.

### Api boundary nodes information {#state-tree-api-bn}

The state tree contains information about all API boundary nodes (the source of truth for these API boundary node records is stored in the NNS registry canister).

- `/api_boundary_nodes/<node_id>/domain` (text)

    Domain name associated with a node. All domains are unique across nodes.
    Example: `api-bn1.example.com`.

- `/api_boundary_nodes/<node_id>/ipv4_address` (text)

    Public IPv4 address of a node in the dotted-decimal notation.
    If no `ipv4_address` is available for the corresponding node, then this path does not exist.  
    Example: `192.168.10.150`.

- `/api_boundary_nodes/<node_id>/ipv6_address` (text)

    Public IPv6 address of a node in the hexadecimal notation with colons.
    Example: `3002:0bd6:0000:0000:0000:ee00:0033:6778`.

### Subnet information {#state-tree-subnet}

The state tree contains information about the topology of the Internet Computer.

-   `/subnet/<subnet_id>/public_key` (blob)

    The public key of the subnet (a DER-encoded BLS key, see [Certification](#certification))

-   `/subnet/<subnet_id>/canister_ranges` (blob)

    The set of canister ids assigned to this subnet, represented as a list of closed intervals of canister ids, ordered lexicographically, and encoded as CBOR (see [CBOR](#cbor)) according to this CDDL (see [CDDL](#cddl)):
    ```
    canister_ranges = tagged<[*canister_range]>
    canister_range = [principal principal]
    principal = bytes .size (0..29)
    tagged<t> = #6.55799(t) ; the CBOR tag
    ```

-   `/subnet/<subnet_id>/metrics` (blob)

     A collection of subnet-wide metrics related to this subnet's current resource usage and/or performance. The metrics are a CBOR map with the following fields:

     - `num_canisters` (`nat`): The number of canisters on this subnet.
     - `canister_state_bytes` (`nat`): The total size of the state in bytes taken by canisters on this subnet since this subnet was created.
     - `consumed_cycles_total` (`map`): The total number of cycles consumed by all current and deleted canisters on this subnet. It's a map of two values, a low part of type `nat` and a high part of type `opt nat`.
     - `update_transactions_total` (`nat`): The total number of transactions processed on this subnet since this subnet was created.


:::note

Because this uses the lexicographic ordering of princpials, and the byte distinguishing the various classes of ids is at the *end*, this range by construction conceptually includes principals of various classes. This specification needs to take care that the fact that principals that are not canisters may appear in these ranges does not cause confusion.

:::

-   `/subnet/<subnet_id>/node/<node_id>/public_key` (blob)

    The public key of a node (a DER-encoded Ed25519 signing key, see [RFC 8410](https://tools.ietf.org/html/rfc8410) for reference) with principal `<node_id>` belonging to the subnet with principal `<subnet_id>`.

### Request status {#state-tree-request-status}

For each update call request known to the Internet Computer, its status is in a subtree at `/request_status/<request_id>`. Please see [Overview of canister calling](#http-call-overview) for more details on how update call requests work.

-   `/request_status/<request_id>/status` (text)

    One of `received`, `processing`, `replied`, `rejected` or `done`, see [Overview of canister calling](#http-call-overview) for more details on what each status means.

-   `/request_status/<request_id>/reply` (blob)

    If the status is `replied`, then this path contains the reply blob, else it is not present.

-   `/request_status/<request_id>/reject_code` (natural)

    If the status is `rejected`, then this path contains the reject code (see [Reject codes](#reject-codes)), else it is not present.

-   `/request_status/<request_id>/reject_message` (text)

    If the status is `rejected`, then this path contains a textual diagnostic message, else it is not present.

-   `/request_status/<request_id>/error_code` (text)

    If the status is `rejected`, then this path might be present and contain an implementation-specific error code (see [Error codes](#error-codes)), else it is not present.

:::note

Immediately after submitting a request, the request may not show up yet as the Internet Computer is still working on accepting the request as pending.

:::

:::note

Request statuses will not actually be kept around indefinitely, and eventually the Internet Computer forgets about the request. This will happen no sooner than the request's expiry time, so that replay attacks are prevented.

:::

### Certified data {#state-tree-certified-data}

-   `/canister/<canister_id>/certified_data` (blob):

    The certified data of the canister with the given id, see [Certified data](#system-api-certified-data).

### Canister information {#state-tree-canister-information}

Users have the ability to learn about the hash of the canister's module, its current controllers, and metadata in a certified way.

-   `/canister/<canister_id>/module_hash` (blob):

    If the canister is empty, this path does not exist. If the canister is not empty, it exists and contains the SHA256 hash of the currently installed canister module. Cf. [IC method](#ic-canister_status).

-   `/canister/<canister_id>/controllers` (blob):

    The current controllers of the canister. The value consists of a CBOR (see [CBOR](#cbor)) data item with major type 6 ("Semantic tag") and tag value `55799`, followed by an array of principals in their binary form (CDDL `#6.55799([* bytes .size (0..29)])`, see [CDDL](#cddl)).

-   `/canister/<canister_id>/metadata/<name>` (blob):

    If the canister has a [custom section](https://webassembly.github.io/spec/core/binary/modules.html#custom-section) called `icp:public <name>` or `icp:private <name>`, this path contains the content of the custom section. Otherwise, this path does not exist.

    It is recommended for the canister to have a custom section called "icp:public candid:service", which contains the UTF-8 encoding of [the Candid interface](https://github.com/dfinity/candid/blob/master/spec/Candid.md#core-grammar) for the canister.

## HTTPS Interface {#http-interface}

The concrete mechanism that users use to send requests to the Internet Computer is via an HTTPS API, which exposes four endpoints to handle interactions, plus one for diagnostics:

-   At `/api/v2/canister/<effective_canister_id>/call` the user can submit update calls that are asynchronous and might change the IC state.

-   At `/api/v3/canister/<effective_canister_id>/call` the user can submit update calls and get a synchronous HTTPS response with a certificate for the call status.

-   At `/api/v2/canister/<effective_canister_id>/read_state` or `/api/v2/subnet/<subnet_id>/read_state` the user can read various information about the state of the Internet Computer. In particular, they can poll for the status of a call here.

-   At `/api/v2/canister/<effective_canister_id>/query` the user can perform (synchronous, non-state-changing) query calls.

-   At `/api/v2/status` the user can retrieve status information about the Internet Computer.

In these paths, the `<effective_canister_id>` is the [textual representation](#textual-ids) of the [*effective* canister id](#http-effective-canister-id).

Requests to `/api/v2/canister/<effective_canister_id>/call`, `/api/v3/canister/<effective_canister_id>/call`, `/api/v2/canister/<effective_canister_id>/read_state`, `/api/v2/subnet/<subnet_id>/read_state`, and `/api/v2/canister/<effective_canister_id>/query` are POST requests with a CBOR-encoded request body, which consists of a authentication envelope (as per [Authentication](#authentication)) and request-specific content as described below.

:::note

This document does not yet explain how to find the location and port of the Internet Computer.

:::

### Overview of canister calling {#http-call-overview}

Users interact with the Internet Computer by calling canisters. By the very nature of a blockchain protocol, they cannot be acted upon immediately, but only with a delay. Moreover, the actual node that the user talks to may not be honest or, for other reasons, may fail to get the request on the way.

The Internet Computer has two HTTPS APIs for canister calling:
- [*Asynchronous*](#http-async-call-overview) canister calling, where the user must poll the Internet Computer for the status of the canister call by _separate_ HTTPS requests.
- [*Synchronous*](#http-sync-call-overview) canister calling, where the status of the canister call is in the response of the original HTTPS request.

#### Asynchronous canister calling {#http-async-call-overview}

1.  A user submits a call via the [HTTPS Interface](#http-interface). No useful information is returned in the immediate response (as such information cannot be trustworthy anyways).

2.  For a certain amount of time, the IC behaves as if it does not know about the call.

3.  The IC asks the targeted canister if it is willing to accept this message and be charged for the expense of processing it. This uses the [Ingress message inspection](#system-api-inspect-message) API for normal calls. For calls to the management canister, the rules in [The IC management canister](#ic-management-canister) apply.

4.  At some point, the IC may accept the call for processing and set its status to `received`. This indicates that the IC as a whole has received the call and plans on processing it (although it may still not get processed if the IC is under high load). Furthermore, the user should also be able to ask any endpoint about the status of the pending call.

5.  Once it is clear that the call will be acted upon (sufficient resources, call not yet expired), the status changes to `processing`. Now the user has the guarantee that the request will have an effect, e.g. it will reach the target canister.

6.  The IC is processing the call. For some calls this may be atomic, for others this involves multiple internal steps.

7.  Eventually, a response will be produced, and can be retrieved for a certain amount of time. The response is either a `reply`, indicating success, or a `reject`, indicating some form of error.

8.  In the case that the call has been retained for long enough, but the request has not expired yet, the IC can forget the response data and only remember the call as `done`, to prevent a replay attack.

9.  Once the expiry time is past, the IC can prune the call and its response, and completely forget about it.

This yields the following interaction diagram:
```plantuml
    (*) --> "User creates call" #DDDDDD
       --> "Submitted to node\n(with 202 response)" as submit #DDDDDD
       --> "received"
       --> "processing"
    if "" as X then
      --> "replied"
      --> "done"
      else
      --> "rejected (canister)"
      --> "done"

      "X"        --> "rejected (system)"
      "received" --> "rejected (system)"
                 --> "done"

      "received" --> "pruned" #DDDDDD
      "submit" --> "dropped" #DDDDDD
      "done" --> "pruned" #DDDDDD

    endif
```
State transitions may be instantaneous and not always externally visible. For example, the state of a request may move from `received` via `processing` to `replied` in one go. Similarly, the IC may not implement the `done` state at all, and keep calls in state `replied`/`rejected` until they are pruned.

All gray states are *not* explicitly represented in the state of the IC, and are indistinguishable from "call does not exist".

The characteristic property of the `received` state is that the call has made it past the (potentially malicious) endpoint *into the state of the IC*. It is now pointless (but harmless) to submit the (identical) call again. Before reaching that state, submitting the identical call to further nodes might be a useful safeguard against a malicious or misbehaving node.

The characteristic property of the `processing` state is that *the initial effect of the call has happened or will happen*. This is best explained by an example: Consider a counter canister. It exports a method `inc` that increases the counter. Assume that the canister is bug free, and is not going to be forcibly removed. A user submits a call to call `inc`. If the user sees request status `processing`, the state change is guaranteed to happen. The user can stop monitoring the status and does not have to retry submitting.

A call may be rejected by the IC or the canister. In either case, there is no guarantee about how much processing of the call has happened.

To avoid replay attacks, the transition from `done` or `received` to `pruned` must happen no earlier than the call's `ingress_expiry` field.

Calls must stay in `replied` or `rejected` long enough for polling users to catch the response.

When asking the IC about the state or call of a request, the user uses the request id (see [Request ids](#request-id)) to read the request status (see [Request status](#state-tree-request-status)) from the state tree (see [Request: Read state](#http-read-state)).

#### Synchronous canister calling {#http-sync-call-overview}

A synchronous update call, also known as a "call and await", is a type of update call where the replica will attempt to respond to the HTTPS request with a certificate of the call status. If the returned certificate indicates that the update call is in a terminal state (`replied`, `rejected`, or `done`), then the user __does not need to poll__ (using [`read_state`](#http-read-state) requests) to determine the result of the call. A terminal state means the call has completed its execution.

The synchronous call endpoint is useful for users as it removes the networking overhead of polling the IC to determine the status of their call.

The replica will maintain the HTTPS connection for the request and will respond once the call status transitions to a terminal state. 

If an implementation specific timeout for the request is reached while the replica waits for the terminal state, then the replica will reply with an empty body and a 202 HTTP status code. In such cases, the user should use [`read_state`](#http-read-state) to determine the status of the call.

### Request: Call {#http-call}

In order to call a canister, the user makes a POST request to `/api/v3/canister/<effective_canister_id>/call`. The request body consists of an authentication envelope with a `content` map with the following fields:

-   `request_type` (`text`): Always `call`

-   `sender`, `nonce`, `ingress_expiry`: See [Authentication](#authentication)

-   `canister_id` (`blob`): The principal of the canister to call.

-   `method_name` (`text`): Name of the canister method to call.

-   `arg` (`blob`): Argument to pass to the canister method.

The HTTP response to this request can have the following forms:

-   200 HTTP status with a non-empty body. This status is returned if the canister call completed within an implementation-specific timeout or was rejected within an implementation-specific timeout.
    
    -   If the update call completed, a certificate for the state of the update call is produced, and returned in a CBOR (see [CBOR](#cbor)) map with the fields specified below:

        -   `status` (`text`): `"replied"`

        -   `certificate` (`blob`):  A certificate (see [Certification](#certification)) with subtrees at `/request_status/<request_id>` and `/time`, where `<request_id>` is the [request ID](#request-id) of the update call. See [Request status](#state-tree-request-status) for more details on the request status.

    -   If a non-replicated pre-processing error occurred (e.g., due to the [canister inspect message](#system-api-inspect-message)), then a body with information about the IC specific error encountered is returned. The body is a CBOR map with the following fields:

        -   `status` (`text`): `"non_replicated_rejection"`

        -   `reject_code` (`nat`): The reject code (see [Reject codes](#reject-codes)).

        -   `reject_message` (`text`): a textual diagnostic message.

        -   `error_code` (`text`): an optional implementation-specific textual error code (see [Error codes](#error-codes)).

-   202 HTTP status with an empty body. This status is returned if an implementation-specific timeout is reached before the canister call completes. Users should use [`read_state`](#http-read-state) to determine the status of the call.

-   4xx HTTP status for client errors (e.g. malformed request). Except for 429 HTTP status, retrying the request will likely have the same outcome.

-   5xx HTTP status when the server has encountered an error or is otherwise incapable of performing the request. The request might succeed if retried at a later time.

This request type can *also* be used to call a query method (but not a composite query method). A user may choose to go this way, instead of via the faster and cheaper [Request: Query call](#http-query) below, if they want to get a *certified* response. Note that the canister state will not be changed by sending a call request type for a query method (except for cycle balance change due to message execution).

### Request: Asynchronous Call {#http-async-call}

In order to call a canister, the user makes a POST request to `/api/v2/canister/<effective_canister_id>/call`. The request body consists of an authentication envelope with a `content` map with the following fields:

-   `request_type` (`text`): Always `call`

-   `sender`, `nonce`, `ingress_expiry`: See [Authentication](#authentication)

-   `canister_id` (`blob`): The principal of the canister to call.

-   `method_name` (`text`): Name of the canister method to call

-   `arg` (`blob`): Argument to pass to the canister method

The HTTP response to this request can have the following responses:

-   202 HTTP status with empty body. Implying the request was accepted by the IC for further processing. Users should use [`read_state`](#http-read-state) to determine the status of the call.

-   200 HTTP status with non-empty body. Implying an execution pre-processing error occurred. The body of the response contains more information about the IC specific error encountered. The body is a CBOR map with the following fields:

    -   `reject_code` (`nat`): The reject code (see [Reject codes](#reject-codes)).

    -   `reject_message` (`text`): a textual diagnostic message.

    -   `error_code` (`text`): an optional implementation-specific textual error code (see [Error codes](#error-codes)).

-   4xx HTTP status for client errors (e.g. malformed request). Except for 429 HTTP status, retrying the request will likely have the same outcome.

-   5xx HTTP status when the server has encountered an error or is otherwise incapable of performing the request. The request might succeed if retried at a later time.

This request type can *also* be used to call a query method (but not a composite query method). A user may choose to go this way, instead of via the faster and cheaper [Request: Query call](#http-query) below, if they want to get a *certified* response. Note that the canister state will not be changed by sending a call request type for a query method (except for cycle balance change due to message execution).

:::note

The functionality exposed via the [The IC management canister](#ic-management-canister) can be used this way.

:::

### Request: Read state {#http-read-state}

:::note

Requesting paths with the prefix `/subnet` at `/api/v2/canister/<effective_canister_id>/read_state` might be deprecated in the future. Hence, users might want to point their requests for paths with the prefix `/subnet` to `/api/v2/subnet/<subnet_id>/read_state`.

On the IC mainnet, the root subnet ID `tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe` can be used to retrieve the list of all IC mainnet's subnets by requesting the prefix `/subnet` at `/api/v2/subnet/tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe/read_state`.

:::

In order to read parts of the [The system state tree](#state-tree), the user makes a POST request to `/api/v2/canister/<effective_canister_id>/read_state` or `/api/v2/subnet/<subnet_id>/read_state`. The subnet form should be used when the information to be retrieved is subnet specific, i.e., when requesting paths with the prefix `/time` or `/subnet`, and the subnet form must be used when requesting paths of the form `/subnet/<subnet_id>/metrics`. The request body consists of an authentication envelope with a `content` map with the following fields:

-   `request_type` (`text`): Always `read_state`

-   `sender`, `nonce`, `ingress_expiry`: See [Authentication](#authentication)

-   `paths` (sequence of paths): A list of at most 1000 paths, where a path is itself a sequence of at most 127 blobs.

The HTTP response to this request consists of a CBOR (see [CBOR](#cbor)) map with the following fields:

-   `certificate` (`blob`): A certificate (see [Certification](#certification)).

    If this `certificate` includes a subnet delegation (see [Delegation](#certification-delegation)), then

    - for requests to `/api/v2/canister/<effective_canister_id>/read_state`, the `<effective_canister_id>` must be included in the delegation's canister id range,

    - for requests to `/api/v2/subnet/<subnet_id>/read_state`, the `<subnet_id>` must match the delegation's subnet id.

The returned certificate reveals all values whose path has a requested path as a prefix except for

-   paths with prefix `/subnet/<subnet_id>/node` which are only contained in the returned certificate if `<effective_canister_id>` belongs to the canister ranges of the subnet `<subnet_id>`, i.e., if `<effective_canister_id>` belongs to the value at the path `/subnet/<subnet_id>/canister_ranges` in the state tree.

The returned certificate also always reveals `/time`, even if not explicitly requested.

:::note

The returned certificate might also reveal the SHA-256 hashes of values whose paths have not been requested
and whose paths might not even be allowed to be requested by the sender of the HTTP request.
This means that unauthorized users might obtain the SHA-256 hashes of ingress message responses
and private custom sections of the canister's module.
Hence, users are advised to use cryptographically strong nonces in their HTTP requests and
canister developers that aim at keeping data confidential are advised to add a secret cryptographic salt to their canister's responses and private custom sections.

:::

All requested paths must have the following form:

-   `/time`. Can always be requested.

-   `/api_boundary_nodes`, `/api_boundary_nodes/<node_id>`, `/api_boundary_nodes/<node_id>/domain`,  `/api_boundary_nodes/<node_id>/ipv4_address`, `/api_boundary_nodes/<node_id>/ipv6_address`. Can always be requested.

-   `/subnet`, `/subnet/<subnet_id>`, `/subnet/<subnet_id>/public_key`, `/subnet/<subnet_id>/canister_ranges`, `/subnet/<subnet_id>/node`, `/subnet/<subnet_id>/node/<node_id>`, `/subnet/<subnet_id>/node/<node_id>/public_key`. Can always be requested.

-   `/subnet/<subnet_id>/metrics`. Can be requested at `/api/v2/subnet/<subnet_id>/read_state` (i.e., if the `<subnet_id>` in the URL matches the `<subnet_id>` in the paths). Cannot be requested at `/api/v2/canister/<effective_canister_id>/read_state`.

-   `/request_status/<request_id>`, `/request_status/<request_id>/status`, `/request_status/<request_id>/reply`, `/request_status/<request_id>/reject_code`, `/request_status/<request_id>/reject_message`, `/request_status/<request_id>/error_code`. Can be requested if no path with such a prefix exists in the state tree or

    -   the sender of the original request referenced by `<request_id>` is the same as the sender of the read state request and

    -   the effective canister id of the original request referenced by `<request_id>` matches `<effective_canister_id>`.

-   `/canisters/<canister_id>/module_hash`. Can be requested if `<canister_id>` matches `<effective_canister_id>`.

-   `/canisters/<canister_id>/controllers`. Can be requested if `<canister_id>` matches `<effective_canister_id>`. The order of controllers in the value at this path may vary depending on the implementation.

-   `/canisters/<canister_id>/metadata/<name>`. Can be requested if `<canister_id>` matches `<effective_canister_id>`, `<name>` is encoded in UTF-8, and

    -   canister with canister id `<canister_id>` does not exist or

    -   canister with canister id `<canister_id>` is empty or

    -   canister with canister id `<canister_id>` does not have `<name>` as its custom section or

    -   `<name>` is a public custom section or

    -   `<name>` is a private custom section and the sender of the read state request is a controller of the canister.

Moreover, all paths with prefix `/request_status/<request_id>` must refer to the same request ID `<request_id>`.

If a path cannot be requested, then the HTTP response to the read state request is undefined.

Note that the paths `/canisters/<canister_id>/certified_data` are not accessible with this method; these paths are only exposed to the canisters themselves via the System API (see [Certified data](#system-api-certified-data)).

See [The system state tree](#state-tree) for details on the state tree.

### Request: Query call {#http-query}

A query call is a fast, but less secure way to call a canister. Only methods that are explicitly marked as "query methods" and "composite query methods" by the canister can be called this way. In contrast to a query method, a composite query method can make further calls to query and composite query methods of canisters on the same subnet.

The following limits apply to the evaluation of a query call:

-   The amount of cycles that are used in total (across all calls to query and composite query methods and their callbacks) during evaluation of a query call is at most `MAX_CYCLES_PER_QUERY`.

-   The maximum nesting level of calls during evaluation of a query call is at most `MAX_CALL_DEPTH_COMPOSITE_QUERY`.

-   The wall clock time spent on evaluation of a query call is at most `MAX_WALL_CLOCK_TIME_COMPOSITE_QUERY`.

:::note

Composite query methods are EXPERIMENTAL and there might be breaking changes of their behavior in the future. Use at your own risk!

:::

In order to make a query call to a canister, the user makes a POST request to `/api/v2/canister/<effective_canister_id>/query`. The request body consists of an authentication envelope with a `content` map with the following fields:

-   `request_type` (`text`): Always `"query"`.

-   `sender`, `nonce`, `ingress_expiry`: See [Authentication](#authentication).

-   `canister_id` (`blob`): The principal of the canister to call.

-   `method_name` (`text`): Name of the canister method to call.

-   `arg` (`blob`): Argument to pass to the canister method.

Canister methods that do not change the canister state (except for cycle balance changes due to message execution) can be executed more efficiently. This method provides that ability, and returns the canister's response directly within the HTTP response.

If the query call resulted in a reply, the response is a CBOR (see [CBOR](#cbor)) map with the following fields:

-   `status` (`text`): `"replied"`

-   `reply`: a CBOR map with the field `arg` (`blob`) which contains the reply data.

-   `signatures` (`[+ node-signature]`): a list containing one node signature for the returned query response.

If the call resulted in a reject, the response is a CBOR map with the following fields:

-   `status` (`text`): `"rejected"`

-   `reject_code` (`nat`): The reject code (see [Reject codes](#reject-codes)).

-   `reject_message` (`text`): a textual diagnostic message.

-   `error_code` (`text`): an optional implementation-specific textual error code (see [Error codes](#error-codes)).

-   `signatures` (`[+ node-signature]`): a list containing one node signature for the returned query response.

:::note

Although `signatures` only contains one node signature, we still declare its type to be a list to prevent future breaking changes
if we include more signatures in a future version of the protocol specification.

:::

The response to a query call contains a list with one signature for the returned response produced by the IC node that evaluated the query call. The signature (whose type is denoted as `node-signature`) is a CBOR (see [CBOR](#cbor)) map with the following fields:

-   `timestamp` (`nat`): the timestamp of the signature.

-   `signature` (`blob`): the actual signature.

-   `identity` (`principal`): the principal of the node producing the signature.

Given a query (the `content` map from the request body) `Q`, a response `R`, and a certificate `Cert` that is obtained by requesting the path `/subnet` in a **separate** read state request to `/api/v2/canister/<effective_canister_id>/read_state`, the following predicate describes when the returned response `R` is correctly signed:
```
verify_response(Q, R, Cert)
  = verify_cert(Cert) ∧
    ((Cert.delegation = NoDelegation ∧ SubnetId = RootSubnetId ∧ lookup(["subnet",SubnetId,"canister_ranges"], Cert) = Found Ranges) ∨
     (SubnetId = Cert.delegation.subnet_id ∧ lookup(["subnet",SubnetId,"canister_ranges"], Cert.delegation.certificate) = Found Ranges)) ∧
    effective_canister_id ∈ Ranges ∧
    ∀ {timestamp: T, signature: Sig, identity: NodeId} ∈ R.signatures.
      lookup(["subnet",SubnetId,"node",NodeId,"public_key"], Cert) = Found PK ∧
      if R.status = "replied" then
        verify_signature PK Sig ("\x0Bic-response" · hash_of_map({
          status: "replied",
          reply: R.reply,
          timestamp: T,
          request_id: hash_of_map(Q)}))
      else
        verify_signature PK Sig ("\x0Bic-response" · hash_of_map({
          status: "rejected",
          reject_code: R.reject_code,
          reject_message: R.reject_message,
          error_code: R.error_code,
          timestamp: T,
          request_id: hash_of_map(Q)}))
```

where `RootSubnetId` is the a priori known principal of the root subnet. Moreover, all timestamps in `R.signatures`, the certificate `Cert`, and its optional delegation must be "recent enough".

:::note

This specification leaves it up to the client to define expiry times for the timestamps in `R.signatures`, the certificate `Cert`, and its optional delegation. A reasonable expiry time for timestamps in `R.signatures` and the certificate `Cert` is 5 minutes (analogously to the maximum allowed ingress expiry enforced by the IC mainnet). Delegations require expiry times of at least a week since the IC mainnet refreshes the delegations only after replica upgrades which typically happen once a week.

:::

### Effective canister id {#http-effective-canister-id}

The `<effective_canister_id>` in the URL paths of requests is the *effective* destination of the request.
It must be contained in the canister ranges of a subnet, otherwise the corresponding HTTP request is rejected.

-   If the request is an update call to the Management Canister (`aaaaa-aa`), then:

    -   If the call is to the `provisional_create_canister_with_cycles` method, then any principal can be used as the effective canister id for this call.

    -   If the call is to the `install_chunked_code` method and the `arg` is a Candid-encoded record with a `target_canister` field of type `principal`, then the effective canister id must be that principal.

    -   Otherwise, if the `arg` is a Candid-encoded record with a `canister_id` field of type `principal`, then the effective canister id must be that principal.

    -   Otherwise, the call is rejected by the system independently of the effective canister id.

-   If the request is a query call to the Management Canister (`aaaaa-aa`), then:

    -   If the `arg` is a Candid-encoded record with a `canister_id` field of type `principal`, then the effective canister id must be that principal.

    -   Otherwise, the call is rejected by the system independently of the effective canister id.

-   If the request is an update or query call to a canister that is not the Management Canister (`aaaaa-aa`), then the effective canister id must be the `canister_id` in the request.

:::note

The expectation is that user-side agent code shields users and developers from the notion of effective canister id, in analogy to how the System API interface shields canister developers from worrying about routing.

The Internet Computer blockchain mainnet does not support `provisional_create_canister_with_cycles` and thus all calls to this method are rejected independently of the effective canister id.

In development instances of the Internet Computer Protocol (e.g. testnets), the effective canister id of a request submitted to a node must be a canister id from the canister ranges of the subnet to which the node belongs.

:::

### Authentication {#authentication}

All requests coming in via the HTTPS interface need to be either *anonymous* or *authenticated* using a cryptographic signature. To that end, the following fields are present in the `content` map in all cases:

-   `nonce` (`blob`, optional): Arbitrary user-provided data of length at most 32 bytes, typically randomly generated. This can be used to create distinct requests with otherwise identical fields.

-   `ingress_expiry` (`nat`, required): An upper limit on the validity of the request, expressed in nanoseconds since 1970-01-01 (like [ic0.time()](#system-api-time)). This avoids replay attacks: The IC will not accept requests, or transition requests from status `received` to status `processing`, if their expiry date is in the past. The IC may refuse to accept requests with an ingress expiry date too far in the future. These rules for ingress expiry apply not only to update calls but all requests alike (and could have been called `request_expiry`), except for anonymous `query` and anonymous `read_state` requests for which the IC may accept any provided expiry timestamp.

-   `sender` (`Principal`, required): The user who issued the request.

The envelope, i.e. the overall request, has the following keys:

-   `content` (`record`): the actual request content

-   `sender_pubkey` (`blob`, optional): Public key used to authenticate this request. Since a user may in the future have more than one key, this field tells the IC which key is used.

-   `sender_delegation` (`array` of maps, optional): a chain of delegations, starting with the one signed by `sender_pubkey` and ending with the one delegating to the key relating to `sender_sig`. Every public key in the chain of delegations should appear exactly once: cycles (a public key delegates to another public key that already previously appeared in the chain) or self-signed delegations (a public key delegates to itself) are not allowed and such requests will be refused by the IC.

-   `sender_sig` (`blob`, optional): Signature to authenticate this request.

The public key must authenticate the `sender` principal:

-   A public key can authenticate a principal if the latter is a self-authenticating id derived from that public key (see [Special forms of Principals](#id-classes)).

-   The fields `sender_pubkey`, `sender_sig`, and `sender_delegation` must be omitted if the `sender` field is the anonymous principal. The fields `sender_pubkey` and `sender_sig` must be set if the `sender` field is not the anonymous principal.

The request id (see [Request ids](#request-id)) is calculated from the content record. This allows the signature to be based on the request id, and implies that signature and public key are not semantically relevant.

The field `sender_pubkey` contains a public key supported by one of the schemes described in [Signatures](#signatures).

Signing transactions can be delegated from one key to another one. If delegation is used, then the `sender_delegation` field contains an array of delegations, each of which is a map with the following fields:

-   `delegation` (`map`): Map with fields:

    -   `pubkey` (`blob`): Public key as described in [Signatures](#signatures).

    -   `expiration` (`nat`): Expiration of the delegation, in nanoseconds since 1970-01-01, analogously to the `ingress_expiry` field above.

    -   `targets` (`array` of `CanisterId`, optional): If this field is set, the delegation only applies for requests sent to the canisters in the list. The list must contain no more than 1000 elements; otherwise, the request will not be accepted by the IC.

-   `signature` (`blob`): Signature on the 32-byte [representation-independent hash](#hash-of-map) of the map contained in the `delegation` field as described in [Signatures](#signatures), using the 27 bytes `\x1Aic-request-auth-delegation` as the domain separator.

    For the first delegation in the array, this signature is created with the key corresponding to the public key from the `sender_pubkey` field, all subsequent delegations are signed with the key corresponding to the public key contained in the preceding delegation.

The `sender_sig` field is calculated by signing the concatenation of the 11 bytes `\x0Aic-request` (the domain separator) and the 32 byte [request id](#request-id) with the secret key that belongs to the key specified in the last delegation or, if no delegations are present, the public key specified in `sender_pubkey`.

The delegation field, if present, must not contain more than 20 delegations.

### Representation-independent hashing of structured data {#hash-of-map}

Structured data, such as (recursive) maps, are authenticated by signing a representation-independent hash of the data. This hash is computed as follows (using SHA256 in the steps below):

1.  For each field that is present in the map (i.e. omitted optional fields are indeed omitted):

    -   concatenate the hash of the field's name (in ascii-encoding, without terminal `\x00`) and the hash of the value (as specified below).

2.  Sort these concatenations from low to high.

3.  Concatenate the sorted elements, and hash the result.

The resulting hash of length 256 bits (32 bytes) is the representation-independent hash.

Field values are hashed as follows:

-   Binary blobs (`canister_id`, `arg`, `nonce`, `module`) are hashed as-is.

-   Strings (`request_type`, `method_name`) are hashed by hashing their binary encoding in UTF-8, without a terminal `\x00`.

-   Natural numbers (`compute_allocation`, `memory_allocation`, `ingress_expiry`) are hashed by hashing their binary encoding using the shortest form [Unsigned LEB128](https://en.wikipedia.org/wiki/LEB128#Unsigned_LEB128) encoding. For example, `0` should be encoded as a single zero byte `[0x00]` and `624485` should be encoded as byte sequence `[0xE5, 0x8E, 0x26]`.

-   Integers are hashed by hashing their encoding using the shortest form [Signed LEB128](https://en.wikipedia.org/wiki/LEB128#Signed_LEB128) encoding. For example, `0` should be encoded as a single zero byte `[0x00]` and `-123456` should be encoded as byte sequence `[0xC0, 0xBB, 0x78]`.

-   Arrays (`paths`) are hashed by hashing the concatenation of the hashes of the array elements.

-   Maps (`sender_delegation`) are hashed by recursively computing their representation-independent hash.

:::tip

Example calculation (where `H` denotes SHA-256 and `·` denotes blob concatenation) of a representation independent hash
for a map with a nested map in a field value:
```
hash_of_map({ "reply": { "arg": "DIDL\x00\x00" } })
  = H(concat (sort [ H("reply") · hash_of_map({ "arg": "DIDL\x00\x00" }) ]))
  = H(concat (sort [ H("reply") · H(concat (sort [ H("arg") · H("DIDL\x00\x00") ])) ]))
```

:::

### Request ids {#request-id}

When signing requests or querying the status of a request (see [Request status](#state-tree-request-status)) in the state tree, the user identifies the request using a *request id*, which is the [representation-independent hash](#hash-of-map) of the `content` map of the original request. A request id must have length of 32 bytes.

:::note

The request id is independent of the representation of the request (currently only CBOR, see [CBOR](#cbor)), and does not change if the specification adds further optional fields to a request type.

:::

:::note

The recommended textual representation of a request id is a hexadecimal string with lower-case letters prefixed with '0x'. E.g., request id consisting of bytes `[00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 0A, 0B, 0C, 0D, 0E, 0F, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 1A, 1B, 1C, 1D, 1E, 1F]` should be displayed as `0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`.

:::

:::tip

Example calculation (where `H` denotes SHA-256 and `·` denotes blob concatenation) in which we assume that the optional nonce is not provided and thus omitted:
```
hash_of_map({ request_type: "call", sender: 0x04, ingress_expiry: 1685570400000000000, canister_id: 0x00000000000004D2, method_name: "hello", arg: "DIDL\x00\xFD*"})
 = H(concat (sort
   [ H("request_type") · H("call")
   , H("sender") · H("0x04")
   , H("ingress_expiry") · H(1685570400000000000)
   , H("canister_id") · H("\x00\x00\x00\x00\x00\x00\x04\xD2")
   , H("method_name") · H("hello")
   , H("arg") · H("DIDL\x00\xFD*")
   ]))
 = H(concat (sort
   [ 769e6f87bdda39c859642b74ce9763cdd37cb1cd672733e8c54efaa33ab78af9 · 7edb360f06acaef2cc80dba16cf563f199d347db4443da04da0c8173e3f9e4ed
   , 0a367b92cf0b037dfd89960ee832d56f7fc151681bb41e53690e776f5786998a · e52d9c508c502347344d8c07ad91cbd6068afc75ff6292f062a09ca381c89e71
   , 26cec6b6a9248a96ab24305b61b9d27e203af14a580a5b1ff2f67575cab4a868 · db8e57abc8cda1525d45fdd2637af091bc1f28b35819a40df71517d1501f2c76
   , 0a3eb2ba16702a387e6321066dd952db7a31f9b5cc92981e0a92dd56802d3df9 · 4d8c47c3c1c837964011441882d745f7e92d10a40cef0520447c63029eafe396
   , 293536232cf9231c86002f4ee293176a0179c002daa9fc24be9bb51acdd642b6 · 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
   , b25f03dedd69be07f356a06fe35c1b0ddc0de77dcd9066c4be0c6bbde14b23ff · 6c0b2ae49718f6995c02ac5700c9c789d7b7862a0d53e6d40a73f1fcd2f70189
   ]))
 = H(concat
   [ 0a367b92cf0b037dfd89960ee832d56f7fc151681bb41e53690e776f5786998a · e52d9c508c502347344d8c07ad91cbd6068afc75ff6292f062a09ca381c89e71
   , 0a3eb2ba16702a387e6321066dd952db7a31f9b5cc92981e0a92dd56802d3df9 · 4d8c47c3c1c837964011441882d745f7e92d10a40cef0520447c63029eafe396
   , 26cec6b6a9248a96ab24305b61b9d27e203af14a580a5b1ff2f67575cab4a868 · db8e57abc8cda1525d45fdd2637af091bc1f28b35819a40df71517d1501f2c76
   , 293536232cf9231c86002f4ee293176a0179c002daa9fc24be9bb51acdd642b6 · 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
   , 769e6f87bdda39c859642b74ce9763cdd37cb1cd672733e8c54efaa33ab78af9 · 7edb360f06acaef2cc80dba16cf563f199d347db4443da04da0c8173e3f9e4ed
   , b25f03dedd69be07f356a06fe35c1b0ddc0de77dcd9066c4be0c6bbde14b23ff · 6c0b2ae49718f6995c02ac5700c9c789d7b7862a0d53e6d40a73f1fcd2f70189
   ])
 = 1d1091364d6bb8a6c16b203ee75467d59ead468f523eb058880ae8ec80e2b101
```

:::

### Reject codes {#reject-codes}

An API request or inter-canister call that is pending in the IC will eventually result in either a *reply* (indicating success, and carrying data) or a *reject* (indicating an error of some sorts). A reject contains a *rejection code* that classifies the error and a hopefully helpful *reject message* string.

Rejection codes are member of the following enumeration:

-   `SYS_FATAL` (1): Fatal system error, retry unlikely to be useful.

-   `SYS_TRANSIENT` (2): Transient system error, retry might be possible.

-   `DESTINATION_INVALID` (3): Invalid destination (e.g. canister/account does not exist)

-   `CANISTER_REJECT` (4): Explicit reject by the canister.

-   `CANISTER_ERROR` (5): Canister error (e.g., trap, no response)

The symbolic names of this enumeration are used throughout this specification, but on all interfaces (HTTPS API, System API), they are represented as positive numbers as given in the list above.

The error message is guaranteed to be a string, i.e. not arbitrary binary data.

When canisters explicitly reject a message (see [Public methods](#system-api-requests)), they can specify the reject message, but *not* the reject code; it is always `CANISTER_REJECT`. In this sense, the reject code is trustworthy: If the IC responds with a `SYS_FATAL` reject, then it really was the IC issuing this reject.

### Error codes {#error-codes}

Implementations of the API can provide additional details for rejected messages in the form of a textual label identifying the error condition. API clients can use these labels to handle errors programmatically or suggest recovery paths to the user. The specification reserves error codes matching the regular expression `IC[0-9]+` (e.g., `IC502`) for the DFINITY implementation of the API.

### Status endpoint {#api-status}

Additionally, the Internet Computer provides an API endpoint to obtain various status fields at

    /api/v2/status

For this endpoint, the user performs a GET request, and receives a CBOR (see [CBOR](#cbor)) value with the following fields. The IC may include additional implementation-specific fields.

-   `root_key` (blob, optional): The public key (a DER-encoded BLS key) of the root key of this instance of the Internet Computer Protocol. This *must* be present in short-lived development instances, to allow the agent to fetch the public key. For the Internet Computer, agents must have an independent trustworthy source for this data, and must not be tempted to fetch it from this insecure location.

See [CBOR encoding of requests and responses](#api-cbor) for details on the precise CBOR encoding of this object.

:::note

Future additions may include local time, geographic location, and other useful implementation-specific information such as blockheight. This data may possibly be signed by the node.

:::

### CBOR encoding of requests and responses {#api-cbor}

Requests and responses are specified here as records with named fields and using suggestive human readable syntax. The actual format in the body of the HTTP request or response, however, is CBOR (see [CBOR](#cbor)).

Concretely, it consists of a data item with major type 6 ("Semantic tag") and tag value `55799`, followed by a record.

Requests consist of an envelope record with keys `sender_sig` (a blob), `sender_pubkey` (a blob) and `content` (a record). The first two are metadata that are used for request authentication, while the last one is the actual content of the request.

The following encodings are used:

-   Strings: Major type 3 ("Text string").

-   Blobs: Major type 2 ("Byte string").

-   Nats: Major type 0 ("Unsigned integer") if small enough to fit that type, else the [Bignum](https://www.rfc-editor.org/rfc/rfc8949#name-bignums) format is used.

-   Records: Major type 5 ("Map of pairs of data items"), followed by the fields, where keys are encoded with major type 3 ("Text string").

-   Arrays: Major type 4 ("Array of data items").

As advised by [section "Creating CBOR-Based Protocols"](https://www.rfc-editor.org/rfc/rfc8949#name-creating-cbor-based-protoco) of the CBOR spec, we clarify that:

-   Floating-point numbers may not be used to encode integers.

-   Duplicate keys are prohibited in CBOR maps.

:::tip

A typical request would be (written in [CBOR diagnostic notation](https://www.rfc-editor.org/rfc/rfc8949#name-diagnostic-notation), which can be checked and converted on [cbor.me](https://cbor.me/)):
```
55799({
  "content": {
    "request_type": "call",
    "canister_id": h'ABCD01',
    "method_name": "say_hello",
    "arg": h'0061736d01000000'
  },
  "sender_sig": h'DEADBEEF',
  "sender_pubkey": h'b7a3c12dc0c8c748ab07525b701122b88bd78f600c76342d27f25e5f92444cde'
})
```

:::

### CDDL description of requests and responses {#api-cddl}

This section summarizes the format of the CBOR data passed to and from the entry points described above. You can also [download the file](_attachments/requests.cddl) and see [CDDL](#cddl) for more information.

### Ordering guarantees

The order in which the various messages between canisters are delivered and executed is not fully specified. The guarantee provided by the IC is that if a canister sends two messages to a canister and they both start being executed by the receiving canister, then they do so in the order in which the messages were sent.

More precisely:

-   Messages between any *two* canisters, if delivered to the canister, start executing in order. Note that message delivery can fail for arbitrary reasons (e.g., high system load).

-   If a WebAssembly function, within a single invocation, makes multiple calls to the same canister, they are queued in the order of invocations to `ic0.call_perform`.

-   Responses (including replies with `ic0.msg_reply`, explicit rejects with `ic0.msg_reject` and system-generated error responses) do *not* have any ordering guarantee relative to each other or to method calls.

-   There is no particular order guarantee for ingress messages submitted via the HTTPS interface.

### Synchronicity across nodes

This document describes the Internet Computer as having a single global state that can be modified and queried. In reality, it consists of many nodes, which may not be perfectly in sync.

As long as you talk to one (honest) node only, the observed behavior is nicely sequential. If you issue an update (i.e. state-mutating) call to a canister (e.g. bump a counter), and node A indicates that the call has been executed, and you then issue a query call to node A, then A's response is guaranteed to include the effect of the update call (and you will receive the updated counter value).

If you then (quickly) issue a read request to node B, it may be that B responds to your read query based on the old state of the canister (and you might receive the old counter value).

A related problem is that query calls are not certified, and nodes may be dishonest in their response. In that case, the user might want to get more assurance by querying multiple nodes and comparing the result. However, it is (currently) not possible to query a *specific* state.

:::note

Applications can work around these problems. For the first problem, the query result could be such that the user can tell if the update has been received or not. For the second problem, even if using [certified data](#system-api-certified-data) is not possible, if replies are monotonic in some sense the user can get assurance in their intersection (e.g. if the query returns a list of events that grows over time, then even if different nodes return different lists, the user can get assurance in those events that are reported by many nodes).

:::

## Canister module format {#canister-module-format}

A canister module is a [WebAssembly module](https://webassembly.github.io/spec/core/index.html) that is either in binary format (typically `.wasm`) or gzip-compressed (typically `.wasm.gz`). If the module starts with byte sequence `[0x1f, 0x8b, 0x08]`, then the system decompresses the contents as a gzip stream according to [RFC-1952](https://datatracker.ietf.org/doc/html/rfc1952.html) and then parses the output as a WebAssembly binary.

## Canister interface (System API) {#system-api}

The System API is the interface between the running canister and the Internet Computer. It allows the WebAssembly module of a canister to expose functionality to the users (method entry points) and the IC (e.g. initialization), and exposes functionality of the IC to the canister (e.g. calling other canisters). Because WebAssembly is rather low-level, it also explains how to express higher level concepts (e.g. binary blobs).

We want to leverage advanced WebAssembly features, such as WebAssembly host references. But as they are not yet supported by all tools involved, this section describes an initial System API that does not rely on host references. In section [Outlook: Using Host References](#host-references), we outline some of the proposed uses of WebAssembly host references.

### WebAssembly module requirements {#system-api-module}

In order for a WebAssembly module to be usable as the code for the canister, it needs to conform to the following requirements:

-   It may only import a function if it is listed in [Overview of imports](#system-api-imports).

-   It may have a `(start)` function.

-   If it exports a function called `canister_init`, the function must have type `() -> ()`.

-   If it exports a function called `canister_inspect_message`, the function must have type `() -> ()`.

-   If it exports a function called `canister_pre_upgrade`, the function must have type `() -> ()`.

-   If it exports a function called `canister_post_upgrade`, the function must have type `() -> ()`.

-   If it exports a function called `canister_heartbeat`, the function must have type `() -> ()`.

-   If it exports a function called `canister_global_timer`, the function must have type `() -> ()`.

-   If it exports any functions called `canister_update <name>`, `canister_query <name>`, or `canister_composite_query <name>` for some `name`, the functions must have type `() -> ()`.

-   It may not export more than one function called `canister_update <name>`, `canister_query <name>`, or `canister_composite_query <name>` with the same `name`.

-   It may not export other methods the names of which start with the prefix `canister_` besides the methods allowed above.

-   It may not have both `icp:public <name>` and `icp:private <name>` with the same `name` as the custom section name.

-   It may not have other custom sections the names of which start with the prefix `icp:` besides the \`icp:public \` and \`icp:private \`.

-   The IC may reject WebAssembly modules that

    -   declare more than 50,000 functions, or

    -   declare more than 1,000 globals, or

    -   declare more than 16 exported custom sections (the custom section names with prefix `icp:`), or

    -   the number of all exported functions called `canister_update <name>`, `canister_query <name>`, or `canister_composite_query <name>` exceeds 1,000, or

    -   the sum of `<name>` lengths in all exported functions called `canister_update <name>`, `canister_query <name>`, or `canister_composite_query <name>` exceeds 20,000, or

    -   the total size of the custom sections (the sum of `<name>` lengths in their names `icp:public <name>` and `icp:private <name>` plus the sum of their content lengths) exceeds 1MiB.

### Interpretation of numbers

WebAssembly number types (`i32`, `i64`) do not indicate if the numbers are to be interpreted as signed or unsigned. Unless noted otherwise, whenever the System API interprets them as numbers (e.g. memory pointers, buffer offsets, array sizes), they are to be interpreted as unsigned.

### Entry points {#entry-points}

The canister provides entry points which are invoked by the IC under various circumstances:

-   The canister may export a function with name `canister_init` and type `() -> ()`.

-   The canister may export a function with name `canister_pre_upgrade` and type `() -> ()`.

-   The canister may export a function with name `canister_post_upgrade` and type `() -> ()`.

-   The canister may export functions with name `canister_inspect_message` with type `() -> ()`.

-   The canister may export a function with name `canister_heartbeat` with type `() -> ()`.

-   The canister may export a function with name `canister_global_timer` with type `() -> ()`.

-   The canister may export functions with name `canister_update <name>` and type `() -> ()`.

-   The canister may export functions with name `canister_query <name>` and type `() -> ()`.

-   The canister may export functions with name `canister_composite_query <name>` and type `() -> ()`.

-   The canister table may contain functions of type `(env : i32) -> ()` which may be used as callbacks for inter-canister calls and composite query methods.

If the execution of any of these entry points traps for any reason, then all changes to the WebAssembly state, as well as the effect of any externally visible system call (like `ic0.msg_reply`, `ic0.msg_reject`, `ic0.call_perform`), are discarded. For upgrades, this transactional behavior applies to the `canister_pre_upgrade`/`canister_post_upgrade` sequence as a whole.

#### Canister initialization {#system-api-init}

If `canister_init` is present, then this is the first exported WebAssembly function invoked by the IC. The argument that was passed along with the canister initialization call (see [IC method](#ic-install_code)) is available to the canister via `ic0.msg_arg_data_size/copy`.

The IC assumes the canister to be fully instantiated if the `canister_init` method entry point returns. If the `canister_init` method entry point traps, then canister installation has failed, and the canister is reverted to its previous state (i.e. empty with `install`, or whatever it was for a `reinstall`).

#### Canister upgrades {#system-api-upgrades}

When a canister is upgraded to a new WebAssembly module, the IC:

1.  Invokes `canister_pre_upgrade` (if exported by the current canister code and `skip_pre_upgrade` is not `opt true`) on the old instance, to give the canister a chance to clean up (e.g. move data to [stable memory](#system-api-stable-memory)).

2.  Instantiates the new module, including the execution of `(start)`, with a fresh WebAssembly state.

3.  Invokes `canister_post_upgrade` (if present) on the new instance, passing the `arg` provided in the `install_code` call ([IC method](#ic-install_code)).

The stable memory is preserved throughout the process; the WebAssembly memory is discarded unless `wasm_memory_persistence` is `opt keep`; any other WebAssembly state is discarded.

During these steps, no other entry point of the old or new canister is invoked. The `canister_init` function of the new canister is *not* invoked.

These steps are atomic: If `canister_pre_upgrade` or `canister_post_upgrade` trap, the upgrade has failed, and the canister is reverted to the previous state. Otherwise, the upgrade has succeeded, and the old instance is discarded.

:::note
The `skip_pre_upgrade` flag can be enabled to skip the execution of the `canister_pre_upgrade` method on the old canister instance.
The main purpose of this mode is recovery from cases when the `canister_pre_upgrade` hook traps unconditionally preventing the normal upgrade path.

Skipping the pre-upgrade can lead to data loss.
Use it only as the last resort and only if the stable memory already contains the entire canister state.
:::

#### Public methods {#system-api-requests}

To define a public method of name `name`, a WebAssembly module exports a function with name `canister_update <name>`, `canister_query <name>`, or `canister_composite_query <name>` and type `() -> ()`. We call this the *method entry point*. The name of the exported function distinguishes update, query, and composite query methods.

:::note

The space in `canister_update <name>`, `canister_query <name>`, and `canister_composite_query <name>`, resp., is intentional. There is exactly one space between `canister_update/canister_query/canister_composite_query` and the `<name>`.

:::

The argument of the call (e.g. the content of the `arg` field in the [API request to call a canister method](#http-call)) is copied into the canister on demand using the System API functions shown below.

Eventually, a method will want to send a response, using `ic0.reply` or `ic0.reject`

#### Heartbeat

For periodic or time-based execution, the WebAssembly module can export a function with name `canister_heartbeat`. The heartbeats scheduling algorithm is implementation-defined.

`canister_heartbeat` is triggered by the IC, and therefore has no arguments and cannot reply or reject. Still, the function `canister_heartbeat` can initiate new calls.

:::note

While an implementation will likely try to keep the interval between `canister_heartbeat` invocations to within a few seconds, this is not formally part of this specification.

:::

#### Global timer

For time-based execution, the WebAssembly module can export a function with name `canister_global_timer`. This function is called if the canister has set its global timer (using the System API function `ic0.global_timer_set`) and the current time (as returned by the System API function `ic0.time`) has passed the value of the global timer.

Once the function `canister_global_timer` is scheduled, the canister's global timer is deactivated. The global timer is also deactivated upon changes to the canister's Wasm module (calling `install_code`, `install_chunked_code`, `uninstall_code` methods of the management canister or if the canister runs out of cycles). In particular, the function `canister_global_timer` won't be scheduled again unless the canister sets the global timer again (using the System API function `ic0.global_timer_set`). The global timer scheduling algorithm is implementation-defined.

`canister_global_timer` is triggered by the IC, and therefore has no arguments and cannot reply or reject. Still, the function `canister_global_timer` can initiate new calls.

:::note

While an implementation will likely try to keep the interval between the value of the global timer and the time-stamp of the `canister_global_timer` invocation within a few seconds, this is not formally part of this specification.

:::

#### Callbacks

Callbacks are addressed by their table index (as a proxy for a Wasm `funcref`).

In the reply callback of a [inter-canister method call](#system-api-call), the argument refers to the response to that call. In reject callbacks, no argument is available.

### Replicated and Non-Replicated execution mode

Canister methods can be executed either in *replicated* mode where the method runs on all subnet nodes and the results go through consensus or in *non-replicated* mode where the method runs on a single node and the result does not go through consensus. The trade-off between replicated and non-replicated mode is therefore one between the result's latency and trustworthiness.

The following table captures the modes that different canister methods can be executed in.

| Canister method          | Replicated Mode | Non-Replicated Mode |
| ------------------------ | --------------- | ------------------- |
| canister_update          | Yes             | No                  |
| canister_query           | Yes             | Yes                 |
| canister_composite_query | No              | Yes                 |
| canister_inspect_message | No              | Yes                 |
| canister_init            | Yes             | No                  |
| canister_pre_upgrade     | Yes             | No                  |
| canister_post_upgrade    | Yes             | No                  |
| canister_heartbeat       | Yes             | No                  |
| canister_global_timer    | Yes             | No                  |

### Overview of imports {#system-api-imports}

:::note

The 32-bit stable memory System API (`ic0.stable_size`, `ic0.stable_grow`, `ic0.stable_write`, and `ic0.stable_read`) is DEPRECATED. Canister developers are advised to use the 64-bit stable memory System API instead.

:::

The following sections describe various System API functions, also referred to as system calls, which we summarize here.

```
    ic0.msg_arg_data_size : () -> i32;                                          // I U RQ NRQ CQ Ry CRy F
    ic0.msg_arg_data_copy : (dst : i32, offset : i32, size : i32) -> ();        // I U RQ NRQ CQ Ry CRy F
    ic0.msg_caller_size : () -> i32;                                            // *
    ic0.msg_caller_copy : (dst : i32, offset: i32, size : i32) -> ();           // *
    ic0.msg_reject_code : () -> i32;                                            // Ry Rt CRy CRt
    ic0.msg_reject_msg_size : () -> i32;                                        // Rt CRt
    ic0.msg_reject_msg_copy : (dst : i32, offset : i32, size : i32) -> ();      // Rt CRt

    ic0.msg_reply_data_append : (src : i32, size : i32) -> ();                  // U RQ NRQ CQ Ry Rt CRy CRt
    ic0.msg_reply : () -> ();                                                   // U RQ NRQ CQ Ry Rt CRy CRt
    ic0.msg_reject : (src : i32, size : i32) -> ();                             // U RQ NRQ CQ Ry Rt CRy CRt

    ic0.msg_cycles_available : () -> i64;                                       // U Rt Ry
    ic0.msg_cycles_available128 : (dst : i32) -> ();                            // U Rt Ry
    ic0.msg_cycles_refunded : () -> i64;                                        // Rt Ry
    ic0.msg_cycles_refunded128 : (dst : i32) -> ();                             // Rt Ry
    ic0.msg_cycles_accept : (max_amount : i64) -> (amount : i64);               // U Rt Ry
    ic0.msg_cycles_accept128 : (max_amount_high : i64, max_amount_low: i64, dst : i32)
                           -> ();                                               // U Rt Ry

    ic0.cycles_burn128 : (amount_high : i64, amount_low : i64, dst : i32) -> ();               // I G U Ry Rt C T

    ic0.canister_self_size : () -> i32;                                         // *
    ic0.canister_self_copy : (dst : i32, offset : i32, size : i32) -> ();       // *
    ic0.canister_cycle_balance : () -> i64;                                     // *
    ic0.canister_cycle_balance128 : (dst : i32) -> ();                          // *
    ic0.canister_status : () -> i32;                                            // *
    ic0.canister_version : () -> i64;                                           // *

    ic0.msg_method_name_size : () -> i32;                                       // F
    ic0.msg_method_name_copy : (dst : i32, offset : i32, size : i32) -> ();     // F
    ic0.accept_message : () -> ();                                              // F

    ic0.call_new :                                                              // U CQ Ry Rt CRy CRt T
      ( callee_src  : i32,
        callee_size : i32,
        name_src : i32,
        name_size : i32,
        reply_fun : i32,
        reply_env : i32,
        reject_fun : i32,
        reject_env : i32
      ) -> ();
    ic0.call_on_cleanup : (fun : i32, env : i32) -> ();                         // U CQ Ry Rt CRy CRt T
    ic0.call_data_append : (src : i32, size : i32) -> ();                       // U CQ Ry Rt CRy CRt T
    ic0.call_cycles_add : (amount : i64) -> ();                                 // U Ry Rt T
    ic0.call_cycles_add128 : (amount_high : i64, amount_low: i64) -> ();        // U Ry Rt T
    ic0.call_perform : () -> ( err_code : i32 );                                // U CQ Ry Rt CRy CRt T

    ic0.stable_size : () -> (page_count : i32);                                 // * s
    ic0.stable_grow : (new_pages : i32) -> (old_page_count : i32);              // * s
    ic0.stable_write : (offset : i32, src : i32, size : i32) -> ();             // * s
    ic0.stable_read : (dst : i32, offset : i32, size : i32) -> ();              // * s
    ic0.stable64_size : () -> (page_count : i64);                               // * s
    ic0.stable64_grow : (new_pages : i64) -> (old_page_count : i64);            // * s
    ic0.stable64_write : (offset : i64, src : i64, size : i64) -> ();           // * s
    ic0.stable64_read : (dst : i64, offset : i64, size : i64) -> ();            // * s

    ic0.certified_data_set : (src: i32, size: i32) -> ();                       // I G U Ry Rt T
    ic0.data_certificate_present : () -> i32;                                   // *
    ic0.data_certificate_size : () -> i32;                                      // NRQ CQ
    ic0.data_certificate_copy : (dst: i32, offset: i32, size: i32) -> ();       // NRQ CQ

    ic0.time : () -> (timestamp : i64);                                         // *
    ic0.global_timer_set : (timestamp : i64) -> i64;                            // I G U Ry Rt C T
    ic0.canister_limit : (limit_type : i32) -> (limit : i64);                   // * s
    ic0.performance_counter : (counter_type : i32) -> (counter : i64);          // * s
    ic0.is_controller: (src: i32, size: i32) -> ( result: i32);                 // * s
    ic0.in_replicated_execution: () -> (result: i32);                           // * s

    ic0.debug_print : (src : i32, size : i32) -> ();                            // * s
    ic0.trap : (src : i32, size : i32) -> ();                                   // * s
```

The comment after each function lists from where these functions may be invoked:

-   `I`: from `canister_init` or `canister_post_upgrade`

-   `G`: from `canister_pre_upgrade`

-   `U`: from `canister_update …`

-   `RQ`: from `canister_query …` in replicated mode

-   `NRQ`: from `canister_query …` in non-replicated mode

-   `CQ`: from `canister_composite_query …`

-   `Ry`: from a reply callback

-   `Rt`: from a reject callback

-   `CRy`: from a reply callback in composite query

-   `CRt`: from a reject callback in composite query

-   `C`: from a cleanup callback

-   `CC`: from a cleanup callback in composite query

-   `s`: the `(start)` module initialization function

-   `F`: from `canister_inspect_message`

-   `T`: from *system task* (`canister_heartbeat` or `canister_global_timer`)

-   `*` = `I G U RQ NRQ CQ Ry Rt CRy CRt C CC F T` (NB: Not `(start)`)

If the canister invokes a system call from somewhere else, it will trap.

Since Wasm doesn't have a 128-bit number type, calls requiring 128-bit arguments (e.g., the 128-bit versions of cycle operations) encode such arguments as a pair of 64-bit numbers containing the high and low bits.

### Blob-typed arguments and results

WebAssembly functions parameter and result types can only be primitive number types. To model functions that accept or return blobs or text values, the following idiom is used:

To provide access to a string or blob `foo`, the System API provides two functions:

    ic0.foo_size : () -> i32
    ic0.foo_copy : (dst : i32, offset: i32, size : i32) -> ()

The `*_size` function indicates the size, in bytes, of `foo`. The `*_copy` function copies `size` bytes from `foo[offset..offset+size]` to `memory[dst..dst+size]`. This traps if `offset+size` is greater than the size of `foo`, or if `dst+size` exceeds the size of the Wasm memory.

Dually, a System API function that conceptually takes a blob or string as a parameter `foo` has two parameters:

    ic0.set_foo : (src : i32, size: i32) -> …

which copies, at the time of function invocation, the data referred to by `src`/`size` out of the canister. Unless otherwise noted, this traps if `src+size` exceeds the size of the WebAssembly memory.

### Method arguments

The canister can access an argument. For `canister_init`, `canister_post_upgrade` and method entry points, the argument is the argument of the call; in a reply callback, it refers to the received reply. So the lifetime of the argument data is a single WebAssembly function execution, not the whole method call tree.

-   `ic0.msg_arg_data_size : () → i32` and `ic0.msg_arg_data_copy : (dst : i32, offset : i32, size : i32) → ()`

    The message argument data.

-   `ic0.msg_caller_size : () → i32` and `ic0.msg_caller_copy : (dst : i32, offset: i32, size : i32) → ()`

    The identity of the caller, which may be a canister id or a user id. During canister installation or upgrade, this is the id of the user or canister requesting the installation or upgrade. During a system task (heartbeat or global timer), this is the id of the management canister.

-   `ic0.msg_reject_code : () → i32`

    Returns the reject code, if the current function is invoked as a reject callback.

    It returns the special "no error" code `0` if the callback is *not* invoked as a reject callback; this allows canisters to use a single entry point for both the reply and reject callback, if they choose to do so.

-   `ic0.msg_reject_msg_size : () → i32` and `ic0.msg_reject_msg_copy : (dst : i32, offset : i32, size : i32) → ()`

    The reject message. Traps if there is no reject message (i.e. if `reject_code` is `0`).

### Responding {#responding}

Eventually, the canister will want to respond to the original call, either by replying (indicating success) or rejecting (signalling an error):

-   `ic0.msg_reply_data_append : (src : i32, size : i32) → ()`

    Appends data it to the (initially empty) data reply. Traps if the total appended data exceeds the [maximum response size](https://internetcomputer.org/docs/current/developer-docs/backend/resource-limits#resource-constraints-and-limits).

    This traps if the current call already has been or does not need to be responded to.

    Any data assembled, but not replied using `ic0.msg_reply`, gets discarded at the end of the current message execution. In particular, the reply buffer gets reset when the canister yields control without calling `ic0.msg_reply`.

:::note

This can be invoked multiple times within the same message execution to build up the argument with data from various places on the Wasm heap. This way, the canister does not have to first copy all the pieces from various places into one location.

:::

-   `ic0.msg_reply : () → ()`

    Replies to the sender with the data assembled using `ic0.msg_reply_data_append`.

    This function can be called at most once (a second call will trap), and must be called exactly once to indicate success.

    See [Cycles](#system-api-cycles) for how this interacts with cycles available on this call.

-   `ic0.msg_reject : (src : i32, size : i32) → ()`

    Rejects the call. The data referred to by `src`/`size` is used for the diagnostic message.

    This system call traps if `src+size` exceeds the size of the WebAssembly memory, or if the current call already has been or does not need to be responded to, or if the data referred to by `src`/`size` is not valid UTF8.

    The other end will receive this reject with reject code `CANISTER_REJECT`, see [Reject codes](#reject-codes).

    Possible reply data assembled using `ic0.msg_reply_data_append` is discarded.

    See [Cycles](#system-api-cycles) for how this interacts with cycles available on this call.

### Ingress message inspection {#system-api-inspect-message}

A canister can inspect ingress messages before executing them. When the IC receives an update call from a user, the IC will use the canister method `canister_inspect_message` to determine whether the message shall be accepted. If the canister is empty (i.e. does not have a Wasm module), then the ingress message will be rejected. If the canister is not empty and does not implement `canister_inspect_message`, then the ingress message will be accepted.

In `canister_inspect_message`, the canister can accept the message by invoking `ic0.accept_message : () → ()`. This function traps if invoked twice. If the canister traps in `canister_inspect_message` or does not call `ic0.accept_message`, then the access is denied.

:::note

The `canister_inspect_message` is executed by a single node and thus its outcome depends on the state of this node.
In particular, the `canister_inspect_message` might be executed on a state that does not reflect the changes
made by a previously successfully completed update call if the `canister_inspect_message` is executed by a node
that is not up-to-date in terms of its state.

:::

:::note

The `canister_inspect_message` is *not* invoked for query calls, inter-canister calls or calls to the management canister.

:::

### Self-identification {#system-api-canister-self}

A canister can learn about its own identity:

-   `ic0.canister_self_size : () → i32` and `ic0.canister_self_copy: (dst : i32, offset : i32, size : i32) → ()`

    These functions allow the canister to query its own canister id (as a blob).

### Canister status {#system-api-canister-status}

This function allows a canister to find out if it is running, stopping or stopped (see [IC method](#ic-canister_status) and [IC method](#ic-stop_canister) for context).

-   `ic0.canister_status : () → i32`

    returns the current status of the canister:

    Status `1` indicates running, `2` indicates stopping, and `3` indicates stopped.

    Status `3` (stopped) can be observed, for example, in `canister_pre_upgrade` and can be used to prevent accidentally upgrading a canister that is not fully stopped.

### Canister version {#system-api-canister-version}

For each canister, the system maintains a *canister version*. Upon canister creation, it is set to 0, and it is **guaranteed** to be incremented upon every change of the canister's code, settings, running status (Running, Stopping, Stopped), and memory (WASM and stable memory), i.e., upon every successful management canister call of methods `update_settings`, `load_canister_snapshot`, `install_code`, `install_chunked_code`, `uninstall_code`, `start_canister`, and `stop_canister` on that canister, code uninstallation due to that canister running out of cycles, canister's running status transitioning from Stopping to Stopped, and successful execution of update methods, response callbacks, heartbeats, and global timers. The system can arbitrarily increment the canister version also if the canister's code, settings, running status, and memory do not change.

-   `ic0.canister_version : () → i64`

    returns the current canister version.

During the canister upgrade process, `canister_pre_upgrade` sees the old counter value, and `canister_post_upgrade` sees the new counter value.

### Inter-canister method calls {#system-api-call}

When handling an update call (or a callback), a canister can do further calls to another canister. Calls are assembled in a builder-like fashion, starting with `ic0.call_new`, adding more attributes using the `ic0.call_*` functions, and eventually performing the call with `ic0.call_perform`.

-   `ic0.call_new :
    ( callee_src : i32,
      callee_size : i32,
      name_src : i32,
      name_size : i32,
      reply_fun : i32,
      reply_env : i32,
      reject_fun : i32,
      reject_env : i32,
    ) → ()`

Begins assembling a call to the canister specified by `callee_src/_size` at method `name_src/_size`.

The IC records two mandatory callback functions, represented by a table entry index `*_fun` and some additional value `*_env`. When the response comes back, the table is read at the corresponding index, expected to be a function of type `(env : i32) -> ()`, and passed the corresponding `*_env` value.

The reply callback is executed upon successful completion of the method call, which can query the reply using `ic0.msg_arg_data_*`.

The reject callback is executed if the method call fails asynchronously or the other canister explicitly rejects the call. The reject code and message can be queried using `ic0.msg_reject_code` and `ic0.msg_reject_msg_*`.

Subsequent calls to the following functions set further attributes of that call, until the call is concluded (with `ic0.call_perform`) or discarded (by returning without calling `ic0.call_perform` or by starting a new call with `ic0.call_new`.)

-   `ic0.call_on_cleanup : (fun : i32, env : i32) → ()`

If a cleanup callback (of type `(env : i32) -> ()`) is specified for this call, it is executed if and only if the `reply` or the `reject` callback was executed and trapped (for any reason).

During the execution of the `cleanup` function, only a subset of the System API is available (namely `ic0.debug_print`, `ic0.trap` and the `ic0.stable_*` functions). The cleanup function is expected to run swiftly (within a fixed, yet to be specified cycle limit) and serves to free resources associated with the callback.

If this traps (e.g. runs out of cycles), the state changes from the `cleanup` function are discarded, as usual, and no further actions are taken related to that call. Canisters likely want to avoid this from happening.

There must be at most one call to `ic0.call_on_cleanup` between `ic0.call_new` and `ic0.call_perform`.

-   `ic0.call_data_append : (src : i32, size : i32) -> ()`

    Appends the specified bytes to the argument of the call. Initially, the argument is empty. Traps if the total appended data exceeds the [maximum inter-canister call payload](https://internetcomputer.org/docs/current/developer-docs/backend/resource-limits#resource-constraints-and-limits).

    This may be called multiple times between `ic0.call_new` and `ic0.call_perform`.

-   `ic0.call_cycles_add : (amount : i64) -> ()`

    This system call moves cycles from the canister balance onto the call under construction, to be transferred with that call.

    The cycles are deducted from the balance as shown by `ic0.canister_cycle_balance128` immediately, and moved back if the call cannot be performed (e.g. if `ic0.call_perform` signals an error, if the canister invokes `ic0.call_new`, or returns without calling `ic0.call_perform`).

    This system call may be called multiple times between `ic0.call_new` and `ic0.call_perform`.

    This system call traps if there is no call under construction, i.e., if not called between `ic0.call_new` and `ic0.call_perform`.

    This system call traps if trying to transfer more cycles than are in the current balance of the canister.

    This system call traps if the cycle balance of the canister after transferring cycles decreases below the canister's freezing limit.

-   `ic0.call_cycles_add128 : (amount_high : i64, amount_low : i64) -> ()`

    This system call moves cycles from the canister balance onto the call under construction, to be transferred with that call.

    The amount of cycles it moves is represented by a 128-bit value which can be obtained by combining the `amount_high` and `amount_low` parameters.

    The cycles are deducted from the balance as shown by `ic0.canister_cycles_balance128` immediately, and moved back if the call cannot be performed (e.g. if `ic0.call_perform` signals an error, if the canister invokes `ic0.call_new`, or returns without calling `ic0.call_perform`).

    This system call may be called multiple times between `ic0.call_new` and `ic0.call_perform`.

    This system call traps if there is no call under construction, i.e., if not called between `ic0.call_new` and `ic0.call_perform`.

    This system call traps if trying to transfer more cycles than are in the current balance of the canister.

    This system call traps if the cycle balance of the canister after transferring cycles decreases below the canister's freezing limit.

-   `ic0.call_perform  : () -> ( err_code : i32 )`

    This concludes assembling the call. It queues the call message to the given destination, but does not actually act on it until the current WebAssembly function returns without trapping.

    This deducts `MAX_CYCLES_PER_RESPONSE` cycles from the canister balance and sets them aside for response processing.

    If the function returns `0` as the `err_code`, the IC was able to enqueue the call. In this case, the call will either be delivered, returned because the destination canister does not exist, returned due to a lack of resources within the IC, or returned because of an out of cycles condition. This also means that exactly one of the reply or reject callbacks will be executed.

    If the function returns a non-zero value, the call cannot (and will not be) performed. This can happen due to a lack of resources within the IC, but also if it would reduce the current cycle balance to a level below where the canister would be frozen.

    After `ic0.call_perform` and before the next call to `ic0.call_new`, all other `ic0.call_*` function calls trap.

### Cycles {#system-api-cycles}

Each canister maintains a balance of *cycles*, which are used to pay for platform usage. Cycles are represented by 128-bit values.

:::note

This specification currently does not go into details about which actions cost how many cycles and/or when. In general, you must assume that the canister's cycle balance can change arbitrarily between method executions, and during each System API function call, unless explicitly mentioned otherwise.

:::

-   `ic0.canister_cycle_balance : () → i64`

    Indicates the current cycle balance of the canister. It is the canister balance before the execution of the current message, minus a reserve to pay for the execution of the current message, minus any cycles queued up to be sent via `ic0.call_cycles_add` and `ic0.call_cycles_add128`. After execution of the message, the IC may add unused cycles from the reserve back to the balance.

:::note

This call traps if the current balance does not fit into a 64-bit value. Canisters that need to deal with larger cycles balances should use `ic0.canister_cycles_balance128` instead.

:::

-   `ic0.canister_cycle_balance128 : (dst : i32) → ()`

    Indicates the current cycle balance of the canister by copying the value at the location `dst` in the canister memory. It is the canister balance before the execution of the current message, minus a reserve to pay for the execution of the current message, minus any cycles queued up to be sent via `ic0.call_cycles_add` and `ic0.call_cycles_add128`. After execution of the message, the IC may add unused cycles from the reserve back to the balance.

-   `ic0.msg_cycles_available : () → i64`

    Returns the amount of cycles that were transferred by the caller of the current call, and is still available in this message.

    Initially, in the update method entry point, this is the amount that the caller passed to the canister. When cycles are accepted (`ic0.msg_cycles_accept`), this reports fewer cycles accordingly. When the call is responded to (reply or reject), all available cycles are refunded to the caller, and this will return 0.

:::note

This call traps if the amount of cycles available does not fit into a 64-bit value. Please use `ic0.msg_cycles_available128` instead.

:::

-   `ic0.msg_cycles_available128 : (dst : i32) → ()`

    Indicates the number of cycles transferred by the caller of the current call, still available in this message. The amount of cycles is represented by a 128-bit value. This call copies this value starting at the location `dst` in the canister memory.

    Initially, in the update method entry point, this is the amount that the caller passed to the canister. When cycles are accepted (`ic0.msg_cycles_accept128`), this reports fewer cycles accordingly. When the call is responded to (reply or reject), all available cycles are refunded to the caller, and this will report 0 cycles.

-   `ic0.msg_cycles_accept : (max_amount : i64) → (amount : i64)`

    This moves cycles from the call to the canister balance. It moves as many cycles as possible, up to these constraints:

    It moves no more cycles than `max_amount`.

    It moves no more cycles than available according to `ic0.msg_cycles_available`, and

    It can be called multiple times, each time possibly adding more cycles to the balance.

    The return value indicates how many cycles were actually moved.

    This system call does not trap.

:::tip

Example: To accept all cycles provided in a call, invoke `ic0.msg_cycles_accept(ic0.msg_cycles_available())` in the method handler or a callback handler, *before* calling reply or reject.

:::

-   `ic0.msg_cycles_accept128 : (max_amount_high : i64, max_amount_low : i64, dst : i32) → ()`

    This moves cycles from the call to the canister balance. It moves as many cycles as possible, up to these constraints:

    It moves no more cycles than the amount obtained by combining `max_amount_high` and `max_amount_low`. Cycles are represented by 128-bit values.

    It moves no more cycles than available according to `ic0.msg_cycles_available128`, and

    It can be called multiple times, each time possibly adding more cycles to the balance.

    This call also copies the amount of cycles that were actually moved starting at the location `dst` in the canister memory.

    This does not trap.

-   `ic0.cycles_burn128 : (amount_high : i64, amount_low : i64, dst : i32) -> ()`

    This burns cycles from the canister. It burns as many cycles as possible, up to these constraints:

    It burns no more cycles than the amount obtained by combining `amount_high` and `amount_low`. Cycles are represented by 128-bit values.

    It burns no more cycles than the amount of cycles available for spending `liquid_balance(balance, reserved_balance, freezing_limit)`, where `reserved_balance` are cycles reserved for resource payments and `freezing_limit` is the amount of idle cycles burned by the canister during its `freezing_threshold`.

    It can be called multiple times, each time possibly burning more cycles from the balance.

    This call also copies the amount of cycles that were actually burned starting at the location `dst` in the canister memory.

    This system call does not trap.

-   `ic0.msg_cycles_refunded : () → i64`

    This function can only be used in a callback handler (reply or reject), and indicates the amount of cycles that came back with the response as a refund. The refund has already been added to the canister balance automatically.

:::note

This call traps if the amount of cycles refunded does not fit into a 64-bit value. In general, it is recommended to use `ic0.msg_cycles_refunded128` instead.

:::

-   `ic0.msg_cycles_refunded128 : (dst : i32) → ()`

    This function can only be used in a callback handler (reply or reject), and indicates the amount of cycles that came back with the response as a refund. The refund has already been added to the canister balance automatically.

### Stable memory {#system-api-stable-memory}

:::note

The 32-bit stable memory System API (`ic0.stable_size`, `ic0.stable_grow`, `ic0.stable_write`, and `ic0.stable_read`) is DEPRECATED. Canister developers are advised to use the 64-bit stable memory System API instead.

:::

Canisters have the ability to store and retrieve data from a secondary memory. The purpose of this *stable memory* is to provide space to store data beyond upgrades. The interface mirrors roughly the memory-related instructions of WebAssembly, and tries to be forward compatible with exposing this feature as an additional memory.

The stable memory is initially empty and can be grown up to the [Wasm stable memory limit](https://internetcomputer.org/docs/current/developer-docs/backend/resource-limits#resource-constraints-and-limits) (provided the subnet has capacity).

-   `ic0.stable_size : () → (page_count : i32)`

    returns the current size of the stable memory in WebAssembly pages. (One WebAssembly page is 64KiB)

    This system call traps if the size of the stable memory exceeds 2<sup>32</sup> bytes.

-   `ic0.stable_grow : (new_pages : i32) → (old_page_count : i32)`

    tries to grow the memory by `new_pages` many pages containing zeroes.

    This system call traps if the *previous* size of the memory exceeds 2<sup>32</sup> bytes.

    If the *new* size of the memory exceeds 2<sup>32</sup> bytes or growing is unsuccessful, then it returns `-1`.

    Otherwise, it grows the memory and returns the *previous* size of the memory in pages.

-   `ic0.stable_write : (offset : i32, src : i32, size : i32) → ()`

    copies the data referred to by `src`/`size` out of the canister and replaces the corresponding segment starting at `offset` in the stable memory.

    This system call traps if the size of the stable memory exceeds 2<sup>32</sup> bytes.

    It also traps if `src+size` exceeds the size of the WebAssembly memory or `offset+size` exceeds the size of the stable memory.

-   `ic0.stable_read : (dst : i32, offset : i32, size : i32) → ()`

    copies the data referred to by `offset`/`size` out of the stable memory and replaces the corresponding bytes starting at `dest` in the canister memory.

    This system call traps if the size of the stable memory exceeds 2<sup>32</sup> bytes.

    It also traps if `dst+size` exceeds the size of the WebAssembly memory or `offset+size` exceeds the size of the stable memory

-   `ic0.stable64_size : () → (page_count : i64)`

    returns the current size of the stable memory in WebAssembly pages. (One WebAssembly page is 64KiB)

-   `ic0.stable64_grow : (new_pages : i64) → (old_page_count : i64)`

    tries to grow the memory by `new_pages` many pages containing zeroes.

    If successful, returns the *previous* size of the memory (in pages). Otherwise, returns `-1`.

-   `ic0.stable64_write : (offset : i64, src : i64, size : i64) → ()`

    Copies the data from location \[src, src+size) of the canister memory to location \[offset, offset+size) in the stable memory.

    This system call traps if `src+size` exceeds the size of the WebAssembly memory or `offset+size` exceeds the size of the stable memory.

-   `ic0.stable64_read : (dst : i64, offset : i64, size : i64) → ()`

    Copies the data from location \[offset, offset+size) of the stable memory to the location \[dst, dst+size) in the canister memory.

    This system call traps if `dst+size` exceeds the size of the WebAssembly memory or `offset+size` exceeds the size of the stable memory.

### System time {#system-api-time}

The canister can query the IC for the current time.

`ic0.time : () -> i64`

The time is given as nanoseconds since 1970-01-01. The IC guarantees that

-   the time, as observed by the canister, is monotonically increasing, even across canister upgrades.

-   within an invocation of one entry point, the time is constant.

The times observed by different canisters are unrelated, and calls from one canister to another may appear to travel "backwards in time".

:::note

While an implementation will likely try to keep the time returned by `ic0.time` close to the real time, this is not formally part of this specification.

:::

### Global timer

The canister can set a global timer to make the system schedule a call to the exported `canister_global_timer` Wasm method after the specified time. The time must be provided as nanoseconds since 1970-01-01.

`ic0.global_timer_set : (timestamp : i64) -> i64`

The function returns the previous value of the timer. If no timer is set before invoking the function, then the function returns zero.

Passing zero as an argument to the function deactivates the timer and thus prevents the system from scheduling calls to the canister's `canister_global_timer` Wasm method.

### Performance counter {#system-api-performance-counter}

The canister can query one of the "performance counters", which is a deterministic monotonically increasing integer approximating the amount of work the canister has done. Developers might use this data to profile and optimize the canister performance.

`ic0.performance_counter : (counter_type : i32) -> i64`

The argument `type` decides which performance counter to return:

-   0 : current execution instruction counter. The number of WebAssembly instructions the canister has executed since the beginning of the current [Message execution](#rule-message-execution).

-   1 : call context instruction counter.

    - For replicated message execution, it is the number of WebAssembly instructions the canister has executed within the call context of the current [Message execution](#rule-message-execution) since [Call context creation](#call-context-creation). The counter monotonically increases across all [message executions](#rule-message-execution) in the call context until the corresponding [call context is removed](#call-context-removal).

    - For non-replicated message execution, it is the number of WebAssembly instructions the canister has executed within the corresponding `composite_query_helper` in [Query call](#query-call). The counter monotonically increases across the executions of the composite query method and the composite query callbacks until the corresponding `composite_query_helper` returns (ignoring WebAssembly instructions executed within any further downstream calls of `composite_query_helper`).

In the future, the IC might expose more performance counters.

### Canister limit {#system-api-canister-limit}

The canister can query one of the "canister limits", which denotes a resource limit of the canister imposed by the current configuration of the IC and/or canister. This allows runtime logic, such garbage collector or persistence mechanism, to adapt to the system limits without recompilation and redeployment.

`ic0.canister_limit : (limit_type : i32) -> i64`

The argument `limit_type` determines which resource limit to return:

-   0 : The [soft Wasm heap memory limit](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/settings#wasm-memory-limit), or the IC-defined [hard Wasm memory limit](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/resource-limits#resource-constraints-and-limits), whatever is smaller. The limit is specific to the canister, depending on the canister configuration (for the soft limit) and on whether it uses 32-bit or 64-bit Wasm memory.

-   1 : The [instruction limit per update message](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/settings#wasm-memory-limit).

-   2 : The [instruction limit per upgrade message](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/settings#wasm-memory-limit).

-   3 : The [maximum number of stable memory Wasm pages that can be accessed per update message](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/settings#wasm-memory-limit).

-   4 : The [maximum number of stable memory Wasm pages that can be accessed per upgrade message](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/maintain/settings#wasm-memory-limit).

In the future, this IC method might expose more canister limits.

### Replicated execution check {#system-api-replicated-execution-check}

The canister can check whether it is currently running in replicated or non replicated execution.

`ic0.in_replicated_execution : () -> (result: i32)`

Returns 1 if the canister is being run in replicated mode and 0 otherwise.

### Controller check {#system-api-controller-check}

The canister can check whether a given principal is one of its controllers.

`ic0.is_controller : (src : i32, size: i32) -> (result: i32)`

Checks whether the principal identified by `src`/`size` is one of the controllers of the canister. If yes, then a value of 1 is returned, otherwise a 0 is returned. It can be called multiple times.

This system call traps if `src+size` exceeds the size of the WebAssembly memory or the principal identified by `src`/`size` is not a valid binary encoding of a principal.

### Certified data {#system-api-certified-data}

For each canister, the IC keeps track of "certified data", a canister-defined blob. For fresh canisters (upon install or reinstall), this blob is the empty blob (`""`).

-   `ic0.certified_data_set : (src: i32, size : i32) -> ()`

    The canister can update the certified data with this call. The passed data must be no larger than 32 bytes. This can be used any number of times.

When executing a query or composite query method via a query call (i.e. in non-replicated mode), the canister can fetch a certificate that authenticates to third parties the value last set via `ic0.certified_data_set`. The certificate is not available in composite query method callbacks and in query and composite query methods evaluated on canisters other than the target canister of the query call.

-   `ic0.data_certificate_present : () -> i32`

    returns `1` if a certificate is present, and `0` otherwise.

    This will return `1` when called from a query or composite query method on the target canister of a query call.

    This will return `0` for update methods, if a query or composite query method is executed in replicated mode (e.g. when invoked via an update call or inter-canister call), and in composite query method callbacks and in query and composite query methods evaluated on canisters other than the target canister of a query call.

-   `ic0.data_certificate_size : () → i32` and `ic0.data_certificate_copy : (dst: i32, offset: i32, size: i32) → ()`

    Copies the certificate for the current value of the certified data to the canister.

    The certificate is a blob as described in [Certification](#certification) that contains the values at path `/canister/<canister_id>/certified_data` and at path `/time` of [The system state tree](#state-tree).

    If this `certificate` includes a subnet delegation, then the id of the current canister will be included in the delegation's canister id range.

    This traps if `ic0.data_certificate_present()` returns `0`.

### Debugging aids

In a local canister execution environment, the canister needs a way to emit textual trace messages. On the "real" network, these do not do anything.

-   `ic0.debug_print : (src : i32, size : i32) -> ()`

    When executing in an environment that supports debugging, this copies out the data specified by `src` and `size`, and logs, prints or stores it in an environment-appropriate way. The copied data may likely be a valid string in UTF8-encoding, but the environment should be prepared to handle binary data (e.g. by printing it in escaped form). The data does typically not include a terminating `\0` or `\n`.

    Semantically, this function is always a no-op, and never traps, even if the `src+size` exceeds the size of the memory, or if this function is executed from `(start)`. If the environment cannot perform the print, it just skips it.

Similarly, the System API allows the canister to effectively trap, but give some indication about why it trapped:

-   `ic0.trap : (src : i32, size : i32) -> ()`

    This function always traps.

    The environment may copy out the data specified by `src` and `size`, and log, print or store it in an environment-appropriate way, or include it in system-generated reject messages where appropriate. The copied data may likely be a valid string in UTF8-encoding, but the environment should be prepared to handle binary data (e.g. by printing it in escaped form or substituting invalid characters).

### Outlook: Using Host References {#host-references}

The Internet Computer aims to make the most of the WebAssembly platform, and embraces WebAssembly features. With WebAssembly host references, we can make the platform more secure, the interfaces more abstract and more compositional. The above `ic0` System API does not yet use WebAssembly host references. Once they become available on our platform, a new version of the System API using host references will be available via the `ic` module. The changes will be, at least

1.  The introduction of a `api_nonce` reference, which models the capability to use the System API. It is passed as an argument to `canister_init`, `canister_update <name>` etc., and expected as an argument by almost all System API function calls. (The debugging aids remain unconstrained.)

2.  The use of references, instead of binary blobs, to address principals (user ids, canister ids), e.g. in `ic0.msg_caller` or in `ic0.call_new`. Additional functions will be provided to convert between the transparent binary representation of principals and references.

3.  Making the builder interface to create calls build calls identified by a reference, rather than having an implicit partial call in the background.

A canister may only use the old *or* the new interface; the IC detects which interface the canister intends to use based on the names and types of its function imports and exports.

## The IC management canister {#ic-management-canister}

The interfaces above provide the fundamental ability for external users and canisters to contact other canisters. But the Internet Computer provides additional functionality, such as canister and user management. This functionality is exposed to external users and canisters via the *IC management canister*.

:::note

The *IC management canister* is just a facade; it does not actually exist as a canister (with isolated state, Wasm code, etc.).

:::

The IC management canister address is `aaaaa-aa` (i.e. the empty blob).

It is possible to use the management canister via external requests (a.k.a. ingress messages). The cost of processing that request is charged to the canister that is being managed. Most methods only permit the controllers to call them. Calls to `raw_rand` and `deposit_cycles` are never accepted as ingress messages.

### Interface overview {#ic-candid}

The [interface description](_attachments/ic.did) below, in [Candid syntax](https://github.com/dfinity/candid/blob/master/spec/Candid.md), describes the available functionality.
``` candid name= ic-interface file file=_attachments/ic.did
```

The binary encoding of arguments and results are as per Candid specification.

### IC method `create_canister` {#ic-create_canister}

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

Before deploying a canister, the administrator of the canister first has to register it with the IC, to get a canister id (with an empty canister behind it), and then separately install the code.

The optional `settings` parameter can be used to set the following settings:

-   `controllers` (`vec principal`)

    A list of at most 10 principals. The principals in this list become the *controllers* of the canister.
    Note that the caller of the `create_canister` call is not a controller of the canister
    unless it is a member of the `controllers` list.

    Default value: A list containing only the caller of the `create_canister` call.

-   `compute_allocation` (`nat`)

    Must be a number between 0 and 100, inclusively. It indicates how much compute power should be guaranteed to this canister, expressed as a percentage of the maximum compute power that a single canister can allocate. If the IC cannot provide the requested allocation, for example because it is oversubscribed, the call will be rejected.

    Default value: 0

-   `memory_allocation` (`nat`)

    Must be a number between 0 and 2<sup>48</sup> (i.e 256TB), inclusively.
    It indicates the maximum amount of memory that the canister is allowed to use in total (i.e., any attempt to grow memory usage beyond the memory allocation will fail) and also guarantees availability of this amount of memory.
    If the IC cannot guarantee the requested memory allocation, for example because it is oversubscribed, then the call will be rejected.
    If set to 0, then memory growth of the canister will have no explicit limit but will only be best-effort and subject to the available memory on the IC.

    Default value: 0

-   `freezing_threshold` (`nat`)

    Must be a number between 0 and 2<sup>64</sup>-1, inclusively, and indicates a length of time in seconds.

    A canister is considered frozen whenever the IC estimates that the canister would be depleted of cycles before `freezing_threshold` seconds pass, given the canister's current size and the IC's current cost for storage.

    Calls to a frozen canister will be rejected with `SYS_TRANSIENT` reject code. Additionally, a canister cannot perform calls if that would, due the cost of the call and transferred cycles, would push the balance into frozen territory; these calls fail with `ic0.call_perform` returning a non-zero error code.

    Default value: 2592000 (approximately 30 days).

-   `reserved_cycles_limit` (`nat`)

    Must be a number between 0 and 2<sup>128</sup>-1, inclusively, and indicates the upper limit on `reserved_cycles` of the canister.

    An operation that allocates resources such as compute and memory will fail if the new value of `reserved_cycles` exceeds this limit.

    Default value: 5_000_000_000_000 (5 trillion cycles).

-   `wasm_memory_limit` (`nat`)

    Must be a number between 0 and 2<sup>48</sup>-1 (i.e., 256TB), inclusively, and indicates the upper limit on the WASM heap memory consumption of the canister.

    An operation (update method, canister init, canister post_upgrade) that causes the WASM heap memory consumption to exceed this limit will trap.
    The WASM heap memory limit is ignored for query methods, response callback handlers, global timers, heartbeats, and canister pre_upgrade.

    If set to 0, then there's no upper limit on the WASM heap memory consumption of the canister subject to the available memory on the IC.

    Default value: 0 (i.e., no explicit limit).

    Note: in a future release of this specification, the default value and whether the limit is enforced for global timers and heartbeats might change.

The optional `sender_canister_version` parameter can contain the caller's canister version. If provided, its value must be equal to `ic0.canister_version`.

Until code is installed, the canister is `Empty` and behaves like a canister that has no public methods.

Cycles to pay for the call must be explicitly transferred with the call, i.e., they are not automatically deducted from the caller's balance implicitly (e.g., as for inter-canister calls).

### IC method `update_settings` {#ic-update_settings}

This method can be called by canisters as well as by external users via ingress messages.

Only *controllers* of the canister can update settings. See [IC method](#ic-create_canister) for a description of settings.

Not including a setting in the `settings` record means not changing that field. The defaults described above are only relevant during canister creation.

The optional `sender_canister_version` parameter can contain the caller's canister version. If provided, its value must be equal to `ic0.canister_version`.

### IC method `upload_chunk` {#ic-upload_chunk}

This method can be called by canisters as well as by external users via ingress messages.

Canisters have associated some storage space (hence forth chunk storage) where they can hold chunks of Wasm modules that are too lage to fit in a single message. This method allows the controllers of a canister (and the canister itself) to upload such chunks. The method returns the hash of the chunk that was stored. The size of each chunk must be at most 1MiB. The maximum number of chunks in the chunk store is `CHUNK_STORE_SIZE` chunks. The storage cost of each chunk is fixed and corresponds to storing 1MiB of data.

### IC method `clear_chunk_store` {#ic-clear_chunk_store}

This method can be called by canisters as well as by external users via ingress messages.

Canister controllers (and the canister itself) can clear the entire chunk storage of a canister.

### IC method `stored_chunks` {#ic-stored_chunks}

This method can be called by canisters as well as by external users via ingress messages.

Canister controllers (and the canister itself) can list the hashes of chunks in the chunk storage of a canister.

### IC method `install_code` {#ic-install_code}

This method can be called by canisters as well as by external users via ingress messages.

This method installs code into a canister.

Only controllers of the canister can install code.

-   If `mode = variant { install }`, the canister must be empty before. This will instantiate the canister module and invoke its `canister_init` method (if present), as explained in Section "[Canister initialization](#system-api-init)", passing the `arg` to the canister.

-   If `mode = variant { reinstall }`, if the canister was not empty, its existing code and state (including stable memory) is removed before proceeding as for `mode = install`.

    Note that this is different from `uninstall_code` followed by `install_code`, as `uninstall_code` generates a synthetic reject response to all callers of the uninstalled canister that the uninstalled canister did not yet reply to and ensures that callbacks to outstanding calls made by the uninstalled canister won't be executed (i.e., upon receiving a response from a downstream call made by the uninstalled canister, the cycles attached to the response are refunded, but no callbacks are executed).

-   If `mode = variant { upgrade }` or `mode = variant { upgrade = opt record { skip_pre_upgrade = .., wasm_memory_persistence = .. } }`, this will perform an upgrade of a non-empty canister as described in [Canister upgrades](#system-api-upgrades), passing `arg` to the `canister_post_upgrade` method of the new instance. If `skip_pre_upgrade = opt true`, then the `canister_pre_upgrade` method on the old instance is not executed. If `wasm_memory_persistence = opt keep`, then the WebAssembly memory is preserved.

This is atomic: If the response to this request is a `reject`, then this call had no effect.

:::note

Some canisters may not be able to make sense of callbacks after upgrades; these should be stopped first, to wait for all outstanding callbacks, or be uninstalled first, to prevent outstanding callbacks from being invoked (by marking the corresponding call contexts as deleted). It is expected that the canister admin (or their tooling) does that separately.

:::

The `wasm_module` field specifies the canister module to be installed. The system supports multiple encodings of the `wasm_module` field, as described in [Canister module format](#canister-module-format):

-   If the `wasm_module` starts with byte sequence `[0x00, 'a', 's', 'm']`, the system parses `wasm_module` as a raw WebAssembly binary.

-   If the `wasm_module` starts with byte sequence `[0x1f, 0x8b, 0x08]`, the system parses `wasm_module` as a gzip-compressed WebAssembly binary.

The optional `sender_canister_version` parameter can contain the caller's canister version. If provided, its value must be equal to `ic0.canister_version`.

This method traps if the canister's cycle balance decreases below the canister's freezing limit after executing the method.

### IC method `install_chunked_code` {#ic-install_chunked_code}

This method can be called by canisters as well as by external users via ingress messages.

This method installs code that had previously been uploaded in chunks.

Only controllers of the target canister can call this method.

The `mode`, `arg`, and `sender_canister_version` parameters are as for `install_code`.
The `target_canister` specifies the canister where the code should be installed.
The optional `store_canister` specifies the canister in whose chunk storage the chunks are stored (this parameter defaults to `target_canister` if not specified).
For the call to succeed, the caller must be a controller of the `store_canister` or the caller must be the `store_canister`. The `store_canister` must be on the same subnet as the target canister.

The `chunk_hashes_list` specifies a list of hash values `[h1,...,hk]` with `k <= MAX_CHUNKS_IN_LARGE_WASM`. The system looks up in the chunk store of `store_canister` (or that of the target canister if `store_canister` is not specified) blobs corresponding to `h1,...,hk` and concatenates them to obtain a blob of bytes referred to as `wasm_module` in `install_code`. It then checks that the SHA-256 hash of `wasm_module` is equal to the `wasm_module_hash` parameter and calls `install_code` with parameters `(record {mode; target_canister; wasm_module; arg; sender_canister_version})`.

### IC method `uninstall_code` {#ic-uninstall_code}

This method can be called by canisters as well as by external users via ingress messages.

This method removes a canister's code and state, making the canister *empty* again.

Only controllers of the canister can uninstall code.

Uninstalling a canister's code will reject all calls that the canister has not yet responded to, and drop the canister's code and state. Outstanding responses to the canister will not be processed, even if they arrive after code has been installed again. Cycles attached to such responses will still be refunded though.

The canister is now [empty](#canister-lifecycle). In particular, any incoming or queued calls will be rejected.

A canister after *uninstalling* retains its *cycle* balances, *controllers*, history, status, and allocations.

The optional `sender_canister_version` parameter can contain the caller's canister version. If provided, its value must be equal to `ic0.canister_version`.

### IC method `canister_status` {#ic-canister_status}

This method can be called by canisters as well as by external users via ingress messages.

Indicates various information about the canister. It contains:

-   The status of the canister. It could be one of `running`, `stopping` or `stopped`.

-   The "settings" of the canister containing:

    -   The controllers of the canister. The order of returned controllers may vary depending on the implementation.

    -   The compute and memory allocation of the canister.

    -   The freezing threshold of the canister in seconds.

    -   The reserved cycles limit of the canister, i.e., the maximum number of cycles that can be in the canister's reserved balance after increasing the canister's memory allocation and/or actual memory usage.

    -   The canister log visibility of the canister.

    -   The WASM heap memory limit of the canister in bytes (the value of `0` means that there is no explicit limit).

-   A SHA256 hash of the module installed on the canister. This is `null` if the canister is empty.

-   The actual memory usage of the canister.

-   The cycle balance of the canister.

-   The reserved cycles balance of the canister, i.e., the number of cycles reserved when increasing the canister's memory allocation and/or actual memory usage.

-   The idle cycle consumption of the canister, i.e., the number of cycles burned by the canister per day due to its compute and memory allocation and actual memory usage.

-   Statistics regarding the query call execution of the canister, i.e., a record containing the following fields:

    * `num_calls_total`: the total number of query and composite query methods evaluated on the canister,

    * `num_instructions_total`: the total number of WebAssembly instructions executed during the evaluation of query and composite query methods,

    * `request_payload_bytes_total`: the total number of query and composite query method payload bytes, and

    * `response_payload_bytes_total`: the total number of query and composite query response payload (reply data or reject message) bytes.

Only the controllers of the canister or the canister itself can request its status.

### IC method `canister_info` {#ic-canister_info}

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

Provides the history of the canister, its current module SHA-256 hash, and its current controllers. Every canister can call this method on every other canister (including itself). Users cannot call this method.

The canister history consists of a list of canister changes (canister creation, code uninstallation, code deployment, snapshot restoration, or controllers change). Every canister change consists of the system timestamp at which the change was performed, the canister version after performing the change, the change's origin (a user or a canister), and its details. The change origin includes the principal (called *originator* in the following) that initiated the change and, if the originator is a canister, the originator's canister version when the originator initiated the change (if available). Code deployments are described by their mode (code install, code reinstall, code upgrade) and the SHA-256 hash of the newly deployed canister module. Loading a snapshot is described by the canister version, snapshot ID and timestamp at which the snapshot was taken. Canister creations and controllers changes are described by the full new set of the canister controllers after the change. The order of controllers stored in the canister history may vary depending on the implementation.

The system can drop the oldest canister changes from the list to keep its length bounded (at least `20` changes are guaranteed to remain in the list). The system also drops all canister changes if the canister runs out of cycles.

The following parameters should be supplied for the call:

-   `canister_id`: the canister ID of the canister to retrieve information about.

-   `num_requested_changes`: optional, specifies the number of requested canister changes. If not provided, the default value of `0` will be used.

The returned response contains the following fields:

-   `total_num_changes`: the total number of canister changes that have been ever recorded in the history. This value does not change if the system drops the oldest canister changes from the list of changes.

-   `recent_changes`: the list containing the most recent canister changes. If `num_requested_changes` is provided, then this list contains that number of changes or, if more changes are requested than available in the history, then this list contains all changes available in the history. If `num_requested_changes` is not specified, then this list is empty.

-   `module_hash`: the SHA-256 hash of the currently installed canister module (or `null` if the canister is empty).

-   `controllers`: the current set of canister controllers. The order of returned controllers may vary depending on the implementation.

### IC method `stop_canister` {#ic-stop_canister}

This method can be called by canisters as well as by external users via ingress messages.

The controllers of a canister may stop a canister (e.g., to prepare for a canister upgrade).

Stopping a canister is not an atomic action. The immediate effect is that the status of the canister is changed to `stopping` (unless the canister is already stopped). The IC will reject all calls to a stopping canister, indicating that the canister is stopping. Responses to a stopping canister are processed as usual. When all outstanding responses have been processed (so there are no open call contexts), the canister status is changed to `stopped` and the management canister responds to the caller of the `stop_canister` request.

### IC method `start_canister` {#ic-start_canister}

This method can be called by canisters as well as by external users via ingress messages.

A canister may be started by its controllers.

If the canister status was `stopped` or `stopping` then the canister status is simply set to `running`. In the latter case all `stop_canister` calls which are processing fail (and are rejected).

If the canister was already `running` then the status stays unchanged.

### IC method `delete_canister` {#ic-delete_canister}

This method can be called by canisters as well as by external users via ingress messages.

This method deletes a canister from the IC.

Only controllers of the canister can delete it and the canister must already be stopped. Deleting a canister cannot be undone, any state stored on the canister is permanently deleted and its cycles are discarded. Once a canister is deleted, its ID cannot be reused.

### IC method `deposit_cycles` {#ic-deposit_cycles}

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

This method deposits the cycles included in this call into the specified canister.

### IC method `raw_rand` {#ic-raw_rand}

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

This method takes no input and returns 32 pseudo-random bytes to the caller. The return value is unknown to any part of the IC at time of the submission of this call. A new return value is generated for each call to this method.

### IC method `ecdsa_public_key` {#ic-ecdsa_public_key}

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

This method returns a [SEC1](https://www.secg.org/sec1-v2.pdf) encoded ECDSA public key for the given canister using the given derivation path. If the `canister_id` is unspecified, it will default to the canister id of the caller. The `derivation_path` is a vector of variable length byte strings. Each byte string may be of arbitrary length, including empty. The total number of byte strings in the `derivation_path` must be at most 255. The `key_id` is a struct specifying both a curve and a name. The availability of a particular `key_id` depends on the implementation.

For curve `secp256k1`, the public key is derived using a generalization of BIP32 (see [ia.cr/2021/1330, Appendix D](https://ia.cr/2021/1330)). To derive (non-hardened) [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)-compatible public keys, each byte string (`blob`) in the `derivation_path` must be a 4-byte big-endian encoding of an unsigned integer less than 2<sup>31</sup>. If the `derivation_path` contains a byte string that is not a 4-byte big-endian encoding of an unsigned integer less than 2<sup>31</sup>, then a derived public key will be returned, but that key derivation process will not be compatible with the [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) standard.

The return value is an extended public key consisting of an ECDSA `public_key`, encoded in [SEC1](https://www.secg.org/sec1-v2.pdf) compressed form, and a `chain_code`, which can be used to deterministically derive child keys of the `public_key`.

This call requires that an ECDSA key with ID `key_id` was generated by the IC. Otherwise, the call is rejected.

### IC method `sign_with_ecdsa` {#ic-sign_with_ecdsa}

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

This method returns a new [ECDSA](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-4.pdf) signature of the given `message_hash` that can be separately verified against a derived ECDSA public key. This public key can be obtained by calling `ecdsa_public_key` with the caller's `canister_id`, and the same `derivation_path` and `key_id` used here.

The signatures are encoded as the concatenation of the [SEC1](https://www.secg.org/sec1-v2.pdf) encodings of the two values r and s. For curve `secp256k1`, this corresponds to 32-byte big-endian encoding.

This call requires that an ECDSA key with ID `key_id` was generated by the IC, the signing functionality for that key was enabled, and `message_hash` is 32 bytes long. Otherwise, the call is is rejected.

Cycles to pay for the call must be explicitly transferred with the call, i.e., they are not automatically deducted from the caller's balance implicitly (e.g., as for inter-canister calls).

### IC method `schnorr_public_key` {#ic-schnorr_public_key}

:::note

Threshold Schnorr API is EXPERIMENTAL and there might be breaking changes of the behavior in the future. Use at your own risk!

:::

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

This method returns a (derived) Schnorr public key for the given canister using the given derivation path. If the `canister_id` is unspecified, it will default to the canister id of the caller. The `derivation_path` is a vector of variable length byte strings. Each byte string may be of arbitrary length, including empty. The total number of byte strings in the `derivation_path` must be at most 255. The `key_id` is a struct specifying both an algorithm and a name. The availability of a particular `key_id` depends on the implementation.

The return value is an extended Schnorr public key consisting of a Schnorr `public_key` and a `chain_code`. The chain code can be used to deterministically derive child keys of the `public_key`. Both the derivation and the encoding of the public key depends on the key ID's `algorithm`:

-   For algorithm `bip340secp256k1`, the public key is derived using the generalization of BIP32 defined in [ia.cr/2021/1330, Appendix D](https://ia.cr/2021/1330). To derive (non-hardened) [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)-compatible public keys, each byte string (`blob`) in the `derivation_path` must be a 4-byte big-endian encoding of an unsigned integer less than 2<sup>31</sup>. If the `derivation_path` contains a byte string that is not a 4-byte big-endian encoding of an unsigned integer less than 2<sup>31</sup>, then a derived public key will be returned, but that key derivation process will not be compatible with the [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) standard.

    The public key is encoded in [SEC1](https://www.secg.org/sec1-v2.pdf) compressed form. To use BIP32 public keys to verify BIP340 Schnorr signatures, the first byte of the (33-byte) SEC1-encoded public key must be removed (see [BIP-340, Public Key Conversion](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki#public-key-conversion)).

-   For algorithm `ed25519`, the public key is derived using the scheme specified in [Ed25519 hierarchical key derivation](#ed25519-key-derivation).

    The public key is encoded in standard 32-byte compressed form (see [RFC8032, 5.1.2 Encoding](https://datatracker.ietf.org/doc/html/rfc8032#section-5.1.2)).

This call requires that a Schnorr key with ID `key_id` was generated by the IC. Otherwise, the call is rejected.

#### Ed25519 hierarchical key derivation {#ed25519-key-derivation}

This section describes a child key derivation (CKD) function for computing child public keys from Ed25519 parent public keys.
The section is inspired by [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) and uses similar wording and structure.

##### Motivation

To support the Ed25519 variant of threshold Schnorr signatures on the Internet Computer, a key derivation scheme compatible with Ed25519 signatures is required.
For a respective signing service on the Internet Computer to be efficient, the signing subnet maintains only a single master key pair and _derives_ signing child keys for each canister.
Although there exist various hierarchical key derivation schemes (e.g., [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki), [SLIP10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md), [BIP32-Ed25519](https://input-output-hk.github.io/adrestia/static/Ed25519_BIP.pdf), [Schnorrkel](https://github.com/w3f/schnorrkel)), all of the analyzed schemes are either incompatible in a threshold setting (e.g., use hardened key derivation only), comply with clamping which adds unnecessary complexity, or otherwise rely on non-standard primitives.
For these reasons, a new derivation scheme is specified here.
This scheme does not make use of _clamping_ (see [RFC8032, Section 5.1.5, Item 2](https://datatracker.ietf.org/doc/html/rfc8032#section-5.1.5)), because it is unnecessary in the given setting, and satisfies the following requirements:

- Off-chain availability: New public keys can be computed off-chain from a master public key without requiring interaction with the IC.
- Hierarchical derivation: Derived keys are organized in a tree such that from any public key it is possible to derive new child keys. The first level is used to derive unique canister-specific keys from the master key.
- Simplicity: The scheme is simple to implement using existing libraries.

##### Conventions

We will assume the elliptic curve (EC) operations using the field and curve parameters as defined by Ed25519 (see [RFC8032, Section 5.1](https://datatracker.ietf.org/doc/html/rfc8032#section-5.1)). Variables below are either:

- Integers modulo the order of the curve's prime order subgroup (referred to as L).
- Points on the curve.
- Byte sequences.

Addition (+) of two points is defined as application of the EC group operation.
Concatenation (||) is the operation of appending one byte sequence onto another.

We assume the following functions:

- point(p): returns the point resulting from EC point multiplication (repeated application of the EC group operation) of the Ed25519 base point with the integer p.
- ser<sub>P</sub>(P): serializes the point to a byte sequence using standard 32-byte compressed form (see [RFC8032, 5.1.2 Encoding](https://datatracker.ietf.org/doc/html/rfc8032#section-5.1.2)).
- utf8(s): returns the UTF-8 encoding of string s.
- parse<sub>512</sub>(p): interprets a 64-byte sequence as a 512-bit number, most significant byte first.
- HKDF(salt,IKM,info,N) -> OKM: HMAC-based key derivation function (see [RFC5869](https://datatracker.ietf.org/doc/html/rfc5869)) using HMAC-SHA512 (see [RFC4231](https://datatracker.ietf.org/doc/html/rfc4231)) calculating N-bytes long output key material (OKM) from (byte sequences) salt, input key material (IKM), and application specific information *info*.

##### Extended keys

Public keys are extended with an extra 32 bytes of entropy, which extension is called chain code.
An extended public key is represented as (K, c), with K = point(k) and c being the chain code, for some private key k.
Each extended key can have an arbitrary number of child keys.
The scheme does not support hardened derivation of child keys.

##### Child key derivation (CKD) function

Given a parent extended public key and an index i, it is possible to compute the corresponding child extended public key.
The function CKDpub computes a child extended public key from a parent extended public key and an index i, where i is a byte sequence of arbitrary length (including empty).

CKDpub((K<sub>par</sub>, c<sub>par</sub>), i) → (K<sub>i</sub>, c<sub>i</sub>):
- let IKM = ser<sub>P</sub>(K<sub>par</sub>) || i.
- let OKM = HKDF(c<sub>par</sub>, IKM, utf8("Ed25519"), 96).
- Split OKM into a 64-byte and a 32-byte sequence, tweak and c<sub>i</sub>.
- let K<sub>i</sub> = K<sub>par</sub> + point(parse<sub>512</sub>(tweak) mod L).
- return (K<sub>i</sub>, c<sub>i</sub>).

##### Key tree

A key tree can be built by repeatedly applying CKDpub, starting with one root, called the master extended public key M.
Computing CKDpub(M, i) for different values of i results in a number of level-0 derived keys.
As each of these is again an extended key, CKDpub can be applied to those as well.
The sequence of indices used when repeatedly applying CKDpub is called the _derivation path_.

The function KTpub computes a child extended public key from a parent extended public key and a derivation path d.

KTpub((K<sub>par</sub>, c<sub>par</sub>), d) → (K<sub>d</sub>, c<sub>d</sub>):
- let (K<sub>d</sub>, c<sub>d</sub>) = (K<sub>par</sub>, c<sub>par</sub>)
- for all indices i in d:
  (K<sub>d</sub>, c<sub>d</sub>) = CKDpub((K<sub>d</sub>, c<sub>d</sub>), i)
- return (K<sub>d</sub>, c<sub>d</sub>).

### IC method `sign_with_schnorr` {#ic-sign_with_schnorr}

:::note

Threshold Schnorr API is EXPERIMENTAL and there might be breaking changes of the behavior in the future. Use at your own risk!

:::

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

This method returns a Schnorr signature of the given `message` that can be verified against a (derived) public key obtained by calling `schnorr_public_key` using the caller's `canister_id` and the given `derivation_path` and `key_id`.

The encoding of the signature depends on the key ID's `algorithm`:

-   For algorithm `bip340secp256k1`, the signature is encoded in 64 bytes according to [BIP340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki).

-   For algorithm `ed25519`, the signature is encoded in 64 bytes according to [RFC8032, 5.1.6 Sign](https://datatracker.ietf.org/doc/html/rfc8032#section-5.1.6).

This call requires that a Schnorr key with ID `key_id` was generated by the IC and the signing functionality for that key was enabled. Otherwise, the call is is rejected.

Cycles to pay for the call must be explicitly transferred with the call, i.e., they are not automatically deducted from the caller's balance implicitly (e.g., as for inter-canister calls).

### IC method `http_request` {#ic-http_request}

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

This method makes an HTTP request to a given URL and returns the HTTP response, possibly after a transformation.

The canister should aim to issue *idempotent* requests, meaning that it must not change the state at the remote server, or the remote server has the means to identify duplicated requests. Otherwise, the risk of failure increases.

The responses for all identical requests must match too. However, a web service could return slightly different responses for identical idempotent requests. For example, it may include some unique identification or a timestamp that would vary across responses.

For this reason, the calling canister can supply a transformation function, which the IC uses to let the canister sanitize the responses from such unique values. The transformation function is executed separately on the corresponding response received for a request. The final response will only be available to the calling canister.

Currently, the `GET`, `HEAD`, and `POST` methods are supported for HTTP requests.

It is important to note the following for the usage of the `POST` method:

- The calling canister must make sure that the remote server is able to handle idempotent requests sent from multiple sources. This may require, for example, to set a certain request header to uniquely identify the request.

- There are no confidentiality guarantees on the request content. There is no guarantee that all sent requests are as specified by the canister. If the canister receives a response, then at least one request that was sent matched the canister's request, and the response was to that request.

For security reasons, only HTTPS connections are allowed (URLs must start with `https://`). The IC uses industry-standard root CA lists to validate certificates of remote web servers.

The **size** of an HTTP request from the canister or an HTTP response from the remote HTTP server is the total number of bytes representing the names and values of HTTP headers and the HTTP body. The maximal size for the request from the canister is `2MB` (`2,000,000B`). Each request can specify a maximal size for the response from the remote HTTP server. The upper limit on the maximal size for the response is `2MB` (`2,000,000B`) and this value also applies if no maximal size value is specified. An error will be returned when the request or response is larger than the maximal size.

The following parameters should be supplied for the call:

-   `url` - the requested URL. The URL must be valid according to [RFC-3986](https://www.ietf.org/rfc/rfc3986.txt) and its length must not exceed `8192`. The URL may specify a custom port number.

-   `max_response_bytes` - optional, specifies the maximal size of the response in bytes. If provided, the value must not exceed `2MB` (`2,000,000B`). The call will be charged based on this parameter. If not provided, the maximum of `2MB` will be used.

-   `method` - currently, only GET, HEAD, and POST are supported

-   `headers` - list of HTTP request headers and their corresponding values

-   `body` - optional, the content of the request's body

-   `transform` - an optional record that includes a function that transforms raw responses to sanitized responses, and a byte-encoded context that is provided to the function upon invocation, along with the response to be sanitized. If provided, the calling canister itself must export this function.

Cycles to pay for the call must be explicitly transferred with the call, i.e., they are not automatically deducted from the caller's balance implicitly (e.g., as for inter-canister calls).

The returned response (and the response provided to the `transform` function, if specified) contains the following fields:

-   `status` - the response status (e.g., 200, 404)

-   `headers` - list of HTTP response headers and their corresponding values

-   `body` - the response's body

The `transform` function may, for example, transform the body in any way, add or remove headers, modify headers, etc. The maximal number of bytes representing the response produced by the `transform` function is `2MB` (`2,000,000B`). Note that the number of bytes representing the response produced by the `transform` function includes the serialization overhead of the encoding produced by the canister.

When the transform function is invoked by the system due to a canister HTTP request, the caller's identity is the principal of the management canister. This information can be used by developers to implement access control mechanism for this function.

The following additional limits apply to HTTP requests and HTTP responses from the remote sever:

-   the number of headers must not exceed `64`,

-   the number of bytes representing a header name or value must not exceed `8KiB`, and

-   the total number of bytes representing the header names and values must not exceed `48KiB`.

If the request headers provided by the canister do not contain a `user-agent` header (case-insensitive),
then the IC sends a `user-agent` header (case-insensitive) with the value `ic/1.0`
in addition to the headers provided by the canister. Such an additional header does not contribute
to the above limits on HTTP request headers.

:::note

Currently, the Internet Computer mainnet only supports URLs that resolve to IPv6 destinations (i.e., the domain has a `AAAA` DNS record) in HTTP requests.

:::

:::warning

If you do not specify the `max_response_bytes` parameter, the maximum of a `2MB` response will be charged for, which is expensive in terms of cycles. Always set the parameter to a reasonable upper bound of the expected network response size to not incur unnecessary cycles costs for your request.

:::

### IC method `node_metrics_history` {#ic-node-metrics-history}

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

:::note

The node metrics management canister API is considered EXPERIMENTAL. Canister developers must be aware that the API may evolve in a non-backward-compatible way.

:::

Given a subnet ID as input, this method returns a time series of node metrics (field `node_metrics`). The timestamps are represented as nanoseconds since 1970-01-01 (field `timestamp_nanos`) at which the metrics were sampled. The returned timestamps are all timestamps after (and including) the provided timestamp (field `start_at_timestamp_nanos`) for which node metrics are available. The maximum number of returned timestamps is 60 and no two returned timestamps belong to the same UTC day.

Note that a sample will only include metrics for nodes whose metrics changed compared to the previous sample. This means that if a node disappears in one sample and later reappears its metrics will restart from 0 and consumers of this API need to adjust for these resets when aggregating over multiple samples.

A single metric entry is a record with the following fields:

- `node_id` (`principal`): the principal characterizing a node;

- `num_blocks_proposed_total` (`nat64`): the number of blocks proposed by this node;

- `num_block_failures_total` (`nat64`): the number of failed block proposals by this node.

### IC method `take_canister_snapshot` {#ic-take_canister_snapshot}

This method can be called by canisters as well as by external users via ingress messages.

This method takes a snapshot of the specified canister. A snapshot consists of the wasm memory, stable memory, certified variables, wasm chunk store and wasm binary.

Subsequent `take_canister_snapshot` calls will create a new snapshot. However, a `take_canister_snapshot` call might fail if the maximum number of snapshots per canister is reached. This error can be avoided by providing a snapshot ID via the optional `replace_snapshot` parameter. The snapshot identified by the specified ID will be deleted once a new snapshot has been successfully created. Currently, only one snapshot per canister is allowed.

It's important to note that a snapshot will increase the memory footprint of the canister. Thus, the canister's balance must have a sufficient amount of cycles to not become frozen.

Only controllers can take a snapshot of a canister and load it back to the canister.

:::note

It's important to stop a canister before taking a snapshot to ensure that all outstanding callbacks are completed. Failing to do so may cause the canister to not make sense of the callbacks if its state is restored using the snapshot.
It is expected that the canister controllers (or their tooling) do this separately.

:::

### IC method `load_canister_snapshot` {#ic-load_canister_snapshot}

This method can be called by canisters as well as by external users via ingress messages.

This method loads a snapshot identified by `snapshot_id` onto the canister. It fails if no snapshot with the specified `snapshot_id` can be found.

Only controllers can take a snapshot of a canister and load it back to the canister.

:::note

It's important to stop a canister before loading a snapshot to ensure that all outstanding callbacks are completed. Failing to do so may cause the canister to not make sense of the callbacks if its state is restored.
It is expected that the canister controllers (or their tooling) do this separately.

:::

The optional `sender_canister_version` parameter can contain the caller's canister version. If provided, its value must be equal to `ic0.canister_version`.

### IC method `list_canister_snapshots` {#ic-list_canister_snapshots}

This method can be called by canisters as well as by external users via ingress messages.

This method lists the snapshots of the canister identified by `canister_id`. Only controllers of the canister can list its snapshots. Currently, at most one snapshot per canister will be stored.

### IC method `delete_canister_snapshot` {#ic-delete_canister_snapshot}

This method can be called by canisters as well as by external users via ingress messages.

This method deletes a specified snapshot that belongs to an existing canister. An error will be returned if the snapshot is not found. 

A snapshot cannot be found if it was never created, it was previously deleted, replaced by a new snapshot through a `take_canister_snapshot` request, or if the canister itself has been deleted or run out of cycles.

A snapshot may be deleted only by the controllers of the canister for which the snapshot was taken.

### IC method `fetch_canister_logs` {#ic-fetch_canister_logs}

This method can only be called by external users via non-replicated calls, i.e., it cannot be called by canisters, cannot be called via replicated calls, and cannot be called from composite query calls.

:::note

The canister logs management canister API is considered EXPERIMENTAL. Canister developers must be aware that the API may evolve in a non-backward-compatible way.

:::

Given a canister ID as input, this method returns a vector of logs of that canister including its trap messages.
The canister logs are *not* collected in canister methods running in non-replicated mode (NRQ, CQ, CRy, CRt, CC, and F modes, as defined in [Overview of imports](#system-api-imports)) and the canister logs are *purged* when the canister is reinstalled or uninstalled.
The total size of all returned logs does not exceed 4KiB.
If new logs are added resulting in exceeding the maximum total log size of 4KiB, the oldest logs will be removed.
Logs persist across canister upgrades and they are deleted if the canister is reinstalled or uninstalled.

The log visibility is defined in the `log_visibility` field of `canister_settings` and can be one of the following variants:

- `controllers`: only the canister's controllers can fetch logs (default);
- `public`: everyone can fetch logs;
- `allowed_viewers` (`vec principal`): only principals in the provided list and the canister's controllers can fetch logs, the maximum length of the list is 10.

A single log is a record with the following fields:

- `idx` (`nat64`): the unique sequence number of the log for this particular canister;
- `timestamp_nanos` (`nat64`): the timestamp as nanoseconds since 1970-01-01 at which the log was recorded;
- `content` (`blob`): the actual content of the log;

:::warning

The response of a query comes from a single replica, and is therefore not appropriate for security-sensitive applications.
Replica-signed queries may improve security because the recipient can verify the response comes from the correct subnet.

:::

## The IC Bitcoin API {#ic-bitcoin-api}

The Bitcoin API exposed by the management canister is DEPRECATED.
Developers should interact with the Bitcoin canisters (`ghsi2-tqaaa-aaaan-aaaca-cai` for Bitcoin mainnet and `g4xu7-jiaaa-aaaan-aaaaq-cai` for Bitcoin testnet) directly.
Information about Bitcoin and the IC Bitcoin integration can be found in the [Bitcoin developer guides](https://developer.bitcoin.org/devguide/) and  the [Bitcoin integration documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/bitcoin-how-it-works).

### IC method `bitcoin_get_utxos` {#ic-bitcoin_get_utxos}

:::note

This method is DEPRECATED. Canister developers are advised to call the method of the same name on the Bitcoin (mainnet or testnet) canister.

:::

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

Given a `get_utxos_request`, which must specify a Bitcoin address and a Bitcoin network (`mainnet` or `testnet`), the function returns all unspent transaction outputs (UTXOs) associated with the provided address in the specified Bitcoin network based on the current view of the Bitcoin blockchain available to the Bitcoin component. The UTXOs are returned sorted by block height in descending order.

The following address formats are supported:

-   Pay to public key hash (P2PKH)

-   Pay to script hash (P2SH)

-   Pay to witness public key hash (P2WPKH)

-   Pay to witness script hash (P2WSH)

-   Pay to taproot (P2TR)

If the address is malformed, the call is rejected.

The optional `filter` parameter can be used to restrict the set of returned UTXOs, either providing a minimum number of confirmations or a page reference when pagination is used for addresses with many UTXOs. In the first case, only UTXOs with at least the provided number of confirmations are returned, i.e., transactions with fewer than this number of confirmations are not considered. In other words, if the number of confirmations is `c`, an output is returned if it occurred in a transaction with at least `c` confirmations and there is no transaction that spends the same output with at least `c` confirmations.

There is an upper bound of 144 on the minimum number of confirmations. If a larger minimum number of confirmations is specified, the call is rejected. Note that this is not a severe restriction as the minimum number of confirmations is typically set to a value around 6 in practice.

It is important to note that the validity of transactions is not verified in the Bitcoin component. The Bitcoin component relies on the proof of work that goes into the blocks and the verification of the blocks in the Bitcoin network. For a newly discovered block, a regular Bitcoin (full) node therefore provides a higher level of security than the Bitcoin component, which implies that it is advisable to set the number of confirmations to a reasonably large value, such as 6, to gain confidence in the correctness of the returned UTXOs.

There is an upper bound of 10,000 UTXOs that can be returned in a single request. For addresses that contain sufficiently many UTXOs, a partial set of the address's UTXOs are returned along with a page reference.

In the second case, a page reference (a series of bytes) must be provided, which instructs the Bitcoin component to collect UTXOs starting from the corresponding "page".

A `get_utxos_request` without the optional `filter` results in a request that considers the full blockchain, which is equivalent to setting `min_confirmations` to 0.

The recommended workflow is to issue a request with the desired number of confirmations. If the `next_page` field in the response is not empty, there are more UTXOs than in the returned vector. In that case, the `page` field should be set to the `next_page` bytes in the subsequent request to obtain the next batch of UTXOs.

### IC method `bitcoin_get_balance` {#ic-bitcoin_get_balance}

:::note

This method is DEPRECATED. Canister developers are advised to call the method of the same name on the Bitcoin (mainnet or testnet) canister.

:::

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

Given a `get_balance_request`, which must specify a Bitcoin address and a Bitcoin network (`mainnet` or `testnet`), the function returns the current balance of this address in `Satoshi` (10^8 Satoshi = 1 Bitcoin) in the specified Bitcoin network. The same address formats as for [`bitcoin_get_utxos`](#ic-bitcoin_get_utxos) are supported.

If the address is malformed, the call is rejected.

The optional `min_confirmations` parameter can be used to limit the set of considered UTXOs for the calculation of the balance to those with at least the provided number of confirmations in the same manner as for the [`bitcoin_get_utxos`](#ic-bitcoin_get_utxos) call.

Given an address and the optional `min_confirmations` parameter, `bitcoin_get_balance` iterates over all UTXOs, i.e., the same balance is returned as when calling [`bitcoin_get_utxos`](#ic-bitcoin_get_utxos) for the same address and the same number of confirmations and, if necessary, using pagination to get all UTXOs for the same tip hash.

### IC method `bitcoin_send_transaction` {#ic-bitcoin_send_transaction}

:::note

This method is DEPRECATED. Canister developers are advised to call the method of the same name on the Bitcoin (mainnet or testnet) canister.

:::

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

Given a `send_transaction_request`, which must specify a `blob` of a Bitcoin transaction and a Bitcoin network (`mainnet` or `testnet`), several checks are performed:

-   The transaction is well formed.

-   The transaction only consumes unspent outputs with respect to the current (longest) blockchain, i.e., there is no block on the (longest) chain that consumes any of these outputs.

-   There is a positive transaction fee.

If at least one of these checks fails, the call is rejected.

If the transaction passes these tests, the transaction is forwarded to the specified Bitcoin network. Note that the function does not provide any guarantees that the transaction will make it into the mempool or that the transaction will ever appear in a block.

### IC method `bitcoin_get_current_fee_percentiles` {#ic-bitcoin_get_current_fee_percentiles}

:::note

This method is DEPRECATED. Canister developers are advised to call the method of the same name on the Bitcoin (mainnet or testnet) canister.

:::

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

The transaction fees in the Bitcoin network change dynamically based on the number of pending transactions. It must be possible for a canister to determine an adequate fee when creating a Bitcoin transaction.

This function returns fee percentiles, measured in millisatoshi/vbyte (1000 millisatoshi = 1 satoshi), over the last 10,000 transactions in the specified network, i.e., over the transactions in the last approximately 4-10 blocks.

The [standard nearest-rank estimation method](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method), inclusive, with the addition of a 0th percentile is used. Concretely, for any i from 1 to 100, the ith percentile is the fee with rank `⌈i * 100⌉`. The 0th percentile is defined as the smallest fee (excluding coinbase transactions).

### IC method `bitcoin_get_block_headers` {#ic-bitcoin_get_block_headers}

:::note

This method is DEPRECATED. Canister developers are advised to call the method of the same name on the Bitcoin (mainnet or testnet) canister.

:::

This method can only be called by canisters, i.e., it cannot be called by external users via ingress messages.

Given a start height, an optional end height, and a Bitcoin network (`mainnet` or `testnet`), the function returns the block headers in the provided range. The range is inclusive, i.e., the block headers at the start and end heights are returned as well.
An error is returned when an end height is specified that is greater than the tip height.

If no end height is specified, all blocks until the tip height, i.e., the largest available height, are returned. However, if the range from the start height to the end height or the tip height is large, only a prefix of the requested block headers may be returned in order to bound the size of the response.

The response is guaranteed to contain the block headers in order: if it contains any block headers, the first block header occurs at the start height, the second block header occurs at the start height plus one and so forth.

The response is a record consisting of the tip height and the vector of block headers.
The block headers are 80-byte blobs in the [standard Bitcoin format](https://developer.bitcoin.org/reference/block_chain.html#block-headers).

## The IC Provisional API {#ic-provisional-api}

The IC Provisional API for creating canisters and topping up canisters out of thin air is only available in local development instances.

### IC method `provisional_create_canister_with_cycles` {#ic-provisional_create_canister_with_cycles}

This method can be called by canisters as well as by external users via ingress messages.

As a provisional method on development instances, the `provisional_create_canister_with_cycles` method is provided. It behaves as `create_canister`, but initializes the canister's balance with `amount` fresh cycles (using `DEFAULT_PROVISIONAL_CYCLES_BALANCE` if `amount = null`). If `specified_id` is provided, the canister is created under this id. Note that canister creation using `create_canister` or `provisional_create_canister_with_cycles` with `specified_id = null` can fail after calling `provisional_create_canister_with_cycles` with provided `specified_id`. In that case, canister creation should be retried.

The optional `sender_canister_version` parameter can contain the caller's canister version. If provided, its value must be equal to `ic0.canister_version`.

Cycles added to this call via `ic0.call_cycles_add` and `ic0.call_cycles_add128` are returned to the caller.

This method is only available in local development instances.

### IC method `provisional_top_up_canister` {#ic-provisional_top_up_canister}

This method can be called by canisters as well as by external users via ingress messages.

As a provisional method on development instances, the `provisional_top_up_canister` method is provided. It adds `amount` cycles to the balance of canister identified by `amount`.

Cycles added to this call via `ic0.call_cycles_add` and `ic0.call_cycles_add128` are returned to the caller.

Any user can top-up any canister this way.

This method is only available in local development instances.

## Certification {#certification}

Some parts of the IC state are exposed to users in a tamperproof way via certification: the IC can reveal a *partial state tree* which includes just the data of interest, together with a signature on the root hash of the state tree. This means that a user can be sure that the response is correct, even if the user happens to be communicating with a malicious node, or has received the certificate via some other untrusted way.

To validate a value using a certificate, the user conceptually

1.  checks the validity of the partial tree using `verify_cert`,

2.  looks up the value in the certificate using `lookup` at a given path, which uses the subroutine `lookup_path` on the certificate's tree.

This mechanism is used in the `read_state` request type, and eventually also for other purposes.

### Root of trust

The root of trust is the *root public key*, which must be known to the user a priori. In a local canister execution environment, the key can be fetched via the [`/api/v2/status`](#api-status) endpoint.

### Certificate

A certificate consists of

-   a tree

-   a signature on the tree root hash valid under some *public key*

-   an optional *delegation* that links that public key to *root public key*.

The IC will certify states by issuing certificates where the tree is a partial state tree. The state tree can be pruned by replacing subtrees with their root hashes (yielding a new and potentially smaller but still valid certificate) to only include paths pertaining to relevant data but still preserving enough information to recover the *tree root hash*.

More formally, a certificate is described by the following data structure:
```
Certificate = {
  tree : HashTree
  signature : Signature
  delegation : NoDelegation | Delegation
}
HashTree
  = Empty
  | Fork HashTree HashTree
  | Labeled Label HashTree
  | Leaf blob
  | Pruned Hash
Label = Blob
Hash = Blob
Signature = Blob
```

A certificate is validated with regard to the root of trust by the following algorithm (which uses `check_delegation` defined in [Delegation](#certification-delegation)):

    verify_cert(cert) =
      let root_hash = reconstruct(cert.tree)
      // see section Delegations below
      if check_delegation(cert.delegation) = false then return false
      let bls_key = delegation_key(cert.delegation)
      verify_bls_signature(bls_key, cert.signature, domain_sep("ic-state-root") · root_hash)

    reconstruct(Empty)       = H(domain_sep("ic-hashtree-empty"))
    reconstruct(Fork t1 t2)  = H(domain_sep("ic-hashtree-fork") · reconstruct(t1) · reconstruct(t2))
    reconstruct(Labeled l t) = H(domain_sep("ic-hashtree-labeled") · l · reconstruct(t))
    reconstruct(Leaf v)      = H(domain_sep("ic-hashtree-leaf") · v)
    reconstruct(Pruned h)    = h

    domain_sep(s) = byte(|s|) · s

where `H` is the SHA-256 hash function,

    verify_bls_signature : PublicKey -> Signature -> Blob -> Bool

is the [BLS signature verification function](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-04#section-4), ciphersuite BLS\_SIG\_BLS12381G1\_XMD:SHA-256\_SSWU\_RO\_NUL\_. See that document also for details on the encoding of BLS public keys and signatures.

All state trees include the time at path `/time` (see [Time](#state-tree-time)). Users that get a certificate with a state tree can look up the timestamp to guard against working on obsolete data.

### Lookup {#lookup}

Given a (verified) tree, the user can fetch the value at a given path, which is a sequence of labels (blobs). In this document, we write paths suggestively with slashes as separators; the actual encoding is not actually using slashes as delimiters.

The following algorithm looks up a `path` in a certificate, and returns either

-   `Found v`: the requested `path` has an associated value `v` in the tree,

-   `Absent`: the requested path is not in the tree,

-   `Unknown`: it cannot be syntactically determined if the requested `path` was pruned or not; i.e., there exist at least two trees (one containing the requested path and one *not* containing the requested path) from which the given tree can be obtained by pruning some subtrees,

-   `Error`: the requested path does not have an associated value in the tree, but the requested path is in the tree:

```html

lookup(path, cert) = lookup_path(path, cert.tree)

lookup_path([], Empty) = Absent
lookup_path([], Leaf v) = Found v
lookup_path([], Pruned _) = Unknown
lookup_path([], Labeled _ _) = Error
lookup_path([], Fork _ _) = Error

lookup_path(l::ls, tree) =
  match find_label(l, flatten_forks(tree)) with
  | Absent -> Absent
  | Unknown -> Unknown
  | Error -> Error
  | Found subtree -> lookup_path ls subtree

flatten_forks(Empty) = []
flatten_forks(Fork t1 t2) = flatten_forks(t1) · flatten_forks(t2)
flatten_forks(t) = [t]

find_label(l, _ · Labeled l1 t · _)                | l == l1     = Found t
find_label(l, _ · Labeled l1 _ · Labeled l2 _ · _) | l1 < l < l2 = Absent
find_label(l,                    Labeled l2 _ · _) |      l < l2 = Absent
find_label(l, _ · Labeled l1 _ )                   | l1 < l      = Absent
find_label(l, [Leaf _])                                          = Absent
find_label(l, [])                                                = Absent
find_label(l, _)                                                 = Unknown

```

The IC will only produce well-formed state trees, and the above algorithm assumes well-formed trees. These have the property that labeled subtrees appear in strictly increasing order of labels, and are not mixed with leaves. More formally:

    well_formed(tree) =
      (tree = Leaf _) ∨ (well_formed_forest(flatten_forks(tree)))

    well_formed_forest(trees) =
      strictly_increasing([l | Label l _ ∈ trees]) ∧
      ∀ Label _ t ∈ trees. well_formed(t) ∧
      ∀ t ∈ trees. t ≠ Leaf _

### Delegation {#certification-delegation}

The root key can delegate certification authority to other keys.

A certificate by the root subnet does not have a delegation field. A certificate by other subnets include a delegation, which is itself a certificate that proves that the subnet is listed in the root subnet's state tree (see [Subnet information](#state-tree-subnet)), and reveals its public key.

:::note

The certificate included in the delegation (if present) must not itself again contain a delegation.

:::

```
Delegation = {
   subnet_id : Principal;
   certificate : Certificate;
 }
```

A delegation is verified using the following algorithm:
```
check_delegation(NoDelegation) = true
check_delegation(Delegation d) = verify_cert(d.certificate) and lookup(["subnet",d.subnet_id,"public_key"],d.certificate) = Found _ and d.certificate.delegation = NoDelegation
```

The delegation key (a BLS key) is computed by the following algorithm:
```
delegation_key(NoDelegation) : public_bls_key = root_public_key
delegation_key(Delegation d) : public_bls_key =
  match lookup(["subnet",d.subnet_id,"public_key"],d.certificate) with
    Found der_key -> extract_der(der_key)
```

where `root_public_key` is the a priori known root key and
```
extract_der : Blob -> Blob
```

implements DER decoding of the public key, following [RFC5480](https://datatracker.ietf.org/doc/html/rfc5480) using OID 1.3.6.1.4.1.44668.5.3.1.2.1 for the algorithm and 1.3.6.1.4.1.44668.5.3.2.1 for the curve.

Delegations are *scoped*, i.e., they indicate which set of canister principals the delegatee subnet may certify for. This set can be obtained from a delegation `d` using `lookup(["subnet",d.subnet_id,"canister_ranges"],d.certificate)`, which must be present, and is encoded as described in [Subnet information](#state-tree-subnet). The various applications of certificates describe if and how the subnet scope comes into play.

### Encoding of certificates {#certification-encoding}

The binary encoding of a certificate is a CBOR (see [CBOR](#cbor)) value according to the following CDDL (see [CDDL](#cddl)). You can also [download the file](_attachments/certificates.cddl).

The values in the [The system state tree](#state-tree) are encoded to blobs as follows:

-   natural numbers are leb128-encoded.

-   text values are UTF-8-encoded

-   blob values are encoded as is

### Example

Consider the following tree-shaped data (all single character strings denote labels, all other denote values)

    ─┬╴ "a" ─┬─ "x" ─╴"hello"
     │       └╴ "y" ─╴"world"
     ├╴ "b" ──╴ "good"
     ├╴ "c"
     └╴ "d" ──╴ "morning"

A possible hash tree for this labeled tree might be, where `┬` denotes a fork. This is not a typical encoding (a fork with `Empty` on one side can be avoided), but it is valid.

    ─┬─┬╴"a" ─┬─┬╴"x" ─╴"hello"
     │ │      │ └╴Empty
     │ │      └╴  "y" ─╴"world"
     │ └╴"b" ──╴"good"
     └─┬╴"c" ──╴Empty
       └╴"d" ──╴"morning"

This tree has the following CBOR (see [CBOR](#cbor)) encoding

    8301830183024161830183018302417882034568656c6c6f810083024179820345776f726c6483024162820344676f6f648301830241638100830241648203476d6f726e696e67

and the following root hash

    eb5c5b2195e62d996b84c9bcc8259d19a83786a2f59e0878cec84c811f669aa0

Pruning this tree with the following paths

      /a/y
      /ax
      /d

would lead to this tree (with pruned subtree represented by their hash):

    ─┬─┬╴"a" ─┬─ 1B4FEFF9BEF8131788B0C9DC6DBAD6E81E524249C879E9F10F71CE3749F5A638
     │ │      └╴ "y" ─╴"world"
     │ └╴"b" ──╴7B32AC0C6BA8CE35AC82C255FC7906F7FC130DAB2A090F80FE12F9C2CAE83BA6
     └─┬╴EC8324B8A1F1AC16BD2E806EDBA78006479C9877FED4EB464A25485465AF601D
       └╴"d" ──╴"morning"

Note that the `"b"` label is included (without content) to prove the absence of the `/ax` path.

This tree encodes to CBOR as

    83018301830241618301820458201b4feff9bef8131788b0c9dc6dbad6e81e524249c879e9f10f71ce3749f5a63883024179820345776f726c6483024162820458207b32ac0c6ba8ce35ac82c255fc7906f7fc130dab2a090f80fe12f9c2cae83ba6830182045820ec8324b8a1f1ac16bd2e806edba78006479c9877fed4eb464a25485465af601d830241648203476d6f726e696e67

and (obviously) the same root hash.

In the pruned tree, the `lookup_path` function behaves as follows:

    lookup_path(["a", "a"], pruned_tree) = Unknown
    lookup_path(["a", "y"], pruned_tree) = Found "world"
    lookup_path(["aa"],     pruned_tree) = Absent
    lookup_path(["ax"],     pruned_tree) = Absent
    lookup_path(["b"],      pruned_tree) = Unknown
    lookup_path(["bb"],     pruned_tree) = Unknown
    lookup_path(["d"],      pruned_tree) = Found "morning"
    lookup_path(["e"],      pruned_tree) = Absent

## The HTTP Gateway protocol {#http-gateway}

The HTTP Gateway Protocol has been moved into its own [specification](./http-gateway-protocol-spec.md).

## Abstract behavior {#abstract-behavior}

The previous sections describe the interfaces, i.e. outer edges of the Internet Computer, but give only intuitive and vague information in prose about what these interfaces actually do.

The present section aims to address that question with great precision, by describing the *abstract state* of the whole Internet Computer, and how this state can change in response to API function calls, or spontaneously (modeling asynchronous, distributed or non-deterministic execution).

The design of this abstract specification (e.g. how and where pending messages are stored) are *not* to be understood to in any way prescribe a concrete implementation or software architecture. The goals here are formal precision and clarity, but not implementability, so this can lead to different ways of phrasing.

### Notation

We specify the behavior of the Internet Computer using ad-hoc pseudocode.

The manipulated values are primitive values (numbers, text, binary blobs), aggregate values (lists, unordered lists a.k.a. bags, partial maps, records with fixed fields, named constructors) and functions.

We use a concatenation operator `·` with various types: to extend sets and maps, or to concatenate lists with lists or lists with elements.

The shape of values is described using a hand-wavy type system. We use `Foo = Nat` to define type aliases; now `Foo` can be used instead of `Nat`. Often, the right-hand side is a more complex type here, e.g. a record, or multiple possible types separated by a vertical bar (`|`). Partial maps are written as `Key ↦ Value` and the function type as `Argument → Result`.

:::note

All values are immutable! State change is specified by describing the new state, not by changing the existing state.

:::

Record fields are accessed using dot-notation (e.g. `S.request_id > 0`). To create a new record from an existing record `R` with some fields changed, the syntax `R where field = new_value` is used. This syntax can also be used to create new records with some deeply nested field changed: `R where some_map[key].field = new_value`.

In the state transitions, upper-case variables (`S`, `C`, `Req_id`) are free variables: The state transition may be taken for any possible value of these variables. `S` always refers to the previous state. A state transition often comes with a list of *conditions*, which may restrict the values of these free variables. The *state after* is usually described using the record update syntax by starting with `S where`.

For example, the condition `S.messages = Older_messages · M · Younger_messages` says that `M` is some message in field `messages` of the record `S`, and that `Younger_messages` and `Older_messages` are the other messages in the state. If the "state after" specifies `S with messages = Older_messages · Younger_messages`, then the message `M` is removed from the state.

### Abstract state

In this specification, we describe the Internet Computer as a state machine. In particular, there is a single piece of data that describes the complete state of the IC, called `S`.

Of course, this is a huge simplification: The real Internet Computer is distributed and has a multi-component architecture, and the state is spread over many different components, some physically separated. But this simplification allows us to have a concise description of the behavior, and to easily make global decisions (such as, "is there any pending message"), without having to specify the bookkeeping that allows such global decisions.

#### Identifiers

Principals (canister ids and user ids) are blobs, but some of them have special form, as explained in [Special forms of Principals](#id-classes).
```
type Principal = Blob
```
The function
```
mk_self_authenticating_id : PublicKey -> Principal
mk_self_authenticating_id pk = H(pk) · 0x02
```
calculates self-authenticating ids.

The function
```
mk_derived_id : Principal -> Blob -> Principal
mk_derived_id p nonce = H(|p| · p · nonce) · 0x03
```
calculates derived ids. With `|p|` we denote the length of the principal, in bytes, encoded as a single byte.

The principal of the anonymous user is fixed:
```
anonymous_id : Principal
anonymous_id = 0x04
```
The principal of the management canister is the empty blob (i.e. `aaaaa-aa`):
```
ic_principal : Principal = ""
```
These function domains and fixed values are mutually disjoint.

Method names can be arbitrary pieces of text:
```
MethodName = Text
```
#### Abstract canisters {#abstract-canisters}

The [WebAssembly System API](#system-api) is relatively low-level, and some of its details (e.g. that the argument data is queried using separate calls, and that closures are represented by a function pointer and a number, that method names need to be mangled) would clutter this section. Therefore, we abstract over the WebAssembly details as follows:

-   The state of a WebAssembly module (memory, tables, globals) is hidden behind an abstract `WasmState`. The `WasmState` contains the `StableMemory`, which can be extracted using `pre_upgrade` and passed to `post_upgrade`.

-   A canister module `CanisterModule` consists of an initial state, and a (pure) function that models function invocation. It either indicates that the canister function traps, or returns a new state together with a description of the invoked asynchronous System API calls.
    ```
    WasmState = (abstract)
    StableMemory = (abstract)
    Callback = (abstract)
    ChunkStore = Hash -> Blob

    Arg = Blob;
    CallerId = Principal;

    Timestamp = Nat;
    CanisterVersion = Nat;
    Env = {
      time : Timestamp;
      controllers : List Principal;
      global_timer : Nat;
      balance : Nat;
      reserved_balance : Nat;
      reserved_balance_limit : Nat;
      compute_allocation : Nat;
      memory_allocation : Nat;
      memory_usage_raw_module : Nat;
      memory_usage_canister_history : Nat;
      memory_usage_chunk_store : Nat;
      memory_usage_snapshot : Nat;
      freezing_threshold : Nat;
      subnet_size : Nat;
      certificate : NoCertificate | Blob;
      status : Running | Stopping | Stopped;
      canister_version : CanisterVersion;
    }

    RejectCode = Nat
    Response = Reply Blob | Reject (RejectCode, Text)
    MethodCall = {
      callee : CanisterId;
      method_name: MethodName;
      arg: Blob;
      transferred_cycles: Nat;
      callback: Callback;
    }

    UpdateFunc = WasmState -> Trap { cycles_used : Nat; } | Return {
      new_state : WasmState;
      new_calls : List MethodCall;
      new_certified_data : NoCertifiedData | Blob;
      new_global_timer : NoGlobalTimer | Nat;
      response : NoResponse | Response;
      cycles_accepted : Nat;
      cycles_used : Nat;
    }
    QueryFunc = WasmState -> Trap { cycles_used : Nat; } | Return {
      response : Response;
      cycles_used : Nat;
    }
    CompositeQueryFunc = WasmState -> Trap { cycles_used : Nat; } | Return {
      new_state : WasmState;
      new_calls : List MethodCall;
      response : NoResponse | Response;
      cycles_used : Nat;
    }
    SystemTaskFunc = WasmState -> Trap { cycles_used : Nat; } | Return {
      new_state : WasmState;
      new_calls : List MethodCall;
      new_certified_data : NoCertifiedData | Blob;
      new_global_timer : NoGlobalTimer | Nat;
      cycles_used : Nat;
    }

    AvailableCycles = Nat
    RefundedCycles = Nat

        CanisterModule = {
          init : (CanisterId, Arg, CallerId, Env) -> Trap { cycles_used : Nat; } | Return {
            new_state : WasmState;
            new_certified_data : NoCertifiedData | Blob;
            new_global_timer : NoGlobalTimer | Nat;
            cycles_used : Nat;
          }
          pre_upgrade : (WasmState, Principal, Env) -> Trap { cycles_used : Nat; } | Return {
            new_state : WasmState;
            new_certified_data : NoCertifiedData | Blob;
            cycles_used : Nat;
          }
          post_upgrade : (WasmState, Arg, CallerId, Env) -> Trap { cycles_used : Nat; } | Return {
            new_state : WasmState;
            new_certified_data : NoCertifiedData | Blob;
            new_global_timer : NoGlobalTimer | Nat;
            cycles_used : Nat;
          }
          update_methods : MethodName ↦ ((Arg, CallerId, Env, AvailableCycles) -> UpdateFunc)
          query_methods : MethodName ↦ ((Arg, CallerId, Env) -> QueryFunc)
          composite_query_methods : MethodName ↦ ((Arg, CallerId, Env) -> CompositeQueryFunc)
          heartbeat : (Env) -> SystemTaskFunc
          global_timer : (Env) -> SystemTaskFunc
          callbacks : (Callback, Response, RefundedCycles, Env, AvailableCycles) -> UpdateFunc
          composite_callbacks : (Callback, Response, Env) -> UpdateFunc
          inspect_message : (MethodName, WasmState, Arg, CallerId, Env) -> Trap | Return {
            status : Accept | Reject;
          }
        }

This high-level interface presents a pure, mathematical model of a canister, and hides the bookkeeping required to provide the System API as seen in Section [Canister interface (System API)](#system-api).

The `CanisterId` parameter of `init` is merely passed through to the canister, via the `canister.self` system call.

The `Env` parameter provides synchronous read-only access to portions of the system state and canister metadata that are always available.

The parsing of a blob to a canister module and its public and private custom sections is modelled via the (possibly implicitly failing) functions
```
parse_wasm_mod : Blob -> CanisterModule
parse_public_custom_sections : Blob -> Text ↦ Blob
parse_private_custom_sections : Blob -> Text ↦ Blob
```

The concrete mapping of this abstract `CanisterModule` to actual WebAssembly concepts and the System API is described separately in section [Abstract Canisters to System API](#concrete-canisters).

#### Call contexts

The Internet Computer provides certain messaging guarantees: If a user or a canister calls another canister, it will eventually get a single response (a reply or a rejection), even if some canister code along the way fails.

To ensure that only one response is generated, and also to detect when no response can be generated any more, the IC maintains a *call context*. The `needs_to_respond` field is set to `false` once the call has received a response. Further attempts to respond will now fail.
```
Request = {
    nonce : Blob;
    ingress_expiry : Nat;
    sender : UserId;
    canister_id : CanisterId;
    method_name : Text;
    arg : Blob;
  }
CallId = (abstract)
CallOrigin
  = FromUser {
      request : Request;
    }
  | FromCanister {
      calling_context : CallId;
      callback: Callback;
    }
  | FromSystemTask
CallCtxt = {
  canister : CanisterId;
  origin : CallOrigin;
  needs_to_respond : bool;
  deleted : bool;
  available_cycles : Nat;
}
```
#### Calls and Messages

Calls into and within the IC are implemented as messages passed between canisters. During their lifetime, messages change shape: they begin as a call to a public method, which is resolved to a WebAssembly function that is then executed, potentially generating a response which is then delivered.

Therefore, a message can have different shapes:
```
Queue = Unordered | Queue { from : System | CanisterId; to : CanisterId }
EntryPoint
  = PublicMethod MethodName Principal Blob
  | Callback Callback Response RefundedCycles
  | Heartbeat
  | GlobalTimer
Message
  = CallMessage {
      origin : CallOrigin;
      caller : Principal;
      callee : CanisterId;
      method_name : Text;
      arg : Blob;
      transferred_cycles : Nat;
      queue : Queue;
    }
  | FuncMessage {
      call_context : CallId;
      receiver : CanisterId;
      entry_point : EntryPoint;
      queue : Queue;
    }
  | ResponseMessage {
      origin : CallOrigin;
      response : Response;
      refunded_cycles : Nat;
    }
```

The `queue` field is used to describe the message ordering behavior. Its concrete value is only used to determine when the relative order of two messages must be preserved, and is otherwise not interpreted. Response messages are not ordered so they have no `queue` field.

A reference implementation would likely maintain a separate list of `messages` for each such queue to efficiently find eligible messages; this document uses a single global list for a simpler and more concise system state.

#### API requests

We distinguish between API requests (type `Request`) passed to `/api/v2/…/call` and `/api/v3/…/call`, which may be present in the IC state, and the *read-only* API requests passed to `/api/v2/…/read_state` and `/api/v2/…/query`, which are only ephemeral.

These are the read-only messages:
```
Path = List(Blob)
APIReadRequest
  = StateRead = {
    nonce : Blob;
    ingress_expiry : Nat;
    sender : UserId;
    paths : List(Path);
  }
  | CanisterQuery = {
    nonce : Blob;
    ingress_expiry : Nat;
    sender : UserId;
    canister_id : CanisterId;
    method_name : Text;
    arg : Blob;
  }
```

Signed delegations contain the (unsigned) delegation data in a nested record, next to the signature of that data.
```
PublicKey = Blob
Signature = Blob
SignedDelegation = {
  delegation : {
    pubkey : PublicKey;
    targets : [CanisterId] | Unrestricted;
    expiration : Timestamp
  };
  signature : Signature
}
```

For the signatures in a `Request`, we assume that the following function implements signature verification as described in [Authentication](#authentication). This function picks the corresponding signature scheme according to the DER-encoded metadata in the public key.
```
verify_signature : PublicKey -> Signature -> Blob -> Bool
Envelope = {
  content : Request | APIReadRequest;
  sender_pubkey : PublicKey | NoPublicKey;
  sender_sig : Signature | NoSignature;
  sender_delegation: [SignedDelegation]
}
```

The evolution of a `Request` goes through these states, as explained in [Overview of canister calling](#http-call-overview):
```
RequestStatus
  = Received
  | Processing
  | Rejected (RejectCode, Text)
  | Replied Blob
  | Done
```

A `Path` may refer to a request by way of a *request id*, as specified in [Request ids](#request-id):
```
RequestId = { b ∈ Blob | |b| = 32 }
hash_of_map: Request -> RequestId
```

#### The system state

Finally, we can describe the state of the IC as a record having the following fields:
```
CanState
 = EmptyCanister | {
  wasm_state : WasmState;
  module : CanisterModule;
  raw_module : Blob;
  public_custom_sections: Text ↦ Blob;
  private_custom_sections: Text ↦ Blob;
}
CanStatus
  = Running
  | Stopping (List (CallOrigin, Nat))
  | Stopped
ChangeOrigin
  = FromUser {
      user_id : PrincipalId;
    }
  | FromCanister {
      canister_id : PrincipalId;
      canister_version : CanisterVersion | NoCanisterVersion;
    }
CodeDeploymentMode
  = Install
  | Reinstall
  | Upgrade
SnapshotId = (abstract)
ChangeDetails
  = Creation {
      controllers : [PrincipalId];
    }
  | CodeUninstall
  | CodeDeployment {
      mode : CodeDeploymentMode;
      module_hash : Blob;
    }
  | LoadSnapshot {
      canister_version : CanisterVersion;
      snapshot_id : SnapshotId;
      taken_at_timestamp : Timestamp;
    }
  | ControllersChange {
      controllers : [PrincipalId];
    }
Change = {
  timestamp_nanos : Timestamp;
  canister_version : CanisterVersion;
  origin : ChangeOrigin;
  details : ChangeDetails;
}
CanisterHistory = {
  total_num_changes : Nat;
  recent_changes : [Change];
}
CanisterLogVisibility
  = Controllers
  | Public
  | AllowedViewers [Principal]
CanisterLog = {
  idx : Nat;
  timestamp_nanos : Nat;
  content : Blob;
}
QueryStats = {
  timestamp : Timestamp;
  num_instructions : Nat;
  request_payload_bytes : Nat;
  response_payload_bytes : Nat;
}
Subnet = {
  subnet_id : Principal;
  subnet_size : Nat;
}
Snapshot = {
  snapshot_id : SnapshotId;
  wasm_state : WasmState;
  raw_module : Blob;
  chunk_store : ChunkStore;
  certified_data : Blob;
  canister_version : CanisterVersion;
  taken_at_timestamp : Timestamp;
}
S = {
  requests : Request ↦ (RequestStatus, Principal);
  canisters : CanisterId ↦ CanState;
  snapshots: CanisterId ↦ Snapshot;
  controllers : CanisterId ↦ Set Principal;
  compute_allocation : CanisterId ↦ Nat;
  memory_allocation : CanisterId ↦ Nat;
  freezing_threshold : CanisterId ↦ Nat;
  canister_status: CanisterId ↦ CanStatus;
  canister_version: CanisterId ↦ CanisterVersion;
  canister_subnet : CanisterId ↦ Subnet;
  time : CanisterId ↦ Timestamp;
  global_timer : CanisterId ↦ Timestamp;
  balances: CanisterId ↦ Nat;
  reserved_balances: CanisterId ↦ Nat;
  reserved_balance_limits: CanisterId ↦ Nat;
  wasm_memory_limit: CanisterId ↦ Nat;
  certified_data: CanisterId ↦ Blob;
  canister_history: CanisterId ↦ CanisterHistory;
  canister_log_visibility: CanisterId ↦ CanisterLogVisibility;
  canister_logs: CanisterId ↦ [CanisterLog];
  query_stats: CanisterId ↦ [QueryStats];
  system_time : Timestamp
  call_contexts : CallId ↦ CallCtxt;
  messages : List Message; // ordered!
  root_key : PublicKey
}
```

To convert `CanStatus` into `status : Running | Stopping | Stopped` from `Env`, we define the following conversion function:
```
simple_status(Running) = Running
simple_status(Stopping _) = Stopping
simple_status(Stopped) = Stopped
```

To convert `CallOrigin` into `ChangeOrigin`, we define the following conversion function:
```
change_origin(principal, _, FromUser { … }) = FromUser {
    user_id = principal
  }
change_origin(principal, sender_canister_version, FromCanister { … }) = FromCanister {
    canister_id = principal
    canister_version = sender_canister_version
  }
change_origin(principal, sender_canister_version, FromSystemTask) = FromCanister {
    canister_id = principal
    canister_version = sender_canister_version
  }
```

#### Cycle bookkeeping and resource consumption

The main cycle balance of canister `A` in state `S` can be obtained with `S.balances(A)`.
In addition to the main balance, each canister has a reserved balance `S.reserved_balances(A)`.
The reserved balance contains cycles that were set aside from the main balance for future payments for the consumption of resources such as compute and memory.
The reserved cycles can only be used for resource payments and cannot be transferred back to the main balance.

The (unspecified) function `idle_cycles_burned_rate(compute_allocation, memory_allocation, memory_usage, subnet_size)` determines the idle resource consumption rate in cycles per day of a canister given its current compute and memory allocation, memory usage, and subnet size. The function `freezing_limit(compute_allocation, memory_allocation, freezing_threshold, memory_usage, subnet_size)` determines the freezing limit in cycles of a canister given its current compute and memory allocation, freezing threshold in seconds, memory usage, and subnet size. The value `freezing_limit(compute_allocation, memory_allocation, freezing_threshold, memory_usage, subnet_size)` is derived from `idle_cycles_burned_rate(compute_allocation, memory_allocation, memory_usage, subnet_size)` and `freezing_threshold` as follows:
```
freezing_limit(compute_allocation, memory_allocation, freezing_threshold, memory_usage, subnet_size) = idle_cycles_burned_rate(compute_allocation, memory_allocation, memory_usage, subnet_size) * freezing_threshold / (24 * 60 * 60)
```

The (unspecified) functions `memory_usage_wasm_state(wasm_state)`, `memory_usage_raw_module(raw_module)`, `memory_usage_canister_history(canister_history)`, `memory_usage_chunk_store(chunk_store)`, and `memory_usage_snapshot(snapshot)` determine the canister's memory usage in bytes consumed by its Wasm state, raw Wasm binary, canister history, chunk store, and snapshot, respectively.

The freezing limit of canister `A` in state `S` can be obtained as follows:
```
freezing_limit(S, A) =
  freezing_limit(
    S.compute_allocation[A],
    S.memory_allocation[A],
    S.freezing_threshold[A],
    memory_usage_wasm_state(S.canisters[A].wasm_state) +
      memory_usage_raw_module(S.canisters[A].raw_module) +
      memory_usage_canister_history(S.canister_history[A]) +
      memory_usage_chunk_store(S.chunk_store[A]) +
      memory_usage_snapshot(S.snapshots[A]),
    S.canister_subnet[A].subnet_size,
  )
```

The amount of cycles that is available for spending in calls and execution is computed by the function `liquid_balance(balance, reserved_balance, freezing_limit)`:
```
liquid_balance(balance, reserved_balance, freezing_limit) = balance - max(freezing_limit - reserved_balance, 0)
```

The "liquid" balance of canister `A` in state `S` can be obtained as follows:
```
liquid_balance(S, A) =
  liquid_balance(
    S.balances[A],
    S.reserved_balances[A],
    freezing_limit(S, A),
  )
```

The reasoning behind this is that resource payments first drain the reserved balance and only when the reserved balance gets to zero, they start draining the main balance.

The amount of cycles that need to be reserved after operations that allocate resources is modeled with an unspecified function `cycles_to_reserve(S, CanisterId, compute_allocation, memory_allocation, snapshots, CanState)` that depends on the old IC state, the id of the canister, the new allocations of the canister, the snapshots of the canister, and the new state of the canister.

#### Initial state

The initial state of the IC is

```
{
  requests = ();
  canisters = ();
  snapshots = ();
  controllers = ();
  compute_allocation = ();
  memory_allocation = ();
  freezing_threshold = ();
  canister_status = ();
  canister_version = ();
  canister_subnet = ();
  time = ();
  global_timer = ();
  balances = ();
  reserved_balances = ();
  reserved_balance_limits = ();
  wasm_memory_limit = ();
  certified_data = ();
  canister_history = ();
  canister_log_visibility = ();
  canister_logs = ();
  query_stats = ();
  system_time = T;
  call_contexts = ();
  messages = [];
  root_key = PublicKey;
}
```

for some time stamp `T`, some DER-encoded BLS public key `PublicKey`, and using `()` to denote the empty map or bag.

### Invariants

The following is an incomplete list of invariants that should hold for the abstract state `S`, and are not already covered by the type annotations in this section.

-   No pair of update, query, and composite query methods in a CanisterModule can have the same name:
    ```
    ∀ (_ ↦ CanState) ∈ S.canisters:
      dom(CanState.module.update_methods) ∩ dom(CanState.module.query_methods) = ∅
      dom(CanState.module.update_methods) ∩ dom(CanState.module.composite_query_methods) = ∅
      dom(CanState.module.query_methods) ∩ dom(CanState.module.composite_query_methods) = ∅
    ```

-   Deleted call contexts were not awaiting a response:
    ```
    ∀ (_ ↦ Ctxt) ∈ S.call_contexts:
      if Ctxt.deleted then Ctxt.needs_to_respond = false
    ```
-   Responded call contexts have no available\_cycles left:
    ```
    ∀ (_ ↦ Ctxt) ∈ S.call_contexts:
      if Ctxt.needs_to_respond = false then Ctxt.available_cycles = 0
    ```
-   A stopped canister does not have any call contexts (in particular, a stopped canister does not have any call contexts marked as deleted):
    ```
    ∀ (_ ↦ Ctxt) ∈ S.call_contexts:
      S.canister_status[Ctxt.canister] ≠ Stopped
    ```
-   Referenced call contexts exist:
    ```
    ∀ CallMessage {origin = FromCanister O, …} ∈ S.messages. O.calling_context ∈ dom(S.call_contexts)
    ∀ ResponseMessage {origin = FromCanister O, …} ∈ S.messages. O.calling_context ∈ dom(S.call_contexts)
    ∀ (_ ↦ {needs_to_respond = true, origin = FromCanister O, …}) ∈ S.call_contexts: O.calling_context ∈ dom(S.call_contexts)
    ∀ (_ ↦ Stopping Origins) ∈ S.canister_status: ∀(FromCanister O, _) ∈ Origins. O.calling_context ∈ dom(S.call_contexts)
    ```
### State transitions

Based on this abstract notion of the state, we can describe the behavior of the IC. There are three classes of behaviors:

-   Potentially state changing API requests that are submitted via `/api/v2/…/call` and `/api/v3/…/call`. These transitions describe checks that the request must pass to be considered received.

-   Spontaneous transitions that model the internal behavior of the IC, by describing conditions on the state that allow the transition to happen, and the state after.

-   Responses to reads (i.e. `/api/v2/…/read_state` and `/api/v2/…/query`). By definition, these do *not* change the state of the IC, and merely describe the response based on the read request (or query, respectively) and the current state.

The state transitions are not complete with regard to error handling. For example, the behavior of sending a request to a non-existent canister is not specified here. For now, we trust implementors to make sensible decisions there.

We model the [The IC management canister](#ic-management-canister) with one state transition per method. There, we assume a function
```
candid : Value -> Blob
```
that represents Candid encoding; this is implicitly taking the method types, as declared in [Interface overview](#ic-candid), into account. We model the parsing of Candid values in the "Conditions" section using `candid` as well, by treating it as a non-deterministic function.

#### Envelope Authentication

The following predicate describes when an envelope `E` correctly signs the enclosed request with a key belonging to a user `U`, at time `T`: It returns which canister ids this envelope may be used at (as a set of principals).
```
verify_envelope({ content = C }, U, T)
  = { p : p is CanisterID } if U = anonymous_id
verify_envelope({ content = C, sender_pubkey = PK, sender_sig = Sig, sender_delegation = DS}, U, T)
  = TS if U = mk_self_authenticating_id E.sender_pubkey
  ∧ (PK', TS) = verify_delegations(DS, PK, T, { p : p is CanisterId })
  ∧ verify_signature PK' Sig ("\x0Aic-request" · hash_of_map(C))
verify_delegations([], PK, T, TS) = (PK, TS)
verify_delegations([D] · DS, PK, T, TS)
  = verify_delegations(DS, D.pubkey, T, TS ∩ delegation_targets(D))
  if verify_signature PK D.signature ("\x1Aic-request-auth-delegation" · hash_of_map(D.delegation))
   ∧ D.delegation.expiration ≥ T
delegation_targets(D)
  = if D.targets = Unrestricted
    then { p : p is CanisterId }
    else D.targets
```
#### Effective canister ids

A `Request` has an effective canister id according to the rules in [Effective canister id](#http-effective-canister-id):
```
is_effective_canister_id(Request {canister_id = ic_principal, method = provisional_create_canister_with_cycles, …}, p)
is_effective_canister_id(Request {canister_id = ic_principal, method = install_chunked_code, arg = candid({target_canister = p, …}), …}, p)
is_effective_canister_id(Request {canister_id = ic_principal, arg = candid({canister_id = p, …}), …}, p)
is_effective_canister_id(Request {canister_id = p, …}, p), if p ≠ ic_principal
```
#### API Request submission

After a node accepts a request via `/api/v2/canister/<ECID>/call` or `/api/v3/canister/<ECID>/call`, the request gets added to the IC state as `Received`.

This may only happen if the signature is valid and is created with a correct key. Due to this check, the envelope is discarded after this point.

Requests that have expired are dropped here.

Ingress message inspection is applied, and messages that are not accepted by the canister are dropped.

Submitted request
`E : Envelope`

Conditions  

```html

E.content.canister_id ∈ verify_envelope(E, E.content.sender, S.system_time)
|E.content.nonce| <= 32
E.content ∉ dom(S.requests)
S.system_time <= E.content.ingress_expiry
is_effective_canister_id(E.content, ECID)
( E.content.canister_id = ic_principal
  E.content.arg = candid({canister_id = CanisterId, …})
  E.content.sender ∈ S.controllers[CanisterId]
  E.content.method_name ∈
    { "install_code", "install_chunked_code", "uninstall_code", "update_settings", "start_canister", "stop_canister",
      "canister_status", "delete_canister", "upload_chunk", "clear_chunk_store", "stored_chunks",
      "provisional_top_up_canister" }
) ∨ (
  E.content.canister_id = ic_principal
  E.content.method_name ∈
    { "provisional_create_canister_with_cycles" }
) ∨ (
  E.content.canister_id ≠ ic_principal
  S.canisters[E.content.canister_id] ≠ EmptyCanister
  S.canister_status[E.content.canister_id] = Running
  Env = {
    time = S.time[E.content.canister_id];
    controllers = S.controllers[E.content.canister_id];
    global_timer = S.global_timer[E.content.canister_id];
    balance = S.balances[E.content.canister_id];
    reserved_balance = S.reserved_balances[E.content.canister_id];
    reserved_balance_limit = S.reserved_balance_limits[E.content.canister_id];
    compute_allocation = S.compute_allocation[E.content.canister_id];
    memory_allocation = S.memory_allocation[E.content.canister_id];
    memory_usage_raw_module = memory_usage_raw_module(S.canisters[E.content.canister_id].raw_module);
    memory_usage_canister_history = memory_usage_canister_history(S.canister_history[E.content.canister_id]);
    memory_usage_chunk_store = memory_usage_chunk_store(S.chunk_store[E.content.canister_id]);
    memory_usage_snapshot = memory_usage_snapshot(S.snapshots[E.content.canister_id]);
    freezing_threshold = S.freezing_threshold[E.content.canister_id];
    subnet_size = S.canister_subnet[E.content.canister_id].subnet_size;
    certificate = NoCertificate;
    status = simple_status(S.canister_status[E.content.canister_id]);
    canister_version = S.canister_version[E.content.canister_id];
  }
  liquid_balance(S, E.content.canister_id) ≥ 0
  S.canisters[E.content.canister_id].module.inspect_message
    (E.content.method_name, S.canisters[E.content.canister_id].wasm_state, E.content.arg, E.content.sender, Env) = Return {status = Accept;}
)

```

State after  

```html

S with
    requests[E.content] = (Received, ECID)

```

:::note

This is not instantaneous (the IC takes some time to agree it accepts the request) nor guaranteed (a node could just drop the request, or maybe it did not pass validation). But once the request has entered the IC state like this, it will be acted upon.

:::

#### Request rejection

The IC may reject a received message for internal reasons (high load, low resources) or expiry. The precise conditions are not specified here, but the reject code must indicate this to be a system error.

Conditions  

```html

S.requests[R] = (Received, ECID)
Code = SYS_FATAL or Code = SYS_TRANSIENT

```

State after  

```html

S with
    requests[R] = (Rejected (Code, Msg), ECID)

```

#### Initiating canister calls

A first step in processing a canister update call is to create a `CallMessage` in the message queue.

The `request` field of the `FromUser` origin establishes the connection to the API message. One could use the corresponding `hash_of_map` for this purpose, but this formulation is more abstract.

The IC does not make any guarantees about the order of incoming messages.

Conditions  

```html

S.requests[R] = (Received, ECID)
S.system_time <= R.ingress_expiry
C = S.canisters[R.canister_id]

```

State after  

```html

S with
    requests[R] = (Processing, ECID)
    messages =
      CallMessage {
        origin = FromUser { request = R };
        caller = R.sender;
        callee = R.canister_id;
        method_name = R.method_name;
        arg = R.arg;
        transferred_cycles = 0;
        queue = Unordered;
      } · S.messages

```

#### Calls to stopped/stopping canisters are rejected

A call to a canister which is stopping, or stopped is automatically rejected.

Conditions  

```html

S.messages = Older_messages · CallMessage CM · Younger_messages
(CM.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ CM.queue)
S.canisters[CM.callee] ≠ EmptyCanister
S.canister_status[CM.callee] = Stopped or S.canister_status[CM.callee] = Stopping
```

State after:

```html

messages = Older_messages · Younger_messages  ·
  ResponseMessage {
      origin = CM.origin;
      response = Reject (CANISTER_ERROR, <implementation-specific>);
      refunded_cycles = CM.transferred_cycles;
  }

```

#### Calls to frozen canisters are rejected

A call to a canister which is frozen is automatically rejected.

Conditions  

```html

S.messages = Older_messages · CallMessage CM · Younger_messages
(CM.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ CM.queue)
S.canisters[CM.callee] ≠ EmptyCanister
liquid_balance(S, CM.callee) < 0
```

State after:

```html

messages = Older_messages · Younger_messages  ·
  ResponseMessage {
      origin = CM.origin;
      response = Reject (SYS_TRANSIENT, <implementation-specific>);
      refunded_cycles = CM.transferred_cycles;
  }

```

#### Call context creation {#call-context-creation}

Before invoking a heartbeat, a global timer, or a message to a public entry point, a call context is created for bookkeeping purposes. For these invocations the canister must be running (so not stopped or stopping). Additionally, these invocations only happen for "real" canisters, not the IC management canister.

This "bookkeeping transition" must be immediately followed by the corresponding ["Message execution" transition](#rule-message-execution).

*Call context creation: Public entry points*

For a message to a public entry point, the method is looked up in the list of exports. This happens for both ingress and inter-canister messages.

The position of the message in the queue is unchanged.

Conditions  

```html

S.messages = Older_messages · CallMessage CM · Younger_messages
(CM.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ CM.queue)
S.canisters[CM.callee] ≠ EmptyCanister
S.canister_status[CM.callee] = Running
liquid_balance(S, CM.callee) ≥ MAX_CYCLES_PER_MESSAGE
Ctxt_id ∉ dom(S.call_contexts)

```

State after  

```html

S with
    messages =
      Older_messages ·
      FuncMessage {
        call_context = Ctxt_id;
        receiver = CM.callee;
        entry_point = PublicMethod CM.method_name CM.caller CM.arg;
        queue = CM.queue;
      } ·
      Younger_messages
    call_contexts[Ctxt_id] = {
      canister = CM.callee;
      origin = CM.origin;
      needs_to_respond = true;
      deleted = false;
      available_cycles = CM.transferred_cycles;
    }
    balances[CM.callee] = S.balances[CM.callee] - MAX_CYCLES_PER_MESSAGE

```

*Call context creation: Heartbeat*

If canister `C` exports a method with name `canister_heartbeat`, the IC will create the corresponding call context.

Conditions  

```html

S.canisters[C] ≠ EmptyCanister
S.canister_status[C] = Running
liquid_balance(S, C) ≥ MAX_CYCLES_PER_MESSAGE
Ctxt_id ∉ dom(S.call_contexts)

```

State after  

```html

S with
    messages =
      FuncMessage {
        call_context = Ctxt_id;
        receiver = C;
        entry_point = Heartbeat;
        queue = Queue { from = System; to = C };
      }
      · S.messages
    call_contexts[Ctxt_id] = {
      canister = C;
      origin = FromSystemTask;
      needs_to_respond = false;
      deleted = false;
      available_cycles = 0;
    }
    balances[C] = S.balances[C] - MAX_CYCLES_PER_MESSAGE

```

*Call context creation: Global timer*

If canister `C` exports a method with name `canister_global_timer`, the global timer of canister `C` is set, and the current time for canister `C` has passed the value of the global timer, the IC will create the corresponding call context and deactivate the global timer.

Conditions  

```html

S.canisters[C] ≠ EmptyCanister
S.canister_status[C] = Running
S.global_timer[C] ≠ 0
S.time[C] ≥ S.global_timer[C]
liquid_balance(S, C) ≥ MAX_CYCLES_PER_MESSAGE
Ctxt_id ∉ dom(S.call_contexts)

```

State after  

```html

S with
    messages =
      FuncMessage {
        call_context = Ctxt_id;
        receiver = C;
        entry_point = GlobalTimer;
        queue = Queue { from = System; to = C };
      }
      · S.messages
    call_contexts[Ctxt_id] = {
      canister = C;
      origin = FromSystemTask;
      needs_to_respond = false;
      deleted = false;
      available_cycles = 0;
    }
    global_timer[C] = 0
    balances[C] = S.balances[C] - MAX_CYCLES_PER_MESSAGE

```

The IC can execute any message that is at the head of its queue, i.e. there is no older message with the same abstract `queue` field. The actual message execution, if successful, may enqueue further messages and --- if the function returns a response --- record this response. The new call and response messages are enqueued at the end.

Note that new messages are executed only if the canister is Running and is not frozen.

#### Message execution {#rule-message-execution}

The transition models the actual execution of a message, whether it is an initial call to a public method or a response. In either case, a call context already exists (see transition "Call context creation").

Conditions  

```html

S.messages = Older_messages · FuncMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
S.canisters[M.receiver] ≠ EmptyCanister
Mod = S.canisters[M.receiver].module

Is_response = M.entry_point == Callback _ _ _

Env = {
  time = S.time[M.receiver];
  controllers = S.controllers[M.receiver];
  global_timer = S.global_timer[M.receiver];
  balance = S.balances[M.receiver]
  reserved_balance = S.reserved_balances[M.receiver];
  reserved_balance_limit = S.reserved_balance_limits[M.receiver];
  compute_allocation = S.compute_allocation[M.receiver];
  memory_allocation = S.memory_allocation[M.receiver];
  memory_usage_raw_module = memory_usage_raw_module(S.canisters[M.receiver].raw_module);
  memory_usage_canister_history = memory_usage_canister_history(S.canister_history[M.receiver]);
  memory_usage_chunk_store = memory_usage_chunk_store(S.chunk_store[M.receiver]);
  memory_usage_snapshot = memory_usage_snapshot(S.snapshots[M.receiver]);
  freezing_threshold = S.freezing_threshold[M.receiver];
  subnet_size = S.canister_subnet[M.receiver].subnet_size;
  certificate = NoCertificate;
  status = simple_status(S.canister_status[M.receiver]);
  canister_version = S.canister_version[M.receiver];
}

Available = S.call_contexts[M.call_contexts].available_cycles
( M.entry_point = PublicMethod Name Caller Arg
  F = Mod.update_methods[Name](Arg, Caller, Env, Available)
  New_canister_version = S.canister_version[M.receiver] + 1
  Wasm_memory_limit = S.wasm_memory_limit[M.receiver]
)
or
( M.entry_point = PublicMethod Name Caller Arg
  F = query_as_update(Mod.query_methods[Name], Arg, Caller, Env)
  New_canister_version = S.canister_version[M.receiver]
  Wasm_memory_limit = 0
)
or
( M.entry_point = Callback Callback Response RefundedCycles
  F = Mod.callbacks(Callback, Response, RefundedCycles, Env, Available)
  New_canister_version = S.canister_version[M.receiver] + 1
  Wasm_memory_limit = 0
)
or
( M.entry_point = Heartbeat
  F = system_task_as_update(Mod.heartbeat, Env)
  New_canister_version = S.canister_version[M.receiver] + 1
  Wasm_memory_limit = 0
)
or
( M.entry_point = GlobalTimer
  F = system_task_as_update(Mod.global_timer, Env)
  New_canister_version = S.canister_version[M.receiver] + 1
  Wasm_memory_limit = 0
)

R = F(S.canisters[M.receiver].wasm_state)

```

State after  

```html

if
  R = Return res
  validate_sender_canister_version(res.new_calls, S.canister_version[M.receiver])
  res.cycles_used ≤ (if Is_response then MAX_CYCLES_PER_RESPONSE else MAX_CYCLES_PER_MESSAGE)
  res.cycles_accepted ≤ Available
  (res.cycles_used + ∑ [ MAX_CYCLES_PER_RESPONSE + call.transferred_cycles | call ∈ res.new_calls ]) ≤
    (S.balances[M.receiver] + res.cycles_accepted + (if Is_response then MAX_CYCLES_PER_RESPONSE else MAX_CYCLES_PER_MESSAGE))
  Cycles_reserved = cycles_to_reserve(S, A.canister_id, S.compute_allocation[A.canister_id], S.memory_allocation[A.canister_id], S.snapshots[A.canister_id], New_state)
  New_balance =
      (S.balances[M.receiver] + res.cycles_accepted + (if Is_response then MAX_CYCLES_PER_RESPONSE else MAX_CYCLES_PER_MESSAGE))
      - (res.cycles_used + ∑ [ MAX_CYCLES_PER_RESPONSE + call.transferred_cycles | call ∈ res.new_calls ])
      - Cycles_reserved
  New_reserved_balance = S.reserved_balances[M.receiver] + Cycles_reserved
  Min_balance = if Is_response then 0 else freezing_limit(
    S.compute_allocation[M.receiver],
    S.memory_allocation[M.receiver],
    S.freezing_threshold[M.receiver],
    memory_usage_wasm_state(res.new_state) +
      memory_usage_raw_module(S.canisters[M.receiver].raw_module) +
      memory_usage_canister_history(S.canister_history[M.receiver]) +
      memory_usage_chunk_store(S.chunk_store[M.receiver]) +
      memory_usage_snapshot(S.snapshots[M.receiver]),
    S.canister_subnet[M.receiver].subnet_size,
  )
  New_reserved_balance ≤ S.reserved_balance_limits[M.receiver]
  liquid_balance(
    New_balance,
    New_reserved_balance,
    Min_balance
  ) ≥ 0
  (S.memory_allocation[M.receiver] = 0) or (memory_usage_wasm_state(res.new_state) +
    memory_usage_raw_module(S.canisters[M.receiver].raw_module) +
    memory_usage_canister_history(S.canister_history[M.receiver]) +
    memory_usage_chunk_store(S.chunk_store[M.receiver]) +
    memory_usage_snapshot(S.snapshots[M.receiver]) ≤ S.memory_allocation[M.receiver])
  (Wasm_memory_limit = 0) or |res.new_state.store.mem| <= Wasm_memory_limit
  (res.response = NoResponse) or S.call_contexts[M.call_context].needs_to_respond
then
  S with
    canisters[M.receiver].wasm_state = res.new_state;
    canister_version[M.receiver] = New_canister_version;
    messages =
      Older_messages ·
      Younger_messages ·
      [ CallMessage {
          origin = FromCanister {
            call_context = M.call_context;
            callback = call.callback;
          };
          caller = M.receiver;
          callee = call.callee;
          method_name = call.method_name;
          arg = call.arg;
          transferred_cycles = call.transferred_cycles
          queue = Queue { from = M.receiver; to = call.callee };
        }
      | call ∈ res.new_calls ] ·
      [ ResponseMessage {
          origin = S.call_contexts[M.call_context].origin
          response = res.response;
          refunded_cycles = Available - res.cycles_accepted;
        }
      | res.response ≠ NoResponse ]

    if res.response = NoResponse:
       call_contexts[M.call_context].available_cycles = Available - res.cycles_accepted
    else
       call_contexts[M.call_context].needs_to_respond = false
       call_contexts[M.call_context].available_cycles = 0

    if res.new_certified_data ≠ NoCertifiedData:
      certified_data[M.receiver] = res.new_certified_data

    if res.new_global_timer ≠ NoGlobalTimer:
      global_timer[M.receiver] = res.new_global_timer

    balances[M.receiver] = New_balance
    reserved_balances[M.receiver] = New_reserved_balance

    canister_logs[M.receiver] = S.canister_logs[M.receiver] · canister_logs
else
  S with
    messages = Older_messages · Younger_messages
    balances[M.receiver] =
      (S.balances[M.receiver] + (if Is_response then MAX_CYCLES_PER_RESPONSE else MAX_CYCLES_PER_MESSAGE))
      - min (R.cycles_used, (if Is_response then MAX_CYCLES_PER_RESPONSE else MAX_CYCLES_PER_MESSAGE))

```

Depending on whether this is a call message and a response messages, we have either set aside `MAX_CYCLES_PER_MESSAGE` or `MAX_CYCLES_PER_RESPONSE`, either in the call context creation rule or the Callback invocation rule.

The cycle consumption of executing this message is modeled via the unspecified `cycles_used` variable; the variable takes some value between 0 and `MAX_CYCLES_PER_MESSAGE`/`MAX_CYCLES_PER_RESPONSE` (for call execution and response execution, respectively).

The logs produced by the canister during message execution are modeled via the unspecified `canister_logs` variable; the variable stores a list of logs (each of type `CanisterLog`) with consecutive sequence numbers, timestamps equal to `S.time[M.receiver]`, and contents produced by the canister calling `ic0.debug_print`, `ic0.trap`, or produced by the WebAssembly runtime when the canister WebAssembly module traps.

This transition detects certain behavior that will appear as a trap (and which an implementation may implement by trapping directly in a system call):

-   Responding if the present call context does not need to be responded to

-   Accepting more cycles than are available on the call context

-   Sending out more cycles than available to the canister

-   Consuming more cycles than allowed (and reserved)

If message execution [*traps* (in the sense of a Wasm function)](#system-api-module), the message gets dropped. No response is generated (as some other message may still fulfill this calling context). Any state mutation is discarded. If the message was a call, the associated cycles are held by its associated call context and will be refunded to the caller, see [Call context starvation](#rule-starvation).

If message execution [*returns* (in the sense of a Wasm function)](#system-api-module), the state is updated and possible outbound calls and responses are enqueued.

Note that returning does *not* imply that the call associated with this message now *succeeds* in the sense defined in [section responding](#responding); that would require a (unique) call to `ic0.reply`. Note also that the state changes are persisted even when the IC is set to synthesize a [CANISTER\_ERROR](#reject-codes) reject immediately afterward (which happens when this returns without calling `ic0.reply` or `ic0.reject`, the corresponding call has not been responded to and there are no outstanding callbacks, see [Call context starvation](#rule-starvation)).

The function `validate_sender_canister_version` checks that `sender_canister_version` matches the actual canister version of the sender in all calls to the methods of the management canister that take `sender_canister_version`:
```
validate_sender_canister_version(new_calls, canister_version_from_system) =
  ∀ call ∈ new_calls. (call.callee = ic_principal and (call.method = 'create_canister' or call.method = 'update_settings' or call.method = 'install_code' or call.method = `install_chunked_code` or call.method = 'uninstall_code' or call.method = 'provisional_create_canister_with_cycles') and call.arg = candid(A) and A.sender_canister_version = n) => n = canister_version_from_system
```

The functions `query_as_update` and `system_task_as_update` turns a query function (note that composite query methods cannot be called when executing a message during this transition) resp the heartbeat or global timer into an update function; this is merely a notational trick to simplify the rule:
```
query_as_update(f, arg, env) = λ wasm_state →
  match f(arg, env)(wasm_state) with
    Trap trap → Trap trap
    Return res → Return {
      new_state = wasm_state;
      new_calls = [];
      new_certified_data = NoCertifiedData;
      new_global_timer = NoGlobalTimer;
      response = res.response;
      cycles_accepted = 0;
      cycles_used = res.cycles_used;
    }
    
system_task_as_update(f, env) = λ wasm_state →
  match f(env)(wasm_state) with
    Trap trap → Trap trap
    Return res → Return {
      new_state = res.new_state;
      new_calls = res.new_calls;
      new_certified_data = res.new_certified_data;
      new_global_timer = res.new_global_timer;
      response = NoResponse;
      cycles_accepted = 0;
      cycles_used = res.cycles_used;
    }
```

Note that by construction, a query function will either trap or return with a response; it will never send calls, and it will never change the state of the canister.

#### Spontaneous request rejection {#request-rejection}

The system can reject a request at any point in time, e.g., because it is overloaded.

Condition:
```html
S.messages = Older_messages · CallMessage CM · Younger_messages
```

State after, with `reject_code` being an arbitrary reject code:
```html
S.messages =
    Older_messages
    · Younger_messages
    · ResponseMessage {
        origin = CM.origin;
        response = Reject (reject_code, <implementation-specific>);
        refunded_cycles = CM.transferred_cycles;
      }
```

#### Call context starvation {#rule-starvation}

If the call context needs to respond (in particular, if the call context is not for a system task) and there is no call, downstream call context, or response that references a call context, then a reject is synthesized. The error message below is *not* indicative. In particular, if the IC has an idea about *why* this starved, it can put that in there (e.g. the initial message handler trapped with an out-of-memory access).

Conditions  

```html

S.call_contexts[Ctxt_id].needs_to_respond = true
∀ CallMessage {origin = FromCanister O, …} ∈ S.messages. O.calling_context ≠ Ctxt_id
∀ ResponseMessage {origin = FromCanister O, …} ∈ S.messages. O.calling_context ≠ Ctxt_id
∀ (_ ↦ {needs_to_respond = true, origin = FromCanister O, …}) ∈ S.call_contexts: O.calling_context ≠ Ctxt_id
∀ (_ ↦ Stopping Origins) ∈ S.canister_status: ∀(FromCanister O, _) ∈ Origins. O.calling_context ≠ Ctxt_id

```

State after  

```html

S with
    call_contexts[Ctxt_id].needs_to_respond = false
    call_contexts[Ctxt_id].available_cycles = 0
    messages =
      S.messages ·
      ResponseMessage {
        origin = S.call_contexts[Ctxt_id].origin;
        response = Reject (CANISTER_ERROR, <implementation-specific>);
        refunded_cycles = S.call_contexts[Ctxt_id].available_cycles
      }

```

#### Call context removal {#call-context-removal}

If there is no call, downstream call context, or response that references a call context, and the call context does not need to respond (because it has already responded or its origin is a system task that does not await a response), then the call context can be removed.

Conditions  

```html

S.call_contexts[Ctxt_id].needs_to_respond = false
∀ CallMessage {origin = FromCanister O, …} ∈ S.messages. O.calling_context ≠ Ctxt_id
∀ ResponseMessage {origin = FromCanister O, …} ∈ S.messages. O.calling_context ≠ Ctxt_id
∀ (_ ↦ {needs_to_respond = true, origin = FromCanister O, …}) ∈ S.call_contexts: O.calling_context ≠ Ctxt_id
∀ (_ ↦ Stopping Origins) ∈ S.canister_status: ∀(FromCanister O, _) ∈ Origins. O.calling_context ≠ Ctxt_id

```

State after  

```html

S with
    call_contexts[Ctxt_id] = (deleted)

```

#### IC Management Canister: Canister creation

The IC chooses an appropriate canister id (referred to as `CanisterId`) and subnet id (referred to as `SubnetId`, `SubnetId ∈ Subnets`, where `Subnets` is the under-specified set of subnet ids on the IC) and instantiates a new (empty) canister identified by `CanisterId` on the subnet identified by `SubnetId` with subnet size denoted by `SubnetSize`. The *controllers* are set such that the sender of this request is the only controller, unless the `settings` say otherwise. All cycles on this call are now the canister's initial cycles.

This is also when the System Time of the new canister starts ticking.

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'create_canister'
M.arg = candid(A)
is_system_assigned Canister_id
Canister_id ∉ dom(S.canisters)
SubnetId ∈ Subnets
if A.settings.controllers is not null:
  New_controllers = A.settings.controllers
else:
  New_controllers = [M.caller]

if New_memory_allocation > 0:
  memory_usage_canister_history(New_canister_history) ≤ New_memory_allocation

if A.settings.compute_allocation is not null:
  New_compute_allocation = A.settings.compute_allocation
else:
  New_compute_allocation = 0
if A.settings.memory_allocation is not null:
  New_memory_allocation = A.settings.memory_allocation
else:
  New_memory_allocation = 0
if A.settings.freezing_threshold is not null:
  New_freezing_threshold = A.settings.freezing_threshold
else:
  New_freezing_threshold = 2592000
if A.settings.reserved_cycles_limit is not null:
  New_reserved_balance_limit = A.settings.reserved_cycles_limit
else:
  New_reserved_balance_limit = 5_000_000_000_000
if A.settings.wasm_memory_limit is not null:
  New_wasm_memory_limit = A.settings.wasm_memory_limit
else:
  New_wasm_memory_limit = 0

Cycles_reserved = cycles_to_reserve(S, Canister_id, New_compute_allocation, New_memory_allocation, null, EmptyCanister.wasm_state)
New_balance = M.transferred_cycles - Cycles_reserved
New_reserved_balance = Cycles_reserved
New_reserved_balance <= New_reserved_balance_limit
if New_compute_allocation > 0 or New_memory_allocation > 0 or Cycles_reserved > 0:
  liquid_balance(S', Canister_id) ≥ 0

New_canister_history = {
  total_num_changes = 1
  recent_changes = {
    timestamp_nanos = CurrentTime
    canister_version = 0
    origin = change_origin(M.caller, A.sender_canister_version, M.origin)
    details = Creation {
      controllers = New_controllers
    }
  }
}

if A.settings.log_visibility is not null:
  New_canister_log_visibility = A.settings.log_visibility
else:
  New_canister_log_visibility = Controllers

```

State after  

```html

S' = S with
    canisters[Canister_id] = EmptyCanister
    snapshots[A.canister_id] = null
    time[Canister_id] = CurrentTime
    global_timer[Canister_id] = 0
    controllers[Canister_id] = New_controllers
    chunk_store[Canister_id] = ()
    compute_allocation[Canister_id] = New_compute_allocation
    memory_allocation[Canister_id] = New_memory_allocation
    freezing_threshold[Canister_id] = New_freezing_threshold
    balances[Canister_id] = New_balance
    reserved_balances[Canister_id] = New_reserved_balance
    reserved_balance_limits[Canister_id] = New_reserved_balance_limit
    wasm_memory_limit[Canister_id] = New_wasm_memory_limit
    certified_data[Canister_id] = ""
    query_stats[Canister_id] = []
    canister_history[Canister_id] = New_canister_history
    canister_log_visibility[Canister_id] = New_canister_log_visibility
    canister_logs[Canister_id] = []
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid({canister_id = Canister_id}))
        refunded_cycles = 0
      }
    canister_status[Canister_id] = Running
    canister_version[Canister_id] = 0
    canister_subnet[Canister_id] = Subnet {
      subnet_id : SubnetId
      subnet_size : SubnetSize
    }

```

This uses the predicate
```
is_system_assigned : Principal -> Bool
```
which characterizes all system-assigned ids.

To avoid clashes with potential user ids or is derived from users or canisters, we require (somewhat handwavy) that

-   `is_system_assigned (mk_self_authenticating_id pk) = false` for possible public keys `pk` and

-   `is_system_assigned (mk_derived_id p dn) = false` for any `p` that could be a user id or canister id.

-   `is_system_assigned p = false` for `|p| > 29`.

-   `is_system_assigned ic_principal = false`.

#### IC Management Canister: Changing settings

Only the controllers of the given canister can update the canister settings.

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'update_settings'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id]

if New_memory_allocation > 0:
  memory_usage_wasm_state(S.canisters[A.canister_id].wasm_state) +
    memory_usage_raw_module(S.canisters[A.canister_id].raw_module) +
    memory_usage_canister_history(New_canister_history) +
    memory_usage_snapshot(S.snapshots[A.canister_id]) ≤ New_memory_allocation

if A.settings.compute_allocation is not null:
  New_compute_allocation = A.settings.compute_allocation
else:
  New_compute_allocation = S.compute_allocation[A.canister_id]
if A.settings.memory_allocation is not null:
  New_memory_allocation = A.settings.memory_allocation
else:
  New_memory_allocation = S.memory_allocation[A.canister_id]
if A.settings.freezing_threshold is not null:
  New_freezing_threshold = A.settings.freezing_threshold
else:
  New_freezing_threshold = S.freezing_threshold[A.canister_id]
if A.settings.reserved_cycles_limit is not null:
  New_reserved_balance_limit = A.settings.reserved_cycles_limit
else:
  New_reserved_balance_limit = S.reserved_balance_limits[A.canister_id]
if A.settings.wasm_memory_limit is not null:
  New_wasm_memory_limit = A.settings.wasm_memory_limit
else:
  New_wasm_memory_limit = S.wasm_memory_limit[A.canister_id]

Cycles_reserved = cycles_to_reserve(S, A.canister_id, New_compute_allocation, New_memory_allocation, S.snapshots[A.canister_id], S.canisters[A.canister_id].wasm_state)
New_balance = S.balances[A.canister_id] - Cycles_reserved
New_reserved_balance = S.reserved_balances[A.canister_id] + Cycles_reserved
New_reserved_balance ≤ New_reserved_balance_limit
if New_compute_allocation > S.compute_allocation[A.canister_id] or New_memory_allocation > S.memory_allocation[A.canister_id] or Cycles_reserved > 0:
  liquid_balance(S', A.canister_id) ≥ 0

S.canister_history[A.canister_id] = {
  total_num_changes = N;
  recent_changes = H;
}
if A.settings.controllers is not null:
  New_canister_history = {
    total_num_changes = N + 1;
    recent_changes = H · {
        timestamp_nanos = S.time[A.canister_id];
        canister_version = S.canister_version[A.canister_id] + 1;
        origin = change_origin(M.caller, A.sender_canister_version, M.origin);
        details = ControllersChange {
          controllers = A.settings.controllers;
        };
      };
  }
else:
  New_canister_history = S.canister_history[A.canister_id]

```

State after  

```html

S' = S with
    if A.settings.controllers is not null:
      controllers[A.canister_id] = A.settings.controllers
      canister_history[A.canister_id] = New_canister_history
    compute_allocation[A.canister_id] = New_compute_allocation
    memory_allocation[A.canister_id] = New_memory_allocation
    freezing_threshold[A.canister_id] = New_freezing_threshold
    balances[A.canister_id] = New_balance
    reserved_balances[A.canister_id] = New_reserved_balance
    reserved_balance_limits[A.canister_id] = New_reserved_balance_limit
    wasm_memory_limit[A.canister_id] = New_wasm_memory_limit
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1
    if A.settings.log_visibility is not null:
      canister_log_visibility[A.canister_id] = A.settings.log_visibility
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid())
        refunded_cycles = M.transferred_cycles
      }

```

#### IC Management Canister: Canister status

The controllers of a canister can obtain detailed information about the canister.

The `Memory_usage` is the (in this specification underspecified) total size of storage in bytes.

The `idle_cycles_burned_per_day` is the idle consumption of resources in cycles per day.

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'canister_status'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id] ∪ {A.canister_id}

```

State after  

```html

S with
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = candid({
          status = simple_status(S.canister_status[A.canister_id]);
          settings = {
            controllers = S.controllers[A.canister_id];
            compute_allocation = S.compute_allocation[A.canister_id];
            memory_allocation = S.memory_allocation[A.canister_id];
            freezing_threshold = S.freezing_threshold[A.canister_id];
            reserved_cycles_limit = S.reserved_balance_limit[A.canister_id];
            wasm_memory_limit = S.wasm_memory_limit[A.canister_id];
          }
          module_hash =
            if S.canisters[A.canister_id] = EmptyCanister
            then null
            else opt (SHA-256(S.canisters[A.canister_id].raw_module));
          memory_size = Memory_usage;
          cycles = S.balances[A.canister_id];
          reserved_cycles = S.reserved_balances[A.canister_id]
          idle_cycles_burned_per_day = idle_cycles_burned_rate(
            S.compute_allocation[A.canister_id],
            S.memory_allocation[A.canister_id],
            memory_usage_wasm_state(S.canisters[A.canister_id].wasm_state) +
              memory_usage_raw_module(S.canisters[A.canister_id].raw_module) +
              memory_usage_canister_history(S.canister_history[A.canister_id]) +
              memory_usage_chunk_store(S.chunk_store[A.canister_id]) +
              memory_usage_snapshot(S.snapshots[A.canister_id]),
            S.freezing_threshold[A.canister_id],
            S.canister_subnet[A.canister_id].subnet_size,
          );
          query_stats = noise(SUM {{num_calls_total: 1,
                                    num_instructions_total: single_query_stats.num_instructions,
                                    request_payload_bytes_total: single_query_stats.request_payload_bytes,
                                    response_payload_bytes_total: single_query_stats.response_payload_bytes} |
                                   single_query_stats <- S.query_stats[A.canister_id];
                                   single_query_stats.timestamp <= S.time[A.canister_id] - T})
        })
        refunded_cycles = M.transferred_cycles
      }

```

where `T` is an unspecified time delay of query statistics and `noise` is an unspecified probabilistic function
modelling information loss due to aggregating query statistics in a distributed system.

#### IC Management Canister: Canister information

Every canister can retrieve the canister history, current module hash, and current controllers of every other canister (including itself).

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'canister_info'
M.arg = candid(A)
if A.num_requested_changes = null then From = |S.canister_history[A.canister_id].recent_changes|
else From = max(0, |S.canister_history[A.canister_id].recent_changes| - A.num_requested_changes)
End = |S.canister_history[A.canister_id].recent_changes| - 1

```

State after  

```html

S with
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = candid({
          total_num_changes = S.canister_history[A.canister_id].total_num_changes;
          recent_changes = S.canister_history[A.canister_id].recent_changes[From..End];
          module_hash =
            if S.canisters[A.canister_id] = EmptyCanister
            then null
            else opt (SHA-256(S.canisters[A.canister_id].raw_module));
          controllers = S.controllers[A.canister_id];
        })
        refunded_cycles = M.transferred_cycles
      }

```

#### IC Management Canister: Upload Chunk

A controller of a canister, or the canister itself can upload chunks to the chunk store of that canister.

Conditions

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'upload_chunk'
M.arg = candid(A)
|dom(S.chunk_store[A.canister_id]) ∪ {SHA-256(A.chunk)}| <= CHUNK_STORE_SIZE
M.caller ∈ S.controllers[A.canister_id] ∪ {A.canister_id}


```

State after

```html

S with
    chunk_store[A.canister_id](SHA-256(A.chunk)) = A.chunk
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = candid({hash: hash})
        refunded_cycles = M.transferred_cycles
      }

```

#### IC Management Canister: Clear chunk store

The controller of a canister, or the canister itself can clear the chunk store of that canister.

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'clear_chunk_store'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id] ∪ {A.canister_id}
```

State after

```html

S with
    chunk_store[A.canister_id] = ()
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = candid()
        refunded_cycles = M.transferred_cycles
      }

```

#### IC Management Canister: List stored chunks

The controller of a canister, or the canister itself can list the hashes of the chunks stored in the chunk store.

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'stored_chunks'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id] ∪ {A.canister_id}

```

State after

```html

S with
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = candid([{hash: hash} | hash <- dom(S.chunk_store[A.canister_id])])
        refunded_cycles = M.transferred_cycles
      }

```




#### IC Management Canister: Code installation

Only the controllers of the given canister can install code. This transition installs new code over a canister. This involves invoking the `canister_init` method (see [Canister initialization](#system-api-init)), which must succeed.

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'install_code'
M.arg = candid(A)
Mod = parse_wasm_mod(A.wasm_module)
Public_custom_sections = parse_public_custom_sections(A.wasm_module);
Private_custom_sections = parse_private_custom_sections(A.wasm_module);
(A.mode = install and S.canisters[A.canister_id] = EmptyCanister) or A.mode = reinstall
M.caller ∈ S.controllers[A.canister_id]

dom(Mod.update_methods) ∩ dom(Mod.query_methods) = ∅
dom(Mod.update_methods) ∩ dom(Mod.composite_query_methods) = ∅
dom(Mod.query_methods) ∩ dom(Mod.composite_query_methods) = ∅

Env = {
  time = S.time[A.canister_id];
  controllers = S.controllers[A.canister_id];
  global_timer = 0;
  balance = S.balances[A.canister_id];
  reserved_balance = S.reserved_balances[A.canister_id];
  reserved_balance_limit = S.reserved_balance_limits[A.canister_id];
  compute_allocation = S.compute_allocation[A.canister_id];
  memory_allocation = S.memory_allocation[A.canister_id];
  memory_usage_raw_module = memory_usage_raw_module(A.wasm_module);
  memory_usage_canister_history = memory_usage_canister_history(New_canister_history);
  memory_usage_chunk_store = memory_usage_chunk_store(New_chunk_store);
  memory_usage_snapshot = memory_usage_snapshot(S.snapshots[A.canister_id]);
  freezing_threshold = S.freezing_threshold[A.canister_id];
  subnet_size = S.canister_subnet[A.canister_id].subnet_size;
  certificate = NoCertificate;
  status = simple_status(S.canister_status[A.canister_id]);
  canister_version = S.canister_version[A.canister_id] + 1;
}
Mod.init(A.canister_id, A.arg, M.caller, Env) = Return {new_state = New_state; new_certified_data = New_certified_data; new_global_timer = New_global_timer; cycles_used = Cycles_used;}
Cycles_reserved = cycles_to_reserve(S, A.canister_id, S.compute_allocation[A.canister_id], S.memory_allocation[A.canister_id], S.snapshots[A.canister_id], New_state)
New_balance = S.balances[A.canister_id] - Cycles_used - Cycles_reserved
New_reserved_balance = S.reserved_balances[A.canister_id] + Cycles_reserved
New_reserved_balance ≤ S.reserved_balance_limits[A.canister_id]

liquid_balance(S, A.canister_id) ≥ MAX_CYCLES_PER_MESSAGE

liquid_balance(S', A.canister_id) ≥ 0

if S.memory_allocation[A.canister_id] > 0:
  memory_usage_wasm_state(New_state) +
    memory_usage_raw_module(A.wasm_module) +
    memory_usage_canister_history(New_canister_history) +
    memory_usage_chunk_store(New_chunk_store) +
    memory_usage_snapshot(S.snapshots[A.canister_id]) ≤ S.memory_allocation[A.canister_id]

(S.wasm_memory_limit[A.canister_id] = 0) or |New_state.store.mem| <= S.wasm_memory_limit[A.canister_id]

S.canister_history[A.canister_id] = {
  total_num_changes = N;
  recent_changes = H;
}
New_canister_history = {
  total_num_changes = N + 1;
  recent_changes = H · {
    timestamp_nanos = S.time[A.canister_id];
    canister_version = S.canister_version[A.canister_id] + 1
    origin = change_origin(M.caller, A.sender_canister_version, M.origin);
    details = CodeDeployment {
      mode = A.mode;
      module_hash = SHA-256(A.wasm_module);
    };
  };
}

```

State after  

```html

S' = S with
    canisters[A.canister_id] = {
      wasm_state = New_state;
      module = Mod;
      raw_module = A.wasm_module;
      public_custom_sections = Public_custom_sections;
      private_custom_sections = Private_custom_sections;
    }
    certified_data[A.canister_id] = New_certified_data
    if New_global_timer ≠ NoGlobalTimer:
      global_timer[A.canister_id] = New_global_timer
    else:
      global_timer[A.canister_id] = 0
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1
    balances[A.canister_id] = New_balance
    reserved_balances[A.canister_id] = New_reserved_balance
    canister_history[A.canister_id] = New_canister_history
    canister_logs[A.canister_id] = canister_logs
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin;
        response = Reply (candid());
        refunded_cycles = M.transferred_cycles;
      }

```

The logs produced by the canister during the execution of the WebAssembly `start` and `canister_init` functions are modeled via the unspecified `canister_logs` variable; the variable stores a list of logs (each of type `CanisterLog`) with consecutive sequence numbers, timestamps equal to `S.time[A.canister_id]`, and contents produced by the canister calling `ic0.debug_print`, `ic0.trap`, or produced by the WebAssembly runtime when the canister WebAssembly module traps.

#### IC Management Canister: Code upgrade

Only the controllers of the given canister can install new code. This changes the code of an *existing* canister, preserving the state in the stable memory. This involves invoking the `canister_pre_upgrade` method, if the `skip_pre_upgrade` flag is not set to `opt true`, on the old and `canister_post_upgrade` method on the new canister, which must succeed and must not invoke other methods. If the `wasm_memory_persistence` flag is set to `opt keep`, then the WebAssembly memory is preserved.

In the following, the `initial_wasm_store` is the store of the WebAssembly module after instantiation (as per WebAssembly spec) of the WebAssembly module contained in `A.wasm_module`, before executing a potential `(start)` function. The store `initialize_store(State, A.wasm_module)` is the store of the WebAssembly module after instantiation (as per WebAssembly spec) of the WebAssembly module contained in `A.wasm_module` while reusing the WebAssembly memory of `State`.

If the old canister module exports a private custom section with the name "enhanced-orthogonal-persistence", then the `wasm_memory_persistence` option must be set to `opt keep` or `opt replace`, i.e., the option must not be `null`.

If the `wasm_memory_persistence` option is set to `opt keep`, then the new canister module must export a private custom section with the name "enhanced-orthogonal-persistence".

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'install_code'
M.arg = candid(A)
Mod = parse_wasm_mod(A.wasm_module)
Public_custom_sections = parse_public_custom_sections(A.wasm_module)
Private_custom_sections = parse_private_custom_sections(A.wasm_module)
M.caller ∈ S.controllers[A.canister_id]
S.canisters[A.canister_id] = { wasm_state = Old_state; module = Old_module, …}

dom(Mod.update_methods) ∩ dom(Mod.query_methods) = ∅
dom(Mod.update_methods) ∩ dom(Mod.composite_query_methods) = ∅
dom(Mod.query_methods) ∩ dom(Mod.composite_query_methods) = ∅

Env = {
  time = S.time[A.canister_id];
  controllers = S.controllers[A.canister_id];
  global_timer = S.global_timer[A.canister_id];
  balance = S.balances[A.canister_id];
  reserved_balance = S.reserved_balances[A.canister_id];
  reserved_balance_limit = S.reserved_balance_limits[A.canister_id];
  compute_allocation = S.compute_allocation[A.canister_id];
  memory_allocation = S.memory_allocation[A.canister_id];
  memory_usage_raw_module = memory_usage_raw_module(S.canisters[A.canister_id].raw_module);
  memory_usage_canister_history = memory_usage_canister_history(S.canister_history[A.canister_id]);
  memory_usage_chunk_store = memory_usage_chunk_store(S.chunk_store[A.canister_id]);
  memory_usage_snapshot = memory_usage_snapshot(S.snapshots[A.canister_id]);
  freezing_threshold = S.freezing_threshold[A.canister_id];
  subnet_size = S.canister_subnet[A.canister_id].subnet_size;
  certificate = NoCertificate;
  status = simple_status(S.canister_status[A.canister_id]);
  canister_version = S.canister_version[A.canister_id];
}

(
  (A.mode = upgrade U and U.skip_pre_upgrade ≠ true)
  Env1 = Env with {
    global_timer = S.global_timer[A.canister_id];
    canister_version = S.canister_version[A.canister_id];
  }
  Old_module.pre_upgrade(Old_State, M.caller, Env1) = Return {new_state = Intermediate_state; new_certified_data = New_certified_data; cycles_used = Cycles_used;}
)
or
(
  (A.mode = upgrade U and U.skip_pre_upgrade = true)
  Intermediate_state = Old_state
  New_certified_data = NoCertifiedData
  Cycles_used = 0
)

(
  (A.mode = upgrade U and U.wasm_memory_persistence ≠ keep)
  Persisted_state = {store = initial_wasm_store; self_id = A.canister_id; stable_mem = Intermediate_state.stable_memory}
)
or
(
  (A.mode = upgrade U and U.wasm_memory_persistence = keep)
  Persisted_state = initialize_store(Intermediate_state, A.wasm_module)
)

(A.mode = upgrade U and U.wasm_memory_persistence = keep)
or
(A.mode = upgrade U and U.wasm_memory_persistence = replace)
or
(S.canisters[A.canister_id].private_custom_sections["enhanced-orthogonal-persistence"] = null)

not (A.mode = upgrade U and U.wasm_memory_persistence = keep and Private_custom_sections["enhanced-orthogonal-persistence"] = null)

Env2 = Env with {
  memory_usage_raw_module = memory_usage_raw_module(A.wasm_module);
  memory_usage_canister_history = memory_usage_canister_history(New_canister_history);
  global_timer = 0;
  canister_version = S.canister_version[A.canister_id] + 1;
}

Mod.post_upgrade(Persisted_state, A.arg, M.caller, Env2) = Return {new_state = New_state; new_certified_data = New_certified_data'; new_global_timer = New_global_timer; cycles_used = Cycles_used';}

Cycles_reserved = cycles_to_reserve(S, A.canister_id, S.compute_allocation[A.canister_id], S.memory_allocation[A.canister_id], S.snapshots[A.canister_id], New_state)
New_balance = S.balances[A.canister_id] - Cycles_used - Cycles_used' - Cycles_reserved
New_reserved_balance = S.reserved_balances[A.canister_id] + Cycles_reserved
New_reserved_balance ≤ S.reserved_balance_limits[A.canister_id]

liquid_balance(S, A.canister_id) ≥ MAX_CYCLES_PER_MESSAGE

liquid_balance(S', A.canister_id) ≥ 0

if S.memory_allocation[A.canister_id] > 0:
  memory_usage_wasm_state(New_state) +
    memory_usage_raw_module(A.wasm_module) +
    memory_usage_canister_history(New_canister_history) +
    memory_usage_chunk_store(S[A.canister_id].chunk_store) +
    memory_usage_snapshot(S.snapshots[A.canister_id]) ≤ S.memory_allocation[A.canister_id]

(S.wasm_memory_limit[A.canister_id] = 0) or |New_state.store.mem| <= S.wasm_memory_limit[A.canister_id]

S.canister_history[A.canister_id] = {
  total_num_changes = N;
  recent_changes = H;
}
New_canister_history = {
  total_num_changes = N + 1;
  recent_changes = H · {
    timestamp_nanos = S.time[A.canister_id];
    canister_version = S.canister_version[A.canister_id] + 1
    origin = change_origin(M.caller, A.sender_canister_version, M.origin);
    details = CodeDeployment {
      mode = Upgrade;
      module_hash = SHA-256(A.wasm_module);
    };
  };
}
```

State after  

```html

S' = S with
    canisters[A.canister_id] = {
      wasm_state = New_state;
      module = Mod;
      raw_module = A.wasm_module;
      public_custom_sections = Public_custom_sections;
      private_custom_sections = Private_custom_sections;
    }
    if New_certified_data' ≠ NoCertifiedData:
      certified_data[A.canister_id] = New_certified_data'
    else if New_certified_data ≠ NoCertifiedData:
      certified_data[A.canister_id] = New_certified_data
    if New_global_timer ≠ NoGlobalTimer:
      global_timer[A.canister_id] = New_global_timer
    else:
      global_timer[A.canister_id] = 0
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1
    balances[A.canister_id] = New_balance;
    reserved_balances[A.canister_id] = New_reserved_balance;
    canister_history[A.canister_id] = New_canister_history
    canister_logs[A.canister_id] = S.canister_logs[A.canister_id] · canister_logs
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin;
        response = Reply (candid());
        refunded_cycles = M.transferred_cycles;
      }

```

The logs produced by the canister during the execution of the WebAssembly `canister_pre_upgrade`, `start`, and `canister_post_upgrade` functions are modeled via the unspecified `canister_logs` variable; the variable stores a list of logs (each of type `CanisterLog`) with consecutive sequence numbers, timestamps equal to `S.time[A.canister_id]`, and contents produced by the canister calling `ic0.debug_print`, `ic0.trap`, or produced by the WebAssembly runtime when the canister WebAssembly module traps.

#### IC Management Canister: Install chunked code

Conditions

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'install_chunked_code'
M.arg = candid(A)
if A.store_canister = null then
  store_canister = A.target_canister
else
  store_canister = A.store_canister
M.caller ∈ S.controllers[A.target_canister]
M.caller ∈ S.controllers[store_canister] ∪ {store_canister}
S.canister_subnet[A.target_canister] = S.canister_subnet[strorage_canister]
∀ h ∈ A.chunk_hashes_list. h ∈ dom(S.chunk_store[store_canister])
A.chunk_hashes_list = [h1,h2,...,hk]
wasm_module = S.chunk_store[store_canister][h1] || ... || S.chunk_store[store_canister][hk]
A.wasm_module_hash = SHA-256(wasm_module)
M' = M with
    method_name = 'install_code'
    arg = candid(record {A.mode; A.target_canister; wasm_module; A.arg; A.sender_canister_version})

```

State after

```html

S with
    messages = Older_messages · CallMessage M' · Younger_messages

```

#### IC Management Canister: Code uninstallation {#rule-uninstall}

Upon uninstallation, the canister is reverted to an empty canister, and all outstanding call contexts are rejected and marked as deleted.

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'uninstall_code'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id]
S.canister_history[A.canister_id] = {
  total_num_changes = N;
  recent_changes = H;
}

```

State after  

```html

S with
    canisters[A.canister_id] = EmptyCanister
    certified_data[A.canister_id] = ""
    chunk_store = ()
    canister_history[A.canister_id] = {
      total_num_changes = N + 1;
      recent_changes = H · {
          timestamp_nanos = S.time[A.canister_id];
          canister_version = S.canister_version[A.canister_id] + 1
          origin = change_origin(M.caller, A.sender_canister_version, M.origin);
          details = CodeUninstall;
        };
    }
    canister_logs[A.canister_id] = []
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1
    global_timer[A.canister_id] = 0

    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid())
        refunded_cycles = M.transferred_cycles
      } ·
      [ ResponseMessage {
          origin = Ctxt.origin
          response = Reject (CANISTER_REJECT, <implementation-specific>)
          refunded_cycles = Ctxt.available_cycles
        }
      | Ctxt_id ↦ Ctxt ∈ S.call_contexts
      , Ctxt.canister = A.canister_id
      , Ctxt.needs_to_respond = true
      ]

      for Ctxt_id ↦ Ctxt ∈ S.call_contexts:
        if Ctxt.canister = A.canister_id:
          call_contexts[Ctxt_id].deleted := true
          call_contexts[Ctxt_id].needs_to_respond := false
          call_contexts[Ctxt_id].available_cycles := 0

```

#### IC Management Canister: Stopping a canister

The controllers of a canister can stop a canister. Stopping a canister goes through two steps. First, the status of the canister is set to `Stopping`; as explained above, a stopping canister rejects all incoming requests and continues processing outstanding responses. When a stopping canister has no more open call contexts, its status is changed to `Stopped` and a response is generated. Note that when processing responses, a stopping canister can make calls to other canisters and thus create new call contexts. In addition, a canister which is stopped or stopping will accept (and respond) to further `stop_canister` requests.

We encode this behavior via three (types of) transitions:

1.  First, any `stop_canister` call sets the state of the canister to `Stopping`; we record in the IC state the origin (and cycles) of all `stop_canister` calls which arrive at the canister while it is stopping (or stopped). Note that every such `stop_canister` call can be rejected by the system at any time (the canister stays stopping in this case), e.g., if the `stop_canister` call could not be responded to for a long time.

2.  Next, when the canister has no open call contexts (so, in particular, all outstanding responses to the canister have been processed), the status of the canister is set to `Stopped`.

3.  Finally, each pending `stop_canister` call (which are encoded in the status) is responded to, to indicate that the canister is stopped.

Conditions

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'stop_canister'
M.arg = candid(A)
S.canister_status[A.canister_id] = Running
M.caller ∈ S.controllers[A.canister_id]

```

State after  

```html

S with
    messages = Older_messages · Younger_messages
    canister_status[A.canister_id] = Stopping [(M.origin, M.transferred_cycles)]
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1

```

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'stop_canister'
M.arg = candid(A)
S.canister_status[A.canister_id] = Stopping Origins
M.caller ∈ S.controllers[A.canister_id]

```

State after  

```html

S with
    messages = Older_messages · Younger_messages
    canister_status[A.canister_id] = Stopping (Origins · [(M.origin, M.transferred_cycles)])
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1

```

The status of a stopping canister which has no open call contexts is set to `Stopped`, and all pending `stop_canister` calls are replied to.

Conditions  

```html

S.canister_status[CanisterId] = Stopping Origins
∀ Ctxt_id. S.call_contexts[Ctxt_id].canister ≠ CanisterId

```

State after  

```html

S with
    canister_status[CanisterId] = Stopped
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1
    messages = S.Messages ·
        [ ResponseMessage {
            origin = O
            response = Reply (candid())
            refunded_cycles = C
          }
        | (O, C) ∈ Origins
        ]

```

Sending a `stop_canister` message to an already stopped canister is acknowledged (i.e. responded with success) and the canister version is incremented, but is otherwise a no-op:

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'stop_canister'
M.arg = candid(A)
S.canister_status[A.canister_id] = Stopped
M.caller ∈ S.controllers[A.canister_id]

```

State after  

```html

S with
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin;
        response = Reply (candid());
        refunded_cycles = M.transferred_cycles;
      }

```

Pending `stop_canister` calls may be rejected by the system at any time (the canister stays stopping in this case):

Conditions

```html

S.canister_status[CanisterId] = Stopping (Older_origins · (O, C) · Younger_origins)

```

State after

```html

S with
    canister_status[CanisterId] = Stopping (Older_origins · Younger_origins)
    messages = S.Messages ·
      ResponseMessage {
        origin = O
        response = Reject (SYS_TRANSIENT, <implementation-specific>)
        refunded_cycles = C
      }

```

#### IC Management Canister: Starting a canister

The controllers of a canister can start a `stopped` canister. If the canister is already running, the command has no effect on the canister (except for incrementing its canister version).

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'start_canister'
M.arg = candid(A)
S.canister_status[A.canister_id] = Running or S.canister_status[A.canister_id] = Stopped
M.caller ∈ S.controllers[A.canister_id]

```

State after  

```html

S with
    canister_status[A.canister_id] = Running
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1
    messages = Older_messages · Younger_messages ·
        ResponseMessage{
            origin = M.origin
            response = Reply (candid())
            refunded_cycles = M.transferred_cycles
        }

```

If the status of the canister was 'stopping', then the canister status is set to `running`. The pending `stop_canister` request(s) are rejected.

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'start_canister'
M.arg = candid(A)
S.canister_status[A.canister_id] = Stopping Origins
M.caller ∈ S.controllers[A.canister_id]

```

State after  

```html

S with
    canister_status[A.canister_id] = Running
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1
    messages = Older_messages · Younger_messages ·
        ResponseMessage{
            origin = M.origin
            response = Reply (candid())
            refunded_cycles = M.transferred_cycles
        } ·
        [ ResponseMessage {
            origin = O
            response = Reject (CANISTER_ERROR, <implementation-specific>)
            refunded_cycles = C
          }
        | (O, C) ∈ Origins
        ]

```

#### IC Management Canister: Canister deletion

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'delete_canister'
M.arg = candid(A)
S.canister_status[A.canister_id] = Stopped
M.caller ∈ S.controllers[A.canister_id]

```

State after  

```html

S with
    canisters[A.canister_id] = (deleted)
    snapshots[A.canister_id] = (deleted)
    controllers[A.canister_id] = (deleted)
    compute_allocation[A.canister_id] = (deleted)
    memory_allocation[A.canister_id] = (deleted)
    freezing_threshold[A.canister_id] = (deleted)
    canister_status[A.canister_id] = (deleted)
    canister_version[A.canister_id] = (deleted)
    canister_subnet[A.canister_id] = (deleted)
    time[A.canister_id] = (deleted)
    global_timer[A.canister_id] = (deleted)
    balances[A.canister_id] = (deleted)
    reserved_balances[A.canister_id] = (deleted)
    reserved_balance_limits[A.canister_id] = (deleted)
    wasm_memory_limit[A.canister_id] = (deleted)
    certified_data[A.canister_id] = (deleted)
    canister_history[A.canister_id] = (deleted)
    canister_log_visibility[A.canister_id] = (deleted)
    canister_logs[A.canister_id] = (deleted)
    query_stats[A.canister_id] = (deleted)
    chunk_store[A.canister_id] = (deleted)
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid())
        refunded_cycles = M.transferred_cycles
      }

```

#### IC Management Canister: Depositing cycles

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'deposit_cycles'
M.arg = candid(A)
A.canister_id ∈ dom(S.balances)

```

State after  

```html

S with
    balances[A.canister_id] =
      S.balances[A.canister_id] + M.transferred_cycles
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid())
        refunded_cycles = 0
      }

```

#### IC Management Canister: Random numbers

The management canister can produce pseudo-random bytes. It always returns a 32-byte `blob`:

The precise guarantees around the randomness, e.g. unpredictability, are not captured in this formal semantics.

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'raw_rand'
M.arg = candid()
|B| = 32

```

State after  

```html

S with
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid(B))
        refunded_cycles = M.transferred_cycles
      }

```

#### IC Management Canister: Node Metrics

:::note

The node metrics management canister API is considered EXPERIMENTAL. Canister developers must be aware that the API may evolve in a non-backward-compatible way.

:::

The management canister returns metrics for nodes on a given subnet. The definition of the metrics values
is not captured in this formal semantics.

Conditions

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'node_metrics_history'
M.arg = candid(A)
R = <implementation-specific>

```

State after

```html

S with
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid(R))
        refunded_cycles = M.transferred_cycles
      }

```

#### IC Management Canister: Canister creation with cycles

This is a variant of `create_canister`, which sets the initial cycle balance based on the `amount` argument.

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'provisional_create_canister_with_cycles'
M.arg = candid(A)
is_system_assigned Canister_id
Canister_id ∉ dom(S.canisters)
if A.specified_id is not null:
  Canister_id = A.specified_id
if A.settings.controllers is not null:
  New_controllers = A.settings.controllers
else:
  New_controllers = [M.caller]

if New_memory_allocation > 0:
  memory_usage_canister_history(New_canister_history) ≤ New_memory_allocation

if A.settings.compute_allocation is not null:
  New_compute_allocation = A.settings.compute_allocation
else:
  New_compute_allocation = 0
if A.settings.memory_allocation is not null:
  New_memory_allocation = A.settings.memory_allocation
else:
  New_memory_allocation = 0
if A.settings.freezing_threshold is not null:
  New_freezing_threshold = A.settings.freezing_threshold
else:
  New_freezing_threshold = 2592000
if A.settings.reserved_cycles_limit is not null:
  New_reserved_balance_limit = A.settings.reserved_cycles_limit
else:
  New_reserved_balance_limit = 5_000_000_000_000
if A.settings.wasm_memory_limit is not null:
  New_wasm_memory_limit = A.settings.wasm_memory_limit
else:
  New_wasm_memory_limit = 0

Cycles_reserved = cycles_to_reserve(S, Canister_id, New_compute_allocation, New_memory_allocation,  null, EmptyCanister.wasm_state)
if A.amount is not null:
  New_balance = A.amount - Cycles_reserved
else:
  New_balance = DEFAULT_PROVISIONAL_CYCLES_BALANCE - Cycles_reserved
New_reserved_balance = Cycles_reserved
New_reserved_balance ≤ New_reserved_balance_limit
if New_compute_allocation > 0 or New_memory_allocation > 0 or Cycles_reserved > 0:
  liquid_balance(S', Canister_id) ≥ 0

New_canister_history {
  total_num_changes = 1
  recent_changes = {
    timestamp_nanos = CurrentTime
    canister_version = 0
    origin = change_origin(M.caller, A.sender_canister_version, M.origin)
    details = Creation {
      controllers = New_controllers
    }
  }
}

if A.settings.log_visibility is not null:
  New_canister_log_visibility = A.settings.log_visibility
else:
  New_canister_log_visibility = Controllers

```

State after  

```html

S' = S with
    canisters[Canister_id] = EmptyCanister
    snapshots[Canister_id] = null
    time[Canister_id] = CurrentTime
    global_timer[Canister_id] = 0
    controllers[Canister_id] = New_controllers
    compute_allocation[Canister_id] = New_compute_allocation
    memory_allocation[Canister_id] = New_memory_allocation
    freezing_threshold[Canister_id] = New_freezing_threshold
    balances[Canister_id] = New_balance
    reserved_balances[Canister_id] = New_reserved_balance
    reserved_balance_limits[Canister_id] = New_reserved_balance_limit
    wasm_memory_limit[Canister_id] = New_wasm_memory_limit
    certified_data[Canister_id] = ""
    canister_history[Canister_id] = New_canister_history
    canister_log_visibility[Canister_id] = New_canister_log_visibility
    canister_logs[Canister_id] = []
    query_stats[CanisterId] = []
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid({canister_id = Canister_id}))
        refunded_cycles = M.transferred_cycles
      }
    canister_status[Canister_id] = Running
    canister_version[Canister_id] = 0
    canister_subnet[Canister_id] = Subnet {
      subnet_id : SubnetId
      subnet_size : SubnetSize
    }

```

#### IC Management Canister: Top up canister

Conditions  

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ CallMessage M' | FuncMessage M' ∈ Older_messages. M'.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'provisional_top_up_canister'
M.arg = candid(A)
A.canister_id ∈ dom(S.canisters)

```

State after  

```html

S with
    balances[A.canister_id] = S.balances[A.canister_id] + A.amount
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid())
        refunded_cycles = M.transferred_cycles
      }

```

#### IC Management Canister: Take canister snapshot

Only the controllers of the given canister can take a snapshot. 
A snapshot will be identified internally by a system-generated opaque `Snapshot_id`.


```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'take_canister_snapshot'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id]
if A.replace_snapshot is not null:
  S.snapshots[A.canister_id].snapshot_id = A.replace_snapshot
else:
  S.snapshots[A.canister_id] = null

New_snapshot = Snapshot {
  snapshot_id = Snapshot_id;
  wasm_state = S.canisters[A.canister_id].wasm_state;
  raw_module = S.canisters[A.canister_id].raw_module;
  chunk_store = S.chunk_store[A.canister_id];
  certified_data = S.certified_data[A.canister_id];
  canister_version = S.canister_version[A.canister_id];
  take_at_timestamp = S.time[A.canister_id];
}
Cycles_reserved = cycles_to_reserve(S, A.canister_id, S.compute_allocation[A.canister_id], S.memory_allocation[A.canister_id], New_snapshot, S.canisters[A.canister_id])
New_balance = S.balances[A.canister_id] - Cycles_used - Cycles_reserved
New_reserved_balance = S.reserved_balances[A.canister_id] + Cycles_reserved
New_reserved_balance ≤ S.reserved_balance_limits[A.canister_id]

liquid_balance(S, A.canister_id) ≥ 0
```

State after  

```html

S' = S with
    snapshots[A.canister_id] = New_snapshot
    balances[A.canister_id] = New_balance
    reserved_balances[A.canister_id] = New_reserved_balance
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin;
        response = Reply (candid({
          id = Snapshot_id;
          taken_at_timestamp = S.time[A.canister_id];
          total_size = memory_usage_snapshot(New_snapshot);
        }));
        refunded_cycles = M.transferred_cycles;
      }

```


#### IC Management Canister: Load canister snapshot


Only the controllers of the given canister can load a snapshot.

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'load_canister_snapshot'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id]
S.snapshots[A.canister_id].snapshot_id = A.snapshot_id

New_state = {
  wasm_state = S.snapshots[A.canister_id].wasm_state;
  raw_module = S.snapshots[A.canister_id].raw_module;
  module = parse_wasm_mod(S.snapshots[A.canister_id].raw_module);
  public_custom_sections = parse_public_custom_sections(S.snapshots[A.canister_id].raw_module);
  private_custom_sections = parse_private_custom_sections(S.snapshots[A.canister_id].raw_module);
}
Cycles_reserved = cycles_to_reserve(S, A.canister_id, S.compute_allocation[A.canister_id], S.memory_allocation[A.canister_id], S.snapshots[A.canister_id], New_state)
New_balance = S.balances[A.canister_id] - Cycles_used - Cycles_reserved
New_reserved_balance = S.reserved_balances[A.canister_id] + Cycles_reserved
New_reserved_balance ≤ S.reserved_balance_limits[A.canister_id]

S.canister_history[A.canister_id] = {
  total_num_changes = N;
  recent_changes = H;
}
New_canister_history = {
  total_num_changes = N + 1;
  recent_changes = H · {
    timestamp_nanos = S.time[A.canister_id];
    canister_version = S.canister_version[A.canister_id] + 1
    origin = change_origin(M.caller, A.sender_canister_version, M.origin);
    details = LoadSnapshot {
      snapshot_id = S.snapshots[A.canister_id].snapshot_id
      canister_version = S.snapshots[A.canister_id].canister_version
      taken_at_timestamp = S.snapshots[A.canister_id].take_at_timestamp
    };
  };
}

liquid_balance(S', A.canister_id) ≥ 0

if S.memory_allocation[A.canister_id] > 0:
  memory_usage_wasm_state(New_state.wasm_state) +
    memory_usage_raw_module(New_state.raw_module) +
    memory_usage_canister_history(New_canister_history) +
    memory_usage_chunk_store(S.chunk_store[A.canister_id]) +
    memory_usage_snapshot(S.snapshots[A.canister_id]) ≤ S.memory_allocation[A.canister_id]

```

State after  

```html

S' = S with
    canisters[A.canister_id] = New_state
    chunk_store[A.canister_id] = S.snapshots[A.canister_id].chunk_store
    certified_data[A.canister_id] = S.snapshots[A.canister_id].certified_data
    balances[A.canister_id] = New_balance
    reserved_balances[A.canister_id] = New_reserved_balance
    canister_history[A.canister_id] = New_canister_history
    canister_version[A.canister_id] = S.canister_version[A.canister_id] + 1
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin;
        response = Reply (candid());
        refunded_cycles = M.transferred_cycles;
      }

```

#### IC Management Canister: List canister snapshots

Only the controllers of the given canister can get a list of the existing snapshots.

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'list_canister_snapshots'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id]

Snapshots = if S.snapshots[A.canister_id] is null then [] else [{
    id = S.snapshots[A.canister_id].snapshot_id;
    taken_at_timestamp = S.snapshots[A.canister_id].taken_at_timestamp;
    total_size = memory_usage_snapshot(S.snapshots[A.canister_id]);
  }]

```

State after

```html

S with
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid(Snapshots))
        refunded_cycles = M.transferred_cycles
      }

```
#### IC Management Canister: Delete canister snapshot

A snapshot may be deleted only by the controllers of the canister for which the snapshot was taken.

```html

S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'delete_canister_snapshot'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id]
S.snapshots[A.canister_id].snapshot_id = A.snapshot_id 

```

State after

```html

S with
    S.snapshots[A.canister_id] = null
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Reply (candid());
        refunded_cycles = M.transferred_cycles
      }

```

#### Callback invocation

When an inter-canister call has been responded to, we can queue the call to the callback.

This "bookkeeping transition" must be immediately followed by the corresponding ["Message execution" transition](#rule-message-execution).

Conditions  

```html

S.messages = Older_messages · ResponseMessage RM · Younger_messages
RM.origin = FromCanister {
    call_context = Ctxt_id
    callback = Callback
  }
not S.call_contexts[Ctxt_id].deleted
S.call_contexts[Ctxt_id].canister ∈ dom(S.balances)

```

State after  

```html

S with
    balances[S.call_contexts[Ctxt_id].canister] =
      S.balances[S.call_contexts[Ctxt_id].canister] + RM.refunded_cycles
    messages =
      Older_messages ·
      FuncMessage {
        call_context = Ctxt_id
        receiver = S.call_contexts[Ctxt_id].canister
        entry_point = Callback Callback RM.response RM.refunded_cycles
        queue = Unordered
      } ·
      Younger_messages

```

If the responded call context does not exist anymore, because the canister has been uninstalled since, the refunded cycles are still added to the canister balance, but no function invocation is enqueued:

Conditions  

```html

S.messages = Older_messages · ResponseMessage RM · Younger_messages
RM.origin = FromCanister {
    call_context = Ctxt_id
    callback = Callback
  }
S.call_contexts[Ctxt_id].deleted
S.call_contexts[Ctxt_id].canister ∈ dom(S.balances)

```

State after  

```html

S with
    balances[S.call_contexts[Ctxt_id].canister] =
      S.balances[S.call_contexts[Ctxt_id].canister] + RM.refunded_cycles + MAX_CYCLES_PER_RESPONSE
    messages = Older_messages · Younger_messages

```

#### Respond to user request

When an ingress method call has been responded to, we can record the response in the list of queries.

Conditions  

```html

S.messages = Older_messages · ResponseMessage RM · Younger_messages
RM.origin = FromUser { request = M }
S.requests[M] = (Processing, ECID)

```

State after  

```html

S with
    messages = Older_messages · Younger_messages
    requests[M] =
      | (Replied R, ECID)        if M.response = Reply R
      | (Rejected (c, R), ECID)  if M.response = Reject (c, R)

```

NB: The refunded cycles, `RM.refunded_cycles` are, by construction, empty.

#### Request clean up

The IC will keep the data for a completed or rejected request around for a certain, implementation defined amount of time, to allow users to poll for the data. After that time, the data of the request will be dropped:

Conditions  

```html

(S.requests[M] = (Replied _, ECID)) or (S.requests[M] = (Rejected _, ECID))

```

State after  

```html

S with
    requests[M] = (Done, ECID)

```

At the same or some later point, the request will be removed from the state of the IC. This must happen no earlier than the ingress expiry time set in the request.

Conditions  

```html

(S.requests[M] = (Replied _, _)) or (S.requests[M] = (Rejected _, _)) or (S.requests[M] = (Done, _))
M.ingress_expiry < S.system_time

```

State after  

```html

S with
    requests[M] = (deleted)

```

#### Canister out of cycles

Once a canister runs out of cycles, its code is uninstalled (cf. [IC Management Canister: Code uninstallation](#rule-uninstall)), the canister changes in the canister history are dropped (their total number is preserved), and the allocations are set to zero (NB: allocations are currently not modeled in the formal model):

Conditions  

```html

S.balances[CanisterId] = 0
S.reserved_balances[CanisterId] = 0
S.canister_history[CanisterId] = {
  total_num_changes = N;
  recent_changes = H;
}

```

State after  

```html

S with
    canisters[CanisterId] = EmptyCanister
    snapshots[CanisterId] = null
    certified_data[CanisterId] = ""
    canister_history[CanisterId] = {
      total_num_changes = N;
      recent_changes = [];
    }
    canister_logs[CanisterId] = []
    canister_version[CanisterId] = S.canister_version[CanisterId] + 1
    global_timer[CanisterId] = 0

    messages = S.messages ·
      [ ResponseMessage {
          origin = Ctxt.origin
          response = Reject (CANISTER_REJECT, <implementation-specific>)
          refunded_cycles = Ctxt.available_cycles
        }
      | Ctxt_id ↦ Ctxt ∈ S.call_contexts
      , Ctxt.canister = CanisterId
      , Ctxt.needs_to_respond = true
      ]

    for Ctxt_id ↦ Ctxt ∈ S.call_contexts:
      if Ctxt.canister = CanisterId:
        call_contexts[Ctxt_id].deleted := true
        call_contexts[Ctxt_id].needs_to_respond := false
        call_contexts[Ctxt_id].available_cycles := 0

```

#### Time progressing, cycle consumption, and canister version increments

Time progresses. Abstractly, it does so independently for each canister, and in unspecified intervals.

Conditions  

```html

T0 = S.time[CanisterId]
T1 > T0

```

State after  

```html

S with
    time[CanisterId] = T1

```

The canister cycle balances similarly deplete at an unspecified rate, but stay non-negative.
If the canister has a positive reserved balance, then the reserved balance depletes before the main balance:

Conditions  

```html
R0 = S.reserved_balances[CanisterId]
0 ≤ R1 < R0

```

State after

```html

S with
    reserved_balances[CanisterId] = R1

```

Once the reserved balance reaches zero, then the main balance starts depleting:

Conditions

```html
S.reserved_balances[CanisterId] = 0
B0 = S.balances[CanisterId]
0 ≤ B1 < B0

```

State after  

```html

S with
    balances[CanisterId] = B1

```

Similarly, the system time, used to expire requests, progresses:

Conditions  

```html

T0 = S.system_time
T1 > T0

```

State after  

```html

S with
    system_time = T1

```

Finally, the canister version can be incremented arbitrarily:

Conditions  

```html

N0 = S.canister_version[CanisterId]
N1 > N0

```

State after  

```html

S with
    canister_version[CanisterId] = N1

```

#### Trimming canister history

The list of canister changes can be trimmed, but the total number of recorded canister changes cannot be altered. At least 20 changes are guaranteed to remain in the list of changes.

Conditions  

```html

S.canister_history[CanisterId] = {
    total_num_changes = N;
    recent_changes = Older_changes · Newer_changes;
  }
|Newer_changes| ≥ 20

```

State after  

```html

S with
    canister_history[CanisterId] = {
      total_num_changes = N;
      recent_changes = Newer_changes;
    }

```

#### Trimming canister logs

Canister logs can be trimmed if their total length exceeds 4KiB.

Conditions

```html

S.canister_logs[CanisterId] = Older_logs · Newer_logs
SUM { |l| | l <- Older_logs } > 4KiB

```

State after

```html

S with
    canister_logs[CanisterId] = Newer_logs

```

#### IC Management Canister: Canister logs (query call) {#ic-mgmt-canister-fetch-canister-logs}

:::note

The canister logs management canister API is considered EXPERIMENTAL. Canister developers must be aware that the API may evolve in a non-backward-compatible way.

:::

This section specifies management canister query calls.
They are calls to `/api/v2/canister/<effective_canister_id>/query`
with CBOR body `Q` such that `Q.canister_id = ic_principal`.

The management canister offers the method `fetch_canister_logs`
that can be called as a query call and
returns logs of a requested canister.

Conditions

```html

Q.canister_id = ic_principal
Q.method_name = 'fetch_canister_logs'
Q.arg = candid(A)
A.canister_id = effective_canister_id
(S[A.canister_id].canister_log_visibility = Public)
  or
  (S[A.canister_id].canister_log_visibility = Controllers and Q.sender in S[A.canister_id].controllers)
  or
  (S[A.canister_id].canister_log_visibility = AllowedViewers Principals and (Q.sender in S[A.canister_id].controllers or Q.sender in Principals))

```

Query response `R`:

```html

{status: "replied"; reply: {arg: candid(S.canister_logs[A.canister_id])}, signatures: Sigs}

```

where the query `Q`, the response `R`, and a certificate `Cert'` that is obtained by requesting the path `/subnet` in a **separate** read state request to `/api/v2/canister/<effective_canister_id>/read_state` satisfy the following:

```html

verify_response(Q, R, Cert') ∧ lookup(["time"], Cert') = Found S.system_time // or "recent enough"

```

#### Query call {#query-call}

This section specifies query calls `Q` whose `Q.canister_id` is a non-empty canister `S.canisters[Q.canister_id]`. Query calls to the management canister, i.e., `Q.canister_id = ic_principal`, are specified in Section [Canister logs](#ic-mgmt-canister-fetch-canister-logs).

Canister query calls to `/api/v2/canister/<ECID>/query` can be executed directly. They can only be executed against non-empty canisters which have a status of `Running` and are also not frozen.

In query and composite query methods evaluated on the target canister of the query call, a certificate is provided to the canister that is valid, contains a current state tree (or "recent enough"; the specification is currently vague about how old the certificate may be), and reveals the canister's [Certified Data](#system-api-certified-data).

:::note

Composite query methods are EXPERIMENTAL and there might be breaking changes of their behavior in the future. Use at your own risk!

:::

Composite query methods can call query methods and composite query methods up to a maximum depth `MAX_CALL_DEPTH_COMPOSITE_QUERY` of the call graph. The total amount of cycles consumed by executing a (composite) query method and all (transitive) calls it makes must be at most `MAX_CYCLES_PER_QUERY`. This limit applies in addition to the limit `MAX_CYCLES_PER_MESSAGE` for executing a single (composite) query method and `MAX_CYCLES_PER_RESPONSE` for executing a single callback of a (composite) query method.

We define an auxiliary method that handles calls from composite query methods by performing a call graph traversal. It can also be (trivially) invoked for query methods that do not make further calls.
```
composite_query_helper(S, Cycles, Depth, Root_canister_id, Caller, Canister_id, Method_name, Arg) =
  let Mod = S.canisters[Canister_id].module
  let Cert <- { Cert | verify_cert(Cert) and
                       lookup(["canister", Canister_id, "certified_data"], Cert) = Found S.certified_data[Canister_id] and
                       lookup(["time"], Cert) = Found S.system_time // or "recent enough"
              }
  if Canister_id ≠ Root_canister_id
  then
    Cert := NoCertificate // no certificate available in query and composite query methods evaluated on canisters other than the target canister of the query call
  let Env = { time = S.time[Canister_id];
              controllers = S.controllers[Canister_id];
              global_timer = S.global_timer[Canister_id];
              balance = S.balances[Canister_id];
              reserved_balance = S.reserved_balances[Canister_id];
              reserved_balance_limit = S.reserved_balance_limits[Canister_id];
              compute_allocation = S.compute_allocation[Canister_id];
              memory_allocation = S.memory_allocation[Canister_id];
              memory_usage_raw_module = memory_usage_raw_module(S.canisters[Canister_id].raw_module);
              memory_usage_canister_history = memory_usage_canister_history(S.canister_history[Canister_id]);
              memory_usage_chunk_store = memory_usage_chunk_store(S.chunk_store[Canister_id]);
              memory_usage_snapshot = memory_usage_snapshot(S.snapshots[Canister_id]);
              freezing_threshold = S.freezing_threshold[Canister_id];
              subnet_size = S.canister_subnet[Canister_id].subnet_size;
              certificate = Cert;
              status = simple_status(S.canister_status[Canister_id]);
              canister_version = S.canister_version[Canister_id];
            }
  if S.canisters[Canister_id] ≠ EmptyCanister and
     S.canister_status[Canister_id] = Running and
     (Method_name ∈ dom(Mod.query_methods) or Method_name ∈ dom(Mod.composite_query_methods)) and
     Cycles >= MAX_CYCLES_PER_MESSAGE
  then
     let W = S.canisters[Canister_id].wasm_state
     let F = if Method_name ∈ dom(Mod.query_methods) then Mod.query_methods[Method_name] else Mod.composite_query_methods[Method_name]
     if liquid_balance(S, Canister_id) < 0
     then
       Return (Reject (SYS_TRANSIENT, <implementation-specific>), Cycles, S)
     let R = F(Arg, Caller, Env)(W)
     if R = Trap trap
     then Return (Reject (CANISTER_ERROR, <implementation-specific>), Cycles - trap.cycles_used, S)
     else if R = Return {new_state = W'; new_calls = Calls; response = Response; cycles_used = Cycles_used}
     then
        W := W'
        if Cycles_used > MAX_CYCLES_PER_MESSAGE
        then
           Return (Reject (CANISTER_ERROR, <implementation-specific>), Cycles - MAX_CYCLES_PER_MESSAGE, S) // single message execution out of cycles
        Cycles := Cycles - Cycles_used
        if Response = NoResponse
        then
           while Calls ≠ []
           do
              if Depth = MAX_CALL_DEPTH_COMPOSITE_QUERY
              then
                 Return (Reject (CANISTER_ERROR, <implementation-specific>), Cycles, S) // max call graph depth exceeded
              let Calls' · Call · Calls''  = Calls
              Calls := Calls' · Calls''
              if S.canister_subnet[Canister_id].subnet_id ≠ S.canister_subnet[Call.callee].subnet_id
              then
                 Return (Reject (CANISTER_ERROR, <implementation-specific>), Cycles, S) // calling to another subnet
              let (Response', Cycles', S') = composite_query_helper(S, Cycles, Depth + 1, Root_canister_id, Canister_id, Call.callee, Call.method_name, Call.arg)
              Cycles := Cycles'
              S := S'
              if Cycles < MAX_CYCLES_PER_RESPONSE
              then
                 Return (Reject (CANISTER_ERROR, <implementation-specific>), Cycles, S) // composite query out of cycles
              Env.Cert = NoCertificate // no certificate available in composite query callbacks
              let F' = Mod.composite_callbacks(Call.callback, Response', Env)
              let R'' = F'(W')
              if R'' = Trap trap''
              then Return (Reject (CANISTER_ERROR, <implementation-specific>), Cycles - trap''.cycles_used, S)
              else if R'' = Return {new_state = W''; new_calls = Calls''; response = Response''; cycles_used = Cycles_used''}
              then
                 W := W''
                 if Cycles_used'' > MAX_CYCLES_PER_RESPONSE
                 then
                    Return (Reject (CANISTER_ERROR, <implementation-specific>), Cycles - MAX_CYCLES_PER_RESPONSE, S) // single message execution out of cycles
                 Cycles := Cycles - Cycles_used''
                 if Response'' = NoResponse
                 then
                    Calls := Calls'' · Calls
                 else
                    Return (Response'', Cycles, S)
           Return (Reject (CANISTER_ERROR, <implementation-specific>), Cycles, S) // canister did not respond
        else
           Return (Response, Cycles, S)
  else
     Return (Reject (CANISTER_ERROR, <implementation-specific>), Cycles, S)
```

Submitted request  
`E`

Conditions  

```html

E.content = CanisterQuery Q
Q.canister_id ∈ verify_envelope(E, Q.sender, S.system_time)
|Q.nonce| <= 32
is_effective_canister_id(E.content, ECID)
S.system_time <= Q.ingress_expiry or Q.sender = anonymous_id

```

Query response `R`:

-   if `composite_query_helper(S, MAX_CYCLES_PER_QUERY, 0, Q.canister_id, Q.sender, Q.canister_id, Q.method_name, Q.arg) = (Reject (RejectCode, RejectMsg), _, S')` then
    ```
    {status: "rejected"; reject_code: RejectCode; reject_message: RejectMsg; error_code: <implementation-specific>, signatures: Sigs}
    ```

-   Else if `composite_query_helper(S, MAX_CYCLES_PER_QUERY, 0, Q.canister_id, Q.sender, Q.canister_id, Q.method_name, Q.arg) = (Reply Res, _, S')` then
    ```
    {status: "replied"; reply: {arg: Res}, signatures: Sigs}
    ```

where the query `Q`, the response `R`, and a certificate `Cert'` that is obtained by requesting the path `/subnet` in a **separate** read state request to `/api/v2/canister/<effective_canister_id>/read_state` satisfy the following:

```html

verify_response(Q, R, Cert') ∧ lookup(["time"], Cert') = Found S.system_time // or "recent enough"

```

State after

```html

S' with
    query_stats[Q.receiver] = S'.query_stats[Q.receiver] · {
        timestamp = S'.time[Q.receiver]
        num_instructions = <implementation-specific>
        request_payload_bytes = |Q.Arg|
        response_payload_bytes =
          if R.status = "rejected" then |R.reject_message|
          else |R.reply.arg|
    }

```

#### Certified state reads

:::note

Requesting paths with the prefix `/subnet` at `/api/v2/canister/<effective_canister_id>/read_state` might be deprecated in the future. Hence, users might want to point their requests for paths with the prefix `/subnet` to `/api/v2/subnet/<subnet_id>/read_state`.

On the IC mainnet, the root subnet ID `tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe` can be used to retrieve the list of all IC mainnet's subnets by requesting the prefix `/subnet` at `/api/v2/subnet/tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe/read_state`.

:::

The user can read elements of the *state tree*, using a `read_state` request to `/api/v2/canister/<ECID>/read_state` or `/api/v2/subnet/<subnet_id>/read_state`.

Submitted request to `/api/v2/canister/<ECID>/read_state`
`E`

Conditions  

```html

E.content = ReadState RS
TS = verify_envelope(E, RS.sender, S.system_time)
|E.content.nonce| <= 32
S.system_time <= RS.ingress_expiry or RS.sender = anonymous_id
∀ path ∈ RS.paths. may_read_path_for_canister(S, R.sender, path)
∀ (["request_status", Rid] · _) ∈ RS.paths.  ∀ R ∈ dom(S.requests). hash_of_map(R) = Rid => R.canister_id ∈ TS

```

Read response  
A record with

-   `{certificate: C}`

The predicate `may_read_path_for_canister` is defined as follows, implementing the access control outlined in [Request: Read state](#http-read-state):
```
may_read_path_for_canister(S, _, ["time"]) = True
may_read_path_for_canister(S, _, ["subnet"]) = True
may_read_path_for_canister(S, _, ["subnet", sid]) = True
may_read_path_for_canister(S, _, ["subnet", sid, "public_key"]) = True
may_read_path_for_canister(S, _, ["subnet", sid, "canister_ranges"]) = True
may_read_path_for_canister(S, _, ["subnet", sid, "node"]) = True
may_read_path_for_canister(S, _, ["subnet", sid, "node", nid]) = True
may_read_path_for_canister(S, _, ["subnet", sid, "node", nid, "public_key"]) = True
may_read_path_for_canister(S, _, ["request_status", Rid]) =
may_read_path_for_canister(S, _, ["request_status", Rid, "status"]) =
may_read_path_for_canister(S, _, ["request_status", Rid, "reply"]) =
may_read_path_for_canister(S, _, ["request_status", Rid, "reject_code"]) =
may_read_path_for_canister(S, _, ["request_status", Rid, "reject_message"]) =
may_read_path_for_canister(S, _, ["request_status", Rid, "error_code"]) =
  ∀ (R ↦ (_, ECID')) ∈ dom(S.requests). hash_of_map(R) = Rid => RS.sender == R.sender ∧ ECID == ECID'
may_read_path_for_canister(S, _, ["canister", cid, "module_hash"]) = cid == ECID
may_read_path_for_canister(S, _, ["canister", cid, "controllers"]) = cid == ECID
may_read_path_for_canister(S, _, ["canister", cid, "metadata", name]) = cid == ECID ∧ UTF8(name) ∧
  (cid ∉ dom(S.canisters[cid]) ∨
   S.canisters[cid] = EmptyCanister ∨
   name ∉ (dom(S.canisters[cid].public_custom_sections) ∪ dom(S.canisters[cid].private_custom_sections)) ∨
   name ∈ dom(S.canisters[cid].public_custom_sections) ∨
   (name ∈ dom(S.canisters[cid].private_custom_sections) ∧ RS.sender ∈ S.controllers[cid])
  )
may_read_path_for_canister(S, _, _) = False
```

where `UTF8(name)` holds if `name` is encoded in UTF-8.

Submitted request to `/api/v2/subnet/<subnet_id>/read_state`
`E`

Conditions  

```html

E.content = ReadState RS
TS = verify_envelope(E, RS.sender, S.system_time)
|E.content.nonce| <= 32
S.system_time <= RS.ingress_expiry
∀ path ∈ RS.paths. may_read_path_for_subnet(S, RS.sender, path)

```

Read response  
A record with

-   `{certificate: C}`


The predicate `may_read_path_for_subnet` is defined as follows, implementing the access control outlined in [Request: Read state](#http-read-state):
```
may_read_path_for_subnet(S, _, ["time"]) = True
may_read_path_for_subnet(S, _, ["subnet"]) = True
may_read_path_for_subnet(S, _, ["subnet", sid]) = True
may_read_path_for_subnet(S, _, ["subnet", sid, "public_key"]) = True
may_read_path_for_subnet(S, _, ["subnet", sid, "canister_ranges"]) = True
may_read_path_for_subnet(S, _, ["subnet", sid, "metrics"]) = sid == subnet_id
may_read_path_for_subnet(S, _, ["subnet", sid, "node"]) = True
may_read_path_for_subnet(S, _, ["subnet", sid, "node", nid]) = True
may_read_path_for_subnet(S, _, ["subnet", sid, "node", nid, "public_key"]) = True
may_read_path_for_subnet(S, _, _) = False
```
The response is a certificate `cert`, as specified in [Certification](#certification), which passes `verify_cert` (assuming `S.root_key` as the root of trust), and where for every `path` documented in [The system state tree](#state-tree) that has a path in `RS.paths` or `["time"]` as a prefix, we have
```
lookup_in_tree(path, cert.tree) = lookup_in_tree(path, state_tree(S))
```
where `state_tree` constructs a labeled tree from the IC state `S` and the (so far underspecified) set of subnets `subnets`, as per [The system state tree](#state-tree)
```
state_tree(S) = {
  "time": S.system_time;
  "subnet": { subnet_id : { "public_key" : subnet_pk; "canister_ranges" : subnet_ranges; "metrics" : <implementation-specific>; "node": { node_id : { "public_key" : node_pk } | (node_id, node_pk) ∈ subnet_nodes } } | (subnet_id, subnet_pk, subnet_ranges, subnet_nodes) ∈ subnets };
  "request_status": { request_id(R): request_status_tree(T) | (R ↦ (T, _)) ∈ S.requests };
  "canister":
    { canister_id :
        { "module_hash" : SHA256(C.raw_module) | if C ≠ EmptyCanister } ∪
        { "controllers" : CBOR(S.controllers[canister_id]) } ∪
        { "metadata": { name: blob | (name, blob) ∈ S.canisters[canister_id].public_custom_sections ∪ S.canisters[canister_id].private_custom_sections } }
    | (canister_id, C) ∈ S.canisters };
}

request_status_tree(Received) =
  { "status": "received" }
request_status_tree(Processing) =
  { "status": "processing" }
request_status_tree(Rejected (code, msg)) =
  { "status": "rejected"; "reject_code": code; "reject_message": msg; "error_code": <implementation-specific>}
request_status_tree(Replied arg) =
  { "status": "replied"; "reply": arg }
request_status_tree(Done) =
  { "status": "done" }
```

and where `lookup_in_tree` is a function that returns `Found v` for a value `v`, `Absent`, or `Error`, appropriately. See the Section [Lookup](#lookup) for more details.

### Abstract Canisters to System API {#concrete-canisters}

In Section [Abstract canisters](#abstract-canisters) we introduced an abstraction over the interface to a canister, to avoid cluttering the abstract specification of the Internet Computer from WebAssembly details. In this section, we will fill the gap and explain how the abstract canister interface maps to the [concrete System API](#system-api) and the WebAssembly concepts as defined in the [WebAssembly specification](https://webassembly.github.io/spec/core/index.html).

#### The concrete `WasmState`

The abstract `WasmState` above models the WebAssembly *store* `S`, which encompasses the functions, tables, memories and globals of the WebAssembly program, plus additional data maintained by the IC, such as the stable memory:
```
WasmState = {
  store : S; // a store as per WebAssembly spec
  self_id : CanId;
  stable_mem : Blob
}
```
As explained in Section "[WebAssembly module requirements](#system-api-module)", the WebAssembly module imports at most *one* memory and at most *one* table; in the following, *the* memory (resp. table) and the fields `mem` and `table` of `S` refer to that. Any system call that accesses the memory (resp. table) will trap if the module does not import the memory (resp. table).

We model `mem` as an array of bytes, and `table` as an array of execution functions.

The abstract `Callback` type above models an entry point for responses:
```
Closure = {
    fun   : i32,
    env   : i32,
}
Callback = {
  on_reply : Closure;
  on_reject : Closure;
  on_cleanup : Closure | NoClosure;
}
```

#### The execution state

We can model the execution of WebAssembly functions as stateful functions that have access to the WebAssembly store. In order to also model the behavior of the system imports, which have access to additional data structures, we extend the state as follows:
```
Params = {
  arg : NoArg | Blob;
  caller : Principal;
  reject_code : 0 | SYS_FATAL | SYS_TRANSIENT | …;
  reject_message : Text;
  sysenv : Env;
  cycles_refunded : Nat;
  method_name : NoText | Text;
}
ExecutionState = {
  wasm_state : WasmState;
  params : Params;
  response : NoResponse | Response;
  cycles_accepted : Nat;
  cycles_available : Nat;
  cycles_used : Nat;
  balance : Nat;
  reply_params : { arg : Blob };
  pending_call : MethodCall | NoPendingCall;
  calls : List MethodCall;
  new_certified_data : NoCertifiedData | Blob;
  new_global_timer : NoGlobalTimer | Nat;
  ingress_filter : Accept | Reject;
  context : I | G | U | Q | CQ | Ry | Rt | CRy | CRt | C | CC | F | T | s;
}
```

This allows us to model WebAssembly functions, including host-provided imports, as functions with implicit mutable access to an `ExecutionState`, dubbed *execution functions*. Syntactically, we express this using an implicit argument of type `ref ExecutionState` in angle brackets (e.g. `func<es>(x)` for the invocation of a WebAssembly function with type `(x : i32) -> ()`). The lifetime of the `ExecutionState` data structure is that of one such function invocation.

:::warning

It is nonsensical to pass to an execution function a WebAssembly store `S` that comes from a different WebAssembly module than one defining the function.

:::

The "liquid" balance of a canister with a given `ExecutionState` can be obtained as follows:
```
liquid_balance(es) =
  liquid_balance(
    es.balance,
    es.params.sysenv.reserved_balance,
    freezing_limit(
      es.params.sysenv.compute_allocation,
      es.params.sysenv.memory_allocation,
      es.params.sysenv.freezing_threshold,
      memory_usage_wasm_state(es.wasm_state) +
        es.params.sysenv.memory_usage_raw_module +
        es.params.sysenv.memory_usage_canister_history +
        es.params.sysenv.memory_usage_chunk_store +
        es.params.sysenv.memory_usage_snapshot,
      es.params.sysenv.subnet_size,
    )
  )
```

-   For more convenience when creating a new `ExecutionState`, we define the following partial records:
    ```
    empty_params = {
      arg = NoArg;
      caller = ic_principal;
      reject_code = 0;
      reject_message = "";
      sysenv = (undefined);
      cycles_refunded = 0;
      method_name = NoText;
    }
    empty_execution_state = {
      wasm_state = (undefined);
      params = (undefined);
      response = NoResponse;
      cycles_accepted = 0;
      cycles_available = 0;
      cycles_used = 0;
      balance = 0;
      reply_params = { arg = "" };
      pending_call = NoPendingCall;
      calls = [];
      new_certified_data = NoCertifiedData;
      new_global_timer = NoGlobalTimer;
      ingress_filter = Reject;
      context = (undefined);
    }
    ```

#### The concrete `CanisterModule`

Finally, we can specify the abstract `CanisterModule` that models a concrete WebAssembly module.

-   The `initial_wasm_store` mentioned below is the store of the WebAssembly module after *instantiation* (as per WebAssembly spec) of the WebAssembly module contained in the [canister module](#canister-module-format), before executing a potential `(start)` function.

-   We define a helper function
    ```
    start : (WasmState) -> Trap { cycles_used : Nat; } | Return {
        new_state : WasmState;
        cycles_used : Nat;
      }
    ```

    modelling execution of a potential `(start)` function.

    If the WebAssembly module does not export a function called under the name `start`, then
    ```
    start = λ (wasm_state) →
      Return {
        new_state = wasm_state;
        cycles_used = 0;
      }
    ```

    Otherwise, if the WebAssembly module exports a function `func` under the name `start`, it is
    ```
    start = λ (wasm_state) →
      let es = ref {empty_execution_state with
        wasm_state = wasm_state;
        context = s;
      }
      try func<es>() with Trap then Trap {cycles_used = es.cycles_used;}
      Return {
        new_state = es.wasm_state;
        cycles_used = es.cycles_used;
      }
    ```

    Note that `params` are undefined in the `(start)` function's execution state which is fine because the System API does not have access to that part of the execution state during the execution of the `(start)` function.

-   The `init` field of the `CanisterModule` is defined as follows:

    If the WebAssembly module does not export a function called under the name `canister_init`, then
    ```
    init = λ (self_id, arg, caller, sysenv) →
      match start({store = initial_wasm_store; self_id = self_id; stable_mem = ""}) with
        Trap trap → Trap trap
        Return res → Return {
            new_state = res.wasm_state;
            new_certified_data = NoCertifiedData;
            new_global_timer = NoGlobalTimer;
            cycles_used = res.cycles_used;
          }
    ```

    Otherwise, if the WebAssembly module exports a function `func` under the name `canister_init`, it is
    ```
    init = λ (self_id, arg, caller, sysenv) →
      match start({store = initial_wasm_store; self_id = self_id; stable_mem = ""}) with
        Trap trap → Trap trap
        Return res →
          let es = ref {empty_execution_state with
              wasm_state = res.wasm_state
              params = empty_params with {
                  arg = arg;
                  caller = caller;
                  sysenv = sysenv with {
                      balance = sysenv.balance - res.cycles_used
                    }
                }
              balance = sysenv.balance - res.cycles_used
              context = I
            }
          try func<es>() with Trap then Trap {cycles_used = res.cycles_used + es.cycles_used;}
          Return {
              new_state = es.wasm_state;
              new_certified_data = es.new_certified_data;
              new_global_timer = es.new_global_timer;
              cycles_used = res.cycles_used + es.cycles_used;
            }
    ```

-   The `pre_upgrade` field of the `CanisterModule` is defined as follows:

    If the WebAssembly module does not export a function called under the name `canister_pre_upgrade`, then it simply returns the current state:
    ```
    pre_upgrade = λ (old_state, caller, sysenv) → Return {new_state = old_state; new_certified_data = NoCertifiedData; cycles_used = 0;}
    ```

    Otherwise, if the WebAssembly module exports a function `func` under the name `canister_pre_upgrade`, it is
    ```
    pre_upgrade = λ (old_state, caller, sysenv) →
      let es = ref {empty_execution_state with
          wasm_state = old_state
          params = empty_params with { caller = caller; sysenv }
          balance = sysenv.balance
          context = G
        }
      try func<es>() with Trap then Trap {cycles_used = es.cycles_used;}
      Return {
        new_state = es.wasm_state;
        new_certified_data = es.new_certified_data;
        cycles_used = es.cycles_used;
      }
    ```

-   The `post_upgrade` field of the `CanisterModule` is defined as follows:

    If the WebAssembly module does not export a function called under the name `canister_post_upgrade`, then
    ```
    post_upgrade = λ (wasm_state, arg, caller, sysenv) →
      match start(wasm_state) with
        Trap trap → Trap trap
        Return res → Return {
            new_state = res.wasm_state;
            new_certified_data = NoCertifiedData;
            new_global_timer = NoGlobalTimer;
            cycles_used = res.cycles_used;
          }
    ```

    Otherwise, if the WebAssembly module exports a function `func` under the name `canister_post_upgrade`, it is
    ```
    post_upgrade = λ (wasm_state, arg, caller, sysenv) →
      match start(wasm_state) with
        Trap trap → Trap trap
        Return res →
          let es = ref {empty_execution_state with
              wasm_state = res.wasm_state
              params = empty_params with {
                  arg = arg;
                  caller = caller;
                  sysenv = sysenv with {
                      balance = sysenv.balance - res.cycles_used
                    }
                }
              balance = sysenv.balance - res.cycles_used
              context = I
            }
          try func<es>() with Trap then Trap {cycles_used = res.cycles_used + es.cycles_used;}
          Return {
              new_state = es.wasm_state;
              new_certified_data = es.new_certified_data;
              new_global_timer = es.new_global_timer;
              cycles_used = res.cycles_used + es.cycles_used;
            }
    ```

-   The partial map `update_methods` of the `CanisterModule` is defined for all method names `method` for which the WebAssembly program exports a function `func` named `canister_update <method>`, and has value
    ```
    update_methods[method] = λ (arg, caller, sysenv, available) → λ wasm_state →
      let es = ref {empty_execution_state with
          wasm_state = wasm_state;
          params = empty_params with { arg = arg; caller = caller; sysenv }
          balance = sysenv.balance
          cycles_available = available;
          context = U
        }
      try func<es>() with Trap then Trap {cycles_used = es.cycles_used;}
      discard_pending_call<es>()
      Return {
        new_state = es.wasm_state;
        new_calls = es.calls;
        new_certified_data = es.new_certified_data;
        new_global_timer = es.new_global_timer;
        response = es.response;
        cycles_accepted = es.cycles_accepted;
        cycles_used = es.cycles_used;
      }
    ```

-   The partial map `query_methods` of the `CanisterModule` is defined for all method names `method` for which the WebAssembly program exports a function `func` named `canister_query <method>`, and has value
    ```
    query_methods[method] = λ (arg, caller, sysenv) → λ wasm_state →
      let es = ref {empty_execution_state with
          wasm_state = wasm_state;
          params = empty_params with { arg = arg; caller = caller; sysenv }
          balance = sysenv.balance
          context = Q
        }
      try func<es>() with Trap then Trap {cycles_used = es.cycles_used;}
      Return {
        response = es.response;
        cycles_used = es.cycles_used;
      }
    ```

    By construction, the (possibly modified) `es.wasm_state` is discarded.

-   The partial map `composite_query_methods` of the `CanisterModule` is defined for all method names `method` for which the WebAssembly program exports a function `func` named `canister_composite_query <method>`, and has value
    ```
    composite_query_methods[method] = λ (arg, caller, sysenv) → λ wasm_state →
      let es = ref {empty_execution_state with
          wasm_state = wasm_state;
          params = empty_params with { arg = arg; caller = caller; sysenv }
          balance = sysenv.balance
          context = CQ
        }
      try func<es>() with Trap then Trap {cycles_used = es.cycles_used;}
      discard_pending_call<es>()
      Return {
        new_state = es.wasm_state;
        new_calls = es.calls;
        response = es.response;
        cycles_used = es.cycles_used;
      }
    ```

-   The function `heartbeat` of the `CanisterModule` is defined if the WebAssembly program exports a function `func` named `canister_heartbeat`, and has value
    ```
    heartbeat = λ (sysenv) → λ wasm_state →
      let es = ref {empty_execution_state with
        wasm_state = wasm_state;
        params = empty_params with { arg = NoArg; caller = ic_principal; sysenv }
        balance = sysenv.balance
        context = T
      }
      try func<es>() with Trap then Trap {cycles_used = es.cycles_used;}
      discard_pending_call<es>()
      Return {
        new_state = es.wasm_state;
        new_calls = es.calls;
        new_certified_data = es.certified_data;
        new_global_timer = es.new_global_timer;
        cycles_used = es.cycles_used;
      }
    ```

    otherwise it is

```html

heartbeat = λ (sysenv) → λ wasm_state → Trap {cycles_used = 0;}

```

-   The function `global_timer` of the `CanisterModule` is defined if the WebAssembly program exports a function `func` named `canister_global_timer`, and has value
    ```
    global_timer = λ (sysenv) → λ wasm_state →
      let es = ref {empty_execution_state with
        wasm_state = wasm_state;
        params = empty_params with { arg = NoArg; caller = ic_principal; sysenv }
        balance = sysenv.balance
        context = T
      }
      try func<es>() with Trap then Trap {cycles_used = es.cycles_used;}
      discard_pending_call<es>()
      Return {
        new_state = es.wasm_state;
        new_calls = es.calls;
        new_certified_data = es.certified_data;
        new_global_timer = es.new_global_timer;
        cycles_used = es.cycles_used;
      }
    ```

    otherwise it is

```html

global_timer = λ (sysenv) → λ wasm_state → Trap {cycles_used = 0;}

```

-   The function `callbacks` of the `CanisterModule` is defined as follows
    ```
    callbacks = λ(callbacks, response, refunded_cycles, sysenv, available) → λ wasm_state →
      let params0 = empty_params with {
        sysenv
        cycles_refunded = refund_cycles;
      }
      let (fun, env, params, context) = match response with
        Reply data ->
          (callbacks.on_reply.fun, callbacks.on_reply.env,
            { params0 with data}, Ry)
        Reject (reject_code, reject_message)->
          (callbacks.on_reject.fun, callbacks.on_reject.env,
            { params0 with reject_code; reject_message}, Rt)
      let es = ref {empty_execution_state with
        wasm_state = wasm_state;
        params = params;
        balance = sysenv.balance;
        cycles_available = available;
        context = context;
      }
      try
        if fun > |es.wasm_state.store.table| then Trap
        let func = es.wasm_state.store.table[fun]
        if typeof(func) ≠ func (i32) -> () then Trap

            func<es>(env)
            discard_pending_call<es>()
            Return {
              new_state = es.wasm_state;
              new_calls = es.calls;
              new_certified_data = es.certified_data;
              new_global_timer = es.new_global_timer;
              response = es.response;
              cycles_accepted = es.cycles_accepted;
              cycles_used = es.cycles_used;
            }
          with Trap
            if callbacks.on_cleanup = NoClosure then Trap {cycles_used = es.cycles_used;}
            if callbacks.on_cleanup.fun > |es.wasm_state.store.table| then Trap {cycles_used = es.cycles_used;}
            let func = es.wasm_state.store.table[callbacks.on_cleanup.fun]
            if typeof(func) ≠ func (i32) -> () then Trap {cycles_used = es.cycles_used;}

        let es' = ref { empty_execution_state with
          wasm_state = wasm_state;
          context = C;
        }
        try func<es'>(callbacks.on_cleanup.env) with Trap then Trap {cycles_used = es.cycles_used + es'.cycles_used;}
        Return {
          new_state = es'.wasm_state;
          new_calls = [];
          new_certified_data = NoCertifiedData;
          new_global_timer = es'.new_global_timer;
          response = NoResponse;
          cycles_accepted = 0;
          cycles_used = es.cycles_used + es'.cycles_used;
        }
    ```

    Note that if the initial callback handler traps, the cleanup callback (if present) is executed, and the canister has the chance to update its state.

-   The function `composite_callbacks` of the `CanisterModule` is defined as follows
    ```
    composite_callbacks = λ(callbacks, response, sysenv) → λ wasm_state →
      let params0 = empty_params with {
        sysenv
      }
      let (fun, env, params, context) = match response with
        Reply data ->
          (callbacks.on_reply.fun, callbacks.on_reply.env,
            { params0 with data}, CRy)
        Reject (reject_code, reject_message)->
          (callbacks.on_reject.fun, callbacks.on_reject.env,
            { params0 with reject_code; reject_message}, CRt)
      let es = ref {empty_execution_state with
        wasm_state = wasm_state;
        params = params;
        balance = sysenv.balance;
        context = context;
      }
      try
        if fun > |es.wasm_state.store.table| then Trap
        let func = es.wasm_state.store.table[fun]
        if typeof(func) ≠ func (i32) -> () then Trap

            func<es>(env)
            discard_pending_call<es>()
            Return {
              new_state = es.wasm_state;
              new_calls = es.calls;
              response = es.response;
              cycles_used = es.cycles_used;
            }
          with Trap
            if callbacks.on_cleanup = NoClosure then Trap {cycles_used = es.cycles_used;}
            if callbacks.on_cleanup.fun > |es.wasm_state.store.table| then Trap {cycles_used = es.cycles_used;}
            let func = es.wasm_state.store.table[callbacks.on_cleanup.fun]
            if typeof(func) ≠ func (i32) -> () then Trap {cycles_used = es.cycles_used;}

        let es' = ref { empty_execution_state with
          wasm_state = wasm_state;
          context = CC;
        }
        try func<es'>(callbacks.on_cleanup.env) with Trap then Trap {cycles_used = es.cycles_used + es'.cycles_used;}
        Return {
          new_state = es'.wasm_state;
          new_calls = [];
          response = NoResponse;
          cycles_used = es.cycles_used + es'.cycles_used;
        }
    ```

    Note that if the initial callback handler traps, the cleanup callback (if present) is executed.

-   The `inspect_message` field of the `CanisterModule` is defined as follows.

    If the WebAssembly module does not export a function called under the name `canister_inspect_message`, then access is always granted:
    ```
    inspect_message = λ (method_name, wasm_state, arg, caller, sysenv) →
      Return {status = Accept;}
    ```

    Otherwise, if the WebAssembly module exports a function `func` under the name `canister_inspect_message`, it is
    ```
    inspect_message = λ (method_name, wasm_state, arg, caller, sysenv) →
      let es = ref {empty_execution_state with
          wasm_state = wasm_state;
          params = empty_params with {
            arg = arg;
            caller = caller;
            method_name = method_name;
            sysenv
          }
          balance = sysenv.balance;
          cycles_available = 0; // ingress requests have no funds
          context = F;
        }
       try func<es>() with Trap then Trap
       Return {status = es.ingress_filter;};
    ```

#### Helper functions

In the following section, we use the these helper functions
```
copy_to_canister<es>(dst : i32, offset : i32, size : i32, data : blob) =
  if offset+size > |data| then Trap {cycles_used = es.cycles_used;}
  if dst+size > |es.wasm_state.store.mem| then Trap {cycles_used = es.cycles_used;}
  es.wasm_state.store.mem[dst..dst+size] := data[offset..offset+size]

copy_from_canister<es>(src : i32, size : i32) blob =
  if src+size > |es.wasm_state.store.mem| then Trap {cycles_used = es.cycles_used;}
  return es.wasm_state.store.mem[src..src+size]
```

Cycles are represented by 128-bit values so they require 16 bytes of memory.
```
copy_cycles_to_canister<es>(dst : i32, data : blob) =
 let size = 16;
 if dst+size > |es.wasm_state.store.mem| then Trap {cycles_used = es.cycles_used;}
  es.wasm_state.store.mem[dst..dst+size] := data[0..size]
```

#### System imports

Upon *instantiation* of the WebAssembly module, we can provide the following functions as imports.

The pseudo-code below does *not* explicitly enforce the restrictions of which imports are available in which contexts; for that the table in [Overview of imports](#system-api-imports) is authoritative, and is assumed to be part of the implementation.
```
ic0.msg_arg_data_size<es>() : i32 =
  if es.context ∉ {I, U, RQ, NRQ, CQ, Ry, CRy, F} then Trap {cycles_used = es.cycles_used;}
  return |es.params.arg|

ic0.msg_arg_data_copy<es>(dst:i32, offset:i32, size:i32) =
  if es.context ∉ {I, U, RQ, NRQ, CQ, Ry, CRy, F} then Trap {cycles_used = es.cycles_used;}
  copy_to_canister<es>(dst, offset, size, es.params.arg)

ic0.msg_caller_size() : i32 =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  return |es.params.caller|

ic0.msg_caller_copy(dst:i32, offset:i32, size:i32) : i32 =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  copy_to_canister<es>(dst, offset, size, es.params.caller)

ic0.msg_reject_code<es>() : i32 =
  if es.context ∉ {Ry, Rt, CRy, CRt} then Trap {cycles_used = es.cycles_used;}
  es.params.reject_code

ic0.msg_reject_msg_size<es>() : i32 =
  if es.context ∉ {Rt, CRt} then Trap {cycles_used = es.cycles_used;}
  return |es.params.reject_msg|

ic0.msg_reject_msg_copy<es>(dst:i32, offset:i32, size:i32) : i32 =
  if es.context ∉ {Rt, CRt} then Trap {cycles_used = es.cycles_used;}
  copy_to_canister<es>(dst, offset, size, es.params.reject_msg)

ic0.msg_reply_data_append<es>(src : i32, size : i32) =
  if es.context ∉ {U, RQ, NRQ, CQ, Ry, Rt, CRy, CRt} then Trap {cycles_used = es.cycles_used;}
  if es.response ≠ NoResponse then Trap {cycles_used = es.cycles_used;}
  es.reply_params.arg := es.reply_params.arg · copy_from_canister<es>(src, size)

ic0.msg_reply<es>() =
  if es.context ∉ {U, RQ, NRQ, CQ, Ry, Rt, CRy, CRt} then Trap {cycles_used = es.cycles_used;}
  if es.response ≠ NoResponse then Trap {cycles_used = es.cycles_used;}
  es.response := Reply (es.reply_params.arg)
  es.cycles_available := 0

ic0.msg_reject<es>(src : i32, size : i32) =
  if es.context ∉ {U, RQ, NRQ, CQ, Ry, Rt, CRy, CRt} then Trap {cycles_used = es.cycles_used;}
  if es.response ≠ NoResponse then Trap {cycles_used = es.cycles_used;}
  es.response := Reject (CANISTER_REJECT, copy_from_canister<es>(src, size))
  es.cycles_available := 0

ic0.msg_cycles_available<es>() : i64 =
  if es.context ∉ {U, Rt, Ry} then Trap {cycles_used = es.cycles_used;}
  if es.cycles_available >= 2^64 then Trap {cycles_used = es.cycles_used;}
  return es.cycles_available

ic0.msg_cycles_available128<es>(dst : i32) =
  if es.context ∉ {U, Rt, Ry} then Trap {cycles_used = es.cycles_used;}
  let amount = es.cycles_available
  copy_cycles_to_canister<es>(dst, amount.to_little_endian_bytes())

ic0.msg_cycles_refunded<es>() : i64 =
  if es.context ∉ {Rt, Ry} then Trap {cycles_used = es.cycles_used;}
  if es.params.cycles_refunded >= 2^64 then Trap {cycles_used = es.cycles_used;}
  return es.params.cycles_refunded

ic0.msg_cycles_refunded128<es>(dst : i32) =
  if es.context ∉ {Rt, Ry} then Trap {cycles_used = es.cycles_used;}
  let amount = es.params.cycles_refunded
  copy_cycles_to_canister<es>(dst, amount.to_little_endian_bytes())

ic0.msg_cycles_accept<es>(max_amount : i64) : i64 =
  if es.context ∉ {U, Rt, Ry} then Trap {cycles_used = es.cycles_used;}
  let amount = min(max_amount, es.cycles_available)
  es.cycles_available := es.cycles_available - amount
  es.cycles_accepted := es.cycles_accepted + amount
  es.balance := es.balance + amount
  return amount

ic0.msg_cycles_accept128<es>(max_amount_high : i64, max_amount_low : i64, dst : i32) =
  if es.context ∉ {U, Rt, Ry} then Trap {cycles_used = es.cycles_used;}
  let max_amount = max_amount_high * 2^64 + max_amount_low
  let amount = min(max_amount, es.cycles_available)
  es.cycles_available := es.cycles_available - amount
  es.cycles_accepted := es.cycles_accepted + amount
  es.balance := es.balance + amount
  copy_cycles_to_canister<es>(dst, amount.to_little_endian_bytes())

ic0.cycles_burn128<es>(amount_high : i64, amount_low : i64, dst : i32) =
  if es.context ∉ {I, G, U, Ry, Rt, C, T} then Trap {cycles_used = es.cycles_used;}
  let amount = amount_high * 2^64 + amount_low
  let burned_amount = min(amount, liquid_balance(es))
  es.balance := es.balance - burned_amount
  copy_cycles_to_canister<es>(dst, burned_amount.to_little_endian_bytes())

ic0.canister_self_size<es>() : i32 =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  return |es.wasm_state.self_id|

ic0.canister_self_copy<es>(dst:i32, offset:i32, size:i32) =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  copy_to_canister<es>(dst, offset, size, es.wasm_state.self_id)

ic0.canister_cycle_balance<es>() : i64 =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  if es.balance >= 2^64 then Trap {cycles_used = es.cycles_used;}
  return es.balance

ic0.canister_cycles_balance128<es>(dst : i32) =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  let amount = es.balance
  copy_cycles_to_canister<es>(dst, amount.to_little_endian_bytes())

ic0.canister_status<es>() : i32 =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  match es.params.sysenv.canister_status with
    Running  -> return 1
    Stopping -> return 2
    Stopped  -> return 3

ic0.canister_version<es>() : i64 =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  return es.params.sysenv.canister_version

ic0.msg_method_name_size<es>() : i32 =
  if es.context ∉ {F} then Trap {cycles_used = es.cycles_used;}
  return |es.method_name|

ic0.msg_method_name_copy<es>(dst : i32, offset : i32, size : i32) : i32 =
  if es.context ∉ {F} then Trap {cycles_used = es.cycles_used;}
  copy_to_canister<es>(dst, offset, size, es.params.method_name)

ic0.accept_message<es>() =
  if es.context ∉ {F} then Trap {cycles_used = es.cycles_used;}
  if es.ingress_filter = Accept then Trap {cycles_used = es.cycles_used;}
  es.ingress_filter = Accept

ic0.call_new<es>(
    callee_src  : i32,
    callee_size : i32,
    name_src    : i32,
    name_size   : i32,
    reply_fun   : i32,
    reply_env   : i32,
    reject_fun  : i32,
    reject_env  : i32,
  ) =
  if es.context ∉ {U, CQ, Ry, Rt, CRy, CRt, T} then Trap {cycles_used = es.cycles_used;}

  discard_pending_call<es>()

  callee := copy_from_canister<es>(callee_src, callee_size);
  method_name := copy_from_canister<es>(name_src, name_size);

  es.pending_call = MethodCall {
    callee = callee;
    method_name = callee;
    arg = "";
    transferred_cycles = 0;
    callback = Callback {
      on_reply = Closure { fun = reply_fun; env = reply_env }
      on_reject = Closure { fun = reject_fun; env = reject_env }
      on_cleanup = NoClosure
    };
  }

ic0.call_on_cleanup<es> (fun : i32, env : i32) =
  if es.context ∉ {U, CQ, Ry, Rt, CRy, CRt, T} then Trap {cycles_used = es.cycles_used;}
  if es.pending_call = NoPendingCall then Trap {cycles_used = es.cycles_used;}
  if es.pending_call.callback.on_cleanup ≠ NoClosure then Trap {cycles_used = es.cycles_used;}
  es.pending_call.callback.on_cleanup := Closure { fun = fun; env = env}

ic0.call_data_append<es> (src : i32, size : i32) =
  if es.context ∉ {U, CQ, Ry, Rt, CRy, CRt, T} then Trap {cycles_used = es.cycles_used;}
  if es.pending_call = NoPendingCall then Trap {cycles_used = es.cycles_used;}
  es.pending_call.arg := es.pending_call.arg · copy_from_canister<es>(src, size)

ic0.call_cycles_add<es>(amount : i64) =
  if es.context ∉ {U, Ry, Rt, T} then Trap {cycles_used = es.cycles_used;}
  if es.pending_call = NoPendingCall then Trap {cycles_used = es.cycles_used;}
  if liquid_balance(es) < amount then Trap {cycles_used = es.cycles_used;}

  es.balance := es.balance - amount
  es.pending_call.transferred_cycles := es.pending_call.transferred_cycles + amount

ic0.call_cycles_add128<es>(amount_high : i64, amount_low : i64) =
  if es.context ∉ {U, Ry, Rt, T} then Trap {cycles_used = es.cycles_used;}
  if es.pending_call = NoPendingCall then Trap {cycles_used = es.cycles_used;}
  let amount = amount_high * 2^64 + amount_low
  if liquid_balance(es) < amount then Trap {cycles_used = es.cycles_used;}

  es.balance := es.balance - amount
  es.pending_call.transferred_cycles := es.pending_call.transferred_cycles + amount

ic0.call_peform<es>() : ( err_code : i32 ) =
  if es.context ∉ {U, CQ, Ry, Rt, CRy, CRt, T} then Trap {cycles_used = es.cycles_used;}
  if es.pending_call = NoPendingCall then Trap {cycles_used = es.cycles_used;}

  // `system_cannot_do_this_call_now` abstracts over resource issues preventing the call from being made
  if liquid_balance(es) < MAX_CYCLES_PER_RESPONSE or system_cannot_do_this_call_now()
  then
    discard_pending_call<es>()
    return <implementation-specific>
  or
    es.balance := es.balance - MAX_CYCLES_PER_RESPONSE
    es.calls := es.calls · es.pending_call
    es.pending_call := NoPendingCall
    return 0

// helper function
discard_pending_call<es>() =
  if es.pending_call ≠ NoPendingCall then
    es.balance := es.balance + es.pending_call.transferred_cycles
    es.pending_call := NoPendingCall

ic0.stable_size<es>() : (page_count : i32) =
  if |es.wasm_state.store.mem| > 2^32 then Trap {cycles_used = es.cycles_used;}
  page_count := |es.wasm_state.stable_mem| / 64k
  return page_count

ic0.stable_grow<es>(new_pages : i32) : (old_page_count : i32) =
  if |es.wasm_state.store.mem| > 2^32 then Trap {cycles_used = es.cycles_used;}
  if arbitrary() then return -1
  else
    old_size := |es.wasm_state.stable_mem| / 64k
    if old_size + new_pages > 2^16 then return -1
    es.wasm_state.stable_mem :=
      es.wasm_state.stable_mem · repeat(0x00, new_pages * 64k)
    return old_size

ic0.stable_write<es>(offset : i32, src : i32, size : i32)
  if |es.wasm_state.store.mem| > 2^32 then Trap {cycles_used = es.cycles_used;}
  if src+size > |es.wasm_state.store.mem| then Trap {cycles_used = es.cycles_used;}
  if offset+size > |es.wasm_state.stable_mem| then Trap {cycles_used = es.cycles_used;}

  es.wasm_state.stable_mem[offset..offset+size] := es.wasm_state.store.mem[src..src+size]

ic0.stable_read<es>(dst : i32, offset : i32, size : i32)
  if |es.wasm_state.store.mem| > 2^32 then Trap {cycles_used = es.cycles_used;}
  if offset+size > |es.wasm_state.stable_mem| then Trap {cycles_used = es.cycles_used;}
  if dst+size > |es.wasm_state.store.mem| then Trap {cycles_used = es.cycles_used;}

  es.wasm_state.store.mem[offset..offset+size] := es.wasm_state.stable.mem[src..src+size]

ic0.stable64_size<es>() : (page_count : i64) =
  return |es.wasm_state.stable_mem| / 64k

ic0.stable64_grow<es>(new_pages : i64) : (old_page_count : i64) =
  if arbitrary()
  then return -1
  else
    old_size := |es.wasm_state.stable_mem| / 64k
    es.wasm_state.stable_mem :=
      es.wasm_state.stable_mem · repeat(0x00, new_pages * 64k)
    return old_size

ic0.stable64_write<es>(offset : i64, src : i64, size : i64)
  if src+size > |es.wasm_state.store.mem| then Trap {cycles_used = es.cycles_used;}
  if offset+size > |es.wasm_state.stable_mem| then Trap {cycles_used = es.cycles_used;}

  es.wasm_state.stable_mem[offset..offset+size] := es.wasm_state.store.mem[src..src+size]

ic0.stable64_read<es>(dst : i64, offset : i64, size : i64)
  if offset+size > |es.wasm_state.stable_mem| then Trap {cycles_used = es.cycles_used;}
  if dst+size > |es.wasm_state.store.mem| then Trap {cycles_used = es.cycles_used;}

  es.wasm_state.store.mem[offset..offset+size] := es.wasm_state.stable.mem[src..src+size]

ic0.certified_data_set<es>(src: i32, size: i32) =
  if es.context ∉ {I, G, U, Ry, Rt, T} then Trap {cycles_used = es.cycles_used;}
  es.new_certified_data := es.wasm_state[src..src+size]

ic0.data_certificate_present<es>() : i32 =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  if es.params.sysenv.certificate = NoCertificate
  then return 0
  else return 1

ic0.data_certificate_size<es>() : i32 =
  if es.context ∉ {NRQ, CQ} then Trap {cycles_used = es.cycles_used;}
  if es.params.sysenv.certificate = NoCertificate then Trap {cycles_used = es.cycles_used;}
  return |es.params.sysenv.certificate|

ic0.data_certificate_copy<es>(dst: i32, offset: i32, size: i32) =
  if es.context ∉ {NRQ, CQ} then Trap {cycles_used = es.cycles_used;}
  if es.params.sysenv.certificate = NoCertificate then Trap {cycles_used = es.cycles_used;}
  copy_to_canister<es>(dst, offset, size, es.params.sysenv.certificate)

ic0.time<es>() : i32 =
  if es.context = s then Trap {cycles_used = es.cycles_used;}
  return es.params.sysenv.time

ic0.global_timer_set<es>(timestamp: i64) : i64 =
  if es.context ∉ {I, G, U, Ry, Rt, C, T} then Trap {cycles_used = es.cycles_used;}
  let prev_global_timer = es.new_global_timer
  es.new_global_timer := timestamp
  if prev_global_timer = NoGlobalTimer
  then return es.params.sysenv.global_timer
  else return prev_global_timer

ic0.canister_limit<es>(limit_type : i32) : i64 =
  arbitrary()

ic0.performance_counter<es>(counter_type : i32) : i64 =
  arbitrary()

ic0.is_controller<es>(src: i32, size: i32) : (result: i32) =
  bytes = copy_from_canister<es>(src, size)
  if bytes encode a principal then
    if bytes ∉ es.params.sysenv.controllers
    then return 0
    else return 1
  else
    Trap {cycles_used = es.cycles_used;}

ic0.in_replicated_execution<es>() : i32 =
  if es.params.sysenv.certificate = NoCertificate
  then return 1
  else return 0

ic0.debug_print<es>(src : i32, size : i32) =
  return

ic0.trap<es>(src : i32, size : i32) =
  Trap {cycles_used = es.cycles_used;}
```
<Changelog/>
