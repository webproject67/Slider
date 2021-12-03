import { IState } from '../../types';

export default class CircleView {
  private element!: HTMLElement;

  private quantityCircle: number;

  private circle: HTMLElement[];

  constructor(state: IState) {
    this.quantityCircle = 2;
    this.circle = [];
    this.createElements(state);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public updateElement(state: IState): HTMLElement {
    const { range, view, fromPercent, toPercent } = state;

    for (let index = 0; index < this.quantityCircle; index += 1) {
      this.circle[index].className = '';
      this.circle[index].style.left = '';
      this.circle[index].style.top = '';

      const getCircleMin = () => {
        this.circle[index].className =
          'slider__circle slider__circle_position_minimum';
        this.circle[index].style.left = `${fromPercent}%`;
      };

      const getCircleMax = () => {
        this.circle[index].className =
          'slider__circle slider__circle_position_maximum';
        this.circle[index].style.left = `${toPercent}%`;
      };

      const getCircleVerticalMin = () => {
        this.circle[index].className =
          'slider__circle slider__circle_position_vertical-minimum';
        this.circle[index].style.top = `${fromPercent}%`;
      };

      const getCircleVerticalMax = () => {
        this.circle[index].className =
          'slider__circle slider__circle_position_vertical-maximum';
        this.circle[index].style.top = `${toPercent}%`;
      };

      const indexAndRangeBool = index && range;

      if (!indexAndRangeBool && !view) getCircleMax();
      if (!indexAndRangeBool && view) getCircleVerticalMax();
      if (range && !view) {
        if (!index) {
          getCircleMin();
        } else {
          getCircleMax();
        }
      }

      if (range && view) {
        if (!index) {
          getCircleVerticalMin();
        } else {
          getCircleVerticalMax();
        }
      }
    }

    return this.element;
  }

  private createElements(state: IState): void {
    this.element = this.createElement('slider__circles');

    for (let i = 0; i < this.quantityCircle; i += 1) {
      this.circle[i] = this.createElement();
      this.element.appendChild(this.circle[i]);
    }

    this.updateElement(state);
  }

  private createElement(className?: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    if (className) newElement.className = className;
    return newElement;
  }
}
