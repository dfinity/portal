import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Header from "@site/src/components/SamplesPage/Header";
import Card from "@site/src/components/SamplesPage/Card";
import FilterBar from "@site/src/components/SamplesPage/FilterBar";
import BGCircle from "@site/static/img/purpleBlurredCircle.png";
import PlusIcon from "@site/static/img/svgIcons/plus.svg";
import { sampleItems } from "@site/src/components/Common/sampleItems";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";

function Samples(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [selectedLanguages, setSelectedLanguages] = React.useState([]);
  const [selectedDomains, setSelectedDomains] = React.useState([]);
  const [selectedLevels, setSelectedLevels] = React.useState([]);
  const [selectedContentTypes, setSelectedContentTypes] = React.useState([]);
  const [selectedSortBy, setSelectedSortBy] = React.useState("Relevance");
  const [filteredSamples, setFilteredSamples] = React.useState(sampleItems);
  const [numberOfItems, setNumberOfItems] = React.useState(16);
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
      <main className="w-full overflow-hidden">
        <AnimateSpawn variants={transitions.container}>
          <section className="w-9/10 mx-auto relative mt-20 md:mt-40 lg:mb-30">
            <img
              className="absolute pointer-events-none max-w-none w-[800px] -right-[320px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-350px] z-[-1000]"
              src={BGCircle}
              alt=""
            />
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
            <motion.div
              variants={transitions.item}
              className="relative my-11 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 transition-opacity"
            >
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
                className="flex mt-20 items-center justify-center tw-heading-6 text-infinite hover:text-black-60"
                onClick={() => setNumberOfItems(numberOfItems + 16)}
              >
                <div className="inline-block mr-2 h-6">
                  <PlusIcon />
                </div>
                <p className="mb-0">Load more</p>
              </div>
            )}
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default Samples;
