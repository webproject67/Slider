import AbstractView from '../abstract-view';
import {NULL_VALUE} from '../../const';

export default class FlagViewOne extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span data-testid="flag-horizontal" class="slider__flag slider__flag_maximum" style="left:${this.sliderModel.toPercentValue}%">${this.sliderModel.toValue === NULL_VALUE ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }

  bind() {
    this.element.querySelectorAll('.slider__flag').forEach((elem) => elem.addEventListener('mousedown', this.onFlagMouseDown))
  }

  public onFlagMouseDown(evt: Event):void {
    
  }
}