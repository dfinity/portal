import { COLORS, MAX_SIZE, OPACITIES } from "./config";

export class ShapeMap {
  canvas: HTMLCanvasElement;
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = OPACITIES.length * MAX_SIZE;
    this.canvas.height = COLORS.length * MAX_SIZE;

    const ctx = this.canvas.getContext("2d");

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let c = 0; c < COLORS.length; c++) {
      for (let o = 0; o < OPACITIES.length; o++) {
        const x = (o + 0.5) * MAX_SIZE,
          y = (c + 0.5) * MAX_SIZE;
        ctx.globalAlpha = OPACITIES[o];
        ctx.fillStyle = COLORS[c];
        ctx.beginPath();
        ctx.arc(x, y, MAX_SIZE / 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  public get(
    colorIndex: number,
    opacityIndex: number
  ): [x: number, y: number, w: number, h: number] {
    return [opacityIndex * MAX_SIZE, colorIndex * MAX_SIZE, MAX_SIZE, MAX_SIZE];
  }
}
