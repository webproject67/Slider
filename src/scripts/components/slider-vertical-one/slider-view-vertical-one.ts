import AbstractView from '../abstract-view';

export default class SliderViewVerticalOne extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div data-testid="sliderVerticalOne" class="slider__inner slider__inner--height">
        <div class="slider__scale slider__scale--vertical">
          <div class="slider__bar slider__bar--vertical-one" style="height:${this.sliderModel.toPercentValue}%"></div>
        </div>
        <div class="slider__toggle-vertical slider__toggle-vertical--v-max" style="top:${this.sliderModel.toPercentValue}%"></div>
      </div>
    `
  }

  bind() {
    this.element.querySelectorAll('.slider__toggle-vertical').forEach((elem) => elem.addEventListener('mousedown', (evt: Event):void => this.toggleMouseDown(evt)))
  }

  public toggleMouseDown(evt: Event):void {
    
  }
}