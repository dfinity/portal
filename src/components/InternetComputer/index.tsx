import React, {useEffect, useState} from 'react';
import styles from './index.module.css';
import DfinityIcon from "@site/static/img/dfinityIcon.svg";
import GamingIcon from "@site/static/img/gamingIcon.svg";
import WorldwideIcon from "@site/static/img/worldwideIcon.svg";
import DatabaseIcon from "@site/static/img/databaseIcon.svg";
import GrowthIcon from "@site/static/img/growthIcon.svg";
import Link from "@docusaurus/Link";
import BuildingIcon from "@site/static/img/buildingIcon.svg";
import PlayIcon from "@site/static/img/playIcon.svg";
import NftIcon from "@site/static/img/nftIcon.svg";
import KeyIcon from "@site/static/img/keyIcon.svg";
import {AnimatePresence, motion} from "framer-motion";

function Index({heroSectionRef}) {
    const [display, SetDisplay] = useState(false);
    const shouldDisplay = () => {
        const heroSectionHeight = heroSectionRef.current?.clientHeight;
        const screenHeight = screen.height;
        const totalHeight = window.scrollY + screenHeight;
        if (totalHeight > heroSectionHeight + (screenHeight / 2) && totalHeight < heroSectionHeight + screenHeight + (screenHeight / 2)) {
            SetDisplay(true);
        } else {
            SetDisplay(false);
        }
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Client-side-only code
            shouldDisplay();
            window.addEventListener("scroll", shouldDisplay);
            return () =>
                window.removeEventListener("scroll", shouldDisplay);
        }
    }, [])
    return (
        <div className={styles.Container}>
            <AnimatePresence>
                {display &&
                    <motion.div
                        key="modal"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
                    >
                        <div className={styles.main}>
                            <DfinityIcon className={styles.dfinityIcon}/>
                            <GamingIcon className={styles.gamingIcon}/>
                            <WorldwideIcon className={styles.worldwideIcon}/>
                            <DatabaseIcon className={styles.databaseIcon}/>
                            <GrowthIcon className={styles.growthIcon}/>
                            <p className={styles.Title}>What's the <br/> Internet Computer</p>
                            <p className={styles.Body}>Imagine building scalable Dapps, DeFi, websites,
                                enterprise systems and
                                open
                                internet services that are 100%
                                on chain and can be tokenized by a simply click. Guess what…it’s all possible on the
                                Internet Computer.
                            </p>
                            <p className={styles.Body}>The Internet Computer is blockchain reimagined, a world
                                computer built by
                                a
                                team of more than 200
                                world-renowned scientists and engineers. Powered by groundbreaking chain key
                                cryptography, the Internet
                                Computer is the world's fastest, most scalable blockchain. It unleashes the full
                                capacity of smart
                                contracts
                                enabling infinite data and computation capacity hosted entirely on chain. Developers,
                                the world is at
                                your
                                fingertips!</p>
                            <div className={styles.ButtonContainer}>
                                <Link className={styles.Button} to="https://dfinity.org/howitworks/">
                                    GO EXPLORE
                                </Link>
                            </div>
                            <svg className={styles.BGCircle} viewBox="0 0 100 100"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle fill="white" cx="50" cy="50" r="50"/>
                            </svg>
                            <BuildingIcon className={styles.buildingIcon}/>
                            <PlayIcon className={styles.playIcon}/>
                            <DfinityIcon className={styles.dfinityIcon2}/>
                            <NftIcon className={styles.nftIcon}/>
                            <KeyIcon className={styles.keyIcon}/>
                        </div>
                        <div className={styles.BGColor}/>
                    </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default Index;
