import Observer from '../observer/observer';
import { StateType } from '../../types';

export default class Model extends Observer {
  public state: StateType;

  private main: HTMLElement;

  constructor(main: HTMLElement, state: StateType) {
    super();
    this.main = main;
    this.state = state;
    this.setMainToState();
  }

  public getPercentScale() {
    const { stepCount, stepPercent } = this.getStepCount(0);
    let scale = 1;
    if (stepCount > 20) scale = Math.ceil(stepCount / 20);
    const percent = stepPercent * scale;
    return {
      percent,
      stepPercent,
      scale,
    };
  }

  public getState(): StateType {
    return this.state;
  }

  public getStepCount(corner: number, str?: string) {
    const { min, max, step, toPercent, fromPercent } = this.state;
    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    let stepPercentResult: number =
      Math.round(corner / stepPercent) * stepPercent;
    if (stepPercentResult < 0) stepPercentResult = 0;
    if (corner > 100 || stepPercentResult > 100) stepPercentResult = 100;
    if (str === 'toPercent') {
      if (stepPercentResult > toPercent) stepPercentResult = toPercent;
    }
    if (str === 'fromPercent') {
      if (fromPercent > stepPercentResult) stepPercentResult = fromPercent;
    }
    return {
      stepCount,
      stepPercent,
      stepPercentResult,
    };
  }

  public getStepValue(val: number) {
    let value = val;
    const { min, max } = this.state;
    const generalValue = max - min;
    if (value === 0) value = 1;
    if (value < 0) value = Math.abs(value);
    if (value > generalValue) value = generalValue;
    return value;
  }

  public getValue(
    percent: number,
    firstValue?: number | null,
    secondValue?: number | null
  ) {
    const { min, max, fromPercent } = this.state;
    const { stepPercent } = this.getStepCount(0);
    const value =
      Number(((percent / stepPercent) * this.state.step).toFixed()) +
      this.state.min;
    const boolFrom = percent >= fromPercent;
    const boolMinMax = (firstValue || min) >= (secondValue || max);
    return {
      min,
      max,
      value,
      boolFrom,
      boolMinMax,
    };
  }

  public setValue(keys: string[], values: (number | string | boolean)[]) {
    keys.forEach((key, i) => {
      switch (key) {
        case 'min':
          this.state.min = Number(values[i]);
          this.broadcast(this);
          break;
        case 'max':
          this.state.max = Number(values[i]);
          this.broadcast(this);
          break;
        case 'step':
          this.state.step = Number(values[i]);
          this.broadcast(this);
          break;
        case 'to':
          this.state.to = Number(values[i]);
          this.broadcast(this, true);
          break;
        case 'toPercent':
          this.state.toPercent = Number(values[i]);
          this.broadcast(this, true);
          break;
        case 'draft':
          this.state.draft = Number(values[i]);
          this.broadcast(this);
          break;
        case 'start':
          this.state.start = Number(values[i]);
          break;
        case 'configuring':
          this.state.configuring = Number(values[i]);
          this.broadcast(this);
          break;
        case 'from':
          this.state.from = Number(values[i]);
          this.broadcast(this, true);
          break;
        case 'fromPercent':
          this.state.fromPercent = Number(values[i]);
          this.broadcast(this, true);
          break;
        case 'view':
          this.state.view = String(values[i]);
          this.broadcast(this);
          break;
        case 'range':
          this.state.range = String(values[i]);
          this.broadcast(this);
          break;
        case 'flag':
          this.state.flag = Boolean(values[i]);
          this.broadcast(this);
          break;
        case 'progress':
          this.state.progress = Boolean(values[i]);
          this.broadcast(this);
          break;
        case 'scale':
          this.state.scale = Boolean(values[i]);
          this.broadcast(this);
          break;
        default:
          break;
      }
    });
  }

  private setMainToState(): void {
    this.state.main = this.main;
    this.state.mainName = this.main.className
      ? `.${this.main.className}`
      : `#${this.main.id}`;
  }
}
