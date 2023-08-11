import React from "react";
import HomeIcon from "@site/static/img/svgIcons/homeIcon.svg";
import RightArrowIcon from "@site/static/img/svgIcons/rightArrowIcon.svg";
import Link from "@docusaurus/Link";
import clsx from "clsx";

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

const Breadcrumbs: React.FC<{
  links: [...LinkType[], LabelType];
  theme?: "light" | "dark";
}> = ({ links, theme = "light" }) => {
  const rightArrowClasses = clsx("w-4 h-4 flex-shrink-0", {
    "text-black/20": theme === "light",
    "text-white/60": theme === "dark",
  });

  return (
    <div className="flex flex-row gap-2 items-center tw-title-navigation-on-page whitespace-nowrap max-w-full overflow-hidden">
      <Link
        to={"/"}
        className={clsx("flex ", {
          "text-infinite hover:text-black": theme === "light",
          "text-white hover:text-white/60": theme === "dark",
        })}
        aria-label="Go to home page"
      >
        <HomeIcon className="w-6 h-6 flex-shrink-0" />
      </Link>
      {links.map((link) =>
        isLink(link) ? (
          <React.Fragment key={link.text}>
            <RightArrowIcon className={rightArrowClasses} />
            <Link
              to={link.href}
              className={clsx("text-center  hover:no-underline", {
                "text-infinite hover:text-black": theme === "light",
                "text-white hover:text-white/60": theme === "dark",
              })}
            >
              {link.text}
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment key={link.text}>
            <RightArrowIcon className={rightArrowClasses} />
            <span
              className={clsx(
                "text-ellipsis overflow-hidden whitespace-nowrap",
                {
                  "text-black": theme === "light",
                  "text-white": theme === "dark",
                }
              )}
            >
              {link.text}
            </span>
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default Breadcrumbs;
