import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";

const Content: React.FC = () => {
  return (
    <>
      <AnimateSpawn
        className="container-10 flex flex-col md:flex-row gap-12 md:gap-1/10 mb-20 md:mb-40"
        variants={transitions.container}
        el={motion.section}
      >
        <motion.div className="flex-[4]" variants={transitions.item}>
          <h2 className="tw-heading-4 md:tw-heading-2 text-gradient mb-3">
            Native Bitcoin
          </h2>
          <p className="tw-paragraph mb-3">
            The Internet Computer (ICP) is integrated with the Bitcoin network
            at the protocol level. The canister smart contracts it hosts can
            create Bitcoin addresses as well as send and receive bitcoin
            directly on the Bitcoin network. This means bitcoin can be easily
            and securely incorporated into DeFi and Web3 services on the
            Internet Computer blockchain, without having to trust wrapped
            bitcoin from centralized bridging services, which are at high risk
            of being taken down or hacked, and can lead to billions of dollars
            in bitcoin losses.
          </p>
          <p className="tw-paragraph mb-3">
            The ICP x BTC integration comprises two key building blocks (and
            APIs): <strong>Network Integration & Chain-Key ECDSA</strong>
          </p>
          <p className="tw-paragraph mb-3">
            Combining these building blocks, ICP canisters can directly and
            securely hold, receive, and send bitcoin seamlessly as if the
            Internet Computer and the Bitcoin network were one blockchain.
          </p>
          <p className="mb-0 mt-8">
            <Link
              className="link-primary link-with-icon"
              href="/how-it-works#Chain-key-technology"
            >
              <LinkArrowRight></LinkArrowRight>
              Learn more
            </Link>
          </p>
        </motion.div>
        <motion.div className="flex-[5] space-y-5" variants={transitions.item}>
          <div className="bg-white rounded-xl p-6 md:p-8">
            <h3 className="tw-heading-6 md:tw-heading-4 mb-4">
              Network Integration
            </h3>
            <p className="tw-paragraph mb-0">
              One key tech development allowing smart contracts on the Internet
              Computer to obtain the balances of Bitcoin addresses as well as
              directly send and receive bitcoin is inter-chain communication. As
              the ICP blockchain creates transactions for the Bitcoin
              blockchain, its nodes directly transmit the transaction to the
              Bitcoin network's nodes, without any need for intermediaries that
              might censor them. ICP nodes also directly pull blocks from the
              Bitcoin network to maintain Bitcoin's current UTXO set, allowing
              canisters to query the amount of digital currency, or balance, per
              Bitcoin address and its UTXOs. The functionality of sending
              Bitcoin transactions and querying balances and UTXO sets is
              accessed by canisters through the Bitcoin API.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8">
            <h3 className="tw-heading-6 md:tw-heading-4 mb-4">
              Chain-Key ECDSA
            </h3>
            <p className="tw-paragraph mb-0">
              The real magic behind Bitcoin integration is chain-key ECDSA
              signing — advanced threshold cryptography integrated with ICP.
              This is what enables ICP nodes to cooperatively create new Bitcoin
              addresses and sign Bitcoin transactions, using highly
              fault-tolerant, decentralized network protocols that are resilient
              to attacks by malicious nodes. Secret key material is securely
              created, distributed, and periodically redistributed among ICP
              nodes for the strongest security. Chain-key ECDSA signing is
              accessed by canisters through the ECDSA API.
            </p>
          </div>
        </motion.div>
      </AnimateSpawn>
      <AnimateSpawn
        className="container-10 mb-20 md:mb-40 "
        variants={transitions.container}
        el={motion.section}
      >
        <div className="md:w-6/10 md:mx-auto md:text-center">
          <h2 className="tw-heading-4 md:tw-heading-2 text-gradient mb-3 md:mb-6">
            Chain-Key Bitcoin
          </h2>
          <p className="tw-lead-sm md:tw-lead mb-0">
            Chain-Key Bitcoin (ckBTC) acts as a bitcoin ‘twin’ on ICP. It is
            issued and redeemed via canister smart contracts and cryptographically
            backed 1:1 with real bitcoin. It’s fast, low-tx-fee bitcoin on ICP
            with no intermediary.
          </p>
        </div>
        <div className="md:w-8/10 md:mx-auto flex my-6 md:my-8">
          <picture className="w-full max-w-md mx-auto md:max-w-none">
            <source
              media="(min-width: 997px)"
              srcSet="/img/bitcoin-integration/ckBTC-img-1.webp"
            />
            <source
              media="(max-width: 996px)"
              srcSet="/img/bitcoin-integration/ckBTC-img-1-mobile.webp"
            />
            <img src="/img/bitcoin-integration/ckBTC-img-1.webp" alt="" />
          </picture>
        </div>
        <div className="md:w-6/10 md:mx-auto">
          <p className="tw-paragraph mb-3">
            While the Bitcoin network integration on the Internet Computer (ICP)
            is extremely powerful in terms of security and interoperability,
            every bitcoin transaction suffers the low throughput, high latency, and high
            fees native to the Bitcoin network. Chain-key Bitcoin (ckBTC), a
            bitcoin ‘twin’ on ICP, has been introduced to bring layer 2
            functionality fuelled by ICP properties like speed, scalability and
            low transaction fees to bitcoin.
          </p>
          <p className="tw-paragraph mb-3">
            The ckBTC token eliminates the need for intermediaries as it is
            issued and redeemed through canister smart contracts built upon the
            native Bitcoin integration. When the ckBTC canister receives
            real bitcoin, it issues ckBTC backed 1:1 by that bitcoin. The data served
            by the ckBTC canister is transparent, so anyone can verify if their
            ckBTC is backed 1:1 with bitcoin. Users can also redeem their ckBTC 
            for real Bitcoin at any time.
          </p>
          <p className="tw-paragraph mb-3">
            The ckBTC token is compliant with ICRC-1, the fungible token
            standard on ICP, and can be integrated easily by any service, e.g.,
            wallets or DEXs.
          </p>
          <p className="mb-0 mt-8 flex gap-6 flex-col md:flex-row items-start md:items-center">
            <Link className="button-outline" href="">
              Code ckBTC
            </Link>
            <Link className="link-primary link-with-icon" href="">
              <LinkArrowRight></LinkArrowRight>
              Learn more
            </Link>
          </p>
        </div>
      </AnimateSpawn>
      <AnimateSpawn
        className="container-10 flex flex-col md:flex-row gap-8 md:gap-1/10 mb-20 md:mb-40"
        variants={transitions.container}
        el={motion.section}
      >
        <motion.div className="flex-[5] md:order-2" variants={transitions.item}>
          <h2 className="tw-heading-5 md:tw-heading-3 mb-8 md:mb-3">
            What ckBTC is <span className="text-razzmatazz">NOT</span>
          </h2>
          <p className="mb-8 md:hidden max-w-md mx-auto md:max-w-none">
            <img
              src="/img/bitcoin-integration/ckBTC-img-2.webp"
              alt=""
              className="w-full "
            />
          </p>
          <p className="tw-paragraph mb-0 font-bold">Not a Bridged Token</p>
          <p className="tw-paragraph mb-3">
            Most blockchains rely on so-called bridges to wrap and unwrap
            tokens, such as bitcoin. The recent incident where the FTX exchange
            acted as the custodian, and Sollet the bridge for wrapping and
            unwrapping BTC and ETH on Solana, demonstrated how bridges and
            intermediaries are highly vulnerable to hacks or other forms of
            compromise.
          </p>
          <p className="tw-paragraph mb-8">
            ckBTC is issued and redeemed via canister smart contracts backed 1:1
            with real bitcoin — no bridge or custodian, and verifiable by
            anyone.
          </p>
          <p className="tw-paragraph mb-0 font-bold">Not a Lightning Network</p>
          <p className="tw-paragraph mb-3">
            While a lightning network has many advantages, such as faster
            transactions and lower fees, transactions go through many channels
            that run on centralized cloud systems. ckBTC brings layer 2 functionality 
            to the Bitcoin network — fast, low-fee payments — without the risk or
            limitations of a lightning network in that all transactions are held on
            the ckBTC ledger and never go through centralized channels.
          </p>

          <p className="tw-paragraph mb-0">
            True decentralized transactions on the Internet Computer are made  
            possible via inter-chain communication with the Bitcoin network and 
            chain-key ECDSA signatures.
          </p>
        </motion.div>
        <motion.div
          className="flex-[4] md:order-1 items-start hidden md:flex"
          variants={transitions.item}
        >
          <img
            src="/img/bitcoin-integration/ckBTC-img-2.webp"
            alt=""
            className="w-full max-w-md mx-auto md:max-w-none"
          />
        </motion.div>
      </AnimateSpawn>

      <AnimateSpawn className="mb-20 md:mb-40" variants={transitions.container}>
        <div className="container-10 mb-8 md:mb-12">
          <h2 className="mb-0 tw-heading-4 md:tw-heading-60 md:w-5/10">
            Use your bitcoin
            <br className="hidden md:block" /> on ICP
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 container-12">
          <Link
            href="https://icdex.io"
            className="flex-1 hover:-translate-y-3 hover:no-underline text-black hover:text-black transition-transform border border-solid border-white bg-white-80 p-6 md:p-8 rounded-xl flex flex-row items-start gap-6 md:flex-col md:gap-9"
          >
            <img
              src="/img/bitcoin-integration/ic-dex.webp"
              alt="IC DEX logo"
              className="w-16 md:w-20 aspect-square"
            />
            <div className="flex-1">
              <h3 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                ICDex
              </h3>
              <p className="tw-paragraph-sm md:tw-lead-sm mb-0 text-black-60">
                ICDex by ICLighthouse is the world's first 100% on-chain
                order-book-based decentralized exchange (DEX) running on the
                Internet Computer. Using ICP's native Bitcoin integration, you
                can already buy ICP using your BTC. ICDex also supports ICRC-1,
                which allows users to trade SNS tokens.
              </p>
            </div>
          </Link>
          <Link
            href="https://crowdfund-nft.com/"
            className="flex-1 hover:-translate-y-3 hover:no-underline text-black hover:text-black transition-transform border border-solid border-white bg-white-80 p-6 md:p-8 rounded-xl flex flex-row items-start gap-6 md:flex-col md:gap-9"
          >
            <img
              src="/img/bitcoin-integration/crowdfund.webp"
              alt="Crowdfund NFT logo"
              className="w-16 md:w-20 aspect-square"
            />
            <div className="flex-1">
              <h3 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                CrowdFund NFT
              </h3>
              <p className="tw-paragraph-sm md:tw-lead-sm mb-0 text-black-60">
                CrowdFund NFT is an alternative to Kickstarter and other
                traditional crowdfunding platforms. Running 100% on the Internet
                Computer, it uses NFTs to provide ‘proof of ownership’ in the
                projects you help crowdfund. Plus, you can now fund the projects
                you love in ICP and BTC.
              </p>
            </div>
          </Link>
          <Link
            href="https://vault-bet.com"
            className="flex-1 hover:-translate-y-3 hover:no-underline text-black hover:text-black transition-transform border border-solid border-white bg-white-80 p-6 md:p-8 rounded-xl flex flex-row items-start gap-6 md:flex-col md:gap-9"
          >
            <img
              src="/img/bitcoin-integration/vault.webp"
              alt="VailtBet logo"
              className="w-16 md:w-20 aspect-square"
            />
            <div className="flex-1">
              <h3 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                VaultBet
              </h3>
              <p className="tw-paragraph-sm md:tw-lead-sm mb-0 text-black-60">
                VaultBet is a decentralized sports betting exchange that uses
                smart contract technology to make sports betting peer-to-peer,
                trustless and fun! Users are in control and markets decide the
                odds, not bookies. Connect your Plug wallet to trade bets in ICP
                and BTC.
              </p>
            </div>
          </Link>
        </div>
      </AnimateSpawn>
    </>
  );
};

export default Content;
