export interface Map {
  [key: string]: string;
}

export interface DataItem {
  columns: string[][];
  types: Map;
  names: Map;
  colors: Map;
}

export interface Dataset {
  data: string[];
  color: string;
  name: string;
  type: string;
}

export interface TransformedData {
  labels?: Array<string>;
  datasets?: Array<Dataset>;
}

export interface ShowDataItem {
  name: string;
  color: string;
  value: string;
}

export interface ShowData {
  title: string;
  items: ShowDataItem[];
}