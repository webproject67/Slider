import { stateType } from '../../types';

export default class TrackView {
  private state: stateType;

  private element!: HTMLElement;

  constructor(state: stateType) {
    this.state = state;
    this.createElement();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(): HTMLElement {
    const { view } = this.state;
    const className = 'slider__track_size_height';

    if (view) {
      this.element.classList.add(className);
    } else {
      this.element.classList.remove(className);
    }

    return this.element;
  }

  private createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'slider__track';
    this.updateElement();
  }
}
