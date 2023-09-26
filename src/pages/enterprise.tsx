import Link from "@docusaurus/Link";
import useGlobalData from "@docusaurus/useGlobalData";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

function EnterprisePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Enterprise"
      description="Build next-generation enterprise systems by using advanced smart contract technology hosted on the Internet Computer blockchain."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-enterprise.jpg"></ShareMeta>

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
            className="container-10 pt-20 pb-40 md:pb-52 md:pt-36 relative"
            variants={transitions.container}
          >
            <div className="blob blob-white blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <div className="md:w-7/10 relative">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Cloud 3.0
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                <b>The future of cloud is serverless: for enterprise, government and Web3 applications.</b>
                <span style={{display: "block", height: "0.6em"}}></span>
                Now imagine an autonomous serverless cloud that hosts 
                data as well as logic, where software is tamperproof and unstoppable, can scale horizontally,
                and processes HTTP, where you can build sovereign systems and services 
                that don't need the protection of firewalls... 
                <span style={{display: "block", height: "0.6em"}}></span>
                An efficient cloud that destroys intractable R&D, security and
                legacy software costs. A platform where you are building more simply using an advanced evolution of
                smart contract technology hosted on an all-new form of blockchain &mdash; the Internet Computer.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-12 relative"
          el={motion.section}
          variants={transitions.fadeIn}
        >
          <div className="text-center md:w-5/10 relative md:absolute top-30 sm:top-40 md:top-0 -translate-y-1/2 right-0 -mt-30 md:-mt-24">
            <img
              src="/img/enterprise/enterprise-hero-image.webp"
              alt=""
              className="w-full max-w-sm sm:max-w-lg md:max-w-none"
            />
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 md:mt-30 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-6/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              Legacy tech stacks, increasing
              development costs and fleeing talent are just a few 
              of the blockers holding tech endeavors back from innovating 
              and staying ahead of the competition &mdash; move forward by building on
              a serverless cloud that's
              an <i>everything stack</i> created by an advanced public network.
            </motion.h2>
          </div>
        </AnimateSpawn>
        <br/><br/>
        <section className="bg-infinite relative overflow-hidden text-white">
          <div className="blob blob-white blob-sm md:blob-xl blob-x-7 blob-y-0"></div>
          <div className="container-10 mt-20 md:mt-40 md:w-6/10 md:mx-auto">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 text-center mb-0"
              variants={transitions.item}
            >
              Why build on the <br /> Internet Computer?
            </motion.h2>
          </div>
          <div className="mb-20 md:mb-40 container-12 flex flex-col gap-16 md:gap-40 relative pt-20">
            <TranslatedLayout
              imageUrl="/img/enterprise/serverless.webp"
              reverse={true}
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Serverless Computing
              </h2>
              <p className="tw-lead-sm">
                Enterprises and Web3 projects looking for serverless architectures to enable quick and
                agile development cycles that reduce infrastructure maintenance and
                operational costs can rely on the Internet Computer. It offers
                serverless features comparable to existing cloud providers with extra
                benefits like tamperproof code, decentralization and statefulness.
              </p>
              <p className="tw-lead-sm">
                The Internet Computer programming model is also similar to that of
                serverless clouds in that applications can be written in common
                languages such as Rust or Python. It is simpler, however, as state
                is maintained automatically without the need for developer intervention
                &mdash; a major advance in the field. 
              </p>
              <p className="tw-lead-sm">
                Serverless cloud addresses the $1.8 trillion global spend on IT personnel, 
                the $900 billion spend on software, $600 billion spend on Big Tech's clouds, $224 billion spend 
                on data center systems, $179 billion spend on cybersecurity, and the $50 billion 
                cost of cybersecurity incidents, reported by Gartner.
              </p>
              <p className="mb-0">
                <Link
                  href="https://medium.com/@dfinity/the-internet-computer-a-blockchain-that-offers-stateful-decentralized-serverless-computing-cdbbfdca4b7e"
                  className="link-white link-with-icon"
                >
                  <LinkArrowUpRight />
                  Read the blog and paper
                </Link>
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/enterprise/platform-risk-large.webp">
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Manage platform risk
              </h2>
              <p className="tw-lead-sm">
                Large-scale software systems relying on centralized cloud
                providers are subject to vendor lock-in, which can lead to
                increasing server costs or codebase refactoring.
              </p>
              <p className="tw-lead-sm">
                The Internet Computer offers an alternative technology stack
                that's open and decentralized. Independently owned and operated "node
                machines," which are installed in independent data centers around the world,
                are connected by advanced network protocols to form a seamless serverless
                cloud that's stateful, tamperproof, unstoppable, autonomous and sovereign,
                upon which any system can be built. Its software — canister smart contracts
                — are compiled to WebAssembly, the new Web3 industry standard for
                cross platform, language agnostic, portable server executable
                code.
              </p>
              <p className="tw-lead-sm">
                It's an open cloud where you can build sovereign enterprise infrastructure
                &mdash; which, just like the internet, doesn't have a corporate owner who 
                can make arbitrary updates, and who has backdoors and kill switches.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/enterprise/security-teams.webp"
              reverse={true}>
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Kill security costs &amp; risks
              </h2>
              <p className="tw-lead-sm">
                The Internet Computer hosts tamperproof and unstoppable software systems
                and services, which don't need protection 
                from firewalls, SIEM logging or other traditional cybersecurity 
                frameworks. 
              </p>
              <p className="tw-lead-sm">
                Simply put, it has no backdoors through which hackers can pass, or hosted 
                software or data can be attacked by viruses and ransomware. That's because 
                it's a virtual platform created by advanced math &mdash; fault-tolerant network 
                protocols and cryptography developed by world class
                cryptographers, engineers and computer scientists in a project that applied hundreds of person-years effort.          
              </p>
              <p className="tw-lead-sm">
                Now you can move beyond the security flaws of Legacy IT, to a world in which software is 
                tamperproof and unstoppable by building on the 
                Internet Computer.
              </p>              
              <p className="tw-lead-sm">
                Say goodbye to being hacked and encrypted by ransomware, slash your 
                cybersecurity costs, and focus instead on optimizing business logic and 
                creating delightful user experiences.
              </p>

              <p className="mb-0">
                <Link
                  href="/how-it-works"
                  className="link-white link-with-icon"
                >
                  <LinkArrowRight />
                  How the Internet Computer is designed
                </Link>
              </p>
            </TranslatedLayout>            
            <TranslatedLayout imageUrl="/img/enterprise/digital-identity.webp">
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Built-in digital identity framework
              </h2>
              <p className="tw-lead-sm mb-6 md:mb-10">
                No need to build proprietary identity solutions or rely on for-profit
                companies to keep user data safe and private. Internet Identity is a
                privacy-enhancing authentication framework native to the Internet
                Computer. Following the open standards of the FIDO Alliance and W3C,
                Internet Identity uses secure passkeys and WebAuthn that can be
                seamlessly integrated with any service running on the Internet Computer. 
                Zero knowledge proofs enable users to privately share sensitive data.
              </p>
              <p className="mb-0">
                <Link
                  href="/internet-identity"
                  className="link-white link-with-icon"
                >
                  <LinkArrowRight />
                  More on Internet Identity
                </Link>
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/enterprise/enterprise-custody-large.webp"
              reverse={true}
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Enterprise custody of digital assets
              </h2>
              <p className="tw-lead-sm mb-6 md:mb-10">
                Chain-key cryptography and secure multiparty computation enable
                enterprise-grade custody of digital assets on the Internet Computer.
                Security built into the protocol reduces the complexity of digital
                asset custody associated with traditional solutions.
              </p>
            </TranslatedLayout>            
            <TranslatedLayout imageUrl="/img/enterprise/tokenized-business-models.webp">
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Tokenized business models
              </h2>
              <p className="tw-lead-sm">
                From loyalty programs to memberships and ticketing, businesses
                need to manage customer relationships to be successful. The Internet
                Computer provides a common digital wallet that makes the handling of 
                digital assets and identities much simpler.
              </p>
              <p className="tw-lead-sm">
                Organizations can effectively include their customers in the
                product development life cycle by leveraging built-in tokenized
                voting tools that are native to the Internet Computer, incentivizing
                users to actively participate.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/enterprise/https-outcalls.webp"
              reverse={true}
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Extending existing software with blockchain capabilities
              </h2>
              <p className="tw-lead-sm">
                Internet Computer smart contracts can both process and create HTTP requests, 
                which allows them to host complete web apps on the blockchain, as well as
                directly make calls to APIs of any online service running on traditional cloud or
                elsewhere. This gives businesses the option to add blockchain capabilities to their
                existing software instead of developing the whole application on the blockchain from
                scratch.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/enterprise/x-org-collaboration.webp"
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-0">
                Secure X-org collaboration
              </h2>
              <p className="md:mb-6">(coming soon)</p>
              <p className="tw-lead-sm">
                Enterprises today face a choice of exchanging sensitive documents via emails
                with no audit trail of who accessed and edited them, or using expensive US
                hosted SaaS services with the associated vendor lock-in and geographical
                data protection issues. On-chain encryption enabled by 'Verifiable Encrypted
                Threshold Keys' (VETKeys) will enable customized cross-org workflows via tamperproof
                smart contract that store private data securely encrypted on chain.
              </p>
            </TranslatedLayout>
          </div>
        </section>
        <section className="mt-20 md:mt-48">
          <div className="container-10">
            <h2 className="tw-heading-3 md:tw-heading-60 text-black md:w-6/10 md:mx-auto text-center mb-10 md:mb-16">
              Special applications of autonomous cloud
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/development-costs-2.svg"
                  alt=""
                  className="w-24 md:w-30"
                />
                <h3 className="mt-4 md:mt-6 mb-2 tw-heading-5">
                  Secure inter-org workflows
                </h3>
                <p className="tw-paragraph mb-0">
                  Privately share documents with other organizations
                  and customers, using on-chain encryption enabled by VETKeys.
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/digital-identity.svg"
                  alt=""
                  className="w-24 md:w-30"
                />
                <h3 className="mt-4 md:mt-6 mb-2 tw-heading-5">
                  Digital identity layer
                </h3>
                <p className="tw-paragraph mb-0">
                  Privacy-enhancing identity layer for seamless
                  and secure authentication across systems and services/applications.
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/loyalty-programs.svg"
                  alt=""
                  className="w-24 md:w-30"
                />
                <h3 className="mt-4 md:mt-6 mb-2 tw-heading-5">
                  Tokenized reward programs
                </h3>
                <p className="tw-paragraph mb-0">
                  Simplify customer loyalty and employee reward programs using
                  tokens.
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/secure-sharing.svg"
                  alt=""
                  className="w-24 md:w-30"
                />
                <h3 className="mt-4 md:mt-6 mb-2 tw-heading-5">
                  Verifiable credentials
                </h3>
                <p className="tw-paragraph mb-0">
                  Share only the necessary personal information with other
                  platforms.
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/ownership.svg"
                  alt=""
                  className="w-24 md:w-30"
                />
                <h3 className="mt-4 md:mt-6 mb-2 tw-heading-5">
                  Simple self-custody
                </h3>
                <p className="tw-paragraph mb-0">
                  Cryptographically secured user ownership of data, and digital
                  assets.
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/img/enterprise/supply-chain.svg"
                  alt=""
                  className="w-24 md:w-30"
                />
                <h3 className="mt-4 md:mt-6 mb-2 tw-heading-5">Supply chain</h3>
                <p className="tw-paragraph mb-0">
                  Blockchain transparency and immutability for easy
                  verification of authenticity.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container-10 py-30 md:pt-60 pb-60 sm:pb-[320px] md:pb-[550px] relative">
          <div className="sm:w-8/10 md:w-6/10">
            <motion.h2
              className="tw-heading-4 md:tw-heading-3 mb-8 text-gradient"
              variants={transitions.item}
            >
              The Internet Computer processes vast numbers of computational transactions daily,
              supporting enterprise cloud and blockchain-specific use cases.
            </motion.h2>
            <motion.p className="mb-24">
              <Link
                href="mailto:comms@dfinity.org"
                className="button-primary"
              >
                Get in touch to talk use cases
              </Link>
            </motion.p>
          </div>
          <img
            src="/img/enterprise/big-visual.svg"
            alt=""
            className="absolute w-[600px] max-w-none sm:max-w-full sm:w-auto bottom-0 sm:bottom-auto sm:top-5/12 md:top-3/10 sm:-right-3/10"
          />
        </section>        
        <section className="container-12 py-30 md:py-48">
          <div className="text-center mb-16 md:mb-30">
            <AnimateSpawn
              className="container-12"
              variants={transitions.container}
            >
              <motion.h2
                className="tw-heading-3 md:tw-heading-2 text-gradient text-center md:w-8/12 md:mx-auto mb-8"
                variants={transitions.item}
              >
                Enterprises adopting the Internet Computer
              </motion.h2>
            </AnimateSpawn>
          </div>

          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/enterprise/italy-large.webp">
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                100% made in Italy
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                FEDERITALY is a non-profit organization that promotes and
                protects Italian entrepreneurship. In collaboration with the ORIGYN
                Foundation, they are building a solution on the Internet Computer to improve 
                their “100% made in Italy” verification service. Consumers benefit from 
                product authenticity of origin certificates stored fully on-chain
                and protected by tamperproof smart contracts.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://www.bloomberg.com/press-releases/2023-03-21/a-digital-certificate-for-authentic-italian-products"
              >
                <LinkArrowRight /> See press release
              </Link>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/enterprise/nft-large.webp"
              reverse={true}
            >
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                NFTs as employee rewards
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                  As part of their global rebranding to Pluxee, French multinational, {" "}
                  <Link className="link-subtle" href="https://www.sodexo.com/en/services/pluxee">
                  Sodexo Benefits & Rewards Services
                  </Link>{" "}
                  partnered with Yumi NFT Marketplace on the
                  Internet Computer to modernize their employee reward program and create a dynamic
                  company culture within the organization. Pluxee launched an exclusive NFT collection
                  (X Collection) for its 5'000 employees. Pluxee pledged to donate to the Stop Hunger
                  Foundation for each employee NFT claimed.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://decrypt.co/146830/sodexo-drops-nfts-twist-employees-not-public"
              >
                <LinkArrowRight /> More on the X Collection
              </Link>
            </TranslatedLayout>
            <AnimateSpawn
              className="container-12"
              variants={transitions.container}
            >
              <motion.div variants={transitions.container}>
                <Link
                  className="button-outline text-center"
                  href="/ecosystem"
                >
                  other projects on the Internet Computer
                </Link>
              </motion.div>
            </AnimateSpawn>
          </div>
        </section>
        <AnimateSpawn
          className="bg-infinite overflow-hidden "
          variants={transitions.container}
          el={motion.section}
        >
          <div className="container-10 py-30 md:py-40 flex flex-col sm:flex-row text-white relative">
            <div className="blob blob-white blob-sm md:blob-xl blob-x-10 blob-y-3 md:blob-y-5"></div>
            <div className="flex-1 mt-40 sm:mt-0">
              <h2 className="tw-heading-4 md:tw-heading-3 mb-6">
                Interested in running a pilot on the Internet Computer?
              </h2>
              <p className="tw-lead-sm md:tw-lead mb-6 md:mb-8">
                Committing to a new technology stack is a big decision. Speak with experts
                to get a better sense of how the Internet Computer could benefit your business.
              </p>
              <p className="mb-0">
                <Link
                  href="mailto:comms@dfinity.org"
                  className="button-white"
                >
                  get in touch
                </Link>
              </p>
            </div>
            <div className="flex-1 ">
              <img
                src="/img/enterprise/enterprise-learnmore-background-image.svg"
                alt=""
                loading="lazy"
                className="absolute top-0 right-0 left-0 max-w-md md:max-w-none sm:left-auto sm:-right-30"
              ></img>
            </div>
          </div>
        </AnimateSpawn>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15 mt-40">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-sm blob-x-5 blob-y-7 z-[-1] md:blob-xl"
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
              title="Network dashboard"
              description=""
              href="https://dashboard.internetcomputer.org/"
            />

            <CardWithDescription
              title="Sample code"
              description=""
              href="/samples?selectedDomains=Asynchronous+DeFi"
            />
            <CardWithDescription
              title="Developer docs"
              description=""
              href="/docs/current/home"
            />
            <CardWithDescription
              title="How it works"
              description=""
              href="/how-it-works"
            />
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default EnterprisePage;
