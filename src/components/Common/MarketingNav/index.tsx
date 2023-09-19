import Link from "@docusaurus/Link";
import Search from "@site/src/theme/SearchBar";
import React from "react";
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
      { name: "ICP on YOutube", href: "https://www.youtube.com/c/DFINITY" },
      { name: "ICP Wiki", href: "https://wiki.internetcomputer.org/" },
      { name: "Whitepaper", href: "https://dfinity.org/whitepaper.pdf" },
      { name: "History of ICP", href: "https://dfinity.org/whitepaper.pdf" },
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
            href: "/basics",
            description: "Get to know all possibilities",
          },
          {
            name: "Bitcoin <> ICP",
            href: "/what-is-the-ic",
            description: "Using Bitcoin at the speed of chat",
          },
          {
            name: "Ethereum <> ICP",
            href: "/how-it-works",
            description: "Native ETH on Internet Computer",
          },
          {
            name: "Identity on ICP",
            href: "/roadmap",
            description: "One secure identity for all services",
          },
          {
            name: "HTTPS Outcalls",
            href: "/capabilities/sustainability",
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
        name: "ICP Dashboard",
        href: "https://dashboard.internetcomputer.org/",
      },
      { name: "ICP on YOutube", href: "https://www.youtube.com/c/DFINITY" },
      { name: "ICP Wiki", href: "https://wiki.internetcomputer.org/" },
      { name: "Whitepaper", href: "https://dfinity.org/whitepaper.pdf" },
      { name: "History of ICP", href: "https://dfinity.org/whitepaper.pdf" },
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
          image:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
        },
      },
    ],
  },
  {
    name: "Develop",
    auxItems: [
      {
        name: "ICP Dashboard",
        href: "https://dashboard.internetcomputer.org/",
      },
      { name: "ICP on YOutube", href: "https://www.youtube.com/c/DFINITY" },
      { name: "ICP Wiki", href: "https://wiki.internetcomputer.org/" },
      { name: "Whitepaper", href: "https://dfinity.org/whitepaper.pdf" },
      { name: "History of ICP", href: "https://dfinity.org/whitepaper.pdf" },
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
          image:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
        },
      },
    ],
  },
  {
    name: "Participate",
    auxItems: [
      {
        name: "ICP Dashboard",
        href: "https://dashboard.internetcomputer.org/",
      },
      { name: "ICP on YOutube", href: "https://www.youtube.com/c/DFINITY" },
      { name: "ICP Wiki", href: "https://wiki.internetcomputer.org/" },
      { name: "Whitepaper", href: "https://dfinity.org/whitepaper.pdf" },
      { name: "History of ICP", href: "https://dfinity.org/whitepaper.pdf" },
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
          image:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
        },
      },
    ],
  },
];

const MarketingNav = () => {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [flyoutOpen, setFlyoutOpen] = React.useState(true);
  const [openFlyout, setOpenFlyout] = React.useState<NavItem | null>(nav[0]);
  const [selectedSection, setSelectedSection] = React.useState<Section | null>(
    nav[0].sections[0]
  );

  // mobile nav side drawer
  const mobileNavClasses = mobileNavOpen
    ? "translate-x-0 pointer-events-auto"
    : "-translate-x-full pointer-events-none";

  // desktop nav flyout
  const flyoutClasses = flyoutOpen
    ? "opacity-100 pointer-events-auto visible"
    : "opacity-0 pointer-events-none invisible";

  function closeNav() {
    setMobileNavOpen(false);
  }

  function toggleNav() {
    setMobileNavOpen(!mobileNavOpen);
  }

  function showFlyout(item: NavItem) {
    setFlyoutOpen(true);
    setOpenFlyout(item);
    setSelectedSection(item.sections[0]);
  }

  return (
    <>
      <nav className="navbar !bg-transparent text-black flex justify-between">
        <img src="/img/logo-notext.svg" alt="" className="h-7" />

        <div className="hidden md:flex gap-4 items-center">
          {nav.map((item) => (
            <button
              className={`border-none bg-transparent px-4 py-[2px] text-white m-0 font-circular text-paragraph font-book rounded-full ${
                item === openFlyout && "bg-white/20"
              }`}
              key={item.name}
              onMouseEnter={() => showFlyout(item)}
            >
              {item.name}
            </button>
          ))}
          {/* <button className="border-none bg-transparent px-4 py-[2px] text-white m-0 font-circular text-paragraph font-book">
            Learn
          </button>
          <button className="appearance-none border-none bg-transparent px-4 py-[2px] text-white m-0 font-circular text-paragraph font-book">
            Use
          </button>
        
          <Link
            href="/docs/current/home"
            className="border-none bg-transparent px-4 py-[2px] text-white m-0 font-circular text-paragraph font-book hover:no-underline hover:text-white"
          >
            Develop
          </Link>
          <button className="border-none bg-transparent px-4 py-[2px] text-white m-0 font-circular text-paragraph font-book">
            Community
          </button> */}
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
        className={`absolute z-[1000] top-24 left-1/2 -translate-x-1/2 bg-white rounded-3xl overflow-hidden hidden md:flex flex-col ${flyoutClasses}`}
      >
        {openFlyout && (
          <>
            <div className="flex-1 flex">
              {openFlyout.sections.length > 1 && (
                <div className="bg-[#F1EEF5] p-6 flex flex-col gap-3 items-stretch min-w-[220px]">
                  {openFlyout.sections.map((section) => (
                    <button
                      key={section.name}
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
                      className="text-black hover:no-underline hover:text-infinite flex flex-col"
                    >
                      <span className="font-medium text-[16px] leading-[22px]">
                        {item.name}
                      </span>

                      <span className="text-[14px] leading-[22px] font-normal text-black/60">
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
                      className="bg-cover bg-center aspect-video rounded-xl flex w-[300px] p-6 group hover:no-underline"
                      href={selectedSection.featured.href}
                    >
                      <span className="text-[24px] leading-[26px] font-bold text-white flex-1 group-hover:-translate-y-2 transition-transform">
                        {selectedSection.featured.title}
                      </span>

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:-translate-y-2 transition-transform"
                      >
                        <path
                          d="M13.5008 12L6.50044 4.99969L8.50012 3L17.5001 12L8.50012 21L6.50044 19.0003L13.5008 12Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-[#FAFAFA] py-6 px-10 flex gap-8 items-center">
              {openFlyout.auxItems.map((item) => (
                <Link
                  className="font-bold text-[11px] uppercase whitespace-nowrap flex items-center gap-1"
                  key={item.name}
                >
                  {item.name}
                  <LinkArrowUpRight className="w-[14px]" />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div
        className={`fixed inset-0 bg-white z-[1000] p-6 transition-transform ${mobileNavClasses}`}
      >
        <div className="flex items-center justify-between">
          <img src="/img/logo-notext.svg" alt="" className="h-7" />
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
          {nav.map((item) => (
            <li className="p-0" key={item.name}>
              <button
                className="border-none bg-transparent p-0 text-infinite m-0 font-circular font-medium text-heading-4"
                onClick={closeNav}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MarketingNav;
