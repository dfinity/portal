# Regular token transfers

## Overview

This document details how to transfer ICP using the Rosetta construction API. See [construction API overview](https://www.rosetta-api.org/docs/construction_api_introduction.html) for a high-level overview of the transaction flow.

## Transfer operations

A transaction that transfers amount `T` from address `A` to address `B` must contain three operations:

-   An operation of type `TRANSACTION` applied to address `A` with the amount of `-T`.

-   An operation of type `TRANSACTION` applied to address `B` with the amount of `T`.

-   An operation of type `FEE` applied to address `A` with the amount suggested by the `/construction/metadata` endpoint (see `suggested_fee` field of the [ConstructionMetadataResponse](https://www.rosetta-api.org/docs/models/ConstructionMetadataResponse.html) type).

The order of operations within a transaction is irrelevant.

Multiple transfers within a single transaction are not allowed. The outcome of such a transaction is unspecified.

## Prerequisites

-   [x] Address `A` holds at least `T` + `suggested_fee` ICP.

-   [x] Address `A` is a subaccount of the principal derived from the public key that you use to sign the transaction.

-   [x] The amount specified in the `FEE` operation is equal in absolute value to `suggested_fee`.

### Optional metadata fields

Rosetta node recognizes the following optional metadata fields in [ConstructionPayloadRequest](https://www.rosetta-api.org/docs/models/ConstructionPayloadsRequest.html):

-   `memo` is an arbitrary 64-bit unsigned integer associated with the transaction. You can use it to associate your data with the transaction. For example, you can set the memo to a row key in a database. Valid values for the `memo` field range from `0` to `2^64^ - 1` (`18446744073709551615`).

-   `ingress_start`, `ingress_end`, and `created_at_time` are 64-bit unsigned integers representing the number of nanoseconds passed from UNIX epoch in UTC timezone. You can use these fields to construct and sign a transaction in advance and submit the signed transaction later. You can submit a signed transaction within 24 hours starting from `created_at_time` (by default equal to the time when you invoke the `/construction/payloads` endpoint).

### Example

Below is an example of a transaction that transfers 1 ICP from address `bdc4ee05d42cd0669786899f256c8fd7217fa71177bd1fa7b9534f568680a938` to address `b64ec6f964d8597afa06d4209dbce2b2df9fe722e86aeda2351bd95500cf15f8`.

``` json
{
  "network_identifier": {
    "blockchain": "Internet Computer",
    "network": "00000000000000020101"
  },
  "operations": [
    {
      "operation_identifier": {
        "index": 0
      },
      "type": "TRANSACTION",
      "account": {
        "address": "bdc4ee05d42cd0669786899f256c8fd7217fa71177bd1fa7b9534f568680a938"
      },
      "amount": {
        "value": "-100000000",
        "currency": {
          "symbol": "ICP",
          "decimals": 8
        }
      }
    },
    {
      "operation_identifier": {
        "index": 1
      },
      "type": "TRANSACTION",
      "account": {
        "address": "b64ec6f964d8597afa06d4209dbce2b2df9fe722e86aeda2351bd95500cf15f8"
      },
      "amount": {
        "value": "100000000",
        "currency": {
          "symbol": "ICP",
          "decimals": 8
        }
      }
    },
    {
      "operation_identifier": {
        "index": 2
      },
      "type": "FEE",
      "account": {
        "address": "bdc4ee05d42cd0669786899f256c8fd7217fa71177bd1fa7b9534f568680a938"
      },
      "amount": {
        "value": "-10000",
        "currency": {
          "symbol": "ICP",
          "decimals": 8
        }
      }
    }
  ],
  "public_keys": [
    {
      "hex_bytes": "97d0b490ec4097b3653878274b1d9dd00bb1316ea3df0bfdf98327ef68fade63",
      "curve_type": "edwards25519"
    }
  ]
}
```

### Response

``` json
{
  "transaction_identifier": {
    "hash": "97f4a8289f96ef46d8c8fa911f13cc402e4f69b36f4dd1ddc2579bb54dba5557"
  },
  "block_index": 1043
}
```
