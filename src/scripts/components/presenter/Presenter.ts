import Model from '../model/Model';
import View from '../view/View';
import { stateType } from '../../types';

export default class Presenter {
  public model: Model;

  public view: View;

  constructor(main: HTMLElement, state: stateType) {
    this.model = new Model(state);
    this.view = new View(main);
    this.init();
  }

  private init() {
    const cbView = (keys: string[], values: (number | string | boolean)[]) =>
      this.model.setValue(keys, values);
    this.view.subscribe(cbView);

    const cbModel = (state: stateType) => this.view.updateView(state);
    this.model.subscribe(cbModel);

    this.model.broadcast(this.model.state);
  }
}
