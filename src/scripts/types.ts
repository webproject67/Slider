interface stateType {
  start: number;
  min: number;
  max: number;
  from: number;
  fromPercent: number;
  to: number;
  toPercent: number;
  step: number;
  view: boolean;
  range: boolean;
  flag: boolean;
  scale: boolean;
  progress: boolean;
}

interface dataType {
  label: string;
  dataset: string;
  type: string;
  readonly?: boolean;
}

export { stateType, dataType };
