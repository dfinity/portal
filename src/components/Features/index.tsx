import React, {useEffect} from 'react';
import styles from './index.module.css';
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


function Card({title, body, link}) {
    return (
        <motion.a variants={item} href={link} className={styles.card}>
            <div className={styles.cardContainer}>
                <p className={styles.cardTitle}>{title}</p>
                <p className={styles.cardBody}>{body}</p>
            </div>
            <svg className={styles.informationIcon} viewBox="0 0 24 24" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5006 12L6.50031 4.99969L8.5 3L17.5 12L8.5 21L6.50031 19.0003L13.5006 12Z"/>
            </svg>
        </motion.a>
    )
}

function Features() {
    const controls = useAnimation();
    const {ref, inView} = useInView({delay: 500, threshold: 0.2});
    useEffect(() => {
        if (inView) {
            controls.start("show");
        }
    }, [controls, inView]);
    return (
        <motion.div ref={ref}
                    animate={controls}
                    initial="hidden"
                    variants={container}
                    className={styles.container}>
            <a id="features"/>
            <motion.p variants={item} className={styles.title}>What's cool about the <br/> Internet Computer</motion.p>
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
                <Card title={"internetscale"}
                      body={"Dapps can grow without limits as the IC transparently adds more nodes"}
                      link={"https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Network_scales_without_limit"}/>
                <Card title={"actormodel"} body={"Parallelism enables scaling. Contracts are asynchronous"}
                      link={"https://wiki.internetcomputer.org/wiki/Internet_Computer_vision#Novel_.E2.80.9Ccanister.E2.80.9D_smart_contract_framework"}/>
            </div>
            <motion.div style={{display: "inline-flex"}} variants={item}>
                <Link className={styles.actionButton} to="https://dfinity.org/roadmap">
                    LEARN MORE
                </Link>
            </motion.div>
        </motion.div>
    );
}

export default Features;
