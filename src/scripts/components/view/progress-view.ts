import AbstractView from './abstract-view';
import { View } from '../../const';
import { StateType } from '../../types';

export default class ProgressView extends AbstractView {
  getClassName() {
    return 'slider__bars';
  }

  getTemplate(model: StateType) {
    const { fromPercent, toPercent, view } = model;
    let bar = `<div class="slider__bar" style="margin-left:${fromPercent}%;margin-right:${
      100 - toPercent
    }%"></div>`;

    if (view === View.VERTICAL) {
      bar = `<div class="slider__bar slider__bar_with-width" style="top:${fromPercent}%;height:${
        toPercent - fromPercent
      }%"></div>`;
    }

    return `${bar}`;
  }

  bind(model: StateType) {
    this.getElement(model).addEventListener(
      'click',
      this.handleBarClick.bind(null, model),
    );
  }

  public handleBarClick(model: StateType, evt: Event): void {}
}
