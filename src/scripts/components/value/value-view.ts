import AbstractView from '../abstract-view';

export default class ValueView extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `<span class="slider__flag">${this.sliderModel.currentValue}</span>`
  }
}