import {DynamicObject, ResponseDataArraySpecColumn, ResponseDataArraySpecMeta} from "@/types/responseDataArray.spec";

export interface DataItem {
  columns: ResponseDataArraySpecColumn[];
  types: DynamicObject;
  names: DynamicObject;
  colors: DynamicObject;
  meta?: ResponseDataArraySpecMeta;
}

export interface Dataset {
  data: Array<string | number>;
  color: string;
  name: string;
  type: string;
}

export interface TransformedData {
  labels?: Array<string | number>;
  datasets?: Array<Dataset>;
}

export interface ShowDataItem {
  name: string;
  color: string;
  value: string | number;
}

export interface ShowData {
  title: string;
  items: ShowDataItem[];
}