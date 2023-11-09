import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { isLinkExternal } from "@site/plugins/utils/links";
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
  href?: string;
  image: string;
};

type Section = {
  name: string;
  items: SectionItem[];
  featured: FeaturedItem;
};

type AuxItem = {
  name: string;
  href: string;
};

type SocialIcon = {
  label: string;
  iconUrl: string;
  href: string;
};

export type NavItem = {
  name: string;
  auxItems?: AuxItem[];
  sections: Section[];
  socialIcons?: SocialIcon[];
};

export type MarketingNavType = {
  mainItems: NavItem[];
  auxItems: AuxItem[];
};

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

/*
  Regular collapsible drawer
  Setting alwaysOpen to true will make it work like a regular div
*/
const Drawer: React.FC<{
  title: string;
  children?: React.ReactNode;
  startingState?: boolean;
  alwaysOpen?: boolean;
}> = ({ title, children, startingState = false, alwaysOpen = false }) => {
  const [open, setOpen] = React.useState(startingState || alwaysOpen);
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
      {alwaysOpen ? (
        <div className="text-black tw-heading-5">{title}</div>
      ) : (
        <button
          className="w-full flex justify-between items-center bg-transparent appearance-none border-none p-0 font-circular text-infinite"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="tw-heading-4">{title}</div>

          <Arrow open={open} />
        </button>
      )}
      <div
        ref={ref}
        className={clsx(
          "transition-all overflow-hidden",
          alwaysOpen || open ? "max-h-none" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      className="appearance-none border-none bg-transparent w-10 h-10 -mr-2"
      onClick={onClick}
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
  );
};

const AuxItems: React.FC<{ items: AuxItem[] }> = ({ items }) => {
  return (
    <ul className="relative list-none p-0 flex flex-col gap-3 mt-0 mb-0 py-5 border-0 border-t border-solid border-grey-300">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className="text-infinite tw-button-sm inline-flex gap-2 items-center hover:no-underline hover:text-black"
          >
            {item.name}

            <LinkArrowUpRight className="w-[14px]" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

const MarketingNav = () => {
  const { siteConfig } = useDocusaurusContext();
  const nav = siteConfig.customFields.marketingNav as MarketingNavType;
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [secondaryMobileNavOpen, setSecondaryMobileNavOpen] = React.useState<
    false | number
  >(false);
  const [selectedSection, setSelectedSection] = React.useState<Section | null>(
    nav.mainItems[0].sections[0]
  );

  const location = useLocation();

  const hiddenRef = React.useRef(false);
  const lastScrollPosRef = React.useRef(0);
  const navbarRef = React.useRef<HTMLElement>(null);
  const hideOnScroll = (siteConfig.themeConfig as any).navbar
    .hideOnScroll as boolean;
  const footerIcons = (siteConfig.themeConfig as any).footer.links.find(
    (section) => section.title == "SocialMedia"
  )!.items;

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
          navbarRef.current.style.transform = "unset";
        }
      }

      lastScrollPosRef.current = currentScrollPos;
    }

    if (hideOnScroll) {
      window.addEventListener("scroll", onScroll);
    }

    // preload featured images so they load instantly on hover
    for (const item of nav.mainItems) {
      for (const section of item.sections) {
        if (section.featured) {
          const img = new Image();
          img.src = section.featured.image;
        }
      }
    }

    return () => {
      if (hideOnScroll) {
        window.removeEventListener("scroll", onScroll);
        document.querySelector("body")!.style.overflow = "unset";
        document.querySelector("body")!.style.touchAction = "unset";
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
    document.querySelector("body")!.style.touchAction = "unset";
  }

  function openNav() {
    setMobileNavOpen(true);
    setSecondaryMobileNavOpen(false);
    document.querySelector("body")!.style.overflow = "hidden";
    document.querySelector("body")!.style.touchAction = "none";
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
  function isCurrentPage(href: string) {
    const cleanHref = href
      .replace(/#.*$/, "") // remove hash
      .replace(/\?.*$/, "") // remove query string
      .replace(/\/$/, ""); // remove trailing slash

    return location.pathname == cleanHref;
  }

  return (
    <>
      <nav
        className="marketing-navbar z-[1000] pl-6 pr-4 py-4 md:px-12 md:pt-11 md:pb-5 text-black  bg-page dark-hero:bg-transparent sticky top-0 transition-transform"
        ref={navbarRef}
      >
        <div className="md:max-w-[1440px] md:w-full md:mx-auto flex items-center justify-between">
          {/* logo */}
          <Link href="/" className="self-center flex items-center">
            <img
              src="/img/IC_logo_horizontal_white.svg"
              alt=""
              className="h-5 md:h-7 hidden dark-hero:block"
            />
            <img
              src="/img/IC_logo_horizontal.svg"
              alt=""
              className="h-5 md:h-7 dark-hero:hidden"
            />
          </Link>

          {/* middle desktop items */}
          <div className="hidden md:flex gap-0 items-center">
            {nav.mainItems.map((item) => (
              <div
                className="active:outline active:outline-1 active:outline-white  text-black dark-hero:text-white m-0 tw-heading-7 group  cursor-pointer"
                key={item.name}
                onMouseEnter={() => showFlyout(item)}
                tabIndex={0}
              >
                <div className="rounded-full px-8 py-[2px] group-hover:bg-[#6E52AA] group-hover:text-white">
                  {item.name}
                </div>

                <div className="absolute z-[1000] top-20 left-1/2 -translate-x-1/2 p-4 opacity-0 pointer-events-none cursor-default invisible group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible">
                  <div className="shadow-2xl dark-hero:shadow-none bg-white rounded-3xl overflow-hidden hidden md:flex flex-col">
                    <div className="flex-1 flex">
                      {item.sections.length > 1 && (
                        <div className="bg-[#F1EEF5] p-6 flex flex-col gap-3 items-stretch min-w-[220px]">
                          {item.sections.map((section) => (
                            <button
                              key={section.name}
                              onMouseEnter={() => setSelectedSection(section)}
                              onClick={() => setSelectedSection(section)}
                              className={`text-left appearance-none border-none rounded-xl font-circular tw-heading-7 px-4 py-6 ${
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
                      <div className="flex  flex-1 pl-8 pr-6 py-6 bg-white min-w-[705px]">
                        <div className="flex-1 flex flex-col gap-5 min-w-[256px] pr-6">
                          {selectedSection.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={clsx(
                                isCurrentPage(item.href)
                                  ? "text-infinite"
                                  : "text-black",
                                "hover:no-underline group/item hover:text-infinite flex flex-col"
                              )}
                            >
                              <span className="tw-heading-7 inline-flex gap-2 items-center">
                                {item.name}

                                {isLinkExternal(item.href) && (
                                  <LinkArrowUpRight className="w-[14px] h-[14px]" />
                                )}
                              </span>

                              <span
                                className={clsx(
                                  isCurrentPage(item.href)
                                    ? "text-infinite"
                                    : "text-black/60",
                                  "tw-title-navigation-on-page group-hover/item:text-infinite whitespace-nowrap"
                                )}
                              >
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
                              <span className="tw-heading-5 text-white flex-[2] group-hover/featured:-translate-y-2 transition-transform">
                                {selectedSection.featured.title}
                              </span>
                              <span className="flex-1 text-right">
                                <FeaturedArrowRight />
                              </span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-[#FAFAFA] py-6 pl-10 pr-6 flex gap-9 items-center">
                      {item.auxItems.map((item) => (
                        <Link
                          className="tw-button-xs whitespace-nowrap flex items-center gap-2 hover:no-underline hover:text-black"
                          key={item.name}
                          href={item.href}
                        >
                          {item.name}
                          <LinkArrowUpRight className="w-[14px]" />
                        </Link>
                      ))}
                      <div className="flex-1"></div>
                      <div className="flex gap-7 items-center">
                        {item.socialIcons &&
                          item.socialIcons.map((icon) => (
                            <Link
                              href={icon.href}
                              className="w-5 h-5"
                              key={icon.label}
                            >
                              <img src={icon.iconUrl} alt={icon.label} />
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* right side items: search and hamburger on mobile */}
          <div className="flex gap-4 items-center">
            <Search />
            <button
              className="md:hidden flex flex-col gap-[6px] border-none bg-transparent px-[9px] h-10 w-10 p-0 justify-center"
              onClick={toggleNav}
            >
              <span className="bg-black dark-hero:bg-white h-[2px] w-full shrink-0"></span>
              <span className="bg-black dark-hero:bg-white h-[2px] w-full shrink-0"></span>
              <span className="bg-black dark-hero:bg-white h-[2px] w-full shrink-0"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Level 1 of mobile fly-in menu */}
      <div
        className={`md:hidden overflow-auto fixed inset-0 bg-white z-[1000] px-6 pt-4 pb-12 transition-transform ${mobileNavClasses}`}
      >
        {/* logo + close button */}
        <div className="flex items-center justify-between ">
          <Link className="flex items-center" href="/" onClick={closeNav}>
            <img src="/img/logo-notext.svg" alt="" className="h-5" />
          </Link>
          <CloseButton onClick={closeNav} />
        </div>

        {/* top level items */}
        <ul className="list-none p-0 flex flex-col gap-6 mt-8 mb-6">
          {nav.mainItems.map((item, index) => (
            <li className="p-0" key={item.name}>
              <button
                className="border-none bg-transparent p-0 text-infinite m-0 font-circular tw-heading-4"
                onClick={() => openSecondaryMobileNav(index)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* top level aux items */}
        <AuxItems items={nav.auxItems} />
      </div>

      {/* Level 2 of mobile fly-in menu*/}
      <div
        className={`md:hidden overflow-auto fixed inset-0 bg-white z-[1000] px-6 py-4 transition-transform ${secondaryMobileNavClasses}`}
      >
        {/* list of sections */}
        {secondaryMobileNavOpen !== false && (
          <>
            {/* Back button + close button */}
            <div className="flex items-center justify-between">
              <button
                className="flex items-center gap-6 tw-heading-7 font-circular bg-transparent p-0 text-left border-none text-black"
                onClick={() => setSecondaryMobileNavOpen(false)}
              >
                <LinkArrowLeft />
                {nav.mainItems[secondaryMobileNavOpen].name}
              </button>
              <CloseButton onClick={closeNav} />
            </div>

            <ul className="list-none p-0 flex flex-col gap-6 mt-8 pb-10 mb-0">
              {nav.mainItems[secondaryMobileNavOpen].sections.map(
                (item, index) => (
                  <li className="p-0" key={item.name}>
                    <Drawer
                      title={item.name}
                      startingState={index === 0}
                      alwaysOpen
                    >
                      {/* list of section items */}
                      <ul className="list-none p-0 flex flex-col gap-3 mt-5 mb-6">
                        {item.items.map((item) => (
                          <li className="p-0" key={item.name}>
                            <Link
                              className="border-none bg-transparent p-0 text-infinite m-0 tw-heading-7 hover:no-underline hover:text-black inline-flex items-center gap-2"
                              href={item.href}
                            >
                              {item.name}

                              {isLinkExternal(item.href) && (
                                <LinkArrowUpRight className="w-[14px] h-[14px]" />
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* featured item */}
                      {item.featured && (
                        <Link
                          href={item.featured.href}
                          className="mb-6 min-h-[120px] w-full bg-center bg-cover relative group/featured p-6 no-underline hover:no-underline rounded-xl flex"
                          style={{
                            backgroundImage: `url(${item.featured.image})`,
                          }}
                        >
                          <span className="text-white tw-heading-5 flex-[2] group-hover/featured:-translate-y-2 transition-transform">
                            {item.featured.title}
                          </span>
                          <span className="flex-1 text-right">
                            <FeaturedArrowRight />
                          </span>
                        </Link>
                      )}
                    </Drawer>
                  </li>
                )
              )}
            </ul>

            {/* aux items */}
            {nav.mainItems[secondaryMobileNavOpen].auxItems && (
              <AuxItems
                items={nav.mainItems[secondaryMobileNavOpen].auxItems}
              />
            )}

            {/* social icons */}

            {nav.mainItems[secondaryMobileNavOpen].socialIcons && (
              <ul className="m-0 p-0 list-none flex flex-wrap gap-6 mt-10">
                {nav.mainItems[secondaryMobileNavOpen].socialIcons!.map(
                  (item) => (
                    <li className="" key={item.label}>
                      <Link href={item.href} className={`block w-6 h-6`}>
                        <img src={item.iconUrl} alt={item.label}></img>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MarketingNav;
