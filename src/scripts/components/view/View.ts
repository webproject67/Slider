import Observer from '../observer/Observer';
import TrackView from './TrackView';
import ProgressView from './ProgressView';
import CircleView from './CircleView';
import FlagView from './FlagView';
import ScaleView from './ScaleView';
import { IState, ViewHandler, ViewTypes } from '../../types';

export default class View extends Observer<ViewTypes> {
  private main: HTMLElement;

  private start: boolean;

  private wrapper!: HTMLElement;

  private slider!: HTMLElement;

  private track!: TrackView;

  private progress!: ProgressView;

  private circle!: CircleView;

  private flag!: FlagView;

  private scale!: ScaleView;

  private state!: IState;

  constructor(main: HTMLElement) {
    super();
    this.main = main;
    this.start = true;
  }

  public updateView(state: IState): void {
    this.state = state;

    if (this.start) {
      this.render();
      return;
    }

    this.toggleClassNameSlider();
    this.track.updateElement(this.state);
    this.progress.updateElement(this.state);
    this.circle.updateElement(this.state);
    this.flag.updateElement(this.state);
    this.scale.updateElement(this.state);

    if (this.state.progress) {
      this.track.getElement().appendChild(this.progress.getElement());
    } else {
      this.progress.getElement().remove();
    }

    if (this.state.flag) {
      this.slider.appendChild(this.flag.getElement());
    } else {
      this.flag.getElement().remove();
    }

    if (this.state.scale) {
      this.slider.appendChild(this.scale.getElement());
    } else {
      this.scale.getElement().remove();
    }
  }

  private render(): void {
    this.start = false;

    this.slider = this.createElement('slider__inner');
    this.toggleClassNameSlider();

    this.track = new TrackView(this.state);
    this.track
      .getElement()
      .addEventListener('click', this.handleTrackClick.bind(this));
    this.slider.appendChild(this.track.getElement());

    this.progress = new ProgressView(this.state);
    if (this.state.progress)
      this.track.getElement().appendChild(this.progress.getElement());

    this.circle = new CircleView(this.state);
    this.circle
      .getElement()
      .querySelectorAll<HTMLDivElement>('div')
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

    this.flag = new FlagView(this.state);
    this.flag
      .getElement()
      .querySelectorAll<HTMLDivElement>('div')
      .forEach((flag) => {
        flag.addEventListener('mousedown', this.handlePinMouseDown.bind(this));
        flag.addEventListener('touchstart', this.handlePinMouseDown.bind(this));
      });
    if (this.state.flag) this.slider.appendChild(this.flag.getElement());

    this.scale = new ScaleView(this.state);
    this.scale
      .getElement()
      .querySelectorAll<HTMLDivElement>('.slider__item')
      .forEach((item) =>
        item.addEventListener('click', this.handleScaleClick.bind(this))
      );
    if (this.state.scale) this.slider.appendChild(this.scale.getElement());

    this.wrapper = this.createElement('slider__wrapper');
    this.wrapper.appendChild(this.slider);
    this.main.appendChild(this.wrapper);
  }

  private handlePinMouseDown(evt: Event): void {
    const pin: HTMLElement = <HTMLElement>evt.currentTarget;

    const classNameBoolHMax = pin.classList.contains(
      'slider__pin_position_maximum'
    );
    const classNameBoolVMax = pin.classList.contains(
      'slider__pin-vertical_position_maximum'
    );

    let circle: HTMLElement | null = this.circle
      .getElement()
      .querySelector('div:first-child');

    if (classNameBoolHMax || classNameBoolVMax)
      circle = this.state.range
        ? this.circle.getElement().querySelector('div:last-child')
        : this.circle.getElement().querySelector('div:first-child');

    if (circle !== null) this.replaceCircle(evt, circle);
  }

  private handleCircleMouseDown(evt: Event): void {
    const circle: HTMLElement = <HTMLElement>evt.currentTarget;
    this.replaceCircle(evt, circle);
  }

  private replaceCircle(evt: Event, circle: HTMLElement): void {
    evt.preventDefault();

    const onMouseMove = (evt: MouseEvent | TouchEvent): void => {
      const getEvent = () =>
        evt instanceof TouchEvent ? evt.targetTouches[0] : evt;
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

      let corner: number =
        ((event.pageX - this.slider.offsetLeft) /
          this.track.getElement().clientWidth) *
        100;

      if (this.state.view)
        corner =
          ((event.pageY - this.slider.offsetTop) /
            this.track.getElement().clientHeight) *
          100;

      if (circleMin || circleVMin)
        this.broadcast({ type: ViewHandler.FROMCIRCLE, value: corner });
      if (circleMax || circleVMax)
        this.broadcast({ type: ViewHandler.TOCIRCLE, value: corner });
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

  private handleTrackClick(evt: MouseEvent): void {
    let corner: number =
      (evt.offsetX / this.track.getElement().clientWidth) * 100;

    if (this.state.view)
      corner = (evt.offsetY / this.track.getElement().clientHeight) * 100;

    this.broadcast({ type: ViewHandler.TRACK, value: corner });
  }

  private handleScaleClick(evt: MouseEvent): void {
    const scale: HTMLElement = <HTMLElement>evt.currentTarget;
    const corner: number = parseFloat(scale.style.left);
    this.broadcast({ type: ViewHandler.SCALE, value: corner });
  }

  private createElement(className: string): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.className = className;
    return newElement;
  }

  private toggleClassNameSlider(): void {
    const className = 'slider__inner_size_height';

    if (this.state.view) {
      this.slider.classList.add(className);
    } else {
      this.slider.classList.remove(className);
    }
  }
}
