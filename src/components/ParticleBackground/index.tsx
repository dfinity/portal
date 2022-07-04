import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

let particles = [];
let timer = 0;

export default ({
  width,
  height,
  particleCount,
  frameRate,
  centerX,
  centerY,
  duration,
  pixelDensity,
}) => {
  let pRadius = width <= 900 ? 3 : 6;
  let cWidth = width <= 900 ? width * 2 : width;
  const { Vector } = require("p5");
  const setup = (p5, canvasParentRef) => {
    p5.disableFriendlyErrors = true; // disables FES
    p5.createCanvas(cWidth, height).parent(canvasParentRef);
    p5.noStroke();
    createNodes(p5);
    p5.frameRate(frameRate);

    p5.pixelDensity(pixelDensity);
  };

  const draw = (p5) => {
    p5.background(255, 255, 255, 50);
    if (p5.millis() >= duration + timer) {
      timer = p5.millis();
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
    for (let i = 0; i < particles.length; i++) {
      particles[i].repelNodes(particles);
      particles[i].update();
      particles[i].show();
    }
  };

  const createNodes = (p5) => {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(
          p5,
          centerX +
            (Math.random() * (5 - 1) +
              1 * Math.cos((i * 2 * Math.PI) / particleCount)),
          centerY +
            (Math.random() * (5 - 1) +
              1 * Math.sin((i * 2 * Math.PI) / particleCount))
        )
      );
    }
  };

  function Particle(p5, x, y) {
    this.pos = p5.createVector(x, y);
    this.vel = p5.createVector();
    this.radius = Math.max(width, height) / 10; // Radius of impact
    this.ramp = 1; // Influences the shape of the function
    this.strength = -5; // Strength: positive value attracts, negative value repels
    this.damping = 0.99;
    this.maxVelocity = 10;
    this.minX = pRadius - 50;
    this.minY = pRadius - 50;
    this.maxX = p5.width - pRadius + 50;
    this.maxY = p5.height - pRadius + 50;
    this.update = function () {
      this.vel.add(this.acc);
      this.vel.limit(this.maxVelocity);
      this.pos.add(this.vel);

      if (this.pos.x < this.minX) {
        this.pos.x = this.minX - (this.pos.x - this.minX);
        this.vel.x = -this.vel.x;
      }
      if (this.pos.x > this.maxX) {
        this.pos.x = this.maxX - (this.pos.x - this.maxX);
        this.vel.x = -this.vel.x;
      }

      if (this.pos.y < this.minY) {
        this.pos.y = this.minY - (this.pos.y - this.minY);
        this.vel.y = -this.vel.y;
      }
      if (this.pos.y > this.maxY) {
        this.pos.y = this.maxY - (this.pos.y - this.maxY);
        this.vel.y = -this.vel.y;
      }
      this.vel.mult(1 - this.damping);
    };
    this.repelNodes = (nodeArray) => {
      for (let i = 0; i < nodeArray.length; i++) {
        let otherNode = nodeArray[i];
        if (otherNode === undefined) break;
        if (otherNode === this) continue;
        this.repel(otherNode);
      }
    };

    this.show = function () {
      p5.fill(59, 0, 189);
      p5.ellipse(this.pos.x, this.pos.y, pRadius * 2, pRadius * 2);
    };

    this.repel = function (target) {
      let force = Vector.sub(target.pos, this.pos);
      let d = force.mag();
      if (d > 0 && d < this.radius) {
        let s = p5.pow(d / this.radius, 1 / this.ramp);
        let f = (s * 9 * this.strength * (1 / (s + 1) + (s - 3) / 4)) / d;
        force.mult(f);
        force.mult(-1);
        target.vel.add(force);
      }
    };
  }

  return (
    <BrowserOnly fallback={null}>
      {() => {
        const Sketch = require("react-p5");
        return <Sketch setup={setup} draw={draw} />;
      }}
    </BrowserOnly>
  );
};
