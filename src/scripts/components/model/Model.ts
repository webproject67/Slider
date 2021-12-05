import Observer from '../observer/Observer';
import { IState, ModelType, ModelUpdate, PanelTypes } from '../../types';

export default class Model extends Observer<ModelType> {
  private state: IState;

  constructor(state: IState) {
    super();
    this.state = state;
    this.setState(state);
  }

  public getState(): ModelType {
    return { type: ModelUpdate.UPDATEMODELSTATE, value: { ...this.state } };
  }

  public setStateFrom(valuePercent: number): void {
    let cloneValuePercent = valuePercent;
    if (valuePercent > this.state.toPercent)
      cloneValuePercent = this.state.toPercent;
    const value = this.calculateValue(cloneValuePercent);
    this.setState({ fromPercent: cloneValuePercent, from: value });
  }

  public setStateTo(valuePercent: number): void {
    let cloneValuePercent = valuePercent;
    if (valuePercent < this.state.fromPercent)
      cloneValuePercent = this.state.fromPercent;
    const value = this.calculateValue(cloneValuePercent);
    this.setState({ toPercent: cloneValuePercent, to: value });
  }

  public setStateFromOrTo(valuePercent: number): void {
    if (this.state.fromPercent > valuePercent) {
      this.setStateFrom(valuePercent);
    } else {
      this.setStateTo(valuePercent);
    }
  }

  public setState(state: Partial<IState>): void {
    if (!(typeof state.min === 'undefined')) {
      if (!(typeof state.min === 'number')) throw new Error('invalid value');
      this.state.min = Number(state.min);
      this.state.from = this.state.min;
    }

    if (!(typeof state.max === 'undefined')) {
      if (!(typeof state.max === 'number')) throw new Error('invalid value');
      this.state.max = Number(state.max);
      this.state.to = this.state.max;
    }

    if (!(typeof state.step === 'undefined')) {
      if (!(typeof state.step === 'number')) throw new Error('invalid value');
      this.state.step = Number(state.step);
      this.state.from = this.state.min;
      this.state.to = this.state.max;
    }

    if (!(typeof state.from === 'undefined')) {
      if (!(typeof state.from === 'number')) throw new Error('invalid value');
      this.state.from = Number(state.from);
    }

    if (!(typeof state.fromPercent === 'undefined'))
      this.state.fromPercent = Number(state.fromPercent);

    if (!(typeof state.to === 'undefined')) {
      if (!(typeof state.to === 'number')) throw new Error('invalid value');
      this.state.to = Number(state.to);
    }

    if (!(typeof state.toPercent === 'undefined'))
      this.state.toPercent = Number(state.toPercent);

    if (!(typeof state.view === 'undefined')) {
      if (!(typeof state.view === 'boolean')) throw new Error('invalid value');
      this.state.view = Boolean(state.view);
    }

    if (!(typeof state.range === 'undefined')) {
      if (!(typeof state.range === 'boolean')) throw new Error('invalid value');
      this.state.range = Boolean(state.range);
      this.state.from = this.state.min;
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

  private calculateValue(valuePercent: number): number {
    const { min, max, step } = this.state;
    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    const stepPercentResult: number =
      Math.round(valuePercent / stepPercent) * stepPercent;
    return Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;
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

    this.broadcast({
      type: ModelUpdate.UPDATEMODELSTATE,
      value: { ...this.state },
    });
  }
}
