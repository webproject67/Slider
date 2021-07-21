import AbstractView from './abstract-view';
import { NULL_VALUE, Range, View } from '../../const';
import { StateType } from '../../types';

export default class FlagView extends AbstractView {
  getClassName() {
    return 'slider__flags';
  }

  getTemplate(model: StateType) {
    const {
      range, view, fromPercent, from, min, toPercent, to, max,
    } = model;
    let flagMin = '';
    let flagMax = 'slider__flag_maximum';
    let position = 'left';

    if (range === Range.RANGE && view === View.HORIZONTAL) {
      flagMin = `<span class="slider__flag slider__flag_minimum" style="left:${fromPercent}%">${
        from === NULL_VALUE ? min : from
      }</span>`;
    }

    if (range === Range.RANGE && view === View.VERTICAL) {
      flagMin = `<span class="slider__flag slider__flag-vertical slider__flag-vertical_minimum" style="top:${fromPercent}%">${
        from === NULL_VALUE ? min : from
      }</span>`;
    }

    if (view === View.VERTICAL) {
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

  bind(model: StateType) {
    this.getElement(model)
      .querySelectorAll('.slider__flag')
      .forEach((elem) => elem.addEventListener(
        'touchstart',
        this.handleFlagMouseDown.bind(null, model),
      ));
    this.getElement(model)
      .querySelectorAll('.slider__flag')
      .forEach((elem) => elem.addEventListener(
        'mousedown',
        this.handleFlagMouseDown.bind(null, model),
      ));
  }

  public handleFlagMouseDown(model: StateType, evt: Event): void {}
}
