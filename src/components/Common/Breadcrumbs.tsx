import React from "react";
import HomeIcon from "@site/static/img/svgIcons/homeIcon.svg";
import RightArrowIcon from "@site/static/img/svgIcons/rightArrowIcon.svg";
import Link from "@docusaurus/Link";

type LinkType = {
  href: string;
  text: string;
};
type LabelType = {
  text: string;
};

function isLink(link: LinkType | LabelType): link is LinkType {
  return "href" in link;
}

const Breadcrumbs: React.FC<{ links: [...LinkType[], LabelType] }> = ({
  links,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center tw-title-navigation-on-page whitespace-nowrap max-w-full overflow-hidden">
      <Link
        to={"/"}
        className="flex text-infinite hover:text-black"
        aria-label="Go to home page"
      >
        <HomeIcon className="w-6 h-6 flex-shrink-0" />
      </Link>
      {links.map((link) =>
        isLink(link) ? (
          <React.Fragment key={link.text}>
            <RightArrowIcon className="w-4 h-4 text-black opacity-20 flex-shrink-0" />
            <Link
              to={link.href}
              className="text-infinite text-center hover:text-black hover:no-underline"
            >
              {link.text}
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment key={link.text}>
            <RightArrowIcon className="w-4 h-4 text-black opacity-20 flex-shrink-0" />
            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
              {link.text}
            </span>
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default Breadcrumbs;
