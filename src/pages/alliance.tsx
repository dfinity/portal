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

const MotionLink = motion(Link);

function AlliancePage() {
  const fontLoaded = useFontsLoaded();
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Decentralized AI on Internet Computer - Secure and Trustworthy AI Solutions"
      description="Explore how the Internet Computer Protocol (ICP) leverages blockchain technology to offer decentralized AI solutions, ensuring model integrity, data confidentiality, and resilience against disruptions. Discover how AI smart contracts on ICP can transform trust and security in artificial intelligence."
    >
      <ShareMeta image="/img/shareImages/share-ai.webp"></ShareMeta>

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
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-2/3 "
              variants={transitions.item}
            >
              Run AI models as real smart contracts
            </motion.h1>
            <div className="relative  md:w-5/10">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Al can be run truly onchain as Internet Computer smart
                contracts, making it tamperproof and unstoppable, and autonomous
                if needed.
              </motion.p>
              {/* <MotionLink
                className="button-white"
                href="/ai"
                target="_blank"
                rel="noopener noreferrer"
                variants={transitions.item}
              >
                EXPLORE AI ON ICP
              </MotionLink> */}
            </div>
          </div>
          <div className="container-12 relative z-1 h-[200px] md:h-0 pointer-events-none">
            <div className="absolute w-10/12 sm:w-5/12 left-1/2 translate-y-1/2 -translate-x-[50%] bottom-1/2 md:left-0 md:absolute md:w-5/12 md:bottom-0 md:translate-x-[130%] md:translate-y-2/12">
              <img
                src="/img/decentralized-ai/aiheader.svg"
                alt="Decentralized AI"
                className="w-full max-w-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <LinkCardsSection
          className="mb-20 md:mb-30 mt-30 md:mt-40"
          title="Explore AI on ICP"
          cards={[
            {
              label: "Apply to DeAI Grants",
              href: "https://dfinity.org/grants",
            },
            {
              label: "Start building DeAI",
              href: "/ecosystem?tag=AI",
            },
            {
              label: "Chat with AI to learn more about ICP",
              href: "/",
            },
            {
              label: "Join the DeAI working group",
              href: "https://forum.dfinity.org/t/technical-working-group-deai/24621",
            },
          ]}
        />
      </main>
    </Layout>
  );
}

export default AlliancePage;
