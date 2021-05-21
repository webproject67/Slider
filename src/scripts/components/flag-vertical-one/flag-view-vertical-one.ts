import AbstractView from '../abstract-view';

export default class FlagViewVerticalOne extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span data-testid="flag-vertical" class="slider__flag-vertical slider__flag-vertical_maximum" style="top:${this.sliderModel.toPercentValue}%">${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }
  
  bind() {
    this.element.querySelectorAll('.slider__flag-vertical').forEach((elem) => elem.addEventListener('mousedown', this.onFlagMouseDown))
  }

  public onFlagMouseDown(evt: Event):void {
    
  }
}