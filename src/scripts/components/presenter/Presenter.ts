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
    const cbView = (keys: string[], values: (number | string | boolean)[]) => {
      keys.forEach((key, i) => {
        const corner = key === 'corner';
        const pinMax = key === 'toPercent';
        const pinMin = key === 'fromPercent';
        const generalConst = corner || pinMax || pinMin;

        if (generalConst) {
          this.model.calculateValue(Number(values[i]), keys[i]);
        } else {
          this.model.setValue(keys, values);
        }
      });
    };
    this.view.subscribe(cbView);

    const cbModel = (state: stateType) => this.view.updateView(state);
    this.model.subscribe(cbModel);

    this.model.broadcast(this.model.state);
  }
}
