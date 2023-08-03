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
            of being taken down or hacked. Between 2021 and 2022, more than 2
            billion dollars was stolen by exploiting unsecure blockchain bridges.
          </p>
          <p className="tw-paragraph mb-3">
            The ICP x BTC integration comprises two key building blocks (and
            APIs): Network integration & chain-key ECDSA
          </p>
          <p className="tw-paragraph mb-3">
            Combining these building blocks, canisters can directly and
            securely hold, receive, and send bitcoin seamlessly as if the
            Internet Computer and the Bitcoin network were one blockchain.
            Another way of looking at it, is that the Bitcoin integration
            is the same as running a Bitcoin node on chain.
          </p>
          <p className="mb-0 mt-8">
            <Link
              className="link-primary link-with-icon"
              href="/how-it-works/chain-key-technology/"
            >
              <LinkArrowRight></LinkArrowRight>
              What is chain-key cryptography
            </Link>
          </p>
        </motion.div>
        <motion.div className="flex-[5] space-y-5" variants={transitions.item}>
          <div className="bg-white rounded-xl p-6 md:p-8">
            <h3 className="tw-heading-6 md:tw-heading-4 mb-4">
              Network integration
            </h3>
            <p className="tw-paragraph mb-0">
              One key tech development allowing smart contracts on the Internet
              Computer to obtain the balances of Bitcoin addresses as well as
              directly send and receive bitcoin is inter-chain communication. As
              the ICP blockchain creates transactions for the Bitcoin
              blockchain, its nodes directly transmit the transaction to the
              nodes of the Bitcoin network, without any need for intermediaries that
              might censor them. ICP nodes also directly pull blocks from the
              Bitcoin network to maintain Bitcoin's current UTXO set, allowing
              canisters to query the balance of Bitcoin addresses and their UTXOs.
              Creating bitcoin transactions and querying UTXO sets are made available
              to canisters by the Bitcoin API.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-8">
            <h3 className="tw-heading-6 md:tw-heading-4 mb-4">
              Chain-key ECDSA
            </h3>
            <p className="tw-paragraph mb-0">
              The real innovation behind Bitcoin integration is {" "}
              <Link href="/docs/current/developer-docs/integrations/t-ecdsa/t-ecdsa-how-it-works">
                chain-key ECDSA              
              </Link>{" "}
              signing — advanced threshold cryptography integrated with ICP. In short,
              chain-key ECDSA is a set of cryptographic protocols that allow Internet
              Computer nodes to cooperatively create ECDSA signatures, which can be used
              to sign bitcoin transactions, using a highly fault-tolerant, decentralized
              network that is resilient to attacks by malicious nodes. The secret key is
              never stored in one place, instead it is broken down into key shares held by
              ICP nodes that are re-shared periodically. When requested, nodes use their
              key shares to collectively sign BTC transactions without recreating the
              original secret key. This signing protocol assumes a threshold of nodes to
              be honest.
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
            Chain-key bitcoin
          </h2>
          <p className="tw-lead-sm md:tw-lead mb-0">
            Chain-key Bitcoin (ckBTC) can be sent with 1-2 second finality and negligible fees
            — a multi-chain bitcoin twin, trustlessly created by chain-key cryptography and a
            pair of canister smart contracts that directly hold raw bitcoin without relying
            on intermediaries.
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
            In 2021, El Salvador became the first country in the world to use
            Bitcoin as legal tender. However, as bitcoin transactions are slow
            and have high fees, they are not practical for daily economic
            activities such as buying groceries or getting a coffee.
          </p>  
          <p className="tw-paragraph mb-3">
            The Bitcoin network integration on the Internet Computer is
            extremely powerful in terms of security and interoperability, but
            every bitcoin transaction still suffers the same low throughput,
            high latency, and high fees native to the Bitcoin network.
            Recent surge in popularity of Bitcoin Ordinals and BRC-20 tokens
            resulted in Bitcoin's network to be highly congested. This pushed
            transaction fees above $30, rendering casual every-day transactions
            completely impractical.
          </p>
          <p className="tw-paragraph mb-3">
            Chain-key Bitcoin (ckBTC), a multi-chain bitcoin
            twin on ICP introduces layer 2 functionality fuelled by ICP
            properties like speed, scalability and low transaction fees to
            bitcoin. ckBTC helps reduce the load on the Bitcoin network, while
            making every-day bitcoin transactions feasible, which realizes a key
            part of Satoshi's original vision.
          </p>
          <p className="tw-paragraph mb-3">
            ckBTC implements ICRC-1, the fungible token standard on the Internet
            Computer, and can be integrated easily by any Web3 service running on
            ICP.
          </p>
          <p className="mb-0 mt-8 flex gap-6 flex-col md:flex-row items-start md:items-center">
            <Link
              className="button-outline"
              href="/ckbtc"
            >
              More on ckBTC
            </Link>
            <Link
              href="https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/ckbtc"
              className="link-primary link-with-icon"
            >
              <LinkArrowRight></LinkArrowRight>
              Code ckBTC
            </Link>
          </p>
        </div>
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
              alt="Funded logo"
              className="w-16 md:w-20 aspect-square"
            />
            <div className="flex-1">
              <h3 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                Funded
              </h3>
              <p className="tw-paragraph-sm md:tw-lead-sm mb-0 text-black-60">
                Funded is an alternative to Kickstarter and other traditional
                crowdfunding platforms. Running 100% on the Internet Computer,
                it uses NFTs to provide ‘proof of ownership’ in the projects
                you help crowdfund. Plus, you can now fund the projects you
                love in ICP and BTC.
              </p>
            </div>
          </Link>
          <Link
            href="https://dscvr.one/"
            className="flex-1 hover:-translate-y-3 hover:no-underline text-black hover:text-black transition-transform border border-solid border-white bg-white-80 p-6 md:p-8 rounded-xl flex flex-row items-start gap-6 md:flex-col md:gap-9"
          >
            <img
              src="/img/showcase/dscvr-logo.png"
              alt="DSCVR logo"
              className="w-16 md:w-20 aspect-square"
            />
            <div className="flex-1">
              <h3 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                DSCVR
              </h3>
              <p className="tw-paragraph-sm md:tw-lead-sm mb-0 text-black-60">
                DSCVR is an end-to-end decentralized Web3 social media platform that
                allows communities to form into groups called Portals. These Portals
                can be NFT gated, airdrop fungible and non-fungible tokens to their
                members and much more. DSCVR also allows for tipping posts in a
                growing number of cryptos, including ckBTC.
              </p>
            </div>
          </Link>
          <Link
            href="https://oc.app/"
            className="flex-1 hover:-translate-y-3 hover:no-underline text-black hover:text-black transition-transform border border-solid border-white bg-white-80 p-6 md:p-8 rounded-xl flex flex-row items-start gap-6 md:flex-col md:gap-9"
          >
            <img
              src="/img/showcase/openchat_logo.webp"
              alt="OpenChat logo"
              className="w-16 md:w-20 aspect-square"
            />
            <div className="flex-1">
              <h3 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                OpenChat
              </h3>
              <p className="tw-paragraph-sm md:tw-lead-sm mb-0 text-black-60">
                What if you could own a piece of WhatsApp and vote on what features
                get added? OpenChat is a fully decentralized real-time messaging
                service that is indistinguishable from Web2 chat apps, while living
                100% on the blockchain. This allows people to send crypto to their
                friends - including Bitcoin with TX fees at only $0.0029 and OpenChat's
                own governance token, CHAT.
              </p>
            </div>
          </Link>
        </div>
        <div className="pt-20 text-center flex flex-col items-center gap-8 relative">
          <div className="md:hidden blob blob-purple blob-center blob-md z-[-1]"></div>

          <Link
            className="button-primary"
            href="/ecosystem?source=nav&tag=Bitcoin"
          >
            More projects using bitcoin
          </Link>
        </div>
      </AnimateSpawn>
    </>
  );
};

export default Content;
