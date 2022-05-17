import React, {useEffect} from 'react';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "@site/src/pages/users.module.css";

function Users(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    useEffect(() => {
        document.documentElement.style.setProperty('--ifm-color-primary', "#3b00b9");
    }, []);
    return (
        <Layout
            title={siteConfig.title}
            description={siteConfig.tagline}>
            <main className={styles.main}>
                {/*Add content here*/}
            </main>
        </Layout>
    );
}

export default Users;
