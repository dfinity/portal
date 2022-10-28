import { Vector2D } from "./vector";

export class Particle {
  pos: Vector2D;
  v: Vector2D;
  size: number;
  opacity: number;
  constructor(x: number, y: number, vx: number, vy: number, size: number) {
    this.pos = new Vector2D(x, y);
    this.v = new Vector2D(vx, vy);
    this.size = size;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  static random(canvasWidth: number, canvasHeight: number): Particle {
    return new Particle(
      Math.random() * canvasWidth,
      Math.random() * canvasHeight,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 12 + 1
    );
  }
  static randomInCircle(cx: number, cy: number, radius: number): Particle {
    const mag = Math.random() * radius;
    const angle = Math.random() * 2 * Math.PI;
    return new Particle(
      cx + mag * Math.cos(angle),
      cy + mag * Math.sin(angle),
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 12 + 1
    );
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();

    const scale =
      Math.min(950, Math.min(ctx.canvas.height, ctx.canvas.width)) / 950;

    // if (ctx.canvas.width < 750) {
    // ctx.arc(this.pos.y, this.pos.x, this.size / 2, 0, 2 * Math.PI);
    // } else {
    ctx.arc(
      (this.pos.x - ctx.canvas.width / 2) * scale + ctx.canvas.width / 2,
      (this.pos.y - ctx.canvas.height / 2) * scale + ctx.canvas.height / 2,
      (this.size / 2) * scale,
      0,
      2 * Math.PI
    );
    // }
    ctx.fill();
  }

  update(fx: number, fy: number) {
    const fmag = Math.sqrt(fx * fx + fy * fy);
    this.v.x += fmag > 0.1 ? (fx / fmag) * 0.1 : fx;
    this.v.y += fmag > 0.1 ? (fy / fmag) * 0.1 : fy;

    this.v.x *= 0.985;
    this.v.y *= 0.985;
    // const vmag = Math.sqrt(this.v.x * this.v.x + this.v.y * this.v.y);
    // const vmag = 1;

    this.pos.x += this.v.x;
    this.pos.y += this.v.y;
  }
}
