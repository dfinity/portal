# Rust agent

## Overview

The Rust agent by DFINTY is a simple library that enables you to build applications and interact with ICP. It serves as a Rust-based low-level backend for the IC SDK.

The agent is designed to be compatible with multiple versions of the replica API. It exposes both low-level APIs for communicating with ICP components like the replica and provides higher-level APIs for communicating with software applications deployed as canisters.

One example of a project that uses the `ic-agent` is [dfx](https://github.com/dfinity/sdk).

## Adding the agent as a dependency

To add the `ic-agent` crate as a dependency in your project, use the command:

```
cargo add ic-agent
```

## Example

The following is an example of how to use the agent interface to make a call to a canister deployed on the mainnet. The canister being called is the management canister (`aaaaa-aa`), which then creates a placeholder value for a new canister and returns that value. 

```rust
use ic_agent::{Agent, export::Principal};
use candid::{Encode, Decode, CandidType, Nat};
use serde::Deserialize;

#[derive(CandidType)]
struct Argument {
  amount: Option<Nat>,
}

#[derive(CandidType, Deserialize)]
struct CreateCanisterResult {
  canister_id: Principal,
}

async fn create_a_canister() -> Result<Principal, Box<dyn std::error::Error>> {
  let agent = Agent::builder()
    .with_url(URL)
    .with_identity(create_identity())
    .build()?;
  // Only do the following call when not contacting the IC main net (e.g. a local emulator).
  // This is important as the main net public key is static and a rogue network could return
  // a different key.
  // If you know the root key ahead of time, you can use `agent.set_root_key(root_key);`.
  agent.fetch_root_key().await?;
  let management_canister_id = Principal::from_text("aaaaa-aa")?;

  // Create a call to the management canister to create a new canister ID,
  // and wait for a result.
  // The effective canister id must belong to the canister ranges of the subnet at which the canister is created.
  let effective_canister_id = Principal::from_text("rwlgt-iiaaa-aaaaa-aaaaa-cai").unwrap();
  let response = agent.update(&management_canister_id, "provisional_create_canister_with_cycles")
    .with_effective_canister_id(effective_canister_id)
    .with_arg(Encode!(&Argument { amount: None})?)
    .call_and_wait()
    .await?;

  let result = Decode!(response.as_slice(), CreateCanisterResult)?;
  let canister_id: Principal = result.canister_id;
  Ok(canister_id)
}

let canister_id = create_a_canister().await.unwrap();
eprintln!("{}", canister_id);
```

## Further reading

- [ic-agent documentation](https://docs.rs/ic-agent/latest/ic_agent).
- [Rust agent documentation](https://docs.rs/ic-agent/latest/ic_agent/struct.Agent.html).
- [Rust agent source code](https://github.com/dfinity/agent-rs).
