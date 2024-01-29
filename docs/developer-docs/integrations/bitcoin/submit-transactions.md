import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sending Bitcoin transactions 

## Overview

To submit transactions to the Bitcoin network, the Bitcoin integration API exposes the following method:

- `bitcoin_send_transaction`: Submits a transaction to the Bitcoin network.

## Sending transactions

To send transactions to the Bitcoin network, make a call to the `bitcoin_send_transaction` Bitcoin API method. You can create a function in your canister to call this method such as:

<Tabs groupId="languages">
<TabItem value="motoko" label="Motoko" default>

```motoko
  public func send(request : SendRequest) : async Text {
    Utils.bytesToText(await BitcoinWallet.send(NETWORK, DERIVATION_PATH, KEY_NAME, request.destination_address, request.amount_in_satoshi))
  };
```

</TabItem>

<TabItem value="rust" label="Rust" default>

```rust
#[update]
pub async fn send(request: types::SendRequest) -> String {
    let derivation_path = DERIVATION_PATH.with(|d| d.clone());
    let network = NETWORK.with(|n| n.get());
    let key_name = KEY_NAME.with(|kn| kn.borrow().to_string());
    let tx_id = bitcoin_wallet::send(
        network,
        derivation_path,
        key_name,
        request.destination_address,
        request.amount_in_satoshi,
    )
    .await;

    tx_id.to_string()
}
```

</TabItem>
</Tabs>


Then make a call to this canister's function with the command:

```
dfx canister call CANISTER_NAME send '(record { destination_address = "ADDRESS"; amount_in_satoshi = 100000000; })'
```

Replace `CANISTER_NAME` with your canister's name and replace `ADDRESS` with the destination Bitcoin address. [Learn more about Bitcoin addresses.](https://en.bitcoin.it/wiki/Transaction#Pay-to-PubkeyHash)

## Resources

- [Basic Bitcoin example dapp - Motoko](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin).

- [Motoko Bitcoin integration algorithms](https://github.com/tgalal/motoko-bitcoin/tree/10cf7f2efbba9bb4d077013db1b990143f193844).

- [Basic Bitcoin example dapp - Rust](https://github.com/dfinity/examples/tree/master/rust/basic_bitcoin).