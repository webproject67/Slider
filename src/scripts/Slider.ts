import Presenter from './components/presenter/Presenter';
import { IState, ModelType } from './types';

export default class Slider {
  private presenter!: Presenter;

  constructor(main: HTMLElement, options: IState) {
    this.init(main, options);
  }

  public getState(): IState {
    return this.presenter.getState().value;
  }

  public setState(state: Partial<IState>): void {
    this.presenter.setState(state);
  }

  public subscribe(cb: (data: ModelType) => void): void {
    this.presenter.subscribe(cb);
  }

  private init(main: HTMLElement, options: IState): void {
    const state = $.extend(
      {
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

    this.presenter = new Presenter(main, state);
  }
}
