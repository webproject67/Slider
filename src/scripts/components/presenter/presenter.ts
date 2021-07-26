import Model from '../model/model';
import View from '../view/view';
import { StateType, ModelType } from '../../types';

export default class Presenter {
  public model: Model;

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

    const cbModel = (model: ModelType, bool: boolean) => this.view.updateView(model, bool);
    this.model.subscribe(cbModel);

    this.model.broadcast(this.model);
  }
}
