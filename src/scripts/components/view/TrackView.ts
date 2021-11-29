import { stateType } from '../../types';

export default class TrackView {
  private element!: HTMLElement;

  constructor(state: stateType) {
    this.createElement(state);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(state: stateType): HTMLElement {
    const { view } = state;
    const className = 'slider__track_size_height';

    if (view) {
      this.element.classList.add(className);
    } else {
      this.element.classList.remove(className);
    }

    return this.element;
  }

  private createElement(state: stateType): void {
    this.element = document.createElement('div');
    this.element.className = 'slider__track';
    this.updateElement(state);
  }
}
