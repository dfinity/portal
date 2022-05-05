import React from 'react';
import styles from './index.module.css';
import DfinityIcon from "@site/static/img/dfinityIcon.svg";
import GamingIcon from "@site/static/img/gamingIcon.svg";
import SocialFiIcon from "@site/static/img/socialFiIcon.svg";
import DatabaseIcon from "@site/static/img/databaseIcon.svg";
import GrowthIcon from "@site/static/img/growthIcon.svg";
import Link from "@docusaurus/Link";
import BuildingIcon from "@site/static/img/buildingIcon.svg";
import PlayIcon from "@site/static/img/playIcon.svg";
import NftIcon from "@site/static/img/nftIcon.svg";
import SecurityIcon from "@site/static/img/securityIcon.svg";

function Index() {
    return (
        <div className={styles.Container}>
            <a id="internetComputer"/>
            <div className={styles.main}>
                <div className={styles.iconsContainer}>
                    <DfinityIcon className={styles.dfinityIcon}/>
                    <GamingIcon className={styles.gamingIcon}/>
                    <SocialFiIcon className={styles.socialFiIcon}/>
                    <DatabaseIcon className={styles.databaseIcon}/>
                    <GrowthIcon className={styles.growthIcon}/>
                    <p className={styles.Title}>What's the <br/> Internet Computer</p>
                    <p className={styles.Body}>Imagine building scalable Dapps, DeFi, websites,
                        enterprise systems and
                        open
                        internet services that are 100%
                        on chain and can be tokenized. Guess what…it’s all possible on the
                        Internet Computer.
                    </p>
                    <p className={styles.Body}>The Internet Computer is blockchain reimagined, a world
                        computer built by
                        a
                        team of more than 200
                        world-renowned scientists and engineers. Powered by groundbreaking chain key
                        cryptography, the Internet
                        Computer is the world's fastest, most scalable blockchain. It unleashes the full
                        capacity of smart
                        contracts
                        enabling infinite data and computation capacity hosted entirely on chain. Developers,
                        the world is at
                        your
                        fingertips!</p>
                    <div className={styles.CallToAction}>
                        <svg className={styles.CallToActionIcon} viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2 13.6667H14V15H2V13.6667ZM8.66667 9.78134L12.714 5.73334L13.6567 6.67601L8 12.3333L2.34333 6.67668L3.286 5.73334L7.33333 9.78001V2.33334H8.66667V9.78134Z"
                                fill="currentColor"/>
                        </svg>
                        <Link className={styles.CallToActionLink} to="https://dfinity.org/whitepaper.pdf">
                            Get the Whitepaper
                        </Link>
                    </div>
                    <BuildingIcon className={styles.buildingIcon}/>
                    <PlayIcon className={styles.playIcon}/>
                    <DfinityIcon className={styles.dfinityIcon2}/>
                    <NftIcon className={styles.nftIcon}/>
                    <SecurityIcon className={styles.securityIcon}/>
                </div>
            </div>
        </div>
    )
}

export default Index;
