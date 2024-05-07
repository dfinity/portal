import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";

function WhatIsIcpPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="What is ICP"
      description={`The Internet Computer adds autonomous serverless cloud functionality to the public Internet - making it possible to build almost any system or service entirely on a decentralized network using “canister software,” an evolution of smart contracts.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-what-is-the-ic.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}


        {/* Section with main 1-liner */}
        <section className=" bg-infinite text-white pt-20" ref={heroRef}>
          <AnimateSpawn
            className="container-10 pt-20 pb-14 md:pb-24 md:pt-36 relative"
            variants={transitions.container}
          >
            <div className="blob blob-white blob-md blob-x-4 blob-y-8 md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <div
              className="
              -mt-30 md:-mt-24
              w-[700px] sm:w-[900px] md:w-[1600px]
              absolute
              -left-16 sm:left-auto
              bottom-0
              translate-y-2/3 md:translate-y-[55%]

              sm:right-0
              sm:translate-x-3/10
            "
            >
              <img
                src="/img/what-is-the-ic/hero.svg"
                alt=""
                className="w-full max-w-none"
              />
            </div>
            <div className="sm:w-8/10 md:w-6/10 relative">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-8 md:mb-6"
                variants={transitions.item}
              >
                What is the
                <br className="hidden md:block" /> ICP blockchain?
              </motion.h1>
              {/* <motion.p
                className="pb-[15%] sm:pb-0 tw-lead-sm md:tw-lead mb-4"
                variants={transitions.item}
              >
                ICP is best understood by exploring its foundation: canister smart contracts. 
                Here's a simple explanation of why canister smart contracts are effective, how they much more power full than ordinary smart contracts, 
                and how they will change to world as ICP's vision is being realized.
              </motion.p> */}
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-8 mt-80 md:mt-[540px] relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="">
            <motion.p
              className="mb-0 flex flex-col items-start gap-6 md:gap-8"
              variants={transitions.item}
            >
            </motion.p>
          </div>
        </AnimateSpawn>

        {/* ICP's vision blurb */}
        <section
          // className="mt-20 md:mt-28
          // bg-[linear-gradient(180deg,transparent_0%,transparent_97%,#3b00b9_97%,#3b00b9_100%)]
          // sm:bg-[linear-gradient(180deg,transparent_0%,transparent_87%,#3b00b9_87%,#3b00b9_100%)]
          // md:bg-[linear-gradient(180deg,transparent_0%,transparent_77%,#3b00b9_77%,#3b00b9_100%)]
          // relative "
        >
          <div className="container-10 md:w-6/10 md:mx-auto">
            <motion.h2
              // className="tw-heading-3 md:tw-heading-60 text-center mb-0"
              className="tw-heading-4 md:tw-heading-60 text-center text-gradient mb-3"

              variants={transitions.item}
            >
              ICP's vision
            </motion.h2>

            <h2 
              className="tw-heading-5 md:tw-heading-4 md:mb-6 mt-2"
              // className="tw-paragraph md:tw-lead-sm mb-3"
              // className="tw-heading-5 md:tw-heading-5 text-gradient mb-0 md:w-8/10"
              >
                Smart contracts are the new and vastly superior way to build software. 
                Being embedded in blockchain protocols, smart contracts are secure, 
                tamper-proof, resilient, and unstoppable.
              <br/>
              <br/>
                ICP's vision is that most of the world's software will be replaced by 
                smart contracts. To realize that vision, ICP is designed to make smart 
                contracts as powerful as traditional software.
              <br/>
            </h2>
          </div>
         
        </section>

        {/* why smart contracts... */}
        {/* <section className="bg-infinite text-white pt-20 md:pt-44">
          <div className="container-10 md:w-6/10 md:mx-auto">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 text-center mb-0"
              variants={transitions.item}
            >
              What ICP offers today
            </motion.h2>

            <h3 className="tw-heading-5 md:tw-heading-4 md:mb-6 mt-6">
            Smart contracts are a disruptive, new compute paradigm enabling novel applications and adding guarantees to existing ones. 
            Below is a list of some of the most important features of smart contracts.
            </h3>
          </div>

          <div className="container-12 text-black">
            <AnimateSpawn
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-5"
              variants={transitions.container}
            >
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-tamperproof.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Unstoppable and tamper-proof</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-0">
                Because smart contracts are executed in a distributed and decentralized way, no single person, organization, 
                or government can stop or change their state unless the code foresees that — code is law. That constitutes a 
                completely new level of security and reliability that is simply not achievable on the traditional IT stack.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-autonomous.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Users can truly own digital assets</h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                No trust in the developer or cloud/infrastructure providers is required. Users can also 
                form communities that collectively govern applications.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-simple.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Developers can build dapps with novel business models</h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                For example, users who neither know nor trust each other can do business together without an intermediary. 
                Complex financial services can be built without the need of banks, giving power back to the users, reducing overhead and cost.
                </p>
              </motion.div>
            </AnimateSpawn>
          </div>
        </section> */}

        {/* mini section: ICP's goal is to remove all the limitations smart */}
        {/* <AnimateSpawn
          className="pt-30 md:pt-40 bg-[linear-gradient(180deg,#3b00b9_0%,#3b00b9_75%,transparent_75%,transparent_100%)] text-white relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="blob blob-lg md:blob-xl blob-white md:blob-white-dense blob-x-5 blob-y-8 z-0 md:opacity-60"></div>
          <motion.div
            className="container-10 text-center"
            variants={transitions.item}
          >
            <h2 className=" tw-heading-3 md:tw-heading-60 mb-24 md:mb-20 sm:w-8/10 mx-auto">
              ICP's goal is to remove all the limitations smart contracts have so their true power is unleashed.
            </h2>
          </motion.div>
          <motion.div
            className="w-full h-[400px] md:h-[600px]"
            variants={transitions.item}
          >
            <img
              src="/img/what-is-the-ic/subnets.webp"
              alt=""
              className="absolute w-[550px] md:w-[800px] max-w-none left-1/2 -translate-x-1/2"
            />
          </motion.div>
        </AnimateSpawn> */}

        {/* What Features ICP has to unleash power of smart contracts */}
        <section className="container-12 pt-10 md:pt-16 pb-30 md:pb-20 relative">
          <div className="text-center mb-16 md:mb-20">
            <AnimateSpawn
              className="container-12"
              variants={transitions.container}
            >
              <motion.h2
                className="tw-heading-3 md:tw-heading-60 text-gradient text-center inline-block mb-0"
                variants={transitions.item}
              >
                What ICP offers today
              </motion.h2>
            </AnimateSpawn>
          </div>
          

          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/what-is-the-ic/internet-identity.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Performance
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
              Smart contracts can have 100s of GBs of memory and compute at the full 
              speed of a modern CPU. For comparison, this is many orders of magnitude 
              more than Ethereum smart contracts.
              </p>
              For example:
                <ul>
                  <li>
                      <a href="/ai"                 
                            className="link-primary link-with-icon"
                        >The AI canister running a full model </a> is possible on ICP because the canister is large and powerful enough to host the model.
                    </li>
                </ul>
              <Link
                className="link-primary link-with-icon"
                href="https://wiki.internetcomputer.org/wiki/Internet_Computer_performance"
              >
                <LinkArrowRight /> Learn more about ICP performance
              </Link>
            </TranslatedLayout>

            <TranslatedLayout
              imageUrl="/img/what-is-the-ic/open-internet-services.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
              Low cost & resource efficiency
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-4">
              ICP is designed to be resource efficient so that it is low-cost and green. 
              For example, on ICP <a href="/docs/current/developer-docs/gas-cost#storage">
                storing a GB of memory only costs a smart contract $5 per year.</a>
              </p>
              <Link
                className="link-primary link-with-icon"
                href="/docs/current/developer-docs/cost-estimations-and-examples"
              >
                <LinkArrowRight /> Learn more about ICP costs
              </Link>
              <Link
                className="link-primary link-with-icon"
                href="/capabilities/sustainability"
              >
                <LinkArrowRight /> Learn more about ICP environmental sustainability
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/what-is-the-ic/sovereign-infrastructure.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
              State-of-the-art user experience
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-4">
              Users only need a browser to interact with ICP smart contracts. 
              Users do not need wallets or tokens or any custom software,
              taking away all hurdles of using a smart contract.
              
              </p>
              <Link
                className="link-primary link-with-icon"
                href="/docs/current/tutorials/hackathon-prep-course/deploying-first-fullstack-dapp/"
              >
                <LinkArrowRight />Learn more about how ICP contracts can host user-facing frontends
              </Link>
            </TranslatedLayout>

            <TranslatedLayout
              imageUrl="/img/what-is-the-ic/reverse-gas-model.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Interoperability
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-4">
              ICP can interface with other smart contract blockchains and 
              traditional (Web 2) internet resources via <strong>HTTP requests </strong> 
              and <strong>signing capabilities</strong>.
              </p>
              For example:
                <ul>
                  <li className="mt-2">
                    <a 
                    href="/docs/current/developer-docs/multi-chain/bitcoin/ckbtc/overview/#what-is-ckbtc"
                    className="link-primary link-with-icon"
                    >Chain-key Bitcoin (ckBTC)</a>, a token that is backed 1:1 by BTC held 100% on ICP blockchain, is 
                    possible ICP smart contracts can sign transactions.</li>
                  <li>
                    <a 
                    href="/docs/current/developer-docs/defi/exchange-rate-canister/"
                    className="link-primary link-with-icon"
                    >The Exchange rate canister </a> sends and receives HTTP requests to fetch data from major cryptocurrency exchanges.</li>
                </ul>
              <Link
                className="link-primary link-with-icon"
                href="/docs/current/references/https-outcalls-how-it-works/"
              >
                <LinkArrowRight />Learn more about ICP HTTP outcalls
              </Link>
              <Link
                className="link-primary link-with-icon"
                href="/docs/current/developer-docs/smart-contracts/encryption/t-ecdsa/"
              >
                <LinkArrowRight />Learn more about ICP contracts threshold signing
              </Link>
              <Link
                className="link-primary link-with-icon"
                href="/chainfusion"
              >
                <LinkArrowRight />Learn more about ICP's multichain capabilities
              </Link>
            </TranslatedLayout>

            <TranslatedLayout imageUrl="/img/what-is-the-ic/multi-chain.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
              Dev friendliness
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-4">
              Developers can write contracts using popular languages like Rust, TypeScript, 
              or Python and easily incorporate libraries from their respective ecosystem, 
              much like they would in traditional web development. Additionally, they 
              have the option to use Motoko, a language specifically designed for the 
              ICP environment.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="/docs/current/home"
              >
                <LinkArrowRight />Learn to build on ICP
              </Link>
            </TranslatedLayout>

            {/* <TranslatedLayout
              imageUrl="/img/what-is-the-ic/reverse-gas-model.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
              Upgradability
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-4">
              Real software needs upgrading to evolve and quickly resolve problems, 
              e.g. security vulnerabilities. However, this must not come at the 
              cost of a central authority being in control. 
              </p>
              For example:
                <ul>
                  <li>
                      <a href="/https://dashboard.internetcomputer.org/governance"                 
                            className="link-primary link-with-icon"
                        >The ICP DAO has voted to upgrade the network </a> hundreds of times since its launch.
                    </li>
                </ul>
              <Link
                className="link-primary link-with-icon"
                href="/docs/current/home"
              >
                <LinkArrowRight />Learn more about ICP blockchain upgrades
              </Link>
            </TranslatedLayout> */}
          </div>
        </section>

        {/*what design choices ICP has to achieve vision */}
        <section className="container-12 pt-10 md:pt-16 pb-30 md:pb-20 relative">
          <div className="text-center mb-16 md:mb-20">
            <AnimateSpawn
              className="container-12"
              variants={transitions.container}
            >
              <motion.h2
                className="tw-heading-3 md:tw-heading-60 text-gradient text-center inline-block mb-0"
                variants={transitions.item}
              >
                What are the key design choices ICP makes to achieve these capabilities? 
              </motion.h2>
            </AnimateSpawn>
          </div>
          <div className="blob blob-white blob-sm md:blob-xl blob-x-7 blob-y-8"></div>

          <div className="container-12">
            <AnimateSpawn
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-5"
              variants={transitions.container}
            >
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-tamperproof.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">DAO controls and upgrades the network</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-2 text-left">
                  <strong>What it is: </strong>Protocols usually develop slowly as building consensus takes time. 
                  A key feature of ICP among blockchains is its ability to frequently 
                  update without losing decentralization. ICP self-upgrades through the 
                  NNS DAO, and since its launch, it has undergone hundreds of upgrades. 
                </p>

                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph text-left">
                  <strong>What it enables: </strong>New functionality can be added. All of the rich capabilities smart 
                  contracts have above are due to the protocol being able to update itself. 
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-autonomous.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Scale out via subnets</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-2 text-left">
                  <strong>What it is: </strong>ICP consists of many 
                  <a href="https://dashboard.internetcomputer.org/subnets"> subnets</a>,
                  each powering a subset of 
                  the smart contracts running on ICP, and all smart contracts can seamlessly talk to each other. 
                  New subnets can be added dynamically, which allows ICP to scale and keep up with increasing load.
                </p>

                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph text-left">
                  <strong>What it enables: </strong>Efficiency and performance. 
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-simple.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Standardized, powerful node hardware</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-2 text-left">
                  <strong>What it is: </strong>A replicated system is only as fast as the weakest nodes. 
                  To enable these powerful smart contracts, ICP runs on&nbsp; 
                  <a href="https://wiki.internetcomputer.org/wiki/Node_Provider_Documentation">
                  powerful machines in data centers.
                  </a>
                  &nbsp;Nodes on ICP must keep up with the high minimum bar. 
                  The implication of this design decision: one cannot simply participate with their Raspberry pi. 
                </p>

                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph text-left">
                  <strong>What it enables: </strong>Performance. 
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-sovereign.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Asynchronous execution</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-2 text-left">
                  <strong>What it is: </strong>Smart contracts run in an asynchronous 
                  environment (as opposed to Ethereum's synchronous model). This is because in a synchronous environment
                  the "whole world waits" for one's smart contract transactions. This is easy for a 
                  developer to reason about but it comes with large performance penalties.
                  ICP has an asynchronous environment to enable many smart contracts to be processing simultaneously.
                  The implication of this design decision: a more complex programming model for web3 developers, 
                  but one more familiar to Web2 developers.
                </p>

                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph text-left">
                  <strong>What it enables: </strong>Efficiency.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-web3-ois.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm"> Deterministic decentralization</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-2 text-left">
                  <strong>What it is: </strong>
                  Blockchains get their security from replication, having many computers do the same computations 
                  and check each others work. This is great for security, but also inefficient, as many computers redo the same work.
                  Deterministic decentralization algorithmically maximizes decentralization and security while minimizing replication. 
                  The decentralization maximized include: number of unique node providers, their location, their data centers, etc... 
                  The implication of this design 
                  decision: The replication factor is not as high as it is on Bitcoin 
                  and the-like.
        
                </p>

                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph text-left">
                  <strong>What it enables: </strong>Efficiency.
                </p>
              </motion.div>
            
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-next-gen-ai.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">WebAssembly (Wasm)</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-2 text-left">
                  <strong>What it is: </strong>WebAssembly is a widely accepted open 
                  standard for binary formats. ICP uses WebAssembly to handle the 
                  binary format of its smart contracts. This allows developers to 
                  write smart contracts in many popular programming languages with 
                  minimal extra development effort, thanks to the available mappings 
                  from these languages to WebAssembly.
                </p>

                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph text-left">
                  <strong>What it enables: </strong>Developer friendliness. 
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-next-gen-ai.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Reverse gas</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-2 text-left">
                  <strong>What it is: </strong>Allows users to interact with smart contracts 
                  without holding a token.
                </p>

                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph text-left">
                  <strong>What it enables: </strong>State-of-the-art user experience.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-next-gen-ai.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Smart contracts serve web assets</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-2 text-left">
                  <strong>What it is: </strong>Users interact with smart contracts through 
                  a standard browser without needing plugins or custom software.
                </p>

                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph text-left">
                  <strong>What it enables: </strong>State-of-the-art user experience. 
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/icon-next-gen-ai.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Chain key cryptography</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-2 text-left">
                  <strong>What it is: </strong>Family of&nbsp; 
                  <a href="https://medium.com/dfinity/chain-key-technology-one-public-key-for-the-internet-computer-6a3644901e28">
                   protocols leveraging threshold cryptography
                  </a>
                  &nbsp;enabling ICP to sign messages which can be verified efficiently.

                </p>

                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph text-left">
                  <strong>What it enables: </strong>Interoperability and state-of-the-art user experience.
                </p>
              </motion.div>
            </AnimateSpawn>
          </div>
        </section>

        {/* Ending section */}
        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15 mt-30">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-sm blob-x-5 blob-y-7 z-[-1] md:blob-lg"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-6/12"
              variants={transitions.item}
            >
              Get familiar with ICP
            </motion.h2>
          </AnimateSpawn>

          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="Tech insights"
              description=""
              href="/how-it-works"
            />

            <CardWithDescription
              title="ICP community events"
              description=""
              href="https://dfinity.org/events-and-news/"
            />
            <CardWithDescription
              title="Developer docs"
              description=""
              href="/docs/current/home"
            />
            <CardWithDescription
              title="ICP dapps"
              description=""
              href="/ecosystem"
            />
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default WhatIsIcpPage;
