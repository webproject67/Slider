import { stateType } from '../../types';
import { NULL_VALUE, RANGE, HORIZONTAL, VERTICAL, ONE } from '../../const';

export default class FlagView {
  private state: stateType;

  private element!: HTMLElement;

  constructor(state: stateType, index: number) {
    this.state = state;
    this.createElement(index);
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

    this.element.className = '';
    this.element.textContent = '';
    this.element.style.left = '';
    this.element.style.top = '';

    const getFlagMin = () => {
      this.element.className = 'slider__pin slider__pin_position_minimum';
      this.element.textContent = String(from === NULL_VALUE ? min : from);
      this.element.style.left = `${fromPercent}%`;
    };

    const getFlagMax = () => {
      this.element.className = 'slider__pin slider__pin_position_maximum';
      this.element.textContent = String(to === NULL_VALUE ? max : to);
      this.element.style.left = `${toPercent}%`;
    };

    const getFlagVerticalMin = () => {
      this.element.className =
        'slider__pin slider__pin-vertical slider__pin-vertical_position_minimum';
      this.element.textContent = String(from === NULL_VALUE ? min : from);
      this.element.style.top = `${fromPercent}%`;
    };

    const getFlagVerticalMax = () => {
      this.element.className =
        'slider__pin slider__pin-vertical slider__pin-vertical_position_maximum';
      this.element.textContent = String(to === NULL_VALUE ? max : to);
      this.element.style.top = `${toPercent}%`;
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

  private createElement(index: number): void {
    this.element = document.createElement('div');
    this.updateElement(index);
  }
}
