import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import VideoCard from "../components/Common/VideoCard";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

function GamingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Autonomous Worlds on ICP"
      description="Autonomous Worlds are a paradigm shift in Web3 gaming, allowing developers, and players to build infinitely extendable worlds together — 100% onchain"
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-gaming.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className=" text-white pt-20 relative bg-[url(/img/gaming/hero.webp)] bg-cover bg-center bg-no-repeat"
          ref={heroRef}
        >
          <AnimateSpawn
            className="container-10 pt-20 md:pt-36 relative md:flex"
            variants={transitions.container}
          >
            {/* <div className="md:flex-1"></div> */}
            <div className=" md:w-6/10 relative pb-[45%] sm:pb-[20%] md:pb-20 z-1">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Paradigm shift in Web3 gaming
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                Enabled by smart contracts, Autonomous Worlds are a paradigm
                shift in gaming, enabling developers, modders and players to
                build composable, and permissionless game worlds that live on
                the blockchain forever. Now possible on the Internet Computer —
                100% onchain.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>
        <AnimateSpawn
          el={motion.section}
          variants={transitions.container}
          className="container-10 relative md:pt-40 pb-20 md:pb-40"
        >
          <div className="-mt-64 md:mt-0 md:absolute md:-right-40 md:top-[-600px] text-center md:w-[800px]">
            <motion.img
              variants={transitions.fadeIn}
              src="/img/gaming/spaceship.webp"
              alt=""
              className="w-full max-w-sm md:max-w-none aspect-square"
            />
          </div>

          <motion.h2
            className="tw-heading-4 md:tw-heading-60 mb-0 text-gradient md:w-8/10 md:mx-auto"
            variants={transitions.item}
          >
            Web2 gaming often prioritizes profits at the expense of player
            enjoyment. Autonomous Worlds on the Internet Computer, prioritize
            the player experience.
          </motion.h2>
        </AnimateSpawn>

        <section className="bg-infinite text-white pt-20 md:pt-44">
          <div className="container-10 md:w-6/10 md:mx-auto">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 text-center mb-0"
              variants={transitions.item}
            >
              Extendable game worlds
            </motion.h2>
          </div>
          <div className=" container-12 flex flex-col gap-16 md:gap-40 relative pt-20">
            <div className="blob blob-white blob-sm md:blob-md blob-x-10 blob-y-0"></div>

            <TranslatedLayout
              video={{
                videoUrl: "/img/gaming/shiku.mp4",
                videoContentType: "video/mp4",
              }}
              attribution={
                <Link
                  href="https://shiku.com/"
                  className="text-white/60 hover:text-white hover:no-underline tw-lead-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  © Shiku Metaverse
                </Link>
              }
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Web2 gaming
              </h2>

              <p className="tw-lead-sm mb-0">
                There are growing concerns around some of the profit-seeking
                practices that have become commonplace in the traditional gaming
                industry. From blocking modding communities, to making
                competitive advantage completely dependent on microtransactions.
                While Web3 games in the past had their own unique issues,
                Autonomous Worlds may provide a solution that aligns incentives
                of players and developers.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/gaming/image-2.webp"
              reverse={true}
              attribution={
                <Link
                  href="https://dragginz.io/"
                  className="text-white/60 hover:text-white hover:no-underline tw-lead-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  © Dragginz
                </Link>
              }
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Evolution of Web3 gaming
              </h2>
              <p className="tw-lead-sm mb-0">
                Blockchain-based games have been around since 2017, but only
                recently has blockchain technology evolved to allow for more
                interesting gameplay to emerge. Initially, Web3 games were
                simple NFTs that could breed offsprings with different
                characteristics. Later on, more complex game economies formed
                using NFTs, fungible tokens, and smart contracts. However, most
                of the gameplay lived, and still live off-chain relying on
                centralized cloud providers. Combining Autonomous Worlds and the
                Internet Computer, whole game worlds can now exist 100% on the
                blockchain, providing unique gameplay mechanics.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/gaming/image-3.webp"
              attribution={
                <Link
                  href="https://cosmicrafts.com/"
                  className="text-white/60 hover:text-white hover:no-underline tw-lead-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  © CosmicRafts
                </Link>
              }
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Autonomous Worlds
              </h2>
              <p className="tw-lead-sm mb-0">
                Autonomous worlds are onchain game worlds where all player
                interactions, and digital assets are stored on the blockchain.
                They enable new forms of gaming experiences and game genres, as
                these worlds align incentives of developers, modders, and
                players. Thanks to the unique properties of smart contracts, the
                communities of these games can infinitely extend these words in
                a permissionless way.
              </p>
            </TranslatedLayout>
          </div>
        </section>

        <section
          className="pt-20 md:pt-48
          bg-[linear-gradient(180deg,#3b00b9_0%,#3b00b9_85%,transparent_85%,transparent_100%)]
          sm:bg-[linear-gradient(180deg,#3b00b9_0%,#3b00b9_87%,transparent_87%,transparent_100%)]
          md:bg-[linear-gradient(180deg,#3b00b9_0%,#3b00b9_77%,transparent_77%,transparent_100%)]
          relative "
        >
          {/* <div className="blob blob-purple blob-sm md:blob-md blob-x-10 blob-y-10"></div> */}

          <AnimateSpawn
            className="container-12"
            variants={transitions.container}
          >
            <motion.h2 className="tw-heading-5 md:tw-heading-3 mb-8 md:mb-12 text-white sm:w-6/12 lg:w-4/12 sm:mx-auto text-center">
              Perks of Autonomous Worlds
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img src="/img/gaming/icon-1.svg" alt="" className="h-24" />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Incentives aligned
                </h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  Autonomous Worlds align the interest of developers, modders
                  and players, so that they can collaboratively build rich game
                  worlds together.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img src="/img/gaming/icon-2.svg" alt="" className="h-24" />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Infinitely extendable
                </h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  Smart contracts are composable, which means they can serve as
                  components to hierarchical structures. This allows Autonomous
                  Worlds to extend endlessly.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img src="/img/gaming/icon-3.svg" alt="" className="h-24" />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Driven by the community
                </h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  Instead of the community being simply the receiver of game
                  content, they can be deeply integrated in evolving it through
                  governance, and content creation.
                </p>
              </motion.div>
            </div>
          </AnimateSpawn>
        </section>

        <section className="container-10 pt-30  md:pt-40 relative">
          <div className="blob blob-purple blob-x-10 blob-y-0 blob-md z-[-1]"></div>
          <AnimateSpawn className="md:w-6/10" variants={transitions.container}>
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-8 md:w-9/10"
              variants={transitions.item}
            >
              Uncover new worlds
            </motion.h2>
            <motion.p className="tw-lead-sm mb-8" variants={transitions.item}>
              Discover, and build new worlds on the Internet Computer! Utilizing
              canister smart contracts, developers and players can build
              large-scale, extendable game worlds hosted end-to-end on the
              blockchain. Reverse gas model enables novel revenue models, and
              lowers the barrier of entry for new players who don’t want to
              setup a wallet just to interact with an onchain game.
            </motion.p>
            <motion.p className="mb-0" variants={transitions.item}>
              <Link
                href="https://internetcomputer.org/ecosystem?tag=Gameing"
                className="link-primary link-with-icon"
              >
                <LinkArrowRight />
                View all games
              </Link>
            </motion.p>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="md:container-12 mt-20 md:mt-0 md:pt-40 grid md:grid-cols-2 gap-16 md:gap-10 pb-16 md:pb-0 bg-white md:bg-transparent"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:col-span-2 md:rounded-[32px] backdrop-blur-2xl md:bg-white-60 relative flex flex-col md:flex-row gap-10 md:gap-10 px-6 md:px-0 pt-20 md:pt-0">
            <div className=" flex-1 md:self-center md:order-2 lg:self-start flex rounded-[32px] overflow-hidden">
              <img
                src="/img/gaming/cubetopia.webp"
                alt=""
                className="w-full relative object-cover"
              />
            </div>
            <div className="md:flex-1 md:order-1 md:py-20">
              <div className="md:ml-2/12">
                <motion.h2
                  className=" text-transparent bg-clip-text gradient-text tw-heading-4 md:tw-heading-3 mb-6"
                  variants={transitions.item}
                >
                  Cubetopia
                </motion.h2>
                <motion.p
                  className="tw-lead-sm mb-8"
                  variants={transitions.item}
                >
                  Build anything on your own unique voxel island saved as a
                  mutable NFT world, or visit the worlds others have built —
                  100% onchain, on the Internet Computer.
                </motion.p>

                <motion.p className="mb-0" variants={transitions.item}>
                  <Link
                    className="link-primary link-with-icon"
                    href="https://e5owu-aaaaa-aaaah-abs5a-cai.raw.ic0.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Play it here
                    <LinkArrowUpRight />
                  </Link>
                </motion.p>
              </div>
            </div>
          </div>

          <div className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl px-6 md:p-12">
            <img
              src="/img/gaming/unfoldvr.webp"
              alt=""
              loading="lazy"
              className="rounded-2xl w-full"
            />
            <div className="md:pr-20">
              <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
                UnfoldVR
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-5">
                Blockchain meets virtual reality. UnfoldVR empowers the
                immersive creator economy. Enter the VR canvas, build 3D
                environments, objects, sculptures or abstract art and save them
                on the blockchain.
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://jmorc-qiaaa-aaaam-aaeda-cai.ic0.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Build your own VR world
                <LinkArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl px-6 md:p-12">
            <img
              src="/img/gaming/plethora.webp"
              alt=""
              loading="lazy"
              className="rounded-2xl w-full"
            />
            <div className="md:pr-20">
              <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
                Plethora
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-5">
                Fully onchain web3 platformer with the goal of rewarding users
                both with fun gameplay and NFTs. Plethora empowers NFT projects
                to launch their collections with immersive experiences
                customized for you. Play now to compete, have fun, and earn
                rewards
              </p>
              <Link
                className="link-primary link-with-icon"
                href="https://plethora.game/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Play Plethora
                <LinkArrowUpRight />
              </Link>
            </div>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-20 md:mt-30 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.h2
            className="tw-heading-4 md:tw-heading-60 mb-6 md:mb-12 text-center md:w-6/10 md:mx-auto"
            variants={transitions.item}
          >
            Advantages of ICP
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-5">
            <motion.div
              className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
              variants={transitions.item}
            >
              <img
                src="/img/gaming/icon-4.svg"
                alt=""
                loading="lazy"
                className="w-30"
              />
              <h3 className="tw-lead md:tw-title-sm mb-0">100% onchain</h3>
              <p className="mb-0 tw-paragraph-sm text-black/60">
                The Internet Computer enables these worlds to be hosted fully on
                the blockchain. As canister smart contracts serve web,
                developers can now get rid of the last centralized component,
                and host even the game client on chain. This allows the creation
                of DAOs that control all aspects of these worlds.
              </p>
            </motion.div>
            <motion.div
              className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
              variants={transitions.item}
            >
              <img
                src="/img/gaming/icon-5.svg"
                alt=""
                loading="lazy"
                className="w-30"
              />
              <h3 className="tw-lead md:tw-title-sm mb-0">300M TXs per day</h3>
              <p className="mb-0 tw-paragraph-sm text-black/60">
                The Internet Computer processes close to 0.3B transactions a
                day. Being the highest throughput blockchain, games hosted on
                ICP can serve unparalleled numbers of players, and horizontally
                scale out with new subnet blockchains with increased network
                usage.
              </p>
            </motion.div>
            <motion.div
              className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
              variants={transitions.item}
            >
              <img
                src="/img/gaming/icon-6.svg"
                alt=""
                loading="lazy"
                className="w-30"
              />
              <h3 className="tw-lead md:tw-title-sm mb-0">
                0 gas fees for players
              </h3>
              <p className="mb-0 tw-paragraph-sm text-black/60">
                The Internet Computer was designed with mass adoption in mind.
                Canister smart contracts implement the reverse gas fee model,
                which means that end-users can interact with canisters without
                paying gas, or even creating a wallet. This enables novel
                revenue models, and removes a high barrier of entry.
              </p>
            </motion.div>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="md:container-12 pt-30 md:pt-30"
          variants={transitions.container}
          el={motion.section}
        >
          <div className="md:rounded-[32px] backdrop-blur-2xl bg-white-60 px-1/12 pb-20 md:py-30 relative">
            <div className="-translate-y-24 sm:-translate-y-40 md:translate-y-0 md:absolute z-[-1] md:w-[500px] lg:w-[700px] md:top-[40px] lg:top-[-130px] right-0 overflow-hidden">
              <motion.img
                src="/img/home/dao.svg"
                alt=""
                className="w-full relative md:right-[-50px] lg:right-[-100px]"
                variants={transitions.item}
              />
            </div>
            <div className="md:w-7/12 -mt-16 md:mt-0">
              <motion.h2
                className="text-gradient tw-heading-3 md:tw-heading-60 mb-6"
                variants={transitions.item}
              >
                DAO-driven games
              </motion.h2>
              <motion.p
                className="tw-lead-sm md:tw-lead-sm mb-12"
                variants={transitions.item}
              >
                Since ICP dapps can be 100% onchain, DAOs on the Internet
                Computer can govern complete game worlds end-to-end, including a
                web-based game client.
              </motion.p>
            </div>
            <div className="md:w-6/10">
              <motion.p
                className="flex flex-col sm:flex-row items-start md:items-center gap-6 md:gap-8 mb-0"
                variants={transitions.item}
              >
                <Link className="link-primary link-with-icon" href="/sns">
                  <LinkArrowRight />
                  More on ICP DAOs
                </Link>
              </motion.p>
            </div>
          </div>
        </AnimateSpawn>

        <section className="bg-infinite text-white py-20 md:pb-0 md:mt-30">
          <div className="container-10 md:w-4/10 md:mx-auto">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 text-center mb-12"
              variants={transitions.item}
            >
              Don’t build from scratch
            </motion.h2>
          </div>
          <div className=" container-12 flex flex-col gap-16 md:gap-40 relative md:pb-30">
            <div className="blob blob-white blob-sm md:blob-md blob-x-10 blob-y-0"></div>

            <TranslatedLayout
              video={{
                videoUrl: "/img/gaming/boomdao.mp4",
                videoContentType: "video/mp4",
              }}
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">BOOOOM!</h2>

              <p className="tw-lead-sm mb-10">
                Building an entire smart contract based game is challenging.
                BOOM DAO has spent a year building ready-to-use, free, and
                open-sourced game tooling that handles most of the complex smart
                contract infrastructure, so you can focus on gameplay, and your
                game client. Player interactions, NFT minting/burning, and the
                onchain game server is managed by BOOM DAO's World Engine
                Protocol.
              </p>

              <p className="mb-0 text-white">
                <Link
                  href="https://u52bf-3qaaa-aaaal-qb5wq-cai.icp0.io/"
                  className="link-white link-with-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Building with BOOM DAO
                  <LinkArrowUpRight />
                </Link>
              </p>
            </TranslatedLayout>
          </div>
        </section>

        <section
          className="
          bg-[linear-gradient(180deg,#3b00b9_0%,#3b00b9_75%,transparent_75%,transparent_100%)]
          sm:bg-[linear-gradient(180deg,#3b00b9_0%,#3b00b9_87%,transparent_87%,transparent_100%)]
          md:bg-[linear-gradient(180deg,#3b00b9_0%,#3b00b9_50%,transparent_50%,transparent_100%)]
          relative
          "
        >
          <AnimateSpawn
            el={motion.section}
            variants={transitions.item}
            className="container-10"
          >
            <VideoCard
              label="Workshop"
              title="Rapidly Build Fully Onchain Games with BOOM DAO Tools"
              description="With Tommy M"
              image="/img/gaming/boomdao-workshop.webp"
              link="https://youtu.be/LHVVi4pN6CI?si=VZXpfMLkJMvhA-6b"
            />
          </AnimateSpawn>
        </section>

        <section className="max-w-page relative mx-auto mb-20 px-6 md:mb-30 md:px-15 mt-30">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-sm blob-x-5 blob-y-7 z-[-1] md:blob-md"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-6/12"
              variants={transitions.item}
            >
              Start hacking on ICP
            </motion.h2>
          </AnimateSpawn>

          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="Dev Docs"
              description=""
              href="/docs/home"
            />
            <CardWithDescription
              title="Sample Code on ICP Ninja"
              description=""
              href="https://icp.ninja/"
            />
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default GamingPage;
