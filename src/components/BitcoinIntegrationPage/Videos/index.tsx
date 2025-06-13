import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import ExternalLinkIcon from "@site/static/img/external-link.svg";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import { ArrowIconRight } from "../../RoadmapPage/Overlay";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import { motion } from "framer-motion";
import VideoCard from "../../Common/VideoCard";
import Card from "@site/src/components/SamplesPage/Card";

const videos = [
  {
    id: "LGegOFqP5x0",
    title: "Code Native Bitcoin I",
  },
  {
    id: "H6Wu9n9Qwa8",
    title: "Code Native Bitcoin II",
  },
  // {
  //   id: "H6Wu9n9Qwa8",
  //   title: "Code ckBTC",
  // },
];

const samples = [
  {
    index: 26,
    title: "Bitcoin Canister",
    image: "/img/samples/26.webp",
    domains: ["Global", "ChainFusion", "Bitcoin"],
    languages: ["rust"],
    level: "advanced",
    contentType: [
      "advanced",
      "rust",
      "bitcoin",
      "btc",
      "integration",
      "bitcoin integration",
    ],
    body: "A sample canister smart contract that can send and receive Bitcoin on the IC.",
    links: {
      rust: "https://github.com/dfinity/examples/tree/master/rust/basic_bitcoin",
    },
  },
  {
    index: 27,
    title: "Inscription Canister",
    image: "/img/samples/27.webp",
    domains: ["Global", "ChainFusion", "Bitcoin"],
    languages: ["rust"],
    level: "advanced",
    contentType: [
      "advanced",
      "rust",
      "bitcoin",
      "btc",
      "integration",
      "bitcoin integration",
    ],
    body: "This example project explores the possibility of inscribing ordinal inscriptions onto the Bitcoin blockchain using the IC.",
    links: {
      rust: "https://github.com/domwoe/inscription_canister",
    },
  },
  {
    index: 28,
    title: "ckBTC Canister",
    image: "/img/samples/28.webp",
    domains: ["Global", "ChainFusion", "Bitcoin"],
    languages: ["rust"],
    level: "advanced",
    contentType: [
      "advanced",
      "rust",
      "bitcoin",
      "btc",
      "integration",
      "bitcoin integration",
    ],
    body: "Canister smart contract for ckBTC, the trustless Bitcoin Digital Twin on the IC.",
    links: {
      rust: "https://github.com/dfinity/ic/tree/master/rs/bitcoin/ckbtc",
    },
  },

  {
    index: 29,
    title: "Ordinal Canister",
    image: "/img/samples/29.webp",
    domains: ["Global", "ChainFusion", "Bitcoin"],
    languages: ["rust"],
    level: "advanced",
    contentType: [
      "advanced",
      "rust",
      "bitcoin",
      "btc",
      "integration",
      "bitcoin integration",
    ],
    body: "A canister that enables the retrieval of ordinals and their corresponding inscriptions, making them easily accessible on the IC.",
    links: {
      rust: "https://github.com/sardariuss/ordinals_canister",
    },
  },
];

function Index() {
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="container-10 relative mt-20 md:mt-40"
    >
      <motion.div
        className="blob blob-purple blob-sm translate-x-1/3 -translate-y-2/10 z-[-1] md:blob-lg"
        variants={transitions.fadeIn}
      ></motion.div>
      <div className="mb-12 md:mb-24">
        <h2 className="tw-heading-4 md:tw-heading-2 md:mr-5 md:w-7/10 flex-none">
          Sample Code & Tutorials
        </h2>
        <p className="tw-paragraph mt-2 md:w-7/10">
          Learn how to build with Bitcoin on the Internet Computer using clear
          code examples and step-by-step video guides. Get started quickly with
          ready-to-use snippets and see what’s possible when Bitcoin meets ICP.
        </p>
        <Link
          className="link-primary link-with-icon md:mt-4"
          href="/samples?selectedDomains=Multichain"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkArrowRight /> See all samples
        </Link>
        <br />
        <Link
          className="link-primary link-with-icon md:mt-4"
          href="/docs/build-on-btc/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkArrowRight /> Developer documentation
        </Link>
      </div>
      <motion.div
        variants={transitions.item}
        className="mt-6 mb-6 md:mt-20 md:mb-12"
      >
        <VideoCard
          image="https://i.ytimg.com/vi/OTAKkWAlfJE/maxresdefault.jpg"
          title="Internet Computer BUIDL Bitcoin Hackathon Powered by Encode"
          label="Tutorials"
          link={`https://www.youtube.com/playlist?list=PLfEHHr3qexv_cMqcKj6ay8cDUq0BNOGGb`}
          description={
            <>
              {" "}
              <Link
                className="link-primary link-with-icon md:mt-4"
                href="https://www.youtube.com/playlist?list=PLfEHHr3qexv_cMqcKj6ay8cDUq0BNOGGb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkArrowRight /> View playlist
              </Link>
            </>
          }
        />{" "}
      </motion.div>
      <motion.div
        variants={transitions.item}
        className="relative mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 transition-opacity md:mt-4"
      >
        {samples.map((sample) => (
          <Card
            key={sample.index}
            image={sample.image}
            title={sample.title}
            domain={sample.domains[0]}
            body={sample.body}
            links={sample.links}
          />
        ))}
      </motion.div>
    </AnimateSpawn>
  );
}

export default Index;
