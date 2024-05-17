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
import DocsIcon from "@site/static/img/svgIcons/docs.svg";

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
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Smart contracts are the new and vastly superior way to build
                software. Being embedded in blockchain protocols, smart
                contracts are secure, tamper-proof, resilient, and unstoppable.
              </motion.p>
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
            ></motion.p>
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
          <div className="container-10">
            <motion.h2
              // className="tw-heading-3 md:tw-heading-60 text-center mb-0"
              className="tw-heading-4 md:tw-heading-60 text-gradient mb-3"
              variants={transitions.item}
            >
              ICP's vision is that most of the world's software will be replaced
              by smart contracts. To realize that vision, ICP is designed to
              make smart contracts as powerful as traditional software.
            </motion.h2>
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
        <section className=" bg-infinite text-white mt-16 md:mt-40">
          {/* What Features ICP has to unleash power of smart contracts */}
          <section className="container-12 pt-10 md:pt-20 pb-30 md:pb-20 relative">
            <div className="text-center mb-16 md:mb-24">
              <AnimateSpawn variants={transitions.container}>
                <div className="blob blob-md md:blob-lg blob-white md:blob-white-dense blob-x-10 blob-y-0 z-0 md:opacity-30 "></div>
                <motion.h2
                  className="tw-heading-3 md:tw-heading-60 text-left md:text-center md:w-7/10 inline-block mb-0"
                  variants={transitions.item}
                >
                  What ICP offers today
                </motion.h2>
              </AnimateSpawn>
            </div>

            <div className="flex flex-col gap-16 md:gap-40">
              <TranslatedLayout imageUrl="/img/what-is-the-ic/platform_risk_large.webp">
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Computation power of the ICP blockchain
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Smart contracts on the Internet Computer (ICP) can have
                  hundreds of gigabytes of memory and compute at the full speed
                  of a modern CPU, which is many orders of magnitude more than
                  Ethereum smart contracts. For instance, the AI canister on ICP
                  can run a full model because it is large and powerful enough
                  to host it.
                </p>

                <Link
                  className="button-outline-white text-center mb-6 md:mb-8 whitespace-nowrap"
                  href="/ai"
                >
                  Run AI models fully on-chain
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="https://wiki.internetcomputer.org/wiki/Internet_Computer_performance"
                >
                  <DocsIcon /> Learn more about ICP performance.
                </Link>
              </TranslatedLayout>

              <TranslatedLayout
                imageUrl="/img/what-is-the-ic/self_custody_large.webp"
                reverse={true}
              >
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Low cost & resource efficiency
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  ICP is designed to be resource-efficient, making it both
                  low-cost and environmentally friendly. For example, storing a
                  gigabyte of memory on ICP only costs a smart contract $5 per
                  year.
                </p>

                <Link
                  className="button-outline-white text-center mb-6 md:mb-8"
                  href="/capabilities/sustainability"
                >
                  ICP Sustainability Solutions
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/docs/current/developer-docs/cost-estimations-and-examples"
                >
                  <LinkArrowRight /> Learn more about ICP costs
                </Link>
              </TranslatedLayout>

              <TranslatedLayout
                imageUrl="/img/what-is-the-ic/italy_large.webp"
                reverse={false}
              >
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  State-of-the-art User Experience{" "}
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Users only need a browser to interact with ICP smart
                  contracts. Users do not need wallets or tokens or any custom
                  software, taking away all hurdles of using a smart contract.
                </p>

                <Link
                  className="button-outline-white text-center mb-6 md:mb-8"
                  href="/ecosystem"
                >
                  Try out some dapps{" "}
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/docs/current/tutorials/hackathon-prep-course/deploying-first-fullstack-dapp/"
                >
                  <DocsIcon /> Deploying your first full-stack dapp
                </Link>
              </TranslatedLayout>
              <TranslatedLayout
                imageUrl="/img/what-is-the-ic/fusion.webp"
                reverse={true}
              >
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  The Key to connect Web2 and Web3
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  ICP can interface with other smart contract blockchains and
                  traditional Web 2 internet resources via HTTP requests and
                  signing capabilities. For example, Chain-key Bitcoin (ckBTC),
                  a token backed 1:1 by BTC held entirely on the ICP blockchain,
                  is possible because ICP smart contracts can sign transactions.
                  Additionally, the Exchange rate canister sends and receives
                  HTTP requests to fetch data from major cryptocurrency
                  exchanges.
                </p>

                <Link
                  className="button-outline-white text-center mb-6 md:mb-8"
                  href="/chainfusion"
                >
                  Chain Fusion Technology{" "}
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/https-outcalls"
                >
                  <LinkArrowRight /> Learn about ICP HTTP outcalls
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/docs/current/developer-docs/smart-contracts/encryption/t-ecdsa/"
                >
                  <LinkArrowRight /> Learn more about ICP contracts threshold
                  signing
                </Link>
              </TranslatedLayout>
              <TranslatedLayout
                imageUrl="/img/what-is-the-ic/2.webp"
                reverse={false}
              >
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Dev-friendly Smart Contract Coding
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Developers can write contracts using popular languages like
                  Rust, TypeScript, or Python and easily incorporate libraries
                  from their respective ecosystem, much like they would in
                  traditional web development. Additionally, they have the
                  option to use Motoko, a language specifically designed for the
                  ICP environment.
                </p>
                <Link
                  className="button-outline-white text-center mb-6 md:mb-8"
                  href="/docs/current/developer-docs/getting-started/hello-world"
                >
                  Start building
                </Link>{" "}
                <br />
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/docs/current/home"
                >
                  <DocsIcon /> Dev Overview to ICP
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
        </section>
        {/*what design choices ICP has to achieve vision */}
        <section className="container-12 pt-10 md:pt-40 pb-30 md:pb-20 relative">
          <div className="text-center mb-16 md:mb-20">
            <AnimateSpawn variants={transitions.container}>
              <motion.h2
                className="tw-heading-3 md:tw-heading-60 text-gradient text-left md:text-center md:w-7/10 inline-block mb-0"
                variants={transitions.item}
              >
                Key Design Choices Behind ICP's Capabilities
              </motion.h2>
            </AnimateSpawn>
          </div>
          <div className="blob blob-white blob-sm md:blob-xl blob-x-7 blob-y-8"></div>

          <div>
            <AnimateSpawn
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
              variants={transitions.container}
            >
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8  md:p-12"
                variants={transitions.item}
              >
                <img
                  // src="/img/what-is-the-ic/icon-tamperproof.svg"
                  src="/img/what-is-the-ic/key-icon-1.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">DAO control </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  Protocols often evolve slowly due to the need for consensus.
                  ICP stands out by enabling frequent, decentralized updates
                  through its NNS DAO, resulting in hundreds of upgrades since
                  launch. This allows for continuous addition of new
                  functionalities to smart contracts.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8  md:p-12"
                variants={transitions.item}
              >
                <img
                  // src="/img/what-is-the-ic/icon-autonomous.svg"
                  src="/img/what-is-the-ic/key-icon-2.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Scale out via subnets
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  ICP comprises multiple subnets, each supporting different
                  smart contracts that can communicate seamlessly. It can
                  dynamically add new subnets to scale with demand, enhancing
                  efficiency and performance.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8  md:p-12"
                variants={transitions.item}
              >
                <img
                  // src="/img/what-is-the-ic/icon-simple.svg"
                  src="/img/what-is-the-ic/key-icon-3.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Powerful node hardware{" "}
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  A replicated system is only as fast as the weakest nodes, so
                  ICP runs on powerful machines in data centers, ensuring all
                  nodes meet a high minimum standard. This design means
                  participation isn't possible with low-power devices like a
                  Raspberry Pi, but it enables high performance.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8  md:p-12"
                variants={transitions.item}
              >
                <img
                  // src="/img/what-is-the-ic/icon-sovereign.svg"
                  src="/img/what-is-the-ic/key-icon-4.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Asynchronous </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  ICP's smart contracts operate asynchronously, unlike
                  Ethereum’s synchronous model which causes delays as
                  transactions process sequentially. This approach allows
                  multiple contracts to process simultaneously, trading a more
                  complex programming environment for enhanced efficiency and
                  familiarity for Web2 developers.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8  md:p-12"
                variants={transitions.item}
              >
                <img
                  // src="/img/what-is-the-ic/icon-web3-ois.svg"
                  src="/img/what-is-the-ic/key-icon-5.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Decentralization
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  ICP enhances security and efficiency through a deterministic
                  decentralization approach that balances maximum
                  decentralization with minimized replication. This method
                  considers factors such as the diversity of node providers and
                  their locations. As a result, ICP's replication factor is
                  lower than that of Bitcoin, optimizing for efficiency.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8  md:p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/key-icon-6.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">WebAssembly</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  ICP uses WebAssembly, an open standard for binary formats, for
                  its smart contracts. This enables developers to use various
                  programming languages with ease, enhancing developer
                  friendliness due to straightforward mappings to WebAssembly.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8  md:p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/key-icon-7.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">Reverse gas</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  The reverse gas model allows developers to prepay gas fees by
                  loading their smart contracts with 'cycles,' enabling users to
                  interact without needing tokens or a wallet. This simplifies
                  entry into Web3, offering a user experience similar to
                  traditional web applications and facilitating easier adoption.
                  This model enables a state-of-the-art user experience.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8  md:p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/key-icon-8.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Smart contracts serve web assets{" "}
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  Users can interact with smart contracts through a standard
                  browser without needing plugins or custom software, enabling a
                  state-of-the-art user experience.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8  md:p-12"
                variants={transitions.item}
              >
                <img
                  src="/img/what-is-the-ic/key-icon-9.svg"
                  alt=""
                  className="h-24"
                />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Chain key cryptography
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  A family of protocols leveraging threshold cryptography
                  enables ICP to sign messages that can be efficiently verified,
                  facilitating interoperability and a state-of-the-art user
                  experience.
                </p>
              </motion.div>
            </AnimateSpawn>
            <div className="flex justify-center items-center mt-10">
              {" "}
              <Link
                className="button-primary text-center mb-6 md:mb-8"
                href="/capabilities"
              >
                More ICP capabilities
              </Link>
            </div>
          </div>
        </section>

        {/* Ending section */}
        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15 mt-15 md:mt-30">
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
              Get familiar with the Internet Computer{" "}
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
