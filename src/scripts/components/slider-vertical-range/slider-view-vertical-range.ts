import AbstractView from '../abstract-view';

export default class SliderViewVerticalRange extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div class="slider__inner slider__inner--height">
        <div class="slider__scale slider__scale--vertical">
          <div class="slider__bar slider__bar--vertical-range"></div>
        </div>
        <div class="slider__toggle slider__toggle--vertical-min"></div>
        <div class="slider__toggle slider__toggle--vertical-max"></div>
      </div>
    `
  }

  bind() {
    $(this.element).find('.slider__toggle').on('mousedown', (evt: JQuery.MouseDownEvent<HTMLElement>):void => this.toggleMouseDown(evt))
  }

  public toggleMouseDown(evt: JQuery.MouseDownEvent<HTMLElement>):void {
    
  }
}