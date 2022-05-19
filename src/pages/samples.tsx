import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "@site/src/pages/samples.module.css";
import Header from "@site/src/components/SamplesPage/Header";
import Card from "@site/src/components/SamplesPage/Card";
import FilterBar from "@site/src/components/SamplesPage/FilterBar";
import BGCircle from "@site/static/img/samples/bgcircle.svg";
import PlusIcon from "@site/static/img/samples/plus.svg";
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
    index: 0,
    title: "Hello World",
    image: helloWorld,
    domains: ["Website"],
    languages: ["Motoko", "Rust", "Javascript"],
    level: ["Beginner"],
    contentType: ["Code Samples", "Documentation", "Live Demos"],
    highlights: ["Beginner", "Motoko", "Rust", "Beginner"],
    body: "Deploy a dead simple dapp using two canisters serving a web page.",
    links: {
      action: { text: "Get code", to: "/" },
      motoko: "/",
      rust: "/",
      livePreview: "/",
      docs: "/",
    },
  },
  {
    index: 1,
    title: "Static Website",
    image: staticWebsite,
    domains: ["Website", "Global"],
    languages: ["Motoko", "Rust", "Javascript"],
    level: ["Beginner"],
    contentType: ["Documentation", "Videos"],
    highlights: ["Global", "Website", "Motoko", "Rust", "Beginner"],
    body: "Quickly set up a static website structure, add content and basic styling, and deploy on the IC.",
    links: {
      action: { text: "Docs", to: "/" },
      docs: "/",
      youtube: "/",
    },
  },
  {
    index: 2,
    title: "Basic Dex",
    image: basicDex,
    domains: ["DeFi", "Website"],
    languages: ["Motoko", "Rust", "Javascript"],
    level: ["Intermediate"],
    contentType: ["Code Samples", "Documentation", "Videos", "Live Demos"],
    highlights: ["DeFi", "Website", "Motoko", "Rust", "Intermediate"],
    body: "Build dapp to enable DeFi applications on the IC.",
    links: {
      action: { text: "Get Code", to: "/" },
      motoko: "/",
      rust: "/",
      livePreview: "/",
      docs: "/",
      youtube: "/",
    },
  },
  {
    index: 3,
    title: "NFT Minting",
    image: nftMinting,
    domains: ["NFT", "Gaming"],
    languages: ["Rust"],
    level: ["Intermediate"],
    contentType: ["Code Samples", "Documentation", "Videos"],
    highlights: ["NFT", "Gaming", "Motoko", "Rust", "Intermediate"],
    body: "Create a user generated NFT and share it. This dapp uses the DIP721 NFT standard.",
    links: {
      action: { text: "Get code", to: "/" },
      rust: "/",
      docs: "/",
      youtube: "/",
    },
  },
  {
    index: 4,
    title: "Basic DAO",
    image: basicDAO,
    domains: ["Global", "DeFi"],
    languages: ["Motoko", "Rust"],
    level: ["Intermediate"],
    contentType: ["Code Samples", "Documentation", "Videos"],
    highlights: ["Global", "DeFi", "Motoko", "Rust", "Intermediate"],
    body: "Dapp initializes a set of accounts and corresponding tokens as well as enables  proposals for communal votes.",
    links: {
      action: { text: "Get Code", to: "/" },
      motoko: "/",
      rust: "/",
      docs: "/",
      youtube: "/",
    },
  },
  {
    index: 5,
    title: "Encrypted note-taking",
    image: encryptedNoteTaking,
    domains: ["Website"],
    languages: ["Motoko", "Rust", "Javascript"],
    level: ["Advanced"],
    contentType: ["Code Samples", "Documentation", "Videos", "Live Demos"],
    highlights: ["Website", "Motoko", "Rust", "Advanced"],
    body: "Create, access and modify confidential notes from multiple devices using Internet Identity and end-to-end encryption.",
    links: {
      action: { text: "Get Code", to: "/" },
      motoko: "/",
      rust: "/",
      livePreview: "/",
      docs: "/",
      youtube: "/",
    },
  },
  {
    index: 6,
    title: "Token transfer",
    image: tokenTransfer,
    domains: ["Global", "DeFi"],
    languages: ["Motoko", "Rust"],
    level: ["Advanced"],
    contentType: ["Code Samples", "Documentation"],
    highlights: ["Global", "Motoko", "Rust", "Advanced"],
    body: "Create a dapp that can transfer tokens to its most active users.",
    links: {
      action: { text: "Get Code", to: "/" },
      motoko: "/",
      rust: "/",
      docs: "/",
    },
  },
  {
    index: 7,
    title: "Actor reference",
    image: actorReference,
    domains: ["Website"],
    languages: ["Motoko"],
    level: ["Advanced"],
    contentType: ["Code Samples", "Documentation"],
    highlights: ["Website", "Motoko", "Rust", "Advanced"],
    body: "Learn how the IC management canister functions as an actor (reference).",
    links: {
      action: { text: "Get Code", to: "/" },
      motoko: "/",
      docs: "/",
    },
  },
];

function Samples(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [selectedLanguages, setSelectedLanguages] = React.useState([]);
  const [selectedDomains, setSelectedDomains] = React.useState([]);
  const [selectedLevels, setSelectedLevels] = React.useState([]);
  const [selectedContentTypes, setSelectedContentTypes] = React.useState([]);
  const [selectedSortBy, setSelectedSortBy] = React.useState("Relevance");
  const [filteredSamples, setFilteredSamples] = React.useState(sampleItems);
  const [numberOfItems, setNumberOfItems] = React.useState(16);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--ifm-color-primary",
      "#3b00b9"
    );
  }, []);
  const sortSamples = (samples) => {
    if (selectedSortBy === "Relevance") {
      samples.sort((a, b) => a.index - b.index);
    } else if (selectedSortBy === "A to Z") {
      samples.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSortBy === "Z to A") {
      samples.sort((a, b) => b.title.localeCompare(a.title));
    }
  };

  useEffect(() => {
    let tempFilteredSamples = sampleItems;
    if (selectedLanguages.length > 0) {
      tempFilteredSamples = tempFilteredSamples.filter(({ languages }) =>
        languages.some((item) => selectedLanguages.includes(item))
      );
    }
    if (selectedDomains.length > 0) {
      tempFilteredSamples = tempFilteredSamples.filter(({ domains }) =>
        domains.some((item) => selectedDomains.includes(item))
      );
    }
    if (selectedLevels.length > 0) {
      tempFilteredSamples = tempFilteredSamples.filter(({ level }) =>
        level.some((item) => selectedLevels.includes(item))
      );
    }
    if (selectedContentTypes.length > 0) {
      tempFilteredSamples = tempFilteredSamples.filter(({ contentType }) =>
        contentType.some((item) => selectedContentTypes.includes(item))
      );
    }
    sortSamples(tempFilteredSamples);
    setFilteredSamples([...tempFilteredSamples]);
  }, [
    selectedLanguages,
    selectedDomains,
    selectedLevels,
    selectedContentTypes,
    selectedSortBy,
  ]);

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.main}>
        <div className={styles.container}>
          <BGCircle className={styles.BGShape} />
          <Header />
          <FilterBar
            numberOfItems={filteredSamples.length}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            selectedDomains={selectedDomains}
            setSelectedDomains={setSelectedDomains}
            selectedLevels={selectedLevels}
            setSelectedLevels={setSelectedLevels}
            selectedContentTypes={selectedContentTypes}
            setSelectedContentTypes={setSelectedContentTypes}
            selectedSortBy={selectedSortBy}
            setSelectedSortBy={setSelectedSortBy}
          />
          <div className={styles.cards}>
            {filteredSamples.slice(0, numberOfItems).map((sample) => (
              <Card
                key={sample.index}
                image={sample.image}
                title={sample.title}
                highlights={sample.highlights}
                body={sample.body}
                links={sample.links}
              />
            ))}
          </div>
          {filteredSamples.length > numberOfItems && (
            <div
              className={styles.loadMore}
              onClick={() => setNumberOfItems(numberOfItems + 16)}
            >
              <div className={styles.plusIcon}>
                <PlusIcon />
              </div>
              <p className={styles.selectTitle}>Load more</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default Samples;
