import React from "react";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";

function Index({ title, description, coverImage, slug }) {
  return (
    <motion.div
      className="bg-white stroke-[#BEC9E5] flex flex-col-reverse min-h-[454px] rounded-xl sm:flex-row"
      variants={transitions.item}
    >
      <div className="w-full sm:w-1/2 p-8 mb-2">
        <p className="tw-heading-7 text-infinite-60">Featured</p>
        <p className="tw-heading-3">{title}</p>
        <p className="tw-paragraph text-black-60 mb-10">{description}</p>
        <Link
          href={"/how-it-works/" + slug}
          className="bg-transparent rounded-xl border-2 border-black border-solid text-black tw-heading-7-caps py-4 px-6 uppercase hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors"
        >
          Go deeper
        </Link>
      </div>
      <div className="w-full sm:w-1/2">
        <img
          className="object-cover w-full h-full rounded-t-xl sm:rounded-r-xl sm:rounded-tl-none"
          src={coverImage + "?w=670&q=80&fm=jpg"}
          srcSet={`${coverImage}?w=670&q=80&fm=jpg, ${coverImage}?w=1340&q=80&fm=jpg 2x`}
          alt=""
        />
      </div>
    </motion.div>
  );
}

export default Index;
