import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import StartBuildingSection from "@site/src/components/LandingPage/StartBuilding";
import Layout from "@theme/Layout";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import CommunityStories, {
  englishOpenChatCopy,
} from "../components/LandingPage/CommunityStories/CommunityStories";
import FoundationSection from "../components/LandingPage/Foundation";
import Highlights, {
  HighlightCard,
} from "../components/LandingPage/Highlights/Highlights";
import Hero from "../components/LandingPage/Hero";
import SectionsBar from "../components/LandingPage/SectionsBar";
import ShowcaseSection from "../components/LandingPage/Showcase";
import Sustainable from "../components/LandingPage/Sustainable/Sustainable";
import Vision, { HashTag } from "../components/LandingPage/Vision/Vision";
import Link from "@docusaurus/Link";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import projects from "@site/.docusaurus/home-showcase/default/home-showcase.json";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import Newsletter from "../components/Common/Newsletter/Newsletter";

const queryClient = new QueryClient();

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <QueryClientProvider client={queryClient}>
        <Hero
          headline="World Computer"
          subheading="Decentralize Everything"
          dashboard={{
            ctaLabel: "INTERNET COMPUTER DASHBOARD",
            ctaHref: "https://dashboard.internetcomputer.org/",
            linkHref: "https://wiki.internetcomputer.org/wiki/L1_comparison",
            linkLabel: "Comparison of Layer-1 blockchains",
          }}
          stats={{
            title: "World’s Highest Usage Blockchain",
            blocks: {
              statLabel: "Blocks processed",
              parallelSubnets: "parallel subnets",
              blockThroughput: "MB/s block throughput capacity",
              title: "Throughput",
              description: (
                <>
                  Capacity horizontally scales as subnet blockchains are
                  seamlessly combined into one unified blockchain. Blocks and
                  transactions per second are unbounded.
                </>
              ),
            },
            txRate: {
              statLabel: "ETH equivalent TX/s",
              txRate: "Transactions/s",
              title: "Comparing Transactions",
              description: (
                <>
                  Transactions invoke "actor" canister smart contract
                  computations, which subnet blockchains can run concurrently
                  (yet deterministically).
                </>
              ),
            },

            storageCost: {
              figureLabel: "Amount of on-chain storage for $1",
              title: "ICP Costs $5 / GB / year",
              description: (
                <>
                  Storing data in smart contract memory allows ICP dapps to
                  dynamically access it without querying external sources or
                  relying on centralized cloud storage.
                </>
              ),
            },

            instructionCost: {
              stat: "$0.000000000000536",
              statLabel: "Cost per instruction",
              costComparison: "44’760’000x less expensive than ETH",
              ethCost: "ETH - $0.00024",
              title: "Crypto Cloud Efficiency",
              description: (
                <>
                  An average ICP transaction executes 6’660’000 instructions
                  compared to ETH’s 83’000, while each instruction is orders of
                  magnitude less expensive due to ICP’s efficiency.
                </>
              ),
            },
          }}
        ></Hero>
      </QueryClientProvider>

      <main
        className="w-full relative bg-[#F1EEF5] z-[0]"
        style={{ marginTop: "calc(var(--ifm-navbar-height) * -1)" }}
      >
        <Vision
          hashTags={[
            <HashTag
              className="hidden md:block absolute right-[-170px] bottom-[400px]"
              href="https://twitter.com/search?q=%23InternetComputer"
            >
              #InternetComputer
            </HashTag>,

            <HashTag
              className="hidden md:block absolute right-[-170px] bottom-[270px]"
              href="https://twitter.com/search?q=%23ICP"
            >
              #ICP
            </HashTag>,

            <HashTag
              className="hidden md:block absolute right-[-40px] bottom-[150px]"
              href="https://twitter.com/search?q=%23WorldComputer"
            >
              #WorldComputer
            </HashTag>,
          ]}
        >
          <p>Today, blockchains only process tokens and clips of data.</p>

          <p>
            Tomorrow, blockchain will become a decentralized{" "}
            <em>crypto cloud</em>.
          </p>

          <p>
            Blockchain will eat the centralized cloud, and become the{" "}
            <em>everything stack</em>, which hosts unstoppable systems and
            services, and rich fully-decentralized Web3 experiences.
          </p>

          <p>
            It's already happening at scale on the Internet Computer, which is
            powering a <em>blockchain singularity</em>.
          </p>

          <p>Join the movement.</p>
          <p className="pt-6 flex flex-col gap-8 items-start">
            <Link href="/capabilities" className="button-primary text-center">
              Internet Computer capabilities
            </Link>

            <Link
              href="https://wiki.internetcomputer.org/wiki/History"
              className="link-primary link-with-icon"
            >
              Wiki history of the Internet Computer
              <LinkArrowUpRight />
            </Link>
          </p>
        </Vision>
        <CommunityStories
          title="Community Stories"
          openChat={englishOpenChatCopy}
          projects={[
            {
              title:
                "Relation has grown organically to utilize 67'000 canister smart contracts",
              body: (
                <>
                  Relation is making the social relations of individuals
                  decentralized. Every Soul can mint readable, understandable,
                  programmable SBTs to represent proofs of friendship,
                  affiliations, membership certificate qualifications, and
                  commitments.
                </>
              ),
              imageUrl: "/img/home/relation.webp",
            },
            {
              title:
                "ICDex is DeFi 3.0 in the form of a fully on-chain orderbook exchange",
              body: (
                <>
                  Imagine a fully on-chain Coinbase! CeFi-like functionality is
                  now provided by a fully on-chain DEX &mdash; the UX, the
                  orderbook, order-matching and AMM. It plans to list all assets
                  using "chain key" crypto, and transition updates to fully
                  decentralized DAO automation.
                </>
              ),
              imageUrl: "/img/home/icdex.webp",
            },
          ]}
        ></CommunityStories>
        <div className="overflow-hidden">
          <ShowcaseSection
            // Find the list of showcase projects here: /plugins/home-showcase.js
            projects={projects}
            className="pb-[320px]"
            lines={[
              "DeFi",
              "Metaverse",
              "Social media",
              "Social networking",
              "Multi-chain dapps",
              "Enterprise services",
              "R&D infrastructure",
              "Fundraising",
              "Publishing",
              "Messaging ",
              "Gaming",
              "NFTs",
            ]}
            subheading="Featuring a few web3 project teams reinventing the internet on the ICP blockchain."
            linePostfix="on True Web3"
            moreCta="More Ecosystem Projects"
          ></ShowcaseSection>
        </div>
        <BackgroundPanel
          panelClassName="bg-gradient-to-bl from-[#e07934] via-[#964680] to-[#4421a0]"
          id="comparison"
          threshold={0}
          rootMargin="-30% 0px"
        >
          <Highlights title="Disruption in Motion">
            <HighlightCard
              title="Sovereign Hardware"
              imageUrl="/img/home/img-sovereign-hardware.webp"
              open={true}
            >
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                The internet runs on routing devices
              </p>
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Bitcoin runs on PoW mining rigs
              </p>
              <p className="text-white tw-lead md:tw-title-sm mb-10 md:mb-20">
                The Internet Computer runs on node machines (PoUW)
              </p>
              <p className="mb-0 flex flex-col gap-6 items-start">
                <Link
                  href="https://wiki.internetcomputer.org/wiki/Proof_of_Useful_Work"
                  className="link-white link-with-icon"
                >
                  Wiki explanation of Proof of Useful Network
                  <LinkArrowUpRight />
                </Link>
              </p>
            </HighlightCard>
            <HighlightCard
              title="Intelligent Blockchain"
              imageUrl="/img/home/img-intelligent-blockchain.webp"
            >
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Web2 apps are updated by companies
              </p>
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Traditionally, blockchains are updated using protocol forks. 
              </p>
              <p className="text-white tw-lead md:tw-title-sm mb-10 md:mb-20">
                The Internet Computer is updated by a fully automated DAO
              </p>
              <p className="mb-0 flex flex-col gap-6 items-start">
                <Link href="/nns" className="link-white link-with-icon">
                  <LinkArrowRight />
                  What is the NNS DAO
                </Link>
              </p>
            </HighlightCard>
            <HighlightCard
              title="Web2 Compatible"
              imageUrl="/img/home/img-web2-compatible.webp"
            >
              <ul className="tw-lead-sm md:tw-lead-lg text-white list-none checklist space-y-6">
                <li className="checklist-item-white pl-8 md:pl-12 bg-[length:24px] md:bg-[length:36px]">
                  Web experiences served by smart contracts
                </li>
                <li className="checklist-item-white pl-8 md:pl-12 bg-[length:24px] md:bg-[length:36px]">
                  Web2 APIs processed through consensus
                </li>
                <li className="checklist-item-white pl-8 md:pl-12  bg-[length:24px] md:bg-[length:36px]">
                  Googleable smart contracts
                </li>
              </ul>

              <p className="mt-20 mb-0 flex flex-col gap-6 items-start">
                <Link
                  href="/capabilities"
                  className="link-white link-with-icon"
                >
                  <LinkArrowRight />
                  More ICP Capabilities
                </Link>
              </p>
            </HighlightCard>
            <HighlightCard
              title="Multi-chain"
              imageUrl="/img/home/img-multi-chain.webp"
            >
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Bitcoin transfers digital gold without intermediaries
              </p>
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Ethereum hosts unstoppable smart contract code
              </p>
              <p className="text-white tw-lead md:tw-title-sm mb-10 md:mb-20">
                The Internet Computer can execute code on any blockchain and
                process any asset
              </p>
              <p className="mb-0 flex flex-col gap-6 items-start">
                <Link
                  href="/bitcoin-integration"
                  className="link-white link-with-icon"
                >
                  <LinkArrowRight />
                  Bitcoin on ICP
                </Link>
                <Link
                  href="/ethereum-integration"
                  className="link-white link-with-icon"
                >
                  <LinkArrowRight />
                  Ethereum on ICP
                </Link>
              </p>
            </HighlightCard>
          </Highlights>
        </BackgroundPanel>
        <div className="overflow-hidden">
          <Sustainable id="sustainable">
            <h2 className="tw-heading-3 md:tw-heading-60 mb-6">
              Transparently Sustainable Blockchain
            </h2>
            <p className="tw-lead-sm mb-6">
              Scalability and utility with low carbon cost — the Internet
              Computer is committed to building green tech, not just making
              claims about it.{" "}
            </p>
            <p className="mb-0">
              <Link
                className="button-outline-white text-center"
                href="/capabilities/sustainability"
              >
                About ICP sustainability
              </Link>
            </p>
          </Sustainable>
          <StartBuildingSection
            id="startBuilding"
            title="Become a Web3 pioneer"
            body="Start a DAO, create a token, build dapps and host assets with the full stack entirely on-chain."
            cta="BUILD REAL WEB3"
            ctaLink="/developers"
            cards={[
              {
                title: "Dev Forum",
                body: "Engage with the ICP community to shape future features, propose new ideas, and ask questions. ",
                link: "https://forum.dfinity.org",
              },
              {
                title: "Dev Docs",
                body: "Get to know the concepts,  architecture and technical breakthroughs that enable the ICP. Plus step-by-step guides on how to stake your tokens, and more.",
                link: "/docs/current/home",
              },
              {
                title: "Sample Code",
                body: "From a simple DEX, to on-chain encrypted storage, NFT minting, and a basic DAO, learn how to build on the Internet Computer.",
                link: "/samples",
              },
              {
                title: "Motoko Playground",
                body: "Play around with Motoko, the native language of the Internet Computer, right in the browser without having to download the SDK.",
                link: "https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/",
              },
            ]}
          />

          <FoundationSection
            title={
              <>
                The blockchain industry's
                <br />
                Skunk Works
              </>
            }
            body={
              <>
                The DFINITY Foundation is committed to realizing the most
                disruptive vision in tech: the adoption of public blockchain as
                a single technology stack that hosts all of humanity’s systems
                and services.
              </>
            }
            stats={[
              { name: "Team members", value: "270+" },
              { name: "Publications", value: "1,564" },
              { name: "Citations", value: "86,347" },
              { name: "Patents", value: "191" },
            ]}
            cta="Visit the Dfinity Foundation"
            ctaUrl="https://dfinity.org"
          ></FoundationSection>

          <section className="mt-30 mb-20  md:mt-52 md:mb-30 " id="subscribe">
            <Newsletter
              fields={[
                {
                  name: "EMAIL",
                  placeholder: "Email",
                  type: "email",
                  required: true,
                },
              ]}
              ctaLabel="Get updates!"
              postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0"
              decoration={
                <img
                  src="/img/newsletter/email-image-2.webp"
                  alt=""
                  loading="lazy"
                />
              }
              className="mb-20 relative"
            >
              <div className="hidden md:block blob blob-infinite blob-lg blob-top-right z-[-1]"></div>
              <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8 md:pr-10">
                Sign up{" "}
                <span className="text-white-60">
                  to stay in the loop with the Internet Computer
                </span>
              </h2>
            </Newsletter>
          </section>
        </div>
      </main>
      <SectionsBar />
    </Layout>
  );
}
