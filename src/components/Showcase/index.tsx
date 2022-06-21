import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { useAnimation, motion, useCycle, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ColorThief from "colorthief";
import transitions from "@site/static/transitions.json";
import dapps from "@site/static/showcase.json";

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

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    let hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function getDominantColorOnLoad(img) {
  const colorThief = new ColorThief();
  try {
    let rgb = colorThief.getPalette(
      img,
      2,
      Math.min(10, Math.ceil(img.width / 10))
    )[0];
    // @ts-ignore
    let hsl = rgbToHsl(...rgb);
    if (hsl[2] < 0.5) {
      // dark dominant color
      hsl[2] = 0.8;
      hsl[1] = Math.max(hsl[1], 0.7);
      // @ts-ignore
      rgb = hslToRgb(...hsl);
    } else {
      // light dominant color
      hsl[2] = Math.max(hsl[1], 0.8);
      hsl[1] = 0.5;
      // @ts-ignore
      rgb = hslToRgb(...hsl);
    }
    return rgb;
  } catch (e) {
    console.error(e);
  }
}

const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

function Dapp({ dappInfo }) {
  function cleanWebsiteURL(url) {
    let tempURL = url.endsWith("/") ? url.slice(0, -1) : url;
    return tempURL.replace(/^https?:\/\//, "");
  }

  const [backgroundColor, setBackgroundColor] = useState("#BCAAEB");

  function handleImageLoaded({ target }) {
    let [r, g, b] = getDominantColorOnLoad(target);
    setBackgroundColor(rgbToHex(r, g, b));
  }

  return (
    <a
      target={"_blank"}
      href={dappInfo.website}
      className={styles.dappContainer}
    >
      <div className={styles.dappHeader}>
        <div className={styles.dappIcon}>
          <img
            /*onLoad={handleImageLoaded}*/
            crossOrigin={"anonymous"}
            style={{ maxHeight: "49px", maxWidth: "70px" }}
            src={dappInfo.logo + "?w=340&q=50&fm=png"}
            alt=""
          />
        </div>
        <div className={styles.dappInformation}>
          <div className={styles.dappName}>{dappInfo.name}</div>
          <div className={styles.dappStats}>{dappInfo.stats}</div>
          <a
            className={styles.dappWebsite}
            target={"_blank"}
            href={dappInfo.website}
          >
            {cleanWebsiteURL(dappInfo.website)}
          </a>
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
          <a id="showcase" />
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
                The Internet Computer ecosystem continues to skyrocket with new
                developer and entrepreneurial activity. Get inspired by the
                existing dapps.
              </p>
              <Link
                className={styles.callToAction}
                to={"https://dfinity.org/showcase/"}
              >
                Explore the Internet Computer ecosystem
              </Link>
            </motion.div>
          </div>
          <motion.div
            variants={transitions.item}
            className={styles.cardContainer}
          >
            {firstDapps.map((dapp) => (
              <div className={styles.cardWrapper}>
                <Dapp key={dapp.name} dappInfo={dapp} />
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
