import { useMotionTemplate, useScroll, useTransform } from "framer-motion";
import React from "react";
import { useEffect, useRef } from "react";
import  simplexNoise from "simplex-noise";

import { motion } from "framer-motion";

const colors = [
  [30/255, 0/255, 93/255], 
  [59/255, 0/255, 185/255], 
  [117/255, 78/255, 204/255], 
  [59/255, 0/255, 185/255], 
  [218/255, 57/255, 121/255], 
  [30/255, 0/255, 93/255], 
  [59/255, 0/255, 185/255],
];

const niceSeeds = [
  'birkenstock',
  6.3, 
  'Maurice M', 
  'Rai', 
  'rei', 
  'rect..angle', 
  'i want dean back', 
  'snoopdog',
  'alli mini änteli',
  'asd',
  'fuddie',
  'caramel+',
];

const options = {
  steps: 300,
  seed:  niceSeeds[Math.floor(Math.random() * niceSeeds.length)],
  noisePos: 0,
  rotation: 2,
  radius: 0.5,
  radiusVariation: 0.11,
  gradientStopPos: 0,
  gradientStartPos: 3,
  gradientOffset: 0.4,
  bg: 0,
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function rgbToCSS(rgb) {
  return `rgb(${rgb[0] * 255}  ${rgb[1] * 255} ${rgb[2] * 255})`;
}

const lerp = (percent, lastValue, nextValue) => {
  return lastValue + percent * (nextValue - lastValue);
};

const lerpArr = (percent, lastValues, nextValues) =>
  lastValues.map((v, i) => lerp(percent, v, nextValues[i]));

const lerpMultiple = (percent, points, fn = lerp) => {
  const per = clamp(percent, 0, 1);
  const partSize = 1 / (points.length - 1);
  const index = Math.floor(per / partSize);
  const clampedPercent = (per % partSize) / partSize;

  if (index >= points.length - 1) {
    return points[points.length - 1];
  }

  return fn(clampedPercent, points[index], points[index + 1]);
};

const simplex = new simplexNoise(`${options.seed}`);
const noise2d = (x, y) => {
  return simplex.noise2D(x, y);
}

const HomeAnimation = () => {
  let relScrollTop = 0;

  const canvasContainer = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: canvasContainer,
    offset: ["start start", "end start"],
  });

  const blurSize = useTransform(scrollYProgress, [0.3, 0.66], [0, 12]);
  const blur = useMotionTemplate`blur(${blurSize}px)`;

  useEffect(() => {
    let w = window.innerWidth;
    let h = canvasContainer.current.getBoundingClientRect().height || window.innerHeight;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    function draw() {
      ctx.fillStyle = rgbToCSS(colors[0]);
      ctx.fillRect(0, 0, w, h);

      for(let i = 0; i < options.steps; i++) {
        const relI = i / options.steps;

        ctx.save();
        const x = w / 2;
        const y = (h * .05) + (h * relI) * 0.8;
        ctx.translate(
          Math.floor(x), 
          Math.floor(y)
        );

        ctx.rotate(noise2d(options.noisePos, relI) * options.rotation);
        const currentColor = lerpMultiple(relI, colors, lerpArr);
        ctx.fillStyle = rgbToCSS(currentColor);

        const radius = Math.floor(w * 0.1) + Math.floor(
          Math.abs(
            (w * options.radius) + noise2d(options.noisePos, relI) * w * options.radiusVariation
          )
        );

        const grd = ctx.createLinearGradient(
          0,
          0,
          Math.floor(radius * options.gradientStartPos), 
          Math.floor(radius * options.gradientStopPos)
        );

        const secondColor = lerpMultiple(
          i - ((options.steps - i) * options.gradientOffset)/options.steps
          , colors, lerpArr
        );
        grd.addColorStop(0, rgbToCSS(currentColor));
        grd.addColorStop(1, rgbToCSS(secondColor));
        ctx.fillStyle = grd;
        ctx.beginPath();
        const noIzMoD = Math.floor(
          Math.abs(noise2d(relI, options.noisePos) * radius)
        );
        ctx.moveTo(noIzMoD, noIzMoD);
        ctx.quadraticCurveTo(
          radius + noIzMoD, 
          noIzMoD, 
          radius + noIzMoD, 
          radius + noIzMoD
        );
        ctx.quadraticCurveTo(
          radius + noIzMoD, 
          radius * 2 + noIzMoD, 
          noIzMoD, 
          radius * 2 + noIzMoD
        );
        ctx.quadraticCurveTo(
          -radius - noIzMoD, 
          radius * 2 + noIzMoD, 
          -radius - noIzMoD, 
          radius
        );
        ctx.quadraticCurveTo(
          -radius - noIzMoD, 
          noIzMoD, 
          noIzMoD, 
          noIzMoD
        );
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
    
    function onWindowResize() {
      w = window.innerWidth;
      h = canvasContainer.current.getBoundingClientRect().height || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    }
    
    onWindowResize();
    draw();

    canvasContainer.current.appendChild(canvas);


    const $body = document.querySelector("body");

    window.addEventListener("resize", onWindowResize, false);

    function onScroll() {
      const relScroll = document.documentElement.scrollTop / $body.scrollHeight;
      relScrollTop = relScroll + 0.1 * relScroll;

      options.noisePos += Math.abs(relScrollTop * .01);
    }

    window.addEventListener("scroll", onScroll);

    let requestAnimationFrameHandle: number = 0;

    function animate() {
      options.noisePos += 0.0002;
    
      draw();
      requestAnimationFrameHandle = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("scroll", onScroll);

      canvasContainer.current.removeChild(canvas);

      cancelAnimationFrame(requestAnimationFrameHandle);
    };
  }, []);

  return (
    <motion.div
      className="
        absolute 
        inset-0 
        overflow-clip
      "
      ref={canvasContainer}
      /*style={{
        filter: blur,
      }}*/
    >

    <span className="
        absolute
        block
        bottom-0 
        left-0 
        right-0 
        h-24
        bg-[linear-gradient(transparent,#1B025A)]
    ">
    </span>
    </motion.div>
  );
};

export default HomeAnimation;
