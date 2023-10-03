# ICRC-1 token standard

## Overview
The [ICRC-1](https://github.com/dfinity/ICRC-1/blob/main/standards/ICRC-1/README.md) is a standard for **fungible tokens** on the Internet Computer.

## Data

### account

A `principal` can have multiple accounts. Each account of a `principal` is identified by a 32-byte string called `subaccount`. Therefore an account corresponds to a pair `(principal, subaccount)`.

The account identified by the subaccount with all bytes set to 0 is the _default account_ of the `principal`.

```candid "Type definitions" +=
type Subaccount = blob;
type Account = record { owner : principal; subaccount : opt Subaccount; };
```

## Methods

### icrc1_name <span id="name_method"></span>

Returns the name of the token (e.g., `MyToken`).

```candid "Methods" +=
icrc1_name : () -> (text) query;
```

### icrc1_symbol <span id="symbol_method"></span>

Returns the symbol of the token (e.g., `ICP`).

```candid "Methods" +=
icrc1_symbol : () -> (text) query;
```

### icrc1_decimals <span id="decimals_method"></span>

Returns the number of decimals the token uses (e.g., `8` means to divide the token amount by `100000000` to get its user representation).

```candid "Methods" +=
icrc1_decimals : () -> (nat8) query;
```

### icrc1_fee <span id="fee_method"></span>

Returns the default transfer fee.

```candid "Methods" +=
icrc1_fee : () -> (nat) query;
```

### icrc1_metadata <span id="metadata_method"></span>

Returns the list of metadata entries for this ledger.
See the "Metadata" section below.

```candid "Type definitions" +=
type Value = variant { Nat : nat; Int : int; Text : text; Blob : blob };
```

```candid "Methods" +=
icrc1_metadata : () -> (vec record { text; Value }) query;
```

### icrc1_total_supply

Returns the total number of tokens on all accounts except for the [minting account](#minting_account).

```candid "Methods" +=
icrc1_total_supply : () -> (nat) query;
```

### icrc1_minting_account

Returns the [minting account](#minting_account) if this ledger supports minting and burning tokens.

```candid "Methods" +=
icrc1_minting_account : () -> (opt Account) query;
```

### icrc1_balance_of

Returns the balance of the account given as an argument.

```candid "Methods" +=
icrc1_balance_of : (Account) -> (nat) query;
```

### icrc1_transfer <span id="transfer_method"></span>

Transfers `amount` of tokens from account `record { of = caller; subaccount = from_subaccount }` to the `to` account.
The caller pays `fee` tokens for the transfer.

```candid "Type definitions" +=
type TransferArgs = record {
    from_subaccount : opt Subaccount;
    to : Account;
    amount : nat;
    fee : opt nat;
    memo : opt blob;
    created_at_time : opt nat64;
};

type TransferError = variant {
    BadFee : record { expected_fee : nat };
    BadBurn : record { min_burn_amount : nat };
    InsufficientFunds : record { balance : nat };
    TooOld;
    CreatedInFuture : record { ledger_time: nat64 };
    Duplicate : record { duplicate_of : nat };
    TemporarilyUnavailable;
    GenericError : record { error_code : nat; message : text };
};
```

```candid "Methods" +=
icrc1_transfer : (TransferArgs) -> (variant { Ok: nat; Err: TransferError; });
```

The caller pays the `fee`.
If the caller does not set the `fee` argument, the ledger applies the default transfer fee.
If the `fee` argument does not agree with the ledger fee, the ledger MUST return `variant { BadFee = record { expected_fee = ... } }` error.

The `memo` parameter is an arbitrary blob that has no meaning to the ledger.
The ledger SHOULD allow memos of at least 32 bytes in length.
The ledger SHOULD use the `memo` argument for [transaction deduplication](#transaction_deduplication).

The `created_at_time` parameter indicates the time (as nanoseconds since the UNIX epoch in the UTC timezone) at which the client constructed the transaction.
The ledger SHOULD reject transactions that have `created_at_time` argument too far in the past or the future, returning `variant { TooOld }` and `variant { CreatedInFuture = record { ledger_time = ... } }` errors correspondingly.

The result is either the transaction index of the transfer or an error.

### icrc1_supported_standards

Returns the list of standards this ledger implements.
See the ["Extensions"](#extensions) section below.

```candid "Methods" +=
icrc1_supported_standards : () -> (vec record { name : text; url : text }) query;
```

The result of the call should always have at least one entry,

```candid
record { name = "ICRC-1"; url = "https://github.com/dfinity/ICRC-1" }
```

## Extensions <span id="extensions"></span>

The base standard intentionally excludes some ledger functions essential for building a rich DeFi ecosystem, for example:

  - Reliable transaction notifications for smart contracts.
  - The block structure and the interface for fetching blocks.
  - Pre-signed transactions.

The standard defines the `icrc1_supported_standards` endpoint to accommodate these and other future extensions.
This endpoint returns names of all specifications (e.g., `"ICRC-42"` or `"DIP-20"`) implemented by the ledger.

## Metadata

A ledger can expose metadata to simplify integration with wallets and improve user experience.
The client can use the [`icrc1_metadata`](#metadata_method) method to fetch the metadata entries. 
All the metadata entries are optional.

### Key format

The metadata keys are arbitrary Unicode strings and must follow the pattern `<namespace>:<key>`, where `<namespace>` is a string not containing colons.
Namespace `icrc1` is reserved for keys defined in this standard.

### Standard metadata entries

| Key | Example value | Semantics |
| --- | ------------- | --------- |
| `icrc1:symbol` | `variant { Text = "XTKN" }` | The token currency code (see [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217)). When present, should be the same as the result of the [`icrc1_symbol`](#symbol_method) query call. |
| `icrc1:name` | `variant { Text = "Test Token" }` | The name of the token. When present, should be the same as the result of the [`icrc1_name`](#name_method) query call. |
| `icrc1:decimals` | `variant { Nat = 8 }` | The number of decimals the token uses. For example, 8 means to divide the token amount by 10<sup>8</sup> to get its user representation. When present, should be the same as the result of the [`icrc1_decimals`](#decimals_method) query call. |
| `icrc1:fee` | `variant { Nat = 10_000 }` | The default transfer fee. When present, should be the same as the result of the [`icrc1_fee`](#fee_method) query call. |

## Transaction deduplication <span id="transfer_deduplication"></span>

Consider the following scenario:

- An agent sends a transaction to an ICRC-1 ledger hosted on the IC.
- The ledger accepts the transaction.
- The agent loses the network connection for several minutes and cannot learn about the outcome of the transaction.

An ICRC-1 ledger **should** implement transfer deduplication to simplify the error recovery for agents.
The deduplication covers all transactions submitted within a pre-configured time window `TX_WINDOW` (for example, last 24 hours).
The ledger **may** extend the deduplication window into the future by the `PERMITTED_DRIFT` parameter (for example, 2 minutes) to account for the time drift between the client and the Internet Computer.

The client can control the deduplication algorithm using the `created_at_time` and `memo` fields of the [`transfer`](#transfer_method) call argument:
  * The `created_at_time` field sets the transaction construction time as the number of nanoseconds from the UNIX epoch in the UTC timezone.
  * The `memo` field does not have any meaning to the ledger, except that the ledger will not deduplicate transfers with different values of the `memo` field.

The ledger SHOULD use the following algorithm for transaction deduplication if the client set the `created_at_time` field:
  * If `created_at_time` is set and is _before_ `time() - TX_WINDOW - PERMITTED_DRIFT` as observed by the ledger, the ledger should return `variant { TooOld }` error.
  * If `created_at_time` is set and is _after_ `time() + PERMITTED_DRIFT` as observed by the ledger, the ledger should return `variant { CreatedInFuture = record { ledger_time = ... } }` error.
  * If the ledger observed a structurally equal transfer payload (i.e., all the transfer argument fields and the caller have the same values) at transaction with index `i`, it should return `variant { Duplicate = record { duplicate_of = i } }`.
  * Otherwise, the transfer is a new transaction.

If the client did not set the `created_at_time` field, the ledger SHOULD NOT deduplicate the transaction.

## Minting account <span id="minting_account"></span>

The minting account is a unique account that can create new tokens and acts as the receiver of burnt tokens.

Transfers **from** the minting account act as **min** transactions depositing fresh tokens on the destination account.
Mint transactions have no fee.

Transfers **to** the minting account act as **burn** transactions, removing tokens from the token supply.
Burn transactions have no fee but might have minimal burn amount requirements.
If the client tries to burn an amount that is too small, the ledger **should** reply with the following:

```
variant { Err = variant { BadBurn = record { min_burn_amount = ... } } }
```

The minting account is also the receiver of the fees burnt in regular transfers.

## Textual encoding of accounts

Each ICRC-1 account has two components: the owner (up to 29 bytes) and the subaccount (32 bytes). If a subaccount is not included, it is equal to an array comprised of 32 zero bytes. 

```candid
type Account = { owner : principal; subaccount : opt blob };
```

### Default accounts

The account's textual representation coincides with the account owner's principal text encoding if the `subaccount` isn't set or equal to an array comprised of 32 zero bytes. 

```
Account.toText(record {
    owner = principal "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae";
    subaccount = null;
}) = "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae"
```

```
Account.toText(record {
    owner = principal "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae",
    subaccount = opt vec {0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0};
}) = "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae"
```

### Non-default accounts
An account with non-default subaccounts consists of the following parts:

```
<principal>-<checksum>.<compressed-subaccount>
```

- The textual encoding of the owner's principal (as described in the [IC interface specification](https://internetcomputer.org/docs/current/references/ic-interface-spec#textual-ids)).

- A dash character `-` that separates the principal from the checksum.

- The CRC-32 checksum, containing the concatenated bytes of the principal and the subaccount encoded in [Base 32 encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-6), without padding, and using lower-case letters.

- A period character `.` that separates the checksum from the subaccount.

- The hex-encoded bytes of the subaccount, with all leading '0' characters omitted. 

```
Account.toText({ owner; ?subaccount }) = {
  let checksum = bigEndianBytes(crc32(concatBytes(Principal.toBytes(owner), subaccount)));
  Principal.toText(owner) # '-' # base32LowerCaseNoPadding(checksum) # '.' # trimLeading('0', hex(subaccount))
}
```

In the following example, `dfxgiyy` is the checksum and `102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20` is the hex representation of the subaccount with stripped leading zeros:

```
Account.toText(record {
    owner = principal "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae",
    subaccount = opt vec {1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;25;26;27;28;29;30;31;32};
}) = "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae-dfxgiyy.102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"
```

### Examples

| Text | Result | Comment |
|:----:|:------:|:-------:|
| `k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae` | OK: `{ owner = "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae", subaccount = null }` | A valid principal is a valid account. |
| `k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae-q6bn32y.` | Error | The representation is not canonical: default subaccount should be omitted. |
| `k2t6j2nvnp4zjm3-25dtz6xhaac7boj5gayfoj3xs-i43lp-teztq-6ae` | Error | Invalid principal encoding. |
| `k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae-6cc627i.1` | OK: `{ owner = "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae", subaccount = opt blob "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\01" }` | |
| `k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae-6cc627i.01` | Error | The representation is not canonical: leading zeros are not allowed in subaccounts. |
| `k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae.1` | Error | Missing check sum. |
| `k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae-dfxgiyy.102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20` | OK: `{ owner = "k2t6j-2nvnp-4zjm3-25dtz-6xhaa-c7boj-5gayf-oj3xs-i43lp-teztq-6ae"; subaccount = opt blob "\01\02\03\04\05\06\07\08\09\0a\0b\0c\0d\0e\0f\10\11\12\13\14\15\16\17\18\19\1a\1b\1c\1d\1e\1f\20" }` | |

### Decoding

Applications **should** decode textual representation as follows:

- Decode the text as if it was a principal into `raw_bytes`, ignoring the principal length check (some decoders allow the principal to be at most 29 bytes long).
- If `raw_bytes` do not end with byte `7F`<sub>16</sub>, return an account with `raw_bytes` as the owner and an empty subaccount.
- If `raw_bytes` end with `7F`<sub>16</sub>:
     - **Step 1:** drop the last `7F`<sub>16</sub> byte.
     - **Step 2:** read the last byte `N` and drop it. If `N > 32` or `N = 0`, raise an error.
     - **Step 3:** take the last N bytes and strip them from the input.
        - If the first byte in the stripped sequence is zero, raise an error.
        - Prepend the bytes with (32 - N) zeros on the left to get a 32-byte subaccount.
     - **Step 4:** return an account with the owner being the rest of the input sequence as the owner and the subaccount being the byte array constructed in the previous step.

In pseudocode:

```sml
decodeAccount(text) = case Principal.fromText(text) of
  | (prefix · [n, 0x7f]) where Blob.size(prefix) < n ⇒ raise Error
  | (prefix · [n, 0x7f]) where n > 32 orelse n = 0 ⇒ raise Error
  | (prefix · suffix · [n, 0x7f]) where Blob.size(suffix) = n ⇒
    if suffix[0] = 0
    then raise Error
    else { owner = Principal.fromBlob(prefix); subaccount = Some(expand(suffix)) }
  | raw_bytes ⇒ { owner = Principal.fromBlob(raw_bytes); subaccount = None }

expand(bytes) = if Blob.size(bytes) < 32
                then expand(0x00 :: bytes)
                else bytes
```
