import React, { useEffect, useRef } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

class Vector2D {
  constructor(public x: number = 0, public y: number = 0) {}

  add(other: Vector2D) {
    this.x += other.x;
    this.y += other.y;
  }
  mult(n: number) {
    this.x *= n;
    this.y *= n;
  }

  limit(max: number) {
    const mag = this.mag();
    if (max < mag) {
      this.mult(max / mag);
    }
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  static sub(a: Vector2D, b: Vector2D): Vector2D {
    return new Vector2D(a.x - b.x, a.y - b.y);
  }

  static mult(v: Vector2D, n: number): Vector2D {
    return new Vector2D(v.x * n, v.y * n);
  }
}

class Particle {
  pos: Vector2D;
  vel: Vector2D;
  radius: number;
  fillRadius: number;
  ramp: number;
  strength: number;
  damping: number;
  maxVelocity: number;

  constructor(x: number, y: number, impactRadius: number, fillRadius: number) {
    this.pos = new Vector2D(x, y);
    this.vel = new Vector2D();
    this.radius = impactRadius; // Radius of impact
    this.fillRadius = fillRadius;
    this.ramp = 1; // Influences the shape of the function
    this.strength = -5; // Strength: positive value attracts, negative value repels
    this.damping = 0.99;
    this.maxVelocity = 10;
  }
  update() {
    this.vel.limit(this.maxVelocity);
    this.pos.add(this.vel);
    this.vel.mult(1 - this.damping);
  }

  show(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgb(59, 0, 189)";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.fillRadius, 0, 2 * Math.PI);
    ctx.fill();
  }

  repel(target: Particle) {
    let force = Vector2D.sub(target.pos, this.pos);
    let d = force.mag();
    if (d > 0 && d < this.radius) {
      let s = Math.pow(d / this.radius, 1 / this.ramp);
      let f = (s * 9 * this.strength * (1 / (s + 1) + (s - 3) / 4)) / d;
      force.mult(f);
      force.mult(-1);
      target.vel.add(force);
    }
  }
}

export default ({
  width,
  height,
  particleCount,
  frameRate,
  centerX,
  centerY,
  duration,
}) => {
  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(
          centerX +
            (Math.random() * (5 - 1) +
              1 * Math.cos((i * 2 * Math.PI) / particleCount)),
          centerY +
            (Math.random() * (5 - 1) +
              1 * Math.sin((i * 2 * Math.PI) / particleCount)),
          Math.max(width, height) / 10,
          width <= 900 ? 3 : 6
        )
      );
    }

    let handle: number;
    let lastUpdate = Date.now();
    let lastRotation = Date.now();

    function onNextFrame() {
      handle = requestAnimationFrame(onNextFrame);

      const now = Date.now();
      if (now - lastUpdate < (1000 / frameRate) * 0.9) {
        return;
      }
      lastUpdate = now;

      const ctx = ref.current.getContext("2d");

      ctx.fillStyle = "rgba(255,255,255, 19%)";
      ctx.fillRect(0, 0, ref.current.width, ref.current.height);

      if (now - lastRotation >= duration) {
        lastRotation = now;
        for (let i = 0; i < particles.length; i++) {
          particles[i].strength = 100;
          particles[i].maxVelocity = 100;
          particles[i].radius = 1000;
        }
        setTimeout(() => {
          for (let i = 0; i < particles.length; i++) {
            particles[i].strength = -5;
            particles[i].maxVelocity = 10;
            particles[i].radius = Math.max(width, height) / 10;
          }
        }, 2000);
      }

      for (const particle of particles) {
        for (const op of particles) {
          if (op !== particle) {
            particle.repel(op);
          }
        }
        particle.update();
        particle.show(ctx);
      }
    }

    handle = requestAnimationFrame(onNextFrame);
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <BrowserOnly fallback={null}>
      {() => {
        return (
          <div
            style={{
              width: "calc(100vw - (100vw - 100%))",
              position: "absolute",
              overflow: "hidden",
              mixBlendMode: "multiply",
            }}
          >
            <canvas ref={ref} width={width} height={height}></canvas>
          </div>
        );
      }}
    </BrowserOnly>
  );
};
