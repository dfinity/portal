# 1: Rust backend canister infrastructure

## Overview

When developing on the IC, there are currently two primary languages to build backend canisters with; Motoko and Rust. This guide introduces using Rust to develop backend canisters and covers the basic infrastructure of Rust canisters, as well as design considerations and observability. 

## Rust CDK

To support Rust development, the IC SDK includes the [Rust canister development kit (Rust CDK)](https://github.com/dfinity/cdk-rs).

While using the IC SDK is the typical path for most developers, experienced Rust developers may choose to circumvent IC SDK entirely and use the Rust CDK directly. This documentation assumes you are using the IC SDK to build Rust canisters.

The Rust CDK consists of the following crates:
- The core of Rust CDK is the `ic-cdk` crate. It provides the core methods that enable Rust programs to interact with the Internet Computer blockchain system API.
- The `ic-cdk-macros` crate defines the procedural macros (e.g. update, query, import) that facilitate building operation endpoints and APIs.
- Also, the `ic-cdk-timers` crate provides an API to schedule multiple and periodic tasks.

## Canister builds
When building a backend canister, it's important to keep two things in mind: 

1. Making your build reproducible: if other developers or users are utilizing your canister, they may want to verify that it is functioning as expected (especially if the canister deals with transferring their tokens). The IC allows anyone to inspect the SHA256 hash sum of a canister's WebAssembly module to confirm that the hash matches the hash of a validated, known good canister, allowing users to determine whether the canister's contents have been edited or changed. 

2. Planning for canister upgrades: typically, developers can manage without needing upgrades during the canister's initial development cycle. However, losing the canister's state on each deployment of the canister can be inconvenient. Once a canister has been deployed to the mainnet, the only way for new versions of the canister's code to be shipped is through planned upgrades.

### Making canister builds reproducible

To create a reproducible canister build, there are two popular workflows: Linux containers like Docker and Nix. Container technologies such as Docker are more popular, provide more resources and may be easier to set up. In comparison, Nix builds tend to be more widely reproducible. Either workflow can be used. Typically, building your canister using a public continuos integration (CI) can help provide easy to follow instructions for reproducing your final project. 

The canister developers are responsible for providing a reproducible way of building a WebAssembly module from published sources. If your code is still in development, it can help to provide users or other developers with module hashes that correlate to each released version of the project's source code. 

For more information on reproducible canister builds, check out [here](../reproducible-builds.md)

### Canister upgrades
When a canister needs to be upgraded, the following workflow is used:
- The system calls a `pre_upgrade` hook if your canister defines it.
- The system discards canister memory and instantiates the new version of your WebAssembly module. The system does preserve the stable memory, which is now available to the new version.
- The system calls a `post_upgrade` hook on the newly created instance if your canister defines it. The `init` function is not executed.
- If the canister traps (throws an unrecoverable error) in any of the steps above, the system reverts the canister to the pre-upgrade state.

#### Versioning stable memory

Stable memory can be viewed as the communication channel between old and new versions of a canister. As good practice, communication protocols should be versioned. In some cases, developers may want to radically change something such as the serialization format or the stable data layout of their canister. In radical changes like these, the stable memory decoding mechanism may need to guess the data's format, which can become messy and complicated. To make this process easier, stable memory versioning should be planned for. It can be as simple as declaring that the first byte of the canister's stable memory will be used to represent the version number. 

#### Testing upgrade hooks

It is best practice to test upgrades before applying them to catch any potential errors that may result in losing data irrevocably. Several different workflows or approaches can be used to test upgrades, such as shell scripts or Rust test scripts. The following pseudo-code showcases a Rust upgrade example that adds a step to execute the state validation of your upgrade test. 

```
let canister_id = install_canister(WASM);
populate_data(canister_id);
if should_upgrade { upgrade_canister(canister_id, WASM); }
let data = query_canister(canister_id);
assert_eq!(data, expected_value);
```

Then, your tests should be run twice in two different scenarios:
- In a scenario without any upgrades, to assure that your tests run successfully without executing an upgrade.
- In a scenario with an upgrade, to assure that your tests run successfully while executing an upgrade. 
You then run your tests twice in different modes:

By running both of these tests, developers can gain confidence that when an upgrade is applied to a canister, the canister's state is preserved. 

:::caution
It is not recommended to trap within the `pre_upgrade` hook. This is because while the `pre_upgrade` and `post_upgrade` hooks appear to be symmetrical, they are not. 

If the `pre_upgrade` hook succeeds, but the `post_upgrade` hook traps, the canister can be debugged and another version can be built. However, if the `pre_upgrade` hook traps, there is not much you can do about it; a broken `pre_upgrade` hook prevents you from changing the canister's behavior. 
:::

#### Using stable memory as primary storage

When a canister is upgraded, there is a limit regarding how many cycles a canister can burn during that upgrade. If the canister goes beyond that limit, the upgrade will be canceled by the system and the canister's state will be reverted. That means if you serialize the canister's whole state to stable memory in the `pre_upgrade` hook and the state becomes very large, the canister may not be able to be upgraded again. 

One way to prevent this is to avoid serializing the canister state to begin with. Stable memory can be used as the canister's primary storage, where it can be used to store each upgrade call. Using this method, the `pre_upgrade` hook may not be necessary, and the `post_upgrade` hook will burn fewer cycles. 

:::caution
While this approach might be useful for some workflows, there are a few drawbacks of this approach:
- It is a challenge to organize the flat address space of stable storage into a data structure, especially for complex canister states that consist of multiple interconnected data structures. 
- Altering your canister's data layout may be counterproductive and infeasible. 
- There may be a need for your canister to have backward compatibility of it's data structures; new versions of your canister may need to read data written by previous versions. 
:::

Overall, if your canister plans to store gigabytes of state data and upgrade the code, it may be worth considering using stable memory for the primary storage despite the drawbacks of the approach. 

## Observability
Metrics can be used to gain insight into a wide range of information regarding your canister's production services. This data is important to learn about your canister's statistics and productivity. 

### Exposing canister metrics

#### Approach 1: Expose a query call that returns a data structure containing your canister's metrics. 
If this data is not intended to be public, this query can be configured to be rejected based on the caller's principal. This approach provides an response that is structured and easy to parse. 

```
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

```
fn http_request(req: HttpRequest) -> HttpResponse {   
  match path(&req) {     
    "/metrics" => HttpResponse {         
        status_code: 200,         
        body: format!(r#"stable_memory_bytes {}
                         allocated_bytes {}  
                         registered_users_total {}"#, 
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

### Using `let state = ic_cdk::storage::get_mut<MyState>`

The IC [Rust CDK](https://github.com/dfinity/cdk-rs) provides storage abstraction that allows you to get a mutable reference indexed by a type through the `get_mut<MyState>` method. This allows you to obtain multiple non-exclusive mutable references to the same object, which should be used with caution. 


### Using `static mut STATE: Option<State> = None;`

This approach uses plain global variables and forces you to write some boilerplate to access the global state. This method should also be used with caution, since it also allows you to obtain multiple non-exclusive mutable references. 

### Canister code should be target-independent 

It pays off to factor most of the canister code into loosely coupled modules and packages and to test them independently. Most of the code that depends on the System API should go into the main file.

It is also possible to create a thin abstractions for the System API and test your code with a fake but faithful implementation. For example, we could use the following trait to abstract the stable memory API:

```
pub trait Memory {
    fn size(&self) -> WasmPages;
    fn grow(&self, pages: WasmPages) -> WasmPages;
    fn read(&self, offset: u32, dst: &mut [u8]);
    fn write(&self, offset: u32, src: &[u8]);
}
```

## Code asynchrony

### Traps and panics
In canisters, panics and traps are somewhat unique. If a code panics or traps, the system rolls the canister's state back to the latest working snapshot. This means that if your canister makes a call and then panicked in the callback, the canister might never release the resources that it used to allocate the call. Let's view an example:

```
#[update]
async fn update_avatar(user_id: UserId, pic: ByteBuf ) {
    let key = store_async(user_id, &pic)
                  .await     
                  .unwrap(); 
    USERS.with(|users| set_avatar_key(user_id, key));
}
```

- The method receives a byte buffer with an avatar picture.
- The method issues a call to the storage canister. The byte buffer is captured in a Rust future allocated on the heap.
- If the call fails, the canister panics. The system rolls back the canister state to the snapshot created right before the callback invocation. From the canister’s point of view, it still waits for the reply and keeps the future and the buffer on the heap.

Note that there is no corruption, the canister is still in a valid state, but some resources, like memory, will not be released until the next upgrade.

The System API was recently extended to deal with this problem (see `ic0.call_on_cleanup` in the [Internet Computer Interface Specification](../../../references/ic-interface-spec.md)). This issue is likely to be fixed in future versions of the Rust CDK.

:::caution
Do not lock shared resources across await boundaries.
:::

This issue becomes quite a problem when combined with panics: if you lock an important resource and then panic after await, the resource stays locked forever.

## Next steps
Now that you've learned about the infrastructure of Rust backend canisters on the Internet Computer, the next step is to learn about [code organization](./2-project-organization.md)
