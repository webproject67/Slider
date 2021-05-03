import AbstractView from '../abstract-view';

export default class SliderViewRange extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div class="slider__inner">
        <div class="slider__scale">
          <div class="slider__bar slider__bar--range"></div>
        </div>
        <div class="slider__toggle slider__toggle--min"></div>
        <div class="slider__toggle slider__toggle--max"></div>
      </div>
    `
  }

  bind() {
    $(this.element).find('.slider__inner').on('mouseover', (evt: JQuery.MouseOverEvent<HTMLElement>):void => this.sliderMouseOver(evt))
  }

  public sliderMouseOver(evt: JQuery.MouseOverEvent<HTMLElement>):void {
    
  }
}