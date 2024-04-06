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
import CodeBlockString from "../theme/CodeBlock/Content/String";
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
        <span className="inline-flex gap-2 items-center rounded-full py-2 px-4 text-white tw-title-navigation bg-infinite">
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
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex gap-2 items-center rounded-full py-2 px-4 text-white tw-title-navigation bg-black/60">
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
        </span>
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
      title="Chain Fusion Technology"
      description="ICP enables direct interoperability with all major blockchains, including Bitcoin, Ethereum, other EVMs (and soon Solana), 
      without relying on any trusted intermediary. Unique compared to other blockchains, ICP smart contracts can read from 
      and write to different chains, enabling developers to write smart contracts spanning different chains. This is chain fusion."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      {/* <ShareMeta image="/img/shareImages/share-multichain.jpg"></ShareMeta> */}
      <ShareMeta image="/img/multichain/hero3.webp"></ShareMeta>

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
                Chain Fusion Technology
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0 animate-fade-up animation-delay-200">
                ICP enables direct interoperability with all major blockchains,
                including Bitcoin, Ethereum, other EVMs (and soon Solana),
                without relying on any trusted intermediary. Unique compared to
                other blockchains, ICP smart contracts can read from and write
                to different chains, enabling developers to write smart
                contracts spanning different chains. This is chain fusion.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-page"></div>
            <div className="container-10 relative animate-fade-up animation-delay-300">
              {/* The surrounding div gives the image rounded corners */}
              <div
                className="relative"
                style={{ overflow: "hidden", borderRadius: "10px" }}
              >
                <img
                  src="/img/multichain/hero3.webp"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <AnimateSpawn
          className="container-10 pt-20 md:pt-30"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.p
            className="tw-heading-5 md:tw-heading-5 text-gradient mb-0 md:w-8/10"
            variants={transitions.item}
          >
            The common web3 pattern is building dapps from different
            blockchains, for instance Ethereum or Solana to store assets, IPFS
            or Arweave for serving frontends, and Arbitrum or Optimism for the
            bulk of smart contract computation. However, building dapps like
            this is very cumbersome. Developers must adapt to various
            programming models, transaction costs, and settlement times. Chain
            fusion tremendously simplifies multi-chain dapp development, making
            it as straightforward and native as building on a single
            environment.
          </motion.p>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 py-20 md:py-40 flex flex-col md:flex-row gap-12 md:gap-1/10"
          variants={transitions.container}
          el={motion.section}
        >
          <motion.div
            className="md:w-4/10 flex-shrink-0"
            variants={transitions.item}
          >
            <h2 className="tw-heading-4 md:tw-heading-60 text-gradient mb-3">
              Example Code
            </h2>
            <p className="tw-paragraph md:tw-lead-sm mb-3">
              To showcase how powerful chain fusion is, here is a simple example that shows 
              three chains interacting in one smart contract: a{" "}
                single{" "}
                <b>
                  <i>ICP</i>
                </b>{" "}
                smart contract that can custody{" "}
                <b>
                  <i>Bitcoin</i>
                </b>{" "}
                and programmatically trigger sending it based on events observed
                on a{" "}
                <b>
                  <i>Ethereum</i>
                </b>{" "}
                DeFi smart contract.
            </p>

            

            <p className="tw-paragraph md:tw-lead-sm mb-3">
            This code snippet is written in the&nbsp;
              <Link 
                rel="stylesheet" 
                href="/docs/current/tutorials/developer-journey/level-0/intro-languages/#motoko"
              >
              Motoko programming language
              </Link> but is also possible for Rust, TypeScript, Python, and other languages.
            </p>
            <p className="mb-0 mt-8">
              <Link
                className="link-primary link-with-icon"
                href="https://play.motoko.org/?tag=3352278366"
              >
                <LinkArrowRight></LinkArrowRight>
                Deploy the contract in online editor
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="md:max-w-5/10 space-y-5"
            variants={transitions.item}
          >
            <CodeBlockString language="motoko">
              {`
  import evm "ic:a6d44-nyaaa-aaaap-abp7q-cai";
  import ic "ic:aaaaa-aa";
  import Cycles "mo:base/ExperimentalCycles";
  import Timer "mo:base/Timer";
  
  //Actor is the computational unit of ICP smart contract
  actor {
    let EVM_FEE = 1000;
    let BITCOIN_FEE = 1000;
  
     //Function checks the logs of an ETH smart contract for an event
     //If a particular event is found, it sends bitcoin to an address
     func check_evm_log() : async () {
      Cycles.add<system>(EVM_FEE);
      let log = await evm.eth_getLogs(
        #EthMainnet(null),
        null,
        {
          // dummy address. Replace with the right one
          addresses = ["address"];
          fromBlock = ? #Finalized;
          toBlock = ? #Finalized;
          //dummy topics to look at. Replace with topics of interest
          topics = ?[["topic1", "topic2"]]; 
        },
      );
      switch log {
        case (#Consistent(#Ok(_))) {
          // if we get a consistent log, send bitcoin
          await send_bitcoin();
        };
        case _ {};
      };
    };
  
    // Function that sends bitcoin. This is used by check_evm_log()
    func send_bitcoin() : async () {
      Cycles.add<system>(BITCOIN_FEE);
      await ic.bitcoin_send_transaction({
        transaction = "\be\ef";
        network = #testnet;
      });
    };
  
    // Check for evm logs every 2 seconds
    let _ = Timer.setTimer<system>(#seconds 2, check_evm_log);
  };
  
            `}
            </CodeBlockString>
          </motion.div>
        </AnimateSpawn>

        <section className="bg-infinite relative overflow-hidden">
          <div className="container-12 relative">
            <div className="relative -left-16 sm:left-auto md:absolute md:left-auto md:-right-40 w-full max-w-none md:min-w-0 md:top-60 md:max-w-[calc(65vw-100px)] min-w-[600px] md:w-[800px]">
              <img src="/img/what-is-the-ic/hero.svg" alt="" />
            </div>
          </div>
          <div className="container-10 pb-20 pt-10 md:py-40">
            <div className="md:w-6/10 text-white relative">
              <h3 className="text-gradient-purple tw-heading-4 md:tw-heading-40">
                How it is solved today
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6">
                Developers today rely on trusted intermediaries acting as a
                bridge that make wrapped copies of native tokens for usage on
                other blockchains. These bridges are slow, inconvenient, but
                most importantly: they are the achilles heel of web3, this is
                where majority of hacks happen, tens of billions of dollars of
                assets have been lost.
                <br />
                <br />
                There are also rollups, which rely on the security of the base
                L1 chain. However, it is still not possible to easily move
                assets arbitrarily between different rollup chains as each step
                transfer relies on the main chain thereby, resulting in
                expensive L1 gas fees and settlement delays lasting days.
                Rollups also do not solve smart contract interoperability across
                chains, such as between Bitcoin, Ethereum and Solana, etc.
              </p>

              <h3 className="text-gradient-purple tw-heading-4 md:tw-heading-40">
                The two pillars of chain fusion
              </h3>

              <p className="tw-paragraph md:tw-lead-sm mb-6">
                True multi-chain capability requires enabling smart contracts to
                read and write across chains. For instance, you can write a{" "}
                single{" "}
                <b>
                  <i>ICP</i>
                </b>{" "}
                smart contract that can custody{" "}
                <b>
                  <i>Bitcoin</i>
                </b>{" "}
                and programmatically trigger sending it based on events observed
                on a{" "}
                <b>
                  <i>Ethereum</i>
                </b>{" "}
                DeFi smart contract.
              </p>

              <p className="tw-paragraph md:tw-lead-sm mb-6">
                <b>Chain-key cryptography</b> is the scientific breakthrough
                that allows ICP smart contracts to create and sign transactions
                that are executed on other blockchains &ndash;{" "}
                <i>writing to other blockchains directly.</i>
              </p>

              <p className="tw-paragraph md:tw-lead-sm mb-6">
                <b>Direct network integration</b> enables ICP smart contracts to
                query data and smart contracts from other blockchains, validated
                by ICP consensus &ndash; <i>reading from other blockchains</i>.
              </p>
            </div>
          </div>
        </section>

        <section className="container-12 pt-20 md:pt-40">
          <div className="md:flex">
            <div className="flex-[5]">
              <StickySectionNav
                items={content.map((c) => c.title)}
                className="hidden md:block pr-10"
                highlightedIndex={highlight.highlightedIndex}
                onItemClick={onItemClick}
                title={
                  <>
                    <h2 className="tw-heading-4 md:tw-heading-3 mb-4 text-gradient">
                      Use cases of chain fusion
                    </h2>
                    <p className="tw-paragraph-sm md:tw-paragraph mb-2 mr-4">
                      Explore Chain Fusion technology use cases, including
                      executing ICP smart contracts on other chains and asset
                      storage like Bitcoin and Ethereum.
                    </p>

                    <p className="tw-paragraph-sm md:tw-paragraph mb-10 mr-4">
                      These applications range from automating tasks on Ethereum
                      to creating ICP smart contracts that manage
                      Bitcoin/Ethereum. Developers can also use ckBTC and ckETH
                      to efficiently build DeFi services, bypassing high costs
                      and delays.
                    </p>
                  </>
                }
              ></StickySectionNav>
            </div>
            <div className="flex-[7]">
              <div
                className="lg:pr-[calc(1/7*100%)] space-y-10 md:space-y-20"
                ref={(el) => (highlight.elRef.current = el)}
              >
                {/* Use cases of software orchestration */}

                <ContentCard id="oisy-wallet">
                  <img
                    src="/img/multichain/card-oisy.webp"
                    alt="Create a web-based multi-chain wallet"
                  />
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Web-based multi-chain wallet
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
                    <Link
                      href="https://oisy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-subtle"
                    >
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
                </ContentCard>

                <ContentCard id="eth-cronjobs">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Cron jobs on Ethereum from ICP
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    A key challenge involved when hosting DeFi and other
                    services using Ethereum smart contracts is the secure
                    initiation of regular jobs. Oftentimes, smart contract jobs
                    are initiated using external scripts running on insecure
                    clouds such as Amazon Web Services, where the private key
                    they maintain to make the calls is vulnerable in the same
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

                <ContentCard id="evm-rpc">
                  <img
                    src="/img/multichain/card-cketh.webp"
                    alt="Calling smart contracts on Ethereum from ICP using EVM RPC"
                  />
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Calling smart contracts on Ethereum from ICP using EVM RPC
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
                    make it possible for Internet Computer canister smart
                    contracts to interact with smart contracts on any blockchain
                    which supports the Ethereum JSON-RPC protocol. Advanced
                    fully decentralized Web3 services can be created that
                    maintain the UX and heavy data storage and processing on the
                    Internet Computer, while relying on Ethereum DeFi where
                    financial rails are needed.
                  </p>

                  <p className="flex gap-2 flex-wrap">
                    <Status type="pending">EVM RPC in beta testing</Status>
                  </p>
                </ContentCard>

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

                {/* Use cases of storing assets */}
                <ContentCard id="ckbtc">
                  <img
                    src="/img/multichain/card-ckbtc.webp"
                    alt="The bitcoin twin: ckBTC"
                  />
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Bitcoin twin: ckBTC
                  </h3>

                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Developers use ICP to bring smart contract functionality to
                    Bitcoin. This new solution brings a new challenge: Bitcoin
                    costs and wait times. No matter how fast a ICP smart
                    contract is, moving Bitcoin will have the costs and wait
                    times of the Bitcoin network.
                  </p>

                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    To address this, developers also use ckBTC (“chain key
                    bitcoin”). This is a trustless "Bitcoin twin" hosted on ICP
                    that can be used by ICP smart contracts to move Bitcoin
                    cheaply and quickly. This is possible because ICP nodes talk
                    to Bitcoin nodes to download the Bitcoin network’s blocks
                    and maintain its Unspent Transaction Output (UTXO) set.
                    CkBTC can be directly processed by canister smart contract
                    logic and transferred with 1 second finality at near zero
                    cost.
                  </p>

                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    <strong>
                      Canister smart contracts can be used to provide web-based
                      wallets, and other Web3 services, that directly
                      incorporate bitcoin – for example,{" "}
                      <Link
                        href="https://oc.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-subtle"
                      >
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

                <ContentCard id="bitcoin-ordinals">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Ordinals and BRC20
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Creating Bitcoin Ordinals can be expensive and slow. ICP can
                    help here too. ICP canister smart contracts can use the
                    Bitcoin API to process bitcoin, and also Ordinals, which are
                    used to create and transfer NFTs on the Bitcoin blockchain.
                    Fully decentralized Web3 services on the Internet Computer
                    have taken advantage of the functionality to create
                    marketplaces for Ordinals e.g.{" "}
                    <Link
                      href="https://bioniq.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-subtle"
                    >
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
                    Developers use ICP to custody Ethereum. This new solution
                    brings a new developer experience challenge: Ethereum costs
                    and wait times. To address this, the ICP community uses
                    ckEth ("chain key Ethereum"), a trustless "Twins of
                    Ethereum" hosted on ICP such as “ether twin” called ckETH
                    and “twins'' of ERC20 tokens, such as ckUSDC, ckUSDT,
                    ckUNISWAP, ck1INCH, ckAAVE. These can be directly processed
                    by smart contracts hosted on ICP.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    The “chain key” versions of Ethereum assets live on ledgers
                    created by ICP smart contracts, where they can be
                    transferred with 1 second finality and at near zero cost.
                    Moreover, they can be directly processed by canisters that
                    provide web-based wallets, and other web3 services hosted on
                    the ICP, such as SocialFi and GameFi.
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

                <ContentCard id="icpERC20">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    icpERC20 tokens on Ethereum
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Ethereum provides the world’s preeminent DeFi rails.
                    Decentralized exchanges such as Uniswap provide immense
                    liquidity for trading ERC20 tokens. Popular custody services
                    such as Fireblocks, which is popular among investment
                    institutions, custody any ERC20 token as standard.
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
                    to create an icpERC20 twin of an ICP token. The service also
                    allows icpERC20 twins to be returned to the Internet
                    Computer, where they retain their native form.
                  </p>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Once an icpERC20 token has been created, it can be processed
                    by Ethereum Layer-2 networks and moved across other chains
                    using traditional bridges.
                  </p>
                  <p className="flex gap-2 flex-wrap">
                    <Status type="pending">icpERC20 is pending</Status>
                  </p>
                </ContentCard>

                <ContentCard id="bitcoin-ordinals-2">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Ordinals, BRC20 inscriptions from ICP using tSchnorr
                  </h3>
                  <p className="tw-paragraph md:tw-lead-sm mb-0">
                    Canister smart contracts on the Internet Computer can use a
                    Bitcoin API to process bitcoin, and also Ordinals, which are
                    used to create and transfer NFTs on the Bitcoin blockchain.
                    Fully decentralized Web3 services on the Internet Computer
                    have taken advantage of the functionality to create
                    marketplaces for Ordinals e.g.{" "}
                    <Link
                      href="https://bioniq.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-subtle"
                    >
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

                <ContentCard id="additional-resources">
                  <h3 className="tw-heading-4 md:tw-heading-3 mb-0">
                    Additional resources
                  </h3>
                  <p className="flex flex-col gap-6 items-start mb-0">
                    <Link
                      className="link-primary"
                      href="/docs/current/developer-docs/integrations/multi-chain/user-faq"
                      target="_blank"
                      rel="noopener noreferrer"
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
                      target="_blank"
                      rel="noopener noreferrer"
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
                      <LinkArrowRight /> More Sample Code
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
              title="ICP as a Bitcoin L2"
              description=""
              href="/bitcoin-integration"
            />

            <CardWithDescription
              title="ICP as an Ethereum sidechain"
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
