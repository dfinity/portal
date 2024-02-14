# User facing FAQ

The following questions and answers are from the POV of a user using consumer applications like NNS Frontend dapp or others. They are meant to help consumers who want to hold, send, receive tokens.

For questions from the POV of a developer who wants to know things such as "how does a canister send ckBTC?" or how to write code for smart contracts to hold, send, or receive, please see the other FAQs.

## ckBTC User Questions

Questions about ckBTC from a user's POV.

## What is ckBTC?

Chain-key Bitcoin (ckBTC) is a token on the Internet Computer that is backed 1:1 by bitcoin (BTC). This means that 1 ckBTC can always be redeemed for 1 BTC and vice versa. Unlike other tokens pegged to bitcoin, the ckBTC token does not rely on a third-party bridge for the conversion between BTC and ckBTC, making it a substantially more secure alternative to “wrapped” tokens.

One of the main advantages of ckBTC over regular bitcoin is its speed and cost of transfers. A transfer of ckBTC is finalized within a few seconds, which is significantly faster compared to transfers on the Bitcoin blockchain when waiting for 6 confirmations. Additionally, the cost of a ckBTC transfer is only 0.0000001 ckBTC, which is approximately two orders of magnitude lower than the Bitcoin miner fees.

In terms of usage, ckBTC can be used in applications on the Internet Computer. For example, there is a point of sale app that allows users to accept ckBTC payments. This is made possible because the Internet Computer integrates directly with the Bitcoin network, allowing canisters (akin to smart contracts) on the Internet Computer to receive, hold, and send Bitcoin, all directly with transactions on the Bitcoin network.

Sources:
- [Chain-key Bitcoin Overview](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)

### How do I convert ckBTC to BTC and vice versa?

To convert Bitcoin (BTC) to Chain-key Bitcoin (ckBTC), follow these steps:

1. Go to the NNS frontend dapp and sign in with your Internet Identity. If you don't have one, you will be prompted to create one. Any device that supports WebAuthn can be used as a passkey for II. Alternatively, you can use a YubiKey or a Ledger device.
2. Navigate to My Tokens and select ckBTC.
3. Click on Receive on the bottom of the screen.
4. Send BTC to your NNS BTC address. Once you see this pop up window, you can copy your NNS BTC address, and send BTC there. Note, that since this is a real bitcoin transaction, it will take roughly an hour, and have the Bitcoin network's transaction fees. Once you acquire ckBTC, you can take advantage of its near instant finality (1-2s) and negligible transaction fees (10 satoshis).

For more details, you can refer to this [support document](https://support.dfinity.org/hc/en-us/articles/20708056282132-What-is-ckBTC#h_01HE64A4QKANB6JX8VERRP5Y80).

:::caution
Important: Please note that when converting BTC to ckBTC in the NNS dapp, there is an estimated inter-network fee of 0.00002 BTC. Sending less than 0.00002 BTC for conversion to ckBTC can result in loss of funds. 
:::


To convert ckBTC back to BTC, follow these steps:

1. The user makes the desired ckBTC amount available to the ckBTC minter and requests a conversion. The destination Bitcoin address undergoes a KYT check. If the check is successful, the request is accepted and put into a queue.
2. The ckBTC minter periodically attempts to submit transactions for validated transfer requests.
3. The ckBTC minter periodically checks which transactions went through and finalizes these transactions.
4. The ckBTC minter can resubmit a transaction that has been pending for at least one day with a higher fee.

For more details, you can refer to this [wiki page](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading).

Please note that every step of converting BTC to ckBTC and back is decentralized, meaning there are no centralized custodians, no bridges and no traditional cloud providers that could act as attack vectors. Issuing and redeeming ckBTC goes through Know Your Transaction (KYT) checks to ensure no bitcoin enters the Internet Computer that is associated with criminal activity.

### How do I send ckBTC?

As a user, to send ckBTC, you can follow these steps using your NNS wallet:

1. Go to the NNS frontend dapp and sign in with your Internet Identity. If you don't have one, you will be prompted to create one. Any device that supports WebAuthn can be used as a passkey for II. Alternatively, you can use a YubiKey or a Ledger device.
2. Navigate to "My Tokens" and select ckBTC. If you have ckBTC in a different wallet, send it to your NNS principal.
3. Click on "Send" on the bottom of the screen.
4. Paste a valid BTC address that you control into the "Destination" field.
5. Select Bitcoin from the "Network" dropdown.
6. Type in the amount you want to send or click "Max".
7. Click "Continue", then confirm the transaction.

For more details, you can refer to the [support documentation](https://support.dfinity.org/hc/en-us/articles/20708056282132-What-is-ckBTC#h_01HE64A4QKANB6JX8VERRP5Y80).

### How do I receive ckBTC?

In order to send ckBTC to your nns dapp wallet  perform the following steps: 

1. Connect to nns.ic0.app
2. On the main wallet page, click on ckBTC QR Code Icon. A popup will appear. Scan this from the device that you are sending the ckBTC from. Alternatively you can copy the ckBTC address and send the ckBTC to this address. 
3. On the third party service where you currently have ckBTC stored, select send and then paste the address you copied in the previous step.

### Can I convert ICP to ckBTC?

ICP and ckBTC are two separate tokens so there is no protocol way to convert one to another. Typically people who want to exchange one for the other use exchanges.

### Can I convert ICP to BTC?

ICP and BTC are two separate tokens so there is no protocol way to convert one to another. Typically people who want to exchange one for the other use exchanges.

### What are the average ckBTC transfer fees?

The transaction fees for ckBTC on the Internet Computer (ICP) are designed to be minimal. It is currently configured to at 0.0000001 ckBTC, which is equivalent to less than a cent or 10 satoshis.

When calling `retrieve_btc`, the formula for the ckBTC minter fee is determined as follows:
```
246*in + 7*out + 52 satoshi
```
This formula is used to determine the ckBTC minter’s fee in satoshi. Since every transaction has at least one input and one output, the fee is at least 305 satoshi.

There is also a Know Your Transaction (KYT) fee, currently set at 2000 satoshi, when converting BTC to ckBTC and vice versa.

- [Source](https://medium.com/dfinity/how-ckbtc-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#f847)
- [Source](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)

### How can I view the entire history of ckBTC transactions?

You can view the transactions for ckBTC or BTC on the Internet Computer through the Internet Computer Dashboard.

Furthermore, all ckBTC transactions are transparent and can be verified through a [real-time dashboard](https://dashboard.internetcomputer.org/bitcoin/transactions), offering users and developers immediate insight into the flow of assets and the integrity of the conversion process.

- [Source](https://medium.com/dfinity/how-ckbtc-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#7ee8)

## ckETH User Questions

Questions about ckETH from a user's POV.

### How do I convert ckETH to ETH and vice versa?

To convert ETH to ckETH and vice versa, you can follow these steps:

**To convert ETH to ckETH:**

1. Obtain an ICP principal or wallet address.
2. Deposit your ETH: Ethereum holders can deposit Ether to the deposit function in the ckETH helper contract on Ethereum `0x7574eB42cA208A4f6960ECCAfDF186D627dCC175` and specify their ICP principal or wallet address where they want their minted ckETH to appear.
3. Mint ckETH: The ICP ckETH canister smart contract will then mint the same amount of ckETH to the indicated ICP principal or wallet address.
4. Use ckETH: The ICP principal or wallet address can now use ckETH natively on the Internet Computer.

**To convert ckETH back to ETH:**

1. When the ICP principal wants to convert ckETH back to ETH, they can request the ckETH canister smart contract with the ETH amount and Ethereum address to which they want to send the ETH. The wallet address `0xb25eA1D493B49a1DeD42aC5B1208cC618f9A9B80` will send the ETH to the wallet address noted here.

Please note that with the current ckETH integration, you will not be able to withdraw to ETH directly from the ICRC-1 wallet. This is because the ICRC-1 wallet does not support the withdrawal process (withdraws are supported in the ICRC-2 standard). To withdraw ckETH for ETH, you can send your ckETH to your dfx principal, then withdraw from there following [these steps](https://github.com/timohanke/ic/blob/d34903fc2c41e2cff5df86248628f5d0b4fd7168/rs/ethereum/cketh/minter/README.adoc#withdrawal-cketh-to-eth).

For more information, you can check out these sources: [source 1](https://medium.com/dfinity/how-to-acquire-cketh-02d863c835fc#e10f), [source 2](https://medium.com/dfinity/a-data-driven-exploration-of-cketh-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#e978), [source 3](https://internetcomputer.org/blog/2023/12/06/news-and-updates/update#cketh-now-live).

### Can I convert ICP to ckETH?

ICP and ckETH are two separate tokens so there is no protocol way to convert one to another. Typically people who want to exchange one for the other use exchanges.

### Can I use ICP to perform cross-chain atomic swaps or transfers between ckBTC and ETH?

For swapping between tokens such as ckBTC and ETH, you can use tools like [ICPSwap](https://app.icpswap.com/swap), [Sonic](https://www.sonic.ooo/), and [ICLight](https://iclight.io/). On these platforms, you can select the type of token you'd like to swap and the token you'd like to receive in return.

Furthermore, ICP's Ethereum integration will include the creation of ckETH and ckERC-20 tokens, which can be swapped with negligible fees. This integration will also allow Ethereum smart contracts and digital assets like ERC-20 tokens to be used in ICP canisters.

Please note that the Ethereum integration is still in development, and the full functionality may not be available yet. You can learn more about cross-chain integrations in the [documentation](https://internetcomputer.org/bitcoin-integration/).

Sources:
- [Internet Computer Documentation](https://internetcomputer.org/docs/current/tutorials/hackathon-prep-course/integrating-with-tokens#swapping-between-tokens)
- [Internet Computer Ethereum Integration](https://internetcomputer.org/ethereum-integration)
- [Internet Computer Developer Journey](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial#overview)

## General multi-chain questions

### Is there a user interface for managing my multi-chain assets on the Internet Computer?

Yes, Internet Computer enables the creation of decentralized applications and services that can interact with multiple blockchains. The [NNS Frontend dapp](https://nns.ic0.app/) is an example decentralized application built on the Internet Computer featuring a wallet to allow users to manage chain key tokens such as ckBTC and ckETH on the IC.

For more details, you may want to check the [Internet Computer documentation](https://internetcomputer.org/docs) or ask on the [DFINITY forum](https://forum.dfinity.org).

### How does ICP ensure the security and privacy of my cross-chain transactions?

Internet Computer (ICP) ensures the security and privacy of your cross-chain transactions through several mechanisms:

1. **Cross-chain Interoperability**: ICP can directly integrate with other blockchain networks like Bitcoin and Ethereum without using bridges, thanks to its advanced cryptography. This is achieved through threshold ECDSA and chain-key cryptography, which allow ICP to natively create signed transactions on other blockchains. This means that dapps deployed on ICP can interact directly with other networks and their smart contracts, tokens, and other digital assets, without the need for intermediaries.

2. **Bitcoin Integration**: ICP's native Bitcoin integration allows canisters (advanced smart contracts) to interact with the Bitcoin network at the protocol level. This means they can directly receive, hold, and send BTC on the Bitcoin mainnet without using intermediaries and third-party blockchain bridges, which often have security issues. Canisters can read from and write to the Bitcoin ledger.

3. **Ethereum Integration**: ICP aims for a native integration with the Ethereum network by running Ethereum nodes co-located with ICP nodes. This integration increases security because all data fetched from RPC providers gets cryptographically verified. ICP is also working on native Ethereum integration, which will allow ICP smart contracts to securely query the Ethereum blockchain and send transactions to it.

4. **Chain-key Cryptography**: ICP uses chain-key cryptography to sign native transactions on other blockchains. This set of cryptographic protocols allows ICP to securely communicate across chains.

5. **Platform Privacy**: The Internet Computer runs a decentralized network, where data and computation are replicated across nodes in data centers located around the world. This decentralized structure ensures availability and integrity. Communication with the Internet Computer relies on a set of boundary nodes, which can see the IP address of the sending user, as well as which canister the user is sending it to and the payload. All communication to the Internet Computer and within it is encrypted.

- [Internet Computer Docs](https://internetcomputer.org/docs/current/tutorials/hackathon-prep-course/what-is-icp#cross-chain-interoperability)
- [Dfinity Blog - How ICP’s Bitcoin Integration Secures Private Keys Part 1](https://medium.com/dfinity/how-icps-bitcoin-integration-secures-private-keys-c2af14597846#6a5c)
- [Dfinity Blog - How ICP’s Bitcoin Integration Secures Private Keys Part 2](https://medium.com/dfinity/how-icps-bitcoin-integration-secures-private-keys-c2af14597846#6a5c)
- [Dfinity Blog - Securing cross-chain communication from Ethereum to the Internet Computer with an on-chain Light Client](https://medium.com/dfinity/securing-cross-chain-communication-from-ethereum-to-the-internet-computer-with-an-on-chain-light-fedfb4fb24b4#1329)
- [Dfinity Blog - Chain-Key Bitcoin: A Decentralized Bitcoin Twin](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e#99f9)
- [Internet Computer Ethereum Integration](https://internetcomputer.org/ethereum-integration)
- [Dfinity Blog - The Internet Computer Blockchains Privacy Advantages](https://medium.com/dfinity/the-internet-computer-blockchains-privacy-advantages-73340c6c42db#6ec2)

### Can I track the status of my multi-chain transactions on the Internet Computer dashboard?

Yes, you can track the status of your transactions on the Internet Computer dashboard. The [ICP Transactions](https://dashboard.internetcomputer.org/transactions) page provides a real-time log of all purchases and transfers of ICP. When you purchase ICP through an exchange or transfer ICP between hardware wallets, this page will populate with that transaction information. Each transaction is given its own specific hash, and is logged with the appropriate sender ID, receiver ID, amount, fee, and timestamp. This information is easily accessible and crucial for transparency.

For more detailed information, you may want to refer to the [Internet Computer Dashboard](https://dashboard.internetcomputer.org/) directly.

Sources:
- [What is the Internet Computer Dashboard?](https://support.dfinity.org/hc/en-us/articles/6188295625748-What-is-the-Internet-Computer-Dashboard)
- [The Internet Computer Dashboard: Decentralization, Governance, Tokenomics, and More](https://medium.com/dfinity/the-internet-computer-dashboard-decentralization-governance-tokenomics-and-more-da4abb36f15f#ec91)

### What are the steps involved in setting up a multi-chain wallet on the Internet Computer?

The [NNS frontend dapp](https://nns.ic0.app/) serves as a multi-chain wallet enabling users to hold many types of tokens such as ICP, ckBTC, ckETH, etc.

### How does ICP handle the conversion of tokens between different chains, such as converting ICP to ckBTC?

The Internet Computer (ICP) has a rich ecosystem of DeFi apps and services such as AMM's and Decentralized exchanges which enable swapping between tokens, such as ICP, an ICRC-1 token, or a chain-key token such as ckBTC or ckETH. Tools like [ICPSwap](https://app.icpswap.com/swap), [Sonic](https://www.sonic.ooo/), and [ICLight](https://iclight.io/) can be used for this purpose. On ICPSwap, for instance, you can connect to the dapp with several different wallet types, such as Internet Identity, NFID, Bitfinity and more. Then, you can select the type of token you'd like to swap for another, such as ICP, and enter the value you'd like to swap. Finally, select the token you'd like to receive in return for your ICP.

In the future, when the Internet Computer blockchain integrates with additional blockchains, more chain-key tokens will become available on ICP.

- [Source](https://internetcomputer.org/docs/current/tutorials/hackathon-prep-course/integrating-with-tokens#swapping-between-tokens)
- [Source](https://internetcomputer.org/how-it-works/chain-key-tokens)
- [Source](https://internetcomputer.org/blog/news-and-updates/team-spotlight-fi)
- [Source](https://internetcomputer.org/how-it-works/chain-key-tokens#the-future-chain-key-erc-20-tokens)
- [Source](https://medium.com/dfinity/eliminating-smart-contract-bugs-with-tla-e986aeb6da24#3a8b)

### Is there a guide or tutorial on how to use multi-chain features on the Internet Computer for beginners?

Yes, there are several resources available for beginners who want to use the multi-chain features on the Internet Computer. 

1. The [ETH starter tutorial](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial) is a great place to start. It provides a step-by-step guide on how to interact with Ethereum on the Internet Computer.

2. You can also check out the [Code ckETH](https://github.com/dfinity/ic/tree/master/rs/ethereum/cketh) and [Code ckBTC](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckbtc) for code samples on how to use these features.

3. The [DeFi sample code](https://internetcomputer.org/samples?selectedDomains=Asynchronous+DeFi) provides examples of decentralized finance applications that utilize the multi-chain features of the Internet Computer.

4. For more advanced topics, you can explore the [Multi-chain DeFi](https://internetcomputer.org/defi) page which discusses how the Internet Computer can be used for decentralized finance applications.

5. The [developer resources](https://internetcomputer.org/developers) page also provides a wealth of information, including documentation, sample code, tooling, and support.

Remember, the Internet Computer allows you to create smart contracts that directly interact with other blockchains without the need for trusted centralized bridges. This is made possible using chain key cryptography. You can learn more about this in the [wiki](https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC#firstHeading).

### How does ICP handle the integration of smart contracts across different chains?

Internet Computer Protocol (ICP) handles the integration of smart contracts across different chains through a process known as cross-chain interoperability. This is achieved through advanced cryptography, specifically threshold ECDSA and chain-key cryptography.

For instance, ICP can natively create signed transactions on other blockchains like Ethereum and Bitcoin, allowing decentralized applications (dapps) deployed on ICP to interact directly with other networks and their smart contracts, tokens, and other digital assets.

ICP has already integrated with the Bitcoin network using chain-key ECDSA signatures and a protocol-level integration. This allows a canister (a computational unit on the ICP) to create a Bitcoin address, then send or receive bitcoin directly as if they were a regular Bitcoin user.

ICP is also working on an integration with Ethereum that will allow Ethereum smart contracts and digital assets like ERC-20 tokens to be used in ICP canisters. This integration will involve a three-phase strategy, the first of which is already completed — where replicas can run ETH nodes that interact with smart contracts, i.e., ICP can send transactions to the ETH network with chain key signing and HTTP outcalls.

In the future, ICP aims to become fully compatible with the Ethereum Virtual Machine (EVM), enabling developers to deploy Ethereum smart contracts directly on the ICP network. This will be achieved through a protocol-level ETH integration, which will initially use HTTPS outcalls to interact with Ethereum APIs to securely query and send transactions to the Ethereum network. These HTTPS outcalls will eventually be replaced by an on-chain Ethereum API on ICP, made possible by running full Ethereum nodes on each ICP replica.

- [Cross-chain interoperability](https://internetcomputer.org/docs/current/tutorials/hackathon-prep-course/what-is-icp#cross-chain-interoperability)
- [DFINITY Wows the Crowd at ETHDenver](https://medium.com/dfinity/dfinity-wows-the-crowd-at-ethdenver-7389f265e0dd#ae85)
- [Full protocol integration](https://internetcomputer.org/ethereum-integration)

### Can I use my existing hardware wallets or mobile apps to manage my multi-chain assets on the Internet Computer?

You can see documenation here on using Ledger nanos and other hardware wallets: [hardware wallets](https://support.dfinity.org/hc/en-us/articles/8760495850900-How-do-I-use-my-Ledger-Nano-with-the-Internet-Computer).
