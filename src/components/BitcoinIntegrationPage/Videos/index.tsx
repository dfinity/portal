import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import ExternalLinkIcon from "@site/static/img/external-link.svg";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import BTCInterviewThumb from "@site/static/img/bitcoin-integration/BTCInterviewThumb.webp";

const videos = [
  {
    id: "LGegOFqP5x0",
    title: "Code Native Bitcoin I",
  },
  {
    id: "H6Wu9n9Qwa8",
    title: "Code Native Bitcoin II",
  },
  // {
  //   id: "H6Wu9n9Qwa8",
  //   title: "Code ckBTC",
  // },
];

function Index() {
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="max-w-page-10-cols relative mx-auto mb-20 px-6 md:mb-40 md:px-15"
    >
      <div className="flex flex-col md:flex-row mb-12 md:mb-24">
        <h2 className="tw-heading-4 md:tw-heading-60 md:mr-5 md:w-4/10 flex-none">
          Watch & Learn
        </h2>
        <div className="md:pr-2/10">
          <p className="tw-lead-sm">
            From concept to coding — learn all about the Bitcoin Integration
            feature on ICP through these videos.
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
          aria-label="Video: The What, the How and Why of Bitcoin Integration"
        >
          <div className="group relative h-0 pb-16/9">
            <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
              <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
            </div>
            <img
              className="inset-0 w-full h-full z-[1] absolute object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl aspect-[729/410]"
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
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"}>
        {videos.map((video) => (
          <a
            aria-label={`Video: ${video.title}`}
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
          >
            <div className="group relative flex">
              <div className="bg-white-30 backdrop-blur-xl group-hover:bg-infinite transition-colors h-12 w-12 md:h-16 md:w-16 rounded-full z-10 absolute inset-0 m-auto flex">
                <PlaySVG className="m-auto h-5 w-5 text-white transition-colors" />
              </div>
              <img
                className="aspect-video object-cover rounded-xl w-full"
                src={`https://img.youtube.com/vi/${video.id}/sddefault.jpg`}
                alt=""
              />
            </div>
          </a>
        ))}
      </div>
    </AnimateSpawn>
  );
}

export default Index;
