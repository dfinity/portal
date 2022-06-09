import React, {useEffect} from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import {AnimatePresence, motion, useAnimation, useCycle} from "framer-motion";
import {useInView} from "react-intersection-observer";

const container = {
    hidden: {opacity: 0, transition: {duration: 1}},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
}
const item = {
    hidden: {opacity: 0, y: 30},
    show: {opacity: 1, y: 0, transition: {duration: 0.5}}
}
const textCycling = {
    enter: {y: 30, opacity: 0,},
    center: {y: 0, opacity: 1,},
    exit: {y: -30, opacity: 0,},
};

function Index() {
    const controls = useAnimation();
    const {ref, inView} = useInView({threshold: 0.2});
    useEffect(() => {
        if (inView) {
            controls.start("show");
        }
    }, [controls, inView]);
    useEffect(() => {
        setInterval(() => {
            cycleTitle();
        }, 2500);
    }, []);
    const [title, cycleTitle] = useCycle("build", "explore", "invest", "decentralize", "tokenize", "scale", "transact");
    return (
        <div className={styles.section}>
            <a id="home"/>
            <motion.div ref={ref} animate={controls} initial="hidden"
                        variants={container} className={styles.container}>
                <motion.div variants={item} className={styles.Title}>
                    <p style={{
                        marginRight: "25px",
                        marginBottom: "0.25em"
                    }}>The future of Web3</p>
                    {/* <div>
                        <AnimatePresence>
                            <motion.p
                                className={styles.wordCycle}
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
                                        duration: 0.2
                                    },
                                    opacity: {duration: 0.1},
                                }}
                            >
                                {title}
                            </motion.p>
                        </AnimatePresence>
                        <p className={styles.wordFiller}>decentralize</p>
                    </div> */}
                </motion.div>
                {/*<motion.p variants={item} className={styles.Title}>
                    Blockchain's future
                </motion.p>*/}
                <motion.p variants={item} className={styles.Text}>
                Web speed. Serves web. 100,000X more efficient... simply better tech
                </motion.p>
                <motion.div variants={item} className={styles.actionContainer}>
                    <Link
                        className={styles.actionButton}
                        to="/docs/current/developer-docs/quickstart/hello10mins"
                    >
                        BUILD REAL WEB3
                    </Link>
                    <Link
                        className={styles.callToAction}
                        to={"https://dfinity.org/showcase/"}
                    >
                        Explore the Internet Computer
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Index;
