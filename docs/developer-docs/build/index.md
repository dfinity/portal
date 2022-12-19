# Building on the IC

The Internet Computer blockchain is poised to help you start a revolution with a new way to design, build, and release dapps.

## Developing Dapps

The Internet Computer is a blockchain that runs canisters, which are code units bundling together WebAssembly bytecode and the memory pages the bytecode runs in. The Internet Computer is composed of individual subnet blockchains running in parallel and connected together by the use of Chain Key cryptography. This means that canisters running on a subnet can seamlessly call canisters hosted in any other subnet of the Internet Computer blockchain. Moreover, the governance system of the Internet Computer can dynamically increase the capacity of the Internet Computer by adding new subnets, allowing dapps to scale out.

Developers can thus build new dapps consisting of multiple canisters running in parallel on different subnets and possibly integrate them with existing canisters already running on the Internet Computer.

## Developer Workflow at a Glance

At a high-level, there are two main possible workflows for developing dapps that run on the Internet Computer blockchain.

![Development paths](_attachments/local-remote-path-workflow.svg)

- **Local development:** you start a local canister execution environment simulating the Internet Computer blockchain on your computer. Then you write, compile, install and iteratively update your canisters in the local execution environment. This gives you the possibility to test your canisters locally without the need to use cycles to power them.

- **On-chain deployment:** once your dapp is ready you can then deploy it to the Internet Computer blockchain mainnet, making it available for the world to use it. Note that your canisters need to have cycles to be able to run on the Internet Computer blockchain mainnet, as discussed in [Tokens and cycles](/concepts/tokens-cycles.md).

Regardless of the development workflow you choose, keep in mind that when you deploy a canister for the first time, either on a local execution environment or on the Internet Computer, a unique [principal identifier](/references/glossary.md#principal) is created for your canister. For example, if you start developing your canister locally and then deploy it to the Internet Computer, then your canister will generally have a different identifier on the local execution environment and on the Internet Computer blockchain mainnet. Note that it is also possible for you to register a principal identifier for your new canister before deploying it or even writing any line of code.
