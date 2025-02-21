import React from "react";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../Common/Icons/LinkArrowRight";
import GradientBackground from "./GradientBackground";

export const CtaCard = ({ title, description, href, backgroundColor, backgroundSegments = [[1, 2, 3]] }: { title: string, description: string, backgroundColor: string[], backgroundSegments: number[][], href: string }) => {
  return (
    <Link
      className="relative w-full h-full md:aspect-[1/1.3] sm:aspect-[1/0.4] link-primary text-black link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform overflow-hidden rounded-xl group"
      href={href}
    >
      <GradientBackground
        color1={backgroundColor[0]}
        color2={backgroundColor[1]}
        segments={backgroundSegments}
        isFullWidth={false}
      />
      <article className="relative z-2 w-full h-full flex flex-col gap-8 justify-between items-start p-6 md:p-8">
        <h3 className="tw-heading-alt-2 mb-3 text-[2.8rem] lg:text-[3.5rem]">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </h3>

        <div>
          <p className="tw-lead text-black-60 mb-2">
            {description}
          </p>
          <div className="button-round-icon mt-auto !bg-transparent !text-black !border-black/20 group-hover:!bg-black/10 group-hover:!border-black">
            <LinkArrowRight />
          </div>
        </div>

      </article>
    </Link>
  );
};

export default CtaCard;
