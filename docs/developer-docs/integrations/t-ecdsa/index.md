# Threshold ECDSA: chain-key signatures
## Overview
The Internet Computer implements a novel threshold ECDSA protocol as part of its chain-key signatures suite. In this protocol, the private ECDSA key exists only as secret shares held by designated parties, namely the replicas of a threshold-ECDSA-enabled subnet on ICP. Signatures are computed using those secret shares without the private key ever being reconstructed. Each replica of such subnet holds a key share that provides no information on its own. At least one third of the replicas are required to generate a threshold signature using their respective key shares. 

Besides the actual threshold signing protocol, chain-key ECDSA also comprises of protocols for secure key distributed key generation and periodic key resharing. This makes chain-key ECDSA signatures much more powerful than any off-the-shelf threshold ECDSA protocol.

Each canister on a subnet has control over a unique ECDSA public key and can request signatures for this public key. A signature is only issued to the eligible canister. Each canister can only obtain signatures for its own ECDSA keys. 

:::caution
Canisters do not hold any private ECDSA keys or key shares themselves. Threshold cryptography can help enable functionality in the trust model of a blockchain that would be impossible to achieve with conventional cryptography alone.
:::

The threshold ECDSA implementation on ICP can be viewed as the on-chain counterpart to a hardware security module (HSM) that stores private keys securely and issues signatures on request of the eligible entities.

The availability of threshold ECDSA allows for a multitude of important use cases:
-   Canisters natively holding bitcoin.

-   Integration with Ethereum and other EVM chains, such as getting ERC-20 tokens onto ICP and signing Ethereum transactions.

-   Integrations with other blockchains that use ECDSA as signature scheme for signing transactions.

-   Realizing a decentralized certification authority (CA), where certificates are issued using threshold ECDSA.


## Signing transactions

Threshold ECDSA can be used by making calls to the Threshold ECDSA API. 

[Learn how to use Threshold ECDSA to sign transactions](./signing-transactions.md).

## Resources
- [Chain-key ECDSA signatures: technology overview](./t-ecdsa-how-it-works.md).

- [Eurocrypt 2022 paper](https://eprint.iacr.org/2021/1330).

- [Sample code for `threshold-ecdsa`](https://github.com/dfinity/examples/tree/master/motoko/threshold-ecdsa).

