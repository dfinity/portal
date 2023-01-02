import React, { useEffect, useRef, useState } from "react";
import DarkHeroStyles from "../../Common/DarkHeroStyles";
import { COLORS, PARTICLE_COUNT } from "./config";
import { Particle } from "./particle";
import { ShapeMap } from "./shapemap";
import { Vector2D } from "./vector";

type Force = (pos: Vector2D) => Vector2D;

function getForces(center: Vector2D, minDim: number): Force[] {
  const factor = 1; //950 / minDim;

  return [
    (p) => {
      const dir = p.sub(center);
      const mag = dir.mag();
      dir.mult_mut(7000 / factor / mag / mag);
      return dir;
    },
    (p) => {
      const dir = center.sub(p);
      dir.mult_mut(20 / factor / dir.mag());
      return dir;
    },
    (p) => {
      const dir = center.sub(p);
      const mag = dir.mag();
      return new Vector2D(
        ((1000 / factor) * dir.y) / mag / mag,
        ((1000 / factor) * -dir.x) / mag / mag
      );
    },
  ];
}

export default function PreHero({
  debugForces = false,
  debugColors = false,
  paintParticles = true,
}): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shapeMap, setShapeMap] = useState<ShapeMap>(null);
  const [forces, setForces] = useState<Force[]>();
  const [start, setStart] = useState(false);
  const [animate, setAnimate] = useState(true);
  const frameIndexRef = useRef(0);

  const wasResize = useRef(true);

  useEffect(() => {
    setStart(true);
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const center = new Vector2D(
      canvasRef.current.width / 2,
      canvasRef.current.height / 2
    );
    setForces(
      getForces(center, Math.min(window.innerHeight, window.innerWidth))
    );

    setParticles(
      Array.from({ length: PARTICLE_COUNT }).map(() =>
        Particle.randomInCircle(
          canvasRef.current.width / 2,
          canvasRef.current.height / 2,
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
          canvasRef.current.width / 2,
          canvasRef.current.height / 2
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

      const center = new Vector2D(canvasWidth / 2, canvasHeight / 2);

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
            canvasWidth > canvasHeight
              ? Math.max(1, Math.abs(p.pos.y - canvasHeight / 2))
              : Math.max(1, Math.abs(p.pos.x - canvasWidth / 2));
          // force.mult_mut(Math.min(1, dy / 1000));
          const attenn = Math.min(1, dy / 1000);
          const dist = center.sub(p.pos).mag();

          force.mult_mut(dist > 300 ? attenn : 1);
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
            const dy = Math.max(1, Math.abs(p.y - canvasHeight / 2));
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
        console.log(`avg paint: ${avg.toFixed(2)}ms`);
        perfLog = [];
      }
    }

    handle = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [particles, forces, setForces, animate, shapeMap]);

  const [bgDark, setBgDark] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setHeaderHeight(
      document.querySelector("nav.navbar").getBoundingClientRect().height
    );
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > window.innerHeight - headerHeight && bgDark) {
        setBgDark(false);
      } else if (
        window.scrollY < window.innerHeight - headerHeight &&
        !bgDark
      ) {
        setBgDark(true);
      }

      if (window.scrollY > window.innerHeight && animate) {
        setAnimate(false);
      } else if (window.scrollY < window.innerHeight && !animate) {
        setAnimate(true);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [bgDark, animate, headerHeight]);

  return (
    <section className="w-screen h-screen bg-[#1B025A]" id="home">
      <>
        {bgDark && <DarkHeroStyles bgColor="transparent" />}

        <canvas
          className="w-full h-full fixed inset-0 bg-[#1B025A]"
          ref={canvasRef}
        ></canvas>
      </>
      <div className="fixed inset-0 flex items-center">
        <div className="container-10 text-center">
          <h1
            className="tw-heading-3 md:tw-heading-2 text-white animate-scale-in"
            style={{
              animationPlayState: start ? "running" : "paused",
            }}
          >
            Rebuild on
            <br />
            World Computer
          </h1>
        </div>
        <img
          src="/img/home/hero-blur.svg"
          alt=""
          className="absolute bottom-0 translate-y-6/10 md:translate-y-7/10 left-1/2 -translate-x-1/2 max-w-none w-[800px] md:w-full h-auto"
        ></img>

        <button
          className="bg-transparent appearance-none border-none p-0 m-0 animate-fade-in left-1/2 -translate-x-1/2 bottom-[10vh] md:bottom-[5vh] absolute w-12 h-12 md:w-[70px] md:h-[70px] rounded-xl backdrop-blur-xl flex items-center justify-center"
          onClick={() => {
            document.getElementById("introduction").scrollIntoView();
          }}
          style={{
            animationPlayState: start ? "running" : "paused",
          }}
          aria-label="Scroll down"
        >
          <svg
            width="24"
            height="38"
            viewBox="0 0 24 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23 25.4247L12 36L1 25.4247M12 0L12 35.8937"
              stroke="url(#paint0_linear_127_29571)"
              stroke-width="1.77"
            />
            <defs>
              <linearGradient
                id="paint0_linear_127_29571"
                x1="11.5784"
                y1="35.8937"
                x2="11.5784"
                y2="6.09638e-09"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
    </section>
  );
}
