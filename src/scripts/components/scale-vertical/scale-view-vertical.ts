import AbstractView from '../abstract-view';

export default class ScaleView extends AbstractView {
  get className() {
    return 'slider__list slider__list--transform';
  }

  get template() {
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    let template: string = '';

    for (let i = min; i <= max; i+= step) {
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

    if(template.lastIndexOf(<string><unknown>max) === -1) {
      template += `
          <div class="slider__item">|
            <span class="slider__item--number">${max}</span>
          </div>
        `
    }
    
    return template
  }
}