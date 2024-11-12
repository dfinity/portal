import Link from "@docusaurus/Link";
import React, { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import LinkArrowRight from "../Common/Icons/LinkArrowRight";
import { NetworkStats } from "./NetworkStats";
import Blog from "./Blog";
import { TeaserCarousel } from "@site/src/components/DocsHome/TeaserCarousel";
import {
  CarouselCard,
  TeaserCard,
} from "@site/src/components/DocsHome/TeaserCard";
import { GlossaryTooltip } from "@site/src/components/Tooltip/GlossaryTooltip";

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
}

const languagesTiles: TileDescriptor[] = [
  {
    label: "Languages",
    description:
      "Explore coding, from beginner to pro, with our comprehensive guides, tutorials, samples, and API docs for Rust, Motoko, and TypeScript",
    icon: null,
    action: (
      <Link
        className="button button-primary rounded-2xl w-32"
        href="/docs/current/developer-docs/smart-contracts/write/overview"
      >
        View all
      </Link>
    ),
  },
  {
    label: "Motoko",
    description:
      "Get started with a high level programming language designed specifically for the Internet Computer",
    icon: (
      <img
        src="/img/docs/motoko.webp"
        alt="Motoko docs"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/docs/current/motoko/main/getting-started/motoko-introduction"
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
    action: (
      <Link
        href="/docs/current/developer-docs/backend/rust/"
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
      "Azle allows you to build Internet Computer apps using TypeScript and JavaScript, the languages of the web",
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
        href="/docs/current/developer-docs/backend/typescript/"
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
      "Bitfinity allows you to deploy smart contracts on the Internet Computer written in Solidity, a popular language for DeFi applications",
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
        href="/docs/current/developer-docs/backend/solidity/"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Go to Solidity docs"
      >
        <span className={"md:hidden"}>Go to Solidity docs</span>
        <LinkArrowRight />
      </Link>
    ),
  },
];

const frameworksTiles: TileDescriptor[] = [
  {
    label: "Quickstarts\n& Frameworks",
    description:
      "Start deploying on ICP easily with our Quickstart guides for developers, tailored to your preferred language",
    icon: null,
    action: (
      <Link
        className="button button-primary rounded-2xl w-32"
        href="/docs/current/developer-docs/web-apps/frameworks/juno"
      >
        View all
      </Link>
    ),
  },
  {
    label: "Juno",
    description:
      "Juno is a cutting-edge blockchain-as-a-service platform designed to enable developers to create decentralized applications at lightning speed",
    icon: (
      <img
        src="/img/docs/juno.svg"
        alt="Juno docs"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/docs/current/developer-docs/web-apps/frameworks/juno"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Go to Juno docs"
      >
        <span className={"md:hidden"}>Go to Juno docs</span>
        <LinkArrowRight />
      </Link>
    ),
  },
  {
    label: "Testnets",
    description: (
      <span>
        In contrast to other blockchain networks, there are no testnets on ICP.
        Instead, you can deploy a smart contract for free on the playground
        using the <GlossaryTooltip>IC SDK</GlossaryTooltip>
      </span>
    ),
    icon: (
      <img
        src="/img/dfinity_logo.svg"
        alt="Testnets guide"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/docs/current/developer-docs/getting-started/deploy/testnet"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Learn more about testnets on ICP"
      >
        <span className={"md:hidden"}>Learn more about the playground</span>
        <LinkArrowRight />
      </Link>
    ),
  },
  {
    label: "React",
    description:
      "Start here if you're coming to the Internet Computer Protocol as a React developer",
    icon: (
      <img
        src="/img/docs/react.svg"
        alt="React docs"
        className="w-10 h-10"
        loading="lazy"
      />
    ),
    action: (
      <Link
        href="/docs/current/developer-docs/getting-started/quickstart/react-quickstart"
        className="button button-ghost rounded-2xl md:w-20 button-with-icon"
        title="Go to React quickstart"
      >
        <span className={"md:hidden"}>Go to React quickstart</span>
        <LinkArrowRight />
      </Link>
    ),
  },
  {
    isGhostTile: true,
  },
];

const Tile = ({ tile }: { tile: TileDescriptor }) => {
  return (
    <div
      className={`flex flex-col ${
        tile.isGhostTile
          ? "bg-grey-200 border-grey-200 hidden lg:block"
          : "bg-white/70 border-white"
      } rounded-lg border border-solid p-4 h-[360px] justify-between`}
    >
      <div className={"flex flex-col gap-4 items-start"}>
        <div className={"flex flex-row gap-4"}>
          {tile.icon}
          <span className={"tw-heading-5 mb-6 whitespace-pre-wrap"}>
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
    label: "Chain Fusion",
    description:
      "Develop cross-chain applications using ICP's direct integrations with other networks",
    icon: null,
    action: (
      <Link
        className="button button-primary rounded-2xl w-50"
        href="/docs/current/developer-docs/multi-chain/overview"
      >
        Learn more
      </Link>
    ),
  },
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
        href="/docs/current/developer-docs/multi-chain/supported-chains"
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
        href="/docs/current/developer-docs/multi-chain/bitcoin/overview"
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
        href="/docs/current/developer-docs/multi-chain/ethereum/overview"
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
        href="/docs/current/developer-docs/multi-chain/chain-key-tokens/overview"
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
          Start your developer journey with Jessie
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
          href="/docs/current/tutorials/developer-journey/"
        >
          Start tutorials
          <LinkArrowRight />
        </Link>
      ),
      mainImage: "/img/docs/teaser-cards/main-1.svg",
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
          href="/docs/current/tutorials/hackathon-prep-course/"
        >
          Start course
          <LinkArrowRight />
        </Link>
      ),
      mainImage: "/img/docs/teaser-cards/hackathon-prep-course.svg",
    },
  ];
  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-3"
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
            className={
              "h-full relative py-8 px-8 flex-col rounded-lg grid sm:grid-cols-2 grid-cols-1 gap-2 justify-between flex-1"
            }
          />
        );
      })}
    </div>
  );
};

const DocsHomePage: FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-8">
        <div className="px-8 py-10 md:p-10 rounded-lg bg-infinite text-white sm:col-span-2 md:row-span-2 bg-center bg-cover flex flex-col">
          <div className="blob blob-md md:blob-lg blob-white md:blob-white-dense  -translate-y-[10%] z-0 md:opacity-30 " />

          <h1 className="tw-heading-3 sm:tw-heading-60 md:tw-heading-2 mb-14">
            Quick Start
          </h1>

          <div className={"flex flex-row gap-2 flex-wrap"}>
            <p className="mb-0">
              <Link
                className="button-white button-with-icon"
                href="/docs/current/developer-docs/getting-started/network-overview"
              >
                Learn more
                <LinkArrowRight />
              </Link>
            </p>
            <p className="mb-0">
              <Link
                className="button-white button-with-icon"
                href="https://play.motoko.org"
              >
                Start coding
                <LinkArrowRight />
              </Link>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[66%_33%_33%] gap-4 mt-12 tw-lead">
            <div>
              Become a “World Computer” developer who builds sovereign social
              media, games, enterprise apps, AI, Web3, DeFi and…
            </div>
            <div className="tw-paragraph text-white-80 flex flex-col gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12C3 10.067 4.567 8.5 6.5 8.5C7.7035 8.5 8.51959 8.9338 9.19914 9.61336C9.9255 10.3397 10.4851 11.3322 11.1258 12.4856L11.1595 12.5462C11.7605 13.6283 12.4431 14.8573 13.3866 15.8009C14.3946 16.8088 15.7035 17.5 17.5 17.5C20.5376 17.5 23 15.0376 23 12C23 8.96243 20.5376 6.5 17.5 6.5C15.8394 6.5 14.3508 7.2359 13.3423 8.39937C13.7887 9.05406 14.1574 9.70577 14.464 10.2574C15.0681 9.20718 16.2014 8.5 17.5 8.5C19.433 8.5 21 10.067 21 12C21 13.933 19.433 15.5 17.5 15.5C16.2965 15.5 15.4804 15.0662 14.8009 14.3866C14.0745 13.6603 13.5149 12.6678 12.8742 11.5144L12.8405 11.4538C12.2395 10.3717 11.5569 9.14265 10.6134 8.19914C9.60541 7.1912 8.2965 6.5 6.5 6.5C3.46243 6.5 1 8.96243 1 12C1 15.0376 3.46243 17.5 6.5 17.5C8.16056 17.5 9.64923 16.7641 10.6577 15.6006C10.2113 14.9459 9.84262 14.2942 9.53605 13.7426C8.93194 14.7928 7.79856 15.5 6.5 15.5C4.567 15.5 3 13.933 3 12Z"
                  fill="white"
                  fill-opacity="0.8"
                />
              </svg>
              End-to-end decentralization makes services immune to cyber attack,
              unstoppable, censorship-resistant, and optionally tokenized and
              autonomous.
            </div>
            <div className="tw-paragraph text-white-80 flex flex-col gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12C3 10.067 4.567 8.5 6.5 8.5C7.7035 8.5 8.51959 8.9338 9.19914 9.61336C9.9255 10.3397 10.4851 11.3322 11.1258 12.4856L11.1595 12.5462C11.7605 13.6283 12.4431 14.8573 13.3866 15.8009C14.3946 16.8088 15.7035 17.5 17.5 17.5C20.5376 17.5 23 15.0376 23 12C23 8.96243 20.5376 6.5 17.5 6.5C15.8394 6.5 14.3508 7.2359 13.3423 8.39937C13.7887 9.05406 14.1574 9.70577 14.464 10.2574C15.0681 9.20718 16.2014 8.5 17.5 8.5C19.433 8.5 21 10.067 21 12C21 13.933 19.433 15.5 17.5 15.5C16.2965 15.5 15.4804 15.0662 14.8009 14.3866C14.0745 13.6603 13.5149 12.6678 12.8742 11.5144L12.8405 11.4538C12.2395 10.3717 11.5569 9.14265 10.6134 8.19914C9.60541 7.1912 8.2965 6.5 6.5 6.5C3.46243 6.5 1 8.96243 1 12C1 15.0376 3.46243 17.5 6.5 17.5C8.16056 17.5 9.64923 16.7641 10.6577 15.6006C10.2113 14.9459 9.84262 14.2942 9.53605 13.7426C8.93194 14.7928 7.79856 15.5 6.5 15.5C4.567 15.5 3 13.933 3 12Z"
                  fill="white"
                  fill-opacity="0.8"
                />
              </svg>
              The Internet Computer (ICP) provides a 100% decentralized platform
              where devs can build without Big Tech and traditional IT.
            </div>
          </div>
        </div>
        <div className="px-6 py-8 md:p-10 border border-white border-solid rounded-lg bg-white/70 sm:col-span-2">
          <QueryClientProvider client={queryClient}>
            <NetworkStats></NetworkStats>
          </QueryClientProvider>
        </div>
        <div className="sm:col-span-2 md:h-96">
          <TeaserCarousel />
        </div>
      </section>

      <section>
        <div
          className="
          grid
          auto-cols-fr
          grid-rows-1
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          lg:grid-cols-5
          px-0
          gap-3
        "
        >
          {languagesTiles.map((tile, index) => (
            <Tile tile={tile} key={index} />
          ))}
        </div>
      </section>

      <section>
        <Education />
      </section>

      <section>
        <div
          className="
          grid
          auto-cols-fr
          grid-cols-1
          sm:grid-cols-2 
          md:grid-cols-4
          lg:grid-cols-5
          px-0
          gap-3
        "
        >
          {chainfusionTiles.map((tile, index) => (
            <Tile tile={tile} key={index} />
          ))}
        </div>
      </section>

      <section>
        <div
          className="
          grid
          auto-cols-fr
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          lg:grid-cols-5
          px-0
          gap-3
        "
        >
          {frameworksTiles.map((tile, index) => (
            <Tile tile={tile} key={index} />
          ))}
        </div>
      </section>

      <section>
        <Blog />
      </section>

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
    </div>
  );
};

export default DocsHomePage;
