import AbstractView from '../abstract-view';

export default class SliderViewOne extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div data-testid="slider-one" class="slider__inner">
        <div class="slider__scale">
          <div class="slider__bar slider__bar--one" style="margin-right:${100 - this.sliderModel.toPercentValue}%"></div>
        </div>
        <div class="slider__toggle slider__toggle--max" style="left:${this.sliderModel.toPercentValue}%"></div>
      </div>
    `
  }

  bind() {
    this.element.querySelectorAll('.slider__toggle').forEach((elem) => elem.addEventListener('mousedown', this.onToggleMouseDown))
  }

  public onToggleMouseDown(evt: Event):void {
    
  }
}