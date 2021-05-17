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
      if (i === min) {
        template += `
          <div data-testid="scaleVertical" class="slider__item">|
            <span class="slider__item--number slider__item--min">${i}</span>
          </div>
        `
      } else if (i === max) {
        template += `
          <div class="slider__item">|
            <span class="slider__item--number slider__item--max">${i}</span>
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
  
  bind() {
    this.element.querySelectorAll('.slider__item').forEach((elem) => elem.addEventListener('click', (evt: Event):void => this.scaleClick(evt)))
  }

  public scaleClick(evt: Event):void {
    
  }
}