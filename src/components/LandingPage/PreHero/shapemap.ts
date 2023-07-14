import { COLORS, MAX_SIZE, OPACITIES } from "./config";

export class ShapeMap {
  canvas: HTMLCanvasElement;
  maxSize: number;
  constructor() {
    this.maxSize = MAX_SIZE();

    this.canvas = document.createElement("canvas");
    this.canvas.width = OPACITIES.length * this.maxSize;
    this.canvas.height = COLORS.length * this.maxSize;

    const ctx = this.canvas.getContext("2d");

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let c = 0; c < COLORS.length; c++) {
      for (let o = 0; o < OPACITIES.length; o++) {
        const x = (o + 0.5) * this.maxSize,
          y = (c + 0.5) * this.maxSize;
        ctx.globalAlpha = OPACITIES[o];
        ctx.fillStyle = COLORS[c];
        ctx.beginPath();
        ctx.arc(x, y, this.maxSize / 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  public get(
    colorIndex: number,
    opacityIndex: number
  ): [x: number, y: number, w: number, h: number] {
    return [
      opacityIndex * this.maxSize,
      colorIndex * this.maxSize,
      this.maxSize,
      this.maxSize,
    ];
  }
}
