import AbstractView from './abstract-view';
import { View } from '../../const';

export default class ScaleView extends AbstractView {
  get className() {
    const { view } = this.model.state;
    let listVertical = '';

    if (view === View.VERTICAL) listVertical = 'slider__list_transformed';

    return `slider__list ${listVertical}`;
  }

  get template() {
    const {
      min, max, step, view,
    } = this.model.state;
    let template: string = '';
    let itemVertical = '';

    if (view === View.VERTICAL) itemVertical = 'slider__item_transformed';

    for (let i = min; i < max; i += step) {
      if (i === min) {
        template += `
          <div class="slider__item">|
            <span class="slider__item_centered slider__item_minimum ${itemVertical}">${min}</span>
          </div>
        `;
      } else if (i === max) {
        template += `
          <div class="slider__item">|
            <span class="slider__item_centered slider__item_maximum ${itemVertical}">${max}</span>
          </div>
        `;
      } else {
        template += '<div class="slider__item">|</div>';
      }
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

  bind() {
    this.element
      .querySelectorAll('.slider__item')
      .forEach((elem) => elem.addEventListener('click', this.handleItemClick));
  }

  public handleItemClick(evt: Event): void {}
}
