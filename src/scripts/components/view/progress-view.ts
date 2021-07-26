import AbstractView from './abstract-view';
import { View } from '../../const';
import { ModelType, StateType } from '../../types';

export default class ProgressView extends AbstractView {
  getClassName() {
    return 'slider__bars';
  }

  getTemplate(state: StateType) {
    const { fromPercent, toPercent, view } = state;
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

  bind(model: ModelType) {
    this.getElement(model).addEventListener(
      'click',
      this.handleBarClick.bind(null, model),
    );
  }

  public handleBarClick(model: ModelType, evt: Event): void {}
}
