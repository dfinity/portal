import React, {useEffect, useState} from 'react';
import styles from './index.module.css';
import ParticleBackground from "@site/src/components/ParticleBackground";
import QuickInformation from "@site/src/components/QuickInformation";
import {AnimatePresence, motion} from "framer-motion";
import Link from "@docusaurus/Link";
import BrowserOnly from '@docusaurus/BrowserOnly';

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
            <div className={styles.backgroundColor}/>
            <BrowserOnly>
                {() =>
                    <div className={styles.particleBackground}>
                        <ParticleBackground width={screen.width} height={screen.width} particleCount={150}
                                            frameRate={30} centerX={screen.width *0.8}
                                            centerY={screen.height * 0.4} particleRadius={8}
                                            duration={12500}/>
                    </div>
                }
            </BrowserOnly>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.Title}>
                        <span>hello,</span>
                        <AnimatePresence>
                            <motion.span
                                className={styles.InfiniteWord}
                                style={{position: "absolute"}}
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
                            </motion.span>
                        </AnimatePresence>
                        <span className={styles.InfiniteWordFiller}>infinite</span>
                        <span>world!</span>
                    </div>
                    <div className={styles.Text}>
                        <p>Welcome to the Internet Computer! The only blockchain where <br/> dapps can be 100% on
                            chain
                            — real web3.</p>
                    </div>
                    <Link className={styles.Button} to="/docs/current/developer-docs/quickstart/hello10mins">
                        START BUILDING
                    </Link>
                </div>
            </div>
            <a id="startCoding"/>
            <QuickInformation/>
        </div>
    );
}

export default Index;
