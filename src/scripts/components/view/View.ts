import Observer from '../observer/Observer';
import TrackView from './TrackView';
import ProgressView from './ProgressView';
import CircleView from './CircleView';
import FlagView from './FlagView';
import ScaleView from './ScaleView';
import { stateType } from '../../types';

export default class View extends Observer {
  private main: HTMLElement;

  private wrapper!: HTMLElement;

  private slider!: HTMLElement;

  private track!: TrackView;

  private progress!: ProgressView;

  private circle!: CircleView;

  private flag!: FlagView;

  private scale!: ScaleView;

  constructor(main: HTMLElement) {
    super();
    this.main = main;
  }

  public updateView(state: stateType): void {
    if (state.start) {
      this.render(state);
      return;
    }

    this.toggleClassNameSlider(state);
    this.track.updateElement();
    this.progress.updateElement();
    this.circle.updateElement();
    this.flag.updateElement();
    this.scale.updateElement();

    if (state.progress) {
      this.track.getElement().appendChild(this.progress.getElement());
    } else {
      this.progress.getElement().remove();
    }

    if (state.flag) {
      this.slider.appendChild(this.flag.getElement());
    } else {
      this.flag.getElement().remove();
    }

    if (state.scale) {
      this.slider.appendChild(this.scale.getElement());
    } else {
      this.scale.getElement().remove();
    }
  }

  private render(state: stateType): void {
    this.slider = this.createElement('slider__inner');
    this.toggleClassNameSlider(state);

    this.track = new TrackView(state);
    this.track
      .getElement()
      .addEventListener('mousedown', this.handleItemClick.bind(this));
    this.slider.appendChild(this.track.getElement());

    this.progress = new ProgressView(state);
    if (state.progress)
      this.track.getElement().appendChild(this.progress.getElement());

    this.circle = new CircleView(state);
    this.circle
      .getElement()
      .querySelectorAll('div')
      .forEach((circle) => {
        circle.addEventListener(
          'mousedown',
          this.handleCircleMouseDown.bind(this)
        );
        circle.addEventListener(
          'touchstart',
          this.handleCircleMouseDown.bind(this)
        );
      });
    this.slider.appendChild(this.circle.getElement());

    this.flag = new FlagView(state);
    this.flag
      .getElement()
      .querySelectorAll('div')
      .forEach((flag) => {
        flag.addEventListener(
          'mousedown',
          this.handlePinMouseDown.bind(this, state)
        );
        flag.addEventListener(
          'touchstart',
          this.handlePinMouseDown.bind(this, state)
        );
      });
    if (state.flag) this.slider.appendChild(this.flag.getElement());

    this.scale = new ScaleView(state);
    this.scale
      .getElement()
      .querySelectorAll('.slider__item')
      .forEach((item) =>
        item.addEventListener('mousedown', this.handleItemClick.bind(this))
      );
    if (state.scale) this.slider.appendChild(this.scale.getElement());

    this.wrapper = this.createElement('slider__wrapper');
    this.wrapper.appendChild(this.slider);
    this.main.appendChild(this.wrapper);

    this.broadcast(['start'], [0]);
  }

  private handlePinMouseDown(state: stateType, evt: Event): void {
    const pin: HTMLElement = <HTMLElement>evt.currentTarget;

    const classNameBoolHMin = pin.classList.contains(
      'slider__pin_position_minimum'
    );
    const classNameBoolVMin = pin.classList.contains(
      'slider__pin-vertical_position_minimum'
    );
    const classNameBoolHMax = pin.classList.contains(
      'slider__pin_position_maximum'
    );
    const classNameBoolVMax = pin.classList.contains(
      'slider__pin-vertical_position_maximum'
    );

    let circle: HTMLElement;

    if (classNameBoolHMin || classNameBoolVMin)
      circle = <HTMLElement>(
        this.circle.getElement().querySelector('div:first-child')
      );

    if (classNameBoolHMax || classNameBoolVMax)
      circle = state.range
        ? <HTMLElement>this.circle.getElement().querySelector('div:last-child')
        : <HTMLElement>(
            this.circle.getElement().querySelector('div:first-child')
          );

    this.replaceCircle(evt, circle!);
  }

  private handleCircleMouseDown(evt: Event): void {
    const circle: HTMLElement = <HTMLElement>evt.currentTarget;
    this.replaceCircle(evt, circle);
  }

  private replaceCircle(evt: Event, circle: HTMLElement): void {
    evt.preventDefault();

    const onMouseMove = (
      evt: Event & { touches?: TouchList; pageX?: number; pageY?: number }
    ): void => {
      const { slider } = this;
      const boxLeft: number = slider.offsetLeft;
      const boxRight: number = boxLeft + slider.clientWidth;
      const sliderLeft: number = boxLeft + window.pageXOffset;
      const sliderWidth: number = boxRight - boxLeft;
      const boxTop: number = slider.offsetTop;
      const boxBottom: number = boxTop + slider.clientHeight;
      const sliderHeight: number = boxBottom - boxTop;
      const getEvent = () =>
        evt.type.search('touch') !== -1 ? evt.touches![0] : evt;
      const event = getEvent();
      const circleMin = circle.classList.contains(
        'slider__circle_position_minimum'
      );
      const circleMax = circle.classList.contains(
        'slider__circle_position_maximum'
      );
      const circleVMin = circle.classList.contains(
        'slider__circle_position_vertical-minimum'
      );
      const circleVMax = circle.classList.contains(
        'slider__circle_position_vertical-maximum'
      );
      let corner: number;

      if (circleVMin || circleVMax) {
        corner = ((event.pageY! - boxTop) / sliderHeight) * 100;
      } else {
        corner = ((event.pageX! - sliderLeft) / sliderWidth) * 100;
      }

      if (circleMin || circleVMin) this.broadcast(['fromPercent'], [corner]);
      if (circleMax || circleVMax) this.broadcast(['toPercent'], [corner]);
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

  private handleItemClick(
    evt: Event & { pageX?: number; pageY?: number }
  ): void {
    const scale: HTMLElement = <HTMLElement>evt.currentTarget;
    const stepList: HTMLElement = this.scale.getElement();
    const slider: HTMLElement = this.wrapper;
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const boxTop: number = slider.offsetTop;
    const sliderLeft: number = boxLeft + window.pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    const sliderHeight: number = scale.offsetHeight;
    const classNameBool = stepList.classList.contains(
      'slider__list_state_transformed'
    );
    let corner: number;

    if (classNameBool) {
      corner = ((evt.pageY! - boxTop) / sliderHeight) * 100;
    } else {
      corner = ((evt.pageX! - sliderLeft) / sliderWidth) * 100;
    }

    if (scale.className === 'slider__item')
      corner = parseFloat(scale.style.left);

    this.broadcast(['corner'], [corner]);
  }

  private createElement(className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.className = className;
    return newElement;
  }

  private toggleClassNameSlider(state: stateType): void {
    const { view } = state;
    const className = 'slider__inner_size_height';

    if (view) {
      this.slider.classList.add(className);
    } else {
      this.slider.classList.remove(className);
    }
  }
}
