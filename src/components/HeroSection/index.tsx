import React, {useEffect} from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import {motion, useAnimation} from "framer-motion";
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

function Index() {
    const controls = useAnimation();
    const {ref, inView} = useInView({threshold: 0.2});
    useEffect(() => {
        if (inView) {
            controls.start("show");
        }
    }, [controls, inView]);
    return (
        <div className={styles.section}>
            <a id="home"/>
            <motion.div ref={ref} animate={controls} initial="hidden"
                        variants={container} className={styles.container}>
                <motion.p variants={item} className={styles.Title}>
                    Blockchain's future
                </motion.p>
                <motion.p variants={item} className={styles.Text}>
                    Internet Computer is 100,000x more efficient and serves web
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
