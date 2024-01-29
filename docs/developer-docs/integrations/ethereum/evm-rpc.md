# EVM RPC canister

To use the EVM RPC canister, you can import it into your project's `dfx.json` file:

```json
{
 "canisters": {
   "evm_rpc": {
     "type": "custom",
     "candid": "https://github.com/internet-computer-protocol/ic-eth-rpc/releases/latest/download/evm_rpc.did",
     "wasm": "https://github.com/internet-computer-protocol/ic-eth-rpc/releases/latest/download/evm_rpc_dev.wasm.gz",
     "remote": {
       "id": {
         "ic": "a6d44-nyaaa-aaaap-abp7q-cai"
       }
     }
   }
 }
}
```

## Supported RPC methods

- `eth_feeHistory`: Queries the historical fee data to estimate gas prices for transactions.
- `eth_getLogs`: Queries the logs of a specified block or transaction.
- `eth_getBlockByNumber`: Queries information about a given block.
- `eth_getTransactionCount`: Queries the number of transactions for a specified address.
- `eth_getTransactionReceipt`: Queries details about a submitted transaction.
- `eth_sendRawTransaction`: Submits a signed transaction to the Ethereum network.

Other JSON-RPC methods (including those specific to non-Ethereum networks) may be accessed using the canister's `request` method.


## Supported RPC providers

- Alchemy: `https://eth-mainnet.g.alchemy.com/v2/`
- Ankr: `https://rpc.ankr.com/eth/`
- BlockPI: `https://ethereum.blockpi.network/v1/rpc/`
- Cloudflare Web3: `https://cloudflare-eth.com/v1/mainnet/`
- Public Node: `https://ethereum.publicnode.com`

View the [full list of RPC providers for each EVM network.](https://chainlist.org/)

### Specifying an RPC provider

To specify the RPC provider you'd like to use, change the `Url` value:

```
dfx canister call evm_rpc --wallet $(dfx identity get-wallet) --with-cycles 600000000 request '(variant {Url="https://ethereum.publicnode.com"},"{\"jsonrpc\":\"2.0\",\"method\":\"eth_gasPrice\",\"params\":[],\"id\":1}",1000)'
```

### Registering your own provider

To register your own RPC provider, you can use the following command:

```
dfx canister call evm_rpc register_provider '(record { chain_id=1; base_url="https://cloudflare-eth.com"; credential_path="/v1/mainnet"; cycles_per_call=10; cycles_per_message_byte=1; })'
```

In this command, the following configuration parameters are set:

- `chain_id`: The ID of the blockchain network.
- `base_url`: The JSON-RPC base URL. 
- `credential_path`: The path to the RPC authentication.
- `cycles_per_call`: The amount of cycles charged per RPC call.
- `cycles_per_message_byte`: The amount of cycles charged per message byte. 


Then, to authorize with this provider in your local environment, run the commands:

```
PRINCIPAL=$(dfx identity get-principal)
dfx canister call evm_rpc authorize "(principal \"$PRINCIPAL\", variant { RegisterProvider })"
dfx canister call evm_rpc get_authorized '(variant { RegisterProvider })'
```

To deauthorize the provider locally, run the command:

```
dfx canister call evm_rpc deauthorize "(principal \"$PRINCIPAL\", variant { RegisterProvider })"
```


### Using a specific EVM chain

To use a specific EVM chain, specify the chain's ID in the `Chain` parameter:

```
dfx canister call evm_rpc --wallet $(dfx identity get-wallet) --with-cycles 600000000 request '(variant {Chain=0x1},"{\"jsonrpc\":\"2.0\",\"method\":\"eth_gasPrice\",\"params\":[],\"id\":1}",1000)'
```


## Using the EVM RPC canister 

To use the canister locally, start the local replica and deploy the canister locally with `13` subnets to simulate deployment on the mainnet:

```
dfx start --background
dfx deploy evm_rpc --argument '(record { nodesInSubnet = 13 })'
```

To use the canister on the mainnet, deploy it with the `--network ic` flag:

```
dfx deploy evm_rpc --network ic
```

## eth_gasPrice

To query the current ETH gas price, make a call to the `eth_gasPrice` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_gasPrice\",\"params\":[],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Additional parameters; none are specified in this example.
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).

### eth_getLogs

To query the logs of a specific transaction, make a call to the `eth_getLogs` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getLogs\",\"params\":[{\"topics\":[\"0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b\"]}],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Specifies a 'topic' value. A topic is an array of 32 bytes of data. Additional parameters can be found in the [JSON RPC documentation.](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_getlogs) 
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).

### eth_getBlockByNumber

To query information about a block, make a call to the `eth_getBlockByNumber` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getBlockByNumber\",\"params\":[\"0x1b4\", true],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Specifies a block number, or the string "earliest", "latest," or "pending". Specifies a boolean of "true" or "false," where true returns the full transaction objects and false only returns the hashes of the transactions. Additional information can be found in the [JSON RPC documentation.](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_getblockbynumber) 
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).

### eth_getTransactionReceipt

To query a transaction receipt, make a call to the `eth_getTransactionReceipt` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getTransactionReceipt\",\"params\":[\"0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5\"],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Specifies the hash of a transaction. Additional information can be found in the [JSON RPC documentation.](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_getblockbynumber) 
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).

### eth_feeHistory

To return a collection of historical gas information, make a call to the `eth_feeHistory` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_feeHistory\",\"params\":[\"4\",\"4\"],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Specifies the number of blocks in the request range and the highest block of that requested range. Additional information can be found in the [JSON RPC documentation.](https://docs.alchemy.com/reference/eth-feehistory)
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).


### eth_sendRawTransaction

To submit a raw transaction, make a call to the `eth_sendRawTransaction` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_sendRawTransaction\",\"params\":[\"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675\"],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Specifies the signed transaction data. Additional information can be found in the [JSON RPC documentation.](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_sendrawtransaction) 
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).

### eth_getTransactionCount

To return the amount of transactions sent from an address, make a call to the `eth_getTransactionCount` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getTransactionCount\",\"params\":[\"0x407d73d8a49eeb85d32cf465507dd71d507100c1\",\"latest\"],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Specifies the address to query and the "latest", "earliest", or "pending" filter for transactions. Additional information can be found in the [JSON RPC documentation.](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_gettransactioncount) 
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).

### eth_call

To execute a new message without creating a transaction (often used for read-only functions), make a call to the `eth_call` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_call\",\"params\":[],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Additional information can be found in the [JSON RPC documentation.](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_call) 
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).

### eth_getStorageAt

To return the value of a storage position, make a call to the `eth_getStorageAt` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getStorageAt\",\"params\":["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Specifies the contract address, integer of the position in the storage, and integer block number or string "latest", "earliest", or "pending" status. Additional information can be found in the [JSON RPC documentation.](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_getstorageat) 
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).


### eth_estimateGas

To estimate the gas fee, make a call to the `eth_estimateGas` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_estimateGas\",\"params\":[],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: All parameters are optional. Additional information can be found in the [JSON RPC documentation.](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_estimategas)
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).


### eth_blockNumber

To return the most recent block number, make a call to the `eth_blockNumber` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_blockNumber\",\"params\":[],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: No parameters.
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).

### eth_getCode

To return the code for an address, make a call to the `eth_getCode` JSON-RPC method:

```
dfx canister call evm_rpc --network ic request '(variant {Url="https://cloudflare-eth.com/v1/mainnet"}, "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getCode\",\"params\":[\"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b\", \"0x2\"],\"id\":1}", 1000)' --wallet $(dfx identity get-wallet) --with-cycles 600000000
```

In this request, the following configuration is passed:

- `Url`: The URL of the RPC service. 
- `jsonrpc`: The version of JSON-RPC used.
- `method`: The RPC method being called.
- `params`: Specifies the address and the integer block number of string "latest", "earliest", or "pending". Additional information can be found in the [JSON RPC documentation.](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_getcode)
- `id`: id of the request.

Additionally, the flags used are:

- `wallet`: The cycles wallet associated with the current dfx identity. 
- `with-cycles`: The amount of cycles to send with the call. Sending cycles with the call is necessary to pay for the RPC call. Learn more about [RPC costs](overview.md).
