import React from 'react';
import styles from './styles.module.css';
import Link from "@docusaurus/Link";

function Card({title,body}) {
    return (
        <div className={styles.card}>
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardBody}>{body}</p>
        </div>
    )
}

function Features() {
    return (
        <div className={styles.container} id={"Features"}>
            <p className={styles.title}>What's cool about the <br/> Internet Computer</p>
            <div className={styles.cards}>
                <Card title={"realweb 3.0"} body={"Dapps fully hosted on chain, serving content directly to your browser"} />
                <Card title={"webspeed"} body={"TX finalized in 2 secs. State-preserving calls processed in milliseconds"} />
                <Card title={"reversegas"} body={"Users do not need to jump through hoops to use your dapp"} />
                <Card title={"lessCO₂"} body={"Chain key cryptography enables environmentally friendly decentralization and keeps gas cost stable"} />
                <Card title={"internetscale"} body={"Dapps can grow without limits as the IC transparently adds more nodes"} />
                <Card title={"actormodel"} body={"Parallelism enables scaling. Contracts are asynchronous"} />
            </div>
            <Link className={styles.actionButton} to="/docs/current/developer-docs/quickstart">
                LEARN MORE
            </Link>
        </div>
    );
}

export default Features;
