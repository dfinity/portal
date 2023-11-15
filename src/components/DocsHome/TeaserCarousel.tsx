import React, { ReactNode, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import Link from "@docusaurus/Link";

interface CarouselCard {
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: ReactNode;
  image?: ReactNode;
  backgroundImage?: string;
  mainImage?: string;
}

const CARDS: Array<CarouselCard> = [
  {
    title: (
      <h2 className={"text-white"}>Follow @DFINITYDev on X for tech news</h2>
    ),
    subtitle: (
      <p className={"text-white"}>All devs, geeks, & tech fans welcome</p>
    ),
    backgroundImage: "/img/docs/teaser-cards/bg-0.svg",
    cta: (
      <Link
        className="button-transparent button-with-icon"
        href="https://twitter.com/DFINITYDev"
      >
        <LinkArrowRight />
        Follow now
      </Link>
    ),
    mainImage: "/img/docs/teaser-cards/main-0.svg",
  },
  {
    title: (
      <h2 className={"text-white"}>Start your developer journey with Jessie</h2>
    ),
    subtitle: (
      <p className={"text-white"}>
        Work your way up to ICP Astronaut with this 5-level video series
      </p>
    ),
    backgroundImage: "/img/docs/teaser-cards/bg-1.svg",
    cta: (
      <Link
        className="button-transparent button-with-icon"
        href="/docs/current/tutorials"
      >
        Start tutorials
        <LinkArrowRight />
      </Link>
    ),
    mainImage: "/img/docs/teaser-cards/main-1.svg",
  },
  {
    title: <h2 className={"text-white"}>Developer office hours on Discord</h2>,
    subtitle: (
      <p className={"text-white"}>Every Wednesday 9AM CEST and 10:30AM PST</p>
    ),
    backgroundImage: "/img/docs/teaser-cards/bg-2.svg",
    cta: (
      <Link
        className="button-transparent button-with-icon"
        href="https://discord.com/invite/5PJMmmETQB"
      >
        RSVP at #event channel
        <LinkArrowRight />
      </Link>
    ),
    mainImage: "/img/docs/teaser-cards/main-2.svg",
  },
  {
    title: (
      <h2 className={"text-white"}>Bi-weekly developer SNS office hours</h2>
    ),
    subtitle: (
      <p className={"text-white"}>Every other Wednesday 5PM CEST / 8AM PST</p>
    ),
    backgroundImage: "/img/docs/teaser-cards/bg-3.svg",
    cta: (
      <Link
        className="button-transparent button-with-icon"
        href="https://dfinity.zoom.us/j/99550279424?pwd=SFlDbkRVVTV2bm1XSjFYMWJjanZmdz09"
      >
        Join on Zoom
        <LinkArrowRight />
      </Link>
    ),
    mainImage: "/img/docs/teaser-cards/main-3.svg",
  },
];

export function TeaserCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className={"w-full h-full rounded-lg relative overflow-hidden"}>
      <div
        className={
          "flex transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none w-full h-full"
        }
        style={{
          transform: `translateX(-${activeSlide * 100}%)`,
        }}
      >
        {CARDS.map((card, index) => {
          const backgroundStyles = card.backgroundImage
            ? {
                backgroundImage: `url(${card.backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
            : {};

          return (
            <div
              className={
                "min-w-full box-border w-full h-full relative py-8 px-8 justify-between flex flex-col"
              }
              key={index}
              style={{
                ...backgroundStyles,
              }}
            >
              <div className={"grid grid-cols-2 gap-2 justify-between flex-1"}>
                <div className={"flex flex-col justify-between"}>
                  <div className={"flex flex-col"}>
                    {card.title}
                    {card.subtitle}
                    {card.cta}
                  </div>
                  <div className={"flex flex-row gap-1 items-center"}>
                    <Link
                      className="button-transparent button-with-icon cursor-pointer"
                      onClick={() => {
                        if (index === 0) {
                          setActiveSlide(CARDS.length - 1);
                        } else {
                          setActiveSlide(index - 1);
                        }
                      }}
                    >
                      <ArrowLeft />
                    </Link>
                    <span className={"text-white"}>
                      {activeSlide + 1} of {CARDS.length}
                    </span>
                    <Link
                      className="button-transparent button-with-icon cursor-pointer"
                      onClick={() => setActiveSlide((index + 1) % CARDS.length)}
                    >
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
                {card.mainImage && (
                  <img
                    src={card.mainImage}
                    alt={
                      typeof card.title === "string" ? card.title : "Card image"
                    }
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ArrowLeft = () => {
  return (
    <svg
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.75499 0.185272C5.75499 0.185272 1.75388 4.18994 0.195566 5.74914C0.0648925 5.87892 0 6.0496 0 6.22027C0 6.39095 0.0648925 6.56163 0.195566 6.69141C1.75299 8.25061 5.75321 12.2535 5.75321 12.2535C5.8821 12.3824 6.05189 12.4464 6.22168 12.4464C6.39147 12.4455 6.56214 12.3806 6.69282 12.2499C6.95328 11.9895 6.95416 11.569 6.69637 11.3103L2.27302 6.88698H15.3333C15.7013 6.88698 16 6.58829 16 6.22027C16 5.85225 15.7013 5.55357 15.3333 5.55357H2.27302L6.69815 1.12755C6.95505 0.870643 6.95328 0.451064 6.69282 0.190605C6.56214 0.0599314 6.39147 -0.00585024 6.22168 -0.00585024C6.05189 -0.00673918 5.88388 0.0572645 5.75499 0.185272Z"
        fill="white"
      />
    </svg>
  );
};

const ArrowRight = () => {
  return (
    <svg
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2447 12.2636C10.2447 12.2636 14.246 8.2587 15.8053 6.69852C15.9351 6.56873 16 6.39804 16 6.22736C16 6.05667 15.9351 5.88688 15.8053 5.7562C14.2469 4.19691 10.2447 0.19291 10.2447 0.19291C10.1167 0.0640071 9.94777 0 9.77886 0C9.60729 0 9.43661 0.0657848 9.30592 0.196466C9.04545 0.45605 9.04367 0.877431 9.30237 1.13524L13.7277 5.56062H0.666741C0.2987 5.56062 0 5.85932 0 6.22736C0 6.5954 0.2987 6.8941 0.666741 6.8941H13.7277L9.30148 11.3204C9.04456 11.5773 9.04723 11.9978 9.30681 12.2574C9.43838 12.3889 9.60996 12.4547 9.78064 12.4547C9.94955 12.4547 10.1167 12.3907 10.2447 12.2636Z"
        fill="white"
      />
    </svg>
  );
};
