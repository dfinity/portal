import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";
import PromoCard from "@site/src/components/Common/PromoCard";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import TranslatedLayout from "@site/src/components/Common/TranslatedLayout/TranslatedLayout";
import VideoCard, {
  ImageOnlyVideoCard,
} from "@site/src/components/Common/VideoCard";
import Gallery from "@site/src/components/Community/Gallery";
import { communityGallery } from "@site/src/components/Community/gallery-images";
import Globe from "@site/src/components/Community/Globe";
import { Hub, HubCard } from "@site/src/components/Community/Hubs";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import TelegramLogo from "@site/static/img/community/telegram.svg";

const hubs: Hub[] = [
  {
    name: "ICP.HUB India",
    location: "India",
    description:
      "In the heart of India, Crewsphere ICP India.Hub champions the Internet Computer via bootcamps that turn talented developers into Web3 experts.",
    image: "/img/community/icp-hub-india.webp",
    link: "https://linktr.ee/crewsphere?utm_source=linktree_admin_share",
    coordinates: [20.5937, 78.9629],
  },
  {
    name: "ICP.Hub Malaysia",
    location: "Malaysia/Thailand",
    description:
      "With hubs located in Thailand and Malaysia, SynergyLabs provide tools, insights, and network to foster ICP innovation.",
    image: "/img/community/icp-hub-synergylab.webp",
    link: "https://linktr.ee/SynergyLabsICP",
    coordinates: [13.7563, 100.5018],
  },
  {
    name: "ICP.Hub Philippines",
    location: "Philippines",
    description:
      "ISLA Camp is unleashing the potential of Web3 in the Philippines through immersive education, dynamic workshops, and hands-on bootcamps on the Internet Computer.",
    image: "/img/community/icp-hub-philippines.webp",
    link: "https://linktr.ee/ICPHubPH",
    coordinates: [12.8797, 121.774],
  },

  {
    name: "ICP.Hub Indonesia",
    location: "Indonesia",
    description:
      "ICP.Hub Indonesia is where ideas transform into innovation. DISRUPTIVES support ICP projects through incubation programs and resources to kickstart.",
    image: "/img/community/icp-hub-indonesia.webp",
    link: "https://linktr.ee/disruptives",
    coordinates: [-0.7893, 113.9213],
  },
  {
    name: "ICP.Hub Korea",
    location: "Korea",
    description:
      "ICP.Hub Korea is committed to advancing the Internet Computer blockchain and Web3 in Korea by regularly hosting education bootcamps and cultivating a community of developers.",
    image: "/img/community/icp-hub-korea.webp",
    link: "https://linktr.ee/icphubkorea",
    coordinates: [35.9078, 127.7669],
  },

  {
    name: "ICP.Hub Singapore",
    location: "Singapore",
    description:
      "Advocating digital innovation by harnessing the power of Web3 regional entrepreneurs, venture capitalists and community to realise the mass adoption of the Internet Computer's decentralized cloud and blockchain services.",
    image: "/img/community/icp-hub-singapore.webp",
    link: "https://linktr.ee/interlink3",
    coordinates: [1.3521, 103.8198],
  },
];

function AsiaAlliancePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="ICP Asia Alliance"
      description="The ICP Asia Alliance is at the forefront of fostering a vibrant Web3 and AI ecosystem in Asia."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-asia-alliance.webp"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className="overflow-hidden text-white pt-20 bg-[radial-gradient(69.72%_92.66%_at_66.49%_92.66%,#8C1E85_0%,#511860_31.88%,#281447_57%,#0E031F_83.88%)]"
          ref={heroRef}
        >
          <AnimateSpawn
            className="container-10  relative pt-10"
            variants={transitions.container}
          >
            <Breadcrumbs
              theme="dark"
              links={[
                {
                  href: "/community",
                  text: "Community",
                },
                {
                  text: "ICP Asia Alliance",
                },
              ]}
            ></Breadcrumbs>
            {/* <div className="blob blob-white blob-xl md:blob-xl md:blob-x-8 md:blob-y-10 opacity-100"></div> */}
            <div className="md:w-6/10 relative pt-20 pb-40 md:pb-52 md:pt-28">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                ICP Asia Alliance
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                The ICP Asia Alliance is at the forefront of fostering a vibrant
                Web3 and AI ecosystem in Asia.
              </motion.p>
            </div>
          </AnimateSpawn>
        </section>

        <AnimateSpawn
          className="container-12 relative"
          el={motion.section}
          variants={transitions.fadeIn}
        >
          <div className="text-center md:w-[660px] relative md:absolute top-30 sm:top-40 md:top-0 -translate-y-1/2 right-0 md:right-6 -mt-30 md:-mt-24">
            <img
              src="/img/community/asia-alliance-hero-img.webp"
              alt=""
              className="w-full max-w-sm sm:max-w-lg md:max-w-none"
            />
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 md:mt-52 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-9/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-3 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              The ICP Asia Alliance will create a robust and interconnected
              ecosystem, accelerating the development and implementation of
              cutting-edge Web3 and AI solutions, promoting education and
              awareness, and fostering collaboration among its diverse
              stakeholders in Asia.
            </motion.h2>
          </div>
        </AnimateSpawn>

        <div className="my-20 md:my-40 container-12 flex flex-col gap-16 md:gap-40 relative">
          <TranslatedLayout
            imageUrl="/img/community/ai-grant.webp"
            reverse={true}
          >
            <h2 className="tw-heading-4 md:tw-heading-3 md:mb-6">
              Supported by $20 million grant fund for Web3 and AI initiatives
            </h2>
            <p className="tw-lead-sm">
              The ICP Asia Alliance is set to be supported via a $20 million
              grant, which will be distributed through the DFINITY Foundation's
              Grant Programs, tailored for Web3 and AI initiatives.
            </p>

            <p className="mb-0">
              <Link
                href="https://dfinity.org/grants"
                className="link-primary link-with-icon"
              >
                <LinkArrowUpRight />
                Discover grant opportunities
              </Link>
            </p>
          </TranslatedLayout>
        </div>

        <AnimateSpawn
          className="container-10 pt-52 md:pt-[400px] relative mb-10 md:mb-20"
          el={motion.section}
          variants={transitions.container}
          id="hubs"
        >
          <div className="md:w-7/10 md:mx-auto text-center text-white relative">
            <div className="blob blob-purple blob-xl blob-x-5 blob-y-5 z-[-1] opacity-75 md:opacity-95"></div>

            <motion.h2
              className="mb-0 md:mb-6 tw-heading-4 md:tw-heading-60"
              variants={transitions.item}
            >
              ICP.Asia Alliance <br />
              Hubs & Community
            </motion.h2>

            <motion.div
              variants={transitions.fadeIn}
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-[-1] [mask-image:linear-gradient(to_bottom,black_40%,transparent_60%)]"
            >
              <Globe
                className="w-[320px] md:w-[660px] aspect-square"
                hubs={hubs}
              />
            </motion.div>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 relative"
          el={motion.section}
          variants={transitions.container}
        >
          {hubs.map((hub) => (
            <HubCard hub={hub} key={hub.name} />
          ))}
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10 pt-20 md:pt-40"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="flex flex-col gap-6 md:gap-5 mb-8 md:mb-10 md:flex-row md:w-8/10">
            <motion.h2
              className="tw-heading-4 mb-0 md:tw-heading-60 md:flex-1"
              variants={transitions.item}
            >
              Hong Kong in action
            </motion.h2>
            <motion.p
              className="mb-0 tw-paragraph md:flex-1 md:tw-lead-sm md:pt-3"
              variants={transitions.item}
            >
              The ICP Asia Alliance aims to cultivate a dynamic Web3 and AI
              ecosystem in Asia. Through 8 already well established ICP.Hubs
              located in the region, the Internet Computer will revolutionize
              the future of blockchain as we know it.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <motion.div
              variants={transitions.item}
              className="col-span-1 md:col-span-2"
            >
              <VideoCard
                image="https://img.youtube.com/vi/jOf35jNo26k/maxresdefault.jpg"
                label="ICP Asia Alliance"
                title="What’s Next?"
                link="https://www.youtube.com/watch?v=jOf35jNo26k&list=PLuhDt1vhGcrc4ocJ_WgbuYPXqCw1YYXF4"
                description="Interviews of ICP.Hubs in Hong Kong @ EDGE Summit 2023"
                className=""
              />
            </motion.div>

            <motion.div variants={transitions.item} className="flex">
              <ImageOnlyVideoCard
                href="https://www.youtube.com/watch?v=hbjeL0MDhG4&list=PLuhDt1vhGcrc4ocJ_WgbuYPXqCw1YYXF4"
                image="https://img.youtube.com/vi/hbjeL0MDhG4/maxresdefault.jpg"
                className="flex-1"
              ></ImageOnlyVideoCard>
            </motion.div>
            <motion.div variants={transitions.item} className="flex">
              <PromoCard
                title="More videos of the ICP Asia Alliance"
                href="https://www.youtube.com/playlist?list=PLuhDt1vhGcrc4ocJ_WgbuYPXqCw1YYXF4"
                className="flex-1"
              ></PromoCard>
            </motion.div>
          </div>
        </AnimateSpawn>

        <section className="bg-infinite text-white mt-20 md:mt-40 py-20 md:py-40">
          <Gallery gallery={communityGallery}>
            <div className="blob blob-white blob-md blob-x-10 blob-y-0"></div>
            <div className="md:w-7/10">
              <motion.h2
                className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
                variants={transitions.item}
              >
                Join, collaborate and connect
              </motion.h2>
              <motion.p
                className="tw-paragraph md:tw-lead mb-6"
                variants={transitions.item}
              >
                The ICP community is currently active in around 30 countries and
                collaborates with up to 50 well-known crypto organizations and
                32 universities. Haven't joined yet? What are you waiting for?
              </motion.p>
              <motion.p
                className="mb-0 flex gap-8 flex-col items-start md:flex-row md:items-center"
                variants={transitions.item}
              >
                <Link className="button-white" href="/community">
                  Explore ICP Community
                </Link>
                <Link className="link-white" href="https://t.me/Official_ICP">
                  <TelegramLogo className="inline-block align-text-bottom mr-2" />
                  Join the official ICP Telegram Space
                </Link>
              </motion.p>
            </div>
          </Gallery>
        </section>
      </main>
    </Layout>
  );
}

export default AsiaAlliancePage;
