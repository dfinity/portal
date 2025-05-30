import Link from "@docusaurus/Link";
import useGlobalData from "@docusaurus/useGlobalData";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import RotatingStatPanel, {
  RotatingStat,
} from "../components/Common/RotatingStatsPanel";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const queryClient = new QueryClient();

function Stats() {
  const globalData = useGlobalData();
  const cryptoPrices = globalData["crypto-price"]["default"] as {
    icp: number;
    btc: number;
  };

  const stats: RotatingStat[][] = [
    [
      {
        title: "ckBTC/ckETH max TPS",
        value: 800,
        format: (v) => `~${v.toFixed(0)} TPS`,
      },
      {
        title: "ckBTC TX fee",
        value: cryptoPrices.btc * 0.0000001,
        format: (v) => `$${v.toFixed(4)}`,
      },
    ],
    [
      {
        title: "Gas fees",
        value: 0,
        format: (v) => `$${v.toFixed(0)}`,
      },
      {
        title: "ckETH TX fee",
        value: 0.004,
        format: (v) => `$${v.toFixed(3)}`,
      },
    ],
    [
      {
        title: "ICP TX fee",
        value: cryptoPrices.icp * 0.0001,
        format: (v) => `$${v.toFixed(4)}`,
      },
      {
        title: "ckBTC/ckETH finality",
        value: 1,
        format: (v) =>
          Math.round(v * 10) == 10
            ? `1-2s`
            : `${v.toFixed(1)}-${(v + 1).toFixed(1)}s`,
      },
    ],
  ];

  return (
    <RotatingStatPanel
      rotationIndexes={[1, 0, 2]}
      stats={stats}
    ></RotatingStatPanel>
  );
}

function DefiPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="DeFi"
      description="From fully onchain order book DEXs, to bridgeless multichain swaps, the Internet Computer provides an unmatched tech stack for DEXs to thrive on and DeFi to flourish."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
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
                  Multichain DeFi
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  From fully onchain order book DEXs, to bridgeless multichain
                  swaps, the Internet Computer provides an unmatched tech stack
                  for DEXs to thrive on and DeFi to flourish.
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
              className="tw-heading-3 md:tw-heading-2 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              Everything
              <br className="hidden md:block" /> onchain
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              The risks of trading and holding tokens on centralized exchanges
              is high. Even decentralized exchanges with frontends hosted on
              centralized cloud providers are not safe from hacks or rug pulls.
              Thanks to the web-serving capability of canister smart contracts
              on the Internet Computer, and their ability to host large amounts
              of data, DeFi platforms can exist 100% on the blockchain with no
              dependency on centralized components.
            </motion.p>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-16 md:mt-24"
          el={motion.section}
          variants={transitions.container}
        >
          <QueryClientProvider client={queryClient}>
            <Stats />
          </QueryClientProvider>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-6 md:mt-10"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="bg-white/60 relative rounded-xl md:rounded-[32px] ">
            <div className="ml-auto w-7/10 sm:w-5/10 md:w-5/10 md:absolute top-0 right-0 bottom-0 flex">
              <img
                src="/img/defi/x-chain-swaps.webp"
                alt=""
                loading="lazy"
                className="object-contain object-center"
              />
            </div>

            <div className="md:container-10 px-8 pb-10 md:py-30 relative">
              <div className="md:w-1/2">
                <h2 className="text-gradient tw-heading-4 md:tw-heading-60 md:mb-6">
                  Multichain swaps
                </h2>
                <p className="tw-paragraph md:tw-lead text-black mb-8">
                  Via Chain-Key Signatures, the Internet Computer has the
                  ability to sign native transactions on other blockchains
                  without using risky bridges. Today, users can seamlessly swap
                  between BTC/ETH in seconds for a few cents with 0 gas fees by
                  using ckBTC, ckETH, and ckERC-20 tokens.{" "}
                </p>
                <p className="mb-0 flex flex-col gap-6 items-start">
                  <Link
                    href="https://support.dfinity.org/hc/en-us/articles/20708056282132-What-is-ckBTC-#h_01HE64A4QKANB6JX8VERRP5Y80"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-primary"
                  >
                    <LinkArrowRight />
                    BTC &lt;&gt; ICP user guide
                  </Link>
                  <Link
                    href="https://dashboard.internetcomputer.org/bitcoin/transactions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary"
                  >
                    Track TX activity
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </AnimateSpawn>

        <section className="container-12 py-30 md:py-48">
          <div className="mb-16 md:mb-30">
            <AnimateSpawn className="" variants={transitions.container}>
              <motion.h2
                className="tw-heading-3 md:tw-heading-2 text-gradient text-center md:w-7/12 md:mx-auto mb-0 md:mb-8"
                variants={transitions.item}
              >
                Move between chains on ICP DEXs
              </motion.h2>
            </AnimateSpawn>
          </div>
          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/defi/icdex.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                ICDex
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Fully onchain order book DEX
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                ICDex provides the world’s first fully onchain order book DEX.
                Create limit orders or swap tokens instantly with complete
                transparency and decentralization. ckBTC/ckETH swaps now
                possible.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://iclight.io/ICDex/ckETH/ICP"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get ckBTC/ckETH on ICDex <LinkArrowUpRight />
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/defi/sonic.webp" reverse={false}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                Sonic
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                SNS DAO-controlled DEX
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                One-stop access to decentralized finance and the first DEX on
                the Internet Computer to become an SNS DAO. Swap tokens, earn
                fees as a liquidity provider and participate in governance and
                decision-making through Sonic token membership. Now supports
                ckBTC/ckETH pair.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://app.sonic.ooo/swap"
                target="_blank"
                rel="noopener noreferrer"
              >
                Swap ckBTC/ckETH on Sonic <LinkArrowUpRight />
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
                Computer, including ckBTC and ckETH. Trade the latest meme coins
                or the most successful SNS DAO governance tokens.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://app.icpswap.com/swap"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get ckBTC/ckETH on ICP.Swap <LinkArrowUpRight />
              </Link>
            </TranslatedLayout>

            <motion.div
              variants={transitions.container}
              className="text-center"
            >
              <Link
                className="button-primary text-center"
                href="https://internetcomputer.org/ecosystem?tag=DeFi
"
              >
                Go to all DeFi Dapps
              </Link>
            </motion.div>
          </div>
        </section>
        <BackgroundPanel
          panelClassName="bg-gradient-to-bl from-[#e07934] via-[#964680] to-[#4421a0]"
          threshold={0}
          rootMargin="-30% 0px"
        >
          <section className="py-0 md:py-0 text-white">
            <AnimateSpawn className="" variants={transitions.container}>
              <div className="container-10 mb-16 md:mb-30">
                <div className="md:w-7/10">
                  <motion.h2
                    className="tw-heading-4 md:tw-heading-60 text-white mb-6 md:mb-260"
                    variants={transitions.item}
                  >
                    ckBTC/ckETH wallets
                  </motion.h2>
                  <motion.p
                    className="md:tw-lead mb-6 md:mb-6"
                    variants={transitions.item}
                  >
                    Multichain wallets already exist on the Internet Computer
                    that allow users to store and transfer ckBTC, ckETH and more
                    with ease.
                  </motion.p>
                  <motion.p className="mb-0" variants={transitions.item}>
                    <Link
                      className="button-outline-white"
                      href="https://internetcomputer.org/ecosystem?tag=Wallet"
                    >
                      All ICP wallets
                    </Link>
                  </motion.p>
                </div>
              </div>

              <div className="container-12 flex flex-col md:flex-row gap-4">
                <motion.div variants={transitions.item} className="flex-1">
                  <Link
                    href="https://astrox.me/"
                    className="block border border-solid border-white-30 rounded-xl p-10 items-center panel-gradient text-center text-white hover:text-white hover:-translate-y-2 transition-all hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/img/defi/astroxme.webp"
                      alt=""
                      className="w-20"
                    />
                    <h3 className="tw-heading-5 mb-2 mt-4">AstroX ME</h3>
                    <p className="text-white/60 tw-lead-sm mb-0">
                      Secure assets such as ckBTC and ckETH across all your
                      devices without the need for a seed phrase.
                    </p>
                  </Link>
                </motion.div>
                <motion.div variants={transitions.item} className="flex-1">
                  <Link
                    href="https://nns.ic0.app/"
                    className="block border border-solid border-white-30 rounded-xl p-10 items-center panel-gradient text-center text-white hover:text-white hover:-translate-y-2 transition-all hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/img/defi/nns.webp" alt="" className="w-20" />
                    <h3 className="tw-heading-5 mb-2 mt-4">NNS </h3>
                    <p className="text-white/60 tw-lead-sm mb-0">
                      Chose your ckBTC account to send and receive BTC from the
                      Bitcoin network. Full ETH functionality coming soon.
                    </p>
                  </Link>
                </motion.div>
                <motion.div variants={transitions.item} className="flex-1">
                  <Link
                    href="https://plugwallet.ooo/"
                    className="block border border-solid border-white-30 rounded-xl p-10 items-center panel-gradient text-center text-white hover:text-white hover:-translate-y-2 transition-all hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/img/defi/plug.webp" alt="" className="w-20" />
                    <h3 className="tw-heading-5 mb-2 mt-4">Plug</h3>
                    <p className="text-white/60 tw-lead-sm mb-0">
                      Store, swap and manage digital assets, inlcuding ckBTC and
                      ckETH on a simple mobile app or use your favorite browser.
                    </p>
                  </Link>
                </motion.div>
              </div>
            </AnimateSpawn>
          </section>
        </BackgroundPanel>
        <section className="container-12 py-30 md:py-48">
          <div className="mb-16 md:mb-30 md:w-7/10 md:mx-auto">
            <AnimateSpawn className="" variants={transitions.container}>
              <motion.h2
                className="tw-heading-3 md:tw-heading-2 text-gradient text-center mb-4"
                variants={transitions.item}
              >
                Build multichain DeFi
              </motion.h2>

              <motion.p
                className="tw-paragraph md:tw-lead text-black mb-0 text-center max-w-[500px] mx-auto"
                variants={transitions.item}
              >
                The Internet Computer offers an array of innovative features to
                build next-gen DeFi.
              </motion.p>
            </AnimateSpawn>
          </div>
          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/defi/image-2.webp">
              <h2 className="md:tw-heading-60 md:mb-6">
                Bringing ERC-20 tokens to ICP
              </h2>
              <p className="tw-lead-sm mb-6 md:mb-10">
                Building on Chain-Key Signatures and HTTPS outcalls, Oisy, a
                browser-based Ethereum wallet secured by the Internet Computer,
                can already natively support a plethora of ERC-20 tokens.
                Plugging into services such as Infura and the like, ICP smart
                contracts sign transactions for any ERC-20 token without relying
                on insecure bridges.
              </p>
              <p className="mb-0">
                <Link
                  href="https://oisy.com/"
                  className="link-primary link-with-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Build a fully onchain ETH wallet
                  <LinkArrowUpRight />
                </Link>
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/defi/https-outcalls.webp"
              reverse={true}
            >
              <h2 className="md:tw-heading-60 md:mb-6">
                Access Web2 without Oracles
              </h2>
              <p className="tw-lead-sm mb-6 md:mb-10">
                Blockchains today have to rely on oracles if they want to access
                price data from Web2 APIs. Using HTTPS outcalls, the Internet
                Computer can query up-to-date prices from any traditional Web2
                API without oracles, which reduces costs and increases speed.
                Making calls to the Exchange Rate Canister, you can already
                query price data.
              </p>
              <p className="mb-0">
                <Link
                  href="/https-outcalls"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight />
                  More on HTTPS Outcalls
                </Link>
              </p>
            </TranslatedLayout>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15 md:mt-20">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-md blob-x-5 blob-y-10 z-[-1] md:blob-lg opacity-80"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-0 w-full mx-auto md:tw-heading-60 lg:w-8/12"
              variants={transitions.item}
            >
              More tools
            </motion.h2>
            {/* <motion.p
              className="tw-lead-sm mb-0 mt-2 md:mt-6 text-center mx-auto md:w-6/12"
              variants={transitions.item}
            >
              The Internet Computer offers a plethora of out-of-the-box features
              you can use in your DeFi application.
            </motion.p> */}
          </AnimateSpawn>
          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="ETH starter tutorial"
              description=""
              href="/docs/tutorials/developer-liftoff/level-5/5.2-ICP-ETH-tutorial"
            />

            <CardWithDescription
              title="Code ckETH"
              description=""
              href="https://github.com/dfinity/ic/tree/master/rs/ethereum/cketh"
            />
            <CardWithDescription
              title="DeFi sample code"
              description=""
              href="https://internetcomputer.org/samples?selectedDomains=Asynchronous+DeFi
"
            />
            <CardWithDescription
              title="Code ckBTC"
              description=""
              href="/docs/defi/chain-key-tokens/ckbtc/overview"
            />
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default DefiPage;
