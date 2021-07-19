import AbstractView from './abstract-view';
import { NULL_VALUE, Range, View } from '../../const';

export default class FlagView extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    const {
      range, view, fromPercent, from, min, toPercent, to, max,
    } = this.model.state;
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

  bind() {
    this.element
      .querySelectorAll('.slider__flag')
      .forEach((elem) => elem.addEventListener('touchstart', this.handleFlagMouseDown));
    this.element
      .querySelectorAll('.slider__flag')
      .forEach((elem) => elem.addEventListener('mousedown', this.handleFlagMouseDown));
  }

  public handleFlagMouseDown(evt: Event): void {}
}
