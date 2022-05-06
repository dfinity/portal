import React from 'react';
import styles from './index.module.css';

function Card({title, body, link}) {
    return (
        <div className={styles.cardWrapper}>
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
        </div>
    )
}

function ICWorld() {
    return (
        <div className={styles.container}>
            <a id="ICWorld"/>
            <p className={styles.title}>Delve into the IC World</p>
            <div className={styles.cards}>
                <Card title={"IC Fellowship"}
                      body={"Become an IC Master"}
                      link={"https://dfinity.org/ecosystem/fellowship/"}/>
                <Card title={"Developer Grants"}
                      body={"Apply now"}
                      link={"https://dfinity.org/grants"}/>
                <Card title={"Vulnerability Disclosures"} body={"Report security bugs"}
                      link={"https://dfinity.org/vulnerability-disclosure-program/"}/>
                <Card title={"IC Bootcamp"}
                      body={"Apply now"}
                      link={"https://dfinity.org/bootcamp"}/>
                <Card title={"Community Conversations"}
                      body={"Join the tech talks"}
                      link={"https://dfinity.org/conversations"}/>
                <Card title={"Coding with Kyle"} body={"Watch Tutorials"}
                      link={"https://youtube.com/playlist?list=PLuhDt1vhGcrfQGLWqhUo9-DFD5JaHqCh1"}/>
                <Card title={"IC Dashboard"} body={"Get the stats"}
                      link={"https://dashboard.internetcomputer.org/"}/>
                <Card title={"Blog"} body={"Get informed"}
                      link={"https://medium.com/dfinity/"}/>
                <Card title={"Community Awards"} body={"Create an event"}
                      link={"https://dfinity.org/community"}/>
            </div>
        </div>
    );
}

export default ICWorld;
