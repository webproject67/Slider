import AbstractView from '../abstract-view';

export default class FlagViewRange extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
    <span class="slider__flag slider__flag_minimum" style="left:${this.sliderModel.fromPercentValue}%">${this.sliderModel.fromValue === -10000 ? this.sliderModel.minValue : this.sliderModel.fromValue}</span>
    <span data-testid="flag-horizontal-range" class="slider__flag slider__flag_maximum" style="left:${this.sliderModel.toPercentValue}%">${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }

  bind() {
    this.element.querySelectorAll('.slider__flag').forEach((elem) => elem.addEventListener('mousedown', this.onFlagMouseDown))
  }

  public onFlagMouseDown(evt: Event):void {
    
  }
}