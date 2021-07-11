import AbstractView from '../abstract-view';
import { NULL_VALUE } from '../../const';

export default class FlagViewOne extends AbstractView {
  get className() {
    return 'slider__flags';
  }

  get template() {
    return `
      <span data-testid="flag-horizontal" class="slider__flag slider__flag_maximum" style="left:${
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
      .querySelectorAll('.slider__flag')
      .forEach((elem) => elem.addEventListener('touchstart', this.handleFlagMouseDown.bind(this)));
    this.element
      .querySelectorAll('.slider__flag')
      .forEach((elem) => elem.addEventListener('mousedown', this.handleFlagMouseDown.bind(this)));
  }

  public handleFlagMouseDown(evt: Event): void {
    evt.preventDefault();
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    const flag: HTMLElement = <HTMLElement>evt.currentTarget;
    const slider: HTMLElement = flag.parentElement!.parentElement!;
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const sliderLeft: number = boxLeft + window.pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    const onMouseMove = (
      evt: Event & { touches?: TouchList; pageX?: number },
    ): void => {
      const getEvent = () => (evt.type.search('touch') !== -1 ? evt.touches![0] : evt);
      const event = getEvent();
      const left: number = ((event.pageX! - sliderLeft) / sliderWidth) * 100;
      const stepCount: number = (max - min) / step;
      const stepPercent: number = 100 / stepCount;
      let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
      if (stepLeft < 0) stepLeft = 0;
      if (stepLeft > 100) stepLeft = 100;
      const { fromPercentValue } = this.sliderModel;
      if (fromPercentValue > stepLeft) stepLeft = fromPercentValue;
      const value: number = Number(((stepLeft / stepPercent) * step).toFixed()) + min;
      this.sliderModel.broadcast(
        ['toPercentValue', 'toValue'],
        [stepLeft, value],
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
