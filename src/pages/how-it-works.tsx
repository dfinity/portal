import React from "react";
import Layout from "@theme/Layout";
import useGlobalData from "@docusaurus/useGlobalData";
import {
  HowItWorksCardGroup,
  HowItWorksPageData,
} from "@site/src/components/HowItWorksPage/HowItWorksData";
import ArrowRight from "@site/static/img/arrow-right.svg";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import { useScrollSpyMenu } from "../utils/use-scroll-spy-menu";
import slugify from "slugify";
import clsx from "clsx";
import IntraPageNav from "../components/Common/IntraPageNav";
import { css } from "../utils/dummy-css";

const CardGroup: React.FC<{ group: HowItWorksCardGroup }> = ({ group }) => {
  const groupClassName = `${slugify(group.title)}-item`;
  const groupSelector = `.${groupClassName}`;
  const highlight = useScrollSpyMenu(groupSelector);

  function onItemClick(e, index: number) {
    const target = document.querySelectorAll(`${groupSelector}`)[index];

    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 115;

      window.scrollTo({ top: y, behavior: "smooth" });

      e.preventDefault();
      return false;
    }
  }

  return (
    <div
      className="flex gap-5 flex-col md:flex-row"
      id={slugify(group.title, { strict: true })}
    >
      <div className="flex-1 ">
        <div className="sticky top-10">
          <h2 className="tw-heading-4 md:tw-heading-60 mb-6 md:mb-12">
            {group.title}
          </h2>
          <ul className="list-none p-0 space-y-6 m-0 hidden md:block">
            {group.items.map((card, index) => (
              <li key={card.title}>
                <button
                  onClick={(e) => onItemClick(e, index)}
                  className={clsx(
                    "border-none bg-transparent appearance-none text-left font-circular",
                    highlight.highlightedIndex !== index
                      ? "text-black-30 tw-heading-6"
                      : "tw-heading-5"
                  )}
                >
                  {card.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="flex-1 bg-white rounded-xl px-6 py-5 md:p-12 space-y-16"
        ref={(el) => (highlight.elRef.current = el)}
      >
        {group.items.map((card) => (
          <div
            className={groupClassName}
            key={card.title}
            id={slugify(card.title, { strict: true })}
          >
            <div
              dangerouslySetInnerHTML={{ __html: card.body }}
              className="
              prose 
              prose-img:m-0 prose-img:w-full prose-img:rounded-[10px]
              prose-h3:tw-heading-5 
              prose-h4:tw-heading-6
              prose-h5:tw-heading-7
              prose-p:m-0 prose-p:tw-paragraph prose-p:text-black-60 
              prose-headings:m-0 
              space-y-4 
              prose-a:text-infinite prose-a:underline hover:prose-a:text-black hover:prose-a:no-underline
              marker:prose-ol:text-black marker:prose-ol:tw-paragraph


              prose-h2:tw-heading-4 prose-h2:md:tw-heading-3 prose-h2:my-8
              prose-table:tw-paragraph
              prose-td:p-2
              prose-th:p-2
              "
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

function HowItWorks() {
  const cardGroups = useGlobalData()["howitworks-cards"]
    .default as HowItWorksPageData;

  const featuredGroup = cardGroups.find((g) => g.isFeatured)!;

  return (
    <Layout
      title="How it works"
      description="Learn how the Internet Computer blockchain works and explore its technology, open-source repositories, in-depth video academy sessions, white papers, publications, and long-form deep dives."
    >
      <style>
        {css`
          html {
            scroll-padding-top: 125px;
          }
        `}
      </style>
      <main className="text-black relative">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-80 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">
                How the Internet Computer Works
              </h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                Learn how the Internet Computer blockchain works and explore its
                technology, open-source repositories, in-depth video academy
                sessions, white papers, publications, and long-form deep dives.
              </p>
            </div>
          </div>
          <div className="container-10 relative">
            <img
              src="/img/whiteBlurredCircle.png"
              className="absolute pointer-events-none max-w-none w-[800px] aspect-square -right-[200px] bottom-[-400px] md:w-[1500px] md:bottom-[-680px] md:right-[-550px] object-contain object-center"
            />
          </div>
        </section>
        <section className="container-12 -mt-72 md:-mt-32 relative !px-0">
          <div className="overflow-auto flex gap-5 fancy-scrollbar px-6 xl:px-0">
            {featuredGroup.items.map((card) => (
              <div
                className="rounded-xl overflow-hidden flex-1 bg-white min-w-[80vw] sm:min-w-[320px]  xl:min-w-0"
                key={card.title}
              >
                <img
                  className="w-full h-[200px] object-cover"
                  src={card.coverImage}
                  alt=""
                ></img>
                <div className="p-6">
                  <h3 className="tw-heading-5 mb-3">{card.title}</h3>
                  <div className="tw-paragraph text-black-60 mb-3">
                    {card.abstract}
                  </div>
                  <button
                    className="link-primary border-none bg-transparent appearance-none p-0 inline-flex items-center gap-2 font-circular"
                    onClick={() =>
                      document
                        .querySelector(
                          `#${slugify(card.title, { strict: true })}`
                        )
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Learn more
                    <ArrowRight></ArrowRight>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="container-12 mt-32 space-y-24 md:space-y-20 relative mb-52  ">
          {cardGroups.map((group) => (
            <CardGroup group={group} key={group.title}></CardGroup>
          ))}
        </section>

        <IntraPageNav
          links={cardGroups.map((g) => ({
            text: g.title,
            to: "#" + slugify(g.title, { strict: true }),
          }))}
          label="Scroll to section"
        ></IntraPageNav>
      </main>
    </Layout>
  );
}

export default HowItWorks;
