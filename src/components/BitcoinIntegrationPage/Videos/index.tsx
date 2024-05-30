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
    title: "Ordinal Inscription Testbed on ICP",
    image: "/img/samples/26.webp",
    domains: ["Sample Code"],
    languages: null,
    level: null,
    contentType: null,
    body: "Inscribe ordinal inscriptions onto the Bitcoin Network via ICP, using an experimental Schnorr Canister for transaction signing",
    links: {
      github: "https://github.com/domwoe/inscription_canister",
    },
  },
  {
    index: 27,
    title: "ckbtc",
    image: "/img/samples/27.webp",
    domains: ["Sample Code"],
    languages: null,
    level: null,
    contentType: null,
    body: "",
    links: {
      github: "https://github.com/dfinity/ic/tree/master/rs/bitcoin/ckbtc",
    },
  },
  {
    index: 28,
    title: "The Carlson Protocol",
    image: "/img/samples/28.webp",
    domains: ["Sample Code"],
    languages: null,
    level: null,
    contentType: null,
    body: "The Carlson Protocol is a decentralized voting system where people vote using bitcoins. These Bitcoins are transferred back to the user after a period of time that...",
    links: {
      github: "https://github.com/sardariuss/carlson_protocol",
    },
  },
  {
    index: 29,
    title: "Ordinal canister",
    image: "/img/samples/29.webp",
    domains: ["Sample Code"],
    languages: null,
    level: null,
    contentType: null,
    body: "Ordinal theory ascribes numismatic worth to satoshis, enabling their collection and trade as intriguing items. Each individual satoshi can bear arbitrary content inscrip...",
    links: {
      github: "https://github.com/sardariuss/ordinals_canister",
    },
  },
  {
    index: 30,
    title: "Schnorr Signature Canister",
    image: "/img/samples/30.webp",
    domains: ["Sample Code"],
    languages: null,
    level: null,
    contentType: null,
    body: "The purpose of the canister is to act as a developer preview for the Schnorr threshold signing API of the Internet Computer that is currently under develop...",
    links: {
      github: "https://github.com/domwoe/schnorr_canister",
    },
  },
  {
    index: 31,
    title: "Requests for Startups",
    image: "/img/samples/31.webp",
    domains: ["Startup request"],
    languages: null,
    level: null,
    contentType: null,
    body: "List of ideas for startups in the Internet Computer ecosystem. If you're interested, you can apply for a developer grant at https://dfinity.org/grants to get things rol...",
    links: {
      github:
        "https://github.com/dfinity/grant-rfps/blob/main/requests-for-startups.md",
    },
  },
  {
    index: 32,
    title: "grant - rfps",
    image: "/img/samples/32.webp",
    domains: ["Startup request"],
    languages: null,
    level: null,
    contentType: null,
    body: "",
    links: {
      github: "https://github.com/dfinity/grant-rfps/issues",
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
          Sample Code Examples & Startup Requests 
        </h2>
        <Link
          className="link-primary link-with-icon md:mt-4"
          href="/samples"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkArrowRight /> See all
        </Link>
      </div>
      <motion.div
        variants={transitions.item}
        className="mt-6 mb-6 md:mt-20 md:mb-12"
      >
        <VideoCard
          image="https://i.ytimg.com/vi/OTAKkWAlfJE/maxresdefault.jpg"
          title="Internet Computer BUIDL Bitcoin Hackathon Powered by Encode"
          label="Demo Day"
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
