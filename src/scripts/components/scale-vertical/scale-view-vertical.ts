import AbstractView from '../abstract-view';
import { Const } from '../../const';

export default class ScaleViewVertical extends AbstractView {
  get className() {
    return 'slider__list slider__list_transformed';
  }

  get template() {
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    let template: string = '';

    for (let i = min; i < max; i += step) {
      if (i === min) {
        template += `
          <div data-testid="scale-vertical" class="slider__item">|
            <span class="slider__item_centered slider__item_minimum slider__item_transformed">${min}</span>
          </div>
        `;
      } else if (i === max) {
        template += `
          <div class="slider__item">|
            <span class="slider__item_centered slider__item_maximum slider__item_transformed">${max}</span>
          </div>
        `;
      } else {
        template += '<div class="slider__item">|</div>';
      }
    }

    if (template.indexOf(String(max), template.length - 50) === -1) {
      template += `
          <div class="slider__item">|
            <span class="slider__item_centered slider__item_maximum slider__item_transformed">${max}</span>
          </div>
        `;
    }

    return template;
  }

  bind() {
    this.element
      .querySelectorAll('.slider__item')
      .forEach((elem) => elem.addEventListener('click', this.handleItemClick.bind(this)));
  }

  public handleItemClick(evt: Event & { pageY?: number }): void {
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    const scale: HTMLElement = <HTMLElement>evt.currentTarget;
    const stepList: HTMLElement = scale.parentElement!;
    const slider: HTMLElement = stepList.parentElement!;
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderHeight: number = boxBottom - boxTop;
    const corner: number = ((evt.pageY! - boxTop) / sliderHeight) * 100;
    const stepCount: number = (max - min) / step;
    const stepPercent: number = 100 / stepCount;
    let stepPercentResult: number = Math.round(corner / stepPercent) * stepPercent;
    if (stepPercentResult < 0) stepPercentResult = 0;
    if (stepPercentResult > 100) stepPercentResult = 100;
    if (scale.children.length) {
      if (
        scale.children[0].className.split(' ')[1] === Const.SLIDER_ITEM_MINIMUM
      ) stepPercentResult = 0;
      if (
        scale.children[0].className.split(' ')[1] === Const.SLIDER_ITEM_MAXIMUM
      ) stepPercentResult = 100;
    }

    if (stepPercentResult >= this.sliderModel.fromPercentValue) {
      const value: number = Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;
      this.sliderModel.broadcast(
        ['toPercentValue', 'toValue'],
        [stepPercentResult, value],
      );
    } else {
      const value: number = Number(((stepPercentResult / stepPercent) * step).toFixed()) + min;
      this.sliderModel.broadcast(
        ['fromPercentValue', 'fromValue'],
        [stepPercentResult, value],
      );
    }
  }
}
