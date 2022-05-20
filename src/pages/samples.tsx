import React, {useEffect} from 'react';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "@site/src/pages/samples.module.css";
import Header from "@site/src/components/SamplesPage/Header";

function Samples(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3b00b9");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            description={siteConfig.tagline}>
            <main className={styles.main}>
                <svg className={styles.BGShape} viewBox="0 0 10 10"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle fill="#3C01BA" cx="5" cy="5" r="5"/>
                </svg>
                <Header/>
            </main>
        </Layout>
    );
}

export default Samples;
