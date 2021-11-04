import Model from '../model/model';
import View from '../view/view';
import StateType from '../../types';

export default class Presenter {
  public model: Model;

  private view: View;

  constructor(main: HTMLElement, state: StateType) {
    this.model = new Model(state);
    this.view = new View(main);
    this.init();
  }

  private init() {
    const cbView = (keys: string[], values: (number | string | boolean)[]) => {
      this.model.setValue(keys, values);
    };
    this.view.subscribe(cbView);

    const cbModel = (state: StateType, bool: boolean) =>
      this.view.updateView(state, bool);
    this.model.subscribe(cbModel);

    this.model.broadcast(this.model.state);
  }
}
