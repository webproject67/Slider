import AbstractView from '../abstract-view';

export default class SliderViewVerticalRange extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div data-testid="slider-vertical-range" class="slider__inner slider__inner_with-height">
        <div class="slider__scale slider__scale_with-height">
          <div class="slider__bar slider__bar_with-width" style="top:${
  this.sliderModel.fromPercentValue
}%;height:${
  this.sliderModel.toPercentValue - this.sliderModel.fromPercentValue
}%"></div>
        </div>
        <div class="slider__toggle slider__toggle_vertical-minimum" style="top:${
  this.sliderModel.fromPercentValue
}%"></div>
        <div class="slider__toggle slider__toggle_vertical-maximum" style="top:${
  this.sliderModel.toPercentValue
}%"></div>
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
