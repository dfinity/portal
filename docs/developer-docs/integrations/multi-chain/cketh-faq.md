# ckETH FAQ


## How do I write a smart contract that uses ckETH?

I'm sorry, but the provided extracts do not contain specific information or code examples on how to write a smart contract that uses ckETH. However, they do provide some general information about ckETH and how it works.

ckETH is the digital twin of ETH on the Internet Computer (ICP). It allows Ethereum holders to interact with the Internet Computer blockchain with significantly lower transaction fees. The process of acquiring ckETH involves depositing ETH to a specific function in the ckETH helper contract on Ethereum, which then triggers the ICP ckETH canister smart contract to mint the same amount of ckETH to the specified ICP principal or wallet address. This ckETH can then be used natively on the Internet Computer, and can be converted back to ETH at any time.

For more detailed information and potential code examples, I would recommend checking out the [ICP documentation](https://internetcomputer.org/docs), the [DFINITY forum](https://forum.dfinity.org), and the [ckETH minter documentation](https://github.com/dfinity/ic/blob/master/rs/ethereum/ckETH/minter/README.adoc).

## What is the purpose of ckETH? What specific problem does ckETH aim to solve within the ETH ecosystem?

ckETH, or chain-key Ether, is an Internet Computer (ICP)-native token that represents Ether (ETH), the native token of Ethereum. It serves as a digital twin of ETH on the Internet Computer blockchain. The purpose of ckETH is to address some of the challenges associated with using Ethereum, particularly in terms of usability and transaction costs.

One of the main issues it addresses is the high transaction fees (or "gas fees") on the Ethereum network. By allowing Ethereum holders to interact with ckETH on the Internet Computer, which has significantly lower gas fees, users can enjoy fast and cheap transactions. They can then convert back to Ethereum whenever they want to transact on the Ethereum network .

Another problem that ckETH aims to solve is the complexity and friction involved in using blockchain systems, particularly for mainstream users who are not familiar with the intricacies of tokens and wallets. The process of acquiring and using ckETH is designed to be straightforward and user-friendly, removing many of the barriers that can deter people from engaging with blockchain technology .

Furthermore, ckETH enables direct interaction between ICP canister smart contracts and Ethereum, bypassing potential attack vectors by directly calling Ethereum RPCs through HTTPS Outcalls .

In summary, ckETH aims to enhance the usability of the Ethereum ecosystem by providing a more accessible, cost-effective, and secure way for users to engage with blockchain technology.

: [A Data-Driven Exploration of ckETH](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197)
: [The Purposes of the Internet Computer](https://medium.com/dfinity/announcing-internet-computer-mainnet-and-a-20-year-roadmap-790e56cbe04a#0289)


## How does ckETH relate to ETH?How is ckETH different from a regular ETH transaction? Can I use ckETH just like I would use ETH?

ckETH, or chain-key Ether, is a digital representation of ETH on the Internet Computer blockchain. It's essentially a "twin" of ETH, but operates within the Internet Computer ecosystem. The relationship between ckETH and ETH is such that each ckETH is fully backed 1:1 by ETH.

The main difference between a ckETH transaction and a regular ETH transaction lies in the transaction fees and the blockchain they operate on. Regular ETH transactions occur on the Ethereum network and are subject to Ethereum's gas fees, which can be quite high. On the other hand, ckETH transactions occur on the Internet Computer blockchain, which has significantly lower transaction fees.

Yes, you can use ckETH just like you would use ETH, but within the Internet Computer ecosystem. You can deposit your ETH to a specific function in the ckETH helper contract on Ethereum, which then triggers the ICP ckETH canister smart contract to mint the same amount of ckETH to the specified ICP principal or wallet address. This ckETH can then be used natively on the Internet Computer, and can be converted back to ETH at any time.

However, it's important to note that while ckETH can be used in a similar manner to ETH, the platforms and services that accept ckETH might be different from those that accept ETH, as they are operating on different blockchains.

: [A Data-Driven Exploration of ckETH](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197)
: [How does ckETH work?](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#e978)
: [How to Acquire ckETH](https://medium.com/dfinity/how-to-acquire-ckETH-02d863c835fc#e10f)
: [Ethereum &lt;&gt; ICP > Multi-chain DeFi](https://internetcomputer.org/ethereum-integration)

## What are the benefits of using ckETH over traditional Bitcoin transactions? 

The benefits of using ckETH over traditional Bitcoin transactions primarily revolve around transaction speed, cost, and interoperability with the Internet Computer ecosystem.

1. **Lower Transaction Fees**: One of the main advantages of using ckETH is the significantly lower transaction fees compared to Bitcoin. Bitcoin transactions can sometimes be expensive, especially during periods of high network congestion. On the other hand, ckETH transactions occur on the Internet Computer blockchain, which has significantly lower transaction fees.

2. **Faster Transaction Speed**: The Internet Computer blockchain has a faster transaction speed compared to the Bitcoin network. This means that transactions using ckETH can be processed more quickly, providing a smoother and more efficient user experience.

3. **Interoperability**: ckETH allows for seamless interaction between the Ethereum and Internet Computer ecosystems. This interoperability can potentially unlock new use cases and applications, such as decentralized finance (DeFi) platforms that span multiple blockchains.

4. **Usability**: The process of acquiring and using ckETH is designed to be straightforward and user-friendly, removing many of the barriers that can deter people from engaging with blockchain technology.

However, it's important to note that while ckETH provides these benefits, it's not a direct replacement for Bitcoin or ETH. Each has its own unique features and use cases, and the choice between them will depend on your specific needs and circumstances.

: [A Data-Driven Exploration of ckETH](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197)
: [The Purposes of the Internet Computer](https://medium.com/dfinity/announcing-internet-computer-mainnet-and-a-20-year-roadmap-790e56cbe04a#0289)
: [Internet Computer for Ethereum Developers](https://wiki.internetcomputer.org/wiki/The_Internet_Computer_for_Ethereum_Developers#A_very_brief_introduction_to_the_Internet_Computer)
: [Extend Bitcoin, Ethereum and other blockchains](https://wiki.internetcomputer.org/wiki/Extend_Bitcoin,_Ethereum_and_other_blockchains#firstHeading)

## Why should I choose ckETH for my application or service? 

Choosing ckETH for your application or service can provide several benefits:

1. **No Need for Bridges**: ckETH, being a part of the Internet Computer blockchain, eliminates the need for bridges. It uses the HTTPS Outcalls feature, which allows ICP canister smart contracts to call API requests directly. This bypasses potential attack vectors by directly calling Ethereum RPCs through HTTPS Outcalls [[source]](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197).

2. **Lower Transaction Fees**: Ethereum holders can interact with ckETH on the Internet Computer, which has significantly lower gas fees than on Ethereum. This allows for more cost-effective transactions [[source]](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197).

3. **Manage an Ethereum Wallet Directly in an ICP Canister Smart Contract**: ICP canister smart contracts can create and manage an Ethereum wallet address using threshold ECDSA. This provides a seamless way to manage Ethereum wallets [[source]](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197).

4. **Seamless Conversion**: ckETH allows you to enjoy the benefits of fast and cheap transactions and higher security on the Internet Computer, while still being able to seamlessly convert back to your ETH anytime [[source]](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197).

5. **Multi-chain Environment**: The Internet Computer enables a multi-chain environment where centralized bridges are obsolete and smart contracts can seamlessly communicate across blockchains. This provides increased asset liquidity, expanded market access, improved scalability and throughput, and access to ICP’s unique capabilities [[source]](https://internetcomputer.org/ethereum-integration).

6. **Gasless Token Swaps**: Using ckETH, users can swap tokens for a few cents with 0 gas fees [[source]](https://internetcomputer.org/ethereum-integration).

7. **Web2 Integration**: Connect smart contracts to the world outside blockchain. Fetch real-time price data and more from Web2 [[source]](https://internetcomputer.org/ethereum-integration).

8. **Signing Ethereum Transactions**: ICP smart contracts are capable of offering the on-chain Ethereum full node API by using the HTTPS outcalls feature to securely query the Ethereum blockchain, and send transactions to it [[source]](https://internetcomputer.org/ethereum-integration).

In summary, ckETH provides a secure, cost-effective, and efficient way to interact with the Ethereum blockchain, making it a great choice for your application or service.

## What advantages does ckETH offer in terms of speed, fees, and security?

ckETH, or chain-key Ether, is an Internet Computer (ICP)-native token that represents Ether (ETH), the native token of Ethereum. It offers several advantages in terms of speed, fees, and security:

1. **Speed:** ckETH transactions on the Internet Computer have significantly lower latency compared to Ethereum. They can be transferred with 1-2 seconds finality, making them almost instant .

2. **Fees:** Ethereum holders can interact with ckETH on the Internet Computer, which has significantly lower gas fees than on Ethereum. Users can swap tokens for a few cents with 0 gas fees .

3. **Security:** ckETH bypasses attack vectors by directly calling Ethereum RPCs through HTTPS Outcalls, a feature that enables ICP canister smart contracts to call API requests directly. This minimizes the risk of data leaks, hacks, and breaches . Additionally, issuing and redeeming ckETH goes through Know Your Transaction (KYT) checks to ensure no tainted bitcoin enters the Internet Computer blockchain or is transferred out to tainted Bitcoin addresses .

4. **Integration:** ckETH can be directly processed by smart contracts hosted on the Internet Computer, and can be seamlessly converted back to ETH anytime .

Sources:
: [Internet Computer for Ethereum Developers](https://wiki.internetcomputer.org/wiki/The_Internet_Computer_for_Ethereum_Developers#mw-toc-heading)
: [A data-driven exploration of ckETH](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197)
: [How to Acquire ckETH](https://medium.com/dfinity/how-to-acquire-ckETH-02d863c835fc#c324)
: [Trustless multi-chain on ICP](https://internetcomputer.org/multichain)
: [Ethereum &lt;&gt; ICP](https://internetcomputer.org/ethereum-integration)
: [Multi-chain DeFi](https://internetcomputer.org/defi)
: [Why Bitcoin needs smart contracts](https://medium.com/dfinity/why-bitcoin-needs-smart-contracts-5191fbec294a#acf6)

## How can I integrate ckETH into my existing applications or platforms?

To integrate ckETH into your existing applications or platforms, you can follow these steps:

1. **Obtain an ICP principal or wallet address.**
2. **Deposit your ETH**: Ethereum holders can deposit Ether to the *deposit* function in the ckETH helper contract on Ethereum and specify their ICP principal or wallet address where they want their minted ckETH to appear.
3. **Mint ckETH**: The ICP ckETH canister smart contract will then mint the same amount of ckETH to the indicated ICP principal or wallet address.
4. **Use ckETH**: The ICP principal or wallet address can now use ckETH natively on the Internet Computer.
5. **Convert back to ETH any time**: When the ICP principal wants to convert ckETH back to ETH, they can request the ckETH canister smart contract with the ETH amount and Ethereum address to which they want to send the ETH.

You can learn more about how ckETH works from this [DFINITY forum post](https://forum.dfinity.org/t/ckETH-a-canister-issued-ether-twin-token-on-the-ic/22819).

Please note that the ckETH integration is part of a larger Ethereum integration on ICP. You can learn more about the Ethereum integration on ICP from this [website page](https://internetcomputer.org/ethereum-integration).

Also, remember that the Internet Computer makes it possible to build almost any online service fully on-chain, in a full stack decentralization model. This is because canister smart contracts can hold up to 400GiB of memory each, and run in parallel with great efficiency. Moreover, they can directly serve interactive web-based user experiences to users by processing HTTP requests, thanks to ICP’s reverse-gas model (canister smart contracts pay for their own execution using “cycles” that they have been charged with). Now they can also be trustlessly combined with DeFi and other functionality Ethereum hosts in a World Computer paradigm. You can learn more about this from [here](https://internetcomputer.org/multichain).

## What are the technical requirements for developers to work with ckETH?

Hmm, I don't know enough to give you a confident answer yet. The extracts provided do not contain specific technical requirements for developers to work with ckETH. However, they do provide a general process of how Ethereum holders can acquire and use ckETH. 

Here's a brief overview based on the extracts:

1. Obtain an ICP principal or wallet address.
2. Deposit your ETH to the deposit function in the ckETH helper contract on Ethereum and specify your ICP principal or wallet address where you want your minted ckETH to appear.
3. The ICP ckETH canister smart contract will then mint the same amount of ckETH to your ICP principal or wallet address.
4. You can now use ckETH natively on the Internet Computer.
5. You can convert ckETH back to ETH any time by requesting the ckETH canister smart contract with the ETH amount and Ethereum address to which you want to send the ETH.

For more detailed information, you might want to check out the [DFINITY forum post](https://forum.dfinity.org/t/ckETH-a-canister-issued-ether-twin-token-on-the-ic/22819) mentioned in the extracts.

## How does ckETH ensure the security of the funds it handles?

ckETH, the digital twin of Ether (ETH) on the Internet Computer (ICP), ensures the security of the funds it handles in several ways:

1. **No Need for Bridges**: ckETH uses a feature called HTTPS Outcalls that enables ICP canister smart contracts to call API requests directly. This bypasses attack vectors by directly calling Ethereum RPCs, eliminating the need for potentially insecure bridges. [source](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197)

2. **Managing an Ethereum Wallet Directly in an ICP Canister Smart Contract**: ICP canister smart contracts can create and manage an Ethereum wallet address using threshold ECDSA. This means that the ICP ckETH minter canister smart contract can generate an address that holds ETH and signs transactions, adding an extra layer of security. [source](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197)

3. **NNS DAO Governance**: The development of ckETH includes measures to guarantee long-term maintenance and provide more security to ETH through NNS DAO governance. This ensures that the management and development of ckETH are in the hands of a decentralized community, reducing the risk of malicious actions by a single party. [source](https://medium.com/dfinity/global-r-d-may-2023-edition-d96859039ca6#a28d)

4. **Chain-Key Signatures**: The Internet Computer has the ability to sign native transactions on other blockchains without using risky bridges. This feature is used in the operation of ckETH, further enhancing its security. [source](https://internetcomputer.org/defi)

Remember, while these features enhance the security of ckETH, it's always important to exercise caution and good security practices when dealing with cryptocurrencies.

## Can I trust that my funds are safe when using ckETH?

Yes, you can trust that your funds are safe when using ckETH. The Internet Computer blockchain offers several features that enhance the security and trustworthiness of its canister smart contracts, such as ckETH.

1. **No need for bridges**: The Internet Computer's HTTPS Outcalls feature allows ICP canister smart contracts to directly call API requests, bypassing potential attack vectors associated with bridges [source](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197).

2. **Managing an Ethereum wallet directly in an ICP canister smart contract**: ICP canister smart contracts can create and manage an Ethereum wallet address, enhancing security [source](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197).

3. **Chain key remote procedure calls (ckRPCs)**: This feature allows Internet Computer canister smart contracts to directly call into Ethereum smart contracts, enabling the creation of advanced, fully decentralized Web3 services [source](https://internetcomputer.org/multichain).

4. **Trust in canisters**: Confidence in the safety of entrusting ICPs to a canister comes from two dimensions: confidence that the canister does what it is supposed to do, and confidence that the canister behavior will not unexpectedly change [source](https://wiki.internetcomputer.org/wiki/Trust_in_canisters#firstHeading).

5. **Fully backed by ETH**: The total value of ckETH is fully backed 1:1 by ETH, and this can always be verified by viewing the on-chain dashboard and metrics of the canisters [source](https://internetcomputer.org/ethereum-integration).

However, as with any blockchain technology, it's important to do your own research and understand the risks involved.

## Can I build smart contracts that interact with ckETH? What kind of functionalities can these smart contracts provide?

Yes, you can build smart contracts that interact with ckETH on the Internet Computer. These smart contracts, also known as canisters, can provide a wide range of functionalities. Here are some of the key capabilities:

1. **Minting ckETH**: When you deposit your ETH to the ckETH helper contract on Ethereum, the ICP ckETH canister smart contract will mint the same amount of ckETH to your specified ICP principal or wallet address .

2. **Using ckETH**: Once the ckETH is minted, it can be used natively on the Internet Computer. This means that your smart contracts can interact with ckETH just like they would with any other token on the Internet Computer .

3. **Converting ckETH back to ETH**: If you want to convert your ckETH back to ETH, you can do so by requesting the ckETH canister smart contract with the ETH amount and Ethereum address to which you want to send the ETH .

4. **Interacting with Ethereum smart contracts**: Smart contracts on the Internet Computer can interact with Ethereum smart contracts. This is made possible by the Internet Computer's ability to make HTTPS outcalls to Ethereum APIs to securely query and send transactions to the Ethereum network .

5. **Managing an Ethereum wallet**: ICP canister smart contracts can create and manage an Ethereum wallet address using threshold ECDSA. This means that your smart contracts can hold ETH and sign transactions .

6. **Processing and storing large volumes of data**: Smart contracts on the Internet Computer can process and store large volumes of data at a relatively stable cost that is a tiny fraction of that on traditional blockchain .

7. **Serving web experiences directly to end users**: Smart contracts on the Internet Computer can serve web experiences directly to end users, providing end-to-end blockchain security .

8. **Creating and managing other Ethereum asset twins**: In addition to ckETH, you can also create and manage "twins" of other Ethereum assets, such as ckUSDC, ckUSDT, ckUNISWAP, ck1INCH, ckAAVE .

Please note that the ICP ETH integration is still in development, and more functionalities will be added in the future .

: [Source](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#e978)
: [Source](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197)
: [Source](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial#overview)
: [Source](https://medium.com/dfinity/internet-computer-ethereum-integration-explained-6967456e35f9#58f6)
: [Source](https://internetcomputer.org/multichain)
: [Source](https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC#firstHeading)

## What are the transaction fees associated with ckETH?

The transaction fees associated with ckETH on the Internet Computer are significantly lower compared to those on Ethereum. This is one of the key advantages of using ckETH. 

When you use ckETH on the Internet Computer, you can send and receive ETH value on ICP DEXs for a few cents with 1-2s finality, and no gas fees . This is in contrast to Ethereum, where the average transaction fees for USDC and USDT were $4.21 and $5.46 respectively in June 2023 .

Moreover, the "chain key" versions of Ethereum assets, including ckETH, live on ledgers created by Internet Computer smart contracts, where they can be transferred with 1 second finality and at near zero cost .

Please note that while the transaction fees on the Internet Computer are low, there may still be costs associated with converting ETH to ckETH and vice versa, as well as interacting with Ethereum smart contracts from the Internet Computer .

: [Source](https://internetcomputer.org/ethereum-integration)
: [Source](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#b197)
: [Source](https://medium.com/dfinity/a-data-driven-exploration-of-ckETH-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#e978)
: [Source](https://internetcomputer.org/multichain)

## How quickly can transactions be finalized?

The Internet Computer blockchain is designed to finalize transactions very quickly. Specifically, it can finalize transactions that update canister smart contract state in 1–2 seconds . This is a significant improvement over traditional blockchains like Bitcoin and Ethereum, which can take much longer to finalize transactions.

In addition, the Internet Computer splits canister function execution into two types: "update calls" and "query calls". Update calls, which we are already familiar with, take 1–2 seconds to finalize their execution. On the other hand, query calls work differently because any changes they make to state are discarded after they run. This allows query calls to execute in milliseconds .

Furthermore, the Internet Computer is capable of processing up to 11,500 transactions per second, executed with an average 1-second finality on dapp subnets and a 2-second finality on the Network Nervous System (NNS) subnet .

: [Source](https://support.dfinity.org/hc/en-us/articles/360057605551-What-is-chain-key-cryptography-)
: [Source](https://medium.com/dfinity/the-internet-computer-road-to-mercury-mainnet-launch-c54c1712788b#de53)
: [Source](https://medium.com/dfinity/announcing-internet-computer-mainnet-and-a-20-year-roadmap-790e56cbe04a#0513)
: [Source](https://medium.com/dfinity/the-internet-computers-transaction-speed-and-finality-outpace-other-l1-blockchains-8e7d25e4b2ef#c365)
: [Source](https://medium.com/dfinity/the-internet-computers-transaction-speed-and-finality-outpace-other-l1-blockchains-8e7d25e4b2ef#8a57)

## Who controls the development and governance of ckETH?

The development and governance of ckETH, the digital twin of ETH on the Internet Computer (ICP), is managed by the ICP ecosystem. The ICP ckETH canister smart contract is responsible for minting ckETH and managing the conversion of ckETH back to ETH. 

The governance of the Internet Computer, and by extension ckETH, is decentralized. The evolution of the system depends on the governance mechanism that defines how a system can change. In the case of the Internet Computer, the NNS canisters define the governance mechanisms, including the parameters for staking, voting, and rewards. Users can stake ICP to participate in voting. The DFINITY foundation and the ICA are the parties with the highest voting power in the ecosystem, together holding less than 23% of the total voting power.

For more information on the governance and tokenomics of the Internet Computer, you can refer to the [Internet Computer Wiki](https://wiki.internetcomputer.org/wiki/NNS_Canisters) and [Tokenomics of a DAO](https://wiki.internetcomputer.org/wiki/Tokenomics_of_a_DAO).

: [Internet Computer Wiki - Decentralization](https://wiki.internetcomputer.org/wiki/Decentralization#firstHeading)

## Can you provide examples of current applications that utilize ckETH?


# What is the current state of ckETH project?

As of the latest updates from the provided extracts, ckETH is live on the Internet Computer mainnet. It has been added to the ICP dashboard and is also supported in the ICRC-1 wallet. However, with the current ckETH integration, you cannot withdraw to ETH directly from the ICRC-1 wallet. 

The DFINITY R&D teams and members of the ecosystem are working on enhancing the Ethereum with Internet Computer capabilities. The integration is being carried out in phases. Phase 0, which enables chain-key signing and HTTPS outcalls, is already complete. Phase 1 is being built to allow ETH API calls by accessing Web-2 based API providers through HTTPS outcalls. This phase also includes designing and building ckETH and ckERC-20 tokens. The final phase, Phase 2, will revolve around native ETH integration.

For more information on the current state of the ckETH project, you can join the forum discussion or check out the Ethereum integration page on the Internet Computer website.

: [Internet Computer Blog - ckETH: now live!](https://internetcomputer.org/blog/2023/12/06/news-and-updates/update#ckETH-now-live)
: [Dfinity - Global R&D: May 2023 Edition - ETH Integration: Status update](https://medium.com/dfinity/global-r-d-may-2023-edition-d96859039ca6#a28d)
: [Ethereum &lt;&gt; ICP - Multi-chain DeFi](https://internetcomputer.org/ethereum-integration)
: [Ethereum &lt;&gt; ICP - Build your own Ethereummulti-chain solution - Tutorial](https://internetcomputer.org/ethereum-integration)
