import AbstractView from './abstract-view';
import { Range, View } from '../../const';

export default class TrackView extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    const {
      fromPercent, toPercent, range, view,
    } = this.model.state;
    let innerWithHeight = '';
    let scaleWithHeight = '';
    let toggleMin = '';
    let toggleMax = 'slider__toggle_maximum';
    let position = 'left';

    if (range === Range.RANGE && view === View.HORIZONTAL) {
      toggleMin = `<div class="slider__toggle slider__toggle_minimum" style="left:${fromPercent}%"></div>`;
    }

    if (range === Range.RANGE && view === View.VERTICAL) {
      toggleMin = `<div class="slider__toggle slider__toggle_vertical-minimum" style="top:${fromPercent}%"></div>`;
    }

    if (view === View.VERTICAL) {
      innerWithHeight = 'slider__inner_with-height';
      scaleWithHeight = 'slider__scale_with-height';
      toggleMax = 'slider__toggle_vertical-maximum';
      position = 'top';
    }

    return `
      <div class="slider__inner ${innerWithHeight}">
        <div class="slider__scale ${scaleWithHeight}">
        </div>
        ${toggleMin}
        <div class="slider__toggle ${toggleMax}" style="${position}:${toPercent}%"></div>
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
