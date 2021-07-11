import AbstractView from '../abstract-view';

export default class SliderViewVerticalOne extends AbstractView {
  get className() {
    return 'slider__wrapper';
  }

  get template() {
    return `
      <div data-testid="slider-vertical-one" class="slider__inner slider__inner_with-height">
        <div class="slider__scale slider__scale_with-height">
          <div class="slider__bar slider__bar_with-width" style="height:${this.sliderModel.toPercentValue}%"></div>
        </div>
        <div class="slider__toggle slider__toggle_vertical-maximum" style="top:${this.sliderModel.toPercentValue}%"></div>
      </div>
    `;
  }

  bind() {
    this.element
      .querySelectorAll('.slider__toggle')
      .forEach((elem) => elem.addEventListener(
        'touchstart',
        this.handleToggleMouseDown.bind(this),
      ));
    this.element
      .querySelectorAll('.slider__toggle')
      .forEach((elem) => elem.addEventListener(
        'mousedown',
        this.handleToggleMouseDown.bind(this),
      ));
  }

  public handleToggleMouseDown(evt: Event): void {
    evt.preventDefault();
    const min: number = this.sliderModel.minValue;
    const max: number = this.sliderModel.maxValue;
    const step: number = this.sliderModel.stepValue;
    const toggle: HTMLElement = <HTMLElement>evt.currentTarget;
    const slider: HTMLElement = toggle.parentElement!;
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
