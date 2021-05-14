import AbstractView from '../abstract-view';

export default class SliderViewVerticalRange extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div data-testid="sliderVerticalRange" class="slider__inner slider__inner--height">
        <div class="slider__scale slider__scale--vertical">
          <div class="slider__bar slider__bar--vertical-range" style="top:${this.sliderModel.fromPercentValue}%;height:${this.sliderModel.toPercentValue - this.sliderModel.fromPercentValue}%"></div>
        </div>
        <div class="slider__toggle-vertical slider__toggle-vertical--v-min" style="top:${this.sliderModel.fromPercentValue}%"></div>
        <div class="slider__toggle-vertical slider__toggle-vertical--v-max" style="top:${this.sliderModel.toPercentValue}%"></div>
      </div>
    `
  }

  bind() {
    this.element.querySelectorAll('.slider__toggle-vertical').forEach((elem) => elem.addEventListener('mousedown', (evt: MouseEventInit):void => this.toggleMouseDown(evt)))
  }

  public toggleMouseDown(evt: MouseEventInit):void {
    
  }
}