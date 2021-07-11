import Observer from '../observer/observer';
import { StateType } from '../../types';

export default class SliderModel extends Observer {
  main: HTMLElement;

  mainName: string;

  state: StateType;

  constructor(main: HTMLElement, state: StateType) {
    super();
    this.main = main;
    this.mainName = main.className ? `.${main.className}` : `#${main.id}`;
    this.state = state;
  }

  public setValueState(keys: string[], values: (number | string | boolean)[]) {
    keys.forEach((key, i) => {
      switch (key) {
        case 'minValue':
          this.minValue = Number(values[i]);
          break;
        case 'maxValue':
          this.maxValue = Number(values[i]);
          break;
        case 'stepValue':
          this.stepValue = Number(values[i]);
          break;
        case 'toValue':
          this.toValue = Number(values[i]);
          break;
        case 'toPercentValue':
          this.toPercentValue = Number(values[i]);
          break;
        case 'fromValue':
          this.fromValue = Number(values[i]);
          break;
        case 'fromPercentValue':
          this.fromPercentValue = Number(values[i]);
          break;
        case 'view':
          this.viewValue = String(values[i]);
          break;
        case 'range':
          this.rangeValue = String(values[i]);
          break;
        case 'flag':
          this.flagValue = Boolean(values[i]);
          break;
        case 'scale':
          this.scaleValue = Boolean(values[i]);
          break;
        default:
      }
    });
  }

  public get flagValue(): boolean {
    return this.state.flag;
  }

  public get fromValue(): number {
    return this.state.from;
  }

  public get fromPercentValue(): number {
    return this.state.fromPercent;
  }

  public get maxValue(): number {
    return this.state.max;
  }

  public get minValue(): number {
    return this.state.min;
  }

  public get rangeValue(): string {
    return this.state.range;
  }

  public get scaleValue(): boolean {
    return this.state.scale;
  }

  public get stepValue(): number {
    return this.state.step;
  }

  public get toValue(): number {
    return this.state.to;
  }

  public get toPercentValue(): number {
    return this.state.toPercent;
  }

  public get viewValue(): string {
    return this.state.view;
  }

  public set flagValue(value: boolean) {
    this.state.flag = value;
  }

  public set fromValue(value: number) {
    this.state.from = value;
  }

  public set fromPercentValue(value: number) {
    this.state.fromPercent = value;
  }

  public set maxValue(value: number) {
    this.state.max = value;
  }

  public set minValue(value: number) {
    this.state.min = value;
  }

  public set rangeValue(value: string) {
    this.state.range = value;
  }

  public set scaleValue(value: boolean) {
    this.state.scale = value;
  }

  public set stepValue(value: number) {
    this.state.step = value;
  }

  public set toValue(value: number) {
    this.state.to = value;
  }

  public set toPercentValue(value: number) {
    this.state.toPercent = value;
  }

  public set viewValue(value: string) {
    this.state.view = value;
  }
}
