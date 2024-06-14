# Serving static assets over HTTP (custom)

## Overview

This guide walks through an example project that demonstrates how to create a canister that can serve certified static assets (HTML, CSS, JS) over HTTP. The example project presents a very simple single-page JavaScript application. Assets are embedded into the canister when it is compiled.

This is not a beginner's canister development guide. Many foundational concepts that a relatively experienced canister developer should already know will be omitted. Concepts specific to HTTP Certification will be called out here and can help to understand the [full code example](https://github.com/dfinity/response-verification/tree/main/examples/http-certification/custom-assets).

## Prerequisites

It's recommended to check out earlier guides before reading this one. The JSON API example in particular will be referenced and the previous static assets guide will be best suited for most projects. The approach followed in this guide is better tailored for extreme edge cases that require additional flexibility.

- [x] Complete the ["Serving static assets over HTTP"](https://internetcomputer.org/docs/current/developer-docs/web-apps/http-compatible-canisters/serving-static-assets-over-http) guide.
- [x] Complete the ["Custom HTTP Canisters"](https://internetcomputer.org/docs/current/developer-docs/http-compatible-canisters/custom-http-canisters) guide.
- [x] Complete the ["Serving JSON over HTTP"](https://internetcomputer.org/docs/current/developer-docs/http-compatible-canisters/serving-json-over-http) guide.

## The frontend assets

The frontend project used for this example is a simple starter project generated with `npx degit solidjs/templates/ts my-app`. The only changes that have been made are in the `vite.config.ts` file. The `vite-plugin-compression` plugin was added and configured to generate Gzip and Brotli encoded assets, alongside the original assets. The `ext` configuration affects the file extension and it's important to keep this consistent with the backend canister code that will be seen later in this guide.

```ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// import the compression plugin
import viteCompressionPlugin from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    solidPlugin(),

    // setup Gzip compression
    viteCompressionPlugin({
      algorithm: 'gzip',
      // this extension will be referenced later in the canister code
      ext: '.gzip',
      // ensure to not delete the original files
      deleteOriginFile: false,
      threshold: 0,
    }),

    // setup Brotli compression
    viteCompressionPlugin({
      algorithm: 'brotliCompress',
      // this extension will be referenced later in the canister code
      ext: '.br',
      // ensure to not delete the original files
      deleteOriginFile: false,
      threshold: 0,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
```

The rest of this guide will address the canister code.

## Lifecycle

The lifecycle hooks are set up similarly to the JSON API.

```rust
#[init]
fn init() {
    prepare_cel_exprs();
    certify_all_assets();
}

#[post_upgrade]
fn post_upgrade() {
    init();
}
```

## CEL Expressions

CEL expressions are also stored similarly to the [JSON API example](https://internetcomputer.org/docs/current/developer-docs/http-compatible-canisters/serving-json-over-http).

```rust
thread_local! {
    static CEL_EXPRS: RefCell<HashMap<String, (DefaultResponseOnlyCelExpression<'static>, String)>> = RefCell::new(HashMap::new());
}
```

The CEL expression definition is simpler in the case of assets as the same CEL expression is used for every asset, including the fallback response.

```rust
fn prepare_cel_exprs() {
    let asset_cel_expr_def = DefaultCelBuilder::response_only_certification()
        .with_response_certification(DefaultResponseCertification::response_header_exclusions(vec![]))
        .build();

    let asset_cel_expr = asset_cel_expr_def.to_string();

    CEL_EXPRS.with_borrow_mut(|exprs| {
        exprs.insert(
            ASSET_CEL_EXPR_PATH.to_string(),
            (asset_cel_expr_def, asset_cel_expr),
        );
    });
}
```

## Assets

Assets are embedded into the canister's Wasm at build time. This is achieved using the [`include_dir`](https://michael-f-bryan.github.io/include_dir/include_dir/index.html) crate. Note that this works fine for a small number of assets, but a larger number of assets may cause longer compile times, as mentioned in the [crate's documentation](https://michael-f-bryan.github.io/include_dir/include_dir/index.html#compile-time-considerations).

The assets are imported from the frontend build directory:

```rust
static ASSETS_DIR: Dir<'_> = include_dir!("$CARGO_MANIFEST_DIR/../frontend/dist");
```

With the assets loaded, similar to the [JSON API](https://internetcomputer.org/docs/current/developer-docs/http-compatible-canisters/serving-json-over-http), the pre-calculated responses and certifications need to be stored somewhere. In this example, however, a slightly different structure is used.

Instead of storing the `HttpResponse` directly, a custom type `HttpAssetResponse` is used instead. The only difference between `HttpAssetResponse` and the original `HttpResponse` is that it holds a **reference** to a `u8` slice instead of a `Vec<u8>`. If the original `HttpResponse` was used here, it would essentially duplicate the original asset content that is statically embedded in the canister's Wasm by cloning it and storing it in the `RESPONSE`s `HashMap`. [`Cow`](https://doc.rust-lang.org/std/borrow/enum.Cow.html) is also used here for flexibility, in case there is any scenario where there is no static reference to data, such as a dynamic asset that is built at runtime. There is no such scenario in this example, however.

Encoded assets are stored in a separate `HashMap` to make routing easier. This will be more apparent later in this guide.

```rust
#[derive(Debug, Clone)]
struct HttpAssetResponse<'a> {
    pub status_code: u16,
    pub headers: Vec<HeaderField>,
    pub body: Cow<'a, [u8]>,
}

impl Into<HttpResponse> for HttpAssetResponse<'_> {
    fn into(self) -> HttpResponse {
        HttpResponse {
            status_code: self.status_code,
            headers: self.headers,
            body: self.body.to_vec(),
            upgrade: None,
        }
    }
}

struct CertifiedHttpResponse<'a> {
    response: HttpAssetResponse<'a>,
    certification: HttpCertification,
}

thread_local! {
    static RESPONSES: RefCell<HashMap<String, CertifiedHttpResponse<'static>>> = RefCell::new(HashMap::new());
    static ENCODED_RESPONSES: RefCell<HashMap<(String, String), CertifiedHttpResponse<'static>>> = RefCell::new(HashMap::new());
}
```

Certifying responses is more involved here compared to the simpler approach used in the [JSON API](https://internetcomputer.org/docs/current/developer-docs/http-compatible-canisters/serving-json-over-http) example. There are some paths used in the following functions that warrant some explanation:

- `asset_tree_path`: the `HttpCertificationPath` that will be used to store the asset in the tree, for example, `HttpCertificationPath::exact("/assets/app.js")`.
- `asset_file_path`: the relative file path of the asset on disk before being imported into the canister, for example, `assets/app.js`.
- `asset_req_path`: the absolute path that will be used to request the asset `/assets/app.js` from a browser.

The first step is defining a reusable function to create a response with all of the necessary default headers. This function is very similar to the counterpart in the [JSON API](https://internetcomputer.org/docs/current/developer-docs/http-compatible-canisters/serving-json-over-http) example with the biggest difference being in the headers that are used. Since the responses from an API serving static assets will be rendered directly in the browser, more security-focused headers are necessary:

```rust
fn create_asset_response(
    additional_headers: Vec<HeaderField>,
    body: &[u8],
    cel_expr: String,
) -> HttpAssetResponse {
    // set up the default headers and include additional headers provided by the caller
    let mut headers = vec![
        ("strict-transport-security".to_string(), "max-age=31536000; includeSubDomains".to_string()),
        ("x-frame-options".to_string(), "DENY".to_string()),
        ("x-content-type-options".to_string(), "nosniff".to_string()),
        ("content-security-policy".to_string(), "default-src 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; block-all-mixed-content".to_string()),
        ("referrer-policy".to_string(), "no-referrer".to_string()),
        ("permissions-policy".to_string(), "accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),gamepad=(),geolocation=(),gyroscope=(),layout-animations=(self),legacy-image-formats=(self),magnetometer=(),microphone=(),midi=(),oversized-images=(self),payment=(),picture-in-picture=(),publickey-credentials-get=(),speaker-selection=(),sync-xhr=(self),unoptimized-images=(self),unsized-media=(self),usb=(),screen-wake-lock=(),web-share=(),xr-spatial-tracking=()".to_string()),
        ("cross-origin-embedder-policy".to_string(), "require-corp".to_string()),
        ("cross-origin-opener-policy".to_string(), "same-origin".to_string()),
        ("content-length".to_string(), body.len().to_string()),
        (IC_CERTIFICATE_EXPRESSION_HEADER.to_string(), cel_expr),
    ];
    headers.extend(additional_headers);

    HttpAssetResponse {
        status_code: 200,
        headers,
        body: Cow::Borrowed(body),
    }
}
```

The next function to look at is a reusable function that can certify any asset.

Note that when the certification is created, the `HttpAssetResponse` is converted into an `HttpResponse`, which will temporarily clone the entire asset body, but this will then be dropped once it goes out of scope.

```rust
const IC_CERTIFICATE_EXPRESSION_HEADER: &str = "IC-CertificateExpression";
fn certify_asset_response(
    body: &'static [u8],
    additional_headers: Vec<HeaderField>,
    asset_tree_path: &HttpCertificationPath,
    asset_req_path: String,
) {
    CEL_EXPRS.with_borrow(|cel_exprs| {
        // get the relevant CEL expression
        let (cel_expr_def, cel_expr_str) = cel_exprs.get(*ASSET_CEL_EXPR_PATH).unwrap();

        // create the response
        let response = create_asset_response(additional_headers, body, cel_expr_str.to_string());

        // certify the response
        let certification =
            HttpCertification::response_only(cel_expr_def, &response.clone().into(), None).unwrap();

        RESPONSES.with_borrow_mut(|responses| {
            // store the response for later retrieval
            responses.insert(
                asset_req_path,
                CertifiedHttpResponse {
                    response,
                    certification: certification.clone(),
                },
            );
        });

        HTTP_TREE.with_borrow_mut(|http_tree| {
            // add the certification to the certification tree
            http_tree.insert(&HttpCertificationTreeEntry::new(
                asset_tree_path,
                &certification,
            ));

            // set the canister's certified data
            set_certified_data(&http_tree.root_hash());
        });
    });
}
```

The next function to look at is another reusable function to certify an asset with a specific encoding. This function will check for a file with an additional file extension matching the requested encoding in the statically included asset directory.

For example, when certifying `index.html` with `gzip` encoding, this function will check for `index.html.gzip`. If the encoded asset exists, then it is certified using a procedure similar to the previously defined `certify_asset_response` function. The primary difference in this function is where the encoded asset response is stored.

This function will silently fail if the encoded file does not exist. This is necessary because the frontend project contains assets that will not be encoded. Images, for example, are already in a compressed format so they are not encoded.

```rust
fn certify_asset_with_encoding(
    asset_file_path: &str,
    asset_tree_path: &HttpCertificationPath,
    asset_req_path: String,
    encoding: &str,
    additional_headers: Vec<HeaderField>,
) {
    // check if the file exists before certifying it
    if let Some(file) = ASSETS_DIR.get_file(format!("{}.{}", asset_file_path, encoding)) {
        let body = file.contents();

        // add the content encoding header
        let mut headers = vec![("content-encoding".to_string(), encoding.to_string())];
        headers.extend(additional_headers);

        CEL_EXPRS.with_borrow(|cel_exprs| {
            // get the relevant CEL expression
            let (cel_expr_def, cel_expr_str) = cel_exprs.get(*ASSET_CEL_EXPR_PATH).unwrap();

            // create the response
            let response = create_asset_response(headers, body, cel_expr_str.to_string());

            // certify the response
            let certification =
                HttpCertification::response_only(cel_expr_def, &response.clone().into(), None)
                    .unwrap();

            ENCODED_RESPONSES.with_borrow_mut(|responses| {
                // store the response for later retrieval
                responses.insert(
                    (asset_req_path, encoding.to_string()),
                    CertifiedHttpResponse {
                        response,
                        certification: certification.clone(),
                    },
                );
            });

            HTTP_TREE.with_borrow_mut(|http_tree| {
                // add the certification to the certification tree
                http_tree.insert(&HttpCertificationTreeEntry::new(
                    asset_tree_path,
                    &certification,
                ));

                // set the canister's certified data
                set_certified_data(&http_tree.root_hash());
            });
        });
    };
}
```

Next is another simple function that will certify an asset for all encodings: Identity (the original), Gzip, and Brotli. This function leverages the `certify_asset_response` for the Identity encoding and `certify_asset_with_encoding` for the other encodings.

```rust
fn certify_asset(
    body: &'static [u8],
    asset_file_path: String,
    asset_tree_path: &HttpCertificationPath,
    asset_req_path: String,
    additional_headers: Vec<HeaderField>,
) {
    certify_asset_response(
        body,
        additional_headers.clone(),
        asset_tree_path,
        asset_req_path.to_string(),
    );
    certify_asset_with_encoding(
        &asset_file_path,
        asset_tree_path,
        asset_req_path.to_string(),
        "gzip",
        additional_headers.clone(),
    );
    certify_asset_with_encoding(
        &asset_file_path,
        asset_tree_path,
        asset_req_path.to_string(),
        "br",
        additional_headers,
    );
}
```

Now, a slightly more complex function certifies a range of assets that match a glob (for example `assets/**/*.js`) with a content type, (for example `text/javascript`).

```rust
fn certify_asset_glob(glob: &str, content_type: &str) {
    // iterate over every asset matching the glob
    for identity_file in ASSETS_DIR
        .find(glob)
        .unwrap()
        .map(|entry| entry.as_file().unwrap())
    {
        // compute the different paths needed for this asset
        let asset_file_path = identity_file.path().to_str().unwrap().to_string();
        let asset_req_path = if !asset_file_path.starts_with("/") {
            format!("/{}", asset_file_path)
        } else {
            asset_file_path.clone()
        };
        let asset_tree_path = HttpCertificationPath::exact(&asset_req_path);

        // add the content-type and cache-control headers
        let additional_headers = vec![
            ("content-type".to_string(), content_type.to_string()),
            (
                "cache-control".to_string(),
                "public, max-age=31536000, immutable".to_string(),
            ),
        ];

        let body = identity_file.contents();
        certify_asset(
            body,
            asset_file_path.to_string(),
            &asset_tree_path,
            asset_req_path.to_string(),
            additional_headers,
        );
    }
}
```

Lastly, a function specifically to certify the `index.html` file. Since the frontend project is a single-page application, any request that doesn't match an existing file should fallback to `index.html`, so certification is handled differently for this file, notably by using `HttpCertificationPath::wildcard()` instead of `HttpCertificationPath::exact()` as the certification tree path.

This will allow the canister to return this file for any path that does not exactly match an existing path in the tree. If the canister tries to return this file instead of an exact match that exists, verification will fail.

```rust
lazy_static! {
    static ref INDEX_REQ_PATH: &'static str = "";
    static ref INDEX_TREE_PATH: HttpCertificationPath<'static> = HttpCertificationPath::wildcard(*INDEX_REQ_PATH);
    static ref INDEX_FILE_PATH: &'static str = "index.html";
}

fn certify_index_asset() {
    let additional_headers = vec![
        ("content-type".to_string(), "text/html".to_string()),
        (
            "cache-control".to_string(),
            "public, no-cache, no-store".to_string(),
        ),
    ];

    let identity_file = ASSETS_DIR
        .get_file(*INDEX_FILE_PATH)
        .expect("No index.html file found!!!");
    let body = identity_file.contents();

    certify_asset(
        body,
        INDEX_FILE_PATH.to_string(),
        &*INDEX_TREE_PATH,
        INDEX_REQ_PATH.to_string(),
        additional_headers,
    );
}
```

With all of the above functions, it is now possible to certify all of the frontend project's assets simply.

```rust
fn certify_all_assets() {
    certify_index_asset();
    certify_asset_glob("assets/**/*.css", "text/css");
    certify_asset_glob("assets/**/*.js", "text/javascript");
    certify_asset_glob("assets/**/*.ico", "image/x-icon");
    certify_asset_glob("assets/**/*.svg", "image/svg+xml");
}
```

## Serving assets

With all assets certified, they can be served over HTTP. The steps to follow when serving assets are:

- Check if the requested path matches a file (e.g., `/assets/app.js`).
  - If the request path exactly matches an existing file, serve that file.
  - Otherwise, serve the `index.html` file.
- Extract the request `content-encoding` header.
  - Serve the Brotli encoded asset if it exists and it was requested.
  - Otherwise, serve the Gzip encoded asset if it exists and it was requested.
  - Otherwise, serve the original asset.
- Add the certificate header. This is the same process as with the [JSON API](https://internetcomputer.org/docs/current/developer-docs/http-compatible-canisters/serving-json-over-http).

```rust
fn asset_handler(req: &HttpRequest) -> HttpResponse {
    let req_path = req.get_path().expect("Failed to get req path");

    RESPONSES.with_borrow(|responses| {
        ENCODED_RESPONSES.with_borrow(|encoded_responses| {
            let (asset_req_path, asset_tree_path, identity_response) =
            // if the requested path matches a static asset, serve that
            if let Some(identity_response) = responses.get(&req_path) {
                (
                    req_path.to_string(),
                    HttpCertificationPath::exact(&req_path),
                    identity_response,
                )
            // otherwise serve the index.html
            } else {
                (
                    INDEX_REQ_PATH.to_string(),
                    INDEX_TREE_PATH.to_owned(),
                    responses.get(*INDEX_REQ_PATH).unwrap(),
                )
            };

            // extract the content encoding header
            let content_encoding = req.headers.iter().find_map(|(name, value)| {
                if name.to_lowercase() == "accept-encoding" {
                    Some(value)
                } else {
                    None
                }
            });

            let CertifiedHttpResponse {
                certification,
                response,
            } = content_encoding
                .and_then(|encoding| {
                    // if the request asks for Brotli and it's available for this file, serve that version
                    if encoding.contains("br") {
                        if let Some(br_response) =
                            encoded_responses.get(&(asset_req_path.clone(), "br".to_string()))
                        {
                            return Some(br_response);
                        }
                    }

                    // if the request asks for Gzip and it's available for this file, serve that version
                    if encoding.contains("gzip") {
                        if let Some(gzip_response) =
                            encoded_responses.get(&(asset_req_path, "gzip".to_string()))
                        {
                            return Some(gzip_response);
                        }
                    }

                    None
                })
                // otherwise serve the identity version
                .unwrap_or(identity_response);

            let mut response: HttpResponse = response.clone().into();

            add_certificate_header(
                &mut response,
                &HttpCertificationTreeEntry::new(&asset_tree_path, certification),
                &req_path,
                &asset_tree_path.to_expr_path(),
            );

            response
        })
    })
}
```

This function can then be simply linked up to the `http_request` handler:

```rust
#[query]
fn http_request(req: HttpRequest) -> HttpResponse {
    asset_handler(&req)
}
```

## Resources

- [Example source code](https://github.com/dfinity/response-verification/tree/main/examples/http-certification/custom-assets).
- [`ic-http-certification` crate](https://crates.io/crates/ic-http-certification).
- [`ic-http-certification` docs](https://docs.rs/ic-http-certification/latest/ic_http_certification).
- [`ic-http-certification` source code](https://github.com/dfinity/response-verification/tree/main/packages/ic-http-certification)
