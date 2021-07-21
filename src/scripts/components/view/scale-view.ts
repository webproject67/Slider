import AbstractView from './abstract-view';
import { View } from '../../const';
import { StateType } from '../../types';

export default class ScaleView extends AbstractView {
  getClassName(model: StateType) {
    const { view } = model;
    let listVertical = '';

    if (view === View.VERTICAL) listVertical = 'slider__list_transformed';

    return `slider__list ${listVertical}`;
  }

  getTemplate(model: StateType) {
    const {
      min, max, step, view,
    } = model;
    let template: string = '';
    let itemVertical = '';

    if (view === View.VERTICAL) itemVertical = 'slider__item_transformed';

    for (let i = min; i < max; i += step) {
      let itemPlace = '';
      if (i === min) itemPlace = 'slider__item_minimum';
      if (i === max) itemPlace = 'slider__item_maximum';

      template += `
        <div class="slider__item">|
          <span class="slider__item_centered ${itemPlace} ${itemVertical}">${i}</span>
        </div>
      `;
    }

    if (template.indexOf(String(max), template.length - 50) === -1) {
      template += `
        <div class="slider__item">|
          <span class="slider__item_centered slider__item_maximum ${itemVertical}">${max}</span>
        </div>
      `;
    }

    return template;
  }

  bind(model: StateType) {
    this.getElement(model)
      .querySelectorAll('.slider__item')
      .forEach((elem) => elem.addEventListener('click', this.handleItemClick.bind(null, model)));
  }

  public handleItemClick(model: StateType, evt: Event): void {}
}
