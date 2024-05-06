import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import CommunityIcon from "../../../../static/img/community-icon.svg";
import ExternalLinkIcon from "../../../../static/img/external-link.svg";
import { RoadmapDomain, RoadmapItem } from "../RoadmapTypes";

const ItemCard: React.FC<{ item: RoadmapItem; deployed: boolean }> = ({
  item,
  deployed,
}) => {
  return (
    <div className="border-black-20 border-solid border rounded-xl px-6 py-4 md:py-8 pb-6 flex flex-col gap-2 md:gap-3">
      <h4 className="tw-heading-6 md:tw-heading-5 mb-0 relative flex items-start gap-4">
        <span className="flex-1">
          <span className="mr-3"> {item.name}</span>
          {item.in_beta && (
            <span
              style={{
                backgroundImage:
                  "linear-gradient(108.55deg, #3B00B9 0%, #18D0B5 149.76%)",
              }}
              className="inline-flex relative -top-1 text-white rounded-full font-circular tw-caption font-bold px-2 py-1"
            >
              Beta
            </span>
          )}
        </span>
        {item.is_community && (
          <CommunityIcon className="text-infinite mt-1"></CommunityIcon>
        )}
      </h4>
      {item.description && (
        <div
          className="tw-paragraph-sm md:tw-paragraph text-black-60 mb-0 prose prose-a:underline prose-a:text-infinite hover:prose-a:no-underline hover:prose-a:text-black"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></div>
      )}
      {item.links.map((link) => (
        <Link className="link-primary" href={link.url} key={link.text}>
          {link.text}
          <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
        </Link>
      ))}
      {item.eta && (
        <span className="mt-1 md:mt-2 tw-paragraph-sm md:tw-paragraph text-black-60">
          {deployed ? "Deployed " : "Expected "}
          {item.eta}
        </span>
      )}
    </div>
  );
};

const OverlayGroup: React.FC<{
  items: RoadmapItem[];
  pillClassName: string;
  pill: React.ReactNode;
  aside?: React.ReactNode;
  deployed: boolean;
}> = ({ items, pill, pillClassName, aside, deployed }) => {
  return (
    <div>
      <div className="md:hidden mb-6">{aside}</div>
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center mb-6 gap-6 sticky top-6 z-[1]">
        <span
          className={`${pillClassName} rounded-full tw-title-navigation text-white py-2 px-4 inline-flex items-center gap-2`}
        >
          {pill}
        </span>
        <span className="hidden md:block">{aside}</span>
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.name} item={item} deployed={deployed}></ItemCard>
        ))}
      </div>
    </div>
  );
};

const Overlay: React.FC<{
  onClose: () => void;
  openAt: number;
  data: RoadmapDomain[];
  anchor: number | null;
}> = ({ onClose, openAt, data, anchor }) => {
  const overlayRef = useRef<HTMLDivElement>();

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [onClose]);

  console.log(anchor);

  return (
    <motion.div
      className="fixed inset-0 overflow-auto bg-white-80 z-[2000]"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={overlayRef}
    >
      <div
        className="relative container-10 !px-0 md:px-6 md:py-12 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-right pointer-events-none sticky top-6 pr-6 md:top-20 z-10 md:pr-8">
          <button
            className="pointer-events-auto right-8 w-10 h-10 rounded-full border-none bg-white-80 backdrop-blur-2xl"
            onClick={onClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6.66688L12.6669 2L14 3.33312L9.33312 8L14 12.6669L12.6669 14L8 9.33312L3.33312 14L2 12.6669L6.66688 8L2 3.33312L3.33312 2L8 6.66688Z"
                fill="#181818"
              />
            </svg>
          </button>
          <div className="text-black">
            {data[openAt].name} <br />
            {anchor !== null &&
              data[openAt] &&
              data[openAt].milestones &&
              data[openAt].milestones[anchor] &&
              data[openAt].milestones[anchor].name}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Overlay;
