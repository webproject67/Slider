import { stateType } from '../../types';
import { NULL_VALUE, RANGE, HORIZONTAL, VERTICAL, ONE } from '../../const';

export default class FlagView {
  private state: stateType;

  private element!: HTMLElement;

  constructor(state: stateType) {
    this.state = state;
    this.createElements();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(index: number): HTMLElement {
    const { range, view, fromPercent, toPercent, from, to, min, max } =
      this.state;
    const rangeOBool = range === ONE;
    const rangeRBool = range === RANGE;
    const viewHBool = view === HORIZONTAL;
    const viewVBool = view === VERTICAL;
    const rangeOAndViewH = rangeOBool && viewHBool;
    const rangeOAndViewV = rangeOBool && viewVBool;
    const rangeRAndViewH = rangeRBool && viewHBool;
    const rangeRAndViewV = rangeRBool && viewVBool;
    const element = <HTMLElement>this.element.childNodes[index];

    element.className = '';
    element.textContent = '';
    element.style.left = '';
    element.style.top = '';

    const getFlagMin = () => {
      element.className = 'slider__pin slider__pin_position_minimum';
      element.textContent = String(from === NULL_VALUE ? min : from);
      element.style.left = `${fromPercent}%`;
    };

    const getFlagMax = () => {
      element.className = 'slider__pin slider__pin_position_maximum';
      element.textContent = String(to === NULL_VALUE ? max : to);
      element.style.left = `${toPercent}%`;
    };

    const getFlagVerticalMin = () => {
      element.className =
        'slider__pin slider__pin-vertical slider__pin-vertical_position_minimum';
      element.textContent = String(from === NULL_VALUE ? min : from);
      element.style.top = `${fromPercent}%`;
    };

    const getFlagVerticalMax = () => {
      element.className =
        'slider__pin slider__pin-vertical slider__pin-vertical_position_maximum';
      element.textContent = String(to === NULL_VALUE ? max : to);
      element.style.top = `${toPercent}%`;
    };

    if (!index && rangeOAndViewH) getFlagMax();
    if (!index && rangeOAndViewV) getFlagVerticalMax();
    if (rangeRAndViewH) {
      if (!index) {
        getFlagMin();
      } else {
        getFlagMax();
      }
    }

    if (rangeRAndViewV) {
      if (!index) {
        getFlagVerticalMin();
      } else {
        getFlagVerticalMax();
      }
    }

    return this.element;
  }

  private createElements(): void {
    this.element = this.createElement('slider__pins');

    for (let i = 0; i < 2; i += 1) {
      this.element.appendChild(this.createElement());
      this.updateElement(i);
    }
  }

  private createElement(className?: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    if (className) newElement.className = className;
    return newElement;
  }
}
