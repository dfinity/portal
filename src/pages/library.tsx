import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import DownloadIcon from "../components/Common/Icons/DownloadIcon";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";

const presentationCards = [
  {
    title: "ICP makes the Internet into a World Computer",
    description: "",
    url: "https://internetcomputer.docsend.com/view/dzkwezufykwpb7p8",
  },
];

const whitepaperCards = [
  {
    title: "Secure Noise Sampling for DP in MPC with Finite Precision",
    subtitle: "ARES 2024",
    description:
      "Hannah Keller, Helen Möllering, Thomas Schneider, Oleksandr Tkachenko, Liang Zhao",
    url: "https://eprint.iacr.org/2023/1594.pdf",
  },
  {
    title: "ScionFL: Secure Quantized Aggregation for Federated Learning",
    subtitle: "SaTML 2024",
    description:
      "Yaniv Ben-Itzhak, Helen Möllering, Benny Pinkas, Thomas Schneider, Ajith Suresh, Oleksandr Tkachenko, Shay Vargaftik, Christian Weinert, Hossein Yalame, Avishay Yanai",
    url: "https://eprint.iacr.org/2023/652.pdf",
  },
  {
    title:
      "Bringing Order to Chaos: The Case of Collision-Resistant Chameleon-Hashes",
    subtitle: "Journal of Cryptology 37, 29 (2024)",
    description: "David Derler, Kai Samelin, Daniel Slamanig",
    url: "https://link.springer.com/content/pdf/10.1007/s00145-024-09510-9.pdf",
  },
  {
    title: "Smarter Contract Upgrades with Orthogonal Persistence",
    subtitle: "VMIL 2024",
    description:
      "Luc Bläser, Claudio Russo, Gabor Greif, Ryan Vandersmith, Jason Ibrahim",
    url: "https://dl.acm.org/doi/pdf/10.1145/3689490.3690401",
  },
  {
    title:
      "Byzantine Reliable Broadcast with Low Communication and Time Complexity",
    subtitle: "OPODIS 2024",
    description: "Thomas Locher",
    url: "https://arxiv.org/pdf/2404.08070",
  },
  {
    title:
      "On the Interplay between Deadline-Constrained Traffic and the Number of Allowed Retransmissions in Random Access Networks",
    subtitle: "CVA CFP 2024",
    description: "N Nomikos, T Charalambous, R Wichman, YA Pignolet, N Pappas",
    url: "https://www.mdpi.com/1099-4300/26/8/655",
  },
];
const LibraryCard: React.FC<{
  title: string;
  subtitle?: string;
  description: string;
  url: string;
}> = ({ title, subtitle, description, url }) => {
  return (
    <Link
      className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black h-full"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <article className="rounded-xl overflow-hidden bg-white flex flex-col h-full">
        <div className="px-6 pt-8 pb-6 flex flex-col flex-1">
          <h3 className="tw-heading-5 mb-2 line-clamp-3 min-h-[4.5rem]">
            {title}
          </h3>
          {subtitle && (
            <div className="tw-paragraph-sm text-black/60 mb-2">{subtitle}</div>
          )}
          <div className="tw-paragraph-sm line-clamp-4 text-black/60 mb-6 flex-1">
            {description}
          </div>

          <div className="button-round-icon mt-auto" aria-label={`Download`}>
            <LinkArrowRight />
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
      description="Find resources to learn more about the Internet Computer and its capabilities."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-news.jpg"></ShareMeta>

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
            className="container-10 relative text-white pt-36 md:pt-48 pb-48 md:pb-36"
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
              Find resources to learn more about the Internet Computer and its
              capabilities.
            </motion.p>
            <motion.div className="container-12 relative pointer-events-none">
              <div className="absolute w-7/12 translate-x-[25%] translate-y-[95%] bottom-1/2 sm:w-3/12 sm:translate-y-[105%] md:w-4/12 md:bottom-0 md:translate-x-[200%] md:translate-y-2/3">
                <img
                  src="/img/library/library-hero.svg"
                  className="w-full max-w-none"
                />
              </div>
            </motion.div>
          </AnimateSpawn>
        </div>
        <section className="container-10 py-20">
          <h2 className="tw-heading-4 md:tw-heading-60 mb-1 md:mb-3">
            Presentations
          </h2>
          <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {presentationCards.map((card) => (
              <LibraryCard
                title={card.title}
                description={card.description}
                url={card.url}
              />
            ))}
          </div>
        </section>
        <section className="container-10 py-4 md:py-20 mb-20">
          <h2 className="tw-heading-4 md:tw-heading-60 mb-1 md:mb-3">
            Whitepapers
          </h2>
          <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {whitepaperCards.map((card) => (
              <LibraryCard
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                url={card.url}
              />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Library;
