import {createElement} from '../../scripts/utils';

export default class SliderView {
  get element(): HTMLElement {
    return createElement(this.template)
  }

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