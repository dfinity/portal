# 1: Rust backend canister infrastructure

## Overview

When developing on the IC, there are currently two primary languages to build backend canisters with; Motoko and Rust. This guide provides an introduction to using Rust to developer backend canisters and covers the basic infrastructure of Rust canisters, as well as design considerations and observability. 

## Rust CDK

To support Rust development, the IC SDK includes the [Rust canister development kit (Rust CDK)](https://github.com/dfinity/cdk-rs).

While using the IC SDK is the typical path for most developers, experienced Rust developers may choose to circumvent IC SDK entirely and use the Rust CDK directly. This documentation assumes one is using the IC SDK to build Rust canisters.

The Rust CDK consists of the following crates:
- The core of Rust CDK is the `ic-cdk` crate. It provides the core methods that enable Rust programs to interact with the Internet Computer blockchain system API.
- Also, the `ic-cdk-timers` crate provides an API to schedule multiple and periodic tasks.

## Canister builds
When building a backend canister, it's important to keep two things in mind: 

1. Making your build reproducible: if other developers or users are utilizing your canister, they may want to verify that the canister is functioning as they expect it to (especially if your canister deals with transferring their tokens). The IC provides the ability for anyone to inspect the SHA256 hash sum of a canister's WebAssembly module to confirm that the hash of the canister matches the hash of a validated, known good canister, allowing for users to determine if a canister's contents have been edited or changed. 

2. Planning for canister upgrades: typically, developers can manage without needing upgrades during the canister's initial development cycle. However, losing the canister's state on each deployment of the canister can be inconvenient. Once a canister has been deployed to the mainnet, the only way for new versions of the canister's code to be shipped is through planned upgrades.

### Making canister builds reproducible

To create a reproducible canister build, there are two popular workflows: Linux containers like Docker and Nix. Container technologies such as Docker are more popular, provide more resources and may be easier to set up. In comparison, Nix builds tend to be more widely reproducible. Either workflow can be used. Typically, building your canister using a public continuous integration system (CI) can help provide easy to follow instructions for reproducing your final project. 

It is the canister developer’s responsibility to provide a reproducible way of building a WebAssembly module from the published sources. If your code is still within development, it can help to provide users or other developers with module hashes that correlate to each released version of the project's source code. 

For more information on reproducible canister builds, check out [here](../reproducible-builds.md)

## Observability
Metrics can be used to gain insight into a wide range of information regarding your canister's production services. This data is important to learn about your canister's statistics and productivity. 

### Exposing canister metrics

#### Approach 1: Expose a query call that returns a data structure containing your canister's metrics. 
If this data is not intended to be public, this query can be configured to be rejected based on the caller's principal. This approach provides an response that is structured and easy to parse. 

```rust
pub struct MyMetrics {   
  pub stable_memory_size: u32,   
  pub allocated_bytes: u32,   
  pub my_user_map_size: u64,   
  pub last_upgraded_ts: u64, 
}
#[query] 
fn metrics() -> MyMetrics {   
  check_acl();   
  MyMetrics {     
    // ...   
  } 
}
```

#### Approach 2: Expose the canister's metrics in a format that your monitoring system can ingest through the canister's HTTP gateway. 

For text-based exposition formats, the following example can be used:

```rust
fn http_request(req: HttpRequest) -> HttpResponse {   
  match path(&req) {     
    "/metrics" => HttpResponse {         
        status_code: 200,         
        body: format!("\
stable_memory_bytes {}
allocated_bytes {}  
registered_users_total {}", 
                      stable_memory_bytes, allocated_bytes, num_users),         
        // ...     
    }   
  } 
}
```

#### Important metric data to watch
- The size of the canister's stable memory.
- The size of the canister's internal data structures
- The sizes of objects allocated within the heap.
- The date and time the canister was last upgraded.

## Globally mutable states

By design, canisters on the IC are structured in a way that forces developers to use a global mutable state. However, Rust's design makes it difficult to global mutable variables. This results in Rust developers needing to choose a method of code organization that takes the IC's design into consideration. This guide will cover a few of those code organization options. 

### Using `thread_local!` with `Cell/RefCell` for state variables

Using `thread_local!` with `Cell/RefCell` is the safest option to avoid issues with asynchrony and memory corruption. 

The following is an example of how `thread_local!` can be used:

```
thread_local! {
    static NEXT_USER_ID: Cell<u64> = Cell::new(0);
    static ACTIVE_USERS: RefCell<UserMap> = RefCell::new(UserMap::new());
}
```

### Canister code should be target-independent 

It pays off to factor most of the canister code into loosely coupled modules and packages and to test them independently. Most of the code that depends on the System API should go into the main file.

It is also possible to create a thin abstraction for the System API and test your code with a fake but faithful implementation. For example, you could use the following trait to abstract the stable memory API:

```
pub trait Memory {
    fn size(&self) -> WasmPages;
    fn grow(&self, pages: WasmPages) -> WasmPages;
    fn read(&self, offset: u32, dst: &mut [u8]);
    fn write(&self, offset: u32, src: &[u8]);
}
```

## Next steps
Now that you've learned about the infrastructure of Rust backend canisters on the Internet Computer, the next step is to learn about [project organization](./2-project-organization.md).
