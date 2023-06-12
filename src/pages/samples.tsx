import React, { useEffect, useRef } from "react";
import Layout from "@theme/Layout";
import Header from "@site/src/components/SamplesPage/Header";
import Card from "@site/src/components/SamplesPage/Card";
import FilterBar from "@site/src/components/SamplesPage/FilterBar";
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
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import communityProjects from "@site/community/communityProjects";

import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import clsx from "clsx";
import { useQueryParam } from "../utils/use-query-param";
import ShareMeta from "../components/Common/ShareMeta";

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

const serializeStringList = (a: string[]) =>
  a.length === 0 ? undefined : a.join(",");
function deserializeStringList<T extends string>(s: string): T[] {
  return s.trim().length > 0 ? (s.split(",") as T[]) : [];
}

function Samples(): React.ReactNode {
  const [searchTerm, setSearchTerm, queryParamInitialized] =
    useQueryParam<string>("term", "", {
      serialize: (a) => (a === "" ? undefined : a),
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
    <Layout
      title={"Sample Code"}
      description={
        "Learn how projects are built on the Internet Computer to be secure and efficient. Dive into official examples or into open source community projects to figure out how things work under the hood."
      }
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-samples.jpeg"></ShareMeta>

      <main className="w-full overflow-hidden">
        <AnimateSpawn variants={transitions.container}>
          <section className="max-w-page w-9/10 mx-auto relative mt-20 md:mt-40 lg:mb-30">
            <img
              className="absolute pointer-events-none max-w-none w-[800px] -right-[320px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-350px] z-[-1000]"
              src={BGCircle}
              alt=""
            />
            <Header />
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

            <motion.div
              variants={transitions.item}
              className="mt-10 flex flex-col md:flex-row items-center relative"
            >
              <img
                className="absolute pointer-events-none max-w-none w-[800px] -right-[320px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-350px] z-[-1000]"
                src={BGCircleCommunity}
                alt=""
              />
              <div className="md:w-2/3 md:ml-1/12">
                <p className="md:w-6/10 tw-heading-6 md:tw-heading-5">
                  Community samples
                </p>
                <p className="md:w-6/10 tw-paragraph">
                  The Internet Computer is home to many dapps built by the
                  community. Check out the repos and get building!
                </p>
                {/*<p className="inline-flex tw-title-navigation-on-page border-black-60 border-2 border-solid py-2 px-3 rounded-xl hover:text-white hover:bg-infinite transition-colors">
                  Submit your Repo
                </p>*/}
              </div>
              <div className="w-full md:w-4/10 md:mr-1/12">
                <p className="mt-6 md:mt-0 tw-paragraph-sm text-black-60">
                  Disclamer: Please use the following sample code at your own
                  risk and always do your own research.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="relative my-14 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 transition-opacity"
            >
              {filteredCommunitySamples
                .slice(0, numberOfCommunityItems)
                .map((sample) => (
                  <CommunityProjectCard project={sample} />
                ))}
            </motion.div>
            {filteredCommunitySamples.length > numberOfCommunityItems && (
              <div
                className="flex mt-20 items-center justify-center tw-heading-6 text-infinite hover:text-black-60"
                onClick={() =>
                  setNumberOfCommunityItems(numberOfCommunityItems + 40)
                }
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
