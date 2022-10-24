import React from "react";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";

function Index({ title, coverImage, slug }) {
  return (
    <motion.div variants={transitions.item} className="flex flex-col">
      <div>
        <img
          className="h-44 w-full object-cover block rounded-xl"
          src={coverImage + "?w=380&q=80&fm=jpg"}
          srcSet={`${coverImage}?w=380&q=80&fm=jpg, ${coverImage}?w=760&q=80&fm=jpg 2x`}
          alt={title}
        />
        <p className="tw-heading-6 mt-5 md:tw-heading-5">{title}</p>
      </div>
      <Link
        href={"/how-it-works/" + slug}
        className="bg-transparent w-28 text-center rounded-xl border-2 border-black border-solid text-black tw-title-navigation-on-page py-2 px-3 hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors"
      >
        Go deeper
      </Link>
    </motion.div>
  );
}

export default Index;
