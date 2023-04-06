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
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

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

        <AnimateSpawn variants={transitions.container} el={motion.section}>
          <div
            className="overflow-hidden bg-infinite text-white pt-20"
            ref={heroRef}
          >
            <div className="container-10 pt-12 pb-48 md:pb-20 md:pt-36 relative">
              <div className="blob blob-white blob-lg md:blob-xl blob-x-5 blob-y-10 md:blob-x-7"></div>

              <div className="md:w-7/10">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-6"
                  variants={transitions.item}
                >
                  Ethereum &lt;&gt; ICP
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  A true World Computer enables a multi-chain environment where
                  centralized bridges are obsolete and smart contracts can
                  seamlessly communicate across blockchains. ICP already
                  integrates with the Bitcoin Network, and native ETH
                  integration is underway.
                </motion.p>
              </div>
            </div>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="flex flex-col md:flex-row md:gap-1/10">
            <div className="flex-[4] text-center -mt-40 md:-mt-60 md:order-2 md:max-w-md">
              <img
                src="/img/ethereum-integration/ic-eth-graphic.webp"
                className="w-80 sm:w-[480px] md:w-auto max-w-full"
                alt=""
              />
            </div>

            <div className="flex-[5] mt-12 md:mt-40 md:order-1">
              <motion.p
                className="tw-heading-4 md:tw-heading-3 mb-0 text-gradient"
                variants={transitions.item}
              >
                Smart Contracts on the Internet Computer are the glue between
                the world’s most important blockchains.
              </motion.p>
              {/* <motion.p
                className="mb-0 mt-8 md:mt-8 flex flex-col items-start sm:flex-row gap-6 md:gap-8"
                variants={transitions.item}
              >
                <Link className="button-primary" href="">
                  See Documentation
                </Link>
              </motion.p> */}
            </div>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 mt-20 md:mt-40 flex flex-col md:flex-row gap-12 md:gap-1/10"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div className="flex-[4]" variants={transitions.item}>
            <Prose>
              <h2 className="text-gradient inline-block">
                X-Chain smart contract calls
              </h2>
              <p>
                As a world computer on a mission to realize blockchain
                singularity, the Internet Computer (ICP) must be capable of
                creating a multi-chain environment by integrating with the
                world's major blockchains.{" "}
                <Link href="/bitcoin-integration">
                  Native Bitcoin integration
                </Link>
                , which brings smart contracts to Bitcoin, and Bitcoin to the
                ICP, has already been deployed.
              </p>
              <p>
                Next on the list is kickstarting a native trustless integration
                with the Ethereum network. An ETH &lt;&gt; ICP integration will
                enable smart contracts on both networks to interact with each
                other. The Internet Computer could then securely read the balance
                of an ETH or ERC-20 account, for example, and sign and submit
                Ethereum transactions, including ETH and ERC-20 transfers.
              </p>
              <p>
                Reversely, the integration would also enable Ethereum smart
                contracts to interact with ICP smart contracts. Ethereum smart
                contracts would then be able to offload heavy, expensive
                computations onto the Internet Computer, for example.
              </p>
              <p>
                X-chain smart contract calls enable a wide range of use cases
                like swapping ERC-20 tokens, natively holding ETH and major
                stable coins such as USDC, or trading ETH NFTs without wrapping
                on ICP based NFT marketplaces.
              </p>
              <p>The future of blockchain is multi-chain!</p>

              <p>
                <Link
                  href="https://wiki.internetcomputer.org/wiki/Trustless_multi-chain_web3_using_the_IC"
                  className="link-primary link-with-icon"
                >
                  <LinkArrowRight />
                  Learn more
                </Link>
              </p>
            </Prose>
          </motion.div>
          <div className="flex-[5] flex flex-col gap-5">
            <AnimatedProse className="bg-white rounded-xl p-8">
              <h3>Chain-Key ECDSA</h3>
              <p>
                Like native Bitcoin on ICP, Ethereum transactions could be signed
                using ECDSA signatures. ICP already now offers ECDSA threshold
                signing capabilities, referred to as chain-key ECDSA signing:
              </p>
              <ul>
                <li>
                  Every canister smart contract would have an ECDSA key pair (actually,
                  it can have many) that it could use to derive an Ethereum
                  address and sign transactions.
                </li>
                <li>
                  A private signing key would be secret shared among many machines.
                </li>
                <li>
                  ECDSA signatures are computed using cryptographic multi-party
                  computation (MPC) protocols, which are resilient against
                  attacks by malicious parties.
                </li>
              </ul>
              <p>
                Chain-key ECDSA signing could be accessed by canisters through the
                ECDSA API.
              </p>
            </AnimatedProse>
            <AnimatedProse className="bg-white rounded-xl p-8">
              <h3>Protocol Integration</h3>
              <p>
                Beyond chain-key ECDSA signing, the Internet Computer blockchain
                and the Ethereum network require integration on a protocol level
                to allow two-way calls between smart contracts on the Internet Computer 
                and Ethereum without any additional parties or trust assumptions.
                This will be powered by an on-chain Ethereum RPC API on the Internet
                Computer based on direct integration with the Ethereum network, with
                which canister smart contracts can interact.
              </p>
              <p>
                As the implementation of an on-chain Ethereum full node API is
                a sizeable project, the ETH &lt;&gt; ICP integration will be
                built in two phases - and in close collaboration with the ICP
                community.{" "}
              </p>
            </AnimatedProse>
          </div>
        </AnimateSpawn>

        <section className="mt-20 md:mt-40">
          <AnimateSpawn
            className="container-10 mb-10 md:mb-16 flex"
            variants={transitions.fadeIn}
          >
            <img
              src="/img/ethereum-integration/eth-cover.webp"
              alt=""
              className="hidden md:block"
            />
            <img
              src="/img/ethereum-integration/eth-cover-mobile.webp"
              alt=""
              className="md:hidden rounded-xl"
            />
          </AnimateSpawn>
          <AnimateSpawn
            className="container-8 mb-20"
            variants={transitions.container}
          >
            <motion.h2
              className="text-gradient tw-heading-4 md:tw-heading-2 md:mb-10 text-center"
              variants={transitions.item}
            >
              Solving the Ethereum Challenge
            </motion.h2>
            <motion.p
              className="tw-paragraph mb-0 text-center"
              variants={transitions.item}
            >
              While the Ethereum network is currently the world's largest smart
              contract blockchain in terms of market cap, TVL, and daily DeFi volume, 
              it has many pain points such as costly gas fees and limited 
              scalability, which delay adoption and create major obstacles
              for developers. The Internet Computer, with its reverse 
              gas model and ability to scale and perform at high speed, could 
              offer a multi-chain environement that will make it possible for
              new and inexperienced users to enjoy the full utility benefits 
              of ETH. Ethereum integration will unfold in two phases:
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            className="container-10 mt-20 md:mt-40 flex flex-col md:flex-row md:justify-between gap-10 md:gap-0"
            variants={transitions.container}
          >
            <AnimatedProse className="md:w-[calc(50%-60px)]">
              <span className="tw-heading-7-caps mb-3 block">Current</span>
              <h3 className="text-gradient inline-block">
                Phase 1: HTTPS Outcalls 
              </h3>
              <p>
                The ICP community has started building the necessary functionality
                in the form of a readily-deployable canister that offers
                the on-chain Ethereum full node API and uses HTTPS outcalls to
                cloud API providers to securely query the  Ethereum blockchain
                and send transaction to it. ICP community members and DFINITY 
                engineering teams are currently working together to improve this 
                solution. Phase 1 will allow for a simple and smooth migration path 
                to Phase 2, a full protocol integration.
              </p>
              <p>
                <Link
                  className="link-primary link-with-icon"
                  href="/https-outcalls"
                >
                  <LinkArrowRight />
                  Learn more
                </Link>
              </p>
            </AnimatedProse>
            <AnimatedProse className="md:w-1/2">
              <span className="tw-heading-7-caps mb-3 block">Future</span>
              <h3 className="text-gradient inline-block">
                Phase 2: On-chain Ethereum API
              </h3>
              <p>
                Phase 2 involves full protocol-level integration to realize an
                on-chain Ethereum API on the Internet Computer. This API will be
                enabled by running Ethereum full nodes next to each ICP replica
                on a large ICP subnet, and communicating with these subnets from 
                the replicas through ICP consensus. This approach has trust
                properties very similar to running an Ethereum full node on
                chain on the Internet Computer, and is perceived as such by
                canisters. Due to the nature of complexity, Phase 2 it will 
                take quite some time to complete. 
              </p>
              <p>
                <Link
                  className="link-primary link-with-icon"
                  href="https://wiki.internetcomputer.org/wiki/Extend_Bitcoin,_Ethereum_and_other_blockchains"
                >
                  <LinkArrowRight />
                  Learn more
                </Link>
              </p>
            </AnimatedProse>
          </AnimateSpawn>
        </section>

        <section className="container-12 flex flex-col gap-16 md:gap-40 mt-30 md:mt-60">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/ethereum-integration/image-icp-lab.webp"
            imageClassName="relative"
            imageWithBlob="md:blob md:blob-purple blob-x-2 blob-y-5 blob-md"
          >
            <Prose>
              <h3 className="md:mb-6">Community Collab</h3>
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
                This Phase 1 of the Ethereum integration has already been
                realized by the ICP community. An open sourced canister
                providing an on-chain Ethereum RPC API is available to the
                public, and can be deployed in dapps as a gateway to the
                Ethereum network.{" "}
              </p>
              <p>
                The next steps are to refine the APIs by adding further
                functionality to simplify building dapps. Phase 1 will also
                entail improving the canister, security checks, and deploying
                the canister on a system subnet to add IPv4 support, as the
                majority of API providers only support IPv4.
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

        <AnimateSpawn
          className="container-8 mt-30 md:mt-52 text-center"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.h2
            className="tw-heading-4 md:tw-heading-2 mb-6 text-gradient"
            variants={transitions.item}
          >
            Chain-Key ETH & ERC-20
          </motion.h2>
          <motion.p
            className="tw-lead-sm md:tw-lead mb-6"
            variants={transitions.item}
          >
            The Ethereum integration will enable the use of chain-key tokens
            such as ckETH and ckERC-20 tokens, including ckUSDC and ckUSDT
            stablecoins, to turbocharge ICP DEXs and bring major liquidity to
            the ICP ecosystem. It’s fast, low-tx-fee ETH on the Internet
            Computer with no centralized intermediary.{" "}
          </motion.p>
          <motion.p className="mb-10" variants={transitions.item}>
            <Link
              className="link-primary link-with-icon"
              href="https://internetcomputer.org/how-it-works#Chain-key-technology"
            >
              <LinkArrowRight />
              Learn More
            </Link>
          </motion.p>
          <motion.img
            src="/img/ethereum-integration/chain-key-eth.webp"
            alt=""
            variants={transitions.item}
          />
        </AnimateSpawn>

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
              Build Your Own Ethereum
              <br />
              Multi-chain Solution
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
                <Link>
                  <GitHubLink to="https://github.com/rocklabs-io/ic-web3" />
                </Link>
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
                <Link>
                  <GitHubLink to="https://github.com/icopen/evm_utils_ic" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">Omnic Cross-Chain Messaging</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                Omnic cross-chain messaging is a community-built protocol
                offering infrastructure for cross-chain message exchange between
                the IC and other blockchains, including Ethereum. Omnic uses
                chain-key ECDSA signing for obtaining a strong trust model.
              </p>
              <div className="flex justify-start">
                <Link>
                  <ExternalLink
                    to="https://github.com/rocklabs-io/omnic"
                    label="Link to Omnic website"
                  />
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">
                Paranic Cross-Chain Asset Bridge
              </h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                The Paranic project allows for exchanging assets between the IC
                and other blockchains, including Ethereum. The project uses the
                Omnic cross-chain messaging protocol as foundational layer.
              </p>
              <div className="flex justify-start">
                <Link>
                  <GitHubLink to="https://omnic.network" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">ERC-721 IC Assets Tutorial</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                This tutorial explains hosting metadata for ERC-721 NFTs on the
                Internet Computer and thus allows Ethereum NFT deployments to
                reduce their dependency on public cloud providers for hosting
                the NFT metadata such as images. This makes Ethereum NFTs much
                more potent than today when being hosted on public cloud.
              </p>
              <div className="flex justify-start">
                <Link>
                  <GitHubLink to="https://github.com/domwoe/erc-721-ic-assets" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">Uniswap User Interface</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                A demo that hosts a Uniswap user interface on the Internet
                Computer to solve the shortcoming of the typical way of
                deploying Ethereum frontends on public cloud services. The
                blueprint of this project can be applied to any Ethereum dapp to
                strengthen its trust model by hosting the frontend on the IC
                instead of a public cloud provider.
              </p>
              <div className="flex justify-start">
                <Link>
                  <GitHubLink to="https://github.com/domwoe/uniswap_ui_on_ic" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/90 border border-solid border-white rounded-xl flex flex-col p-6 md:p-8"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 mb-2">No Key Wallet</h3>
              <p className="flex-1 tw-paragraph-sm text-black/60 mb-5">
                This is an example project of a canister-based Ethereum wallet
                using chain-key ECDSA signing.
              </p>
              <div className="flex justify-start">
                <Link>
                  <GitHubLink to="https://github.com/nikolas-con/ic-evm-sign-starter" />
                </Link>
              </div>
            </motion.div>
          </div>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default EthereumIntegrationPage;
