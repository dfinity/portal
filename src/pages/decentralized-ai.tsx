import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LinkCardsSection from "../components/Common/LinkCardsSection";
import ShareMeta from "../components/Common/ShareMeta";
import {
  TranslatedCard,
  TranslatedCardList,
} from "../components/Common/TranslatedCards/TranslatedCards";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import { AskAIWidget } from "@site/src/components/DocsHome/AskAIWidget";
import { ChatWidget } from "@site/src/components/LandingPage/Hero/ChatWidget";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import { SmallCard, PromoCard } from "../components/Common/Card";
import { ProjectInfo } from "../components/Ecosystem/ProjectInfo";
import {
  NewsCard
} from "../components/NewsPage/Cards";

import showcaseData from "../../showcase.json";
const aiProjects = showcaseData.filter((p) =>
  (p.tags || []).find((tag) => tag == 'AI')
); 

console.log(aiProjects);

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

        <section className="container-12 mt-40">
          <h2 className="tw-heading-4 text-gradient md:tw-heading-60 mb-0">The DeAI Ecosystem</h2>
          <p className="tw-paragraph max-w-96">Learn more about teams already leveraging the Internet Computer as their foundational AI computing infrastructure.</p>
          <aside className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative" aria-label="AI Project">
            {aiProjects.map((project, index) => (
              <SmallCard key={project.website}>
                <ProjectInfo project={project}></ProjectInfo>
              </SmallCard>
            ))}
            <PromoCard 
              title="Explore the DeAI ICP Ecosystem"
              link={{
                href: "/ecosystem",
                label: "Explore more DEAI Apps",
              }}
            />

          </aside>
        </section>

        <AnimateSpawn
          className="bg-infinite overflow-hidden mt-20 md:mt-30"
          variants={transitions.container}
          el={motion.section}
        >
          <div className="relative container-10 py-30 md:py-40 flex flex-col sm:flex-row text-white relative">
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
            <div className="flex-1 pointer-events-none">
              <img
                src="/img/decentralized-ai/aicoded.webp"
                alt="Image of a chip labeled 'AI'"
                loading="lazy"
                className="absolute top-0 right-0 w-full md:w-1/2 lg:w-1/2 max-w-none"
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

        <AnimateSpawn
          className="container-12 pt-20 md:pt-30"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="flex flex-col gap-6 md:gap-5 mb-8 md:flex-row">
            <motion.h2
              className="tw-heading-4 mb-0 md:tw-heading-60 md:flex-1"
              variants={transitions.item}
            >
              News & media
            </motion.h2>
            <div className="md:flex-1 md:pt-3">
              <motion.p
                className="mb-4 tw-paragraph md:tw-lead-sm"
                variants={transitions.item}
              >
                Get all the news from the Internet Computer ecosystem
              </motion.p>
              <MotionLink
                variants={transitions.item}
                href="/news"
                className="link-primary link-with-icon"
              >
                Explore more news <LinkArrowUpRight />
              </MotionLink>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <NewsCard 
              news={{
                title: 'AI models as smart contracts on a blockchain.',
                dateHuman: 'Jan 26, 2024 by @dominic_w',
                press: `#ICP says advanced AI models need to run as smart contracts on blockchain. How? Why? It's easiest to understand by example. Imagine an LLM (Large Language Model) AI that acts as a company oracle, which sits...`,
                url: 'https://twitter.com/dominic_w/status/1750886289702834539',
                imageUrl: '/img/decentralized-ai/news-1.jpg',
              }}
              linkLabel="See the post"
            />

            <NewsCard 
              news={{
                title: 'AWS-Reliant Blockchains Won’t Bring Transparency to AI',
                dateHuman: 'Jul 29, 2023 by Dominic Williams',
                press: `The rapid progress of artificial intelligence (AI) has captivated the world, with many asking what is next for this technological breakthrough. While AI has already demonstrated its potential to transform various industries...`,
                url: 'https://www.coindesk.com/consensus-magazine/2023/07/29/crypto-networks-reliant-on-aws-wont-bring-transparency-to-ai/',
                imageUrl: '/img/decentralized-ai/news-2.jpg',
              }}
              linkLabel="Read Now"
            />

            <NewsCard 
              news={{
                title: 'Dfinity taps SingularityNET to bring AI services to DApps',
                dateHuman: 'Nov 20, 2023 on cointelegraph.com',
                press: `Research and development firm Dfinity Foundation has partnered with artificial intelligence (AI)-focused blockchain firm SingularityNET to improve the infrastructure of decentralized AI and allow decentralized applications...`,
                url: 'https://cointelegraph.com/news/decentralized-ai-dfinity-foundation-singularitynet-partnership',
                imageUrl: '/img/decentralized-ai/news-3.jpg',
              }}
              linkLabel="Read Now"
            />

            <NewsCard 
              news={{
                title: 'AI-related crypto are quickly gaining value',
                dateHuman: 'Nov 03, 2024 by fastcompany.com',
                press: `Internet Computer (ICP) is the biggest AI crypto, by a wide margin. It’s a decentralized web platform whose goal is to build a secure network for public use—and it’s using large language models to help achieve that.`,
                url: 'https://www.fastcompany.com/91055087/bitcoin-ai-cryptos-gaining-value-cryptocurrency',
                imageUrl: '/img/decentralized-ai/news-4.jpg',
              }}
              linkLabel="Read Now"
            />

            <NewsCard 
              news={{
                title: 'Decentralized AI Offers New Hope for User Data Security',
                dateHuman: 'March 15, 2024 on metanews.com',
                press: `One of the biggest risks with the increased use of AI chatbots like ChatGPT is the emergence of new threats to user data. But some companies are starting to build decentralized AI systems that they hope will make personal data leaks...`,
                url: 'https://www.fastcompany.com/91055087/bitcoin-ai-cryptos-gaining-value-cryptocurrency',
                imageUrl: '/img/decentralized-ai/news-5.jpg',
              }}
              linkLabel="Read Now"
            />

            <NewsCard 
              news={{
                title: 'DFINITY is revolutionizing dApps with AI on ICP!',
                dateHuman: 'Sat 16 Mar 2024 on cointribune.com',
                press: `DFINITY, the foundation behind the innovative Internet Computer Protocol (ICP), has just unveiled a remarkable opportunity for decentralized application (dApp) developers. This new feature involves the ability to integrate OpenAI’s...`,
                url: 'https://www.fastcompany.com/91055087/bitcoin-ai-cryptos-gaining-value-cryptocurrency',
                imageUrl: '/img/decentralized-ai/news-6.jpg',
              }}
              linkLabel="Read Now"
            />
          </div>
        </AnimateSpawn>

        <LinkCardsSection
          className="mb-20 md:mb-30 mt-30 md:mt-40"
          title="Explore AI on ICP"
          cards={[
            {
              label: "Apply to DeAI Grants",
              href: "https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7",
            },
            {
              label: "Start building DeAI",
              href: "/events",
            },
            {
              label: "Chat with AI to learn more about ICP",
              href: "/docs/current/home",
            },
            {
              label: "Join the DeAI working group",
              href: "/ecosystem",
            },
          ]}
        />
      </main>
    </Layout>
  );
}

export default AIPage;