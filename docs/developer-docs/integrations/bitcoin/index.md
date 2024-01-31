# Overview

Smart contracts running on ICP can directly interact with the Bitcoin network without using bridges.
This is possible because ICP nodes can fetch and validate the Bitcoin network's blocks, and then make them available for smart contracts to query and read.
Smart contracts can also sign and send Bitcoin transactions, allowing them to directly hold BTC.

This direct Bitcoin integration is based on two features:

- **Threshold ECDSA**: A smart contract can have a secret key that is stored in a secure and decentralized way using chain-key cryptography.
  This key can be used to digitally sign messages.
  One of the supported signing algorithms, ECDSA is compatible with the Bitcoin blockchain, enabling smart contracts to sign Bitcoin transactions.
- **Bitcoin adapter**: ICP has one subnet whose nodes participate in the Bitcoin network.
  These nodes are used to fetch the Bitcoin state and blocks and send transactions to the network.

The diagram below shows the flow of interacting with the Bitcoin network from a smart contract.

<div class="text--center">
<img src="/img/docs/bitcoin-overview.png" alt="Bitcoin overview" width="500"/>
</div>

ICP also implements a smart contract that uses these two features to provide a **ckBTC** token (chain-key BTC) that is backed 1:1 by BTC.
Using the ckBTC token is easier and more convenient compared to using the two features directly.
The main value of ckBTC is that it can be transferred with the low finality time of ICP (within seconds) and for a fraction of the cost of a bitcoin transfer on the Bitcoin network.

The ckBTC token is suitable for the common use cases of holding, transferring, and trading BTC.
Developers that need more advanced interaction with the Bitcoin network need to use the lower-level threshold ECDSA and Bitcoin APIs.
An example of such an advanced use case would be working with Bitcoin inscriptions.
The threshold ECDSA API provides a way for smart contracts to sign transactions with their secret keys.
The Bitcoin API allows smart contracts to read the Bitcoin state (UTXOs and balances) and send signed transactions.

