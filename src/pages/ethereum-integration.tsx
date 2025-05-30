import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import Newsletter from "../components/Common/Newsletter/Newsletter";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import VideoCard from "../components/Common/VideoCard";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const MotionLink = motion(Link);

const projects = [
  {
    imgSrc: "img/ethereum-integration/bitfinity.webp",
    title: "Bitfinity",
    description:
      "Bitfinity is a fast, next-generation EVM that allows you to deploy smart contracts written in Solidity on ICP.",
    link: "https://bitfinity.network/",
  },
  {
    imgSrc: "img/ethereum-integration/msq.webp",
    title: "MSQ",
    description:
      "Masquerade (MSQ) is a Metamask Snap based wallet that supports ICRC-1 payments.",
    link: "https://msq.tech/",
  },
  {
    imgSrc: "img/ethereum-integration/zcloak.webp",
    altText: "zCloak Logo",
    title: "zCloak",
    description:
      "zCloak network is developing a chain abstraction-based zero knowledge co-processor on ICP.",
    link: "https://zcloak.network/",
  },
  {
    imgSrc: "img/ethereum-integration/siwe.webp",
    altText: "SIWE Logo",
    title: "SIWE",
    description:
      "Sign In With Ethereum(SIWE) is a collection of support libraries and template dapps to simplify the process for Ethereum developers to enable sign in with the EIP-4361 standard.",
    link: "https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic_siwe",
  },
  {
    imgSrc: "img/ethereum-integration/helix.webp",
    altText: "Helix Logo",
    title: "Helix",
    description:
      "Helix Markets stands out as a groundbreaking hybrid spot orderbook decentralized exchange (DEX) meticulously crafted on ICP.",
    link: "https://helixmarkets.io",
  },
  {
    imgSrc: "img/ethereum-integration/orally.webp",
    altText: "Orally Logo",
    title: "Orally",
    description:
      "Orally is a decentralized data oracle provider. The goal of Orally's suite of products is to make digital asset data and real world data accessible onchain.",
    link: "https://orally.network/",
  },
  {
    imgSrc: "img/ethereum-integration/chainsight.webp",
    altText: "Chainsight Logo",
    title: "Chainsight",
    description:
      "Chainsight provides a data processing layer to develop dapps that go one step ahead. It is an extension layer that leverages historical data, constantly updated data, and cross-chain data to compute the information you need for your dapp.",
    link: "https://chainsight.network/",
  },
  {
    imgSrc: "img/ethereum-integration/nfid.webp",
    altText: "NFID Vaults Logo",
    title: "NFID Vaults",
    description:
      "NFID Vaults is the only omni-chain smart wallet protocol on the web. People who want the most robust security for their assets use NFID Vaults to protect them from theft, loss, collusion, and fraud.",
    link: "https://www.nfidvaults.com/",
  },
];

const Prose: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        `prose
      prose-h2:tw-heading-4 prose-h2:md:tw-heading-60 prose-h2:mb-3 prose-h2:mt-0
      prose-p:tw-paragraph
      prose-ul:tw-paragraph marker:prose-ul:text-black
      prose-a:no-underline
      prose-h3:tw-heading-5 md:prose-h3:tw-heading-4 prose-h3:mb-4 prose-h3:mt-0
      `,
        className
      )}
    >
      {children}
    </div>
  );
};

const AnimatedProse: React.FC<{
  children: React.ReactNode;
  className?: string;
  variants?: any;
}> = ({ children, className, variants = transitions.item }) => (
  <motion.div variants={variants} className={className}>
    <Prose>{children}</Prose>
  </motion.div>
);

const ProjectCard: React.FC<{
  imgSrc: string;
  title: string;
  description: string;
  link: string;
}> = ({ imgSrc, title, description, link }) => {
  return (
    <div className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl px-6 md:p-12">
      <img
        src={`${imgSrc}`}
        alt=""
        loading="lazy"
        className="rounded-2xl w-full"
      />
      <div className="md:pr-20">
        <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
          {title}
        </h3>
        <p className="tw-paragraph md:tw-lead-sm mb-5">{description}</p>
        <Link
          className="link-primary link-with-icon"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkArrowRight /> Learn More
        </Link>
      </div>
    </div>
  );
};

function EthereumIntegrationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
  return (
    <Layout
      title="Hello, Ethereum"
      description="A true World Computer enables a multichain environment where centralized bridges are obsolete and smart contracts can seamlessly communicate across blockchains. ICP already integrates with the Bitcoin Network, and native ETH integration is underway."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-ethereum-integration.webp"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className="overflow-hidden bg-infinite text-white pt-20"
          ref={heroRef}
        >
          <AnimateSpawn
            className="container-10 pt-20 pb-40 md:pb-30 md:pt-36 relative"
            variants={transitions.container}
          >
            <div className="blob blob-white blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <div className="md:w-7/10 relative">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Hello, Ethereum
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                Chain Fusion technology brings unique ICP features to Ethereum.
                Smart contracts gain access to threshold signing services,
                oracles, DAO frameworks, privacy tools, pass key authentication,
                smart contract wallets, and reverse gas fees. Augment Ethereum
                dapps to build seamless multichain solutions for DeFi, NFT
                trading, payments, SocialFi and more.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-12 relative"
          el={motion.section}
          variants={transitions.fadeIn}
        >
          <div className="text-center md:w-5/10 relative md:absolute top-30 sm:top-40 md:top-36 -translate-y-1/2 right-0 -mt-30 md:-mt-24">
            <img
              src="/img/ethereum-integration/hero.webp"
              alt=""
              className="w-full max-w-sm sm:max-w-lg md:max-w-none"
            />
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 md:mt-40 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-6/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-5 md:tw-heading-4 mb-0  text-gradient"
              variants={transitions.item}
            >
              Full support for Ethereum and other EVM chains is now live
              allowing ICP smart contracts to augment EVM-based smart contracts
              with additional functionality through ICP's superpowers, transfer
              tokens on other chains, and call smart contracts on EVM chains.
            </motion.h2>
            {/* <motion.p className="tw-paragraph mb-0" variants={transitions.item}>
              <Link href="#subscribe" className="button-primary">
                Get updates about ETH &lt;&gt; ICP
              </Link>
            </motion.p> */}
          </div>
        </AnimateSpawn>

        <section className="container-10 my-20 sm:my-30 md:my-40">
          <AnimateSpawn
            variants={transitions.container}
            className="bg-white px-10 md:px-16 pt-6 pb-1 md:pb-12 md:pt-12 gap-8 mb-10 sm:mb-40 rounded-xl "
          >
            <motion.div>
              <aside className="container-10 md:flex md:items-center mt-6 md:mt-0 !pl-0	!pr-0">
                <div className="md:w-1/2">
                  <motion.h5
                    className="tw-heading-5 md:tw-heading-4 mb-3 sm:mb-6 "
                    variants={transitions.item}
                  >
                    Tritium milestone is now live!
                  </motion.h5>

                  <motion.ul
                    className="mb-0 mt-4 md:mt-6 tw-paragraph md:tw-lead-sm text-bold text-black"
                    variants={transitions.item}
                  >
                    <li className="mb-2">
                      RPC canister for Ethereum & EVM integration
                    </li>
                    <li className="mb-2">
                      Threshold ECDSA signing latency & throughput improvements
                    </li>
                    <li className="mb-2">
                      Chain-key ERC20 (ckERC20) tokens & stablecoins such as
                      ckUSDC
                    </li>
                  </motion.ul>
                  <p className="mb-0 mt-8">
                    <Link
                      className="link-primary link-with-icon"
                      href="/roadmap"
                    >
                      <LinkArrowRight></LinkArrowRight>
                      READ MORE
                    </Link>
                  </p>
                </div>
                <div className="md:w-1/2 relative md:mt-6 md:mb-3">
                  <div className="pointer-events-none md:absolute w-full md:-right-20 md:top-1/2  md:-translate-y-1/2">
                    <motion.img
                      className="w-[80%] h-full object-cover"
                      src="/img/roadmap/roadmap.svg"
                      alt="roadmap"
                    />
                  </div>
                </div>
              </aside>
            </motion.div>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.container}
            className="text-left md:text-center mt-20 md:mt-10 mb-10 sm:mb-16 sm:w-[600px] md:w-7/10 sm:mx-auto"
          >
            <motion.h2
              className="tw-heading-3 sm:tw-heading-60 mb-6 sm:mb-10"
              variants={transitions.item}
            >
              Extend Ethereum with ICP capabilities
            </motion.h2>
            <motion.p
              className="mb-0 tw-paragraph md:tw-lead-sm"
              variants={transitions.item}
            >
              Ethereum is the world's top blockchain for DeFi with TVL in the
              billions. Integrating with ICP offers cross-chain benefits such as
              increased asset liquidity, expanded market access, improved
              scalability and throughput. Plus, access to ICP's unique
              capabilities:
              {/* <Link
                className="link-primary link-with-icon"
                href="https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC"
              >
                More on trustless multi-chain
                <LinkArrowUpRight />
              </Link> */}
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className=" md:mt-40 flex flex-col md:flex-row md:justify-between gap-16 sm:items-center md:gap-5"
            variants={transitions.container}
          >
            <motion.div
              variants={transitions.item}
              className="w-full sm:w-[400px] md:w-auto md:basis-[320px]"
            >
              <img
                src="/img/ethereum-integration/icon-1.svg"
                alt=""
                className="mb-6"
              ></img>
              <h3 className="sm:tw-heading-5 mb-2">100% onchain Web3</h3>
              <p className="tw-paragraph mb-0">
                Decentralize your Ethereum dapp by hosting frontend and backend
                data on the Internet Computer.
              </p>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="w-full sm:w-[400px] md:w-auto md:basis-[320px]"
            >
              <img
                src="/img/ethereum-integration/icon-2.svg"
                alt=""
                className="mb-6"
              ></img>
              <h3 className="sm:tw-heading-5 mb-2">Gasless token swaps</h3>
              <p className="tw-paragraph mb-0">
                Using ckETH and ckERC-20 tokens, users can swap tokens for a few
                cents without gas fees.
              </p>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="w-full sm:w-[400px] md:w-auto md:basis-[320px]"
            >
              <img
                src="/img/ethereum-integration/icon-3.svg"
                alt=""
                className="mb-6"
              ></img>
              <h3 className="sm:tw-heading-5 mb-2">Web2 integration</h3>
              <p className="tw-paragraph mb-0">
                Connect smart contracts to the world outside of blockchains.
                Fetch real-time price data and more from Web2.
              </p>
            </motion.div>
          </AnimateSpawn>
        </section>

        <section className="container-12 flex flex-col gap-16 md:gap-40 mt-30 md:mt-60">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/ethereum-integration/image-2.webp"
          >
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              Multichain DeFi with ckTokens
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-6">
              In May 2024, average transaction fees for USDC and USDT were $6.66
              and $9.93 respectively, making swaps below a certain amount
              impractical. ICP’s Ethereum integration enables the use of
              chain-key tokens such as ckETH and ckERC-20 on ICP. This allows
              users to send and receive ETH value on ICP DEXs for a few cents,
              with 1-2s finality, and no gas fees.
            </p>
            <p className="tw-lead-sm mb-6 md:mb-6">
              ckETH and ckERC-20 expose ICRC-1 and 2 ledger interfaces (the
              token standards of ICP), making it simple for all ICP wallets to
              offer ckETH support. Total value of ckETH is fully backed 1:1 by
              ETH, and can always be verified by viewing the onchain dashboard
              and metrics of the canisters.
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/ethereum-integration/image-3.webp">
            <h2 className="md:tw-heading-60 md:mb-6">
              EVM on the Internet Computer
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              An Ethereum Virtual Machine (EVM) is available on ICP built by
              Bitfinity — a team of developers from the ICP community. Bitfinity
              offers a turn-key solution for developers to operate their ETH
              dapps on the Internet Computer using Solidity, which brings ICP's
              1-2s finality, and near-0 transaction fees to established Ethereum
              dapps, providing an incredibly efficient Ethereum scaling
              solution.
            </p>
            <p className="mb-0">
              <Link
                href="https://bitfinity.network/"
                className="link-primary link-with-icon"
              >
                Check out Bitfinity <LinkArrowUpRight />
              </Link>
            </p>
          </TranslatedLayout>

          <TranslatedLayout
            imageUrl="/img/ethereum-integration/image-4.webp"
            reverse
          >
            <h2 className="md:tw-heading-60 md:mb-6">Ethereum integration</h2>
            <p className="tw-lead-sm font-bold mt-1">EVM RPC</p>
            <p className="tw-lead-sm mb-6 md:mb-10">
              The EVM RPC canister is an ICP smart contract for communicating
              with Ethereum and other EVM blockchains using an onchain API. It
              introduces methods that massively simplify the developer
              experience. The Tritium milestone allows communication with
              Ethereum, Arbitrum, Optimism and Base. Interoperability can be
              increased by simply adding other network API keys.
            </p>
            <p className="tw-lead-sm font-bold mt-3">Chain-key signatures</p>
            <p className="tw-lead-sm mb-6 md:mb-10">
              ICP nodes collaborate to produce threshold-ECDSA signatures,
              enabling canister smart contracts to sign Ethereum transactions.
              Leveraging the EVM RPC canister, Ethereum transactions can be
              written to EVM chains. Chain-key signatures also derive Ethereum
              addresses, enabling ICP smart contracts to read, write and own
              ETH.
            </p>
          </TranslatedLayout>
        </section>
        {/* <AnimateSpawn
          className="mt-6 md:mt-10 bg-infinite"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="container-12 ">
            <div className="relative">
              <div className="ml-auto w-7/10 sm:w-5/10 md:w-5/10 md:absolute top-0 right-0 bottom-0 flex">
                <img
                  src="/img/ethereum-integration/community.webp"
                  alt=""
                  loading="lazy"
                  className="object-contain object-center"
                />
              </div>

              <div className="md:container-10 px-8 pb-10 md:py-30 relative text-white">
                <div className="md:w-1/2">
                  <h2 className="tw-heading-4 md:tw-heading-60 md:mb-6">
                    ICP.Lab 6.0: X-Chain
                  </h2>
                  <p className="tw-paragraph md:tw-lead mb-8">
                    ICP Lab 6.0 xChain is a program is designed for teams and
                    individuals currently building cross-chain or multi-chain
                    applications on the Internet Computer blockchain. If you’re
                    striving towards a cross-chain future, leveraging ICP’s
                    unique capabilities, then this is the right program for you.
                  </p>
                  <ul className="list-none p-0">
                    <li>
                      Date & Location: January 22nd - 25th, 2024 in Zurich
                    </li>
                    <li>Application closes on December 15th, 2023</li>
                  </ul>
                  <p className="mb-0">
                    <Link
                      href="https://dashboard.internetcomputer.org/bitcoin/transactions"
                      className="link-primary link-with-icon"
                    >
                      Track TX activity on the ICP Dashboard
                      <LinkArrowUpRight />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateSpawn> */}
        <AnimateSpawn
          className="mt-20 md:mt-40"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="container-10 ">
            <h2 className="mb-8 tw-heading-3 md:tw-heading-60">
              Take a deep dive into
              <br />
              Chain Fusion
            </h2>

            <VideoCard
              image="https://i.ytimg.com/vi/ZmX0vqTCS7M/maxresdefault.jpg"
              link="https://www.youtube.com/watch?v=ZmX0vqTCS7M"
              label="Tutorial"
              title="ICP Chain Fusion Educate: A Technical Dive into Chain Fusion"
              description={
                <>
                  This workshop focuses on the technical
                  <br />
                  aspects of ICP's Chain Fusion technology.
                </>
              }
            />
          </div>
        </AnimateSpawn>
        <section className="container-12 mt-24 md:mt-40">
          <AnimateSpawn
            variants={transitions.container}
            className="text-left md:text-center mb-10 sm:mb-16 md:w-5/10 sm:mx-auto"
          >
            <motion.h2
              className="tw-heading-3 sm:tw-heading-60 mb-6 sm:mb-10 text-gradient"
              variants={transitions.item}
            >
              ETH Projects
            </motion.h2>
            <motion.p
              className="mb-0 tw-paragraph md:tw-lead-sm"
              variants={transitions.item}
            >
              Join the other developers building incredible use cases with
              Ethereum on ICP.
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="container-12 grid md:grid-cols-2 gap-16 md:gap-10 py-16 md:py-0 bg-white md:bg-transparent rounded-xl"
            el={motion.section}
            variants={transitions.container}
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </AnimateSpawn>
          <div className="flex justify-center items-center mt-10">
            {" "}
            <Link
              className="button-primary text-center mb-6 md:mb-8"
              href="https://internetcomputer.org/ecosystem?tag=Ethereum
"
            >
              More projects building on Ethereum
            </Link>
          </div>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-20 md:px-15 md:mt-40">
          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16 relative"
            variants={transitions.container}
          >
            <CardWithDescription
              title="Learn about the EVM RPC canister"
              description=""
              href="/docs/building-apps/chain-fusion/ethereum/evm-rpc/how-it-works"
            />

            <CardWithDescription
              title="Learn about ckETH"
              description=""
              href="/docs/defi/chain-key-tokens/cketh/overview"
            />
            <CardWithDescription
              title="Developer workflow for ETH devs on ICP"
              description=""
              href="/docs/building-apps/chain-fusion/ethereum/using-eth/eth-dev-workflow"
            />
            <CardWithDescription
              title="Get started building with Ethereum on ICP"
              description=""
              href="/docs/building-apps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister"
            />
            <motion.div
              className="blob blob-purple blob-md blob-x-5 blob-y-7 z-[-1] md:blob-lg"
              variants={transitions.fadeIn}
            ></motion.div>
          </AnimateSpawn>
        </section>
        <section className="pt-30 mb-20  md:pt-20 md:mb-30 " id="subscribe">
          <Newsletter
            fields={[
              {
                name: "EMAIL",
                placeholder: "Email",
                type: "email",
                required: true,
              },
            ]}
            ctaLabel="Get updates!"
            postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0"
            decoration={
              <img
                src="/img/newsletter/email-image-2.webp"
                alt=""
                loading="lazy"
              />
            }
            className="mb-20 relative"
          >
            {/* <div className="hidden md:block blob blob-infinite blob-lg blob-top-right z-[-1]"></div> */}
            <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8 md:pr-10">
              Sign up for email updates{" "}
              <span className="text-white-60">
                to keep up to date with the Internet Computer
              </span>
            </h2>
          </Newsletter>
        </section>
      </main>
    </Layout>
  );
}

export default EthereumIntegrationPage;
