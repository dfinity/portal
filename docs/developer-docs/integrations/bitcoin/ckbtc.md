# Chain-key Bitcoin (ckBTC)

## Overview

Chain-key Bitcoin (ckBTC) is an [ICRC-1](https://github.com/dfinity/ICRC-1/blob/aa82e52aaa74cc7c5f6a141e30b708bf42ede1e3/standards/ICRC-1/README.md)-compliant token that is backed 1:1 by Bitcoin held 100% on the IC mainnet.

The ckBTC functionality is provided through an interplay of two canisters:
- The **ckBTC minter**. 
- The **ckBTC ledger**.

The ckBTC ledger is responsible for keeping account balances and for transferring ckBTC between accounts. It provides the following functionality:
- It enables the ckBTC minter to mint and burn ckBTC.
- It enables the transfer of ckBTC among users.

The ckBTC minter is responsible for the minting and burning of ckBTC tokens. A certain amount of tokens is minted if a user transfers the same amount of bitcoin to a specific Bitcoin address under the ckBTC minter's control. The Bitcoin address uniquely identifies the owner of the sent bitcoins, making it possible for the ckBTC minter to associate the minted ckBTC funds with the correct owner. The ckBTC minter needs to receive BTC, based on a large number of confirmations due to the lack of finality in Bitcoin, before it mints the same amount in ckBTC. The ckBTC minter burns the ckBTC before it transfers the corresponding BTC amount using a regular Bitcoin transaction.

A detailed description of the ckBTC minter can be found in its [GitHub repository](https://github.com/dfinity/ic/tree/master/rs/bitcoin/ckbtc/minter).

A simplified overview of the process to mint and transfer ckBTC is depicted in the following figure.

![ckBTC overview](../../../samples/_attachments/ckbtc-overview.png)

For a deeper technical overview, please see [here](bitcoin-how-it-works.md).

This page will detail the API endpoints that can be used to interact with the ckBTC minter canister. 

## ckBTC ledger
The ckBTC ledger accepts minting and burning requests from the ckBTC minter and records the ckBTC balances of every account with a positive balance. Additionally, the ckBTC ledger handles the ckBTC transactions.

The ckBTC ledger adheres to the ICRC-1 token standard. Technical details can be found on the GitHub repository of the used [ICRC-1 ledger implementation](https://github.com/dfinity/ic/tree/master/rs/rosetta-api/icrc1).

## ckBTC minter
The ckBTC minter is a canister that is controlled by the NNS and running on the [pzp6e](https://dashboard.internetcomputer.org/subnet/pzp6e-ekpqk-3c5x7-2h6so-njoeq-mt45d-h3h6c-q3mxf-vpeq5-fk5o7-yae) subnet. In the configuration of the ckBTC minter canister, the following configurations are set:

- `retrieve_btc_min_amount`: This is the minimum ckBTC amount that can be burned and, correspondingly, the minimum BTC amount that can be withdrawn. The parameter is set to 0.001 BTC, or 100,000 Satoshi.
- `max_time_in_queue_nanos`: Any BTC retrieval request should be kept in a queue for at most this time. Caching requests rather than handling them right away has the advantage that multiple requests can be served in a single transaction, saving Bitcoin miner fees. The parameter is set to 10 minutes, which corresponds to the expected time between Bitcoin blocks.
- `min_confirmations`: The number of confirmations required for the ckBTC minter to accept a Bitcoin transaction. In particular, the ckBTC minter does not mint ckBTC before a transaction transferring BTC to a Bitcoin address managed by the ckBTC minter reaches this number of transactions. The parameter was initially set to 72 but has been reduced to 12 in the meantime.
- `kyt_fee`: The fee that must be paid for KYT checks. It is currently set to 2000 satoshi.

There are other parameters that are self-explanatory and can be found in the [ckBTC minter Candid file](https://github.com/dfinity/ic/blob/master/rs/bitcoin/ckbtc/minter/ckbtc_minter.did).

## ckBTC minter API endpoints
The ckBTC minter provides the following API endpoints that can be used to interact with the canister:

- `get_btc_address`: Returns a specific Bitcoin address that the caller can use to obtain ckBTC by sending BTC to this address.
- `track_balance`: Instructs the ckBTC minter to track a certain Bitcoin address until funds are added, which will trigger the minting of ckBTC. NOTE: This endpoint is work-in-progress and not available yet.
- `update_balance`: Instructs the ckBTC minter to check the balance of a Bitcoin address and mint ckBTC into the account of the owner.
- `estimate_withdrawal_fee`: Returns a current estimate for the fee to be paid when retrieving a certain BTC amount.
- `get_deposit_fee`: Returns the fee charged when minting ckBTC.
- `get_withdrawal_account`: Returns a specific ckBTC account where the owner must transfer ckBTC before being able to retrieve BTC.
- `retrieve_btc`: Instructs the ckBTC minter to burn a certain ckBTC amount and send the corresponding BTC amount, minus fees, to a provided Bitcoin address.
- `retrieve_btc_status`: Returns the status of a previous retrieve_btc call.
- `get_minter_info`: Returns information about the ckBTC minter itself.
- `get_events`: Returns a set of events at the ckBTC minter.
The endpoints are discussed in more detail in the following.

### `get_btc_address(owner: opt principal, subaccount: opt blob)`
The provided principal ID and subaccount are concatenated to form the derivation path for the [ecdsa_public_key](https://internetcomputer.org/docs/current/references/ic-interface-spec#ic-ecdsa_public_key) function, which returns the derived public key. If no principal ID is provided, then the sender’s principal ID is used. If no subaccount is provided, then the default subaccount (all zeros) is used.

This public key is encoded as a pay-to-witness-public-key-hash (P2WPKH) Bitcoin address and returned as a text.

Note that the key derivation is not BIP-32 compliant where 31 bits are used for each derivation level. Instead, a single derivation is performed based on the full principal ID and subaccount. Since the derivation is deterministic, a canister can derive the Bitcoin address for a given principal ID and subaccount itself.

### `track_balance(owner: opt principal, subaccount: opt blob)`
:::info
This endpoint is work-in-progress and not available yet.
:::

The ckBTC minter starts tracking the Bitcoin address derived from the provided principal ID and subaccount using the `get_btc_address` endpoint. If no principal ID is provided, then the sender’s principal ID is used. If no subaccount is provided, then the default subaccount (all zeros) is used.

The balance of the Bitcoin address is not tracked indefinitely. Tracking is stopped if either at least one new unspent transaction output (UTXO) is discovered or there is no new UTXO within a certain time interval (details about balance tracking are provided below).

If at least one new UTXO is discovered, the same amount of ckBTC tokens minus the KYT fee are minted and made available to the owner.

### `update_balance(owner: opt principal, subaccount: opt blob)`
Instead of having the ckBTC minter track the balance of a Bitcoin address, the `update_balance` function can be invoked to instruct the ckBTC minter to check if there are new UTXOs for a particular Bitcoin address.

If there is at least one new UTXO, the corresponding ckBTC amount is minted, otherwise an error is returned.

The ckBTC minter effectively invokes this endpoint itself on a timer when the `track_balance` function is used.

### `estimate_withdrawal_fee(amount: opt nat64)`
The endpoint returns an estimate for the fee that must be paid when retrieving the given BTC amount. Internally, a transaction is built (without valid signatures) to determine the fee, which consists of the Bitcoin miner fee, the ckBTC minter fee, and the KYT fee. If no amount is provided, it is assumed that three inputs are required to build the transaction.

If there is no change to the internal state of the ckBTC minter and the Bitcoin canister before issuing the request to retrieve Bitcoins, the fee will be exactly the returned estimate.

The fee can change when a new Bitcoin block is mined in the meantime, which causes the Bitcoin canister to update the Bitcoin miner fees or when another retrieval request is handled first, spending some of the outputs that were used when estimating the fee.

### `get_deposit_fee`
The endpoint returns the fee that the ckBTC minter charges for minting ckBTC when receiving new UTXOs. Currently, this fee is simply the KYT fee.

### `get_withdrawal_account`
The function returns the caller’s withdrawal account, which is the account derived from the ckBTC minter’s principal ID and the subaccount derived from the caller’s principal ID.

A user can only retrieve BTC by first transferring ckBTC to this particular account.

### `retrieve_btc(address: text, amount: nat64)`
The function instructs the ckBTC minter to burn the specified amount. Once the request is picked up from the queue, a Bitcoin transaction is created containing an output that transfers the requested amount (minus fees as discussed below) to the specified Bitcoin address.

Since Bitcoin retrieval is handled asynchronously, the function returns the block index of the transaction burning the ckBTC tokens.

### `retrieve_btc_status(block_index: nat64)`
The status of a BTC retrieval request can be checked using this function. The different possible statuses are:

- `Unknown`: There is no information available on the ckBTC minter because there is no retrieval request associated with the given block index or the retrieval request is old and the corresponding information has already been removed.
- `Pending`: The BTC retrieval request is queued.
- `Signing`: The BTC retrieval request is acquiring all signatures to serve the BTC retrieval request.
- `Sending`: The Bitcoin transaction serving the BTC retrieval request is being sent.
- `Submitted`: The Bitcoin transaction has been transmitted. The transaction ID is returned.
- `AmountTooLow`: The BTC retrieval request could not be served because the Bitcoin miner fees are prohibitively high.
- `Confirmed`: The Bitcoin transaction serving the BTC retrieval request is confirmed inside the ckBTC minter, which happens when the transaction has at least the minimum required number of confirmations specified in the `min_confirmations` parameter above.

### `get_minter_info`
The function returns the following parameters internal to the ckBTC minter:

- `kyt_fee`
- `min_confirmations`
- `retrieve_btc_min_amount`

### `get_events(start: nat64, length: nat64)`
The ckBTC minter tracks the events that change its internal state. Given a start index and a length parameter, the ckBTC minter returns all events sequentially from the event at the given start index up to the event at index start+length-1.

Note that this endpoint is used for debugging purposes and there is no guarantee that the endpoint will continue to exist in this form.

## ckBTC minter API examples

#### Retrieve an account on the ckBTC ledger:

```
type Account = record { owner : principal; subaccount : opt blob };

type RetrieveBtcArgs = record {
    // The address to which the ckBTC minter should deposit BTC.
    // Currently, the minter understands only the following types of addresses:
    //   * P2WPKH addresses (they start with the "bc1q" prefix on the Bitcoin mainnet).
    //   * P2PKH addresses (they start with the "1" prefix on the Bitcoin mainnet).
    //   * P2SH addresses (they start with the "3" prefix on the Bitcoin mainnet).
    address : text;
    // The amount of BTC in Satoshis that the client wants to withdraw.
    amount : nat64;
};
```

#### Return the burn transaction index corresponding to the withdrawal:

```
type RetrieveBtcOk = record {
    block_index : nat64
};
```

You can use this index to query the withdrawal status.

#### Return the result of an [update_balance] call:

```
type UtxoStatus = variant {
    // The minter ignored this UTXO because UTXO's value is too small to pay
    // the KYT fees. This state is final, retrying [update_balance] call will
    // have no effect on this UTXO.
    ValueTooSmall : Utxo;
    // The KYT provider considered this UTXO to be tained. This UTXO state is
    // final, retrying [update_balance] call will have no effect on this UTXO.
    Tainted : Utxo;
    // The UTXO passed the KYT check, but the minter failed to mint ckBTC
    // because the Ledger was unavailable. Retrying the [update_balance] call
    // should eventually advance the UTXO to the [Minted] state.
    Checked : Utxo;
    // The UTXO passed the KYT check, and ckBTC has been minted.
    Minted : record {
        block_index : nat64;
        minted_amount : nat64;
        utxo : Utxo;
    };
};
```


#### Query the Bitcoin network's information: 

```
type BtcNetwork = variant {
    // The public Bitcoin mainnet.
    Mainnet;
    // The public Bitcoin testnet.
    Testnet;
    // A local Bitcoin regtest installation.
    Regtest;
};
```

#### Query the state's mode: 

```
type Mode = variant {
    // The minter does not allow any state modifications.
    ReadOnly;
    // Only specified principals can modify minter's state.
    RestrictedTo : vec principal;
    // Only specified principals can convert BTC to ckBTC.
    DepositsRestrictedTo : vec principal;
    // Anyone can interact with the minter.
    GeneralAvailability;
};
```

#### Return the initialization parameters of the ckBTCminter canister:

```
type InitArgs = record {
    // The minter will interact with this Bitcoin network.
    btc_network : BtcNetwork;

    // The principal of the ledger that handles ckBTC transfers.
    // The default account of the ckBTC minter must be configured as
    // the minting account of the ledger.
    ledger_id : principal;

    // The name of the ECDSA key to use.
    // E.g., "dfx_test_key" on the local replica.
    ecdsa_key_name : text;

    // The minimal amount of ckBTC that can be converted to BTC.
    retrieve_btc_min_amount : nat64;

    /// Maximum time in nanoseconds that a transaction should spend in the queue
    /// before being sent.
    max_time_in_queue_nanos : nat64;

    /// The minimum number of confirmations required for the minter to
    /// accept a Bitcoin transaction.
    min_confirmations : opt nat32;

    /// The minter's operation mode.
    mode : Mode;

    /// The fee paid per check by the KYT cansiter.
    kyt_fee : opt nat64;

    /// The canister id of the KYT canister.
    kyt_principal: opt principal;
};
```

#### Query the upgrade parameters of the ckBTC minter canister:

```
type UpgradeArgs = record {
    // The minimal amount of ckBTC that the minter converts to BTC.
    retrieve_btc_min_amount : opt nat64;

    /// Maximum time in nanoseconds that a transaction should spend in the queue
    /// before being sent.
    max_time_in_queue_nanos : opt nat64;

    /// The minimum number of confirmations required for the minter to
    /// accept a Bitcoin transaction.
    min_confirmations : opt nat32;

    /// If set, overrides the current minter's operation mode.
    mode : opt Mode;

    /// The fee per check by the KYT cansiter.
    kyt_fee : opt nat64;

    /// The principal of the KYT canister.
    kyt_principal : opt principal;
};
```

#### Query the Bitcoin transaction status:

```
type RetrieveBtcStatus = variant {
    // The minter does not have any information on the specified
    // retrieval request.  It can be that nobody submitted the
    // request or the minter pruned the relevant information from the
    // history to save space.
    Unknown;

    // The minter did not send a Bitcoin transaction for this request yet.
    Pending;

    // The minter is obtaining all required ECDSA signatures on the
    // Bitcoin transaction for this request.
    Signing;

    // The minter signed the transaction and is waiting for a reply
    // from the Bitcoin canister.
    Sending : record { txid : blob };

    // The minter sent a transaction for the retrieve request.
    // The payload contains the identifier of the transaction on the Bitcoin network.
    Submitted : record { txid : blob };

    // The amount was too low to cover the transaction fees.
    AmountTooLow;

    // The minter received enough confirmations for the Bitcoin
    // transaction for this request.  The payload contains the
    // identifier of the transaction on the Bitcoin network.
    Confirmed : record { txid : blob };
};
```

#### Query UTXO information:

```
type Utxo = record {
    outpoint : record { txid : vec nat8; vout : nat32 };
    value : nat64;
    height : nat32;
};
```

#### Return BitcoinAddress:

```
type BitcoinAddress = variant {
    p2wpkh_v0 : blob;
    p2pkh : blob;
    p2sh : blob;
};
```

#### Return information on the ckBTC minter canister:

```
type MinterInfo = record {
    min_confirmations : nat32;
    retrieve_btc_min_amount : nat64;
    kyt_fee : nat64;
};
```

#### Query transaction information:

```
type Event = variant {
    init : InitArgs;
    upgrade : UpgradeArgs;
    received_utxos : record { to_account : Account; utxos : vec Utxo };
    accepted_retrieve_btc_request : record {
        amount : nat64;
        address : BitcoinAddress;
        block_index : nat64;
        received_at : nat64;
        kyt_provider : opt principal;
    };
    removed_retrieve_btc_request : record { block_index : nat64 };
    sent_transaction : record {
        requests : vec nat64;
        txid : blob;
        utxos : vec Utxo;
        change_output : opt record { vout : nat32; value : nat64 };
        submitted_at : nat64;
    };
    confirmed_transaction : record { txid : blob };
    checked_utxo : record {
        utxo : Utxo;
        uuid : text;
        clean : bool;
        kyt_provider : opt principal;
    };
    ignored_utxo : record { utxo: Utxo; };
    retrieve_btc_kyt_failed : record {
        address : text;
        amount : nat64;
        kyt_provider : principal;
        uuid : text;
        block_index : nat64;
    };
};
```

#### Query the ckBTC minter arguments:

```
type MinterArg = variant {
    Init : InitArgs;
    Upgrade : opt UpgradeArgs;
}
```

#### Submit a transaction for converting BTC to ckBTC, then converts ckBTC to BTC:

```
service : (minter_arg : MinterArg) -> {
    // Section "Convert BTC to ckBTC" {{{

    // Returns the Bitcoin address to which the owner should send BTC
    // before converting the amount to ckBTC using the [update_balance]
    // endpoint.
    //
    // If the owner is not set, it defaults to the caller's principal.
    get_btc_address : (record { owner: opt principal; subaccount : opt blob }) -> (text);

    // Mints ckBTC for newly deposited UTXOs.
    //
    // If the owner is not set, it defaults to the caller's principal.
    //
    // # Preconditions
    //
    // * The owner deposited some BTC to the address that the
    //   [get_btc_address] endpoint returns.
    update_balance : (record { owner: opt principal; subaccount : opt blob }) -> (variant { Ok : vec UtxoStatus; Err : UpdateBalanceError });

    // }}} Section "Convert BTC to ckBTC"

    // Section "Convert ckBTC to BTC" {{{

    /// Returns an estimate of the user's fee (in Satoshi) for a
    /// retrieve_btc request based on the current status of the Bitcoin network.
    estimate_withdrawal_fee : (record { amount : opt nat64 }) -> (record { bitcoin_fee : nat64; minter_fee : nat64 }) query;

    /// Returns the fee that the minter will charge for a Bitcoin deposit.
    get_deposit_fee: () -> (nat64) query;

    // Returns the account to which the caller should deposit ckBTC
    // before withdrawing BTC using the [retrieve_btc] endpoint.
    get_withdrawal_account : () -> (Account);

    // Submits a request to convert ckBTC to BTC.
    //
    // # Note
    //
    // The BTC retrieval process is slow.  Instead of
    // synchronously waiting for a BTC transaction to settle, this
    // method returns a request ([block_index]) that the caller can use
    // to query the request status.
    //
    // # Preconditions
    //
    // * The caller deposited the requested amount in ckBTC to the account
    //   that the [get_withdrawal_account] endpoint returns.
    retrieve_btc : (RetrieveBtcArgs) -> (variant { Ok : RetrieveBtcOk; Err : RetrieveBtcError });

    /// Returns the status of a [retrieve_btc] request.
    retrieve_btc_status : (record { block_index : nat64 }) -> (RetrieveBtcStatus) query;

    // }}} Section "Convert ckBTC to BTC"

    // Section "Minter Information" {{{
    // Returns internal minter parameters.
    get_minter_info : () -> (MinterInfo) query;
    // }}}

    // Section "Event log" {{{

    // The minter keeps track of all state modifications in an internal event log.
    //
    // This method returns a list of events in the specified range.
    // The minter can return fewer events than requested. The result is
    // an empty vector if the start position is greater than the total
    // number of events.
    //
    // NOTE: this method exists for debugging purposes.
    // The ckBTC minter authors do not guarantee backward compatibility for this method.
    get_events : (record { start: nat64; length : nat64 }) -> (vec Event) query;
    // }}} Section "Event log"
}
```

### Error types

The following error types may be returned:

- `MalformedAddress` : text : The minter failed to parse the destination address.
- `AlreadyProcessing` : The minter is already processing another retrieval request for the same principal.
- `AmountTooLow` : nat64 : The withdrawal amount is too low, or the payload contains the minimal withdrawal amount.
- `InsufficientFunds` : record { balance : nat64 }: The ckBTC balance of the withdrawal account is too low.
- `TemporarilyUnavailable` : text: The minter is overloaded, retry the request, or the payload contains a human-readable message explaining what caused the unavailability.
- `GenericError` : record { error_message : text; error_code : nat64 }: A generic error reserved for future extensions.
- `NoNewUtxos` : record { current_confirmations: opt nat32; required_confirmations: nat32 }: There are no new UTXOs to process.

## Resources

If you want to learn more about the inner workings of the ckBTC canister, see the
[ckBTC wiki page](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin).
