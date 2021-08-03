import AbstractView from './abstract-view';
import { RANGE, HORIZONTAL, VERTICAL } from '../../const';
import { ModelType, StateType } from '../../types';

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
    const rangeBol = range === RANGE;
    const viewHBol = view === HORIZONTAL;
    const viewVBol = view === VERTICAL;
    const rangeAndViewH = rangeBol && viewHBol;
    const rangeAndViewV = rangeBol && viewVBol;

    if (rangeAndViewH) {
      toggleMin = `<div class="slider__toggle slider__toggle_minimum" style="left:${fromPercent}%"></div>`;
    }

    if (rangeAndViewV) {
      toggleMin = `<div class="slider__toggle slider__toggle_vertical-minimum" style="top:${fromPercent}%"></div>`;
    }

    if (viewVBol) {
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

  bind(model: ModelType) {
    this.getElement(model)
      .querySelectorAll('.slider__toggle')
      .forEach((elem) =>
        elem.addEventListener(
          'touchstart',
          this.handleToggleMouseDown.bind(null, model)
        )
      );
    this.getElement(model)
      .querySelectorAll('.slider__toggle')
      .forEach((elem) =>
        elem.addEventListener(
          'mousedown',
          this.handleToggleMouseDown.bind(null, model)
        )
      );
  }

  public handleToggleMouseDown(model: ModelType, evt: Event): void {}
}
