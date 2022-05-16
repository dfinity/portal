import Changelog from './_attachments/interface-spec-changelog.md'

# The Internet Computer Interface Specification {#_the_internet_computer_interface_specification}

:::note
You are looking at the `master` version of the document! If you are looking for implementation specification or documentation, look at one of the versions at <https://docs.dfinity.systems/public/v/>.
:::

## Introduction {#_introduction}

Welcome to *the Internet Computer*! We speak of "the" Internet Computer, because although under the hood a large number of physical computers are working together in a blockchain protocol, in the end we have the appearance of a single, shared, secure and world-wide accessible computer. Developers who want to build decentralized applications (or *dapps* for short) that run on the Internet Computer blockchain and end-users who want to use those dapps need to know very little, if anything, about the underlying protocol. However, knowing some details about the interfaces that the Internet Computer exposes can allow interested developers and architects to take fuller advantages of the unique features that the Internet Computer provides.

### Target audience {#_target_audience}

This document describes this *external* view of the Internet Computer, i.e. the low-level interfaces it provides to dapp developers and users, and what will happen when they use these interfaces.

:::note
While this document describes the external interface and behavior of the Internet Computer, it is not intended as end-user or end-developer documentation. Most developers will interact with the Internet Computer through additional tooling like the SDK, Canister Development Kits and Motoko. Please see <https://sdk.dfinity.org/> for suitable documentation.
:::

The target audience of this document are

-   those who use these low-level interfaces (e.g. implement agents, canister developments kits, emulators, other tooling).

-   those who implement these low-level interfaces (e.g. developers of the Internet Computer implementation)

-   those who want to understand the intricacies of the Internet Computer's behavior in great detail (e.g. to do a security analysis)

:::note
This document is a rigorous, technically dense reference. It is not an introduction to the Internet Computer, and as such most useful to those who understand the high-level concepts. Please see more high-level documentation first.
:::

### Scope of this document {#_scope_of_this_document}

If you think of the Internet Computer as a distributed engine that executes WebAssembly-based dapps, then this document describes exclusively the aspect of executing those dapps. To the extent possible, this document will *not* talk about consensus protocols, nodes, subnets, orthogonal persistence or governance.

This document tries to be implementation agnostic: It would apply just as well to a (hypothetical) compatible reimplementation of the Internet Computer. This implies that this document does not cover interfaces towards those running the Internet Computer (e.g. data center operators, protocol developers, governance users), as topics like node update, monitoring, logging are inherently tied to the actual *implementation* and its architecture.

### Overview of the Internet Computer {#_overview_of_the_internet_computer}

Dapps on the Internet Computer, or *IC* for short, are implemented as *canisters*. If you want to build on the Internet Computer as a dapp developer, you first create a *canister module* that contains the WebAssembly code and configuration for your dapp, and deploy it using the [HTTPS interface](#https-interface). You can create canister modules using the Motoko language and the SDK, which is more convenient. If you want to use your own tooling, however, then this document describes [what a canister module looks like](#canister-module-format) and how the [WebAssembly code can interact with the IC](#system-api).

Once your dapp is running on the Internet Computer, it is a canister, and users can interact with it. They can use the [HTTPS interface](#https-interface) to interact with the canister according to the [System API](#system-api).

The user can also use the HTTPS interface to issue read-only queries, which are faster, but cannot change the state of a canister.


**A typical use of the Internet Computer. (This is a simplified view; some of the arrows represent multiple interaction steps or polling.)**

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
    User -> IC : /submit call “hello”
    IC -> Can1 : hello
    return "Hello world!"
    User <-- IC : "Hello World!"
```

Sections “[HTTPS Interface](#https-interface)” and “[Canister interface (System API)](#system-api)” describe these interfaces, together with a brief description of what they do. Afterwards, you will find a [more formal description](#abstract-behavior) of the Internet Computer that describes its abstract behavior with more rigor.

### Nomenclature {#_nomenclature}

To get some consistency in this document, we try to use the following terms with precision:

We avoid the term "client", as it could be the client of the Internet Computer or the client inside the distributed network that makes up the Internet Computer. Instead, we use the term *user* to denote the external entity interacting with the Internet Computer, even if in most cases it will be some code (sometimes called "agent") acting on behalf of a (human) user.

The public entry points of canisters are called *methods*. Methods can be declared to be either *update methods* (state mutation is preserved) or *query methods* (state mutation is discarded, no further calls can be made).

Methods can be *called*, from *caller* to *callee*, and will eventually incur a *response* which is either a *reply* or a *reject*. A method may have *parameters*, which are provided with concrete *arguments* in a method call.

External calls can be update calls, which can call both kinds of methods, and query calls, which can *only* call query methods. Inter-canister calls can also call both kinds of methods. Note that calls from a canister to itself also count as \"inter-canister\".

Internally, a call or a response is transmitted as a *message* from a *sender* to a *receiver*. Messages do not have a response.

WebAssembly *functions* are exported by the WebAssembly module or provided by the System API. These are *invoked* and can either *trap* or *return*, possibly with a return value. Functions, too, have parameters and take arguments.

External *users* interact with the Internet Computer by issuing *requests* on the HTTPS interface. Requests have responses which can either be replies or rejects. Some requests cause internal messages to be created.

Canisters and users are identified by a *principal*, sometimes also called an *id*.

## Pervasive concepts {#_pervasive_concepts}

Before going into the details of the four public interfaces described in this document (namely the agent-facing [HTTPS interface](#https-interface), the canister-facing [System API](#system-api), the [virtual Management canister](#the-ic-management-canister) and the [System State Tree](#the-system-state-tree)), this section introduces some concepts that transcend multiple interfaces.

### Unspecified constants and limits {#_unspecified_constants_and_limits}

This specification may refer to certain constants and limits without specifying their concrete value (yet), i.e. they are implementation defined. Many are resource limits which are relevant only to specify the error-handling behavior of the IC (which, as mentioned above, is also not yet precisely described in this document). This list is not complete.

-   `MAX_CYCLES_PER_MESSAGE`

    Amount of cycles that a canister has to have before a message is attempted to be executed, which is deducted from the canister balance before message execution. See [Message execution](#rule-message-execution).

-   `MAX_CYCLES_PER_RESPONSE`

    Amount of cycles that the IC sets aside when a canister performs a call. This is used to pay for processing the response message, and unused cycles after the execution of the response are refunded. See [Message execution](#rule-message-execution).

-   `DEFAULT_PROVISIONAL_CYCLES_BALANCE`

    Amount of cycles allocated to a new canister by default, if not explicitly specified. See [IC method ](#icmethod-provisional_create_canister_with_cycles).

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

When the IC creates a *fresh* id, it never creates a self-authenticating id, an anonymous id or an id derived from what could be a canister or user.

#### Textual representation of principals {#textual-ids}

:::note
This textual representation does not actually show up in the interface (which always deals with blobs), so it is merely a recommended convention.
:::

We specify a *canonical textual format* that is recommended whenever principals need to be printed or read in textual format, e.g. in log messages, transactions browser, command line tools, source code.

The textual representation of a blob `b` is `Grouped(Base32(CRC32(b) · b))` where

-   `CRC32` is a four byte check sequence, calculated as defined by ISO 3309, ITU-T V.42 and [elsewhere](https://www.w3.org/TR/2003/REC-PNG-20031110/#5CRC-algorithm)

-   `Base32` is the Base32 encoding as defined in [RFC 4648](https://tools.ietf.org/html/rfc4648#section-6), with no padding character added.

-   The middle dot denotes concatenation.

-   `Grouped` takes an ASCII string and inserts the separator `-` (dash) every 5 characters. The last group may contain less than 5 characters. A separator never appears at the beginning or end.

The textual representation is conventionally printed with *lower case letters*, but parsed case-insensitively.

Because the maximum size of a principal is 29 bytes, the textual representation will be no longer than 63 characters (10 times 5 plus 3 characters with 10 separators in between them).

:::tip
The canister with id `0xABCD01` has check sequence `0x233FF206` ([online calculator](https://crccalc.com/?crc=ABCD01&method=crc32&datatype=hex&outtype=hex)); the final id is thus `em77e-bvlzu-aq`.

Example encoding from hex, and decoding to hex, in bash (the following can be pasted into a terminal as is):

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
:::

### Canister lifecycle

Dapps on the Internet Computer are called *canisters*. Conceptually, they consist of the following pieces of state:

-   A canister id (a [principal](#principal))

-   Their *controllers* (a possibly empty list of [principal](#principal))

-   A cycle balance

-   The *canister status*, which is one of `running`, `stopping` or `stopped`.

-   Resource reservations

A canister can be *empty* (e.g. directly after creation) or *non-empty*. A non-empty canister also has

-   code, in the form of a canister module

-   state (memories, globals etc.)

-   possibly further data that is specific to the implementation of the IC (e.g. queues)

Canisters are empty after creation and uninstallation, and become non-empty through [code installation](#ic-install_code).

If an empty canister receives a response, that response is dropped, as if the canister trapped when processing the response. The cycles set aside for its processing and the cycles carried on the responses are added to the canister's *cycles* balance.

#### Canister cycles

The IC relies on *cycles*, a utility token, to manage its resources. A canister pays for the resources it uses from its *cycle balance*. The *cycle_balance* is stored as 128-bit unsigned integers and operations on them are saturating. In particular, if *cycles* are added to a canister that would bring its total balance beyond 2\^128-1, then the balance will be capped at 2\^128-1 and any additional cycles will be lost.

When the cycle balance of a canister falls to zero, the canister is *deallocated*. This has the same effect as

-   uninstalling the canister (as described in [IC method ](#ic-uninstall_code))

-   setting all resource reservations to zero

Afterwards the canister is empty. It can be reinstalled after topping up its balance.

:::note
Once the IC frees the resources of a canister, its id, *cycles* balance, and *controllers* are preserved on the IC for a minimum of 10 years. What happens to the canister after this period is currently unspecified.
:::

#### Canister status

The canister status can be used to control whether the canister is processing calls:

-   In status `running`, calls to the canister are processed as normal.

-   In status `stopping`, calls to the canister are rejected by the IC, but responses to the canister are processed as normal.

-   In status `stopped`, calls to the canister are rejected by the IC, and there are no outstanding responses.

In all cases, calls to the [management canister](#the-ic-management-canister) are processed, regardless of the state of the managed canister.

The controllers of the canister can initiate transitions between these states using [`stop_canister`](#ic-stop_canister) and [`start_canister`](#ic-start_canister), and query the state using [`canister_status`](#ic-canister_status). The canister itself can also query its state using [`ic0.canister_status`](#system-api-canister-status).

NOTE: This status is orthogonal to the question of whether a canister is empty or not: an empty canister can be in status `running`. Calls to such a canister are still rejected, but because the canister is empty.

### Signatures

Digital signature schemes are used for authenticating messages in various parts of the IC infrastructure. Signatures are domain separated, which means that every message is prefixed with a byte string that is unique to the purpose of the signature.

The IC supports multiple signature schemes, with details given in the following subsections. For each scheme, we specify the data encoded in the public key (which is always DER-encoded, and indicates the scheme to use) as well as the form of the signatures (which are opaque blobs for the purposes of the rest of this specification).

In all cases, the signed *payload* is the concatenation of the domain separator and the message. All uses of signatures in this specification indicate a domain separator, to uniquely identify the purpose of the signature. The domain separators are prefix-free by construction, as their first byte indicates their length.

#### Ed25519 and ECDSA signatures {#ecdsa}

Plain signatures are supported for the schemes

-   [**Ed25519**](https://ed25519.cr.yp.to/index.html) or

-   [**ECDSA**](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-4.pdf) on curve P-256 (also known as `secp256r1`), using SHA-256 as hash function, as well as on the Koblitz curve `secp256k1`.

-   Public keys must be valid for signature schemes Ed25519 or ECDSA and are encoded as DER.

    -   See [RFC 8410](https://tools.ietf.org/html/rfc8410) for DER encoding of Ed25519 public keys.

    -   See [RFC 5480](https://tools.ietf.org/rfc/rfc5480) for DER encoding of ECDSA public keys; the DER encoding must not specify a hash function. For curve `secp256k1`, the OID 1.3.132.0.10 is used. The points must be specified in uncompressed form (i.e. `0x04` followed by the big-endian 32-byte encodings of `x` and `y`).

-   The signatures are encoded as the concatenation of the 32-byte big endian encodings of the two values *r* and *s*.

#### Web Authentication {#webauthn}

The allowed signature schemes for web authentication are

-   [**ECDSA**](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-4.pdf) on curve P-256 (also known as `secp256r1`), using SHA-256 as hash function.

-   [**RSA PKCS#1v1.5 (RSASSA-PKCS1-v1_5)**](https://datatracker.ietf.org/doc/html/rfc8017#section-8.2), using SHA-256 as hash function.

The signature is calculated by using the payload as the challenge in the web authentication assertion.

The signature is checked by verifying that the `challenge` field contains the [base64url encoding](https://tools.ietf.org/html/rfc4648#section-5) of the payload, and that `signature` verifies on `authenticatorData · SHA-256(utf8(clientDataJSON))`, as specified in the [WebAuthn w3c recommendation](https://www.w3.org/TR/webauthn/#op-get-assertion).

-   The public key is encoded as a DER-wrapped COSE key.

    It uses the `SubjectPublicKeyInfo` type used for other types of public keys (see, e.g., [RFC 8410, Section 4](https://tools.ietf.org/html/rfc8410#section-4)), with OID 1.3.6.1.4.1.56387.1.1 (iso.org.dod.internet.private.enterprise.dfinity.mechanisms.der-wrapped-cose). The `BIT STRING` field `subjectPublicKey` contains the COSE encoding. See [WebAuthn w3c recommendation](https://www.w3.org/TR/webauthn/#sctn-encoded-credPubKey-examples) or [RFC 8152](https://tools.ietf.org/html/rfc8152#section-13.1) for details on the COSE encoding.

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

-   The signature is a CBOR value consisting of a data item with major type 6 ("Semantic tag") and tag value `55799` (see [Self-Describe CBOR](https://tools.ietf.org/html/rfc7049#section-2.4.5)), followed by a map with three mandatory fields:

    -   `authenticator_data` (`blob`): WebAuthn authenticator data.

    -   `client_data_json` (`text`): WebAuthn client data in JSON representation.

    -   `signature` (`blob`): Signature as specified in the [WebAuthn w3c recommendation](https://www.w3.org/TR/webauthn/#signature-attestation-types), which means DER encoding in the case of an ECDSA signature.

#### Canister signatures

The IC also supports a scheme where a canister can sign a payload by declaring a special "certified variable".

This section makes forward references to other concepts in this document, in particular the section [Certification](#certification).

-   The public key is a DER-wrapped structure that indicates the *signing canister*, and includes a freely choosable seed. Each choice of seed yields a distinct public key for the canister, and the canister can choose to encode information, such as a user id, in the seed.

    More concretely, it uses the `SubjectPublicKeyInfo` type used for other types of public keys (see, e.g., [RFC 8410, Section 4](https://tools.ietf.org/html/rfc8410#section-4)), with OID 1.3.6.1.4.1.56387.1.2 (iso.org.dod.internet.private.enterprise.dfinity.mechanisms.canister-signature).

    The `BIT STRING` field `subjectPublicKey` is the blob `|signing_canister_id| · signing_canister_id · seed`, where `|signing_canister_id|` is the one-byte encoding of the the length of the `signing_canister_id` and `·` denotes blob concatenation.

-   The signature is a CBOR value consisting of a data item with major type 6 ("Semantic tag") and tag value `55799` (see [Self-Describe CBOR](https://tools.ietf.org/html/rfc7049#section-2.4.5)), followed by a map with two mandatory fields:

    -   `certificate` (`blob`): A CBOR-encoded certificate as per [Encoding of certificates](#certification-encoding).

    -   `tree` (`hash-tree`): A hash tree as per [Encoding of certificates](#certification-encoding).

-   Given a payload together with public key and signature in the format described above the signature can be verified by checking the following two conditions:

    -   The `certificate` must be a valid certificate as described in [Certification](#certification), with

            lookup(/canister/<signing_canister_id>/certified_data, certificate.tree) = Found (reconstruct(tree))

    where `signing_canister_id` is the id of the signing canister and `reconstruct` is a function that computes a root-hash for the tree.

    -   If the `certificate` includes subnet delegations (possibly nested), then the `signing_canister_id` must be included in each delegation's canister id range (see [Delegation](#certification-delegation)).

    -   The `tree` must be a `well_formed` tree with

            lookup(/sig/<s>/<m>, tree) = Found ""

    where `s` is the SHA-256 hash of the `seed` used in the public key and `m` is the SHA-256 hash of the payload.

## The system state tree {#state-tree}

Parts of the IC state are publicly exposed (e.g. via [Request: Read state](#http-read-state) or [Certified data](#system-api-certified-data)) in a verified way (see [Certification](#certification) for the machinery for certifying). This section describes the content of this system state abstractly.

Conceptually, the system state is a tree with labeled children, and values in the leaves. Equivalently, the system state is a mapping from paths (sequences of labels) to values, where the domain is prefix-free.

Labels are always blobs (but often with a human readable representation). In this document, paths are written suggestively with slashes as separators; the actual encoding is not actually using slashes as delimiters, and labels may contain the 0x2F byte (ASCII `/`) just fine. Values are either natural numbers, text values or blob values.

This section specifies the publicly relevant paths in the tree.

### Time {#state-tree-time}

-   `/time` (natural):

    All partial state trees include a timestamp, indicating the time at which the state is current.

### Subnet information {#state-tree-subnet}

The state tree contains information about the topology of the Internet Computer.

-   `/subnet/<subnet_id>/public_key` (blob)

    The public key of the subnet (a DER-encoded BLS key, see [Certification](#certification))

-   `/subnet/<subnet_id>/canister_ranges` (blob)

    The set of canister ids assigned to this subnet, represented as a list of closed intervals of canister ids, ordered lexicographically, and encoded as CBOR according to this CDDL:

        canister_ranges = tagged<[*canister_range]>
        canister_range = [principal principal]
        principal = bytes .size (0..29)
        tagged<t> = #6.55799(t) ; the CBOR tag

    :::note
    Because this uses the lexicographic ordering of princpials, and the byte distinguishing the various classes of ids is at the *end*, this range by construction conceptually includes principals of various classes. This specification needs to take care that the fact that principals that are not canisters may appear in these ranges does not cause confusion.
    :::

### Request status {#state-tree-request-status}

For each asynchronous request known to the Internet Computer, its status is in a subtree at `/request_status/<request_id>`. Please see [Overview of canister calling](#http-call-overview) for more details on how asynchronous requests work.

-   `/request_status/<request_id>/status` (text)

    One of `received`, `processing`, `replied`, `rejected` or `done`, see [Overview of canister calling](#http-call-overview) for more details on what each status means.

-   `/request_status/<request_id>/reply` (blob)

    If the status is `replied`, then this path contains the reply blob, else it is not present.

-   `/request_status/<request_id>/reject_code` (natural)

    If the status is `rejected`, then this path contains the reject code (see [Reject codes](#reject-codes)), else it is not present.

-   `/request_status/<request_id>/reject_message` (text)

    If the status is `rejected`, then this path contains a textual diagnostic message, else it is not present.

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

    If the canister is empty, this path does not exist. If the canister is not empty, it exists and contains the SHA256 hash of the currently installed canister module. Cf. [IC method ](#ic-canister_status).

-   `/canister/<canister_id>/controllers` (blob):

    The current controllers of the canister. The value consists of a CBOR data item with major type 6 ("Semantic tag") and tag value `55799` (see [Self-Describe CBOR](https://tools.ietf.org/html/rfc7049#section-2.4.5)), followed by an array of principals in their binary form (CDDL `#6.55799([* bytes .size (0..29)])`).

-   `/canister/<canister_id>/metadata/<name>` (blob):

    If the canister has a [custom section](https://webassembly.github.io/spec/core/binary/modules.html#custom-section) called `icp:public <name>` or `icp:private <name>`, this path contains the content of the custom section. Otherwise, this path does not exist.

    It is recommended for the canister to have a custom section called \"icp:public candid:service\", which contains the UTF-8 encoding of [the Candid interface](https://github.com/dfinity/candid/blob/master/spec/Candid.md#core-grammar) for the canister.

## HTTPS Interface {#http-interface}

The concrete mechanism that users use to send requests to the Internet Computer is via an HTTPS API, which exposes three endpoints to handle interactions, plus one for diagnostics:

-   At `/api/v2/canister/<effective_canister_id>/call` the user can submit (asynchronous, state-changing) calls.

-   At `/api/v2/canister/<effective_canister_id>/read_state` the user can read various information about the state of the Internet Computer. In particular, they can poll for the status of a call here.

-   At `/api/v2/canister/<effective_canister_id>/query` the user can perform (synchronous, non-state-changing) query calls.

-   At `/api/v2/status` the user can retrieve status information about the Internet Computer.

In these paths, the `<effective_canister_id>` is the [textual representation](#textual-ids) of the [*effective* canister id](#http-effective-canister-id).

Requests to `/api/v2/canister/<effective_canister_id>/call`, `/api/v2/canister/<effective_canister_id>/read_state` and `/api/v2/canister/<effective_canister_id>/query` are POST requests with a CBOR-encoded request body, which consists of a authentication envelope (as per [Authentication](#authentication)) and request-specific content as described below.

:::note
This document does not yet explain how to find the location and port of the Internet Computer.
:::

### Overview of canister calling {#http-call-overview}

Users interact with the Internet Computer by calling canisters. By the very nature of a blockchain protocol, they cannot be acted upon immediately, but only with a delay. Moreover, the actual node that the user talks to may not be honest or, for other reasons, may fail to get the request on the way. This implies the following high-level workflow:

1.  A user submits a call via the [HTTPS Interface](#https-interface). No useful information is returned in the immediate response (as such information cannot be trustworthy anyways).

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

### Request: Call {#http-call}

In order to call a canister, the user makes a POST request to `/api/v2/canister/<effective_canister_id>/call`. The request body consists of an authentication envelope with a `content` map with the following fields:

-   `request_type` (`text`): Always `call`

-   `sender`, `nonce`, `ingress_expiry`: See [Authentication](#authentication)

-   `canister_id` (`blob`): The principal of the canister to call.

-   `method_name` (`text`): Name of the canister method to call

-   `arg` (`blob`): Argument to pass to the canister method

The HTTP response to this request has an empty body and HTTP status 202, or a HTTP error (4xx or 5xx). Paranoid agents should not trust this response, and use [`read_state`](#http-read-state) to determine the status of the call.

This request type can *also* be used to call a query method. A user may choose to go this way, instead of via the faster and cheaper [Request: Query call](#http-query) below, if they want to get a *certified* response.

:::note
The functionality exposed via the [The IC management canister](#ic-management-canister) can be used this way.
:::

### Request: Read state {#http-read-state}

In order to read parts of the [The system state tree](#the-system-state-tree), the user makes a POST request to `/api/v2/canister/<effective_canister_id>/read_state`. The request body consists of an authentication envelope with a `content` map with the following fields:

-   `request_type` (`text`): Always `read_state`

-   `sender`, `nonce`, `ingress_expiry`: See [Authentication](#authentication)

-   `paths` (sequence of paths): A list of paths, where a path is itself a sequence of blobs.

The HTTP response to this request consists of a CBOR map with the following fields:

-   `certificate` (`blob`): A certificate (see [Certification](#certification)).

    If this `certificate` includes subnet delegations (possibly nested), then the `effective_canister_id` must be included in each delegation's canister id range (see [Delegation](#certification-delegation)).

The returned certificate reveals all values whose path is a suffix of the list of requested paths. It also always reveals `/time`, even if not explicitly requested.

All requested paths must have one of the following paths as prefix:

-   `/time`. Can be requested by anyone.

-   `/subnet`. Can be requested by anyone.

-   `/request_status/<request_id>`. Can only be read if `/request_id/<request_id>` is not present in the state tree, or if this `read_state` request was signed by same sender as the original request referenced by `<request_id>`, and the effective canister id of the original request matches the `<effective_canister_id>` (see [Effective canister id](#http-effective-canister-id)) in this HTTP request's path.

-   `/canisters/<canister_id>/module_hash`. Can be requested by anyone, if `<canister_id>` matches `<effective_canister_id>`.

-   `/canisters/<canister_id>/controllers`. Can be requested by anyone, if `<canister_id>` matches `<effective_canister_id>`. The order may vary depending on the implementation.

-   `/canisters/<canister_id>/metadata/<name>`. Can be read by anyone if `<canister_id>` matches `<effective_canister_id>`, and `<name>` is a public custom section. If `<name>` is a private custom section, it can only be read if this `read_state` request was signed by one of the controllers of the canister.

Note that the paths `/canisters/<canister_id>/certified_data` are not accessible with this method; these paths are only exposed to the canister themselves via the System API (see [Certified data](#system-api-certified-data)).

See [The system state tree](#the-system-state-tree) for details on the state tree.

### Request: Query call {#http-query}

A query call is a fast, but less secure way to call a canister. Only methods that are explicitly marked as "query methods" by the canister can be called this way.

In order to make a query call to canister, the user makes a POST request to `/api/v2/canister/<effective_canister_id>/query`. The request body consists of an authentication envelope with a `content` map with the following fields:

-   `request_type` (`text`): Always `query`

-   `sender`, `nonce`, `ingress_expiry`: See [Authentication](#authentication)

-   `canister_id` (`blob`): The principal of the canister to call.

-   `method_name` (`text`): Name of the canister method to call

-   `arg` (`blob`): Argument to pass to the canister method

If the call resulted in a reply, the response is a CBOR map with the following fields:

-   `status` (`text`): `replied`

-   `reply`: a CBOR map with the field `arg` (`blob`) which contains the reply data.

If the call resulted in a reject, the response is a CBOR map with the following fields:

-   `status` (`text`): `rejected`

-   `reject_code` (`nat`): The reject code (see [Reject codes](#reject-codes)).

-   `reject_message` (`text`): a textual diagnostic message.

Canister methods that do not change the canister state can be executed more efficiently. This method provides that ability, and returns the canister's response directly within the HTTP response.

### Effective canister id {#http-effective-canister-id}

The `<effective_canister_id>` in the URL paths of requests is the *effective* destination of the request.

-   If the call is to the Management Canister (`aaaaa-aa`), and the `arg` is Candid-encoded where the first argument is a record with a `canister_id` field of type `principal`, then the effective canister id is that principal.

-   If the call is to the `raw_rand` method of the Management Canister (`aaaaa-aa`), then there is no effective canister id. This implies that this method cannot be called by users, only via canisters.

-   If the call is to the `provisional_create_canister_with_cycles` method of the Management Canister (`aaaaa-aa`), any principal is a valid effective canister id for this call.

    :::note
    The Internet Computer blockchain mainnet does not support `provisional_create_canister_with_cycles`. This means that using an effective canister id that could be an existing canister would lead to the request being routed to a node on the corresponding subnet and produce an error response there, while using an effective canister id that cannot be an existing canister id would cause an error response from the node receiving the request --- either is fine.

    In multi-subnet development instances of the Internet Computer Protocol (e.g. testnets), users with privileged access to `provisional_create_canister_with_cycles` (or possibly similar, internal methods) and knowledge of the mapping from canisters to subnets can use their choice of the effective canister id in the URL to steer the request to a specific subnet.

    In a local canister execution environment, the effective canister id is ignored, and thus `aaaaa-aa` can be used.
    :::

-   Else, the effective canister id must be the `canister_id` in the request.

:::note
The expectation is that user-side agent code shields users and developers from this concept, in analogy to how the System API interface shields canister developers from worrying about routing.
:::

### Authentication

All requests coming in via the HTTPS interface need to be either *anonymous* or *authenticated* using a cryptographic signature. To that end, the following fields are present in the `content` map in all cases:

-   `nonce` (`blob`, optional): Arbitrary user-provided data, typically randomly generated. This can be used to create distinct requests with otherwise identical fields.

-   `ingress_expiry` (`nat`, required): An upper limit on the validity of the request, expressed in nanoseconds since 1970-01-01 (like [ic0.time()](#system-api-time)). This avoids replay attacks: The IC will not accept requests, or transition requests from status `received` to status `processing`, if their expiry date is in the past. The IC may refuse to accept requests with an ingress expiry date too far in the future. This applies to synchronous and asynchronous requests alike (and could have been called `request_expiry`).

-   `sender` (`Principal`, required): The user who issued the request.

The envelope, i.e. the overall request, has the following keys:

-   `content` (`record`): the actual request content

-   `sender_pubkey` (`blob`, optional): Public key used to authenticate this request. Since a user may in the future have more than one key, this field tells the IC which key is used.

-   `sender_delegation` (`array` of maps, optional): a chain of delegations, starting with the one signed by `sender_pubkey` and ending with the one delegating to the key relating to `sender_sig`.

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

    -   `targets` (`array` of `CanisterId`, optional): If this field is set, the delegation only applies for requests sent to the canisters in the list.

    -   `senders` (`array` of `Principal`, optional): If this field is set, the delegation only applies for requests originating from the principals in the list.

-   `signature` (`blob`): Signature on the 32-byte [representation-independent hash](#hash-of-map) of the map contained in the `delegation` field as described in [Signatures](#signatures), using the 27 bytes `\x1Aic-request-auth-delegation` as the domain separator.

    For the first delegation in the array, this signature is created with the key corresponding to the public key from the `sender_pubkey` field, all subsequent delegations are signed with the key corresponding to the public key contained in the preceding delegation.

The `sender_sig` field is calculated by signing the concatenation of the 11 bytes `\x0Aic-request` (the domain separator) and the 32 byte [request id](#request-id) with the secret key that belongs to the key specified in the last delegation or, if no delegations are present, the public key specified in `sender_pubkey`.

The delegation field, if present, must not contain more than four delegations.

### Representation-independent hashing of structured data {#hash-of-map}

Structured data, such as (recursive) maps, are authenticated by signing a representation-independent hash of the data. This hash is computed as follows (using SHA256 in the steps below):

1.  For each field that is present in the map (i.e. omitted optional fields are indeed omitted):

    -   concatenate the hash of the field's name (in ascii-encoding, without terminal `\x00`) and the hash of the value (with the encoding specified below).

2.  Sort these concatenations from low to high

3.  Concatenate the sorted elements, and hash the result.

The resulting hash of 256 bits (32 bytes) is the representation-independent hash.

The following encodings of field values as blobs are used

-   Binary blobs (`canister_id`, `arg`, `nonce`, `module`) are used as-is.

-   Strings (`request_type`, `method_name`) are encoded in UTF-8, without a terminal `\x00`.

-   Natural numbers (`compute_allocation`, `memory_allocation`, `ingress_expiry`) are encoded using the shortest form [Unsigned LEB128](https://en.wikipedia.org/wiki/LEB128#Unsigned_LEB128) encoding. For example, `0` should be encoded as a single zero byte `[0x00]` and `624485` should be encoded as byte sequence `[0xE5, 0x8E, 0x26]`.

-   Arrays (`paths`) are encoded as the concatenation of the hashes of the encodings of the array elements.

-   Maps (`sender_delegation`) are encoded by recursively computing the representation-independent hash.

### Request ids {#request-id}

When signing requests or querying the status of a request (see [Request status](#state-tree-request-status)) in the state tree, the user identifies the request using a *request id*, which is the [representation-independent hash](#hash-of-map) of the `content` map of the original request.

:::note
The request id is independent of the representation of the request (currently only CBOR), and does not change if the specification adds further optional fields to a request type.
:::

:::note
The recommended textual representation of a request id is a hexadecimal string with lower-case letters prefixed with \'0x\'. E.g., request id consisting of bytes `[00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 0A, 0B, 0C, 0D, 0E, 0F, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 1A, 1B, 1C, 1D, 1E, 1F]` should be displayed as `0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`.
:::

:::tip
Example calculation (where `H` denotes SHA-256 and `·` denotes blob concatenation):

    hash_of_map({ request_type: "call", canister_id: 0x00000000000004D2, method_name: "hello", arg: "DIDL\x00\xFD*"})
     = H(concat (sort
       [ H("request_type") · H("call")
       , H("canister_id") · H("\x00\x00\x00\x00\x00\x00\x04\xD2")
       , H("method_name") · H("hello")
       , H("arg") · H("DIDL\x00\xFD*")
       ]))
     = H(concat (sort
       [ 769e6f87bdda39c859642b74ce9763cdd37cb1cd672733e8c54efaa33ab78af9 · 7edb360f06acaef2cc80dba16cf563f199d347db4443da04da0c8173e3f9e4ed
       , 0a3eb2ba16702a387e6321066dd952db7a31f9b5cc92981e0a92dd56802d3df9 · 4d8c47c3c1c837964011441882d745f7e92d10a40cef0520447c63029eafe396
       , 293536232cf9231c86002f4ee293176a0179c002daa9fc24be9bb51acdd642b6 · 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
       , b25f03dedd69be07f356a06fe35c1b0ddc0de77dcd9066c4be0c6bbde14b23ff · 6c0b2ae49718f6995c02ac5700c9c789d7b7862a0d53e6d40a73f1fcd2f70189
       ]))
     = H(concat
       [ 0a3eb2ba16702a387e6321066dd952db7a31f9b5cc92981e0a92dd56802d3df9 · 4d8c47c3c1c837964011441882d745f7e92d10a40cef0520447c63029eafe396
       , 293536232cf9231c86002f4ee293176a0179c002daa9fc24be9bb51acdd642b6 · 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
       , 769e6f87bdda39c859642b74ce9763cdd37cb1cd672733e8c54efaa33ab78af9 · 7edb360f06acaef2cc80dba16cf563f199d347db4443da04da0c8173e3f9e4ed
       , b25f03dedd69be07f356a06fe35c1b0ddc0de77dcd9066c4be0c6bbde14b23ff · 6c0b2ae49718f6995c02ac5700c9c789d7b7862a0d53e6d40a73f1fcd2f70189
       ])
     = 8781291c347db32a9d8c10eb62b710fce5a93be676474c42babc74c51858f94b
:::

### Reject codes

An API request or inter-canister call that is pending in the IC will eventually result in either a *reply* (indicating success, and carrying data) or a *reject* (indicating an error of some sorts). A reject contains a *rejection code* that classifies the error and a hopefully helpful *reject message* string.

Rejection codes are member of the following enumeration:

-   `SYS_FATAL` (1): Fatal system error, retry unlikely to be useful.

-   `SYS_TRANSIENT` (2): Transient system error, retry might be possible.

-   `DESTINATION_INVALID` (3): Invalid destination (e.g. canister/account does not exist)

-   `CANISTER_REJECT` (4): Explicit reject by the canister.

-   []{#CANISTER_ERROR}`CANISTER_ERROR` (5): Canister error (e.g., trap, no response)

The symbolic names of this enumeration are used throughout this specification, but on all interfaces (HTTPS API, System API), they are represented as positive numbers as given in the list above.

The error message is guaranteed to be a string, i.e. not arbitrary binary data.

When canisters explicitly reject a message (see [Public methods](#system-api-requests)), they can specify the reject message, but *not* the reject code; it is always `CANISTER_REJECT`. In this sense, the reject code is trustworthy: If the IC responds with a `SYS_FATAL` reject, then it really was the IC issuing this reject.

### Status endpoint {#api-status}

Additionally, the Internet Computer provides an API endpoint to obtain various status fields at

    /api/v2/status

For this endpoint, the user performs a GET request, and receives a CBOR value with the following fields. The IC may include additional implementation-specific fields.

-   `ic_api_version` (string, mandatory): Identifies the interface version supported, i.e. the version of the present document that the internet computer aims to support, e.g. `0.8.1`. The implementation may also return `unversioned` to indicate that it does *not* comply to a particular version, e.g. in between releases.

-   `impl_source` (string, optional): Identifies the implementation of the Internet Computer Protocol, by convention with the canonical location of the source code (e.g. `https://github.com/dfinity/ic`).

-   `impl_version` (string, optional): If the user is talking to a released version of an Internet Computer Protocol implementation, this is the version number. For non-released versions, output of `git describe` like `0.1.13-13-g2414721` would also be very suitable.

-   `impl_revision` (string, optional): The precise git revision of the Internet Computer Protocol implementation

-   `root_key` (blob, only in development instances): The public key (a DER-encoded BLS key) of the root key of this development instance of the Internet Computer Protocol. This *must* be present in short-lived development instances, to allow the agent to fetch the public key. For the Internet Computer, agents must have an independent trustworthy source for this data, and must not be tempted to fetch it from this insecure location.

See [CBOR encoding of requests and responses](#api-cbor) for details on the precise CBOR encoding of this object.

:::note
Future additions may include local time, geographic location, and other useful implementation-specific information such as blockheight. This data may possibly be signed by the node.
:::

### CBOR encoding of requests and responses {#api-cbor}

Requests and responses are specified here as records with named fields and using suggestive human readable syntax. The actual format in the body of the HTTP request or response, however, is [CBOR](https://en.wikipedia.org/wiki/CBOR).

Concretely, it consists of a data item with major type 6 ("Semantic tag") and tag value `55799` (see [Self-Describe CBOR](https://tools.ietf.org/html/rfc7049#section-2.4.5)), followed by a record.

Requests consist of an envelope record with keys `sender_sig` (a blob), `sender_pubkey` (a blob) and `content` (a record). The first two are metadata that are used for request authentication, while the last one is the actual content of the request.

The following encodings are used:

-   Strings: Major type 3 ("Text string").

-   Blobs: Major type 2 ("Byte string").

-   Nats: Major type 0 ("Unsigned integer") if small enough to fit that type, else the [Bignum](https://tools.ietf.org/html/rfc7049#section-2.4.2) format is used.

-   Records: Major type 5 ("Map of pairs of data items"), followed by the fields, where keys are encoded with major type 3 ("Text string").

-   Arrays: Major type 4 (\"Array of data items\").

As advised by [section "Creating CBOR-Based Protocols"](https://tools.ietf.org/html/rfc7049#section-3) of the CBOR spec, we clarify that:

-   Floating-point numbers may not be used to encode integers.

-   Duplicate keys are prohibited in CBOR maps.

:::tip
A typical request would be (written in [CBOR diagnostic notation](https://tools.ietf.org/html/rfc7049#section-6), which can be checked and converted on [cbor.me](http://cbor.me/)):

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
:::

### CDDL description of requests and responses {#api-cddl}

The [Concise Data Definition Language (CDDL)](https://tools.ietf.org/html/rfc8610) is a data description language for CBOR. This section summarizes the format of the CBOR data passed to and from the entry points described above. This [file](_attachments/requests.cddl) summarizes the format of the CBOR data passed to and from the entry points described above.

### Ordering guarantees {#_ordering_guarantees}

The order in which the various messages between canisters are delivered and executed is not fully specified. The guarantee provided by the IC is that function calls between two canisters are executed in order, so that a canister that requires in-order execution need not wait for the response from an earlier message to a canister before sending a later message to that same canister.

More precisely:

-   Method calls between any *two* canisters are delivered in order, as if they were communicating over a single simple FIFO queue.

-   If a WebAssembly function, within a single invocation, makes multiple calls to the same canister, they are queued in the order of invocations to `ic0.call_perform`.

-   Responses (including replies with `ic0.msg_reply`, explicit rejects with `ic0.msg_reject` and system-generated error responses) do *not* have any ordering guarantee relative to each other or to method calls.

-   There is no particular order guarantee for ingress messages submitted via the HTTPS interface.

### Synchronicity across nodes {#_synchronicity_across_nodes}

This document describes the Internet Computer as having a single global state that can be modified and queried. In reality, it consists of many nodes, which may not be perfectly in sync.

As long as you talk to one (honest) node only, the observed behavior is nicely sequential. If you issue an update (i.e. state-mutating) call to a canister (e.g. bump a counter), and node A indicates that the call has been executed, and you then issue a query call to node A, then A's response is guaranteed to include the effect of the update call (and you will receive the updated counter value).

If you then (quickly) issue a read request to node B, it may be that B responds to your read query based on the old state of the canister (and you might receive the old counter value).

A related problem is that query calls are not certified, and nodes may be dishonest in their response. In that case, the user might want to get more assurance by querying multiple nodes and comparing the result. However, it is (currently) not possible to query a *specific* state.

:::note
Applications can work around these problems. For the first problem, the query result could be such that the user can tell if the update has been received or not. For the second problem, even if using [certified data](#system-api-certified-data) is not possible, if replies are monotonic in some sense the user can get assurance in their intersection (e.g. if the query returns a list of events that grows over time, then even if different nodes return different lists, the user can get assurance in those events that are reported by many nodes).
:::

## Canister module format

A canister module is simply a [WebAssembly module](https://webassembly.github.io/spec/core/index.html) in binary format (typically `.wasm`).

## Canister interface (System API) {#system-api}

The System API is the interface between the running canister and the Internet Computer. It allows the WebAssembly module of a canister to expose functionality to the users (method entry points) and the IC (e.g. initialization), and exposes functionality of the IC to the canister (e.g. calling other canisters). Because WebAssembly is rather low-level, it also explains how to express higher level concepts (e.g. binary blobs).

We want to leverage advanced WebAssembly features, such as WebAssembly host references. But as they are not yet supported by all tools involved, this section describes an initial System API that does not rely on host references. In section [Outlook: Using Host References](#host-references), we outline some of the proposed uses of WebAssembly host references.

### WebAssembly module requirements {#system-api-module}

In order for a WebAssembly module to be usable as the code for the canister, it needs to conform to the following requirements:

-   If it imports a memory, it must import it from `env.memory`. In the following, "the Wasm memory" refers to this memory.

-   If it imports a table, it must import it from `env.table`. In the following, "the Wasm table" refers to this table.

-   It may only import a function if it is listed in [Overview of imports](#system-api-imports).

-   It may have a `(start)` function.

-   If it exports a function called `canister_init`, the function must have type `() -> ()`.

-   If it exports a function called `canister_inspect_message`, the function must have type `() -> ()`.

-   If it exports a function called `canister_heartbeat`, the function must have type `() -> ()`.

-   If it exports any functions called `canister_update <name>` or `canister_query <name>` for some `name`, the functions must have type `() -> ()`.

-   It may not export both `canister_update <name>` and `canister_query <name>` with the same `name`.

-   It may not export other methods the names of which start with the prefix `canister_` besides the methods allowed above.

-   It may not have both `icp:public <name>` and `icp:private <name>` with the same `name` as the custom section name.

-   It may not have other custom sections the names of which start with the prefix `icp:` besides the \`icp:public \` and \`icp:private \`.

-   The IC may reject WebAssembly modules that + declare more than 6000 functions, or + declare more than 200 globals, or + declare more than 16 exported custom sections (the custom section names with prefix `icp:`), or + the total size of the exported custom sections exceeds 1MiB

### Interpretation of numbers {#_interpretation_of_numbers}

WebAssembly number types (`i32`, `i64`) do not indicate if the numbers are to be interpreted as signed or unsigned. Unless noted otherwise, whenever the System API interprets them as numbers (e.g. memory pointers, buffer offsets, array sizes), they are to be interpreted as unsigned.

### Entry points

The canister provides entry points which are invoked by the IC under various circumstances:

-   The canister may export a function with name `canister_init` and type `() -> ()`.

-   The canister may export a function with name `canister_pre_upgrade` and type `() -> ()`.

-   The canister may export a function with name `canister_post_upgrade` and type `() -> ()`.

-   The canister may export functions with name `canister_inspect_message` with type `() -> ()`.

-   The canister may export a function with name `canister_heartbeat` with type `() -> ()`.

-   The canister may export functions with name `canister_update <name>` and type `() -> ()`.

-   The canister may export functions with name `canister_query <name>` and type `() -> ()`.

-   The canister table may contain functions of type `(env : i32) -> ()` which may be used as callbacks for inter-canister calls.

If the execution of any of these entry points traps for any reason, then all changes to the WebAssembly state, as well as the effect of any externally visible system call (like `ic0.msg_reply`, `ic0.msg_reject`, `ic0.call_perform`), are discarded. For upgrades, this transactional behavior applies to the `canister_pre_upgrade`/`canister_post_upgrade` sequence as a whole.

#### Canister initialization {#system-api-init}

If `canister_init` is present, then this is the first exported WebAssembly function invoked by the IC. The argument that was passed along with the canister initialization call (see [IC method ](#ic-install_code)) is available to the canister via `ic0.msg_arg_data_size/copy`.

The IC assumes the canister to be fully instantiated if the `canister_init` method entry point returns. If the `canister_init` method entry point traps, then canister installation has failed, and the canister is reverted to its previous state (i.e. empty with `install`, or whatever it was for a `reinstall`).

#### Canister upgrades {#system-api-upgrades}

When a canister is upgraded to a new WebAssembly module, the IC:

1.  Invokes `canister_pre_upgrade` (if present) on the old instance, to give the canister a chance to clean up (e.g. move data to [stable memory](#system-api-stable-memory)).

2.  Instantiates the new module, including the execution of `(start)`, with a fresh WebAssembly state.

3.  Invokes `canister_post_upgrade` (if present) on the new instance, passing the `arg` provided in the `install_code` call ([IC method ](#ic-install_code)).

The stable memory is preserved throughout the process; any other WebAssembly state is discarded.

During these steps, no other entry point of the old or new canister is invoked. The `canister_init` function of the new canister is *not* invoked.

These steps are atomic: If `canister_pre_upgrade` or `canister_post_upgrade` trap, the upgrade has failed, and the canister is reverted to the previous state. Otherwise, the upgrade has succeeded, and the old instance is discarded.

#### Public methods {#system-api-requests}

To define a public method of name `name`, a WebAssembly module exports a function with name `canister_update <name>` or `canister_query <name>` and type `() -> ()`. We call this the *method entry point*. The name of the exported function distinguishes update and query methods.

:::note
The space in `canister_update <name>` resp. `canister_query <name>` is intentional. There is exactly one space between `canister_update/canister_query` and the `<name>`.
:::

The argument of the call (e.g. the content of the `arg` field in the [API request to call a canister method](#http-call)) is copied into the canister on demand using the System API functions shown below.

Eventually, a method will want to send a response, using `ic0.reply` or `ic0.reject`

#### Heartbeat {#_heartbeat}

For periodic or time-based execution, the WebAssembly module can export a function with name `canister_heartbeat`. The heartbeats scheduling algorithm is implementation-defined.

`canister_heartbeat` is triggered by the IC, and therefore has no arguments, no caller, and cannot reply or reject.

:::note
While an implementation will likely try to keep the interval between `canister_heartbeat` invocations to within a few seconds, this is not formally part of this specification.
:::

#### Callbacks {#_callbacks}

Callbacks are addressed by their table index (as a proxy for a Wasm `funcref`).

In the reply callback of a [inter-canister method call](#system-api-call), the argument refers to the response to that call. In reject callbacks, no argument is available.

### Overview of imports {#system-api-imports}

The following sections describe various System API functions, also referred to as system calls, which we summarize here.

    ic0.msg_arg_data_size : () -> i32;                                          // I U Q Ry F
    ic0.msg_arg_data_copy : (dst : i32, offset : i32, size : i32) -> ();        // I U Q Ry F
    ic0.msg_caller_size : () -> i32;                                            // I G U Q F
    ic0.msg_caller_copy : (dst : i32, offset: i32, size : i32) -> ();           // I G U Q F
    ic0.msg_reject_code : () -> i32;                                            // Ry Rt
    ic0.msg_reject_msg_size : () -> i32;                                        // Rt
    ic0.msg_reject_msg_copy : (dst : i32, offset : i32, size : i32) -> ();      // Rt

    ic0.msg_reply_data_append : (src : i32, size : i32) -> ();                  // U Q Ry Rt
    ic0.msg_reply : () -> ();                                                   // U Q Ry Rt
    ic0.msg_reject : (src : i32, size : i32) -> ();                             // U Q Ry Rt

    ic0.msg_cycles_available : () -> i64;                                       // U Rt Ry
    ic0.msg_cycles_available128 : (dst : i32) -> ();                            // U Rt Ry
    ic0.msg_cycles_refunded : () -> i64;                                        // Rt Ry
    ic0.msg_cycles_refunded128 : (dst : i32) -> ();                             // Rt Ry
    ic0.msg_cycles_accept : (max_amount : i64) -> ( amount : i64 );            // U Rt Ry
    ic0.msg_cycles_accept128 : (max_amount_high : i64, max_amount_low: i64, dst : i32)
                           -> ();                                               // U Rt Ry

    ic0.canister_self_size : () -> i32;                                         // *
    ic0.canister_self_copy : (dst : i32, offset : i32, size : i32) -> ();       // *
    ic0.canister_cycle_balance : () -> i64;                                     // *
    ic0.canister_cycle_balance128 : (dst : i32) -> ();                          // *
    ic0.canister_status : () -> i32;                                            // *

    ic0.msg_method_name_size : () -> i32                                        // F
    ic0.msg_method_name_copy : (dst : i32, offset : i32, size : i32) -> ();     // F
    ic0.accept_message : () -> ();                                              // F

    ic0.call_new :                                                              // U Ry Rt H
      ( callee_src  : i32,
        callee_size : i32,
        name_src : i32,
        name_size : i32,
        reply_fun : i32,
        reply_env : i32,
        reject_fun : i32,
        reject_env : i32
      ) -> ();
    ic0.call_on_cleanup : (fun : i32, env : i32) -> ();                         // U Ry Rt H
    ic0.call_data_append : (src : i32, size : i32) -> ();                       // U Ry Rt H
    ic0.call_cycles_add : (amount : i64) -> ();                               // U Ry Rt H
    ic0.call_cycles_add128 : (amount_high : i64, amount_low: i64) -> ();      // U Ry Rt H
    ic0.call_perform : () -> ( err_code : i32 );                                // U Ry Rt H

    ic0.stable_size : () -> (page_count : i32);                                 // *
    ic0.stable_grow : (new_pages : i32) -> (old_page_count : i32);              // *
    ic0.stable_write : (offset : i32, src : i32, size : i32) -> ();             // *
    ic0.stable_read : (dst : i32, offset : i32, size : i32) -> ();              // *
    ic0.stable64_size : () -> (page_count : i64);                               // *
    ic0.stable64_grow : (new_pages : i64) -> (old_page_count : i64);            // *
    ic0.stable64_write : (offset : i64, src : i64, size : i64) -> ();           // *
    ic0.stable64_read : (dst : i64, offset : i64, size : i64) -> ();            // *

    ic0.certified_data_set : (src: i32, size: i32) -> ()                        // I G U Ry Rt H
    ic0.data_certificate_present : () -> i32                                    // *
    ic0.data_certificate_size : () -> i32                                       // *
    ic0.data_certificate_copy : (dst: i32, offset: i32, size: i32) -> ()        // *

    ic0.time : () -> (timestamp : i64);                                         // *
    ic0.performance_counter : (type : i32) -> (counter : i64);                  // * s

    ic0.debug_print : (src : i32, size : i32) -> ();                            // * s
    ic0.trap : (src : i32, size : i32) -> ();                                   // * s

The comment after each function lists from where these functions may be invoked:

-   `I`: from `canister_init` or `canister_post_upgrade`

-   `G`: from `canister_pre_upgrade`

-   `U`: from `canister_update …`

-   `Q`: from `canister_query …`

-   `Ry`: from a reply callback

-   `Rt`: from a reject callback

-   `C`: from a cleanup callback

-   `s`: the `(start)` module initialization function

-   `F`: from `canister_inspect_message`

-   `H`: from `canister_heartbeat`

-   `*` = `I G U Q Ry Rt C F H` (NB: Not `(start)`)

If the canister invokes a system call from somewhere else, it will trap.

### Blob-typed arguments and results {#_blob_typed_arguments_and_results}

WebAssembly functions parameter and result types can only be primitive number types. To model functions that accept or return blobs or text values, the following idiom is used:

To provide access to a string or blob `foo`, the System API provides two functions:

    ic0.foo_size : () -> i32
    ic0.foo_copy : (dst : i32, offset: i32, size : i32) -> ()

The `*_size` function indicates the size, in bytes, of `foo`. The `*_copy` function copies `size` bytes from `foo[offset..offset+size]` to `memory[dst..dst+size]`. This traps if `offset+size` is greater than the size of `foo`, or if `dst+size` exceeds the size of the Wasm memory.

Dually, a System API function that conceptually takes a blob or string as a parameter `foo` has two parameters:

    ic0.set_foo : (src : i32, size: i32) -> …

which copies, at the time of function invocation, the data referred to by `src`/`size` out of the canister. Unless otherwise noted, this traps if `src+size` exceeds the size of the WebAssembly memory.

### Method arguments {#_method_arguments}

The canister can access an argument. For `canister_init`, `canister_post_upgrade` and method entry points, the argument is the argument of the call; in a reply callback, it refers to the received reply. So the lifetime of the argument data is a single WebAssembly function execution, not the whole method call tree.

-   ic0.msg_arg_data_size : () -> i32
        ic0.msg_arg_data_copy : (dst : i32, offset : i32, size : i32) -> ()

    The message argument data.

-   ic0.msg_caller_size : () -> i32
        ic0.msg_caller_copy : (dst : i32, offset: i32, size : i32) -> ()

    The identity of the caller, which may be a canister id or a user id. During canister installation or upgrade, this is the id of the user or canister requesting the installation or upgrade.

-   `ic0.msg_reject_code : () -> i32`

    Returns the reject code, if the current function is invoked as a reject callback.

    It returns the special "no error" code `0` if the callback is *not* invoked as a reject callback; this allows canisters to use a single entry point for both the reply and reject callback, if they choose to do so.

-   ic0.msg_reject_msg_size : () -> i32
        ic0.msg_reject_msg_copy : (dst : i32, offset : i32, size : i32) -> ()

    The reject message. Traps if there is no reject message (i.e. if `reject_code` is `0`).

### Responding

Eventually, the canister will want to respond to the original call, either by replying (indicating success) or rejecting (signalling an error):

-   `ic0.msg_reply_data_append : (src : i32, size : i32) -> ()`

    Appends data it to the (initially empty) data reply.

    :::note
    This can be invoked multiple times to build up the argument with data from various places on the Wasm heap. This way, the canister does not have to first copy all the pieces from various places into one location.
    :::

    This traps if the current call already has been or does not need to be responded to.

-   `ic0.msg_reply : () -> ()`

    Replies to the sender with the data assembled using `ic0.msg_reply_data_append`.

    This function can be called at most once (a second call will trap), and must be called exactly once to indicate success.

    See [Cycles](#system-api-cycles) for how this interacts with cycles available on this call.

-   `ic0.msg_reject : (src : i32, size : i32) -> ()`

    Rejects the call. The data referred to by `src`/`size` is used for the diagnostic message.

    This system call traps if `src+size` exceeds the size of the WebAssembly memory, or if the current call already has been or does not need to be responded to, or if the data referred to by `src`/`size` is not valid UTF8.

    The other end will receive this reject with reject code `CANISTER_REJECT`, see [Reject codes](#reject-codes).

    Possible reply data assembled using `ic0.msg_reply_data_append` is discarded.

    See [Cycles](#system-api-cycles) for how this interacts with cycles available on this call.

### Ingress message inspection {#system-api-inspect-message}

A canister can inspect ingress messages before executing them. When the IC receives an update call from a user, the IC will use the canister method `canister_inspect_message` to determine whether the message shall be accepted. If the canister is empty (i.e. does not have a Wasm module), then the ingress message will be rejected. If the canister is not empty and does not implement `canister_inspect_message`, then the ingress message will be accepted.

In `canister_inspect_message`, the canister can accept the message by invoking `ic0.accept_message : () → ()`. This function traps if invoked twice. If the canister traps in `canister_inspect_message` or does not call `ic0.accept_message`, then the access is denied.

:::note
The `canister_inspect_message` is *not* invoked for query calls, inter-canister calls or calls to the management canister.
:::

### Self-identification {#system-api-canister-self}

A canister can learn about its own identity:

-   ic0.canister_self_size : () -> i32
        ic0.canister_self_copy: (dst : i32, offset : i32, size : i32) -> ()

    These functions allow the canister to query its own canister id (as a blob).

### Canister status {#system-api-canister-status}

This function allows a canister to find out if it is running, stopping or stopped (see [IC method ](#ic-canister_status) and [IC method ](#ic-stop_canister) for context).

-   `ic0.canister_status : () → i32`

    returns the current status of the canister:

    Status `1` indicates running, `2` indicates stopping, and `3` indicates stopped.

    Status `3` (stopped) can be observed, for example, in `canister_pre_upgrade` and can be used to prevent accidentally upgrading a canister that is not fully stopped.

### Inter-canister method calls {#system-api-call}

When handling an update call (or a callback), a canister can do further calls to another canister. Calls are assembled in a builder-like fashion, starting with `ic0.call_new`, adding more attributes using the `ic0.call_*` functions, and eventually performing the call with `ic0.call_perform`.

-   ic0.call_new :
          ( callee_src : i32,
            callee_size : i32,
            name_src : i32,
            name_size : i32,
            reply_fun : i32,
            reply_env : i32,
            reject_fun : i32,
            reject_env : i32,
          ) -> ()

    Begins assembling a call to the canister specified by `callee_src/_size` at method `name_src/_size`.

    The IC records two mandatory callback functions, represented by a table entry index `*_fun` and some additional value `*_env`. When the response comes back, the table is read at the corresponding index, expected to be a function of type `(env : i32) -> ()`, and passed the corresponding `*_env` value.

    The reply callback is executed upon successful completion of the method call, which can query the reply using `ic0.msg_arg_data_*`.

    The reject callback is executed if the method call fails asynchronously or the other canister explicitly rejects the call. The reject code and message can be queried using `ic0.msg_reject_code` and `ic0.msg_reject_msg_*`.

    This deducts `MAX_CYCLES_PER_RESPONSE` cycles from the canister balance and sets them aside for response processing. This will trap if not sufficient cycles are available.

    Subsequent calls to the following functions set further attributes of that call, until the call is concluded (with `ic0.call_perform`) or discarded (by returning without calling `ic0.call_perform` or by starting a new call with `ic0.call_new`.)

-   ic0.call_on_cleanup : (fun : i32, env : i32) -> ()

    If a cleanup callback (of type `(env : i32) -> ()`) is specified for this call, it is executed if and only if the `reply` or the `reject` callback was executed and trapped (for any reason).

    During the execution of the `cleanup` function, only a subset of the System API is available (namely `ic0.debug_print`, `ic0.trap` and the `ic0.stable_*` functions). The cleanup function is expected to run swiftly (within a fixed, yet to be specified cycle limit) and serves to free resources associated with the callback.

    If this traps (e.g. runs out of cycles), the state changes from the `cleanup` function are discarded, as usual, and no further actions are taken related to that call. Canisters likely want to avoid this from happening.

    There must be at most one call to `ic0.call_on_cleanup` between `ic0.call_new` and `ic0.call_perform`.

-   `ic0.call_data_append : (src : i32, size : i32) -> ()`

    Appends the specified bytes to the argument of the call. Initially, the argument is empty.

    This may be called multiple times between `ic0.call_new` and `ic0.call_perform`.

-   `ic0.call_cycles_add : (amount : i64) -> ()`

    This adds cycles onto a call. See [Cycles](#system-api-cycles).

    This may be called multiple times between `ic0.call_new` and `ic0.call_perform`.

-   `ic0.call_cycles_add128 : (amount_high : i64, amount_low : i64) -> ()`

    This adds cycles onto a call. See [Cycles](#system-api-cycles).

    This may be called multiple times between `ic0.call_new` and `ic0.call_perform`.

-   `ic0.call_perform : () -> ( err_code : i32 )`

    This concludes assembling the call. It queues the call message to the given destination, but does not actually act on it until the current WebAssembly function returns without trapping.

    If the function returns `0` as the `err_code`, the IC was able to enqueue the call. In this case, the call will either be delivered, returned because the destination canister does not exist or returned because of an out of cycles condition. This also means that exactly one of the reply or reject callbacks will be executed.

    If the function returns a non-zero value, the call cannot (and will not be) performed. This can happen due to a lack of resources within the IC, but also if it would reduce the current cycle balance to a level below where the canister would be frozen.

    After `ic0.call_perform` and before the next call to `ic0.call_new`, all other `ic0.call_*` function calls trap.

### Cycles {#system-api-cycles}

Each canister maintains a balance of *cycles*, which are used to pay for platform usage. Cycles are represented by 128-bit values.

:::note
This specification currently does not go into details about which actions cost how many cycles and/or when. In general, you must assume that the canister's cycle balance can change arbitrarily between method executions, and during each System API function call, unless explicitly mentioned otherwise.
:::

-   `ic0.canister_cycle_balance : () → i64`

    Indicates the current cycle balance of the canister. It is the canister balance before the execution of the current message, minus a reserve to pay for the execution of the current message, minus any cycles queued up to be sent via `ic0.call_cycles_add`. After execution of the message, the IC may add unused cycles from the reserve back to the balance.

    :::note
    This call traps if the current balance does not fit into a 64-bit value. Canisters that need to deal with larger cycles balances should use `ic0.canister_cycles_balance128` instead.
    :::

-   `ic0.canister_cycle_balance128 : (dst : i32) → ()`

    Indicates the current cycle balance of the canister by copying the value at the location `dst` in the canister memory. It is the canister balance before the execution of the current message, minus a reserve to pay for the execution of the current message, minus any cycles queued up to be sent via `ic0.call_cycles_add128`. After execution of the message, the IC may add unused cycles from the reserve back to the balance.

    This system call is experimental. It may be changed or removed in the future. Canisters using it may stop working.

-   `ic0.msg_cycles_available : () → i64`

    Returns the amount of cycles that were transferred by the caller of the current call, and is still available in this message.

    Initially, in the update method entry point, this is the amount that the caller passed to the canister. When cycles are accepted (`ic0.msg_cycles_accept`), this reports fewer cycles accordingly. When the call is responded to (reply or reject), all available cycles are refunded to the caller, and this will return 0.

    :::note
    This call traps if the amount of cycles available does not fit into a 64-bit value. Please use `ic0.msg_cycles_available128` instead.
    :::

-   `ic0.msg_cycles_available128 : (dst : i32) → ()`

    Indicates the number of cycles transferred by the caller of the current call, still available in this message. The amount of cycles is represented by a 128-bit value. This call copies this value starting at the location `dst` in the canister memory.

    Initially, in the update method entry point, this is the amount that the caller passed to the canister. When cycles are accepted (`ic0.msg_cycles_accept128`), this reports fewer cycles accordingly. When the call is responded to (reply or reject), all available cycles are refunded to the caller, and this will report 0 cycles.

    This system call is experimental. It may be changed or removed in the future. Canisters using it may stop working.

-   `ic0.msg_cycles_accept : (max_amount : i64) → (amount : i64)`

    This moves cycles from the call to the canister balance. It moves as many cycles as possible, up to these constraints:

    -   It moves no more cycles than `max_amount`.

    -   It moves no more cycles than available according to `ic0.msg_cycles_available`, and

    It can be called multiple times, each time possibly adding more cycles to the balance.

    The return value indicates how many cycles were actually moved.

    This system call does not trap.

    :::tip
    Example: To accept all cycles provided in a call, invoke `ic0.msg_cycles_accept(ic0.msg_cycles_available())` in the method handler or a callback handler, *before* calling reply or reject.
    :::

-   `ic0.msg_cycles_accept128 : (max_amount_high : i64, max_amount_low : i64, dst : i32) → ()`

    This moves cycles from the call to the canister balance. It moves as many cycles as possible, up to these constraints:

    -   It moves no more cycles than the amount obtained by combining `max_amount_high` and `max_amount_low`. Cycles are represented by 128-bit values.

    -   It moves no more cycles than available according to `ic0.msg_cycles_available128`, and

    It can be called multiple times, each time possibly adding more cycles to the balance.

    This call also copies the amount of cycles that were actually moved starting at the location `dst` in the canister memory.

    This does not trap.

    This system call is experimental. It may be changed or removed in the future. Canisters using it may stop working.

-   `ic0.call_cycles_add : (amount : i64) → ()`

    This function moves cycles from the canister balance onto the call under construction, to be transferred with that call.

    The cycles are deducted from the balance as shown by `ic0.canister_cycle_balance` immediately, and moved back if the call cannot be performed (e.g. if `ic0.call_perform` signals an error, or if the canister invokes `ic0.call_new` or returns without calling `ic0.call_perform`).

    This system call traps if trying to transfer more cycles than are in the current balance of the canister.

-   `ic0.call_cycles_add128 : (amount_high : i64, amount_low : i64) → ()`

    This function moves cycles from the canister balance onto the call under construction, to be transferred with that call.

    The amount of cycles it moves is represented by a 128-bit value which can be obtained by combining the `amount_high` and `amount_low` parameters.

    The cycles are deducted from the balance as shown by `ic0.canister_cycles_balance128` immediately, and moved back if the call cannot be performed (e.g. if `ic0.call_perform` signals an error, or if the canister invokes `ic0.call_new` or returns without calling `ic0.call_perform`).

    This traps if trying to transfer more cycles than are in the current balance of the canister.

    This system call is experimental. It may be changed or removed in the future. Canisters using it may stop working.

-   `ic0.msg_cycles_refunded : () → i64`

    This function can only be used in a callback handler (reply or reject), and indicates the amount of cycles that came back with the response as a refund. The refund has already been added to the canister balance automatically.

:::note
This call traps if the amount of cycles refunded does not fit into a 64-bit value. In general, it is recommended to use `ic0.msg_cycles_refunded128` instead.
:::

-   `ic0.msg_cycles_refunded128 : (dst : i32) → ()`

    This function can only be used in a callback handler (reply or reject), and indicates the amount of cycles that came back with the response as a refund. The refund has already been added to the canister balance automatically.

    This system call is experimental. It may be changed or removed in the future. Canisters using it may stop working.

### Stable memory {#system-api-stable-memory}

Canisters have the ability to store and retrieve data from a secondary memory. The purpose of this *stable memory* is to provide space to store data beyond upgrades. The interface mirrors roughly the memory-related instructions of WebAssembly, and tries to be forward compatible with exposing this feature as an additional memory.

The stable memory is initially empty.

-   `ic0.stable_size : () → (page_count : i32)`

    returns the current size of the stable memory in WebAssembly pages. (One WebAssembly page is 64KiB)

    This system call traps if the size of the stable memory exceeds 2\^32 bytes.

-   `ic0.stable_grow : (new_pages : i32) → (old_page_count : i32)`

    tries to grow the memory by `new_pages` many pages containing zeroes.

    This system call traps if the *previous* size of the memory exceeds 2\^32 bytes.

    If the *new* size of the memory exceeds 2\^32 bytes or growing is unsuccessful, then it returns `-1`.

    Otherwise, it grows the memory and returns the *previous* size of the memory in pages.

-   `ic0.stable_write : (offset : i32, src : i32, size : i32) → ()`

    copies the data referred to by `src`/`size` out of the canister and replaces the corresponding segment starting at `offset` in the stable memory.

    This system call traps if the size of the stable memory exceeds 2\^32 bytes.

    It also traps if `src+size` exceeds the size of the WebAssembly memory or `offset+size` exceeds the size of the stable memory.

-   `ic0.stable_read : (dst : i32, offset : i32, size : i32) → ()`

    copies the data referred to by `offset`/`size` out of the stable memory and replaces the corresponding bytes starting at `dest` in the canister memory.

    This system call traps if the size of the stable memory exceeds 2\^32 bytes.

    It also traps if `dst+size` exceeds the size of the WebAssembly memory or `offset+size` exceeds the size of the stable memory

-   `ic0.stable64_size : () → (page_count : i64)`

    returns the current size of the stable memory in WebAssembly pages. (One WebAssembly page is 64KiB)

    This system call is experimental. It may be changed or removed in the future. Canisters using it may stop working.

-   `ic0.stable64_grow : (new_pages : i64) → (old_page_count : i64)`

    tries to grow the memory by `new_pages` many pages containing zeroes.

    If successful, returns the *previous* size of the memory (in pages). Otherwise, returns `-1`.

    This system call is experimental. It may be changed or removed in the future. Canisters using it may stop working.

-   `ic0.stable64_write : (offset : i64, src : i64, size : i64) → ()`

    Copies the data from location \[src, src+size) of the canister memory to location \[offset, offset+size) in the stable memory.

    This system call traps if `src+size` exceeds the size of the WebAssembly memory or `offset+size` exceeds the size of the stable memory.

    This system call is experimental. It may be changed or removed in the future. Canisters using it may stop working.

-   `ic0.stable64_read : (dst : i64, offset : i64, size : i64) → ()`

    Copies the data from location \[offset, offset+size) of the stable memory to the location \[dst, dst+size) in the canister memory.

    This system call traps if `dst+size` exceeds the size of the WebAssembly memory or `offset+size` exceeds the size of the stable memory.

    This system call is experimental. It may be changed or removed in the future. Canisters using it may stop working.

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

### Performance counter {#system-api-performance-counter}

The canister can query the \"performance counter\", which is a deterministic monotonically increasing integer approximating the amount of work the canister has done since the beginning of the current execution.

`ic0.performance_counter : (type : i32) -> i64`

The argument `type` decides which performance counter to return:

-   0 : instruction counter. The number of WebAssembly instructions the system has determined that the canister has executed.

In the future, we might expose more performance counters.

The system resets the counter at the beginning of each [Entry points](#entry-points) invocation.

The main purpose of this counter is to facilitate in-canister performance profiling.

### Certified data {#system-api-certified-data}

For each canister, the IC keeps track of "certified data", a canister-defined blob. For fresh canisters, this blob is the empty blob (`""`).

-   `ic0.certified_data_set : (src: i32, size : i32) -> ()`

    The canister can update the certified data with this call. The passed data must be no larger than 32 bytes. This can be used any number of times.

When executing a query method via a query call (i.e. in non-replicated state), the canister can fetch a certificate that authenticates to third parties the value last set via `ic0.certified_data_set`.

-   `ic0.data_certificate_present : () -> i32`

    returns `1` if a certificate is present, and `0` otherwise.

    This will return `1` when called from a query method when invoked via a query call.

    This will return `0` if the query method is executed within replicated execution (e.g. when invoked via an update call or inter-canister call).

-   ic0.data_certificate_size : () -> i32
        ic0.data_certificate_copy : (dst: i32, offset: i32, size: i32) -> ()

    Copies the certificate for the current value of the certified data to the canister.

    The certificate is a blob as described in [Certification](#certification) that contains the values at path `/canister/<canister_id>/certified_data` and at path `/time` of [The system state tree](#the-system-state-tree).

    If this `certificate` includes subnet delegations (possibly nested), then the id of the current canister will be included in each delegation's canister id range.

    This traps if `ic0.data_certificate_present()` returns `0`.

### Debugging aids {#_debugging_aids}

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

The [interface description](_attachments/ic.did), in [Candid syntax](https://github.com/dfinity/candid/blob/master/spec/Candid.md), describes the available functionality.

The binary encoding of arguments and results are as per Candid specification.

### IC method `create_canister` {#ic-create_canister}

Before deploying a canister, the administrator of the canister first has to register it with the IC, to get a canister id (with an empty canister behind it), and then separately install the code.

The optional `settings` parameter can be used to set the following settings:

-   `controllers` (`vec principal`)

    A list of principals. Must be between 0 and 10 in size. This value is assigned to the *controllers* attribute of the canister.

    Default value: A list containing only the caller of the `create_canister` call.

-   `compute_allocation` (`nat`)

    Must be a number between 0 and 100, inclusively. It indicates how much compute power should be guaranteed to this canister, expressed as a percentage of the maximum compute power that a single canister can allocate. If the IC cannot provide the requested allocation, for example because it is oversubscribed, the call will be rejected.

    Default value: 0

-   `memory_allocation` (`nat`)

    Must be a number between 0 and 2^48^ (i.e 256TB), inclusively. It indicates how much memory the canister is allowed to use in total. Any attempt to grow memory usage beyond this allocation will fail. If the IC cannot provide the requested allocation, for example because it is oversubscribed, the call will be rejected. If set to 0, then memory growth of the canister will be best-effort and subject to the available memory on the IC.

    Default value: 0

Until code is installed, the canister is `Empty` and behaves like a canister that has no public methods.

-   `freezing_threshold` (`nat`)

    Must be a number between 0 and 2^64^-1, inclusively, and indicates a length of time in seconds.

    A canister is considered frozen whenever the IC estimates that the canister would be depleted of cycles before `freezing_threshold` seconds pass, given the canister's current size and the IC's current cost for storage.

    Calls to a frozen canister will be rejected (like for a stopping canister). Additionally, a canister cannot perform calls if that would, due the cost of the call and transferred cycles, would push the balance into frozen territory; these calls fail with `ic0.call_perform` returning a non-zero error code.

    Default value: 2592000 (approximately 30 days).

### IC method `update_settings` {#ic-update_settings}

Only *controllers* of the canister can update settings. See [IC method ](#ic-create_canister) for a description of settings.

Not including a setting in the `settings` record means not changing that field. The defaults described above are only relevant during canister creation.

### IC method `install_code` {#ic-install_code}

This method installs code into a canister.

Only controllers of the canister can install code.

-   If `mode = install`, the canister must be empty before. This will instantiate the canister module and invoke its `canister_init` method (if present), as explained in Section "[Canister initialization](#system-api-init)", passing the `arg` to the canister.

-   If `mode = reinstall`, if the canister was not empty, its existing code and state is removed before proceeding as for `mode = install`.

    Note that this is different from `uninstall_code` followed by `install_code`, as that will forcibly reject all calls awaiting a response.

-   If `mode = upgrade`, this will perform an upgrade of a non-empty canister as described in [Canister upgrades](#system-api-upgrades), passing `arg` to the `canister_post_upgrade` method of the new instance.

This is atomic: If the response to this request is a `reject`, then this call had no effect.

:::note
Some canisters may not be able to make sense of callbacks after upgrades; these should be stopped first, to wait for all outstanding callbacks, or be uninstalled first, to prevent outstanding callbacks from being invoked. It is expected that the canister admin (or their tooling) does that separately.
:::

The `wasm_module` field specifies the canister module to be installed. The system supports multiple encodings of the `wasm_module` field:

-   If the `wasm_module` starts with byte sequence `[0x00, 'a', 's', 'm']`, the system parses `wasm_module` as a raw WebAssembly binary.

-   If the `wasm_module` starts with byte sequence `[0x1f, 0x8b, 0x08]`, the system decompresses the contents of `wasm_module` as a gzip stream according to [RFC-1952](https://datatracker.ietf.org/doc/html/rfc1952.html) and then parses the output as a WebAssembly binary.

### IC method `uninstall_code` {#ic-uninstall_code}

This method removes a canister's code and state, making the canister *empty* again.

Only controllers of the canister can uninstall code.

Uninstalling a canister's code will reject all calls that the canister has not yet responded to, and drop the canister's code and state. Outstanding responses to the canister will not be processed, even if they arrive after code has been installed again.

The canister is now [empty](#canister-lifecycle). In particular, any incoming or queued calls will be rejected.

A canister after *uninstalling* retains its *cycles* balance, *controllers*, status, and allocations.

### IC method `canister_status` {#ic-canister_status}

Indicates various information about the canister. It contains:

-   The status of the canister. It could be one of `running`, `stopping` or `stopped`.

-   A SHA256 hash of the module installed on the canister. This is `null` if the canister is empty.

-   The controllers of the canister.

-   The memory size taken by the canister.

-   The cycle balance of the canister.

Only the controllers of the canister can request its status.

### IC method `stop_canister` {#ic-stop_canister}

The controllers of a canister may stop a canister (e.g., to prepare for a canister upgrade).

Stopping a canister is not an atomic action. The immediate effect is that the status of the canister is changed to `stopping` (unless the canister is already stopped). The IC will reject all calls to a stopping canister, indicating that the canister is stopping. Responses to a stopping canister are processed as usual. When all outstanding responses have been processed (so there are no open call contexts), the canister status is changed to `stopped` and the management canister responds to the caller of the `stop_canister` request.

### IC method `start_canister` {#ic-start_canister}

A canister may be started by its controllers.

If the canister status was `stopped` or `stopping` then the canister status is simply set to `running`. In the latter case all `stop_canister` calls which are processing fail (and are rejected).

If the canister was already `running` then the status stays unchanged.

### IC method `delete_canister` {#ic-delete_canister}

This method deletes a canister from the IC.

Only controllers of the canister can delete it and the canister must already be stopped. Deleting a canister cannot be undone, any state stored on the canister is permanently deleted and its cycles are discarded. Once a canister is deleted, its ID cannot be reused.

### IC method `deposit_cycles` {#ic-deposit_cycles}

This method deposits the cycles included in this call into the specified canister.

There is no restriction on who can invoke this method.

### IC method `raw_rand` {#ic-raw_rand}

This method takes no input and returns 32 pseudo-random bytes to the caller. The return value is unknown to any part of the IC at time of the submission of this call. A new return value is generated for each call to this method.

### IC method `ecdsa_public_key` {#ic-ecdsa_public_key}

This method returns a [SEC1](https://www.secg.org/sec1-v2.pdf) encoded ECDSA public key for the given canister using the given derivation path. If the `canister_id` is unspecified, it will default to the canister id of the caller. The `derivation_path` is a vector of variable length byte strings. The `key_id` is a struct specifying both a curve and a name. The availability of a particular `key_id` depends on implementation.

For curve `secp256k1`, the public key is derived using a generalization of BIP32 (see [ia.cr/2021/1330, Appendix D](https://ia.cr/2021/1330)). To derive (non-hardened) [BIP-0032](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)-compatible public keys, each byte string (`blob`) in the `derivation_path` must be a 4-byte big-endian encoding of an unsigned integer less than 2^31^.

The return result is an extended public key consisting of an ECDSA `public_key`, encoded in [SEC1](https://www.secg.org/sec2-v2.pdf) compressed form, and a `chain_code`, which can be used to deterministically derive child keys of the `public_key`.

This call requires that the ECDSA feature is enabled, and the `canister_id` meets the requirement of a canister id. Otherwise it will be rejected.

### IC method `sign_with_ecdsa` {#ic-sign_with_ecdsa}

This method returns a new [ECDSA](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-4.pdf) signature of the given `message_hash` that can be separately verified against a derived ECDSA public key. This public key can be obtained by calling `ecdsa_public_key` with the caller's `canister_id`, and the same `derivation_path` and `key_id` used here.

The signatures are encoded as the concatenation of the [SEC1](https://www.secg.org/sec2-v2.pdf) encodings of the two values r and s. For curve `secp256k1`, this corresponds to 32-byte big-endian encoding.

This call requires that the ECDSA feature is enabled, the caller is a canister, and `message_hash` is 32 bytes long. Otherwise it will be rejected.

### IC method `http_request` {#ic-http_request}

This method makes an HTTP request to a given URL and returns the HTTP response, possibly after a transformation.

The canister should aim to issue *idempotent* requests, meaning that it must not change the state at the remote server, or the remote server has the means to identify duplicated requests. Otherwise, the risk of failure increases.

The responses for all identical requests must match too. However, a web service could return slightly different responses for identical idempotent requests. For example, it may include some unique identification or a timestamp that would vary across responses.

For this reason, the calling canister can supply a transformation function, which the IC uses to let the canister sanitize the responses from such unique values. The transformation function is executed separately on the corresponding response received for a request. The final response will only be available to the calling canister.

Currently, only the `GET` method is supported for HTTP requests.

For security reasons, only HTTPS connections are allowed (URLs must start with `https://`). The IC uses industry-standard root CA lists to validate certificates of remote web servers.

The maximal size of a request URL is 2048 bytes.

The maximal size of a response is `2MiB`. Therefore, only the first `2MiB` will be returned if a response is larger than this size. This size limit also applies to the value returned by the `transform` function.

The following parameters should be supplied for the call:

-   `url` - the requested URL

-   `method` - currently, only GET is supported

-   `headers` - list of HTTP request headers and their corresponding values

-   `transform` - an optional function that transforms raw responses to sanitized responses. If provided, the calling canister itself must export this function.

The returned response (and the response provided to the `transform` function, if specified) contains the following fields:

-   `status` - the response status (e.g., 200, 404)

-   `headers` - list of HTTP response headers and their corresponding values

-   `body` - the response's body

The `transform` function may, for example, transform the body in any way, add or remove headers, modify headers, etc. When the transform function was invoked due to a canister HTTP request, the caller's identity is the principal of the management canister.

### IC method `provisional_create_canister_with_cycles` {#ic-provisional_create_canister_with_cycles}

As a provisional method on development instances, the `provisional_create_canister_with_cycles` method is provided. It behaves as `create_canister`, but initializes the canister's balance with `amount` fresh cycles (using `DEFAULT_PROVISIONAL_CYCLES_BALANCE` if `amount = null`).

Cycles added to this call via `ic0.call_cycles_add128` are returned to the caller.

This method is only available in local development instances.

### IC method `provisional_top_up_canister` {#ic-provisional_top_up_canister}

As a provisional method on development instances, the `provisional_top_up_canister` method is provided. It adds `amount` cycles to the balance of canister identified by `amount`.

Cycles added to this call via `ic0.call_cycles_add128` are returned to the caller.

Any user can top-up any canister this way.

This method is only available in local development instances.

## Certification

Some parts of the IC state are exposed to users in a tamperproof way via certification: the IC can reveal a *partial state tree* which includes just the data of interest, together with a signature on the root hash of the state tree. This means that a user can be sure that the response is correct, even if the user happens to be communicating with a malicious node, or has received the certificate via some other untrusted way.

To validate a value using a certificate, the user conceptually

1.  checks the validity of the partial tree using `verify_cert`,

2.  looks up the value in the certificate using `lookup` at a given path, which uses the subroutine `lookup_path` on the certificate's tree

This mechanism is used in the `read_state` request type, and eventually also for other purposes.

### Root of trust {#_root_of_trust}

The root of trust is the *root public key*, which must be known to the user a priori. In a local canister execution environment, the key can be fetched via the [`/api/v2/status`](#api-status) endpoint.

### Certificate {#_certificate}

A certificate consists of

-   a tree

-   a signature on the tree root hash valid under some *public key*

-   an optional *delegation* that links that public key to *root public key*.

The IC will certify states by issuing certificates where the tree is a partial state tree. The state tree can be pruned by replacing subtrees with their root hashes (yielding a new and potentially smaller but still valid certificate) to only include paths pertaining to relevant data but still preserving enough information to recover the *tree root hash*.

More formally, a certificate is described by the following data structure:

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

A certificate is validated with regard to the root of trust by the following algorithm (which uses `check_delegation` defined in [Delegation](#certification-delegation)):

    verify_cert(cert) =
      let root_hash = reconstruct(cert.tree)
      let der_key = check_delegation(cert.delegation) // see section Delegations below
      bls_key = extract_der(der_key)
      verify_bls_signature(bls_key, cert.signature, domain_sep("ic-state-root") · root_hash)

    reconstruct(Empty)       = H(domain_sep("ic-hashtree-empty"))
    reconstruct(Fork t1 t2)  = H(domain_sep("ic-hashtree-fork") · reconstruct(t1) · reconstruct(t2))
    reconstruct(Labeled l t) = H(domain_sep("ic-hashtree-labeled") · l · reconstruct(t))
    reconstruct(Leaf v)      = H(domain_sep("ic-hashtree-leaf") · v)
    reconstruct(Pruned h)    = h

    domain_sep(s) = byte(|s|) · s

where `H` is the SHA-256 hash function,

    verify_bls_signature : PublicKey -> Signature -> Blob -> Bool

is the [BLS signature verification function](https://tools.ietf.org/html/draft-irtf-cfrg-bls-signature-04#section-4), ciphersuite BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL\_. See that document also for details on the encoding of BLS public keys and signatures, and

    extract_der : Blob -> Blob

implements DER decoding of the public key, following [RFC4580](https://tools.ietf.org/html/rfc5480) using OID 1.3.6.1.4.1.44668.5.3.1.2.1 for the algorithm and 1.3.6.1.4.1.44668.5.3.2.1 for the curve.

All state trees include the time at path `/time` (see [Time](#state-tree-time)). Users that get a certificate with a state tree can look up the timestamp to guard against working on obsolete data.

### Lookup {#_lookup}

Given a (verified) tree, the user can fetch the value at a given path, which is a sequence of labels (blobs). In this document, we write paths suggestively with slashes as separators; the actual encoding is not actually using slashes as delimiters.

The following algorithm looks up a `path` in a certificate, and returns either

-   the value

-   `Absent`, if the value is guaranteed to be absent in the original state tree,

-   `Unknown`, if this partial view does not include information about this path, or

-   `Error`, if the path does not make sense for this certificate:

```html
lookup(path, cert) = lookup_path(path, cert.tree)

lookup_path([], Empty) = Absent
lookup_path([], Leaf v) = v
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
find_label(l, [])                                                = Absent
find_label(l, _)                                                 = Unknown
```


The IC will only produce well-formed state trees, and the above algorithm assumes well-formed trees. These have the property that labeled subtrees appear in strictly increasing order of labels, and are not mixed with leaves. More formally:

    well_formed(tree) =
      (tree = Leaf _) ∨ (well_formed_forest(flatten_forks(tree)))

    well_formed_forest(trees) =
      strictly_increasing([l | Label l _ ∈ trees]) ∧
      ∀ Label _ t ∈ trees. well_formed(t) ∧
      ∀ t ∈ trees ≠ Leaf _

### Delegation {#certification-delegation}

The root key can delegate certification authority to other keys.

A certificate by the root subnet does not have a delegation field. A certificate by other subnets include a delegation, which is itself a certificate that proves that the subnet is listed in the root subnet's state tree (see [Subnet information](#state-tree-subnet)), and reveals its public key.

:::note
The nested certificate *typically* does not itself again contain a delegation, although there is no reason why agents should enforce that property.
:::

    Delegation =
     Delegation {
       subnet_id : Principal;
       certificate : Certificate;
     }

A chain of delegations is verified using the following algorithm, which also returns the delegated key (a DER-encoded BLS key):

    check_delegation(NoDelegation) : public_bls_key =
      return root_public_key
    check_delegation(Delegation d) : public_bls_key =
      verify_cert(d.certificate)
      return lookup(["subnet",d.subnet_id,"public_key"],d.certificate)

where `root_public_key` is the a priori known root key.

Delegations are *scoped*, i.e., they indicate which set of canister principals the delegatee subnet may certify for. This set can be obtained from a delegation `d` using `lookup(["subnet",d.subnet_id,"canister_ranges"],d.certificate)`, which must be present, and is encoded as described in [Subnet information](#state-tree-subnet). The various applications of certificates describe if and how the subnet scope comes into play.

### Encoding of certificates {#certification-encoding}

The binary encoding of a certificate is a CBOR value according to the following CDDL. You can also [download the file](_attachments/certificates.cddl).

The values in the [The system state tree](#the-system-state-tree) are encoded to blobs as follows:

-   natural numbers are leb128-encoded.

-   text values are UTF-8-encoded

-   blob values are encoded as is

### Example {#_example}

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

This tree has the following CBOR encoding

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

This section specifies the *HTTP Gateway protocol*, which allows canisters to handle conventional HTTP requests.

This feature involves the help of a *HTTP Gateway* that translates between HTTP requests and the IC protocol. Such a gateway could be a stand-alone proxy, it could be implemented in a web browsers (natively, via plugin or via a service worker) or in other ways. This document describes the interface and semantics of this protocol independent of a concrete Gateway, so that all Gateway implementations can be compatible.

Conceptually, this protocol builds on top of the interface specified in the remainder of this document, and therefore is an "application-level" interface, not a feature of the core Internet Computer system described in the other sections, and could be a separate document. We nevertheless include this protocol in the Internet Computer Interface Specification because of its important role in the ecosystem and due to the importance of keeping multiple Gateway implementations in sync.

### Overview {#_overview}

A HTTP request by an HTTP client is handled by these steps:

1.  The Gateway resolves the Host of the request to a canister id.

2.  The Gateway Candid-encodes the HTTP request data.

3.  The Gateway invokes the canister via a query call to `http_request`.

4.  The canister handles the request and returns a HTTP response, encoded in Candid, together with additional metadata.

5.  If requested by the canister, the Gateway sends the request again via an update call to `http_request_update`.

6.  If applicable, the Gateway fetches further body data via streaming query calls.

7.  If applicable, the Gateway validates the certificate of the response.

8.  The Gateway sends the response to the HTTP client.

### Candid interface {#http-gateway-interface}

The following interface description, in [Candid syntax](https://github.com/dfinity/candid/blob/master/spec/Candid.md), describes the expected Canister interface. You can also [download the file](_attachments/http-gateway.did).

Only canisters that use the "Upgrade to update calls" feature need to provide the `http_request_update` method.

:::note
Canisters not using these features can completely leave out the `streaming_strategy` and/or `upgrade` fields in the `HttpResponse` they return, due to how Candid subtyping works. This might simplify their code.
:::

### Canister resolution {#http-gateway-name-resolution}

The Gateway needs to know the canister id of the canister to talk to, and obtains that information from the hostname as follows:

1.  Check that the hostname, taken from the `Host` field of the HTTP request, is of the form `<name>.raw.ic0.app` or `<name>.ic0.app`, or fail.

2.  If the `<name>` is in the following table, use the given canister ids:

| Hostname                          | Canister id                     |
------------------------------------|---------------------------------|
| `identity`                        | `rdmx6-jaaaa-aaaaa-aaadq-cai`   |
| `nns`                             | `qoctq-giaaa-aaaaa-aaaea-cai`   |
| `dscvr`                           | `h5aet-waaaa-aaaab-qaamq-cai`   |
| `personhood`                      | `g3wsl-eqaaa-aaaan-aaaaa-cai`   |

1.  Else, if `<name>` is a valid textual encoding of a principal, use that principal as the canister id.

2.  Else fail.

If the hostname was of the form `<name>.ic0.app`, it is a *safe* hostname; if it was of the form `<name>.raw.ic0.app` it is a *raw* hostname.

### Request encoding {#_request_encoding}

The HTTP request is encoded into the `HttpRequest` Candid structure.

-   The `method` field contains the HTTP method (e.g. `HTTP`), in upper case.

-   The `url` field contains the URL from the HTTP request line, i.e. without protocol or hostname, and including query parameters.

-   The `headers` field contains the headers of the HTTP request.

-   The `body` field contains the body of the HTTP request (without any content encodings processed by the Gateway).

### Upgrade to update calls {#_upgrade_to_update_calls}

If the canister sets `update = opt true` in the `HttpResponse` reply from `http_request`, then the Gateway ignores all other fields of the reply. The Gateway performs an *update* call to `http_request_update`, passing the same `HttpRequest` record as the argument, and uses that response instead.

The value of the `update` field returned from `http_request_update` is ignored.

### Response decoding {#_response_decoding}

The Gateway assembles the HTTP response from the given `HttpResponse` record:

-   The HTTP response status code is taken from the `status_code` field.

-   The HTTP response headers are taken from the `headers` field.

    :::note
    Not all Gateway implementations may be able to pass on all forms of headers. In particular, Service Workers are unable to pass on the `Set-Cookie` header.
    :::

    :::note
    HTTP Gateways may add additional headers. In particular, the following headers may be set:

        access-control-allow-origin: *
        access-control-allow-methods: GET, POST, HEAD, OPTIONS
        access-control-allow-headers: DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Cookie
        access-control-expose-headers: Content-Length,Content-Range
        x-cache-status: MISS
    :::

-   The HTTP response body is initialized with the value of the `body` field, and further assembled as per the [streaming protocol](#http-gateway-streaming).

### Response body streaming {#http-gateway-streaming}

The HTTP Gateway protocol has provisions to transfer further chunks of the body data from the canister to the HTTP Gateway, to overcome the message limit of the Internet Computer. This streaming protocol is independent of any possible streaming of data between the HTTP Gateway and the HTTP client. The gateway may assemble the response in whole before passing it on, or pass the chunks on directly, on the TCP or HTTP level, as it sees fit. When the Gateway is [certifying the response](#http-gateway-certification), it must not pass on uncertified chunks.

If the `streaming_strategy` field of the `HttpResponse` is set, the HTTP Gateway then uses further query calls to obtain further chunks to append to the body:

1.  If the function reference in the `callback` field of the `streaming_strategy` is not a method of the given canister, the Gateway fails the request.

2.  Else, it makes a query call to the given method, passing the `token` value given in the `streaming_strategy` as the argument.

3.  That query method returns a `StreamingCallbackHttpResponse`. The `body` therein is appended to the body of the HTTP response. This is repeated as long as the method returns some token in the `token` field, until that field is `null`.

:::note
The type of the `token` value is chosen by the canister; the HTTP Gateway obtains the Candid type of the encoded message from the canister, and uses it when passing the token back to the canister. This generic use of Candid is not covered by the Candid specification, and may not be possible in some cases (e.g. when using "future types"). Canister authors may have to use "simple" types.
:::

### Response certification {#http-gateway-certification}

If the hostname was safe, the HTTP Gateway performs *certificate validation*:

1.  It searches for a response header called `Ic-Certificate` (case-insensitive).

2.  The value of the header must be a structured header according to RFC 8941 with fields `certificate` and `tree`, both being byte sequences.

3.  The `certificate` must be a valid certificate as per [Certification](#certification), signed by the root key. If the certificate contains a subnet delegation, the delegation must be valid for the given canister. The timestamp in `/time` must be recent. The subnet state tree in the certificate must reveal the canister's [certified data](#state-tree-certified-data).

4.  The `tree` must be a hash tree as per [Encoding of certificates](#certification-encoding).

5.  The root hash of that `tree` must match the canister's certified data.

6.  The path `["http_assets",<url>]`, where `url` is the utf8-encoded `url` from the `HttpRequest` must exist and be a leaf. Else, if it does not exist, `["http_assets","/index.html"]` must exist and be a leaf.

7.  That leaf must contain the SHA-256 hash of the *decoded* body.

    The decoded body is the body of the HTTP response (in particular, after assembling streaming chunks), decoded according to the `Content-Encoding` header, if present. Supported encodings for `Content-Encoding` are `gzip` and `deflate.`

:::note
The certification protocol only covers the mapping from request URL to response body. It completely ignores the request method and headers, and does not cover the response headers and status code.
:::

## Abstract behavior

The previous sections describe the interfaces, i.e. outer edges of the Internet Computer, but give only intuitive and vague information in prose about what these interfaces actually do.

The present section aims to address that question with great precision, by describing the *abstract state* of the whole Internet Computer, and how this state can change in response to API function calls, or spontaneously (modeling asynchronous, distributed or non-deterministic execution).

The design of this abstract specification (e.g. how and where pending messages are stored) are *not* to be understood to in any way prescribe a concrete implementation or software architecture. The goals here are formal precision and clarity, but not implementability, so this can lead to different ways of phrasing.

### Notation {#_notation}

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

### Abstract state {#_abstract_state}

In this specification, we describe the Internet Computer as a state machine. In particular, there is a single piece of data that describes the complete state of the IC, called `S`.

Of course, this is a huge simplification: The real Internet Computer is distributed and has a multi-component architecture, and the state is spread over many different components, some physically separated. But this simplification allows us to have a concise description of the behavior, and to easily make global decisions (such as, "is there any pending message"), without having to specify the bookkeeping that allows such global decisions.

#### Identifiers {#_identifiers}

Principals (canister ids and user ids) are blobs, but some of them have special form, as explained in [Special forms of Principals](#id-classes).

    type Principal = Blob

The function

    mk_self_authenticating_id : PublicKey -> Principal
    mk_self_authenticating_id pk = H(pk) · 0x02

calculates self-authenticating ids.

The function

    mk_derived_id : Principal -> Blob -> Principal
    mk_derived_id p nonce = H(|p| · p · nonce) · 0x03

calculates derived ids. With `|p|` we denote the length of the principal, in bytes, encoded as a single byte.

The principal of the anonymous user is fixed:

    anonymous_id : Principal
    anonymous_id = 0x04

The principal of the management canister is the empty blob (i.e. `aaaaa-aa`):

    ic_principal : Principal = ""

These function domains and fixed values are mutually disjoint.

Method names can be arbitrary pieces of text:

    MethodName = Text

#### Abstract canisters

The [WebAssembly System API](#system-api) is relatively low-level, and some of its details (e.g. that the argument data is queried using separate calls, and that closures are represented by a function pointer and a number, that method names need to be mangled) would clutter this section. Therefore, we abstract over the WebAssembly details as follows:

-   The state of a WebAssembly module (memory, tables, globals) is hidden behind an abstract `WasmState`. The `WasmState` contains the `StableMemory`, which can be extracted using `pre_upgrade` and passed to `post_upgrade`.

-   A canister module `CanisterModule` consists of an initial state, and a (pure) function that models function invocation. It either indicates that the canister function traps, or returns a new state together with a description of the invoked asynchronous System API calls.

        WasmState = (abstract)
        StableMemory = (abstract)
        Callback = (abstract)

        Arg = {
          data : Blob
          caller: Principal
        }

        Timestamp = Nat;
        Env = {
          time : Timestamp
          balance : Nat;
          freezing_limit : Nat;
          certificate : NoCertificate | Blob
          status : Running | Stopping | Stopped
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

        UpdateFunc = WasmState -> Trap | Return {
          new_state : WasmState;
          new_calls : List MethodCall;
          new_certified_data : NoCertifiedData | Blob
          response : NoResponse | Response;
          cycles_accepted : Nat;
        }
        QueryFunc = WasmState -> Trap | Return Response

        AvailableCycles = Nat
        RefundedCycles = Nat

        CanisterModule = {
          init : (CanisterId, Arg, Env) -> Trap | Return WasmState
          pre_upgrade : (WasmState, caller : Principal, Env) -> Trap | Return StableMemory
          post_upgrade : (CanisterId, StableMemory, Arg, Env) -> Trap | Return WasmState
          update_methods : MethodName ↦ ((Arg, Env, AvailableCycles) -> UpdateFunc)
          query_methods : MethodName ↦ ((Arg, Env) -> QueryFunc)
          heartbeat : (Env) -> WasmState -> Trap | Return WasmState
          callbacks : (Callback, Response, RefundedCycles, Env, AvailableCycles) -> UpdateFunc
          inspect_message : (MethodName, WasmState, Arg, Env) -> Trap | Return (Accept | Reject)
        }

This high-level interface presents a pure, mathematical model of a canister, and hides the bookkeeping required to provide the System API as seen in Section [Canister interface (System API)](#system-api).

The `CanisterId` parameter of `init` and `post_upgrade` is merely passed through to the canister, via the `canister.self` system call.

The `Env` parameter provides synchronous read-only access to portions of the system state and canister metadata that are always available.

The parsing of a blob to a canister module is modelled via the (possibly implicitly failing) function

    parse_wasm_mod : Blob -> CanisterModule

The concrete mapping of this abstract `CanisterModule` to actual WebAssembly concepts and the System API is described separately in section [Abstract Canisters to System API](#concrete-canisters).

#### Call contexts {#_call_contexts}

The Internet Computer provides certain messaging guarantees: If a user or a canister calls another canister, it will eventually get a single response (a reply or a rejection), even if some canister code along the way fails.

To ensure that only one response is generated, and also to detect when no response can be generated any more, the IC maintains a *call context*. The `needs_to_respond` field is set to `false` once the call has received a response. Further attempts to respond will now fail.

    CallCtxt = {
      canister : CanisterId;
      origin : CallOrigin;
      needs_to_respond : bool;
      deleted : bool;
      available_cycles : Nat;
    }
    CallId = (abstract)
    CallOrigin
      = FromUser {
          request : Request;
        }
      | FromCanister {
          calling_context : CallId;
          callback: Callback
        }
      | FromHeartbeat

#### Calls and Messages {#_calls_and_messages}

Calls into and within the IC are implemented as messages passed between canisters. During their lifetime, messages change shape: they begin as a call to a public method, which is resolved to a WebAssembly function that is then executed, potentially generating a response which is then delivered.

Therefore, a message can have different shapes:

    Queue = Unordered | Queue { from : System | CanisterId; to : CanisterId }
    EntryPoint
      = PublicMethod MethodName Principal Blob
      | Callback Callback Response RefundedCycles
      | Heartbeat

    Message
      = CallMessage {
          origin : CallOrigin;
          caller : Principal;
          callee : CanisterId;
          method_name : Text;
          data : Blob;
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

The `queue` field is used to describe the message ordering behavior. Its concrete value is only used to determine when the relative order of two messages must be preserved, and is otherwise not interpreted. Response messages are not ordered, as explained above, so they have no `queue` field.

A reference implementation would likely maintain a separate list of `messages` for each such queue to efficiently find eligible messages; this document uses a single global list for a simpler and more concise system state.

#### API requests {#_api_requests}

We distinguish between the *asynchronous* API requests passed to `/api/v2/…/call`, which may be present in the IC state, and the *synchronous* API requests passed to `/api/v2/…/read_state` and `/api/v2/…/query`, which are only ephemeral.

    Envelope = {
      content : Request | APIReadRequest;
      sender_pubkey : PublicKey | NoPublicKey;
      sender_sig : Signature | NoSignature;
      sender_delegation: [SignedDelegation]
    }

    Request
      = CanisterUpdateCall = {
        nonce : Blob;
        ingress_expiry : Nat;
        sender : UserId;
        canister_id : CanisterId;
        method_name : Text;
        data : Blob;
      }

The evolution of a `Request` goes through these states, as explained in [Overview of canister calling](#http-call-overview):

    RequestStatus
      = Received
      | Processing
      | Rejected (RejectCode, Text)
      | Replied Blob
      | Done

These are the synchronous read messages:

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
        data : Blob;
      }

A `Path` may refer to a request by way of a *request id*, as specified in [Request ids](#request-id):

    Request = Blob
    hash_of_map: Request -> Request

For the signatures in a `Request`, we assume that the following function implements signature verification as described in [Authentication](#authentication). This function picks the corresponding signature scheme according to the DER-encoded metadata in the public key.

    PublicKey = Blob
    Signature = Blob
    verify_signature : PublicKey -> Signature -> Blob -> Bool

Signed delegations contain the (unsigned) delegation data in a nested record, next to the signature of that data.

    SignedDelegation = {
      delegation : {
        pubkey : PublicKey;
        targets : [CanisterId] | Unrestricted;
        senders : [Principal] | Unrestricted;
        expiration : Timestamp
      };
      signature : Signature
    }

#### The system state {#_the_system_state}

Finally, we can describe the state of the IC as a record having the following fields:

    S = {
      requests : Request ↦ RequestStatus;
      canisters : CanisterId ↦ CanState;
      controllers : CanisterId ↦ Set Principal;
      freezing_threshold : CanisterId ↦ Nat;
      canister_status: CanisterId ↦ CanStatus;
      time : CanisterId ↦ Timestamp;
      balances: CanisterId ↦ Nat;
      certified_data: CanisterId ↦ Blob;
      system_time : Timestamp
      call_contexts : CallId ↦ CallCtxt;
      messages : List Message; // ordered!
      root_key : PublicKey
    }
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

#### Initial state {#_initial_state}

The initial state of the IC is

    {
      requests = ();
      canisters = ();
      controllers = ();
      freezing_threshold = ();
      time = ();
      balances = ();
      system_time = T;
      call_contexts = ();
      messages = ();
      root_key = PublicKey;
    }

for some time stamp `T`, some DER-encoded BLS public key `PublicKey`, and using `()` to denote the empty map or bag.

### Invariants {#_invariants}

The following is an incomplete list of invariants that should hold for the abstract state `S`, and are not already covered by the type annotations in this section.

-   Deleted call contexts were not awaiting a response:

        ∀ Ctxt_id ↦ Ctxt ∈ S.call_contexts:
          if Ctxt.deleted then Ctxt.needs_to_respond = false

-   Responded call contexts have no available_cycles left:

        ∀ Ctxt_id ↦ Ctxt ∈ S.call_contexts:
          if Ctxt.needs_to_respond = false then Ctxt.available_cycles = 0

-   Referenced call contexts exists:

        ∀ CallMessage M ∈ S.messages.  M.origin.calling_context ∈ S.call_contexts
        ∀ ResponseMessage M ∈ S.messages. M.origin.calling_context ∈ S.call_contexts
        ∀ _ ↦ Ctxt ∈ S.call_contexts:
          if Ctx.needs_to_respond:
             Ctxt.origin.calling_context ∈ S.call_contexts

### State transitions {#_state_transitions}

Based on this abstract notion of the state, we can describe the behavior of the IC. There are three classes of behaviors:

-   Asynchronous API requests that are submitted via `/api/v2/…/call`. These transitions describe checks that the request must pass to be considered received.

-   Spontaneous transitions that model the internal behavior of the IC, by describing conditions on the state that allow the transition to happen, and the state after.

-   Responses to reads (i.e. `/api/v2/…/read_state`). By definition, these do *not* change the state of the IC, and merely describe the response based on the read request and the current state.

The state transitions are not complete with regard to error handling. For example, the behavior of sending a request to a non-existent canister is not specified here. For now, we trust implementors to make sensible decisions there.

We model the [The IC management canister](#ic-management-canister) with one state transition per method. There, we assume a function

    candid : Value -> Blob

that represents Candid encoding; this is implicitly taking the method types, as declared in [Interface overview](#ic-candid), into account. We model the parsing of Candid values in the "Conditions" section using `candid` as well, by treating it as a non-deterministic function.

#### Envelope Authentication {#_envelope_authentication}

The following predicate describes when an envelope `E` correctly signs the enclosed request with a key belonging to a user `U`, at time `T`: It returns which canister ids this envelope may be used at (as a set of principals).

    verify_envelope({ content = C }, U, T)
      = { p : p is CanisterID } if U = anonymous_id
    verify_envelope({ content = C, sender_pubkey = PK, sender_sig = Sig, sender_delegation = DS}, U, T)
      = TS if U = mk_self_authenticating_id E.sender_pubkey
      ∧ (PK', TS) = verify_delegations(DS, PK, T, { p : p is CanisterId }, U)
      ∧ verify_signature PK' Sig ("\x0Aic-request" · hash_of_map(C))

    verify_delegations([], PK, T, TS, U) = (PK, TS)
    verify_delegations([D] · DS, PK, T, TS, U)
      = verify_delegations(DS, D.pubkey, T, TS ∩ delegation_targets(D), U)
      if verify_signature PK D.signature ("\x1Aic-request-auth-delegation" · hash_of_map(D.delegation))
       ∧ D.delegation.expiration ≥ T
       ∧ U ∈ delegated_senders(D)

    delegation_targets(D)
      = if D.targets = Unrestricted
        then { p : p is CanisterId }
        else D.targets

    delegated_senders(D)
      = if D.senders = Unrestricted
        then { p : p is Principal }
        else D.senders

#### Effective canister ids {#_effective_canister_ids}

A `Request` has an effective canister id according to the rules in [Effective canister id](#http-effective-canister-id):

    is_effective_canister_id(CanisterUpdateCall {canister_id = ic_principal, arg = candid({canister_id = p, …}), …}, p)
    is_effective_canister_id(CanisterUpdateCall {canister_id = ic_principal, method = provisional_create_canister_with_cycles, p)
    is_effective_canister_id(CanisterUpdateCall {canister_id = p, …}, p), if p ≠ ic_principal

#### API Request submission {#_api_request_submission}

After a node accepts a request via `/api/v2/canister/<ECID>/call`, the request gets added to the IC state as `Received`.

This may only happen if the signature is valid and is created with a correct key. Due to this check, the envelope is discarded after this point.

Requests that have expired are dropped here.

Ingress message inspection is applied, and messages that are not accepted by the canister are dropped.

Submitted request

`E : Envelope`

Conditions

```html
E.content.canister_id ∈ verify_envelope(E, E.content.sender, S.system_time)
E.content ∉ requests
S.system_time <= E.content.ingress_expiry
is_effective_canister_id(E.content, ECID)
( E.content.canister_id = ic_principal
  E.content.arg = candid({canister_id = CanisterId, …})
  E.content.sender ∈ S.controllers[CanisterId]
  E.content.method_name ∈
    { "install_code", "set_controller", "start_canister", "stop_canister",
      "canister_status", "delete_canister" }
) ∨ (
  E.content.canister_id ≠ ic_principal
  S.canisters[E.content.canister_id] ≠ EmptyCanister
  Arg = { data = E.content.arg; caller = E.content.sender; method = E.content.method_name; time = S.time[E.content.canister_id] }
  S.canisters[E.content.canister_id].module.inspect_message
    (E.content.method_name, C.wasm_state, Arg, S.balance[E.content.canister_id]) = Return Accept
)
```


State after

```html
S with
  requests[E.content] = Received
```

:::note
This is not instantaneous (the IC takes some time to agree it accepts the request) nor guaranteed (a node could just drop the request, or maybe it did not pass validation). But once the request has entered the IC state like this, it will be acted upon.
:::

#### Request rejection {#_request_rejection}

The IC may reject a received message for internal reasons (high load, low resources) or expiry. The precise conditions are not specified here, but the reject code must indicate this to be a system error.

Conditions: 

```html
S.requests[R] = Received
Code = SYS_FATAL or Code = SYS_TRANSIENT
```
        

State after  

```html
S with
  requests[R] = Rejected (Code, Msg)
```
    

#### Initiating canister calls {#_initiating_canister_calls}

A first step in processing a canister update call is to create a `CallMessage` in the message queue.

The `request` field of the `FromUser` origin establishes the connection to the API message. One could use the corresponding `hash_of_map` for this purpose, but this formulation is more abstract.

The IC does not make any guarantees about the order of incoming messages.

Conditions
```html
S.requests[CanisterUpdateCall R] = Received
S.system_time <= R.ingress_expiry
C = S.canisters[R.canister_id]
```


State after
```html
S with
    requests[CanisterUpdateCall R] = Processing
    messages =
      CallMessage {
        origin = FromUser { request = CanisterUpdateCall R };
        caller = R.sender;
        callee = R.canister_id;
        method_name = R.method_name;
        arg = R.arg;
        transferred_cycles = 0;
        queue = Unordered;
      } · S.messages
```
#### Calls to stopped/stopping/frozen canisters are rejected {#_calls_to_stoppedstoppingfrozen_canisters_are_rejected}

A call to a canister which is stopping, stopped, or frozen is automatically rejected.

The (unspecified) function `freezing_limit(S, cid)` determines the freezing threshold in cycles of the canister with id `cid`, given its current memory footprint, storage cost, memory and compute allocation, and current `freezing_threshold` setting.

Conditions

```html
S.messages = Older_messages · CallMessage CM · Younger_messages
(CM.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ CM.queue)
S.canister_status[CM.callee] = Stopped or S.canister_status[CM.callee] = Stopping or balances[CM.callee] < freezing_limit(S, CM.callee)
```


State after

```html
S.messages = Older_messages · Younger_messages  ·
  ResponseMessage {
      origin = S.call_contexts[CM.call_context].origin
      response = Reject (CANISTER_ERROR, "canister not running");
      refunded_cycles = CM.transferred_cycles;
  }
```


#### Call context creation {#_call_context_creation}

Before invoking a heartbeat or a message to a public entry point, a call context is created for bookkeeping purposes. For these invocations the canister must be running (so not stopped, or stopping). Additionally, these invocations only happen for \"real\" canisters, not the IC management canister.

This "bookkeeping transition" must be immediately followed by the corresponding ["Message execution" transition](#rule-message-execution).

-   Call context creation: Public entry points

    For a message to a public entry point, the method is looked up in the list of exports. This happens for both ingress and inter-canister messages.

    The position of the message in the queue is unchanged.

    Conditions

    :       S.messages = Older_messages · CallMessage CM · Younger_messages
                S.canisters[CM.callee] ≠ EmptyCanister
                S.canister_status[CM.callee] = Running
                balances[CM.callee] ≥ freezing_limit(S, CM.callee) + MAX_CYCLES_PER_MESSAGE
                Ctxt_id ∉ dom S.call_contexts

    State after

    :   S with
                messages =
                  Older_messages ·
                  FuncMessage {
                    call_context = Ctxt_id;
                    receiver = CM.callee;
                    entry_point = PublicMethod CM.method_name CM.caller CM.data
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
                balances[CM.callee] = balances[CM.callee] - MAX_CYCLES_PER_MESSAGE

-   Call context creation: Heartbeat

    If canister `C` exports a method with name `canister_heartbeat`, the IC will create the corresponding call context.

    Conditions

    :       S.canisters[C] ≠ EmptyCanister
                S.canister_status[C] = Running
                balances[C] ≥ freezing_limit(S, C) + MAX_CYCLES_PER_MESSAGE
                Ctxt_id ∉ dom S.call_contexts

    State after

    :   S with
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
                  origin = FromHeartbeat;
                  needs_to_respond = false;
                  deleted = false;
                  available_cycles = 0;
                }
                balances[C] = balances[C] - MAX_CYCLES_PER_MESSAGE

The IC can execute any message that is at the head of its queue, i.e. there is no older message with the same abstract `queue` field. The actual message execution, if successful, may enqueue further messages and --- if the function returns a response --- record this response. The new call and response messages are enqueued at the end.

Note that new messages are executed only if the canister is Running and is not frozen.

#### Message execution {#rule-message-execution}

The transition models the actual execution of a message, whether it is an initial call to a public method or a response. In either case, a call context already exists (see transition "Call context creation").

Conditions
```html
S.messages = Older_messages · FuncMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
S.canisters[M.receiver] ≠ EmptyCanister
Mod = S.canisters[M.receiver].module

Is_response = M.entry_point == Callback _ _ _

Env = {
  time = S.time[M.receiver];
  balance = S.balances[M.receiver]
  freezing_limit = freezing_limit(S, M.receiver);
  certificate = NoCertificate;
  status = S.status[M.receiver];
}

Available = S.call_contexts[M.call_contexts].available_cycles
( M.entry_point = PublicMethod Name Caller Data
  Arg = { data = Data; caller = Caller }
  (F = Mod.update_methods[Name](Arg, Env, Available)
  or
  (F = query_as_update(Mod.query_methods[Name], Arg, Env))
)
or
( M.entry_point = Callback Callback Response RefundedCycles
  F = Mod.callbacks(Callback, Response, RefundedCycles, Env, Available)
)
or
( M.entry_point = Heartbeat
  F = heartbeat_as_update(Mod.heartbeat, Env)
)

R = F(S.canisters[M.receiver].wasm_state)
```


State after
```html
if
  R = Return res
  Cycles_used ≤ (if Is_response then MAX_CYCLES_PER_RESPONSE else MAX_CYCLES_PER_MESSAGE)
  res.cycles_accepted ≤ Available
  New_balance =
      S.balances[M.receiver]
      + res.cycles_accepted
      + (if Is_response then MAX_CYCLES_PER_RESPONSE else MAX_CYCLES_PER_MESSAGE)
      - Cycles_used
      - ∑ [ MAX_CYCLES_PER_RESPONSE + call.transferred_cycles | call ∈ res.new_calls ]
  New_balance > if Is_response then 0 else freezing_limit(S, CM.callee);
  (res.response = NoResponse) or S.call_contexts[M.call_context].needs_to_respond
then
  S with
    canisters[M.receiver].wasm_state = res.new_state;
    messages =
      Older_messages ·
      Younger_messages ·
      [ CallMessage {
          origin = FromCanister {
            call_context = M.call_context;
            callback = call.callback
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

    balances[M.receiver] = New_balance
else
  S with
    messages = Older_messages · Younger_messages
    balances[M.receiver] =
      S.balances[M.receiver]
      + (if Is_response then MAX_CYCLES_PER_RESPONSE else MAX_CYCLES_PER_MESSAGE)
      - Cycles_used
```          

The cycle consumption of executing this message is modeled via the unspecified `Cycles_used` variable.

Depending whether this is a call message and a response messages, we have either set aside `MAX_CYCLES_PER_MESSAGE` or `MAX_CYCLES_PER_RESPONSE`, either in the call context creation rule or the Callback invocation rule.

This transition detects certain behavior that will appear as a trap (and which an implementation may implement by trapping directly in a system call):

-   Responding if the present call context does not need to be responded to

-   Accepting more cycles than are available on the call context

-   Sending out more cycles than available to the canister

-   Consuming more cycles than allowed (and reserved)

If message execution [*traps* (in the sense of a Wasm function)](#define-wasm-fn), the message gets dropped. No response is generated (as some other message may still fulfill this calling context). Any state mutation is discarded.

If message execution [*returns* (in the sense of a Wasm function)](#define-wasm-fn), the state is updated and possible outbound calls and responses are enqueued.

Note that returning does *not* imply that the call associated with this message now *succeeds* in the sense defined in [section responding](#responding); that would require a (unique) call to `ic0.reply`. Note also that the state changes are persisted even when the IC is set to synthesize a [CANISTER_ERROR](#CANISTER_ERROR) reject immediately afterward (which happens when this returns without calling `ic0.reply` or `ic0.reject`, the corresponding call has not been responded to and there are no outstanding callbacks, see [Call context starvation](#rule-starvation)).

The functions `query_as_update` and `heartbeat_as_update` turns a query function resp the heartbeat into an update function; this is merely a notational trick to simplify the rule:

    query_as_update(f, arg, env) = λ wasm_state →
      match f(arg, env)(wasm_state) with
        Trap → Trap
        Return res → Return {
          new_state = wasm_state;
          new_calls = [];
          response = res;
          cycles_accepted = 0;
          new_certified_data = NoCertifiedData;
        }

    heartbeat_as_update(f, env) = λ wasm_state →
      match f(env)(wasm_state) with
        Trap → Trap
        Return wasm_state → Return {
          new_state = wasm_state;
          new_calls = [];
          response = NoResponse;
          cycles_accepted = 0;
          new_certified_data = NoCertifiedData;
        }

Note that by construction, a query function will either trap or return with a response; it will never send calls, and it will never change the state of the canister.

#### Call context starvation {#rule-starvation}

If the call context is not for heartbeat and there is no call, downstream calling context or response that could possibly fulfill a calling context, then a reject is synthesized. The error message below is *not* indicative. In particular, if the IC has an idea about *why* this starved, it can put that in there (e.g. the initial message handler trapped with an out-of-memory access).

Conditions
```html
S.call_contexts[Ctxt_id].needs_to_respond = true
S.call_contexts[Ctxt_id].origin ≠ FromHeartbeat
∀ CallMessage M ∈ S.messages. M.origin.calling_context ≠ Ctxt_id
∀ ResponseMessage M ∈ S.messages. M.origin.calling_context ≠ Ctxt_id
∀ ctxt_ids.
    S.call_contexts[ctxt_ids].needs_to_respond
    ==> S.call_contexts[ctxt_ids].origin.calling_context ≠ Ctxt_id
```


State after

``` html
S with
    call_contexts[Ctxt_id].needs_to_respond = false
    call_contexts[Ctxt_id].available_cycles = 0
    messages =
      S.messages ·
      ResponseMessage {
        origin = S.call_contexts[Ctxt_id].origin;
        response = Reject (CANISTER_ERROR, "starvation");
        refunded_cycles = S.call_contexts[Ctxt_id].available_cycles
      }
```


#### Call context removal {#_call_context_removal}

If there is no call, downstream calling context, or response that references a call context, and the call context has been replied to or the call context corresponds to a heartbeat that had already been executed, then the call context can be removed.

Conditions

```html
(
  S.call_contexts[Ctxt_id].needs_to_respond = false
) or
(
  S.call_contexts[Ctxt_id].origin = FromHeartbeat
  ∀ FuncMessage M ∈ S.messages. M.call_context ≠ Ctxt_id
)
∀ CallMessage M ∈ S.messages. M.origin.calling_context ≠ Ctxt_id
∀ ResponseMessage M ∈ S.messages. M.origin.calling_context ≠ Ctxt_id
∀ ctxt_ids.
    S.call_contexts[ctxt_ids].needs_to_respond = true
    ==> S.call_contexts[ctxt_ids].origin.calling_context ≠ Ctxt_id
```


State after

```html
S with
    call_contexts[Ctxt_id] = (deleted)
```


#### IC Management Canister: Canister creation {#_ic_management_canister_canister_creation}

The IC chooses an appropriate canister id and instantiates a new (empty) canister identified by this id. The *controllers* are set such that the sender of this request is the only controller, unless the `settings` say otherwise. All cycles on this call are now the canister's initial cycles.

This is also when the System Time of the new canister starts ticking.

The `compute_allocation` and `memory_allocation` settings are ignored in this abstract model of the Internet Computer, as it does not address questions of performance or scheduling.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'create_canister'
M.arg = candid()
is_system_assigned CanisterId
CanisterId ∉ dom S.canisters
```


State after

```html
S with
    canisters[CanisterId] = EmptyCanister
    time[CanisterId] = CurrentTime
    if A.settings.controllers is not null:
      controllers[CanisterId] = A.settings.controllers
    else:
      controllers[CanisterId] = [M.caller]
    balances[CanisterId] = M.transferred_cycles
    certified_data[CanisterId] = ""
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Accepted (candid({canister_id = CanisterId}))
        refunded_cycles = 0
      }
    canister_status[CanisterId] = Running
```


This uses the predicate

    is_system_assigned : Principal -> Bool

which characterizes all system-assigned ids.

To avoid clashes with potential user ids or is derived from users or canisters, we require (somewhat handwavy) that

-   `is_system_assigned (mk_self_authenticating_id pk) = false` for possible public keys `pk` and

-   `is_system_assigned (mk_derived_id p dn) = false` for any `p` that could be a user id or canister id.

-   `is_system_assigned p = false` for `|p| > 29`.

#### IC Management Canister: Changing settings {#_ic_management_canister_changing_settings}

Only the controllers of the given canister can update the canister settings.

The `compute_allocation` and `memory_allocation` settings are ignored in this abstract model of the Internet Computer, as it does not address questions of performance or scheduling.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'update_settings'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id]
```


State after

```html
S with
    if A.settings.controllers is not null:
      controllers[A.canister_id] = A.settings.controllers
    if A.settings.freezing_threshold exists:
      freezing_threshold[A.canister_id] = A.settings.freezing_threshold
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Accepted (candid())
        refunded_cycles = M.transferred_cycles
      }
```


#### IC Management Canister: Canister status {#_ic_management_canister_canister_status}

The controllers of a canister can obtain information about the canister.

The `Memory_size` is the (in this specification underspecified) total size of storage in bytes.

The `idle_cycles_burned_per_second` is the idle consumption of resources in cycles per second. Therefore, the freezing threshold in cycles can be obtained using the following formula: `freezing_threshold` (in seconds) \* `idle_cycles_burned_per_second`.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'canister_status'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id]
```


State after

```html
S with
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = candid({
          status = S.canister_status[A.canister_id];
          module_hash =
            if S.canisters[A.canister_id] = EmptyCanister
            then null
            else opt (SHA-265(S.canisters[A.canister_id].raw_module));
          controllers = S.controllers[A.canister_id];
          memory_size = Memory_size;
          cycles = S.balance[A.canister_id];
          freezing_threshold = S.freezing_threshold[A.canister_id];
          idle_cycles_burned_per_second = freezing_limit(S, A.canister_id) / freezing_threshold;
        })
        refunded_cycles = M.transferred_cycles
      }
```


#### IC Management Canister: Code installation {#_ic_management_canister_code_installation}

Only the controllers of the given canister can install code. This transition installs new code over a canister. This involves invoking the `canister_init` method (see [Canister initialization](#system-api-init)), which must succeed.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'install_code'
M.arg = candid(A)
Mod = parse_wasm_mod(A.wasm_module)
  (A.mode = install && S.canisters[A.canister_id] = EmptyCanister)
or A.mode = reinstall
M.caller ∈ S.controllers[A.canister_id]
Arg = {
  data = A.arg;
  caller = M.caller;
}
Env = {
  time = S.time[M.receiver];
  balance = S.balances[M.receiver];
  freezing_limit = freezing_limit(S, M.receiver);
  certificate = NoCertificate;
  status = S.status[M.receiver];
}
Mod.init(A.canister_id, Arg, Env) = Return New_state
```


State after

```html
S with
    canisters[A.canister_id] =
      { wasm_state = New_state; module = Mod; raw_module = A.wasm_module }
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Accepted (candid())
        refunded_cycles = M.transferred_cycles
      }
```


#### IC Management Canister: Code upgrade {#_ic_management_canister_code_upgrade}

Only the controllers of the given canister can install new code. This changes the code of an *existing* canister, preserving the state in the stable memory. This involves invoking the `canister_pre_upgrade` method on the old and `canister_post_upgrade` method on the new canister, which must succeed and must not invoke other methods.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'install_code'
M.arg = candid(A)
Mod = parse_wasm_mod(A.wasm_module)

A.mode = upgrade
S.canisters[A.canister_id] ≠ EmptyCanister
M.caller ∈ S.controllers[A.canister_id]
S.canisters[A.canister_id] = { wasm_state = Old_state; module = Old_module }
Env = {
  time = S.time[M.receiver];
  balance = S.balances[M.receiver];
  freezing_limit = freezing_limit(S, M.receiver);
  certificate = NoCertificate;
  status = S.status[M.receiver];
}
Old_module.pre_upgrade(Old_State, M.caller, Env) = Return Stable_memory
Arg = {
  data = A.arg;
  caller = M.caller;
}
Mod.post_upgrade(A.canister_id, Stable_memory, Arg, Env) = Return New_state
```


State after

```html
S with
    canisters[A.canister_id] =
      { wasm_state = New_state; module = Mod; raw_module = A.wasm_module }
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Accepted (candid())
        refunded_cycles = M.transferred_cycles
      }
```


#### IC Management Canister: Code uninstallation {#rule-uninstall}

Upon uninstallation, the canister is reverted to an empty canister, and all outstanding call contexts are rejected and marked as deleted.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'uninstall_code'
M.arg = candid(A)
M.caller ∈ S.controllers[A.canister_id]
```


State after

```html
S with
    canisters[A.canister_id] = EmptyCanister
    certified_data[A.canister_id] = ""

    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Accepted (candid())
        refunded_cycles = M.transferred_cycles
      } ·
      [ ResponseMessage {
          origin = Ctxt.origin
          response = Reject (CANISTER_REJECT, 'Canister has been uninstalled')
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


#### IC Management Canister: Stopping a canister {#_ic_management_canister_stopping_a_canister}

The controllers of a canister can stop a canister. Stopping a canister goes through two steps. First, the status of the canister is set to `Stopping`; as explained above, a stopping canister rejects all incoming requests and continues processing outstanding responses. When a stopping canister has no more open call contexts, its status is changed to `Stopped` and a response is generated. Note that when processing responses, a stopping canister can make calls to other canisters and thus create new call contexts. In addition, a canister which is stopped, or stopping will accept (and respond) to further `stop_canister` requests.

We encode this behavior via three (types of) transitions:

1.  First, any `stop_canister` call sets the state of the canister to `Stopping`; we record in the status the origin (and cycles) of all `stop_canister` calls which arrive at the canister while it is stopping (or stopped).

2.  Next, when the canister has no open call contexts (so, in particular, all outstanding responses to the canister have been processed), the status of the canister is set to `Stopped`.

3.  Finally, each pending `stop_canister` call (which are encoded in the status) is responded to, to indicate that that the canister is stopped.

    Conditions

    :   

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
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
    S.status[A.canister_id] = Stopping [(M.origin, M.transferred_cycles)]
```


The next two transitions record any additional \'stop_canister\' requests that arrive at a stopping (or stopped) canister in its status.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
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
    S.status[A.canister_id] = Stopping (Origins · (M.origin, M.transferred_cycles))
```


The status of a stopping canister which has no open call contexts is set to `Stopped`, and all pending `stop_canister` calls are replied to.

Conditions

```html
S.canister_status[A.canister_id] = Stopping Origins
∀ Ctxt_id. S.call_contexts[Ctxt_id].canister ≠ A.canister_id
```


State after

```html
S.canister_status[CanisterId] = Stopped
S.messages = Messages ·
    [ ResponseMessage {
        origin = O
        response = Accepted (candid())
        refunded_cycles = C
      }
    | (O, C) ∈ Origins
    ]
```


:::note
Sending a `stop_canister` message to an already stopped canister is acknowledged (i.e. responded with success), but is otherwise a no-op:
:::

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'stop_canister'
M.arg = candid(A)
S.canister_status[A.canister_id] = Stopped
M.caller ∈ S.controllers[A.canister_id]
```


State after

```html
S with
    messages = Older_messages · Younger_messages
    S.messages = Messages ·
        ResponseMessage {
          origin = M.origin
          response = Accepted (candid())
        }
```


#### IC Management Canister: Starting a canister {#_ic_management_canister_starting_a_canister}

The controllers of a canister can start a `stopped` canister. If the canister is already running, the command has no effect on the canister.

Conditions

```html

```
        S.messages = Older_messages · CallMessage M · Younger_messages
        (M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
        M.callee = ic_principal
        M.method_name = 'start_canister'
        M.arg = candid(A)
        S.status[A.canister_id] = Running or S.status[A.canister_id] = Stopped
        M.caller ∈ S.controllers[A.canister_id]

State after

```html
S with
    S.status[A.canister_id] = Running
    messages = Older_messages · Younger_messages ·
        ResponseMessage{
            origin = M.origin
            response = Accepted (candid())
            refunded_cycles = M.transferred_cycles
        }
```


If the status of the canister was \'stopping\', then the canister status is set to `running`. The pending `stop_canister` request(s) are rejected.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'start_canister'
M.arg = candid(A)
S.status[A.canister_id] = Stopping Origins
M.caller ∈ S.controllers[A.canister_id]
```


State after

```html
S with
    S.status[A.canister_id] = Running
    messages = Older_messages · Younger_messages ·
        ResponseMessage{
            origin = M.origin
            response = Accepted (candid())
            refunded_cycles = M.transferred_cycles
        } ·
        [ ResponseMessage {
            origin = O
            response = Reject (CANISTER_REJECT, 'Canister has been restarted')
            refunded_cycles = C
          }
        | (O, C) ∈ Origins
        ]
```


#### IC Management Canister: Canister deletion {#_ic_management_canister_canister_deletion}

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'delete_canister'
M.arg = candid(A)
S.canister_status[A.canister_id] = stopped
M.caller ∈ S.controllers[A.canister_id]
```


State after

```html
S with
    canisters[CanisterId] = (deleted)
    controllers[CanisterId] = (deleted)
    canister_status[CanisterId] = (deleted)
    time[CanisterId] = (deleted)
    balances[CanisterId] = (deleted)
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Accepted (candid())
        refunded_cycles = M.transferred_cycles
      }
```


#### IC Management Canister: Depositing cycles {#_ic_management_canister_depositing_cycles}

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'deposit_cycles'
M.arg = candid(A)
Cycle_cost ≤ S.balances[A.canister_id] + M.transferred_cycles
```


State after

```html
S with
    balances[CanisterId] =
      S.balances[A.canister_id] + M.transferred_cycles
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Accepted (candid())
        refunded_cycles = 0
      }
```


#### IC Management Canister: Random numbers {#_ic_management_canister_random_numbers}

The management canister can produce pseudo-random bytes. It always returns a 32-byte `blob`:

The precise guarantees around the randomness, e.g. unpredictability, are not captured in this formal semantics.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
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
        response = Accepted (candid(B))
        refunded_cycles = M.transferred_cycles
      }
```


#### IC Management Canister: Canister creation with cycles {#_ic_management_canister_canister_creation_with_cycles}

This is a variant of `create_canister`, which sets the initial cycle balance based on the `amount` argument.

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'provisional_create_canister_with_cycles'
M.arg = candid(A)
is_system_assigned CanisterId
CanisterId ∉ dom S.canisters
```


State after

```html
S with
    canisters[CanisterId] = EmptyCanister
    time[CanisterId] = CurrentTime
    controllers[CanisterId] = [M.caller]
    balances[CanisterId] = A.amount
    certified_data[CanisterId] = ""
    messages = Older_messages · Younger_messages ·
      ResponseMessage {
        origin = M.origin
        response = Accepted (candid({canister_id = CanisterId}))
        transferred_cycles = M.transferred_cycles
      }
    canister_status[CanisterId] = Running
```


#### IC Management Canister: Top up canister {#_ic_management_canister_top_up_canister}

Conditions

```html
S.messages = Older_messages · CallMessage M · Younger_messages
(M.queue = Unordered) or (∀ msg ∈ Older_messages. msg.queue ≠ M.queue)
M.callee = ic_principal
M.method_name = 'provisional_top_up_canister'
M.arg = candid(A)
A.canister_id ∈ dom S.canisters
```


State after

```html
S with
    balances[CanisterId] = balances[CanisterId] + A.amount
```


#### Callback invocation {#_callback_invocation}

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
```


State after

```html
S with
    balances[S.call_contexts[Ctxt_id].canister] =
      balances[S.call_contexts[Ctxt_id].canister] + RM.refunded_cycles
    messages =
      Older_messages ·
      FuncMessage {
        call_context = Ctxt_id
        receiver = C
        entry_point = Callback Callback FM.response RM.refunded_cycles
        queue = Unordered
      } ·
      Younger_messages
```


If the responded call context does not exist anymore, because the canister has been uninstalled since, the refundend cycles are still added to the canister balance, but no function invocation is enqueued:

Conditions

```html
S.messages = Older_messages · ResponseMessage RM · Younger_messages
RM.origin = FromCanister {
    call_context = Ctxt_id
    callback = Callback
  }
S.call_contexts[Ctxt_id].deleted
```


State after

```html
S with
    balances[S.call_contexts[Ctxt_id].canister] =
      balances[S.call_contexts[Ctxt_id].canister] + RM.refunded_cycles + MAX_CYCLES_PER_RESPONSE
    messages = Older_messages · Younger_messages
```


#### Respond to user request {#_respond_to_user_request}

When an ingress method call has been responded to, we can record the response in the list of queries.

Conditions

```html
S.requests[M] = Processing
S.messages = Older_messages · ResponseMessage RM · Younger_messages
RM.origin = FromUser { request = M }
```


State after

```html
S with
    messages = Older_messages · Younger_messages
    requests[M] =
      | Replied R   if response = Reply R
      | Rejected R  if response = Reject R
```


NB: The refunded cycles, `RM.refunded_cycles` are, by construction, empty.

#### Request clean up {#_request_clean_up}

The IC will keep the data for a completed or rejected request around for a certain, implementation defined amount of time, to allow users to poll for the data. After that time, the data of the request will be dropped:

Conditions

```html
(S.requests[M] = Replied _) or (S.requests[M] = Rejected _)
```


State after

```html
S with
    requests[M] = Done
```


At the same or some later point, the request will be removed from the state of the IC. This must happen no earlier than the ingress expiry time set in the request.

Conditions

```html
(S.requests[M] = Replied _) or (S.requests[M] = Rejected _) or (S.requests[M] = Done)
M.ingress_expiry < S.system_time
```


State after

```html
S with
    requests[M] = (deleted)
```


#### Canister out of cycles {#_canister_out_of_cycles}

Once a canister runs out of cycles, its code is uninstalled (cf. [IC Management Canister: Code uninstallation](#rule-uninstall)) and the allocations are set to zero (NB: allocations are currently not modeled in the formal model):

Conditions

```html
S.balances[CanisterId] = 0
```


State after

```html
S with
    canisters[CanisterId] = EmptyCanister
    certified_data[A.canister_id] = ""

    messages = Older_messages · Younger_messages ·
      [ ResponseMessage {
          origin = Ctxt.origin
          response = Reject (CANISTER_REJECT, 'Canister has been uninstalled')
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


#### Time progressing and cycle consumption {#_time_progressing_and_cycle_consumption}

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


The canister cycle balance similarly depletes at an unspecified rate, but stays non-negative:

Conditions

```html
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


#### Query call {#_query_call}

Canister query calls to `/api/v2/canister/<ECID>/query` can be executed directly. They can only be executed against canisters which are `Running`.

During the execution of a query call, a certificate is provided to the canister that is valid, contains a current state tree (or "recent enough"; the specification is currently vague about how old the certificate may be) and reveals the canister's [Certified Data](#system-api-certified-data).

Submitted request

`E`

Conditions

```html
E.content = CanisterQuery Q
Q.canister_id ∈ verify_envelope(E, Q.sender, S.system_time)
is_effective_canister_id(E.content, ECID)
S.system_time <= Q.ingress_expiry
S.canisters[Q.canister_id] ≠ EmptyCanister
S.canister_status[Q.canister_id] = Running
C = S.canisters[Q.canister_id]
F = C.module.query_methods[Q.method_name]
Arg = {
  data = Q.arg;
  caller = Q.sender;
}
verify_cert(Cert)
lookup(["canister",Q.canister_id,"certified_data"], Cert) = Found S.certified_data[Q.canister_id]
lookup(["time"], Cert) = Found S.system_time // or “recent enough”
Env = {
  time = S.time[Q.receiver];
  balance = S.balances[Q.canister_id];
  freezing_limit = freezing_limit(S, Q.canister_id);
  certificate = Cert;
  status = S.status[Q.receiver];
}
```


Read response

    -   If `F(Arg, Env) = Trap` then

            {status: failed; error: "Query execution trapped"}

    -   Else if `F(Arg, Env) = Return (Reject (code, msg))` then

            {status: rejected; reject_code: <code>: reject_message: <msg>}

    -   Else if `F(Arg, Env) = Return (Reply R)` then

            {status: success; reply: { arg :  <R> } }

#### Certified state reads {#_certified_state_reads}

The user can read elements of the *state tree*, using a `read_state` request to `/api/v2/canister/<ECID>/read_state`.

Submitted request

`E`

Conditions

```html
E.content = ReadState RS
TS = verify_envelope(E, RS.sender, S.system_time)
S.system_time <= RS.ingress_expiry
∀ path ∈ RS.paths. may_read_path(S, R.sender, path)
∀ ["request_status", Rid] · _ ∈ RS.paths.  ∃ R ∈ S.requests ∧ hash_of_map(R) = Rid ∧ R.canister_id ∈ TS
```


Read response

:   A record with

    -   `{certificate: C}`

The predicate `may_read_path` is defined as follows, implementing the access control outlined in [Request: Read state](#http-read-state):

    may_read_path(S, _, ["time"]) = True
    may_read_path(S, _, ["request_status", Rid] · _) =
      if ∃ R ∈ S.requests ∧ hash_of_map(R) = Rid
      then RS.sender == R.sender ∧ is_effective_canister_id(R, ECID)
      else True
    may_read_path(S, _, ["canister", cid, "module_hash"]) = cid == ECID
    may_read_path(S, _, ["canister", cid, "controllers"]) = cid == ECID
    may_read_path(S, _, ["canister", cid, "metadata", name]) =
      if name ∈ S.canisters[cid].public_custom_sections
      then cid == ECID
      else if name ∈ S.canisters[cid].private_custom_sections
      then cid == ECID ∧ RS.sender ∈ S.controllers[cid]
      else False
    may_read_path(S, _, _) = False

The response is a certificate `cert`, as specified in [Certification](#certification), which passes `verify_cert` (assuming `S.root_key` as the root of trust), and where for every `path` documented in [The system state tree](#the-system-state-tree) that is a suffix of a path in `RS.paths` or of `["time"]`, we have

    lookup(path, cert) = lookup_in_tree(path, state_tree(S))

where `state_tree` constructs the a labeled tree from the IC state `S` and the (so far underspecified) set of subnets `subnets`, as per [The system state tree](#the-system-state-tree)

    state_tree(S) = {
      "time": S.system_time;
      "request_id": { request_id(R): request_status_tree(S) | (R ↦ S) ∈ S.requests };
      "canister":
        { canister_id :
            { "module_hash" : SHA256(C.raw_module) | if C ≠ EmptyCanister } ∪
            { "controllers" : CBOR(S.controllers[canister_id]) } ∪
            { "metadata": { name: blob | (name, blob) ∈ S.canisters[canister_id].public_custom_sections ∪ S.canisters[canister_id].private_custom_sections } }
        | (canister_id, C) ∈ S.canisters };
      "subnet": { subnet_id : { "public_key" : pub } | (subnet_id, subnet_pk) ∈ subnets };
    }

    request_status_tree(Received) =
      { "status": "received" }
    request_status_tree(Processing) =
      { "status": "processing" }
    request_status_tree(Rejected (code,msg)) =
      { "status": "rejected"; "reject_code": code; "reject_message": msg }
    request_status_tree(Replied arg) =
      { "status": "replied"; "reply": arg }
    request_status_tree(Done) =
      { "status": "Done" }

and where `lookup_in_tree` is a function that returns the value or `Absent` as appropriately.

### Abstract Canisters to System API {#concrete-canisters}

In Section [Abstract canisters](#abstract-canisters) we introduced an abstraction over the interface to a canister, to avoid cluttering the abstract specification of the Internet Computer from WebAssembly details. In this section, we will fill the gap and explain how the abstract canister interface maps to the [concrete System API](#system-api) and the WebAssembly concepts as defined in the [WebAssembly specification](https://webassembly.github.io/spec/core/index.html).

#### The concrete `WasmState` {#_the_concrete_wasmstate}

The abstract `WasmState` above models the WebAssembly *store* `S`, which encompasses the functions, tables, memories and globals of the WebAssembly program, plus additional data maintained by the IC, such as the stable memory:

    WasmState = {
      store : S; // a store as per WebAssembly spec
      self_id : CanId;
      stable_mem : Blob
    }

As explained in Section "[WebAssembly module requirements](#system-api-module)", the WebAssembly module imports at most *one* memory and at most *one* table; in the following, *the* memory (resp. table) and the fields `mem` and `table` of `S` refer to that. Any system call that accesses the memory (resp. table) will trap if the module does not import the memory (resp. table).

We model `mem` as an array of bytes, and `table` as an array of execution functions.

The abstract `Callback` type above models an entry point for responses:

    Closure = {
        fun   : i32,
        env   : i32,
    }

    Callback = {
      on_reply : Closure;
      on_reject : Closure;
      on_cleanup : Closure | NoClosure;
    }

#### The execution state {#_the_execution_state}

We can model the execution of WebAssembly functions as stateful functions that have access to the WebAssembly store. In order to also model the behavior of the system imports, which have access to additional data structures, we extend the state as follows:

    Params = {
      data : NoData | Blob;
      caller : NoCaller | Principal;
      reject_code : 0 | SYS_FATAL | SYS_TRANSIENT | …;
      reject_message : Text;
      sysenv : Env;
      cycles_refunded : Nat;
      method_name : Text;
    }
    ExecutionState = {
      wasm_state : WasmState;
      params : Params;
      response : NoResponse | Response;
      cycles_accepted : Nat;
      cycles_available : Nat;
      balance : Funds;
      reply_params : { arg : Blob };
      pending_call : MethodCall | NoPendingCall;
      calls : List MethodCall;
      new_certified_data : NoCertifiedData | Blob;
      ingress_filter : Accept | Reject;
    }

This allows us to model WebAssembly functions, including host-provided imports, as functions with implicit mutable access to an `ExecutionState`, dubbed *execution functions*. Syntactically, we express this using an implicit argument of type `ref ExecutionState` in angle brackets (e.g. `func<es>(x)` for the invocation of a WebAssembly function with type `(x : i32) -> ()`). The lifetime of the `ExecutionState` data structure is that of one such function invocation.

:::note
It is nonsensical to pass to an execution function a WebAssembly store `S` that comes from a different WebAssembly module than one defining the function.
:::

#### The concrete `CanisterModule` {#_the_concrete_canistermodule}

Finally we can specify the abstract `CanisterModule` that models a concrete WebAssembly module.

-   The `initial_wasm_store` mentioned below is the store of the WebAssembly module after *instantiation* (as per WebAssembly spec) of the WasmModule contained in the [canister module](#canister-module-format), including executing a potential `(start)` function.

-   For more convenience when creating a new `ExecutionState`, we define the following partial records:

        empty_params = {
          data = NoData;
          caller = NoCaller;
          reject_code = 0;
          reject_message = "";
          cycles_refunded = 0;
        }

        empty_execution_state = {
          wasm_state = (undefined);
          params = (undefined);
          response = NoResponse;
          cycles_accepted = 0;
          cycles_available = 0;
          balance = 0;
          reply_params = { arg = "" };
          pending_call = NoPendingCall;
          calls = [];
          new_certified_data = NoCertifiedData;
          ingress_filter = Reject;
        }

-   The `init` field of the `CanisterModule` is defined as follows:

    If the WebAssembly module does not export a function called under the name `canister_init`, then the argument blob is ignored and the `initial_wasm_store` is returned:

        init = λ (self_id, arg, sysenv) →
          Return { store = initial_wasm_store; self_id = self_id; stable_mem = "" }

    Otherwise, if the WebAssembly module exports a function `func` under the name `canister_init`, it is

        init = λ (self_id, arg, sysenv) →
          let es = ref {empty_execution_state with
              wasm_state = { store = initial_wasm_store; self_id = self_id; stable_mem = "" }
              params = empty_params with { data = arg.data; caller = arg.caller; sysenv }
              balance = sysenv.balance
            }
          try func<es>() with Trap then Trap
          if es.performed_calls ≠ [] then Trap
          if es.response ≠ NoResponse then Trap
          if es.ingress_filter ≠ Reject then Trap
          Return es.wasm_state

    This formulation checks afterwards that the system calls `call.perform` or `msg.reply` were not invoked; an implementation can of course trap as soon as these system calls are invoked.

-   The `pre_upgrade` field of the `CanisterModule` is defined as follows:

    If the WebAssembly module does not export a function called under the name `canister_pre_upgrade`, then it simply returns the stable memory:

        pre_upgrade = λ (old_state, caller, sysenv) → Return old_state.stable_mem

    Otherwise, if the WebAssembly module exports a function `func` under the name `canister_pre_upgrade`, it is

        pre_upgrade = λ (old_state, caller, sysenv) →
          let es = ref {empty_execution_state with
              wasm_state = old_state
              params = { empty_params with caller = caller; sysenv }
              balance = sysenv.balance
            }
          try func<es>() with Trap then Trap
          if es.performed_calls ≠ [] then Trap
          if es.response ≠ NoResponse then Trap
          if es.ingress_filter ≠ Reject then Trap
          Return es.wasm_state.stable_mem

-   The `post_upgrade` field of the `CanisterModule` is defined as follows:

    If the WebAssembly module does not export a function called under the name `canister_post_upgrade`, then the argument blob is ignored and the `initial_wasm_store` is returned:

        post_upgrade = λ (self_id, stable_mem, arg, sysenv) →
          Return { store = initial_wasm_store; self_id = self_id; stable_mem = stable_mem }

    Otherwise, if the WebAssembly module exports a function `func` under the name `canister_post_upgrade`, it is

        post_upgrade = λ (self_id, stable_mem, arg, sysenv) →
          let es = ref {empty_execution_state with
              wasm_state = { store = initial_wasm_store; self_id = self_id; stable_mem = stable_mem }
              params = { empty_params with data = arg.data; caller = arg.caller; sysenv }
              balance = sysenv.balance
            }
          try func<es>() with Trap then Trap
          if es.performed_calls ≠ [] then Trap
          if es.response ≠ NoResponse then Trap
          if es.ingress_filter ≠ Reject then Trap
          Return es.wasm_state

-   The partial map `update_methods` of the `CanisterModule` is defined for all method names `method` for which the WebAssembly program exports a function `func` named `canister_update <method>`, and has value

        update_methods[method] = λ (arg, sysenv, available) → λ wasm_state →
          let es = ref {empty_execution_state with
              wasm_state = wasm_state;
              params = empty_params with { data = arg.data; caller = arg.caller; sysenv }
              balance = sysenv.balance
              cycles_available = arg.cycles;
            }
          try func<es>() with Trap then Trap
          if es.ingress_filter ≠ Reject then Trap
          Return {
            new_state = es.wasm_state;
            new_calls = es.calls;
            response = es.response;
            cycles_accepted = es.cycles_accepted;
            new_certified_data = es.new_certified_data
          }

-   The partial map `query_methods` of the `CanisterModule` is defined for all method names `method` for which the WebAssembly program exports a function `func` named `canister_query <method>`, and has value

        query_methods[method] = λ (arg, sysenv) → λ wasm_state →
          let es = ref {empty_execution_state with
              wasm_state = wasm_state;
              params = empty_params with { data = arg.data; caller = arg.caller; sysenv }
              balance = sysenv.balance
            }
          try func<es>() with Trap then Trap
          if es.cycles_accepted ≠ 0 then Trap
          if es.calls ≠ () then Trap
          if es.ingress_filter ≠ Reject then Trap
          if es.response = NoResponse then Trap
          Return es.response;

    This formulation checks afterwards that the system call `ic0.call_perform` was not invoked; an implementation can of course trap already when these system calls have been invoked.

    By construction, the (possibly modified) `es.wasm_state` is discarded.

-   The function `heartbeat` of the `CanisterModule` is defined if the WebAssembly program exports a function `func` named `canister_heartbeat`, and has value

        heartbeat = λ (sysenv) → λ wasm_state →
          let es = ref {empty_execution_state with
            wasm_state = wasm_state;
            params = empty_params with { data = NoData; caller = NoCaller; sysenv }
            balance = sysenv.balance
          }
          try func<es>() with Trap then Trap
          if es.cycles_accepted ≠ 0 then Trap
          if es.ingress_filter ≠ Reject then Trap
          if es.response ≠ NoResponse then Trap
          Return es.wasm_state;

    otherwise it is

```html
heartbeat = λ (sysenv) → λ wasm_state → Trap
```


-   The function `callbacks` of the `CanisterModule` is defined as follows

        callbacks = λ(callbacks, response, refunded_cycles, sysenv, available) → λ wasm_state →
          let params0 = { empty_params with
            sysenv
            cycles_refunded = refund_cycles;
          }
          let (fun, env, params) = match response with
            Reply data ->
              (callbacks.on_reply.fun, callbacks.on_reply.env,
                { params0 with data})
            Reject (reject_code, reject_message)->
              (callbacks.on_reject.fun, callbacks.on_reject.env,
                { params0 with reject_code; reject_message})
          try
            if fun > |es.wasm_state.store.table| then Trap
            let func = es.wasm_state.store.table[fun]
            if typeof(func) ≠ func (i32) -> () then Trap

            let es = ref {empty_execution_state with
              wasm_state = wasm_state;
              params = params;
              balance = sysenv.balance;
              cycles_available = available;
            }
            func<es>(env)
            Return {
              new_state = es.wasm_state;
              new_calls = es.calls;
              response = es.response;
              cycles_accepted = es.cycles_accepted;
              new_certified_data = es.certified_data;
            }
          with Trap
            if callbacks.on_cleanup = NoClosure then Trap
            if callbacks.on_cleanup.fun > |es.wasm_state.store.table| then Trap
            let func = es.wasm_state.store.table[callbacks.on_cleanup.fun]
            if typeof(func) ≠ func (i32) -> () then Trap

            let es = ref { empty_execution_state with
              wasm_state;
            }
            func<es>(callbacks.on_cleanup.env)
            Return {
              new_state = es.wasm_state;
              new_calls = [];
              response = NoResponse;
              cycles_accepted = 0;
            }

    Note that if the initial callback handler traps, the cleanup callback (if present) is executed, and the canister has the chance to update its state.

-   The `inspect_message` field of the `CanisterModule` is defined as follows.

    If the WebAssembly module does not export a function called under the name `canister_inspect_message`, then access is always granted:

        inspect_message = λ (method_name, wasm_state, arg, sysenv) →
          Return Accept

    Otherwise, if the WebAssembly module exports a function `func` under the name `canister_inspect_message`, it is

        inspect_message = λ (method_name, wasm_state, arg, sysenv) →
          let es = ref {empty_execution_state with
              wasm_state = wasm_state;
              params = empty_params with {
                data = arg.data;
                caller = arg.caller;
                method_name = arg.method_name;
                sysenv
              }
              balance = sysenv.balance;
              cycles_available = 0; // ingress requests have no funds
            }
           try func<es>() with Trap then Trap
           if es.calls ≠ () then Trap
           if es.response ≠ NoResponse then Trap
           Return es.ingress_filter;

#### Helper functions {#_helper_functions}

In the following section, we use the these helper functions

    copy_to_canister<es>(dst : i32, offset : i32, size : i32, data : blob) =
      if offset+size > |data| then Trap
      if dst+size > |es.wasm_state.store.mem| then Trap
      es.wasm_state.store.mem[dst..dst+size] := data[offset..offset+size]

    copy_from_canister<es>(src : i32, size : i32) blob =
      if src+size > |es.wasm_state.store.mem| then Trap
      return es.wasm_state.store.mem[src..src+size]

Cycles are represented by 128-bit values so they require 16 bytes of memory.

    copy_cycles_to_canister<es>(dst : i32, data : blob) =
     let size = 16;
     if dst+size > |es.wasm_state.store.mem| then Trap
      es.wasm_state.store.mem[dst..dst+size] := data[0..size]

#### System imports {#_system_imports}

Upon *instantiation* of the WebAssembly module, we can provide the following functions as imports.

The pseudo-code below does *not* explicitly enforce the restrictions of which imports are available in which contexts; for that the table in [Overview of imports](#system-api-imports) is authoritative, and is assumed to be part of the implementation.

    ic0.msg_arg_data_size<es>() : i32 =
      return |es.params.arg|

    ic0.msg_arg_data_copy<es>(dst:i32, offset:i32, size:i32) =
      copy_to_canister<es>(dst, offset, size, es.param.arg)

    ic0.msg_caller_size() : i32 =
      return |es.params.caller|

    ic0.msg_caller_copy(dst:i32, offset:i32, size:i32) : i32 =
      copy_to_canister<es>(dst, offset, size, es.params.caller)

    ic0.msg_reject_code<es>() : i32 =
      es.params.reject_code

    ic0.msg_reject_msg_size<es>() : i32 =
      return |es.params.reject_msg|

    ic0.msg_reject_msg_copy<es>(dst:i32, offset:i32, size:i32) : i32 =
      copy_to_canister<es>(dst, offset, size, es.params.reject_msg)

    ic0.msg_reply_data_append<es>(src : i32, size : i32) =
      if es.response ≠ NoResponse then Trap
      es.reply_params.arg := es.reply_params.arg · copy_from_canister<es>(src, size)

    ic0.msg_reply<es>() =
      if es.response ≠ NoResponse then Trap
      es.response := Reply (es.reply_params.arg)
      es.cycles_available := 0

    ic0.msg_reject<es>(src : i32, size : i32) =
      if es.response ≠ NoResponse then Trap
      es.response := Reject (CANISTER_REJECT, copy_from_canister<es>(src, size))
      es.cycles_available := 0

    ic0.msg_cycles_available<es>() : i64 =
      if es.cycles_available >= 2^64 then Trap
      return es.cycles_available

    ic0.msg_cycles_available128<es>(dst : i32) =
      let amount = es.cycles_available
      copy_cycles_to_canister<es>(dst, amount.to_little_endian_bytes())

    ic0.msg_cycles_refunded<es>() : i64 =
      if es.params.cycles_refunded >= 2^64 then Trap
      return es.params.cycles_refunded

    ic0.msg_cycles_refunded128<es>(dst : i32) =
      let amount = es.params.cycles_refunded
      copy_cycles_to_canister<es>(dst, amount.to_little_endian_bytes())

    ic0.accept_message<es>() =
      if es.ingress_filter = Accept then Trap
      es.ingress_filter = Accept

    ic0.msg_method_name_size<es>() : i32 =
      return |es.method_name|

    ic0.msg_method_name_copy<es>(dst : i32, offset : i32, size : i32) : i32 =
      copy_to_canister<es>(dst, offset, size, es.params.method_name)

    ic0.msg_cycles_accept<es>(max_amount : i64) : i64 =
      let amount = min(max_amount, es.cycles_available)
      es.cycles_available := es.cycles_available - amount
      es.cycles_accepted := es.cycles_accepted + amount
      es.balance := es.balance + amount
      return amount

    ic0.msg_cycles_accept128<es>(max_amount_high : i64, max_amount_low : i64, dst : i32) =
      let max_amount = max_amount_high * 2^64 + max_amount_low
      let amount = min(max_amount, es.cycles_available)
      es.cycles_available := es.cycles_available - amount
      es.cycles_accepted := es.cycles_accepted + amount
      es.balance := es.balance + amount
      copy_cycles_to_canister<es>(dst, amount.to_little_endian_bytes())

    ic0.canister_self_size<es>() : i32 =
      return |es.wasm_state.self_id|

    ic0.canister_self_copy<es>(dst:i32, offset:i32, size:i32) =
      copy_to_canister<es>(dst, offset, size, es.wasm_state.self_id)

    ic0.canister_cycle_balance<es>() : i64 =
      if es.balance >= 2^64 then Trap
      return es.balance

    ic0.canister_cycles_balance128<es>(dst : i32) =
      let amount = es.balance
      copy_cycles_to_canister<es>(dst, amount.to_little_endian_bytes())

    ic0.canister_status<es>() : i32 =
      match es.params.sysenv.canister_status with
        Running  -> return 1
        Stopping -> return 2
        Stopped  -> return 3

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
      discard_pending_call<es>()

      if es.balance < MAX_CYCLES_PER_RESPONSE then Trap
      es.balance := es.balance - MAX_CYCLES_PER_RESPONSE

      callee := copy_from_canister<es>(callee_src, callee_size);
      method_name := copy_from_canister<es>(name_src, name_size);

      if reply_fun > |es.wasm_state.store.table| then Trap
      if typeof(es.wasm_state.store.table[reply_fun]) ≠ func (anyref, i32) -> () then Trap

      if reject_fun > |es.wasm_state.store.table| then Trap
      if typeof(es.wasm_state.store.table[reject_fun]) ≠ func (anyref, i32) -> () then Trap

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

    ic0.call_data_append<es> (src : i32, size : i32) =
      if es.pending_call = NoPendingCall then Trap
      es.pending_call.arg := es.pending_call.arg · copy_from_canister<es>(src, size)

    ic0.call_on_cleanup<es> (fun : i32, env : i32) =
      if fun > |es.wasm_state.store.table| then Trap
      if typeof(es.wasm_state.store.table[fun]) ≠ func (anyref, i32) -> () then Trap
      if es.pending_call = NoPendingCall then Trap
      if es.pending_call.callback.on_cleanup ≠ NoClosure then Trap
      es.pending_call.callback.on_cleanup := Closure { fun = fun; env = env}

    ic0.call_cycles_add<es>(amount : i64) =
      if es.pending_call = NoPendingCall then Trap
      if es.balance < amount then Trap

      es.balance := es.balance - amount
      es.pending_call.transferred_cycles := es.pending_call.transferred_cycles + amount

    ic0.call_cycles_add128<es>(amount_high : i64, amount_low : i64) =
      let amount = amount_high * 2^64 + amount_low
      if es.pending_call = NoPendingCall then Trap
      if es.balance < amount then Trap

      es.balance := es.balance - amount
      es.pending_call.transferred_cycles := es.pending_call.transferred_cycles + amount

    ic0.call_peform<es>() : ( err_code : i32 ) =
      if es.pending_call = NoPendingCall then Trap

      // are we below the threezing threshold?
      // Or maybe the system has other reasons to not perform this
      if es.balance < es.env.freezing_limit or system_cannot_do_this_call_now()
      then
        discard_pending_call<es>()
        return 1
      or
        es.calls := es.calls · es.pending_call
        es.pending_call := NoPendingCall
        return 0

    // helper function
    discard_pending_call<es>() =
      if es.pending_call ≠ NoPendingCall then
        es.balance := es.balance + MAX_CYCLES_PER_RESPONSE + es.pending_call.transferred_cycles
        es.pending_call := NoPendingCall

    ic0.stable_size<es>() : (page_count : i32) =
      if |es.wasm_state.store.mem| > 2^32 then Trap
      page_count := |es.wasm_state.stable_mem| / 64k
      return page_count

    ic0.stable_grow<es>(new_pages : i32) : (old_page_count : i32) =
      if |es.wasm_state.store.mem| > 2^32 then Trap
      if arbitrary() then return -1
      else
        old_size := |es.wasm_state.stable_mem| / 64k
        if old_size + new_pages > 2^16 then return -1
        es.wasm_state.stable_mem :=
          es.wasm_state.stable_mem · repeat(0x00, new_pages * 64k)
        return old_size

    ic0.stable_write<es>(offset : i32, src : i32, size : i32)
      if |es.wasm_state.store.mem| > 2^32 then Trap
      if src+size > |es.wasm_state.store.mem| then Trap
      if offset+size > |es.wasm_state.stable_mem| then Trap

      es.wasm_state.stable_mem[offset..offset+size] := es.wasm_state.store.mem[src..src+size]

    ic0.stable_read<es>(dst : i32, offset : i32, size : i32)
      if |es.wasm_state.store.mem| > 2^32 then Trap
      if offset+size > |es.wasm_state.stable_mem| then Trap
      if dst+size > |es.wasm_state.store.mem| then Trap

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
      if src+size > |es.wasm_state.store.mem| then Trap
      if offset+size > |es.wasm_state.stable_mem| then Trap

      es.wasm_state.stable_mem[offset..offset+size] := es.wasm_state.store.mem[src..src+size]

    ic0.stable64_read<es>(dst : i64, offset : i64, size : i64)
      if offset+size > |es.wasm_state.stable_mem| then Trap
      if dst+size > |es.wasm_state.store.mem| then Trap

      es.wasm_state.store.mem[offset..offset+size] := es.wasm_state.stable.mem[src..src+size]

    ic0.time<es>() : i32 =
      return es.params.time

    ic0.certified_data_set<es>(src: i32, size: i32) =
      es.new_certified_data := es.wasm_state[src..src+size]

    ic0.data_certificate_present<es>() : i32 =
      if es.params.sysenv.certificate = NoCertificate
      then return 0
      else return 1

    ic0.data_certificate_size<es>() : i32 =
      if es.params.sysenv.certificate = NoCertificate then Trap
      return |es.params.sysenv.certificate|

    ic0.data_certificate_copy<es>(dst: i32, offset: i32, size: i32) =
      if es.params.sysenv.certificate = NoCertificate then Trap
      copy_to_canister<es>(dst, offset, size, es.params.sysenv.certificate)

    ic0.performance_counter<es>(type : i32) : i64 =
      arbitrary()

    ic0.debug_print<es>(src : i32, size : i32) =
      return

    ic0.trap<es>(src : i32, size : i32) =
      Trap

<Changelog/>