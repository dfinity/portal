---
title: Asset canister
---

# Asset canister

## Overview

The [asset canister](https://github.com/dfinity/sdk/tree/master/src/canisters/frontend/ic-frontend-canister) provides
you with a mechanism to store and retrieve static assets from a canister deployed on the Internet
Computer. It is generally used to serve HTML, JS, and CSS assets
for [single page applications](https://en.wikipedia.org/wiki/Single-page_application), i.e. your application's frontend.

`dfx` provides this canister by default when your canister `type` is set to `assets` in `dfx.json`.

For example:

```json
{
  "canisters": {
    "www": {
      "frontend": {
        "entrypoint": "assets/src/index.html"
      },
      "source": [
        "assets/assets",
        "assets/src"
      ],
      "type": "assets"
    }
  },
  "defaults": {
    "build": {
      "args": "",
      "packtool": ""
    }
  },
  "version": 1
}
```

:::caution
The asset canister can host roughly 1GB in static files. It is recommended that you distribute your files
across multiple canisters if the total size of all your assets begins to exceed this amount. Once you exceed this
figure, your canister may fail to upgrade.  
:::

<br/>

## Architecture

The asset canister is written in Rust and exposes the following methods:

```go
#[update]
async fn authorize(other: Principal)

#[update]
async fn grant_permission(arg: GrantPermissionArguments)

#[update]
async fn validate_grant_permission(arg: GrantPermissionArguments) -> Result<String, String>

#[update]
async fn deauthorize(other: Principal)

#[update]
async fn revoke_permission(arg: RevokePermissionArguments)

#[update]
async fn validate_revoke_permission(arg: RevokePermissionArguments) -> Result<String, String>

#[update]
fn list_authorized() -> Vec<Principal>

#[query(manual_reply = true)]
fn list_permitted(arg: ListPermittedArguments) -> ManualReply<Vec<Principal>>

#[update]
async fn take_ownership()

#[query]
fn retrieve(key: Key) -> RcBytes

#[update(guard = "can_commit")]
fn store(arg: StoreArg)

#[update(guard = "can_prepare")]
fn create_batch() -> CreateBatchResponse

#[update(guard = "can_prepare")]
fn create_chunk(arg: CreateChunkArg) -> CreateChunkResponse

#[update(guard = "can_commit")]
fn create_asset(arg: CreateAssetArguments)

#[update(guard = "can_commit")]
fn set_asset_content(arg: SetAssetContentArguments)

#[update(guard = "can_commit")]
fn unset_asset_content(arg: UnsetAssetContentArguments)

#[update(guard = "can_commit")]
fn delete_asset(arg: DeleteAssetArguments)

#[update(guard = "can_commit")]
fn clear()

#[update(guard = "can_commit")]
fn commit_batch(arg: CommitBatchArguments)

#[query]
fn get(arg: GetArg) -> EncodedAsset

#[query]
fn get_chunk(arg: GetChunkArg) -> GetChunkResponse

#[query]
fn list() -> Vec<AssetDetails>

#[query]
fn certified_tree() -> CertifiedTree

#[query]
fn http_request(req: HttpRequest) -> HttpResponse

#[query]
fn http_request_streaming_callback(token: StreamingCallbackToken) -> StreamingCallbackHttpResponse

#[query]
fn get_asset_properties(key: Key) -> AssetProperties

#[update(guard = "can_commit")]
fn set_asset_properties(arg: SetAssetPropertiesArguments)
```

<br/>

## Configuration

You can configure how the asset canister responds to requests for specific assets by defining your
desired configuration in a file named `.ic-assets.json`

Each entry in `.ic-assets.json` allows for specifying a glob pattern along with the headers to be returned in
the response for any file that matches the pattern. You may also dictate whether redirects are performed from the
non-certified endpoint to a certified endpoint for any given filename pattern.

Here is a sample:

```json
[
  {
    "match": "**/*",
    "headers": {
      // Security: The Content Security Policy (CSP) given below aims at working with many apps rather than providing maximal security.
      // We recommend tightening the CSP for your specific application. Some recommendations are as follows:
      // - Use the CSP Evaluator (https://csp-evaluator.withgoogle.com/) to validate the CSP you define.
      // - Follow the “Strict CSP” recommendations (https://csp.withgoogle.com/docs/strict-csp.html). However, note that in the context of the IC,
      //   nonces cannot be used because the response bodies must be static to work well with HTTP asset certification.
      //   Thus, we recommend to include script hashes (in combination with strict-dynamic) in the CSP as described
      //   in https://csp.withgoogle.com/docs/faq.html in section “What if my site is static and I can't add nonces to scripts?”.
      //   See for example the II CSP (https://github.com/dfinity/internet-identity/blob/main/src/internet_identity/src/http.rs).
      // - It is recommended to tighten the connect-src directive. With the current CSP configuration the browser can
      //   make requests to https://*.icp0.io, hence being able to call any canister via https://icp0.io/api/v2/canister/{canister-ID}.
      //   This could potentially be used in combination with another vulnerability (e.g. XSS) to exfiltrate private data.
      //   The developer can configure this policy to only allow requests to their specific canisters,
      //   e.g: connect-src 'self' https://icp0.io/api/v2/canister/{my-canister-ID}, where {my-canister-ID} has the following format: aaaaa-aaaaa-aaaaa-aaaaa-aaa
      // - It is recommended to configure style-src, style-src-elem and font-src directives with the resources your canister is going to use
      //   instead of using the wild card (*) option. Normally this will include 'self' but also other third party styles or fonts resources (e.g: https://fonts.googleapis.com or other CDNs)

      // Notes about the CSP below:
      // - script-src 'unsafe-eval' is currently required because agent-js uses a WebAssembly module for the validation of bls signatures.
      //   There is currently no other way to allow execution of WebAssembly modules with CSP.
      //   See: https://github.com/WebAssembly/content-security-policy/blob/main/proposals/CSP.md.
      // - We added img-src data: because data: images are used often.
      // - frame-ancestors: none mitigates clickjacking attacks. See https://owasp.org/www-community/attacks/Clickjacking.
      "Content-Security-Policy": "default-src 'self';script-src 'self' 'unsafe-eval';connect-src 'self' https://icp0.io https://*.icp0.io;img-src 'self' data:;style-src * 'unsafe-inline';style-src-elem * 'unsafe-inline';font-src *;object-src 'none';base-uri 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;",
      // Security: The permissions policy disables all features for security reasons. If your site needs such permissions, activate them.
      // To configure permissions go here https://www.permissionspolicy.com/
      "Permissions-Policy": "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), speaker-selection=(), conversion-measurement=(), focus-without-user-activation=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), sync-script=(), trust-token-redemption=(), window-placement=(), vertical-scroll=()",
      // Security: Mitigates clickjacking attacks.
      // See: https://owasp.org/www-community/attacks/Clickjacking.
      "X-Frame-Options": "DENY",
      // Security: Avoids forwarding referrer information to other origins.
      // See: https://owasp.org/www-project-secure-headers/#referrer-policy.
      "Referrer-Policy": "same-origin",
      // Security: Tells the user’s browser that it must always use HTTPS with your site.
      // See: https://owasp.org/www-project-secure-headers/#http-strict-transport-security
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      // Security: Prevents the browser from interpreting files as a different MIME type to what is specified in the Content-Type header.
      // See: https://owasp.org/www-project-secure-headers/#x-content-type-options
      "X-Content-Type-Options": "nosniff",
      // Security: Enables browser features to mitigate some of the XSS attacks. Note that it has to be in mode=block.
      // See: https://owasp.org/www-community/attacks/xss/
      "X-XSS-Protection": "1; mode=block"
    },
    // redirect all requests from .raw.icp0.io to .icp0.io (this redirection is the default)
    "allow_raw_access": false
  }
]
```

## Troubleshooting

Here are some common resolutions for issues encountered with the asset canister.

### Asset canister fails to upgrade

It is likely that the total size of all the static files stored in your asset canister exceed the
recommended 1GB limit. The resolution is to uninstall and redeploy your canister code.

```bash
dfx canister uninstall-code <CANISTER NAME or ID>
```

```bash
dfx deploy --upgrade-unchanged <CANISTER NAME>
```

:::caution
This will incur downtime. This first uninstalls the Wasm module from your canister. During this period, your canister
will not be reachable. The second command redeploys with fresh state, after which point, your canister will be available
to serve assets again.
:::