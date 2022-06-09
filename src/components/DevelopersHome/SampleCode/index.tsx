import React, { useEffect } from "react";
import styles from "@site/src/components/DevelopersHome/SampleCode/index.module.css";
import Link from "@docusaurus/Link";
import Card from "@site/src/components/SamplesPage/Card";
import { motion, useAnimation } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import motokoBG from "@site/static/img/motokoPlayground.png";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import helloWorld from "@site/static/img/samples/helloWorld.png";
import staticWebsite from "@site/static/img/samples/staticWebsite.png";
import basicDex from "@site/static/img/samples/basicDex.png";
import nftMinting from "@site/static/img/samples/nftMinting.png";
import basicDAO from "@site/static/img/samples/basicDAO.png";
import encryptedNoteTaking from "@site/static/img/samples/encryptedNoteTaking.png";
import tokenTransfer from "@site/static/img/samples/tokenTransfer.png";
import actorReference from "@site/static/img/samples/actorReference.png";
import webgl from "@site/static/img/samples/webgl.png";

const sampleItems = [
  {
    index: 0,
    title: "Hello World",
    image: helloWorld,
    domains: ["Website"],
    languages: ["Motoko", "Rust", "Javascript"],
    level: ["Beginner"],
    contentType: ["Code Samples", "Documentation", "Live Demos"],
    body: "Deploy a dead simple dapp using two canisters serving a web page.",
    links: {
      action: {
        text: "Get code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/hello",
      },
      motoko: "https://github.com/dfinity/examples/tree/master/motoko/hello",
      rust: "https://github.com/dfinity/examples/tree/master/rust/hello",
      livePreview: "https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/",
      docs: "samples/hello",
    },
  },
  {
    index: 1,
    title: "Static Website",
    image: staticWebsite,
    domains: ["Website", "Global"],
    languages: ["Motoko", "Rust", "Javascript"],
    level: ["Beginner"],
    contentType: ["Documentation", "Videos"],
    body: "Quickly set up a static website structure, add content and basic styling, and deploy on the IC.",
    links: {
      action: { text: "Docs", to: "samples/host-a-website" },
      docs: "samples/host-a-website",
      youtube: "https://www.youtube.com/watch?v=JAQ1dkFvfPI",
    },
  },
  {
    index: 2,
    title: "Basic Dex",
    image: basicDex,
    domains: ["DeFi", "Website"],
    languages: ["Motoko", "Rust", "Javascript"],
    level: ["Intermediate"],
    contentType: ["Code Samples", "Documentation", "Videos", "Live Demos"],
    body: "Build dapp to enable DeFi applications on the IC.",
    links: {
      action: {
        text: "Get Code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/defi",
      },
      motoko: "https://github.com/dfinity/examples/tree/master/motoko/defi",
      rust: "https://github.com/dfinity/examples/tree/master/rust/defi",
      livePreview: "https://gzz56-daaaa-aaaal-qai2a-cai.ic0.app/",
      docs: "samples/dex",
      youtube: "https://youtu.be/fLbaOmH24Gs",
    },
  },
  {
    index: 3,
    title: "NFT Minting",
    image: nftMinting,
    domains: ["NFT", "Gaming"],
    languages: ["Rust"],
    level: ["Intermediate"],
    contentType: ["Code Samples", "Documentation", "Videos"],
    body: "Create a user generated NFT and share it. This dapp uses the DIP721 NFT standard.",
    links: {
      action: {
        text: "Get code",
        to: "https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container",
      },
      rust: "https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container",
      docs: "samples/nft",
      youtube: "https://youtu.be/1po3udDADp4",
    },
  },
  {
    index: 4,
    title: "Basic DAO",
    image: basicDAO,
    domains: ["Global", "DeFi"],
    languages: ["Motoko", "Rust"],
    level: ["Intermediate"],
    contentType: ["Code Samples", "Documentation", "Videos"],
    body: "Dapp initializes a set of accounts and corresponding tokens as well as enables  proposals for communal votes.",
    links: {
      action: {
        text: "Get Code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/basic_dao",
      },
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/basic_dao",
      rust: "https://github.com/dfinity/examples/tree/master/rust/basic_dao",
      docs: "samples/dao",
      youtube: "https://youtu.be/3IcYlieA-EE",
    },
  },
  {
    index: 5,
    title: "Encrypted note-taking",
    image: encryptedNoteTaking,
    domains: ["Website"],
    languages: ["Motoko", "Rust", "Javascript"],
    level: ["Advanced"],
    contentType: ["Code Samples", "Documentation", "Videos", "Live Demos"],
    body: "Create, access and modify confidential notes from multiple devices using Internet Identity and end-to-end encryption.",
    links: {
      action: {
        text: "Get Code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_motoko",
      },
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_motoko",
      rust: "https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_rust",
      livePreview: "https://cvhrw-2yaaa-aaaaj-aaiqa-cai.ic0.app/",
      docs: "samples/encrypted-notes",
      youtube: "https://youtu.be/DZQmtPSxvbs",
    },
  },
  {
    index: 6,
    title: "Token transfer",
    image: tokenTransfer,
    domains: ["Global", "DeFi"],
    languages: ["Motoko", "Rust"],
    level: ["Advanced"],
    contentType: ["Code Samples", "Documentation"],
    body: "Create a dapp that can transfer tokens to its most active users.",
    links: {
      action: {
        text: "Get Code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer",
      },
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer",
      rust: "https://github.com/dfinity/examples/tree/master/rust/tokens_transfer",
      docs: "samples/token-transfer",
    },
  },
  {
    index: 7,
    title: "Actor reference",
    image: actorReference,
    domains: ["Website"],
    languages: ["Motoko"],
    level: ["Advanced"],
    contentType: ["Code Samples", "Documentation"],
    body: "Learn how the IC management canister functions as an actor (reference).",
    links: {
      action: {
        text: "Get Code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/actor_reference",
      },
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/actor_reference",
    },
  },
  {
    index: 8,
    title: "WebGL",
    image: webgl,
    domains: ["Gaming", "Website", "Global"],
    languages: ["Motoko", "Rust", "Javascript"],
    level: ["Beginner"],
    contentType: ["Documentation"],
    highlights: ["Gaming", "Website", "Global", "Beginner"],
    body: "Demonstrates how to deploy a Unity WebGL game on the IC.",
    links: {
      action: {
        text: "Get Code",
        to: "https://github.com/dfinity/examples/tree/master/hosting/unity-webgl-template",
      },
      docs: "samples/host-unity-webgl",
    },
  },
];

function Index() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <div className={styles.section}>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.container}
      >
        <motion.div variants={transitions.item} className={styles.header}>
          <p>Sample code</p>
          <Link className={styles.callToAction} to={"/samples"}>
            Explore all sample code
          </Link>
        </motion.div>
        <motion.div className={styles.sampleSwiper} variants={transitions.item}>
          <Swiper
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            centeredSlides={true}
            modules={[Pagination]}
            breakpoints={{
              320: { slidesPerView: 1.1 },
              450: { slidesPerView: 1.5 },
              600: { slidesPerView: 1.8 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              1920: { slidesPerView: 6 },
              2560: { slidesPerView: 8 },
              3440: { slidesPerView: 10 },
            }}
          >
            {sampleItems.map((sample, index) => (
              <SwiperSlide>
                <div
                  className={clsx(
                    styles.sampleContainer,
                    index === 0 && styles.firstSampleContainer
                  )}
                >
                  <Card
                    key={sample.index}
                    image={sample.image}
                    title={sample.title}
                    domain={sample.domains[0]}
                    body={sample.body}
                    links={sample.links}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <div className={styles.cards}>
          <motion.a
            variants={transitions.item}
            href={"/docs/current/developer-docs/quickstart/local-quickstart"}
            className={clsx(styles.card, styles.cardHover)}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>SDK Installation</p>
              <p className={styles.informationBody}>
                Download and install the latest version of our DFINITY Canister
                smart contract SDK and start now.
              </p>
            </div>
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
          <motion.a
            variants={transitions.item}
            href={"https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/"}
            className={clsx(styles.card, styles.cardHover)}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Motoko Playground</p>
              <p className={styles.informationBody}>
                Explore Motoko, the native language of the Internet Computer,
                right in the browser without having to download the SDK
              </p>
            </div>
            <img className={styles.motokoBackground} src={motokoBG} alt="" />
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

export default Index;
