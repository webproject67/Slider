import { stateType } from '../../types';

export default class ScaleView {
  private state: stateType;

  private element!: HTMLElement;

  private quantityItem: number;

  private item: HTMLElement[];

  private quantity: HTMLElement[];

  constructor(state: stateType) {
    this.state = state;
    this.quantityItem = 20;
    this.item = [];
    this.quantity = [];
    this.createElements();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(): HTMLElement {
    const { min, max, step, view } = this.state;
    const classNameList = 'slider__list_state_transformed';
    const classNameQuantity = 'slider__quantity_state_transformed';

    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    let scale = 1;
    if (stepCount > this.quantityItem)
      scale = Math.ceil(stepCount / this.quantityItem);
    let percent = stepPercent * scale;

    for (let i = 0; i <= this.quantityItem; i += 1) {
      if (view) {
        this.element.classList.add(classNameList);
        this.quantity[i].classList.add(classNameQuantity);
      } else {
        this.element.classList.remove(classNameList);
        this.quantity[i].classList.remove(classNameQuantity);
      }

      if (i === 0) {
        this.item[i].style.left = '0%';
        this.quantity[i].textContent = String(min);
        continue;
      }

      if (i === 20) {
        this.item[i].style.left = '100%';
        this.quantity[i].textContent = String(max);
        continue;
      }

      this.item[i].style.display = '';

      if (percent > 99) {
        this.item[i].style.display = 'none';
        continue;
      }

      const value = Number(((percent / stepPercent) * step).toFixed()) + min;
      this.quantity[i].textContent = String(value);
      this.item[i].style.left = `${percent}%`;
      percent += stepPercent * scale;
    }

    return this.element;
  }

  private createElements(): void {
    this.element = this.createElement('slider__list');

    for (let i = 0; i <= this.quantityItem; i += 1) {
      this.item[i] = this.createElement('slider__item');
      this.item[i].textContent = '|';

      this.quantity[i] = this.createElement('slider__quantity');
      this.item[i].appendChild(this.quantity[i]);
      this.element.appendChild(this.item[i]);
    }

    this.updateElement();
  }

  private createElement(className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.className = className;
    return newElement;
  }
}
