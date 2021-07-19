import AbstractView from './abstract-view';
import { View } from '../../const';

export default class ProgressView extends AbstractView {
  get className() {
    return 'slider__bars';
  }

  get template() {
    const { fromPercent, toPercent, view } = this.model.state;
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

  bind() {
    this.element.addEventListener('click', this.handleBarClick);
  }

  public handleBarClick(evt: Event): void {}
}
