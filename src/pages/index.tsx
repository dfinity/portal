import React, {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Features from "@site/src/components/Features";
import SectionsBar from "@site/src/components/SectionsBar";
import InternetComputer from "@site/src/components/InternetComputer";
import HeroSection from "@site/src/components/HeroSection";
import {useWindowSize} from "@docusaurus/theme-common";
import QuickInformation from "@site/src/components/QuickInformation";
import styles from "./index.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ParticleBackground from "@site/src/components/ParticleBackground";

function LandingPage() {
    const windowSize = useWindowSize(); // Desktop sidebar visible on hydration: need SSR rendering
    const heroSection = useRef(null);
    const isDesktop = windowSize === 'ssr' || windowSize === 'desktop';
    return (
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
            <HeroSection heroSectionRef={heroSection}/>
            <a id="startCoding"/>
            <QuickInformation/>
            <a id="internetComputer"/>
            <InternetComputer/>
            <a id="features"/>
            <Features/>
            {isDesktop &&
                <>
                    <SectionsBar/>
                </>
            }
        </main>
    )
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3B00B9");
        document.documentElement.style.setProperty('--ifm-navbar-background-color:', "rgb(243,238,242)");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            description={siteConfig.tagline}>
            <LandingPage/>
        </Layout>
    );
}
