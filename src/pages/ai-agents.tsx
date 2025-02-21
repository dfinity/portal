import React, { useRef } from "react";

import AnimateSpawn from "../components/Common/AnimateSpawn";
import CodeBlockString from "../theme/CodeBlock/Content/String";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LinkCardsSection from "../components/Common/LinkCardsSection";
// import youtubeData from "@site/.docusaurus/youtube/default/youtube.json";
import { NewsCard } from "../components/NewsPage/Cards";
import ShareMeta from "../components/Common/ShareMeta";
import VideoCard from "../components/Common/VideoCard/index";
import clsx from "clsx";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import { CodeSnippetPrompting } from "../components/Ai/CodeSnippetPrompting";
import { CodeSnippetMultipleMessages } from "../components/Ai/CodeSnippetMultipleMessages";
import EcosystemSection from "../components/Ai/EcosystemSection";
import RoadmapIgnition from "../components/Ai/RoadmapIgnition";
import RoadmapVortex from "../components/Ai/RoadmapVortex";

interface TrustCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: React.ReactNode;
  link?: string;
  linkText?: string;
}

const MotionLink = motion(Link);

const trustCards = [
  {
    imageSrc: "/img/decentralized-ai/trust-icon-1.svg",
    imageAlt: "Tamper-proofness icon",
    title: "Tamper-proof",
    description:
      "Computation is replicated and validated by consensus across nodes, eliminating single points of trust. You can trust that agents are only doing what the code allows, and that they're using the AI models you expect.",
  },
  {
    imageSrc: "/img/decentralized-ai/trust-icon-7.svg",
    imageAlt: "Unstoppability icon",
    title: "Manage Digital Assets",
    description:
      "AI agents on the Internet Computer are tamper-proof, so they can safely perform financial transactions and manage financial assets.",
  },
  {
    imageSrc: "/img/decentralized-ai/trust-icon-6.svg",
    imageAlt: "Autonomy icon",
    title: "No vendor lock-in",
    description:
      "The Internet Computer is fully open-source, run by independent data centers around the world. There's no single entity you have to depend on or trust to run your AI agents.",
    link: "https://github.com/dfinity/ic",
    linkText: "Learn more",
  },
  {
    imageSrc: "/img/decentralized-ai/trust-icon-4.svg",
    imageAlt: "Scalability icon",
    title: "Scalable",
    description:
      "Canisters on the Internet Computer can store over 500GiB of data, making it ideal for running RAG agents.",
  },
  {
    imageSrc: "/img/decentralized-ai/trust-icon-8.svg",
    imageAlt: "Scalability icon",
    title: "Tokenizable",
    description:
      "AI agents can be tokenized and governed by DAOs, allowing decentralized ownership and collective decision-making.",
  },
  {
    imageSrc: "/img/decentralized-ai/trust-icon-5.svg",
    imageAlt: "Expressiveness icon",
    title: "Expressive",
    description:
      "The Internet Computer natively runs WebAssembly that has a growing ecosystem of languages and tools. Write your AI agents in Motoko, Rust, Typescript, Python, C++, and more.",
  },
];

const TrustCard: React.FC<TrustCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  link,
  linkText,
}) => (
  <div className="flex flex-col text-white">
    <img src={imageSrc} alt={imageAlt} className="w-3/10 mr-auto ml-0" />
    <div className="mt-6 tw-heading-5 md:tw-heading-4 font-bold leading-8">
      {title}
    </div>
    {link && linkText ? (
      <div className="mt-2 text-base leading-6 font-[450]">
        {description}
        <br />
        <Link
          className="text-white underline hover:no-underline hover:text-white hover:opacity-80 duration-200 ease-in-out"
          to={link}
          target="_blank"
        >
          {linkText}
        </Link>
      </div>
    ) : (
      <div className="mt-2 text-base leading-6 font-[450]">{description}</div>
    )}
  </div>
);

const RoadMapList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <ul className="list-none m-0 p-0 text-left flex flex-col items-start">
      {items.map((item, index) => (
        <li key={index} className="flex items-center my-2">
          <img
            src={"/img/decentralized-ai/icon-check.svg"}
            alt=""
            className="h-6 w-6 mr-2 select-none"
          />
          {item}
        </li>
      ))}
    </ul>
  );
};

function AIPage() {
  const fontLoaded = useFontsLoaded();
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="The home of sovereign AI agents"
      description="Deploy AI agents with just a few lines of code. Secure. Sovereign. Only on the Internet Computer."
    >
      <ShareMeta image="/img/shareImages/share-ai-agents.webp"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <section
          className="text-white pt-20 mb-[10vw] lg:mb-3"
          style={{
            background: "linear-gradient(54deg, #3B00B9 0%, #D38ED7 153.06%)",
          }}
          ref={heroRef}
        >
          <div className="container-10 pt-20 pb-12 sm:pb-40 md:pb-40 md:pt-36 relative z-10">
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-3/5 "
              variants={transitions.item}
            >
              The home of sovereign AI agents
            </motion.h1>
            <div className="relative  md:w-5/10">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Deploy AI agents with just a few lines of code. Secure.
                Sovereign. Only on the Internet Computer.
              </motion.p>
            </div>
          </div>
          <div className="container-12 relative z-1 h-[200px] md:h-0 pointer-events-none">
            <div className="absolute w-10/12 sm:w-5/12 left-1/2 translate-y-1/2 -translate-x-[50%] bottom-1/3 md:left-0 md:absolute md:w-5/12 md:bottom-0 md:translate-x-[130%] md:translate-y-2/12">
              <img
                src="/img/ai/ai-agents.svg"
                alt="Decentralized AI"
                className="w-full max-w-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <AnimateSpawn
          el={motion.section}
          variants={transitions.container}
          className="mt-24 md:mt-40"
        >
          <div className="container-10 mb-10">
            <div className="">
              <div className="w-full mb-12 md:mb-24">
                <motion.h3
                  className="tw-heading-4 md:tw-heading-60 text-gradient"
                  variants={transitions.item}
                >
                  Start building
                </motion.h3>
                <motion.p
                  className="tw-paragraph md:tw-lead-sm mb-6 text-black/60"
                  variants={transitions.item}
                >
                  The Internet Computer allows you to build and run software
                  services that are tamper-proof, giving you true ownership and
                  digital sovereignty. We call them canisters. You can now
                  access LLMs from within these canisters with just a few lines
                  of code to build AI agents that you truly own and control.
                </motion.p>
                <p className="flex flex-col md:flex-row align-center gap-6">
                  <MotionLink
                    variants={transitions.item}
                    className="button-primary"
                    href="https://vgjrt-uyaaa-aaaal-qsiaq-cai.icp0.io/"
                  >
                    Live demo
                  </MotionLink>
                  <MotionLink
                    variants={transitions.item}
                    className="link-primary link-with-icon"
                    href="https://forum.dfinity.org/t/introducing-the-llm-canister-deploy-ai-agents-with-a-few-lines-of-code/41424"
                  >
                    Learn more
                    <LinkArrowRight />
                  </MotionLink>
                </p>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-8">
                <div className="md:w-5/10">
                  <motion.h4
                    className="tw-heading-6 md:tw-heading-5"
                    variants={transitions.item}
                  >
                    Prompting
                  </motion.h4>
                  <CodeSnippetPrompting />
                </div>
                <div className="md:w-5/10">
                  <motion.h4
                    className="tw-heading-6 md:tw-heading-5"
                    variants={transitions.item}
                  >
                    Chatting with multiple messages
                  </motion.h4>
                  <CodeSnippetMultipleMessages />{" "}
                </div>
              </div>
            </div>

            <AnimateSpawn
              className="container-10 mt-12 md:mt-16 mb-5 !p-0"
              el={motion.section}
              variants={transitions.container}
            >
              <div id="demo" className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <motion.div
                  variants={transitions.item}
                  className="col-span-1 md:col-span-2 mb-10"
                >
                  <VideoCard
                    image="/img/ai/1891463634074718494.webp"
                    title="Cross-chain AI Agents using Chain Fusion!"
                    label="Demo"
                    link={`https://www.youtube.com/watch?v=SPkgLwfJ4PY`}
                    description="Powered by Chain Fusion, AI agents built with Eliza can seamlessly create, sign, and execute transactions with Ethereum wallets on the Internet Computer (ICP)."
                  />
                </motion.div>
              </div>
            </AnimateSpawn>
          </div>
        </AnimateSpawn>

        <EcosystemSection id="ecosystem" />

        <AnimateSpawn variants={transitions.container}>
          <section className="bg-infinite text-white pt-6 pb-20" ref={heroRef}>
            <article className="container-10 mt-12 md:mt-20">
              <h3 className="tw-heading-4 md:tw-heading-60  text-left md:text-center text-gradient-purple mb-0 md:w-5/10 md:mx-auto">
                Making AI agents trustworthy
              </h3>
              <aside className="container-10 mt-12 md:mt-32 md:flex md:items-center !pl-0	!pr-0">
                <div className="md:w-1/3">
                  <motion.p className="text-2xl mb-0 ">
                    AI agents are a growing paradigm in software that help
                    perform complex tasks using simple natural language. The
                    ecosystem is evolving rapidly. But rather than a future
                    where AI agents run on proprietary platforms where companies
                    lock you in, compromise your data, and monitor your digital
                    life, we believe there's a better alternative. The Internet
                    Computer is completely open source, powered by over 130
                    independent data centers around the world, and is uniquely
                    positioned to host AI agents.
                  </motion.p>
                </div>
                <div className="md:w-2/3 relative mt-6  md:mt-64 md:mb-64">
                  <div className="pointer-events-none md:absolute w-full  md:-right-24 md:top-1/2  md:-translate-y-1/2">
                    <motion.div
                      className="absolute blob blob-white blob-md md:blob-lg blob-x-8 md:blob-x-9 blob-y-15 -z-1"
                      variants={transitions.fadeIn}
                    ></motion.div>
                    <motion.img
                      variants={transitions.fadeIn}
                      src="/img/decentralized-ai/trust-img-2.webp"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </aside>
              <aside className="mt-20 md:mt-40 grid grid-cols-1 md:grid-cols-3 gap-x-[4.5rem] gap-y-20">
                {trustCards.map((card, index) => (
                  <TrustCard key={index} {...card} />
                ))}
              </aside>
            </article>
          </section>
        </AnimateSpawn>

        <section className="container-10 mt-12 md:mt-44 md:mb-20">
          <AnimateSpawn variants={transitions.container}>
            <motion.h2 className="tw-heading-4 md:tw-heading-60 mb-6">
              Sovereign AI roadmap
            </motion.h2>

            <div className="flex md:flex-row flex-col gap-6">
              <div className="md:w-1/2">
                <RoadmapIgnition />
              </div>
              <div className="md:w-1/2">
                <RoadmapVortex />
              </div>
            </div>
          </AnimateSpawn>
        </section>

        <LinkCardsSection
          className="mb-20 md:mb-30 mt-30 md:mt-40"
          title="Explore AI on ICP"
          cards={[
            {
              label: "Start building DeAI",
              href: "/docs/current/developer-docs/ai/overview",
            },
            {
              label: "Apply to DeAI Grants",
              href: "https://dfinity.org/grants",
            },
            {
              label: "Contribute to AI Agent Frameworks",
              href: "https://github.com/dfinity/grant-rfps/issues/62",
            },
            {
              label: "Learn about LLM Canister",
              href: "https://forum.dfinity.org/t/introducing-the-llm-canister-deploy-ai-agents-with-a-few-lines-of-code/41424",
            },
            {
              label: "Join the DeAI Working Group",
              href: "https://forum.dfinity.org/t/technical-working-group-deai/24621/31",
            },
            {
              label: "Explore AI Products on ICP",
              href: "https://internetcomputer.org/ecosystem?tag=AI",
            },
          ]}
        />
      </main>
    </Layout>
  );
}

export default AIPage;
