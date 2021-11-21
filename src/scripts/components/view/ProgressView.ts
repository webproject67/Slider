import { HORIZONTAL } from '../../const';
import { stateType } from '../../types';

export default class ProgressView {
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
    const { view, fromPercent, toPercent } = this.state;
    const className = 'slider__bar_size_width';
    const classNameBool = this.element.classList.contains(className);

    if (view === HORIZONTAL) {
      if (classNameBool) this.element.classList.remove(className);
      this.element.style.top = '';
      this.element.style.height = '';
      this.element.style.marginLeft = `${fromPercent}%`;
      this.element.style.marginRight = `${100 - toPercent}%`;

      return this.element;
    }

    if (!classNameBool) this.element.classList.add(className);
    this.element.style.marginLeft = '';
    this.element.style.marginRight = '';
    this.element.style.top = `${fromPercent}%`;
    this.element.style.height = `${toPercent - fromPercent}%`;

    return this.element;
  }

  private createElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'slider__bar';
    this.updateElement();
  }
}
