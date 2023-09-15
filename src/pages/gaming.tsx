import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import Newsletter from "../components/Common/Newsletter/Newsletter";
import ShareMeta from "../components/Common/ShareMeta";
import TranslatedLayout from "../components/Common/TranslatedLayout/TranslatedLayout";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

function GamingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Gaming"
      description={"todo"}
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
                Next level
                <br />
                Web3 gaming
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                Enabled by smart contracts, Autonomous Worlds are a paradigm
                shift in gaming, enabling developers, modders and players to
                build composable, and permissionless game worlds that live on
                the blockchain forever. Now possible on the Internet Computer —
                100% on-chain.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>
        <AnimateSpawn
          el={motion.section}
          variants={transitions.container}
          className="container-10 relative md:pt-30 pb-20 md:pb-40"
        >
          <div className="-mt-64 md:mt-0 md:absolute md:-right-40 md:top-[-550px] text-center md:w-[800px]">
            <motion.img
              variants={transitions.fadeIn}
              src="/img/gaming/spaceship.webp"
              alt=""
              className="w-full max-w-sm md:max-w-none aspect-square"
            />
          </div>
          <motion.h2
            className="tw-heading-4 md:tw-heading-3 mb-0 text-gradient md:w-5/10"
            variants={transitions.item}
          >
            Web2 gaming prioritizes profits at the expense of player enjoyment.
            Autonomous Worlds on the Internet Computer, prioritize the player
            experience.
          </motion.h2>
        </AnimateSpawn>

        <section className="bg-infinite text-white pt-20 md:pt-44">
          <div className="container-10 md:w-6/10 md:mx-auto">
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 text-center mb-0"
              variants={transitions.item}
            >
              Autonomous worlds on ICP
            </motion.h2>
          </div>
          <div className=" container-12 flex flex-col gap-16 md:gap-40 relative pt-20">
            <div className="blob blob-white blob-sm md:blob-md blob-x-10 blob-y-0"></div>

            <TranslatedLayout imageUrl="/img/gaming/image-1.webp">
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Creating on-chain worlds
              </h2>

              <p className="tw-lead-sm mb-0">
                Autonomous worlds are on-chain game worlds where all player
                interactions, and digital assets are stored on the blockchain.
                They enable new forms of gaming experiences, and game genres as
                these worlds align incentives of developers, modders, and
                players. Thanks to the composability of smart contracts, the
                game’s community can infinitely extend these words in a
                permissionless way.
              </p>
            </TranslatedLayout>
            <TranslatedLayout
              imageUrl="/img/gaming/image-2.webp"
              reverse={true}
            >
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                As fast as Web2 gaming
              </h2>
              <p className="tw-lead-sm mb-0">
                Users of enterprise solutions often resort to giving up self
                custody of their data or digital assets, having to trust the
                service provider to appropriately and securely handle their
                data. Using canister smart contracts on the Internet Computer,
                organizations can simply deploy an architecture, in which all
                users have complete ownership and control of their data and
                digital assets. This separation is enabled by chain-key
                cryptography, and most importantly doesn’t require users to go
                through complicated configuring of their accounts.
              </p>
            </TranslatedLayout>
            <TranslatedLayout imageUrl="/img/gaming/image-3.webp">
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
                Jump right in with out fees
              </h2>
              <p className="tw-lead-sm mb-0">
                Large scale software systems that rely on centralized cloud
                providers, risk being subject to vendor lock-in, having to
                dealing with increasing server costs or codebase refactoring.
                <br />
                <br />
                The Internet Computer offers an alternative technology stack
                which is open and decentralized. It connects independent node
                machines to create a self-sovereign autonomous cloud on which
                any system can be built. Its software — canister smart contracts
                — are compiled to WebAssembly, the new W3 industry standard for
                cross platform, language agnostic, portable server executable
                code.
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
              The perks of building games on ICP
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img src="/img/gaming/icon-1.svg" alt="" className="h-24" />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Incentives are aligned
                </h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  Autonomous Worlds are blockchain-based game environments that
                  harmoniously align the interests of developers, modders, and
                  players, thanks to the power of smart contracts.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col text-center backdrop-blur-2xl rounded-xl border border-white border-solid bg-white/90 p-12"
                variants={transitions.item}
              >
                <img src="/img/gaming/icon-2.svg" alt="" className="h-24" />
                <h3 className="tw-lead my-3 md:tw-title-sm">
                  Lives on the blockchain
                </h3>
                <p className="tw-paragraph-sm text-black/60  mb-0">
                  Autonomous Worlds thrive on the blockchain, offering unique
                  gaming experiences while harmonizing the interests of
                  developers, modders, and players through smart contracts.
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
                  Community-driven Autonomous Worlds on the blockchain enable
                  diverse gaming experiences, fostering collaboration among
                  developers, modders, and players through smart contracts.
                </p>
              </motion.div>
            </div>
          </AnimateSpawn>
        </section>

        <section className="container-10 pt-30  md:pt-40 relative">
          <AnimateSpawn className="md:w-6/10" variants={transitions.container}>
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-8 md:w-9/10"
              variants={transitions.item}
            >
              Uncover new worlds
            </motion.h2>
            <motion.p className="tw-lead-sm mb-0" variants={transitions.item}>
              Exploring the games on the Internet Computer is a thrilling
              journey into a virtual world powered by blockchain technology.
              From multiplayer battles to solo adventures and puzzle-solving,
              there's something for every gamer. These games showcase the
              innovative potential of blockchain, making each visit to
              internetcomputer.org a glimpse into the future of gaming.
            </motion.p>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="md:container-12 mt-20 md:mt-0 md:pt-40 grid md:grid-cols-2 gap-16 md:gap-10 pb-16 md:pb-0 bg-white md:bg-transparent"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:col-span-2 md:rounded-[32px] backdrop-blur-2xl md:bg-white-60 relative flex flex-col md:flex-row gap-10 md:gap-10 lg:gap-0 px-6 md:px-0 pt-20 md:pt-0">
            <div className="max-w-sm mx-auto md:max-w-none md:mx-0 flex-1 md:self-center md:order-2 lg:self-start flex rounded-[32px] overflow-hidden">
              <img
                src="/img/gaming/cubetopia.webp"
                alt=""
                className="w-full relative"
                loading="lazy"
              />
            </div>
            <div className="flex-1 md:order-1 md:py-20">
              <div className="md:ml-2/12">
                <motion.h2
                  className=" text-transparent bg-clip-text gradient-text tw-heading-4 md:tw-heading-3 mb-6"
                  variants={transitions.item}
                >
                  Cubetopia Metaverse
                </motion.h2>
                <motion.p
                  className="tw-lead-sm mb-8"
                  variants={transitions.item}
                >
                  Minecraft meets World of Warcraft, on the blockchain. Build,
                  chat and adventure with friends, right in your browser.
                </motion.p>

                <motion.p className="mb-0" variants={transitions.item}>
                  <Link className="link-primary link-with-icon" href="">
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
                Decentralizing Asset Creation and Discovery for the Metaverse.
                Enter the VR canvas. Use tools to create 3D environments,
                objects, sculptures or abstract art.
              </p>
              <Link className="link-primary link-with-icon" href="">
                Discover the world
                <LinkArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="md:rounded-[32px] md:bg-white/60 md:backdrop-blur-2xl px-6 md:p-12">
            <img
              src="/img/gaming/pawsarena.webp"
              alt=""
              loading="lazy"
              className="rounded-2xl w-full"
            />
            <div className="md:pr-20">
              <h3 className="tw-heading-5 md:tw-heading-4 text-gradient mb-4 mt-6 md:mb-6 md:mt-12">
                Paws Arena
              </h3>
              <p className="tw-paragraph md:tw-lead-sm mb-5">
                This is the cutest, most fun and competitive turn-based play to
                earn multiplayer game on the ICP. Players will fight in the
                arena and earn $PAW Tokens which will be used to buy in-game
                items.
              </p>
              <Link className="link-primary link-with-icon" href="">
                Play Paws Arena
                <LinkArrowUpRight />
              </Link>
            </div>
          </div>
        </AnimateSpawn>

        <section className="bg-infinite text-white py-20 md:pb-0 md:mt-44">
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

            <TranslatedLayout imageUrl="/img/gaming/boomdao.webp">
              <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">BOOOOM!</h2>

              <p className="tw-lead-sm mb-10">
                Building an entire smart contract based game is challenging.
                BOOM DAO has spent a year building ready-to-use, free, and
                open-sourced game tooling that handles most of the complex smart
                contract infrastructure, so you can focus on gameplay, and your
                game client. Player interactions, NFT minting/burning, and the
                on-chain game server is managed by BOOM DAO's Game World
                Protocol.
              </p>

              <p className="mb-0 text-white">
                <Link href="" className="link-white link-with-icon">
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
            <div className="md:h-[450px] flex flex-col md:flex-row rounded-xl overflow-hidden">
              <Link className="md:w-7/10 h-full flex relative group" href="">
                <img
                  src="/img/gaming/boomdao-workshop.webp"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </Link>
              <div
                className="md:w-3/10 flex bg-white-80 border border-solid border-white md:rounded-tr-xl rounded-br-xl p-8 md:p-12 
              
          backdrop-blur-2xl
          "
              >
                <div className="self-end">
                  <h4 className="text-razzmatazz tw-heading-7 mb-3">
                    Workshop
                  </h4>
                  <p className="mb-3 tw-heading-6 md:tw-heading-5">
                    Rapidly Build Fully On-Chain Games with BOOM DAO Tools
                  </p>
                  <p className="text-black-60 tw-paragraph md:tw-lead-sm mb-0">
                    With Tommy M
                  </p>
                </div>
              </div>
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-12 mt-20 md:mt-40 relative"
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
                src="/img/gaming/icon-3.svg"
                alt=""
                loading="lazy"
                className="w-30"
              />
              <h3 className="tw-lead md:tw-title-sm mb-0">100% on-chain</h3>
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
                src="/img/gaming/icon-4.svg"
                alt=""
                loading="lazy"
                className="w-30"
              />
              <h3 className="tw-lead md:tw-title-sm mb-0">500B TXs per day</h3>
              <p className="mb-0 tw-paragraph-sm text-black/60">
                The Internet Computer processes close to half a billion
                transactions a day. Being the highest throughput blockchain,
                games hosted on ICP can serve unparalleled numbers of players,
                and horizontally scale out with new subnet blockchains with
                increased network usage.
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
              <h3 className="tw-lead md:tw-title-sm mb-0">0 gas fees</h3>
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
          className="md:container-12 pt-30 md:py-30"
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
                Fully on-chain DAOs
              </motion.h2>
              <motion.p
                className="tw-lead-sm md:tw-lead-sm mb-12"
                variants={transitions.item}
              >
                OpenChat, with the launch of its first SNS DAO, marks a
                significant milestone in the world of blockchain and social
                media. Cras mattis consectetur purus sit amet fermentum.
              </motion.p>
            </div>
            <div className="md:w-6/10">
              <motion.p
                className="flex flex-col sm:flex-row items-start md:items-center gap-6 md:gap-8 mb-0"
                variants={transitions.item}
              >
                <Link className="link-primary link-with-icon" href="/sns">
                  <LinkArrowRight />
                  More on SNS DAOs
                </Link>
              </motion.p>
            </div>
          </div>
        </AnimateSpawn>
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
              src="/img/newsletter/email-image-1.webp"
              alt=""
              loading="lazy"
            />
          }
          className="mt-30 md:mt-0 mb-20"
        >
          <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8">
            Want to meet ICP enthusiasts IRL?
            <br />
            <span className="text-white-60">Sign up to stay connected</span>
          </h2>
        </Newsletter>
      </main>
    </Layout>
  );
}

export default GamingPage;
