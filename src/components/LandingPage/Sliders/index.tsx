import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimateSpawn from "../../Common/AnimateSpawn";
import { slides } from "./data";
import LeftArrow from "./LeftArrow.svg";
import RightArrow from "./RightArrow.svg";
import { Slide } from "./Slide";
import transitions from "@site/static/transitions.json";
import { isSafari } from "@site/src/utils/browsers";

const Sliders = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);
  const [shouldAutoRotate, setShouldAutoRotate] = useState(true);
  const [inViewRef, inView] = useInView({ threshold: 1, triggerOnce: true });

  function next() {
    setIndex((index + 1) % slides.length);
  }
  function prev() {
    setIndex(index === 0 ? slides.length - 1 : index - 1);
  }

  useEffect(() => {
    const nextSlideEl = ref.current.children.item(index) as HTMLDivElement;

    if (isSafari(navigator.userAgent)) {
      ref.current.scrollTo({ left: nextSlideEl.offsetLeft });
    } else {
      ref.current.scrollTo({
        left: nextSlideEl.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [index]);

  useEffect(() => {
    if (inView && shouldAutoRotate) {
      const handle = setInterval(next, 3000);
      return () => clearInterval(handle);
    }
  }, [inView, shouldAutoRotate, index]);

  useEffect(() => {
    function onTouchMove() {
      setShouldAutoRotate(false);
    }

    function onScroll() {
      let currentChildIndex = null,
        currentChildDist = Number.MAX_VALUE;
      for (let i = 0; i < ref.current.children.length; i++) {
        const child = ref.current.children.item(i) as HTMLDivElement;
        const dist = Math.abs(child.offsetLeft - ref.current.scrollLeft);
        if (dist < currentChildDist) {
          currentChildDist = dist;
          currentChildIndex = i;
        }
      }

      if (dotIndex != currentChildIndex) {
        setDotIndex(currentChildIndex);
      }
    }

    ref.current.addEventListener("touchmove", onTouchMove);
    ref.current.addEventListener("scroll", onScroll);

    return () => {
      ref.current.removeEventListener("touchmove", onTouchMove);
      ref.current.removeEventListener("scroll", onScroll);
    };
  }, [dotIndex]);

  useEffect(() => {
    if (!isSafari(navigator.userAgent)) {
      ref.current.classList.add("scroll-smooth");
    }
  }, []);

  return (
    <AnimateSpawn
      className="container-12 my-30"
      el={motion.section}
      variants={transitions.item}
    >
      <div className="relative" ref={inViewRef}>
        <button
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-12 bg-black-60 rounded-xl p-2 border-none text-white hover:bg-infinite"
          onClick={() => {
            prev();
            setShouldAutoRotate(false);
          }}
        >
          <LeftArrow></LeftArrow>
        </button>
        <button
          className="hidden md:flex  absolute top-1/2 -translate-y-1/2 right-12 bg-black-60 rounded-xl p-2 border-none text-white hover:bg-infinite"
          onClick={() => {
            next();
            setShouldAutoRotate(false);
          }}
        >
          <RightArrow></RightArrow>
        </button>
        <div
          className="flex gap-6 overflow-auto pb-4 md:overflow-hidden snap-x snap-mandatory"
          ref={ref}
        >
          {slides.map((s, index) => (
            <Slide
              backgroundImageUrl={s.backgroundImageUrl}
              sideImageUrl={s.sideImageUrl}
              key={index}
            >
              {s.body}
            </Slide>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4 md:mt-8 ">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              setShouldAutoRotate(false);
            }}
            className={`bg-infinite w-3 h-3 rounded-full transition-opacity border-none p-0 ${
              i == dotIndex ? "opacity-100" : "opacity-25"
            } ${i == index ? "md:opacity-100" : "md:opacity-25"}`}
          ></button>
        ))}
      </div>
    </AnimateSpawn>
  );
};

export default Sliders;
