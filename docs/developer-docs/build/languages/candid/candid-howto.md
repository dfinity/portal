# How to

As discussed in [What is Candid?](candid-concepts), Candid provides a language-agnostic way to interact with canisters. By using Candid, you can specify input argument values and display return values from canister methods regardless of whether you interact with the IC from a terminal using the `dfx` command-line interface, through a web browser, or from a program written in JavaScript, Motoko, Rust, or any other language. Now that you are familiar with what Candid is and how it works, this section provides instructions for how to use it in some common scenarios.

As a concrete example, let’s assume there is a `counter` canister already deployed on the network with the following Candid interface:

``` candid
service Counter : {
  inc : (step: nat) -> (nat);
}
```

Now, let’s explore how to interact with this canister in different scenarios with the help of Candid.

# The .did file

Candid types can be used to describe a service via a Candid service description file (`.did` file), which can either be manually written or generated from a service implementation. 

If you write a canister in Motoko, for example, the compiler automatically generates a Candid description when you compile the program. If you use the SDK, you will typically see the auto-generated `.did` files in the `/declarations` directory of your project. Since these files are are auto-generated, it is recommended they should not be manually edited. Even if you change the `.did` files in your project, they will be overwritten in the next dfx build.

In other languages, like Rust, you will have to write the Candid interface description manually. With the help of types, we developed tools to automatically generate UI and perform random testing based on the service description file. 

## Interact with a service in a terminal

One of the most common ways you interact with canisters and the IC is by using the DFINITY Canister SDK `dfx` command-line interface.

The `dfx` tool provides the `dfx canister call` command to call a specific deployed canister—essentially a smart contract that runs on the IC—and, if applicable, a method of the service provided by the smart contract.

When you run the `dfx canister call` command, you can pass arguments to a method by specifying them as [Candid textual values](candid-concepts#textual-values).

When you pass Candid textual values on the command-line, you can specify multiple argument values separated by commas (`,`) and wrapped inside parentheses. For example, specifying `(42, true)` represents two argument values, where the first argument is the number `42` and the second argument is a boolean value of `true`.

The following example illustrates using the `dfx canister call` command to call the `counter` canister service and pass arguments for the `inc` method:

``` bash
$ dfx canister call counter inc '(42)'
(43)
```

You can also omit the arguments and let `dfx` generate a random value that matches the method type. For example:

``` bash
$ dfx canister call counter inc
Unspecified argument, sending the following random argument:
(1_543_454_453)

(1_543_454_454)
```

For more information about using `dfx` and the `dfx canister call` command, see [Command-line reference](../../../../references/cli-reference) and [dfx canister](../../../../references/cli-reference/dfx-canister) documentation.

## Interact with a service from a browser

The Candid interface description language provides a common language for specifying the signature of a canister. Based on the type signature of the service offered by the smart contract, Candid provides a web interface—the Candid UI—that allows you to call canister functions for testing and debugging from a web browser without writing any frontend code.

To use the Candid web interface to test the \`counter \`canister:

1.  Find the Candid UI canister identifier associated with the `counter` canister using the `dfx canister id __Candid_UI` command.

    ``` bash
    dfx canister id __Candid_UI
    ```

    The command displays the canister identifier for the Candid UI with output similar to the following:

        r7inp-6aaaa-aaaaa-aaabq-cai

2.  Start the canister execution environment locally by running the following command:

    ``` bash
    dfx start --background
    ```

3.  Open a browser and navigate to the address and port number specified in the `dfx.json` configuration file.

    By default, the `local` canister execution environment binds to the `127.0.0.1:8000` address and port number.

4.  Add the required `canisterId` parameter and the Candid UI canister identifier returned by the `dfx canister id` command.

    For example, the full URL should look similar to the following but with the `CANDID-UI-CANISTER-IDENTIFIER` that was returned by the `dfx canister id` command:

        http://127.0.0.1:8000/?canisterId=<CANDID-UI-CANISTER-IDENTIFIER>

    The browser displays a form for you to specify a canister identifier or choose a Candid description (`.did`) file.

    ![candid ui select id](../../_attachments/candid-ui-select-id.png)

    If you aren’t sure which canister identifier to use, you can run the `dfx canister id` command to look up the identifier for a specific canister name.

    For example, if you want to view the functions for the `counter` service description, you could look up the canister identifier by running the following command:

        dfx canister id counter

5.  Specify a canister identifier or description file, then click **Go** to display the service description.

6.  Review the list of function calls and types defined in the program.

7.  Type a value of the appropriate type for a function or click **Random** to generate a value, then click **Call** or **Query** to see the result.

For more information about the tool that creates a Web interface from the Candid interface of any canister, see the [Candid UI](https://github.com/dfinity/candid/tree/master/tools/ui) repository.

## Interact with a service from a Motoko canister

If you are writing a canister in Motoko, the Motoko compiler automatically translates the signature of your canister’s top-level `actor` or `actor class` into a Candid description, and the `dfx build` command ensures that the service description is properly referenced where it needs to be.

For example, if you want to write a `hello` canister that calls the `counter` canister in Motoko:

``` motoko
import Counter "canister:Counter";
import Nat "mo:base/Nat";
actor {
  public func greet() : async Text {
    let result = await Counter.inc(1);
    "The current counter is " # Nat.toText(result)
  };
}
```

In this example, when the import dependency on the `counter` canister— the `import Counter "canister:Counter"` declaration—is processed by the `dfx build` command, the `dfx build` command ensures that the `counter` canister identifier and the Candid description are passed to the Motoko compiler correctly. The Motoko compiler then translates the Candid type into the appropriate native Motoko type. This translation enables you to call the `inc` method natively—as if it were a Motoko function—even if the `counter` canister is implemented in a different language and even if you do not have the source code for the imported canister. For additional information on the type mapping between Candid and Motoko, you can consult the [Supported types](../../../../references/candid-ref.md) reference section.

The Motoko compiler and `dfx build` command also auto-generate the Candid description for the `hello` canister to allow other canisters or tools to interact with the `hello` canister seamlessly. The generated Candid description is located in your project build directory at `.dfx/local/canisters/hello/hello.did`.

## Interact with a service from a Rust canister

If you write a canister in Rust, the `dfx build` command ensures that the service description is properly referenced where it needs to be. However, you need to write the Candid service description manually following the conventions described in the [Candid specification](https://github.com/dfinity/candid/blob/master/spec/Candid.md#core-grammar).

For example, if you want to write a `hello` canister that calls the `counter` canister in Rust:

``` rust
use ic_cdk_macros::*;

#[import(canister = "counter")]
struct Counter;

#[update]
async fn greet() -> String {
    let result = Counter::inc(1.into()).await;
    format!("The current counter is {}", result)
}
```

When the import macro on the `counter` canister— the `#[import(canister = "counter")]` declaration—is processed by the `dfx build` command, the `dfx build` command ensures that the `counter` canister identifier and the Candid description are passed to the Rust CDK correctly. The Rust CDK then translates the Candid type into the appropriate native Rust type. This translation enables you to call the `inc` method natively—as if it were a Rust function—even if the `counter` canister is implemented in a different language and even if you do not have the source code for the imported canister. For additional information on the type mapping between Candid and Rust, you can consult the [Supported types](../../../../references/candid-ref.md) reference section.

For other canisters and tools to interact with the `hello` canister, you need to manually create a `.did` file:

``` candid
service : {
    greet : () -> (text);
}
```

There is also an experimental feature to generate a Candid service description automatically, see this [test case](https://github.com/dfinity/candid/blob/master/rust/candid/tests/types.rs#L99) as an example.

For additional information and libraries to help you create Candid services or canisters in Rust, see the documentation for the [Candid crate](https://docs.rs/candid/), [Rust CDK examples](https://github.com/dfinity/cdk-rs/tree/next/examples) and the [Rust tutorials](../rust/rust-intro).

## Interact with a service from JavaScript

The [dfinity/agent npm package](https://www.npmjs.com/package/@dfinity/agent) includes support for importing canisters using Candid.

For example, if you want to call the `counter` canister, you can write the following JavaScript program:

``` javascript
import counter from 'ic:canisters/counter';
import BigNumber from 'bignumber.js';
(async () => {
  const result = await counter.inc(new BigNumber(42));
  console.log("The current counter is " + result.toString());
})();
```

When the import dependency of counter canister is processed by the `dfx build` command and the `webpack` configuration, this processing ensures that the canister identifier and the Candid description are passed to the JavaScript program correctly. Behind the scenes, the Candid service description is translated into a JavaScript module, located at `.dfx/local/canister/counter/counter.did.js`, by `dfx build`. The `dfinity/agent` package then translates the Candid type into native JavaScript values and enables you to call the `inc` method natively—as if it were a JavaScript function—even if the `counter` canister is implemented in a different language and even if you do not have the source code for the imported canister. For additional information on the type mapping between Candid and JavaScript, you can consult the [Supported types](../../../../references/candid-ref.md) reference section.

## Create a new Candid implementation

In addition to the Candid implementations for Motoko, Rust, and JavaScript, there are community-supported Candid libraries for the following host languages:

-   [Haskell](https://hackage.haskell.org/package/candid)

-   [Elm](https://github.com/chenyan2002/ic-elm/)

-   [Kotlin](https://github.com/seniorjoinu/candid-kt)

-   [AssemblyScript](https://github.com/rckprtr/cdk-as/tree/master/packages/cdk/assembly/candid)

If you want to create a Candid implementation to support a language or tool for which an implementation is not currently available, you should consult the [Candid specification](https://github.com/dfinity/candid/blob/master/spec/Candid.md).

If you add a Candid implementation for a new language or tool, you can use the official [Candid test data](https://github.com/dfinity/candid/tree/master/test) to test and verify that your implementation is compatible with Candid, even in slightly more obscure corner cases.
