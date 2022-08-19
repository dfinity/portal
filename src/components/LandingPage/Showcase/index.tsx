import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { useAnimation, motion, useCycle, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ColorThief from "colorthief";
import transitions from "@site/static/transitions.json";
import dapps from "@site/static/showcase.json";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import { hslToRgb, rgbToHsl } from "@site/src/utils/colors";
import { colorRegistry } from "@site/src/components/ShowcasePage/ShowcaseProject";

const backgroundDisplay = {
  show: { display: "block", transition: { duration: 0.5 } },
  hidden: { display: "none", transition: { delay: 0.65 } },
};
const backgroundOpacity = {
  show: { opacity: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, transition: { duration: 0.65 } },
};
const textCycling = {
  enter: { y: 30, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -30, opacity: 0 },
};

const colorThief = new ColorThief();
function getDominantColorOnLoad(img): [number, number, number] | false {
  try {
    let rgb = colorThief.getPalette(
      img,
      2,
      Math.min(10, Math.ceil(img.width / 10))
    )[0] as [number, number, number];
    let hsl = rgbToHsl(...rgb);
    if (hsl[2] < 0.5) {
      // dark dominant color
      hsl[2] = 0.8;
      hsl[1] = Math.max(hsl[1], 0.7);
      rgb = hslToRgb(...hsl);
    } else {
      // light dominant color
      hsl[2] = Math.max(hsl[1], 0.8);
      hsl[1] = 0.5;
      rgb = hslToRgb(...hsl);
    }
    return rgb;
  } catch (e) {
    console.error(e);
    return false;
  }
}

function Dapp({ dappInfo }) {
  function cleanWebsiteURL(url) {
    let tempURL = url.endsWith("/") ? url.slice(0, -1) : url;
    return tempURL.replace(/^https?:\/\//, "");
  }

  const [backgroundColor, setBackgroundColor] = useState(
    colorRegistry[dappInfo.logo]
  );

  return (
    <a
      target={"_blank"}
      href={dappInfo.website}
      className={styles.dappContainer}
    >
      <div className={styles.dappHeader}>
        <div className={styles.dappIcon}>
          <img
            onLoad={(e) => {
              if (!(dappInfo.logo in colorRegistry)) {
                const rgb = getDominantColorOnLoad(e.target);

                if (rgb === false) {
                  colorRegistry[dappInfo.logo] = colorRegistry.default;
                  setBackgroundColor(colorRegistry.default);
                } else {
                  const color = `rgb(${rgb.join(",")})`;
                  colorRegistry[dappInfo.logo] = color;
                  setBackgroundColor(color);
                }
              } else {
                setBackgroundColor(colorRegistry[dappInfo.logo]);
              }
            }}
            crossOrigin={"anonymous"}
            style={{ maxHeight: "49px", maxWidth: "70px" }}
            src={dappInfo.logo + "?w=340&q=50&fm=png"}
            alt=""
          />
        </div>
        <div className={styles.dappInformation}>
          <div className={styles.dappName}>{dappInfo.name}</div>
          <div className={styles.dappStats}>{dappInfo.stats}</div>
          <p className={styles.dappWebsite}>
            {cleanWebsiteURL(dappInfo.website)}
          </p>
        </div>
      </div>
      <div className={styles.dappMedia} style={{ background: backgroundColor }}>
        {dappInfo.video ? (
          <video
            className={styles.dappVideo}
            src={dappInfo.video}
            playsInline
            autoPlay
            muted
            loop
          ></video>
        ) : (
          <img
            className={styles.dappScreenshot}
            src={dappInfo.screenshots[0] + "?w=340&q=50&fm=png"}
            alt=""
          />
        )}
      </div>
      <div className={styles.dappBody}>{dappInfo.description}</div>
    </a>
  );
}

function Showcase() {
  const firstDapps = dapps.slice(0, 14);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.35 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  useEffect(() => {
    setInterval(() => {
      cycleTitle();
    }, 2500);
  }, []);
  const [title, cycleTitle] = useCycle("DeFi", "NFT", "Gaming");
  return (
    <div className={styles.container}>
      <motion.div
        animate={controls}
        initial="hidden"
        variants={backgroundDisplay}
      >
        <motion.div
          animate={controls}
          initial="hidden"
          variants={backgroundOpacity}
        >
          <svg
            className={styles.BGShape}
            viewBox="0 0 100 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="200" fill="#3b00b9" />
          </svg>
        </motion.div>
      </motion.div>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
      >
        <div className={styles.showcaseContainer}>
          <a className={styles.anchor} id="showcase" />
          <div className={styles.header}>
            <motion.div variants={transitions.item} className={styles.title}>
              <span>Dapps for</span>
              <div>
                <AnimatePresence>
                  <motion.span
                    className={styles.textCycling}
                    variants={textCycling}
                    key={title}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        duration: 0.2,
                      },
                      opacity: { duration: 0.1 },
                    }}
                  >
                    {title}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className={styles.headerBody}
            >
              <p className={styles.body}>
              1000s of web3 services and dapps are already running on the Internet Computer. 
              Most run 100% from the blockchain without need for centralized cloud services and server computers. 
              Explore the ecosystem to get inspired.
              </p>
              <Link className={styles.callToAction} to={"/showcase"}>
                <RightPointer />
                <p> Explore the Internet Computer ecosystem</p>
              </Link>
            </motion.div>
          </div>
          <motion.div
            variants={transitions.item}
            className={styles.cardContainer}
          >
            {firstDapps.map((dapp) => (
              <div key={dapp.name} className={styles.cardWrapper}>
                <Dapp dappInfo={dapp} />
              </div>
            ))}
          </motion.div>
          <div className={styles.actionButtonContainer}>
            <Link className={styles.actionButton} to="/samples">
              BUILD YOUR OWN
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Showcase;
