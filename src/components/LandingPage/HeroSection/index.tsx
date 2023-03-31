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
              <b>Today</b>: blockchains store tokens, and tiny clips of data, but Web3 
              is hosted on centralized cloud services.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>Tomorrow</b>: decentralized blockchain smart contracts will host Web3 services themselves in
              the mode of a crypto cloud, securely processing all the computation and data
              involved, and directly serving their web experiences &mdash; including for dapps, DAOs, billion-user social
              networks, the metaverse, streaming, multi-player games, orderbook exchanges,
              unstoppable enterprise systems, and governments. 
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>It's happening at scale today</b> on the <span className="font-bold text-infinite">Internet Computer</span>. {" "}
              Join the movement, and help usher in the blockchain singularity &#9889;
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <a target="_blank" href="https://twitter.com/search?q=%23WorldComputer">#WorldComputer</a> {" "}
              <a target="_blank" href="https://twitter.com/search?q=%23ICP">#ICP</a> {" "}
              <a target="_blank" href="https://twitter.com/search?q=%23BiggerThanBlockchain">#BiggerThanBlockchain</a>
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
              The <strong className="text-infinite">Internet Computer</strong> is created 
              by a sovereign network of special hardware, in pursuit of the Bitcoin paradigm.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>Yet, it can be millions of times more efficient</b> than Proof-of-Stake (PoS)
              blockchains, even when all their nodes are on centralized cloud services,
              such as Amazon Web Services, thanks to advanced computer science.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>In a scheme of Proof-of-Useful-Work (PoUW)</b>, special "node machines" 
              organize into subnet blockchains and succeed by producing the same number of blocks
              as others in their cohort, without statistical deviation. 
              Smart contract computation is their work, and replication is minimized 
              using "deterministic decentralization," achieving maximum theoretical 
              efficiency.
              Individual subnets are combined into one seamless limitless blockchain, using 
              chain key crypto, which also directly integrates external chains
              like Bitcoin and Ethereum.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <a target="_blank" href="https://twitter.com/search?q=%23ChainKey">#ChainKey</a> {" "}
              <a target="_blank" href="https://twitter.com/search?q=%23PoUW">#PoUW</a> {" "}
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
            The <strong className="text-infinite">Internet Computer</strong> network adapts,
               and evolves rapidly, using a permissionless algorithmic digital democracy.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <b>The need for network "forks" has been removed,</b>{" "}which are technically risky, cumbersome,
              and depend cabals of insiders.
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">  
              <b>Instead, it leverages the "Network Nervous System,"</b> a permissionless, and protocol-integrated, advanced 
              DAO, that acts as the brain of the blockchain, placing control in the hands 
              of decentralized governance.
              The network's special "node machines" follow its cryptographically verified directions.
              It structures and configures the network, adjusts economic parameters, 
              and transparently pushes protocols upgrades without backroom machinations 
              or disruption.{" "}
              
            </p>
            <p className="tw-lead-sm md:tw-lead mb-8">
              <a target="_blank" href="https://twitter.com/search?q=%23NNS">#NNS</a> {" "}
              <a target="_blank" href="https://twitter.com/search?q=%23DAO">#DAO</a> {" "}
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
