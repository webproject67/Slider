import { IState } from '../../types';

export default class TrackView {
  private element!: HTMLElement;

  constructor(state: IState) {
    this.createElement(state);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(state: IState): HTMLElement {
    const className = 'slider__track_size_height';

    if (state.view) {
      this.element.classList.add(className);
    } else {
      this.element.classList.remove(className);
    }

    return this.element;
  }

  private createElement(state: IState): void {
    this.element = document.createElement('div');
    this.element.className = 'slider__track';
    this.updateElement(state);
  }
}
