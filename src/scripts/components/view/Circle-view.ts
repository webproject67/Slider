import { stateType } from '../../types';
import { HORIZONTAL, ONE, RANGE, VERTICAL } from '../../const';

export default class CircleView {
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
    const { range, view, fromPercent, toPercent } = this.state;
    const rangeOBool = range === ONE;
    const rangeRBool = range === RANGE;
    const viewHBool = view === HORIZONTAL;
    const viewVBool = view === VERTICAL;
    const rangeOAndViewH = rangeOBool && viewHBool;
    const rangeOAndViewV = rangeOBool && viewVBool;
    const rangeRAndViewH = rangeRBool && viewHBool;
    const rangeRAndViewV = rangeRBool && viewVBool;

    this.element.className = '';
    this.element.style.left = '';
    this.element.style.top = '';

    const getCircleMin = () => {
      this.element.className = 'slider__toggle slider__toggle_position_minimum';
      this.element.style.left = `${fromPercent}%`;
    };

    const getCircleMax = () => {
      this.element.className = 'slider__toggle slider__toggle_position_maximum';
      this.element.style.left = `${toPercent}%`;
    };

    const getCircleVerticalMin = () => {
      this.element.className =
        'slider__toggle slider__toggle_position_vertical-minimum';
      this.element.style.top = `${fromPercent}%`;
    };

    const getCircleVerticalMax = () => {
      this.element.className =
        'slider__toggle slider__toggle_position_vertical-maximum';
      this.element.style.top = `${toPercent}%`;
    };

    if (!index && rangeOAndViewH) getCircleMax();
    if (!index && rangeOAndViewV) getCircleVerticalMax();
    if (rangeRAndViewH) {
      if (!index) {
        getCircleMin();
      } else {
        getCircleMax();
      }
    }

    if (rangeRAndViewV) {
      if (!index) {
        getCircleVerticalMin();
      } else {
        getCircleVerticalMax();
      }
    }

    return this.element;
  }

  private createElement(index: number): void {
    this.element = document.createElement('div');
    this.updateElement(index);
  }
}
