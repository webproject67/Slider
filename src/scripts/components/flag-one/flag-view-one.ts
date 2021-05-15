import AbstractView from '../abstract-view';

export default class FlagViewOne extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span data-testid="flagHorizontal" class="slider__flag slider__flag--max" style="left:${this.sliderModel.toPercentValue}%">${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }

  bind() {
    this.element.querySelectorAll('.slider__flag').forEach((elem) => elem.addEventListener('mousedown', (evt: Event):void => this.flagMouseDown(evt)))
  }

  public flagMouseDown(evt: Event):void {
    
  }
}