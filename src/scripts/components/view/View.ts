import Observer from '../observer/Observer';
import TrackView from './TrackView';
import ProgressView from './ProgressView';
import CircleView from './CircleView';
import FlagView from './FlagView';
import ScaleView from './ScaleView';
import { stateType } from '../../types';
import {
  MIN,
  MAX,
  STEP,
  VIEW,
  RANGE,
  FLAG,
  SCALE,
  PROGRESS,
  VERTICAL,
  HORIZONTAL,
} from '../../const';

export default class View extends Observer {
  private main: HTMLElement;

  private wrapper!: HTMLElement;

  private slider!: HTMLElement;

  private track!: TrackView;

  private progress!: ProgressView;

  private circle!: CircleView[];

  private flag!: FlagView[];

  private flags!: HTMLElement;

  private scale!: ScaleView;

  constructor(main: HTMLElement) {
    super();
    this.main = main;
    this.circle = [];
    this.flag = [];
  }

  public updateView(state: stateType) {
    if (state.start) {
      this.render(state);
      return;
    }

    this.toggleClassNameSlider(state);
    this.track.updateElement();
    this.progress.updateElement();
    this.scale.updateElement();
    this.circle.forEach((circle, i) => circle.updateElement(i));
    this.flag.forEach((flag, i) => flag.updateElement(i));

    if (state.progress) {
      this.track.getElement().appendChild(this.progress.getElement());
    } else {
      this.progress.getElement().remove();
    }

    if (state.flag) {
      this.slider.appendChild(this.flags);
    } else {
      this.flags.remove();
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

    this.flags = this.createElement('slider__pins');
    for (let i = 0; i < 2; i += 1) {
      this.circle[i] = new CircleView(state, i);
      this.circle[i]
        .getElement()
        .addEventListener('touchstart', this.handleCircleMouseDown.bind(this));
      this.circle[i]
        .getElement()
        .addEventListener('mousedown', this.handleCircleMouseDown.bind(this));
      this.slider.appendChild(this.circle[i].getElement());

      this.flag[i] = new FlagView(state, i);
      this.flag[i]
        .getElement()
        .addEventListener(
          'touchstart',
          this.handleFlagMouseDown.bind(this, state)
        );
      this.flag[i]
        .getElement()
        .addEventListener(
          'mousedown',
          this.handleFlagMouseDown.bind(this, state)
        );
      this.flags.appendChild(this.flag[i].getElement());
    }
    if (state.flag) this.slider.appendChild(this.flags);

    this.scale = new ScaleView(state);
    const items = this.scale.getElement().querySelectorAll('.slider__item');
    items.forEach((item) =>
      item.addEventListener('mousedown', this.handleItemClick.bind(this))
    );
    if (state.scale) this.slider.appendChild(this.scale.getElement());

    this.wrapper = this.createElement('slider__wrapper');
    this.wrapper.appendChild(this.slider);
    this.main.appendChild(this.wrapper);

    this.broadcast(['start'], [0]);
  }

  private handleFlagMouseDown(state: stateType, evt: Event): void {
    const flag: HTMLElement = <HTMLElement>evt.currentTarget;

    const classNameBoolHMin = flag.classList.contains(
      'slider__pin_position_minimum'
    );
    const classNameBoolVMin = flag.classList.contains(
      'slider__pin-vertical_position_minimum'
    );
    const classNameBoolHMax = flag.classList.contains(
      'slider__pin_position_maximum'
    );
    const classNameBoolVMax = flag.classList.contains(
      'slider__pin-vertical_position_maximum'
    );

    let toggle!: HTMLElement;

    if (classNameBoolHMin || classNameBoolVMin)
      toggle = this.circle[0].getElement();

    if (classNameBoolHMax || classNameBoolVMax)
      toggle =
        state.range === RANGE
          ? this.circle[1].getElement()
          : this.circle[0].getElement();

    this.replaceCircle(evt, toggle);
  }

  private handleCircleMouseDown(evt: Event): void {
    const toggle: HTMLElement = <HTMLElement>evt.currentTarget;
    this.replaceCircle(evt, toggle);
  }

  private replaceCircle(evt: Event, toggle: HTMLElement): void {
    evt.preventDefault();
    const {slider} = this;

    let onMouseMove: { (evt: Event): void };

    const toggleMin = toggle.classList.contains(
      'slider__toggle_position_minimum'
    );
    const toggleMax = toggle.classList.contains(
      'slider__toggle_position_maximum'
    );
    const toggleBool = toggleMin || toggleMax;

    if (toggleBool) {
      onMouseMove = (evt: Event): void => this.mouseMoveX(evt, slider, toggle);
    } else {
      onMouseMove = (evt: Event): void => this.mouseMoveY(evt, slider, toggle);
    }

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

  private mouseMoveX(
    evt: Event & { touches?: TouchList; pageX?: number },
    slider: HTMLElement,
    toggle: HTMLElement
  ) {
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const sliderLeft: number = boxLeft + window.pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    const getEvent = () =>
      evt.type.search('touch') !== -1 ? evt.touches![0] : evt;
    const event = getEvent();
    const corner: number = ((event.pageX! - sliderLeft) / sliderWidth) * 100;

    const toggleMin = toggle.classList.contains(
      'slider__toggle_position_minimum'
    );
    const toggleMax = toggle.classList.contains(
      'slider__toggle_position_maximum'
    );

    if (toggleMin) this.broadcast(['fromPercent'], [corner]);
    if (toggleMax) this.broadcast(['toPercent'], [corner]);
  }

  private mouseMoveY(
    evt: Event & { touches?: TouchList; pageY?: number },
    slider: HTMLElement,
    toggle: HTMLElement
  ) {
    const boxTop: number = slider.offsetTop;
    const boxBottom: number = boxTop + slider.clientHeight;
    const sliderHeight: number = boxBottom - boxTop;
    const getEvent = () =>
      evt.type.search('touch') !== -1 ? evt.touches![0] : evt;
    const event = getEvent();
    const corner: number = ((event.pageY! - boxTop) / sliderHeight) * 100;

    const toggleMin = toggle.classList.contains(
      'slider__toggle_position_vertical-minimum'
    );
    const toggleMax = toggle.classList.contains(
      'slider__toggle_position_vertical-maximum'
    );

    if (toggleMin) this.broadcast(['fromPercent'], [corner]);
    if (toggleMax) this.broadcast(['toPercent'], [corner]);
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
    let corner: number;

    const className = 'slider__list_state_transformed';
    const classNameBool = stepList.classList.contains(className);

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
    const viewHBool = view === HORIZONTAL;
    const viewVBool = view === VERTICAL;
    const className = 'slider__inner_size_height';
    const classNameBool = this.slider.classList.contains(className);

    if (viewHBool && classNameBool) this.slider.classList.remove(className);
    if (viewVBool && !classNameBool) this.slider.classList.add(className);
  }
}
