import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import BlobPurple from "@site/static/img/purpleBlurredCircle.webp";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React from "react";
import ShareMeta from "../../Common/ShareMeta";

function Index({ article }) {
  return (
    <Layout
      title={article.title}
      description={article.abstract || ""}
      editPath={`https://github.com/dfinity/portal/edit/master/${article.fileName}`}
    >
      <ShareMeta image={article.shareImage}></ShareMeta>
      <main className="text-black relative overflow-hidden">
        <img
          src={BlobPurple}
          alt=""
          className="absolute pointer-events-none max-w-none w-[800px] -right-[370px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-200px] z-[-1000]"
        />
        <section className="max-w-page relative px-6 pt-10 mb-8 md:mb-20 md:px-12.5 md:mx-auto md:pt-6 overflow-hidden">
          <motion.div
            variants={transitions.item}
            className="md:w-7/10 lg:w-6/10 md:ml-1/12"
          >
            <Breadcrumbs
              links={[
                { text: "How it works", href: "/how-it-works" },
                {
                  text: article.title,
                },
              ]}
            />
          </motion.div>
        </section>
        <div
          className={`
            mb-20
          md:mb-40
          container-10
          prose
          prose-h1:tw-heading-3 prose-h1:md:tw-heading-2 prose-h1:my-12 prose-h1:md:max-w-3xl
          prose-h2:tw-heading-4 prose-h2:md:tw-heading-3 prose-h2:my-8
          prose-h3:tw-heading-5 prose-h3:md:tw-heading-4 prose-h3:my-8
          prose-img:w-full
          prose-p:tw-paragraph 
          prose-a:text-infinite prose-a:underline hover:prose-a:text-black hover:prose-a:no-underline
          marker:prose-ol:text-black marker:prose-ol:tw-paragraph
          prose-table:tw-lead-sm
          prose-td:p-2
          prose-th:p-2
          `}
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
      </main>
    </Layout>
  );
}

export default Index;
