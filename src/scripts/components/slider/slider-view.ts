import AbstractView from '../abstract-view';

export default class SliderView extends AbstractView {
  get className() {
    return 'slider__slider';
  }

  get template() {
    return `
      <div class="slider__scale">
        <div class="slider__bar"></div>
      </div>
      <div class="slider__toggle"></div>
    `
  }

  bind() {
    $(this.element).children('.slider__toggle').on('mousedown', (evt) => this.onToggleMouseDown(evt))
  }

  public onToggleMouseDown(evt: JQuery.MouseDownEvent<HTMLElement>): void {

  }
}