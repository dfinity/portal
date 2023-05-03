import Link from "@docusaurus/Link";
import useGlobalData from "@docusaurus/useGlobalData";
import Layout from "@theme/Layout";
import React, { useRef } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import { getStakingMetrics } from "../utils/network-stats";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const queryClient = new QueryClient();

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
    <Link
      to={link}
      className="flex gap-6 items-start bg-white/80 rounded-xl p-4 border border-white border-solid text-black hover:text-black hover:no-underline"
    >
      <img src={icon} alt="" className="w-14" loading="lazy" />
      <div className="">
        <h3 className="tw-heading-6 mb-0">{title}</h3>
        <p className="tw-paragraph-sm text-black/60 mb-0">{description}</p>
      </div>
    </Link>
  );
};

function TokenHolders(): JSX.Element {
  const globalData = useGlobalData();
  const icpPrice = globalData["icp-price"]["default"] as number;

  const ref = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(ref);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout
        title="ICP Tokens"
        description="Learn about the ICP tokens, how to stake and get involved in the governance of the Internet Computer and see how ICP can be converted to the cycles which are used for computation."
        editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
      >
        <main className="overflow-hidden">
          <ShareMeta image="/img/shareImages/share-icp-tokens.jpeg" />
          {isDark && <DarkHeroStyles />}
          <section
            ref={ref}
            className="bg-infinite   text-white overflow-hidden"
          >
            <div className="container-10 pt-20 md:pt-32 pb-52 md:pb-32 relative ">
              <div className="blob blob-purple blob-x-5 blob-y-10 blob-md z-0 opacity-50"></div>
              <div className="md:w-7/10">
                <h1 className="tw-heading-3 md:tw-heading-2 mb-8 md:mb-6 relative">
                  Understanding the ICP Token{" "}
                </h1>
                <p className="tw-lead-sm md:tw-lead mb-0 relative">
                  One of the best ways to engage with the Internet Computer and
                  its ecosystem is through the use of its native utility token.
                </p>
              </div>
            </div>
          </section>

          <section className="container-10 relative md:pt-52">
            <div className="-mt-40 md:mt-0 md:absolute md:right-0 md:-top-60 text-center">
              <img
                src="/img/icp-tokens/hero.webp"
                alt=""
                loading="lazy"
                className="w-full max-w-sm md:max-w-none"
              />
            </div>
            <div className="mb-12 md:w-7/10">
              <h2 className="tw-heading-4 md:tw-heading-3 mb-6 text-gradient">
                Power Computation, Staking, Voting, Governance & Ownership.{" "}
              </h2>
              <p className="tw-paragraph md:tw-lead-sm text-black/60 mb-3">
                Beyond trading, the ICP utility token plays various roles on the
                Internet Computer. It is used to participate in governance and
                to compensate node providers. ICP tokens can also be converted
                to ‘cycles’, which serves as gas for computation and storage in
                canister smart contracts. In addition to these core usages, ICP
                tokens can be used to participate in decentralization swaps to
                become a co-owner of SNS DAOs, and for various services on
                registries, marketplaces and exchanges operating on the Internet
                Computer blockchain.
              </p>
              <p className="tw-paragraph md:tw-lead-sm text-black/60 mb-0">
                The ICP token implements the ICRC-1 standard.
              </p>
            </div>
            <div className="flex flex-col gap-5 md:flex-row md:w-8/10">
              <div className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-8 md:flex-1">
                <h3 className="inline-flex items-center gap-3 mb-6">
                  <img
                    src="/img/icp-tokens/icp-token-logo.svg"
                    alt=""
                    loading="lazy"
                  />
                  <span className="flex-1 text-gradient tw-heading-5">
                    ICP Token Utility
                  </span>
                </h3>
                <ul className="checklist space-y-3 mb-0">
                  <li className="checklist-item pl-8">
                    Participate in governance
                  </li>
                  <li className="checklist-item pl-8">
                    Convert ICP to cycles{" "}
                  </li>
                  <li className="checklist-item pl-8">
                    Participate in decentralisation swaps
                  </li>
                </ul>
              </div>
              <div className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-8 md:flex-1">
                <h3 className="inline-flex items-center gap-3 mb-6">
                  <img
                    src="/img/icp-tokens/cycles-logo.svg"
                    alt=""
                    loading="lazy"
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
              </div>
            </div>
          </section>

          <section className="container-12 mt-20 md:mt-40">
            <div className="bg-white/80 border border-white border-solid rounded-xl px-6 py-12 flex flex-col gap-12 md:flex-row md:justify-between md:px-20 md:py-12 md:gap-6">
              <figure className="flex flex-col items-center m-0">
                <span className="tw-heading-3 lg:tw-heading-60 text-gradient mb-2">
                  $0
                </span>
                <figcaption className="tw-paragraph md:tw-lead-sm">
                  Gas fees for end users
                </figcaption>
              </figure>
              <figure className="flex flex-col items-center m-0">
                <span className="tw-heading-3 lg:tw-heading-60 text-gradient mb-2">
                  ${(icpPrice * 0.0001).toFixed(5)}
                </span>
                <figcaption className="tw-paragraph md:tw-lead-sm">
                  TX Fee
                </figcaption>
              </figure>
              <figure className="flex flex-col items-center m-0">
                <span className="tw-heading-3 lg:tw-heading-60 text-gradient mb-2">
                  1-2s
                </span>
                <figcaption className="tw-paragraph md:tw-lead-sm">
                  Finality
                </figcaption>
              </figure>
              <figure className="flex flex-col items-center m-0">
                <span className="tw-heading-3 lg:tw-heading-60 text-gradient mb-2">
                  <NnsTvl />
                </span>
                <figcaption className="tw-paragraph md:tw-lead-sm">
                  NNS TVL
                </figcaption>
              </figure>
            </div>
          </section>

          <section className="mt-20 md:mt-40">
            <div className="container-10 mb-10">
              <h2 className="tw-heading-3 mb-0 md:tw-heading-60">
                Ways to Use ICP Tokens
              </h2>
            </div>
            {/* <div className=""> */}
            <div className="container-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-16 ">
                <h3 className="tw-heading-5 md:tw-heading-4 mb-6">
                  Participate in Governance
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 text-black/60">
                  The Internet Computer Protocol is run by the NNS, the second
                  largest DAO in the blockchain space. ICP tokens holders can
                  participate in network governance simply by staking tokens in
                  neurons (digital bundles of tokens) and locking them for a
                  specific time period. Staking for 6 months or more makes token
                  holders eligible for voting and earning rewards of up to 17%
                  annually. ICP token holders can also submit proposals to make
                  changes to the Protocol. This open and autonomous governance
                  system runs 100% on chained, and currently holds over 250
                  million locked ICP.
                </p>
                <p className="mb-0">
                  <Link
                    href="https://wiki.internetcomputer.org/wiki/Network_Nervous_System"
                    className="link-primary link-with-icon items-center"
                  >
                    <LinkArrowRight />
                    Learn how to stake on the NNS dapp
                  </Link>
                </p>
              </div>
              <div className="bg-white/80 border border-white border-solid rounded-xl px-6 py-8 md:p-16 ">
                <h3 className="tw-heading-5 md:tw-heading-4 mb-6">
                  Buy Cycles for Compute & Storage
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 text-black/60">
                  Unlike other smart contract blockchains, the Internet Computer
                  runs on a “Reverse Gas Model”. This means computation and
                  storage costs are paid for by developers, and developers are
                  responsible topping up smart contracts with “cycles” to fuel
                  the compute power and storage of their dapps. The Reverse Gas
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
              </div>
              <div
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
                    Use ICP in the Ecosystem
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-6 text-black/60">
                    Store ICP in wallets, swap it on DEXs, collect NFTs or tip
                    friends while chatting. The Internet Computer is home to a
                    growing ecosystem of dapps, more and more of which are
                    introducing tokenization.
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
              </div>
            </div>
            {/* </div> */}
          </section>

          <section className="container-10 my-30 md:my-40 text-center text-white relative">
            <div className="blob blob-purple blob-md md:blob-lg blob-x-5 blob-y-5 z-[-1]"></div>
            <h2 className="tw-heading-3 md:tw-heading-60 mb-8">
              Where To Get ICP{" "}
            </h2>
            <p className="tw-lead mb-8">
              The ICP token is widely available on centralized exchanges.
            </p>
            <p className="mb-0">
              <Link
                href="https://coinmarketcap.com/currencies/internet-computer/markets/"
                className="button-outline-white"
              >
                Complete list on CoinMarketCap
              </Link>
            </p>
          </section>

          <section className="bg-infinite text-white">
            <div className="container-10 py-20 md:pt-40 md:pb-44">
              <div className="md:w-7/10">
                <h2 className="tw-heading-4 md:tw-heading-3 mb-10">
                  Forget Centralized Exchanges.
                  <br />
                  Buy ICP on a DEX with Bitcoin.
                </h2>
                <p className="tw-paragraph md:tw-lead-sm mb-0">
                  Directly fund a ckBTC wallet with BTC and swap it for ICP
                  using any of these DEXs — all without centralized exchanges.
                  Find out how native Bitcoin support on the Internet Computer
                  makes this possible.{" "}
                </p>
              </div>

              <div className="mt-20 grid grid-cols-1 gap-5 text-black sm:grid-cols-2 md:grid-cols-[3fr_3fr_5fr]">
                <div className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col">
                  <img
                    src="/img/showcase/icdex_logo.webp"
                    loading="lazy"
                    alt=""
                    className="w-20"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">ICDex</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    First orderbook-based DEX running fully on-chain. Bypass
                    CEXs and get ICP or CHAT tokens for your BTC.{" "}
                  </p>
                </div>
                <div className="bg-white/90 border border-white border-solid rounded-xl px-6 py-8 md:p-8 flex flex-col">
                  <img
                    src="/img/showcase/icpswap_logo.webp"
                    loading="lazy"
                    alt=""
                    className="w-20"
                  ></img>
                  <h3 className="tw-heading-5 mb-2 mt-8">ICP.Swap</h3>
                  <p className="tw-lead-sm mb-0 text-black/60">
                    Offers the largest number of tokens on the Internet
                    Computer. Trade meme coins or SNS DAO tokens.
                  </p>
                </div>

                <div className="-mb-24 lg:mb-0 relative sm:text-center md:text-left sm:col-span-2 md:col-span-1">
                  <img
                    src="/img/icp-tokens/ckBTC-token-1.webp"
                    alt=""
                    loading="lazy"
                    className="lg:absolute -top-20"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="container-12 pt-20 md:pt-40">
            <div className="text-center md:w-8/10 md:mx-auto">
              <h2 className="tw-heading-3 md:tw-heading-60 mb-6 md:mb-8">
                Wallets & Custody
              </h2>
              <p className="tw-lead-sm md:tw-lead mb-6 md:mb-8">
                Understand the benefits and limitations of each custody option
                so you can choose the wallet that best suits your needs.
              </p>
              <p className="mb-0">
                <Link className="link-primary link-with-icon">
                  Learn more about custody options <LinkArrowUpRight />
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-16 mt-16 md:mt-24 md:grid-cols-3">
              {/* Column 1 */}
              <div className="">
                <h3 className="tw-heading-5 mb-6">Web Wallets</h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  Web-based dapps that are easily accessible with the creation
                  of an Internet Identity. Great for daily use and small amount
                  transfers.
                </p>
                <div className="space-y-4">
                  <WalletCard
                    title="NNS Dapp"
                    description="Store and stake ICP, participate in governance."
                    link="https://nns.ic0.app/"
                    icon="/img/showcase/nnsfront-enddapp_logo.webp"
                  />
                  <WalletCard
                    title="Stoic"
                    description="The native wallet of ICP’s largest NFT marketplace, Entrepot."
                    link="https://www.stoicwallet.com/"
                    icon="/img/showcase/stoicwallet_logo.webp"
                  />
                  <WalletCard
                    title="AstroX ME"
                    description="ME wallet secures crypto assets without seed phrase across any device."
                    link="https://astrox.me/"
                    icon="/img/showcase/astroxme_logo.webp"
                  />
                  <WalletCard
                    title="OpenChat"
                    description="Chat accounts are crypto wallets. Send ICP, ckBTC and SNS tokens via messages."
                    link="https://oc.app"
                    icon="/img/showcase/openchat_logo.webp"
                  />
                  <WalletCard
                    title="TAGGR"
                    description="DAO controlled social media dapp. Every account comes with wallet out of the box."
                    link="https://taggr.link/"
                    icon="/img/showcase/taggr_logo.webp"
                  />
                  <WalletCard
                    title="NFID"
                    description="Web3 Identity. Every new account creates an untraceable hardware wallet."
                    link="https://nfid.one/"
                    icon="/img/showcase/nfid_logo.webp"
                  />
                </div>
              </div>
              {/* Column 2 */}
              <div className="">
                <h3 className="tw-heading-5 mb-6">Mobile App Wallets</h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  Understand the benefits and limitations of each custody option
                  so you can choose the wallet that best suits your needs.
                </p>
                <div className="space-y-4">
                  <WalletCard
                    title="Plug"
                    description="Access ICP and other tokens, cycles and dapps in one click."
                    link="https://plugwallet.ooo/"
                    icon="/img/showcase/plug_logo.webp"
                  />
                  <WalletCard
                    title="AstroX ME"
                    description="ME wallet secures crypto assets without seed phrase across any device."
                    link="https://astrox.me/"
                    icon="/img/showcase/astroxme_logo.webp"
                  />
                  <WalletCard
                    title="Klever"
                    description="Multi-chain mobile wallet integrated with the ICP ledger."
                    link="https://klever.io/"
                    icon="/img/showcase/kleverio_logo.webp"
                  />
                </div>

                <h3 className="tw-heading-5 mb-6 mt-16">
                  Browser Extension Wallets
                </h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  A more traditional way of storing tokens and interacting with
                  dapps. Great for users already familiar with crypto wallets
                  from other chains.
                </p>

                <div className="space-y-4">
                  <WalletCard
                    title="Plug"
                    description="Access ICP and other tokens, cycles and dapps in one click."
                    link="https://plugwallet.ooo/"
                    icon="/img/showcase/plug_logo.webp"
                  />
                  <WalletCard
                    title="Bitfinity Wallet"
                    description="Store and transfer BTC, ICP, SNS-1, and other tokens. One-click login to dapps."
                    link="https://wallet.infinityswap.one/"
                    icon="/img/showcase/bitfinitywallet_logo.webp"
                  />
                </div>
              </div>
              {/* Column 3 */}
              <div className="">
                <h3 className="tw-heading-5 mb-6">Hardware Wallets</h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  Maximum security. Hardware wallets hold private keys in
                  airgapped machines or ledger devices.
                </p>
                <div className="space-y-4">
                  <WalletCard
                    title="Ledger"
                    description="Complete control of crypto assets via a Ledger hardware wallet and Ledger app."
                    link="https://wallet.infinityswap.one/"
                    icon="/img/showcase/ledger_logo.webp"
                  />
                  <WalletCard
                    title="AirGap"
                    description="Turn your old smartphone into an air gapped crypto wallet."
                    link="https://support.airgap.it/currencies/icp/introduction/"
                    icon="/img/showcase/airgap_logo.webp"
                  />
                  <WalletCard
                    title="Quill"
                    description="Provides a command line tool to manage ICP in an air gapped computer."
                    link="https://github.com/dfinity/quill"
                    icon="/img/showcase/quill_logo.webp"
                  />
                </div>
                <h3 className="tw-heading-5 mb-6 mt-16">
                  Institutional custody
                </h3>
                <p className="tw-paragraph text-black/60 mb-8">
                  For anyone managing large amounts of crypto assets.
                  Institutional custodians offer reliability and customer
                  support.
                </p>
                <div className="space-y-4">
                  <WalletCard
                    title="Sygnum"
                    description="World’s first digital asset bank providing institutional-grade security to ICP holders."
                    link="https://www.sygnum.com/"
                    icon="/img/showcase/sygnum_logo.webp"
                  />
                  <WalletCard
                    title="Coinbase"
                    description="Store assets in segregated cold storage. Institutional-grade NFT custody solutions. "
                    link="https://www.coinbase.com/"
                    icon="/img/showcase/coinbase_logo.webp"
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="container-12 pt-24 md:pt-40 pb-30 relative">
            <div className=" text-white text-center">
              <div className="blob blob-purple blob-sm blob-x-5 blob-y-2 z-[-1] md:blob-lg md:blob-y-5"></div>
              <h2 className="tw-heading-3 md:tw-heading-60 mb-0">
                Get More Involved
              </h2>
            </div>

            <div className="flex flex-col gap-5 mt-6 md:mt-20 md:flex-row md:items-start">
              <div className="flex-1 bg-white/90 border border-white border-solid rounded-xl p-6 text-center md:p-12">
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
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex-1 bg-white/90 border border-white border-solid rounded-xl p-6 text-center md:px-11 md:py-12 md:mt-30">
                <h3 className="tw-lead-lg md:tw-title-sm mb-3">
                  DeFi on the Internet Computer
                </h3>
                <p className="tw-paragraph-sm mb-3 text-black/60">
                  All other DeFi platforms suffer from centralized components.
                  Build and use DeFi apps on the Internet Computer that are
                  hosted 100% on the blockchain.
                </p>
                <p className="mb-0">
                  <Link href="/defi" className="link-primary link-with-icon">
                    <LinkArrowRight />
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex-1 bg-white/90 border border-white border-solid rounded-xl p-6 text-center md:p-12">
                <h3 className="tw-lead-lg md:tw-title-sm mb-3">
                  Join the ICRC Conversation
                </h3>
                <p className="tw-paragraph-sm mb-3 text-black/60">
                  Community discussions around extending the ICRC token standard
                  for all ledgers to optimize functionality is ongoing. Be vocal
                  about your ideas.
                </p>
                <p className="mb-0">
                  <Link
                    href="https://forum.dfinity.org"
                    className="link-primary link-with-icon"
                  >
                    Join on Forum
                    <LinkArrowUpRight />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </QueryClientProvider>
  );
}

export default TokenHolders;
