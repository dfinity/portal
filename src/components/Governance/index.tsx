import React from 'react';
import styles from './index.module.css';
import Link from "@docusaurus/Link";
import governanceGraph01 from "@site/static/img/governanceGraph01.png"
import governanceGraph02 from "@site/static/img/governanceGraph02.png"
import governanceGraphMobile01 from "@site/static/img/governanceGraphMobile01.png"
import governanceGraphMobile02 from "@site/static/img/governanceGraphMobile02.png"

function Governance() {
    return (
        <div className={styles.main}>
            <a id="governance"/>
            <div className={styles.header}>
                <p className={styles.headerTitle}>Help Shape the Internet Computer</p>
                <p className={styles.headerBody}>Calling developers and blockchain enthusiasts! The Internet Computer is
                    a fully decentralized
                    platform, which means that its ownership is in the hands of the people vested in it. While the
                    Dfinity Foundation is a main contributor building the Internet Computer, the evolution of how it is
                    built is governed by a communal voting system. Not only do stakeholders get to have a say in the
                    what happens next, they also receive voting rewards for participating in governance.</p>
                <Link className={styles.headerCallToAction} to={"https://forum.dfinity.org/"}>
                    Share your thoughts in the Developer Forum
                </Link>
            </div>
            <div className={styles.graphsContainer}>
                <div className={styles.card}>
                    <p className={styles.cardTitle}>The community-led governance of the Internet Computer</p>
                    <Link className={styles.cardCallToAction}
                          to={"https://wiki.internetcomputer.org/wiki/Staking,_voting_and_rewards#Why_Staking_Matters"}>
                        Learn more
                    </Link>
                    <img className={styles.graphDesktop} src={governanceGraph01}
                         alt="governanceGraph01"/>
                    <img className={styles.graphMobile} src={governanceGraphMobile01} alt="governanceGraphMobile01"/>
                </div>
                <div className={styles.card}>
                    <p className={styles.cardTitle}>Earn substantial voting rewards by staking in the Network Nervous
                        System (NNS)</p>
                    <Link className={styles.cardCallToAction}
                          to={"https://wiki.internetcomputer.org/wiki/ICP_staking_with_NNS_frontend_dapp"}>
                        Stake ICP on NNS dapp
                    </Link>
                    <img className={styles.graphDesktop} src={governanceGraph02} alt="governanceGraph02"/>
                    <img className={styles.graphMobile} src={governanceGraphMobile02} alt="governanceGraphMobile02"/>
                </div>
            </div>
            <div className={styles.votingContainer}>
                <svg className={styles.BGShape} viewBox="0 0 773 643" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.65046e-05 225.435C5.20259e-05 47.8928 273.206 0.0612357 450.748 0.0612512C628.291 0.0612667 772.218 143.988 772.218 321.531C772.218 499.073 628.291 643 450.748 643C273.206 643 2.09834e-05 402.978 3.65046e-05 225.435Z"
                        fill="#3C01BA"/>
                </svg>
                <p className={styles.votingTitle}>Your opinions matter </p>
                <Link className={styles.actionButton} to="https://beta.smartcontracts.org/docs/current/tokenomics/">
                    LEARN HOW TO STAKE AND VOTE
                </Link>
            </div>
        </div>
    );
}

export default Governance;
