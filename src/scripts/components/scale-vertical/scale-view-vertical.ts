import AbstractView from '../abstract-view';

export default class ScaleViewVertical extends AbstractView {
  get className() {
    return 'slider__list slider__list--transform';
  }

  get template() {
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    let template: string = '';

    for (let i = max; i >= min; i-= step) {
      if (i === min || i === max) {
        template += `
          <div class="slider__item">|
            <span class="slider__item--number">${i}</span>
          </div>
        `
      } else {
        template += '<div class="slider__item">|</div>'
      }
    }

    if(template.indexOf(<string><unknown>min, max - 1) === -1) {
      template += `
          <div class="slider__item">|
            <span class="slider__item--number">${min}</span>
          </div>
        `
    }

    return template
  }
}