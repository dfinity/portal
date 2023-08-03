import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";

const largeNfts: { url: string; title: string; imageUrl: string }[] = [
  { imageUrl: "/img/nft/btcflower.webp", title: "", url: "" },
  { imageUrl: "/img/nft/cosmic-birth.webp", title: "", url: "" },
  { imageUrl: "/img/nft/boxydude.webp", title: "", url: "" },
  { imageUrl: "/img/nft/icbucks.webp", title: "", url: "" },
  { imageUrl: "/img/nft/cubetopia-2.webp", title: "", url: "" },
  { imageUrl: "/img/nft/colorful-abstracts.webp", title: "", url: "" },
  { imageUrl: "/img/nft/icflowers.webp", title: "", url: "" },
  { imageUrl: "/img/nft/creator-gloves.webp", title: "", url: "" },
  { imageUrl: "/img/nft/ickitties.webp", title: "", url: "" },
];

const smallNfts: { url: string; title: string; imageUrl: string }[] = [
  { imageUrl: "/img/nft/ickitties.webp", title: "", url: "" },
  { imageUrl: "/img/nft/icpuppies.webp", title: "", url: "" },
  { imageUrl: "/img/nft/moonwalker.webp", title: "", url: "" },
  { imageUrl: "/img/nft/eimolad.webp", title: "", url: "" },
  { imageUrl: "/img/nft/motoko.webp", title: "", url: "" },
  { imageUrl: "/img/nft/motomoji.webp", title: "", url: "" },
  { imageUrl: "/img/nft/nautscc.webp", title: "", url: "" },
  { imageUrl: "/img/nft/pineapplepunks.webp", title: "", url: "" },
  { imageUrl: "/img/nft/pockedbot.webp", title: "", url: "" },
  { imageUrl: "/img/nft/pod.webp", title: "", url: "" },
  { imageUrl: "/img/nft/spaceapes.webp", title: "", url: "" },
  { imageUrl: "/img/nft/boxydude.webp", title: "", url: "" },
  { imageUrl: "/img/nft/btcflower.webp", title: "", url: "" },
];

const NftShowcase = React.memo(() => {
  return (
    <section className="-mt-24 overflow-hidden relative h-[280px] md:h-[560px]">
      <div className="flex gap-1 md:gap-3 absolute left-1/2 min-w-max nft-marquee-right">
        {largeNfts.map((nft) => (
          // <a href={nft.url} title={nft.title} className="flex">
          <img
            key={nft.imageUrl}
            src={nft.imageUrl}
            alt=""
            className="w-40 md:w-80 rounded-xl"
          />
          // </a>
        ))}
        {largeNfts.map((nft) => (
          // <a href={nft.url} title={nft.title} className="flex">
          <img
            key={nft.imageUrl}
            src={nft.imageUrl}
            alt=""
            className="w-40 md:w-80 rounded-xl"
          />
          // </a>
        ))}
      </div>

      <div className="flex gap-1 md:gap-3 absolute top-40 md:top-80 mt-6 md:mt-8 left-1/2 min-w-max nft-marquee-left">
        {smallNfts.map((nft) => (
          // <a href={nft.url} title={nft.title} className="flex">
          <img
            key={nft.imageUrl}
            src={nft.imageUrl}
            alt=""
            className="w-24 md:w-52 rounded-xl"
          />
          // </a>
        ))}
        {smallNfts.map((nft) => (
          // <a href={nft.url} title={nft.title} className="flex">
          <img
            key={nft.imageUrl}
            src={nft.imageUrl}
            alt=""
            className="w-24 md:w-52 rounded-xl"
          />
          // </a>
        ))}
      </div>
    </section>
  );
});

function NftPage() {
  const [bgDark, setBgDark] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeaderHeight(
      document.querySelector("nav.navbar").getBoundingClientRect().height
    );
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY > heroRef.current.clientHeight - headerHeight &&
        bgDark
      ) {
        setBgDark(false);
      } else if (
        window.scrollY < heroRef.current.clientHeight - headerHeight &&
        !bgDark
      ) {
        setBgDark(true);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [bgDark, headerHeight]);

  return (
    <Layout
      title="NFTs"
      description={`The Internet Computer is the only blockchain storing all components of an NFT on the blockchain, including assets. This opens up capabilities for ICP NFTs that go way beyond "overpriced links to JPGs".`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-nfts.jpg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-nfts.jpg"
          }
        />
      </Head>
      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {bgDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <AnimateSpawn variants={transitions.container}>
          <section
            className="overflow-hidden bg-infinite text-white pt-20"
            ref={heroRef}
          >
            <div className="container-10 pt-20 mb-40 md:mb-52 md:pt-36 relative">
              <div className="blob blob-purple blob-md md:blob-xl top-[-150px] left-full -translate-x-1/2 opacity-50"></div>
              <div className="md:w-7/10 relative">
                <motion.h1
                  className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                  variants={transitions.item}
                >
                  Next generation NFTs
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  The Internet Computer is the only blockchain storing all
                  components of an NFT on the blockchain, including assets. This
                  opens up capabilities for ICP NFTs that go way beyond
                  “overpriced links to JPGs”.
                </motion.p>
              </div>
            </div>
          </section>
          <NftShowcase></NftShowcase>
        </AnimateSpawn>

        <section className="container-12 mt-16 mb-20 md:mt-24 md:mb-48">
          <div className="border border-solid border-white bg-white-80 px-8 py-12 rounded-xl flex flex-col md:flex-row gap-12 md:gap-8 text-center">
            <div className="flex flex-col flex-1 gap-2">
              <span className="tw-heading-3 md:tw-heading-60 text-gradient">
                $33,000,000
              </span>
              <span className="tw-paragraph md:tw-lead-sm">
                Total trading volume in 2022
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <span className="tw-heading-3 md:tw-heading-60 text-gradient">
                2.6M+
              </span>
              <span className="tw-paragraph md:tw-lead-sm">Total NFTs</span>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <span className="tw-heading-3 md:tw-heading-60 text-gradient">
                415
              </span>
              <span className="tw-paragraph md:tw-lead-sm">
                Total NFT projects
              </span>
            </div>
          </div>
        </section>

        <section className="container-10 mb-20 md:mb-40">
          <div className="md:w-6/10">
            <h2 className="tw-heading-3 md:tw-heading-2 mb-6">Own your NFT</h2>
            <p className="tw-lead-sm md:tw-lead mb-0">
              Purchasing an NFT on other chains only buys you a link that points
              to an asset stored off chain, e.g., on AWS or IPFS. As such, that
              off-chain asset can be changed or even removed by whoever created
              it. As the Internet Computer can store the entire NFT inside a
              smart contract, you truly own and control 100% of your purchased
              NFT.
            </p>
          </div>
        </section>

        <section className="mb-20 md:mb-40 container-12 flex flex-col gap-16 md:gap-40">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/nft/creator.webp"
            imageWithBlob="blob blob-infinite blob-center blob-md md:blob-lg"
            imageClassName="relative"
          >
            <h2 className="tw-heading-3 md:tw-heading-60 md:mb-6">
              Make the most out of NFTs
            </h2>
            <p className="tw-lead-sm md:mb-6">
              The Internet Computer allows NFTs of incredible versatility. As
              NFTs can be data and code, i.e. a canister smart contract, NFTs
              can be anything on the Internet Computer. Plus, storing data on
              chain costs 20,000 times less than on Solana and 15,800,000 times
              less than on Ethereum. At those prices other blockchains are
              forced to use external storage solutions like AWS or IPFS. NFT
              projects on these chains could essentially store their assets on
              ICP without compromising on decentralization or price.
            </p>
            <p className="mb-0">
              <Link
                href="https://internetcomputer.org/docs/current/developer-docs/use-cases/considerations-for-nft-devs#nfts-on-the-internet-computer"
                className="button-outline"
              >
                Become a creator
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/nft/btc-flower.webp">
            <h2 className="md:tw-heading-60 md:mb-6">Dynamic NFTs</h2>
            <p className="md:tw-lead-sm mb-0">
              A distinguishing feature of the Internet Computer is that its
              smart contracts can communicate with the Web2 world without
              oracles, but rather through existing Web2 APIs using a
              functionality called HTTPS outcalls. This allows NFTs to be a lot
              more than simple static assets, meaning they can evolve over time
              based on events in the world. For example, the petals of BTC
              Flowers change color based on the last 24 hours of Bitcoin’s price
              action.
            </p>
          </TranslatedLayout>
          <TranslatedLayout
            video={{
              videoUrl: "/img/nft/nft.mp4",
              videoContentType: "video/mp4",
            }}
            reverse={true}
          >
            <h2 className="md:tw-heading-60 md:mb-6">
              Turning TXs into generative NFT art
            </h2>
            <p className="md:tw-lead-sm mb-0">
              Anything can be an NFT on the Internet Computer, even
              transactions. The Genesis II NFT shows off how diverse and complex
              NFTs can be on the Internet Computer. It consists of different
              dynamic elements each of which fetches realtime data using HTTPS
              outcalls every 15 mins, showing ICP whale purchases, price change
              over the last 24 hours, current block rate, number of nodes and
              more. The most impressive element is an HTML canvas displaying
              dynamically animating ICP transaction flows. All this is part of
              the NFT and not something stored and accessed off-chain.
            </p>
          </TranslatedLayout>
        </section>
        {/* <BackgroundPanel> */}
        <section className="bg-gradient-to-bl from-[#e07934] via-[#964680] to-[#4421a0] py-20 md:py-48 text-white">
          <div className="container-12">
            <h2 className="tw-heading-4 md:tw-heading-60  text-white-60 md:w-8/12 md:mx-auto mb-10 md:mb-20">
              Cost of storing <span className="text-white">1GB</span> of NFT
              collections on-chain
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mb-16 md:mb-24">
              <div className="flex-1 border border-solid border-white-30 rounded-xl flex flex-col gap-4 py-10 items-center panel-gradient">
                <h3 className="tw-heading-7-caps mb-0">Internet Computer</h3>
                <img src="/img/nft/ic-logo.webp" alt="" className="w-20" />
                <div>
                  <span className="tw-heading-3">$5</span>{" "}
                  <span className="tw-heading-5">/ year</span>
                </div>
              </div>

              <div className="flex-1 border border-solid border-white-30 rounded-xl flex flex-col gap-4 py-10 items-center">
                <h3 className="tw-heading-7-caps mb-0">Solana</h3>
                <img src="/img/nft/solana-logo.webp" alt="" className="w-20" />
                <div>
                  <span className="tw-heading-3">$110,000</span>{" "}
                  <span className="tw-heading-5">/ year</span>
                </div>
              </div>
              <div className="flex-1 border border-solid border-white-30 rounded-xl flex flex-col gap-4 py-10 items-center">
                <h3 className="tw-heading-7-caps mb-0">Ethereum</h3>
                <img
                  src="/img/nft/ethereum-logo.webp"
                  alt=""
                  className="w-20"
                />
                <div>
                  <span className="tw-heading-3">$79,000,000</span>{" "}
                  <span className="tw-heading-5">/ year</span>
                </div>
              </div>
            </div>

            <h2 className="tw-lead-sm md:tw-lead md:w-8/12 md:mx-auto mb-16 md:mb-20">
              The Internet Computer offers unparralleled efficiency that leaves
              other blockchains orders of magnitudes behind with regards to many
              metrics, making it the ideal chain to launch complex NFT
              collections and games. ICP uses the reverse gas model, which means
              end users can mint and trade NFTs with 0 gas fees.
            </h2>

            <div className="panel-gradient border border-solid border-white-30 rounded-xl py-12 px-8 flex flex-col gap-6 text-center md:flex-row">
              <div className="flex flex-col items-center gap-2 md:flex-1">
                <div>
                  <span className="tw-heading-3 md:tw-heading-60">$32.5</span>{" "}
                  <span className="tw-heading-6">/ week</span>
                </div>
                <p className="tw-paragraph md:tw-lead-sm mb-0">
                  Total cost of storing all NFTs
                </p>
              </div>
              <hr className="w-20 bg-white-20 self-center m-0 md:w-px md:h-20" />
              <div className="flex flex-col items-center gap-2  md:flex-1">
                <span className="tw-heading-3 md:tw-heading-60">306,000+</span>
                <p className="tw-paragraph md:tw-lead-sm mb-0">
                  Total transactions
                </p>
              </div>
              <hr className="w-20 bg-white-20 self-center m-0 md:w-px md:h-20" />
              <div className="flex flex-col items-center gap-2  md:flex-1">
                <span className="tw-heading-3 md:tw-heading-60">&lt; $500</span>{" "}
                <p className="tw-paragraph md:tw-lead-sm mb-0">
                  Total transaction costs for all
                  <br />
                  transactions
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container-12 py-30 md:py-48">
          <h2 className="tw-heading-3 md:tw-heading-2 text-gradient text-center md:w-6/12 md:mx-auto mb-16 md:mb-30">
            Your NFT could be anything
          </h2>
          <div className="flex flex-col gap-16 md:gap-40">
            <TranslatedLayout imageUrl="/img/nft/cubetopia.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                Cubetopia
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Each island (world) is a mutable NFT
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Cubetopia is a Minecraft-like Web3 game where players can build
                anything on unique voxel islands also called “worlds”. Each
                world is a mutable NFT stored on the Internet Computer
                blockchain. Anyone can visit these islands on chain, while the
                owner of the NFT can update it by building. Try it yourself!
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://e5owu-aaaaa-aaaah-abs5a-cai.raw.ic0.app/"
              >
                <LinkArrowRight /> Create your own island
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/nft/portal.webp" reverse={false}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                Portal
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                Videos as NFTs where owners receive royalties
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                Portal is a Web3 video sharing platform that allows users to
                mint their videos as NFTs. The owners of these NFTs receive
                tokens as royalties based on the number of viewers.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://app.portal.one/"
              >
                <LinkArrowRight /> Watch videos on Portal
              </Link>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/nft/social.webp" reverse={true}>
              <div className="tw-heading-6 md:tw-heading-5 mb-2 md:mb-6">
                DSCVR
              </div>
              <h3 className="tw-heading-4 md:tw-heading-60 mb-6">
                NFT gated communities
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-6 md:mb-10">
                DSCVR is one of the largest decentralized Web3 social media
                platforms in the world. It allows users to form communities
                called Portals around different interests. These communities can
                be NFT gated, making certain features like voting only available
                to people who hold a specific NFT. Besides this gating
                functionality, Portals themselves are NFTs owned by those who
                created them.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://dscvr.one/p/internet-computer"
              >
                <LinkArrowRight /> Check out the Internet Computer Portal
              </Link>
            </TranslatedLayout>
          </div>
        </section>
        <section className="mb-30 md:mb-60">
          <div className="container-10 mb-12 md:mb-20">
            <div className="md:w-6/10">
              <h2 className="tw-heading-3 md:tw-heading-2 mb-3">
                Trade NFTs with
                <br />
                <span className="text-gradient">zero gas fees</span>
              </h2>
              <p className="mb-0 text-black-60 tw-lead-sm md:tw-lead">
                Featuring a few web3 project teams already reinventing the
                internet on the ICP blockchain.
              </p>
            </div>
          </div>
          <div className="container-12 relative">
            <div className="hidden md:block blob blob-purple blob-center blob-lg z-[-1]"></div>
            <div className="flex flex-col md:flex-row gap-3">
              <Link
                href="https://entrepot.app"
                className="flex-1 hover:-translate-y-3 hover:no-underline text-black hover:text-black transition-transform border border-solid border-white bg-white-80 p-6 md:p-8 rounded-xl flex flex-row items-start gap-6 md:flex-col md:gap-9"
              >
                <img
                  src="/img/nft/entrepot.webp"
                  alt=""
                  className="w-16 md:w-20"
                />
                <div className="flex-1">
                  <h4 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                    Entrepot
                  </h4>
                  <p className="tw-paragraph-sm md:tw-lead-sm mb-3 md:mb-8 text-black-60">
                    Entrepot is the first and largest NFT marketplace on the
                    Internet Computer. They have launched hundreds of
                    collections with their no-code minting tool and have over
                    1TB of assets stored fully on-chain.
                  </p>
                  <span className="tw-paragraph-sm md:tw-lead-sm px-4 py-2 md:px-5 md:py-[10px] bg-[#F1EEF5] rounded-full">
                    $36M+ in trading
                  </span>
                </div>
              </Link>
              <Link
                href="https://tppkg-ziaaa-aaaal-qatrq-cai.raw.ic0.app/"
                className="flex-1 hover:-translate-y-3 hover:no-underline text-black hover:text-black transition-transform border border-solid border-white bg-white-80 p-6 md:p-8 rounded-xl flex flex-row items-start gap-6 md:flex-col md:gap-9"
              >
                <img src="/img/nft/yumi.webp" alt="" className="w-16 md:w-20" />
                <div className="flex-1">
                  <h4 className="tw-heading-6 md:tw-heading-5 mb-1 md:mb-2">
                    Yumi
                  </h4>
                  <p className="tw-paragraph-sm md:tw-lead-sm mb-3 md:mb-8 text-black-60">
                    Yumi is the first fully-decentralized NFT and digital goods
                    marketplace where users can create and trade NFTs. Users are
                    rewarded Yumi credits, which can be seamlessly integrated
                    with Shiku Metaverse.
                  </p>
                  <span className="tw-paragraph-sm md:tw-lead-sm px-4 py-2 md:px-5 md:py-[10px] bg-[#F1EEF5] rounded-full">
                    110,000+ users
                  </span>
                </div>
              </Link>
            </div>

            <div className="pt-20 text-center flex flex-col items-center gap-8 relative">
              <div className="md:hidden blob blob-purple blob-center blob-md z-[-1]"></div>

              <Link
                className="button-primary"
                href="https://internetcomputer.org/docs/current/developer-docs/use-cases/considerations-for-nft-devs"
              >
                Build your own
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default NftPage;
