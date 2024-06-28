# Serving JSON over HTTP

## Overview

This guide walks through an example project that demonstrates how to create a canister that can serve certified JSON over HTTP. The example project presents a very simple REST API for creating and listing to-do items. There is no authentication or persistent storage.

This is not a beginner's canister development guide. Many foundational concepts that a relatively experienced canister developer should already know will be omitted. Concepts specific to HTTP certification will be called out here and can help to understand the [full code example](https://github.com/dfinity/response-verification/tree/main/examples/http-certification/json-api).

## Prerequisites

It's recommended to check out earlier guides before reading this one.

- [x] Complete the ["Custom HTTP canisters"](https://internetcomputer.org/docs/current/developer-docs/http-compatible-canisters/custom-http-canisters) guide.

## Lifecycle

In the `init` lifecycle hook, the CEL expressions are prepared and responses are certified. The same function runs during the `post_upgrade` hook since the certified structure does not persist across upgrades.

```rust
// run when a canister is first installed
#[init]
fn init() {
    // prepare reusable CEL expressions
    prepare_cel_exprs();

    // certify all static responses
    certify_list_todos_response();
    certify_not_allowed_todo_responses();
    certify_not_found_response();

    // prepare query and update handlers
    prepare_query_handlers();
    prepare_update_handlers();
}

// run every time a canister is upgraded
#[post_upgrade]
fn post_upgrade() {
    // run the same initialization logic
    init();
}
```

## CEL expressions

CEL expressions only need to be set up once and can then be reused until the next canister upgrade. Responses can also be set up once and reused. If the response is static and will not change throughout the canister's lifetime, then it only needs to be certified once. If the response can change, however then it will need to be re-certified every time it changes.

To store CEL expressions, a `HashMap` is created for each type of CEL expression that is needed:

```rust
thread_local! {
    static RESPONSE_ONLY_CEL_EXPRS: RefCell<HashMap<String, (DefaultResponseOnlyCelExpression<'static>, String)>> = RefCell::new(HashMap::new());
    static FULL_CEL_EXPRS: RefCell<HashMap<String, (DefaultFullCelExpression<'static>, String)>> = RefCell::new(HashMap::new());

}
```

The `HashMap` uses the request path as the key, and a tuple of `(DefaultResponseOnlyCelExpression, String)` as the value. `DefaultResponseOnlyCelExpression` is a parsed CEL expression definition and `String` is the stringified version of it.

`DefaultResponseOnlyCelExpression` is used when only the response is to be certified. If the request is also to be certified, then `DefaultFullCelExpression` should be used. Separate `HashMap`s are created to hold different types of CEL expressions, alternatively, the higher-level `DefaultCelExpression` can hold any type of CEL expression using the "Default" scheme within a single `HashMap`. In the future, there may be more schemes, and the higher-level `CelExpression` will be able to hold CEL expressions from those different schemes. It is up to the developers to decide how they want to store and organize their CEL expressions.

In this example, there are two different CEL expressions used, a "full" CEL expression and a "response-only" CEL expression. The "full" CEL expression is used for every certified response except for the "Not found" response. For more information on defining CEL expressions, see the relevant section in the [`ic-http-certification` docs](https://docs.rs/ic-http-certification/latest/ic_http_certification/#defining-cel-expressions).

```rust
const TODOS_PATH: &str = "todos";
const NOT_FOUND_PATH: &str = "";

fn prepare_cel_exprs() {
    // define a full CEL expression that will certify the following:
    // - request
    //   - method
    //   - body
    //   - no headers
    //   - no query parameters
    // - response
    //   - status code
    //   - body
    //   - all headers
    // this CEL expression will be used for all routes except for the not found route
    let cel_expr_def = DefaultCelBuilder::full_certification()
        .with_request_headers(vec![])
        .with_request_query_parameters(vec![])
        .with_response_certification(DefaultResponseCertification::response_header_exclusions(
            vec![],
        ))
        .build();

    // also pre-compute the stringified CEL expression
    let cel_expr_str = cel_expr_def.to_string();

    // insert the CEL expressions
    FULL_CEL_EXPRS.with_borrow_mut(|exprs| {
        // insert on the `/todos` path
        exprs.insert(
            TODOS_PATH.to_string(),
            (cel_expr_def.clone(), cel_expr_str.clone()),
        );
    });

    // define a response-only CEL expression that will certify the following:
    // - response
    //   - status code
    //   - body
    //   - all headers
    // this CEL expression will be used for the not found route
    let not_found_cel_expr_def = DefaultCelBuilder::response_only_certification()
        .with_response_certification(DefaultResponseCertification::response_header_exclusions(
            vec![],
        ))
        .build();

    // also pre-compute the stringified CEL expression
    let not_found_cel_expr = not_found_cel_expr_def.to_string();

    RESPONSE_ONLY_CEL_EXPRS.with_borrow_mut(|exprs| {
        // insert on the not found path
        exprs.insert(
            NOT_FOUND_PATH.to_string(),
            (not_found_cel_expr_def, not_found_cel_expr),
        );
    });
}
```

## Response Headers

The security headers added to responses are based on the [OWASP Secure Headers project](https://owasp.org/www-project-secure-headers/index.html).

These security headers have been included as a reasonably secure default for most JSON-based APIs. However, it's vitally important for developers to educate themselves and make informed decisions in the context of their own project's needs.

Some headers from this project have not been included:

- `X-Frame-Options`: This header is used to prevent clickjacking attacks by embedding web content inside a malicious webpage. Pure JSON APIs are typically not vulnerable to this attack since they are not directly renderable in a browser. However, this header can be included additionally by developers with a value of `deny` or `sameorigin` to err on the side of caution.
- `Content-Security-Policy` (CSP): This header is used to prevent cross-site scripting (XSS) attacks on sites that render HTML content. It defines what sources the browser should consider valid for loading scripts, stylesheets, or other resources within the context of the loaded page. Since pure JSON APIs are not directly rendered within a browser they are not vulnerable to this attack. This header can also be additionally included by developers to err on the side of caution.
- `X-Permitted-Cross-Domain-Policies`: This header was used to provide access control for legacy technologies such as Adobe Flash or Acrobat, but these technologies are largely obsolete now and modern JSON-based APIs should prefer using `Access-Control-Allow-Origin` (CORS) headers.
- `Clear-Site-Data`: This header is used to tell browsers to clear site-specific data such as local storage, cookies, or caches. Since this API does not set cookies, there's no need to include the header.
- `Cross-Origin-Embedder-Policy`: This header is used to mitigate Spectre or Meltdown attacks by preventing a website from embedding another website's subresources. Since pure JSON APIs are not directly rendered within a browser they are not vulnerable to these attacks.
- `Cross-Origin-Opener-Policy`: This header is used to prevent websites opened in a new tab or window from maintaining access to the original opener tab or window. Since pure JSON APIs are not directly rendered within a browser they are not vulnerable to this attack.
- `Cross-Origin-Resource-Policy`: This header is used to limit access to an API from other origins. CORS should be preferred as a more modern approach to access control, but this header can be included if it is expected for an older browser to access the API.
- `Permissions-Policy`: This header is used to limit what features and APIs (e.g. geolocation, camera, microphone) the browser is allowed to access in the context of a website. Since pure JSON APIs are not directly rendered within a browser this header is not relevant.

To facilitate the consistent usage of these headers, there is a reusable `create_response` function used when creating responses:

```rust
fn create_response(status_code: u16, body: Vec<u8>) -> HttpResponse {
    HttpResponse {
        status_code,
        headers: vec![
            ("content-type".to_string(), "application/json".to_string()),
            (
                "strict-transport-security".to_string(),
                "max-age=31536000; includeSubDomains".to_string(),
            ),
            ("x-content-type-options".to_string(), "nosniff".to_string()),
            ("referrer-policy".to_string(), "no-referrer".to_string()),
            (
                "cache-control".to_string(),
                "no-store, max-age=0".to_string(),
            ),
            ("pragma".to_string(), "no-cache".to_string()),
        ],
        body,
        upgrade: None,
    }
}
```

## Responses

The HTTP certification tree has a dedicated data structure while responses, similarly to CEL expressions, are stored in a `HashMap`, along with their respective certifications. The responses and certifications are stored separately from the CEL expressions because they are likely to change throughout the canister's lifecycle, whereas the CEL expressions are set only once. They could all also be stored within the same structure if a developer wishes.

Fallback responses (such as the "not found" response) are stored separately from other responses. This is done to allow for simpler routing logic for responses which will be described in more detail later in this guide.

```rust
struct CertifiedHttpResponse {
    response: HttpResponse,
    certification: HttpCertification,
}

thread_local! {
    static FALLBACK_RESPONSES: RefCell<HashMap<String, CertifiedHttpResponse>> = RefCell::new(HashMap::new());
    static RESPONSES: RefCell<HashMap<(String, String), CertifiedHttpResponse>> = RefCell::new(HashMap::new());

    static HTTP_TREE: RefCell<HttpCertificationTree> = RefCell::new(HttpCertificationTree::default());
}
```

Responses are certified with several steps, which are encapsulated into a reusable function:

- Removing any existing responses and certifications for the request path.
  - This is done to prevent multiple responses from being certified for a given request path.
- Retrieve the pre-computed CEL expression for the request path.
- Insert the `Ic-CertificationExpression` header for the given response, with the corresponding stringified CEL expression as its value.
- Calculate the certification for the given response and CEL expression.
- Store the response together with its certification.
- Insert the certification into the certification tree at the appropriate path.
- Update the canister's [certified data](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-certified-data).

For more information on creating certifications, see the relevant section in the [`ic-http-certification` docs](https://docs.rs/ic-http-certification/latest/ic_http_certification/#creating-certifications).

```rust
const IC_CERTIFICATE_EXPRESSION_HEADER: &str = "IC-CertificateExpression";

fn certify_response(
    request: HttpRequest,
    mut response: HttpResponse,
    tree_path: &HttpCertificationPath,
) {
    let request_path = request.get_path().unwrap();

    // retrieve and remove any existing response for the request method and path
    let existing_response = RESPONSES.with_borrow_mut(|responses| {
        responses.remove(&(request.method.clone(), request_path.clone()))
    });

    // if there is an existing response, remove its certification from the certification tree
    if let Some(existing_response) = existing_response {
        HTTP_TREE.with_borrow_mut(|http_tree| {
            http_tree.delete(&HttpCertificationTreeEntry::new(
                tree_path.clone(),
                &existing_response.certification,
            ));
        })
    }

    let certification = FULL_CEL_EXPRS.with_borrow(|cel_exprs| {
        // get the appropriate CEL expression for the provided request path
        let (cel_expr_def, cel_expr_str) = cel_exprs.get(&request_path).unwrap();

        // insert the `Ic-CertificationExpression` header with the stringified CEL expression as its value
        response.headers.push((
            IC_CERTIFICATE_EXPRESSION_HEADER.to_string(),
            cel_expr_str.to_string(),
        ));

        // create the certification for this response and CEL expression pair
        HttpCertification::full(cel_expr_def, &request, &response, None).unwrap()
    });

    RESPONSES.with_borrow_mut(|responses| {
        // store the response for later retrieval
        responses.insert(
            (request.method, request_path),
            CertifiedHttpResponse {
                response: response.clone(),
                certification: certification.clone(),
            },
        );
    });

    HTTP_TREE.with_borrow_mut(|http_tree| {
        // insert the certification into the certification tree
        http_tree.insert(&HttpCertificationTreeEntry::new(tree_path, &certification));

        // set the canister's certified data
        set_certified_data(&http_tree.root_hash());
    });
}
```

These steps can now be re-used for each response that needs to be certified:

```rust
fn certify_list_todos_response() {
    let request = HttpRequest {
        url: TODOS_PATH.to_string(),
        method: "GET".to_string(),
        headers: vec![],
        body: vec![],
    };

    let body = TODO_ITEMS.with_borrow(|items| {
        ListTodosResponse::ok(
            &items
                .iter()
                .map(|(_id, item)| item.clone())
                .collect::<Vec<_>>(),
        )
        .encode()
    });
    let response = create_response(200, body);

    certify_response(request, response, &TODOS_TREE_PATH);
}

fn certify_not_allowed_todo_responses() {
    ["HEAD", "PUT", "PATCH", "OPTIONS", "TRACE", "CONNECT"]
        .iter()
        .for_each(|method| {
            let request = HttpRequest {
                url: TODOS_PATH.to_string(),
                method: method.to_string(),
                headers: vec![],
                body: vec![],
            };

            let body = ErrorResponse::not_allowed().encode();
            let response = create_response(405, body);

            certify_response(request, response, &TODOS_TREE_PATH);
        });
}
```

Certifying the "Not found" response requires a slightly different procedure. This is very similar to the reusable `certify_response` function, but the following differences:

- The `HttpCertificationPath` variant used is `wildcard` instead of `exact`.
- A `DefaultResponseOnlyCelExpression` is used instead of a `DefaultFullCelExpression`, retrieved from the `RESPONSE_ONLY_CEL_EXPRS` `HashMap`.
- The response is stored in `FALLBACK_RESPONSES` instead of `RESPONSES`.

```rust
fn certify_not_found_response() {
    let body = ErrorResponse::not_found().encode();
    let mut response = create_response(404, body);

    let tree_path = HttpCertificationPath::wildcard(NOT_FOUND_PATH);

    let certification = RESPONSE_ONLY_CEL_EXPRS.with_borrow(|cel_exprs| {
        // get the appropriate CEL expression for the provided request path
        let (cel_expr_def, cel_expr_str) = cel_exprs.get(NOT_FOUND_PATH).unwrap();

        // insert the `Ic-CertificationExpression` header with the stringified CEL expression as its value
        response.headers.push((
            IC_CERTIFICATE_EXPRESSION_HEADER.to_string(),
            cel_expr_str.to_string(),
        ));

        // create the certification for this response and CEL expression pair
        HttpCertification::response_only(&cel_expr_def, &response, None).unwrap()
    });

    FALLBACK_RESPONSES.with_borrow_mut(|responses| {
        responses.insert(
            NOT_FOUND_PATH.to_string(),
            CertifiedHttpResponse {
                response,
                certification,
            },
        );
    });

    HTTP_TREE.with_borrow_mut(|http_tree| {
        // insert the certification into the certification tree
        http_tree.insert(&HttpCertificationTreeEntry::new(tree_path, &certification));

        // set the canister's certified data
        set_certified_data(&http_tree.root_hash());
    });
}
```

## Serving responses

When serving a certified response, an additional header must be added to the response that will act as proof of certification for the [HTTP gateway](https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec) that will perform validation. Adding this header to the response has been abstracted into a separate function:

```rust
const IC_CERTIFICATE_HEADER: &str = "IC-Certificate";
fn add_certificate_header(
    response: &mut HttpResponse,
    entry: &HttpCertificationTreeEntry,
    request_url: &str,
    expr_path: &[String],
) {
    // get the current certified data of the canister, note that this will not be available in update calls
    let certified_data = data_certificate().expect("No data certificate available");

    // generate a witness for the certification entry and current request URL
    let witness = HTTP_TREE.with_borrow(|http_tree| {
        let witness = http_tree.witness(entry, request_url).unwrap();
        cbor_encode(&witness)
    });

    // encode the path in the tree that holds the certification
    let expr_path = cbor_encode(&expr_path);

    // create the header value and insert it into the response
    response.headers.push((
        IC_CERTIFICATE_HEADER.to_string(),
        format!(
            "certificate=:{}:, tree=:{}:, expr_path=:{}:, version=2",
            BASE64.encode(certified_data),
            BASE64.encode(witness),
            BASE64.encode(expr_path)
        ),
    ));
}
```

With this reusable function, serving certified responses is relatively straightforward:

- First, check if a response for the current request URL and method exists.
- If a response exists, serve it.
- Otherwise, serve the fallback "Not found" response.
- Add the `IC-Certificate` response header.

```rust
fn query_handler(request: &HttpRequest, _params: &Params) -> HttpResponse {
    let request_path = request.get_path().expect("Failed to get req path");

    // first check if there is a certified response for the request method and path
    let (tree_path, certified_response) = RESPONSES
        .with_borrow(|responses| {
            responses
                .get(&(request.method.clone(), request_path.clone()))
                .map(|response| {
                    (
                        HttpCertificationPath::exact(&request_path),
                        response.clone(),
                    )
                })
        })
        // if there is no certified response, use the fallback response
        .unwrap_or_else(|| {
            FALLBACK_RESPONSES.with_borrow(|fallback_responses| {
                fallback_responses
                    .get(NOT_FOUND_PATH)
                    .clone()
                    .map(|response| (NOT_FOUND_TREE_PATH.to_owned(), response.clone()))
                    .unwrap()
            })
        });

    let mut response = certified_response.response;

    add_certificate_header(
        &mut response,
        &HttpCertificationTreeEntry::new(&tree_path, certified_response.certification),
        &request_path,
        &tree_path.to_expr_path(),
    );

    response
}
```

When update calls are made to endpoints that do not update state, return an error to prevent additional cycle costs for these endpoints:

```rust
fn no_update_call_handler(_http_request: &HttpRequest, _params: &Params) -> HttpResponse {
    create_response(405, vec![])
}
```

## Updating state

The to-do list is updatable via `POST`, `PATCH`, and `DELETE` requests. These calls will initially be received as [`query` calls](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-query) which do not allow for updating the canister state, so the query call is [upgraded to an update call](https://internetcomputer.org/docs/current/references/http-gateway-protocol-spec#upgrade-to-update-calls) to allow for the canister's state to change.

```rust
fn upgrade_to_update_call_handler() -> HttpResponse {
    HttpResponse {
        status_code: 200,
        headers: vec![],
        body: vec![],
        upgrade: Some(true),
    }
}
```

Upgrading to an `update` call will instruct the HTTP gateway to remake the request as an [`update` call](https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-call). As an update call, the response to this request does not need to be certified. Since the canister's state has changed, however, the static `query` call responses will need to be re-certified. The same functions that certified these responses in the first place can be reused to achieve this.

For creating todo items:

```rust
fn create_todo_item_handler(req: &HttpRequest, _params: &Params) -> HttpResponse {
    let req_body: CreateTodoItemRequest = json_decode(&req.body);

    let id = NEXT_TODO_ID.with_borrow_mut(|f| {
        let id = *f;
        *f += 1;
        id
    });

    let todo_item = TODO_ITEMS.with_borrow_mut(|items| {
        let todo_item = TodoItem {
            id,
            title: req_body.title,
            completed: false,
        };

        items.insert(id, todo_item.clone());

        todo_item
    });

    certify_list_todos_response();

    let body = CreateTodoItemResponse::ok(&todo_item).encode();
    create_response(201, body)
}
```

For updating todo items:

```rust
fn update_todo_item_handler(req: &HttpRequest, params: &Params) -> HttpResponse {
    let req_body: UpdateTodoItemRequest = json_decode(&req.body);
    let id: u32 = params.get("id").unwrap().parse().unwrap();

    TODO_ITEMS.with_borrow_mut(|items| {
        let item = items.get_mut(&id).unwrap();

        if let Some(title) = req_body.title {
            item.title = title;
        }

        if let Some(completed) = req_body.completed {
            item.completed = completed;
        }
    });

    certify_list_todos_response();

    let body = UpdateTodoItemResponse::ok(&()).encode();
    create_response(200, body)
}
```

And, finally, for deleting todo items:

```rust
fn delete_todo_item_handler(_req: &HttpRequest, params: &Params) -> HttpResponse {
    let id: u32 = params.get("id").unwrap().parse().unwrap();

    TODO_ITEMS.with_borrow_mut(|items| {
        items.remove(&id);
    });

    certify_list_todos_response();

    let body = DeleteTodoItemResponse::ok(&()).encode();
    create_response(204, body)
}
```

## Routing

To set up routing, the [`matchit`](https://docs.rs/matchit/latest/matchit/) crate is used. A router is created for each supported request method and a collection of routers is created separately for query and update calls. These routers are then stored in `HashMap`s:

```rust
thread_local! {
    static QUERY_ROUTER: RefCell<HashMap<String, Router<RouteHandler>>> = RefCell::new(HashMap::new());
    static UPDATE_ROUTER: RefCell<HashMap<String, Router<RouteHandler>>> = RefCell::new(HashMap::new());
}
```

The route handlers are linked to the routers. For query calls, there are only two route handlers used:

- `upgrade_to_update_call_handler` for request methods that will modify the canister state.
- `query_handler` for everything else.

```rust
fn prepare_query_handlers() {
    insert_query_route("POST", "/todos", upgrade_to_update_call_handler);
    insert_query_route("PATCH", "/todos/{id}", upgrade_to_update_call_handler);
    insert_query_route("DELETE", "/todos/{id}", upgrade_to_update_call_handler);

    insert_query_route("GET", "/{*p}", query_handler);
    ["HEAD", "PUT", "OPTIONS", "TRACE", "CONNECT"]
        .iter()
        .for_each(|method| {
            insert_query_route(method, "/{*p}", query_handler);
        });
}

fn insert_query_route(method: &str, path: &str, route_handler: RouteHandler) {
    QUERY_ROUTER.with_borrow_mut(|query_router| {
        let router = query_router.entry(method.to_string()).or_default();

        router.insert(path, route_handler).unwrap();
    });
}
```

For update calls, there are more handlers:

- `create_todo_item_handler` for POST requests.
- `update_todo_item_handler` for PATCH requests.
- `delete_todo_item_handler` for DELETE requests.
- `no_update_call_handler` for everything else.

```rust
fn prepare_update_handlers() {
    insert_update_route("POST", TODOS_PATH, create_todo_item_handler);
    insert_update_route("PATCH", "/todos/{id}", update_todo_item_handler);
    insert_update_route("DELETE", "/todos/{id}", delete_todo_item_handler);

    ["GET", "HEAD", "PUT", "OPTIONS", "TRACE", "CONNECT"]
        .iter()
        .for_each(|method| {
            insert_update_route(method, "/{*p}", no_update_call_handler);
        });
}

fn insert_update_route(method: &str, path: &str, route_handler: RouteHandler) {
    UPDATE_ROUTER.with_borrow_mut(|update_router| {
        let router = update_router.entry(method.to_string()).or_default();

        router.insert(path, route_handler).unwrap();
    });
}
```

## Resources

- [Example source code](https://github.com/dfinity/response-verification/tree/main/examples/http-certification/json-api).
- [`ic-http-certification` crate](https://crates.io/crates/ic-http-certification).
- [`ic-http-certification` docs](https://docs.rs/ic-http-certification/latest/ic_http_certification).
- [`ic-http-certification` source code](https://github.com/dfinity/response-verification/tree/main/packages/ic-http-certification).
- [OWASP Secure Headers Projects](https://owasp.org/www-project-secure-headers/index.html).
