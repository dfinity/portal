import React, { useEffect, useRef, useState } from "react";

import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import DownloadIcon from "../components/Common/Icons/DownloadIcon";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import VideoSlider from "../components/LibraryPage/VideoSlider";
import { is } from "date-fns/locale";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";

const quickstartCards = [
  {
    title: "Internet Computer in a Nutshell",
    url: "/presentations/Internet Computer in a nutshell EN.pdf",
  },
  {
    title: "Der Internet Computer in Kürze (German)",
    url: "/presentations/Internet Computer in a nutshell DE.pdf",
  },
];

const presentationCards = [
  {
    title: "Internet Computer – The World Computer Paradigm",
    description: "deck.internetcomputer.org",
    url: "https://internetcomputer.docsend.com/view/dzkwezufykwpb7p8",
  },
  {
    title: "Where Al Builds - Internet Computer Protocol",
    description: "deck.icp.ai",
    url: "https://internetcomputer.docsend.com/view/a64n9c467asbk5de",
  },
  {
    title: "UTOPIA – Create private clouds using ICP technology",
    description: "deck.utopia.com",
    url: "https://utopia.docsend.com/view/ez8f34n53q2fg2de",
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
        className={`rounded-xl overflow-hidden flex flex-col h-full w-full ${
          highlighted ? "bg-[#240d4e] text-white" : "bg-white text-black"
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
            className={`button-round-icon mt-auto ${
              highlighted
                ? "!bg-transparent !border-white/30 !text-white hover:!bg-white hover:!text-[#240d4e] hover:!border-white"
                : ""
            }`}
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
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <div
          style={{
            background: "linear-gradient(54deg, #3B00B9 0%, #FF84A9 131.95%)",
          }}
          ref={heroRef}
        >
          <AnimateSpawn
            variants={transitions.container}
            className="container-10 relative text-white pt-36 md:pt-48 pb-56 md:pb-80"
          >
            <motion.h1
              variants={transitions.item}
              className="tw-heading-3 mb-2 md:tw-heading-2 md:mb-6 md:w-7/12"
            >
              Library
            </motion.h1>
            <motion.p
              variants={transitions.item}
              className="tw-lead-sm md:tw-lead md:w-7/12 mb-0 text-white-80"
            >
              Documents introducing the Internet Computer and ICP, the self-writing internet, UTOPIA clouds, and technical papers…
            </motion.p>

          </AnimateSpawn>
        </div>

        <section className="container-12 -mt-56">
          <div className="pt-20">
            <div className="">
              <VideoSlider></VideoSlider>
            </div>
          </div>
        </section>

        <section className="container-10 mt-8 py-20">
          <h2 className="tw-heading-4 md:tw-heading-60 mb-1 md:mb-3">
            In a Nutshell…
          </h2>
          <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickstartCards.map((card) => (
              <LibraryCard key={card.title} title={card.title} url={card.url} isDownload />
            ))}
          </div>
        </section>
        <section className="container-10 pt-4 pb-20 md:py-12 ">
          <h2 className="tw-heading-4 md:tw-heading-60 mb-1 md:mb-3">
            Online Decks
          </h2>
          <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {presentationCards.map((card) => (
              <LibraryCard key={card.title} title={card.title} description={card.description} url={card.url} />
            ))}
          </div>
        </section>
        <section className="container-10 py-4 md:py-20 mb-20">
          <h2 className="tw-heading-4 md:tw-heading-60 mb-1 md:mb-3">
            Technical Papers
          </h2>
          <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {whitepaperCards.map((card, idx) => (
              <LibraryCard
                key={card.title}
                title={card.title}
                description={card.description}
                url={card.url}
                highlighted={idx === 0}
              />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Library;
