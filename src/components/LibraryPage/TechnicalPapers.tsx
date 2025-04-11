import React from "react";
import Layout from "@theme/Layout";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Link from "@docusaurus/Link";
import "./TechnicalPapers.css";

// Technical papers data with URLs from the original whitepaper cards
const technicalPapers = [
  {
    date: "Dec 18, 2023",
    title: "The Internet Computer for Geeks",
    description:
      "The Internet Computer is overcoming the limitations of smart contracts on traditional blockchains in terms of speed, storage costs, and computational capacity.",
    url: "/whitepapers/The Internet Computer for Geeks.pdf",
  },
  {
    date: "Jul 29, 2022",
    title: "Internet Computer Consensus",
    description:
      "Dominic Williams, Jan Camenisch, Manu Drijvers, Timo Hanke, Yvonne-Anne Pignolet, Victor Shoup",
    url: "/whitepapers/Internet Computer Consensus.pdf",
  },
  {
    date: "May 8, 2024",
    title:
      "Advancing Blockchain Scalability: A Linear Optimization Framework for Diversified Node Allocation in Shards",
    description: "Björn Assmann and Samuel J. Burri, DFINITY Foundation",
    url: "/whitepapers/Advancing Blockchain Scalability_ A Linear Optimization Framework for Diversified Node Allocation in Shards.pdf",
  },
  {
    date: "Jul 12, 2023",
    title:
      "Decentralized and Stateful Serverless Computing on the Internet Computer Blockchain",
    description:
      "This paper is included in the Proceedings of the 2023 USENIX Annual Technical Conference.",
    url: "/whitepapers/Decentralized and Stateful Serverless Computing on the Internet Computer Blockchain.pdf",
  },
  {
    date: "Mar 16, 2021",
    title: "Non-interactive distributed key generation and key resharing",
    description:
      "The Internet Computer hosts clusters of nodes running subnets (shards) that host finite state machines known as canisters (advanced smart contracts).",
    url: "/whitepapers/Non-interactive distributed key generation and key resharing.pdf",
  },
  {
    date: "Apr 30, 2023",
    title: "vetKeys: How a Blockchain Can Keep Many Secrets",
    description:
      "We propose a new cryptographic primitive called vetKD that extends identity-based encryption with a decentralized way of deriving decryption keys.",
    url: "/whitepapers/vetKeys_ How a Blockchain Can Keep Many Secrets.pdf",
  },
  {
    date: "October 20, 2024",
    title: "Smarter Contract Upgrades with Orthogonal Persistence",
    description:
      "Modern blockchains, like the Internet Computer, establish a secure and distributed virtual machine for running complex programs, such as smart contracts, decentralized applications, or other software solutions.",
    url: "/whitepapers/Smarter Contract Upgrades with Orthogonal Persistence.pdf",
  },
  {
    date: "Oct 23, 2023",
    title: "Collecting Garbage on the Blockchain",
    description:
      "We present a garbage collector that is specically designed for a WebAssembly-based blockchain, such as the Internet Computer.",
    url: "/whitepapers/Collecting Garbage on the Blockchain.pdf",
  },
  {
    date: "Oct 25, 2023",
    title: "A Decentralized Mechanism for Know-Your-Transaction Compliance",
    description: "Thomas Locher, DFINITY Foundation",
    url: "/whitepapers/A Decentralized Mechanism for Know-Your-Transaction Compliance.pdf",
  },
  {
    date: "Apr 11, 2024",
    title:
      "Byzantine Reliable Broadcast with Low Communication and Time Complexity",
    description: "Thomas Locher, DFINITY Foundation",
    url: "/whitepapers/Byzantine Reliable Broadcast with Low Communicationand Time Complexity.pdf",
  },
  {
    date: "Feb 16, 2023",
    title: "Design and analysis of a distributed ECDSA signing service",
    description: "Jens Groth and Victor Shoup, DFINITY Foundation",
    url: "/whitepapers/Design and analysis of a distributed ECDSA signing service.pdf",
  },
  {
    date: "Oct 25, 2023",
    title: "Fully on-chain DAOs on the Internet Computer",
    description: "Björn Assman and Lara Schmid, DFINITY Foundation",
    url: "/whitepapers/Fully on-chain DAOs on the Internet Computer.pdf",
  },
  {
    date: "Mar 7, 2024",
    title:
      "Lightweight Asynchronous Verifiable Secret Sharing with Optimal Resilience",
    description: "Victor Shoup and Nigel P. Smart",
    url: "/whitepapers/Lightweight Asynchronous Verifiable Secret Sharing with Optimal Resilience.pdf",
  },
  {
    date: "2023",
    title: "Monitoring the Internet Computer",
    description:
      "David Basin, Daniel Stefan Dietiker, Srđan Krstić, Yvonne-Anne Pignolet, Martin Raszyk, Joshua Schneider & Arshavir Ter-Gabrielyan",
    url: "/whitepapers/Monitoring the Internet Computer.pdf",
  },
  {
    date: "Apr 27, 2022",
    title:
      "On the security of ECDSA with additive key derivation and presignatures",
    description: "Jens Groth and Victor Shoup, DFINITY Foundation",
    url: "/whitepapers/On the security of ECDSA with additive key derivation and presignatures.pdf",
  },
  {
    date: "Feb 23, 2024",
    title: "Trustworthy confidential virtual machines for the masses",
    description: "Confidential Computing, TEEs, AMD SEV-SNP, Attestation, TLS",
    url: "/whitepapers/Trustworthy confidential virtual machines for the masses.pdf",
  },
  {
    date: "2023",
    title: "User-centric authentication in Web 3.0",
    description: "Björn Tackmann, DFINITY Foundation",
    url: "/whitepapers/User-centric authentication in Web 3.0.pdf",
  },
];

const TechnicalPaperItem = ({ date, title, description, url }) => {
  return (
    <Link
      to={url}
      className="technical-paper-item transition-all duration-200 ease-in-out mb-2 user-select-none !no-underline block"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex py-6 max-md:flex-col max-md:gap-4">
        <div className="w-[290px] shrink-0 max-md:w-full flex md:flex-col flex-row md:gap-2 gap-4">
          <div className="text-white text-base font-medium">
            Technical Paper
          </div>
          <div className="text-white/70 text-base">{date}</div>
        </div>
        <div className="flex-1">
          <h2 className="text-white text-2xl font-medium mb-4">{title}</h2>
          <p className="text-white/70 text-base">{description}</p>
        </div>
      </div>
    </Link>
  );
};

const TechnicalPapers = () => {
  return (
    <div className="mx-auto max-w-[1200px] py-8 md:py-10">
      <div className="flex flex-col">
        {technicalPapers.map((paper, index) => (
          <TechnicalPaperItem
            key={index}
            date={paper.date}
            title={paper.title}
            description={paper.description}
            url={paper.url}
          />
        ))}
      </div>
    </div>
  );
};

export default TechnicalPapers;
