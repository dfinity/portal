import Link from "@docusaurus/Link";
import useGlobalData from "@docusaurus/useGlobalData";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";

function DefiPage() {
  const [bgDark, setBgDark] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const globalData = useGlobalData();
  const icpPrice = globalData["icp-price"]["default"] as number;

  useEffect(() => {
    setHeaderHeight(
      document.querySelector("nav.navbar").getBoundingClientRect().height
    );
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY > heroRef.current.clientHeight - headerHeight &&
        bgDark
      ) {
        setBgDark(false);
      } else if (
        window.scrollY < heroRef.current.clientHeight - headerHeight &&
        !bgDark
      ) {
        setBgDark(true);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [bgDark, headerHeight]);

  return (
    <Layout
      title="DeFi"
      description={`From fully on-chain order book DEXs, to bridgeless cross-chain
      swaps, the Internet Computer provides an unmatched tech stack
      for DEXs to thrive on and DeFi to flourish.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {bgDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <AnimateSpawn variants={transitions.container}>
          <section
            className="overflow-hidden bg-infinite text-white pt-20"
            ref={heroRef}
          >
            <div className="container-10 pt-20 mb-40 md:mb-52 md:pt-36 relative">
              <div className="blob blob-purple blob-xl md:blob-xl top-[-150px] left-full -translate-x-2/3 opacity-80"></div>
              <div className="md:w-7/10 relative">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                  variants={transitions.item}
                >
                  Next generation DeFi
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  Imagine a decentralized order-book exchange built exclusively
                  using smart contracts that directly serve a web experience
                  like those of centralized exchanges, that incorporates the
                  world's digital assets without need for insecure bridges.
                </motion.p>
              </div>
            </div>
          </section>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 relative"
          el={motion.section}
          variants={transitions.fadeIn}
        >
          <div className="md:w-6/12 md:absolute top-10 md:-translate-y-1/2 right-0 -mt-30 md:mt-0">
            <img src="/img/defi/defi-hero.webp" alt="" className="w-full" />
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 md:mt-40 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-6/10">
            <motion.h2
              className="tw-heading-3 md:tw-heading-2 mb-3 md:mb-6"
              variants={transitions.item}
            >
              Everything
              <br className="hidden md:block" /> on-chain
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              2022 revealed the serious risks of trading and holding tokens on
              centralized exchanges. Even decentralized exchanges with frontends
              hosted on centralized cloud providers are not safe from hacks or
              rug pulls. Thanks to the web-serving capability of canister smart
              contracts on the Internet Computer, and their ability to host
              large amounts of data, DeFi platforms can exist 100% on the
              blockchain with no dependency on centralized components.
            </motion.p>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-16 mb-20 md:mt-24 md:mb-48"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="border border-solid border-white bg-white-80 px-8 py-12 rounded-xl flex flex-col md:flex-row gap-12 md:gap-8 justify-between md:px-20 text-center">
            <motion.div
              className="flex flex-col gap-2"
              variants={transitions.item}
            >
              <span className="tw-heading-3 lg:tw-heading-60 text-gradient">
                6,500+ TX/s
              </span>
              <span className="tw-paragraph md:tw-lead-sm">
                Typical network usage
              </span>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2"
              variants={transitions.item}
            >
              <span className="tw-heading-3 lg:tw-heading-60 text-gradient">
                $0
              </span>
              <span className="tw-paragraph md:tw-lead-sm">Gas fees</span>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2"
              variants={transitions.item}
            >
              <span className="tw-heading-3 lg:tw-heading-60 text-gradient">
                ${(icpPrice * 0.0001).toFixed(5)}
              </span>
              <span className="tw-paragraph md:tw-lead-sm">TX fee</span>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2"
              variants={transitions.item}
            >
              <span className="tw-heading-3 lg:tw-heading-60 text-gradient">
                1-2s
              </span>
              <span className="tw-paragraph md:tw-lead-sm">Finality</span>
            </motion.div>
          </div>
        </AnimateSpawn>

        <section className="mb-20 md:mb-40 container-12 flex flex-col gap-16 md:gap-40">
          <TranslatedLayout reverse={true} imageUrl="/img/defi/image-1.webp">
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              Native BTC DeFi
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              Via chain-key signatures, the Internet Computer is capable of
              signing native transactions on other blockchains without using
              bridges. Today, you can already swap BTC with ICP without ever
              having to use insecure wrapped tokens. In the near future, this
              could extent to ETH or even Dogecoin.
            </p>
            <p className="mb-0">
              <Link
                href="/bitcoin-integration"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                More on BTC Integration
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/defi/image-2.webp">
            <h2 className="md:tw-heading-60 md:mb-6">
              Bringing ERC-20 tokens to ICP
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              Building on chain-key signatures and HTTPS outcalls, DEXs are
              currently working on solutions to support a plethora of ERC-20
              tokens on ICP. Plugging into Ethereum RPC API providers, ICP smart
              contracts will sign transactions for any ERC-20 token without
              relying on insecure bridges. Plans to integrate the Internet
              Computer with Ethereum network at a protocol level are also
              underway.
            </p>
            <p className="mb-0">
              <Link
                href="/how-it-works#Chain-key-cryptography"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                More on Chain-key signatures
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout reverse={true} imageUrl="/img/defi/image-3.webp">
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              Chain-Key Tokens
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              Imagine being able to pay for a takeaway coffee with BTC or
              sending satoshis to friends on your favorite Web3 chat app.
              Chain-key tokens, a cryptographically secure replacement to
              wrapped tokens, allow end-users to seamlessly transfer tokens
              between blockchains with speed without relying on third-party
              bridges or custodians. Chain-key bitcoin (ckBTC) is the first
              chain-key token on ICP, pioneering the way. Trade BTC on ICP DEXs,
              use BTC for fundraising and much more.
            </p>
            <p className="mb-0">
              <Link
                href="/how-it-works#Chain-key-technology"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                More on Chain-key Tokens
              </Link>
            </p>
          </TranslatedLayout>

          <TranslatedLayout imageUrl="/img/defi/image-4.webp">
            <h2 className="md:tw-heading-60 md:mb-6">SNS DAOs</h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              SNS is a powerful tool that allows developers to assign control of
              their dapp to a DAO whose governance token holders become part
              owners and contributors of the dapp. Once a dapp has tokenized,
              DEXs can easily support its governance token as SNS follows the
              ICRC-1 standard.
            </p>
            <p className="mb-0">
              <Link href="/sns" className="link-primary link-with-icon">
                <LinkArrowRight />
                More on SNS DAOs
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/defi/bitfinity.png" reverse={true}>
            <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
              EVM on the Internet Computer
            </h3>
            <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
              The Bitfinity EVM allows developers to run Solidity smart-contracts
              at web-speed, directly on the Internet Computer.
            </p>
            <Link
              className="link-primary link-with-icon"
              href="https://bitfinity.network"
            >
              <LinkArrowRight />
              Check out Bitfinity EVM
            </Link>
          </TranslatedLayout>
        </section>
        {/* <BackgroundPanel> */}
        <section className="bg-gradient-to-bl from-[#e07934] via-[#964680] to-[#4421a0] py-20 md:py-48 text-white">
          <AnimateSpawn
            className="container-12"
            variants={transitions.container}
          >
            <div className="md:w-8/12 md:mx-auto">
              <motion.h2
                className="tw-heading-4 md:tw-heading-60 text-white mb-6 md:mb-260"
                variants={transitions.item}
              >
                Highest-throughput
                <br />
                blockchain
              </motion.h2>
              <motion.p
                className="md:tw-lead mb-6 md:mb-6"
                variants={transitions.item}
              >
                The speed of the Internet Computer alone enables DeFi
                applications that are simply impossible to build anywhere else
                without compromising on decentralization or costs.
              </motion.p>
              <motion.p className="mb-12 md:mb-20" variants={transitions.item}>
                <Link
                  className="button-outline-white"
                  href="https://dashboard.internetcomputer.org"
                >
                  See stats for yourself
                </Link>
              </motion.p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <motion.div
                className="flex-1 border border-solid border-white-30 rounded-xl flex flex-col gap-4 py-10 items-center panel-gradient"
                variants={transitions.item}
              >
                <h3 className="tw-heading-7-caps mb-0">Internet Computer</h3>
                <img src="/img/nft/ic-logo.webp" alt="" className="w-20" />
                <div>
                  <span className="tw-heading-4 md:tw-heading-3">
                    550M+ TXs / day
                  </span>{" "}
                </div>
              </motion.div>

              <motion.div
                className="flex-1 border border-solid border-white-30 rounded-xl flex flex-col gap-4 py-10 items-center"
                variants={transitions.item}
              >
                <h3 className="tw-heading-7-caps mb-0">Solana</h3>
                <img src="/img/nft/solana-logo.webp" alt="" className="w-20" />
                <div>
                  <span className="tw-heading-4 md:tw-heading-3">
                    30M+ TXs / day
                  </span>{" "}
                </div>
              </motion.div>
              <motion.div
                className="flex-1 border border-solid border-white-30 rounded-xl flex flex-col gap-4 py-10 items-center"
                variants={transitions.item}
              >
                <h3 className="tw-heading-7-caps mb-0">Ethereum</h3>
                <img
                  src="/img/nft/ethereum-logo.webp"
                  alt=""
                  className="w-20"
                />
                <div>
                  <span className="tw-heading-4 md:tw-heading-3">1M / day</span>{" "}
                </div>
              </motion.div>
            </div>
          </AnimateSpawn>
        </section>
        <section className="container-12 py-30 md:py-48">
          <div className="text-center mb-16 md:mb-30">
            <AnimateSpawn
              className="container-12"
              variants={transitions.container}
            >
              <motion.h2
                className="tw-heading-3 md:tw-heading-2 text-gradient text-center md:w-6/12 md:mx-auto mb-8"
                variants={transitions.item}
              >
                What’s already being built
              </motion.h2>

              <motion.div variants={transitions.container}>
                <Link
                  className="button-outline text-center"
                  href="/ecosystem?tag=DeFi"
                >
                  See more DeFi Dapps
                </Link>
              </motion.div>
            </AnimateSpawn>
          </div>

          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/defi/icdex.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                ICDex
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Fully on-chain order book DEX
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                ICDex provides the world’s first fully on-chain order book DEX.
                Create limit orders or swap tokens instantly with complete
                transparency and decentralization - 100% on-chain.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://icdex.io/"
              >
                <LinkArrowRight /> Check out ICDex
              </Link>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/defi/finterest.webp"
              reverse={false}
            >
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                Finterest
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                First-ever bridgeless lending protocol
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Finterest is a truly decentralized borrowing protocol running on
                the Internet Computer built to support native Bitcoin borrowing
                and lending.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://finterest.ooo/"
              >
                <LinkArrowRight /> Check out Finterest
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/defi/icpswap.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                ICP.Swap
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Swap any ICP based token
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                ICP.Swap offers the largest number of tokens on the Internet
                Computer. Trade the latest meme coins or the most successful SNS
                DAO governance tokens.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://icpswap.com"
              >
                <LinkArrowRight />
                Check out ICP.Swap
              </Link>
            </TranslatedLayout>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-md blob-center z-[-1] md:blob-xl"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-5 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-8/12"
              variants={transitions.item}
            >
              Build the future of DeFi
            </motion.h2>
            <motion.p
              className="tw-lead-sm mb-0 text-center mx-auto md:w-6/12"
              variants={transitions.item}
            >
              The Internet Computer offers a plethora of out-of-the-box features
              you can use in your DeFi application.
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="About HTTPS outcalls"
              description=""
              href="/https-outcalls"
            />

            <CardWithDescription
              title="Sample code"
              description=""
              href="/samples?selectedDomains=Asynchronous+DeFi"
            />
            <CardWithDescription
              title="Dev docs"
              description=""
              href="/docs/current/home"
            />
            <CardWithDescription
              title="Code Bitcoin"
              description=""
              href="/bitcoin-integration"
            />
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default DefiPage;
