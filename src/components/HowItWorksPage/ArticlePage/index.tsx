import React from "react";
import { useLocation } from "@docusaurus/router";
import useGlobalData from "@docusaurus/useGlobalData";
import { HowItWorksData } from "@site/src/components/HowItWorksPage/HowItWorksData";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import Layout from "@theme/Layout";
import ArticlePreview from "@site/src/components/HowItWorksPage/ArticlePreview";
import BlobPurple from "@site/static/img/purpleBlurredCircle.png";
import ExternalLinkIcon from "@site/static/img/svgIcons/externalLink.svg";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import Breadcrumbs from "@site/src/components/HowItWorksPage/Breadcrumbs";

function Index() {
  const location = useLocation();
  const data = useGlobalData()["howitworks-articles"].default as HowItWorksData;
  const articleSlug = location.pathname.replace("/howitworks/", "");
  const article = data.articles?.find((a) => a.slug === articleSlug);
  const links = article.listOfLinks
    ?.split("\n")
    ?.filter((link) => !!link)
    ?.map((link) => {
      let [text, href] = link?.split("](");
      return { text: text?.replace("- [", ""), href: href?.split(" ")[0] };
    });
  return (
    <Layout
      title={article.title + " | Internet Computer"}
      description={article.description}
    >
      <main className="text-black relative overflow-hidden">
        <AnimateSpawn variants={transitions.container}>
          <motion.img
            src={BlobPurple}
            alt=""
            className="absolute pointer-events-none max-w-none w-[800px] -right-[370px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-200px] z-[-1000]"
            variants={transitions.item}
          />
          <section className="max-w-page relative px-6 pt-10 mb-8 md:mb-20 md:px-12.5 md:mx-auto md:pt-6 overflow-hidden">
            <motion.div
              variants={transitions.item}
              className="md:w-7/10 lg:w-6/10 md:ml-1/12"
            >
              <Breadcrumbs
                links={[
                  { text: "How it works", href: "/howitworks" },
                  {
                    text: article.title,
                    href: location.pathname,
                  },
                ]}
              />
            </motion.div>
          </section>
          <section className="max-w-page relative px-6 mb-5 md:mb-6 md:px-12.5 md:mx-auto overflow-hidden">
            <div className="md:w-7/10 lg:w-6/10 md:ml-1/12">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2"
                variants={transitions.item}
              >
                {article.title}
              </motion.h1>
            </div>
          </section>
          <section className="max-w-page relative block px-6 mb-5 md:mb-10 md:px-12.5 md:mx-auto overflow-hidden">
            <motion.div variants={transitions.item}>
              <iframe
                className="w-full aspect-video"
                src={"https://www.youtube.com/embed/" + article.youtubeVideo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </section>
          <section className="max-w-page relative px-6 mb-5 md:mb-14 md:px-12.5 md:mx-auto overflow-hidden">
            <div className="md:w-8/10 lg:w-7/10 md:ml-1/12">
              <motion.div variants={transitions.item}>
                {article.description?.split("\n")?.map((item) => (
                  <span className="tw-paragraph" key={item}>
                    {item}
                    <br />
                  </span>
                ))}
                <div className="mt-8 flex flex-col">
                  {links?.map((link) => (
                    <Link
                      className="mb-6 tw-heading-6 hover:no-underline hover:text-black"
                      to={link.href}
                      key={link.text}
                    >
                      <span className="mr-2">{link.text}</span>
                      <ExternalLinkIcon className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
          <section className="max-w-page relative px-6 mb-40 md:px-12.5 md:mx-auto overflow-hidden">
            <p className="tw-heading-4 mb-6">{data.otherSessionsTitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-12 lg:grid-cols-4 transition-opacity">
              {data.articles
                ?.filter((a) => a.slug !== articleSlug)
                ?.map((article) => (
                  <ArticlePreview
                    title={article.title}
                    coverImage={article.coverImage}
                    slug={article.slug}
                    key={article.slug}
                  />
                ))}
            </div>
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default Index;
