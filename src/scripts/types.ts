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
  UPDATE_MODEL_STATE = 'updateModelState',
}

type ModelType = {
  type: ModelUpdate.UPDATE_MODEL_STATE;
  value: IState;
};

enum ViewHandler {
  HANDLE_CIRCLE_FROM_MOUSE_DOWN = 'handleCircleFromMouseDown',
  HANDLE_CIRCLE_TO_MOUSE_DOWN = 'handleCircleToMouseDown',
  HANDLE_TRACK_CLICK = 'handleTrackClick',
  HANDLE_SCALE_CLICK = 'handleScaleClick',
}

type FromCircle = {
  type: ViewHandler.HANDLE_CIRCLE_FROM_MOUSE_DOWN;
  value: number;
};

type ToCircle = {
  type: ViewHandler.HANDLE_CIRCLE_TO_MOUSE_DOWN;
  value: number;
};

type Track = {
  type: ViewHandler.HANDLE_TRACK_CLICK;
  value: number;
};

type Circle = {
  type: ViewHandler.HANDLE_SCALE_CLICK;
  value: number;
};

type ViewTypes = FromCircle | ToCircle | Track | Circle;

enum PanelHandler {
  HANDLE_INPUT_MIN_CHANGE = 'handleInputMinChange',
  HANDLE_INPUT_MAX_CHANGE = 'handleInputMaxChange',
  HANDLE_INPUT_FROM_CHANGE = 'handleInputFromChange',
  HANDLE_INPUT_TO_CHANGE = 'handleInputToChange',
  HANDLE_INPUT_STEP_CHANGE = 'handleInputStepChange',
  HANDLE_INPUT_VIEW_CHANGE = 'handleInputViewChange',
  HANDLE_INPUT_RANGE_CHANGE = 'handleInputRangeChange',
  HANDLE_INPUT_FLAG_CHANGE = 'handleInputFlagChange',
  HANDLE_INPUT_SCALE_CHANGE = 'handleInputScaleChange',
  HANDLE_INPUT_PROGRESS_CHANGE = 'handleInputProgressChange',
}

type Min = {
  type: PanelHandler.HANDLE_INPUT_MIN_CHANGE;
  value: number;
};

type Max = {
  type: PanelHandler.HANDLE_INPUT_MAX_CHANGE;
  value: number;
};

type From = {
  type: PanelHandler.HANDLE_INPUT_FROM_CHANGE;
  value: number;
};

type To = {
  type: PanelHandler.HANDLE_INPUT_TO_CHANGE;
  value: number;
};

type Step = {
  type: PanelHandler.HANDLE_INPUT_STEP_CHANGE;
  value: number;
};

type View = {
  type: PanelHandler.HANDLE_INPUT_VIEW_CHANGE;
  value: boolean;
};

type Range = {
  type: PanelHandler.HANDLE_INPUT_RANGE_CHANGE;
  value: boolean;
};

type Flag = {
  type: PanelHandler.HANDLE_INPUT_FLAG_CHANGE;
  value: boolean;
};

type Progress = {
  type: PanelHandler.HANDLE_INPUT_PROGRESS_CHANGE;
  value: boolean;
};

type Scale = {
  type: PanelHandler.HANDLE_INPUT_SCALE_CHANGE;
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
