import React from "react";
import Link from "@docusaurus/Link";

function Index({ title, coverImage, slug }) {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <img
          className="h-44 w-full object-cover block rounded-xl"
          src={coverImage}
          alt={title}
        />
        <p className="tw-heading-6 mt-5 md:tw-heading-5">{title}</p>
      </div>
      <Link
        href={"/howitworks/" + slug}
        className="bg-transparent w-28 text-center rounded-xl border-2 border-black border-solid text-black tw-title-navigation-on-page py-2 px-3 hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors"
      >
        Learn more
      </Link>
    </div>
  );
}

export default Index;
