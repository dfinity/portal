import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import QuickInformation from "@site/src/components/QuickInformation";
import backgroundGif from '@site/static/img/background.gif';
import BuildingIcon from '@site/static/img/buildingIcon.svg';
import DatabaseIcon from '@site/static/img/databaseIcon.svg';
import DfinityIcon from '@site/static/img/dfinityIcon.svg';
import GamingIcon from '@site/static/img/gamingIcon.svg';
import GrowthIcon from '@site/static/img/growthIcon.svg';
import KeyIcon from '@site/static/img/keyIcon.svg';
import NftIcon from '@site/static/img/nftIcon.svg';
import PlayIcon from '@site/static/img/playIcon.svg';
import WorldwideIcon from '@site/static/img/worldwideIcon.svg';
import {AnimatePresence, motion} from "framer-motion"
import Features from "@site/src/components/Features";

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

function HomePageHero() {
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
    return <div className={styles.heroPage}>
        <div className={styles.heroContainer}>
            <div className={styles.heroPageTitle}>
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
                <span className={styles.heroPageTitleSecond}>world!</span>
            </div>
            <div className={styles.heroPageText}>
                <p>Welcome to the Internet Computer! The only blockchain where <br/> dapps can be 100% on
                    chain
                    — real web3.</p>
            </div>
            <Link className={styles.heroPageButton} to="/docs/current/developer-docs/quickstart">
                START BUILDING
            </Link>
        </div>
    </div>;
}

function HomeNavBar() {
    return <div className={styles.homeNavBar}>
        <div className={styles.homeNavBarGrid}>
            <div className={styles.dfinityIconNav}><a href="/" className={styles.navbarDfinityLink}/></div>
            <Link to={"/"}><span>Start Coding</span></Link>
            <Link to={"/"}><span>Internet Computer</span></Link>
            <Link to={"/"}><span>Features</span></Link>
            <Link to={"/"}><span>Showcase</span></Link>
            <Link to={"/"}><span>Ecosystem</span></Link>
            <Link to={"/"}><span>Dev Forum</span></Link>
        </div>
    </div>
}

function WhatsIC() {
    return <div className={styles.whatsIC}>
        <DfinityIcon className={styles.dfinityIcon}/>
        <GamingIcon className={styles.gamingIcon}/>
        <WorldwideIcon className={styles.worldwideIcon}/>
        <DatabaseIcon className={styles.databaseIcon}/>
        <GrowthIcon className={styles.growthIcon}/>
        <p className={styles.whatsICTitle}>What's the <br/> Internet Computer</p>
        <p className={styles.whatsICBody}>Imagine building scalable Dapps, DeFi, websites, enterprise systems and
            open
            internet services that are 100%
            on chain and can be tokenized by a simply click. Guess what…it’s all possible on the Internet Computer.
        </p>
        <p className={styles.whatsICBody}>The Internet Computer is blockchain reimagined, a world computer built by
            a
            team of more than 200
            world-renowned scientists and engineers. Powered by groundbreaking chain key cryptography, the Internet
            Computer is the world's fastest, most scalable blockchain. It unleashes the full capacity of smart
            contracts
            enabling infinite data and computation capacity hosted entirely on chain. Developers, the world is at
            your
            fingertips!</p>
        <div className={styles.whatsICButtonContainer}>
            <Link className={styles.whatsICButton} to="https://dfinity.org/howitworks/">
                GO EXPLORE
            </Link>
        </div>
        <svg className={styles.whatsICBGCircle} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle fill="white" cx="50" cy="50" r="50"/>
        </svg>
        <BuildingIcon className={styles.buildingIcon}/>
        <PlayIcon className={styles.playIcon}/>
        <DfinityIcon className={styles.dfinityIcon2}/>
        <NftIcon className={styles.nftIcon}/>
        <KeyIcon className={styles.keyIcon}/>
    </div>
}

export default function Home(): JSX.Element {
    const [displayHomeNav, SetDisplayHomeNav] = useState(false);
    const [displayWhatsIC, SetDisplayWhatsIC] = useState(false);
    const heightToHideFrom = 100;
    const {siteConfig} = useDocusaurusContext();
    const heroSection = useRef(null);
    const shouldDisplayHomeNav = () => {
        const winScroll = window.scrollY;
        if (winScroll > heightToHideFrom) {
            SetDisplayHomeNav(true);
        } else if (winScroll < heightToHideFrom) {
            SetDisplayHomeNav(false);
        }
    };
    const shouldDisplayWhatsIC = () => {
        const heroSectionHeight = heroSection.current?.clientHeight;
        const screenHeight = screen.height;
        const totalHeight = window.scrollY + screenHeight;
        if (totalHeight > heroSectionHeight + (screenHeight / 2) && totalHeight < heroSectionHeight + screenHeight + (screenHeight / 2)) {
            SetDisplayWhatsIC(true);
        } else {
            SetDisplayWhatsIC(false);
        }
    };
    const evaluateDisplay = () => {
        shouldDisplayHomeNav();
        shouldDisplayWhatsIC();
    }
    useEffect(() => {
        evaluateDisplay();
        window.addEventListener("scroll", evaluateDisplay);
        return () =>
            window.removeEventListener("scroll", evaluateDisplay);
    }, [])
    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3B00B9");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            // TODO: change the desc
            description="Description will go into a meta tag in <head />">
            <main>
                <AnimatePresence>
                    {displayHomeNav &&
                        <motion.div
                            key="modal"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            <HomeNavBar/>
                        </motion.div>}
                </AnimatePresence>
                <div ref={heroSection} className={styles.heroSection}>
                    <img className={styles.heroSectionBG} src={backgroundGif} alt=""/>
                    <HomePageHero/>
                    <QuickInformation/>
                </div>
                <div className={styles.whatsICContainer}>
                    <AnimatePresence>
                        {displayWhatsIC &&
                            <motion.div
                                key="modal"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.5}}
                            >
                                <WhatsIC/>
                                <div className={styles.whatsICBGColor}/>
                            </motion.div>}
                    </AnimatePresence>
                </div>
                <Features/>
            </main>
        </Layout>
    );
}
