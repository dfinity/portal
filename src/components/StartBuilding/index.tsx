import React from 'react';
import styles from "@site/src/components/StartBuilding/index.module.css";
import eventBG from "@site/static/img/startBuilding/event_background_image.png"
import motokoBG from "@site/static/img/startBuilding/motokoPlayground.png"
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg"
import BackgroundSVG from "@site/static/img/startBuilding/bgGradient.svg"
import GamingIcon from "@site/static/img/startBuilding/gaming.svg";
import IotIcon from "@site/static/img/startBuilding/iot.svg";
import SocialIcon from "@site/static/img/startBuilding/social.svg";
import GrowthIcon from "@site/static/img/startBuilding/growth.svg";
import DatabaseIcon from "@site/static/img/startBuilding/database.svg";
import MotokoIcon from "@site/static/img/startBuilding/motoko.svg";
import DfinityIcon from "@site/static/img/startBuilding/dfinity.svg";
import clsx from "clsx";
import Link from "@docusaurus/Link";

function Information({title, body, link}) {
    return (
        <Link to={link}
           className={clsx(styles.card, styles.cardContainer, styles.cardHover)}>
            <div className={styles.bodyContainer}>
                <p className={styles.informationTitle}>{title}</p>
                <p className={styles.informationBody}>{body}</p>
            </div>
            <RightArrowSVG className={styles.informationIcon}/>
        </Link>
    )
}

function Event({title, dateRange, link}) {
    return (
        <Link to={link} className={clsx(styles.card, styles.eventContainer)}>
            <div className={styles.bodyContainer}>
                <p className={styles.eventDate}>{dateRange}</p>
                <p className={styles.eventTitle}>{title}</p>
                <p className={styles.eventDescription}>Internet Computer Global
                    Hackathon <br/>$6 Million In Prizes +
                    Grants</p>
                <p className={styles.eventAction}>REGISTER NOW</p>
            </div>
            <img className={styles.eventBackground} src={eventBG} alt=""/>
        </Link>
    )
}

function MotokoPlayground({title, body, link}) {
    return (
        <Link to={link}
           className={clsx(styles.card, styles.motokoContainer, styles.cardHover)}>
            <div className={styles.bodyContainer}>
                <p className={styles.informationTitle}>{title}</p>
                <p className={styles.informationBody}>{body}</p>
            </div>
            <img className={styles.motokoBackground} src={motokoBG} alt=""/>
            <RightArrowSVG className={styles.informationIcon}/>
        </Link>
    )
}

function StartBuilding() {
    return (
        <div className={styles.main}>
            <a id="startBuilding"/>
            <div className={styles.headerContainer}>
                <BackgroundSVG className={styles.BGGradient}/>
                <div className={styles.callToActionContainer}>
                    <MotokoIcon
                        className={clsx(styles.backgroundIcon, styles.motokoIcon)}/>
                    <DfinityIcon
                        className={clsx(styles.backgroundIcon, styles.dfinityIcon)}/>
                    <GamingIcon
                        className={clsx(styles.backgroundIcon, styles.gamingIcon)}/>
                    <IotIcon
                        className={clsx(styles.backgroundIcon, styles.iotIcon)}/>
                    <DatabaseIcon
                        className={clsx(styles.backgroundIcon, styles.databaseIcon)}/>
                    <SocialIcon
                        className={clsx(styles.backgroundIcon, styles.socialIcon)}/>
                    <GrowthIcon
                        className={clsx(styles.backgroundIcon, styles.growthIcon)}/>
                    <p className={styles.callToActionTitle}>Start building real
                        Web3</p>
                    <p className={styles.callToActionBody}>Start a DAO, create a
                        token,
                        build dapps and host assets with the full stack entirely
                        on
                        chain.</p>
                    <Link className={styles.actionButton}
                         to="/developers">
                        BUILD REAL WEB3
                    </Link>
                </div>
            </div>
            <div className={styles.cards}>
                <Information title="Developer’s Home"
                             body="Engage with the IC community to shape future features, propose new ideas, and ask questions."
                             link={"/developers"}/>
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
                                  link={"https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/"}/>
            </div>

        </div>
    );
}

export default StartBuilding;
