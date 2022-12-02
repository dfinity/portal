# Chain-Key Signatures — Threshold ECDSA

The Internet Computer implements a novel threshold ECDSA protocol as part of its chain-key signatures toolbox. In this protocol, the private ECDSA key is held in a secret-shared manner by multiple parties, namely the replicas of a threshold-ECDSA-enabled subnet on the IC, and signatures are computed using those secret shares without the private key ever being reconstructed. Each replica of such subnet holds a key share that provides no information about the key on its own. At least one third of the replicas are required to generate a threshold signature using their respective key shares. Besides the actual threshold signing protocol, chain-key ECDSA also comprises protocols for secure key distributed key generation and periodic key resharing, which are crucial parts of the protocol. This makes chain-key ECDSA signatures much more powerful than any off-the-shelf threshold ECDSA protocol.

Each canister on any subnet of the Internet Computer has control over a unique ECDSA key pair and can request signatures with the corresponding private key to be computed. A signature is only issued to the eligible canister, i.e., the legitimate holder of the ECDSA key. Each canister can obtain signatures only for its ECDSA keys. Note that canisters do not hold any private ECDSA keys or key shares themselves, but delegate this to specific threshold-ECDSA-enabled subnets of the IC. Threshold cryptography can help enable functionality in the trust model of a blockchain that would be impossible to achieve with conventional cryptography alone.

A threshold ECDSA implementation on a blockchain can be viewed as the on-chain pendant to a hardware security module (HSM) that stores private keys securely and issues signatures on request of the eligible entities, and only to those.

The availability of threshold ECDSA allows for a multitude of important use cases, as for example:
-   Canisters natively holding Bitcoin;
-   Integration with Ethereum, e.g., getting the ERC-20 tokens of Ethereum into the IC or signing Ethereum transactions;
-   Integrations with other blockchains that use ECDSA as signature scheme for signing transactions;
-   Realizing a decentralized certification authority (CA), where certificates are issued using threshold ECDSA (this requires a different elliptic curve to the currently implemented curve `secp256k1`, namely `secp256r1`).

Those are only a few examples for use cases of our threshold ECDSA protocol. Creative engineers and entrepreneurs will likely come up with a large number of further exciting use cases.

## Learn More
If you want to learn more about chain-key ECDSA signatures, check the [how it works](./t-ecdsa-how-it-works.md) page to see more. If you want to take an even deeper dive see Groth and Shoup's [Eurocrypt 2022 paper](https://eprint.iacr.org/2021/1330).

## Build More
Sample code for `threshold-ecdsa` is provided in the [examples repository](https://github.com/dfinity/examples), under either [`motoko`](https://github.com/dfinity/examples/tree/master/motoko/threshold-ecdsa) or [`rust`](https://github.com/dfinity/examples/tree/master/rust/threshold-ecdsa) sub-directories. You can find the corresponding code-walkthrough in the [samples documentation](../../../samples/t-ecdsa-sample.md)