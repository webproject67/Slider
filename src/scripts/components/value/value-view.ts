import AbstractView from '../abstract-view';

export default class ValueView extends AbstractView {
  get className() {
    return 'slider__block-value';
  }

  get template() {
    return `<span class="slider__value">${this.sliderModel.currentValue}</span>`
  }
}