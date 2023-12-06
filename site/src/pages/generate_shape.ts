const OFFSETS = 0.02;
const MIN = 0 + OFFSETS;
const MAX = 1 - OFFSETS;
const GAP = (MAX - MIN) * 0.3;
const H_GAP = GAP / 2;
const MID = GAP + MIN;
const POLYGON: [number, number][] = [
  [MIN, MIN],
  [MID, MIN],
  [MAX, MIN],
  [MAX, MID],
  [MAX, MAX],
  [MID, MAX],
  [MIN, MAX],
  [MIN, MID],
];
const SPLAT_OFFSETS = 0.2;
const SPLAT: [number, number][] = [
  [MIN + H_GAP, MIN + H_GAP],
  [MID, MIN],
  [MAX - H_GAP, MIN + H_GAP],
  [MAX, MID],
  [MAX - H_GAP, MAX - H_GAP],
  [MID, MAX],
  [MIN + H_GAP, MAX - H_GAP],
  [MIN, MID],
];
const print_point = ({ x, y }: { x: number; y: number }): string => {
  return `${Math.floor(x * 100)}% ${Math.floor(y * 100)}%`;
};
const subdivide = (array: [number, number][]) => {
  return array.reduce(
    (previous: [number, number][], current: [number, number]) => {
      let last = previous.at(-1);

      if (!last) {
        return [current];
      }

      let mid: [number, number] = [
        (current[0] - last[0]) / 2 + last[0],
        (current[1] - last[1]) / 2 + last[1],
      ];
      previous.push(mid);
      previous.push(current);
      return previous;
    },
    [],
  );
};
export const generate_shape = (limits?: {x: number, y: number}) => {
  let polygon = POLYGON;
  let subdivide_count = Math.random() * 2 + 1;
  for (let i = 0; i < subdivide_count; i++) {
    polygon = subdivide(polygon);
  }

  const x_offset_size = limits ? limits.x : OFFSETS * 30;
  const y_offset_size = limits ? limits.y : OFFSETS * 30;

  let points: string[] = polygon
    .map(([x, y]) => {
      let x_offset = x_offset_size * Math.random();
      let y_offset = y_offset_size * Math.random();
      return { x, x_offset, y, y_offset };
    })
    .map(({x, x_offset, y, y_offset}) => {
      return `calc(${Math.floor(x * 100)}% + ${x_offset}rem) calc(${Math.floor(y * 100)}% + ${y_offset}rem)`;
    });
  let result = `polygon(${points.join(", ")})`;
  return result;
};

export const generate_splat = () => {
  let polygon = SPLAT;
  let subdivide_count = Math.random() * 2;
  for (let i = 0; i < subdivide_count; i++) {
    polygon = subdivide(polygon);
  }
  let points: string[] = polygon
    .map(([x, y]) => {
      let x_offset = SPLAT_OFFSETS * Math.random();
      let y_offset = SPLAT_OFFSETS * Math.random();
      return { x: x + x_offset, y: y + y_offset };
    })
    .map(print_point);
  let result = `polygon(${points.join(", ")})`;
  return result;
};
