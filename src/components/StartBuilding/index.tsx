import React from 'react';
import styles from "@site/src/components/StartBuilding/index.module.css";
import eventBG from "@site/static/img/event_background_image.png"
import motokoBG from "@site/static/img/motokoPlayground.png"
import clsx from "clsx";

function Information({title, body, link}) {
    return (
        <a href={link}
           className={clsx(styles.card, styles.cardContainer, styles.cardHover)}>
            <div className={styles.bodyContainer}>
                <p className={styles.informationTitle}>{title}</p>
                <p className={styles.informationBody}>{body}</p>
            </div>
            <svg className={styles.informationIcon} viewBox="0 0 24 24"
                 fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.5006 12L6.50031 4.99969L8.5 3L17.5 12L8.5 21L6.50031 19.0003L13.5006 12Z"/>
            </svg>
        </a>
    )
}

function Event({title, dateRange, link}) {
    return (
        <a href={link} className={clsx(styles.card, styles.eventContainer)}>
            <div className={styles.bodyContainer}>
                <p className={styles.eventDate}>{dateRange}</p>
                <p className={styles.eventTitle}>{title}</p>
                <p className={styles.eventDescription}>Internet Computer Global
                    Hackathon <br/>$6 Million In Prizes +
                    Grants</p>
                <p className={styles.eventAction}>REGISTER NOW</p>
            </div>
            <img className={styles.eventBackground} src={eventBG} alt=""/>
        </a>
    )
}

function MotokoPlayground({title, body, link}) {
    return (
        <a href={link}
           className={clsx(styles.card, styles.motokoContainer, styles.cardHover)}>
            <div className={styles.bodyContainer}>
                <p className={styles.informationTitle}>{title}</p>
                <p className={styles.informationBody}>{body}</p>
            </div>
            <img className={styles.motokoBackground} src={motokoBG} alt=""/>
            <svg className={styles.informationIcon}
                 viewBox="0 0 24 24" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.5006 12L6.50031 4.99969L8.5 3L17.5 12L8.5 21L6.50031 19.0003L13.5006 12Z"/>
            </svg>
        </a>
    )
}

function StartBuilding() {
    return (
        <div className={styles.main}>
            <a id="startBuilding"/>
            <div className={styles.cards}>
                <Information title="Developer’s Home"
                             body="Engage with the IC community to shape future features, propose new ideas, and ask questions."
                             link={"/"}/>
                <Information title="Documentation"
                             body="Explore concepts, the architecture and technical breakthroughs that enable the IC. Find step-by-step guides such as how to stake your tokens."
                             link={"/docs/current/developer-docs/ic-overview"}/>
                <Information title="Sample Code"
                             body="Learn how to build on the IC by exploring samples ranging from a simple DEX, to on-chain encrypted storage, NFT minting, and a basic DAO."
                             link={"/samples"}/>
                <Event title="Supernova" dateRange="May 10 - June 20, 2022"
                       link={"https://supernova.devpost.com/"}/>
                <MotokoPlayground title="Motoko Playground"
                                  body="Explore Motoko, the native language of the Internet Computer, right in the browser without having to download the SDK"
                                  link={"/"}/>
            </div>
        </div>
    );
}

export default StartBuilding;
