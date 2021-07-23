import Model from '../model/model';
import View from '../view/view';
import { StateType } from '../../types';

export default class Presenter {
  private model: Model;

  private view: View;

  constructor(main: HTMLElement, state: StateType) {
    this.model = new Model(main, state);
    this.view = new View();
    this.init();
  }

  private init() {
    const cbView = (keys: string[], values: (number | string | boolean)[]) => {
      this.model.setValue(keys, values);
    };
    this.view.subscribe(cbView);

    const cbModel = (value: StateType, bool: boolean) => this.view.updateView(value, bool);
    this.model.subscribe(cbModel);

    this.model.broadcast(this.model.state);
  }
}
