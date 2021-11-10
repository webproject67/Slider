import AbstractView from './Abstract-view';
import { NULL_VALUE, RANGE, HORIZONTAL, VERTICAL } from '../../const';
import StateType from '../../StateType';

export default class FlagView extends AbstractView {
  getClassName() {
    return 'slider__flags';
  }

  getTemplate(state: StateType) {
    const { range, view, fromPercent, from, min, toPercent, to, max } = state;
    let flagMin = '';
    let flagMax = 'slider__flag_maximum';
    let position = 'left';
    const rangeBool = range === RANGE;
    const viewHBool = view === HORIZONTAL;
    const viewVBool = view === VERTICAL;
    const rangeAndViewH = rangeBool && viewHBool;
    const rangeAndViewV = rangeBool && viewVBool;

    if (rangeAndViewH) {
      flagMin = `<span class="slider__flag slider__flag_minimum" style="left:${fromPercent}%">${
        from === NULL_VALUE ? min : from
      }</span>`;
    }

    if (rangeAndViewV) {
      flagMin = `<span class="slider__flag slider__flag-vertical slider__flag-vertical_minimum" style="top:${fromPercent}%">${
        from === NULL_VALUE ? min : from
      }</span>`;
    }

    if (viewVBool) {
      flagMax = 'slider__flag-vertical slider__flag-vertical_maximum';
      position = 'top';
    }

    return `
      ${flagMin}
      <span class="slider__flag ${flagMax}" style="${position}:${toPercent}%">${
      to === NULL_VALUE ? max : to
    }</span>
    `;
  }

  bind(state: StateType) {
    this.getElement(state)
      .querySelectorAll('.slider__flag')
      .forEach((elem) =>
        elem.addEventListener(
          'touchstart',
          this.handleFlagMouseDown.bind(null, state)
        )
      );
    this.getElement(state)
      .querySelectorAll('.slider__flag')
      .forEach((elem) =>
        elem.addEventListener(
          'mousedown',
          this.handleFlagMouseDown.bind(null, state)
        )
      );
  }

  public handleFlagMouseDown(state: StateType, evt: Event): void {}
}
