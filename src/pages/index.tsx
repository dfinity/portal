import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate from '@docusaurus/Translate';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={styles.heroBanner}>
            <div className={styles.videoHero}>
                <video className={styles.backgroundVideo} autoPlay muted loop playsInline id="background-video">
                    <source src="https://smartcontracts.org/video/internetComputer_small.mp4" type="video/mp4"/>
                </video>
            </div>

            <div className={styles.videoContainer}>
                <h1 className="hero__title">{siteConfig.title}</h1>

                <p className="hero__subtitle">
                    <Translate>
                        If you’ve landed here, you’re interested in learning more about the Internet Computer.
                        You’re in the right place — take a look below for where to get started!
                    </Translate>
                </p>

                <div className={styles.buttons}>
                    <Link
                        className={clsx('button', 'button--secondary', 'button--lg', styles.rounded)}
                        to="/docs/current/developer-docs/quickstart">
                        <Translate>🔧 Get Started</Translate>
                    </Link>

                    <Link
                        className={clsx('button', 'button--secondary', 'button--lg', styles.rounded)}
                        to="/docs/current/developer-docs/samples">
                        <Translate>✅ Sample Code</Translate>
                    </Link>

                    {/* <Link
            className={clsx('button', 'button--secondary', 'button--lg', styles.rounded)}
            to="/docs/current/references/motoko-ref">
            <Translate>📚 References</Translate>
          </Link>

          <Link
            className={clsx('button', 'button--secondary', 'button--lg', styles.rounded)}
            to="/docs/current/user-guides">
            <Translate>👥 User guides</Translate>
          </Link>

          <Link
            className={clsx('button', 'button--secondary', 'button--lg', styles.rounded)}
            to="/docs/current/samples">
            <Translate>▶️ Samples</Translate>
          </Link> */}
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const [blocks, setBlocks] = useState(687713068);
    const {siteConfig} = useDocusaurusContext();

    const fetchBlocks = () => {
        fetch("https://ic-api.internetcomputer.org/api/metrics/block").then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {
            setBlocks(data.block[0][1]);
        })
    }
    useEffect(() => {
        fetchBlocks();
        const interval = setInterval(() => {
            fetchBlocks()
        }, 1000);
        return () => {
            clearInterval(interval)
        };

    }, [])
    return (
        <Layout
            title={siteConfig.title}
            // TODO: change the desc
            description="Description will go into a meta tag in <head />">
            <HomepageHeader/>
            <main>
                <div className="mx-auto my-2">
                    <p className="text-3xl text-center">{blocks}</p>
                    <p className="text-2xl text-center text-gray-600">Blocks Mined</p>
                </div>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
