import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import Card from "@site/src/components/SamplesPage/Card";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import IntraPageNav from "../components/Common/IntraPageNav";
import { sampleItems } from "../components/Common/sampleItems";
import ShareMeta from "../components/Common/ShareMeta";
import { unreachable } from "../utils/unreachable";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import { useScrollSpyMenu } from "../utils/use-scroll-spy-menu";

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

const Status: React.FC<{
  children: React.ReactNode;
  type: "done" | "pending";
}> = ({ children, type }) => {
  switch (type) {
    case "done":
      return (
        <div className="inline-flex gap-2 items-center rounded-full py-2 px-4 text-white tw-title-navigation bg-infinite">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7.99943L6.84682 12L13 5.59977L11.4617 4L6.84682 8.80045L4.53829 6.39966L3 7.99943Z"
              fill="currentColor"
            />
          </svg>

          {children}
        </div>
      );
    case "pending":
      return (
        <div className="inline-flex gap-2 items-center rounded-full py-2 px-4 text-white tw-title-navigation bg-black/60">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.5" cy="8" r="1.5" fill="currentColor" />
            <circle cx="8" cy="8" r="1.5" fill="currentColor" />
            <circle cx="13.5" cy="8" r="1.5" fill="currentColor" />
          </svg>

          {children}
        </div>
      );

    default:
      unreachable(type);
  }
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
          <li key={card}>
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

function MultichainPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
  type ContentCardType = {
    title: string;
    id: string;
   };
   const [content, setContent] = React.useState<ContentCardType[]>([]);

  const highlight = useScrollSpyMenu(".content-card-with-id");

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
      title="Trustless multi-chain on ICP"
      description="Unique in blockchain, canister smart contracts on the Internet Computer can talk to other chains.
      This is because of the innovative Chain Key cryptography that allows for secure, decentralized, communication.          
      Now users and developers can write contracts that trustlessly custody and process assets on other chains, and call into their smart contracts."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-multichain.jpg"></ShareMeta>

      <main
        className="text-black relative "
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
          contain: "paint",
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className="overflow-hidden bg-infinite text-white pt-20 relative"
          ref={heroRef}
        >
          <div className="container-10 pt-20 pb-16 md:pb-20 md:pt-36 relative">
            <div className="blob blob-purple blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-75"></div>
            <div className="md:w-7/10 relative">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 animate-fade-up">
                Trustless multi-chain on ICP
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0 animate-fade-up animation-delay-200">
              Unique in blockchain, canister smart contracts on the Internet Computer can talk to other chains.
              This is because of the innovative chain-key cryptography that allows for secure, decentralized, communication.          
              Now users and developers can write contracts that trustlessly custody and process assets on other chains, and call into their smart contracts.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-page"></div>
            <div className="container-10 relative animate-fade-up animation-delay-300">
              <img src="/img/multichain/hero.webp" alt="" className="w-full" />
            </div>
          </div>
        </section>

        <AnimateSpawn
          className="container-10 py-20 md:py-30"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.p
            className="tw-heading-5 md:tw-heading-3 text-gradient mb-0 md:w-8/10"
            variants={transitions.item}
          >
            The main benefit of multi-chain functionality on the Internet Computer is that 
            it allows for the creation of smart contracts that can directly interact with 
            other blockchains. This is achieved without the need for trusted centralized 
            bridges, which can be vulnerable to hacking and other security risks.
          </motion.p>
        </AnimateSpawn>
        <section className="bg-infinite relative overflow-hidden">
          <div className="container-12 relative">
            <div className="relative -left-16 sm:left-auto md:absolute md:left-auto md:-right-40 w-full max-w-none md:min-w-0 md:top-60 md:max-w-[calc(65vw-100px)] min-w-[600px] md:w-[800px]">
              <img src="/img/what-is-the-ic/hero.svg" alt="" />
            </div>
          </div>
          <div className="container-10 pb-20 pt-10 md:py-40">
            <div className="md:w-6/10 text-white relative">
              <h2 className="text-gradient-purple tw-heading-3 md:tw-heading-60">
                This is the door that the Internet Computer opens
              </h2>
              <p className="tw-paragraph md:tw-lead-sm mb-6">
                You can create almost any system or service 100% on-chain from
                advanced “canister” smart contracts. These can trustlessly call
                into smart contracts on other blockchains, and process their
                tokens - including bitcoin, ether, ERC20 tokens and BRC20 tokens
                - either directly on the other chain, or in the form of
                high-performance trustless local twins. 
              </p>
              <h3 className="mt-10 md:mt-20 mb-6 tw-heading-3 text-gradient-purple">
                But how does this magic work?
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6">
                Traditionally, blockchains have been integrated using
                centralized, or semi-centralized, blockchain “bridges,” which
                make wrapped copies of native tokens for usage on other
                blockchains. Problems include that: 1) those operating bridges
                must effectively be trusted with the wrapped assets, 2) they are
                not secure, which has resulted in billions of dollars worth of
                assets getting hacked, 3) they are slow, cumbersome, and
                inconvenient for users, and 4) modern regulations may make them
                illegal, risking the “regulatory seizure” of wrapped assets.
              </p>
              <p className="text-paragraph font-bold md:tw-heading-6 mb-6">
                In the trustless Internet Computer multi-chain model, no trusted
                bridge, blockchain hub, or other intermediary service is
                involved, just two blockchains.
              </p>
              <p className="tw-paragraph md:tw-lead-sm mb-6">
                This is because the Internet Computer network is formed by
                “Internet Computer Protocol” (ICP), which is powered by “chain
                key” cryptography. This enables ICP to use network consensus to
                sign transactions that execute on other blockchains.
              </p>
              <p className="text-paragraph font-bold md:tw-heading-6 mb-6">
                Building on this capability, the canister smart contracts of
                decentralized applications and services are enabled to
                trustlessly custody and process assets on other chains, and call
                into their smart contracts. They can also create trustless
                replacements for problematic bridges. This is revolutionary.
              </p>
              <p className="tw-paragraph md:tw-lead-sm mb-0">
                Now, the Internet Computer is additionally progressively
                integrating with other blockchains at the network level. For
                example, Internet Computer nodes now talk directly to Bitcoin
                nodes, which has enabled ICP to host a trustless “bitcoin twin”
                called chain-key bitcoin (ckBTC) in the role of a sidechain.
              </p>
            </div>
          </div>
        </section>
        <section className="container-12 pt-20 md:pt-40">
          <div className="md:flex">
            <div className="flex-[5]">
              <StickySectionNav
                items={content.map((c) => c.title)}
                className="hidden md:block"
                highlightedIndex={highlight.highlightedIndex}
                onItemClick={onItemClick}
                title={
                  <h2 className="tw-heading-4 md:tw-heading-3 mb-10 text-gradient">
                    Learn more and join the trustless multi-chain movement
                  </h2>
                }
              ></StickySectionNav>
            </div>
            <div className="flex-[7]">
              <div
                className="lg:pr-[calc(1/7*100%)] space-y-10 md:space-y-20"
                ref={(el) => (highlight.elRef.current = el)}
              >

                <ContentCard id="unlimited-multichain">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Unlimited multi-chain via edge routing
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Thus far, the Internet Computer network has only directly
                    integrated with the Bitcoin and Ethereum networks, enabling
                    it to produce twins of assets hosted by those networks.
                    However, more broad multi-chain functionality is easily
                    produced.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    The Internet Computer enables hosted smart contracts to
                    create accounts on any other blockchain, and sign
                    transactions that can run on their networks. Transaction
                    routing can be performed by the UX of Web3 services.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    The UX of a Web3 service can provide very fast, and totally
                    decentralized, edge routing for transactions. For example,
                    when a canister smart contract has created a transaction for
                    execution on another blockchain, the UX (e.g JavaScript
                    running in the web browser) can retrieve the signed
                    transaction by making a call to the smart contract, and then
                    push it to the online API of a node in the destination
                    network, then poll for the result.
                  </p>
                </ContentCard>


                <ContentCard id="eth-cronjobs">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Use ICP to create crypto cron jobs on Ethereum
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    A key challenge involved when hosting DeFi and other
                    services using Ethereum smart contracts, is the secure
                    initiation of regular jobs. Oftentimes, smart contract jobs
                    are initiated using external scripts running on insecure
                    clouds such as Amazon Web Services, where the private key
                    they maintain to make the calls is vulnerable, in the same
                    way the private keys used by hot wallets are.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    The Internet Computer provides a solution. Canister smart
                    contracts have an API that allows them to schedule their
                    secure automatic execution for as long as needed into the
                    future. Using EVM RPC, canisters can be used to initiate
                    time-based calls into Ethereum smart contracts too – without
                    a private key being made vulnerable.
                  </p>

                  <p className="flex gap-2 flex-wrap">
                    <Status type="pending">pending</Status>
                  </p>
                </ContentCard>

                <ContentCard id="bitcoin-ordinals">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Schnorr-enabled Bitcoin Ordinal inscription, BRC20 tokens,
                    and multi-chain
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Canister smart contracts on the Internet Computer can use a
                    Bitcoin API to process bitcoin, and also Ordinals, which are
                    used to create and transfer NFTs on the Bitcoin blockchain.
                    Fully decentralized Web3 services on the Internet Computer
                    have taken advantage of the functionality to create
                    marketplaces for Ordinals e.g.{" "}
                    <Link href="https://bioniq.io/" className="link-subtle">
                      Bioniq
                    </Link>
                    .
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    The processing of bitcoin and Ordinals involves the ICP
                    protocol processing ECDSA cryptography behind the scenes.
                    However, inscribing Ordinals and creating and processing
                    BRC20 assets (e.g. meme coins that piggyback on Bitcoin)
                    involves Schnorr cryptography, which ICP now also supports.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Because ICP supports Schnorr, web-based smart contract
                    wallets such as OISY can self-host BRC20, Ethereum, and
                    native ICP assets.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    A further advantage is that canister smart contracts can
                    sign transactions for execution on chains such as Cardano
                    and Solana.
                  </p>

                  <p className="flex gap-2 flex-wrap">
                    <Status type="pending">Schnorr pending</Status>
                  </p>
                </ContentCard>

                <ContentCard id="cketh">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Ethereum asset twins: ckETH and ckERC20
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Internet Computer nodes talk to Ethereum nodes. This enables
                    ICP to host an “ether twin” called ckETH and “twins'' of
                    ERC20 tokens, such as ckUSDC, ckUSDT, ckUNISWAP, ck1INCH,
                    ckAAVE. These can be directly processed by smart contracts
                    hosted on the Internet Computer.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    The “chain key” versions of Ethereum assets live on ledgers
                    created by Internet Computer smart contracts, where they can
                    be transferred with 1 second finality and at near zero cost.
                    Moreover, they can be directly processed by canisters that
                    provide web-based wallets, and other web3 services hosted on
                    the Internet Computer, such as SocialFi and GameFi.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    To create chain key Ethereum asset twins, a user transfers
                    them to an address provided by their wallet. Then they can
                    be sent to any other chain key address, almost instantly and
                    at miniscule cost, or directly to a standard Ethereum
                    address (causing the twin to return to its native form),
                    after the standard finalization delay and transaction fee.
                  </p>
                  <p className="flex gap-2 flex-wrap">
                    <Status type="done">ckETH done</Status>
                    <Status type="pending">ckERC20 is pending</Status>
                  </p>
                </ContentCard>

                <ContentCard id="ckbtc">
                  <img
                    src="/img/multichain/card-ckbtc.webp"
                    alt="The bitcoin twin: ckBTC"
                  />
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    The bitcoin twin: ckBTC
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Internet Computer nodes talk to Bitcoin nodes to download
                    the Bitcoin network’s blocks and maintain its Unspent
                    Transaction Output (UTXO) set. Using this information, ICP
                    acts as a sidechain and hosts a trustless “bitcoin twin”
                    called ckBTC (“chain key bitcoin”) that can be directly
                    processed by canister smart contract logic and transferred
                    with 1 second finality at near zero cost.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    <strong>
                      Canister smart contracts can be used to provide web-based
                      wallets, and other Web3 services, that directly
                      incorporate bitcoin – for example,{" "}
                      <Link href="https://oc.app/" className="link-subtle">
                        OpenChat
                      </Link>{" "}
                      allows chain key bitcoin to be transferred via instant
                      chat messages. Canisters can also be used to build a new
                      generation of “Bitcoin DeFi” services.
                    </strong>
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    To create ckBTC, a user transfers their bitcoin to a ckBTC
                    address provided by their wallet (e.g. see functionality
                    provided at the NNS). Their ckBTC twin can then be sent to
                    any other ckBTC address, almost instantly for a tiny fee, or
                    directly to a standard Bitcoin address, causing the bitcoin
                    twin to return to its native form.
                  </p>
                </ContentCard>

                <ContentCard id="evm-rpc">
                  <img
                    src="/img/multichain/card-cketh.webp"
                    alt="Call into Ethereum smart contracts from ICP using EVM RPC"
                  />
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Call into Ethereum smart contracts from ICP using EVM RPC
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    The Internet Computer makes it possible to build almost any
                    online service fully on-chain, in a full stack
                    decentralization model, which can be augmented by placing
                    the service under the control of an SNS DAO to automate its
                    maintenance. This is because canister smart contracts can
                    hold up to 400GiB of memory each, and run in parallel with
                    great efficiency. Moreover, they can directly serve
                    interactive web-based user experiences to users by
                    processing HTTP requests, thanks to ICP’s reverse-gas model
                    (canister smart contracts pay for their own execution using
                    “cycles” that they have been charged with). Now they can
                    also be trustlessly combined with DeFi and other
                    functionality Ethereum hosts in a World Computer paradigm.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Ethereum Virtual Machine Remote Procedural Calls (EVM RPC)
                    make it possible for Internet Computer canister
                    smart contracts to interact with smart contracts on any
                    blockchain which supports the Ethereum JSON-RPC protocol. 
                    Advanced fully decentralized Web3 services can be created that
                    maintain the UX and heavy data storage and processing on the
                    Internet Computer, while relying on Ethereum DeFi where
                    financial rails are needed.
                  </p>

                  <p className="flex gap-2 flex-wrap">
                    <Status type="pending">EVM RPC in beta testing</Status>
                  </p>
                </ContentCard>

                <ContentCard id="icpERC20">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Publish ICP tokens on Ethereum as icpERC20 tokens
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Ethereum provides the world’s preeminent DeFi rails.
                    Decentralized exchanges such as Uniswap provide immense
                    liquidity for trading ERC20 tokens, and popular custody
                    services such as Fireblocks, which are popular among
                    institutions investing in crypto, custody any ERC20 token as
                    standard.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    The ICP protocol makes it possible to publish any native ICP
                    token hosted on a standard ledger to Ethereum, in the form
                    of an icpERC20. The twin is a standard ERC20 token and can
                    be processed by any service that processes ERC20 tokens.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    A service created by a Internet Computer-hosted smart
                    contract provides functionality (often relayed by wallets)
                    to create an icpERC20 twin of an ICP token . The service
                    also allows icpERC20 twins to be returned to the Internet
                    Computer, where they retain their native form.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Once an icpERC20 token has been created, it can also be
                    processed by Ethereum Layer-2 networks, and moved across
                    other chains using traditional bridges.
                  </p>
                  <p className="flex gap-2 flex-wrap">
                    <Status type="pending">icpERC20 is pending</Status>
                  </p>
                </ContentCard>

                <ContentCard id="oisy-wallet">
                  <img
                    src="/img/multichain/card-oisy.webp"
                    alt="Use ICP to create a web-based multi-chain “brain wallet”"
                  />
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Use ICP to create a web-based multi-chain “brain wallet”
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    A key problem with hosting traditional wallets such as
                    MetaMask on a smartphone or laptop is the risk of theft by
                    extortion, especially in the developing world. For example,
                    a robber might put a victim up to a wall, and force them to
                    open their phone under threat of violence. If the victim
                    maintains crypto in a traditional wallet, it will be seen
                    and they will lose their crypto.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Chain key makes it possible to create purely web-based
                    wallets, backed by a canister smart contract that maintains
                    the crypto. Authentication to such wallets can involve
                    Internet Identity, Google SSO, or usernames and passwords as
                    required. These can be opened using a web browser tab in
                    Incognito mode, which leaves no trace of the wallet when
                    closed.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    The{" "}
                    <Link href="https://oisy.com" className="link-subtle">
                      OISY wallet
                    </Link>{" "}
                    is a great example. It can custody any ICP asset (including
                    chain key twins), native bitcoin, native bitcoin BRC20
                    tokens, and native Ethereum assets, as required.
                    Self-custodied Ethereum assets can be used in Ethereum DeFi
                    using the WalletConnect functionality it supports. Users
                    gain convenience and a better experience, and superior
                    security.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    <strong>OISY Wallet:</strong>
                  </p>

                  <p className="flex gap-2 flex-wrap">
                    <Status type="done">Ethereum assets done</Status>
                    <Status type="pending">ICP assets pending</Status>
                    <Status type="pending">Bitcoin pending</Status>
                    <Status type="pending">BRC20 pending</Status>
                  </p>
                </ContentCard>


               
                <ContentCard id="additional-resources">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Additional resources
                  </h3>
                  <p className="flex flex-col gap-6 items-start mb-0">
                  <Link
                      className="link-primary"
                      href="/docs/current/developer-docs/integrations/multi-chain/user-faq"
                    >
                      <LinkArrowRight /> Multi-chain FAQs
                    </Link>
                    <Link
                      className="link-primary"
                      href="/ecosystem?tag=Ethereum"
                    >
                      <LinkArrowRight /> Open source projects with Ethereum
                      integration
                    </Link>
                    <Link
                      className="link-primary"
                      href="/bitcoin-integration/faq"
                    >
                      <LinkArrowRight /> FAQ about BTC integration & ckBTC
                    </Link>
                    <Link
                      className="link-primary"
                      href="/samples?selectedDomains=Asynchronous+DeFi"
                    >
                      <LinkArrowRight /> Sample codes of DeFi projects
                    </Link>
                    <Link
                      className="link-primary"
                      href="https://medium.com/dfinity/hackathon-winners-put-top-icp-features-into-practice-90c9abeef342"
                    >
                      <LinkArrowRight /> Multi-chain Hackathon Projects
                    </Link>
                  </p>
                </ContentCard>
                
                <ContentCard id="sample-code">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Multi-chain sample code
                  </h3>
                  <p className="flex flex-col gap-6 items-start mb-0">
                    <Link className="link-primary" href="/samples">
                      <LinkArrowRight /> More Sample codes
                    </Link>
                  </p>
                  <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                    {[
                      "IC ETH Starter",
                      "Add ERC-20 to IC ETH Starter",
                      "OISY",
                      "PoS app for ckBTC",
                      "ICRC2 Swap Demo",
                      "Multi-subnet Bitcoin Custody",
                      "ETH Payment Tutorials",
                      "B3 Wallet",
                      "ckBTC",
                      "ckETH",
                    ]
                      .map((title) =>
                        sampleItems.find(
                          (item) =>
                            item.title.toLowerCase() === title.toLowerCase()!
                        )
                      )
                      .map((sample) => (
                        <Card
                          key={sample.index}
                          image={sample.image}
                          title={sample.title}
                          domain={sample.domains[0]}
                          body={sample.body}
                          links={sample.links}
                        />
                      ))}
                  </div>
                </ContentCard>
              </div>
            </div>
          </div>
        </section>
        <section className="container-10 relative mb-20 md:mb-40 mt-30 md:mt-60">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-md blob-x-5 blob-y-10 z-[-1] md:blob-lg opacity-80"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-0 w-full mx-auto md:tw-heading-60 md:w-7/10 lg:w-8/12"
              variants={transitions.item}
            >
              Learn more about multi&#8209;chain on ICP
            </motion.h2>
          </AnimateSpawn>
          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="Bitcoin <> ICP"
              description=""
              href="/bitcoin-integration"
            />

            <CardWithDescription
              title="Ethereum <> ICP"
              description=""
              href="/ethereum-integration"
            />
            <CardWithDescription
              title="Use ETH and BTC in the Ecosystem"
              description=""
              href="/ecosystem"
            />
            <CardWithDescription
              title="Multi-chain DeFi"
              description=""
              href="/defi"
            />
          </AnimateSpawn>
        </section>
      </main>
      <IntraPageNav
        hasHome={false}
        links={content.map((c) => ({
          text: c.title,
          to: `#${c.id}`,
        }))}
        className="md:hidden"
      ></IntraPageNav>
    </Layout>
  );
}

export default MultichainPage;
