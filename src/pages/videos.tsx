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
  let currentVideo = mediaVideos.at(0);
  let filteredVideos = mediaVideos.filter((v) => v.href !== currentVideo.href);
  const tags = Object.keys(
    mediaVideos.reduce((tags, p) => {
      if (!p.tags) return tags;
      for (const tag of p.tags) {
        tags[tag.toLowerCase()] = true;
      }
      return tags;
    }, {})
  );

  let tempVideos = mediaVideos;
  if (queryTagInitialized && queryTag?.length > 0) {
    let temp = tempVideos.filter((p) =>
      p.tags.find((tag) => tag.toLowerCase() == queryTag)
    );
    currentVideo = temp.at(0);
    filteredVideos = temp.filter((v) => v.href !== currentVideo.href);
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
          <section className="max-w-page px-6 mb-10 md:px-12.5 md:mx-auto">
            <motion.div
              className="flex gap-10 md:gap-20 flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="flex gap-3 flex-wrap flex-1">
                <button
                  className={clsx(
                    "inline-block bg-white font-circular rounded-xl border border-infinite border-solid tw-title-navigation py-[10px] px-4 capitalize hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors",
                    !queryTag ? "text-white bg-infinite" : "text-black bg-white"
                  )}
                  onClick={() => setQueryTag(undefined)}
                >
                  All Videos
                </button>
                {tags.map((tag) => (
                  <button
                    className={clsx(
                      "inline-block bg-white font-circular rounded-xl border border-infinite border-solid tw-title-navigation py-[10px] px-4 capitalize hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors",
                      tag.toLowerCase() === queryTag?.toLowerCase()
                        ? "text-white bg-infinite"
                        : "text-black bg-white"
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
          <section className="max-w-page px-6 mb-20 md:mb-10 md:px-12.5 md:mx-auto">
            <div className={"relative flex flex-row rounded-xl bg-white"}>
              <a
                href={"https://www.youtube.com/watch?v=" + currentVideo.href}
                target="_blank"
                key={currentVideo.href}
                className={"w-2/3"}
              >
                <div className="group relative h-0 pb-16/9">
                  <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
                    <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
                  </div>
                  <img
                    className="inset-0 w-full h-full z-[1] absolute object-cover rounded-l-xl"
                    src={`https://img.youtube.com/vi/${currentVideo.href}/maxresdefault.jpg`}
                    alt=""
                  />
                </div>
              </a>
              <div className={"px-12 mb-16 mt-auto bg-white w-1/3"}>
                <p className={"tw-heading-7 text-razzmatazz mb-3"}>Featured</p>
                <p className={"tw-heading-6 md:tw-heading-5 mb-0"}>
                  {currentVideo.title}
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-page relative px-6 mb-5 md:mb-40 md:px-12.5 md:mx-auto overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-5 gap-y-10 md:gap-y-16 lg:grid-cols-4 transition-opacity">
              {filteredVideos.map((video) => (
                <div key={video.href} className={"bg-white rounded-xl"}>
                  <a
                    href={"https://www.youtube.com/watch?v=" + video.href}
                    target="_blank"
                  >
                    <div className="group relative h-0 pb-16/9">
                      <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
                        <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
                      </div>
                      <img
                        className="absolute inset-0 w-full h-full z-[1] object-cover rounded-t-xl"
                        src={`https://img.youtube.com/vi/${video.href}/sddefault.jpg`}
                        alt=""
                      />
                    </div>
                  </a>

                  <p className="tw-heading-7 md:tw-heading-6 p-6 mb-0">
                    {video.title}
                  </p>
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
