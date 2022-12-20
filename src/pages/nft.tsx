import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";

const MotionLink = motion(Link);

const largeNfts: { url: string; title: string; imageUrl: string }[] = [
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
];

const smallNfts: { url: string; title: string; imageUrl: string }[] = [
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
  { imageUrl: "/img/nft/tmp.png", title: "", url: "" },
];

const NftShowcase = React.memo(() => {
  return (
    <section className="-mt-24 overflow-hidden relative h-[280px] md:h-[560px]">
      <div className="flex gap-1 md:gap-3 absolute left-1/2 -translate-x-1/2 min-w-max">
        {largeNfts.map((nft) => (
          <a href={nft.url} title={nft.title} className="flex">
            <img
              key={nft.imageUrl}
              src={nft.imageUrl}
              alt=""
              className="w-40 md:w-80 rounded-xl"
            />
          </a>
        ))}
      </div>

      <div className="flex gap-1 md:gap-3 absolute top-40 md:top-80 mt-6 md:mt-8 left-1/2 -translate-x-1/2 min-w-max">
        {smallNfts.map((nft) => (
          <a href={nft.url} title={nft.title} className="flex">
            <img
              key={nft.imageUrl}
              src={nft.imageUrl}
              alt=""
              className="w-24 md:w-52 rounded-xl"
            />
          </a>
        ))}
      </div>
    </section>
  );
});

const TranslatedLayout: React.FC<{
  children: React.ReactNode;
  reverse?: boolean;
  imageUrl: string;
  alt?: string;
  imageClassName?: string;
  imageWithBlob?: boolean;
}> = ({
  children,
  reverse = false,
  alt = "",
  imageUrl,
  imageWithBlob = false,
  imageClassName,
}) => {
  const imgEl = (
    <img
      src={imageUrl}
      alt={alt}
      className={clsx(
        "w-full sm:w-auto sm:h-[400px] md:h-[480px] lg:h-[600px]",
        imageClassName
      )}
    />
  );
  return !reverse ? (
    <div className="flex flex-col md:flex-row md:translate-x-1/12">
      <div className="flex flex-col justify-center md:w-5/12 order-2 md:order-1">
        {children}
      </div>
      <div className="flex-1 text-center md:text-right order-1 md:order-2 relative">
        {imageWithBlob && (
          <div className="blob blob-infinite blob-center blob-md md:blob-lg"></div>
        )}
        {imgEl}
      </div>
    </div>
  ) : (
    <div className="flex flex-col md:flex-row md:-translate-x-1/12 md:mb-40">
      <div className="flex-1 text-center md:text-left relative ">
        {imageWithBlob && (
          <div className="blob blob-infinite blob-center blob-md md:blob-lg"></div>
        )}
        {imgEl}
      </div>
      <div className="flex flex-col justify-center md:w-5/12 ">{children}</div>
    </div>
  );
};

function NftPage() {
  resetNavBarStyle();

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
      description=""
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <Head>
        <meta
          property="og:image"
          content={"https://internetcomputer.org/img/shareImages/share-nft.jpg"}
        />
        <meta
          name="twitter:image"
          content={"https://internetcomputer.org/img/shareImages/share-nft.jpg"}
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
                  className="tw-heading-3 md:tw-heading-2 mb-2"
                  variants={transitions.item}
                >
                  Next Generation NFTs
                </motion.h1>
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-8"
                  variants={transitions.item}
                >
                  The Internet Computer is the only blockchain that stores 100%
                  of the NFT on the blockchain, including all assets. This opens
                  up capabilities for ICP NFTs that go way beyond than just
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
              <span className="tw-heading-3 md:tw-heading-60 text-transparent bg-clip-text bg-gradient-100 from-[#3B00B9] to-[#2586B6DE]">
                $33,000,000
              </span>
              <span className="tw-paragraph md:tw-lead-sm">
                Total Trading Volume in 2022
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <span className="tw-heading-3 md:tw-heading-60 text-transparent bg-clip-text bg-gradient-100 from-[#3B00B9] to-[#2586B6DE]">
                2.6M+
              </span>
              <span className="tw-paragraph md:tw-lead-sm">Total NFTs</span>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <span className="tw-heading-3 md:tw-heading-60 text-transparent bg-clip-text bg-gradient-100 from-[#3B00B9] to-[#2586B6DE]">
                415
              </span>
              <span className="tw-paragraph md:tw-lead-sm">
                Total NFT Projects
              </span>
            </div>
          </div>
        </section>

        <section className="container-10 mb-20 md:mb-40">
          <div className="md:w-6/10">
            <h2 className="tw-heading-3 md:tw-heading-2 mb-6">Own your NFT</h2>
            <p className="tw-lead-sm md:tw-lead mb-0">
              When you buy an NFT on other chains, you are only buying a link
              that points to an off-chain off-chain asset stored using AWS or
              IPFS. That off-chain asset can be changed or even removed by the
              central entity that created it. As the Internet Computer can store
              the entire NFT directly on the blockchain, it offers full
              decentralization - you own 100% of the NFT.
            </p>
          </div>
        </section>

        <section className="mb-20 md:mb-40 container-12">
          <TranslatedLayout
            reverse={true}
            imageUrl="/img/nft/creator.png"
            imageWithBlob={true}
            imageClassName="md:translate-x-10 relative"
          >
            <h2 className="md:tw-heading-60 md:mb-6">
              Make the most out of NFTs
            </h2>
            <p className="md:tw-lead-sm md:mb-6">
              The Internet Computer allows NFTs incredible versatility. Because
              all data can be stored on-chain NFTs on the Internet Computer can
              be anything. Storing data on-chain is not only 23,500X more
              efficient on ICP compared to the next best, it is practically
              impossible to store assets like images on Solana or Ethereum.
            </p>
            <p>
              <Link href="" className="button-outline">
                Become a Creator
              </Link>
            </p>
          </TranslatedLayout>
          <TranslatedLayout imageUrl="/img/nft/btc-flower.png">
            <h2 className="md:tw-heading-60 md:mb-6">Dynamic NFTs</h2>
            <p className="md:tw-lead-sm mb-0">
              Making use of a unique feature of the Internet Computer, NFTs can
              efficiently communicate with the Web2 world without using oracles.
              HTTPS outcalls allow NFTs on ICP to query Web2 APIs and change
              appearance or behave differently depending on the response. For
              example BTC Flowers change the color of their paddles based on the
              last 24 hours of the Bitcoin’s price action
            </p>
          </TranslatedLayout>
        </section>
        {/* <BackgroundPanel> */}
        <section className="bg-gradient-to-bl from-[#e07934] via-[#964680] to-[#4421a0] md:py-48">
          <div className="container-12">
            <h2 className="tw-heading-60 md:mb-20 text-white-60 md:w-8/12 md:mx-auto">
              Cost of storing <span className="text-white">100MB</span> of NFT
              collections on-chain
            </h2>

            <div className="">
              <div className=""></div>
            </div>
          </div>
        </section>
        {/* </BackgroundPanel> */}
      </main>
    </Layout>
  );
}

export default NftPage;
