import Link from "@docusaurus/Link";
import { elegantWebsiteUrl } from "@site/src/utils/showcase";
import React, { useEffect, useRef, useState } from "react";
import { colorRegistry, ShowcaseProject } from "../ShowcaseProject";
import ColorThief from "colorthief";
import { hslToRgb, rgbToHsl } from "../../../utils/colors";
import Tooltip from "../../Common/Tooltip";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "../../../../static/transitions.json";
import { motion } from "framer-motion";

const colorThief = new ColorThief();

function getDominantColorOnLoad(img): [number, number, number] | false {
  try {
    let rgb = colorThief.getPalette(
      img,
      2,
      Math.min(10, Math.ceil(img.width / 10))
    )[0] as [number, number, number];
    let hsl = rgbToHsl(...rgb);
    if (hsl[2] < 0.5) {
      // dark dominant color
      hsl[2] = 0.8;
      hsl[1] = Math.max(hsl[1], 0.7);
      rgb = hslToRgb(...hsl);
    } else {
      // light dominant color
      hsl[2] = Math.max(hsl[1], 0.8);
      hsl[1] = 0.5;
      rgb = hslToRgb(...hsl);
    }
    return rgb;
  } catch (e) {
    console.error(e);
    return false;
  }
}

const Header: React.FC<{
  project: ShowcaseProject;
  className?: string;
  onBgColor: (string) => void;
}> = ({ project, onBgColor }) => {
  return (
    <div className="flex gap-2 p-6">
      <img
        loading="lazy"
        src={project.logo}
        alt=""
        crossOrigin="anonymous"
        className="w-14 h-14 object-contain object-center"
        onLoad={(e) => {
          if (!(project.logo in colorRegistry)) {
            const rgb = getDominantColorOnLoad(e.target);

            if (rgb === false) {
              colorRegistry[project.logo] = colorRegistry.default;
              onBgColor(colorRegistry.default);
            } else {
              const color = `rgb(${rgb.join(",")})`;
              colorRegistry[project.logo] = color;
              onBgColor(color);
            }
          } else {
            onBgColor(colorRegistry[project.logo]);
          }
        }}
      />
      <div>
        <h3 className="tw-heading-5 mb-1">{project.name}</h3>
        <Link
          href={project.website}
          className="bg-[#F2F2F2] tw-caption rounded-md px-2 py-1 hover:no-underline transition-colors text-black hover:bg-black-60 hover:text-white text-"
        >
          {elegantWebsiteUrl(project.website)}
        </Link>
      </div>
    </div>
  );
};

const Media: React.FC<{
  project: ShowcaseProject;
  className?: string;
  bgColor: string;
}> = ({ project, className, bgColor }) => {
  // const availableImages = [project.screenshots?.[0], project.logo].filter(
  //   (src) => !!src
  // );
  // const [bgColor, setBgColor] = useState(
  //   colorRegistry[availableImages[0] || "default"]
  // );

  const { ref, inView } = useInView({ threshold: 0 });
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    if (!videoRef.current) return;

    // start playing the video when it comes in view
    if (inView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <div
      className={clsx("p-5", className)}
      style={{
        backgroundColor: bgColor,
      }}
      ref={ref}
    >
      {project.video ? (
        inView && (
          <video
            loop
            muted
            playsInline
            className={clsx(
              "w-full object-contain object-center",
              project.display === "Large" ? " w-full" : "h-48"
            )}
            ref={videoRef}
          >
            <source src={project.video} type={project.videoContentType} />
          </video>
        )
      ) : (
        <img
          loading="lazy"
          src={project.screenshots[0]}
          alt=""
          className={clsx(
            "w-full object-contain object-center",
            project.display === "Large" ? " w-full" : "h-48"
          )}
        />
      )}
    </div>
  );
};

const Info: React.FC<{ project: ShowcaseProject; className?: string }> = ({
  project,
}) => {
  return (
    <div className=" p-6 tw-paragraph-sm flex-1">
      <p className="mb-3  text-black-60">{project.description}</p>
      <span className="text-black">{project.stats}</span>
    </div>
  );
};
const Footer: React.FC<{
  project: ShowcaseProject;
  className?: string;

  onTagClick: (string) => void;
}> = ({ project, onTagClick }) => {
  return (
    <div className="flex gap-5 p-6">
      <div className="flex flex-wrap gap-2 flex-1">
        {project.tags.map((tag) => (
          <button
            key={tag}
            className="capitalize font-circular text-navigation cursor-pointer bg-transparent text-infinite border-infinite border border-solid py-px px-3 rounded-md hover:text-white hover:bg-infinite transition-colors"
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="self-end flex gap-3">
        {project.github && (
          <Link
            href={project.github}
            className="text-infinite hover:no-underline hover:text-black"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.3625 0 0 5.3625 0 12C0 17.2875 3.45 21.7875 8.2125 23.4C8.8125 23.5125 9.0375 23.1375 9.0375 22.8375C9.0375 22.5375 9.0375 21.7875 9.0375 20.8125C5.7 21.525 4.9875 19.2 4.9875 19.2C4.425 17.8125 3.6375 17.4375 3.6375 17.4375C2.55 16.6875 3.7125 16.725 3.7125 16.725C4.9125 16.8 5.55 17.9625 5.55 17.9625C6.6375 19.8 8.3625 19.275 9.0375 18.975C9.15 18.1875 9.45 17.6625 9.7875 17.3625C7.125 17.0625 4.3125 16.0125 4.3125 11.4375C4.3125 10.125 4.7625 9.075 5.55 8.2125C5.4375 7.9125 5.025 6.675 5.6625 5.025C5.6625 5.025 6.675 4.6875 8.9625 6.2625C9.9375 6 10.95 5.85 11.9625 5.85C12.975 5.85 14.025 6 14.9625 6.2625C17.25 4.725 18.2625 5.025 18.2625 5.025C18.9 6.675 18.4875 7.9125 18.375 8.2125C19.1625 9.0375 19.6125 10.125 19.6125 11.4375C19.6125 16.05 16.8 17.0625 14.1375 17.3625C14.55 17.7375 14.9625 18.45 14.9625 19.575C14.9625 21.1875 14.9625 22.4625 14.9625 22.875C14.9625 23.2125 15.1875 23.5875 15.7875 23.4375C20.55 21.7875 24 17.2875 24 12C24 5.3625 18.6375 0 12 0Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        )}
        {project.usesInternetIdentity && (
          <Tooltip
            tooltip="Uses Internet Identity"
            className="left-10 -translate-x-full md:left-1/2 md:-translate-x-1/2"
          >
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-infinite"
            >
              <path
                d="M15.6161 8.03821C14.8361 8.03821 13.9859 8.41437 13.0872 9.15529C12.6609 9.50637 12.2927 9.88253 12.0166 10.1835C12.0166 10.1835 12.0166 10.1835 12.019 10.1857V10.1835C12.019 10.1835 12.455 10.6303 12.9371 11.109C13.1962 10.8195 13.5693 10.4251 13.998 10.0695C14.7973 9.41062 15.3181 9.27156 15.6161 9.27156C16.7376 9.27156 17.6483 10.1082 17.6483 11.1364C17.6483 12.1577 16.7351 12.9944 15.6161 13.0012C15.5652 13.0012 15.4998 12.9944 15.4174 12.9784C15.7444 13.1107 16.0957 13.2064 16.4299 13.2064C18.484 13.2064 18.8861 11.9457 18.9127 11.8545C18.9733 11.6243 19.0048 11.3826 19.0048 11.1341C19.0048 9.42886 17.4836 8.03821 15.6161 8.03821Z"
                fill="currentColor"
              />
              <path
                d="M8.44146 14.2391C9.22143 14.2391 10.0716 13.8629 10.9703 13.122C11.3966 12.7709 11.7648 12.3948 12.0409 12.0938C12.0409 12.0938 12.0409 12.0938 12.0385 12.0916V12.0938C12.0385 12.0938 11.6025 11.647 11.1205 11.1683C10.8613 11.4578 10.4883 11.8522 10.0595 12.2078C9.26018 12.8667 8.7394 13.0057 8.44146 13.0057C7.31996 13.0035 6.40919 12.1668 6.40919 11.1386C6.40919 10.1173 7.32238 9.28062 8.44146 9.27378C8.49233 9.27378 8.55773 9.28062 8.64009 9.29658C8.31308 9.16435 7.96186 9.0686 7.62759 9.0686C5.57352 9.0686 5.17385 10.3293 5.14478 10.4182C5.08422 10.6508 5.05273 10.8901 5.05273 11.1386C5.05273 12.8484 6.57391 14.2391 8.44146 14.2391Z"
                fill="currentColor"
              />
              <path
                d="M16.4254 13.1791C15.3742 13.154 14.2817 12.3743 14.0589 12.1805C13.4824 11.679 12.1526 10.3225 12.0484 10.2154C11.0747 9.18721 9.75456 8.03821 8.4417 8.03821H8.43928H8.43686C6.84302 8.04505 5.50351 9.06182 5.14502 10.4183C5.17166 10.3294 5.69729 9.04358 7.6254 9.08918C8.67666 9.11425 9.77394 9.90533 9.99921 10.0991C10.5757 10.6007 11.9055 11.9571 12.0097 12.0643C12.9834 13.0901 14.3035 14.2391 15.6164 14.2391H15.6188H15.6212C17.2151 14.2323 18.557 13.2155 18.9131 11.8591C18.884 11.948 18.356 13.2224 16.4254 13.1791Z"
                fill="currentColor"
              />
              <path
                d="M1.09091 15.2727H2.01136C3.69545 19.125 1.09091 22 12 22C22.9091 22 20.3045 19.125 21.9886 15.2727H22.9091C23.5091 15.2727 24 14.7818 24 14.1818V7.63636C24 7.03636 23.5091 6.54545 22.9091 6.54545H21.9886C20.3045 2.69318 16.4727 0 12 0C7.52727 0 3.69545 2.69318 2.01136 6.54545H1.09091C0.490909 6.54545 0 7.03636 0 7.63636V14.1818C0 14.7818 0.490909 15.2727 1.09091 15.2727ZM3.81818 9.27273C3.81818 7.76591 5.28409 6.54545 7.09091 6.54545H16.9091C18.7159 6.54545 20.1818 7.76591 20.1818 9.27273V10.9091C20.1818 14.5227 17.25 17.4545 13.6364 17.4545H10.3636C6.75 17.4545 3.81818 14.5227 3.81818 10.9091V9.27273Z"
                fill="currentColor"
              />
            </svg>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

const Project: React.FC<{
  project: ShowcaseProject;
  large: boolean;
  onTagClick: (string) => void;
}> = ({ project, large, onTagClick }) => {
  const [bgColor, setBgColor] = useState(colorRegistry[project.logo]);
  return (
    <AnimateSpawn
      el={motion.article}
      variants={transitions.item}
      className={clsx(
        "bg-white rounded-xl border-solid border border-[#BEC9E5] flex ",
        large ? "sm:col-span-2 md:col-span-3 overflow-hidden" : ""
      )}
    >
      <div className="flex flex-col flex-1">
        <Header project={project} onBgColor={setBgColor}></Header>
        <Media
          project={project}
          bgColor={bgColor}
          className={clsx(large ? "md:hidden" : "")}
        ></Media>
        <Info project={project}></Info>
        <Footer project={project} onTagClick={onTagClick}></Footer>
      </div>
      {large && (
        <Media
          project={project}
          bgColor={bgColor}
          className="hidden md:block flex-[2]"
        ></Media>
      )}
    </AnimateSpawn>
  );
};

export default Project;
