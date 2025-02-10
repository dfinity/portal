import React, { useRef } from "react";

import AnimateSpawn from "../components/Common/AnimateSpawn";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import BiometricIcon from "@site/src/components/Basics/EthDenver/biometric.svg";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import IntraPageNav from "../components/Common/IntraPageNav";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LocationIcon from "@site/static/img/ethdenver/location.svg";
import NoTrackingIcon from "@site/src/components/Basics/EthDenver/privacy.svg";
import { OnChainBadge } from "../components/Common/OnChainBadge/OnChainBadge";
import ShareMeta from "../components/Common/ShareMeta";
import StartBuildingSection from "@site/src/components/LandingPage/StartBuilding";
import TwitterIcon from "@site/static/img/ethdenver/twitter.svg";
import WebAuthnIcon from "@site/src/components/Basics/EthDenver/webauthn.svg";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import { useEffect } from "react";

const MotionLink = motion(Link);

const projects: {
  logo: string;
  name: string;
  description: string;
  agenda: string[];
}[] = [
  {
    name: "AstroX (me wallet)",
    logo: "/img/ethdenver/astrox.webp",
    description:
      "Multichain wallet securing your assets without seed phrase across any devices.",
    agenda: ["Mar 2 - 5, 2023"],
  },
  {
    name: "Hot or Not",
    logo: "/img/ethdenver/hotornot.webp",
    description: "Monetise Time on Social Media. Video platform in ICP.",
    agenda: ["Mar 2 - 5, 2023"],
  },
  {
    name: "Finterest",
    logo: "/img/ethdenver/finterest.webp",
    description: "The first truly decentralized price feed.",
    agenda: ["Mar 2 - 5, 2023"],
  },
  {
    name: "Toniq Labs",
    logo: "/img/ethdenver/toniq.webp",
    description: "We help you build, launch, and grow NFT-based businesses.",
    agenda: ["Mar 2 - 5, 2023"],
  },
  {
    name: "ORIGYN",
    logo: "/img/ethdenver/origyn.webp",
    description: "Digital verifications for physical objects through NFTs.",
    agenda: ["Mar 3 / 4, 2023"],
  },

  {
    name: "Demergent Labs",
    logo: "/img/ethdenver/demergent-labs.webp",
    description: "Accelerating the adoption of Web3 and the Internet Computer.",
    agenda: ["Mar 3 / 4, 2023"],
  },
  {
    name: "Itoka",
    logo: "/img/ethdenver/itoka-logo.webp",
    description:
      "Become a musician smooth and simple with AI and Web3 technology. Only on ICP.",
    agenda: ["Mar 3 / 4, 2023", "5:00pm - 6:00pm MST"],
  },

  {
    name: "ntagle",
    logo: "/img/ethdenver/ntagle-logo.webp",
    description:
      "Scalable and cost-effective way to trustlessly bind physical objects to canisters",
    agenda: ["Mar 4, 2023", "8:00am - 10:00am MST"],
  },
];

const GradientBackground = ({ color1, color2, segments, isFullWidth = false }: { color1: string, color2: string, segments: number[][], isFullWidth: boolean }) => {
  // watch mouse move for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--gradient-x', `${x}`);
      document.documentElement.style.setProperty('--gradient-y', `${y}`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div
      className="absolute z-0 top-0 left-0 w-full h-full"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${segments.length}, 1fr)`,
        width: '100%',
        height: '100%',
      }}
    >
      {segments.map((row, rowIndex) => (
        <div 
          key={rowIndex}
          style={{
            display: 'grid',
            gridTemplateColumns: row.map(fr => `${fr}fr`).join(' '),
          }}
        >
          {row.map((_, colIndex) => (
            <div
              className="relative overflow-hidden"
              key={colIndex}
            >
              <div
              className={`absolute top-0 left-0 h-full 
                ${isFullWidth 
                  ? 'w-[100vw]' 
                  : 'w-[200%]'}
                `}
              style={{
                willChange: 'background',
                background: `radial-gradient(circle, ${color1} calc(30% * var(--gradient-x)), ${color2} calc(max(70%, 90% * var(--gradient-y))))`,
              }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const CtaCard = ({ title, description, href, backgroundColor, backgroundSegments = [[1, 2, 3]] }: { title: string, description: string, backgroundColor: string[], backgroundSegments: number[][], href: string }) => {
  return (
    <Link
      className="relative link-primary text-black link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform overflow-hidden rounded-xl"
      href={href}
    > 
      <GradientBackground
        color1={backgroundColor[0]}
        color2={backgroundColor[1]}
        segments={backgroundSegments}
        isFullWidth={false}
      />
      <article className="relative z-2 flex flex-col gap-8 justify-between items-start p-6 aspect-[1/1.3]">
        <h3 className="tw-heading-alt-2 mb-3">
            <span dangerouslySetInnerHTML={{ __html: title }} />
        </h3>

        <div>
          <p className="tw-paragraph md:tw-lead text-black-60 mb-2">
            {description}
          </p>
          <div className="button-round-icon mt-auto !bg-transparent !text-black !border-black/20 hover:!bg-black/10 hover:!border-black">
            <LinkArrowRight />
          </div>
        </div>
        
      </article>
    </Link>
  );
};

function EthDenverPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Internet Computer blockchain @ ETHDenver 2023"
      description={`Visit us @ ETHDenver 2023, February 24 - March 5, 2023. Lightning fast and fully onchain dapps running on the Internet Computer blockchain, the only true World Computer that enables a fully decentralized ecosystem.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-ethdenver-2.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >

        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section id="intro" className="relative">
          <div className="absolute top-0 right-0 bottom-0 left-0 -z-1">
            <GradientBackground
              color1="#5015FF"
              color2="#D897B4"
              segments={[
                [1, 2, 4]
              ]}
              isFullWidth={true}
            />
          </div>
          <AnimateSpawn variants={transitions.container}>
            <div
              className="overflow-hidden text-black pt-20"
              ref={heroRef}
            >
              <div className="container-12 pt-20 mb-20 md:mb-20 md:pt-36">

                <div className="uppercase">
                  <motion.h1 
                    className="tw-heading-alt-1 text-right text-[10vw]"
                    variants={transitions.slideInFromRight}
                  >
                    <span className="block">UNIFYING WEB3</span>
                    <span className="block">AND AI</span>
                  </motion.h1>
                </div>

                <div className="md:w-5/10">
                  <motion.h2
                    className="tw-lead md:tw-title-sm mb-12 md:mb-8"
                    variants={transitions.item}
                  >
                    ETHDenver 2025<br/>
                    <time dateTime="2025-02-23">February 23</time> – <time dateTime="2025-03-02">March 2</time>
                  </motion.h2>
                  <motion.p
                    className="tw-lead-sm md:tw-lead mb-8 mt-10 md:mt-0"
                    variants={transitions.item}
                  >
                    Lightning fast and fully on-chain dapps runningon the Internet Computer blockchain, the only true World Computer that enables a end-to-end  decentralization.
                  </motion.p>

                  <motion.p
                    className="mb-10 md:mb-16 flex gap-8"
                    variants={transitions.item}
                  >
                    <Link
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary"
                    >
                      Join the Hackathon
                    </Link>
                    <Link
                      className="link-with-icon"
                      href="https://x.com/dfinity"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterIcon className="w-6 h-6" />
                      Follow us for event updates
                    </Link>
                  </motion.p>

                </div>

              </div>
            </div>
          </AnimateSpawn>
        </section>


        {/* Meet us */}
        <section
          className="bg-black text-white py-20 md:pt-30 md:pb-40"
          id="agenda"
        >
          <AnimateSpawn
            className="container-10 relative mb-16 md:mb-20"
            variants={transitions.container}
          >
            <div className="md:w-8/10">
              <motion.h2
                className="tw-heading-alt-2 md:mb-8"
                variants={transitions.item}
              >
                Meet us at our Booth AT ETHDenver 2025
              </motion.h2>
              <motion.p className="tw-lead mb-8" variants={transitions.item}>
                <span className="text-white-60">
                  Join us for an electrifying ETH Denver experience filled with hands-on workshops, inspiring keynote speeches, interactive Q&A sessions, and live demos of ICP Ecosystem dapps at our booth!
                </span>
              </motion.p>
              <MotionLink
                className="link-white link-with-icon text-[#AE9EFF]"
                href="https://x.com/dfinity"
                target="_blank"
                rel="noopener noreferrer"
                variants={transitions.item}
              >
                <TwitterIcon />
                <span className="tw-paragraph-sm">
                  Follow us for event updates
                </span>
              </MotionLink>
            </div>
          </AnimateSpawn>

          <div className="container-10 flex text-black space-x-8">
            <AnimateSpawn
              className="w-1/3"
              variants={transitions.item}
            >
              <CtaCard 
                title="Chain Fusion"
                description="Build and Scale Multichain dApps across ETH, BTC and more"
                backgroundColor={['#5015FF', '#D897B4']}
                backgroundSegments={[
                  [1, 2]
                ]}
                href="#"
              />
            </AnimateSpawn>
            <AnimateSpawn
              className="w-1/3"
              variants={transitions.item}
            >
              <CtaCard 
                title="ICP<br>Ninja"
                description="Enter the Dojo and Master the Art of Smart Contracts"
                backgroundColor={['#D897B4', '#F7016E']}
                backgroundSegments={[
                  [2, 1],
                  [1],
                  [1, 2],
                ]}
                href="#"
              />
            </AnimateSpawn>
            <AnimateSpawn
              className="w-1/3"
              variants={transitions.item}
            >
              <CtaCard 
                title="Onchain<br>AI"
                description="Leverage the power of decentralized AI and the Self-Writing Internet"
                backgroundColor={['#F6D43C', '#D897B4']}
                backgroundSegments={[
                  [5, 1],
                  [1, 5],
                  [5, 1],
                ]}
                href="#"
              />
            </AnimateSpawn>
          </div>
        </section>


        {/* Bounties */}
        <section className="container-10 py-20 md:py-40" id="bounties">
          <AnimateSpawn
            className="flex flex-col md:flex-row mb-20 md:mb-40"
            variants={transitions.container}
          >
            <div className="md:w-1/2">
              <motion.h2
                className="tw-heading-alt-2 mb-6 md:mb-8"
                variants={transitions.item}
              >
                <span className="text-gradient-base text-gradient-denver">
                  ETHDenver Bounties 
                </span>
                <br />
                Get Your Hack <br/>
                On
              </motion.h2>
              <motion.img
                src="/img/ethdenver/motoko-playground.webp"
                alt=""
                className="w-full md:hidden mb-6"
                variants={transitions.fadeIn}
              />
              <motion.p className="tw-lead-sm mb-8" variants={transitions.item}>
                Bring DeFi and SocFi to Bitcoin, go mad with NFTs, or decentralize an Ethereum DAO on the Internet Computer and get rewarded for it. This is your chance to #BUIDL the future internet! 
              </motion.p>
              <motion.div
                className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center"
                variants={transitions.item}
              >
                <Link
                  href="https://app.buidlbox.io/guidl/dfinity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  Register now
                </Link>
                <Link
                  className="link-primary link-with-icon"
                  href="https://twitter.com/DFINITYDev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon />
                  Follow for Developer related updates
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2 hidden md:block">
              <img
                src="/img/ethdenver/motoko-playground.webp"
                alt=""
                className="w-full"
              />
            </div>
          </AnimateSpawn>

          <AnimateSpawn className="" variants={transitions.container}>
            <motion.h3
              className="tw-heading-5 md:tw-heading-4 mb-8"
              variants={transitions.item}
            >
              Participation Categories:
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <motion.div
                className="bg-white-60 border border-solid border-white rounded-xl px-6 py-8 flex flex-col gap-4 justify-between"
                variants={transitions.item}
              >
                <div>
                  <h4 className="tw-heading-5 mb-3">
                    Build an onchain AI agent or agent framework plugin
                  </h4>
                  <p className="tw-paragraph text-black-60 mb-6">
                    Challenge: Smart contracts running on ICP can run autonomously, sign transactions on more than 20 blockchains and communicate using HTTPS API calls. Use these features to build an onchain (AI) agent or a plugin for an existing agent framework like ElizaOS or LangChain.
                  </p>
                </div>
                <div className="tw-lead">
                  <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                    <span className="w-5/12">1st place:</span><span>$7,000</span>
                  </p>
                  <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                    <span className="w-5/12">2st place:</span><span>$4,000</span>
                  </p>
                  <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                    <span className="w-5/12">3st place:</span><span>$2,000</span>
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="bg-white-60 border border-solid border-white rounded-xl px-6 py-8 flex flex-col gap-4 justify-between"
                variants={transitions.item}
              >
                <div>
                  <h4 className="tw-heading-5 mb-3">
                    Only possible on ICP
                  </h4>
                  <p className="tw-paragraph text-black-60 mb-6">
                    Challenge: Smart contracts running on ICP can run autonomously, sign transactions on more than 20 blockchains and communicate with the outside world using HTTPS API calls. Use these features to build a Web3 app that couldn't be built anywhere else.
                  </p>
                </div>
                <div className="tw-lead">
                  <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                    <span className="w-5/12">1st place:</span><span>$7,000</span>
                  </p>
                  <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                    <span className="w-5/12">2st place:</span><span>$4,000</span>
                  </p>
                  <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                    <span className="w-5/12">3st place:</span><span>$2,000</span>
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="bg-white-60 border border-solid border-white rounded-xl px-6 py-8 flex flex-col gap-4 justify-between"
                variants={transitions.item}
              >
                <div>
                  <h4 className="tw-heading-5 mb-3">
                    Use vetKeys to store secrets on the blockchain
                  </h4>
                  <p className="tw-paragraph text-black-60 mb-6">
                  Challenge: Blockchains can keep secrets! vetkeys, a coming ICP feature, will let apps host econrypted data at scale. Build applications leveraging onchain encryption with vetKeys to enable private messaging, secret auctions, time-lock encryption, and more.
                  </p>
                </div>
                <div className="tw-lead">
                  <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                    <span className="w-5/12">1st place:</span><span>$7,000</span>
                  </p>
                  <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                    <span className="w-5/12">2st place:</span><span>$4,000</span>
                  </p>
                  <p className="text-gradient-base text-gradient-denver inline-block mb-0 flex gap-4 align-baseline">
                    <span className="w-5/12">3st place:</span><span>$2,000</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </AnimateSpawn>
        </section>


        <BackgroundPanel
          panelClassName="bg-[#0A0023]"
          outerClassName="pt-10 md:pt-20 md:pb-30"
          threshold={0.25}
          id="internet-identity"
        >
          <div className="">
            <AnimateSpawn
              variants={transitions.container}
              className="container-10 text-white mb-12 md:mb-20 relative"
            >
              <div className="md:w-6/10">
                <motion.h2
                  variants={transitions.item}
                  className="tw-heading-alt-2 mb-6"
                >
                    Join the movement!
                  <br />
                  Get Yourself an
                  <br /> 
                  <span className="inline-block text-gradient-base text-gradient-denver">
                    Internet Identity
                  </span>
                </motion.h2>
                <motion.p
                  variants={transitions.item}
                  className="tw-lead mb-8"
                >
                  <span className="text-white-60">
                    Web2 login experience with blockchain security. Internet Identity is a privacy-enhancing WebAuthn framework to applications on the Internet Computer.
                  </span>
                </motion.p>
                <MotionLink
                  className="button-outline-white text-[#AE9EFF] border-white-20 border border-solid normal-case"
                  href="https://identity.ic0.app/"
                  variants={transitions.item}
                >
                  Set one up now!
                </MotionLink>
              </div>
            </AnimateSpawn>
            <AnimateSpawn
              variants={transitions.container}
              className="container-12 flex flex-col md:flex-row gap-5 text-white relative"
            >
              <motion.div
                variants={transitions.item}
                className="flex-1 p-6  pb-12grid grid-rows-[auto_1fr_auto] border border-solid border-white-20 rounded-xl"
              >
                <BiometricIcon className="w-12 h-14 mb-10"></BiometricIcon>

                <h3 className="tw-heading-5 mb-3 self-end">
                  Biometric login
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-0 text-white-60">
                  Authenticate via FaceID, fingerprint sensor or a YubiKey. This
                  provides the most security, as the cryptographic key never
                  leaves your device.
                </p>
              </motion.div>

              <motion.div
                variants={transitions.item}
                className="flex-1 p-6 g pb-12rid grid-rows-[auto_1fr_auto] border border-solid border-white-20 rounded-xl"
              >
                <NoTrackingIcon className="w-12 h-14 mb-10"></NoTrackingIcon>
                <h3 className="tw-heading-5 mb-3 self-end">
                  No tracking
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-0 text-white-60">
                  Remain anonymous using the Internet Identity authentication
                  framework, which prevents user tracking across dapps and
                  services.
                </p>
              </motion.div>
              <motion.div
                variants={transitions.item}
                className="flex-1 p-6 pb-12 grid grid-rows-[auto_1fr_auto] border border-solid border-white-20 rounded-xl"
              >
                <WebAuthnIcon className="w-12 h-14 mb-10"></WebAuthnIcon>
                <h3 className="tw-heading-5 mb-3 self-end">
                  WebAuthn
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-0 text-white-60">
                  Internet Identity integrates the widely used secure web2
                  authentication framework known as WebAuthn for maximum
                  compatibility.
                </p>
              </motion.div>
            </AnimateSpawn>
          </div>
        </BackgroundPanel>
        <section id="blockchain-singularity">
          <AnimateSpawn
            className="md:container-12 pt-20 md:py-30"
            variants={transitions.container}
          >
            <div className="md:rounded-[32px] backdrop-blur-2xl bg-white-60 px-1/12 pb-20 md:py-30 relative">
              <div className="-translate-y-24 sm:-translate-y-40 md:translate-y-0 md:absolute z-[-1] md:w-[500px] lg:w-[780px] md:top-[40px] lg:top-[-130px] right-0 overflow-hidden">
                <motion.img
                  src="/img/home/dao.svg"
                  alt=""
                  className="w-full relative md:right-[-50px] lg:right-[-100px]"
                  variants={transitions.item}
                />
              </div>
              <div className="md:w-5/10 -mt-16 md:mt-0">
                <motion.img
                  src="/img/ethdenver/logo-dfinity.svg"
                  className="inline-block mb-3 md:mb-6"
                  alt=""
                  variants={transitions.item}
                />
                <motion.h2
                  className="text-transparent bg-clip-text text-gradient-base text-gradient-denver tw-heading-3 md:tw-heading-2 mb-6"
                  variants={transitions.item}
                >
                  Blockchain Singularity
                </motion.h2>
                <motion.p
                  className="tw-lead-sm md:tw-lead-sm mb-12"
                  variants={transitions.item}
                >
                  Web3 still runs on Big Tech's cloud. Blockchains can host
                  tokens, but only tiny amounts of data and compute, and no web.
                  But not the Internet Computer blockchain. The IC runs it all
                  onchain, fully decentralized — from simple dapps, to high
                  user-volume social networks and games, to oderbook exchanges
                  and enterprise systems, without the need for traditional IT.
                </motion.p>
              </div>
              <div className="md:w-6/10">
                <motion.p
                  className="flex flex-col sm:flex-row items-start md:items-center gap-6 md:gap-8 mb-0"
                  variants={transitions.item}
                >
                  <Link className="button-primary" href="/capabilities">
                    ICP CAPabilities
                  </Link>
                  <Link className="link-primary link-with-icon" href="/">
                    <LinkArrowRight />
                    Learn more at internetcomputer.org
                  </Link>
                </motion.p>
              </div>
            </div>
          </AnimateSpawn>
        </section>
        <StartBuildingSection
          id="start-building"
          title="Be a pioneer of Web3"
          body="Start a DAO, create a token, build dapps and host assets with the full stack entirely onchain."
          cta="BUILD REAL WEB3"
          ctaLink="/docs/current/home"
          cards={[
            {
              title: "Dev Forum",
              body: "Engage with the ICP community to shape future features, propose new ideas, and ask questions. ",
              link: "https://forum.dfinity.org",
            },
            {
              title: "Dev Docs",
              body: "Get to know the concepts,  architecture and technical breakthroughs that enable the ICP. Plus step-by-step guides on how to stake your tokens, and more.",
              link: "/docs/current/home",
            },
            {
              title: "Sample Code",
              body: "From a simple DEX, to onchain encrypted storage, NFT minting, and a basic DAO, learn how to build on the Internet Computer.",
              link: "/samples",
            },
            {
              title: "Motoko Playground",
              body: "Play around with Motoko, the native language of the Internet Computer, right in the browser without having to download the SDK.",
              link: "https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/",
            },
          ]}
        />
        <IntraPageNav
          hasHome={false}
          links={[
            { text: "Intro", to: "#intro" },
            { text: "Bounties", to: "#bounties" },
            { text: "Agenda", to: "#agenda" },
            // { text: "Topics", to: "#topics" },
            { text: "Ecosystem", to: "#ecosystem" },
            { text: "Internet Identity", to: "#internet-identity" },
            { text: "Blockchain Singularity", to: "#blockchain-singularity" },
            { text: "Start building", to: "#start-building" },
          ]}
          label="Scroll to section"
        ></IntraPageNav>
      </main>
    </Layout>
  );
}

export default EthDenverPage;
