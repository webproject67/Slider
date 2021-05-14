import AbstractView from '../abstract-view';

export default class FlagViewVerticalRange extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span class="slider__flag-vertical slider__flag-vertical--min" style="top:${this.sliderModel.fromPercentValue}%">${this.sliderModel.fromValue === -10000 ? this.sliderModel.minValue : this.sliderModel.fromValue}</span>
      <span data-testid="flagVerticalRange" class="slider__flag-vertical slider__flag-vertical--max" style="top:${this.sliderModel.toPercentValue}%">${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }
  
  bind() {
    this.element.querySelectorAll('.slider__flag-vertical').forEach((elem) => elem.addEventListener('mousedown', (evt: MouseEventInit):void => this.flagMouseDown(evt)))
  }

  public flagMouseDown(evt: MouseEventInit):void {
    
  }
}