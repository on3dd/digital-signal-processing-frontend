import Tooltip from "@/types/tooltip";
import Theme from "@/types/theme";
import Pos from "@/types/pos";
import {Dataset} from "@/types/data";
import Mouse from "@/types/mouse";

export default interface Options {
  width: number;
  height: number;
  tooltip?: Tooltip;
  data?: object;
  onUpdate?: Function;
  animationSpeed?: number;
  theme?: Theme;
}

export interface ComputeOptions {
  pos: Pos;
  viewH: number;
  viewW: number;
  length: number;
  delta: number;
}

export interface CoordinatesOptions {
  data: string[];
  yMin: number;
  viewH: number;
  xRatio: number;
  yRatio: number;
  margin: number;
}

export interface LineOptions {
  coords: number[][];
  color: string;
  opacity: number;
  mouse: Mouse | null;
  dpiW: number;
  translateX?: number;
  withCircles?: boolean;
  visibleItemsCount?: number;
}

export interface YAxisOptions {
  dpiW: number,
  viewH: number,
  yMax: number,
  yMin: number,
  margin: number,
  delta: number;
  rowsCount: number
}

export interface XAxisOptions {
  data: object;
  visibleItemsLength: number;
  datasets: Dataset[];
  dpiW: number;
  dpiH: number;
  xRatio: number;
  mouse: Mouse | null;
  margin: number;
  translateX: number;
}

export interface UpdateOptions {
  type: string;
  name: string;
  labels: string[];
}