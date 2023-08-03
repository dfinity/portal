import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const queryClient = new QueryClient();

async function fetchCkbtcTotalSupply(
  abortController: AbortController
): Promise<number> {
  const metrics = fetch(
    "https://mxzaz-hqaaa-aaaar-qaada-cai.raw.ic0.app/metrics",
    { signal: abortController.signal }
  ).then((res) => res.text());

  let totalSupplyLine = (await metrics)
    .split(/[\r\n]+/gi)
    .map((line) => line.trim())
    .find((line) => line.startsWith("ledger_total_supply"));
  if (totalSupplyLine) {
    return +totalSupplyLine.split(/\s+/)[1];
  }

  return 0;
}

function CkbtcPage(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(ref);
  const [totalSupply, setTotalSupply] = useState<number>(0);

  useEffect(() => {
    const abortSignal = new AbortController();

    fetchCkbtcTotalSupply(abortSignal).then((totalSupply) => {
      setTotalSupply(totalSupply);
    });

    return () => {
      abortSignal.abort();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout
        title="ckBTC is bitcoin on Web3"
        description="ckBTC can be sent with 1-2 second finality and negligible fees — a multi-chain bitcoin twin, trustlessly created by chain-key cryptography and Internet Computer smart contracts that directly hold raw bitcoin."
        editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
      >
        <main className="overflow-hidden">
          <ShareMeta image="/img/shareImages/share-ckBTC.jpg" />
          {isDark && <DarkHeroStyles />}
          <section
            className="bg-infinite text-white overflow-hidden"
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
                  ckBTC is bitcoin
                  <br /> on Web3
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-0 relative"
                  variants={transitions.item}
                >
                  ckBTC can be sent with 1-2 second finality and negligible fees — a multi-chain bitcoin twin,
                  trustlessly created by chain-key cryptography and Internet Computer smart contracts that
                  directly hold raw bitcoin.
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
                Hold, send and receive native bitcoin as if the Internet
                Computer and the Bitcoin network were one blockchain. No bridges
                or off-chain intermediaries.
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
                    Fast TXs with negligible fees
                  </span>
                </h3>
                <p className="tw-paragraph mb-6">
                  Enables small and casual transactions with Bitcoin.
                </p>
                <ul className="checklist space-y-3 mb-0">
                  <li className="checklist-item pl-8">
                    Fixed transaction fee: 10 satoshis
                  </li>
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
                  Build applications that address real world needs.
                </p>
                <ul className="checklist space-y-3 mb-0">
                  <li className="checklist-item pl-8">
                    Canister smart contracts can hold and send ckBTC
                  </li>
                  <li className="checklist-item pl-8">
                    Build web applications with BTC support. Users only need a
                    browser
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
                    No centralized custodians or bridges{" "}
                  </li>
                  <li className="checklist-item pl-8">
                    Chain-key integrations with other networks like Ethereum
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
                Send bitcoin at the speed of chat
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-3">
                OpenChat is the first chat network built 100% on a blockchain.
                Each OpenChat account is assigned to its own canister smart
                contract capable of sending, receiving and storing messages. It
                also acts as a wallet, which enables users to hold, send and
                receive ckBTC. Invite friends to OpenChat to receive and send
                around satoshis with ease, and at the speed of a chat message.
              </p>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                OpenChat is controlled an SNS DAO, making owners of its CHAT
                governance token the custodians of the OpenChat networks future.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://oc.app/"
              >
                <LinkArrowRight /> Join the OpenChat network
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
                DSCVR is an end-to-end decentralized Web3 social media platform
                on which communities form into groups called Portals. Create NFT
                gated Portals, airdrop fungible and non-fungible tokens to
                members and tip content creators for posts in a growing number
                of tokens and ckBTC. Social media tipping with bitcoin
                realizes a key part of Satoshi's original vision.
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
                    className="w-20 h-20 object-center object-contain"
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
                    className="w-20 h-20 object-center object-contain"
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
                    Choose your ckBTC account on the NNS frontend dapp to send
                    and receive from the Bitcoin network.
                  </p>
                </Link>
              </motion.div>
              
              <motion.div className="" variants={transitions.item}>
                <Link
                  className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col text-black hover:text-black hover:no-underline hover:-translate-y-3 transition-transform h-full"
                  href="https://sonic.ooo/"
                >
                  <img
                    src="/img/showcase/sonic_logo.webp"
                    loading="lazy"
                    alt=""
                    className="w-20 h-20 object-center object-contain"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">Sonic</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    Swap tokens, or provide liquidity on a fully on-chain DEX.
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
                    className="w-20 h-20 object-center object-contain"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">Plug</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    Handle your digital assets through a simple, more
                    traditional browser extension wallet.
                  </p>
                </Link>
              </motion.div>

              <motion.div className="" variants={transitions.item}>
                <Link
                  className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col text-black hover:text-black hover:no-underline hover:-translate-y-3 transition-transform h-full"
                  href="https://astrox.me/#/"
                >
                  <img
                    src="/img/showcase/astroxme_logo.webp"
                    loading="lazy"
                    alt=""
                    className="w-20 h-20 object-center object-contain"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">AstroX</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    Web3 Wallet Infrastructure for all your digital assets.
                  </p>
                </Link>
              </motion.div>

              <motion.div className="" variants={transitions.item}>
                <Link
                  className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col text-black hover:text-black hover:no-underline hover:-translate-y-3 transition-transform h-full"
                  href="https://airgap.it/"
                >
                  <img
                    src="/img/showcase/airgap_logo.webp"
                    loading="lazy"
                    alt=""
                    className="w-20 h-20 object-center object-contain"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">AirGap</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    Turn your old smartphone into an air gapped wallet to secure your ckBTC.
                  </p>
                </Link>
              </motion.div>

              <motion.div className="" variants={transitions.item}>
                <Link
                  href="/ecosystem/?tag=Bitcoin"
                  className="relative rounded-xl tw-lead-lg min-h-[200px] md:tw-title-sm hover:no-underline hover:text-white hover:-translate-y-3 transition-transform text-white flex px-6 py-8 backdrop-blur-2xl bg-gradient-100 from-[#3B00B9] to-[#2586B6] h-full"
                >
                  See more projects with Bitcoin support
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-8 right-8"
                  >
                    <path
                      d="M11.8398 30.3242L24.1631 18.001L11.8398 5.67773"
                      stroke="white"
                      strokeWidth="3"
                    />
                  </svg>
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
                  src="/img/bitcoin-integration/about-ckbtc.webp"
                  alt=""
                  className="flex-1"
                />
              </div>
              <div className="flex-[6] space-y-12 md:space-y-20">
                <div>
                  <h3 className="tw-heading-5 md:tw-heading-3 mb-6">
                    Why it’s not a bridged token.
                  </h3>

                  <p className="tw-paragraph mb-3">
                    The key innovations behind ckBTC are the{" "}
                    <Link href="/bitcoin-integration">
                      native Bitcoin integration
                    </Link>{" "}
                    and{" "}
                    <Link href="/docs/current/developer-docs/integrations/t-ecdsa/t-ecdsa-how-it-works">
                      chain-key ECDSA signing
                    </Link>{" "}
                    — advanced threshold cryptography integrated with ICP.
                    In short, chain-key ECDSA is a set of cryptographic protocols that allow
                    Internet Computer nodes to cooperatively create ECDSA signatures, which
                    can be used to sign bitcoin transactions, using a highly fault-tolerant,
                    decentralized network that is resilient to attacks by malicious nodes.
                    The secret key is never stored in one place, instead it is broken down
                    into key shares held by ICP nodes that are re-shared periodically.
                    When requested, nodes use their key shares to collectively sign BTC
                    transactions without recreating the original secret key.
                  </p>
                  <p className="tw-paragraph mb-3">
                    This enables a pair of canister smart contracts to trustlessly create ckBTC,
                    a multichain bitcoin twin that can be controlled by smart contracts and
                    sent with near instant finality for negligible fees — all without the need for
                    bridges or centralized custodians.
                  </p>
                  <p className="tw-paragraph mb-3">
                    This is important, because blockchain bridges are centralized, insecure,
                    cumbersome and costly. The insecurity alone is a dealbreaker: between
                    2021-2022, more than 2 billion dollars was stolen by exploiting blockchain
                    bridges. 
                  </p>
                  <p className="tw-paragraph mb-3">
                    The recent incident where the FTX exchange acted as the custodian, and
                    Sollet the bridge for wrapping and unwrapping BTC and ETH on Solana,
                    demonstrates how bridges and intermediaries can act as single points of
                    failures and are highly vulnerable to hacks. Ethereum smart contracts
                    behind a bridge make asset transfers between blockchains possible, but
                    users must still trust a third-party centralized custodian to manage the
                    digital assets whose code is often not publicly verifiable.
                  </p>
                  <p className="mt-10">
                    <Link
                      className="button-outline"
                      href="https://dashboard.internetcomputer.org/bitcoin"
                    >
                      ckBTC dashboard
                    </Link>
                  </p>
                  <Link
                    className="link-primary link-with-icon"
                    href="https://medium.com/dfinity/threshold-ecdsa-the-key-ingredient-behind-the-internet-computers-bitcoin-and-ethereum-cf22649b98a1"
                  >
                    <LinkArrowRight />
                     Chain-key ECDSA blog
                  </Link>
                </div>
                <div>
                  <h3 className="tw-heading-5 md:tw-heading-3 mb-6">
                    Why it’s not a wrapped token.
                  </h3>

                  <p className="tw-paragraph mb-3">
                    More than a token, while ckBTC implements the ICRC-1
                    fungible token standard, the pair of canister smart
                    contracts also allow bitcoin to be freely sent between
                    addresses either on the Bitcoin network or the Internet
                    Computer, making it the first true multi-chain asset.
                  </p>
                </div>

                <div>
                  <h3 className="tw-heading-5 md:tw-heading-3 mb-6">
                    How it differs from Lightning.
                  </h3>

                  <p className="tw-paragraph mb-3">
                    The Lightning Network is the most well known Layer-2 for
                    Bitcoin. Like ckBTC, it allows fast and cheap transfers of
                    BTC value off the Bitcoin blockchain.
                  </p>
                  <p className="tw-paragraph mb-3">
                    Unlike Lightning, ckBTC does not require peer-to-peer
                    payment channels to be established and funded. This means
                    that your full ckBTC balance can always be transferred — no
                    network liquidity limitations.
                  </p>
                  <p className="tw-paragraph mb-3">
                    Canister smart contracts can programmatically hold and
                    transfer ckBTC, making it possible to develop fully on-chain
                    Layer-2 applications for Bitcoin, which is not possible using
                    the Lightning Network.
                  </p>
                  <p className="tw-paragraph mb-3">
                    Another key difference is that ckBTC transaction fees are
                    fixed, and not dependent on the transaction amount, variable
                    intermediate forwarding, or unexpected channel funding fees.
                  </p>
                  <p className="tw-paragraph mb-3">
                    In the future, ckBTC will be available on other networks like
                    Ethereum – also directly, and without bridges, thanks to
                    chain-key cryptography integrations. 
                  </p>
                  <Link
                    className="link-primary link-with-icon mt-10"
                    href="/bitcoin-integration"
                  >
                    <LinkArrowRight />
                    How Native Bitcoin Integration Works
                  </Link>
                  <Link
                    className="link-primary link-with-icon"
                    href="https://medium.com/dfinity/chain-key-bitcoin-a-decentralized-bitcoin-twin-ceb8f4ddf95e"
                  >
                    <LinkArrowUpRight />
                    Blog: Chain-Key Bitcoin: A Decentralized Bitcoin Twin
                  </Link> 
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
