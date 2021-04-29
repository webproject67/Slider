import AbstractView from '../abstract-view';

export default class FlagViewOne extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span class="slider__flag slider__flag--max">${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }
}