import { stateType } from '../../types';
import { HORIZONTAL, VERTICAL } from '../../const';

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
    const viewHBool = view === HORIZONTAL;
    const viewVBool = view === VERTICAL;
    const className = 'slider__track_size_height';
    const classNameBool = this.element.classList.contains(className);

    if (viewHBool && classNameBool) this.element.classList.remove(className);
    if (viewVBool && !classNameBool) this.element.classList.add(className);

    return this.element;
  }

  private createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'slider__track';
    this.updateElement();
  }
}
