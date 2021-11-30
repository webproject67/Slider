import Presenter from './components/presenter/Presenter';
import { stateType } from './types';

export default class Slider {
  private state!: stateType;

  private presenter!: Presenter;

  constructor(main: HTMLElement, options?: object) {
    this.init(main, options);
  }

  public getState(): stateType {
    return this.presenter.getState();
  }

  public setState(state: stateType): void {
    this.presenter.initModel(state);
  }

  public setValue(keys: string[], values: (number | boolean)[]): void {
    this.presenter.setValue(keys, values);
  }

  public subscribe(cb: (state: stateType) => HTMLElement) {
    this.presenter.subscribe(cb);
  }

  private init(main: HTMLElement, options?: object): Presenter {
    this.state = $.extend(
      {
        start: 1,
        min: 0,
        max: 100,
        from: 0,
        fromPercent: 0,
        to: 100,
        toPercent: 100,
        step: 1,
        view: false,
        range: false,
        flag: true,
        progress: true,
        scale: true,
      },
      options
    );

    this.presenter = new Presenter(main, this.state);
    return this.presenter;
  }
}
