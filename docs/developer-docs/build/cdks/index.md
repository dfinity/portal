# Canister Development Kits

To create canisters, it is typical to use a so-called CDK, a Canister Development Kit.
The CDK's main tasks are to expose the public interface of a canister, manage memory, allow other canisters to be called, and to interface with the system API.
Because the Internet Computer supports dapps compiled to standard WebAssembly modules, you can use many different programming languages to create your canisters.
The two officially supported languages of the Internet Computer are [Motoko](./motoko-dfinity/motoko.md) and [Rust](./cdk-rs-dfinity/index.md).
Motoko is specifically designed to support the unique features of the Internet Computer and to provide a familiar yet robust programming environment.
Rust is a powerful and modern type-sound programming language with an active developer community.
Of course, developers are not required to work in one (or both) of those languages. There are many different community-supported languages available as well, as you can see below in the list of available languages.

It is also possible to split your work between multiple languages. Different canister smart contracts talk to each other using the [Candid](../candid/candid-intro.md) language. What language works behind the candid interface, however, does not matter.

This section of the docs covers the following CDKs, ordered by languages:
- Motoko
  - [Motoko by DFINITY](./motoko-dfinity/motoko.md)
- Rust
  - [`cdk-rs` by DFINITY](./cdk-rs-dfinity/index.md)

Besides those, there exist a lot of other community-supported CDKs:
- AssemblyScript
  - [`cdk-as` by Rick Porter](https://github.com/rckprtr/cdk-as)
- TypeScript
  - [`Azle` by Demergent Labs](https://github.com/demergent-labs/azle)

### A comparison between Motoko and Rust

To help deciding between languages, here is a comparison of the two most popular languages on the Internet Computer: Motoko and Rust. As a rule of thumb, use Rust if you already know it, but otherwise Motoko is far easier to learn quickly. For a more in-depth comparison, read on.

Internet Computer considerations:

|                   | Motoko          | Rust        |
|-------------------|-----------------|-------------|
| Candid support | Fully automatic. Support is built into the compiler and runtime system. | Library-supported. Regularly needs manual intervention/conversion. |
| Stable Memory support | Automatic, supported by the language. Performance is not ideal yet. Bypassing the language is possible, but error-prone. | Library-supported. Automatic in simple cases, otherwise manual implementations are needed. More predictable than Motoko. |
| Asynchronous Data and Control Flow Support | Native | Native |
| Actor Paradigm support (Canister = Actor) | Native | Error-prone, conflicts with deep-rooted language features (e.g. the borrow checker). |
| IC-specific Static Analysis | Enforces various safety checks. | No static checking. Canisters may trap when violating restrictions. |

WebAssembly considerations:

|                   | Motoko          | Rust        |
|-------------------|-----------------|-------------|
| Wasm binary size | Very small. | Very large, requires compacting tools. |
| Wasm performance | Benchmarks TBD | Benchmarks TBD |

Other considerations:

|                   | Motoko          | Rust        |
|-------------------|-----------------|-------------|
| Language Maturity | Not mature yet, lots of work left to do. | Mature (enough). Solid library support. |
| Build Time | Faster than Rust. | Slower than Motoko. |
| Difficulty of Learning | Not very hard. | Quite complex, lots of details to consider. |
| Memory Management | Automatic GC (garbage collection). | Application-specific, strong support by the compiler. |
| Foreign Function Interface support | None yet. | Typical C FFI compatibility. |
