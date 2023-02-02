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
    title: "Network Nervous System",
    id: "network-nervous-system",
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
          <div className="sticky top-10 space-y-10">
            {/* top-[calc(var(--ifm-navbar-height)/2)] */}
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
            <p className="text-lead-sm md:text-lead mb-8 font-bold">
              ICP makes blockchain the <i>everything computer</i>.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              The{" "}
              <span className="tw-heading-6 md:tw-heading-5 text-infinite">
                Internet Computer
              </span>{" "}
              (#ICP) is the first World Computer blockchain. In a seismic
              advance, everything from a simple dapp, to a billion-user social
              network, massively multiplayer online game, mass market video
              streaming service, decentralized financial exchange, or large
              mission-critical enterprise system, can now run on public
              blockchain. Web3 services, and just about anything else, can now
              be constructed entirely from hyper-efficient third-generation
              smart contracts, which serve web experiences, and can drive other
              blockchains, eliminating the need for centralized IT such as cloud
              services. The decentralized future of compute has begun &#8212;
              join thousands building a new internet.
            </p>
            <p className="flex flex-col gap-4 items-start">
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

              <Link className="button-primary" href="/developers">
                Build Something
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
              The{" "}
              <span className="tw-heading-6 md:tw-heading-5 text-infinite">
                Internet Computer
              </span>{" "}
              is not a Proof of Stake (PoS) blockchain created by "validator
              nodes" running on Big Tech's corporate cloud. It is formed by a{" "}
              <i>sovereign network</i> of special "node machine" devices
              operated by independent parties. To participate successfully,
              nodes must produce the same number of blocks as other machines in
              their cohort, without deviation. In a scheme of
              Proof-of-Useful-Work (PoUW), replicated smart contract computation
              is their work, driving optimal efficiency. Nodes form into subnet
              blockchains, and then into a unified limitless blockchain, using
              game-changing Chain Key Crypto.
            </p>
            <p className="flex flex-col gap-4 items-start">
              <Link
                className="link-primary link-with-icon mb-3"
                href="https://wiki.internetcomputer.org/wiki/Proof_of_Useful_Work"
              >
                Learn more about Proof-of-Useful-Work
                <LinkArrowUpRight />
              </Link>

              <Link href="/how-it-works" className="button-primary">
                How the Internet Computer works
              </Link>
            </p>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.item}
            className="hero-section-body"
          >
            <h2 className="tw-heading-3 md:hidden text-gradient mb-8">
              Network Nervous System
            </h2>
            <p className="tw-lead-sm md:tw-lead mb-8">
              Traditional blockchains get updated, and evolve, through a painful
              and cumbersome process. A protocol "hard fork" is developed, and a
              central group of insiders, working at a foundation, or a
              corporation, then helps coordinate those running nodes upgrade
              their network software. The{" "}
              <span className="tw-heading-6 md:tw-heading-5 text-infinite">
                Internet Computer
              </span>
              , by contrast, is controlled by an advanced DAO, which is
              integrated into its protocols, and completely automates and
              decentralizes node machine protocol upgrades. The network protocol
              constantly evolves and adapts, without backroom machinations.
            </p>
            <p className="flex flex-col gap-4 items-start">
              <Link
                className="link-primary link-with-icon mb-3"
                href="https://nns.ic0.app"
              >
                Try the Network Nervous System
                <LinkArrowUpRight />
              </Link>
              <Link href="/nns" className="button-primary">
                How Network Nervous System Works
              </Link>
            </p>
          </AnimateSpawn>
        </div>
      </div>
    </section>
  );
}
