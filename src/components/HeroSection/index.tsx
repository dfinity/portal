import React, {useEffect, useState} from 'react';
import styles from './index.module.css';
import {AnimatePresence, motion} from "framer-motion";
import Link from "@docusaurus/Link";

const variants = {
    enter: {
        y: 30,
        opacity: 0,
    },
    center: {
        y: 0,
        opacity: 1,
    },
    exit: {
        y: -30,
        opacity: 0,
    },
};
const texts = ["infinite", "لانهائي", "無限的"];

function Index({heroSectionRef}) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            let next = index + 1;
            if (next === texts.length) {
                next = 0;
            }
            setIndex(next);
        }, 2500);
    }, [index, setIndex]);
    return (
        <div ref={heroSectionRef} className={styles.section}>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.Title}>
                        <p>hello,</p>
                        <AnimatePresence>
                            <motion.p
                                className={styles.InfiniteWord}
                                variants={variants}
                                key={index}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    y: {type: "spring", stiffness: 100, damping: 20, duration: 0.2},
                                    opacity: {duration: 0.1},
                                }}
                            >
                                {texts[index]}
                            </motion.p>
                        </AnimatePresence>
                        <p className={styles.InfiniteWordFiller}>infinite</p>
                        <p>world!</p>
                    </div>
                    <div className={styles.Text}>
                        <p>Build smart contracts and dapps 100% on chain on the world’s fastest and most powerful open
                            source blockchain network. </p>
                    </div>
                    <Link className={styles.Button} to="/docs/current/developer-docs/quickstart/hello10mins">
                        START BUILDING
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Index;
