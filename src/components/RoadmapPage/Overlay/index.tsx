import Link from "@docusaurus/Link";
import React, { useEffect, useRef, useState } from "react";
import CommunityIcon from "../../../../static/img/community-icon.svg";
import ExternalLinkIcon from "../../../../static/img/external-link.svg";
import { RoadmapDomain, RoadmapItem } from "../RoadmapTypes";
import LinkArrowLeft from "../../Common/Icons/LinkArrowLeft";
import { motion, AnimatePresence } from "framer-motion";
import { CardBlobs } from "@site/src/pages/roadmap";

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

export const ArrowIconRight = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
  >
    <g filter="url(#filter0_d_14406_81955)">
      <rect
        x="48"
        y="44"
        width="32"
        height="32"
        rx="16"
        transform="rotate(-180 48 44)"
        fill="white"
      />
      <path
        d="M36.172 26.9997L30.808 21.6357L32.222 20.2217L40 27.9997L32.222 35.7777L30.808 34.3637L36.172 28.9997H24V26.9997H36.172Z"
        fill="#181818"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_14406_81955"
        x="0"
        y="0"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="8" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_14406_81955"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_14406_81955"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const DeployedIcon = () => (
  <svg
    className="w-full block"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="12" fill="#18D0B5" />
    <path
      d="M7 11.9994L10.8468 16L17 9.59977L15.4617 8L10.8468 12.8005L8.53829 10.3997L7 11.9994Z"
      fill="white"
    />
  </svg>
);

const inProgressIcon = (
  <svg
    className="w-full block"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" width="24" height="24" rx="12" fill="#F68E5F" />
    <path
      d="M12.5 7C13.4889 7 14.4556 7.29324 15.2779 7.84265C16.1001 8.39206 16.741 9.17295 17.1194 10.0866C17.4978 11.0002 17.5969 12.0055 17.4039 12.9755C17.211 13.9454 16.7348 14.8363 16.0355 15.5355C15.3363 16.2348 14.4454 16.711 13.4755 16.9039C12.5055 17.0969 11.5002 16.9978 10.5866 16.6194C9.67295 16.241 8.89206 15.6001 8.34265 14.7779C7.79324 13.9556 7.5 12.9889 7.5 12H9.5C9.5 12.5933 9.67595 13.1734 10.0056 13.6667C10.3352 14.1601 10.8038 14.5446 11.3519 14.7716C11.9001 14.9987 12.5033 15.0581 13.0853 14.9424C13.6672 14.8266 14.2018 14.5409 14.6213 14.1213C15.0409 13.7018 15.3266 13.1672 15.4424 12.5853C15.5581 12.0033 15.4987 11.4001 15.2716 10.8519C15.0446 10.3038 14.6601 9.83524 14.1667 9.50559C13.6734 9.17595 13.0933 9 12.5 9V7Z"
      fill="white"
    />
  </svg>
);

const futureIcon = (
  <svg
    className="w-full block"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" width="24" height="24" rx="12" fill="#29ABE2" />
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

const proposalIcon = (
  <svg
    className="w-full block"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" fill="white" />
    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#DFDFDF" />
    <path
      d="M20 30C14.477 30 10 25.523 10 20C10 14.477 14.477 10 20 10C25.523 10 30 14.477 30 20C30 25.523 25.523 30 20 30ZM19 19V25H21V19H19ZM19 15V17H21V15H19Z"
      fill="#3B00B9"
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
    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" fill="white" />
    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#DFDFDF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0889 29.3024L15.3799 28.1264C16.8285 28.9008 18.4462 29.3048 20.0889 29.3024C25.6119 29.3024 30.0889 24.8254 30.0889 19.3024C30.0889 13.7794 25.6119 9.30237 20.0889 9.30237C14.5659 9.30237 10.0889 13.7794 10.0889 19.3024C10.0864 20.945 10.4904 22.5628 11.2649 24.0114L10.0889 29.3024ZM21.1039 16.7653C21.9983 15.9495 22.8457 15.5357 23.6225 15.5357C25.482 15.5357 26.9943 17.0668 27.0003 18.9527C27.0003 19.2247 26.9648 19.4907 26.906 19.7449C26.9038 19.7546 26.898 19.7763 26.8875 19.8075C26.5065 21.2627 25.1901 22.3403 23.6298 22.3461C22.3378 22.3461 21.032 21.1057 20.0635 19.9866L20.058 19.9933C20.058 19.9933 19.6226 19.5026 19.1459 18.9764C19.1459 18.9764 18.6045 18.3497 18.0278 17.7999C17.8707 17.6504 17.2838 17.177 16.5853 16.8983C16.5424 16.8921 16.5042 16.8898 16.4707 16.8898C15.3527 16.9016 14.4464 17.8179 14.4464 18.9412C14.4464 20.0763 15.3527 20.9926 16.4707 20.9926C16.765 20.9926 17.2887 20.8389 18.0831 20.1176C18.5127 19.7275 18.8834 19.2959 19.1424 18.9767C19.619 19.5028 20.0545 19.9935 20.0545 19.9935C19.7838 20.3246 19.413 20.7384 18.9894 21.1227C18.0949 21.9385 17.2475 22.3524 16.4707 22.3524C14.6053 22.3524 13.093 20.8212 13.093 18.9353C13.093 18.6633 13.1283 18.3973 13.1871 18.1431C13.1912 18.1256 13.2068 18.0691 13.2404 17.9879C13.6503 16.5766 14.9451 15.5414 16.4743 15.5357C17.766 15.5357 19.0712 16.7753 20.0356 17.8941L20.0403 17.8886L20.042 17.8905C20.3124 17.5601 20.6819 17.1481 21.1039 16.7653ZM23.6225 20.9983C23.6047 20.9983 23.5855 20.9976 23.565 20.996C22.8434 20.7245 22.2318 20.2355 22.0704 20.0819C21.5126 19.5501 20.9879 18.9465 20.9541 18.9074C21.2128 18.5886 21.5823 18.1589 22.0101 17.7704C22.8045 17.0432 23.3223 16.8954 23.6225 16.8954C24.7406 16.8954 25.6468 17.8117 25.6468 18.9469C25.6468 20.0701 24.7406 20.9864 23.6225 20.9983Z"
      fill="#3B00B9"
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
    <rect x="1" y="0.5" width="39" height="39" rx="19.5" fill="white" />
    <rect x="1" y="0.5" width="39" height="39" rx="19.5" stroke="#DFDFDF" />
    <g clipPath="url(#clip0_14156_10811)">
      <path
        d="M29.5 12H15.5C14.9696 12 14.4609 12.2107 14.0858 12.5858C13.7107 12.9609 13.5 13.4696 13.5 14C13.5 14.5304 13.7107 15.0391 14.0858 15.4142C14.4609 15.7893 14.9696 16 15.5 16H29.5V29C29.5 29.2652 29.3946 29.5196 29.2071 29.7071C29.0196 29.8946 28.7652 30 28.5 30H15.5C14.4391 30 13.4217 29.5786 12.6716 28.8284C11.9214 28.0783 11.5 27.0609 11.5 26V14C11.5 12.9391 11.9214 11.9217 12.6716 11.1716C13.4217 10.4214 14.4391 10 15.5 10H28.5C28.7652 10 29.0196 10.1054 29.2071 10.2929C29.3946 10.4804 29.5 10.7348 29.5 11V12ZM13.5 26C13.5 26.5304 13.7107 27.0391 14.0858 27.4142C14.4609 27.7893 14.9696 28 15.5 28H27.5V18H15.5C14.7978 18.0011 14.1078 17.8166 13.5 17.465V26ZM28.5 15H15.5C15.2348 15 14.9804 14.8946 14.7929 14.7071C14.6054 14.5196 14.5 14.2652 14.5 14C14.5 13.7348 14.6054 13.4804 14.7929 13.2929C14.9804 13.1054 15.2348 13 15.5 13H28.5V15Z"
        fill="#3B00B9"
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
    <article className="flex flex-col justify-between px-6 pt-6 pb-6 bg-white rounded-lg text-black">
      <div>
        {" "}
        <header className="flex gap-2 justify-between self-stretch">
          <h5 className="tw-heading-6">{title}</h5>
          <div className="basis-7 w-7 grow-0 shrink-0">
            {status === "deployed" && <DeployedIcon />}
            {status === "in_progress" && inProgressIcon}
            {status === "future" && futureIcon}
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
  wiki: string;
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
}> = ({ name, subtitle, overview, eta, elements, status, color, color2 }) => {
  const [expanded, setExpanded] = useState(false);

  //   wrapperClasses += ` border-2 border-solid border-[var(--color)] order-opacity-20`;
  // } else {
  //   wrapperClasses += ` border-2 border-solid border-[var(--color)]`;

  if (name === "Past features") {
    return (
      <article
        id={name}
        className={`milestone-large border-2 border-solid border-[var(--color)] rounded-xl mb-15 md:mb-30 relative scroll-mt-30 md:scroll-mt-15`}
      >
        <Blobs />
        <div className="p-5">
          <h4
            className="tw-heading-4 !m-0 flex justify-between cursor-pointer hover:opacity-70 select-none"
            onClick={() => setExpanded(!expanded)}
          >
            {name.toUpperCase()}{" "}
            <span>
              {expanded ? (
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
        {expanded && (
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
                      wiki={element.wiki}
                      docs={element.docs}
                      proposal={element.proposal}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </article>
    );
  }
  if (name === "Future features") {
    return (
      <article
        id={name}
        className={`milestone-large border-2 border-solid border-[var(--color)] rounded-xl mb-15 md:mb-30 relative  scroll-mt-30 md:scroll-mt-15`}
      >
        <Blobs />
        <div className="p-5">
          <h4 className="tw-heading-4 mb-3">{name.toUpperCase()}</h4>
          {/* <p className="tw-paragraph font-bold mb-4 md:w-3/10">{subtitle}</p>
     
        <p className="tw-paragraph mb-10">
          <span className="text-white/60">Milestone</span>{" "}
          {eta === "none" || !eta ? "" : eta}
        </p>

        <p className="text-white/60 tw-paragraph mt-6 md:w-2/3">{overview}</p>  */}
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
                wiki={element.wiki}
                docs={element.docs}
                proposal={element.proposal}
              />
            ))}
          </div>
        </div>
      </article>
    );
  }
  return (
    <article
      id={name}
      className={`milestone-large border-2 border-solid border-[var(--color)] rounded-xl mb-15 md:mb-30 relative  scroll-mt-36 md:scroll-mt-15 overflow-hidden`}
      style={{
        backgroundColor: status === "in_progress" ? color : "",
      }}
    >
      {status === "in_progress" && <CardBlobs />}
      <Blobs />
      <div className="p-5 relative z-3">
        <div className="md:grid md:grid-cols-[6fr,10fr] gap-2">
          <div>
            <h4 className="tw-heading-4 mb-2">{name.toUpperCase()}</h4>
            <p className="tw-paragraph mb-2">
              <span className="text-white/60">Milestone</span>{" "}
              {eta === "none" || !eta ? "" : eta}
            </p>
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
  anchor: string | null;
  color: string | null;
  color2: string | null;
}> = ({ onClose, openAt, data, anchor, color, color2 }) => {
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

  useEffect(() => {
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [anchor, color]);

  console.log(color, "color");
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
        className="relative container-10 px-6 py-12 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="float-right pointer-events-none sticky top-8 md:top-20 z-10 md:pr-8">
          <button
            className="pointer-events-auto flex  w-10 h-10 rounded-full border-none bg-[#181818] justify-center items-center"
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
                fill-opacity="0.6"
              />
              <path d="M9.34277 9.34375L20.6565 20.6575" stroke="white" />
              <path d="M9.34277 20.6572L20.6565 9.34352" stroke="white" />
            </svg>
          </button>
        </div>
        <div className="md:top-20 z-10 pr-0 md:pr-8 ">
          {data && data[openAt] && (
            <div>
              <section className="my-12 md:my-24">
                <h2 className="tw-heading-3  font-black md:tw-heading-2 md:w-8/10">
                  {data[openAt].name.toUpperCase()}
                </h2>
                <p className="tw-lead-sm md:tw-lead md:w-9/10">
                  {data[openAt].description}
                </p>
              </section>
              <section>
                {data[openAt].milestones
                  .sort((a, b) => {
                    if (a.name === "orphans_past") return -1;
                    if (b.name === "orphans_past") return 1;
                    if (a.name === "orphans_future") return 1;
                    if (b.name === "orphans_future") return -1;
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
