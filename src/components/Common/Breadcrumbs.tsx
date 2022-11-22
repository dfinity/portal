import React from "react";
import HomeIcon from "@site/static/img/svgIcons/homeIcon.svg";
import RightArrowIcon from "@site/static/img/svgIcons/rightArrowIcon.svg";
import Link from "@docusaurus/Link";

function Breadcrumbs({ links }) {
  return (
    <div className="flex flex-row gap-2 items-center tw-title-navigation-on-page">
      <Link to={"/"} className="flex text-infinite hover:text-black">
        <HomeIcon className="w-6 h-6" />
      </Link>
      {links.map((link, index) =>
        index !== links.length - 1 ? (
          <React.Fragment key={link.text}>
            <RightArrowIcon className="w-4 h-4 text-black opacity-20" />
            <Link
              to={link.href}
              className="text-infinite text-center hover:text-black hover:no-underline"
            >
              {link.text}
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment key={link.text}>
            <RightArrowIcon className="w-4 h-4 text-black opacity-20" />
            <span>{link.text}</span>
          </React.Fragment>
        )
      )}
    </div>
  );
}

export default Breadcrumbs;
