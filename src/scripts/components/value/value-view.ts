import AbstractView from '../abstract-view';

export default class ValueView extends AbstractView {
  get className() {
    return 'slider__block-value';
  }

  get template() {
    return '<span class="slider__value"></span>'
  }

  bind() {
    $(this.element).children('.slider__value').on('mousedown', (evt) => this.onToggleMouseDown(evt))
  }

  public onToggleMouseDown(evt: JQuery.MouseDownEvent<HTMLElement>): void {

  }
}