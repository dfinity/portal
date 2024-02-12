# ckBTC FAQ

## How do I write a smart contract that uses ckBTC?

:::info
This answer is a work in progress. Please check back later for an updated response.
:::

## What is the purpose of ckBTC?

Chain-key Bitcoin (ckBTC) is a token on the Internet Computer that is backed 1:1 by bitcoin (BTC). It is designed to integrate Bitcoin with the Internet Computer Protocol (ICP) and decentralized finance (DeFi) applications. ckBTC is an ICP-native token that uses chain-key cryptography to own and control all underlying bitcoin, extending the ICP protocol stack so the blockchain behaves like a faster, less expensive, and more environmentally sustainable solution than the Bitcoin network.

ckBTC facilitates bitcoin holders to participate in the DeFi ecosystem, activating the world’s largest crypto economy. It offers a secure and scalable environment to use bitcoin in DeFi applications, including lending, borrowing, asset management, decentralized exchanges, and more. 

ckBTC is not a bridged or wrapped token; it is a direct link between the Bitcoin network and the Internet Computer, reducing the risks tied to bridges. This approach not only tackles security concerns but also launches Bitcoin into a world of better adaptability and user experiences.

ckBTC also offers the first bonafide use case for bringing smart contracts to BTC. All of DeFi will soon begin building on ICP, where processing is more secure, faster, environmentally friendly, and cost-effective.

: [Source](https://medium.com/dfinity/ckBTC-sparks-a-new-era-on-the-internet-computer-86463a7be20f#4690)
: [Source](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#08ea)

## What specific problem does ckBTC aim to solve within the Bitcoin ecosystem?

ckBTC, or Chain Key Bitcoin, is a solution developed by the Internet Computer Protocol (ICP) to address several limitations within the Bitcoin ecosystem. Here are the specific problems it aims to solve:

1. **Lack of programmability**: The Bitcoin blockchain lacks a programmable layer as complex as other blockchains, such as Ethereum, and does not offer the capability to support complex smart contracts and build decentralized applications. ckBTC activates programming capabilities for Bitcoin, extending its properties to build decentralized applications on the most secure and proven cryptographic infrastructure.

2. **Intermediary Dependence**: Bitcoin-based commerce traditionally requires transactions to be processed through a traditional bridge or anonymous fiduciary. ckBTC eliminates the need for an intermediary by allowing the Internet Computer to manage the holding, redemption, and transacting of BTC.

3. **Limited Integration with DeFi**: Bitcoin has been largely unable to integrate smoothly with decentralized finance (DeFi) applications. ckBTC, being an ICP-native token backed 1:1 with real BTC and governed on chain by Internet Computer smart contracts, facilitates Bitcoin holders to participate in the DeFi ecosystem.

4. **High Latency and Fees**: Every Bitcoin transaction is processed with the same low throughput, high latency, and high fees native to the Bitcoin network. ckBTC, being a digital bitcoin twin created by chain-key cryptography and a pair of canister smart contracts, can be sent with 2–5 second finality and negligible fees.

5. **Security Concerns with Bridges**: ckBTC gets rid of the need for bridges, reducing the risks tied to them. This approach not only tackles security concerns but also launches Bitcoin into a world of better adaptability and user experiences.

Sources:
: [How ckBTC Solves the Dilemma of Blockchain Bridges Part 2](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#6164)
: [ckBTC Sparks a New Era on the Internet Computer Part 4](https://medium.com/dfinity/ckBTC-sparks-a-new-era-on-the-internet-computer-86463a7be20f#4690)
: [Unlocks Bitcoin-Based Web 3](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#08ea)
: [ckBTC Sparks a New Era on the Internet Computer Part 1](https://medium.com/dfinity/ckBTC-sparks-a-new-era-on-the-internet-computer-86463a7be20f#4690)
: [Why Bitcoin needs smart contracts > The Internet Computer Part 3](https://medium.com/dfinity/why-bitcoin-needs-smart-contracts-5191fbec294a#acf6)
: [Why Bitcoin needs smart contracts > The Internet Computer Part 2](https://medium.com/dfinity/why-bitcoin-needs-smart-contracts-5191fbec294a#acf6)

## How does CKBC relate to Bitcoin?

The Internet Computer (ICP) supports a feature known as chain-key cryptography, which includes chain-key tokens. These tokens are not wrapped tokens; they are twin tokens that are backed 1:1 with the original token (BTC, ETC) and use chain-key cryptography to transfer and use the original tokens with less fees and higher transfer speeds than using the token's native blockchain network. One such token is the chain-key bitcoin (ckBTC) token, which is backed 1:1 with Bitcoin (BTC) [source](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-4/4.3-ckBTC-and-bitcoin#overview).

The Internet Computer integrates with the Bitcoin network at a protocol level, allowing ICP canister smart contracts to create Bitcoin addresses and send and receive bitcoin directly on the Bitcoin network. This integration is made up of two key building blocks: Network integration and chain-key ECDSA. With these building blocks, canisters can directly and securely hold, receive, and send bitcoin seamlessly as if the Internet Computer and the Bitcoin network were one blockchain [source](https://internetcomputer.org/bitcoin-integration/faq#bitcoin-integration).

For more information, you can refer to the following resources:
- [Code Bitcoin on the Internet Computer](https://internetcomputer.org/bitcoin-integration)
- [Chain-key tokens](https://internetcomputer.org/how-it-works/chain-key-tokens/)
- [Chain-key Bitcoin developer documents](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckBTC) [source](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading).

## How is ckBTC different from a regular Bitcoin transaction?

ckBTC, or Chain-key Bitcoin, is an Internet Computer native token that represents real bitcoin and builds on the protocol-level integration with the Bitcoin network. It is different from regular Bitcoin transactions in several ways:

1. **Speed and Cost**: ckBTC can be sent with 1-2 second finality and negligible fees, making it much faster and cheaper than regular Bitcoin transactions which can take roughly an hour and have high fees.

2. **No Intermediaries**: ckBTC is created by chain-key cryptography and a pair of canister smart contracts that directly hold raw bitcoin without relying on intermediaries. This is in contrast to regular Bitcoin transactions that typically rely on a third-party bridge.

3. **Smart Contract Integration**: Canister smart contracts can programmatically hold and transfer ckBTC, making it possible to develop fully on-chain Layer-2 applications for Bitcoin. This is not possible with regular Bitcoin transactions.

4. **Fixed Transaction Fees**: ckBTC transaction fees are fixed and not dependent on the transaction amount, variable intermediate forwarding, or unexpected channel funding fees.

5. **Security**: ckBTC is cryptographically secured 1:1 by real bitcoin, and is issued and redeemed via canister smart contracts that are verifiable by anyone at any time. This eliminates the risk of depegging, a risk that exists with regular Bitcoin transactions.

6. **Decentralization**: Every step of converting BTC to ckBTC and back is decentralized, meaning there are no centralized custodians, no bridges, and no traditional cloud providers that could act as attack vectors.

: [Bitcoin-integration](https://internetcomputer.org/bitcoin-integration/faq#bitcoin-integration)
: [Chain-Key Bitcoin: A Decentralized Bitcoin Twin](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e#99f9)
: [Why Bitcoin needs smart contracts](https://medium.com/dfinity/why-bitcoin-needs-smart-contracts-5191fbec294a#acf6)
: [Bitcoin + ICP](https://internetcomputer.org/bitcoin-integration)
: [What is ckBTC?](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-4/4.3-ckBTC-and-bitcoin#what-is-ckBTC)

## Can I use ckBTC just like I would use Bitcoin?

Yes. As a Twin to Bitcoin, you can use ckBTC as a Bitcoin, or convert it back to Bitcoin whenever one wishes. 

The conversion of ckBTC back to BTC and vice versa is controlled at the Internet Computer protocol-level, ensuring that no central authority has the power to restrict or censor these conversions. All transactions are transparent and can be verified through a real-time dashboard.

## Why should I choose ckBTC for my application or service?

Choosing ckBTC for your application or service comes with several advantages:

1. **Trustless Bitcoin-based Commerce**: ckBTC allows Bitcoin-based commerce to run natively on Internet Computer Protocol (ICP) smart contracts, eliminating the need for BTC transactions to be processed through a traditional bridge or anonymous fiduciary. This means you don't have to trust a third party or bridge-centered vaults, although you do need to have confidence in the Internet Computer Protocol and the Bitcoin Network.

2. **Direct Bitcoin Integration**: The Internet Computer has expanded its underlying protocol and technical architecture to virtually “attach” to the Bitcoin network, managing the holding, redemption, and transacting of BTC without the need for an intermediary.

3. **ICP Canisters**: Canisters on the Internet Computer can receive, hold, and send Bitcoin, integrating directly with the Bitcoin ledger and signing BTC transactions in real-time at the protocol level.

4. **Chain Key Bitcoin (ckBTC)**: ckBTC is an ICP-native token backed 1:1 with real BTC, governed on chain by Internet Computer smart contracts. It extends the ICP protocol stack so the blockchain behaves like a virtual layer 2 solution that is faster, less expensive, and more environmentally sustainable than the Bitcoin network.

5. **Security**: ckBTC is truly decentralized, potentially reversing the negative DeFi trend caused by large scale hacks and rug pulls.

6. **Low Fees and Fast Transactions**: ckBTC acts as a local ledger facilitating fast transactions with low fees (10 satoshis), and only settles transactions on the Bitcoin network when necessary.

7. **Easy Integration**: Compatible with the ICRC-1 token standard, and now also ICRC-2, ckBTC is easy to integrate into dapps running on the Internet Computer.

8. **Blockchain Interoperability**: The Bitcoin integration and the introduction of ckBTC on the Internet Computer is a significant breakthrough in blockchain interoperability.

9. **Layer 2 Functionality**: ckBTC acts as the native token on the Internet Computer that represents and is cryptographically secured 1:1 by real bitcoin.

10. **Programming Capabilities**: With the integration of Bitcoin on ICP, canisters (highly capable smart contracts) have the ability to perform actions such as send, receive, and hold Bitcoins natively.

11. **No Reliance on Cross-Chain Bridges**: Internet Computer’s Chain Key Bitcoin (ckBTC) extends the capabilities of the Bitcoin network without relying on cross-chain bridges.

12. **Low-Latency Payment Solutions**: With ckBTC, a smart contract controlled 1:1 Bitcoin-backed IC-native token, you can create low-latency payment solutions with fees of only a fraction of a cent.

13. **Security Measures**: All transfer activity and metrics of the two canister smart contracts are verifiable on chain. Issuing and redeeming ckBTC also goes through Know Your Transaction (KYT) checks to protect end users by ensuring no tainted bitcoin enters the Internet Computer blockchain or is transferred out to tainted Bitcoin addresses.

: [Source](https://medium.com/dfinity/ckBTC-sparks-a-new-era-on-the-internet-computer-86463a7be20f#4690)
: [Source](https://medium.com/dfinity/ckBTC-sparks-a-new-era-on-the-internet-computer-86463a7be20f#4690)
: [Source](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f

What advantages does ckBTC offer in terms of speed, fees, and security?

Chain-Key Bitcoin (ckBTC) offers several advantages in terms of speed, fees, and security:

**Speed**: ckBTC transactions are finalized within seconds, which is a significant speed-up compared to traditional Bitcoin transactions that can take up to an hour for 6 confirmations.

**Fees**: The transaction fees for ckBTC are fixed and negligible, costing only 0.0000001 ckBTC. This is approximately two orders of magnitude lower than traditional Bitcoin miner fees.

**Security**: ckBTC is backed 1:1 by Bitcoin (BTC), meaning 1 ckBTC can always be redeemed for 1 BTC and vice versa. Unlike other tokens pegged to Bitcoin, ckBTC does not rely on a third-party bridge for conversion between BTC and ckBTC, making it a more secure alternative. The security of ckBTC has been assessed for potential risks, including double-spending of funds, denial-of-service attacks, and insufficient access controls. 

Furthermore, ckBTC is issued and redeemed via canister smart contracts that are verifiable by anyone at any time, eliminating centralized custodians, bridges, and traditional cloud providers that could act as attack vectors.

: [Source](https://internetcomputer.org/bitcoin-integration/faq#bitcoin-integration)
: [Source](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)
: [Source](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-4/4.3-ckBTC-and-bitcoin#what-is-ckBTC)
: [Source](https://medium.com/dfinity/taking-security-seriously-two-top-icp-features-assessed-by-trail-of-bits-4a0023ab1e68#8e43)
: [Source](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e#99f9)
: [Source](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e#ee98)

## How can I integrate ckBTC into my existing applications or platforms?

To integrate ckBTC into your existing applications or platforms, you can follow the developer documentation provided by the Internet Computer. Here are some resources that you might find useful:

1. [ckBTC developer documentation page](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckBTC): This page provides detailed information about ckBTC, including its functionality and how it works.

2. [Bitcoin integration GitHub repository](https://github.com/dfinity/ic/tree/master/rs/bitcoin/ckBTC/minter): This repository contains the code for the ckBTC minter, which is responsible for minting and burning ckBTC.

3. [Local development workflow](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/local-development): This page provides a guide on how to set up a local development environment for Bitcoin integration.

4. [Deploying your first Bitcoin dapp](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin): This is a sample code for a basic Bitcoin dapp that you can use as a reference.

5. [Creating a ckBTC point of sale dapp](https://github.com/dfinity/examples/tree/master/motoko/ic-pos): This is another sample code for a ckBTC point of sale dapp.

Remember, the unique chain-key cryptography used to create ckBTC makes it different from other tokens that are pegged to the price of BTC. ckBTC does not use a third-party bridge, making it more secure than other pegged, or 'wrapped', tokens.

If you need further assistance, you can also ask questions in the [Internet Computer Developer Forum](https://forum.dfinity.org).

## What are the technical requirements for developers to work with ckBTC?

The extracts provided do not contain specific technical requirements for developers to work with ckBTC on the Internet Computer. However, they do provide some resources that could be useful for developers interested in this topic:

- A [technical overview of Bitcoin integration](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/bitcoin-how-it-works/) with the Internet Computer.
- A [technical overview of ckBTC](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckBTC).
- A [blog post about ckBTC](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e).
- Information about the [native Bitcoin API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin-api).
- A guide to [local development with Bitcoin](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/local-development).
- A [security audit](https://medium.com/dfinity/taking-security-seriously-two-top-icp-features-assessed-by-trail-of-bits-4a0023ab1e68).

For more specific technical requirements, developers may want to refer to the [ckBTC API reference](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckBTC-reference) and the [GitHub repository](https://github.com/dfinity/ic/tree/master/rs/bitcoin/ckBTC/minter) for ckBTC. They might also find it helpful to follow the [developer journey for ckBTC and Bitcoin integration](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-4/4.3-ckBTC-and-bitcoin) and to look at examples of [deploying a Bitcoin dapp](https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin) and [creating a ckBTC point of sale dapp](https://github.com/dfinity/examples/tree/master/motoko/ic-pos).

## How does ckBTC ensure the security of the funds it handles?

ckBTC, also known as Chain-Key Bitcoin, is a "Bitcoin twin" on the Internet Computer that is backed 1:1 by bitcoin (BTC). It ensures the security of the funds it handles through several measures:

1. **No Third-Party Bridges**: ckBTC does not rely on any third-party bridges for the conversion between BTC and ckBTC. This eliminates the vulnerabilities associated with bridge hacks, which have been a prime target for hackers due to their easy-to-compromise architecture.

2. **Security Assessment**: The security of ckBTC was a high priority for DFINITY and its community. The assessment covered testing the possible risks including double-spending of funds, denial-of-service attacks, and insufficient access controls.

3. **KYT Checks**: Cross-chain transactions go through Know Your Transaction (KYT) checks to protect honest users. KYT is a process that monitors and tracks financial transactions in order to detect and prevent fraudulent or criminal activity.

4. **Trustless Process**: The conversion of ckBTC back to BTC and vice versa is controlled at the Internet Computer protocol-level. It is accessible to all ICP decentralized applications (dapps), ensuring that no central authority has the power to restrict or censor these conversions.

5. **Decentralized Process**: Every step of converting BTC to ckBTC and back is decentralized, meaning there are no centralized custodians, no bridges and no traditional cloud providers that could act as attack vectors.

6. **1:1 Pegging**: Securing ckBTC 1:1 with BTC is crucial as it eliminates the risk of depegging.

7. **Bitcoin Integration at Protocol Level**: ckBTC on the Internet Computer is part of a native integration with the Bitcoin network at the protocol level. This means that transactions occur directly between the two networks without any intermediary bridges.

: [Taking security seriously: two top ICP features assessed by Trail of Bits](https://medium.com/dfinity/taking-security-seriously-two-top-icp-features-assessed-by-trail-of-bits-4a0023ab1e68#8e43)
: [What you need to know about Bitcoin integration and ckBTC](https://internetcomputer.org/bitcoin-integration/faq#bitcoin-integration)
: [Trustless](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#7ee8)
: [Architecture Part 2](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)
: [No Middle Person](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e#99f9)
: [How ckBTC Solves the Dilemma of Blockchain Bridges Part 1](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#6164)

## Can I trust that my funds are safe when using ckBTC?

Yes, you can trust that your funds are safe when using ckBTC. Here's why:

1. **Trustless Bitcoin Integration**: ckBTC uses a cryptographic technique that allows each smart contract canister to generate its own public key. These smart contracts can directly interact with the Bitcoin blockchain and send, receive, and hold Bitcoins. The conversion of ckBTC back to BTC and vice versa is controlled at the Internet Computer protocol-level, ensuring that no central authority has the power to restrict or censor these conversions. All transactions are transparent and can be verified through a real-time dashboard.

2. **KYT Checks**: The ckBTC minter interacts with the KYT canister for "know-your-transaction" (KYT) checks. These checks are meant to ensure that the ckBTC minter only uses "clean" bitcoins to back the issued ckBTC tokens and to prevent transferring bitcoins to Bitcoin addresses that are considered to be associated with illicit activity. Cross-chain transactions go through KYT checks to protect honest users.

3. **Security Assessment**: ckBTC has been assessed for potential security risks, covering key areas such as double-spending of funds, denial-of-service attacks, and insufficient access controls.

4. **Fast and Cheap Transactions**: ckBTC can be sent with 2–5 second finality and negligible fees.

5. **No Middle Person**: Every step of converting BTC to ckBTC and back is decentralized, meaning there are no centralized custodians, no bridges, and no traditional cloud providers that could act as attack vectors.

6. **ICP Canisters**: Canisters on the Internet Computer can receive, hold, and send Bitcoin, integrating directly with the Bitcoin ledger and signing BTC transactions in real-time at the protocol level.

7. **TLA+ Analysis**: The ckBTC smart contracts have been analyzed using TLA+ to eliminate potential bugs.

However, it's important to note that while these measures significantly enhance the security of ckBTC, no system can be 100% immune from risks. Always exercise caution and due diligence when dealing with cryptocurrencies.

: [Source](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#7ee8)
: [Source](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)
: [Source](https://internetcomputer.org/bitcoin-integration/faq#bitcoin-integration)
: [Source](https://medium.com/dfinity/taking-security-seriously-two-top-icp-features-assessed-by-trail-of-bits-4a0023ab1e68#8e43)
: [Source](https://medium.com/dfinity/why-bitcoin-needs-smart-contracts-5191fbec294a#acf6)
: [Source](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e#99f9)
: [Source](https://medium.com/dfinity/ckBTC-sparks-a-new-era-on-the-internet-computer-86463a7be20f#4690)
: [Source](https://medium.com/dfinity/eliminating-smart-contract-bugs-with-tla-e986aeb6da24#3a8b)

## How does ckBTC handle transactions across multiple blockchains?

Chain-Key Bitcoin (ckBTC) on the Internet Computer is part of a native integration with the Bitcoin network at the protocol level. This means that transactions occur directly between the two networks without any intermediary bridges, eliminating the vulnerabilities associated with bridge hacks. ckBTC extends the capabilities of the Bitcoin network without relying on cross-chain bridges, which have been a prime target for hackers due to their easy-to-compromise architecture.

Internet Computer nodes communicate with Bitcoin nodes to download the Bitcoin network’s blocks and maintain its Unspent Transaction Output (UTXO) set. Using this information, the Internet Computer acts as a sidechain and hosts a trustless “bitcoin twin” called ckBTC that can be directly processed by canister smart contract logic and transferred with 1 second finality at near zero cost.

To create ckBTC, a user transfers their bitcoin to a ckBTC address provided by their wallet. Their ckBTC twin can then be sent to any other ckBTC address, almost instantly for a tiny fee, or directly to a standard Bitcoin address, causing the bitcoin twin to return to its native form.

In the future, ckBTC will be available on other networks like Ethereum – also directly, and without bridges, thanks to chain-key cryptography integrations.

: [Source](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#6164)
: [Source](https://internetcomputer.org/multichain)

## Are there any specific integrations with other blockchains like Ethereum that I should be aware of?

Yes, the Internet Computer has specific integrations with other blockchains like Ethereum and Bitcoin. 

The Internet Computer uses advanced cryptography to directly integrate with other blockchains without using bridges. This is achieved through the use of chain-key ECDSA signatures and a protocol-level integration. This allows a canister smart contract to create Bitcoin addresses, and send and receive bitcoin, all directly on the Bitcoin ledger, much like a regular Bitcoin user [source](https://internetcomputer.org/capabilities).

For Ethereum, the Internet Computer will integrate using chain-key ECSDA signatures. Internet Computer smart contracts can access and use all digital assets like ERC-20 and ERC-721 tokens from Ethereum, and smart contracts on Ethereum can use the power of IC smart contracts, e.g., low-cost storage and computation [source](https://internetcomputer.org/capabilities).

In addition to these, a threshold ECDSA protocol (tECDSA) allows the IC to create keys and sign transactions on various ECDSA chains. These chains include Bitcoin and Ethereum, and in the future, the protocol may be extended to allow interaction with various EdDSA chains [source](https://demergent-labs.github.io/azle/print.html#blockchain-integration).

These direct integrations provide a much more secure way to provide blockchain functionality to end users than creating and storing their private keys on traditional cloud infrastructure.

## Can I build smart contracts that interact with ckBTC?

Yes, you can build smart contracts that interact with ckBTC on the Internet Computer. ckBTC is an Internet Computer native token that’s securely backed 1:1 by Bitcoin (BTC). The ckBTC ledger is a canister smart contract on the Internet Computer blockchain that keeps track of how much ckBTC each end user owns. This same ledger enables end users to transfer their ckBTC to other end users faster and cheaper than they could transfer BTC on the Bitcoin network. To convert ckBTC to and from BTC, the end users interact with a different smart contract, namely the ckBTC minter.

The Internet Computer's native Bitcoin integration allows you to build innovative DeFi solutions without the need for custodians. Plus, with ckBTC, a smart contract controlled 1:1 Bitcoin-backed IC-native token, you can create low-latency payment solutions with fees of only a fraction of a cent and plug into a growing ecosystem IC native tools and services.

Developers can immediately begin writing canister smart contracts that make use of the Internet Computer’s new Bitcoin integration. Rather than “bridging” BTC into the Internet Computer, the integration implements Chain Key cryptography to establish a secure, direct interface with the Bitcoin ledger, making it “trustless” rather than reliant on an intermediary. This enables developers to build canister smart contracts that communicate with the Bitcoin network.

: [Source](https://medium.com/dfinity/eliminating-smart-contract-bugs-with-tla-e986aeb6da24#3a8b)
: [Source](https://medium.com/dfinity/announcing-the-internet-computer-buidl-bitcoin-hackathon-powered-by-encode-club-70081b8d0406#8889)
: [Source](https://medium.com/dfinity/bitcoin-smart-contracts-are-coming-to-internet-computer-defi-projects-dd6786078853#e28c)

## What kind of functionalities can these smart contracts provide?

Smart contracts on the Internet Computer, also known as canisters, can provide a wide range of functionalities. Here are some key capabilities:

1. **Orthogonal Persistence**: Data lives in persistent memory pages, making managing data much easier.

2. **Actor Model**: This gives dapps a time-tested model for concurrency that scales, allowing deterministic parallelism, both internally and externally.

3. **Access to System APIs**: Dapps get access to system APIs uncommon in Ethereum smart contracts, such as public randomness.

4. **Integration with Other Blockchains**: Canisters will be able to have Bitcoin addresses in the future.

5. **Multi-block Transactions**: The Internet Computer blockchain can stretch the execution of a single transaction across multiple blocks, allowing very-long running smart contract computations to be initiated.

6. **Daemon contracts**: Canister smart contracts can be configured so that they are automatically activated by the network itself at specified block intervals.

7. **Serve web content**: Canister smart contracts can process HTTP requests, enabling them to host frontends of dapps, making them directly accessible through web browsers.

8. **Interoperability with Ethereum**: Canisters can directly call into smart contracts on Ethereum, and Ethereum smart contracts can directly call into canisters.

9. **Interact with the Bitcoin network**: Canisters can read and write the state of the Bitcoin network without introducing new trust assumptions beyond the protocol itself.

: [Source](https://wiki.internetcomputer.org/wiki/Internet_Computer_overview#firstHeading)
: [Source](https://internetcomputer.org/capabilities/multi-block-transactions)
: [Source](https://medium.com/dfinity/internet-computer-ethereum-integration-explained-6967456e35f9#58f6)
: [Source](https://internetcomputer.org/capabilities/daemon-contracts)
: [Source](https://internetcomputer.org/capabilities/serve-web-content)
: [Source](https://medium.com/dfinity/why-bitcoin-needs-smart-contracts-5191fbec294a#acf6)

## What are the transaction fees associated with ckBTC?

The transaction fees for ckBTC on the Internet Computer are designed to be minimal. It is set at 0.0000001 ckBTC, which is equivalent to less than a cent or 10 satoshis. Users only need to pay the transaction fees of the Bitcoin network when converting Bitcoins to ckBTC or vice versa [source](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#f847).

In addition, there is a fee when bitcoins are retrieved. The formula for the ckBTC minter fee when calling `retrieve_btc` is determined as follows:

```
21.54b*in + 5b + tx_size*20m cycles
&lt; 21.54b*in + 5b + (149*in + 35*out + 10)*20m cycles
&lt; 24.52b*in +0.7b*out + 5.2b cycles
&lt; 246*in + 7*out + 52 satoshi.
```

The formula `246*in + 7*out + 52` is used to determine the ckBTC minter’s fee in satoshi. Since every transaction has at least one input and one output, the fee is at least 305 satoshi [source](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading).

There is also a Know Your Transaction (KYT) fee (currently 2000 satoshi) when converting BTC to ckBTC and vice versa [source](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading).

## How quickly can ckBTC transactions be finalized?

ckBTC transactions can be finalized very quickly. They achieve a near-instant transaction finality with transaction confirmation within 1–2 seconds. This rapid finality can increase throughput and efficiency, facilitating more scalability for blockchain applications.

: [Source](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#aaf2)
: [Source](https://medium.com/dfinity/why-bitcoin-needs-smart-contracts-5191fbec294a#acf6)
: [Source](https://internetcomputer.org/bitcoin-integration)
: [Source](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)

## Who controls the development and governance of ckBTC?

The development and governance of ckBTC are controlled by the Internet Computer blockchain, which is developed by the DFINITY Foundation. The Internet Computer blockchain is governed by the Network Nervous System (NNS), an algorithmic governance system that oversees the network and the token economics. Holders of the Internet Computer’s ICP utility tokens can lock their tokens in neurons to participate in governance and contribute to decision-making.

The ckBTC ledger is a canister, controlled by the NNS (specifically, the NNS root canister), running on a specific subnet. The ckBTC minter is responsible for minting and burning ckBTC.

The conversion of ckBTC back to BTC and vice versa is controlled at the Internet Computer protocol-level. This process is completely trustless and managed by automated software programs (smart contracts).

: [Wiki > Governance of the Internet Computer](https://wiki.internetcomputer.org/wiki/Governance_of_the_Internet_Computer#firstHeading)
: [Wiki > Chain-key Bitcoin > Technical Details > ckBTC Ledger](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)
: [Dfinity > Trustless](https://medium.com/dfinity/how-ckBTC-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#7ee8)

## Is there a community-driven approach to decision-making?

Yes, the Internet Computer blockchain employs a community-driven approach to decision-making. This is facilitated by the Network Nervous System (NNS), which is a decentralized algorithmic authority that oversees the network's operations and evolution. 

Each node provider is verified and voted in by token holders via the NNS. This means that the community of token holders has a say in the governance of the Internet Computer, including admitting new node providers to the network and assigning them to subnets based on community member votes.

This approach ensures that the Internet Computer remains decentralized and that decisions are made collectively by the community, rather than being controlled by a single entity.

: [Medium > The Internet Computer blockchain takes a first step towards digital sovereignty in Europe](https://medium.com/dfinity/the-internet-computer-blockchain-takes-a-first-step-towards-digital-sovereignty-in-europe-782531894780#6f0c)

## Can you provide examples of current applications that utilize ckBTC?

Yes, there are several decentralized applications (dapps) on the Internet Computer that already support ckBTC. Here are some of them:

1. [PlethoraGame](https://twitter.com/PlethoraGame)
2. [OpenChat](https://twitter.com/OpenChat)
3. [DSCVR1](https://twitter.com/DSCVR1)
4. [ICLighthouse](https://twitter.com/ICLighthouse)
5. [DistriktApp](https://twitter.com/DistriktApp)
6. [hotornot_dapp](https://twitter.com/hotornot_dapp)
7. [infinity_swap](https://twitter.com/infinity_swap)
8. [catalyze_one](https://twitter.com/catalyze_one)

You can follow these projects on Twitter to stay updated on their latest developments. 

For more information about ckBTC and its integration with the Internet Computer, you can refer to the following resources:

- [Native Bitcoin on ICP](https://internetcomputer.org/bitcoin-integration)
- [Chain-Key Technology](https://internetcomputer.org/how-it-works#Chain-key-technology)
- [Native Bitcoin & ckBTC Developer Docs](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/bitcoin-how-it-works)

Source: [Chain-Key Bitcoin: A Decentralized Bitcoin Twin](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e#2f6e)

# Does ckBTC incorporate KYT?

Yes, cross-chain transactions go through KYT checks to protect honest users. Know Your Transaction (KYT) is a process that monitors and tracks financial transactions in order to detect and prevent fraudulent or criminal activity, such as money laundering or terrorist financing.

If ckBTC were to operate without a KYT implementation, there would be a risk of 'tainted' bitcoin entering the Internet Computer, that an honest user could unknowingly withdraw. Such bitcoin may be rejected by CEXs, which means honest users could potentially lose their bitcoin when trying to sell.

KYT is an important security component of ckBTC. Read more about how ckBTC implements KYT and the motivation behind it in [this forum post](https://forum.dfinity.org/t/ckbtc-and-kyt-compliance/18754).