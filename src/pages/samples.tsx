import React, {useEffect} from 'react';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "@site/src/pages/samples.module.css";
import Header from "@site/src/components/SamplesPage/Header";
import Card from "@site/src/components/SamplesPage/Card";
import nft from "@site/static/img/samples/nft.png";

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
                <svg className={styles.BGShape} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                    <circle fill="#3C01BA" cx="5" cy="5" r="5"/>
                </svg>
                <Header/>
                <div className={styles.cards}>
                    <Card image={nft} title={"NFT Minting"} domains={["Gaming", "Beginner", "NFT", "Motoko", "Rust"]}
                          body={"Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus tellus ac cursus commodo tortor mauris condimentum."}
                          links={{
                              action: {text: "Get code", to: "/"},
                              motoko: "/", rust: "/", docs: "/", youtube: "/"
                          }}/>
                    <Card image={nft} title={"NFT Minting"} domains={["Gaming", "Beginner", "NFT", "Motoko", "Rust"]}
                          body={"Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus tellus ac cursus commodo tortor mauris condimentum."}
                          links={{
                              action: {text: "Get code", to: "/"},
                              motoko: "/", rust: "/", docs: "/", youtube: "/"
                          }}/>
                    <Card image={nft} title={"NFT Minting"} domains={["Gaming", "Beginner", "NFT", "Motoko", "Rust"]}
                          body={"Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus tellus ac cursus commodo tortor mauris condimentum."}
                          links={{
                              action: {text: "Get code", to: "/"},
                              motoko: "/", rust: "/", docs: "/", youtube: "/"
                          }}/>
                    <Card image={nft} title={"NFT Minting"} domains={["Gaming", "Beginner", "NFT", "Motoko", "Rust"]}
                          body={"Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus tellus ac cursus commodo tortor mauris condimentum."}
                          links={{
                              action: {text: "Get code", to: "/"},
                              motoko: "/", rust: "/", docs: "/", youtube: "/"
                          }}/>
                    <Card image={nft} title={"NFT Minting"} domains={["Gaming", "Beginner", "NFT", "Motoko", "Rust"]}
                          body={"Donec ullamcorper nulla non metus auctor fringilla. Fusce dapibus tellus ac cursus commodo tortor mauris condimentum."}
                          links={{
                              action: {text: "Get code", to: "/"},
                              motoko: "/", rust: "/", docs: "/", youtube: "/"
                          }}/>
                </div>
            </main>
        </Layout>
    );
}

export default Samples;
