# The Ledger canister {#_the_ledger_canister}

This document is a specification of the public interface of the Ledger Canister. It provides an overview of the functionality, details some internal aspects, and documents publicly available methods. We also provide an abstract mathematical model which makes precise the expected behavior of the methods implemented by the canister, albeit at a somewhat high level of abstraction.

:::note
Parts of the canister interface are for internal consumption only, and therefore not part of this specification. However, whenever relevant, we do provide some insights into those aspects as well.
:::

## Overview & terminology {#_overview_terminology}

In brief, the Ledger canister maintains a set of accounts owned by IC principals; each account has associated a Tokens balance. Account owners can initiate the transfer of tokens from the accounts they control to any other ledger account. All transfer operations are recorded on an append-only transaction ledger. The interface of the Ledger canister also allows minting and burning of tokens, which are additional transactions which are recorded on the transaction ledger.

### Tokens {#_tokens}

There can be multiple utility Tokens in the IC at once. The utility Tokens used by the IC Governance is the Internet Computer Protocol tokens (ICP). The smallest indivisible unit of Tokens are \"e8\"s: one e8 is 10^-8^ Tokens.

### Accounts {#_accounts}

The Ledger canister keeps track of accounts:

-   Every account belongs to (and is controlled by) an IC principal

-   Each account has precisely one owner (i.e. no "joint accounts")

-   A principal may control more than one account. We distinguish between the different accounts of the same principal via a (32-byte string) subaccount identifier. So, logically, each ledger account corresponds to a pair `(account_owner, subaccount_identifier)`.

-   The account identifier corresponding to such a pair is a 32-byte string calculated as follows:

    account_identifier(principal,subaccount_identifier) = CRC32(h) || h

    where

    h = sha224(“\x0Aaccount-id” || principal || subaccount_identifier)

So, there are two steps to obtain the account corresponding to a principal and a subaccount identifier:

-   first hash using SHA224 the concatenation of domain separator `\x0Aaccount-id`, the principal and the subaccount identifier. Here, the domain separator consists of a string (here \"account-id\") prepended by a single byte equal to the length of the string (here, \\x0A).

-   then, prepend with the (big endian representation of the) CRC32 of the resulting hash value.

#### Default account {#_default_account}

For any principal, we refer to the account which corresponds to the all-0 subaccount identifier as the default account of that principal. The default account of the Governance canister plays an important role in minting/burning tokens (see below), and we refer to it as the `minting_account_id`.

### Operations, transactions, blocks , transaction ledger {#_operations_transactions_blocks_transaction_ledger}

Account balances change as the result of one of three operations: sending tokens from one account to another, minting tokens to an account and burning tokens from an account. Each operation is triggered by a call to the Ledger canister and is recorded as a transaction: in addition to the details of the operation a transaction includes a user supplied Memo field (a 64 bit number), and a system supplied timestamp indicating the time at which the transaction was created.

Each transaction is included in a block (there is only one transaction per block) and blocks are \"chained\" by including in each block the hash of the previous block (details of how blocks are serialized are below). The position of a block in the ledger is called the block index (or block height); counting starting from 0.

The types used to represent these concepts are specified below in Candid syntax.

Basic datatypes:   


    type Tokens = record {
         e8s : nat64;
    };



    // Account identifier  is a 32-byte array.
    // The first 4 bytes is big-endian encoding of a CRC32 checksum of the last 28 bytes
    type AccountIdentifier = blob;


    //There are three types of operations: minting tokens, burning tokens & transferring tokens
    type Transfer = variant {
        Mint: record {
            to: AccountIdentifier;
            amount: Tokens;
        };
        Burn: record {
             from: AccountIdentifier;
             amount: Tokens;
       };
        Send: record {
            from: AccountIdentifier;
            to: AccountIdentifier;
            amount: Tokens;
        };
    };

    type Memo = u64;

    // Timestamps are represented as nanoseconds from the UNIX epoch in UTC timezone
    type TimeStamp = record {
        timestamp_nanos: nat64;
    };

    Transaction = record {
        transfer: Transfer;
        memo: Memo;
        created_at_time: Timestamp;
    };

    Block = record {
        parent_hash: Hash;
        transaction: Transaction;
        timestamp: Timestamp;
    };

    type BlockIndex = nat64;

    //The ledger is a list of blocks
    type Ledger = vec Block

## Methods {#_methods}

The Ledger canister implements methods to:

-   transfer ICP from one account to another

-   get the balance of a ledger account

### Transferring tokens {#_transferring_tokens}

The owner of an account can transfer Tokens from that account to any other account using the `transfer` method. The inputs to the method are as follows:

-   `amount`: the amount of tokens to be transferred

-   `fee`: the fee to be paid for the transfer

-   `from_subaccount`: a subaccount identifier which specifies from which account of the caller the ICP should take place. This parameter is optional --- if it is not specified by the caller, then it is set to the all 0 vector.

-   `to`: the account identifier to which the tokens should be transferred

-   `memo`: this is a 64-bit number chosen by the sender; it can be used in various ways, e.g. to identify specific transfers.

-   `created_at_time`: a timestamp indicating when the transaction was created by the caller --- if it is not specified by the caller then this is set to the current IC time.

The Ledger canister executes a `transfer` call as follows:

-   checks that the destination is a well-formed account identifier

-   checks that the transaction is recent enough (has been created within the last 24 hours) and is not \"in the future\" (that is, it checks that `created_at_time` is not in the future by more than an allowed time drift, specified by a parameter in the IC, currently set at 60 seconds)

-   calculates the source account (using the calling principal and `from_subaccount`) and checks that it holds more than amount+fee ICP

-   checks that `fee` matches the `standard_fee` (currently, the standard fee is a fixed constant set to be 10^-4^ ICP, see below for an exception)

-   checks that an identical transaction has not been submitted in the last 24 hours

-   if any of the checks fails, it returns an appropriate error

-   otherwise it

    -   substracts amount+fee from the source account

    -   adds amount to the destination account

    -   adds transaction `(Transfer(from, to, amount, fee), memo, created_at_time)` to the ledger:

        -   it creates a block, containing the transaction, sets the `parent_hash` in the block to be `last_hash` (essentially, the hash of the last block in the ledger), and `timestamp` in the block to be the system timestamp;

        -   it calculates `last_hash` as the hash of the encoding of the block newly created (see below for how the encoding is calculated);

        -   it appends the block to the ledger and returns its height.

### Chaining ledger blocks {#_chaining_ledger_blocks}

As explained above, the blocks contained in the ledger are chained (by including in a block the hash of the previous block). This enables authenticating the entire ledger by only signing its last block.

In this section we describe the details of the chaining, by specifying how a block is serialized before it is hashed.

At a high level, the block is serialized using protobuf. However, since protobuf encodings are not necessarily deterministic (and are also not guaranteed to stay fixed) here we provide the specific encoding used, which is guaranteed not to change.

The definition below is recursive. It uses `.` to denote concatenation of byte strings, and two functions that are not defined here, but are well established: we write `len(x)` for the length of bytestring `x`. We also write `varint(s)`, for the variable length encoding of integer `s`. The precise definition of this function can be found in the [protobuf documentation](https://developers.google.com/protocol-buffers/docs/encoding#varints).

    encoded_block(Block{parent_hash, timestamp, transaction}) :=
        let encoded_transaction = encode_transaction(transaction)
        in encode_hash(parent_hash) .
           12 0a 08 . varint(timestamp) .
           1a . len(encoded_transaction) . encoded_transaction

    encode_hash(Nil) := Nil
    encode_hash(hash) := 0a 22 0a 20 . hash

    encode_transaction(Transaction{operation, memo, created_at_time}) :=
        let encoded_operation = encode_operation(operation)
            encoded_memo = encode_memo(memo)
            encoded_timestamp = encode_timestamp(created_at_time)
        in encoded_operation .
           22 . len(encoded_memo) . encoded_memo .
           32 . len(encoded_timestamp) . encoded_timestamp

    encode_memo(Nil) := Nil
    encode_memo(Memo{memo}) := 08 . varint(memo)

    encode_timestamp(Timestamp{timestamp_nanos}) := 08. varint(timestamp_nanos)

    encode_operation(Burn{AccountIdentifier{from}, Tokens{amount}}) :=
        // identifiers can be 28 or 32 bytes (4 bytes checksum + 28 bytes hash)
        let encoded_account_identifier = 0a . len(from) . varint(from)
            encoded_amount = 08 . varint(amount)
            encoded_burn = 0a . len(encoded_account_identifier) . encoded_account_identifier .
                           1a . len(encoded_amount) . encoded_amount
        in 0a . len(encoded_burn) . encoded_burn

    encode_operation(Mint{AccountIdentifier{to}, Tokens{amount}}) :=
        // identifiers can be 28 or 32 bytes (4 bytes checksum + 28 bytes hash)
        let encoded_account_identifier = 0a . len(to) . to
            encoded_amount = 08 . varint(amount)
            encoded_mint = 12 . len(encoded_account_identifier) . encoded_account_identifier .
                           1a . len(encoded_amount) . encoded_amount
        in 12 . len(encoded_mint) . encoded_mint

    encode_operation(Transfer{AccountIdentifier{from},
                               AccountIdentifier{to},
                               Tokens{amount},
                               Tokens{fee}}) :=
        let encoded_from = 0a . len(from) . from
            encoded_to = 0a . len(to) . to
            encoded_amount = 08 . varint(amount)
            encoded_fee = 08 . varint(fee)
            encoded_transfer = 0a . len(encoded_from) . encoded_from .
                               12 . len(encoded_to) . encoded_to .
                               1a . len(encoded_amount) . encoded_amount .
                               22 . len(encoded_fee) . encoded_fee
        in 1a . len(encoded_transfer) . encoded_transfer

### Burning and minting Tokens {#_burning_and_minting_tokens}

Typical transfers move ICP from one account to another. An important exception is when either the source or the destination of a transfer is the special `minting_account_id`.

#### Burning tokens {#_burning_tokens}

The effect of a transfer to the minting account is that the tokens are simply removed from the source account and not deposited anywhere; the tokens are burned. Burn transactions are recorded on the ledger as `(Burn(from,amount))`, where `from` is the account from which the tokens are burned. The transaction fee for a burn transfer is 0 (so, this must by the fee explicitly specified in the call), but the amount of tokens to be burned must exceed the `standard_fee` for transfers.

#### Minting tokens {#_minting_tokens}

The effect of a transfer from the `minting_account_id` account is that tokens are simply added to the destination account; the tokens are minted. When invoked, the transaction `(Mint(to,amount))` is added to the transaction ledger. Notice that the `minting_account_id` is controlled by the Governance canister which makes minting tokens a privileged operation only available to this canister.

### Candid interface {#_candid_interface}

The Candid signature of the `transfer` method, together with some additional required datatypes is below.

Additional datatypes & canister methods:   

    // Arguments for the `transfer` call.
    type TransferArgs = record {
        // Transaction memo.
        // See comments for the `Memo` type.
        memo: Memo;
        // The amount that the caller wants to transfer to the destination address.
        amount: Tokens;
        // The amount that the caller pays for the transaction.
        // Must be 10000 e8s.
        fee: Tokens;
        // The subaccount from which the caller wants to transfer funds.
        // If null, the ledger uses the default (all zeros) subaccount to compute the source address.
        // See comments for the `SubAccount` type.
        from_subaccount: opt SubAccount;
        // The destination account.
        // If the transfer is successful, the balance of this address increases by `amount`.
        to: AccountIdentifier;
        // The point in time when the caller created this request.
        // If null, the ledger uses current IC time as the timestamp.
        created_at_time: opt TimeStamp;
    };

    type TransferError = variant {
        // The fee that the caller specified in the transfer request was not the one that ledger expects.
        // The caller can change the transfer fee to the `expected_fee` and retry the request.
        BadFee : record { expected_fee : Tokens; };
        // The account specified by the caller doesn't have enough funds.
        InsufficientFunds : record { balance: Tokens; };
        // The request is too old.
        // The ledger only accepts requests created within 24 hours window.
        // This is a non-recoverable error.
        TxTooOld : record { allowed_window_nanos: nat64 };
        // The caller specified `created_at_time` that is too far in future.
        // The caller can retry the request later.
        TxCreatedInFuture : null;
        // The ledger has already executed the request.
        // `duplicate_of` field is equal to the index of the block containing the original transaction.
        TxDuplicate : record { duplicate_of: BlockIndex; }
    };

    type TransferResult = variant {
        Ok : BlockIndex;
        Err : TransferError;
    };


    service : {
      transfer : (TransferArgs) -> (TransferResult);
    }

### Getting ledger blocks {#_getting_ledger_blocks}

For scalability, the ledger canister does not store the entire transaction ledger. Instead, the ledger canister holds a suffix of the ledger, consisting of the most recent blocks; all the remaining blocks are stored in archive canisters.

Ledger blocks can be obtained using method `query_blocks` which allows one to retrieve (a specified range of) blocks from the ledger. The reply consists of the list of blocks (still present in the ledger canister) together with information on how to retrieve the remaining blocks from the archive canister.

The method also returns two additional pieces of information: the index of the last block in the transaction ledger and a certificate. The certificate is a signature, produced by the Internet Computer, on the hash of the last block of the transaction ledger. Since the blocks in the transaction ledger are chained (so the hash of the last block commits to the entire transaction ledger), the certificate can be used to verify that the transaction ledger is genuine. Importantly, the certificate is only available if the method is invoked as an **unreplicated** query call; if the method is invoked as a replicated call then no certificate is included in the reply (since state certification is not available to the replicated execution).

In more details, the input to the `query_blocks` method consists of:

-   an index `from` indicating the first block in the range to be retrieved and

-   a length `len`, indicating how many blocks should be returned.

The reply consists of:

-   `length`: the length of the entire transaction ledger at the time when the call was executed

-   `certificate`: an optional certificate. This is a signature of the IC on the hash of the last block in the ledger --- the certificate is only returned if the method is invoked as an unreplicated query call.

-   `blocks`: a (potentially partial) list of the requested blocks. The range of blocks returned is restricted because a) some blocks may be already stored in an archive and b) the number of blocks that can be returned in a single call is bounded. Specifically, the ledger canister will return the prefix of the requested range of blocks present in the ledger that fits within the size of replies. Currently, the size of replies is limited to 2000 blocks.

-   `start_index`: the index of the first block in the list returned; this is the index of the first block that is stored in the ledger canister.

-   `archived_blocks`: information about the location of archived blocks; for each archiving canister, the information specifies the range of blocks that are archived (starting block index, and length of stored chain) together with information regarding the identity of the canister (and the method to invoke).

For example, assume that at some point blocks forming the ledger are stored in `n` canisters with canister `i` storing the range of blocks `(li,ri)`. The ledger canister itself stores range `(l~,r~)`. Calling `query_blocks` with input parameter `(l,len)` returns:

-   `length` is `rn+1`

-   `blocks` is `(l,l+len) ∩ (ln,rn)` restricted to the first 2000 blocks

-   `start_index` is `l`

-   `archived_blocks` consists of the list `((li,ri) ∩ (l,l+len),callbacki)i=1..n-1` where `callbacki` is the callback to invoke to retrieve the corresponding blocks

        type GetBlocksArgs = record {
            // The index of the first block to fetch.
            start : BlockIndex;
            // Max number of blocks to fetch.
            length : nat64;
        };

        / A prefix of the block range specified in the [GetBlocksArgs] request.
        type BlockRange = record {
            // A prefix of the requested block range.
            // The index of the first block is equal to [GetBlocksArgs.from].
            //
            // Note that the number of blocks might be less than the requested
            // [GetBlocksArgs.len] for various reasons, for example:
            //
            // 1. The query might have hit the replica with an outdated state
            //    that doesn't have the full block range yet.
            // 2. The requested range is too large to fit into a single reply.
            //
            // NOTE: the list of blocks can be empty if:
            // 1. [GetBlocksArgs.len] was zero.
            // 2. [GetBlocksArgs.from] was larger than the last block known to the canister.
            blocks : vec Block;
        };

        // A function that is used for fetching archived ledger blocks.
        type QueryArchiveFn = func (GetBlocksArgs) -> (QueryArchiveResult) query;

        // The result of a "query_blocks" call.
        //
        // The structure of the result is somewhat complicated because the main ledger canister might
        // not have all the blocks that the caller requested: One or more "archive" canisters might
        // store some of the requested blocks.
        //
        // Note: as of Q4 2021 when this interface is authored, the IC doesn't support making nested
        // query calls within a query call.
        type QueryBlocksResponse = record {
            // The total number of blocks in the chain.
            // If the chain length is positive, the index of the last block is `chain_len - 1`.
            chain_length : nat64;

            // System certificate for the hash of the latest block in the chain.
            // Only present if `query_blocks` is called in a non-replicated query context.
            certificate : opt blob;

            // List of blocks that were available in the ledger when it processed the call.
            //
            // The blocks form a contiguous range, with the first block having index
            // [first_block_index] (see below), and the last block having index
            // [first_block_index] + len(blocks) - 1.
            //
            // The block range can be an arbitrary sub-range of the originally requested range.
            blocks : vec Block;

            // The index of the first block in "blocks".
            // If the blocks vector is empty, the exact value of this field is not specified.
            first_block_index : BlockIndex;

            // Encoding of instructions for fetching archived blocks whose indices fall into the
            // requested range.
            //
            // For each entry `e` in [archived_blocks], `[e.from, e.from + len)` is a sub-range
            // of the originally requested block range.
            archived_blocks : vec record {
                // The index of the first archived block that can be fetched using the callback.
                start : BlockIndex;

                // The number of blocks that can be fetched using the callback.
                length : nat64;

                // The function that should be called to fetch the archived blocks.
                // The range of the blocks accessible using this function is given by [from]
                // and [len] fields above.
                callback : QueryArchiveFn;
            };
        };

        type Archive = record {
            canister_id: principal;
        };

        type Archives = record {
            archives: vec Archive;
        };

        service : {
        // Queries blocks in the specified range.
        query_blocks : (GetBlocksArgs) -> (QueryBlocksResponse) query;

        // Returns the existing archive canisters information.
        archives : () -> (Archives) query;

        }

### Balance {#_balance}

A transaction ledger tracks the balances of all accounts in the natural way (see the Semantics section below for a more formal definition).

Any principal can obtain the balance of an arbitrary account via the method `account_balance`: the input parameter is the account identifier; the result is the balance associated to the account. The balance of the account with account identifier `minting_account_id` is always 0; the balance of any other account is calculated in the obvious way.

    type AccountBalanceArgs = record {
        account: AccountIdentifier;
    };

    service : {
      // Get the amount of ICP on the specified account.
      account_balance : (AccountBalanceArgs) -> (Tokens) query;
    }

## Semantics {#_semantics}

In this section we provide a semantics of the public methods exposed by the ledger. We use somewhat ad-hoc mathematical notation which we keep close to the notation introduced above. We use \" · \" to denote list concatenation. If L is a list then we write \|L\| for the length of a list L and L\[i\] for the i'th element of L. The first element of L is L\[0\].

### Basic types {#_basic_types}

    Operation =
      Transfer = {
        from: AccountIdentifier;
        to: AccountIdentifier;
        amount: Tokens;
        fee: Tokens;
      } |
      Mint = {
        to: AccountIdentifier;
        amount: Tokens;
      } |
      Burn = {
        from: AccountIdentifier;
        amount: Tokens;
      }
    }

    Block = {
       operation: Operation;
       memo: Memo;
       created_at_time: Timestamp;
       hash: Hash;
      }

    Ledger = List(Block)

### Ledger State {#_ledger_state}

The state of the Ledger canister comprises:

-   the transaction ledger (a chained list of blocks containing transactions);

-   global variables:

    -   `last_hash`: an optional variable which records the hash of the last block in the ledger; it is set to None if no block is present in the ledger.

    -   last_archived_block: Nat;

-   location: Nat ↦ Nat;

-   last_archive: Nat;

    State = {
      ledger: Ledger;
      last_hash: Hash | None;
    };

Initially, the ledger is set to the empty list and `last_hash` is set to None:

     {
       ledger = [];
       last_hash = None;
       (forall i) S.location(i) = undefined;
       S.last_archive = 0;
       S.last_archived_block = -1;
    }

### Balances {#_balances}

Given a transaction ledger, we define the `balance` function which associates to a ledger account its ICP balance.

    balance: Ledger x AccountIdentifier -> Nat

The function is defined, recursively, as follows:

    balance([],account_id) = 0

    if (B = Block{Transfer{from,to,amount, fee}, memo, time, hash}) and (to = account_id)) |
       (B = Block{Mint{to, amount}, memo, time}) and (to = account_id)) then
       then
       balance(OlderBlocks · [B] , account_id) = balance(OlderBlocks, account_id) + amount,

    if (B = Block{Transfer{from,to,amount,fee},memo,time}} and (from = account_id)
        then
        balance(OlderBlocks · [B], account_id) = balance(OlderBlocks,account_id) - (amount+fee)

    if (B = Block{Burn{from,amount}) and (from = account_id)
       then
       balance(OlderBlocks · [B], account_id) = balance(OlderBlocks,account_id) - amount

    otherwise
      balance(OlderBlocks · [B], account_id) = balance(OlderBlocks, account_id)

We describe the semantics of ledger methods as a function which takes as input a ledger state, the call arguments and returns a (potentially) new state and a reply. In the description of the function we use some additional functions which reflect system provided information. These include `caller()` which returns the principal who invoked the method, `now()` which return the IC time and `drift` a constant indicating permissible time drift between IC and external time. We also write `well_formed(.)` for a boolean valued function which checks that its input is a well-formed account identifier (i.e. the first four bytes are equal to CRC32 of the remaining 28 bytes).

### Ledger Method: `transfer` {#_ledger_method_transfer}

Below we write `default_subaccount` for the all-0 vector.

State & arguments:   

    S
    A = {
      memo: Memo;
      amount: Tokens;
      fee: Tokens;
      from_subaccount: opt SubAccount;
      to: AccountIdentifier;
      created_at_time: opt TimeStamp;
      }

Resulting state & reply:   

    output (S',R) calculated as follows:

    if created_at_time = None then created_at_time = now();
    if timestamp > now() + drift then (S',R) = (S, Err);
    if now() - timestamp > 24h then (S',R) = (S, Err);
    if not(well_formed(to)) then (S',R) = (S, Err);

    if to = `minting_account_id` and (fee ≠ 0 or amount < standard_fee) then (S',R) = (S, Err);

    if from_subaccount = None then from_subaccount = default_subaccount;
    from = account_identifier(caller(),from_subaccount)

     if from = `minting_account_id' then B = Block{Mint{to, amount}, memo, timestamp, S.last_hash}
          else
            if to = `minting_account_id` then B = Block{Burn{from, amount}, memo, timestamp, S.last_hash}
                else B = Block{Transfer{from, to, amount, fee}, memo, timestamp, S.last_hash};
      if exists i (ledger[i].operation, ledger[i].memo, ledger[i].timestamp) = (B.operation,B.memo,B.timestamp) then (S',R)=(S,Err)
      else
        (S'.ledger = [B] · S.ledger);
        (S'.lasthash = hash(B));
         R = |S'.ledger|-1;

### Ledger Method: `balance_of` {#_ledger_method_balance_of}

State & arguments:   

    S
    A = {
        account_id: AccountIdentifier
    }

Resulting state & reply:   

    output (S',R) calculated as follows

    S' = S
    if account_id = `minting_account_id`
       then R = 0
       else R = balance(S.ledger,account_id))

### Archiving {#_archiving}

The Ledger canister periodically archives part of the blocks it holds. In the implementation, the logic is internal to the system. In this abstraction, we model this via two transitions which can be non-deterministically triggered: one to create new archive canisters, and another to archive some blocks held in the ledger canister.

#### Ledger Method: `new_archive` {#_ledger_method_new_archive}

The first transition creates a new archive canister.

State & arguments:   

    S

Resulting state & reply:   

    (S', R) calculated as follows

    S'.last_archive = S.last_archive+1
    R = ()

#### Ledger Method: `archive` {#_ledger_method_archive}

The second, changes the location of up to `len` many blocks to the archive canister which last created.

State & arguments:   

    S
    A = {
       len: Nat
    }

Resulting state & reply:   

    (S', R) calculated as follows

    S'.location = S.location
    to_archive = min(len, |S.ledger|- S.last_archived_block+1)
    for i = 1 to to_archive
       S'.location(last_archived_block+i) = S'.last_archive
    S'.last_archived_block = S.last_archived_block + to_archive

    R = ()

#### Ledger Method: `query_blocks` {#_ledger_method_query_blocks}

Given a list of blocks `L=(B0,B1,…​,Bn)` we write `Blocks(index,len)` for the list of blocks `(Bindex, Bindex+1,…​,Bindex+len)`. We also write `Restrict(L,len)` for the restriction of list `L` to the first `len` blocks, i.e. `(B0,B1,…​,Blen-1)`. The description below assumes an unspecified constant, `bound` which specifies an upperbound on the number of blocks the Ledger canister can return in response to `query_blocks`. The description also assumes the existence of a `certificate` --- a signature by the IC on the (encoding) of the last block in the ledger. However, at this level of abstraction we do not specify its properties of this certificate. We also do not go into the details of how the location of the different blocks is concretely provided.

State & arguments:   

    S
    A = {
       index: Nat;
       len: Nat;
    }

Resulting state & reply:   

    (S',R) calculated as follows

    S'=S

    local_blocks = Blocks(S.last_archived_block+1,|S.ledger|-S.last_archived_block+1)
    R = {
       length = |S.ledger|,
       cert = certificate,
       start_index = S.last_archived_block+1,
       blocks = Restrict(Blocks(index,len) ∩ local_blocks, bound),
       location = S.location
    }
