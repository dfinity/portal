import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import LightHeroStyles from "@site/src/components/Common/LightHeroStyles";
import VideoCard, {
  ImageOnlyVideoCard,
  TitleVideoCard,
} from "@site/src/components/Common/VideoCard";
import eventsData from "@site/.docusaurus/airtable/default/airtable-events.json";
import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";
import AIManifestoModal from "@site/src/components/AIManifestoModal";
import { useElementSize } from "@site/src/utils/use-element-size";
import { useLocation } from "@docusaurus/router";

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

interface RoadmapItemProps {
  number: string;
  title: string;
  date?: string;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ number, title, date }) => {
  return (
    <section className="min-w-64 flex flex-col justify-between flex-1 p-3 md:p-6 pb-5 md:pb-10 bg-[#F1EEF5] rounded-xl md:min-h-[320px]">
      <h2 className="tw-lead text-black-20">{number}</h2>
      <div className="flex flex-col mt-auto flex-start">
        {date && (
          <time className="mb-1 md:mb-3 tw-paragraph-sm md:tw-paragraph text-black">
            {date ? date : ""}
          </time>
        )}
        <h3 className="tw-lead-sm md:tw-lead bg-gradient-to-br from-[#522785] to-[#ED1E79] bg-clip-text text-transparent">
          {title}
        </h3>
      </div>
    </section>
  );
};

interface AIFeatureCardProps {
  number: string;
  icon?: string;
  title: string;
  features?: string[];
}

const AIFeatureCard: React.FC<AIFeatureCardProps> = ({
  number,
  icon,
  title,
  features,
}) => {
  return (
    <article className="flex flex-col flex-shrink-0 w-[80vw] sm:w-auto sm:flex-1 justify-between bg-white rounded-xl p-6 pb-10">
      {" "}
      <header className="flex w-full items-start justify-between gap-10 tw-lead text-black-20 whitespace-nowrap">
        <span>{number}</span>
        <img
          src={icon}
          alt=""
          className="w-20 h-20 object-contain mr-0 ml-auto"
        />
      </header>
      <div className="flex flex-col mt-16 w-full">
        <h2 className="tw-lead text-black">{title}</h2>
        <ul className="list-none !m-0 !p-0 text-left flex flex-col items-start text-black-60">
          {features.map((item, index) => (
            <li
              key={index}
              className="flex items-center my-1 tw-paragraph leading-tight"
            >
              <img
                src="/img/ai-chain/icon-check-circle.svg"
                alt=""
                className="h-6 w-6 mr-2 select-none"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

interface ScrollableItemProps {
  number: string;
  title: string;
  date?: string;
  icon?: string;
  features?: string[];
}

interface ScrollableSectionProps {
  items: ScrollableItemProps[];
  type: "roadmap" | "aiFeatures";
  title?: string;
}

const ScrollableSection: React.FC<ScrollableSectionProps> = ({
  items,
  type,
  title,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;
        const itemWidth =
          type === "roadmap" ? containerWidth : containerWidth * 0.8;

        let newIndex = Math.round(scrollLeft / itemWidth);

        if (scrollLeft + containerWidth >= scrollWidth - 10) {
          newIndex = items.length - 1;
        }

        setActiveIndex(newIndex);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [items.length, type]);

  const ItemComponent = type === "roadmap" ? RoadmapItem : AIFeatureCard;

  return (
    <div className={type === "roadmap" ? "my-16 sm:my-20" : "my-20 md:my-40"}>
      {title && (
        <motion.h4 className="tw-title-sm md:w-7/10 mb-8">{title}</motion.h4>
      )}
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto ${
          type === "roadmap" ? "md:overflow-x-visible" : ""
        } snap-mandatory snap-x hide-scrollbar -mx-6 px-4 pl-6`}
      >
        <div
          className={`flex gap-4 ${type === "roadmap" ? "pb-4 md:pb-0" : ""}`}
        >
          {items.map((item, index) => (
            <ItemComponent key={index} {...item} />
          ))}
        </div>
      </div>
      <div
        className={`flex justify-center mt-8 gap-5 ${
          type === "roadmap" ? "sm:hidden md:hidden" : "sm:hidden"
        }`}
      >
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === activeIndex
                ? type === "roadmap"
                  ? "bg-black"
                  : "bg-white"
                : type === "roadmap"
                ? "bg-black/20"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Collapse: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onClick: () => void;
  link: string;
}> = ({ title, children, open, onClick, link }) => {
  const ref = useRef<HTMLDivElement>();
  const size = useElementSize(ref);

  return (
    <div className="w-[calc(100vw-100px)] flex flex-col sm:block sm:w-auto snap-center ">
      <button
        onClick={onClick}
        className={clsx(
          `tw-title-sm text-[32px] md:text-title-sm md:text-lg border-none appearance-none whitespace-normal font-circular p-0 transition-colors hover:text-white text-white text-left bg-transparent`,
          open ? "sm:text-white" : "sm:text-white-30"
        )}
      >
        {title}
      </button>
      <div
        className="hidden sm:block sm:overflow-hidden transition-[height] "
        style={{
          height: open && size ? size.height : 0,
        }}
        ref={ref}
      >
        <div className="pt-4 text-white-60 tw-paragraph">{children}</div>
      </div>
      <div className="sm:hidden pt-4 flex flex-1 flex-col text-white-60 tw-paragraph">
        {children}
      </div>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  return (
    <article className="mb-12 md:mb-20">
      <h2 className="text-black-60 tw-lead md:tw-lead-lg mb-4 md:mb-6">
        {question}
      </h2>
      <p className="text-black tw-lead-sm">{answer}</p>
    </article>
  );
};

const ContactCard: React.FC = () => {
  return (
    <aside className="bg-white rounded-xl">
      <h2 className="text-black tw-lead-lg mb-2">Contact</h2>
      <p className="text-black tw-lead-sm mb-2">
        Are you interested in a partnership with DFINITY Foundation? Get in
        touch with us:
      </p>
      <Link href="mailto:ai@dfinity.org" className="link-primary">
        ai@dfinity.org
      </Link>
      <div className="flex items-center mt-8">
        <img
          src="/img/ai-chain/pierre_samaties.webp"
          alt="Pierre Samaties"
          className="w-24 h-24 rounded-full mr-4 ml-0"
        />
        <div>
          <h3 className="text-black tw-lead mb-0">Pierre Samaties</h3>
          <span className="tw-paragraph text-black/60">
            Chief Business Officer
          </span>
        </div>
      </div>
      <div className="flex mb-8 mt-8 items-center">
        <img
          src="/img/ai-chain/islam_el_ashi.webp"
          alt="Islam El-Ashi"
          className="w-24 h-24 rounded-full mr-4 ml-0"
        />
        <div>
          <h3 className="text-black tw-lead mb-0">Islam El-Ashi</h3>
          <span className="tw-paragraph text-black-60">
            Head of AI Engineering
          </span>
        </div>
      </div>
      <div>
        <motion.p className="tw-lead text-black mb-3">
          Technical Working Group
        </motion.p>
        <Link
          href="https://forum.dfinity.org/t/technical-working-group-deai/24621"
          className="link-primary link-with-icon md:text-nowrap"
        >
          Join the discussion <LinkArrowUpRight />
        </Link>
      </div>
    </aside>
  );
};

const features: FeatureCardProps[] = [
  {
    imageSrc: "/img/ai-chain/1a.svg",
    title: "Immune to cyber attacks.",
    description:
      "Sensitive AI models like in finance and public administration must be protected from centralized control, a prime cause for cyber attacks. ICP's decentralized infrastructure ensures integrity of AI models.",
  },
  {
    imageSrc: "/img/ai-chain/2a.svg",
    title: "Verifiable Inputs and Outputs.",
    description:
      "AI solutions built on ICP allow to verify inputs and outputs. For use cases like legal compliance, ICP ensures transparency with auditable, verifiable data.",
  },
  {
    imageSrc: "/img/ai-chain/3a.svg",
    title: "Privacy-preserving.",
    description:
      "ICP's encryption protects data processed by AI models, making AI useable for confidential data and complying with data protection standards.",
    badge: "coming soon",
  },
  {
    imageSrc: "/img/ai-chain/4a.svg",
    title: "Resilient.",
    description:
      " AI-driven operations like medical care need constant availability. ICP's decentralized smart contracts ensure high availability, keeping AI models secure and operational.",
  },
  {
    imageSrc: "/img/ai-chain/5a.svg",
    title: "AI-2-X Economy.",
    description:
      " AI models that run as smart contracts, enable them to autonomously participate in the digital economy by interacting with digital assets such as Bitcoin, Ethereum, Stablecoins, and ICP. This facilitates secure, transparent, and automated transactions and contract management without human intervention.",
  },
];

const roadmapData = [
  {
    number: "01",
    title: "Data storage to run large AI models",
    date: "",
  },
  {
    number: "02",
    title: "Optimized floating-point arithmetic for faster AI processing",
    date: "",
  },
  {
    number: "03",
    title: "Seamless Integration with Web 2.0",
    date: "",
  },
  {
    number: "04",
    title: "GPU acceleration for enterprise-grade AI workloads",
    date: "2025",
  },
];

const aiFeatures = [
  {
    number: "01",
    icon: "/img/ai-chain/1b.svg",
    title: "Infrastructure and resources",
    features: ["Compute marketplaces", "Data storage", "AI Smart Contracts"],
  },
  {
    number: "02",
    icon: "/img/ai-chain/2b.svg",
    title: "Development and training",
    features: ["AI development", "Model training", "Data marketplace"],
  },
  {
    number: "03",
    icon: "/img/ai-chain/3b.svg",
    title: "AI inference",
    features: ["Data analysis", "Content generation", "AI model marketplace"],
  },
  {
    number: "04",
    icon: "/img/ai-chain/4b.svg",
    title: "AI verification and security",
    features: [
      "Content provenance",
      "Model verification",
      "Regulatory compliance",
    ],
  },
];

const projects: {
  imageUrl: string;
  title: string;
  body: React.ReactNode;
  link: string;
}[] = [
  {
    title: "DecideAI",
    body: "DecideAI offers products that enhance the decentralized AI ecosystem, including Decide ID, an AI-powered Proof of Personhood, and Decide Cortex, a blockchain-based LLM marketplace.",
    link: "https://decideai.xyz/",
    imageUrl: "/img/ai-chain/decideai.webp",
  },
  {
    title: "Kinic",
    body: "Kinic's mission is to bring AI ownership to the world via personal AI. Kinic's Vector Database solution addresses a pressing need for tamperproof data to fine-tune LLM for queries.",
    link: "https://ai.kinic.io",
    imageUrl: "/img/ai-chain/kinic.webp",
  },
  {
    title: "Elna.ai",
    body: "ELNA provides the fundamental building blocks for AI development like vector database, LLM inference engines, and deployment tools — creators don't have to build from scratch, and instead use these tools to deploy part of their AI application onchain.",
    link: "https://www.elna.ai/",
    imageUrl: "/img/ai-chain/elnaai.webp",
  },
];

interface FaqData {
  question: string;
  answer: string;
}

const faqData: FaqData[] = [
  {
    question: "What is AI onchain and why is it important?",
    answer:
      "AI onchain refers to running AI models and applications directly on the blockchain, providing decentralized, tamper-proof, and transparent AI solutions. This approach ensures enhanced security, privacy, and data integrity, which are crucial for applications in sectors like finance, healthcare, and beyond.",
  },
  {
    question: "How does ICP enable AI onchain?",
    answer:
      "The Internet Computer (ICP) enables AI onchain through its unique architecture that supports scalable, secure, and fully decentralized smart contracts called canisters. These canisters allow AI models to run directly on the blockchain, eliminating the need for traditional cloud-based AI solutions.",
  },
  {
    question:
      "What are the benefits of running AI onchain compared to traditional methods?",
    answer:
      "Running AI onchain offers several benefits, including enhanced data privacy, resistance to censorship, reduced dependency on centralized cloud providers, and the ability to leverage blockchain's transparency and security features.",
  },
  {
    question:
      "How can developers get started with AI on the Internet Computer?",
    answer:
      "Developers can start by accessing our comprehensive resources, including developer documentation, sample code, demos, and our GitHub repository. These tools provide step-by-step guidance on building and deploying AI applications on ICP. In addition a good starting point is to connect to the DeAI dev group.",
  },
  {
    question:
      "What tools and programming languages are supported for developing AI on ICP?",
    answer:
      "ICP supports development in languages such as Motoko and Rust, which are optimized for creating and managing canisters. These canisters can run AI models and connect with external data sources, providing a flexible environment for AI development.",
  },
  {
    question: "What are the use cases for AI on ICP?",
    answer:
      "Use cases for AI on ICP span various industries, including finance, healthcare, supply chain management, and more. AI onchain can be used for applications such as fraud detection, predictive analytics, personalized medicine, and automated decision-making systems.",
  },
  {
    question:
      "What makes ICP different from other blockchains for AI applications?",
    answer:
      "ICP stands out due to its ability to run AI fully onchain, its scalability, and its low-cost computation. Unlike other blockchains that might rely on off-chain solutions, ICP offers a seamless, fully integrated environment for decentralized AI.",
  },
  {
    question:
      "How does ICP ensure the privacy and security of AI models and data?",
    answer:
      "ICP utilizes advanced cryptographic techniques and a decentralized architecture to protect AI models and data from tampering, unauthorized access, and data breaches, ensuring that sensitive information remains secure.",
  },
  {
    question: "Can existing AI models be deployed on ICP?",
    answer:
      "Yes, existing AI models can be adapted and deployed on ICP. Developers may need to convert their models into a compatible format and use ICP's canister technology to run them onchain.",
  },
  {
    question:
      "Where can I find community support and further learning resources?",
    answer:
      "Developers and entrepreneurs can join our community forums, attend workshops, and participate in webinars. Additionally, our website provides links to detailed tutorials, the latest updates, and a vibrant community ready to support your journey with AI on ICP.",
  },
];

const MotionLink = motion(Link);
const { events, websiteCategory, regions } = eventsData;

function AIPage() {
  const [manifestoModalOpen, setManifestoModalOpen] = useState(false);
  const [openProjectIndex, setOpenProjectIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#manifesto") {
      openOverlay();
    }
  }, [location]);

  function closeOverlay() {
    document.body.style.overflow = "";
    setManifestoModalOpen(false);
    // Remove the hash from the URL
    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }

  function openOverlay() {
    document.body.style.overflow = "hidden";
    setManifestoModalOpen(true);
    // Add #manifesto to the URL
    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search + "#manifesto"
    );
  }

  return (
    <Layout
      title="Secure and Trusted AI onchain"
      description="Powered by next generation Smart Contracts."
    >
      <ShareMeta image="/img/shareImages/share-ai-chain.webp"></ShareMeta>

      <main
        className="text-black relative bg-white"
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
              <div className="relative w-full sm:w-2/3 md:w-1/2 mb-4 md:mb-16">
                <img
                  src="/img/ai-chain/chain_logo_black.webp"
                  alt="ai chain logo"
                  className="pointer-events-none w-full block"
                />
              </div>
              <motion.p
                className="tw-lead md:tw-lead-lg md:mb-8"
                variants={transitions.item}
              >
                Secure and Trusted AI onchain
              </motion.p>

              <Link href="#ecosystem" className="link-primary">
                Fastest growing AI Ecosystem in Web3
              </Link>
              <motion.div
                className="flex flex-col md:flex-row my-15 md:my-32 text-left gap-10 md:gap-30"
                variants={transitions.item}
              >
                <motion.div className="w-full md:w-[45%] flex flex-col ">
                  <ImageOnlyVideoCard
                    href="https://www.youtube.com/watch?v=sdthNB-5yag"
                    image="/img/ai-chain/video_ai.webp"
                    className=""
                  />
                  <motion.p className="tw-lead-sm text-black/60 mt-1">
                    Dominic Williams on AI on ICP
                  </motion.p>
                </motion.div>
                <motion.p className="w-full md:w-[55%] tw-lead md:tw-lead-lg">
                  Al will be at the heart of everything, driving economies and
                  our daily lives. Al on ICP marks a major technological leap by
                  bringing{" "}
                  <span className="text-gradient-violet">Al onchain</span>,
                  ensuring decentralized, tamper-proof, and privacy-preserving
                  solutions that address critical issues like security,
                  transparency, and reliability.
                </motion.p>
              </motion.div>
            </div>
          </section>
        </AnimateSpawn>
        <section className="bg-[#F1EEF5] py-20 md:py-40">
          <AnimateSpawn
            className="container-10 relative"
            el={motion.section}
            variants={transitions.container}
          >
            <div className="md:w-8/10 mb-10 md:mb-20">
              <motion.h2
                className="tw-title-sm md:tw-title-lg mb-3 md:mb-6"
                variants={transitions.item}
              >
                AI onchain: a major technological leap
              </motion.h2>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0 text-black/60"
                variants={transitions.item}
              >
                ICP’s advanced AI on chain technology enables five key
                attributes that will drive transformative AI use cases across
                industries.
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
        <section className="bg-white py-20 md:py-40">
          <AnimateSpawn
            className="container-10 relative"
            el={motion.section}
            variants={transitions.container}
          >
            <motion.div
              className="md:w-8/10 mb-10 md:mb-20"
              variants={transitions.item}
            >
              <motion.h4 className="tw-heading-7-caps mb-4 md:mb-8 opacity-60">
                TECHNOLOGY
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
                    image="/img/decentralized-ai/thumb-ai-video-thumb3.webp"
                    title="On-chain Facial Recognition – AI running on ICP"
                    label="Demo"
                    link={`https://www.youtube.com/watch?v=hEFff_GGj30&list=PLuhDt1vhGcrfWz1ZJrAmJBDS6aFADySwt&index=3`}
                    description="The world's first demonstration of AI inference running directly on the blockchain, presented by Dominic Williams"
                  />
                </motion.div>
              </div>
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
                <div className="w-full md:w-1/2 flex flex-col justify-between order-1 md:order-2">
                  <div className="">
                    <motion.p className="tw-lead md:tw-lead-lg text-black-20 mb-6">
                      04
                    </motion.p>
                    <motion.span className="text-gradient-violet">
                      GPU acceleration for enterprise-grade AI workloads.{" "}
                    </motion.span>{" "}
                    <motion.span className="text-black/50">
                      ICP's next-gen smart contracts run on segregated parts of
                      the Internet Computer known as "subnets". The flexible
                      architecture of subnets allows the Internet Computer not
                      only to scale, but to also create subnets with different
                      characteristics. Work is underway to create subnets with
                      GPU acceleration, allowing smart contracts to run
                      enterprise-grade AI models directly onchain.
                    </motion.span>
                  </div>
                  <div className="self-start text-black-60 rounded-full bg-black-20 gap-[10px] px-4 mt-6 tw-paragraph">
                    coming soon
                  </div>
                </div>
              </article>
            </motion.div>
          </AnimateSpawn>
        </section>
        <section className="pb-20 md:pb-48">
          <AnimateSpawn
            className="container-12"
            el={motion.section}
            variants={transitions.container}
          >
            <div className="container-10 !px-0 flex flex-col gap-1  md:gap-5 mb-8 md:flex-row ">
              <motion.h2
                className="tw-title-sm md:w-[27rem]"
                variants={transitions.item}
              >
                AI Demos
              </motion.h2>
              <div className="md:flex-1 md:pt-1 ">
                <motion.p
                  className="mb-0 mt-2 tw-paragraph md:tw-lead-sm text-black-60 md:w-8/10"
                  variants={transitions.item}
                >
                  Dominic Williams, Chief Scientist and Founder of DFINITY
                  Foundation, demos advancements in AI smart contracts on ICP
                </motion.p>
                <MotionLink
                  variants={transitions.item}
                  href="https://www.youtube.com/watch?v=sdthNB-5yag&list=PLuhDt1vhGcrfWz1ZJrAmJBDS6aFADySwt"
                  className="link-primary link-with-icon mt-3"
                >
                  More videos on AI <LinkArrowUpRight />
                </MotionLink>
              </div>
            </div>

            <div className="mt-4 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
              <TitleVideoCard
                href="https://www.youtube.com/watch?v=6qLvIXiCGcM"
                image="https://i3.ytimg.com/vi/6qLvIXiCGcM/maxresdefault.jpg"
                className="flex-1"
                title="AI fully onchain"
              />
              <TitleVideoCard
                href="https://www.youtube.com/watch?v=kP893pQIQvY"
                image="https://i.ytimg.com/vi/kP893pQIQvY/maxresdefault.jpg"
                className="flex-1"
                title="Image classification speed boost"
              />
              <TitleVideoCard
                href="https://www.youtube.com/watch?v=hEFff_GGj30"
                image="https://i.ytimg.com/vi/hEFff_GGj30/maxresdefault.jpg"
                className="flex-1"
                title="Onchain Facial recognition"
              />
            </div>
          </AnimateSpawn>
        </section>
        <section
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), #3B00B9;",
          }}
          className="bg-[#0C0025] py-20 md:py-40 text-white"
        >
          <AnimateSpawn
            className="container-10 relative"
            el={motion.section}
            variants={transitions.container}
          >
            <motion.div
              className="md:w-8/10 mb-10 md:mb-20"
              variants={transitions.item}
            >
              <motion.h4
                className="tw-heading-7-caps mb-4 md:mb-8 opacity-60"
                id="ecosystem"
              >
                Ecosystem
              </motion.h4>
              <motion.h3 className="tw-title-sm md:tw-title-lg mb-4 md:mb-8">
                The fastest growing AI Ecosystem in Web3.
              </motion.h3>{" "}
              <motion.p className="tw-lead-sm md:tw-lead text-white/60 mb-4 md:mb-8">
                The ICP ecosystem is home to 60+ AI-related projects. These
                dapps cover the entire AI value chain from infrastructure,
                development and training, inference to verification and
                security. ICP's unique capabilities have made it a preferred
                platform for builders of AI dapps.
              </motion.p>
              <Link
                href="/ecosystem?tag=AI"
                className="text-white hover:text-white-80 tw-heading-6 hover:no-underline flex items-center gap-4"
              >
                <LinkArrowRight /> Fastest growing AI Ecosystem in Web3
              </Link>
            </motion.div>
            <ScrollableSection
              items={aiFeatures}
              type="aiFeatures"
              title="Our ecosystem is building projects along the entire AI value chain"
            />
            <motion.div className="">
              <motion.h3 className="tw-title-sm md:tw-title-lg">
                AI Ecosystem highlights
              </motion.h3>
              <section className="text-white mt-10 md:mt-20">
                <section className="relative  mb-20 md:mb-40">
                  <div className=" xl:min-h-[600px]">
                    <AnimateSpawn
                      variants={transitions.item}
                      className="flex overflow-auto sm:overflow-visible -mx-6 sm:mx-0 sm:gap-2/10 xl:relative sm:min-h-[40vw] xl:min-h-[450px]"
                    >
                      <div className="flex items-stretch gap-6 sm:flex-col sm:gap-10 mx-6 sm:mx-0 sm:pr-10 mb-6 sm:mb-0 sm:w-5/10 md:w-4/10">
                        {projects.map((p, i) => (
                          <Collapse
                            title={p.title}
                            open={openProjectIndex === i}
                            onClick={() => setOpenProjectIndex(i)}
                            link={p.link}
                          >
                            <div className="flex-1">
                              <div className="tw-paragraph">{p.body}</div>
                              <Link
                                href={p.link}
                                className="link-primary link-white link-with-icon cursor-pointer text-select-none mt-4 inline-flex items-center"
                              >
                                Visit website <LinkArrowUpRight />
                              </Link>
                            </div>
                            <img
                              src={projects[i].imageUrl}
                              alt={p.title}
                              className="sm:hidden mt-8 rounded-xl"
                            />
                          </Collapse>
                        ))}
                      </div>
                    </AnimateSpawn>
                  </div>
                  {projects.map((p, i) => (
                    <div
                      className="
              hidden sm:flex
              absolute
              transition-opacity
              top-0
              -right-6 xl:right-[calc(50%-440px)] xl:translate-x-1/2
              w-4/10
              max-w-[600px]
              "
                      style={{ opacity: i === openProjectIndex ? 1 : 0 }}
                    >
                      <img
                        className="rounded-xl"
                        src={p.imageUrl}
                        alt={p.title}
                      />
                    </div>
                  ))}
                </section>
              </section>
            </motion.div>
            <motion.div className="mt-20 md:mt-40">
              <article className="flex flex-col md:flex-row justify-start tw-lead-sm md:tw-lead">
                <div className="w-full md:w-1/2">
                  <div className="w-full sm:w-1/2 mx-auto md:w-[70%]">
                    <img
                      src="/img/ai-chain/deai-img.svg"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                  <div className="text-white mb-4 md:mb-8">
                    <motion.h3 className="tw-title-sm md:tw-title-lg mb-4 md:mb-8">
                      DeAI Manifesto
                    </motion.h3>
                    <motion.span className="tw-lead-sm md:tw-lead text-white-60 ">
                      Created by the ICP community, the DeAI manifesto lays out
                      the principles and reasons for decentralizing AI and
                      advocating for a fair, transparent, and user-centric AI
                      ecosystem. Join the movement!
                    </motion.span>
                  </div>
                  <Link
                    className="link-primary link-white link-with-icon cursor-pointer text-select-none"
                    onClick={openOverlay}
                  >
                    <LinkArrowRight /> Read the full manifesto{" "}
                  </Link>
                </div>
              </article>
            </motion.div>
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
            <Link
              href="https://twitter.com/dominic_w/status/1750886289702834539"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title: "AI models as smart contracts on a blockchain.",
                  dateHuman: "Jan 26, 2024",
                  press: "@dominic_w",
                  details: `#ICP says advanced AI models need to run as smart contracts on blockchain. How? Why? It's easiest to understand by example. Imagine an LLM (Large Language Model) AI that acts as a company oracle, which sits...`,
                  url: "https://twitter.com/dominic_w/status/1750886289702834539",
                  imageUrl: "/img/decentralized-ai/news-1.jpg",
                }}
                linkLabel="See the post"
              />
            </Link>
            <Link
              href="https://www.coindesk.com/consensus-magazine/2023/07/29/crypto-networks-reliant-on-aws-wont-bring-transparency-to-ai/"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title:
                    "AWS-Reliant Blockchains Won’t Bring Transparency to AI",
                  dateHuman: "Jul 29, 2023",
                  press: "Dominic Williams",
                  details: `The rapid progress of artificial intelligence (AI) has captivated the world, with many asking what is next for this technological breakthrough. While AI has already demonstrated its potential to transform various industries...`,
                  url: "https://www.coindesk.com/consensus-magazine/2023/07/29/crypto-networks-reliant-on-aws-wont-bring-transparency-to-ai/",
                  imageUrl: "/img/decentralized-ai/news-2.jpg",
                }}
                linkLabel="Read Now"
              />
            </Link>

            <Link
              href="https://www.fastcompany.com/91055087/bitcoin-ai-cryptos-gaining-value-cryptocurrency"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title: "AI-related crypto are quickly gaining value",
                  dateHuman: "Nov 03, 2024",
                  press: "fastcompany.com",
                  details: `Internet Computer (ICP) is the biggest AI crypto, by a wide margin. It’s a decentralized web platform whose goal is to build a secure network for public use—and it’s using large language models to help achieve that.`,
                  url: "https://www.fastcompany.com/91055087/bitcoin-ai-cryptos-gaining-value-cryptocurrency",
                  imageUrl: "/img/decentralized-ai/news-4.jpg",
                }}
                linkLabel="Read Now"
              />
            </Link>
            <Link
              href="https://metanews.com/decentralized-ai-offers-new-hope-for-user-data-security/"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title:
                    "Decentralized AI Offers New Hope for User Data Security",
                  dateHuman: "March 15, 2024",
                  press: "metanews.com",
                  details: `One of the biggest risks with the increased use of AI chatbots like ChatGPT is the emergence of new threats to user data. But some companies are starting to build decentralized AI systems that they hope will make personal data leaks...`,
                  url: "https://metanews.com/decentralized-ai-offers-new-hope-for-user-data-security/",
                  imageUrl: "/img/decentralized-ai/news-5.jpg",
                }}
                linkLabel="Read Now"
              />{" "}
            </Link>
            <Link
              href="https://www.cointribune.com/en/dfinity-is-revolutionizing-dapps-with-ai-on-icp/"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title: "DFINITY is revolutionizing dApps with AI on ICP!",
                  dateHuman: "Sat 16 Mar 2024",
                  press: "cointribune.com",
                  details: `DFINITY, the foundation behind the innovative Internet Computer Protocol (ICP), has just unveiled a remarkable opportunity for decentralized application (dApp) developers. This new feature involves the ability to integrate OpenAI’s...`,
                  url: "https://www.cointribune.com/en/dfinity-is-revolutionizing-dapps-with-ai-on-icp/",
                  imageUrl: "/img/decentralized-ai/news-6.jpg",
                }}
                linkLabel="Read Now"
              />{" "}
            </Link>
            <Link
              href="https://www.cointribune.com/en/dfinity-is-revolutionizing-dapps-with-ai-on-icp/"
              className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
            >
              <NewsCard
                news={{
                  title:
                    "The Next Step for DeAI: On-Chain Inference Enabling Face Recognition",
                  dateHuman: "July 15,2024",
                  press: "DFINITY",
                  details: `The replica version e4eeb3 that was approved by the community in Proposal 13094 completes the Cyclotron milestone from ICP’s roadmap.`,
                  url: "https://medium.com/dfinity/the-next-step-for-deai-on-chain-inference-enabling-face-recognition-589183203fc2",
                  imageUrl: "/img/decentralized-ai/news-7.webp",
                }}
                linkLabel="Read Now"
              />{" "}
            </Link>
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
              href: "/docs/current/developer-docs/ai/overview",
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
