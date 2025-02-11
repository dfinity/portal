import React, { useRef } from "react";

import AnimateSpawn from "../components/Common/AnimateSpawn";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import BeAPioneer from "@site/src/components/ETHDenver/BeAPioneer";
import BiometricIcon from "@site/src/components/Basics/EthDenver/biometric.svg";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import IntraPageNav from "../components/Common/IntraPageNav";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import NoTrackingIcon from "@site/src/components/Basics/EthDenver/privacy.svg";
import ShareMeta from "../components/Common/ShareMeta";
import TwitterIcon from "@site/static/img/ethdenver/twitter.svg";
import WebAuthnIcon from "@site/src/components/Basics/EthDenver/webauthn.svg";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import { useEffect } from "react";

const MotionLink = motion(Link);

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
      <article className="relative z-2 flex flex-col gap-8 justify-between items-start p-6 aspect-[1/1.1] md:aspect-[1/1.3]">
        <h3 className="tw-heading-alt-2 mb-3">
            <span dangerouslySetInnerHTML={{ __html: title }} />
        </h3>

        <div>
          <p className="md:tw-lead text-black-60 mb-2">
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
      title="Internet Computer blockchain @ ETHDenver 2025"
      description={`Visit us @ ETHDenver 2025, February 23 - March 2, 2025. Lightning fast and fully onchain dapps running on the Internet Computer blockchain, the only true World Computer that enables a fully decentralized ecosystem.`}
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
              <div className="container-12 pt-12 mb-20 md:mb-20 md:pt-36">

                <div className="uppercase mb-16 md:mb-0">
                  <motion.h1 
                    className="tw-heading-alt-1 text-right text-[18vw] md:text-[10vw]"
                    variants={transitions.slideInFromRight}
                  >
                    <span className="block">UNIFYING WEB3</span>
                    <span className="block">AND AI</span>
                  </motion.h1>
                </div>

                <div className="md:w-5/10">
                  <motion.h2
                    className="tw-lead md:tw-title-sm mb-6 md:mb-8"
                    variants={transitions.item}
                  >
                    ETHDenver 2025<br/>
                    <time dateTime="2025-02-23">February 23</time> – <time dateTime="2025-03-02">March 2</time>
                  </motion.h2>
                  <motion.p
                    className="tw-lead-sm md:tw-lead mb-8"
                    variants={transitions.item}
                  >
                    Lightning fast and fully on-chain dapps runningon the Internet Computer blockchain, the only true World Computer that enables a end-to-end  decentralization.
                  </motion.p>

                  <motion.p
                    className="mb-10 md:mb-16 flex flex-col md:flex-row gap-8"
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

          <div className="container-10 flex flex-col md:flex-row gap-8 text-black">
            <AnimateSpawn
              className="md:w-1/3"
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
              className="md:w-1/3"
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
              className="md:w-1/3"
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
                className="bg-white rounded-xl px-6 py-8 flex flex-col gap-4 justify-between"
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
                className="bg-white rounded-xl px-6 py-8 flex flex-col gap-4 justify-between"
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
                className="bg-white rounded-xl px-6 py-8 flex flex-col gap-4 justify-between"
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
        <section id="learn-more">
          <AnimateSpawn
            className="md:container-12 pt-20 md:py-30"
            variants={transitions.container}
          >
            <div className="relative rounded-xl bg-[#0A0023] flex flex-col md:flex-row gap-8 justify-between items-start">
              <svg className="absolute top-16 md:top-12 -right-12 md:right-0 w-full md:w-2/3 z-1 opacity-75 mask-fade-bottom" viewBox="0 0 922 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M951.484 224.838C951.484 101.049 847.721 0.336914 720.385 0.336914C667.298 0.336914 609.49 27.5577 548.248 81.2233C519.295 106.595 494.187 133.733 475.336 155.556C409.142 81.8176 320.367 0.336914 231.773 0.336914C124.691 0.336914 31.3106 74.4883 7.0121 172.74C7.04511 172.658 7.07812 172.542 7.11114 172.427C7.07812 172.542 7.04511 172.641 7.0121 172.74C2.79512 189.785 0.666584 207.279 0.673356 224.838C0.673356 348.627 102.787 449.339 230.123 449.339C283.21 449.339 342.668 422.118 403.91 368.452C432.863 343.081 457.971 315.942 476.822 294.12C543.015 367.858 631.807 449.339 720.401 449.339C827.483 449.339 920.864 375.187 945.162 276.952C949.305 260.213 951.501 242.765 951.501 224.854L951.484 224.838ZM493.098 155.325C514.739 130.911 536.198 109.352 556.964 91.1608C615.729 39.6576 670.715 13.5429 720.385 13.5429C840.54 13.5429 938.279 108.328 938.279 224.838C938.279 241.18 936.314 257.506 932.419 273.386C931.791 275.219 923.785 297.14 900.973 318.451C871.342 346.134 831.18 360.182 781.593 360.199C834.927 337.022 872.234 284.958 872.234 224.838C872.234 143.11 804.109 76.6342 720.385 76.6342C687.75 76.6342 647.803 97.1529 601.599 137.646C580.817 155.87 559.77 177.296 537.551 202.9L528.836 212.903L484.184 165.147L493.098 155.342V155.325ZM414.111 227.05C396.481 247.981 371.06 276.506 341.843 302.109C287.402 349.832 252.011 359.836 231.773 359.836C155.411 359.836 93.1298 299.27 93.1298 224.838C93.1298 150.406 151.07 91.3093 227.498 90.8471C230.271 90.8471 236.938 90.8471 246.12 92.284C279.355 98.8794 316.521 130.052 337.766 149.498C354.85 165.147 385.801 197.171 414.095 227.033L414.111 227.05ZM459.06 294.351C437.403 318.765 415.96 340.324 395.194 358.515C337.254 409.292 280.172 436.133 230.123 436.133C172.1 436.133 117.692 414.095 76.8868 374.081C36.2462 334.233 13.8791 281.227 13.8791 224.838C13.8791 208.495 15.8599 192.153 19.7391 176.29C20.3994 174.391 28.4053 152.502 51.1852 131.224C80.8155 103.541 120.977 89.4935 170.565 89.477C117.23 112.653 79.9241 164.718 79.9241 224.838C79.9241 306.566 148.049 373.042 231.773 373.042C264.408 373.042 304.355 352.523 350.559 312.03C371.341 293.806 392.388 272.379 414.606 246.776L423.306 236.756C423.306 236.756 467.297 283.802 467.776 284.331L459.043 294.351H459.06ZM538.047 222.626C555.676 201.694 581.097 173.17 610.315 147.567C664.755 99.8437 700.147 89.8402 720.385 89.8402C796.747 89.8402 859.028 150.406 859.028 224.838C859.028 299.27 796.813 359.373 720.385 359.836C717.611 359.836 714.26 359.555 710.183 358.829C710.216 358.829 710.233 358.845 710.266 358.862C670.847 343.757 635.637 319.64 614.376 300.178C597.291 284.529 566.34 252.504 538.03 222.642L538.047 222.626ZM945.063 277.183C945.096 277.1 945.113 277.001 945.146 276.935C945.129 277.001 945.096 277.1 945.063 277.183Z" fill="url(#paint0_linear_777_2808)" fill-opacity="0.5"/>
                <defs>
                  <linearGradient id="paint0_linear_777_2808" x1="335" y1="738" x2="89.5001" y2="-13.9999" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#13033F"/>
                    <stop offset="0.24376" stop-color="#0A0123"/>
                    <stop offset="0.714988" stop-color="#9163BF"/>
                    <stop offset="0.839988" stop-color="#FFB1C5"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="relative px-6 py-10 md:p-12 text-white md:w-1/2 max-w-[40rem] z-1">
                <motion.h2
                  className="tw-heading-alt-2 mb-6"
                  variants={transitions.item}
                >
                  Learn more about the Internet Computer
                </motion.h2>
                <motion.p
                  className="tw-lead-sm md:tw-lead-sm mb-12"
                  variants={transitions.item}
                >
                  This is a short paragraph that explains the topic in further detail. This is a short paragraph that explains the topic in further detail. This is a short paragraph that explains the topic in further detail. 
                </motion.p>
                <div className="md:w-6/10">
                  <motion.p
                    className="flex flex-col sm:flex-row items-start md:items-center gap-6 md:gap-8 mb-0"
                    variants={transitions.item}
                  >
                    <Link className="button-primary normal-case bg-[#AE9EFF] hover:bg-white text-black hover:text-black" href="/library">
                      Explore Resources
                    </Link>
                  </motion.p>
                </div>
              </div>
              <motion.img
                src="/img/ethdenver/teaser-decks.webp"
                alt=""
                className="relative w-4/5 md:w-1/2 max-w-lg px-8 md:px-10 self-end z-1"
                variants={transitions.item}
              />
            </div>
          </AnimateSpawn>
        </section>
        
        <div className="pb-40">
          <BeAPioneer
            id="start-building"
            title="Be a pioneer of Web3"
            body="Metaprotocols leverage Chain Fusion to offer decentralized cross-chain infrastructure enabling the transfer and creation of new assets on Bitcoin."
            cta="Build real Web3"
            ctaLink="/docs/current/home"
            cards={[
              {
                title: "Dev Forum",
                body: "Engage with the ICP community to shape future features, propose new ideas, and ask questions. ",
                link: "https://forum.dfinity.org",
              },
              {
                title: "Dev Docs",
                body: "Metaprotocols leverage Chain Fusion to offer decentralized cross-chain infrastructure enabling the transfer and creation of new assets on Bitcoin.",
                link: "/docs/current/home",
              },
              {
                title: "Sample Code",
                body: "From a simple DEX, to on-chain encrypted storage, NFT minting, and a basic DAO, learn how to build on the Internet Computer.",
                link: "/samples",
              },
              {
                title: "Motoko Playground",
                body: "Play around with Motoko, the native language of the Internet Computer, right in the browser without having to download the SDK.",
                link: "https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/",
              },
            ]}
          />
        </div>


        <IntraPageNav
          hasHome={false}
          links={[
            { text: "Intro", to: "#intro" },
            { text: "Bounties", to: "#bounties" },
            { text: "Agenda", to: "#agenda" },
            // { text: "Topics", to: "#topics" },
            { text: "Ecosystem", to: "#ecosystem" },
            { text: "Internet Identity", to: "#internet-identity" },
            { text: "Blockchain Singularity", to: "#learn-more" },
            { text: "Start building", to: "#start-building" },
          ]}
          label="Scroll to section"
        ></IntraPageNav>
      </main>
    </Layout>
  );
}

export default EthDenverPage;
