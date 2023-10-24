import { motion } from "framer-motion";
import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "../Common/AnimateSpawn";

export type GalleryItem = {
  image: string;
  title?: string;
  description?: string;
};

const GalleryShowcase: React.FC<{
  gallery: GalleryItem[];
}> = ({ gallery }) => {
  const topRow = gallery.slice(0, Math.floor(gallery.length / 2));
  const bottomRow = gallery.slice(Math.floor(gallery.length / 2));
  return (
    <AnimateSpawn
      className="overflow-hidden relative h-[280px] md:h-[560px]"
      variants={transitions.container}
    >
      <div className="flex gap-1 md:gap-3 absolute left-1/2 min-w-max nft-marquee-right">
        {topRow.map((item) => (
          <img
            key={item.image}
            src={item.image}
            loading="lazy"
            alt=""
            className="w-40 md:w-80 aspect-square object-cover object-center rounded-xl"
          />
        ))}
        {topRow.map((item) => (
          <img
            key={item.image}
            src={item.image}
            loading="lazy"
            alt=""
            className="w-40 md:w-80 aspect-square object-cover object-center rounded-xl"
          />
        ))}
      </div>

      <div className="flex gap-1 md:gap-3 absolute top-40 md:top-80 mt-6 md:mt-8 left-1/2 min-w-max nft-marquee-left">
        {bottomRow.map((item) => (
          <img
            key={item.image}
            src={item.image}
            loading="lazy"
            alt=""
            className="w-24 md:w-52 aspect-square object-cover object-center rounded-xl"
          />
        ))}
        {bottomRow.map((item) => (
          <img
            key={item.image}
            src={item.image}
            loading="lazy"
            alt=""
            className="w-24 md:w-52 aspect-square object-cover object-center rounded-xl"
          />
        ))}
      </div>
    </AnimateSpawn>
  );
};

const Gallery: React.FC<{
  gallery: GalleryItem[];
  children: React.ReactNode;
}> = ({ gallery, children }) => {
  return (
    <>
      <AnimateSpawn
        className="container-10 relative mb-20"
        el={motion.section}
        variants={transitions.container}
      >
        {children}
      </AnimateSpawn>

      <GalleryShowcase gallery={gallery} />
    </>
  );
};

export default Gallery;
