import AbstractView from '../abstract-view';

export default class FlagViewRange extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span class="slider__flag slider__flag--min">${this.sliderModel.fromValue}</span>
      <span class="slider__flag slider__flag--max">${this.sliderModel.toValue}</span>
    `
  }
}