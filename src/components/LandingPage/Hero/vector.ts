export class Vector2D {
  constructor(public x: number = 0, public y: number = 0) {}

  add(other: Vector2D) {
    this.x += other.x;
    this.y += other.y;
  }
  mult_mut(n: number) {
    this.x *= n;
    this.y *= n;
  }

  limit(max: number) {
    const mag = this.mag();
    if (max < mag) {
      this.mult_mut(max / mag);
    }
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  sub(o: Vector2D): Vector2D {
    return new Vector2D(this.x - o.x, this.y - o.y);
  }

  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  dot(o: Vector2D): number {
    return this.x * o.x + this.y * o.y;
  }

  dist(o: Vector2D): number {
    const x = this.x - o.x,
      y = this.y - o.y;
    return Math.sqrt(x * x + y * y);
  }

  add_mut(v: Vector2D) {
    this.x += v.x;
    this.y += v.y;
  }

  static sub(a: Vector2D, b: Vector2D): Vector2D {
    return new Vector2D(a.x - b.x, a.y - b.y);
  }

  static mult(v: Vector2D, n: number): Vector2D {
    return new Vector2D(v.x * n, v.y * n);
  }
}
