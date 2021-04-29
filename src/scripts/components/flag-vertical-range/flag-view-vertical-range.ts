import AbstractView from '../abstract-view';

export default class FlagViewVerticalRange extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span class="slider__flag-vertical slider__flag-vertical--min">${this.sliderModel.fromValue === -10000 ? this.sliderModel.minValue : this.sliderModel.fromValue}</span>
      <span class="slider__flag-vertical slider__flag-vertical--max">${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }
}