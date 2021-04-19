import AbstractView from '../../scripts/abstract-view';

export default class SliderView extends AbstractView {
  get template(): string {
    return `
      <div class="slider__slider">
        <div class="slider__scale">
          <div class="slider__bar"></div>
        </div>
        <div class="slider__toggle"></div>
      </div>
    `
  }
}