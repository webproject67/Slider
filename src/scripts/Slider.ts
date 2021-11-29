import Presenter from './components/presenter/Presenter';
import { stateType } from './types';

export default class Slider {
  presenter!: Presenter;

  constructor(main: HTMLElement, options: object | undefined) {
    this.init(main, options);
  }

  public getState(): stateType {
    return this.presenter.model.getState();
  }

  public setState(options: object): void {
    this.presenter.model.init(options);
  }

  private init(main: HTMLElement, options: object | undefined): Presenter {
    this.presenter = new Presenter(main, options);
    return this.presenter;
  }
}
