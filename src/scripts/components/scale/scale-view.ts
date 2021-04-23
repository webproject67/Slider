import AbstractView from '../abstract-view';

export default class ScaleView extends AbstractView {
  get className() {
    return 'slider__list';
  }

  get template() {
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;

    let template: string = '';
    for (let i = min; i <= max; i+= step) {
      if (i === min || i === max) {
        template += `
          <div class="slider__item" data-step=${i}>|
            <span class="slider__item--number">${i}</span>
          </div>
        `
      } else {
        template += `<div class="slider__item" data-step=${i}>|</div>`
      }
    }
    return template
  }

  private newElement(): JQuery<HTMLElement> {
    this.elem = this.render();
    this.bind();
    return this.elem;
  }

  public newScaleView(): void {
    $('.slider__list').replaceWith(this.newElement());
  }

  bind() {
    $(this.element).on('click', (evt) => this.onStreakClick(evt.target))
  }

  onStreakClick(element: HTMLElement): void {

  }
}