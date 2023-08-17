import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import clsx from "clsx";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { CardWithDescription } from "../components/Common/Card";
import LinkArrowDown from "../components/Common/Icons/LinkArrowDown";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import Newsletter from "../components/Common/Newsletter/Newsletter";
import ShareMeta from "../components/Common/ShareMeta";
import { Stat, StatsPanel } from "../components/Common/Stats";
import { SpringCounter } from "../components/LandingPage/PreHero/Counters";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

type Hub = {
  name: string;
  location?: string;
  description: string;
  image: string;
  link: string;
  coordinates?: [number, number];
};

const hubs: Hub[] = [
  {
    name: "Crewsphere",
    location: "India",
    description:
      "In the heart of India, Crewsphere ICP India.Hub champions the Internet Computer via bootcamps that turn talented developers into Web3 experts.",
    image: "/img/community/icp-hub-india.webp",
    link: "https://linktr.ee/crewsphere?utm_source=linktree_admin_share",
    coordinates: [20.5937, 78.9629],
  },
  {
    name: "SynergyLabs",
    location: "Malaysia/Thailand",
    description:
      "With hubs located in Thailand and Malaysia, SynergyLabs provide tools, insights, and network to foster ICP innovation.",
    image: "/img/community/icp-hub-synergylab.webp",
    link: "https://linktr.ee/SynergyLabsICP",
    coordinates: [13.7563, 100.5018],
  },
  {
    name: "ICP.Hub Italia",
    location: "Italy",
    description:
      "ICP.Hub Italia is a growing regional network for developing professional and institutional Web3 initiatives and solutions on the Internet Computer blockchain.",
    image: "/img/community/icp-hub-italia.webp",
    link: "https://icpitalia.icp.page/",
    coordinates: [41.8719, 12.5674],
  },
  {
    name: "ICP.Hub North America",
    location: "Canada / USA",
    description:
      "Hubs in North America are dedicated to accelerating mass adoption of the Internet Computer in Canada 🇨🇦 and the US 🇺🇸",
    image: "/img/community/icp-hub-north-america.webp",
    link: "https://linktr.ee/Icphubnorthamerica",
    coordinates: [54.525961, -105.255119],
  },
  {
    name: "ISLA Camp",
    location: "Philippines",
    description:
      "ISLA Camp is unleashing the potential of Web3 in the Philippines through immersive education, dynamic workshops, and hands-on bootcamps on the Internet Computer.",
    image: "/img/community/icp-hub-philippines.webp",
    link: "https://linktr.ee/ISLACamp",
    coordinates: [12.8797, 121.774],
  },
  {
    name: "ICP.Hub Middle East",
    location: "Turkey, Cyprus",
    description: "",
    image: "/img/community/icp-hub-turkey.webp",
    link: "https://linktr.ee/Icphubnorthamerica",
    coordinates: [38.9637, 35.2433],
  },
  {
    name: "DISRUPTIVES",
    location: "Indonesia",
    description:
      "ICP.Hub Indonesia is where ideas transform into innovation. DISRUPTIVES fuel ICP projects through incubation programs and resources to kickstart.",
    image: "/img/community/icp-hub-indonesia.webp",
    link: "https://linktr.ee/disruptives",
    coordinates: [-0.7893, 113.9213],
  },
  {
    name: "ICP.Hub Korea",
    location: "Korea",
    description:
      "ICP.Hub Korea is committed to advancing the Internet Computer blockchain and Web3 in Korea by regularly hosting education bootcamps and cultivating a community of developers.",
    image: "/img/community/icp-hub-korea.webp",
    link: "https://linktr.ee/icphubkorea",
    coordinates: [35.9078, 127.7669],
  },
  {
    name: "Kushite",
    location: "East Africa",
    description:
      "The Kushite ICP.Hub aims to create awareness, educate and evangelize about the Internet Computer Protocol to aspiring and existing Web3 developers in the region.",
    image: "/img/community/icp-hub-east-africa.webp",
    link: "https://linktr.ee/icpkushitehub",
    coordinates: [-1.2921, 36.8219],
  },
  {
    name: "Sahara",
    location: "West Africa",
    description:
      "ICP.Hub Sahara is a safe heaven for developers and blockchain enthusiasts to learn and build on the Internet Computer.",
    image: "/img/community/icp-hub-west-africa.webp",
    link: "https://linktr.ee/saharaicphub",
    coordinates: [9.082, 8.6753],
  },
  {
    name: "Al Shira",
    location: "Dubai",
    description:
      "The ICP.Hub GCC is a local community of Web3 enthusiasts, developers and entrepreneurs, expanding the footprint of the Internet Compute Protocol through education, community building, incubation and corporate and government collaborations.",
    image: "/img/community/icp-hub-gcc.webp",
    link: "https://linktr.ee/icphubgcc",
    coordinates: [25.276987, 55.296249],
  },
  {
    name: "LinkUp",
    location: "Germany",
    description:
      "Focusing on Web3 development, LinkUp is the go-to community hub for dreamers and creators dedicated to growing the awareness of the Internet Computer in Germany.",
    image: "/img/community/icp-hub-germany.webp",
    link: "https://linktr.ee/icp.hub_germany",
    coordinates: [51.1657, 10.4515],
  },
  {
    name: "Interlink3",
    location: "Singapore",
    description:
      "ICP.HUB Singapore, Interlink3, drives digital innovation by harnessing the power of Web3 regional entrepreneurs, venture capital and community to realise the mass adoption of the Internet Computer's decentralized cloud and blockchain services",
    image: "/img/community/icp-hub-singapore.webp",
    link: "https://linktr.ee/interlink3",
    coordinates: [1.3521, 103.8198],
  },
  {
    name: "ICP.Hub Bulgaria",
    location: "Balkans (Bulgaria)",
    description:
      "The intersection between the Internet Computer and the Balkans. This hub is building a local ICP ecosystem, educating developers and engaging with potential VCs.",
    image: "/img/community/icp-hub-bulgaria.webp",
    link: "https://linktr.ee/balkan.icp.hub",
    coordinates: [42.7339, 25.4858],
  },
  {
    name: "Nativo | ICP.Hub LatAm",
    location: "LatAm",
    description:
      "ICP Hub LATAM is an initiative to drive adoption for Internet Computer Protocol in the region of Latin America, with a focus on teaching developers and entrepeneurs how to build solutions on IC. Through bootcamps, educational content and community events through out the region.",
    image: "/img/community/icp-hub-latam.webp",
    link: "https://linktr.ee/ethicparg",
    coordinates: [-8.7832, -55.4915],
  },
];

const upcomingHubs: Hub[] = [
  {
    name: "ETH Toronto",
    description:
      "@ICPNorth is an Official Megabyte Sponsor of ETHToronto , They're contributing to accelerating the Internet Computer mass adoption",
    image: "/img/community/eth-toronto.webp",
    link: "https://twitter.com/ETH_Toronto/status/1687096585715421184",
  },
  {
    name: "Coinfest Asia",
    description:
      "Be part of the Asia's immersive Web3 festival and join these top projects and venture capital at Coinfest Asia 2023!",
    image: "/img/community/coinfest-asia.webp",
    link: "https://twitter.com/CoinfestAsia/status/1689501197642960896",
  },
  {
    name: "Web3 Conf India",
    description:
      "Super stoked to have ICP, represented by its India Hub, as a Partner for the Web3Conf India 2023!",
    image: "/img/community/web3-india.webp",
    link: "https://twitter.com/web3conf_india/status/1686272790150754304?s=46&t=znCni81w_5V68LfRCHvtZA",
  },
  {
    name: "Istanbul Blockchain Week",
    description:
      "Thrilled to announce DFINITY (ICP) as a  sponsor for #IBW23!  Witness the evolution of blockchains into...",
    image: "/img/community/istanbul-blockchain-week.webp",
    link: "https://twitter.com/istanbulblockwk/status/1687075926386110464?s=46&t=YWzpokcUePMtkg043EMwBQ",
  },
  {
    name: "Launch of ICPnnova",
    description:
      "Colledge and ICP Latam Hub launch ICPnnova, incubation program for web3 projects in Latin America",
    image: "/img/community/icpnnova.webp",
    link: "https://es.cointelegraph.com/news/colledge-and-icp-latam-hub-launch-icpnnova-incubation-programme-for-web3-projects-in-latin-america",
  },
  {
    name: "New ICP.Hub in Turkey",
    description:
      "Internet Computer (ICP), which is attracting more and more attention all over the world, is taking an important step in Turkey as ...",
    image: "/img/community/icphub-turkey.webp",
    link: "https://www.coindeskturkiye.com/yazarlar/sude-ozkan/turkiye-web3-ekosistemine-bir-yatirim-daha-internet-computer-turkiyede-icphub-kuruyor-4818",
  },
  {
    name: "Women in blockchain",
    description:
      "ICP.Hub North America is thrilled to announce a landmark partnership between the ICP.Hub North America and Women in Blockchain Canada...",
    image: "/img/community/women-in-blockchain.webp",
    link: "https://twitter.com/finbold/status/1689306088561156096",
  },
  {
    name: "ICP ecosystem in Japan",
    description:
      'NFTStudio24 announces ICP Meetup "Dev3 Japan" to introduce ICP ecosystem in Japan...',
    image: "/img/community/ecosystem-japan.webp",
    link: "https://jp.cointelegraph.com/press-releases/nftstudio24-announces-dev3-japan-an-icp-meetup-to-introduce-the-icp-ecosystem-in-japan",
  },
];

const communityGallery: {
  image: string;
  title?: string;
  description?: string;
  heightUnits: number;
}[] = [
  {
    image: "img/community/image-02.webp",
    heightUnits: 5,
  },
  {
    image: "img/community/image-01.webp",
    heightUnits: 2,
  },
  {
    image: "img/community/image-03.webp",
    heightUnits: 5,
  },

  {
    image: "img/community/image-04.webp",
    heightUnits: 4,
  },
  {
    image: "img/community/image-05.webp",
    heightUnits: 4,
  },
  {
    image: "img/community/image-06.webp",
    heightUnits: 4,
  },

  {
    image: "img/community/image-07.webp",
    heightUnits: 5,
  },
  {
    image: "img/community/image-08.webp",
    heightUnits: 5,
  },
  {
    image: "img/community/image-09.webp",
    heightUnits: 5,
  },

  {
    image: "img/community/image-10.webp",
    heightUnits: 4,
  },
  {
    image: "img/community/image-11.webp",
    heightUnits: 3,
  },
  {
    image: "img/community/image-12.webp",
    heightUnits: 3,
  },

  {
    image: "img/community/image-13.webp",
    heightUnits: 4,
  },
  {
    image: "img/community/image-14.webp",
    heightUnits: 3,
  },
  {
    image: "img/community/image-15.webp",
    heightUnits: 3,
  },

  {
    image: "img/community/image-16.webp",
    heightUnits: 2,
  },
  {
    image: "img/community/image-17.webp",
    heightUnits: 2,
  },
  {
    image: "img/community/image-18.webp",
    heightUnits: 2,
  },
  {
    image: "img/community/image-19.webp",
    heightUnits: 1,
  },
];

const CommunityGalleryImage: React.FC<{
  item: (typeof communityGallery)[0];
}> = ({ item }) => {
  return (
    <motion.div
      variants={transitions.item}
      className={clsx(
        `overflow-hidden rounded-xl flex flex-col bg-white group relative`,
        [
          "row-end-auto",
          "row-end-[span_1]",
          "row-end-[span_2]",
          "row-end-[span_3]",
          "row-end-[span_4]",
          "row-end-[span_5]",
        ][item.heightUnits]
      )}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover object-center"
      ></img>
      {/* <div className="absolute bottom-0 left-0 right-0 rounded-xl bg-white/30 backdrop-blur-md opacity-0 transition-opacity pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto text-white p-8">
        <h4 className="tw-heading-5 mb-3">{item.title}</h4>
        <p className="tw-lead-sm mb-0">{item.description}</p>
      </div> */}
    </motion.div>
  );
};

const Globe: React.FC<{
  className?: string;
}> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    let phi = 0;

    canvasRef.current.width =
      canvasRef.current.clientWidth * window.devicePixelRatio;
    canvasRef.current.height =
      canvasRef.current.clientHeight * window.devicePixelRatio;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: window.devicePixelRatio,
      width: canvasRef.current.width,
      height: canvasRef.current.height,
      phi: 0,
      theta: 0.42,
      dark: 1,
      diffuse: 1.75,
      mapSamples: 43000,
      mapBrightness: 7.3,
      baseColor: [0.23, 0.0, 0.72], // #3b00b9 with each byte represented as 0..1
      markerColor: [1, 1, 1],
      // glowColor: [0.23, 0.0, 0.72],
      glowColor: [0.8, 0.8, 0.8],
      opacity: 0.41,
      // longitude latitude
      // { location: [37.7595, -122.4367], size: 0.03 },
      markers: hubs.map((hub) => ({
        location: hub.coordinates,
        size: 0.03,
      })),
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.0025;
        state.width = canvasRef.current.clientWidth * window.devicePixelRatio;
        state.height = canvasRef.current.clientHeight * window.devicePixelRatio;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return <canvas className={className} ref={canvasRef}></canvas>;
};

const HubCard: React.FC<{
  hub: Hub;
}> = ({ hub }) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl flex flex-col bg-white"
      variants={transitions.item}
    >
      <img
        src={hub.image}
        alt={hub.name}
        loading="lazy"
        className="h-[200px] object-cover"
      />
      <div className="tw-title-navigation-on-page rounded-full mx-4 px-3 py-1 bg-white/60 backdrop-blur-2xl -translate-y-1/2 inline-flex gap-3 items-center self-start">
        {hub.location}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 13.9332L11.2998 10.6333C13.1223 8.8109 13.1223 5.85611 11.2998 4.03366C9.4774 2.21122 6.52261 2.21122 4.70017 4.03366C2.87772 5.85611 2.87772 8.8109 4.70017 10.6333L8 13.9332ZM8 15.8188L3.75736 11.5762C1.41421 9.23296 1.41421 5.434 3.75736 3.09086C6.10051 0.747709 9.89947 0.747709 12.2427 3.09086C14.5858 5.434 14.5858 9.23296 12.2427 11.5762L8 15.8188ZM8 8.66683C8.7364 8.66683 9.33333 8.0699 9.33333 7.3335C9.33333 6.59712 8.7364 6.00016 8 6.00016C7.2636 6.00016 6.66667 6.59712 6.66667 7.3335C6.66667 8.0699 7.2636 8.66683 8 8.66683ZM8 10.0002C6.52724 10.0002 5.33333 8.80623 5.33333 7.3335C5.33333 5.86074 6.52724 4.66683 8 4.66683C9.47273 4.66683 10.6667 5.86074 10.6667 7.3335C10.6667 8.80623 9.47273 10.0002 8 10.0002Z"
            fill="black"
          />
        </svg>
      </div>
      <h3 className="tw-heading-6 mb-4 mx-6">{hub.name}</h3>
      <p className="flex-1 tw-paragraph-sm text-black/60 mx-6 mb-3">
        {hub.description}
      </p>
      <p className="mb-8 mx-6">
        <Link className="button-round-icon" href={hub.link}>
          <svg
            width="16"
            height="21"
            viewBox="0 0 16 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.60718 13.9316H9.45173V20.3247H6.60718V13.9316Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.030082 7.38579H4.86365L1.42228 4.12851L3.31864 2.19604L6.59276 5.54477V0.779785H9.43732V5.54357L12.7102 2.19484L14.6066 4.12731L11.1652 7.38458H16V10.0787H11.1351L14.5922 13.4275L12.6958 15.3154L7.9994 10.6118L3.303 15.3154L1.40663 13.4275L4.86365 10.0787H0V7.38579H0.030082Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </p>
    </motion.div>
  );
};

const UpcomingHubCard: React.FC<{
  hub: Hub;
}> = ({ hub }) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl flex flex-col bg-white"
      variants={transitions.item}
    >
      <img
        src={hub.image}
        alt={hub.name}
        loading="lazy"
        className="h-[200px] object-cover"
      />
      <h3 className="tw-heading-5 mb-3 mx-6 mt-8">{hub.name}</h3>
      <p className="flex-1 tw-paragraph-sm text-black/60 mx-6 mb-11">
        {hub.description}
      </p>
      <p className="mb-8 mx-6">
        <Link className="button-outline button-small" href={hub.link}>
          Learn more
        </Link>
      </p>
    </motion.div>
  );
};

const stats: {
  title: string;
  value: string;
  fallbackValue: string;
}[][] = [
  [
    { title: "Active Countries", value: "30", fallbackValue: "" },
    { title: "Web3 Community Grants", value: "76", fallbackValue: "" },
    { title: "Events Organized", value: "20", fallbackValue: "" },
    { title: "Official ICP.Hubs", value: "15", fallbackValue: "" },
  ],

  [
    { title: "PR & Media Exposure", value: "15000000", fallbackValue: "" },
    { title: "N. of Universities", value: "32", fallbackValue: "" },
    { title: "Entrepreneurs Engaged", value: "2000", fallbackValue: "" },
    { title: "Users Onboarded", value: "25000", fallbackValue: "" },
  ],

  [
    { title: "Crypto Communities", value: "50", fallbackValue: "" },
    { title: "Ecosystem Partnerships", value: "12", fallbackValue: "" },
    { title: "Conferences Participated", value: "15", fallbackValue: "" },
    { title: "Content Created", value: "30", fallbackValue: "" },
  ],
  [
    { title: "N. of Hackathons", value: "5", fallbackValue: "" },
    { title: "Educational Courses", value: "4", fallbackValue: "" },
    { title: "Devs Trained", value: "600", fallbackValue: "" },
    { title: "Projects Incubated - MVPs", value: "60", fallbackValue: "" },
  ],
];

const FadeInOutTitle: React.FC<{
  title: string;
}> = ({ title }) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [nextTitle, setNextTitle] = useState(title);

  useEffect(() => {
    setNextTitle(title);
    const handle = setTimeout(() => {
      setCurrentTitle(title);
    }, 300);
    return () => clearTimeout(handle);
  }, [title]);

  return (
    <span className="inline-grid text-center">
      <span
        className={clsx(
          "col-start-1 row-start-1 duration-300",
          currentTitle !== nextTitle
            ? "opacity-0 transition-opacity"
            : "opacity-1 transition-none"
        )}
      >
        {currentTitle}
      </span>
      {currentTitle !== nextTitle && (
        <span className="col-start-1 row-start-1 stat-fade-in">
          {nextTitle}
        </span>
      )}
    </span>
  );
};

const rotationIndexes = [2, 0, 1, 3];

const RotatingStatPanel: React.FC<{}> = () => {
  const [activeIndexes, setActiveIndexes] = useState([0, 0, 0, 0]);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [windowFocused, setWindowFocused] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!windowFocused) {
        return;
      }

      const newActiveIndexes = [...activeIndexes];
      newActiveIndexes[rotationIndexes[rotationIndex]] =
        (newActiveIndexes[rotationIndexes[rotationIndex]] + 1) % stats.length;
      setActiveIndexes(newActiveIndexes);
      setRotationIndex((i) => (i + 1) % rotationIndexes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndexes, rotationIndex, windowFocused]);

  useEffect(() => {
    const onVisibilityChange = () => setWindowFocused(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const statsToDisplay = activeIndexes.map((index, i) => stats[index][i]);

  return (
    <StatsPanel>
      {statsToDisplay.map((stat, index) => (
        <Stat
          key={index}
          title={<FadeInOutTitle title={stat.title} />}
          titleClassName="whitespace-nowrap"
          value={
            <SpringCounter
              initialValue={+stat.value}
              initialTarget={+stat.value}
              target={+stat.value}
              format={(value) =>
                value > 1000000
                  ? `${(value / 1000000).toFixed(0)} mil`
                  : value.toString()
              }
              springConfig={[3, 1, 10]}
            />
          }
          fallbackValue={stat.fallbackValue}
        />
      ))}
    </StatsPanel>
  );
};

function CommunityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Global Community & ICP.Hubs"
      description={`Welcome to the most dynamic and innovative Web3 community in the World. Join an inspiring tribe of creators, builders & educators in a journey toward the adoption of the Internet Computer as the default blockchain.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-community.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        <section
          className=" bg-infinite text-white pt-20 relative"
          ref={heroRef}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="blob blob-purple blob-lg md:blob-xl blob-x-10 blob-y-10 md:blob-x-6 md:blob-y-10 opacity-40 md:opacity-50"></div>
          </div>
          <AnimateSpawn
            className="container-10 pt-20 md:pt-36 relative md:flex md:-mb-40"
            variants={transitions.container}
          >
            {/* <div className="md:flex-1"></div> */}
            <div className=" md:w-6/10 relative pb-[45%] sm:pb-[20%] md:pb-20 z-1">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6"
                variants={transitions.item}
              >
                Global Community <br />& ICP.Hubs
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                Welcome to the most dynamic and innovative Web3 community in the
                World. Join an inspiring tribe of creators, builders & educators
                in a journey toward the adoption of the Internet Computer as the
                default blockchain.
              </motion.p>
            </div>
            <Globe
              className="
              aspect-square
              min-w-[380px] w-[80vw]
              -mt-8
              absolute 
              -right-3/10
              bottom-0
              translate-y-1/2
              
              sm:min-w-0 
              sm:mt-0
              
              md:w-[650px]
              md:-right-20
              md:bottom-auto 
              md:-mt-60
              md:translate-y-40"
            />
          </AnimateSpawn>
        </section>
        <div className="bg-page">
          <div className="container-10 -translate-y-[110px] -mb-7 md:translate-y-10">
            <RotatingStatPanel />
          </div>
        </div>

        <AnimateSpawn
          className="container-10 md:mt-48 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-8/10">
            <motion.h2
              className="tw-heading-5 sm:tw-heading-4 md:tw-heading-60 mb-3 md:mb-6 text-gradient"
              variants={transitions.item}
            >
              Explore our global community and participate in our Web3 adoption
              programs
            </motion.h2>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 flex flex-col md:flex-row gap-5"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-education.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Education</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Dedicated educational programs in cooperation with top industry
              players. Designed to empower talented builders and initiate
              exciting journeys on the internet computer blockchain.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon" href="#education">
                Education programme
                <LinkArrowDown />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-hubs.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">ICP.hubs</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Official ICP. Hubs are the core centres of action of our vibrant
              community. Located in strategic regions of the world, these Hubs
              fuel community growth and protocol adoption across all different
              verticals, from evangelism to education, from strategic
              partnerships to projects accelerations.
            </p>
            <p className="mb-0">
              <Link className="link-primary link-with-icon" href="#hubs">
                Explore ICP.Hubs
                <LinkArrowDown />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-events.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">Community events</h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Immerse yourself in a tapestry of engaging community events and
              conferences, where our global ICP family hangs out and mingle with
              amazing forward-thinking crowds. Our gatherings are a unique
              moment to celebrate, learn, and forge longstanding connections.
            </p>
            <p className="mb-0">
              <Link
                className="link-primary link-with-icon"
                href="https://airtable.com/embed/appBKNYn6DaFccnno/shrnOms5pAnWdFjfv/tblCZBZ26gbGvPf7j?backgroundColor=purple&viewControls=on"
              >
                Upcoming events
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-10 mt-20 md:mt-48 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="md:w-5/10 md:mx-auto text-center">
            <motion.h2
              className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
              variants={transitions.item}
            >
              Join us
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead mb-0"
              variants={transitions.item}
            >
              This is the right place to make the most of your experience,
              talent, and network
            </motion.p>
          </div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 flex flex-col md:flex-row gap-5 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-launch.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">
              Launch / Join an ICP.Hub
            </h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Embark on a Journey of leadership and impact by launching a new
              ICP.Hub, or join existing operations as strategic partner. Join a
              network of global founders and entrepreneurs.
            </p>
            <p className="mb-0">
              <Link
                className="link-primary link-with-icon"
                href="https://airtable.com/shr94SzLU4XXs9cTi"
              >
                Tell us about yourself
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-grants.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">
              Go for a community grant
            </h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Turn your vision into reality. Our Web3 Community Grant Program is
              the right instrument to support your initiatives in the area of
              education, content, events & more.
            </p>
            <p className="mb-0">
              <Link
                className="link-primary link-with-icon"
                href="https://dfinity.org/community-grants/"
              >
                See documentation
                <LinkArrowUpRight />
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 card-white p-12 flex flex-col gap-3 md:gap-4 text-center items-center justify-between"
            variants={transitions.item}
          >
            <img
              src="/img/community/icon-ambassador.svg"
              alt=""
              loading="lazy"
              className="w-30"
            />
            <h3 className="tw-lead md:tw-title-sm mb-0">
              Become an ambassador
            </h3>
            <p className="mb-0 tw-paragraph-sm text-black/60">
              Contribute to promoting the Internet Computer's unique features
              and super-powers, and become a true advocate for decentralised web
              ecosystems.
            </p>
            <p className="mb-0">
              <Link className="link-primary-disabled link-with-icon">
                Coming soon
                {/* <LinkArrowUpRight /> */}
              </Link>
            </p>
          </motion.div>
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10 mt-20 md:mt-40 relative"
          el={motion.section}
          variants={transitions.container}
        >
          <div className="blob blob-infinite blob-md blob-x-10 blob-y-8 z-[-1]"></div>
          <div className="md:w-7/10">
            <motion.h2
              className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
              variants={transitions.item}
            >
              Upcoming ICP Hub initiatives and publications
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead mb-0"
              variants={transitions.item}
            >
              The DFINITY Foundation open-sourced and launched the Internet
              Computer on May 10, 2021. List of major innovations developed by
              the Foundation.
            </motion.p>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-4 gap-5 relative"
          el={motion.section}
          variants={transitions.container}
        >
          {upcomingHubs.map((hub) => (
            <UpcomingHubCard hub={hub} />
          ))}
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10 pt-52 md:pt-[400px] relative mb-20"
          el={motion.section}
          variants={transitions.container}
          id="hubs"
        >
          <div className="md:w-7/10 md:mx-auto text-center text-white relative">
            <div className="blob blob-purple blob-xl blob-x-5 blob-y-5 z-[-1] opacity-75 md:opacity-95"></div>

            <motion.h2
              className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
              variants={transitions.item}
            >
              Official ICP.Hubs
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead-sm mb-0 md:w-8/10 md:mx-auto"
              variants={transitions.item}
            >
              We are building communities in these areas all around the globe
              and it would be nice to have a two line sentence here
            </motion.p>

            <motion.div
              variants={transitions.fadeIn}
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-[-1] [mask-image:linear-gradient(to_bottom,black_40%,transparent_60%)]"
            >
              <Globe className="w-[320px] md:w-[660px] aspect-square" />
            </motion.div>
          </div>
        </AnimateSpawn>
        <AnimateSpawn
          className="container-12 mt-6 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 relative"
          el={motion.section}
          variants={transitions.container}
        >
          {hubs.map((hub) => (
            <HubCard hub={hub} />
          ))}
        </AnimateSpawn>

        <AnimateSpawn
          className="container-10 pt-20 md:pt-40 relative"
          el={motion.section}
          variants={transitions.container}
          id="education"
        >
          {/* <div className="blob blob-infinite blob-md blob-x-0 blob-y-8 z-[-1]"></div> */}
          <div className="md:w-8/10 md:mx-auto text-center mb-10 md:mb-12">
            <motion.h2
              className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
              variants={transitions.item}
            >
              Educational Programmes
            </motion.h2>
            <motion.p
              className="tw-paragraph md:tw-lead mb-0"
              variants={transitions.item}
            >
              Dedicated educational programs in cooperation with top industry
              players. Designed to empower talented builders and initiate
              exciting journeys on the Internet Computer blockchain.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <motion.div
              className="card-white flex flex-col justify-between gap-6 py-8 px-6"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 flex justify-between items-start gap-3 mb-0">
                Internet Computer
                <img src="/img/community/education.svg" alt="" />
              </h3>
              <p className="flex-1 mb-0 tw-paragraph text-black/60">
                In this community, you will learn essential Internet Computer
                concepts, how to write smart contracts (canisters) and create
                dapps.
              </p>
              <p className="mb-0">
                <Link
                  className="link-primary link-with-icon"
                  href="https://dacade.org/communities/icp"
                >
                  View Programme <LinkArrowUpRight />
                </Link>
              </p>
            </motion.div>

            <motion.div
              className="card-white flex flex-col justify-between gap-6 py-8 px-6"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 flex justify-between items-start gap-3 mb-0">
                IC Rust Bootcamp
                <img src="/img/community/education.svg" alt="" />
              </h3>
              <p className="flex-1 mb-0 tw-paragraph text-black/60">
                Welcome to the Internet Computer Rust Bootcamp! Unleashing the
                Power of Decentralized Web Development!
              </p>
              <p className="mb-0">
                <Link
                  className="link-primary link-with-icon"
                  href="https://www.risein.com/bootcamps/internet-computer-rust-bootcamp"
                >
                  View Programme <LinkArrowUpRight />
                </Link>
              </p>
            </motion.div>

            <motion.div
              className="card-white flex flex-col justify-between gap-6 py-8 px-6"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 flex justify-between items-start gap-3 mb-0">
                ICP Developer Program
                <img src="/img/community/education.svg" alt="" />
              </h3>
              <p className="flex-1 mb-0 tw-paragraph text-black/60">
                During the next 4 weeks we want you to have an incredible
                experience on your way to learn to develop within the Internet
                Computer.
              </p>
              <p className="mb-0">
                <Link
                  className="link-primary link-with-icon"
                  href="https://icp-esp.gitbook.io/icp-developer/lineamientos-certificacion/programa-icp-developer"
                >
                  View Programme <LinkArrowUpRight />
                </Link>
              </p>
            </motion.div>

            <motion.div
              className="card-white flex flex-col justify-between gap-6 py-8 px-6"
              variants={transitions.item}
            >
              <h3 className="tw-heading-5 flex justify-between items-start gap-3 mb-0">
                ICP
                <br />
                Developer II
                <img src="/img/community/education.svg" alt="" />
              </h3>
              <p className="flex-1 mb-0 tw-paragraph text-black/60">
                This certification is a continuation of the ICP Developer I
                certification for the development of backend Canisters with
                Motoko.
              </p>
              <p className="mb-0">
                <Link
                  className="link-primary link-with-icon"
                  href="https://icp-esp.gitbook.io/icp-developer-ii/"
                >
                  View Programme <LinkArrowUpRight />
                </Link>
              </p>
            </motion.div>
          </div>
        </AnimateSpawn>

        <section className="container-12 relative mt-30 md:mt-60">
          <AnimateSpawn
            className=" relative text-white"
            variants={transitions.container}
          >
            <motion.div
              className="blob blob-purple blob-sm blob-x-5 blob-y-7 z-[-1] md:blob-xl"
              variants={transitions.fadeIn}
            ></motion.div>
            <motion.h2
              className="tw-heading-3 text-center mb-2 w-full mx-auto md:tw-heading-60 md:mb-6 lg:w-6/12"
              variants={transitions.item}
            >
              Get familiar with the Internet Computer
            </motion.h2>
          </AnimateSpawn>

          <AnimateSpawn
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
            variants={transitions.container}
          >
            <CardWithDescription
              title="Join the community telegram channels"
              description=""
              href=""
            />

            <CardWithDescription
              title="Follow us on Twitter for more"
              description=""
              href=""
            />
            <CardWithDescription
              title="Join our latest global events"
              description=""
              href=""
            />
          </AnimateSpawn>
        </section>

        <section className="bg-infinite text-white my-20 md:my-40 py-20 md:py-40">
          <AnimateSpawn
            className="container-10   relative"
            el={motion.section}
            variants={transitions.container}
          >
            <div className="blob blob-white blob-md blob-x-10 blob-y-0"></div>
            <div className="md:w-7/10">
              <motion.h2
                className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
                variants={transitions.item}
              >
                Our Global Community
              </motion.h2>
              <motion.p
                className="tw-paragraph md:tw-lead mb-0"
                variants={transitions.item}
              >
                Welcome to our vibrant global community where people from all
                corners of the world come together to connect, collaborate, and
                create.
              </motion.p>

              {/* <p className="mb-0 flex flex-col md:flex-row gap-8 items-start md:items-center">
                <MotionLink
                  className="button-outline-white"
                  variants={transitions.item}
                >
                  Subscribe for alerts
                </MotionLink>
                <MotionLink
                  className="link-white link-with-icon"
                  variants={transitions.item}
                >
                  Propose an event <LinkArrowUpRight />
                </MotionLink>
              </p> */}
            </div>
          </AnimateSpawn>

          <AnimateSpawn
            className="container-12 mt-10 md:mt-15 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[minmax(20px,auto)] justify-center"
            el={motion.section}
            variants={transitions.container}
          >
            {communityGallery.map((item) => (
              <CommunityGalleryImage item={item} />
            ))}
          </AnimateSpawn>
        </section>

        <Newsletter
          fields={[
            {
              name: "EMAIL",
              placeholder: "Email",
              type: "email",
              required: true,
            },
          ]}
          ctaLabel="Get updates!"
          postUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0"
          decoration={
            <img
              src="/img/newsletter/email-image-1.webp"
              alt=""
              loading="lazy"
            />
          }
          className="mb-20"
        >
          <h2 className="text-white tw-heading-5 md:tw-heading-4 mb-6 md:mb-8">
            Want to meet ICP enthusiasts IRL?
            <br />
            <span className="text-white-60">
              Sign up for event updates to stay connected
            </span>
          </h2>
        </Newsletter>
      </main>
    </Layout>
  );
}

export default CommunityPage;
