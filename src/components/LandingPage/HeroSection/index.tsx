import Link from "@docusaurus/Link";
import { useScrollSpyMenu } from "@site/src/utils/use-scroll-spy-menu";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

const sections = [
  {
    title: "Blockchain Singularity",
    id: "blockchain-singularity",
  },
  {
    title: "Proof of Useful Work",
    id: "proof-of-useful-work",
  },
  {
    title: "Intelligent Blockchain",
    id: "intelligent-blockchain",
  },
];

export default function Hero(): JSX.Element {
  const highlight = useScrollSpyMenu(".hero-section-body", 300);

  function onItemClick(e, index: number) {
    const target = document.querySelectorAll(`.hero-section-body`)[index];

    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 115;

      window.scrollTo({ top: y, behavior: "smooth" });

      e.preventDefault();
      return false;
    }
  }

  return (
    <section className="relative z-10" id="introduction">
      <div className="container-10 py-20 pb-10 md:py-40 flex gap-1/10">
        <div className="hidden md:block md:w-80">
          <div className="sticky top-[var(--ifm-navbar-height)] space-y-10">
            {sections.map((section, index) => (
              <button
                key={section.title}
                className={clsx(
                  "border-none bg-transparent appearance-none text-left font-circular tw-heading-3 text-gradient ",
                  highlight.highlightedIndex !== index ? "opacity-20" : ""
                )}
                onClick={(e) => onItemClick(e, index)}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
        <div
          className="flex-1 space-y-20 md:space-y-30"
          ref={(el) => (highlight.elRef.current = el)}
        >
          <AnimateSpawn
            variants={transitions.item}
            className="hero-section-body"
          >
            <h2 className="tw-heading-3 md:hidden text-gradient mb-8">
              Blockchain Singularity
            </h2>

            <p className="tw-lead-sm md:tw-lead mb-8">
              Today, Web3 really runs on Big Tech's cloud. Blockchains can host
              tokens, but only tiny amounts of data and compute, and no web.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              Tomorrow, blockchains will host it all, and fully decentralize
              everything, from simple dApps, to billion-user social networks,
              the metaverse, streaming, games, orderbook exchanges, and
              enterprise systems.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              It's already happening at scale on the first true World Computer:{" "}
              <span className="font-bold text-infinite">
                Internet Computer #ICP
              </span>
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <strong>Join the movement.</strong>
            </p>
            <p className="flex flex-col gap-2 items-start">
              <Link className="link-primary link-with-icon" href="/basics">
                <LinkArrowRight />
                Internet Computer basics
              </Link>
              <Link
                className="link-primary link-with-icon mb-3"
                href="/features"
              >
                <LinkArrowRight />
                Internet Computer capabilties
              </Link>

              <Link
                className="link-primary link-with-icon"
                href="https://wiki.internetcomputer.org/wiki/History"
              >
                Wiki history of the Internet Computer
                <LinkArrowUpRight></LinkArrowUpRight>
              </Link>
            </p>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.item}
            className="hero-section-body"
          >
            <h2 className="tw-heading-3 md:hidden text-gradient mb-8">
              Proof of Useful Work
            </h2>
            <p className="tw-lead-sm md:tw-lead mb-8">
              The <strong className="text-infinite">Internet Computer</strong>{" "}
              is <em>not</em> a Proof of Stake (PoS) blockchain created by
              "validator nodes" running on Big Tech's cloud. It is formed by a{" "}
              <em>sovereign network</em> of standardized "node machine" hardware
              operated by independent parties. To participate, nodes must
              produce the same number of blocks as others in their cohort,
              without deviation. In a scheme of Proof-of-Useful-Work (PoUW),
              replicated smart contract computation is their work, driving
              optimal efficiency. Nodes form into subnet blockchains, and then
              into a unified limitless blockchain, using game-changing Chain Key
              Crypto.
            </p>
            <p className="flex flex-col gap-4 items-start">
              <Link href="/how-it-works" className="button-primary mb-3">
                REVIEW ICP TECHNOLOGY
              </Link>

              <Link
                className="link-primary link-with-icon"
                href="https://wiki.internetcomputer.org/wiki/Proof_of_Useful_Work"
              >
                Learn more about Proof-of-Useful-Work
                <LinkArrowUpRight />
              </Link>
            </p>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.item}
            className="hero-section-body"
          >
            <h2 className="tw-heading-3 md:hidden text-gradient mb-8">
              Intelligent Blockchain
            </h2>
            <p className="tw-lead-sm md:tw-lead mb-8">
              Traditional blockchains evolve and adapt through a painful and
              cumbersome process. A protocol "hard fork" is developed, and a
              central group of insiders, working at a foundation, or a
              corporation, then coordinates those running nodes, or validators,
              in upgrading their network software. The{" "}
              <strong className="text-infinite">Internet Computer</strong>{" "}
              network, by contrast, runs under the control of an advanced DAO,
              called the Network Nervous System (or NNS), which acts as the
              brain of the blockchain, and completely automates and
              decentralizes processes such as protocol upgrades — removing the
              need for backroom machinations by insiders, and powering fast and
              seamless evolution.
            </p>
            <p className="flex flex-col gap-4 items-start">
              <Link href="/nns" className="button-primary mb-3">
                REVIEW THE NNS
              </Link>
              <Link
                className="link-primary link-with-icon"
                href="https://nns.ic0.app"
              >
                Try the Network Nervous System
                <LinkArrowUpRight />
              </Link>
            </p>
          </AnimateSpawn>
        </div>
      </div>
    </section>
  );
}
