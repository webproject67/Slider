import AbstractView from '../abstract-view';

export default class ScaleViewVertical extends AbstractView {
  get className() {
    return 'slider__list slider__list_transformed';
  }

  get template() {
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    let template: string = '';

    for (let i = min; i < max; i += step) {
      if (i === min) {
        template += `
          <div data-testid="scale-vertical" class="slider__item">|
            <span class="slider__item_centered slider__item_minimum slider__item_transformed">${min}</span>
          </div>
        `;
      } else if (i === max) {
        template += `
          <div class="slider__item">|
            <span class="slider__item_centered slider__item_maximum slider__item_transformed">${max}</span>
          </div>
        `;
      } else {
        template += '<div class="slider__item">|</div>';
      }
    }

    if (template.indexOf(String(max), template.length - 50) === -1) {
      template += `
          <div class="slider__item">|
            <span class="slider__item_centered slider__item_maximum slider__item_transformed">${max}</span>
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
