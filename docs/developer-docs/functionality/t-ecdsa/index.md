# Threshold ECDSA

The Internet Computer implements a novel threshold ECDSA protocol. In this protocol, the private ECDSA key is held in a secret-shared manner by multiple parties, namely the replicas of a threshold-ECDSA-enabled subnet on the IC, and signatures are computed using those secret shares without the private key ever being reconstructed. Each replica of such subnet holds a key share that provides no information about the key on its own. At least one third of the replicas are required to generate a threshold signature using their respective key shares.

Each canister on any subnet of the Internet Computer has control over a unique ECDSA key pair and can request signatures with the corresponding private key to be computed. A signature is only issued to the eligible canister, i.e., the legitimate holder of the ECDSA key. Each canister can obtain signatures only for its ECDSA keys. Note that canisters do not hold any private ECDSA keys or key shares themselves, but delegate this to specific threshold-ECDSA-enabled subnets of the IC. Threshold cryptography can help enable functionality in the trust model of a blockchain that would be impossible to achieve with conventional cryptography alone.

A threshold ECDSA implementation on a blockchain can be viewed as the on-chain pendant to a hardware security module (HSM) that stores private keys securely and issues signatures on request of the eligible entities, and only to those.

The availability of threshold ECDSA allows for a multitude of important use cases, as for example:
-   Canisters natively holding Bitcoin;
-   Integration with Ethereum, e.g., getting the ERC-20 tokens of Ethereum into the IC or signing Ethereum transactions;
-   Realizing a decentralized certification authority (CA), where certificates are issued using threshold ECDSA (this requires a different elliptic curve to the currently implemented curve `secp256k1`, namely `secp256r1`, for use cases such as integration with Bitcoin and Ethereum).
-   FIX: More use cases

## Learn more

## Build more