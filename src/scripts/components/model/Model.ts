import Observer from '../observer/Observer';
import { stateType } from '../../types';

export default class Model extends Observer {
  private state: stateType;

  constructor(state: stateType) {
    super();
    this.state = state;
    this.setState(state);
  }

  public getState(): stateType {
    return { ...this.state };
  }

  public setState(state: Partial<stateType>) {
    if (state.min) {
      if (!(typeof state.min === 'number')) throw new Error('invalid value');
      this.state.min = Number(state.min);
    }

    if (state.max) {
      if (!(typeof state.max === 'number')) throw new Error('invalid value');
      this.state.max = Number(state.max);
    }

    if (state.step) {
      if (!(typeof state.step === 'number')) throw new Error('invalid value');
      this.state.step = Number(state.step);
    }

    if (state.from) {
      if (!(typeof state.from === 'number')) throw new Error('invalid value');
      this.state.from = Number(state.from);
    }

    if (state.fromPercent) this.state.fromPercent = Number(state.fromPercent);

    if (state.to) {
      if (!(typeof state.to === 'number')) throw new Error('invalid value');
      this.state.to = Number(state.to);
    }

    if (state.toPercent) this.state.toPercent = Number(state.toPercent);

    if (!(typeof state.view === 'undefined')) {
      if (!(typeof state.view === 'boolean')) throw new Error('invalid value');
      this.state.view = Boolean(state.view);
    }

    if (!(typeof state.range === 'undefined')) {
      if (!(typeof state.range === 'boolean')) throw new Error('invalid value');
      this.state.range = Boolean(state.range);
    }

    if (!(typeof state.flag === 'undefined')) {
      if (!(typeof state.flag === 'boolean')) throw new Error('invalid value');
      this.state.flag = Boolean(state.flag);
    }

    if (!(typeof state.progress === 'undefined')) {
      if (!(typeof state.progress === 'boolean'))
        throw new Error('invalid value');
      this.state.progress = Boolean(state.progress);
    }

    if (!(typeof state.scale === 'undefined')) {
      if (!(typeof state.scale === 'boolean')) throw new Error('invalid value');
      this.state.scale = Boolean(state.scale);
    }

    this.validation();
  }

  public calculateValue(state: stateType): void {
    let val: string = '';
    let corner: number = 0;

    if (state.max) corner = state.max;
    if (state.fromPercent) {
      val = 'fromPercent';
      corner = state.fromPercent;
    }
    if (state.toPercent) {
      val = 'toPercent';
      corner = state.toPercent;
    }
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
      this.setState({ fromPercent: stepPercentResult, from: value });
      this.broadcast(this.state);
      return;
    }

    if (val === 'toPercent' || boolFrom) {
      this.setState({ toPercent: stepPercentResult, to: value });
      this.broadcast(this.state);
    }
  }

  private validation(): void {
    if (this.state.min >= this.state.max) {
      this.state.min = this.state.max - 1;
      this.state.from = this.state.max - 1;
    }

    const generalValue = this.state.max - this.state.min;

    if (this.state.step === 0) this.state.step = 1;
    if (this.state.step < 0) this.state.step = Math.abs(this.state.step);
    if (this.state.step > generalValue || this.state.step > generalValue)
      this.state.step = generalValue;

    const stepCount: number = generalValue / this.state.step;
    const stepPercent: number = 100 / stepCount;

    const fromMaxBool = this.state.from > this.state.max;
    const fromMinBool = this.state.from < this.state.min;
    const fromToBool = this.state.from > this.state.to;
    const generalFrom = fromMinBool || fromMaxBool || fromToBool;

    if (generalFrom) this.state.from = this.state.min;
    this.state.fromPercent =
      ((this.state.from - this.state.min) / this.state.step) * stepPercent;

    const toMaxBool = this.state.to > this.state.max;
    const toMinBool = this.state.to < this.state.min;
    const toFromBool = this.state.to < this.state.from;
    const generalTo = toMinBool || toMaxBool || toFromBool;

    if (generalTo) this.state.to = this.state.max;
    this.state.toPercent =
      ((this.state.to - this.state.min) / this.state.step) * stepPercent;

    this.broadcast(this.state);
  }
}
