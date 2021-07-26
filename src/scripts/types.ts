import Model from './components/model/model';

interface StateType {
  flag: boolean;
  from: number;
  fromPercent: number;
  max: number;
  min: number;
  progress: boolean;
  range: string;
  draft: number;
  start: number;
  configuring: number;
  main?: HTMLElement;
  mainName?: string;
  scale: boolean;
  step: number;
  to: number;
  toPercent: number;
  view: string;
}

type ModelType = Model;

export { StateType, ModelType };
