import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import ShareMeta from "../components/Common/ShareMeta";
import { Stat, StatsPanel } from "../components/Common/Stats";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

function CommunityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
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
            <canvas
              className="min-w-[380px] sm:min-w-0 w-[80vw] md:h-full md:flex-[6] aspect-square -mt-8 sm:mt-0 absolute -right-3/10 md:right-auto bottom-0 md:bottom-auto translate-y-1/2 md:static md:-mt-60 md:translate-y-40"
              ref={canvasRef}
            ></canvas>
          </AnimateSpawn>
        </section>
        <div className="bg-page">
          <div className="container-10 -translate-y-[110px] md:translate-y-10">
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
      </main>
    </Layout>
  );
}

export default CommunityPage;
