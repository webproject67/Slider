import AbstractView from './abstract-view';
import { VERTICAL } from '../../const';
import StateType from '../../types';

export default class ProgressView extends AbstractView {
  getClassName() {
    return 'slider__bars';
  }

  getTemplate(state: StateType) {
    const { fromPercent, toPercent, view } = state;
    let bar = `<div class="slider__bar" style="margin-left:${fromPercent}%;margin-right:${
      100 - toPercent
    }%"></div>`;

    if (view === VERTICAL) {
      bar = `<div class="slider__bar slider__bar_with-width" style="top:${fromPercent}%;height:${
        toPercent - fromPercent
      }%"></div>`;
    }

    return `${bar}`;
  }

  bind(state: StateType) {
    this.getElement(state).addEventListener(
      'click',
      this.handleBarClick.bind(null, state)
    );
  }

  public handleBarClick(state: StateType, evt: Event): void {}
}
