import Link from "@docusaurus/Link";
import useGlobalData from "@docusaurus/useGlobalData";
import Layout from "@theme/Layout";
import React, { useRef } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import { getStakingMetrics } from "../utils/network-stats";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";

const queryClient = new QueryClient();
const MotionLink = motion(Link);

const NnsTvl: React.FC = () => {
  const globalData = useGlobalData();
  const cryptoPrice = globalData["crypto-price"]["default"] as {
    icp: number;
    btc: number;
  };
  const stakingMetricsQuery = useQuery("staking-metrics", getStakingMetrics);

  let tvl = <>&nbsp;</>;

  if (stakingMetricsQuery.isFetched && stakingMetricsQuery.isSuccess) {
    const maybeMetric: string | undefined =
      stakingMetricsQuery.data.metrics.find(
        (d) => d.name === "governance_total_locked_e8s"
      )?.subsets[0]?.value[1];

    if (maybeMetric) {
      tvl = (
        <>
          ${((+maybeMetric * cryptoPrice.icp) / 100000000000000000).toFixed(1)}B
        </>
      );
    }
  }

  return <>{tvl}</>;
};

const WalletCard: React.FC<{
  title: string;
  description: string;
  link: string;
  icon: string;
}> = ({ title, description, link, icon }) => {
  return (
    <MotionLink
      to={link}
      className="flex gap-6 items-start bg-white/80 rounded-xl p-4 border border-white border-solid text-black hover:text-black hover:no-underline"
      variants={transitions.item}
    >
      <img
        src={icon}
        alt=""
        className="w-14 h-14 object-contain object-center mx-0"
        loading="lazy"
      />
      <div className="">
        <h3 className="tw-heading-6 mb-0">{title}</h3>
        <p className="tw-paragraph-sm text-black/60 mb-0">{description}</p>
      </div>
    </MotionLink>
  );
};

function TokenHolders(): JSX.Element {
  const globalData = useGlobalData();
  const cryptoPrice = globalData["crypto-price"]["default"] as {
    icp: number;
    btc: number;
  };

  const ref = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(ref);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout
        title="ICP Tokens"
        description="ICP, the native utility token of the Internet Computer powers computation, staking, voting, governance and ownership."
        editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
      >
        <main className="overflow-hidden">
          <ShareMeta image="/img/shareImages/share-icp-tokens.jpg" />
          {isDark && <DarkHeroStyles />}
          <section className="bg-infinite text-white overflow-hidden" ref={ref}>
            <AnimateSpawn
              className="container-10 pt-20 md:pt-32 pb-52 md:pb-32 relative "
              variants={transitions.container}
            >
              <div className="blob blob-purple blob-x-5 blob-y-10 blob-md z-0 opacity-50"></div>
              <div className="md:w-7/10">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-8 md:mb-6 relative"
                  variants={transitions.item}
                >
                  Understanding the ICP token{" "}
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-0 relative"
                  variants={transitions.item}
                >
                  Engage with the Internet Computer and its ecosystem through
                  the use of its native utility token.
                </motion.p>
              </div>
            </AnimateSpawn>
          </section>

          <AnimateSpawn
            el={motion.section}
            variants={transitions.container}
            className="container-10 relative md:pt-52"
          >
            <div className="-mt-40 md:mt-0 md:absolute md:right-0 md:-top-60 text-center">
              <motion.img
                variants={transitions.fadeIn}
                src="/img/icp-tokens/hero.webp"
                alt=""
                className="w-full max-w-sm md:max-w-none aspect-[563/492]"
              />
            </div>
            <div className="mb-12 md:w-7/10">
              <motion.h2
                className="tw-heading-4 md:tw-heading-3 mb-6 text-gradient"
                variants={transitions.item}
              >
                Powers computation, staking, voting, governance & ownership.{" "}
              </motion.h2>
              <motion.p
                className="tw-paragraph md:tw-lead-sm text-black/60 mb-3"
                variants={transitions.item}
              >
                The ICP token plays a number of roles on the Internet Computer.
                Firstly, as a governance token, it can be staked to exercise
                those governance rights. As a utility token, it can be burned to
                obtain ‘cycles‘ which serves as gas for computation and storage
                in canister smart contracts. It can also be minted to reward
                ‘node machine‘ providers for providing that compute and storage.
              </motion.p>
              <motion.p
                className="tw-paragraph md:tw-lead-sm text-black/60 mb-3"
                variants={transitions.item}
              >
                In addition to these core uses, ICP tokens can be used to
                participate in decentralisation swaps to become a co-owner of an
                SNS DAO, and when using many smart contract services built on
                the Internet Computer such as registries, marketplaces and
                exchanges.
              </motion.p>
              <motion.p
                className="tw-paragraph md:tw-lead-sm text-black/60 mb-0"
                variants={transitions.item}
              >
                The ICP token implements the ICRC-1 standard.
              </motion.p>
            </div>
            <div className="flex flex-col gap-5 md:flex-row md:w-8/10">
              <motion.div
                className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-8 md:flex-1"
                variants={transitions.item}
              >
                <h3 className="inline-flex items-center gap-3 mb-6">
                  <img
                    src="/img/icp-tokens/icp-token-logo.svg"
                    alt="ICP logo"
                    loading="lazy"
                    className="w-16 h-16"
                  />
                  <span className="flex-1 text-gradient tw-heading-5">
                    ICP token utility
                  </span>
                </h3>
                <ul className="checklist space-y-3 mb-0">
                  <li className="checklist-item pl-8">
                    Participate in governance
                  </li>
                  <li className="checklist-item pl-8">Burn for cycles </li>
                  <li className="checklist-item pl-8">
                    Participate in decentralisation swaps
                  </li>
                  <li className="checklist-item pl-8">
                    Reward node machine providers
                  </li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-8 md:flex-1"
                variants={transitions.item}
              >
                <h3 className="inline-flex items-center gap-3 mb-6">
                  <img
                    src="/img/icp-tokens/cycles-logo.svg"
                    className="w-16 h-16"
                    loading="lazy"
                    alt="Cycles logo"
                  />
                  <span className="flex-1 text-gradient tw-heading-5">
                    Cycles
                  </span>
                </h3>
                <ul className="checklist space-y-3 mb-0">
                  <li className="checklist-item pl-8">
                    Stable cost of compute & storage
                  </li>
                  <li className="checklist-item pl-8">
                    Fuel storage, compute, & bandwidth
                  </li>
                </ul>
              </motion.div>
            </div>
          </AnimateSpawn>

          <AnimateSpawn
            className="container-12 mt-20 md:mt-40"
            el={motion.section}
            variants={transitions.container}
          >
            <div className="bg-white/80 border border-white border-solid rounded-xl px-6 py-12 flex flex-col gap-12 md:flex-row md:justify-between md:px-20 md:py-12 md:gap-6">
              <motion.figure
                className="flex flex-col items-center m-0"
                variants={transitions.item}
              >
                <span className="tw-heading-3 lg:tw-heading-60 text-gradient mb-2">
                  $0
                </span>
                <figcaption className="tw-paragraph md:tw-lead-sm">
                  Gas fees for end users
                </figcaption>
              </motion.figure>
              <motion.figure
                className="flex flex-col items-center m-0"
                variants={transitions.item}
              >
                <span className="tw-heading-3 lg:tw-heading-60 text-gradient mb-2">
                  ${(cryptoPrice.icp * 0.0001).toFixed(5)}
                </span>
                <figcaption className="tw-paragraph md:tw-lead-sm">
                  Ledger TX Fee
                </figcaption>
              </motion.figure>
              <motion.figure
                className="flex flex-col items-center m-0"
                variants={transitions.item}
              >
                <span className="tw-heading-3 lg:tw-heading-60 text-gradient mb-2">
                  1-2s
                </span>
                <figcaption className="tw-paragraph md:tw-lead-sm">
                  Finality
                </figcaption>
              </motion.figure>
              <motion.figure
                className="flex flex-col items-center m-0"
                variants={transitions.item}
              >
                <span className="tw-heading-3 lg:tw-heading-60 text-gradient mb-2">
                  <NnsTvl />
                </span>
                <figcaption className="tw-paragraph md:tw-lead-sm">
                  Locked in governance
                </figcaption>
              </motion.figure>
            </div>
          </AnimateSpawn>

          <section className="mt-20 md:mt-40">
            <AnimateSpawn
              className="container-10 mb-10"
              variants={transitions.item}
            >
              <h2 className="tw-heading-3 mb-0 md:tw-heading-60">
                Ways to use ICP tokens
              </h2>
            </AnimateSpawn>
            <div className="container-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              <AnimateSpawn
                className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-16 "
                variants={transitions.item}
              >
                <h3 className="tw-heading-5 md:tw-heading-4 mb-6">
                  Participate in governance
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 text-black/60">
                  The Internet Computer Protocol is run by the NNS, the largest
                  DAO managing an L1 blockchain. ICP token holders can
                  participate in network governance simply by staking tokens in
                  neurons and locking them with a specified dissolve delay (time
                  to unlock). A neuron with a dissolve delay greater than 6
                  months can vote on governance proposals and earn rewards. ICP
                  neuron holders can also submit proposals to make changes to
                  the protocol. This open and autonomous governance system runs
                  100% on chain, and currently holds over 250 million locked
                  ICP.
                </p>
                <p className="mb-0">
                  <Link
                    href="/nns"
                    className="link-primary link-with-icon items-center"
                  >
                    <LinkArrowRight />
                    Participate in governance by staking ICP
                  </Link>
                </p>
              </AnimateSpawn>
              <AnimateSpawn
                className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-16 "
                variants={transitions.item}
              >
                <h3 className="tw-heading-5 md:tw-heading-4 mb-6">
                  Burn for cycles
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 text-black/60">
                  Unlike other smart contract blockchains, the Internet Computer
                  runs on a “Reverse Gas Model”. This means computation and
                  storage costs are paid for by developers, and developers are
                  responsible topping up smart contracts with cycles to fuel the
                  compute power and storage of their dapps. The Reverse Gas
                  Model allows users to interact with dapps on the Internet
                  Computer without tokens, and as seamlessly as they would on
                  any Web2 application.
                </p>
                <p className="mb-0">
                  <Link
                    href="/capabilities/reverse-gas"
                    className="link-primary link-with-icon items-center"
                  >
                    <LinkArrowRight />
                    More on the Reverse Gas Model
                  </Link>
                </p>
              </AnimateSpawn>
              <AnimateSpawn
                variants={transitions.item}
                className="
                bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-16 md:col-span-2
                bg-[url(/img/icp-tokens/ecosystem-mobile.webp)] sm:bg-[url(/img/icp-tokens/ecosystem.webp)] 
                bg-[center_bottom_-20px] bg-[length:120%] bg-no-repeat 

                sm:bg-[right_-200px_top_-100px] sm:bg-[length:auto_180%]
                md:bg-[right_-160px_top_-100px] md:bg-[length:auto_160%]
                lg:bg-[right_-160px_center] lg:bg-[length:auto_180%]
              "
              >
                <div className="sm:w-6/10 lg:w-4/10">
                  <h3 className="tw-heading-5 md:tw-heading-4 mb-6">
                    Use ICP in the ecosystem
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-6 text-black/60">
                    Store ICP in wallets, swap it on DEXs, collect NFTs or tip
                    friends while chatting. The Internet Computer is home to a
                    growing ecosystem of dapps, many of which use ICP.
                  </p>
                  <p className="pb-[100%] sm:pb-0 mb-0">
                    <Link
                      href="/ecosystem"
                      className="link-primary link-with-icon items-center"
                    >
                      <LinkArrowRight />
                      Check out dapps
                    </Link>
                  </p>
                </div>
              </AnimateSpawn>
            </div>
            {/* </div> */}
          </section>

          <AnimateSpawn
            className="container-10 my-30 md:my-40 text-center text-white relative"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-md md:blob-lg blob-x-5 blob-y-5 z-[-1]"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-8"
              variants={transitions.item}
            >
              Where to get ICP{" "}
            </motion.h2>
            <motion.p className="tw-lead mb-8" variants={transitions.item}>
              The ICP token is widely available on centralized exchanges.
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link
                href="https://coinmarketcap.com/currencies/internet-computer/markets/"
                className="button-outline-white"
              >
                Complete list on CoinMarketCap
              </Link>
            </motion.p>
          </AnimateSpawn>

          <AnimateSpawn
            className="bg-infinite text-white"
            el={motion.section}
            variants={transitions.container}
          >
            <div className="container-10 py-20 md:pt-40 md:pb-44">
              <div className="md:w-7/10">
                <motion.h2
                  className="tw-heading-4 md:tw-heading-3 mb-10"
                  variants={transitions.item}
                >
                  Swap BTC for ICP on a DEX.
                </motion.h2>
                <motion.p
                  className="tw-paragraph md:tw-lead-sm mb-0"
                  variants={transitions.item}
                >
                  Directly fund a ckBTC wallet with BTC and swap it for ICP
                  using any of these DEXs — all without centralized exchanges.
                  This was made possible on the Internet Computer through native{" "}
                  <Link
                    className="text-white hover:text-white underline hover:cursor-pointer"
                    href="/bitcoin"
                  >
                    Bitcoin integration
                  </Link>
                  .
                </motion.p>
              </div>

              <div className="mt-20 grid grid-cols-1 gap-5 text-black sm:grid-cols-2 md:grid-cols-[3fr_3fr_5fr]">
                <motion.div className="" variants={transitions.item}>
                  <Link
                    className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col text-black hover:text-black hover:no-underline hover:-translate-y-3 transition-transform"
                    href="https://icdex.io"
                  >
                    <img
                      src="/img/showcase/icdex_logo.webp"
                      loading="lazy"
                      alt=""
                      className="w-20 h-20 ml-0 mr-auto"
                    ></img>
                    <h3 className="tw-heading-5 mb-2 mt-8">ICDex</h3>
                    <p className="tw-lead-sm mb-0 text-black/60">
                      First orderbook-based DEX running fully onchain. Bypass
                      CEXs and get ICP or CHAT tokens for your BTC.{" "}
                    </p>
                  </Link>
                </motion.div>
                <motion.div className="" variants={transitions.item}>
                  <Link
                    className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col text-black hover:text-black hover:no-underline hover:-translate-y-3 transition-transform"
                    href="https://icpswap.com"
                  >
                    <img
                      src="/img/showcase/icpswap_logo.webp"
                      loading="lazy"
                      alt=""
                      className="w-20 h-20 ml-0 mr-auto"
                    ></img>
                    <h3 className="tw-heading-5 mb-2 mt-8">ICP.Swap</h3>
                    <p className="tw-lead-sm mb-0 text-black/60">
                      Offers the largest number of tokens on the Internet
                      Computer. Trade meme coins or SNS DAO tokens.
                    </p>
                  </Link>
                </motion.div>

                <motion.div
                  className="-mb-24 lg:mb-0 relative sm:text-center md:text-left sm:col-span-2 md:col-span-1"
                  variants={transitions.fadeIn}
                >
                  <img
                    src="/img/icp-tokens/ckBTC-token-1.webp"
                    alt=""
                    loading="lazy"
                    className="lg:absolute -top-20"
                  />
                </motion.div>
              </div>
            </div>
          </AnimateSpawn>
          <section className="container-12 pt-20 md:pt-40">
            <AnimateSpawn
              className="text-center md:w-8/10 md:mx-auto"
              variants={transitions.container}
            >
              <motion.h2
                id="anchor-wallets"
                className="tw-heading-3 md:tw-heading-60 mb-6 md:mb-8"
                variants={transitions.item}
              >
                Wallets &amp; custody
              </motion.h2>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-6 md:mb-8"
                variants={transitions.item}
              >
                Understand the benefits and limitations of each custody option
                so you can choose the wallet that best suits your needs.
              </motion.p>
              <motion.p className="mb-0" variants={transitions.item}>
                <Link
                  className="link-primary link-with-icon"
                  href="https://internetcomputer.org/ecosystem?tag=Wallet"
                >
                  See all wallets
                  <LinkArrowUpRight />
                </Link>
              </motion.p>
            </AnimateSpawn>
            <AnimateSpawn
              className="grid grid-cols-1 gap-16 mt-16 md:mt-24 md:grid-cols-3"
              variants={transitions.container}
            >
              {/* Column 1 */}
              <motion.div className="" variants={transitions.item}>
                <h3 className="tw-heading-5 mb-6">Web Wallets</h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  Web-based dapps that are easily accessible with the creation
                  of an Internet Identity. Great for daily use and small amount
                  transfers.
                </p>
                <div className="space-y-4">
                  <WalletCard
                    title="Oisy"
                    description="Safe. Seamless. Sovereign. Built by Dfinity"
                    link="https://oisy.com/"
                    icon="/img/showcase/oisy_logo.svg"
                  />
                  <WalletCard
                    title="NNS Dapp"
                    description="Store and stake ICP, participate in governance."
                    link="https://nns.ic0.app/"
                    icon="/img/showcase/nnsfront-enddapp_logo.webp"
                  />
                  <WalletCard
                    title="NFID"
                    description="Crypto wallet & gateway to ICP apps"
                    link="https://nfid.one/"
                    icon="/img/showcase/nfid_logo.webp"
                  />
                </div>
                <h3 className="tw-heading-5 mb-6 mt-12 ">Mobile app wallets</h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  Mobile apps offer easy access to crypto assets for people who
                  use them frequently.
                </p>
                <div className="space-y-4">
                  <WalletCard
                    title="Plug"
                    description="Access ICP and other tokens, cycles and dapps in one click."
                    link="https://plugwallet.ooo/"
                    icon="/img/showcase/plug_logo.webp"
                  />
                  <WalletCard
                    title="Trust Wallet"
                    description="Multichain wallet trusted by 140M people"
                    link="https://trustwallet.com/blog/beginners-guide-to-icp"
                    icon="/img/showcase/logo_trust.png"
                  />
                  <WalletCard
                    title="Bity"
                    description="Self-custody app connected to Bity's fiat gateway"
                    link="https://bity.com/en/personal/wallet"
                    icon="/img/showcase/logo_bity.png"
                  />
                </div>
              </motion.div>
              {/* Column 2 */}
              <motion.div className="" variants={transitions.item}>
                <h3 className="tw-heading-5 mb-6">Browser extension wallets</h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  Great for users already familiar with crypto wallets from
                  other chains. <br />
                </p>

                <div className="space-y-4">
                  <WalletCard
                    title="Plug"
                    description="Access ICP and other tokens, cycles and dapps in one click."
                    link="https://plugwallet.ooo/"
                    icon="/img/showcase/plug_logo.webp"
                  />
                  <WalletCard
                    title="Trust Wallet"
                    description="Multichain wallet trusted by 140M people"
                    link="https://trustwallet.com/blog/beginners-guide-to-icp"
                    icon="/img/showcase/logo_trust.png"
                  />
                </div>
                <h3 className="tw-heading-5 mb-6 mt-12">Hardware wallets</h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  Maximum security. Hardware wallets hold private keys in
                  airgapped machines or ledger devices.
                </p>
                <div className="space-y-4">
                  <WalletCard
                    title="Ledger HW wallets"
                    description="The original hardware wallet incl. staking support"
                    link="https://www.ledger.com/coin/wallet/internet-computer"
                    icon="/img/showcase/ledger_logo.webp"
                  />
                  <WalletCard
                    title="AirGap"
                    description="Turn your old phone into a HW wallet"
                    link="https://support.airgap.it/currencies/icp/introduction/"
                    icon="/img/showcase/airgap_logo.webp"
                  />
                  <WalletCard
                    title="Tangem"
                    description="Cold wallet in a smart card"
                    link="https://x.com/Tangem/status/1841759127845982370"
                    icon="/img/showcase/logo_tangem.png"
                  />
                </div>
              </motion.div>
              {/* Column 3 */}
              <motion.div className="" variants={transitions.item}>
                <h3 className="tw-heading-5 mb-6">Institutional custody</h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  For anyone managing large amounts of crypto assets.
                  Institutional custodians offer reliability and customer
                  support.
                </p>
                <div className="space-y-4">
                  <WalletCard
                    title="ARCHIP"
                    description="Institutional custody solution of Swiss private bank Maerki Baumann"
                    link="https://www.archip.ch/"
                    icon="/img/showcase/archip.png"
                  />
                  <WalletCard
                    title="Bitgo"
                    description="Institutional ICP custody"
                    link="https://www.bitgo.com/"
                    icon="/img/showcase/app-logo-bitgo.png"
                  />
                  <WalletCard
                    title="Ceffu"
                    description="ICP custody powering solutions for hundreds of institutions"
                    link="https://www.ceffu.com/"
                    icon="/img/showcase/app-logo-ceffu.png"
                  />
                  <WalletCard
                    title="Cobo"
                    description="Institutional custody infrastructure with strong footprint in Asia and bitcoin ecosystem"
                    link="https://www.cobo.com/"
                    icon="/img/showcase/app-logo-cobo.png"
                  />
                  <WalletCard
                    title="Coinbase"
                    description="Institutional ICP custody"
                    link="https://www.coinbase.com/"
                    icon="/img/showcase/app-logo-coinbase.png"
                  />
                  <WalletCard
                    title="Copper"
                    description="Institutional ICP & ecosystem token custody and ICP staking"
                    link="https://copper.co/"
                    icon="/img/showcase/app-logo-copper.png"
                  />
                  <WalletCard
                    title="Cordial Systems"
                    description="High security MPC, supporting Institutional ICP custody"
                    link="https://cordial.systems/"
                    icon="/img/showcase/app-logo-cordial.png"
                  />
                  <WalletCard
                    title="DFNS"
                    description="Institutional ICP custody"
                    link="https://www.dfns.co/"
                    icon="/img/showcase/app-logo-DFNS.png"
                  />
                  <WalletCard
                    title="Primevault"
                    description="Institutional ICP & ecosystem token custody with DeFi access"
                    link="https://www.primevault.com/"
                    icon="/img/showcase/app-logo-primevault.png"
                  />
                  <WalletCard
                    title="Sygnum"
                    description="Institutional ICP custody & staking"
                    link="https://www.sygnum.com/"
                    icon="/img/showcase/app-logo-sygnum.png"
                  />
                  <WalletCard
                    title="Taurus"
                    description="Institutional ICP & ecosystem token custody and staking"
                    link="https://www.taurushq.com/"
                    icon="/img/showcase/app-logo-taurus.png"
                  />
                  <WalletCard
                    title="Zodia"
                    description="Leading institutional custody provider serving the funds market"
                    link="https://zodia.io/"
                    icon="/img/showcase/app-logo-zodia.png"
                  />
                </div>
              </motion.div>
            </AnimateSpawn>
          </section>
          <AnimateSpawn
            className="container-12 pt-24 md:pt-40 pb-30 relative"
            el={motion.section}
            variants={transitions.container}
          >
            <div className=" text-white text-center">
              <motion.div
                className="blob blob-purple blob-sm blob-x-5 blob-y-2 z-[-1] md:blob-lg md:blob-y-5"
                variants={transitions.fadeIn}
              ></motion.div>
              <motion.h2
                className="tw-heading-3 md:tw-heading-60 mb-0"
                variants={transitions.item}
              >
                Get more involved
              </motion.h2>
            </div>

            <div className="flex flex-col gap-5 mt-6 md:mt-20 md:flex-row md:items-start">
              <motion.div
                className="flex-1 bg-white/90 border border-white border-solid rounded-xl p-6 text-center md:p-12"
                variants={transitions.item}
              >
                <h3 className="tw-lead-lg md:tw-title-sm mb-3">
                  Participate in SNS DAOs
                </h3>
                <p className="tw-paragraph-sm mb-3 text-black/60">
                  Own a piece of your favorite dapps on the Internet Computer,
                  and shape their development by participating in governance.
                </p>
                <p className="mb-0">
                  <Link href="/sns" className="link-primary link-with-icon">
                    <LinkArrowRight />
                    About SNS DAOs
                  </Link>
                </p>
              </motion.div>
              <motion.div
                className="flex-1 bg-white/90 border border-white border-solid rounded-xl p-6 text-center md:px-11 md:py-12 md:mt-30"
                variants={transitions.item}
              >
                <h3 className="tw-lead-lg md:tw-title-sm mb-3">
                  DeFi on the Internet Computer
                </h3>
                <p className="tw-paragraph-sm mb-3 text-black/60">
                  Build and use DeFi apps on the Internet Computer that are
                  hosted 100% on the blockchain.
                </p>
                <p className="mb-0">
                  <Link href="/defi" className="link-primary link-with-icon">
                    <LinkArrowRight />
                    DeFi on ICP
                  </Link>
                </p>
              </motion.div>
              <motion.div
                className="flex-1 bg-white/90 border border-white border-solid rounded-xl p-6 text-center md:p-12"
                variants={transitions.item}
              >
                <h3 className="tw-lead-lg md:tw-title-sm mb-3">
                  Join the ICRC conversation
                </h3>
                <p className="tw-paragraph-sm mb-3 text-black/60">
                  Community discussions around extending the ICRC token standard
                  for all ledgers to optimize functionality is ongoing.
                </p>
                <p className="mb-0">
                  <Link
                    href="https://forum.dfinity.org"
                    className="link-primary link-with-icon"
                  >
                    Share your ideas on the Forum
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </motion.div>
            </div>
          </AnimateSpawn>
        </main>
      </Layout>
    </QueryClientProvider>
  );
}

export default TokenHolders;
