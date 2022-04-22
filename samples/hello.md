# Hello, World!

This sample demonstrates a dead simple dapp consisting of two canisters:

-   a simple backend canister, `hello`, implementing the logic of the application, and

-   a simple frontend asset canister, `hello_assets`, serving the assets of the dapp’s web user interface.

It is the dapp equivalent of the ubiquitous *hello world* and can be seen running [here on the IC](https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/).

This sample is based on the default project created by running `dfx new` as described in the [Motoko](../docs/developer-docs/quickstart/local-quickstart.md) and [Rust](../docs/developer-docs/build/languages/rust/rust-quickstart) quickstart documents.

The sample code is available from the [samples](https://github.com/dfinity/examples) repository in both [Motoko](https://github.com/dfinity/examples/tree/master/motoko/hello) and [Rust](https://github.com/dfinity/examples/tree/master/rust/hello).

Canister `hello`, whether implemented in Motoko or Rust, presents the same Candid interface:

    service : {
      greet: (text) -> (text);
    }

The frontend canister, `hello_assets`, displays an HTML page with a text box for the argument and a button for calling the function greet with that argument. The result of the call is displayed in a message box.

![hello frontend](_attachments/hello.png)

The frontend canister is a generic canister provided by `dfx` but the assets it serves to browsers are determined by the dfx project settings and project files.

The frontend canister and its assets are identical for both projects.
