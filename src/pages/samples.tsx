import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "@site/src/pages/samples.module.css";
import Header from "@site/src/components/SamplesPage/Header";
import Card from "@site/src/components/SamplesPage/Card";
import FilterBar from "@site/src/components/SamplesPage/FilterBar";
import BGCircle from "@site/static/img/samples/bgcircle.svg";
import nftMinting from "@site/static/img/samples/nftMinting.png";
import helloWorld from "@site/static/img/samples/helloWorld.png";
import staticWebsite from "@site/static/img/samples/staticWebsite.png";
import basicDex from "@site/static/img/samples/basicDex.png";
import basicDAO from "@site/static/img/samples/basicDAO.png";
import encryptedNoteTaking from "@site/static/img/samples/encryptedNoteTaking.png";
import tokenTransfer from "@site/static/img/samples/tokenTransfer.png";
import actorReference from "@site/static/img/samples/actorReference.png";

const sampleItems = [
  {
    title: "NFT Minting",
    image: nftMinting,
    domains: ["Gaming", "Beginner", "NFT", "Motoko", "Rust"],
    body: "Create a user generated NFT and share it. This dapp uses the DIP721 NFT standard.",
    links: {
      action: { text: "Get code", to: "/" },
      motoko: "/",
      rust: "/",
      docs: "/",
      youtube: "/",
    },
  },
  {
    title: "Hello World",
    image: helloWorld,
    domains: ["Basic", "Motoko", "Rust"],
    body: "Deploy a dead simple dapp using two canisters serving a web page.",
    links: {
      action: { text: "Get code", to: "/" },
      motoko: "/",
      rust: "/",
      docs: "/",
      youtube: "/",
    },
  },
  {
    title: "Static Website",
    image: staticWebsite,
    domains: ["Global", "Website", "Basic", "Motoko", "Rust"],
    body: "Quickly set up a static website structure, add content and basic styling, and deploy on the IC.",
    links: {
      action: { text: "Docs", to: "/" },
      motoko: "/",
      rust: "/",
      docs: "/",
    },
  },
  {
    title: "Basic Dex",
    image: basicDex,
    domains: ["DeFi", "Website", "Basic", "Motoko", "Rust"],
    body: "Build dapp to enable DeFi applications on the IC.",
    links: {
      action: { text: "Get Code", to: "/" },
      docs: "/",
      youtube: "/",
    },
  },
  {
    title: "Basic DAO",
    image: basicDAO,
    domains: ["Gaming", "Website", "Basic", "Motoko", "Rust"],
    body: "Dapp initializes a set of accounts and corresponding tokens as well as enables  proposals for communal votes.",
    links: {
      action: { text: "Get Code", to: "/" },
      motoko: "/",
      docs: "/",
      youtube: "/",
    },
  },
  {
    title: "Encrypted note-taking",
    image: encryptedNoteTaking,
    domains: ["DeFi", "Website", "Basic", "Motoko", "Rust"],
    body: "Create, access and modify confidential notes from multiple devices using Internet Identity and end-to-end encryption.",
    links: {
      action: { text: "Get Code", to: "/" },
      rust: "/",
      docs: "/",
    },
  },
  {
    title: "Token transfer",
    image: tokenTransfer,
    domains: ["Global", "Website", "Basic", "Motoko", "Rust"],
    body: "Create a dapp that can transfer tokens to its most active users.",
    links: {
      action: { text: "Get Code", to: "/" },
      motoko: "/",
      rust: "/",
      docs: "/",
      youtube: "/",
    },
  },
  {
    title: "Actor reference",
    image: actorReference,
    domains: ["Basic", "Website", "Basic", "Motoko", "Rust"],
    body: "Learn how the IC management canister functions as an actor (reference).",
    links: {
      action: { text: "Get Code", to: "/" },
      rust: "/",
      docs: "/",
      youtube: "/",
    },
  },
];

function Samples(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [selectedLanguages, setSelectedLanguages] = React.useState([]);
  const [selectedDomains, setSelectedDomains] = React.useState([]);
  const [selectedLevels, setSelectedLevels] = React.useState([]);
  const [selectedContentTypes, setSelectedContentTypes] = React.useState([]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--ifm-color-primary",
      "#3b00b9"
    );
  }, []);
  useEffect(() => {
    console.log(selectedLanguages);
  }, [selectedLanguages]);
  useEffect(() => {
    console.log(selectedDomains);
  }, [selectedDomains]);

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.main}>
        <div className={styles.container}>
          <BGCircle className={styles.BGShape} />
          <Header />
          <FilterBar
            numberOfItems={sampleItems.length}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            selectedDomains={selectedDomains}
            setSelectedDomains={setSelectedDomains}
            selectedLevels={selectedLevels}
            setSelectedLevels={setSelectedLevels}
            selectedContentTypes={selectedContentTypes}
            setSelectedContentTypes={setSelectedContentTypes}
          />
          <div className={styles.cards}>
            {sampleItems.map((sample) => (
              <Card
                image={sample.image}
                title={sample.title}
                domains={sample.domains}
                body={sample.body}
                links={sample.links}
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Samples;
