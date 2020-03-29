import {DataItem, Dataset, TransformedData} from "@/types/data";
import {ComputeOptions, CoordinatesOptions} from "@/types/options";
import Mouse from "@/types/mouse";
import {DynamicObject} from "@/types/responseDataArray.spec";

export function transformData(data: DataItem): TransformedData {
  const datasets = Array<Dataset>();
  let labels = Array<string | number>();

  data.columns.forEach(column => {
    if (column[0] === 'x') {
      column.shift();
      labels = column.concat();
    } else {
      const type = column.shift()!;
      datasets.push({
        data: [...column],
        color: data.colors[type],
        name: data.names[type],
        type: data.types[type]
      })
    }
  });

  console.log('labels:', labels);
  console.log('datasets:', datasets);

  return {labels, datasets}
}

export function getValues(datasets: Array<Dataset>) {
  return datasets.reduce((all: Array<string | number>, dataset) => {
    return all.concat(dataset.data)
  }, [])
}

export function getBoundary(datasets: Array<Dataset>) {
  const values = getValues(datasets);
  const min = Math.floor(Math.min.apply(null, values.map(Number)));
  const max = Math.ceil(Math.max.apply(null, values.map(Number)));

  return [min, max]
}

export function computeRatio({
                               pos,
                               viewH,
                               viewW,
                               length,
                               delta
                             }: ComputeOptions): [number, number] {
  const percent = (pos.right - pos.left) / 100;

  const xRatio = viewW / percent / (length - 2);
  const yRatio = delta / viewH;

  return [xRatio, yRatio];
}

export function getCoordinates(
    {data, yMin, viewH, xRatio, yRatio, margin}: CoordinatesOptions): number[][] {
  return data.map((value, index) => {
    const y = Math.floor(viewH - ((parseInt(value.toString()) - yMin) / yRatio));
    const x = Math.floor((index) * xRatio);
    return [x, y + margin]
  })
}

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function toDate(timestamp: string | number, withDay = false): string {
  const date = new Date(timestamp);
  if (withDay) {
    return `${shortDays[date.getDay()]}, ${shortMonths[date.getMonth()]} ${date.getDate()}`
  }
  return `${shortMonths[date.getMonth()]} ${date.getDate()}`
}

export function css(el: HTMLElement, styles: DynamicObject = {}) {
  Object.keys(styles).forEach((style: string) => {
    el.style[style as any] = styles[style]
  })
}

export function noop() {
  return
}

export function computeDy({max, min, oldMax, speed}: { max: number; min: number; oldMax: number; speed: number }) {
  const delta = max - oldMax;
  return Math.abs(delta) > (max - min) / speed
      ? delta / speed
      : delta
}

export function isMouseOver(x: number, mouse: Mouse, translateX: number, dpiW: number, length: number) {
  if (!mouse) {
    return false
  }

  return Math.abs(x - (mouse.x + Math.abs(translateX))) < dpiW / length / 2
}


export function getRgbValue(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  });

  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
}

export function hexToRgb(hex: string, opacity = 1) {
  const r = getRgbValue(hex)!;
  return `rgba(${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}, ${opacity})`;
}

export function objToStrMap(obj: DynamicObject): Map<string, string> {
  const strMap = new Map();
  for (const k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }

  return strMap;
}