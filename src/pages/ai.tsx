import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
import LinkArrowUp from "../components/Common/Icons/LinkArrowUp";
import LinkArrowDown from "../components/Common/Icons/LinkArrowDown";
import ChevronDown from "../components/Common/Icons/ChevronDown";
import ChevronUp from "../components/Common/Icons/ChevronUp";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../components/LandingPage/Hero/SectionSlider/index.css";

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
    <section className="snap-start min-w-64 flex flex-col justify-between flex-1 p-3 md:p-6 pb-5 md:pb-10 bg-[#F1EEF5] rounded-xl md:min-h-[320px]">
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
    <article className="snap-start flex flex-col flex-shrink-0 w-[80vw] sm:w-auto sm:flex-1 justify-between bg-white rounded-xl p-6 pb-10">
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
      <div className={`flex -mx-6 px-4 pl-6`}>
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 snap-start snap-mandatory snap-x ${
            type === "roadmap" ? "pb-4 md:pb-0 md:overflow-x-visible" : " "
          } overflow-x-auto hide-scrollbar`}
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

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.article
      initial={false}
      animate={{ backgroundColor: isOpen ? "#F1EEF5" : "#FFFFFF" }}
      className={`flex flex-col rounded-xl mb-4 text-black overflow-hidden border-solid border-[1px] border-[#F1EEF5]`}
    >
      <header
        className="flex w-full items-center gap-6 tw-lead-sm justify-between p-6 cursor-pointer select-none"
        onClick={toggleOpen}
      >
        <div className="flex-1">{question}</div>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-black" />
        ) : (
          <ChevronDown className="w-6 h-6 text-black" />
        )}
      </header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 !pt-0">
              <p className="tw-paragraph !mb-0">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
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
      "The integrity of AI models is protected by the blockchain. Unauthorized changes and tampering is not possible, which is crucial for applications in sensitive sectors.",
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
  {
    imageSrc: "/img/ai-chain/6a.svg",
    title: "DAO-controlled.",
    description:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Curabitur blandit tempus porttitor.",
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

const heroFeatures = [
  "Immune to cyber attacks",
  "Resilient",
  "Verifiable",
  "DAO-controlled",
  "Privacy-preserving",
  "AI-2-X Economy",
];

const HeroFeaturesList = () => {
  return (
    <div className="mt-6 md:mt-10 flex flex-wrap justify-center items-center gap-2 tw-paragraph-sm md:tw-lead-sm">
      {heroFeatures.map((feature, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && (
            <svg
              className="w-3 h-3 mr-2"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.91786 7.46757C2.36071 7.36887 2.36071 6.56818 2.91786 6.47108C3.90745 6.29919 4.82341 5.83643 5.54891 5.14182C6.27442 4.44722 6.77659 3.55225 6.99137 2.57108L7.0232 2.41667C7.14578 1.8643 7.93055 1.85953 8.0579 2.4119L8.09769 2.59177C8.32073 3.56851 8.82745 4.45754 9.55419 5.14718C10.2809 5.83682 11.1953 6.2963 12.1823 6.4679C12.7427 6.565 12.7427 7.37206 12.1823 7.47075C11.1953 7.64235 10.2809 8.10183 9.55419 8.79147C8.82745 9.4811 8.32073 10.3701 8.09769 11.3469L8.05631 11.5252C7.93055 12.0759 7.14577 12.0728 7.0248 11.5204L6.99137 11.3676C6.77659 10.3864 6.27442 9.49143 5.54891 8.79683C4.82341 8.10222 3.90745 7.63946 2.91786 7.46757Z"
                fill="url(#paint0_radial_18104_70967)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_18104_70967"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(12.6084 1.51994) rotate(-60.9412) scale(16.6679 18.5336)"
                >
                  <stop stop-color="#FFD8EA" />
                  <stop offset="0.33" stop-color="#E51E79" />
                  <stop offset="0.66" stop-color="#522780" />
                  <stop offset="1" stop-color="#181818" />
                </radialGradient>
              </defs>
            </svg>
          )}

          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
};

const sliderData = [
  {
    title: "DecideAI implements GPT-2 LLM within ICP",
    source: "Cryptonomist",
    image: "/img/ai-chain/slider-1.svg",
    link: "https://en.cryptonomist.ch/2024/08/29/crypto-and-ai-decideai-implements-the-linguistic-model-gpt-2-llm-within-the-blockchain-internet-computer-icp/",
  },
  {
    title: "DFINITY Foundation Offering $5M Grant to boost DeAI",
    source: "AlexaBlockchain",
    image: "/img/ai-chain/slider-2.svg",
    link: "https://alexablockchain.com/dfinity-foundation-offering-5m-grant-to-boost-decentralized-ai/",
  },
  {
    title: "ELNA — Build Your-own AI Assistant on ICP",
    source: "Elna.ai",
    image: "/img/ai-chain/slider-3.svg",
    link: "https://www.elna.ai/index.html#news",
  },
  {
    title: "Dominic Williams unveils World-first AI onchain demo",
    source: "Youtube.com/dfinity",
    image: "/img/ai-chain/slider-4.svg",
    link: "https://www.youtube.com/watch?v=sdthNB-5yag&list=PLuhDt1vhGcrfWz1ZJrAmJBDS6aFADySwt",
  },
];

const buttonStyle = {
  background: "rgba(255 255 255 / 10%)",
  color: "black",
  backdropFilter: "blur(20px)",
  width: "3rem",
  height: "3rem",
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...buttonStyle }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          fill="#fff"
          d="m16.38 12-4.75-8.97-1.76.94L14.12 12l-4.25 8.03 1.76.94L16.38 12Z"
        />
      </svg>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...buttonStyle }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          fill="#fff"
          d="m16.38 12-4.75-8.97-1.76.94L14.12 12l-4.25 8.03 1.76.94L16.38 12Z"
        />
      </svg>
    </div>
  );
}

const CardWithImage: React.FC<{
  title: string;
  source: string;
  image: string;
  href: string;
}> = ({ title, source, image, href }) => {
  return (
    <MotionLink
      variants={transitions.item}
      to={href}
      className="bg-[#0C0025] text-white rounded-xl flex hover:no-underline transition-all hover:text-white relative overflow-hidden"
    >
      <div className="pl-4 md:pl-8 md:hover:-translate-y-2 transition-transform relative z-10 flex md:min-w-[240px] flex-1 flex-col justify-center">
        <h2 className="text-white tw-lead-sm mb-0 line-clamp-2 md:line-clamp-3 lg:line-clamp-3">
          {title}
        </h2>
        <p className="tw-caption text-white/60 mb-0">{source}</p>
      </div>
      <img
        loading="lazy"
        src={image}
        alt=""
        className="aspect-square w-28 md:w-32 self-stretch object-contain object-center"
      />
    </MotionLink>
  );
};

const css = `
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  .slick-prev svg,
  .slick-next svg {
    transform: scale(.5);
    transition: transform .2s cubic-bezier(0.3, 0.7, 0, 1);
  }

  .slick-prev svg {
    transform: rotate(180deg) scale(.5);
  }

  .slick-prev:hover svg,
  .slick-next:hover svg {
    transform: scale(.7);
  }

  .slick-prev:hover svg {
    transform: rotate(180deg) scale(.7);
  }

  .slick-dots {
    bottom: -3rem;
  }

  .slick-dots li button:before {
    display: none;
  }

  .slick-dots li {
      margin: 0;
  }

  .slick-dots li button {
    background: rgba(24, 24, 24, 0.30);
    border: none;
  }

  .slick-dots li.slick-active button {
    background: #181818;
  }


`;

const SectionSlider = () => {
  let sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    padding: "20px",
    centerPadding: "20px",
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <style>{css}</style>
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        {sliderData.map((data, index) => (
          <article key={index} className="border-box px-3">
            <CardWithImage
              title={data.title}
              source={data.source}
              href={data.link}
              image={data.image}
            ></CardWithImage>
          </article>
        ))}
      </Slider>
    </div>
  );
};

const MotionLink = motion(Link);
const AnimatedCountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });

      let start = 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        setCount(Math.floor(start));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, controls]);

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-gradient-violet tw-title-sm md:tw-title-lg mb-0"
    >
      {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}x
    </motion.p>
  );
};

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
      description="Al on ICP marks a major technological leap by bringing Al onchain, ensuring decentralized, tamper-proof, and privacy-preserving solutions that address critical issues like security, transparency, and reliability."
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
          <section className="container-10 mt-48 md:mt-60 mb-32 relative">
            <div className="flex justify-center flex-col items-center text-center">
              <svg
                viewBox="0 0 587 106"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full md:w-1/2"
              >
                <path
                  d="M80.4716 103L69.6916 75.28H25.7316L15.2316 103H0.53155L40.0116 3.73999H55.8316L95.3116 103H80.4716ZM47.5716 18.02L30.6316 62.54H64.7916L47.5716 18.02ZM116.583 103H102.583V3.73999H116.583V103ZM188.962 93.34C200.162 93.34 209.962 84.94 209.962 69.26C209.962 53.72 200.162 45.32 188.962 45.32C177.762 45.32 167.962 53.72 167.962 69.26C167.962 84.94 177.762 93.34 188.962 93.34ZM188.962 33.56C209.122 33.56 223.402 48.82 223.402 69.26C223.402 89.84 209.122 105.1 188.962 105.1C168.802 105.1 154.522 89.84 154.522 69.26C154.522 48.82 168.802 33.56 188.962 33.56ZM244.973 64.08V103H231.813V35.66H244.693V45.32C249.593 36.92 257.573 33.7 265.413 33.7C281.513 33.7 289.493 45.32 289.493 60.3V103H276.333V62.54C276.333 53.16 272.413 45.6 260.653 45.6C250.293 45.6 244.973 53.86 244.973 64.08ZM331.016 45.74C320.376 45.74 310.576 53.58 310.576 69.26C310.576 84.66 320.236 92.92 331.156 92.92C343.756 92.92 348.376 84.38 349.916 79.06L361.536 84.1C358.316 93.76 348.656 105.1 331.156 105.1C311.556 105.1 297.136 89.7 297.136 69.26C297.136 48.26 311.836 33.56 331.016 33.56C348.936 33.56 358.176 44.76 360.976 54.98L349.076 60.02C347.396 53.44 342.496 45.74 331.016 45.74ZM381.845 63.38V103H368.685V1.63999H381.845V43.5C386.745 36.36 394.585 33.7 402.285 33.7C418.385 33.7 426.365 45.32 426.365 60.3V103H413.205V62.54C413.205 53.16 409.285 45.6 397.525 45.6C387.445 45.6 382.125 53.44 381.845 63.38ZM434.008 84.94C434.008 72.9 442.828 66.18 454.448 64.5L472.648 61.84C476.708 61.28 477.828 59.18 477.828 56.8C477.828 50.22 473.488 44.76 463.268 44.76C454.028 44.76 448.848 50.5 448.008 58.34L435.408 55.4C436.808 42.52 448.428 33.56 462.988 33.56C483.148 33.56 490.988 45.04 490.988 58.2V91.94C490.988 97.82 491.548 101.32 491.828 103H478.948C478.668 101.32 478.248 98.8 478.248 93.9C475.308 98.66 468.588 105.1 456.548 105.1C442.828 105.1 434.008 95.58 434.008 84.94ZM458.368 94.04C469.148 94.04 477.828 88.86 477.828 74.16V71.08L457.248 74.16C451.648 75 447.448 78.22 447.448 84.24C447.448 89.28 451.648 94.04 458.368 94.04ZM516.389 103H503.369V35.66H516.389V103ZM500.429 10.18C500.429 4.86 504.629 0.659999 509.809 0.659999C515.129 0.659999 519.329 4.86 519.329 10.18C519.329 15.36 515.129 19.56 509.809 19.56C504.629 19.56 500.429 15.36 500.429 10.18ZM542.445 64.08V103H529.285V35.66H542.165V45.32C547.065 36.92 555.045 33.7 562.885 33.7C578.985 33.7 586.965 45.32 586.965 60.3V103H573.805V62.54C573.805 53.16 569.885 45.6 558.125 45.6C547.765 45.6 542.445 53.86 542.445 64.08Z"
                  fill="url(#paint0_radial_18102_70820)"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_18102_70820"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(597.342 17.6181) rotate(-12.0698) scale(490.861 262.872)"
                  >
                    <stop stop-color="#FFD8EA" />
                    <stop offset="0.33" stop-color="#E51E79" />
                    <stop offset="0.66" stop-color="#522780" />
                    <stop offset="1" stop-color="#181818" />
                  </radialGradient>
                </defs>
              </svg>

              <svg
                viewBox="0 0 374 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-8 w-2/3 md:w-1/3"
              >
                <path
                  d="M1.6504 19.8192V24.6694H0.0146484V12.8008H4.33226C6.5196 12.8008 8.00319 14.3224 8.00319 16.3195C8.00319 18.3357 6.53862 19.8192 4.33226 19.8192H1.6504ZM4.02794 18.3357C5.45447 18.3357 6.3294 17.5558 6.3294 16.3195C6.3294 15.0642 5.45447 14.2653 4.02794 14.2653H1.6504V18.3357H4.02794Z"
                  fill="#181818"
                />
                <path
                  d="M16.944 20.6378C16.944 23.0916 15.232 24.9177 12.8353 24.9177C10.4195 24.9177 8.72656 23.0916 8.72656 20.6378C8.72656 18.203 10.4385 16.377 12.8353 16.377C15.232 16.377 16.944 18.184 16.944 20.6378ZM15.3271 20.6378C15.3271 18.7737 14.1478 17.7846 12.8162 17.7846C11.4847 17.7846 10.3054 18.7927 10.3054 20.6378C10.3054 22.521 11.4847 23.5101 12.8162 23.5101C14.1668 23.5101 15.3271 22.5019 15.3271 20.6378Z"
                  fill="#181818"
                />
                <path
                  d="M25.1774 16.625L27.2697 22.6925L29.0385 16.625H30.6933L28.0875 24.6706H26.4708L24.3215 18.546L22.2293 24.6706H20.5745L17.9307 16.625H19.6615L21.4685 22.6925L23.5607 16.625H25.1774Z"
                  fill="#181818"
                />
                <path
                  d="M39.3669 22.3692C38.9104 23.7959 37.6169 24.9181 35.7528 24.9181C33.5843 24.9181 31.7012 23.3393 31.7012 20.6193C31.7012 18.0894 33.5273 16.3584 35.5436 16.3584C38.0164 16.3584 39.405 18.0703 39.405 20.5812C39.405 20.7904 39.386 20.9807 39.3669 21.0758H33.299C33.337 22.5214 34.3642 23.5105 35.7338 23.5105C37.0463 23.5105 37.693 22.7877 37.9974 21.8937L39.3669 22.3692ZM37.7691 19.8203C37.7311 18.66 36.9892 17.766 35.5626 17.766C34.2311 17.766 33.4322 18.7932 33.3751 19.8203H37.7691Z"
                  fill="#181818"
                />
                <path
                  d="M45.852 18.2041C45.6237 18.1661 45.3764 18.1471 45.1672 18.1471C43.8356 18.1471 42.9607 18.8509 42.9607 20.6199V24.6715H41.3818V16.6253H42.9226V18.0329C43.5123 16.7965 44.5204 16.4922 45.3384 16.4922C45.5476 16.4922 45.7759 16.5302 45.852 16.5493V18.2041Z"
                  fill="#181818"
                />
                <path
                  d="M54.4509 22.3712C53.9944 23.7978 52.7009 24.9201 50.8368 24.9201C48.6683 24.9201 46.7852 23.3413 46.7852 20.6212C46.7852 18.0913 48.6112 16.3604 50.6276 16.3604C53.1004 16.3604 54.489 18.0723 54.489 20.5832C54.489 20.7924 54.4699 20.9826 54.4509 21.0777H48.402C48.4401 22.5234 49.4672 23.5125 50.8368 23.5125C52.1493 23.5125 52.796 22.7897 53.1004 21.8957L54.4509 22.3712ZM52.8531 19.8223C52.8151 18.662 52.0732 17.768 50.6466 17.768C49.315 17.768 48.5161 18.7951 48.4591 19.8223H52.8531Z"
                  fill="#181818"
                />
                <path
                  d="M62.2659 23.4533C61.8855 24.2141 61.0296 24.8988 59.7743 24.8988C57.4157 24.8988 55.9512 23.0158 55.9512 20.6383C55.9512 18.3559 57.4918 16.4158 59.7743 16.4158C61.2008 16.4158 61.9616 17.1195 62.2279 17.7662V12.5547H63.7876V23.187C63.7876 23.9478 63.8636 24.5374 63.8636 24.6706H62.342C62.304 24.4804 62.2659 24.0619 62.2659 23.5864V23.4533ZM59.9264 23.4913C61.372 23.4913 62.2469 22.236 62.2469 20.5812C62.2469 18.9265 61.372 17.7853 59.9454 17.7853C58.4999 17.7853 57.5679 18.9645 57.5679 20.6193C57.5679 22.274 58.4048 23.4913 59.9264 23.4913Z"
                  fill="#181818"
                />
                <path
                  d="M70.5625 24.6706V12.5547H72.1222V17.7662C72.5026 17.0435 73.4536 16.3968 74.785 16.3968C77.2196 16.3968 78.475 18.2798 78.475 20.6193C78.475 23.0158 77.1245 24.8988 74.728 24.8988C73.5487 24.8988 72.6167 24.3853 72.1222 23.5103V24.6706H70.5625ZM74.4997 17.7662C73.1112 17.7662 72.1031 18.8504 72.1031 20.6002C72.1031 22.3501 73.1112 23.4723 74.4997 23.4723C75.9453 23.4723 76.8773 22.3311 76.8773 20.6002C76.8773 18.8694 75.9643 17.7662 74.4997 17.7662Z"
                  fill="#181818"
                />
                <path
                  d="M80.7181 28.0375L82.7344 23.7766L79.2725 16.6055H81.0795L83.5904 22.1598L86.0062 16.6055H87.6991L82.4681 28.0185H80.7181V28.0375Z"
                  fill="#181818"
                />
                <path
                  d="M181.032 20.0194C181.032 9.53217 172.241 1 161.453 1C156.956 1 152.058 3.30611 146.87 7.85259C144.417 10.0021 142.29 12.3012 140.693 14.15C135.085 7.90293 127.564 1 120.058 1C110.986 1 103.075 7.28201 101.017 15.6058C101.019 15.5988 101.022 15.589 101.025 15.5792C101.022 15.589 101.019 15.5974 101.017 15.6058C100.659 17.0498 100.479 18.5319 100.479 20.0194C100.479 30.5067 109.131 39.0389 119.918 39.0389C124.416 39.0389 129.453 36.7328 134.642 32.1863C137.095 30.0368 139.222 27.7377 140.819 25.8889C146.427 32.1359 153.949 39.0389 161.455 39.0389C170.527 39.0389 178.438 32.7569 180.497 24.4345C180.848 23.0164 181.034 21.5382 181.034 20.0208L181.032 20.0194ZM142.198 14.1304C144.031 12.062 145.849 10.2356 147.608 8.69448C152.587 4.3312 157.245 2.11879 161.453 2.11879C171.633 2.11879 179.913 10.1489 179.913 20.0194C179.913 21.4039 179.747 22.787 179.417 24.1324C179.364 24.2876 178.686 26.1448 176.753 27.9503C174.243 30.2955 170.84 31.4856 166.639 31.487C171.158 29.5236 174.318 25.1127 174.318 20.0194C174.318 13.0955 168.547 7.46381 161.453 7.46381C158.689 7.46381 155.304 9.20213 151.39 12.6326C149.629 14.1765 147.846 15.9918 145.964 18.1608L145.225 19.0083L141.443 14.9625L142.198 14.1318V14.1304ZM135.506 20.2068C134.012 21.9801 131.859 24.3967 129.383 26.5658C124.771 30.6088 121.773 31.4563 120.058 31.4563C113.589 31.4563 108.312 26.3252 108.312 20.0194C108.312 13.7136 113.583 8.62176 120.058 8.5826C120.293 8.5826 120.577 8.60637 120.921 8.66791C124.258 9.94752 127.238 11.9893 129.038 13.6367C130.485 14.9625 133.108 17.6756 135.505 20.2054L135.506 20.2068ZM139.314 25.9085C137.479 27.9768 135.663 29.8032 133.903 31.3444C128.995 35.6461 124.159 37.9201 119.918 37.9201C115.003 37.9201 110.393 36.0531 106.936 32.6632C103.493 29.2872 101.598 24.7967 101.598 20.0194C101.598 18.6349 101.766 17.2504 102.095 15.9065C102.151 15.7457 102.829 13.8913 104.759 12.0886C107.269 9.74334 110.672 8.55323 114.873 8.55183C110.354 10.5153 107.194 14.9261 107.194 20.0194C107.194 26.9433 112.965 32.5751 120.058 32.5751C122.823 32.5751 126.207 30.8367 130.122 27.4062C131.882 25.8623 133.666 24.0471 135.548 21.878L136.285 21.0291C136.285 21.0291 140.012 25.0148 140.052 25.0596L139.313 25.9085H139.314ZM146.006 19.832C147.499 18.0588 149.653 15.6422 152.128 13.4731C156.741 9.43008 159.739 8.5826 161.453 8.5826C167.923 8.5826 173.199 13.7136 173.199 20.0194C173.199 26.3252 167.928 31.4171 161.453 31.4563C161.219 31.4563 160.935 31.4325 160.589 31.371C160.592 31.371 160.593 31.3724 160.596 31.3738C157.257 30.0941 154.274 28.0509 152.472 26.4021C151.025 25.0764 148.403 22.3633 146.004 19.8334L146.006 19.832ZM180.488 24.454C180.491 24.447 180.492 24.4387 180.495 24.4331C180.494 24.4387 180.491 24.447 180.488 24.454Z"
                  fill="#181818"
                />
                <path
                  d="M101.017 15.6058C103.075 7.28201 110.986 1 120.058 1C127.564 1 135.085 7.90293 140.693 14.15C142.29 12.3012 144.417 10.0021 146.87 7.85259C152.058 3.30611 156.956 1 161.453 1C172.241 1 181.032 9.53217 181.032 20.0194L181.034 20.0208C181.034 21.5382 180.848 23.0164 180.497 24.4345C178.438 32.7569 170.527 39.0389 161.455 39.0389C153.949 39.0389 146.427 32.1359 140.819 25.8889C139.222 27.7377 137.095 30.0368 134.642 32.1863C129.453 36.7328 124.416 39.0389 119.918 39.0389C109.131 39.0389 100.479 30.5067 100.479 20.0194C100.479 18.5319 100.659 17.0498 101.017 15.6058ZM101.017 15.6058C101.019 15.5988 101.022 15.589 101.025 15.5792C101.022 15.589 101.019 15.5974 101.017 15.6058ZM142.198 14.1304C144.031 12.062 145.849 10.2356 147.608 8.69448C152.587 4.3312 157.245 2.11879 161.453 2.11879C171.633 2.11879 179.913 10.1489 179.913 20.0194C179.913 21.4039 179.747 22.787 179.417 24.1324C179.364 24.2876 178.686 26.1448 176.753 27.9503C174.243 30.2955 170.84 31.4856 166.639 31.487C171.158 29.5236 174.318 25.1127 174.318 20.0194C174.318 13.0955 168.547 7.46381 161.453 7.46381C158.689 7.46381 155.304 9.20213 151.39 12.6326C149.629 14.1765 147.846 15.9918 145.964 18.1608L145.225 19.0083L141.443 14.9625L142.198 14.1318V14.1304ZM135.506 20.2068C134.012 21.9801 131.859 24.3967 129.383 26.5658C124.771 30.6088 121.773 31.4563 120.058 31.4563C113.589 31.4563 108.312 26.3252 108.312 20.0194C108.312 13.7137 113.583 8.62176 120.058 8.5826C120.293 8.5826 120.577 8.60637 120.921 8.66791C124.258 9.94752 127.238 11.9893 129.038 13.6367C130.485 14.9625 133.108 17.6756 135.505 20.2054L135.506 20.2068ZM139.314 25.9085C137.479 27.9768 135.663 29.8032 133.903 31.3444C128.995 35.6461 124.159 37.9201 119.918 37.9201C115.003 37.9201 110.393 36.0531 106.936 32.6632C103.493 29.2872 101.598 24.7967 101.598 20.0194C101.598 18.6349 101.766 17.2504 102.095 15.9065C102.151 15.7457 102.829 13.8913 104.759 12.0886C107.269 9.74334 110.672 8.55323 114.873 8.55183C110.354 10.5153 107.194 14.9261 107.194 20.0194C107.194 26.9433 112.965 32.5751 120.058 32.5751C122.823 32.5751 126.207 30.8367 130.122 27.4062C131.882 25.8623 133.666 24.0471 135.548 21.878L136.285 21.0291C136.285 21.0291 140.012 25.0148 140.052 25.0596L139.313 25.9085H139.314ZM146.006 19.832C147.499 18.0588 149.653 15.6422 152.128 13.4731C156.741 9.43008 159.739 8.5826 161.453 8.5826C167.923 8.5826 173.199 13.7137 173.199 20.0194C173.199 26.3252 167.928 31.4171 161.453 31.4563C161.219 31.4563 160.935 31.4325 160.589 31.371C160.592 31.371 160.593 31.3724 160.596 31.3738C157.257 30.0941 154.274 28.0509 152.472 26.4021C151.025 25.0764 148.403 22.3633 146.004 19.8334L146.006 19.832ZM180.488 24.454C180.491 24.447 180.492 24.4387 180.495 24.4331C180.494 24.4387 180.491 24.447 180.488 24.454Z"
                  stroke="#181818"
                  stroke-width="0.559395"
                />
                <path
                  d="M193.779 26.2374V14.5771H196.918V26.2374H193.779Z"
                  fill="#181818"
                />
                <path
                  d="M206.619 26.2374L202.567 19.3135V26.2374H199.523V14.5771H203.081L206.714 20.9114V14.5771H209.776V26.2374H206.619Z"
                  fill="#181818"
                />
                <path
                  d="M217.859 17.4875V26.2374H214.778V17.4875H211.43V14.5771H221.245V17.4875H217.859Z"
                  fill="#181818"
                />
                <path
                  d="M222.882 26.2374V14.5771H230.357V17.2402H225.944V19.0853H229.958V21.6532H225.944V23.5364H230.376V26.2565H222.882V26.2374Z"
                  fill="#181818"
                />
                <path
                  d="M232.56 26.2374V14.5771H237.486C239.864 14.5771 241.405 16.1559 241.405 18.3244C241.405 19.9032 240.53 21.0635 239.255 21.5771L241.462 26.2374H238.114L236.269 22.0146H235.622V26.2374H232.56ZM236.916 19.6369C237.829 19.6369 238.323 19.1043 238.323 18.3625C238.323 17.6206 237.848 17.107 236.916 17.107H235.641V19.6179H236.916V19.6369Z"
                  fill="#181818"
                />
                <path
                  d="M250.498 26.2374L246.447 19.3135V26.2374H243.403V14.5771H246.96L250.594 20.9114V14.5771H253.656V26.2374H250.498Z"
                  fill="#181818"
                />
                <path
                  d="M256.262 26.2374V14.5771H263.737V17.2402H259.324V19.0853H263.338V21.6532H259.324V23.5364H263.775V26.2565H256.262V26.2374Z"
                  fill="#181818"
                />
                <path
                  d="M271.954 17.4875V26.2374H268.854V17.4875H265.506V14.5771H275.321V17.4875H271.954Z"
                  fill="#181818"
                />
                <path
                  d="M282.87 20.4175C282.87 22.3576 284.259 23.4798 285.666 23.4798C287.283 23.4798 287.968 22.4717 288.215 21.6538L291.106 22.4907C290.65 24.2216 289.09 26.485 285.647 26.485C282.414 26.485 279.675 24.1265 279.675 20.4366C279.675 16.7276 282.452 14.3311 285.609 14.3311C288.957 14.3311 290.497 16.3662 290.973 18.1161L288.12 19.0861C287.911 18.3063 287.283 17.2982 285.628 17.2982C284.335 17.2792 282.87 18.2873 282.87 20.4175Z"
                  fill="#181818"
                />
                <path
                  d="M298.087 14.3311C301.302 14.3311 304.079 16.6325 304.079 20.4175C304.079 24.2026 301.302 26.504 298.087 26.504C294.873 26.504 292.096 24.2026 292.096 20.4175C292.096 16.6325 294.873 14.3311 298.087 14.3311ZM298.087 23.5178C299.457 23.5178 300.902 22.5478 300.902 20.3985C300.902 18.2682 299.457 17.2982 298.087 17.2982C296.718 17.2982 295.272 18.2682 295.272 20.3985C295.272 22.5478 296.718 23.5178 298.087 23.5178Z"
                  fill="#181818"
                />
                <path
                  d="M316.269 26.239V19.0113L313.72 26.239H311.285L308.737 19.0874V26.22H305.808V14.5605H309.897L312.522 21.6741L315.013 14.5605H319.217V26.22H316.269V26.239Z"
                  fill="#181818"
                />
                <path
                  d="M324.905 22.2453V26.2208H321.843V14.5605H326.503C328.938 14.5605 330.593 16.1584 330.593 18.4029C330.593 20.7045 328.938 22.2453 326.503 22.2453H324.905ZM326.104 19.6964C326.903 19.6964 327.511 19.2209 327.511 18.4219C327.511 17.604 326.922 17.1475 326.104 17.1475H324.924V19.6964H326.104Z"
                  fill="#181818"
                />
                <path
                  d="M332.189 21.956V14.5762H335.271V21.8609C335.271 23.0212 335.86 23.6298 336.887 23.6298C337.915 23.6298 338.485 23.0212 338.485 21.8609V14.5762H341.566V21.956C341.566 24.8851 339.607 26.5019 336.887 26.5019C334.168 26.5019 332.189 24.8851 332.189 21.956Z"
                  fill="#181818"
                />
                <path
                  d="M349.63 17.4875V26.2374H346.529V17.4875H343.182V14.5771H352.997V17.4875H349.63Z"
                  fill="#181818"
                />
                <path
                  d="M354.652 26.2374V14.5771H362.128V17.2402H357.715V19.0853H361.728V21.6532H357.715V23.5364H362.166V26.2565H354.652V26.2374Z"
                  fill="#181818"
                />
                <path
                  d="M364.446 26.2374V14.5771H369.373C371.751 14.5771 373.291 16.1559 373.291 18.3244C373.291 19.9032 372.416 21.0635 371.142 21.5771L373.348 26.2374H369.982L368.137 22.0146H367.49V26.2374H364.446ZM368.783 19.6369C369.696 19.6369 370.191 19.1043 370.191 18.3625C370.191 17.6206 369.715 17.107 368.783 17.107H367.509V19.6179H368.783V19.6369Z"
                  fill="#181818"
                />
              </svg>
              <HeroFeaturesList />
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
          <motion.div className="relative -mt-48 md:-mt-72">
            <motion.h4 className="tw-lead-sm md:tw-lead flex justify-center">
              Latest Ecosystem news
            </motion.h4>
            <SectionSlider />
          </motion.div>

          <AnimateSpawn
            className="container-10 relative mt-24 md:mt-40"
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
                ICP’s advanced AI onchain technology enables six key
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
              <motion.h3 className="tw-title-sm md:tw-title-lg mb-4 md:mb-8">
                R&D at the core of Internet Computer’s AI innovation
              </motion.h3>{" "}
              <motion.p className="tw-lead-sm md:tw-lead text-black/60 mb-4 md:mb-8">
                AI onchain is made possible by the unique technological
                capabilities of the Internet Computer Protocol (ICP). Running AI
                as a smart contract on a blockchain is a significant innovation
                that is based on DFINITY Foundation’s significant R&D efforts in
                this domain. Over the past 6 months, AI computations have been
                optimized to run up to 10x faster, enabling larger models to run
                onchain.
              </motion.p>
              <Link
                href="/roadmap"
                className="link-primary link-with-icon text-nowrap"
              >
                <LinkArrowRight /> More on AI Roadmap
              </Link>
            </motion.div>

            <ScrollableSection items={roadmapData} type="roadmap" />

            <motion.div className="flex flex-col gap-16 md:gap-30">
              <article className="flex flex-col md:flex-row justify-start tw-lead-sm md:tw-lead">
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                  <div className="mb-6 md:mb-14">
                    <motion.p className="tw-lead md:tw-lead-lg text-black-20 mb-6">
                      01
                    </motion.p>
                    <motion.span className="text-gradient-violet">
                      Data storage to run large AI models.{" "}
                    </motion.span>{" "}
                    <motion.span className="text-black/50">
                      ICP’s next-gen smart contracts can store and process
                      gigabytes of data, unlike traditional smart contracts that
                      can only handle kilobytes. This is required for storing
                      and executing large AI models as well as processing large
                      amounts of input data.
                    </motion.span>
                  </div>
                  <div className="text-left">
                    <AnimatedCountUp end={1000000} />
                    <motion.p className="text-black tw-lead-sm md:tw-lead">
                      more data storage
                    </motion.p>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="w-full sm:w-1/2 md:mx-auto md:w-[90%] md:translate-x-1/10 md:mt-12">
                    <img
                      src="/img/ai-chain/data.svg"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </article>

              <article className="flex flex-col md:flex-row justify-start tw-lead-sm md:tw-lead">
                <div className="w-full md:w-1/2 flex-col justify-between order-2 md:order-1">
                  <div>
                    <AnimatedCountUp end={8} duration={500} />
                    <motion.p className="text-black tw-lead-sm md:tw-lead -mt-2">
                      faster
                    </motion.p>
                  </div>
                  <div className="w-full sm:w-2/3 md:w-[90%]">
                    <img
                      src="/img/ai-chain/chart.svg"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 ml-0 md:ml-5 flex flex-col justify-between order-1 md:order-2">
                  <div className="mb-6 md:mb-14">
                    <motion.p className="tw-lead md:tw-lead-lg text-black-20 mb-6">
                      02
                    </motion.p>
                    <motion.span className="text-gradient-violet">
                      Optimized floating-point arithmetic for faster AI
                      processing.{" "}
                    </motion.span>{" "}
                    <motion.span className="text-black/50">
                      ICP's next-gen smart contracts provide orders of magnitude
                      more compute per transaction compared to
                      current-generation blockchains. In addition, with newly
                      added support for WebAssembly 128-bit SIMD, smart
                      contracts can execute multiple floating point operations
                      in parallel, making running AI models much faster and more
                      efficient.
                    </motion.span>
                  </div>
                </div>
              </article>
              <article className="flex flex-col md:flex-row justify-start tw-lead-sm md:tw-lead">
                <div className="w-full md:w-1/2 flex flex-col justify-start">
                  <div className="">
                    <motion.p className="tw-lead md:tw-lead-lg text-black-20 mb-6">
                      03
                    </motion.p>
                    <motion.span className="text-gradient-violet">
                      Seamless Integration with Web 2.0.
                    </motion.span>{" "}
                    <motion.span className="text-black/50">
                      ICP is the only blockchain where smart contracts can
                      directly connect to Web 2.0 services using HTTPS outcalls,
                      which opens the possibility for AI applications running on
                      ICP to integrate and fetch data from external services.
                    </motion.span>
                    <Link
                      href="/https-outcalls"
                      className="link-primary flex text-nowrap mt-6"
                    >
                      <LinkArrowRight /> More on HTTPS outcalls
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="w-full sm:w-2/3 mx-auto md:w-[85%] md:translate-x-1/10 mt-8 md:mt-6">
                    <img
                      src="/img/ai-chain/inference.svg"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </article>
              <article className="flex flex-col md:flex-row justify-start align-middle tw-lead-sm md:tw-lead">
                <div className="w-full md:w-1/2  order-2 md:order-1 flex flex-col justify-center align-middle">
                  <div className="w-full sm:w-1/3 mx-auto md:w-[70%] md:-translate-x-[5%] mt-8 md:mt-0">
                    <img
                      src="/img/ai-chain/gpu.svg"
                      alt="web gpu"
                      className="w-full"
                    />
                  </div>
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
        <section className="bg-[#F1EEF5] py-20 md:py-40">
          <AnimateSpawn
            className="container-10 relative"
            el={motion.section}
            variants={transitions.container}
          >
            <div className="md:flex md:space-x-32">
              <div className="md:w-5/12 mb-10 md:mb-0">
                <motion.h4 className="tw-heading-7-caps text-black-60 mb-4 md:mb-8">
                  DEVELOPERS
                </motion.h4>
                <motion.h3
                  className="tw-lead md:tw-lead-lg mb-4"
                  variants={transitions.item}
                >
                  Build your next AI venture on the Internet Computer.{" "}
                  <motion.span
                    className="tw-lead md:tw-lead-lg text-black/60 mb-6"
                    variants={transitions.item}
                  >
                    Find all the essentials, including developer documentation,
                    code samples, demos, and our GitHub repository.
                  </motion.span>
                </motion.h3>

                <motion.p
                  className="tw-paragraph md:tw-lead-sm text-black/60 mb-6"
                  variants={transitions.item}
                >
                  These resources are designed to help you get started with
                  creating decentralized AI applications onchain. Our DeAI
                  developer community is also a great way to start.
                </motion.p>
              </div>

              <div className="md:w-7/12">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={transitions.item} className="space-y-6">
                    <div className="bg-white rounded-xl p-6">
                      <h3 className="text-2xl mb-4 font-book">Learn</h3>
                      <div className="">
                        <motion.p className="text-[14px] text-black-60 mb-0">
                          Overview of AI onchain
                        </motion.p>
                        <Link
                          href="https://internetcomputer.org/docs/current/developer-docs/ai/overview"
                          className="link-primary link-with-icon mt-0"
                        >
                          Docs <LinkArrowUpRight />
                        </Link>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6">
                      <h3 className="text-2xl mb-4 font-book">Connect</h3>
                      <div className="text-2xl space-y-8">
                        <div>
                          <motion.p className="text-[14px] text-black-60 mb-0">
                            Contribute to the discussion
                          </motion.p>
                          <Link
                            href="https://forum.dfinity.org/"
                            className="link-primary link-with-icon mt-0"
                          >
                            ICP Forum <LinkArrowUpRight />
                          </Link>
                        </div>
                        <div>
                          <motion.p className="text-[14px] text-black-60 mb-0">
                            Connect with developers
                          </motion.p>
                          <Link
                            href="https://discord.com/invite/jnjVVQaE2C"
                            className="link-primary link-with-icon mt-0"
                          >
                            Discord <LinkArrowUpRight />
                          </Link>
                        </div>
                        <div>
                          <motion.p className="text-[14px] text-black-60 mb-0">
                            Attend global events
                          </motion.p>
                          <Link
                            href="https://internetcomputer.org/events"
                            className="link-primary link-with-icon mt-0"
                          >
                            Upcoming events <LinkArrowUpRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={transitions.item}
                    className="space-y-6 flex flex-col h-full"
                  >
                    <div className="bg-white rounded-xl p-6">
                      <h3 className="text-2xl mb-4 font-book">Build</h3>
                      <div className="space-y-8">
                        <div>
                          <motion.p className="text-[14px] text-black-60 mb-0">
                            Explore the work
                          </motion.p>
                          <Link
                            href="https://github.com/dfinity/awesome-internet-computer?tab=readme-ov-file#decentralized-ai"
                            className="link-primary link-with-icon mt-0"
                          >
                            GitHub <LinkArrowUpRight />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 flex flex-col justify-between">
                      <div className="space-y-8">
                        <h3 className="text-2xl mb-4 font-book">Grow</h3>
                        <div>
                          <motion.p className="text-[14px] text-black-60 mb-0">
                            Apply for the DeAI grant
                          </motion.p>
                          <Link
                            href="https://dfinity.org/grants/"
                            className="link-primary link-with-icon mt-0"
                          >
                            Grant application <LinkArrowUpRight />
                          </Link>
                        </div>
                        <div>
                          <motion.p className="text-[14px] text-black-60 mb-0">
                            Join the accelerator
                          </motion.p>
                          <Link
                            href="/olympus/"
                            className="link-primary link-with-icon mt-0"
                          >
                            Explore Olympus <LinkArrowUpRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimateSpawn>
        </section>
        <section className="container-10 bg-white py-20 md:py-40">
          <h1 className="text-black tw-title-sm md:tw-title-lg mb-10">FAQ</h1>
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="w-full md:w-7/12 md:mr-20">
              {faqData.map((item, index) => (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
            <div className="w-full md:w-5/12 ">
              <ContactCard />
            </div>
          </div>
        </section>
        {manifestoModalOpen && (
          <AIManifestoModal onClose={closeOverlay}></AIManifestoModal>
        )}
      </main>
    </Layout>
  );
}

export default AIPage;
