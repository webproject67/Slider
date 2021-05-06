import AbstractView from '../abstract-view';

export default class FlagViewRange extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
    <span class="slider__flag slider__flag--min">${this.sliderModel.fromValue === -10000 ? this.sliderModel.minValue : this.sliderModel.fromValue}</span>
    <span class="slider__flag slider__flag--max">${this.sliderModel.toValue === -10000 ? this.sliderModel.maxValue : this.sliderModel.toValue}</span>
    `
  }

  bind() {
    $(this.element).find('.slider__flag').on('mousedown', (evt: JQuery.MouseDownEvent<HTMLElement>):void => this.flagMouseDown(evt))
  }

  public flagMouseDown(evt: JQuery.MouseDownEvent<HTMLElement>):void {
    
  }
}