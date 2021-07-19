import Observer from '../observer';
import { StateType } from '../../types';

export default class Model extends Observer {
  public main: HTMLElement;

  public state: StateType;

  constructor(main: HTMLElement, state: StateType) {
    super();
    this.main = main;
    this.state = state;
  }

  public getMainName(): string {
    return this.main.className ? `.${this.main.className}` : `#${this.main.id}`;
  }

  public getStepValue(value: number) {
    const { min, max } = this.state;
    const generalValue = max - min;
    if (value === 0) value = 1;
    if (value < 0) value = Math.abs(value);
    if (value > generalValue) value = generalValue;
    return value;
  }

  public getStepCount(corner: number) {
    const stepCount: number = (this.state.max - this.state.min) / this.state.step;
    const stepPercent: number = 100 / stepCount;
    let stepPercentResult: number = Math.round(corner / stepPercent) * stepPercent;
    if (stepPercentResult < 0) stepPercentResult = 0;
    if (stepPercentResult > 100) stepPercentResult = 100;
    return {
      stepCount,
      stepPercent,
      stepPercentResult,
    };
  }

  public getPercentScale(main: HTMLElement) {
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

  public setValue(keys: string[], values: (number | string | boolean)[]) {
    keys.forEach((key, i) => {
      switch (key) {
        case 'min':
          this.state.min = Number(values[i]);
          this.broadcast();
          break;
        case 'max':
          this.state.max = Number(values[i]);
          this.broadcast();
          break;
        case 'step':
          this.state.step = Number(values[i]);
          this.broadcast();
          break;
        case 'to':
          this.state.to = Number(values[i]);
          this.broadcast(['on']);
          break;
        case 'toPercent':
          this.state.toPercent = Number(values[i]);
          this.broadcast(['on']);
          break;
        case 'draft':
          this.state.draft = Number(values[i]);
          this.broadcast();
          break;
        case 'from':
          this.state.from = Number(values[i]);
          this.broadcast(['on']);
          break;
        case 'fromPercent':
          this.state.fromPercent = Number(values[i]);
          this.broadcast(['on']);
          break;
        case 'view':
          this.state.view = String(values[i]);
          this.broadcast();
          break;
        case 'range':
          this.state.range = String(values[i]);
          this.broadcast();
          break;
        case 'flag':
          this.state.flag = Boolean(values[i]);
          this.broadcast();
          break;
        case 'progress':
          this.state.progress = Boolean(values[i]);
          this.broadcast();
          break;
        case 'scale':
          this.state.scale = Boolean(values[i]);
          this.broadcast();
          break;
        default:
          break;
      }
    });
  }
}
