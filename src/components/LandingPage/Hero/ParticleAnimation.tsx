import { useMotionTemplate, useScroll, useTransform } from "framer-motion";
import React from "react";
import { useEffect, useRef } from "react";
import SimplexNoise from "simplex-noise";
import {
  Scene,
  PerspectiveCamera,
  Fog,
  BufferGeometry,
  PointsMaterial,
  AdditiveBlending,
  Float32BufferAttribute,
  Points,
  WebGLRenderer,
  BufferAttribute,
  Texture,
} from "three";
import { motion } from "framer-motion";

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
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

const colorsLinear = [
  [237, 30, 121],
  //[241,90, 36], //o
  [251, 176, 59], //y
  [251, 176, 59], //y
  [137, 14, 237], //p
  [41, 171, 226], //b
  [237, 30, 121],
  [59, 0, 185], //pu
  [41, 171, 226], //b
].map((cls) => cls.map((n) => n / 255));

const simplex = new SimplexNoise();

// check if the browser is safari
// too many particles will make safari perform badly
const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const ParticleAnimation = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: canvasContainer,
    offset: ["start start", "end start"],
  });

  const blurSize = useTransform(scrollYProgress, [0.3, 0.66], [0, 12]);
  const blur = useMotionTemplate`blur(${blurSize}px)`;

  useEffect(() => {
    const scene = new Scene();

    const camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      500,
      3500
    );
    camera.position.z = 1000;

    const dotSize = isSafari ? 12 : 10.5;
    scene.fog = new Fog(0x1e005d, 2, 3000);
    camera.lookAt(scene.position);

    const geometry = new BufferGeometry();
    const vertices = [];

    const pMaterial = new PointsMaterial({
      size: dotSize,
      alphaMap: createCanvasMaterial("#ffffff", dotSize * 20),
      //fog: false,
      //depthWrite: false,
      transparent: true,
      //alphaTest: 0.1,
      vertexColors: true,
      blending: AdditiveBlending,
    });


    const particlesPerAxis = isSafari ? 20 : 30;

    let i = 0;

    for (let x = 0; x < particlesPerAxis; x++) {
      for (let y = 0; y < particlesPerAxis; y++) {
        for (let z = 0; z < particlesPerAxis; z++) {
          vertices.push(
            -1200 +
              (x / particlesPerAxis) * 2400 +
              simplex.noise2D((x / particlesPerAxis) * 0.1, 1) * 300 +
              Math.random() * 80,
            -1000 +
              (y / particlesPerAxis) * 2000 +
              simplex.noise2D(1, (y / particlesPerAxis) * 0.1) * 300 +
              Math.random() * 70,
            simplex.noise3D(
              x / particlesPerAxis,
              y / particlesPerAxis,
              z / particlesPerAxis + i
            ) * 1500
          );
        }
      }
    }

    let positions = new Float32BufferAttribute(vertices, 3);

    const createColors = (vertices) => {
      const colors = [];

      for (let i = 0; i < vertices.length; i += 3) {
        const z = vertices[i + 2];
        const relZ = (400 + z) / 800;
        const color = lerpMultiple(relZ, colorsLinear, lerpArr);
        colors.push(color[0], color[1], color[2], relZ * 1.5);
      }

      return new BufferAttribute(new Float32Array(colors), 4);
    };

    geometry.setAttribute("color", createColors(vertices));
    geometry.setAttribute("position", positions);

    const particles = new Points(geometry, pMaterial);
    scene.add(particles);

    const renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.current.appendChild(renderer.domElement);
    renderer.setClearColor(0x1e005d, 1);

    let relScrollTop = 0;

    let speed = 0;

    function render() {
      i += 0.0005;

      speed += ((1 + simplex.noise2D(0, i)) / 2) * 0.002;

      for (let index = 0; index < vertices.length; index += 3) {
        let x = vertices[index];
        let y = vertices[index + 1];
        let z = vertices[index + 2];
        z =
          simplex.noise3D(
            (x / particlesPerAxis) * ((1 + simplex.noise2D(0, i)) / 2) * 0.02 +
              speed,
            (y / particlesPerAxis) * ((1 + simplex.noise2D(i, 0)) / 2) * 0.08 -
              speed,
            (z / particlesPerAxis) * 0.01
          ) * 400;

        geometry.attributes.position.array[index] = x;
        geometry.attributes.position.array[index + 1] = y;
        geometry.attributes.position.array[index + 2] = z;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.rotateX(1.6 + -relScrollTop * 2);
      geometry.rotateY(-relScrollTop * 1.5);
      geometry.rotateZ(relScrollTop * -0.3);
      geometry.setAttribute("color", createColors(vertices));
      // geometry.colorsNeedUpdate = true;

      camera.position.z = 100 + 2000 * (1 - relScrollTop * 0.5);

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    let requestAnimationFrameHandle: number = 0;

    function animate() {
      requestAnimationFrameHandle = requestAnimationFrame(animate);
      render();
    }

    const $body = document.querySelector("body");

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate();

    function onScroll() {
      const relScroll = document.documentElement.scrollTop / $body.scrollHeight;
      relScrollTop = relScroll + 0.1 * relScroll;
    }

    window.addEventListener("scroll", onScroll);

    function createCanvasMaterial(color, size = 256) {
      var matCanvas = document.createElement("canvas");
      matCanvas.width = matCanvas.height = size;
      var matContext = matCanvas.getContext("2d");
      // create exture object from canvas.
      var texture = new Texture(matCanvas);
      // Draw a circle
      var center = size / 2;
      matContext.beginPath();
      matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
      matContext.closePath();
      matContext.fillStyle = color;
      matContext.fill();
      // need to set needsUpdate
      texture.needsUpdate = true;
      // return a texture made from the canvas
      return texture;
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("scroll", onScroll);

      canvasContainer.current.removeChild(renderer.domElement);

      cancelAnimationFrame(requestAnimationFrameHandle);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0"
      ref={canvasContainer}
      style={{
        filter: blur,
      }}
    ></motion.div>
  );
};

export default ParticleAnimation;
