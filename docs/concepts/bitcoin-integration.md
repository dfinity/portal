# Bitcoin Integration

The Internet Computer’s distributed ECDSA suite of protocols allows canisters to obtain ECDSA public keys and to securely sign messages under that public key using chain key cryptography. Thus canisters can have a Bitcoin public key, i.e., a Bitcoin address, and sign Bitcoin transactions.

To make this easy, [Bitcoin integration](https://internetcomputer.org/howitworks/direct-integration-with-bitcoin) gives canisters direct access to the UTXO set of Bitcoin and also allows canisters to send transactions to the Bitcoin network. This is achieved by a subnet’s replicas pulling the latest blocks from various Bitcoin miners (and reaching consensus on the current UTXO set) and by replicas sending transactions signed by a canister to the Bitcoin network. Notice that this direct integration with the Bitcoin blockchain does not relying on any intermediate parties such as a bridge and hence does not require any extra trust assumption.

Developers can already start developing smart contracts using the IC Bitcoin API with the developer preview, which includes [sample projects](https://github.com/dfinity/bitcoin-developer-preview/tree/master/examples) in both Rust and Motoko. The developer preview can be run locally to explore the Bitcoin API. In the developer preview, the Bitcoin network is replaced with a single, locally-running [bitcoin](https://bitcoin.org/en/full-node) node that can be fully controlled by the user for smart contract testing purposes.

The developer preview does not support any interaction with the Bitcoin mainnet or testnet.

The main component of the integration is the **Bitcoin canister**. The source code plus documentation of its API can be found in this [GitHub repository](https://github.com/dfinity/bitcoin-developer-preview).

The Bitcoin functionality will be offered on the Internet Computer in the form of *virtual canisters*, similar to the [management canister](https://smartcontracts.org/docs/interface-spec/index.html#ic-management-canister), once the feature is generally available on the IC mainnet. The API may change slightly but is expected to remain essentially the same between the developer preview and mainnet release, so minor code adaptations in canister code may be required when switching to the mainnet release later.

More information about the inner workings of the integration can be found on the [Bitcoin integration wiki page](https://wiki.internetcomputer.org/wiki/Bitcoin_integration).
