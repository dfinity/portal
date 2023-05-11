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
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";

const queryClient = new QueryClient();
const MotionLink = motion(Link);

const NnsTvl: React.FC = () => {
  const globalData = useGlobalData();
  const icpPrice = globalData["icp-price"]["default"] as number;
  const stakingMetricsQuery = useQuery("staking-metrics", getStakingMetrics);

  let tvl = <>&nbsp;</>;

  if (stakingMetricsQuery.isFetched && stakingMetricsQuery.isSuccess) {
    const maybeMetric: number | undefined =
      stakingMetricsQuery.data.metrics.find(
        (d) => d.name === "governance_total_locked_e8s"
      )?.samples[0]?.value;

    if (maybeMetric) {
      tvl = <>${((maybeMetric * icpPrice) / 100000000000000000).toFixed(1)}B</>;
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
        className="w-14 h-14 object-contain object-center"
        loading="lazy"
      />
      <div className="">
        <h3 className="tw-heading-6 mb-0">{title}</h3>
        <p className="tw-paragraph-sm text-black/60 mb-0">{description}</p>
      </div>
    </MotionLink>
  );
};

function CkbtcPage(): JSX.Element {
  const globalData = useGlobalData();
  const icpPrice = globalData["icp-price"]["default"] as number;

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
          <ShareMeta image="/img/shareImages/share-icp-tokens.jpeg" />
          {isDark && <DarkHeroStyles />}
          <section
            className="bg-infinite   text-white overflow-hidden"
            ref={ref}
          >
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
                  ckBTC: Upgrade
                  <br /> your Bitcoin
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-0 relative"
                  variants={transitions.item}
                >
                  ckBTC is a multi-chain asset that enables BTC value to be
                  transferred fast, and at low fees through a pair of
                  cryptographically secure canister smart contracts on the
                  Internet Computer.
                </motion.p>
              </div>
            </AnimateSpawn>
          </section>

          <AnimateSpawn
            el={motion.section}
            variants={transitions.container}
            className="container-10 relative md:pt-40"
          >
            <div className="-mt-40 md:mt-0 md:absolute md:right-0 md:-top-60 text-center">
              <motion.img
                variants={transitions.fadeIn}
                src="/img/icp-tokens/ckBTC-token-1.webp"
                alt=""
                className="w-full max-w-sm md:max-w-none aspect-[563/492]"
              />
            </div>
            <div className="mb-12 md:w-6/10">
              <motion.h2
                className="tw-heading-4 md:tw-heading-3 mb-6 text-gradient"
                variants={transitions.item}
              >
                Blockchain to blockchain: hold, send and transact native bitcoin
                without the need for bridges or off-chain intermediaries.
              </motion.h2>
            </div>
          </AnimateSpawn>
          <AnimateSpawn
            el={motion.section}
            variants={transitions.container}
            className="container-12 relative md:pt-40"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <motion.div
                className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-8 md:flex-1"
                variants={transitions.item}
              >
                <h3 className="inline-flex items-center gap-3 mb-4">
                  <span className="flex-1 text-gradient tw-heading-5">
                    Fast TXs with low fees
                  </span>
                </h3>
                <p className="tw-paragraph mb-6">
                  Enables small and casual transactions with Bitcoin.
                </p>
                <ul className="checklist space-y-3 mb-0">
                  <li className="checklist-item pl-8">
                    Fixed transaction fee: 10 satoshis
                  </li>
                  <li className="checklist-item pl-8">Burn for cycles </li>
                  <li className="checklist-item pl-8">Finality: 1-2 sec</li>
                  <li className="checklist-item pl-8">
                    Full balance always available. No channel liquidity issues
                  </li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-8 md:flex-1"
                variants={transitions.item}
              >
                <h3 className="inline-flex items-center gap-3 mb-4">
                  <span className="flex-1 text-gradient tw-heading-5">
                    Programmable
                  </span>
                </h3>
                <p className="tw-paragraph mb-6">
                  Build applications which address real world needs.
                </p>
                <ul className="checklist space-y-3 mb-0">
                  <li className="checklist-item pl-8">
                    Full balance always available. No channel liquidity issues
                  </li>
                  <li className="checklist-item pl-8">
                    Web applications with BTC support. Only a browser needed
                  </li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-8 md:flex-1"
                variants={transitions.item}
              >
                <h3 className="inline-flex items-center gap-3 mb-4">
                  <span className="flex-1 text-gradient tw-heading-5">
                    Multi-chain asset
                  </span>
                </h3>
                <p className="tw-paragraph mb-6">
                  Anyone can send and receive ckBTC value to and from addesses
                  on either network
                </p>
                <ul className="checklist space-y-3 mb-0">
                  <li className="checklist-item pl-8">
                    Total Supply: 72 BTC already upgraded
                  </li>
                  <li className="checklist-item pl-8">
                    No centralized custodians or bridges{" "}
                  </li>
                </ul>
              </motion.div>
            </div>
          </AnimateSpawn>

          <section className="container-12 mt-30 md:mt-40 flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/bitcoin-integration/openchat.webp">
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                OpenChat
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Send bitcoin at the speed of a chat
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-3">
                OpenChat is the worlds first chat network built 100% on a
                blockchain. Each OpenChat user has their own canister smart
                contract capable of sending, receiving and storing their
                messages. Their canister smart contract also acts as a wallet
                allowing users to hold, send and receive ckBTC to & from users
                on the OpenChat network with the ease and speed of a chat
                message.
              </p>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                OpenChat is controlled an SNS DAO. Making owners of it’s CHAT
                governance token the custodians of the OpenChat networks future.
              </p>
              <Link className="link-primary link-with-icon" href="/openchat">
                <LinkArrowRight /> Learn more about OpenChat
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/nft/social.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                DSCVR
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Tip creators with bitcoin{" "}
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Lorem ipsum dolor sit amet consectetur. Turpis urna nisl
                phasellus sed purus mi. Rhoncus mollis adipiscing adipiscing
                phasellus. Cursus a proin aliquam quis vel tellus aliquam semper
                adipiscing. Lacus quis adipiscing ornare tristique. Platea nunc
                nisl sagittis sollicitudin ullamcorper aliquam. Neque gravida
                viverra sit.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://dscvr.one"
              >
                <LinkArrowRight />
                Check out DSCVR
              </Link>
            </TranslatedLayout>
          </section>

          <section className="container-12 relative pt-20 md:pt-40">
            <AnimateSpawn
              className="mb-12 text-center"
              variants={transitions.item}
            >
              <h2 className="md:max-w-3xl mx-auto tw-heading-4 md:tw-heading-2 mb-0 text-gradient">
                Wallets & DEXs supporting ckBTC{" "}
              </h2>
            </AnimateSpawn>

            <AnimateSpawn
              className="grid sm:grid-cols-2 md:grid-cols-4 gap-5"
              variants={transitions.container}
            >
              <motion.div className="" variants={transitions.item}>
                <Link
                  className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col text-black hover:text-black hover:no-underline hover:-translate-y-3 transition-transform"
                  href="https://icdex.io"
                >
                  <img
                    src="/img/showcase/icdex_logo.webp"
                    loading="lazy"
                    alt=""
                    className="w-20 h-20"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">ICDex</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    First orderbook-based DEX running fully on-chain. Bypass
                    CEXs and get ICP or CHAT tokens for your BTC.{" "}
                  </p>
                </Link>
              </motion.div>
              <motion.div className="" variants={transitions.item}>
                <Link
                  className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col text-black hover:text-black hover:no-underline hover:-translate-y-3 transition-transform h-full"
                  href="https://icpswap.com"
                >
                  <img
                    src="/img/showcase/icpswap_logo.webp"
                    loading="lazy"
                    alt=""
                    className="w-20 h-20"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">ICP.Swap</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    Offers the largest number of tokens on the Internet
                    Computer. Trade meme coins or SNS DAO tokens.
                  </p>
                </Link>
              </motion.div>
              <motion.div className="" variants={transitions.item}>
                <Link
                  className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col text-black hover:text-black hover:no-underline hover:-translate-y-3 transition-transform h-full"
                  href="https://nns.ic0.app/"
                >
                  <img
                    src="/img/showcase/nnsfront-enddapp_logo.webp"
                    loading="lazy"
                    alt=""
                    className="w-20 h-20 object-center object-contain"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">NNS</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    Store and stake ICP, participate in governance.
                  </p>
                </Link>
              </motion.div>
              <motion.div className="" variants={transitions.item}>
                <Link
                  className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col text-black hover:text-black hover:no-underline hover:-translate-y-3 transition-transform h-full"
                  href="https://plugwallet.ooo/"
                >
                  <img
                    src="/img/showcase/plug_logo.webp"
                    loading="lazy"
                    alt=""
                    className="w-20 h-20"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">Plug</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    Access ckBTC and other tokens, cycles and dapps in one
                    click.
                  </p>
                </Link>
              </motion.div>
            </AnimateSpawn>
          </section>

          <section className="relative py-20 md:py-40">
            <AnimateSpawn
              className="mb-10 md:mb-20 container-10"
              variants={transitions.item}
            >
              <h2 className="tw-heading-4 md:tw-heading-2 mb-0 text-gradient md:w-7/10">
                What you need to know about ckBTC
              </h2>
            </AnimateSpawn>

            <AnimateSpawn
              className="container-12 flex gap-12 md:gap-1/12 flex-col md:flex-row md:items-start"
              variants={transitions.item}
            >
              <div className="flex-[4] relative flex items-start">
                <img
                  src="https://place-hold.it/600x600"
                  alt=""
                  className="flex-1 opacity-30"
                />
              </div>
              <div className="flex-[6] space-y-12 md:space-y-20">
                <div>
                  <h3 className="tw-heading-5 md:tw-heading-3 mb-6">
                    Why it’s not a bridge.
                  </h3>

                  <p className="tw-paragraph mb-3">
                    The recent incident where the FTX exchange acted as the
                    custodian, and Sollet the bridge for wrapping and unwrapping
                    BTC and ETH on Solana, demonstrated how bridges and
                    intermediaries are highly vulnerable to hacks or other forms
                    of compromise. Ethereum smart contracts behind the bridge
                    make asset transfers between blockchains possible, but users
                    must still trust a third-party centralized custodian to
                    manage the assets.{" "}
                  </p>
                  <p className="tw-paragraph mb-3">
                    On the Internet Computer, a pair of Canister Smart Contracts
                    natively communicate with the Bitcoin network, which means
                    they not only send and receive bitcoin, they also hold it —
                    no bridge or custodian, and verifiable by anyone. Chain-key
                    ECDSA signing is the technology that enables Internet
                    Computer nodes to create new Bitcoin addresses and sign
                    Bitcoin transactions at a protocol level. The secret
                    signature key is never stored in one place but rather broken
                    down into several key shares held by Internet Computer nodes
                    that are shared every 5-10 minutes, making a Bitcoin
                    transaction resilient to attacks by malicious nodes. ckBTC
                    canisters are also controlled by the NNS DAO, which means no
                    single entity can initiate malicious activities without the
                    approval of ICP governance token holders.
                  </p>
                </div>
                <div>
                  <h3 className="tw-heading-5 md:tw-heading-3 mb-6">
                    Why it’s not a wrapped token.
                  </h3>

                  <p className="tw-paragraph mb-3">
                    While ckBTC acts as a token and implements the ICRC-1
                    standard (the Internet Computer’s fungible token standard),
                    it is essentially a multi-chain asset that can be sent
                    freely between addresses on either the Bitcoin Network or
                    the Internet Computer. No wrapping necessary.
                  </p>
                </div>

                <div>
                  <h3 className="tw-heading-5 md:tw-heading-3 mb-6">
                    How it differs from Lightning.
                  </h3>

                  <p className="tw-paragraph mb-3">
                    The Lighting Network is a Layer-2 for Bitcoin. It acts as
                    payment channel extending Bitcoin’s throughput, bringing
                    down transaction fees. However, every transaction on the
                    Lighting Network needs to be settled on Bitcoin, which
                    limits the network’s flexibility. This is very different
                    from ckBTC, which greatly expands Bitcoin’s functionality by
                    allowing smart contracts to control ckBTC with near instant
                    finality and negligible fees. While ckBTC can act as a
                    Layer-2 for Bitcoin, its transactions do not need to settle
                    on Bitcoin’s ledger, rather it moves freely between the two
                    networks thanks to Chain-Key Signing.
                  </p>
                </div>
              </div>
              <div className="flex-[0]"></div>
            </AnimateSpawn>
          </section>
        </main>
      </Layout>
    </QueryClientProvider>
  );
}

export default CkbtcPage;
