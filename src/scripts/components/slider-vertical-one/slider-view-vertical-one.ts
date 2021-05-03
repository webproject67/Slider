import AbstractView from '../abstract-view';

export default class SliderViewVerticalOne extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div class="slider__inner slider__inner--height">
        <div class="slider__scale slider__scale--vertical">
          <div class="slider__bar slider__bar--vertical-one"></div>
        </div>
        <div class="slider__toggle slider__toggle--vertical-max"></div>
      </div>
    `
  }

  bind() {
    $(this.element).find('.slider__inner--height').on('mouseover', (evt: JQuery.MouseOverEvent<HTMLElement>):void => this.sliderMouseOver(evt))
  }

  public sliderMouseOver(evt: JQuery.MouseOverEvent<HTMLElement>):void {
    
  }
}