import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { Faq, FaqSection } from "../components/Common/Faq/Faq";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LinkCardsSection from "../components/Common/LinkCardsSection";
import ShareMeta from "../components/Common/ShareMeta";
import {
  TranslatedCard,
  TranslatedCardList,
} from "../components/Common/TranslatedCards/TranslatedCards";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import VideoCard from "../components/Common/VideoCard";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import { AskAIWidget } from "@site/src/components/DocsHome/AskAIWidget";
import { ChatWidget } from "@site/src/components/LandingPage/Hero/ChatWidget";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";

const MotionLink = motion(Link);

function AIPage() {
  const fontLoaded = useFontsLoaded();
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDark = useDarkHeaderInHero(heroRef);


  return (
    <Layout
      title="Decentralized AI"
      description="Internet Identity on ICP redefines user experiences by removing friction from the authentication journey and enabling data sovereignty."
    >
      <ShareMeta image="/img/shareImages/share-internet-identity.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <section className="bg-infinite text-white pt-20 mb-[10vw] lg:mb-3" ref={heroRef}>
          {bgDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

          <div className="container-10 pt-20 pb-12 sm:pb-40 md:pb-40 md:pt-36 relative z-10">
            <div className="blob blob-white blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div>
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-8/10"
              variants={transitions.item}
            >
              Hello, <br /> Decentralized AI
            </motion.h1>
            <div className="relative  md:w-5/10">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                As AI continues to scale, Blockchain has the potential to balance its current centralized properties and foster a more equal distribution of power, data, and control over how society will continue interacting with the internet over the coming decades.
              </motion.p>
            </div>
          </div>
          <div className="container-12 relative z-1 h-[200px] md:h-0 pointer-events-none">
            <div className="absolute w-[200%] left-1/2 translate-y-1/2 -translate-x-[55%] bottom-1/2 md:left-0 md:absolute md:w-[150%] md:bottom-0 md:-translate-x-[5%] md:translate-y-1/3">
              <img
                src="/img/decentralized-ai/aiheader.webp"
                alt="Start building on Internet Identity"
                className="w-full max-w-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="container-6 relative mt-24 sm:mt-52 md:mt-40">
          <AnimateSpawn variants={transitions.container}>
            <motion.h2
              className="tw-heading-4 text-gradient md:tw-heading-60 mb-0 text-center"
              variants={transitions.item}
            >
              Only on the Internet Computer AI runs on the blockchain
            </motion.h2>
          </AnimateSpawn>
        </section>

        <section className="container-10 mt-6 md:mt-10">
          <TranslatedCardList className="md:mx-1/12">
            <TranslatedCard
              title="Built for Scale"
              icon={
                <img
                  src="/img/decentralized-ai/icon-5.svg"
                  loading="lazy"
                  aria-hidden="true"
                />
              }
            >

              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Canister smart contracts store up to 400 GB of data, enough to run substantial Large Language Models and AI applications at similar speeds to centralized infrastructure. AI models on the Internet Computer can be fully decentralized and verifiable.
              </motion.p>
            </TranslatedCard>
            <TranslatedCard
              title="Verifiable"
              icon={
                <img
                  src="/img/decentralized-ai/icon-6.svg"
                  loading="lazy"
                  aria-hidden="true"
                />
              }
            >
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Prompts get validated as messages on the blockchain, ensuring the security and integrity of all data - a crucial element in developing applications handling sensitive data. Running open-source AI models like Llama 2 on ICP can form the basis for a fully open AI stack.
              </motion.p>
            </TranslatedCard>
            <TranslatedCard
              title="Tamper proof"
              icon={
                <img
                  src="/img/decentralized-ai/icon-7.svg"
                  loading="lazy"
                  aria-hidden="true"
                />
              }
            >
              <motion.p
                className="mb-0 tw-paragraph"
                variants={transitions.item}
              >
                Building AI applications on the Internet Computer allows flexible, clear control permissions for maximum security and privacy. Developers decide on the dapp ‘controller’ - an internet identity, a DAO, or nobody.
              </motion.p>
            </TranslatedCard>
          </TranslatedCardList>
        </section>

        <AnimateSpawn
          className="bg-infinite overflow-hidden mt-20 md:mt-30"
          variants={transitions.container}
          el={motion.section}
        >
          <div className="container-10 py-30 md:py-40 flex flex-col sm:flex-row text-white relative">
            <div className="blob blob-white blob-sm md:blob-xl blob-x-10 blob-y-3 md:blob-y-5"></div>
            <div className="flex-1 mt-40 sm:mt-0">
              <h2 className="tw-heading-4 md:tw-heading-3 mb-6">
                Use AI to learn about the Internet Computer Protocol
              </h2>
              <div className="mb-0">
                <div className="w-full md:w-[550px] mt-4 md:mt-8">
                  <AskAIWidget  />
                  <ChatWidget
                    aiPlaceholders={[
                      "What is the Internet Computer?",
                      "How do I build on the Internet Computer?",
                      "What is the ICP token?",
                    ]}
                    fontLoaded={true}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="/img/decentralized-ai/aicoded.webp"
                alt=""
                loading="lazy"
                className="absolute top-0 right-0 w-1/2 w-full max-w-none"
              ></img>
            </div>
          </div>
        </AnimateSpawn>

        
        <AnimateSpawn
          el={motion.section}
          variants={transitions.container}
          className="mt-20 md:mt-30"
        >
          <div className="container-10 mb-10">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-0 text-gradient"
              variants={transitions.item}
            >
              Coming soon
            </motion.h2>
          </div>
          <div className="md:container-12 grid md:grid-cols-2 gap-5 md:gap-5 pb-16 md:pb-0 bg-white md:bg-transparent">
            <motion.div
              className="md:col-span-2 md:rounded-xl backdrop-blur-2xl md:bg-white-60 relative flex flex-col md:flex-row  px-6 md:px-0 pt-10 md:pt-0"
              variants={transitions.item}
            >
              <div className=" flex-1 md:order-2 flex rounded-xl overflow-hidden md:max-w-5/10">
                <img
                  src="/img/decentralized-ai/llm-icons.webp"
                  alt="Helix Markets"
                  className="w-full relative object-cover"
                  loading="lazy"
                />
              </div>
              <div className="md:flex-1 md:order-1 md:p-16 md:max-w-5/10 mt-10 md:mt-0">
                <h2 className="tw-heading-5 md:tw-heading-4 mb-6">
                  A private enterprise oracle
                </h2>
                <p className="tw-lead-sm text-black/60">
                  An LLM on ICP to improve communications and productivity inside an organization.
                </p>
                <p className="tw-lead-sm mt-0 text-black/60">
                  A chat interface that feeds on company data sources such as GitHub repos, JIRA tickets, Slack conversations, email threads, Google Calendar, and every other enterprise information source that's important. Employees can gain clarity on internal processes, projects, and schedules, and also feed back the model with ideas, tasks, and updates. Using this model, organizations leverage AI to be the glue that holds everything together.
                </p>
              </div>
            </motion.div>
          </div>
        </AnimateSpawn>

        <LinkCardsSection
          className="mb-20 md:mb-30 mt-30 md:mt-40"
          title="Get familiar with the Internet Computer"
          cards={[
            {
              label: "Blogs",
              href: "https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7",
            },
            {
              label: "ICP community events",
              href: "/events",
            },
            {
              label: "Dev docs",
              href: "/docs/current/home",
            },
            {
              label: "ICP dapps",
              href: "/ecosystem",
            },
          ]}
        />
      </main>
    </Layout>
  );
}

export default AIPage;