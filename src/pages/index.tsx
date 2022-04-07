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

function HomeNavBar() {
    const [isVisible, setIsVisible] = useState(false);
    const listenToScroll = () => {

        let heightToHideFrom = 100;
        const winScroll = window.scrollY;
        if (winScroll > heightToHideFrom) {
            setIsVisible(true);
        } else if (winScroll < heightToHideFrom) {
            setIsVisible(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])


    return isVisible
        &&
        <div id="hide" className={styles.homeNavBar}>
            <div className={styles.homeNavBarGrid}>
                <svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21.0617 0.269043C19.5276 0.269043 17.8541 1.0863 16.0877 2.69744C15.251 3.45633 14.5189 4.27358 13.9843 4.92738C13.9843 4.92738 14.8443 5.89639 15.7856 6.93549C16.2969 6.30502 17.0291 5.45274 17.8773 4.68221C19.4462 3.24618 20.4688 2.95431 21.0617 2.95431C23.2696 2.95431 25.0593 4.76391 25.0593 7.00556C25.0593 9.22381 23.2696 11.0334 21.0617 11.0568C20.9569 11.0568 20.8291 11.0451 20.6781 11.0101C21.3172 11.3019 22.0145 11.5121 22.6653 11.5121C26.7094 11.5121 27.4995 8.78015 27.546 8.58165C27.6622 8.07966 27.7321 7.55427 27.7321 7.0172C27.7205 3.29286 24.7339 0.269043 21.0617 0.269043Z"
                        fill="white" fill-opacity="0.8"/>
                    <path
                        d="M6.93835 13.731C8.47236 13.731 10.1457 12.9137 11.9122 11.3026C12.7489 10.5436 13.481 9.72646 14.0156 9.07256C14.0156 9.07256 13.1557 8.10357 12.2144 7.06453C11.7029 7.69495 10.9708 8.54723 10.1225 9.3178C8.55366 10.7421 7.51939 11.0457 6.93835 11.0457C4.73033 11.0457 2.94067 9.23605 2.94067 6.99446C2.94067 4.7762 4.73033 2.9666 6.93835 2.94324C7.04291 2.94324 7.17073 2.9549 7.32184 2.98993C6.68269 2.69806 5.98541 2.48792 5.33464 2.48792C1.29047 2.48792 0.500228 5.21988 0.453759 5.41834C0.337555 5.92037 0.267822 6.44575 0.267822 6.9828C0.267822 10.7071 3.25445 13.731 6.93835 13.731Z"
                        fill="white" fill-opacity="0.8"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10.0132 4.74058C9.57169 4.32027 7.41013 2.60405 5.34154 2.54566C1.65521 2.45507 0.571579 5.07811 0.478149 5.41641C1.18425 2.47502 3.81627 0.280685 6.94526 0.269043C9.49615 0.269043 12.0738 2.7171 13.9784 4.92645C13.9816 4.92274 13.9845 4.91912 13.9875 4.91565C13.9875 4.91565 14.8473 5.88467 15.7887 6.92375C15.7887 6.92375 16.8578 8.16133 17.9967 9.24707C18.4383 9.66739 20.5881 11.3603 22.6567 11.4187C26.4454 11.5238 27.4912 8.75674 27.5492 8.54658C26.8522 11.5004 24.2141 13.7069 21.0762 13.7186C18.5247 13.7186 15.9459 11.2689 14.0334 9.05897C14.0296 9.06346 14.026 9.06787 14.0226 9.07206C14.0226 9.07206 13.1626 8.10299 12.2212 7.06392C12.2212 7.06392 11.1521 5.82634 10.0132 4.74058Z"
                          fill="white"/>
                </svg>
                <Link to={"/"}><span>Metrics</span></Link>
                <Link to={"/"}><span>Internet Computer</span></Link>
                <Link to={"/"}><span>Features</span></Link>
                <Link to={"/"}><span>Showcase</span></Link>
                <Link to={"/"}><span>Ecosystem</span></Link>
                <Link to={"/"}><span>Join IC Forum</span></Link>
            </div>
        </div>
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
                    <HomeNavBar/>
                </div>
            </main>
        </Layout>
    );
}
