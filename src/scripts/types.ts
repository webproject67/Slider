interface IState {
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

interface IData {
  label: string;
  dataset: string;
  type: string;
  readonly?: boolean;
}

enum ModelUpdate {
  UPDATE = 'update',
}

type ModelType = {
  type: ModelUpdate.UPDATE;
  value: IState;
};

enum ViewHandler {
  FROMCIRCLE = 'fromCircle',
  TOCIRCLE = 'toCircle',
  TRACK = 'track',
  SCALE = 'scale',
}

type FromCircle = {
  type: ViewHandler.FROMCIRCLE;
  value: number;
};

type ToCircle = {
  type: ViewHandler.TOCIRCLE;
  value: number;
};

type Track = {
  type: ViewHandler.TRACK;
  value: number;
};

type Circle = {
  type: ViewHandler.SCALE;
  value: number;
};

type ViewTypes = FromCircle | ToCircle | Track | Circle;

enum PanelHandler {
  MIN = 'min',
  MAX = 'max',
  STEP = 'step',
  VIEW = 'view',
  RANGE = 'range',
  FLAG = 'flag',
  SCALE = 'scale',
  PROGRESS = 'progress',
}

type Min = {
  type: PanelHandler.MIN;
  value: number;
};

type Max = {
  type: PanelHandler.MAX;
  value: number;
};

type Step = {
  type: PanelHandler.STEP;
  value: number;
};

type View = {
  type: PanelHandler.VIEW;
  value: boolean;
};

type Range = {
  type: PanelHandler.RANGE;
  value: boolean;
};

type Flag = {
  type: PanelHandler.FLAG;
  value: boolean;
};

type Progress = {
  type: PanelHandler.PROGRESS;
  value: boolean;
};

type Scale = {
  type: PanelHandler.SCALE;
  value: boolean;
};

type PanelTypes = Min | Max | Step | View | Range | Flag | Progress | Scale;

export {
  IState,
  IData,
  ModelUpdate,
  ModelType,
  ViewHandler,
  ViewTypes,
  PanelHandler,
  PanelTypes,
};
