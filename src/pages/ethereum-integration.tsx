import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { ExternalLink, GitHubLink } from "../components/Common/CardIcons";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import Newsletter from "../components/Common/Newsletter/Newsletter";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const MotionLink = motion(Link);

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

function EthereumIntegrationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
  return (
    <Layout
      title="Ethereum Integration"
      description="A true World Computer enables a multi-chain environment where centralized bridges are obsolete and smart contracts can seamlessly communicate across blockchains. ICP already integrates with the Bitcoin Network, and native ETH integration is underway."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-ethereum-integration.jpg"></ShareMeta>

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
                Ethereum &lt;&gt; ICP
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                A true World Computer enables a multi-chain environment where
                centralized bridges are obsolete and smart contracts can
                seamlessly communicate across blockchains. ICP already
                integrates with the Bitcoin Network, and native ETH integration
                is underway.
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
          <div className="md:w-5/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-3 md:mb-10 text-gradient"
              variants={transitions.item}
            >
              Smart Contracts on the Internet Computer are the glue between the
              world’s most important blockchains.
            </motion.h2>
            <motion.p className="tw-paragraph mb-0" variants={transitions.item}>
              <Link href="#subscribe" className="button-primary">
                Get updates about ETH &lt;&gt; ICP
              </Link>
            </motion.p>
          </div>
        </AnimateSpawn>

        <section className="container-10 my-20 sm:my-30 md:my-40">
          <AnimateSpawn
            variants={transitions.container}
            className="text-center mb-10 sm:mb-16 sm:w-[600px] md:w-7/10 sm:mx-auto"
          >
            <motion.h2
              className="tw-heading-3 sm:tw-heading-60 mb-6 sm:mb-10"
              variants={transitions.item}
            >
              World Computer capabilities for Ethereum
            </motion.h2>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link
                className="link-primary link-with-icon"
                href="https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC"
              >
                More on trustless multi-chain
                <LinkArrowUpRight />
              </Link>
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
              <h3 className="sm:tw-heading-5 mb-2">100% on-chain Web3</h3>
              <p className="tw-paragraph mb-0">
                Make your Ethereum dapp fully decentralized by hosting frontend,
                and data on the Internet Computer.
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
                Using ckERC-20 tokens, users can swap and transfer tokens for a
                few cents with 0 gas fees.
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
              <h3 className="sm:tw-heading-5 mb-2">
                Extended DAO functionality
              </h3>
              <p className="tw-paragraph mb-0">
                Extend what your DAO can control. Powerful ICP canister smart
                contracts bring your whole dapp on chain.
              </p>
            </motion.div>
          </AnimateSpawn>
        </section>

        <section className="container-12 flex flex-col gap-16 md:gap-40 mt-30 md:mt-60">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/ethereum-integration/eth-integration.webp"
          >
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              Protocol-level ETH integration
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-6">
              Integrating ICP and ETH consists of two phases. In phase 1, a
              canister smart contract will offer the on-chain Ethereum full node
              API by using{" "}
              <Link href="/https-outcalls" className="link-subtle">
                HTTPS outcalls
              </Link>{" "}
              to cloud API providers to securely query the Ethereum blockchain,
              and send transaction to it. Signing Ethereum transactions is
              enabled by{" "}
              <Link
                href="/docs/current/developer-docs/integrations/t-ecdsa/t-ecdsa-how-it-works"
                className="link-subtle"
              >
                chain-key ECDSA
              </Link>{" "}
              already available to any canister smart contract on the Internet
              Computer.
            </p>
            <p className="tw-lead-sm mb-6 md:mb-6">
              Phase 2 involves full protocol-level integration to realize an
              on-chain Ethereum API on the Internet Computer. This API will be
              enabled by running Ethereum full nodes next to each ICP replica on
              a large ICP subnet, and communicating with these subnets from the
              replicas through ICP consensus
            </p>
            <p className="mb-0">
              <Link
                href="https://wiki.internetcomputer.org/wiki/Extend_Bitcoin,_Ethereum_and_other_blockchains"
                className="link-primary link-with-icon"
              >
                About extending ETH <LinkArrowUpRight />
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/ethereum-integration/chain-key.webp">
            <h2 className="md:tw-heading-60 md:mb-6">
              Chain-key
              <br />
              ETH & ERC-20
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-10">
              In June 2023, average transaction fees for USDC and USDT were
              $4.21 and $5.46 respectively, which makes trading on DEXs below
              certain amounts completely impractical. The Ethereum integration
              enables the use of chain-key (ck) tokens such as ckETH and
              ckERC-20 on the Internet Computer, including ckUSDC or ckUSDT to
              vastly extend the capabilities of ICP DEXs for users to swap, or
              transfer tokens for cents with 1-2s finality.
            </p>
            <p className="mb-0">
              <Link
                href="https://forum.dfinity.org/t/long-term-r-d-integration-with-the-ethereum-network/9382"
                className="link-primary link-with-icon"
              >
                Follow the community discussion <LinkArrowRight />
              </Link>
            </p>
          </TranslatedLayout>

          <TranslatedLayout
            reverse={true}
            imageUrl="/img/ethereum-integration/evm.webp"
          >
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              EVM on the Internet Computer
            </h2>
            <p className="tw-lead-sm mb-6 md:mb-6">
              Bitfinity's EVM running on the Internet Computer offers a turn-key
              solution for developers to run their existing solidity code and
              dapps on the Internet Computer. Combining a familiar EVM
              environment with ICPs 1 sec block times, 1-2s finaility, and
              ~0$.02 Tx cost.
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
        </section>

        <section className="container-12 flex flex-col gap-16 md:gap-40 mt-30 md:mt-60">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/ethereum-integration/image-icp-lab.webp"
            imageClassName="relative"
            imageWithBlob="md:blob md:blob-purple blob-x-2 blob-y-5 blob-md"
          >
            <Prose>
              <h3 className="md:mb-6">Community collab</h3>
              <p>
                In February 2023, the ICP DeFi community convened at the DFINITY
                headquarters in Zurich during a DeFi focused ICP.Lab to discuss
                an Ethereum integration. The outcome: As a protocol-level
                integration will take some time to complete, the community came
                up with a short-term solution to bring liquidity from Ethereum
                to the Internet Computer — one that enables using ETH and ERC-20
                tokens for use cases such as the IC’s DEXs, lending protocols,
                or marketplaces.{" "}
              </p>
              <p>
                Several ICP teams have started integrating cross-chain ETH
                solutions into their platforms using components already
                available such as chain-key ECDSA signing.
              </p>
              <p className="">
                <Link
                  href="https://dfinity.org/icp-lab/"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight />
                  Find out more and apply for ICP.Lab
                </Link>
              </p>
            </Prose>
          </TranslatedLayout>
        </section>
        <section className="pt-30 mb-20  md:pt-52 md:mb-30 " id="subscribe">
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
        <AnimateSpawn
          className="my-20 md:my-40"
          variants={transitions.container}
          el={motion.section}
        >
          <div className="container-10 mb-6 md:mb-10">
            <motion.h2
              className="tw-heading-4 md:tw-heading-60 mb-0"
              variants={transitions.item}
            >
              Build your own Ethereum
              <br />
              multi-chain solution
            </motion.h2>
          </div>

          <div className="container-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">IC Web3 Canister</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                The ic-web3 library by Rocklabs has been extended to offer an
                on-chain Ethereum RPC API, using HTTPS outcalls as transport to
                communicate with Ethereum RPC API providers.
              </p>
              <div className="flex justify-start">
                <GitHubLink to="https://github.com/rocklabs-io/ic-web3" />
              </div>
            </motion.div>

            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">EVM Utils Canister</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                An ICP community member has implemented a helper canister to
                offer Ethereum-related functionality for Motoko programmers. Run
                this canister to gain access to functionality such as Keccak
                hashing or creating transactions to enable your Motoko canister
                with this functionality.
              </p>
              <div className="flex justify-start">
                <GitHubLink to="https://github.com/icopen/evm_utils_ic" />
              </div>
            </motion.div>

            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">Omnic cross-chain messaging</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                Omnic cross-chain messaging is a community-built protocol
                offering infrastructure for cross-chain message exchange between
                the IC and other blockchains, including Ethereum. Omnic uses
                chain-key ECDSA signing for obtaining a strong trust model.
              </p>
              <div className="flex justify-start">
                <ExternalLink
                  to="https://github.com/rocklabs-io/omnic"
                  label="Link to Omnic website"
                />
              </div>
            </motion.div>
            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">
                Paranic cross-chain asset bridge
              </h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                The Paranic project allows for exchanging assets between the IC
                and other blockchains, including Ethereum. The project uses the
                Omnic cross-chain messaging protocol as foundational layer.
              </p>
              <div className="flex justify-start">
                <GitHubLink to="https://omnic.network" />
              </div>
            </motion.div>
            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">ERC-721 IC assets tutorial</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                This tutorial explains hosting metadata for ERC-721 NFTs on the
                Internet Computer and thus allows Ethereum NFT deployments to
                reduce their dependency on public cloud providers for hosting
                the NFT metadata such as images. This makes Ethereum NFTs much
                more potent than today when being hosted on public cloud.
              </p>
              <div className="flex justify-start">
                <GitHubLink to="https://github.com/domwoe/erc-721-ic-assets" />
              </div>
            </motion.div>
            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">Uniswap user interface</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                A demo that hosts a Uniswap user interface on the Internet
                Computer to solve the shortcoming of the typical way of
                deploying Ethereum frontends on public cloud services. The
                blueprint of this project can be applied to any Ethereum dapp to
                strengthen its trust model by hosting the frontend on the IC
                instead of a public cloud provider.
              </p>
              <div className="flex justify-start">
                <GitHubLink to="https://github.com/domwoe/uniswap_ui_on_ic" />
              </div>
            </motion.div>

            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">No key wallet</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                This is an example project of a canister-based Ethereum wallet
                using chain-key ECDSA signing.
              </p>
              <div className="flex justify-start">
                <GitHubLink to="https://github.com/nikolas-con/ic-evm-sign-starter" />
              </div>
            </motion.div>
          </div>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default EthereumIntegrationPage;
