import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import ExternalLinkIcon from "@site/static/img/external-link.svg";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import BTCInterviewThumb from "@site/static/img/bitcoin-integration/BTCInterviewThumb.jpeg";
function Index() {
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="max-w-page-narrow relative mx-auto mb-20 px-6 md:mb-40 md:px-15"
    >
      <div className="flex flex-col md:flex-row mb-24">
        <p className="tw-heading-4 md:tw-heading-60 md:mr-5 md:w-4/10 flex-none">
          Bitcoin Videos
        </p>
        <div className="md:pr-2/10">
          <p className="tw-lead-sm">
            From concept to coding - learn all albout the Bitcoin Integration
            feature on the Internet Computer through these videos.{" "}
          </p>
          <a
            href="/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black hover:no-underline tw-heading-6"
          >
            Explore more videos
            <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
          </a>
        </div>
      </div>
      <div className={"relative flex flex-col md:flex-row rounded-xl bg-white"}>
        <a
          href={"https://www.youtube.com/watch?v=XwpAt89vtME"}
          target="_blank"
          className={"md:w-2/3"}
        >
          <div className="group relative h-0 pb-16/9">
            <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
              <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
            </div>
            <img
              className="inset-0 w-full h-full z-[1] absolute object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl"
              src={BTCInterviewThumb}
              alt=""
            />
          </div>
        </a>
        <div
          className={
            "md:px-12 px-6 py-6 md:py-0 md:mb-16 mt-auto bg-white md:w-1/3 rounded-xl md:rounded-none"
          }
        >
          <p className={"tw-heading-7 text-razzmatazz mb-3"}>Interview</p>
          <p className={"tw-heading-6 md:tw-heading-5 mb-3"}>
            The What, the How and Why of Bitcoin Integration
          </p>
          <p className={"tw-lead-sm mb-0 text-black-60"}>
            With Andrew Chepreghy & Manu Drijvers
          </p>
        </div>
      </div>
      <div className={"flex flex-col md:flex-row gap-5 mt-5"}>
        <a
          href={"https://www.youtube.com/watch?v=XwpAt89vtME"}
          target="_blank"
          className={"md:w-1/2"}
        >
          <div className="group relative h-0 pb-16/9">
            <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
              <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
            </div>
            <img
              className="inset-0 w-full h-full z-[1] absolute object-cover rounded-xl"
              src={`https://img.youtube.com/vi/LGegOFqP5x0/sddefault.jpg`}
              alt=""
            />
          </div>
        </a>
        <a
          href={"https://www.youtube.com/watch?v=XwpAt89vtME"}
          target="_blank"
          className={"md:w-1/2"}
        >
          <div className="group relative h-0 pb-16/9">
            <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
              <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
            </div>
            <img
              className="inset-0 w-full h-full z-[1] absolute object-cover rounded-xl"
              src={`https://img.youtube.com/vi/H6Wu9n9Qwa8/sddefault.jpg`}
              alt=""
            />
          </div>
        </a>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
