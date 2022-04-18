import React, {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Features from "@site/src/components/Features";
import SectionsBar from "@site/src/components/SectionsBar";
import InternetComputer from "@site/src/components/InternetComputer";
import HeroSection from "@site/src/components/HeroSection";

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    const heroSection = useRef(null);

    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3B00B9");
        document.documentElement.style.setProperty('--ifm-navbar-background-color:', "rgb(243,238,242)");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            description={siteConfig.tagline}>
            <main>
                <SectionsBar/>
                <a id="home"/>
                <HeroSection heroSectionRef={heroSection}/>
                <a id="internetComputer"/>
                <InternetComputer heroSectionRef={heroSection}/>
                <a id="features"/>
                <Features/>
            </main>
        </Layout>
    );
}
