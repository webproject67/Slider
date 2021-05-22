import AbstractView from '../abstract-view';
import {NULL_VALUE} from '../../../const';

export default class FlagViewVerticalRange extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span class="slider__flag-vertical slider__flag-vertical_minimum" style="top:${this.sliderModel.fromPercentValue}%">${this.sliderModel.fromValue === NULL_VALUE ? this.sliderModel.minValue : this.sliderModel.fromValue}</span>
      <span data-testid="flag-vertical-range" class="slider__flag-vertical slider__flag-vertical_maximum" style="top:${this.sliderModel.toPercentValue}%">${this.sliderModel.toValue === NULL_VALUE ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }
  
  bind() {
    this.element.querySelectorAll('.slider__flag-vertical').forEach((elem) => elem.addEventListener('mousedown', this.onFlagMouseDown))
  }

  public onFlagMouseDown(evt: Event):void {
    
  }
}