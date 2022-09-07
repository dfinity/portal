import React from "react";
import Layout from "@theme/Layout";
import BlobPurple from "@site/static/img/purpleBlurredCircle.png";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import mediaVideos from "@site/static/mediaVideos.json";
import shareImage from "@site/static/img/shareImages/share-videos.jpeg";
import Head from "@docusaurus/Head";
import clsx from "clsx";
import { useQueryParam } from "@site/src/utils/use-query-param";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";

function Videos() {
  const [queryTag, setQueryTag, queryTagInitialized] = useQueryParam("tag");
  resetNavBarStyle();
  const currentVideo = mediaVideos.at(0);
  let filteredVideos = mediaVideos.filter((v) => v.href !== currentVideo.href);
  const tags = Object.keys(
    filteredVideos.reduce((tags, p) => {
      if (!p.tags) return tags;
      for (const tag of p.tags) {
        tags[tag.toLowerCase()] = true;
      }
      return tags;
    }, {})
  );

  let tempVideos = filteredVideos;
  if (queryTagInitialized && queryTag?.length > 0) {
    filteredVideos = tempVideos.filter((p) =>
      p.tags.find((tag) => tag.toLowerCase() == queryTag)
    );
  }
  return (
    <Layout title={"Videos"} description={""}>
      <Head>
        <meta property="og:image" content={shareImage} />
        <meta name="twitter:image" content={shareImage} />
      </Head>
      <main className="text-black relative overflow-hidden">
        <img
          src={BlobPurple}
          alt=""
          className="absolute pointer-events-none max-w-none w-[800px] -right-[370px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-200px] z-[-1000]"
        />
        <AnimateSpawn variants={transitions.item}>
          <section className="max-w-page relative px-6 md:px-12.5 pt-10 mb-8 md:mb-20 md:mx-auto md:pt-6 overflow-hidden">
            <motion.div
              variants={transitions.item}
              className="md:w-7/10 lg:w-6/10 md:ml-1/12"
            >
              <Breadcrumbs links={[{ text: "Videos", href: "/videos" }]} />
            </motion.div>
            <motion.p
              variants={transitions.item}
              className="tw-heading-3 md:tw-heading-2 mt-16 mb-0 md:ml-1/12"
            >
              Videos
            </motion.p>
          </section>
          <section className="max-w-page mx-6 md:w-10/12 relative bg-white rounded-xl block mb-5 md:mb-10 md:mx-auto overflow-hidden">
            <motion.div variants={transitions.item} className="">
              <iframe
                className="w-full aspect-video block"
                src={"https://www.youtube.com/embed/" + currentVideo.href}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <p className="tw-heading-6 md:tw-heading-5 my-4 md:my-8 mx-3 md:mx-6">
                {currentVideo.title}
              </p>
            </motion.div>
          </section>
          <section className="max-w-page px-6 mb-12 md:mb-20 md:px-12.5 md:mx-auto">
            <motion.div
              className="flex gap-10 md:gap-20 flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="flex gap-3 flex-wrap flex-1">
                <button
                  className={clsx(
                    "button-outline",
                    !queryTag
                      ? "text-white bg-infinite"
                      : "text-black bg-transparent"
                  )}
                  onClick={() => setQueryTag(undefined)}
                >
                  All
                </button>
                {tags.map((tag) => (
                  <button
                    className={clsx(
                      "button-outline",
                      tag.toLowerCase() === queryTag?.toLowerCase()
                        ? "text-white bg-infinite"
                        : "text-black bg-transparent"
                    )}
                    key={tag}
                    onClick={() => setQueryTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </section>
          <section className="max-w-page relative mt-12 md:mt-28 px-6 mb-5 md:mb-40 md:px-12.5 md:mx-auto overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-5 gap-y-10 md:gap-y-16 lg:grid-cols-4 transition-opacity">
              {filteredVideos.map((video) => (
                <div key={video.href}>
                  <a
                    href={"https://www.youtube.com/watch?v=" + video.href}
                    target="_blank"
                  >
                    <div className="group relative h-0 pb-16/9 mb-4">
                      <div className="bg-white group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
                        <PlaySVG className="m-auto h-5 w-5 text-infinite group-hover:text-white transition-colors" />
                      </div>
                      <img
                        className="absolute inset-0 w-full h-full z-[-1] object-cover"
                        src={`https://img.youtube.com/vi/${video.href}/sddefault.jpg`}
                        alt=""
                      />
                    </div>
                  </a>

                  <p className="tw-heading-7 md:tw-heading-6">{video.title}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default Videos;
