# Signatures FAQ

## Does ICP support ECDSA signatures?

Yes, the Internet Computer (ICP) does support ECDSA signatures. It implements a novel threshold ECDSA protocol as part of its chain-key signatures toolbox. In this protocol, the private ECDSA key exists only as secret shares held by designated parties, namely the replicas of a threshold-ECDSA-enabled subnet on ICP. Signatures are computed using those secret shares without the private key ever being reconstructed. Each replica of such subnet holds a key share that provides no information on its own. At least one third of the replicas are required to generate a threshold signature using their respective key shares.

The threshold ECDSA protocol on ICP also includes protocols for secure distributed key generation and periodic key resharing, which are crucial parts of the protocol. This makes chain-key ECDSA signatures much more powerful than any off-the-shelf threshold ECDSA protocol.

Each canister on any subnet of the Internet Computer has control over a unique ECDSA public key and can request signatures for this public key to be computed. A signature is only issued to the eligible canister, i.e., the legitimate holder of this ECDSA key. Each canister can obtain signatures only for its own ECDSA keys. Note that canisters do not hold any private ECDSA keys or key shares themselves.

For more details, you can refer to the [ICP documentation on Threshold ECDSA](https://internetcomputer.org/docs/current/developer-docs/integrations/t-ecdsa#overview).

## Does ICP support Schnorr signatures?

Yes, the Internet Computer (ICP) does support Schnorr signatures. This is particularly important for the processing of certain types of assets and transactions. For instance, inscribing Ordinals and creating and processing BRC20 assets involves Schnorr cryptography, which ICP supports. This also enables web-based smart contract wallets such as OISY to self-host BRC20, Ethereum, and native ICP assets. 

For more details, you can refer to the [ICP documentation on Trustless multi-chain on ICP](https://internetcomputer.org/multichain).

## Does ICP support EdDSA signatures?

Not yet.

## Does ICP support BLS signatures?

Yes, the Internet Computer Protocol (ICP) does support BLS (Boneh-Lynn-Shacham) signatures. As mentioned in the extracts, the threshold signature scheme used to implement chain-key cryptography in ICP is based on BLS signatures. However, it's important to note that while BLS signatures have distinct advantages, they are not compatible with other blockchains. To work with other blockchains, ICP uses threshold signatures that are compatible with the digital signature schemes of those other blockchains, such as ECDSA for Bitcoin and Ethereum.

For more information, you can refer to the [ICP documentation](https://internetcomputer.org/docs) or the [ICP wiki](https://wiki.internetcomputer.org/wiki).

## Does ICP support Multi-Signature (Multi-sig)?

Not currently in the protocol, but there are projects like: [https://github.com/ICPsig/icpsig](https://github.com/ICPsig/icpsig) working on it.

## Does ICP support Hash Time Locked Contracts (HTLCs)?

Not currently.

For more detailed information on ICP's cryptographic mechanisms, you may want to refer to the [ICP documentation](https://internetcomputer.org/docs) or the [ICP wiki](https://wiki.internetcomputer.org/wiki).

## Does ICP support Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs)?

Not currently.

For more detailed information on ICP's cryptographic mechanisms, you may want to refer to the [ICP documentation](https://internetcomputer.org/docs) or the [ICP wiki](https://wiki.internetcomputer.org/wiki).

## Does ICP support Proof of Logical Obliviousness (PLONK)?

Not currently.

For more detailed information on ICP's cryptographic mechanisms, you may want to refer to the [ICP documentation](https://internetcomputer.org/docs) or the [ICP wiki](https://wiki.internetcomputer.org/wiki).
