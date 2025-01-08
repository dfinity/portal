# HTTP certification

## Overview

HTTP certification is a sub-protocol of the [ICP](https://internetcomputer.org/) [HTTP gateway protocol](https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec). It is used to verify HTTP responses received by an HTTP gateway from a [canister](https://internetcomputer.org/how-it-works/canister-lifecycle/), with respect to the corresponding HTTP request. This allows HTTP gateways to verify that the responses they receive from canisters are authentic and have not been tampered with.

The `ic-http-certification` crate provides a foundation for implementing the HTTP certification protocol in Rust canisters. Certification is implemented in a number of steps:

1. [Defining CEL expressions](#defining-cel-expressions)
2. [Creating certifications](#creating-certifications)
3. [Creating an HTTP certification tree](#creating-an-http-certification-tree)

## Defining CEL expressions

[CEL](https://github.com/google/cel-spec) (Common Expression Language) is a portable expression language that can be used for different applications to easily interoperate. It can be seen as the computation or expression counterpart to [protocol buffers](https://github.com/protocolbuffers/protobuf).

CEL expressions are the core of ICP's HTTP certification system. They are used to define the conditions under which a request and response pair should be certified. They also define what should be included from the corresponding request and response objects in the certification.

CEL expressions can be created in two ways:

- Using the [CEL builder](#using-the-cel-builder).
- Directly creating a [CEL expression](#directly-creating-a-cel-expression).

### Converting CEL expressions into their `String` representation

Note that the `CelExpression` enum is not a CEL expression itself, but rather a Rust representation of a CEL expression. To convert a `CelExpression` into its `String` representation, use `CelExpression.to_string` or `create_cel_expr`. This applies to CEL expressions created both by the [CEL builder](#using-the-cel-builder) and [directly](#directly-creating-a-cel-expression).

```rust
use ic_http_certification::cel::{CelExpression, DefaultCelExpression};

let cel_expr = CelExpression::Default(DefaultCelExpression::Skip).to_string();
```

Alternatively:

```rust
use ic_http_certification::cel::{CelExpression, DefaultCelExpression, create_cel_expr};

let certification = CelExpression::Default(DefaultCelExpression::Skip);
let cel_expr = create_cel_expr(&certification);
```

### Using the CEL builder

The CEL builder interface is provided to ease the creation of CEL expressions through an ergonomic interface. It is also possible to [create CEL expressions directly](#directly-creating-a-cel-expression). To define a CEL expression, start with `DefaultCelBuilder`. This struct provides a set of associated functions that can be used to define how a request and response pair should be certified.

When certifying requests:

- The request body and method are always certified.
- To certify request headers and query parameters, use `with_request_headers` and `with_request_query_parameters` respectively. Both associated functions take a `str` slice as an argument.

When certifying responses:

- The response body and status code are always certified.
- To certify response headers, use `with_response_certification`. This associated function takes the `DefaultResponseCertification` enum as an argument.
  - To specify header inclusions, use the `certified_response_headers` associated function of the `DefaultResponseCertification` enum.
  - To certify all response headers (with some exclusions) use the `response_header_exclusions` associated function of the `DefaultResponseCertification` enum. Both functions take a `str` slice as an argument.

#### Fully certified request / response pair

To define a fully certified request and response pair, including request headers, query parameters, and response headers, use `DefaultCelBuilder::full_certification`.

For example:

```rust
use ic_http_certification::{DefaultCelBuilder, DefaultResponseCertification};

let cel_expr = DefaultCelBuilder::full_certification()
    .with_request_headers(vec!["Accept", "Accept-Encoding", "If-None-Match"])
    .with_request_query_parameters(vec!["foo", "bar", "baz"])
    .with_response_certification(DefaultResponseCertification::certified_response_headers(vec![
        "Cache-Control",
        "ETag",
    ]))
    .build();
```

#### Partially certified request

Any number of request headers or request query parameters can be certified via `with_request_headers` and `with_request_query_parameters` respectively. Both methods will accept empty arrays, which is the same as not calling them at all. Likewise for `with_request_query_parameters`, if it is called with an empty array, or not called at all, then no request query parameters will be certified. If both are called with an empty array, or neither are called, then only the request body and method will be certified.

For example, to certify only the request body and method:

```rust
use ic_http_certification::{DefaultCelBuilder, DefaultResponseCertification};

let cel_expr = DefaultCelBuilder::full_certification()
    .with_response_certification(DefaultResponseCertification::certified_response_headers(vec![
        "Cache-Control",
        "ETag",
    ]))
    .build();
```

Alternatively, this can be done more explicitly:

```rust
use ic_http_certification::{DefaultCelBuilder, DefaultResponseCertification};

let cel_expr = DefaultCelBuilder::full_certification()
    .with_request_headers(vec![])
    .with_request_query_parameters(vec![])
    .with_response_certification(DefaultResponseCertification::certified_response_headers(vec![
        "Cache-Control",
        "ETag",
    ]))
    .build();
```

#### Skipping request certification

Request certification can be skipped entirely by using `DefaultCelBuilder::response_only_certification` instead of `DefaultCelBuilder::full_certification`.

For example:

```rust
use ic_http_certification::{DefaultCelBuilder, DefaultResponseCertification};

let cel_expr = DefaultCelBuilder::response_only_certification()
    .with_response_certification(DefaultResponseCertification::response_header_exclusions(vec![
        "Date",
        "Cookie",
        "Set-Cookie",
    ]))
    .build();
```

#### Partially certified response

Any number of response headers can be provided via the `certified_response_headers` associated function of the `DefaultResponseCertification` enum when calling `with_response_certification`. The provided array can also be empty. If the array is empty, or the associated function is not called, no response headers will be certified.

For example, to certify only the response body and status code:

```rust
use ic_http_certification::DefaultCelBuilder;

let cel_expr = DefaultCelBuilder::response_only_certification().build();
```

This can also be done more explicitly:

```rust
use ic_http_certification::{DefaultCelBuilder, DefaultResponseCertification};

let cel_expr = DefaultCelBuilder::response_only_certification()
    .with_response_certification(DefaultResponseCertification::certified_response_headers(vec![]))
    .build();
```

The same applies when both when using `DefaultCelBuilder::response_only_certification` and `DefaultCelBuilder::full_certification`:

```rust
use ic_http_certification::DefaultCelBuilder;

let cel_expr = DefaultCelBuilder::full_certification()
    .with_request_headers(vec!["Accept", "Accept-Encoding", "If-None-Match"])
    .with_request_query_parameters(vec!["foo", "bar", "baz"])
    .build();
```

To skip response certification completely, certification overall must be skipped completely. It wouldn't be useful to certify a request without certifying a response.

#### Skipping certification

To skip certification entirely, use `skip_certification`, for example:

```rust
use ic_http_certification::DefaultCelBuilder;

let cel_expr = DefaultCelBuilder::skip_certification();
```

Skipping certification may seem counter-intuitive at first, but it is not always possible to certify a request and response pair. For example, a canister method that will return different data for every user cannot be easily certified.

Typically, these requests have been routed through `raw` ICP URLs in the past, but this is dangerous because `raw` URLs allow any responding replica to decide whether or not certification is required. In contrast, by skipping certification using the above method with a non-`raw` URL, a replica will no longer be able to decide whether or not certification is required and instead this decision will be made by the canister itself and the result will go through consensus.

## Creating certifications

Once a CEL expression has been defined, it can be used in conjunction with an `HttpRequest` and `HttpResponse` to create an instance of the `HttpCertification` struct. The `HttpCertification` struct has three associated functions:

- The `full` associated function is used to include both the `HttpRequest` and the corresponding `HttpResponse` in certification.
- The `response_only` associated function is used to include only the `HttpResponse` in certification and exclude the corresponding `HttpRequest` from certification.
- The `skip` associated function is used to skip certification entirely.

### Full certification

To perform a full certification, a CEL expression created from `DefaultCelBuilder::full_certification` is required, along with an `HttpRequest` and `HttpResponse` and optionally, a pre-calculated response body hash.

For example:

```rust
use ic_http_certification::{HttpCertification, HttpRequest, HttpResponse, DefaultCelBuilder, DefaultResponseCertification};

let cel_expr = DefaultCelBuilder::full_certification()
    .with_request_headers(vec!["Accept", "Accept-Encoding", "If-None-Match"])
    .with_request_query_parameters(vec!["foo", "bar", "baz"])
    .with_response_certification(DefaultResponseCertification::certified_response_headers(vec![
        "Cache-Control",
        "ETag",
    ]))
    .build();

let request = HttpRequest {
    method: "GET".to_string(),
    url: "/index.html?foo=a&bar=b&baz=c".to_string(),
    headers: vec![
        ("Accept".to_string(), "application/json".to_string()),
        ("Accept-Encoding".to_string(), "gzip".to_string()),
        ("If-None-Match".to_string(), "987654321".to_string()),
    ],
    body: vec![],
};

let response = HttpResponse {
    status_code: 200,
    headers: vec![
        ("Cache-Control".to_string(), "no-cache".to_string()),
        ("ETag".to_string(), "123456789".to_string()),
        ("IC-CertificateExpression".to_string(), cel_expr.to_string()),
    ],
    body: vec![1, 2, 3, 4, 5, 6],
    upgrade: None,
};

let certification = HttpCertification::full(&cel_expr, &request, &response, None);
```

### Response-only certification

To perform a response-only certification, a CEL expression created from `DefaultCelBuilder::response_only_certification` is required, along with an `HttpResponse` and optionally, a pre-calculated response body hash.

For example:

```rust
use ic_http_certification::{HttpCertification, HttpResponse, DefaultCelBuilder, DefaultResponseCertification};

let cel_expr = DefaultCelBuilder::response_only_certification()
    .with_response_certification(DefaultResponseCertification::certified_response_headers(vec![
        "Cache-Control",
        "ETag",
    ]))
    .build();

let response = HttpResponse {
    status_code: 200,
    headers: vec![
        ("Cache-Control".to_string(), "no-cache".to_string()),
        ("ETag".to_string(), "123456789".to_string()),
        ("IC-CertificateExpression".to_string(), cel_expr.to_string()),
    ],
    body: vec![1, 2, 3, 4, 5, 6],
    upgrade: None,
};

let certification = HttpCertification::response_only(&cel_expr, &response, None).unwrap();
```

### Skipping certification

Skipping certification does not need an explicit CEL expression to be defined since it's always the same.

For example:

```rust
use ic_http_certification::HttpCertification;

let certification = HttpCertification::skip();
```

## Creating an HTTP certification tree

### Defining tree paths

Paths for the tree can be defined using the `HttpCertificationPath` struct and come in two types: `wildcard()` and `exact()`. Both types of paths may end with or without a trailing slash, but note that a path ending in a trailing slash is a distinct path from one that does not end with a trailing slash, and they will be treated as such by the tree.

Wildcard paths can be used to match a sub-path of a request URL. This can be useful for 404 responses, fallbacks or rewrites. They are defined using the `wildcard()` associated function.

In this example, the certification entered into the tree with this path will be valid for any request URL that begins with `/js`, unless there is a more specific path in the tree (ex. `/js/example.js`).

```rust
use ic_http_certification::HttpCertificationPath;

let path = HttpCertificationPath::wildcard("/js");
```

Exact paths are used to match an entire request URL. An exact path ending with a trailing slash refers to a file system directory, where as one without a trailing slash refers to an individual file. Both are separate paths within the certification tree and will be treated completely independently.

In this example, the certification entered into the tree with this path will only be valid for a request URL that is exactly `/js/example.js`.

```rust
use ic_http_certification::HttpCertificationPath;

let path = HttpCertificationPath::exact("/js/example.js");
```

### Using the HTTP certification tree

The `HttpCertificationTree` can be easily initialized with the `Default` trait and entries can be added to, removed from, or have witnesses generated by the tree using the `HttpCertificationTreeEntry` struct. The `HttpCertificationTreeEntry` requires a `HttpCertification` and an `HttpCertificationPath`.

For example:

```rust
use ic_http_certification::{HttpCertification, HttpRequest, HttpResponse, DefaultCelBuilder, DefaultResponseCertification, HttpCertificationTree, HttpCertificationTreeEntry, HttpCertificationPath};

let cel_expr = DefaultCelBuilder::full_certification()
    .with_request_headers(vec!["Accept", "Accept-Encoding", "If-None-Match"])
    .with_request_query_parameters(vec!["foo", "bar", "baz"])
    .with_response_certification(DefaultResponseCertification::certified_response_headers(vec![
        "Cache-Control",
        "ETag",
    ]))
    .build();

let request = HttpRequest {
    method: "GET".to_string(),
    url: "/index.html?foo=a&bar=b&baz=c".to_string(),
    headers: vec![
        ("Accept".to_string(), "application/json".to_string()),
        ("Accept-Encoding".to_string(), "gzip".to_string()),
        ("If-None-Match".to_string(), "987654321".to_string()),
    ],
    body: vec![],
};

let response = HttpResponse {
    status_code: 200,
    headers: vec![
        ("Cache-Control".to_string(), "no-cache".to_string()),
        ("ETag".to_string(), "123456789".to_string()),
        ("IC-CertificateExpression".to_string(), cel_expr.to_string()),
    ],
    body: vec![1, 2, 3, 4, 5, 6],
    upgrade: None,
};

let request_url = "/example.json";
let path = HttpCertificationPath::exact(request_url);
let certification = HttpCertification::full(&cel_expr, &request, &response, None).unwrap();

let mut http_certification_tree = HttpCertificationTree::default();

let entry = HttpCertificationTreeEntry::new(&path, &certification);

// insert the entry into the tree
http_certification_tree.insert(&entry);

// generate a witness for this entry in the tree
let witness = http_certification_tree.witness(&entry, request_url);

// delete the entry from the tree
http_certification_tree.delete(&entry);
```

## Directly creating a CEL expression

To define a CEL expression, start with the `CelExpression` enum. This enum provides a set of variants that can be used to define different types of CEL expressions supported by ICP HTTP gateways. Currently only one variant is supported, known as the "default" certification expression, but more may be added in the future as the HTTP certification protocol evolves over time.

When certifying requests:

- The request body and method are always certified.

- To certify request headers and query parameters, use the `headers` and `query_paramters` fields of the `DefaultRequestCertification` struct. Both fields take a `str` slice as an argument.

When certifying responses:

- The response body and status code are always certified.

- To certify response headers, use the `certified_response_headers` associated function of the `DefaultResponseCertification` enum. Or to certify all response headers, with some exclusions, use the `response_header_exclusions` associated function of the `DefaultResponseCertification` enum. Both associated functions take a `str` slice as an argument.

Note that the example CEL expressions provided below are formatted for readability. The actual CEL expressions produced by `CelExpression::to_string` and `create_cel_expr` are minified. The minified CEL expression is preferred because it is more compact, resulting in a smaller payload and a faster evaluation time for the HTTP gateway that is verifying the certification, but the formatted versions are also accepted.

### Fully certified request / response pair

To define a fully certified request and response pair, including request headers, query parameters, and response headers:

```rust
use std::borrow::Cow;
use ic_http_certification::cel::{CelExpression, DefaultCelExpression, DefaultFullCelExpression, DefaultRequestCertification, DefaultResponseCertification};

let cel_expr = CelExpression::Default(DefaultCelExpression::Full(
  DefaultFullCelExpression {
    request: DefaultRequestCertification::new(
      vec!["Accept", "Accept-Encoding", "If-None-Match"],
      vec!["foo", "bar", "baz"],
    ),
    response: DefaultResponseCertification::certified_response_headers(vec![
      "ETag",
      "Cache-Control",
    ]),
  }));
```

This will produce the following CEL expression:

```protobuf
default_certification (
  ValidationArgs {
    request_certification: RequestCertification {
      certified_request_headers: ["Accept", "Accept-Encoding", "If-None-Match"],
      certified_query_parameters: ["foo", "bar", "baz"]
    },
    response_certification: ResponseCertification {
      certified_response_headers: ResponseHeaderList {
        headers: [
          "ETag",
          "Cache-Control"
        ]
      }
    }
  }
)
```

### Partially certified request

Any number of request headers or query parameters can be provided via the `headers` and `query_parameters` fields of the `DefaultRequestCertification` struct, and both can be an empty array. If the `headers` field is empty, no request headers will be certified. Likewise for the `query_parameters` field, if it is empty then no query parameters will be certified. If both are empty, only the request body and method will be certified.

For example, to certify only the request body and method:

```rust
use std::borrow::Cow;
use ic_http_certification::cel::{CelExpression, DefaultCelExpression, DefaultFullCelExpression, DefaultRequestCertification, DefaultResponseCertification};

let cel_expr = CelExpression::Default(DefaultCelExpression::Full(
  DefaultFullCelExpression {
    request: DefaultRequestCertification::new(
      vec![],
      vec![],
    ),
    response: DefaultResponseCertification::certified_response_headers(vec![
      "ETag",
      "Cache-Control",
    ]),
  }));
```

This will produce the following CEL expression:

```protobuf
default_certification (
  ValidationArgs {
    request_certification: RequestCertification {
      certified_request_headers: [],
      certified_query_parameters: []
    },
    response_certification: ResponseCertification {
      certified_response_headers: ResponseHeaderList {
        headers: [
          "ETag",
          "Cache-Control"
        ]
      }
    }
  }
)
```

### Skipping request certification

Request certification can be skipped entirely by using the `ResponseOnly` variant of the `DefaultCelExpression` struct.

For example:

```rust
use std::borrow::Cow;
use ic_http_certification::cel::{CelExpression, DefaultCelExpression, DefaultResponseOnlyCelExpression, DefaultResponseCertification};

let cel_expr = CelExpression::Default(DefaultCelExpression::ResponseOnly(
  DefaultResponseOnlyCelExpression {
    response: DefaultResponseCertification::certified_response_headers(vec![
      "ETag",
      "Cache-Control",
    ]),
  }));
```

This will produce the following CEL expression:

```protobuf
default_certification (
  ValidationArgs {
    no_request_certification: Empty {},
    response_certification: ResponseCertification {
      certified_response_headers: ResponseHeaderList {
        headers: [
          "ETag",
          "Cache-Control"
        ]
      }
    }
  }
)
```

### Partially certified response

Similiarly to request certification, any number of response headers can be provided via the `certified_response_headers` associated function of the `DefaultResponseCertification` enum, and it can also be an empty array. If the array is empty, no response headers will be certified.

For example:

```rust
use std::borrow::Cow;
use ic_http_certification::cel::{CelExpression, DefaultCertification, DefaultRequestCertification, DefaultResponseCertification};

let cel_expr = CelExpression::DefaultCertification(Some(DefaultCertification {
  request: DefaultRequestCertification::new(
    vec!["Accept", "Accept-Encoding", "If-None-Match"],
    vec!["foo", "bar", "baz"],
  ),
  response_certification: DefaultResponseCertification::certified_response_headers(vec![]),
}));
```

This will produce the following CEL expression:

```protobuf
default_certification (
  ValidationArgs {
    request_certification: RequestCertification {
      certified_request_headers: ["Accept", "Accept-Encoding", "If-None-Match"],
      certified_query_parameters: ["foo", "bar", "baz"]
    },
    response_certification: ResponseCertification {
      certified_response_headers: ResponseHeaderList {
        headers: []
      }
    }
  }
)
```

If the `response_header_exclusions` associated function is used, an empty array will certify _all_ response headers. For example:

```rust
use std::borrow::Cow;
use ic_http_certification::cel::{CelExpression, DefaultCelExpression, DefaultFullCelExpression, DefaultRequestCertification, DefaultResponseCertification};

let cel_expr = CelExpression::Default(DefaultCelExpression::Full(
  DefaultFullCelExpression {
    request: DefaultRequestCertification::new(
      vec!["Accept", "Accept-Encoding", "If-None-Match"],
      vec!["foo", "bar", "baz"],
    ),
    response: DefaultResponseCertification::response_header_exclusions(vec![]),
  }));
```

This will produce the following CEL expression:

```protobuf
default_certification (
  ValidationArgs {
    request_certification: RequestCertification {
      certified_request_headers: ["Accept", "Accept-Encoding", "If-None-Match"],
      certified_query_parameters: ["foo", "bar", "baz"]
    },
    response_certification: ResponseCertification {
      response_header_exclusions: ResponseHeaderList {
        headers: []
      }
    }
  }
)
```

To skip response certification completely, then certification overall must be skipped completely. It wouldn't be useful to certify a request without certifying a response.

### Skipping certification

To skip certification entirely:

```rust
use ic_http_certification::cel::{CelExpression, DefaultCelExpression};

let cel_expr = CelExpression::Default(DefaultCelExpression::Skip);
```

This will produce the following CEL expression:

```protobuf
default_certification (
  ValidationArgs {
    no_certification: Empty {}
  }
)
```
