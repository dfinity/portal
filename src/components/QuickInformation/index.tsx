import React from 'react';
import styles from "@site/src/components/QuickInformation/styles.module.css";
import eventBG from "@site/static/img/event_background_image.png"

function Information({title, body,link}) {
    return (
        <a href={link} className={styles.container}>
            <div className={styles.bodyContainer}>
                <p className={styles.informationTitle}>{title}</p>
                <p className={styles.informationBody}>{body}</p>
            </div>
            <svg className={styles.informationIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5006 12L6.50031 4.99969L8.5 3L17.5 12L8.5 21L6.50031 19.0003L13.5006 12Z"/>
            </svg>
        </a>
    )
}

function Event({title, dateRange,link}) {
    return (
        <a href={link} className={styles.eventContainer}>
            <div className={styles.bodyContainer}>
                <p className={styles.eventDate}>{dateRange}</p>
                <p className={styles.eventTitle}>{title}</p>
                <p className={styles.eventDescription}>Internet Computer Global Hackaton <br/>$6 Million In Prizes + Grants</p>
                <p className={styles.eventAction}>REGISTER NOW</p>
            </div>
            <img className={styles.eventBackground} src={eventBG} alt=""/>
        </a>
    )
}

function QuickInformation() {

    return (
        <div className={styles.grid}>
            <Information title="Sample Code"
                         body="Ready to code? Have some fun building DeFi, NFT minting dapps and more on the Internet Computer."
                         link={"https://beta.smartcontracts.org/docs/current/developer-docs/samples"}/>
            <Information title="Wiki"
                         body="Get to know the Internet Computer — its concepts, architecture and technical breakthroughs."
                         link={"https://wiki.internetcomputer.org/wiki/Internet_Computer_wiki"}/>
            <Information title="Community Forum"
                         body="Join the Internet Computer Community Forum to ask questions and share your ideas on how to improve and shape its future."
                         link={"https://forum.dfinity.org/"}/>
            <Event title="Supernova" dateRange="May 10 - June 20, 2022" link={"https://supernova.devpost.com/"}/>
        </div>
    );
}

export default QuickInformation;
