import Model from '../model/Model';
import View from '../view/View';
import {
  IState,
  ModelType,
  ModelUpdate,
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

  public getElement(): HTMLElement {
    return this.view.getElement();
  }

  public getState(): ModelType {
    return this.model.getState();
  }

  public setState(state: Partial<IState>): void {
    this.model.setState(state);
  }

  public subscribe(cb: (data: ModelType) => void): void {
    this.model.subscribe(cb);
  }

  private init(): void {
    const cbView = (data: ViewTypes) => {
      switch (data.type) {
        case ViewHandler.HANDLE_CIRCLE_FROM_MOUSE_DOWN:
          this.model.setStateFrom(data.value);
          break;
        case ViewHandler.HANDLE_CIRCLE_TO_MOUSE_DOWN:
          this.model.setStateTo(data.value);
          break;
        case ViewHandler.HANDLE_TRACK_CLICK:
          this.model.setStateFromOrTo(data.value);
          break;
        case ViewHandler.HANDLE_SCALE_CLICK:
          this.model.setStateFromOrTo(data.value);
          break;
        default:
          throw new Error('there is no such event');
      }
    };
    this.view.subscribe(cbView);

    const cbModel = (data: ModelType) => {
      switch (data.type) {
        case ModelUpdate.UPDATE_MODEL_STATE:
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
