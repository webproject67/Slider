import AbstractView from './Abstract-view';
import { VERTICAL } from '../../const';
import StateType from '../../StateType';

export default class ScaleView extends AbstractView {
  getClassName(state: StateType) {
    const { view } = state;
    let listVertical = '';

    if (view === VERTICAL) listVertical = 'slider__list_transformed';

    return `slider__list ${listVertical}`;
  }

  getTemplate(state: StateType) {
    const { min, max, step, view } = state;
    let template: string = '';
    let itemVertical = '';

    if (view === VERTICAL) itemVertical = 'slider__item_transformed';

    for (let i = min; i <= max; i += step) {
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

  bind(state: StateType) {
    this.getElement(state)
      .querySelectorAll('.slider__item')
      .forEach((elem) =>
        elem.addEventListener('click', this.handleItemClick.bind(null, state))
      );
  }

  public handleItemClick(state: StateType, evt: Event): void {}
}
