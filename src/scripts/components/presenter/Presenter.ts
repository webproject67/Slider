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
    const cbView = (keys: string[], values: (number | boolean)[]) => {
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

    this.model.broadcast(this.model.getState());
  }

  public getState(): stateType {
    return this.model.getState();
  }

  public initModel(state: stateType): void {
    this.model.init(state);
  }

  public setValue(keys: string[], values: (number | boolean)[]): void {
    this.model.setValue(keys, values);
  }

  public subscribe(cb: (state: stateType) => HTMLElement) {
    this.model.subscribe(cb);
  }
}
