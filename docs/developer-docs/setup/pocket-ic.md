# Testing canisters with PocketIC

## Overview

PocketIC is a lightweight, deterministic testing platform for programmatic testing for canisters written in Rust and Python. It seamlessly integrates with existing testing infrastructure, such as `cargo test`, and runs as a standalone binary that doesn't require additional containers or virtual machines. Currently, PocketIC is supported on MacOS and Linux host systems. 

While there are other options for testing canisters, they may come with pitfalls such as:

- Installing and testing canisters on the mainnet provides the 'real' workflow experience, but will cost developers real cycles.

- Testing using the local replica provided by `dfx` allows for testing on a single IC node, but there is no cross-net or multi-subnet functionality. Testing with the local replica is not deterministic, and it is rather heavyweight.

PocketIC is designed to remedy these pitfalls, resulting in a testing environment that provides the following benefits:

- Deterministic: Synchronous control over the local execution environment.

- Lightweight: Only provides the necessary components, and strips away the consensus and networking layers.

- Concurrent and independent IC instances: Enabling tests to run in parallel

- Multi-language support: Currently supports Rust, Python and Java/TypeScript, but supports integration with any language that is written against the PocketIC REST-API. 

- Versatile: Runs as a service on the test system and accepts HTTP/JSON. 

- Support for Xnet calls and multiple subnets. 

:::caution
While PocketIC can support integration with any language, Rust and Python will be covered in this guide.
:::

## PocketIC Rust

To use PocketIC, the latest PocketIC server binary must be downloaded from the PocketIC repo. You can download the latest version for MacOS or Linux systems [here](https://github.com/dfinity/pocketic#download-the-pocketic-server). 

:::info
PocketIC is currently not natively supported on Windows systems.
:::

Once the binary file is downloaded, unzip the file and make it executable:

```
gzip -d pocket-ic.gz
chmod +x pocket-ic
```

:::info
On macOS systems, to bypass developer verification from Apple, you may need to run:

```
xattr -dr com.apple.quarantine pocket-ic
```

The PocketIC binary can be left in your working directory or you can specify the path to the binary by setting the `POCKET_IC_BIN` environmental variable. 

Add PocketIC Rust do your project with the command:

```
cargo add pocket-ic
```

PocketIC can be imported into your project with the code:

```rust
pocket_ic::PocketIc
```

Then, in your code you can create a new PocketIC instance with the code:

```rust
let pic = PocketIc::new()
```

### Example: Single canister testing on a single subnet

The following is a simple, but complete testing example with a counter canister:

```rust
use candid::encode_one;
use pocket_ic::PocketIc;

 #[test]
 fn test_counter_canister() {
    let pic = PocketIc::new();
    // Create an empty canister as the anonymous principal and add cycles.
    let canister_id = pic.create_canister();
    pic.add_cycles(canister_id, 2_000_000_000_000);
    
    let wasm_bytes = load_counter_wasm(...);
    pic.install_canister(canister_id, wasm_bytes, vec![], None);
    // 'inc' is a counter canister method.
    call_counter_canister(&pic, canister_id, "inc");
    // Check if it had the desired effect.
    let reply = call_counter_canister(&pic, canister_id, "read");
    assert_eq!(reply, WasmResult::Reply(vec![0, 0, 0, 1]));
 }

fn call_counter_canister(pic: &PocketIc, canister_id: CanisterId, method: &str) -> WasmResult {
    pic.update_call(canister_id, Principal::anonymous(), method, encode_one(()).unwrap())
        .expect("Failed to call counter canister")
}
```

### Example: Multi-subnet testing

Versions of PocketIC `v2.0.0` and newer support multi-subnet testing. Multi-subnet testing allows for simulating multiple, different types of subnets locally. For example, to create an IC instance with an NNS subnet and two application subnets, use the code:

```rust
let pic = PocketIcBuilder::new()
    .with_nns_subnet()
    .with_application_subnet()
    .with_application_subnet()
    .build();
```

Then, to target the NNS subnet to create a canister, use the code:

```rust
let nns_sub = pic.topology().get_nns_subnet().unwrap();
let nns_can_id = pic.create_canister_on_subnet(..., nns_sub);
```

To test one of the application subnets and install a canister, use the code:

```rust
let app_sub_2 = pic.topology().get_app_subnets()[1];
let app_can_id = pic.create_canister_on_subnet(..., app_sub_2);
```

To create a canister with a specific `canister_id` on a named subnet, in this example the NNS subnet, use the code:

```rust
let ledger_canister_id = Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap();
pic.create_canister_with_id(..., ledger_canister_id);
pic.install_canister(ledger_canister_id, ...);
```

Possible types of subnets include:

- Generic system subnets.

- Generic application subnets.

- Named subnets with `canister_id` ranges, such as the NNS, SNS, II, Bitcoin, and Fiduciary subnets. Named subnets can only be targeted by `install_canister_with_id()`.

For a larger, more complex example that uses cross canister calls on two different subnets, see the full code [here](https://github.com/dfinity/ic/blob/HEAD/packages/pocket-ic/tests/tests.rs#L19).

## PocketIC Python

To use PocketIC, the latest PocketIC server binary must be downloaded from the PocketIC repo. You can download the latest version for MacOS or Linux systems [here](https://github.com/dfinity/pocketic#download-the-pocketic-server). 

:::info
PocketIC is currently not supported on Windows systems.
:::

Once the binary file is downloaded, unzip the file and make it executable:

```
gzip -d pocket-ic.gz
chmod +x pocket-ic
```

:::info
On MacOS systems, to bypass developer verification from Apple, you may need to run:

```
xattr -dr com.apple.quarantine pocket-ic
```

The PocketIC binary can be left in your working directory or you can specify the path to the binary by setting the `POCKET_IC_BIN` environmental variable. 

Then, run the following command to install PocketIC in your Python virtual environment:

```
pip3 install pocket-ic
```

To import PocketIC into your Python code, use the line:

```python
from pocket_ic import PocketIC
```

### Example: create a canister with cycles

```python
from pocket_ic import PocketIC

pic = PocketIC()
canister_id = pic.create_canister()
pic.add_cycles(canister_id, 2_000_000_000_000)
```


### Make canister calls

```python
response = pic.update_call(canister_id, method="greeting", ...)
assert(response == 'Hello, PocketIC!')
```

### Make a call directly with a canister object

```python
my_canister = pic.create_and_install_canister_with_candid(...)
```

### Call your canister methods using the native Python syntax

```python
response = my_canister.greeting()
assert(response == 'Hello, PocketIC!')
```

### Example: Single canister testing on a single subnet

The following is a simple, but complete testing example with a counter canister:

```python
import sys
import os
import unittest
import ic

# The example needs to have the module in its sys path, so we traverse
# up until we find the pocket_ic package.
script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(os.path.dirname(script_dir)))

from pocket_ic import PocketIC


class CounterCanisterTests(unittest.TestCase):
    def test_counter_canister(self):
        pic = PocketIC()
        canister_id = pic.create_canister()
        pic.add_cycles(canister_id, 1_000_000_000_000_000_000)

        with open(os.path.join(script_dir, "counter.wasm"), "rb") as wasm_file:
            wasm_module = wasm_file.read()
        pic.install_code(canister_id, bytes(wasm_module), [])

        self.assertEqual(
            pic.update_call(canister_id, "read", ic.encode([])),
            [0, 0, 0, 0],
        )
        self.assertEqual(
            pic.update_call(canister_id, "write", ic.encode([])),
            [1, 0, 0, 0],
        )
        self.assertEqual(
            pic.update_call(canister_id, "write", ic.encode([])),
            [2, 0, 0, 0],
        )
        self.assertEqual(
            pic.update_call(canister_id, "read", ic.encode([])),
            [2, 0, 0, 0],
        )


if __name__ == "__main__":
    unittest.main()
```

To see more examples and run them locally, clone the [PocketIC Python repo](https://github.com/dfinity/pocketic-py/tree/main), then run the following command, replacing the example name with the example you'd like to run. For example, to run the `counter_canister` example, use the command:

```
run python3 examples/counter_canister/counter_canister_test.py
```

## Resources

- [PocketIC forum post.](https://forum.dfinity.org/t/pocketic-fast-and-versatile-canister-testing-in-rust-and-python/23793)

- [PocketIC v20.0.0 release forum post.](https://forum.dfinity.org/t/pocketic-multi-subnet-canister-testing/24901)

- [PocketIC Python repo.](https://github.com/dfinity/pocketic-py/tree/main)

- [PocketIC Rust repo.](https://github.com/dfinity/ic/tree/fcb42ce1d36de46e079dfb8d4b68f34cd4f60f13/packages/pocket-ic)