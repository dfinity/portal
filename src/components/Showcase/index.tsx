import React, {useEffect, useState} from 'react';
import styles from './index.module.css';
import Link from "@docusaurus/Link";
import {useAnimation, motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useWindowSize} from "@docusaurus/theme-common";


const variants = {
    visible: {opacity: 1, transition: {duration: 1}, zIndex: 1000},
    hidden: {opacity: 0, zIndex: -10000}
};

function Card({title, body, link}) {
    return (
        <a href={link} className={styles.card}>
            <div className={styles.cardContainer}>
                <p className={styles.cardTitle}>{title}</p>
                <p className={styles.cardBody}>{body}</p>
            </div>
            <svg className={styles.informationIcon} viewBox="0 0 24 24" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5006 12L6.50031 4.99969L8.5 3L17.5 12L8.5 21L6.50031 19.0003L13.5006 12Z"/>
            </svg>
        </a>
    )
}

function ShowcaseContent() {
    return <div className={styles.showcaseContainer}>
        <div className={styles.header}>
            <p className={styles.title}>Dapp Showcase</p>
            <div className={styles.headerBody}>
                <p className={styles.body}>The Internet Computer ecosystem continues to skyrocket with new
                    developer and entrepreneurial activity. Get inspired by the existing dapps.</p>
                <Link className={styles.callToAction} to={"https://dfinity.org/showcase/"}>Explore the Internet
                    Computer ecosystem</Link>
            </div>
        </div>
        <div className={styles.cards}>
            <Card title={"realweb 3.0"}
                  body={"Dapps fully hosted on chain, serving content directly to your browser"}
                  link={"https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Dapp_code_hosted_and_executed_on-chain"}/>
            <Card title={"webspeed"}
                  body={"TX finalized in 2 secs. State-preserving calls processed in milliseconds"}
                  link={"https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Web_speed"}/>
            <Card title={"reversegas"} body={"Users do not need to jump through hoops to use your dapp"}
                  link={"https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Reverse_Gas_Model_.28AKA_.22canister_pays.22.29"}/>
            <Card title={"lessCO₂"}
                  body={"Chain key cryptography enables environmentally friendly decentralization and keeps gas cost stable"}
                  link={"https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Environment_and_cost"}/>
        </div>
        <div className={styles.actionButtonContainer}>
            <Link className={styles.actionButton} to="https://beta.smartcontracts.org/samples/">
                BUILD YOUR OWN
            </Link>
        </div>
    </div>
}

function Showcase() {
    const controls = useAnimation();
    const {ref, inView} = useInView({threshold: 0.35});
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);
    return (
        <div className={styles.container}>
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={variants}
            >
                <div className={styles.background}/>
                <ShowcaseContent/>
            </motion.div>

        </div>
    );
}

export default Showcase;
