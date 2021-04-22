import AbstractView from '../abstract-view';

export default class ScaleView extends AbstractView {
  get className() {
    return 'slider__list';
  }

  get template() {
    const step: number = this.sliderModel.maxValue - this.sliderModel.minValue;
    let template: string = '';
    for (let i = 0; i <= step; i++) {
      template += '<div class="slider__item">|</div>'
    }
    return template
  }
}