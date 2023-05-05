import clsx from "clsx";
import React from "react";
import AnimateSpawn from "../AnimateSpawn";
import transitions from "@site/static/transitions.json";

const TranslatedLayout: React.FC<{
  children: React.ReactNode;
  reverse?: boolean;
  imageUrl?: string;
  video?: { videoUrl: string; videoContentType: string };
  customContent?: React.ReactNode;
  alt?: string;
  imageClassName?: string;
  imageWithBlob?: false | string;
}> = ({
  children,
  reverse = false,
  alt = "",
  imageUrl,
  video,
  imageWithBlob = false,
  imageClassName,
  customContent,
}) => {
  if (!imageUrl && !video && !customContent) {
    throw new Error("imageUrl or video or customContent must be provided");
  }

  let mediaEl: React.ReactNode;

  if (imageUrl) {
    mediaEl = (
      <img
        src={imageUrl}
        alt={alt}
        className={clsx(
          "mb-8 md:mb-0 max-h-[600px] object-contain object-center rounded-xl xl:rounded-xl",
          imageClassName,
          reverse ? "md:rounded-l-none" : "md:rounded-r-none"
        )}
      />
    );
  } else if (video) {
    mediaEl = (
      <video
        loop
        autoPlay
        muted
        playsInline
        className={clsx(
          "mb-8 md:mb-0 max-h-[600px] object-contain object-center rounded-xl xl:rounded-xl w-full",
          reverse ? "md:rounded-l-none" : "md:rounded-r-none"
        )}
      >
        <source src={video.videoUrl} type={video.videoContentType} />
      </video>
    );
  } else if (customContent) {
    mediaEl = (
      <div className="mb-8 md:mb-0 max-h-[600px] rounded-xl xl:rounded-xl w-full">
        {customContent}
      </div>
    );
  }

  return reverse ? (
    <AnimateSpawn
      className="flex flex-col md:flex-row"
      variants={transitions.item}
    >
      <div className="flex-1 text-center relative md:-ml-[50px] md:flex md:justify-start md:items-center">
        {imageWithBlob && <div className={imageWithBlob}></div>}
        {mediaEl}
      </div>
      <div className="flex flex-col justify-center md:w-7/12">
        <div className="md:mx-auto md:w-[71.4%]">{children}</div>
      </div>
    </AnimateSpawn>
  ) : (
    <AnimateSpawn
      className="flex flex-col md:flex-row"
      variants={transitions.item}
    >
      <div className="md:w-7/12 flex flex-col justify-center order-2 md:order-1">
        <div className="md:mx-auto md:w-[71.4%]">{children}</div>
      </div>
      <div className="flex-1 text-center order-1 md:order-2 relative md:-mr-[50px] md:flex md:justify-end md:items-center">
        {imageWithBlob && (
          <div className="blob blob-infinite blob-center blob-md md:blob-lg"></div>
        )}
        {mediaEl}
      </div>
    </AnimateSpawn>
  );
};

export default TranslatedLayout;
