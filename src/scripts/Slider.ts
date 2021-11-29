import Presenter from './components/presenter/Presenter';
import { stateType } from './types';

export default class Slider {
  presenter!: Presenter;

  constructor(main: HTMLElement, options: object | undefined) {
    this.init(main, options);
  }

  public getState(): stateType {
    return this.presenter.getState();
  }

  public setState(options: object): void {
    this.presenter.initModel(options);
  }

  public setValue(keys: string[], values: (number | boolean)[]): void {
    this.presenter.setValue(keys, values);
  }

  public subscribe(cb: (state: stateType) => HTMLElement) {
    this.presenter.subscribe(cb);
  }

  private init(main: HTMLElement, options: object | undefined): Presenter {
    this.presenter = new Presenter(main, options);
    return this.presenter;
  }
}
