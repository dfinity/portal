import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { Faq, FaqSection } from "../components/Common/Faq/Faq";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LinkCardsSection from "../components/Common/LinkCardsSection";
import ShareMeta from "../components/Common/ShareMeta";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import clsx from "clsx";
import { useScrollSpyMenu } from "../utils/use-scroll-spy-menu";
import { ArrowIconRight } from "../components/RoadmapPage/Overlay";

const users = [
  {
    icon: "img/internet-identity/users-1.svg",
    title: "Google Integration",
    description: (
      <>
        Internet Identity 2.0 includes the option for users to use their Google
        Account as an authentication option. This makes Internet Identity
        accessible to an even wider audience.
      </>
    ),
  },
  {
    icon: "img/internet-identity/users-2.svg",
    title: "Secure access to 100s of dapps",
    description: (
      <>
        Access{" "}
        <Link
          href="https://internetcomputer.org/ecosystem?tag=Internet+Identity"
          className="link-primary-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          100s of next generation fully onchain dapps
        </Link>{" "}
        built end-to-end on the Internet Computer blockchain without needing to
        create usernames and passwords. Secure and seamless authentication and
        session management powered by passkeys and WebAuthn.
      </>
    ),
  },
  {
    icon: "img/internet-identity/users-3.svg",
    title: "Browser-based & walletless",
    description:
      "No crypto wallet to download. No lost passwords or seedphrases. Get setup in \
       seconds and gain fast and easy access to dapps using only the browser in \
       your phone or laptop. Your signing keys are permanently stored in secure \
       hardware and controlled by your biometrics.",
  },
];

const developers = [
  {
    icon: "img/internet-identity/features-1.svg",
    title: "A complete dev platform",
    description: (
      <>
        Easily gate access to experiences without having to collect and store
        sensitive personal information. For developers, the availability of{" "}
        <Link
          href="https://github.com/dfinity/verifiable-credentials-sdk"
          className="link-primary-light"
          target="_blank"
          rel="noopener noreferrer"
        >
          SDKs
        </Link>
        ,{" "}
        <Link
          href="/docs/building-apps/network-features/verifiable-credentials/overview"
          className="link-primary-light"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </Link>
        ,{" "}
        <Link
          href="https://github.com/dfinity/verifiable-credentials-sdk/tree/main?tab=readme-ov-file#projects"
          className="link-primary-light"
          target="_blank"
          rel="noopener noreferrer"
        >
          tooling
        </Link>
        , and{" "}
        <Link
          href="https://github.com/dfinity/vc-playground"
          className="link-primary-light"
          target="_blank"
          rel="noopener noreferrer"
        >
          open source code
        </Link>{" "}
        increases productivity when building credential sharing dapps.
      </>
    ),
  },
  {
    icon: "img/internet-identity/platforms-1.svg",
    title: "Used by Caffeine",
    description: (
      <>
        Internet Identity 2.0 is the sign in option for{" "}
        <Link
          href="https://caffeine.ai"
          className="link-primary-light"
          target="_blank"
          rel="noopener noreferrer"
        >
          Caffeine
        </Link>
        , the AI platform that builds and deploys web apps from natural language
        prompts.
      </>
    ),
  },
  {
    icon: "img/internet-identity/features-2.svg",
    title: "Build fully onchain dapps",
    description:
      "Build the next generation of secure, tamperproof and fully-on chain Web3 applications on the Internet Computer.\
       Dynamic Web3 experiences (SocialFi, GameFi) built with smart contracts require a new approach to secure \
       authenticated sessions, which Internet Identity provides.",
  },
  {
    icon: "img/internet-identity/features-3.svg",
    title: "Avoid app store blocking",
    description: (
      <>
        Internet Identity makes it possible to build great Web3 applications
        that users access with just their browsers. Your dapp can securely hold
        and interact with tokens and smart contracts across chains (thanks to{" "}
        <Link
          href="/chainfusion"
          className="link-primary-light"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chain Fusion
        </Link>
        ) with no app store policies to worry about.
      </>
    ),
  },
  {
    icon: "img/internet-identity/features-4.svg",
    title: "Existing user base",
    description:
      "Plug into a user base of 2.5 million internet identities and 70,000 monthly active unique users.",
  },

  {
    icon: "img/internet-identity/features-6.svg",
    title: "Built with WebAuthn",
    description:
      "WebAuthn significantly increases user convenience while reducing the risk of phishing and credential theft. It enables passwordless authentication through biometric data or hardware keys.",
  },
];

const issuers = [
  {
    icon: "img/internet-identity/issuers-1.svg",
    title: "Expand your audience",
    description:
      "Grow your audience in a platform that is trusted by 100,000 monthly active users and has registered 2.5 million internet identities.",
  },
  {
    icon: "img/internet-identity/issuers-2.svg",
    title: "A platform built for privacy",
    description:
      "Issue reusable credentials to your users, without using global IDs. Avoid the privacy issues associated with issuing credentials to globally unique IDs (which is typical of offline wallet solutions).",
  },
  {
    icon: "img/internet-identity/issuers-3.svg",
    title: "Versatile",
    description:
      "Internet Identity's verifiable credentials support a broad range of scenarios, including academic credentials, KYC verification, age verification and proof of employment.",
  },
];

const platforms = [
  {
    icon: "img/internet-identity/platforms-1.svg",
    title: "Self-sovereign identity stack",
    description:
      "Users control their identities and data. The Internet Computer offers a faster, lower cost, and more programmable decentralized public key infrastructure (DPKI) than other blockchains. With Internet Identity's tooling, you can issue, share, and consume verifiable credentials.",
  },
  {
    icon: "img/internet-identity/platforms-3.svg",
    title: "Mobile passkeys",
    description:
      "Internet Identity enables users to store private keys on the secure hardware of their trusted devices. To authorize secure interactions, users simply unlock their devices. Whether you are on your mobile phone or desktop, you can easily use your secure identity.",
  },
  {
    icon: "img/internet-identity/platforms-4.svg",
    title: "Privacy-first",
    description:
      "For each user and every dapp, Internet Identity creates a different set of authentication keys. This way, a user cannot be tracked across dapps. When a user selectively discloses an attribute between dapps, II transforms the credential to maintain the user's privacy.",
  },
];

interface FeatureProps {
  icon: string;
  title: string;
  description: React.ReactNode;
  fullW?: boolean;
}

const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  fullW,
}) => (
  <div className="flex flex-col items-start text-left">
    <div className="flex items-start">
      <img loading="lazy" src={icon} className="w-6 aspect-square" />
    </div>
    <div
      className={`tw-heading-5 md:tw-heading-4 font-bold leading-8 mt-3 md:mt-6 ${
        fullW ? "" : "md:w-8/10"
      }`}
    >
      {title}
    </div>
    <p className="mt-2 md:mt-4 text-base leading-6 font-[450]">{description}</p>
  </div>
);

const ContentCard: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className }) => {
  return (
    <div className="flex flex-col gap-6 content-card-with-id" id={id}>
      {children}
    </div>
  );
};

const StickySectionNav: React.FC<{
  className?: string;
  onItemClick: (e, index: number) => void;
  highlightedIndex: number;
  title: React.ReactNode;
  items: string[];
}> = ({ className, highlightedIndex, onItemClick, items, title }) => {
  return <div className={clsx("sticky top-10", className)}>{title}</div>;
};

function InternetIdentityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDark = useDarkHeaderInHero(heroRef);

  type ContentCardType = {
    title: string;
    id: string;
  };
  const [content, setContent] = React.useState<ContentCardType[]>([]);
  const highlight = useScrollSpyMenu(".content-card-with-id");

  function onItemClick(e, index: number) {
    const target = document.querySelectorAll(`.content-card-with-id`)[index];

    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 115;

      location.hash = content[index].id;

      window.scrollTo({ top: y, behavior: "smooth" });

      e.preventDefault();
      return false;
    }
  }

  useEffect(() => {
    const cards = document.querySelectorAll(".content-card-with-id");
    const content: {
      title: string;
      id: string;
    }[] = [];
    for (const card of Array.from(cards)) {
      const id = card.id;
      const title = card.querySelector("h3")?.textContent;
      content.push({ title, id });
    }
    setContent(content);
  }, []);

  return (
    <Layout
      title="Secure, seamless and, privacy-preserving digital identity"
      description="Internet Identity is a self-sovereign single sign-on solution for dapps."
    >
      <ShareMeta image="/img/shareImages/share-internet-identity.webp"></ShareMeta>

      <main
        className="text-black relative "
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <section className="bg-infinite text-white pt-20" ref={heroRef}>
          {bgDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

          <div className="container-10 pt-20 pb-12 sm:pb-0 md:pb-40 md:pt-36 relative ">
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-8/10"
              variants={transitions.item}
            >
              Secure, seamless, and privacy-preserving digital identity
            </motion.h1>
            <div className="relative  md:w-5/10">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Internet Identity is a self-sovereign single sign-on solution
                for dapps.
              </motion.p>
              <Link
                className="mt-3 md:mt-6 link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                href="https://id.ai/"
              >
                <LinkArrowRight />
                <span>Upgrade to Internet Identity 2.0</span>
              </Link>
              <Link
                className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                href="https://identity.internetcomputer.org/"
              >
                <LinkArrowRight />
                <span>Launch legacy Internet Identity 1.0</span>
              </Link>
            </div>
          </div>
          <div className="container-12 relative">
            <div className="text-center md:w-[45%] relative md:absolute top-0 sm:top-40 md:top-0 translate-y-30 sm:translate-y-10 md:-translate-y-8/12 right-0 -mt-36 md:-mt-30">
              <img
                src="/img/internet-identity/internet-identity-hero.webp"
                alt="Start building on Internet Identity"
                className="w-full max-w-sm sm:max-w-[720px] md:max-w-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="container-10 relative mt-40 sm:mt-52 md:mt-60">
          {/* <AnimateSpawn
            className="mt-16 md:mt-40 "
            variants={transitions.container}
          >
            <motion.h4 className="md:w-7/10 tw-heading-4 md:tw-heading-60 text-gradient">
              A versatile solution for each stage of the digital identity
              lifecycle
            </motion.h4>
          </AnimateSpawn> */}
          {/* USERS */}
          <AnimateSpawn
            className="md:flex md:items-center mt-12 md:mt-40"
            variants={transitions.container}
          >
            <div className="md:w-1/2">
              <motion.h3 className="tw-heading-4 md:tw-heading-60">
                Access dapps quickly and securely{" "}
              </motion.h3>
              <Link className="button-primary mt-6" href="https://id.ai/">
                Launch Internet Identity 2.0
              </Link>
              <Link
                className="button-primary mt-2"
                href="https://identity.internetcomputer.org/ "
              >
                Launch Internet Identity 1.0
              </Link>
            </div>
            <div className="md:w-1/2 relative mt-6  md:mt-64 md:mb-64">
              <div className="pointer-events-none md:absolute w-full  md:-right-24 md:top-1/2  md:-translate-y-1/2">
                <motion.img
                  variants={transitions.fadeIn}
                  src="/img/internet-identity/ecosystem.webp"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimateSpawn>
          <AnimateSpawn
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-y-10 md:gap-x-20 text-black mb-16 md:mb-40"
            variants={transitions.container}
          >
            {users.map((user, index) => (
              <Feature key={index} {...user} />
            ))}
          </AnimateSpawn>
        </section>
        {/* DEVELOPERS */}
        <section className="bg-infinite text-white">
          <div className="container-10 relative">
            <AnimateSpawn
              className="md:flex md:items-center "
              variants={transitions.container}
            >
              <div className="md:w-[55%]  pt-16 md:pt-40 ">
                <motion.h3 className="tw-heading-4 md:tw-heading-60">
                  Add secure authentication to your dapps
                </motion.h3>
                <motion.p className="text-2xl mb-0 font-bold md:w-9/10">
                  Developers should focus on building dapps, not identity
                  solutions.
                </motion.p>
                <Link
                  className="mt-3 md:mt-6 link-primary-light link-with-icon "
                  href="/docs/building-apps/authentication/integrate-internet-identity"
                >
                  <LinkArrowRight />
                  <span>Start Building</span>
                </Link>
              </div>
              <div className="md:w-[45%] relative">
                <div className="pointer-events-none md:absolute w-[110%] md:translate-x-1/12 md:-translate-y-5/12 ">
                  <motion.img
                    variants={transitions.fadeIn}
                    src="/img/internet-identity/developers.webp"
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </AnimateSpawn>

            <AnimateSpawn
              className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-y-10 md:gap-x-20 text-white pb-16 md:pb-40"
              variants={transitions.container}
            >
              {developers.map((developer, index) => (
                <Feature key={index} {...developer} />
              ))}
            </AnimateSpawn>
          </div>
        </section>
        {/* ISSUERS */}
        {/* <section className="text-black">
          <div className="container-10 relative">
            <AnimateSpawn
              className="md:flex md:items-center "
              variants={transitions.container}
            >
              <div className="md:w-1/2  pt-16 md:pt-40 ">
                <motion.h3 className="tw-heading-4 md:tw-heading-60">
                  Issue verifiable credentials privately and efficiently
                </motion.h3>
                <motion.p className="text-2xl mb-0 font-bold md:w-9/10">
                  Use Internet Identity's Issuer APIs and SDKs to build
                  credential issuing dapps.
                </motion.p>
                <Link
                  className="button-primary mt-6"
                  href="/docs/building-apps/network-features/verifiable-credentials/issuer"
                >
                  Become an Issuer
                </Link>
              </div>
              <div className="md:w-1/2 relative">
                <div className="pointer-events-none -translate-x-[4%] translate-y-1/12 md:absolute w-[110%] md:translate-x-1/12 md:-translate-y-5/12 ">
                  <motion.img
                    variants={transitions.fadeIn}
                    src="/img/internet-identity/issuers.webp"
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </AnimateSpawn>

            <AnimateSpawn
              className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-y-10 md:gap-x-20 text-black pb-16 md:pb-40"
              variants={transitions.container}
            >
              {issuers.map((issuer, index) => (
                <Feature key={index} {...issuer} />
              ))}
            </AnimateSpawn>
          </div>
        </section> */}
        {/* A platform designed  */}
        <section className="bg-infinite text-white">
          <div className="container-10 relative">
            <AnimateSpawn
              className="md:flex md:items-center "
              variants={transitions.container}
            >
              <div className="md:w-1/2  pt-16 md:pt-40 ">
                <motion.h3 className="tw-heading-4 md:tw-heading-60">
                  Explore Internet Computer's innovative identity platform
                </motion.h3>
                <motion.p className="text-2xl mb-0 font-bold md:w-9/10">
                  Internet Identity contributors include world-leading identity
                  scientists having published more than 100 papers on verifiable
                  credentials & attribute sharing, privacy-enhancing
                  authentication, and zero knowledge proofs.
                </motion.p>
                <Link
                  className="button-outline-white mt-6"
                  href="https://www.youtube.com/watch?v=9eUTcCP_ELM"
                >
                  Learn More
                </Link>
              </div>
              <div className="md:w-1/2 relative">
                <div className="pointer-events-none translate-y-1/12 md:absolute w-[110%] md:translate-x-1/12 md:-translate-y-5/12 ">
                  <motion.img
                    variants={transitions.fadeIn}
                    src="/img/internet-identity/platform.webp"
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </AnimateSpawn>

            <AnimateSpawn
              className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-y-10 md:gap-x-20 text-white pb-16 md:pb-40"
              variants={transitions.container}
            >
              {platforms.map((platform, index) => (
                <Feature key={index} {...platform} fullW />
              ))}
            </AnimateSpawn>
          </div>
        </section>
        <section className="container-12 pt-20 md:pt-40">
          <div className="md:flex">
            <div className="flex-[5]">
              <StickySectionNav
                items={content.map((c) => c.title)}
                className="hidden md:block pr-10"
                highlightedIndex={highlight.highlightedIndex}
                onItemClick={onItemClick}
                title={
                  <h2 className="tw-heading-4 md:tw-heading-60 mb-4 text-gradient">
                    How it works
                  </h2>
                }
              ></StickySectionNav>
            </div>
            <div className="flex-[7]">
              <div
                className="lg:pr-[calc(1/7*100%)] space-y-10 md:space-y-20"
                ref={(el) => (highlight.elRef.current = el)}
              >
                <ContentCard
                  className="content-card-with-id"
                  id="authentication-and-session-management"
                >
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Authentication and session management
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Internet Computer allows anyone to develop and deploy fully
                    onchain web applications. With only the browser, users can
                    operate any dapp and perform transactions beyond the mere
                    transfer of tokens. This design has the following
                    implications:
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    <ul>
                      <li>
                        Since IC is a permissionless blockchain, dapps cannot be
                        trusted.
                      </li>
                      <li>
                        Dapps must make authenticated calls to their own
                        canisters as well as shared infrastructure canisters,
                        for instance the{" "}
                        <Link href="/docs/defi/token-ledgers/usage/icp_ledger_usage">
                          IC Ledger canister
                        </Link>
                        .
                      </li>
                    </ul>
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    As a result, Internet Computer requires a digital identity
                    layer that is self-sovereign and protects users from
                    malicious dapps. This layer is Internet Identity, a
                    trustless smart contract that provides:
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    <ul>
                      <li>
                        Secure and private interactions. Internet Identity
                        derives a new identity for each dapp instead of issuing
                        a single global identity. This design protects users
                        from malicious dapps and makes interactions harder to
                        trace.
                      </li>
                      <li>
                        Cryptography-based session management. When a user
                        connects to a dapp, it creates a new session
                        public/private key pair, which Internet Identity
                        certifies with a combination of WebAuthn and threshold
                        signing.
                      </li>
                    </ul>
                  </p>
                  <img
                    src="/img/internet-identity/authentication2.webp"
                    loading="lazy"
                  />
                </ContentCard>
              </div>
            </div>
          </div>
        </section>
        <section className="container-12 mt-16 md:mt-40 mb-16 md:mb-40">
          <FaqSection
            contentClassName="md:mr-1/12"
            id="participate"
            title={
              <div className="container-10 mb-12 md:mb-20">
                <h2 className="tw-heading-3 mb-6 md:tw-heading-60">FAQ</h2>
                <img src="/img/internet-identity/faq.webp" loading="lazy" />
              </div>
            }
          >
            <Faq title="What makes Internet Identity secure and easy to use?">
              <p>
                Authentication is backed by a TPM chip on your device, which can
                safely store private keys and sign operations, instead of
                relying on passwords and seedphrases. Internet Identity builds
                on the success of WebAuthn to deliver a highly secure and
                user-friendly authentication system.
              </p>
            </Faq>
            <Faq title="What makes Internet Identity privacy-preserving?">
              <p>
                Internet Identity derives a new principle (address) for each
                dapp instead of using a single global principle. This design
                protects you from malicious dapps and makes financial
                transactions harder to trace. Internet Identity also extends its
                privacy-preserving design to verifiable credentials. The relying
                party forwards the credential request to the issuer using
                Internet Identity as the proxy. To guarantee privacy, Internet
                Identity creates a new principle alias, and using threshold
                signatures, signs two attestations. These attestations prove
                that the alias can be used instead of the different principles
                the user holds with the relying party and the issuer.
              </p>
            </Faq>
            <Faq title="How does Internet Identity compare to other Web3 authentication tools?">
              <p>
                On most blockchains, you need to authenticate every time you
                make a request. The Internet Computer enables you to temporarily
                and securely delegate authentication to the dapp after you
                connect. This is made possible by creating sessions every time
                you use an app and leverages chain-key cryptography.
              </p>
              <Link
                href="https://medium.com/dfinity/chain-key-technology-one-public-key-for-the-internet-computer-6a3644901e28"
                className="link-primary link-with-icon !font-bold no-underline hover:!text-black mt-6"
              >
                <LinkArrowUpRight /> Blog:  Chain-key cryptography{" "}
              </Link>
            </Faq>
          </FaqSection>
        </section>
      </main>
    </Layout>
  );
}

export default InternetIdentityPage;
