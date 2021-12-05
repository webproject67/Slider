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
}

enum ModelUpdate {
  UPDATEMODELSTATE = 'updateModelState',
}

type ModelType = {
  type: ModelUpdate.UPDATEMODELSTATE;
  value: IState;
};

enum ViewHandler {
  HANDLECIRCLEFROMMOUSEDOWN = 'handleCircleFromMouseDown',
  HANDLECIRCLETOMOUSEDOWN = 'handleCircleToMouseDown',
  HANDLETRACKCLICK = 'handleTrackClick',
  HANDLESCALECLICK = 'handleScaleClick',
}

type FromCircle = {
  type: ViewHandler.HANDLECIRCLEFROMMOUSEDOWN;
  value: number;
};

type ToCircle = {
  type: ViewHandler.HANDLECIRCLETOMOUSEDOWN;
  value: number;
};

type Track = {
  type: ViewHandler.HANDLETRACKCLICK;
  value: number;
};

type Circle = {
  type: ViewHandler.HANDLESCALECLICK;
  value: number;
};

type ViewTypes = FromCircle | ToCircle | Track | Circle;

enum PanelHandler {
  HANDLEINPUTMINCHANGE = 'handleInputMinChange',
  HANDLEINPUTMAXCHANGE = 'handleInputMaxChange',
  HANDLEINPUTFROMCHANGE = 'handleInputFromChange',
  HANDLEINPUTTOCHANGE = 'handleInputToChange',
  HANDLEINPUTSTEPCHANGE = 'handleInputStepChange',
  HANDLEINPUTVIEWCHANGE = 'handleInputViewChange',
  HANDLEINPUTRANGECHANGE = 'handleInputRangeChange',
  HANDLEINPUTFLAGCHANGE = 'handleInputFlagChange',
  HANDLEINPUTSCALECHANGE = 'handleInputScaleChange',
  HANDLEINPUTPROGRESSCHANGE = 'handleInputProgressChange',
}

type Min = {
  type: PanelHandler.HANDLEINPUTMINCHANGE;
  value: number;
};

type Max = {
  type: PanelHandler.HANDLEINPUTMAXCHANGE;
  value: number;
};

type From = {
  type: PanelHandler.HANDLEINPUTFROMCHANGE;
  value: number;
};

type To = {
  type: PanelHandler.HANDLEINPUTTOCHANGE;
  value: number;
};

type Step = {
  type: PanelHandler.HANDLEINPUTSTEPCHANGE;
  value: number;
};

type View = {
  type: PanelHandler.HANDLEINPUTVIEWCHANGE;
  value: boolean;
};

type Range = {
  type: PanelHandler.HANDLEINPUTRANGECHANGE;
  value: boolean;
};

type Flag = {
  type: PanelHandler.HANDLEINPUTFLAGCHANGE;
  value: boolean;
};

type Progress = {
  type: PanelHandler.HANDLEINPUTPROGRESSCHANGE;
  value: boolean;
};

type Scale = {
  type: PanelHandler.HANDLEINPUTSCALECHANGE;
  value: boolean;
};

type PanelTypes =
  | Min
  | Max
  | From
  | To
  | Step
  | View
  | Range
  | Flag
  | Progress
  | Scale;

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
