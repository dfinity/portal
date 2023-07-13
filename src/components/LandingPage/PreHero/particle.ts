import { MAX_SIZE, MIN_SIZE, OPACITIES } from "./config";
import { ShapeMap } from "./shapemap";
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
    this.opacity = Math.floor(Math.random() * OPACITIES.length);
  }

  static randomInCircle(cx: number, cy: number, radius: number): Particle {
    const mag = Math.random() * radius;
    const angle = Math.random() * 2 * Math.PI;
    const maxSize = MAX_SIZE();
    const minSize = MIN_SIZE();
    return new Particle(
      cx + mag * Math.cos(angle),
      cy + mag * Math.sin(angle),
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * (maxSize - minSize) + minSize
    );
  }

  draw(
    ctx: CanvasRenderingContext2D,
    colorIndex: number,
    shapeMap: ShapeMap,
    canvasWidth: number,
    canvasHeight: number
  ) {
    const animScale =
      (Math.min(950, Math.min(canvasHeight, canvasWidth)) / 950) *
      (canvasWidth < 640 ? 1.4 : canvasWidth < 1400 ? 0.9 : 0.9);

    const particleScale =
      Math.min(500, Math.min(canvasHeight, canvasWidth)) / 500;

    ctx.drawImage(
      shapeMap.canvas,
      ...shapeMap.get(colorIndex, this.opacity),
      (this.pos.x - canvasWidth / 2) * animScale + canvasWidth / 2,
      (this.pos.y - canvasHeight / 2) * animScale + canvasHeight / 2,
      this.size * particleScale,
      this.size * particleScale
    );
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
