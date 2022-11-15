import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";

const SplitCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  imageSideClassName?: string;
  contentSideClassName?: string;
  image: React.ReactNode;
  imageSide: "left" | "right";
}> = ({
  className,
  children,
  image,
  imageSide,
  imageSideClassName,
  contentSideClassName,
}) => {
  return (
    <AnimateSpawn
      className={clsx(
        "bg-white-50 rounded-xl overflow-hidden flex flex-col md:flex-row items-start",
        imageSide === "right"
          ? "flex-row"
          : "flex-col-reverse md:flex-row-reverse",
        className
      )}
      variants={transitions.container}
    >
      <div
        className={clsx(
          "flex-[4] p-6 md:p-16",
          imageSide === "right" ? "md:pr-0" : "md:pl-0",
          contentSideClassName
        )}
      >
        {children}
      </div>
      <motion.div
        className={clsx("flex-[6] self-center text-[0px]", imageSideClassName)}
        variants={transitions.fadeIn}
      >
        {image}
      </motion.div>
    </AnimateSpawn>
  );
};

const SingleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "bg-white-50" }) => {
  return (
    <AnimateSpawn
      className={clsx("rounded-xl overflow-hidden p-6 md:p-16", className)}
      variants={transitions.container}
    >
      {children}
    </AnimateSpawn>
  );
};

const SmallCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "bg-white-50" }) => {
  return (
    <AnimateSpawn
      className={clsx("rounded-xl overflow-hidden p-6 md:p-8", className)}
      variants={transitions.container}
    >
      {children}
    </AnimateSpawn>
  );
};

function FeaturesPage() {
  resetNavBarStyle();
  return (
    <Layout
      title="Groundbreaking Features"
      description="The Internet Computer is pushing the boundaries of what is
      possible in blockchain technology today with its revolutionary
      features."
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-features.jpeg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-features.jpeg"
          }
        />
      </Head>
      <main className="text-black relative overflow-hidden">
        <AnimateSpawn
          variants={transitions.container}
          el={motion.section}
          className="overflow-hidden"
        >
          <div className="container-10 pt-12 mb-40 md:mb-60 md:pt-30 relative">
            <div className="md:w-7/10 lg:w-6/10">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-6"
                variants={transitions.item}
              >
                Groundbreaking Features
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                The Internet Computer is pushing the boundaries of what is
                possible in blockchain technology today with its revolutionary
                features.
              </motion.p>
            </div>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 text-white relative mb-32 md:mb-20"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            variants={transitions.fadeIn}
            className="
              z-[-1]
              blob
              blob-purple 
              blob-md md:blob-lg
              blob-center
            "
          ></motion.div>
          <div className="md:w-6/10 mx-auto text-center">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-3 md:mb-6"
              variants={transitions.item}
            >
              Web Experience
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              The Internet Computer combines several innovations to provide web
              experiences often indistinguishable from web2 - all directly from
              the blockchain.{" "}
            </motion.p>
          </div>
        </AnimateSpawn>
        <section className="container-12 grid md:grid-cols-2 gap-5">
          <SplitCard
            imageSide="right"
            image={
              <img src="/img/features/serve-web.webp" alt="" className=""></img>
            }
            className="md:col-span-2"
          >
            <motion.h3
              className="tw-heading-4 md:tw-heading-3 mb-4"
              variants={transitions.item}
            >
              Serve web directly from smart contracts
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm mb-0 text-black-60"
              variants={transitions.item}
            >
              The Internet Computer is the only blockchain with canister smart
              contracts that can serve web by processing HTTP requests. This
              allows 100% of online services to run from the blockchain, which
              allows for full decentralization.
            </motion.p>
          </SplitCard>

          <SplitCard
            imageSide="left"
            image={
              <img
                src="/img/features/no-oracles-image.webp"
                alt=""
                className=""
              ></img>
            }
            className="md:col-span-2"
          >
            <motion.h3
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-4 "
            >
              Connect web2 and web3 without oracles
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm text-black-60 mb-6"
              variants={transitions.item}
            >
              Until now, blockchains had to use expensive and slow oracles to
              read from off-chain data sources. ICP smart contracts can directly
              connect to web2 APIs, making oracles obsolete. This opens up
              countless possibilities like sending emails, push notifications,
              fetching crypto prices and many more - directly from the
              blockhain.
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link href="https://internetcomputer.org/https-outcalls" className="tw-heading-6 flex gap-2 items-center">
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn about HTTPS outcalls
              </Link>
            </motion.p>
          </SplitCard>
          <SingleCard className="bg-gradient-100 from-[#0E031F] to-[#281447] text-white relative pb-52">
            <img
              src="/img/features/astronaut-image.webp"
              alt=""
              className="absolute w-[194px] bottom-0 right-20 z-0"
            />
            <img
              src="/img/features/astronaut-bg.svg"
              alt=""
              className="absolute w-[512px] -bottom-1/2 -right-10 z-0"
            />
            <div className="relative">
              <motion.h3
                variants={transitions.item}
                className="tw-heading-4 md:tw-heading-3 mb-4 "
              >
                Internet Identity — unlock the full power of Web3
              </motion.h3>
              <motion.p
                className="tw-paragraph md:tw-lead-sm  mb-6 text-white-80"
                variants={transitions.item}
              >
                The Internet Computer blockchain has replaced the username and
                password model with a more advanced and much more secure method
                of cryptographic authentication that is more convenient, works
                across all of a user's devices, and helps to protect user
                privacy.
              </motion.p>
              <motion.p className="mb-0" variants={transitions.item}>
                <Link
                  href="https://internetcomputer.org/how-it-works/web-authentication-identity/"
                  className="tw-heading-6 flex gap-2 items-center text-white hover:text-white-60 hover:no-underline"
                >
                  <RightPointer className="w-6 h-6"></RightPointer>
                  Learn more
                </Link>
              </motion.p>
            </div>
          </SingleCard>
          <SingleCard>
            <motion.h3
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-4 "
            >
              Breakthrough speed
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm text-black-60 mb-12"
              variants={transitions.item}
            >
              Low latency and high throughput. The two most important metrics
              for measuring speed. The Internet Computer provides outstanding
              performance in both.
            </motion.p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2  md:gap-x-12 md:gap-y-6">
              {[
                ["~200ms (web speed)", "GET Query calls"],
                ["~1-2s to reach finality", "POST Update calls"],
                ["~1,100,000 query calls/s", " Query Call Speed"],
                ["~20,800 update calls/s", " Update Call Speed"],
              ].map((rows) => (
                <motion.div
                  className="flex flex-col items-start"
                  key={rows[0]}
                  variants={transitions.item}
                >
                  <span className=" text-transparent bg-clip-text gradient-text text-[20px] leading-[34px] font-book">
                    {rows[0]}
                  </span>
                  <span className="tw-paragraph-sm text-black-60">
                    {rows[1]}
                  </span>
                </motion.div>
              ))}
            </div>
          </SingleCard>

          <SplitCard
            imageSide="right"
            image={
              <img src="/img/features/seo-image.webp" alt="" className=""></img>
            }
            className="md:col-span-2"
          >
            <motion.h3
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-4 "
            >
              First googleable smart contracts in the world
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm mb-6 text-black-60"
              variants={transitions.item}
            >
              As search engines like Google can’t index smart contracts running
              on other blockchains, developers had to use centralized cloud
              providers to create frontends that are searchable. The Interrnet
              Computer hosts smart contracts that can directly be indexed by all
              popular search engines.
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link href="" className="tw-heading-6 flex gap-2 items-center">
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn about HTTPS outcalls
              </Link>
            </motion.p>
          </SplitCard>
          <SingleCard>
            <motion.h3
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-4 "
            >
              100% on-chain: no cloud
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm text-black-60 mb-12"
              variants={transitions.item}
            >
              The Internet Computer provides a complete tech stack for
              developers to build on. It can hosts online services and games
              fully on-chain without ever relying on centralized cloud
              providers. This provides complete decentralization and removes
              single points of failure.
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link href="" className="tw-heading-6 flex gap-2 items-center">
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn more
              </Link>
            </motion.p>
          </SingleCard>

          <SingleCard>
            <motion.h3
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-4 "
            >
              Reverse Gas Model
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm text-black-60 mb-12"
              variants={transitions.item}
            >
              One of the major hurdles in the blockchain industry for end users
              is having to buy and hold tokens to interact with the blockchain
              (gas fees). The Internet Computer has been designed with mass
              adoption in mind from the ground up. Developers charge their smart
              contracts with cycles (gas), so users don’t have to pay for
              computation, removing barrier of entry.
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link href="" className="tw-heading-6 flex gap-2 items-center">
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn more
              </Link>
            </motion.p>
          </SingleCard>
        </section>

        <AnimateSpawn
          className="container-10 text-white relative mb-20 mt-44  md:mt-56"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            variants={transitions.fadeIn}
            className="
              z-[-1]
              blob
              blob-infinite 
              blob-lg
              blob-center
            "
          ></motion.div>
          <div className="md:w-6/10 mx-auto text-center">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-3 md:mb-6"
              variants={transitions.item}
            >
              Integrating Chains
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              No more bridges. Hackers have stolen 100s of millions of dollars
              by exploiting bridges. The Internet Computer uses advanced
              cryptography to directly integrate with other blockchains without
              using bridges.
            </motion.p>
          </div>
        </AnimateSpawn>

        <section className="container-12 grid md:grid-cols-2 gap-5">
          <SplitCard
            imageSide="right"
            imageSideClassName="text-center"
            image={
              <img
                src="/img/features/btc-eth.webp"
                alt=""
                className="my-10 h-[150px] md:h-[280px]"
              ></img>
            }
            className="md:col-span-2 text-white bg-[url(/img/features/bitcoin-bg-mobile.jpg)] md:bg-[url(/img/features/bitcoin-bg.webp)] bg-stretch md:bg-cover"
          >
            <motion.h3
              className="tw-heading-4 md:tw-heading-3 mb-4 "
              variants={transitions.item}
            >
              Native Bitcoin smart contracts
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm mb-6 "
              variants={transitions.item}
            >
              The Internet Computer is cryptographically integrated with the
              Bitcoin network. The canister smart contracts it hosts can create
              bitcoin addresses, and send and receive bitcoin, directly on the
              Bitcoin ledger.
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link
                href="https://internetcomputer.org/bitcoin-integration/"
                className="tw-heading-6 flex gap-2 items-center text-white hover:text-white-60 hover:no-underline"
              >
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn more about BTC integration
              </Link>
            </motion.p>
          </SplitCard>
          <SingleCard>
            <motion.h3
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-4 "
            >
              Extending ETH
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm text-black-60 mb-12"
              variants={transitions.item}
            >
              Using the power of threshold ECDSA, the Internet Computer will
              integrate with Ethereum, lending ETH the superpowers of ICP smart
              contracts
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link href="" className="tw-heading-6 flex gap-2 items-center">
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn more
              </Link>
            </motion.p>
          </SingleCard>
          <SingleCard>
            <motion.h3
              variants={transitions.item}
              className="tw-heading-4 md:tw-heading-3 mb-4 "
            >
              Chain-key Transactions
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm text-black-60 mb-12"
              variants={transitions.item}
            >
              Chain-key transactions are the innovation that powers direct
              integration with other blockchains without the use of bridges. It
              allows the Internet Computer to natively create transactions on
              other blockchains.
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link href="" className="tw-heading-6 flex gap-2 items-center">
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn more
              </Link>
            </motion.p>
          </SingleCard>
        </section>

        <AnimateSpawn
          className="container-10 text-white relative mb-15 mt-48 md:mt-56"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            variants={transitions.fadeIn}
            className="
              z-[-1]
              blob
              blob-purple 
              blob-md md:blob-lg
              blob-center
            "
          ></motion.div>
          <div className="md:w-6/10 mx-auto text-center">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-3 md:mb-6"
              variants={transitions.item}
            >
              Democracy on the Blockchain
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              DAOs are the future of the digital economy and a core part of the
              Internet Computer.
            </motion.p>
          </div>
        </AnimateSpawn>
        <section className="container-12 grid md:grid-cols-2 gap-5">
          <SplitCard
            imageSide="right"
            image={
              <img src="/img/features/nns-image.webp" alt="" className=""></img>
            }
            className="md:col-span-2"
          >
            <motion.h3
              className="tw-heading-4 md:tw-heading-3 mb-4 "
              variants={transitions.item}
            >
              The brain of the Internet Computer
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm mb-6 text-black-60"
              variants={transitions.item}
            >
              The Internet Computer is governed by a fully on-chain,
              permissionless system that continuously upgrades the protocol
              based on the voting of ICP token holders.
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link href="https://internetcomputer.org/nns" className="tw-heading-6 flex gap-2 items-center">
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn about ICP governance
              </Link>
            </motion.p>
          </SplitCard>

          <SplitCard
            imageSide="left"
            imageSideClassName="relative w-full min-h-[50vw] sm:min-h-[20vh] md:min-h-0 md:h-full overflow-hidden"
            image={
              <img
                src="/img/features/sns-image.webp"
                alt=""
                className="px-6 w-[550px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              ></img>
            }
            className="md:col-span-2"
            contentSideClassName="relative z-10"
          >
            <motion.h3
              className="tw-heading-4 md:tw-heading-3 mb-4 "
              variants={transitions.item}
            >
              Make any web3 service into a DAO
            </motion.h3>
            <motion.p
              className="tw-paragraph md:tw-lead-sm mb-6 text-black-60"
              variants={transitions.item}
            >
              The Internet Computer allows developers to turn their dapps into a
              DAO to achieve full decentralization - 100% on-chain
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link href="https://internetcomputer.org/sns" className="tw-heading-6 flex gap-2 items-center">
                <RightPointer className="w-6 h-6"></RightPointer>
                Learn about ICP DAOs
              </Link>
            </motion.p>
          </SplitCard>
        </section>

        <AnimateSpawn
          className="container-10  relative mb-6 mt-30 md:mt-40"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            variants={transitions.fadeIn}
            className="
              z-[-1]
              blob md:hidden
              blob-infinite 
              blob-sm
              blob-top-right
            "
          ></motion.div>
          <div className="md:w-5/10">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-4 md:mb-6"
              variants={transitions.item}
            >
              Cool Crypto Stuff
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              Countless innovations in cryptography and distributed computing
              were necessary to build the first true World Computer. Here are a
              few favorites.
            </motion.p>
          </div>
        </AnimateSpawn>
        <section className="container-12 grid sm:grid-cols-2 md:grid-cols-3 gap-5 relative">
          <motion.div
            variants={transitions.fadeIn}
            className="
              z-[-1]
              hidden md:block
              blob
              blob-infinite 
              blob-sm
              blob-top-right
            "
          ></motion.div>
          <SmallCard>
            <h4 className="tw-heading-6 md:tw-heading-5 mb-3">
              Chain-key Cryptography
            </h4>
            <p className="tw-paragraph-sm md:tw-paragraph text-black-60 mb-3">
              The Internet Computer protocol uses a toolbox of advanced
              cryptographic mechanisms, collectively known as chain-key
              cryptography, which allows the IC to achieve functionalities and
              scalability that are impossible on other blockchains.
            </p>
            <p className="mb-0">
              <Link href="" className="link-external">
                Learn more
              </Link>
            </p>
          </SmallCard>
          <SmallCard>
            <h4 className="tw-heading-6 md:tw-heading-5 mb-3">
              Asynchronous Execution (Parallelism)
            </h4>
            <p className="tw-paragraph-sm md:tw-paragraph text-black-60 mb-3">
              The Internet Computer protocol uses a toolbox of advanced
              cryptographic mechanisms, collectively known as chain-key
              cryptography, which allows the IC to achieve functionalities and
              scalability that are impossible on other blockchains.
            </p>
            <p className="mb-0">
              <Link href="" className="link-external">
                Learn more
              </Link>
            </p>
          </SmallCard>
          <SmallCard>
            <h4 className="tw-heading-6 md:tw-heading-5 mb-3">
              Heartbeat (deamon contracts)
            </h4>
            <p className="tw-paragraph-sm md:tw-paragraph text-black-60 mb-3">
              The Internet Computer protocol uses a toolbox of advanced
              cryptographic mechanisms, collectively known as chain-key
              cryptography, which allows the IC to achieve functionalities and
              scalability that are impossible on other blockchains.
            </p>
            <p className="mb-0">
              <Link href="" className="link-external">
                Learn more
              </Link>
            </p>
          </SmallCard>
          <SmallCard>
            <h4 className="tw-heading-6 md:tw-heading-5 mb-3">
              Multi-block transactions
            </h4>
            <p className="tw-paragraph-sm md:tw-paragraph text-black-60 mb-3">
              The Internet Computer protocol uses a toolbox of advanced
              cryptographic mechanisms, collectively known as chain-key
              cryptography, which allows the IC to achieve functionalities and
              scalability that are impossible on other blockchains.
            </p>
            <p className="mb-0">
              <Link href="" className="link-external">
                Learn more
              </Link>
            </p>
          </SmallCard>
          <SmallCard>
            <h4 className="tw-heading-6 md:tw-heading-5 mb-3">
              WebAssembly (WASM)
            </h4>
            <p className="tw-paragraph-sm md:tw-paragraph text-black-60 mb-3">
              The Internet Computer protocol uses a toolbox of advanced
              cryptographic mechanisms, collectively known as chain-key
              cryptography, which allows the IC to achieve functionalities and
              scalability that are impossible on other blockchains.
            </p>
            <p className="mb-0">
              <Link href="" className="link-external">
                Learn more
              </Link>
            </p>
          </SmallCard>
          <SmallCard>
            <h4 className="tw-heading-6 md:tw-heading-5 mb-3">
              Subnets / Infinite Scalabilty
            </h4>
            <p className="tw-paragraph-sm md:tw-paragraph text-black-60 mb-3">
              The Internet Computer protocol uses a toolbox of advanced
              cryptographic mechanisms, collectively known as chain-key
              cryptography, which allows the IC to achieve functionalities and
              scalability that are impossible on other blockchains.
            </p>
            <p className="mb-0">
              <Link href="" className="link-external">
                Learn more
              </Link>
            </p>
          </SmallCard>
        </section>
        <AnimateSpawn
          className="container-10 text-white relative my-44 md:my-56"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            variants={transitions.fadeIn}
            className="
              z-[-1]
              blob
              blob-purple 
              blob-md md:blob-lg
              blob-center
            "
          ></motion.div>
          <div className="md:w-6/10 mx-auto text-center">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-3 md:mb-6"
              variants={transitions.item}
            >
              Take a Tech Dive 
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-6"
              variants={transitions.item}
            >
              Learn how inner workings of the Internet Computer blockchain. 
              Detailed tech articles on the core protocol, governance, to chain-key cryptography, plus
              open-source repositories, in-depth video academy sessions, white papers, and more. 
       
            </motion.p>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-0"
              variants={transitions.item}
            >
              <Link className="button button-white" href="https://internetcomputer.org/how-it-works">
                Learn how ICP works
              </Link>
            </motion.p>
          </div>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default FeaturesPage;
