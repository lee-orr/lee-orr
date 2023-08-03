const OFFSETS = 0.03;
const MIN = 0 - OFFSETS;
const MAX = 1 + OFFSETS;
const MID = (MAX - MIN) * 0.5 + MIN;
const POLYGON: [number, number][] = [[MIN, MIN], [MID, MIN], [MAX, MIN], [MAX, MID], [MAX, MAX], [MID, MAX], [MIN, MAX], [MIN, MID]];
const print_point = ({ x, y }: { x: number; y: number; }): string => {
    return `${Math.floor(x * 100)}% ${Math.floor(y * 100)}%`;
};
const subdivide = (array: [number, number][]) => {
    return array.reduce((previous: [number, number][], current: [number, number]) => {
        let last = previous.at(-1);

        if (!last) {
            return [current];
        }

        let mid: [number, number] = [(current[0] - last[0]) / 2 + last[0], (current[1] - last[1]) / 2 + last[1]];
        previous.push(mid);
        previous.push(current);
        return previous;
    }, []);
};
export const generate_shape = () => {
    let polygon = POLYGON;
    let subdivide_count = Math.random() * 2 + 1;
    for (let i = 0; i < subdivide_count; i++) {
        polygon = subdivide(polygon);
    }
    let points: string[] = polygon.map(([x, y]) => {
        let x_offset = OFFSETS * Math.random();
        let y_offset = OFFSETS * Math.random();
        return { x: x + x_offset, y: y + y_offset };
    }).map(print_point);
    let result = `polygon(${points.join(", ")})`;
    return result;
};
