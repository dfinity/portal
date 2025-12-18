import Link from "@docusaurus/Link";
import React, { FC, ReactNode } from "react";
import { QueryClient } from "react-query";
import LinkArrowRight from "../Common/Icons/LinkArrowRight";
import Blog from "./Blog";
import {
  CarouselCard,
  TeaserCard,
} from "@site/src/components/DocsHome/TeaserCard";
import LinkArrowUpRight from "../Common/Icons/LinkArrowUpRight";

const queryClient = new QueryClient();

const links = [
  {
    label: "Events & News",
    href: "https://dfinity.org/events-and-news/",
  },
  {
    label: "Technical Working Groups",
    href: "https://forum.dfinity.org/t/announcing-technical-working-groups/11781",
  },
  { label: "Join the Dev Forum", href: "https://forum.dfinity.org" },
  {
    label: "Dev Discord Office Hours",
    href: "https://discord.internetcomputer.org",
  },
  {
    label: "Developer Grants and Bounties",
    href: "https://dfinity.org/grants/",
  },
  { label: "Bug Bounty Program", href: "https://dfinity.org/bug-bounty/" },
];

interface TileDescriptor {
  isGhostTile?: boolean;
  action?: ReactNode | null;
  icon?: ReactNode | null;
  description?: ReactNode;
  label?: string;
  invertIconDarkMode?: boolean;
}

const languagesTiles: TileDescriptor[] = [
  {
    label: "Motoko",
    description:
      "Get started with an easy to learn domain-specific language that is able to leverage ICP features and is also perfect to let AI code solo when desired. This is a great choice for beginners.",
    icon: (
      <img
        src="/img/docs/motoko.svg"
        alt="Motoko docs"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/motoko/home"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Go to Motoko docs"
      >
        <span className={"md:hidden"}>Go to Motoko docs</span>
        <LinkArrowRight />
      </Link>
    ),
  },
  {
    label: "Rust",
    description:
      "Use Rust - a high performance and safe programming language to build high efficiency apps on Internet Computer",
    icon: (
      <img
        src="/img/docs/rust.webp"
        alt="Rust docs for the Internet Computer"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    invertIconDarkMode: true,
    action: (
      <Link
        href="/building-apps/developer-tools/cdks/rust/intro-to-rust"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Go to Rust docs"
      >
        <span className={"md:hidden"}>Go to Rust docs</span>
        <LinkArrowRight />
      </Link>
    ),
  },
  {
    label: "Typescript",
    description:
      "Code in the language of the web, TypeScript and JavaScript, using Azle.",
    icon: (
      <img
        src="/img/docs/typescript.webp"
        alt="TypeScript docs for the Internet Computer"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="https://demergent-labs.github.io/azle//"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Go to TypeScript docs"
      >
        <span className={"md:hidden"}>Go to TypeScript docs</span>
        <LinkArrowRight />
      </Link>
    ),
  },
  {
    label: "Solidity",
    description:
      "Deploy Solidity smart contracts on the Internet Computer with Bitfinity.",
    icon: (
      <img
        src="/img/docs/solidity.webp"
        alt="Solidity docs for the Internet Computer"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="https://docs.bitfinity.network/"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Go to Solidity docs"
      >
        <span className={"md:hidden"}>Go to Solidity docs</span>
        <LinkArrowRight />
      </Link>
    ),
  },
];


const Tile = ({ tile }: { tile: TileDescriptor }) => {
  return (
    <div
      className={`tile flex flex-col ${"bg-white/70 border-white"} rounded-lg border border-solid p-4 justify-between`}
    >
      <div className={"flex flex-col gap-4 items-start"}>
        <div className={"flex flex-row gap-4 items-center"}>
          <i className={`tile__icon ${tile?.invertIconDarkMode ? 'tile__icon--invert' : ''}`}>
            {tile.icon}
          </i>
          <span className={"tw-heading-5 whitespace-pre-wrap"}>
            {tile.label}
          </span>
        </div>
        <p>{tile.description}</p>
      </div>
      {tile.action}
    </div>
  );
};

const chainfusionTiles: TileDescriptor[] = [
  {
    label: "Supported chains",
    description: "Learn which chains ICP integrates with and how",
    icon: (
      <img
        src="/img/dfinity_logo.svg"
        alt="Supported chains"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/building-apps/chain-fusion/supported-chains"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="View the docs"
      >
        <span className={"md:hidden"}>View the docs</span>
        <LinkArrowRight />
      </Link>
    ),
  },
  {
    label: "Bitcoin",
    description: (
      <span>
        ICP has a direct integration with the Bitcoin network using a Bitcoin
        adapter and threshold signatures such as t-ECDSA and t-Schnorr. Learn
        how your canister can sign and submit transactions for BRC-20, Ordinals,
        Runes, and more
      </span>
    ),
    icon: (
      <img
        src="/img/chainfusion/ck_Tokens.png"
        alt="Bitcoin integration"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/build-on-btc/"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Learn more about the Bitcoin integration"
      >
        <span className={"md:hidden"}>
          Learn more about the Bitcoin integration
        </span>
        <LinkArrowRight />
      </Link>
    ),
  },
  {
    label: "Ethereum",
    description:
      "ICP canisters can sign and submit transactions directly to Ethereum and EVM chains through the EVM RPC canister. Learn more about how you can build Ethereum applications on ICP",
    icon: (
      <img
        src="/img/chainfusion/ck_Tokens-3.png"
        alt="React docs"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/building-apps/chain-fusion/ethereum/overview"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Learn more about the Ethereum integration"
      >
        <span className={"md:hidden"}>
          Learn more about the Ethereum integration
        </span>
        <LinkArrowRight />
      </Link>
    ),
  },
  {
    label: "Chain-key tokens",
    description: (
      <span>
        Chain-key tokens are digital twins of Bitcoin, Ethereum, and ERC-20
        tokens that are secured on ICP with chain-key cryptography
      </span>
    ),
    icon: (
      <img
        src="/img/chainfusion/ck_Tokens-2.png"
        alt="Bitcoin integration"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/defi/chain-key-tokens/overview"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Learn more about chain-key tokens"
      >
        <span className={"md:hidden"}>Learn more about chain-key tokens</span>
        <LinkArrowRight />
      </Link>
    ),
  },
];

const Education = () => {
  const CARDS: Array<CarouselCard> = [
    {
      title: (
        <h2 className={"text-white"}>
          Start your Developer Liftoff with Jessie
        </h2>
      ),
      subtitle: (
        <p className={"text-white"}>
          Work your way up to ICP Astronaut with this 5-level video series
        </p>
      ),
      backgroundImage: "/img/docs/teaser-cards/bg-1.svg",
      cta: (
        <Link
          className="button-transparent button-with-icon pl-0"
          href="/tutorials/developer-liftoff/"
        >
          Start tutorials
          <LinkArrowRight />
        </Link>
      ),
      mainImage: "/img/docs/teaser-cards/developerLadder.svg",
    },
    {
      title: <h2 className={"text-white"}>Hackathon Prep Course</h2>,
      subtitle: (
        <p className={"text-white"}>
          Jump-start your Hackathon project by learning the ICP essentials{" "}
        </p>
      ),
      backgroundImage: "/img/docs/teaser-cards/bg-0.svg",
      cta: (
        <Link
          className="button-transparent button-with-icon pl-0"
          href="/tutorials/hackathon-prep-course/"
        >
          Start course
          <LinkArrowRight />
        </Link>
      ),
      mainImage: "/img/docs/teaser-cards/hackathon-prep-course.svg",
    },
    {
      title: (
        <h2 className={"text-white"}>ICP Demystified: Learn the Essentials</h2>
      ),
      subtitle: (
        <p className={"text-white"}>
          Explore the protocol and its features with our “Zero to dApp Educate
          Series”.
        </p>
      ),
      backgroundImage: "/img/docs/teaser-cards/zero-dapp.webp",
      cta: (
        <Link
          className="button-transparent button-with-icon pl-0"
          href="https://www.youtube.com/playlist?list=PLuhDt1vhGcrcRcHvSKmxIgJAh1b3rcR7N&si=sIElj5bAkJeMqDoA"
        >
          Watch now
          <LinkArrowUpRight />
        </Link>
      ),
      mainImage: "/img/docs/teaser-cards/main-zero-to-dapp.webp",
    },
  ];
  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-3 grid-rows-2 md:grid-rows-1 gap-3"
      }
    >
      {CARDS.map((card, index) => {
        const backgroundStyles = card.backgroundImage
          ? {
              backgroundImage: `url(${card.backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }
          : {};
        return (
          <TeaserCard
            key={index}
            card={card}
            style={backgroundStyles}
            className={"h-full p-8 rounded-lg"}
          />
        );
      })}
    </div>
  );
};

function TeaserCardFooter({
  card,
  className,
}: {
  card: CarouselCard;
  className?: string;
}) {
  const backgroundStyles = card.backgroundImage
    ? {
        backgroundImage: `url(${card.backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }
    : {};
  return (
    <div
      className={className}
      style={{
        ...backgroundStyles,
      }}
    >
      <div className={"p-6 flex flex-col justify-between "}>
        <div className={"flex flex-col"}>
          {card.title}
          {card.subtitle}
          {card.cta}
        </div>
        {card.mainImage && (
          <img
            loading="lazy"
            className={"sm:hidden"}
            src={card.mainImage}
            alt={typeof card.title === "string" ? card.title : "Card image"}
          />
        )}
      </div>
      {card.mainImage && (
        <div className={"justify-center hidden sm:flex"}>
          <img
            className={"mt-auto"}
            src={card.mainImage}
            alt={typeof card.title === "string" ? card.title : "Card image"}
          />
        </div>
      )}
    </div>
  );
}

const footerCards: Array<CarouselCard> = [
  {
    title: (
      <h2 className={"text-white"}>Follow @DFINITYDev on X for tech news</h2>
    ),
    subtitle: (
      <p className={"text-white"}>All devs, geeks, & tech fans welcome</p>
    ),
    backgroundImage: "/img/docs/teaser-cards/bg-0.svg",
    cta: (
      <Link
        className="button-transparent button-with-icon pl-0"
        href="https://twitter.com/DFINITYDev"
      >
        Follow now
        <LinkArrowRight />
      </Link>
    ),
    mainImage: "/img/docs/teaser-cards/main-0.svg",
  },
  {
    title: <h2 className={"text-white"}>Developer office hours on Discord</h2>,
    subtitle: (
      <p className={"text-white"}>Every Wednesday 9AM CET/CEST and 8AM PST/PDT</p>
    ),
    backgroundImage: "/img/docs/teaser-cards/bg-2.svg",
    cta: (
      <Link
        className="button-transparent button-with-icon pl-0"
        href="https://discord.internetcomputer.org"
      >
        Join Discord
        <LinkArrowRight />
      </Link>
    ),
    mainImage: "/img/docs/teaser-cards/main-2.svg",
  },
];

const DocsHomePage: FC = () => {
  return (
    <div className="flex flex-col gap-10 docshome">
      <section className="flex flex-col gap-16">
        
        <div className="tile bg-white/70 border-white rounded-lg border border-solid p-4 justify-between px-8 py-10 md:p-10 sm:col-span-2 md:row-span-2 bg-center bg-cover flex flex-col relative overflow-hidden">
          <h1 className="tw-heading-3 sm:tw-heading-60 md:tw-heading-2 mb-8">
            Quick Start
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr] gap-8 mt-4 mb-8 tw-lead">
            <div className="mb-auto">
              Become a “World Computer” developer who builds sovereign social
              media, games, enterprise apps, AI, Web3, DeFi and _
            </div>
            <div className="mb-auto tw-paragraph text-white-80 flex flex-col gap-2">
              The Internet Computer (ICP) provides a 100% decentralized platform
              where devs can build without Big Tech and traditional IT.
            </div>
            <div className="mb-auto tw-paragraph text-white-80 flex flex-col gap-2">
              End-to-end decentralization makes services immune to cyber attack,
              unstoppable, censorship-resistant, and optionally tokenized and
              autonomous.
            </div>
          </div>


          <div className={"flex flex-row gap-2 flex-wrap items-end"}>
            <p className="mb-0">
              <Link
                className="button-primary button-with-icon"
                href="https://caffeine.ai/"
              >
                CREATE USING AI
                <LinkArrowUpRight />
              </Link>
            </p>
             <p className="mb-0">
              <Link
                className="button-primary button-with-icon"
                href="https://icp.ninja/"
              >
                INSTANT WEB IDE
                <LinkArrowUpRight />
              </Link>
            </p>
            <p className="mb-0">
              <Link
                className="button-primary button-with-icon"
                href="/building-apps/getting-started/quickstart"
              >
                SDK BUILD
                <LinkArrowRight />
              </Link>
            </p>
          </div>


        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr,4fr] gap-24 relative z-2">
          <div>
            <h2 className="tw-heading-4 md:tw-heading-3">Languages</h2>
            <p className="tw-paragraph">
              Beginner or pro, our comprehensive guides, tutorials, samples, and
              API docs have you covered.
            </p>
            <Link
              className="button-ghost rounded-2xl"
              href="/building-apps/developer-tools/cdks/"
            >
              View all
            </Link>
          </div>
          <div>
            <div className="grid md:grid-cols-2 gap-4">
              {languagesTiles.map((tile, index) => (
                <Tile tile={tile} key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div>
            <h2 className="tw-heading-4 md:tw-heading-3">Courses</h2>
            <Education />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-[2fr,4fr] gap-24 mt-20">
        <div>
          <h2 className="tw-heading-4 md:tw-heading-3">Chain Fusion</h2>
          <p className="tw-paragraph">
            Develop cross-chain applications using ICP's direct integrations
            with other networks
          </p>
          <Link
            className="button-primary rounded-2xl"
            href="/building-apps/chain-fusion/overview"
          >
            LEARN MORE
          </Link>
        </div>
        <div>
          <div className="grid md:grid-cols-2 gap-4">
            {chainfusionTiles.map((tile, index) => (
              <Tile tile={tile} key={index} />
            ))}
          </div>
        </div>
      </div>

      <section>
        <Blog />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-4 ">
        {footerCards.map((card, index) => (
          <TeaserCardFooter card={card} key={index} className="rounded-lg" />
        ))}
      </div>
      <section className="bg-infinite">
        <section className="bg-infinite -mx-4 px-4 sm:-mx-8 sm:px-8 md:mx-[-50px] md:px-[50px] text-white py-10 md:pt-14 md:pb-20">
          <div className=" bg-gradient-to-r from-[#6A85F199] to-[#C572EF99] rounded-lg px-6 py-8 md:p-8 flex flex-col md:flex-row gap-20">
            <div className="md:flex-[4] md:flex md:flex-col items-start">
              <div className="tw-heading-6 mb-10">
                Contribute to the
                <br />
                Internet Computer
              </div>
              <h2 className="tw-heading-3 mb-4 sm:w-5/10 md:w-8/10">
                Help us make the docs better
              </h2>
              <p className="tw-paragraph mb-10 sm:w-6/10 md:w-8/10 md:flex-1">
                These docs are a community effort. Create a PR if you see
                mistakes, room for improvement, or new opportunities to help IC
                developers.
              </p>
              <Link
                href="https://github.com/dfinity/portal"
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline-white"
              >
                Contribute
              </Link>
            </div>
            <div className="flex flex-col gap-2 md:flex-[5]">
              {links.map(({ label, href }) => (
                <Link
                  className="px-8 py-6 bg-infinite/60 text-white tw-heading-6 flex justify-between items-center gap-4 border border-solid border-[#672AE999] rounded-lg hover:opacity-80 hover:text-white hover:no-underline"
                  href={href}
                  key={label}
                >
                  {label}
                  <LinkArrowRight />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default DocsHomePage;
