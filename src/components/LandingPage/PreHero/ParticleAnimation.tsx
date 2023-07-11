import { motion, MotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, PARTICLE_COUNT } from "./config";
import { Particle } from "./particle";
import { ShapeMap } from "./shapemap";
import { Vector2D } from "./vector";

type Force = (pos: Vector2D) => Vector2D;

const hCenterOf = (x) =>
  window.innerWidth < 640
    ? x / 2 - 80
    : Math.min(window.innerWidth / 2 + 500, (x * 3) / 4);
const vCenterOf = (y) =>
  window.innerWidth < 640 ? 300 : window.innerWidth < 1200 ? 300 : 440;

function getForces(center: Vector2D, minDim: number): Force[] {
  const factor = 1; //950 / minDim;

  return [
    (p) => {
      // outwards from center
      const dir = p.sub(center);
      const mag = dir.mag();
      dir.mult_mut(7000 / factor / mag / mag);
      return dir;
    },
    (p) => {
      // towards center from edges
      const dir = center.sub(p);
      dir.mult_mut(20 / factor / dir.mag());
      return dir;
    },
    (p) => {
      // stir
      const dir = center.sub(p);
      const mag = dir.mag();
      return new Vector2D(
        ((1000 / factor) * dir.y) / mag / mag,
        ((1000 / factor) * -dir.x) / mag / mag
      );
    },
  ];
}

const ParticleAnimation: React.FC<{
  debugForces?: boolean;
  debugColors?: boolean;
  paintParticles?: boolean;
  animate: boolean;
  blur: MotionValue<string>;
}> = ({
  debugForces = false,
  debugColors = false,
  paintParticles = true,
  animate,
  blur,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shapeMap, setShapeMap] = useState<ShapeMap>(null);
  const [forces, setForces] = useState<Force[]>();
  const frameIndexRef = useRef(0);

  const wasResize = useRef(true);

  useEffect(() => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const center = new Vector2D(
      hCenterOf(canvasRef.current.width),
      vCenterOf(canvasRef.current.height)
    );
    setForces(
      getForces(center, Math.min(window.innerHeight, window.innerWidth))
    );

    setParticles(
      Array.from({ length: PARTICLE_COUNT }).map(() =>
        Particle.randomInCircle(
          hCenterOf(canvasRef.current.width),
          vCenterOf(canvasRef.current.height),
          Math.min(window.innerHeight, window.innerWidth) / 6
        )
      )
    );

    setShapeMap(new ShapeMap());

    function onResize() {
      wasResize.current = true;
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let handle: number;

    let lastUpdate = Date.now();
    const frameRate = 60;

    let perfLog: number[] = [];

    function paint() {
      const start = Date.now();
      handle = requestAnimationFrame(paint);
      if (!animate) return;

      const now = Date.now();
      if (now - lastUpdate < (1000 / frameRate) * 0.65) {
        return;
      }
      lastUpdate = now;

      if (wasResize.current) {
        wasResize.current = false;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;

        const center = new Vector2D(
          hCenterOf(canvasRef.current.width),
          vCenterOf(canvasRef.current.height)
        );
        setForces(
          getForces(center, Math.min(window.innerHeight, window.innerWidth))
        );
      }

      frameIndexRef.current += 1;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const center = new Vector2D(
        hCenterOf(canvasWidth),
        vCenterOf(canvasHeight)
      );

      ctx.fillStyle = "rgb(30,1,94)";
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      if (frameIndexRef.current <= frameRate) {
        ctx.globalAlpha = frameIndexRef.current / frameRate;
      }

      if (debugColors) {
        for (let x = 0; x < canvasWidth; x += 40) {
          for (let y = 0; y < canvasHeight; y += 40) {
            const p = new Vector2D(x + 20, y + 20);
            const color =
              COLORS[
                Math.floor(
                  (Math.atan2(p.y - center.y, p.x - center.x) / Math.PI) * 150 +
                    150
                )
              ];
            ctx.fillStyle = color;
            ctx.fillRect(p.x - 20, p.y - 20, p.x + 20, p.y + 20);
          }
        }
      } else if (paintParticles) {
        const renderedParticleCount =
          canvasWidth < canvasHeight
            ? Math.floor(particles.length / 3)
            : particles.length;
        for (let pi = 0; pi < particles.length; pi++) {
          const p = particles[pi];
          let force = new Vector2D(0, 0);
          for (const f of forces) {
            force.add_mut(f(p.pos));
          }
          const dy =
            // canvasWidth > canvasHeight
            // ?
            Math.max(1, Math.abs(p.pos.y - vCenterOf(canvasHeight)));
          // : Math.max(1, Math.abs(p.pos.x - canvasWidth / 2));
          // force.mult_mut(Math.min(1, dy / 1000));
          const attenn = Math.min(1, dy / 1000);
          const dist = center.sub(p.pos).mag();

          force.mult_mut(dist > 350 ? attenn : 1);
          force.x += Math.random() * 20 - 10;
          force.y += Math.random() * 20 - 10;
          p.update(force.x / 200, force.y / 200);
          p.update(force.x / 200, force.y / 200);

          if (pi < renderedParticleCount) {
            const color = Math.floor(
              (Math.atan2(p.pos.y - center.y, p.pos.x - center.x) / Math.PI) *
                150 +
                150
            );

            p.draw(ctx, color, shapeMap, canvasWidth, canvasHeight);
          }
        }
      }

      if (debugForces) {
        for (let x = 0; x < canvasWidth; x += 40) {
          for (let y = 0; y < canvasHeight; y += 40) {
            const p = new Vector2D(x + 20, y + 20);
            let force = new Vector2D(0, 0);
            for (const f of forces) {
              force.add_mut(f(p));
            }

            const dist = center.sub(p).mag();
            const dy = Math.max(1, Math.abs(p.y - vCenterOf(canvasHeight)));
            const attenn = Math.min(1, dy / 1000);
            force.mult_mut(dist > 300 ? attenn : 1);

            //   if (Math.abs(force) < 0.2) {

            //   }
            // force.mult_mut(100);
            ctx.beginPath();
            ctx.moveTo(p.x - force.x * 2, p.y - force.y * 2);
            ctx.lineTo(p.x + force.x * 2, p.y + force.y * 2);
            ctx.stroke();
            ctx.fillRect(p.x + force.x - 1, p.y + force.y - 1, 2, 2);
            // ctx.fill();
          }
        }
      }

      perfLog.push(Date.now() - start);
      if (perfLog.length === frameRate * 3) {
        const avg = perfLog.reduce((acc, v) => v + acc, 0) / perfLog.length;
        // console.log(`avg paint: ${avg.toFixed(2)}ms`);
        perfLog = [];
      }
    }

    handle = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [particles, forces, setForces, animate, shapeMap]);

  return (
    <motion.canvas
      className="w-full h-screen fixed inset-0 bg-[#1B025A]"
      ref={canvasRef}
      style={{
        filter: blur,
      }}
    ></motion.canvas>
  );
};

export default ParticleAnimation;
