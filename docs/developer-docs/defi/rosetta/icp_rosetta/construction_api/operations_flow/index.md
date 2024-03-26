# Flow of Operations
This section will give you an overview of how the flow of operations in the Construction-API works. It will guide you through each of the necessary endpoints that you will have to call in order to post a valid transaction with your signature to the ICP ledger. As an example of such a transacton this guide will use a simple transfer between accounts. 
It is recommended to first read through the interactions of each endpoint to acquire an understanding of how the flow of operations works. Although the example of transferring tokens is only one use case of the Construction-API of Rosetta it serves as a good example on what to expect from the interaction with the Construction-API. The other functionalities that are supported by ICP Rosetta through the Construction-API follow the same or very similar flow of operations.
Further features of Rosetta that utilize the Construction-API can be conducted in a similar manner.
For this guide we are going to assume that you have a rosetta instance running at the URL: `http://127.0.0.1:8081`.

## Key generating
For the purpose of this guide we need to have a private key available with which we can sign messages. 

:::info
The Rosetta architecture is built so that no private keys are ever sent to Rosetta. All the signing and thus handling of private keys can be done offline. 
:::

Rosetta supports multiple types of keys. The two that are used most often are `Edwards2559` and `Secp256k1`. If you want to use Rosetta together with dfx you will be using `ECDSA` keys with an `Secp256k1` curve type. For a guide on how to create a new identity you can look at the relevant dfx [section](/docs/developer-docs/developer-tools/cli-tools/cli-reference/dfx-identity.md). 
For this guide we will be using the `identity.pem` that is created with `dfx identity new`. 
An example implementation of loading an `identity.pem` file and creating a private key struct than can be used to sign bytes looks like this. 

```python
import ecdsa

with open("./identity.pem", "rb") as key_file:
    private_key = ecdsa.SigningKey.from_pem(key_file.read())

```

## Construction-API Endpoints
This document will showcase how the flow of operations through the Construction-API works and how to interact with the corresponding endpoints of Rosetta.
See [construction API overview](https://www.rosetta-api.org/docs/construction_api_introduction.html) for a high-level overview of the transaction flow. This guide will provide code snippets for interacting with Rosetta through regular `curl` commands as well as providing you with a Rosetta-Client example implementation in python. Feel free to use these code snippets as a starting point to write your own Rosetta-Client in whatever language you are using. 
The endpoints that make up the flow of operations are the following:
- [construction/derive](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/derive.mdx): Derive an AccountIdentifier from your public key
- [construction/preprocess](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/preprocess.mdx): Fetch transaction specific parameters to call the `construction/metadata` endpoint with. 
- [construction/metadata](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/metadata.mdx): Fetch transaction specific metadata from the ICP ledger. 
- [construction/payloads](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/payloads.mdx): Fetch signable payloads for the requested set of operations. 
- [construction/combine](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/combine.mdx): Combine Signatures and an unsigned transaction into a signed transaction. 
- [construction/combine](/docs/developer-docs/defi/rosetta/icp_rosetta/construction_api/operations_flow/submit.mdx): Send signed transactions to the ICP Ledger canister. 