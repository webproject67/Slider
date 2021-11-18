import Observer from '../observer/Observer';
import TrackView from './Track-view';
import ProgressView from './Progress-view';
import CircleView from './Circle-view';
import FlagView from './Flag-view';
import ScaleView from './Scale-view';
import ConfiguringView from './Configuring-view';
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
} from '../../const';

export default class Views extends Observer {
  private main: HTMLElement;

  private wrapper!: HTMLElement;

  private slider!: HTMLElement;

  private track!: TrackView;

  private progress!: ProgressView;

  private circle!: CircleView[];

  private flag!: FlagView;

  private scale!: ScaleView;

  private configuring!: ConfiguringView;

  constructor(main: HTMLElement) {
    super();
    this.main = main;
    this.circle = [];
  }

  public updateView(state: stateType) {
    if (state.start) {
      this.render(state);
      return;
    }

    this.track.updateElement();
    this.progress.updateElement();
    this.scale.updateElement();
    this.configuring.updateElement();
    this.circle.forEach((circle, i) => {
      circle.updateElement(i);
      this.flag.updateElement(i);
    });

    if (state.configuring)
      this.wrapper.appendChild(this.configuring.getElement());

    if (state.view === VERTICAL) {
      this.slider.classList.add('slider__inner_size_height');
    } else {
      this.slider.classList.remove('slider__inner_size_height');
    }

    const progress = this.slider.children[0];
    if (!state.progress) {
      if (progress.children[0])
        progress.removeChild(this.progress.getElement());
    } else {
      this.track.getElement().appendChild(this.progress.getElement());
    }

    if (!state.scale) {
      this.slider.childNodes.forEach((element) => {
        if ((<HTMLElement>element).classList.contains('slider__list'))
          this.slider.removeChild(this.scale.getElement());
      });
    } else {
      this.slider.appendChild(this.scale.getElement());
    }

    if (!state.flag) {
      this.slider.childNodes.forEach((element) => {
        if ((<HTMLElement>element).classList.contains('slider__pins'))
          this.slider.removeChild(this.flag.getElement());
      });
    } else {
      this.slider.appendChild(this.flag.getElement());
    }
  }

  private render(state: stateType): void {
    this.slider = this.createElement('slider__inner', true, state);

    this.track = new TrackView(state);
    const trackElement = this.track.getElement();
    trackElement.addEventListener('mousedown', this.handleItemClick.bind(this));
    this.slider.appendChild(trackElement);

    this.progress = new ProgressView(state);
    if (state.progress) trackElement.appendChild(this.progress.getElement());

    this.flag = new FlagView(state);
    const flagElement = this.flag.getElement();
    for (let i = 0; i < 2; i += 1) {
      flagElement.children[i].addEventListener(
        'touchstart',
        this.handleFlagMouseDown.bind(this, state)
      );
      flagElement.children[i].addEventListener(
        'mousedown',
        this.handleFlagMouseDown.bind(this, state)
      );

      this.circle[i] = new CircleView(state, i);
      this.circle[i]
        .getElement()
        .addEventListener('touchstart', this.handleCircleMouseDown.bind(this));
      this.circle[i]
        .getElement()
        .addEventListener('mousedown', this.handleCircleMouseDown.bind(this));
      this.slider.appendChild(this.circle[i].getElement());
    }
    if (state.flag) this.slider.appendChild(flagElement);

    this.scale = new ScaleView(state);
    const scaleElement = this.scale.getElement();
    scaleElement.childNodes.forEach((element) =>
      element.addEventListener('mousedown', this.handleItemClick.bind(this))
    );
    if (state.scale) this.slider.appendChild(scaleElement);

    this.configuring = new ConfiguringView(state, this.main);
    const configuringElement = this.configuring.getElement();
    for (let i = 0; i < configuringElement.children.length; i += 1) {
      const element = configuringElement.children[i];
      if (element.className === 'slider__radio') {
        element.childNodes.forEach((elem) =>
          elem.addEventListener(
            'change',
            this.handleInputChange.bind(this, state)
          )
        );
        continue;
      }
      element.addEventListener(
        'change',
        this.handleInputChange.bind(this, state)
      );
    }

    this.wrapper = this.createElement('slider__wrapper');
    this.wrapper.appendChild(this.slider);
    this.main.appendChild(this.wrapper);

    this.broadcast(['start'], [0]);
  }

  private handleInputChange(state: stateType, evt: Event) {
    const label: HTMLElement = <HTMLElement>evt.currentTarget;
    const input: HTMLElement = <HTMLElement>label.children[0];

    const inputMin = input.dataset.name === MIN;
    const inputMax = input.dataset.name === MAX;
    const inputStep = input.dataset.name === STEP;
    const generalInput = inputMin || inputMax || inputStep;
    const inputFlag = input.dataset.name === FLAG;
    const inputScale = input.dataset.name === SCALE;
    const inputProgress = input.dataset.name === PROGRESS;
    const generalInput2 = inputFlag || inputScale || inputProgress;

    if (generalInput)
      this.broadcast(
        [input.dataset.name!, 'listDistance'],
        [(<HTMLInputElement>input).value]
      );

    if (input.dataset.name === VIEW)
      this.broadcast([input.dataset.name], [(<HTMLInputElement>input).value]);

    if (input.dataset.name === RANGE)
      this.broadcast(
        ['from', 'fromPercent', input.dataset.name],
        [state.min, 0, (<HTMLInputElement>input).value]
      );

    if (generalInput2)
      this.broadcast(
        [input.dataset.name!],
        [(<HTMLInputElement>input).checked]
      );
  }

  private handleFlagMouseDown(state: stateType, evt: Event): void {
    const flag: HTMLElement = <HTMLElement>evt.currentTarget;
    const slider: HTMLElement = flag.parentElement!.parentElement!;
    const flagClassNames = flag.className.split(' ');
    let toggle!: HTMLElement;

    if (
      flagClassNames[1] === 'slider__pin_position_minimum' ||
      flagClassNames[2] === 'slider__pin-vertical_position_minimum'
    )
      toggle = <HTMLElement>slider.children[1];

    if (
      flagClassNames[1] === 'slider__pin_position_maximum' ||
      flagClassNames[2] === 'slider__pin-vertical_position_maximum'
    )
      toggle =
        state.range === RANGE
          ? <HTMLElement>slider.children[2]
          : <HTMLElement>slider.children[1];

    this.replaceCircle(evt, toggle);
  }

  private handleCircleMouseDown(evt: Event): void {
    const toggle: HTMLElement = <HTMLElement>evt.currentTarget;
    this.replaceCircle(evt, toggle);
  }

  private replaceCircle(evt: Event, toggle: HTMLElement): void {
    evt.preventDefault();
    const slider: HTMLElement = toggle.parentElement!;
    let onMouseMove: { (evt: Event): void };
    const toggleMin =
      toggle.className.split(' ')[1] === 'slider__toggle_position_minimum';
    const toggleMax =
      toggle.className.split(' ')[1] === 'slider__toggle_position_maximum';
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

    if (toggle.className.split(' ')[1] === 'slider__toggle_position_minimum')
      this.broadcast(['mouseFrom'], [corner]);
    if (toggle.className.split(' ')[1] === 'slider__toggle_position_maximum')
      this.broadcast(['mouseTo'], [corner]);
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

    if (
      toggle.className.split(' ')[1] ===
      'slider__toggle_position_vertical-minimum'
    )
      this.broadcast(['mouseFrom'], [corner]);
    if (
      toggle.className.split(' ')[1] ===
      'slider__toggle_position_vertical-maximum'
    )
      this.broadcast(['mouseTo'], [corner]);
  }

  private handleItemClick(
    evt: Event & { pageX?: number; pageY?: number }
  ): void {
    const scale: HTMLElement = <HTMLElement>evt.currentTarget;
    const stepList: HTMLElement = scale.parentElement!;
    const slider: HTMLElement = stepList.parentElement!;
    const boxLeft: number = slider.offsetLeft;
    const boxRight: number = boxLeft + slider.clientWidth;
    const boxTop: number = slider.offsetTop;
    const sliderLeft: number = boxLeft + window.pageXOffset;
    const sliderWidth: number = boxRight - boxLeft;
    const sliderHeight: number = scale.offsetHeight;
    let corner: number;

    if (stepList.className.split(' ')[1]) {
      corner = ((evt.pageY! - boxTop) / sliderHeight) * 100;
    } else {
      corner = ((evt.pageX! - sliderLeft) / sliderWidth) * 100;
    }

    if (scale.className === 'slider__item')
      corner = parseFloat(scale.style.left);

    this.broadcast(['corner'], [corner]);
  }

  private createElement(
    className: string,
    bool?: boolean,
    state?: stateType
  ): HTMLElement {
    const newElement: HTMLElement = document.createElement('div');
    newElement.className = className;
    if (bool && state!.view === VERTICAL)
      newElement.classList.add('slider__inner_size_height');
    return newElement;
  }
}
