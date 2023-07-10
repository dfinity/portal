# 8: Optimizing Rust canisters

## Overview
Compiling Rust to Wasm often increases the file size significantly. The [DFINITY Rust CDK](../../../developer-docs/backend/rust/index.md) includes a helper library—`ic-wasm`—that you can use to reduce the size of Rust-based canisters before deploying them on the Internet Computer blockchain mainnet.

## Prerequisites

Before getting started, assure you have set up your developer environment according to the instructions in the [developer environment guide](./3-dev-env.md).

This guide assumes you have an existing canister that you'd like to optimize. To get an existing canister, review the previous documentation pages in this section. 

## Reducing cycle consumption
The first step towards an optimized system is profiling. Start by measuring the number of instructions your endpoints consume.

The `instruction_counter` API will tell you the number of instructions your code has consumed since the last entry point. Instructions are the internal currency of the IC runtime; one IC instruction is the quantum of work that the system can do, such as loading a 32-bit integer from a memory address. The system assigns an instruction cost equivalent to each Wasm instruction and system call. It also defines all its limits in terms of instructions. For a detailed breakdown of the current instruction and Wasm limitations on the IC, please review [this page](../../backend/resource-limits.md).


The following is an example method that can be used to measures the number of instructions:

```
#[update]
async fn transfer(from: Account, to: Account, amount: Nat) -> Result<TxId, Error> {
  let start = ic_cdk::api::instruction_counter();
let tx = apply_transfer(from, to, amount)?;
  let tx_id = archive_transaction(tx).await?;
// NOTE: the await point above resets the instruction counter.
  let end = ic_cdk::api::instruction_counter();
  record_measurement(end - start);
Ok(tx_id)
}
```

### Encode byte arrays using the `serde_bytes` package

Candid is the standard interface definition language on the IC. The Rust implementation of Candid relies on a popular serde framework and inherits all of serde’s quirks. One such quirk is the inefficient encoding of byte arrays `(Vec<u8> and [u8])` in most serialization formats. Due to Rust limitations, serde cannot treat byte arrays specially and encodes each byte as a separate element in a generic array, increasing the number of instructions required to encode or decode the message (often by a factor of ten or more).

The `HttpResponse` from the canister HTTP protocol is a good example:

```
#[derive(CandidType, Deserialize)]
struct HttpResponse {
    status_code: u16,
    headers: Vec<(String, String)>,
    // BAD: inefficient
    body: Vec<u8>,
}
```

The body field can be large, so let us tell serde to encode this field more efficiently using the `with` attribute:

```
#[derive(CandidType, Deserialize)]
struct HttpResponse {
    status_code: u16,
    headers: Vec<(String, String)>,
    // OK: encoded efficiently
    #[serde(with = "serde_bytes")]
    body: Vec<u8>,
}
```

Alternatively, we can use the `ByteBuf` type for this field:

```
#[derive(CandidType, Deserialize)]
struct HttpResponse {
    status_code: u16,
    headers: Vec<(String, String)>,
    // OK: also efficient
    body: serde_bytes::ByteBuf,
}
```

The following is a small sample canister to measure the amount of instructions saved:

```
#[query(manual_reply = true)] 
fn http_response() -> ManualReply<HttpResponse> {     
    let start = ic_cdk::api::instruction_counter();     
    let reply = ManualReply::one(HttpResponse {         
        status_code: 200,         
        headers: vec![("Content-Length".to_string(), "1000000".to_string())],         
        body: vec![0; 1_000_000],     
    });     
    let end = ic_cdk::api::instruction_counter();         
    ic_cdk::api::print(format!("Consumed {} instructions", end - start));     
    reply }
```

This is a canister endpoint that measures the number of instructions required to encode an HTTP response. We have to use a ManualReply to measure the encoding time.

The unoptimized version of this canister consumes 130 million instructions to encode one megabyte, and the version with `serde_bytes` needs only 12 million instructions.

In the case of the Internet Identity canister, this change alone reduced the instruction consumption in HTTP queries by order of magnitude. You should apply the same technique for all types deriving serde’s `Serialize` and `Deserialize` traits, not just for types you encode as Candid. A similar change boosted the ICP ledger archive upgrades (the canister uses cbor for state serialization).

### Avoid copying large values

Canisters spend a lot of their instructions copying bytes, since spending a lot of time in `memcpy` and `memset` is a common trait of many Wasm programs. This observation has led to the bulk memory operations proposal included in the Wasm 2.0 release. Reducing the number of unnecessary copies often affects cycle consumption.

The following is an example canister that serves a single dynamic asset:

```
thread_local!{
    static ASSET: RefCell<Vec<u8>> = RefCell::new(init_asset());
}
#[derive(CandidType, Deserialize)]
struct HttpResponse {
    status_code: u16,
    headers: Vec<(String, String)>,
    #[serde(with = "serde_bytes")]
    body: Vec<u8>,
}
#[query]
fn http_request(_request: HttpRequest) -> HttpResponse {
    // NOTE: we are making a full copy of the asset.
    let body = ASSET.with(|cell| cell.borrow().clone());
HttpResponse {
        status_code: 200,
        headers: vec![("Content-Length".to_string(), body.len().to_string())],
        body
    }
}
```

The `http_request` endpoint makes a deep copy of the asset for every request. This copy is unnecessary because the CDK encodes the response into the reply buffer as soon as the endpoint returns. There is no need for the encoder to own the body. Unfortunately, the current macro API makes it unnecessarily hard to eliminate copies: the type of reply must have 'static' lifetime. There are a few ways to work around this issue.

One solution is to wrap the asset body into a reference-counting smart pointer, such as:

```
thread_local!{
        static ASSET: RefCell<RcBytes> = RefCell::new(init_asset()); }
struct RcBytes(Arc<serde_bytes::ByteBuf>);
impl CandidType for RcBytes { /* */ } 
impl Deserialize for RcBytes { /* */ }
#[derive(CandidType, Deserialize)] 
struct HttpResponse {     
    status_code: u16,     
    headers: Vec<(String, String)>,     
    body: RcBytes, }
}
```

This example uses a reference-counting pointer for large values. Note that the type of the `ASSET` variable has to change: all copies of the data must be behind the smart pointer.

This approach enables you to save on copies without changing the overall structure of your code. A similar change cut instruction consumption by 30% in the certified assets canister.

Another solution is to enrich your types with lifetimes and use the ManualReply API:

```
use std::borrow::Cow;
use serde_bytes::Bytes;
#[derive(CandidType, Deserialize)]
struct HttpResponse<'a> {
    status_code: u16,
    headers: Vec<(Cow<'a, str>, Cow<'a, str>)>,
    body: Cow<'a, serde_bytes::Bytes>,
}
#[query(manual_reply = true)]
fn http_response(_request: HttpRequest) -> ManualReply<HttpResponse<'static>> {
    ASSET.with(|asset| {
        let asset = &*asset.borrow();
        ic_cdk::api::call::reply((&HttpResponse {
            status_code: 200,
            headers: vec![(
                Cow::Borrowed("Content-Length"),
                Cow::Owned(asset.len().to_string()),
            )],
            body: Cow::Borrowed(Bytes::new(asset)),
        },));
    });
    ManualReply::empty()
}
```

This approach allows you to get rid of all the unnecessary copies, but it complicates the code significantly. You should prefer the reference-counting approach unless you have to work with data structures that already have explicit lifetimes; `HashTree` from the `ic-certified-map` package is a good example.

In one test, a one-megabyte asset was used that measured the original code relying on a deep copy consumed 16 million instructions. At the same time, versions with reference counting and explicit lifetimes needed only 12 million instructions. The 25% improvement shows that our code does little but copy bytes; the code did at least three copies. One from a `thread_local` to an `HttpResponse`, one from the `HttpResponse` to Candid's value buffer, and one from c=Candid's value buffer to the call's argument buffer. We removed one third of the copies and got one fourth of an improvement in the instruction consumption. So only one fourth of our instructions contributed to work not related to copying the asset's byte array.

## Reducing module size

By default, cargo spits out huge WebAssembly modules. Even the tiny counter canister compiles to a whopping 2.2MiB monster under the default cargo release profile. In this section, we will explore different techniques for reducing canister sizes.

### Install and run the optimizer

Open a terminal window on your local computer, if you don’t already have one open.

To optimize a canister that resulted from compiling a Rust dapp, first install the `ic-wasm` crate, if you have not previously installed it, by running the following command:

``` bash
cargo install ic-wasm
```

This package optimizes your Rust code to reduce the size of the WebAssembly output to ensure your dapp can be uploaded to the Internet Computer blockchain mainnet as a canister.

### Optimize the Wasm output

To reduce the size of the Wasm output, first create a release directory within the `src` directory for your program by running a command similar to the following:

``` bash
mkdir -p src/rust-canister/target/wasm32-unknown-unknown/release/
```

Then, optimize the code within the `target` directory by running a command similar to the following:

``` bash
ic-wasm shrink target/wasm32-unknown-unknown/release/_rust_canister_.wasm -o target/wasm32-unknown-unknown/release/_rust_canister_-opt.wasm
```

### Compile canister modules with size and link-time optimizations.

The code that the Rust compiler considers fast is not always the most compact code. We can ask the compiler to optimize our code for size with the `opt-level = 'z'` option. Unfortunately, that option alone does not affect the counter canister module size.

Link-time optimization is a more aggressive option that asks the compiler to apply optimizations across module boundaries. This optimization slows down the compilation but its ability to prune unnecessary code is crucial for obtaining compact canister modules. Adding lto = true to the build profile shrinks the counter canister module from 2.2MiB to 820KiB. Add the following section to the `Cargo.toml` file at the root of your Rust project to enable size optimizations:

```
[profile.release]
lto = true
opt-level = 'z'
```

Another option you can play with is `codegen-units`. Decreasing this option reduces the parallelism in the code generation pipeline but enables the compiler to optimize even harder. Setting `codegen-units = 1` in the `cargo release profile` shrinks the counter module size from 820KiB to 777KiB.


### Strip off unused custom sections

By default, the Rust compiler emits debugging information allowing tools to link back WWasmy instructions to source-level constructs such as function names. This information spans several custom Wasm sections that the Rust compiler attaches to the module. Currently, there is no use for debugging information on the IC. You can safely remove unused sections using the `ic-wasm` tool through the command:

```
ic-wasm -o counter_optimized.wasm counter.wasm shrink
```

The `ic-admin shrink` step shrinks the counter canister size from 820KiB to 340KiB. `ic-wasm` is clever enough to preserve custom sections that the ic understands.

### Use the `twiggy` tool to find the source of code bloat

Some Rust language design choices, such as monomorphization, trade execution speed for binary size. Sometimes changing the design of your code or switching a library can significantly reduce of the module size. As with any optimization process, you need a profiler to guide your experiments. The `twiggy` tool is excellent for finding the largest functions in your Wasm modules. 

:::info
`twiggy` needs debug info to display function names. Run it before you shrink your module with `ic-wasm`.
:::

Top contributors to the size of the Wasm module of the counter canister. Custom sections with debugging information dominate the output, but we have to keep these sections to see function names in `twiggy`’s output. The serde-based Candid deserializer is typically the worst offender when it comes to code size.

Once you have identified the library that contributes to the code bloat the most, you can try to find a less bulky alternative. For example, we shrank the ICP ledger canister module by 600KiB by switching from `serde_cbor` to `ciborium` for CBOR deserialization.

### GZip-compress canister modules

The IC has the concept of a canister module, the equivalent of an executable file in operating systems. Starting from version 0.18.4 of the IC specification, canister modules can be not only binary-encoded Wasm files but also GZip-compressed Wasm files.

For typical Wasm files that do not embed compressed assets, GZip-compression can often cut the module size in half. Compressing the counter canister shrinks the module size from 340KiB to 115KiB (about 5% of the 2.2MiB module we started with!).

To learn more about using GZip, check out the documentation [here](https://www.gnu.org/software/gzip/manual/gzip.html).

## Next steps

Next, let's take a look at [incrementing a counter.](9-counter.md)
