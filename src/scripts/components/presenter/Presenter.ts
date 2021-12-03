import Model from '../model/Model';
import View from '../view/View';
import {
  IState,
  ModelType,
  ModelUpdate,
  PanelTypes,
  ViewHandler,
  ViewTypes,
} from '../../types';

export default class Presenter {
  private model: Model;

  private view: View;

  constructor(main: HTMLElement, state: IState) {
    this.model = new Model(state);
    this.view = new View(main);
    this.init();
  }

  public getState(): ModelType {
    return this.model.getState();
  }

  public setState(state: IState): void {
    this.model.setState(state);
  }

  public updateState(data: PanelTypes): void {
    this.model.updateState(data);
  }

  public subscribe(cb: (data: ModelType) => void): void {
    this.model.subscribe(cb);
  }

  private init() {
    const cbView = (data: ViewTypes) => {
      switch (data.type) {
        case ViewHandler.FROMCIRCLE:
          this.model.setStateFrom(data.value);
          break;
        case ViewHandler.TOCIRCLE:
          this.model.setStateTo(data.value);
          break;
        case ViewHandler.TRACK:
          this.model.setStateFromOrTo(data.value);
          break;
        case ViewHandler.SCALE:
          this.model.setStateFromOrTo(data.value);
          break;
        default:
          throw new Error('there is no such event');
      }
    };
    this.view.subscribe(cbView);

    const cbModel = (data: ModelType) => {
      switch (data.type) {
        case ModelUpdate.UPDATE:
          this.view.updateView(data.value);
          break;
        default:
          throw new Error('no state');
      }
    };
    this.model.subscribe(cbModel);

    this.model.broadcast(this.model.getState());
  }
}
