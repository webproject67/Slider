import AbstractView from '../abstract-view';

export default class FlagViewVerticalOne extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span class="slider__flag-vertical slider__flag-vertical--max">${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }
}