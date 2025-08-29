import Link from "@docusaurus/Link";
import React, { useEffect, useRef, useState } from "react";
import CommunityIcon from "../../../../static/img/community-icon.svg";
import ExternalLinkIcon from "../../../../static/img/external-link.svg";
import { RoadmapDomain, RoadmapItem } from "../RoadmapTypes";
import LinkArrowLeft from "../../Common/Icons/LinkArrowLeft";
import { motion, AnimatePresence } from "framer-motion";
import { CardBlobs, createId } from "@site/src/pages/roadmap";
import Tooltip from "../../Common/Tooltip";
import LinkIcon from "@site/static/img/svgIcons/link.svg";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

const Blobs: React.FC<{}> = ({}) => {
  return (
    <div
      className="absolute inset-0 -z-1 pointer-events-none"
      style={
        {
          "--rnd1": -1 + Math.random() * 2,
          "--rnd2": -1 + Math.random() * 2,
        } as React.CSSProperties
      }
    >
      <i
        className="absolute top-0 left-0 w-[50vw] h-[50vw] animate-wiggle"
        style={{
          background: `radial-gradient(
            circle at 50% 50%, hsl(from var(--color) h s l) 0%, rgba(0, 0, 0, 0) 60%
          )`,
          transform: `translate(-50%, -50%) translateY(calc(var(--rnd1) * 50%))`,
        }}
      ></i>

      <i
        className="absolute bottom-0 right-0 w-[50vw] h-[50vw]"
        style={{
          background: `radial-gradient(
            circle at 50% 50%, hsl(from var(--color) h s l) 0%, rgba(0, 0, 0, 0) 60%
          )`,

          transform: `translate(50%, 50%) translateY(calc(var(--rnd2) * 50%))`,
        }}
      ></i>
    </div>
  );
};

export const ArrowIconRight = () => {
  return (
    <svg
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="arrowIconRight block"
    >
      <rect
        x="49.5"
        y="45.5"
        width="33"
        height="33"
        rx="16.5"
        transform="rotate(-180 49.5 45.5)"
        stroke="white"
        strokeOpacity="0.3"
        fill="transparent"
        className="circle"
      />
      <path
        d="M37.172 28L31.808 22.636L33.222 21.222L41 29L33.222 36.778L31.808 35.364L37.172 30H25V28H37.172Z"
        fill="white"
        className="arrow"
      />
    </svg>
  );
};

export const DeployedIcon = ({ glowing, isDark = false }) => (
  <svg
    className="w-full block rounded-full"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      border: glowing ? "2px solid rgba(255 255 255 / 25%)" : "none",
      boxShadow: glowing ? "0px 0px 23.333px 0px #0CA80D" : "none",
      background: glowing ? "#0CA80D" : "none",
    }}
  >
    <rect width="24" height="24" rx="12" fill="#0CA80D" />
    <path
      d="M7 11.9994L10.8468 16L17 9.59977L15.4617 8L10.8468 12.8005L8.53829 10.3997L7 11.9994Z"
      fill={isDark ? "#000" : "#fff"}
    />
  </svg>
);

export const InProgressIcon = ({ isDark = false }) => (
  <svg
    className="w-full block"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" width="24" height="24" rx="12" fill="#FBB549" />
    <path
      d="M12.5 7C13.4889 7 14.4556 7.29324 15.2779 7.84265C16.1001 8.39206 16.741 9.17295 17.1194 10.0866C17.4978 11.0002 17.5969 12.0055 17.4039 12.9755C17.211 13.9454 16.7348 14.8363 16.0355 15.5355C15.3363 16.2348 14.4454 16.711 13.4755 16.9039C12.5055 17.0969 11.5002 16.9978 10.5866 16.6194C9.67295 16.241 8.89206 15.6001 8.34265 14.7779C7.79324 13.9556 7.5 12.9889 7.5 12H9.5C9.5 12.5933 9.67595 13.1734 10.0056 13.6667C10.3352 14.1601 10.8038 14.5446 11.3519 14.7716C11.9001 14.9987 12.5033 15.0581 13.0853 14.9424C13.6672 14.8266 14.2018 14.5409 14.6213 14.1213C15.0409 13.7018 15.3266 13.1672 15.4424 12.5853C15.5581 12.0033 15.4987 11.4001 15.2716 10.8519C15.0446 10.3038 14.6601 9.83524 14.1667 9.50559C13.6734 9.17595 13.0933 9 12.5 9V7Z"
      fill={isDark ? "#000" : "#fff"}
    />
  </svg>
);

const FutureIcon = () => (
  <svg
    className="w-full block"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" width="24" height="24" rx="12" fill="#1F9EEA" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.83333 12L5.5 15.3333L7.16667 17L12.1667 12L7.16667 7L5.5 8.66667L8.83333 12Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.3148 12L11.9814 15.3333L13.6481 17L18.6481 12L13.6481 7L11.9814 8.66667L15.3148 12Z"
      fill="white"
    />
  </svg>
);

const CheckmarkIcon = () => (
  <svg
    className="w-full block"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 16"
    fill="none"
  >
    <path
      d="M14.7493 2.96875H13.6571C13.504 2.96875 13.3587 3.03906 13.2649 3.15937L6.82271 11.3203L3.73365 7.40625C3.68692 7.34692 3.62736 7.29895 3.55943 7.26593C3.49151 7.23292 3.41699 7.21572 3.34146 7.21562H2.24928C2.14459 7.21562 2.08678 7.33594 2.15084 7.41719L6.43053 12.8391C6.63053 13.0922 7.0149 13.0922 7.21646 12.8391L14.8477 3.16875C14.9118 3.08906 14.854 2.96875 14.7493 2.96875V2.96875Z"
      fill="currentColor"
    />
  </svg>
);

const proposalIcon = (
  <svg
    className="w-full block"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="39"
      height="39"
      rx="19.5"
      fill="none"
      stroke="rgba(255 255 255 / 18%)"
      strokeWidth={1.25}
    />
    <path
      d="M20 30C14.477 30 10 25.523 10 20C10 14.477 14.477 10 20 10C25.523 10 30 14.477 30 20C30 25.523 25.523 30 20 30ZM19 19V25H21V19H19ZM19 15V17H21V15H19Z"
      fill="#fff"
    />
  </svg>
);

const forumIcon = (
  <svg
    className="w-full block"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="39"
      height="39"
      rx="19.5"
      fill="none"
      stroke="rgba(255 255 255 / 18%)"
      strokeWidth={1.25}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0889 29.3024L15.3799 28.1264C16.8285 28.9008 18.4462 29.3048 20.0889 29.3024C25.6119 29.3024 30.0889 24.8254 30.0889 19.3024C30.0889 13.7794 25.6119 9.30237 20.0889 9.30237C14.5659 9.30237 10.0889 13.7794 10.0889 19.3024C10.0864 20.945 10.4904 22.5628 11.2649 24.0114L10.0889 29.3024ZM21.1039 16.7653C21.9983 15.9495 22.8457 15.5357 23.6225 15.5357C25.482 15.5357 26.9943 17.0668 27.0003 18.9527C27.0003 19.2247 26.9648 19.4907 26.906 19.7449C26.9038 19.7546 26.898 19.7763 26.8875 19.8075C26.5065 21.2627 25.1901 22.3403 23.6298 22.3461C22.3378 22.3461 21.032 21.1057 20.0635 19.9866L20.058 19.9933C20.058 19.9933 19.6226 19.5026 19.1459 18.9764C19.1459 18.9764 18.6045 18.3497 18.0278 17.7999C17.8707 17.6504 17.2838 17.177 16.5853 16.8983C16.5424 16.8921 16.5042 16.8898 16.4707 16.8898C15.3527 16.9016 14.4464 17.8179 14.4464 18.9412C14.4464 20.0763 15.3527 20.9926 16.4707 20.9926C16.765 20.9926 17.2887 20.8389 18.0831 20.1176C18.5127 19.7275 18.8834 19.2959 19.1424 18.9767C19.619 19.5028 20.0545 19.9935 20.0545 19.9935C19.7838 20.3246 19.413 20.7384 18.9894 21.1227C18.0949 21.9385 17.2475 22.3524 16.4707 22.3524C14.6053 22.3524 13.093 20.8212 13.093 18.9353C13.093 18.6633 13.1283 18.3973 13.1871 18.1431C13.1912 18.1256 13.2068 18.0691 13.2404 17.9879C13.6503 16.5766 14.9451 15.5414 16.4743 15.5357C17.766 15.5357 19.0712 16.7753 20.0356 17.8941L20.0403 17.8886L20.042 17.8905C20.3124 17.5601 20.6819 17.1481 21.1039 16.7653ZM23.6225 20.9983C23.6047 20.9983 23.5855 20.9976 23.565 20.996C22.8434 20.7245 22.2318 20.2355 22.0704 20.0819C21.5126 19.5501 20.9879 18.9465 20.9541 18.9074C21.2128 18.5886 21.5823 18.1589 22.0101 17.7704C22.8045 17.0432 23.3223 16.8954 23.6225 16.8954C24.7406 16.8954 25.6468 17.8117 25.6468 18.9469C25.6468 20.0701 24.7406 20.9864 23.6225 20.9983Z"
      fill="#fff"
    />
  </svg>
);

const docsIcon = (
  <svg
    className="w-full block"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="0.5"
      width="39"
      height="39"
      rx="19.5"
      fill="none"
      stroke="rgba(255 255 255 / 18%)"
      strokeWidth={1.25}
    />
    <g clipPath="url(#clip0_14156_10811)">
      <path
        d="M29.5 12H15.5C14.9696 12 14.4609 12.2107 14.0858 12.5858C13.7107 12.9609 13.5 13.4696 13.5 14C13.5 14.5304 13.7107 15.0391 14.0858 15.4142C14.4609 15.7893 14.9696 16 15.5 16H29.5V29C29.5 29.2652 29.3946 29.5196 29.2071 29.7071C29.0196 29.8946 28.7652 30 28.5 30H15.5C14.4391 30 13.4217 29.5786 12.6716 28.8284C11.9214 28.0783 11.5 27.0609 11.5 26V14C11.5 12.9391 11.9214 11.9217 12.6716 11.1716C13.4217 10.4214 14.4391 10 15.5 10H28.5C28.7652 10 29.0196 10.1054 29.2071 10.2929C29.3946 10.4804 29.5 10.7348 29.5 11V12ZM13.5 26C13.5 26.5304 13.7107 27.0391 14.0858 27.4142C14.4609 27.7893 14.9696 28 15.5 28H27.5V18H15.5C14.7978 18.0011 14.1078 17.8166 13.5 17.465V26ZM28.5 15H15.5C15.2348 15 14.9804 14.8946 14.7929 14.7071C14.6054 14.5196 14.5 14.2652 14.5 14C14.5 13.7348 14.6054 13.4804 14.7929 13.2929C14.9804 13.1054 15.2348 13 15.5 13H28.5V15Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="clip0_14156_10811">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(8.5 8)"
        />
      </clipPath>
    </defs>
  </svg>
);

const youtubeIcon = (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0.5"
      y="0.5"
      width="39"
      height="39"
      rx="19.5"
      stroke="white"
      stroke-opacity="0.3"
    />
    <path
      d="M30.2359 13.8103C30.75 15.815 30.75 20 30.75 20C30.75 20 30.75 24.185 30.2359 26.1898C29.9501 27.2979 29.1143 28.1698 28.0556 28.4645C26.133 29 19.5 29 19.5 29C19.5 29 12.8704 29 10.9444 28.4645C9.88125 28.1653 9.0465 27.2945 8.76412 26.1898C8.25 24.185 8.25 20 8.25 20C8.25 20 8.25 15.815 8.76412 13.8103C9.04988 12.7021 9.88575 11.8302 10.9444 11.5355C12.8704 11 19.5 11 19.5 11C19.5 11 26.133 11 28.0556 11.5355C29.1187 11.8347 29.9535 12.7055 30.2359 13.8103ZM17.25 23.9375L24 20L17.25 16.0625V23.9375Z"
      fill="white"
    />
  </svg>
);

const twitterIcon = (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0.5"
      y="0.5"
      width="39"
      height="39"
      rx="19.5"
      stroke="white"
      stroke-opacity="0.3"
    />
    <path
      d="M10.0494 11.011C10.0412 11.0228 10.7058 11.891 11.5221 12.936C12.3385 13.981 14.0739 16.2046 15.3785 17.8743L17.7497 20.9111L17.5979 21.0761C17.5117 21.1664 15.7682 22.9696 13.7252 25.0832C11.6821 27.2007 10.0042 28.945 10.0001 28.9646C9.99193 28.9843 10.3488 29 10.8617 28.9961L11.7355 28.9921L12.0226 28.6896C12.1826 28.5246 13.6677 26.9886 15.3251 25.2718C16.9825 23.555 18.3856 22.1014 18.443 22.0386L18.5456 21.9246L19.366 22.9775C19.8173 23.555 21.0604 25.15 22.127 26.5171L24.0716 29H27.0458C29.5196 29 30.016 28.9921 29.9996 28.9489C29.9873 28.9175 29.2325 27.9432 28.3217 26.7764C27.411 25.6136 26.3689 24.2779 26.0079 23.8143C25.6428 23.3507 24.5721 21.9718 23.6203 20.7578C22.6685 19.54 21.8891 18.5264 21.8891 18.5107C21.8891 18.4832 26.9187 13.2543 28.6294 11.506L29.1176 11.0071H28.2191L27.3248 11.011L26.2787 12.0953C25.7043 12.6925 24.2972 14.1539 23.1485 15.3364L21.0686 17.4893L18.5456 14.26L16.0184 11.0268L13.0442 11.0071C11.4073 10.9953 10.0576 10.9993 10.0494 11.011ZM17.0974 14.4918C18.0697 15.7411 19.5712 17.6621 20.4327 18.7661C21.2942 19.8661 23.2059 22.3175 24.6828 24.2071C26.1597 26.1007 27.3822 27.6682 27.4028 27.6957C27.4274 27.7311 27.1361 27.7429 26.0736 27.7429H24.7156L22.0244 24.2936C15.8133 16.3461 12.679 12.331 12.6421 12.2721C12.6175 12.2368 12.8965 12.225 13.9672 12.225H15.3251L17.0974 14.4918Z"
      fill="white"
    />
  </svg>
);

const MilestoneCard: React.FC<Element> = ({
  title,
  overview,
  status,
  forum,
  docs,
  proposal,
}) => {
  return (
    <article className="flex flex-col justify-between px-6 pt-6 pb-6 bg-white/10 rounded-lg text-white">
      <div>
        {" "}
        <header className="flex gap-2 justify-between self-stretch">
          <h5 className="tw-heading-6">{title}</h5>
          <div className="basis-7 w-7 grow-0 shrink-0">
            {status === "deployed" && (
              <Tooltip
                tooltip="Deployed"
                className="text-center bg-black/75 rounded-lg whitespace-nowrap	"
              >
                <DeployedIcon glowing={false} isDark={true} />
              </Tooltip>
            )}
            {status === "in_progress" && (
              <Tooltip
                tooltip="In Progress"
                className="text-center bg-black/75 rounded-lg whitespace-nowrap	"
              >
                <InProgressIcon isDark={true} />
              </Tooltip>
            )}
            {/* {status === "future" && (
              <Tooltip
                tooltip="Planned"
                className="text-center bg-black/75 rounded-lg whitespace-nowrap	"
              >
                <FutureIcon />
              </Tooltip>
            )} */}
          </div>
        </header>
        <p className="tw-paragraph-sm ">{overview}</p>
      </div>

      <div className="flex gap-2 pr-20 mt-2">
        {proposal && (
          <Link
            className="basis-10 w-10 grow-0 shrink-0 link-primary"
            to={proposal}
          >
            {proposalIcon}
          </Link>
        )}
        {forum && (
          <Link
            className="basis-10 w-10 grow-0 shrink-0 link-primary"
            to={forum}
          >
            {forumIcon}
          </Link>
        )}
        {docs && (
          <Link
            className="basis-10 w-10 grow-0 shrink-0 link-primary"
            to={docs}
          >
            {docsIcon}
          </Link>
        )}
      </div>
    </article>
  );
};

type Element = {
  title: string;
  overview: string;
  status: string;
  forum: string;
  docs: string;
  proposal: string;
};

const MilestoneDetail: React.FC<{
  name: string;
  subtitle: string;
  overview: string;
  eta: string;
  elements: Element[];
  status: string;
  color: string | null;
  color2: string | null;
  expandedMilestone: string | null;
  setExpandedMilestone: (milestone: string | null) => void;
  openAt: string;
}> = ({
  name,
  subtitle,
  overview,
  eta,
  elements,
  status,
  color,
  color2,
  expandedMilestone,
  setExpandedMilestone,
  openAt,
}) => {
  const isExpanded = name === expandedMilestone;
  const elementsPerRow = 4;
  const elementsCount = elements.length;
  const emptyCardsCount = elementsPerRow - (elementsCount % elementsPerRow);
  const [showCopied, setShowCopied] = useState(false);
  const emptyCards = Array(emptyCardsCount).fill(null);

  const handleLinkClick = () => {
    const id = createId(openAt, name);
    navigator.clipboard.writeText(
      window.location.origin + window.location.pathname + `#${id}`
    );

    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  if (name === "Future features") {
    return elements.length === 0 ? (
      <></>
    ) : (
      <article
        id={name}
        className={`milestone-large border-2 border-solid border-[var(--color)] rounded-xl mb-15 md:mb-30 relative scroll-mt-44 md:scroll-mt-32`}
      >
        <Blobs />
        <div className="p-5">
          <h4
            className="tw-heading-5 md:tw-heading-3 !m-0 flex justify-between cursor-pointer hover:opacity-70 select-none"
            onClick={() => setExpandedMilestone(isExpanded ? null : name)}
          >
            <div className="flex">
              {" "}
              {name}{" "}
              {elements.length > 0 && !isExpanded && (
                <span className=" flex justify-center items-center rounded-2xl px-3 py-2 h-7 text-black bg-white ml-3 align-text-bottom translate-y-1/12 md:translate-y-5/12 ">
                  <span className=" text-[1.2rem] md:tw-lead ">
                    {elements.length}
                  </span>
                </span>
              )}
            </div>

            <span className="flex justify-center items-center">
              {isExpanded ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 12H20" stroke="white" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 12H20" stroke="white" />
                  <path d="M12 20L12 4" stroke="white" />
                </svg>
              )}
            </span>
          </h4>
        </div>
        {isExpanded && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <div className="m-1">
                <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                  {elements.map((element, i) => (
                    <MilestoneCard
                      key={i}
                      title={element.title}
                      overview={element.overview}
                      status={element.status}
                      forum={element.forum}
                      docs={element.docs}
                      proposal={element.proposal}
                    />
                  ))}{" "}
                  {emptyCards.map((_, i) => (
                    <div
                      key={i + elementsCount}
                      className="hidden md:block bg-white bg-opacity-5 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </article>
    );
  }
  if (name === "Past features") {
    return elements.length === 0 ? (
      <></>
    ) : (
      <article
        id={name}
        className={`milestone-large border-2 border-solid border-[var(--color)] rounded-xl mb-15 md:mb-30 relative scroll-mt-44 md:scroll-mt-32`}
      >
        <Blobs />
        <div className="p-5">
          <h4 className="tw-heading-5 md:tw-heading-3 mb-3">{name}</h4>
        </div>
        <div className="m-1">
          <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {elements.map((element, i) => (
              <MilestoneCard
                key={i}
                title={element.title}
                overview={element.overview}
                status={element.status}
                forum={element.forum}
                docs={element.docs}
                proposal={element.proposal}
              />
            ))}
            {emptyCards.map((_, i) => (
              <div
                key={i + elementsCount}
                className="hidden md:block bg-white bg-opacity-5 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </article>
    );
  }
  if (name === "Caffeine") {
    return (
      <article
        id={name}
        className={`milestone-large border-2 border-solid border-[#DDF730] rounded-xl mb-15 md:mb-30 relative scroll-mt-48 md:scroll-mt-32`}
      >
        {status === "in_progress" && <CardBlobs />}
        <Blobs />
        <div className="p-5 py-6 md:py-12 relative z-3">
          <div className="md:grid md:grid-cols-[6fr,10fr] gap-2">
            <div>
              <div className=" flex items-center group mb-8">
                <svg
                  width="231"
                  height="40"
                  viewBox="0 0 231 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 25.1892C0 16.3784 7.18919 10.3243 17.1351 10.3243C25.6216 10.3243 31.1351 15.027 32.6486 19.7297L25.1892 22.9189C24.2162 19.9459 21.2973 17.4054 17.0811 17.4054C12.1081 17.4054 8.43243 20.3243 8.43243 25.1892C8.43243 30 12.1081 32.973 17.0811 32.973C21.2973 32.973 24.2162 30.4324 25.1892 27.4054L32.6486 30.7027C31.0811 35.3514 25.6216 40 17.1351 40C7.18919 40 0 33.9459 0 25.1892Z"
                    fill="white"
                  />
                  <path
                    d="M47.1281 40C40.1011 40 35.0741 36.8108 35.0741 31.1892C35.0741 25.6216 39.993 22.8649 46.6957 22.2162L58.047 21.1892V21.027C58.047 18.8649 56.2092 17.1351 51.6146 17.1351C47.7227 17.1351 44.7497 18.7568 43.8849 20.973L36.1011 18.8649C37.8849 13.7297 44.1551 10.3243 51.993 10.3243C61.0741 10.3243 66.4254 13.9459 66.4254 21.0811V26.2703V39.4047H58.8578V36.2703C56.2632 38.5405 52.1551 40 47.1281 40ZM58.047 28.4865V26.973L47.9389 28C44.966 28.2703 43.4524 28.973 43.4524 30.8649C43.4524 32.7027 45.3443 33.6757 48.6957 33.6757C53.1281 33.6757 58.047 31.7838 58.047 28.4865Z"
                    fill="white"
                  />
                  <path
                    d="M71.0131 10.4865C71.0131 3.40541 75.9861 0 84.4186 0C87.0672 0 89.824 0.378377 91.5537 1.02703L90.4186 7.78378C88.6348 7.2973 86.9591 7.02703 84.9591 7.02703C81.2834 7.02703 79.5537 8.10811 79.5537 10.6486V10.9189H90.0402V18.0541H79.5537V39.4054H71.0131V10.4865Z"
                    fill="white"
                  />
                  <path
                    d="M93.6588 10.4865C93.6588 3.40541 98.6318 0 107.064 0C109.713 0 112.47 0.378377 114.199 1.02703L113.064 7.78378C111.28 7.2973 109.605 7.02703 107.605 7.02703C103.929 7.02703 102.199 8.10811 102.199 10.6486V10.9189H112.686V18.0541H102.199V39.4054H93.6588V18.0541H87.2264V10.9189H93.6588V10.4865Z"
                    fill="white"
                  />
                  <path
                    d="M130.044 33.1351C133.828 33.1351 136.855 31.4054 138.098 28.6486L145.72 31.4054C143.666 36.4324 137.557 40 130.098 40C119.99 40 112.909 34 112.909 25.1351C112.909 16.7027 119.99 10.3243 130.044 10.3243C140.26 10.3243 146.206 16.9189 146.206 25.027V27.4054H121.341C122.314 31.027 125.612 33.1351 130.044 33.1351ZM129.774 17.027C125.99 17.027 122.747 18.7568 121.557 22.1081H137.503C137.125 19.7297 134.314 17.027 129.774 17.027Z"
                    fill="white"
                  />
                  <path
                    d="M149.947 8V0.594593H158.758V8H149.947ZM158.65 10.9189V39.4054H150.001V10.9189H158.65Z"
                    fill="white"
                  />
                  <path
                    d="M163.475 39.4054V10.9189H172.123V14.3784C174.339 12.0541 177.907 10.3243 182.502 10.3243C189.907 10.3243 194.934 15.2973 194.934 23.1892V39.4054H186.285V25.7297C186.285 20.9189 183.961 18 179.529 18C174.826 18 172.123 20.8649 172.123 25.7838V39.4054H163.475Z"
                    fill="white"
                  />
                  <path
                    d="M214.807 33.1351C218.591 33.1351 221.618 31.4054 222.861 28.6486L230.483 31.4054C228.429 36.4324 222.321 40 214.861 40C204.753 40 197.672 34 197.672 25.1351C197.672 16.7027 204.753 10.3243 214.807 10.3243C225.023 10.3243 230.969 16.9189 230.969 25.027V27.4054H206.104C207.077 31.027 210.375 33.1351 214.807 33.1351ZM214.537 17.027C210.753 17.027 207.51 18.7568 206.321 22.1081H222.267C221.888 19.7297 219.077 17.027 214.537 17.027Z"
                    fill="white"
                  />
                </svg>

                {!showCopied ? (
                  <span
                    onClick={handleLinkClick}
                    className="ml-2 cursor-pointer hidden group-hover:inline"
                  >
                    <LinkIcon />
                  </span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="ml-2 basis-5 w-5 grow-0 shrink-0 opacity-80 "
                  >
                    <CheckmarkIcon />
                  </motion.span>
                )}
              </div>
              {eta && eta != "none" && (
                <p className="tw-paragraph mb-2">
                  <span className="text-white/60">
                    {" "}
                    {status === "deployed" ? "Completed" : "Due Date"}
                  </span>{" "}
                  {eta}
                </p>
              )}

              <p className="tw-paragraph font-bold mb-2 ">
                Caffeine is a self-writing apps platform: the first complete
                tech stack designed for AI, where humans build through
                conversation.
              </p>
            </div>
            <div className="mt-2">
              {" "}
              <p className="text-white/60 tw-paragraph md:mr-9">
                What if anybody could imagine a website, online app or service,
                and create it by having a natural language conversation with AI?
                What if this online functionality simply appears on URLs,
                available for immediate use, and can be improved through
                continued conversation? What if talking can create and update
                serious production services — which might support large numbers
                of users or customers—under the auspices of a guarantee that
                changes and updates made by AI at the speed of chat will never
                result in an accidental loss of data?
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="https://caffeine.ai/"
                  className="button-outline-white !normal-case"
                >
                  <span className="flex items-center gap-2 !normal-case text-nowrap">
                    Try it out <LinkArrowUpRight />
                  </span>
                </Link>
                <div className="flex items-center gap-1 md:gap-2">
                  <Link
                    className="basis-10 w-10 grow-0 shrink-0 link-primary"
                    to="https://www.youtube.com/channel/UCPjtUmto8faF1p04Qoa6KDg"
                  >
                    {youtubeIcon}
                  </Link>
                  <Link
                    className="basis-10 w-10 grow-0 shrink-0 link-primary"
                    to="https://x.com/caffeineai"
                  >
                    {twitterIcon}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-1 relative z-3">
          <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {elements.map((element, i) => (
              <MilestoneCard
                key={i}
                title={element.title}
                overview={element.overview}
                status={element.status}
                forum={element.forum}
                docs={element.docs}
                proposal={element.proposal}
              />
            ))}{" "}
            {emptyCards.map((_, i) => (
              <div
                key={i + elementsCount}
                className="hidden md:block bg-white bg-opacity-5 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </article>
    );
  }
  return (
    <article
      id={name}
      className={`milestone-large border-2 border-solid border-[var(--color)] rounded-xl mb-15 md:mb-30 relative scroll-mt-48 md:scroll-mt-32`}
    >
      {status === "in_progress" && <CardBlobs />}
      <Blobs />
      <div className="p-5 relative z-3">
        <div className="md:grid md:grid-cols-[6fr,10fr] gap-2">
          <div>
            <h4 className="tw-heading-5 md:tw-heading-3 mb-2 flex items-center group">
              {name}
              {!showCopied ? (
                <span
                  onClick={handleLinkClick}
                  className="ml-2 cursor-pointer hidden group-hover:inline"
                >
                  <LinkIcon />
                </span>
              ) : (
                <motion.span
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="ml-2 basis-5 w-5 grow-0 shrink-0 opacity-80 "
                >
                  <CheckmarkIcon />
                </motion.span>
              )}
            </h4>
            {eta && eta != "none" && (
              <p className="tw-paragraph mb-2">
                <span className="text-white/60">
                  {" "}
                  {status === "deployed" ? "Completed" : "Due Date"}
                </span>{" "}
                {eta}
              </p>
            )}

            <p className="tw-paragraph font-bold mb-2">{subtitle}</p>
          </div>
          <div>
            {" "}
            <p className="text-white/60 tw-paragraph md:mr-9">{overview}</p>
          </div>
        </div>
      </div>
      <div className="m-1 relative z-3">
        <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {elements.map((element, i) => (
            <MilestoneCard
              key={i}
              title={element.title}
              overview={element.overview}
              status={element.status}
              forum={element.forum}
              docs={element.docs}
              proposal={element.proposal}
            />
          ))}{" "}
          {emptyCards.map((_, i) => (
            <div
              key={i + elementsCount}
              className="hidden md:block bg-white bg-opacity-5 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    </article>
  );
};

const Overlay: React.FC<{
  onClose: () => void;
  openAt: string | null;
  data: RoadmapDomain[];
  anchor: string | null;
  color: string | null;
  color2: string | null;
}> = ({ onClose, openAt, data, anchor, color, color2 }) => {
  const overlayRef = useRef<HTMLDivElement>();
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(
    null
  );

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

  useEffect(() => {
    if (anchor) {
      const el = document.getElementById(anchor);

      if (el) {
        if (anchor === "Future features") {
          setExpandedMilestone(anchor);
        }

        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [anchor, color]);

  const index = data.findIndex((d) => d.name === openAt);

  return (
    <motion.div
      className="fixed inset-0 overflow-auto z-[2000] bg-black/70 backdrop-blur-lg overflow-x-hidden"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={overlayRef}
      style={{ "--color": color, "--color2": color2 }}
    >
      <div className="fixed inset-0"></div>
      <div
        className="relative container-10 p-12 text-white rounded-[36px] mt-10 overflow-clip"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: `color-mix(in lab, ${color} 20%, rgba(0 0 0 / 60%))`,
        }}
      >
        <div className="float-right pointer-events-none sticky top-[50px] z-10 z-30">
          <button
            className="pointer-events-auto flex w-12 h-12 rounded-full border-none bg-[#181818] justify-center items-center"
            onClick={onClose}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="30"
                height="30"
                rx="15"
                fill="#181818"
                fillOpacity="0.6"
              />
              <path d="M9.34277 9.34375L20.6565 20.6575" stroke="white" />
              <path d="M9.34277 20.6572L20.6565 9.34352" stroke="white" />
            </svg>
          </button>
        </div>
        <div className="sticky top-0 z-20 backdrop-blur-xl -mx-12 -mt-12 px-12 pt-12 pb-2">
          <h2 className="tw-heading-3 font-black md:tw-heading-3 md:w-8/10">
            {data[index].name}
          </h2>
        </div>
        <div className="md:top-20 z-10">
          {data && index !== null && (
            <div>
              <section className="mb-12 md:mb-24">
                <p className="tw-lead-sm md:tw-lead md:w-9/10">
                  {data[index].description && data[index].description}
                </p>
              </section>
              <section>
                {[...data[index].milestones]
                  .sort((a, b) => {
                    // Put "orphans_future" top
                    if (a.name === "orphans_future") return -1;
                    if (b.name === "orphans_future") return 1;

                    // Put "orphans_past" bottom
                    if (a.name === "orphans_past") return 1;
                    if (b.name === "orphans_past") return -1;

                    // Group by status first
                    if (a.status !== b.status) {
                      // In progress first
                      if (a.status === "in_progress") return -1;
                      if (b.status === "in_progress") return 1;

                      // Future features second
                      if (a.status === "future") return -1;
                      if (b.status === "future") return 1;

                      // Deployed (completed) last
                      if (a.status === "deployed") return 1;
                      if (b.status === "deployed") return -1;
                    }

                    // For items with the same status, apply different chronological orders
                    if (a.status === b.status) {
                      const originalOrder =
                        data[index].milestones.indexOf(a) -
                        data[index].milestones.indexOf(b);

                      // For current (in_progress) - chronological order
                      if (a.status === "in_progress") {
                        return originalOrder;
                      }

                      // For completed (deployed) - reverse chronological order
                      if (a.status === "deployed") {
                        return -originalOrder;
                      }

                      // For future - chronological order
                      if (a.status === "future") {
                        return originalOrder;
                      }
                    }

                    return 0;
                  })
                  .map((milestone, i) => {
                    return (
                      <MilestoneDetail
                        key={i}
                        name={milestone.milestone_id}
                        subtitle={milestone.name}
                        overview={milestone.description}
                        eta={milestone.eta}
                        elements={milestone.elements}
                        status={milestone.status}
                        color={color}
                        color2={color2}
                        expandedMilestone={expandedMilestone}
                        setExpandedMilestone={setExpandedMilestone}
                        openAt={openAt}
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
