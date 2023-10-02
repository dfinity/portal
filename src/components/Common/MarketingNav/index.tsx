import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Search from "@site/src/theme/SearchBar";
import clsx from "clsx";
import React, { useEffect } from "react";
import LinkArrowLeft from "../Icons/LinkArrowLeft";
import LinkArrowUpRight from "../Icons/LinkArrowUpRight";

type SectionItem = {
  name: string;
  href: string;
  description: string;
};

type FeaturedItem = {
  title: string;
  href: string;
  image: string;
};

type Section = {
  name: string;
  items: SectionItem[];
  featured: FeaturedItem;
};

type NavItem = {
  name: string;
  auxItems?: {
    name: string;
    href: string;
  }[];
  sections: Section[];
};

const nav: NavItem[] = [
  {
    name: "Learn",
    auxItems: [
      {
        name: "ICP Dashboard",
        href: "https://dashboard.internetcomputer.org/",
      },
      { name: "ICP on Youtube", href: "https://www.youtube.com/c/DFINITY" },
      { name: "ICP Wiki", href: "https://wiki.internetcomputer.org/" },
      { name: "Whitepaper", href: "/whitepaper.pdf" },
      {
        name: "History of ICP",
        href: "https://wiki.internetcomputer.org/wiki/History",
      },
    ],

    sections: [
      {
        name: "Start Here",
        items: [
          {
            name: "The Basics",
            href: "/basics",
            description: "You new to ICP? Read this first",
          },
          {
            name: "What is ICP",
            href: "/what-is-the-ic",
            description: "In-depth look into the blockchain",
          },
          {
            name: "How it works",
            href: "/how-it-works",
            description: "How the Internet Computer works",
          },
          {
            name: "Roadmap",
            href: "/roadmap",
            description: "Next steps in development",
          },
          {
            name: "Sustainability",
            href: "/capabilities/sustainability",
            description: "Building green, efficient tech",
          },
        ],
        featured: {
          title: "Building green, efficient tech",
          href: "/capabilities/sustainability",
          image: "/img/nav/featured-sustainability.webp",
        },
      },
      {
        name: "Capabilities",
        items: [
          {
            name: "All Capabilities",
            href: "/capabilities",
            description: "Get to know all possibilities",
          },
          {
            name: "Bitcoin <> ICP",
            href: "/bitcoin-integration",
            description: "Using Bitcoin at the speed of chat",
          },
          {
            name: "Ethereum <> ICP",
            href: "/ethereum-integration",
            description: "Native ETH on Internet Computer",
          },
          {
            name: "Identity on ICP",
            href: "/internet-identity",
            description: "One secure identity for all services",
          },
          {
            name: "HTTPS Outcalls",
            href: "/https-outcalls",
            description: "Connecting Smart Contracts to Web2",
          },
        ],
        featured: {
          title: "Full web experience on chain",
          href: "/https-outcalls",
          image: "/img/nav/featured-https-outcalls.webp",
        },
      },
    ],
  },
  {
    name: "Use",
    auxItems: [
      {
        name: "Create an internet identity",
        href: "https://identity.ic0.app/",
      },
      { name: "NNS and Staking", href: "https://nns.ic0.app/" },
    ],

    sections: [
      {
        name: "Step into Web3",
        items: [
          {
            name: "Ecosystem",
            href: "/ecosystem",
            description: "Enter the ICP ecosystem",
          },
          {
            name: "ICP Token",
            href: "/icp-tokens",
            description: "Use native utility token ",
          },
          {
            name: "Staking and Governance (NNS)",
            href: "/nns",
            description: "Govern ICP and get rewards",
          },
          {
            name: "Create an Internet Identity",
            href: "/internet-identity",
            description: "Securely connect to dapps",
          },
        ],
        featured: {
          title: "Enter the ICP ecosystem",
          href: "/ecosystem",
          image: "/img/nav/featured-ecosystem.webp",
        },
      },
      {
        name: "Use cases",
        items: [
          {
            name: "Open Internet Sevices (SNS DAOs)",
            href: "/sns",
            description: "Web 3.0 builds on Web3",
          },
          {
            name: "Multi-chain",
            href: "/ckbtc",
            description: "Vision of the World Computer",
          },
          {
            name: "Social Media Dapps",
            href: "/social-media-dapps",
            description: "Full ownership and control over your profiles",
          },
          {
            name: "DeFi",
            href: "/defi",
            description: "Everything on-chain",
          },
          {
            name: "NFTs",
            href: "/nfts",
            description: "Go way beyond “overpriced links to JPGs”",
          },
        ],
        featured: {
          title: "Ethereum Integration",
          href: "/ethereum-integration",
          image: "/img/nav/featured-eth-integration.webp",
        },
      },
    ],
  },
  {
    name: "Develop",
    auxItems: [
      {
        name: "Help & Support",
        href: "",
      },
      { name: "Developer grants", href: "" },
    ],

    sections: [
      {
        name: "Start Coding",
        items: [
          {
            name: "Developer Docs",
            href: "/docs/current/home",
            description: "The docs for developers",
          },
          {
            name: "Developer Journey Series",
            href: "",
            description: "Build step by step",
          },
          {
            name: "Sample code",
            href: "/samples",
            description: "Check out the sample code",
          },
        ],
        featured: {
          title: "Learn to build step by step",
          href: "",
          image: "/img/nav/featured-docs.webp",
        },
      },
    ],
  },
  {
    name: "Participate",
    auxItems: [
      {
        name: "Community grants",
        href: "https://dfinity.org/community-grants/",
      },
      { name: "Feedback board", href: "" },
      { name: "Blog", href: "https://medium.com/dfinity" },
    ],

    sections: [
      {
        name: "Get Involved",
        items: [
          {
            name: "ICP community",
            href: "/community",
            description: "Welcome to our global ICP community",
          },
          {
            name: "Education",
            href: "",
            description: "Content is yet to be defined",
          },
          {
            name: "Events",
            href: "https://dfinity.org/news-and-events/",
            description: "Meet tech minded people",
          },
        ],
        featured: {
          title: "Join the ICP community",
          href: "/community",
          image: "/img/nav/featured-community.webp",
        },
      },
    ],
  },
];

const Arrow: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <div className="w-3 h-3 relative">
      <span
        className={clsx(
          "absolute left-[5px] top-0 w-[2px] h-full bg-infinite transition-transform",
          open ? "rotate-90" : ""
        )}
      ></span>
      <span
        className={clsx(
          "absolute top-[5px] left-0 h-[2px] w-full bg-infinite transition-opacity",
          open ? "opacity-0" : ""
        )}
      ></span>
    </div>
  );
};

const FeaturedArrowRight = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group-hover/featured:-translate-y-2 transition-transform"
    >
      <path
        d="M13.5008 12L6.50044 4.99969L8.50012 3L17.5001 12L8.50012 21L6.50044 19.0003L13.5008 12Z"
        fill="white"
      />
    </svg>
  );
};

const Drawer: React.FC<{
  title: string;
  children?: React.ReactNode;
  startingState?: boolean;
}> = ({ title, children, startingState = false }) => {
  const [open, setOpen] = React.useState(startingState);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateHeight();

    function updateHeight() {
      if (open) {
        ref.current.style.maxHeight = ref.current.scrollHeight + "px";
      } else {
        ref.current.style.maxHeight = "0px";
      }
    }
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [open]);

  return (
    <div className="">
      <button
        className="w-full flex justify-between items-center bg-transparent appearance-none border-none p-0 font-circular text-infinite"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="font-medium text-heading-4">{title}</div>

        <Arrow open={open} />
      </button>
      <div
        ref={ref}
        className={clsx(
          "transition-all overflow-hidden pb-6",
          open ? "max-h-none" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const MarketingNav = () => {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [secondaryMobileNavOpen, setSecondaryMobileNavOpen] = React.useState<
    false | number
  >(false);
  const [selectedSection, setSelectedSection] = React.useState<Section | null>(
    nav[0].sections[0]
  );

  const { siteConfig } = useDocusaurusContext();
  const hiddenRef = React.useRef(false);
  const lastScrollPosRef = React.useRef(0);
  const navbarRef = React.useRef<HTMLElement>(null);
  const hideOnScroll = (siteConfig.themeConfig as any).navbar
    .hideOnScroll as boolean;

  useEffect(() => {
    function onScroll() {
      // if not hidden and page is scrolled down, translate y to -100%
      // if hidden and page is scrolled up, translate y to 0

      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > lastScrollPosRef.current;

      if (isScrollingDown && !hiddenRef.current && currentScrollPos > 100) {
        hiddenRef.current = true;

        if (navbarRef.current) {
          navbarRef.current.style.transform = "translateY(-100%)";
        }
      } else if (!isScrollingDown && hiddenRef.current) {
        hiddenRef.current = false;

        if (navbarRef.current) {
          navbarRef.current.style.transform = "translateY(0)";
        }
      }

      lastScrollPosRef.current = currentScrollPos;
    }

    if (hideOnScroll) {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      if (hideOnScroll) {
        window.removeEventListener("scroll", onScroll);
        document.querySelector("body")!.style.overflow = "unset";
      }
    };
  }, []);

  // mobile nav side drawer
  const mobileNavClasses = mobileNavOpen
    ? "translate-x-0 pointer-events-auto"
    : "-translate-x-full pointer-events-none";

  const secondaryMobileNavClasses =
    secondaryMobileNavOpen !== false && mobileNavOpen
      ? "translate-x-0 pointer-events-auto"
      : "-translate-x-full pointer-events-none";

  function closeNav() {
    setMobileNavOpen(false);

    document.querySelector("body")!.style.overflow = "unset";
  }

  function openNav() {
    setMobileNavOpen(true);
    setSecondaryMobileNavOpen(false);
    document.querySelector("body")!.style.overflow = "hidden";
  }

  function toggleNav() {
    if (mobileNavOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  function showFlyout(item: NavItem) {
    setSelectedSection(item.sections[0]);
  }

  function openSecondaryMobileNav(index: number) {
    setSecondaryMobileNavOpen(index);
  }

  return (
    <>
      <nav
        className="navbar text-black flex justify-between bg-page dark-hero:bg-transparent sticky top-0 transition-transform"
        ref={navbarRef}
      >
        <Link href="/" className="self-center">
          <img src="/img/logo-notext.svg" alt="" className="h-5 md:h-7" />
        </Link>

        <div className="hidden md:flex gap-4 items-center">
          {nav.map((item) => (
            <div
              className="border-none bg-transparent px-4 py-[2px] text-black dark-hero:text-white m-0 font-medium text-paragraph rounded-full group hover:bg-black/20 hover:dark-hero:bg-white/20 cursor-pointer"
              key={item.name}
              onMouseEnter={() => showFlyout(item)}
            >
              {item.name}

              <div className="absolute z-[1000] top-20 left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none invisible group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible">
                <div className="shadow-2xl dark-hero:shadow-none bg-white rounded-3xl overflow-hidden hidden md:flex flex-col">
                  <div className="flex-1 flex">
                    {item.sections.length > 1 && (
                      <div className="bg-[#F1EEF5] p-6 flex flex-col gap-3 items-stretch min-w-[220px]">
                        {item.sections.map((section) => (
                          <button
                            key={section.name}
                            onMouseEnter={() => setSelectedSection(section)}
                            onClick={() => setSelectedSection(section)}
                            className={`text-left appearance-none border-none rounded-xl font-circular font-medium text-[16px] leading-[22px] px-4 py-6 ${
                              selectedSection === section
                                ? "text-infinite bg-white"
                                : "text-[#666] bg-transparent"
                            }`}
                          >
                            {section.name}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-1 pl-8 pr-6 py-6 bg-white">
                      <div className="flex-1 flex flex-col gap-5 min-w-[256px] pr-6">
                        {selectedSection.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="text-black hover:no-underline group/item hover:text-infinite flex flex-col"
                          >
                            <span className="font-medium text-[16px] leading-[22px]">
                              {item.name}
                            </span>

                            <span className="text-[14px] leading-[22px] font-normal text-black/60 group-hover/item:text-infinite">
                              {item.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                      {selectedSection.featured && (
                        <div className="flex-1 pl-6">
                          <Link
                            style={{
                              backgroundImage: `url(${selectedSection.featured.image})`,
                            }}
                            className="bg-cover bg-center aspect-video rounded-xl flex w-[300px] p-6 group/featured hover:no-underline"
                            href={selectedSection.featured.href}
                          >
                            <span className="text-[24px] leading-[26px] font-bold text-white flex-1 group-hover/featured:-translate-y-2 transition-transform">
                              {selectedSection.featured.title}
                            </span>

                            <FeaturedArrowRight />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#FAFAFA] py-6 px-10 flex gap-8 items-center">
                    {item.auxItems.map((item) => (
                      <Link
                        className="font-bold text-[11px] uppercase whitespace-nowrap flex items-center gap-1"
                        key={item.name}
                      >
                        {item.name}
                        <LinkArrowUpRight className="w-[14px]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <Search />
          <button
            className="md:hidden flex flex-col gap-2 border-none bg-transparent w-6 h-6 p-0 justify-center"
            onClick={toggleNav}
          >
            <span className="bg-white h-[2px] w-full shrink-0"></span>
            <span className="bg-white h-[2px] w-full shrink-0"></span>
            <span className="bg-white h-[2px] w-full shrink-0"></span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-white z-[1000] p-6 transition-transform ${mobileNavClasses}`}
      >
        <div className="flex items-center justify-between">
          <img src="/img/logo-notext.svg" alt="" className="h-5" />
          <button
            className="appearance-none border-none bg-transparent"
            onClick={closeNav}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L18 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="square"
              />
              <path
                d="M18.5 2L2.5 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </div>

        <ul className="list-none p-0 flex flex-col gap-4 mt-12">
          {nav.map((item, index) => (
            <li className="p-0" key={item.name}>
              <button
                className="border-none bg-transparent p-0 text-infinite m-0 font-circular font-medium text-heading-4"
                onClick={() => openSecondaryMobileNav(index)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`overflow-auto touch-none fixed inset-0 bg-white z-[1000] p-6 transition-transform ${secondaryMobileNavClasses}`}
      >
        <div className="flex items-center justify-between">
          <button
            className="flex gap-6 text-navigation font-medium font-circular bg-transparent p-0 text-left border-none"
            onClick={() => setSecondaryMobileNavOpen(false)}
          >
            <LinkArrowLeft />
            Home
          </button>
          <button
            className="appearance-none border-none bg-transparent"
            onClick={closeNav}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L18 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="square"
              />
              <path
                d="M18.5 2L2.5 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </div>

        {secondaryMobileNavOpen !== false && (
          <>
            <ul className="list-none p-0 flex flex-col gap-3 mt-12">
              {nav[secondaryMobileNavOpen].sections.map((item, index) => (
                <li className="p-0" key={item.name}>
                  <Drawer title={item.name} startingState={index === 0}>
                    <ul className="list-none p-0 flex flex-col gap-3 mt-4">
                      {item.items.map((item) => (
                        <li className="p-0" key={item.name}>
                          <Link
                            className="border-none bg-transparent p-0 text-infinite m-0 font-circular font-medium text-navigation hover:no-underline hover:text-black"
                            href={item.href}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {item.featured && (
                      <Link
                        href={item.featured.href}
                        className="mt-6 h-30 w-full bg-center bg-cover relative p-6 no-underline hover:no-underline rounded-xl flex"
                        style={{
                          backgroundImage: `url(${item.featured.image})`,
                        }}
                      >
                        <span className="text-white tw-heading-5 flex-1">
                          {item.featured.title}
                        </span>
                        <FeaturedArrowRight />
                      </Link>
                    )}
                  </Drawer>
                </li>
              ))}
            </ul>
            {nav[secondaryMobileNavOpen].auxItems && (
              <ul className="list-none p-0 flex flex-col gap-4 mt-8 mb-12 pt-4 border-0 border-t border-solid border-grey-300">
                {nav[secondaryMobileNavOpen].auxItems.map((item) => (
                  <li>
                    <Link
                      href={item.href}
                      className="text-[#522785] font-medium text-navigation inline-flex gap-4 items-center hover:no-underline hover:text-black"
                    >
                      {item.name}

                      <LinkArrowUpRight className="w-[14px]" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MarketingNav;
