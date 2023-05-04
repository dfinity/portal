import React, { useEffect } from "react";
import styles from "@site/src/components/DevelopersHome/SampleCode/index.module.css";
import Link from "@docusaurus/Link";
import Card from "@site/src/components/SamplesPage/Card";
import { motion, useAnimation } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import motokoBG from "@site/static/img/motoko.webp";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import { sampleItems } from "@site/src/components/Common/sampleItems";

function Index() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <div className={styles.section}>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.container}
      >
        <motion.div variants={transitions.item} className={styles.header}>
          <p>Sample code</p>
          <Link className={styles.callToAction} to={"/samples"}>
            Explore all sample code
          </Link>
        </motion.div>
        <motion.div
          className={styles.scrollContainer}
          variants={transitions.item}
        >
          <div className={styles.samplesContainer}>
            {sampleItems.map((sample) => (
              <div className={styles.cardWrapper} key={sample.title}>
                <Card
                  image={sample.image}
                  title={sample.title}
                  domain={sample.domains[0]}
                  body={sample.body}
                  links={sample.links}
                />
              </div>
            ))}
          </div>
        </motion.div>
        <div className={styles.cards}>
          <motion.a
            variants={transitions.item}
            href={"/docs/current/developer-docs/quickstart/local-quickstart"}
            className={clsx(styles.card, styles.cardHover)}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>SDK Installation</p>
              <p className={styles.informationBody}>
                Download and install the latest version of the IC SDK: an SDK for canister
                smart contracts.
              </p>
            </div>
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
          <motion.a
            variants={transitions.item}
            href={"https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/"}
            className={clsx(styles.card, styles.cardHover)}
          >
            <div className={styles.bodyContainer}>
              <p className={styles.informationTitle}>Motoko Playground</p>
              <p className={styles.informationBody}>
                Explore Motoko, the native language of the Internet Computer,
                right in the browser without having to download the SDK
              </p>
            </div>
            <img className={styles.motokoBackground} src={motokoBG} alt="" />
            <RightArrowSVG className={styles.informationIcon} />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

export default Index;
