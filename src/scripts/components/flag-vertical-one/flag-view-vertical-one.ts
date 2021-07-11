import AbstractView from '../abstract-view';
import { NULL_VALUE } from '../../const';

export default class FlagViewVerticalOne extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span data-testid="flag-vertical" class="slider__flag-vertical slider__flag-vertical_maximum" style="top:${
  this.sliderModel.toPercentValue
}%">${
  this.sliderModel.toValue === NULL_VALUE
    ? this.sliderModel.maxValue
    : this.sliderModel.toValue
}</span>
    `;
  }

  bind() {
    this.element
      .querySelectorAll('.slider__flag-vertical')
      .forEach((elem) => elem.addEventListener('touchstart', this.handleFlagMouseDown.bind(this)));
    this.element
      .querySelectorAll('.slider__flag-vertical')
      .forEach((elem) => elem.addEventListener('mousedown', this.handleFlagMouseDown.bind(this)));
  }

  public handleFlagMouseDown(evt: Event): void {
    evt.preventDefault();
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    const flag: HTMLElement = <HTMLElement>evt.currentTarget;
    const slider: HTMLElement = flag.parentElement!.parentElement!;
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderHeight: number = boxBottom - boxTop;
    const onMouseMove = (
      evt: Event & { touches?: TouchList; pageY?: number },
    ): void => {
      const getEvent = () => (evt.type.search('touch') !== -1 ? evt.touches![0] : evt);
      const event = getEvent();
      const top: number = ((event.pageY! - boxTop) / sliderHeight) * 100;
      const stepCount: number = (max - min) / step;
      const stepPercent: number = 100 / stepCount;
      let stepTop: number = Math.round(top / stepPercent) * stepPercent;
      if (stepTop < 0) stepTop = 0;
      if (stepTop > 100) stepTop = 100;
      const { fromPercentValue } = this.sliderModel;
      if (fromPercentValue > stepTop) stepTop = fromPercentValue;
      const value: number = Number(((stepTop / stepPercent) * step).toFixed()) + min;
      this.sliderModel.broadcast(
        ['toPercentValue', 'toValue'],
        [stepTop, value],
      );
    };

    const onMouseUp = () => {
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
    document.addEventListener('mouseup', onMouseUp);
  }
}
