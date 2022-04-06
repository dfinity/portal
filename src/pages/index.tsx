import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import Dashboard from "@site/src/components/Dashboard";
import backgroundGif from '@site/static/img/background.gif';
import {AnimatePresence, motion} from "framer-motion"

const variants = {
    enter: direction => {
        return {
            y: -300,
            opacity: 1
        };
    },
    center: {
        y: 0,
        opacity: 1
    },
    exit: direction => {
        return {
            y: 150,
            opacity: 0
        };
    }
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
        }, 4 * 1000);
    }, [index, setIndex]);
    return <div className={styles.heroPage}>
        <div className={styles.heroPageTitle}>hello,
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
                        y: {type: "spring", stiffness: 600, damping: 200},
                        opacity: {duration: 0.5}
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
    </div>;
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3B00B9");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            // TODO: change the desc
            description="Description will go into a meta tag in <head />">
            <main>
                <div className={styles.heroSection}>
                    <img src={backgroundGif} alt=""/>
                    <HomePageHero/>
                    <Dashboard/>
                </div>
            </main>
        </Layout>
    );
}
