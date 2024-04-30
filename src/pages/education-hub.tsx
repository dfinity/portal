import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import Header from "@site/src/components/SamplesPage/Header";
import Card from "@site/src/components/SamplesPage/Card";
import FilterBar from "@site/src/components/EducationHubPage/FilterBar";
import BGCircle from "@site/static/img/purpleBlurredCircle.webp";
import BGCircleCommunity from "@site/static/img/samples/purplePinkBlur.png";
import PlusIcon from "@site/static/img/svgIcons/plus.svg";
import {
  SampleContentType,
  SampleDomain,
  SampleItem,
  sampleItems,
  SampleLanguage,
  SampleLevel,
} from "@site/src/components/Common/sampleItems";
import communityProjects from "@site/community/communityProjects";
import {
  deserializeStringList,
  serializeStringList,
  useQueryParam,
} from "../utils/use-query-param";
import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LinkCardsSection from "../components/Common/LinkCardsSection";
import ShareMeta from "../components/Common/ShareMeta";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import VideoCard from "../components/Common/VideoCard/index";
// import youtubeData from "@site/.docusaurus/youtube/default/youtube.json";
import { NewsCard } from "../components/NewsPage/Cards";
import clsx from "clsx";
import CodeBlockString from "../theme/CodeBlock/Content/String";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const MotionLink = motion(Link);
const CommunityProjectCard: React.FC<{ project: SampleItem }> = ({
  project,
}) => {
  return (
    <Card
      image={
        !project.image
          ? require(`../../static/img/samples/default.gif`).default
          : project.image
      }
      title={project.title}
      domain={project.domains[0]}
      body={project.body}
      links={project.links}
    />
  );
};

function filterSamples(
  samples: SampleItem[],
  selectedLanguages: SampleLanguage[],
  selectedDomains: SampleDomain[],
  selectedLevels: SampleLevel[],
  selectedContentTypes: SampleContentType[],
  searchTerm: string
): SampleItem[] {
  if (selectedLanguages.length > 0) {
    samples = samples.filter(({ languages }) =>
      languages?.some((item) => selectedLanguages.includes(item))
    );
  }
  if (selectedDomains.length > 0) {
    samples = samples.filter(({ domains }) =>
      domains?.some((item) => selectedDomains.includes(item))
    );
  }
  if (selectedLevels.length > 0) {
    samples = samples.filter(({ level }) => selectedLevels.includes(level));
  }
  if (selectedContentTypes.length > 0) {
    samples = samples.filter(({ contentType }) =>
      contentType?.some((item) => selectedContentTypes.includes(item))
    );
  }

  if (searchTerm.trim() !== "") {
    const term = searchTerm.trim().toLowerCase();
    samples = samples.filter(
      ({ body, title }) =>
        body.toLowerCase().includes(term) || title.toLowerCase().includes(term)
    );
  }
  return samples;
}

function EducationHubPage() {
  const fontLoaded = useFontsLoaded();
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
  const [searchTerm, setSearchTerm, queryParamInitialized] =
    useQueryParam<string>("term", "", {
      serialize: (a) => (a === "" ? undefined : a),
      deserialize: (s) => s,
    });
  const [selectedLanguages, setSelectedLanguages] = useQueryParam<
    SampleLanguage[]
  >("selectedLanguages", [], {
    serialize: serializeStringList,
    deserialize: deserializeStringList,
  });
  const [selectedDomains, setSelectedDomains] = useQueryParam<SampleDomain[]>(
    "selectedDomains",
    [],
    {
      serialize: serializeStringList,
      deserialize: deserializeStringList,
    }
  );
  const [selectedLevels, setSelectedLevels] = useQueryParam<SampleLevel[]>(
    "selectedLevels",
    [],
    {
      serialize: serializeStringList,
      deserialize: deserializeStringList,
    }
  );
  const [selectedContentTypes, setSelectedContentTypes] = useQueryParam<
    SampleContentType[]
  >("selectedContentTypes", [], {
    serialize: serializeStringList,
    deserialize: deserializeStringList,
  });

  const sampleStartRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (
      queryParamInitialized &&
      (selectedLanguages.length > 0 ||
        selectedDomains.length > 0 ||
        selectedLevels.length > 0 ||
        selectedContentTypes.length > 0 ||
        searchTerm.length > 0)
    ) {
      window.scrollTo({
        top:
          window.scrollY +
          sampleStartRef.current.getBoundingClientRect().top -
          50,
      });
    }
  }, [queryParamInitialized]);

  const [selectedSortBy, setSelectedSortBy] = React.useState("Relevance");
  const [filteredSamples, setFilteredSamples] = React.useState(sampleItems);
  const [filteredCommunitySamples, setFilteredCommunitySamples] =
    React.useState(communityProjects);
  const [numberOfItems, setNumberOfItems] = React.useState(16);
  const [numberOfCommunityItems, setNumberOfCommunityItems] =
    React.useState(40);

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
    let tempFilteredSamples = filterSamples(
      communityProjects,
      selectedLanguages,
      selectedDomains,
      selectedLevels,
      selectedContentTypes,
      searchTerm
    );
    sortSamples(tempFilteredSamples);
    setFilteredCommunitySamples([...tempFilteredSamples]);

    tempFilteredSamples = filterSamples(
      sampleItems,
      selectedLanguages,
      selectedDomains,
      selectedLevels,
      selectedContentTypes,
      searchTerm
    );
    sortSamples(tempFilteredSamples);
    setFilteredSamples([...tempFilteredSamples]);
  }, [
    selectedLanguages,
    selectedDomains,
    selectedLevels,
    selectedContentTypes,
    searchTerm,
  ]);

  return (
    <Layout title="Education Hub" description="Education page.">
      <ShareMeta image=""></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <section
          className="text-white pt-20 mb-[10vw] lg:mb-3"
          style={{
            background:
              "var(--gradient-dark-purple, linear-gradient(54deg, #3B00B9 0%, #D38ED7 131.95%)",
          }}
          ref={heroRef}
        >
          <div className="container-10 pt-20 pb-12 sm:pb-40 md:pb-40 md:pt-36 relative z-10">
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-8/10 "
              variants={transitions.item}
            >
              ICP Education Hub
            </motion.h1>
            <div className="relative  md:w-5/10">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Description of what this page is and all the education topics
                available
              </motion.p>
              {/* <MotionLink
                className="button-white"
                href="/ai"
                target="_blank"
                rel="noopener noreferrer"
                variants={transitions.item}
              >
                EXPLORE AI ON ICP
              </MotionLink> */}
            </div>
          </div>
          <div className="container-12 relative z-1 h-[200px] md:h-0 pointer-events-none">
            <div className="absolute w-10/12 sm:w-5/12 left-1/2 translate-y-1/2 -translate-x-[50%] bottom-1/2 md:left-0 md:absolute md:w-5/12 md:bottom-0 md:translate-x-[130%] md:translate-y-2/12">
              <img
                src="/img/education-hub/education-hero.svg"
                alt="Start building on Internet Identity"
                className="w-full max-w-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>
        <section className="container-10 mt-24">
          <motion.h3 className="tw-heading-5 md:tw-heading-4">
            Courses
          </motion.h3>

          <AnimateSpawn variants={transitions.container}>
            <section className="container-10 relative mt-20 md:mt-40 lg:mb-30">
              <motion.div variants={transitions.item} className="md:ml-1/12">
                <FilterBar
                  numberOfItems={
                    filteredSamples.length + filteredCommunitySamples.length
                  }
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
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </motion.div>
              <motion.div
                variants={transitions.item}
                className="mt-12 md:ml-1/12"
                ref={sampleStartRef}
              >
                <p className="tw-heading-6 md:tw-heading-5">Featured samples</p>

                {filteredSamples.length === 0 && (
                  <p className="tw-paragraph text-black-60">
                    No featured samples available
                  </p>
                )}
              </motion.div>
              <motion.div
                variants={transitions.item}
                className={clsx(
                  "relative mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 transition-opacity",
                  filteredSamples.length === 0 ? "" : "mt-11 mb-20"
                )}
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
        </section>
      </main>
    </Layout>
  );
}

export default EducationHubPage;
