# User facing FAQ


## How do I convert CKBTC to BTC and vice versa?

To convert Bitcoin (BTC) to Chain-key Bitcoin (ckBTC), follow these steps:

1. Go to the NNS frontend dapp and sign in with your Internet Identity. If you don't have one, you will be prompted to create one. Any device that supports WebAuthn can be used as a passkey for II. Alternatively, you can use a YubiKey or a Ledger device.
2. Navigate to My Tokens and select ckBTC.
3. Click on Receive on the bottom of the screen.
4. Send BTC to your NNS BTC address. Once you see this pop up window, you can copy your NNS BTC address, and send BTC there. Note, that since this is a real bitcoin transaction, it will take roughly an hour, and have the Bitcoin network's transaction fees. Once you acquire ckBTC, you can take advantage of its near instant finality (1-2s) and negligible transaction fees (10 satoshis).

For more details, you can refer to this [support document](https://support.dfinity.org/hc/en-us/articles/20708056282132-What-is-ckBTC#h_01HE64A4QKANB6JX8VERRP5Y80).

To convert ckBTC back to BTC, follow these steps:

1. The user makes the desired ckBTC amount available to the ckBTC minter and requests a conversion. The destination Bitcoin address undergoes a KYT check. If the check is successful, the request is accepted and put into a queue.
2. The ckBTC minter periodically attempts to submit transactions for validated transfer requests.
3. The ckBTC minter periodically checks which transactions went through and finalizes these transactions.
4. The ckBTC minter can resubmit a transaction that has been pending for at least one day with a higher fee.

For more details, you can refer to this [wiki page](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading).

Please note that every step of converting BTC to ckBTC and back is decentralized, meaning there are no centralized custodians, no bridges and no traditional cloud providers that could act as attack vectors. Issuing and redeeming ckBTC goes through Know Your Transaction (KYT) checks to ensure no bitcoin enters the Internet Computer that is associated with criminal activity.


## How do I receive CKBTC or BTC in my wallet?

To receive Chain-key Bitcoin (ckBTC) or Bitcoin (BTC) in your wallet, you can follow these steps:

For ckBTC:
1. You can acquire ckBTC by swapping it for ICP on decentralized exchanges running on the Internet Computer, such as [ICDex](http://icdex.io/) or [ICPSwap](https://icpswap.com/).
2. Alternatively, you can convert BTC to ckBTC by simply sending BTC to your NNS wallet. This functionality is also available on [ICDex](http://icdex.io/) and [ICPSwap](https://icpswap.com/), where you can convert your BTC to ckBTC directly using the ckBTC canisters.

For BTC:
1. To convert ckBTC to BTC using the NNS wallet, follow these steps:
   - Go to the NNS frontend dapp and sign in with your Internet Identity. If you don't have one, you will be prompted to create one. Any device that supports WebAuthn can be used as a passkey for II. Alternatively, you can use a YubiKey or a Ledger device.
   - Navigate to "My Tokens" and select ckBTC. If you have ckBTC in a different wallet, send it to your NNS principal.
   - Click on "Send" on the bottom of the screen.
   - Paste a valid BTC address that you control into the "Destination" field.
   - Select Bitcoin from the "Network" dropdown.
   - Type in the amount you want to send or click "Max".
   - Click "Continue", then confirm the transaction.

Please note that ckBTC is a token on the Internet Computer that is backed 1:1 by bitcoin (BTC) such that 1 ckBTC can always be redeemed for 1 BTC and vice versa. It does not rely on a third-party bridge for the conversion between BTC and ckBTC, making it a substantially more secure alternative to “wrapped” tokens.

Sources:
- [Bitcoin-integration FAQ](https://internetcomputer.org/bitcoin-integration/faq#bitcoin-integration)
- [Chain-key Bitcoin Wiki](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)


## How do I send CKBTC?

To send ckBTC, you can follow these steps using your NNS wallet:

1. Go to the NNS frontend dapp and sign in with your Internet Identity. If you don't have one, you will be prompted to create one. Any device that supports WebAuthn can be used as a passkey for II. Alternatively, you can use a YubiKey or a Ledger device.
2. Navigate to "My Tokens" and select ckBTC. If you have ckBTC in a different wallet, send it to your NNS principal.
3. Click on "Send" on the bottom of the screen.
4. Paste a valid BTC address that you control into the "Destination" field.
5. Select Bitcoin from the "Network" dropdown.
6. Type in the amount you want to send or click "Max".
7. Click "Continue", then confirm the transaction.

For more details, you can refer to the [source](https://internetcomputer.org/bitcoin-integration/faq#bitcoin-integration).

## How do I send BTC  ?

You can send Bitcoin (BTC) using the `send` endpoint on your canister. Here's a step-by-step guide:

1. In the Candid UI, add a destination address and an amount to send. 

2. Via command line, the same call would look like this:
```bash
dfx canister --network=ic call basic_bitcoin send '(record { destination_address = "tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt"; amount_in_satoshi = 4321; })'  
```
This command sends 4'321 Satoshi (0.00004321 BTC) to the specified address.

The `send` endpoint works by:

- Getting the percentiles of the most recent fees on the Bitcoin network using the `bitcoin_get_current_fee_percentiles` API.
- Fetching your unspent transaction outputs (UTXOs), using the `bitcoin_get_utxos` API.
- Building a transaction, using some of the UTXOs from step 2 as input and the destination address and amount to send as output. The fee percentiles obtained from step 1 is used to set an appropriate fee.
- Signing the inputs of the transaction using the `sign_with_ecdsa` API.
- Sending the signed transaction to the Bitcoin network using the `bitcoin_send_transaction` API.

The `send` endpoint returns the ID of the transaction it sent to the network. You can track the status of this transaction using a block explorer. Once the transaction has at least one confirmation, you should be able to see it reflected in your current balance.

For more details, you can refer to the [Internet Computer documentation](https://internetcomputer.org/docs/current/samples/deploying-your-first-bitcoin-dapp#step-5-sending-bitcoin).

## How do I convert ckETH to ETH and vice versa?

To convert ETH to ckETH and vice versa, you can follow these steps:

**To convert ETH to ckETH:**

1. Obtain an ICP principal or wallet address.
2. Deposit your ETH: Ethereum holders can deposit Ether to the deposit function in the ckETH helper contract on Ethereum 0x7574eB42cA208A4f6960ECCAfDF186D627dCC175 and specify their ICP principal or wallet address where they want their minted ckETH to appear.
3. Mint ckETH: The ICP ckETH canister smart contract will then mint the same amount of ckETH to the indicated ICP principal or wallet address.
4. Use ckETH: The ICP principal or wallet address can now use ckETH natively on the Internet Computer.

**To convert ckETH back to ETH:**

1. When the ICP principal wants to convert ckETH back to ETH, they can request the ckETH canister smart contract with the ETH amount and Ethereum address to which they want to send the ETH. The wallet address 0xb25eA1D493B49a1DeD42aC5B1208cC618f9A9B80 will send the ETH to the wallet address noted here.

Please note that with the current ckETH integration, you will not be able to withdraw to ETH directly from the ICRC-1 wallet. This is because the ICRC-1 wallet does not support the withdrawal process (withdraws are supported in the ICRC-2 standard). To withdraw ckETH for ETH, you can send your ckETH to your dfx principal, then withdraw from there following [these steps](https://github.com/timohanke/ic/blob/d34903fc2c41e2cff5df86248628f5d0b4fd7168/rs/ethereum/cketh/minter/README.adoc#withdrawal-cketh-to-eth).

For more information, you can check out these sources: [source 1](https://medium.com/dfinity/how-to-acquire-cketh-02d863c835fc#e10f), [source 2](https://medium.com/dfinity/a-data-driven-exploration-of-cketh-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#e978), [source 3](https://internetcomputer.org/blog/2023/12/06/news-and-updates/update#cketh-now-live).

## Can I convert ICP to CKBTC?

Yes, you can convert ICP to ckBTC. There are two main ways of acquiring ckBTC:

1. **Swap on DEXs:** If you have ICP, you can swap it for ckBTC on decentralized exchanges running on the Internet Computer, including [ICDex](http://icdex.io/) or [ICPSwap](https://icpswap.com/).

2. **Convert directly on the protocol:** You can also convert ICP to ckBTC directly using the ckBTC canisters on the protocol.

For more details, you can refer to the [source](https://internetcomputer.org/bitcoin-integration/faq#bitcoin-integration).

Can I convert ICP to CKETH?

Based on the information provided in the extracts, there are no direct instructions on how to convert ICP to ckETH. However, Ethereum holders can acquire ckETH by following these steps:

1. Deposit your ETH: Ethereum holders can deposit Ether to the deposit function in the ckETH helper contract on Ethereum and specify their ICP principal or wallet address where they want their minted ckETH to appear.
2. Mint ckETH: The ICP ckETH canister smart contract will then mint the same amount of ckETH to the indicated ICP principal or wallet address.
3. Use ckETH: The ICP principal or wallet address can now use ckETH natively on the Internet Computer.
4. Convert back to ETH any time: When the ICP principal wants to convert ckETH back to ETH, they can request the ckETH canister smart contract with the ETH amount and Ethereum address to which they want to send the ETH.

For more details, you can refer to these sources: [source 1](https://medium.com/dfinity/a-data-driven-exploration-of-cketh-the-digital-twin-of-ether-on-the-internet-computer-36b762be72e7#e978), [source 2](https://medium.com/dfinity/how-to-acquire-cketh-02d863c835fc#e10f).

Please note that you should have Ethereum (ETH) to acquire ckETH. If you have ICP and want to convert it to ckETH, you may need to first convert your ICP to ETH through a cryptocurrency exchange that supports ICP to ETH trading.

Can I convert ICP to BTC?

The Internet Computer (ICP) is integrated with the Bitcoin network at the protocol level, allowing canister smart contracts to create Bitcoin addresses and send and receive bitcoin directly on the Bitcoin network. However, the extracts do not provide specific information on converting ICP tokens directly to BTC. 

You might be able to trade ICP for BTC on a decentralized exchange (DEX) running on the Internet Computer, such as ICDex. ICDex supports ICP's native Bitcoin integration, allowing you to buy ICP using your BTC. However, the reverse operation (selling ICP for BTC) is not explicitly mentioned in the extracts.

For more detailed information, you may want to refer to the official documentation or forums of the Internet Computer project.

Sources:
- [Bitcoin Integration on ICP](https://internetcomputer.org/bitcoin-integration)
- [ICDex](https://icdex.io)

## How high are the fees?

The transaction fees for ckBTC on the Internet Computer (ICP) are designed to be minimal. It is set at 0.0000001 ckBTC, which is equivalent to less than a cent or 10 satoshis. Users only need to pay the transaction fees of the Bitcoin network when converting Bitcoins to ckBTC or vice versa[^1^].

When calling `retrieve_btc`, the formula for the ckBTC minter fee is determined as follows:
```
246*in + 7*out + 52 satoshi
```
This formula is used to determine the ckBTC minter’s fee in satoshi. Since every transaction has at least one input and one output, the fee is at least 305 satoshi[^2^].

There is also a Know Your Transaction (KYT) fee, currently set at 2000 satoshi, when converting BTC to ckBTC and vice versa[^3^].

[^1^]: [Source](https://medium.com/dfinity/how-ckbtc-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#f847)
[^2^]: [Source](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)
[^3^]: [Source](https://wiki.internetcomputer.org/wiki/Chain-key_Bitcoin#firstHeading)

##  Where and how can I see the transactions for CKBTC or BTC transactions on ICP?

You can view the transactions for ckBTC or BTC on the Internet Computer through the Internet Computer Dashboard. 

For ckBTC transactions, you can get this information directly from the respective index canister. The ckBTC Index Canister can be accessed through this link: [Canister: ckBTC Index - ICP Dashboard](https://dashboard.internetcomputer.org/canister/n5wcd-faaaa-aaaar-qaaea-cai)[^1^].

For ICP transactions, the [ICP Transactions](https://dashboard.internetcomputer.org/transactions) page provides a real-time log of all purchases and transfers of ICP. Each transaction is given its own specific hash, and is logged with the appropriate sender ID, receiver ID, amount, fee, and timestamp[^2^].

Furthermore, all ckBTC transactions are transparent and can be verified through a [real-time dashboard](https://dashboard.internetcomputer.org/bitcoin/transactions), offering users and developers immediate insight into the flow of assets and the integrity of the conversion process[^3^].

[^1^]: [Source](https://forum.dfinity.org/t/25504)
[^2^]: [Source](https://support.dfinity.org/hc/en-us/articles/6188295625748-What-is-the-Internet-Computer-Dashboard)
[^3^]: [Source](https://medium.com/dfinity/how-ckbtc-solves-the-dilemma-of-blockchain-bridges-ee8e0b72ee59#7ee8)

##  How does ICP enable seamless transactions across different blockchains like CKBTC, CKETH, and Bitcoin integration?

The Internet Computer (ICP) enables seamless transactions across different blockchains like ckBTC, ckETH, and Bitcoin through a combination of advanced cryptography and protocol-level integration.

1. **Protocol-Level Integration**: ICP integrates with other blockchain networks at a protocol level. This means ICP canister smart contracts can create Bitcoin addresses as well as send and receive bitcoin directly on the Bitcoin network[^1^]. This integration allows for dapps deployed on ICP to interact directly with other networks and their smart contracts, tokens, and other digital assets[^2^].

2. **Chain-Key Cryptography**: Through threshold ECDSA, coupled with chain-key cryptography, ICP can natively create signed transactions on other blockchains like Ethereum and Bitcoin[^2^]. Chain key crypto enables blockchains to create public "chain keys", for which their nodes can create corresponding signatures[^3^].

3. **Chain-Key Tokens**: The Internet Computer has the ability to sign native transactions on other blockchains without using risky bridges. Users can seamlessly swap between BTC/ETH in seconds for a few cents with 0 gas fees by using ckBTC, ckETH, and soon ckERC-20 tokens[^4^].

4. **Multi-chain DeFi**: The Internet Computer provides an unmatched tech stack for DEXs to thrive on and DeFi to flourish. DeFi platforms can exist 100% on the blockchain with no dependency on centralized components[^4^].

5. **Future Integration with Ethereum**: ICP is also working on an integration with Ethereum that will allow Ethereum smart contracts and digital assets like ERC-20 tokens to be used in ICP canisters[^2^]. This integration will include capabilities such as interacting with Ethereum smart contracts from canisters on ICP, creating ckETH and ckERC-20 tokens, which can be swapped with negligible fees[^5^].

[^1^]: [Source](https://internetcomputer.org/bitcoin-integration/faq#bitcoin-integration)
[^2^]: [Source](https://internetcomputer.org/docs/current/tutorials/hackathon-prep-course/what-is-icp#cross-chain-interoperability)
[^3^]: [Source](https://wiki.internetcomputer.org/wiki/Introduction_to_ICP#firstHeading)
[^4^]: [Source](https://internetcomputer.org/defi)
[^5^]: [Source](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial#overview)


##  Can I use ICP to perform cross-chain atomic swaps or transfers between CKBTC and ETH?

Yes, you can perform cross-chain swaps or transfers between ckBTC and ETH using the Internet Computer (ICP). ICP has integrated with the Bitcoin network and is in the process of integrating with the Ethereum network. This integration allows for seamless communication between these networks and ICP, enabling multi-chain functionality.

ICP uses advanced cryptography, including chain-key cryptography and threshold ECDSA, to create signed transactions on other blockchains like Ethereum and Bitcoin. This allows for dapps deployed on ICP to interact directly with other networks and their smart contracts, tokens, and other digital assets. 

For swapping between tokens such as ckBTC and ETH, you can use tools like [ICPSwap](https://app.icpswap.com/swap), [Sonic](https://www.sonic.ooo/), and [ICLight](https://iclight.io/). On these platforms, you can select the type of token you'd like to swap and the token you'd like to receive in return.

Furthermore, ICP's Ethereum integration will include the creation of ckETH and ckERC-20 tokens, which can be swapped with negligible fees. This integration will also allow Ethereum smart contracts and digital assets like ERC-20 tokens to be used in ICP canisters.

Please note that the Ethereum integration is still in development, and the full functionality may not be available yet. You can learn more about cross-chain integrations in the [documentation](https://internetcomputer.org/bitcoin-integration/).

Sources:
- [Internet Computer Documentation](https://internetcomputer.org/docs/current/tutorials/hackathon-prep-course/integrating-with-tokens#swapping-between-tokens)
- [Internet Computer Ethereum Integration](https://internetcomputer.org/ethereum-integration)
- [Internet Computer Developer Journey](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial#overview)

## Is there a user interface for managing my multichain assets on the Internet Computer?

The extracts provided do not specifically mention a user interface for managing multichain assets on the Internet Computer. However, they do mention that the Internet Computer enables the creation of decentralized applications and services that can interact with multiple blockchains. These applications could potentially provide a user interface for managing multichain assets.

For example, canister smart contracts on the Internet Computer can interact with other blockchains like Bitcoin and Ethereum, and process their tokens. They can also create accounts on any other blockchain and sign transactions that can run on their networks. This functionality could be used to build a user interface for managing multichain assets.

However, without more specific information, it's not possible to provide a definitive answer. For more details, you may want to check the [Internet Computer documentation](https://internetcomputer.org/docs) or ask on the [DFINITY forum](https://forum.dfinity.org).

## How does ICP ensure the security and privacy of my cross-chain transactions?

Internet Computer (ICP) ensures the security and privacy of your cross-chain transactions through several mechanisms:

1. **Cross-chain Interoperability**: ICP can directly integrate with other blockchain networks like Bitcoin and Ethereum without using bridges, thanks to its advanced cryptography. This is achieved through threshold ECDSA and chain-key cryptography, which allow ICP to natively create signed transactions on other blockchains. This means that dapps deployed on ICP can interact directly with other networks and their smart contracts, tokens, and other digital assets, without the need for intermediaries[^1^].

2. **Bitcoin Integration**: ICP's native Bitcoin integration allows canisters (advanced smart contracts) to interact with the Bitcoin network at the protocol level. This means they can directly receive, hold, and send BTC on the Bitcoin mainnet without using intermediaries and third-party blockchain bridges, which often have security issues[^2^]. Canisters can read from and write to the Bitcoin ledger[^2^][^3^].

3. **Ethereum Integration**: ICP aims for a native integration with the Ethereum network by running Ethereum nodes co-located with ICP nodes. This integration increases security because all data fetched from RPC providers gets cryptographically verified[^4^]. ICP is also working on native Ethereum integration, which will allow ICP smart contracts to securely query the Ethereum blockchain and send transactions to it[^6^].

4. **Chain-key Cryptography**: ICP uses chain-key cryptography to sign native transactions on other blockchains. This set of cryptographic protocols allows ICP to securely communicate across chains[^5^].

5. **Platform Privacy**: The Internet Computer runs a decentralized network, where data and computation are replicated across nodes in data centers located around the world. This decentralized structure ensures availability and integrity. Communication with the Internet Computer relies on a set of boundary nodes, which can see the IP address of the sending user, as well as which canister the user is sending it to and the payload. All communication to the Internet Computer and within it is encrypted[^7^].

[^1^]: [Internet Computer Docs](https://internetcomputer.org/docs/current/tutorials/hackathon-prep-course/what-is-icp#cross-chain-interoperability)
[^2^]: [Dfinity Blog - How ICP’s Bitcoin Integration Secures Private Keys Part 1](https://medium.com/dfinity/how-icps-bitcoin-integration-secures-private-keys-c2af14597846#6a5c)
[^3^]: [Dfinity Blog - How ICP’s Bitcoin Integration Secures Private Keys Part 2](https://medium.com/dfinity/how-icps-bitcoin-integration-secures-private-keys-c2af14597846#6a5c)
[^4^]: [Dfinity Blog - Securing cross-chain communication from Ethereum to the Internet Computer with an on-chain Light Client](https://medium.com/dfinity/securing-cross-chain-communication-from-ethereum-to-the-internet-computer-with-an-on-chain-light-fedfb4fb24b4#1329)
[^5^]: [Dfinity Blog - Chain-Key Bitcoin: A Decentralized Bitcoin Twin](https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e#99f9)
[^6^]: [Internet Computer Ethereum Integration](https://internetcomputer.org/ethereum-integration)
[^7^]: [Dfinity Blog - The Internet Computer Blockchains Privacy Advantages](https://medium.com/dfinity/the-internet-computer-blockchains-privacy-advantages-73340c6c42db#6ec2)

##  Can I track the status of my multichain transactions on the Internet Computer dashboard?

Yes, you can track the status of your transactions on the Internet Computer dashboard. The [ICP Transactions](https://dashboard.internetcomputer.org/transactions) page provides a real-time log of all purchases and transfers of ICP. When you purchase ICP through an exchange or transfer ICP between hardware wallets, this page will populate with that transaction information. Each transaction is given its own specific hash, and is logged with the appropriate sender ID, receiver ID, amount, fee, and timestamp. This information is easily accessible and crucial for transparency.

However, the extracts provided do not specify whether the dashboard supports tracking of multichain transactions. For more detailed information, you may want to refer to the [Internet Computer Dashboard](https://dashboard.internetcomputer.org/) directly.

Sources:
- [What is the Internet Computer Dashboard?](https://support.dfinity.org/hc/en-us/articles/6188295625748-What-is-the-Internet-Computer-Dashboard)
- [The Internet Computer Dashboard: Decentralization, Governance, Tokenomics, and More](https://medium.com/dfinity/the-internet-computer-dashboard-decentralization-governance-tokenomics-and-more-da4abb36f15f#ec91)

##  What are the steps involved in setting up a multichain wallet on the Internet Computer?

Hmm, I don't know enough to give you a confident answer yet. The extracts provided do not contain specific steps on setting up a multichain wallet on the Internet Computer. However, they do mention the possibility of creating on-chain or hybrid multi-signature wallets that control assets not only on the IC, but also on other platforms using the Bitcoin integration. 

For more detailed information, I recommend checking out the [Internet Computer Developer Documentation](https://smartcontracts.org/docs/current/developer-docs/quickstart/hello10mins) or the [Internet Computer Ecosystem](https://internetcomputer.org/ecosystem) page.

##  How does ICP handle the conversion of tokens between different chains, such as converting ICP to CKBTC?

The Internet Computer (ICP) provides a mechanism to swap between tokens, such as ICP, an ICRC-1 token, or a chain-key token such as ckBTC or ckETH. Tools like [ICPSwap](https://app.icpswap.com/swap), [Sonic](https://www.sonic.ooo/), and [ICLight](https://iclight.io/) can be used for this purpose. On ICPSwap, for instance, you can connect to the dapp with several different wallet types, such as Internet Identity, NFID, Bitfinity and more. Then, you can select the type of token you'd like to swap for another, such as ICP, and enter the value you'd like to swap. Finally, select the token you'd like to receive in return for your ICP[^1^].

Chain-key tokens are a more secure alternative to traditional wrapping of tokens. A chain-key token, like Chain-Key Bitcoin (ckBTC), is a token on ICP with a 1:1 backing with real bitcoin held 100% on chain on ICP by a smart contract[^2^]. 

To convert ckBTC to and from BTC, end users interact with a different smart contract, namely the ckBTC minter. The conversion from BTC to ckBTC operates as follows:
1. An end user first transfers some BTC to a user-specific Bitcoin deposit address. 
2. The end user notifies the ckBTC minter smart contract of the new deposited UTXO, by asking the minter to update the user’s balance.
3. The minter smart contract then uses the Internet Computer’s Bitcoin integration to retrieve all the UTXOs owned by the minter-controlled, but user-specific deposit address. 
4. Finally, the minter instructs the ledger to mint new ckBTC for all new UTXOs at a 1:1 ratio[^5^].

In the future, when the Internet Computer blockchain integrates with additional blockchains, more chain-key tokens will become available on ICP[^4^].

[^1^]: [Source](https://internetcomputer.org/docs/current/tutorials/hackathon-prep-course/integrating-with-tokens#swapping-between-tokens)
[^2^]: [Source](https://internetcomputer.org/how-it-works/chain-key-tokens)
[^3^]: [Source](https://internetcomputer.org/blog/news-and-updates/team-spotlight-fi)
[^4^]: [Source](https://internetcomputer.org/how-it-works/chain-key-tokens#the-future-chain-key-erc-20-tokens)
[^5^]: [Source](https://medium.com/dfinity/eliminating-smart-contract-bugs-with-tla-e986aeb6da24#3a8b)

##  Are there any fees associated with cross-chain transactions on the Internet Computer?

Yes, there are fees associated with cross-chain transactions on the Internet Computer. However, these fees are described as negligible. For instance, users can seamlessly swap between BTC/ETH in seconds for a few cents with 0 gas fees by using ckBTC, ckETH, and soon ckERC-20 tokens. Additionally, ckBTC can be sent with 2–5 second finality and negligible fees. 

Sources:
- [X-chain DeFi](https://internetcomputer.org/defi)
- [Why Bitcoin needs smart contracts](https://medium.com/dfinity/why-bitcoin-needs-smart-contracts-5191fbec294a#acf6)

How do I resolve discrepancies or disputes related to cross-chain transactions?
Hmm, I don't know enough to give you a confident answer yet. The extracts provided do not contain specific information on resolving discrepancies or disputes related to cross-chain transactions. However, they do highlight the security and trustworthiness of the Internet Computer's approach to cross-chain transactions, particularly with the use of Chain Key Bitcoin (ckBTC) and JSON-RPC calls.

For more detailed information, you might find it helpful to review the [Internet Computer's documentation](https://internetcomputer.org/docs) or ask your question in the [Dfinity Developer Forum](https://forum.dfinity.org).

##  Is there a guide or tutorial on how to use multichain features on the Internet Computer for beginners?

Yes, there are several resources available for beginners who want to use the multi-chain features on the Internet Computer. 

1. The [ETH starter tutorial](https://internetcomputer.org/docs/current/tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial) is a great place to start. It provides a step-by-step guide on how to interact with Ethereum on the Internet Computer.

2. You can also check out the [Code ckETH](https://github.com/dfinity/ic/tree/master/rs/ethereum/cketh) and [Code ckBTC](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckbtc) for code samples on how to use these features.

3. The [DeFi sample code](https://internetcomputer.org/samples?selectedDomains=Asynchronous+DeFi) provides examples of decentralized finance applications that utilize the multi-chain features of the Internet Computer.

4. For more advanced topics, you can explore the [Multi-chain DeFi](https://internetcomputer.org/defi) page which discusses how the Internet Computer can be used for decentralized finance applications.

5. The [developer resources](https://internetcomputer.org/developers) page also provides a wealth of information, including documentation, sample code, tooling, and support.

Remember, the Internet Computer allows you to create smart contracts that directly interact with other blockchains without the need for trusted centralized bridges. This is made possible using chain key cryptography. You can learn more about this in the [wiki](https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC#firstHeading).

## How does ICP handle the integration of smart contracts across different chains?

Internet Computer Protocol (ICP) handles the integration of smart contracts across different chains through a process known as cross-chain interoperability. This is achieved through advanced cryptography, specifically threshold ECDSA and chain-key cryptography. 

For instance, ICP can natively create signed transactions on other blockchains like Ethereum and Bitcoin, allowing decentralized applications (dapps) deployed on ICP to interact directly with other networks and their smart contracts, tokens, and other digital assets[^1^].

ICP has already integrated with the Bitcoin network using chain-key ECDSA signatures and a protocol-level integration. This allows a canister (a computational unit on the ICP) to create a Bitcoin address, then send or receive bitcoin directly as if they were a regular Bitcoin user[^1^]. 

ICP is also working on an integration with Ethereum that will allow Ethereum smart contracts and digital assets like ERC-20 tokens to be used in ICP canisters[^1^]. This integration will involve a three-phase strategy, the first of which is already completed — where replicas can run ETH nodes that interact with smart contracts, i.e., ICP can send transactions to the ETH network with chain key signing and HTTP outcalls[^4^].

In the future, ICP aims to become fully compatible with the Ethereum Virtual Machine (EVM), enabling developers to deploy Ethereum smart contracts directly on the ICP network[^4^]. This will be achieved through a protocol-level ETH integration, which will initially use HTTPS outcalls to interact with Ethereum APIs to securely query and send transactions to the Ethereum network[^5^]. These HTTPS outcalls will eventually be replaced by an on-chain Ethereum API on ICP, made possible by running full Ethereum nodes on each ICP replica[^5^].

[^1^]: [Cross-chain interoperability](https://internetcomputer.org/docs/current/tutorials/hackathon-prep-course/what-is-icp#cross-chain-interoperability)
[^4^]: [DFINITY Wows the Crowd at ETHDenver](https://medium.com/dfinity/dfinity-wows-the-crowd-at-ethdenver-7389f265e0dd#ae85)
[^5^]: [Full protocol integration](https://internetcomputer.org/ethereum-integration)

##  Can I use my existing hardware wallets or mobile apps to manage my multichain assets on the Internet Computer?

The information extracts provided do not specifically mention the use of existing hardware wallets or mobile apps to manage multichain assets on the Internet Computer. However, the Internet Computer does support the creation of on-chain or hybrid multi-signature wallets that can control assets not only on the Internet Computer, but also on other platforms using Bitcoin integration [source](https://support.dfinity.org/hc/en-us/articles/6080909704212-What-kind-of-asynchronous-DeFi-projects-can-I-create-on-the-IC-). 

For more specific information about hardware wallets or mobile apps compatibility, you may want to refer to the official documentation or forums of the Internet Computer.
