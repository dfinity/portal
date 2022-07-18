import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "@site/src/pages/samples.module.css";
import Header from "@site/src/components/SamplesPage/Header";
import Card from "@site/src/components/SamplesPage/Card";
import FilterBar from "@site/src/components/SamplesPage/FilterBar";
import BGCircle from "@site/static/img/purpleBlurredCircle.png";
import PlusIcon from "@site/static/img/svgIcons/plus.svg";
import { sampleItems } from "@site/src/components/Common/sampleItems";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";

function Samples(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [selectedLanguages, setSelectedLanguages] = React.useState([]);
  const [selectedDomains, setSelectedDomains] = React.useState([]);
  const [selectedLevels, setSelectedLevels] = React.useState([]);
  const [selectedContentTypes, setSelectedContentTypes] = React.useState([]);
  const [selectedSortBy, setSelectedSortBy] = React.useState("Relevance");
  const [filteredSamples, setFilteredSamples] = React.useState(sampleItems);
  const [numberOfItems, setNumberOfItems] = React.useState(16);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  resetNavBarStyle();

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
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={transitions.container}
          className={styles.container}
        >
          <img className={styles.BGShape} src={BGCircle} alt="" />
          <Header />
          <motion.div variants={transitions.item}>
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
          </motion.div>
          <motion.div variants={transitions.item} className={styles.cards}>
            {filteredSamples.slice(0, numberOfItems).map((sample) => (
              <Card
                key={sample.index}
                image={sample.image}
                title={sample.title}
                domain={sample.domains[0]}
                body={sample.body}
                links={sample.links}
              />
            ))}
          </motion.div>
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
        </motion.div>
      </main>
    </Layout>
  );
}

export default Samples;
