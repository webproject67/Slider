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
    this.element.querySelectorAll('.slider__toggle').forEach((elem) => elem.addEventListener('mousedown', (evt: Event):void => this.toggleMouseDown(evt)))
  }

  public toggleMouseDown(evt: Event):void {
    
  }
}