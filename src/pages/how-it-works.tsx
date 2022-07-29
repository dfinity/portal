import React from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import useGlobalData from "@docusaurus/useGlobalData";
import { HowItWorksData } from "@site/src/components/HowItWorksPage/HowItWorksData";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import BlobPurple from "@site/static/img/purpleBlurredCircle.png";
import FeaturedArticle from "@site/src/components/HowItWorksPage/FeaturedArticle";
import ArticlePreview from "@site/src/components/HowItWorksPage/ArticlePreview";

function HowItWorks() {
  const data = useGlobalData()["howitworks-articles"].default as HowItWorksData;
  const articles = data.articles;
  return (
    <Layout title={data.metaTitle} description={data.metaDescription}>
      <main className="text-black relative overflow-hidden">
        <AnimateSpawn variants={transitions.container}>
          <motion.img
            src={BlobPurple}
            alt=""
            className="absolute pointer-events-none max-w-none w-[800px] -right-[370px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-200px] z-[-1000]"
            variants={transitions.item}
          />
          <section className="max-w-page relative px-6 pt-20 mb-5 md:mb-6 md:px-12.5 md:mx-auto md:pt-40 overflow-hidden">
            <div className="md:w-7/10 lg:w-6/10 md:ml-1/12">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2"
                variants={transitions.item}
              >
                {data.heroTitle}
              </motion.h1>
            </div>
          </section>
          <section className="max-w-page relative px-6 mb-10 md:mb-20 md:px-12.5 md:mx-auto overflow-hidden">
            <div className="md:w-7/10 lg:w-6/10 md:ml-1/12">
              <motion.span
                className="tw-lead-sm md:tw-lead"
                variants={transitions.item}
              >
                {data.heroBody.split("\n").map((item) => (
                  <span key={item}>
                    {item}
                    <br />
                  </span>
                ))}
              </motion.span>
            </div>
          </section>
          <section className="max-w-page relative px-6 mb-5 md:mb-12 md:px-12.5 md:mx-auto overflow-hidden">
            <FeaturedArticle
              title={data.featured.title}
              description={data.featured.description}
              coverImage={data.featured.coverImage}
              slug={data.featured.slug}
            />
          </section>
          <section className="max-w-page relative px-6 mb-5 md:mb-40 md:px-12.5 md:mx-auto overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-12 lg:grid-cols-4 transition-opacity">
              {articles
                .filter((a) => a.slug !== data.featured.slug)
                .map((article) => (
                  <ArticlePreview
                    title={article.title}
                    coverImage={article.coverImage}
                    slug={article.slug}
                  />
                ))}
            </div>
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default HowItWorks;
