import AbstractView from './Abstract-view';
import { RANGE, HORIZONTAL, VERTICAL } from '../../const';
import StateType from '../../StateType';

export default class TrackView extends AbstractView {
  getClassName() {
    return 'slider__wrapper';
  }

  getTemplate(state: StateType) {
    const { fromPercent, toPercent, range, view } = state;
    let innerWithHeight = '';
    let scaleWithHeight = '';
    let toggleMin = '';
    let toggleMax = 'slider__toggle_maximum';
    let position = 'left';
    const rangeBool = range === RANGE;
    const viewHBool = view === HORIZONTAL;
    const viewVBool = view === VERTICAL;
    const rangeAndViewH = rangeBool && viewHBool;
    const rangeAndViewV = rangeBool && viewVBool;

    if (rangeAndViewH) {
      toggleMin = `<div class="slider__toggle slider__toggle_minimum" style="left:${fromPercent}%"></div>`;
    }

    if (rangeAndViewV) {
      toggleMin = `<div class="slider__toggle slider__toggle_vertical-minimum" style="top:${fromPercent}%"></div>`;
    }

    if (viewVBool) {
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

  bind(state: StateType) {
    this.getElement(state)
      .querySelectorAll('.slider__toggle')
      .forEach((elem) =>
        elem.addEventListener(
          'touchstart',
          this.handleToggleMouseDown.bind(null, state)
        )
      );
    this.getElement(state)
      .querySelectorAll('.slider__toggle')
      .forEach((elem) =>
        elem.addEventListener(
          'mousedown',
          this.handleToggleMouseDown.bind(null, state)
        )
      );
  }

  public handleToggleMouseDown(state: StateType, evt: Event): void {}
}
