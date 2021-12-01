import Model from '../model/Model';
import View from '../view/View';
import { stateType } from '../../types';

export default class Presenter {
  private model: Model;

  private view: View;

  constructor(main: HTMLElement, state: stateType) {
    this.model = new Model(state);
    this.view = new View(main);
    this.init();
  }

  private init() {
    const cbView = (state: stateType) => this.model.calculateValue(state);
    this.view.subscribe(cbView);

    const cbModel = (state: stateType) => this.view.updateView(state);
    this.model.subscribe(cbModel);

    this.model.broadcast(this.model.getState());
  }

  public getState(): stateType {
    return this.model.getState();
  }

  public setState(state: stateType): void {
    this.model.setState(state);
  }

  public subscribe(cb: (state: stateType) => HTMLElement) {
    this.model.subscribe(cb);
  }
}
