import React from 'react';
import styles from './index.module.css';
import Link from "@docusaurus/Link";


function Ecosystem() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <svg className={styles.BGShape} viewBox="0 0 773 643" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.65046e-05 225.435C5.20259e-05 47.8928 273.206 0.0612357 450.748 0.0612512C628.291 0.0612667 772.218 143.988 772.218 321.531C772.218 499.073 628.291 643 450.748 643C273.206 643 2.09834e-05 402.978 3.65046e-05 225.435Z"
                        fill="#3C01BA"/>
                </svg>

                <p className={styles.title}>Your opinions matter </p>
                <Link className={styles.actionButton} to="https://beta.smartcontracts.org/docs/current/tokenomics/">
                    LEARN HOW TO STAKE AND VOTE
                </Link>
            </div>
        </div>
    );
}

export default Ecosystem;
