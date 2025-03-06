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

const news = [
  {
    title: "DeAI Agent Economy: ICP as New Home for Autonomous Agents",
    dateHuman: "Feb 21, 2025",
    details:
      "The emergence of the On-Chain AI Agent Economy marks a transformative era for Web3, where AI agents operate autonomously within decentralized networks. This new economic activity enables agents to transact with each other...",
    url: "https://medium.com/@dfinity/deai-agent-economy-icp-as-new-home-for-autonomous-agents-edc2c04ceb32",
    imageUrl: "/img/decentralized-ai/news-1.webp",
    linkLabel: "Read Now",
  },
  {
    title:
      "Dominic Williams Reveals His Vision for the Internet Computer (ICP)",
    dateHuman: "Feb 21, 2025",
    details:
      "The internet is broken—can blockchain fix it? In this episode, Dominic Williams, the visionary behind The Internet Computer (ICP) and founder of DFINITY, reveals his plan to build a decentralized alternative to cloud computing.",
    url: "https://www.youtube.com/watch?v=ULwRjvS13ec",
    imageUrl: "/img/decentralized-ai/news-2.webp",
    linkLabel: "Watch now",
  },
  {
    title:
      "Investing in the Future: AI and Web3 with Logan Golema, Melody He, Pierre Samaties",
    dateHuman: "Jan 30, 2025",
    details:
      "Leading experts explore the transformative convergence of AI and Web3, revealing groundbreaking opportunities at the intersection of these revolutionary technologies. Discover how decentralized systems are enabling the next generation...",
    url: "https://youtu.be/tsibXXsEEGc",
    imageUrl: "/img/decentralized-ai/news-3.webp",
    linkLabel: "Watch now",
  },
  {
    title:
      "How Technology will Shape Tomorrow - with Jeremy Kahn, Dominic Williams and Ross Perot Jr.",
    dateHuman: "Jan 30, 2025",
    details:
      "Industry titans Ross Perot Jr. and Dominic Williams join forces to explore how technology infrastructure and innovation will shape our future. Get unique insights into data center development, AI integration, and the evolution of se...",
    url: "https://www.youtube.com/watch?v=UW3RZMJrJSU",
    imageUrl: "/img/decentralized-ai/news-4.webp",
    linkLabel: "Watch now",
  },
  {
    title:
      "The AI Revolution - Challenges, Risks, and Opportunities with Michael Casey",
    dateHuman: "Jan 30, 2025",
    details:
      "Leading experts from academia, technology, and investment explore the critical challenges and opportunities in the AI revolution. Get unique insights into how decentralized systems, academic research, and venture capital are shaping the future of artificial intelligence.",
    url: "https://youtu.be/QWbHRRKgXH4",
    imageUrl: "/img/decentralized-ai/news-5.webp",
    linkLabel: "Watch now",
  },
  {
    title:
      "The Self-Writing & Sovereign Internet Paradigm: AI on the Internet Computer",
    dateHuman: "Jan 20, 2025",
    details:
      "In the future, we will describe custom web applications and internet services to AI, and they will materialize, allowing anyone to become a builder, system owner or entrepreneur, realizing precise ideas, and transforming the future of technology.",
    url: "https://www.cbsnews.com/video/the-self-writing-sovereign-internet-paradigm-ai-on-the-internet-computer",
    imageUrl: "/img/decentralized-ai/news-6.webp",
    linkLabel: "Watch now",
  },
  {
    title: "How AI is Gathering Momentum with the Internet Computer",
    dateHuman: "Dec 9, 2024",
    details:
      "The Internet Computer is powering up to help AI achieve its full potential. A new partnership between the DFINITY Foundation and ETH Zurich AI Center will benefit both ecosystems.",
    url: "https://medium.com/dfinity/how-ai-is-gathering-momentum-with-the-internet-computer-b775d9c40d2d",
    imageUrl: "/img/decentralized-ai/news-7.webp",
    linkLabel: "Read Now",
  },
  {
    title:
      "Internet Computer Unleashes New Era of Speed, Developer Ease, and Onchain Storage with Major Upgrades",
    dateHuman: "Dec 2, 2024",
    details:
      "Tokamak, Beryllium and Stellarator milestones have massively reduced ICP's latency, introduced a number of Quality-of-Life features for developers, and revolutionized onchain data storage capabilities.",
    url: "https://medium.com/dfinity/internet-computer-unleashes-new-era-of-speed-developer-ease-and-onchain-storage-with-major-d0ebcfa5b0e4",
    imageUrl: "/img/decentralized-ai/news-8.webp",
    linkLabel: "Read Now",
  },
  {
    title: "The Current State of AI x Blockchain, and What's Next",
    dateHuman: "Aug 15, 2024",
    details:
      "Dominic Williams, Dfinity's founder and Chief Scientist, recently sat down for a fireside chat with Tony Tran-Hale, who joined Dfinity as Head of Institutional Relations in May. The topic was AI, specifically what Dom thinks of the current landscape.",
    url: "https://medium.com/dfinity/the-current-state-of-ai-x-blockchain-and-whats-next-f1b7b6fd6184",
    imageUrl: "/img/decentralized-ai/news-9.webp",
    linkLabel: "Read Now",
  },
];

const shortTermRoadmapItems = [
  "Faster deterministic floating-point operations",
  "Wasm SIMD (Single-instruction multiple data)",
  "Upgrade Wasm memory to 64-bit",
];

const longTermRoadmapItems = [
  "Explore API for deterministic AI computation on GPUs.",
  "Develop public specification for nodes with GPUs.",
  "Add subnets with the new nodes to ICP.",
];

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

        <section className="container-10 relative mt-40 sm:mt-52 md:mt-60">
          <AnimateSpawn
            className="container-10 mt-12 mb-5 !p-0"
            el={motion.section}
            variants={transitions.container}
          >
            <div id="demo" className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <motion.div
                variants={transitions.item}
                className="col-span-1 md:col-span-2 mb-10"
              >
                <VideoCard
                  image="/img/decentralized-ai/thumb-ai-video-thumb4.webp"
                  title="Where AI builds: Unlocking the power of imagination through chat"
                  label="Demo"
                  link={`https://www.youtube.com/watch?v=9q13cFGxEb0`}
                  description="Dominic Williams unveils his groundbreaking vision for 2025: the Self-Writing Internet."
                />
              </motion.div>
            </div>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.container}
            className="bg-[#1E005D] px-4 md:px-10 pt-6 pb-1 md:pb-24 md:pt-24 gap-8 mb-10 sm:mb-12 rounded-xl relative text-white"
          >
            <motion.div>
              <aside className="container-10 md:flex md:items-center mt-6 md:mt-0 !pl-0 !pr-0">
                <div className="md:w-1/2">
                  <motion.h5
                    className="tw-heading-5 md:tw-heading-4 mb-3 sm:mb-6"
                    variants={transitions.item}
                  >
                    The home of sovereign AI agents
                  </motion.h5>
                  <motion.p>
                    Deploy AI agents with just a few lines of code. Secure.
                    Sovereign. Only on the Internet Computer.
                  </motion.p>
                  <p className="mb-12 md:mb-0 mt-8">
                    <MotionLink
                      variants={transitions.item}
                      className="button-primary button-white"
                      href="/ai-agents"
                    >
                      Start building
                    </MotionLink>
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-end relative ">
                  <div className="md:absolute">
                    <motion.img
                      className="w-full object-cover md:-translate-y-1/2"
                      src="/img/ai/ai-agents.svg"
                      alt="roadmap"
                    />
                  </div>
                </div>
              </aside>
            </motion.div>
          </AnimateSpawn>
        </section>
        <AnimateSpawn
          el={motion.section}
          variants={transitions.container}
          className="mt-24 md:mt-40"
        >
          <div className="container-10 mb-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <motion.h4
                className="tw-heading-4 md:tw-heading-60 mb-0 text-gradient"
                variants={transitions.item}
              >
                AI Models on ICP Today
              </motion.h4>
              <div>
                See a series of demos how the Internet Computer has the
                capability of running AI in a smart contract.
                <div className="mt-6">
                  <Link
                    className="link-primary link-with-icon"
                    href="https://www.youtube.com/watch?v=6qLvIXiCGcM&list=PLuhDt1vhGcrfWz1ZJrAmJBDS6aFADySwt"
                  >
                    Watch the playlist <LinkArrowUpRight></LinkArrowUpRight>
                  </Link>
                </div>
              </div>
            </div>

            <AnimateSpawn
              className="container-10 mt-12 mb-5 !p-0"
              el={motion.section}
              variants={transitions.container}
            >
              <div id="demo" className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <motion.div
                  variants={transitions.item}
                  className="col-span-1 md:col-span-2 mb-10"
                >
                  <VideoCard
                    image="/img/decentralized-ai/thumb-ai-video-thumb.webp"
                    title="Onchain Facial Recognition – AI running on ICP"
                    label="Demo"
                    link={`https://www.youtube.com/watch?v=hEFff_GGj30&list=PLuhDt1vhGcrfWz1ZJrAmJBDS6aFADySwt&index=3`}
                    description="The world's first demonstration of AI inference running directly on the blockchain, presented by Dominic Williams"
                  />
                </motion.div>
              </div>
            </AnimateSpawn>
            <AnimateSpawn
              variants={transitions.container}
              className="bg-white px-4 md:px-10 pt-6 pb-1 md:pb-12 md:pt-12 gap-8 mb-10 rounded-xl"
            >
              <motion.div>
                <aside className="container-10 md:flex md:items-center mt-6 md:mt-0 !pl-0	!pr-0">
                  <div className="md:w-1/2">
                    <motion.h5
                      className="tw-heading-5 md:tw-heading-4 mb-3 sm:mb-6 "
                      variants={transitions.item}
                    >
                      AI Facial recognition fully onchain
                    </motion.h5>
                    <motion.p>
                      With the Cyclotron tech milestone, which focused on
                      performance, optimizations have been implemented in the
                      WebAssembly and AI inference engines. The speed of
                      inference can be increased by 10X or more. The first use
                      case is facial recognition, run fully onchain.
                    </motion.p>
                    <p className="mb-12 md:mb-0 mt-8">
                      <Link
                        className="link-primary link-with-icon"
                        href="https://medium.com/@dfinity/589183203fc2"
                      >
                        <LinkArrowRight />
                        READ THE BLOG POST
                      </Link>
                    </p>
                  </div>
                  <div className="md:w-1/2 relative md:mt-6 md:mb-3">
                    <div className="pointer-events-none md:absolute w-full md:-right-20 md:top-1/2  md:-translate-y-1/2">
                      <motion.img
                        className="w-[75%] h-full object-cover"
                        src="/img/roadmap/roadmap.svg"
                        alt="roadmap"
                      />
                    </div>
                  </div>
                </aside>
              </motion.div>
            </AnimateSpawn>
            <AnimateSpawn
              variants={transitions.item}
              className="flex flex-col md:flex-row gap-6 md:gap-24 items-center"
            >
              <div>
                <h3 className="tw-heading-5 md:tw-heading-4 mb-6">
                  Try out the AI demo by yourself
                </h3>
                <p className="tw-paragraph md:tw-lead-sm mb-6 text-black/60">
                  Check out the open-source repo on GitHub and tryout the AI
                  demo by yourself.
                </p>
                <p className="flex flex-col md:flex-row">
                  <MotionLink
                    variants={transitions.item}
                    className="button-outline"
                    href="https://github.com/dfinity/examples/tree/master/rust/face-recognition"
                  >
                    GO TO GITHUB REPO
                  </MotionLink>
                </p>
              </div>
              <div className="w-full md:w-auto rounded-2xl">
                <CodeBlockString showLineNumbers language="rust">
                  {`let image = imageops::resize(
   &image, 160, 160, FilterType::Triangle);

let tensor = Array4::from_shape_fn(
   (1, 3, 160, 160), |(_, c, y, x)| {
   image[(x as u32, y as u32)][c] as f32 / 255.0
});

let result = model.run(
   tvec!(Tensor::from(tensor).into()))?;`}
                </CodeBlockString>
              </div>
            </AnimateSpawn>
          </div>
        </AnimateSpawn>
        <section className="container-10 mt-0 md:mt-30 mb-12 md:mb-20 ">
          <AnimateSpawn
            className="mt-24 md:mt-24"
            variants={transitions.container}
          >
            <motion.h4 className="tw-heading-4 md:tw-heading-60 text-gradient">
              A recent study on AI finds that nearly half of the respondents
              (49%) are concerned about the misuse of AI for nefarious purposes.
            </motion.h4>
            <motion.p className="my-8">
              Survey in the{" "}
              <Link
                className="font-bold"
                to="https://aiindex.stanford.edu/wp-content/uploads/2024/04/HAI_AI-Index-Report-2024.pdf"
                target="_blank"
              >
                Artificial Intelligence Index Report 2024
              </Link>{" "}
              by Stanford University.
            </motion.p>
          </AnimateSpawn>
        </section>
        <section className="container-12 relative mt-24 sm:mt-52 md:mt-40">
          <AnimateSpawn variants={transitions.container}>
            <aside className="container-10 md:mt-40 md:flex md:items-center !pl-0 !pr-0	">
              <div className=" w-[115%] -ml-6 md:-ml-0 md:w-2/3 relative mt-6 md:mt-64 md:mb-64">
                <div className="pointer-events-none md:absolute w-full right-0 md:right-20 md:top-1/2  md:-translate-y-1/2">
                  <motion.img
                    variants={transitions.fadeIn}
                    src="/img/decentralized-ai/trust-img-1.webp"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className=" md:w-1/3">
                <div>
                  <motion.h3
                    className="tw-heading-3 md:tw-heading-60 mb-4 md:mb-6"
                    variants={transitions.item}
                  >
                    Problems with traditional AI
                  </motion.h3>
                </div>

                <div>
                  <motion.h4
                    className="tw-heading-5 md:tw-heading-40 mb-4 md:mb-6"
                    variants={transitions.item}
                  >
                    The Tampering Problem
                  </motion.h4>
                  <motion.p className="text-2xl mb-0 ">
                    <p>
                      <Link
                        className="font-bold"
                        to="https://twitter.com/AnthropicAI/status/1745854907968880970"
                        target="_blank"
                      >
                        Research shows
                      </Link>{" "}
                      that it is possible to tamper with AI models in an
                      undetectable way. This means that the integrity of the
                      AI&apos;s output can be compromised without anyone
                      knowing.
                    </p>
                  </motion.p>
                </div>

                <div>
                  <motion.h4
                    className="tw-heading-5 md:tw-heading-40 mb-4 md:mb-6"
                    variants={transitions.item}
                  >
                    The Black Box Problem
                  </motion.h4>
                  <motion.p className="text-2xl mb-0 ">
                    <p>
                      Users have no visibility into how their data is used and
                      how AI models produce responses. This lack of transparency
                      makes it difficult for users to trust the technology.
                    </p>
                  </motion.p>
                </div>
              </div>
            </aside>
          </AnimateSpawn>
        </section>
        <section className="container-12  relative mt-24 mb-24 sm:mt-52 md:mt-40">
          <motion.h4 className="tw-heading-4 md:tw-heading-60 text-gradient text-left md:text-center my-12  md:mb-16 md:w-5/10 md:mx-auto">
            What is needed to solve these issues?
          </motion.h4>
          <AnimateSpawn
            className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-5"
            variants={transitions.container}
          >
            <motion.div
              className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8"
              variants={transitions.item}
            >
              <img
                src="/img/decentralized-ai/icon-1.svg"
                alt=""
                className="h-24"
              />
              <h3 className="tw-lead my-3 md:tw-title-sm ">Model integrity</h3>
              <p className="tw-paragraph-sm text-black/60 md:tw-paragraph mb-0">
                Users need assurance that their AI prompts are handled by
                untampered models. Traditional software integrity methods, such
                as source code analysis, are infeasible for AI models because
                they consist of complex numerical weights and extensive
                matrices, rather than human-readable code, making direct
                verification impossible.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8"
              variants={transitions.item}
            >
              <img
                src="/img/decentralized-ai/icon-2.svg"
                alt=""
                className="h-24"
              />
              <h3 className="tw-lead my-3 md:tw-title-sm">
                Data confidentiality
              </h3>
              <p className="tw-paragraph-sm md:tw-paragraph  text-black/60  mb-0">
                During training and operation, AI models handle sensitive data,
                like medical inquiries or corporate secrets. Users need
                guarantees that their information remains secure and doesn't
                leak to the model creators, other users, or AI infrastructure
                providers.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-8"
              variants={transitions.item}
            >
              <img
                src="/img/decentralized-ai/icon-3.svg"
                alt=""
                className="h-24"
              />
              <h3 className="tw-lead my-3 md:tw-title-sm">Availability</h3>
              <p className="tw-paragraph-sm md:tw-paragraph  text-black/60  mb-0">
                AI models will become essential for business processes and
                societies in general. As with every critical infrastructure,
                solutions must be found to keep AI models resilient to
                interruptions and to protect them from censorship.
              </p>
            </motion.div>
          </AnimateSpawn>
        </section>

        <section className="container-10 mt-12 md:mt-44 md:mb-44">
          <AnimateSpawn
            className="mt-16 md:mt-24 mb-60 md:mb-24 relative"
            variants={transitions.container}
          >
            <motion.h4 className="tw-heading-4 md:tw-heading-60 text-gradient ">
              What the future holds
            </motion.h4>
            <motion.p className="mt-6 mb-4 md:mb-6 md:w-[55%]">
              Blockchain AI is still in its early stages. Currently, smart
              contracts can run small AI models like ImageNet for onchain image
              classification. Short-term improvements will decrease latency and
              support larger models, while the long-term goal is to enable smart
              contracts to perform AI computations on GPUs, allowing both
              training and inference of large models fully onchain.
            </motion.p>
            <motion.div>
              <motion.p className="tw-lead-sm mb-2 my-2">Short-term</motion.p>
              <RoadMapList items={shortTermRoadmapItems} />
            </motion.div>
            <motion.div>
              <motion.p className="tw-lead-sm mb-2 mt-4">Long-term</motion.p>
              <RoadMapList items={longTermRoadmapItems} />
            </motion.div>
            <div
              className=" w-[120%] sm:w-7/10 md:w-[85%]
              absolute
              bottom-0
              
              translate-y-[110%] translate-x-[-10%] md:translate-y-[45%] md:translate-x-[55%]
              sm:translate-y-[80%] sm:translate-x-[20%]
              select-none 
            "
            >
              <img
                src="/img/what-is-the-ic/hero.svg"
                alt=""
                className="w-full max-w-none"
              />
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-12 pt-16 md:pt-40"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="flex flex-col gap-6 !p-0 md:gap-5 mb-8 md:flex-row container-10">
            <motion.h2
              className="tw-heading-4 mb-0 md:tw-heading-60"
              variants={transitions.item}
            >
              News & media
            </motion.h2>
            <div className="md:flex-1 md:pt-1">
              <motion.p
                className="mb-0 mt-2 tw-paragraph md:tw-lead-sm"
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
            {news.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
              >
                <NewsCard news={item} linkLabel={item.linkLabel} />
              </Link>
            ))}
          </div>
        </AnimateSpawn>

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

export default AIPage;
