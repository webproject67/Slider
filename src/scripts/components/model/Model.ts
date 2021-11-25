import Observer from '../observer/Observer';
import { stateType } from '../../types';
import { MAX, MIN, STEP } from '../../const';

export default class Model extends Observer {
  public state: stateType;

  constructor(state: stateType) {
    super();
    this.state = state;
  }

  public getState(): stateType {
    return this.state;
  }

  public setValue(keys: string[], values: (number | string | boolean)[]) {
    keys.forEach((key, i) => {
      switch (key) {
        case 'start':
          this.state.start = Number(values[i]);
          break;
        case 'min':
          this.state.min = Number(values[i]);
          break;
        case 'max':
          this.state.max = Number(values[i]);
          break;
        case 'step':
          this.state.step = Number(values[i]);
          this.broadcast(this.state);
          break;
        case 'from':
          this.state.from = Number(values[i]);
          break;
        case 'fromPercent':
          this.state.fromPercent = Number(values[i]);
          this.broadcast(this.state);
          break;
        case 'to':
          this.state.to = Number(values[i]);
          break;
        case 'toPercent':
          this.state.toPercent = Number(values[i]);
          this.broadcast(this.state);
          break;
        case 'view':
          this.state.view = String(values[i]);
          this.broadcast(this.state);
          break;
        case 'range':
          this.state.range = String(values[i]);
          this.broadcast(this.state);
          break;
        case 'flag':
          this.state.flag = Boolean(values[i]);
          this.broadcast(this.state);
          break;
        case 'progress':
          this.state.progress = Boolean(values[i]);
          this.broadcast(this.state);
          break;
        case 'scale':
          this.state.scale = Boolean(values[i]);
          this.broadcast(this.state);
          break;
        default:
          break;
      }
    });
  }

  public calculateValue(corner: number, val: string): void {
    const { min, max, step, toPercent, fromPercent } = this.state;
    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    let stepPercentResult: number =
      Math.round(corner / stepPercent) * stepPercent;

    if (stepPercentResult < 0) stepPercentResult = 0;

    if (corner > 100 || stepPercentResult > 100) stepPercentResult = 100;

    if (val === 'fromPercent' && stepPercentResult > toPercent)
      stepPercentResult = toPercent;

    if (val === 'toPercent' && fromPercent > stepPercentResult)
      stepPercentResult = fromPercent;

    const value =
      Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;
    const boolFrom = stepPercentResult >= fromPercent;

    if (val === 'toPercent') {
      this.setValue(['toPercent', 'to'], [stepPercentResult, value]);
      this.broadcast(this.state);
      return;
    }

    if (val === 'fromPercent') {
      this.setValue(['fromPercent', 'from'], [stepPercentResult, value]);
      this.broadcast(this.state);
      return;
    }

    if (boolFrom) {
      this.setValue(['toPercent', 'to'], [stepPercentResult, value]);
    } else {
      this.setValue(['fromPercent', 'from'], [stepPercentResult, value]);
    }

    this.broadcast(this.state);
  }
}
