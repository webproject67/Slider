import { stateType } from '../../types';
import { HORIZONTAL, VERTICAL } from '../../const';

export default class ScaleView {
  private state: stateType;

  private element!: HTMLElement;

  constructor(state: stateType) {
    this.state = state;
    this.createElements();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(): HTMLElement {
    const { min, max, step, view } = this.state;
    const classNameList = 'slider__list_state_transformed';
    const classNameQuantity = 'slider__quantity_state_transformed';
    const classNameBool = this.element.classList.contains(classNameList);

    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    let scale = 1;
    if (stepCount > 20) scale = Math.ceil(stepCount / 20);
    let percent = stepPercent * scale;

    for (let i = 0; i <= 20; i += 1) {
      const item = <HTMLElement>this.element.children[i];
      const quantity = item.children[0];

      if (view === HORIZONTAL && classNameBool) {
        this.element.classList.remove(classNameList);
        quantity.classList.remove(classNameQuantity);
      }

      if (view === VERTICAL && !classNameBool) {
        this.element.classList.add(classNameList);
        quantity.classList.add(classNameQuantity);
      }

      if (i === 0) {
        quantity.textContent = String(min);
        continue;
      }

      if (i === 20) {
        quantity.textContent = String(max);
        continue;
      }

      item.style.display = '';

      if (percent > 99) {
        item.style.display = 'none';
        continue;
      }

      const value = Number(((percent / stepPercent) * step).toFixed()) + min;
      quantity.textContent = String(value);
      item.style.left = `${percent}%`;
      percent += stepPercent * scale;
    }

    return this.element;
  }

  private createElements(): void {
    this.element = this.createElement('slider__list');

    for (let i = 0; i <= 20; i += 1) {
      const item = this.createElement('slider__item');
      item.textContent = '|';

      if (i === 0) item.style.left = '0%';
      if (i === 20) item.style.left = '100%';

      const quantity = this.createElement('slider__quantity');
      item.appendChild(quantity);
      this.element.appendChild(item);
    }

    this.updateElement();
  }

  private createElement(className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.className = className;
    return newElement;
  }
}
