import React, {useEffect} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Features from "@site/src/components/Features";
import SectionsBar from "@site/src/components/SectionsBar";
import InternetComputer from "@site/src/components/InternetComputer";
import HeroSection from "@site/src/components/HeroSection";
import StartCoding from "@site/src/components/StartCoding";
import ICWorld from "@site/src/components/ICWorld";
import styles from "./index.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ParticleBackground from "@site/src/components/ParticleBackground";
import Governance from "@site/src/components/Governance";
import Showcase from "@site/src/components/Showcase";

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3b00b9");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            description={siteConfig.tagline}>
            <main>
                <BrowserOnly>
                    {() =>
                        <div className={styles.particleBackground}>
                            <ParticleBackground width={document.body.clientWidth} height={document.body.clientHeight * 2} particleCount={100}
                                                frameRate={30} centerX={document.body.clientWidth * 0.8}
                                                centerY={document.body.clientHeight * 0.4} duration={12500} pixelDensity={1} />
                        </div>
                    }
                </BrowserOnly>
                <a id="home"/>
                <HeroSection/>
                <a id="startCoding"/>
                <StartCoding/>
                <a id="internetComputer"/>
                <InternetComputer/>
                <a id="features"/>
                <Features/>
                <Showcase />
                <a id="governance"/>
                <Governance/>
                <a id="ICWorld"/>
                <ICWorld/>
                <SectionsBar/>
            </main>
        </Layout>
    );
}
