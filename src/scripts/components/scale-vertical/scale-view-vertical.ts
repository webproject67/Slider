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

    for (let i = max; i >= min; i-= step) {
      if (i === min) {
        template += `
          <div data-testid="scale-vertical" class="slider__item">|
            <span class="slider__item_centered slider__item_minimum slider__item_transformed">${i}</span>
          </div>
        `
      } else if (i === max) {
        template += `
          <div class="slider__item">|
            <span class="slider__item_centered slider__item_maximum slider__item_transformed">${i}</span>
          </div>
        `
      } else {
        template += '<div class="slider__item">|</div>'
      }
    }

    if(template.indexOf(<string><unknown>min, max - 1) === -1) {
      template += `
          <div class="slider__item">|
            <span class="slider__item_centered">${min}</span>
          </div>
        `
    }

    return template
  }
  
  bind() {
    this.element.querySelectorAll('.slider__item').forEach((elem) => elem.addEventListener('click', this.onScaleClick))
  }

  public onScaleClick(evt: Event):void {
    
  }
}