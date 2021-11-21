interface stateType {
  flag: boolean;
  from: number;
  fromPercent: number;
  max: number;
  min: number;
  progress: boolean;
  range: string;
  start: number;
  scale: boolean;
  step: number;
  to: number;
  toPercent: number;
  view: string;
}

interface dataType {
  label: string;
  dataset: string;
  type: string;
  readonly?: boolean;
  name?: string;
  value?: string;
}

export { stateType, dataType };
