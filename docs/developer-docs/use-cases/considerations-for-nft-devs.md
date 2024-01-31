## Overview

An NFT or **non-fungible token** is a record on a blockchain that is associated with a particular digital or physical asset. The unique digital representation on a blockchain allows the proving of ownership as well as their trading.

## NFTs on the Internet Computer

The Internet Computer Protocol brings a lot of potential for NFTs. 

### NFT asset storage for cross-chain NFTs

NFT assets, including images, sound clips, or videos, can be securely stored on-chain entirely on ICP, even while the NFT itself is minted on various chains, such as on any EVM chain.

Refer to [this example](https://github.com/domwoe/erc-721-ic-assets) on how to host metadata on the ICP of an ERC-721 NFT minted on an EVM chain.

### Generative NFTs 

Dynamic NFTs can be curated to evolve based on both data stored on ICP or external APIs. NFT assets can be modified in real-time by calling API requests on-chain using [HTTPS outcalls](/https-outcalls).

### Minting NFTs on ICP

For developers seeking to store assets and mint NFTs directly on the Internet Computer Protocol (ICP), an NFT implementation typically encompasses three core functionalities:

- A registry to monitor ownership and facilitate transfers.
- A ledger or transaction history.
- The actual asset itself (in the case of digital assets).

#### NFT interface specifications and implementations

- [DIP-721](https://github.com/Psychedelic/DIP721) is an [ERC-721](https://eips.ethereum.org/EIPS/eip-721) style non-fungible token standard built mirroring its Ethereum counterpart and adapting it to the Internet Computer, maintaining the same interface.

Refer to the [creating NFTs on ICP](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-5/5.4-NFT-tutorial#icrc-7) tutorial for more information.

- [ICRC-7](https://github.com/dfinity/ICRC/tree/54d98a82a626daad6f674f1b8e6b815785f6c8c5/ICRCs/ICRC-7) is a standard for the base implementation of non-fungible tokens (NFTs) on the Internet Computer.

:::caution
The ICRC-7 standard is still currently in the drafting stages and is not yet live in production.
:::

### NFT marketplaces and launchpads

Additionally, you have the option to utilize various platforms for minting your NFTs, such as:

- [Entrepot](https://entrepot.app/).
- [Jelly](https://jelly.xyz/).
- [NFT Anvil](https://nftanvil.com/).
- [Yumi](https://tppkg-ziaaa-aaaal-qatrq-cai.raw.icp0.io/).





