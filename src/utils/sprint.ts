export class Spring {
  target: number = 0;
  a = 0;
  v = 0;
  constructor(
    public x: number,
    public friction: number,
    public mass: number,
    public tension: number
  ) {
    this.target = x;
  }

  setTarget(t: number) {
    this.target = t;
  }

  update(delta: number) {
    const factor = 1000 / delta;

    this.a = (this.target - this.x) / factor / this.mass;
    this.v += this.a;
    this.v /= 1 + (this.friction - 1) * (60 / factor);
    this.x += this.v * this.tension * (60 / factor);
  }
}
