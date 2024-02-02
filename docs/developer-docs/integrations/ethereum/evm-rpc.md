# EVM RPC canister

**EVM RPC** is an Internet Computer canister smart contract for communicating with [Ethereum](https://ethereum.org/en/) and other [EVM blockchains](https://chainlist.org/?testnets=true) using an on-chain API. 

The source code for this project is available on GitHub ([internet-computer-protocol/evm-rpc-canister](https://github.com/internet-computer-protocol/evm-rpc-canister) ⭐️) under the Apache 2.0 license. 

## Supported RPC methods

The following JSON-RPC methods are available as part of the canister's [Candid interface](https://github.com/dfinity/candid#readme):

- [`eth_feeHistory`](https://docs.alchemy.com/reference/eth-feehistory): Queries the historical fee data to estimate gas prices for transactions.
- [`eth_getLogs`](https://docs.alchemy.com/reference/eth-getlogs): Queries the logs of a specified block or transaction.
- [`eth_getBlockByNumber`](https://docs.alchemy.com/reference/eth-getblockbynumber): Queries information about a given block.
- [`eth_getTransactionCount`](https://docs.alchemy.com/reference/eth-gettransactioncount): Queries the number of transactions for a specified address.
- [`eth_getTransactionReceipt`](https://docs.alchemy.com/reference/eth-gettransactionreceipt): Queries details about a submitted transaction.
- [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction): Submits a signed transaction to the Ethereum network.

Other RPC methods (including those specific to non-Ethereum networks) may be accessed using the canister's `request` method.

## Supported RPC providers

The EVM RPC canister has built-in support for the following [Ethereum JSON-RPC providers](https://ethereum.org/developers/docs/apis/json-rpc):

- [Alchemy](https://docs.alchemy.com/docs/how-to-read-data-with-json-rpc): Ethereum mainnet, Sepolia testnet.
- [Ankr](https://www.ankr.com/infrastructure/build-on-ethereum/): Ethereum mainnet, Sepolia testnet.
- [BlockPI](https://blockpi.io/): Ethereum mainnet, Sepolia testnet.
- [Cloudflare Web3](https://www.cloudflare.com/application-services/products/web3/): Ethereum mainnet.
- [Public Node](https://www.publicnode.com/): Ethereum mainnet, Sepolia testnet.

Many of the providers on [ChainList.org](https://chainlist.org/) can be called using the canister's `request` method. 


## Importing or deploying the EVM RPC canister

To include the EVM RPC canister in a [dfx](https://internetcomputer.org/docs/current/references/cli-reference/dfx-parent) project, add the following to your `dfx.json` file:

```json
{
  "canisters": {
    "evm_rpc": {
      "type": "custom",
      "candid": "https://github.com/internet-computer-protocol/evm-rpc-canister/releases/latest/download/evm_rpc.did",
      "wasm": "https://github.com/internet-computer-protocol/evm-rpc-canister/releases/latest/download/evm_rpc_dev.wasm.gz",
      "remote": {
        "id": {
          "ic": "7hfb6-caaaa-aaaar-qadga-cai"
        }
      }
    }
  }
}
```

Next, start the local replica and deploy the canister locally with a specified number of nodes (`28` for the [fiduciary subnet](https://internetcomputer.org/docs/current/developer-docs/backend/subnet-types#fiduciary-subnets)):

```
dfx start --background
dfx deploy evm_rpc --argument '(record { nodesInSubnet = 28 })'
```

Another option is to create a fork of the EVM RPC canister:

```
git clone https://github.com/internet-computer-protocol/evm-rpc-canister
```

To deploy your own canister on the mainnet, run the `dfx deploy` command with the `--network ic` flag:

```
dfx deploy evm_rpc --network ic --argument '(record { nodesInSubnet = 28 })'
```

Note that when deploying your own canister, you may encounter API rate limits. Refer to the [Replacing API keys](#replacing-api-keys) section to learn how to configure API credentials.

## Example usage

```bash
# Configuration
NETWORK=local
IDENTITY=default
CYCLES=1000000000
WALLET=$(dfx identity get-wallet)
RPC_SOURCE=EthMainnet
JSON_RPC_SOURCE=Chain=1
RPC_CONFIG=null

# Get event logs for smart contract `0xdAC1...1ec7`
dfx canister call evm_rpc eth_getLogs "(variant {$CANDID_SOURCE}, $RPC_CONFIG, record {addresses = vec {\"0xdAC17F958D2ee523a2206206994597C13D831ec7\"}})" --with-cycles=$CYCLES --wallet=$WALLET

# Get the latest Ethereum block info
dfx canister call evm_rpc eth_getBlockByNumber "(variant {$CANDID_SOURCE}, $RPC_CONFIG, variant {Latest})" --with-cycles=$CYCLES --wallet=$WALLET

# Get receipt for transaction `0xdd5d...4746f`
dfx canister call evm_rpc eth_getTransactionReceipt "(variant {$CANDID_SOURCE}, $RPC_CONFIG, \"0xdd5d4b18923d7aae953c7996d791118102e889bea37b48a651157a4890e4746f\")" --with-cycles=$CYCLES --wallet=$WALLET

# Get number of transactions for contract `0xdAC1...1ec7`
dfx canister call evm_rpc eth_getTransactionCount "(variant {$CANDID_SOURCE}, $RPC_CONFIG, record {address = \"0xdAC17F958D2ee523a2206206994597C13D831ec7\"; block = variant {Latest}})" --with-cycles=$CYCLES --wallet=$WALLET

# Get the fee history for the last 3 Ethereum blocks
dfx canister call evm_rpc eth_feeHistory "(variant {$CANDID_SOURCE}, $RPC_CONFIG, record {blockCount = 3; newestBlock = variant {Latest}})" --with-cycles=$CYCLES --wallet=$WALLET

# Send a raw transaction
dfx canister call evm_rpc eth_sendRawTransaction "(variant {$SOURCE}, $RPC_CONFIG, \"0xf86c098504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a028ef61340bd939bc2195fe537567866003e1a15d3c71ff63e1590620aa636276a067cbe9d8997f761aecb703304b3800ccf555c9f3dc64214b297fb1966a3b6d83\")" --with-cycles=$CYCLES --wallet=$WALLET

# Send a raw JSON-RPC request
dfx canister call evm_rpc request "(variant {$JSON_RPC_SOURCE}, "'"{ \"jsonrpc\": \"2.0\", \"method\": \"eth_gasPrice\", \"params\": [], \"id\": 1 }"'", 1000)" --with-cycles=$CYCLES --wallet=$WALLET
```


## Custom JSON-RPC requests

Send a raw JSON-RPC request to a custom URL with the `request` method:

```bash
dfx canister call evm_rpc --wallet $(dfx identity get-wallet) --with-cycles 100000000 request '(variant {Custom={url = "https://ethereum.publicnode.com"}},"{\"jsonrpc\":\"2.0\",\"method\":\"eth_gasPrice\",\"params\":[],\"id\":1}",1000)'
```

## Specifying an EVM chain

To use a specific EVM chain, specify the chain's ID in the `Chain` variant:

```
dfx canister call evm_rpc --wallet $(dfx identity get-wallet) --with-cycles 100000000 request '(variant {Chain=0x1},"{\"jsonrpc\":\"2.0\",\"method\":\"eth_gasPrice\",\"params\":[],\"id\":1}",1000)'
```

## Specifying an RPC provider

You can also specify an RPC provider:

```candid
type JsonRpcSource = variant {
  Chain : nat64;
  Provider : nat64;
  Custom : record { url : text; headers : vec (text, text) };
};

request : (
  source : JsonRpcSource,
  jsonRequest : text,
  maxResponseBytes : nat64
) -> (
  Result<text, RpcError>
);
```

## Registering your own provider

To register your own RPC provider in your local replica, you can use the following commands:

```bash
# Authorize your dfx identity to add an RPC provider
OWNER_PRINCIPAL=$(dfx identity get-principal)
dfx canister call evm_rpc authorize "(principal \"$OWNER_PRINCIPAL\", variant { RegisterProvider })"

# Register a provider
dfx canister call evm_rpc registerProvider '(record { chainId=1; hostname="cloudflare-eth.com"; credentialPath="/v1/mainnet"; cyclesPerCall=1000; cyclesPerMessageByte=100; })'
```

The `registerProvider` command has the following input parameters:

- `chainId`: The ID of the blockchain network.
- `hostname`: The JSON-RPC API hostname. 
- `credentialPath`: The path to the RPC authentication.
- `cyclesPerCall`: The amount of cycles charged per RPC call.
- `cyclesPerMessageByte`: The amount of cycles charged per message byte. 

## Replacing API keys

If you want to add or change the API key in your local replica or a deployed fork of the canister, the first step is to determine the relevant `providerId` for the API.

Run the following command to view all registered providers:

```bash
dfx canister call evm_rpc getProviders
```

You should see a list of values. Look for the `providerId`, which in this case is `0`:

```
(
  vec {
    record {
      cyclesPerCall = 0 : nat64;
      owner = principal "k3uua-wskan-xmpt3-e5bpx-ibj67-azbop-s26l5-kaakn-64bvk-y4jlc-oqe";
      hostname = "cloudflare-eth.com";
      primary = false;
      chainId = 1 : nat64;
      cyclesPerMessageByte = 0 : nat64;
      providerId = 0 : nat64;
    };
  }
)
```

Update the configuration for an existing provider using the `updateProvider` method:

```bash
dfx canister call evm_rpc updateProvider '(record { providerId = 0; credentialPath = opt "/path/to/YOUR-API-KEY" })'
```

Note that `credentialPath` should include everything after the hostname. For example, an RPC provider with hostname `rpc.example.org` and credential path `/path/to/secret` will resolve to `https://rpc.example.org/path/to/secret`. 

Some RPC services expect the API key in a request header instead of a URI path. In this case, use a command such as the following:

```bash
dfx canister call evm_rpc updateProvider '(record { providerId = 0; credentialHeaders = opt vec { record { name = "HEADER_NAME"; value = "HEADER_VALUE" } } })'
```

## Important notes

### RPC result consistency

When calling RPC methods directly through the Candid interface (rather than via the `request` method), the canister will compare results from several JSON-RPC APIs and return a `Consistent` or `Inconsistent` variant based on whether the APIs agree on the result.

By default, the canister uses three different RPC providers, which may change depending on availability. It's possible to specify which providers to use for this consistency check. For example:

```bash
dfx canister call evm_rpc eth_getTransactionCount '(variant {EthMainnet = opt vec {Cloudflare; PublicNode}}, record {address = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; block = variant {Tag = variant {Latest}}})' --with-cycles 100000000000 --wallet=$(dfx identity get-wallet)
```

### HTTP outcall consensus

Be sure to verify that RPC requests work as expected on the ICP mainnet. HTTP outcalls performed in the `request` method only reach consensus if the JSON-RPC response is the same each call. 

If you encounter an issue with consensus, [please let us know](https://github.com/internet-computer-protocol/evm-rpc-canister) and we will look into whether it's possible to add official support for your use case. 

### Response size estimates

In some cases, it's necessary to perform multiple HTTP outcalls with increasing maximum response sizes to complete a request. This is relatively common for the `eth_getLogs` method and may increase the time and cost of performing an RPC call. One solution is to specify an initial response size estimate (in bytes):

```bash
dfx canister call evm_rpc eth_getLogs "(variant {EthMainnet}, record {responseSizeEstimate = 5000}, record {addresses = vec {\"0xdAC17F958D2ee523a2206206994597C13D831ec7\"}})" --with-cycles=1000000000 --wallet=$(dfx identity get-wallet)
```

If the response is larger than the estimate, the canister will double the max response size and retry until either receiving a response or running out of cycles given by the `--with-cycles` flag.
