import { stateType } from '../../types';

export default class FlagView {
  private state: stateType;

  private element!: HTMLElement;

  private quantityPin: number;

  private pin: HTMLElement[];

  constructor(state: stateType) {
    this.state = state;
    this.quantityPin = 2;
    this.pin = [];
    this.createElements();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(): HTMLElement {
    const { range, view, fromPercent, toPercent, from, to } = this.state;

    for (let index = 0; index < this.quantityPin; index += 1) {
      this.pin[index].className = '';
      this.pin[index].textContent = '';
      this.pin[index].style.left = '';
      this.pin[index].style.top = '';

      const getPinMin = () => {
        this.pin[index].className = 'slider__pin slider__pin_position_minimum';
        this.pin[index].textContent = String(from);
        this.pin[index].style.left = `${fromPercent}%`;
      };

      const getPinMax = () => {
        this.pin[index].className = 'slider__pin slider__pin_position_maximum';
        this.pin[index].textContent = String(to);
        this.pin[index].style.left = `${toPercent}%`;
      };

      const getPinVerticalMin = () => {
        this.pin[index].className =
          'slider__pin-vertical slider__pin-vertical_position_minimum';
        this.pin[index].textContent = String(from);
        this.pin[index].style.top = `${fromPercent}%`;
      };

      const getPinVerticalMax = () => {
        this.pin[index].className =
          'slider__pin-vertical slider__pin-vertical_position_maximum';
        this.pin[index].textContent = String(to);
        this.pin[index].style.top = `${toPercent}%`;
      };

      const indexAndRangeBool = !index && !range;

      if (indexAndRangeBool && !view) getPinMax();
      if (indexAndRangeBool && view) getPinVerticalMax();
      if (range && !view) {
        if (!index) {
          getPinMin();
        } else {
          getPinMax();
        }
      }

      if (range && view) {
        if (!index) {
          getPinVerticalMin();
        } else {
          getPinVerticalMax();
        }
      }
    }

    return this.element;
  }

  private createElements(): void {
    this.element = this.createElement('slider__pins');

    for (let i = 0; i < this.quantityPin; i += 1) {
      this.pin[i] = this.createElement();
      this.element.appendChild(this.pin[i]);
    }

    this.updateElement();
  }

  private createElement(className?: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    if (className) newElement.className = className;
    return newElement;
  }
}
