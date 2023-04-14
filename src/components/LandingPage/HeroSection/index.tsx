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
      <div className="container-10 pt-20 md:pt-60 flex gap-1/10">
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
              <b>Today,</b>{" "}
              <span className="font-bold text-infinite">
                blockchains only process tokens and clips of data.
              </span>
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>Tomorrow,</b>{" "}
              <span className="font-bold text-infinite">
                blockchain will become the "crypto cloud."
              </span>
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>Blockchain will eat the centralized cloud,</b> and become the
              "everything stack," which hosts unstoppable systems and services,
              and enables Web3 to be 100% decentralized.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>It's already happening at scale</b> on the{" "}
              <span className="font-bold text-infinite">
                Internet Computer,
              </span>{" "}
              which is powering a blockchain singularity &#9889;
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>Join the movement.</b>
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <a target="_blank" href="https://twitter.com/search?q=%23ICP">
                #ICP
              </a>{" "}
              <a
                target="_blank"
                href="https://twitter.com/search?q=%23WorldComputer"
              >
                #WorldComputer
              </a>{" "}
              <a
                target="_blank"
                href="https://twitter.com/search?q=%23BiggerThanBlockchain"
              >
                #BiggerThanBlockchain
              </a>
            </p>
            <p className="flex flex-col gap-2 items-start">
              <Link className="link-primary link-with-icon" href="/basics">
                <LinkArrowRight />
                Internet Computer basics
              </Link>
              <Link
                className="link-primary link-with-icon mb-3"
                href="/capabilities"
              >
                <LinkArrowRight />
                Internet Computer capabilities
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
              is created by dedicated "node machines," rather like Bitcoin is
              created by mining rigs.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>Proof-of-Useful-Work</b> forms node machines, which are
              hardware devices, into a sovereign <i>independent</i> network.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>
                It can be millions of times more efficient than Proof-of-Stake,
              </b>{" "}
              even when it uses cloud validator nodes. The node machines
              organize into subnet blockchains, where smart contract computation
              is their work. "Chain key crypto" combines the subnets into one
              limitless blockchain, and cryptographically integrates external
              chains like Bitcoin and Ethereum.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <a
                target="_blank"
                href="https://twitter.com/search?q=%23ChainKey"
              >
                #ChainKey
              </a>{" "}
              <a target="_blank" href="https://twitter.com/search?q=%23PoUW">
                #PoUW
              </a>{" "}
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
              The <strong className="text-infinite">Internet Computer</strong>{" "}
              is controlled by its "Network Nervous System," which functions as
              the network's brain.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>The blockchain can be updated without "forks,"</b> which are
              slow, require central coordination, and technically risky.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>
                Instead, its network evolves and adapts in relative realtime,
              </b>{" "}
              thanks to its permissionless, algorithmic DAO. The network's node
              machines follow its instructions, which structure and configure
              the network, create subnets to add new capacity, and push protocol
              upgrades onto nodes, all without human intervention, or
              interrupting service.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <a target="_blank" href="https://twitter.com/search?q=%23NNS">
                #NNS
              </a>{" "}
              <a target="_blank" href="https://twitter.com/search?q=%23DAO">
                #DAO
              </a>{" "}
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
