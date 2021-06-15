import AbstractView from '../abstract-view';

export default class SliderViewRange extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div data-testid="slider-range" class="slider__inner">
        <div class="slider__scale">
          <div class="slider__bar" style="margin-left:${
            this.sliderModel.fromPercentValue
          }%;margin-right:${100 - this.sliderModel.toPercentValue}%"></div>
        </div>
        <div class="slider__toggle slider__toggle_minimum" style="left:${
          this.sliderModel.fromPercentValue
        }%"></div>
        <div class="slider__toggle slider__toggle_maximum" style="left:${
          this.sliderModel.toPercentValue
        }%"></div>
      </div>
    `;
  }

  bind() {
    this.element
      .querySelectorAll('.slider__toggle')
      .forEach((elem) =>
        elem.addEventListener('touchstart', this.handleToggleMouseDown)
      );
    this.element
      .querySelectorAll('.slider__toggle')
      .forEach((elem) =>
        elem.addEventListener('mousedown', this.handleToggleMouseDown)
      );
  }

  public handleToggleMouseDown(evt: Event): void {}
}
