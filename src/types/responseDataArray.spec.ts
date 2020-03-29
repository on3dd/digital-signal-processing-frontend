export class ResponseDataArraySpecMeta {
  channels = 0;
  samples = 0;
  sampleRate = 0;
  startTime: Date = new Date();
  endTime: Date = new Date();
  recordingLength = '';
}

export class ResponseDataArraySpec {
  columns: ResponseDataArraySpecColumn[] = [];
  types = new Map<string, string>();
  names = new Map<string, string>();
  colors = new Map<string, string>();
  meta: ResponseDataArraySpecMeta = new ResponseDataArraySpecMeta();
}

export class ResponseDataArraySpecJSON {
  columns: ResponseDataArraySpecColumn[] = [];
  types: DynamicObject = {};
  names: DynamicObject = {};
  colors: DynamicObject = {};
  meta: ResponseDataArraySpecMeta = new ResponseDataArraySpecMeta();

  constructor(
      columns?: ResponseDataArraySpecColumn[],
      types?: DynamicObject,
      names?: DynamicObject,
      colors?: DynamicObject,
      meta?: ResponseDataArraySpecMeta,
  ) {
    this.columns = columns || [];
    this.types = types || {};
    this.names = names || {};
    this.colors = colors || {};
    this.meta = meta || new ResponseDataArraySpecMeta();
  }
}

export type DynamicObject = {
  [key: string]: string;
}

export type ResponseDataArraySpecColumn = Array<string | number>;