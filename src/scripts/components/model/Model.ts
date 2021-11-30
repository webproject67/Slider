import Observer from '../observer/Observer';
import { stateType } from '../../types';

export default class Model extends Observer {
  private state: stateType;

  constructor(state: stateType) {
    super();
    this.state = state;
    this.init(state);
  }

  public getState(): stateType {
    return { ...this.state };
  }

  public setValue(keys: string[], values: (number | boolean)[]) {
    keys.forEach((key, i) => {
      switch (key) {
        case 'start':
          this.state.start = Number(values[i]);
          break;
        case 'min':
          if (!(typeof values[i] === 'number'))
            throw new Error('invalid value');
          this.state.min = Number(values[i]);
          break;
        case 'max':
          if (!(typeof values[i] === 'number'))
            throw new Error('invalid value');
          this.state.max = Number(values[i]);
          break;
        case 'step':
          if (!(typeof values[i] === 'number'))
            throw new Error('invalid value');
          this.state.step = Number(values[i]);
          break;
        case 'from':
          if (!(typeof values[i] === 'number'))
            throw new Error('invalid value');
          this.state.from = Number(values[i]);
          break;
        case 'fromPercent':
          this.state.fromPercent = Number(values[i]);
          break;
        case 'to':
          if (!(typeof values[i] === 'number'))
            throw new Error('invalid value');
          this.state.to = Number(values[i]);
          break;
        case 'toPercent':
          this.state.toPercent = Number(values[i]);
          break;
        case 'view':
          if (!(typeof values[i] === 'boolean'))
            throw new Error('invalid value');
          this.state.view = Boolean(values[i]);
          break;
        case 'range':
          if (!(typeof values[i] === 'boolean'))
            throw new Error('invalid value');
          this.state.range = Boolean(values[i]);
          break;
        case 'flag':
          if (!(typeof values[i] === 'boolean'))
            throw new Error('invalid value');
          this.state.flag = Boolean(values[i]);
          break;
        case 'progress':
          if (!(typeof values[i] === 'boolean'))
            throw new Error('invalid value');
          this.state.progress = Boolean(values[i]);
          break;
        case 'scale':
          if (!(typeof values[i] === 'boolean'))
            throw new Error('invalid value');
          this.state.scale = Boolean(values[i]);
          break;
        default:
          break;
      }
    });

    this.validation();
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

    if (val === 'fromPercent' || !boolFrom) {
      this.setValue(['fromPercent', 'from'], [stepPercentResult, value]);
      this.broadcast(this.state);
      return;
    }

    if (val === 'toPercent' || boolFrom) {
      this.setValue(['toPercent', 'to'], [stepPercentResult, value]);
      this.broadcast(this.state);
    }
  }

  public init(state: stateType): void {
    const keys = Object.keys(state);
    const values = Object.values(state);
    const ranges = ['min', 'max'];
    const mandatoryKeys = ['from', 'to'];
    const states = [this.state.min, this.state.max];

    mandatoryKeys.forEach((key, i) => {
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        const numElement = keys.indexOf(ranges[i]);
        if (numElement === -1) {
          values.push(states[i]);
        } else {
          values.push(values[numElement]);
        }
      }
    });

    this.setValue(keys, values);
  }

  private validation(): void {
    const keys = Object.keys(this.state);
    const values = Object.values(this.state);

    keys.forEach((key, i) => {
      const generalValue = this.state.max - this.state.min;
      const stepCount: number = generalValue / this.state.step;
      const stepPercent: number = 100 / stepCount;
      const minBool = values[i] < this.state.min;
      const maxBool = values[i] > this.state.max;
      const toBool = values[i] > this.state.to;
      const fromBool = values[i] < this.state.from;
      const generalFrom = minBool || maxBool || toBool;
      const generalTo = minBool || maxBool || fromBool;

      switch (key) {
        case 'min':
          if (values[i] >= this.state.max) {
            this.state.min = this.state.max - 1;
            this.state.from = this.state.max - 1;
          }
          break;
        case 'step':
          if (values[i] === 0) this.state.step = 1;
          if (values[i] < 0) this.state.step = Math.abs(values[i]);
          if (values[i] > generalValue || this.state.step > generalValue)
            this.state.step = generalValue;
          break;
        case 'from':
          if (generalFrom) this.state.from = this.state.min;
          this.state.fromPercent =
            ((this.state.from - this.state.min) / this.state.step) *
            stepPercent;
          break;
        case 'to':
          if (generalTo) this.state.to = this.state.max;
          this.state.toPercent =
            ((this.state.to - this.state.min) / this.state.step) * stepPercent;
          break;
        default:
          break;
      }
    });

    this.broadcast(this.state);
  }
}
