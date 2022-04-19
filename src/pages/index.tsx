import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Features from "@site/src/components/Features";
import SectionsBar from "@site/src/components/SectionsBar";
import InternetComputer from "@site/src/components/InternetComputer";
import HeroSection from "@site/src/components/HeroSection";

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    const heroSection = useRef(null);
    const [background, setBackground] = useState(0);
    const changeBackground = () => {
        if (background + 1 >= 3) {
            setBackground(0);
        } else {
            setBackground(background + 1);
        }
    };
    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3B00B9");
        document.documentElement.style.setProperty('--ifm-navbar-background-color:', "rgb(243,238,242)");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            description={siteConfig.tagline}>
            <main>
                <SectionsBar changeBackground={changeBackground}/>
                <a id="home"/>
                <HeroSection heroSectionRef={heroSection} backgroundIndex={background}/>
                <a id="internetComputer"/>
                <InternetComputer heroSectionRef={heroSection}/>
                <a id="features"/>
                <Features/>
            </main>
        </Layout>
    );
}
