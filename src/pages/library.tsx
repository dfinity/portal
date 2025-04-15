import React, { useEffect, useRef, useState } from "react";
import { de, is } from "date-fns/locale";

import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import DownloadIcon from "../components/Common/Icons/DownloadIcon";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import VideoSlider from "../components/LibraryPage/VideoSlider";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import TechnicalPapers from "../components/LibraryPage/TechnicalPapers";

const quickstartCards = [
  {
    title: "Internet Computer in a Nutshell",
    description: "A non-technical introduction",
    url: "/presentations/Internet Computer in a nutshell EN.pdf",
    img: "/img/library/internet-computer-in-a-nutshell-en.png",
    background:
      "conic-gradient(from 240deg at 50% 50%, #5331cf, #7b37cb, #e69cba, #fed9ce, #fed9ce, #e69cba, #7b37cb, #5331cf)",
    isInverted: true,
  },
  {
    title: "Der Internet Computer in Kürze (German)",
    description: "Eine nicht technische Einführung",
    url: "/presentations/Internet Computer in a nutshell DE.pdf",
    img: "/img/library/internet-computer-in-a-nutshell-de.png",
    background:
      "conic-gradient(from 75deg at 50% 50%, #5331cf, #7b37cb, #e69cba, #fed9ce, #fed9ce, #e69cba, #7b37cb, #5331cf)",
    isInverted: true,
  },
];

const presentationCards = [
  {
    title: "Internet Computer – The World Computer Paradigm",
    description: "deck.internetcomputer.org",
    url: "https://internetcomputer.docsend.com/view/dzkwezufykwpb7p8",
    img: "/img/library/world-computer-paradigm.png",
    imgPosition: "right",
    background: "#3B00B9",
    isInverted: true,
  },
  {
    title: "Where Al Builds - Internet Computer Protocol",
    description: "deck.icp.ai",
    url: "https://internetcomputer.docsend.com/view/a64n9c467asbk5de",
    img: "/img/library/where-ai-builds.png",
    imgPosition: "right",
    background: "#110046",
    isInverted: true,
  },
  {
    title: "UTOPIA – Create private clouds using ICP technology",
    description: "deck.utopia.com",
    url: "https://utopia.docsend.com/view/ez8f34n53q2fg2de",
    img: "/img/library/utopia-create-private-clouds-using-icp-tech.png",
    imgPosition: "right",
    background: "#F29807",
  },
];

const whitepaperCards = [
  {
    title: "The Internet Computer for Geeks",
    description: "The DFINITY Team",
    url: "/whitepapers/The Internet Computer for Geeks.pdf",
  },
  {
    title: "Internet Computer Consensus",
    description:
      "Jan Camenisch, Manu Drijvers, Timo Hanke, Yvonne-Anne Pignolet, Victor Shoup, Dominic Williams",
    url: "/whitepapers/Internet Computer Consensus.pdf",
  },
  {
    title:
      "Advancing Blockchain Scalability: A Linear Optimization Framework for Diversified Node Allocation in Shards",
    description: "Björn Assmann, Samuel J. Burri",
    url: "/whitepapers/Advancing Blockchain Scalability_ A Linear Optimization Framework for Diversified Node Allocation in Shards.pdf",
  },
  {
    title:
      "Decentralized and Stateful Serverless Computing on the Internet Computer Blockchain",
    description:
      "Maksym Arutyunyan, Andriy Berestovskyy, Adam Bratschi-Kaye, Ulan Degenbaev, Manu Drijvers, Islam El-Ashi, Stefan Kaestle, Roman Kashitsyn, Maciej Kot, Yvonne-Anne Pignolet, Rostislav Rumenov, Dimitris Sarlis, Alin Sinpalean, Alexandru Uta, Bogdan Warinschi, and Alexandra Zapuc",
    url: "/whitepapers/Decentralized and Stateful Serverless Computing on the Internet Computer Blockchain.pdf",
  },
  {
    title: "Non-interactive distributed key generation and key resharing",
    description: "Jens Groth",
    url: "/whitepapers/Non-interactive distributed key generation and  key resharing.pdf",
  },
  {
    title: "vetKeys: How a Blockchain Can Keep Many Secrets",
    description:
      "Andrea Cerulli, Aisling Connolly, Gregory Neven, Franz-Stefan Preiss, Victor Shoup",
    url: "/whitepapers/vetKeys_ How a Blockchain Can Keep Many Secrets.pdf",
  },

  {
    title: "Smarter Contract Upgrades with Orthogonal Persistence",
    description:
      "Luc Bläser, Claudio Russo, Gabor Greif, Ryan Vandersmith, Jason Ibrahim",
    url: "/whitepapers/Smarter Contract Upgrades with Orthogonal Persistence.pdf",
  },
  {
    title: "Collecting Garbage on the Blockchain",
    description:
      "Luc Bläser, Claudio Russo, Ulan Degenbaev, Ömer S. Agacan, Gabor Greif, Jason Ibrahim",
    url: "/whitepapers/Collecting Garbage on the Blockchain.pdf",
  },
  {
    title: "A Decentralized Mechanism for Know-Your-Transaction Compliance",
    description: "Thomas Locher",
    url: "/whitepapers/A Decentralized Mechanism for Know-Your-Transaction Compliance.pdf",
  },
  {
    title:
      "Byzantine Reliable Broadcast with Low Communication and Time Complexity",
    description: "Thomas Locher",
    url: "/whitepapers/Byzantine Reliable Broadcast with Low Communicationand Time Complexity.pdf",
  },
  {
    title: "Design and analysis of a distributed ECDSA signing service",
    description: "Jens Groth and Victor Shoup",
    url: "/whitepapers/Design and analysis of a distributed ECDSA signing service.pdf",
  },
  {
    title: "Fully on-chain DAOs on the Internet Computer",
    description: "Björn Assman and Lara Schmid",
    url: "/whitepapers/Fully on-chain DAOs on the Internet Computer.pdf",
  },
  {
    title:
      "Lightweight Asynchronous Verifiable Secret Sharing with Optimal Resilience",
    description: "Victor Shoup and Nigel P. Smart",
    url: "/whitepapers/Lightweight Asynchronous Verifiable Secret Sharing with Optimal  Resilience.pdf",
  },
  {
    title: "Monitoring the Internet Computer",
    description:
      "David Basin, Daniel Stefan Dietiker, Srđan Krstić, Yvonne-Anne Pignolet, Martin Raszyk, Joshua Schneider & Arshavir Ter-Gabrielyan",
    url: "/whitepapers/Monitoring the Internet Computer.pdf",
  },

  {
    title:
      "On the security of ECDSA with additive key derivation and presignatures",
    description: "Jens Groth and Victor Shoup",
    url: "/whitepapers/On the security of ECDSA with additive key derivation and  presignatures.pdf",
  },
  {
    title: "Trustworthy confidential virtual machines for the masses",
    description:
      "Anna Galanou, Khushboo Bindlish, Luca Preibsch, Yvonne-Anne Pignolet, Christof Fetzer, Rüdiger Kapitza",
    url: "/whitepapers/Trustworthy confidential virtual machines for the masses.pdf",
  },
  {
    title: "User-centric authentication in Web 3.0",
    description: "Björn Tackmann, DFINITY Foundation",
    url: "/whitepapers/User-centric authentication in Web 3.0.pdf",
  },
];

const LibraryCard: React.FC<{
  title: string;
  url: string;
  subtitle?: string;
  description?: string;
  img?: string;
  imgPosition?: string;
  background: string;
  isInverted?: boolean;
}> = ({
  title,
  url,
  subtitle,
  description,
  img,
  imgPosition = "bottom",
  background = "#FFF",
  isInverted = false,
}) => {
  return (
    <Link
      className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform h-full"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <article
        className={`w-full h-full rounded-xl overflow-hidden flex flex-col justify-between gap-8 ${
          isInverted ? "text-white" : "text-black"
        }`}
        style={{
          background: background,
        }}
      >
        <div className="px-6 pt-8 pb-6">
          <h3 className="tw-heading-5 mb-2">{title}</h3>
          {subtitle && <div className="tw-paragraph-sm mb-2">{subtitle}</div>}
          {description && (
            <div className="tw-paragraph-sm line-clamp-4 mb-6">
              {description}
            </div>
          )}
        </div>

        {img && (
          <img
            src={img}
            alt={title}
            className={`${
              imgPosition === "bottom"
                ? "mx-auto  w-auto h-full"
                : "mr-0 ml-auto w-[80%] h-auto pb-10"
            }`}
          />
        )}
      </article>
    </Link>
  );
};

const WhitePaperCard: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  highlighted?: boolean;
  isDownload?: boolean;
}> = ({ title, subtitle, description, url, highlighted, isDownload }) => {
  return (
    <Link
      className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform h-full"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <article
        className={`rounded-xl overflow-hidden flex flex-col h-full w-full text-white ${
          highlighted ? "bg-[#240d4e] text-white" : "bg-[#140636]"
        }`}
      >
        <div className="px-6 pt-8 pb-6 flex flex-col flex-1">
          <h3 className="tw-heading-5 mb-2 line-clamp-3 min-h-[4.5rem]">
            {title}
          </h3>
          {subtitle && (
            <div
              className={`tw-paragraph-sm mb-2 ${
                highlighted ? "text-white/60" : "text-black/60"
              }`}
            >
              {subtitle}
            </div>
          )}
          {description && (
            <div
              className={`tw-paragraph-sm line-clamp-4 mb-6 flex-1 ${
                highlighted ? "text-white/60" : "text-black/60"
              }`}
            >
              {description}
            </div>
          )}

          <div
            className={`button-round-icon mt-auto !bg-transparent !text-[#AE9EFF] !border-white/20 hover:!bg-white hover:!text-[#240d4e] hover:!border-white`}
            aria-label={`Download`}
          >
            {isDownload ? <DownloadIcon /> : <LinkArrowRight />}
          </div>
        </div>
      </article>
    </Link>
  );
};

function Library() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Library"
      description="Documents introducing the Internet Computer and ICP, the self-writing internet, UTOPIA clouds, and technical papers…"
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-library.webp"></ShareMeta>

      <main
        className="text-white relative overflow-hidden bg-[#0A0023]"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="infinite"></DarkHeroStyles>}
        <div className="relative text-white overflow-hidden" ref={heroRef}>
          <svg
            className="mask-fade-bottom absolute w-[130vw] md:w-[75vw] top-36 left-8 md:left-auto md:right-0"
            viewBox="0 0 1246 612"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1295.98 306C1295.98 137.272 1154.54 0 980.983 0C908.624 0 829.831 37.1025 746.357 110.25C706.893 144.833 672.671 181.823 646.976 211.568C556.753 111.06 435.75 0 314.995 0C169.04 0 41.7593 101.07 8.63987 234.99C8.68487 234.878 8.72987 234.72 8.77487 234.563C8.72987 234.72 8.68487 234.855 8.63987 234.99C2.89204 258.222 -0.00920867 282.067 2.19566e-05 306C2.19566e-05 474.728 139.183 612 312.745 612C385.103 612 466.147 574.898 549.62 501.75C589.085 467.168 623.307 430.178 649.001 400.433C739.225 500.94 860.25 612 981.005 612C1126.96 612 1254.24 510.93 1287.36 377.033C1293.01 354.218 1296 330.435 1296 306.023L1295.98 306ZM671.186 211.253C700.683 177.975 729.932 148.59 758.237 123.795C838.335 53.595 913.282 18 980.983 18C1144.76 18 1277.98 147.195 1277.98 306C1277.98 328.275 1275.3 350.528 1269.99 372.173C1269.14 374.67 1258.22 404.55 1227.13 433.598C1186.74 471.33 1132 490.478 1064.41 490.5C1137.11 458.91 1187.96 387.945 1187.96 306C1187.96 194.602 1095.1 103.995 980.983 103.995C936.501 103.995 882.052 131.963 819.076 187.155C790.749 211.995 762.062 241.2 731.777 276.098L719.897 289.733L659.036 224.64L671.186 211.275V211.253ZM563.525 309.015C539.496 337.545 504.846 376.425 465.022 411.323C390.818 476.37 342.579 490.005 314.995 490.005C210.911 490.005 126.02 407.453 126.02 306C126.02 204.547 204.994 123.998 309.167 123.368C312.947 123.368 322.035 123.368 334.549 125.326C379.849 134.316 430.508 176.805 459.465 203.31C482.752 224.64 524.938 268.29 563.503 308.993L563.525 309.015ZM624.792 400.748C595.272 434.025 566.045 463.41 537.741 488.205C458.767 557.415 380.963 594 312.745 594C233.658 594 159.5 563.963 103.881 509.423C48.4867 455.108 17.9997 382.86 17.9997 306C17.9997 283.725 20.6997 261.45 25.9871 239.828C26.8871 237.24 37.7994 207.405 68.8488 178.403C109.236 140.67 163.977 121.523 231.566 121.5C158.87 153.09 108.021 224.055 108.021 306C108.021 417.397 200.877 508.005 314.995 508.005C359.476 508.005 413.925 480.038 476.902 424.845C505.229 400.005 533.916 370.8 564.2 335.903L576.057 322.245C576.057 322.245 636.019 386.37 636.671 387.09L624.769 400.748H624.792ZM732.452 302.985C756.482 274.455 791.131 235.575 830.956 200.678C905.159 135.63 953.398 121.995 980.983 121.995C1085.07 121.995 1169.96 204.547 1169.96 306C1169.96 407.453 1085.16 489.375 980.983 490.005C977.203 490.005 972.636 489.623 967.078 488.633C967.123 488.633 967.146 488.655 967.191 488.678C913.462 468.09 865.47 435.218 836.49 408.69C813.203 387.36 771.017 343.71 732.43 303.008L732.452 302.985ZM1287.23 377.348C1287.27 377.235 1287.29 377.1 1287.34 377.01C1287.31 377.1 1287.27 377.235 1287.23 377.348Z"
              fill="url(#paint0_radial_432_19291)"
              fill-opacity="0.5"
            />
            <defs>
              <radialGradient
                id="paint0_radial_432_19291"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(615.5 367.5) rotate(-140.071) scale(623.989 1321.5)"
              >
                <stop offset="0.346556" stop-color="#13033F" />
                <stop offset="0.461556" stop-color="#0A0123" />
                <stop offset="0.816556" stop-color="#9163BF" />
                <stop offset="0.931556" stop-color="#FFB1C5" />
              </radialGradient>
            </defs>
          </svg>

          <AnimateSpawn
            variants={transitions.container}
            className="container-10 relative text-white pt-36 md:pt-48 pb-24"
          >
            <motion.h1
              variants={transitions.item}
              className="tw-heading-3 mb-2 md:tw-heading-2 md:mb-6"
            >
              Insights & Resources
            </motion.h1>
            <motion.p
              variants={transitions.item}
              className="tw-lead-sm md:tw-lead md:w-7/12 mb-0 text-white-80"
            >
              Documents introducing the Internet Computer and ICP, the
              self-writing internet, UTOPIA clouds, and technical papers…
            </motion.p>

            <motion.div variants={transitions.item} className="mt-16 md:mt-12">
              <div className="">
                <VideoSlider></VideoSlider>
              </div>
            </motion.div>
          </AnimateSpawn>
        </div>

        <section className="container-10 mt-8 py-20">
          <h2 className="tw-heading-4 md:tw-heading-48 mb-1 md:mb-3">
            In a Nutshell…
          </h2>
          <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickstartCards.map((card) => (
              <LibraryCard key={card.title} {...card} />
            ))}
          </div>
        </section>
        <section className="container-10 pt-4 pb-20 md:py-12 ">
          <h2 className="tw-heading-4 md:tw-heading-48 mb-1 md:mb-3">
            Online Decks
          </h2>
          <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {presentationCards.map((card) => (
              <LibraryCard key={card.title} {...card} />
            ))}
          </div>
        </section>
        <section className="container-10 py-4 md:py-20 mb-20">
          <h2 className="tw-heading-4 md:tw-heading-48">Technical Papers</h2>
          <TechnicalPapers />
          {/* <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {whitepaperCards.map((card, idx) => (
              <WhitePaperCard
                key={card.title}
                title={card.title}
                description={card.description}
                url={card.url}
                highlighted={idx === 0}
                isDownload={true}
              />
            ))}
          </div> */}
        </section>
      </main>
    </Layout>
  );
}

export default Library;
