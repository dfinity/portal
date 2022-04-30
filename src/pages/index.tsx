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
import Ecosystem from "@site/src/components/Ecosystem";
import Showcase from "@site/src/components/Showcase";

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3B00B9");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            description={siteConfig.tagline}>
            <main>
                <BrowserOnly>
                    {() =>
                        <div className={styles.particleBackground}>
                            <ParticleBackground width={window.innerWidth} height={window.innerHeight * 2} particleCount={150}
                                                frameRate={30} centerX={window.innerWidth * 0.8}
                                                centerY={window.innerHeight * 0.4} duration={12500}/>
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
                <a id="ecosystem"/>
                <Ecosystem/>
                <a id="ICWorld"/>
                <ICWorld/>
                <SectionsBar/>
            </main>
        </Layout>
    );
}
