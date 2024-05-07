import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import CommunityIcon from "../../../../static/img/community-icon.svg";
import ExternalLinkIcon from "../../../../static/img/external-link.svg";
import { RoadmapDomain, RoadmapItem } from "../RoadmapTypes";
import LinkArrowLeft from "../../Common/Icons/LinkArrowLeft";

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

const deployedIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#18D0B5" />
    <path
      d="M7 11.9994L10.8468 16L17 9.59977L15.4617 8L10.8468 12.8005L8.53829 10.3997L7 11.9994Z"
      fill="white"
    />
  </svg>
);

const inProgressIcon = (
  <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" width="24" height="24" rx="12" fill="#F68E5F" />
    <path
      d="M12.5 7C13.4889 7 14.4556 7.29324 15.2779 7.84265C16.1001 8.39206 16.741 9.17295 17.1194 10.0866C17.4978 11.0002 17.5969 12.0055 17.4039 12.9755C17.211 13.9454 16.7348 14.8363 16.0355 15.5355C15.3363 16.2348 14.4454 16.711 13.4755 16.9039C12.5055 17.0969 11.5002 16.9978 10.5866 16.6194C9.67295 16.241 8.89206 15.6001 8.34265 14.7779C7.79324 13.9556 7.5 12.9889 7.5 12H9.5C9.5 12.5933 9.67595 13.1734 10.0056 13.6667C10.3352 14.1601 10.8038 14.5446 11.3519 14.7716C11.9001 14.9987 12.5033 15.0581 13.0853 14.9424C13.6672 14.8266 14.2018 14.5409 14.6213 14.1213C15.0409 13.7018 15.3266 13.1672 15.4424 12.5853C15.5581 12.0033 15.4987 11.4001 15.2716 10.8519C15.0446 10.3038 14.6601 9.83524 14.1667 9.50559C13.6734 9.17595 13.0933 9 12.5 9V7Z"
      fill="white"
    />
  </svg>
);

const futureIcon = (
  <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" width="24" height="24" rx="12" fill="#29ABE2" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.83333 12L5.5 15.3333L7.16667 17L12.1667 12L7.16667 7L5.5 8.66667L8.83333 12Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.3148 12L11.9814 15.3333L13.6481 17L18.6481 12L13.6481 7L11.9814 8.66667L15.3148 12Z"
      fill="white"
    />
  </svg>
);

const MilestoneCard: React.FC<Element> = ({
  title,
  overview,
  status,
  forum,
  wiki,
  docs,
  proposal,
}) => {
  return (
    <article className=" px-6 pt-6 pb-7 bg-white rounded-lg text-black">
      <header className="flex gap-0 justify-between self-stretch">
        <h5 className="tw-heading-6">{title}</h5>
        <div>
          {status === "deployed" && deployedIcon}
          {status === "in_progress" && inProgressIcon}
          {status === "future" && futureIcon}
        </div>
      </header>
      <p className="tw-paragraph-sm line-clamp-4 ">{overview}</p>
      <div className="flex gap-2 pr-20 mt-16"></div>
    </article>
  );
};

type Element = {
  title: string;
  overview: string;
  status: string;
  forum: string;
  wiki: string;
  docs: string;
  proposal: string;
};

const MilestoneDetail: React.FC<{
  name: string;
  overview: string;
  eta: string;
  elements: Element[];
}> = ({ name, overview, eta, elements }) => {
  return (
    <article className="border border-white/30 border-solid rounded-xl mb-30">
      <div className="p-5">
        <h4 className="tw-heading-4">{name.toUpperCase()}</h4>
        <p className="tw-paragraph">
          <span className="text-white/60">Milestone</span> {eta}
        </p>
        <div className=" ">
          <span className="px-2 py-1 w-4 text-sm leading-5 bg-white rounded-xl text-infinite">
            {elements.length - 1}
          </span>
          <span className="text-white"> Completed topics</span>
        </div>
        <p className="text-white/60 tw-paragraph mt-6">{overview}</p>
      </div>
      <div className="m-1">
        <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {elements.map((element) => (
            <MilestoneCard
              title={element.title}
              overview={element.overview}
              status={element.status}
              forum={element.forum}
              wiki={element.wiki}
              docs={element.docs}
              proposal={element.proposal}
            />
          ))}
        </div>
      </div>
    </article>
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
      className="fixed inset-0 overflow-auto bg-black/60 z-[2000]"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={overlayRef}
    >
      <div
        className="relative container-10 !px-0 md:px-6 md:py-12 text-white bg-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-6 pr-6 md:top-20 z-10 md:pr-8">
          <Link
            className="link-primary text-white cursor-pointer"
            onClick={onClose}
          >
            <LinkArrowLeft /> Back to Roadmap
          </Link>
          {data && data[openAt] && (
            <div>
              <section className="my-24">
                <h2 className="tw-heading-2 w-8/10">
                  {data[openAt].name.toUpperCase()}
                </h2>
                <p className="tw-lead w-5/10">{data[openAt].description}</p>
              </section>
              <section>
                {data[openAt].milestones.map((milestone) => {
                  return (
                    <MilestoneDetail
                      name={milestone.name}
                      overview={milestone.description}
                      eta={milestone.eta}
                      elements={milestone.elements}
                    />
                  );
                })}
              </section>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Overlay;
