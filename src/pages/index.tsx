import React, {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Features from "@site/src/components/Features";
import SectionsBar from "@site/src/components/SectionsBar";
import InternetComputer from "@site/src/components/InternetComputer";
import HeroSection from "@site/src/components/HeroSection";
import {useWindowSize} from "@docusaurus/theme-common";
import HeroSectionMobile from "@site/src/components/HeroSectionMobile";

function LandingPageDesktop() {
    const heroSection = useRef(null);
    return (
        <main>
            <SectionsBar/>
            <a id="home"/>
            <HeroSection heroSectionRef={heroSection}/>
            <a id="internetComputer"/>
            <InternetComputer heroSectionRef={heroSection}/>
            <a id="features"/>
            <Features/>
        </main>)
}

function LandingPageMobile() {
    const heroSection = useRef(null);
    return (
        <main>
            <HeroSectionMobile heroSectionRef={heroSection}/>
        </main>)
}

const LandingPageDesktopMemo = React.memo(LandingPageDesktop);
const LandingPageMobileMemo = React.memo(LandingPageMobile);
export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    const windowSize = useWindowSize(); // Desktop sidebar visible on hydration: need SSR rendering
    const shouldRenderLandingPageDesktop = windowSize === 'desktop' || windowSize === 'ssr'; // Mobile sidebar not visible on hydration: can avoid SSR rendering
    const shouldRenderLandingPageMobile = windowSize === 'mobile';
    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3B00B9");
        document.documentElement.style.setProperty('--ifm-navbar-background-color:', "rgb(243,238,242)");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            description={siteConfig.tagline}>
            <>
                {shouldRenderLandingPageDesktop && <LandingPageDesktopMemo/>}
                {shouldRenderLandingPageMobile && <LandingPageMobileMemo/>}
            </>
        </Layout>
    );
}
