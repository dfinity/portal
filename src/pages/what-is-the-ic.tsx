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
      description={`The Internet Computer is a public blockchain network enabled by new science from first principles. It is millions of times more powerful and can replace clouds and traditional IT. `}
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
                What is ICP?
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                The Internet Computer is a public blockchain network enabled by
                new science from first principles. It is millions of times more
                powerful and can replace clouds and traditional IT. The network
                – created by ICP, or Internet Computer Protocol – is
                orchestrated by permissionless decentralized governance and is
                hosted on sovereign hardware devices run by independent parties.
                Its purpose is to extend the public internet with native cloud
                computing functionality.
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
            <div className="text-center">
              <AnimateSpawn variants={transitions.container}>
                <div className="blob blob-md md:blob-lg blob-white md:blob-white-dense blob-x-10 blob-y-0 z-0 md:opacity-30 "></div>
              </AnimateSpawn>
            </div>

            <div className="flex flex-col gap-16 md:gap-40">
              <TranslatedLayout imageUrl="/img/what-is-the-ic/platform_risk_large.webp">
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  A public blockchain with cloud-like power
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Smart contracts on the ICP blockchain can utilize hundreds of
                  gigabytes of memory and compute at the full speed of a modern
                  CPU, which is many orders of magnitude more than Ethereum
                  smart contracts. For example, the Internet Computer is able to run AI models as tamperproof smart contracts, a unique and game-changing advance for decentralized networks and crypto generally.
                </p>

                <Link
                  className="button-outline-white text-center mb-6 md:mb-8"
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
                  Efficiency comparable to traditional IT
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  ICP uses advanced science and technology to make smart contracts (a new kind of tamperproof and unstoppable network-resident software that blockchains can host) millions of times more efficient – enabling it to be used as an alternative to software running on traditional IT.
                </p>

                <Link
                  className="button-outline-white text-center mb-6 md:mb-8"
                  href="/capabilities/sustainability"
                >
                  ICP Sustainability Solutions
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/docs/building-apps/essentials/gas-cost"
                >
                  <DocsIcon /> Learn more about ICP costs
                </Link>
              </TranslatedLayout>

              <TranslatedLayout
                imageUrl="/img/what-is-the-ic/italy_large.webp"
                reverse={false}
              >
                <h3 className="tw-heading-4 md:tw-heading-3 mb-6">
                  ICP smart contracts can serve web experiences directly to users
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  ICP smart contracts process HTTP, and interact with users directly via web experiences they create. Because they pay for their own computation (using a "reverse-gas" model), they can stay in the background in the mode of backend code. This is key to allowing advanced blockchain to play the role of a public serverless cloud, delivering end-to-end decentralization and security. The Internet Computer is the ultimate expression of the "onchain is the new online" paradigm.
                </p>

                <Link
                  className="button-outline-white text-center mb-6 md:mb-8"
                  href="/ecosystem"
                >
                  Try out some dapps{" "}
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/docs/tutorials/hackathon-prep-course/deploying-first-fullstack-dapp"
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
                  <Link
                    className="link-white"
                    href="/docs/references/system-canisters/index"
                  >
                    exchange rate canister
                  </Link>{" "}
                  sends and receives HTTP requests to fetch data from major
                  cryptocurrency exchanges.
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
                  href="/docs/references/t-sigs-how-it-works"
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
                  Developer Power-up
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-8">
                  Developers build within a serverless environment, using any programming language that can compile to Wasm (WebAssembly) byte code. Popular languages include Rust, Motoko and Python. Apps are built using "actor" software units that run in parallel. These run within their own persistent memory pages, creating a system of "orthogonal persistence," where data persists automatically inside developers' abstractions, essentially making logic and data one. ICP provides a modern, next-generation programming environment like none other, which is also internet native.
                </p>
                <Link
                  className="button-outline-white text-center mb-6 md:mb-8"
                  href="https://icp.ninja"
                >
                  INSTANT WEB IDE
                </Link>{" "}
                <br />
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/docs/home"
                >
                  <DocsIcon /> Developer documentation
                </Link>
              </TranslatedLayout>
            </div>
          </section>
        </section>
        {/*what design choices ICP has to achieve vision */}
        <section className="container-12 pt-10 md:pt-30 pb-30 md:pb-20 relative">
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
                  Chain Key verification
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  When software in a web browser, or another place, submits a
                  call to ICP, the transaction result in signed by a "chain key"
                  signature proving both that it was produced correctly, and
                  that it's tamper-free. One perpetual 48-byte key can be used
                  to validate responses from the entire network, forever...
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
                  Decentralized governance
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  Networks often evolve slowly and suffer from centralized
                  control. By contrast, ICP is orchestrated by fully-automated
                  decentralized governance, in the form of its
                  protocol-integrated NNS DAO, allowing for frequent upgrades
                  and network re-structuring. The network scales, evolves and
                  adapts in real time.
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
                  Scaling via subnets
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  The ICP network is comprised from multiple subnet blockchains,
                  each of which adds capacity for hosting smart contract
                  compute, while remaining transparent to smart contracts, which
                  interact directly within one global seamless environment.
                  Capacity scales horizontally and transparently.
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
                  Sovereign node hardware
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  Some blockchains are hosted by Big Tech's clouds, which is
                  antithetical. ICP runs on sovereign hardware operated by
                  independent node operators. Node hardware standardization also
                  plays an important role in the workings of the network,
                  unlocking efficiency that is orders of magnitude better.
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
                  Onchain parallelism
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  Traditional smart contracts run synchronously, which means
                  transactions run one at a time, bounding maximum transaction
                  throughput. ICP's contracts run in parallel, while keeping
                  computation deterministic, unleashing unbounded throughput
                  scaling, and constant performance under load.
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
                  Deterministic Decentralization
                </h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph-sm mb-2 md:text-center">
                  Traditional blockchains combine thousands of anonymous
                  validators to produce consensus quorums, but many are run by
                  the same operator, and run on the same clouds. ICP uses its
                  governance to combine nodes into subnets using deterministic
                  decentralization, allowing replication to be slashed.
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
                  The ICP execution environment leverages the WebAssembly
                  virtual machine. This enables developers to create smart
                  contracts using any programming language that compiles to Wasm
                  byte code, unlocking far greater flexibility and developer
                  productivity. WebAssembly also helps unlock massive
                  performance and efficiency.
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
                  Smart contracts serve web{" "}
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
              Connect and learn
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
              href="/docs/home"
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
