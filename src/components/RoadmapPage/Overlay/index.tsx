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
}> = ({ onClose, openAt, data }) => {
  const overlayRef = useRef<HTMLDivElement>();
  useEffect(() => {
    overlayRef.current.scrollTop =
      document
        .querySelector(`#roadmap_domain_${openAt}`)
        .getBoundingClientRect().top - 48;
  }, []);

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
        </div>
        <div className="flex flex-col md:gap-12 -mt-10">
          {data.map((domain, index) => (
            <div
              className="bg-white flex flex-col md:rounded-xl md:overflow-hidden"
              id={`roadmap_domain_${index}`}
              key={`roadmap_domain_${index}`}
            >
              <img
                src={domain.image.overlay}
                alt=""
                className="w-full h-[200px] object-cover md:h-[450px]"
              />
              <div className="p-6 pb-16 md:p-12">
                <h2 className="tw-heading-4 md:tw-heading-60 mb-3 text-infinite">
                  {domain.name}
                </h2>
                <div
                  className="tw-paragraph md:tw-lead-sm text-black-60 mb-8 md:mb-16"
                  dangerouslySetInnerHTML={{ __html: domain.description }}
                ></div>
                <div className="space-y-8 md:space-y-16">
                  {domain.groups.deployed?.length > 0 && (
                    <OverlayGroup
                      deployed={true}
                      pillClassName="bg-infinite"
                      items={domain.groups.deployed}
                      pill={
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 7.99943L6.84682 12L13 5.59977L11.4617 4L6.84682 8.80045L4.53829 6.39966L3 7.99943Z"
                              fill="white"
                            />
                          </svg>
                          Deployed
                        </>
                      }
                      aside={
                        <span className="tw-paragraph text-black-60 flex gap-2 items-center h-6">
                          <CommunityIcon></CommunityIcon>
                          Community requests
                        </span>
                      }
                    ></OverlayGroup>
                  )}
                  {domain.groups.inProgress?.length > 0 && (
                    <OverlayGroup
                      deployed={false}
                      pillClassName="bg-razzmatazz"
                      items={domain.groups.inProgress}
                      pill={
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 3C8.98891 3 9.95561 3.29324 10.7779 3.84265C11.6001 4.39206 12.241 5.17295 12.6194 6.08658C12.9978 7.00021 13.0969 8.00555 12.9039 8.97545C12.711 9.94536 12.2348 10.8363 11.5355 11.5355C10.8363 12.2348 9.94536 12.711 8.97545 12.9039C8.00555 13.0969 7.00021 12.9978 6.08658 12.6194C5.17295 12.241 4.39206 11.6001 3.84265 10.7779C3.29324 9.95561 3 8.98891 3 8H5C5 8.59334 5.17595 9.17336 5.50559 9.66671C5.83524 10.1601 6.30377 10.5446 6.85195 10.7716C7.40013 10.9987 8.00333 11.0581 8.58527 10.9424C9.16721 10.8266 9.70176 10.5409 10.1213 10.1213C10.5409 9.70176 10.8266 9.16721 10.9424 8.58527C11.0581 8.00333 10.9987 7.40013 10.7716 6.85195C10.5446 6.30377 10.1601 5.83524 9.66671 5.50559C9.17336 5.17595 8.59334 5 8 5V3Z"
                              fill="white"
                            />
                          </svg>
                          In Progress
                        </>
                      }
                    ></OverlayGroup>
                  )}

                  {domain.groups.upcoming?.length > 0 && (
                    <OverlayGroup
                      deployed={false}
                      pillClassName="bg-black-60 backdrop-blur-2xl"
                      items={domain.groups.upcoming}
                      pill={
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="2.5" cy="8" r="1.5" fill="white" />
                            <circle cx="8" cy="8" r="1.5" fill="white" />
                            <circle cx="13.5" cy="8" r="1.5" fill="white" />
                          </svg>
                          Upcoming
                        </>
                      }
                    ></OverlayGroup>
                  )}
                  {domain.groups.future?.length > 0 && (
                    <OverlayGroup
                      deployed={false}
                      pillClassName="bg-blue text-white"
                      items={domain.groups.future}
                      pill={
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.33333 8L1 11.3333L2.66667 13L7.66667 8L2.66667 3L1 4.66667L4.33333 8Z"
                              fill="white"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.8153 8L7.48193 11.3333L9.1486 13L14.1486 8L9.1486 3L7.48193 4.66667L10.8153 8Z"
                              fill="white"
                            />
                          </svg>
                          Future
                        </>
                      }
                    ></OverlayGroup>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Overlay;
