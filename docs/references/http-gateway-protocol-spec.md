# The HTTP Gateway Protocol Specification

## Introduction

The HTTP Gateway Protocol is an extension of the Internet Computer Protocol that allows conventional HTTP clients to interact with the Internet Computer network. This is important for software such as web browsers to be able to fetch and render client-side canister code, including HTML, CSS, and JavaScript as well as other static assets such as images or videos. The HTTP Gateway does this by translating between standard HTTP requests and [API canister calls](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-interface) that the Internet Computer Protocol will understand.

Such an HTTP Gateway could be a stand-alone proxy, it could be implemented in web browsers (natively, via a plugin or a service worker) or in other ways. This document describes the interface and semantics of this protocol independent of a concrete HTTP Gateway so that all HTTP Gateway Protocol implementations can be compatible.

## Overview

An HTTP request by an HTTP client is handled by these steps:

1. An HTTP client makes a request.
2. The HTTP Gateway intercepts the request.
3. The HTTP Gateway resolves the canister ID that the request is intended for.
4. The HTTP Gateway Candid encodes the HTTP request.
5. The HTTP Gateway invokes the canister via a query call to the `http_request` canister method.
6. The canister handles the request and returns an HTTP response, encoded in Candid.
7. The HTTP Gateway Candid decodes the response for inspection and further processing.
8. If requested by the canister, the HTTP Gateway sends the request again via an update call to `http_request_update`.
9. If applicable, the HTTP Gateway fetches further response body data via streaming query calls.
10. If applicable, the HTTP Gateway validates the certificate of the response.
11. The HTTP Gateway returns the decoded response to the HTTP client.

## Canister ID Resolution

The HTTP Gateway needs to know the canister ID of the canister to talk to, and obtains that information from the hostname as follows:

1. If the hostname is in the following table, use the given canister ids:

   | Hostname             | Canister id                   |
   | -------------------- | ----------------------------- |
   | `identity.ic0.app`   | `rdmx6-jaaaa-aaaaa-aaadq-cai` |
   | `nns.ic0.app`        | `qoctq-giaaa-aaaaa-aaaea-cai` |
   | `dscvr.one`          | `h5aet-waaaa-aaaab-qaamq-cai` |
   | `dscvr.ic0.app`      | `h5aet-waaaa-aaaab-qaamq-cai` |
   | `personhood.ic0.app` | `g3wsl-eqaaa-aaaan-aaaaa-cai` |

2. Check whether the hostname is _raw_ (e.g., `<name>.raw.ic0.app`). If it is the case, fail and handle the request as a Web2 request, otherwise, continue.

3. Check whether the canister ID is embedded in the hostname by splitting the hostname and finding the first occurrence of a valid canister ID from the right. If there is a canister ID embedded in the hostname, use it.

4. Check whether the canister is hosted on the IC using a custom domain. There are two options:

   - Check whether there is a TXT record containing a canister ID at the `_canister-id`-subdomain (e.g., to see whether `foo.com` is hosted on the IC, make a DNS lookup for the TXT record of `_canister-id.foo.com`) and use the specified canister ID;

   - Make a `HEAD` request to the hostname. If the response contains an `x-ic-canister-id` header, use the value of this header as the canister ID.

5. Else fail and handle the request as a Web2 request.

If the hostname was of the form `<name>.ic0.app`, it is a _safe_ hostname; if it was of the form `<name>.raw.ic0.app`, it is a _raw_ hostname. Note that other domains may also be used to access canisters, such as `icp0.io`. The same logic concerning _raw_ domains can also be applied to these alternative domains.

## API Gateway Resolution

An API Gateway forwards Candid encoded HTTP requests to the relevant replica node. Any requests to the Internet Computer made by an HTTP Gateway are forwarded through these API gateways. The hostname of the API gateways is always `icp-api.io`.

## HTTP Request Encoding

An HTTP request is encoded using the following [Candid](https://github.com/dfinity/candid/blob/master/spec/Candid.md) interface:

```
type HeaderField = record { text; text; };

type HttpRequest = record {
    method: text;
    url: text;
    headers: vec HeaderField;
    body: blob;
    certificate_version: opt nat16;
};
```

The full [Candid](https://github.com/dfinity/candid/blob/master/spec/Candid.md) interface is described in [Canister HTTP Interface](#canister-http-interface).

- The `method` field contains the HTTP method in all upper case letters, e.g. `"GET"`.
- The `url` field contains the URL from the HTTP request line, i.e. without protocol or hostname, and includes query parameters.
- The `headers` field contains the headers of the HTTP request.
- The `body` field contains the body of the HTTP request (without any content encodings processed by the HTTP Gateway).
- The `certificate_version` field indicates the maximum supported version of [response verification](#response-verification).
  - A value of `2` will request the current standard of [response verification](#response-verification), while a missing version or a value of `1` will request the [legacy standard](#legacy-response-verification).
  - Current HTTP Gateway implementations will always request version 2, but older HTTP Gateways may still request version 1.

## Query Calls

The encoded HTTP request is sent as a query call according to the [HTTPS Interface](https://internetcomputer.org/docs/current/references/ic-interface-spec#http-query) via the API Gateway resolved according to [API Gateway Resolution](#api-gateway-resolution).

## HTTP Response Decoding

An HTTP response is decoded from the result of the [query call](#query-calls) using the following [Candid](https://github.com/dfinity/candid/blob/master/spec/Candid.md) interface:

```
type HeaderField = record { text; text; };

type HttpResponse = record {
  status_code: nat16;
  headers: vec HeaderField;
  body: blob;
  upgrade : opt bool;
  streaming_strategy: opt StreamingStrategy;
};
```

The full [Candid](https://github.com/dfinity/candid/blob/master/spec/Candid.md) interface is described in [Canister HTTP Interface](#canister-http-interface).

- The HTTP response status code is taken from the `status_code` field.
- The HTTP response headers are taken from the `headers` field.
- The HTTP response body is initialized with the value of the `body` field and further assembled as per the [response body streaming protocol](#response-body-streaming).

Notes:

- Not all HTTP Gateway implementations may be able to pass on all forms of headers. In particular, Service Workers are unable to pass on [forbidden headers](https://fetch.spec.whatwg.org/#forbidden-header-name).
- HTTP Gateways may add additional headers. In particular, the following headers may be set:
  - `access-control-allow-origin: \*`
  - `access-control-allow-methods: GET, POST, HEAD, OPTIONS`
  - `access-control-allow-headers: DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Cookie`
  - `access-control-expose-headers: Content-Length,Content-Range`
  - `x-cache-status: MISS`

## Response Verification

The HTTP Gateway will primarily be used to load static assets needed to run frontend canister code, so both low latency and security are essential for providing a good experience to end users. [Query calls](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-query) are more performant but less secure than [Update calls](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-call).

Response verification fills the security gap left by query calls. It is a versioned subprotocol that allows for an HTTP Gateway to verify a certified response received as a result of performing a query call to the Internet Computer. Two versions are currently supported, the current version of response verification is covered in this section and the legacy version is covered in [another section](#legacy-response-verification). The legacy version only includes a mapping of the request URL to the response body so it is quite limiting in what it can verify. The current version builds on the legacy version by optionally including the following extra parameters in the certification process:

- Request URL query params
- Request method
- Request headers
- Response status code
- Response headers

### Response Verification Outline

1. Case-insensitive search for the `IC-Certificate` response header.
   - If no such header is found, verification fails.
   - If the header value is not structured as per [the certificate header](#the-certificate-header), verification fails.
2. Parse the `certificate` and `tree` fields from the `IC-Certificate` header value as per [the certificate header](#the-certificate-header).
3. Perform [certificate validation](#certificate-validation).
4. Parse the `version` field from the `IC-Certificate` header value as per [the certificate header](#the-certificate-header).
   - If the `version` field is missing or equal to `1` then proceed with [legacy response verification](#legacy-response-verification).
   - If the `version` field is equal to `2` then continue.
   - Otherwise, verification fails.
5. Parse the `expr_path` field from the `IC-Certificate` header value as per [the certificate header](#the-certificate-header).
6. The parsed `expr_path` is valid as per [Expression Path](#expression-path) otherwise, verification fails.
7. Case-insensitive search for the `IC-CertificateExpression` header.
   - If no such header is found, verification fails.
   - If the header value is not structured as per [the certificate expression header](#the-certificate-expression-header), verification fails.
8. Let `expr_hash` be the label of the node in the tree at path `expr_path`.
   - If no such label exists, verification fails.
   - If `expr_hash` does not match the sha256 hash of the `IC-CertificateExpression` header value, verification fails.
   - If `no_certification` is set, verification succeeds.
   - Let `response_hash` be the response hash calculated according to [Response Hash Calculation](#response-hash-calculation)
   - If `no_request_certification` is set:
     - If the `expr_hash` label node has an empty leaf node at the subpath `["", response_hash]`, verification succeeds.
     - Otherwise, verification fails.
   - Let `request_hash` be the request hash calculated according to [Request Hash Calculation](#request-hash-calculation).
     - If there is not an empty leaf node at the subpath `[request_hash, response_hash]`, verification fails.

### The Certificate Header

The `IC-Certificate` header is a structured header according to [RFC 8941](https://www.rfc-editor.org/rfc/rfc8941.html) with the following mandatory fields:

- `certificate`: [Base64 encoded](https://www.rfc-editor.org/rfc/rfc4648#section-4) string of self-describing, [CBOR-encoded](https://www.rfc-editor.org/rfc/rfc8949.html) bytes that decode into a valid [certificate](https://internetcomputer.org/docs/current/references/ic-interface-spec/#certification).
- `tree`: [Base64 encoded](https://www.rfc-editor.org/rfc/rfc4648#section-4) string of self-describing, [CBOR-encoded](https://www.rfc-editor.org/rfc/rfc8949.html) bytes that decode into a valid hash tree as per [certificate encoding](https://internetcomputer.org/docs/current/references/ic-interface-spec/#certification-encoding).

The following additional fields are mandatory for response verification version 2 and upwards:

- `version`: String representation of an integer that represents the version of response verification that was used to build the `tree`.
- `expr_path`: [Base64 encoded](https://www.rfc-editor.org/rfc/rfc4648#section-4) string of self-describing, [CBOR-encoded](https://www.rfc-editor.org/rfc/rfc8949.html) bytes that decode into an array of strings.

### Expression Path

The decoded `expr_path` field of [The Certificate Header](#the-certificate-header) is an array of strings that corresponds to a path in the `tree` field of the same header:

- The first segment is always `http_expr`.
- The last segment is always `<$>` or `<*>`.
- No segment, aside from the last segment, will be `<$>` or `<*>`.
- Each segment between `http_expr` and `<$>` or `<*>` will contain a [percent-encoded](https://www.rfc-editor.org/rfc/rfc3986#section-2) segment of the current request URL.
- The path must be the most specific path for the current request URL in the tree, i.e. a lookup of more specific paths must return `Absent` as per [lookup](https://internetcomputer.org/docs/current/references/ic-interface-spec/#lookup).
- An `expr_path` that ends in `<$>` is an exact match for the current request URL.
- `<*>` is treated as a wildcard, so an `expr_path` that ends in `<*>` is a partial match for the current request URL.

### Certificate Validation

Certificate validation is performed as part of [response verification](#response-verification) as per [Canister Signatures](https://internetcomputer.org/docs/current/references/ic-interface-spec/#canister-signatures) and [Certification](https://internetcomputer.org/docs/current/references/ic-interface-spec/#certificate). It is expanded on here concerning [response verification](#response-verification) for completeness:

1. Case-insensitive search for a response header called `IC-Certificate`.
2. The value of the header corresponds to the format described in [the certificate header](#the-certificate-header) section.
3. The decoded `certificate` must pass the following validations:
   - The certificate is signed by the root key of the NNS subnet or by a subnet delegation signed by that same root key.
   - If the certificate contains a subnet delegation, the delegation must be valid for the given canister.
   - The timestamp at the `/time` path must be recent, e.g. 5 minutes.
   - The subnet state tree in the certificate must reveal the canister's [certified data](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-certified-data).
4. The root hash of the decoded `tree` must match the canister's [certified data](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-certified-data).

### The Certificate Expression Header

The `IC-CertificateExpression` header carries additional information instructing the HTTP Gateway how to reconstruct the certification, it can instruct the HTTP Gateway to:

- Exclude the complete request/response pair or the request only.
- Include specific request headers.
- Include specific request URL query parameters.
- Include or exclude specific response headers.

The format of the `IC-CertificateExpression` header is as follows:

```
IC-CertificateExpression: default_certification(ValidationArgs{<literal field values>})
```

The value of this header must have valid [CEL syntax](https://github.com/google/cel-spec), such that `default_certification` could be implemented as a function provided by the HTTP Gateway to validate the certification.

The properties supplied to this function are as follows:

- `certified_request_headers` - a list of request header names to include. This list can be empty.
  - Mutually exclusive with the `no_request_certification` property.
- `certified_query_parameters` - a list of request URL query parameter names to include. This list can be empty.
  - Mutually exclusive with the `no_request_certification` property.
- `certified_response_headers` - a list of response header names to include.
  - Must not include `IC-Certificate` or `IC-CertificateExpression`.
  - Mutually exclusive with the `response_header_exclusions` property.
- `response_header_exclusions` - a list of response header names to exclude. All other headers are included.
  - Must not include `IC-Certificate` or `IC-CertificateExpression`.
  - Mutually exclusive with the `certified_response_headers` property.
- `no_request_certification` - disables certification of the request for this HTTP response.
  - Mutually exclusive with the `certified_request_headers` and `certified_query_parameters` properties.
  - This feature has security implications. If it is used on a path that serves dynamic content using the [upgrade to update call](#upgrade-to-update-calls) feature, malicious replica nodes can always return the certified response, instead of setting the upgrade flag on the response.
- `no_certification` - disables certification for this HTTP request/response pair.
  - This feature has security implications. Clients will not be able to verify the authenticity of the response content if it is used. Dynamic content can be returned securely by making use of the [upgrade to update](#upgrade-to-update-calls) feature. Only use `no_certification` if the content is dynamic, the latency of an update call is too high and the impact of a malicious response on that path is benign.

The `ValidationArgs` object has the following [Protocol Buffer 3](https://protobuf.dev/reference/protobuf/proto3-spec/) definition:

```protobuf
message ResponseHeaderList {
	repeated string headers = 1;
}

message RequestCertification {
	repeated string certified_request_headers = 1;
	repeated string certified_query_parameters = 2;
}

message ResponseCertification {
	oneof response_headers {
    	ResponseHeaderList certified_response_headers = 1;
    	ResponseHeaderList response_header_exclusions = 2;
	}
}

message Certification {
	oneof request {
		RequestCertification request_certification = 1;
		Empty no_request_certification = 2;
	}
	ResponseCertification response_certification = 3;
}

message ValidationArgs {
	oneof certification {
    	Certification certification = 1;
    	Empty no_certification = 2;
	}
}
```

The syntax of the header is defined by the following [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form):

```
CHAR = /[^\0\n"]/
STRING = '"', { CHAR }, '"'
STRING-LIST = '[', { STRING }, ']'

RESPONSE-HEADER-LIST = 'ResponseHeaderList{headers:',  STRING-LIST, '}'

REQUEST-CERTIFICATION = 'RequestCertification{certified_request_headers:', STRING-LIST, ',certified_query_parameters:', STRING-LIST, '}'

RESPONSE-CERTIFICATION = 'ResponseCertification{', ('response_header_exclusions:' | 'certified_response_headers:'), RESPONSE-HEADER-LIST, '}'

CERTIFICATION = 'Certification{', ('no_request_certification:Empty{}' | 'request_certification:', REQUEST-CERTIFICATION), ',response_certification:', RESPONSE-CERTIFICATION, '}'

VALIDATION-ARGS = 'ValidationArgs{', ('no_certification:Empty{}' | 'certification:', CERTIFICATION), '}'

HEADER-VALUE = 'default_certification(', VALIDATION-ARGS, ')'

HEADER = 'IC-CertificateExpression:', HEADER-VALUE
```

:::note
Implementors should note that the EBNF specification does not allow for any whitespace within the header value. This is intentional and should be supported by all implementations. Optionally, support could also be added for whitespace agnosticism.
:::

### Request Hash Calculation

The request hash is calculated as follows:

1. Let `request_headers_hash` be the [representation-independent hash](https://internetcomputer.org/docs/current/references/ic-interface-spec#hash-of-map) of the request headers:
   - The header names are lower-cased.
   - Only include headers listed in the `certified_request_headers` field of [the certificate expression header](#the-certificate-expression-header).
     - If the field is empty or no value was supplied, no headers are included.
     - Headers can be repeated and each repetition should be included.
   - Include an additional `:ic-cert-method` header that contains the HTTP method of the request.
   - Include an additional `:ic-cert-query` header that contains a value according to the following steps:
     - Parse the query string and build a list of tuples `(<query_param_name>, <query_param_value>)` while maintaining the order.
     - Exclude all tuples where `<query_param_name>` does not exactly match a value listed in the `certified_query_parameters` field of [the certificate expression header](#the-certificate-expression-header). If `certified_query_parameters` is empty then the resulting list of tuples should also be empty.
     - Concatenate each `<query_param_name>` with the corresponding `<query_param_value>` and then concatenate all of these concatenations using the original separators and order.
     - Calculate the sha256 hash of the UTF-8 representation of the resulting string.
2. Let `request_body_hash` be the sha256 of the request body.
3. Concatenate `request_headers_hash` and `request_body_hash` and calculate the sha256 of that concatenation.

### Response Hash Calculation

The response hash is calculated as follows:

1. Let `response_headers_hash` be the [representation-independent hash](https://internetcomputer.org/docs/current/references/ic-interface-spec#hash-of-map) of the response headers:
   - The header names are lower-cased.
   - The `IC-Certificate` header is always excluded.
   - The `IC-CertificateExpression` header is always included.
   - If the `no_certification` field of [the certificate expression header](#the-certificate-expression-header) is present:
     - This request/response pair is exempt from certification and the response hash calculation can be skipped altogether
   - If the `certified_response_headers` field of [the certificate expression header](#the-certificate-expression-header) is present:
     - All headers listed by certified_response_headers are included (except for the `IC-Certificate` header)
     - All others are excluded (except for the `IC-CertificateExpression` header)
   - If the `response_header_exclusions` field of [the certificate expression header](#the-certificate-expression-header) is present:
     - All headers listed (except for the `IC-CertificateExpression` header) are excluded from the certification
     - All other headers (except for the IC-Certificate header) are included in the certification
   - Headers can be repeated and each repetition should be included.
   - Include an additional `:ic-cert-status` header that contains the numerical HTTP status code of the response.
2. Let `response_body_hash` be the sha256 of the response body.
3. Concatenate `response_headers_hash` and `response_body_hash` and calculate the sha256 of that concatenation.

### Multiple CEL Expression Hashes Per Expression Path

Adding one CEL expression hash per expression path should be the default and most common case as it is the most secure approach. It is, however, possible to add multiple CEL expression hashes per expression path, if the flexibility is needed by a canister. This feature is quite dangerous and must be used with extreme caution. By adding a 2nd CEL expression hash, a canister is giving a malicious replica node freedom to choose a different CEL expression hash for a request than what is intended by the canister. This could be used to expose a potential vulnerability that does not exist if the intended CEL expression hash is used. This should only be used in cases where the difference in CEL expression hashes is benign and will not pose a security threat to the canister, or there is not sufficient overlap between the CEL expressions to allow the replica node to freely choose between them.

### Multiple Response Hashes Per Request Hash

Similar to [Multiple CEL Expression Hashes Per Expression Path](#multiple-cel-expression-hashes-per-expression-path), this is a feature that is intended to allow for flexibility when it is needed. It is also dangerous and must be used with great care. By adding multiple response hashes for a single request hash, a malicious replica can freely choose between any of those response hashes for that request hash. This should only be used in cases where the difference between the responses is benign and will not pose a security threat to the canister.

## Response Body Streaming

The HTTP Gateway protocol has provisions to transfer further chunks of the body data from the canister to the HTTP Gateway, to overcome the message limit of the Internet Computer. This streaming protocol is independent of any possible streaming of data between the HTTP Gateway and the HTTP client. The HTTP Gateway may assemble the response as a whole before passing it on, or pass the chunks on directly, on the TCP or HTTP level, as it sees fit. When the HTTP Gateway is certifying the response, it must not pass on uncertified chunks.

If the `streaming_strategy` field of the `HttpResponse` is set, the HTTP Gateway then uses further query calls to obtain further chunks to append to the body:

If the function reference in the callback field of the `streaming_strategy` is not a method of the given canister, the HTTP Gateway fails the request.

Else, it makes a query call to the given method, passing the token value given in the `streaming_strategy` as the argument.

That method returns a `StreamingCallbackHttpResponse`. The body therein is appended to the body of the HTTP response. This is repeated as long as the method returns some token in the token field until that field is null.

The type of the token value is chosen by the canister; the HTTP Gateway obtains the Candid type of the encoded message from the canister and uses it when passing the token back to the canister. This generic use of Candid is not covered by the Candid specification, and may not be possible in some cases (e.g. when using "future types"). Canister authors may have to use "simple" types.

## Upgrade to Update Calls

If the canister sets `upgrade = opt true` in the `HttpResponse` reply from the `http_request` call, then the HTTP Gateway ignores all other fields of the response. The HTTP Gateway performs an [update](https://internetcomputer.org/docs/current/references/ic-interface-spec#http-call) call to `http_request_update`, passing an `HttpUpdateRequest` record as the argument, and uses the resulting response from `http_request_update` instead. The `HttpUpdateRequest` record is identical to the original `HttpRequest`, with the `certificate_version` field excluded.

The value of the `upgrade` field returned from `http_request_update` is ignored.

## Legacy Response Verification

Version 1 response verification only supports verifying a request path and response body pair with only one response per request path. This is quite restrictive in the number of scenarios it can support. For example, redirection or client-side caching is not safe since the status code and headers required to verify responses of that nature are not included in the certification. Upon a query call to a canister’s `http_request` method, a single malicious node or boundary node can modify these parts of the HTTP response, leading to the following issues:

- dApps cannot load the service worker when embedded within iFrames.
- The use of redirects and cookies is unsafe as they can be manipulated by malicious nodes.
- This is unexpected for developers and will lead to vulnerabilities in dApps sooner or later.
- The effectiveness of security headers (such as Content Security Policy) is diminished as they can be omitted or modified by malicious nodes.

[Response Verification version 2](#response-verification) overcomes these issues.

The steps for response verification are as follows:

- See the [response verification outline](#response-verification-outline) for the full subprotocol description.
- Assert that the canister returning the response does not have support for response verification v2 via [Response Verification Version Assertion](#response-verification-version-assertion).
  - If the canister reports that it has support for response verification v2, verification fails.
  - Otherwise, continue.
- The path `["http_assets", <url>]` exists in the `tree` and is a leaf with a value, where `<url>` is the utf8-encoded URL from the `HttpRequest`.
- Otherwise, the path `["http_assets", "/index.html"]` must exist in the `tree` and be a leaf.
- That leaf must contain the SHA-256 hash of the decoded body.
  - If the `streaming_strategy` field of the `HttpResponse` is set, all chunks are streamed and concatenated according to [response body streaming](#response-body-streaming) before decoding.
  - The body is decoded according to the `Content-Encoding` header if present. Supported values for the `Content-Encoding` header include `gzip` and `deflate`.

## Response Verification Version Assertion

Canisters can report the supported versions of response verification using (public) metadata sections available in the [system state tree](https://internetcomputer.org/docs/current/references/ic-interface-spec/#state-tree-canister-information). This metadata will be read by the HTTP Gateway using a [read_state request](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-read-state). The metadata section must be a (public) custom section with the name `supported_certificate_versions` and contain a comma-delimited string of versions, e.g., `1,2`. This is treated as an optional, additional layer of security for canisters supporting multiple versions. If the metadata has not been added (i.e., the `read_state` request _succeeds_ and the lookup of the metadata section in the `read_state` response certificate returns `Absent`), then the HTTP Gateway will allow for whatever version the canister has responded with.

The request for the metadata will only be made by the HTTP Gateway if there is a downgrade. If the HTTP Gateway requests v2 and the canister responds with v2, then a request will not be made. If the HTTP Gateway requests v2 and the canister responds with v1, a request will be made. If a request is made, the HTTP Gateway will not accept any response from the canister that is below the max version supported by both the HTTP Gateway and the canister. This will guarantee that a canister supporting both v1 and v2 will always have v2 security when accessed by an HTTP Gateway that supports v2.

:::note

The HTTP Gateway can only allow for arbitrary certification version if the custom section `supported_certificate_versions` is _provably_ not present, i.e., if the `read_state` response contains a valid certificate whose lookup of the corresponding path yields `Absent`. Otherwise, e.g., if the replica is overloaded or if the `read_state` is rejected because the custom section with the name `supported_certificate_versions` is private, the HTTP Gateway should also reject the canister's response.

:::

## Canister HTTP Interface

The full [Candid](https://github.com/dfinity/candid/blob/master/spec/Candid.md) interface that a canister is expected to implement is as follows:

```
type HeaderField = record { text; text; };

type HttpRequest = record {
    method: text;
    url: text;
    headers: vec HeaderField;
    body: blob;
    certificate_version: opt nat16;
};

type HttpUpdateRequest = record {
    method: text;
    url: text;
    headers: vec HeaderField;
    body: blob;
};

type HttpResponse = record {
    status_code: nat16;
    headers: vec HeaderField;
    body: blob;
    upgrade : opt bool;
    streaming_strategy: opt StreamingStrategy;
};

// Each canister that uses the streaming feature gets to choose their concrete
// type; the HTTP Gateway will treat it as an opaque value that is only fed to
// the callback method

type StreamingToken = /* application-specific type */

type StreamingCallbackHttpResponse = record {
    body: blob;
    token: opt StreamingToken;
};

type StreamingStrategy = variant {
    Callback: record {
        callback: func (StreamingToken) -> (opt StreamingCallbackHttpResponse) query;
        token: StreamingToken;
    };
};

service : {
    http_request: (request: HttpRequest) -> (HttpResponse) query;
    http_request_update: (request: HttpUpdateRequest) -> (HttpResponse);
}
```

You can also [download the file](./_attachments/http-gateway.did).

Not all of this interface is required. The following sections detail what can be optionally omitted depending on the requirements of the canister in question.

Note. Composite query methods can be used instead of query methods to allow for calling composite query methods of other canisters on the same subnet
when processing an HTTP request, e.g., the canister can export

```
http_request: (request: HttpRequest) -> (HttpResponse) composite_query;
```

instead of

```
http_request: (request: HttpRequest) -> (HttpResponse) query;
```

### Response Verification Interface

The `certificate_version` field of the `HttpRequest` interface is optional depending on the version of [response verification](#response-verification) that the canister is implementing. It is omitted in older canisters that do not implement response verification version 2 or later.

```
type HttpRequest = record {
    // ...
    certificate_version: opt nat16;
};
```

### Upgrade to Update Calls Interface

The `http_request_update` method of the `service` interface along with the `upgrade` field of the `HttpResponse` interface is optional depending on whether the canister needs to use the [upgrade to update calls](#upgrade-to-update-calls) feature. Not that the `HttpUpdateRequest` type is the same as the `HttpRequest` type, but excludes the `certificate_version` field since this should not affect the response to an [update](https://internetcomputer.org/docs/current/references/ic-interface-spec#http-call) call from a canister.

```
type HttpUpdateRequest = record {
    method: text;
    url: text;
    headers: vec HeaderField;
    body: blob;
};

type HttpResponse = record {
    // ...
    upgrade : opt bool;
    // ...
};

service : {
    // ...
    http_request_update: (request: HttpUpdateRequest) -> (HttpResponse);
}
```

### Response Body Streaming Interface

The `StreamingToken`, `StreamingCallbackHttpResponse`, and `StreamingStrategy` interfaces along with the `streaming_strategy` field of the `HttpResponse` interface are optional depending on whether the canister needs to use the [response body streaming](#response-body-streaming) feature.

```
type HttpResponse = record {
    // ...
    streaming_strategy: opt StreamingStrategy;
};

// Each canister that uses the streaming feature gets to choose their concrete
// type; the HTTP Gateway will treat it as an opaque value that is only fed to
// the callback method

type StreamingToken = /* application-specific type */

type StreamingCallbackHttpResponse = record {
    body: blob;
    token: opt StreamingToken;
};

type StreamingStrategy = variant {
    Callback: record {
        callback: func (StreamingToken) -> (opt StreamingCallbackHttpResponse) query;
        token: StreamingToken;
    };
};
```

### Minimum Canister Interface

If all of the above optional features are not needed by a canister, the minimum [Candid](https://github.com/dfinity/candid/blob/master/spec/Candid.md) interface that it needs to implement is as follows:

```
type HeaderField = record { text; text; };

type HttpRequest = record {
    method: text;
    url: text;
    headers: vec HeaderField;
    body: blob;
};

type HttpResponse = record {
    status_code: nat16;
    headers: vec HeaderField;
    body: blob;
};

service : {
    http_request: (request: HttpRequest) -> (HttpResponse) query;
}
```
