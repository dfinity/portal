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

function WhatIsIcpPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="What is ICP"
      description={`The Internet Computer adds autonomous serverless cloud functionality to the public internet - making it possible to build almost any system or service entirely on a decentralized network using “canister software,” an evolution of smart contracts.`}
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
                <br className="hidden md:block" /> Internet Computer
              </motion.h1>
              <motion.p
                className="pb-[15%] sm:pb-0 tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                The Internet Computer adds autonomous serverless cloud
                functionality to the public internet – making it possible to
                build almost any system or service entirely on a decentralized
                network using “canister software,” an evolution of smart
                contracts.
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
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              The Internet Computer is created by ICP, the most advanced network
              protocol ever devised. It enables people to build Web3 services
              and enterprise systems directly on a public decentralized network,
              which scales even to hosting social networks and media streaming.
              Hosted services are tamperproof, don’t need firewalls, support
              Web3 functionality, and can trustlessly interact with the outside
              world.
            </motion.h2>
          </div>
        </AnimateSpawn>

        <section
          className="mt-20 md:mt-48 
          bg-[linear-gradient(180deg,transparent_0%,transparent_97%,#3b00b9_97%,#3b00b9_100%)] 
          sm:bg-[linear-gradient(180deg,transparent_0%,transparent_87%,#3b00b9_87%,#3b00b9_100%)] 
          md:bg-[linear-gradient(180deg,transparent_0%,transparent_77%,#3b00b9_77%,#3b00b9_100%)] 
          relative "
        >
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
                <h3 className="tw-lead my-3 md:tw-title-sm">Tamperproof</h3>
                <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-0">
                  Canister software is tamperproof, does not need to be
                  protected by a firewall, and cannot be infected with
                  ransomware. Because the Internet Computer is created by
                  advanced math, there are no backdoors.
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
                <h3 className="tw-lead my-3 md:tw-title-sm">Autonomous</h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  Canisters can be made unmodifiable, creating permanent logic
                  on the network, or placed under the control of autonomous
                  governance – empowering communities to run Web3, or securing
                  an enterprise.
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
                <h3 className="tw-lead my-3 md:tw-title-sm">Simple</h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  The global spend on IT personnel is now $1.8 trillion.
                  Canister software greatly simplifies the development and
                  maintenance of online systems and services, driving cost
                  savings, and making you faster to market.
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
                <h3 className="tw-lead my-3 md:tw-title-sm">Sovereign</h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  If your enterprise, government or Web3 service builds on
                  centralized traditional IT, there are kill switches and
                  backdoors, which deny you true sovereignty. Build on the
                  network instead.
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
                <h3 className="tw-lead my-3 md:tw-title-sm">Web3 + OIS</h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  Canisters support more powerful tokenization models that
                  advance Web3. Autonomous governance can create “open internet
                  services” (OISs) that are exclusively managed by their
                  communities.
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
                <h3 className="tw-lead my-3 md:tw-title-sm">Next-gen AI</h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  The Internet Computer is currently adding support for Web3 “AI
                  compute units.” AI will also run on the network, supporting
                  native Web3 integrations, and trustlessness combinations of
                  models and data.
                </p>
              </motion.div>
            </AnimateSpawn>
          </div>
        </section>

        <section className="bg-infinite text-white pt-20 md:pt-44">
          <div className="container-10 md:w-6/10 md:mx-auto">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 text-center mb-0"
              variants={transitions.item}
            >
              How is the Internet Computer created by a protocol?
            </motion.h2>
          </div>
          <div className=" container-12 flex flex-col gap-16 md:gap-40 relative pt-20">
            <TranslatedLayout imageUrl="/img/what-is-the-ic/node-providers.webp">
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Node providers
              </h2>

              <p className="tw-lead-sm mb-0">
                Standardized hardware devices called node machines are run by
                independent parties called node providers, from different data
                centers, geographies, and jurisdictions around the world. Node
                providers run their hardware to earn tokenized rewards, rather
                like independent ISPs and backbone providers operate routing
                devices to earn peering fees.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/what-is-the-ic/subnet-blockchains.webp"
              reverse={true}
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Subnet blockchains
              </h2>
              <p className="tw-lead-sm mb-0">
                The ICP protocols combine node machines into highly efficient
                subnet blockchains, which add capacity for hosting tamperproof
                canisters. The Internet Computer has a permissionless automated
                governance system called the Network Nervous System, which
                instructs nodes to join or leave subnets.
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/what-is-the-ic/smart-contracts.webp">
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Canister smart contracts
              </h2>
              <p className="tw-lead-sm mb-0">
                Smart contracts are a new form of software that runs on
                blockchain networks, which is tamperproof, unstoppable,
                optionally autonomous, can process tokens, and is easily
                composed. Canisters are a high-performance form that can be used
                to build anything. They interact with HTTP to serve user
                experiences, can interact with Web2, and can natively interact
                with external blockchains. Because they scale, a social network
                or complex enterprise system can run from the network,
                simplifying building, and creating a future without firewalls
                and trust. They offer a compelling alternative to building on
                centralized traditional IT.
              </p>
            </TranslatedLayout>
          </div>
        </section>
        <AnimateSpawn
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
              The subnets combine into one autonomous serverless cloud
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
        </AnimateSpawn>
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
                Cool things...
              </motion.h2>
            </AnimateSpawn>
          </div>

          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/what-is-the-ic/internet-identity.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Internet Identity
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Internet Identity enables users to quickly and securely
                authenticate to online systems and services using their devices,
                for example using their laptop fingerprint sensor, or FaceID on
                their phone. Under the skin, the framework relies on TPM chips
                inside modern hardware, which keep keys and signing secure, the
                WebAuthn protocol, which connects code inside the web browser to
                those TPMs, and advanced chain-key cryptography running on the
                Internet Computer network.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="/internet-identity"
              >
                <LinkArrowRight /> Identity on ICP
              </Link>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/what-is-the-ic/open-internet-services.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Open Internet Services
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Open internet services are services that run autonomously
                under the exclusive control of a decentralized governance system
                called a Service Nervous System (SNS), an evolution of DAO
                technology. This can enable a Web3 service to be transparently
                run by a community of thousands, allowing services to founderize
                users that contribute by granting them governance tokens, for
                example for creating viral content, inverting the traditional
                Big Tech model. Enterprise can use the same technology to
                distribute control over system updates and configuration,
                greatly increasing security.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="/sns"
              >
                <LinkArrowRight /> User-run Web3
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/what-is-the-ic/sovereign-infrastructure.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Sovereign infrastructure
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                When the systems and services that power society are built using
                centralized traditional IT infrastructure – such as cloud
                services, closed-source software, and security hardware – there
                are backdoors enabling spying, and kill switches. With no
                alternative, governments had to surrender sovereignty over the
                digital foundations society relies on. Now the Internet Computer
                is adding special localized sovereign subnets for usage by
                governments, NGOs and enterprises with special needs:
                unstoppable, secure, and transparent sovereign platform
                infrastructure.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="/node-providers"
              >
                <LinkArrowRight /> IT beyond cloud
              </Link>
            </TranslatedLayout>
          </div>
        </section>

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
              Get familiar with the Internet Computer
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
