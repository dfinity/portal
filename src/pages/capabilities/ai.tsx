import React, { useRef } from "react";
import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import { css } from "@site/src/utils/dummy-css";
import LightHeroStyles from "@site/src/components/Common/LightHeroStyles";
import VideoCard, {
  ImageOnlyVideoCard,
  TitleVideoCard,
} from "@site/src/components/Common/VideoCard";
import { NewsCard } from "@site/src/components/NewsPage/Cards";
import eventsData from "@site/.docusaurus/airtable/default/airtable-events.json";
import EventCard from "@site/src/components/GlobalEvents/EventCard";
import { AirtableEvent } from "@site/src/components/GlobalEvents/types";

interface FeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
  badge?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  imageSrc,
  title,
  description,
  badge,
}) => {
  return (
    <article className="flex flex-col justify-start tw-lead-sm md:tw-lead">
      <img
        loading="lazy"
        src={imageSrc}
        alt=""
        className="aspect-square object-contain ml-0 mr-auto w-[120px] max-w-full max-h-full p-0.5"
      />
      <div className="mt-6 w-full">
        <span className="text-black">{title} </span>
        <span className="text-black/50">{description}</span>
      </div>
      {badge && (
        <div className="self-start rounded-full bg-white mt-4 gap-[10px] text-[0.75rem] md:text-[1rem] text-black/60 px-4 py-0.5">
          {badge}
        </div>
      )}
    </article>
  );
};

const features: FeatureCardProps[] = [
  {
    imageSrc: "/img/ai-chain/1a.svg",
    title: "Tamper proof.",
    description:
      "Sensitive AI models in finance and public administration need protection beyond individual control. ICP blockchain ensures integrity and prevents tampering.",
  },
  {
    imageSrc: "/img/ai-chain/2a.svg",
    title: "Verifiable Inputs and Outputs.",
    description:
      "AI focuses on input and output, and for legal compliance, trust comes from auditable, verifiable data. ICP's blockchain ensures transparency and verification.",
  },
  {
    imageSrc: "/img/ai-chain/3a.svg",
    title: "Privacy-preserving.",
    description:
      "AI models manage sensitive data, raising privacy risks. ICP's cryptographic encryption secures AI data, ensuring compliance with protection standards.",
    badge: "coming soon",
  },
  {
    imageSrc: "/img/ai-chain/4a.svg",
    title: "Resilient.",
    description:
      "AI-driven operations like medical care need constant availability. ICP's decentralized smart contracts ensure high availability, keeping AI models secure and operational.",
  },
  {
    imageSrc: "/img/ai-chain/5a.svg",
    title: "AI-2-X Economy.",
    description:
      "AI models that run as smart contracts, enable them to autonomously participate in the digital economy by interacting with digital assets such as Bitcoin, Ethereum, Stablecoins, and ICP. This setup facilitates secure, transparent, and automated transactions and contract management without human intervention.",
  },
];

const MotionLink = motion(Link);
const { events, websiteCategory, regions } = eventsData;

function AISubPage() {
  const [filteredEvents, setFilteredEvents] = React.useState<
    (AirtableEvent | "promo")[] | null
  >(null);
  return (
    <Layout
      title="Secure and Trusted AI on-chain"
      description="Powered by next generation Smart Contracts."
    >
      <ShareMeta image=""></ShareMeta>

      <main
        className="text-black relative overflow-hidden bg-white"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <LightHeroStyles bgColor="white" />
        <AnimateSpawn
          variants={transitions.container}
          el={motion.section}
          className="overflow-hidden"
        >
          <section className="container-10 mt-48 md:mt-72 relative">
            <div className="flex justify-center flex-col items-center text-center">
              <div className="relative w-full sm:w-2/3 md:w-1/2 mb-20">
                <img
                  src="/img/ai-chain/chain_logo_black.webp"
                  alt="ai chain logo"
                  className="pointer-events-none w-full"
                />
              </div>
              <motion.p
                className="tw-lead-sm md:tw-lead-lg mb-0"
                variants={transitions.item}
              >
                Secure and Trusted AI on-chain
              </motion.p>
              <motion.p
                className="tw-lead-sm md:tw-lead-lg text-black/60 mb-8"
                variants={transitions.item}
              >
                Powered by next generation Smart Contracts.{" "}
              </motion.p>
              <Link
                href="/ecosystem?tag=AI"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight /> Explore the fastest growing AI Ecosystem in
                Web3
              </Link>
              <motion.p
                className="md:container-8 tw-lead-sm md:tw-lead-lg my-20 md:my-40  text-left"
                variants={transitions.item}
              >
                AI will be at the heart of everything, driving economies,
                industries, and our daily lives.{" "}
                <span className="text-gradient-violet">
                  AI on the Internet Computer
                </span>{" "}
                marks a major technological leap by bringing AI on-chain,
                ensuring decentralized, tamper-proof, and privacy-preserving
                solutions that address critical issues like security,
                transparency, and reliability. By running AI as smart contracts
                on ICP, we unlock transformative use cases across sectors, from
                healthcare to finance, while laying the foundation for a new
                AI-driven digital economy.
              </motion.p>
            </div>
          </section>
        </AnimateSpawn>
        <section className="bg-[#F1EEF5] py-20 md:py-30">
          <AnimateSpawn
            className="container-10 relative"
            el={motion.section}
            variants={transitions.container}
          >
            <div className="md:w-6/10 mb-10 md:mb-20">
              <motion.h2
                className="tw-title-sm md:tw-title-lg mb-3 md:mb-6"
                variants={transitions.item}
              >
                AI on chain - Technological Innovation
              </motion.h2>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                ICP's advanced AI on Chain technology addresses five key pillars
                that define the future of AI.
              </motion.p>
            </div>
            <AnimateSpawn
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-12 sm:gap-x-12 md:gap-x-[4.5rem] md:gap-y-20 mt-20 md:mt-30"
              variants={transitions.container}
            >
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </AnimateSpawn>
          </AnimateSpawn>
        </section>
        <section className="bg-[#F1EEF5] py-20 md:py-30">
          <AnimateSpawn
            className="container-10 relative"
            el={motion.section}
            variants={transitions.container}
          >
            <motion.div
              className="md:w-6/10 mb-10 md:mb-20"
              variants={transitions.item}
            >
              <motion.h4 className="tw-heading-7-caps mb-2">
                TECHNOLOGY
              </motion.h4>
              <motion.h3 className="tw-title-sm md:tw-title-lg">
                Industry Innovation
              </motion.h3>{" "}
              <motion.p className="tw-lead-sm md:tw-lead text-black/60">
                The Internet Computer provides unique technical capabilities for
                decentralized AI and continues to advance its development
                further.
              </motion.p>
            </motion.div>
          </AnimateSpawn>
          <aside className="container-12">
            <motion.div className="bg-white rounded-2xl p-10 md:p-16 flex flex-col md:flex-row gap-8 md:gap-20">
              <article className="flex flex-col justify-start tw-lead-sm md:tw-lead">
                <div className="md:w-7/10">
                  <span className="text-black">
                    Handle large amounts of data.{" "}
                  </span>
                  <span className="text-black/50">
                    ICP’s next-gen smart contracts can store and process
                    gigabytes of data, unlike traditional smart contracts that
                    can only handle kilobytes. This is required for storing and
                    executing large AI models as well as processing large
                    amounts of input data. 
                  </span>
                </div>
              </article>
              <article className="flex flex-col items-center">
                <span className="text-gradient-violet text-[2.5rem] md:text-[5rem] font-[900] mb-0 mt-0 md:-mt-[10%]">
                  1.000.000x
                </span>
                <span className="text-black tw-lead-sm md:tw-lead md:-mt-5">
                  more data storage
                </span>
                <div className="w-[200%] md:w-[300%] -translate-x-[12%] md:-translate-x-[25%] mt-12">
                  <img
                    src="/img/ai-chain/data.svg"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </article>
            </motion.div>
          </aside>
        </section>
        <section className="bg-[#F1EEF5] py-20 md:py-30">
          <AnimateSpawn
            className="container-12 relative"
            el={motion.section}
            variants={transitions.container}
          >
            <motion.h3 className="tw-title-sm md:tw-title-lg">
              Resources
            </motion.h3>{" "}
          </AnimateSpawn>
          <AnimateSpawn
            className="container-12 py-10 md:py-20"
            el={motion.section}
            variants={transitions.container}
          >
            <div className="container-10 !px-0 flex flex-col gap-1  md:gap-5 mb-8 md:flex-row ">
              <motion.h2
                className="tw-heading-3 mb-0 md:tw-heading-60"
                variants={transitions.item}
              >
                Videos
              </motion.h2>
              <div className="md:flex-1 md:pt-1 ">
                <motion.p
                  className="mb-0 mt-2 tw-paragraph md:tw-lead-sm md:w-1/2"
                  variants={transitions.item}
                >
                  Get all the news and event infos about Chain Fusion Technology
                  on ICP.
                </motion.p>
                <MotionLink
                  variants={transitions.item}
                  href="/news"
                  className="link-primary link-with-icon mt-3"
                >
                  <LinkArrowRight /> Explore more news
                </MotionLink>
              </div>
            </div>

            <div className="mt-4 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
              <TitleVideoCard
                href="https://www.youtube.com/watch?v=hbjeL0MDhG4&list=PLuhDt1vhGcrc4ocJ_WgbuYPXqCw1YYXF4"
                image="https://img.youtube.com/vi/hbjeL0MDhG4/maxresdefault.jpg"
                className="flex-1"
                title="Internet Computer BUIDL Bitcoin Hackathon Powered by Encode"
              />
              <TitleVideoCard
                href="https://www.youtube.com/watch?v=hbjeL0MDhG4&list=PLuhDt1vhGcrc4ocJ_WgbuYPXqCw1YYXF4"
                image="https://img.youtube.com/vi/hbjeL0MDhG4/maxresdefault.jpg"
                className="flex-1"
                title="Internet Computer BUIDL Bitcoin Hackathon Powered by Encode"
              />
              <TitleVideoCard
                href="https://www.youtube.com/watch?v=hbjeL0MDhG4&list=PLuhDt1vhGcrc4ocJ_WgbuYPXqCw1YYXF4"
                image="https://img.youtube.com/vi/hbjeL0MDhG4/maxresdefault.jpg"
                className="flex-1"
                title="Internet Computer BUIDL Bitcoin Hackathon Powered by Encode"
              />
            </div>
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default AISubPage;
