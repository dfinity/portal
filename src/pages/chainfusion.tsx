import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import Card from "@site/src/components/SamplesPage/Card";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import IntraPageNav from "../components/Common/IntraPageNav";
import { sampleItems } from "../components/Common/sampleItems";
import ShareMeta from "../components/Common/ShareMeta";
import CodeBlockString from "../theme/CodeBlock/Content/String";
import { unreachable } from "../utils/unreachable";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import { useScrollSpyMenu } from "../utils/use-scroll-spy-menu";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LinkArrowUp from "../components/Common/Icons/LinkArrowUp";
import LinkArrowDown from "../components/Common/Icons/LinkArrowDown";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import News from "../components/BitcoinIntegrationPage/News";
import Newsletter from "../components/Common/Newsletter/Newsletter";
import GetBiggerPicture from "/img/chainfusion/get-picture.svg";
import CodeSnippet from "../components/CodeSnippet";
import { set } from "date-fns";

const ContentCard: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className }) => {
  return (
    <div className="flex flex-col gap-6 content-card-with-id" id={id}>
      {children}
    </div>
  );
};

const StickySectionNav: React.FC<{
  className?: string;
  onItemClick: (e, index: number) => void;
  highlightedIndex: number;
  title: React.ReactNode;
  items: string[];
}> = ({ className, highlightedIndex, onItemClick, items, title }) => {
  return (
    <div className={clsx("sticky top-10", className)}>
      {title}
      <ul className="list-none p-0 space-y-4 m-0 hidden md:block">
        {items.map((card, index) => (
          <li key={index}>
            <button
              onClick={(e) => onItemClick(e, index)}
              className={clsx(
                "border-none bg-transparent appearance-none text-left font-circular",
                highlightedIndex !== index
                  ? "text-black-30 tw-heading-7"
                  : "tw-heading-6"
              )}
            >
              {card}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LogoSm = ({ className, color = "white" }) => (
  <svg
    viewBox="0 0 583 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="textGradientPurple" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="6.01%" stopColor="#C772EF" />
        <stop offset="100%" stopColor="#6A85F1" />
      </linearGradient>
    </defs>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M53.7014 24.0234H37.969C36.5627 27.8906 32.1682 28.8281 26.8947 28.8281C20.6252 28.7402 15.2932 27.5684 15.3811 21.1523V20.1855C15.2932 13.7109 20.6252 12.5977 26.8947 12.5098C32.1682 12.5098 36.5334 13.418 37.969 17.2852H53.7014C52.7346 4.01367 41.0744 0.0292969 26.8947 0C12.1291 0.0585938 -0.0583834 4.33594 0.000210397 19.2188V22.0898C-0.0583834 37.002 12.1291 41.2793 26.8947 41.3086C41.0744 41.3086 52.7346 37.3242 53.7014 24.0234ZM409.482 13.9453C409.482 15.6738 414.258 15.9082 420.439 16.2012L420.508 16.2046C431.49 16.761 446.865 17.54 446.836 27.3926C446.836 38.6426 433.945 41.3086 420.117 41.3086C406.318 41.2793 394.863 39.6094 393.398 27.3926H409.482C411.24 30.4395 415.313 31.2305 420.117 31.2305C424.893 31.2305 430.752 30.4395 430.752 27.3926C430.752 25.6641 425.977 25.4004 419.795 25.1074L419.726 25.104C408.745 24.5476 393.369 23.7686 393.398 13.9453C393.398 2.69531 406.289 0 420.117 0C433.916 0.0878906 445.371 1.64062 446.836 13.9453H430.752C428.994 10.8398 424.922 10.1074 420.117 10.1074C415.342 10.1074 409.482 10.8105 409.482 13.9453ZM497.696 0C512.52 0 524.561 4.33594 524.561 19.2188V22.0898C524.619 36.9727 512.49 41.2793 497.696 41.3086C482.871 41.2793 470.742 36.9727 470.801 22.0898V19.2188C470.742 4.30664 482.871 0.0292969 497.696 0ZM509.209 21.123V20.1562C509.297 13.7402 503.965 12.5684 497.696 12.4805C491.397 12.5684 486.065 13.7402 486.153 20.1562V21.123C486.065 27.5684 491.397 28.7402 497.696 28.8281C503.965 28.7402 509.297 27.5684 509.209 21.123ZM567.568 21.8262V0.966797H582.949V40.3418H565.664L544.512 16.2891V40.3418H529.16V0.966797H550.283L567.568 21.8262ZM466.289 0.966797H450.938V40.3418H466.289V0.966797ZM373.623 0.966797V21.1523C373.711 27.627 368.379 28.7402 362.11 28.8281C355.811 28.7402 350.508 27.627 350.567 21.1523V0.966797H335.215V22.1191C335.156 37.002 347.344 41.2793 362.11 41.3086C376.875 41.2793 389.063 37.002 389.004 22.1191V0.966797H373.623ZM282.715 40.4004V1.02539H330.732V13.5059H298.066V18.3105H326.895V29.8242H298.066V40.4004H282.715ZM236.865 0.966797V21.8262L219.58 0.966797H198.457V40.3418H213.809V16.2891L234.961 40.3418H252.246V0.966797H236.865ZM174.961 0.966797H190.312V40.3418H174.961V0.966797ZM138.105 24.0527L143.525 12.4219L148.916 24.0527H138.105ZM134.385 1.02539L113.262 40.4004H130.547L133.652 33.6621H153.369L156.475 40.4004H173.76L152.637 1.02539H134.385ZM96.709 26.8945H73.6523V40.3418H58.3008V0.966797H73.6523V14.4141H96.709V0.966797H112.09V40.3418H96.709V26.8945Z"
      fill={`${
        color === "text-gradient-purple" ? "url(#textGradientPurple)" : "white"
      }`}
    />
  </svg>
);

const LogoNewLine = ({ className, color = "white" }) => (
  <svg
    viewBox="0 0 301 102"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="textGradientPurple" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="6.01%" stopColor="#C772EF" />
        <stop offset="100%" stopColor="#6A85F1" />
      </linearGradient>
    </defs>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M53.7014 24.332H37.969C36.5627 28.1992 32.1682 29.1367 26.8947 29.1367C20.6252 29.0488 15.2932 27.877 15.3811 21.4609V20.4941C15.2932 14.0195 20.6252 12.9062 26.8947 12.8184C32.1682 12.8184 36.5334 13.7266 37.969 17.5938H53.7014C52.7346 4.32227 41.0744 0.337891 26.8947 0.308594C12.1291 0.367188 -0.0583834 4.64453 0.000210397 19.5273V22.3984C-0.0583834 37.3105 12.1291 41.5879 26.8947 41.6172C41.0744 41.6172 52.7346 37.6328 53.7014 24.332ZM236.865 1.27539V22.1348L219.58 1.27539H198.457V40.6504H213.809V16.5977L234.961 40.6504H252.246V1.27539H236.865ZM126.768 74.2539C126.768 75.9824 131.543 76.2168 137.725 76.5098L137.793 76.5132C148.775 77.0696 164.15 77.8486 164.121 87.7012C164.121 98.9512 151.231 101.617 137.402 101.617C123.604 101.588 112.148 99.918 110.684 87.7012H126.768C128.525 90.748 132.598 91.5391 137.402 91.5391C142.178 91.5391 148.037 90.748 148.037 87.7012C148.037 85.9727 143.262 85.709 137.08 85.416L137.012 85.4125C126.03 84.8562 110.654 84.0772 110.684 74.2539C110.684 63.0039 123.574 60.3086 137.402 60.3086C151.201 60.3965 162.656 61.9492 164.121 74.2539H148.037C146.279 71.1484 142.207 70.416 137.402 70.416C132.627 70.416 126.768 71.1191 126.768 74.2539ZM214.981 60.3086C229.805 60.3086 241.846 64.6445 241.846 79.5273V82.3984C241.905 97.2812 229.776 101.588 214.981 101.617C200.156 101.588 188.028 97.2812 188.086 82.3984V79.5273C188.028 64.6152 200.156 60.3379 214.981 60.3086ZM226.494 81.4316V80.4648C226.582 74.0488 221.25 72.877 214.981 72.7891C208.682 72.877 203.35 74.0488 203.438 80.4648V81.4316C203.35 87.877 208.682 89.0488 214.981 89.1367C221.25 89.0488 226.582 87.877 226.494 81.4316ZM284.854 82.1348V61.2754H300.234V100.65H282.949L261.797 76.5977V100.65H246.445V61.2754H267.568L284.854 82.1348ZM183.574 61.2754H168.223V100.65H183.574V61.2754ZM90.9084 61.2754V81.4609C90.9963 87.9355 85.6643 89.0488 79.3947 89.1367C73.0959 89.0488 67.7932 87.9355 67.8518 81.4609V61.2754H52.5002V82.4277C52.4416 97.3105 64.6291 101.588 79.3947 101.617C94.1604 101.588 106.348 97.3105 106.289 82.4277V61.2754H90.9084ZM0 100.709V61.334H48.0176V73.8145H15.3516V78.6191H44.1797V90.1328H15.3516V100.709H0ZM174.961 1.27539H190.312V40.6504H174.961V1.27539ZM138.105 24.3613L143.525 12.7305L148.916 24.3613H138.105ZM134.385 1.33398L113.262 40.709H130.547L133.652 33.9707H153.369L156.475 40.709H173.76L152.637 1.33398H134.385ZM96.709 27.2031H73.6523V40.6504H58.3008V1.27539H73.6523V14.7227H96.709V1.27539H112.09V40.6504H96.709V27.2031Z"
      fill={`${
        color === "text-gradient-purple" ? "url(#textGradientPurple)" : "white"
      }`}
    />
  </svg>
);

function ChainFusion() {
  const heroRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  const isDark = useDarkHeaderInHero(heroRef);
  type ContentCardType = {
    title: string;
    id: string;
  };
  const [content, setContent] = React.useState<ContentCardType[]>([]);
  const highlight = useScrollSpyMenu(".content-card-with-id");
  const [codeSnippetsExpanded, setCodeSnippetsExpanded] = useState([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const cards = document.querySelectorAll(".content-card-with-id");
    const content: {
      title: string;
      id: string;
    }[] = [];
    for (const card of Array.from(cards)) {
      const id = card.id;
      const title = card.querySelector("h3")?.textContent;
      content.push({ title, id });
    }
    setContent(content);
  }, []);

  function onItemClick(e, index: number) {
    const target = document.querySelectorAll(`.content-card-with-id`)[index];

    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 115;

      location.hash = content[index].id;

      window.scrollTo({ top: y, behavior: "smooth" });

      e.preventDefault();
      return false;
    }
  }

  return (
    <Layout
      title="Chain Fusion Technology"
      description="ICP enables direct interoperability with all major blockchains, including Bitcoin, Ethereum, and other EVMs (and soon Solana),
      without relying on any trusted intermediary. Unlike other blockchains, ICP smart contracts can read from
      and write to different chains, enabling developers to write smart contracts that span different chains. This is Chain Fusion."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-chainfusion.jpg"></ShareMeta>

      <main
        className="text-black relative "
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
          contain: "paint",
        }}
      >
        {isDark && <DarkHeroStyles bgColor="infinite"></DarkHeroStyles>}

        <section
          className="overflow-hidden bg-[#1E005D] text-white pt-20 relative"
          ref={heroRef}
        >
          <img
            src="img/chainfusion/bg-hero.webp"
            alt=""
            className="object-cover absolute inset-0 size-full"
          />
          <section className="flex flex-col justify-center w-full bg-black mix-blend-screen">
            <div className="flex overflow-hidden relative flex-col pt-20 w-full min-h-[927px] max-md:max-w-full">
              <div className="flex relative flex-col px-20 pb-20 mt-36 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <h3 className="self-center tw-heading-5 md:tw-heading-3">
                  Powered by
                </h3>
                <img
                  src="img/chainfusion/chainfusion-logo.svg"
                  alt="Company Logo"
                  className="self-center mt-9 max-w-full aspect-[3.7] w-1/2"
                />
                <p className="tw-heading-5 md:tw-heading-3 self-center mt-12 text-right text-white">
                  Reducing Friction in Web3
                </p>
                <Link className="button-white self-start mt-12 mb-28 ml-80 ">
                  Build with Chain fusion
                </Link>
              </div>
            </div>
          </section>
        </section>

        <section className="bg-[#1E005D]">
          <AnimateSpawn
            className="container-8 py-20 md:py-30 "
            variants={transitions.container}
            el={motion.section}
          >
            <h3 className="tw-heading-4 md:tw-heading-3 text-gradient-purple">
              <LogoSm className="h-[0.76em] mb-[0.14em] align-middle mr-1 md:mr-2" />{" "}
              enables ICP smart contracts to interact with other networks, such
              as Bitcoin and Ethereum, to give them more possibilities.{" "}
            </h3>
          </AnimateSpawn>

          <AnimateSpawn
            className="container-6 pt-24 md:pt-24 "
            variants={transitions.container}
            el={motion.section}
          >
            <GetBiggerPicture className="overflow-visible" />
          </AnimateSpawn>
          <AnimateSpawn
            className="container-8 pt-8 pb-24 md:pb-40 "
            variants={transitions.container}
            el={motion.section}
          >
            <img src="/img/chainfusion/chainfusion-grafic.webp" alt="" />
          </AnimateSpawn>
        </section>
        <section>
          <AnimateSpawn
            className="container-10 justify-center items-center pt-20 md:pb-20 md:pt-40"
            variants={transitions.container}
            el={motion.section}
          >
            <Tabs className="justify-center mb-5 md:mb-10">
              <TabItem value="btc" label="Build with BTC" default>
                <CodeSnippet
                  title="Build with BTC"
                  description="Sed posuere consectetur est at lobortis. Aenean lacinia bibendum nulla sed consectetur. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit."
                  link="/docs/current/developer-docs/multi-chain/bitcoin/using-btc/submit-transactions#sending-transactions"
                  snippet={{
                    language: "motoko",
                    code: `type ManagementCanisterActor = actor {
  bitcoin_send_transaction : SendTransactionRequest -> async ();
};
let management_canister_actor : ManagementCanisterActor = actor("aaaaa-aa");
public func send_transaction(network : Network, transaction : [Nat8]) : async () {
  let transaction_fee =
      SEND_TRANSACTION_BASE_COST_CYCLES + transaction.size() * SEND_TRANSACTION_COST_CYCLES_PER_BYTE;
  ExperimentalCycles.add(transaction_fee);
  await management_canister_actor.bitcoin_send_transaction({
      network;
      transaction;
  })
};`,
                  }}
                  isExpanded={codeSnippetsExpanded[0]}
                  toggleExpand={() =>
                    setCodeSnippetsExpanded((prev) => {
                      const newExpanded = [...prev];
                      newExpanded[0] = !prev[0];
                      return newExpanded;
                    })
                  }
                />
              </TabItem>
              <TabItem value="eth" label="Build with ETH">
                <CodeSnippet
                  title="Build with ETH"
                  description="Sed posuere consectetur est at lobortis. Aenean lacinia bibendum nulla sed consectetur. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit."
                  link="/docs/current/developer-docs/multi-chain/bitcoin/using-btc/submit-transactions#sending-transactions"
                  snippet={{
                    language: "motoko",
                    code: `type ManagementCanisterActor = actor {
  bitcoin_send_transaction : SendTransactionRequest -> async ();
};
let management_canister_actor : ManagementCanisterActor = actor("aaaaa-aa");
public func send_transaction(network : Network, transaction : [Nat8]) : async () {
  let transaction_fee =
      SEND_TRANSACTION_BASE_COST_CYCLES + transaction.size() * SEND_TRANSACTION_COST_CYCLES_PER_BYTE;
  ExperimentalCycles.add(transaction_fee);
  await management_canister_actor.bitcoin_send_transaction({
      network;
      transaction;
  })
};`,
                  }}
                  isExpanded={codeSnippetsExpanded[1]}
                  toggleExpand={() =>
                    setCodeSnippetsExpanded((prev) => {
                      const newExpanded = [...prev];
                      newExpanded[1] = !prev[1];
                      return newExpanded;
                    })
                  }
                />
              </TabItem>
              <TabItem value="usdc" label="Build with USDC">
                <CodeSnippet
                  title="Build with USDC"
                  description="Sed posuere consectetur est at lobortis. Aenean lacinia bibendum nulla sed consectetur. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit."
                  link="/docs/current/developer-docs/multi-chain/bitcoin/using-btc/submit-transactions#sending-transactions"
                  snippet={{
                    language: "motoko",
                    code: `type ManagementCanisterActor = actor {
  bitcoin_send_transaction : SendTransactionRequest -> async ();
};
let management_canister_actor : ManagementCanisterActor = actor("aaaaa-aa");
public func send_transaction(network : Network, transaction : [Nat8]) : async () {
  let transaction_fee =
      SEND_TRANSACTION_BASE_COST_CYCLES + transaction.size() * SEND_TRANSACTION_COST_CYCLES_PER_BYTE;
  ExperimentalCycles.add(transaction_fee);
  await management_canister_actor.bitcoin_send_transaction({
      network;
      transaction;
  })
};`,
                  }}
                  isExpanded={codeSnippetsExpanded[2]}
                  toggleExpand={() =>
                    setCodeSnippetsExpanded((prev) => {
                      const newExpanded = [...prev];
                      newExpanded[2] = !prev[2];
                      return newExpanded;
                    })
                  }
                />
              </TabItem>
            </Tabs>{" "}
          </AnimateSpawn>
        </section>
        <section className=" bg-white">
          <div className="container-10 py-20 md:py-40 md:flex">
            <div className="flex-[5]">
              <StickySectionNav
                items={content.map((c) => c.title)}
                className="hidden md:block pr-10"
                highlightedIndex={highlight.highlightedIndex}
                onItemClick={onItemClick}
                title={
                  <h2 className="tw-heading-4 md:tw-heading-60 mb-4 text-gradient-purple">
                    How
                    <LogoNewLine
                      className="w-3/4 my-2 align-middle"
                      color="text-gradient-purple"
                    />{" "}
                    works
                  </h2>
                }
              ></StickySectionNav>
            </div>
            <div className="flex-[7]">
              <div
                className="space-y-10 md:space-y-20"
                ref={(el) => (highlight.elRef.current = el)}
              >
                <ContentCard
                  className="content-card-with-id"
                  id="Network-Integration"
                >
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Network Integration: Direct read/write capabilities.
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    ICP smart contracts have secure read/write capabilities for
                    the Bitcoin and Ethereum network. They can read and write
                    transactions to those chains. There are two types of
                    integration:{" "}
                    <span className="font-bold">Native integration</span> and{" "}
                    <span className="font-bold">RPC-based integration</span>.
                  </p>
                </ContentCard>
                <ContentCard
                  className="content-card-with-id"
                  id="bitcoin-support"
                >
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Native Integration: Supports Bitcoin
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Among the network integrations, the Bitcoin / ICP network
                    have a more robust integration: Native integration. Native
                    Bitcoin integration means ICP is directly connected to the
                    Bitcoin network at the protocol level.
                    <div>
                      <Link
                        href="/docs/current/developer-docs/identity/verifiable-credentials/how-it-works"
                        className="mt-4 md:mt-6 link-primary link-with-icon !font-bold no-underline hover:!text-black"
                      >
                        <LinkArrowRight /> Learn More
                      </Link>
                    </div>
                  </p>
                </ContentCard>
                <ContentCard
                  className="content-card-with-id"
                  id="rpc-integration"
                >
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    RPC Integration: Ethereum, Solana
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    ICP’s integration with Ethereum is facilitated through the
                    EVM RPC smart contract canister on ICP. This canister
                    communicates with Ethereum and other EVM blockchains using
                    an on-chain API. It simplifies the developer experience by
                    introducing methods that allow communication with Ethereum
                    and other EVM-compatible networks like Arbitrum, Optimism,
                    and Base.
                    <div>
                      <Link
                        href="/docs/current/developer-docs/identity/verifiable-credentials/how-it-works"
                        className="mt-4 md:mt-6 link-primary link-with-icon !font-bold no-underline hover:!text-black"
                      >
                        <LinkArrowRight /> Learn More
                      </Link>
                    </div>
                  </p>
                </ContentCard>
                <ContentCard
                  className="content-card-with-id"
                  id="threshold-signing"
                >
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Threshold Signing Services: Secure signing mechanisms
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Threshold signing is a feature of the ICP that allows
                    canisters to have a pair of public and private keys. The
                    private key is divided into small shares and distributed
                    among nodes of a signing subnet, enhancing security. This
                    mechanism enables secure signing of transactions and
                    messages.
                    <div>
                      <Link
                        href="/docs/current/developer-docs/identity/verifiable-credentials/how-it-works"
                        className="mt-4 md:mt-6 link-primary link-with-icon !font-bold no-underline hover:!text-black"
                      >
                        <LinkArrowRight /> Learn More
                      </Link>
                    </div>
                  </p>
                </ContentCard>
              </div>
            </div>
          </div>
        </section>
        <News content="chainfusion" />
        <section>
          <AnimateSpawn
            className="container-6"
            variants={transitions.container}
            el={motion.section}
          >
            <h3 className="tw-heading-4 md:tw-heading-60 text-gradient-purple text-center">
              Start building with{" "}
              <LogoSm className="w-full" color="text-gradient-purple" />{" "}
            </h3>
            <motion.div
              className="flex flex-col md:flex-row justify-center items-center  gap-6 mt-4 md:mt-16"
              variants={transitions.container}
            >
              <Link
                href="/docs/developers-guide/chain-fusion"
                className="button-primary"
              >
                Build now{" "}
              </Link>
              <Link href="/ecosystem" className="link-primary link-with-icon">
                <LinkArrowRight /> See more ICP Use cases
              </Link>
            </motion.div>
          </AnimateSpawn>
        </section>
        <section className="my-24 md:my-40" id="subscribe">
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
            className="mb-20 relative "
          >
            <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8 md:pr-10">
              Sign up for email updates{" "}
              <span className="text-white-60">
                to keep up to date with the Internet Computer
              </span>
            </h2>
          </Newsletter>
        </section>
      </main>
    </Layout>
  );
}

export default ChainFusion;
