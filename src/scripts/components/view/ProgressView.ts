import { stateType } from '../../types';

export default class ProgressView {
  private element!: HTMLElement;

  constructor(state: stateType) {
    this.createElement(state);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(state: stateType): HTMLElement {
    const { view, fromPercent, toPercent } = state;
    const className = 'slider__bar_size_width';

    this.element.style.top = '';
    this.element.style.height = '';
    this.element.style.marginLeft = '';
    this.element.style.marginRight = '';

    if (view) {
      this.element.classList.add(className);
      this.element.style.top = `${fromPercent}%`;
      this.element.style.height = `${toPercent - fromPercent}%`;
    } else {
      this.element.classList.remove(className);
      this.element.style.marginLeft = `${fromPercent}%`;
      this.element.style.marginRight = `${100 - toPercent}%`;
    }

    return this.element;
  }

  private createElement(state: stateType): void {
    this.element = document.createElement('div');
    this.element.className = 'slider__bar';
    this.updateElement(state);
  }
}
