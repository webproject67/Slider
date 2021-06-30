import AbstractView from '../abstract-view';

export default class SliderViewVerticalOne extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div data-testid="slider-vertical-one" class="slider__inner slider__inner_with-height">
        <div class="slider__scale slider__scale_with-height">
          <div class="slider__bar slider__bar_with-width" style="height:${this.sliderModel.toPercentValue}%"></div>
        </div>
        <div class="slider__toggle slider__toggle_vertical-maximum" style="top:${this.sliderModel.toPercentValue}%"></div>
      </div>
    `;
  }

  bind() {
    this.element
      .querySelectorAll('.slider__toggle')
      .forEach((elem) => elem.addEventListener('touchstart', this.handleToggleMouseDown));
    this.element
      .querySelectorAll('.slider__toggle')
      .forEach((elem) => elem.addEventListener('mousedown', this.handleToggleMouseDown));
  }

  public handleToggleMouseDown(evt: Event): void {}
}
