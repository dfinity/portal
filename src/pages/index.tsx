import React, {useEffect} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Features from "@site/src/components/Features";
import SectionsBar from "@site/src/components/SectionsBar";
import InternetComputer from "@site/src/components/InternetComputer";
import HeroSection from "@site/src/components/HeroSection";
import QuickInformation from "@site/src/components/QuickInformation";
import styles from "./index.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ParticleBackground from "@site/src/components/ParticleBackground";

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
                            <ParticleBackground width={screen.width} height={screen.height * 2} particleCount={150}
                                                frameRate={30} centerX={screen.width * 0.8}
                                                centerY={screen.height * 0.4} duration={12500}/>
                        </div>
                    }
                </BrowserOnly>
                <a id="home"/>
                <HeroSection/>
                <a id="startCoding"/>
                <QuickInformation/>
                <a id="internetComputer"/>
                <InternetComputer/>
                <a id="features"/>
                <Features/>
                <SectionsBar/>
            </main>
        </Layout>
    );
}
