import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import ShareMeta from "../components/Common/ShareMeta";
import { Stat, StatsPanel } from "../components/Common/Stats";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const Globe: React.FC<{
  className?: string;
}> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    let phi = 0;

    console.log(canvasRef.current.clientWidth, canvasRef.current.height);
    canvasRef.current.width =
      canvasRef.current.clientWidth * window.devicePixelRatio;
    canvasRef.current.height =
      canvasRef.current.clientHeight * window.devicePixelRatio;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: window.devicePixelRatio,
      width: canvasRef.current.width,
      height: canvasRef.current.height,
      phi: 0,
      theta: 0.42,
      dark: 1,
      diffuse: 1.75,
      mapSamples: 43000,
      mapBrightness: 7.3,
      baseColor: [0.23, 0.0, 0.72], // #3b00b9 with each byte represented as 0..1
      markerColor: [1, 1, 1],
      // glowColor: [0.23, 0.0, 0.72],
      glowColor: [0.8, 0.8, 0.8],
      opacity: 0.41,
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.03 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.0025;
        state.width = canvasRef.current.clientWidth * window.devicePixelRatio;
        state.height = canvasRef.current.clientHeight * window.devicePixelRatio;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return <canvas className={className} ref={canvasRef}></canvas>;
};

function CommunityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Community"
      description={`Build next generation enterprise systems on autonomous cloud, powered by chain-key cryptography and secure multiparty computation.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-enterprise.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className=" bg-infinite text-white pt-20 relative"
          ref={heroRef}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="blob blob-purple blob-xl md:blob-xl blob-x-5 blob-y-5 md:blob-x-6 md:blob-y-10 opacity-50"></div>
          </div>
          <AnimateSpawn
            className="container-12 pt-20 md:pt-36 relative md:flex md:-mb-40"
            variants={transitions.container}
          >
            <div className="md:flex-1"></div>
            <div className="sm:w-6/10 md:w-auto md:flex-[5] relative pb-[55%] sm:pb-[20%] md:pb-20">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Global
                <br />
                Community
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                The Internet Computer adds autonomous serverless cloud
                functionality to the public internet – making it possible to
                build almost any system or service entirely on a decentralized
                network using.
              </motion.p>
            </div>
            <Globe className="min-w-[380px] sm:min-w-0 w-[80vw] md:h-full md:flex-[6] aspect-square -mt-8 sm:mt-0 absolute -right-3/10 md:right-auto bottom-0 md:bottom-auto translate-y-1/2 md:static md:-mt-60 md:translate-y-40" />
          </AnimateSpawn>
        </section>
        <div className="bg-page">
          <div className="container-10 -translate-y-[110px] -mb-7 md:translate-y-10">
            <StatsPanel>
              <Stat title="Community members" value="200" fallbackValue="" />
              <Stat title="ICP Hubs" value="8" fallbackValue="" />
              <Stat title="Community events" value="70" fallbackValue="" />
              <Stat title="Contients" value="5" fallbackValue="" />
            </StatsPanel>
          </div>
        </div>

        <AnimateSpawn
          className="container-10 md:mt-48 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-8/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-60 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              We are building a global community, and we would like you to join.
            </motion.h2>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 flex flex-col md:flex-row gap-5"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-education.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Education</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Explore transformative education programs within our global hubs,
              empowering individuals to gain knowledge, skills, and perspectives
              that transcend borders and ignite positive change.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Education programme
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-hubs.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">ICP hubs</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Our hubs serve as pulsating hubs of diverse cultures and ideas,
              fostering a rich tapestry of connections that fuel innovation and
              drive collective growth
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Join a Hub
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-events.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Community events</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Immerse yourself in a tapestry of engaging community events, where
              our global family comes together to celebrate, learn, and forge
              lifelong connections.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Come to an event
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 mt-20 md:mt-48 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-8/10 md:mx-auto text-center">
            <motion.h2
              className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
              variants={transitions.item}
            >
              Build the community
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead mb-0"
              variants={transitions.item}
            >
              Understand the benefits and limitations of each custody option so
              you can choose the wallet that best suits your needs.
            </motion.p>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 flex flex-col md:flex-row gap-5 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-launch.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Launch an ICP hub</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Embark on a journey of leadership and impact by launching your own
              hub, a gateway to catalyzing local talent and global
              collaboration.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Build a hub
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-grants.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Apply for a grant</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Turn your vision into reality – apply for our empowering grants to
              fuel your initiatives and amplify their positive influence within
              our global community.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon">
                Apply Here
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-ambassador.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">
              Become an ambassador
            </h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Join us as an ambassador, championing the spirit of our global
              community and fostering meaningful connections across borders.
            </p>
            <p className="mb-0">
              <Link className="link-primary-disabled link-with-icon">
                Coming soon
                {/* <LinkArrowUpRight /> */}
              </Link>
            </p>
          </motion.div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10 mt-52 md:mt-[400px] relative mb-20"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-7/10 md:mx-auto text-center text-white relative">
            <div className="blob blob-purple blob-xl blob-x-5 blob-y-5 z-[-1] opacity-75 md:opacity-95"></div>

            <motion.h2
              className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
              variants={transitions.item}
            >
              Find your community hub
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead-sm mb-0 md:w-8/10 md:mx-auto"
              variants={transitions.item}
            >
              We are building communities in these areas all around the globe
              and it would be nice to have a two line sentence here
            </motion.p>

            <motion.div
              variants={transitions.fadeIn}
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-[-1] [mask-image:linear-gradient(to_bottom,black_40%,transparent_60%)]"
            >
              <Globe className="w-[320px] md:w-[660px] aspect-square" />
            </motion.div>
          </div>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default CommunityPage;
