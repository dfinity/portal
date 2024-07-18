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
      description={`The ICP blockchain adds autonomous serverless cloud functionality to
      the public Internet - making it possible to build almost any system or service
      entirely on a decentralized network using "canister software", an evolution of smart contracts.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-what-is-the-ic.webp"></ShareMeta>

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
            Learn how the ICP blockchain unlocks the power of smart
            contracts and explore the advanced design choices that make this possible.
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
              by smart contracts. To achieve this vision, ICP is designed to
              make smart contracts as powerful as traditional software.
            </motion.h2>
          </div>
        </section>
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
                  High-performance smart contracts
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Smart contracts on the ICP blockchain can utilize
                  hundreds of gigabytes of memory and compute at the full speed
                  of a modern CPU, which is many orders of magnitude more than
                  Ethereum smart contracts. For example, the high performance of ICP smart
                  contracts enables the <a
                    className="text-white underline"
                    href="https://www.youtube.com/watch?v=6qLvIXiCGcM" >
                  demo of an AI inference model running on an ICP smart contract</a>, which is uniquely possible on ICP.
                </p>

                <Link
                  className="button-outline-white text-center mb-6 md:mb-8 whitespace-nowrap"
                  href="/ai"
                >
                  Train and run AI models as smart contracts
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
                  cost-effective and environmentally friendly. For example, storing a
                  gigabyte of memory on ICP costs a smart contract only $5 per
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
                  <DocsIcon /> Learn more about ICP costs
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
                  software, eliminating all hurdles typically associated with using dapps.
                </p>

                <Link
                  className="button-outline-white text-center mb-6 md:mb-8"
                  href="/ecosystem"
                >
                  Try out some dapps{" "}
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/docs/current/tutorials/hackathon-prep-course/deploying-first-fullstack-dapp"
                >
                  <DocsIcon /> Deploying your first full-stack dapp
                </Link>
              </TranslatedLayout>
              <TranslatedLayout
                // imageUrl="/img/what-is-the-ic/fusion.webp"
                imageUrl="/img/what-is-the-ic/RPC-canister.webp"

                reverse={true}
              >
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Interoperability
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  ICP can interface with other smart contract blockchains and
                  traditional Web 2 internet resources via HTTP requests and
                  signing capabilities. For example, Chain-key Bitcoin (ckBTC),
                  a token backed 1:1 by BTC held entirely on the ICP blockchain,
                  is possible because ICP smart contracts can sign transactions.
                  Additionally, the{" "}
                  <a
                    className="text-white underline"
                    href="/docs/current/developer-docs/defi/exchange-rate-canister/">
                    exchange rate canister
                  </a> sends and receives HTTP requests to fetch data from major cryptocurrency
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
                  href="/docs/current/developer-docs/smart-contracts/encryption/t-ecdsa"
                >
                  <DocsIcon className="mr-1 ml-1 md:ml-0" /> Learn more about
                  ICP contracts threshold signing
                </Link>
              </TranslatedLayout>
              <TranslatedLayout
                imageUrl="/img/what-is-the-ic/2.webp"
                reverse={false}
              >
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  Developer-friendly
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Developers can write contracts using popular languages like
                  Rust, TypeScript, or Python and easily incorporate libraries
                  from their respective ecosystem, much like they would in
                  traditional web development. They also have the option to use Motoko,
                  a language specifically designed for the ICP environment.
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
                  <DocsIcon /> Developer documentation
                </Link>
              </TranslatedLayout>
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
                  src="/img/what-is-the-ic/key-icon-9.svg"
                  alt=""
                  className="h-24"
                />
                <h3
                  className="tw-lead my-3 lg:text-[2rem] xl:tw-title-sm
"
                >
                  Chain key cryptography
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  A family of protocols leveraging threshold cryptography
                  enables ICP to sign messages that can be efficiently verified,
                  facilitating interoperability and a state-of-the-art user
                  experience.
                </p>
              </motion.div>



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
                <h3
                  className="tw-lead my-3 lg:text-[2rem] xl:tw-title-sm
"
                >
                  DAO control{" "}
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  Protocols often evolve slowly due to the need for consensus.
                  ICP stands out by enabling frequent, decentralized updates
                  through its NNS DAO, resulting in hundreds of upgrades since
                  its launch. This allows for continuous addition of new
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
                <h3
                  className="tw-lead my-3 lg:text-[2rem] xl:tw-title-sm
"
                >
                  Scale out via subnets
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  ICP comprises multiple subnets, each supporting different
                  smart contracts that can communicate seamlessly. The network can
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
                <h3
                  className="tw-lead my-3 lg:text-[2rem] xl:tw-title-sm
"
                >
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
                <h3
                  className="tw-lead my-3 lg:text-[2rem] xl:tw-title-sm
"
                >
                  Asynchronous Execution{" "}
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  ICP's smart contracts operate asynchronously, unlike
                  Ethereum's synchronous model where the "whole world waits" for one's
                  smart contract transactions and causes delays as
                  transactions process sequentially. ICP's asynchronous execution allows
                  multiple contracts to process simultaneously.
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
                <h3 className="tw-lead my-3 lg:text-[2rem] xl:tw-title-sm">
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
                <h3
                  className="tw-lead my-3 lg:text-[2rem] xl:tw-title-sm
"
                >
                  WebAssembly
                </h3>
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
                <h3
                  className="tw-lead my-3 lg:text-[2rem] xl:tw-title-sm
"
                >
                  Reverse gas
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  The reverse gas model allows developers to prepay gas fees by
                  loading their smart contracts with 'cycles,' enabling users to
                  interact without needing tokens or a wallet. This simplifies
                  entry into Web3, offering a user experience similar to
                  traditional web applications and facilitating easier adoption.
                  This model provides a state-of-the-art user experience.
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
                <h3
                  className="tw-lead my-3 lg:text-[2rem] xl:tw-title-sm
"
                >
                  Smart contracts serve web assets{" "}
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  Users can interact with smart contracts through a standard
                  browser without needing plugins or custom software, enabling a
                  state-of-the-art user experience.
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
              Get familiar with ICP{" "}
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