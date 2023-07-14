export const MIN_SIZE = () => (window.innerWidth < 640 ? 6 : 4);
export const MAX_SIZE = () => (window.innerWidth < 640 ? 10 : 9);
export const PARTICLE_COUNT = 5000;
export const OPACITIES = [0.4, 0.6, 0.8, 1.0];

const gradientStops = [
  [252, 177, 59],
  [192, 33, 125],
  [47, 171, 226],
  [252, 177, 59],
];
export const COLORS: string[] = [];

for (let i = 0; i < 3; i++) {
  for (let c = 0; c <= 100; c++) {
    const r = gradientStops[i][0] * (100 - c) + gradientStops[i + 1][0] * c;
    const g = gradientStops[i][1] * (100 - c) + gradientStops[i + 1][1] * c;
    const b = gradientStops[i][2] * (100 - c) + gradientStops[i + 1][2] * c;
    COLORS.push(
      `rgb(${(r / 100).toFixed()},${(g / 100).toFixed()},${(
        b / 100
      ).toFixed()})`
    );
  }
}
